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

export default function RemindersContent() {
  return (
    <>
      <p>
        A reminder is a follow-up push notification that Samply sends automatically when it
        has not detected a survey completion for the original send. Reminders are optional
        and configured per schedule. They fire at a fixed offset after the original
        notification — unless the participant completes the survey first, in which case
        Samply cancels all pending reminders for that send automatically.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>How reminders work</h2>
      <p>
        When Samply dispatches an original notification, it immediately schedules any
        configured reminder rows in the queue. Each reminder row is a separate{' '}
        <strong>pending</strong> queue entry with <strong>Reminder: yes</strong>. The
        reminder inherits the same survey URL (including all substituted placeholder
        values) as the original send — participants who tap the reminder link land in the
        same survey session.
      </p>
      <p>
        Reminders are cancelled in two ways:
      </p>
      <ol>
        <li>
          Samply receives a <strong>completion event</strong> for the original send (via
          redirect or POST request — see below). It immediately cancels all pending
          reminders that share the same internal send ID.
        </li>
        <li>
          You manually delete the schedule or cancel the rows from the{' '}
          <a href='/docs/queue'>queue</a>.
        </li>
      </ol>
      <p>
        Without a completion event, every send gets a reminder regardless of whether the
        participant actually completed the survey.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configuring reminders in the schedule form</h2>
      <p>
        Step 9 of the schedule form is the reminder section. Toggle{' '}
        <strong>Send reminders</strong> to reveal the reminder planner. For each reminder
        you want to send, fill in:
      </p>
      <dl>
        <dt>Reminder title</dt>
        <dd>The bold first line of the reminder push notification on the participant device.</dd>
        <dt>Reminder message</dt>
        <dd>The notification body — the second line visible in the system tray.</dd>
        <dt>Sent after</dt>
        <dd>
          The delay from the original notification: days + hours + minutes. A reminder set
          to 0 days, 1 hour, 0 minutes fires one hour after the original send. All three
          fields default to 0 — set at least one to a non-zero value.
        </dd>
      </dl>
      <p>
        Click <strong>Add new reminder</strong> to add a second reminder at a different
        offset. You can chain as many reminders as needed — for example, a first reminder
        at 1 hour and a second at 4 hours. All reminders are cancelled as soon as a
        completion event arrives, regardless of which have already fired.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Registering a completion event</h2>
      <p>
        Samply cannot know on its own when a participant finishes a survey. Your survey
        tool must signal completion by calling the Samply completion endpoint. There are
        two ways to do this.
      </p>

      <h3>Option 1 — redirect (Qualtrics, LimeSurvey, most survey tools)</h3>
      <p>
        At the end of your survey, redirect the participant to the Samply completion URL.
        Samply marks the send as completed and cancels pending reminders, then shows the
        participant a confirmation page.
      </p>
      <p>
        The redirect URL follows this pattern — replace <em>your-study-slug</em> with
        your study URL slug and use the <Code>%MESSAGE_ID%</Code> placeholder so each
        participant&apos;s completion is recorded against their specific send:
      </p>
      <UrlBox url='https://app.samply.science/studies/your-study-slug/done/%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        In Qualtrics, set this as the survey end-of-survey redirect URL. In LimeSurvey,
        set it as the &quot;End URL&quot; on the survey settings panel. The survey tool
        substitutes <Code>%MESSAGE_ID%</Code> with the actual message ID it received via
        the URL parameter you passed in the notification link (see{' '}
        <a href='/docs/placeholders'>URL placeholders</a>).
      </p>

      <h3>Option 2 — POST request (REDCap, custom integrations)</h3>
      <p>
        Send an HTTP POST to the same endpoint. This is suited for survey tools that
        support end-of-survey webhooks, or for custom code running server-side.
      </p>
      <UrlBox url='POST https://app.samply.science/studies/your-study-slug/done/:messageid' />
      <p style={{ marginTop: '1.4rem' }}>
        A <code>200</code> response confirms the completion was recorded and reminders
        were cancelled. A <code>400</code> response means Samply could not find a matching
        result record for that message ID — check that <Code>%MESSAGE_ID%</Code> was
        correctly substituted and passed through.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Why MESSAGE_ID is required</h2>
      <p>
        Samply uses <Code>%MESSAGE_ID%</Code> to link a completion event to the exact
        notification send that triggered the survey. Without it, Samply cannot identify
        which pending reminders to cancel. The flow is:
      </p>
      <ol>
        <li>
          You put <Code>%MESSAGE_ID%</Code> in the notification Web Link as a query
          parameter — for example, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply substitutes the token with a unique 15-character ID at send time.
          The participant opens the survey URL with that ID already in it.
        </li>
        <li>
          Your survey tool reads the <code>messageid</code> parameter and passes it to
          the end-of-survey redirect or webhook.
        </li>
        <li>
          Samply receives the completion call with the message ID, cancels reminders, and
          marks the result record as completed.
        </li>
      </ol>
      <p>
        If you use reminders, always include <Code>%MESSAGE_ID%</Code> in your notification
        URL and verify that your survey tool forwards it to the completion endpoint.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics setup walkthrough</h2>
      <ol>
        <li>
          In the notification Web Link, add <code>?messageid=%MESSAGE_ID%</code> (plus any
          other placeholders you need).
        </li>
        <li>
          In your Qualtrics survey flow, add an <strong>Embedded Data</strong> element
          before the first block and create a field named <code>messageid</code>. Qualtrics
          captures query string parameters automatically.
        </li>
        <li>
          In <strong>Survey Options → Survey Termination</strong>, set
          the redirect URL to:
        </li>
      </ol>
      <UrlBox url='https://app.samply.science/studies/your-study-slug/done/${e://Field/messageid}' />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics substitutes <code>{'{e://Field/messageid}'}</code> with the captured
        value, so participants are redirected to the correct completion URL.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Reminders fire if no completion event arrives</dt>
        <dd>
          If the redirect or POST never reaches Samply — because the participant abandoned
          the survey mid-way, because the survey tool was misconfigured, or because the
          completion URL had a typo — the reminder will fire as scheduled. Test the full
          flow with a test participant before going live.
        </dd>
        <dt>Reminders inherit the original substituted URL</dt>
        <dd>
          The survey URL embedded in reminder notifications is the already-substituted URL
          from the original send — not a fresh substitution. The same message ID, batch
          number, and timestamps apply. This is intentional: the reminder should reopen
          the same survey session. If your survey tool creates a new response for each
          link open, ensure your logic handles this.
        </dd>
        <dt>Reminder rows count toward the queue limit</dt>
        <dd>
          Each reminder row is a separate pending entry in the queue and counts toward the
          50,000-row limit per study. A schedule with 100 participants and 2 reminders per
          send generates 3 rows per send, not 1.
        </dd>
      </dl>
    </>
  );
}
