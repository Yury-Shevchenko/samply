import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getT } from "@/lib/i18n.server";
import DocsSearch from "./DocsSearch";
import HomeContent from "./HomeContent";
import FirstStudyContent from "./FirstStudyContent";
import InviteContent from "./InviteContent";
import TypesContent from "./TypesContent";
import PersonalContent from "./PersonalContent";
import FormContent from "./FormContent";
import QueueContent from "./QueueContent";
import PlaceholdersContent from "./PlaceholdersContent";
import GroupsContent from "./GroupsContent";
import RemindersContent from "./RemindersContent";
import GlossaryContent from "./GlossaryContent";
import ApiContent from "./ApiContent";
import ChangelogContent from "./ChangelogContent";
import LegalNoticeContent from "./LegalNoticeContent";
import PolicyContent from "./PolicyContent";
import TermsContent from "./TermsContent";
import IrbContent from "./IrbContent";
import DpaContent from "./DpaContent";
import EventContingentContent from "./EventContingentContent";
import GeofencingContent from "./GeofencingContent";
import StreamContent from "./StreamContent";
import AboutContent from "./AboutContent";
import AnalyticsContent from "./AnalyticsContent";
import CollaborateContent from "./CollaborateContent";
import DocsMobileNav from "./DocsMobileNav";

/* ── Route config ─────────────────────────────────────────────────────────── */

const SIDEBAR_PAGES = [
  "home", "first-study", "invite",
  "types", "personal", "form", "queue",
  "placeholders", "groups", "reminders",
  "event-contingent", "geofencing", "stream",
  "analytics",
  "glossary", "api", "changelog", "about", "collaborate",
] as const;
const ALL_PAGES = [...SIDEBAR_PAGES, "legalnotice", "policy", "terms", "irb", "dpa"] as const;
type DocsPage = (typeof ALL_PAGES)[number];

const NAV_LABELS: Record<DocsPage, string> = {
  home:                "Welcome",
  "first-study":       "Your first study",
  invite:              "Inviting participants",
  types:               "The four types",
  personal:            "Personal (event-based)",
  form:                "Creating a schedule",
  queue:               "The scheduled queue",
  placeholders:        "URL placeholders",
  groups:              "Groups",
  reminders:           "Reminders",
  "event-contingent":  "Event-contingent design",
  geofencing:          "Geofencing",
  stream:              "Stream API",
  analytics:           "Analytics",
  glossary:            "Glossary",
  api:                 "API",
  changelog:           "Changelog",
  about:               "About Samply",
  collaborate:         "Collaborate",
  legalnotice:         "Legal Notice",
  policy:              "Privacy Policy",
  terms:               "Terms & Conditions",
  irb:                 "IRB / Ethics Brief",
  dpa:                 "Data Processing Agreement",
};

const PAGE_TITLES: Record<DocsPage, string> = {
  home:                "Getting started",
  "first-study":       "Your first study",
  invite:              "Inviting participants",
  types:               "The four schedule types",
  personal:            "Personal scheduling — Day N, after registration",
  form:                "Creating a schedule, one section at a time",
  queue:               "The scheduled queue",
  placeholders:        "URL placeholders",
  groups:              "Groups",
  reminders:           "Reminders",
  "event-contingent":  "Event-contingent design",
  geofencing:          "Geofencing",
  stream:              "Stream API",
  analytics:           "Analytics — monitoring a study while it runs",
  glossary:            "Glossary",
  api:                 "API",
  changelog:           "Changelog",
  about:               "History & motivation",
  collaborate:         "Collaborate with the Samply team",
  legalnotice:         "Legal Notice",
  policy:              "Privacy Policy",
  terms:               "Terms & Conditions",
  irb:                 "IRB & Ethics Brief",
  dpa:                 "Data Processing Agreement",
};

