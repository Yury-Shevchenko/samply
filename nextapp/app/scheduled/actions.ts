"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import AgendaJob from "@/lib/models/agendaJob";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";
import type { Session } from "next-auth";

async function requireResearcher(): Promise<Session> {
  const session = await auth();
  if (!session || (session as Session).user.level <= 10) redirect("/login");
  return session as Session;
}

export async function deleteAllNotificationsAction(projectId: string) {
  const session = await requireResearcher();
  await connectDB();

  const oid = new mongoose.Types.ObjectId(projectId);
  const project = await Project.findById(projectId, { creator: 1 }).lean();
  if (!project) redirect("/scheduled");

  if ((project as unknown as { creator: { toString(): string } }).creator.toString() !== session.user.id) {
    redirect("/scheduled");
  }

  await Promise.all([
    Project.findByIdAndUpdate(projectId, { $set: { notifications: [] } }),
    AgendaJob.deleteMany({ "data.projectid": projectId }),
    PendingNotification.updateMany({ projectId: oid }, { status: "cancelled" }),
  ]);

  redirect(`/scheduled?project=${projectId}`);
}

export async function deleteNotificationAction(projectId: string, notificationId: string, returnTo?: string) {
  const session = await requireResearcher();
  await connectDB();

  const oid = new mongoose.Types.ObjectId(projectId);
  const project = await Project.findById(projectId, { creator: 1 }).lean();
  if (!project) redirect("/scheduled");

  if ((project as unknown as { creator: { toString(): string } }).creator.toString() !== session.user.id) {
    redirect("/scheduled");
  }

  await Promise.all([
    Project.findByIdAndUpdate(projectId, { $pull: { notifications: { id: notificationId } } }),
    AgendaJob.deleteMany({ "data.projectid": projectId, "data.id": notificationId }),
    PendingNotification.deleteMany({ projectId: oid, notificationConfigId: notificationId }),
  ]);

  redirect(returnTo ?? `/scheduled?project=${projectId}`);
}

export async function updateAgendaJobAction(jobId: string, formData: FormData) {
  await requireResearcher();
  await connectDB();

  const nextRunAt = formData.get("nextRunAt") as string;
  if (!nextRunAt) redirect("/scheduled");

  await AgendaJob.findByIdAndUpdate(jobId, { $set: { nextRunAt: new Date(nextRunAt) } });

  redirect("/scheduled");
}

async function requireProjectAccess(studyId: string): Promise<void> {
  const session = await requireResearcher();
  await connectDB();
  const project = await Project.findById(studyId, { creator: 1, members: 1 }).lean() as { creator: unknown; members: unknown[] } | null;
  if (!project) redirect(`/scheduled?project=${studyId}`);
  const creatorStr = String((project as { creator: unknown }).creator);
  const members = ((project as { members: unknown[] }).members ?? []).map(String);
  if (creatorStr !== session.user.id && !members.includes(session.user.id)) {
    redirect(`/scheduled?project=${studyId}`);
  }
}

function returnUrl(studyId: string, notificationId: string, pnStatus?: string): string {
  const p = new URLSearchParams({ notificationId });
  if (pnStatus) p.set("pnStatus", pnStatus);
  return `/scheduled/${studyId}?${p.toString()}`;
}

export async function deletePendingNotificationAction(
  studyId: string,
  pnId: string,
  notificationId: string,
  pnStatus: string | undefined,
) {
  await requireProjectAccess(studyId);
  const oid = new mongoose.Types.ObjectId(studyId);
  await PendingNotification.deleteOne({ _id: pnId, projectId: oid });
  redirect(returnUrl(studyId, notificationId, pnStatus));
}

export async function cancelPendingNotificationAction(
  studyId: string,
  pnId: string,
  notificationId: string,
  pnStatus: string | undefined,
) {
  await requireProjectAccess(studyId);
  const oid = new mongoose.Types.ObjectId(studyId);
  await PendingNotification.updateOne(
    { _id: pnId, projectId: oid, status: { $in: ["pending", "processing", "failed"] } },
    { $set: { status: "cancelled" } },
  );
  redirect(returnUrl(studyId, notificationId, pnStatus));
}

export async function reactivatePendingNotificationAction(
  studyId: string,
  pnId: string,
  notificationId: string,
  pnStatus: string | undefined,
) {
  await requireProjectAccess(studyId);
  const oid = new mongoose.Types.ObjectId(studyId);
  // Only reactivate if scheduledFor is in the future
  await PendingNotification.updateOne(
    { _id: pnId, projectId: oid, status: "cancelled", scheduledFor: { $gt: new Date() } },
    { $set: { status: "pending" } },
  );
  redirect(returnUrl(studyId, notificationId, pnStatus));
}

export async function bulkDeletePendingNotificationsAction(
  studyId: string,
  returnPath: string,
  ids: string[],
) {
  await requireProjectAccess(studyId);
  if (ids.length > 0) {
    const oid = new mongoose.Types.ObjectId(studyId);
    await PendingNotification.deleteMany({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
      projectId: oid,
    });
  }
  redirect(returnPath);
}
