// Run with: node --experimental-strip-types lib/completion.test.ts  (from nextapp/)
import { createRequire } from "node:module";
import {
  messageIdFromQuery,
  isValidMessageId,
  MESSAGE_ID_QUERY_KEYS,
} from "./completion.ts";

const require_ = createRequire(import.meta.url);

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

// ── The redirects this exists for ────────────────────────────────────────────
// Nettskjema: the id from its codebook plus its own submission id.
eq("nettskjema's redirect yields the message id",
  messageIdFromQuery({ messageid: "iLrrhkbgTPLYinW", submissionId: "47019204" }),
  "iLrrhkbgTPLYinW");

// SurveyMonkey appends EVERY captured custom variable, not just the one we want.
eq("surveymonkey's extra custom variables are ignored",
  messageIdFromQuery({ id: "aB3", code: "Adrian", messageid: "iLrrhkbgTPLYinW" }),
  "iLrrhkbgTPLYinW");

eq("a redirect carrying nothing else still works",
  messageIdFromQuery({ messageid: "iLrrhkbgTPLYinW" }), "iLrrhkbgTPLYinW");

// ── Spellings ────────────────────────────────────────────────────────────────
eq("camelCase messageId is accepted", messageIdFromQuery({ messageId: "abc123" }), "abc123");
eq("shouty MESSAGEID is accepted", messageIdFromQuery({ MESSAGEID: "abc123" }), "abc123");
eq("msg is accepted", messageIdFromQuery({ msg: "abc123" }), "abc123");
eq("message_id is accepted", messageIdFromQuery({ message_id: "abc123" }), "abc123");
eq("msgid is accepted", messageIdFromQuery({ msgid: "abc123" }), "abc123");

// Key preference must not depend on the order the tool appended them in.
eq("messageid wins over msg regardless of order (a)",
  messageIdFromQuery({ msg: "second", messageid: "first" }), "first");
eq("messageid wins over msg regardless of order (b)",
  messageIdFromQuery({ messageid: "first", msg: "second" }), "first");

// ── Nothing usable ───────────────────────────────────────────────────────────
eq("no parameters at all", messageIdFromQuery({}), null);
eq("only the tool's own parameters", messageIdFromQuery({ submissionId: "47019204" }), null);
eq("an empty value is not an id", messageIdFromQuery({ messageid: "" }), null);
eq("whitespace only is not an id", messageIdFromQuery({ messageid: "   " }), null);
eq("an undefined value is not an id", messageIdFromQuery({ messageid: undefined }), null);
// A key that is a prefix of an accepted one must not be mistaken for it.
eq("messageidx is not messageid", messageIdFromQuery({ messageidx: "abc123" }), null);

// ── Untrusted input reaching a Mongo query ───────────────────────────────────
// The value is used to look up a Result, so bound it before it gets there.
eq("a repeated parameter takes the first value",
  messageIdFromQuery({ messageid: ["abc123", "def456"] }), "abc123");
eq("surrounding whitespace is trimmed",
  messageIdFromQuery({ messageid: "  abc123  " }), "abc123");
eq("a path traversal attempt is rejected",
  messageIdFromQuery({ messageid: "../../admin" }), null);
eq("a value with a slash is rejected", messageIdFromQuery({ messageid: "a/b" }), null);
eq("a value with a percent escape is rejected", messageIdFromQuery({ messageid: "a%2Fb" }), null);
eq("an over-long value is rejected", messageIdFromQuery({ messageid: "a".repeat(65) }), null);
eq("a 64-character value is the limit", messageIdFromQuery({ messageid: "a".repeat(64) }), "a".repeat(64));
// Mongoose casts to String so an object cannot become a query operator, but the
// value should never get that far in the first place.
eq("an operator-shaped value is rejected",
  messageIdFromQuery({ messageid: { $ne: null } } as never), null);

// ── Ids Samply has actually issued ───────────────────────────────────────────
// Live ids: nanoid(15) over an alphanumeric alphabet (notificationSender.js).
eq("a live nanoid id validates", isValidMessageId("iLrrhkbgTPLYinW"), true);
// Legacy ids from the retired generator are hyphenated (hookController.js).
eq("a legacy mes-xxx-xxx id validates", isValidMessageId("mes-3f4-a1b-9c2-8d7"), true);
eq("a non-string does not validate", isValidMessageId(12345), false);

// ── Drift guard: the Express twin must agree ─────────────────────────────────
// Website/lib/completion.js is a deliberate copy (separate package, own
// bundler), so the two are checked against each other rather than shared.
const runtime = require_("../../lib/completion.js");

eq("the express twin accepts the same keys, in the same order",
  runtime.MESSAGE_ID_QUERY_KEYS, [...MESSAGE_ID_QUERY_KEYS]);

eq("the express twin uses the same validity rule",
  runtime.MESSAGE_ID_RE.source, /^[A-Za-z0-9_-]{1,64}$/.source);

for (const params of [
  { messageid: "iLrrhkbgTPLYinW", submissionId: "47019204" },
  { messageId: "abc123" },
  { msg: "second", messageid: "first" },
  { messageid: "  abc123  " },
  { messageid: "../../admin" },
  { messageid: ["abc123", "def456"] },
  { submissionId: "47019204" },
  {},
]) {
  eq(`express twin agrees on ${JSON.stringify(params)}`,
    runtime.messageIdFromParams(params), messageIdFromQuery(params));
}

// The twin is handed req.body, which is absent on a bodyless webhook POST.
eq("the express twin tolerates a missing params object",
  runtime.messageIdFromParams(undefined), null);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
