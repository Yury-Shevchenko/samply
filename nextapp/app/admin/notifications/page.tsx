import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminNotifications } from "@/lib/data/admin";
import { deleteNotificationsByStatusAction } from "./actions";
import { AdminPage, AdminTable, AdminPagination, TD_STYLE, TD_MONO, fmt, truncate } from "../shared";

export const metadata = { title: "Admin: Notifications — Samply" };

const STATUSES = ["", "pending", "processing", "sent", "failed", "cancelled"] as const;

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: "rgba(214,90,48,.10)", color: "var(--coral)" },
  processing: { bg: "rgba(35,32,26,.08)", color: "var(--ink-60)" },
  sent:       { bg: "rgba(61,115,107,.10)", color: "var(--sage)" },
  failed:     { bg: "rgba(214,90,48,.18)", color: "var(--coral)" },
  cancelled:  { bg: "var(--ink-10)", color: "var(--ink-40)" },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? { bg: "var(--ink-10)", color: "var(--ink-60)" };
  return (
    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, ...c }}>
      {status}
    </span>
  );
}

function qs(s: string, p: string) {
  const parts = [s ? `status=${s}` : "", p ? `projectId=${p}` : ""].filter(Boolean);
  return parts.length ? `?${parts.join("&")}` : "";
}

