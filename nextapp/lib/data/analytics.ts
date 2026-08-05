import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

function sinceDate(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/**
 * `days = 0` means "entire study" — no lower bound on `created`.
 *
 * Every panel used to filter on a rolling window anchored to Date.now() while
 * presenting the result as a running total. Because the window slides, a
 * participant's `sent`/`responded` counts *decrease* once messages age out of
 * it — researchers reported watching a row go from sent=6/opened=5 to
 * sent=4/opened=4 overnight and reasonably concluded Samply was losing data.
 * Nothing was ever lost; the counts were windowed. Studies typically run 5-8
 * days, so the old 7-day default guaranteed every study crossed the boundary
 * mid-run. "Entire study" is now the default.
 */
function createdFilter(days: number): Record<string, unknown> {
  return days > 0 ? { created: { $gte: sinceDate(days) } } : {};
}

/**
 * Parses the `days` query parameter into a window size.
 *
 * Returns 0 for "entire study", which is also the default when the parameter is
 * absent or unparseable. Fixed windows are clamped to 1-90 days.
 */
export function parseWindowDays(raw: string | null | undefined): number {
  if (raw === undefined || raw === null || raw === "" || raw === "all" || raw === "0") return 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(90, Math.max(1, Math.floor(n)));
}

/**
 * A notification counts as "responded to" if any of these events exists.
 *
 *  - `tapped`         — the participant tapped the push notification.
 *  - `opened-in-app`  — the participant opened the survey from the History
 *                       screen. This is the documented path for anyone who
 *                       missed or dismissed the push, and it is a genuine
 *                       response.
 *  - `completed`      — the survey tool called back via the end-URL redirect or
 *                       the completion webhook. Proof of response even when the
 *                       push was never tapped.
 *
 * Counting only `tapped` reported 0% compliance for participants who
 * demonstrably finished the survey, because the tap event is the one signal
 * that depends on the mobile app winning a race against its own backgrounding.
 */
export const RESPONDED_STATUSES = ["tapped", "opened-in-app", "completed"];

/** Statuses that mean the participant opened the link, for the delivery funnel. */
const OPENED_STATUSES = ["tapped", "opened-in-app"];

/** Aggregation expression: 1 when the document has any responded status, else 0. */
const HAS_RESPONDED = {
  $cond: [
    {
      $gt: [
        { $size: { $setIntersection: [{ $ifNull: ["$events.status", []] }, RESPONDED_STATUSES] } },
        0,
      ],
    },
    1,
    0,
  ],
};

/**
 * Aggregation expression: timestamp of the *earliest* responded event, or null.
 *
 * Uses $min rather than the first array element — `events` is appended to
 * without a guaranteed sort, so position does not imply chronology.
 */
const FIRST_RESPONSE_AT = {
  $min: {
    $map: {
      input: {
        $filter: {
          input: { $ifNull: ["$events", []] },
          cond: { $in: ["$$this.status", RESPONDED_STATUSES] },
        },
      },
      as: "e",
      in: "$$e.created",
    },
  },
};

export interface AnalyticsOverview {
  totalSent: number;
  totalResponded: number;
  compliancePct: number;
  avgResponseTimeMs: number | null;
  activeParticipants: number;
}

export async function fetchAnalyticsOverview(
  projectId: string,
  days = 0,
): Promise<AnalyticsOverview> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const window = createdFilter(days);

  const [totalSent, totalResponded, activeParticipants, avgAgg] = await Promise.all([
    Result.countDocuments({ project: oid, ...window }),
    Result.countDocuments({ project: oid, ...window, "events.status": { $in: RESPONDED_STATUSES } }),
    Result.distinct("samplyid", { project: oid, ...window }).then((a) => a.length),
    Result.aggregate([
      { $match: { project: oid, ...window, "events.status": { $in: RESPONDED_STATUSES } } },
      { $project: { respondedAt: FIRST_RESPONSE_AT, sentAt: "$created" } },
      { $project: { deltaMs: { $subtract: ["$respondedAt", "$sentAt"] } } },
      { $match: { deltaMs: { $gte: 0 } } },
      { $group: { _id: null, avg: { $avg: "$deltaMs" } } },
    ]),
  ]);

  const compliancePct = totalSent > 0 ? Math.round((totalResponded / totalSent) * 100) : 0;
  const avgResponseTimeMs = avgAgg[0]?.avg ?? null;

  return { totalSent, totalResponded, compliancePct, avgResponseTimeMs, activeParticipants };
}

