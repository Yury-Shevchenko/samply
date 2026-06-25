import type { Locale } from "@/lib/i18n";
import { INTEGRATIONS, type IntegrationCategory } from "@/lib/docs/integrations";

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
