import { auth, signOut } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { getSiteSettings } from "@/lib/models/siteSettings";
import NavClient from "./NavClient";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function Nav() {
  const session = await auth();
  const isLoggedIn = !!session;
  const isAdmin = (session?.user?.level ?? 0) > 100;

  await connectDB();
  const { showDonation } = await getSiteSettings();

  let userName = "";
  if (session?.user?.id) {
    const user = await User.findById(session.user.id, { name: 1 }).lean() as { name?: string } | null;
    userName = user?.name ?? session.user.name ?? "";
  }

  return <NavClient isLoggedIn={isLoggedIn} isAdmin={isAdmin} userName={userName} signOutAction={signOutAction} showDonation={showDonation} />;
}
