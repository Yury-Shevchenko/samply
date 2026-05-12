const SECTIONS = [
  { id: 'content',    label: 'Content',     summary: 'Title, message, and survey URL.' },
  { id: 'timezone',  label: '1. Timezone',  summary: 'Which clock to use, and whether to follow each participant.' },
  { id: 'audience',  label: '2. Participants', summary: 'Who receives this schedule.' },
  { id: 'time',      label: '3. Time',      summary: 'Fixed clock times, random windows, or a minute-level repeat.' },
  { id: 'date',      label: '4. Date',      summary: 'One specific date, or a recurring day pattern.' },
  { id: 'month',     label: '5. Month',     summary: 'Limit recurring sends to certain months. Repeating only.' },
  { id: 'start',     label: '6. Start',     summary: 'When the repeating schedule begins. Repeating only.' },
  { id: 'stop',      label: '7. Stop',      summary: 'When the repeating schedule ends. Repeating only.' },
  { id: 'expiry',    label: '8. Expiry',    summary: 'How long the survey link stays live after delivery.' },
  { id: 'reminders', label: '9. Reminders', summary: 'Follow-up pings if no completion is detected.' },
];

const TYPE_MATRIX = [
  { time: 'Specific time point(s)', date: 'Specific date(s)',           type: 'One-time',          link: '/docs/types#one-time' },
  { time: 'Specific time point(s)', date: 'Repeat every N days / weekdays / month days', type: 'Repeating', link: '/docs/types#repeating' },
  { time: 'Specific time point(s)', date: 'Repeat + start/stop relative to registration', type: 'Personal', link: '/docs/personal' },
  { time: 'Time window',            date: 'Specific date(s)',           type: 'One-time randomized', link: '/docs/types#randomized' },
  { time: 'Time window',            date: 'Repeat + start/stop relative to registration', type: 'Personal randomized', link: '/docs/types#randomized' },
];

