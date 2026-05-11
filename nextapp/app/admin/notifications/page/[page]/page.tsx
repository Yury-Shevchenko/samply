import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminNotifications } from "@/lib/data/admin";
import { NotificationsView } from "../../page";

export default async function AdminNotificationsPageN({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ status?: string; projectId?: string; sort?: string; dir?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const { status = "", projectId = "", sort = "scheduledFor", dir = "desc" } = await searchParams;

  const data = await fetchAdminNotifications(page, status || undefined, projectId || undefined, sort, dir);

  return <NotificationsView page={page} {...data} status={status} projectId={projectId} sort={sort} dir={dir} />;
}
