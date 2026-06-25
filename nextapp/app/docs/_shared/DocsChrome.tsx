import DocsSearch from "./DocsSearch";
import { NAV_GROUPS, type DocsPage } from "./nav";

/* ── Sidebar ──────────────────────────────────────────────────────────────── */

export function DocsSidebar({ current, navLabels, groupLabels, searchPlaceholder }: { current: string; navLabels: Record<DocsPage, string>; groupLabels: Record<string, string>; searchPlaceholder: string }) {
  return (
    <aside className="docs-sidebar" style={{ width: "22rem", flexShrink: 0, position: "sticky", top: "8rem", maxHeight: "calc(100vh - 10rem)", overflowY: "auto", scrollbarWidth: "none", paddingBottom: "4rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.6rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: "2.6rem", height: "2.6rem", flexShrink: 0 }}>
          <rect width="120" height="120" rx="22" fill="#23201a" />
          <g fill="#d65a30">
            <circle cx="32" cy="40" r="9" />
            <circle cx="58" cy="32" r="9" />
            <circle cx="84" cy="44" r="9" />
            <circle cx="46" cy="68" r="9" />
            <circle cx="78" cy="82" r="9" />
          </g>
        </svg>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)" }}>Samply</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", border: "1px solid var(--coral)", padding: "2px 6px", borderRadius: "0.4rem", marginLeft: "auto" }}>docs</span>
      </div>
      <DocsSearch placeholder={searchPlaceholder} />
      <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {NAV_GROUPS.map((grp) => (
          <div key={grp.sectionKey}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>{groupLabels[grp.sectionKey] ?? grp.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {grp.pages.map((p) => {
                const on = p === current;
                return (
                  <a key={p} href={`/docs/${p}`} style={{ display: "block", padding: "0.55rem 0.9rem 0.55rem 1rem", borderRadius: "0.6rem", fontSize: "1.35rem", fontWeight: on ? 600 : 400, textDecoration: "none", color: on ? "var(--coral)" : "var(--ink-60)", background: on ? "var(--coral-soft)" : "transparent", borderLeft: on ? "2px solid var(--coral)" : "2px solid transparent", transition: "all 0.12s" }}>
                    {navLabels[p]}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div style={{ marginTop: "2.8rem", paddingTop: "1.6rem", borderTop: "1px solid var(--ink-10)", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        {(["legalnotice", "policy", "terms", "irb", "dpa"] as const).map((p) => (
          <a key={p} href={`/docs/${p}`} style={{ display: "block", padding: "0.5rem 1rem", fontSize: "1.2rem", color: "var(--ink-40)", textDecoration: "none" }}>{navLabels[p]}</a>
        ))}
      </div>
    </aside>
  );
}

/* ── Page header ──────────────────────────────────────────────────────────── */

export function DocsPageHeader({ section, eyebrow, title, lede, navLabel }: { section: string; eyebrow: string; title: string; lede: string; navLabel: string }) {
  return (
    <div style={{ marginBottom: "3.6rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-40)", display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1.2rem" }}>
        <a href="/docs/home" style={{ color: "var(--ink-40)", textDecoration: "none" }}>docs</a>
        <span>/</span>
        <span style={{ color: "var(--ink-60)" }}>{section}</span>
        <span>/</span>
        <span style={{ color: "var(--coral)" }}>{navLabel}</span>
      </div>
      <div className="font-[family-name:var(--font-hand)]" style={{ fontSize: "1.7rem", color: "var(--coral)", marginBottom: "0.4rem", transform: "rotate(-0.5deg)", display: "inline-block" }}>{eyebrow}</div>
      <h1 className="docs-page-h1 font-[family-name:var(--font-display)]" style={{ fontSize: "3.8rem", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 700, margin: "0 0 1.2rem", color: "var(--ink)" }}>{title}.</h1>
      <p style={{ fontSize: "1.5rem", lineHeight: 1.55, color: "var(--ink-60)", margin: 0, maxWidth: "56rem" }}>{lede}</p>
    </div>
  );
}
