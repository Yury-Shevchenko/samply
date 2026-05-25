import type { Locale } from "@/lib/i18n";

export default function AnalyticsContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <AnalyticsContentDe />;
  if (locale === "fr") return <AnalyticsContentFr />;
  if (locale === "es") return <AnalyticsContentEs />;
  if (locale === "it") return <AnalyticsContentIt />;
  if (locale === "pt") return <AnalyticsContentPt />;
  if (locale === "nl") return <AnalyticsContentNl />;
  if (locale === "ru") return <AnalyticsContentRu />;
  if (locale === "pl") return <AnalyticsContentPl />;
  if (locale === "tr") return <AnalyticsContentTr />;
  if (locale === "zh") return <AnalyticsContentZh />;
  if (locale === "ko") return <AnalyticsContentKo />;
  if (locale === "ja") return <AnalyticsContentJa />;
  if (locale === "ar") return <AnalyticsContentAr />;
  return <AnalyticsContentEn />;
}

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <em style={{ color: "var(--ink-40)", fontStyle: "normal", fontSize: "0.92em" }}>
      {children}
    </em>
  );
}

function References() {
  return (
    <ul style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.7 }}>
      <li>Csikszentmihalyi, M., &amp; Larson, R. (1987). Validity and reliability of the experience-sampling method. <em>Journal of Nervous and Mental Disease</em>, 175(9), 526–536.</li>
      <li>Eisele, G., Vachon, H., Lafit, G., et&nbsp;al. (2022). The effects of sampling frequency and questionnaire length on perceived burden, compliance, and careless responding in experience sampling data in a student population. <em>Assessment</em>, 29(2), 136–151.</li>
      <li>Jones, A., Remmerswaal, D., Verveer, I., et&nbsp;al. (2019). Compliance with ecological momentary assessment protocols in substance users: A meta-analysis. <em>Addiction</em>, 114(4), 609–619.</li>
      <li>Meade, A. W., &amp; Craig, S. B. (2012). Identifying careless responses in survey data. <em>Psychological Methods</em>, 17(3), 437–455.</li>
      <li>Myin-Germeys, I., Kasanova, Z., Vaessen, T., et&nbsp;al. (2018). Experience sampling methodology in mental health research. <em>World Psychiatry</em>, 17(2), 123–132.</li>
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
      <li>Wen, C. K. F., Schneider, S., Stone, A. A., &amp; Spruijt-Metz, D. (2017). Compliance with mobile ecological momentary assessment protocols in children and adolescents. <em>Journal of Medical Internet Research</em>, 19(4), e132.</li>
    </ul>
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
        Open <strong>Analytics</strong>{" "}from inside any study to see how the
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
      <References />
    </>
  );
}

function AnalyticsContentDe() {
  return (
    <>
      <p>
        Öffnen Sie <strong>Analytics</strong>{" "}innerhalb einer beliebigen
        Studie, um zu sehen, wie die Studie läuft, während sie noch in Gang
        ist — Compliance, Antwortzeiten, Abbruch und Engagement pro
        Teilnehmenden, alles auf einer Seite. Die Panels orientieren sich an
        dokumentierten Bedrohungen für die ESM-Datenqualität, nicht an
        generischen Produktanalyse-Vorlagen: Jede Grafik entspricht einem
        Konstrukt, das die methodische Literatur als beobachtungswürdig
        einstuft — nicht etwas, das man im Nachhinein per CSV-Export berechnen
        sollte.
      </p>

      <Callout>
        Analytics fragt die Studie alle fünf Minuten ab. Die Zahlen
        aktualisieren sich, während Teilnehmende noch antworten — Sie müssen
        nicht warten, bis die Erhebung endet, um zu erkennen, ob etwas
        schiefläuft.
      </Callout>

      <h2>Warum überhaupt überwachen?</h2>
      <p>
        Experience Sampling (ESM) und Ecological Momentary Assessment (EMA)
        beruhen auf wiederholten Selbstauskünften im Alltag über viele Tage
        hinweg. Vier Befunde aus der Literatur machen Echtzeit-Monitoring zu
        mehr als einer Bequemlichkeit:
      </p>
      <dl>
        <dt>Compliance ist im Mittel hoch — und stark variabel.</dt>
        <dd>
          In publizierten ESM-Studien liegt Compliance im Mittel bei etwa
          70–80&nbsp;%, einzelne Studien aber zwischen unter 50&nbsp;% und
          über 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          Der Mittelwert ist beruhigend, die Streuung ist es nicht — Sie
          können nicht davon ausgehen, dass eine neue Studie nah am
          Durchschnitt liegt.
        </dd>
        <dt>Drop-out tritt früh auf.</dt>
        <dd>
          Der Abfall ist in den ersten ein bis drei Tagen am steilsten.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Alles, was Sie zur Bindung tun — Erinnerungen, Kontakt,
          Anpassung des Zeitplans — muss in diesem Fenster geschehen.
        </dd>
        <dt>Verpasste Signale sind nicht zufällig.</dt>
        <dd>
          Symptomschwere, Tageszeit und sozialer Kontext beeinflussen, welche
          Prompts beantwortet werden.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Missing-not-at-random ist in ESM der Regelfall, nicht der Sonderfall.
        </dd>
        <dt>Späte Antworten untergraben das „Momentane".</dt>
        <dd>
          Eine Antwort, die vierzig Minuten nach dem Prompt eintrifft, ist
          eine andere Messung als eine, die innerhalb von zwei Minuten kommt.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Ohne sichtbare Latenzverteilung können Sie keinen Schwellenwert
          setzen oder verteidigen.
        </dd>
      </dl>

      <h2>Panel 1 — Übersicht</h2>
      <p>
        Vier Kennzahlen oben auf der Seite: <strong>Gesamt gesendet</strong>{" "}
        im gewählten Zeitfenster, <strong>Antwortrate</strong>{" "}
        (beantwortet ÷ gesendet), <strong>mittlere Latenz</strong> vom Prompt
        bis zum ersten Tap und <strong>heute aktiv</strong> (Teilnehmende,
        die mindestens einmal geantwortet haben). Darunter eine
        Zeitreihe der täglichen Antwortrate mit einem rollenden
        7-Tage-Mittelwert. Mit dem Tagesbereichs-Schalter (1 / 7 / 14 / 30 /
        90) im Seitenkopf erweitern oder verkleinern Sie das Fenster — alle
        nachfolgenden Panels berücksichtigen diese Wahl.
      </p>
      <p>
        Verstehen Sie dies als das Dashboard für das Dashboard. Wenn die
        Hauptrate gesund und die Kurve flach ist, müssen Sie wahrscheinlich
        nicht tiefer einsteigen. Fällt die Kurve, sagen Ihnen die folgenden
        Panels, woher der Verlust kommt.
      </p>

      <h2>Panel 2 — Retentionskurve</h2>
      <p>
        Ein Liniendiagramm nach <em>relativem</em> Studientag, nicht nach
        Kalendertag: Jede teilnehmende Person zählt ab ihrem eigenen
        Tag&nbsp;0. Zwei Reihen:
      </p>
      <ul>
        <li>
          <strong>Eligibel</strong> — Teilnehmende, die lange genug
          eingeschrieben sind, um diesen relativen Tag zu <em>erreichen</em>.
          Das ist der Nenner.
        </li>
        <li>
          <strong>Aktiv</strong> — Teilnehmende, die an diesem relativen Tag
          oder davor tatsächlich geantwortet haben. Das ist der Zähler.
        </li>
      </ul>
      <p>
        Relative-Tag-Ausrichtung ist in der Survival-Analyse Standard, in
        ESM-Tools selten.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Sie trennt die Frage „Verliert mein Protokoll Personen im Lauf der
        Zeit?" von der Frage „Hatte meine Kohorte überhaupt Zeit
        abzuspringen?" — Fragen, die ein Kalendertag-Plot vermischt und
        daher falsch beantworten kann.
      </p>
      <p>
        Lesen Sie den Abstand zwischen den beiden Linien als Ihre Abbruchrate
        am jeweiligen relativen Tag. Eine wachsende Lücke an den Tagen 1–3
        ist das aus der Literatur bekannte Muster früher Attrition.
      </p>

      <h2>Panel 3 — Zustellungsfunnel</h2>
      <p>
        Drei gestapelte Stufen im gewählten Zeitfenster:{" "}
        <strong>gesendet</strong> → <strong>geöffnet</strong> (getappt) →{" "}
        <strong>abgeschlossen</strong>. Der Verlust zwischen benachbarten
        Stufen ist in Coral hervorgehoben.
      </p>
      <p>
        Sinn des Funnels ist, „Nicht-Antwort" in zwei Abhilfemaßnahmen zu
        zerlegen, die häufig verwechselt werden:
      </p>
      <dl>
        <dt>Engagement-Verlust · gesendet → geöffnet.</dt>
        <dd>
          Der Push ging raus, aber die teilnehmende Person hat nicht
          getappt. Zwei sehr unterschiedliche Dinge verbergen sich in diesem
          Verlust. <em>Technisch:</em> entzogene Berechtigungen,
          deinstallierte App, Akkuoptimierung, veraltetes Push-Token — die
          Benachrichtigung erschien nie auf dem Gerät.{" "}
          <em>Verhaltensbezogen:</em> die Benachrichtigung erschien zwar,
          aber Prompt-Müdigkeit, ungünstige Zeit oder irrelevanter Inhalt
          führten dazu, dass sie ignoriert wurde. Das Dashboard kann diese
          beiden Fälle aus serverseitigen Daten allein nicht trennen — siehe
          Hinweis unten — wenn diese Stufe also leckt, arbeiten Sie an
          beiden Seiten: ein bis zwei in Panel 7 markierte Personen neu
          onboarden, um den technischen Fall auszuschließen, dann
          Zeitsteuerung und Inhalt prüfen.
        </dd>
        <dt>Abbruch · geöffnet → abgeschlossen.</dt>
        <dd>
          Die Person hat die Benachrichtigung getappt, aber den Fragebogen
          nicht beendet. Ursachen liegen meist im Instrument selbst: zu
          lang, zu aufdringlich, mobil defekt. Maßnahme: Instrument kürzen
          oder umstrukturieren.
        </dd>
      </dl>
      <Callout>
        <strong>Warum keine „Empfangen"-Stufe?</strong>{" "}
        Mobile Betriebssysteme legen Push-Zustellung nicht offen — sobald
        Samply die Nachricht an Apple oder Google übergibt, ist die
        Zustellung selbst opak. Das einzige „empfangen"-Signal, das die
        Samply-Research-App schreiben kann, ist, wenn die App zum Zeitpunkt
        des Eintreffens zufällig im Vordergrund offen ist — was im normalen
        Gebrauch selten vorkommt. Dies als Zustellstufe darzustellen würde
        die wahre Zustellung drastisch unterschätzen und Abhilfen
        fehlleiten. Der Funnel berichtet daher die drei Signale, die
        verlässlich sind: Versand, Tap, Abschluss.
      </Callout>

      <h2>Panel 4 — Reaktionszeit-Verteilung</h2>
      <p>
        Ein Histogramm der Latenzen vom Prompt bis zum ersten Tap, in
        Klassen &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min,
        30–60&nbsp;min, 1–2&nbsp;h, 2&nbsp;h+. Der Panel-Header zeigt den
        Median und den Anteil der Antworten unter 15 Minuten — ein gängiger
        operationaler Schwellenwert.
      </p>
      <p>
        Stone und Kolleg:innen argumentierten, dass eine ESM-Antwort das
        „Momentane" in EMA nur dann trägt, wenn sie nahe genug am Prompt
        eintrifft, sodass sich der Zustand der Person nicht maßgeblich
        verschoben hat.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Verschiedene Protokolle ziehen die Linie unterschiedlich — 5 Minuten
        für affektive Arbeit, 30 Minuten für Verhalten, manchmal eine Stunde
        für Tagebuchdesigns — daher zeigt Samply die Verteilung an, statt
        einen einzelnen Schwellenwert vorzugeben. Nutzen Sie sie, um die
        Grenze festzulegen und zu verteidigen, die Sie bei der Analyse
        anwenden.
      </p>

      <h2>Panel 5 — Stündliches Antwortmuster</h2>
      <p>
        Balkendiagramm der Antwortrate nach Tagesstunde, berechnet in der
        jeweiligen lokalen Zeitzone und dann aggregiert. Balken sind farbig,
        wenn die Rate über dem Tagesdurchschnitt liegt, und grau, wenn
        darunter.
      </p>
      <p>
        Compliance nach Tageszeit ist eine dokumentierte Quelle täglicher
        Selektionsverzerrung: Wenn die Rate am Abend sinkt, ist Ihre
        Abendstichprobe in Richtung dessen verzerrt, was Verfügbarkeit am
        Abend prädiziert.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Nutzen Sie dieses Panel, um Stunden zu erkennen, in denen das
        Sampling effektiv zusammenbricht, und passen Sie entweder das
        Zeitfenster an oder gewichten Sie die Analyse entsprechend.
      </p>

      <h2>Panel 6 — Schedule-Performance</h2>
      <p>
        Eine Zeile pro definiertem Schedule in der Studie, mit{" "}
        <strong>gesendet</strong>, <strong>geöffnet</strong> und{" "}
        <strong>Compliance</strong>. Eine Zeile mit{" "}
        <em>(nicht zugeordneter Schedule)</em> aggregiert Ergebnisse, die
        gesendet wurden, bevor Samply jede Result-Dokument seinem
        ursprünglichen Schedule zuwies — diese Zeilen haben keinen
        Konfig-Link und werden zusammen gefasst.
      </p>
      <p>
        Der Vergleich von fixen, zufälligen und ereigniskontingenten
        Schedules innerhalb einer Studie ist eine der wenigen Stellen, an
        der die Literatur eindeutig ist.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Nutzen Sie dieses Panel, um Schedules zu erkennen, die unter den
        anderen liegen — ein Debriefing-Schedule am Studienende etwa wird
        oft deutlich unter den täglichen liegen — und um zu entscheiden, ob
        der Unterschied auf Teilnehmerbelastung, Inhalt oder Zeit
        zurückgeht.
      </p>

      <h2>Panel 7 — Teilnehmenden-Compliance</h2>
      <p>
        Eine sortier- und filterbare Tabelle aller aktiven Teilnehmenden mit{" "}
        <strong>gesendet</strong>, <strong>geöffnet</strong>,{" "}
        <strong>Compliance&nbsp;%</strong> und <strong>zuletzt aktiv</strong>.
        Zeilen unterhalb des konfigurierbaren Schwellenwerts (Standard
        60&nbsp;%) sind in Coral hervorgehoben.
      </p>
      <p>
        Gruppenmittelwerte verbergen die Personen, die wirklich Intervention
        brauchen. Eine Studie mit 73&nbsp;% Mittel kann sehr wohl
        Teilnehmende bei 20&nbsp;% enthalten, deren Daten unzuverlässig
        sind, und Teilnehmende bei 95&nbsp;%, die den Mittelwert tragen —
        eine Zusammenfassung erzeugt eine einzelne, nicht handlungsleitende
        Zahl.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Nutzen Sie diese Tabelle, um gezielte Erinnerungen zu senden, zu
        entscheiden, welche Personen aus der Analysestichprobe ausgeschlossen
        werden, oder einfach zu wissen, wen Sie kontaktieren sollten, bevor
        der Abbruch dauerhaft wird.
      </p>

      <h2>Was dieses Dashboard <em>nicht</em> leistet</h2>
      <p>
        Vier ehrliche Einschränkungen, vorab benannt, weil sie prägen, wie
        Sie jedes Panel oben lesen sollten:
      </p>
      <dl>
        <dt>Reaktionszeit ja, inhaltliche Antwortvalidität nein.</dt>
        <dd>
          Nachlässiges Antworten, Straight-Lining und unaufmerksame Antworten
          werden nicht erkannt. Diese Prüfungen bleiben Sache der
          Analysierenden.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Signale werden gleich gewichtet.</dt>
        <dd>
          Ein einminütiger Morgenping und ein zehnminütiges Tagebuch am
          Abend zählen im Compliance-Zähler gleich. Ob nach Belastung,
          Fragebogenlänge oder Designabsicht gewichtet werden sollte, ist
          eine offene methodische Frage.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Kein inferentieller MNAR-Test.</dt>
        <dd>
          Das Dashboard zeigt, was fehlt und wann es verloren ging, aber
          Missing-not-at-random muss weiterhin analytisch behandelt werden.
          Es gibt im Feld keinen Konsens.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Schwellenwert-Standards kodieren eine Position.</dt>
        <dd>
          Der 60&nbsp;%-Schwellenwert für niedrige Compliance ist eine
          methodische Wahl, keine Naturkonstante. Er ist pro Studie
          konfigurierbar, aber der Standard prägt dennoch, was Ihnen
          auffällt — verstehen Sie ihn als Ausgangspunkt, nicht als Regel.
        </dd>
      </dl>

      <h2>Drill-down &amp; Export</h2>
      <p>
        Klicken Sie auf eine Teilnehmer-Zeile in Panel 7, um zur
        Antworthistorie dieser Person zu springen. Für Analysen, die
        Rohzeitstempel und Ereignisprotokoll benötigen, nutzen Sie die
        Aktion <strong>CSV exportieren</strong> im Tab Verlauf — jede
        Aggregation in Analytics lässt sich aus diesem Dump in Ihrer eigenen
        statistischen Umgebung reproduzieren.
      </p>

      <h2>Zitierte Literatur</h2>
      <References />
    </>
  );
}

