const GOALS = [
  {
    slug: "first-study",
    label: "Set up my first study",
    body: "Create the container — participants, schedules, and response history all live inside one study.",
    cta: "Your first study →",
  },
  {
    slug: "invite",
    label: "Invite participants",
    body: "Participants join by tapping a link or scanning a QR code. You never see their contact details.",
    cta: "Inviting participants →",
  },
  {
    slug: "types",
    label: "Choose a schedule type",
    body: "One-time, repeating, randomized, or personal — four types, each suited to a different research design.",
    cta: "The four types →",
  },
  {
    slug: "form",
    label: "Create a schedule",
    body: "The schedule form walks you through Content, Type, Audience, and Options in that order.",
    cta: "Creating a schedule →",
  },
  {
    slug: "placeholders",
    label: "Personalise survey URLs",
    body: "Samply can personalise each notification link with the participant's ID, study ID, or custom code — so your survey tool knows exactly who responded.",
    cta: "URL personalisation →",
  },
  {
    slug: "reminders",
    label: "Send reminders",
    body: "Automatically follow up if a participant has not responded within a set time window.",
    cta: "Reminders →",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a study",
    body: "A study is the top-level container. Give it a name and a consent form — that is all you need to get started.",
  },
  {
    n: "02",
    title: "Add a schedule",
    body: "Choose a schedule type (one-time, repeating, randomized, or personal), write the notification text, set the timing, and select who receives it.",
  },
  {
    n: "03",
    title: "Enrol participants",
    body: "Share the QR code or join link. Participants tap it in the Samply Research app and are immediately enrolled.",
  },
  {
    n: "04",
    title: "Samply fires the notifications",
    body: "The dashboard expands each schedule into a per-participant queue and delivers each notification at the right time.",
  },
  {
    n: "05",
    title: "Participants respond",
    body: "Tapping the notification opens your survey link. Completions are logged automatically when Samply detects the response.",
  },
];

export default function HomeContent() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Start here</h2>
      <p>Pick the task that matches where you are right now.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>How Samply works</h2>
      <p>Five steps from sign-up to response data.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Key concepts at a glance</h2>
      <p>A short vocabulary before you dive in. The <a href="/docs/glossary">glossary</a> has the full definitions.</p>

      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Study</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>The top-level container. Everything — participants, schedules, results — belongs to one study.</td></tr>
          <tr><td>Schedule</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>A rule that says <em>who</em> gets a notification, <em>when</em>, and <em>what it says</em>. One study can have many schedules.</td></tr>
          <tr><td>Queue</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>The expanded list of individual sends generated from a schedule — one row per participant per send time.</td></tr>
          <tr><td>Participant</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>A person enrolled in your study via the Samply Research app. Identified by an anonymous ID, never by contact details.</td></tr>
          <tr><td>Completion</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply marks a notification as completed when it detects a survey response linked to that send.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>How to cite Samply</h2>
      <p>
        If you use Samply in your research, please cite the original publication:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Where to go next</h3>
      <p>
        If this is your first time: read <a href="/docs/first-study">Your first study</a> — it walks through creating a study,
        adding a schedule, and getting one participant enrolled end to end.
      </p>
      <p>
        If you have an existing study and want to do more: jump to{" "}
        <a href="/docs/placeholders">URL personalisation</a>,{" "}
        <a href="/docs/groups">Groups</a>, or{" "}
        <a href="/docs/reminders">Reminders</a> in the Power features section.
      </p>
    </>
  );
}
