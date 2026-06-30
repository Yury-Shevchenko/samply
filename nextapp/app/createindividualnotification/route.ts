import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import momentTz from "moment-timezone";
import { scheduleBatch, expandCronBetween, BatchLimitError, type PendingNotificationDoc } from "@/lib/scheduling";
import { sanitizeSurveyUrl } from "@/lib/urlValidation";

const MAX_PROJECT_PENDING = 50_000;

interface Reminder { title: string; message: string; time: number }
interface StartingStrategy {
  start?: string; startMoment?: string; startAfter?: { days?: number; hours?: number; minutes?: number };
  startEvent?: string; startNextDay?: number;
}
interface StoppingStrategy {
  stop?: string; stopMoment?: string; stopAfter?: { days?: number; hours?: number; minutes?: number };
  stopEvent?: string; stopNextDay?: number;
}
interface IndividualBody {
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
  interval: string[];
  int_start?: StartingStrategy;
  int_end?: StoppingStrategy;
}

function resolveUserStart(int_start: StartingStrategy | undefined, userCreated: Date | string, timezone: string): string | undefined {
  if (!int_start) return undefined;
  if (int_start.start === "specific" || int_start.startEvent === "now") return int_start.startMoment;
  if (int_start.startEvent === "registration") {
    if (int_start.startNextDay) {
      const n = int_start.startNextDay;
      return n == 1
        ? momentTz(userCreated).add({ minutes: 1 }).toISOString()
        : momentTz.tz(userCreated, timezone).add({ days: n - 1 }).startOf("day")
            .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (int_start.startAfter) {
      return new Date(new Date(userCreated).getTime() + momentTz.duration(int_start.startAfter).asMilliseconds()).toISOString();
    }
  }
  return undefined;
}

function resolveUserStop(int_end: StoppingStrategy | undefined, userCreated: Date | string, timezone: string): string | undefined {
  if (!int_end) return undefined;
  if (int_end.stop === "specific" || int_end.stopEvent === "now") return int_end.stopMoment;
  if (int_end.stopEvent === "registration") {
    if (int_end.stopNextDay) {
      const n = int_end.stopNextDay;
      return momentTz.tz(userCreated, timezone).add({ days: n }).startOf("day")
        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (int_end.stopAfter) {
      return new Date(new Date(userCreated).getTime() + momentTz.duration(int_end.stopAfter).asMilliseconds()).toISOString();
    }
  }
  return undefined;
}

function patchStartDay(expr: string, start: string): string {
  if (!expr.includes("*/")) return expr;
  const p = expr.split(" ");
  if (p[3]?.includes("*/")) p[3] = p[3].replace("*", String(new Date(start).getDate()));
  return p.join(" ");
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.level <= 10) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: IndividualBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { projectId, title, message, url: rawUrl, timezone, useParticipantTimezone, expireIn, reminders,
    scheduleInFuture, participantId, groups, yokedDesign, interval, int_start, int_end } = body;
  const url = sanitizeSurveyUrl(rawUrl);

  if (!projectId || !title || !message || !timezone || !interval?.length) {
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

  const int_startResolved = int_start?.start === "specific" || int_start?.startEvent === "now" ? int_start.startMoment : undefined;
  const int_endResolved = int_end?.stop === "specific" || int_end?.stopEvent === "now" ? int_end.stopMoment : undefined;

  let users: Array<{ id: string; created?: Date }> | undefined;
  if (participantId !== undefined && participantId !== null) {
    users = participantId.length > 0
      ? (p.mobileUsers ?? []).filter((u) => participantId.includes(u.id))
      : (p.mobileUsers ?? []).filter((u) => !u.deactivated);
  }

  let groupIds: string[] | undefined;
  if (groups !== undefined && groups !== null) {
    groupIds = groups.length > 0 ? groups
      : [...new Set((p.mobileUsers ?? []).map((u) => u.group?.id).filter(Boolean) as string[])];
  }

  // Collect notification configs for bulk save after scheduling
  const newConfigs = interval.map((iv) => ({
    id, target: "user-specific", schedule: "repeat", randomize: false,
    int_start: int_startResolved, int_end: int_endResolved,
    title, message, url, participantId, groups: groupIds,
    allCurrentParticipants: participantId !== null && participantId !== undefined && participantId.length === 0,
    allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
    name: "Repeat",
    start_after: int_start?.startAfter, stop_after: int_end?.stopAfter,
    start_next: int_start?.startNextDay, stop_next: int_end?.stopNextDay,
    start_event: int_start?.startEvent, stop_event: int_end?.stopEvent,
    scheduleInFuture, timezone, expireIn, useParticipantTimezone, reminders, yokedDesign: !!yokedDesign, created: new Date(),
    interval: iv,
  }));

  try {
    if (groupIds) {
      for (const group of groupIds) {
        const groupMembers = (p.mobileUsers ?? []).filter((u) => u.group?.id === group && !u.deactivated);
        if (!groupMembers.length) continue;
        if (yokedDesign) {
          const latestUser = groupMembers
            .sort((a, b) => (b.created?.getTime() ?? 0) - (a.created?.getTime() ?? 0))[0];
          const gStart = resolveUserStart(int_start, latestUser.created!, timezone) || int_startResolved;
          const gEnd = resolveUserStop(int_end, latestUser.created!, timezone) || int_endResolved;
          if (!gStart || !gEnd) continue;
          for (const iv of interval) {
            const dates = expandCronBetween(patchStartDay(iv, gStart), gStart, gEnd, timezone);
            const r = await scheduleBatch(dates.map((d) => ({
              ...baseDoc, scheduledFor: new Date(d), recipientGroupIds: [group], recipientUserIds: [],
            })));
            counter.inserted += r.inserted; counter.skipped += r.skipped;
          }
        } else {
          for (const member of groupMembers) {
            const uStart = resolveUserStart(int_start, member.created!, timezone) || int_startResolved;
            const uEnd = resolveUserStop(int_end, member.created!, timezone) || int_endResolved;
            if (!uStart || !uEnd) continue;
            for (const iv of interval) {
              const dates = expandCronBetween(patchStartDay(iv, uStart), uStart, uEnd, timezone);
              const r = await scheduleBatch(dates.map((d) => ({
                ...baseDoc, scheduledFor: new Date(d), recipientUserIds: [member.id], recipientGroupIds: [],
              })));
              counter.inserted += r.inserted; counter.skipped += r.skipped;
            }
          }
        }
      }
    }

    if (users) {
      for (const user of users) {
        const uStart = resolveUserStart(int_start, user.created!, timezone) || int_startResolved;
        const uEnd = resolveUserStop(int_end, user.created!, timezone) || int_endResolved;
        if (!uStart || !uEnd) continue;
        for (const iv of interval) {
          const dates = expandCronBetween(patchStartDay(iv, uStart), uStart, uEnd, timezone);
          const r = await scheduleBatch(dates.map((d) => ({
            ...baseDoc, scheduledFor: new Date(d), recipientUserIds: [user.id], recipientGroupIds: [],
          })));
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
      ? "All scheduled times were in the past — no notifications were queued."
      : `${counter.skipped} notification(s) were in the past and skipped; ${counter.inserted} were queued.`;
    return NextResponse.json({ warning, redirect: `/scheduled?project=${projectId}` });
  }
  return NextResponse.json({ redirect: `/scheduled?project=${projectId}` });
}
