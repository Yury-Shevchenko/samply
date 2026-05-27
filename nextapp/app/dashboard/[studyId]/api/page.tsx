import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { resetNotifyTokenAction } from "./actions";
import { CopyButton } from "./CopyButton";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

// Public-facing origin researchers POST to — NOT the internal EXPRESS_URL
// (http://localhost:3000), which is only for server-to-server calls.
const PUBLIC_ORIGIN =
  process.env.NEXTAUTH_URL ??
  (process.env.EXPRESS_PUBLIC_HOST
    ? `https://${process.env.EXPRESS_PUBLIC_HOST}`
    : "https://samply.uni-konstanz.de");
const STREAM_ENDPOINT = `${PUBLIC_ORIGIN}/api/notify`;

function fmt(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function isExpired(d?: string | null) {
  if (!d) return true;
  return new Date(d) < new Date();
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="api-section" style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1.2rem", padding: "2.4rem 2.6rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.8rem" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default async function StudyApiPage({
  params,
}: {
  params: Promise<{ studyId: string }>;
}) {
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { studyId } = await params;
  await connectDB();

  const oid = new mongoose.Types.ObjectId(session.user.id);
  const project = await Project.findOne(
    { _id: studyId, $or: [{ creator: oid }, { members: oid }] },
    { name: 1, creator: 1, notifyToken: 1, notifyExpires: 1 },
  ).lean() as { _id: unknown; name?: string; creator?: unknown; notifyToken?: string; notifyExpires?: Date | null } | null;

  if (!project) notFound();

  const isOwner = String(project.creator) === session.user.id;
  const token = project.notifyToken ?? null;
  const expires = project.notifyExpires ? new Date(project.notifyExpires).toISOString() : null;
  const expired = isExpired(expires);

  const resetAction = resetNotifyTokenAction.bind(null, studyId);

  const codeSnippet = `const url = "${STREAM_ENDPOINT}";
const data = {
  projectID: "${studyId}",
  groupID: "\${placeholder-for-groupID}",      // optional
  participantID: "\${placeholder-for-participantID}", // optional
  token: "${token ?? "<generate a token below>"}",
  title: "your-notification-title",
  message: "your-notification-message",
  url: "https://your-survey-link/?samplyid=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_CODE%&message=%MESSAGE_ID%",
  expireIn: 60, // minutes before notification expires if not delivered
};

async function sendNotification(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

sendNotification(url, data);`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "76rem" }}>

      {/* Header */}
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
          {t("streamApi.label")}
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", letterSpacing: "-0.025em", margin: 0, lineHeight: 1.1 }}>
          {t("streamApi.title")}
        </h2>
        <p style={{ margin: "0.8rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6, maxWidth: "54rem" }}>
          {t("streamApi.subtitle")}
        </p>
      </div>

      {/* Token */}
      <Section title={t("streamApi.sectionToken")}>
        {token ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <code style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "1.2rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "0.8rem 1.2rem", wordBreak: "break-all", color: expired ? "var(--coral)" : "var(--ink)" }}>
                {token}
              </code>
              <CopyButton text={token} label={t("streamApi.copyToken")} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: expired ? "var(--coral)" : "var(--ink-60)" }}>
              {expired
                ? t("streamApi.tokenExpired", { date: fmt(expires!) })
                : t("streamApi.tokenValid", { date: fmt(expires!) })}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "1.3rem", color: "var(--ink-40)", margin: 0 }}>
            {t("streamApi.noToken")} {isOwner ? t("streamApi.noTokenOwner") : t("streamApi.noTokenMember")}
          </p>
        )}
      </Section>

      {/* Reset token — owner only */}
      {isOwner && (
        <Section title={token ? t("streamApi.sectionRegenerate") : t("streamApi.sectionGenerate")}>
          <p style={{ fontSize: "1.25rem", color: "var(--ink-60)", margin: "0 0 1.6rem", lineHeight: 1.6 }}>
            {token ? t("streamApi.regenerateBody") : t("streamApi.generateBody")}
          </p>
          <form action={resetAction} style={{ display: "flex", alignItems: "flex-end", gap: "1.2rem", flexWrap: "wrap" }}>
            <div className="mob-full" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-60)" }}>
                {t("streamApi.expiresLabel")}
              </label>
              <input
                type="date"
                name="notifyExpires"
                required
                min={new Date().toISOString().split("T")[0]}
                className="mob-full"
                style={{ padding: "0.8rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.3rem", fontFamily: "var(--font-body)", background: "var(--paper)", color: "var(--ink)", outline: "none" }}
              />
            </div>
            <SubmitButton
              pendingLabel={token ? t("streamApi.regeneratingLabel") : t("streamApi.generatingLabel")}
              style={{ padding: "0.85rem 2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none" }}
              className="mob-full hover:opacity-80 transition-opacity"
            >
              {token ? t("streamApi.regenerateButton") : t("streamApi.generateButton")}
            </SubmitButton>
          </form>
        </Section>
      )}

      {/* Targeting explanation */}
      <Section title={t("streamApi.sectionTargeting")}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {[
            { params: "groupID + participantID", effect: t("streamApi.targetGroupAndParticipant") },
            { params: "groupID only", effect: t("streamApi.targetGroupOnly") },
            { params: "participantID only", effect: t("streamApi.targetParticipantOnly") },
            { params: "neither", effect: t("streamApi.targetNeither") },
          ].map(({ params: p, effect }) => (
            <div key={p} style={{ display: "flex", gap: "1.6rem", alignItems: "baseline", flexWrap: "wrap" }}>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", background: "rgba(214,90,48,.06)", padding: "0.2rem 0.7rem", borderRadius: "0.4rem", flexShrink: 0 }}>
                {p}
              </code>
              <span style={{ fontSize: "1.25rem", color: "var(--ink-60)" }}>{effect}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.4rem", fontSize: "1.2rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>title</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>message</code>, {t("streamApi.targetingAnd")}{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>url</code> {t("streamApi.targetingDef")}{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>expireIn</code> {t("streamApi.targetingExpNote")}
        </div>
        <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
          {t("streamApi.targetingPlPre")}{t("streamApi.targetingPlPre") ? " " : ""}<code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>url</code>{" "}{t("streamApi.targetingPlSupport")}{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%SAMPLY_ID%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%PARTICIPANT_CODE%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%GROUP_CODE%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%MESSAGE_ID%</code>{" "}{t("streamApi.targetingPlPost")}
        </div>
      </Section>

      {/* Code example */}
      <Section title={t("streamApi.sectionCode")}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <CopyButton text={codeSnippet} label={t("streamApi.copyCode")} />
          </div>
          <pre className="api-pre" style={{ margin: 0, padding: "1.6rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflowX: "auto", fontFamily: "var(--font-mono)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--ink)" }}>
            <code>{codeSnippet}</code>
          </pre>
        </div>
        <div style={{ marginTop: "1.2rem", fontSize: "1.2rem", color: "var(--ink-40)" }}>
          {t("streamApi.endpoint")} <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" }}>{STREAM_ENDPOINT}</code>
        </div>
      </Section>

    </div>
  );
}
