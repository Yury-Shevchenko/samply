const STATUSES = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Pending',
    desc: 'Scheduled and waiting. The notification will fire at the time shown in Scheduled For.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'Processing',
    desc: 'The dispatcher has picked it up and is attempting delivery right now.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Sent',
    desc: 'Delivered to the push notification service. The device will receive it as soon as it is online.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Failed',
    desc: 'Delivery attempt failed — typically because the participant uninstalled the app or their token is stale. Failed rows stay visible so you can investigate.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Cancelled',
    desc: 'Removed before it could fire. This happens when a completion event triggers reminder cancellation, or when you cancel manually.',
  },
];

const COLUMNS = [
  { col: 'Scheduled for', desc: 'The exact date and time the notification is set to fire, shown in your browser local time.' },
  { col: 'Status',        desc: 'Current lifecycle state of this send (see table above).' },
  { col: 'Title',         desc: 'The notification title as it will appear on the participant device.' },
  { col: 'Rem.',          desc: 'Marked R if this row is a reminder send rather than the original notification.' },
  { col: 'To',            desc: 'Who this send targets. Shows group name pills when the schedule targets groups, or individual participant codes when targeting specific participants, or "all" when targeting all current participants.' },
];

export default function QueueContent() {
  return (
    <>
      <p>
        When you submit a schedule, Samply does not simply store a rule and check it at
        runtime. It immediately expands the schedule into a flat list of individual sends
        — one row per participant per send time — and writes each row into the queue.
        The queue is the source of truth for delivery — every notification Samply sends is
        represented as a row in the queue, and a send happens if and only if a row exists for it.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Where to find the queue</h2>
      <p>
        From your study, go to <strong>Schedule</strong> and click <strong>View queue →</strong>{" "}
        in the top-right corner to see all sends across every schedule, or click the link next to
        any individual schedule definition to filter to that schedule only. The top of the queue
        page shows your schedule definitions — the rules that generated the rows. Below that is the
        row-by-row table of every individual send.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Queue columns</h2>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>What it contains</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Row statuses</h2>
      <p>
        Every row moves through a lifecycle. By default all rows are shown — use the status
        filter pills to narrow the view to the statuses you care about.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtering</h2>
      <p>
        Two filters appear above the queue table and can be combined.
      </p>
      <dl>
        <dt>Filter by status</dt>
        <dd>
          Five toggleable pills: <strong>Pending</strong>, <strong>Processing</strong>,{' '}
          <strong>Sent</strong>, <strong>Failed</strong>, and <strong>Cancelled</strong>.
          Each pill is independent — click to turn it on or off. With nothing selected, all
          rows are shown. Select any combination to narrow the view: for example, toggle{' '}
          <strong>Pending</strong> and <strong>Failed</strong> together to see everything
          still awaiting delivery. A <strong>clear</strong> link appears whenever any pill
          is active and resets all status filters at once.
        </dd>
        <dt>Filter by participant</dt>
        <dd>
          A dropdown listing every enrolled participant by Samply ID (or their code if one was
          set). Select a participant to see only their sends. Combine with the status filter to
          answer questions like &ldquo;what pending notifications does participant X still have?&rdquo;
        </dd>
      </dl>
      <p>
        The table shows up to 50 rows per page matching the active filters. Use pagination to
        move through larger result sets, or narrow the view with the status or participant filter.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>How the queue is populated</h2>
      <p>
        Expansion happens synchronously at the moment you click <strong>Schedule
        notifications</strong>. For a schedule targeting 50 participants with daily sends over
        14 days, Samply writes 700 rows (50 × 14) into the queue immediately. For personal
        schedules, Samply also writes rows for every new participant who joins after the
        schedule is created, at the moment they enrol.
      </p>
      <p>
        The queue has a hard limit of <strong>50,000 pending rows per study</strong>. If you
        hit this limit, you must delete old schedule definitions (which removes their pending
        rows) before adding new ones. Sent and cancelled rows do not count toward the limit.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Deleting a schedule</h2>
      <p>
        Deleting a schedule definition from the Schedules tab removes the definition and
        cancels all its pending queue rows in one action. Rows that have already been sent
        are not affected — they remain visible with status <em>sent</em> and are included
        in the response history.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>After a send: the history</h2>
      <p>
        Once a row transitions to <em>sent</em>, the delivery event is also written to the
        study history log at <strong>/history</strong>. The history log records additional
        signal beyond the queue: whether the participant received the notification while the
        app was open, whether they tapped the notification bar, and whether they opened the
        survey link.
      </p>
      <p>
        The history is paginated and can be downloaded as a CSV for offline analysis. Each
        row in the CSV includes the Samply ID, notification title and message, the URL,
        server-side send time, and the per-event timestamps for receipt, tap, and open.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Reminders in the queue</h2>
      <p>
        When a schedule has reminders configured, each original send spawns one or more
        reminder rows at the offsets you defined. These rows are marked with an{' '}
        <strong>R</strong> badge in the <em>Rem.</em> column and share the same schedule title. A reminder row is
        automatically cancelled as soon as Samply detects a completion event for the
        original send — so participants who complete the survey on time never see the
        reminder. Uncompleted reminders fire normally. See{' '}
        <a href='/docs/reminders'>Reminders</a> for the completion-detection setup.
      </p>
    </>
  );
}
