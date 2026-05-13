function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

function Method({ verb, path, desc }: { verb: string; path: string; desc: string }) {
  const color =
    verb === 'GET'    ? 'var(--sage)'   :
    verb === 'POST'   ? 'var(--coral)'  :
    verb === 'PATCH'  ? '#b07d2a'       :
    verb === 'DELETE' ? 'var(--ink-40)' : 'var(--ink)';
  return (
    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'baseline', padding: '0.9rem 1.4rem', borderBottom: '1px solid var(--ink-10)', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color, flexShrink: 0, width: '5.5rem' }}>{verb}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--ink)', flexShrink: 0 }}>{path}</span>
      <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)', marginLeft: 'auto' }}>{desc}</span>
    </div>
  );
}

function EndpointGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ margin: '2rem 0 3rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-40)', marginBottom: '0.6rem' }}>{title}</div>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {children}
      </div>
    </div>
  );
}

export default function ApiContent() {
  return (
    <>
      <p>
        Samply exposes two API surfaces: a REST API for programmatic study management
        (the <strong>researcher API</strong>), and two integration hooks used by survey
        tools to signal completion and trigger ad-hoc notifications. Both run on the same
        host as the dashboard.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>Base URL</h2>
      <p>
        The researcher REST API is mounted at <Code>/webapi/v1</Code>. All endpoints
        below are relative to that prefix. The completion and notify endpoints are mounted
        directly at the root and are documented separately.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Authentication</h2>
      <p>
        All researcher API endpoints (except the token endpoint itself) require a JWT
        passed in the <Code>x-auth-token</Code> request header. Obtain a token by
        posting your researcher credentials:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Exchange email + password for a JWT.' />
      </EndpointGroup>

      <p><strong>Request body</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>Researcher account email.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Researcher account password.</td></tr>
        </tbody>
      </table>

      <p><strong>Response</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT valid for 14 days. Pass it as <Code>x-auth-token</Code> on subsequent requests.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Rate limits</h2>
      <p>
        All API paths are subject to rate limiting. Requests that exceed a limit receive a{' '}
        <Code>429 Too Many Requests</Code> response. The three tiers are:
      </p>
      <table>
        <thead><tr><th>Limit</th><th>Paths</th></tr></thead>
        <tbody>
          <tr><td>20 requests / 15 min</td><td><Code>/webapi/v1/auth</Code>, login, account-creation, and password-reset endpoints</td></tr>
          <tr><td>30 requests / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 requests / 15 min</td><td>All other <Code>/api/*</Code> and <Code>/webapi/*</Code> paths</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>The active study</h2>
      <p>
        Most researcher API endpoints operate on the <em>active study</em> — a single
        study selected on the researcher account. Before calling participant,
        notification, or job endpoints, select the study you want to work with:
      </p>

      <EndpointGroup title='Study selection'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='List all studies you own or are a member of.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='Return the currently active study.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='Set the active study.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Get a specific study by its MongoDB ID.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Update fields on a study.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> expects <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        in the request body. The selection is stored on your researcher account and persists
        across requests until changed.
      </p>

      <p><strong>PATCH body</strong> (update study)</p>
      <p>Only the following fields are accepted; all others are ignored:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Participants</h2>
      <p>
        These endpoints manage participants in the active study. Participants created via
        the API are initially deactivated — they receive a JWT invitation token that
        activates them when they open the Samply Research app.
      </p>

      <EndpointGroup title='Participants — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='List all participants in the active study.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Get one participant by Samply ID.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Create and enrol a participant.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Update participant fields.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Remove a participant from the study.' />
      </EndpointGroup>

      <p><strong>POST body</strong> (create participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>yes</td><td>Display name — not shown to other participants.</td></tr>
          <tr><td><Code>email</Code></td><td>yes</td><td>Email used to create the Samply account.</td></tr>
          <tr><td><Code>code</Code></td><td>no</td><td>Participant code stored as <Code>username</Code> and available via <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>no</td><td>How long the invitation JWT remains valid (e.g. <Code>"7d"</Code>). Maximum 30 days — larger values are silently capped.</td></tr>
          <tr><td><Code>information</Code></td><td>no</td><td>Freeform JSON object for arbitrary participant metadata.</td></tr>
        </tbody>
      </table>

      <p><strong>Response</strong> (create participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>The auto-generated Samply ID for the new participant.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT invitation token. Send this to the participant; the app uses it to activate their account.</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH body</strong> (update participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Participant code / display name.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — set to <Code>true</Code> to stop notifications for this participant.</td></tr>
          <tr><td><Code>group</Code></td><td>Group assignment string.</td></tr>
        </tbody>
      </table>
      <p>All other fields sent in the body are ignored.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Schedules (notifications)</h2>
      <p>
        The notifications endpoints manage schedule definitions — the rules that expand
        into queue rows. Creating a schedule via the API triggers the same queue expansion
        as submitting the dashboard form.
      </p>

      <EndpointGroup title='Schedules — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='List all schedule definitions in the active study.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Get one schedule definition.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Create a schedule and expand it into the queue.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Update a schedule definition.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Delete a schedule and cancel its pending queue rows.' />
      </EndpointGroup>

      <p>
        The <Code>POST</Code> body mirrors the schedule form fields. The routing key is
        the combination of <Code>schedule</Code> (<Code>one-time</Code> or{' '}
        <Code>repeat</Code>) and <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code>, or <Code>user-specific</Code>), which maps to the
        same internal handlers used by the dashboard form.
      </p>

      <p><strong>PATCH body</strong> (update schedule)</p>
      <p>
        Only the following fields are accepted; all others are ignored:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Queue (jobs)</h2>
      <p>
        The jobs endpoints expose individual queue rows — the expanded sends generated
        from schedule definitions.
      </p>

      <EndpointGroup title='Queue rows — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='List all queue rows for the active study.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='List queue rows for a specific schedule.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Get one specific queue row.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Update a queue row.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Delete a queue row.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Completion callback</h2>
      <p>
        These endpoints are called by survey tools to register a completion event. On
        success, Samply marks the result as completed and cancels all pending reminders
        for that send. No authentication is required — the message ID serves as the
        shared secret.
      </p>

      <EndpointGroup title='Completion — no auth required'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Register completion and show a confirmation page (use as end-of-survey redirect).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Register completion silently (use as a webhook from your survey tool).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>The study URL slug shown in the dashboard address bar.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          The message ID from the <Code>%MESSAGE_ID%</Code> placeholder, passed through
          your survey URL to the end-of-survey redirect or webhook. See{' '}
          <a href='/docs/reminders'>Reminders</a> for the full setup walkthrough.
        </dd>
      </dl>

      <p>
        The <Code>POST</Code> endpoint returns <Code>200</Code> on success and{' '}
        <Code>400</Code> if no matching result record is found for the given message ID.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Notify hook</h2>
      <p>
        The notify hook sends an immediate ad-hoc push notification to participants in a
        study — without creating a schedule or queue row. Intended for event-triggered
        notifications from external systems (a REDCap alert, a lab system event, etc.).
        Authentication uses a per-study notify token rather than the researcher JWT.
      </p>

      <EndpointGroup title='Ad-hoc notification — token auth'>
        <Method verb='POST' path='/api/notify' desc='Fire an immediate notification to participants in a study.' />
      </EndpointGroup>

      <p><strong>Request body</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>yes</td><td>Study notify token. Regenerate it from Edit study → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>yes</td><td>The study MongoDB ID.</td></tr>
          <tr><td><Code>title</Code></td><td>yes</td><td>Notification title.</td></tr>
          <tr><td><Code>message</Code></td><td>yes</td><td>Notification body text.</td></tr>
          <tr><td><Code>url</Code></td><td>no</td><td>Survey URL. Supports the same <Code>%TOKEN%</Code> placeholders as scheduled notifications.</td></tr>
          <tr><td><Code>participantID</Code></td><td>no</td><td>Send to one specific participant (Samply ID). Omit to send to all.</td></tr>
          <tr><td><Code>groupID</Code></td><td>no</td><td>Send to all members of a group except the triggering participant. Typically used when one participant&apos;s action should notify their group.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>no</td><td>Link expiry in milliseconds from send time.</td></tr>
        </tbody>
      </table>

      <p>
        If both <Code>groupID</Code> and <Code>participantID</Code> are provided, Samply
        sends to all group members except the named participant. If only{' '}
        <Code>participantID</Code> is given, only that participant is notified. If neither
        is provided, all study participants receive the notification.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Error responses</h2>
      <table>
        <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Success.</td></tr>
          <tr><td><Code>400</Code></td><td>Bad request — missing or invalid fields, or no active study set on the account.</td></tr>
          <tr><td><Code>401</Code></td><td>Missing or expired <Code>x-auth-token</Code> header.</td></tr>
          <tr><td><Code>429</Code></td><td>Rate limit exceeded. Back off and retry after a short delay.</td></tr>
          <tr><td><Code>500</Code></td><td>Internal server error. The response body contains the fixed string <Code>"Internal server error"</Code>; detailed diagnostics are logged server-side only.</td></tr>
        </tbody>
      </table>
    </>
  );
}
