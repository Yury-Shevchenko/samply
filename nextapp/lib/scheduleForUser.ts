import momentTz from "moment-timezone";
import type mongoose from "mongoose";
import {
  scheduleBatch, expandCronBetween, computeRandomWindowDocs,
} from "./scheduling";

export interface StoredConfig {
  id: string;
  schedule?: string;
  randomize?: boolean;
  yokedDesign?: boolean;
  groups?: string[] | null;
  allCurrentGroups?: boolean;
  interval?: string;
  windowInterval?: { from: string; to: string; number: number; distance: number };
  int_start?: string;
  int_end?: string;
  start_event?: string;
  stop_event?: string;
  start_after?: { days?: number; hours?: number; minutes?: number };
  stop_after?: { days?: number; hours?: number; minutes?: number };
  start_next?: number;
  stop_next?: number;
  scheduleInFuture?: boolean;
  delay?: { days?: number; hours?: number; minutes?: number };
  title?: string;
  message?: string;
  url?: string;
  expireIn?: number | null;
  timezone?: string;
  useParticipantTimezone?: boolean;
}

function resolveStart(cfg: StoredConfig, userCreated: Date, timezone: string): string | undefined {
  if (cfg.start_event === "registration") {
    if (cfg.start_next) {
      const n = cfg.start_next;
      return n === 1
        ? momentTz(userCreated).add({ minutes: 1 }).toISOString()
        : momentTz.tz(userCreated, timezone).add({ days: n - 1 }).startOf("day")
            .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (cfg.start_after) {
      return new Date(userCreated.getTime() + momentTz.duration(cfg.start_after).asMilliseconds()).toISOString();
    }
    return momentTz(userCreated).add({ minutes: 1 }).toISOString();
  }
  return cfg.int_start;
}

function resolveStop(cfg: StoredConfig, userCreated: Date, timezone: string): string | undefined {
  if (cfg.stop_event === "registration") {
    if (cfg.stop_next) {
      const n = cfg.stop_next;
      return momentTz.tz(userCreated, timezone).add({ days: n }).startOf("day")
        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (cfg.stop_after) {
      return new Date(userCreated.getTime() + momentTz.duration(cfg.stop_after).asMilliseconds()).toISOString();
    }
  }
  return cfg.int_end;
}

// Anchor an "every N days" cron ("*/N" in the day-of-month field) to this user's
// window start. cron-converter only honours a step when given a RANGE: "7-31/7"
// yields [7,14,21,28], whereas the bare "7/7" collapses to just [7]. So expand
// "*/N" into "<startDay>-31/N", using the day-of-month in the schedule's timezone
// (a tz-naive Date.getDate() can be off by one near midnight). Must mirror the
// patchStartDay in the create routes / services/scheduleForUser.js.
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

export async function scheduleForUser(
  projectOid: mongoose.Types.ObjectId,
  user: { id: string; created: Date },
  groupId: string,
  configs: StoredConfig[]
): Promise<{ inserted: number; skipped: number }> {
  const counter = { inserted: 0, skipped: 0 };

  const relevant = configs.filter((cfg) => {
    if (cfg.yokedDesign) return false;
    // enrollment configs are always scheduled here regardless of scheduleInFuture
    if (cfg.schedule !== "enrollment" && cfg.scheduleInFuture) return false;
    if (cfg.allCurrentGroups) return true;
    return Array.isArray(cfg.groups) && cfg.groups.includes(groupId);
  });

  for (const cfg of relevant) {
    const timezone = cfg.timezone ?? "UTC";
    const baseDoc = {
      projectId: projectOid,
      notificationConfigId: cfg.id,
      title: cfg.title ?? "",
      message: cfg.message ?? "",
      url: cfg.url ?? "",
      expireIn: cfg.expireIn ?? null,
      timezone,
      useParticipantTimezone: !!cfg.useParticipantTimezone,
      status: "pending" as const,
      created: new Date(),
      recipientUserIds: [user.id],
      recipientGroupIds: [] as string[],
    };

    if (cfg.schedule === "repeat" && cfg.randomize && cfg.windowInterval) {
      // createintervalnotification (random windows with registration-relative or fixed bounds)
      const start = resolveStart(cfg, user.created, timezone);
      const stop = resolveStop(cfg, user.created, timezone);
      if (!start || !stop) continue;
      const { from, to, number, distance } = cfg.windowInterval;
      const docs = computeRandomWindowDocs({
        ...baseDoc,
        windowFrom: patchStartDay(from, start, timezone),
        windowTo: patchStartDay(to, start, timezone),
        int_start: start,
        int_end: stop,
        number,
        distance: distance || 0,
      });
      const r = await scheduleBatch(docs);
      counter.inserted += r.inserted;
      counter.skipped += r.skipped;
    } else if (cfg.schedule === "enrollment") {
      const delayMs = ((cfg.delay?.days ?? 0) * 86400 + (cfg.delay?.hours ?? 0) * 3600 + (cfg.delay?.minutes ?? 0) * 60) * 1000;
      const MIN_BUFFER_MS = 30 * 1000;
      const base = Math.max(user.created.getTime(), Date.now());
      const scheduledFor = new Date(base + delayMs + MIN_BUFFER_MS);
      const r = await scheduleBatch([{ ...baseDoc, scheduledFor }]);
      counter.inserted += r.inserted;
      counter.skipped += r.skipped;
    } else if (cfg.schedule === "repeat" && !cfg.randomize && cfg.interval) {
      // createindividualnotification or createintervalnotification (fixed cron)
      const start = resolveStart(cfg, user.created, timezone);
      const stop = resolveStop(cfg, user.created, timezone);
      if (!start || !stop) continue;
      const dates = expandCronBetween(patchStartDay(cfg.interval, start, timezone), start, stop, timezone);
      const r = await scheduleBatch(
        dates.map((d) => ({ ...baseDoc, scheduledFor: new Date(d) }))
      );
      counter.inserted += r.inserted;
      counter.skipped += r.skipped;
    }
  }

  return counter;
}
