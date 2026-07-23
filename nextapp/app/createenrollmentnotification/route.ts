import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { scheduleBatch, type PendingNotificationDoc } from "@/lib/scheduling";
import { sanitizeSurveyUrl } from "@/lib/urlValidation";

const MAX_PROJECT_PENDING = 50_000;

interface Reminder { title: string; message: string; time: number }
interface EnrollmentBody {
  projectId: string;
  title: string;
  message: string;
  url?: string;
  timezone: string;
  useParticipantTimezone?: boolean;
  expireIn?: number | null;
  reminders?: Reminder[];
  scheduleInFuture?: boolean;
  participants?: string[] | null;
  groups?: string[] | null;
  delay?: { days?: number; hours?: number; minutes?: number };
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.level <= 10) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: EnrollmentBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { projectId, title, message, url: rawUrl, timezone, useParticipantTimezone, expireIn,
    reminders, scheduleInFuture, participants, groups, delay } = body;
  const url = sanitizeSurveyUrl(rawUrl);

  if (!projectId || !title || !message || !timezone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const project = await Project.findById(projectId, { creator: 1, members: 1, mobileUsers: 1 });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: Array<{ id: string; deactivated?: boolean; created?: Date; group?: { id: string } }>;
  };
  const isOwner = p.creator.toString() === session.user.id;
  const isMember = p.members?.some((m) => m.toString() === session.user.id) ?? false;
  if (!isOwner && !isMember) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const existingPending = await (await import("@/lib/models/pendingNotification")).default
    .countDocuments({ projectId: oid, status: "pending" });
  if (existingPending >= MAX_PROJECT_PENDING) {
    return NextResponse.json({ warning: `Project limit reached (${existingPending.toLocaleString()}/${MAX_PROJECT_PENDING.toLocaleString()}).`, redirect: `/dashboard/${projectId}/schedule` });
  }

  const editConfigId = (body as unknown as { editConfigId?: string }).editConfigId;
  const id = editConfigId || nanoid(8);
  if (editConfigId) {
    const PN = (await import("@/lib/models/pendingNotification")).default;
    await Promise.all([
      Project.updateOne({ _id: oid }, { $pull: { notifications: { id: editConfigId } } }),
      PN.deleteMany({ projectId: oid, notificationConfigId: editConfigId, status: "pending", scheduledFor: { $gt: new Date() } }),
    ]);
  }
  const delayDays = delay?.days ?? 0;
  const delayHours = delay?.hours ?? 0;
  const delayMinutes = delay?.minutes ?? 0;
  const delayMs = (delayDays * 86400 + delayHours * 3600 + delayMinutes * 60) * 1000;

  const config = {
    id,
    schedule: "enrollment",
    delay: { days: delayDays, hours: delayHours, minutes: delayMinutes },
    title,
    message,
    url: url || "",
    participants: participants ?? null,
    groups: groups ?? null,
    allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
    allCurrentParticipants: participants !== null && participants !== undefined && participants.length === 0,
    scheduleInFuture: scheduleInFuture !== false,
    expireIn: expireIn ?? null,
    timezone,
    useParticipantTimezone: !!useParticipantTimezone,
    reminders: reminders ?? [],
    spec: (body as unknown as { spec?: unknown }).spec ?? null,
    created: new Date(),
  };

  await Project.findByIdAndUpdate(projectId, { $push: { notifications: config } });

  // Schedule retroactively for existing participants (option B: from their original join date)
  const docs: PendingNotificationDoc[] = [];
  if (participants !== null && participants !== undefined) {
    const activeUsers = (p.mobileUsers ?? []).filter((u) => !u.deactivated);
    const targetUsers = participants.length > 0
      ? activeUsers.filter((u) => participants.includes(u.id))
      : activeUsers;

    for (const u of targetUsers) {
      // Group filtering
      if (groups !== null && groups !== undefined) {
        if (groups.length > 0 && (!u.group?.id || !groups.includes(u.group.id))) continue;
        if (groups.length === 0 && !u.group?.id) continue; // allCurrentGroups but no group assigned
      }

      const userCreated = u.created ? new Date(u.created) : new Date();
      const scheduledFor = new Date(userCreated.getTime() + delayMs);

      docs.push({
        projectId: oid,
        notificationConfigId: id,
        scheduledFor,
        recipientUserIds: [u.id],
        recipientGroupIds: [],
        title,
        message,
        url: url || "",
        expireIn: expireIn ?? null,
        timezone,
        useParticipantTimezone: !!useParticipantTimezone,
        status: "pending",
        created: new Date(),
      });
    }
  }

  const result = docs.length > 0 ? await scheduleBatch(docs) : { inserted: 0, skipped: 0 };

  return NextResponse.json({ redirect: `/dashboard/${projectId}/schedule`, inserted: result.inserted, skipped: result.skipped });
}
