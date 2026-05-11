import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { fetchScheduledNotifications, type NotificationConfig } from "@/lib/data/scheduled";
import ProjectSelector from "@/app/components/ProjectSelector";
import { deleteAllNotificationsAction, deleteNotificationAction } from "./actions";
import { DeleteScheduleButton } from "./DeleteScheduleButton";

export const metadata = { title: "Scheduled Notifications — Samply" };

const TYPE_META: Record<string, { label: string; fg: string; bg: string; border: string }> = {
  random:     { label: "random",    fg: "var(--coral)",  bg: "rgba(214,90,48,.08)",   border: "rgba(214,90,48,.25)" },
  "one-time": { label: "one-time",  fg: "var(--sage)",   bg: "rgba(61,115,107,.08)",  border: "rgba(61,115,107,.25)" },
  event:      { label: "event",     fg: "#7c6ab5",       bg: "rgba(124,106,181,.08)", border: "rgba(124,106,181,.25)" },
  repeating:  { label: "repeating", fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
  fixed:      { label: "fixed",     fg: "var(--ink-60)", bg: "var(--ink-10)",         border: "var(--ink-20)" },
};

function eventWindowStr(
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

function scheduleDescription(n: NotificationConfig): string {
  const type = scheduleType(n);
  if (type === "random") {
    const count = n.number ?? "?";
    const from = n.readable?.from ?? "—";
    const to = n.readable?.to ?? "—";
    return `${count}× random · ${from}–${to}`;
  }
  if (type === "one-time") return n.date ? new Date(n.date).toLocaleString() : "scheduled once";
  if (type === "event") {
    const interval = n.readable?.interval ?? (n.distance != null ? `every ${Math.round(n.distance / 60000)}min` : null);
    const stopStr  = eventWindowStr(n.stop_event,  n.stop_next,  n.stop_after);
    const startStr = eventWindowStr(n.start_event, n.start_next, n.start_after);
    const window = startStr && stopStr ? `${startStr} – ${stopStr}` : (stopStr ?? startStr);
    if (interval && window) return `${interval} · ${window}`;
    if (interval) return interval;
    if (window) return window;
    return "event-based";
  }
  if (type === "repeating") return n.readable?.interval ?? (n.distance ? `every ${Math.round(n.distance / 60000)}min` : "repeating");
  return "fixed schedule";
}

function fmt(date: Date | string | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function NotifRow({
  n,
  projectId,
}: {
  n: NotificationConfig;
  projectId: string;
}) {
  const type = scheduleType(n);
  const tm = TYPE_META[type] ?? TYPE_META.fixed;
  const deleteOne = deleteNotificationAction.bind(null, projectId, n.id, undefined);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1.4rem",
      padding: "1.4rem 2rem",
      borderBottom: "1px solid var(--ink-10)",
      background: "var(--surface)",
    }}>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        fontWeight: 600,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        padding: "0.2rem 0.7rem",
        borderRadius: "9999px",
        color: tm.fg,
        background: tm.bg,
        border: `1px solid ${tm.border}`,
        flexShrink: 0,
      }}>
        {tm.label}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.2rem" }}>
          {n.name || n.title}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-40)" }}>
          {scheduleDescription(n)}
          {n.created && (
            <span style={{ marginLeft: "1rem", opacity: 0.7 }}>· created {fmt(n.created)}</span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.4rem", flexShrink: 0 }}>
        <a
          href={`/scheduled/${projectId}?notificationId=${n.id}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            letterSpacing: ".04em",
            color: "var(--ink-60)",
            textDecoration: "none",
          }}
          className="hover:text-[var(--ink)] transition-colors"
        >
          view queue →
        </a>
        <DeleteScheduleButton
          action={deleteOne}
          label="delete"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            letterSpacing: ".04em",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--coral)",
            padding: 0,
            opacity: 0.75,
          }}
        />
      </div>
    </div>
  );
}

export default async function ScheduledPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId } = await searchParams;
  const { projects, invitedProjects } = await fetchUserProjects(session.user.id);
  const allProjects = [...projects, ...invitedProjects];
  const selectorProjects = allProjects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (allProjects[0] ? String(allProjects[0]._id) : undefined);
  const selectedProject = allProjects.find((p) => String(p._id) === selectedId);

  const notifications: NotificationConfig[] = selectedId
    ? await fetchScheduledNotifications(selectedId)
    : [];

  const deleteAll = selectedId
    ? deleteAllNotificationsAction.bind(null, selectedId)
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", padding: "4rem 2.4rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.8rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              notification schedules
            </div>
            <h1 className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "2.8rem", letterSpacing: "-0.025em", lineHeight: 1, color: "var(--ink)" }}>
              {selectedProject?.name ?? "All Schedules"}
            </h1>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            {selectedId && (
              <a
                href={`/dashboard/${selectedId}/schedule`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.1rem",
                  letterSpacing: ".04em",
                  color: "var(--ink-60)",
                  textDecoration: "none",
                  padding: "0.7rem 1.4rem",
                  border: "1px solid var(--ink-20)",
                  borderRadius: "9999px",
                }}
                className="hover:opacity-70 transition-opacity"
              >
                ← Back to dashboard
              </a>
            )}
            {selectedId && (
              <a
                href={`/dashboard/${selectedId}/schedule/new`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  padding: "0.7rem 1.6rem",
                  background: "var(--coral)",
                  color: "#fff",
                  borderRadius: "9999px",
                  textDecoration: "none",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                + Add schedule
              </a>
            )}
          </div>
        </div>

        {/* Project selector */}
        {selectorProjects.length > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-40)" }}>
              Study
            </span>
            <ProjectSelector
              projects={selectorProjects}
              selectedId={selectedId}
            />
          </div>
        )}

        {/* Content */}
        {!selectedId ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "4rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.3rem", color: "var(--ink-40)", margin: 0 }}>
              Select a study above to view its schedules.
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "4rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 1.6rem", lineHeight: 1.6 }}>
              No notification schedules yet.
            </p>
            {selectedId && (
              <a
                href={`/dashboard/${selectedId}/schedule/new`}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2.4rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}
              >
                + Add first schedule
              </a>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
            {/* Schedule list */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
              <div style={{ padding: "1.2rem 2rem", background: "var(--paper)", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)" }}>
                  {notifications.length} schedule{notifications.length !== 1 ? "s" : ""}
                </span>
                {deleteAll && (
                  <DeleteScheduleButton
                    action={deleteAll}
                    label="Delete all"
                    confirmMessage={`Delete all ${notifications.length} schedules and their associated jobs? This cannot be undone.`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.95rem",
                      letterSpacing: ".04em",
                      background: "none",
                      border: "1px solid rgba(214,90,48,.3)",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem",
                      cursor: "pointer",
                      color: "var(--coral)",
                    }}
                  />
                )}
              </div>
              {notifications.map((n, i) => (
                <div key={n.id ?? i} style={{ borderBottom: i < notifications.length - 1 ? "1px solid var(--ink-10)" : "none" }}>
                  <NotifRow n={n} projectId={selectedId} />
                </div>
              ))}
            </div>

            {/* Stats summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
              {[
                { label: "Total schedules", value: notifications.length },
                { label: "Random", value: notifications.filter((n) => scheduleType(n) === "random").length },
                { label: "Repeating", value: notifications.filter((n) => ["repeating", "fixed"].includes(scheduleType(n))).length },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.4rem 1.8rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.5rem" }}>{label}</div>
                  <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "2.4rem", letterSpacing: "-0.025em", color: "var(--ink)" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
