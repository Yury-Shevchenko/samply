import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import mongoose from "mongoose";
import { groupByOccasion } from "@/lib/data/analytics";

export interface StudyCompliance {
  projectId: string;
  sent: number;
  responded: number;
  pct: number;
}

export async function fetchComplianceForProjects(
  projectIds: string[],
  days = 7,
): Promise<Map<string, StudyCompliance>> {
  await connectDB();

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const oids = projectIds.map((id) => new mongoose.Types.ObjectId(id));

  // One aggregation for both sides, so the denominator and numerator are always
  // comparable. "sent" = sampling occasions in the window: an original send
  // together with its reminders counts once, and rows that were never a prompt
  // (survey-data saves) not at all (see groupByOccasion).
  // "responded" = occasions with any responded event on any of their rows.
  // Matches the Analytics page: the same statuses, test sends excluded.
  const rows: { _id: mongoose.Types.ObjectId; sent: number; responded: number }[] =
    await Result.aggregate([
      { $match: { project: { $in: oids }, created: { $gte: since }, isTest: { $ne: true } } },
      ...groupByOccasion(),
      { $group: { _id: "$project", sent: { $sum: 1 }, responded: { $sum: "$responded" } } },
    ]);

  const byProject = new Map(rows.map((r) => [String(r._id), r]));

  const out = new Map<string, StudyCompliance>();
  for (const id of projectIds) {
    const sent = byProject.get(id)?.sent ?? 0;
    const responded = byProject.get(id)?.responded ?? 0;
    const pct = sent > 0 ? Math.round((responded / sent) * 100) : responded > 0 ? 100 : 0;
    out.set(id, { projectId: id, sent, responded, pct });
  }
  return out;
}

export async function fetchComplianceForProject(
  projectId: string,
  days = 7,
): Promise<StudyCompliance> {
  const map = await fetchComplianceForProjects([projectId], days);
  return map.get(projectId) ?? { projectId, sent: 0, responded: 0, pct: 0 };
}
