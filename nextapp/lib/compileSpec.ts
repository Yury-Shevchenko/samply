// compileSpec — the single source of truth for turning a ScheduleSpec (the
// researcher's form inputs) into the API payload that a create route expects.
//
// This is a faithful extraction of the logic that previously lived inline in
// NotificationForm.handleSubmit (buildCronSchedules / buildCronIntervals /
// buildStartingStrategy / buildStoppingStrategy / buildDayMonthCron / etc.).
// The form now builds a spec and calls compileSpec(spec); the edit flow can call
// it too, so create and edit share one compiler and can never diverge.
//
// Pure except for getRandomSec (a per-submit delivery jitter, matching the old
// behaviour) and the "now"/"next" start-stop strategies, which read the current
// time — exactly as before. Content (title/message/url/expiry/reminders) and
// projectId are NOT produced here; the caller merges those in.
import type { ScheduleSpec } from "./scheduleSpec";

function getRandomSec(): number {
  return Math.floor(Math.random() * 60);
}

// A timezone-aware ISO string for a wall-clock date in the schedule timezone.
function buildTzIso(timezone: string, year: number, month: number, day: number, hour: number, minute: number): string {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: timezone, timeZoneName: "shortOffset" });
  const candidate = new Date(Date.UTC(year, month, day, hour, minute));
  const parts = fmt.formatToParts(candidate);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "UTC+0";
  const match = offsetPart.match(/([+-])(\d+)(?::(\d+))?/);
  let offsetMs = 0;
  if (match) {
    const sign = match[1] === "+" ? 1 : -1;
    offsetMs = sign * (parseInt(match[2]) * 60 + parseInt(match[3] ?? "0")) * 60000;
  }
  return new Date(candidate.getTime() - offsetMs).toISOString();
}

function addDuration(base: Date, d: { days?: number; hours?: number; minutes?: number }): Date {
  const ms = ((d.days ?? 0) * 86400 + (d.hours ?? 0) * 3600 + (d.minutes ?? 0) * 60) * 1000;
  return new Date(base.getTime() + ms);
}

function buildDayMonthCron(spec: ScheduleSpec): string {
  if (spec.dateType === "every") return spec.everyNDays === 1 ? "*" : `*/${spec.everyNDays}`;
  if (spec.dateType === "spec-week") return "*";
  if (spec.dateType === "spec-month") return spec.selectedMonthDays.join(",") || "*";
  return "*";
}
function buildDayWeekCron(spec: ScheduleSpec): string {
  return spec.dateType === "spec-week" ? (spec.selectedWeekDays.join(",") || "*") : "*";
}
function buildMonthCron(spec: ScheduleSpec): string {
  return spec.monthType === "every" ? "*" : (spec.selectedMonths.join(",") || "*");
}
function buildCronSchedules(spec: ScheduleSpec): string[] {
  return spec.timepoints.map((tp) => `${getRandomSec()} ${tp.minute} ${tp.hour} ${buildDayMonthCron(spec)} ${buildMonthCron(spec)} ${buildDayWeekCron(spec)}`);
}
function buildCronIntervals(spec: ScheduleSpec): Array<{ from: string; to: string; number: number; distance: number }> {
  const d = buildDayMonthCron(spec), w = buildDayWeekCron(spec), m = buildMonthCron(spec);
  return spec.timeWindows.map((w2) => ({
    from: `${getRandomSec()} ${w2.minuteStart} ${w2.hourStart} ${d} ${m} ${w}`,
    to: `${getRandomSec()} ${w2.minuteEnd} ${w2.hourEnd} ${d} ${m} ${w}`,
    number: w2.number,
    distance: w2.distance,
  }));
}

function buildStartingStrategy(spec: ScheduleSpec) {
  if (spec.startType === "specific") {
    return { start: "specific", startMoment: buildTzIso(spec.timezone, spec.startYear, spec.startMonth - 1, spec.startDay, spec.startHour, spec.startMinute), startAfter: "", startEvent: "", startNextDay: "" };
  }
  if (spec.startType === "event") {
    const startMoment = spec.startEvent === "now" ? addDuration(new Date(), { days: spec.startAfterDays, hours: spec.startAfterHours, minutes: spec.startAfterMinutes }).toISOString() : "";
    return { start: "event", startMoment, startAfter: { days: spec.startAfterDays, hours: spec.startAfterHours, minutes: spec.startAfterMinutes }, startEvent: spec.startEvent, startNextDay: "" };
  }
  const startMoment = spec.startNextEvent === "now"
    ? (spec.startNextDay == 1
        ? addDuration(new Date(), { minutes: 1 }).toISOString()
        : new Date(new Date().setHours(0, 0, 0, 0) + (spec.startNextDay - 1) * 86400000 + Math.floor(Math.random() * 10) * 60000).toISOString())
    : "";
  return { start: "next", startMoment, startAfter: "", startEvent: spec.startNextEvent, startNextDay: spec.startNextDay };
}

