import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import ProjectSelector from "@/app/components/ProjectSelector";
import { createGroupAction, deleteGroupAction } from "./actions";

export const metadata = { title: "Groups — Samply" };

interface MobileUser {
  id: string;
  username?: string;
  group?: { id: string; name?: string };
  deactivated?: boolean;
}

interface Group {
  id: string;
  name: string;
}

async function fetchGroupsData(projectId: string, userId: string) {
  await connectDB();
  const project = await Project.findById(projectId, { creator: 1, members: 1, mobileUsers: 1 }).lean();
  if (!project) return null;

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: MobileUser[];
  };

  const isOwner = p.creator.toString() === userId;
  const isMember = p.members?.some((m) => m.toString() === userId) ?? false;
  if (!isOwner && !isMember) return null;

  const users: MobileUser[] = p.mobileUsers ?? [];

  const groupMap = new Map<string, string>();
  for (const u of users) {
    if (u.group?.id && !groupMap.has(u.group.id)) {
      groupMap.set(u.group.id, u.group.name ?? u.group.id);
    }
  }
  const groups: Group[] = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));

  return { users, groups };
}

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId } = await searchParams;
  const { projects } = await fetchUserProjects(session.user.id);

  const selectorProjects = projects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);
  const data = selectedId ? await fetchGroupsData(selectedId, session.user.id) : null;

  const createWithProject = createGroupAction.bind(null);
  const deleteWithProject = deleteGroupAction.bind(null);

  return (
    <div className="inner">
      <div className="userTable">
        <h2>Groups</h2>

        <ProjectSelector projects={selectorProjects} selectedId={selectedId} label="Study:" />

        {!selectedId ? (
          <p>Create a new study first.</p>
        ) : !data ? (
          <p>Study not found.</p>
        ) : (
          <>
            {data.groups.length > 0 && (
              <div className="card">
                <div className="users">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>№</td>
                        <td>Group Name</td>
                        <td>Group ID</td>
                        <td>Members</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.groups.map((group, i) => (
                        <tr key={group.id}>
                          <td>{i + 1}</td>
                          <td>{group.name}</td>
                          <td>{group.id}</td>
                          <td>
                            {data.users
                              .filter((u) => u.group?.id === group.id)
                              .map((u) => (
                                <div key={u.id}>
                                  {u.username && <strong>{u.username} </strong>}
                                  {u.id}
                                </div>
                              ))}
                          </td>
                          <td>
                            <form action={deleteWithProject}>
                              <input type="hidden" name="projectId" value={selectedId} />
                              <input type="hidden" name="groupId" value={group.id} />
                              <input className="button" type="submit" value="Delete" />
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <h2>Add a new group</h2>

            <form action={createWithProject}>
              <input type="hidden" name="projectId" value={selectedId} />
              <h6>Group Name</h6>
              <input type="text" name="groupName" required />
              <p />
              <h6>Select participants</h6>
              {data.users.filter((u) => !u.group).length === 0 ? (
                <p>No participants left without group.</p>
              ) : (
                data.users
                  .filter((u) => !u.group)
                  .map((u) => (
                    <div key={u.id} className="tag tag__choice">
                      <input
                        type="checkbox"
                        id={`p-${u.id}`}
                        value={u.id}
                        name="participants"
                      />
                      <label htmlFor={`p-${u.id}`} className="tagLabel">
                        {u.username && <strong>{u.username} </strong>}
                        {u.id}
                      </label>
                    </div>
                  ))
              )}
              <p />
              <input className="button" type="submit" value="Create group" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
