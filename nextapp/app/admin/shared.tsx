/* Shared components for admin data tables */

export const TH_STYLE: React.CSSProperties = {
  padding: "0.9rem 1.4rem",
  textAlign: "left",
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "var(--ink-40)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: "var(--paper)",
  whiteSpace: "nowrap",
  borderBottom: "1px solid var(--ink-10)",
};

export const TD_STYLE: React.CSSProperties = {
  padding: "0.9rem 1.4rem",
  fontSize: "1.25rem",
  color: "var(--ink-60)",
  borderBottom: "1px solid var(--ink-10)",
  whiteSpace: "nowrap",
  maxWidth: "22rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const TD_MONO: React.CSSProperties = {
  ...TD_STYLE,
  fontFamily: "var(--font-mono)",
  fontSize: "1.15rem",
  color: "var(--ink-40)",
};

type Header = string | { label: string; sort: string };

export function AdminTable({
  headers, children, sort, dir, buildSortHref,
}: {
  headers: Header[];
  children: React.ReactNode;
  sort?: string;
  dir?: string;
  buildSortHref?: (field: string, nextDir: string) => string;
}) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "1.2rem", border: "1px solid var(--ink-10)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
        <thead>
          <tr>
            {headers.map((h) => {
              const label = typeof h === "string" ? h : h.label;
              const key = typeof h === "string" ? undefined : h.sort;
              const isActive = key && sort === key;
              const nextDir = isActive && dir === "asc" ? "desc" : "asc";
              const arrow = isActive ? (dir === "asc" ? " ↑" : " ↓") : "";

              if (key && buildSortHref) {
                return (
                  <th key={label} style={TH_STYLE}>
                    <a
                      href={buildSortHref(key, nextDir)}
                      style={{ color: isActive ? "var(--ink)" : "inherit", textDecoration: "none", cursor: "pointer", whiteSpace: "nowrap" }}
                    >
                      {label}{arrow}
                    </a>
                  </th>
                );
              }
              return <th key={label} style={TH_STYLE}>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function AdminPage({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <main>
      <div style={{ maxWidth: 1920, margin: "0 auto", padding: "36px var(--page-px) 80px" }}>
        <div style={{ marginBottom: "2.8rem" }}>
          <h1
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "2.6rem", letterSpacing: "-0.02em" }}
          >
            {title}
            {count !== undefined && (
              <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--ink-40)", marginLeft: "1rem" }}>
                {count.toLocaleString()}
              </span>
            )}
          </h1>
        </div>
        {children}
      </div>
    </main>
  );
}

export function AdminPagination({
  page, pages, count, buildHref,
}: {
  page: number;
  pages: number;
  count: number;
  buildHref: (p: number) => string;
}) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-between" style={{ marginTop: "1.6rem" }}>
      <span style={{ fontSize: "1.2rem", color: "var(--ink-40)" }}>
        {count.toLocaleString()} total · page {page} of {pages}
      </span>
      <div style={{ display: "flex", gap: "0.8rem" }}>
        {page > 1 && (
          <a
            href={buildHref(page - 1)}
            style={{
              fontSize: "1.25rem",
              color: "var(--ink-60)",
              textDecoration: "none",
              padding: "0.5rem 1.2rem",
              border: "1px solid var(--ink-20)",
              borderRadius: "99.9rem",
            }}
          >
            ← Prev
          </a>
        )}
        {page < pages && (
          <a
            href={buildHref(page + 1)}
            style={{
              fontSize: "1.25rem",
              color: "var(--ink-60)",
              textDecoration: "none",
              padding: "0.5rem 1.2rem",
              border: "1px solid var(--ink-20)",
              borderRadius: "99.9rem",
            }}
          >
            Next →
          </a>
        )}
      </div>
    </div>
  );
}

export function DeleteButton({ action }: { action: (fd: FormData) => void }) {
  return (
    <form action={action} style={{ margin: 0 }}>
      <button
        type="submit"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.2rem 0.6rem",
          fontSize: "1.4rem",
          color: "var(--ink-40)",
          borderRadius: "0.4rem",
          lineHeight: 1,
        }}
        title="Delete"
      >
        ×
      </button>
    </form>
  );
}

export function fmt(d?: Date) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "2-digit",
  });
}

export function truncate(s?: string, n = 40) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "…" : s;
}
