import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminStudies } from "@/lib/data/admin";
import { deleteStudyAction, toggleStudyPublicAction } from "../../actions";
import type { AdminProject } from "@/lib/data/admin";
import { AdminPage, AdminTable, AdminPagination, TD_STYLE, TD_MONO, fmt, truncate } from "../../../shared";
import { ConfirmDeleteButton } from "../../../ConfirmDeleteButton";

export const metadata = { title: "Admin: Studies — Samply" };

function PublicToggle({ p }: { p: AdminProject }) {
  const toggleAction = toggleStudyPublicAction.bind(null, p._id);
  return (
    <form action={toggleAction} style={{ margin: 0 }}>
      <button type="submit" style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, border: "none", cursor: "pointer", letterSpacing: "0.04em", background: p.public ? "rgba(61,115,107,.12)" : "var(--ink-10)", color: p.public ? "var(--sage)" : "var(--ink-40)" }} title={p.public ? "Click to make private" : "Click to make public"}>
        {p.public ? "public" : "private"}
      </button>
    </form>
  );
}

function StudyRow({ p, i }: { p: AdminProject; i: number }) {
  const deleteAction = deleteStudyAction.bind(null, p._id);
  return (
    <tr style={{ borderBottom: "1px solid var(--ink-10)" }}>
      <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
        <ConfirmDeleteButton action={deleteAction} message={`Delete study "${p.name}" and all its data? This cannot be undone.`} />
      </td>
      <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{i + 1}</td>
      <td style={{ ...TD_STYLE, color: "var(--ink)", fontWeight: 500, maxWidth: 180 }}>
        <a href={`/admin/studies/${p._id}`} style={{ color: "inherit", textDecoration: "none" }} className="hover:opacity-70">{p.name}</a>
      </td>
      <td style={TD_MONO}>{p.slug ?? "—"}</td>
      <td style={{ ...TD_STYLE, maxWidth: 200 }}>{truncate(p.description)}</td>
      <td style={{ ...TD_STYLE }}>{fmt(p.created)}</td>
      <td style={{ ...TD_STYLE, maxWidth: 140 }}>{p.author_name[0] ?? "—"}</td>
      <td style={{ ...TD_STYLE, maxWidth: 140 }}>{p.author_institute[0] ?? "—"}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.memberCount}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.participantCount}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.enableGeofencing ? <span style={{ fontSize: 10.5, color: "var(--sage)", fontWeight: 600 }}>geo</span> : <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.currentlyActive ? <span style={{ fontSize: 10.5, color: "var(--sage)", fontWeight: 600 }}>● live</span> : <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
      <td style={{ ...TD_STYLE, textAlign: "center" }}>{p.requestedForApproval ? <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(214,90,48,.1)", color: "var(--coral)" }}>requested</span> : <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
      <td style={{ ...TD_STYLE }}><PublicToggle p={p} /></td>
    </tr>
  );
}

type FilterKey = "active" | "public" | "pending" | "";

function buildStudiesHref(params: { sort?: string; dir?: string; filter?: string; q?: string; page?: number }) {
  const { page, ...rest } = params;
  const qs = Object.entries(rest)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  if (page && page > 1) return `/admin/studies/page/${page}${qs ? `?${qs}` : ""}`;
  return `/admin/studies${qs ? `?${qs}` : ""}`;
}

export default async function AdminStudiesPageN({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ sort?: string; dir?: string; filter?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const { sort = "created", dir = "desc", filter = "", q = "" } = await searchParams;
  const { projects, count, pages, skip } = await fetchAdminStudies(sort, dir, page, q);

  const f = filter as FilterKey;
  const filtered = f === "active"  ? projects.filter((p) => p.currentlyActive)
    : f === "public"               ? projects.filter((p) => p.public)
    : f === "pending"              ? projects.filter((p) => p.requestedForApproval && !p.public)
    : projects;

  return (
    <AdminPage title="Studies" count={count}>
      <form method="get" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {sort !== "created" && <input type="hidden" name="sort" value={sort} />}
        {dir !== "asc"      && <input type="hidden" name="dir"  value={dir} />}
        {f                  && <input type="hidden" name="filter" value={f} />}
        <input name="q" defaultValue={q} placeholder="Search by name, slug, description, author…" autoComplete="off" style={{ flex: 1, maxWidth: 400, padding: "6px 12px", fontSize: 13, border: "1px solid var(--ink-20)", borderRadius: 8, background: "var(--surface)", color: "var(--ink)", outline: "none", fontFamily: "var(--font-mono)" }} />
        <button type="submit" style={{ padding: "6px 16px", fontSize: 13, border: "1px solid var(--ink-20)", borderRadius: 8, background: "var(--surface)", color: "var(--ink-60)", cursor: "pointer" }}>Search</button>
        {q && <a href={buildStudiesHref({ sort, dir, filter: f || undefined })} style={{ padding: "6px 12px", fontSize: 13, color: "var(--ink-40)", textDecoration: "none", display: "flex", alignItems: "center" }}>× clear</a>}
      </form>

      <AdminTable
        headers={["", "#", { label: "Name", sort: "name" }, "Slug", "Description", { label: "Created", sort: "created" }, "Author", "Institute", { label: "Members", sort: "memberCount" }, { label: "Participants", sort: "participantCount" }, "Geo", { label: "Active", sort: "currentlyActive" }, "Approval", { label: "Public", sort: "public" }]}
        sort={sort}
        dir={dir}
        buildSortHref={(field, nextDir) => buildStudiesHref({ sort: field, dir: nextDir, filter: f || undefined, q: q || undefined })}
      >
        {filtered.map((p, i) => (
          <StudyRow key={p._id} p={p} i={i + skip} />
        ))}
      </AdminTable>

      <AdminPagination
        page={page}
        pages={pages}
        count={count}
        buildHref={(p) => buildStudiesHref({ sort, dir, filter: f || undefined, q: q || undefined, page: p })}
      />
    </AdminPage>
  );
}