const PAGE_META: Record<string, { eyebrow: string; lede: string; section: string }> = {
  home:         { section: "Get started",            eyebrow: "read the manual ✦",                                 lede: "Samply schedules push notifications to study participants on a flexible, repeating cadence. It works for any longitudinal design — daily diaries, experience-sampling, intervention studies, clinical trials — wherever you need to reach participants more than once." },
  "first-study":{ section: "Get started",            eyebrow: "your workspace",                                    lede: "Studies are the containers for everything in Samply — participants, schedules, and response history all live inside one." },
  invite:       { section: "Get started",            eyebrow: "growing the cohort",                                lede: "Participants join by tapping a link or scanning a QR code in the Samply Research app. You never see their contact details." },
  types:        { section: "Notification schedules", eyebrow: "four ways to time a ping",                          lede: "Every notification in Samply belongs to a schedule, and every schedule is one of four types. Pick wrong and you'll fight your own data." },
  personal:     { section: "Notification schedules", eyebrow: "time, but bent to each participant",                lede: "Personal schedules attach to the participant, not the calendar. Day 1 means the day they joined." },
  form:         { section: "Notification schedules", eyebrow: "the form, section by section",                      lede: "The schedule form follows a fixed order: Content, Timezone, Participants, Time, Date. Choosing a recurring Date pattern reveals three more sections — Month, Start, and Stop." },
  queue:        { section: "Notification schedules", eyebrow: "the operational view",                              lede: "Every schedule expands into a queue: one row per participant per send time." },
  placeholders: { section: "Power features",         eyebrow: "for qualtrics, redcap, lime — anything with a url", lede: "Before opening the Web Link, Samply substitutes any %PLACEHOLDER% tokens with that participant's real values." },
  groups:       { section: "Power features",         eyebrow: "splitting your cohort",                             lede: "Groups let you send different schedules to different subsets of participants within the same study." },
  reminders:           { section: "Power features",         eyebrow: "the follow-up ping",                                lede: "Reminders are optional follow-up notifications sent when Samply has not detected a completion." },
  "event-contingent":  { section: "Advanced features",     eyebrow: "participant-initiated reports",                     lede: "Event-contingent designs let participants self-initiate a report the moment a target event occurs, rather than waiting for a scheduled ping." },
  geofencing:          { section: "Advanced features",     eyebrow: "location as the trigger",                          lede: "Geofencing sends a notification automatically when a participant enters or leaves a defined geographic area — no clock, no cron." },
  stream:              { section: "Advanced features",     eyebrow: "your systems, in real time",                       lede: "The Stream API delivers participant events to your infrastructure as they happen, via outbound webhooks." },
  analytics:           { section: "Advanced features",     eyebrow: "the study, while it's still running",               lede: "Compliance, response times, dropout, and per-participant engagement — built around documented threats to ESM validity, not generic product-analytics templates." },
  collaborate:         { section: "Reference",              eyebrow: "papers in return for support",                      lede: "Samply offers co-authorship to research teams in exchange for help running their study or building the features they need." },
  glossary:            { section: "Reference",             eyebrow: "the vocabulary",                                   lede: "Key terms used throughout Samply and this documentation." },
  api:          { section: "Reference",              eyebrow: "for the builders",                                  lede: "Samply exposes a REST API for programmatic study management and advanced integrations." },
  changelog:    { section: "Reference",              eyebrow: "what changed",                                      lede: "A running record of meaningful changes to the Samply platform." },
  about:        { section: "Reference",              eyebrow: "where it came from",                                lede: "Why Samply was built, the problems it set out to solve, and how the platform has evolved since 2019." },
};

const NAV_GROUPS: { label: string; sectionKey: string; pages: (typeof SIDEBAR_PAGES)[number][] }[] = [
  { label: "Get started",            sectionKey: "getStarted",            pages: ["home", "first-study", "invite"] },
  { label: "Notification schedules", sectionKey: "notificationSchedules", pages: ["types", "form", "personal", "queue"] },
  { label: "Power features",         sectionKey: "powerFeatures",         pages: ["placeholders", "groups", "reminders"] },
  { label: "Advanced features",      sectionKey: "advancedFeatures",      pages: ["event-contingent", "geofencing", "stream", "analytics"] },
  { label: "Reference",              sectionKey: "reference",             pages: ["glossary", "api", "changelog", "about", "collaborate"] },
];

// Maps each docs page to its sidebar section key
const PAGE_SECTION_KEY: Partial<Record<DocsPage, string>> = Object.fromEntries(
  NAV_GROUPS.flatMap((g) => g.pages.map((p) => [p, g.sectionKey]))
);

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const { t } = await getT();
  const label = t(`docs.navLabels.${page}`) || NAV_LABELS[page as DocsPage] || "Documentation";
  return { title: `${label} — Samply Docs` };
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */

