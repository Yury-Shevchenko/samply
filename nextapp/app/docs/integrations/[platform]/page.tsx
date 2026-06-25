import { notFound } from "next/navigation";
import { getIntegration, type Integration } from "@/lib/docs/integrations";
import { DocsSidebar, DocsPageHeader } from "../../_shared/DocsChrome";
import DocsMobileNav from "../../_shared/DocsMobileNav";
import { getDocsChrome } from "../../_shared/labels";

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const entry = getIntegration(platform);
  return { title: entry ? `${entry.name} integration — Samply Docs` : "Integration — Samply Docs" };
}

/* ── Presentational helpers ───────────────────────────────────────────────── */

function UrlBox({ label, url }: { label: string; url: string }) {
  return (
    <div style={{ margin: "1rem 0 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.4rem" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", background: "var(--coral-soft)", padding: "0.9rem 1.2rem", borderRadius: "0.5rem", wordBreak: "break-all" }}>{url}</div>
    </div>
  );
}

function Callout({ tone, title, children }: { tone: "warn" | "info"; title: string; children: React.ReactNode }) {
  const accent = tone === "warn" ? "var(--coral)" : "var(--ink-40)";
  const bg = tone === "warn" ? "var(--coral-soft)" : "var(--surface)";
  return (
    <div style={{ margin: "2rem 0", padding: "1.4rem 1.8rem", background: bg, border: `1px solid ${accent}`, borderRadius: "0.8rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase", color: accent, marginBottom: "0.6rem" }}>{title}</div>
      <div style={{ fontSize: "1.35rem", lineHeight: 1.6, color: "var(--ink-60)" }}>{children}</div>
    </div>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol style={{ margin: "1.4rem 0 0", paddingLeft: "1.8rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      {steps.map((s, i) => (
        <li key={i} style={{ fontSize: "1.4rem", lineHeight: 1.6, color: "var(--ink-60)" }}>{s}</li>
      ))}
    </ol>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function IntegrationPlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const entry: Integration | undefined = getIntegration(platform);
  if (!entry) notFound();

  const { navLabels, groupLabels, searchPlaceholder } = await getDocsChrome();

  const confidenceNote =
    entry.confidence === "high"
      ? "These steps were verified against the platform's official documentation."
      : "These steps were checked against the platform's documentation, but some UI labels vary by version — verify against your instance with a test run before fielding.";

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "108rem", margin: "0 auto", padding: "5.6rem var(--page-px) 10rem" }}>
        <div className="docs-layout" style={{ display: "flex", gap: "6rem", alignItems: "flex-start" }}>
          <DocsSidebar current="integrations" navLabels={navLabels} groupLabels={groupLabels} searchPlaceholder={searchPlaceholder} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <DocsMobileNav current="integrations" />
            <DocsPageHeader
              section={groupLabels["powerFeatures"] ?? "Power features"}
              eyebrow="connect your survey tool"
              title={entry.name}
              lede={entry.blurb}
              navLabel={entry.name}
            />
            <article className="docs-prose">
              {entry.planNote && (
                <Callout tone="warn" title="Plan requirement">{entry.planNote}</Callout>
              )}
              {!entry.supportsExternalRedirect && (
                <Callout tone="warn" title="Not supported">
                  This tool cannot redirect to an external URL at the end of the survey, so automatic
                  completion tracking is not possible. You can still pass the Samply IDs in for your
                  own records.
                </Callout>
              )}

              {/* 1. Pass IDs in */}
              <h2>1 · Pass the Samply IDs into the survey</h2>
              <p>{entry.urlParamMechanism}</p>
              <Steps steps={entry.urlParamSteps} />
              <UrlBox label="Example start link" url={entry.exampleStartUrl} />

              {/* 2. Completion */}
              <h2 style={{ marginTop: "3.6rem" }}>2 · Register completion</h2>
              {entry.completionWarning && (
                <Callout tone="warn" title="Important — completion limitation">{entry.completionWarning}</Callout>
              )}
              <p>{entry.completionMechanism}</p>
              <Steps steps={entry.completionSteps} />
              <UrlBox label="Example completion redirect" url={entry.exampleCompletionUrl} />

              {/* Reserved params */}
              {entry.reservedParamWarning && (
                <>
                  <h2 style={{ marginTop: "3.6rem" }}>Reserved parameters &amp; gotchas</h2>
                  <p>{entry.reservedParamWarning}</p>
                </>
              )}

              {/* Caveats */}
              {entry.caveats.length > 0 && (
                <>
                  <h2 style={{ marginTop: "3.6rem" }}>Things to watch out for</h2>
                  <ul>
                    {entry.caveats.map((c, i) => (
                      <li key={i} style={{ fontSize: "1.4rem", lineHeight: 1.6, color: "var(--ink-60)", marginBottom: "0.6rem" }}>{c}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Sources */}
              <h2 style={{ marginTop: "3.6rem" }}>Sources</h2>
              <p style={{ fontSize: "1.25rem", color: "var(--ink-40)" }}>{confidenceNote}</p>
              <ul>
                {entry.sources.map((s) => (
                  <li key={s} style={{ fontSize: "1.25rem", lineHeight: 1.6, marginBottom: "0.4rem" }}>
                    <a href={s} target="_blank" rel="noreferrer" style={{ color: "var(--ink-60)", wordBreak: "break-all" }}>{s}</a>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--ink-10)" }}>
                <a href="/docs/integrations" style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>← all integrations</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
