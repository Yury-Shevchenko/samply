"use client";

import { useRouter } from "next/navigation";

const NAV_GROUPS: { label: string; pages: string[] }[] = [
  { label: "Get started",            pages: ["home", "first-study", "invite"] },
  { label: "Notification schedules", pages: ["types", "form", "personal", "queue"] },
  { label: "Power features",         pages: ["placeholders", "groups", "reminders"] },
  { label: "Advanced features",      pages: ["event-contingent", "geofencing", "stream"] },
  { label: "Reference",              pages: ["glossary", "api", "changelog", "about"] },
];

const NAV_LABELS: Record<string, string> = {
  home:               "Welcome",
  "first-study":      "Your first study",
  invite:             "Inviting participants",
  types:              "The four types",
  personal:           "Personal (event-based)",
  form:               "Creating a schedule",
  queue:              "The scheduled queue",
  placeholders:       "URL placeholders",
  groups:             "Groups",
  reminders:          "Reminders",
  "event-contingent": "Event-contingent design",
  geofencing:         "Geofencing",
  stream:             "Stream API",
  glossary:           "Glossary",
  api:                "API",
  changelog:          "Changelog",
  about:              "About Samply",
};

export default function DocsMobileNav({ current }: { current: string }) {
  const router = useRouter();

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
          <optgroup key={grp.label} label={grp.label}>
            {grp.pages.map((p) => (
              <option key={p} value={`/docs/${p}`}>{NAV_LABELS[p] ?? p}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
