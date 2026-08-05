// Run with: node --experimental-strip-types lib/urlBuilder.test.ts  (from nextapp/)
import {
  parseStartParams,
  buildStartUrl,
  builderPlatforms,
  getBuilderPlatform,
  GENERIC_START_PARAMS,
} from "./urlBuilder.ts";
import { checkSurveyUrl } from "./placeholders.ts";
import { INTEGRATIONS } from "./docs/integrations.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

// ── Deriving parameters from the verified integration examples ───────────────
eq("qualtrics keys derived from its example",
  parseStartParams("https://x.qualtrics.com/jfe/form/SV_x?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&msg=%MESSAGE_ID%"),
  [{ key: "id", placeholder: "SAMPLY_ID" },
   { key: "code", placeholder: "PARTICIPANT_CODE" },
   { key: "msg", placeholder: "MESSAGE_ID" }]);

eq("redcap's own s=TOKEN is not mistaken for a placeholder param",
  parseStartParams("https://r/surveys/?s=TOKEN&messageid=%MESSAGE_ID%&samply_id=%SAMPLY_ID%"),
  [{ key: "messageid", placeholder: "MESSAGE_ID" },
   { key: "samply_id", placeholder: "SAMPLY_ID" }]);

eq("sosci's reserved 'r' key is preserved for the message id",
  parseStartParams("https://s.de/p/?r=%MESSAGE_ID%&u_sid=%SAMPLY_ID%")[0],
  { key: "r", placeholder: "MESSAGE_ID" });

eq("a url with no query yields no params", parseStartParams("https://x.com/survey"), []);

// Every documented platform must yield usable parameters.
for (const i of INTEGRATIONS) {
  const p = getBuilderPlatform(i.slug);
  eq(`${i.slug}: builder has at least one parameter`, p.params.length > 0, true);
  eq(`${i.slug}: every parameter key is non-empty`, p.params.every((x) => !!x.key), true);
}

// ── Building ────────────────────────────────────────────────────────────────
const qualtrics = getBuilderPlatform("qualtrics");
const ALL = ["SAMPLY_ID", "PARTICIPANT_CODE", "MESSAGE_ID"] as const;

eq("appends to a bare url with '?'",
  buildStartUrl("https://q.com/jfe/form/SV_x", qualtrics, { include: [...ALL] }),
  "https://q.com/jfe/form/SV_x?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&msg=%MESSAGE_ID%");

eq("appends to a url that already has a parameter, using '&'",
  buildStartUrl("https://q.com/f?Q_lang=EN", qualtrics, { include: ["SAMPLY_ID"] }),
  "https://q.com/f?Q_lang=EN&id=%SAMPLY_ID%");

eq("only the selected placeholders are added",
  buildStartUrl("https://q.com/f", qualtrics, { include: ["SAMPLY_ID", "MESSAGE_ID"] }),
  "https://q.com/f?id=%SAMPLY_ID%&msg=%MESSAGE_ID%");

eq("re-pasting an already-built url does not duplicate parameters",
  buildStartUrl("https://q.com/f?id=%SAMPLY_ID%", qualtrics, { include: ["SAMPLY_ID", "MESSAGE_ID"] }),
  "https://q.com/f?id=%SAMPLY_ID%&msg=%MESSAGE_ID%");

eq("a fragment stays at the end",
  buildStartUrl("https://q.com/f#start", qualtrics, { include: ["SAMPLY_ID"] }),
  "https://q.com/f?id=%SAMPLY_ID%#start");

eq("selecting nothing returns the url unchanged",
  buildStartUrl("https://q.com/f?x=1", qualtrics, { include: [] }),
  "https://q.com/f?x=1");

eq("empty base yields empty string", buildStartUrl("", qualtrics, { include: [...ALL] }), "");
eq("whitespace is trimmed",
  buildStartUrl("  https://q.com/f  ", qualtrics, { include: ["SAMPLY_ID"] }),
  "https://q.com/f?id=%SAMPLY_ID%");

eq("unknown platform falls back to generic keys",
  getBuilderPlatform("nope").params, GENERIC_START_PARAMS);

// ── The builder's output must satisfy the validator, for every platform ──────
for (const p of builderPlatforms()) {
  const built = buildStartUrl("https://example.com/survey", p, {
    include: p.params.map((x) => x.placeholder),
  });
  const errors = checkSurveyUrl(built, { participantCount: 10, hasReminders: true })
    .filter((i) => i.level === "error");
  eq(`${p.slug}: generated url passes validation`, errors, []);
}

// The doubled-parameter mistake is unreachable through the builder.
eq("builder output never contains a second '?'",
  builderPlatforms().every((p) => {
    const u = buildStartUrl("https://e.com/s?a=1", p, { include: p.params.map((x) => x.placeholder) });
    return u.split("?").length === 2;
  }), true);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
