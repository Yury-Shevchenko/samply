// Pure schedule-expansion helpers (no DB / model dependencies) so they can be
// unit-tested in isolation. Mirrors nextapp/lib/scheduling.ts — keep in sync.
const momentTz = require("moment-timezone");
const Cron = require("cron-converter");

function toFivePart(cronExpr) {
  const parts = cronExpr.trim().split(/\s+/);
  return parts.length >= 6 ? parts.slice(1).join(" ") : cronExpr;
}

// Expand a standard cron between [from, to] into ISO timestamps.
function expandCronBetween(cronExpr, from, to, timezone) {
  const fivePart = toFivePart(cronExpr);
  const inst = new Cron({ timezone: timezone || "UTC" });
  try {
    inst.fromString(fivePart);
  } catch (e) {
    return [];
  }
  const endMs = new Date(to).getTime();
  const schedule = inst.schedule(new Date(new Date(from).getTime() - 1));
  const dates = [];
  let next = schedule.next();
  while (next && next.valueOf() <= endMs) {
    dates.push(new Date(next.valueOf()).toISOString());
    next = schedule.next();
  }
  return dates;
}

// Parse a cron month field (1-12) into a Set of allowed months, or null for
// "any month" ("*"). Supports comma lists, ranges (a-b) and steps (a-b/s, */s).
function parseMonthField(field) {
  if (!field || field === "*") return null;
  const set = new Set();
  for (const token of field.split(",")) {
    const step = /^(\*|\d+(?:-\d+)?)\/(\d+)$/.exec(token);
    if (step) {
      const s = parseInt(step[2], 10);
      let lo = 1, hi = 12;
      if (step[1] !== "*") {
        const r = step[1].split("-").map(Number);
        lo = r[0]; hi = r.length > 1 ? r[1] : lo;
      }
      for (let v = lo; v <= hi; v += s) set.add(v);
    } else if (/^\d+-\d+$/.test(token)) {
      const [lo, hi] = token.split("-").map(Number);
      for (let v = lo; v <= hi; v++) set.add(v);
    } else if (/^\d+$/.test(token)) {
      set.add(parseInt(token, 10));
    } else {
      return null;
    }
  }
  return set.size ? set : null;
}

// Expand a repeating schedule between [from, to] into ISO timestamps.
//
// "Every N days" is emitted as "*/N" in the cron DAY-OF-MONTH field, which is
// per-month and resets at every month boundary — so a cron expansion can never
// step e.g. 29 Jul -> 1 Aug and repeating schedules silently stopped at the end
// of the start month. Detect that shape and instead step N calendar days from
// the window start at the schedule's fixed time-of-day (in the schedule
// timezone, so the local wall-clock time is stable across DST). Any month
// restriction is honoured. Everything else defers to the cron expander.
function expandScheduleBetween(cronExpr, from, to, timezone) {
  const parts = cronExpr.trim().split(/\s+/);
  const dom = parts.length === 6 ? parts[3] : null;
  const stepMatch = dom ? /^\*\/(\d+)$/.exec(dom) : null;
  const stepDays = stepMatch ? parseInt(stepMatch[1], 10) : 0;
  const fixedTime = /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1]) && /^\d+$/.test(parts[2]);
  const dowAny = parts[5] === "*";
  if (!(stepDays >= 2 && fixedTime && dowAny)) {
    return expandCronBetween(cronExpr, from, to, timezone);
  }

  const tz = timezone || "UTC";
  const second = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  const hour = parseInt(parts[2], 10);
  const months = parseMonthField(parts[4]);
  const fromM = momentTz.tz(from, tz);
  const toM = momentTz.tz(to, tz);
  const cur = fromM.clone().set({ hour, minute, second, millisecond: 0 });
  const out = [];
  let guard = 0;
  while (cur.isSameOrBefore(toM) && guard < 100000) {
    guard++;
    if (cur.isSameOrAfter(fromM) && (months === null || months.has(cur.month() + 1))) {
      out.push(cur.toISOString());
    }
    cur.add(stepDays, "days");
  }
  return out;
}

module.exports = { toFivePart, expandCronBetween, parseMonthField, expandScheduleBetween };
