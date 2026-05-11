function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

const TARGETING = [
  { params: 'groupID + participantID', effect: 'All members of the group except the specified participant.' },
  { params: 'groupID only',            effect: 'All members of the group.' },
  { params: 'participantID only',      effect: 'That specific participant.' },
  { params: 'neither',                 effect: 'All participants in the study.' },
];

const CODE = `const url = "https://samply.uni-konstanz.de/api/notify";
const data = {
  projectID: "<your-study-id>",
  token:     "<your-notify-token>",
  title:     "your-notification-title",
  message:   "your-notification-message",
  url:       "https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_CODE%&message=%MESSAGE_ID%",
  expireIn:  60,          // minutes before an undelivered notification is discarded
  groupID:       "<optional>",
  participantID: "<optional>",
};

async function sendNotification(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

sendNotification(url, data);`;

export default function StreamContent() {
  return (
    <>
      <p>
        The Stream API lets an external system — a survey tool, a REDCap workflow, a
        script, or any HTTP client — trigger a push notification to study participants on
        demand. Instead of waiting for a scheduled send, you POST to the Samply notify
        endpoint and the notification fires immediately. This is the right tool for
        event-contingent designs where a notification should follow an event of interest
        rather than a clock time.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          The Stream API is introduced and empirically validated in a peer-reviewed article in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          A feasibility study with <strong style={{ color: 'var(--ink)' }}>110 participants</strong> over two weeks demonstrated an <strong style={{ color: 'var(--ink)' }}>83% response rate</strong>, with AI-modified news items delivered in real time — showing that external systems can stream dynamic, personalised content to participants at the moment events occur.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type must be <Code>application/json</Code>. No authentication header is
        used — authentication is handled by the per-study notify token in the request body.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify token</h2>
      <p>
        Each study has a notify token that authorises requests to the API. Tokens have an
        expiry date set by the study owner. Generate or regenerate a token from the{' '}
        <strong>Stream API</strong> tab inside your study dashboard. Regenerating
        immediately invalidates the previous token — update any scripts that use it.
      </p>
      <p>
        Only the study owner can generate tokens. Collaborators (members) can see the
        current token and use it in requests, but cannot regenerate it.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Request body</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>yes</td>
            <td>The study ID shown in the dashboard URL.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>yes</td>
            <td>The study notify token. Must not be expired.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>yes</td>
            <td>The bold first line of the push notification.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>yes</td>
            <td>The notification body text.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>no</td>
            <td>Survey link opened when the participant taps the notification. Supports URL placeholders (see below).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>no</td>
            <td>Minutes before an undelivered notification is discarded. Omit for no expiry.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>no</td>
            <td>Short group ID. Narrows delivery to members of that group (see Targeting).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>no</td>
            <td>Samply ID of a specific participant. Narrows delivery to one person or excludes them from a group send (see Targeting).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targeting</h2>
      <p>
        The combination of <Code>groupID</Code> and <Code>participantID</Code> controls
        who receives the notification:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        The <Code>groupID + participantID</Code> combination is designed for social
        ESM designs: participant A&apos;s action triggers a notification to the rest of
        their group, excluding themselves.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL placeholders</h2>
      <p>
        The <Code>url</Code> field supports the same <Code>%TOKEN%</Code> placeholders as
        scheduled notifications. Samply substitutes them per-participant before delivering
        the push:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Replaced with</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>The recipient&apos;s anonymous Samply ID.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>The recipient&apos;s participant code (left unreplaced if none).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>The recipient&apos;s group ID (left unreplaced if none).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>A unique ID for this send — use it to wire up completion callbacks and cancel reminders.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Code example</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Use cases</h2>
      <dl>
        <dt>Event-contingent ESM triggered from a survey tool</dt>
        <dd>
          At the end of a Qualtrics survey, an end-of-survey JavaScript snippet POSTs to
          the notify endpoint with the participant&apos;s <Code>participantID</Code>. A
          follow-up survey notification arrives on their device within seconds of
          completing the first.
        </dd>
        <dt>Social interaction designs</dt>
        <dd>
          When participant A submits a report flagging a social interaction, your backend
          POSTs with <Code>groupID</Code> set to their group and <Code>participantID</Code>{' '}
          set to participant A. The rest of the group receives a notification; participant
          A does not.
        </dd>
        <dt>Lab-triggered ambulatory phase</dt>
        <dd>
          A lab system starts the ambulatory phase of a study by POSTing a notification to
          all participants (<Code>projectID</Code> only, no group or participant filter)
          the moment the lab session ends, regardless of clock time.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Feasibility and performance</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> validated the Stream API in a two-week ESM study
        where an RSS feed of news articles was fetched daily and processed by ChatGPT into
        three conditions — original, paraphrased, and misinformation — before being streamed
        to participants via the notify endpoint. Three notifications per day were delivered
        to 110 participants based on live external events, not a fixed schedule.
      </p>
      <p>Key findings:</p>
      <ul>
        <li><strong>83% overall response rate</strong> — comparable to or better than conventional ESM studies of similar duration.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — response rates differed by platform; report platform as a covariate in analyses.</li>
        <li><strong>AI modifications maintained readability</strong> — only 1.2% of AI-modified items were rated non-readable; misinformation was successfully introduced (84% unfamiliarity vs. 73% baseline).</li>
        <li><strong>Dropout</strong> was consistent with other ESM studies of comparable length, confirming that real-time streaming does not increase participant burden.</li>
      </ul>
      <p>
        The study demonstrates that the Stream API is suitable for designs where notification
        content must be generated or selected at the moment of delivery — including
        news-perception research, social media studies, public opinion measurement,
        healthcare interventions, and environmental monitoring. An open-source server
        application implementing the pipeline is available on GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Responses</h2>
      <table>
        <thead><tr><th>Response</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notification dispatched successfully.</td></tr>
          <tr><td><Code>401</Code></td><td>Token missing, expired, or does not match the project.</td></tr>
        </tbody>
      </table>
    </>
  );
}
