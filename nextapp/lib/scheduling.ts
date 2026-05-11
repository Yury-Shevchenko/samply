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
