"use client";

import { useState, useEffect } from "react";
import { useT } from "@/app/components/TranslationProvider";
import { SPEC_VERSION, type ScheduleSpec } from "@/lib/scheduleSpec";
import { compileSpec, isInvalidRepeatDates } from "@/lib/compileSpec";

interface Participant { id: string; username?: string }
interface Group { id: string; name?: string }
interface Timepoint { hour: number; minute: number }
interface TimeWindow { hourStart: number; minuteStart: number; hourEnd: number; minuteEnd: number; distance: number; number: number }
interface SpecificDate { day: number; month: number; year: number }
interface Reminder { title: string; message: string; days: number; hours: number; minutes: number }

export interface EditInitial {
  configId: string;
  spec?: ScheduleSpec | null;
  title: string;
  message: string;
  url?: string;
  expireIn?: number | null;
  reminders?: Array<{ title: string; message: string; time: number }>;
}

interface Props {
  projectId: string;
  participants: Participant[];
  groups: Group[];
  preselectedParticipantId?: string;
  initial?: EditInitial;
}

const TIMEZONES = Intl.supportedValuesOf("timeZone");
const WEEKDAY_VALUES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
const MONTH_VALUES   = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

const now = new Date();
const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

function msToDHM(ms: number): { days: number; hours: number; minutes: number } {
  const totalMin = Math.max(0, Math.round(ms / 60000));
  return { days: Math.floor(totalMin / 1440), hours: Math.floor((totalMin % 1440) / 60), minutes: totalMin % 60 };
}

// ── Shared style tokens ────────────────────────────────────────────────────────

const FIELD: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.2rem",
  padding: "0.8rem 1.2rem",
  borderRadius: "0.6rem",
  border: "1px solid var(--ink-20)",
  background: "var(--paper)",
  color: "var(--ink)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const FIELD_SM: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.2rem",
  padding: "0.6rem 0.8rem",
  borderRadius: "0.6rem",
  border: "1px solid var(--ink-20)",
  background: "var(--paper)",
  color: "var(--ink)",
  outline: "none",
  width: "6rem",
  textAlign: "center",
  boxSizing: "border-box",
};

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  display: "block",
  marginBottom: "0.5rem",
};

const INLINE_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.1rem",
  color: "var(--ink-60)",
  letterSpacing: ".02em",
  whiteSpace: "nowrap",
};

const SELECT: React.CSSProperties = {
  ...FIELD,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2323201a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: "2.8rem",
};

// ── Helper components ──────────────────────────────────────────────────────────

function Segment({ options, value, onChange }: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "inline-flex", background: "var(--ink-10)", borderRadius: "9999px", padding: "0.3rem", gap: "0.2rem", flexWrap: "wrap" }}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            letterSpacing: ".04em",
            padding: "0.5rem 1.4rem",
            borderRadius: "9999px",
            border: "none",
            background: value === o.value ? "var(--surface)" : "transparent",
            color: value === o.value ? "var(--ink)" : "var(--ink-60)",
            cursor: "pointer",
            boxShadow: value === o.value ? "0 1px 3px rgba(0,0,0,.12)" : "none",
            transition: "all .12s",
            whiteSpace: "nowrap",
          }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function StepCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--ink-10)",
      borderRadius: "0.8rem",
      overflow: "hidden",
      boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)",
    }}>
      <div style={{ padding: "1.2rem 2rem", borderBottom: "1px solid var(--ink-10)", background: "var(--paper)", display: "flex", alignItems: "baseline", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)" }}>
          {num}
        </span>
        <span style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--ink)" }}>{title}</span>
      </div>
      <div style={{ padding: "1.8rem 2rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
        {children}
      </div>
    </div>
  );
}

function AddLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: ".04em" }}
      className="hover:opacity-70 transition-opacity">
      + {label}
    </button>
  );
}

function RemoveLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", background: "none", border: "none", cursor: "pointer", padding: "0 0.4rem", lineHeight: 1 }}
      className="hover:text-[var(--coral)] transition-colors">
      ✕
    </button>
  );
}

function Check({ label, checked, onChange, indent = false }: { label: string; checked: boolean; onChange: (v: boolean) => void; indent?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer", paddingLeft: indent ? "2rem" : 0 }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        style={{ width: "1.4rem", height: "1.4rem", cursor: "pointer", accentColor: "var(--coral)", flexShrink: 0 }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--ink-60)", letterSpacing: ".02em" }}>{label}</span>
    </label>
  );
}

function PillToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "1.1rem",
        letterSpacing: ".06em",
        padding: "0.5rem 1.2rem",
        borderRadius: "9999px",
        border: active ? "1px solid var(--coral)" : "1px solid var(--ink-20)",
        background: active ? "rgba(214,90,48,.08)" : "transparent",
        color: active ? "var(--coral)" : "var(--ink-60)",
        cursor: "pointer",
        transition: "all .12s",
      }}>
      {label}
    </button>
  );
}

// ── DatetimeStrategyPicker ─────────────────────────────────────────────────────

