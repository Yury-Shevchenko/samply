/**
 * Builds a survey start URL with the correct Samply placeholders for a given
 * platform, so researchers never hand-assemble one.
 *
 * Hand-assembly is what failed in the field: URLs published in the Summer 2026
 * cohort's reports show a placeholder pasted twice and a second "?" where an "&"
 * belonged, and nothing told the researcher until their export came back with no
 * usable participant identifier.
 *
 * The per-platform parameter names are not defined here. They are *derived* from
 * each integration's `exampleStartUrl` in lib/docs/integrations.ts, which was
 * researched and adversarially verified against the vendor's own documentation.
 * Deriving rather than duplicating means the builder and the integration guide
 * can never disagree.
 */

// Relative, extension-ful imports: this module is covered by a plain
// `node --experimental-strip-types` test, which resolves neither the "@/" alias
// nor extensionless specifiers.
import { INTEGRATIONS, type Integration } from "./docs/integrations.ts";
import { canonicalPlaceholder, type CanonicalPlaceholder } from "./placeholders.ts";

export interface StartParam {
  /** Query-string key this platform expects, e.g. "u_sid" for SoSci. */
  key: string;
  placeholder: CanonicalPlaceholder;
}

/**
 * Extracts the key → placeholder mapping from an example start URL.
 *
 * Pairs whose value is not a placeholder (REDCap's `s=TOKEN`, for instance) are
 * part of the researcher's own survey link and are skipped — they arrive with
 * the URL the researcher pastes in.
 */
export function parseStartParams(exampleStartUrl: string): StartParam[] {
  const q = exampleStartUrl.indexOf("?");
  if (q === -1) return [];

  const params: StartParam[] = [];
  const seen = new Set<CanonicalPlaceholder>();

  for (const pair of exampleStartUrl.slice(q + 1).split("&")) {
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    const key = pair.slice(0, eq);
    const value = pair.slice(eq + 1);
    const m = /^%([A-Z0-9_]+)%$/.exec(value);
    if (!m) continue;
    const placeholder = canonicalPlaceholder(m[1]);
    if (!placeholder || seen.has(placeholder)) continue;
    seen.add(placeholder);
    params.push({ key, placeholder });
  }
  return params;
}

/**
 * Generic fallback for a platform we have not documented. These keys are plain
 * and unreserved; the researcher still has to teach their tool to capture them.
 */
export const GENERIC_START_PARAMS: StartParam[] = [
  { key: "id", placeholder: "SAMPLY_ID" },
  { key: "code", placeholder: "PARTICIPANT_CODE" },
  { key: "msg", placeholder: "MESSAGE_ID" },
];

export interface BuilderPlatform {
  slug: string;
  name: string;
  params: StartParam[];
  /** Reserved-name / ordering caveats worth showing next to the generated URL. */
  warning?: string;
  planNote?: string;
  /** Whether the tool can redirect to Samply at survey end (completion tracking). */
  supportsExternalRedirect: boolean;
  docsHref?: string;
}

const OTHER: BuilderPlatform = {
  slug: "other",
  name: "Other / not listed",
  params: GENERIC_START_PARAMS,
  supportsExternalRedirect: true,
};

function toBuilderPlatform(i: Integration): BuilderPlatform {
  const params = parseStartParams(i.exampleStartUrl);
  return {
    slug: i.slug,
    name: i.name,
    // A documented platform with no parseable example still needs usable keys.
    params: params.length ? params : GENERIC_START_PARAMS,
    warning: i.reservedParamWarning,
    planNote: i.planNote,
    supportsExternalRedirect: i.supportsExternalRedirect,
    docsHref: `/docs/integrations/${i.slug}`,
  };
}

/** Platforms offered in the builder, documented ones first, "Other" last. */
export function builderPlatforms(): BuilderPlatform[] {
  return [...INTEGRATIONS.map(toBuilderPlatform), OTHER];
}

export function getBuilderPlatform(slug: string): BuilderPlatform {
  return builderPlatforms().find((p) => p.slug === slug) ?? OTHER;
}

/**
 * Splits a pasted URL into its parts, tolerating a link the researcher has
 * already added their own query parameters to.
 */
function splitUrl(raw: string): { head: string; query: string; hash: string } | null {
  const url = raw.trim();
  if (!url) return null;

  const hashAt = url.indexOf("#");
  const hash = hashAt === -1 ? "" : url.slice(hashAt);
  const withoutHash = hashAt === -1 ? url : url.slice(0, hashAt);

  const q = withoutHash.indexOf("?");
  if (q === -1) return { head: withoutHash, query: "", hash };
  return { head: withoutHash.slice(0, q), query: withoutHash.slice(q + 1), hash };
}

export interface BuildStartUrlOptions {
  /** Which placeholders to append. Order follows the platform's own example. */
  include: CanonicalPlaceholder[];
}

/**
 * Appends the selected placeholders to `baseUrl` using `platform`'s parameter
 * names, with correct "?" / "&" handling.
 *
 * Any parameter the researcher's pasted link already carries under the same key
 * is replaced rather than duplicated — pasting a link that already contains
 * `?id=%SAMPLY_ID%` and then asking for the participant ID must not produce two
 * `id` parameters.
 */
export function buildStartUrl(
  baseUrl: string,
  platform: BuilderPlatform,
  opts: BuildStartUrlOptions,
): string {
  const parts = splitUrl(baseUrl);
  if (!parts) return "";

  const wanted = platform.params.filter((p) => opts.include.includes(p.placeholder));
  const wantedKeys = new Set(wanted.map((p) => p.key));

  const existing = parts.query
    .split("&")
    .filter((pair) => pair !== "")
    .filter((pair) => !wantedKeys.has(pair.slice(0, Math.max(0, pair.indexOf("=")))));

  const appended = wanted.map((p) => `${p.key}=%${p.placeholder}%`);
  const query = [...existing, ...appended].join("&");

  return parts.head + (query ? "?" + query : "") + parts.hash;
}

/**
 * The completion URL to paste into the survey tool's end-of-survey redirect.
 * `messageIdToken` is the tool's own syntax for echoing back the message id —
 * Qualtrics uses `${e://Field/msg}`, SoSci `%reference%`, and so on, which is
 * why the per-platform integration guide is linked next to it.
 */
export function completionUrlFor(studyCode: string, origin: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/studies/${studyCode}/done/<MESSAGE_ID>`;
}
