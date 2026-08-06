import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import mongoose from "mongoose";

/**
 * Reports the outcome of the most recent pre-flight test send.
 *
 * This is the check nothing in the platform previously offered: it shows the
 * survey URL exactly as it was handed to the participant's phone, after
 * placeholder substitution. A researcher can read it and see immediately
 * whether their participant id actually arrived — rather than discovering weeks
 * later, during analysis, that the export has no usable identifier.
 *
 * The three stages mirror the chain that has to work end to end:
 *   sent      → the push left Samply with a substituted URL
 *   opened    → the participant tapped it and the link opened
 *   completed → the survey tool called back, so completion tracking works
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ studyId: string }> },
) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });

  await connectDB();
  const latest = (await Result.findOne(
    { project: new mongoose.Types.ObjectId(studyId), isTest: true },
    { data: 1, events: 1, created: 1, messageId: 1, samplyid: 1 },
  )
    .sort({ created: -1 })
    .lean()) as {
    data?: { url?: string };
    events?: Array<{ status: string; created: Date }>;
    created?: Date;
    messageId?: string;
    samplyid?: string;
  } | null;

  if (!latest) {
    // Either nothing was ever queued, or the cron has not picked it up yet —
    // it polls once a minute, so a just-queued test legitimately shows nothing.
    return Response.json({ state: "none" });
  }

  const statuses = new Set((latest.events ?? []).map((e) => e.status));
  const url = latest.data?.url ?? "";

  return Response.json({
    state: "sent",
    sentAt: latest.created ?? null,
    // The substituted URL — the single most useful thing on this page.
    url,
    // Anything left unsubstituted means the survey will receive a literal
    // placeholder instead of a value.
    unsubstituted: /%[A-Z0-9_]+%/.test(url),
    // Whether the participant's actual id reached the survey. Checked against
    // the sent URL rather than the configured one: by this point substitution
    // has already happened, so the presence of the real id is direct proof the
    // survey received something it can key responses on.
    carriesIdentifier: !!latest.samplyid && url.includes(latest.samplyid),
    // Completion tracking needs the message id to survive the round trip.
    carriesMessageId: !!latest.messageId && url.includes(latest.messageId),
    opened: statuses.has("tapped") || statuses.has("opened-in-app"),
    completed: statuses.has("completed"),
    deliveryFailed: statuses.has("delivery-failed") || statuses.has("send-failed"),
  });
}
