import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { toggleApprovalRequestAction } from "../actions";

export async function generateMetadata({ params }: { params: Promise<{ studyId: string }> }) {
  const { studyId } = await params;
  const session = await auth();
  if (!session) return {};
  const project = await fetchProjectById(studyId, session.user.id);
  return { title: `Submit for review — ${project?.name ?? "Study"} — Samply` };
}

export default async function ApprovalPage({
  params,
}: {
  params: Promise<{ studyId: string }>;
}) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) notFound();

  const toggleAction = toggleApprovalRequestAction.bind(null, studyId);

  const CARD: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--ink-10)",
    borderRadius: "1.2rem",
    padding: "2.8rem 3.2rem",
    marginBottom: "2rem",
  };

  const PROSE: React.CSSProperties = {
    fontSize: "1.35rem",
    color: "var(--ink-60)",
    lineHeight: 1.65,
    margin: "0 0 1.4rem",
  };

  if (project.public) {
    return (
      <div style={{ maxWidth: "64rem" }}>
        <div style={CARD}>
          <h2 className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "1.8rem" }}>
            Your study is public
          </h2>
          <p style={PROSE}>
            Your study is now displayed in the public list of studies in the <strong>Samply Research</strong> mobile application.
            Participants who browse the app can discover and join it directly.
          </p>
          <p style={PROSE}>
            If you want to remove the study from the public list, press the button below.
            Note that this action cannot be undone — if you want to make your study public again later, you would need to reapply for approval.
          </p>
          <form action={toggleAction}>
            <button
              type="submit"
              style={{
                padding: "0.9rem 2.2rem",
                background: "rgba(214,90,48,.08)",
                border: "1px solid rgba(214,90,48,.3)",
                borderRadius: "9999px",
                color: "var(--coral)",
                fontSize: "1.3rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Remove from public list
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (project.requestedForApproval) {
    return (
      <div style={{ maxWidth: "64rem" }}>
        <div style={{ ...CARD, background: "rgba(61,115,107,.04)", border: "1px solid rgba(61,115,107,.2)" }}>
          <div style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>✓</div>
          <h2 className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "1.8rem", color: "var(--sage)" }}>
            Request submitted
          </h2>
          <p style={{ ...PROSE, color: "var(--ink)" }}>
            Your request for approval has been submitted. We will review your study and get back to you.
          </p>
          <p style={{ ...PROSE }}>
            If you don&apos;t hear from us for a while, don&apos;t hesitate to contact us by{" "}
            <a href="mailto:yury.shevchenko@uni.kn?subject=Samply approval request" style={{ color: "var(--sage)" }}>
              email
            </a>.
          </p>
          <form action={toggleAction} style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.7rem 1.8rem",
                background: "none",
                border: "1px solid var(--ink-20)",
                borderRadius: "9999px",
                color: "var(--ink-60)",
                fontSize: "1.25rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Withdraw request
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "64rem" }}>
      <div style={CARD}>
        <h2 className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "1.8rem" }}>
          Submit for public approval
        </h2>

        <p style={PROSE}>
          Public studies are displayed in the study list inside the <strong>Samply Research</strong> mobile app,
          so any participant browsing the app can discover and join your study.
        </p>
        <p style={PROSE}>
          Your study does <strong>not</strong> have to be public to collect data — you can always invite participants
          privately via QR code or direct link.
        </p>

        <div
          style={{
            background: "rgba(214,90,48,.06)",
            border: "1px solid rgba(214,90,48,.18)",
            borderRadius: "0.8rem",
            padding: "1.4rem 1.8rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ ...PROSE, margin: 0, color: "var(--ink)" }}>
            <strong>Requirements for approval:</strong> complete participant instructions, a consent form,
            researcher information, and a confirmed researcher email address.
            Studies intended only for testing should use the private QR-code invitation instead.
          </p>
        </div>

        <form action={toggleAction}>
          <button
            type="submit"
            style={{
              padding: "0.9rem 2.4rem",
              background: "var(--ink)",
              border: "none",
              borderRadius: "9999px",
              color: "var(--paper)",
              fontSize: "1.3rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Submit approval request →
          </button>
        </form>
      </div>
    </div>
  );
}
