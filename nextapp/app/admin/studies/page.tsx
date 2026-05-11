import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminStudies } from "@/lib/data/admin";
import { deleteStudyAction, toggleStudyPublicAction } from "./actions";
import type { AdminProject } from "@/lib/data/admin";
import { AdminPage, AdminTable, TD_STYLE, TD_MONO, fmt, truncate } from "../shared";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";

export const metadata = { title: "Admin: Studies — Samply" };

function PublicToggle({ p }: { p: AdminProject }) {
  const toggleAction = toggleStudyPublicAction.bind(null, p._id);
  return (
    <form action={toggleAction} style={{ margin: 0 }}>
      <button
        type="submit"
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.04em",
          background: p.public ? "rgba(61,115,107,.12)" : "var(--ink-10)",
          color: p.public ? "var(--sage)" : "var(--ink-40)",
        }}
        title={p.public ? "Click to make private" : "Click to make public"}
      >
        {p.public ? "public" : "private"}
      </button>
    </form>
  );
}

function ApprovalBadge({ requested }: { requested?: boolean }) {
  if (!requested) return <span style={{ color: "var(--ink-20)" }}>—</span>;
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 999,
        background: "rgba(214,90,48,.1)",
        color: "var(--coral)",
      }}
    >
      requested
    </span>
  );
}

function StudyRow({ p, i }: { p: AdminProject; i: number }) {
  const deleteAction = deleteStudyAction.bind(null, p._id);

  return (
    <tr style={{ borderBottom: "1px solid var(--ink-10)" }}>
      <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
        <ConfirmDeleteButton
          action={deleteAction}
          message={`Delete study "${p.name}" and all its data? This cannot be undone.`}
        />
      </td>
      <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{i + 1}</td>
      <td style={{ ...TD_STYLE, color: "var(--ink)", fontWeight: 500, maxWidth: 180 }}>
        <a
          href={`/admin/studies/${p._id}`}
          style={{ color: "inherit", textDecoration: "none" }}
          className="hover:opacity-70"
        >
          {p.name}
        </a>
      </td>
      <td style={TD_MONO}>{p.slug ?? "—"}</td>
      <td style={{ ...TD_STYLE, maxWidth: 200 }}>{truncate(p.description)}</td>
      <td style={{ ...TD_STYLE }}>{fmt(p.created)}</td>
      <td style={{ ...TD_STYLE, maxWidth: 140 }}>{p.author_name[0] ?? "—"}</td>
      <td style={{ ...TD_STYLE, maxWidth: 140 }}>{p.author_institute[0] ?? "—"}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.memberCount}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.participantCount}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>
        {p.enableGeofencing ? (
          <span style={{ fontSize: 10.5, color: "var(--sage)", fontWeight: 600 }}>geo</span>
        ) : (
          <span style={{ color: "var(--ink-20)" }}>—</span>
        )}
      </td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>
        {p.currentlyActive ? (
          <span style={{ fontSize: 10.5, color: "var(--sage)", fontWeight: 600 }}>● live</span>
        ) : (
          <span style={{ color: "var(--ink-20)" }}>—</span>
        )}
      </td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>
        <ApprovalBadge requested={p.requestedForApproval} />
      </td>
      <td style={{ ...TD_STYLE }}>
        <PublicToggle p={p} />
      </td>
    </tr>
  );
}

type FilterKey = "active" | "public" | "pending" | "";

function buildStudiesHref(params: { sort?: string; dir?: string; filter?: string }) {
  const qs = Object.entries(params)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return `/admin/studies${qs ? `?${qs}` : ""}`;
}

export default async function AdminStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; dir?: string; filter?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { sort = "created", dir = "asc", filter = "" } = await searchParams;
  const allProjects = await fetchAdminStudies(sort, dir);

  const active = allProjects.filter((p) => p.currentlyActive).length;
  const publicCount = allProjects.filter((p) => p.public).length;
  const pendingApproval = allProjects.filter((p) => p.requestedForApproval && !p.public).length;

  const f = filter as FilterKey;
  const projects = f === "active"  ? allProjects.filter((p) => p.currentlyActive)
    : f === "public"               ? allProjects.filter((p) => p.public)
    : f === "pending"              ? allProjects.filter((p) => p.requestedForApproval && !p.public)
    : allProjects;

  const chips: { label: string; value: number; color: string; key: FilterKey }[] = [
    { label: "active",          value: active,         color: "var(--sage)",   key: "active" },
    { label: "public",          value: publicCount,    color: "var(--ink-60)", key: "public" },
    { label: "pending approval",value: pendingApproval,color: "var(--coral)",  key: "pending" },
  ];

  return (
    <AdminPage title="Studies" count={projects.length}>

      {/* Summary stat chips — clickable filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {chips.map(({ label, value, color, key }) => {
          const isActive = f === key;
          return (
            <a
              key={key}
              href={buildStudiesHref({ sort, dir, filter: isActive ? "" : key })}
              style={{
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 999,
                textDecoration: "none",
                background: isActive ? color : "var(--surface)",
                border: isActive ? `1px solid ${color}` : "1px solid var(--ink-10)",
                color: isActive ? "#fff" : color,
                fontWeight: isActive ? 600 : 400,
                transition: "all .12s",
              }}
            >
              <strong>{value}</strong> {label}
            </a>
          );
        })}
        {f && (
          <a
            href={buildStudiesHref({ sort, dir })}
            style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, textDecoration: "none", color: "var(--ink-40)", border: "1px solid var(--ink-10)" }}
          >
            × clear filter
          </a>
        )}
      </div>

      {pendingApproval > 0 && !f && (
        <div
          style={{
            background: "rgba(214,90,48,.08)",
            border: "1px solid rgba(214,90,48,.2)",
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: 13,
            color: "var(--coral)",
            marginBottom: 20,
          }}
        >
          {pendingApproval} {pendingApproval === 1 ? "study has" : "studies have"} requested public approval — toggle to approve.
        </div>
      )}

      <AdminTable
        headers={[
          "", "#",
          { label: "Name", sort: "name" },
          "Slug", "Description",
          { label: "Created", sort: "created" },
          "Author", "Institute",
          { label: "Members", sort: "memberCount" },
          { label: "Participants", sort: "participantCount" },
          "Geo",
          { label: "Active", sort: "currentlyActive" },
          "Approval",
          { label: "Public", sort: "public" },
        ]}
        sort={sort}
        dir={dir}
        buildSortHref={(field, nextDir) => buildStudiesHref({ sort: field, dir: nextDir, filter: f || undefined })}
      >
        {projects.map((p, i) => (
          <StudyRow key={p._id} p={p} i={i} />
        ))}
      </AdminTable>
    </AdminPage>
  );
}
