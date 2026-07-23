import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchScheduledNotifications, type NotificationConfig } from "@/lib/data/scheduled";
import Hand from "@/app/components/ui/Hand";
import { deleteNotificationAction } from "@/app/scheduled/actions";
import { DeleteScheduleButton } from "@/app/scheduled/DeleteScheduleButton";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ studyId: string }>;
}

// Alternating card tilts — matches the postcards design language
const TILTS = [-0.8, 0.6, -0.5, 0.7, -0.6, 0.5];

const TYPE_META: Record<string, { label: string; fg: string; bg: string; border: string }> = {
  "one-time":   { label: "one-time",   fg: "var(--coral)",  bg: "rgba(214,90,48,.08)",   border: "rgba(214,90,48,.25)" },
  repeating:    { label: "repeating",  fg: "var(--sage)",   bg: "rgba(61,115,107,.08)",  border: "rgba(61,115,107,.25)" },
  randomized:   { label: "randomized", fg: "var(--sage)",   bg: "rgba(61,115,107,.08)",  border: "rgba(61,115,107,.25)" },
  personal:     { label: "personal",   fg: "var(--coral)",  bg: "rgba(214,90,48,.08)",   border: "rgba(214,90,48,.25)" },
  enrollment:   { label: "on join",    fg: "#7c6ab5",       bg: "rgba(124,106,181,.08)", border: "rgba(124,106,181,.25)" },
};

function eventWindowStr(
  event?: string,
  next?: number | string,
  after?: { days?: number; hours?: number; minutes?: number } | string,
): string | null {
  if (!event) return null;
  // next can arrive as "" from the form for non-"next" strategy variants
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
  if (n.start_event === "registration" || n.stop_event === "registration") return "personal";
  if (n.randomize) return "randomized";
  if (n.date && !n.int_start) return "one-time";
  if (n.int_start || n.int_end) return "repeating";
  return "repeating";
}

function scheduleDescription(n: NotificationConfig): string {
  const type = scheduleType(n);
  if (type === "enrollment") {
    const d = n.delay;
    if (!d || (!d.days && !d.hours && !d.minutes)) return "immediately on join";
    const parts: string[] = [];
    if (d.days)    parts.push(`${d.days}d`);
    if (d.hours)   parts.push(`${d.hours}h`);
    if (d.minutes) parts.push(`${d.minutes}m`);
    return `${parts.join(" ")} after join`;
  }
  if (type === "randomized") {
    const count = n.number ?? "?";
    const from = n.readable?.from ?? "—";
    const to = n.readable?.to ?? "—";
    return `${count}× random · ${from}–${to}`;
  }
  if (type === "one-time") return n.date ? new Date(n.date).toLocaleString() : "scheduled once";
  if (type === "personal") {
    const interval = n.readable?.interval ?? (n.distance != null ? `every ${Math.round(n.distance / 60000)}min` : null);
    const stopStr  = eventWindowStr(n.stop_event,  n.stop_next,  n.stop_after);
    const startStr = eventWindowStr(n.start_event, n.start_next, n.start_after);
    const window = startStr && stopStr ? `${startStr} – ${stopStr}` : (stopStr ?? startStr);
    if (interval && window) return `${interval} · ${window}`;
    if (interval) return interval;
    if (window) return window;
    return n.readable?.interval ?? "personal";
  }
  if (type === "repeating") return n.readable?.interval ?? (n.distance ? `every ${Math.round(n.distance / 60000)}min` : "repeating");
  return "scheduled";
}

type BoundAction = (formData?: FormData) => void | Promise<void>;
type TFn = (key: string, params?: Record<string, string | number>) => string;

