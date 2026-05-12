import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import StudyTabNav from "./StudyTabNav";

interface Props {
  children: React.ReactNode;
  params: Promise<{ studyId: string }>;
}

export default async function StudyLayout({ children, params }: Props) {
  const { studyId } = await params;

  if (!/^[0-9a-f]{24}$/i.test(studyId)) notFound();

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) notFound();

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "96rem", margin: "0 auto", padding: "3.6rem var(--page-px) 0" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2rem" }}>
          <a
            href="/dashboard"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              letterSpacing: ".06em",
              color: "var(--ink-40)",
              textDecoration: "none",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Dashboard
          </a>
        </div>

        {/* Study header */}
        <div style={{ marginBottom: "2.4rem" }}>
          {/* Status label */}
          <div
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: "1.7rem",
              color: project.currentlyActive ? "var(--sage)" : "var(--ink-40)",
              marginBottom: "0.4rem",
              lineHeight: 1,
            }}
          >
            {project.currentlyActive ? "● collecting" : "draft"}
          </div>

          <div className="flex items-start justify-between gap-4 mob-wrap mob-row-gap">
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                className="font-[family-name:var(--font-display)] font-bold m-0"
                style={{ fontSize: "3.4rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}
              >
                {project.name}
              </h1>
              {project.description && (
                <p style={{ margin: "0.6rem 0 0", fontSize: "1.35rem", color: "var(--ink-60)", maxWidth: 540, lineHeight: 1.5 }}>
                  {project.description}
                </p>
              )}
            </div>

            {/* Edit action */}
            <a
              href={`/projects/${studyId}/edit`}
              style={{
                flexShrink: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
                letterSpacing: ".06em",
                color: "var(--ink-60)",
                textDecoration: "none",
                padding: "0.7rem 1.4rem",
                border: "1px solid var(--ink-20)",
                borderRadius: "9999px",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Edit →
            </a>
          </div>
        </div>

        {/* Tab navigation */}
        <StudyTabNav studyId={studyId} />
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: "96rem", margin: "0 auto", padding: "3.2rem var(--page-px) 8rem" }}>
        {children}
      </div>
    </div>
  );
}
