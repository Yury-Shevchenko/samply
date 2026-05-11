"use client";

import { useActionState } from "react";
import { sendNewsletter, SendResult } from "./actions";

const INIT: SendResult | null = null;

export default function NewsletterForm({ recipientCount }: { recipientCount: number }) {
  const [result, dispatch, pending] = useActionState<SendResult | null, FormData>(
    async (_prev: SendResult | null, fd: FormData) => sendNewsletter(fd),
    INIT
  );

  return (
    <div style={{ maxWidth: 720 }}>
      <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", marginTop: 0, marginBottom: "2.4rem" }}>
        This will send an email to all <strong style={{ color: "var(--ink)" }}>{recipientCount.toLocaleString()} confirmed researcher{recipientCount !== 1 ? "s" : ""}</strong> currently registered on Samply.
      </p>

      <form action={dispatch} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <label
            htmlFor="subject"
            style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--ink-60)", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="e.g. New features in Samply — May 2026"
            style={{
              fontSize: "1.4rem",
              padding: "0.85rem 1.2rem",
              border: "1px solid var(--ink-20)",
              borderRadius: "0.8rem",
              background: "var(--surface)",
              color: "var(--ink)",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <label
            htmlFor="body"
            style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--ink-60)", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}
          >
            Message
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={14}
            placeholder="Write the email body here. Plain text — blank lines become paragraph breaks."
            style={{
              fontSize: "1.4rem",
              lineHeight: 1.6,
              padding: "0.85rem 1.2rem",
              border: "1px solid var(--ink-20)",
              borderRadius: "0.8rem",
              background: "var(--surface)",
              color: "var(--ink)",
              outline: "none",
              resize: "vertical",
              width: "100%",
              boxSizing: "border-box",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <button
            type="submit"
            disabled={pending}
            style={{
              padding: "0.9rem 2.4rem",
              fontSize: "1.4rem",
              fontWeight: 600,
              borderRadius: "999rem",
              border: "none",
              cursor: pending ? "default" : "pointer",
              background: pending ? "var(--ink-20)" : "var(--coral)",
              color: pending ? "var(--ink-40)" : "#fff",
              transition: "background 120ms",
            }}
          >
            {pending ? "Sending…" : `Send to ${recipientCount.toLocaleString()} researcher${recipientCount !== 1 ? "s" : ""}`}
          </button>
        </div>
      </form>

      {result && (
        <div
          style={{
            marginTop: "2.4rem",
            padding: "1.6rem 2rem",
            borderRadius: "1rem",
            border: `1px solid ${result.errors.length > 0 && result.sent === 0 ? "var(--coral)" : "var(--sage)"}`,
            background: result.errors.length > 0 && result.sent === 0 ? "var(--coral-soft)" : "var(--sage-soft)",
          }}
        >
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
            {result.sent > 0 ? `Sent to ${result.sent.toLocaleString()} recipient${result.sent !== 1 ? "s" : ""}` : "Send failed"}
            {result.failed > 0 && ` · ${result.failed} failed`}
          </div>
          {result.errors.length > 0 && (
            <ul style={{ margin: "0.8rem 0 0", paddingLeft: "1.6rem" }}>
              {result.errors.slice(0, 10).map((e, i) => (
                <li key={i} style={{ fontSize: "1.2rem", color: "var(--ink-60)", marginBottom: "0.2rem" }}>{e}</li>
              ))}
              {result.errors.length > 10 && (
                <li style={{ fontSize: "1.2rem", color: "var(--ink-40)" }}>
                  …and {result.errors.length - 10} more
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
