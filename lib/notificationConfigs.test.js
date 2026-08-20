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
const { plainConfigs } = require("../services/notificationConfigs");

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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
