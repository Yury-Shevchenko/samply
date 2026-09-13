#!/usr/bin/env node
/**
 * One-off repair for "every N days" schedules whose queue was built with the
 * month-bounded expansion.
 *
 * "Every N days" (N >= 2) is stored as a cron day-of-month "*\/N". Expanding
 * that as a cron resets the cadence every month, so affected participants got
 * the right dates in their first month and afterwards as little as one send a
 * month. The dashboard create routes were fixed on 2026-07-23; joinStudy
 * (participants who join after a schedule was created) and the researcher API
 * on 2026-09-11. Queues built before those fixes are still wrong.
 *
 * For every such schedule and every active participant with a personal queue,
 * this recomputes the participant's dates with expandScheduleBetween (what the
 * create routes use) and reconciles FUTURE pending entries: entries on the
 * right dates are kept, wrong or duplicate ones cancelled, missing ones added.
 * Sent entries, reminders and entries shared by a group are never touched, and
 * a date a researcher cancelled is not re-added.
 *
 * A participant is skipped, and listed, rather than guessed at when:
 *   - their first-month entries are off the recomputed cadence (the start date
 *     is not what we think, e.g. they left and re-joined)
 *   - all their future entries were cancelled (stopped by the researcher)
 *   - their window is over but entries are still queued
 *
 * Usage, from Website/ on the production server:
 *   node scripts/repair-every-n-days.js                        # dry run, all studies
 *   node scripts/repair-every-n-days.js --project=<id>[,<id>]  # dry run, some studies
 *   node scripts/repair-every-n-days.js --verbose              # ... listing the dates
 *   node scripts/repair-every-n-days.js --apply                # write, logging to a file
 *   node scripts/repair-every-n-days.js --revert=<log> --apply # undo a run
 *   --uri=mongodb://...                                        # override the database
 */

const path = require("path");
const fs = require("fs");

// Mirror the server's env precedence: nextapp/.env.production is loaded first
// and wins (editing variables.env alone is a silent no-op in production).
const ENV_CANDIDATES = [
  path.join(__dirname, "../nextapp/.env.production"),
  path.join(__dirname, "../nextapp/.env.local"),
  path.join(__dirname, "../variables.env"),
];
let envSource = "process environment";
for (const file of ENV_CANDIDATES) {
  if (!fs.existsSync(file)) continue;
  const before = process.env.DATABASE;
  require("dotenv").config({ path: file });
  if (!before && process.env.DATABASE) {
    envSource = path.relative(path.join(__dirname, ".."), file);
    break;
  }
}

const mongoose = require("mongoose");
const momentTz = require("moment-timezone");
const PendingNotification = require("../models/PendingNotification");
const { expandScheduleBetween } = require("../services/scheduleExpand");

const argv = process.argv.slice(2);
const arg = (name) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};
const APPLY = argv.includes("--apply");
const VERBOSE = argv.includes("--verbose");

// Leave anything due in the next few minutes alone — the send loop polls every minute.
const SAFETY_MS = 5 * 60 * 1000;
// Statuses showing the participant really was scheduled on this schedule.
const LIVE = new Set(["pending", "processing", "sent", "failed"]);

const dayKey = (ts, tz) => momentTz.tz(ts, tz).format("YYYY-MM-DD");
const minuteKey = (ts) => Math.floor(new Date(ts).getTime() / 60000);

// N when expandScheduleBetween treats the cron as "every N days" (N >= 2, fixed
// time of day, no weekday filter) — 0 for any other shape.
function stepDays(cronExpr) {
  const p = String(cronExpr || "").trim().split(/\s+/);
  const m = p.length === 6 ? /^\*\/(\d+)$/.exec(p[3]) : null;
  const fixedTime = p.slice(0, 3).every((x) => /^\d+$/.test(x));
  const n = m ? parseInt(m[1], 10) : 0;
  return n >= 2 && fixedTime && p[5] === "*" ? n : 0;
}

