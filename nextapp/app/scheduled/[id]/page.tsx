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
} from "../actions";
import { PendingActions } from "../PendingActions";
import { DeleteScheduleButton } from "../DeleteScheduleButton";

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

const JOB_TYPE_LABELS: Record<string, string> = {
  one_time_notification:         "One-time",
  regular_notification:          "Repeat",
  start_manager:                 "Start manager",
  end_manager:                   "End manager",
  personal_notification:         "Personal",
  start_personal_manager:        "Personal start",
  end_personal_manager:          "Personal end",
  start_random_personal_manager: "Random start",
  end_random_personal_manager:   "Random end",
  random_personal_notification:  "Random personal",
};

const PN_STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  pending:    { label: "pending",    bg: "rgba(180,140,40,.1)",  color: "#b48c28" },
  processing: { label: "processing", bg: "rgba(60,100,200,.1)",  color: "#3c64c8" },
  sent:       { label: "sent",       bg: "rgba(61,115,107,.1)",  color: "var(--sage)" },
  failed:     { label: "failed",     bg: "rgba(214,90,48,.1)",   color: "var(--coral)" },
  cancelled:  { label: "cancelled",  bg: "var(--ink-10)",        color: "var(--ink-40)" },
};

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
  if (n.randomize) return "random";
  if (n.date && !n.int_start) return "one-time";
  if (n.start_event || n.stop_event) return "event";
  if (n.int_start || n.int_end) return "repeating";
  return "fixed";
}

