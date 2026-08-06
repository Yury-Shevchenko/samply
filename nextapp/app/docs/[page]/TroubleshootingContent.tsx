import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getTroubleshooting, type Block, type Para } from "./troubleshooting/index.ts";

/**
 * Troubleshooting guide.
 *
 * Written from the failure modes observed across a 30-study field cohort, plus
 * what the platform's own instrumentation can and cannot see. The organising
 * principle is the one thing a stuck researcher needs and rarely has: a symptom
 * they can recognise, mapped to a cause they can act on.
 *
 * Two editorial rules, both learned the hard way:
 *
 *  - Say plainly what is unrecoverable. Several groups lost person-level
 *    analyses because nothing told them their setup was broken until the export
 *    arrived. "Check this before day two" is useful; discovering it in week
 *    three is not.
 *  - Never imply Samply can see something it cannot. Android battery
 *    optimisation drops notifications *after* the push service accepted them,
 *    so no server-side signal exists. Pretending otherwise sends researchers
 *    hunting in the wrong place.
 *
 * The prose lives in ./troubleshooting/content.ts, one object per language.
 */

const CAUSE: React.CSSProperties = { fontWeight: 600, color: "var(--ink)" };

/**
 * Renders the small inline markup used by the content strings:
 * `**bold**`, `` `code` ``, `[label](href)`, `*italic*`.
 *
 * Written as a single tokenising pass rather than nested replaces so that a
 * translator cannot accidentally produce broken markup — an unmatched delimiter
 * renders as literal text instead of swallowing the rest of the sentence.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const out: React.ReactNode[] = [];

  text.split(TOKEN).forEach((part, i) => {
    if (!part) return;
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(<strong key={key}>{part.slice(2, -2)}</strong>);
      return;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      out.push(<code key={key}>{part.slice(1, -1)}</code>);
      return;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      out.push(<em key={key}>{part.slice(1, -1)}</em>);
      return;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      out.push(
        href.startsWith("http") ? (
          <a key={key} href={href} target="_blank" rel="noreferrer">{label}</a>
        ) : (
          <Link key={key} href={href}>{label}</Link>
        ),
      );
      return;
    }
    out.push(part);
  });

  return out;
}

function CardPara({ para, k }: { para: Para; k: string }) {
  return (
    <p style={{ margin: k.endsWith("-0") ? 0 : "0.8rem 0 0" }}>
      {para.label && <span style={CAUSE}>{para.label}</span>}
      {para.label ? " " : null}
      {renderInline(para.text, k)}
    </p>
  );
}

function renderBlock(block: Block, k: string) {
  switch (block.kind) {
    case "p":
      return <p key={k}>{renderInline(block.text, k)}</p>;

    case "callout":
      return (
        <p
          key={k}
          style={{
            margin: "1rem 0 0", padding: "0.9rem 1.2rem",
            borderLeft: "3px solid var(--coral)", background: "var(--coral-soft)",
            fontSize: "1.25rem", lineHeight: 1.6, color: "var(--ink)",
          }}
        >
          {renderInline(block.text, k)}
        </p>
      );

    case "list": {
      const items = block.items.map((item, i) => <li key={`${k}-${i}`}>{renderInline(item, `${k}-${i}`)}</li>);
      return block.ordered ? <ol key={k}>{items}</ol> : <ul key={k}>{items}</ul>;
    }

    case "card":
      return (
        <div
          key={k}
          style={{
            margin: "2.4rem 0", padding: "1.6rem 1.8rem", background: "var(--surface)",
            border: "1px solid var(--ink-10)", borderRadius: "0.8rem",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: "0.06em", color: "var(--coral)", marginBottom: "0.8rem" }}>
            {block.title}
          </div>
          <div style={{ fontSize: "1.35rem", lineHeight: 1.65, color: "var(--ink-60)" }}>
            {block.paras.map((para, i) => <CardPara key={`${k}-${i}`} para={para} k={`${k}-${i}`} />)}
          </div>
        </div>
      );
  }
}

export default function TroubleshootingContent({ locale }: { locale: Locale }) {
  const page = getTroubleshooting(locale);

  return (
    <>
      {page.intro.map((text, i) => <p key={`intro-${i}`}>{renderInline(text, `intro-${i}`)}</p>)}

      {page.sections.map((section, s) => (
        <section key={`s-${s}`}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, b) => renderBlock(block, `s${s}-b${b}`))}
        </section>
      ))}
    </>
  );
}
