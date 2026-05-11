const FORM_FIELDS = [
  {
    name: "Study name",
    required: true,
    body: "The name of your study. Participants see this name in the app and on the public studies page.",
  },
  {
    name: "Description",
    required: false,
    body: "A brief overview of the study shown to participants in the app and on the public studies page.",
  },
  {
    name: "Consent form",
    required: false,
    body: "Displayed when participants tap 'Join the study'. For human-subjects research this should cover the study's purpose, procedures, risks, data handling, and how to withdraw.",
  },
  {
    name: "Message after joining",
    required: false,
    body: "Shown immediately after successful enrolment. Use it to confirm sign-up and set expectations — for example, when the first notification will arrive.",
  },
  {
    name: "Completion message",
    required: false,
    body: "Displayed when Samply detects that a participant has submitted a survey response. Relevant when you redirect participants to a Samply completion URL.",
  },
];

const WORKSPACE_SECTIONS = [
  {
    title: "Overview",
    body: "The study dashboard: participant count, notification stats, 7-day compliance, and recent activity. This is also where you activate the study.",
  },
  {
    title: "Participants",
    body: "Everyone enrolled — their anonymous Samply ID, enrolment date, assigned group (if any), timezone, and response history.",
  },
  {
    title: "Schedule",
    body: "All notification schedules attached to this study. Add, view, and delete schedules here. Each schedule expands into a per-participant queue of sends.",
  },
  {
    title: "Data",
    body: "Response records submitted through your survey links, with timestamps and participant IDs.",
  },
  {
    title: "Invitations",
    body: "Your join links and QR code. Copy the web link for email or a landing page, or use the deep link to embed in other materials.",
  },
  {
    title: "Settings",
    body: "Study name, description, consent form, enrollment options, and advanced configuration.",
  },
  {
    title: "Approval",
    body: "Request public listing for your study. Required before the study appears on the public studies page.",
  },
  {
    title: "Stream API",
    body: "Configure webhooks to receive participant events in real time. See the Stream API guide for details.",
  },
];

export default function FirstStudyContent() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Step 1 — Create the study</h2>
      <p>
        From the dashboard, click <strong>New study</strong>. You will see a form with the fields below.
        Only <strong>Study name</strong> is required; everything else can be filled in now or edited later from the study Settings tab.
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "yes" : "optional"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Click <strong>Create study</strong>. Samply creates the study and takes you to the study workspace.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Step 2 — Know your workspace</h2>
      <p>
        The study workspace has eight tabs, accessible from the navigation at the top of the study page.
      </p>

      <dl>
        {WORKSPACE_SECTIONS.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Step 3 — Activate the study</h2>
      <p>
        A new study starts with a <strong>Draft</strong> status. While in Draft, the join link landing
        page will refuse new enrolments — participants see a "study not available" message.
      </p>
      <p>
        To open enrolment: go to the study <strong>Overview</strong> tab and click <strong>Activate study</strong>.
        The status changes to <strong>Live</strong>. You can pause enrolment at any time by clicking
        the same button again — the study returns to Draft without losing any data.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Step 4 — Add your first schedule</h2>
      <p>
        An empty study sends nothing. Schedules are what turn it into a running study.
        Head to the <strong>Schedule</strong> tab and click <strong>Add schedule</strong>.
      </p>
      <p>
        Before you build your first schedule, read <a href="/docs/types">The four schedule types</a> —
        choosing the right type for your research design matters more than any other single decision in
        Samply. Once you know which type you need, <a href="/docs/form">Creating a schedule</a> walks
        you through the form field by field.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Step 5 — Invite participants</h2>
      <p>
        Go to <strong>Invitations</strong> and copy the link or QR code that fits your recruitment
        channel. Participants tap the link on a device with the Samply Research app installed and
        are enrolled immediately.
      </p>
      <p>
        Full details — including how codes and groups interact with the join flow — are in{" "}
        <a href="/docs/invite">Inviting participants</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Advanced settings</h3>
      <p>
        The study <strong>Settings</strong> tab also contains optional features you can ignore for a basic
        study: asking participants for a custom code or group at enrolment, event-contingent designs,
        geofence triggers, notification action buttons, and webhooks. Each is off by default and
        documented separately in the Power features and Advanced features sections.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>First-study checklist</h3>
      <ol>
        <li>Study created with a name.</li>
        <li>Consent form filled in.</li>
        <li>At least one schedule added.</li>
        <li>Study activated (status changed from Draft to Live).</li>
        <li>Join link shared with at least one participant.</li>
        <li>First notification received and survey response confirmed.</li>
      </ol>
    </>
  );
}
