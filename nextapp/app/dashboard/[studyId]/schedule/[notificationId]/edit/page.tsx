import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import { fetchScheduledNotifications } from "@/lib/data/scheduled";
import NotificationForm from "../../new/NotificationForm";

interface Props {
  params: Promise<{ studyId: string; notificationId: string }>;
}

export default async function EditSchedulePage({ params }: Props) {
  const { studyId, notificationId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, participants, configs] = await Promise.all([
    fetchProjectById(studyId, session.user.id, session.user.level > 100),
    fetchParticipants(studyId),
    fetchScheduledNotifications(studyId),
  ]);
  if (!project) notFound();

  const config = configs.find((n) => n.id === notificationId);
  if (!config) notFound();

  // Groups (mirror the create page): assigned groups + empty project groups.
  const ProjectModel = (await import("@/lib/models/project")).default;
  const connectDB = (await import("@/lib/db")).default;
  await connectDB();
  const proj = await ProjectModel.findById(studyId, { mobileUsers: 1, projectGroups: 1 }).lean() as
    { mobileUsers?: Array<{ group?: { id: string; name?: string } }>; projectGroups?: Array<{ id: string; name: string }> } | null;
  const groupMap = new Map<string, string>();
  for (const u of proj?.mobileUsers ?? []) if (u.group?.id) groupMap.set(u.group.id, u.group.name ?? u.group.id);
  for (const g of proj?.projectGroups ?? []) if (!groupMap.has(g.id)) groupMap.set(g.id, g.name);
  const groupItems = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));
  const participantItems = participants.map((p) => ({ id: p.id, username: p.username }));

  const hasSpec = !!config.spec;

  return (
    <div className="flex flex-col gap-[2.8rem]">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            edit schedule
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {config.title || "Untitled schedule"}
          </div>
        </div>
        <a href={`/scheduled/${studyId}?notificationId=${notificationId}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.8rem 1.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", flexShrink: 0, marginTop: "0.4rem" }}
          className="hover:opacity-70 transition-opacity">
          back to queue
        </a>
      </div>

      {/* Scope note */}
      <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.8rem", padding: "1.2rem 1.6rem" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
          Saving updates this schedule in place. Notifications <strong style={{ color: "var(--ink)" }}>already sent stay unchanged</strong>;
          only future, unsent notifications are re-generated from the settings below.
          {!hasSpec && (
            <> {" "}<strong style={{ color: "var(--coral)" }}>This schedule was created before edit support, so its timing/recipient
            fields could not be pre-filled — they show defaults. Re-set them before saving, or you will change the schedule.</strong></>
          )}
        </p>
      </div>

      <NotificationForm
        projectId={studyId}
        participants={participantItems}
        groups={groupItems}
        initial={{
          configId: notificationId,
          spec: config.spec ?? null,
          title: config.title ?? "",
          message: config.message ?? "",
          url: config.url,
          expireIn: config.expireIn ?? null,
          reminders: config.reminders,
        }}
      />
    </div>
  );
}
