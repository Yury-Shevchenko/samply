import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { toggleApprovalRequestAction } from "../actions";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: Promise<{ studyId: string }> }) {
  const { studyId } = await params;
  const session = await auth();
  if (!session) return {};
  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
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

  const { t } = await getT();
  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
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
            {t("approval.publicTitle")}
          </h2>
          <p style={PROSE}>
            {t("approval.publicBody1", { appName: "Samply Research" }).replace("Samply Research", "")}
            <strong>Samply Research</strong>
            {t("approval.publicBody1", { appName: "Samply Research" }).split("Samply Research")[1]}
          </p>
          <p style={PROSE}>
            {t("approval.publicBody2")}
          </p>
          <form action={toggleAction}>
            <SubmitButton
              pendingLabel={t("approval.removingLabel")}
              style={{
                padding: "0.9rem 2.2rem",
                background: "rgba(214,90,48,.08)",
                border: "1px solid rgba(214,90,48,.3)",
                borderRadius: "9999px",
                color: "var(--coral)",
                fontSize: "1.3rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
              }}
            >
              {t("approval.removeFromPublic")}
            </SubmitButton>
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
            {t("approval.pendingTitle")}
          </h2>
          <p style={{ ...PROSE, color: "var(--ink)" }}>
            {t("approval.pendingBody1")}
          </p>
          <p style={{ ...PROSE }}>
            {t("approval.pendingBody2", { emailLink: "" }).split("{emailLink}")[0]}
            <a href="mailto:yury.shevchenko@uni.kn?subject=Samply approval request" style={{ color: "var(--sage)" }}>
              {t("approval.pendingEmail")}
            </a>
            {t("approval.pendingBody2", { emailLink: "" }).split("{emailLink}")[1]}
          </p>
          <form action={toggleAction} style={{ marginTop: "2rem" }}>
            <SubmitButton
              pendingLabel={t("approval.withdrawingLabel")}
              style={{
                padding: "0.7rem 1.8rem",
                background: "none",
                border: "1px solid var(--ink-20)",
                borderRadius: "9999px",
                color: "var(--ink-60)",
                fontSize: "1.25rem",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
              }}
            >
              {t("approval.withdrawRequest")}
            </SubmitButton>
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
          {t("approval.submitTitle")}
        </h2>

        <p style={PROSE}>
          {t("approval.submitBody1", { appName: "Samply Research" }).split("Samply Research")[0]}
          <strong>Samply Research</strong>
          {t("approval.submitBody1", { appName: "Samply Research" }).split("Samply Research")[1]}
        </p>
        <p style={PROSE}>
          {t("approval.submitBody2").split("{not}")[0]}
          <strong>{t("approval.submitBodyNot")}</strong>
          {t("approval.submitBody2").split("{not}")[1]}
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
            {t("approval.requirementsNote")}
          </p>
        </div>

        <form action={toggleAction}>
          <SubmitButton
            pendingLabel={t("approval.submittingLabel")}
            style={{
              padding: "0.9rem 2.4rem",
              background: "var(--ink)",
              border: "none",
              borderRadius: "9999px",
              color: "var(--paper)",
              fontSize: "1.3rem",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
            }}
          >
            {t("approval.submitButton")}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
