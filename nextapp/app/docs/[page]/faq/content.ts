/**
 * Participant FAQ content, as data rather than markup.
 *
 * Written for people taking part in a study, not for researchers. Most support
 * mail from participants is about something only the study's researcher can
 * answer — the schedule, a broken survey, compensation — so the page leads with
 * "who should I ask?" and every answer says plainly when the researcher, not
 * Samply, is the one who can help.
 *
 * Same conventions as ../troubleshooting/content.ts: one object per language,
 * built from a flat string list by `fromStrings`, with the same tiny inline
 * markup (**bold**, `code`, *italic*, [label](href)). Hrefs may be internal
 * (`/docs/…`, `/participant/…`), external (`https://…`) or `mailto:`.
 *
 * Question ids are URL anchors (`/docs/faq#contact-researcher`) meant to be
 * pasted into support replies. They are part of the skeleton, never translated,
 * and must not change once published.
 */

export type Block =
  | { kind: "p"; text: string }
  /** Something the participant cannot undo or easily recover. Rendered prominently. */
  | { kind: "callout"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] };

export interface Question {
  id: string;
  q: string;
  blocks: Block[];
}

export interface Section {
  heading: string;
  questions: Question[];
}

/** The "who should I ask?" card at the top of the page. */
export interface Routing {
  heading: string;
  researcherTitle: string;
  researcherItems: string[];
  samplyTitle: string;
  samplyItems: string[];
  note: string;
}

export interface FaqPage {
  intro: string[];
  routing: Routing;
  sections: Section[];
}

const SUPPORT = "[yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn)";

