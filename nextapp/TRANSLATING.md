# Adding a New Language to Samply

This guide covers every file that must be changed to add a new UI language. Work through the steps in order; the build will fail at the end if anything is missing.

Current languages: **English** (`en`), **German** (`de`), **Dutch** (`nl`), **Russian** (`ru`).

---

## How the i18n system works

- **Locale files** (`locales/XX.ts`) — all UI strings for one language. Missing keys fall back to English automatically via `deepMerge` in `lib/i18n.ts`.
- **`lib/i18n.ts`** — central registry: `SUPPORTED_LOCALES`, `LOCALE_NAMES`, `DB_LANG_TO_LOCALE`, `LOCALE_TO_DB_LANG`, and the `MESSAGES` map.
- **`lib/i18n.server.ts`** — server components call `const { t } = await getT()` to get a translation function.
- **`app/components/TranslationProvider.tsx`** — client components call `const { t } = useT()`.
- **Documentation pages** (`app/docs/[page]/*Content.tsx`) — each content file has locale-specific render functions; these are not part of the locale file system.
- **Locale selection** — the user picks a language on the Account page. The server writes a `NEXT_LOCALE` cookie; the `getT()` helper reads it on every request. No middleware routing is needed.

---

## Step-by-step

### Step 1 — Create the locale file

Copy `locales/de.ts` (or `locales/ru.ts`) to `locales/XX.ts`, where `XX` is the two-letter locale code (e.g. `fr`, `es`, `zh`).

```
cp locales/de.ts locales/XX.ts
```

Translate every string value. Rules:
- Keep `{variable}` placeholders exactly as-is (e.g. `{n}`, `{date}`).
- Keep technical values (URLs, numbers, percentages, timestamps) untranslated.
- The type at the top is `DeepLoose<Messages>` — all keys are optional; any key you omit falls back to English at runtime. Translate as many as you can; missing keys will silently show English.
- Do **not** change key names — only values.

The canonical list of all keys is in `locales/en.ts`.

---

### Step 2 — Register the locale in `lib/i18n.ts`

Open `lib/i18n.ts` and make four changes:

**a) Add the import at the top:**
```ts
import XX from "@/locales/XX";
```

**b) Add to `SUPPORTED_LOCALES`:**
```ts
export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "nl", "ru", "XX"];
```

**c) Add to `LOCALE_NAMES`:**
```ts
export const LOCALE_NAMES: Record<Locale, string> = {
  // ...existing...
  XX: "Language Name in that Language",
};
```

**d) Add to `DB_LANG_TO_LOCALE` and `LOCALE_TO_DB_LANG`:**
```ts
export const DB_LANG_TO_LOCALE: Record<string, Locale> = {
  // ...existing...
  language_name: "XX",   // e.g. french: "fr"
};

export const LOCALE_TO_DB_LANG: Record<Locale, string> = {
  // ...existing...
  XX: "language_name",
};
```

**e) Add to the `MESSAGES` map:**
```ts
const MESSAGES: Record<Locale, DeepRecord> = {
  en: en as unknown as DeepRecord,
  de: de as unknown as DeepRecord,
  nl: nl as unknown as DeepRecord,
  ru: ru as unknown as DeepRecord,
  XX: XX as unknown as DeepRecord,
};
```

Also update the `Locale` type (it is inferred from `SUPPORTED_LOCALES`, so this happens automatically if you used a string literal above).

---

### Step 3 — Add the language option to the Account page

Open `app/account/page.tsx` and find the `<select name="language">` element. Add a new `<option>`:

```tsx
<option value="language_name">Language Name</option>
```

The `value` must match the key you added to `DB_LANG_TO_LOCALE` in Step 2 (e.g. `french`, `spanish`).

---

### Step 4 — Translate the 21 documentation content files

Each file in `app/docs/[page]/` handles its own locale dispatch. For every file:

1. Add a dispatch branch **before** the final `return <XContentEn />;` line:
   ```tsx
   if (locale === "XX") return <XContentXx />;
   ```
2. Add a Russian render function `function XContentXx() { ... }` with translated JSX.
3. For files that use **data arrays** (e.g. `GOALS_EN`, `GOALS_DE`), also add an `GOALS_XX` array at module level with the same object shape as the English version.

#### Full list of documentation files

