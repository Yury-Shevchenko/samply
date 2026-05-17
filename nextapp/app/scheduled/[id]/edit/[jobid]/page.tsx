import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAgendaJobById } from "@/lib/data/scheduled";
import { updateAgendaJobAction } from "@/app/scheduled/actions";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Edit Job — Samply" };

export default async function EditJobPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; jobid: string }>;
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { id: notificationConfigId, jobid } = await params;
  const { project: projectId } = await searchParams;

  const job = await fetchAgendaJobById(jobid);
  if (!job) redirect(`/scheduled/${notificationConfigId}${projectId ? `?project=${projectId}` : ""}`);

  const backHref = `/scheduled/${notificationConfigId}${projectId ? `?project=${projectId}` : ""}`;
  const action = updateAgendaJobAction.bind(null, jobid);

  function fmt(d?: Date | string) {
    if (!d) return "";
    const date = new Date(d);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  return (
    <div className="inner">
      <p>
        <a href={backHref}>{t("scheduled.editJobBack")}</a>
      </p>

      <div className="card">
        <h2>{t("scheduled.editJobTitle")}</h2>

        <table className="table" style={{ marginBottom: "1.5rem" }}>
          <tbody>
            <tr>
              <td><strong>{t("scheduled.editJobType")}</strong></td>
              <td>{String(job.name)}</td>
            </tr>
            <tr>
              <td><strong>{t("scheduled.editJobRepeatInterval")}</strong></td>
              <td>{String(job.repeatInterval ?? "—")}</td>
            </tr>
            <tr>
              <td><strong>{t("scheduled.editJobUserId")}</strong></td>
              <td>{String(job.data?.userid ?? "—")}</td>
            </tr>
            <tr>
              <td><strong>{t("scheduled.editJobGroupId")}</strong></td>
              <td>{String(job.data?.groupid ?? "—")}</td>
            </tr>
            <tr>
              <td><strong>{t("scheduled.editJobLastRun")}</strong></td>
              <td>{job.lastRunAt ? new Date(job.lastRunAt).toLocaleString() : "—"}</td>
            </tr>
          </tbody>
        </table>

        <form action={action}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="nextRunAt">
              <strong>{t("scheduled.editJobNextRunAt")}</strong>
            </label>
            <br />
            <input
              id="nextRunAt"
              type="datetime-local"
              name="nextRunAt"
              defaultValue={fmt(job.nextRunAt)}
              style={{ marginTop: "0.25rem" }}
            />
          </div>

          <SubmitButton pendingLabel={t("scheduled.editJobSaving")} className="button">
            {t("scheduled.editJobSave")}
          </SubmitButton>
          {" "}
          <a href={backHref}>{t("scheduled.editJobCancel")}</a>
        </form>
      </div>
    </div>
  );
}