// The participant's window, resolved like the create routes do but without
// their random start/stop jitter (see `ambiguous` in planPair).
function windowFor(cfg, created, tz) {
  const joined = created ? momentTz(created) : null;
  let start = cfg.int_start ? momentTz(cfg.int_start) : null;
  let stop = cfg.int_end ? momentTz(cfg.int_end) : null;
  if (cfg.start_event === "registration") {
    if (!joined) return null;
    const n = parseInt(cfg.start_next, 10);
    if (n > 1) start = joined.clone().tz(tz).add(n - 1, "days").startOf("day");
    else if (!n && cfg.start_after) start = joined.clone().add(momentTz.duration(cfg.start_after));
    else start = joined.clone().add(1, "minute");
  }
  if (cfg.stop_event === "registration") {
    if (!joined) return null;
    const n = parseInt(cfg.stop_next, 10);
    if (n) stop = joined.clone().tz(tz).add(n, "days").startOf("day");
    else if (cfg.stop_after) stop = joined.clone().add(momentTz.duration(cfg.stop_after));
  }
  if (!start || !stop || !start.isValid() || !stop.isValid()) return null;
  return { start: start.toDate(), stop: stop.toDate() };
}

/**
 * Decide what to do for one participant on one schedule.
 * entries: the schedule's config entries (one per time of day), sharing an id
 * user:    the participant's mobileUsers entry
 * docs:    the participant's own non-reminder queue entries for the schedule
 */
function planPair(entries, user, docs, now = new Date()) {
  const cfg = entries[0];
  const live = docs.filter((d) => LIVE.has(d.status));
  if (!live.length) return { action: "none" };
  const latest = live.reduce((a, b) => (new Date(b.created || 0) > new Date(a.created || 0) ? b : a));
  const tz = latest.timezone || cfg.timezone || "UTC";
  const win = windowFor(cfg, user.created, tz);
  if (!win) return { action: "skip", reason: "no start/stop date", tz };

  const expected = [...new Set(entries.flatMap((e) => expandScheduleBetween(e.interval, win.start, win.stop, tz)))];
  const expectedKeys = new Set(expected.map(minuteKey));

  // start_next / stop_next boundaries got up to 10 min of random jitter when
  // first scheduled, so a send in the first minutes of that day may or may not
  // have fallen inside the window. Leave those alone.
  const jitterDays = new Set();
  if (cfg.start_event === "registration" && parseInt(cfg.start_next, 10) > 1) jitterDays.add(dayKey(win.start, tz));
  if (cfg.stop_event === "registration" && parseInt(cfg.stop_next, 10)) jitterDays.add(dayKey(win.stop, tz));
  const ambiguous = (ts) => {
    const m = momentTz.tz(ts, tz);
    return m.hours() === 0 && m.minutes() <= 10 && jitterDays.has(m.format("YYYY-MM-DD"));
  };

  // The month-bounded expansion agrees with the correct one inside the first
  // month, so first-month entries off the cadence mean the anchor is not what
  // we think.
  const firstMonthEnd = momentTz.tz(win.start, tz).endOf("month").toDate();
  const offCadence = live.some((d) =>
    d.scheduledFor >= win.start && d.scheduledFor <= firstMonthEnd &&
    !ambiguous(d.scheduledFor) && !expectedKeys.has(minuteKey(d.scheduledFor)));
  if (offCadence) return { action: "skip", reason: "first-month entries off the cadence (re-joined?)", tz };

  const cutoff = new Date(now.getTime() + SAFETY_MS);
  const future = docs.filter((d) => d.scheduledFor > cutoff && !ambiguous(d.scheduledFor));
  const pending = future.filter((d) => d.status === "pending").sort((a, b) => a.scheduledFor - b.scheduledFor);
  const cancelledKeys = new Set(future.filter((d) => d.status === "cancelled").map((d) => minuteKey(d.scheduledFor)));
  if (!pending.length && cancelledKeys.size) return { action: "skip", reason: "all future entries cancelled", tz };

  const want = new Map();
  for (const ts of expected) {
    if (new Date(ts) > cutoff && !ambiguous(ts)) want.set(minuteKey(ts), ts);
  }
  if (!want.size && pending.length) return { action: "skip", reason: "window over but entries still queued", tz };

  const keep = [], cancel = [], claimed = new Set();
  for (const d of pending) {
    const k = minuteKey(d.scheduledFor);
    if (want.has(k) && !claimed.has(k)) { claimed.add(k); keep.push(d); }
    else cancel.push(d);
  }
  // A date a researcher cancelled on purpose stays cancelled.
  const add = [...want].filter(([k]) => !claimed.has(k) && !cancelledKeys.has(k)).map(([, ts]) => ts);
  return { action: cancel.length || add.length ? "repair" : "ok", tz, latest, keep, cancel, add };
}

