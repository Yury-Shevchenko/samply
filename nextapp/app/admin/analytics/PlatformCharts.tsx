"use client";

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
  Legend,
} from "recharts";
import type {
  PlatformTimeSeriesPoint,
  TopStudyRow,
  StudyComplianceBucket,
} from "@/lib/data/admin";

// Concrete values — CSS custom properties don't resolve inside SVG attributes
const C = {
  ink:   "#23201a",
  ink60: "rgba(35,32,26,0.62)",
  ink40: "rgba(35,32,26,0.42)",
  ink20: "rgba(35,32,26,0.20)",
  ink10: "rgba(35,32,26,0.10)",
  coral: "#d65a30",
  sage:  "#3d736b",
} as const;

const TICK = { fontFamily: "var(--font-mono)", fontSize: 10, fill: C.ink40 };
const TOOLTIP_STYLE = {
  contentStyle: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    border: "1px solid var(--ink-10)",
    background: "var(--surface)",
    borderRadius: 6,
    color: C.ink60,
  },
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NotificationsChart({ data }: { data: PlatformTimeSeriesPoint[] }) {
  const hasData = data.some((d) => d.sent > 0);
  if (!hasData) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C.ink} stopOpacity={0.12} />
            <stop offset="95%" stopColor={C.ink} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="respondedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C.sage} stopOpacity={0.25} />
            <stop offset="95%" stopColor={C.sage} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
        <XAxis dataKey="date" tickFormatter={fmtDate} tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} interval="preserveStartEnd" />
        <YAxis tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} allowDecimals={false} />
        <Tooltip
          {...TOOLTIP_STYLE}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any, name: any) => [v, name === "sent" ? "Sent" : "Opened"]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          labelFormatter={(label: any) => fmtDate(String(label))}
        />
        <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, color: C.ink40 }} />
        <Area type="monotone" dataKey="sent" stroke={C.ink} strokeWidth={1.5} fill="url(#sentGrad)" dot={false} name="sent" />
        <Area type="monotone" dataKey="responded" stroke={C.sage} strokeWidth={2} fill="url(#respondedGrad)" dot={false} name="responded" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RegistrationsChart({ data }: { data: PlatformTimeSeriesPoint[] }) {
  const hasData = data.some((d) => d.newStudies > 0 || d.newResearchers > 0);
  if (!hasData) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
        <XAxis dataKey="date" tickFormatter={fmtDate} tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} interval="preserveStartEnd" />
        <YAxis tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} allowDecimals={false} />
        <Tooltip
          {...TOOLTIP_STYLE}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any, name: any) => [v, name === "newStudies" ? "New studies" : "New researchers"]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          labelFormatter={(label: any) => fmtDate(String(label))}
        />
        <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, color: C.ink40 }} />
        <Line type="monotone" dataKey="newStudies" stroke={C.coral} strokeWidth={2} dot={false} name="newStudies" />
        <Line type="monotone" dataKey="newResearchers" stroke={C.ink60} strokeWidth={1.5} dot={false} name="newResearchers" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TopStudiesChart({ data }: { data: TopStudyRow[] }) {
  if (!data.length) return <EmptyState />;

  const chartData = data.map((d) => ({ name: d.name.length > 22 ? d.name.slice(0, 22) + "…" : d.name, participants: d.participantCount }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, chartData.length * 36)}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 48, left: 8, bottom: 0 }}>
        <XAxis type="number" tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} allowDecimals={false} />
        <YAxis dataKey="name" type="category" tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} width={160} />
        <Tooltip
          {...TOOLTIP_STYLE}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any) => [v, "Participants"]}
        />
        <Bar dataKey="participants" fill={C.ink10} stroke={C.ink20} strokeWidth={1} radius={[0, 4, 4, 0]}
          label={{ position: "right", style: { fontFamily: "var(--font-mono)", fontSize: 11, fill: C.ink40 } }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComplianceDistributionChart({ data }: { data: StudyComplianceBucket[] }) {
  const hasData = data.some((d) => d.count > 0);
  if (!hasData) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.ink10} vertical={false} />
        <XAxis dataKey="bucket" tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} />
        <YAxis tick={TICK} stroke={C.ink40} axisLine={{ stroke: C.ink10 }} tickLine={false} allowDecimals={false} />
        <Tooltip
          {...TOOLTIP_STYLE}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(v: any) => [v, "Studies"]}
        />
        <Bar dataKey="count" fill={C.sage} fillOpacity={0.25} stroke={C.sage} strokeWidth={1} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function EmptyState() {
  return (
    <div style={{ padding: "2.4rem 0", textAlign: "center", color: C.ink40, fontFamily: "var(--font-mono)", fontSize: "1.1rem" }}>
      No data yet
    </div>
  );
}