function DocsSidebar({ current, navLabels, groupLabels, searchPlaceholder }: { current: string; navLabels: Record<DocsPage, string>; groupLabels: Record<string, string>; searchPlaceholder: string }) {
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

function DocsPageHeader({ section, eyebrow, title, lede, navLabel }: { section: string; eyebrow: string; title: string; lede: string; navLabel: string }) {
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

/* ── Main page ────────────────────────────────────────────────────────────── */

export default async function DocsSubPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!ALL_PAGES.includes(page as DocsPage)) notFound();

  const { t, locale } = await getT();
  const navLabels = Object.fromEntries(
    ALL_PAGES.map((p) => [p, t(`docs.navLabels.${p}`) || NAV_LABELS[p]])
  ) as Record<DocsPage, string>;
  const searchPlaceholder = t("docs.searchPlaceholder");

  // Translated sidebar group labels
  const groupLabels = Object.fromEntries(
    NAV_GROUPS.map((g) => [g.sectionKey, t(`docs.sections.${g.sectionKey}`) || g.label])
  ) as Record<string, string>;

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const baseUrl = host.startsWith("localhost") ? `http://${host}` : `https://${host}`;

  const currentPage = page as DocsPage;
  const isLegal = !SIDEBAR_PAGES.includes(currentPage as (typeof SIDEBAR_PAGES)[number]);

  // Translated page header parts
  const pageTitle = t(`docs.pageTitles.${currentPage}`) || PAGE_TITLES[currentPage];
  const rawMeta = PAGE_META[currentPage];
  const sectionKey = PAGE_SECTION_KEY[currentPage];
  const translatedSection = sectionKey ? (groupLabels[sectionKey] ?? rawMeta?.section ?? "") : (rawMeta?.section ?? "");
  const translatedEyebrow = t(`docs.pageEyebrows.${currentPage}`) || rawMeta?.eyebrow || "";
  const translatedLede = t(`docs.pageLedes.${currentPage}`) || rawMeta?.lede || "";

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "108rem", margin: "0 auto", padding: "5.6rem var(--page-px) 10rem" }}>
        {isLegal ? (
          <div style={{ maxWidth: "68rem" }}>
            <a href="/docs/home" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← docs</a>
            <div style={{ marginTop: "3.2rem" }} className="docs-prose">
              <h1 className="font-[family-name:var(--font-display)]" style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 2.4rem" }}>{pageTitle}</h1>
              {currentPage === "legalnotice" ? (
                <LegalNoticeContent locale={locale} />
              ) : currentPage === "policy" ? (
                <PolicyContent locale={locale} />
              ) : currentPage === "terms" ? (
                <TermsContent locale={locale} />
              ) : currentPage === "irb" ? (
                <IrbContent locale={locale} />
              ) : currentPage === "dpa" ? (
                <DpaContent />
              ) : (
                <p style={{ color: "var(--ink-60)" }}>Content coming soon.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="docs-layout" style={{ display: "flex", gap: "6rem", alignItems: "flex-start" }}>
            <DocsSidebar current={currentPage} navLabels={navLabels} groupLabels={groupLabels} searchPlaceholder={searchPlaceholder} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <DocsMobileNav current={currentPage} />
              <DocsPageHeader section={translatedSection} eyebrow={translatedEyebrow} title={pageTitle} lede={translatedLede} navLabel={navLabels[currentPage] ?? pageTitle} />
              <article className="docs-prose">
                {currentPage === "home" ? (
                  <HomeContent locale={locale} />
                ) : currentPage === "first-study" ? (
                  <FirstStudyContent locale={locale} />
                ) : currentPage === "invite" ? (
                  <InviteContent locale={locale} />
                ) : currentPage === "types" ? (
                  <TypesContent locale={locale} />
                ) : currentPage === "personal" ? (
                  <PersonalContent locale={locale} />
                ) : currentPage === "form" ? (
                  <FormContent locale={locale} />
                ) : currentPage === "queue" ? (
                  <QueueContent locale={locale} />
                ) : currentPage === "placeholders" ? (
                  <PlaceholdersContent locale={locale} />
                ) : currentPage === "groups" ? (
                  <GroupsContent locale={locale} />
                ) : currentPage === "reminders" ? (
                  <RemindersContent baseUrl={baseUrl} locale={locale} />
                ) : currentPage === "glossary" ? (
                  <GlossaryContent locale={locale} />
                ) : currentPage === "api" ? (
                  <ApiContent locale={locale} />
                ) : currentPage === "event-contingent" ? (
                  <EventContingentContent locale={locale} />
                ) : currentPage === "geofencing" ? (
                  <GeofencingContent locale={locale} />
                ) : currentPage === "stream" ? (
                  <StreamContent locale={locale} />
                ) : currentPage === "analytics" ? (
                  <AnalyticsContent locale={locale} />
                ) : currentPage === "changelog" ? (
                  <ChangelogContent locale={locale} />
                ) : currentPage === "about" ? (
                  <AboutContent locale={locale} />
                ) : currentPage === "collaborate" ? (
                  <CollaborateContent locale={locale} />
                ) : (
                  <p style={{ fontSize: "1.4rem", lineHeight: 1.65, color: "var(--ink-60)" }}>
                    Content for this section is being written. Check back soon.
                  </p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
