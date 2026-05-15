import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import ProjectForm from "@/app/components/ProjectForm";
import { updateProjectAction } from "../../actions";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Edit Study — Samply" };

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { id } = await params;
  const { notice, error } = await searchParams;

  const project = await fetchProjectById(id, session.user.id);
  if (!project) notFound();

  const boundAction = updateProjectAction.bind(null, id);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "68rem", margin: "0 auto", padding: "var(--page-pt) var(--page-px) 8rem" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2rem" }}>
          <a
            href={`/dashboard/${id}`}
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            ← {project.name}
          </a>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.4rem" }}>
          <h1
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", letterSpacing: "-0.025em" }}
          >
            {t("projectForm.editTitle")}
          </h1>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.35rem", color: "var(--ink-60)" }}>
            {project.name}
          </p>
        </div>

        {/* Notices */}
        {notice && (
          <div
            style={{
              background: "rgba(61,115,107,.1)",
              border: "1px solid rgba(61,115,107,.25)",
              borderRadius: "1rem",
              padding: "1.1rem 1.6rem",
              marginBottom: "2.4rem",
              fontSize: "1.35rem",
              color: "var(--sage)",
            }}
          >
            {notice}
          </div>
        )}
        {error && (
          <div
            style={{
              background: "rgba(214,90,48,.08)",
              border: "1px solid rgba(214,90,48,.25)",
              borderRadius: "1rem",
              padding: "1.1rem 1.6rem",
              marginBottom: "2.4rem",
              fontSize: "1.35rem",
              color: "var(--coral)",
            }}
          >
            {error}
          </div>
        )}

        <ProjectForm
          project={project}
          action={boundAction}
          submitLabel={t("projectForm.saveChanges")}
          cancelHref={`/dashboard/${id}`}
        />

        {/* Danger zone */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2.4rem",
            borderTop: "1px solid var(--ink-10)",
          }}
        >
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            {t("projectForm.dangerZone")}
          </div>
          <a
            href={`/projects/${id}/delete`}
            style={{
              fontSize: "1.3rem",
              color: "var(--coral)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("projectForm.deleteStudy")}
          </a>
        </div>
      </div>
    </main>
  );
}
