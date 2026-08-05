// Run with: node lib/placeholders.test.js   (from Website/)
const { substitutePlaceholders, canonicalName, findTokens } = require("./placeholders");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = got === want;
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

const FULL = {
  SAMPLY_ID: "abc123",
  PARTICIPANT_CODE: "P07",
  MESSAGE_ID: "msg9",
  GROUP_ID: "grpA",
  TIMESTAMP_SENT: 1700000000000,
  BATCH: 3,
};

// ── The regression that lost four studies' person-level analyses ──────────────
eq("single placeholder",
  substitutePlaceholders("https://s.com/?id=%SAMPLY_ID%", FULL),
  "https://s.com/?id=abc123");

eq("repeated placeholder replaces ALL occurrences (was: first only)",
  substitutePlaceholders("https://s.com/?a=%SAMPLY_ID%&b=%SAMPLY_ID%", FULL),
  "https://s.com/?a=abc123&b=abc123");

eq("Murr & Blecher's doubled parameter no longer leaks a literal placeholder",
  substitutePlaceholders("https://s.com/?id=%SAMPLY_ID%?id=%SAMPLY_ID%", FULL),
  "https://s.com/?id=abc123?id=abc123");

eq("all placeholders at once",
  substitutePlaceholders("https://s.com/?i=%SAMPLY_ID%&c=%PARTICIPANT_CODE%&m=%MESSAGE_ID%&g=%GROUP_ID%&t=%TIMESTAMP_SENT%&b=%BATCH%", FULL),
  "https://s.com/?i=abc123&c=P07&m=msg9&g=grpA&t=1700000000000&b=3");

// ── Aliases the docs and the schedule editor advertised ───────────────────────
eq("%GROUP_CODE% alias resolves to the group id",
  substitutePlaceholders("https://s.com/?g=%GROUP_CODE%", FULL),
  "https://s.com/?g=grpA");

eq("%TIMESTAMP% alias resolves to send time",
  substitutePlaceholders("https://s.com/?t=%TIMESTAMP%", FULL),
  "https://s.com/?t=1700000000000");

// ── Missing values: drop the parameter, never emit a raw placeholder ──────────
const NO_GROUP = Object.assign({}, FULL, { GROUP_ID: undefined });
eq("ungrouped participant: group param dropped, id preserved",
  substitutePlaceholders("https://s.com/?id=%SAMPLY_ID%&group=%GROUP_ID%", NO_GROUP),
  "https://s.com/?id=abc123");

eq("the documented example URL survives an ungrouped participant",
  substitutePlaceholders(
    "https://s.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%", NO_GROUP),
  "https://s.com/?id=abc123&code=P07&time=1700000000000");

eq("dropping the only parameter removes the '?' too",
  substitutePlaceholders("https://s.com/x?group=%GROUP_ID%", NO_GROUP),
  "https://s.com/x");

eq("missing code does not strand a literal placeholder",
  substitutePlaceholders("https://s.com/?c=%PARTICIPANT_CODE%&i=%SAMPLY_ID%",
    Object.assign({}, FULL, { PARTICIPANT_CODE: "" })),
  "https://s.com/?i=abc123");

eq("unresolved placeholder in a path segment is stripped, not left broken",
  substitutePlaceholders("https://s.com/g/%GROUP_ID%/x", NO_GROUP),
  "https://s.com/g//x");

eq("fragment is preserved when a param is dropped",
  substitutePlaceholders("https://s.com/?id=%SAMPLY_ID%&g=%GROUP_ID%#page2", NO_GROUP),
  "https://s.com/?id=abc123#page2");

// ── Encoding ─────────────────────────────────────────────────────────────────
eq("participant code with '&' cannot inject a parameter",
  substitutePlaceholders("https://s.com/?c=%PARTICIPANT_CODE%&i=%SAMPLY_ID%",
    Object.assign({}, FULL, { PARTICIPANT_CODE: "a&b=c" })),
  "https://s.com/?c=a%26b%3Dc&i=abc123");

eq("participant code with '#' cannot truncate the query",
  substitutePlaceholders("https://s.com/?c=%PARTICIPANT_CODE%&i=%SAMPLY_ID%",
    Object.assign({}, FULL, { PARTICIPANT_CODE: "x#y" })),
  "https://s.com/?c=x%23y&i=abc123");

eq("spaces are encoded",
  substitutePlaceholders("https://s.com/?c=%PARTICIPANT_CODE%",
    Object.assign({}, FULL, { PARTICIPANT_CODE: "two words" })),
  "https://s.com/?c=two%20words");

// ── Things that must be left alone ───────────────────────────────────────────
eq("unknown placeholder is preserved for the authoring-time validator to flag",
  substitutePlaceholders("https://s.com/?x=%NOT_A_THING%&i=%SAMPLY_ID%", FULL),
  "https://s.com/?x=%NOT_A_THING%&i=abc123");

eq("existing percent-escapes are not corrupted",
  substitutePlaceholders("https://s.com/?q=a%20b&i=%SAMPLY_ID%", FULL),
  "https://s.com/?q=a%20b&i=abc123");

eq("url with no placeholders is untouched",
  substitutePlaceholders("https://s.com/survey?x=1", FULL),
  "https://s.com/survey?x=1");

eq("empty url yields empty string, never undefined",
  substitutePlaceholders(undefined, FULL), "");

eq("zero is a real value, not 'missing'",
  substitutePlaceholders("https://s.com/?b=%BATCH%", Object.assign({}, FULL, { BATCH: 0 })),
  "https://s.com/?b=0");

// ── Vocabulary ───────────────────────────────────────────────────────────────
eq("canonicalName maps alias", canonicalName("GROUP_CODE"), "GROUP_ID");
eq("canonicalName passes through canonical", canonicalName("SAMPLY_ID"), "SAMPLY_ID");
eq("canonicalName rejects unknown", canonicalName("NOPE"), null);
eq("findTokens counts duplicates", findTokens("%SAMPLY_ID%/%SAMPLY_ID%").length, 2);
eq("findTokens ignores unknown", findTokens("%NOPE%").length, 0);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