export function NotificationsView({
  page, pages, count, skip, notifications, projects,
  agendaByType, agendaTotal, status, projectId, sort, dir,
}: {
  page: number; pages: number; count: number; skip: number;
  notifications: Awaited<ReturnType<typeof fetchAdminNotifications>>["notifications"];
  projects: Awaited<ReturnType<typeof fetchAdminNotifications>>["projects"];
  agendaByType: Record<string, number>; agendaTotal: number;
  status: string; projectId: string; sort: string; dir: string;
}) {
  const canDelete = status === "sent" || status === "cancelled";

  return (
    <AdminPage title="Pending Notifications" count={count}>

      {/* Agenda jobs summary */}
      <div
        style={{
          background: agendaTotal === 0 ? "rgba(61,115,107,.08)" : "rgba(214,90,48,.06)",
          border: `1px solid ${agendaTotal === 0 ? "rgba(61,115,107,.2)" : "rgba(214,90,48,.2)"}`,
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: agendaTotal === 0 ? "var(--sage)" : "var(--coral)", marginBottom: 4 }}>
            {agendaTotal === 0
              ? "✓ No legacy Agenda jobs remaining — migration complete."
              : `${agendaTotal} legacy Agenda jobs remaining`}
          </div>
          {agendaTotal > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(agendaByType).map(([name, cnt]) => (
                <span
                  key={name}
                  style={{
                    fontSize: 11,
                    background: "rgba(214,90,48,.1)",
                    color: "var(--coral)",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  {name}: {cnt}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Status filter */}
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, color: "var(--ink-40)", marginRight: 4 }}>Status:</span>
          {STATUSES.map((s) => {
            const isActive = s === status;
            return (
              <a
                key={s || "all"}
                href={`/admin/notifications${qs(s, projectId)}`}
                style={{
                  fontSize: 11.5,
                  padding: "3px 10px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? "var(--ink)" : "var(--surface)",
                  color: isActive ? "var(--paper)" : "var(--ink-60)",
                  border: "1px solid var(--ink-20)",
                }}
              >
                {s || "All"}
              </a>
            );
          })}
        </div>

        {/* Project filter */}
        <form method="get" action="/admin/notifications" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {status && <input type="hidden" name="status" value={status} />}
          <span style={{ fontSize: 11.5, color: "var(--ink-40)" }}>Study:</span>
          <select
            name="projectId"
            defaultValue={projectId}
            style={{
              fontSize: 12.5,
              padding: "4px 10px",
              border: "1px solid var(--ink-20)",
              borderRadius: 8,
              background: "var(--surface)",
              color: "var(--ink)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="">All studies</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 999,
              border: "1px solid var(--ink-20)",
              background: "var(--surface)",
              color: "var(--ink-60)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Apply
          </button>
        </form>

        {/* Delete by status */}
        {canDelete && (
          <form action={deleteNotificationsByStatusAction} style={{ marginLeft: "auto" }}>
            <input type="hidden" name="status" value={status} />
            {projectId && <input type="hidden" name="projectId" value={projectId} />}
            <button
              type="submit"
              style={{
                fontSize: 12,
                padding: "5px 14px",
                borderRadius: 999,
                border: "1px solid rgba(214,90,48,.4)",
                background: "rgba(214,90,48,.08)",
                color: "var(--coral)",
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
              }}
            >
              Delete all {status}
            </button>
          </form>
        )}
      </div>

      <AdminTable
        headers={[
          "#",
          { label: "Status", sort: "status" },
          { label: "Scheduled", sort: "scheduledFor" },
          "Study", "Title", "Message", "Recipients", "Reminder", "Config ID",
        ]}
        sort={sort}
        dir={dir}
        buildSortHref={(field, nextDir) => {
          const parts = [status ? `status=${status}` : "", projectId ? `projectId=${projectId}` : "", `sort=${field}`, `dir=${nextDir}`].filter(Boolean);
          return `/admin/notifications?${parts.join("&")}`;
        }}
      >
        {notifications.map((n, i) => {
          const projName = typeof n.projectId === "object" && n.projectId !== null
            ? (n.projectId as { name: string }).name
            : String(n.projectId ?? "");
          const recipients = n.recipientUserIds?.length
            ? n.recipientUserIds.slice(0, 2).join(", ") + (n.recipientUserIds.length > 2 ? ` +${n.recipientUserIds.length - 2}` : "")
            : "all";

          return (
            <tr key={n._id} style={{ borderBottom: "1px solid var(--ink-10)" }}>
              <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{i + 1 + skip}</td>
              <td style={{ ...TD_STYLE }}><StatusBadge status={n.status} /></td>
              <td style={{ ...TD_STYLE }}>{fmt(n.scheduledFor)}</td>
              <td style={{ ...TD_STYLE, maxWidth: 140 }}>{truncate(projName, 25)}</td>
              <td style={{ ...TD_STYLE, maxWidth: 160, color: "var(--ink)" }}>{truncate(n.title, 30)}</td>
              <td style={{ ...TD_STYLE, maxWidth: 200 }}>{truncate(n.message, 40)}</td>
              <td style={{ ...TD_MONO }}>{recipients}</td>
              <td style={{ ...TD_STYLE, textAlign: "center" }}>
                {n.isReminder
                  ? <span style={{ fontSize: 10.5, color: "var(--coral)", fontWeight: 600 }}>yes</span>
                  : <span style={{ color: "var(--ink-20)" }}>—</span>}
              </td>
              <td style={{ ...TD_MONO, maxWidth: 140 }}>{truncate(n.notificationConfigId ?? "", 16)}</td>
            </tr>
          );
        })}
      </AdminTable>

      <AdminPagination
        page={page}
        pages={pages}
        count={count}
        buildHref={(p) => {
          const parts = [status ? `status=${status}` : "", projectId ? `projectId=${projectId}` : "", sort ? `sort=${sort}` : "", dir ? `dir=${dir}` : ""].filter(Boolean);
          return `/admin/notifications/page/${p}${parts.length ? `?${parts.join("&")}` : ""}`;
        }}
      />
    </AdminPage>
  );
}

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; projectId?: string; sort?: string; dir?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { status = "", projectId = "", sort = "scheduledFor", dir = "desc" } = await searchParams;
  const data = await fetchAdminNotifications(1, status || undefined, projectId || undefined, sort, dir);

  return <NotificationsView page={1} {...data} status={status} projectId={projectId} sort={sort} dir={dir} />;
}
