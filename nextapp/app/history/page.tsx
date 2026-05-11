import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { fetchHistory } from "@/lib/data/participants";
import ProjectSelector from "@/app/components/ProjectSelector";
import type { IResult } from "@/lib/models/result";

export const metadata = { title: "Notification History — Samply" };

function fmt(date: Date | string | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function eventTimes(result: IResult, status: string) {
  return (result.events ?? [])
    .filter((e) => e.status === status)
    .map((e) => fmt(e.created))
    .join(", ");
}

function HistoryRow({ r, i, skip }: { r: IResult; i: number; skip: number }) {
  return (
    <tr>
      <td>{i + 1 + skip}</td>
      <td>
        <a href={`/history?id=${r.samplyid}`}>{r.samplyid}</a>
      </td>
      <td>{r.batch}</td>
      <td>{r.data?.title}</td>
      <td>{r.data?.message}</td>
      <td>
        {r.data?.url && (
          <a href={r.data.url} target="_blank" rel="noreferrer">
            Link
          </a>
        )}
      </td>
      <td>{eventTimes(r, "sent")}</td>
      <td>{r.data?.expireAt ? fmt(r.data.expireAt) : ""}</td>
      <td>{eventTimes(r, "received-in-app")}</td>
      <td>{eventTimes(r, "tapped")}</td>
      <td>{eventTimes(r, "opened-in-app")}</td>
      <td>{eventTimes(r, "archived")}</td>
      <td>{eventTimes(r, "geofencing-event")}</td>
      <td>{eventTimes(r, "completed")}</td>
      <td>{r.messageId}</td>
      <td>{r.ticket?.status}</td>
      <td>
        {r.ticket?.id && <a href={`/notificationreceipt/${r.ticket.id}`}>Open</a>}
      </td>
    </tr>
  );
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; page?: string; id?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId, page: pageStr, id: participantId } = await searchParams;

  const { projects } = await fetchUserProjects(session.user.id);
  const selectorProjects = projects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);

  const page = Math.max(1, parseInt(pageStr ?? "1") || 1);
  const { history, count, pages, skip } = selectedId
    ? await fetchHistory(selectedId, page, participantId)
    : { history: [], count: 0, pages: 0, skip: 0 };

  const baseHref = (p: number) => {
    const params = new URLSearchParams();
    if (selectedId) params.set("project", selectedId);
    if (participantId) params.set("id", participantId);
    if (p > 1) params.set("page", String(p));
    return `/history?${params.toString()}`;
  };

  return (
    <div className="inner">
      <div className="userTable">
        <h2>
          Notification History
          {participantId ? ` — participant ${participantId}` : ""}
        </h2>

        <ProjectSelector projects={selectorProjects} selectedId={selectedId} label="Study:" />

        {selectedId && (
          <p>
            <a href={`/downloadhistory/${selectedId}`}>⬇ Download CSV</a>
          </p>
        )}

        {!selectedId ? (
          <p>Select a study above to view its notification history.</p>
        ) : history.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <>
            <div className="pagination">
              <div className="pagination__prev">
                {page > 1 && <a href={baseHref(page - 1)}>← Prev</a>}
              </div>
              <div className="pagination__text">
                <p>
                  Page {page} of {pages} — {count} records
                </p>
              </div>
              <div className="pagination__next">
                {page < pages && <a href={baseHref(page + 1)}>Next →</a>}
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <td>№</td>
                    <td>Samply ID</td>
                    <td>Batch</td>
                    <td>Title</td>
                    <td>Message</td>
                    <td>URL</td>
                    <td>Sent</td>
                    <td>Expires</td>
                    <td>Received</td>
                    <td>Tapped</td>
                    <td>Opened</td>
                    <td>Archived</td>
                    <td>Geofence</td>
                    <td>Completed</td>
                    <td>Message ID</td>
                    <td>Status</td>
                    <td>Receipt</td>
                  </tr>
                </thead>
                <tbody>
                  {history.map((r, i) => (
                    <HistoryRow key={String(r._id)} r={r} i={i} skip={skip ?? 0} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <div className="pagination__prev">
                {page > 1 && <a href={baseHref(page - 1)}>← Prev</a>}
              </div>
              <div className="pagination__text">
                <p>
                  Page {page} of {pages} — {count} records
                </p>
              </div>
              <div className="pagination__next">
                {page < pages && <a href={baseHref(page + 1)}>Next →</a>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
