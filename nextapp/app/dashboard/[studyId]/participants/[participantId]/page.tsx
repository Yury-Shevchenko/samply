import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants, fetchHistory, fetchReceipts, fetchParticipantUserInfo } from "@/lib/data/participants";
import type { HistorySortBy, HistorySortOrder } from "@/lib/data/participants";
import type { IResult } from "@/lib/models/result";
import type { IReceipt } from "@/lib/models/receipt";
import { toggleParticipantAction, deleteParticipantAction } from "./actions";
import { DeleteForm } from "./DeleteForm";

interface Props {
  params: Promise<{ studyId: string; participantId: string }>;
  searchParams: Promise<{ page?: string; sort?: string; order?: string }>;
}

const STATUS_PRIORITY: Record<string, number> = {
  completed: 6, "opened-in-app": 5, tapped: 4,
  archived: 3, "received-in-app": 2, sent: 1,
};

const VALID_SORTS = new Set<HistorySortBy>(["title", "created", "status"]);

function bestStatus(r: IResult): string {
  return (r.events ?? []).reduce<{ status: string; priority: number }>(
    (acc, e) => {
      const p = STATUS_PRIORITY[e.status] ?? 0;
      return p > acc.priority ? { status: e.status, priority: p } : acc;
    },
    { status: "sent", priority: 0 },
  ).status;
}

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

function buildHref(
  studyId: string,
  participantId: string,
  page: number,
  sort: HistorySortBy,
  order: HistorySortOrder,
) {
  const p = new URLSearchParams();
  if (page > 1) p.set("page", String(page));
  p.set("sort", sort);
  p.set("order", order);
  return `/dashboard/${studyId}/participants/${participantId}?${p.toString()}`;
}

