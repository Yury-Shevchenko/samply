"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import AgendaJob from "@/lib/models/agendaJob";
import PendingNotification from "@/lib/models/pendingNotification";
import { sanitizeSurveyUrl } from "@/lib/urlValidation";
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

function safeReturnUrl(url: string | undefined, fallback: string): string {
  if (url && url.startsWith("/") && !url.startsWith("//")) return url;
  return fallback;
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

  redirect(safeReturnUrl(returnTo, `/scheduled?project=${projectId}`));
}

export async function updateAgendaJobAction(jobId: string, formData: FormData) {
  const session = await requireResearcher();
  await connectDB();

  const nextRunAt = formData.get("nextRunAt") as string;
  if (!nextRunAt) redirect("/scheduled");

  const nextDate = new Date(nextRunAt);
  if (isNaN(nextDate.getTime()) || nextDate.getTime() < Date.now()) redirect("/scheduled");

  // IDOR guard: verify this job belongs to a project owned or shared with the current user
  const job = await AgendaJob.findById(jobId, { "data.projectid": 1 }).lean() as { data?: { projectid?: string } } | null;
  if (!job?.data?.projectid) redirect("/scheduled");

  const project = await Project.findById(job.data.projectid, { creator: 1, members: 1 }).lean() as { creator: unknown; members: unknown[] } | null;
  if (!project) redirect("/scheduled");

  const creatorStr = String(project.creator);
  const memberStrs = (project.members ?? []).map(String);
  if (creatorStr !== session.user.id && !memberStrs.includes(session.user.id)) {
    redirect("/scheduled");
  }

  await AgendaJob.findByIdAndUpdate(jobId, { $set: { nextRunAt: nextDate } });

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
  redirect(safeReturnUrl(returnPath, `/scheduled/${studyId}`));
}

interface ReminderInput { title: string; message: string; time: number }

// Edit the CONTENT of an existing schedule (title / message / URL / link expiry /
// reminders) in place — leaving its cadence, recipients and history untouched.
// The config's content is copied onto each occurrence at create time, so we must
// update both the config (in Project.notifications) and the still-future,
// unsent, non-reminder occurrences. Sent/processing/past occurrences and
// already-materialised reminder occurrences are deliberately left as-is.
// Reminders live only on the config and are materialised at send time, so no
// occurrence backfill is needed for them.
export async function updateScheduleContentAction(
  studyId: string,
  notificationId: string,
  formData: FormData,
) {
  await requireProjectAccess(studyId);
  const oid = new mongoose.Types.ObjectId(studyId);

  const title = ((formData.get("title") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();
  const url = sanitizeSurveyUrl(formData.get("url") as string);

  const expireRaw = (formData.get("expireIn") as string) ?? "";
  const expireNum = expireRaw ? Number(expireRaw) : NaN;
  const expireIn = Number.isFinite(expireNum) && expireNum > 0 ? expireNum : null;

  let reminders: ReminderInput[] = [];
  try {
    const parsed = JSON.parse((formData.get("reminders") as string) || "[]");
    if (Array.isArray(parsed)) {
      reminders = parsed
        .filter((r) => r && typeof r === "object")
        .map((r) => ({
          title: String(r.title ?? ""),
          message: String(r.message ?? ""),
          time: Number.isFinite(Number(r.time)) ? Number(r.time) : 0,
        }));
    }
  } catch {
    reminders = [];
  }

  // Title and message are required — bail back to the queue on invalid input.
  if (!title || !message) redirect(returnUrl(studyId, notificationId));

  await Promise.all([
    // Update the config element(s) sharing this id (multi-cron submissions share one id).
    Project.updateOne(
      { _id: oid, "notifications.id": notificationId },
      {
        $set: {
          "notifications.$[c].title": title,
          "notifications.$[c].message": message,
          "notifications.$[c].url": url,
          "notifications.$[c].expireIn": expireIn,
          "notifications.$[c].reminders": reminders,
        },
      },
      { arrayFilters: [{ "c.id": notificationId }] },
    ),
    // Update only future, unsent, non-reminder occurrences (race-safe: the send
    // worker claims status:"pending" and flips to "processing" atomically).
    PendingNotification.updateMany(
      {
        projectId: oid,
        notificationConfigId: notificationId,
        status: "pending",
        scheduledFor: { $gt: new Date() },
        isReminder: { $ne: true },
      },
      { $set: { title, message, url, expireIn } },
    ),
  ]);

  redirect(returnUrl(studyId, notificationId));
}
