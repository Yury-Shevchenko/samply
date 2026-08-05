import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import {
  fetchAnalyticsOverview,
  fetchResponseTimeSeries,
  fetchDeliveryFunnel,
  fetchResponseTimeDistribution,
  fetchHourlyPattern,
  fetchParticipantCompliance,
  fetchSchedulePerformance,
  fetchRetentionCurve,
  parseWindowDays,
} from "@/lib/data/analytics";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ studyId: string }> },
) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // 0 = entire study, and the default. See parseWindowDays.
  const days = parseWindowDays(req.nextUrl.searchParams.get("days"));

  const [overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention] =
    await Promise.all([
      fetchAnalyticsOverview(studyId, days),
      fetchResponseTimeSeries(studyId, days),
      fetchDeliveryFunnel(studyId, days),
      fetchResponseTimeDistribution(studyId, days),
      fetchHourlyPattern(studyId, days),
      fetchParticipantCompliance(studyId, days),
      fetchSchedulePerformance(studyId, days),
      fetchRetentionCurve(studyId),
    ]);

  return Response.json({ overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention });
}