async function applyPlan(project, configId, cfg, userId, plan, logFile) {
  // Insert before cancelling: if interrupted, a re-run cancels the leftovers,
  // whereas cancelled-but-never-replaced entries would read as researcher-cancelled.
  const src = plan.latest;
  const inserted = plan.add.length
    ? await PendingNotification.insertMany(plan.add.map((ts) => ({
        projectId: project._id,
        notificationConfigId: configId,
        scheduledFor: new Date(ts),
        status: "pending",
        recipientUserIds: [userId],
        recipientGroupIds: [],
        title: cfg.title || src.title,
        message: cfg.message || src.message,
        url: cfg.url || src.url || "",
        expireIn: cfg.expireIn != null ? cfg.expireIn : src.expireIn,
        timezone: plan.tz,
        useParticipantTimezone: !!cfg.useParticipantTimezone,
        created: new Date(),
      })))
    : [];
  fs.appendFileSync(logFile, JSON.stringify({
    projectId: String(project._id), configId, userId,
    inserted: inserted.map((d) => String(d._id)),
    cancelled: plan.cancel.map((d) => String(d._id)),
  }) + "\n");
  if (plan.cancel.length) {
    await PendingNotification.updateMany(
      { _id: { $in: plan.cancel.map((d) => d._id) }, status: "pending" },
      { $set: { status: "cancelled" } }
    );
  }
}

async function revert(logFile) {
  const rows = fs.readFileSync(logFile, "utf8").split("\n").filter(Boolean)
    .map((l) => JSON.parse(l)).filter((r) => r.configId);
  const cancelled = rows.flatMap((r) => r.cancelled);
  const inserted = rows.flatMap((r) => r.inserted);
  console.log(`${logFile}: ${rows.length} participant schedule(s), ${cancelled.length} cancelled, ${inserted.length} inserted`);
  if (!APPLY) {
    console.log("dry run — pass --apply to revert");
    return;
  }
  // Only entries still in the state this script left them in, and still due.
  const restored = await PendingNotification.updateMany(
    { _id: { $in: cancelled }, status: "cancelled", scheduledFor: { $gt: new Date() } },
    { $set: { status: "pending" } }
  );
  const removed = await PendingNotification.deleteMany({ _id: { $in: inserted }, status: "pending" });
  console.log(`restored ${restored.nModified ?? restored.modifiedCount}, removed ${removed.deletedCount}`);
}

