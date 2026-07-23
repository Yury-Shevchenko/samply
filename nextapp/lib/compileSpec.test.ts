// Run with: node --experimental-strip-types lib/compileSpec.test.ts  (from nextapp/)
import { compileSpec, isInvalidRepeatDates } from "./compileSpec.ts";
import type { ScheduleSpec } from "./scheduleSpec.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}
function ok(name: string, cond: boolean) { console.log((cond ? "PASS " : "FAIL ") + name); cond ? pass++ : fail++; }
// Normalize the leading random-second field of a 6-field cron to "S".
const norm = (c: string) => c.replace(/^\d+ /, "S ");

function baseSpec(over: Partial<ScheduleSpec> = {}): ScheduleSpec {
  return {
    specVersion: 1,
    timezone: "Europe/London", useParticipantTimezone: true,
    includeCurrent: true, includeFuture: false, includeGroups: false,
    allCurrentParticipants: true, selectedParticipants: [], allCurrentGroups: true, selectedGroups: [], yokedDesign: false,
    timeType: "specific", timepoints: [{ hour: 17, minute: 0 }], timeWindows: [{ hourStart: 9, minuteStart: 0, hourEnd: 21, minuteEnd: 0, distance: 2700000, number: 5 }],
    repeatEvery: 30, enrollmentDays: 0, enrollmentHours: 0, enrollmentMinutes: 0,
    dateType: "every", specificDates: [{ day: 17, month: 7, year: 2026 }], everyNDays: 3, selectedWeekDays: [], selectedMonthDays: [],
    monthType: "every", selectedMonths: [],
    startType: "event", startHour: 9, startMinute: 0, startDay: 17, startMonth: 7, startYear: 2026,
    startAfterDays: 0, startAfterHours: 0, startAfterMinutes: 0, startEvent: "registration", startNextDay: 1, startNextEvent: "registration",
    stopType: "next", stopHour: 9, stopMinute: 0, stopDay: 15, stopMonth: 8, stopYear: 2026,
    stopAfterDays: 0, stopAfterHours: 0, stopAfterMinutes: 0, stopEvent: "registration", stopNextDay: 29, stopNextEvent: "registration",
    ...over,
  };
}

// 1) User's case: reg-based, every 3 days at 17:00 -> individual route, cron */3 in day-of-month
{
  const r = compileSpec(baseSpec());
  eq("1 endpoint (reg-based every-N-days)", r.endpoint, "/createindividualnotification");
  eq("1 cron", norm((r.fields.interval as string[])[0]), "S 0 17 */3 * *");
  eq("1 randomize", r.fields.randomize, false);
  ok("1 int_start.startEvent=registration", (r.fields.int_start as { startEvent: string }).startEvent === "registration");
  ok("1 int_end.stopNextDay=29", (r.fields.int_end as { stopNextDay: number }).stopNextDay === 29);
  eq("1 participants (all current)", r.fields.participants, []);
}

// 2) Non-reg every-N-days (absolute start/stop) -> interval route
{
  const r = compileSpec(baseSpec({
    startType: "specific", stopType: "specific",
  }));
  eq("2 endpoint (non-reg -> interval)", r.endpoint, "/createintervalnotification");
  ok("2 int_start.start=specific", (r.fields.int_start as { start: string }).start === "specific");
  ok("2 int_start.startMoment is ISO", /^2026-07-17T/.test((r.fields.int_start as { startMoment: string }).startMoment));
}

// 3) One-time specific dates -> schedule route
{
  const r = compileSpec(baseSpec({ timeType: "specific", dateType: "specific" }));
  eq("3 endpoint (one-time)", r.endpoint, "/createschedulenotification");
  eq("3 dates", r.fields.dates, [{ day: 17, month: 7, year: 2026 }]);
  eq("3 timepoints", r.fields.timepoints, [{ hour: 17, minute: 0 }]);
}

// 4) Enrollment -> enrollment route with delay
{
  const r = compileSpec(baseSpec({ timeType: "enrollment", enrollmentDays: 2, enrollmentHours: 3 }));
  eq("4 endpoint (enrollment)", r.endpoint, "/createenrollmentnotification");
  eq("4 delay", r.fields.delay, { days: 2, hours: 3, minutes: 0 });
}

// 5) Random windows (timeType interval, non-specific dates) -> interval route, randomize true
{
  const r = compileSpec(baseSpec({ timeType: "interval", dateType: "every" }));
  eq("5 endpoint (random windows)", r.endpoint, "/createintervalnotification");
  eq("5 randomize", r.fields.randomize, true);
  const w = (r.fields.intervalWindows as Array<{ from: string; to: string; number: number }>)[0];
  eq("5 window.from cron", norm(w.from), "S 0 9 */3 * *");
  eq("5 window.to cron", norm(w.to), "S 0 21 */3 * *");
  eq("5 window.number", w.number, 5);
}

// 6) Fixed windows on specific dates -> fixed-individual route
{
  const r = compileSpec(baseSpec({ timeType: "interval", dateType: "specific" }));
  eq("6 endpoint (fixed windows)", r.endpoint, "/createfixedindividualnotification");
  const iv = (r.fields.intervals as Array<{ from: string; to: string; number: number }>)[0];
  ok("6 interval.from ISO", /^2026-07-17T/.test(iv.from));
  eq("6 interval.number", iv.number, 5);
}

// 7) Recipients: specific groups + yoked
{
  const r = compileSpec(baseSpec({
    includeCurrent: false, includeGroups: true, allCurrentGroups: false, selectedGroups: ["g1", "g2"], yokedDesign: true,
  }));
  eq("7 participants (none)", r.fields.participants, null);
  eq("7 groups", r.fields.groups, ["g1", "g2"]);
  eq("7 yokedDesign", r.fields.yokedDesign, true);
}

// 8) Repeat minute-interval cron uses the MINUTE field, not day-of-month
{
  const r = compileSpec(baseSpec({ timeType: "repeat", dateType: "every", repeatEvery: 15, startType: "specific", stopType: "specific" }));
  eq("8 endpoint (repeat non-reg)", r.endpoint, "/createintervalnotification");
  eq("8 cron (minute interval)", norm((r.fields.interval as string[])[0]), "S */15 * */3 * *");
}

// 9) Invalid combo guard
ok("9 isInvalidRepeatDates true for repeat+specific", isInvalidRepeatDates(baseSpec({ timeType: "repeat", dateType: "specific" })) === true);
ok("9 isInvalidRepeatDates false otherwise", isInvalidRepeatDates(baseSpec()) === false);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
