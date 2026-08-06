// Run with: node --experimental-strip-types lib/troubleshooting.test.ts  (from nextapp/)
//
// The troubleshooting page carries the same prose in fourteen languages, with a
// tiny inline markup translators have to preserve by hand. These checks catch
// the two things that actually go wrong: markup a translator broke, and a
// translation that silently drifted out of structural sync with English.
import { TROUBLESHOOTING, type Block, type TroubleshootingPage } from "../app/docs/[page]/troubleshooting/index.ts";

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

const LOCALES = Object.keys(TROUBLESHOOTING) as (keyof typeof TROUBLESHOOTING)[];
const en = TROUBLESHOOTING.en!;

/** Every translatable string on the page, with a path for error reporting. */
function strings(page: TroubleshootingPage): { path: string; text: string }[] {
  const out: { path: string; text: string }[] = [];
  page.intro.forEach((t, i) => out.push({ path: `intro[${i}]`, text: t }));
  page.sections.forEach((s, si) => {
    out.push({ path: `s${si}.heading`, text: s.heading });
    s.blocks.forEach((b, bi) => {
      const p = `s${si}.b${bi}`;
      if (b.kind === "p" || b.kind === "callout") out.push({ path: p, text: b.text });
      if (b.kind === "list") b.items.forEach((it, i) => out.push({ path: `${p}.i${i}`, text: it }));
      if (b.kind === "card") {
        out.push({ path: `${p}.title`, text: b.title });
        b.paras.forEach((pa, i) => {
          if (pa.label) out.push({ path: `${p}.p${i}.label`, text: pa.label });
          out.push({ path: `${p}.p${i}`, text: pa.text });
        });
      }
    });
  });
  return out;
}

/** Structural fingerprint — what a translation must reproduce exactly. */
function shape(page: TroubleshootingPage) {
  const blockShape = (b: Block) =>
    b.kind === "card" ? `card:${b.paras.length}:${b.paras.map((p) => (p.label ? 1 : 0)).join("")}`
    : b.kind === "list" ? `list:${b.ordered ? "ol" : "ul"}:${b.items.length}`
    : b.kind;
  return {
    intro: page.intro.length,
    sections: page.sections.map((s) => s.blocks.map(blockShape)),
  };
}

// ── Markup is well formed ────────────────────────────────────────────────────
const BOLD = /\*\*/g, CODE = /`/g;
const LINK = /\[([^\]]*)\]\(([^)]*)\)/g;

for (const loc of LOCALES) {
  const page = TROUBLESHOOTING[loc]!;
  const bad: string[] = [];

  for (const { path, text } of strings(page)) {
    if ((text.match(BOLD) ?? []).length % 2 !== 0) bad.push(`${path}: unbalanced **`);
    if ((text.match(CODE) ?? []).length % 2 !== 0) bad.push(`${path}: unbalanced backtick`);
    // A stray bracket that is not part of a well-formed link would render as
    // literal text and look like a mistake to the reader.
    const brackets = (text.match(/\[/g) ?? []).length;
    const links = [...text.matchAll(LINK)].length;
    if (brackets !== links) bad.push(`${path}: ${brackets} "[" but ${links} well-formed link(s)`);
    for (const [, label, href] of text.matchAll(LINK)) {
      if (!label.trim()) bad.push(`${path}: link with empty label`);
      if (!/^(https?:\/\/|\/)/.test(href)) bad.push(`${path}: suspicious href "${href}"`);
    }
    if (/\s{2,}/.test(text)) bad.push(`${path}: doubled whitespace`);
    if (text !== text.trim()) bad.push(`${path}: leading/trailing whitespace`);
  }

  eq(`${loc}: markup is well formed`, bad, []);
}

// ── Translations mirror English structurally ─────────────────────────────────
for (const loc of LOCALES) {
  if (loc === "en") continue;
  eq(`${loc}: structure matches English`, shape(TROUBLESHOOTING[loc]!), shape(en));
}

// ── Links and code spans survive translation ─────────────────────────────────
// Hrefs and code spans are technical, not prose: a translated `%SAMPLY_ID%` or a
// rewritten /docs/ path would send researchers somewhere that does not exist.
function technicalTokens(page: TroubleshootingPage) {
  const hrefs: string[] = [], codes: string[] = [];
  for (const { text } of strings(page)) {
    for (const [, , href] of text.matchAll(LINK)) hrefs.push(href);
    for (const m of text.matchAll(/`([^`]+)`/g)) codes.push(m[1]);
  }
  return { hrefs: hrefs.sort(), codes: codes.sort() };
}
const enTokens = technicalTokens(en);
for (const loc of LOCALES) {
  if (loc === "en") continue;
  eq(`${loc}: links and code spans are untranslated`, technicalTokens(TROUBLESHOOTING[loc]!), enTokens);
}

// ── The English page itself is sane ──────────────────────────────────────────
eq("english has all seven sections", en.sections.length, 7);
eq("dontkillmyapp.com is linked", strings(en).some((s) => s.text.includes("dontkillmyapp.com")), true);
eq("the unrecoverable case is called out", en.sections.some((s) => s.blocks.some((b) => b.kind === "callout")), true);

console.log(`\ncovering ${LOCALES.length} locale(s), ${strings(en).length} strings each`);
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
