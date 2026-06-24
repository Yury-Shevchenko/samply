"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/components/TranslationProvider";

const DISMISS_KEY = "samply-cookie-notice-dismissed";

/**
 * Lightweight transparency notice. Samply uses only essential (authentication)
 * cookies, so this is a notice — not a consent gate — shown once and dismissed
 * to localStorage. No tracking/analytics cookies are set.
 */
export default function CookieNotice() {
  const { t } = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Client-only: localStorage isn't available during SSR, so the dismissed
    // state can only be read after mount.
    try {
      if (!localStorage.getItem(DISMISS_KEY)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(true);
      }
    } catch {
      /* localStorage unavailable — just don't show */
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: "var(--surface)",
        borderTop: "1px solid var(--ink-10)",
        padding: "1.2rem var(--page-px)",
        display: "flex",
        gap: "1.2rem",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        boxShadow: "0 -0.2rem 1.2rem rgba(35,32,26,.06)",
      }}
    >
      <span style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.5, maxWidth: "60rem" }}>
        {t("cookie.notice")}{" "}
        <Link href="/docs/policy" style={{ color: "var(--ink)", textDecoration: "underline" }}>
          {t("cookie.learnMore")}
        </Link>
      </span>
      <button
        onClick={dismiss}
        style={{
          fontSize: "1.2rem",
          padding: "0.5rem 1.4rem",
          background: "var(--ink)",
          color: "var(--paper)",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          flexShrink: 0,
        }}
      >
        {t("cookie.dismiss")}
      </button>
    </div>
  );
}
