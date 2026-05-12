import { auth } from "@/lib/auth";

export const metadata = { title: "Samply vs SMAAT — Which platform fits your study?" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.8rem" }}>
      {children}
    </div>
  );
}

const linkStyle = { color: "inherit", textDecoration: "underline", textDecorationColor: "rgba(0,0,0,.25)", textUnderlineOffset: "2px" };

const ROWS: { feature: string; samply: React.ReactNode; smaat: React.ReactNode }[] = [
  { feature: "Participant notifications",  samply: "Random, fixed, event-contingent, geofence", smaat: "All of the above + complex conditional chains" },
  { feature: "Survey / questionnaire",     samply: "External URL (Qualtrics, REDCap, etc.)", smaat: "Built-in survey builder in the app" },
  { feature: "Cognitive tasks",            samply: false, smaat: "Reaction time, N-back, Stroop & more, built-in" },
  { feature: "Sensor data collection",     samply: false, smaat: "GPS, accelerometer, and more" },
  { feature: "Gamification",               samply: false, smaat: "Points, badges, progress — to boost compliance" },
  { feature: "Participant app",            samply: <><a href="https://apps.apple.com/us/app/samply-research/id1511062019" target="_blank" rel="noopener noreferrer" style={linkStyle}>iOS</a> · <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank" rel="noopener noreferrer" style={linkStyle}>Android</a></>, smaat: <><a href="https://apps.apple.com/us/app/smaat-research/id6746647722" target="_blank" rel="noopener noreferrer" style={linkStyle}>iOS</a> · <a href="https://play.google.com/store/apps/details?id=com.shevchenkoyury.smaat" target="_blank" rel="noopener noreferrer" style={linkStyle}>Android</a></> },
  { feature: "Open-source",               samply: true,  smaat: false },
  { feature: "Free to use",               samply: "Fully free",  smaat: "Free tier (up to 10 participants, for testing)" },
  { feature: "Paid plans",                samply: false, smaat: "Yes — for studies with larger cohorts" },
  { feature: "Self-host",                 samply: true,  smaat: false },
  { feature: "Max participants (free)",   samply: "Unlimited", smaat: "10 (free tier)" },
];

function Check() {
  return <span style={{ color: "var(--sage)", fontWeight: 700, fontSize: "1.3rem" }}>✓</span>;
}
function Cross() {
  return <span style={{ color: "var(--ink-20)", fontSize: "1.3rem" }}>—</span>;
}

function CellValue({ v }: { v: React.ReactNode }) {
  if (v === true)  return <Check />;
  if (v === false) return <Cross />;
  return <span style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.45 }}>{v}</span>;
}

const USE_CASES = [
  {
    title: "Use Samply when…",
    color: "var(--ink)",
    bg: "var(--surface)",
    border: "var(--ink-10)",
    items: [
      "You already have a survey tool (Qualtrics, REDCap, LimeSurvey) and just need reliable push notifications to reach participants.",
      "You want a fully open-source, self-hostable solution with no per-participant cost.",
      "Your study design is push-notification + external link, with straightforward random or fixed schedules.",
    ],
  },
  {
    title: "Consider SMAAT when…",
    color: "#7c6ab5",
    bg: "rgba(124,106,181,.05)",
    border: "rgba(124,106,181,.18)",
    items: [
      "You need surveys or cognitive tasks delivered inside the mobile app itself, without external links.",
      "Your protocol collects passive sensor data (location, motion, screen usage) alongside self-reports.",
      "You want gamification mechanics to improve participant compliance over long study durations.",
      "Your scheduling is complex — conditional triggers, branching notifications, or multi-phase designs.",
    ],
  },
];

export default async function SmaatPage() {
  const session = await auth();

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "5.6rem var(--page-px) 10rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "4.8rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1rem" }}>
            platform comparison
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "4rem", letterSpacing: "-0.03em", margin: "0 0 1.6rem", lineHeight: 1.05 }}>
            Samply vs SMAAT
          </h1>
          <p style={{ fontSize: "1.5rem", color: "var(--ink-60)", lineHeight: 1.65, maxWidth: 620, margin: 0 }}>
            Both platforms are built to support experience sampling research, but they serve different study designs.
            This page explains when each one is the right fit — so you can make an informed choice.
          </p>
        </div>

        {/* Use-case cards */}
        <SectionLabel>when to use each</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "5.6rem" }}>
          {USE_CASES.map(({ title, color, bg, border, items }) => (
            <div key={title} style={{ background: bg, border: `1px solid ${border}`, borderRadius: "1rem", padding: "2.4rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 600, color, marginBottom: "1.6rem", letterSpacing: ".04em" }}>
                {title}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ color, fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>·</span>
                    <span style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature table */}
        <SectionLabel>feature comparison</SectionLabel>
        <div style={{ border: "1px solid var(--ink-10)", borderRadius: "1rem", overflow: "hidden", marginBottom: "5.6rem" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--ink)", color: "var(--paper)" }}>
            <div style={{ padding: "1.4rem 2rem", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase" }}>Feature</div>
            <div style={{ padding: "1.4rem 2rem", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", borderLeft: "1px solid rgba(255,255,255,.1)" }}>Samply</div>
            <div style={{ padding: "1.4rem 2rem", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", borderLeft: "1px solid rgba(255,255,255,.1)", color: "#c4b8f0" }}>SMAAT</div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderTop: i === 0 ? "none" : "1px solid var(--ink-10)",
                background: i % 2 === 0 ? "var(--surface)" : "var(--paper)",
              }}
            >
              <div style={{ padding: "1.3rem 2rem", fontSize: "1.2rem", color: "var(--ink)", fontWeight: 500 }}>{row.feature}</div>
              <div style={{ padding: "1.3rem 2rem", borderLeft: "1px solid var(--ink-10)" }}><CellValue v={row.samply} /></div>
              <div style={{ padding: "1.3rem 2rem", borderLeft: "1px solid var(--ink-10)" }}><CellValue v={row.smaat} /></div>
            </div>
          ))}
        </div>

        {/* SMAAT CTA */}
        <div style={{ background: "rgba(124,106,181,.06)", border: "1px solid rgba(124,106,181,.18)", borderRadius: "1.2rem", padding: "3.2rem", display: "flex", gap: "3.2rem", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, width: "4.8rem", height: "4.8rem", borderRadius: "50%", background: "rgba(124,106,181,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.8rem", color: "#7c6ab5" }}>
            S
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "0.8rem", color: "var(--ink)" }}>
              SMAAT
            </div>
            <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.65, margin: "0 0 2rem", maxWidth: 500 }}>
              A commercial ESM platform with built-in surveys, cognitive tasks, sensor data collection, and gamification.
              Free tier available for testing with up to 10 participants.
            </p>
            <a
              href="https://smaat.eu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2.2rem", background: "#7c6ab5", color: "#fff", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em" }}
              className="hover:opacity-85 transition-opacity"
            >
              Visit smaat.eu →
            </a>
          </div>
        </div>

        {/* Back link for logged-in users */}
        {session && (
          <div style={{ marginTop: "4rem", textAlign: "center" }}>
            <a href="/dashboard" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: ".06em" }} className="hover:opacity-70 transition-opacity">
              ← back to dashboard
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
