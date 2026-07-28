/**
 * Survey-tool integration registry for the Samply docs.
 *
 * Each entry is one external survey platform and describes the two
 * Samply-specific tasks a researcher must wire up:
 *   (A) capture the Samply URL placeholders into the tool's dataset, and
 *   (B) register completion by redirecting to Samply's
 *       /studies/<study-code>/done/<MESSAGE_ID> endpoint at the end of the survey.
 *
 * Content here was researched and adversarially verified against each
 * platform's official documentation (see `sources`). The data-driven
 * `/docs/integrations/[platform]` template renders any entry — adding a new
 * platform is a single object below, no routing changes required.
 */

export type IntegrationCategory = "survey" | "experiment";

export interface Integration {
  slug: string;
  name: string;
  category: IntegrationCategory;
  /** One-line summary shown on the integrations index card. */
  blurb: string;
  /** False if the tool cannot redirect to an arbitrary external URL at survey end. */
  supportsExternalRedirect: boolean;
  /** Optional plan/tier note (e.g. "redirect requires a paid account"). */
  planNote?: string;
  /** Our confidence in the verified steps. */
  confidence: "high" | "medium" | "low";

  exampleStartUrl: string;
  exampleCompletionUrl: string;

  /** Short description of how the tool captures a URL parameter into its dataset. */
  urlParamMechanism: string;
  urlParamSteps: string[];

  /** Short description of how the tool redirects to an external URL at the end. */
  completionMechanism: string;
  completionSteps: string[];

  /** Optional prominent warning about a completion-flow limitation. */
  completionWarning?: string;

  /**
   * Server-side POST (webhook) alternative to the browser redirect. The generic
   * POST mechanics are rendered for every tool; these fields add what THIS tool
   * can/can't do and how. `postFeasibility`: "native" = the tool can POST itself,
   * "partial" = possible but gated/unverified, "external" = needs a relay/script.
   */
  postFeasibility?: "native" | "partial" | "external";
  postMechanism?: string;
  postSteps?: string[];
  postSources?: string[];