function DatetimeStrategyPicker({
  type, onTypeChange,
  hour, onHourChange, minute, onMinuteChange,
  day, onDayChange, month, onMonthChange, year, onYearChange,
  afterDays, onAfterDaysChange, afterHours, onAfterHoursChange, afterMinutes, onAfterMinutesChange,
  event, onEventChange,
  nextDay, onNextDayChange, nextEvent, onNextEventChange,
  tFn,
}: {
  type: "specific" | "event" | "next"; onTypeChange: (v: "specific" | "event" | "next") => void;
  hour: number; onHourChange: (v: number) => void;
  minute: number; onMinuteChange: (v: number) => void;
  day: number; onDayChange: (v: number) => void;
  month: number; onMonthChange: (v: number) => void;
  year: number; onYearChange: (v: number) => void;
  afterDays: number; onAfterDaysChange: (v: number) => void;
  afterHours: number; onAfterHoursChange: (v: number) => void;
  afterMinutes: number; onAfterMinutesChange: (v: number) => void;
  event: "registration" | "now"; onEventChange: (v: "registration" | "now") => void;
  nextDay: number; onNextDayChange: (v: number) => void;
  nextEvent: "registration" | "now"; onNextEventChange: (v: "registration" | "now") => void;
  tFn: (key: string) => string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <Segment
        options={[
          { value: "specific", label: tFn("notificationForm.specificDateTime") },
          { value: "event", label: tFn("notificationForm.relativeToEvent") },
          { value: "next", label: tFn("notificationForm.dayNAfterEvent") },
        ]}
        value={type}
        onChange={(v) => onTypeChange(v as "specific" | "event" | "next")}
      />

      {type === "specific" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
          <span style={INLINE_LABEL}>{tFn("notificationForm.inlineTime")}</span>
          <input type="number" min={0} max={23} value={hour} style={FIELD_SM} onChange={(e) => onHourChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>h</span>
          <input type="number" min={0} max={59} value={minute} style={FIELD_SM} onChange={(e) => onMinuteChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>m</span>
          <span style={{ ...INLINE_LABEL, marginLeft: "0.8rem" }}>{tFn("notificationForm.inlineDate")}</span>
          <input type="number" min={1} max={31} value={day} style={FIELD_SM} onChange={(e) => onDayChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>/</span>
          <input type="number" min={1} max={12} value={month} style={FIELD_SM} onChange={(e) => onMonthChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>/</span>
          <input type="number" min={2020} value={year} style={{ ...FIELD_SM, width: "7.6rem" }} onChange={(e) => onYearChange(Number(e.target.value))} />
        </div>
      )}

      {type === "event" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
          <span style={INLINE_LABEL}>{tFn("notificationForm.inlineAfter")}</span>
          <input type="number" min={0} value={afterDays} style={FIELD_SM} onChange={(e) => onAfterDaysChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>d</span>
          <input type="number" min={0} value={afterHours} style={FIELD_SM} onChange={(e) => onAfterHoursChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>h</span>
          <input type="number" min={0} value={afterMinutes} style={FIELD_SM} onChange={(e) => onAfterMinutesChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>{tFn("notificationForm.inlineMFrom")}</span>
          <select value={event} onChange={(e) => onEventChange(e.target.value as "registration" | "now")}
            style={{ ...SELECT, width: "auto", fontSize: "1.1rem", padding: "0.6rem 2.4rem 0.6rem 1rem" }}>
            <option value="registration">{tFn("notificationForm.optRegistration")}</option>
            <option value="now">{tFn("notificationForm.optNow")}</option>
          </select>
        </div>
      )}

      {type === "next" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
          <span style={INLINE_LABEL}>{tFn("notificationForm.inlineDay")}</span>
          <input type="number" min={1} max={10000} value={nextDay} style={{ ...FIELD_SM, width: "7rem" }} onChange={(e) => onNextDayChange(Number(e.target.value))} />
          <span style={INLINE_LABEL}>{tFn("notificationForm.inlineAfterWord")}</span>
          <select value={nextEvent} onChange={(e) => onNextEventChange(e.target.value as "registration" | "now")}
            style={{ ...SELECT, width: "auto", fontSize: "1.1rem", padding: "0.6rem 2.4rem 0.6rem 1rem" }}>
            <option value="registration">{tFn("notificationForm.optRegistration")}</option>
            <option value="now">{tFn("notificationForm.optNow")}</option>
          </select>
        </div>
      )}
    </div>
  );
}

// ── Main form ──────────────────────────────────────────────────────────────────

export default function NotificationForm({ projectId, participants, groups, preselectedParticipantId, initial }: Props) {
  const S = initial?.spec ?? undefined;
  const { t } = useT();

  const WEEKDAYS = [
    { value: "MON", label: t("notificationForm.mon") }, { value: "TUE", label: t("notificationForm.tue") },
    { value: "WED", label: t("notificationForm.wed") }, { value: "THU", label: t("notificationForm.thu") },
    { value: "FRI", label: t("notificationForm.fri") }, { value: "SAT", label: t("notificationForm.sat") },
    { value: "SUN", label: t("notificationForm.sun") },
  ];
  const MONTHS = [
    { value: "JAN", label: t("notificationForm.jan") }, { value: "FEB", label: t("notificationForm.feb") },
    { value: "MAR", label: t("notificationForm.mar") }, { value: "APR", label: t("notificationForm.apr") },
    { value: "MAY", label: t("notificationForm.may") }, { value: "JUN", label: t("notificationForm.jun") },
    { value: "JUL", label: t("notificationForm.jul") }, { value: "AUG", label: t("notificationForm.aug") },
    { value: "SEP", label: t("notificationForm.sep") }, { value: "OCT", label: t("notificationForm.oct") },
    { value: "NOV", label: t("notificationForm.nov") }, { value: "DEC", label: t("notificationForm.dec") },
  ];

  const [title, setTitle] = useState(initial?.title ?? "");
  const [message, setMessage] = useState(initial?.message ?? "");
  const [url, setUrl] = useState(initial?.url ?? "https://");
  const [urlHelpOpen, setUrlHelpOpen] = useState(false);

  const [timezone, setTimezone] = useState(() => S?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [useParticipantTimezone, setUseParticipantTimezone] = useState(S?.useParticipantTimezone ?? false);

  const [includeCurrent, setIncludeCurrent] = useState(S?.includeCurrent ?? !!preselectedParticipantId);
  const [includeFuture, setIncludeFuture] = useState(S?.includeFuture ?? false);
  const [includeGroups, setIncludeGroups] = useState(S?.includeGroups ?? false);
  const [allCurrentParticipants, setAllCurrentParticipants] = useState(S?.allCurrentParticipants ?? !preselectedParticipantId);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(S?.selectedParticipants ?? (preselectedParticipantId ? [preselectedParticipantId] : []));
  const [allCurrentGroups, setAllCurrentGroups] = useState(S?.allCurrentGroups ?? true);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(S?.selectedGroups ?? []);
  const [yokedDesign, setYokedDesign] = useState(S?.yokedDesign ?? false);

  const [timeType, setTimeType] = useState<"specific" | "interval" | "repeat" | "enrollment">(S?.timeType ?? "specific");
  const [enrollmentDays, setEnrollmentDays] = useState(S?.enrollmentDays ?? 0);
  const [enrollmentHours, setEnrollmentHours] = useState(S?.enrollmentHours ?? 0);
  const [enrollmentMinutes, setEnrollmentMinutes] = useState(S?.enrollmentMinutes ?? 0);

  // Auto-enable future participants when enrollment type is selected
  useEffect(() => {
    if (timeType === "enrollment") setIncludeFuture(true);
  }, [timeType]);
  const [timepoints, setTimepoints] = useState<Timepoint[]>(S?.timepoints ?? [{ hour: 12, minute: 0 }]);
  const [timeWindows, setTimeWindows] = useState<TimeWindow[]>(S?.timeWindows ?? [{ hourStart: 9, minuteStart: 0, hourEnd: 21, minuteEnd: 0, distance: 2700000, number: 5 }]);
  const [repeatEvery, setRepeatEvery] = useState(S?.repeatEvery ?? 30);

  const [dateType, setDateType] = useState<"specific" | "every" | "spec-week" | "spec-month">(S?.dateType ?? "specific");
  const [specificDates, setSpecificDates] = useState<SpecificDate[]>(S?.specificDates ?? [{ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() }]);
  const [everyNDays, setEveryNDays] = useState(S?.everyNDays ?? 1);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>(S?.selectedWeekDays ?? []);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>(S?.selectedMonthDays ?? []);

  const [monthType, setMonthType] = useState<"every" | "specific">(S?.monthType ?? "every");
  const [selectedMonths, setSelectedMonths] = useState<string[]>(S?.selectedMonths ?? []);

  const [startType, setStartType] = useState<"specific" | "event" | "next">(S?.startType ?? "specific");
  const [startHour, setStartHour] = useState(S?.startHour ?? now.getHours());
  const [startMinute, setStartMinute] = useState(S?.startMinute ?? now.getMinutes());
  const [startDay, setStartDay] = useState(S?.startDay ?? now.getDate());
  const [startMonth, setStartMonth] = useState(S?.startMonth ?? now.getMonth() + 1);
  const [startYear, setStartYear] = useState(S?.startYear ?? now.getFullYear());
  const [startAfterDays, setStartAfterDays] = useState(S?.startAfterDays ?? 0);
  const [startAfterHours, setStartAfterHours] = useState(S?.startAfterHours ?? 0);
  const [startAfterMinutes, setStartAfterMinutes] = useState(S?.startAfterMinutes ?? 0);
  const [startEvent, setStartEvent] = useState<"registration" | "now">(S?.startEvent ?? "registration");
  const [startNextDay, setStartNextDay] = useState(S?.startNextDay ?? 1);
  const [startNextEvent, setStartNextEvent] = useState<"registration" | "now">(S?.startNextEvent ?? "registration");

  const [stopType, setStopType] = useState<"specific" | "event" | "next">(S?.stopType ?? "specific");
  const [stopHour, setStopHour] = useState(S?.stopHour ?? now.getHours());
  const [stopMinute, setStopMinute] = useState(S?.stopMinute ?? now.getMinutes());
  const [stopDay, setStopDay] = useState(S?.stopDay ?? twoWeeksFromNow.getDate());
  const [stopMonth, setStopMonth] = useState(S?.stopMonth ?? twoWeeksFromNow.getMonth() + 1);
  const [stopYear, setStopYear] = useState(S?.stopYear ?? twoWeeksFromNow.getFullYear());
  const [stopAfterDays, setStopAfterDays] = useState(S?.stopAfterDays ?? 0);
  const [stopAfterHours, setStopAfterHours] = useState(S?.stopAfterHours ?? 0);
  const [stopAfterMinutes, setStopAfterMinutes] = useState(S?.stopAfterMinutes ?? 0);
  const [stopEvent, setStopEvent] = useState<"registration" | "now">(S?.stopEvent ?? "registration");
  const [stopNextDay, setStopNextDay] = useState(S?.stopNextDay ?? 1);
  const [stopNextEvent, setStopNextEvent] = useState<"registration" | "now">(S?.stopNextEvent ?? "registration");

  const initExpire = initial?.expireIn && initial.expireIn > 0 ? msToDHM(initial.expireIn) : null;
  const [expireType, setExpireType] = useState<"no" | "yes">(initExpire ? "yes" : "no");
  const [expireDays, setExpireDays] = useState(initExpire?.days ?? 0);
  const [expireHours, setExpireHours] = useState(initExpire?.hours ?? 0);
  const [expireMinutes, setExpireMinutes] = useState(initExpire?.minutes ?? 0);

  const initReminders: Reminder[] = (initial?.reminders ?? []).map((r) => ({ title: r.title, message: r.message, ...msToDHM(r.time ?? 0) }));
  const [reminderType, setReminderType] = useState<"no" | "yes">(initReminders.length ? "yes" : "no");
  const [reminders, setReminders] = useState<Reminder[]>(initReminders.length ? initReminders : [{ title: "", message: "", days: 0, hours: 0, minutes: 0 }]);

  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function toggleParticipant(id: string) {
    setSelectedParticipants((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
    setAllCurrentParticipants(false);
  }
  function toggleGroup(id: string) {
    setSelectedGroups((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]);
    setAllCurrentGroups(false);
  }
  function toggleWeekDay(d: string) {
    setSelectedWeekDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }
  function toggleMonth(m: string) {
    setSelectedMonths((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  }
  function toggleMonthDay(d: number) {
    setSelectedMonthDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }

  async function handleSubmit() {
    if (!title.trim()) { alert(t("notificationForm.alertTitle")); return; }
    if (!message.trim()) { alert(t("notificationForm.alertMessage")); return; }
    if (!includeCurrent && !includeFuture && !includeGroups) { alert(t("notificationForm.alertRecipient")); return; }

    let participantsList: string[] | null = null;
    if (includeCurrent) {
      if (allCurrentParticipants) { participantsList = []; }
      else {
        if (!selectedParticipants.length) { alert(t("notificationForm.alertParticipants")); return; }
        participantsList = selectedParticipants;
      }
    }

    let groupsList: string[] | null = null;
    if (includeGroups) {
      if (allCurrentGroups) { groupsList = []; }
      else {
        if (!selectedGroups.length) { alert(t("notificationForm.alertGroups")); return; }
        groupsList = selectedGroups;
      }
    }

    const expireIn = expireType === "yes" ? ((expireDays * 24 * 60 + expireHours * 60 + expireMinutes) * 60000) : null;
    const reminderList = reminderType === "yes"
      ? reminders.map((r) => ({ title: r.title, message: r.message, time: ((r.days * 24 * 60 + r.hours * 60 + r.minutes) * 60000) }))
      : [];

    // Capture the researcher's original form inputs so the schedule can be
    // re-hydrated for editing (and re-compiled) later. Only the hard-to-reverse
    // cadence/recipient/timezone state is stored — content/expiry/reminders
    // round-trip from plain config fields.
    const spec: ScheduleSpec = {
      specVersion: SPEC_VERSION,
      timezone, useParticipantTimezone,
      includeCurrent, includeFuture, includeGroups,
      allCurrentParticipants, selectedParticipants, allCurrentGroups, selectedGroups, yokedDesign,
      timeType, timepoints, timeWindows, repeatEvery, enrollmentDays, enrollmentHours, enrollmentMinutes,
      dateType, specificDates, everyNDays, selectedWeekDays, selectedMonthDays,
      monthType, selectedMonths,
      startType, startHour, startMinute, startDay, startMonth, startYear,
      startAfterDays, startAfterHours, startAfterMinutes, startEvent, startNextDay, startNextEvent,
      stopType, stopHour, stopMinute, stopDay, stopMonth, stopYear,
      stopAfterDays, stopAfterHours, stopAfterMinutes, stopEvent, stopNextDay, stopNextEvent,
    };

    // "repeat" cadence with "specific" one-off dates is not a valid combination.
    if (isInvalidRepeatDates(spec)) { alert(t("notificationForm.alertRepeatDates")); return; }

    setSubmitting(true);
    setStatus(null);

    try {
      // Compile the spec into the endpoint + timing/recipient payload; merge in
      // the content fields (which are not part of the spec) and the raw spec.
      const { endpoint, fields } = compileSpec(spec);
      // editConfigId (edit mode) tells the create route to reuse the existing
      // config id: it replaces the config in place and regenerates only future,
      // unsent occurrences instead of creating a brand-new schedule.
      const payload = { projectId, title, message, url: url.trim(), expireIn, reminders: reminderList, spec, editConfigId: initial?.configId, ...fields };

      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json() as { warning?: string; redirect?: string; error?: string };
      if (!res.ok) { setStatus(`Error: ${data.error ?? t("notificationForm.alertError")}`); return; }
      if (data.warning) alert(data.warning);
      window.location.href = initial?.configId
        ? `/scheduled/${projectId}?notificationId=${initial.configId}`
        : `/dashboard/${projectId}/schedule`;
    } catch (err) {
      setStatus(`Error: ${String(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  const showDateSteps = dateType !== "specific" && timeType !== "enrollment";

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

      {/* Content */}
      <StepCard num="content" title={t("notificationForm.cardContent")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={LABEL}>{t("notificationForm.labelTitle")}</label>
            <input style={FIELD} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("notificationForm.titlePlaceholder")} />
          </div>
          <div>
            <label style={LABEL}>{t("notificationForm.labelMessage")}</label>
            <input style={FIELD} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("notificationForm.messagePlaceholder")} />
          </div>
          <div>
            <label style={LABEL}>{t("notificationForm.labelWebLink")}</label>
            <input style={FIELD} type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://your-survey.com/?id=%SAMPLY_ID%" />
            {/* URL placeholder accordion */}
            <button
              type="button"
              onClick={() => setUrlHelpOpen((o) => !o)}
              style={{
                marginTop: "0.6rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                color: "var(--ink-40)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                letterSpacing: ".04em",
              }}
            >
              <span style={{ fontSize: "0.8em", transform: urlHelpOpen ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block", transition: "transform .15s" }}>▶</span>
              {t("notificationForm.urlHelpToggle")}
            </button>
            {urlHelpOpen && (
              <div style={{
                marginTop: "0.8rem",
                background: "var(--paper)",
                border: "1px solid var(--ink-10)",
                borderRadius: "0.6rem",
                padding: "1.4rem 1.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
                <p style={{ margin: 0, fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.7 }}>
                  {t("notificationForm.urlHelpDesc")}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { ph: "%SAMPLY_ID%", desc: t("notificationForm.urlHelpPhSamplyId") },
                    { ph: "%PARTICIPANT_CODE%", desc: t("notificationForm.urlHelpPhCode") },
                    { ph: "%MESSAGE_ID%", desc: t("notificationForm.urlHelpPhMessageId") },
                    { ph: "%GROUP_CODE%", desc: t("notificationForm.urlHelpPhGroup") },
                  ].map(({ ph, desc }) => (
                    <div key={ph} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                      <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--coral)", background: "rgba(214,90,48,.06)", padding: "0.15rem 0.5rem", borderRadius: "0.3rem", flexShrink: 0 }}>{ph}</code>
                      <span style={{ fontSize: "1.15rem", color: "var(--ink-60)" }}>{desc}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--surface)", borderRadius: "0.5rem", padding: "0.9rem 1.1rem" }}>
                  <p style={{ margin: "0 0 0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--ink-40)", letterSpacing: ".1em", textTransform: "uppercase" }}>{t("notificationForm.urlHelpExample")}</p>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink)", wordBreak: "break-all" }}>
                    {"https://survey.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&msg=%MESSAGE_ID%"}
                  </code>
                </div>
                <p style={{ margin: 0, fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
                  {t("notificationForm.urlHelpSeeQueryPre")}{" "}
                  <a href="https://en.wikipedia.org/wiki/Query_string" target="_blank" rel="noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>{t("notificationForm.urlHelpQueryStrings")}</a>
                  {" "}{t("notificationForm.urlHelpSeeQueryMid")}{" "}
                  <a href="https://samply.uni-konstanz.de/docs/notifications#placeholders" target="_blank" rel="noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>{t("notificationForm.urlHelpFullRef")}</a>.
                </p>
              </div>
            )}
          </div>
        </div>
      </StepCard>

      {/* Timezone */}
      <StepCard num="step 1" title={t("notificationForm.cardTimezone")}>
        <Check label={t("notificationForm.adjustTimezone")} checked={useParticipantTimezone} onChange={setUseParticipantTimezone} />
        <div>
          <label style={LABEL}>{t("notificationForm.refTimezone")}</label>
          <select style={SELECT} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
      </StepCard>

      {/* Recipients */}
      <StepCard num="step 2" title={t("notificationForm.cardRecipients")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Check label={t("notificationForm.futureParticipants")} checked={includeFuture} onChange={setIncludeFuture} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <Check label={t("notificationForm.currentParticipants")} checked={includeCurrent} onChange={setIncludeCurrent} />
            {includeCurrent && (
              <div style={{ paddingLeft: "2.2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <Segment
                  options={[{ value: "all", label: t("notificationForm.allParticipants") }, { value: "select", label: t("notificationForm.selectSpecific") }]}
                  value={allCurrentParticipants ? "all" : "select"}
                  onChange={(v) => { setAllCurrentParticipants(v === "all"); if (v === "all") setSelectedParticipants([]); }}
                />
                {!allCurrentParticipants && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {participants.map((p) => (
                      <PillToggle key={p.id} active={selectedParticipants.includes(p.id)} onClick={() => toggleParticipant(p.id)}
                        label={p.username ? `${p.username} (${p.id})` : p.id} />
                    ))}
                    {participants.length === 0 && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>{t("notificationForm.noParticipantsYet")}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {groups.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <Check label={t("notificationForm.groupsLabel")} checked={includeGroups} onChange={setIncludeGroups} />
              {includeGroups && (
                <div style={{ paddingLeft: "2.2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Segment
                    options={[{ value: "all", label: t("notificationForm.allGroups") }, { value: "select", label: t("notificationForm.selectSpecific") }]}
                    value={allCurrentGroups ? "all" : "select"}
                    onChange={(v) => { setAllCurrentGroups(v === "all"); if (v === "all") setSelectedGroups([]); }}
                  />
                  {!allCurrentGroups && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                      {groups.map((g) => (
                        <PillToggle key={g.id} active={selectedGroups.includes(g.id)} onClick={() => toggleGroup(g.id)} label={g.name ?? g.id} />
                      ))}
                    </div>
                  )}
                  {!(timeType === "specific" && dateType === "specific") && timeType !== "enrollment" && (
                    <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1rem 1.4rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)" }}>
                          {t("notificationForm.yokedLabel")}
                        </span>
                        <Segment
                          options={[
                            { value: "off", label: t("notificationForm.yokedOff") },
                            { value: "on", label: t("notificationForm.yokedOn") },
                          ]}
                          value={yokedDesign ? "on" : "off"}
                          onChange={(v) => setYokedDesign(v === "on")}
                        />
                      </div>
                      <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
                        {yokedDesign ? t("notificationForm.yokedHintOn") : t("notificationForm.yokedHintOff")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </StepCard>

      {/* Time */}
      <StepCard num="step 3" title={t("notificationForm.cardTime")}>
        <Segment
          options={[
            { value: "specific", label: t("notificationForm.specificTimepoints") },
            { value: "interval", label: t("notificationForm.randomWindow") },
            { value: "repeat", label: t("notificationForm.repeatEveryNMin") },
            { value: "enrollment", label: t("notificationForm.afterJoining") },
          ]}
          value={timeType}
          onChange={(v) => setTimeType(v as typeof timeType)}
        />

        {timeType === "specific" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {timepoints.map((tp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <input type="number" min={0} max={23} value={tp.hour} style={FIELD_SM}
                  onChange={(e) => setTimepoints((p) => p.map((x, j) => j === i ? { ...x, hour: Number(e.target.value) } : x))} />
                <span style={INLINE_LABEL}>h</span>
                <input type="number" min={0} max={59} value={tp.minute} style={FIELD_SM}
                  onChange={(e) => setTimepoints((p) => p.map((x, j) => j === i ? { ...x, minute: Number(e.target.value) } : x))} />
                <span style={INLINE_LABEL}>m</span>
                {timepoints.length > 1 && <RemoveLink onClick={() => setTimepoints((p) => p.filter((_, j) => j !== i))} />}
              </div>
            ))}
            <AddLink label={t("notificationForm.addTimepoint")} onClick={() => setTimepoints((p) => [...p, { hour: 12, minute: 0 }])} />
          </div>
        )}

        {timeType === "interval" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {timeWindows.map((w, i) => (
              <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
                  <span style={INLINE_LABEL}>{t("notificationForm.labelFrom")}</span>
                  <input type="number" min={0} max={23} value={w.hourStart} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, hourStart: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>h</span>
                  <input type="number" min={0} max={59} value={w.minuteStart} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, minuteStart: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>{t("notificationForm.labelTo")}</span>
                  <input type="number" min={0} max={23} value={w.hourEnd} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, hourEnd: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>h</span>
                  <input type="number" min={0} max={59} value={w.minuteEnd} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, minuteEnd: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>m</span>
                  {timeWindows.length > 1 && <RemoveLink onClick={() => setTimeWindows((p) => p.filter((_, j) => j !== i))} />}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
                  <span style={INLINE_LABEL}>{t("notificationForm.numNotifications")}</span>
                  <input type="number" min={1} value={w.number} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, number: Number(e.target.value) } : x))} />
                  <span style={{ ...INLINE_LABEL, marginLeft: "0.8rem" }}>{t("notificationForm.minGap")}</span>
                  <input type="number" min={0} value={Math.round(w.distance / 60000)} style={FIELD_SM}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, distance: Number(e.target.value) * 60000 } : x))} />
                </div>
              </div>
            ))}
            <AddLink label={t("notificationForm.addWindow")} onClick={() => setTimeWindows((p) => [...p, { hourStart: 9, minuteStart: 0, hourEnd: 21, minuteEnd: 0, distance: 2700000, number: 5 }])} />
          </div>
        )}

        {timeType === "repeat" && (
          <div>
            <label style={LABEL}>{t("notificationForm.labelRepeatEvery")}</label>
            <select style={{ ...SELECT, width: "auto" }} value={repeatEvery} onChange={(e) => setRepeatEvery(Number(e.target.value))}>
              {[1, 2, 5, 10, 15, 30].map((n) => <option key={n} value={n}>{n} {n > 1 ? t("notificationForm.minutePlural") : t("notificationForm.minuteSingular")}</option>)}
            </select>
          </div>
        )}

        {timeType === "enrollment" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={LABEL}>{t("notificationForm.afterJoiningDelay")}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <input type="number" min={0} value={enrollmentDays} style={FIELD_SM} onChange={(e) => setEnrollmentDays(Math.max(0, Number(e.target.value)))} />
                <span style={INLINE_LABEL}>d</span>
                <input type="number" min={0} max={23} value={enrollmentHours} style={FIELD_SM} onChange={(e) => setEnrollmentHours(Math.max(0, Number(e.target.value)))} />
                <span style={INLINE_LABEL}>h</span>
                <input type="number" min={0} max={59} value={enrollmentMinutes} style={FIELD_SM} onChange={(e) => setEnrollmentMinutes(Math.max(0, Number(e.target.value)))} />
                <span style={INLINE_LABEL}>m</span>
              </div>
            </div>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
              {t("notificationForm.afterJoiningNote")}
            </p>
            <div style={{ background: "rgba(80,140,100,.06)", border: "1px solid rgba(80,140,100,.22)", borderRadius: "0.6rem", padding: "0.9rem 1.2rem" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {t("notificationForm.afterJoiningFutureNote")}
              </p>
            </div>
          </div>
        )}
      </StepCard>

      {/* Date — hidden for enrollment */}
      {timeType !== "enrollment" && <StepCard num="step 4" title={t("notificationForm.cardDate")}>
        <Segment
          options={[
            { value: "specific", label: t("notificationForm.specificDates") },
            { value: "every", label: t("notificationForm.everyNDays", { n: "N" }) },
            { value: "spec-week", label: t("notificationForm.weekdaysOption") },
            { value: "spec-month", label: t("notificationForm.daysOfMonth") },
          ]}
          value={dateType}
          onChange={(v) => setDateType(v as typeof dateType)}
        />

        {dateType === "specific" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {specificDates.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <input type="number" min={1} max={31} value={d.day} style={FIELD_SM}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, day: Number(e.target.value) } : x))} />
                <span style={INLINE_LABEL}>/</span>
                <input type="number" min={1} max={12} value={d.month} style={FIELD_SM}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, month: Number(e.target.value) } : x))} />
                <span style={INLINE_LABEL}>/</span>
                <input type="number" min={2020} value={d.year} style={{ ...FIELD_SM, width: "7.6rem" }}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, year: Number(e.target.value) } : x))} />
                {specificDates.length > 1 && <RemoveLink onClick={() => setSpecificDates((p) => p.filter((_, j) => j !== i))} />}
              </div>
            ))}
            <AddLink label={t("notificationForm.addDate")} onClick={() => setSpecificDates((p) => [...p, { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() }])} />
          </div>
        )}

        {dateType === "every" && (
          <div>
            <select style={{ ...SELECT, width: "auto" }} value={everyNDays} onChange={(e) => setEveryNDays(Number(e.target.value))}>
              {[1, ...Array.from({ length: 30 }, (_, i) => i + 2)].map((n) => (
                <option key={n} value={n}>{n === 1 ? t("notificationForm.everyDay") : t("notificationForm.everyNDays", { n: String(n) })}</option>
              ))}
            </select>
          </div>
        )}

        {dateType === "spec-week" && (
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {WEEKDAYS.map((d) => (
              <PillToggle key={d.value} label={d.label} active={selectedWeekDays.includes(d.value)} onClick={() => toggleWeekDay(d.value)} />
            ))}
          </div>
        )}

        {dateType === "spec-month" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.4rem" }}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <PillToggle key={d} label={String(d)} active={selectedMonthDays.includes(d)} onClick={() => toggleMonthDay(d)} />
            ))}
          </div>
        )}
      </StepCard>}

      {/* Month (only non-specific dates) */}
      {showDateSteps && (
        <StepCard num="step 5" title={t("notificationForm.cardMonth")}>
          <Segment
            options={[{ value: "every", label: t("notificationForm.anyMonth") }, { value: "specific", label: t("notificationForm.specificMonths") }]}
            value={monthType}
            onChange={(v) => setMonthType(v as "every" | "specific")}
          />
          {monthType === "specific" && (
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {MONTHS.map((m) => (
                <PillToggle key={m.value} label={m.label} active={selectedMonths.includes(m.value)} onClick={() => toggleMonth(m.value)} />
              ))}
            </div>
          )}
        </StepCard>
      )}

      {/* Start / Stop (only non-specific dates) */}
      {showDateSteps && (
        <>
          <StepCard num="step 6" title={t("notificationForm.cardStart")}>
            <DatetimeStrategyPicker
              type={startType} onTypeChange={setStartType}
              hour={startHour} onHourChange={setStartHour}
              minute={startMinute} onMinuteChange={setStartMinute}
              day={startDay} onDayChange={setStartDay}
              month={startMonth} onMonthChange={setStartMonth}
              year={startYear} onYearChange={setStartYear}
              afterDays={startAfterDays} onAfterDaysChange={setStartAfterDays}
              afterHours={startAfterHours} onAfterHoursChange={setStartAfterHours}
              afterMinutes={startAfterMinutes} onAfterMinutesChange={setStartAfterMinutes}
              event={startEvent} onEventChange={setStartEvent}
              nextDay={startNextDay} onNextDayChange={setStartNextDay}
              nextEvent={startNextEvent} onNextEventChange={setStartNextEvent}
              tFn={t}
            />
          </StepCard>

          <StepCard num="step 7" title={t("notificationForm.cardStop")}>
            <DatetimeStrategyPicker
              type={stopType} onTypeChange={setStopType}
              hour={stopHour} onHourChange={setStopHour}
              minute={stopMinute} onMinuteChange={setStopMinute}
              day={stopDay} onDayChange={setStopDay}
              month={stopMonth} onMonthChange={setStopMonth}
              year={stopYear} onYearChange={setStopYear}
              afterDays={stopAfterDays} onAfterDaysChange={setStopAfterDays}
              afterHours={stopAfterHours} onAfterHoursChange={setStopAfterHours}
              afterMinutes={stopAfterMinutes} onAfterMinutesChange={setStopAfterMinutes}
              event={stopEvent} onEventChange={setStopEvent}
              nextDay={stopNextDay} onNextDayChange={setStopNextDay}
              nextEvent={stopNextEvent} onNextEventChange={setStopNextEvent}
              tFn={t}
            />
          </StepCard>
        </>
      )}

      {/* Expiry */}
      <StepCard num="step 8" title={t("notificationForm.cardExpiry")}>
        <Segment
          options={[{ value: "no", label: t("notificationForm.doesNotExpire") }, { value: "yes", label: t("notificationForm.expiresAfter") }]}
          value={expireType}
          onChange={(v) => setExpireType(v as "no" | "yes")}
        />
        {expireType === "yes" && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <input type="number" min={0} value={expireDays} style={FIELD_SM} onChange={(e) => setExpireDays(Number(e.target.value))} />
            <span style={INLINE_LABEL}>d</span>
            <input type="number" min={0} value={expireHours} style={FIELD_SM} onChange={(e) => setExpireHours(Number(e.target.value))} />
            <span style={INLINE_LABEL}>h</span>
            <input type="number" min={0} value={expireMinutes} style={FIELD_SM} onChange={(e) => setExpireMinutes(Number(e.target.value))} />
            <span style={INLINE_LABEL}>m</span>
          </div>
        )}
      </StepCard>

      {/* Reminders */}
      <StepCard num="step 9" title={t("notificationForm.cardReminders")}>
        <Segment
          options={[{ value: "no", label: t("notificationForm.noReminders") }, { value: "yes", label: t("notificationForm.addReminders") }]}
          value={reminderType}
          onChange={(v) => setReminderType(v as "no" | "yes")}
        />
        {reminderType === "yes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.6 }}>
              {t("notificationForm.reminderHint")}
            </p>
            {reminders.map((r, i) => (
              <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>{t("notificationForm.labelTitle")}</label>
                    <input style={FIELD} type="text" value={r.title}
                      onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>{t("notificationForm.labelMessage")}</label>
                    <input style={FIELD} type="text" value={r.message}
                      onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, message: e.target.value } : x))} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={INLINE_LABEL}>{t("notificationForm.sendAfter")}</span>
                  <input type="number" min={0} value={r.days} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, days: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>d</span>
                  <input type="number" min={0} value={r.hours} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, hours: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>h</span>
                  <input type="number" min={0} value={r.minutes} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, minutes: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>m</span>
                  {reminders.length > 1 && <RemoveLink onClick={() => setReminders((p) => p.filter((_, j) => j !== i))} />}
                </div>
              </div>
            ))}
            <AddLink label={t("notificationForm.addReminder")} onClick={() => setReminders((p) => [...p, { title: "", message: "", days: 0, hours: 0, minutes: 0 }])} />
          </div>
        )}
      </StepCard>

      {/* Submit */}
      {status && (
        <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1rem 1.4rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", margin: 0 }}>{status}</p>
        </div>
      )}

      <button type="button" onClick={handleSubmit} disabled={submitting}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.3rem",
          letterSpacing: ".06em",
          padding: "1.3rem 2.8rem",
          borderRadius: "9999px",
          border: "none",
          background: submitting ? "var(--ink-20)" : "var(--coral)",
          color: submitting ? "var(--ink-60)" : "#fff",
          cursor: submitting ? "not-allowed" : "pointer",
          transition: "background .15s",
          alignSelf: "flex-start",
        }}
        className={submitting ? "" : "hover:opacity-90 transition-opacity"}>
        {submitting ? t("notificationForm.submitting") : (initial ? "Save changes" : t("notificationForm.submit"))}
      </button>
    </div>
  );
}
