import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";

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
  const firstId = projects[0] ? String(projects[0]._id) : undefined;
  if (firstId) redirect(`/dashboard/${firstId}/schedule/new`);

  redirect("/dashboard");
}