function SortTh({
  studyId, participantId, page, col, label, currentSort, currentOrder,
}: {
  studyId: string;
  participantId: string;
  page: number;
  col: HistorySortBy;
  label: string;
  currentSort: HistorySortBy;
  currentOrder: HistorySortOrder;
}) {
  const isActive = currentSort === col;
  const nextOrder: HistorySortOrder = isActive && currentOrder === "desc" ? "asc" : "desc";
  const indicator = isActive ? (currentOrder === "desc" ? " ↓" : " ↑") : "";
  return (
    <th style={{ ...TH, color: undefined }}>
      <a
        href={buildHref(studyId, participantId, 1, col, nextOrder)}
        style={{ color: isActive ? "var(--ink)" : "var(--ink-40)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
        className="hover:text-[var(--ink)] transition-colors"
      >
        {label}{indicator}
      </a>
    </th>
  );
}

export default async function ParticipantDetailPage({ params, searchParams }: Props) {
  const { studyId, participantId } = await params;
  const { page: pageParam, sort: sortParam, order: orderParam } = await searchParams;

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const sort: HistorySortBy = VALID_SORTS.has(sortParam as HistorySortBy)
    ? (sortParam as HistorySortBy)
    : "created";
  const order: HistorySortOrder = orderParam === "asc" ? "asc" : "desc";

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, allParticipants] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  const participant = allParticipants.find((p) => p.id === participantId);
  if (!participant) notFound();

  const [{ history, count, pages }, receipts, userInfo] = await Promise.all([
    fetchHistory(studyId, page, participantId, sort, order),
    fetchReceipts(participantId, session.user.id),
    fetchParticipantUserInfo(participantId),
  ]);

  const isDeactivated = participant.deactivated ?? false;

  const toggleAction = toggleParticipantAction.bind(null, studyId, participantId);
  const deleteAction = deleteParticipantAction.bind(null, studyId, participantId);

  function pageHref(p: number) {
    return buildHref(studyId, participantId, p, sort, order);
  }

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Breadcrumb */}
      <div>
        <a href={`/dashboard/${studyId}/participants`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
          className="hover:text-[var(--ink)] transition-colors">
          ← Participants
        </a>
      </div>

      {/* Profile card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)", overflow: "hidden" }}>
        <div style={{ padding: "1.8rem 2.4rem 1.6rem", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              participant
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>
              {participantId}
            </div>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            padding: "0.4rem 1.2rem",
            borderRadius: "9999px",
            background: isDeactivated ? "rgba(214,90,48,.08)" : "rgba(61,115,107,.08)",
            color: isDeactivated ? "var(--coral)" : "var(--sage)",
            border: isDeactivated ? "1px solid rgba(214,90,48,.2)" : "1px solid rgba(61,115,107,.2)",
            flexShrink: 0,
            marginTop: "0.6rem",
          }}>
            {isDeactivated ? "deactivated" : "active"}
          </span>
        </div>

        <div style={{ padding: "0.4rem 2.4rem 1.2rem" }}>
          {participant.username && (
            <MetaRow label="Code">{participant.username}</MetaRow>
          )}
          {participant.group?.name && (
            <MetaRow label="Group">
              <span style={{ padding: "0.2rem 0.8rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)" }}>
                {participant.group.name}
              </span>
            </MetaRow>
          )}
          <MetaRow label="Enrolled">
            {participant.created ? new Date(participant.created).toLocaleString() : "—"}
          </MetaRow>
          {participant.token && (
            <MetaRow label="Push token">
              <span style={{ color: "var(--ink-40)", fontSize: "1.1rem" }}>
                {participant.token.slice(0, 32)}…
              </span>
            </MetaRow>
          )}
          {participant.stripe?.account && (
            <MetaRow label="Stripe account">
              <span style={{ color: "var(--ink-40)", fontSize: "1.1rem" }}>{participant.stripe.account}</span>
            </MetaRow>
          )}
          {userInfo.timezone && (
            <MetaRow label="Timezone">{userInfo.timezone}</MetaRow>
          )}
          {(userInfo.timeWindowFrom || userInfo.timeWindowTo) && (
            <MetaRow label="Time window">
              {userInfo.timeWindowFrom ?? "—"} – {userInfo.timeWindowTo ?? "—"}
            </MetaRow>
          )}
          {participant.information && Object.keys(participant.information).length > 0 && (
            <>
              {Object.entries(participant.information)
                .filter(([k]) => !["timezone", "from", "to", "timeWindow"].includes(k))
                .map(([k, v]) => (
                  <MetaRow key={k} label={k}>{String(v)}</MetaRow>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <a href={`/dashboard/${studyId}/schedule/new?participantId=${participantId}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1.8rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", textDecoration: "none" }}
          className="hover:opacity-90 transition-opacity">
          + Schedule notification
        </a>

        <form action={toggleAction}>
          <button type="submit"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1.8rem", border: isDeactivated ? "1px solid rgba(61,115,107,.3)" : "1px solid var(--ink-20)", borderRadius: "9999px", background: isDeactivated ? "rgba(61,115,107,.06)" : "transparent", color: isDeactivated ? "var(--sage)" : "var(--ink-60)", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", cursor: "pointer" }}
            className="hover:opacity-70 transition-opacity">
            {isDeactivated ? "⏵ Enable notifications" : "⏸ Disable notifications"}
          </button>
        </form>
      </div>

      {/* Perforated divider */}
      <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2 }} />

      {/* Notification history */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.2rem" }}>
          <SectionLabel>
            notifications sent · {count.toLocaleString()}
          </SectionLabel>
        </div>

        {history.length === 0 && page === 1 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "3.2rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>
              No notifications sent yet.
            </p>
          </div>
        ) : (
          <>
            <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                    <SortTh studyId={studyId} participantId={participantId} page={page} col="title"   label="Notification" currentSort={sort} currentOrder={order} />
                    <SortTh studyId={studyId} participantId={participantId} page={page} col="created" label="Sent"         currentSort={sort} currentOrder={order} />
                    <SortTh studyId={studyId} participantId={participantId} page={page} col="status"  label="Status"       currentSort={sort} currentOrder={order} />
                  </tr>
                </thead>
                <tbody>
                  {history.map((r, i) => {
                    const status = bestStatus(r);
                    return (
                      <tr key={String(r._id)}
                        style={{ borderBottom: i < history.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                        className="hover:bg-[var(--paper)] transition-colors">
                        <td style={{ padding: "1rem 1.6rem", fontSize: "1.25rem", color: "var(--ink-60)", maxWidth: 280 }}>
                          <div className="truncate">{r.data?.title ?? r.data?.message ?? "—"}</div>
                        </td>
                        <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }}>
                          {new Date(r.created).toLocaleString()}
                        </td>
                        <td style={{ padding: "1rem 1.6rem" }}>
                          <StatusPill status={status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.6rem", marginTop: "1.6rem" }}>
                {page > 1 && (
                  <a href={pageHref(page - 1)}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
                    className="hover:opacity-70 transition-opacity">
                    ← prev
                  </a>
                )}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", letterSpacing: ".08em" }}>
                  {page} / {pages}
                </span>
                {page < pages && (
                  <a href={pageHref(page + 1)}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
                    className="hover:opacity-70 transition-opacity">
                    next →
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* Receipts */}
      {receipts.length > 0 && (
        <section>
          <SectionLabel>payouts · {receipts.length}</SectionLabel>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>Date</th>
                  <th style={TH}>Amount</th>
                  <th style={TH}>Currency</th>
                  <th style={TH}>Status</th>
                  <th style={TH}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {(receipts as IReceipt[]).map((rec, i) => (
                  <tr key={String(rec._id)}
                    style={{ borderBottom: i < receipts.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors">
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }}>
                      {new Date(rec.created).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink)", fontWeight: 600 }}>
                      {rec.paymentInfo?.amount != null ? (rec.paymentInfo.amount / 100).toFixed(2) : "—"}
                    </td>
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textTransform: "uppercase" }}>
                      {rec.paymentInfo?.currency ?? "—"}
                    </td>
                    <td style={{ padding: "1rem 1.6rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: rec.status === "paid" ? "rgba(61,115,107,.1)" : "var(--ink-10)", color: rec.status === "paid" ? "var(--sage)" : "var(--ink-60)" }}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.6rem" }}>
                      {rec.paymentInfo?.url ? (
                        <a href={rec.paymentInfo.url} target="_blank" rel="noreferrer"
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
                          className="hover:opacity-70 transition-opacity">
                          open →
                        </a>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Remove participant
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.55 }}>
              Removes this participant from the study. Their notification history is preserved.
            </p>
          </div>
          <DeleteForm action={deleteAction} />
        </div>
      </section>

    </div>
  );
}
