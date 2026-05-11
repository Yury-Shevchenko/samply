"use client";

import { useState } from "react";

export default function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "1.1rem",
        letterSpacing: ".06em",
        padding: "0.5rem 1.4rem",
        borderRadius: "9999px",
        border: copied ? "1px solid rgba(61,115,107,.3)" : "1px solid var(--ink-20)",
        background: copied ? "rgba(61,115,107,.08)" : "transparent",
        color: copied ? "var(--sage)" : "var(--ink-60)",
        cursor: "pointer",
        transition: "all .15s",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
