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

const ALLOWED_IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "gif", "webp"]);
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);
// Magic bytes for allowed image formats
const IMAGE_MAGIC: Array<{ bytes: number[]; ext: string }> = [
  { bytes: [0xff, 0xd8, 0xff], ext: "jpg" },         // JPEG
  { bytes: [0x89, 0x50, 0x4e, 0x47], ext: "png" },   // PNG
  { bytes: [0x47, 0x49, 0x46], ext: "gif" },          // GIF
  { bytes: [0x52, 0x49, 0x46, 0x46], ext: "webp" },  // WEBP (RIFF header)
];

function detectImageMagic(buf: Buffer): boolean {
  return IMAGE_MAGIC.some(({ bytes }) =>
    bytes.every((b, i) => buf[i] === b)
  );
}

async function handleImageUpload(formData: FormData): Promise<string | null> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return null;

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_IMAGE_EXTS.has(ext)) return null;
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!detectImageMagic(buffer)) return null;

  const safeExt = ext === "jpeg" ? "jpg" : ext;
  const filename = `${nanoid(12)}.${safeExt}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
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

  const getString = (key: string, max: number): string =>
    ((formData.get(key) as string) ?? "").slice(0, max);

  const project = new (Project as mongoose.Model<mongoose.Document>)({
    created: new Date(),
    name: getString("name", 200).trim(),
    description: getString("description", 5000),
    welcomeMessage: getString("welcomeMessage", 2000),
    codeMessage: getString("codeMessage", 2000),
    groupMessage: getString("groupMessage", 2000),
    messageAfterJoin: getString("messageAfterJoin", 2000),
    completionMessage: getString("completionMessage", 2000),
    ...(imageUrl ? { image: imageUrl } : {}),
    creator: new mongoose.Types.ObjectId(session.user.id),
    members: [],
    slug,
    currentlyActive: false,
    public: false,
    settings: {
      askParticipantCode: formData.get("askParticipantCode") === "on",
      askParticipantGroup: formData.get("askParticipantGroup") === "on",
      groupEntryMethod: (["list", "random"] as const).includes(formData.get("groupEntryMethod") as "list" | "random") ? formData.get("groupEntryMethod") as "list" | "random" : "code",
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

  const getStr = (key: string, max: number): string =>
    ((formData.get(key) as string) ?? "").slice(0, max);

  const $set: Record<string, unknown> = {
    name: getStr("name", 200).trim(),
    description: getStr("description", 5000),
    welcomeMessage: getStr("welcomeMessage", 2000),
    codeMessage: getStr("codeMessage", 2000),
    groupMessage: getStr("groupMessage", 2000),
    messageAfterJoin: getStr("messageAfterJoin", 2000),
    completionMessage: getStr("completionMessage", 2000),
    "settings.askParticipantCode": formData.get("askParticipantCode") === "on",
    "settings.askParticipantGroup": formData.get("askParticipantGroup") === "on",
    "settings.groupEntryMethod": (["list", "random"] as const).includes(formData.get("groupEntryMethod") as "list" | "random") ? formData.get("groupEntryMethod") as "list" | "random" : "code",
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