export default function FormContent() {
  return (
    <>
      <p>
        All four schedule types are created in the same form. The section order is fixed: you
        always move top to bottom. Most sections only become relevant once you make a choice in
        Step 4 — the form hides irrelevant sections automatically.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Content</h2>
      <p>
        These three fields appear at the top of the form, before the numbered steps, and apply
        to every send this schedule generates.
      </p>
      <dl>
        <dt>Title</dt>
        <dd>
          The bold first line of the push notification on the participant device. Notifications
          that share the same title replace each other in the system tray rather than stacking.
          Use a consistent title per study if you want only one notification visible at a time,
          or use distinct titles if you want them to coexist.
        </dd>
        <dt>Message</dt>
        <dd>The notification body — the second line visible in the system tray.</dd>
        <dt>Web Link</dt>
        <dd>
          The URL that opens when the participant taps the notification. This is typically your
          Qualtrics, REDCap, or other survey link. Leave out the URL only if you want a
          notification with no action. See <a href='/docs/placeholders'>URL placeholders</a> to
          embed participant-specific values like IDs automatically.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Step 1 — Timezone</h2>
      <p>
        All times you enter in Steps 3, 6, and 7 are interpreted in this timezone. Pick the
        timezone your study is running in — typically where your research group is located.
      </p>
      <p>
        <strong>Adjust to participant timezone</strong> overrides the study timezone for each
        participant individually. When enabled, a 20:00 send fires at 20:00 in each
        participant device timezone rather than at 20:00 in the study timezone. This works for
        both current and future participants as long as the Samply app has recorded their
        timezone.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Step 2 — Participants</h2>
      <p>Choose who receives notifications from this schedule. You can mix options.</p>
      <dl>
        <dt>All future participants (excluding current)</dt>
        <dd>
          Every new enrolment after this schedule is saved will be enrolled into it
          automatically. Essential for open-recruitment studies. Participants who are already
          enrolled when you create the schedule are <em>not</em> included by this option alone.
        </dd>
        <dt>Current participants — All</dt>
        <dd>Everyone enrolled at the moment you click Schedule notifications.</dd>
        <dt>Current participants — specific individuals</dt>
        <dd>Pick from the list of enrolled Samply IDs. Use this for one-off sends or testing.</dd>
        <dt>Groups</dt>
        <dd>
          Target one or more named groups. You can choose all groups or pick specific ones.
          See <a href='/docs/groups'>Groups</a> for how groups are created.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Step 3 — Time</h2>
      <p>
        This is the most consequential choice in the form. It determines whether send times are
        fixed, random, or set to a very short repeat cadence.
      </p>

      <h3>Specific time point(s)</h3>
      <p>
        Enter one or more HH:MM times. Each time becomes a separate send within every firing
        day. Click <strong>Add one more time point</strong> to add additional times — for
        example, 09:00, 13:00, and 18:00 for three sends per day.
      </p>

      <h3>Time window</h3>
      <p>
        Define a window with a From time, a To time, how many random sends to draw within the
        window, and a minimum gap between them. Samply picks a different random time for each
        participant within that window on each firing day.
      </p>
      <p>
        Click <strong>Add one more time window</strong> to define multiple windows per day
        (e.g., morning 08:00–11:00 and afternoon 14:00–17:00, two pings each).
      </p>

      <h3>Repeat (high-frequency)</h3>
      <p>
        Fires on a very short cycle: every minute, every 2, 5, 10, 15, or 30 minutes. Intended
        for real-time alerting within a lab session, not for daily ESM protocols.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Step 4 — Date</h2>
      <p>
        Combined with your Step 3 choice, this determines the schedule type. Choosing a
        specific date produces a one-time (or randomized one-time) schedule. Choosing any
        repeat option reveals the Start and Stop steps and produces a repeating or personal
        schedule.
      </p>

      <dl>
        <dt>Specific date(s)</dt>
        <dd>
          Pick a calendar day, month, and year. The notification fires at the Step 3 time(s)
          on that exact date. Add more dates for a multi-wave one-time schedule.
        </dd>
        <dt>Repeat every N day(s)</dt>
        <dd>
          Every day (N = 1), every other day (N = 2), every third day (N = 3), and so on.
        </dd>
        <dt>Repeat on specific weekday(s)</dt>
        <dd>Choose any combination of Monday through Sunday.</dd>
        <dt>Repeat on specific day(s) of month</dt>
        <dd>Choose any combination of the 1st through the 31st.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Step 3 + Step 4 = schedule type</h3>
      <table>
        <thead>
          <tr>
            <th>Step 3 — Time</th>
            <th>Step 4 — Date</th>
            <th>Resulting type</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Step 5 — Month</h2>
      <p>
        Only visible when Step 4 is a repeat option. Limits the schedule to specific calendar
        months. <strong>Repeat every month</strong> (the default) lets it run year-round.
        Choosing specific months is useful for seasonal protocols or studies that pause during
        summer and winter.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Step 6 — When to start</h2>
      <p>
        Only visible when Step 4 is a repeat option. Sets the date from which the schedule
        begins producing sends. Three options:
      </p>
      <dl>
        <dt>Start at a specific date and time</dt>
        <dd>
          The schedule starts at the same absolute moment for every participant. Use this when
          your study has a fixed launch date.
        </dd>
        <dt>Start after X days / hours / minutes from registration (or from now)</dt>
        <dd>
          An exact duration added to each participant join timestamp. The schedule window
          starts at a different wall-clock time for each participant. Choosing <em>now</em>{" "}
          as the reference anchors to the moment you click Schedule notifications rather than
          to enrolment.
        </dd>
        <dt>Start on day N after registration (or from now)</dt>
        <dd>
          Samply counts N calendar days from the join date and starts the schedule at midnight
          of that day. Day 1 = the join day itself. Day 2 = the next calendar midnight.
          See <a href='/docs/personal'>Personal scheduling</a> for full details.
        </dd>
      </dl>

      <h2 id='stop'>Step 7 — When to stop</h2>
      <p>
        Same three options as Start. The stop is exclusive: a schedule that stops at the end
        of Day 14 fires its last send during Day 14, not at the start of Day 15.
      </p>
      <p>
        If you leave the stop at a calendar date that is already in the past, the schedule
        generates no sends. For rolling-enrolment studies, always use a relative stop (Day N
        or duration offset) so that late joiners get their full protocol window.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Step 8 — Link expiry</h2>
      <p>
        Controls how long the survey link in the notification stays active after the push is
        delivered. If a participant taps the notification after the expiry window, the link no
        longer opens the survey.
      </p>
      <p>
        Set an expiry when your survey must be completed within a tight window — for example,
        in a momentary assessment where a stale response would bias the data. Leave it unset
        (the default) for surveys with no time pressure.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Step 9 — Reminders</h2>
      <p>
        Reminders are follow-up notifications sent automatically when Samply has not detected a
        survey completion. You can add one or more reminders per schedule, each with its own
        title, message, and delay (days + hours + minutes after the original notification).
      </p>
      <p>
        For reminders to work correctly, your survey tool must notify Samply when a participant
        completes the survey — otherwise every send gets a reminder regardless of actual
        completion. Full setup instructions are in <a href='/docs/reminders'>Reminders</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Submitting</h2>
      <p>
        Click <strong>Schedule notifications</strong> at the bottom of the form. Samply
        immediately expands the schedule into a queue of sends — one row per participant per
        send time — and schedules each one in the background job runner. You can review the
        full queue in the <a href='/docs/queue'>Scheduled queue</a>.
      </p>
      <p>
        A schedule cannot be edited after submission. To change timing or content, delete the
        schedule and create a new one. Deleting a schedule also removes all its pending sends
        from the queue.
      </p>
    </>
  );
}
