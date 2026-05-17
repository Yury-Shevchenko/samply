import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";

export const metadata = { title: "Groups — Samply" };

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId } = await searchParams;
  if (projectId) redirect(`/dashboard/${projectId}/groups`);

  const { projects } = await fetchUserProjects(session.user.id);
  const firstId = projects[0] ? String(projects[0]._id) : undefined;
  if (firstId) redirect(`/dashboard/${firstId}/groups`);

  redirect("/dashboard");
}
