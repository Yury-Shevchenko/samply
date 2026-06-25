/**
 * Shared docs navigation data — the single source of truth for the docs
 * sidebar, page metadata, and section grouping. Imported by the [page] route,
 * the integrations route, and the shared chrome components.
 */

export const SIDEBAR_PAGES = [
  "home", "first-study", "invite",
  "types", "personal", "form", "queue",
  "placeholders", "groups", "reminders",
  "integrations",
  "event-contingent", "geofencing", "stream",
  "analytics",
  "glossary", "api", "changelog", "about", "collaborate",
] as const;
export const ALL_PAGES = [...SIDEBAR_PAGES, "legalnotice", "policy", "terms", "irb", "dpa"] as const;
export type DocsPage = (typeof ALL_PAGES)[number];

export const NAV_LABELS: Record<DocsPage, string> = {
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
  integrations:        "Survey integrations",
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

export const PAGE_TITLES: Record<DocsPage, string> = {
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
  integrations:        "Survey tool integrations",
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

export const PAGE_META: Record<string, { eyebrow: string; lede: string; section: string }> = {
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
  integrations:        { section: "Power features",         eyebrow: "connect your survey tool",                          lede: "Step-by-step guides for passing the Samply IDs into your survey tool and registering completion with a redirect — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap and more." },
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

export const NAV_GROUPS: { label: string; sectionKey: string; pages: (typeof SIDEBAR_PAGES)[number][] }[] = [
  { label: "Get started",            sectionKey: "getStarted",            pages: ["home", "first-study", "invite"] },
  { label: "Notification schedules", sectionKey: "notificationSchedules", pages: ["types", "form", "personal", "queue"] },
  { label: "Power features",         sectionKey: "powerFeatures",         pages: ["placeholders", "groups", "reminders", "integrations"] },
  { label: "Advanced features",      sectionKey: "advancedFeatures",      pages: ["event-contingent", "geofencing", "stream", "analytics"] },
  { label: "Reference",              sectionKey: "reference",             pages: ["glossary", "api", "changelog", "about", "collaborate"] },
];

// Maps each docs page to its sidebar section key
export const PAGE_SECTION_KEY: Partial<Record<DocsPage, string>> = Object.fromEntries(
  NAV_GROUPS.flatMap((g) => g.pages.map((p) => [p, g.sectionKey]))
);
