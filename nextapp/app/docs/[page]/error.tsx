"use client";

import { useEffect } from "react";
import { useT } from "@/app/components/TranslationProvider";

export default function DocsError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const { t } = useT();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: "48rem", padding: "4rem", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "1.2rem" }}>{t("docsError.label")}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 1.2rem" }}>{t("docsError.heading")}</h2>
        <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "2.4rem" }}>
          {t("docsError.body")}
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", background: "var(--coral)", color: "var(--paper)", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          {t("docsError.tryAgain")}
        </button>
      </div>
    </main>
  );
}
