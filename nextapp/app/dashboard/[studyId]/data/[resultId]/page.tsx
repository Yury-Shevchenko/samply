import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchResultById } from "@/lib/data/results";
import { deleteResultAction } from "./actions";
import { DeleteResultForm } from "./DeleteResultForm";

interface Props {
  params: Promise<{ studyId: string; resultId: string }>;
}

const STATUS_PRIORITY: Record<string, number> = {
  completed: 6, "opened-in-app": 5, tapped: 4,
  archived: 3, "received-in-app": 2, sent: 1,
};

function StatusPill({ status }: { status: string }) {
  const isCompleted = status === "completed";
  const isTapped = status === "tapped" || status === "opened-in-app";
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      padding: "0.2rem 0.8rem",
      borderRadius: "9999px",
      background: isCompleted ? "rgba(61,115,107,.1)" : isTapped ? "rgba(124,106,181,.1)" : "var(--ink-10)",
      color: isCompleted ? "var(--sage)" : isTapped ? "#7c6ab5" : "var(--ink-60)",
    }}>
      {status}
    </span>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "1.6rem", alignItems: "baseline", padding: "0.9rem 0", borderBottom: "1px solid var(--ink-10)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, width: "11rem" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
        {children}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
      {children}
    </div>
  );
}

export default async function ResultDetailPage({ params }: Props) {
  const { studyId, resultId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, result] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchResultById(resultId, studyId),
  ]);

  if (!project) notFound();
  if (!result) notFound();

  const events = (result.events ?? []).slice().sort(
    (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
  );

  const bestStatus = events.reduce<{ status: string; priority: number }>(
    (acc, e) => {
      const p = STATUS_PRIORITY[e.status] ?? 0;
      return p > acc.priority ? { status: e.status, priority: p } : acc;
    },
    { status: "sent", priority: 0 },
  ).status;

  const title = result.data?.title ?? result.data?.message ?? "Notification";
  const deleteAction = deleteResultAction.bind(null, studyId, resultId);

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Breadcrumb */}
      <div>
        <a href={`/dashboard/${studyId}/data`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
          className="hover:text-[var(--ink)] transition-colors">
          ← Data
        </a>
      </div>

      {/* Header card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)", overflow: "hidden" }}>
        <div style={{ padding: "1.8rem 2.4rem 1.6rem", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              notification
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)", maxWidth: 480 }}>
              {title}
            </div>
          </div>
          <div style={{ flexShrink: 0, marginTop: "0.6rem" }}>
            <StatusPill status={bestStatus} />
          </div>
        </div>

        <div style={{ padding: "0.4rem 2.4rem 1.2rem" }}>
          <MetaRow label="Participant">
            <a href={`/dashboard/${studyId}/participants/${result.samplyid}`}
              style={{ color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:text-[var(--coral)] transition-colors">
              {result.samplyid}
            </a>
          </MetaRow>
          <MetaRow label="Sent">
            {new Date(result.created).toLocaleString()}
          </MetaRow>
          {result.data?.message && result.data.message !== title && (
            <MetaRow label="Message">{result.data.message}</MetaRow>
          )}
          {result.data?.url && (
            <MetaRow label="URL">
              <a href={result.data.url} target="_blank" rel="noreferrer"
                style={{ color: "var(--ink-60)", textDecoration: "none", wordBreak: "break-all" }}
                className="hover:text-[var(--coral)] transition-colors">
                {result.data.url}
              </a>
            </MetaRow>
          )}
          {result.data?.expireAt && (
            <MetaRow label="Expires">
              {new Date(result.data.expireAt).toLocaleString()}
            </MetaRow>
          )}
          {result.messageId && (
            <MetaRow label="Message ID">
              <span style={{ color: "var(--ink-40)" }}>{result.messageId}</span>
            </MetaRow>
          )}
          {result.batch != null && (
            <MetaRow label="Batch">{String(result.batch)}</MetaRow>
          )}
        </div>
      </div>

      {/* Event timeline */}
      <section>
        <SectionLabel>event log · {events.length}</SectionLabel>

        {events.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "2.8rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>
              No events recorded.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {events.map((e, i) => {
              const isLast = i === events.length - 1;
              const isCompleted = e.status === "completed";
              const isTapped = e.status === "tapped" || e.status === "opened-in-app";
              const accentColor = isCompleted ? "var(--sage)" : isTapped ? "#7c6ab5" : "var(--ink-30)";
              const eventData = e.data as Record<string, unknown> | null | undefined;
              return (
                <div key={i} style={{ display: "flex", gap: "1.6rem", alignItems: "flex-start" }}>
                  {/* Timeline spine */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: "0.2rem" }}>
                    <div style={{ width: "1rem", height: "1rem", borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
                    {!isLast && <div style={{ width: "0.1rem", flex: 1, minHeight: "2.4rem", background: "var(--ink-10)", margin: "0.3rem 0" }} />}
                  </div>
                  {/* Event content */}
                  <div style={{ paddingBottom: isLast ? 0 : "1.6rem", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: eventData && Object.keys(eventData).length > 0 ? "0.6rem" : 0 }}>
                      <StatusPill status={e.status} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>
                        {new Date(e.created).toLocaleString()}
                      </span>
                    </div>
                    {eventData && Object.keys(eventData).length > 0 && (
                      <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1rem 1.4rem", marginTop: "0.4rem" }}>
                        {Object.entries(eventData).map(([k, v]) => (
                          <div key={k} style={{ display: "flex", gap: "1.2rem", alignItems: "baseline", padding: "0.3rem 0" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, width: "9rem" }}>
                              {k}
                            </span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", wordBreak: "break-all" }}>
                              {typeof v === "object" ? JSON.stringify(v) : String(v ?? "—")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Delivery ticket */}
      {result.ticket && Object.keys(result.ticket).length > 0 && (
        <section>
          <SectionLabel>delivery ticket</SectionLabel>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "0.4rem 2.4rem 1.2rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            {Object.entries(result.ticket as Record<string, unknown>).map(([k, v]) => (
              <MetaRow key={k} label={k}>
                {typeof v === "object" ? JSON.stringify(v) : String(v ?? "—")}
              </MetaRow>
            ))}
          </div>
        </section>
      )}

      {/* Danger zone */}
      <section>
        <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2, marginBottom: "2rem" }} />
        <SectionLabel>danger zone</SectionLabel>
        <div style={{ background: "rgba(214,90,48,.04)", border: "1px solid rgba(214,90,48,.15)", borderRadius: "0.8rem", padding: "1.8rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.6rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.3rem" }}>
              Delete this record
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.55 }}>
              Permanently deletes this notification record and all its events.
            </p>
          </div>
          <DeleteResultForm action={deleteAction} />
        </div>
      </section>

    </div>
  );
}