async function main() {
  const uri = arg("uri") || process.env.DATABASE;
  if (!uri) {
    console.error("No database URI. Set DATABASE in the environment or pass --uri=...");
    process.exit(2);
  }
  // autoIndex off: a one-off script has no business (re)building prod indexes.
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
  const db = mongoose.connection.db;
  console.log(`database ${db.databaseName} (from ${arg("uri") ? "--uri" : envSource})${APPLY ? "" : "  [DRY RUN]"}\n`);

  if (arg("revert")) return revert(arg("revert"));

  const only = arg("project");
  const filter = only
    ? { _id: { $in: only.split(",").map((id) => new mongoose.Types.ObjectId(id.trim())) } }
    : { "notifications.schedule": "repeat" };
  // Raw read: the strict legacy Project schema drops undeclared config fields.
  const projects = await db.collection("projects")
    .find(filter, { projection: { name: 1, notifications: 1, mobileUsers: 1, currentlyActive: 1 } })
    .toArray();

  const logFile = APPLY ? path.resolve(`repair-every-n-days-${new Date().toISOString().replace(/[:.]/g, "-")}.jsonl`) : null;
  if (logFile) fs.writeFileSync(logFile, JSON.stringify({ run: new Date().toISOString(), database: db.databaseName, argv }) + "\n");

  const t = { schedules: 0, checked: 0, ok: 0, repaired: 0, cancelled: 0, added: 0, skipped: {}, shared: 0 };
  for (const project of projects) {
    // A schedule with several times of day is one config entry per time, sharing an id.
    const byId = new Map();
    for (const c of project.notifications || []) {
      if (!c || !c.id || c.schedule !== "repeat" || c.randomize) continue;
      if (!byId.has(c.id)) byId.set(c.id, []);
      byId.get(c.id).push(c);
    }
    const ids = [...byId].filter(([, es]) => es.every((e) => stepDays(e.interval))).map(([id]) => id);
    if (!ids.length) continue;

    const docs = await PendingNotification.find({
      projectId: project._id, notificationConfigId: { $in: ids }, isReminder: { $ne: true },
    }).lean();
    const users = new Map((project.mobileUsers || []).map((u) => [u.id, u]));
    const out = [];

    for (const id of ids) {
      const entries = byId.get(id);
      const cfg = entries[0];
      t.schedules++;
      const times = entries.map((e) => {
        const p = e.interval.trim().split(/\s+/);
        return `${p[2].padStart(2, "0")}:${p[1].padStart(2, "0")}`;
      }).join(", ");
      const lines = [];

      const personal = new Map();
      let shared = 0;
      for (const d of docs) {
        if (d.notificationConfigId !== id) continue;
        const solo = (d.recipientUserIds || []).length === 1 && !(d.recipientGroupIds || []).length;
        if (!solo || cfg.yokedDesign) {
          if (d.status === "pending" && d.scheduledFor > new Date()) shared++;
          continue;
        }
        if (!personal.has(d.recipientUserIds[0])) personal.set(d.recipientUserIds[0], []);
        personal.get(d.recipientUserIds[0]).push(d);
      }
      if (shared) {
        t.shared += shared;
        lines.push(`    ${shared} future entries shared by a group or several participants — not repaired`);
      }

      for (const [userId, userDocs] of personal) {
        const user = users.get(userId);
        if (!user || user.deactivated) continue;
        const plan = planPair(entries, user, userDocs);
        if (plan.action === "none") continue;
        t.checked++;
        const who = user.username || userId;
        if (plan.action === "ok") { t.ok++; continue; }
        if (plan.action === "skip") {
          t.skipped[plan.reason] = (t.skipped[plan.reason] || 0) + 1;
          lines.push(`    ${who}: skipped — ${plan.reason}`);
          continue;
        }
        t.repaired++;
        t.cancelled += plan.cancel.length;
        t.added += plan.add.length;
        const fmt = (ts) => momentTz.tz(ts, plan.tz).format("D MMM HH:mm");
        const joined = user.created ? momentTz.tz(user.created, plan.tz).format("D MMM YYYY") : "?";
        let line = `    ${who} (joined ${joined}): keep ${plan.keep.length}, cancel ${plan.cancel.length}, add ${plan.add.length}`;
        if (VERBOSE) {
          line += `\n      cancel: ${plan.cancel.map((d) => fmt(d.scheduledFor)).join(", ") || "-"}`;
          line += `\n      add:    ${plan.add.map(fmt).join(", ") || "-"}`;
        }
        lines.push(line);
        if (APPLY) await applyPlan(project, id, cfg, userId, plan, logFile);
      }

      if (lines.length) {
        out.push(`  "${cfg.title}" [${id}] every ${stepDays(cfg.interval)} days at ${times} ${cfg.timezone || "UTC"}`, ...lines);
      }
    }

    if (out.length) {
      console.log(`${project.name} (${project._id})${project.currentlyActive === false ? " [inactive]" : ""}`);
      console.log(out.join("\n") + "\n");
    }
  }

  console.log(`schedules: ${t.schedules}   participants checked: ${t.checked}   already correct: ${t.ok}`);
  console.log(`repaired: ${t.repaired} participant schedule(s) — ${t.cancelled} entries cancelled, ${t.added} added`);
  for (const [reason, n] of Object.entries(t.skipped)) console.log(`skipped: ${n} — ${reason}`);
  if (t.shared) console.log(`not repaired: ${t.shared} future entries shared by groups/several participants`);
  console.log(APPLY ? `\nlog: ${logFile}` : "\ndry run — nothing written; rerun with --apply");
}

if (require.main === module) {
  main()
    .then(() => mongoose.disconnect())
    .catch(async (err) => {
      console.error(err);
      await mongoose.disconnect().catch(() => {});
      process.exit(1);
    });
}

module.exports = { planPair, stepDays, windowFor };