| File | Arrays needed | Special notes |
|------|---------------|---------------|
| `AboutContent.tsx` | `PROBLEMS_XX`, `TIMELINE_XX` | TIMELINE items have a `date` string (translate month names) and an `accent` field (keep as-is) |
| `ApiContent.tsx` | none | Translate headings and prose; keep all endpoint paths, HTTP method names, field names, and code blocks in English |
| `ChangelogContent.tsx` | `TAG_LABEL_XX` (Record) | **Three extra changes:** (1) Add `TAG_LABEL_XX` constant. (2) Update the `fmt()` function to add the new locale code (e.g. `locale === 'XX' ? 'XX-XX' :`). (3) Add a branch to the empty-state ternary inside the async component body. No separate render function — the component is async and fetches data. |
| `EventContingentContent.tsx` | none | Inline JSX only |
| `FirstStudyContent.tsx` | `FORM_FIELDS_XX`, `WORKSPACE_SECTIONS_XX` | |
| `FormContent.tsx` | `SECTIONS_XX`, `TYPE_MATRIX_XX` | |
| `GeofencingContent.tsx` | none | Keep publication details (journal names, DOIs) in original |
| `GlossaryContent.tsx` | `TERMS_XX` | Items have shape `{ term: string; definition: string }`. Uses `Fragment` from React for keyed list rendering. |
| `GroupsContent.tsx` | none | **Dispatch is at the bottom** of the file (after the render functions), not at the top |
| `HomeContent.tsx` | `GOALS_XX`, `STEPS_XX` | `GOALS` items: `{ slug, label, body, cta }`. `STEPS` items: `{ n, title, body }` |
| `InviteContent.tsx` | `JOIN_METHODS_XX`, `PARTICIPANT_TABLE_COLUMNS_XX` | `JOIN_METHODS` items: `{ id, label, when, format, notes[] }` |
| `IrbContent.tsx` | none | Table content and lists; keep IRB/GDPR/technical terms |
| `LegalNoticeContent.tsx` | none | Short; contact info stays the same |
| `PersonalContent.tsx` | `DAY_ROWS_XX`, `EXAMPLES_XX` | `DAY_ROWS` items: `{ day, anchor, note }`. `EXAMPLES` items: `{ title, config[], result }` |
| `PlaceholdersContent.tsx` | `TOKENS_XX`, `TOOLS_XX` | **Dispatch is at the bottom** of the file. `TOKENS` items: `{ token, replaced_with, fallback, example }`. `TOOLS` items: `{ name, steps[], url }` |
| `PolicyContent.tsx` | none | Long legal text; keep GDPR article references and all URLs unchanged; keep `id=` attributes on `<h2>` elements identical |
| `QueueContent.tsx` | `STATUSES_XX`, `COLUMNS_XX` | `STATUSES` items: `{ status, color, label, desc }`. `COLUMNS` items: `{ col, desc }` |
| `RemindersContent.tsx` | none | **The render function takes a `baseUrl` prop.** Pattern: `function RemindersContentXx({ baseUrl }: { baseUrl: string })`. Dispatch: `if (locale === "XX") return <RemindersContentXx baseUrl={baseUrl} />;` |
| `StreamContent.tsx` | `TARGETING_XX` | `TARGETING` items: `{ params, effect }`. The `CODE` constant (JavaScript example) stays in English. |
| `TermsContent.tsx` | none | Long legal text; keep all URLs and contact email unchanged |
| `TypesContent.tsx` | `TYPES_XX`, `COMPARISON_XX` | `TYPES` items: `{ n, name, tag, color, colorSoft, summary, anchor, use[], avoid[], timing, more? }`. Render function uses `const TYPES = TYPES_XX; const COMPARISON = COMPARISON_XX;` pattern. |

---

## Pitfall: curly quotes in JS strings (Turbopack)

When writing Russian (or any language with typographic quotes) inside a **JS double-quoted string**, the characters `"` (U+201C) and `"` (U+201D) terminate the string early and cause a build error that can be hard to diagnose.

**Safe:** JSX text nodes, or single-quoted JS strings.

```tsx
// ❌ Breaks at the " character
const label = "Нажмите "Сохранить"";

// ✅ Single-quoted string
const label = 'Нажмите "Сохранить"';

// ✅ JSX text node (always safe)
<span>Нажмите "Сохранить"</span>
```

---

## Step 5 — Verify

```bash
cd Website/nextapp
npm run build
```

A clean build with no TypeScript errors confirms everything is wired up correctly. Common errors:

| Error | Cause |
|-------|-------|
| `Type '...' is not assignable to type 'Locale'` | Forgot to add `"XX"` to `SUPPORTED_LOCALES` or the `Locale` type |
| `Object literal may only specify known properties` | Array item has wrong field names — check against EN array shape |
| Unterminated string literal | Curly-quote character inside a JS double-quoted string — see pitfall above |
| Build succeeds but Account page still shows old options | Forgot Step 3 (the `<option>` element) |

---

## Checklist

- [ ] `locales/XX.ts` created with all strings translated
- [ ] `lib/i18n.ts`: import added, `SUPPORTED_LOCALES` updated, `LOCALE_NAMES` updated, `DB_LANG_TO_LOCALE` updated, `LOCALE_TO_DB_LANG` updated, `MESSAGES` map updated
- [ ] `app/account/page.tsx`: new `<option>` added to language selector
- [ ] All 21 `app/docs/[page]/*Content.tsx` files: dispatch branch + render function added
- [ ] `ChangelogContent.tsx` specifically: `TAG_LABEL_XX`, `fmt()` locale code, empty-state ternary
- [ ] `npm run build` passes with no errors
