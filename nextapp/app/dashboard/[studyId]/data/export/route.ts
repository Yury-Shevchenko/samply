import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { recordAccess } from "@/lib/data/audit";
import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import type { IResult } from "@/lib/models/result";

/**
 * Values a spreadsheet would execute rather than display. Excel, LibreOffice
 * and Sheets all treat a leading =, +, - or @ as the start of a formula, so a
 * participant code like `=HYPERLINK(...)` becomes live content in the
 * researcher's export. Both participant-authored codes and researcher-authored
 * titles reach this file.
 */
function isFormulaLike(s: string): boolean {
  if (!/^[=+\-@\t\r]/.test(s)) return false;
  // Negative numbers are not formulas, and the export carries plenty of them —
  // longitudes, offsets. Only escape when the value is not simply a number.
  return !/^-?\d+(\.\d+)?$/.test(s);
}

function csvCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  let s = String(val);
  // Prefix with an apostrophe, which spreadsheets strip on display and treat
  // the remainder as text.
  if (isFormulaLike(s)) s = "'" + s;
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
  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) return new NextResponse("Not found", { status: 404 });

  await recordAccess({
    actorUserId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "export_results",
    projectId: studyId,
  });

  await connectDB();

  const proj = await Project.findById(studyId, { mobileUsers: 1 }).lean() as
    { mobileUsers?: Array<{ id: string; username?: string }> } | null;

  const participantMap = new Map<string, string>();
  for (const u of proj?.mobileUsers ?? []) {
    if (u.id && u.username) participantMap.set(u.id, u.username);
  }

  // Pre-flight test sends are excluded: they are the researcher checking their
  // own setup, not data about a participant.
  const results = await Result.find(
    { project: new mongoose.Types.ObjectId(studyId), isTest: { $ne: true } },
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
    // Rows without a `data` sub-document used to be skipped outright, so the
    // export silently disagreed with the analytics counts. They are real
    // records — geofencing events, and now sends that failed before a payload
    // was stored — and are emitted with empty content columns instead.
    const data = r.data ?? {};

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
      title: data.title ?? "",
      message: data.message ?? "",
      url: data.url ?? "",
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
