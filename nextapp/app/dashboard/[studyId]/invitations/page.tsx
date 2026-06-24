import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import InvitationsClient from "./InvitationsClient";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ studyId: string }>;
}

export default async function InvitationsPage({ params }: Props) {
  const { studyId } = await params;
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) notFound();

  const baseUrl = (process.env.NEXTAUTH_URL || "https://samply.uni-konstanz.de").replace(/\/$/, "");
  const webLink = `${baseUrl}/studies/${project.slug}`;
  const deepLink = `samply://--/study?id=${studyId}`;
  const customLink = `samply://--/study?id=${studyId}&code=123`;

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Header */}
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
          {t("invitations.label")}
        </div>
        <div className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
          {t("invitations.title")}
        </div>
      </div>

      {/* App download notice */}
      <div style={{ background: "rgba(61,115,107,.06)", border: "1px solid rgba(61,115,107,.2)", borderRadius: "0.8rem", padding: "1.4rem 1.8rem", display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.8rem", flexShrink: 0, marginTop: "0.1rem" }}>📱</span>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 600, color: "var(--sage)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            {t("invitations.prereqLabel")}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.6, letterSpacing: ".01em" }}>
            {(() => { const [pre, post] = t("invitations.prereqBody").split("{appName}"); return <>{pre}<strong style={{ color: "var(--ink)" }}>Samply Research</strong>{post}</>;})()}
            {" "}
            <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank" rel="noreferrer"
              style={{ color: "var(--sage)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              {t("invitations.googlePlay")}
            </a>{" "}·{" "}
            <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank" rel="noreferrer"
              style={{ color: "var(--sage)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity">
              {t("invitations.appStore")}
            </a>
          </p>
        </div>
      </div>

      {/* Tabbed methods */}
      <InvitationsClient
        studyId={studyId}
        projectName={project.name}
        isPublic={project.public ?? false}
        isActive={project.currentlyActive ?? false}
        webLink={webLink}
        deepLink={deepLink}
        customLink={customLink}
        studyCode={project.slug}
      />

    </div>
  );
}
