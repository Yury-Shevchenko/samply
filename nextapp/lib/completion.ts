/**
 * Reading a completion message id out of a survey tool's end-of-survey redirect.
 *
 * Samply's canonical completion endpoint carries the message id as a path
 * segment — /studies/<study-code>/done/<message-id> — because that is what most
 * tools can assemble with their own piped-text syntax (Qualtrics'
 * `${e://Field/msg}`, SoSci's `%reference%`, and so on).
 *
 * Several tools cannot. SurveyMonkey and Nettskjema can only redirect to a
 * STATIC base URL, to which they append their captured variables as a query
 * string, arriving as:
 *
 *     /studies/<study-code>/done?messageid=<value>&submissionId=<their own id>
 *
 * That form used to 404, so the completion — and with it the cancellation of
 * that send's reminders — was silently lost, and the researcher only found out
 * when their export came back with no completions. The query form is now
 * accepted as an alias: app/studies/[slug]/done/page.tsx pulls the id out with
 * `messageIdFromQuery` and redirects to the canonical path, so there stays
 * exactly one implementation of what "completed" means.
 *
 * A CommonJS twin serving the Express POST webhook lives in
 * Website/lib/completion.js. nextapp is a separate package with its own
 * bundler, so the two are deliberate copies rather than a shared import — the
 * same arrangement as placeholders. completion.test.ts asserts they agree.
 */

/**
 * Query keys accepted as the message id, matched case-insensitively and tried
 * in this order, so a redirect carrying more than one of them resolves the same
 * way regardless of the order the tool happened to append them in.
 *
 * `messageid` is what SurveyMonkey and Nettskjema produce and what the docs
 * tell researchers to name their variable; the rest are the spellings a
 * researcher naming the field themselves is most likely to reach for — `msg` in
 * particular, because that is the key the Qualtrics start-link example uses.
 */
export const MESSAGE_ID_QUERY_KEYS = ["messageid", "message_id", "msgid", "msg"] as const;

/**
 * Shape of what a message id may look like.
 *
 * Live ids are `nanoid(15)` over an alphanumeric alphabet (see
 * services/notificationSender.js), but rows written by a long-retired generator
 * are shaped `mes-3f4-a1b-...`, so hyphens must pass. This is a hygiene check on
 * an untrusted query value rather than a format assertion: it bounds the length
 * and keeps anything exotic out of the Mongo query, while staying permissive
 * enough that no id Samply has ever issued is turned away.
 */
const MESSAGE_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

export function isValidMessageId(value: unknown): value is string {
  return typeof value === "string" && MESSAGE_ID_RE.test(value);
}

/** What Next.js hands a page as its resolved `searchParams`. */
export type QueryParams = Record<string, string | string[] | undefined>;

/**
 * Finds the message id among a redirect's query parameters, or null when none
 * of the accepted keys carries a usable value.
 *
 * Unrecognised parameters are ignored rather than treated as an error: tools
 * append their own (Nettskjema adds `submissionId`, SurveyMonkey appends *every*
 * captured custom variable), and a redirect that also carries the tool's
 * bookkeeping is the normal case, not a malformed one.
 */
export function messageIdFromQuery(params: QueryParams): string | null {
  // Lower-cased index of what actually arrived, so `messageId` and `MessageID`
  // are found too. First occurrence wins if a tool sends both spellings.
  const byLowerKey = new Map<string, string | string[] | undefined>();
  for (const [key, value] of Object.entries(params)) {
    const lower = key.toLowerCase();
    if (!byLowerKey.has(lower)) byLowerKey.set(lower, value);
  }

  for (const key of MESSAGE_ID_QUERY_KEYS) {
    const raw = byLowerKey.get(key);
    // A repeated parameter arrives as an array; take the first one.
    const value = Array.isArray(raw) ? raw[0] : raw;
    // Trim only what is already a string. The declared type says it can only be
    // one, but the value comes off a URL, and returning null beats throwing on
    // the day something else turns up.
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (isValidMessageId(trimmed)) return trimmed;
  }
  return null;
}
