const DAY_ROWS = [
  { day: 'Day 1', anchor: 'The moment they joined (plus ~1 minute).', note: 'Notifications set for Day 1 fire almost immediately after enrolment.' },
  { day: 'Day 2', anchor: 'Midnight of the next calendar day in the chosen timezone.', note: 'A participant who joins at 21:00 on Monday gets their Day 2 notifications on Tuesday.' },
  { day: 'Day N', anchor: 'Midnight of the Nth calendar day after the join date.', note: 'Day 14 = midnight of the 14th day counted from the join day.' },
];

const EXAMPLES = [
  {
    title: '14-day diary study',
    config: [
      'Start: Day 1 after registration.',
      'Stop: Day 15 after registration (end of Day 14).',
      'Interval: daily at 20:00.',
      'Recipients: all current and future participants.',
    ],
    result: 'Every participant gets 14 evening pings, starting the day they join, regardless of when others enrolled.',
  },
  {
    title: 'Burst protocol — weeks 1 and 3 only',
    config: [
      'Schedule A — Start: Day 1, Stop: Day 8. Interval: daily at 12:00.',
      'Schedule B — Start: Day 15, Stop: Day 22. Interval: daily at 12:00.',
      'Both schedules target the same participants.',
    ],
    result: 'Two independent personal schedules cover two separate weeks. The quiet week in between needs no schedule.',
  },
  {
    title: 'Intervention study — active phase from Day 3',
    config: [
      'Start: Day 3 after registration.',
      'Stop: Day 10 after registration.',
      'Interval: three times a day (09:00, 13:00, 18:00) — add three separate intervals.',
    ],
    result: 'Participants complete a two-day baseline (Days 1–2) before the intervention notifications begin on Day 3.',
  },
];

export default function PersonalContent() {
  return (
    <>
      <p>
        A personal schedule does not fire at a fixed calendar date. Instead it fires relative to the
        moment each participant joined your study. Two participants who enrol a week apart will each
        receive their Day 1 notification on their own Day 1 — not on the same Monday.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>What Day N means</h2>
      <p>
        When you set a personal schedule, you define a start and a stop in terms of
        <em> days after registration</em>, not calendar dates. Samply translates that offset into a
        real timestamp for each participant individually at the moment they enrol.
      </p>

      <table>
        <thead>
          <tr>
            <th>Day label</th>
            <th>Actual anchor point</th>
            <th>Practical note</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The repeating pattern you choose (daily, specific weekdays, every other day) then runs
        between those two anchored timestamps. Samply expands the schedule against each participant's
        personal window and writes one queue entry per firing time.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Building a personal schedule in the form</h2>
      <p>
        Personal schedules use the same schedule form as all other types. The sections that
        differ from a standard repeating schedule are Step 6 (Start) and Step 7 (Stop).
      </p>

      <h3>Step 6 — When to start</h3>
      <p>Choose one of two relative-start options:</p>
      <dl>
        <dt>On day N after registration</dt>
        <dd>
          Samply counts N calendar days from the join date and fires the first notification at
          midnight of that day. Set <em>N = 1</em> to start immediately after joining; set
          <em> N = 3</em> to leave a two-day buffer before the schedule begins.
        </dd>
        <dt>After X days / hours / minutes from registration</dt>
        <dd>
          An exact duration offset from the join timestamp. Use this when you need sub-day
          precision — for example, start 4 hours after joining rather than waiting until the
          next midnight.
        </dd>
      </dl>
      <p>
        You can also choose a fixed calendar date as the start, which turns the schedule into a
        hybrid: it still uses the personal stop anchor but the start is the same for everyone.
      </p>

      <h3>Step 7 — When to stop</h3>
      <p>
        The same two options apply: stop on Day N after registration, or stop after a precise
        duration. The stop is exclusive — a schedule set to stop on Day 15 fires its last
        notification at the end of Day 14.
      </p>

      <h3>Step 2 — The repeating interval</h3>
      <p>
        Within the personal window, choose a repeating pattern: every day, specific weekdays, every
        other day, and so on. You can also add multiple intervals to the same schedule — for
        example, three separate time-of-day rows (09:00, 13:00, 18:00) to send three notifications
        per day.
      </p>
      <p>
        To send at random times within daily windows instead of fixed clock times, select
        <strong> Time window</strong> instead of specific time points. This makes the schedule
        both personal and randomized. See <a href="/docs/types#randomized">Randomized schedules</a>{' '}
        for the window controls.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Timezone handling</h2>
      <p>
        By default, all times in a personal schedule are interpreted in the timezone you select
        at the top of the form. Enable <strong>Adjust to participant timezone</strong> to have
        Samply re-anchor each participant's times to their device timezone instead.
      </p>
      <p>
        When participant timezone adjustment is on, a 20:00 notification fires at 20:00 in
        Berlin for a Berlin participant and at 20:00 in Tokyo for a Tokyo participant — each at
        their local evening. The device timezone is recorded at enrolment and can be updated
        by the participant from the app settings.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Future participants</h2>
      <p>
        The <strong>Recipients</strong> section of the form lets you choose between current
        participants only, or all future participants too. When <em>All future participants</em>
        is checked, Samply applies the personal schedule to every new enrolment automatically —
        no manual action needed.
      </p>
      <p>
        This is the setting to enable for open-recruitment studies where participants join
        continuously over weeks or months. Without it, participants who join after the schedule
        is created receive no notifications from it.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Example configurations</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Result: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Common mistakes</h3>
      <dl>
        <dt>Setting a fixed calendar stop date instead of a relative one</dt>
        <dd>
          If you set stop to a specific date in the past, no notifications fire for anyone who
          joins after that date. Use a relative stop (Day N) whenever participants join on
          different days.
        </dd>
        <dt>Forgetting to check future participants</dt>
        <dd>
          A personal schedule with only current participants selected will silently ignore
          everyone who joins later. For open-recruitment studies, always check
          <em> All future participants</em>.
        </dd>
        <dt>Day 1 meaning different things in your analysis</dt>
        <dd>
          Samply counts Day 1 as the join day. If your protocol defines Day 1 as the first full
          calendar day after joining, set your start to Day 2 in the form.
        </dd>
      </dl>

      <h3>What to read next</h3>
      <p>
        Once a schedule is saved, Samply expands it into a per-participant queue of sends.
        See <a href="/docs/queue">The scheduled queue</a> to understand how to read and manage it.
      </p>
    </>
  );
}
