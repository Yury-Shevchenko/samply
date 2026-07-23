import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import momentTz from "moment-timezone";
import { scheduleBatch, makeTzDate, BatchLimitError, type PendingNotificationDoc } from "@/lib/scheduling";
import { sanitizeSurveyUrl } from "@/lib/urlValidation";

const MAX_PROJECT_PENDING = 50_000;

interface Reminder { title: string; message: string; time: number }
interface Timepoint { hour: number | string; minute: number | string }
interface SpecificDate { day: number | string; month: number | string; year: number | string }

interface ScheduleBody {
  projectId: string;
  title: string;
  message: string;
  url?: string;
  timezone: string;
  useParticipantTimezone?: boolean;
  expireIn?: number | null;
  reminders?: Reminder[];
  scheduleInFuture?: boolean;
  // recipients
  participants?: string[] | null;
  groups?: string[] | null;
  allCurrentParticipants?: boolean;
  allCurrentGroups?: boolean;
  // raw form data for one-time specific
  timepoints: Timepoint[];
  dates: SpecificDate[];
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ScheduleBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { projectId, title, message, url: rawUrl, timezone, useParticipantTimezone, expireIn, reminders,
    scheduleInFuture, participants, groups, timepoints, dates } = body;
  const url = sanitizeSurveyUrl(rawUrl);

  if (!projectId || !title || !message || !timezone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const project = await Project.findById(projectId, { name: 1, mobileUsers: 1, creator: 1, members: 1 });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: Array<{ id: string; deactivated?: boolean; group?: { id: string } }>;
  };
  const isOwner = p.creator.toString() === session.user.id;
  const isMember = p.members?.some((m) => m.toString() === session.user.id) ?? false;
  if (!isOwner && !isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existingPending = await (await import("@/lib/models/pendingNotification")).default
    .countDocuments({ projectId: oid, status: "pending" });
  if (existingPending >= MAX_PROJECT_PENDING) {
    return NextResponse.json({
      warning: `This project already has ${existingPending.toLocaleString()} pending notifications (limit: ${MAX_PROJECT_PENDING.toLocaleString()}). Delete old notifications before scheduling more.`,
      redirect: `/scheduled?project=${projectId}`,
    });
  }

  const id = nanoid(8);
  const counter = { inserted: 0, skipped: 0 };

  const baseDoc = {
    projectId: oid,
    notificationConfigId: id,
    title,
    message,
    url: url || "",
    expireIn: expireIn ?? null,
    timezone,
    useParticipantTimezone: !!useParticipantTimezone,
    status: "pending" as const,
    created: new Date(),
  };

  // Compute all scheduled dates (timezone-aware)
  const scheduledDates: Date[] = [];
  for (const tp of timepoints) {
    for (const d of dates) {
      const sec = Math.floor(Math.random() * 60);
      scheduledDates.push(makeTzDate({
        year: Number(d.year),
        month: Number(d.month) - 1,
        day: Number(d.day),
        hour: Number(tp.hour),
        minute: Number(tp.minute),
        second: sec,
      }, timezone));
    }
  }

  try {
    // Resolve user list
    let userIds: string[] | null = null;
    if (participants !== undefined && participants !== null) {
      userIds = participants.length > 0
        ? participants
        : (p.mobileUsers ?? []).filter((u) => !u.deactivated).map((u) => u.id);
    }

    // Resolve group list
    let groupIds: string[] | null = null;
    if (groups !== undefined && groups !== null) {
      groupIds = groups.length > 0
        ? groups
        : [...new Set((p.mobileUsers ?? []).map((u) => u.group?.id).filter(Boolean) as string[])];
    }

    const docs: PendingNotificationDoc[] = [];

    // An empty resolved list means "all current X" matched nobody — schedule
    // nothing rather than queuing a recipient-less notification. (`[]` is truthy,
    // so the length guard is required.)
    if (groupIds && groupIds.length > 0) {
      for (const d of scheduledDates) {
        docs.push({ ...baseDoc, scheduledFor: d, recipientGroupIds: groupIds, recipientUserIds: [] });
      }
    }

    if (userIds && userIds.length > 0) {
      if (!useParticipantTimezone) {
        for (const d of scheduledDates) {
          docs.push({ ...baseDoc, scheduledFor: d, recipientUserIds: userIds, recipientGroupIds: [] });
        }
      } else {
        const User = (await import("@/lib/models/user")).default;
        for (const userId of userIds) {
          const participant = await User.findOne({ samplyId: userId }, { information: 1 }).lean() as
            { information?: { timezone?: string } } | null;
          for (const d of scheduledDates) {
            let scheduledFor = d;
            if (participant?.information?.timezone) {
              const m = momentTz(d).tz(timezone).tz(participant.information.timezone, true);
              scheduledFor = m.toDate();
            }
            docs.push({ ...baseDoc, scheduledFor, recipientUserIds: [userId], recipientGroupIds: [] });
          }
        }
      }
    }

    const result = await scheduleBatch(docs);
    counter.inserted = result.inserted;
    counter.skipped = result.skipped;
  } catch (err) {
    if (err instanceof BatchLimitError) {
      return NextResponse.json({ warning: err.message, redirect: `/scheduled?project=${projectId}` });
    }
    throw err;
  }

  const newConfig = {
    id,
    target: "fixed-times",
    schedule: "one-time",
    randomize: false,
    date: scheduledDates[0]?.toISOString(),
    title,
    message,
    url: url || "",
    participantId: participants,
    groups,
    allCurrentParticipants: participants !== null && participants !== undefined && participants.length === 0,
    allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
    name: "One-time",
    scheduleInFuture,
    timezone,
    expireIn,
    useParticipantTimezone,
    reminders,
    spec: (body as unknown as { spec?: unknown }).spec ?? null,
    created: new Date(),
  };

  await Project.findByIdAndUpdate(projectId, { $push: { notifications: newConfig } });

  if (counter.skipped > 0) {
    const warning = counter.inserted === 0
      ? "All selected dates were in the past — no notifications were queued."
      : `${counter.skipped} date(s) were in the past and skipped; ${counter.inserted} notification(s) were queued.`;
    return NextResponse.json({ warning, redirect: `/scheduled?project=${projectId}` });
  }
  return NextResponse.json({ redirect: `/scheduled?project=${projectId}` });
}
