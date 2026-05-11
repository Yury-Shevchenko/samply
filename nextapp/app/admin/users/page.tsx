import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminUsers } from "@/lib/data/admin";
import { UsersView } from "./UsersView";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

export const metadata = { title: "Admin: Users — Samply" };

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

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; dir?: string; filter?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { sort = "created", dir = "asc", filter = "" } = await searchParams;
  const [{ users, count, pages, skip }, totalCounts] = await Promise.all([
    fetchAdminUsers(1, sort, dir, filter),
    fetchTotalCounts(),
  ]);

  return <UsersView users={users} count={count} page={1} pages={pages} skip={skip} sort={sort} dir={dir} filter={filter} totalCounts={totalCounts} />;
}
