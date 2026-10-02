import { Fragment } from "react";
import type { Locale } from "@/lib/i18n";
import { renderInline } from "../_shared/renderInline";
import { getFaq, type Block } from "./faq/index.ts";

/**
 * Participant FAQ.
 *
 * The only docs page written for participants rather than researchers. It
 * exists because most participant mail to Samply support is about something
 * only the study's researcher can answer, so the page opens with a "who should
 * I ask?" card and the answers point to the researcher wherever that is true.
 *
 * Every question is an anchor (`/docs/faq#leave`) so a support reply can link
 * straight to the answer. The prose lives in ./faq/content.ts, one object per
 * language.
 */

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
  }
}

function RoutingColumn({ title, items, k }: { title: string; items: string[]; k: string }) {
  return (
    <div
      style={{
        padding: "1.6rem 1.8rem", background: "var(--surface)",
        border: "1px solid var(--ink-10)", borderRadius: "0.8rem",
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: "0.06em", color: "var(--coral)", marginBottom: "0.8rem" }}>
        {title}
      </div>
      <ul style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.6, color: "var(--ink-60)" }}>
        {items.map((item, i) => <li key={`${k}-${i}`}>{renderInline(item, `${k}-${i}`)}</li>)}
      </ul>
    </div>
  );
}

export default function FaqContent({ locale }: { locale: Locale }) {
  const page = getFaq(locale);
  const { routing } = page;

  return (
    <>
      {page.intro.map((text, i) => <p key={`intro-${i}`}>{renderInline(text, `intro-${i}`)}</p>)}

      <section id="who-to-ask" style={{ scrollMarginTop: "8rem" }}>
        <h2 style={{ marginTop: "3.6rem" }}>{routing.heading}</h2>
        <div
          style={{
            display: "grid", gap: "1.6rem", margin: "1.6rem 0",
            gridTemplateColumns: "repeat(auto-fit, minmax(26rem, 1fr))",
          }}
        >
          <RoutingColumn title={routing.researcherTitle} items={routing.researcherItems} k="researcher" />
          <RoutingColumn title={routing.samplyTitle} items={routing.samplyItems} k="samply" />
        </div>
        <p>{renderInline(routing.note, "routing-note")}</p>
      </section>

      {page.sections.map((section, s) => (
        <section key={`s-${s}`}>
          <h2 style={{ marginTop: "3.6rem" }}>{section.heading}</h2>
          {/* No wrapper per question: the h3 must not be a first child, or the
              docs-prose `h3:first-child` rule strips its spacing and divider. */}
          {section.questions.map((question, q) => (
            <Fragment key={question.id}>
              <h3
                id={question.id}
                // The first question sits right under its section heading, so
                // it gets no divider; the rest are separated like other pages.
                style={q === 0
                  ? { scrollMarginTop: "8rem", marginTop: "1.6rem", paddingTop: 0, borderTop: "none" }
                  : { scrollMarginTop: "8rem" }}
              >
                <a href={`#${question.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {question.q}
                </a>
              </h3>
              {question.blocks.map((block, b) => renderBlock(block, `${question.id}-${b}`))}
            </Fragment>
          ))}
        </section>
      ))}
    </>
  );
}
