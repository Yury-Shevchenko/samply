import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getT } from "@/lib/i18n.server";
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
import IntegrationsContent from "./IntegrationsContent";
import DocsMobileNav from "../_shared/DocsMobileNav";
import { DocsSidebar, DocsPageHeader } from "../_shared/DocsChrome";
import {
  SIDEBAR_PAGES, ALL_PAGES, NAV_LABELS, PAGE_TITLES, PAGE_META, NAV_GROUPS, PAGE_SECTION_KEY,
  type DocsPage,
} from "../_shared/nav";

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const { t } = await getT();
  const label = t(`docs.navLabels.${page}`) || NAV_LABELS[page as DocsPage] || "Documentation";
  return { title: `${label} — Samply Docs` };
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
                <DpaContent locale={locale} />
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
                ) : currentPage === "integrations" ? (
                  <IntegrationsContent locale={locale} />
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
