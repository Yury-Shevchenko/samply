import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { resetNotifyTokenAction } from "./actions";
import { CopyButton } from "./CopyButton";

const BASE_URL = process.env.EXPRESS_URL ?? "https://samply.uni-konstanz.de";
const NOTIFY_ENDPOINT = `${BASE_URL}/api/notify`;

function fmt(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function isExpired(d?: string | null) {
  if (!d) return true;
  return new Date(d) < new Date();
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1.2rem", padding: "2.4rem 2.6rem" }}>
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

  const codeSnippet = `const url = "${NOTIFY_ENDPOINT}";
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
          stream api
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.6rem", letterSpacing: "-0.025em", margin: 0, lineHeight: 1.1 }}>
          Notify API
        </h2>
        <p style={{ margin: "0.8rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6, maxWidth: "54rem" }}>
          Trigger notifications from an external system — your survey tool, a script, or any HTTP client — by posting to the Samply API. Useful for event-contingent designs where a notification should fire immediately after an event of interest.
        </p>
      </div>

      {/* Token */}
      <Section title="Notification token">
        {token ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <code style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "1.2rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "0.8rem 1.2rem", wordBreak: "break-all", color: expired ? "var(--coral)" : "var(--ink)" }}>
                {token}
              </code>
              <CopyButton text={token} label="Copy token" />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: expired ? "var(--coral)" : "var(--ink-60)" }}>
              {expired
                ? `⚠ Token expired on ${fmt(expires!)}`
                : `Valid until ${fmt(expires!)}`}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "1.3rem", color: "var(--ink-40)", margin: 0 }}>
            No token generated yet. {isOwner ? "Use the form below to create one." : "Ask the study owner to generate a token."}
          </p>
        )}
      </Section>

      {/* Reset token — owner only */}
      {isOwner && (
        <Section title={token ? "Regenerate token" : "Generate token"}>
          <p style={{ fontSize: "1.25rem", color: "var(--ink-60)", margin: "0 0 1.6rem", lineHeight: 1.6 }}>
            {token
              ? "Generating a new token immediately invalidates the old one — update any external scripts that use it."
              : "Set an expiry date and generate your first token."}
          </p>
          <form action={resetAction} style={{ display: "flex", alignItems: "flex-end", gap: "1.2rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-60)" }}>
                Token expires on
              </label>
              <input
                type="date"
                name="notifyExpires"
                required
                min={new Date().toISOString().split("T")[0]}
                style={{ padding: "0.8rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.3rem", fontFamily: "var(--font-body)", background: "var(--paper)", color: "var(--ink)", outline: "none" }}
              />
            </div>
            <button
              type="submit"
              style={{ padding: "0.85rem 2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }}
              className="hover:opacity-80 transition-opacity"
            >
              {token ? "Regenerate" : "Generate token"}
            </button>
          </form>
        </Section>
      )}

      {/* Targeting explanation */}
      <Section title="Targeting">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {[
            { params: "groupID + participantID", effect: "All members of the group except the specified participant" },
            { params: "groupID only", effect: "All members of the group" },
            { params: "participantID only", effect: "That specific participant" },
            { params: "neither", effect: "All participants in the study" },
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
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>message</code>, and{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>url</code> define the notification content.{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)" }}>expireIn</code> is the number of minutes before an undelivered notification is discarded.
        </div>
        <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "var(--ink-40)", lineHeight: 1.6 }}>
          The <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>url</code> supports placeholders:{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%SAMPLY_ID%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%PARTICIPANT_CODE%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%GROUP_CODE%</code>,{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>%MESSAGE_ID%</code> — Samply fills these in per-participant before forwarding the link.
        </div>
      </Section>

      {/* Code example */}
      <Section title="Code example (JavaScript)">
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <CopyButton text={codeSnippet} label="Copy code" />
          </div>
          <pre style={{ margin: 0, padding: "1.6rem", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflowX: "auto", fontFamily: "var(--font-mono)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--ink)" }}>
            <code>{codeSnippet}</code>
          </pre>
        </div>
        <div style={{ marginTop: "1.2rem", fontSize: "1.2rem", color: "var(--ink-40)" }}>
          Endpoint: <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" }}>{NOTIFY_ENDPOINT}</code>
        </div>
      </Section>

    </div>
  );
}
