import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

function sinceDate(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export interface AnalyticsOverview {
  totalSent: number;
  totalResponded: number;
  compliancePct: number;
  avgResponseTimeMs: number | null;
  activeParticipants: number;
}

export async function fetchAnalyticsOverview(
  projectId: string,
  days = 7,
): Promise<AnalyticsOverview> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  const [totalSent, totalResponded, activeParticipants, avgAgg] = await Promise.all([
    Result.countDocuments({ project: oid, created: { $gte: since } }),
    Result.countDocuments({ project: oid, created: { $gte: since }, "events.status": "tapped" }),
    Result.distinct("samplyid", { project: oid, created: { $gte: since } }).then((a) => a.length),
    Result.aggregate([
      { $match: { project: oid, created: { $gte: since }, "events.status": "tapped" } },
      {
        $project: {
          tappedAt: {
            $arrayElemAt: [
              {
                $map: {
                  input: { $filter: { input: "$events", cond: { $eq: ["$$this.status", "tapped"] } } },
                  as: "e",
                  in: "$$e.created",
                },
              },
              0,
            ],
          },
          sentAt: "$created",
        },
      },
      { $project: { deltaMs: { $subtract: ["$tappedAt", "$sentAt"] } } },
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

export async function fetchResponseTimeSeries(
  projectId: string,
  days = 7,
): Promise<TimeSeriesPoint[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  const rows: { _id: string; sent: number; responded: number }[] = await Result.aggregate([
    { $match: { project: oid, created: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        sent: { $sum: 1 },
        responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill in zero-value days for a continuous X-axis
  const map = new Map(rows.map((r) => [r._id, r]));
  const result: TimeSeriesPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
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
  days = 7,
): Promise<FunnelStage[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  // We do not include a "Received" stage. The mobile OS does not surface push
  // delivery to us; the only "received" signal Samply has is `received-in-app`,
  // which fires solely when the app is open in the foreground at arrival time
  // — typically a small minority of pings. Counting it as the delivery stage
  // would understate delivery dramatically. The honest funnel is Sent → Opened
  // → Completed; loss between Sent and Opened mixes delivery failure and
  // engagement failure, and the dashboard explains that explicitly.
  const [agg] = await Result.aggregate([
    { $match: { project: oid, created: { $gte: since } } },
    {
      $project: {
        hasSent: { $literal: 1 },
        hasTapped: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] },
        hasCompleted: { $cond: [{ $in: ["completed", "$events.status"] }, 1, 0] },
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
  days = 7,
): Promise<ResponseTimeBucket[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  const LABELS: Record<number, string> = {
    0: "<5 min",
    300000: "5–15 min",
    900000: "15–30 min",
    1800000: "30–60 min",
    3600000: "1–2 hr",
    7200000: "2 hr+",
  };

  const rows: { _id: number | string; count: number }[] = await Result.aggregate([
    { $match: { project: oid, created: { $gte: since }, "events.status": "tapped" } },
    {
      $project: {
        tappedAt: {
          $arrayElemAt: [
            {
              $map: {
                input: { $filter: { input: "$events", cond: { $eq: ["$$this.status", "tapped"] } } },
                as: "e",
                in: "$$e.created",
              },
            },
            0,
          ],
        },
        sentAt: "$created",
      },
    },
    { $project: { deltaMs: { $subtract: ["$tappedAt", "$sentAt"] } } },
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
  days = 7,
): Promise<HourlyPoint[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  const rows: { _id: number; totalSent: number; avgPct: number }[] = await Result.aggregate([
    { $match: { project: oid, created: { $gte: since } } },
    {
      $group: {
        _id: {
          hour: { $hour: "$created" },
          day: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
        },
        sent: { $sum: 1 },
        responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
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
  days = 7,
): Promise<ParticipantComplianceRow[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  const rows: { _id: string; sent: number; responded: number; lastActive: Date }[] =
    await Result.aggregate([
      { $match: { project: oid, created: { $gte: since } } },
      {
        $group: {
          _id: "$samplyid",
          sent: { $sum: 1 },
          responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
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
  days = 7,
): Promise<SchedulePerformanceRow[]> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const since = sinceDate(days);

  // Only count actual notification sends. Every send path (notificationSender,
  // legacy jobController, hookController) writes an "events.status: sent" marker;
  // survey-data saves (saveIncrementalResults) and geofencing events do not, and
  // would otherwise be miscounted as "(untracked schedule)" since they carry a
  // project but no notificationConfigId.
  const rows: { _id: string | null; sent: number; responded: number }[] = await Result.aggregate([
    { $match: { project: oid, created: { $gte: since }, "events.status": "sent" } },
    {
      $group: {
        _id: { $ifNull: ["$notificationConfigId", null] },
        sent: { $sum: 1 },
        responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
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
 *  - active:   participants who tapped ≥1 notification on that day
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

  // Aggregate: for each participant, which calendar dates did they tap a notification?
  const tappedDays: { _id: { samplyid: string; date: string } }[] = await Result.aggregate([
    { $match: { project: oid, "events.status": "tapped" } },
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
