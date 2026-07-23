import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchScheduledNotifications } from "@/lib/data/scheduled";
import EditScheduleForm from "./EditScheduleForm";

interface Props {
  params: Promise<{ studyId: string; notificationId: string }>;
}

export default async function EditSchedulePage({ params }: Props) {
  const { studyId, notificationId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  // fetchProjectById returns null when the user has no access — same guard the create page uses.
  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) notFound();

  const configs = await fetchScheduledNotifications(studyId);
  const config = configs.find((n) => n.id === notificationId);
  if (!config) notFound();

  const cadence = config.readable?.interval || config.readable?.from || config.name || "this schedule";

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

      {/* Read-only context + scope note */}
      <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.8rem", padding: "1.2rem 1.6rem" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
          Editing the content of <strong style={{ color: "var(--ink)" }}>{cadence}</strong>. Timing and
          recipients can&rsquo;t be changed here yet — only the message content, link, expiry and
          reminders below. Changes apply to notifications that haven&rsquo;t been sent yet; anything
          already delivered is unaffected.
        </p>
      </div>

      <EditScheduleForm
        studyId={studyId}
        notificationId={notificationId}
        initial={{
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