function AnalyticsContentFr() {
  return (
    <>
      <p>
        Ouvrez <strong>Analytics</strong>{" "}depuis n&rsquo;importe quelle
        étude pour voir comment elle se déroule pendant qu&rsquo;elle est
        encore en cours — conformité, temps de réponse, abandons et
        engagement par participant·e, le tout sur un seul écran. Les panneaux
        sont conçus autour de menaces documentées pour la qualité des données
        ESM plutôt qu&rsquo;autour de modèles génériques d&rsquo;analytique
        produit&nbsp;: chaque graphique correspond à un construit que la
        littérature méthodologique signale comme à surveiller, et non comme
        quelque chose à calculer après coup à partir d&rsquo;un export CSV.
      </p>

      <Callout>
        Analytics interroge l&rsquo;étude toutes les cinq minutes. Les
        chiffres se mettent à jour pendant que les participant·es répondent
        encore — vous n&rsquo;avez pas besoin d&rsquo;attendre la fin de la
        collecte pour voir si quelque chose ne va pas.
      </Callout>

      <h2>Pourquoi surveiller ?</h2>
      <p>
        L&rsquo;échantillonnage d&rsquo;expérience (ESM) et l&rsquo;évaluation
        écologique momentanée (EMA) reposent sur des auto-rapports répétés,
        in situ, recueillis sur plusieurs jours. Quatre résultats de la
        littérature font du monitoring en temps réel plus qu&rsquo;un confort :
      </p>
      <dl>
        <dt>La conformité est élevée en moyenne — et extrêmement variable.</dt>
        <dd>
          Dans les études ESM publiées, la conformité moyenne se situe autour
          de 70–80&nbsp;%, mais les études individuelles vont de moins de
          50&nbsp;% à plus de 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017 ; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          La moyenne rassure, la dispersion non — vous ne pouvez pas supposer
          qu&rsquo;une nouvelle étude se situera près de la moyenne.
        </dd>
        <dt>L&rsquo;attrition est concentrée au début.</dt>
        <dd>
          La chute est la plus forte dans les un à trois premiers jours du
          protocole.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Tout ce que vous ferez pour retenir les participant·es — rappels,
          contact, ajustement du calendrier — doit se produire dans cette
          fenêtre.
        </dd>
        <dt>Les bips manqués ne sont pas aléatoires.</dt>
        <dd>
          La sévérité des symptômes, l&rsquo;heure de la journée et le
          contexte social biaisent tous quels prompts obtiennent une réponse.{" "}
          <Ref>Vachon et al., 2019 ; Sokolovsky et al., 2014.</Ref>{" "}
          Les données manquantes-non-aléatoires (MNAR) sont le cas par défaut
          en ESM, pas l&rsquo;exception.
        </dd>
        <dt>Les réponses tardives corrompent le « momentané ».</dt>
        <dd>
          Une réponse qui arrive quarante minutes après le prompt est une
          mesure différente d&rsquo;une qui arrive dans les deux minutes.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Sans visualisation de la distribution des latences, vous ne pouvez
          ni fixer ni défendre un seuil.
        </dd>
      </dl>

      <h2>Panneau 1 — Vue d&rsquo;ensemble</h2>
      <p>
        Quatre chiffres clés en haut de la page : <strong>Total envoyé</strong>{" "}
        dans la fenêtre sélectionnée, <strong>taux de réponse</strong>{" "}
        (répondus ÷ envoyés), <strong>latence moyenne</strong> du prompt au
        premier tap, et <strong>actifs aujourd&rsquo;hui</strong>{" "}
        (participant·es ayant répondu au moins une fois). En dessous, une
        série temporelle du taux de réponse quotidien avec une moyenne mobile
        sur 7 jours. Utilisez le sélecteur de période (1 / 7 / 14 / 30 / 90)
        dans l&rsquo;en-tête pour élargir ou rétrécir la fenêtre — tous les
        panneaux ci-dessous respectent ce choix.
      </p>
      <p>
        Considérez-le comme le tableau de bord du tableau de bord. Si le taux
        global est sain et la courbe plate, vous n&rsquo;avez probablement
        pas besoin de creuser plus loin. Si la courbe descend, les panneaux
        suivants vous diront d&rsquo;où vient la perte.
      </p>

      <h2>Panneau 2 — Courbe de rétention</h2>
      <p>
        Un graphique linéaire par jour <em>relatif</em> de l&rsquo;étude, pas
        par jour calendaire : chaque participant·e compte à partir de son
        propre jour&nbsp;0. Deux séries :
      </p>
      <ul>
        <li>
          <strong>Éligibles</strong> — participant·es inscrit·es depuis
          assez longtemps pour <em>atteindre</em> ce jour relatif.
          C&rsquo;est le dénominateur.
        </li>
        <li>
          <strong>Actifs</strong> — participant·es ayant effectivement
          répondu à ce jour relatif ou avant. C&rsquo;est le numérateur.
        </li>
      </ul>
      <p>
        L&rsquo;alignement par jour relatif est standard en analyse de
        survie, mais rare dans l&rsquo;outillage ESM.{" "}
        <Ref>Eisele et al., 2022 ; Vachon et al., 2019.</Ref>{" "}
        Il sépare la question « mon protocole perd-il du monde au fil du
        temps ? » de la question « ma cohorte a-t-elle eu le temps de
        décrocher ? » — des questions qu&rsquo;un tracé calendaire confond
        et peut donc mal interpréter.
      </p>
      <p>
        Lisez l&rsquo;écart entre les deux lignes comme votre taux
        d&rsquo;abandon à ce jour relatif. Un écart qui se creuse aux
        jours 1–3 est le schéma d&rsquo;attrition précoce documenté dans la
        littérature.
      </p>

      <h2>Panneau 3 — Entonnoir de livraison</h2>
      <p>
        Trois étapes empilées sur la fenêtre sélectionnée :{" "}
        <strong>envoyé</strong> → <strong>ouvert</strong> (tapé) →{" "}
        <strong>terminé</strong>. La perte entre étapes adjacentes est
        signalée en corail.
      </p>
      <p>
        L&rsquo;intérêt de l&rsquo;entonnoir est de décomposer la
        « non-réponse » en deux remédiations souvent confondues :
      </p>
      <dl>
        <dt>Perte d&rsquo;engagement · envoyé → ouvert.</dt>
        <dd>
          La notification est partie mais la personne n&rsquo;a pas tapé.
          Deux choses très différentes se cachent dans cette perte.{" "}
          <em>Technique :</em> autorisations révoquées, app désinstallée,
          optimisation de batterie, token push obsolète — la notification
          n&rsquo;est jamais apparue sur l&rsquo;appareil.{" "}
          <em>Comportemental :</em> la notification est bien apparue, mais
          fatigue du prompt, moment inopportun ou contenu non pertinent ont
          fait que la personne l&rsquo;a ignorée. Le tableau de bord ne peut
          pas séparer ces cas à partir des seules données serveur — voir la
          note ci-dessous — donc lorsque cette étape fuit, travaillez les
          deux angles : ré-onboardez une ou deux personnes signalées dans le
          panneau 7 pour écarter le cas technique, puis examinez le timing
          et le contenu du calendrier.
        </dd>
        <dt>Abandon · ouvert → terminé.</dt>
        <dd>
          La personne a tapé la notification mais n&rsquo;a pas terminé le
          questionnaire. Les causes sont généralement le questionnaire
          lui-même : trop long, trop intrusif, cassé sur mobile. Action :
          raccourcir ou restructurer l&rsquo;instrument.
        </dd>
      </dl>
      <Callout>
        <strong>Pourquoi pas d&rsquo;étape « Reçu » ?</strong>{" "}
        Les systèmes d&rsquo;exploitation mobiles n&rsquo;exposent pas la
        livraison push à l&rsquo;application — une fois que Samply remet le
        message à Apple ou Google, la livraison elle-même est opaque. Le
        seul signal de « réception » que l&rsquo;application Samply Research
        peut écrire est celui où l&rsquo;app est ouverte au premier plan au
        moment de l&rsquo;arrivée, ce qui est rare en usage normal.
        Présenter cela comme l&rsquo;étape de livraison sous-estimerait
        considérablement la livraison réelle et mènerait à des remédiations
        erronées. L&rsquo;entonnoir rapporte donc les trois signaux
        fiables : envoi, tap, achèvement.
      </Callout>

      <h2>Panneau 4 — Distribution des temps de réponse</h2>
      <p>
        Un histogramme des latences du prompt au premier tap, regroupées en
        &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min, 30–60&nbsp;min,
        1–2&nbsp;h, 2&nbsp;h+. L&rsquo;en-tête du panneau indique la médiane
        et la part des réponses sous 15 minutes — un seuil opérationnel
        courant.
      </p>
      <p>
        Stone et collègues ont soutenu qu&rsquo;une réponse ESM ne porte le
        « momentané » de l&rsquo;EMA que si elle arrive assez près du prompt
        pour que l&rsquo;état de la personne n&rsquo;ait pas
        significativement changé.{" "}
        <Ref>Stone et al., 2003 ; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Différents protocoles tracent la ligne différemment — 5 minutes pour
        l&rsquo;affect, 30 minutes pour le comportement, parfois une heure
        pour les journaux — donc Samply affiche la distribution plutôt que
        d&rsquo;imposer un seuil unique. Utilisez-la pour fixer et défendre
        la coupure que vous appliquerez en analyse.
      </p>

      <h2>Panneau 5 — Pattern de réponse horaire</h2>
      <p>
        Diagramme en barres du taux de réponse par heure de la journée,
        calculé dans le fuseau local de chaque participant·e, puis agrégé.
        Les barres sont colorées lorsque le taux est au-dessus de la moyenne
        quotidienne et grises lorsqu&rsquo;il est en dessous.
      </p>
      <p>
        La conformité par heure de la journée est une source documentée de
        biais de sélection diurne : si le taux de réponse fléchit le soir,
        votre échantillon du soir est biaisé vers ce qui prédit la
        disponibilité en soirée.{" "}
        <Ref>Sokolovsky et al., 2014 ; Smyth et al., 1998.</Ref>{" "}
        Utilisez ce panneau pour repérer les heures où le protocole
        s&rsquo;effondre, et soit ajustez la fenêtre du calendrier, soit
        pondérez l&rsquo;analyse en conséquence.
      </p>

      <h2>Panneau 6 — Performance par calendrier</h2>
      <p>
        Une ligne par calendrier de notification défini dans l&rsquo;étude,
        affichant <strong>envoyés</strong>, <strong>ouverts</strong> et{" "}
        <strong>conformité</strong>. Une ligne marquée{" "}
        <em>(calendrier non rattaché)</em> agrège les résultats envoyés avant
        que Samply ne rattache chaque document Result à son calendrier
        d&rsquo;origine — ces lignes n&rsquo;ont pas de lien de configuration
        et sont regroupées.
      </p>
      <p>
        Comparer les calendriers fixes, aléatoires et contingents à un
        événement au sein d&rsquo;une même étude est l&rsquo;un des rares
        endroits où la littérature est sans ambiguïté.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Utilisez ce panneau pour identifier les calendriers qui
        sous-performent par rapport aux autres — un calendrier de débriefing
        en fin d&rsquo;étude, par exemple, se trouvera souvent loin en
        dessous des calendriers quotidiens — et pour décider si la
        différence reflète la charge des participant·es, le contenu ou le
        timing.
      </p>

      <h2>Panneau 7 — Conformité par participant·e</h2>
      <p>
        Un tableau triable et filtrable de chaque participant·e actif·ve,
        avec <strong>envoyés</strong>, <strong>ouverts</strong>,{" "}
        <strong>conformité&nbsp;%</strong> et <strong>dernière activité</strong>.
        Les lignes sous le seuil configurable (par défaut 60&nbsp;%) sont
        signalées en corail.
      </p>
      <p>
        Les moyennes de groupe cachent les personnes qui ont réellement
        besoin d&rsquo;intervention. Une étude à 73&nbsp;% de moyenne peut
        parfaitement contenir des participant·es à 20&nbsp;% dont les
        données ne sont pas fiables, et des participant·es à 95&nbsp;% qui
        portent la moyenne — les agréger produit un chiffre unique qui
        n&rsquo;est pas actionnable.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Utilisez ce tableau pour envoyer des rappels ciblés, décider quelles
        personnes exclure de l&rsquo;échantillon d&rsquo;analyse, ou
        simplement savoir qui contacter avant que l&rsquo;abandon ne
        devienne définitif.
      </p>

      <h2>Ce que ce tableau de bord ne fait <em>pas</em></h2>
      <p>
        Quatre limites honnêtes, énoncées d&rsquo;emblée car elles
        conditionnent la lecture de chaque panneau ci-dessus :
      </p>
      <dl>
        <dt>Temps de réponse, oui. Validité du contenu, non.</dt>
        <dd>
          Les réponses négligentes, les réponses en ligne droite et les
          réponses inattentives ne sont pas détectées. Ces vérifications
          restent à la charge de l&rsquo;analyste.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Les bips sont pondérés à égalité.</dt>
        <dd>
          Un ping matinal d&rsquo;une minute et un journal de fin de
          journée de dix minutes comptent pareil au numérateur de
          conformité. Pondérer par la charge, la longueur du questionnaire
          ou l&rsquo;intention du design reste une question méthodologique
          ouverte.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Pas de test inférentiel MNAR.</dt>
        <dd>
          Le tableau de bord montre ce qui manque et quand cela a manqué,
          mais le manquant-non-aléatoire (MNAR) doit toujours être traité
          analytiquement. Le champ n&rsquo;a pas de méthode consensuelle.{" "}
          <Ref>Schafer &amp; Graham, 2002 ; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Les seuils par défaut encodent une position.</dt>
        <dd>
          Le seuil de faible conformité à 60&nbsp;% est un choix
          méthodologique, pas une constante naturelle. Il est configurable
          par étude, mais le défaut influence néanmoins ce que vous
          remarquez — lisez-le comme un point de départ, pas comme une
          règle.
        </dd>
      </dl>

      <h2>Drill-down &amp; export</h2>
      <p>
        Cliquez sur une ligne de participant·e dans le panneau 7 pour
        accéder à son historique de réponses. Pour les analyses qui
        nécessitent les horodatages bruts et le journal d&rsquo;événements,
        utilisez l&rsquo;action <strong>Exporter CSV</strong> depuis
        l&rsquo;onglet Historique — chaque agrégation d&rsquo;Analytics est
        reproductible à partir de ce dump dans votre propre environnement
        statistique.
      </p>

      <h2>Références citées</h2>
      <References />
    </>
  );
}

function AnalyticsContentEs() {
  return (
    <>
      <p>
        Abra <strong>Analytics</strong>{" "}desde cualquier estudio para ver
        cómo va el estudio mientras todavía está en marcha — cumplimiento,
        tiempos de respuesta, abandono y compromiso por participante, todo
        en una sola pantalla. Los paneles están diseñados en torno a
        amenazas documentadas a la calidad de datos ESM, no en torno a
        plantillas genéricas de analítica de producto: cada gráfico
        corresponde a un constructo que la literatura metodológica señala
        como algo que debería estar vigilando, no como algo que calcular a
        posteriori desde un CSV exportado.
      </p>

      <Callout>
        Analytics consulta el estudio cada cinco minutos. Los números se
        actualizan mientras los participantes siguen respondiendo — no
        necesita esperar a que termine la recogida para ver si algo va
        mal.
      </Callout>

      <h2>¿Por qué monitorear?</h2>
      <p>
        El muestreo de experiencia (ESM) y la evaluación ecológica momentánea
        (EMA) dependen de autoinformes repetidos in situ recogidos durante
        muchos días. Cuatro hallazgos de la literatura hacen del monitoreo
        en tiempo real algo más que una comodidad:
      </p>
      <dl>
        <dt>El cumplimiento es alto en promedio — y muy variable.</dt>
        <dd>
          En estudios ESM publicados, el cumplimiento promedio se sitúa
          entre 70 y 80&nbsp;%, pero los estudios individuales oscilan
          entre menos del 50&nbsp;% y más del 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          La media tranquiliza, la dispersión no — no puede suponer que un
          estudio nuevo se situará cerca del promedio.
        </dd>
        <dt>El abandono se concentra al principio.</dt>
        <dd>
          La caída es más pronunciada en los primeros uno a tres días del
          protocolo.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Cualquier cosa que haga para retener a los participantes —
          recordatorios, contacto, ajuste de calendario — debe ocurrir
          dentro de esa ventana.
        </dd>
        <dt>Las señales perdidas no son aleatorias.</dt>
        <dd>
          La gravedad de los síntomas, la hora del día y el contexto
          social sesgan qué prompts se responden.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Los datos faltantes no aleatorios (MNAR) son el caso por defecto
          en ESM, no la excepción.
        </dd>
        <dt>Las respuestas tardías corrompen lo «momentáneo».</dt>
        <dd>
          Una respuesta que llega cuarenta minutos después del prompt es
          una medición distinta de una que llega en dos minutos.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Sin visualizar la distribución de latencias no puede fijar ni
          defender un umbral.
        </dd>
      </dl>

      <h2>Panel 1 — Resumen</h2>
      <p>
        Cuatro cifras destacadas en la parte superior de la página:{" "}
        <strong>Total enviado</strong> en la ventana seleccionada,{" "}
        <strong>tasa de respuesta</strong> (respondidos ÷ enviados),{" "}
        <strong>latencia media</strong> del prompt al primer tap, y{" "}
        <strong>activos hoy</strong> (participantes que han respondido al
        menos una vez). Debajo, una serie temporal de la tasa de respuesta
        diaria con una media móvil de 7 días. Use el selector de rango (1 /
        7 / 14 / 30 / 90) en la cabecera para ampliar o reducir la ventana
        — todos los paneles siguientes respetan esa elección.
      </p>
      <p>
        Trátelo como el tablero del tablero. Si la tasa global es saludable
        y la curva es plana, probablemente no necesite profundizar más. Si
        la curva desciende, los paneles siguientes le dirán de dónde viene
        la pérdida.
      </p>

      <h2>Panel 2 — Curva de retención</h2>
      <p>
        Un gráfico de líneas por día <em>relativo</em> del estudio, no por
        día de calendario: cada participante cuenta desde su propio
        día&nbsp;0. Dos series:
      </p>
      <ul>
        <li>
          <strong>Elegibles</strong> — participantes inscritos el tiempo
          suficiente para <em>alcanzar</em> ese día relativo. Este es el
          denominador.
        </li>
        <li>
          <strong>Activos</strong> — participantes que efectivamente
          respondieron en o antes de ese día relativo. Este es el numerador.
        </li>
      </ul>
      <p>
        El alineamiento por día relativo es estándar en análisis de
        supervivencia pero raro en herramientas ESM.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Separa la pregunta «¿está mi protocolo perdiendo gente con el
        tiempo?» de la pregunta «¿ha tenido mi cohorte tiempo para
        abandonar?» — preguntas que un gráfico por día de calendario
        confunde y puede por tanto responder mal.
      </p>
      <p>
        Lea la distancia entre las dos líneas como su tasa de abandono en
        ese día relativo. Una brecha creciente en los días 1–3 es el patrón
        de atrición temprana documentado en la literatura.
      </p>

      <h2>Panel 3 — Embudo de entrega</h2>
      <p>
        Tres etapas apiladas sobre la ventana seleccionada:{" "}
        <strong>enviado</strong> → <strong>abierto</strong> (tapeado) →{" "}
        <strong>completado</strong>. La pérdida entre etapas adyacentes
        está señalada en coral.
      </p>
      <p>
        El propósito del embudo es descomponer la «no-respuesta» en dos
        remediaciones que a menudo se confunden:
      </p>
      <dl>
        <dt>Pérdida de compromiso · enviado → abierto.</dt>
        <dd>
          El push salió pero el participante no tocó. Dos cosas muy
          distintas se esconden en esta pérdida. <em>Técnica:</em> permisos
          revocados, app desinstalada, optimización de batería, token push
          obsoleto — la notificación nunca apareció en el dispositivo.{" "}
          <em>Conductual:</em> la notificación apareció, pero fatiga de
          prompt, momento inoportuno o contenido irrelevante hicieron que
          la persona la ignorase. El tablero no puede separar estos casos
          solo con datos del servidor — véase la nota debajo — así que
          cuando esta etapa pierde, trabaje ambos ángulos: re-onboardear a
          uno o dos participantes señalados en el Panel 7 para descartar
          el caso técnico, luego revisar los tiempos y el contenido del
          calendario.
        </dd>
        <dt>Abandono · abierto → completado.</dt>
        <dd>
          La persona tocó la notificación pero no terminó la encuesta. Las
          causas suelen ser el instrumento mismo: demasiado largo,
          demasiado intrusivo, roto en móvil. Acción: acortar o
          reestructurar el instrumento.
        </dd>
      </dl>
      <Callout>
        <strong>¿Por qué no hay etapa «Recibido»?</strong>{" "}
        Los sistemas operativos móviles no exponen la entrega push a la
        aplicación — una vez que Samply entrega el mensaje a Apple o
        Google, la entrega misma es opaca. La única señal de «recibido»
        que la app Samply Research puede escribir es cuando la app
        casualmente está abierta en primer plano al llegar, algo poco
        común en uso normal. Mostrar eso como la etapa de entrega
        subestimaría drásticamente la entrega real y llevaría a
        remediaciones equivocadas. Por eso el embudo informa las tres
        señales fiables: despacho, tap, finalización.
      </Callout>

      <h2>Panel 4 — Distribución de tiempos de respuesta</h2>
      <p>
        Un histograma de latencias desde el prompt hasta el primer tap,
        agrupadas en &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min,
        30–60&nbsp;min, 1–2&nbsp;h, 2&nbsp;h+. La cabecera del panel
        muestra la mediana y la proporción de respuestas bajo 15 minutos —
        un umbral operacional común.
      </p>
      <p>
        Stone y colegas argumentaron que una respuesta ESM solo lleva lo
        «momentáneo» del EMA si llega lo bastante cerca del prompt para
        que el estado del participante no haya cambiado significativamente.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Distintos protocolos trazan la línea de forma distinta — 5 minutos
        para trabajo afectivo, 30 minutos para conducta, a veces una hora
        para diseños de diario — por eso Samply muestra la distribución en
        lugar de imponer un único umbral. Úsela para fijar y defender el
        corte que aplique al analizar.
      </p>

      <h2>Panel 5 — Patrón de respuesta horaria</h2>
      <p>
        Gráfico de barras de la tasa de respuesta por hora del día,
        calculado en la zona horaria local de cada participante y luego
        agregado. Las barras están coloreadas cuando la tasa está por
        encima del promedio diario y grises cuando está por debajo.
      </p>
      <p>
        El cumplimiento por hora del día es una fuente documentada de
        sesgo de selección diurna: si la tasa de respuesta cae por la
        tarde, su muestra vespertina está sesgada hacia lo que predice
        estar disponible por la tarde.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Use este panel para detectar horas en las que el muestreo se
        rompe, y ajuste la ventana del calendario o pondere el análisis en
        consecuencia.
      </p>

      <h2>Panel 6 — Rendimiento por calendario</h2>
      <p>
        Una fila por calendario de notificación definido en el estudio,
        con <strong>enviados</strong>, <strong>abiertos</strong> y{" "}
        <strong>cumplimiento</strong>. Una fila marcada como{" "}
        <em>(calendario no rastreado)</em> agrega los resultados enviados
        antes de que Samply empezara a atribuir cada documento Result a su
        calendario de origen — esas filas no tienen enlace de
        configuración y se agrupan juntas.
      </p>
      <p>
        Comparar calendarios fijos, aleatorios y contingentes a evento
        dentro de un mismo estudio es uno de los pocos lugares donde la
        literatura es inequívoca.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Use este panel para identificar calendarios que rinden por debajo
        de los demás — un calendario de debriefing al final del estudio,
        por ejemplo, suele estar muy por debajo de los diarios — y para
        decidir si la diferencia refleja carga de participante, contenido
        o tiempo.
      </p>

      <h2>Panel 7 — Cumplimiento por participante</h2>
      <p>
        Una tabla ordenable y filtrable de cada participante activo, con{" "}
        <strong>enviados</strong>, <strong>abiertos</strong>,{" "}
        <strong>cumplimiento&nbsp;%</strong> y{" "}
        <strong>última actividad</strong>. Las filas por debajo del umbral
        configurable (por defecto 60&nbsp;%) están señaladas en coral.
      </p>
      <p>
        Las medias de grupo esconden a los participantes que realmente
        necesitan intervención. Un estudio con media de 73&nbsp;% puede
        contener perfectamente participantes al 20&nbsp;% cuyos datos no
        son fiables, y participantes al 95&nbsp;% que sostienen la media —
        agregarlos produce un único número no accionable.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Use esta tabla para enviar recordatorios específicos, decidir qué
        participantes excluir de la muestra analítica, o simplemente saber
        a quién contactar antes de que el abandono se vuelva permanente.
      </p>

      <h2>Lo que este tablero <em>no</em> hace</h2>
      <p>
        Cuatro limitaciones honestas, declaradas de entrada porque
        determinan cómo debe leer cada panel anterior:
      </p>
      <dl>
        <dt>Tiempo de respuesta, sí. Validez de contenido, no.</dt>
        <dd>
          Respuestas descuidadas, en línea recta o desatentas no se
          detectan. Esas comprobaciones siguen siendo responsabilidad del
          analista.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Las señales se ponderan por igual.</dt>
        <dd>
          Un ping matutino de un minuto y un diario de fin de día de diez
          minutos cuentan lo mismo en el numerador de cumplimiento. Si se
          debe ponderar por carga del participante, longitud del
          cuestionario o intención de diseño sigue siendo una pregunta
          metodológica abierta.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Sin test inferencial MNAR.</dt>
        <dd>
          El tablero muestra lo que falta y cuándo se perdió, pero los
          datos faltantes no aleatorios (MNAR) deben seguir tratándose
          analíticamente. El campo carece de un método de consenso.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Los umbrales por defecto codifican una posición.</dt>
        <dd>
          El umbral de bajo cumplimiento de 60&nbsp;% es una elección
          metodológica, no una constante natural. Es configurable por
          estudio, pero el valor por defecto sigue moldeando lo que usted
          nota — léalo como punto de partida, no como regla.
        </dd>
      </dl>

      <h2>Drill-down y exportación</h2>
      <p>
        Haga clic en cualquier fila de participante en el Panel 7 para
        saltar al historial de respuestas de esa persona. Para análisis
        que necesiten las marcas de tiempo y el registro de eventos en
        crudo, use la acción <strong>Exportar CSV</strong> de la pestaña
        Historial — cada agregación de Analytics es reproducible desde ese
        volcado en su propio entorno estadístico.
      </p>

      <h2>Referencias citadas</h2>
      <References />
    </>
  );
}

