"use client";

import { usePathname } from "next/navigation";

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
  const base = `/dashboard/${studyId}`;

  return (
    <div className="flex gap-[0.4rem]" style={{ borderBottom: "1px solid var(--ink-10)", paddingBottom: 0 }}>
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
  );
}