function buildStoppingStrategy(spec: ScheduleSpec) {
  if (spec.stopType === "specific") {
    return { stop: "specific", stopMoment: buildTzIso(spec.timezone, spec.stopYear, spec.stopMonth - 1, spec.stopDay, spec.stopHour, spec.stopMinute), stopAfter: "", stopEvent: "", stopNextDay: "" };
  }
  if (spec.stopType === "event") {
    const stopMoment = spec.stopEvent === "now" ? addDuration(new Date(), { days: spec.stopAfterDays, hours: spec.stopAfterHours, minutes: spec.stopAfterMinutes }).toISOString() : "";
    return { stop: "event", stopMoment, stopAfter: { days: spec.stopAfterDays, hours: spec.stopAfterHours, minutes: spec.stopAfterMinutes }, stopEvent: spec.stopEvent, stopNextDay: "" };
  }
  const stopMoment = spec.stopNextEvent === "now"
    ? (spec.stopNextDay == 1
        ? addDuration(new Date(), { minutes: 1 }).toISOString()
        : new Date(new Date().setHours(0, 0, 0, 0) + (spec.stopNextDay - 1) * 86400000 + Math.floor(Math.random() * 10) * 60000).toISOString())
    : "";
  return { stop: "next", stopMoment, stopAfter: "", stopEvent: spec.stopNextEvent, stopNextDay: spec.stopNextDay };
}

export interface CompiledSchedule {
  endpoint: string;
  fields: Record<string, unknown>;
}

// True iff (timeType, dateType) is the one invalid combination the form rejects
// with an alert ("repeat" cadence but "specific" one-off dates). Callers should
// check this and surface the alert BEFORE compiling.
export function isInvalidRepeatDates(spec: ScheduleSpec): boolean {
  return spec.timeType === "repeat" && spec.dateType === "specific";
}

export function compileSpec(spec: ScheduleSpec): CompiledSchedule {
  const participants = !spec.includeCurrent ? null : (spec.allCurrentParticipants ? [] : spec.selectedParticipants);
  const groups = !spec.includeGroups ? null : (spec.allCurrentGroups ? [] : spec.selectedGroups);

  const base = {
    timezone: spec.timezone,
    useParticipantTimezone: spec.useParticipantTimezone,
    scheduleInFuture: spec.includeFuture,
    participants,
    groups,
    yokedDesign: spec.includeGroups ? spec.yokedDesign : false,
  };

  if (spec.timeType === "enrollment") {
    return { endpoint: "/createenrollmentnotification", fields: { ...base, delay: { days: spec.enrollmentDays, hours: spec.enrollmentHours, minutes: spec.enrollmentMinutes } } };
  }

  if (spec.timeType === "specific" && spec.dateType === "specific") {
    return { endpoint: "/createschedulenotification", fields: { ...base, timepoints: spec.timepoints, dates: spec.specificDates } };
  }

  if (spec.timeType === "repeat") {
    const s = buildStartingStrategy(spec), e = buildStoppingStrategy(spec);
    const isRegBased = s.startEvent === "registration" || e.stopEvent === "registration";
    const crons = [`${getRandomSec()} */${spec.repeatEvery} * ${buildDayMonthCron(spec)} ${buildMonthCron(spec)} ${buildDayWeekCron(spec)}`];
    return { endpoint: isRegBased ? "/createindividualnotification" : "/createintervalnotification", fields: { ...base, interval: crons, int_start: s, int_end: e, randomize: false, participantId: participants } };
  }

  if (spec.timeType === "interval" && spec.dateType === "specific") {
    const fixedIntervals = spec.timeWindows.map((w) =>
      spec.specificDates.map((d) => ({
        from: buildTzIso(spec.timezone, d.year, d.month - 1, d.day, w.hourStart, w.minuteStart),
        to: buildTzIso(spec.timezone, d.year, d.month - 1, d.day, w.hourEnd, w.minuteEnd),
        number: w.number, distance: w.distance,
      }))
    ).flat();
    return { endpoint: "/createfixedindividualnotification", fields: { ...base, intervals: fixedIntervals, participantId: participants } };
  }

  const s = buildStartingStrategy(spec), e = buildStoppingStrategy(spec);
  const isRegBased = s.startEvent === "registration" || e.stopEvent === "registration";
  if (spec.timeType === "specific") {
    const crons = buildCronSchedules(spec);
    return { endpoint: isRegBased ? "/createindividualnotification" : "/createintervalnotification", fields: { ...base, interval: crons, int_start: s, int_end: e, randomize: false, participantId: participants } };
  }
  const cronWindows = buildCronIntervals(spec);
  return { endpoint: "/createintervalnotification", fields: { ...base, randomize: true, intervalWindows: cronWindows, int_start: s, int_end: e, participantId: participants } };
}
