/**
 * Authoring-time validation for survey URLs containing Samply placeholders.
 *
 * The runtime counterpart lives in Website/lib/placeholders.js (CommonJS, used
 * by the Express send paths) with a further copy in App/utils/placeholders.js.
 * This module holds the same vocabulary plus the checks that only make sense
 * while a human is still looking at the form. placeholders.test.ts asserts the
 * vocabularies have not drifted apart.
 *
 * Why this exists: four studies in the Summer 2026 cohort permanently lost their
 * person-level analyses to URL mistakes that nothing in the pipeline detected —
 * a placeholder written twice, a second "?" where an "&" belonged, and ID
 * placeholders omitted entirely. All of them are visible in the string at the
 * moment it is typed.
 */

/** Placeholders the send paths know how to fill. Keep in sync with the runtime module. */
export const CANONICAL_PLACEHOLDERS = [
  "SAMPLY_ID",
  "PARTICIPANT_CODE",
  "MESSAGE_ID",
  "GROUP_ID",
  "TIMESTAMP_SENT",
  "BATCH",
] as const;

export type CanonicalPlaceholder = (typeof CANONICAL_PLACEHOLDERS)[number];

/** Accepted older spellings → canonical name. Keep in sync with the runtime module. */
export const PLACEHOLDER_ALIASES: Record<string, CanonicalPlaceholder> = {
  GROUP_CODE: "GROUP_ID",
  TIMESTAMP: "TIMESTAMP_SENT",
};

const TOKEN_RE = /%([A-Z0-9_]+)%/g;

export function canonicalPlaceholder(name: string): CanonicalPlaceholder | null {
  if ((CANONICAL_PLACEHOLDERS as readonly string[]).includes(name)) {
    return name as CanonicalPlaceholder;
  }
  return PLACEHOLDER_ALIASES[name] ?? null;
}

export interface UrlIssue {
  /** `error` blocks saving; `warning` is advisory and does not block. */
  level: "error" | "warning";
  code:
    | "unknown-placeholder"
    | "duplicate-placeholder"
    | "multiple-question-marks"
    | "deprecated-alias"
    | "missing-id-placeholder"
    | "missing-message-id"
    | "placeholder-in-hostname";
  /** English text. The form renders its own localized copy keyed on `code`. */
  message: string;
  /** The offending token, where there is one. */
  token?: string;
}

export interface UrlCheckContext {
  /** Enrolled participants. With more than one, an ID placeholder is expected. */
  participantCount?: number;
  /** Whether this schedule configures reminders (which need %MESSAGE_ID% to stop). */
  hasReminders?: boolean;
}

/**
 * Inspects a survey URL and reports what will go wrong.
 *
 * Deliberately conservative about what counts as an `error`: a researcher who
 * genuinely wants an unusual URL must not be locked out of their own study. Only
 * mistakes with no plausible legitimate reading block the save.
 */
export function checkSurveyUrl(raw: string | null | undefined, ctx: UrlCheckContext = {}): UrlIssue[] {
  const url = (raw ?? "").trim();
  if (!url) return [];

  const issues: UrlIssue[] = [];
  const seen = new Map<string, number>();
  const canonicalSeen = new Set<CanonicalPlaceholder>();

  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(url)) !== null) {
    const token = m[0];
    const name = m[1];
    const canonical = canonicalPlaceholder(name);

    if (!canonical) {
      // Skip things that are really percent-escapes rather than placeholders,
      // e.g. the "%20%" inside "a%20%SAMPLY_ID%".
      if (/^[0-9A-F]{2}$/i.test(name)) continue;
      issues.push({
        level: "error",
        code: "unknown-placeholder",
        token,
        message: `${token} is not a Samply placeholder and will be sent to your survey exactly as written. Valid placeholders: ${CANONICAL_PLACEHOLDERS.map((p) => `%${p}%`).join(", ")}.`,
      });
      continue;
    }

    seen.set(token, (seen.get(token) ?? 0) + 1);
    canonicalSeen.add(canonical);

    if (name !== canonical && !issues.some((i) => i.code === "deprecated-alias" && i.token === token)) {
      issues.push({
        level: "warning",
        code: "deprecated-alias",
        token,
        message: `${token} still works, but %${canonical}% is the current name.`,
      });
    }
  }

  for (const [token, count] of seen) {
    if (count > 1) {
      issues.push({
        level: "error",
        code: "duplicate-placeholder",
        token,
        message: `${token} appears ${count} times. Each placeholder should appear once — a repeated one usually means a parameter was pasted twice.`,
      });
    }
  }

  // A second "?" is the classic symptom of hand-appending a second parameter.
  // Everything after it is swallowed into the previous parameter's value.
  const queryStart = url.indexOf("?");
  if (queryStart !== -1 && url.indexOf("?", queryStart + 1) !== -1) {
    issues.push({
      level: "error",
      code: "multiple-question-marks",
      message:
        'This URL contains more than one "?". Only the first starts the query string — separate any further parameters with "&".',
    });
  }

  // A placeholder before the first "/" after the scheme would land in the
  // hostname, which cannot work.
  const afterScheme = url.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
  const hostPart = afterScheme.split(/[/?#]/)[0];
  if (hostPart.includes("%")) {
    issues.push({
      level: "error",
      code: "placeholder-in-hostname",
      message: "A placeholder cannot be used in the domain name — it belongs in the path or the query string.",
    });
  }

  const hasIdentifier = canonicalSeen.has("SAMPLY_ID") || canonicalSeen.has("PARTICIPANT_CODE");
  if (!hasIdentifier && (ctx.participantCount ?? 0) > 1) {
    issues.push({
      level: "warning",
      code: "missing-id-placeholder",
      message:
        "This URL carries no participant identifier, so your survey export will not show which response came from whom. Add %SAMPLY_ID% to link responses to participants.",
    });
  }

  if (ctx.hasReminders && !canonicalSeen.has("MESSAGE_ID")) {
    issues.push({
      level: "warning",
      code: "missing-message-id",
      message:
        "Reminders are configured but this URL has no %MESSAGE_ID%. Samply cannot tell who has already responded, so reminders will go to everyone.",
    });
  }

  return issues;
}

/** Errors only — the set that blocks a save. */
export function surveyUrlErrors(raw: string | null | undefined, ctx: UrlCheckContext = {}): UrlIssue[] {
  return checkSurveyUrl(raw, ctx).filter((i) => i.level === "error");
}