function NotifCard({ n, studyId, index, deleteAction, t }: { n: NotificationConfig; studyId: string; index: number; deleteAction: BoundAction; t: TFn }) {
  const type = scheduleType(n);
  const tm = TYPE_META[type] ?? TYPE_META.repeating;
  const tilt = TILTS[index % TILTS.length];

  return (
    <div className="notif-card" style={{
      background: "var(--surface)",
      border: "1px solid var(--ink-10)",
      borderRadius: "0.6rem",
      padding: "1.8rem 2rem",
      boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 1.2rem 2.4rem rgba(60,40,20,.06)",
      transform: `rotate(${tilt}deg)`,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      {/* Type badge */}
      <div>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.95rem",
          fontWeight: 600,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          padding: "0.3rem 0.8rem",
          borderRadius: "9999px",
          color: tm.fg,
          background: tm.bg,
          border: `1px solid ${tm.border}`,
        }}>
          {type === "one-time" ? t("schedule.typeOneTime") : type === "randomized" ? t("schedule.typeRandomized") : type === "personal" ? t("schedule.typePersonal") : type === "enrollment" ? t("schedule.typeEnrollment") : t("schedule.typeRepeating")}
        </span>
      </div>

      {/* Name */}
      <div>
        <div style={{ fontSize: "1.45rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}>
          {n.name || n.title}
        </div>
        {n.name && n.title && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", marginTop: "0.3rem" }}>
            &ldquo;{n.title}&rdquo;
          </div>
        )}
      </div>

      {/* Schedule description */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--ink-60)", letterSpacing: ".02em" }}>
        {scheduleDescription(n)}
      </div>

      {/* Message preview */}
      {n.message && (
        <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", background: "var(--paper)", borderRadius: "0.6rem", padding: "0.8rem 1.2rem", lineHeight: 1.55, borderLeft: `2px solid var(--ink-10)` }}>
          {n.message}
        </div>
      )}

      {/* Footer */}
      <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.3 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
        <a href={`/scheduled/${studyId}?notificationId=${n.id}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
          className="hover:opacity-70 transition-opacity">
          {t("schedule.viewQueueCard")}
        </a>
        <a href={`/dashboard/${studyId}/schedule/${n.id}/edit`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
          className="hover:opacity-70 transition-opacity">
          edit
        </a>
        </div>
        <DeleteScheduleButton
          action={deleteAction}
          label={t("schedule.delete")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            letterSpacing: ".04em",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--coral)",
            padding: "0.2rem 0.4rem",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}

const SECTION_ORDER = ["enrollment", "one-time", "repeating", "randomized", "personal"] as const;

export default async function SchedulePage({ params }: Props) {
  const { studyId } = await params;
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, notifications] = await Promise.all([
    fetchProjectById(studyId, session.user.id, session.user.level > 100),
    fetchScheduledNotifications(studyId),
  ]);

  if (!project) notFound();

  const byType: Record<string, typeof notifications> = {
    enrollment:  notifications.filter((n) => scheduleType(n) === "enrollment"),
    "one-time":  notifications.filter((n) => scheduleType(n) === "one-time"),
    repeating:   notifications.filter((n) => scheduleType(n) === "repeating"),
    randomized:  notifications.filter((n) => scheduleType(n) === "randomized"),
    personal:    notifications.filter((n) => scheduleType(n) === "personal"),
  };

  let cardIndex = 0;

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Header */}
      <div className="mob-col mob-col-start" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            {t("schedule.label")}
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {t(notifications.length === 1 ? "schedule.count" : "schedule.countPlural", { n: notifications.length })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a href={`/scheduled/${studyId}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "transparent", color: "var(--ink-60)", border: "1px solid var(--ink-20)", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}
            className="hover:opacity-70 transition-opacity">
            {t("schedule.viewQueue")}
          </a>
          <a href={`/dashboard/${studyId}/schedule/new`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}
            className="hover:opacity-90 transition-opacity">
            {t("schedule.addSchedule")}
          </a>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "5.6rem 2.4rem", textAlign: "center" }}>
          <Hand size={20} style={{ marginBottom: "1.2rem" }}>{t("schedule.emptyTitle")}</Hand>
          <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2rem", lineHeight: 1.6 }}>
            {t("schedule.emptyBody")}
          </p>
          <a href={`/dashboard/${studyId}/schedule/new`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2.4rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontSize: "1.35rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}>
            {t("schedule.addFirst")}
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-[2.8rem]">
          {SECTION_ORDER.map((type) => {
            const items = byType[type];
            if (!items || items.length === 0) return null;
            const tm = TYPE_META[type];
            return (
              <section key={type}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.4rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "9999px", color: tm.fg, background: tm.bg, border: `1px solid ${tm.border}` }}>
                    {type === "one-time" ? t("schedule.typeOneTime") : type === "randomized" ? t("schedule.typeRandomized") : type === "personal" ? t("schedule.typePersonal") : type === "enrollment" ? t("schedule.typeEnrollment") : t("schedule.typeRepeating")}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".1em" }}>
                    {t(items.length === 1 ? "schedule.configs" : "schedule.configsPlural", { n: items.length })}
                  </span>
                </div>
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.8rem" }}>
                  {items.map((n) => {
                    const deleteAction = deleteNotificationAction.bind(null, studyId, n.id, `/dashboard/${studyId}/schedule`);
                    return <NotifCard key={n.id} n={n} studyId={studyId} index={cardIndex++} deleteAction={deleteAction} t={t} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
