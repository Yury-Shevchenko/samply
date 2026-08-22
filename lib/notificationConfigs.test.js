// Run with: node lib/notificationConfigs.test.js   (from Website/)
//
// Regression guard for the "delay after joining fires instantly" bug: the
// Next.js create routes write notification configs through a strict:false
// model, while the Express side reads them through the strict schema in
// models/Project.js. Mongoose drops undeclared paths while hydrating, so a
// field missing from that schema reads as undefined even though it is stored —
// which silently collapsed the enrollment delay to 0 at join time.
const mongoose = require("mongoose");
require("../models/Project");
const { plainConfigs, appliesToJoiner, isGroupLevelConfig } = require("../services/notificationConfigs");

const Project = mongoose.model("Project");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

const notificationSchema = Project.schema.path("notifications").schema;

// ── The schema declares every field the Next.js create routes write ──────────
for (const field of ["delay", "participants", "spec", "reminders", "groups", "scheduleInFuture"]) {
  eq(`notifications subschema declares "${field}"`, !!notificationSchema.path(field), true);
}

// ── A hydrated config exposes the enrollment delay ───────────────────────────
function hydrate(config) {
  return Project.hydrate({
    _id: new mongoose.Types.ObjectId(),
    notifications: [config],
  }).notifications[0];
}

const enrollmentConfig = {
  id: "abc12345",
  schedule: "enrollment",
  delay: { days: 2, hours: 3, minutes: 30 },
  groups: ["grp1"],
  scheduleInFuture: true,
  title: "t",
  message: "m",
};

eq("delay survives hydration", hydrate(enrollmentConfig).delay, { days: 2, hours: 3, minutes: 30 });

// The delay maths as joinStudy / scheduleForUser run it.
function delayMsOf(cfg) {
  return (((cfg.delay && cfg.delay.days) || 0) * 86400 + ((cfg.delay && cfg.delay.hours) || 0) * 3600 + ((cfg.delay && cfg.delay.minutes) || 0) * 60) * 1000;
}
eq("2d 3h 30m resolves to the right offset", delayMsOf(hydrate(enrollmentConfig)), ((2 * 86400) + (3 * 3600) + (30 * 60)) * 1000);
eq("a config with no delay still resolves to 0", delayMsOf(hydrate({ id: "x", schedule: "enrollment" })), 0);

// ── plainConfigs is the second line of defence ───────────────────────────────
// It must survive the NEXT field added on the Next.js side, before anyone
// remembers to declare it in models/Project.js.
const withUndeclaredField = hydrate({ ...enrollmentConfig, fieldAddedLater: "keep me" });
eq("an undeclared field is invisible on the raw subdocument", withUndeclaredField.fieldAddedLater, undefined);
eq("plainConfigs surfaces it", plainConfigs([withUndeclaredField])[0].fieldAddedLater, "keep me");
eq("plainConfigs keeps declared fields too", plainConfigs([withUndeclaredField])[0].delay, { days: 2, hours: 3, minutes: 30 });
eq("plainConfigs passes plain objects straight through", plainConfigs([{ id: "p", delay: { days: 1 } }])[0].delay, { days: 1 });
eq("plainConfigs tolerates a missing array", plainConfigs(undefined), []);

// ── Group targeting narrows "future participants" ────────────────────────────
// A study with one schedule per group must not send every group's schedule to
// every joiner. Mirrors the filter in services/scheduleForUser.js.
const twoDayGroup = { id: "grpA", name: "2 day delay" };
const fiveDayGroup = { id: "grpB", name: "5 day delay" };
const targetsTwoDayGroup = { id: "cfg1", groups: ["grpA"], scheduleInFuture: true };

eq("a joiner in the targeted group is included", appliesToJoiner(targetsTwoDayGroup, twoDayGroup), true);
eq("a joiner in another group is excluded", appliesToJoiner(targetsTwoDayGroup, fiveDayGroup), false);
eq("a joiner with no group is excluded from a group-targeted config", appliesToJoiner(targetsTwoDayGroup, undefined), false);

const allGroups = { id: "cfg2", groups: ["grpA", "grpB"], allCurrentGroups: true, scheduleInFuture: true };
eq("\"all groups\" includes any grouped joiner", appliesToJoiner(allGroups, fiveDayGroup), true);
eq("\"all groups\" excludes an ungrouped joiner", appliesToJoiner(allGroups, undefined), false);

const noGroupTargeting = { id: "cfg3", groups: null, participantId: ["someoneWhoJoinedEarlier"], scheduleInFuture: true };
eq("a config with no group targeting reaches every joiner", appliesToJoiner(noGroupTargeting, undefined), true);
eq("...including one who picked a group", appliesToJoiner(noGroupTargeting, twoDayGroup), true);
eq("an empty groups array is not group targeting on its own", appliesToJoiner({ id: "cfg4", groups: [] }, undefined), true);

// ── Which configs are delivered as one shared set of group-addressed docs ────
// Those are inherited by later joiners at send time, so the join path must not
// create personal copies of them.
eq("a yoked schedule is group level", isGroupLevelConfig({ schedule: "repeat", yokedDesign: true, groups: ["grpA"] }), true);
eq("one-time fixed dates aimed at groups are group level",
  isGroupLevelConfig({ schedule: "one-time", target: "fixed-times", groups: ["grpA"] }), true);
eq("...and so are they for \"all current groups\"",
  isGroupLevelConfig({ schedule: "one-time", target: "fixed-times", groups: [], allCurrentGroups: true }), true);
eq("one-time fixed dates aimed only at participants are not",
  isGroupLevelConfig({ schedule: "one-time", target: "fixed-times", groups: null, participantId: ["u1"] }), false);
eq("a non-yoked repeat schedule is per participant",
  isGroupLevelConfig({ schedule: "repeat", yokedDesign: false, groups: ["grpA"] }), false);
eq("a non-yoked random-window schedule is per participant",
  isGroupLevelConfig({ schedule: "one-time", target: "user-specific", groups: ["grpA"] }), false);
eq("an enrollment schedule is per participant",
  isGroupLevelConfig({ schedule: "enrollment", groups: ["grpA"] }), false);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
