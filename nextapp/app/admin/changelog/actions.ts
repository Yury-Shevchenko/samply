"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ChangelogEntry, { type ChangeTag } from "@/lib/models/changelogEntry";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
}

export async function createEntryAction(formData: FormData) {
  await requireAdmin();

  const version = String(formData.get("version") ?? "").trim();
  const date    = String(formData.get("date")    ?? "").trim();
  const title   = String(formData.get("title")   ?? "").trim();

  if (!version || !date) return;

  const changes: { tag: ChangeTag; text: string }[] = [];
  for (let i = 0; i < 10; i++) {
    const tag  = String(formData.get(`tag_${i}`)  ?? "").trim() as ChangeTag;
    const text = String(formData.get(`text_${i}`) ?? "").trim();
    if (text && ["new", "fix", "improvement"].includes(tag)) {
      changes.push({ tag, text });
    }
  }

  await connectDB();
  await ChangelogEntry.create({ version, date: new Date(date), title, changes });
  redirect("/admin/changelog");
}

export async function deleteEntryAction(id: string) {
  await requireAdmin();
  await connectDB();
  await ChangelogEntry.deleteOne({ _id: id });
  redirect("/admin/changelog");
}
