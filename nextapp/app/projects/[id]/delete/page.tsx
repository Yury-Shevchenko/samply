import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import { deleteProjectAction } from "../../actions";

export const metadata = { title: "Delete Study — Samply" };

async function countResults(projectId: string): Promise<number> {
  await connectDB();
  const mongoose = (await import("mongoose")).default;
  const db = mongoose.connection.db;
  if (!db) return 0;
  return db.collection("results").countDocuments({ project: new mongoose.Types.ObjectId(projectId) });
}

export default async function DeleteProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { id } = await params;
  const { error } = await searchParams;

  const project = await fetchProjectById(id, session.user.id);
  if (!project) notFound();

  if (project.creator.toString() !== session.user.id) redirect("/projects");

  const resultsCount = await countResults(id);
  const hasData = resultsCount > 0 || project.members.length > 0;
  const boundAction = deleteProjectAction.bind(null, id);

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4.8rem 2.4rem" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>

        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.4rem" }}>
          <div style={{ width: "6.4rem", height: "6.4rem", borderRadius: "50%", background: "rgba(214,90,48,.1)", border: "1px solid rgba(214,90,48,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 1.2rem 3.2rem rgba(60,40,20,.07)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ padding: "2.2rem 2.8rem 1.8rem", borderBottom: "1px solid var(--ink-10)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.6rem" }}>
              destructive action
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>
              Delete study
            </div>
          </div>

          <form action={boundAction} style={{ padding: "2.2rem 2.8rem", display: "flex", flexDirection: "column", gap: "1.8rem" }}>

            {/* Error */}
            {error && (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "0.6rem", padding: "1rem 1.4rem", display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--coral)", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>▲</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", lineHeight: 1.5 }}>{error}</span>
              </div>
            )}

            {/* Study name */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, marginBottom: "0.6rem" }}>
                Study
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                {project.name}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Participants", value: project.members.length },
                { label: "Responses", value: resultsCount },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1rem 1.4rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, marginBottom: "0.4rem" }}>
                    {label}
                  </div>
                  <div className="font-[family-name:var(--font-display)] font-bold"
                    style={{ fontSize: "2.6rem", color: value > 0 ? "var(--coral)" : "var(--ink-40)", letterSpacing: "-0.025em", lineHeight: 1 }}>
                    {value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Warning strip */}
            {hasData ? (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", margin: 0, lineHeight: 1.65 }}>
                  This study has participants and response data. Deleting it will permanently erase all records. <strong>This cannot be undone.</strong>
                </p>
              </div>
            ) : (
              <div style={{ background: "var(--ink-10)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
                  This study has no participants or responses yet. It will be permanently deleted.
                </p>
              </div>
            )}

            {/* Perforated divider */}
            <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.25 }} />

            {/* Confirmation input */}
            <div>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, display: "block", marginBottom: "0.6rem" }}>
                Type <span style={{ color: "var(--ink)" }}>{project.name}</span> to confirm
              </label>
              <input
                type="text"
                name="confirmation"
                required
                autoComplete="off"
                placeholder={project.name}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.2rem",
                  padding: "1rem 1.4rem",
                  borderRadius: "0.6rem",
                  border: "1px solid var(--ink-20)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.4rem", paddingTop: "0.2rem" }}>
              <button type="submit"
                style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "1.2rem", letterSpacing: ".06em", padding: "1.1rem 2rem", borderRadius: "9999px", border: "none", background: "var(--coral)", color: "#fff", cursor: "pointer" }}
                className="hover:opacity-90 transition-opacity">
                Delete study permanently
              </button>
              <a href={`/dashboard/${id}`}
                style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-60)", textDecoration: "none", flexShrink: 0 }}
                className="hover:opacity-70 transition-opacity">
                Cancel
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
