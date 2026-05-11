"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
}

const DELETABLE = ["sent", "cancelled"] as const;
type DeletableStatus = (typeof DELETABLE)[number];

export async function deleteNotificationsByStatusAction(formData: FormData) {
  await requireSuperAdmin();
  await connectDB();

  const status = formData.get("status") as string;
  const projectId = (formData.get("projectId") as string) || null;

  if (!DELETABLE.includes(status as DeletableStatus)) {
    throw new Error(`Deleting status "${status}" is not permitted`);
  }

  const filter: Record<string, unknown> = { status };
  if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
    filter.projectId = new mongoose.Types.ObjectId(projectId);
  }

  await PendingNotification.deleteMany(filter);

  const qs = [status ? `status=${status}` : "", projectId ? `projectId=${projectId}` : ""]
    .filter(Boolean)
    .join("&");
  redirect(`/admin/notifications${qs ? `?${qs}` : ""}`);
}
