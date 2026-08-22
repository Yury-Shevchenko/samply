// Run with: node --experimental-strip-types lib/absoluteWindow.test.ts   (from nextapp/)
//
// "Specific dates + random times within a window" hands the scheduler concrete
// timestamps, not cron expressions. Routing those through computeRandomWindowDocs
// silently produced nothing (the ISO string fails to parse as cron, the throw is
// swallowed, zero docs come back), so the whole schedule type queued no
// notifications at all. computeAbsoluteWindowDocs is the path that reads them.
import { computeAbsoluteWindowDocs } from "./scheduling.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

const base = {
  projectId: "p", notificationConfigId: "c", title: "t", message: "m", url: "",
  recipientUserIds: ["u1"], recipientGroupIds: [] as string[],
  status: "pending" as const, created: new Date(0),
};
const from = "2026-09-01T09:00:00.000Z";
const to = "2026-09-01T21:00:00.000Z";

const docs = computeAbsoluteWindowDocs({ ...base, from, to, number: 5, distance: 0 });
eq("draws the requested number of times", docs.length, 5);
eq("every time falls inside the window",
  docs.every((d) => d.scheduledFor >= new Date(from) && d.scheduledFor <= new Date(to)), true);
eq("times are ordered", docs.every((d, i) => i === 0 || d.scheduledFor >= docs[i - 1].scheduledFor), true);
eq("the other doc fields are carried through", docs[0].recipientUserIds, ["u1"]);

const spaced = computeAbsoluteWindowDocs({ ...base, from, to, number: 4, distance: 60 * 60 * 1000 });
eq("a minimum spacing is honoured",
  spaced.every((d, i) => i === 0 || d.scheduledFor.getTime() - spaced[i - 1].scheduledFor.getTime() >= 60 * 60 * 1000), true);

eq("a reversed window yields nothing", computeAbsoluteWindowDocs({ ...base, from: to, to: from, number: 3 }).length, 0);
eq("an unparseable window yields nothing", computeAbsoluteWindowDocs({ ...base, from: "not a date", to, number: 3 }).length, 0);
eq("a window with no count yields nothing", computeAbsoluteWindowDocs({ ...base, from, to, number: 0 }).length, 0);
eq("an impossible spacing yields nothing rather than throwing",
  computeAbsoluteWindowDocs({ ...base, from, to, number: 10, distance: 24 * 60 * 60 * 1000 }).length, 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