function AnalyticsContentIt() {
  return (
    <>
      <p>
        Apri <strong>Analytics</strong>{" "}dall&rsquo;interno di qualsiasi
        studio per vedere come sta andando lo studio mentre è ancora in
        corso — compliance, tempi di risposta, abbandono e engagement per
        partecipante, tutto in un&rsquo;unica schermata. I pannelli sono
        progettati attorno a minacce documentate alla qualità dei dati ESM
        anziché attorno a modelli generici di product analytics: ogni
        grafico corrisponde a un costrutto che la letteratura metodologica
        segnala come qualcosa da tenere d&rsquo;occhio, non da calcolare
        dopo a partire da un CSV.
      </p>

      <Callout>
        Analytics interroga lo studio ogni cinque minuti. I numeri si
        aggiornano mentre i partecipanti stanno ancora rispondendo — non
        serve aspettare la fine della raccolta per accorgersi che qualcosa
        non va.
      </Callout>

      <h2>Perché monitorare?</h2>
      <p>
        Experience sampling (ESM) e ecological momentary assessment (EMA)
        si basano su autorisposte ripetute, in situ, raccolte per molti
        giorni. Quattro risultati dalla letteratura rendono il monitoraggio
        in tempo reale più di una comodità:
      </p>
      <dl>
        <dt>La compliance è alta in media — e fortemente variabile.</dt>
        <dd>
          Negli studi ESM pubblicati, la compliance media è circa il
          70–80&nbsp;%, ma i singoli studi vanno da meno del 50&nbsp;% a
          oltre il 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          La media è rassicurante, la dispersione no — non si può
          presumere che un nuovo studio si collochi vicino alla media.
        </dd>
        <dt>L&rsquo;attrizione è concentrata all&rsquo;inizio.</dt>
        <dd>
          La caduta è più ripida nei primi uno-tre giorni del protocollo.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Qualsiasi cosa per trattenere i partecipanti — promemoria,
          contatto, regolazione del calendario — deve avvenire in quella
          finestra.
        </dd>
        <dt>I segnali mancati non sono casuali.</dt>
        <dd>
          Severità dei sintomi, ora del giorno e contesto sociale
          influenzano quali prompt ottengono risposta.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          I dati mancanti non casuali (MNAR) sono il caso predefinito in
          ESM, non l&rsquo;eccezione.
        </dd>
        <dt>Le risposte tardive corrompono il «momentaneo».</dt>
        <dd>
          Una risposta che arriva quaranta minuti dopo il prompt è una
          misurazione diversa da una che arriva entro due.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Senza mostrare la distribuzione delle latenze non si può
          stabilire né difendere una soglia.
        </dd>
      </dl>

      <h2>Pannello 1 — Panoramica</h2>
      <p>
        Quattro numeri principali in cima alla pagina:{" "}
        <strong>Totale inviati</strong> nella finestra selezionata,{" "}
        <strong>tasso di risposta</strong> (risposti ÷ inviati),{" "}
        <strong>latenza media</strong> dal prompt al primo tap, e{" "}
        <strong>attivi oggi</strong> (partecipanti che hanno risposto
        almeno una volta). Sotto, una serie temporale del tasso di
        risposta giornaliero con media mobile a 7 giorni. Usa il selettore
        di intervallo (1 / 7 / 14 / 30 / 90) nell&rsquo;intestazione per
        allargare o restringere la finestra — tutti i pannelli sottostanti
        rispettano questa scelta.
      </p>
      <p>
        Consideralo la dashboard della dashboard. Se il tasso principale è
        in salute e la curva è piatta, probabilmente non serve scavare
        oltre. Se la curva scende, i pannelli successivi ti diranno da
        dove arriva la perdita.
      </p>

      <h2>Pannello 2 — Curva di retention</h2>
      <p>
        Un grafico a linee per giorno <em>relativo</em> dello studio, non
        per giorno di calendario: ogni partecipante conta dal proprio
        giorno&nbsp;0. Due serie:
      </p>
      <ul>
        <li>
          <strong>Eleggibili</strong> — partecipanti iscritti da
          abbastanza tempo per <em>raggiungere</em> quel giorno relativo.
          È il denominatore.
        </li>
        <li>
          <strong>Attivi</strong> — partecipanti che hanno effettivamente
          risposto in quel giorno relativo o prima. È il numeratore.
        </li>
      </ul>
      <p>
        L&rsquo;allineamento per giorno relativo è standard nell&rsquo;analisi
        di sopravvivenza ma raro negli strumenti ESM.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Separa la domanda «il mio protocollo sta perdendo persone nel
        tempo?» dalla domanda «la mia coorte ha avuto il tempo di
        abbandonare?» — domande che un grafico a giorno calendario
        confonde e può quindi rispondere male.
      </p>
      <p>
        Leggi la distanza tra le due linee come il tuo tasso di abbandono
        in quel giorno relativo. Un divario crescente nei giorni 1–3 è il
        pattern di attrizione precoce documentato in letteratura.
      </p>

      <h2>Pannello 3 — Funnel di consegna</h2>
      <p>
        Tre fasi impilate sulla finestra selezionata:{" "}
        <strong>inviato</strong> → <strong>aperto</strong> (toccato) →{" "}
        <strong>completato</strong>. Il calo tra fasi adiacenti è
        evidenziato in corallo.
      </p>
      <p>
        Lo scopo del funnel è scomporre la «non risposta» in due
        rimedi spesso confusi:
      </p>
      <dl>
        <dt>Perdita di engagement · inviato → aperto.</dt>
        <dd>
          Il push è partito ma il partecipante non ha toccato. In questa
          perdita si nascondono due cose molto diverse. <em>Tecnica:</em>{" "}
          permessi revocati, app disinstallata, ottimizzazione della
          batteria, token push obsoleto — la notifica non è mai apparsa
          sul dispositivo. <em>Comportamentale:</em> la notifica è
          comparsa, ma stanchezza del prompt, momento inopportuno o
          contenuto irrilevante hanno fatto sì che la persona la
          ignorasse. La dashboard non può separare i due casi dai soli
          dati server — vedi la nota sotto — quindi quando questa fase
          perde, lavora su entrambi i fronti: rifare l&rsquo;onboarding di
          uno o due partecipanti segnalati nel Pannello 7 per escludere il
          caso tecnico, poi rivedere tempi e contenuto del calendario.
        </dd>
        <dt>Abbandono · aperto → completato.</dt>
        <dd>
          La persona ha toccato la notifica ma non ha completato il
          questionario. Le cause sono di solito lo strumento stesso:
          troppo lungo, troppo invadente, rotto su mobile. Azione:
          accorciare o ristrutturare lo strumento.
        </dd>
      </dl>
      <Callout>
        <strong>Perché nessuna fase «Ricevuto»?</strong>{" "}
        I sistemi operativi mobili non espongono la consegna push
        all&rsquo;app — una volta che Samply consegna il messaggio ad
        Apple o Google, la consegna stessa è opaca. L&rsquo;unico segnale
        di «ricevuto» che l&rsquo;app Samply Research può scrivere è
        quando l&rsquo;app è aperta in primo piano al momento
        dell&rsquo;arrivo, cosa rara nell&rsquo;uso normale. Mostrare
        questo come fase di consegna sottostimerebbe drasticamente la
        consegna reale e porterebbe a rimedi sbagliati. Il funnel riporta
        quindi i tre segnali affidabili: invio, tap, completamento.
      </Callout>

      <h2>Pannello 4 — Distribuzione dei tempi di risposta</h2>
      <p>
        Un istogramma delle latenze dal prompt al primo tap, raggruppate
        in &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min,
        30–60&nbsp;min, 1–2&nbsp;h, 2&nbsp;h+. L&rsquo;intestazione del
        pannello mostra la mediana e la quota di risposte sotto i 15
        minuti — una soglia operativa comune.
      </p>
      <p>
        Stone e colleghi hanno sostenuto che una risposta ESM porta il
        «momentaneo» dell&rsquo;EMA solo se arriva abbastanza vicino al
        prompt da non aver fatto spostare in modo significativo lo stato
        della persona.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Protocolli diversi tracciano la linea in modo diverso — 5 minuti
        per il lavoro affettivo, 30 minuti per il comportamento, talvolta
        un&rsquo;ora per i diari — quindi Samply mostra la distribuzione
        invece di imporre una soglia unica. Usala per fissare e difendere
        il taglio che applichi in analisi.
      </p>

      <h2>Pannello 5 — Pattern di risposta orario</h2>
      <p>
        Grafico a barre del tasso di risposta per ora del giorno,
        calcolato nel fuso orario locale di ciascun partecipante e poi
        aggregato. Le barre sono colorate quando il tasso supera la media
        giornaliera e grigie quando è sotto.
      </p>
      <p>
        La compliance per ora del giorno è una fonte documentata di bias
        di selezione diurno: se il tasso di risposta cala la sera, il tuo
        campione serale è sbilanciato verso ciò che predice la
        disponibilità di sera.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Usa questo pannello per individuare le ore in cui il
        campionamento si rompe e regola la finestra del calendario o
        pondera l&rsquo;analisi di conseguenza.
      </p>

      <h2>Pannello 6 — Performance per calendario</h2>
      <p>
        Una riga per calendario di notifica definito nello studio, con{" "}
        <strong>inviate</strong>, <strong>aperte</strong> e{" "}
        <strong>compliance</strong>. Una riga etichettata{" "}
        <em>(calendario non tracciato)</em> aggrega i risultati inviati
        prima che Samply iniziasse ad attribuire ogni documento Result al
        calendario d&rsquo;origine — quelle righe non hanno collegamento
        di configurazione e vengono raggruppate.
      </p>
      <p>
        Confrontare calendari fissi, casuali e contingenti a evento
        all&rsquo;interno di uno stesso studio è uno dei pochi punti in
        cui la letteratura è inequivocabile.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Usa questo pannello per individuare i calendari che rendono meno
        degli altri — un calendario di debriefing a fine studio, per
        esempio, sarà spesso ben sotto quelli giornalieri — e per
        decidere se la differenza riflette carico del partecipante,
        contenuto o tempo.
      </p>

      <h2>Pannello 7 — Compliance per partecipante</h2>
      <p>
        Una tabella ordinabile e filtrabile di ogni partecipante attivo,
        con <strong>inviate</strong>, <strong>aperte</strong>,{" "}
        <strong>compliance&nbsp;%</strong> e <strong>ultima attività</strong>.
        Le righe sotto la soglia configurabile (predefinita 60&nbsp;%)
        sono evidenziate in corallo.
      </p>
      <p>
        Le medie di gruppo nascondono i partecipanti che davvero hanno
        bisogno di intervento. Uno studio con media 73&nbsp;% può
        contenere benissimo partecipanti al 20&nbsp;% i cui dati non sono
        affidabili e partecipanti al 95&nbsp;% che reggono la media —
        aggregarli produce un singolo numero non azionabile.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Usa questa tabella per inviare promemoria mirati, decidere quali
        partecipanti escludere dal campione analitico, o semplicemente
        per sapere chi contattare prima che l&rsquo;abbandono diventi
        permanente.
      </p>

      <h2>Cosa questa dashboard <em>non</em> fa</h2>
      <p>
        Quattro limiti onesti, dichiarati subito perché determinano come
        leggere ogni pannello sopra:
      </p>
      <dl>
        <dt>Tempo di risposta sì, validità del contenuto no.</dt>
        <dd>
          Risposte distratte, in linea retta o disattente non vengono
          rilevate. Quelle verifiche restano in capo all&rsquo;analista.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>I segnali sono pesati allo stesso modo.</dt>
        <dd>
          Un ping mattutino di un minuto e un diario serale di dieci
          minuti contano uguale nel numeratore di compliance. Se pesare
          per carico, lunghezza del questionario o intento di design
          rimane una questione metodologica aperta.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Nessun test inferenziale MNAR.</dt>
        <dd>
          La dashboard mostra cosa manca e quando è mancato, ma i dati
          mancanti non casuali (MNAR) devono comunque essere gestiti
          analiticamente. Il campo non ha un metodo di consenso.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Le soglie di default codificano una posizione.</dt>
        <dd>
          La soglia di bassa compliance al 60&nbsp;% è una scelta
          metodologica, non una costante naturale. È configurabile per
          studio, ma il valore di default plasma comunque ciò che noti —
          leggila come punto di partenza, non come regola.
        </dd>
      </dl>

      <h2>Drill-down ed export</h2>
      <p>
        Clicca una riga di partecipante nel Pannello 7 per saltare alla
        cronologia delle sue risposte. Per analisi che richiedono i
        timestamp grezzi e il log degli eventi, usa l&rsquo;azione{" "}
        <strong>Esporta CSV</strong> dalla scheda Cronologia — ogni
        aggregazione in Analytics è riproducibile da quel dump nel tuo
        ambiente statistico.
      </p>

      <h2>Riferimenti citati</h2>
      <References />
    </>
  );
}

function AnalyticsContentPt() {
  return (
    <>
      <p>
        Abra <strong>Analytics</strong>{" "}dentro de qualquer estudo para ver
        como o estudo está indo enquanto ainda está em curso —
        cumprimento, tempos de resposta, abandono e engajamento por
        participante, tudo numa única tela. Os painéis foram desenhados em
        torno de ameaças documentadas à qualidade dos dados ESM, e não em
        torno de modelos genéricos de analytics de produto: cada gráfico
        corresponde a um construto que a literatura metodológica sinaliza
        como algo a ser monitorado, não algo a calcular depois a partir de
        um CSV exportado.
      </p>

      <Callout>
        Analytics consulta o estudo a cada cinco minutos. Os números são
        atualizados enquanto os participantes ainda respondem — não é
        preciso esperar o fim da coleta para perceber se algo está dando
        errado.
      </Callout>

      <h2>Por que monitorar?</h2>
      <p>
        Amostragem de experiência (ESM) e avaliação ecológica momentânea
        (EMA) dependem de autorrelatos repetidos in situ coletados ao
        longo de muitos dias. Quatro achados da literatura tornam o
        monitoramento em tempo real mais do que conveniência:
      </p>
      <dl>
        <dt>O cumprimento é alto em média — e altamente variável.</dt>
        <dd>
          Em estudos ESM publicados, o cumprimento médio fica em torno de
          70–80&nbsp;%, mas estudos individuais variam de menos de
          50&nbsp;% a mais de 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          A média conforta, a dispersão não — não dá para supor que um
          estudo novo ficará perto da média.
        </dd>
        <dt>A atrição concentra-se no início.</dt>
        <dd>
          A queda é mais íngreme nos primeiros um a três dias do
          protocolo.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Tudo o que você fizer para reter participantes — lembretes,
          contato, ajuste do cronograma — precisa acontecer dentro dessa
          janela.
        </dd>
        <dt>Sinais perdidos não são aleatórios.</dt>
        <dd>
          Gravidade dos sintomas, hora do dia e contexto social enviesam
          quais prompts são respondidos.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Dados ausentes não aleatórios (MNAR) são o caso padrão em ESM,
          não a exceção.
        </dd>
        <dt>Respostas tardias corrompem o «momentâneo».</dt>
        <dd>
          Uma resposta que chega quarenta minutos após o prompt é uma
          medida diferente de uma que chega em dois.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Sem exibir a distribuição de latências, você não consegue fixar
          nem defender um limiar.
        </dd>
      </dl>

      <h2>Painel 1 — Visão geral</h2>
      <p>
        Quatro números principais no topo da página:{" "}
        <strong>Total enviado</strong> na janela selecionada,{" "}
        <strong>taxa de resposta</strong> (respondidos ÷ enviados),{" "}
        <strong>latência média</strong> do prompt ao primeiro tap, e{" "}
        <strong>ativos hoje</strong> (participantes que responderam pelo
        menos uma vez). Abaixo, uma série temporal da taxa de resposta
        diária com média móvel de 7 dias. Use o seletor de intervalo (1 /
        7 / 14 / 30 / 90) no cabeçalho para ampliar ou estreitar a
        janela — todos os painéis abaixo respeitam essa escolha.
      </p>
      <p>
        Trate isto como o dashboard do dashboard. Se a taxa principal
        está saudável e a curva está plana, provavelmente não é preciso
        aprofundar. Se a curva cai, os painéis seguintes dirão de onde
        vem a perda.
      </p>

      <h2>Painel 2 — Curva de retenção</h2>
      <p>
        Um gráfico de linhas por dia <em>relativo</em> do estudo, não por
        dia de calendário: cada participante conta a partir do seu
        próprio dia&nbsp;0. Duas séries:
      </p>
      <ul>
        <li>
          <strong>Elegíveis</strong> — participantes inscritos tempo
          suficiente para <em>alcançar</em> esse dia relativo. É o
          denominador.
        </li>
        <li>
          <strong>Ativos</strong> — participantes que efetivamente
          responderam nesse dia relativo ou antes. É o numerador.
        </li>
      </ul>
      <p>
        O alinhamento por dia relativo é padrão em análise de
        sobrevivência mas raro em ferramentas ESM.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Separa a pergunta «meu protocolo está perdendo pessoas ao longo
        do tempo?» da pergunta «minha coorte teve tempo de abandonar?» —
        perguntas que um gráfico por dia calendário confunde e pode
        portanto responder errado.
      </p>
      <p>
        Leia a distância entre as duas linhas como sua taxa de abandono
        naquele dia relativo. Uma lacuna crescente nos dias 1–3 é o
        padrão de atrição precoce documentado na literatura.
      </p>

      <h2>Painel 3 — Funil de entrega</h2>
      <p>
        Três estágios empilhados sobre a janela selecionada:{" "}
        <strong>enviado</strong> → <strong>aberto</strong> (tapeado) →{" "}
        <strong>concluído</strong>. A perda entre estágios adjacentes é
        destacada em coral.
      </p>
      <p>
        O propósito do funil é decompor a «não resposta» em duas
        remediações frequentemente confundidas:
      </p>
      <dl>
        <dt>Perda de engajamento · enviado → aberto.</dt>
        <dd>
          O push saiu mas o participante não tapeou. Duas coisas muito
          diferentes se escondem nessa perda. <em>Técnica:</em>{" "}
          permissões revogadas, app desinstalado, otimização de bateria,
          token push obsoleto — a notificação nunca apareceu no
          dispositivo. <em>Comportamental:</em> a notificação apareceu,
          mas fadiga de prompt, momento inoportuno ou conteúdo
          irrelevante fizeram a pessoa ignorá-la. O dashboard não
          consegue separar esses casos apenas com dados do servidor —
          veja a nota abaixo — então quando este estágio vaza, trabalhe
          ambos os ângulos: refazer o onboarding de um ou dois
          participantes sinalizados no Painel 7 para descartar o caso
          técnico, depois revisar tempo e conteúdo do cronograma.
        </dd>
        <dt>Abandono · aberto → concluído.</dt>
        <dd>
          A pessoa tapeou a notificação mas não terminou o questionário.
          As causas costumam ser o próprio instrumento: longo demais,
          intrusivo demais, quebrado no celular. Ação: encurtar ou
          reestruturar o instrumento.
        </dd>
      </dl>
      <Callout>
        <strong>Por que não há estágio «Recebido»?</strong>{" "}
        Os sistemas operacionais móveis não expõem a entrega push para o
        aplicativo — uma vez que o Samply entrega a mensagem à Apple ou
        Google, a entrega em si é opaca. O único sinal de «recebido» que
        o app Samply Research consegue escrever é quando o app está
        aberto em primeiro plano no momento da chegada, algo raro em uso
        normal. Mostrar isso como estágio de entrega subestimaria
        drasticamente a entrega real e levaria a remediações erradas. O
        funil portanto reporta os três sinais confiáveis: despacho, tap,
        conclusão.
      </Callout>

      <h2>Painel 4 — Distribuição dos tempos de resposta</h2>
      <p>
        Um histograma das latências do prompt ao primeiro tap, agrupadas
        em &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min,
        30–60&nbsp;min, 1–2&nbsp;h, 2&nbsp;h+. O cabeçalho do painel
        mostra a mediana e a parcela de respostas abaixo de 15 minutos —
        um limiar operacional comum.
      </p>
      <p>
        Stone e colegas argumentaram que uma resposta ESM só carrega o
        «momentâneo» do EMA se chega perto o bastante do prompt para
        que o estado da pessoa não tenha mudado significativamente.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Protocolos diferentes traçam a linha de modo diferente — 5
        minutos para trabalho afetivo, 30 minutos para comportamento,
        às vezes uma hora para diários — então o Samply exibe a
        distribuição em vez de impor um único limiar. Use-a para fixar e
        defender o corte que aplicar na análise.
      </p>

      <h2>Painel 5 — Padrão de resposta por hora</h2>
      <p>
        Gráfico de barras da taxa de resposta por hora do dia, calculado
        no fuso local de cada participante e então agregado. As barras
        ficam coloridas quando a taxa supera a média diária e cinzas
        quando está abaixo.
      </p>
      <p>
        Cumprimento por hora do dia é uma fonte documentada de viés de
        seleção diurno: se a taxa de resposta cai à noite, sua amostra
        noturna está enviesada para o que prediz estar disponível à
        noite.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Use este painel para identificar horas em que a amostragem
        quebra e ou ajuste a janela do cronograma ou pondere a análise
        de acordo.
      </p>

      <h2>Painel 6 — Desempenho por cronograma</h2>
      <p>
        Uma linha por cronograma de notificação definido no estudo, com{" "}
        <strong>enviadas</strong>, <strong>abertas</strong> e{" "}
        <strong>cumprimento</strong>. Uma linha marcada como{" "}
        <em>(cronograma não rastreado)</em> agrega os resultados
        enviados antes de o Samply atribuir cada documento Result ao seu
        cronograma de origem — essas linhas não têm ligação de
        configuração e ficam agrupadas.
      </p>
      <p>
        Comparar cronogramas fixos, aleatórios e contingentes a evento
        dentro de um mesmo estudo é um dos poucos lugares em que a
        literatura é inequívoca.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Use este painel para identificar cronogramas com desempenho
        abaixo dos demais — um cronograma de debriefing no fim do
        estudo, por exemplo, ficará frequentemente bem abaixo dos
        diários — e para decidir se a diferença reflete carga do
        participante, conteúdo ou tempo.
      </p>

      <h2>Painel 7 — Cumprimento por participante</h2>
      <p>
        Uma tabela ordenável e filtrável de cada participante ativo,
        com <strong>enviadas</strong>, <strong>abertas</strong>,{" "}
        <strong>cumprimento&nbsp;%</strong> e{" "}
        <strong>última atividade</strong>. Linhas abaixo do limiar
        configurável (padrão 60&nbsp;%) ficam destacadas em coral.
      </p>
      <p>
        Médias de grupo escondem os participantes que realmente precisam
        de intervenção. Um estudo com média 73&nbsp;% pode perfeitamente
        conter participantes em 20&nbsp;% cujos dados não são confiáveis
        e participantes em 95&nbsp;% que sustentam a média — agrupá-los
        produz um único número não acionável.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Use esta tabela para enviar lembretes direcionados, decidir
        quais participantes excluir da amostra analítica ou
        simplesmente saber quem contatar antes que o abandono se torne
        permanente.
      </p>

      <h2>O que este dashboard <em>não</em> faz</h2>
      <p>
        Quatro limites honestos, declarados de saída porque moldam como
        ler cada painel acima:
      </p>
      <dl>
        <dt>Tempo de resposta, sim. Validade de conteúdo, não.</dt>
        <dd>
          Respostas descuidadas, em linha reta ou desatentas não são
          detectadas. Essas verificações continuam a cargo do analista.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Sinais são ponderados igualmente.</dt>
        <dd>
          Um ping matinal de um minuto e um diário de fim de dia de dez
          minutos contam igual no numerador de cumprimento. Se deve-se
          ponderar por carga do participante, comprimento do
          questionário ou intenção de design continua sendo uma questão
          metodológica em aberto.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Sem teste inferencial MNAR.</dt>
        <dd>
          O dashboard mostra o que falta e quando faltou, mas os dados
          ausentes não aleatórios (MNAR) ainda precisam ser tratados
          analiticamente. O campo carece de método de consenso.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Limiares padrão codificam uma posição.</dt>
        <dd>
          O limiar de baixo cumprimento de 60&nbsp;% é uma escolha
          metodológica, não uma constante natural. É configurável por
          estudo, mas o padrão ainda molda o que você nota — leia-o como
          ponto de partida, não como regra.
        </dd>
      </dl>

      <h2>Drill-down e exportação</h2>
      <p>
        Clique em qualquer linha de participante no Painel 7 para saltar
        para o histórico de respostas dessa pessoa. Para análises que
        precisem dos carimbos de tempo brutos e do log de eventos, use a
        ação <strong>Exportar CSV</strong> na aba Histórico — toda
        agregação em Analytics é reproduzível desse dump no seu próprio
        ambiente estatístico.
      </p>

      <h2>Referências citadas</h2>
      <References />
    </>
  );
}

