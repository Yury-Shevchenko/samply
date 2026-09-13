import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Result from "@/lib/models/result";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";
import { getT } from "@/lib/i18n.server";
import { CheckIcon, Notice, Shell } from "../ui";

interface Props {
  params: Promise<{ slug: string; messageId: string }>;
}

export default async function CompletionPage({ params }: Props) {
  const { slug, messageId } = await params;
  const { t } = await getT();

  await connectDB();

  const rawProject = await Project.findOne(
    { slug },
    { name: 1, completionMessage: 1, image: 1 },
  ).lean() as { _id: mongoose.Types.ObjectId; name?: string; completionMessage?: string; image?: string } | null;

  if (!rawProject) {
    return (
      <Notice
        title={t("studyDone.linkInvalid")}
        body={t("studyDone.linkInvalidBody")}
      />
    );
  }

  const rawResult = await Result.findOne(
    { messageId, project: rawProject._id },
    { finid: 1, events: 1 },
  ).lean() as { finid?: string; events?: Array<{ status: string }> } | null;

  if (!rawResult) {
    return (
      <Notice
        title={t("studyDone.responseNotFound")}
        body={t("studyDone.responseNotFoundBody")}
        footnote={t("studyDone.canClose")}
      />
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
        {alreadyCompleted ? t("studyDone.alreadyRecorded") : t("studyDone.thankYou")}
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
          ? t("studyDone.alreadyRecordedBody")
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
        {t("studyDone.closeAndReturn")}
      </p>
    </Shell>
  );
}
