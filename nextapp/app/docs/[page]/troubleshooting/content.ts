/**
 * Troubleshooting page content, as data rather than markup.
 *
 * The page has to exist in fourteen languages, and prose embedded in JSX is
 * painful to translate and impossible to review — a translator would be editing
 * around tags. Holding the text as strings means a locale is one object, and a
 * missing locale falls back to English cleanly.
 *
 * Strings use a deliberately tiny inline markup, rendered by `renderInline` in
 * the page component:
 *
 *   **bold**            emphasis
 *   `code`              inline code
 *   [label](/docs/x)    internal link  → next/link
 *   [label](https://…)  external link  → <a target="_blank">
 *
 * Nothing else. Anything richer belongs in the component, not in a translatable
 * string, or translators end up maintaining markup they cannot see rendered.
 */

/** One labelled paragraph inside a symptom card, e.g. "The fix: …". */
export interface Para {
  label?: string;
  text: string;
}

export type Block =
  | { kind: "p"; text: string }
  /** A recognisable symptom, its cause, and what to do about it. */
  | { kind: "card"; title: string; paras: Para[] }
  /** Consequences that cannot be undone after the fact. Rendered prominently. */
  | { kind: "callout"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] };

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface TroubleshootingPage {
  intro: string[];
  sections: Section[];
}