function AnalyticsContentNl() {
  return (
    <>
      <p>
        Open <strong>Analytics</strong>{" "}vanuit een willekeurige studie om
        te zien hoe de studie presteert terwijl deze nog loopt — compliance,
        responstijden, uitval en engagement per deelnemer, alles op één
        scherm. De panelen zijn ontworpen rond gedocumenteerde bedreigingen
        voor de kwaliteit van ESM-data, niet rond generieke
        product-analytics-templates: elk diagram komt overeen met een
        construct dat de methodologische literatuur als bewakingswaardig
        aanmerkt — niet iets dat je achteraf vanuit een geëxporteerde CSV
        zou moeten berekenen.
      </p>

      <Callout>
        Analytics bevraagt de studie elke vijf minuten. De cijfers worden
        bijgewerkt terwijl deelnemers nog antwoorden — je hoeft niet te
        wachten tot de dataverzameling klaar is om te zien of er iets
        misgaat.
      </Callout>

      <h2>Waarom überhaupt monitoren?</h2>
      <p>
        Experience sampling (ESM) en ecological momentary assessment (EMA)
        steunen op herhaalde, in-situ zelfrapportages over veel dagen.
        Vier bevindingen uit de literatuur maken realtime-monitoring meer
        dan een gemak:
      </p>
      <dl>
        <dt>Compliance is gemiddeld hoog — en sterk variabel.</dt>
        <dd>
          In gepubliceerde ESM-studies is compliance gemiddeld ongeveer
          70–80&nbsp;%, maar individuele studies lopen uiteen van onder
          50&nbsp;% tot boven 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          Het gemiddelde stelt gerust, de spreiding niet — je kunt er
          niet van uitgaan dat een nieuwe studie dicht bij het gemiddelde
          zit.
        </dd>
        <dt>Uitval zit aan de voorkant.</dt>
        <dd>
          De daling is het steilst in de eerste een tot drie dagen van
          het protocol.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Alles wat je doet om deelnemers vast te houden — herinneringen,
          contact, schema-aanpassing — moet in dat venster gebeuren.
        </dd>
        <dt>Gemiste pings zijn niet willekeurig.</dt>
        <dd>
          Symptoomernst, tijd van de dag en sociale context bepalen mede
          welke prompts worden beantwoord.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Missing-not-at-random (MNAR) is in ESM het standaardgeval, niet
          de uitzondering.
        </dd>
        <dt>Late antwoorden ondermijnen het «momentane».</dt>
        <dd>
          Een antwoord dat veertig minuten na de prompt binnenkomt is een
          andere meting dan een dat binnen twee minuten komt.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Zonder zichtbare latentieverdeling kun je geen drempel zetten
          of verdedigen.
        </dd>
      </dl>

      <h2>Paneel 1 — Overzicht</h2>
      <p>
        Vier kerncijfers bovenaan de pagina:{" "}
        <strong>Totaal verzonden</strong> in het gekozen venster,{" "}
        <strong>responspercentage</strong> (beantwoord ÷ verzonden),{" "}
        <strong>gemiddelde latentie</strong> van prompt tot eerste tap,
        en <strong>vandaag actief</strong> (deelnemers die minstens één
        keer hebben gereageerd). Daaronder een tijdreeks van het
        dagelijkse responspercentage met een 7-daags voortschrijdend
        gemiddelde. Gebruik de bereikkiezer (1 / 7 / 14 / 30 / 90) in de
        paginakop om het venster te verbreden of te versmallen — alle
        onderstaande panelen respecteren deze keuze.
      </p>
      <p>
        Behandel dit als het dashboard voor het dashboard. Als het
        hoofdpercentage gezond is en de curve vlak, hoef je waarschijnlijk
        niet dieper te gaan. Als de curve daalt, vertellen de volgende
        panelen je waar het verlies vandaan komt.
      </p>

      <h2>Paneel 2 — Retentiecurve</h2>
      <p>
        Een lijngrafiek per <em>relatieve</em> studiedag, niet per
        kalenderdag: elke deelnemer telt vanaf zijn eigen dag&nbsp;0.
        Twee reeksen:
      </p>
      <ul>
        <li>
          <strong>Geschikt</strong> — deelnemers die lang genoeg
          ingeschreven zijn om die relatieve dag te <em>bereiken</em>.
          Dit is de noemer.
        </li>
        <li>
          <strong>Actief</strong> — deelnemers die op of voor die
          relatieve dag daadwerkelijk antwoordden. Dit is de teller.
        </li>
      </ul>
      <p>
        Relatieve-dag-uitlijning is standaard in survival-analyse maar
        zeldzaam in ESM-tooling.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Het scheidt de vraag «verliest mijn protocol mensen in de tijd?»
        van de vraag «heeft mijn cohort tijd gehad om af te haken?» —
        vragen die een kalenderdag-grafiek vermengt en daarom verkeerd
        kan beantwoorden.
      </p>
      <p>
        Lees het verschil tussen de twee lijnen als je uitvalpercentage
        op die relatieve dag. Een groeiend gat in dag 1–3 is het
        vooraan-zware uitvalpatroon uit de literatuur.
      </p>

      <h2>Paneel 3 — Afleverings-funnel</h2>
      <p>
        Drie gestapelde fasen over het gekozen venster:{" "}
        <strong>verzonden</strong> → <strong>geopend</strong> (getapt)
        → <strong>voltooid</strong>. De afname tussen aangrenzende fasen
        wordt in koraal gemarkeerd.
      </p>
      <p>
        Het doel van de funnel is om «niet-respons» uiteen te leggen in
        twee remediaties die vaak verward worden:
      </p>
      <dl>
        <dt>Engagement-verlies · verzonden → geopend.</dt>
        <dd>
          De push ging eruit maar de deelnemer tapte niet. Twee heel
          verschillende dingen verbergen zich in dit verlies.{" "}
          <em>Technisch:</em> rechten ingetrokken, app verwijderd,
          batterijoptimalisatie, verouderd push-token — de melding
          verscheen nooit op het toestel. <em>Gedrag:</em> de melding
          verscheen wel, maar prompt-vermoeidheid, ongelegen moment of
          irrelevante inhoud zorgden dat de persoon hem negeerde. Het
          dashboard kan deze gevallen niet onderscheiden uit alleen
          serverdata — zie de noot hieronder — dus als deze fase lekt,
          werk dan aan beide kanten: één of twee in Paneel 7
          gemarkeerde deelnemers opnieuw onboarden om het technische
          geval uit te sluiten, en daarna timing en inhoud van het
          schema nakijken.
        </dd>
        <dt>Afhaken · geopend → voltooid.</dt>
        <dd>
          De persoon tapte de melding maar voltooide de vragenlijst
          niet. Oorzaken liggen meestal bij het instrument zelf: te
          lang, te indringend, kapot op mobiel. Actie: instrument
          inkorten of herstructureren.
        </dd>
      </dl>
      <Callout>
        <strong>Waarom geen «Ontvangen»-fase?</strong>{" "}
        Mobiele besturingssystemen geven push-aflevering niet door aan
        de app — zodra Samply het bericht aan Apple of Google overhandigt,
        is de aflevering zelf ondoorzichtig. Het enige «ontvangen»-signaal
        dat de Samply-Research-app kan schrijven, is wanneer de app
        toevallig op de voorgrond open is bij aankomst, wat in normaal
        gebruik zeldzaam is. Dat als afleveringsfase tonen zou de
        werkelijke aflevering drastisch onderschatten en tot verkeerde
        remediaties leiden. De funnel rapporteert daarom de drie
        betrouwbare signalen: verzending, tap, voltooiing.
      </Callout>

      <h2>Paneel 4 — Verdeling van responstijden</h2>
      <p>
        Een histogram van latenties van prompt tot eerste tap, gegroepeerd
        in &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min, 15–30&nbsp;min,
        30–60&nbsp;min, 1–2&nbsp;u, 2&nbsp;u+. De paneelkop toont de
        mediaan en het aandeel reacties onder 15 minuten — een
        gangbare operationele drempel.
      </p>
      <p>
        Stone en collega&rsquo;s stelden dat een ESM-antwoord het
        «momentane» van EMA alleen draagt als het dicht genoeg bij de
        prompt arriveert dat de toestand van de persoon niet betekenisvol
        verschoven is.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Verschillende protocollen trekken de grens anders — 5 minuten
        voor affectief werk, 30 minuten voor gedrag, soms een uur voor
        dagboekdesigns — daarom toont Samply de verdeling in plaats van
        één enkele drempel op te leggen. Gebruik haar om de afkapwaarde
        te zetten en te verdedigen die je in de analyse toepast.
      </p>

      <h2>Paneel 5 — Respons per uur</h2>
      <p>
        Staafdiagram van het responspercentage per uur van de dag,
        berekend in de lokale tijdzone van elke deelnemer en daarna
        geaggregeerd. Balken zijn gekleurd als het percentage boven het
        dagelijkse gemiddelde ligt en grijs als het eronder zit.
      </p>
      <p>
        Compliance per tijdstip is een gedocumenteerde bron van diurnale
        selectiebias: als het responspercentage &lsquo;s avonds
        wegzakt, is je avondsteekproef vertekend naar wat voorspelt
        beschikbaar te zijn in de avond.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Gebruik dit paneel om uren te detecteren waar de bemonstering
        feitelijk uitvalt en pas óf het schema-venster aan óf weeg de
        analyse dienovereenkomstig.
      </p>

      <h2>Paneel 6 — Prestaties per schema</h2>
      <p>
        Eén rij per gedefinieerd notificatieschema in de studie, met{" "}
        <strong>verzonden</strong>, <strong>geopend</strong> en{" "}
        <strong>compliance</strong>. Een rij gemarkeerd als{" "}
        <em>(schema niet toegewezen)</em> aggregeert resultaten die
        verzonden zijn voordat Samply elk Result-document aan zijn
        bron-schema begon toe te wijzen — die rijen hebben geen
        configuratielink en worden samen gegroepeerd.
      </p>
      <p>
        Vaste, willekeurige en event-contingente schema&rsquo;s binnen
        één studie vergelijken is een van de weinige plekken waar de
        literatuur eenduidig is.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Gebruik dit paneel om schema&rsquo;s te identificeren die onder
        de andere presteren — een debriefing-schema aan het einde van de
        studie zal bijvoorbeeld vaak ver onder de dagelijkse zitten — en
        om te beslissen of het verschil deelnemerbelasting, inhoud of
        timing weerspiegelt.
      </p>

      <h2>Paneel 7 — Compliance per deelnemer</h2>
      <p>
        Een sorteerbare en filterbare tabel van elke actieve deelnemer,
        met <strong>verzonden</strong>, <strong>geopend</strong>,{" "}
        <strong>compliance&nbsp;%</strong> en <strong>laatst actief</strong>.
        Rijen onder de configureerbare drempel (standaard 60&nbsp;%)
        worden in koraal gemarkeerd.
      </p>
      <p>
        Groepsgemiddelden verbergen de deelnemers die werkelijk
        interventie nodig hebben. Een studie met gemiddelde 73&nbsp;%
        kan prima deelnemers bij 20&nbsp;% bevatten waarvan de data
        onbetrouwbaar is en deelnemers bij 95&nbsp;% die het gemiddelde
        dragen — die samennemen geeft één getal dat niet
        handelingsleidend is.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Gebruik deze tabel om gerichte herinneringen te sturen, te
        beslissen welke deelnemers uit de analysesteekproef te verwijderen,
        of gewoon om te weten wie te contacteren voor de uitval
        permanent wordt.
      </p>

      <h2>Wat dit dashboard <em>niet</em> doet</h2>
      <p>
        Vier eerlijke beperkingen, vooraf benoemd omdat ze bepalen hoe je
        elk paneel hierboven moet lezen:
      </p>
      <dl>
        <dt>Responstijd ja, inhoudelijke responsvaliditeit nee.</dt>
        <dd>
          Onachtzaam beantwoorden, straight-lining en niet-attente
          antwoorden worden niet gedetecteerd. Die controles blijven de
          taak van de analist.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Signalen worden gelijk gewogen.</dt>
        <dd>
          Een ochtendping van één minuut en een avonddagboek van tien
          minuten tellen even zwaar in de compliance-teller. Of er
          gewogen moet worden naar belasting, vragenlijstlengte of
          designintentie blijft een open methodologische vraag.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Geen inferentiële MNAR-toets.</dt>
        <dd>
          Het dashboard toont wat er ontbreekt en wanneer het verloren
          ging, maar missing-not-at-random (MNAR) moet nog steeds
          analytisch worden behandeld. Het veld kent geen
          consensusmethode.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Standaardwaarden coderen een positie.</dt>
        <dd>
          De drempel van 60&nbsp;% voor lage compliance is een
          methodologische keuze, geen natuurconstante. Hij is per studie
          configureerbaar, maar de standaard bepaalt nog steeds wat je
          opvalt — lees hem als startpunt, niet als regel.
        </dd>
      </dl>

      <h2>Drill-down &amp; export</h2>
      <p>
        Klik op een deelnemersrij in Paneel 7 om naar de
        antwoordgeschiedenis van die persoon te springen. Voor analyses
        die ruwe tijdstempels en de eventlog nodig hebben, gebruik je de
        actie <strong>Exporteer CSV</strong> in het tabblad
        Geschiedenis — elke aggregatie in Analytics is uit die dump
        reproduceerbaar in je eigen statistische omgeving.
      </p>

      <h2>Geciteerde literatuur</h2>
      <References />
    </>
  );
}

