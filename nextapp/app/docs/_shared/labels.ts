import { getT } from "@/lib/i18n.server";
import { ALL_PAGES, NAV_GROUPS, NAV_LABELS, type DocsPage } from "./nav";

/**
 * Builds the translated docs chrome labels (sidebar nav + group headings +
 * search placeholder) for the current request locale. Shared by the [page]
 * docs route and the integrations route so the sidebar is identical on both.
 */
export async function getDocsChrome() {
  const { t, locale } = await getT();

  const navLabels = Object.fromEntries(
    ALL_PAGES.map((p) => [p, t(`docs.navLabels.${p}`) || NAV_LABELS[p]])
  ) as Record<DocsPage, string>;

  const groupLabels = Object.fromEntries(
    NAV_GROUPS.map((g) => [g.sectionKey, t(`docs.sections.${g.sectionKey}`) || g.label])
  ) as Record<string, string>;

  const searchPlaceholder = t("docs.searchPlaceholder");

  return { t, locale, navLabels, groupLabels, searchPlaceholder };
}
