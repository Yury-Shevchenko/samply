/**
 * Chrome shared by the two completion routes.
 *
 * `[messageId]/page.tsx` is the canonical endpoint; `page.tsx` accepts the
 * query-string form some survey tools are limited to and redirects to it. Both
 * can end up showing a participant an error, and a participant who has just
 * finished a survey should see the same page either way — so the shell and the
 * error state live here rather than being written twice.
 */

const Logo = () => (
  <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", textDecoration: "none" }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: "2.8rem", height: "2.8rem", flexShrink: 0 }}>
      <rect width="120" height="120" rx="22" fill="#23201a" />
      <g fill="#d65a30">
        <circle cx="32" cy="40" r="9" />
        <circle cx="58" cy="32" r="9" />
        <circle cx="84" cy="44" r="9" />
        <circle cx="46" cy="68" r="9" />
        <circle cx="78" cy="82" r="9" />
      </g>
    </svg>
    <span
      className="font-[family-name:var(--font-display)] font-bold"
      style={{ fontSize: "2rem", letterSpacing: "-0.02em", color: "var(--ink)" }}
    >
      Samply
    </span>
  </a>
);

export function CheckIcon() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "5.6rem", height: "5.6rem" }}
    >
      <circle cx="28" cy="28" r="28" fill="rgba(61,115,107,.12)" />
      <path
        d="M16 28.5l8.5 8.5 15.5-17"
        stroke="var(--sage)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "5.6rem", height: "5.6rem" }}
    >
      <circle cx="28" cy="28" r="28" fill="rgba(214,90,48,.1)" />
      <path d="M28 18v14" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2" fill="var(--coral)" />
    </svg>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "2rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
        <Logo />
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2.4rem",
        }}
      >
        <div style={{ maxWidth: "44rem", width: "100%", textAlign: "center" }}>
          {children}
        </div>
      </main>
      <footer style={{ padding: "2rem 2.4rem", borderTop: "1px solid var(--ink-10)", textAlign: "center" }}>
        <span
          className="font-[family-name:var(--font-mono)]"
          style={{ fontSize: "1.1rem", color: "var(--ink-20)", letterSpacing: ".08em" }}
        >
          Samply Research Platform {/* studyDone.platformLabel — kept static in footer */}
        </span>
      </footer>
    </div>
  );
}

/** The full-page error state: alert mark, headline, explanation, optional footnote. */
export function Notice({
  title,
  body,
  footnote,
}: {
  title: string;
  body: string;
  footnote?: string;
}) {
  return (
    <Shell>
      <AlertIcon />
      <h1
        className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "2rem 0 1rem", color: "var(--ink)" }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          lineHeight: 1.6,
          color: "var(--ink-40)",
          fontFamily: "var(--font-body)",
          margin: footnote ? "0 0 2rem" : 0,
        }}
      >
        {body}
      </p>
      {footnote && (
        <p style={{ fontSize: "1.3rem", color: "var(--ink-20)", fontFamily: "var(--font-mono)", letterSpacing: ".04em", margin: 0 }}>
          {footnote}
        </p>
      )}
    </Shell>
  );
}
