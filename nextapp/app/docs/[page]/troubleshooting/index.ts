import type { Locale } from "@/lib/i18n";
import { ENGLISH, type TroubleshootingPage } from "./content.ts";
import de from "./de.ts";
import nl from "./nl.ts";
import fr from "./fr.ts";
import it from "./it.ts";
import es from "./es.ts";
import pt from "./pt.ts";
import ru from "./ru.ts";
import pl from "./pl.ts";
import tr from "./tr.ts";
import zh from "./zh.ts";
import ja from "./ja.ts";
import ko from "./ko.ts";
import ar from "./ar.ts";

/**
 * Locale → troubleshooting page.
 *
 * Kept separate from content.ts so a locale module can import `fromStrings`
 * without a cycle: content.ts must finish initialising `en` before any locale
 * file builds itself from the English skeleton.
 *
 * English is the fallback for any locale not listed, including locales added to
 * the app before their translation lands.
 */
export const TROUBLESHOOTING: Partial<Record<Locale, TroubleshootingPage>> = {
  en: ENGLISH,
  de,
  nl,
  fr,
  it,
  es,
  pt,
  ru,
  pl,
  tr,
  zh,
  ja,
  ko,
  ar,
};

export function getTroubleshooting(locale: Locale): TroubleshootingPage {
  return TROUBLESHOOTING[locale] ?? ENGLISH;
}

export type { TroubleshootingPage, Block, Para, Section } from "./content.ts";