function AnalyticsContentRu() {
  return (
    <>
      <p>
        Откройте <strong>Аналитику</strong>{" "}внутри любого исследования,
        чтобы увидеть, как идёт исследование, пока оно ещё в процессе —
        комплаенс, время отклика, отсев и вовлечённость по участникам, всё
        на одном экране. Панели выстроены вокруг задокументированных
        угроз качеству ESM-данных, а не вокруг типовых шаблонов
        продуктовой аналитики: каждый график соответствует конструкту,
        который методологическая литература считает требующим наблюдения,
        а не вычисления постфактум из CSV-экспорта.
      </p>

      <Callout>
        Аналитика опрашивает исследование каждые пять минут. Цифры
        обновляются, пока участники ещё отвечают — не нужно ждать конца
        сбора, чтобы увидеть, что что-то идёт не так.
      </Callout>

      <h2>Зачем вообще мониторить?</h2>
      <p>
        Метод выборки переживаний (ESM) и экологическая моментальная
        оценка (EMA) опираются на повторяющиеся самоотчёты in situ,
        собираемые на протяжении многих дней. Четыре результата из
        литературы делают мониторинг в реальном времени чем-то большим,
        чем просто удобство:
      </p>
      <dl>
        <dt>Комплаенс в среднем высокий — и крайне изменчивый.</dt>
        <dd>
          В опубликованных ESM-исследованиях средний комплаенс составляет
          примерно 70–80&nbsp;%, но отдельные исследования варьируются от
          ниже 50&nbsp;% до выше 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          Среднее успокаивает, разброс — нет: нельзя предполагать, что
          новое исследование окажется рядом со средним.
        </dd>
        <dt>Отсев приходится на начало.</dt>
        <dd>
          Падение наиболее крутое в первые один–три дня протокола.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Всё, что вы делаете для удержания участников — напоминания,
          связь, корректировка расписания — должно происходить в этом
          окне.
        </dd>
        <dt>Пропущенные сигналы не случайны.</dt>
        <dd>
          Тяжесть симптомов, время суток и социальный контекст
          систематически влияют на то, какие подсказки получают ответ.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Пропуски не случайные (MNAR) — это случай по умолчанию в ESM,
          а не исключение.
        </dd>
        <dt>Поздние ответы подрывают «моментальность».</dt>
        <dd>
          Ответ, поступивший через сорок минут после подсказки — это
          другое измерение, чем ответ, пришедший за две минуты.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Без визуализации распределения латентностей нельзя ни задать,
          ни обосновать порог.
        </dd>
      </dl>

      <h2>Панель 1 — Обзор</h2>
      <p>
        Четыре ключевые цифры в верхней части страницы:{" "}
        <strong>Всего отправлено</strong> в выбранном окне,{" "}
        <strong>уровень отклика</strong> (ответившие ÷ отправленные),{" "}
        <strong>средняя латентность</strong> от подсказки до первого
        тапа, и <strong>активны сегодня</strong> (участники, ответившие
        хотя бы раз). Ниже — временной ряд дневного уровня отклика со
        скользящим средним за 7 дней. Используйте селектор диапазона (1
        / 7 / 14 / 30 / 90) в заголовке страницы, чтобы расширить или
        сузить окно — все панели ниже учитывают этот выбор.
      </p>
      <p>
        Воспринимайте это как панель для панели. Если базовый уровень
        здоров и кривая ровная, скорее всего, копать глубже не нужно.
        Если кривая идёт вниз, следующие панели подскажут, откуда
        потери.
      </p>

      <h2>Панель 2 — Кривая удержания</h2>
      <p>
        Линейный график по <em>относительному</em> дню исследования, а не
        по календарному: каждый участник считается от своего собственного
        дня&nbsp;0. Два ряда:
      </p>
      <ul>
        <li>
          <strong>Подходящие</strong> — участники, зарегистрированные
          достаточно давно, чтобы <em>достичь</em> этого относительного
          дня. Это знаменатель.
        </li>
        <li>
          <strong>Активные</strong> — участники, фактически ответившие в
          этот относительный день или раньше. Это числитель.
        </li>
      </ul>
      <p>
        Выравнивание по относительному дню — стандарт в анализе
        выживаемости, но редкость в ESM-инструментах.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Это разделяет вопрос «теряет ли мой протокол людей со временем?»
        от вопроса «имела ли моя когорта время отвалиться?» — вопросы,
        которые календарный график смешивает и может поэтому ответить
        неверно.
      </p>
      <p>
        Читайте разрыв между двумя линиями как уровень отсева на этот
        относительный день. Растущий разрыв в дни 1–3 — это
        задокументированный в литературе паттерн раннего отсева.
      </p>

      <h2>Панель 3 — Воронка доставки</h2>
      <p>
        Три ступени в выбранном окне:{" "}
        <strong>отправлено</strong> → <strong>открыто</strong> (тап) →{" "}
        <strong>завершено</strong>. Падение между соседними ступенями
        отмечено коралловым.
      </p>
      <p>
        Смысл воронки — разложить «неответ» на два корректирующих
        действия, которые часто путают:
      </p>
      <dl>
        <dt>Потеря вовлечённости · отправлено → открыто.</dt>
        <dd>
          Пуш ушёл, но участник не тапнул. В этом провале скрыты две
          очень разные вещи. <em>Техническая:</em> отозваны разрешения,
          приложение удалено, оптимизация батареи, устаревший
          push-токен — уведомление не появилось на устройстве.{" "}
          <em>Поведенческая:</em> уведомление появилось, но усталость от
          подсказок, неподходящее время или нерелевантный контент
          привели к тому, что человек его проигнорировал. Дашборд не
          может различить эти случаи только по серверным данным — см.
          примечание ниже — поэтому, когда эта ступень течёт, работайте
          с обеих сторон: переподключите одного-двух участников,
          отмеченных в Панели&nbsp;7, чтобы исключить технический
          случай, затем пересмотрите время и содержание расписания.
        </dd>
        <dt>Незавершение · открыто → завершено.</dt>
        <dd>
          Человек тапнул уведомление, но не закончил опросник. Причины
          обычно в самом инструменте: слишком длинный, слишком
          навязчивый, сломан на мобильном. Действие: сократить или
          перестроить инструмент.
        </dd>
      </dl>
      <Callout>
        <strong>Почему нет ступени «Получено»?</strong>{" "}
        Мобильные ОС не сообщают приложению о доставке пуша — как только
        Samply передаёт сообщение Apple или Google, сама доставка
        непрозрачна. Единственный сигнал «получено», который приложение
        Samply Research может записать, — это когда приложение случайно
        открыто на переднем плане в момент прихода, что в обычном
        использовании бывает редко. Подавать это как ступень доставки
        означало бы резко занизить реальную доставку и направить
        корректирующие действия по ложному следу. Поэтому воронка
        сообщает три надёжных сигнала: отправка, тап, завершение.
      </Callout>

      <h2>Панель 4 — Распределение времени отклика</h2>
      <p>
        Гистограмма латентностей от подсказки до первого тапа, в
        интервалах &lt;&nbsp;5&nbsp;мин, 5–15&nbsp;мин, 15–30&nbsp;мин,
        30–60&nbsp;мин, 1–2&nbsp;ч, 2&nbsp;ч+. Заголовок панели показывает
        медиану и долю ответов до 15 минут — распространённый
        операционный порог.
      </p>
      <p>
        Stone и коллеги утверждали, что ESM-ответ несёт «моментальное» в
        EMA, только если приходит достаточно близко к подсказке, чтобы
        состояние участника не изменилось существенно.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Разные протоколы проводят линию по-разному — 5 минут для
        аффективной работы, 30 минут для поведения, иногда час для
        дневниковых дизайнов — поэтому Samply показывает распределение
        вместо того, чтобы навязывать единый порог. Используйте его,
        чтобы задать и обосновать отсечку, применяемую при анализе.
      </p>

      <h2>Панель 5 — Часовой паттерн ответов</h2>
      <p>
        Столбчатая диаграмма уровня отклика по часам суток, рассчитанная
        в локальном часовом поясе каждого участника, затем
        агрегированная. Столбцы окрашены, когда уровень выше среднего за
        день, и серые — когда ниже.
      </p>
      <p>
        Комплаенс по времени суток — задокументированный источник
        диурнального селекционного смещения: если уровень отклика
        проседает вечером, ваша вечерняя выборка смещена в сторону того,
        что предсказывает доступность вечером.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Используйте эту панель, чтобы заметить часы, когда забор данных
        фактически ломается, и либо скорректируйте окно расписания, либо
        взвесьте анализ соответствующим образом.
      </p>

      <h2>Панель 6 — Производительность по расписаниям</h2>
      <p>
        Одна строка на каждое расписание уведомлений в исследовании, со{" "}
        <strong>отправлено</strong>, <strong>открыто</strong> и{" "}
        <strong>комплаенс</strong>. Строка с меткой{" "}
        <em>(расписание не определено)</em> агрегирует результаты,
        отправленные до того, как Samply начал связывать каждый документ
        Result с его исходным расписанием — у этих строк нет ссылки на
        конфигурацию, и они объединены вместе.
      </p>
      <p>
        Сравнение фиксированных, случайных и событийных расписаний в
        рамках одного исследования — одно из немногих мест, где
        литература однозначна.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Используйте эту панель, чтобы выявить расписания, отстающие от
        остальных — расписание дебрифинга в конце исследования, например,
        часто будет заметно ниже ежедневных — и чтобы решить, отражает
        ли разница нагрузку на участника, контент или время.
      </p>

      <h2>Панель 7 — Комплаенс по участникам</h2>
      <p>
        Сортируемая и фильтруемая таблица каждого активного участника,
        с <strong>отправлено</strong>, <strong>открыто</strong>,{" "}
        <strong>комплаенс&nbsp;%</strong> и{" "}
        <strong>последняя активность</strong>. Строки ниже настраиваемого
        порога (по умолчанию 60&nbsp;%) выделены коралловым.
      </p>
      <p>
        Групповые средние скрывают участников, которым действительно
        нужно вмешательство. Исследование со средним 73&nbsp;% вполне
        может содержать участников с 20&nbsp;%, чьи данные ненадёжны, и
        участников с 95&nbsp;%, которые тянут среднее — их объединение
        даёт одно число, по которому невозможно действовать.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Используйте эту таблицу, чтобы отправлять адресные напоминания,
        решать, кого исключить из аналитической выборки, или просто
        знать, с кем связаться, прежде чем отсев станет необратимым.
      </p>

      <h2>Что этот дашборд <em>не</em> делает</h2>
      <p>
        Четыре честных ограничения, заявленных сразу, потому что они
        определяют, как читать каждую панель выше:
      </p>
      <dl>
        <dt>Время отклика — да. Валидность содержания — нет.</dt>
        <dd>
          Небрежные ответы, «straight-lining» и невнимательные ответы не
          выявляются. Эти проверки остаются на аналитике.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Сигналы взвешены одинаково.</dt>
        <dd>
          Минутный утренний пинг и десятиминутный вечерний дневник
          считаются одинаково в числителе комплаенса. Стоит ли взвешивать
          по нагрузке, длине опроса или замыслу дизайна — открытый
          методологический вопрос.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Нет инференциального MNAR-теста.</dt>
        <dd>
          Дашборд показывает, чего не хватает и когда это пропало, но
          неслучайно пропущенные данные (MNAR) должны по-прежнему
          обрабатываться аналитически. В поле нет согласованного метода.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Пороговые значения по умолчанию кодируют позицию.</dt>
        <dd>
          Порог низкого комплаенса 60&nbsp;% — методологический выбор, а
          не природная константа. Он настраивается для каждого
          исследования, но значение по умолчанию всё равно формирует
          то, что вы замечаете — читайте его как отправную точку, а не
          правило.
        </dd>
      </dl>

      <h2>Углублённый просмотр и экспорт</h2>
      <p>
        Кликните по строке участника в Панели 7, чтобы перейти к
        истории его ответов. Для анализов, которым нужны сырые временные
        метки и лог событий, используйте действие{" "}
        <strong>Экспорт CSV</strong> во вкладке «История» — каждая
        агрегация в Аналитике воспроизводима из этого дампа в вашей
        статистической среде.
      </p>

      <h2>Цитируемая литература</h2>
      <References />
    </>
  );
}

function AnalyticsContentPl() {
  return (
    <>
      <p>
        Otwórz <strong>Analitykę</strong>{" "}wewnątrz dowolnego badania, aby
        zobaczyć, jak badanie radzi sobie, gdy jeszcze trwa — zgodność,
        czasy odpowiedzi, rezygnację i zaangażowanie poszczególnych
        uczestników, wszystko na jednym ekranie. Panele zaprojektowano
        wokół udokumentowanych zagrożeń dla jakości danych ESM, a nie
        wokół ogólnych szablonów analityki produktu: każdy wykres
        odpowiada konstrukcji, którą literatura metodologiczna wskazuje
        jako wartą obserwacji, a nie do obliczania po fakcie z
        wyeksportowanego CSV.
      </p>

      <Callout>
        Analityka odpytuje badanie co pięć minut. Liczby aktualizują się,
        gdy uczestnicy nadal odpowiadają — nie trzeba czekać do końca
        zbierania danych, aby zauważyć, że coś idzie nie tak.
      </Callout>

      <h2>Po co w ogóle monitorować?</h2>
      <p>
        Próbkowanie doświadczenia (ESM) i ekologiczna ocena momentalna
        (EMA) opierają się na powtarzanych samoraportach in situ
        zbieranych przez wiele dni. Cztery wnioski z literatury sprawiają,
        że monitorowanie w czasie rzeczywistym jest czymś więcej niż
        wygodą:
      </p>
      <dl>
        <dt>Zgodność jest średnio wysoka — i bardzo zmienna.</dt>
        <dd>
          W opublikowanych badaniach ESM zgodność wynosi średnio ok.
          70–80&nbsp;%, ale poszczególne badania wahają się od poniżej
          50&nbsp;% do powyżej 95&nbsp;%.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          Średnia uspokaja, rozrzut nie — nie można zakładać, że nowe
          badanie znajdzie się blisko średniej.
        </dd>
        <dt>Rezygnacja skupia się na początku.</dt>
        <dd>
          Spadek jest najbardziej stromy w pierwszych jeden–trzy dni
          protokołu.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Wszystko, co robisz, by utrzymać uczestników — przypomnienia,
          kontakt, dostosowanie harmonogramu — musi mieć miejsce w tym
          oknie.
        </dd>
        <dt>Pominięte sygnały nie są losowe.</dt>
        <dd>
          Nasilenie objawów, pora dnia i kontekst społeczny — wszystko to
          stronniczo wpływa na to, które podpowiedzi otrzymują odpowiedź.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Braki nielosowe (MNAR) są w ESM przypadkiem domyślnym, a nie
          wyjątkiem.
        </dd>
        <dt>Późne odpowiedzi psują «moment».</dt>
        <dd>
          Odpowiedź, która przychodzi czterdzieści minut po podpowiedzi,
          to inny pomiar niż ta, która przychodzi w ciągu dwóch.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Bez ujawnienia rozkładu opóźnień nie można ustalić ani
          obronić progu.
        </dd>
      </dl>

      <h2>Panel 1 — Przegląd</h2>
      <p>
        Cztery główne liczby u góry strony:{" "}
        <strong>Łącznie wysłane</strong> w wybranym oknie,{" "}
        <strong>wskaźnik odpowiedzi</strong> (odpowiedzieli ÷ wysłano),{" "}
        <strong>średnia latencja</strong> od podpowiedzi do pierwszego
        tapnięcia, oraz <strong>aktywni dzisiaj</strong> (uczestnicy,
        którzy odpowiedzieli przynajmniej raz). Poniżej szereg czasowy
        dziennego wskaźnika odpowiedzi z 7-dniową średnią kroczącą.
        Użyj selektora zakresu (1 / 7 / 14 / 30 / 90) w nagłówku, aby
        rozszerzyć lub zawęzić okno — wszystkie panele poniżej szanują
        ten wybór.
      </p>
      <p>
        Traktuj to jako panel dla panelu. Jeśli wskaźnik główny jest
        zdrowy, a krzywa płaska, prawdopodobnie nie trzeba kopać głębiej.
        Jeśli krzywa opada, kolejne panele powiedzą, skąd bierze się
        strata.
      </p>

      <h2>Panel 2 — Krzywa utrzymania</h2>
      <p>
        Wykres liniowy według <em>względnego</em> dnia badania, a nie dnia
        kalendarzowego: każdy uczestnik liczony jest od własnego
        dnia&nbsp;0. Dwa szeregi:
      </p>
      <ul>
        <li>
          <strong>Uprawnieni</strong> — uczestnicy zapisani na tyle
          długo, by <em>osiągnąć</em> ten względny dzień. To mianownik.
        </li>
        <li>
          <strong>Aktywni</strong> — uczestnicy, którzy rzeczywiście
          odpowiedzieli w tym względnym dniu lub przed nim. To licznik.
        </li>
      </ul>
      <p>
        Wyrównanie według względnego dnia to standard w analizie
        przeżycia, ale rzadkość w narzędziach ESM.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        Oddziela pytanie «czy mój protokół traci ludzi z czasem?» od
        pytania «czy moja kohorta miała czas zrezygnować?» — pytania,
        które wykres kalendarzowy miesza i może błędnie zinterpretować.
      </p>
      <p>
        Czytaj odstęp między dwiema liniami jako wskaźnik rezygnacji w
        tym względnym dniu. Rosnąca luka w dniach 1–3 to opisany w
        literaturze wzorzec wczesnej rezygnacji.
      </p>

      <h2>Panel 3 — Lejek dostarczania</h2>
      <p>
        Trzy etapy w wybranym oknie:{" "}
        <strong>wysłane</strong> → <strong>otwarte</strong> (tapnięte) →{" "}
        <strong>ukończone</strong>. Spadek między sąsiednimi etapami
        oznaczono kolorem koralowym.
      </p>
      <p>
        Celem lejka jest rozłożenie «braku odpowiedzi» na dwa działania
        naprawcze, które często są mylone:
      </p>
      <dl>
        <dt>Utrata zaangażowania · wysłane → otwarte.</dt>
        <dd>
          Push wyszedł, ale uczestnik nie tapnął. W tym spadku ukrywają
          się dwie bardzo różne rzeczy. <em>Techniczna:</em> cofnięte
          uprawnienia, odinstalowana aplikacja, optymalizacja baterii,
          przestarzały token push — powiadomienie nigdy nie pojawiło się
          na urządzeniu. <em>Behawioralna:</em> powiadomienie się
          pojawiło, ale zmęczenie podpowiedziami, nieodpowiednia pora
          lub nieistotna treść sprawiły, że osoba je zignorowała. Panel
          nie potrafi rozdzielić tych przypadków na podstawie samych
          danych serwerowych — patrz notka poniżej — więc gdy ten etap
          przecieka, działaj z obu stron: ponownie zonboarduj jedną-dwie
          osoby oznaczone w Panelu&nbsp;7, aby wykluczyć przypadek
          techniczny, a następnie przejrzyj czas i treść harmonogramu.
        </dd>
        <dt>Porzucenie · otwarte → ukończone.</dt>
        <dd>
          Osoba tapnęła powiadomienie, ale nie skończyła ankiety.
          Przyczyny zwykle leżą w samym narzędziu: zbyt długie, zbyt
          natrętne, popsute na mobilnym. Działanie: skrócić lub
          przebudować narzędzie.
        </dd>
      </dl>
      <Callout>
        <strong>Dlaczego nie ma etapu «Odebrane»?</strong>{" "}
        Mobilne systemy operacyjne nie ujawniają aplikacji faktu
        dostarczenia pusha — gdy Samply przekaże komunikat do Apple lub
        Google, samo dostarczenie staje się nieprzejrzyste. Jedynym
        sygnałem «odebrano», który aplikacja Samply Research może
        zapisać, jest sytuacja, gdy aplikacja jest otwarta na pierwszym
        planie w momencie nadejścia, co w normalnym użyciu zdarza się
        rzadko. Pokazywanie tego jako etapu dostarczenia drastycznie
        zaniżyłoby rzeczywistą dostawę i prowadziło do mylnych działań
        naprawczych. Lejek przedstawia więc trzy sygnały, które są
        wiarygodne: wysłanie, tap, ukończenie.
      </Callout>

      <h2>Panel 4 — Rozkład czasów odpowiedzi</h2>
      <p>
        Histogram opóźnień od podpowiedzi do pierwszego tapnięcia,
        pogrupowany w przedziały &lt;&nbsp;5&nbsp;min, 5–15&nbsp;min,
        15–30&nbsp;min, 30–60&nbsp;min, 1–2&nbsp;h, 2&nbsp;h+. Nagłówek
        panelu pokazuje medianę i udział odpowiedzi poniżej 15 minut —
        powszechny próg operacyjny.
      </p>
      <p>
        Stone i współpracownicy argumentowali, że odpowiedź ESM niesie
        «moment» z EMA tylko wtedy, gdy przychodzi na tyle blisko
        podpowiedzi, że stan osoby nie zmienił się znacząco.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Różne protokoły wyznaczają linię różnie — 5 minut dla pracy
        afektywnej, 30 minut dla zachowania, czasem godzina dla projektów
        dziennikowych — dlatego Samply pokazuje rozkład zamiast narzucać
        jeden próg. Użyj go, by ustawić i obronić odcięcie stosowane w
        analizie.
      </p>

      <h2>Panel 5 — Wzorzec odpowiedzi godzinowych</h2>
      <p>
        Wykres słupkowy wskaźnika odpowiedzi według godziny dnia,
        obliczony w lokalnej strefie czasowej każdego uczestnika i
        następnie zagregowany. Słupki są kolorowe, gdy wskaźnik jest
        powyżej średniej dobowej, i szare, gdy poniżej.
      </p>
      <p>
        Zgodność według pory dnia to udokumentowane źródło dobowego
        obciążenia próby: jeśli wskaźnik odpowiedzi spada wieczorem,
        twoja próba wieczorna jest stronnicza w kierunku tego, co
        przewiduje dostępność wieczorem.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Użyj tego panelu, by dostrzec godziny, w których pobieranie
        próbek faktycznie się załamuje, i albo dostosuj okno
        harmonogramu, albo odpowiednio zważ analizę.
      </p>

      <h2>Panel 6 — Wydajność według harmonogramu</h2>
      <p>
        Jeden wiersz na każdy zdefiniowany harmonogram powiadomień w
        badaniu, z polami <strong>wysłane</strong>,{" "}
        <strong>otwarte</strong> i <strong>zgodność</strong>. Wiersz
        oznaczony jako <em>(harmonogram nieprzypisany)</em> agreguje
        wyniki wysłane zanim Samply zaczął przypisywać każdy dokument
        Result do harmonogramu źródłowego — te wiersze nie mają
        powiązania z konfiguracją i są grupowane razem.
      </p>
      <p>
        Porównanie harmonogramów stałych, losowych i zdarzeniowych w
        ramach jednego badania to jedno z niewielu miejsc, gdzie
        literatura jest jednoznaczna.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Użyj tego panelu, aby zidentyfikować harmonogramy, które
        wypadają poniżej innych — harmonogram debriefingu na końcu
        badania zwykle będzie znacznie niżej niż dzienne — i aby
        zdecydować, czy różnica odzwierciedla obciążenie uczestnika,
        treść czy czas.
      </p>

      <h2>Panel 7 — Zgodność według uczestnika</h2>
      <p>
        Sortowalna i filtrowalna tabela każdego aktywnego uczestnika, z{" "}
        <strong>wysłane</strong>, <strong>otwarte</strong>,{" "}
        <strong>zgodność&nbsp;%</strong> i{" "}
        <strong>ostatnia aktywność</strong>. Wiersze poniżej
        konfigurowalnego progu (domyślnie 60&nbsp;%) są oznaczone
        kolorem koralowym.
      </p>
      <p>
        Średnie grupowe ukrywają uczestników, którzy faktycznie wymagają
        interwencji. Badanie ze średnią 73&nbsp;% może spokojnie
        zawierać uczestników na poziomie 20&nbsp;%, których dane są
        niewiarygodne, oraz uczestników na 95&nbsp;%, którzy ciągną
        średnią w górę — ich łączenie daje jedną liczbę, która nie
        nadaje się do działania.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Użyj tej tabeli, by wysyłać ukierunkowane przypomnienia,
        zdecydować, których uczestników wykluczyć z próby analitycznej,
        albo po prostu wiedzieć, z kim się skontaktować, zanim
        rezygnacja stanie się trwała.
      </p>

      <h2>Czego ten panel <em>nie</em> robi</h2>
      <p>
        Cztery uczciwe ograniczenia, wymienione od razu, ponieważ kształtują
        sposób, w jaki należy czytać każdy panel powyżej:
      </p>
      <dl>
        <dt>Czas odpowiedzi — tak. Trafność treści odpowiedzi — nie.</dt>
        <dd>
          Niedbałe odpowiadanie, straight-lining i nieuważne odpowiedzi
          nie są wykrywane. Te sprawdzenia pozostają po stronie analityka.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Sygnały są ważone jednakowo.</dt>
        <dd>
          Minutowy poranny ping i dziesięciominutowy wieczorny dziennik
          liczą się tak samo w liczniku zgodności. Czy ważyć według
          obciążenia, długości ankiety czy zamysłu projektu pozostaje
          otwartym pytaniem metodologicznym.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Brak inferencyjnego testu MNAR.</dt>
        <dd>
          Panel pokazuje, czego brakuje i kiedy zniknęło, ale braki
          nielosowe (MNAR) wciąż muszą być traktowane analitycznie. Pole
          nie ma uzgodnionej metody.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Wartości domyślne kodują pozycję.</dt>
        <dd>
          Próg niskiej zgodności 60&nbsp;% to wybór metodologiczny, nie
          stała przyrody. Jest konfigurowalny w każdym badaniu, ale
          wartość domyślna nadal kształtuje to, co zauważasz — traktuj go
          jako punkt wyjścia, nie regułę.
        </dd>
      </dl>

      <h2>Drill-down i eksport</h2>
      <p>
        Kliknij dowolny wiersz uczestnika w Panelu 7, aby przejść do
        historii odpowiedzi tej osoby. W przypadku analiz, które
        wymagają surowych znaczników czasu i dziennika zdarzeń, użyj
        akcji <strong>Eksportuj CSV</strong> w zakładce Historia —
        każda agregacja w Analityce jest odtwarzalna z tego zrzutu w
        twoim własnym środowisku statystycznym.
      </p>

      <h2>Cytowana literatura</h2>
      <References />
    </>
  );
}

