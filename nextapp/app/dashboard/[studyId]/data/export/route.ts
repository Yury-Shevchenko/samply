import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import type { IResult } from "@/lib/models/result";

function csvCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function buildCsv(rows: Record<string, unknown>[], keys: string[]): string {
  const header = keys.map(csvCell).join(",");
  const lines = rows.map((row) => keys.map((k) => csvCell(row[k])).join(","));
  return [header, ...lines].join("\r\n");
}

function eventTimes(result: IResult, status: string): string {
  return (result.events ?? [])
    .filter((e) => e.status === status)
    .map((e) => new Date(e.created).getTime())
    .join(";");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ studyId: string }> },
) {
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { studyId } = await params;
  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) return new NextResponse("Not found", { status: 404 });

  await connectDB();

  const proj = await Project.findById(studyId, { mobileUsers: 1 }).lean() as
    { mobileUsers?: Array<{ id: string; username?: string }> } | null;

  const participantMap = new Map<string, string>();
  for (const u of proj?.mobileUsers ?? []) {
    if (u.id && u.username) participantMap.set(u.id, u.username);
  }

  const results = await Result.find(
    { project: new mongoose.Types.ObjectId(studyId) },
  ).lean() as unknown as IResult[];

  const FIXED_KEYS = [
    "samply_id", "title", "message", "url",
    "sent", "tapped", "opened_in_app", "deleted_by_user",
    "received_in_app", "geofencing_event", "completed",
    "message_id", "participant_code",
  ];

  const extraKeys = new Set<string>();
  const rows: Record<string, unknown>[] = [];

  for (const r of results) {
    if (!r.data) continue;

    const coords: Record<string, unknown> = {};
    for (const e of r.events ?? []) {
      if (e.status === "geofencing-event" && e.data) {
        const d = e.data as Record<string, unknown>;
        if (d.coords && typeof d.coords === "object") {
          Object.assign(coords, d.coords as Record<string, unknown>);
        }
      }
    }
    for (const k of Object.keys(coords)) extraKeys.add(k);

    rows.push({
      samply_id: r.samplyid,
      title: r.data.title ?? "",
      message: r.data.message ?? "",
      url: r.data.url ?? "",
      sent: eventTimes(r, "sent"),
      tapped: eventTimes(r, "tapped"),
      opened_in_app: eventTimes(r, "opened-in-app"),
      deleted_by_user: eventTimes(r, "archived"),
      received_in_app: eventTimes(r, "received-in-app"),
      geofencing_event: eventTimes(r, "geofencing-event"),
      completed: eventTimes(r, "completed"),
      message_id: r.messageId ?? "",
      participant_code: participantMap.get(r.samplyid) ?? "",
      ...coords,
    });
  }

  const keys = [
    ...FIXED_KEYS,
    ...Array.from(extraKeys).filter((k) => !FIXED_KEYS.includes(k)),
  ];

  const csv = buildCsv(rows, keys);
  const safeFilename = encodeURIComponent(`${project.name ?? "export"}.csv`);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
    },
  });
}
