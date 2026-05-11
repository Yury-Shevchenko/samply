"use client";

import { useState } from "react";

interface Participant { id: string; username?: string }
interface Group { id: string; name?: string }

interface Timepoint { hour: number; minute: number }
interface TimeWindow { hourStart: number; minuteStart: number; hourEnd: number; minuteEnd: number; distance: number; number: number }
interface SpecificDate { day: number; month: number; year: number }
interface Reminder { title: string; message: string; days: number; hours: number; minutes: number }

interface Props {
  projectId: string;
  participants: Participant[];
  groups: Group[];
}

const TIMEZONES = Intl.supportedValuesOf("timeZone");
const WEEKDAYS = [
  { value: "MON", label: "Mon" }, { value: "TUE", label: "Tue" }, { value: "WED", label: "Wed" },
  { value: "THU", label: "Thu" }, { value: "FRI", label: "Fri" }, { value: "SAT", label: "Sat" },
  { value: "SUN", label: "Sun" },
];
const MONTHS = [
  { value: "JAN", label: "Jan" }, { value: "FEB", label: "Feb" }, { value: "MAR", label: "Mar" },
  { value: "APR", label: "Apr" }, { value: "MAY", label: "May" }, { value: "JUN", label: "Jun" },
  { value: "JUL", label: "Jul" }, { value: "AUG", label: "Aug" }, { value: "SEP", label: "Sep" },
  { value: "OCT", label: "Oct" }, { value: "NOV", label: "Nov" }, { value: "DEC", label: "Dec" },
];

const now = new Date();

function getRandomSec() { return Math.floor(Math.random() * 60); }