const en: FaqPage = {
  intro: [
    "This page is for people taking part in a study that uses the **Samply Research** app. Samply is the tool that delivers a study's notifications. The study itself — its questions, its schedule, any payment, and your answers — is run by a researcher, usually at a university. Knowing which of the two to ask gets you an answer much faster.",
  ],
  routing: {
    heading: "Who should I ask?",
    researcherTitle: "The researcher running your study",
    researcherItems: [
      "How many notifications you get, when, and for how long",
      "Survey questions, survey links that do not work, or errors inside a survey",
      "Payment, course credit, vouchers or any other compensation",
      "Whether a missed notification or a late answer still counts",
      "Withdrawing your answers, or how your answers are used",
      "Anything in the study description or consent form",
    ],
    samplyTitle: "Samply support",
    samplyItems: [
      "The app crashes or will not open",
      "You cannot sign up, log in or reset your password",
      "Your Samply account, or deleting it",
      "No notifications arrive at all, even after following the steps on this page",
      "Problems with this website",
    ],
    note: "Samply support cannot see your answers, does not set the study schedule, and cannot pay compensation or grant credit. For those questions only the researcher can help — writing to Samply first only delays your answer.",
  },
  sections: [
    {
      heading: "Contacting your researcher",
      questions: [
        {
          id: "contact-researcher",
          q: "How do I contact the researcher of my study?",
          blocks: [
            { kind: "p", text: "Open the Samply Research app, tap the study on your home screen, and scroll down to **Responsible researcher**. Tap the email address: your mail app opens a message to the researcher with the study name and your Samply ID already in the subject line, so they can find you straight away." },
            { kind: "p", text: "The invitation you received, the study description and the consent form usually include contact details as well." },
          ],
        },
        {
          id: "no-contact",
          q: "The study shows no contact details. What now?",
          blocks: [
            { kind: "p", text: "Look at the invitation that brought you to the study — an email, a course page, a poster or a flyer — and at the consent form. Researchers are expected to give a contact in at least one of these places. If you still cannot find one, write to Samply support with the study name exactly as it appears in the app, and we will help you reach the researcher." },
          ],
        },
        {
          id: "what-to-include",
          q: "What should I include in my message?",
          blocks: [
            {
              kind: "list",
              items: [
                "The study name, as shown in the app.",
                "Your **Samply ID**. Researchers see this ID, not your name or email address, so without it they cannot find your data.",
                "What happened, and roughly when — for example the date and time of a notification that did not arrive.",
                "For notification problems: your phone model, and whether it runs Android or iOS.",
              ],
            },
          ],
        },
        {
          id: "samply-id",
          q: "What is my Samply ID, and where do I find it?",
          blocks: [
            { kind: "p", text: "Your Samply ID is a random code the app creates for you. Researchers see this code instead of your name or email address, which keeps your answers pseudonymous. You find it in the app under **More → Settings**, and on this website after you [log in as a participant](/participant/login)." },
            { kind: "p", text: "Some studies also give you a **Participant code**, shown on the study's screen in the app. If you have one, include it as well when you write to the researcher." },
          ],
        },
      ],
    },
    {
      heading: "Notifications",
      questions: [
        {
          id: "no-notifications",
          q: "I am not receiving notifications",
          blocks: [
            { kind: "p", text: "In the app, open **More → Notification check**. It checks every step a notification passes through, shows which one is broken, and offers a fix. The most common causes are:" },
            {
              kind: "list",
              items: [
                "Notifications for Samply are turned off in your phone's settings.",
                "**On Android:** battery optimisation is putting the app to sleep. Turn it off for Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) shows the steps for your phone model.",
                "**On iPhone:** a Focus mode or the Scheduled Summary is holding notifications back. Allow Samply to deliver notifications immediately.",
                "You reinstalled the app or moved to a new phone. Log in again, then tap **Re-register this device** in Notification check.",
              ],
            },
            { kind: "p", text: "If Notification check shows that everything is fine and notifications still do not arrive, contact the researcher. The study may be paused or finished, or simply not scheduled to send anything at the moment." },
          ],
        },
        {
          id: "wrong-time",
          q: "Notifications arrive at the wrong time",
          blocks: [
            { kind: "p", text: "If you travelled or your phone's time zone changed, open **More → Settings** and look at **Timezone**. If your saved and actual time zones differ, tap **Save the current timezone**." },
            { kind: "p", text: "If the time zone is right, the timing is part of the study design — many studies deliberately send at random moments of the day. Ask the researcher. The preferred time period you can enter in Settings is information for researchers only; it does not block notifications by itself." },
          ],
        },
        {
          id: "too-many",
          q: "I get too many notifications, or want them to stop",
          blocks: [
            { kind: "p", text: "How often you are notified is decided by the researcher, not by Samply, so ask them whether your schedule can be changed. To stop all notifications from a study, [leave the study](/docs/faq#leave). Turning notifications off in your phone's settings also stops them, but the study will then record you as not responding." },
          ],
        },
        {
          id: "missed",
          q: "I missed a notification. Can I still answer?",
          blocks: [
            { kind: "p", text: "Every notification you received is listed in the **History** tab of the app, and you can open the survey from there. Many studies let links expire after a while, because answers given much later are less useful for the research. If you see **The link has expired**, the researcher has closed that window. Whether a missed notification affects your payment or credit is up to the researcher." },
          ],
        },
      ],
    },
    {
      heading: "Surveys and answers",
      questions: [
        {
          id: "survey-error",
          q: "The survey link does not open, or shows an error",
          blocks: [
            { kind: "p", text: "Surveys are hosted by the researcher's own survey tool — for example Qualtrics, SoSci Survey or LimeSurvey — not by Samply. Try again on a stable internet connection. If the survey page itself shows an error, or says the survey is closed, contact the researcher: only they can fix it. A screenshot helps." },
          ],
        },
        {
          id: "not-marked-done",
          q: "I finished a survey, but the app does not show it as completed",
          blocks: [
            { kind: "p", text: "Samply only learns that a survey is finished if the survey sends you back to the app at the end, and not every study is set up that way. Your answers are not lost — they are stored in the researcher's survey tool. If your compensation depends on it, tell the researcher the date and time you answered." },
          ],
        },
        {
          id: "change-answers",
          q: "I made a mistake in my answers",
          blocks: [
            { kind: "p", text: "Your answers go directly to the researcher's survey tool, and Samply cannot see or change them. Write to the researcher with the date and time of the survey and what you would like to correct." },
          ],
        },
      ],
    },
    {
      heading: "Joining and leaving a study",
      questions: [
        {
          id: "join",
          q: "How do I join a study?",
          blocks: [
            { kind: "p", text: "In the app, tap **Find a study** and either scan the study's QR code or enter the 8-character study code from your invitation. Opening an invitation link on your phone works too. Some studies are also listed under **Public studies**." },
          ],
        },
        {
          id: "code-not-found",
          q: "The app says no study was found for my code",
          blocks: [
            { kind: "p", text: "Check the code for typos — it has 8 characters. If it is correct, the study may have closed or not opened yet. The researcher can tell you which." },
          ],
        },
        {
          id: "leave",
          q: "How do I leave a study?",
          blocks: [
            { kind: "p", text: "Open the study in the app, scroll to the bottom, and tap **Leave the study**. The app asks you to confirm, because this cannot be undone. Notifications from that study stop straight away." },
            { kind: "callout", text: "Leaving a study stops new notifications, but it does not delete answers you have already given — the researcher holds those. If you want them withdrawn, write to the researcher and include your Samply ID." },
          ],
        },
        {
          id: "payment",
          q: "When will I receive my payment or course credit?",
          blocks: [
            { kind: "p", text: "Compensation is arranged and paid by the researcher, not by Samply. Samply does not handle payments to participants and cannot see whether you have been paid. Ask the researcher, and include your Samply ID." },
          ],
        },
      ],
    },
    {
      heading: "Your account and your data",
      questions: [
        {
          id: "forgot-password",
          q: "I forgot my password",
          blocks: [
            { kind: "p", text: "On the login screen, tap **Forgot your password?** and enter your email address. You will receive a link to set a new password. If it does not arrive within a few minutes, check your spam folder; if it is not there either, contact Samply support." },
          ],
        },
        {
          id: "change-email",
          q: "How do I change my email address?",
          blocks: [
            { kind: "p", text: "In the app, open **More → Settings** and edit your email under **Account information**. Log out and log back in afterwards for the change to take effect." },
          ],
        },
        {
          id: "what-researchers-see",
          q: "What can the researcher see about me?",
          blocks: [
            { kind: "p", text: "Researchers see your Samply ID — not your name, email address or phone number. They see when notifications were sent to you and whether you opened them, and they receive your answers through their own survey tool. If a study uses your location to trigger notifications, your location stays on your phone and is not shared with researchers." },
            { kind: "p", text: "If you write to a researcher by email, they will of course see your email address. The [Privacy Policy](/docs/policy) explains in detail what Samply stores." },
          ],
        },
        {
          id: "delete-account",
          q: "How do I delete my account and my data?",
          blocks: [
            { kind: "p", text: "In the app, open **More → Settings**, tap **Delete my account**, and confirm with your password. This removes your Samply account, takes you out of all your studies, and erases the records Samply holds about you. It cannot be undone." },
            { kind: "callout", text: "Deleting your Samply account does not delete answers stored in a researcher's survey tool — Samply has no access to them. If you want those removed too, write to each researcher with your Samply ID **before** you delete your account. Afterwards the ID is no longer shown in the app." },
          ],
        },
        {
          id: "download-data",
          q: "Can I get a copy of my data?",
          blocks: [
            { kind: "p", text: "Yes. [Log in as a participant](/participant/login) on this website and choose **Download my data** to get a copy of everything Samply holds about you. For a copy of your survey answers, ask the researcher." },
          ],
        },
      ],
    },
    {
      heading: "Contacting Samply support",
      questions: [
        {
          id: "contact-samply",
          q: "How do I contact Samply support?",
          blocks: [
            { kind: "p", text: `Write to ${SUPPORT}, or open **More → Contacts** in the app. Please include your phone model, its Android or iOS version, and the app version shown under **More → About**. Replies usually take one to two working days.` },
            { kind: "p", text: "Samply is run by a small team at the University of Konstanz. We cannot answer questions about a particular study, and forwarding them only delays your answer — so please send those to the researcher." },
          ],
        },
      ],
    },
  ],
};

