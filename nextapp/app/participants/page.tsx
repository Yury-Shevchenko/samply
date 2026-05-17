import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import ProjectSelector from "@/app/components/ProjectSelector";
import type { MobileUser } from "@/lib/data/participants";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Participants — Samply" };

function ParticipantRow({ person, i }: { person: MobileUser; i: number }) {
  const hasToken = person.token?.startsWith("ExponentPushToken");
  const info = person.information
    ? Object.entries(person.information)
        .filter(([k]) => k !== "id" && k !== "timezone")
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")
    : "";
  const timezone = person.information?.timezone as string | undefined;

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{person.deactivated ? "⚫" : "🟢"}</td>
      <td>{person.id}</td>
      <td>{hasToken ? "Ok" : person.token ? "—" : ""}</td>
      <td>
        {person.created
          ? new Date(person.created).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </td>
      <td>{person.username ?? ""}</td>
      <td>{person.group?.name ?? ""}</td>
      <td>{info}</td>
      <td>{timezone ?? ""}</td>
      <td>
        <a href={`/payout/${person.id}`}>Open</a>
      </td>
    </tr>
  );
}

export default async function ParticipantsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { project: projectId } = await searchParams;
  const { projects } = await fetchUserProjects(session.user.id);

  const selectorProjects = projects.map((p) => ({
    _id: String(p._id),
    name: p.name,
  }));

  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);
  const participants = selectedId ? await fetchParticipants(selectedId) : [];

  return (
    <div className="inner">
      <div className="userTable">
        <h2>{t("legacyParticipants.title")}</h2>

        <ProjectSelector
          projects={selectorProjects}
          selectedId={selectedId}
          label={t("legacyParticipants.studyLabel")}
        />

        {!selectedId ? (
          <p>{t("legacyParticipants.selectStudy")}</p>
        ) : participants.length === 0 ? (
          <p>{t("legacyParticipants.noParticipants")}</p>
        ) : (
          <div className="card">
            <div className="users">
              <table className="table">
                <thead>
                  <tr>
                    <td>№</td>
                    <td>{t("legacyParticipants.colStatus")}</td>
                    <td>{t("legacyParticipants.colSamplyId")}</td>
                    <td>{t("legacyParticipants.colToken")}</td>
                    <td>{t("legacyParticipants.colDate")}</td>
                    <td>{t("legacyParticipants.colCode")}</td>
                    <td>{t("legacyParticipants.colGroup")}</td>
                    <td>{t("legacyParticipants.colPrefs")}</td>
                    <td>{t("legacyParticipants.colTimezone")}</td>
                    <td>{t("legacyParticipants.colPayout")}</td>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, i) => (
                    <ParticipantRow key={p.id} person={p} i={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
