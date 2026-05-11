"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "1rem",
        padding: "0.3rem 1rem",
        border: "1px solid var(--ink-20)",
        borderRadius: "9999px",
        background: copied ? "rgba(61,115,107,.08)" : "var(--surface)",
        color: copied ? "var(--sage)" : "var(--ink-60)",
        cursor: "pointer",
        transition: "all .15s",
        flexShrink: 0,
      }}
    >
      {copied ? "✓ Copied" : label}
    </button>
  );
}
