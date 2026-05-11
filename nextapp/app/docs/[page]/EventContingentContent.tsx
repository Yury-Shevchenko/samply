function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

function UrlBox({ url }: { url: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.8rem 1.2rem', borderRadius: '0.5rem', wordBreak: 'break-all', margin: '0.8rem 0 0' }}>
      {url}
    </div>
  );
}

export default function EventContingentContent() {
  return (
    <>
      <p>
        In a signal-contingent design, Samply decides when participants are notified. In an
        event-contingent design, the <em>participant</em> decides — they self-initiate a
        report immediately after a target event occurs in their life. Samply supports
        event-contingent designs through two mechanisms: the permanent study link and
        interactive action buttons on notifications.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2>The permanent study link</h2>
      <p>
        Every study can have a permanent link — a survey URL that is always visible to
        participants inside the Samply Research app, independent of any notification
        schedule. Participants tap it whenever they want to initiate a report; it does not
        wait for a push notification.
      </p>
      <p>
        Set the permanent link in <strong>Edit study → Permanent link</strong>. Leave it
        blank to disable it. Once set, the link appears in the participant&apos;s study
        screen immediately after they join.
      </p>

      <h3>URL placeholders in the permanent link</h3>
      <p>
        The same <code>%TOKEN%</code> placeholders available in scheduled notifications
        work in the permanent link. Samply substitutes them at the moment the participant
        taps the link:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Replaced with</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>The participant&apos;s anonymous Samply ID.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>The custom code entered at enrolment (left unreplaced if no code).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>The participant&apos;s group ID (left unreplaced if no group).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Unix timestamp (milliseconds) at the moment the link is tapped.</td>
          </tr>
        </tbody>
      </table>
      <p>A typical permanent link for an event-contingent study looks like this:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        Note that <Code>%TIMESTAMP%</Code> in the permanent link captures the tap time —
        the moment the participant decided to report — not a server-side dispatch time. Use
        this as your event timestamp in analysis.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2>When to use event-contingent sampling</h2>
      <dl>
        <dt>Pure event-contingent</dt>
        <dd>
          Participants tap the permanent link whenever a target event occurs — a conflict,
          a craving, a social interaction. No scheduled notifications needed. The study
          consists entirely of self-initiated reports.
        </dd>
        <dt>Hybrid design</dt>
        <dd>
          Combine scheduled notifications (signal-contingent) with the permanent link
          (event-contingent). Participants receive timed prompts <em>and</em> can
          self-initiate at any time. Both types of report appear in the history log.
        </dd>
        <dt>Contingent-on-experience bursts</dt>
        <dd>
          Participants receive a scheduled notification and then self-initiate follow-up
          reports throughout the experience. The permanent link serves as the follow-up
          mechanism; the initial notification triggers awareness.
        </dd>
      </dl>

      {/* ── Action buttons ────────────────────────────────────────────────── */}
      <h2>Action buttons on notifications</h2>
      <p>
        Samply can display interactive action buttons directly on the push notification
        before the participant opens the survey. Enable this in{' '}
        <strong>Edit study → Enable action buttons</strong>.
      </p>
      <p>
        When action buttons are enabled, each notification displays quick-reply options
        beneath the message in the system tray. Tapping an action opens the study screen
        in the Samply Research app rather than the survey URL directly, allowing
        participants to record a response with a single tap. This is particularly useful
        for ecological momentary assessments where a momentary response (e.g. a mood
        rating) should take less than five seconds.
      </p>
      <p>
        <strong>Note:</strong> Participants must rejoin the study for action button changes
        to take effect on their device, because the button configuration is registered with
        the push notification service at enrolment time.
      </p>

      {/* ── Compliance tracking ───────────────────────────────────────────── */}
      <h2>Tracking self-initiated reports</h2>
      <p>
        Taps on the permanent link are recorded in the history log with the tap timestamp.
        The CSV export includes the tap time as part of the event timestamps column,
        letting you distinguish scheduled sends from self-initiated reports by the absence
        of a server-side dispatch time.
      </p>
      <p>
        To correlate self-initiated reports with the triggering event, pass{' '}
        <Code>%TIMESTAMP%</Code> to your survey tool and store it as an embedded data
        field. This gives you a researcher-independent record of when the participant
        decided to report, regardless of network delays or survey load time.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Event-contingent vs geofencing</h3>
      <p>
        The permanent link relies on the participant to recognise and report the target
        event — it is subjective and voluntary. <a href='/docs/geofencing'>Geofencing</a>{' '}
        detects location events automatically and fires a notification without participant
        action. Use geofencing when the target event has a precise GPS signature; use the
        permanent link when the event is psychological, social, or otherwise not
        detectable by sensors.
      </p>
    </>
  );
}
