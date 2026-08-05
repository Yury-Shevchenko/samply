// Run with: node --experimental-strip-types lib/placeholders.test.ts  (from nextapp/)
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import {
  checkSurveyUrl,
  surveyUrlErrors,
  canonicalPlaceholder,
  CANONICAL_PLACEHOLDERS,
  PLACEHOLDER_ALIASES,
} from "./placeholders.ts";

const require_ = createRequire(import.meta.url);

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}
const codes = (url: string, ctx = {}) => checkSurveyUrl(url, ctx).map((i) => i.code).sort();

// ── The four cohort failures, as validation cases ────────────────────────────
eq("Murr & Blecher's doubled parameter is rejected",
  codes("https://q.com/f?id=%SAMPLY_ID%?id=%SAMPLY_ID%"),
  ["duplicate-placeholder", "multiple-question-marks"]);

eq("a correct URL is clean",
  codes("https://q.com/f?id=%SAMPLY_ID%&m=%MESSAGE_ID%"), []);

eq("misspelled placeholder is an error",
  codes("https://q.com/f?id=%SAMPLYID%"), ["unknown-placeholder"]);

eq("%PARTICIPANT_ID% (a plausible guess) is caught",
  codes("https://q.com/f?id=%PARTICIPANT_ID%"), ["unknown-placeholder"]);

eq("no identifier + multiple participants warns",
  codes("https://q.com/f", { participantCount: 8 }), ["missing-id-placeholder"]);

eq("no identifier is fine for a single participant",
  codes("https://q.com/f", { participantCount: 1 }), []);

eq("PARTICIPANT_CODE alone satisfies the identifier check",
  codes("https://q.com/f?c=%PARTICIPANT_CODE%", { participantCount: 8 }), []);

eq("reminders without %MESSAGE_ID% warns",
  codes("https://q.com/f?id=%SAMPLY_ID%", { hasReminders: true }), ["missing-message-id"]);

eq("reminders with %MESSAGE_ID% is clean",
  codes("https://q.com/f?id=%SAMPLY_ID%&m=%MESSAGE_ID%", { hasReminders: true }), []);

// ── Aliases warn but do not block ────────────────────────────────────────────
eq("%GROUP_CODE% warns as deprecated", codes("https://q.com/f?g=%GROUP_CODE%"), ["deprecated-alias"]);
eq("%TIMESTAMP% warns as deprecated", codes("https://q.com/f?t=%TIMESTAMP%"), ["deprecated-alias"]);
eq("deprecated alias does not block saving", surveyUrlErrors("https://q.com/f?g=%GROUP_CODE%"), []);

// ── Must not produce false alarms ────────────────────────────────────────────
eq("percent-escapes are not mistaken for placeholders",
  codes("https://q.com/f?q=a%20b&id=%SAMPLY_ID%"), []);
eq("empty url yields nothing", codes(""), []);
eq("url with no placeholders is clean", codes("https://q.com/f?x=1"), []);
eq("a fragment does not trip the second-? check", codes("https://q.com/f?id=%SAMPLY_ID%#p2"), []);

// ── Structural errors ────────────────────────────────────────────────────────
eq("placeholder in the hostname is rejected",
  codes("https://%SAMPLY_ID%.q.com/f"), ["placeholder-in-hostname"]);
eq("same placeholder three times is one error",
  codes("https://q.com/f?a=%SAMPLY_ID%&b=%SAMPLY_ID%&c=%SAMPLY_ID%"), ["duplicate-placeholder"]);

// ── Vocabulary ───────────────────────────────────────────────────────────────
eq("canonicalPlaceholder maps alias", canonicalPlaceholder("TIMESTAMP"), "TIMESTAMP_SENT");
eq("canonicalPlaceholder rejects unknown", canonicalPlaceholder("WAT"), null);

// ── Drift guard: all three copies must agree ─────────────────────────────────
const runtime = require_("../../lib/placeholders.js");

eq("server runtime canonical list matches the validator",
  [...runtime.CANONICAL].sort(), [...CANONICAL_PLACEHOLDERS].sort());

eq("server runtime aliases match the validator",
  runtime.ALIAS_TO_CANONICAL, PLACEHOLDER_ALIASES);

// The mobile app is a separate package with its own bundler, so its copy is
// checked by reading the source rather than importing it.
const appSrc = readFileSync(new URL("../../../App/utils/placeholders.js", import.meta.url), "utf8");
const appCanonical = [...appSrc.matchAll(/^\s*"([A-Z_]+)",$/gm)].map((m) => m[1]);
eq("mobile app canonical list matches the validator",
  [...new Set(appCanonical)].sort(), [...CANONICAL_PLACEHOLDERS].sort());

for (const [alias, canonical] of Object.entries(PLACEHOLDER_ALIASES)) {
  eq(`mobile app declares alias ${alias}`,
    new RegExp(`${alias}:\\s*"${canonical}"`).test(appSrc), true);
}

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
