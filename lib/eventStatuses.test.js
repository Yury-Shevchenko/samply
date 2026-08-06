// Run with: node lib/eventStatuses.test.js   (from Website/)
const fs = require("fs");
const path = require("path");
const {
  EVENT_STATUSES,
  RESPONDED_STATUSES,
  OPENED_STATUSES,
  CLIENT_REPORTABLE_STATUSES,
  isKnownStatus,
  isClientReportable,
} = require("./eventStatuses");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

// ── Vocabulary is internally consistent ──────────────────────────────────────
eq("every responded status is a known status",
  RESPONDED_STATUSES.every(isKnownStatus), true);
eq("every opened status is a known status",
  OPENED_STATUSES.every(isKnownStatus), true);
eq("every client-reportable status is a known status",
  CLIENT_REPORTABLE_STATUSES.every(isKnownStatus), true);
eq("no duplicates in the vocabulary",
  EVENT_STATUSES.length, new Set(EVENT_STATUSES).size);

// ── The bug this vocabulary exists to prevent ────────────────────────────────
eq("opened-in-app counts as a response", RESPONDED_STATUSES.includes("opened-in-app"), true);
eq("completed counts as a response", RESPONDED_STATUSES.includes("completed"), true);
eq("tapped counts as a response", RESPONDED_STATUSES.includes("tapped"), true);
eq("sent is not a response", RESPONDED_STATUSES.includes("sent"), false);
eq("received-in-app is not a response", RESPONDED_STATUSES.includes("received-in-app"), false);

// ── The unauthenticated endpoint must not accept forgeable claims ────────────
eq("a client cannot report completion", isClientReportable("completed"), false);
eq("a client cannot forge a delivery receipt", isClientReportable("delivery-accepted"), false);
eq("a client cannot forge a delivery failure", isClientReportable("delivery-failed"), false);
eq("a client cannot claim a send", isClientReportable("sent"), false);
eq("a client may report a tap", isClientReportable("tapped"), true);
eq("a client may report opening from history", isClientReportable("opened-in-app"), true);
eq("a client may report dismissal", isClientReportable("archived"), true);
eq("an invented status is rejected", isClientReportable("free-money"), false);
eq("undefined is rejected", isClientReportable(undefined), false);

// ── Statuses actually written by the code must all be declared ───────────────
// A status the schema's enum does not know would be dropped on write, which is
// precisely the class of silent failure this vocabulary exists to stop.
const SOURCES = [
  "../services/notificationSender.js",
  "../services/receiptPoller.js",
  "../controllers/resultController.js",
];
// Matches only event objects, which always carry `created` immediately after
// `status`. A bare `status: "..."` would also pick up PendingNotification's
// queue state and the Expo receipt's own status, which are different fields.
const written = new Set();
for (const rel of SOURCES) {
  const src = fs.readFileSync(path.join(__dirname, rel), "utf8");
  for (const m of src.matchAll(/status:\s*"([a-z-]+)",\s*created/g)) written.add(m[1]);
}
const undeclared = [...written].filter((s) => !isKnownStatus(s));
eq("every status written in code is declared in the vocabulary", undeclared, []);

// ── The dashboard's mirror must not drift ────────────────────────────────────
const analytics = fs.readFileSync(
  path.join(__dirname, "../nextapp/lib/data/analytics.ts"), "utf8");

function arrayLiteral(src, name) {
  const m = new RegExp(`${name}\\s*(?::[^=]+)?=\\s*\\[([^\\]]*)\\]`).exec(src);
  return m ? [...m[1].matchAll(/"([a-z-]+)"/g)].map((x) => x[1]) : null;
}

eq("dashboard RESPONDED_STATUSES matches the server vocabulary",
  arrayLiteral(analytics, "RESPONDED_STATUSES"), RESPONDED_STATUSES);
eq("dashboard OPENED_STATUSES matches the server vocabulary",
  arrayLiteral(analytics, "OPENED_STATUSES"), OPENED_STATUSES);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
