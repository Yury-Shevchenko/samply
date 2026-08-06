import type { Locale } from "@/lib/i18n";
import { INTEGRATIONS, type Integration, type IntegrationCategory } from "@/lib/docs/integrations";

const CATEGORY_LABEL: Record<IntegrationCategory, string> = {
  survey: "Survey tools",
  experiment: "Experiment builders",
};

function Chip({ children, tone }: { children: React.ReactNode; tone: "warn" | "muted" }) {
  const styles =
    tone === "warn"
      ? { color: "var(--coral)", border: "1px solid var(--coral)", background: "var(--coral-soft)" }
      : { color: "var(--ink-40)", border: "1px solid var(--ink-20)", background: "var(--surface)" };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.95rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "0.2rem 0.6rem",
        borderRadius: "0.4rem",
        whiteSpace: "nowrap",
        ...styles,
      }}
    >
      {children}
    </span>
  );
}


const TH: React.CSSProperties = {
  textAlign: "left", padding: "0.7rem 0.9rem", fontWeight: 500,
  fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: "0.08em",
  textTransform: "uppercase", color: "var(--ink-40)",
  borderBottom: "1px solid var(--ink-20)", whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
  padding: "0.8rem 0.9rem", borderBottom: "1px solid var(--ink-10)",
  fontSize: "1.25rem", color: "var(--ink-60)", verticalAlign: "top",
};

function Mark({ ok, title }: { ok: boolean; title?: string }) {
  return (
    <span title={title} style={{ color: ok ? "var(--sage)" : "var(--coral)", fontFamily: "var(--font-mono)", fontSize: "1.3rem" }}>
      {ok ? "\u2713" : "\u2715"}
    </span>
  );
}

function completionLabel(i: Integration): string {
  if (!i.supportsExternalRedirect) return "Not possible";
  if (i.postFeasibility === "native") return "Redirect or webhook";
  if (i.postFeasibility === "partial") return "Redirect; webhook possible";
  return "Redirect at survey end";
}

/**
 * Tools known to be used with Samply whose setup we have not verified against
 * the vendor's own documentation. Named rather than omitted, because a
 * researcher choosing a tool needs to know it is untested territory — but with
 * no invented instructions, since wrong steps cost a week of data collection and
 * only surface when the export arrives.
 */
const NOT_YET_DOCUMENTED = [
  "Questionstar",
  "WEXTOR",
  "Google Forms",
];

export default function IntegrationsContent({ locale: _locale }: { locale: Locale }) {
  const categories = Array.from(new Set(INTEGRATIONS.map((i) => i.category)));

  return (
    <>
      <p>
        Samply works with any survey or experiment tool that can read a URL parameter and
        redirect the participant to a URL at the end. Each guide below shows the two things
        you need to wire up for that platform:
      </p>
      <ol>
        <li>
          <strong>Pass the Samply IDs in</strong> — capture the{" "}
          <a href="/docs/placeholders">URL placeholders</a> (especially{" "}
          <code>%MESSAGE_ID%</code>) into the tool&apos;s dataset.
        </li>
        <li>
          <strong>Register completion</strong> — redirect to Samply&apos;s completion endpoint{" "}
          <code>/studies/&lt;slug&gt;/done/&lt;message-id&gt;</code> at the end of the survey,
          which marks the send complete and cancels any pending{" "}
          <a href="/docs/reminders">reminders</a>.
        </li>
      </ol>
      <p>
        Don&apos;t see your tool? The same two-step pattern works for most platforms — start
        from <a href="/docs/placeholders">URL placeholders</a>, and{" "}
        <a href="/docs/collaborate">tell us</a> which tool to document next.
      </p>


      {/* Comparison matrix. The card grid below is for browsing; this is for
          deciding. Researchers pick a survey tool before discovering whether it
          can do what Samply needs, and the two capabilities that determine
          whether the pairing works at all belong side by side. */}
      <h2 style={{ marginTop: "3.2rem", marginBottom: "1.2rem" }}>At a glance</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "52rem" }}>
          <thead>
            <tr>
              <th style={TH}>Tool</th>
              <th style={{ ...TH, textAlign: "center" }}>Captures ID</th>
              <th style={{ ...TH, textAlign: "center" }}>Reports completion</th>
              <th style={TH}>How completion works</th>
              <th style={TH}>Plan limits</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((i) => (
              <tr key={i.slug}>
                <td style={{ ...TD, color: "var(--ink)" }}>
                  <a href={`/docs/integrations/${i.slug}`} style={{ color: "var(--coral)", textDecoration: "none" }}>
                    {i.name}
                  </a>
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <Mark ok title={i.urlParamMechanism} />
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <Mark ok={i.supportsExternalRedirect} title={i.completionMechanism} />
                </td>
                <td style={TD}>{completionLabel(i)}</td>
                <td style={TD}>{i.planNote ?? "\u2014"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: "1.2rem", fontSize: "1.2rem", color: "var(--ink-40)" }}>
        Without completion reporting a tool still works — you just cannot measure response rates
        from completions, and reminders cannot be suppressed for people who already answered.
      </p>

      <h3 style={{ marginTop: "2.8rem", marginBottom: "0.8rem" }}>Not documented yet</h3>
      <p>
        These are known to be used with Samply, but their steps have not been verified against the
        vendor&apos;s documentation, so we publish none: {NOT_YET_DOCUMENTED.join(", ")}. The generic
        two-step pattern above works with any tool that can read a URL parameter and redirect at the
        end.
      </p>

      {categories.map((cat) => (
        <div key={cat} style={{ marginTop: "3.2rem" }}>
          <h2 style={{ marginBottom: "1.6rem" }}>{CATEGORY_LABEL[cat]}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(26rem, 1fr))",
              gap: "1.4rem",
            }}
          >
            {INTEGRATIONS.filter((i) => i.category === cat).map((i) => (
              <a
                key={i.slug}
                href={`/docs/integrations/${i.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  background: "var(--surface)",
                  border: "1px solid var(--ink-10)",
                  borderRadius: "1rem",
                  padding: "1.8rem 2rem",
                  textDecoration: "none",
                  transition: "border-color 0.12s, transform 0.12s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {i.name}
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--coral)", fontSize: "1.6rem" }}>→</span>
                </div>
                <span style={{ fontSize: "1.3rem", lineHeight: 1.5, color: "var(--ink-60)" }}>
                  {i.blurb}
                </span>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                  {i.planNote && <Chip tone="warn">paid / licensed</Chip>}
                  {i.completionWarning && <Chip tone="warn">setup caveat</Chip>}
                  {i.confidence !== "high" && <Chip tone="muted">{i.confidence} confidence</Chip>}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
