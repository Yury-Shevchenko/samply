const PROBLEMS = [
  {
    n: "01",
    title: "Platform fragmentation",
    body: "Building a native mobile app for a study meant writing it twice — once in Java for Android, once in Objective-C or Swift for iOS. Many research tools ended up supporting only one platform.",
  },
  {
    n: "02",
    title: "Restricted question types",
    body: "Proprietary platforms ship a fixed set of response formats. Researchers had to adapt their study designs to fit what the software offered, rather than the other way around.",
  },
  {
    n: "03",
    title: "High cost",
    body: "Licensing fees for some platforms ran to around $500 for 50 participants. This put repeated-measurement studies out of reach for teams without dedicated funding.",
  },
];

const TIMELINE: {
  date: string;
  headline: string;
  items: string[];
  accent?: "coral" | "sage";
}[] = [
  {
    date: "2018",
    headline: "Origins",
    items: [
      "Samply began as a notification module inside Open Lab (open-lab.online), a platform for running online experiments, designed for researchers who needed to prompt participants by push notification.",
      "Aim: let any researcher schedule mobile notifications without writing native app code.",
    ],
    accent: "coral",
  },
  {
    date: "May 2020",
    headline: "First mobile app",
    items: [
      "First public version of the Samply Research mobile app released.",
      "Samply becomes supported by the iScience group at the University of Konstanz, where lead developer Yury Shevchenko is employed as a post-doctoral researcher.",
      "Website usability study conducted.",
      "First ESM studies on time-management and well-being run on the platform.",
    ],
    accent: "sage",
  },
  {
    date: "December 2020",
    headline: "Publication",
    items: [
      "Samply described in a peer-reviewed article in Behavior Research Methods (Shevchenko, Kuhlmann & Reips, 2021, BRM 53, 1710–1730).",
    ],
    accent: "coral",
  },
  {
    date: "May 2021",
    headline: "Geofencing",
    items: [
      "Geofencing feature added: notifications triggered automatically when a participant enters or leaves a defined location.",
      "Mobile app usability study.",
    ],
    accent: "sage",
  },
  {
    date: "December 2021",
    headline: "Platform maturity",
    items: [
      "Public and private study types introduced.",
      "Time zone support in notification scheduling.",
      "Expiration time for notification links.",
    ],
    accent: "sage",
  },
  {
    date: "November 2022",
    headline: "API, localization, and new features",
    items: [
      "Samply API released — researchers can now send notifications based on external custom events from their own systems.",
      "Mobile app translated into German, Dutch, Russian, and Chinese.",
      "Event-contingent sampling added.",
      "Reminders and completion registration.",
      "ESM studies on hybrid work, well-being, and a Corona daily survey conducted.",
    ],
    accent: "coral",
  },
  {
    date: "September 2023",
    headline: "Geofencing validation",
    items: [
      "Geofencing validation study completed and published (Shevchenko & Reips, 2024, BRM 56, 6411–6439).",
      "Empirical evidence on optimal radius, iOS vs Android sensitivity, and recommended dwell times.",
    ],
    accent: "sage",
  },
  {
    date: "April 2024",
    headline: "Schedule editing",
    items: [
      "Researchers can now edit notifications that are already scheduled — a long-requested capability.",
      "Evaluation of misinformation in news study conducted.",
    ],
    accent: "sage",
  },
  {
    date: "April 2026",
    headline: "Redesign",
    items: [
      "Full redesign of the researcher web dashboard — rebuilt for clarity, with a cleaner information architecture, improved schedule management, and a new documentation system.",
      "Samply Research mobile app redesigned with a focus on usability and a more welcoming participant experience.",
      "Goal: make Samply straightforward for researchers who are new to experience-sampling methods, while keeping the full power available to advanced users.",
    ],
    accent: "coral",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* ── Motivation ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Why Samply exists</h2>
      <p>
        Research methods such as experience sampling, daily diary studies, and ecological momentary
        assessment all share one requirement: participants must be prompted to respond at the right
        moment, repeatedly, on their own phones. Before Samply, setting that up meant confronting
        three recurring problems.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", margin: "2.4rem 0 3.6rem" }}>
        {PROBLEMS.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1rem",
              padding: "1.8rem 2rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--coral)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              flexShrink: 0,
              paddingTop: "0.2rem",
              width: "2.4rem",
            }}>
              {p.n}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Samply was built to remove all three barriers: one cross-platform app, no restrictions on
        survey format (you bring your own survey tool), and free to use.
      </p>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <h2>Development timeline</h2>
      <p>
        Development started in 2018 as a module within{" "}
        <a href="https://research.open-lab.online/" target="_blank" rel="noopener noreferrer">Open Lab</a>,
        an online experiment platform. It grew into an independent project with its own mobile app,
        web dashboard, REST API, and an active research community.
      </p>

      <div style={{ margin: "2.8rem 0 4rem", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{
          position: "absolute",
          left: "10.4rem",
          top: "0.6rem",
          bottom: "0.6rem",
          width: "2px",
          background: "var(--ink-10)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE.map((entry, i) => {
            const accentColor = entry.accent === "coral" ? "var(--coral)" : "var(--sage)";
            const accentBg = entry.accent === "coral" ? "var(--coral-soft)" : "var(--sage-soft)";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0",
                  alignItems: "flex-start",
                  paddingBottom: i < TIMELINE.length - 1 ? "2.8rem" : 0,
                }}
              >
                {/* Date label */}
                <div style={{
                  width: "10.4rem",
                  flexShrink: 0,
                  paddingRight: "2rem",
                  paddingTop: "0.15rem",
                  textAlign: "right",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>
                    {entry.date}
                  </span>
                </div>

                {/* Dot */}
                <div style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: "0.2rem",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${accentColor}22`,
                }} />

                {/* Content */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}>
                      {entry.headline}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: accentColor,
                      background: accentBg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                    {entry.items.map((item, j) => (
                      <li key={j} style={{
                        fontSize: "1.3rem",
                        color: "var(--ink-60)",
                        lineHeight: 1.65,
                        marginBottom: j < entry.items.length - 1 ? "0.4rem" : 0,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Open source ─────────────────────────────────────────────────── */}
      <h2>Open source and free</h2>
      <p>
        Since 2020, Samply has been supported by the{" "}
        <a href="https://iscience.uni-konstanz.de/en/" target="_blank" rel="noopener noreferrer">iScience group</a>{" "}
        at the University of Konstanz. The lead developer, Yury Shevchenko, is employed there as a
        post-doctoral researcher. The group's research focus on internet-based methods and
        experience-sampling directly shapes Samply's design and feature priorities.
      </p>
      <p>
        Samply is free to use and open source. The source code for the web dashboard is available on <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noopener noreferrer">GitHub</a>. Contributions, bug reports, and feature requests are welcome.
      </p>
      <p>
        If you use Samply in your research, please cite the original publication:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publication</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>
          https://doi.org/10.3758/s13428-020-01527-9
        </a>
      </div>
    </>
  );
}
