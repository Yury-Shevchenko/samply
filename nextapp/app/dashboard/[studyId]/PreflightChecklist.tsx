"use client";

/**
 * Pre-flight checklist, shown on the study dashboard.
 *
 * Answers the one question a first-time researcher cannot otherwise answer:
 * "is this actually going to work?" Every study lost in the Summer 2026 cohort
 * failed because something was wrong on day one and nothing said so until the
 * data was analysed — by which point the run was over and the loss permanent.
 *
 * The test notification is the part that proves rather than infers. It goes out
 * through the ordinary send pipeline, and the reply shows the survey URL exactly
 * as the participant's phone received it, after substitution.
 */

import { useEffect, useState, useTransition } from "react";
import { useT } from "@/app/components/TranslationProvider";
import type { StudyReadiness, CheckState, LatestTest } from "@/lib/data/readiness";
import { sendTestNotificationAction } from "./actions";

interface Participant { id: string; username?: string }

const MARK: Record<CheckState, { glyph: string; colour: string }> = {
  ok:      { glyph: "✓", colour: "var(--sage)" },
  warn:    { glyph: "!", colour: "var(--ink-40)" },
  blocked: { glyph: "✕", colour: "var(--coral)" },
  pending: { glyph: "·", colour: "var(--ink-40)" },
};

