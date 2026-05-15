import { auth, signOut } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { SUPPORTED_LOCALES, LOCALE_TO_DB_LANG, type Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n.server";
import NavClient from "./NavClient";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

async function setLocaleAction(formData: FormData) {
  "use server";
  const locale = formData.get("locale") as string;
  if (!(SUPPORTED_LOCALES as string[]).includes(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });

  const session = await auth();
  if (session?.user?.id) {
    await connectDB();
    await User.findByIdAndUpdate(session.user.id, {
      language: LOCALE_TO_DB_LANG[locale as Locale] ?? "english",
    });
  }

  const returnTo = (formData.get("returnTo") as string) || "/";
  redirect(returnTo);
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

  const locale = await getLocale();

  return (
    <NavClient
      isLoggedIn={isLoggedIn}
      isAdmin={isAdmin}
      userName={userName}
      signOutAction={signOutAction}
      setLocaleAction={setLocaleAction}
      showDonation={showDonation}
      currentLocale={locale}
    />
  );
}
