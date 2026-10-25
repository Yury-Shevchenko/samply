// Run with: node --experimental-strip-types lib/occasions.test.ts  (from nextapp/)
import { labelOccasions } from "./occasions.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

const t = (min: number) => new Date(Date.UTC(2026, 9, 22, 9, min));

// ── The case this exists for ─────────────────────────────────────────────────
// Original skipped, reminder answered: one occasion, keyed on the original's id.
eq("a reminder joins its original's occasion",
  labelOccasions([
    { samplyid: "p1", finid: "F1", messageId: "orig", created: t(0) },
    { samplyid: "p1", finid: "F1", messageId: "rem1", created: t(30) },
  ]),
  [{ occasionId: "orig", isReminder: false }, { occasionId: "orig", isReminder: true }]);

// The export is not sorted by time, so the original must be found by `created`.
eq("the original is the earliest row, not the first one listed",
  labelOccasions([
    { samplyid: "p1", finid: "F1", messageId: "rem2", created: t(60) },
    { samplyid: "p1", finid: "F1", messageId: "orig", created: t(0) },
    { samplyid: "p1", finid: "F1", messageId: "rem1", created: t(30) },
  ]),
  [
    { occasionId: "orig", isReminder: true },
    { occasionId: "orig", isReminder: false },
    { occasionId: "orig", isReminder: true },
  ]);

// ── Rows that must stay apart ────────────────────────────────────────────────
eq("sends without reminders are each their own occasion",
  labelOccasions([
    { samplyid: "p1", messageId: "a", created: t(0) },
    { samplyid: "p1", messageId: "b", created: t(0) },
  ]),
  [{ occasionId: "a", isReminder: false }, { occasionId: "b", isReminder: false }]);

eq("the same finid for two participants is not merged",
  labelOccasions([
    { samplyid: "p1", finid: "F1", messageId: "a", created: t(0) },
    { samplyid: "p2", finid: "F1", messageId: "b", created: t(5) },
  ]),
  [{ occasionId: "a", isReminder: false }, { occasionId: "b", isReminder: false }]);

eq("separate sends to one participant stay separate",
  labelOccasions([
    { samplyid: "p1", finid: "F1", messageId: "a", created: t(0) },
    { samplyid: "p1", finid: "F2", messageId: "b", created: t(5) },
    { samplyid: "p1", finid: "F1", messageId: "a-rem", created: t(30) },
  ]),
  [
    { occasionId: "a", isReminder: false },
    { occasionId: "b", isReminder: false },
    { occasionId: "a", isReminder: true },
  ]);

// ── Untidy rows ──────────────────────────────────────────────────────────────
eq("a row with no messageId gets an empty occasion id rather than a crash",
  labelOccasions([{ samplyid: "p1" }]),
  [{ occasionId: "", isReminder: false }]);

eq("a row without a timestamp never displaces a dated original",
  labelOccasions([
    { samplyid: "p1", finid: "F1", messageId: "undated" },
    { samplyid: "p1", finid: "F1", messageId: "orig", created: t(0) },
  ]),
  [{ occasionId: "orig", isReminder: true }, { occasionId: "orig", isReminder: false }]);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
