"use client";

import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { label: "Overview",     suffix: "" },
  { label: "Participants", suffix: "/participants" },
  { label: "Schedule",     suffix: "/schedule" },
  { label: "History",      suffix: "/data" },
  { label: "Invitations",  suffix: "/invitations" },
  { label: "Settings",     suffix: "/settings" },
  { label: "Approval",     suffix: "/approval" },
  { label: "Stream API",   suffix: "/api" },
] as const;

export default function StudyTabNav({ studyId }: { studyId: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const base = `/dashboard/${studyId}`;

  const activeTab = TABS.find(({ suffix }) =>
    suffix === ""
      ? pathname === base || pathname === base + "/"
      : pathname.startsWith(base + suffix)
  ) ?? TABS[0];

  return (
    <>
      {/* Desktop: tab bar */}
      <div className="study-tab-nav-desktop" style={{ borderBottom: "1px solid var(--ink-10)" }}>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {TABS.map(({ label, suffix }) => {
            const href = base + suffix;
            const isActive = suffix === ""
              ? pathname === base || pathname === base + "/"
              : pathname.startsWith(href);

            return (
              <a
                key={label}
                href={href}
                style={{
                  display: "inline-block",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  fontSize: "1.25rem",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "var(--font-body)",
                  padding: "0.7rem 1.4rem",
                  marginBottom: -1,
                  borderRadius: "6px 6px 0 0",
                  textDecoration: "none",
                  color: isActive ? "var(--ink)" : "var(--ink-60)",
                  background: isActive ? "var(--surface)" : "transparent",
                  border: isActive ? "1px solid var(--ink-10)" : "1px solid transparent",
                  borderBottom: isActive ? "1px solid var(--surface)" : "1px solid transparent",
                  transition: "color .12s",
                }}
                className={isActive ? "" : "hover:text-[var(--ink)] transition-colors"}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile: select dropdown */}
      <div className="study-tab-nav-mobile" style={{ marginBottom: "0.4rem" }}>
        <select
          value={base + activeTab.suffix}
          onChange={(e) => router.push(e.target.value)}
          style={{
            width: "100%",
            padding: "0.9rem 1.2rem",
            fontSize: "1.4rem",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "var(--ink)",
            background: "var(--surface)",
            border: "1px solid var(--ink-20)",
            borderRadius: "0.8rem",
            appearance: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2323201a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1.2rem center",
            paddingRight: "3rem",
            cursor: "pointer",
          }}
        >
          {TABS.map(({ label, suffix }) => (
            <option key={suffix} value={base + suffix}>{label}</option>
          ))}
        </select>
      </div>
    </>
  );
}
