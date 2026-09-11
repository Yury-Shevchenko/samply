// Run with: node lib/scheduleExpand.test.js   (from Website/)
//
// Regression guard for "weekly notifications stop for participants who joined
// later": the dashboard create routes expanded "every N days" with
// expandScheduleBetween (fixed 2026-07-23), but jobController.joinStudy still
// expanded it as a cron day-of-month "*/N", which resets every month. A
// participant whose first send fell late in a month got one send per month.
const fs = require("fs");
const path = require("path");
const { expandScheduleBetween } = require("../services/scheduleExpand");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

// ── "Every 7 days" rolls across the month boundary ──────────────────────────
const weekly = expandScheduleBetween(
  "17 30 12 */7 * *", "2026-08-27T23:00:00Z", "2026-10-14T23:00:00Z", "Europe/London"
);
eq("weekly from 28 Aug keeps a 7-day cadence into Sep/Oct", weekly, [
  "2026-08-28T11:30:17.000Z", "2026-09-04T11:30:17.000Z", "2026-09-11T11:30:17.000Z",
  "2026-09-18T11:30:17.000Z", "2026-09-25T11:30:17.000Z", "2026-10-02T11:30:17.000Z",
  "2026-10-09T11:30:17.000Z",
]);

// ── joinStudy uses the same expander as the create routes ───────────────────
const src = fs.readFileSync(path.join(__dirname, "../controllers/jobController.js"), "utf8");
const start = src.indexOf("exports.joinStudy");
const joinStudy = src.slice(start, src.indexOf("\nexports.", start + 1));
eq("joinStudy expands fixed-time repeats with expandScheduleBetween",
  /expandScheduleBetween\(sub\.interval,/.test(joinStudy), true);
eq("joinStudy no longer expands sub.interval as a raw cron",
  /patchStartDayCron\(sub\.interval\b/.test(joinStudy), false);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
