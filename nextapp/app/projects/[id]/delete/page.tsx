import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import { deleteProjectAction } from "../../actions";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

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
  const { t } = await getT();

  const { id } = await params;
  const { error } = await searchParams;

  const project = await fetchProjectById(id, session.user.id);
  if (!project) notFound();

  if (project.creator.toString() !== session.user.id) redirect("/projects");

  const resultsCount = await countResults(id);
  const hasData = resultsCount > 0 || project.participantCount > 0;
  const boundAction = deleteProjectAction.bind(null, id);

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-[1.2rem] sm:px-[2.4rem] py-[3.2rem] sm:py-[4.8rem]"
      style={{ background: "var(--paper)" }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>

        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div
            className="w-[5.2rem] h-[5.2rem] sm:w-[6.4rem] sm:h-[6.4rem]"
            style={{
              borderRadius: "50%",
              background: "rgba(214,90,48,.1)",
              border: "1px solid rgba(214,90,48,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--ink-10)",
          borderRadius: "1rem",
          boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 1.2rem 3.2rem rgba(60,40,20,.07)",
          overflow: "hidden",
        }}>

          {/* Header */}
          <div
            className="px-[1.6rem] sm:px-[2.8rem] pt-[1.8rem] sm:pt-[2.2rem] pb-[1.4rem] sm:pb-[1.8rem]"
            style={{ borderBottom: "1px solid var(--ink-10)" }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.5rem" }}>
              {t("deleteStudy.destructiveAction")}
            </div>
            <div
              className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)" }}
            >
              {t("deleteStudy.title")}
            </div>
          </div>

          <form
            action={boundAction}
            className="px-[1.6rem] sm:px-[2.8rem] py-[1.8rem] sm:py-[2.2rem]"
            style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
          >

            {/* Error */}
            {error && (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "0.6rem", padding: "1rem 1.2rem", display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--coral)", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>▲</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", lineHeight: 1.5 }}>{error}</span>
              </div>
            )}

            {/* Study name */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, marginBottom: "0.5rem" }}>
                {t("deleteStudy.studyLabel")}
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", wordBreak: "break-word" }}>
                {project.name}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {[
                { label: t("deleteStudy.statParticipants"), value: project.participantCount },
                { label: t("deleteStudy.statResponses"), value: resultsCount },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "0.9rem 1.2rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, marginBottom: "0.35rem" }}>
                    {label}
                  </div>
                  <div
                    className="font-[family-name:var(--font-display)] font-bold"
                    style={{ fontSize: "clamp(2rem, 5vw, 2.6rem)", color: value > 0 ? "var(--coral)" : "var(--ink-40)", letterSpacing: "-0.025em", lineHeight: 1 }}
                  >
                    {value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Warning strip */}
            {hasData ? (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1.1rem 1.2rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--coral)", margin: 0, lineHeight: 1.65 }}>
                  {t("deleteStudy.warnHasData")} <strong>{t("deleteStudy.warnHasDataStrong")}</strong>
                </p>
              </div>
            ) : (
              <div style={{ background: "var(--ink-10)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "1.1rem 1.2rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
                  {t("deleteStudy.warnNoData")}
                </p>
              </div>
            )}

            {/* Perforated divider */}
            <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.25 }} />

            {/* Confirmation input */}
            <div>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600, display: "block", marginBottom: "0.5rem", lineHeight: 1.5 }}>
                {t("deleteStudy.confirmPre")}{" "}
                <span style={{ color: "var(--ink)", wordBreak: "break-word" }}>{project.name}</span>
                {" "}{t("deleteStudy.confirmPost")}
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
                  padding: "1rem 1.2rem",
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

            {/* Actions — stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-[0.9rem] sm:gap-[1.4rem]" style={{ paddingTop: "0.2rem" }}>
              <SubmitButton
                pendingLabel={t("deleteStudy.deletingLabel")}
                className="sm:flex-1 hover:opacity-90 transition-opacity"
                style={{
                  width: "100%",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.2rem",
                  letterSpacing: ".06em",
                  padding: "1.1rem 2rem",
                  borderRadius: "9999px",
                  border: "none",
                  background: "var(--coral)",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {t("deleteStudy.deletePermanently")}
              </SubmitButton>
              <a
                href={`/dashboard/${id}`}
                className="hover:opacity-70 transition-opacity"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.1rem",
                  letterSpacing: ".04em",
                  color: "var(--ink-60)",
                  textDecoration: "none",
                  padding: "0.4rem 0",
                  flexShrink: 0,
                }}
              >
                {t("deleteStudy.cancel")}
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
