// ScheduleSpec — the researcher's ORIGINAL form inputs for a schedule, stored
// verbatim on the notification config so the create form can be losslessly
// re-hydrated for editing (and so schedules can be re-compiled if the
// compilation logic changes).
//
// Scope: only the parts of the form that are hard/impossible to reverse from the
// compiled config (cron strings + strategy objects) — recipients, time, date,
// month, and the start/stop strategies, plus the timezone flags. Content
// (title/message/url), link expiry and reminders are NOT included here: they are
// already stored as plain top-level config fields and round-trip trivially, so
// keeping them out of the spec avoids any drift with the content-edit form.
//
// Bump SPEC_VERSION whenever the shape changes in a way that needs migration;
// hydration should tolerate missing/legacy fields via defaults.
export const SPEC_VERSION = 1;

export interface ScheduleSpecTimepoint { hour: number; minute: number }
export interface ScheduleSpecTimeWindow {
  hourStart: number; minuteStart: number; hourEnd: number; minuteEnd: number; distance: number; number: number;
}
export interface ScheduleSpecDate { day: number; month: number; year: number }

export interface ScheduleSpec {
  specVersion: number;

  // Timezone
  timezone: string;
  useParticipantTimezone: boolean;

  // Recipients
  includeCurrent: boolean;
  includeFuture: boolean;
  includeGroups: boolean;
  allCurrentParticipants: boolean;
  selectedParticipants: string[];
  allCurrentGroups: boolean;
  selectedGroups: string[];
  yokedDesign: boolean;

  // Time
  timeType: "specific" | "interval" | "repeat" | "enrollment";
  timepoints: ScheduleSpecTimepoint[];
  timeWindows: ScheduleSpecTimeWindow[];
  repeatEvery: number;
  enrollmentDays: number;
  enrollmentHours: number;
  enrollmentMinutes: number;

  // Date
  dateType: "specific" | "every" | "spec-week" | "spec-month";
  specificDates: ScheduleSpecDate[];
  everyNDays: number;
  selectedWeekDays: string[];
  selectedMonthDays: number[];

  // Month
  monthType: "every" | "specific";
  selectedMonths: string[];

  // Start strategy
  startType: "specific" | "event" | "next";
  startHour: number;
  startMinute: number;
  startDay: number;
  startMonth: number;
  startYear: number;
  startAfterDays: number;
  startAfterHours: number;
  startAfterMinutes: number;
  startEvent: "registration" | "now";
  startNextDay: number;
  startNextEvent: "registration" | "now";

  // Stop strategy
  stopType: "specific" | "event" | "next";
  stopHour: number;
  stopMinute: number;
  stopDay: number;
  stopMonth: number;
  stopYear: number;
  stopAfterDays: number;
  stopAfterHours: number;
  stopAfterMinutes: number;
  stopEvent: "registration" | "now";
  stopNextDay: number;
  stopNextEvent: "registration" | "now";
}
