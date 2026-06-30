import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { scheduleBatch, computeRandomWindowDocs, BatchLimitError, type PendingNotificationDoc } from "@/lib/scheduling";
import { sanitizeSurveyUrl } from "@/lib/urlValidation";

const MAX_PROJECT_PENDING = 50_000;

interface Reminder { title: string; message: string; time: number }
interface FixedInterval { from: string; to: string; number: number; distance: number }
interface FixedBody {
  projectId: string;
  title: string;
  message: string;
  url?: string;
  timezone: string;
  useParticipantTimezone?: boolean;
  expireIn?: number | null;
  reminders?: Reminder[];
  scheduleInFuture?: boolean;
  participantId?: string[] | null;
  groups?: string[] | null;
  yokedDesign?: boolean;
  intervals: FixedInterval[];
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.level <= 10) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: FixedBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { projectId, title, message, url: rawUrl, timezone, useParticipantTimezone, expireIn, reminders,
    scheduleInFuture, participantId, groups, yokedDesign, intervals } = body;
  const url = sanitizeSurveyUrl(rawUrl);

  if (!projectId || !title || !message || !timezone || !intervals?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const project = await Project.findById(projectId, { name: 1, mobileUsers: 1, creator: 1, members: 1 });
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
    return NextResponse.json({ warning: `Project limit reached.`, redirect: `/scheduled?project=${projectId}` });
  }

  const id = nanoid(8);
  const counter = { inserted: 0, skipped: 0 };

  const baseDoc = {
    projectId: oid, notificationConfigId: id, title, message, url: url || "",
    expireIn: expireIn ?? null, timezone, useParticipantTimezone: !!useParticipantTimezone,
    status: "pending" as const, created: new Date(),
  };

  let users: string[] | undefined;
  if (participantId !== undefined && participantId !== null) {
    users = participantId.length > 0
      ? participantId
      : (p.mobileUsers ?? []).filter((u) => !u.deactivated).map((u) => u.id);
  }

  let groupIds: string[] | undefined;
  if (groups !== undefined && groups !== null) {
    groupIds = groups.length > 0 ? groups
      : [...new Set((p.mobileUsers ?? []).map((u) => u.group?.id).filter(Boolean) as string[])];
  }

  const newConfigs = intervals.map((interval) => ({
    id, target: "user-specific", schedule: "one-time", randomize: true,
    title, message, url, participantId, groups: groupIds,
    allCurrentParticipants: participantId !== null && participantId !== undefined && participantId.length === 0,
    allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
    name: "One-time", windowInterval: interval,
    scheduleInFuture, timezone, expireIn, useParticipantTimezone, reminders, yokedDesign: !!yokedDesign, created: new Date(),
  }));

  try {
    for (const interval of intervals) {
      if (groupIds) {
        for (const group of groupIds) {
          const groupMembers = (p.mobileUsers ?? []).filter((u) => u.group?.id === group && !u.deactivated);
          if (!groupMembers.length) continue;
          if (yokedDesign) {
            const docs = computeRandomWindowDocs({
              ...baseDoc, windowFrom: interval.from, windowTo: interval.to,
              int_start: interval.from, int_end: interval.to,
              number: interval.number, distance: interval.distance || 0,
              recipientGroupIds: [group], recipientUserIds: [],
            });
            const r = await scheduleBatch(docs);
            counter.inserted += r.inserted; counter.skipped += r.skipped;
          } else {
            for (const member of groupMembers) {
              const docs = computeRandomWindowDocs({
                ...baseDoc, windowFrom: interval.from, windowTo: interval.to,
                int_start: interval.from, int_end: interval.to,
                number: interval.number, distance: interval.distance || 0,
                recipientUserIds: [member.id], recipientGroupIds: [],
              });
              const r = await scheduleBatch(docs);
              counter.inserted += r.inserted; counter.skipped += r.skipped;
            }
          }
        }
      }

      if (users) {
        for (const userId of users) {
          const docs = computeRandomWindowDocs({
            ...baseDoc, windowFrom: interval.from, windowTo: interval.to,
            int_start: interval.from, int_end: interval.to,
            number: interval.number, distance: interval.distance || 0,
            recipientUserIds: [userId], recipientGroupIds: [],
          });
          const r = await scheduleBatch(docs);
          counter.inserted += r.inserted; counter.skipped += r.skipped;
        }
      }
    }
  } catch (err) {
    if (err instanceof BatchLimitError) return NextResponse.json({ warning: err.message, redirect: `/scheduled?project=${projectId}` });
    throw err;
  }

  await Project.findByIdAndUpdate(projectId, { $push: { notifications: { $each: newConfigs } } });

  if (counter.skipped > 0) {
    const warning = counter.inserted === 0
      ? "All selected dates were in the past — no notifications were queued."
      : `${counter.skipped} date(s) were in the past and skipped; ${counter.inserted} notification(s) were queued.`;
    return NextResponse.json({ warning, redirect: `/scheduled?project=${projectId}` });
  }
  return NextResponse.json({ redirect: `/scheduled?project=${projectId}` });
}
