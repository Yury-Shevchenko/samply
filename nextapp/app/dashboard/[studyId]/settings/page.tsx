import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchProjectById, fetchMemberEmails } from "@/lib/data/projects";
import { updateSettingsAction } from "./actions";
import SettingsClient from "./SettingsClient";
import { getT } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: Promise<{ studyId: string }> }) {
  const { studyId } = await params;
  const session = await auth();
  if (!session) return { title: "Settings — Samply" };
  const project = await fetchProjectById(studyId, session.user.id);
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

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) notFound();

  const memberEmails = await fetchMemberEmails(
    (project.members ?? []).map(String),
  );

  const boundAction = updateSettingsAction.bind(null, studyId);

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const baseUrl = host.startsWith("localhost") ? `http://${host}` : `https://${host}`;

  const { t } = await getT();

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
