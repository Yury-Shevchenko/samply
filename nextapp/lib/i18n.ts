import en from "@/locales/en";
import de from "@/locales/de";
import nl from "@/locales/nl";
import ru from "@/locales/ru";
import zh from "@/locales/zh";
import ko from "@/locales/ko";
import it from "@/locales/it";
import fr from "@/locales/fr";
import es from "@/locales/es";
import pt from "@/locales/pt";
import ja from "@/locales/ja";
import tr from "@/locales/tr";
import pl from "@/locales/pl";
import ar from "@/locales/ar";
import type { Messages } from "@/locales/en";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Locale = "en" | "de" | "nl" | "ru" | "zh" | "ko" | "it" | "fr" | "es" | "pt" | "ja" | "tr" | "pl" | "ar";

export const SUPPORTED_LOCALES: Locale[] = ["en", "de", "nl", "ru", "zh", "ko", "it", "fr", "es", "pt", "ja", "tr", "pl", "ar"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
  ru: "Русский",
  zh: "中文",
  ko: "한국어",
  it: "Italiano",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ja: "日本語",
  tr: "Türkçe",
  pl: "Polski",
  ar: "العربية",
};

// Map the value stored in user.language (DB) → Locale code
export const DB_LANG_TO_LOCALE: Record<string, Locale> = {
  english: "en",
  german:  "de",
  dutch:   "nl",
  russian: "ru",
  chinese: "zh",
  korean:  "ko",
  italian: "it",
  french:  "fr",
  spanish:    "es",
  portuguese: "pt",
  japanese:   "ja",
  turkish:    "tr",
  polish:     "pl",
  arabic:     "ar",
};

// Map Locale code → value used in user.language (DB)
export const LOCALE_TO_DB_LANG: Record<Locale, string> = {
  en: "english",
  de: "german",
  nl: "dutch",
  ru: "russian",
  zh: "chinese",
  ko: "korean",
  it: "italian",
  fr: "french",
  es: "spanish",
  pt: "portuguese",
  ja: "japanese",
  tr: "turkish",
  pl: "polish",
  ar: "arabic",
};

// ── Locale detection ──────────────────────────────────────────────────────────

export function isLocale(v: string): v is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(v);
}

// ── Messages / translation ────────────────────────────────────────────────────

type DeepRecord = { [k: string]: string | DeepRecord | readonly (string | DeepRecord)[] };

const MESSAGES: Record<Locale, DeepRecord> = {
  en: en as unknown as DeepRecord,
  de: de as unknown as DeepRecord,
  nl: nl as unknown as DeepRecord,
  ru: ru as unknown as DeepRecord,
  zh: zh as unknown as DeepRecord,
  ko: ko as unknown as DeepRecord,
  it: it as unknown as DeepRecord,
  fr: fr as unknown as DeepRecord,
  es: es as unknown as DeepRecord,
  pt: pt as unknown as DeepRecord,
  ja: ja as unknown as DeepRecord,
  tr: tr as unknown as DeepRecord,
  pl: pl as unknown as DeepRecord,
  ar: ar as unknown as DeepRecord,
};

function lookup(obj: DeepRecord, parts: string[]): string | undefined {
  let cur: string | DeepRecord | readonly (string | DeepRecord)[] = obj;
  for (const part of parts) {
    if (typeof cur !== "object" || cur === null) return undefined;
    if (Array.isArray(cur)) {
      const idx = Number(part);
      cur = cur[idx];
    } else {
      cur = (cur as DeepRecord)[part];
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

/**
 * Returns a translation function for the given locale.
 *
 * Usage:
 *   const t = createT("de");
 *   t("login.title")              // "Willkommen zurück"
 *   t("dashboard.myStudiesLabel", { n: 3 })  // "Meine Studien · 3"
 */
export function createT(locale: Locale) {
  const primary = MESSAGES[locale] ?? MESSAGES.en;
  const fallback = MESSAGES.en;

  return function t(key: string, vars?: Record<string, string | number>): string {
    const parts = key.split(".");
    const raw = lookup(primary, parts) ?? lookup(fallback, parts) ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
  };
}

function deepMerge(base: DeepRecord, override: DeepRecord): DeepRecord {
  const result: DeepRecord = { ...base };
  for (const key in override) {
    const b = base[key];
    const o = override[key];
    if (o === undefined) continue;
    if (
      typeof o === "object" && !Array.isArray(o) &&
      typeof b === "object" && !Array.isArray(b)
    ) {
      result[key] = deepMerge(b as DeepRecord, o as DeepRecord);
    } else {
      result[key] = o;
    }
  }
  return result;
}

/**
 * Returns the full messages object for a locale, deep-merged with English
 * so that any missing sections or keys fall back to English values.
 */
export function getMessages(locale: Locale): Messages {
  if (locale === "en") return en as unknown as Messages;
  const merged = deepMerge(MESSAGES.en, MESSAGES[locale]);
  return merged as unknown as Messages;
}

