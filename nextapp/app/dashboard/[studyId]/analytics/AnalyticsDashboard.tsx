"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/app/components/TranslationProvider";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import type {
  AnalyticsOverview,
  TimeSeriesPoint,
  FunnelStage,
  ResponseTimeBucket,
  HourlyPoint,
  ParticipantComplianceRow,
  SchedulePerformanceRow,
  RetentionPoint,
} from "@/lib/data/analytics";
import type { NotificationConfig } from "@/lib/data/scheduled";

interface AnalyticsData {
  overview: AnalyticsOverview;
  timeSeries: TimeSeriesPoint[];
  funnel: FunnelStage[];
  responseTimes: ResponseTimeBucket[];
  hourly: HourlyPoint[];
  participants: ParticipantComplianceRow[];
  schedules: SchedulePerformanceRow[];
  retention: RetentionPoint[];
}

interface Props {
  studyId: string;
  days: number;
  initialData: AnalyticsData;
  notifications: NotificationConfig[];
}

const POLL_INTERVAL_MS = 5 * 60 * 1000;

// ── Small helpers ─────────────────────────────────────────────────────────────

function fmtMs(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtLastActive(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Shared card wrapper ───────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "0.8rem",
        padding: "1.8rem 2.2rem",
        boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.95rem",
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: "var(--ink-40)",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </div>
  );
}

// Inline compliance bar used in tables
function ComplianceBar({ pct }: { pct: number }) {
  const isLow = pct < 60;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
      <div style={{ flex: 1, height: "0.4rem", background: "var(--ink-10)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: isLow ? "var(--coral)" : "var(--ink)", borderRadius: "9999px" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: isLow ? "var(--coral)" : "var(--ink-60)", minWidth: "3ch", textAlign: "right" }}>
        {pct}%
      </span>
    </div>
  );
}

// Concrete color values — CSS custom properties don't resolve in SVG attributes
const C = {
  ink:   "#23201a",
  ink60: "rgba(35,32,26,0.62)",
  ink40: "rgba(35,32,26,0.42)",
  ink20: "rgba(35,32,26,0.20)",
  ink10: "rgba(35,32,26,0.10)",
  coral: "#d65a30",
  sage:  "#3d736b",
} as const;

// Shared recharts tick style
const TICK_STYLE = { fontFamily: "var(--font-mono)", fontSize: 11, fill: C.ink40 };

// ── Section 1: Metric cards ───────────────────────────────────────────────────

function MetricsRow({ overview, days }: { overview: AnalyticsOverview; days: number }) {
  const { t } = useT();
  const stats = [
    { label: t("analytics.metricSent"), value: overview.totalSent, sub: t("analytics.subLastDays", { days: String(days) }) },
    { label: t("analytics.metricRate"), value: overview.totalSent > 0 ? `${overview.compliancePct}%` : "—", sub: t("analytics.subOpenedOf", { responded: String(overview.totalResponded), sent: String(overview.totalSent) }) },
    { label: t("analytics.metricTime"), value: fmtMs(overview.avgResponseTimeMs), sub: t("analytics.subSentOpened") },
    { label: t("analytics.metricActive"), value: overview.activeParticipants, sub: t("analytics.subUniqueRespondents") },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, sub }) => (
        <div
          key={label}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--ink-10)",
            borderRadius: "0.8rem",
            padding: "1.6rem 2rem",
            boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.8rem" }}>
            {label}
          </div>
          <div
            className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "3.4rem", letterSpacing: "-0.025em", lineHeight: 1, color: "var(--ink)" }}
          >
            {value}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-40)", marginTop: "0.5rem" }}>
            {sub}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section 2: Response rate over time ────────────────────────────────────────