function AnalyticsContentTr() {
  return (
    <>
      <p>
        Herhangi bir çalışmanın içinden <strong>Analytics</strong>{" "}sekmesini
        açın ve çalışma sürerken — uyum, yanıt süreleri, terk ve
        katılımcı bazlı etkileşim — performansı tek bir ekranda görün.
        Paneller, jenerik ürün analizi şablonları yerine ESM veri
        kalitesine yönelik belgelenmiş tehditler etrafında tasarlanmıştır:
        her grafik, metodolojik literatürün izlenmeye değer bulduğu bir
        yapıya karşılık gelir — sonradan CSV dışa aktarmadan hesaplanacak
        bir şey değil.
      </p>

      <Callout>
        Analytics çalışmayı her beş dakikada bir sorgular. Katılımcılar
        hâlâ yanıtlarken sayılar güncellenir — bir şeyin ters gittiğini
        görmek için verinin bitmesini beklemenize gerek yok.
      </Callout>

      <h2>Neden izlemeli?</h2>
      <p>
        Deneyim örnekleme (ESM) ve ekolojik anlık değerlendirme (EMA),
        günler boyunca yerinde yapılan tekrarlı öz-raporlamalara dayanır.
        Literatürdeki dört bulgu, gerçek zamanlı izlemeyi yalnızca bir
        kolaylıktan fazlası yapar:
      </p>
      <dl>
        <dt>Uyum ortalamada yüksek — ve çok değişken.</dt>
        <dd>
          Yayımlanan ESM çalışmalarında uyum ortalama %70–80 civarındadır,
          ancak tek tek çalışmalar %50&rsquo;nin altından %95&rsquo;in
          üstüne kadar değişir.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          Ortalama içinizi rahatlatır, yayılma rahatlatmaz — yeni bir
          çalışmanın ortalamaya yakın çıkacağını varsayamazsınız.
        </dd>
        <dt>Terk öne ağırlıklıdır.</dt>
        <dd>
          Düşüş protokolün ilk bir ila üç gününde en diktir.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          Katılımcıları tutmak için yapacağınız her şey — hatırlatmalar,
          iletişim, takvim ayarı — o pencere içinde olmalı.
        </dd>
        <dt>Kaçırılan sinyaller rastgele değildir.</dt>
        <dd>
          Belirti şiddeti, günün saati ve sosyal bağlam, hangi
          istemlerin yanıtlanacağını yanlı kılar.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          Rastgele olmayan eksiklik (MNAR) ESM&rsquo;de istisna değil,
          varsayılan durumdur.
        </dd>
        <dt>Geç yanıtlar «anlık»ı bozar.</dt>
        <dd>
          İstemden kırk dakika sonra gelen yanıt, iki dakika içinde
          gelenden farklı bir ölçümdür.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          Gecikme dağılımı görünmeden bir eşiği ne belirleyebilir ne de
          savunabilirsiniz.
        </dd>
      </dl>

      <h2>Panel 1 — Genel bakış</h2>
      <p>
        Sayfanın üst kısmındaki dört ana sayı:{" "}
        <strong>Toplam gönderilen</strong> seçili pencerede,{" "}
        <strong>yanıt oranı</strong> (yanıtlayan ÷ gönderilen),{" "}
        <strong>ortalama gecikme</strong> istemden ilk dokunuşa kadar ve{" "}
        <strong>bugün aktif</strong> (en az bir kez yanıt vermiş
        katılımcılar). Altta 7 günlük hareketli ortalamayla günlük
        yanıt oranı zaman serisi. Pencereyi genişletmek veya daraltmak
        için sayfa başlığındaki gün seçicisini (1 / 7 / 14 / 30 / 90)
        kullanın — alttaki tüm paneller bu seçime uyar.
      </p>
      <p>
        Bunu panelin paneli olarak görün. Ana oran sağlıklı ve eğri
        düzse muhtemelen daha derine inmenize gerek yok. Eğri aşağı
        eğiliyorsa, sonraki paneller kaybın nereden geldiğini söyler.
      </p>

      <h2>Panel 2 — Tutma eğrisi</h2>
      <p>
        Takvim gününe değil, <em>göreli</em> çalışma gününe göre çizgi
        grafiği: her katılımcı kendi gün&nbsp;0&rsquo;ından sayılır. İki
        seri:
      </p>
      <ul>
        <li>
          <strong>Uygun</strong> — o göreli güne <em>ulaşacak</em> kadar
          uzun süredir kayıtlı olan katılımcılar. Bu paydadır.
        </li>
        <li>
          <strong>Aktif</strong> — o göreli günde ya da öncesinde
          gerçekten yanıt veren katılımcılar. Bu paydır.
        </li>
      </ul>
      <p>
        Göreli gün hizalaması sağkalım analizinde standarttır, ESM
        araçlarında nadirdir.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        «Protokolüm zamanla insan kaybediyor mu?» sorusunu, «kohortumun
        kopmaya zamanı oldu mu?» sorusundan ayırır — takvim günü grafiği
        bu iki soruyu birbirine karıştırır ve dolayısıyla yanlış
        yanıtlayabilir.
      </p>
      <p>
        İki çizgi arasındaki farkı o göreli gündeki terk oranı olarak
        okuyun. 1–3. günlerde genişleyen bir boşluk, literatürdeki
        öndeki ağırlıklı terk örüntüsüdür.
      </p>

      <h2>Panel 3 — Teslim hunisi</h2>
      <p>
        Seçili pencerede üç katmanlı aşama:{" "}
        <strong>gönderildi</strong> → <strong>açıldı</strong> (dokunuldu)
        → <strong>tamamlandı</strong>. Komşu aşamalar arasındaki kayıp
        mercan rengiyle vurgulanır.
      </p>
      <p>
        Huninin amacı, sıkça karıştırılan iki düzeltici eyleme
        «yanıtsızlığı» ayrıştırmaktır:
      </p>
      <dl>
        <dt>Etkileşim kaybı · gönderildi → açıldı.</dt>
        <dd>
          Push gönderildi ama katılımcı dokunmadı. Bu kayıpta birbirinden
          çok farklı iki şey saklıdır. <em>Teknik:</em> izinler iptal
          edildi, uygulama kaldırıldı, pil optimizasyonu, eskimiş push
          jetonu — bildirim cihazda hiç görünmedi.{" "}
          <em>Davranışsal:</em> bildirim göründü ama istem yorgunluğu,
          uygunsuz zamanlama veya alakasız içerik kişinin onu yok
          saymasına neden oldu. Pano, yalnızca sunucu tarafı verisiyle
          bu iki durumu ayıramaz — aşağıdaki nota bakın — bu nedenle bu
          aşama sızdırıyorsa her iki yönde çalışın: teknik durumu
          elemek için Panel 7&rsquo;de işaretlenen bir-iki katılımcıyı
          yeniden onboard edin, ardından takvim zamanını ve içeriğini
          gözden geçirin.
        </dd>
        <dt>Yarıda bırakma · açıldı → tamamlandı.</dt>
        <dd>
          Kişi bildirime dokundu ama anketi bitirmedi. Nedenler
          genellikle aracın kendisidir: çok uzun, fazla müdahaleci,
          mobilde bozuk. Eylem: aracı kısaltın veya yeniden yapılandırın.
        </dd>
      </dl>
      <Callout>
        <strong>Neden «Alındı» aşaması yok?</strong>{" "}
        Mobil işletim sistemleri push teslimini uygulamaya bildirmez —
        Samply mesajı Apple veya Google&rsquo;a teslim ettiğinde, teslim
        kendisi opaktır. Samply Research uygulamasının yazabildiği tek
        «alındı» sinyali, uygulama varış anında ön planda açıkken
        gerçekleşir; bu da normal kullanımda nadirdir. Bunu teslim
        aşaması olarak sunmak, gerçek teslimi büyük ölçüde olduğundan
        düşük gösterir ve düzeltici eylemleri yanlış yönlendirir. Huni
        bu nedenle güvenilir üç sinyali raporlar: gönderim, dokunma,
        tamamlama.
      </Callout>

      <h2>Panel 4 — Yanıt süresi dağılımı</h2>
      <p>
        İstemden ilk dokunuşa kadar gecikmelerin histogramı,
        &lt;&nbsp;5&nbsp;dk, 5–15&nbsp;dk, 15–30&nbsp;dk, 30–60&nbsp;dk,
        1–2&nbsp;sa, 2&nbsp;sa+ aralıklarında gruplanmıştır. Panel başlığı
        medyanı ve 15 dakikanın altındaki yanıtların payını gösterir —
        yaygın bir operasyonel eşik.
      </p>
      <p>
        Stone ve arkadaşları, bir ESM yanıtının EMA&rsquo;daki «anlık»ı
        taşıyabilmesi için, kişinin durumunun anlamlı biçimde
        kaymayacağı kadar isteme yakın gelmesi gerektiğini ileri sürdü.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        Farklı protokoller çizgiyi farklı çeker — duygusal çalışma için
        5 dakika, davranış için 30 dakika, günlük tasarımları için bazen
        bir saat — bu yüzden Samply tek bir eşik dayatmak yerine
        dağılımı gösterir. Analizde uygulayacağınız kesim noktasını
        belirlemek ve savunmak için kullanın.
      </p>

      <h2>Panel 5 — Saatlik yanıt örüntüsü</h2>
      <p>
        Günün saatine göre yanıt oranı çubuk grafiği, her katılımcının
        yerel saat diliminde hesaplanır ve sonra toplanır. Oran günlük
        ortalamanın üzerindeyken çubuklar renklidir, altındayken gridir.
      </p>
      <p>
        Günün saatine göre uyum, belgelenmiş bir gündüz seçim
        yanlılığı kaynağıdır: yanıt oranı akşam düşüyorsa, akşam
        örneğiniz akşamleyin erişilebilir olmayı yordayan ne varsa o
        yönde yanlıdır.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        Örneklemenin fiilen bozulduğu saatleri tespit etmek için bu
        paneli kullanın ve ya takvim penceresini ayarlayın ya da analizi
        buna göre ağırlıklandırın.
      </p>

      <h2>Panel 6 — Takvim performansı</h2>
      <p>
        Çalışmada tanımlanan her bildirim takvimi için bir satır;{" "}
        <strong>gönderilen</strong>, <strong>açılan</strong> ve{" "}
        <strong>uyum</strong> sütunlarıyla. <em>(izlenmeyen takvim)</em>
        olarak etiketlenmiş satır, Samply her Result belgesini kaynak
        takvimine bağlamaya başlamadan önce gönderilen sonuçları toplar
        — bu satırların yapılandırma bağlantısı yoktur ve birlikte
        gruplanır.
      </p>
      <p>
        Tek bir çalışma içinde sabit, rastgele ve olay bağımlı takvimleri
        karşılaştırmak, literatürün net olduğu az sayıdaki yerden
        biridir.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        Diğerlerinin altında kalan takvimleri belirlemek için bu paneli
        kullanın — örneğin çalışma sonu bilgilendirme takvimi günlük
        olanların oldukça altında olur — ve farkın katılımcı yükünü,
        içeriği veya zamanlamayı yansıtıp yansıtmadığına karar verin.
      </p>

      <h2>Panel 7 — Katılımcı uyumu</h2>
      <p>
        Her aktif katılımcının sıralanabilir ve filtrelenebilir
        tablosu; <strong>gönderilen</strong>, <strong>açılan</strong>,{" "}
        <strong>uyum&nbsp;%</strong> ve <strong>son aktif</strong>{" "}
        sütunlarıyla. Yapılandırılabilir eşik (varsayılan %60) altındaki
        satırlar mercan rengiyle işaretlenir.
      </p>
      <p>
        Grup ortalamaları, gerçekten müdahale gereken katılımcıları
        gizler. %73 ortalaması olan bir çalışma pekâlâ verisi
        güvenilmez %20&rsquo;deki katılımcıları ve ortalamayı taşıyan
        %95&rsquo;teki katılımcıları içerebilir — onları toplamak,
        eyleme dökülemeyen tek bir sayı üretir.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        Hedefli hatırlatmalar göndermek, hangi katılımcıların analitik
        örnekten çıkarılacağına karar vermek veya terk kalıcı hâle
        gelmeden önce kiminle iletişime geçeceğinizi bilmek için bu
        tabloyu kullanın.
      </p>

      <h2>Bu panonun <em>yapmadığı</em> şeyler</h2>
      <p>
        Yukarıdaki her paneli nasıl okumanız gerektiğini şekillendirdiği
        için baştan belirtilen dört dürüst sınırlama:
      </p>
      <dl>
        <dt>Yanıt süresi evet. Yanıt içerik geçerliliği hayır.</dt>
        <dd>
          Özensiz yanıtlama, düz çizgi yanıtlama ve dikkatsiz yanıtlar
          tespit edilmez. Bu kontroller analistin sorumluluğundadır.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>Sinyaller eşit ağırlıklıdır.</dt>
        <dd>
          Bir dakikalık sabah pingi ile on dakikalık akşam günlüğü uyum
          payında aynı sayılır. Katılımcı yüküne, anket uzunluğuna veya
          tasarım niyetine göre ağırlıklandırma yapılıp yapılmayacağı
          açık bir metodolojik sorudur.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>Çıkarımsal MNAR testi yok.</dt>
        <dd>
          Pano neyin eksik olduğunu ve ne zaman eksildiğini gösterir,
          ancak rastgele olmayan eksiklik (MNAR) hâlâ analitik olarak
          ele alınmalıdır. Alanın üzerinde uzlaşılmış bir yöntem yok.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>Varsayılan eşikler bir konumu kodlar.</dt>
        <dd>
          %60 düşük uyum eşiği bir doğa sabiti değil, metodolojik bir
          seçimdir. Çalışma bazında yapılandırılabilir, ama varsayılan
          yine de neyi fark edeceğinizi belirler — onu bir kural değil,
          bir başlangıç noktası olarak okuyun.
        </dd>
      </dl>

      <h2>Detaya inme ve dışa aktarma</h2>
      <p>
        Panel 7&rsquo;deki herhangi bir katılımcı satırına tıklayarak o
        kişinin yanıt geçmişine gidin. Ham zaman damgaları ve olay
        günlüğü gerektiren analizler için Geçmiş sekmesinde{" "}
        <strong>CSV Dışa Aktar</strong> eylemini kullanın — Analytics
        içindeki her toplama, kendi istatistik ortamınızda bu döküm
        üzerinden yeniden üretilebilir.
      </p>

      <h2>Atıfta bulunulan kaynaklar</h2>
      <References />
    </>
  );
}

