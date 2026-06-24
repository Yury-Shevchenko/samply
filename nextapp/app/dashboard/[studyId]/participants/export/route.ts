import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import { recordAccess } from "@/lib/data/audit";

function csvCell(v: unknown): string {
  const s = v == null ? "" : String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function buildCsv(rows: string[][]): string {
  return rows.map((r) => r.map(csvCell).join(",")).join("\n");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ studyId: string }> },
) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const [project, participants] = await Promise.all([
    fetchProjectById(studyId, session.user.id, session.user.level > 100),
    fetchParticipants(studyId),
  ]);

  if (!project) return new NextResponse("Not found", { status: 404 });

  await recordAccess({
    actorUserId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "export_participants",
    projectId: studyId,
    meta: { count: participants.length },
  });

  const infoKeys = new Set<string>();
  for (const p of participants) {
    if (p.information) {
      for (const k of Object.keys(p.information)) infoKeys.add(k);
    }
  }
  const infoKeysArr = [...infoKeys];

  // Note: the device push token is intentionally excluded — it is a device
  // identifier with no research value and should not be exported (GDPR data
  // minimisation).
  const header = [
    "participant_id",
    "code",
    "group",
    "status",
    "enrolled",
    "stripe_account",
    ...infoKeysArr,
  ];

  const rows: string[][] = participants.map((p) => [
    p.id,
    p.username ?? "",
    p.group?.name ?? "",
    p.deactivated ? "deactivated" : "active",
    p.created ? new Date(p.created).toISOString() : "",
    p.stripe?.account ?? "",
    ...infoKeysArr.map((k) => String(p.information?.[k] ?? "")),
  ]);

  const csv = buildCsv([header, ...rows]);
  const projectName = (project as unknown as { name?: string }).name ?? "participants";
  const safeFilename = encodeURIComponent(`${projectName} - participants.csv`);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
    },
  });
}
