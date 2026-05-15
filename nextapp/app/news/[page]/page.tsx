import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "News & Updates — Samply" };

export default async function NewsSubPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (page !== "intro") notFound();

  const { t } = await getT();

  return (
    <div className="inner">
      <p />
      <header className="top">
        <nav className="nav">
          <div className="nav__section nav__section--pages">
            <li className="nav__item">
              <a className="nav__link nav__link--active" href="/news/intro">
                {t("news.navLabel")}
              </a>
            </li>
          </div>
        </nav>
      </header>

      <div className="card">
        <div className="card-message">
          <h5>
            <div className="headerLink">
              Editing of scheduled notifications
              <p>9 April 2024</p>
            </div>
          </h5>
          <p className="card-message">
            New feature allows researchers to edit scheduled notifications, enhancing the flexibility of Samply.
            Researchers can now adjust the title, message, survey URL, and delivery time of their planned notifications
            directly, eliminating the need to cancel and recreate them for any changes.
          </p>

          <h5>
            <div className="headerLink">
              Minimum Time Window for Geofencing Notifications
              <p>5 April 2023</p>
            </div>
          </h5>
          <p className="card-message">
            Geofencing is a tool that allows researchers to set up virtual boundaries around a physical location. Once a
            study participant enters or exits the geofence, it triggers a notification. However, the frequency of
            notifications can be overwhelming and annoying for users. To address this problem, a new option has been
            added to geofencing that allows a minimum time window between two notifications.
          </p>
          <p className="card-message">
            The new option to add a minimum time window between two notifications offers several benefits. Firstly, it
            reduces the number of notifications a participant receives, which can help prevent notification fatigue.
            Secondly, it ensures that notifications are spaced out enough to provide value to the user. For example, if
            a participant enters a geofenced area and receives a notification, they may not need another notification for
            a certain period. The new option allows researchers to set that period.
          </p>
          <p className="card-message">
            To use the new option, researchers can enter the minimum time window for each geofenced area on the
            researcher website. For example, they may set the minimum time window to 30 minutes for an enter event.
            This means that a participant will only receive a notification if 30 minutes have passed since the last
            notification. This can help to prevent multiple notifications, which may be false alarms. Researchers can
            customize the time window based on their needs and the needs of their participants.
          </p>

          <h5>
            <div className="headerLink">
              Support for event-contingent designs
              <p>12 December 2022</p>
            </div>
          </h5>
          <p className="card-message">
            This update allows you implement an event-contingent design in the app. You can specify a permanent URL link
            that participants can click in the app to initiate a report after a specific event occurs. The link is
            displayed to participants in the mobile app after they join your study. You can include the participant&apos;s
            Samply ID, participant code (entered when they joined the study), group ID, and timestamp in the link. To do
            this, use the{" "}
            <a target="_blank" href="/docs/notifications#placeholders" rel="noreferrer">
              placeholders
            </a>{" "}
            %SAMPLY_ID%, %PARTICIPANT_CODE%, %GROUP_ID%, and %TIMESTAMP% within the URL as part of the{" "}
            <a target="_blank" href="https://en.wikipedia.org/wiki/Query_string" rel="noreferrer">
              query strings
            </a>
            , for example{" "}
            <span className="example-link">
              https://survey.com/?id=%SAMPLY_ID%&amp;code=%PARTICIPANT_CODE%&amp;group=%GROUP_ID%&amp;time=%TIMESTAMP%
            </span>
          </p>

          <h5>
            <div className="headerLink">
              Adjusting to the participant&apos;s time zone
              <p>4 May 2022</p>
            </div>
          </h5>
          <p className="card-message">
            This update allows you to schedule notifications that are adjusted to the participant&apos;s time zone. For
            example, if you select 8 PM, it will be 8 PM in each participant&apos;s local time zone. Adjusting the time
            to the participant&apos;s time zone works for future and current participants with a specified time zone. You
            can see whether a participant has specified the time zone on the{" "}
            <a target="_blank" href="/users" rel="noreferrer">
              participant page
            </a>
            . If the participant&apos;s timezone is missing or incorrect, the participant can adjust it in the mobile
            app in the settings menu. Adjusting the time zone does not work for group notifications because group
            notifications are sent to all group members at the same time, so you must explicitly select the time zone
            for these notifications.
          </p>

          <h5>
            <div className="headerLink">
              Language localization
              <p>11 April 2022</p>
            </div>
          </h5>
          <p className="card-message">
            With the update of the mobile app (version 1.6.5) the user interface now supports three languages: English,
            German, and Russian. If the participant&apos;s default language is one of these languages, the app will be
            displayed in the respective language. The default language for other languages remains English. If you want
            the app in another language, please see the{" "}
            <a target="_blank" href="https://github.com/Yury-Shevchenko/samply/issues/18" rel="noreferrer">
              GitHub page
            </a>{" "}
            where we coordinate the translation of the app into other languages.
          </p>

          <h5>
            <div className="headerLink">
              Expiration time for notification links
              <p>8 March 2022</p>
            </div>
          </h5>
          <p className="card-message">
            With this new update, you can select the expiration time for the link in the notifications. For example, if
            you want participants to respond in a time window of 1 hour. The expiration time counts from the time when
            the notification is sent from the server. Unless the device is disconnected from the network (for example,
            in airplane mode) or notifications are disabled, the delivery time is close to the sending time (within a
            range of a second). After the link expires, participants can no longer open it from the notification tab or
            in the Samply app.
          </p>

          <h5>
            <div className="headerLink">
              Selecting timezone in notifications
              <p>23 December 2021</p>
            </div>
          </h5>
          <p className="card-message">
            A new update allows you to select a timezone for your notifications. For example, if you are in Europe and
            your participants are in the United States, you can select their timezone and set up notifications in their
            local time. Before this update, some of the notifications were scheduled based on the server&apos;s time
            zone, which is Central European Time. However, this caused problems for users in other timezones. With the
            new update, any new notification schedule you create will have a specific timezone and will work according
            to that timezone.
          </p>

          <h5>
            <div className="headerLink">
              Public vs. Private studies
              <p>9 June 2021</p>
            </div>
          </h5>
          <p className="card-message">
            At the current moment, all active studies are by default visible for participants in the tab &quot;Studies&quot; in
            the mobile app &quot;Samply Research&quot;. This is not very convenient both for participants and researchers.
            Participants might get confused by the large number of studies (in particular, the studies that are still in
            development, such as &quot;test studies&quot; and so on). Researchers, on the other hand, might be not interested in
            recruiting from general population, but wish to recruit participants individually, without disclosing a
            study to a general audience.
          </p>
          <p className="card-message">
            To solve this problem, the following changes will be implemented in June 2021. Each of your studies has two
            switches on this{" "}
            <a target="_blank" href="/projects" rel="noreferrer">
              page
            </a>{" "}
            with your projects.
          </p>
          <p className="card-message">
            You can activate the study with the &quot;Active&quot; toggle switch. When you activate the study, the link to the
            study web page should be displayed on the study card. This web page contains the QR code that a participant
            can use to take part in the study. This does not require your study to be in the list of public studies in
            the mobile app. Participants can find your study by clicking on the &quot;Find a study&quot; link in the mobile app
            (tab &quot;Home&quot;) and then scanning the QR code with a camera.
          </p>
          <p className="card-message">
            The second toggle is to make a study public. If you would like to make your study public and visible to
            anyone using the mobile app, please submit a request for approval by clicking on the toggle switch
            &quot;Public&quot; and following further instructions. Note that only studies with complete instructions, consent
            forms, researcher information, and a confirmed researcher email address can be approved. If you would like
            to test your study, you don&apos;t need to make your study public — please use the direct invitation with QR
            code option instead.
          </p>
          <p className="card-message">
            On June 21 (2 weeks from now), non-public studies will be hidden from the &quot;Studies&quot; tab in the mobile app.
            If you would like to make your study public, please submit a request via the menu on the Samply website
            (click the &quot;Public&quot; toggle switch on the study card{" "}
            <a target="_blank" href="/projects" rel="noreferrer">
              here
            </a>{" "}
            and then follow the instructions).
          </p>
          <p className="card-message">
            If you notice some problems and errors, please let us know via{" "}
            <a href="mailto:yury.shevchenko@uni.kn">email</a> or in our{" "}
            <a
              target="_blank"
              href="https://join.slack.com/t/samply-workspace/shared_invite/zt-e085hyyv-pFczGQFnVCA2w8lkcTmk6w"
              rel="noreferrer"
            >
              Slack channel
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
