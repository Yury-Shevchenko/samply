import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import ProjectSelector from "@/app/components/ProjectSelector";
import CopyButton from "./CopyButton";
import SecureLinkGenerator from "./SecureLinkGenerator";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Invitations — Samply" };

async function fetchInvitationData(projectId: string, userId: string) {
  await connectDB();
  const project = await Project.findById(projectId, {
    creator: 1,
    members: 1,
    name: 1,
    slug: 1,
    currentlyActive: 1,
  }).lean();
  if (!project) return null;

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    name: string;
    slug: string;
    currentlyActive: boolean;
    _id: { toString(): string };
  };

  const isOwner = p.creator.toString() === userId;
  const isMember = p.members?.some((m) => m.toString() === userId) ?? false;
  if (!isOwner && !isMember) return null;

  return {
    name: p.name,
    slug: p.slug,
    currentlyActive: p.currentlyActive,
    id: p._id.toString(),
  };
}

export default async function InvitationsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { project: projectId } = await searchParams;

  if (projectId) redirect(`/dashboard/${projectId}/invitations`);

  const { projects } = await fetchUserProjects(session.user.id);

  const selectorProjects = projects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);
  const data = selectedId ? await fetchInvitationData(selectedId, session.user.id) : null;

  return (
    <div className="inner">
      <h2>{t("legacyInvitations.title")}</h2>

      <ProjectSelector projects={selectorProjects} selectedId={selectedId} label={t("legacyInvitations.studyLabel")} />

      <div className="card">
        {!selectedId || !data ? (
          <p>
            To invite new participants to your study, activate or create a study{" "}
            <a href="/projects">here</a>.
          </p>
        ) : (
          <>
            <p>
              There are three ways to invite participants to your study. In all cases, participants
              must first install the mobile application <em>Samply Research</em> on their smartphone.
              For Android users, the application is available in{" "}
              <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank" rel="noreferrer">
                Google Play
              </a>
              . For Apple users, the application is in{" "}
              <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank" rel="noreferrer">
                App Store
              </a>
              . You can provide participants with these links to Google Play or App Store or ask them
              to search for the <em>Samply Research</em> app in the respective stores.
            </p>
            <p>
              After the application is installed, either provide a participant with 1) a web page
              link, 2) a direct link to your study in the mobile app or 3) instructions how to find
              your study in the list of studies in the mobile app (if your study is public).
            </p>

            <h5>
              <div className="headerLink">{t("legacyInvitations.way1")}</div>
            </h5>
            <table className="table">
              <tbody>
                <tr>
                  <td>{t("legacyInvitations.webLink")}</td>
                  <td>
                    {data.currentlyActive ? (
                      <>
                        <input
                          type="text"
                          id="weblink"
                          readOnly
                          defaultValue={`https://samply.uni-konstanz.de/studies/${data.slug}`}
                        />
                        <CopyButton targetId="weblink" label={t("legacyInvitations.copyLink")} />
                      </>
                    ) : (
                      <p>
                        Please first activate your study <strong>{data.name}</strong> by turning on
                        the toggle switch on the study card{" "}
                        <a href="/projects">here</a>.
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              The web page of your study contains the description of your study, the information about
              the authors and the instructions how participants can take part in the study. A unique QR
              code is used to find a study in the mobile app. Your study does not have to be public for
              the QR code to work.
            </p>

            <h5>
              <div className="headerLink">{t("legacyInvitations.way2")}</div>
            </h5>
            <table className="table">
              <tbody>
                <tr>
                  <td>{t("legacyInvitations.directLink")}</td>
                  <td>
                    <input
                      type="text"
                      id="direct"
                      readOnly
                      defaultValue={`samply://--/study?id=${data.id}`}
                    />
                    <CopyButton targetId="direct" label={t("legacyInvitations.copyLink")} />
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              To use this link, participants should already have the &quot;Samply Research&quot; app
              installed on their mobile phone. Furthermore, they should open this link in their mobile
              phone. When participants open the app for the first time, they must allow notifications
              from the app. Participants will also need to create a new account. The login information
              is stored securely on the Samply server and is only used to authenticate users.
            </p>
            <p>
              After creating an account, participants are automatically redirected to the page of your
              study within the application. When participants click on the &quot;Join the study&quot;
              button, they join your study and allow you to send them notifications.
            </p>
            <p>Note that the direct link will work even if your study is not publicly available in the list of studies.</p>

            <p>
              You can also pass additional variables via the link using the query. For example, if you
              want to create individual links, you can modify the link in the following way. The value
              of the variable <var>code</var>, which you provide inside the link (in this case, it is{" "}
              <kbd>123</kbd>), will be recorded and shown in your participants data.
            </p>
            <table className="table">
              <tbody>
                <tr>
                  <td>{t("legacyInvitations.customLink")}</td>
                  <td>
                    <input
                      type="text"
                      id="custom"
                      defaultValue={`samply://--/study?id=${data.id}&code=123`}
                    />
                    <CopyButton targetId="custom" label={t("legacyInvitations.copyLink")} />
                  </td>
                </tr>
              </tbody>
            </table>

            <h5>
              <div className="headerLink">{t("legacyInvitations.way3")}</div>
            </h5>
            <p>
              If your study is public, participants can find it in the list of public studies within
              the app. To apply for approval of your study for the public list, please submit a
              request{" "}
              <a target="_blank" href="/projects" rel="noreferrer">
                here
              </a>
              . After logging in, participants must switch to the &quot;Studies&quot; tab within the
              app. There they can use the search field to find your study. Please give your
              participants the exact name of your study so that they can find it in the app.
            </p>

            <SecureLinkGenerator projectId={data.id} />
          </>
        )}
      </div>
    </div>
  );
}
