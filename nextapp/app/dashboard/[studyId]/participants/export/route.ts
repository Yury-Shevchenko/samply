import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";

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
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
  ]);

  if (!project) return new NextResponse("Not found", { status: 404 });

  const infoKeys = new Set<string>();
  for (const p of participants) {
    if (p.information) {
      for (const k of Object.keys(p.information)) infoKeys.add(k);
    }
  }
  const infoKeysArr = [...infoKeys];

  const header = [
    "participant_id",
    "code",
    "group",
    "status",
    "enrolled",
    "push_token",
    "stripe_account",
    ...infoKeysArr,
  ];

  const rows: string[][] = participants.map((p) => [
    p.id,
    p.username ?? "",
    p.group?.name ?? "",
    p.deactivated ? "deactivated" : "active",
    p.created ? new Date(p.created).toISOString() : "",
    p.token ?? "",
    p.stripe?.account ?? "",
    ...infoKeysArr.map((k) => String(p.information?.[k] ?? "")),
  ]);

  const csv = buildCsv([header, ...rows]);
  const projectName = (project as unknown as { name?: string }).name ?? "participants";
  const filename = `${projectName} - participants.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
    },
  });
}
