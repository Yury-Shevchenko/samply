"use client";

import { createContext, useContext, useMemo } from "react";
import { createT, type Locale } from "@/lib/i18n";

interface TranslationCtx {
  locale: Locale;
  t: ReturnType<typeof createT>;
}

const Ctx = createContext<TranslationCtx | null>(null);

export function TranslationProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: createT(locale) }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Use inside any client component to get the current locale and t() function. */
export function useT(): TranslationCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT must be used within <TranslationProvider>");
  return ctx;
}
