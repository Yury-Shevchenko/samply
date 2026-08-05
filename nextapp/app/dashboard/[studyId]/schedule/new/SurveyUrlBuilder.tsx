"use client";

/**
 * Assembles a survey start URL so the researcher never types one by hand.
 *
 * Hand-assembly is what failed in the Summer 2026 field cohort: published study
 * URLs show a placeholder pasted twice and a second "?" where an "&" belonged,
 * and the damage only surfaced weeks later when the survey export turned out to
 * carry no usable participant identifier. Parameter names come from the verified
 * per-platform integration registry, so the researcher picks their tool instead
 * of guessing which key it expects.
 */

import { useMemo, useState } from "react";
import { useT } from "@/app/components/TranslationProvider";
import { builderPlatforms, buildStartUrl, type BuilderPlatform } from "@/lib/urlBuilder";
import type { CanonicalPlaceholder } from "@/lib/placeholders";

const FIELD: React.CSSProperties = {
  width: "100%", padding: "0.75rem 0.9rem", border: "1px solid var(--ink-20)",
  borderRadius: "0.4rem", background: "var(--paper)", color: "var(--ink)",
  fontSize: "1.2rem", fontFamily: "inherit",
};

const LABEL: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: "1rem",
  letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)",
  marginBottom: "0.45rem",
};

/** Offered in this order; the participant ID leads because it is the one that matters. */
const OPTIONAL_PLACEHOLDERS: CanonicalPlaceholder[] = ["SAMPLY_ID", "PARTICIPANT_CODE", "MESSAGE_ID"];

interface Props {
  studySlug?: string;
  onApply: (url: string) => void;
  onClose: () => void;
}

export default function SurveyUrlBuilder({ studySlug, onApply, onClose }: Props) {
  const { t } = useT();
  const platforms = useMemo(() => builderPlatforms(), []);
  const [slug, setSlug] = useState(platforms[0]?.slug ?? "other");
  const [baseUrl, setBaseUrl] = useState("");
  const [include, setInclude] = useState<CanonicalPlaceholder[]>(["SAMPLY_ID", "MESSAGE_ID"]);

  const platform: BuilderPlatform =
    platforms.find((p) => p.slug === slug) ?? platforms[platforms.length - 1];

  // Only offer placeholders this platform actually has a parameter name for.
  const available = OPTIONAL_PLACEHOLDERS.filter((ph) =>
    platform.params.some((p) => p.placeholder === ph));

  const built = useMemo(
    () => buildStartUrl(baseUrl, platform, { include }),
    [baseUrl, platform, include],
  );

  function toggle(ph: CanonicalPlaceholder) {
    setInclude((prev) => prev.includes(ph) ? prev.filter((x) => x !== ph) : [...prev, ph]);
  }

  const completionUrl = studySlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/studies/${studySlug}/done/<MESSAGE_ID>`
    : null;

  const labelFor = (ph: CanonicalPlaceholder) =>
    ph === "SAMPLY_ID" ? t("notificationForm.builderIncSamplyId")
    : ph === "PARTICIPANT_CODE" ? t("notificationForm.builderIncCode")
    : t("notificationForm.builderIncMessageId");

  return (
    <div style={{
      marginTop: "0.8rem", padding: "1.2rem", border: "1px solid var(--ink-20)",
      borderRadius: "0.5rem", background: "var(--ink-05, rgba(0,0,0,.02))",
      display: "flex", flexDirection: "column", gap: "1rem",
    }}>
      <p style={{ margin: 0, fontSize: "1.15rem", color: "var(--ink-60)", lineHeight: 1.5 }}>
        {t("notificationForm.builderIntro")}
      </p>

      <div>
        <label style={LABEL}>{t("notificationForm.builderPlatform")}</label>
        <select style={FIELD} value={slug} onChange={(e) => setSlug(e.target.value)}>
          {platforms.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
      </div>

      <div>
        <label style={LABEL}>{t("notificationForm.builderBaseUrl")}</label>
        <input
          style={FIELD} type="text" value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://your-survey-tool.com/your-survey"
        />
      </div>

      <div>
        <label style={LABEL}>{t("notificationForm.builderInclude")}</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {available.map((ph) => (
            <label key={ph} style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", fontSize: "1.15rem", color: "var(--ink)", cursor: "pointer" }}>
              <input type="checkbox" checked={include.includes(ph)} onChange={() => toggle(ph)} />
              <span>{labelFor(ph)}</span>
            </label>
          ))}
        </div>
      </div>

      {platform.planNote && (
        <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--ink-60)", lineHeight: 1.45 }}>
          {platform.planNote}
        </p>
      )}
      {platform.warning && (
        <p style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink-60)", lineHeight: 1.45 }}>
          {platform.warning}
        </p>
      )}

      {built && (
        <div>
          <label style={LABEL}>{t("notificationForm.builderResult")}</label>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "1.05rem", wordBreak: "break-all",
            padding: "0.7rem 0.9rem", border: "1px dashed var(--ink-20)", borderRadius: "0.4rem",
            background: "var(--paper)", color: "var(--ink)",
          }}>
            {built}
          </div>
        </div>
      )}

      {completionUrl && include.includes("MESSAGE_ID") && (
        <div>
          <label style={LABEL}>{t("notificationForm.builderCompletionTitle")}</label>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "1.05rem", wordBreak: "break-all",
            padding: "0.7rem 0.9rem", border: "1px dashed var(--ink-20)", borderRadius: "0.4rem",
            background: "var(--paper)", color: "var(--ink)",
          }}>
            {completionUrl}
          </div>
          <p style={{ margin: "0.45rem 0 0", fontSize: "1.1rem", color: "var(--ink-60)", lineHeight: 1.45 }}>
            {platform.supportsExternalRedirect
              ? t("notificationForm.builderCompletionHint")
              : t("notificationForm.builderNoRedirect")}
            {platform.docsHref && (
              <>
                {" "}
                <a href={platform.docsHref} target="_blank" rel="noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>
                  {t("notificationForm.builderDocsLink", { name: platform.name })}
                </a>
              </>
            )}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        <button
          type="button"
          disabled={!built}
          onClick={() => { onApply(built); onClose(); }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em",
            padding: "0.6rem 1.4rem", borderRadius: "9999px", border: "1px solid var(--ink-20)",
            background: built ? "var(--ink)" : "transparent",
            color: built ? "var(--paper)" : "var(--ink-40)",
            cursor: built ? "pointer" : "not-allowed",
          }}
        >
          {t("notificationForm.builderApply")}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em",
            padding: "0.6rem 1.4rem", borderRadius: "9999px",
            border: "1px solid var(--ink-10)", background: "transparent",
            color: "var(--ink-60)", cursor: "pointer",
          }}
        >
          {t("notificationForm.builderCancel")}
        </button>
      </div>
    </div>
  );
}
