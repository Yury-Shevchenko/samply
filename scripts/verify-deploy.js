#!/usr/bin/env node
/**
 * Post-deploy verification for the Tier 1-3 fixes.
 *
 * STRICTLY READ-ONLY. Every collection handle is wrapped in a proxy that throws
 * if anything but find / findOne / countDocuments / aggregate / distinct is
 * called, so this cannot modify production even by mistake.
 *
 * Usage, from Website/ on the production server:
 *
 *   node scripts/verify-deploy.js                 # look at the last 24 hours
 *   node scripts/verify-deploy.js --since=72h     # ... or the last 72 hours
 *   node scripts/verify-deploy.js --since=2026-08-05T12:00:00Z
 *   node scripts/verify-deploy.js --uri=mongodb://...   # override the database
 *
 * Set --since to roughly when you deployed. Checks that compare "before and
 * after" need that boundary; everything else reports current state.
 *
 * Exit code is 0 unless a check FAILs, so it is safe to run from cron.
 */

const path = require("path");
const fs = require("fs");

// ── Environment ──────────────────────────────────────────────────────────────
// Mirror the server's own precedence: nextapp/.env.production is loaded first
// and wins, which has caught people out before — editing variables.env alone is
// a silent no-op in production.
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

const argv = process.argv.slice(2);
const arg = (name) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};

const uri = arg("uri") || process.env.DATABASE;
if (!uri) {
  console.error("No database URI. Set DATABASE in the environment or pass --uri=...");
  process.exit(2);
}

function parseSince(raw) {
  if (!raw) return new Date(Date.now() - 24 * 3600 * 1000);
  const hours = /^(\d+)h$/.exec(raw);
  if (hours) return new Date(Date.now() - Number(hours[1]) * 3600 * 1000);
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) {
    console.error(`Could not read --since=${raw}. Use e.g. 48h or 2026-08-05T12:00:00Z`);
    process.exit(2);
  }
  return d;
}
const SINCE = parseSince(arg("since"));

// ── Read-only enforcement ────────────────────────────────────────────────────
const ALLOWED = new Set([
  "find", "findOne", "countDocuments", "estimatedDocumentCount", "aggregate", "distinct",
]);

function readOnly(collection, name) {
  return new Proxy(collection, {
    get(target, prop) {
      const value = target[prop];
      if (typeof value !== "function") return value;
      if (typeof prop === "string" && !ALLOWED.has(prop)) {
        return () => {
          throw new Error(`verify-deploy is read-only — refused ${name}.${String(prop)}()`);
        };
      }
      return value.bind(target);
    },
  });
}

// ── Reporting ────────────────────────────────────────────────────────────────
const results = [];
const C = process.stdout.isTTY
  ? { pass: "\x1b[32m", warn: "\x1b[33m", fail: "\x1b[31m", dim: "\x1b[2m", bold: "\x1b[1m", off: "\x1b[0m" }
  : { pass: "", warn: "", fail: "", dim: "", bold: "", off: "" };

function report(level, title, detail, hint) {
  results.push({ level, title });
  const tag = level === "pass" ? "PASS" : level === "warn" ? "WARN" : level === "fail" ? "FAIL" : "INFO";
  const colour = level === "pass" ? C.pass : level === "warn" ? C.warn : level === "fail" ? C.fail : C.dim;
  console.log(`${colour}${tag}${C.off}  ${title}`);
  if (detail) console.log(`      ${C.dim}${detail}${C.off}`);
  if (hint) console.log(`      ${C.dim}→ ${hint}${C.off}`);
}

function section(title) {
  console.log(`\n${C.bold}${title}${C.off}`);
}

// Forced to en-US: the production server's locale is German, where the default
// grouping separator is "." — so 346861 rendered as "346.861", which reads as a
// decimal and made large counts look like small ones.
const n = (x) => Number(x || 0).toLocaleString("en-US");
const pct = (a, b) => {
  if (!(b > 0)) return "n/a";
  const p = (a / b) * 100;
  // Keep small-but-nonzero shares legible rather than rounding them to "0%".
  if (p > 0 && p < 1) return "<1%";
  return `${Math.round(p)}%`;
};

