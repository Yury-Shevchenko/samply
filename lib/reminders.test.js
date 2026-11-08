// Run with: node lib/reminders.test.js   (from Website/)
//
// Regression guard for "all push notifications fail" (study sltpwpyz,
// 2026-11-08): a reminder saved with a blank title or message made the
// reminder insertMany throw, so the original ping was marked "failed" and
// never sent.
const { resolveReminders } = require("./reminders");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

const parent = { title: "Wie geht es dir?", message: "Bitte kurz antworten" };

eq("blank title and message fall back to the original ping",
  resolveReminders([{ title: "", message: "", time: 600000 }], parent),
  [{ title: "Wie geht es dir?", message: "Bitte kurz antworten", time: 600000 }]);

eq("whitespace-only counts as blank",
  resolveReminders([{ title: "  ", message: "Noch Zeit", time: 0 }], parent),
  [{ title: "Wie geht es dir?", message: "Noch Zeit", time: 0 }]);

eq("missing fields fall back too",
  resolveReminders([{ time: 60000 }], parent),
  [{ title: "Wie geht es dir?", message: "Bitte kurz antworten", time: 60000 }]);

eq("researcher text is kept",
  resolveReminders([{ title: "Erinnerung", message: "Bitte antworten", time: 1 }], parent),
  [{ title: "Erinnerung", message: "Bitte antworten", time: 1 }]);

eq("reminder without a usable delay is dropped (no Invalid Date)",
  resolveReminders([{ title: "a", message: "b" }, { title: "a", message: "b", time: "x" }, null], parent),
  []);

eq("no reminders configured",
  resolveReminders(undefined, parent),
  []);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
