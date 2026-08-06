"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

async function requireOwnerOrMember(studyId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  await connectDB();
  const userOid = new mongoose.Types.ObjectId(session.user.id);
  const project = await Project.findOne(
    { _id: studyId, $or: [{ creator: userOid }, { members: userOid }] },
    { _id: 1 },
  ).lean();
  if (!project) redirect("/dashboard");
  return session;
}

export async function toggleStudyActiveAction(studyId: string) {
  await requireOwnerOrMember(studyId);
  const project = await Project.findById(studyId, { currentlyActive: 1 }).lean() as { currentlyActive?: boolean } | null;
  if (!project) redirect("/dashboard");
  await Project.updateOne({ _id: studyId }, { $set: { currentlyActive: !project.currentlyActive } });
  revalidatePath(`/dashboard/${studyId}`);
  redirect(`/dashboard/${studyId}`);
}

export async function toggleApprovalRequestAction(studyId: string) {
  await requireOwnerOrMember(studyId);
  const project = await Project.findById(studyId, { requestedForApproval: 1 }).lean() as { requestedForApproval?: boolean } | null;
  if (!project) redirect("/dashboard");
  await Project.updateOne({ _id: studyId }, { $set: { requestedForApproval: !project.requestedForApproval } });
  revalidatePath(`/dashboard/${studyId}`);
  redirect(`/dashboard/${studyId}/approval`);
}

/**
 * Queues a pre-flight test notification to one participant.
 *
 * Deliberately goes through the ordinary pipeline — it inserts a
 * PendingNotification due now, and the notification cron sends it via the same
 * code that sends every real notification. A parallel "test" send path would
 * prove that the test path works, which is not the question. This proves the
 * real one does: the same placeholder substitution, the same push, the same
 * Result row, the same completion callback.
 *
 * The cost is up to a minute of latency, since the cron polls every minute.
 *
 * The resulting row is flagged `isTest` and is excluded from every analytics
 * figure and from the data export, so checking a setup cannot distort the
 * numbers the researcher later publishes.
 */
export async function sendTestNotificationAction(studyId: string, samplyId: string) {
  await requireOwnerOrMember(studyId);

  const project = await Project.findById(studyId, { notifications: 1, mobileUsers: 1 }).lean() as {
    notifications?: Array<{ id?: string; title?: string; message?: string; url?: string; expireIn?: number }>;
    mobileUsers?: Array<{ id: string; deactivated?: boolean }>;
  } | null;
  if (!project) return { ok: false as const, error: "Study not found" };

  const config = project.notifications?.[0];
  if (!config) {
    return { ok: false as const, error: "Create a schedule first — the test uses its message and survey link." };
  }

  const recipient = (project.mobileUsers ?? []).find((u) => u.id === samplyId && !u.deactivated);
  if (!recipient) {
    return { ok: false as const, error: "That participant is not active in this study." };
  }

  // The model is declared with a strict:false schema and typed as a bare
  // Document, so field-level typing is not available here; cast at the call site
  // exactly as the scheduling helpers do.
  const PendingNotification = (await import("@/lib/models/pendingNotification"))
    .default as unknown as mongoose.Model<Record<string, unknown>>;
  await PendingNotification.create({
    projectId: new mongoose.Types.ObjectId(studyId),
    notificationConfigId: config.id ?? "test",
    scheduledFor: new Date(),
    status: "pending",
    recipientUserIds: [samplyId],
    recipientGroupIds: [],
    title: config.title ?? "Samply test",
    message: config.message ?? "This is a test notification.",
    url: config.url ?? "",
    expireIn: config.expireIn ?? null,
    isReminder: false,
    isTest: true,
  });

  revalidatePath(`/dashboard/${studyId}`);
  return { ok: true as const };
}