const en: TroubleshootingPage = {
  intro: [
    "Most Samply problems are configuration, not failure, and almost all of them are visible before the first notification goes out. This page is ordered by what you would notice, not by what is technically wrong.",
    "If your study has not started yet, the fastest route is the **Setup check** on your study dashboard: it inspects your configuration and offers a test notification that sends through the real pipeline and shows you the survey link exactly as the participant's phone received it. Almost everything below is caught by that one check.",
  ],
  sections: [
    {
      heading: "1 · A participant stopped receiving notifications",
      blocks: [
        {
          kind: "p",
          text: "This is the most common report, and it has several causes with very different fixes. Work down the list — they are ordered by how often they turn out to be the answer.",
        },
        {
          kind: "card",
          title: "The participant reinstalled the app, or changed phone",
          paras: [
            { label: "What happens:", text: "the push token identifies the app installation, not the person. Reinstalling, restoring to a new device, or in some cases an OS upgrade issues a new token, and the old one stops working permanently." },
            { label: "What you see:", text: "the analytics page shows “N participant(s) can no longer receive notifications”. Samply learns this from the push service's delivery receipts, usually within an hour of the next send." },
            { label: "The fix:", text: "the participant opens Samply Research and logs in. That re-registers the device automatically. If they are unsure, ask them to open the **Notification check** screen in the app menu and tap **Re-register this device** — the same repair, done deliberately." },
          ],
        },
        {
          kind: "card",
          title: "Android is putting the app to sleep",
          paras: [
            { label: "What happens:", text: "many Android manufacturers add aggressive battery management on top of stock Android. The push is accepted by Google's servers and then delayed or dropped by the phone itself. Samsung, Xiaomi, OnePlus, Huawei, Oppo and Vivo are the usual offenders; behaviour varies by manufacturer and by Android version." },
            { label: "What you see:", text: "**nothing.** This is the important part. The notification was accepted for delivery, so Samply counts it as sent and no warning appears anywhere. The only signal is a participant who reports missing prompts while every server-side indicator looks healthy." },
            { label: "The fix:", text: "the participant excludes Samply from battery optimisation. The steps differ per manufacturer, and [dontkillmyapp.com](https://dontkillmyapp.com/) documents them device by device — it is the best reference available and worth sending directly to participants with Android phones. The in-app **Notification check** screen also links to the phone's settings." },
            { label: "Prevention:", text: "mention this in your onboarding instructions rather than after the fact. Asking Android participants to do it on day one costs a minute; asking on day five means you have already lost their data." },
          ],
        },
        {
          kind: "card",
          title: "Notification permission was never granted, or was revoked",
          paras: [
            { label: "What happens:", text: "the app asks for permission at first launch. If the participant declines — or later turns notifications off, which some people do in bulk when tidying their phone — nothing can be delivered." },
            { label: "What you see:", text: "if permission was never granted, the participant has no push token, so they appear enrolled but never receive anything. If it was revoked later, the token may keep working from the server's point of view for some time." },
            { label: "The fix:", text: "**Notification check** in the app menu reports the permission state directly and opens the right settings page." },
          ],
        },
        {
          kind: "card",
          title: "The participant joined but never opened the app again",
          paras: [
            { text: "A device registers for notifications when the app runs. Someone who joins through a link, then force-quits and never reopens, may never complete registration. Their row exists; their device is unreachable." },
          ],
        },
        {
          kind: "card",
          title: "iOS Focus modes, or the Scheduled Summary",
          paras: [
            { text: "iOS can hold notifications back and deliver them in a batch, or silence them under a Focus mode. Participants often do not realise this is on. The notification arrives — just not when you scheduled it, which for experience sampling is frequently the same as not arriving. Ask participants to allow Samply to deliver immediately." },
          ],
        },
        {
          kind: "card",
          title: "The phone was off or offline at send time",
          paras: [
            { text: "Push services hold a message for a while and deliver it when the device reconnects, but they do not guarantee it, and an expired link may no longer be useful by then. If your design depends on a prompt reaching people within a narrow window, set a link expiry so late arrivals are not answered out of window — and expect some loss." },
          ],
        },
      ],
    },
    {
      heading: "2 · The survey export has no participant identifier",
      blocks: [
        { kind: "p", text: "This is the most damaging thing that can go wrong, because it is silent, and because it is discovered during analysis when the study is already over." },
        { kind: "callout", text: "There is no way to reconstruct who answered what after the fact. If your design needs person-level or multilevel analysis, verify this on day one with a test notification." },
        {
          kind: "card",
          title: "The notification link has no ID placeholder",
          paras: [
            { label: "What happens:", text: "without `%SAMPLY_ID%` in the Web Link, the survey receives no identifier at all. Every response is anonymous and unlinkable." },
            { label: "The fix:", text: "the schedule editor now warns about this while you type, and the Setup check reports it. Use the **Build this link for me** builder rather than assembling the URL by hand — it adds the correct parameters with the right names for your survey platform." },
          ],
        },
        {
          kind: "card",
          title: "The link is malformed — a doubled placeholder, or a second “?”",
          paras: [
            { label: "What happens:", text: "a URL may contain only one `?`; further parameters are joined with `&`. Pasting a second `?id=%SAMPLY_ID%` onto the end swallows everything after it into the previous parameter's value, and the survey stores a mangled identifier or none." },
            { label: "The fix:", text: "saving a schedule with a duplicated placeholder or a stray second `?` is now blocked with a specific message. If you are editing an older schedule, re-save it to run the check." },
          ],
        },
        {
          kind: "card",
          title: "The ID arrives, but your survey tool does not store it",
          paras: [
            { label: "What happens:", text: "most survey platforms ignore unexpected URL parameters unless you declare them. In Qualtrics an Embedded Data field must exist in the Survey Flow with a name matching the query key *exactly*, including capitalisation. SoSci needs the parameter registered; LimeSurvey needs it defined under panel integration." },
            { label: "How to tell this apart:", text: "this is the case where Samply's test notification shows the ID present in the link, but your export still has an empty column. The problem is on the survey tool's side." },
            { label: "The fix:", text: "follow the [integration guide](/docs/integrations) for your platform, then run a test response and download the export to confirm the column is populated. Watch for reserved parameter names — each tool has some, and they are listed per platform." },
          ],
        },
        {
          kind: "card",
          title: "Participants are typing a code by hand instead",
          paras: [
            { text: "This works, but adds burden at every single prompt and introduces typos and inconsistent casing that you will have to clean. It is worth the twenty minutes to wire the parameter through properly." },
          ],
        },
      ],
    },
    {
      heading: "3 · Response rates look wrong, or reminders go to everyone",
      blocks: [
        {
          kind: "card",
          title: "Completions are never recorded",
          paras: [
            { label: "What happens:", text: "Samply only knows a survey was finished if the survey tells it. That requires two things: `%MESSAGE_ID%` in the notification link, and a redirect at the end of your survey back to `/studies/<study-code>/done/<message-id>`, with the message id echoed using your tool's own syntax." },
            { label: "What you see:", text: "the analytics page warns when a study has sent notifications but recorded no completions at all. That banner appears during the run, not after it." },
            { label: "Also worth knowing:", text: "some tools cannot redirect to an external URL at all, and some only on paid plans. The [compatibility table](/docs/integrations) lists which." },
          ],
        },
        {
          kind: "card",
          title: "Reminders reach people who already responded",
          paras: [
            { label: "Why:", text: "reminders are cancelled automatically the moment a completion is registered — but if completion tracking is not wired up, Samply has no way to know who has answered, so every reminder goes to everyone. This is the same root cause as above, and it produces duplicate submissions you will have to de-duplicate by hand." },
            { label: "The fix:", text: "add `%MESSAGE_ID%` and the end-of-survey redirect. The reminders step in the schedule editor warns you when they are missing." },
          ],
        },
        {
          kind: "card",
          title: "A participant answered, but shows as a non-responder",
          paras: [
            { text: "Samply counts a notification as answered if the participant tapped it, opened it from their in-app history, or the survey reported completion. If none of those happened — for example they copied the link to a desktop browser — the response exists in your survey tool but Samply cannot attribute it. Compare against your survey export before treating Samply's compliance figure as final." },
          ],
        },
      ],
    },
    {
      heading: "4 · The numbers on the analytics page look wrong",
      blocks: [
        {
          kind: "card",
          title: "Counts appear to go down over time",
          paras: [
            { text: "Check the window selector at the top of the page. **Entire study** is the default; a fixed window such as *7d* is a rolling window anchored to now, so messages older than that leave the count as the study progresses. Nothing is lost — the window moved. Switch back to **Entire study** for cumulative figures." },
          ],
        },
        {
          kind: "card",
          title: "“Schedule performance” shows only “(untracked schedule)”",
          paras: [
            { text: "Notifications sent before mid-2026 were not tagged with the schedule that produced them, so they cannot be attributed retroactively. New sends are. Event-contingent and API-triggered notifications legitimately have no schedule and always appear here." },
          ],
        },
        {
          kind: "card",
          title: "The numbers do not match my survey tool's",
          paras: [
            { text: "They measure different things, and some divergence is expected. Samply counts notifications and interactions with them; your survey tool counts submissions. Partial responses, responses started from a desktop, and duplicate submissions all separate the two. Test notifications are excluded from Samply's figures and its data export, so they will not explain a gap. For your own analysis, export the raw event log from the study's History page and compute what you need directly." },
          ],
        },
      ],
    },
    {
      heading: "5 · No notifications were sent at all",
      blocks: [
        { kind: "p", text: "Check these in order:" },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Is the study active?** An inactive study sends nothing.",
            "**Has anyone joined?** A schedule with no recipients produces no sends.",
            "**Does the schedule target the right people?** If it is limited to a group and nobody is in that group, or limited to participants enrolled at creation time while your cohort joined afterwards, the queue will be empty.",
            "**Check the timezone.** A schedule set in the wrong timezone fires at the wrong local hour — often in the middle of the night, which looks like non-response rather than misconfiguration.",
            "**Look at the scheduled queue.** Every schedule expands into one row per participant per send time. If the queue is empty, the schedule never produced anything, and the cause is above rather than in delivery.",
          ],
        },
      ],
    },
    {
      heading: "6 · What to tell participants",
      blocks: [
        { kind: "p", text: "Most participant-side problems are fixed by the participant, not by you. It is worth putting this in your onboarding material rather than sending it reactively:" },
        {
          kind: "list",
          items: [
            "Allow notifications when the app asks. If you declined, you can turn them on in your phone's settings.",
            "**On Android:** turn off battery optimisation for Samply, or the phone will delay or block prompts. [dontkillmyapp.com](https://dontkillmyapp.com/) has the steps for your specific phone.",
            "On iPhone: make sure Samply is allowed to deliver immediately, not held in a Scheduled Summary or silenced by a Focus mode.",
            "If you reinstall the app or change phone, open Samply and log in again so your device is re-registered.",
            "If prompts stop arriving, open **Notification check** in the app menu. It shows exactly which step is broken and offers a one-tap repair.",
          ],
        },
      ],
    },
    {
      heading: "7 · Preventing all of this",
      blocks: [
        { kind: "p", text: "Run the **Setup check** on your study dashboard and send yourself a test notification before recruiting. The test goes through the ordinary send pipeline and reports four things: that the notification was sent, that the link carries the participant identifier, that it was opened, and that completion was reported back. A study that passes all four will not fail in any of the ways described on this page." },
        { kind: "p", text: "Then complete one full response yourself and **download the export**. That is the only way to confirm your survey tool is storing the identifier, which Samply cannot see from its side. It takes five minutes and it is the single highest-value thing you can do before recruiting." },
        { kind: "p", text: "If something here does not match what you are seeing, or you hit a failure this page does not describe, [get in touch](/docs/collaborate) — the list grows from reports." },
      ],
    },
  ],
};

