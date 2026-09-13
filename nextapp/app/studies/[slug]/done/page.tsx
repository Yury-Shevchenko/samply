import { redirect } from "next/navigation";
import { getT } from "@/lib/i18n.server";
import { messageIdFromQuery, type QueryParams } from "@/lib/completion";
import { Notice } from "./ui";

/**
 * Completion redirects that carry the message id as a query parameter.
 *
 * Some survey tools cannot build Samply's canonical path form
 * (/studies/<slug>/done/<message-id>) because their end-of-survey redirect takes
 * a static base URL and appends the captured variables themselves — SurveyMonkey
 * and Nettskjema both work this way, producing
 *
 *     /studies/<slug>/done?messageid=<value>&submissionId=<their own id>
 *
 * This page reads the id and hands off to the canonical route, which stays the
 * single implementation of registering a completion. The participant ends up on
 * the tidy path URL, and the extra parameters the tool appended are dropped.
 */

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<QueryParams>;
}

export default async function CompletionQueryPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  const messageId = messageIdFromQuery(query);

  if (!messageId) {
    // No usable id, so there is nothing to look up and nothing to redirect to —
    // rendering here rather than bouncing also means a misconfigured redirect
    // cannot loop back onto this same route.
    const { t } = await getT();
    return (
      <Notice
        title={t("studyDone.responseNotFound")}
        body={t("studyDone.responseNotFoundBody")}
        footnote={t("studyDone.canClose")}
      />
    );
  }

  redirect(`/studies/${encodeURIComponent(slug)}/done/${encodeURIComponent(messageId)}`);
}
