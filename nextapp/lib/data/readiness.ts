import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Result from "@/lib/models/result";
import mongoose from "mongoose";
import { checkSurveyUrl } from "@/lib/placeholders";

/**
 * Pre-flight readiness for a study.
 *
 * Every study lost in the Summer 2026 cohort failed the same way: something was
 * misconfigured on day one, nothing surfaced it, and the run finished before
 * anyone noticed. The damage was discovered during analysis, when it was already
 * unrecoverable — no participant ids in the export, no completions recorded, a
 * schedule that never fired.
 *
 * Each check below corresponds to a documented failure, and each is answerable
 * before a single notification goes out. The checks compose signals that already
 * exist — the URL validator, the notification config, the participant list — so
 * this is a viewing layer, not new logic.
 */

export type CheckState = "ok" | "warn" | "blocked" | "pending";

export interface ReadinessCheck {
  id:
    | "participants"
    | "schedule"
    | "survey-url"
    | "participant-id"
    | "completion"
    | "test-notification"
    | "consent";
  state: CheckState;
  /**
   * Absolute path to the page that fixes it. Absolute rather than relative
   * because not every fix lives under the study dashboard — study description
   * and consent are edited on the project form.
   */
  href?: string;
}

export interface StudyReadiness {
  checks: ReadinessCheck[];
  /** True when nothing is blocked — the study can sensibly go live. */
  ready: boolean;
  blockedCount: number;
  warnCount: number;
}

interface NotificationLike {
  id?: string;
  url?: string;
  reminders?: unknown[];
}

export interface LatestTest {
  state: "none" | "sent";
  url?: string;
  unsubstituted?: boolean;
  carriesIdentifier?: boolean;
  carriesMessageId?: boolean;
  opened?: boolean;
  completed?: boolean;
  deliveryFailed?: boolean;
}

/**
 * The most recent pre-flight test send, resolved server-side so the dashboard
 * renders it with the page rather than fetching it on mount.
 *
 * The route handler at dashboard/[studyId]/testnotification returns the same
 * shape for polling once a new test is in flight.
 */
export async function fetchLatestTest(projectId: string): Promise<LatestTest> {
  await connectDB();
  const latest = (await Result.findOne(
    { project: new mongoose.Types.ObjectId(projectId), isTest: true },
    { data: 1, events: 1, created: 1, messageId: 1, samplyid: 1 },
  )
    .sort({ created: -1 })
    .lean()) as {
    data?: { url?: string };
    events?: Array<{ status: string }>;
    messageId?: string;
    samplyid?: string;
  } | null;

  if (!latest) return { state: "none" };

  const statuses = new Set((latest.events ?? []).map((e) => e.status));
  const url = latest.data?.url ?? "";

  return {
    state: "sent",
    url,
    unsubstituted: /%[A-Z0-9_]+%/.test(url),
    carriesIdentifier: !!latest.samplyid && url.includes(latest.samplyid),
    carriesMessageId: !!latest.messageId && url.includes(latest.messageId),
    opened: statuses.has("tapped") || statuses.has("opened-in-app"),
    completed: statuses.has("completed"),
    deliveryFailed: statuses.has("delivery-failed") || statuses.has("send-failed"),
  };
}

export async function fetchStudyReadiness(projectId: string): Promise<StudyReadiness> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const project = (await Project.findById(oid, {
    notifications: 1,
    mobileUsers: 1,
    description: 1,
    consent: 1,
    consentText: 1,
  }).lean()) as {
    notifications?: NotificationLike[];
    mobileUsers?: Array<{ deactivated?: boolean }>;
    description?: string;
    consent?: unknown;
    consentText?: string;
  } | null;

  const notifications = project?.notifications ?? [];
  const activeParticipants = (project?.mobileUsers ?? []).filter((u) => !u.deactivated).length;

  // A test send is the only check that needs to look at what actually happened
  // rather than at configuration.
  const testSends = await Result.countDocuments({ project: oid, isTest: true });
  const testResponded = await Result.countDocuments({
    project: oid,
    isTest: true,
    "events.status": { $in: ["tapped", "opened-in-app", "completed"] },
  });

  const urls = notifications.map((n) => n.url ?? "").filter(Boolean);
  const anyReminders = notifications.some((n) => (n.reminders?.length ?? 0) > 0);

  // Reuse the authoring-time validator rather than re-deriving its rules.
  const urlErrors = urls.flatMap((u) =>
    checkSurveyUrl(u, { participantCount: activeParticipants, hasReminders: anyReminders }).filter(
      (i) => i.level === "error",
    ),
  );

  const hasIdentifier =
    urls.length > 0 && urls.every((u) => u.includes("%SAMPLY_ID%") || u.includes("%PARTICIPANT_CODE%"));
  const hasMessageId = urls.length > 0 && urls.some((u) => u.includes("%MESSAGE_ID%"));

  const base = `/dashboard/${projectId}`;

  const checks: ReadinessCheck[] = [
    {
      id: "participants",
      state: activeParticipants > 0 ? "ok" : "blocked",
      // Invitations, not the participant list: with nobody enrolled, the list is
      // empty and the thing the researcher needs is a link to hand out.
      href: `${base}/invitations`,
    },
    {
      id: "schedule",
      state: notifications.length > 0 ? "ok" : "blocked",
      href: `${base}/schedule`,
    },
  ];

  // The three survey-link checks all depend on a schedule existing. Listing them
  // as separate "pending" lines when there is no schedule produced three
  // near-identical rows that all restated the schedule check — noise that buries
  // the two things actually worth doing.
  if (notifications.length > 0) {
    checks.push({
      // A URL that cannot be parsed or carries a duplicated placeholder will
      // reach the survey tool malformed; this is the failure that pooled 128
      // observations into one undifferentiated set for one group.
      id: "survey-url",
      state: urls.length === 0 ? "warn" : urlErrors.length > 0 ? "blocked" : "ok",
      href: `${base}/schedule`,
    });

    // Only meaningful once a link exists; until then the check above says it.
    if (urls.length > 0) {
      checks.push(
        {
          // Without an identifier the export cannot be linked to people at all —
          // no between-person analysis, no multilevel models.
          id: "participant-id",
          state: hasIdentifier ? "ok" : activeParticipants > 1 ? "blocked" : "warn",
          href: `${base}/schedule`,
        },
        {
          // Completion tracking drives both the response-rate figures researchers
          // publish and the suppression of reminders to people who already answered.
          id: "completion",
          state: hasMessageId ? "ok" : anyReminders ? "blocked" : "warn",
          href: `${base}/schedule`,
        },
      );
    }
  }

  checks.push(
    {
      // The only check that proves the chain end to end rather than inspecting
      // configuration.
      id: "test-notification",
      state: testResponded > 0 ? "ok" : testSends > 0 ? "pending" : "warn",
    },
    {
      id: "consent",
      state: project?.consentText || project?.consent || project?.description ? "ok" : "warn",
      // The project form, not study settings — description and consent live there.
      href: `/projects/${projectId}/edit`,
    },
  );

  const blockedCount = checks.filter((c) => c.state === "blocked").length;
  const warnCount = checks.filter((c) => c.state === "warn").length;

  return { checks, ready: blockedCount === 0, blockedCount, warnCount };
}
