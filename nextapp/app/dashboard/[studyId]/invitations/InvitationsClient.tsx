"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import SecureLinkGenerator from "./SecureLinkGenerator";

interface Props {
  studyId: string;
  projectName: string;
  isPublic: boolean;
  isActive: boolean;
  webLink: string;
  deepLink: string;
  customLink: string;
}

const TABS = [
  { id: "web",    label: "Web page" },
  { id: "app",    label: "App link" },
  { id: "search", label: "Search in app" },
  { id: "secure", label: "Secure link" },
] as const;

type TabId = typeof TABS[number]["id"];

function LinkRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600 }}>
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <code style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "1.15rem", padding: "0.8rem 1.2rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", color: "var(--ink)", wordBreak: "break-all", lineHeight: 1.5 }}>
          {value}
        </code>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", lineHeight: 1.65, margin: "1.4rem 0 0", letterSpacing: ".01em" }}>
      {children}
    </p>
  );
}

export default function InvitationsClient({ studyId, projectName, isPublic, isActive, webLink, deepLink, customLink }: Props) {
  const [active, setActive] = useState<TabId>("web");

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>

      {/* Sub-tab bar — desktop */}
      <div className="study-tab-nav-desktop" style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
        <div style={{ display: "flex" }}>
          {TABS.map(({ id, label }) => {
            const isOn = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                style={{
                  padding: "1.1rem 1.8rem",
                  background: isOn ? "var(--surface)" : "transparent",
                  border: "none",
                  borderBottom: isOn ? "2px solid var(--coral)" : "2px solid transparent",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.1rem",
                  fontWeight: isOn ? 600 : 400,
                  letterSpacing: ".06em",
                  color: isOn ? "var(--ink)" : "var(--ink-40)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color .12s",
                  flexShrink: 0,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab bar — mobile */}
      <div className="study-tab-nav-mobile" style={{ padding: "1rem 1.4rem", borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
        <select
          value={active}
          onChange={(e) => setActive(e.target.value as TabId)}
          style={{ width: "100%", fontFamily: "var(--font-mono)", fontSize: "1.3rem", padding: "0.7rem 1rem", borderRadius: "0.6rem", border: "1px solid var(--ink-20)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer" }}
        >
          {TABS.map(({ id, label }) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
      </div>

      {/* Tab content */}
      <div className="invit-body" style={{ padding: "2rem" }}>

        {active === "web" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {isActive ? (
              <LinkRow label="Study page URL" value={webLink} />
            ) : (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", margin: 0, lineHeight: 1.6 }}>
                  ▲ Your study is not active yet. Activate it to share the web page link.
                </p>
              </div>
            )}
            <Note>
              The study page shows a description, authors, and a unique QR code participants can scan to join directly.
            </Note>
          </div>
        )}

        {active === "app" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <LinkRow label="Open study directly in the app" value={deepLink} />
            <div style={{ height: "0.1rem", background: "var(--ink-10)" }} />
            <LinkRow label="Custom link with participant code" value={customLink} />
            <Note>
              Replace <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.5rem", borderRadius: "0.3rem" }}>123</code> with any value — it will be recorded as the participant&apos;s code variable. Works whether or not the study is publicly listed.
            </Note>
          </div>
        )}

        {active === "search" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
              If your study is public, participants can search for it by name in the <strong style={{ color: "var(--ink)" }}>Studies</strong> tab of the Samply app.
              Share the exact study name:{" "}
              <strong style={{ color: "var(--ink)" }}>{projectName}</strong>
            </p>
            {!isPublic && (
              <div style={{ background: "var(--ink-10)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "1rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-60)", margin: 0 }}>
                  Your study is currently private. Use the Web page or App link tab instead.
                </p>
              </div>
            )}
          </div>
        )}

        {active === "secure" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
              Generate a tamper-proof link with a checksum. Participants can open it on their phone or paste it into the registration screen. Per-participant codes make links single-use.
            </p>
            <SecureLinkGenerator projectId={studyId} />
          </div>
        )}

      </div>
    </div>
  );
}
