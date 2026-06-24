import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAuditLogs, AUDIT_ACTIONS } from "@/lib/data/audit";

export const metadata = { title: "Admin: Audit Log — Samply" };

const ACTION_LABELS: Record<string, string> = {
  view_participant: "Viewed participant",
  export_results: "Exported responses",
  export_participants: "Exported participants",
  view_payout: "Viewed payout",
  view_receipts: "Viewed receipts",
};

const TH: React.CSSProperties = {
  padding: "0.9rem 1.4rem",
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  whiteSpace: "nowrap",
  borderBottom: "1px solid var(--ink-10)",
};

const TD: React.CSSProperties = {
  padding: "0.8rem 1.4rem",
  fontSize: "1.25rem",
  color: "var(--ink)",
  borderBottom: "1px solid var(--ink-10)",
  verticalAlign: "top",
};

function qs(params: Record<string, string | number | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" ) sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; action?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { page: pageParam, action } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { logs, count, pages } = await fetchAuditLogs(page, action || undefined);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.2rem 40px 6rem" }}>
      <h1 className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
        Audit Log
      </h1>
      <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", marginBottom: "2rem", lineHeight: 1.5 }}>
        Record of who accessed or exported participant data (GDPR Art. 32 accountability). {count.toLocaleString()} total entries.
      </p>

      {/* Action filter */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
        <FilterChip label="All" href={`/admin/audit${qs({})}`} active={!action} />
        {AUDIT_ACTIONS.map((a) => (
          <FilterChip key={a} label={ACTION_LABELS[a] ?? a} href={`/admin/audit${qs({ action: a })}`} active={action === a} />
        ))}
      </div>

      {logs.length === 0 ? (
        <p style={{ fontSize: "1.35rem", color: "var(--ink-60)" }}>No audit entries{action ? " for this action" : ""} yet.</p>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid var(--ink-10)", borderRadius: "1rem", background: "var(--surface)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>When (UTC)</th>
                <th style={TH}>Researcher</th>
                <th style={TH}>Action</th>
                <th style={TH}>Study</th>
                <th style={TH}>Participant</th>
                <th style={TH}>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td style={{ ...TD, fontFamily: "var(--font-mono)", fontSize: "1.15rem", whiteSpace: "nowrap", color: "var(--ink-60)" }}>
                    {l.createdAt.replace("T", " ").slice(0, 19)}
                  </td>
                  <td style={TD}>{l.actorEmail}</td>
                  <td style={TD}>{ACTION_LABELS[l.action] ?? l.action}</td>
                  <td style={TD}>{l.projectName ?? (l.projectId ? l.projectId : "—")}</td>
                  <td style={{ ...TD, fontFamily: "var(--font-mono)", fontSize: "1.15rem" }}>{l.targetSamplyId ?? "—"}</td>
                  <td style={{ ...TD, color: "var(--ink-60)", fontSize: "1.15rem" }}>
                    {l.meta ? Object.entries(l.meta).map(([k, v]) => `${k}: ${String(v)}`).join(", ") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "1.8rem", fontSize: "1.3rem" }}>
          {page > 1 ? (
            <a href={`/admin/audit${qs({ action, page: page - 1 })}`} style={{ color: "var(--coral)", textDecoration: "none" }}>← Newer</a>
          ) : (
            <span style={{ color: "var(--ink-40)" }}>← Newer</span>
          )}
          <span style={{ color: "var(--ink-60)" }}>Page {page} of {pages}</span>
          {page < pages ? (
            <a href={`/admin/audit${qs({ action, page: page + 1 })}`} style={{ color: "var(--coral)", textDecoration: "none" }}>Older →</a>
          ) : (
            <span style={{ color: "var(--ink-40)" }}>Older →</span>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a
      href={href}
      style={{
        fontSize: "1.2rem",
        fontWeight: 500,
        padding: "0.45rem 1.1rem",
        borderRadius: "9999px",
        textDecoration: "none",
        border: "1px solid",
        borderColor: active ? "var(--coral)" : "var(--ink-20)",
        color: active ? "#fff" : "var(--ink-60)",
        background: active ? "var(--coral)" : "transparent",
      }}
    >
      {label}
    </a>
  );
}
