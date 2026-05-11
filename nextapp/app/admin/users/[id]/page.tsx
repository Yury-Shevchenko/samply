import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminUserDetail } from "@/lib/data/admin";
import { deleteUserAction, confirmUserEmailAction } from "../actions";
import { fmt } from "../../shared";
import { ConfirmDeleteButton } from "../../ConfirmDeleteButton";

/* ── Layout helpers ─────────────────────────────────────────────────────── */
const CARD: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--ink-10)",
  borderRadius: "1.2rem",
  padding: "2.4rem",
  marginBottom: "2rem",
};

const SECTION_LABEL: React.CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "var(--ink-40)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 1.6rem",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={CARD}>
      <h2 style={SECTION_LABEL}>{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "baseline" }}>
      <dt style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", minWidth: "18rem", flexShrink: 0 }}>
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: "1.3rem", color: "var(--ink)", lineHeight: 1.5, minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
        {children}
      </dd>
    </div>
  );
}

function Val({ v }: { v?: string | boolean | number | null }) {
  if (v === undefined || v === null || v === "") return <span style={{ color: "var(--ink-20)" }}>—</span>;
  if (typeof v === "boolean") return <span style={{ color: v ? "var(--sage)" : "var(--coral)" }}>{v ? "Yes" : "No"}</span>;
  return <>{String(v)}</>;
}

function roleBadge(level?: number) {
  if (!level) return null;
  if (level > 100) return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(214,90,48,.1)", color: "var(--coral)" }}>admin</span>;
  if (level > 10) return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(61,115,107,.1)", color: "var(--sage)" }}>researcher</span>;
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "var(--ink-10)", color: "var(--ink-40)" }}>participant</span>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const u = await fetchAdminUserDetail(id);
  return { title: `${u?.name ?? u?.email ?? "User"} — Admin — Samply` };
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { id } = await params;
  const u = await fetchAdminUserDetail(id);
  if (!u) notFound();

  const deleteAction = deleteUserAction.bind(null, id);
  const confirmEmailAction = confirmUserEmailAction.bind(null, id);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "3.6rem 4rem 8rem" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2.4rem" }}>
          <a href="/admin/users" style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}>
            ← Admin Users
          </a>
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3.2rem", gap: "2rem" }}>
          <div>
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "2.8rem", letterSpacing: "-0.025em", marginBottom: "0.8rem" }}
            >
              {u.name ?? u.email ?? id}
            </h1>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
              {roleBadge(u.level)}
              {!u.emailIsConfirmed && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(214,90,48,.08)", color: "var(--coral)", border: "1px solid rgba(214,90,48,.2)" }}>
                  email unconfirmed
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>
            {!u.emailIsConfirmed && (
              <form action={confirmEmailAction} style={{ margin: 0 }}>
                <button
                  type="submit"
                  style={{
                    padding: "0.7rem 1.8rem",
                    background: "rgba(61,115,107,.08)",
                    border: "1px solid rgba(61,115,107,.3)",
                    borderRadius: "9999px",
                    color: "var(--sage)",
                    fontSize: "1.3rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Confirm email
                </button>
              </form>
            )}
            <ConfirmDeleteButton
              action={deleteAction}
              message={`Delete user "${u.name ?? u.email}" and all their data? This cannot be undone.`}
              label="Delete user"
            />
          </div>
        </div>

        {/* Identity */}
        <Card title="Identity">
          <dl>
            <Row label="User ID"><code style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>{id}</code></Row>
            <Row label="Samply ID"><Val v={u.samplyId} /></Row>
            <Row label="Name"><Val v={u.name} /></Row>
            <Row label="Email"><Val v={u.email} /></Row>
            <Row label="Email confirmed"><Val v={u.emailIsConfirmed} /></Row>
            <Row label="Institute"><Val v={u.institute} /></Row>
            <Row label="Language"><Val v={u.language} /></Row>
            <Row label="Level"><Val v={u.level} /></Row>
            <Row label="Created">{fmt(u.created)}</Row>
            {u.code?.id && <Row label="Participant code"><Val v={u.code.id} /></Row>}
          </dl>
        </Card>

        {/* Studies as researcher */}
        <Card title={`Studies created (${u.createdStudies.length})`}>
          {u.createdStudies.length === 0 ? (
            <p style={{ fontSize: "1.3rem", color: "var(--ink-40)", margin: 0 }}>No studies created.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)" }}>
                  {["Name", "Created", "Active", "Public"].map((h) => (
                    <th key={h} style={{ padding: "0.6rem 1rem", textAlign: "left", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {u.createdStudies.map((p) => (
                  <tr key={p._id} style={{ borderBottom: "1px solid var(--ink-10)" }}>
                    <td style={{ padding: "0.8rem 1rem", fontSize: "1.25rem" }}>
                      <a href={`/admin/studies/${p._id}`} style={{ color: "var(--sage)", textDecoration: "none" }}>
                        {p.name ?? p._id}
                      </a>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontSize: "1.2rem", color: "var(--ink-60)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                      {fmt(p.created)}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontSize: "1.1rem" }}>
                      {p.currentlyActive
                        ? <span style={{ color: "var(--sage)", fontWeight: 600 }}>● live</span>
                        : <span style={{ color: "var(--ink-20)" }}>—</span>}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", fontSize: "1.1rem" }}>
                      {p.public
                        ? <span style={{ color: "var(--sage)", fontWeight: 600 }}>public</span>
                        : <span style={{ color: "var(--ink-20)" }}>private</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {/* Studies as participant */}
        <Card title={`Studies joined as participant (${u.participant_projects?.length ?? 0})`}>
          {!u.participant_projects?.length ? (
            <p style={{ fontSize: "1.3rem", color: "var(--ink-40)", margin: 0 }}>Not enrolled in any studies.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {u.participant_projects.map((p) => (
                <div key={p._id} style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "1.25rem" }}>
                  <a href={`/admin/studies/${p._id}`} style={{ color: "var(--sage)", textDecoration: "none" }}>
                    {p.name ?? p._id}
                  </a>
                  {p.slug && (
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>{p.slug}</code>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>
    </main>
  );
}
