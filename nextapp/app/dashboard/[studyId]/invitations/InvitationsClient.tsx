"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import SecureLinkGenerator from "./SecureLinkGenerator";
import { useT } from "@/app/components/TranslationProvider";

interface Props {
  studyId: string;
  projectName: string;
  isPublic: boolean;
  isActive: boolean;
  webLink: string;
  deepLink: string;
  customLink: string;
  studyCode: string;
}

const TAB_IDS = ["web", "code", "app", "search", "secure"] as const;
type TabId = typeof TAB_IDS[number];

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

export default function InvitationsClient({ studyId, projectName, isPublic, isActive, webLink, deepLink, customLink, studyCode }: Props) {
  const { t } = useT();
  const [active, setActive] = useState<TabId>("web");

  const TABS: { id: TabId; label: string }[] = [
    { id: "web",    label: t("invitations.tabWeb") },
    { id: "code",   label: t("invitations.tabCode") },
    { id: "app",    label: t("invitations.tabApp") },
    { id: "search", label: t("invitations.tabSearch") },
    { id: "secure", label: t("invitations.tabSecure") },
  ];

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
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600 }}>
                  {t("invitations.webLinkLabel")}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <code style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "1.15rem", padding: "0.8rem 1.2rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", color: "var(--ink)", wordBreak: "break-all", lineHeight: 1.5 }}>
                    {webLink}
                  </code>
                  <CopyButton value={webLink} />
                  <a
                    href={webLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", padding: "0.65rem 1.1rem", borderRadius: "0.6rem", border: "1px solid var(--ink-20)", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", textDecoration: "none", whiteSpace: "nowrap" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {t("invitations.openInNewTab")}
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", margin: 0, lineHeight: 1.6 }}>
                  {t("invitations.webNotActive")}
                </p>
              </div>
            )}
            <Note>
              {t("invitations.webNote")}
            </Note>
          </div>
        )}

        {active === "code" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <Note>
              {t("invitations.studyCodeNote")}
            </Note>
            <LinkRow label={t("invitations.studyCodeLabel")} value={studyCode} />
          </div>
        )}

        {active === "app" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <Note>
              {t("invitations.appNotePre")} <strong style={{ color: "var(--ink)" }}>{t("invitations.appNoteHighlight")}</strong> {t("invitations.appNotePost")}
            </Note>
            <div style={{ height: "0.1rem", background: "var(--ink-10)" }} />
            <LinkRow label={t("invitations.appDirectLabel")} value={deepLink} />
            <div style={{ height: "0.1rem", background: "var(--ink-10)" }} />
            <LinkRow label={t("invitations.appCustomLabel")} value={customLink} />
            <Note>
              {t("invitations.appCustomNotePre")} <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.5rem", borderRadius: "0.3rem" }}>123</code>{" "}{t("invitations.appCustomNotePost")}
            </Note>
          </div>
        )}

        {active === "search" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
              {t("invitations.searchNotePre")} <strong style={{ color: "var(--ink)" }}>{t("invitations.searchNoteHighlight")}</strong> {t("invitations.searchNotePost")}{" "}
              <strong style={{ color: "var(--ink)" }}>{projectName}</strong>
            </p>
            {!isPublic && (
              <div style={{ background: "var(--ink-10)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "1rem 1.4rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-60)", margin: 0 }}>
                  {t("invitations.searchPrivate")}
                </p>
              </div>
            )}
          </div>
        )}

        {active === "secure" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65 }}>
              {t("invitations.secureNote")}
            </p>
            <SecureLinkGenerator projectId={studyId} />
          </div>
        )}

      </div>
    </div>
  );
}
