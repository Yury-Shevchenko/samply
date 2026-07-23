import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import momentTz from "moment-timezone";
import {
  scheduleBatch, expandScheduleBetween, computeRandomWindowDocs,
  BatchLimitError, type PendingNotificationDoc
} from "@/lib/scheduling";
import cronstrue from "cronstrue";
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
interface IntervalWindow { from: string; to: string; number: number; distance: number }
interface IntervalBody {
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
  // fixed-interval
  interval?: string[];
  int_start?: StartingStrategy;
  int_end?: StoppingStrategy;
  // random-interval
  randomize?: boolean;
  intervalWindows?: IntervalWindow[];
}

function resolveStart(int_start: StartingStrategy | undefined, userCreated: Date | string | undefined, timezone: string): string | undefined {
  if (!int_start) return undefined;
  if (int_start.start === "specific" || int_start.startEvent === "now") return int_start.startMoment;
  if (int_start.startEvent === "registration" && userCreated) {
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

function resolveStop(int_end: StoppingStrategy | undefined, userCreated: Date | string | undefined, timezone: string): string | undefined {
  if (!int_end) return undefined;
  if (int_end.stop === "specific" || int_end.stopEvent === "now") return int_end.stopMoment;
  if (int_end.stopEvent === "registration" && userCreated) {
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

// Anchor an "every N days" cron ("*/N" in the day-of-month field) to the
// recipient's window start. cron-converter only honours a step when it is given
// a RANGE: "7-31/7" yields [7,14,21,28], whereas the bare "7/7" collapses to just
// [7]. So expand "*/N" into "<startDay>-31/N", using the day-of-month in the
// schedule's timezone (a tz-naive Date.getDate() can be off by one near midnight).
function patchStartDay(cronExpr: string, start: string, timezone?: string): string {
  if (!cronExpr.includes("*/")) return cronExpr;
  const p = cronExpr.split(" ");
  if (p[3]?.startsWith("*/")) {
    const step = p[3].slice(2);
    const startDay = momentTz.tz(start, timezone || "UTC").date();
    p[3] = `${startDay}-31/${step}`;
  }
  return p.join(" ");
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: IntervalBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { projectId, title, message, url: rawUrl, timezone, useParticipantTimezone, expireIn, reminders,
    scheduleInFuture, participantId, groups, yokedDesign, interval, int_start, int_end, randomize, intervalWindows } = body;
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
    mobileUsers: Array<{ id: string; deactivated?: boolean; created?: Date; group?: { id: string } }>;
  };
  const isOwner = p.creator.toString() === session.user.id;
  const isMember = p.members?.some((m) => m.toString() === session.user.id) ?? false;
  if (!isOwner && !isMember) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const existingPending = await (await import("@/lib/models/pendingNotification")).default
    .countDocuments({ projectId: oid, status: "pending" });
  if (existingPending >= MAX_PROJECT_PENDING) {
    return NextResponse.json({ warning: `Project limit reached (${existingPending.toLocaleString()}/${MAX_PROJECT_PENDING.toLocaleString()}).`, redirect: `/scheduled?project=${projectId}` });
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
  const counter = { inserted: 0, skipped: 0 };

  const baseDoc = {
    projectId: oid, notificationConfigId: id, title, message, url: url || "",
    expireIn: expireIn ?? null, timezone, useParticipantTimezone: !!useParticipantTimezone,
    status: "pending" as const, created: new Date(),
  };

  // Resolve base start/stop (for "now" and "specific" strategies)
  const int_startResolved = int_start?.start === "specific" || int_start?.startEvent === "now" ? int_start.startMoment : undefined;
  const int_endResolved = int_end?.stop === "specific" || int_end?.stopEvent === "now" ? int_end.stopMoment : undefined;

  // Resolve participant and group lists
  let users: Array<{ id: string; created?: Date }> | undefined;
  if (participantId !== undefined && participantId !== null) {
    users = participantId.length > 0
      ? (p.mobileUsers ?? []).filter((u) => participantId.includes(u.id))
      : (p.mobileUsers ?? []).filter((u) => !u.deactivated);
  }

  let groupIds: string[] | undefined;
  if (groups !== undefined && groups !== null) {
    groupIds = groups.length > 0
      ? groups
      : [...new Set((p.mobileUsers ?? []).map((u) => u.group?.id).filter(Boolean) as string[])];
  }

  const newConfigs: unknown[] = [];

  try {
    if (randomize && intervalWindows) {
      // Random-interval: compute random times within each window
      for (const window of intervalWindows) {
        newConfigs.push({
          id, target: "user-specific", schedule: "repeat", randomize: true,
          int_start: int_startResolved, int_end: int_endResolved,
          title, message, url, participantId, groups: groupIds,
          allCurrentParticipants: participantId !== null && participantId !== undefined && participantId.length === 0,
          allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
          name: "Repeat", windowInterval: window,
          start_after: int_start?.startAfter, stop_after: int_end?.stopAfter,
          start_next: int_start?.startNextDay, stop_next: int_end?.stopNextDay,
          start_event: int_start?.startEvent, stop_event: int_end?.stopEvent,
          scheduleInFuture, readable: { from: window.from && safeHuman(window.from), to: window.to && safeHuman(window.to) },
          timezone, expireIn, useParticipantTimezone, reminders, yokedDesign: !!yokedDesign, spec: (body as unknown as { spec?: unknown }).spec ?? null, created: new Date(),
        });

        if (groupIds) {
          for (const group of groupIds) {
            const groupMembers = (p.mobileUsers ?? []).filter((u) => u.group?.id === group && !u.deactivated);
            if (!groupMembers.length) continue;
            if (yokedDesign) {
              const latestUser = groupMembers
                .sort((a, b) => (b.created ? b.created.getTime() : 0) - (a.created ? a.created.getTime() : 0))[0];
              const gStart = resolveStart(int_start, latestUser.created, timezone) || int_startResolved;
              const gEnd = resolveStop(int_end, latestUser.created, timezone) || int_endResolved;
              if (!gStart || !gEnd) continue;
              const docs = computeRandomWindowDocs({
                ...baseDoc, windowFrom: patchStartDay(window.from, gStart, timezone), windowTo: patchStartDay(window.to, gStart, timezone),
                int_start: gStart, int_end: gEnd, number: window.number, distance: window.distance || 0,
                recipientGroupIds: [group], recipientUserIds: [],
              });
              const r = await scheduleBatch(docs);
              counter.inserted += r.inserted; counter.skipped += r.skipped;
            } else {
              for (const member of groupMembers) {
                const uStart = resolveStart(int_start, member.created, timezone) || int_startResolved;
                const uEnd = resolveStop(int_end, member.created, timezone) || int_endResolved;
                if (!uStart || !uEnd) continue;
                const docs = computeRandomWindowDocs({
                  ...baseDoc, windowFrom: patchStartDay(window.from, uStart, timezone), windowTo: patchStartDay(window.to, uStart, timezone),
                  int_start: uStart, int_end: uEnd, number: window.number, distance: window.distance || 0,
                  recipientUserIds: [member.id], recipientGroupIds: [],
                });
                const r = await scheduleBatch(docs);
                counter.inserted += r.inserted; counter.skipped += r.skipped;
              }
            }
          }
        }

        if (users) {
          for (const user of users) {
            const uStart = resolveStart(int_start, user.created, timezone) || int_startResolved;
            const uEnd = resolveStop(int_end, user.created, timezone) || int_endResolved;
            if (!uStart || !uEnd) continue;
            const docs = computeRandomWindowDocs({
              ...baseDoc, windowFrom: patchStartDay(window.from, uStart, timezone), windowTo: patchStartDay(window.to, uStart, timezone),
              int_start: uStart, int_end: uEnd, number: window.number, distance: window.distance || 0,
              recipientUserIds: [user.id], recipientGroupIds: [],
            });
            const r = await scheduleBatch(docs);
            counter.inserted += r.inserted; counter.skipped += r.skipped;
          }
        }
      }
    } else if (interval) {
      // Fixed-interval: expand cron expressions between start and stop dates
      for (const iv of interval) {
        newConfigs.push({
          id, target: "fixed-intervals", schedule: "repeat", randomize: false,
          int_start: int_startResolved, int_end: int_endResolved,
          title, message, url, participantId, groups: groupIds,
          allCurrentParticipants: participantId !== null && participantId !== undefined && participantId.length === 0,
          allCurrentGroups: groups !== null && groups !== undefined && groups.length === 0,
          name: "Repeat",
          start_after: int_start?.startAfter, stop_after: int_end?.stopAfter,
          start_next: int_start?.startNextDay, stop_next: int_end?.stopNextDay,
          start_event: int_start?.startEvent, stop_event: int_end?.stopEvent,
          scheduleInFuture, timezone, expireIn, useParticipantTimezone, reminders,
          interval: iv, readable: { interval: safeHuman(iv) }, yokedDesign: !!yokedDesign, spec: (body as unknown as { spec?: unknown }).spec ?? null, created: new Date(),
        });
      }

      if (groupIds) {
        for (const group of groupIds) {
          const groupMembers = (p.mobileUsers ?? []).filter((u) => u.group?.id === group && !u.deactivated);
          if (!groupMembers.length) continue;
          if (yokedDesign) {
            const latestUser = groupMembers
              .sort((a, b) => (b.created ? b.created.getTime() : 0) - (a.created ? a.created.getTime() : 0))[0];
            const gStart = resolveStart(int_start, latestUser.created, timezone) || int_startResolved;
            const gEnd = resolveStop(int_end, latestUser.created, timezone) || int_endResolved;
            if (!gStart || !gEnd) continue;
            for (const iv of interval) {
              const dates = expandScheduleBetween(iv, gStart, gEnd, timezone);
              const r = await scheduleBatch(dates.map((d) => ({
                ...baseDoc, scheduledFor: new Date(d), recipientGroupIds: [group], recipientUserIds: [],
              })));
              counter.inserted += r.inserted; counter.skipped += r.skipped;
            }
          } else {
            for (const member of groupMembers) {
              const uStart = resolveStart(int_start, member.created, timezone) || int_startResolved;
              const uEnd = resolveStop(int_end, member.created, timezone) || int_endResolved;
              if (!uStart || !uEnd) continue;
              for (const iv of interval) {
                const dates = expandScheduleBetween(iv, uStart, uEnd, timezone);
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
          const uStart = resolveStart(int_start, user.created, timezone) || int_startResolved;
          const uEnd = resolveStop(int_end, user.created, timezone) || int_endResolved;
          if (!uStart || !uEnd) continue;
          for (const iv of interval) {
            const dates = expandScheduleBetween(iv, uStart, uEnd, timezone);
            const r = await scheduleBatch(dates.map((d) => ({
              ...baseDoc, scheduledFor: new Date(d), recipientUserIds: [user.id], recipientGroupIds: [],
            })));
            counter.inserted += r.inserted; counter.skipped += r.skipped;
          }
        }
      }
    }
  } catch (err) {
    if (err instanceof BatchLimitError) return NextResponse.json({ warning: err.message, redirect: `/scheduled?project=${projectId}` });
    throw err;
  }

  if (newConfigs.length > 0) {
    await Project.findByIdAndUpdate(projectId, { $push: { notifications: { $each: newConfigs } } });
  }

  if (counter.skipped > 0) {
    const warning = counter.inserted === 0
      ? "All scheduled times were in the past — no notifications were queued."
      : `${counter.skipped} notification(s) were in the past and skipped; ${counter.inserted} were queued.`;
    return NextResponse.json({ warning, redirect: `/scheduled?project=${projectId}` });
  }
  return NextResponse.json({ redirect: `/scheduled?project=${projectId}` });
}

function safeHuman(cronExpr: string): string {
  try {
    const parts = cronExpr.trim().split(/\s+/);
    const fivePart = parts.length >= 6 ? parts.slice(1).join(" ") : cronExpr;
    return cronstrue.toString(fivePart);
  } catch {
    return cronExpr;
  }
}
