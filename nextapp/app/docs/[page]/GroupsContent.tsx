export default function GroupsContent() {
  return (
    <>
      <p>
        A group is a named subset of participants who receive notifications in lockstep.
        When a schedule targets a group, Samply fires the notification to every member at the
        same moment — a <strong>yoked design</strong>. This makes groups suitable for dyadic
        studies (couples, peers), team research, or any protocol where within-group
        synchronisation is essential. Each participant belongs to at most one group.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Creating a group</h2>
      <p>
        Groups must be created by the researcher before scheduling. Go to your study, open
        the <strong>Participants</strong> tab, and click <strong>Manage groups</strong>. Enter
        a group name and select participants from the list — only participants not already in
        a group appear. Click <strong>Create group</strong> to assign all selected participants
        at once.
      </p>
      <p>
        Samply generates a short <strong>ID</strong> for each group automatically. This ID
        is used in the <code>%GROUP_ID%</code> URL placeholder and in the scheduled queue.
        The name is visible only to researchers in the dashboard; participants never see it.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Yoked timing</h2>
      <p>
        All members of a group receive the same notification at the same fire time. Samply
        writes one queue row per group at a shared <em>Scheduled for</em> timestamp and
        delivers it to every member simultaneously. There is no per-member offset within a
        group send.
      </p>
      <p>
        For personal schedules (Day N after registration), Samply uses the join date of the{' '}
        <em>most recently enrolled</em> group member as the shared anchor. This means every
        member shares the same Day 1 regardless of when they individually joined —
        intentional for cohort designs where you want the group to move through the protocol
        together from a single reference date. If you need each participant on their own
        personal timeline, target them individually rather than as a group.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Targeting groups in a schedule</h2>
      <p>
        In Step 2 (Participants) of the schedule form, choose <strong>Groups</strong> as the
        audience and select which group or groups to target. Only participants assigned to
        the chosen group(s) at the moment you click <strong>Schedule notifications</strong>{' '}
        receive sends from that schedule. Participants who join the group later are included
        in subsequent sends — the group membership is re-evaluated at each fire time.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Deleting a group</h2>
      <p>
        Click <strong>Delete</strong> on the group row in the Groups tab. This clears the
        group assignment from every member — participants remain in the study and continue
        receiving any non-group-targeted notifications. They become eligible to be added to
        a new group.
      </p>
      <p>
        Deleting a group removes the group assignment from every member. Pending notifications
        targeted at that group will not be delivered — at fire time, participants are no longer
        members of the group, so they are skipped.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Passing the group to your survey tool</h2>
      <p>
        Add <code>%GROUP_ID%</code> to your notification Web Link to include each
        participant's group in the survey URL automatically. Samply substitutes the
        four-character group ID at send time. If a participant has no group,{' '}
        <code>%GROUP_ID%</code> is left unreplaced — your survey tool receives the literal
        string, so handle this in your survey logic if group membership is not guaranteed
        for all participants.
      </p>
      <p>
        See <a href='/docs/placeholders'>URL placeholders</a> for the full list of available
        tokens and how substitution works.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Groups vs participant codes</h2>
      <dl>
        <dt>Use groups when</dt>
        <dd>
          You want yoked, synchronised sends to a cohort, or need to route different subsets
          to different notification schedules. Groups are first-class citizens in the schedule
          form and determine who receives which notifications.
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
