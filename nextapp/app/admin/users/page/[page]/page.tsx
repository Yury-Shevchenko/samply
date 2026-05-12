import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminUsers } from "@/lib/data/admin";
import { UsersView } from "../../UsersView";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

async function fetchTotalCounts() {
  await connectDB();
  const [researchers, participants, unconfirmed, admins, total] = await Promise.all([
    User.countDocuments({ level: { $gt: 10, $lte: 100 } }),
    User.countDocuments({ $or: [{ level: { $lte: 10 } }, { level: { $exists: false } }] }),
    User.countDocuments({ emailIsConfirmed: { $ne: true } }),
    User.countDocuments({ level: { $gt: 100 } }),
    User.countDocuments({}),
  ]);
  return { researchers, participants, unconfirmed, admins, total };
}

export default async function AdminUsersPageN({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ sort?: string; dir?: string; filter?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const { sort = "created", dir = "asc", filter = "", q = "" } = await searchParams;

  const [{ users, count, pages, skip }, totalCounts] = await Promise.all([
    fetchAdminUsers(page, sort, dir, filter, q),
    fetchTotalCounts(),
  ]);

  return <UsersView users={users} count={count} page={page} pages={pages} skip={skip} sort={sort} dir={dir} filter={filter} q={q} totalCounts={totalCounts} />;
}
