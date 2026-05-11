import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import CopyButton from "./CopyButton";
import SecureLinkGenerator from "./SecureLinkGenerator";

interface Props {
  params: Promise<{ studyId: string }>;
}

const METHOD_NUM: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  fontWeight: 700,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
};

function SectionCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
      <div style={{ padding: "1.4rem 2rem 1.2rem", borderBottom: "1px solid var(--ink-10)", background: "var(--paper)", display: "flex", alignItems: "baseline", gap: "1rem" }}>
        <span style={METHOD_NUM}>{num}</span>
        <span style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--ink)" }}>{title}</span>
      </div>
      <div style={{ padding: "1.8rem 2rem" }}>
        {children}
      </div>
    </div>
  );
}

function LinkRow({ label, value, showCopy = true }: { label: string; value: string; showCopy?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", fontWeight: 600 }}>
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <code style={{
          flex: 1,
          fontFamily: "var(--font-mono)",
          fontSize: "1.15rem",
          padding: "0.8rem 1.2rem",
          background: "var(--paper)",
          border: "1px solid var(--ink-10)",
          borderRadius: "0.6rem",
          color: "var(--ink)",
          wordBreak: "break-all",
          lineHeight: 1.5,
        }}>
          {value}
        </code>
        {showCopy && <CopyButton value={value} />}
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", lineHeight: 1.65, margin: "1.2rem 0 0", letterSpacing: ".01em" }}>
      {children}
    </p>
  );
}

export default async function InvitationsPage({ params }: Props) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) notFound();

  const webLink = `https://samply.uni-konstanz.de/studies/${project.slug}`;
  const deepLink = `samply://--/study?id=${studyId}`;
  const customLink = `samply://--/study?id=${studyId}&code=123`;

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Header */}
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
          enrollment
        </div>
        <div className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
          Invite participants
        </div>
      </div>

      {/* App download notice */}
      <div style={{ background: "rgba(61,115,107,.06)", border: "1px solid rgba(61,115,107,.2)", borderRadius: "0.8rem", padding: "1.4rem 1.8rem", display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.8rem", flexShrink: 0, marginTop: "0.1rem" }}>📱</span>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 600, color: "var(--sage)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Prerequisite: Samply Research app
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.6, letterSpacing: ".01em" }}>
            Participants must install <strong style={{ color: "var(--ink)" }}>Samply Research</strong> before joining.{" "}
            <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank" rel="noreferrer"
              style={{ color: "var(--sage)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              Google Play
            </a>{" "}·{" "}
            <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank" rel="noreferrer"
              style={{ color: "var(--sage)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              App Store
            </a>
          </p>
        </div>
      </div>

      {/* Method 01: Web page link */}
      <SectionCard num="01" title="Web page link">
        {project.currentlyActive ? (
          <LinkRow label="Study page URL" value={webLink} />
        ) : (
          <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", margin: 0, lineHeight: 1.6 }}>
              ▲ Your study is not active yet. Activate it to share the web page link.
            </p>
          </div>
        )}
        <Note>
          The study page shows a description, authors, and a unique QR code. Works even for private studies.
        </Note>
      </SectionCard>

      {/* Method 02: Direct deep link */}
      <SectionCard num="02" title="Direct app link">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          <LinkRow label="Open study directly in the app" value={deepLink} />
          <div style={{ height: "0.1rem", background: "var(--ink-10)" }} />
          <LinkRow label="Custom link with participant code" value={customLink} />
          <Note>
            Replace <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.5rem", borderRadius: "0.3rem" }}>123</code> with any value — it will be recorded in your participant data as a code variable. Works whether or not your study is publicly listed.
          </Note>
        </div>
      </SectionCard>

      {/* Method 03: Find in app */}
      <SectionCard num="03" title="Search in app (public studies)">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.65, letterSpacing: ".01em" }}>
          If your study is public, participants can search for it by name in the <strong style={{ color: "var(--ink)" }}>Studies</strong> tab of the Samply app.
          Share the exact study name:{" "}
          <strong style={{ color: "var(--ink)" }}>{project.name}</strong>
        </p>
        {!project.public && (
          <div style={{ marginTop: "1.2rem", background: "var(--ink-10)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", padding: "1rem 1.4rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-60)", margin: 0 }}>
              Your study is currently private. Use methods 01 or 02 instead.
            </p>
          </div>
        )}
      </SectionCard>

      {/* Method 04: Secure link generator */}
      <SectionCard num="04" title="Secure registration link">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: "0 0 1.6rem", lineHeight: 1.65 }}>
          Generate a tamper-proof link with a checksum. Participants can open it on their phone or paste it into the registration screen. Per-participant codes make links single-use.
        </p>
        <SecureLinkGenerator projectId={studyId} />
      </SectionCard>

    </div>
  );
}
