import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { toggleActiveAction, toggleApprovalAction } from "./actions";
import type { ProjectListItem } from "@/lib/data/projects";

export const metadata = { title: "My Studies — Samply" };

function ProjectCard({
  project,
  isOwner,
}: {
  project: ProjectListItem;
  isOwner: boolean;
}) {
  const toggleActive = toggleActiveAction.bind(null, String(project._id));
  const toggleApproval = toggleApprovalAction.bind(null, String(project._id));

  return (
    <div className={`store ${project.currentlyActive ? "project_chosen" : "project_not_chosen"}`}>
      <div className="store__hero">
        <h2 className="title">
          <a href={`/projects/${project._id}/edit`}>{project.name}</a>
        </h2>
      </div>

      <div className="store__details">
        <div className="project__actions">
          {project.currentlyActive && (
            <div className="store__action">
              <a href={`/studies/${project.slug}`} target="_blank" rel="noreferrer">
                🌐
              </a>
            </div>
          )}
          {isOwner && (
            <>
              <div className="store__action">
                <a href={`/projects/${project._id}/edit`}>✏️</a>
              </div>
              <div className="store__action">
                <a href={`/projects/${project._id}/delete`}>🗑️</a>
              </div>
            </>
          )}
        </div>

        {project.members.length > 0 && (
          <p>
            {project.members.length} member{project.members.length !== 1 ? "s" : ""}
          </p>
        )}

        {isOwner && (
          <div className="project_icons">
            <div className="project_icon">
              <p>Active</p>
              <form action={toggleActive}>
                <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {project.currentlyActive ? "🟢" : "⚫"}
                </button>
              </form>
            </div>

            <div className="project_icon">
              <p>Public</p>
              <form action={toggleApproval}>
                <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {project.public ? "🟢" : project.requestedForApproval ? "🟡" : "⚫"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { projects, invitedProjects } = await fetchUserProjects(session.user.id);

  return (
    <div className="inner">
      {projects.length > 0 && (
        <>
          <h2>My Studies</h2>
          <div className="stores">
            {projects.map((p) => (
              <ProjectCard key={String(p._id)} project={p} isOwner />
            ))}
          </div>
        </>
      )}

      {invitedProjects.length > 0 && (
        <>
          <h2>Invited Studies</h2>
          <div className="stores">
            {invitedProjects.map((p) => (
              <ProjectCard
                key={String(p._id)}
                project={p}
                isOwner={p.creator.toString() === session.user.id}
              />
            ))}
          </div>
        </>
      )}

      {projects.length === 0 && invitedProjects.length === 0 && (
        <div className="card">
          <p>You have no studies yet.</p>
        </div>
      )}

      <p>
        <a className="button" href="/projects/new">
          + New study
        </a>
      </p>
    </div>
  );
}
