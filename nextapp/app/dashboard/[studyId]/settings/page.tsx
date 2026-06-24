import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchProjectById, fetchMemberEmails } from "@/lib/data/projects";
import { updateSettingsAction, leaveStudyAction } from "./actions";
import SettingsClient from "./SettingsClient";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: Promise<{ studyId: string }> }) {
  const { studyId } = await params;
  const session = await auth();
  if (!session) return { title: "Settings — Samply" };
  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  return { title: `Settings · ${project?.name ?? "Study"} — Samply` };
}

export default async function SettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ notice?: string; warning?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { studyId } = await params;
  const { notice, warning } = await searchParams;

  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) notFound();

  const { t } = await getT();

  // Collaborators (non-owners) can't edit settings — the creator form would
  // silently redirect them. Show a focused view with a "Leave study" action.
  // Admins viewing another researcher's study are neither owner nor member;
  // they get the same focused view but without the "Leave study" action,
  // since there's nothing for them to leave (view-only access).
  const isOwner = String(project.creator) === session.user.id;
  const isMember = (project.members ?? []).map(String).includes(session.user.id);
  if (!isOwner) {
    const leaveAction = leaveStudyAction.bind(null, studyId);
    return (
      <div style={{ maxWidth: "72rem" }}>
        <div style={{ marginBottom: "3.2rem" }}>
          <h2
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "2.4rem", letterSpacing: "-0.02em" }}
          >
            {t("studySettings.title")}
          </h2>
          <p style={{ margin: "0.6rem 0 0", fontSize: "1.35rem", color: "var(--ink-60)" }}>
            {t("studySettings.collaboratorSubtitle")}
          </p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1.2rem", padding: "2.4rem 2.6rem" }}>
          <p style={{ margin: "0 0 1.8rem", fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
            {isMember ? t("studySettings.collaboratorBody") : "You're viewing this study as an admin. Settings are read-only — only the study's owner can change them."}
          </p>
          {isMember && (
            <form action={leaveAction}>
              <SubmitButton
                pendingLabel={t("studySettings.leavingButton")}
                style={{ padding: "0.85rem 2rem", background: "var(--coral)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none" }}
                className="hover:opacity-80 transition-opacity"
              >
                {t("studySettings.leaveButton")}
              </SubmitButton>
            </form>
          )}
        </div>
      </div>
    );
  }

  const memberEmails = await fetchMemberEmails(
    (project.members ?? []).map(String),
  );

  const boundAction = updateSettingsAction.bind(null, studyId);

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const baseUrl = host.startsWith("localhost") ? `http://${host}` : `https://${host}`;

  return (
    <div style={{ maxWidth: "72rem" }}>
      <div style={{ marginBottom: "3.2rem" }}>
        <h2
          className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "2.4rem", letterSpacing: "-0.02em" }}
        >
          {t("studySettings.title")}
        </h2>
        <p style={{ margin: "0.6rem 0 0", fontSize: "1.35rem", color: "var(--ink-60)" }}>
          {t("studySettings.subtitle")}
        </p>
      </div>

      <SettingsClient
        project={project}
        memberEmails={memberEmails}
        action={boundAction}
        notice={notice}
        warning={warning}
        baseUrl={baseUrl}
      />
    </div>
  );
}