export interface TimeSeriesPoint {
  date: string;
  sent: number;
  responded: number;
  pct: number;
}

/**
 * Widest x-axis we will zero-fill for the "entire study" view. A long-running
 * study would otherwise render thousands of mostly-empty points; past this we
 * show the most recent year.
 */
const MAX_TIMESERIES_DAYS = 365;

/**
 * Number of days the x-axis should span. For a fixed window that is the window
 * itself; for "entire study" it runs from the first notification ever sent to
 * today, so the chart covers the study rather than a rolling slice of it.
 */
async function axisSpanDays(oid: mongoose.Types.ObjectId, days: number): Promise<number> {
  if (days > 0) return days;

  const first = await Result.findOne({ project: oid }, { created: 1 })
    .sort({ created: 1 })
    .lean() as { created?: Date } | null;
  if (!first?.created) return 1;

  const startOfDay = (d: Date) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const span =
    Math.floor((startOfDay(new Date()) - startOfDay(new Date(first.created))) / 86400000) + 1;

  return Math.min(MAX_TIMESERIES_DAYS, Math.max(1, span));
}

export async function fetchResponseTimeSeries(
  projectId: string,
  days = 0,
): Promise<TimeSeriesPoint[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const [rows, spanDays]: [{ _id: string; sent: number; responded: number }[], number] =
    await Promise.all([
      Result.aggregate([
        { $match: { project: oid, ...createdFilter(days) } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
            sent: { $sum: 1 },
            responded: { $sum: HAS_RESPONDED },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      axisSpanDays(oid, days),
    ]);

  // Fill in zero-value days for a continuous X-axis
  const map = new Map(rows.map((r) => [r._id, r]));
  const result: TimeSeriesPoint[] = [];
  for (let i = spanDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    const row = map.get(key);
    const sent = row?.sent ?? 0;
    const responded = row?.responded ?? 0;
    result.push({ date: key, sent, responded, pct: sent > 0 ? Math.round((responded / sent) * 100) : 0 });
  }
  return result;
}

export interface FunnelStage {
  status: string;
  label: string;
  count: number;
}

export async function fetchDeliveryFunnel(
  projectId: string,
  days = 0,
): Promise<FunnelStage[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  // We do not include a "Received" stage. The mobile OS does not surface push
  // delivery to us; the only "received" signal Samply has is `received-in-app`,
  // which fires solely when the app is open in the foreground at arrival time
  // — typically a small minority of pings. Counting it as the delivery stage
  // would understate delivery dramatically. The honest funnel is Sent → Opened
  // → Completed; loss between Sent and Opened mixes delivery failure and
  // engagement failure, and the dashboard explains that explicitly.
  const [agg] = await Result.aggregate([
    { $match: { project: oid, ...createdFilter(days) } },
    {
      $project: {
        hasSent: { $literal: 1 },
        // "Opened" covers both ways a participant can open the link: tapping the
        // push, or opening it from the History screen after missing the push.
        hasTapped: {
          $cond: [
            {
              $gt: [
                { $size: { $setIntersection: [{ $ifNull: ["$events.status", []] }, OPENED_STATUSES] } },
                0,
              ],
            },
            1,
            0,
          ],
        },
        hasCompleted: { $cond: [{ $in: ["completed", { $ifNull: ["$events.status", []] }] }, 1, 0] },
      },
    },
    {
      $group: {
        _id: null,
        sent: { $sum: "$hasSent" },
        tapped: { $sum: "$hasTapped" },
        completed: { $sum: "$hasCompleted" },
      },
    },
  ]);

  if (!agg) {
    return [
      { status: "sent", label: "Sent", count: 0 },
      { status: "tapped", label: "Opened", count: 0 },
      { status: "completed", label: "Completed", count: 0 },
    ];
  }

  return [
    { status: "sent", label: "Sent", count: agg.sent },
    { status: "tapped", label: "Opened", count: agg.tapped },
    { status: "completed", label: "Completed", count: agg.completed },
  ];
}

export interface ResponseTimeBucket {
  bucket: string;
  count: number;
}

export async function fetchResponseTimeDistribution(
  projectId: string,
  days = 0,
): Promise<ResponseTimeBucket[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const LABELS: Record<number, string> = {
    0: "<5 min",
    300000: "5–15 min",
    900000: "15–30 min",
    1800000: "30–60 min",
    3600000: "1–2 hr",
    7200000: "2 hr+",
  };

  const rows: { _id: number | string; count: number }[] = await Result.aggregate([
    { $match: { project: oid, ...createdFilter(days), "events.status": { $in: RESPONDED_STATUSES } } },
    { $project: { respondedAt: FIRST_RESPONSE_AT, sentAt: "$created" } },
    { $project: { deltaMs: { $subtract: ["$respondedAt", "$sentAt"] } } },
    { $match: { deltaMs: { $gte: 0 } } },
    {
      $bucket: {
        groupBy: "$deltaMs",
        boundaries: [0, 300000, 900000, 1800000, 3600000, 7200000],
        default: 7200000,
        output: { count: { $sum: 1 } },
      },
    },
  ]);

  const map = new Map(rows.map((r) => [r._id, r.count]));
  return Object.entries(LABELS).map(([boundary, label]) => ({
    bucket: label,
    count: map.get(Number(boundary)) ?? 0,
  }));
}

export interface HourlyPoint {
  hour: number;
  avgPct: number;
  totalSent: number;
}

export async function fetchHourlyPattern(
  projectId: string,
  days = 0,
): Promise<HourlyPoint[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const rows: { _id: number; totalSent: number; avgPct: number }[] = await Result.aggregate([
    { $match: { project: oid, ...createdFilter(days) } },
    {
      $group: {
        _id: {
          hour: { $hour: "$created" },
          day: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        sent: { $sum: 1 },
        responded: { $sum: HAS_RESPONDED },
      },
    },
    {
      $group: {
        _id: "$_id.hour",
        totalSent: { $sum: "$sent" },
        avgPct: {
          $avg: {
            $multiply: [{ $divide: ["$responded", { $max: ["$sent", 1] }] }, 100],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const map = new Map(rows.map((r) => [r._id, r]));
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    avgPct: Math.round(map.get(hour)?.avgPct ?? 0),
    totalSent: map.get(hour)?.totalSent ?? 0,
  }));
}

export interface ParticipantComplianceRow {
  samplyid: string;
  sent: number;
  responded: number;
  pct: number;
  lastActive: string;
}

export async function fetchParticipantCompliance(
  projectId: string,
  days = 0,
): Promise<ParticipantComplianceRow[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const rows: { _id: string; sent: number; responded: number; lastActive: Date }[] =
    await Result.aggregate([
      { $match: { project: oid, ...createdFilter(days) } },
      {
        $group: {
          _id: "$samplyid",
          sent: { $sum: 1 },
          responded: { $sum: HAS_RESPONDED },
          lastActive: { $max: "$created" },
        },
      },
      { $sort: { responded: -1 } },
    ]);

  return rows.map((r) => ({
    samplyid: r._id,
    sent: r.sent,
    responded: r.responded,
    pct: r.sent > 0 ? Math.round((r.responded / r.sent) * 100) : 0,
    lastActive: r.lastActive?.toISOString() ?? "",
  }));
}

export interface SchedulePerformanceRow {
  notificationConfigId: string | null;
  sent: number;
  responded: number;
  pct: number;
}

export async function fetchSchedulePerformance(
  projectId: string,
  days = 0,
): Promise<SchedulePerformanceRow[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  // Only count actual notification sends. Every send path (notificationSender,
  // legacy jobController, hookController) writes an "events.status: sent" marker;
  // survey-data saves (saveIncrementalResults) and geofencing events do not, and
  // would otherwise be miscounted as "(untracked schedule)" since they carry a
  // project but no notificationConfigId.
  const rows: { _id: string | null; sent: number; responded: number }[] = await Result.aggregate([
    { $match: { project: oid, ...createdFilter(days), "events.status": "sent" } },
    {
      $group: {
        _id: { $ifNull: ["$notificationConfigId", null] },
        sent: { $sum: 1 },
        responded: { $sum: HAS_RESPONDED },
      },
    },
    { $sort: { sent: -1 } },
  ]);

  return rows.map((r) => ({
    notificationConfigId: r._id,
    sent: r.sent,
    responded: r.responded,
    pct: r.sent > 0 ? Math.round((r.responded / r.sent) * 100) : 0,
  }));
}

export interface RetentionPoint {
  day: number;
  active: number;
  eligible: number;
}

/**
 * Builds a dropout/retention curve in relative study days.
 * For each relative day D (day 1 = participant's join date):
 *  - active:   participants who responded to ≥1 notification on that day
 *  - eligible: participants who have been in the study long enough to reach day D
 *
 * Does not accept a `days` filter — this is a whole-study view.
 */
export async function fetchRetentionCurve(projectId: string): Promise<RetentionPoint[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  // Load participant join dates (mobileUsers embedded in Project)
  const project = await Project.findById(oid, { mobileUsers: 1 }).lean();
  const mobileUsers: { id: string; created?: Date }[] =
    (project as unknown as { mobileUsers?: { id: string; created?: Date }[] })?.mobileUsers ?? [];

  if (mobileUsers.length === 0) return [];

  const joinMap = new Map<string, Date>();
  for (const u of mobileUsers) {
    if (u.id && u.created) joinMap.set(u.id, new Date(u.created));
  }

  if (joinMap.size === 0) return [];

  // Aggregate: for each participant, on which calendar dates did they respond?
  const tappedDays: { _id: { samplyid: string; date: string } }[] = await Result.aggregate([
    { $match: { project: oid, "events.status": { $in: RESPONDED_STATUSES } } },
    {
      $group: {
        _id: {
          samplyid: "$samplyid",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
      },
    },
  ]);

  // Convert (samplyid, calendarDate) → relative day, then count unique participants per day
  const activePerDay = new Map<number, Set<string>>();
  for (const row of tappedDays) {
    const { samplyid, date } = row._id;
    const joinDate = joinMap.get(samplyid);
    if (!joinDate) continue;
    const calDate = new Date(date + "T00:00:00.000Z");
    const joinDay = new Date(joinDate.toISOString().slice(0, 10) + "T00:00:00.000Z");
    const relDay = Math.floor((calDate.getTime() - joinDay.getTime()) / 86400000) + 1;
    if (relDay < 1) continue;
    if (!activePerDay.has(relDay)) activePerDay.set(relDay, new Set());
    activePerDay.get(relDay)!.add(samplyid);
  }

  if (activePerDay.size === 0) return [];

  const maxDay = Math.max(...activePerDay.keys());
  const now = Date.now();

  return Array.from({ length: maxDay }, (_, i) => {
    const day = i + 1;
    // eligible = participants who joined early enough that day D has already passed for them
    let eligible = 0;
    for (const joinDate of joinMap.values()) {
      const daysSinceJoin = Math.floor((now - joinDate.getTime()) / 86400000) + 1;
      if (daysSinceJoin >= day) eligible++;
    }
    return { day, active: activePerDay.get(day)?.size ?? 0, eligible };
  });
}
