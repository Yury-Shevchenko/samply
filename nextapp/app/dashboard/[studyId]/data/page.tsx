import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchHistory, type HistorySortBy, type HistorySortOrder } from "@/lib/data/participants";
import { fetchComplianceForProject } from "@/lib/data/compliance";
import Hand from "@/app/components/ui/Hand";
import { LocalDate } from "@/app/components/ui/LocalDate";
import { ResultRow } from "./ResultRow";
import { DeleteAllForm } from "./DeleteAllForm";
import { deleteAllResultsAction } from "./actions";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ page?: string; sort?: string; order?: string; participant?: string }>;
}

const STATUS_PRIORITY: Record<string, number> = {
  completed: 6, "opened-in-app": 5, tapped: 4,
  archived: 3, "received-in-app": 2, sent: 1,
};

const VALID_SORTS = new Set<HistorySortBy>(["samplyid", "title", "created", "status"]);

function buildHref(
  studyId: string,
  page: number,
  sort: HistorySortBy,
  order: HistorySortOrder,
  participant?: string,
) {
  const p = new URLSearchParams();
  if (page > 1) p.set("page", String(page));
  p.set("sort", sort);
  p.set("order", order);
  if (participant) p.set("participant", participant);
  return `/dashboard/${studyId}/data?${p.toString()}`;
}