// Statuses the analytics now count as a response (Tier 1).
const RESPONDED = ["tapped", "opened-in-app", "completed"];

(async () => {
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection.db;
  const Results = readOnly(db.collection("results"), "results");
  const Projects = readOnly(db.collection("projects"), "projects");

  const host = (() => {
    try { return new URL(uri.replace(/^mongodb\+srv:/, "https:").replace(/^mongodb:/, "http:")).host; }
    catch { return "(unparsed)"; }
  })();

  console.log(`${C.bold}Samply post-deploy verification${C.off}`);
  console.log(`${C.dim}database   : ${db.databaseName} @ ${host}`);
  console.log(`config from: ${envSource}`);
  console.log(`window     : since ${SINCE.toISOString()}`);
  console.log(`mode       : read-only (writes are blocked, not merely avoided)${C.off}`);

  const sinceFilter = { created: { $gte: SINCE } };
  const recentSends = await Results.countDocuments({ ...sinceFilter, "events.status": "sent" });
  // Rows with no `created` at all cannot be placed in the window; they are
  // reported separately under data hygiene rather than silently ignored.
  const undatable = await Results.countDocuments({ created: { $exists: false } });

  // ── 1. Is anything flowing at all? ─────────────────────────────────────────
  section("1. Activity in the window");
  if (recentSends === 0) {
    report("warn", "No notifications sent in this window",
      undatable > 0
        ? `Nothing sent since the --since boundary. (${n(undatable)} rows have no 'created' date and cannot be placed in any window.)`
        : "Nothing has been sent since the chosen --since boundary.",
      "Widen the window (--since=168h) or wait for a study to send before judging the rest.");
  } else {
    report("info", `${n(recentSends)} notifications sent since ${SINCE.toISOString().slice(0, 10)}`);
  }

  // ── 2. Strict-schema fields that used to be silently dropped ───────────────
  section("2. Schema fields persisting (these were silently dropped before)");

  const withConfigId = await Results.countDocuments({ ...sinceFilter, notificationConfigId: { $exists: true } });
  const configIdEver = await Results.countDocuments({ notificationConfigId: { $exists: true } });
  if (recentSends === 0) {
    report("info", "notificationConfigId — no recent sends to judge", `${n(configIdEver)} rows carry it in total`);
  } else if (withConfigId > 0) {
    report("pass", `notificationConfigId is persisting (${n(withConfigId)} of ${n(recentSends)} recent sends)`,
      `${n(configIdEver)} rows carry it in total. It was 0 before the deploy.`,
      "The analytics 'Schedule performance' panel should now show real schedule names.");
  } else {
    report("fail", "notificationConfigId is still not being stored",
      `0 of ${n(recentSends)} recent sends carry it.`,
      "Check that models/Result.js declares notificationConfigId and that the running process picked up the change (pm2 restart samply).");
  }

  const withReceipt = await Results.countDocuments({ receipt: { $exists: true } });
  const withChecked = await Results.countDocuments({ receiptCheckedAt: { $exists: true } });
  if (withReceipt > 0 || withChecked > 0) {
    report("pass", `Expo receipts are being stored (${n(withReceipt)} receipts, ${n(withChecked)} marked checked)`);
  } else {
    const eligible = await Results.countDocuments({
      "ticket.id": { $exists: true },
      created: { $lte: new Date(Date.now() - 20 * 60 * 1000), $gte: new Date(Date.now() - 24 * 3600 * 1000) },
    });
    if (eligible === 0) {
      report("info", "No receipts yet — nothing is old enough to check",
        "Receipts are fetched 15 minutes after a send.");
    } else {
      report("fail", "Receipt poller does not appear to be running",
        `${n(eligible)} sends are old enough to have receipts, but none are stored.`,
        "Confirm server.js requires services/receiptPoller and look for 'receiptPoller: started' in the pm2 logs (pm2 logs samply).");
    }
  }

  // ── 3. Receipt poller health ───────────────────────────────────────────────
  section("3. Delivery outcomes (invisible before this deploy)");

  const accepted = await Results.countDocuments({ "events.status": "delivery-accepted" });
  const failed = await Results.countDocuments({ "events.status": "delivery-failed" });

  if (accepted + failed === 0) {
    report("info", "No delivery outcomes recorded yet");
  } else {
    const failPct = pct(failed, accepted + failed);
    report(failed / (accepted + failed) > 0.1 ? "warn" : "pass",
      `${n(accepted)} accepted by the push service, ${n(failed)} failed (${failPct} failing)`,
      failed / (accepted + failed) > 0.1
        ? "More than one in ten sends is failing — worth investigating before the next study."
        : null);

    const kinds = await Results.aggregate([
      { $match: { "events.status": "delivery-failed" } },
      { $unwind: "$events" },
      { $match: { "events.status": "delivery-failed" } },
      { $group: { _id: "$events.data.error", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]).toArray();
    for (const k of kinds) {
      console.log(`      ${C.dim}${String(k._id || "(unlabelled)").padEnd(26)} ${n(k.count)}${C.off}`);
    }
  }

  // Backlog: rows still awaiting a receipt inside Expo's retention window.
  const backlog = await Results.countDocuments({
    "ticket.id": { $exists: true },
    receiptCheckedAt: { $exists: false },
    created: { $lte: new Date(Date.now() - 15 * 60 * 1000), $gte: new Date(Date.now() - 24 * 3600 * 1000) },
  });
  if (backlog > 5000) {
    report("warn", `${n(backlog)} sends are waiting for a receipt`,
      "The poller handles 1,000 per run every 5 minutes.",
      "Fine if a large study just went out; investigate if it keeps growing.");
  } else {
    report("pass", `Receipt backlog is healthy (${n(backlog)} awaiting)`);
  }

  // Known Tier 3 defect: the retirement sweep only runs when the backlog is
  // empty, so on a busy server it effectively never runs.
  const stale = await Results.countDocuments({
    "ticket.id": { $exists: true },
    receiptCheckedAt: { $exists: false },
    created: { $lt: new Date(Date.now() - 24 * 3600 * 1000) },
  });
  if (stale > 0) {
    report("warn", `${n(stale)} sends aged out without a receipt being resolved`,
      "Expected: this is the known Tier 3 defect where the retirement sweep only runs when the backlog is empty.",
      "Harmless (they are excluded from the poller's query). Fixed by Tier 4 Phase 1 item 1.");
  } else {
    report("pass", "No unresolved sends past Expo's retention window");
  }

  // ── 4. Token deactivation — the riskiest thing in the deploy ───────────────
  section("4. Token deactivation (a false positive silently ends a participant's study)");

  const deadTokenEvents = await Results.distinct("samplyid", {
    "events.status": "delivery-failed",
    "events.data.error": "DeviceNotRegistered",
  });
  const deactivatedAgg = await Projects.aggregate([
    { $unwind: "$mobileUsers" },
    { $match: { "mobileUsers.deactivated": true } },
    { $count: "total" },
  ]).toArray();
  const totalParticipantsAgg = await Projects.aggregate([
    { $unwind: "$mobileUsers" },
    { $count: "total" },
  ]).toArray();

  const deactivated = deactivatedAgg[0] ? deactivatedAgg[0].total : 0;
  const totalParticipants = totalParticipantsAgg[0] ? totalParticipantsAgg[0].total : 0;

  // Only the DeviceNotRegistered count reflects the poller. Total deactivations
  // are dominated by participants who left studies, which long predates this
  // deploy — reporting the two side by side without saying so reads as though
  // the poller had just disabled a quarter of everyone.
  report("info", `Poller has retired ${n(deadTokenEvents.length)} participant token(s)`,
    `Separately, ${n(deactivated)} of ${n(totalParticipants)} enrolments (${pct(deactivated, totalParticipants)}) are deactivated for any reason — ` +
    "mostly people who left a study, accumulated over years. That figure is not the poller's doing.");

  if (deadTokenEvents.length > 0 && totalParticipants > 0) {
    const share = deadTokenEvents.length / totalParticipants;
    if (share > 0.25) {
      report("fail", `${pct(deadTokenEvents.length, totalParticipants)} of enrolments hit DeviceNotRegistered`,
        "That is high enough to suspect the poller is misreading receipts rather than finding genuinely dead devices.",
        "Inspect a few: db.results.find({'events.data.error':'DeviceNotRegistered'}).limit(3) and check those participants still have the app installed.");
    } else {
      report("pass", `DeviceNotRegistered rate looks plausible (${n(deadTokenEvents.length)} participants, ${pct(deadTokenEvents.length, totalParticipants)} of enrolments)`,
        "Expected from reinstalls, new phones, and revoked notification permission. " +
        "The first runs clear a backlog of tokens that died years ago, so this rate should fall.");
    }
  } else {
    report("pass", "No tokens have been deactivated by the poller");
  }

  // ── 5. Placeholder substitution (the Tier 2 rewrite) ───────────────────────
  section("5. Survey links (Tier 2 substitution)");

  const leaked = await Results.countDocuments({
    ...sinceFilter,
    "data.url": { $regex: "%(SAMPLY_ID|PARTICIPANT_CODE|MESSAGE_ID|GROUP_ID|GROUP_CODE|TIMESTAMP|TIMESTAMP_SENT|BATCH)%" },
  });
  if (recentSends === 0) {
    report("info", "No recent sends to check for placeholder leakage");
  } else if (leaked === 0) {
    report("pass", `No unsubstituted placeholders in ${n(recentSends)} recent sends`,
      "Every placeholder was either filled or its parameter dropped — the failure that cost four studies their person-level analyses.");
  } else {
    const PLACEHOLDER_RE = "%(SAMPLY_ID|PARTICIPANT_CODE|MESSAGE_ID|GROUP_ID|GROUP_CODE|TIMESTAMP|TIMESTAMP_SENT|BATCH)%";
    const [sample, newestLeaked, firstNewCode] = await Promise.all([
      Results.find({ ...sinceFilter, "data.url": { $regex: PLACEHOLDER_RE } },
        { projection: { "data.url": 1, created: 1 } }).sort({ created: -1 }).limit(3).toArray(),
      Results.find({ ...sinceFilter, "data.url": { $regex: PLACEHOLDER_RE } },
        { projection: { created: 1 } }).sort({ created: -1 }).limit(1).toArray(),
      // notificationConfigId only started persisting with this deploy, so the
      // oldest row carrying it marks when the new code began serving traffic.
      Results.find({ ...sinceFilter, notificationConfigId: { $exists: true } },
        { projection: { created: 1 } }).sort({ created: 1 }).limit(1).toArray(),
    ]);

    const leakedAt = newestLeaked[0] && newestLeaked[0].created;
    const newCodeFrom = firstNewCode[0] && firstNewCode[0].created;
    const detail = sample.map((s) => "  " + (s.data && s.data.url)).join("\n");

    // A leak that stopped before the new code started serving is old data
    // caught by the window, not a live fault.
    if (leakedAt && newCodeFrom && leakedAt < newCodeFrom) {
      report("pass", `${n(leaked)} sends with literal placeholders, all from before the deploy`,
        `${detail}\n      Newest leak ${leakedAt.toISOString()}, new code serving from ${newCodeFrom.toISOString()}.`,
        "Pre-deploy traffic caught by the window. Re-run with --since set after your restart to see only new sends.");
    } else {
      report("fail", `${n(leaked)} recent sends still contain a literal placeholder`,
        detail + (leakedAt ? `\n      Newest leak ${leakedAt.toISOString()}` : "") +
        (newCodeFrom ? `, new code serving from ${newCodeFrom.toISOString()}` : ""),
        "Leaks after the new code started serving. Check that the running process picked up lib/placeholders.js (pm2 restart samply).");
    }
  }

  // ── 6. Completion tracking ─────────────────────────────────────────────────
  section("6. Completion tracking (P0.2)");

  const projectsWithMessageId = await Projects.countDocuments({ "notifications.url": { $regex: "%MESSAGE_ID%" } });
  const projectsWithNotifications = await Projects.countDocuments({ "notifications.0": { $exists: true } });
  const completions = await Results.countDocuments({ "events.status": "completed" });

  report("info", `${n(projectsWithMessageId)} of ${n(projectsWithNotifications)} studies with schedules pass %MESSAGE_ID%`,
    `${n(completions)} completions recorded in total.`);
  if (projectsWithNotifications > 0 && projectsWithMessageId === 0) {
    report("warn", "No study is configured for completion tracking",
      "Reminders cannot be suppressed and compliance cannot be measured from completions.",
      "The new health banner should now be telling those researchers this on their analytics page.");
  }

  // ── 7. Compliance impact of the Tier 1 change ──────────────────────────────
  section("7. Compliance counting (Tier 1)");

  const [sentAll, oldRule, newRule] = await Promise.all([
    Results.countDocuments({ "events.status": "sent" }),
    Results.countDocuments({ "events.status": "tapped" }),
    Results.countDocuments({ "events.status": { $in: RESPONDED } }),
  ]);
  const gained = newRule - oldRule;
  report(gained > 0 ? "pass" : "info",
    `Responses credited: ${n(newRule)} (was ${n(oldRule)} under the old 'tapped only' rule)`,
    sentAll > 0
      ? `${n(gained)} additional responses now counted — ${pct(newRule, sentAll)} of ${n(sentAll)} sends, up from ${pct(oldRule, sentAll)}.`
      : `${n(gained)} additional responses now counted.`);

  // ── 8. Data hygiene ────────────────────────────────────────────────────────
  section("8. Data hygiene");

  const orphans = await Results.countDocuments({ project: { $exists: false } });
  if (orphans > 0) {
    report("warn", `${n(orphans)} result rows have no project`,
      "Created by /api/updatestatus, which upserts on an unknown message id.",
      "Invisible to all project-scoped analytics. Fixed by Tier 4 Phase 1 item 4.");
  } else {
    report("pass", "No orphaned result rows");
  }

  if (undatable > 0) {
    report("warn", `${n(undatable)} rows have no 'created' date`,
      "These are invisible to any date-windowed analytics view.",
      "They do appear under the new 'Entire study' window.");
  } else {
    report("pass", "Every result row has a 'created' date");
  }

  // Duplicate status events would suggest the app's offline queue is retrying
  // something it should have considered delivered.
  const dupes = await Results.aggregate([
    { $match: { ...sinceFilter, events: { $exists: true } } },
    { $project: {
        tapped: { $size: { $filter: { input: { $ifNull: ["$events", []] }, cond: { $eq: ["$$this.status", "tapped"] } } } },
    } },
    { $match: { tapped: { $gt: 1 } } },
    { $count: "total" },
  ]).toArray();
  const dupCount = dupes[0] ? dupes[0].total : 0;
  if (dupCount > Math.max(10, recentSends * 0.02)) {
    report("warn", `${n(dupCount)} recent messages have more than one 'tapped' event`,
      "The mobile offline queue may be re-sending events the server already accepted.",
      "A few are normal (a participant can tap twice); a large share is not.");
  } else {
    report("pass", `Duplicate 'tapped' events are within normal range (${n(dupCount)})`);
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  const fails = results.filter((r) => r.level === "fail");
  const warns = results.filter((r) => r.level === "warn");

  console.log(`\n${C.bold}Summary${C.off}`);
  console.log(`  ${C.pass}${results.filter((r) => r.level === "pass").length} passed${C.off}` +
              `   ${C.warn}${warns.length} warnings${C.off}` +
              `   ${C.fail}${fails.length} failures${C.off}`);
  if (fails.length) {
    console.log(`\n${C.fail}Needs attention:${C.off}`);
    for (const f of fails) console.log(`  - ${f.title}`);
  }

  await mongoose.disconnect();
  process.exit(fails.length ? 1 : 0);
})().catch(async (err) => {
  console.error(`\n${C.fail}verify-deploy failed to run${C.off}: ${err.message}`);
  if (err.stack) console.error(err.stack.split("\n").slice(1, 4).join("\n"));
  process.exit(2);
});
