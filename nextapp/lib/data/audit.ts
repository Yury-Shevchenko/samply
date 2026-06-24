import mongoose from "mongoose";
import connectDB from "@/lib/db";
import AuditLog, { type AuditAction } from "@/lib/models/auditLog";
import Project from "@/lib/models/project";

/**
 * Record who accessed which participant data and when (GDPR Art. 32
 * accountability). Fire-and-forget: a logging failure must never block the
 * researcher's request, so errors are swallowed (and logged to the console).
 */
export async function recordAccess(entry: {
  actorUserId: string;
  actorEmail?: string;
  action: AuditAction;
  projectId?: string;
  targetSamplyId?: string;
  meta?: Record<string, unknown>;
}): Promise<void> {
  try {
    await connectDB();
    await AuditLog.create({
      actorUserId: new mongoose.Types.ObjectId(entry.actorUserId),
      actorEmail: entry.actorEmail,
      action: entry.action,
      projectId: entry.projectId ? new mongoose.Types.ObjectId(entry.projectId) : null,
      targetSamplyId: entry.targetSamplyId ?? null,
      meta: entry.meta,
    });
  } catch (err) {
    console.error("[audit] failed to record access:", (err as Error).message);
  }
}

export interface AuditLogRow {
  id: string;
  createdAt: string;
  actorEmail: string;
  action: string;
  projectId: string | null;
  projectName: string | null;
  targetSamplyId: string | null;
  meta: Record<string, unknown> | null;
}

export const AUDIT_ACTIONS: AuditAction[] = [
  "view_participant",
  "export_results",
  "export_participants",
  "view_payout",
  "view_receipts",
];

const AUDIT_PAGE_SIZE = 100;

// Paginated, newest-first audit log with project names resolved for display.
export async function fetchAuditLogs(
  page = 1,
  action?: string,
): Promise<{ logs: AuditLogRow[]; count: number; pages: number; page: number }> {
  await connectDB();

  const filter: Record<string, unknown> = {};
  if (action) filter.action = action;

  const skip = (Math.max(1, page) - 1) * AUDIT_PAGE_SIZE;
  const [docs, count] = await Promise.all([
    AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(AUDIT_PAGE_SIZE).lean(),
    AuditLog.countDocuments(filter),
  ]);

  const rows = docs as unknown as Array<{
    _id: unknown;
    createdAt: Date;
    actorEmail?: string;
    action: string;
    projectId?: unknown;
    targetSamplyId?: string | null;
    meta?: Record<string, unknown> | null;
  }>;

  const projectIds = [...new Set(rows.map((r) => r.projectId).filter(Boolean).map(String))];
  const projects = projectIds.length
    ? ((await Project.find({ _id: { $in: projectIds } }, { name: 1 }).lean()) as unknown as Array<{
        _id: unknown;
        name?: string;
      }>)
    : [];
  const nameById = new Map(projects.map((p) => [String(p._id), p.name ?? null]));

  const logs: AuditLogRow[] = rows.map((r) => ({
    id: String(r._id),
    createdAt: new Date(r.createdAt).toISOString(),
    actorEmail: r.actorEmail || "—",
    action: r.action,
    projectId: r.projectId ? String(r.projectId) : null,
    projectName: r.projectId ? nameById.get(String(r.projectId)) ?? null : null,
    targetSamplyId: r.targetSamplyId ?? null,
    meta: r.meta ?? null,
  }));

  return { logs, count, pages: Math.max(1, Math.ceil(count / AUDIT_PAGE_SIZE)), page: Math.max(1, page) };
}
