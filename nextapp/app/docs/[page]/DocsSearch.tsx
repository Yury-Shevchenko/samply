"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Entry = {
  slug: string;
  label: string;
  title: string;
  section: string;
  lede: string;
};

const INDEX: Entry[] = [
  { slug: "home",         label: "Welcome",                section: "Get started",            title: "Samply, by what you're trying to do",            lede: "Samply schedules push notifications for ESM studies. The dashboard runs the cron, your phone delivers the ping, your survey tool catches the tap." },
  { slug: "first-study",  label: "Your first study",       section: "Get started",            title: "Your first study",                               lede: "Studies are the containers for everything in Samply — participants, schedules, and response history all live inside one." },
  { slug: "invite",        label: "Inviting participants",  section: "Get started",            title: "Inviting participants",                          lede: "Participants join by tapping a link or scanning a QR code in the Samply Research app. You never see their contact details." },
  { slug: "types",         label: "The four types",         section: "Notification schedules", title: "The four schedule types",                        lede: "Every notification in Samply belongs to a schedule, and every schedule is one of four types. Pick wrong and you'll fight your own data." },
  { slug: "personal",      label: "Personal (event-based)", section: "Notification schedules", title: "Personal scheduling — Day N, after registration", lede: "Personal schedules attach to the participant, not the calendar. Day 1 means the day they joined." },
  { slug: "form",          label: "Creating a schedule",    section: "Notification schedules", title: "Creating a schedule, one section at a time",     lede: "The schedule form follows a tight order: Content, Type, Audience, Options." },
  { slug: "queue",         label: "The scheduled queue",    section: "Notification schedules", title: "The scheduled queue",                            lede: "Every schedule expands into a queue: one row per participant per send time." },
  { slug: "placeholders",  label: "URL placeholders",       section: "Power features",         title: "URL placeholders",                               lede: "Samply substitutes %PLACEHOLDER% tokens with each participant's real values before opening the survey link." },
  { slug: "groups",        label: "Groups & cohorts",       section: "Power features",         title: "Groups & cohorts",                               lede: "Groups let you send different schedules to different subsets of participants within the same study." },
  { slug: "reminders",     label: "Reminders",              section: "Power features",         title: "Reminders",                                      lede: "Reminders are optional follow-up notifications sent when Samply has not detected a completion." },
  { slug: "glossary",      label: "Glossary",               section: "Reference",              title: "Glossary",                                       lede: "Key terms used throughout Samply and this documentation." },
  { slug: "api",           label: "API",                    section: "Reference",              title: "API",                                            lede: "Samply exposes a REST API for programmatic study management and advanced integrations." },
  { slug: "changelog",     label: "Changelog",              section: "Reference",              title: "Changelog",                                      lede: "A running record of meaningful changes to the Samply platform." },
];

function hl(text: string, q: string) {
  if (!q.trim()) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: "rgba(214,90,48,0.18)", color: "var(--coral)", borderRadius: "0.2rem", padding: "0 1px" }}>
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function DocsSearch() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel]     = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const router   = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const results = query.trim()
    ? INDEX.filter(e =>
        [e.label, e.title, e.lede, e.section].some(f =>
          f.toLowerCase().includes(query.toLowerCase())
        )
      )
    : INDEX;

  const close = useCallback(() => { setOpen(false); setQuery(""); setSel(0); }, []);
  const go    = useCallback((slug: string) => { close(); router.push(`/docs/${slug}`); }, [close, router]);

  /* ⌘K / Ctrl+K */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* focus input on open */
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  /* reset selection when query changes */
  useEffect(() => { setSel(0); }, [query]);

  /* scroll selected item into view */
  useEffect(() => {
    (listRef.current?.children[sel] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[sel]) go(results[sel].slug);
    if (e.key === "Escape") close();
  };

  const modal = (
    <div
      onClick={e => { if (e.target === e.currentTarget) close(); }}
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh", background: "rgba(20,18,14,0.72)" }}
    >
      <div
        onKeyDown={onKey}
        style={{ width: "min(56rem, 94vw)", background: "var(--paper)", border: "1px solid var(--ink-20)", borderRadius: "1rem", boxShadow: "0 24px 72px rgba(35,32,26,0.32)", overflow: "hidden", display: "flex", flexDirection: "column" }}
      >
        {/* input */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.4rem 1.6rem", borderBottom: "1px solid var(--ink-10)" }}>
          <span style={{ color: "var(--coral)", fontSize: "1.6rem", flexShrink: 0 }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the manual…"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "1.6rem", color: "var(--ink)", fontFamily: "var(--font-display)" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--ink-40)", fontSize: "1.4rem", lineHeight: 1, padding: "2px 6px", borderRadius: "0.3rem" }}>✕</button>
          )}
          <kbd onClick={close} style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", border: "1px solid var(--ink-20)", padding: "2px 7px", borderRadius: "0.3rem", cursor: "pointer" }}>esc</kbd>
        </div>

        {/* results */}
        <div ref={listRef} style={{ maxHeight: "58vh", overflowY: "auto" }}>
          {results.length === 0 ? (
            <p style={{ padding: "3.2rem", textAlign: "center", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.2rem", margin: 0 }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((e, i) => (
              <button
                key={e.slug}
                onClick={() => go(e.slug)}
                onMouseEnter={() => setSel(i)}
                style={{ width: "100%", display: "flex", gap: "1.6rem", padding: "1.1rem 1.6rem", border: "none", borderBottom: "1px solid var(--ink-10)", borderLeft: `2px solid ${i === sel ? "var(--coral)" : "transparent"}`, background: i === sel ? "var(--coral-soft)" : "transparent", cursor: "pointer", textAlign: "left", alignItems: "center" }}
              >
                <div style={{ width: "11rem", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.25rem" }}>{e.section}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: i === sel ? "var(--coral)" : "var(--ink)" }}>{hl(e.label, query)}</div>
                </div>
                <div style={{ flex: 1, fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
                  {hl(e.lede, query)}
                </div>
                <span style={{ color: i === sel ? "var(--coral)" : "var(--ink-20)", fontSize: "1.2rem", flexShrink: 0 }}>→</span>
              </button>
            ))
          )}
        </div>

        {/* footer */}
        <div style={{ padding: "0.75rem 1.6rem", borderTop: "1px solid var(--ink-10)", display: "flex", gap: "1.6rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--ink-40)" }}>
          {[["↑↓", "navigate"], ["↵", "open"], ["esc", "close"]].map(([k, label]) => (
            <span key={k}><kbd style={{ border: "1px solid var(--ink-20)", borderRadius: "0.25rem", padding: "1px 5px" }}>{k}</kbd> {label}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{ width: "100%", padding: "0.8rem 1rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", display: "flex", alignItems: "center", gap: "0.8rem", background: "var(--surface)", marginBottom: "2rem", cursor: "text", textAlign: "left" }}
      >
        <span style={{ color: "var(--coral)", fontSize: "1.2rem" }}>⌕</span>
        <span style={{ fontSize: "1.2rem", color: "var(--ink-40)", flex: 1 }}>search the manual</span>
        <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--ink-40)", border: "1px solid var(--ink-20)", padding: "1px 4px", borderRadius: "0.3rem" }}>⌘K</kbd>
      </button>

      {/* modal — portalled to document.body to escape any stacking context */}
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
