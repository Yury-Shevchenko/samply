"use client";

import { useRouter } from "next/navigation";
import { useT } from "@/app/components/TranslationProvider";

const NAV_GROUPS: { sectionKey: string; pages: string[] }[] = [
  { sectionKey: "getStarted",            pages: ["home", "first-study", "invite"] },
  { sectionKey: "notificationSchedules", pages: ["types", "form", "personal", "queue"] },
  { sectionKey: "powerFeatures",         pages: ["placeholders", "groups", "reminders", "integrations"] },
  { sectionKey: "advancedFeatures",      pages: ["event-contingent", "geofencing", "stream"] },
  { sectionKey: "reference",             pages: ["glossary", "api", "changelog", "about"] },
];

const PAGE_KEYS = [
  "home", "first-study", "invite", "types", "form", "personal", "queue",
  "placeholders", "groups", "reminders", "integrations", "event-contingent", "geofencing",
  "stream", "glossary", "api", "changelog", "about",
];

export default function DocsMobileNav({ current }: { current: string }) {
  const router = useRouter();
  const { t } = useT();

  const navLabel = (page: string) =>
    t(`docs.navLabels.${page}`) || page;

  const sectionLabel = (key: string) =>
    t(`docs.sections.${key}`) || key;

  return (
    <div className="docs-mobile-nav">
      <select
        value={`/docs/${current}`}
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
          marginBottom: "2.4rem",
        }}
      >
        {NAV_GROUPS.map((grp) => (
          <optgroup key={grp.sectionKey} label={sectionLabel(grp.sectionKey)}>
            {grp.pages.map((p) => (
              <option key={p} value={`/docs/${p}`}>{navLabel(p)}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
