const TYPES = [
  {
    n: "01",
    name: "One-time",
    tag: "fixed calendar",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Sends at one or more specific dates and times you choose on the calendar. Every participant receives the notification at the same wall-clock moment.",
    anchor: "one-time",
    use: [
      "Study kick-off or debriefing messages on a known date.",
      "Lab-controlled sessions where all participants are online simultaneously.",
      "Single-wave surveys with a fixed deadline.",
    ],
    avoid: [
      "Rolling enrolment where participants join on different days — everyone gets it at the same moment regardless of when they joined.",
      "Studies that run for weeks or months — use Repeating instead.",
    ],
    timing: "Step 2 → Specific time point(s) + Step 3 → Specific date(s).",
  },
  {
    n: "02",
    name: "Repeating",
    tag: "recurring pattern",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Fires on a recurring pattern between a start and end date — every day, every Nth day, specific weekdays, or specific days of the month. All participants receive it at the same clock time on each firing day.",
    anchor: "repeating",
    use: [
      "Daily diary studies where every participant answers at the same clock time.",
      "Weekly check-ins on a fixed weekday.",
      "Burst protocols on specific calendar dates.",
    ],
    avoid: [
      "Studies with rolling enrolment where each participant needs their own day-1 anchor — use Personal instead.",
      "Studies where you need different ping times each day — use Randomized instead.",
    ],
    timing: "Step 2 → Repeat + Step 3/4/5/6 → recurrence pattern and start/end dates.",
  },
  {
    n: "03",
    name: "Randomized",
    tag: "random within windows",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Defines one or more time windows (e.g., 09:00–12:00 and 14:00–18:00) and picks a random moment inside each window for each participant. Each participant gets a different time; the window boundaries are shared.",
    anchor: "randomized",
    use: [
      "ESM studies where you want multiple random pings per day within constrained windows.",
      "Any design requiring ecological validity — avoiding fixed-clock pings that participants can anticipate.",
      "Burst-sampling where N samples must be drawn per day with a minimum gap between them.",
    ],
    avoid: [
      "Situations where all participants must receive the notification simultaneously — use One-time or Repeating.",
    ],
    timing: "Step 2 → Time window. Set window start/end, how many random points to draw, and the minimum gap between pings.",
  },
  {
    n: "04",
    name: "Personal",
    tag: "relative to registration",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Anchors to each participant's enrolment date. Day 1 is the day they joined, regardless of the calendar. Two participants who join a week apart each start their own Day 1.",
    anchor: "personal",
    use: [
      "Longitudinal studies with rolling enrolment and a fixed study duration per person (e.g., 14-day protocol).",
      "Intervention studies where Day 1 = treatment day.",
      "Any design where elapsed days since joining matter more than the calendar date.",
    ],
    avoid: [
      "Studies where all participants must be in sync on the same calendar date — use Repeating or One-time.",
    ],
    timing: "Step 5 → start relative to registration (Day N after joining). Step 6 → stop relative to registration.",
    more: "/docs/personal",
  },
];

const COMPARISON: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "All participants pinged at the same wall-clock time?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Timing relative to each participant's join date?",    onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Can send multiple times per day?",                    onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Works with rolling enrolment?",                       onetime: false, repeating: false, randomized: false, personal: true  },
];

const Tick = ({ v }: { v: boolean }) => (
  <span style={{ color: v ? "var(--sage)" : "var(--ink-20)", fontSize: "1.3rem", fontWeight: 700 }}>{v ? "✓" : "✗"}</span>
);

export default function TypesContent() {
  return (
    <>
      <p>
        The type determines <em>when</em> a notification fires and <em>how</em> that timing
        relates to the calendar versus to each participant. Get this right before you touch anything else.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Use when</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Avoid when</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>form:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Full guide →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Side-by-side comparison</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Property</th>
            <th style={{ textAlign: "center" }}>One-time</th>
            <th style={{ textAlign: "center" }}>Repeating</th>
            <th style={{ textAlign: "center" }}>Randomized</th>
            <th style={{ textAlign: "center" }}>Personal</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combining types</h2>
      <p>
        One study can have multiple schedules of different types. A common design pairs a{" "}
        <strong>Repeating</strong> schedule for a fixed daily survey with a <strong>Randomized</strong>{" "}
        schedule for ecological momentary pings — all in the same study, targeting the same participants.
      </p>
      <p>
        A Personal schedule can also use randomized send times within each day. In that case the
        schedule is still classified as <strong>Personal</strong>, because what defines it is that the
        start and end days are anchored to each participant's join date. The randomized timing is a
        secondary property within that anchor.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>What to read next</h3>
      <p>
        Once you know which type fits your study:{" "}
        <a href="/docs/form">Creating a schedule</a> walks through the full form section by section.
        For Personal schedules specifically, <a href="/docs/personal">Personal scheduling</a> covers
        the day-offset logic in depth.
      </p>
    </>
  );
}
