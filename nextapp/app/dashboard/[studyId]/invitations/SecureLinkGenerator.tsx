"use client";

import { useState, useRef, useEffect } from "react";
import { md5 } from "js-md5";
import { useT } from "@/app/components/TranslationProvider";

const FIELD: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.2rem",
  padding: "0.8rem 1.2rem",
  borderRadius: "0.6rem",
  border: "1px solid var(--ink-20)",
  background: "var(--paper)",
  color: "var(--ink)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const SELECT: React.CSSProperties = {
  ...FIELD,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2323201a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  paddingRight: "2.8rem",
};

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  marginBottom: "0.5rem",
  display: "block",
};

const HINT: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.05rem",
  color: "var(--ink-40)",
  marginTop: "0.5rem",
  lineHeight: 1.5,
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={LABEL}>{label}</label>
      {children}
      {hint && <span style={HINT}>{hint}</span>}
    </div>
  );
}

export default function SecureLinkGenerator({ projectId }: { projectId: string }) {
  const { t } = useT();
  const [protocol, setProtocol] = useState("https");
  const [server, setServer] = useState("samply.uni-konstanz.de");
  const [mode, setMode] = useState("multi");
  const [allowtz, setAllowtz] = useState(false);
  const [allowpayment, setAllowpayment] = useState(false);
  const [validfor, setValidfor] = useState(168);
  const [code, setCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function generateLink() {
    const params: Record<string, string | boolean | number> = {
      protocol, server, study: projectId, mode, allowtz, allowpayment,
      timestamp: Date.now(), validfor: validfor * 3600,
    };
    if (code) params.code = code;

    const paramString = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const checksum = md5(paramString);
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ ...params, checksum }).map(([k, v]) => [k, String(v)])
      )
    );
    setGeneratedLink(`samply://register?${query.toString()}`);
    setCopied(false);
  }

  useEffect(() => {
    if (!generatedLink || !canvasRef.current) return;
    import("qrcode").then((QRCode) => {
      QRCode.toCanvas(canvasRef.current!, generatedLink, { width: 180 }, (err) => {
        if (err) console.error("QR code generation failed:", err);
      });
    });
  }, [generatedLink]);

  function copyLink() {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

      {/* Config grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem" }}>
        <Field label={t("invitations.secureProtocolLabel")} hint={t("invitations.secureProtocolHint")}>
          <select style={SELECT} value={protocol} onChange={(e) => setProtocol(e.target.value)}>
            <option value="https">https</option>
            <option value="http">http</option>
          </select>
        </Field>

        <Field label={t("invitations.secureServerLabel")} hint={t("invitations.secureServerHint")}>
          <input style={FIELD} type="text" value={server} onChange={(e) => setServer(e.target.value)} placeholder="samply.uni-konstanz.de" />
        </Field>

        <Field label={t("invitations.secureStudyIdLabel")} hint={t("invitations.secureStudyIdHint")}>
          <input style={{ ...FIELD, opacity: 0.6, cursor: "not-allowed" }} type="text" value={projectId} readOnly />
        </Field>

        <Field label={t("invitations.secureModeLabel")} hint={t("invitations.secureModeHint")}>
          <select style={SELECT} value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="multi">{t("invitations.secureModeMulti")}</option>
            <option value="single">{t("invitations.secureModeSingle")}</option>
          </select>
        </Field>

        <Field label={t("invitations.secureValidForLabel")} hint={t("invitations.secureValidForHint")}>
          <input style={FIELD} type="number" value={validfor} min={1} onChange={(e) => setValidfor(Number(e.target.value))} />
        </Field>

        <Field label={t("invitations.secureCodeLabel")} hint={t("invitations.secureCodeHint")}>
          <input style={FIELD} type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("invitations.secureCodePlaceholder")} />
        </Field>
      </div>

      {/* Toggles row */}
      <div style={{ display: "flex", gap: "2rem" }}>
        {[
          { label: t("invitations.secureAllowTz"), checked: allowtz, onChange: setAllowtz },
          { label: t("invitations.secureAllowPayment"), checked: allowpayment, onChange: setAllowpayment },
        ].map(({ label, checked, onChange }) => (
          <label key={label} style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }}>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
              style={{ width: "1.4rem", height: "1.4rem", cursor: "pointer", accentColor: "var(--coral)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", letterSpacing: ".04em" }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {/* Generate button */}
      <div>
        <button type="button" onClick={generateLink}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", letterSpacing: ".06em", padding: "0.9rem 2.2rem", borderRadius: "9999px", border: "none", background: "var(--coral)", color: "#fff", cursor: "pointer" }}
          className="hover:opacity-90 transition-opacity">
          {t("invitations.secureGenerate")}
        </button>
      </div>

      {/* Result */}
      {generatedLink && (
        <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.6rem 1.8rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <input
              readOnly
              value={generatedLink}
              style={{ ...FIELD, flex: 1, fontSize: "1.1rem", opacity: 0.75 }}
            />
            <button type="button" onClick={copyLink}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em",
                padding: "0.7rem 1.6rem", borderRadius: "9999px",
                border: copied ? "1px solid rgba(61,115,107,.3)" : "1px solid var(--ink-20)",
                background: copied ? "rgba(61,115,107,.08)" : "transparent",
                color: copied ? "var(--sage)" : "var(--ink-60)",
                cursor: "pointer", transition: "all .15s", flexShrink: 0,
              }}>
              {copied ? t("invitations.secureCopied") : t("invitations.secureCopyLink")}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.6rem" }}>
            <span style={LABEL}>{t("invitations.secureQrLabel")}</span>
            <div style={{ background: "#fff", padding: "0.8rem", borderRadius: "0.6rem", border: "1px solid var(--ink-10)", display: "inline-block" }}>
              <canvas ref={canvasRef} />
            </div>
            <span style={HINT}>{t("invitations.secureQrHint")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