function ResponseRateChart({ data }: { data: TimeSeriesPoint[] }) {
  const { t } = useT();
  const hasData = data.some((d) => d.sent > 0);

  return (
    <Card>
      <CardTitle>{t("analytics.chartRateOverTime")}</CardTitle>
      {!hasData ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="pctGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.ink} stopOpacity={0.12} />
                <stop offset="95%" stopColor={C.ink} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
            <XAxis dataKey="date" tickFormatter={fmtDate} tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} interval="preserveStartEnd" />
            <YAxis domain={[0, 100]} unit="%" tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} />
            <Tooltip
              contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid var(--ink-10)", background: "var(--surface)", borderRadius: 6 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any, name: any) => [name === "pct" ? `${v}%` : v, name === "pct" ? t("analytics.tooltipResponseRate") : t("analytics.tooltipSent")]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              labelFormatter={(label: any) => fmtDate(String(label))}
            />
            <Area type="monotone" dataKey="pct" stroke={C.ink} strokeWidth={2} fill="url(#pctGrad)" dot={false} name="pct" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

// ── Section 3: Delivery funnel ────────────────────────────────────────────────

function DeliveryFunnel({ data }: { data: FunnelStage[] }) {
  const { t } = useT();
  const total = data[0]?.count ?? 0;
  const hasData = total > 0;
  const COLORS = [C.ink, C.ink60, C.sage, C.coral];

  return (
    <Card>
      <CardTitle>{t("analytics.chartFunnel")}</CardTitle>
      {!hasData ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 48, left: 8, bottom: 0 }}>
            <XAxis type="number" tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} />
            <YAxis dataKey="label" type="category" tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} width={72} />
            <Tooltip
              contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid var(--ink-10)", background: "var(--surface)", borderRadius: 6 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) => [v, t("analytics.tooltipCount")]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} label={{ position: "right", style: { fontFamily: "var(--font-mono)", fontSize: 11, fill: C.ink40 } }}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i] ?? C.ink20} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

// ── Section 4: Response time distribution ─────────────────────────────────────

