const momentTz = require("moment-timezone");
const Cron = require("cron-converter");
const { scheduleBatch } = require("./notificationScheduler");
const { expandScheduleBetween, expandCronBetween, toFivePart } = require("./scheduleExpand");

function getNumberBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getNumbersInInterval(min, max, number, distance) {
  const step = (max - min) / number;
  const maxAmount = distance > 0 ? (max - min) / distance : Infinity;
  if (number > maxAmount + 1) throw new Error("Minimum interval too large");
  const numbers = [];
  if (Math.abs(number - maxAmount - 1) < 0.001) {
    for (let i = 0; i < number; i++) numbers.push(min + i * distance);
  } else {
    for (let i = 0; i < number; i++) {
      numbers.push(getNumberBetween(min + i * step, min + (i + 1) * step));
    }
  }
  return numbers;
}

function checkMinDistance(numbers, distance) {
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] - numbers[i] < distance) return true;
  }
  return false;
}

function getDatesInInterval(min, max, count, distance) {
  let numbers = [];
  let adj = distance;
  let i = 0;
  do {
    numbers = getNumbersInInterval(min, max, count, adj);
    i++;
    if (i > 100) adj -= adj / 1000;
  } while (checkMinDistance(numbers, adj) && i < 1000);
  return numbers;
}

function computeRandomWindowDocs({ windowFrom, windowTo, int_start, int_end, number, distance, timezone, ...docFields }) {
  const windowStarts = expandCronBetween(windowFrom, int_start, int_end, timezone);
  const docs = [];
  for (const windowStart of windowStarts) {
    const fivePart = toFivePart(windowTo);
    const endInst = new Cron({ timezone: timezone || "UTC" });
    try {
      endInst.fromString(fivePart);
    } catch (e) {
      continue;
    }
    const endSchedule = endInst.schedule(new Date(windowStart));
    const windowEndMoment = endSchedule.next();
    if (!windowEndMoment) continue;
    const windowStartMs = new Date(windowStart).getTime();
    const windowEndMs = windowEndMoment.valueOf();
    if (windowStartMs >= windowEndMs) continue;
    let timestamps;
    try {
      timestamps = getDatesInInterval(windowStartMs, windowEndMs, number, distance || 0);
    } catch (e) {
      continue;
    }
    for (const ts of timestamps) {
      docs.push({ ...docFields, scheduledFor: new Date(ts) });
    }
  }
  return docs;
}

// Anchor an "every N days" cron ("*/N" in the day-of-month field) to this user's
// window start. cron-converter only honours a step when given a RANGE: "7-31/7"
// yields [7,14,21,28], whereas the bare "7/7" collapses to just [7]. So expand
// "*/N" into "<startDay>-31/N", using the day-of-month in the schedule's timezone
// (a tz-naive Date.getDate() can be off by one near midnight). Must mirror the
// patchStartDay in the create routes so future participants (scheduled here at
// enrollment) get the same cadence as current ones.
function patchStartDay(cronExpr, start, timezone) {
  if (!cronExpr.includes("*/")) return cronExpr;
  const p = cronExpr.split(" ");
  if (p[3] && p[3].startsWith("*/")) {
    const step = p[3].slice(2);
    const startDay = momentTz.tz(start, timezone || "UTC").date();
    p[3] = `${startDay}-31/${step}`;
  }
  return p.join(" ");
}

function resolveStart(cfg, userCreated, timezone) {
  if (cfg.start_event === "registration") {
    if (cfg.start_next) {
      const n = cfg.start_next;
      return n === 1
        ? momentTz(userCreated).add({ minutes: 1 }).toISOString()
        : momentTz.tz(userCreated, timezone).add({ days: n - 1 }).startOf("day")
            .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (cfg.start_after) {
      return new Date(new Date(userCreated).getTime() + momentTz.duration(cfg.start_after).asMilliseconds()).toISOString();
    }
    return momentTz(userCreated).add({ minutes: 1 }).toISOString();
  }
  return cfg.int_start;
}

function resolveStop(cfg, userCreated, timezone) {
  if (cfg.stop_event === "registration") {
    if (cfg.stop_next) {
      const n = cfg.stop_next;
      return momentTz.tz(userCreated, timezone).add({ days: n }).startOf("day")
        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) }).toISOString();
    }
    if (cfg.stop_after) {
      return new Date(new Date(userCreated).getTime() + momentTz.duration(cfg.stop_after).asMilliseconds()).toISOString();
    }
  }
  return cfg.int_end;
}

/**
 * Auto-schedule non-yoked notifications for a newly added group member.
 * Filters project.notifications for configs targeting groupId, then generates
 * PendingNotification docs for the user based on each config's schedule.
 *
 * @param {mongoose.Types.ObjectId} projectOid
 * @param {{ id: string, created: Date }} user
 * @param {string} groupId
 * @param {Array} configs  — project.notifications array
 * @returns {Promise<{ inserted: number, skipped: number }>}
 */
async function scheduleForUser(projectOid, user, groupId, configs) {
  const counter = { inserted: 0, skipped: 0 };
  if (!configs || !configs.length) return counter;

  const relevant = configs.filter((cfg) => {
    if (cfg.yokedDesign) return false;
    // enrollment configs are always scheduled here regardless of scheduleInFuture
    if (cfg.schedule !== "enrollment" && cfg.scheduleInFuture) return false;
    if (cfg.allCurrentGroups) return true;
    return Array.isArray(cfg.groups) && cfg.groups.includes(groupId);
  });

  for (const cfg of relevant) {
    const timezone = cfg.timezone || "UTC";
    const baseDoc = {
      projectId: projectOid,
      notificationConfigId: cfg.id,
      title: cfg.title || "",
      message: cfg.message || "",
      url: cfg.url || "",
      expireIn: cfg.expireIn != null ? cfg.expireIn : null,
      timezone,
      useParticipantTimezone: !!cfg.useParticipantTimezone,
      status: "pending",
      created: new Date(),
      recipientUserIds: [user.id],
      recipientGroupIds: [],
    };

    if (cfg.schedule === "repeat" && cfg.randomize && cfg.windowInterval) {
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
      const delayMs = (((cfg.delay && cfg.delay.days) || 0) * 86400 + ((cfg.delay && cfg.delay.hours) || 0) * 3600 + ((cfg.delay && cfg.delay.minutes) || 0) * 60) * 1000;
      const MIN_BUFFER_MS = 30 * 1000;
      const base = Math.max(user.created.getTime(), Date.now());
      const scheduledFor = new Date(base + delayMs + MIN_BUFFER_MS);
      const r = await scheduleBatch([{ ...baseDoc, scheduledFor }]);
      counter.inserted += r.inserted;
      counter.skipped += r.skipped;
    } else if (cfg.schedule === "repeat" && !cfg.randomize && cfg.interval) {
      const start = resolveStart(cfg, user.created, timezone);
      const stop = resolveStop(cfg, user.created, timezone);
      if (!start || !stop) continue;
      const dates = expandScheduleBetween(cfg.interval, start, stop, timezone);
      const r = await scheduleBatch(
        dates.map((d) => ({ ...baseDoc, scheduledFor: new Date(d) }))
      );
      counter.inserted += r.inserted;
      counter.skipped += r.skipped;
    }
  }

  return counter;
}

module.exports = { scheduleForUser };
