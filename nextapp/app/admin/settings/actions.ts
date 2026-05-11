"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath, refresh } from "next/cache";
import connectDB from "@/lib/db";
import { setSiteSetting } from "@/lib/models/siteSettings";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
}

export async function setShowDonation(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const value = formData.get("value") === "true";
  await setSiteSetting("showDonation", value);
  revalidatePath("/", "layout");
  refresh();
}

export async function setShowSmaat(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const value = formData.get("value") === "true";
  await setSiteSetting("showSmaat", value);
  revalidatePath("/dashboard");
  refresh();
}

export async function setShowTestimonials(formData: FormData) {
  await requireAdmin();
  await connectDB();
  const value = formData.get("value") === "true";
  await setSiteSetting("showTestimonials", value);
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/testimonial");
  refresh();
}
