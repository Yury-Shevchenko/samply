import { getSchedule, stringToArray } from "cron-converter";
import momentTz from "moment-timezone";

const MAX_DOCS_PER_BATCH = 5_000;

export class BatchLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BatchLimitError";
  }
}

export interface PendingNotificationDoc {
  projectId: unknown;
  notificationConfigId: string;
  scheduledFor: Date;
  recipientUserIds: string[];
  recipientGroupIds: string[];
  title: string;
  message: string;
  url: string;
  expireIn?: number | null;
  timezone?: string;
  useParticipantTimezone?: boolean;
  status: "pending";
  created: Date;
}

export async function scheduleBatch(docs: PendingNotificationDoc[]): Promise<{ inserted: number; skipped: number }> {
  if (!docs || docs.length === 0) return { inserted: 0, skipped: 0 };
  const now = new Date();
  const future = docs.filter((d) => new Date(d.scheduledFor) > now);
  const skipped = docs.length - future.length;
  if (future.length === 0) return { inserted: 0, skipped };
  if (future.length > MAX_DOCS_PER_BATCH) {
    throw new BatchLimitError(
      `This operation would insert ${future.length.toLocaleString()} notifications at once (limit: ${MAX_DOCS_PER_BATCH.toLocaleString()}). Reduce the date range or notification frequency.`
    );
  }
  const PendingNotification = (await import("@/lib/models/pendingNotification")).default;
  await PendingNotification.insertMany(future);
  return { inserted: future.length, skipped };
}

// Convert a 6-part cron (with seconds) to 5-part by stripping the first field.
function toFivePart(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  return parts.length >= 6 ? parts.slice(1).join(" ") : expr;
}

export function expandCronBetween(cronExpr: string, from: Date | string, to: Date | string, timezone?: string): string[] {
  const fivePart = toFivePart(cronExpr);
  let arr: number[][];
  try {
    arr = stringToArray(fivePart);
  } catch {
    console.error("expandCronBetween: invalid cron", cronExpr);
    return [];
  }
  const fromMs = new Date(from).getTime() - 1;
  const toMs = new Date(to).getTime();
  const schedule = getSchedule(arr, new Date(fromMs), timezone || "UTC");
  const dates: string[] = [];
  let next = schedule.next();
  while (next && next.ts <= toMs) {
    dates.push(new Date(next.ts).toISOString());
    next = schedule.next();
  }
  return dates;
}

// Parse a cron month field (1-12) into a Set of allowed months, or null for
// "any month" ("*"). Supports comma lists, ranges (a-b) and steps (a-b/s, */s).
// An unrecognised token yields null (treat as "any") rather than silently
// dropping occurrences.
function parseMonthField(field: string): Set<number> | null {
  if (!field || field === "*") return null;
  const set = new Set<number>();
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
// "Every N days" is emitted by the form as "*/N" in the cron DAY-OF-MONTH field.
// A day-of-month field is inherently per-month and RESETS at every month
// boundary, so expanding it via cron can only ever emit the same day-numbers
// within each month — it can never step e.g. 29 Jul -> 1 Aug. That made
// repeating "every N days" schedules silently stop at the end of the start
// month (Samply issue: an interval + a stop date in a later month produced no
// occurrences after the first month).
//
// This detects that interval shape and instead steps N *calendar* days from the
// window start at the schedule's fixed time-of-day, so the cadence rolls
// continuously across months. Stepping in the schedule timezone keeps the local
// wall-clock time stable across DST. Any month restriction is still honoured.
// Every other cron shape (specific days, weekly, every-day "*", minute
// intervals, …) falls through to the generic cron expander unchanged.
export function expandScheduleBetween(
  cronExpr: string, from: Date | string, to: Date | string, timezone?: string
): string[] {
  const parts = cronExpr.trim().split(/\s+/);
  const dom = parts.length === 6 ? parts[3] : null;
  const stepMatch = dom ? /^\*\/(\d+)$/.exec(dom) : null;
  const stepDays = stepMatch ? parseInt(stepMatch[1], 10) : 0;
  const fixedTime = /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1]) && /^\d+$/.test(parts[2]);
  const dowAny = parts[5] === "*";
  // Only take the rolling-interval path for a clean "every N days at a fixed
  // time, no weekday restriction". Anything else defers to cron.
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
  // Anchor at the schedule's time-of-day on the window-start day, then step.
  const cur = fromM.clone().set({ hour, minute, second, millisecond: 0 });
  const out: string[] = [];
  let guard = 0;
  while (cur.isSameOrBefore(toM) && guard < 100_000) {
    guard++;
    if (cur.isSameOrAfter(fromM) && (months === null || months.has(cur.month() + 1))) {
      out.push(cur.toISOString());
    }
    cur.add(stepDays, "days");
  }
  return out;
}

function getNumberBetween(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

function getNumbersInInterval(min: number, max: number, number: number, distance: number): number[] {
  const step = (max - min) / number;
  const maxAmount = distance > 0 ? (max - min) / distance : Infinity;
  if (number > maxAmount + 1) throw new Error("The minimum interval between notifications is too big");
  const numbers: number[] = [];
  if (Math.abs(number - maxAmount - 1) < 0.001) {
    for (let i = 0; i < number; i++) numbers.push(min + i * distance);
  } else {
    for (let i = 0; i < number; i++) {
      numbers.push(getNumberBetween(min + i * step, min + (i + 1) * step));
    }
  }
  return numbers;
}

function checkMinDistance(numbers: number[], distance: number): boolean {
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] - numbers[i] < distance) return true;
  }
  return false;
}

function getDatesInInterval(min: number, max: number, count: number, distance: number): number[] {
  let numbers: number[] = [];
  let adj = distance;
  let i = 0;
  do {
    numbers = getNumbersInInterval(min, max, count, adj);
    i++;
    if (i > 100) adj -= adj / 1000;
  } while (checkMinDistance(numbers, adj) && i < 1000);
  return numbers;
}

export interface RandomWindowDocFields {
  windowFrom: string;
  windowTo: string;
  int_start: Date | string;
  int_end: Date | string;
  number: number;
  distance: number;
  timezone?: string;
  [key: string]: unknown;
}

export function computeRandomWindowDocs(fields: RandomWindowDocFields): PendingNotificationDoc[] {
  const { windowFrom, windowTo, int_start, int_end, number, distance, timezone, ...docFields } = fields;
  const windowStarts = expandCronBetween(windowFrom, int_start, int_end, timezone);
  const docs: PendingNotificationDoc[] = [];

  for (const windowStart of windowStarts) {
    const fivePart = toFivePart(windowTo);
    let endArr: number[][];
    try {
      endArr = stringToArray(fivePart);
    } catch {
      continue;
    }
    const endSchedule = getSchedule(endArr, new Date(windowStart), timezone || "UTC");
    const windowEndMoment = endSchedule.next();
    if (!windowEndMoment) continue;
    const windowStartMs = new Date(windowStart).getTime();
    const windowEndMs = windowEndMoment.ts;
    if (windowStartMs >= windowEndMs) continue;

    let timestamps: number[];
    try {
      timestamps = getDatesInInterval(windowStartMs, windowEndMs, number, distance || 0);
    } catch {
      continue;
    }
    for (const ts of timestamps) {
      docs.push({ ...docFields, scheduledFor: new Date(ts) } as PendingNotificationDoc);
    }
  }
  return docs;
}

// Construct a timezone-aware Date from form field values.
export function makeTzDate(
  params: { year: number; month: number; day: number; hour: number; minute: number; second?: number },
  timezone: string
): Date {
  const m = momentTz.tz(params, timezone);
  return m.toDate();
}
