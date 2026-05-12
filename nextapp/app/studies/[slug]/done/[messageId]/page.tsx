import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Result from "@/lib/models/result";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ slug: string; messageId: string }>;
}

const Logo = () => (
  <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", textDecoration: "none" }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: "2.8rem", height: "2.8rem", flexShrink: 0 }}>
      <rect width="120" height="120" rx="22" fill="#23201a" />
      <g fill="#d65a30">
        <circle cx="32" cy="40" r="9" />
        <circle cx="58" cy="32" r="9" />
        <circle cx="84" cy="44" r="9" />
        <circle cx="46" cy="68" r="9" />
        <circle cx="78" cy="82" r="9" />
      </g>
    </svg>
    <span
      className="font-[family-name:var(--font-display)] font-bold"
      style={{ fontSize: "2rem", letterSpacing: "-0.02em", color: "var(--ink)" }}
    >
      Samply
    </span>
  </a>
);

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "5.6rem", height: "5.6rem" }}
    >
      <circle cx="28" cy="28" r="28" fill="rgba(61,115,107,.12)" />
      <path
        d="M16 28.5l8.5 8.5 15.5-17"
        stroke="var(--sage)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "5.6rem", height: "5.6rem" }}
    >
      <circle cx="28" cy="28" r="28" fill="rgba(214,90,48,.1)" />
      <path d="M28 18v14" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2" fill="var(--coral)" />
    </svg>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "2rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
        <Logo />
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2.4rem",
        }}
      >
        <div style={{ maxWidth: "44rem", width: "100%", textAlign: "center" }}>
          {children}
        </div>
      </main>
      <footer style={{ padding: "2rem 2.4rem", borderTop: "1px solid var(--ink-10)", textAlign: "center" }}>
        <span
          className="font-[family-name:var(--font-mono)]"
          style={{ fontSize: "1.1rem", color: "var(--ink-20)", letterSpacing: ".08em" }}
        >
          Samply Research Platform
        </span>
      </footer>
    </div>
  );
}

export default async function CompletionPage({ params }: Props) {
  const { slug, messageId } = await params;

  await connectDB();

  const rawProject = await Project.findOne(
    { slug },
    { name: 1, completionMessage: 1, image: 1 },
  ).lean() as { _id: mongoose.Types.ObjectId; name?: string; completionMessage?: string; image?: string } | null;

  if (!rawProject) {
    return (
      <Shell>
        <AlertIcon />
        <h1
          className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "2rem 0 1rem", color: "var(--ink)" }}
        >
          Link not valid.
        </h1>
        <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "var(--ink-40)", fontFamily: "var(--font-body)", margin: 0 }}>
          This study could not be found. The link may be incorrect or the study may no longer be active.
        </p>
      </Shell>
    );
  }

  const rawResult = await Result.findOne(
    { messageId, project: rawProject._id },
    { finid: 1, events: 1 },
  ).lean() as { finid?: string; events?: Array<{ status: string }> } | null;

  if (!rawResult) {
    return (
      <Shell>
        <AlertIcon />
        <h1
          className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "2rem 0 1rem", color: "var(--ink)" }}
        >
          Response not found.
        </h1>
        <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "var(--ink-40)", fontFamily: "var(--font-body)", margin: "0 0 2rem" }}>
          This completion link could not be matched to a notification. It may have already been recorded, or the link may be incorrect.
        </p>
        <p style={{ fontSize: "1.3rem", color: "var(--ink-20)", fontFamily: "var(--font-mono)", letterSpacing: ".04em", margin: 0 }}>
          You can close this page.
        </p>
      </Shell>
    );
  }

  const alreadyCompleted = rawResult.events?.some((e) => e.status === "completed") ?? false;

  if (!alreadyCompleted) {
    const projectOid = new mongoose.Types.ObjectId(String(rawProject._id));

    await Promise.all([
      PendingNotification.updateMany(
        {
          projectId: projectOid,
          finid: rawResult.finid,
          isReminder: true,
          status: { $in: ["pending", "processing"] },
        },
        { $set: { status: "cancelled" } },
      ),
      Result.findOneAndUpdate(
        { messageId },
        { $addToSet: { events: { status: "completed", created: new Date() } } },
      ),
    ]);
  }

  const studyName = rawProject.name ?? "";
  const completionMessage = rawProject.completionMessage?.trim()
    || "Your response has been recorded. Thank you for taking part!";

  return (
    <Shell>
      <CheckIcon />

      <h1
        className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "3.2rem", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "2rem 0 1.2rem", color: "var(--ink)" }}
      >
        {alreadyCompleted ? "Already recorded." : "Thank you."}
      </h1>

      <p
        style={{
          fontSize: "1.6rem",
          lineHeight: 1.65,
          color: "var(--ink-60)",
          fontFamily: "var(--font-body)",
          margin: "0 0 2.8rem",
        }}
      >
        {alreadyCompleted
          ? "This response was already recorded. No action needed — you can close this page."
          : completionMessage}
      </p>

      {studyName && (
        <div
          style={{
            display: "inline-block",
            padding: "0.5rem 1.4rem",
            borderRadius: "9999px",
            border: "1px solid var(--ink-10)",
            background: "var(--surface)",
          }}
        >
          <span
            className="font-[family-name:var(--font-mono)]"
            style={{ fontSize: "1.1rem", color: "var(--ink-40)", letterSpacing: ".08em", textTransform: "uppercase" }}
          >
            {studyName}
          </span>
        </div>
      )}

      <p
        style={{
          fontSize: "1.2rem",
          color: "var(--ink-20)",
          fontFamily: "var(--font-mono)",
          letterSpacing: ".06em",
          marginTop: "3.2rem",
        }}
      >
        You can close this page and return to the app.
      </p>
    </Shell>
  );
}