function ResponseTimeHistogram({ data }: { data: ResponseTimeBucket[] }) {
  const { t } = useT();
  const hasData = data.some((d) => d.count > 0);

  return (
    <Card>
      <CardTitle>{t("analytics.chartResponseTime")}</CardTitle>
      {!hasData ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
            <XAxis dataKey="bucket" tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} />
            <YAxis tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid var(--ink-10)", background: "var(--surface)", borderRadius: 6 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) => [v, t("analytics.tooltipResponses")]}
            />
            <Bar dataKey="count" fill={C.sage} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

// ── Section 5: Time-of-day pattern ────────────────────────────────────────────

function HourlyPatternChart({ data }: { data: HourlyPoint[] }) {
  const { t } = useT();
  const hasData = data.some((d) => d.totalSent > 0);
  const formatted = data.map((d) => ({ ...d, label: `${String(d.hour).padStart(2, "0")}:00` }));

  return (
    <Card>
      <CardTitle>{t("analytics.chartHourly")}</CardTitle>
      {!hasData ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formatted} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
            <XAxis dataKey="label" tick={{ ...TICK_STYLE, fontSize: 9 }} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} interval={2} />
            <YAxis domain={[0, 100]} unit="%" tick={TICK_STYLE} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} />
            <Tooltip
              contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid var(--ink-10)", background: "var(--surface)", borderRadius: 6 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any, name: any) => [name === "avgPct" ? `${v}%` : v, name === "avgPct" ? t("analytics.tooltipAvgRate") : t("analytics.tooltipSent")]}
            />
            <Bar dataKey="avgPct" fill={C.coral} radius={[4, 4, 0, 0]} name="avgPct" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

// ── Section 6: Schedule performance table ─────────────────────────────────────

function ScheduleTable({ data, notifications }: { data: SchedulePerformanceRow[]; notifications: NotificationConfig[] }) {
  const { t } = useT();
  const nameMap = new Map(notifications.map((n) => [n.id, n.name || n.title]));

  return (
    <Card>
      <CardTitle>{t("analytics.chartSchedules")}</CardTitle>
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>
            <thead>
              <tr style={{ color: "var(--ink-40)", borderBottom: "1px solid var(--ink-10)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colSchedule")}</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colSent")}</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colOpened")}</th>
                <th style={{ padding: "0.5rem 0.8rem", fontWeight: 500, minWidth: "10rem" }}>{t("analytics.colCompliance")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.messageId} style={{ borderBottom: "1px solid var(--ink-05)" }}>
                  <td style={{ padding: "0.7rem 0.8rem", color: "var(--ink)", maxWidth: "22rem" }}>
                    <span className="truncate" style={{ display: "block" }}>{nameMap.get(row.messageId) ?? row.messageId}</span>
                  </td>
                  <td style={{ padding: "0.7rem 0.8rem", textAlign: "right", color: "var(--ink-60)" }}>{row.sent}</td>
                  <td style={{ padding: "0.7rem 0.8rem", textAlign: "right", color: "var(--ink-60)" }}>{row.responded}</td>
                  <td style={{ padding: "0.7rem 0.8rem" }}><ComplianceBar pct={row.pct} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ── Section 7: Participant compliance table ───────────────────────────────────

function ParticipantTable({ data }: { data: ParticipantComplianceRow[] }) {
  const { t } = useT();
  return (
    <Card>
      <CardTitle>{t("analytics.chartParticipants")}</CardTitle>
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>
            <thead>
              <tr style={{ color: "var(--ink-40)", borderBottom: "1px solid var(--ink-10)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colParticipant")}</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colSent")}</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colOpened")}</th>
                <th style={{ padding: "0.5rem 0.8rem", fontWeight: 500, minWidth: "10rem" }}>{t("analytics.colCompliance")}</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.8rem", fontWeight: 500 }}>{t("analytics.colLastActive")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.samplyid} style={{ borderBottom: "1px solid var(--ink-05)" }}>
                  <td style={{ padding: "0.7rem 0.8rem", color: "var(--ink)", fontFamily: "var(--font-mono)" }}>
                    <span className="truncate" style={{ display: "block", maxWidth: "16rem" }}>{row.samplyid}</span>
                  </td>
                  <td style={{ padding: "0.7rem 0.8rem", textAlign: "right", color: "var(--ink-60)" }}>{row.sent}</td>
                  <td style={{ padding: "0.7rem 0.8rem", textAlign: "right", color: "var(--ink-60)" }}>{row.responded}</td>
                  <td style={{ padding: "0.7rem 0.8rem" }}><ComplianceBar pct={row.pct} /></td>
                  <td style={{ padding: "0.7rem 0.8rem", textAlign: "right", color: "var(--ink-40)" }}>{fmtLastActive(row.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ── Section: Participant retention curve ──────────────────────────────────────

function RetentionCurveChart({ data }: { data: RetentionPoint[] }) {
  const { t } = useT();
  const hasData = data.length > 0 && data.some((d) => d.active > 0);

  // Attach a % field for the tooltip and a second series showing eligible
  const chartData = data.map((d) => ({
    ...d,
    pct: d.eligible > 0 ? Math.round((d.active / d.eligible) * 100) : 0,
  }));

  const maxEligible = Math.max(...data.map((d) => d.eligible), 1);

  return (
    <Card>
      <CardTitle>{t("analytics.chartRetention")}</CardTitle>
      {!hasData ? (
        <EmptyState />
      ) : (
        <>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "1.4rem", lineHeight: 1.5 }}>
            {t("analytics.retentionDesc")}
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
              <XAxis
                dataKey="day"
                tickFormatter={(d) => t("analytics.dayLabel", { n: String(d) })}
                tick={TICK_STYLE}
                stroke={C.ink40}
                axisLine={{ stroke: C.ink10 }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, maxEligible]}
                tick={TICK_STYLE}
                stroke={C.ink40}
                axisLine={{ stroke: C.ink10 }}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid var(--ink-10)", background: "var(--surface)", borderRadius: 6 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any, name: any) => {
                  if (name === "active") return [v, t("analytics.tooltipActive")];
                  if (name === "eligible") return [v, t("analytics.tooltipEligible")];
                  return [v, name];
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                labelFormatter={(label: any) => t("analytics.studyDay", { day: String(label) })}
              />
              {/* Eligible (total enrolled so far) as a faint reference area */}
              <Line
                type="monotone"
                dataKey="eligible"
                stroke={C.ink20}
                strokeWidth={1}
                strokeDasharray="4 3"
                dot={false}
                name="eligible"
              />
              {/* Active participants — the dropout curve */}
              <Line
                type="monotone"
                dataKey="active"
                stroke={C.ink}
                strokeWidth={2.5}
                dot={false}
                name="active"
                activeDot={{ r: 4, fill: C.ink }}
              />
              <ReferenceLine y={0} stroke={C.ink10} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: "1.6rem", marginTop: "1rem", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ display: "inline-block", width: "1.6rem", height: "2px", background: "var(--ink)" }} />
              {t("analytics.legendActive")}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ display: "inline-block", width: "1.6rem", height: "2px", background: "var(--ink-20)", borderTop: "2px dashed var(--ink-20)" }} />
              {t("analytics.legendEligible")}
            </span>
          </div>
        </>
      )}
    </Card>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  const { t } = useT();
  return (
    <div style={{ padding: "2.4rem 0", textAlign: "center", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>
      {t("analytics.emptyState")}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

const DAY_OPTIONS = [7, 14, 30] as const;

export default function AnalyticsDashboard({ studyId, days: initialDays, initialData, notifications }: Props) {
  const { t } = useT();
  const [days, setDays] = useState(initialDays);
  const [data, setData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const daysRef = useRef(days);
  daysRef.current = days;

  async function refresh(d: number) {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/analytics/${studyId}?days=${d}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastUpdated(new Date());
      }
    } finally {
      setRefreshing(false);
    }
  }

  // Poll every 5 minutes
  useEffect(() => {
    const id = setInterval(() => refresh(daysRef.current), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [studyId]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDaysChange(d: number) {
    setDays(d);
    refresh(d);
  }

  const updatedStr = lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>

      {/* Header row: days toggle + refresh status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => handleDaysChange(d)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
                letterSpacing: ".08em",
                padding: "0.45rem 1.1rem",
                borderRadius: "9999px",
                border: days === d ? "1px solid var(--ink-40)" : "1px solid var(--ink-10)",
                background: days === d ? "var(--ink)" : "transparent",
                color: days === d ? "var(--paper)" : "var(--ink-60)",
                cursor: "pointer",
                transition: "all .12s",
              }}
            >
              {t("analytics.dayButton", { n: String(d) })}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)" }}>
          <span
            style={{
              width: "0.6rem",
              height: "0.6rem",
              borderRadius: "50%",
              background: refreshing ? "var(--coral)" : "var(--sage)",
              display: "inline-block",
            }}
          />
          {t("analytics.updatedAt", { time: updatedStr })}
        </div>
      </div>

      {/* Section 1: Metrics */}
      <MetricsRow overview={data.overview} days={days} />

      {/* Section 2: Response rate over time */}
      <ResponseRateChart data={data.timeSeries} />

      {/* Section 3: Participant retention curve */}
      <RetentionCurveChart data={data.retention} />

      {/* Section 4 + 5: Funnel and response times side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(28rem, 1fr))", gap: "2rem" }}>
        <DeliveryFunnel data={data.funnel} />
        <ResponseTimeHistogram data={data.responseTimes} />
      </div>

      {/* Section 5: Time-of-day */}
      <HourlyPatternChart data={data.hourly} />

      {/* Section 6: Schedule performance */}
      <ScheduleTable data={data.schedules} notifications={notifications} />

      {/* Section 7: Participant compliance */}
      <ParticipantTable data={data.participants} />
    </div>
  );
}
