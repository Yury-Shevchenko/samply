import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import {
  fetchScheduledNotifications,
  fetchJobsForNotification,
  fetchPendingNotifications,
  type NotificationConfig,
} from "@/lib/data/scheduled";
import { fetchParticipants } from "@/lib/data/participants";
import type { IAgendaJob } from "@/lib/models/agendaJob";
import type { IPendingNotification } from "@/lib/models/pendingNotification";
import {
  deleteNotificationAction,
  deletePendingNotificationAction,
  cancelPendingNotificationAction,
  reactivatePendingNotificationAction,
  bulkDeletePendingNotificationsAction,
} from "../actions";
import { DeleteScheduleButton } from "../DeleteScheduleButton";
import { PendingTable } from "../PendingTable";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    notificationId?: string;
    type?: string;
    pnStatus?: string;
    pnUser?: string;
    pnPage?: string;
    pnSort?: string;
    pnDir?: string;
  }>;
}


function fmt(d?: Date | string | null) {
  if (!d) return "—";
  const date = new Date(d as string);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// The Express backend stores event strategy as flat fields:
// stop_event/start_event ("now"|"registration"), stop_next/start_next (day number),
// stop_after/start_after ({ days, hours, minutes }). int_start/int_end hold computed Dates.
// next can arrive as "" from the form for non-"next" strategy variants — guard against it.
function describeEvent(
  event?: string,
  next?: number | string,
  after?: { days?: number; hours?: number; minutes?: number } | string,
): string | null {
  if (!event) return null;
  const nextNum = Number(next);
  if (next != null && next !== "" && !isNaN(nextNum) && nextNum > 0) return `Day ${nextNum} after ${event}`;
  if (after && typeof after === "object") {
    const parts: string[] = [];
    if (after.days)    parts.push(`${after.days}d`);
    if (after.hours)   parts.push(`${after.hours}h`);
    if (after.minutes) parts.push(`${after.minutes}m`);
    const delay = parts.join(" ");
    return delay ? `${delay} after ${event}` : null;
  }
  return null;
}

function scheduleType(n: NotificationConfig): string {
  if (n.schedule === "enrollment") return "enrollment";
  if (n.randomize) return "random";
  if (n.date && !n.int_start) return "one-time";
  if (n.start_event || n.stop_event) return "event";
  if (n.int_start || n.int_end) return "repeating";
  return "fixed";
}


const TH: React.CSSProperties = {
  padding: "0.7rem 1rem",
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "0.9rem",
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-mono)",
  fontSize: "1.05rem",
  color: "var(--ink-60)",
  whiteSpace: "nowrap",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
      {children}
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="sched-meta-row" style={{ display: "flex", gap: "1rem", alignItems: "baseline", padding: "0.9rem 0", borderBottom: "1px solid var(--ink-10)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, minWidth: "8rem", width: "13rem", maxWidth: "13rem" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--ink-60)", wordBreak: "break-word", minWidth: 0 }}>
        {children}
      </span>
    </div>
  );
}

function FilterPill({ label, href, active, title }: { label: string; href: string; active: boolean; title?: string }) {
  return (
    <a href={href} title={title} style={{
      fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: active ? 700 : 400,
      letterSpacing: ".08em", textTransform: "uppercase", padding: "0.3rem 1rem", borderRadius: "9999px",
      textDecoration: "none",
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--paper)" : "var(--ink-40)",
      border: active ? "1px solid var(--ink)" : "1px solid var(--ink-20)",
    }}
      className={active ? "" : "hover:border-[var(--ink-40)] transition-colors"}>
      {label}
    </a>
  );
}