export default function PreflightChecklist({
  studyId,
  readiness,
  participants,
  initialTest,
}: {
  studyId: string;
  readiness: StudyReadiness;
  participants: Participant[];
  initialTest: LatestTest;
}) {
  const { t } = useT();
  const [open, setOpen] = useState(!readiness.ready);
  const [pending, startTransition] = useTransition();
  const [recipient, setRecipient] = useState(participants[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  // Seeded from the server render, so no fetch-on-mount is needed.
  const [test, setTest] = useState<LatestTest>(initialTest);
  const [polling, setPolling] = useState(false);

  async function refreshTest() {
    try {
      const res = await fetch(`/dashboard/${studyId}/testnotification`);
      if (res.ok) setTest(await res.json());
    } catch {
      // A failed poll is not worth surfacing; the next tick retries.
    }
  }

  // While a test is in flight the cron may take up to a minute to send it, and
  // the participant then has to tap. Poll for a few minutes, then stop.
  useEffect(() => {
    if (!polling) return;
    const id = setInterval(refreshTest, 5000);
    const stop = setTimeout(() => setPolling(false), 5 * 60 * 1000);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [polling]); // eslint-disable-line react-hooks/exhaustive-deps

  function runTest() {
    setError(null);
    startTransition(async () => {
      const res = await sendTestNotificationAction(studyId, recipient);
      if (!res.ok) setError(res.error);
      else setPolling(true);
    });
  }

  // Report blocking problems and advisories together. Showing only the blocking
  // count meant a header reading "2 problems" above four flagged rows, which
  // reads as a bug in the checklist rather than a deliberate distinction.
  const summary =
    readiness.blockedCount > 0 && readiness.warnCount > 0
      ? t("preflight.summaryBoth", {
          blocked: String(readiness.blockedCount),
          warn: String(readiness.warnCount),
        })
      : readiness.blockedCount > 0
        ? t("preflight.summaryBlocked", { n: String(readiness.blockedCount) })
        : readiness.warnCount > 0
          ? t("preflight.summaryWarn", { n: String(readiness.warnCount) })
          : t("preflight.summaryReady");

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--ink-10)",
      borderRadius: "0.8rem", padding: "1.6rem 2rem",
    }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.8rem", width: "100%",
          background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em",
          textTransform: "uppercase", color: "var(--ink-40)",
        }}>
          {t("preflight.title")}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "1.1rem",
          color: readiness.blockedCount > 0 ? "var(--coral)" : "var(--ink-60)",
        }}>
          {summary}
        </span>
        <span style={{ marginLeft: "auto", color: "var(--ink-40)", fontSize: "0.9em" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div style={{ marginTop: "1.4rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {readiness.checks.map((c) => {
            const mark = MARK[c.state];
            return (
              <div key={c.id} style={{ display: "flex", gap: "0.8rem", alignItems: "baseline" }}>
                <span aria-hidden style={{ color: mark.colour, fontFamily: "var(--font-mono)", flexShrink: 0, width: "1rem" }}>
                  {mark.glyph}
                </span>
                <span style={{ fontSize: "1.2rem", lineHeight: 1.5, color: c.state === "ok" ? "var(--ink-60)" : "var(--ink)" }}>
                  {t(`preflight.check_${c.id.replace(/-/g, "_")}_${c.state}`)}
                </span>
                {c.href && c.state !== "ok" && (
                  <a href={c.href}
                     style={{ fontSize: "1.1rem", color: "var(--coral)", textDecoration: "none", whiteSpace: "nowrap" }}>
                    {t("preflight.fix")}
                  </a>
                )}
              </div>
            );
          })}

          {/* Test notification */}
          <div style={{ marginTop: "1rem", paddingTop: "1.2rem", borderTop: "1px solid var(--ink-10)" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".14em",
              textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.7rem",
            }}>
              {t("preflight.testTitle")}
            </div>
            <p style={{ margin: "0 0 0.9rem", fontSize: "1.15rem", lineHeight: 1.5, color: "var(--ink-60)" }}>
              {t("preflight.testIntro")}
            </p>

            {participants.length === 0 ? (
              <p style={{ margin: 0, fontSize: "1.15rem", color: "var(--ink-60)" }}>
                {t("preflight.testNoParticipants")}
              </p>
            ) : (
              <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{
                    padding: "0.5rem 0.7rem", border: "1px solid var(--ink-20)",
                    borderRadius: "0.4rem", background: "var(--paper)", color: "var(--ink)",
                    fontSize: "1.15rem", fontFamily: "inherit",
                  }}
                >
                  {participants.map((p) => (
                    <option key={p.id} value={p.id}>{p.username || p.id}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={runTest}
                  disabled={pending || !recipient}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em",
                    padding: "0.55rem 1.3rem", borderRadius: "9999px",
                    border: "1px solid var(--ink-20)",
                    background: pending ? "transparent" : "var(--ink)",
                    color: pending ? "var(--ink-40)" : "var(--paper)",
                    cursor: pending ? "wait" : "pointer",
                  }}
                >
                  {pending ? t("preflight.testSending") : t("preflight.testSend")}
                </button>
                {polling && (
                  <span style={{ fontSize: "1.1rem", color: "var(--ink-40)" }}>
                    {t("preflight.testWaiting")}
                  </span>
                )}
              </div>
            )}

            {error && (
              <p style={{ margin: "0.8rem 0 0", fontSize: "1.15rem", color: "var(--coral)" }}>{error}</p>
            )}

            {test.state === "sent" && (
              <div style={{ marginTop: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <TestLine ok={!test.deliveryFailed} label={t("preflight.testStageSent")} />
                <TestLine
                  ok={!test.unsubstituted && !!test.carriesIdentifier}
                  label={
                    test.unsubstituted
                      ? t("preflight.testStageUrlBad")
                      : test.carriesIdentifier
                        ? t("preflight.testStageUrlOk")
                        : t("preflight.testStageUrlNoId")
                  }
                />
                {test.url && (
                  <code style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "1.05rem",
                    wordBreak: "break-all", padding: "0.6rem 0.8rem", borderRadius: "0.4rem",
                    border: "1px dashed var(--ink-20)", background: "var(--paper)", color: "var(--ink)",
                  }}>
                    {test.url}
                  </code>
                )}
                <TestLine ok={!!test.opened} label={test.opened ? t("preflight.testStageOpened") : t("preflight.testStageNotOpened")} />
                <TestLine
                  ok={!!test.completed}
                  label={test.completed ? t("preflight.testStageCompleted") : t("preflight.testStageNoCompletion")}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TestLine({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div style={{ display: "flex", gap: "0.8rem", alignItems: "baseline" }}>
      <span aria-hidden style={{
        color: ok ? "var(--sage)" : "var(--ink-40)",
        fontFamily: "var(--font-mono)", flexShrink: 0, width: "1rem",
      }}>
        {ok ? "✓" : "·"}
      </span>
      <span style={{ fontSize: "1.15rem", lineHeight: 1.5, color: "var(--ink-60)" }}>{label}</span>
    </div>
  );
}