export const ENGLISH = en;

/**
 * Rebuilds a page from a flat, ordered list of strings.
 *
 * A translation is therefore 95 strings in a fixed order rather than a
 * reproduced object graph — translators cannot accidentally drop a card or
 * re-nest a paragraph, and the structure is guaranteed identical to English by
 * construction. The order is exactly the reading order of the page:
 *
 *   intro paragraphs, then per section: heading, then each block —
 *   p/callout → its text; list → each item; card → title, then per paragraph
 *   its label (when English has one) followed by its text.
 *
 * Throws on a count mismatch rather than silently truncating, so a half-finished
 * translation fails the build instead of shipping half in English.
 */
export function fromStrings(list: string[]): TroubleshootingPage {
  let i = 0;
  const next = (): string => {
    if (i >= list.length) throw new Error(`troubleshooting: ran out of strings at index ${i}`);
    return list[i++];
  };

  const page: TroubleshootingPage = {
    intro: en.intro.map(next),
    sections: en.sections.map((section) => ({
      heading: next(),
      blocks: section.blocks.map((block): Block => {
        switch (block.kind) {
          case "p":
            return { kind: "p", text: next() };
          case "callout":
            return { kind: "callout", text: next() };
          case "list":
            return { kind: "list", ordered: block.ordered, items: block.items.map(next) };
          case "card":
            return {
              kind: "card",
              title: next(),
              paras: block.paras.map((para) => ({
                // Only consume a label where English has one, so the flat list
                // stays aligned with the skeleton.
                ...(para.label ? { label: next() } : {}),
                text: next(),
              })),
            };
        }
      }),
    })),
  };

  if (i !== list.length) {
    throw new Error(`troubleshooting: ${list.length} strings supplied, ${i} consumed`);
  }
  return page;
}

/** Number of strings a translation must supply, in reading order. */
export const STRING_COUNT = (() => {
  let n = en.intro.length;
  for (const s of en.sections) {
    n += 1;
    for (const b of s.blocks) {
      if (b.kind === "p" || b.kind === "callout") n += 1;
      else if (b.kind === "list") n += b.items.length;
      else n += 1 + b.paras.reduce((acc, p) => acc + (p.label ? 2 : 1), 0);
    }
  }
  return n;
})();
