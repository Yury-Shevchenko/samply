import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import { fetchScheduledNotifications, type NotificationConfig } from "@/lib/data/scheduled";
import { fetchComplianceForProject } from "@/lib/data/compliance";
import Hand from "@/app/components/ui/Hand";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { toggleStudyActiveAction } from "./actions";
import connectDB from "@/lib/db";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ studyId: string }>;
}

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.4rem" }}>
      {children}
    </div>
  );
}

function Perf() {
  return (
    <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.35, margin: "0.4rem 0" }} />
  );
}

function StatBox({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.6rem 2rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.8rem" }}>
        {label}
      </div>
      <div className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "3.4rem", color: accent ? "var(--coral)" : "var(--ink)", letterSpacing: "-0.025em", lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-40)", marginTop: "0.5rem" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

const TYPE_COLOR: Record<string, { fg: string; bg: string }> = {
  "one-time":  { fg: "var(--coral)", bg: "rgba(214,90,48,.1)" },
  repeating:   { fg: "var(--sage)",  bg: "rgba(61,115,107,.1)" },
  randomized:  { fg: "var(--sage)",  bg: "rgba(61,115,107,.1)" },
  personal:    { fg: "var(--coral)", bg: "rgba(214,90,48,.1)" },
};

function scheduleType(n: { randomize?: boolean; date?: unknown; int_start?: unknown; start_event?: string; stop_event?: string; int_end?: unknown }): string {
  if (n.start_event === "registration" || n.stop_event === "registration") return "personal";
  if (n.randomize) return "randomized";
  if (n.date && !n.int_start) return "one-time";
  if (n.int_start || n.int_end) return "repeating";
  return "repeating";
}

function scheduleSubtitle(n: NotificationConfig): string {
  const parts: string[] = [];

  if (n.readable?.from && n.readable?.to) {
    parts.push(`${n.readable.from} – ${n.readable.to}`);
  }
  if (n.readable?.interval) {
    parts.push(n.readable.interval);
  }
  if (n.date && !n.int_start) {
    parts.push(new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
  }
  if (n.number && n.distance) {
    parts.push(`${n.number}× per ${n.distance}h window`);
  }
  if (n.int_start && !n.readable?.from) {
    parts.push(`from ${new Date(n.int_start).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
  }
  if (n.int_end && !n.readable?.to) {
    parts.push(`until ${new Date(n.int_end).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
  }
  if (n.reminders?.length) {
    parts.push(`${n.reminders.length} reminder${n.reminders.length > 1 ? "s" : ""}`);
  }
  return parts.join(" · ");
}

function fmtJoinDate(d?: Date): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
}

async function fetchNotifCounts(studyId: string, configIds: string[]): Promise<Map<string, { sent: number; pending: number }>> {
  if (!configIds.length) return new Map();
  await connectDB();
  const oid = new mongoose.Types.ObjectId(studyId);
  const rows = await PendingNotification.aggregate([
    { $match: { projectId: oid, notificationConfigId: { $in: configIds } } },
    { $group: {
      _id: { configId: "$notificationConfigId", status: "$status" },
      count: { $sum: 1 },
    }},
  ]);
  const map = new Map<string, { sent: number; pending: number }>();
  for (const row of rows) {
    const id = row._id.configId as string;
    const entry = map.get(id) ?? { sent: 0, pending: 0 };
    if (row._id.status === "sent") entry.sent += row.count;
    else if (row._id.status === "pending" || row._id.status === "processing") entry.pending += row.count;
    map.set(id, entry);
  }
  return map;
}

export default async function StudyOverviewPage({ params }: Props) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, participants, notifications, compliance] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
    fetchScheduledNotifications(studyId),
    fetchComplianceForProject(studyId),
  ]);

  if (!project) notFound();

  const notifCounts = await fetchNotifCounts(studyId, notifications.map((n) => n.id));
  const activeParticipants = participants.filter((p) => !p.deactivated);
  const isLow = compliance.sent > 0 && compliance.pct < 60;

  const toggleActive = toggleStudyActiveAction.bind(null, studyId);

  return (
    <div className="flex flex-col gap-[3.2rem]">

      {/* Stats row */}
      <div className="stats-grid">
        <StatBox label="Participants" value={activeParticipants.length} sub={`${participants.length} total enrolled`} />
        <StatBox label="Schedules" value={notifications.length} sub="notification configs" />
        <StatBox
          label="7-day compliance"
          value={compliance.sent > 0 ? `${compliance.pct}%` : "—"}
          sub={compliance.sent > 0 ? `${compliance.responded}/${compliance.sent} responses` : "no data yet"}
          accent={isLow}
        />
        <StatBox
          label="Status"
          value={project.currentlyActive ? "Live" : "Draft"}
          sub={project.public ? "publicly listed" : "private study"}
        />
      </div>

      {/* Activate toggle + approval */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <form action={toggleActive}>
          <SubmitButton
            pendingLabel={project.currentlyActive ? "Pausing…" : "Activating…"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              padding: "0.8rem 1.8rem",
              borderRadius: "9999px",
              fontSize: "1.3rem",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              border: "none",
              background: project.currentlyActive ? "rgba(61,115,107,.12)" : "var(--ink)",
              color: project.currentlyActive ? "var(--sage)" : "var(--paper)",
              transition: "opacity .12s",
            }}
          >
            {project.currentlyActive ? (
              <><span style={{ fontSize: "0.7em" }}>●</span> Collecting — pause study</>
            ) : (
              <>Activate study</>
            )}
          </SubmitButton>
        </form>

        {!project.public && (
          <a
            href={`/dashboard/${studyId}/approval`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.8rem",
              borderRadius: "9999px",
              fontSize: "1.3rem",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              border: project.requestedForApproval ? "1px solid rgba(61,115,107,.3)" : "1px solid var(--ink-20)",
              color: project.requestedForApproval ? "var(--sage)" : "var(--ink-60)",
              background: project.requestedForApproval ? "rgba(61,115,107,.06)" : "transparent",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            {project.requestedForApproval ? "✓ Review requested" : "Submit for review →"}
          </a>
        )}
        {project.public && (
          <span style={{ fontSize: "1.25rem", color: "var(--sage)", fontWeight: 500 }}>
            ✓ Publicly listed
          </span>
        )}
      </div>

      {/* Compliance */}
      {compliance.sent > 0 && (
        <section style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.8rem 2.2rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
            <Hand size={15}>7-day compliance</Hand>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: isLow ? "var(--coral)" : "var(--sage)", fontWeight: 600 }}>
              {compliance.pct}% · {compliance.responded}/{compliance.sent}
            </span>
          </div>
          <div style={{ height: "0.5rem", background: "var(--ink-10)", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${compliance.pct}%`, background: isLow ? "var(--coral)" : "var(--ink)", borderRadius: "9999px" }} />
          </div>
          {isLow && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.8rem", letterSpacing: ".02em" }}>
              ▲ Below 60% — consider checking in with participants.
            </p>
          )}
        </section>
      )}

      {/* Notification schedules preview */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.4rem" }}>
          <MonoLabel>notification schedules · {notifications.length}</MonoLabel>
          <div style={{ display: "flex", gap: "1.4rem" }}>
            <a href={`/scheduled/${studyId}`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
              className="hover:opacity-70 transition-opacity">
              view queue →
            </a>
            <a href={`/dashboard/${studyId}/schedule`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
              className="hover:opacity-70 transition-opacity">
              view all →
            </a>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "3.2rem 2.4rem", textAlign: "center" }}>
            <Hand size={17} style={{ marginBottom: "1rem" }}>no schedules yet</Hand>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 1.6rem" }}>Add a schedule to start reaching participants.</p>
            <a href={`/dashboard/${studyId}/schedule/new`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}>
              + Add schedule
            </a>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            {notifications.slice(0, 5).map((n, i) => {
              const type = scheduleType(n);
              const tc = TYPE_COLOR[type] ?? TYPE_COLOR.repeating;
              const sub = scheduleSubtitle(n);
              const counts = notifCounts.get(n.id);
              const total = counts ? counts.sent + counts.pending : null;
              return (
                <a
                  key={n.id}
                  href={`/scheduled/${studyId}?notificationId=${n.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.4rem",
                    padding: "1.2rem 1.8rem",
                    borderBottom: i < Math.min(notifications.length, 5) - 1 ? "1px solid var(--ink-10)" : "none",
                    textDecoration: "none",
                  }}
                  className="hover:bg-[var(--ink-05)] transition-colors"
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "9999px", color: tc.fg, background: tc.bg, flexShrink: 0 }}>
                    {type}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "1.35rem", color: "var(--ink)", fontWeight: 500 }} className="truncate">
                      {n.name || n.title}
                    </span>
                    {sub && (
                      <span style={{ display: "block", fontSize: "1.1rem", color: "var(--ink-40)", fontFamily: "var(--font-mono)", marginTop: "0.2rem" }} className="truncate">
                        {sub}
                      </span>
                    )}
                  </span>
                  {total !== null && (
                    <span className="mob-hide" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", flexShrink: 0, textAlign: "right", lineHeight: 1.4 }}>
                      <span style={{ display: "block" }}>{total} total</span>
                      <span style={{ color: counts!.pending > 0 ? "var(--coral)" : "var(--ink-20)" }}>
                        {counts!.sent} sent · {counts!.pending} pending
                      </span>
                    </span>
                  )}
                </a>
              );
            })}
            {notifications.length > 5 && (
              <div style={{ padding: "1rem 1.8rem", borderTop: "1px solid var(--ink-10)" }}>
                <a href={`/dashboard/${studyId}/schedule`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity">
                  + {notifications.length - 5} more schedules →
                </a>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Participants preview */}
      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.4rem" }}>
          <MonoLabel>participants · {activeParticipants.length} active</MonoLabel>
          <a href={`/dashboard/${studyId}/participants`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
            className="hover:opacity-70 transition-opacity">
            view all →
          </a>
        </div>

        {activeParticipants.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "2.8rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 1.4rem" }}>
              No participants enrolled yet.
            </p>
            <a href={`/dashboard/${studyId}/invitations`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", padding: "0.7rem 1.4rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", letterSpacing: ".04em" }}>
              Get enrollment link →
            </a>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            {activeParticipants.slice(0, 5).map((p, i) => {
              const joinDate = fmtJoinDate(p.created);
              const code = p.username ?? (p.information?.code as string | undefined);
              return (
                <a
                  key={p.id}
                  href={`/dashboard/${studyId}/participants/${p.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                    padding: "1.1rem 1.8rem",
                    borderBottom: i < Math.min(activeParticipants.length, 5) - 1 ? "1px solid var(--ink-10)" : "none",
                    textDecoration: "none",
                  }}
                  className="hover:bg-[var(--ink-05)] transition-colors"
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink)", flex: 1, minWidth: 0 }} className="truncate">
                    {p.id}
                  </span>
                  {code && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", background: "var(--ink-10)", padding: "0.15rem 0.6rem", borderRadius: "0.4rem", flexShrink: 0 }}>
                      {code}
                    </span>
                  )}
                  {p.group?.name && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".06em", flexShrink: 0 }}>
                      {p.group.name}
                    </span>
                  )}
                  {joinDate && (
                    <span className="mob-hide" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-20)", flexShrink: 0 }}>
                      joined {joinDate}
                    </span>
                  )}
                </a>
              );
            })}
            {activeParticipants.length > 5 && (
              <div style={{ padding: "1rem 1.8rem", borderTop: "1px solid var(--ink-10)" }}>
                <a href={`/dashboard/${studyId}/participants`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity">
                  + {activeParticipants.length - 5} more →
                </a>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Actions strip */}
      <section>
        <Perf />
        <div style={{ paddingTop: "1.6rem", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {[
            { label: "Edit study",       href: `/projects/${studyId}/edit` },
            { label: "Invitation links", href: `/dashboard/${studyId}/invitations` },
            { label: "Export CSV",       href: `/dashboard/${studyId}/data/export` },
            { label: "Delete study",     href: `/projects/${studyId}/delete`, coral: true },
          ].map(({ label, href, coral }) => (
            <a key={label} href={href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
                letterSpacing: ".04em",
                color: coral ? "var(--coral)" : "var(--ink-60)",
                textDecoration: "none",
                padding: "0.7rem 1.4rem",
                border: `1px solid ${coral ? "rgba(214,90,48,.3)" : "var(--ink-10)"}`,
                borderRadius: "9999px",
                background: coral ? "rgba(214,90,48,.05)" : "transparent",
              }}
              className="hover:opacity-70 transition-opacity">
              {label} →
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