export const ENGLISH = en;

/**
 * Rebuilds a page from a flat, ordered list of strings, so a translation is a
 * string list in reading order rather than a reproduced object graph — the
 * structure (and every question id) is identical to English by construction.
 *
 * The order is: intro paragraphs; routing heading, researcher title, researcher
 * items, Samply title, Samply items, routing note; then per section its
 * heading, and per question its text followed by each block — p/callout → its
 * text; list → each item.
 *
 * Throws on a count mismatch, so a half-finished translation fails the build
 * instead of shipping half in English.
 */
export function fromStrings(list: string[]): FaqPage {
  let i = 0;
  const next = (): string => {
    if (i >= list.length) throw new Error(`faq: ran out of strings at index ${i}`);
    return list[i++];
  };

  const page: FaqPage = {
    intro: en.intro.map(next),
    routing: {
      heading: next(),
      researcherTitle: next(),
      researcherItems: en.routing.researcherItems.map(next),
      samplyTitle: next(),
      samplyItems: en.routing.samplyItems.map(next),
      note: next(),
    },
    sections: en.sections.map((section) => ({
      heading: next(),
      questions: section.questions.map((question) => ({
        id: question.id,
        q: next(),
        blocks: question.blocks.map((block): Block => {
          switch (block.kind) {
            case "p":
              return { kind: "p", text: next() };
            case "callout":
              return { kind: "callout", text: next() };
            case "list":
              return { kind: "list", ordered: block.ordered, items: block.items.map(next) };
          }
        }),
      })),
    })),
  };

  if (i !== list.length) {
    throw new Error(`faq: ${list.length} strings supplied, ${i} consumed`);
  }
  return page;
}

/** Every translatable string on a page, in `fromStrings` order. */
export function toStrings(page: FaqPage): string[] {
  const out: string[] = [...page.intro];
  const r = page.routing;
  out.push(r.heading, r.researcherTitle, ...r.researcherItems, r.samplyTitle, ...r.samplyItems, r.note);
  for (const s of page.sections) {
    out.push(s.heading);
    for (const q of s.questions) {
      out.push(q.q);
      for (const b of q.blocks) {
        if (b.kind === "list") out.push(...b.items);
        else out.push(b.text);
      }
    }
  }
  return out;
}