  reservedParamWarning?: string;
  caveats: string[];
  sources: string[];
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: "qualtrics",
    name: "Qualtrics",
    category: "survey",
    blurb: "Capture the Samply IDs as Embedded Data, then redirect from the End of Survey element.",
    supportsExternalRedirect: true,
    planNote: "The end-of-survey redirect is not available on free Qualtrics accounts — it needs a licensed/institutional account.",
    confidence: "high",
    exampleStartUrl: "https://<your-org>.qualtrics.com/jfe/form/SV_xxxx?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&msg=%MESSAGE_ID%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done/${e://Field/msg}",
    urlParamMechanism: "Embedded Data in the Survey Flow, left unassigned so Qualtrics fills each field from the matching query-string key.",
    urlParamSteps: [
      "Open the Survey Flow (Survey tab → Survey Flow), click \"Add a New Element Here\" and choose Embedded Data.",
      "Add one field per Samply placeholder, named EXACTLY like the query-string keys in the start link (e.g. msg, id, code). Leave each unassigned so it reads \"Value will be set from Panel or URL\". Capitalization must match.",
      "Drag the Embedded Data element to the TOP of the Survey Flow (above anything that uses it) and save the flow.",
      "Configure the Samply start link so its keys match these field names. The fields are then stored with every response and appear in the data export automatically.",
    ],
    completionMechanism: "The End of Survey element's \"Redirect to a URL\" option, piping the captured field with Qualtrics syntax ${e://Field/msg}.",
    completionSteps: [
      "In the Survey Flow (or Survey Options) open an End of Survey element, click \"Customize…\" and check \"Override Survey Options\".",
      "Select \"Redirect to a URL\".",
      "Enter the Samply completion URL with the captured message id piped in: https://samply.uni-konstanz.de/studies/<study-code>/done/${e://Field/msg} (use whatever field name holds %MESSAGE_ID%).",
      "Optionally use ${e://Field/msg?format=urlencode} to be safe, then save and publish. Test with a real Samply link end-to-end.",
    ],
    postFeasibility: "native",
    postMechanism: "Qualtrics can POST it from a Workflow — a \"Survey response\" event running a \"Web Service\" task set to POST — so nothing redirects the participant. Needs a licensed account with the Workflows module (not free tiers).",
    postSteps: [
      "Open the survey's Workflows tab → Create a workflow → \"Started when an event is received\", and choose the \"Survey response\" event, firing on newly-created completed responses only.",
      "Add a task and pick \"Web Service\". Set the method to POST and Authentication to \"Not authenticated\".",
      "In the URL field, type the completion URL and use the piped-text {a} button to drop the msg embedded-data field into the path: https://samply.uni-konstanz.de/studies/<study-code>/done/${e://Field/msg}",
      "Choose any body format but leave the body empty, and add no headers. Save the task and publish the workflow.",
      "Send a test response and confirm Samply recorded it from the task's run history — verify the msg resolved inside the path (Qualtrics documents piping mainly for query strings, so test it). If your brand restricts outbound domains, allowlist samply.uni-konstanz.de.",
    ],
    postSources: [
      "https://www.qualtrics.com/support/survey-platform/actions-module/web-service-task/",
      "https://www.qualtrics.com/support/survey-platform/actions-module/survey-response-events/",
    ],
    reservedParamWarning: "Avoid Q_-prefixed names (Q_Language, Q_TotalDuration, …) and other built-ins (RID/rid, SID, EndDate, IPAddress). Field names are case-sensitive and must match the URL keys exactly.",
    caveats: [
      "The message id sits in the URL path; Samply's %MESSAGE_ID% is a plain 15-char ID, so it is URL-safe, but ${e://Field/msg?format=urlencode} is the cautious choice.",
    ],
    sources: [
      "https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/passing-information-through-query-strings/",
      "https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/embedded-data/",
      "https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/end-of-survey-element/",
    ],
  },
  {
    slug: "sosci-survey",
    name: "SoSci Survey",
    category: "survey",
    blurb: "Send the message id as the reserved r parameter (auto-stored in REF), then redirect with a PHP redirect() on the final page.",
    supportsExternalRedirect: true,
    confidence: "high",
    exampleStartUrl: "https://www.soscisurvey.de/<project>/?r=%MESSAGE_ID%&u_sid=%SAMPLY_ID%&u_code=%PARTICIPANT_CODE%",
    exampleCompletionUrl: "redirect('https://samply.uni-konstanz.de/studies/<study-code>/done/%reference%', false);",
    urlParamMechanism: "The reserved r parameter is auto-stored in the built-in REF variable; other custom u_ parameters are captured with a \"Device and Transmitted Variables\" question on the first page.",
    urlParamSteps: [
      "Send the message id as the reserved parameter r (e.g. ?r=%MESSAGE_ID%). SoSci automatically stores r in the built-in REF column — no setup needed.",
      "To also store the Samply ID and participant code, add a \"Device and Transmitted Variables\" question on the FIRST page and declare the custom variables to read (their names must start with u, e.g. u_sid, u_code).",
      "Those values are then written to the dataset and appear in the export.",
      "Run a test interview and confirm REF (and the u_ columns) hold the transmitted values.",
    ],
    completionMechanism: "A \"PHP code\" element placed alone on the final page calling redirect(url, false), which marks the interview FINISHED and redirects.",
    completionSteps: [
      "Add a final questionnaire page containing ONLY a \"PHP code\" element (commands after redirect() are ignored).",
      "Build the redirect with SoSci's %reference% placeholder, which resolves to the stored REF value: redirect('https://samply.uni-konstanz.de/studies/<study-code>/done/%reference%', false);",
      "Keep the second argument false so SoSci marks the dataset complete before sending the participant to Samply.",
      "Test a full interview from a real Samply link and confirm it lands on /studies/<study-code>/done/<message-id>.",
    ],
    postFeasibility: "native",
    postMechanism: "SoSci can POST it directly with the built-in sendPOST() function in a \"PHP code\" element — no redirect. Watch SoSci's outbound-request rate limits, which bite at ESM scale.",
    postSteps: [
      "Add a contentless page just before SoSci's final/goodbye page and place a \"PHP code\" element on it; an empty page auto-forwards after the PHP runs, so the real last page still sets FINISHED.",
      "Read the message id from the built-in REF variable with reference() — the value SoSci stored from ?r=%MESSAGE_ID% in the start link.",
      "Build the URL with the id in the path and POST with an empty body: $url = 'https://samply.uni-konstanz.de/studies/<study-code>/done/'.reference(); sendPOST($url, array());",
      "Do NOT call redirect() — sendPOST() returns inline and the participant continues to the last page. Optionally guard with if (strlen(reference()) == 15).",
      "Mind SoSci's outbound limits (~1000 requests/24h per project, 20 per interview, 2 per page; 5s timeout, no retry). A high-volume ESM study can hit the daily cap, where the redirect has none.",
    ],
    postSources: [
      "https://www.soscisurvey.de/help/doku.php/en:create:functions:sendjson",
      "https://www.soscisurvey.de/help/doku.php/en:create:functions:reference",
      "https://www.soscisurvey.de/help/doku.php/en:create:lastpage",
    ],
    reservedParamWarning: "r is reserved (auto-stored in REF) — that is exactly what we use for the message id, and %reference% reads it back. Custom parameter names must start with u (e.g. u_sid). readGET() only reads on the first page.",
    caveats: [
      "If you instead capture the id into your own variable, inject it with PHP instead of %reference%, e.g. redirect('https://samply.uni-konstanz.de/studies/<study-code>/done/'.value('IV01'), false);",
      "No SoSci plan/tier restriction applies — redirect() and URL-parameter capture are standard features.",
    ],
    sources: [
      "https://www.soscisurvey.de/help/doku.php/en:survey:url",
      "https://www.soscisurvey.de/help/doku.php/en:create:functions:redirect",
      "https://www.soscisurvey.de/help/doku.php/en:create:functions:readget",
      "https://www.soscisurvey.de/help/doku.php/en:create:questions:client",
    ],
  },
  {
    slug: "limesurvey",
    name: "LimeSurvey",
    category: "survey",
    blurb: "Map each Samply parameter under Panel integration, then redirect via the End URL using {PASSTHRU:…}.",
    supportsExternalRedirect: true,
    confidence: "high",
    exampleStartUrl: "https://<your-limesurvey>/index.php/<surveyID>?msg=%MESSAGE_ID%&pid=%SAMPLY_ID%&code=%PARTICIPANT_CODE%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done/{PASSTHRU:msg}",
    urlParamMechanism: "\"Panel integration\" (Survey menu → Panel integration → Add URL parameter), each parameter mapped to a Target question so it is saved into the response and export.",
    urlParamSteps: [
      "For each Samply parameter, first add a free-text question to hold it — type \"Sort text\" (Short free text) or \"Multiple texts\" — with a clear code such as samply_msg; optionally hide it.",
      "Go to Survey menu → Panel integration and click \"Add URL parameter\".",
      "In \"Parameter\" type the exact GET key from the start link (e.g. msg), and in \"Target question\" select the matching free-text question. Repeat per parameter.",
      "Always set a Target question — without one the value lives only in the session and is NOT written to the export.",
    ],
    completionMechanism: "The End URL (Survey text elements) with the {PASSTHRU:msg} placeholder, plus \"automatically load the end URL\" enabled in Presentation so it redirects on completion.",
    completionSteps: [
      "Make sure %MESSAGE_ID% is defined as a Panel integration parameter (e.g. named msg) so {PASSTHRU:msg} is available.",
      "Survey settings → Text elements → set End URL to: https://samply.uni-konstanz.de/studies/<study-code>/done/{PASSTHRU:msg}",
      "Survey settings → Presentation → enable automatically loading the End URL on completion, so the participant is redirected (not just shown a link).",
      "Activate and test: {PASSTHRU:msg} resolves to the value LimeSurvey received in the start link.",
    ],
    postFeasibility: "partial",
    postMechanism: "Core LimeSurvey only redirects; a silent POST needs a self-hosted install plus a plugin on the afterSurveyComplete event. Existing webhook plugins POST a JSON body to a fixed URL, so they must be adapted to put the id in the path.",
    postSteps: [
      "This needs a self-hosted LimeSurvey where you can install plugins (LimeSurvey Cloud generally cannot).",
      "Start from a community webhook plugin that subscribes to afterSurveyComplete and POSTs via cURL (e.g. IrishWolf/LimeSurveyWebhook or nicon8/httphook) — these are unofficial, so vet the code.",
      "In the afterSurveyComplete handler, load the completed response by responseId and read the stored msg value (the question column that captured {PASSTHRU:msg}).",
      "Change the plugin's URL from a fixed URL + JSON body to append msg to the path — rtrim($sUrl,'/').'/'.$msg — and POST with an empty body to https://samply.uni-konstanz.de/studies/<study-code>/done/<message-id>.",
      "Install into upload/plugins/, activate under Configuration → Plugins, set the base URL, and test against your LimeSurvey version (3.x/5.x/6.x differ).",
    ],
    postSources: [
      "https://www.limesurvey.org/manual/AfterSurveyComplete",
      "https://www.limesurvey.org/manual/Plugin_events",
      "https://www.limesurvey.org/manual/Plugins_-_advanced",
    ],
    reservedParamWarning: "Do not reuse LimeSurvey-reserved start-URL keys: sid, lang, token, newtest. Use names like msg, pid, code. {PASSTHRU:name} only works if name was first defined under Panel integration.",
    caveats: [
      "The exact wording of the Presentation toggle that auto-loads the End URL varies across LimeSurvey 3.x/5.x/6.x — confirm it in your installed version.",
    ],
    sources: [
      "https://www.limesurvey.org/manual/Panel_integration/en",
      "https://www.limesurvey.org/manual/URL_fields",
    ],
  },
  {
    slug: "unipark",
    name: "Unipark (EFS / Tivian)",
    category: "survey",
    blurb: "Declare URL parameters in the project, pass them as a, b, c…, and redirect from the Final Page.",
    supportsExternalRedirect: true,
    confidence: "medium",
    exampleStartUrl: "https://<survey-host>/uc/<project>/?a=%SAMPLY_ID%&b=%PARTICIPANT_CODE%&c=%MESSAGE_ID%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done/#p_0003#",
    urlParamMechanism: "EFS reads incoming keys a, b, c… positionally into the system variables p_0001, p_0002, p_0003. You declare how many under Project Properties → Survey Options → User-defined Variables.",
    urlParamSteps: [
      "In the project, open Project Properties (Projekteigenschaften) → Survey Options (Umfrageeinstellungen) → the \"User-defined Variables\" (Benutzerdefinierte Variablen) tab.",
      "Set \"Number of URL parameters\" (Anzahl der URL-Parameter) to the count you need; EFS creates p_0001, p_0002, p_0003 in order.",
      "Build the start link with EFS's reserved single-letter keys in that same order: ?a=%SAMPLY_ID%&b=%PARTICIPANT_CODE%&c=%MESSAGE_ID% (a→p_0001, b→p_0002, c→p_0003). Do NOT pass ?p_0001=…",
      "Check the data export / codebook: the p_0001–p_0003 columns must contain the passed values.",
    ],
    completionMechanism: "Final Page → Properties → \"Destination URL of external survey\", embedding the wildcard #p_0003# for the message id.",
    completionSteps: [
      "In the Questionnaire Editor open the Final Page → Properties.",
      "Set the destination URL to: https://samply.uni-konstanz.de/studies/<study-code>/done/#p_0003# (use whichever p_000n holds %MESSAGE_ID%).",
      "UNCHECK \"Automatically add ospe.php3 to URL\" and \"Add return ticket\" (both ticked by default) so EFS sends the participant to the unmodified Samply URL.",
      "Save and run a test completion; confirm #p_0003# resolves to the real 15-char message id.",
    ],
    postFeasibility: "external",
    postMechanism: "EFS/Unipark has no trigger that makes an outbound HTTP call (its Service Layer is inbound-only), so it cannot POST to Samply itself. Use the Final-Page redirect above, or an external relay driven by the EFS export/API.",
    postSteps: [
      "There is no native EFS trigger that POSTs to an external URL, so a silent POST is not possible from EFS alone.",
      "Simplest: keep the Final-Page redirect above — it reaches the same /done/<message-id> URL, just via the participant's browser.",
      "To avoid redirecting, run an external relay: periodically export completed cases (EFS export or the Service Layer/API), read p_0003 (the message id) for each newly-finished case, and POST https://samply.uni-konstanz.de/studies/<study-code>/done/<message-id> from your relay.",
      "De-duplicate on your side so each message id is POSTed only once.",
    ],
    postSources: [
      "https://qbdocs.atlassian.net/wiki/spaces/DOC/pages/1447919750/Triggers",
      "https://qbdocs.atlassian.net/wiki/spaces/DOC/pages/1273102351/How-to:+Service+Layer",
    ],
    reservedParamWarning: "Incoming keys must be the reserved single letters a, b, c… (NOT p_0001). Mapping is positional: a→p_0001, b→p_0002, c→p_0003 — a wrong order silently stores values in the wrong column. EFS also reserves lfdn, code, c, tester, language.",
    caveats: [
      "EFS UI labels vary by version/locale and the official docs are partly login-gated, so confidence on exact English wording is medium — verify against your instance with a live test before fielding.",
      "A simple outbound redirect needs no special add-on; the ospe.php3 / return-ticket options are only for returning to another EFS/Questback survey.",
    ],
    sources: [
      "https://qbdocs.atlassian.net/wiki/spaces/DOC/pages/1175519357/How-to+External+Survey+Start",
      "https://qbdocs.atlassian.net/wiki/spaces/DOK/pages/1451196523/Projekteigenschaften",
      "https://www.sona-systems.com/help/unipark/",
    ],
  },
  {
    slug: "redcap",
    name: "REDCap",
    category: "survey",
    blurb: "Pre-fill hidden fields named to match the parameters, then redirect via Survey Termination Options with [piping].",
    supportsExternalRedirect: true,
    confidence: "high",
    exampleStartUrl: "https://<your-redcap>/surveys/?s=TOKEN&messageid=%MESSAGE_ID%&samply_id=%SAMPLY_ID%&participant_code=%PARTICIPANT_CODE%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done/[messageid]",
    urlParamMechanism: "URL pre-fill into hidden Text Box fields whose Variable Names match the query-string keys (@HIDDEN). The value is stored because the field is on the submitted instrument.",
    urlParamSteps: [
      "In Online Designer, on the FIRST survey instrument, add Text Box fields with Variable Names exactly matching the incoming keys (e.g. messageid, samply_id, participant_code — case-sensitive, no dashes/colons).",
      "In each field's \"Action Tags / Field Annotation\" box add @HIDDEN (or @HIDDEN-SURVEY) so participants do not see it.",
      "Configure the start link so its query keys equal those variable names. REDCap pre-fills and stores them with the response.",
      "Test: complete a survey via a link with sample values and confirm the export contains the fields.",
    ],
    completionMechanism: "Survey Settings → Survey Termination Options → \"Redirect to a URL\", piping the stored field as [messageid].",
    completionSteps: [
      "Make sure messageid was captured into a stored Text Box field (see above).",
      "On the LAST instrument, open Survey Settings → Survey Termination Options and select \"Redirect to a URL\".",
      "Enter: https://samply.uni-konstanz.de/studies/<study-code>/done/[messageid] — REDCap replaces [messageid] with the stored value at submission.",
      "Save and test end-to-end.",
    ],
    postFeasibility: "external",
    postMechanism: "REDCap can't POST to a path-based URL natively — the Data Entry Trigger posts a fixed payload (record id in the body) to one static URL, and Alerts send only email/SMS. A silent POST needs a small external relay or an API job.",
    postSteps: [
      "REDCap has no path-based webhook, so use one of the relay options below (or just the redirect above).",
      "Relay via the Data Entry Trigger: set Project Setup → Additional Customizations → Data Entry Trigger to your endpoint. On completion REDCap POSTs the record id (not field values) to it.",
      "Your relay reads the record id, calls the REDCap API (content=record, fields=messageid) with a stored token to fetch messageid, then POSTs https://samply.uni-konstanz.de/studies/<study-code>/done/<messageid> with no body.",
      "Alternative: a scheduled API poller that exports newly-completed records, reads messageid, and POSTs Samply — tracking sent ids to avoid duplicates.",
      "The Data Entry Trigger field and API tokens usually need admin rights; confirm access before relying on this.",
    ],
    postSources: [
      "https://atlas.utdallas.edu/TDClient/30/Portal/KB/Article/1091/REDCap-Project-Setup-Additional-Customizations",
      "https://redcapucdenver.zendesk.com/hc/en-us/articles/31119566714004-Alerts-Notifications",
    ],
    reservedParamWarning: "Avoid REDCap's own params (s, __response_hash__). Variable names are case-sensitive, no dashes/colons. CRITICAL: the value is only saved when the instrument holding the field is submitted — keep the hidden fields on the first instrument.",
    caveats: [
      "\"Redirect to a URL\" cannot be combined with \"Survey Completion Text\".",
      "Piping into the redirect works for all field types except checkboxes — use a Text Box for messageid.",
    ],
    sources: [
      "https://www.sona-systems.com/help/redcap/",
      "https://help.redcap.ualberta.ca/help-and-faq/survey-parameters",
      "https://www.iths.org/news/redcap-tip/redcap-tip-of-the-month-survey-termination-options/",
    ],
  },
  {
    slug: "surveymonkey",
    name: "SurveyMonkey",
    category: "survey",
    blurb: "Capture IDs with Custom Variables on a Web Link collector — but note SurveyMonkey appends them to the redirect as query parameters, not a path.",
    supportsExternalRedirect: true,
    planNote: "Custom Variables and the redirect end page are paid features.",
    confidence: "high",
    completionWarning: "SurveyMonkey appends captured variables to the redirect as a query string (…?messageid=<value>); it cannot build Samply's path-style /studies/<study-code>/done/<id>. Samply's completion endpoint currently reads the id from the path only, so SurveyMonkey needs either Samply to also accept ?messageid= or a small redirector that rewrites ?messageid=X into /done/X. Verify before fielding.",
    exampleStartUrl: "https://www.surveymonkey.com/r/<code>?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done   →   …/done?messageid=<value> (appended automatically)",
    urlParamMechanism: "Custom Variables (Design Survey → Logic → Custom Variables) on a Web Link collector; stored as columns at the end of each export row.",
    urlParamSteps: [
      "Design Survey → Logic → Custom Variables → \"New custom variable\". Name each one (no spaces, case-sensitive) to match your start-link keys, e.g. id, code, messageid.",
      "Publish with a Web Link collector; SurveyMonkey produces a bracketed template like ?messageid=[messageid_value].",
      "Use that collector link as the Samply start link, substituting the Samply placeholders for the bracketed tokens.",
      "Captured values appear as columns in the All Responses Data export (XLS/SPSS).",
    ],
    completionMechanism: "Collector → Survey End Page → \"Redirect to a URL\" (a static base URL). SurveyMonkey auto-appends the incoming custom variables as query parameters.",
    completionSteps: [
      "Ensure messageid is a Custom Variable and present in the start link.",
      "From Publish, select the Web Link collector → collector options → Survey End Page → \"Redirect to a URL\".",
      "Enter a STATIC base URL (do NOT embed a [messageid] token — SurveyMonkey has no path substitution). It appends ?messageid=<value> automatically.",
      "Because of the query-vs-path limitation above, confirm Samply can read messageid from the query string (or route through a rewriter) before going live.",
    ],
    postFeasibility: "external",
    postMechanism: "SurveyMonkey's webhooks POST its own event JSON (ids only) to a fixed subscriber URL — they can't put messageid in Samply's path — so a silent POST needs a relay. The query-vs-path limitation flagged above applies.",
    postSteps: [
      "SurveyMonkey can't POST directly to Samply's path-based URL, so use a relay (or keep the redirect above with a small rewriter).",
      "Create a developer app (paid/Enterprise) and subscribe a webhook: POST /v3/webhooks with event_type response_completed, pointing subscription_url at your relay.",
      "On each callback, the relay reads the response id, then calls GET /v3/surveys/{id}/responses/{id}/details and reads custom_variables.messageid.",
      "The relay then POSTs https://samply.uni-konstanz.de/studies/<study-code>/done/<messageid> with no body.",
      "No-code option: a Zapier/Make flow with a completed-response trigger → a Webhooks POST built as .../done/{{messageid}} (paid tiers on both sides).",
    ],
    postSources: [
      "https://developer.surveymonkey.com/api/v3/#webhooks",
      "https://help.surveymonkey.com/en/surveymonkey/send/custom-variables/",
    ],
    reservedParamWarning: "Custom Variable names: no spaces, case-sensitive, max 100, keep the URL under 2000 chars. The redirect appends ALL incoming custom variables, so the endpoint must tolerate extra query keys.",
    caveats: [
      "Custom Variables work only with the Web Link collector.",
    ],
    sources: [
      "https://help.surveymonkey.com/en/surveymonkey/send/custom-variables/",
      "https://help.surveymonkey.com/en/surveymonkey/create/survey-end-page/",
      "https://help.surveymonkey.com/en/surveymonkey/send/web-link-collector/",
    ],
  },
  {
    slug: "alchemer",
    name: "Alchemer (SurveyGizmo)",
    category: "survey",
    blurb: "Bind URL variables with a Hidden Value Action, then redirect with a URL Redirect Action using [url(\"…\")].",
    supportsExternalRedirect: true,
    confidence: "high",
    exampleStartUrl: "https://<survey>.alchemer.com/s3/<id>/survey?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&msg=%MESSAGE_ID%",
    exampleCompletionUrl: "samply.uni-konstanz.de/studies/<study-code>/done/[url(\"msg\")]  (choose https:// in the protocol dropdown)",
    urlParamMechanism: "A Hidden Value Action on the first page populated with the URL-variable merge code [url(\"msg\")] (lowercase) names and stores the parameter for export.",
    urlParamSteps: [
      "On the FIRST page, Add New → Action → Hidden Value; give it a title like \"Samply Message ID\".",
      "In the value, click \"Select a Merge Code\", search \"URL variable\", insert it and set the name to your parameter, e.g. [url(\"msg\")]. The merge-code name MUST be lowercase.",
      "Repeat for the Samply ID and participant code as needed.",
      "When exporting, enable \"Include URL Variables\" so the values appear.",
    ],
    completionMechanism: "A URL Redirect Action on the final page; the URL field is merge-code compatible, so the path carries [url(\"msg\")].",
    completionSteps: [
      "Capture the message id first (Hidden Value with [url(\"msg\")]).",
      "On the LAST page, Add New → Action → URL Redirect.",
      "In the protocol dropdown choose https://, and in the URL field put host+path WITHOUT the protocol: samply.uni-konstanz.de/studies/<study-code>/done/[url(\"msg\")].",
      "Do NOT use \"Fields To Pass\" (that appends ?name=value query strings rather than building the /done/<id> path). Save and test.",
    ],
    postFeasibility: "partial",
    postMechanism: "Alchemer's Webhook action can POST server-side and accepts merge codes in the URL — but it is enterprise-tier only, and placing a merge code in the URL path (rather than the query string) is undocumented, so it must be tested.",
    postSteps: [
      "Requires an enterprise Alchemer plan — the Webhook action is enterprise-only; otherwise use the URL Redirect above.",
      "On the final / Thank-You page, click Action → Webhook.",
      "Set Method to POST (Samply ignores the body) and set it to run \"when the page is displayed\" so it fires on completion.",
      "In the URL field, insert the [url(\"msg\")] merge code into the path via \"Select a Merge Code\": https://samply.uni-konstanz.de/studies/<study-code>/done/[url(\"msg\")]",
      "Enable Asynchronous Connect, save, and run a live test — critically confirm the merge code resolved inside the path (Alchemer only documents merge codes in the query string; if it fails there is no path fallback).",
    ],
    postSources: [
      "https://help.alchemer.com/help/survey-webhook",
      "https://help.alchemer.com/help/url-variables",
    ],
    reservedParamWarning: "Do not name a variable source (breaks quotas/logic) or sguid (reserved). The merge-code name inside [url(\"…\")] must be lowercase, though the incoming key is matched case-insensitively.",
    caveats: [
      "Alchemer's redirect docs mostly show appending query strings via \"Fields To Pass\"; the path-style approach relies on the URL field being merge-code compatible — verify the rendered redirect in a test response.",
      "The merged value must not contain http://; the protocol is set by the dropdown, so put only host+path in the field.",
    ],
    sources: [
      "https://help.alchemer.com/help/url-variables",
      "https://help.alchemer.com/help/merge-codes",
      "https://help.alchemer.com/help/redirect-to-a-website",
    ],
  },
  {
    slug: "questionpro",
    name: "QuestionPro",
    category: "survey",
    blurb: "Pass the message id as custom1 (auto-captured), then redirect via Finish Options using ${custom1}.",
    supportsExternalRedirect: true,
    planNote: "Custom variables and Automatic Redirect both require a paid QuestionPro plan — the round-trip does not work on the free version.",
    confidence: "high",
    exampleStartUrl: "https://www.questionpro.com/t/<collectorID>?custom1=%MESSAGE_ID%&custom2=%SAMPLY_ID%",
    exampleCompletionUrl: "https://samply.uni-konstanz.de/studies/<study-code>/done/${custom1}",
    urlParamMechanism: "custom1–custom255 (or ext_ref) are captured automatically from the URL — no in-survey field needed — and appear in the export.",
    urlParamSteps: [
      "Build the start link so the collector receives %MESSAGE_ID% in a custom variable, e.g. ?custom1=%MESSAGE_ID%&custom2=%SAMPLY_ID%.",
      "Paste this as the Samply start link; QuestionPro captures custom1/custom2 automatically.",
      "Optionally label the variable under Custom Variables settings for readable data.",
      "Verify in Response Viewer and the Excel/CSV export that custom1 holds the value.",
    ],
    completionMechanism: "Finish Options → Advanced Options → Automatic Redirect → Website Address, piping the stored variable as ${custom1}.",
    completionSteps: [
      "Ensure the message id arrived as a custom variable (e.g. custom1).",
      "Survey → Edit → Finish Options → Advanced Options → Automatic Redirect.",
      "In \"Website Address\" enter: https://samply.uni-konstanz.de/studies/<study-code>/done/${custom1}.",
      "Save; QuestionPro substitutes ${custom1} with the real message id at the end and redirects. Test end-to-end.",
    ],
    postFeasibility: "partial",
    postMechanism: "QuestionPro's Webhooks (Survey → Integrations → Webhooks) can POST after completion, but ${custom1} substitution is documented only for the JSON body, not the URL path — so the path form must be tested and a relay may be needed. Paid tier only.",
    postSteps: [
      "Requires a paid tier with Webhooks (Team or Research edition).",
      "Survey → Integrations → Webhooks → Add New Webhook; set Request Method = POST and the trigger to \"after the survey is completed\".",
      "Set the Request URL to https://samply.uni-konstanz.de/studies/<study-code>/done/${custom1} and fire a test to a capture endpoint (e.g. webhook.site) to see whether QuestionPro substitutes ${custom1} inside the URL.",
      "If it substitutes in the URL, you're done (Samply ignores the body). If it sends the literal ${custom1}, fall back to a relay: POST {\"mid\":\"${custom1}\"} to your relay (body substitution IS supported), and have the relay POST .../done/<mid> to Samply.",
      "Use the webhook Logs (payload, response, manual retry) to confirm Samply returned success.",
    ],
    postSources: [
      "https://www.questionpro.com/help/webhook.html",
      "https://www.questionpro.com/api/create-webhook.html",
    ],
    reservedParamWarning: "Reserved names: customN, ext_ref, email. Values may not contain comma or hash. Prefer ${custom1} over ${ext_ref} in the redirect — only ${custom1}–${custom255} are documented piping tags.",
    caveats: [
      "ext_ref capture works too, but using ${ext_ref} inside the redirect is undocumented — stick to ${custom1} for the round-trip.",
    ],
    sources: [
      "https://www.questionpro.com/help/SONA.html",
      "https://www.questionpro.com/help/custom-variables.html",
      "https://www.questionpro.com/help/auto-redirect.html",
    ],
  },
];

export function getIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug);
}

export const INTEGRATION_SLUGS: string[] = INTEGRATIONS.map((i) => i.slug);