const TYPE_META: Record<string, { label: string; fg: string; bg: string; border: string }> = {
  random:    { label: "random",    fg: "var(--coral)",  bg: "rgba(214,90,48,.08)",   border: "rgba(214,90,48,.25)" },
  "one-time":{ label: "one-time",  fg: "var(--sage)",   bg: "rgba(61,115,107,.08)",  border: "rgba(61,115,107,.25)" },
  event:     { label: "event",     fg: "#7c6ab5",       bg: "rgba(124,106,181,.08)", border: "rgba(124,106,181,.25)" },
  repeating: { label: "repeating", fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
  fixed:     { label: "fixed",     fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
};

const TH: React.CSSProperties = {
  padding: "0.9rem 1.6rem",
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
  padding: "1rem 1.6rem",
  fontFamily: "var(--font-mono)",
  fontSize: "1.1rem",
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
    <div style={{ display: "flex", gap: "1.6rem", alignItems: "baseline", padding: "0.9rem 0", borderBottom: "1px solid var(--ink-10)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, width: "13rem" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
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

  const { id: studyId } = await params;
  const {
    notificationId, type,
    pnStatus: pnStatusRaw, pnUser,
    pnPage: pnPageStr, pnSort = "scheduledFor", pnDir = "asc",
  } = await searchParams;

  const pnStatuses = pnStatusRaw ? pnStatusRaw.split(",").filter(Boolean) : [];
  const pnPage = Math.max(1, parseInt(pnPageStr ?? "1", 10) || 1);

  const [project, allNotifications, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchScheduledNotifications(studyId),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

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
    { key: undefined,         label: "All" },
    { key: "one-time",        label: "One-time" },
    { key: "repeat",          label: "Repeat" },
    { key: "personal",        label: "Personal" },
    { key: "random-personal", label: "Random" },
  ];

  const PN_STATUS_TOGGLES = [
    { key: "pending",    label: "Pending",    title: "Queued — not yet picked up by the delivery worker" },
    { key: "processing", label: "Processing", title: "Being sent right now" },
    { key: "sent",       label: "Sent",       title: undefined },
    { key: "failed",     label: "Failed",     title: undefined },
    { key: "cancelled",  label: "Cancelled",  title: undefined },
  ];

  const durationHours = notification?.expireIn
    ? Math.round(notification.expireIn / 3600000)
    : null;

  const deleteScheduleAction = notification
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

  // Sort arrow helper
  function sortArrow(field: string) {
    if (pnSort !== field) return <span style={{ opacity: 0.25, marginLeft: "0.3rem" }}>↕</span>;
    return <span style={{ marginLeft: "0.3rem" }}>{pnDir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", padding: "4rem 2.4rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: "3.2rem" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href={`/dashboard/${studyId}/schedule`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
            className="hover:text-[var(--ink)] transition-colors">
            ← Schedule
          </a>
          {deleteScheduleAction && (
            <DeleteScheduleButton
              action={deleteScheduleAction}
              label="Delete schedule"
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
              scheduled queue
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)" }}>
              {project.name} · all schedules
            </div>
          </div>
        )}

        {/* Config card — only in single-schedule view */}
        {notification && <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
          <div style={{ padding: "1.8rem 2.4rem 1.6rem", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
                notification schedule
              </div>
              <div className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)" }}>
                {notification.name || notification.title}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.8rem", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", padding: "0.3rem 1rem", borderRadius: "9999px", color: tm.fg, background: tm.bg, border: `1px solid ${tm.border}` }}>
                {tm.label}
              </span>
              {notification.created && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)" }}>
                  created {fmt(notification.created)}
                </span>
              )}
            </div>
          </div>

          <div style={{ padding: "0.4rem 2.4rem 1.2rem" }}>
            {notification.name && notification.title && notification.name !== notification.title && (
              <MetaRow label="Title">{notification.title}</MetaRow>
            )}
            {notification.message && (
              <MetaRow label="Message">{notification.message}</MetaRow>
            )}
            {notification.url && (
              <MetaRow label="URL">
                <a href={notification.url} target="_blank" rel="noreferrer"
                  style={{ color: "var(--ink-60)", textDecoration: "none", wordBreak: "break-all" }}
                  className="hover:text-[var(--coral)] transition-colors">
                  {notification.url}
                </a>
              </MetaRow>
            )}
            {notification.timezone && (
              <MetaRow label="Timezone">
                {notification.timezone}
                {notification.useParticipantTimezone && (
                  <span style={{ marginLeft: 8, opacity: 0.6 }}>(adjusted to participant)</span>
                )}
              </MetaRow>
            )}
            {/* One-time */}
            {type_ === "one-time" && notification.date && (
              <MetaRow label="Scheduled for">{fmt(notification.date)}</MetaRow>
            )}
            {notification.window_from && notification.window_to && (
              <MetaRow label="Time window">{fmt(notification.window_from)} – {fmt(notification.window_to)}</MetaRow>
            )}
            {/* Repeat */}
            {notification.readable?.interval && (
              <MetaRow label="Repeat interval">{notification.readable.interval}</MetaRow>
            )}
            {startDesc && <MetaRow label="Start">{startDesc}</MetaRow>}
            {stopDesc  && <MetaRow label="Stop">{stopDesc}</MetaRow>}
            {notification.readable?.from && notification.readable?.to && (
              <MetaRow label="Daily window">
                {notification.readable.from} – {notification.readable.to}
                {notification.windowInterval?.number != null && (
                  <span style={{ marginLeft: 8, opacity: 0.6 }}>· {notification.windowInterval.number} per day</span>
                )}
              </MetaRow>
            )}
            {/* Random */}
            {notification.number != null && (
              <MetaRow label="Count">{notification.number} notifications</MetaRow>
            )}
            {notification.distance != null && (
              <MetaRow label="Min. distance">{Math.round(notification.distance / 60000)} min</MetaRow>
            )}
            {/* Audience */}
            {notification.participantId && notification.participantId.length > 0 && (
              <MetaRow label="Participants">{notification.participantId.join(", ")}</MetaRow>
            )}
            {notification.allCurrentParticipants && (
              <MetaRow label="Audience">All current participants</MetaRow>
            )}
            {notification.randomize && (
              <MetaRow label="Randomized">Yes</MetaRow>
            )}
            {notification.scheduleInFuture && (
              <MetaRow label="Future participants">Included</MetaRow>
            )}
            {durationHours != null && (
              <MetaRow label="Expires in">{durationHours} h</MetaRow>
            )}
          </div>
        </div>}

        {/* Agenda jobs — only in single-schedule view */}
        {notification && jobs.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <SectionLabel>agenda jobs · {jobs.length}</SectionLabel>
              <div style={{ display: "flex", gap: "0.6rem" }}>
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
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                    <th style={TH}>Type</th>
                    <th style={TH}>Next run</th>
                    <th style={TH}>Last run</th>
                    <th style={TH}>Interval</th>
                    <th style={TH}>Participant</th>
                    <th style={TH}>Group</th>
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
                        <div style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
                          <a href={`/scheduled/${notificationId}/edit/${job._id}?project=${studyId}`}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
                            className="hover:text-[var(--ink)] transition-colors">
                            edit
                          </a>
                          <a href={`/scheduled/delete/${notificationId}/${job._id}?project=${studyId}`}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--coral)", textDecoration: "none", letterSpacing: ".04em" }}
                            className="hover:opacity-70 transition-opacity">
                            delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Pending queue */}
        <section>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.8rem", flexWrap: "wrap", gap: "1rem" }}>
              <SectionLabel>
                scheduled queue · {pendingCount.toLocaleString()} notification{pendingCount !== 1 ? "s" : ""}
              </SectionLabel>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
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
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: ".04em", padding: "0.3rem 0.8rem", alignSelf: "center" }}
                    className="hover:text-[var(--ink)] transition-colors">
                    clear ×
                  </a>
                )}
              </div>
            </div>

            {/* Participant filter */}
            {participants.length > 0 && (
              <form method="get" action={`/scheduled/${studyId}`}
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                {notificationId && <input type="hidden" name="notificationId" value={notificationId} />}
                {pnStatusParam && <input type="hidden" name="pnStatus" value={pnStatusParam} />}
                {pnSort && <input type="hidden" name="pnSort" value={pnSort} />}
                {pnDir && <input type="hidden" name="pnDir" value={pnDir} />}
                <label style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0 }}>
                  Participant
                </label>
                <select name="pnUser" defaultValue={pnUser ?? ""}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "0.5rem 1rem", outline: "none" }}>
                  <option value="">All</option>
                  {participants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.username ? `${p.username} (${p.id})` : p.id}
                    </option>
                  ))}
                </select>
                <button type="submit"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.5rem 1.4rem", borderRadius: "9999px", border: "1px solid var(--ink-20)", background: "transparent", color: "var(--ink-60)", cursor: "pointer" }}
                  className="hover:opacity-70 transition-opacity">
                  Apply
                </button>
                {pnUser && (
                  <a href={filterHref({ pnUser: "" })}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: ".04em" }}
                    className="hover:text-[var(--ink)] transition-colors">
                    clear ×
                  </a>
                )}
              </form>
            )}

            {pendingCount === 0 ? (
              <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "3.2rem 2.4rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: "0 0 0.6rem" }}>
                  {pnStatuses.length > 0
                    ? "No notifications match this filter."
                    : "No notifications in the queue."}
                </p>
                {pnStatuses.length === 0 && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-20)", margin: 0, lineHeight: 1.6 }}>
                    All sends have been delivered, or this schedule has not generated any rows yet.
                    {" "}Toggle <strong style={{ fontWeight: 600, color: "var(--ink-40)" }}>Sent</strong> or{" "}
                    <strong style={{ fontWeight: 600, color: "var(--ink-40)" }}>Cancelled</strong> above to see history.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                        <th style={TH}>
                          <a href={sortHref("scheduledFor")} style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
                            Scheduled for{sortArrow("scheduledFor")}
                          </a>
                        </th>
                        <th style={TH}>
                          <a href={sortHref("status")} style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
                            Status{sortArrow("status")}
                          </a>
                        </th>
                        <th style={TH}>Title</th>
                        <th style={TH}>Recipients</th>
                        <th style={{ ...TH, width: "1%", whiteSpace: "nowrap" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pendingItems as IPendingNotification[]).map((pn, i) => {
                        const sm = PN_STATUS_META[pn.status] ?? PN_STATUS_META.cancelled;
                        const pnId = String(pn._id);
                        const rowNotifId = notificationId ?? pn.notificationConfigId;
                        const deleteAction = deletePendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam);
                        const cancelAction = cancelPendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam);
                        const reactivateAction = reactivatePendingNotificationAction.bind(null, studyId, pnId, rowNotifId, pnStatusParam);
                        return (
                          <tr key={pnId}
                            style={{ borderBottom: i < pendingItems.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                            className="hover:bg-[var(--paper)] transition-colors">
                            <td style={TD}>{fmt(pn.scheduledFor)}</td>
                            <td style={{ padding: "1rem 1.6rem" }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: sm.bg, color: sm.color }}>
                                {sm.label}
                              </span>
                            </td>
                            <td style={{ ...TD, maxWidth: "22rem" }}>
                              <div className="truncate">{pn.title || pn.message || "—"}</div>
                            </td>
                            <td style={{ ...TD, color: "var(--ink-40)", maxWidth: "18rem" }}>
                              <div className="truncate">
                                {pn.recipientUserIds.length
                                  ? pn.recipientUserIds
                                      .map((id) => participantCodeById.get(id) ?? id)
                                      .join(", ")
                                  : "all"}
                              </div>
                            </td>
                            <td style={{ padding: "0.6rem 1.6rem", whiteSpace: "nowrap" }}>
                              <PendingActions
                                status={pn.status}
                                scheduledFor={pn.scheduledFor}
                                deleteAction={deleteAction}
                                cancelAction={cancelAction}
                                reactivateAction={reactivateAction}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pendingPages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.2rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".04em" }}>
                      Page {pnPage} of {pendingPages} · {pendingCount.toLocaleString()} total
                    </span>
                    <div style={{ display: "flex", gap: "0.6rem" }}>
                      {pnPage > 1 && (
                        <a href={pageHref(pnPage - 1)}
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.4rem 1rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", textDecoration: "none", color: "var(--ink-60)" }}
                          className="hover:opacity-70 transition-opacity">
                          ← Prev
                        </a>
                      )}
                      {pnPage < pendingPages && (
                        <a href={pageHref(pnPage + 1)}
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.4rem 1rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", textDecoration: "none", color: "var(--ink-60)" }}
                          className="hover:opacity-70 transition-opacity">
                          Next →
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
        </section>

      </div>
    </div>
  );
}
