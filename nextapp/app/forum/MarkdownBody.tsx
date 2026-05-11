"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROSE: React.CSSProperties = {
  fontSize: "1.3rem",
  lineHeight: 1.7,
  color: "var(--ink-80, var(--ink))",
};

export default function MarkdownBody({ children }: { children: string }) {
  return (
    <div style={PROSE} className="forum-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
