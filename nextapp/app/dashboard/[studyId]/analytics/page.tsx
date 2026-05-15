import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchScheduledNotifications } from "@/lib/data/scheduled";
import {
  fetchAnalyticsOverview,
  fetchResponseTimeSeries,
  fetchDeliveryFunnel,
  fetchResponseTimeDistribution,
  fetchHourlyPattern,
  fetchParticipantCompliance,
  fetchSchedulePerformance,
  fetchRetentionCurve,
} from "@/lib/data/analytics";
import AnalyticsDashboard from "./AnalyticsDashboard";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ days?: string }>;
}

export default async function AnalyticsPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { days: daysParam } = await searchParams;
  const days = Math.min(90, Math.max(1, Number(daysParam ?? 7)));

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) notFound();

  const [overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention, notifications] =
    await Promise.all([
      fetchAnalyticsOverview(studyId, days),
      fetchResponseTimeSeries(studyId, days),
      fetchDeliveryFunnel(studyId, days),
      fetchResponseTimeDistribution(studyId, days),
      fetchHourlyPattern(studyId, days),
      fetchParticipantCompliance(studyId, days),
      fetchSchedulePerformance(studyId, days),
      fetchRetentionCurve(studyId),
      fetchScheduledNotifications(studyId),
    ]);

  return (
    <AnalyticsDashboard
      studyId={studyId}
      days={days}
      initialData={{ overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention }}
      notifications={notifications}
    />
  );
}
