import { deleteUserAction } from "./actions";
import type { AdminUser } from "@/lib/data/admin";
import { AdminPage, AdminTable, AdminPagination, TD_STYLE, TD_MONO, fmt } from "../shared";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";

function roleBadge(level?: number) {
  if (!level) return <span style={{ color: "var(--ink-20)" }}>—</span>;
  if (level > 100) return <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--coral)", background: "rgba(214,90,48,.1)", padding: "2px 7px", borderRadius: 999 }}>admin</span>;
  if (level > 10) return <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--sage)", background: "rgba(61,115,107,.1)", padding: "2px 7px", borderRadius: 999 }}>researcher</span>;
  return <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ink-40)", background: "var(--ink-10)", padding: "2px 7px", borderRadius: 999 }}>participant</span>;
}

function UserRow({ u, n }: { u: AdminUser; n: number }) {
  const deleteAction = deleteUserAction.bind(null, u._id);
  return (
    <tr style={{ borderBottom: "1px solid var(--ink-10)" }}>
      <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
        <ConfirmDeleteButton
          action={deleteAction}
          message={`Delete user "${u.name ?? u.email}" and all their data? This cannot be undone.`}
        />
      </td>
      <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{n}</td>
      <td style={{ ...TD_STYLE }}>{roleBadge(u.level)}</td>
      <td style={{ ...TD_STYLE }}>{fmt(u.created)}</td>
      <td style={TD_MONO}>{u.samplyId ?? "—"}</td>
      <td style={{ ...TD_STYLE, color: "var(--ink)", fontWeight: 500 }}>
        <a href={`/admin/users/${u._id}`} style={{ color: "inherit", textDecoration: "none" }} className="hover:opacity-70">
          {u.name ?? "—"}
        </a>
      </td>
      <td style={{ ...TD_STYLE }}>{u.email ?? "—"}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>
        {u.emailIsConfirmed ? (
          <span style={{ fontSize: 10.5, color: "var(--sage)", fontWeight: 600 }}>✓</span>
        ) : (
          <span style={{ color: "var(--ink-20)" }}>—</span>
        )}
      </td>
      <td style={{ ...TD_STYLE, maxWidth: 160 }}>{u.institute ?? "—"}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{u.participant_projects?.length ?? 0}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{u.projects?.length ?? 0}</td>
    </tr>
  );
}

type FilterKey = "researchers" | "participants" | "admins" | "unconfirmed" | "";

function buildUsersHref(params: { sort?: string; dir?: string; filter?: string; page?: number }) {
  const { page, ...rest } = params;
  const qs = Object.entries(rest)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  if (page && page > 1) {
    return `/admin/users/page/${page}${qs ? `?${qs}` : ""}`;
  }
  return `/admin/users${qs ? `?${qs}` : ""}`;
}

export function UsersView({
  users, count, page, pages, skip, sort, dir, filter, totalCounts,
}: {
  users: AdminUser[];
  count: number;
  page: number;
  pages: number;
  skip: number;
  sort: string;
  dir: string;
  filter: string;
  totalCounts: { researchers: number; participants: number; unconfirmed: number; admins: number; total: number };
}) {
  const f = filter as FilterKey;

  const tabs: { label: string; count: number; key: FilterKey; color?: string }[] = [
    { label: "All",          count: totalCounts.total,        key: "" },
    { label: "Researchers",  count: totalCounts.researchers,  key: "researchers",  color: "var(--sage)" },
    { label: "Participants", count: totalCounts.participants, key: "participants" },
    { label: "Admins",       count: totalCounts.admins,       key: "admins",       color: "var(--coral)" },
    { label: "Unconfirmed",  count: totalCounts.unconfirmed,  key: "unconfirmed",  color: "var(--coral)" },
  ];

  return (
    <AdminPage title="Users" count={count}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--ink-10)", marginBottom: 24, gap: 0 }}>
        {tabs.map(({ label, count: tabCount, key, color }) => {
          const isActive = f === key;
          return (
            <a
              key={key || "all"}
              href={buildUsersHref({ sort, dir, filter: key || undefined })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 16px",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                color: isActive ? (color ?? "var(--ink)") : "var(--ink-60)",
                borderBottom: isActive ? `2px solid ${color ?? "var(--ink)"}` : "2px solid transparent",
                marginBottom: -1,
                transition: "color .1s",
                whiteSpace: "nowrap",
              }}
            >
              {label}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "1px 6px",
                borderRadius: 999,
                background: isActive ? (color ? `color-mix(in srgb, ${color} 12%, transparent)` : "var(--ink-10)") : "var(--ink-10)",
                color: isActive ? (color ?? "var(--ink)") : "var(--ink-40)",
                fontWeight: 600,
              }}>
                {tabCount}
              </span>
            </a>
          );
        })}
      </div>

      <AdminTable
        headers={[
          "", "#",
          { label: "Role", sort: "level" },
          { label: "Created", sort: "created" },
          "Samply ID",
          { label: "Name", sort: "name" },
          { label: "Email", sort: "email" },
          { label: "Confirmed", sort: "emailIsConfirmed" },
          { label: "Institute", sort: "institute" },
          "As participant", "As researcher",
        ]}
        sort={sort}
        dir={dir}
        buildSortHref={(field, nextDir) => buildUsersHref({ sort: field, dir: nextDir, filter: f || undefined })}
      >
        {users.map((u, i) => (
          <UserRow key={u._id} u={u} n={i + 1 + skip} />
        ))}
      </AdminTable>

      <AdminPagination
        page={page}
        pages={pages}
        count={count}
        buildHref={(p) => buildUsersHref({ sort, dir, filter: f || undefined, page: p })}
      />
    </AdminPage>
  );
}
