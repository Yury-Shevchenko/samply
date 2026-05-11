import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import { fetchParticipants } from "@/lib/data/participants";
import ProjectSelector from "@/app/components/ProjectSelector";
import type { MobileUser } from "@/lib/data/participants";

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
      <td>
        <a href={`/history?id=${person.id}`}>{person.id}</a>
      </td>
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
      <td>
        <a href={`/history?id=${person.id}`}>Open</a>
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
        <h2>Participants</h2>

        <ProjectSelector
          projects={selectorProjects}
          selectedId={selectedId}
          label="Study:"
        />

        {!selectedId ? (
          <p>Select a study above to view its participants.</p>
        ) : participants.length === 0 ? (
          <p>No participants yet.</p>
        ) : (
          <div className="card">
            <div className="users">
              <table className="table">
                <thead>
                  <tr>
                    <td>№</td>
                    <td>Status</td>
                    <td>Samply ID</td>
                    <td>Token</td>
                    <td>Date</td>
                    <td>Code</td>
                    <td>Group</td>
                    <td>Time preferences</td>
                    <td>Timezone</td>
                    <td>Payout</td>
                    <td>History</td>
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
