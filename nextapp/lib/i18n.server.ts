import { cache } from "react";
import { cookies } from "next/headers";
import { isLocale, createT, type Locale } from "@/lib/i18n";

/**
 * Returns the active locale for the current server request, reading from the
 * NEXT_LOCALE cookie. Memoised per request via React cache().
 *
 * Falls back to "en" if the cookie is absent or invalid.
 */
export const getLocale = cache(async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "";
  return isLocale(lang) ? lang : "en";
});

/**
 * Convenience: await this in server components to get a ready-to-use t().
 */
export async function getT() {
  const locale = await getLocale();
  return { t: createT(locale), locale };
}
