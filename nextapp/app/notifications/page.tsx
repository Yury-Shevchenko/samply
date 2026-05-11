import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import ProjectSelector from "@/app/components/ProjectSelector";
import NotificationForm from "./NotificationForm";

export const metadata = { title: "Schedule Notifications — Samply" };

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId } = await searchParams;

  if (projectId) redirect(`/dashboard/${projectId}/schedule/new`);

  const { projects } = await fetchUserProjects(session.user.id);
  const selectorProjects = projects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);

  if (!selectedId) {
    return (
      <div className="inner">
        <ProjectSelector projects={selectorProjects} label="Study:" />
        <div className="card">
          <p>Create a study first before scheduling notifications.</p>
        </div>
      </div>
    );
  }

  const participants = await fetchParticipants(selectedId);
  const participantItems = participants.map((p) => ({ id: p.id, username: p.username }));

  // Extract groups from the project's mobileUsers
  const Project = (await import("@/lib/models/project")).default;
  const connectDB = (await import("@/lib/db")).default;
  await connectDB();
  const project = await Project.findById(selectedId, { mobileUsers: 1 }).lean() as
    { mobileUsers?: Array<{ group?: { id: string; name?: string } }> } | null;

  const groupMap = new Map<string, string>();
  for (const u of project?.mobileUsers ?? []) {
    if (u.group?.id) groupMap.set(u.group.id, u.group.name ?? u.group.id);
  }
  const groupItems = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));

  return (
    <div className="inner">
      <ProjectSelector projects={selectorProjects} selectedId={selectedId} label="Study:" />

      <div className="card">
        <h2>Schedule Notifications</h2>
        <p>
          <a href={`/scheduled?project=${selectedId}`}>View scheduled notifications →</a>
        </p>
        <NotificationForm
          projectId={selectedId}
          participants={participantItems}
          groups={groupItems}
        />
      </div>
    </div>
  );
}
