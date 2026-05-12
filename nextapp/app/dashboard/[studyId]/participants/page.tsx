import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants, type MobileUser } from "@/lib/data/participants";
import { ParticipantRow } from "./ParticipantRow";

const PAGE_SIZE = 50;

type SortBy = "id" | "group" | "created" | "username";
type SortOrder = "asc" | "desc";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ page?: string; sort?: string; order?: string }>;
}

function sortParticipants(list: MobileUser[], sort: SortBy, order: SortOrder): MobileUser[] {
  const dir = order === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    if (sort === "id") return dir * a.id.localeCompare(b.id);
    if (sort === "username") {
      const ua = a.username ?? "";
      const ub = b.username ?? "";
      return dir * ua.localeCompare(ub);
    }
    if (sort === "group") {
      const ga = a.group?.name ?? "";
      const gb = b.group?.name ?? "";
      return dir * ga.localeCompare(gb);
    }
    // created
    const ta = a.created ? new Date(a.created).getTime() : 0;
    const tb = b.created ? new Date(b.created).getTime() : 0;
    return dir * (ta - tb);
  });
}

function buildHref(studyId: string, page: number, sort: SortBy, order: SortOrder) {
  const p = new URLSearchParams();
  if (page > 1) p.set("page", String(page));
  p.set("sort", sort);
  p.set("order", order);
  return `/dashboard/${studyId}/participants?${p.toString()}`;
}

function SortTh({
  studyId, page, col, label, currentSort, currentOrder,
}: {
  studyId: string;
  page: number;
  col: SortBy;
  label: string;
  currentSort: SortBy;
  currentOrder: SortOrder;
}) {
  const isActive = currentSort === col;
  const nextOrder: SortOrder = isActive && currentOrder === "desc" ? "asc" : "desc";
  const indicator = isActive ? (currentOrder === "desc" ? " ↓" : " ↑") : "";
  return (
    <th style={{ padding: "1rem 1.8rem", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <a
        href={buildHref(studyId, 1, col, nextOrder)}
        style={{ color: isActive ? "var(--ink)" : "var(--ink-40)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
        className="hover:text-[var(--ink)] transition-colors"
      >
        {label}{indicator}
      </a>
    </th>
  );
}

function StaticTh({ label }: { label: string }) {
  return (
    <th style={{ padding: "1rem 1.8rem", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", whiteSpace: "nowrap" }}>
      {label}
    </th>
  );
}

export default async function ParticipantsPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { page: pageParam, sort: sortParam, order: orderParam } = await searchParams;

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const sort: SortBy = (["id", "group", "created", "username"] as SortBy[]).includes(sortParam as SortBy)
    ? (sortParam as SortBy)
    : "created";
  const order: SortOrder = orderParam === "asc" ? "asc" : "desc";

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  const allActive = participants.filter((p) => !p.deactivated);
  const allInactive = participants.filter((p) => p.deactivated);

  const sortedActive = sortParticipants(allActive, sort, order);
  const sortedInactive = sortParticipants(allInactive, sort, order);

  const totalPages = Math.ceil(sortedActive.length / PAGE_SIZE);
  const activePage = sortedActive.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function pageHref(p: number) {
    return buildHref(studyId, p, sort, order);
  }

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Header */}
      <div className="mob-col mob-col-start" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            enrolled
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {allActive.length} active
            <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--ink-40)", marginLeft: "1rem", letterSpacing: "-0.01em" }}>
              / {participants.length} total
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
          {participants.length > 0 && (
            <a
              href={`/dashboard/${studyId}/participants/export`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.8rem 1.8rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity"
            >
              ↓ Export CSV
            </a>
          )}
          <a
            href={`/dashboard/${studyId}/groups`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.8rem 1.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px" }}
            className="hover:opacity-70 transition-opacity"
          >
            Manage groups →
          </a>
          <a
            href={`/dashboard/${studyId}/invitations`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.8rem 1.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px" }}
            className="hover:opacity-70 transition-opacity"
          >
            Invitation links →
          </a>
        </div>
      </div>

      {/* Active table */}
      {allActive.length > 0 ? (
        <>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"], boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
            <table style={{ width: "100%", minWidth: "52rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <SortTh studyId={studyId} page={page} col="id"       label="Participant ID"  currentSort={sort} currentOrder={order} />
                  <SortTh studyId={studyId} page={page} col="username" label="Code"            currentSort={sort} currentOrder={order} />
                  <SortTh studyId={studyId} page={page} col="group"    label="Group"           currentSort={sort} currentOrder={order} />
                  <StaticTh label="Token" />
                  <SortTh studyId={studyId} page={page} col="created"  label="Enrolled"        currentSort={sort} currentOrder={order} />
                </tr>
              </thead>
              <tbody>
                {activePage.map((p, i) => (
                  <ParticipantRow
                    key={p.id}
                    href={`/dashboard/${studyId}/participants/${p.id}`}
                    style={{ borderBottom: i < activePage.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors"
                  >
                    <td style={{ padding: "1.2rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--ink)" }}>
                      {p.id}
                    </td>
                    <td style={{ padding: "1.2rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
                      {p.username ?? "—"}
                    </td>
                    <td style={{ padding: "1.2rem 1.8rem", fontSize: "1.25rem", color: "var(--ink-60)" }}>
                      {p.group?.name ? (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)" }}>
                          {p.group.name}
                        </span>
                      ) : "—"}
                    </td>
                    <td style={{ padding: "1.2rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>
                      {p.token ? p.token.slice(0, 12) + "…" : <span style={{ color: "var(--coral)", fontWeight: 500 }} title="No push token — participant has not allowed notifications">no token</span>}
                    </td>
                    <td style={{ padding: "1.2rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }}>
                      {p.created ? new Date(p.created).toLocaleString(undefined, { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                  </ParticipantRow>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.6rem" }}>
              {page > 1 && (
                <a href={pageHref(page - 1)}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity">
                  ← prev
                </a>
              )}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", letterSpacing: ".08em" }}>
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <a href={pageHref(page + 1)}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity">
                  next →
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "5.6rem 2.4rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: "2.2rem", color: "var(--coral)", marginBottom: "1rem" }}>no participants yet</div>
          <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 1.8rem", lineHeight: 1.6 }}>
            Share your study enrollment link to get started.
          </p>
          <a href={`/dashboard/${studyId}/invitations`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)" }}>
            Get enrollment link →
          </a>
        </div>
      )}

      {/* Deactivated */}
      {allInactive.length > 0 && (
        <section>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
            deactivated · {allInactive.length}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"], opacity: 0.65 }}>
            <table style={{ width: "100%", minWidth: "32rem", borderCollapse: "collapse" }}>
              <tbody>
                {sortedInactive.map((p, i) => (
                  <ParticipantRow
                    key={p.id}
                    href={`/dashboard/${studyId}/participants/${p.id}`}
                    style={{ borderBottom: i < sortedInactive.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors"
                  >
                    <td style={{ padding: "1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
                      {p.id}
                    </td>
                    <td style={{ padding: "1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>
                      {p.group?.name ?? "—"}
                    </td>
                  </ParticipantRow>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
