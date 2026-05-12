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
        event-contingent designs through named event types that appear inside the Samply
        Research app.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Setting up event-contingent design</h2>
      <p>
        Open your study dashboard, go to the <strong>Settings</strong> tab, and enable{' '}
        <strong>Event-contingent design</strong>. Two configuration fields appear:
      </p>
      <dl>
        <dt>Participant-facing instructions</dt>
        <dd>
          A text block shown to participants in the Samply app after they join. Explain
          what kind of event they should report and how to use the links — for example,
          &ldquo;Tap the button below each time you experience a stressful event at work.&rdquo;
        </dd>
        <dt>Event types (up to 5)</dt>
        <dd>
          Each event type has a <strong>caption</strong> — the label the participant sees
          in the app — and a <strong>URL</strong> — the survey link that opens when they
          tap that caption. You can define between one and five distinct event types. If
          your study has only one kind of self-report, define one event type. If
          participants can report different categories of experience (e.g. positive event,
          negative event, neutral event), define one type per category, each pointing to
          a different survey or passing a different parameter.
        </dd>
      </dl>
      <p>
        Once saved, the event types appear in the participant&apos;s study screen in the
        Samply app. Tapping a caption immediately opens the corresponding URL — no
        notification needed.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL placeholders in event type links</h2>
      <p>
        Each event type URL supports the same <Code>%TOKEN%</Code> placeholders as
        scheduled notifications. Samply substitutes them at the moment the participant
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
      <p>A typical event type URL looks like this:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> captures the tap time — the moment the participant
        decided to report — not a server-side dispatch time. Use this as your event
        timestamp in analysis. See <a href='/docs/placeholders'>URL placeholders</a> for
        the full token reference.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>When to use event-contingent sampling</h2>
      <dl>
        <dt>Pure event-contingent</dt>
        <dd>
          Participants tap an event type whenever a target event occurs — a conflict,
          a craving, a social interaction. No scheduled notifications needed. The study
          consists entirely of self-initiated reports.
        </dd>
        <dt>Hybrid design</dt>
        <dd>
          Combine scheduled notifications (signal-contingent) with event types
          (event-contingent). Participants receive timed prompts <em>and</em> can
          self-initiate at any time. Both types of report appear in the history log.
        </dd>
        <dt>Multiple event categories</dt>
        <dd>
          Use up to five event types to distinguish between categories of experience.
          Each type can route to a different survey condition or pass a different
          identifier so responses are automatically sorted in your data.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tracking self-initiated reports</h2>
      <p>
        Taps on event type links are recorded in the history log with the tap timestamp.
        The CSV export includes the tap time in the event timestamps column, letting you
        distinguish scheduled sends from self-initiated reports.
      </p>
      <p>
        To correlate a self-initiated report with the triggering event, pass{' '}
        <Code>%TIMESTAMP%</Code> to your survey tool and store it as an embedded data
        field. This gives you a researcher-independent record of when the participant
        decided to report, regardless of network delays or survey load time.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Event-contingent vs geofencing</h3>
      <p>
        Event type links rely on the participant to recognise and report the target
        event — they are subjective and voluntary.{' '}
        <a href='/docs/geofencing'>Geofencing</a> detects location events automatically
        and fires a notification without participant action. Use geofencing when the
        target event has a precise GPS signature; use event-contingent design when the
        event is psychological, social, or otherwise not detectable by sensors.
      </p>
    </>
  );
}