export default function NotificationForm({ projectId, participants, groups }: Props) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("https://");

  // Timezone
  const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [useParticipantTimezone, setUseParticipantTimezone] = useState(false);

  // Step 1: Participants
  const [includeCurrent, setIncludeCurrent] = useState(false);
  const [includeFuture, setIncludeFuture] = useState(false);
  const [includeGroups, setIncludeGroups] = useState(false);
  const [allCurrentParticipants, setAllCurrentParticipants] = useState(true);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [allCurrentGroups, setAllCurrentGroups] = useState(true);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Step 2: Time
  const [timeType, setTimeType] = useState<"specific" | "interval" | "repeat">("specific");
  const [timepoints, setTimepoints] = useState<Timepoint[]>([{ hour: 12, minute: 0 }]);
  const [timeWindows, setTimeWindows] = useState<TimeWindow[]>([{ hourStart: 9, minuteStart: 0, hourEnd: 17, minuteEnd: 0, distance: 0, number: 1 }]);
  const [repeatEvery, setRepeatEvery] = useState(30);

  // Step 3: Date
  const [dateType, setDateType] = useState<"specific" | "every" | "spec-week" | "spec-month">("specific");
  const [specificDates, setSpecificDates] = useState<SpecificDate[]>([{ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() }]);
  const [everyNDays, setEveryNDays] = useState(1);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>([]);

  // Step 4: Month
  const [monthType, setMonthType] = useState<"every" | "specific">("every");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  // Step 5: Start
  const [startType, setStartType] = useState<"specific" | "event" | "next">("specific");
  const [startHour, setStartHour] = useState(now.getHours());
  const [startMinute, setStartMinute] = useState(now.getMinutes());
  const [startDay, setStartDay] = useState(now.getDate());
  const [startMonth, setStartMonth] = useState(now.getMonth() + 1);
  const [startYear, setStartYear] = useState(now.getFullYear());
  const [startAfterDays, setStartAfterDays] = useState(0);
  const [startAfterHours, setStartAfterHours] = useState(0);
  const [startAfterMinutes, setStartAfterMinutes] = useState(0);
  const [startEvent, setStartEvent] = useState<"registration" | "now">("registration");
  const [startNextDay, setStartNextDay] = useState(1);
  const [startNextEvent, setStartNextEvent] = useState<"registration" | "now">("registration");

  // Step 6: Stop
  const [stopType, setStopType] = useState<"specific" | "event" | "next">("specific");
  const [stopHour, setStopHour] = useState(now.getHours());
  const [stopMinute, setStopMinute] = useState(now.getMinutes());
  const [stopDay, setStopDay] = useState(now.getDate());
  const [stopMonth, setStopMonth] = useState(now.getMonth() + 1);
  const [stopYear, setStopYear] = useState(now.getFullYear());
  const [stopAfterDays, setStopAfterDays] = useState(0);
  const [stopAfterHours, setStopAfterHours] = useState(0);
  const [stopAfterMinutes, setStopAfterMinutes] = useState(0);
  const [stopEvent, setStopEvent] = useState<"registration" | "now">("registration");
  const [stopNextDay, setStopNextDay] = useState(1);
  const [stopNextEvent, setStopNextEvent] = useState<"registration" | "now">("registration");

  // Step 7: Expire
  const [expireType, setExpireType] = useState<"no" | "yes">("no");
  const [expireDays, setExpireDays] = useState(0);
  const [expireHours, setExpireHours] = useState(0);
  const [expireMinutes, setExpireMinutes] = useState(0);

  // Step 8: Reminders
  const [reminderType, setReminderType] = useState<"no" | "yes">("no");
  const [reminders, setReminders] = useState<Reminder[]>([{ title: "", message: "", days: 0, hours: 0, minutes: 0 }]);

  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleParticipant(id: string) {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    setAllCurrentParticipants(false);
  }

  function toggleGroup(id: string) {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
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

  function buildStartingStrategy() {
    if (startType === "specific") {
      return {
        start: "specific",
        startMoment: buildTzIso(startYear, startMonth - 1, startDay, startHour, startMinute),
        startAfter: "", startEvent: "", startNextDay: "",
      };
    }
    if (startType === "event") {
      const startMoment = startEvent === "now"
        ? addDuration(new Date(), { days: startAfterDays, hours: startAfterHours, minutes: startAfterMinutes }).toISOString()
        : "";
      return {
        start: "event",
        startMoment,
        startAfter: { days: startAfterDays, hours: startAfterHours, minutes: startAfterMinutes },
        startEvent,
        startNextDay: "",
      };
    }
    // next
    const startMoment = startNextEvent === "now"
      ? (startNextDay == 1
          ? addDuration(new Date(), { minutes: 1 }).toISOString()
          : new Date(new Date().setHours(0, 0, 0, 0) + (startNextDay - 1) * 86400000 + Math.floor(Math.random() * 10) * 60000).toISOString())
      : "";
    return { start: "next", startMoment, startAfter: "", startEvent: startNextEvent, startNextDay };
  }

  function buildStoppingStrategy() {
    if (stopType === "specific") {
      return {
        stop: "specific",
        stopMoment: buildTzIso(stopYear, stopMonth - 1, stopDay, stopHour, stopMinute),
        stopAfter: "", stopEvent: "", stopNextDay: "",
      };
    }
    if (stopType === "event") {
      const stopMoment = stopEvent === "now"
        ? addDuration(new Date(), { days: stopAfterDays, hours: stopAfterHours, minutes: stopAfterMinutes }).toISOString()
        : "";
      return { stop: "event", stopMoment, stopAfter: { days: stopAfterDays, hours: stopAfterHours, minutes: stopAfterMinutes }, stopEvent, stopNextDay: "" };
    }
    const stopMoment = stopNextEvent === "now"
      ? (stopNextDay == 1
          ? addDuration(new Date(), { minutes: 1 }).toISOString()
          : new Date(new Date().setHours(0, 0, 0, 0) + (stopNextDay - 1) * 86400000 + Math.floor(Math.random() * 10) * 60000).toISOString())
      : "";
    return { stop: "next", stopMoment, stopAfter: "", stopEvent: stopNextEvent, stopNextDay };
  }

  function buildTzIso(year: number, month: number, day: number, hour: number, minute: number): string {
    // Build ISO date at specified wall-clock time in the selected timezone.
    // We use Intl to find the UTC offset, then construct the ISO string.
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: timezone, timeZoneName: "shortOffset" });
    const candidate = new Date(Date.UTC(year, month, day, hour, minute));
    // Find the offset for this candidate time
    const parts = fmt.formatToParts(candidate);
    const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "UTC+0";
    const match = offsetPart.match(/([+-])(\d+)(?::(\d+))?/);
    let offsetMs = 0;
    if (match) {
      const sign = match[1] === "+" ? 1 : -1;
      offsetMs = sign * (parseInt(match[2]) * 60 + (parseInt(match[3] ?? "0"))) * 60000;
    }
    return new Date(candidate.getTime() - offsetMs).toISOString();
  }

  function addDuration(base: Date, d: { days?: number; hours?: number; minutes?: number }): Date {
    const ms = ((d.days ?? 0) * 86400 + (d.hours ?? 0) * 3600 + (d.minutes ?? 0) * 60) * 1000;
    return new Date(base.getTime() + ms);
  }

  function buildDayMonthCron(dayStart: number): string {
    if (dateType === "every") {
      if (everyNDays === 1) return "*";
      return `${dayStart}/${everyNDays}`;
    }
    if (dateType === "spec-week") return "*";
    if (dateType === "spec-month") return selectedMonthDays.join(",") || "*";
    return "*";
  }

  function buildDayWeekCron(): string {
    if (dateType === "spec-week") return selectedWeekDays.join(",") || "*";
    return "*";
  }

  function buildMonthCron(): string {
    if (monthType === "every") return "*";
    return selectedMonths.join(",") || "*";
  }

  function buildCronSchedules(dayStart: number): string[] {
    const dayMonthCron = buildDayMonthCron(dayStart);
    const dayWeekCron = buildDayWeekCron();
    const monthCron = buildMonthCron();
    return timepoints.map((tp) => {
      const sec = getRandomSec();
      return `${sec} ${tp.minute} ${tp.hour} ${dayMonthCron} ${monthCron} ${dayWeekCron}`;
    });
  }

  function buildCronIntervals(dayStart: number): Array<{ from: string; to: string; number: number; distance: number }> {
    const dayMonthCron = buildDayMonthCron(dayStart);
    const dayWeekCron = buildDayWeekCron();
    const monthCron = buildMonthCron();
    return timeWindows.map((w) => ({
      from: `${getRandomSec()} ${w.minuteStart} ${w.hourStart} ${dayMonthCron} ${monthCron} ${dayWeekCron}`,
      to: `${getRandomSec()} ${w.minuteEnd} ${w.hourEnd} ${dayMonthCron} ${monthCron} ${dayWeekCron}`,
      number: w.number,
      distance: w.distance,
    }));
  }

  async function handleSubmit() {
    if (!title.trim()) { alert("Enter a title"); return; }
    if (!message.trim()) { alert("Enter a message"); return; }

    // Validate recipients
    const hasParticipants = includeCurrent || includeFuture;
    const hasGroups = includeGroups;
    if (!hasParticipants && !hasGroups) { alert("Choose participants"); return; }

    let participantsList: string[] | null = null;
    if (includeCurrent) {
      if (allCurrentParticipants) {
        participantsList = [];
      } else {
        if (!selectedParticipants.length) { alert("Choose specific participants or select all"); return; }
        participantsList = selectedParticipants;
      }
    }

    let groupsList: string[] | null = null;
    if (includeGroups) {
      if (allCurrentGroups) {
        groupsList = [];
      } else {
        if (!selectedGroups.length) { alert("Choose specific groups or select all"); return; }
        groupsList = selectedGroups;
      }
    }

    const expireIn = expireType === "yes"
      ? ((expireDays * 24 * 60 + expireHours * 60 + expireMinutes) * 60000)
      : null;

    const reminderList = reminderType === "yes"
      ? reminders.map((r) => ({
          title: r.title,
          message: r.message,
          time: ((r.days * 24 * 60 + r.hours * 60 + r.minutes) * 60000),
        }))
      : [];

    const commonFields = {
      projectId, title, message, url: url.trim(),
      timezone, useParticipantTimezone, expireIn,
      reminders: reminderList,
      scheduleInFuture: includeFuture,
      participants: participantsList,
      groups: groupsList,
    };

    setSubmitting(true);
    setStatus(null);

    try {
      let endpoint = "";
      let payload: Record<string, unknown> = {};

      if (timeType === "specific" && dateType === "specific") {
        // One-time fixed dates
        endpoint = "/createschedulenotification";
        payload = { ...commonFields, timepoints, dates: specificDates };

      } else if (timeType === "repeat") {
        if (dateType === "specific") {
          alert("Repeat every minute(s) with specific dates is not supported. Choose a date pattern instead.");
          setSubmitting(false);
          return;
        }
        const startingStrategy = buildStartingStrategy();
        const stoppingStrategy = buildStoppingStrategy();
        const dayStart = new Date(startingStrategy.startMoment || Date.now()).getDate();

        const isRegistrationBased =
          startingStrategy.startEvent === "registration" || stoppingStrategy.stopEvent === "registration";

        const crons = [`${getRandomSec()} */${repeatEvery} * ${buildDayMonthCron(dayStart)} ${buildMonthCron()} ${buildDayWeekCron()}`];

        if (isRegistrationBased) {
          endpoint = "/createindividualnotification";
        } else {
          endpoint = "/createintervalnotification";
        }
        payload = { ...commonFields, interval: crons, int_start: startingStrategy, int_end: stoppingStrategy, randomize: false, participantId: participantsList };

      } else if (timeType === "interval" && dateType === "specific") {
        // Random fixed dates
        const fixedIntervals = timeWindows.map((w) =>
          specificDates.map((d) => ({
            from: buildTzIso(d.year, d.month - 1, d.day, w.hourStart, w.minuteStart),
            to: buildTzIso(d.year, d.month - 1, d.day, w.hourEnd, w.minuteEnd),
            number: w.number,
            distance: w.distance,
          }))
        ).flat();
        endpoint = "/createfixedindividualnotification";
        payload = { ...commonFields, intervals: fixedIntervals, participantId: participantsList };

      } else {
        // Cron-based (specific or interval time, non-specific date)
        const startingStrategy = buildStartingStrategy();
        const stoppingStrategy = buildStoppingStrategy();
        const dayStart = new Date(startingStrategy.startMoment || Date.now()).getDate();

        const isRegistrationBased =
          startingStrategy.startEvent === "registration" || stoppingStrategy.stopEvent === "registration";

        if (timeType === "specific") {
          const crons = buildCronSchedules(dayStart);
          if (isRegistrationBased) {
            endpoint = "/createindividualnotification";
            payload = { ...commonFields, interval: crons, int_start: startingStrategy, int_end: stoppingStrategy, participantId: participantsList };
          } else {
            endpoint = "/createintervalnotification";
            payload = { ...commonFields, interval: crons, int_start: startingStrategy, int_end: stoppingStrategy, randomize: false, participantId: participantsList };
          }
        } else {
          // interval time, non-specific date → random interval
          const cronWindows = buildCronIntervals(dayStart);
          endpoint = "/createintervalnotification";
          payload = { ...commonFields, randomize: true, intervalWindows: cronWindows, int_start: startingStrategy, int_end: stoppingStrategy, participantId: participantsList };
        }
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json() as { warning?: string; redirect?: string; error?: string };
      if (!res.ok) {
        setStatus(`Error: ${data.error ?? "Request failed"}`);
        return;
      }
      if (data.warning) {
        alert(data.warning);
      }
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      setStatus(`Error: ${String(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  const showDateSteps = dateType !== "specific";

  return (
    <div className="notifications_scheduler">
      {/* Title / Message / URL */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Notification content</h2>
        <div style={{ marginBottom: "0.5rem" }}>
          <label><strong>Title</strong></label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label><strong>Message</strong></label><br />
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <label><strong>Web link (optional)</strong></label><br />
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>

      {/* Timezone */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 0: Timezone</h2>
        <label>
          <input type="checkbox" checked={useParticipantTimezone} onChange={(e) => setUseParticipantTimezone(e.target.checked)} />
          {" "}Adjust for each participant&apos;s timezone
        </label>
        <br /><br />
        <label><strong>Timezone: </strong></label>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ marginLeft: "0.5rem" }}>
          {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>

      {/* Step 1: Participants */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 1: Recipients</h2>
        <div className="multipleOptions">
          <label>
            <input type="checkbox" checked={includeFuture} onChange={(e) => setIncludeFuture(e.target.checked)} />
            {" "}Include future participants
          </label>
          <br />
          <label>
            <input type="checkbox" checked={includeCurrent} onChange={(e) => setIncludeCurrent(e.target.checked)} />
            {" "}Current participants
          </label>
          {includeCurrent && (
            <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
              <label>
                <input type="checkbox" checked={allCurrentParticipants} onChange={(e) => {
                  setAllCurrentParticipants(e.target.checked);
                  if (e.target.checked) setSelectedParticipants([]);
                }} />
                {" "}All current participants
              </label>
              {participants.map((p) => (
                <div key={p.id}>
                  <label>
                    <input type="checkbox" checked={selectedParticipants.includes(p.id)}
                      onChange={() => toggleParticipant(p.id)} />
                    {" "}{p.username ? `${p.username} (${p.id})` : p.id}
                  </label>
                </div>
              ))}
            </div>
          )}
          <br />
          {groups.length > 0 && (
            <>
              <label>
                <input type="checkbox" checked={includeGroups} onChange={(e) => setIncludeGroups(e.target.checked)} />
                {" "}Groups
              </label>
              {includeGroups && (
                <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                  <label>
                    <input type="checkbox" checked={allCurrentGroups} onChange={(e) => {
                      setAllCurrentGroups(e.target.checked);
                      if (e.target.checked) setSelectedGroups([]);
                    }} />
                    {" "}All groups
                  </label>
                  {groups.map((g) => (
                    <div key={g.id}>
                      <label>
                        <input type="checkbox" checked={selectedGroups.includes(g.id)} onChange={() => toggleGroup(g.id)} />
                        {" "}{g.name ?? g.id}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Step 2: Time */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 2: Time</h2>
        <div className="options">
          {(["specific", "interval", "repeat"] as const).map((t) => (
            <label key={t} style={{ marginRight: "1rem" }}>
              <input type="radio" checked={timeType === t} onChange={() => setTimeType(t)} />
              {" "}{t === "specific" ? "Specific timepoints" : t === "interval" ? "Random within window" : "Repeat every N minutes"}
            </label>
          ))}
        </div>

        {timeType === "specific" && (
          <div style={{ marginTop: "0.5rem" }}>
            {timepoints.map((tp, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem", alignItems: "center" }}>
                <label>Hour:</label>
                <input type="number" min={0} max={23} value={tp.hour} style={{ width: "6rem" }}
                  onChange={(e) => setTimepoints((prev) => prev.map((x, j) => j === i ? { ...x, hour: Number(e.target.value) } : x))} />
                <label>Minute:</label>
                <input type="number" min={0} max={59} value={tp.minute} style={{ width: "6rem" }}
                  onChange={(e) => setTimepoints((prev) => prev.map((x, j) => j === i ? { ...x, minute: Number(e.target.value) } : x))} />
                {timepoints.length > 1 && (
                  <button type="button" onClick={() => setTimepoints((prev) => prev.filter((_, j) => j !== i))}>✕</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setTimepoints((prev) => [...prev, { hour: 12, minute: 0 }])}>
              + Add timepoint
            </button>
          </div>
        )}

        {timeType === "interval" && (
          <div style={{ marginTop: "0.5rem" }}>
            {timeWindows.map((w, i) => (
              <div key={i} style={{ marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ccc" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <label>From</label>
                  <input type="number" min={0} max={23} value={w.hourStart} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, hourStart: Number(e.target.value) } : x))} />
                  <span>h</span>
                  <input type="number" min={0} max={59} value={w.minuteStart} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, minuteStart: Number(e.target.value) } : x))} />
                  <span>m  →  To</span>
                  <input type="number" min={0} max={23} value={w.hourEnd} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, hourEnd: Number(e.target.value) } : x))} />
                  <span>h</span>
                  <input type="number" min={0} max={59} value={w.minuteEnd} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, minuteEnd: Number(e.target.value) } : x))} />
                  <span>m</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem", alignItems: "center" }}>
                  <label># notifications:</label>
                  <input type="number" min={1} value={w.number} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, number: Number(e.target.value) } : x))} />
                  <label>Min. distance (min):</label>
                  <input type="number" min={0} value={Math.round(w.distance / 60000)} style={{ width: "5.5rem" }}
                    onChange={(e) => setTimeWindows((p) => p.map((x, j) => j === i ? { ...x, distance: Number(e.target.value) * 60000 } : x))} />
                  {timeWindows.length > 1 && (
                    <button type="button" onClick={() => setTimeWindows((p) => p.filter((_, j) => j !== i))}>✕</button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setTimeWindows((p) => [...p, { hourStart: 9, minuteStart: 0, hourEnd: 17, minuteEnd: 0, distance: 0, number: 1 }])}>
              + Add window
            </button>
          </div>
        )}

        {timeType === "repeat" && (
          <div style={{ marginTop: "0.5rem" }}>
            <label>Repeat every </label>
            <select value={repeatEvery} onChange={(e) => setRepeatEvery(Number(e.target.value))}>
              {[1, 2, 5, 10, 15, 30].map((n) => <option key={n} value={n}>{n} minute{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Step 3: Date */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 3: Date</h2>
        <div className="options">
          {(["specific", "every", "spec-week", "spec-month"] as const).map((d) => (
            <label key={d} style={{ marginRight: "1rem" }}>
              <input type="radio" checked={dateType === d} onChange={() => setDateType(d)} />
              {" "}{d === "specific" ? "Specific dates" : d === "every" ? "Every N days" : d === "spec-week" ? "Weekdays" : "Days of month"}
            </label>
          ))}
        </div>

        {dateType === "specific" && (
          <div style={{ marginTop: "0.5rem" }}>
            {specificDates.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem", alignItems: "center" }}>
                <label>Day:</label>
                <input type="number" min={1} max={31} value={d.day} style={{ width: "5.5rem" }}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, day: Number(e.target.value) } : x))} />
                <label>Month:</label>
                <input type="number" min={1} max={12} value={d.month} style={{ width: "5.5rem" }}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, month: Number(e.target.value) } : x))} />
                <label>Year:</label>
                <input type="number" min={2020} value={d.year} style={{ width: "7.5rem" }}
                  onChange={(e) => setSpecificDates((p) => p.map((x, j) => j === i ? { ...x, year: Number(e.target.value) } : x))} />
                {specificDates.length > 1 && (
                  <button type="button" onClick={() => setSpecificDates((p) => p.filter((_, j) => j !== i))}>✕</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setSpecificDates((p) => [...p, { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() }])}>
              + Add date
            </button>
          </div>
        )}

        {dateType === "every" && (
          <div style={{ marginTop: "0.5rem" }}>
            <label>Every </label>
            <select value={everyNDays} onChange={(e) => setEveryNDays(Number(e.target.value))}>
              {[1, ...Array.from({ length: 30 }, (_, i) => i + 2)].map((n) => (
                <option key={n} value={n}>{n === 1 ? "day" : `${n} days`}</option>
              ))}
            </select>
          </div>
        )}

        {dateType === "spec-week" && (
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {WEEKDAYS.map((d) => (
              <label key={d.value}>
                <input type="checkbox" checked={selectedWeekDays.includes(d.value)} onChange={() => toggleWeekDay(d.value)} />
                {" "}{d.label}
              </label>
            ))}
          </div>
        )}

        {dateType === "spec-month" && (
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <label key={d} style={{ minWidth: 32 }}>
                <input type="checkbox" checked={selectedMonthDays.includes(d)} onChange={() => toggleMonthDay(d)} />
                {" "}{d}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Step 4: Month (only for non-specific dates) */}
      {showDateSteps && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <h2>Step 4: Month</h2>
          <label><input type="radio" checked={monthType === "every"} onChange={() => setMonthType("every")} /> Any month</label>
          {" "}
          <label><input type="radio" checked={monthType === "specific"} onChange={() => setMonthType("specific")} /> Specific months</label>
          {monthType === "specific" && (
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {MONTHS.map((m) => (
                <label key={m.value}>
                  <input type="checkbox" checked={selectedMonths.includes(m.value)} onChange={() => toggleMonth(m.value)} />
                  {" "}{m.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Steps 5 & 6: Start / Stop (only for non-specific dates) */}
      {showDateSteps && (
        <>
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Step 5: Start</h2>
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
              mode="start"
            />
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Step 6: Stop</h2>
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
              mode="stop"
            />
          </div>
        </>
      )}

      {/* Step 7: Expiry */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 7: Link expiry</h2>
        <label><input type="radio" checked={expireType === "no"} onChange={() => setExpireType("no")} /> Does not expire</label>
        {" "}
        <label><input type="radio" checked={expireType === "yes"} onChange={() => setExpireType("yes")} /> Expires after</label>
        {expireType === "yes" && (
          <span style={{ marginLeft: "0.5rem" }}>
            <input type="number" min={0} value={expireDays} style={{ width: "5.5rem" }} onChange={(e) => setExpireDays(Number(e.target.value))} /> days{" "}
            <input type="number" min={0} value={expireHours} style={{ width: "5.5rem" }} onChange={(e) => setExpireHours(Number(e.target.value))} /> hours{" "}
            <input type="number" min={0} value={expireMinutes} style={{ width: "5.5rem" }} onChange={(e) => setExpireMinutes(Number(e.target.value))} /> minutes
          </span>
        )}
      </div>

      {/* Step 8: Reminders */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Step 8: Reminders</h2>
        <label><input type="radio" checked={reminderType === "no"} onChange={() => setReminderType("no")} /> No reminders</label>
        {" "}
        <label><input type="radio" checked={reminderType === "yes"} onChange={() => setReminderType("yes")} /> Add reminders</label>
        {reminderType === "yes" && (
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ fontSize: "0.875rem" }}>Reminders are sent after the specified time if the participant has not completed the survey.</p>
            {reminders.map((r, i) => (
              <div key={i} style={{ marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ccc" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <label>Title:</label>
                  <input type="text" value={r.title} style={{ flex: 1 }}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                  <label>Message:</label>
                  <input type="text" value={r.message} style={{ flex: 1 }}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, message: e.target.value } : x))} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem", alignItems: "center" }}>
                  <label>Send after:</label>
                  <input type="number" min={0} value={r.days} style={{ width: "5.5rem" }}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, days: Number(e.target.value) } : x))} /> d
                  <input type="number" min={0} value={r.hours} style={{ width: "5.5rem" }}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, hours: Number(e.target.value) } : x))} /> h
                  <input type="number" min={0} value={r.minutes} style={{ width: "5.5rem" }}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, minutes: Number(e.target.value) } : x))} /> m
                  {reminders.length > 1 && <button type="button" onClick={() => setReminders((p) => p.filter((_, j) => j !== i))}>✕</button>}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setReminders((p) => [...p, { title: "", message: "", days: 0, hours: 0, minutes: 0 }])}>
              + Add reminder
            </button>
          </div>
        )}
      </div>

      {status && <p style={{ color: "red" }}>{status}</p>}

      <button className="button" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Scheduling…" : "Schedule notifications"}
      </button>
    </div>
  );
}

// Sub-component for start/stop strategy picker
function DatetimeStrategyPicker({
  type, onTypeChange,
  hour, onHourChange, minute, onMinuteChange,
  day, onDayChange, month, onMonthChange, year, onYearChange,
  afterDays, onAfterDaysChange, afterHours, onAfterHoursChange, afterMinutes, onAfterMinutesChange,
  event, onEventChange,
  nextDay, onNextDayChange, nextEvent, onNextEventChange,
  mode,
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
  mode: "start" | "stop";
}) {
  return (
    <div className="options">
      <div style={{ marginBottom: "0.5rem" }}>
        <label><input type="radio" checked={type === "specific"} onChange={() => onTypeChange("specific")} />
          {" "}Specific date/time:{" "}
          {type === "specific" && (
            <span>
              <input type="number" min={0} max={23} value={hour} style={{ width: "5.5rem" }} onChange={(e) => onHourChange(Number(e.target.value))} />h{" "}
              <input type="number" min={0} max={59} value={minute} style={{ width: "5.5rem" }} onChange={(e) => onMinuteChange(Number(e.target.value))} />m{" "}
              <input type="number" min={1} max={31} value={day} style={{ width: "5.5rem" }} onChange={(e) => onDayChange(Number(e.target.value))} />d{" "}
              <input type="number" min={1} max={12} value={month} style={{ width: "5.5rem" }} onChange={(e) => onMonthChange(Number(e.target.value))} />mo{" "}
              <input type="number" min={2020} value={year} style={{ width: "7rem" }} onChange={(e) => onYearChange(Number(e.target.value))} />yr
            </span>
          )}
        </label>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label><input type="radio" checked={type === "event"} onChange={() => onTypeChange("event")} />
          {" "}{mode === "start" ? "After" : "After"}{" "}
          {type === "event" && (
            <span>
              <input type="number" min={0} value={afterDays} style={{ width: "5.5rem" }} onChange={(e) => onAfterDaysChange(Number(e.target.value))} />d{" "}
              <input type="number" min={0} value={afterHours} style={{ width: "5.5rem" }} onChange={(e) => onAfterHoursChange(Number(e.target.value))} />h{" "}
              <input type="number" min={0} value={afterMinutes} style={{ width: "5.5rem" }} onChange={(e) => onAfterMinutesChange(Number(e.target.value))} />m{" "}
              from{" "}
              <select value={event} onChange={(e) => onEventChange(e.target.value as "registration" | "now")}>
                <option value="registration">registration</option>
                <option value="now">now</option>
              </select>
            </span>
          )}
        </label>
      </div>
      <div>
        <label><input type="radio" checked={type === "next"} onChange={() => onTypeChange("next")} />
          {" "}Day{" "}
          {type === "next" && (
            <span>
              <input type="number" min={1} max={10000} value={nextDay} style={{ width: "6rem" }} onChange={(e) => onNextDayChange(Number(e.target.value))} />{" "}
              after{" "}
              <select value={nextEvent} onChange={(e) => onNextEventChange(e.target.value as "registration" | "now")}>
                <option value="registration">registration</option>
                <option value="now">now</option>
              </select>
            </span>
          )}
        </label>
      </div>
    </div>
  );
}
