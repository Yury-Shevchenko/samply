import type { Locale } from "@/lib/i18n";
import { ENGLISH, type FaqPage } from "./content.ts";
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
 * Locale → participant FAQ.
 *
 * Kept separate from content.ts so a locale module can import `fromStrings`
 * without a cycle. English is the fallback for any locale not listed.
 */
export const FAQ: Partial<Record<Locale, FaqPage>> = {
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

export function getFaq(locale: Locale): FaqPage {
  return FAQ[locale] ?? ENGLISH;
}

export type { FaqPage, Block, Question, Section, Routing } from "./content.ts";