export default async function ScheduledJobsPage({ params, searchParams }: Props) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { t } = await getT();

  const JOB_TYPE_LABELS: Record<string, string> = {
    one_time_notification:         t("scheduled.jobOneTime"),
    regular_notification:          t("scheduled.jobRepeat"),
    start_manager:                 t("scheduled.jobStartManager"),
    end_manager:                   t("scheduled.jobEndManager"),
    personal_notification:         t("scheduled.jobPersonal"),
    start_personal_manager:        t("scheduled.jobPersonalStart"),
    end_personal_manager:          t("scheduled.jobPersonalEnd"),
    start_random_personal_manager: t("scheduled.jobRandomStart"),
    end_random_personal_manager:   t("scheduled.jobRandomEnd"),
    random_personal_notification:  t("scheduled.jobRandomPersonal"),
  };

  const TYPE_META: Record<string, { label: string; fg: string; bg: string; border: string }> = {
    random:     { label: t("scheduled.typeRandom"),      fg: "var(--coral)",  bg: "rgba(214,90,48,.08)",   border: "rgba(214,90,48,.25)" },
    "one-time": { label: t("scheduled.typeOneTime"),     fg: "var(--sage)",   bg: "rgba(61,115,107,.08)",  border: "rgba(61,115,107,.25)" },
    event:      { label: t("scheduled.typeEvent"),       fg: "#7c6ab5",       bg: "rgba(124,106,181,.08)", border: "rgba(124,106,181,.25)" },
    enrollment: { label: t("scheduled.typeEnrollment"),  fg: "#7c6ab5",       bg: "rgba(124,106,181,.08)", border: "rgba(124,106,181,.25)" },
    repeating:  { label: t("scheduled.typeRepeating"),   fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
    fixed:      { label: t("scheduled.typeFixed"),       fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
  };

  const { id: studyId } = await params;
  const {
    notificationId, type,
    pnStatus: pnStatusRaw, pnUser,
    pnPage: pnPageStr, pnSort = "scheduledFor", pnDir = "asc",
  } = await searchParams;

  const pnStatuses = pnStatusRaw ? pnStatusRaw.split(",").filter(Boolean) : [];
  const pnPage = Math.max(1, parseInt(pnPageStr ?? "1", 10) || 1);

  const [project, allNotifications, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id, session.user.level > 100),
    fetchScheduledNotifications(studyId),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  // Owners and members can modify schedules; an admin viewing another
  // researcher's study has view-only access, so write controls are hidden.
  const isOwner = String(project.creator) === session.user.id;
  const isMember = (project.members ?? []).map(String).includes(session.user.id);
  const canEdit = isOwner || isMember;

  const notification = notificationId
    ? allNotifications.find((n) => n.id === notificationId)
    : undefined;

  // Redirect only when a specific notificationId was requested but not found
  if (notificationId && !notification) {
    redirect(`/dashboard/${studyId}/schedule`);
  }

  const type_ = notification ? scheduleType(notification) : undefined;
  const tm = TYPE_META[type_ ?? "fixed"] ?? TYPE_META.fixed;

  // Build a lookup from notificationConfigId → name for the all-schedules view
  const notifNameById = new Map(allNotifications.map((n) => [n.id, n.name || n.title || n.id]));

  // participant id → display code (username, then information.code, then raw id)
  const participantCodeById = new Map(
    participants.map((p) => [
      p.id,
      (p.username ?? (p.information?.code as string | undefined) ?? p.id),
    ]),
  );

  // group id → group name
  const groupNameById = new Map<string, string>();
  for (const p of participants) {
    if (p.group?.id && !groupNameById.has(p.group.id)) {
      groupNameById.set(p.group.id, p.group.name ?? p.group.id);
    }
  }

  const [jobs, { items: pendingItems, count: pendingCount, pages: pendingPages }] = await Promise.all([
    notification
      ? fetchJobsForNotification(studyId, notificationId!, type)
      : Promise.resolve([] as IAgendaJob[]),
    fetchPendingNotifications(studyId, notificationId, pnStatuses, pnUser, pnPage, pnSort, pnDir),
  ]);

  const pnStatusParam = pnStatuses.length > 0 ? pnStatuses.join(",") : undefined;

  function filterHref(extra: Record<string, string | undefined>) {
    const p = new URLSearchParams();
    if (notificationId) p.set("notificationId", notificationId);
    if (pnStatusParam) p.set("pnStatus", pnStatusParam);
    if (pnUser) p.set("pnUser", pnUser);
    if (pnSort) p.set("pnSort", pnSort);
    if (pnDir) p.set("pnDir", pnDir);
    for (const [k, v] of Object.entries(extra)) {
      if (v !== undefined && v !== "") p.set(k, v);
      else p.delete(k);
    }
    const qs = p.toString();
    return `/scheduled/${studyId}${qs ? `?${qs}` : ""}`;
  }

  function toggleStatusHref(status: string) {
    const next = pnStatuses.includes(status)
      ? pnStatuses.filter((s) => s !== status)
      : [...pnStatuses, status];
    return filterHref({ pnStatus: next.join(","), pnPage: "1" });
  }

  function sortHref(field: string) {
    const nextDir = pnSort === field && pnDir === "asc" ? "desc" : "asc";
    return filterHref({ pnPage: "1", pnSort: field, pnDir: nextDir });
  }

  function pageHref(p: number) {
    return filterHref({ pnPage: String(p) });
  }

  const JOB_TYPE_FILTERS = [
    { key: undefined,         label: t("scheduled.filterAll") },
    { key: "one-time",        label: t("scheduled.filterOneTime") },
    { key: "repeat",          label: t("scheduled.filterRepeat") },
    { key: "personal",        label: t("scheduled.filterPersonal") },
    { key: "random-personal", label: t("scheduled.filterRandom") },
  ];

  const PN_STATUS_TOGGLES = [
    { key: "pending",    label: t("scheduled.statusPending"),    title: "Queued — not yet picked up by the delivery worker" },
    { key: "processing", label: t("scheduled.statusProcessing"), title: "Being sent right now" },
    { key: "sent",       label: t("scheduled.statusSent"),       title: undefined },
    { key: "failed",     label: t("scheduled.statusFailed"),     title: undefined },
    { key: "cancelled",  label: t("scheduled.statusCancelled"),  title: undefined },
  ];

  const durationHours = notification?.expireIn
    ? Math.round(notification.expireIn / 3600000)
    : null;

  const returnPath = (() => {
    const p = new URLSearchParams();
    if (notificationId) p.set("notificationId", notificationId);
    if (pnStatusParam) p.set("pnStatus", pnStatusParam);
    if (pnUser) p.set("pnUser", pnUser);
    if (pnSort) p.set("pnSort", pnSort);
    if (pnDir) p.set("pnDir", pnDir);
    const qs = p.toString();
    return `/scheduled/${studyId}${qs ? `?${qs}` : ""}`;
  })();
  const bulkDeleteBound = bulkDeletePendingNotificationsAction.bind(null, studyId, returnPath);

  const pendingRows = (pendingItems as IPendingNotification[]).map((pn) => {
    const pnId = String(pn._id);
    const rowNotifId = notificationId ?? pn.notificationConfigId;
    return {
      id: pnId,
      scheduledFor: pn.scheduledFor ? String(pn.scheduledFor) : null,
      status: pn.status,
      title: pn.title || pn.message || "",
      isReminder: pn.isReminder ?? false,
      recipientGroupIds: (pn.recipientGroupIds ?? []) as string[],
      recipientUserIds: (pn.recipientUserIds ?? []) as string[],
      deleteAction: deletePendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam),
      cancelAction: cancelPendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam),
      reactivateAction: reactivatePendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam),
    };
  });

  const deleteScheduleAction = notification && canEdit
    ? deleteNotificationAction.bind(null, studyId, notificationId!, `/dashboard/${studyId}/schedule`)
    : null;

  const startDesc = notification
    ? (describeEvent(notification.start_event, notification.start_next, notification.start_after)
        ?? (notification.int_start ? fmt(notification.int_start) : null))
    : null;
  const stopDesc = notification
    ? (describeEvent(notification.stop_event, notification.stop_next, notification.stop_after)
        ?? (notification.int_end ? fmt(notification.int_end) : null))
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }} className="px-[1.2rem] sm:px-[2.4rem] pt-[2.4rem] sm:pt-[4rem] pb-[4rem]">
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: "3.2rem" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/dashboard/${studyId}/schedule`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
            className="hover:text-[var(--ink)] transition-colors">
            {t("scheduled.breadcrumb")}
          </a>
          {deleteScheduleAction && (
            <DeleteScheduleButton
              action={deleteScheduleAction}
              label={t("scheduled.deleteSchedule")}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".04em",
                padding: "0.5rem 1.2rem", borderRadius: "9999px",
                border: "1px solid rgba(214,90,48,.35)", background: "rgba(214,90,48,.06)",
                color: "var(--coral)", cursor: "pointer",
              }}
            />
          )}
        </div>

        {/* Title — only in all-schedules view */}
        {!notification && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              {t("scheduled.queueLabel")}
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)" }}>
              {project.name} · {t("scheduled.allSchedules")}
            </div>
          </div>
        )}

        {/* Config card — only in single-schedule view */}
        {notification && <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
          <div style={{ borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }} className="px-[1.2rem] py-[1.2rem] sm:px-[2.4rem] sm:pt-[1.8rem] sm:pb-[1.6rem]">
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.5rem" }}>
                {t("scheduled.notifSchedule")}
              </div>
              <div className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)", wordBreak: "break-word" }}>
                {notification.name || notification.title}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.6rem", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", padding: "0.25rem 0.9rem", borderRadius: "9999px", color: tm.fg, background: tm.bg, border: `1px solid ${tm.border}` }}>
                {tm.label}
              </span>
              {notification.created && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--ink-40)" }}>
                  {t("scheduled.created", { date: fmt(notification.created) })}
                </span>
              )}
            </div>
          </div>

          <div className="px-[1.2rem] sm:px-[2.4rem] pt-[0.2rem] pb-[1.2rem]">
            {notification.name && notification.title && notification.name !== notification.title && (
              <MetaRow label={t("scheduled.labelTitle")}>{notification.title}</MetaRow>
            )}
            {notification.message && (
              <MetaRow label={t("scheduled.labelMessage")}>{notification.message}</MetaRow>
            )}
            {notification.url && (
              <MetaRow label={t("scheduled.labelUrl")}>
                <a href={notification.url} target="_blank" rel="noreferrer"
                  style={{ color: "var(--ink-60)", textDecoration: "none", wordBreak: "break-all" }}
                  className="hover:text-[var(--coral)] transition-colors">
                  {notification.url}
                </a>
              </MetaRow>
            )}
            {notification.timezone && (
              <MetaRow label={t("scheduled.labelTimezone")}>
                {notification.timezone}
                {notification.useParticipantTimezone && (
                  <span style={{ marginLeft: 8, opacity: 0.6 }}>{t("scheduled.adjustedToParticipant")}</span>
                )}
              </MetaRow>
            )}
            {/* One-time */}
            {type_ === "one-time" && notification.date && (
              <MetaRow label={t("scheduled.labelScheduledFor")}>{fmt(notification.date)}</MetaRow>
            )}
            {/* Enrollment */}
            {type_ === "enrollment" && (() => {
              const d = notification.delay;
              const hasDelay = d && (d.days || d.hours || d.minutes);
              if (hasDelay) {
                const parts: string[] = [];
                if (d!.days)    parts.push(`${d!.days} day${d!.days !== 1 ? "s" : ""}`);
                if (d!.hours)   parts.push(`${d!.hours} hour${d!.hours !== 1 ? "s" : ""}`);
                if (d!.minutes) parts.push(`${d!.minutes} minute${d!.minutes !== 1 ? "s" : ""}`);
                return <MetaRow label={t("scheduled.labelDelayAfterJoin")}>{parts.join(", ")}</MetaRow>;
              }
              return <MetaRow label={t("scheduled.labelDelayAfterJoin")}>{t("scheduled.immediately")}</MetaRow>;
            })()}
            {notification.window_from && notification.window_to && (
              <MetaRow label={t("scheduled.labelTimeWindow")}>{fmt(notification.window_from)} – {fmt(notification.window_to)}</MetaRow>
            )}
            {/* Repeat */}
            {notification.readable?.interval && (
              <MetaRow label={t("scheduled.labelRepeatInterval")}>{notification.readable.interval}</MetaRow>
            )}
            {startDesc && <MetaRow label={t("scheduled.labelStart")}>{startDesc}</MetaRow>}
            {stopDesc  && <MetaRow label={t("scheduled.labelStop")}>{stopDesc}</MetaRow>}
            {notification.readable?.from && notification.readable?.to && (
              <MetaRow label={t("scheduled.labelDailyWindow")}>
                {notification.readable.from} – {notification.readable.to}
                {notification.windowInterval?.number != null && (
                  <span style={{ marginLeft: 8, opacity: 0.6 }}>· {t("scheduled.perDay", { n: String(notification.windowInterval.number) })}</span>
                )}
              </MetaRow>
            )}
            {/* Random */}
            {notification.number != null && (
              <MetaRow label={t("scheduled.labelCount")}>{t("scheduled.notifications", { n: String(notification.number) })}</MetaRow>
            )}
            {notification.distance != null && (
              <MetaRow label={t("scheduled.labelMinDistance")}>{t("scheduled.minutes", { n: String(Math.round(notification.distance / 60000)) })}</MetaRow>
            )}
            {/* Audience */}
            {notification.reminders && notification.reminders.length > 0 && (
              <MetaRow label={notification.reminders.length > 1 ? t("scheduled.labelReminders") : t("scheduled.labelReminder")}>
                <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.4rem" }}>
                  {notification.reminders.map((r, i) => (
                    <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" }}>
                      {t("scheduled.minutes", { n: String(Math.round(r.time / 60000)) })} — {r.title || r.message || "—"}
                    </span>
                  ))}
                </span>
              </MetaRow>
            )}
            {notification.groups && notification.groups.length > 0 && (
              <MetaRow label={t("scheduled.labelGroups")}>
                <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {notification.groups.map((gid) => (
                    <span key={gid} style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)" }}>
                      {groupNameById.get(gid) ?? gid}
                    </span>
                  ))}
                </span>
              </MetaRow>
            )}
            {notification.participantId && notification.participantId.length > 0 && (
              <MetaRow label={t("scheduled.labelParticipants")}>{notification.participantId.join(", ")}</MetaRow>
            )}
            {notification.allCurrentParticipants && (
              <MetaRow label={t("scheduled.labelAudience")}>{t("scheduled.allCurrentParticipants")}</MetaRow>
            )}
            {notification.randomize && (
              <MetaRow label={t("scheduled.labelRandomized")}>{t("scheduled.yes")}</MetaRow>
            )}
            {notification.scheduleInFuture && (
              <MetaRow label={t("scheduled.labelFutureParticipants")}>{t("scheduled.included")}</MetaRow>
            )}
            {durationHours != null && (
              <MetaRow label={t("scheduled.labelExpiresIn")}>{t("scheduled.hours", { n: String(durationHours) })}</MetaRow>
            )}
          </div>
        </div>}

        {/* Agenda jobs — only in single-schedule view */}
        {notification && jobs.length > 0 && (
          <section>
            <div style={{ marginBottom: "1.2rem" }}>
              <SectionLabel>{t("scheduled.agendaJobs", { n: String(jobs.length) })}</SectionLabel>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {JOB_TYPE_FILTERS.map(({ key, label }) => (
                  <FilterPill
                    key={label}
                    label={label}
                    href={filterHref({ type: key })}
                    active={type === key}
                  />
                ))}
              </div>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "56rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                    <th style={TH}>{t("scheduled.colType")}</th>
                    <th style={TH}>{t("scheduled.colNextRun")}</th>
                    <th style={TH}>{t("scheduled.colLastRun")}</th>
                    <th style={TH}>{t("scheduled.colInterval")}</th>
                    <th style={TH}>{t("scheduled.colParticipant")}</th>
                    <th style={TH}>{t("scheduled.colGroup")}</th>
                    <th style={{ ...TH, width: "10rem" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {(jobs as IAgendaJob[]).map((job, i) => (
                    <tr key={String(job._id)}
                      style={{ borderBottom: i < jobs.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                      className="hover:bg-[var(--paper)] transition-colors">
                      <td style={TD}>
                        <span style={{ fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)", fontSize: "1rem" }}>
                          {JOB_TYPE_LABELS[job.name] ?? job.name}
                        </span>
                      </td>
                      <td style={TD}>{fmt(job.nextRunAt)}</td>
                      <td style={{ ...TD, color: "var(--ink-40)" }}>{fmt(job.lastRunAt)}</td>
                      <td style={{ ...TD, color: "var(--ink-40)" }}>{job.repeatInterval ?? "—"}</td>
                      <td style={TD}>
                        {job.data.userid
                          ? <a href={`/dashboard/${studyId}/participants/${job.data.userid}`} style={{ color: "var(--ink-60)", textDecoration: "none" }} className="hover:text-[var(--coral)] transition-colors">{job.data.userid}</a>
                          : "—"}
                      </td>
                      <td style={{ ...TD, color: "var(--ink-40)" }}>{job.data.groupid ?? "—"}</td>
                      <td style={{ padding: "1rem 2rem 1rem 1.6rem" }}>
                        {canEdit ? (
                          <div style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
                            <a href={`/scheduled/${notificationId}/edit/${job._id}?project=${studyId}`}
                              style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
                              className="hover:text-[var(--ink)] transition-colors">
                              {t("scheduled.jobEdit")}
                            </a>
                            <a href={`/scheduled/delete/${notificationId}/${job._id}?project=${studyId}`}
                              style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--coral)", textDecoration: "none", letterSpacing: ".04em" }}
                              className="hover:opacity-70 transition-opacity">
                              {t("scheduled.jobDelete")}
                            </a>
                          </div>
                        ) : (
                          <span style={{ color: "var(--ink-20)" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </section>
        )}

        {/* Pending queue */}
        <section>
            {/* Header row */}
            <div style={{ marginBottom: "0.8rem" }}>
              <SectionLabel>
                {pendingCount !== 1
                  ? t("scheduled.queueCountPlural", { n: pendingCount.toLocaleString() })
                  : t("scheduled.queueCount", { n: pendingCount.toLocaleString() })}
              </SectionLabel>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                {PN_STATUS_TOGGLES.map(({ key, label, title }) => (
                  <FilterPill
                    key={key}
                    label={label}
                    href={toggleStatusHref(key)}
                    active={pnStatuses.includes(key)}
                    title={title}
                  />
                ))}
                {pnStatuses.length > 0 && (
                  <a href={filterHref({ pnStatus: "", pnPage: "1" })}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: ".04em", padding: "0.3rem 0.6rem", alignSelf: "center" }}
                    className="hover:text-[var(--ink)] transition-colors">
                    {t("scheduled.clearFilter")}
                  </a>
                )}
              </div>
            </div>

            {/* Participant filter */}
            {participants.length > 0 && (
              <form method="get" action={`/scheduled/${studyId}`}
                style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                {notificationId && <input type="hidden" name="notificationId" value={notificationId} />}
                {pnStatusParam && <input type="hidden" name="pnStatus" value={pnStatusParam} />}
                {pnSort && <input type="hidden" name="pnSort" value={pnSort} />}
                {pnDir && <input type="hidden" name="pnDir" value={pnDir} />}
                <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0 }}>
                  {t("scheduled.colParticipant")}
                </label>
                <select name="pnUser" defaultValue={pnUser ?? ""}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "0.45rem 0.9rem", outline: "none", flex: "1 1 14rem", minWidth: 0 }}>
                  <option value="">{t("scheduled.allParticipants")}</option>
                  {participants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.username ? `${p.username} (${p.id})` : p.id}
                    </option>
                  ))}
                </select>
                <button type="submit"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.45rem 1.2rem", borderRadius: "9999px", border: "1px solid var(--ink-20)", background: "transparent", color: "var(--ink-60)", cursor: "pointer", flexShrink: 0 }}
                  className="hover:opacity-70 transition-opacity">
                  {t("scheduled.applyFilter")}
                </button>
                {pnUser && (
                  <a href={filterHref({ pnUser: "" })}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: ".04em" }}
                    className="hover:text-[var(--ink)] transition-colors">
                    {t("scheduled.clearFilter")}
                  </a>
                )}
              </form>
            )}

            {pendingCount === 0 ? (
              <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "3.2rem 2.4rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: "0 0 0.6rem" }}>
                  {pnStatuses.length > 0
                    ? t("scheduled.noMatchFilter")
                    : t("scheduled.noQueue")}
                </p>
                {pnStatuses.length === 0 && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-20)", margin: 0, lineHeight: 1.6 }}>
                    {t("scheduled.allDelivered")}
                    {" "}{t("scheduled.toggleHintPre")}{" "}
                    <strong style={{ fontWeight: 600, color: "var(--ink-40)" }}>{t("scheduled.toggleHintSent")}</strong>{" "}or{" "}
                    <strong style={{ fontWeight: 600, color: "var(--ink-40)" }}>{t("scheduled.toggleHintCancelled")}</strong>{" "}
                    {t("scheduled.toggleHintPost")}
                  </p>
                )}
              </div>
            ) : (
              <>
                <PendingTable
                  rows={pendingRows}
                  participantCodeById={Object.fromEntries(participantCodeById)}
                  groupNameById={Object.fromEntries(groupNameById)}
                  bulkDeleteAction={bulkDeleteBound}
                  sortHrefs={{ scheduledFor: sortHref("scheduledFor"), status: sortHref("status") }}
                  pnSort={pnSort}
                  pnDir={pnDir}
                />

                {/* Pagination */}
                {pendingPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.2rem", flexWrap: "wrap", gap: "0.8rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".04em" }}>
                      {t("scheduled.pageSummary", { page: String(pnPage), pages: String(pendingPages), total: pendingCount.toLocaleString() })}
                    </span>
                    <div style={{ display: "flex", gap: "0.6rem" }}>
                      {pnPage > 1 && (
                        <a href={pageHref(pnPage - 1)}
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.4rem 1rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", textDecoration: "none", color: "var(--ink-60)" }}
                          className="hover:opacity-70 transition-opacity">
                          {t("scheduled.prevPage")}
                        </a>
                      )}
                      {pnPage < pendingPages && (
                        <a href={pageHref(pnPage + 1)}
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.4rem 1rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", textDecoration: "none", color: "var(--ink-60)" }}
                          className="hover:opacity-70 transition-opacity">
                          {t("scheduled.nextPage")}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
        </section>

        {/* Retention notice */}
        <div
          style={{
            marginTop: "0.4rem",
            padding: "1.4rem 1.8rem",
            border: "1px dashed var(--ink-20)",
            borderRadius: "0.8rem",
            background: "var(--surface)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1.6rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--ink-60)",
              margin: 0,
              maxWidth: "60rem",
            }}
          >
            {t("scheduled.retentionNote")}
          </p>
          <a
            href={`/dashboard/${studyId}/data`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              letterSpacing: ".04em",
              color: "var(--ink-60)",
              textDecoration: "none",
              padding: "0.4rem 1rem",
              border: "1px solid var(--ink-20)",
              borderRadius: "9999px",
              flexShrink: 0,
            }}
            className="hover:text-[var(--ink)] transition-colors"
          >
            {t("scheduled.retentionHistoryLink")}
          </a>
        </div>

      </div>
    </div>
  );
}
