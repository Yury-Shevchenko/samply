const TOKENS = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'The participant anonymous Samply ID.',
    fallback: 'Always substituted — every participant has one.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'The custom code the participant entered when joining.',
    fallback: 'Left unreplaced if the participant did not enter a code. Enable "Ask for participant code" in Edit study and ensure participants fill it in.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'The short ID of the group the participant belongs to.',
    fallback: 'Left unreplaced if the participant has no group assigned.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'A unique ID generated for this specific send to this participant.',
    fallback: 'Always substituted.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Unix timestamp (milliseconds) of the moment the notification was dispatched.',
    fallback: 'Always substituted.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'How many notifications this participant has received from this study so far, counting from 1. The first notification has batch = 1, the second has batch = 2, and so on.',
    fallback: 'Always substituted.',
    example: '3',
  },
];

const TOOLS = [
  {
    name: 'Qualtrics',
    steps: [
      'In your survey flow, add an Embedded Data element before the first question block.',
      'Create fields named id, code, wave, messageid (or whatever names match your URL params).',
      'Qualtrics captures query string parameters automatically when the survey loads from a URL that includes them.',
      'Reference the values in question text or logic with ${e://Field/id} syntax.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Use a survey queue or public survey link with the record parameter.',
      'Pass %PARTICIPANT_CODE% as the record value so each submission maps to the correct REDCap record.',
      'Pass %MESSAGE_ID% as a hidden field if you need to wire up completion callbacks to cancel reminders.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Enable "URL fields" in the survey settings.',
      'Pass placeholder values as URL parameters — LimeSurvey stores them as response data automatically.',
    ],
    url: 'https://survey.institution.edu/123456?lang=en&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

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

export default function PlaceholdersContent() {
  return (
    <>
      <p>
        Placeholders are <Code>%TOKEN%</Code> strings you embed in the notification Web Link.
        When Samply fires the notification, it replaces each token with that
        participant real value before opening the URL. Every participant gets a
        personalised link — no manual work required.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2>Token reference</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Replaced with</th>
            <th>If unavailable</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>How substitution works</h2>
      <p>
        Substitution happens at send time, inside the notification dispatcher, immediately
        before the push is enqueued for delivery. The original URL stored in the schedule
        definition is never modified — the substituted URL exists only in the notification
        payload delivered to the device. Each participant therefore receives a unique URL
        even though all their notifications come from the same schedule.
      </p>
      <p>
        Samply only performs substitution when the URL contains at least one <Code>%</Code>{' '}
        character. URLs without any <Code>%</Code> are passed through unchanged, so there is
        no performance penalty for schedules that do not use placeholders.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2>Constructing the URL</h2>
      <p>
        Append placeholders as standard query string parameters. You can combine as many as
        you need. A typical URL for a study that tracks participants, waves, and completions
        looks like this:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        When Samply fires this notification for participant <em>abc123</em> on their third
        send, the URL becomes:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2>Tool-specific setup</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2>MESSAGE_ID and completion tracking</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> is the key that connects a survey response back to the
        notification that triggered it. When a participant completes your survey, your survey
        tool must send a callback to Samply with this ID. Samply uses it to:
      </p>
      <ol>
        <li>Mark the corresponding result record as completed.</li>
        <li>Cancel any pending reminder notifications for that send.</li>
      </ol>
      <p>
        Without this callback, Samply has no way to know the survey was submitted, and
        reminders will fire regardless of completion. The callback setup is covered in{' '}
        <a href='/docs/reminders'>Reminders</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2>Placeholders in the permanent study link</h2>
      <p>
        The same tokens work in the study permanent link — the always-available link
        participants can tap inside the Samply Research app at any time, independent of
        scheduled notifications. The permanent link is set in Edit study. Use it for
        event-contingent designs where participants self-initiate a report.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Unreplaced tokens in the URL</dt>
        <dd>
          If a token has no value for a participant (no code, no group), it is left in the
          URL as a literal string — for example, <Code>?code=%PARTICIPANT_CODE%</Code>.
          Your survey tool will receive that literal string as the parameter value. Test with
          a participant who has no code set to confirm your survey handles it gracefully.
        </dd>
        <dt>URL encoding</dt>
        <dd>
          Substituted values are inserted as-is. Samply IDs and message IDs use only
          alphanumeric characters and are URL-safe. Participant codes are researcher-defined
          — avoid spaces and special characters in codes if they will be used in URLs.
        </dd>
        <dt>BATCH counts all sends from the study, not just one schedule</dt>
        <dd>
          The batch number is the total number of results Samply has recorded for that
          participant across the entire study, not just within one schedule. If a participant
          is targeted by two schedules, their batch counter increases with every send from
          either schedule.
        </dd>
      </dl>
    </>
  );
}
