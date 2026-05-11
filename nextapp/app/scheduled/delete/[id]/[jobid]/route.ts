import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import PendingNotification from "@/lib/models/pendingNotification";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; jobid: string }> },
) {
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { id: notificationConfigId } = await params;
  const projectId = req.nextUrl.searchParams.get("project");

  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    return NextResponse.redirect(new URL("/scheduled", req.url));
  }

  await connectDB();
  const project = await Project.findById(projectId, { notifications: 1, creator: 1, members: 1 });
  if (!project) return NextResponse.redirect(new URL("/scheduled", req.url));

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    notifications: Array<{ id?: string }>;
    save(): Promise<unknown>;
  };

  const isOwner = p.creator.toString() === session.user.id;
  const isMember = p.members?.some((m) => m.toString() === session.user.id) ?? false;
  if (!isOwner && !isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Promise.all([
    Project.findByIdAndUpdate(projectId, {
      $pull: { notifications: { id: notificationConfigId } },
    }),
    PendingNotification.deleteMany({
      projectId: new mongoose.Types.ObjectId(projectId),
      notificationConfigId,
    }),
  ]);

  return NextResponse.redirect(new URL(`/scheduled?project=${projectId}`, req.url));
}