function SortTh({
  studyId, page, col, label, currentSort, currentOrder, participant,
}: {
  studyId: string;
  page: number;
  col: HistorySortBy;
  label: string;
  currentSort: HistorySortBy;
  currentOrder: HistorySortOrder;
  participant?: string;
}) {
  const isActive = currentSort === col;
  const nextOrder: HistorySortOrder = isActive && currentOrder === "desc" ? "asc" : "desc";
  const indicator = isActive ? (currentOrder === "desc" ? " ↓" : " ↑") : "";

  return (
    <th style={{
      padding: "1rem 1.8rem",
      textAlign: "left",
      fontFamily: "var(--font-mono)",
      fontSize: "0.95rem",
      fontWeight: 600,
      letterSpacing: ".16em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      <a
        href={buildHref(studyId, 1, col, nextOrder, participant)}
        style={{
          color: isActive ? "var(--ink)" : "var(--ink-40)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
        className="hover:text-[var(--ink)] transition-colors"
      >
        {label}{indicator}
      </a>
    </th>
  );
}

export default async function DataPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { page: pageParam, sort: sortParam, order: orderParam, participant } = await searchParams;

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const sort: HistorySortBy = VALID_SORTS.has(sortParam as HistorySortBy)
    ? (sortParam as HistorySortBy)
    : "created";
  const order: HistorySortOrder = orderParam === "asc" ? "asc" : "desc";

  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, { history, count, pages }, compliance] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchHistory(studyId, page, participant || undefined, sort, order),
    fetchComplianceForProject(studyId),
  ]);

  if (!project) notFound();

  const isLow = compliance.sent > 0 && compliance.pct < 60;

  const deleteAllAction = deleteAllResultsAction.bind(null, studyId);

  const STATUS_LABEL: Record<string, string> = {
    "completed":       t("data.statusCompleted"),
    "tapped":          t("data.statusTapped"),
    "opened-in-app":   t("data.statusOpenedInApp"),
    "sent":            t("data.statusSent"),
    "archived":        t("data.statusArchived"),
    "received-in-app": t("data.statusReceivedInApp"),
  };

  function pageHref(p: number) {
    return buildHref(studyId, p, sort, order, participant);
  }

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Header */}
      <div className="mob-col mob-col-start" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            {participant ? t("data.labelParticipant", { participant }) : t("data.label")}
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {t(count !== 1 ? "data.countPlural" : "data.count", { n: count.toLocaleString() })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {participant && (
            <a
              href={`/dashboard/${studyId}/data`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.4rem", background: "var(--ink-10)", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity"
            >
              {participant} ✕
            </a>
          )}
          <a
            href={`/dashboard/${studyId}/data/export`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.8rem 1.8rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("data.exportCsv")}
          </a>
        </div>
      </div>

      {/* Compliance strip — project-wide, hidden when filtered to one participant */}
      {!participant && compliance.sent > 0 && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.6rem 2.2rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)", display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.8rem" }}>
              <Hand size={14}>{t("data.complianceLabel")}</Hand>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 600, color: isLow ? "var(--coral)" : "var(--sage)", letterSpacing: ".02em" }}>
                {compliance.pct}%
              </span>
            </div>
            <div style={{ height: "0.5rem", background: "var(--ink-10)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(compliance.pct, 100)}%`, background: isLow ? "var(--coral)" : "var(--ink)", borderRadius: "9999px" }} />
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.8rem", letterSpacing: "-0.025em", color: isLow ? "var(--coral)" : "var(--ink)", lineHeight: 1 }}>
              {compliance.responded}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".06em", marginTop: "0.2rem" }}>
              {t("data.complianceSent", { n: compliance.sent })}
            </div>
          </div>
        </div>
      )}

      {/* Response log */}
      {history.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "5.6rem 2.4rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: "2.2rem", color: "var(--coral)", marginBottom: "1rem" }}>
            {participant ? t("data.emptyTitleParticipant") : t("data.emptyTitle")}
          </div>
          <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.6 }}>
            {participant ? t("data.emptyBodyParticipant") : t("data.emptyBody")}
          </p>
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"], boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
          <table style={{ width: "100%", minWidth: "48rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                {!participant && (
                  <SortTh studyId={studyId} page={page} col="samplyid" label={t("data.colParticipant")}   currentSort={sort} currentOrder={order} participant={participant} />
                )}
                <SortTh studyId={studyId} page={page} col="title"   label={t("data.colNotification")} currentSort={sort} currentOrder={order} participant={participant} />
                <SortTh studyId={studyId} page={page} col="created"  label={t("data.colSent")}         currentSort={sort} currentOrder={order} participant={participant} />
                <SortTh studyId={studyId} page={page} col="status"   label={t("data.colStatus")}       currentSort={sort} currentOrder={order} participant={participant} />
              </tr>
            </thead>
            <tbody>
              {history.map((r, i) => {
                const events = r.events ?? [];
                const best = events.reduce<{ status: string; priority: number }>(
                  (acc, e) => {
                    const p = STATUS_PRIORITY[e.status] ?? 0;
                    return p > acc.priority ? { status: e.status, priority: p } : acc;
                  },
                  { status: "sent", priority: 0 },
                );
                const status = best.status;
                const isCompleted = status === "completed";
                const isTapped = status === "tapped" || status === "opened-in-app";
                return (
                  <ResultRow
                    key={String(r._id)}
                    href={`/dashboard/${studyId}/data/${String(r._id)}`}
                    style={{ borderBottom: i < history.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors"
                  >
                    {!participant && (
                      <td style={{ padding: "1.1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink)" }}>
                        {r.samplyid}
                      </td>
                    )}
                    <td style={{ padding: "1.1rem 1.8rem", fontSize: "1.25rem", color: "var(--ink-60)", maxWidth: 220 }}>
                      <div className="truncate">{r.data?.title ?? r.data?.message ?? "—"}</div>
                    </td>
                    <td style={{ padding: "1.1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }}>
                      <LocalDate iso={String(r.created)} />
                    </td>
                    <td style={{ padding: "1.1rem 1.8rem" }}>
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
                        {STATUS_LABEL[status] ?? status}
                      </span>
                    </td>
                  </ResultRow>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.6rem" }}>
          {page > 1 && (
            <a href={pageHref(page - 1)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              {t("data.prev")}
            </a>
          )}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", letterSpacing: ".08em" }}>
            {page} / {pages}
          </span>
          {page < pages && (
            <a href={pageHref(page + 1)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              {t("data.next")}
            </a>
          )}
        </div>
      )}

      {/* Timezone + export note */}
      {history.length > 0 && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-30)", margin: 0, lineHeight: 1.6 }}>
          Times are shown in your local timezone.{" "}
          When you export the CSV, event times are saved as Unix timestamps — the number of milliseconds elapsed since 1 January 1970 (UTC).
        </p>
      )}

      {/* Danger zone — only shown without participant filter */}
      {!participant && count > 0 && (
        <section>
          <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2, marginBottom: "2rem" }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
            {t("data.dangerZone")}
          </div>
          <div style={{ background: "rgba(214,90,48,.04)", border: "1px solid rgba(214,90,48,.15)", borderRadius: "0.8rem", padding: "1.8rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.6rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.3rem" }}>
                {t("data.deleteAllTitle")}
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.55 }}>
                {t("data.deleteAllBody", { n: count.toLocaleString() })}
              </p>
            </div>
            <DeleteAllForm action={deleteAllAction} count={count} />
          </div>
        </section>
      )}
    </div>
  );
}