function AnalyticsContentZh() {
  return (
    <>
      <p>
        在任何研究内打开 <strong>Analytics</strong>{" "}，即可在研究进行期间查看其表现——合规性、响应时间、流失情况和每位参与者的参与度，全部呈现在同一屏幕上。各面板围绕已记录的 ESM 数据质量风险设计，而非围绕通用的产品分析模板：每个图表都对应方法论文献中提示应当监控的一个构念，而不是事后通过 CSV 导出再行计算的内容。
      </p>

      <Callout>
        Analytics 每五分钟轮询一次研究。参与者仍在作答时数字便会更新——无需等到数据收集结束才发现哪里出了问题。
      </Callout>

      <h2>为何需要监控？</h2>
      <p>
        经验取样（ESM）和生态瞬时评估（EMA）依赖于多日内反复进行的现场自我报告。文献中的四项发现使实时监控不仅仅是便利：
      </p>
      <dl>
        <dt>平均合规率较高——但变异巨大。</dt>
        <dd>
          已发表的 ESM 研究中，合规率平均约为 70–80&nbsp;%，但个别研究低至 50&nbsp;% 以下，高至 95&nbsp;% 以上。{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          均值令人安心，离散度并非如此——不能假设新研究会贴近平均值。
        </dd>
        <dt>流失集中在前期。</dt>
        <dd>
          下降在协议的前一至三天最为陡峭。{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          一切留住参与者的措施——提醒、联系、日程调整——都必须发生在这个窗口内。
        </dd>
        <dt>遗漏的提示并非随机。</dt>
        <dd>
          症状严重程度、时段以及社交情境都会偏向哪些提示得到回应。{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          非随机缺失（MNAR）在 ESM 中是默认情况，而非例外。
        </dd>
        <dt>晚到的回应会侵蚀「瞬时」。</dt>
        <dd>
          在提示之后四十分钟才到达的回应，与两分钟内到达的属于不同的测量。{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          没有可见的延迟分布，就无法设定或捍卫阈值。
        </dd>
      </dl>

      <h2>面板 1 — 概览</h2>
      <p>
        页面顶部的四个关键数字：所选窗口内的<strong>总发送数</strong>、<strong>响应率</strong>（已响应 ÷ 已发送）、从提示到首次点击的<strong>平均延迟</strong>，以及<strong>今日活跃</strong>（至少响应过一次的参与者）。下方是每日响应率的时间序列，附带 7 天滚动均值。使用页面头部的日范围选择器（1 / 7 / 14 / 30 / 90）放大或缩小窗口——下方所有面板都遵循此选择。
      </p>
      <p>
        将其视为「面板的面板」。如果总响应率健康且曲线平稳，通常无需深入。如果曲线下滑，后续面板会告诉你损失来自何处。
      </p>

      <h2>面板 2 — 留存曲线</h2>
      <p>
        按<em>相对</em>研究日（而非日历日）绘制的折线图：每位参与者从自己的第&nbsp;0 天起算。两条曲线：
      </p>
      <ul>
        <li>
          <strong>合格者</strong> —— 入组时间足以<em>到达</em>该相对日的参与者。这是分母。
        </li>
        <li>
          <strong>活跃者</strong> —— 在该相对日或之前实际作出回应的参与者。这是分子。
        </li>
      </ul>
      <p>
        相对日对齐在生存分析中是标准做法，在 ESM 工具中却很罕见。{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        它把「我的协议是否随时间流失人群？」与「我的队列是否有时间脱落？」这两个问题区分开——日历日图表会把这两个问题混在一起，因此可能给出错误答案。
      </p>
      <p>
        将两条线之间的差距读作该相对日的流失率。1–3 天处不断扩大的差距，正是文献中记载的前期流失模式。
      </p>

      <h2>面板 3 — 投递漏斗</h2>
      <p>
        所选窗口内的三阶段堆叠：<strong>已发送</strong> → <strong>已打开</strong>（已点击）→ <strong>已完成</strong>。相邻阶段间的下降以珊瑚色标示。
      </p>
      <p>
        漏斗的意义在于把「无回应」拆解为常被混淆的两种补救方向：
      </p>
      <dl>
        <dt>参与流失 · 已发送 → 已打开。</dt>
        <dd>
          推送已发出但参与者未点击。这一下降中藏着两件截然不同的事。<em>技术：</em>权限被撤销、应用被卸载、电池优化、推送 token 过期——通知从未在设备上出现。<em>行为：</em>通知确实出现，但提示疲劳、时机不当或内容无关致使参与者忽略它。仪表板仅凭服务器端数据无法区分这两种情形——请参阅下方注记——所以当这一阶段渗漏时，要从两个方向同时入手：重新引导面板 7 中标记的一两位参与者以排除技术原因，然后审视日程的时机与内容。
        </dd>
        <dt>放弃 · 已打开 → 已完成。</dt>
        <dd>
          参与者点击了通知但未完成问卷。原因通常出在工具本身：过长、过于打扰、移动端损坏。措施：缩短或重构工具。
        </dd>
      </dl>
      <Callout>
        <strong>为何没有「已接收」阶段？</strong>{" "}
        移动操作系统不会向应用暴露推送的投递情况——一旦 Samply 把消息交给 Apple 或 Google，投递本身就是不透明的。Samply Research 应用唯一能写入的「已接收」信号，是消息到达时应用恰好处于前台打开状态，这在正常使用中很少见。把它当作投递阶段会大幅低估真实投递率，并误导补救方向。因此，漏斗只报告三个可靠信号：发送、点击、完成。
      </Callout>

      <h2>面板 4 — 响应时间分布</h2>
      <p>
        从提示到首次点击的延迟直方图，按 &lt;&nbsp;5&nbsp;分钟、5–15&nbsp;分钟、15–30&nbsp;分钟、30–60&nbsp;分钟、1–2&nbsp;小时、2&nbsp;小时以上分桶。面板头部显示中位数以及 15 分钟以内的响应占比——一个常见的操作阈值。
      </p>
      <p>
        Stone 等人主张，只有当回应足够接近提示、使参与者状态未发生有意义的偏移时，ESM 回应才承载 EMA 中的「瞬时」。{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        不同协议画线方式不同——情感研究 5 分钟、行为研究 30 分钟、日记设计有时 1 小时——所以 Samply 呈现分布而非强加单一阈值。用它来设定并捍卫分析时所用的截止值。
      </p>

      <h2>面板 5 — 时段响应模式</h2>
      <p>
        按每位参与者所在本地时区计算的小时响应率柱状图，然后汇总。柱体在响应率高于全天平均时为彩色，低于时为灰色。
      </p>
      <p>
        按时段统计的合规性是已记录的昼夜选择偏差来源：若傍晚的响应率下滑，你的傍晚样本就偏向那些预测「傍晚可获得」的人群。{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        用此面板定位采样实际上失效的小时段，并相应地调整日程窗口或对分析加权。
      </p>

      <h2>面板 6 — 各日程的表现</h2>
      <p>
        研究中定义的每个通知日程一行，包含<strong>已发送</strong>、<strong>已打开</strong>和<strong>合规性</strong>。被标记为<em>（未追踪日程）</em>的行汇总了 Samply 开始把每条 Result 文档归属到其源日程之前所发送的结果——这些行没有配置链接，因此被合并在一起。
      </p>
      <p>
        在同一研究内比较固定、随机与事件触发日程，是文献中少数明确建议查看的地方。{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        利用此面板识别表现不及其他的日程——例如研究结束时的总结日程通常会远低于日常日程——并判断差异反映的是参与者负担、内容还是时机。
      </p>

      <h2>面板 7 — 参与者合规性</h2>
      <p>
        每位活跃参与者的可排序、可筛选表格，包含<strong>已发送</strong>、<strong>已打开</strong>、<strong>合规&nbsp;%</strong>和<strong>最近活跃</strong>。低于可配置阈值（默认 60&nbsp;%）的行以珊瑚色标示。
      </p>
      <p>
        群体均值掩盖了真正需要干预的人。一项 73&nbsp;% 平均合规率的研究完全可能包含数据不可靠的 20&nbsp;% 参与者，以及拉高均值的 95&nbsp;% 参与者——把他们合并只会得到一个无法据以行动的数字。{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        使用此表发送有针对性的提醒、决定哪些参与者应排除在分析样本之外，或在流失变得不可逆之前知道该联系谁。
      </p>

      <h2>本仪表板<em>不</em>做的事</h2>
      <p>
        四项坦诚的局限，因为它们塑造你阅读上述每个面板的方式，所以先行列出：
      </p>
      <dl>
        <dt>响应时间可以，回应内容效度不可以。</dt>
        <dd>
          草率作答、单调直线作答与不专心作答不会被检测出来。这些检查仍由分析者负责。{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>每个信号同等加权。</dt>
        <dd>
          一分钟的早晨 ping 与十分钟的傍晚日记在合规性分子中权重相同。是否按负担、问卷长度或设计意图加权，仍是开放的方法学问题。{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>没有 MNAR 推断检验。</dt>
        <dd>
          仪表板呈现缺失了什么以及何时缺失，但非随机缺失（MNAR）仍需在分析中处理。该领域尚无共识方法。{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>默认阈值编码了一种立场。</dt>
        <dd>
          60&nbsp;% 的低合规阈值是方法论上的选择，而非自然常数。它可按研究配置，但默认值仍塑造你注意到什么——请把它当作起点，而非规则。
        </dd>
      </dl>

      <h2>钻取与导出</h2>
      <p>
        在面板 7 点击任一参与者行，跳转到该参与者的回应历史。需要原始时间戳与事件日志的分析，请在「历史」选项卡使用<strong>导出 CSV</strong>操作——Analytics 中的每一项聚合都可在你自己的统计环境中从该转储复现。
      </p>

      <h2>引用文献</h2>
      <References />
    </>
  );
}

function AnalyticsContentKo() {
  return (
    <>
      <p>
        어떤 연구에서든 <strong>Analytics</strong>{" "}를 열면, 연구가 진행 중인 동안 — 준수율, 응답 시간, 이탈, 참가자별 참여도 — 의 상황을 한 화면에서 볼 수 있습니다. 패널은 일반적인 제품 분석 템플릿이 아니라, ESM 데이터 품질에 대한 문헌상의 위협 요인을 중심으로 설계되어 있습니다. 각 차트는 방법론 문헌이 모니터링해야 한다고 지적하는 구성 개념에 대응하며, 사후에 CSV 내보내기로 계산할 수 있는 것이 아닙니다.
      </p>

      <Callout>
        Analytics는 연구를 5분마다 폴링합니다. 참가자가 여전히 응답하는 동안에도 숫자가 갱신되므로, 무언가 잘못되고 있는지 확인하기 위해 수집이 끝날 때까지 기다릴 필요가 없습니다.
      </Callout>

      <h2>왜 모니터링해야 하는가?</h2>
      <p>
        경험표집법(ESM)과 생태순간평가(EMA)는 여러 날에 걸쳐 현장에서 반복적으로 수행되는 자기보고에 의존합니다. 문헌의 네 가지 발견은 실시간 모니터링을 단순한 편의 이상으로 만듭니다:
      </p>
      <dl>
        <dt>준수율은 평균적으로 높지만 변동이 매우 큽니다.</dt>
        <dd>
          출판된 ESM 연구에서 평균 준수율은 약 70–80&nbsp;%지만 개별 연구는 50&nbsp;% 미만에서 95&nbsp;% 초과까지 다양합니다.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          평균은 안심이 되지만 분산은 그렇지 않습니다 — 새 연구가 평균에 가까울 거라고 가정할 수 없습니다.
        </dd>
        <dt>이탈은 초기에 집중됩니다.</dt>
        <dd>
          하락은 프로토콜의 처음 1–3일에 가장 가파릅니다.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          참가자를 붙잡기 위해 하는 모든 일 — 알림, 연락, 일정 조정 — 은 그 창 안에서 일어나야 합니다.
        </dd>
        <dt>놓친 신호는 무작위가 아닙니다.</dt>
        <dd>
          증상 심각도, 시간대, 사회적 맥락은 모두 어떤 프롬프트에 응답하는지를 편향시킵니다.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          비무작위 결측(MNAR)은 ESM에서 예외가 아니라 기본 사례입니다.
        </dd>
        <dt>늦은 응답은 「순간」을 훼손합니다.</dt>
        <dd>
          프롬프트 40분 뒤에 도착한 응답은 2분 안에 도착한 응답과 다른 측정입니다.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          지연 분포를 드러내지 않고는 임계값을 설정하거나 방어할 수 없습니다.
        </dd>
      </dl>

      <h2>패널 1 — 개요</h2>
      <p>
        페이지 상단의 네 가지 핵심 수치: 선택한 창의 <strong>총 발송</strong>, <strong>응답률</strong>(응답 ÷ 발송), 프롬프트에서 첫 탭까지의 <strong>평균 지연</strong>, 그리고 <strong>오늘 활성</strong>(최소 한 번 이상 응답한 참가자). 그 아래에는 7일 이동 평균이 함께 표시되는 일별 응답률 시계열이 있습니다. 페이지 머리글의 기간 선택기(1 / 7 / 14 / 30 / 90)로 창을 넓히거나 좁힐 수 있으며, 아래 모든 패널이 이 선택을 따릅니다.
      </p>
      <p>
        이를 「대시보드를 위한 대시보드」로 보십시오. 주요 비율이 건강하고 곡선이 평탄하다면 더 깊이 파고들 필요가 없을 것입니다. 곡선이 하강한다면 다음 패널들이 손실이 어디서 오는지 알려줄 것입니다.
      </p>

      <h2>패널 2 — 유지 곡선</h2>
      <p>
        달력일이 아닌 <em>상대</em> 연구일 기준의 선 그래프: 각 참가자는 자신의 0일부터 셉니다. 두 계열:
      </p>
      <ul>
        <li>
          <strong>적격</strong> — 해당 상대일에 <em>도달</em>할 만큼 충분히 등록된 참가자. 이는 분모입니다.
        </li>
        <li>
          <strong>활성</strong> — 해당 상대일 또는 그 이전에 실제로 응답한 참가자. 이는 분자입니다.
        </li>
      </ul>
      <p>
        상대일 정렬은 생존 분석에서는 표준이지만 ESM 도구에서는 드뭅니다.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        이는 「내 프로토콜이 시간이 지나면서 사람을 잃고 있는가?」라는 질문을 「내 코호트가 이탈할 시간이 있었는가?」라는 질문과 분리합니다 — 달력일 도표는 이 두 질문을 뒤섞어 잘못 답할 수 있습니다.
      </p>
      <p>
        두 선 사이의 간격을 해당 상대일의 이탈률로 읽으십시오. 1–3일에 벌어지는 간격은 문헌에서 보고된 초기 이탈 패턴입니다.
      </p>

      <h2>패널 3 — 전달 깔때기</h2>
      <p>
        선택한 창에 대한 세 단계 누적: <strong>발송</strong> → <strong>열림</strong>(탭) → <strong>완료</strong>. 인접 단계 사이의 감소는 산호색으로 표시됩니다.
      </p>
      <p>
        깔때기의 목적은 「무응답」을 자주 혼동되는 두 가지 시정 행동으로 분해하는 것입니다:
      </p>
      <dl>
        <dt>참여 손실 · 발송 → 열림.</dt>
        <dd>
          푸시는 나갔지만 참가자가 탭하지 않은 경우입니다. 이 손실에는 매우 다른 두 가지가 숨어 있습니다. <em>기술적:</em> 권한 해제, 앱 제거, 배터리 최적화, 만료된 푸시 토큰 — 알림이 기기에 전혀 나타나지 않은 경우. <em>행동적:</em> 알림은 나타났지만 프롬프트 피로, 부적절한 시점, 무관한 콘텐츠로 인해 무시된 경우. 대시보드는 서버 데이터만으로 이 둘을 구분할 수 없으므로 — 아래 주석 참조 — 이 단계에서 누수가 있다면 양면으로 작업하십시오: 기술적 사례를 배제하기 위해 패널 7에서 표시된 참가자 한두 명을 다시 온보딩한 다음, 일정 시점과 콘텐츠를 검토하십시오.
        </dd>
        <dt>중도 포기 · 열림 → 완료.</dt>
        <dd>
          참가자가 알림을 탭했지만 설문을 끝내지 않은 경우입니다. 원인은 보통 도구 자체에 있습니다: 너무 길거나, 너무 침습적이거나, 모바일에서 깨져 있는 경우. 조치: 도구를 줄이거나 재구성하십시오.
        </dd>
      </dl>
      <Callout>
        <strong>왜 「수신」 단계가 없는가?</strong>{" "}
        모바일 운영체제는 푸시 전달을 앱에 노출하지 않습니다 — Samply가 메시지를 Apple이나 Google에 넘기는 순간 전달 자체는 불투명해집니다. Samply Research 앱이 기록할 수 있는 유일한 「수신」 신호는 도착 시점에 앱이 우연히 전경에서 열려 있을 때뿐이며, 일반적인 사용에서는 드문 일입니다. 이를 전달 단계로 표시하면 실제 전달을 크게 과소평가하고 시정 조치를 오도하게 됩니다. 따라서 깔때기는 신뢰할 수 있는 세 가지 신호 — 발송, 탭, 완료 — 를 보고합니다.
      </Callout>

      <h2>패널 4 — 응답 시간 분포</h2>
      <p>
        프롬프트에서 첫 탭까지의 지연 히스토그램으로, &lt;&nbsp;5&nbsp;분, 5–15&nbsp;분, 15–30&nbsp;분, 30–60&nbsp;분, 1–2&nbsp;시간, 2&nbsp;시간 이상으로 구간을 나눕니다. 패널 헤더는 중앙값과 15분 이내 응답 비율 — 흔히 사용되는 운영 임계값 — 을 보여줍니다.
      </p>
      <p>
        Stone과 동료들은 ESM 응답이 EMA의 「순간」을 담으려면, 참가자의 상태가 의미 있게 변하지 않을 만큼 프롬프트에 가까이 도착해야 한다고 주장했습니다.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        프로토콜마다 선을 다르게 긋습니다 — 정서 연구는 5분, 행동 연구는 30분, 일기 설계는 때때로 1시간 — 그래서 Samply는 단일 임계값을 강제하기보다 분포를 보여줍니다. 분석 시 적용할 절단값을 설정하고 방어하는 데 사용하십시오.
      </p>

      <h2>패널 5 — 시간대별 응답 패턴</h2>
      <p>
        각 참가자의 현지 시간대로 계산한 뒤 집계한, 시간대별 응답률 막대 차트. 응답률이 일일 평균을 넘으면 막대는 색이 칠해지고, 평균보다 낮으면 회색입니다.
      </p>
      <p>
        시간대별 준수율은 일주기 선택 편향의 문서화된 원인입니다: 저녁 응답률이 떨어지면, 저녁 표본은 「저녁에 응답 가능함」을 예측하는 변수 방향으로 편향됩니다.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        이 패널을 사용해 표집이 사실상 무너지는 시간대를 포착하고, 일정 창을 조정하거나 분석을 그에 맞게 가중하십시오.
      </p>

      <h2>패널 6 — 일정별 성과</h2>
      <p>
        연구에 정의된 각 알림 일정별로 한 행씩, <strong>발송</strong>, <strong>열림</strong>, <strong>준수</strong>를 표시합니다. <em>(추적되지 않은 일정)</em>으로 표시된 행은 Samply가 각 Result 문서를 원본 일정에 귀속시키기 시작하기 전에 발송된 결과를 합산한 것입니다 — 이 행들은 구성 링크가 없어 함께 묶입니다.
      </p>
      <p>
        한 연구 안에서 고정·무작위·사건 의존 일정을 비교하는 것은 문헌이 명확하게 의견을 내놓는 몇 안 되는 지점입니다.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        이 패널을 이용해 다른 일정보다 부진한 일정을 식별하십시오 — 예컨대 연구 종료 시점의 디브리핑 일정은 종종 일일 일정보다 훨씬 낮게 나옵니다 — 그리고 그 차이가 참가자 부담, 콘텐츠, 시점 중 어느 것을 반영하는지 판단하십시오.
      </p>

      <h2>패널 7 — 참가자별 준수율</h2>
      <p>
        활성 참가자 전원을 정렬·필터할 수 있는 표로, <strong>발송</strong>, <strong>열림</strong>, <strong>준수&nbsp;%</strong>, <strong>마지막 활동</strong>을 포함합니다. 구성 가능한 임계값(기본 60&nbsp;%) 아래 행은 산호색으로 표시됩니다.
      </p>
      <p>
        그룹 평균은 실제로 개입이 필요한 참가자를 가립니다. 평균 73&nbsp;% 인 연구도 데이터가 신뢰할 수 없는 20&nbsp;% 참가자와 평균을 끌어올리는 95&nbsp;% 참가자를 동시에 담을 수 있으며 — 이들을 묶으면 행동에 옮길 수 없는 단일 숫자만 남습니다.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        이 표를 활용해 표적화된 알림을 보내고, 분석 표본에서 제외할 참가자를 결정하거나, 이탈이 영구적이 되기 전에 연락할 대상을 파악하십시오.
      </p>

      <h2>이 대시보드가 <em>하지 않는</em> 일</h2>
      <p>
        위 각 패널을 어떻게 읽어야 할지 좌우하므로, 네 가지 솔직한 한계를 먼저 밝힙니다:
      </p>
      <dl>
        <dt>응답 시간은 다루지만 응답 내용 타당도는 다루지 않습니다.</dt>
        <dd>
          부주의한 응답, 동일 척도 응답, 주의가 산만한 응답은 감지하지 않습니다. 이러한 점검은 분석자의 몫으로 남습니다.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>모든 신호에 동일한 가중치가 부여됩니다.</dt>
        <dd>
          1분짜리 아침 핑과 10분짜리 저녁 일기는 준수율 분자에서 같은 무게로 셉니다. 참가자 부담, 설문 길이, 설계 의도에 따라 가중할지 여부는 여전히 열린 방법론적 문제입니다.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>추론적 MNAR 검정이 없습니다.</dt>
        <dd>
          대시보드는 무엇이 누락되었고 언제 누락되었는지를 보여주지만, 비무작위 결측(MNAR)은 여전히 분석 단계에서 처리해야 합니다. 이 분야에는 합의된 방법이 없습니다.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>기본 임계값은 입장을 담고 있습니다.</dt>
        <dd>
          60&nbsp;% 의 낮은 준수율 임계값은 방법론적 선택이지 자연 상수가 아닙니다. 연구별로 구성할 수 있지만, 기본값은 여전히 무엇을 알아차릴지를 형성합니다 — 규칙이 아니라 출발점으로 읽으십시오.
        </dd>
      </dl>

      <h2>드릴다운 및 내보내기</h2>
      <p>
        패널 7의 참가자 행을 클릭하면 해당 참가자의 응답 기록으로 이동합니다. 원시 타임스탬프와 이벤트 로그가 필요한 분석에는 「기록」 탭의 <strong>CSV 내보내기</strong> 동작을 사용하십시오 — Analytics의 모든 집계는 그 덤프에서 사용자 자신의 통계 환경으로 재현할 수 있습니다.
      </p>

      <h2>인용한 참고문헌</h2>
      <References />
    </>
  );
}

function AnalyticsContentJa() {
  return (
    <>
      <p>
        任意の研究内から <strong>Analytics</strong>{" "}を開くと、研究が進行中の段階で — コンプライアンス、回答時間、離脱、参加者ごとのエンゲージメント — を一つの画面で確認できます。パネルは汎用的なプロダクト・アナリティクスのテンプレートではなく、ESM データ品質に対する文献上の脅威を中心に設計されています。各図は、方法論文献が監視すべきと指摘する構成概念に対応するものであり、CSV エクスポートから後で計算するための数値ではありません。
      </p>

      <Callout>
        Analytics は 5 分ごとに研究をポーリングします。参加者が回答を続けている間も数値は更新されます — 不具合があるかどうかを知るために収集の終わりを待つ必要はありません。
      </Callout>

      <h2>なぜモニタリングするのか？</h2>
      <p>
        経験サンプリング法（ESM）と生態学的瞬時評価（EMA）は、何日にもわたって現場で繰り返される自己報告に依存します。文献からの 4 つの知見は、リアルタイム監視を単なる利便性以上のものにします：
      </p>
      <dl>
        <dt>コンプライアンスは平均的に高い — そして大きくばらつく。</dt>
        <dd>
          公表された ESM 研究では平均コンプライアンスはおよそ 70–80&nbsp;% ですが、個々の研究は 50&nbsp;% 未満から 95&nbsp;% 超まで広がっています。{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          平均は安心材料ですが、散らばりはそうではありません — 新しい研究が平均近くに収まると仮定することはできません。
        </dd>
        <dt>離脱は初期に集中する。</dt>
        <dd>
          減少はプロトコルの最初の 1〜3 日で最も急峻です。{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          参加者を引き留めるための施策 — リマインダー、連絡、スケジュール調整 — は、そのウィンドウ内に起こす必要があります。
        </dd>
        <dt>取りこぼされた合図はランダムではない。</dt>
        <dd>
          症状の重症度、時刻、社会的文脈はいずれも、どのプロンプトが回答されるかを偏らせます。{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          非ランダム欠測（MNAR）は ESM では既定のケースであり、例外ではありません。
        </dd>
        <dt>遅い回答は「瞬時」を損なう。</dt>
        <dd>
          プロンプトから 40 分後に届く回答は、2 分以内に届くものとは異なる測定です。{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          遅延の分布を可視化しなければ、閾値を設定することも擁護することもできません。
        </dd>
      </dl>

      <h2>パネル 1 — 概要</h2>
      <p>
        ページ上部の 4 つの主要数値：選択ウィンドウ内の <strong>合計送信数</strong>、<strong>回答率</strong>（回答 ÷ 送信）、プロンプトから初回タップまでの <strong>平均遅延</strong>、そして <strong>本日アクティブ</strong>（少なくとも 1 回回答した参加者）。その下には 7 日移動平均付きの日次回答率の時系列。ページ見出しの期間セレクタ（1 / 7 / 14 / 30 / 90）でウィンドウを広げ・狭めることができ、以下のすべてのパネルがこの選択に従います。
      </p>
      <p>
        これを「ダッシュボードのためのダッシュボード」と捉えてください。主要レートが健全で曲線が平坦であれば、深掘りはおそらく不要です。曲線が下降している場合、続くパネルがどこから損失が来ているかを教えてくれます。
      </p>

      <h2>パネル 2 — リテンション曲線</h2>
      <p>
        暦日ではなく <em>相対</em> 研究日による折れ線グラフ：各参加者は自分自身の 0 日目から数えます。2 系列：
      </p>
      <ul>
        <li>
          <strong>適格</strong> — その相対日に <em>到達</em> できるだけ十分に長く参加している参加者。これが分母です。
        </li>
        <li>
          <strong>アクティブ</strong> — その相対日またはそれ以前に実際に回答した参加者。これが分子です。
        </li>
      </ul>
      <p>
        相対日アラインメントは生存分析では標準ですが、ESM ツールでは稀です。{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        これは「私のプロトコルは時間と共に人を失っているのか？」という問いと、「私のコホートに離脱する時間があったのか？」という問いを分離します — 暦日のプロットはこの二つを混同し、誤った答えに導く可能性があります。
      </p>
      <p>
        2 本の線の差をその相対日の離脱率として読んでください。1〜3 日目に広がるギャップは、文献に記された初期離脱パターンです。
      </p>

      <h2>パネル 3 — 配信ファネル</h2>
      <p>
        選択ウィンドウに対する 3 段階の積層：<strong>送信</strong> → <strong>開封</strong>（タップ）→ <strong>完了</strong>。隣接段階間の減少はコーラル色で強調されます。
      </p>
      <p>
        ファネルの目的は、しばしば混同される 2 つの是正策に「無回答」を分解することです：
      </p>
      <dl>
        <dt>エンゲージメント損失 · 送信 → 開封。</dt>
        <dd>
          プッシュは送られたが参加者がタップしなかったケース。この損失には、まったく異なる 2 つの事象が潜んでいます。<em>技術的：</em>権限の取り消し、アプリのアンインストール、バッテリー最適化、古いプッシュトークン — 通知が端末に現れなかった場合。<em>行動的：</em>通知は現れたが、プロンプト疲労、不適切なタイミング、関連性の低い内容により参加者が無視した場合。ダッシュボードはサーバーデータだけではこの二つを分離できません — 下の注記参照 — そのため、この段階で漏れがあるときは両面から取り組んでください：技術的ケースを除外するためにパネル 7 でフラグされた 1〜2 名を再オンボーディングし、その後にスケジュールのタイミングと内容を見直します。
        </dd>
        <dt>放棄 · 開封 → 完了。</dt>
        <dd>
          参加者は通知をタップしたが、アンケートを完了しなかったケース。原因は通常、計測手段そのものにあります：長すぎる、過度に侵襲的、モバイルで壊れている。アクション：計測手段を短くするか、再構成してください。
        </dd>
      </dl>
      <Callout>
        <strong>なぜ「受信」段階がないのか？</strong>{" "}
        モバイル OS はアプリにプッシュ配信を通知しません — Samply がメッセージを Apple や Google に渡した瞬間、配信そのものは不透明になります。Samply Research アプリが書き込める唯一の「受信」シグナルは、到着時にアプリがたまたまフォアグラウンドで開いていた場合のみで、通常の利用では稀です。これを配信段階として示すと、実際の配信を大幅に過小評価し、是正策を誤導してしまいます。したがってファネルは信頼できる 3 つのシグナル — 送出、タップ、完了 — を報告します。
      </Callout>

      <h2>パネル 4 — 応答時間分布</h2>
      <p>
        プロンプトから初回タップまでの遅延ヒストグラム。区分は &lt;&nbsp;5&nbsp;分、5–15&nbsp;分、15–30&nbsp;分、30–60&nbsp;分、1–2&nbsp;時間、2&nbsp;時間以上。パネルヘッダーは中央値と、15 分以内に回答された割合 — 一般的な運用上の閾値 — を示します。
      </p>
      <p>
        Stone らは、ESM 回答が EMA の「瞬時」を担うのは、参加者の状態が有意に変化していないと言える程度にプロンプトに近いタイミングで届く場合だけだと論じました。{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        プロトコルによって線引きは異なります — 感情研究では 5 分、行動研究では 30 分、日記設計では時に 1 時間 — そのため Samply は単一の閾値を強制せず分布を示します。分析時に適用する切り取り値を設定し、それを擁護するために使ってください。
      </p>

      <h2>パネル 5 — 時間帯別応答パターン</h2>
      <p>
        各参加者のローカルタイムゾーンで計算してから集計した、時間帯ごとの応答率の棒グラフ。応答率が日平均を上回るときは色付きの棒、下回るときはグレーの棒で表示されます。
      </p>
      <p>
        時間帯別コンプライアンスは、文献に記された日周選択バイアスの源です：夕方に応答率が落ちる場合、夕方サンプルは「夕方に利用可能」を予測するものへ偏ります。{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        このパネルでサンプリングが事実上崩れる時間帯を見つけ、スケジュールのウィンドウを調整するか、分析でそれに応じた重み付けを行ってください。
      </p>

      <h2>パネル 6 — スケジュール別パフォーマンス</h2>
      <p>
        研究で定義された各通知スケジュールに対し 1 行ずつ、<strong>送信</strong>、<strong>開封</strong>、<strong>コンプライアンス</strong> を表示します。<em>(追跡されていないスケジュール)</em> とラベル付けされた行は、Samply が各 Result ドキュメントを発生元のスケジュールに帰属させ始める前に送られた結果を集約したものです — これらの行には設定への紐づけがなく、まとめてグループ化されます。
      </p>
      <p>
        単一の研究内で固定・ランダム・イベント随伴スケジュールを比較することは、文献が明確な指針を示している数少ない箇所のひとつです。{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        このパネルを使って他より低調なスケジュールを特定してください — たとえば研究終了時のデブリーフィング・スケジュールはしばしば日次のものをかなり下回ります — そしてその差が参加者負担、内容、タイミングのどれを反映するのかを判断してください。
      </p>

      <h2>パネル 7 — 参加者別コンプライアンス</h2>
      <p>
        すべてのアクティブな参加者をソート・フィルタ可能な表で、<strong>送信</strong>、<strong>開封</strong>、<strong>コンプライアンス&nbsp;%</strong>、<strong>最終アクティビティ</strong> を含みます。構成可能な閾値（既定 60&nbsp;%）を下回る行はコーラル色でフラグされます。
      </p>
      <p>
        グループ平均は、実際に介入が必要な参加者を隠します。平均 73&nbsp;% の研究にも、データが信頼できない 20&nbsp;% の参加者と、平均を引き上げている 95&nbsp;% の参加者が共存していて、彼らをまとめると行動に移せない単一の数字しか得られません。{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        この表を使って、的を絞ったリマインダーを送り、分析サンプルから除外する参加者を決定し、あるいは離脱が恒久化する前に連絡すべき相手を把握してください。
      </p>

      <h2>このダッシュボードが <em>しない</em> こと</h2>
      <p>
        上記の各パネルをどう読むべきかを左右するため、率直な 4 つの限界をあらかじめ示します：
      </p>
      <dl>
        <dt>応答時間は扱う。応答内容の妥当性は扱わない。</dt>
        <dd>
          ぞんざいな回答、ストレート・ライニング、不注意な回答は検出されません。これらのチェックは分析者の責任に残ります。{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>シグナルは等しく重み付けされる。</dt>
        <dd>
          1 分の朝の ping と 10 分の夕方の日記は、コンプライアンスの分子で同じ重みです。負担、アンケート長、設計意図に応じて重み付けすべきかは、依然として方法論上の未解決問題です。{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>推測的な MNAR テストはない。</dt>
        <dd>
          ダッシュボードは何が欠けていつ欠けたかを示しますが、非ランダム欠測（MNAR）は依然として分析的に処理する必要があります。分野には合意された手法がありません。{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>既定の閾値は立場を含意する。</dt>
        <dd>
          60&nbsp;% の低コンプライアンス閾値は方法論的な選択であり、自然定数ではありません。研究ごとに設定可能ですが、既定値は依然として何に気づくかを形成します — ルールではなく出発点として読んでください。
        </dd>
      </dl>

      <h2>ドリルダウンとエクスポート</h2>
      <p>
        パネル 7 の任意の参加者行をクリックして、その参加者の回答履歴へ移動できます。生のタイムスタンプとイベントログが必要な分析には、履歴タブの <strong>CSV エクスポート</strong> アクションを使ってください — Analytics のすべての集計は、そのダンプから自分の統計環境で再現できます。
      </p>

      <h2>引用文献</h2>
      <References />
    </>
  );
}

function AnalyticsContentAr() {
  return (
    <div dir="rtl">
      <p>
        افتح <strong>Analytics</strong>{" "}من داخل أي دراسة لترى أداء الدراسة وهي لا تزال جارية — الالتزام، أوقات الاستجابة، التسرّب، والمشاركة لكل مشارك — في شاشة واحدة. صُمِّمت اللوحات حول تهديدات موثّقة لجودة بيانات ESM، لا حول قوالب تحليلات منتج عامة: كل رسم يقابل بنية تشير الأدبيات المنهجية إلى ضرورة مراقبتها، وليس شيئًا يُحسب لاحقًا من تصدير CSV.
      </p>

      <Callout>
        تستعلم Analytics عن الدراسة كل خمس دقائق. تتحدّث الأرقام بينما لا يزال المشاركون يجيبون — لا تحتاج إلى انتظار نهاية الجمع لترى ما إذا كان هناك خطأ.
      </Callout>

      <h2>لماذا المراقبة أصلًا؟</h2>
      <p>
        تعتمد منهجية أخذ عينات الخبرة (ESM) والتقييم اللحظي البيئي (EMA) على تقارير ذاتية متكرّرة في الموقع تُجمَع على مدى أيام كثيرة. تجعل أربع نتائج من الأدبيات المراقبةَ الفورية أكثر من مجرّد راحة:
      </p>
      <dl>
        <dt>الالتزام مرتفع في المتوسط — ومتغيّر بشدّة.</dt>
        <dd>
          في دراسات ESM المنشورة، يبلغ متوسط الالتزام نحو 70–80&nbsp;٪، لكن الدراسات الفردية تتراوح بين أقل من 50&nbsp;٪ وأكثر من 95&nbsp;٪.{" "}
          <Ref>Wen et al., 2017; Rintala, Wampers, Myin-Germeys &amp; Viechtbauer, 2020.</Ref>{" "}
          المتوسّط يطمئن، لكن التشتت لا — لا يمكنك افتراض أن دراسة جديدة ستكون قريبة من المتوسّط.
        </dd>
        <dt>التسرّب يتركّز في البداية.</dt>
        <dd>
          يكون الانخفاض أشدّ انحدارًا في الأيام الأولى من واحد إلى ثلاثة من البروتوكول.{" "}
          <Ref>Eisele, Vachon, Lafit et al., 2022.</Ref>{" "}
          كل ما تفعله للإبقاء على المشاركين — تذكيرات، تواصل، تعديل الجدول — يجب أن يحدث ضمن تلك النافذة.
        </dd>
        <dt>الإشارات المفقودة ليست عشوائية.</dt>
        <dd>
          شدّة الأعراض، وقت اليوم، والسياق الاجتماعي كلها تحيّز أيّ المطالبات تحظى بإجابة.{" "}
          <Ref>Vachon et al., 2019; Sokolovsky et al., 2014.</Ref>{" "}
          الفقد غير العشوائي (MNAR) هو الحالة الافتراضية في ESM لا الاستثناء.
        </dd>
        <dt>الإجابات المتأخرة تُفسد «اللحظية».</dt>
        <dd>
          الإجابة التي تصل بعد أربعين دقيقة من المطالبة هي قياس مختلف عن تلك التي تصل في غضون دقيقتين.{" "}
          <Ref>Stone et al., 2003.</Ref>{" "}
          بدون إظهار توزيع الكُمون لا يمكنك تحديد عتبة ولا الدفاع عنها.
        </dd>
      </dl>

      <h2>اللوحة 1 — نظرة عامة</h2>
      <p>
        أربعة أرقام رئيسية أعلى الصفحة: <strong>إجمالي المُرسَل</strong> في النافذة المحددة، و<strong>معدّل الاستجابة</strong> (المُجيبون ÷ المُرسَل)، و<strong>متوسط الكُمون</strong> من المطالبة إلى أول نقرة، و<strong>النشطون اليوم</strong> (المشاركون الذين أجابوا مرة واحدة على الأقل). أسفلها سلسلة زمنية لمعدّل الاستجابة اليومي مع متوسط متحرك لـ 7 أيام. استخدم مُحدِّد المدى (1 / 7 / 14 / 30 / 90) في رأس الصفحة لتوسيع النافذة أو تضييقها — تتبع جميع اللوحات أدناه هذا الاختيار.
      </p>
      <p>
        تعامل مع هذه اللوحة على أنها لوحة اللوحات. إذا كان المعدّل الرئيسي سليمًا والمنحنى مستويًا، فلن تحتاج على الأرجح إلى التعمّق. إذا انحدر المنحنى، فإن اللوحات التالية ستخبرك من أين تأتي الخسارة.
      </p>

      <h2>اللوحة 2 — منحنى الاحتفاظ</h2>
      <p>
        رسم خطّي بحسب اليوم <em>النسبي</em> للدراسة، لا اليوم التقويمي: يُحسب كل مشارك من يومه 0 الخاص. سلسلتان:
      </p>
      <ul>
        <li>
          <strong>المؤهّلون</strong> — المشاركون المسجَّلون منذ وقت كافٍ <em>للوصول</em> إلى ذلك اليوم النسبي. هذا هو المقام.
        </li>
        <li>
          <strong>النشطون</strong> — المشاركون الذين أجابوا فعلًا في ذلك اليوم النسبي أو قبله. هذا هو البسط.
        </li>
      </ul>
      <p>
        محاذاة اليوم النسبي معيارٌ في تحليل البقاء لكنها نادرة في أدوات ESM.{" "}
        <Ref>Eisele et al., 2022; Vachon et al., 2019.</Ref>{" "}
        تفصل بين سؤال «هل يفقد بروتوكولي ناسًا مع الزمن؟» وسؤال «هل أُتيح لمجموعتي الوقت للتسرّب؟» — وهما سؤالان يخلطهما رسم اليوم التقويمي وقد يُجيب عليهما خطأ.
      </p>
      <p>
        اقرأ الفجوة بين الخطّين على أنها معدّل التسرّب في ذلك اليوم النسبي. فجوة تتسع في الأيام 1–3 هي نمط التسرّب المبكّر الموثّق في الأدبيات.
      </p>

      <h2>اللوحة 3 — قُمع التسليم</h2>
      <p>
        ثلاث مراحل مكدّسة على النافذة المحدّدة: <strong>مُرسَل</strong> ← <strong>مفتوح</strong> (نُقر عليه) ← <strong>مكتمل</strong>. الانخفاض بين المراحل المتجاورة موسوم باللون المرجاني.
      </p>
      <p>
        غرض القُمع هو تفكيك «عدم الاستجابة» إلى علاجَيْن كثيرًا ما يُخلَط بينهما:
      </p>
      <dl>
        <dt>فقد المشاركة · مُرسَل ← مفتوح.</dt>
        <dd>
          خرج الإشعار لكن المشارك لم يَنقُر. يختبئ في هذا الفقد شيئان مختلفان جدًا. <em>تقني:</em> أُلغيت الأذونات، أو أُزيل التطبيق، أو حدث تحسين البطارية، أو انتهى رمز الدفع — فلم يظهر الإشعار على الجهاز أصلًا. <em>سلوكي:</em> ظهر الإشعار، لكن إرهاق المطالبات أو التوقيت غير المناسب أو محتوى غير ذي صلة جعل المشارك يتجاهله. لا يستطيع التطبيق فصل هاتين الحالتين من بيانات الخادم وحدها — انظر الملاحظة أدناه — لذا حين تتسرّب هذه المرحلة، اعمل من الجانبين: أعِد توجيه مشاركَيْن مُعلَّمَيْن في اللوحة 7 لاستبعاد الحالة التقنية، ثم راجع توقيت الجدول ومحتواه.
        </dd>
        <dt>التخلّي · مفتوح ← مكتمل.</dt>
        <dd>
          نقر المشارك على الإشعار لكنه لم يُكمل الاستبيان. الأسباب عادةً في الأداة نفسها: طويلة جدًا، أو مزعجة جدًا، أو معطوبة على الهاتف. الإجراء: تقصير الأداة أو إعادة هيكلتها.
        </dd>
      </dl>
      <Callout>
        <strong>لماذا لا توجد مرحلة «مُستلَم»؟</strong>{" "}
        لا تكشف أنظمة التشغيل المحمولة للتطبيق عن تسليم الإشعار — بمجرد تسليم Samply الرسالة إلى Apple أو Google، يصبح التسليم نفسه غير شفّاف. الإشارة الوحيدة «المُستلَمة» التي يستطيع تطبيق Samply Research تسجيلها هي عندما يصادف أن يكون التطبيق مفتوحًا في المقدّمة وقت الوصول، وهو نادر في الاستخدام الطبيعي. تقديم ذلك بوصفه مرحلة التسليم سيقلّل التسليم الفعلي إلى حدٍّ كبير ويُضلّل العلاج. لذلك يبلّغ القُمع الإشارات الثلاث الموثوقة: الإرسال، النقر، الإكمال.
      </Callout>

      <h2>اللوحة 4 — توزيع وقت الاستجابة</h2>
      <p>
        مدرّج تكراري لزمن الكُمون من المطالبة إلى أول نقرة، موزّع على فئات: أقل من 5 دقائق، 5–15، 15–30، 30–60، 1–2 ساعة، وأكثر من ساعتين. يعرض رأس اللوحة الوسيط ونسبة الاستجابات تحت 15 دقيقة — وهي عتبة تشغيلية شائعة.
      </p>
      <p>
        رأى Stone وزملاؤه أن استجابة ESM لا تحمل «اللحظية» التي يعنيها EMA إلا إذا وصلت قريبًا بما يكفي من المطالبة بحيث لا تكون حالة المشارك قد انزاحت معنويًا.{" "}
        <Ref>Stone et al., 2003; Shiffman, Stone &amp; Hufford, 2008.</Ref>{" "}
        ترسم البروتوكولات المختلفة الخط بطرق مختلفة — 5 دقائق للعمل الانفعالي، و30 دقيقة للسلوك، وأحيانًا ساعة للتصاميم اليومية — لذا يعرض Samply التوزيع بدلًا من فرض عتبة واحدة. استخدمه لتعيين قيمة القطع التي ستطبّقها عند التحليل والدفاع عنها.
      </p>

      <h2>اللوحة 5 — نمط الاستجابة بحسب الساعة</h2>
      <p>
        مخطط شريطي لمعدّل الاستجابة بحسب ساعة اليوم، محسوبًا في المنطقة الزمنية المحلية لكل مشارك ثم مجموعًا. تكون الأشرطة ملوّنة عندما يكون المعدّل أعلى من المتوسط اليومي، ورمادية عندما يكون أدنى.
      </p>
      <p>
        الالتزام بحسب وقت اليوم مصدر موثّق لانحياز اختيار يومي: إذا انخفض معدّل الاستجابة مساءً، فإن عيّنتك المسائية منحازة نحو ما يتنبّأ بالتوافر مساءً.{" "}
        <Ref>Sokolovsky et al., 2014; Smyth et al., 1998.</Ref>{" "}
        استخدم هذه اللوحة لرصد الساعات التي يتعطّل فيها أخذ العينات فعليًا، وعدّل نافذة الجدول أو وزّن التحليل تبعًا لذلك.
      </p>

      <h2>اللوحة 6 — أداء الجداول</h2>
      <p>
        صفّ واحد لكل جدول إشعارات محدَّد في الدراسة، يتضمّن <strong>المُرسَل</strong> و<strong>المفتوح</strong> و<strong>الالتزام</strong>. يجمع الصفُّ الموسوم بـ <em>(جدول غير متعقَّب)</em> النتائج التي أُرسلت قبل أن يبدأ Samply في ربط كل وثيقة Result بجدولها الأصلي — تلك الصفوف ليس لها رابط تكوين فتُجمع معًا.
      </p>
      <p>
        مقارنة الجداول الثابتة والعشوائية والمشروطة بحدث ضمن الدراسة نفسها هي أحد المواضع القليلة التي تكون فيها الأدبيات قاطعة.{" "}
        <Ref>van Berkel, Ferreira &amp; Kostakos, 2017.</Ref>{" "}
        استخدم هذه اللوحة لتحديد الجداول الأقل أداءً من غيرها — فعلى سبيل المثال يأتي جدول الاستخلاص في نهاية الدراسة في الغالب أدنى بكثير من الجداول اليومية — ولتقرّر ما إذا كان الفرق يعكس عبء المشاركين أو المحتوى أو التوقيت.
      </p>

      <h2>اللوحة 7 — التزام المشاركين</h2>
      <p>
        جدول قابل للفرز والتصفية لكل مشارك نشط، يتضمّن <strong>المُرسَل</strong> و<strong>المفتوح</strong> و<strong>الالتزام&nbsp;٪</strong> و<strong>آخر نشاط</strong>. تُعلَّم الصفوف الأدنى من العتبة القابلة للتهيئة (افتراضيًا 60&nbsp;٪) باللون المرجاني.
      </p>
      <p>
        تُخفي متوسطات المجموعة المشاركين الذين يحتاجون فعلًا إلى تدخّل. يمكن لدراسة بمتوسط 73&nbsp;٪ أن تضمّ بسهولة مشاركين عند 20&nbsp;٪ بياناتهم غير موثوقة، ومشاركين عند 95&nbsp;٪ يحملون المتوسّط — وتجميعهم يُنتج رقمًا واحدًا لا يمكن التصرّف بناءً عليه.{" "}
        <Ref>Jones et al., 2019.</Ref>{" "}
        استخدم هذا الجدول لإرسال تذكيرات موجَّهة، أو تقرير من تستبعد من عيّنة التحليل، أو ببساطة لمعرفة من ينبغي التواصل معه قبل أن يصير التسرّب نهائيًا.
      </p>

      <h2>ما <em>لا</em> تفعله هذه اللوحة</h2>
      <p>
        أربع حدود نزيهة، ذُكرت في البداية لأنها تشكّل كيف ينبغي قراءة كل لوحة أعلاه:
      </p>
      <dl>
        <dt>وقت الاستجابة نعم، أما صدق محتوى الاستجابة فلا.</dt>
        <dd>
          لا تُكتشف الإجابات المتسرّعة، أو ذات الخط المستقيم، أو غير المنتبهة. تظل هذه الفحوص مسؤولية المحلِّل.{" "}
          <Ref>Meade &amp; Craig, 2012.</Ref>
        </dd>
        <dt>الإشارات مرجَّحة بالتساوي.</dt>
        <dd>
          إشعار صباحي مدته دقيقة ودفتر يومي مسائي مدته عشر دقائق يُحسبان بالتساوي في بسط الالتزام. أمّا الترجيح بحسب العبء أو طول الاستبيان أو نية التصميم فلا يزال سؤالًا منهجيًا مفتوحًا.{" "}
          <Ref>Eisele et al., 2022.</Ref>
        </dd>
        <dt>لا اختبار استدلالي لـ MNAR.</dt>
        <dd>
          تُظهر اللوحة ما هو ناقص ومتى ضاع، لكن الفقد غير العشوائي (MNAR) يجب أن يُعالَج تحليليًا. لا تملك الحقل طريقة متّفقًا عليها.{" "}
          <Ref>Schafer &amp; Graham, 2002; Silvia et al., 2014.</Ref>
        </dd>
        <dt>القيم الافتراضية للعتبات تُرمِّز موقفًا.</dt>
        <dd>
          عتبة الالتزام المنخفض عند 60&nbsp;٪ خيار منهجي لا ثابت طبيعي. يمكن تهيئتها لكل دراسة، لكن القيمة الافتراضية تظلّ تشكّل ما تلاحظه — اقرأها نقطةَ انطلاق لا قاعدة.
        </dd>
      </dl>

      <h2>التعمّق والتصدير</h2>
      <p>
        انقر أي صفّ مشارك في اللوحة 7 للانتقال إلى سجل استجابات هذا الشخص. للتحليلات التي تحتاج إلى الطوابع الزمنية الخام وسجلّ الأحداث، استخدم إجراء <strong>تصدير CSV</strong> من علامة التبويب «السجلّ» — كل تجميع في Analytics قابل لإعادة الإنتاج من ذلك التفريغ في بيئتك الإحصائية الخاصة.
      </p>

      <h2>المراجع المستشهد بها</h2>
      <References />
    </div>
  );
}
