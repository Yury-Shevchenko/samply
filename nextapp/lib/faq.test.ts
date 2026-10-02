// Run with: node --experimental-strip-types lib/faq.test.ts  (from nextapp/)
//
// The participant FAQ carries the same prose in fourteen languages, with the
// troubleshooting page's tiny inline markup. These checks catch markup a
// translator broke, a translation that drifted out of structural sync with
// English, and a question anchor that changed — anchors are pasted into support
// replies, so renaming one silently breaks links already sent.
import { FAQ, type FaqPage } from "../app/docs/[page]/faq/index.ts";
import { toStrings } from "../app/docs/[page]/faq/content.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

const LOCALES = Object.keys(FAQ) as (keyof typeof FAQ)[];
const en = FAQ.en!;

// ── Every supported locale has a translation ─────────────────────────────────
// Mirrors SUPPORTED_LOCALES in lib/i18n.ts, which cannot be imported here: it
// pulls in "@/locales", an alias plain node does not resolve.
const SUPPORTED_LOCALES = ["en", "de", "nl", "ru", "zh", "ko", "it", "fr", "es", "pt", "ja", "tr", "pl", "ar"] as const;
eq("every supported locale is translated", [...SUPPORTED_LOCALES].filter((l) => !FAQ[l]), []);

// ── Markup is well formed ────────────────────────────────────────────────────
const BOLD = /\*\*/g, CODE = /`/g;
const LINK = /\[([^\]]*)\]\(([^)]*)\)/g;

for (const loc of LOCALES) {
  const bad: string[] = [];

  toStrings(FAQ[loc]!).forEach((text, i) => {
    if (!text.trim()) bad.push(`#${i}: empty`);
    if ((text.match(BOLD) ?? []).length % 2 !== 0) bad.push(`#${i}: unbalanced **`);
    if ((text.match(CODE) ?? []).length % 2 !== 0) bad.push(`#${i}: unbalanced backtick`);
    // A lone asterisk left after removing bold pairs would start an italic run.
    if ((text.replace(/\*\*/g, "").match(/\*/g) ?? []).length % 2 !== 0) bad.push(`#${i}: unbalanced *`);
    const brackets = (text.match(/\[/g) ?? []).length;
    const links = [...text.matchAll(LINK)].length;
    if (brackets !== links) bad.push(`#${i}: ${brackets} "[" but ${links} well-formed link(s)`);
    for (const [, label, href] of text.matchAll(LINK)) {
      if (!label.trim()) bad.push(`#${i}: link with empty label`);
      if (!/^(https?:\/\/|\/|mailto:)/.test(href)) bad.push(`#${i}: suspicious href "${href}"`);
    }
    if (/\s{2,}/.test(text)) bad.push(`#${i}: doubled whitespace`);
    if (text !== text.trim()) bad.push(`#${i}: leading/trailing whitespace`);
  });

  eq(`${loc}: markup is well formed`, bad, []);
}

// ── Translations mirror English structurally ─────────────────────────────────
function shape(page: FaqPage) {
  return {
    intro: page.intro.length,
    researcher: page.routing.researcherItems.length,
    samply: page.routing.samplyItems.length,
    sections: page.sections.map((s) => s.questions.map((q) =>
      `${q.id}:` + q.blocks.map((b) => (b.kind === "list" ? `list${b.items.length}` : b.kind)).join(","),
    )),
  };
}
for (const loc of LOCALES) {
  if (loc === "en") continue;
  eq(`${loc}: structure matches English`, shape(FAQ[loc]!), shape(en));
}

// ── Links, code spans and bold spans survive translation ─────────────────────
// Hrefs and code are technical; the number of bold spans per string is a cheap
// proxy for "every app UI label is still marked as one".
function tokens(page: FaqPage) {
  return toStrings(page).map((text) => ({
    hrefs: [...text.matchAll(LINK)].map((m) => m[2]),
    codes: [...text.matchAll(/`([^`]+)`/g)].map((m) => m[1]),
    bold: (text.match(BOLD) ?? []).length / 2,
  }));
}
const enTokens = tokens(en);
for (const loc of LOCALES) {
  if (loc === "en") continue;
  eq(`${loc}: links, code and bold spans match English`, tokens(FAQ[loc]!), enTokens);
}

// ── Anchors ──────────────────────────────────────────────────────────────────
const ids = en.sections.flatMap((s) => s.questions.map((q) => q.id));
eq("question ids are unique", ids.length, new Set(ids).size);
eq("question ids are URL-safe", ids.filter((id) => !/^[a-z0-9-]+$/.test(id)), []);
// Pinned: these are linked from support replies. Add new ids freely; never
// rename or remove one.
const PUBLISHED = [
  "contact-researcher", "no-contact", "what-to-include", "samply-id",
  "no-notifications", "wrong-time", "too-many", "missed",
  "survey-error", "not-marked-done", "change-answers",
  "join", "code-not-found", "leave", "payment",
  "forgot-password", "change-email", "what-researchers-see", "delete-account", "download-data",
  "contact-samply",
];
eq("no published anchor was removed", PUBLISHED.filter((id) => !ids.includes(id)), []);
const internalAnchors = toStrings(en).flatMap((t) => [...t.matchAll(/\]\(\/docs\/faq#([^)]+)\)/g)].map((m) => m[1]));
eq("in-page links point at real questions", internalAnchors.filter((id) => !ids.includes(id)), []);

console.log(`\ncovering ${LOCALES.length} locale(s), ${toStrings(en).length} strings each`);
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
