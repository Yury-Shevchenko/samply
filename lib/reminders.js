"use strict";

/**
 * Turns a schedule's stored reminder configs into the fields the sender needs.
 *
 * The schedule form lets a researcher switch reminders on and leave a
 * reminder's title or message blank (it even starts with one blank reminder).
 * PendingNotification requires both, so insertMany threw a ValidationError and
 * the cron marked the *original* ping "failed" before it reached Expo. Every
 * ping of that schedule, and every setup-check test ping (which reuses
 * notifications[0]'s config id), failed with nothing useful on screen.
 *
 * A blank reminder text now falls back to the original ping's text, and a
 * reminder without a usable delay is dropped rather than written with an
 * Invalid Date. Existing schedules saved with blank reminders keep working
 * without the researcher re-saving them.
 */
function resolveReminders(reminders, parent) {
  if (!Array.isArray(reminders)) return [];
  const text = (v) => (typeof v === "string" ? v.trim() : "");
  return reminders
    .filter((r) => r && Number.isFinite(Number(r.time)) && Number(r.time) >= 0)
    .map((r) => ({
      title: text(r.title) || text(parent.title) || "Reminder",
      message: text(r.message) || text(parent.message) || "Reminder",
      time: Number(r.time),
    }));
}

module.exports = { resolveReminders };
