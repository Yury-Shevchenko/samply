import Link from "next/link";

/**
 * Renders the small inline markup used by the data-driven docs pages
 * (troubleshooting, participant FAQ): `**bold**`, `` `code` ``,
 * `[label](href)`, `*italic*`.
 *
 * Written as a single tokenising pass rather than nested replaces so that a
 * translator cannot accidentally produce broken markup — an unmatched delimiter
 * renders as literal text instead of swallowing the rest of the sentence.
 */
export function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
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
        ) : href.startsWith("mailto:") ? (
          <a key={key} href={href}>{label}</a>
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
