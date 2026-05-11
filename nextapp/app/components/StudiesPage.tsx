import { fetchStudies } from "@/lib/data/studies";
import type { PublicProject } from "@/lib/models/project";
import { redirect } from "next/navigation";

function truncate(text: string, chars: number): string {
  if (!text) return "";
  if (text.length <= chars) return text;
  return text.slice(0, chars).trimEnd() + "…";
}

function StudyCard({ project }: { project: PublicProject }) {
  const authorName = Array.isArray(project.author_name) ? project.author_name[0] : project.author_name;
  const authorInstitute = Array.isArray(project.author_institute)
    ? project.author_institute[0]
    : project.author_institute;

  return (
    <div
      className="flex flex-col"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "1.2rem",
        padding: "2.2rem 2.4rem",
        boxShadow: "0.1rem 0.2rem 0 rgba(35,32,26,.04)",
      }}
    >
      {/* Name */}
      <h3 className="m-0" style={{ marginBottom: "0.8rem" }}>
        <a
          href={`/studies/${project.slug}`}
          className="font-[family-name:var(--font-display)] font-bold no-underline hover:opacity-70 transition-opacity"
          style={{ fontSize: "1.7rem", color: "var(--ink)", letterSpacing: "-0.015em", lineHeight: 1.2 }}
        >
          {project.name || "Untitled study"}
        </a>
      </h3>

      {/* Description */}
      {project.description && (
        <p
          style={{
            margin: "0 0 auto",
            fontSize: "1.3rem",
            color: "var(--ink-60)",
            lineHeight: 1.55,
            paddingBottom: "1.6rem",
          }}
        >
          {truncate(project.description, 160)}
        </p>
      )}

      {/* Footer: author + join link */}
      <div
        className="flex items-center justify-between gap-3"
        style={{ paddingTop: "1.4rem", borderTop: "1px dashed var(--ink-10)", marginTop: "auto" }}
      >
        {authorName ? (
          <span style={{ fontSize: "1.15rem", color: "var(--ink-40)" }}>
            {authorName}
            {authorInstitute ? ` · ${authorInstitute}` : ""}
          </span>
        ) : (
          <span />
        )}
        <a
          href={`/studies/${project.slug}`}
          className="font-medium no-underline hover:opacity-70 transition-opacity flex-shrink-0"
          style={{ fontSize: "1.2rem", color: "var(--coral)" }}
        >
          Join →
        </a>
      </div>
    </div>
  );
}

export default async function StudiesPage({ page }: { page: number }) {
  const { projects, count, pages } = await fetchStudies(page);

  if (!projects.length && page > 1) {
    redirect(`/studies/page/${Math.max(pages, 1)}`);
  }

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "96rem", margin: "0 auto", padding: "4.8rem 4rem 8rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.6rem" }}>
          <div
            className="font-[family-name:var(--font-hand)]"
            style={{ fontSize: "1.8rem", color: "var(--coral)", marginBottom: "0.6rem" }}
          >
            open to participants
          </div>
          <h1
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "4rem", letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            Public studies
          </h1>
          {count > 0 && (
            <p style={{ margin: "1rem 0 0", fontSize: "1.4rem", color: "var(--ink-60)" }}>
              {count} {count === 1 ? "study" : "studies"} currently accepting participants
            </p>
          )}
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div
            style={{
              background: "var(--surface)",
              border: "1px dashed var(--ink-20)",
              borderRadius: "1.4rem",
              padding: "6.4rem 2.4rem",
              textAlign: "center",
            }}
          >
            <div
              className="font-[family-name:var(--font-hand)]"
              style={{ fontSize: "2.2rem", color: "var(--coral)", marginBottom: "1rem" }}
            >
              nothing yet
            </div>
            <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", margin: 0 }}>
              No public studies are accepting participants right now. Check back soon.
            </p>
          </div>
        ) : (
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(27.2rem, 1fr))", gap: "1.8rem" }}
          >
            {projects.map((p) => (
              <StudyCard key={String(p._id)} project={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div
            className="flex items-center justify-center gap-[2rem]"
            style={{ marginTop: "4.8rem" }}
          >
            {page > 1 ? (
              <a
                href={`/studies/page/${page - 1}`}
                className="font-medium no-underline hover:opacity-70 transition-opacity"
                style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none" }}
              >
                ← Previous
              </a>
            ) : <span />}

            <span
              style={{
                fontSize: "1.2rem",
                color: "var(--ink-40)",
                background: "var(--surface)",
                border: "1px solid var(--ink-10)",
                borderRadius: "9999px",
                padding: "0.5rem 1.4rem",
              }}
            >
              {page} / {pages}
            </span>

            {page < pages ? (
              <a
                href={`/studies/page/${page + 1}`}
                className="font-medium no-underline hover:opacity-70 transition-opacity"
                style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none" }}
              >
                Next →
              </a>
            ) : <span />}
          </div>
        )}

        {/* Researcher CTA */}
        <div
          style={{
            marginTop: "5.6rem",
            paddingTop: "3.2rem",
            borderTop: "1px solid var(--ink-10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2.4rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "1.8rem", color: "var(--ink)", letterSpacing: "-0.01em" }}
            >
              Running a study?
            </div>
            <p style={{ margin: "0.4rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)" }}>
              Create your own experience sampling study — free for academic use.
            </p>
          </div>
          <a
            href="/register"
            className="inline-flex items-center font-medium no-underline transition-opacity hover:opacity-90"
            style={{
              fontSize: "1.3rem",
              color: "#fff",
              background: "var(--coral)",
              borderRadius: "9999px",
              padding: "1rem 2rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Start a study →
          </a>
        </div>
      </div>
    </main>
  );
}
