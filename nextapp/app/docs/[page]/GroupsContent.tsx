export default function GroupsContent() {
  return (
    <>
      <p>
        A group is a named subset of participants within a study. Each participant can belong
        to at most one group at a time. Groups let you send different notification schedules
        to different cohorts — an intervention arm, a control arm, a pilot cohort — without
        creating separate studies.
      </p>

      {/* ── Group anatomy ─────────────────────────────────────────────────── */}
      <h2>What a group contains</h2>
      <p>
        Every group has two fields: a <strong>name</strong> (researcher-defined, not shown to
        participants) and an <strong>ID</strong> (a four-character code generated automatically
        by Samply, used in the <code>%GROUP_ID%</code> URL placeholder and in the scheduled
        queue). The name is for your reference in the dashboard; the ID is what gets embedded
        in survey links.
      </p>
      <p>
        Group IDs are stable: if you delete a group and recreate it with the same name, Samply
        reuses the original ID. This means old survey responses that captured the ID via
        <code>%GROUP_ID%</code> will still match the new group in analysis.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2>Creating a group</h2>
      <p>There are two ways to create a group and assign participants to it.</p>

      <h3>Researcher assignment (dashboard)</h3>
      <p>
        Go to your study and open the <strong>Groups</strong> tab. Enter a group name and
        select participants from the list. Only participants who are not already in a group
        appear in the list — Samply enforces one group per participant.
      </p>
      <p>
        Click <strong>Create group</strong>. Samply assigns all selected participants to the
        new group simultaneously. The group appears in the table with its auto-generated ID
        and the member list.
      </p>

      <h3>Participant self-assignment (at enrolment)</h3>
      <p>
        Enable <strong>Ask for group at enrolment</strong> in <em>Edit study</em>. When this
        is on, the Samply Research app prompts the participant to enter a group name after
        scanning the QR code or following the invite link. If the name matches an existing
        group, they are added to it. If it does not match, Samply creates a new group with
        that name and assigns them as its first member.
      </p>
      <p>
        This is useful for self-sorted cohorts — for example, when participants self-identify
        as belonging to a condition or site — but it requires participants to enter the name
        exactly as intended. For controlled assignment, use the dashboard instead.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2>Deleting a group</h2>
      <p>
        Click <strong>Delete</strong> on the group card in the Groups tab. This removes the
        group assignment from every member — the participants remain in the study and continue
        receiving any non-group-targeted notifications. Their group field is simply cleared,
        making them eligible to be added to a new group.
      </p>
      <p>
        Deleting a group does not cancel pending notifications that were already scheduled
        for that group. Cancel those from the <a href='/docs/queue'>queue</a> if needed.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2>Targeting groups in a schedule</h2>
      <p>
        In Step 2 (Participants) of the schedule form, choose <strong>Groups</strong> as the
        audience. You can target all groups or select specific ones. Only participants assigned
        to the chosen group(s) at the moment you click <strong>Schedule notifications</strong>
        receive sends from that schedule.
      </p>
      <p>
        Participants added to a group after a schedule is submitted are not automatically
        enrolled in it. To include late-assigned participants, delete and recreate the schedule
        after updating group membership — or use a separate one-time schedule targeting those
        individuals directly.
      </p>

      {/* ── Groups and personal schedules ─────────────────────────────────── */}
      <h2>Groups and personal schedules</h2>
      <p>
        Personal schedules (Day N after registration) use each participant&apos;s own join
        date as the anchor. When a personal schedule targets a group, Samply uses the
        join date of the <em>most recently enrolled</em> member of the group as the anchor
        for all group members. This means every member of the group shares the same Day 1,
        even if they joined at different times.
      </p>
      <p>
        This behaviour is intentional for cohort studies where all members of a group should
        move through the protocol in lockstep from a single reference date (such as when the
        last member joined). If you need each member on their own personal timeline, target
        them individually rather than as a group.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2>Passing the group to your survey tool</h2>
      <p>
        Add <code>%GROUP_ID%</code> to your notification Web Link to include the participant
        group in every survey URL automatically. Samply substitutes the four-character group
        ID at send time.
      </p>
      <p>
        If the participant has no group assigned, <code>%GROUP_ID%</code> is left unreplaced
        — your survey tool receives the literal string. Handle this gracefully in your survey
        logic if group membership is not guaranteed for all participants.
      </p>
      <p>
        See <a href='/docs/placeholders'>URL placeholders</a> for the full list of available
        tokens and how substitution works.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2>Groups vs participant codes</h2>
      <dl>
        <dt>Use groups when</dt>
        <dd>
          You want to send different schedules to different subsets, or route participants
          to different survey conditions. Groups are first-class citizens in the schedule
          form and affect which notifications each participant receives.
        </dd>
        <dt>Use participant codes when</dt>
        <dd>
          You need to match Samply participants to records in an external system (REDCap
          record IDs, institutional IDs, pre-assigned codes). Codes are per-person identifiers,
          not grouping mechanisms. A participant can have both a code and a group.
        </dd>
      </dl>
    </>
  );
}
