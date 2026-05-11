import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import NotificationForm from "./NotificationForm";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ participantId?: string }>;
}

export default async function NewSchedulePage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { participantId } = await searchParams;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  const ProjectModel = (await import("@/lib/models/project")).default;
  const connectDB = (await import("@/lib/db")).default;
  await connectDB();
  const proj = await ProjectModel.findById(studyId, { mobileUsers: 1 }).lean() as
    { mobileUsers?: Array<{ group?: { id: string; name?: string } }> } | null;

  const groupMap = new Map<string, string>();
  for (const u of proj?.mobileUsers ?? []) {
    if (u.group?.id) groupMap.set(u.group.id, u.group.name ?? u.group.id);
  }

  const groupItems = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));
  const participantItems = participants.map((p) => ({ id: p.id, username: p.username }));

  return (
    <div className="flex flex-col gap-[2.8rem]">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            new schedule
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Schedule notifications
          </div>
        </div>
        <a href={`/dashboard/${studyId}/schedule`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.8rem 1.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", flexShrink: 0, marginTop: "0.4rem" }}
          className="hover:opacity-70 transition-opacity">
          ← Back to schedules
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
