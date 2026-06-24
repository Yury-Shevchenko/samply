import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import NotificationForm from "./NotificationForm";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ participantId?: string }>;
}

export default async function NewSchedulePage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { participantId } = await searchParams;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const [project, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id, session.user.level > 100),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  const ProjectModel = (await import("@/lib/models/project")).default;
  const connectDB = (await import("@/lib/db")).default;
  await connectDB();
  const proj = await ProjectModel.findById(studyId, { mobileUsers: 1, projectGroups: 1 }).lean() as
    { mobileUsers?: Array<{ group?: { id: string; name?: string } }>; projectGroups?: Array<{ id: string; name: string }> } | null;

  const groupMap = new Map<string, string>();
  for (const u of proj?.mobileUsers ?? []) {
    if (u.group?.id) groupMap.set(u.group.id, u.group.name ?? u.group.id);
  }
  // Include empty groups not yet assigned to any participant
  for (const g of proj?.projectGroups ?? []) {
    if (!groupMap.has(g.id)) groupMap.set(g.id, g.name);
  }

  const groupItems = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));
  const participantItems = participants.map((p) => ({ id: p.id, username: p.username }));

  return (
    <div className="flex flex-col gap-[2.8rem]">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            {t("newSchedulePage.eyebrow")}
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {t("newSchedulePage.title")}
          </div>
        </div>
        <a href={`/dashboard/${studyId}/schedule`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.8rem 1.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", flexShrink: 0, marginTop: "0.4rem" }}
          className="hover:opacity-70 transition-opacity">
          {t("newSchedulePage.back")}
        </a>
      </div>

      <NotificationForm
        projectId={studyId}
        participants={participantItems}
        groups={groupItems}
        preselectedParticipantId={participantId}
      />
    </div>
  );
}
