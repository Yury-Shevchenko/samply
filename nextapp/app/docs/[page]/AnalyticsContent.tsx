import type { Locale } from "@/lib/i18n";

export default function AnalyticsContent({ locale: _locale }: { locale: Locale }) {
  // Single-language for now; other locales fall back to English via Next.js.
  return <AnalyticsContentEn />;
}

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <em style={{ color: "var(--ink-40)", fontStyle: "normal", fontSize: "0.92em" }}>
      {children}
    </em>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderLeft: "3px solid var(--coral)",
        borderRadius: "0.6rem",
        padding: "1.2rem 1.6rem",
        margin: "1.6rem 0",
        fontSize: "1.3rem",
        lineHeight: 1.6,
        color: "var(--ink-60)",
      }}
    >
      {children}
    </div>
  );
}

function AnalyticsContentEn() {
  return (
    <>
      <p>
        Open <strong>Analytics</strong> from inside any study to see how the
        study is performing while it&rsquo;s still running — compliance,
        response times, drop-off, and per-participant engagement, all on one
        screen. The panels are designed around documented threats to ESM data
        quality rather than around generic product-analytics templates: each
        chart corresponds to a construct that the methodological literature
        flags as something you should be watching, not exporting a CSV to
        compute after the fact.
      </p>

      <Callout>
        Analytics polls the study every five minutes. Numbers update while
        participants are still answering — you don&rsquo;t need to wait for
        the run to end to see whether something is going wrong.
      </Callout>

      <h2>Why monitor at all?</h2>
      <p>
        Experience-sampling and ecological momentary assessment depend on
        repeated, in-situ self-reports collected over many days. Four findings
        from the literature make real-time monitoring more than a convenience:
      </p>
      <dl>
        <dt>Compliance is high on average — and wildly variable.</dt>
        <dd>
          Across published ESM studies, compliance averages roughly 70–80%,
          but individual studies range from below 50% to above 95%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          The mean is comforting, the spread is not — you cannot assume a
          new study will sit near the average.
        </dd>
        <dt>Attrition is front-loaded.</dt>
        <dd>
          Drop-off is steepest in the first one to three days of the protocol.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Anything you do to retain participants — reminders, contact,
          schedule adjustment — has to happen inside that window.
        </dd>
        <dt>Missed beeps are not random.</dt>
        <dd>
          Symptom severity, time of day, and social context all bias which
          prompts get answered.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Missing-not-at-random is the default case in ESM, not the edge case.
        </dd>
        <dt>Late responses corrupt &ldquo;momentary&rdquo;.</dt>
        <dd>
          A reply that arrives forty minutes after the prompt is a different
          measurement than one that arrives within two.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Without surfacing the latency distribution you can&rsquo;t set, or
          defend, a threshold.
        </dd>
      </dl>

      <h2>Panel 1 — Overview</h2>
      <p>
        Four headline numbers at the top of the page: <strong>Total sent</strong>{" "}
        in the selected window, <strong>response rate</strong>{" "}
        (responded ÷ sent), <strong>mean latency</strong> from prompt to first
        tap, and <strong>active today</strong> (participants who responded at
        least once). Below them, a daily-response-rate time series with a
        7-day rolling mean. Use the day-range selector (1 / 7 / 14 / 30 / 90)
        in the page header to widen or narrow the window — every panel below
        respects that choice.
      </p>
      <p>
        Treat this as the dashboard for the dashboard. If the headline rate is
        healthy and the curve is flat, you probably don&rsquo;t need to drill
        further. If the curve is sloping down, the panels that follow will
        tell you where the loss is coming from.
      </p>

      <h2>Panel 2 — Retention curve</h2>
      <p>
        A line chart by <em>relative</em> study day, not calendar day: each
        participant counts from their own day&nbsp;0. Two series:
      </p>
      <ul>
        <li>
          <strong>Eligible</strong> — participants who have been enrolled long
          enough to <em>reach</em> that relative day. This is the denominator.
        </li>
        <li>
          <strong>Active</strong> — participants who actually responded on or
          before that relative day. This is the numerator.
        </li>
      </ul>
      <p>
        Relative-day alignment is standard in survival analysis but rare in
        ESM tooling.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        It separates the question &ldquo;is my protocol losing people over
        time?&rdquo; from the question &ldquo;has my cohort had time to drop
        off yet?&rdquo; — questions a calendar-day plot conflates and can
        therefore answer wrong.
      </p>
      <p>
        Read the gap between the two lines as your dropout rate at that
        relative day. A widening gap in days 1–3 is the front-loaded attrition
        pattern from the literature.
      </p>

      <h2>Panel 3 — Delivery funnel</h2>
      <p>
        Three stacked stages over the selected window:{" "}
        <strong>sent</strong> → <strong>opened</strong> (tapped) →{" "}
        <strong>completed</strong>. The drop between adjacent stages is
        flagged in coral.
      </p>
      <p>
        The point of the funnel is to decompose &ldquo;non-response&rdquo; into
        two remediations that are often confused:
      </p>
      <dl>
        <dt>Engagement loss · sent → opened.</dt>
        <dd>
          The push went out but the participant didn&rsquo;t tap. Two very
          different things hide inside this drop. <em>Technical:</em>{" "}
          permissions revoked, app uninstalled, battery optimisation, stale
          push token — the notification never surfaced on the device.{" "}
          <em>Behavioural:</em> the notification did surface, but prompt
          fatigue, inopportune timing, or irrelevant content meant the
          participant ignored it. The dashboard cannot separate these from
          server-side data alone — see the note below — so when this stage is
          leaking, work both angles: re-onboard one or two flagged
          participants from Panel 7 to rule out the technical case, then look
          at schedule timing and content.
        </dd>
        <dt>Abandonment · opened → completed.</dt>
        <dd>
          The participant tapped the notification but did not finish the
          survey. Causes are usually the survey itself: too long, too
          intrusive, broken on mobile. Action: shorten or restructure the
          instrument.
        </dd>
      </dl>
      <Callout>
        <strong>Why no &ldquo;Received&rdquo; stage?</strong>{" "}
        Mobile operating systems do not expose push delivery to the
        application — once Samply hands the message to Apple or Google, the
        delivery itself is opaque. The only &ldquo;received&rdquo; signal the
        Samply Research app can write is when the app happens to be open in
        the foreground at arrival time, which is rare in normal use. Surfacing
        that as the delivery stage would understate true delivery dramatically
        and mislead remediation. The funnel therefore reports the three
        signals that are reliable: dispatch, tap, completion.
      </Callout>

      <h2>Panel 4 — Response-time distribution</h2>
      <p>
        A histogram of latencies from prompt to first tap, bucketed
        &lt;&nbsp;5m, 5–15m, 15–30m, 30–60m, 1–2h, 2h+. The panel header shows
        median and the share of responses under 15 minutes — a common
        operational threshold.
      </p>
      <p>
        Stone and colleagues argued that an ESM reply only carries the
        &ldquo;momentary&rdquo; in EMA if it arrives close enough to the
        prompt for the participant&rsquo;s state not to have meaningfully
        shifted.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Different protocols draw the line differently — 5 minutes for
        affective work, 30 minutes for behaviour, sometimes an hour for diary
        designs — so Samply surfaces the distribution rather than imposing a
        single threshold. Use it to set, and to defend, the cut-off you apply
        when you analyse.
      </p>

      <h2>Panel 5 — Hourly response pattern</h2>
      <p>
        Bar chart of response rate by hour-of-day, computed in each
        participant&rsquo;s local timezone, then aggregated. Bars are coloured
        when the rate is above the daily average and grey when below.
      </p>
      <p>
        Time-of-day compliance is a documented source of diurnal selection
        bias: if response rate sags in the evening, your evening sample is
        biased toward whatever predicts being available in the evening.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Use this panel to spot hours where the sampling protocol effectively
        breaks down, and either adjust the schedule window or weight the
        analysis accordingly.
      </p>

      <h2>Panel 6 — Schedule performance</h2>
      <p>
        One row per notification schedule defined in the study, showing{" "}
        <strong>sent</strong>, <strong>opened</strong>, and{" "}
        <strong>compliance</strong>. A row tagged{" "}
        <em>(untracked schedule)</em> aggregates results that were sent before
        Samply began attributing each Result document to its originating
        schedule — those rows have no config link and are bucketed together.
      </p>
      <p>
        Comparing fixed vs. random vs. event-contingent schedules within a
        single study is one of the few places where the literature is
        unambiguous about what to look at.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Use this panel to identify schedules that under-perform the others —
        a debriefing schedule at the end of the study, for example, will
        often sit far below your daily ones — and to decide whether the
        difference reflects participant burden, content, or timing.
      </p>

      <h2>Panel 7 — Participant compliance</h2>
      <p>
        A sortable, filterable table of every active participant, with{" "}
        <strong>sent</strong>, <strong>opened</strong>,{" "}
        <strong>compliance %</strong>, and <strong>last active</strong>. Rows
        below the configurable threshold (default 60%) are flagged in coral.
      </p>
      <p>
        Group means hide the participants who actually need intervention. A
        study averaging 73% can perfectly well contain participants at 20%
        whose data is unreliable, and participants at 95% who are carrying
        the average — collapsing them produces a single number that is
        unactionable.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Use this table to send targeted reminders, decide which participants
        to drop from the analytic sample, or simply to know who to contact
        before the dropout becomes permanent.
      </p>

      <h2>What this dashboard does <em>not</em> do</h2>
      <p>
        Four honest limitations, listed up front because they shape how you
        should read every panel above:
      </p>
      <dl>
        <dt>Response time, yes. Response content validity, no.</dt>
        <dd>
          Careless responding, straight-lining, and inattentive answers are
          not detected. Those checks remain on the analyst.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Beeps are weighted equally.</dt>
        <dd>
          A one-minute morning ping and a ten-minute end-of-day diary count
          the same in the compliance numerator. Whether to weight by
          participant burden, survey length, or design intent remains an open
          methodological question.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>No inferential MNAR test.</dt>
        <dd>
          The dashboard surfaces what is missing and when it went missing,
          but missing-not-at-random must still be handled analytically. The
          field lacks a consensus method.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Threshold defaults encode a position.</dt>
        <dd>
          The 60% low-compliance threshold is a methodological choice, not a
          natural constant. It&rsquo;s configurable per study, but the default
          still shapes what you notice — read it as a starting point, not a
          rule.
        </dd>
      </dl>

      <h2>Drill-down &amp; export</h2>
      <p>
        Click any participant row in Panel 7 to jump to that participant&rsquo;s
        result history. For analyses that need the raw timestamps and event
        log, use the <strong>Export CSV</strong> action from the History tab —
        every aggregation in Analytics is reproducible from that dump in your
        own statistical environment.
      </p>

      <h2>References cited above</h2>
      <ul style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.7 }}>
        <li>Csikszentmihalyi, M., &amp; Larson, R. (1987). Validity and reliability of the experience-sampling method. <em>Journal of Nervous and Mental Disease</em>, 175(9), 526–536.</li>
        <li>Eisele, G., Vachon, H., Lafit, G., et&nbsp;al. (2022). The effects of sampling frequency and questionnaire length on perceived burden, compliance, and careless responding in experience sampling data in a student population. <em>Assessment</em>, 29(2), 136–151.</li>
        <li>Jones, A., Remmerswaal, D., Verveer, I., et&nbsp;al. (2019). Compliance with ecological momentary assessment protocols in substance users: A meta-analysis. <em>Addiction</em>, 114(4), 609–619.</li>
        <li>Meade, A. W., &amp; Craig, S. B. (2012). Identifying careless responses in survey data. <em>Psychological Methods</em>, 17(3), 437–455.</li>
        <li>Myin-Germeys, I., Kasanova, Z., Vaessen, T., et&nbsp;al. (2018). Experience sampling methodology in mental health research: New insights and technical developments. <em>World Psychiatry</em>, 17(2), 123–132.</li>
        <li>Rintala, A., Wampers, M., Myin-Germeys, I., &amp; Viechtbauer, W. (2020). Momentary measurement of social-network compliance in experience sampling. <em>Psychological Assessment</em>, 32(1), 81–90.</li>
        <li>Schafer, J. L., &amp; Graham, J. W. (2002). Missing data: Our view of the state of the art. <em>Psychological Methods</em>, 7(2), 147–177.</li>
        <li>Shiffman, S., Stone, A. A., &amp; Hufford, M. R. (2008). Ecological momentary assessment. <em>Annual Review of Clinical Psychology</em>, 4, 1–32.</li>
        <li>Silvia, P. J., Kwapil, T. R., Walsh, M. A., &amp; Myin-Germeys, I. (2014). Planned missing-data designs in experience-sampling research. <em>Behavior Research Methods</em>, 46(1), 41–54.</li>
        <li>Smyth, J. M., Ottenbreit-Leftwich, A., et&nbsp;al. (1998). Stressors and mood measured on a momentary basis are associated with salivary cortisol secretion. <em>Psychoneuroendocrinology</em>, 23(4), 353–370.</li>
        <li>Sokolovsky, A. W., Mermelstein, R. J., &amp; Hedeker, D. (2014). Factors predicting compliance to ecological momentary assessment among adolescent smokers. <em>Nicotine &amp; Tobacco Research</em>, 16(3), 351–358.</li>
        <li>Stone, A. A., Shiffman, S., Schwartz, J. E., et&nbsp;al. (2003). Patient compliance with paper and electronic diaries. <em>Controlled Clinical Trials</em>, 24(2), 182–199.</li>
        <li>Trull, T. J., &amp; Ebner-Priemer, U. (2014). The role of ambulatory assessment in psychological science. <em>Current Directions in Psychological Science</em>, 23(6), 466–470.</li>
        <li>Vachon, H., Viechtbauer, W., Rintala, A., &amp; Myin-Germeys, I. (2019). Compliance and retention with the experience sampling method over the continuum of severe mental disorders. <em>Journal of Medical Internet Research</em>, 21(12), e14475.</li>
        <li>van Berkel, N., Ferreira, D., &amp; Kostakos, V. (2017). The experience sampling method on mobile devices. <em>ACM Computing Surveys</em>, 50(6), 1–40.</li>
        <li>Wen, C. K. F., Schneider, S., Stone, A. A., &amp; Spruijt-Metz, D. (2017). Compliance with mobile ecological momentary assessment protocols in children and adolescents: A systematic review and meta-analysis. <em>Journal of Medical Internet Research</em>, 19(4), e132.</li>
      </ul>
    </>
  );
}
