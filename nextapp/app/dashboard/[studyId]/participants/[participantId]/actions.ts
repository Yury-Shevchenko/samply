"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { purgeParticipantSchedules } from "@/lib/data/erasure";

async function requireOwner(studyId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const project = await Project.findById(studyId, { creator: 1, members: 1 }).lean() as
    { creator: { toString(): string }; members?: Array<{ toString(): string }> } | null;
  if (!project) redirect("/dashboard");

  const userId = session.user.id;
  const isOwner = project.creator.toString() === userId;
  const isMember = project.members?.some((m) => m.toString() === userId) ?? false;
  if (!isOwner && !isMember) redirect("/dashboard");

  return userId;
}

export async function toggleParticipantAction(studyId: string, participantId: string) {
  await requireOwner(studyId);

  // Read current deactivated state via positional projection
  const proj = await Project.findOne(
    { _id: studyId, "mobileUsers.id": participantId },
    { "mobileUsers.$": 1 },
  ).lean() as { mobileUsers?: Array<{ deactivated?: boolean }> } | null;

  const current = proj?.mobileUsers?.[0]?.deactivated ?? false;

  await Project.updateOne(
    { _id: studyId, "mobileUsers.id": participantId },
    { $set: { "mobileUsers.$.deactivated": !current } },
  );

  redirect(`/dashboard/${studyId}/participants/${participantId}`);
}

export async function updateParticipantCodeAction(studyId: string, participantId: string, formData: FormData) {
  await requireOwner(studyId);

  const code = (formData.get("code") as string ?? "").trim();

  await Project.updateOne(
    { _id: studyId, "mobileUsers.id": participantId },
    { $set: { "mobileUsers.$.username": code || null } },
  );

  redirect(`/dashboard/${studyId}/participants/${participantId}`);
}

export async function deleteParticipantAction(studyId: string, participantId: string) {
  await requireOwner(studyId);

  await Project.updateOne(
    { _id: studyId },
    { $pull: { mobileUsers: { id: participantId } } },
  );

  // Stop future notifications/jobs for this participant in this study and
  // withdraw their study consent. Already-collected responses are retained
  // (unenrolment is not erasure of lawfully collected research data).
  await purgeParticipantSchedules(participantId, studyId);

  redirect(`/dashboard/${studyId}/participants`);
}
