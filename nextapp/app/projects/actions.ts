"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import User from "@/lib/models/user";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import type { Session } from "next-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireResearcher(): Promise<Session> {
  const session = await auth();
  if (!session || (session as Session).user.level <= 10) redirect("/login");
  return session as Session;
}

function confirmOwner(projectCreator: unknown, userId: string) {
  if (String(projectCreator) !== userId) {
    redirect("/projects");
  }
}

async function handleImageUpload(formData: FormData): Promise<string | null> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${nanoid(12)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function createProjectAction(formData: FormData) {
  const session = await requireResearcher();
  await connectDB();

  const userDoc = await User.findById(session.user.id, { emailIsConfirmed: 1 }).lean() as { emailIsConfirmed?: boolean } | null;
  if (!userDoc?.emailIsConfirmed) {
    redirect("/dashboard?emailUnconfirmed=1");
  }

  const imageUrl = await handleImageUpload(formData);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const slug = Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");

  const project = new (Project as mongoose.Model<mongoose.Document>)({
    created: new Date(),
    name: (formData.get("name") as string).trim(),
    description: formData.get("description") as string,
    welcomeMessage: formData.get("welcomeMessage") as string,
    codeMessage: formData.get("codeMessage") as string,
    groupMessage: formData.get("groupMessage") as string,
    messageAfterJoin: formData.get("messageAfterJoin") as string,
    completionMessage: formData.get("completionMessage") as string,
    ...(imageUrl ? { image: imageUrl } : {}),
    creator: new mongoose.Types.ObjectId(session.user.id),
    members: [],
    slug,
    currentlyActive: false,
    public: false,
    settings: {
      askParticipantCode: formData.get("askParticipantCode") === "on",
      askParticipantGroup: formData.get("askParticipantGroup") === "on",
    },
  });

  await project.save();
  redirect("/dashboard");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const session = await requireResearcher();
  await connectDB();

  const project = await Project.findById(id, { creator: 1 }).lean();
  if (!project) redirect("/projects");

  confirmOwner((project as unknown as { creator: unknown }).creator, session.user.id);

  const newImageUrl = await handleImageUpload(formData);
  const removeImage = formData.get("removeImage") === "on";

  const $set: Record<string, unknown> = {
    name: (formData.get("name") as string | null)?.trim() ?? "",
    description: formData.get("description") ?? "",
    welcomeMessage: formData.get("welcomeMessage") ?? "",
    codeMessage: formData.get("codeMessage") ?? "",
    groupMessage: formData.get("groupMessage") ?? "",
    messageAfterJoin: formData.get("messageAfterJoin") ?? "",
    completionMessage: formData.get("completionMessage") ?? "",
    "settings.askParticipantCode": formData.get("askParticipantCode") === "on",
    "settings.askParticipantGroup": formData.get("askParticipantGroup") === "on",
  };

  if (newImageUrl) {
    $set.image = newImageUrl;
  } else if (removeImage) {
    $set.image = "";
  }

  await Project.findByIdAndUpdate(id, { $set });

  redirect(`/projects/${id}/edit?notice=` + encodeURIComponent("Changes saved."));
}

export async function deleteProjectAction(id: string, formData: FormData) {
  const session = await requireResearcher();
  await connectDB();

  const project = await Project.findById(id);
  if (!project) redirect("/projects");

  confirmOwner((project as unknown as { creator: unknown }).creator, session.user.id);

  const confirmation = formData.get("confirmation") as string;
  const projectName = (project as unknown as { name: string }).name;

  if (confirmation !== projectName) {
    redirect(`/projects/${id}/delete?error=` + encodeURIComponent("Name did not match."));
  }

  await project.deleteOne();
  redirect("/projects");
}

export async function toggleActiveAction(id: string) {
  const session = await requireResearcher();
  await connectDB();

  const project = await Project.findById(id, { creator: 1, currentlyActive: 1 }).lean();
  if (!project) redirect("/projects");

  confirmOwner((project as unknown as { creator: unknown }).creator, session.user.id);

  const current = (project as unknown as { currentlyActive?: boolean }).currentlyActive ?? false;
  await Project.findByIdAndUpdate(id, { $set: { currentlyActive: !current } });
  redirect("/projects");
}

export async function toggleApprovalAction(id: string) {
  const session = await requireResearcher();
  await connectDB();

  const project = await Project.findById(id, { creator: 1, requestedForApproval: 1 }).lean();
  if (!project) redirect("/projects");

  confirmOwner((project as unknown as { creator: unknown }).creator, session.user.id);

  const current = (project as unknown as { requestedForApproval?: boolean }).requestedForApproval ?? false;
  await Project.findByIdAndUpdate(id, { $set: { requestedForApproval: !current } });
  redirect("/projects");
}
