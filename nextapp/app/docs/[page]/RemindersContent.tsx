import type { Locale } from "@/lib/i18n";

function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

function UrlBox({ url }: { url: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.8rem 1.2rem', borderRadius: '0.5rem', wordBreak: 'break-all', margin: '0.8rem 0 0' }}>
      {url}
    </div>
  );
}

function RemindersContentEn({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        A reminder is a follow-up push notification that Samply sends automatically when it
        has not detected a survey completion for the original send. Reminders are optional
        and configured per schedule. They fire at a fixed offset after the original
        notification — unless the participant completes the survey first, in which case
        Samply cancels all pending reminders for that send automatically.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>How reminders work</h2>
      <p>
        When Samply dispatches an original notification, it immediately schedules any
        configured reminder rows in the queue. Each reminder row is a separate{' '}
        <strong>pending</strong> queue entry with <strong>Reminder: yes</strong>. The
        reminder inherits the same survey URL (including all substituted placeholder
        values) as the original send — participants who tap the reminder link land in the
        same survey session.
      </p>
      <p>
        Reminders are cancelled in two ways:
      </p>
      <ol>
        <li>
          Samply receives a <strong>completion event</strong> for the original send (via
          redirect or POST request — see below). It immediately cancels all pending
          reminders that share the same internal send ID.
        </li>
        <li>
          You manually delete the schedule or cancel the rows from the{' '}
          <a href='/docs/queue'>queue</a>.
        </li>
      </ol>
      <p>
        Without a completion event, every send gets a reminder regardless of whether the
        participant actually completed the survey.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configuring reminders in the schedule form</h2>
      <p>
        Step 9 of the schedule form is the reminder section. Toggle{' '}
        <strong>Send reminders</strong> to reveal the reminder planner. For each reminder
        you want to send, fill in:
      </p>
      <dl>
        <dt>Reminder title</dt>
        <dd>The bold first line of the reminder push notification on the participant device.</dd>
        <dt>Reminder message</dt>
        <dd>The notification body — the second line visible in the system tray.</dd>
        <dt>Sent after</dt>
        <dd>
          The delay from the original notification: days + hours + minutes. A reminder set
          to 0 days, 1 hour, 0 minutes fires one hour after the original send. All three
          fields default to 0 — set at least one to a non-zero value.
        </dd>
      </dl>
      <p>
        Click <strong>Add new reminder</strong> to add a second reminder at a different
        offset. You can chain as many reminders as needed — for example, a first reminder
        at 1 hour and a second at 4 hours. All reminders are cancelled as soon as a
        completion event arrives, regardless of which have already fired.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Registering a completion event</h2>
      <p>
        Samply cannot know on its own when a participant finishes a survey. Your survey
        tool must signal completion by calling the Samply completion endpoint. There are
        two ways to do this.
      </p>
      <p>
        The exact URLs for your study — with the correct slug already filled in — are
        shown in the <strong>Settings</strong> tab of your study dashboard, under{' '}
        <em>Reminders — completion URL</em>. You can copy them directly from there.
      </p>

      <h3>Option 1 — redirect (Qualtrics, LimeSurvey, most survey tools)</h3>
      <p>
        At the end of your survey, redirect the participant to the Samply completion URL.
        Samply marks the send as completed and cancels pending reminders, then shows the
        participant a confirmation page.
      </p>
      <p>
        The redirect URL follows this pattern — replace <em>your-study-slug</em> with
        your study URL slug and use the <Code>%MESSAGE_ID%</Code> placeholder so each
        participant&apos;s completion is recorded against their specific send:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        In Qualtrics, set this as the survey end-of-survey redirect URL. In LimeSurvey,
        set it as the &quot;End URL&quot; on the survey settings panel. The survey tool
        substitutes <Code>%MESSAGE_ID%</Code> with the actual message ID it received via
        the URL parameter you passed in the notification link (see{' '}
        <a href='/docs/placeholders'>URL placeholders</a>).
      </p>

      <h3>Option 2 — POST request (REDCap, custom integrations)</h3>
      <p>
        Send an HTTP POST to the same endpoint. This is suited for survey tools that
        support end-of-survey webhooks, or for custom code running server-side.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        A <code>200</code> response confirms the completion was recorded and reminders
        were cancelled. A <code>400</code> response means Samply could not find a matching
        result record for that message ID — check that <Code>%MESSAGE_ID%</Code> was
        correctly substituted and passed through.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Why MESSAGE_ID is required</h2>
      <p>
        Samply uses <Code>%MESSAGE_ID%</Code> to link a completion event to the exact
        notification send that triggered the survey. Without it, Samply cannot identify
        which pending reminders to cancel. The flow is:
      </p>
      <ol>
        <li>
          You put <Code>%MESSAGE_ID%</Code> in the notification Web Link as a query
          parameter — for example, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply substitutes the token with a unique 15-character ID at send time.
          The participant opens the survey URL with that ID already in it.
        </li>
        <li>
          Your survey tool reads the <code>messageid</code> parameter and passes it to
          the end-of-survey redirect or webhook.
        </li>
        <li>
          Samply receives the completion call with the message ID, cancels reminders, and
          marks the result record as completed.
        </li>
      </ol>
      <p>
        If you use reminders, always include <Code>%MESSAGE_ID%</Code> in your notification
        URL and verify that your survey tool forwards it to the completion endpoint.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics setup walkthrough</h2>
      <ol>
        <li>
          In the notification Web Link, add <code>?messageid=%MESSAGE_ID%</code> (plus any
          other placeholders you need).
        </li>
        <li>
          In your Qualtrics survey flow, add an <strong>Embedded Data</strong> element
          before the first block and create a field named <code>messageid</code>. Qualtrics
          captures query string parameters automatically.
        </li>
        <li>
          In <strong>Survey Options → Survey Termination</strong>, set
          the redirect URL to:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics substitutes <code>{'{e://Field/messageid}'}</code> with the captured
        value, so participants are redirected to the correct completion URL.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Reminders fire if no completion event arrives</dt>
        <dd>
          If the redirect or POST never reaches Samply — because the participant abandoned
          the survey mid-way, because the survey tool was misconfigured, or because the
          completion URL had a typo — the reminder will fire as scheduled. Test the full
          flow with a test participant before going live.
        </dd>
        <dt>Reminders inherit the original substituted URL</dt>
        <dd>
          The survey URL embedded in reminder notifications is the already-substituted URL
          from the original send — not a fresh substitution. The same message ID, batch
          number, and timestamps apply. This is intentional: the reminder should reopen
          the same survey session. If your survey tool creates a new response for each
          link open, ensure your logic handles this.
        </dd>
        <dt>Reminder rows count toward the queue limit</dt>
        <dd>
          Each reminder row is a separate pending entry in the queue and counts toward the
          50,000-row limit per study. A schedule with 100 participants and 2 reminders per
          send generates 3 rows per send, not 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentDe({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Eine Erinnerung ist eine Nachfass-Push-Benachrichtigung, die Samply automatisch sendet, wenn es
        keinen Umfrageabschluss für den ursprünglichen Versand festgestellt hat. Erinnerungen sind
        optional und werden pro Zeitplan konfiguriert. Sie werden nach einem festen Zeitfenster nach der
        ursprünglichen Benachrichtigung ausgelöst — es sei denn, der Teilnehmer schließt die Umfrage
        zuerst ab, in welchem Fall Samply alle ausstehenden Erinnerungen für diesen Versand automatisch
        abbricht.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Wie Erinnerungen funktionieren</h2>
      <p>
        Wenn Samply eine ursprüngliche Benachrichtigung versendet, plant es sofort alle konfigurierten
        Erinnerungszeilen in der Warteschlange. Jede Erinnerungszeile ist ein separater{' '}
        <strong>ausstehender</strong> Warteschlangeneintrag mit <strong>Erinnerung: ja</strong>. Die
        Erinnerung übernimmt dieselbe Umfrage-URL (einschließlich aller ersetzten Platzhalter-Werte)
        wie der ursprüngliche Versand — Teilnehmer, die auf den Erinnerungslink tippen, landen in
        derselben Umfragesitzung.
      </p>
      <p>
        Erinnerungen werden auf zwei Arten abgebrochen:
      </p>
      <ol>
        <li>
          Samply erhält ein <strong>Abschlussereignis</strong> für den ursprünglichen Versand (per
          Weiterleitung oder POST-Anfrage — siehe unten). Es bricht sofort alle ausstehenden
          Erinnerungen ab, die dieselbe interne Versand-ID teilen.
        </li>
        <li>
          Sie löschen den Zeitplan manuell oder brechen die Zeilen in der{' '}
          <a href='/docs/queue'>Warteschlange</a> ab.
        </li>
      </ol>
      <p>
        Ohne ein Abschlussereignis erhält jeder Versand eine Erinnerung, unabhängig davon, ob der
        Teilnehmer die Umfrage tatsächlich abgeschlossen hat.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Erinnerungen im Zeitplanformular konfigurieren</h2>
      <p>
        Schritt 9 des Zeitplanformulars ist der Erinnerungsbereich. Aktivieren Sie{' '}
        <strong>Erinnerungen senden</strong>, um den Erinnerungsplaner anzuzeigen. Füllen Sie für jede
        Erinnerung, die Sie senden möchten, Folgendes aus:
      </p>
      <dl>
        <dt>Erinnerungstitel</dt>
        <dd>Die fett gedruckte erste Zeile der Erinnerungs-Push-Benachrichtigung auf dem Gerät des Teilnehmers.</dd>
        <dt>Erinnerungsnachricht</dt>
        <dd>Der Benachrichtigungstext — die zweite in der Systemleiste sichtbare Zeile.</dd>
        <dt>Gesendet nach</dt>
        <dd>
          Die Verzögerung gegenüber der ursprünglichen Benachrichtigung: Tage + Stunden + Minuten. Eine
          Erinnerung, die auf 0 Tage, 1 Stunde, 0 Minuten eingestellt ist, wird eine Stunde nach dem
          ursprünglichen Versand ausgelöst. Alle drei Felder haben den Standardwert 0 — setzen Sie
          mindestens einen auf einen Wert ungleich null.
        </dd>
      </dl>
      <p>
        Klicken Sie auf <strong>Neue Erinnerung hinzufügen</strong>, um eine zweite Erinnerung mit einem
        anderen Zeitfenster hinzuzufügen. Sie können beliebig viele Erinnerungen verketten — zum Beispiel
        eine erste Erinnerung nach 1 Stunde und eine zweite nach 4 Stunden. Alle Erinnerungen werden
        abgebrochen, sobald ein Abschlussereignis eintrifft, unabhängig davon, welche bereits ausgelöst
        wurden.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Ein Abschlussereignis registrieren</h2>
      <p>
        Samply kann nicht von selbst wissen, wann ein Teilnehmer eine Umfrage abschließt. Ihr Umfragetool
        muss den Abschluss durch Aufruf des Samply-Abschluss-Endpunkts signalisieren. Dafür gibt es
        zwei Möglichkeiten.
      </p>
      <p>
        Die genauen URLs für Ihre Studie — mit dem bereits eingetragenen korrekten Slug — werden im Tab{' '}
        <strong>Einstellungen</strong> Ihres Studien-Dashboards unter{' '}
        <em>Erinnerungen — Abschluss-URL</em> angezeigt. Sie können sie direkt von dort kopieren.
      </p>

      <h3>Option 1 — Weiterleitung (Qualtrics, LimeSurvey, die meisten Umfragetools)</h3>
      <p>
        Leiten Sie den Teilnehmer am Ende Ihrer Umfrage zur Samply-Abschluss-URL weiter.
        Samply markiert den Versand als abgeschlossen und bricht ausstehende Erinnerungen ab, dann zeigt
        es dem Teilnehmer eine Bestätigungsseite.
      </p>
      <p>
        Die Weiterleitungs-URL folgt diesem Muster — ersetzen Sie <em>your-study-slug</em> durch
        Ihren Studien-URL-Slug und verwenden Sie den Platzhalter <Code>%MESSAGE_ID%</Code>, damit der
        Abschluss jedes Teilnehmers seinem spezifischen Versand zugeordnet wird:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Setzen Sie dies in Qualtrics als Weiterleitungs-URL am Umfrageende. In LimeSurvey
        setzen Sie es als „End-URL" im Umfrageeinstellungen-Panel. Das Umfragetool
        ersetzt <Code>%MESSAGE_ID%</Code> durch die tatsächliche Nachrichten-ID, die es über den
        URL-Parameter empfangen hat, den Sie im Benachrichtigungslink übergeben haben (siehe{' '}
        <a href='/docs/placeholders'>URL-Platzhalter</a>).
      </p>

      <h3>Option 2 — POST-Anfrage (REDCap, benutzerdefinierte Integrationen)</h3>
      <p>
        Senden Sie einen HTTP-POST an denselben Endpunkt. Dies eignet sich für Umfragetools, die
        End-of-Survey-Webhooks unterstützen, oder für serverseitig laufenden benutzerdefinierten Code.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Eine <code>200</code>-Antwort bestätigt, dass der Abschluss aufgezeichnet und Erinnerungen
        abgebrochen wurden. Eine <code>400</code>-Antwort bedeutet, dass Samply keinen passenden
        Ergebnisdatensatz für diese Nachrichten-ID finden konnte — überprüfen Sie, ob{' '}
        <Code>%MESSAGE_ID%</Code> korrekt ersetzt und weitergegeben wurde.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Warum MESSAGE_ID erforderlich ist</h2>
      <p>
        Samply verwendet <Code>%MESSAGE_ID%</Code>, um ein Abschlussereignis mit dem genauen
        Benachrichtigungsversand zu verknüpfen, der die Umfrage ausgelöst hat. Ohne sie kann Samply nicht
        identifizieren, welche ausstehenden Erinnerungen abgebrochen werden sollen. Der Ablauf ist:
      </p>
      <ol>
        <li>
          Sie fügen <Code>%MESSAGE_ID%</Code> in den Benachrichtigungs-Weblink als Query-Parameter ein —
          zum Beispiel <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply ersetzt den Token zum Sendezeitpunkt durch eine eindeutige 15-stellige ID.
          Der Teilnehmer öffnet die Umfrage-URL mit dieser bereits enthaltenen ID.
        </li>
        <li>
          Ihr Umfragetool liest den Parameter <code>messageid</code> und übergibt ihn an die
          End-of-Survey-Weiterleitung oder den Webhook.
        </li>
        <li>
          Samply erhält den Abschluss-Aufruf mit der Nachrichten-ID, bricht Erinnerungen ab und
          markiert den Ergebnisdatensatz als abgeschlossen.
        </li>
      </ol>
      <p>
        Wenn Sie Erinnerungen verwenden, fügen Sie immer <Code>%MESSAGE_ID%</Code> in Ihre
        Benachrichtigungs-URL ein und stellen Sie sicher, dass Ihr Umfragetool sie an den
        Abschluss-Endpunkt weiterleitet.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics-Einrichtung Schritt für Schritt</h2>
      <ol>
        <li>
          Fügen Sie im Benachrichtigungs-Weblink <code>?messageid=%MESSAGE_ID%</code> hinzu (plus alle
          anderen benötigten Platzhalter).
        </li>
        <li>
          Fügen Sie in Ihrem Qualtrics-Umfrage-Flow ein Element <strong>Eingebettete Daten</strong>{' '}
          vor dem ersten Block ein und erstellen Sie ein Feld namens <code>messageid</code>. Qualtrics
          erfasst Query-String-Parameter automatisch.
        </li>
        <li>
          Setzen Sie unter <strong>Umfrageoptionen → Umfrageabschluss</strong> die
          Weiterleitungs-URL auf:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics ersetzt <code>{'{e://Field/messageid}'}</code> durch den erfassten
        Wert, sodass Teilnehmer zur korrekten Abschluss-URL weitergeleitet werden.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Worauf Sie achten sollten</h3>
      <dl>
        <dt>Erinnerungen werden ausgelöst, wenn kein Abschlussereignis eintrifft</dt>
        <dd>
          Wenn die Weiterleitung oder der POST Samply nie erreicht — weil der Teilnehmer die Umfrage
          auf halbem Weg abgebrochen hat, weil das Umfragetool falsch konfiguriert war oder weil die
          Abschluss-URL einen Tippfehler enthielt — wird die Erinnerung wie geplant ausgelöst. Testen
          Sie den gesamten Ablauf mit einem Testteilnehmer, bevor Sie live gehen.
        </dd>
        <dt>Erinnerungen übernehmen die ursprünglich ersetzte URL</dt>
        <dd>
          Die in Erinnerungs-Benachrichtigungen eingebettete Umfrage-URL ist die bereits ersetzte URL
          aus dem ursprünglichen Versand — keine frische Ersetzung. Dieselbe Nachrichten-ID, Batch-
          Nummer und Zeitstempel gelten. Dies ist beabsichtigt: Die Erinnerung soll dieselbe
          Umfragesitzung wieder öffnen. Wenn Ihr Umfragetool für jedes Öffnen eines Links eine neue
          Antwort erstellt, stellen Sie sicher, dass Ihre Logik damit umgeht.
        </dd>
        <dt>Erinnerungszeilen zählen zum Warteschlangen-Limit</dt>
        <dd>
          Jede Erinnerungszeile ist ein separater ausstehender Eintrag in der Warteschlange und zählt
          zum Limit von 50.000 Zeilen pro Studie. Ein Zeitplan mit 100 Teilnehmern und 2 Erinnerungen
          pro Versand erzeugt 3 Zeilen pro Versand, nicht 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentNl({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Een herinnering is een opvolgende push-notificatie die Samply automatisch verstuurt wanneer het
        geen voltooiing van de enquete heeft gedetecteerd voor de oorspronkelijke verzending.
        Herinneringen zijn optioneel en worden per planning geconfigureerd. Ze worden verstuurd na een
        vaste vertraging na de oorspronkelijke notificatie — tenzij de deelnemer de enquete eerst
        voltooit, in welk geval Samply alle openstaande herinneringen voor die verzending automatisch
        annuleert.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Hoe herinneringen werken</h2>
      <p>
        Wanneer Samply een oorspronkelijke notificatie verstuurt, plant het onmiddellijk alle
        geconfigureerde herinneringsrijen in de wachtrij. Elke herinneringsrij is een afzonderlijk{' '}
        <strong>openstaand</strong> wachtrij-item met <strong>Herinnering: ja</strong>. De herinnering
        erft dezelfde enquete-URL (inclusief alle vervangen plaatshouderwaarden) als de oorspronkelijke
        verzending — deelnemers die op de herinneringslink tikken, komen terecht in dezelfde
        enquetesessie.
      </p>
      <p>
        Herinneringen worden op twee manieren geannuleerd:
      </p>
      <ol>
        <li>
          Samply ontvangt een <strong>voltooiingsgebeurtenis</strong> voor de oorspronkelijke verzending
          (via doorsturen of POST-verzoek — zie hieronder). Het annuleert onmiddellijk alle openstaande
          herinneringen die dezelfde interne verzend-ID delen.
        </li>
        <li>
          U verwijdert de planning handmatig of annuleert de rijen vanuit de{' '}
          <a href='/docs/queue'>wachtrij</a>.
        </li>
      </ol>
      <p>
        Zonder een voltooiingsgebeurtenis krijgt elke verzending een herinnering, ongeacht of de
        deelnemer de enquete daadwerkelijk heeft voltooid.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Herinneringen configureren in het planningsformulier</h2>
      <p>
        Stap 9 van het planningsformulier is het herinneringsgedeelte. Schakel{' '}
        <strong>Herinneringen versturen</strong> in om de herinneringsplanner te tonen. Vul voor elke
        herinnering die u wilt versturen het volgende in:
      </p>
      <dl>
        <dt>Herinneringstitel</dt>
        <dd>De vetgedrukte eerste regel van de herinneringspush-notificatie op het apparaat van de deelnemer.</dd>
        <dt>Herinneringsbericht</dt>
        <dd>De notificatietekst — de tweede regel die zichtbaar is in de systeembalk.</dd>
        <dt>Verzonden na</dt>
        <dd>
          De vertraging ten opzichte van de oorspronkelijke notificatie: dagen + uren + minuten.
          Een herinnering ingesteld op 0 dagen, 1 uur, 0 minuten wordt één uur na de oorspronkelijke
          verzending verstuurd. Alle drie velden hebben standaard de waarde 0 — stel minimaal één in
          op een waarde niet gelijk aan nul.
        </dd>
      </dl>
      <p>
        Klik op <strong>Nieuwe herinnering toevoegen</strong> om een tweede herinnering toe te voegen
        met een andere vertraging. U kunt zoveel herinneringen aan elkaar koppelen als nodig —
        bijvoorbeeld een eerste herinnering na 1 uur en een tweede na 4 uur. Alle herinneringen worden
        geannuleerd zodra een voltooiingsgebeurtenis binnenkomt, ongeacht welke al zijn verstuurd.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Een voltooiingsgebeurtenis registreren</h2>
      <p>
        Samply kan niet op eigen initiatief weten wanneer een deelnemer een enquete afrondt. Uw
        enquetetool moet voltooiing signaleren door het Samply-voltooiingseindpunt aan te roepen.
        Er zijn twee manieren om dit te doen.
      </p>
      <p>
        De exacte URL's voor uw studie — met de juiste slug al ingevuld — worden getoond op het
        tabblad <strong>Instellingen</strong> van uw studiedashboard, onder{' '}
        <em>Herinneringen — voltooiings-URL</em>. U kunt ze daar rechtstreeks kopiëren.
      </p>

      <h3>Optie 1 — doorsturen (Qualtrics, LimeSurvey, de meeste enquetetools)</h3>
      <p>
        Stuur de deelnemer aan het einde van uw enquete door naar de Samply-voltooiings-URL.
        Samply markeert de verzending als voltooid en annuleert openstaande herinneringen, waarna het
        de deelnemer een bevestigingspagina toont.
      </p>
      <p>
        De doorstuur-URL volgt dit patroon — vervang <em>your-study-slug</em> door uw studie-URL-slug
        en gebruik de plaatshouder <Code>%MESSAGE_ID%</Code> zodat de voltooiing van elke deelnemer
        wordt geregistreerd bij zijn specifieke verzending:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Stel dit in Qualtrics in als de doorstuur-URL aan het einde van de enquete. In LimeSurvey
        stelt u het in als de &quot;Eind-URL&quot; in het instellingenpaneel van de enquete. De
        enquetetool vervangt <Code>%MESSAGE_ID%</Code> door de daadwerkelijke bericht-ID die het heeft
        ontvangen via de URL-parameter die u heeft doorgegeven in de notificatielink (zie{' '}
        <a href='/docs/placeholders'>URL-plaatshouders</a>).
      </p>

      <h3>Optie 2 — POST-verzoek (REDCap, aangepaste integraties)</h3>
      <p>
        Stuur een HTTP POST naar hetzelfde eindpunt. Dit is geschikt voor enquetetools die
        end-of-survey-webhooks ondersteunen, of voor aangepaste code die aan de serverzijde wordt
        uitgevoerd.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Een <code>200</code>-antwoord bevestigt dat de voltooiing is geregistreerd en herinneringen
        zijn geannuleerd. Een <code>400</code>-antwoord betekent dat Samply geen overeenkomend
        resultaatrecord kon vinden voor die bericht-ID — controleer of <Code>%MESSAGE_ID%</Code>{' '}
        correct is vervangen en doorgegeven.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Waarom MESSAGE_ID vereist is</h2>
      <p>
        Samply gebruikt <Code>%MESSAGE_ID%</Code> om een voltooiingsgebeurtenis te koppelen aan de
        exacte notificatieverzending die de enquete heeft geactiveerd. Zonder deze kan Samply niet
        identificeren welke openstaande herinneringen moeten worden geannuleerd. De stroom is:
      </p>
      <ol>
        <li>
          U plaatst <Code>%MESSAGE_ID%</Code> in de notificatie-weblink als queryparameter —
          bijvoorbeeld <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply vervangt de token op het moment van verzending door een unieke 15-tekens ID.
          De deelnemer opent de enquete-URL met die ID er al in.
        </li>
        <li>
          Uw enquetetool leest de parameter <code>messageid</code> en geeft deze door aan de
          end-of-survey-doorstuur of webhook.
        </li>
        <li>
          Samply ontvangt de voltooiingsaanroep met de bericht-ID, annuleert herinneringen en
          markeert het resultaatrecord als voltooid.
        </li>
      </ol>
      <p>
        Als u herinneringen gebruikt, neem dan altijd <Code>%MESSAGE_ID%</Code> op in uw
        notificatie-URL en controleer of uw enquetetool deze doorstuurt naar het voltooiingseindpunt.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics stap voor stap instellen</h2>
      <ol>
        <li>
          Voeg in de notificatie-weblink <code>?messageid=%MESSAGE_ID%</code> toe (plus eventuele
          andere plaatshouders die u nodig heeft).
        </li>
        <li>
          Voeg in uw Qualtrics-enqueteflow een element <strong>Ingesloten data</strong>{' '}
          toe vóór het eerste blok en maak een veld aan met de naam <code>messageid</code>.
          Qualtrics legt querystring-parameters automatisch vast.
        </li>
        <li>
          Stel onder <strong>Enqueteopties &rarr; Enqueteafsluiting</strong> de
          doorstuur-URL in op:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics vervangt <code>{'{e://Field/messageid}'}</code> door de vastgelegde
        waarde, zodat deelnemers worden doorgestuurd naar de juiste voltooiings-URL.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aandachtspunten</h3>
      <dl>
        <dt>Herinneringen worden verstuurd als er geen voltooiingsgebeurtenis aankomt</dt>
        <dd>
          Als het doorsturen of de POST Samply nooit bereikt — omdat de deelnemer de enquete halverwege
          heeft afgebroken, omdat de enquetetool verkeerd was geconfigureerd, of omdat de voltooiings-URL
          een typefout bevatte — wordt de herinnering verstuurd zoals gepland. Test de volledige stroom
          met een testdeelnemer voordat u live gaat.
        </dd>
        <dt>Herinneringen erven de oorspronkelijk vervangen URL</dt>
        <dd>
          De enquete-URL die is ingebed in herinneringsnotificaties is de al-vervangen URL van de
          oorspronkelijke verzending — geen nieuwe vervanging. Dezelfde bericht-ID, batchnummer en
          tijdstempels zijn van toepassing. Dit is bewust: de herinnering moet dezelfde enquetesessie
          heropenen. Als uw enquetetool een nieuw antwoord aanmaakt voor elke keer dat een link wordt
          geopend, zorg er dan voor dat uw logica dit afhandelt.
        </dd>
        <dt>Herinneringsrijen tellen mee voor het wachtrij-limiet</dt>
        <dd>
          Elke herinneringsrij is een afzonderlijk openstaand item in de wachtrij en telt mee voor het
          limiet van 50.000 rijen per studie. Een planning met 100 deelnemers en 2 herinneringen per
          verzending genereert 3 rijen per verzending, niet 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentRu({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Напоминание — это повторное push-уведомление, которое Samply отправляет автоматически,
        если не зафиксировало завершение опроса по исходной отправке. Напоминания необязательны
        и настраиваются для каждого расписания отдельно. Они срабатывают через фиксированный
        промежуток после исходного уведомления — если только участник не завершит опрос
        раньше, в этом случае Samply автоматически отменяет все ожидающие напоминания
        для данной отправки.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Как работают напоминания</h2>
      <p>
        Когда Samply отправляет исходное уведомление, оно немедленно ставит в очередь все
        настроенные строки напоминаний. Каждая строка напоминания — это отдельная{' '}
        <strong>ожидающая</strong> запись в очереди с пометкой <strong>Напоминание: да</strong>.
        Напоминание наследует тот же URL опроса (включая все подставленные значения
        заполнителей), что и исходная отправка — участники, перейдя по ссылке напоминания,
        попадают в ту же сессию опроса.
      </p>
      <p>
        Напоминания отменяются двумя способами:
      </p>
      <ol>
        <li>
          Samply получает <strong>событие завершения</strong> для исходной отправки (через
          перенаправление или POST-запрос — см. ниже). Оно немедленно отменяет все ожидающие
          напоминания с тем же внутренним идентификатором отправки.
        </li>
        <li>
          Вы вручную удаляете расписание или отменяете строки из{' '}
          <a href='/docs/queue'>очереди</a>.
        </li>
      </ol>
      <p>
        Без события завершения каждая отправка получает напоминание независимо от того,
        действительно ли участник прошёл опрос.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Настройка напоминаний в форме расписания</h2>
      <p>
        Шаг 9 формы расписания — раздел напоминаний. Включите{' '}
        <strong>Отправлять напоминания</strong>, чтобы открыть планировщик напоминаний.
        Для каждого напоминания заполните:
      </p>
      <dl>
        <dt>Заголовок напоминания</dt>
        <dd>Жирная первая строка push-уведомления-напоминания на устройстве участника.</dd>
        <dt>Текст напоминания</dt>
        <dd>Тело уведомления — вторая строка, отображаемая в панели уведомлений.</dd>
        <dt>Отправить через</dt>
        <dd>
          Задержка после исходного уведомления: дни + часы + минуты. Напоминание,
          установленное на 0 дней, 1 час, 0 минут, сработает через час после исходной
          отправки. Все три поля по умолчанию равны 0 — установите хотя бы одно
          ненулевое значение.
        </dd>
      </dl>
      <p>
        Нажмите <strong>Добавить напоминание</strong>, чтобы добавить второе напоминание с
        другой задержкой. Можно настроить любое количество напоминаний — например, первое
        через 1 час, второе через 4 часа. Все напоминания отменяются, как только поступает
        событие завершения, независимо от того, какие из них уже были отправлены.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Регистрация события завершения</h2>
      <p>
        Samply не может самостоятельно определить, когда участник завершил опрос. Ваш
        инструмент для проведения опросов должен сигнализировать о завершении, вызвав
        конечную точку завершения Samply. Это можно сделать двумя способами.
      </p>
      <p>
        Точные URL-адреса для вашего исследования — с уже подставленным правильным slug —
        отображаются на вкладке <strong>Настройки</strong> панели управления исследованием
        в разделе <em>Напоминания — URL завершения</em>. Вы можете скопировать их прямо оттуда.
      </p>

      <h3>Вариант 1 — перенаправление (Qualtrics, LimeSurvey и большинство инструментов для опросов)</h3>
      <p>
        В конце опроса перенаправьте участника на URL завершения Samply. Samply пометит
        отправку как завершённую, отменит ожидающие напоминания и покажет участнику
        страницу подтверждения.
      </p>
      <p>
        URL перенаправления следует этому шаблону — замените <em>your-study-slug</em> на
        slug URL вашего исследования и используйте заполнитель <Code>%MESSAGE_ID%</Code>,
        чтобы завершение каждого участника фиксировалось для его конкретной отправки:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        В Qualtrics укажите это как URL перенаправления по завершении опроса. В LimeSurvey
        укажите его как &quot;End URL&quot; на панели настроек опроса. Инструмент для опросов
        заменит <Code>%MESSAGE_ID%</Code> фактическим идентификатором сообщения, полученным
        через URL-параметр в ссылке уведомления (см.{' '}
        <a href='/docs/placeholders'>URL-заполнители</a>).
      </p>

      <h3>Вариант 2 — POST-запрос (REDCap, пользовательские интеграции)</h3>
      <p>
        Отправьте HTTP POST на ту же конечную точку. Это подходит для инструментов,
        поддерживающих вебхуки по завершении опроса, или для пользовательского кода
        на стороне сервера.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Ответ <code>200</code> подтверждает, что завершение зафиксировано и напоминания
        отменены. Ответ <code>400</code> означает, что Samply не нашло соответствующей
        записи результата для данного идентификатора сообщения — убедитесь, что{' '}
        <Code>%MESSAGE_ID%</Code> был правильно подставлен и передан.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Почему MESSAGE_ID обязателен</h2>
      <p>
        Samply использует <Code>%MESSAGE_ID%</Code>, чтобы связать событие завершения с
        конкретной отправкой уведомления, инициировавшей опрос. Без него Samply не сможет
        определить, какие ожидающие напоминания нужно отменить. Процесс выглядит так:
      </p>
      <ol>
        <li>
          Вы добавляете <Code>%MESSAGE_ID%</Code> в веб-ссылку уведомления в качестве
          параметра запроса — например, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply при отправке заменяет токен уникальным 15-символьным идентификатором.
          Участник открывает URL опроса с уже подставленным идентификатором.
        </li>
        <li>
          Ваш инструмент для опросов считывает параметр <code>messageid</code> и передаёт
          его в перенаправление по завершении или вебхук.
        </li>
        <li>
          Samply получает вызов завершения с идентификатором сообщения, отменяет напоминания
          и помечает запись результата как завершённую.
        </li>
      </ol>
      <p>
        Если вы используете напоминания, всегда включайте <Code>%MESSAGE_ID%</Code> в URL
        уведомления и убедитесь, что ваш инструмент для опросов передаёт его на конечную
        точку завершения.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Пошаговая настройка в Qualtrics</h2>
      <ol>
        <li>
          В веб-ссылке уведомления добавьте <code>?messageid=%MESSAGE_ID%</code> (плюс любые
          другие нужные заполнители).
        </li>
        <li>
          В потоке опроса Qualtrics добавьте элемент <strong>Встроенные данные</strong>{' '}
          перед первым блоком и создайте поле с именем <code>messageid</code>. Qualtrics
          автоматически захватывает параметры строки запроса.
        </li>
        <li>
          В разделе <strong>Параметры опроса → Завершение опроса</strong> укажите
          URL перенаправления:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics заменит <code>{'{e://Field/messageid}'}</code> захваченным значением,
        и участники будут перенаправлены на правильный URL завершения.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>На что обратить внимание</h3>
      <dl>
        <dt>Напоминания срабатывают, если событие завершения не поступает</dt>
        <dd>
          Если перенаправление или POST никогда не достигнет Samply — потому что участник
          бросил опрос на полпути, инструмент был неправильно настроен или в URL завершения
          была опечатка — напоминание сработает по расписанию. Проверьте полный сценарий
          с тестовым участником перед запуском.
        </dd>
        <dt>Напоминания наследуют исходный подставленный URL</dt>
        <dd>
          URL опроса, встроенный в уведомления-напоминания, — это уже подставленный URL из
          исходной отправки, а не новая подстановка. Применяются тот же идентификатор
          сообщения, номер пакета и временные метки. Это сделано намеренно: напоминание
          должно повторно открывать ту же сессию опроса. Если ваш инструмент создаёт новый
          ответ при каждом открытии ссылки, убедитесь, что ваша логика это учитывает.
        </dd>
        <dt>Строки напоминаний учитываются в лимите очереди</dt>
        <dd>
          Каждая строка напоминания — это отдельная ожидающая запись в очереди и учитывается
          в лимите 50 000 строк на исследование. Расписание со 100 участниками и 2
          напоминаниями на отправку создаёт 3 строки на отправку, а не 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentZh({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        提醒是一种后续推送通知，当 Samply 未检测到原始发送的问卷完成情况时，会自动发送。
        提醒是可选的，按计划配置。它们在原始通知发出后的固定时间偏移量后触发——
        除非参与者先完成问卷，在这种情况下，Samply 会自动取消该次发送的所有待处理提醒。
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>提醒的工作原理</h2>
      <p>
        当 Samply 发送原始通知时，它会立即将所有配置的提醒行加入队列。每条提醒行都是一个单独的{' '}
        <strong>待处理</strong>队列条目，带有<strong>提醒：是</strong>标记。
        提醒继承与原始发送相同的问卷 URL（包括所有已替换的占位符值）——
        点击提醒链接的参与者会进入同一问卷会话。
      </p>
      <p>
        提醒以两种方式取消：
      </p>
      <ol>
        <li>
          Samply 收到原始发送的<strong>完成事件</strong>（通过重定向或 POST 请求——见下文）。
          它会立即取消所有共享相同内部发送 ID 的待处理提醒。
        </li>
        <li>
          您从<a href='/docs/queue'>队列</a>中手动删除计划或取消行。
        </li>
      </ol>
      <p>
        如果没有完成事件，无论参与者是否实际完成了问卷，每次发送都会收到提醒。
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>在计划表单中配置提醒</h2>
      <p>
        计划表单的第 9 步是提醒部分。切换<strong>发送提醒</strong>以显示提醒规划器。
        对于每条要发送的提醒，请填写：
      </p>
      <dl>
        <dt>提醒标题</dt>
        <dd>参与者设备上提醒推送通知的粗体第一行。</dd>
        <dt>提醒内容</dt>
        <dd>通知正文——系统托盘中显示的第二行。</dd>
        <dt>发送于</dt>
        <dd>
          距原始通知的延迟：天 + 小时 + 分钟。设置为 0 天、1 小时、0 分钟的提醒
          将在原始发送后一小时触发。三个字段默认均为 0——至少将其中一个设置为非零值。
        </dd>
      </dl>
      <p>
        点击<strong>添加新提醒</strong>以在不同偏移量处添加第二条提醒。
        您可以根据需要链接任意数量的提醒——例如，第一条在 1 小时后，第二条在 4 小时后。
        无论哪些提醒已经触发，一旦收到完成事件，所有提醒都会被取消。
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>注册完成事件</h2>
      <p>
        Samply 无法自行知道参与者何时完成问卷。您的问卷工具必须通过调用
        Samply 完成端点来发出完成信号。有两种方式可以做到这一点。
      </p>
      <p>
        您研究的确切 URL——已填入正确的 slug——显示在研究仪表板的<strong>设置</strong>选项卡中，
        位于<em>提醒——完成 URL</em>下方。您可以直接从那里复制它们。
      </p>

      <h3>选项 1 — 重定向（Qualtrics、LimeSurvey、大多数问卷工具）</h3>
      <p>
        在问卷结束时，将参与者重定向到 Samply 完成 URL。
        Samply 将该发送标记为已完成并取消待处理的提醒，然后向参与者显示确认页面。
      </p>
      <p>
        重定向 URL 遵循以下模式——将 <em>your-study-slug</em> 替换为您的研究 URL slug，
        并使用 <Code>%MESSAGE_ID%</Code> 占位符，以便每个参与者的完成情况都记录到其特定的发送：
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        在 Qualtrics 中，将其设置为问卷结束重定向 URL。在 LimeSurvey 中，
        将其设置为问卷设置面板上的"End URL"。问卷工具会将 <Code>%MESSAGE_ID%</Code>{' '}
        替换为通过您在通知链接中传递的 URL 参数收到的实际消息 ID（参见{' '}
        <a href='/docs/placeholders'>URL 占位符</a>）。
      </p>

      <h3>选项 2 — POST 请求（REDCap、自定义集成）</h3>
      <p>
        向同一端点发送 HTTP POST。这适用于支持问卷结束 webhook 的问卷工具，或在服务器端运行的自定义代码。
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        <code>200</code> 响应确认完成已记录且提醒已取消。
        <code>400</code> 响应表示 Samply 找不到该消息 ID 的匹配结果记录——
        请检查 <Code>%MESSAGE_ID%</Code> 是否被正确替换和传递。
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>为什么需要 MESSAGE_ID</h2>
      <p>
        Samply 使用 <Code>%MESSAGE_ID%</Code> 将完成事件链接到触发问卷的特定通知发送。
        没有它，Samply 无法识别要取消哪些待处理的提醒。流程如下：
      </p>
      <ol>
        <li>
          您将 <Code>%MESSAGE_ID%</Code> 作为查询参数放入通知 Web 链接中——
          例如 <code>?messageid=%MESSAGE_ID%</code>。
        </li>
        <li>
          Samply 在发送时将令牌替换为唯一的 15 字符 ID。
          参与者打开已包含该 ID 的问卷 URL。
        </li>
        <li>
          您的问卷工具读取 <code>messageid</code> 参数并将其传递给问卷结束重定向或 webhook。
        </li>
        <li>
          Samply 收到带有消息 ID 的完成调用，取消提醒，并将结果记录标记为已完成。
        </li>
      </ol>
      <p>
        如果您使用提醒，请务必在通知 URL 中包含 <Code>%MESSAGE_ID%</Code>，
        并验证您的问卷工具将其转发到完成端点。
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics 设置演练</h2>
      <ol>
        <li>
          在通知 Web 链接中，添加 <code>?messageid=%MESSAGE_ID%</code>（加上您需要的任何其他占位符）。
        </li>
        <li>
          在您的 Qualtrics 问卷流程中，在第一个模块之前添加一个<strong>嵌入数据</strong>元素，
          并创建一个名为 <code>messageid</code> 的字段。Qualtrics 会自动捕获查询字符串参数。
        </li>
        <li>
          在<strong>问卷选项 → 问卷终止</strong>中，将重定向 URL 设置为：
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics 会将 <code>{'{e://Field/messageid}'}</code> 替换为捕获的值，
        因此参与者会被重定向到正确的完成 URL。
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意事项</h3>
      <dl>
        <dt>如果没有完成事件，提醒将会触发</dt>
        <dd>
          如果重定向或 POST 从未到达 Samply——因为参与者中途放弃了问卷、问卷工具配置错误，
          或完成 URL 有拼写错误——提醒将按计划触发。在正式运行前，使用测试参与者测试完整流程。
        </dd>
        <dt>提醒继承原始替换后的 URL</dt>
        <dd>
          嵌入在提醒通知中的问卷 URL 是原始发送中已替换的 URL——而非新的替换。
          相同的消息 ID、批次编号和时间戳均适用。这是有意为之：提醒应重新打开同一问卷会话。
          如果您的问卷工具为每次链接打开都创建新响应，请确保您的逻辑能处理这种情况。
        </dd>
        <dt>提醒行计入队列限制</dt>
        <dd>
          每条提醒行都是队列中单独的待处理条目，计入每项研究 50,000 行的限制。
          一个有 100 名参与者、每次发送 2 条提醒的计划，每次发送会生成 3 行，而不是 1 行。
        </dd>
      </dl>
    </>
  );
}

export default function RemindersContent({ baseUrl, locale }: { baseUrl: string; locale: Locale }) {
  if (locale === "de") return <RemindersContentDe baseUrl={baseUrl} />;
  if (locale === "nl") return <RemindersContentNl baseUrl={baseUrl} />;
  if (locale === "ru") return <RemindersContentRu baseUrl={baseUrl} />;
  if (locale === "zh") return <RemindersContentZh baseUrl={baseUrl} />;
  if (locale === "ko") return <RemindersContentKo baseUrl={baseUrl} />;
  if (locale === "it") return <RemindersContentIt baseUrl={baseUrl} />;
  if (locale === "fr") return <RemindersContentFr baseUrl={baseUrl} />;
  if (locale === "es") return <RemindersContentEs baseUrl={baseUrl} />;
  if (locale === "pt") return <RemindersContentPt baseUrl={baseUrl} />;
  if (locale === "ja") return <RemindersContentJa baseUrl={baseUrl} />;
  if (locale === "ar") return <RemindersContentAr baseUrl={baseUrl} />;
  if (locale === "pl") return <RemindersContentPl baseUrl={baseUrl} />;
  if (locale === "tr") return <RemindersContentTr baseUrl={baseUrl} />;
  return <RemindersContentEn baseUrl={baseUrl} />;
}

function RemindersContentKo({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        알림은 Samply가 원래 발송에 대한 설문 완료를 감지하지 못했을 때 자동으로 발송하는 후속 푸시 알림입니다.
        알림은 선택 사항이며 일정별로 설정합니다. 참여자가 먼저 설문을 완료하지 않는 한
        원래 알림 이후 고정된 간격으로 발송됩니다 — 완료 시 Samply는 해당 발송에 대한
        모든 대기 중인 알림을 자동으로 취소합니다.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>알림의 작동 방식</h2>
      <p>
        Samply가 원래 알림을 발송하면 설정된 모든 알림 행을 즉시 대기열에 예약합니다.
        각 알림 행은 <strong>알림: 예</strong>가 표시된 별도의{' '}
        <strong>대기 중</strong> 대기열 항목입니다.
        알림은 원래 발송과 동일한 설문 URL(모든 대체된 플레이스홀더 값 포함)을 상속합니다 —
        알림 링크를 탭하는 참여자는 동일한 설문 세션으로 이동합니다.
      </p>
      <p>
        알림은 두 가지 방법으로 취소됩니다:
      </p>
      <ol>
        <li>
          Samply가 원래 발송에 대한 <strong>완료 이벤트</strong>를 수신합니다(리디렉션 또는
          POST 요청을 통해 — 아래 참조). 동일한 내부 발송 ID를 공유하는 모든 대기 중인
          알림을 즉시 취소합니다.
        </li>
        <li>
          <a href='/docs/queue'>대기열</a>에서 수동으로 일정을 삭제하거나 행을 취소합니다.
        </li>
      </ol>
      <p>
        완료 이벤트가 없으면 참여자가 실제로 설문을 완료했는지 여부와 관계없이 모든 발송에 알림이 발송됩니다.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>일정 양식에서 알림 설정하기</h2>
      <p>
        일정 양식의 9단계가 알림 섹션입니다. <strong>알림 보내기</strong>를 토글하여
        알림 플래너를 표시하십시오. 보내려는 각 알림에 대해 다음을 입력하십시오:
      </p>
      <dl>
        <dt>알림 제목</dt>
        <dd>참여자 기기의 알림 푸시 알림에서 굵게 표시되는 첫 번째 줄입니다.</dd>
        <dt>알림 메시지</dt>
        <dd>알림 본문 — 시스템 트레이에 표시되는 두 번째 줄입니다.</dd>
        <dt>발송 후 시간</dt>
        <dd>
          원래 알림으로부터의 지연: 일 + 시간 + 분. 0일, 1시간, 0분으로 설정된 알림은
          원래 발송 후 한 시간 뒤에 발송됩니다. 세 필드 모두 기본값이 0이므로
          적어도 하나를 0이 아닌 값으로 설정하십시오.
        </dd>
      </dl>
      <p>
        <strong>새 알림 추가</strong>를 클릭하여 다른 간격으로 두 번째 알림을 추가하십시오.
        필요한 만큼 알림을 연결할 수 있습니다 — 예를 들어 1시간 후 첫 번째 알림,
        4시간 후 두 번째 알림. 이미 발송된 알림에 관계없이 완료 이벤트가 도착하는 즉시
        모든 알림이 취소됩니다.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>완료 이벤트 등록하기</h2>
      <p>
        Samply는 참여자가 설문을 언제 완료하는지 자체적으로 알 수 없습니다. 설문 도구가
        Samply 완료 엔드포인트를 호출하여 완료 신호를 보내야 합니다. 이를 위한 두 가지 방법이 있습니다.
      </p>
      <p>
        연구에 대한 정확한 URL — 올바른 슬러그가 이미 입력된 — 은 연구 대시보드의{' '}
        <strong>설정</strong> 탭에서{' '}
        <em>알림 — 완료 URL</em> 아래에 표시됩니다. 거기서 직접 복사할 수 있습니다.
      </p>

      <h3>옵션 1 — 리디렉션 (Qualtrics, LimeSurvey, 대부분의 설문 도구)</h3>
      <p>
        설문 마지막에 참여자를 Samply 완료 URL로 리디렉션하십시오.
        Samply는 발송을 완료됨으로 표시하고 대기 중인 알림을 취소한 후 참여자에게 확인 페이지를 보여줍니다.
      </p>
      <p>
        리디렉션 URL은 다음 패턴을 따릅니다 — <em>your-study-slug</em>를 연구 URL 슬러그로 바꾸고
        <Code>%MESSAGE_ID%</Code> 플레이스홀더를 사용하여 각 참여자의 완료가 특정 발송에 기록되도록 하십시오:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics에서는 이를 설문 종료 리디렉션 URL로 설정하십시오. LimeSurvey에서는
        설문 설정 패널의 &quot;End URL&quot;로 설정하십시오. 설문 도구는 알림 링크에서
        전달한 URL 파라미터를 통해 수신한 실제 메시지 ID로 <Code>%MESSAGE_ID%</Code>를 대체합니다
        (<a href='/docs/placeholders'>URL 플레이스홀더</a> 참조).
      </p>

      <h3>옵션 2 — POST 요청 (REDCap, 사용자 지정 통합)</h3>
      <p>
        동일한 엔드포인트로 HTTP POST를 전송하십시오. 이는 설문 종료 웹훅을 지원하는
        설문 도구나 서버 측에서 실행되는 사용자 지정 코드에 적합합니다.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        <code>200</code> 응답은 완료가 기록되고 알림이 취소되었음을 확인합니다.
        <code>400</code> 응답은 Samply가 해당 메시지 ID에 대한 일치하는 결과 레코드를 찾을 수 없다는 것을 의미합니다 —
        <Code>%MESSAGE_ID%</Code>가 올바르게 대체되고 전달되었는지 확인하십시오.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>MESSAGE_ID가 필요한 이유</h2>
      <p>
        Samply는 <Code>%MESSAGE_ID%</Code>를 사용하여 완료 이벤트를 설문을 유발한
        정확한 알림 발송과 연결합니다. 이것이 없으면 Samply는 어떤 대기 중인 알림을
        취소해야 하는지 식별할 수 없습니다. 처리 흐름은 다음과 같습니다:
      </p>
      <ol>
        <li>
          알림 웹 링크에 쿼리 파라미터로 <Code>%MESSAGE_ID%</Code>를 입력합니다 —
          예: <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply는 발송 시 토큰을 고유한 15자 ID로 대체합니다.
          참여자는 해당 ID가 이미 포함된 설문 URL을 엽니다.
        </li>
        <li>
          설문 도구는 <code>messageid</code> 파라미터를 읽고 이를 설문 종료 리디렉션
          또는 웹훅에 전달합니다.
        </li>
        <li>
          Samply는 메시지 ID가 포함된 완료 호출을 수신하고 알림을 취소하며
          결과 레코드를 완료됨으로 표시합니다.
        </li>
      </ol>
      <p>
        알림을 사용하는 경우 알림 URL에 항상 <Code>%MESSAGE_ID%</Code>를 포함하고
        설문 도구가 이를 완료 엔드포인트로 전달하는지 확인하십시오.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics 설정 안내</h2>
      <ol>
        <li>
          알림 웹 링크에 <code>?messageid=%MESSAGE_ID%</code>를 추가하십시오(필요한
          다른 플레이스홀더도 함께).
        </li>
        <li>
          Qualtrics 설문 흐름에서 첫 번째 블록 앞에 <strong>포함된 데이터</strong> 요소를
          추가하고 <code>messageid</code>라는 필드를 생성하십시오. Qualtrics는 쿼리 문자열
          파라미터를 자동으로 캡처합니다.
        </li>
        <li>
          <strong>설문 옵션 → 설문 종료</strong>에서 리디렉션 URL을 다음으로 설정하십시오:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics는 <code>{'{e://Field/messageid}'}</code>를 캡처된 값으로 대체하여
        참여자가 올바른 완료 URL로 리디렉션됩니다.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>주의 사항</h3>
      <dl>
        <dt>완료 이벤트가 도착하지 않으면 알림이 발송됩니다</dt>
        <dd>
          참여자가 설문 중간에 포기했거나, 설문 도구가 잘못 구성되었거나, 완료 URL에 오타가 있어
          리디렉션 또는 POST가 Samply에 도달하지 않으면 — 알림은 예정대로 발송됩니다.
          서비스 시작 전에 테스트 참여자로 전체 흐름을 테스트하십시오.
        </dd>
        <dt>알림은 원래 대체된 URL을 상속합니다</dt>
        <dd>
          알림 알림에 삽입된 설문 URL은 원래 발송에서 이미 대체된 URL입니다 — 새로운 대체가 아닙니다.
          동일한 메시지 ID, batch 번호 및 타임스탬프가 적용됩니다. 이는 의도적입니다:
          알림은 동일한 설문 세션을 다시 열어야 합니다. 설문 도구가 링크를 열 때마다
          새 응답을 생성하는 경우 로직이 이를 처리하는지 확인하십시오.
        </dd>
        <dt>알림 행은 대기열 한도에 포함됩니다</dt>
        <dd>
          각 알림 행은 대기열의 별도 대기 항목이며 연구당 50,000행 한도에 포함됩니다.
          100명의 참여자와 발송당 2개의 알림이 있는 일정은 발송당 1행이 아닌 3행을 생성합니다.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentIt({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un promemoria è una notifica push di follow-up che Samply invia automaticamente quando
        non ha rilevato il completamento del sondaggio per l&apos;invio originale. I promemoria sono
        facoltativi e configurati per calendario. Vengono attivati a un intervallo fisso dopo la
        notifica originale — a meno che il partecipante non completi prima il sondaggio, nel qual
        caso Samply annulla automaticamente tutti i promemoria in sospeso per quell&apos;invio.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Come funzionano i promemoria</h2>
      <p>
        Quando Samply invia una notifica originale, pianifica immediatamente tutte le righe di
        promemoria configurate nella coda. Ogni riga di promemoria è una voce separata{' '}
        <strong>in sospeso</strong> nella coda con <strong>Promemoria: sì</strong>. Il promemoria
        eredita lo stesso URL del sondaggio (inclusi tutti i valori segnaposto sostituiti)
        dell&apos;invio originale — i partecipanti che toccano il collegamento del promemoria
        accedono alla stessa sessione del sondaggio.
      </p>
      <p>
        I promemoria vengono annullati in due modi:
      </p>
      <ol>
        <li>
          Samply riceve un <strong>evento di completamento</strong> per l&apos;invio originale
          (tramite reindirizzamento o richiesta POST — vedere di seguito). Annulla immediatamente
          tutti i promemoria in sospeso che condividono lo stesso ID di invio interno.
        </li>
        <li>
          Si elimina manualmente il calendario o si annullano le righe dalla{' '}
          <a href='/docs/queue'>coda</a>.
        </li>
      </ol>
      <p>
        Senza un evento di completamento, ogni invio riceve un promemoria indipendentemente dal
        fatto che il partecipante abbia effettivamente completato il sondaggio.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurazione dei promemoria nel modulo del calendario</h2>
      <p>
        Il passaggio 9 del modulo del calendario è la sezione dei promemoria. Attivare{' '}
        <strong>Invia promemoria</strong> per visualizzare il pianificatore dei promemoria.
        Per ogni promemoria che si desidera inviare, compilare:
      </p>
      <dl>
        <dt>Titolo del promemoria</dt>
        <dd>La prima riga in grassetto della notifica push del promemoria sul dispositivo del partecipante.</dd>
        <dt>Messaggio del promemoria</dt>
        <dd>Il corpo della notifica — la seconda riga visibile nel vassoio di sistema.</dd>
        <dt>Inviato dopo</dt>
        <dd>
          Il ritardo rispetto alla notifica originale: giorni + ore + minuti. Un promemoria impostato
          a 0 giorni, 1 ora, 0 minuti viene attivato un&apos;ora dopo l&apos;invio originale. Tutti e tre i campi
          hanno il valore predefinito 0 — impostarne almeno uno su un valore diverso da zero.
        </dd>
      </dl>
      <p>
        Fare clic su <strong>Aggiungi nuovo promemoria</strong> per aggiungere un secondo promemoria
        con un intervallo diverso. È possibile concatenare tutti i promemoria necessari — ad esempio,
        un primo promemoria dopo 1 ora e un secondo dopo 4 ore. Tutti i promemoria vengono annullati
        non appena arriva un evento di completamento, indipendentemente da quali siano già stati attivati.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Registrazione di un evento di completamento</h2>
      <p>
        Samply non è in grado di sapere autonomamente quando un partecipante termina un sondaggio.
        Lo strumento di sondaggio deve segnalare il completamento chiamando l&apos;endpoint di completamento
        di Samply. Esistono due modi per farlo.
      </p>
      <p>
        Gli URL esatti per lo studio — con lo slug corretto già inserito — sono mostrati nella
        scheda <strong>Impostazioni</strong> del dashboard dello studio, sotto{' '}
        <em>Promemoria — URL di completamento</em>. È possibile copiarli direttamente da lì.
      </p>

      <h3>Opzione 1 — reindirizzamento (Qualtrics, LimeSurvey, la maggior parte degli strumenti di sondaggio)</h3>
      <p>
        Alla fine del sondaggio, reindirizzare il partecipante all&apos;URL di completamento di Samply.
        Samply contrassegna l&apos;invio come completato e annulla i promemoria in sospeso, quindi mostra
        al partecipante una pagina di conferma.
      </p>
      <p>
        L&apos;URL di reindirizzamento segue questo schema — sostituire <em>your-study-slug</em> con
        lo slug URL dello studio e utilizzare il segnaposto <Code>%MESSAGE_ID%</Code> affinché il
        completamento di ciascun partecipante venga registrato rispetto al suo invio specifico:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        In Qualtrics, impostarlo come URL di reindirizzamento al termine del sondaggio. In LimeSurvey,
        impostarlo come &quot;End URL&quot; nel pannello delle impostazioni del sondaggio. Lo strumento
        di sondaggio sostituisce <Code>%MESSAGE_ID%</Code> con l&apos;ID messaggio effettivo ricevuto tramite
        il parametro URL passato nel collegamento alla notifica (vedere{' '}
        <a href='/docs/placeholders'>Segnaposto URL</a>).
      </p>

      <h3>Opzione 2 — richiesta POST (REDCap, integrazioni personalizzate)</h3>
      <p>
        Inviare un HTTP POST allo stesso endpoint. Questo è adatto per gli strumenti di sondaggio che
        supportano webhook di fine sondaggio, o per codice personalizzato eseguito lato server.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Una risposta <code>200</code> conferma che il completamento è stato registrato e i promemoria
        sono stati annullati. Una risposta <code>400</code> significa che Samply non ha trovato un
        record di risultati corrispondente per quell&apos;ID messaggio — verificare che <Code>%MESSAGE_ID%</Code>{' '}
        sia stato correttamente sostituito e trasmesso.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Perché MESSAGE_ID è obbligatorio</h2>
      <p>
        Samply usa <Code>%MESSAGE_ID%</Code> per collegare un evento di completamento all&apos;esatto
        invio della notifica che ha generato il sondaggio. Senza di esso, Samply non può identificare
        quali promemoria in sospeso annullare. Il flusso è:
      </p>
      <ol>
        <li>
          Si inserisce <Code>%MESSAGE_ID%</Code> nel collegamento web della notifica come parametro
          di query — ad esempio <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply sostituisce il token con un ID univoco di 15 caratteri al momento dell&apos;invio.
          Il partecipante apre l&apos;URL del sondaggio con quell&apos;ID già inserito.
        </li>
        <li>
          Lo strumento di sondaggio legge il parametro <code>messageid</code> e lo trasmette al
          reindirizzamento di fine sondaggio o al webhook.
        </li>
        <li>
          Samply riceve la chiamata di completamento con l&apos;ID messaggio, annulla i promemoria e
          contrassegna il record dei risultati come completato.
        </li>
      </ol>
      <p>
        Se si utilizzano i promemoria, includere sempre <Code>%MESSAGE_ID%</Code> nell&apos;URL della
        notifica e verificare che lo strumento di sondaggio lo inoltri all&apos;endpoint di completamento.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Procedura dettagliata di configurazione in Qualtrics</h2>
      <ol>
        <li>
          Nel collegamento web della notifica, aggiungere <code>?messageid=%MESSAGE_ID%</code> (più
          qualsiasi altro segnaposto necessario).
        </li>
        <li>
          Nel flusso del sondaggio Qualtrics, aggiungere un elemento <strong>Dati incorporati</strong>{' '}
          prima del primo blocco e creare un campo denominato <code>messageid</code>. Qualtrics
          acquisisce automaticamente i parametri della stringa di query.
        </li>
        <li>
          In <strong>Opzioni sondaggio → Terminazione sondaggio</strong>, impostare
          l&apos;URL di reindirizzamento su:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics sostituisce <code>{'{e://Field/messageid}'}</code> con il valore acquisito,
        in modo che i partecipanti vengano reindirizzati al corretto URL di completamento.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspetti a cui prestare attenzione</h3>
      <dl>
        <dt>I promemoria vengono attivati se non arriva alcun evento di completamento</dt>
        <dd>
          Se il reindirizzamento o il POST non raggiunge mai Samply — perché il partecipante ha
          abbandonato il sondaggio a metà, perché lo strumento di sondaggio era configurato in modo
          errato, o perché l&apos;URL di completamento conteneva un errore di battitura — il promemoria
          verrà attivato come pianificato. Testare il flusso completo con un partecipante di test
          prima di andare in produzione.
        </dd>
        <dt>I promemoria ereditano l&apos;URL sostituito originale</dt>
        <dd>
          L&apos;URL del sondaggio incorporato nelle notifiche di promemoria è l&apos;URL già sostituito
          dell&apos;invio originale — non una nuova sostituzione. Si applicano lo stesso ID messaggio,
          numero di batch e timestamp. Ciò è intenzionale: il promemoria dovrebbe riaprire la stessa
          sessione del sondaggio. Se lo strumento di sondaggio crea una nuova risposta a ogni apertura
          del collegamento, assicurarsi che la propria logica lo gestisca.
        </dd>
        <dt>Le righe di promemoria contano verso il limite della coda</dt>
        <dd>
          Ogni riga di promemoria è una voce in sospeso separata nella coda e conta verso il limite
          di 50.000 righe per studio. Un calendario con 100 partecipanti e 2 promemoria per invio
          genera 3 righe per invio, non 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentFr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un rappel est une notification push de suivi que Samply envoie automatiquement lorsqu'il
        n'a pas détecté de complétion de l'enquête pour l'envoi original. Les rappels sont
        facultatifs et configurés par calendrier. Ils se déclenchent à un délai fixe après la
        notification originale — sauf si le participant complète l'enquête en premier, auquel
        cas Samply annule automatiquement tous les rappels en attente pour cet envoi.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Fonctionnement des rappels</h2>
      <p>
        Lorsque Samply envoie une notification originale, il planifie immédiatement toutes les
        lignes de rappel configurées dans la file d'attente. Chaque ligne de rappel est une entrée
        distincte <strong>en attente</strong> dans la file d'attente avec{' '}
        <strong>Rappel : oui</strong>. Le rappel hérite du même URL d'enquête (y compris toutes
        les valeurs de paramètres substitués) que l'envoi original — les participants qui appuient
        sur le lien de rappel accèdent à la même session d'enquête.
      </p>
      <p>
        Les rappels sont annulés de deux manières :
      </p>
      <ol>
        <li>
          Samply reçoit un <strong>événement de complétion</strong> pour l'envoi original (via
          une redirection ou une requête POST — voir ci-dessous). Il annule immédiatement tous
          les rappels en attente qui partagent le même identifiant d'envoi interne.
        </li>
        <li>
          Vous supprimez manuellement le calendrier ou annulez les lignes depuis la{' '}
          <a href='/docs/queue'>file d'attente</a>.
        </li>
      </ol>
      <p>
        Sans événement de complétion, chaque envoi reçoit un rappel, que le participant ait
        réellement complété l'enquête ou non.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurer les rappels dans le formulaire de calendrier</h2>
      <p>
        L'étape 9 du formulaire de calendrier est la section des rappels. Activez{' '}
        <strong>Envoyer des rappels</strong> pour afficher le planificateur de rappels. Pour
        chaque rappel que vous souhaitez envoyer, renseignez :
      </p>
      <dl>
        <dt>Titre du rappel</dt>
        <dd>La première ligne en gras de la notification push de rappel sur l'appareil du participant.</dd>
        <dt>Message du rappel</dt>
        <dd>Le corps de la notification — la deuxième ligne visible dans la barre système.</dd>
        <dt>Envoyé après</dt>
        <dd>
          Le délai après la notification originale : jours + heures + minutes. Un rappel réglé
          sur 0 jours, 1 heure, 0 minute se déclenche une heure après l'envoi original. Les trois
          champs ont la valeur par défaut 0 — réglez au moins l'un d'eux sur une valeur non nulle.
        </dd>
      </dl>
      <p>
        Cliquez sur <strong>Ajouter un nouveau rappel</strong> pour ajouter un deuxième rappel
        avec un délai différent. Vous pouvez enchaîner autant de rappels que nécessaire — par
        exemple, un premier rappel après 1 heure et un second après 4 heures. Tous les rappels
        sont annulés dès qu'un événement de complétion arrive, quels que soient ceux qui ont
        déjà été déclenchés.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Enregistrer un événement de complétion</h2>
      <p>
        Samply ne peut pas savoir par lui-même quand un participant termine une enquête. Votre
        outil d'enquête doit signaler la complétion en appelant le point de terminaison de
        complétion de Samply. Il existe deux façons de procéder.
      </p>
      <p>
        Les URL exactes pour votre étude — avec le bon slug déjà renseigné — sont affichées dans
        l'onglet <strong>Paramètres</strong> de votre tableau de bord d'étude, sous{' '}
        <em>Rappels — URL de complétion</em>. Vous pouvez les copier directement depuis cet endroit.
      </p>

      <h3>Option 1 — redirection (Qualtrics, LimeSurvey, la plupart des outils d'enquête)</h3>
      <p>
        À la fin de votre enquête, redirigez le participant vers l'URL de complétion de Samply.
        Samply marque l'envoi comme complété et annule les rappels en attente, puis affiche une
        page de confirmation au participant.
      </p>
      <p>
        L'URL de redirection suit ce modèle — remplacez <em>your-study-slug</em> par le slug URL
        de votre étude et utilisez le paramètre <Code>%MESSAGE_ID%</Code> afin que la complétion
        de chaque participant soit enregistrée pour son envoi spécifique :
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Dans Qualtrics, définissez ceci comme URL de redirection de fin d'enquête. Dans
        LimeSurvey, définissez-le comme &quot;URL de fin&quot; dans le panneau des paramètres
        de l'enquête. L'outil d'enquête remplace <Code>%MESSAGE_ID%</Code> par l'identifiant de
        message réel reçu via le paramètre URL que vous avez transmis dans le lien de notification
        (voir <a href='/docs/placeholders'>Paramètres URL</a>).
      </p>

      <h3>Option 2 — requête POST (REDCap, intégrations personnalisées)</h3>
      <p>
        Envoyez un HTTP POST au même point de terminaison. Cela convient aux outils d'enquête
        qui prennent en charge les webhooks de fin d'enquête, ou au code personnalisé exécuté
        côté serveur.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Une réponse <code>200</code> confirme que la complétion a été enregistrée et que les
        rappels ont été annulés. Une réponse <code>400</code> signifie que Samply n'a pas pu
        trouver d'enregistrement de résultat correspondant pour cet identifiant de message —
        vérifiez que <Code>%MESSAGE_ID%</Code> a été correctement substitué et transmis.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Pourquoi MESSAGE_ID est obligatoire</h2>
      <p>
        Samply utilise <Code>%MESSAGE_ID%</Code> pour relier un événement de complétion à
        l'envoi de notification exact qui a déclenché l'enquête. Sans lui, Samply ne peut pas
        identifier quels rappels en attente annuler. Le déroulement est le suivant :
      </p>
      <ol>
        <li>
          Vous placez <Code>%MESSAGE_ID%</Code> dans le lien web de la notification en tant que
          paramètre de requête — par exemple <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply substitue le jeton par un identifiant unique de 15 caractères au moment de
          l'envoi. Le participant ouvre l'URL de l'enquête avec cet identifiant déjà inclus.
        </li>
        <li>
          Votre outil d'enquête lit le paramètre <code>messageid</code> et le transmet à la
          redirection de fin d'enquête ou au webhook.
        </li>
        <li>
          Samply reçoit l'appel de complétion avec l'identifiant de message, annule les rappels
          et marque l'enregistrement de résultat comme complété.
        </li>
      </ol>
      <p>
        Si vous utilisez des rappels, incluez toujours <Code>%MESSAGE_ID%</Code> dans l'URL de
        votre notification et vérifiez que votre outil d'enquête le transmet au point de
        terminaison de complétion.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Guide de configuration Qualtrics étape par étape</h2>
      <ol>
        <li>
          Dans le lien web de la notification, ajoutez{' '}
          <code>?messageid=%MESSAGE_ID%</code> (ainsi que tout autre paramètre dont vous avez
          besoin).
        </li>
        <li>
          Dans votre flux d'enquête Qualtrics, ajoutez un élément{' '}
          <strong>Données incorporées</strong> avant le premier bloc et créez un champ nommé{' '}
          <code>messageid</code>. Qualtrics capture automatiquement les paramètres de chaîne
          de requête.
        </li>
        <li>
          Dans <strong>Options de l'enquête → Fin de l'enquête</strong>, définissez l'URL de
          redirection sur :
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics remplace <code>{'{e://Field/messageid}'}</code> par la valeur capturée,
        de sorte que les participants sont redirigés vers l'URL de complétion correcte.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Points d'attention</h3>
      <dl>
        <dt>Les rappels se déclenchent si aucun événement de complétion n'arrive</dt>
        <dd>
          Si la redirection ou le POST n'atteint jamais Samply — parce que le participant a
          abandonné l'enquête en cours de route, parce que l'outil d'enquête était mal configuré,
          ou parce que l'URL de complétion contenait une faute de frappe — le rappel se
          déclenchera comme prévu. Testez le flux complet avec un participant de test avant de
          passer en production.
        </dd>
        <dt>Les rappels héritent de l'URL substituée d'origine</dt>
        <dd>
          L'URL d'enquête incorporée dans les notifications de rappel est l'URL déjà substituée
          de l'envoi original — et non une nouvelle substitution. Le même identifiant de message,
          numéro de lot et horodatages s'appliquent. Ceci est intentionnel : le rappel doit
          rouvrir la même session d'enquête. Si votre outil d'enquête crée une nouvelle réponse
          à chaque ouverture d'un lien, assurez-vous que votre logique gère ce cas.
        </dd>
        <dt>Les lignes de rappel comptent dans la limite de la file d'attente</dt>
        <dd>
          Chaque ligne de rappel est une entrée distincte en attente dans la file d'attente et
          compte dans la limite de 50 000 lignes par étude. Un calendrier avec 100 participants
          et 2 rappels par envoi génère 3 lignes par envoi, et non 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentEs({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un recordatorio es una notificación push de seguimiento que Samply envía automáticamente
        cuando no ha detectado la finalización de la encuesta para el envío original. Los
        recordatorios son opcionales y se configuran por calendario. Se activan con un desfase
        fijo después de la notificación original — a menos que el participante complete la encuesta
        primero, en cuyo caso Samply cancela automáticamente todos los recordatorios pendientes
        para ese envío.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Cómo funcionan los recordatorios</h2>
      <p>
        Cuando Samply despacha una notificación original, programa inmediatamente todas las filas
        de recordatorio configuradas en la cola. Cada fila de recordatorio es una entrada distinta{' '}
        <strong>pendiente</strong> en la cola con <strong>Recordatorio: sí</strong>. El recordatorio
        hereda la misma URL de encuesta (incluidos todos los valores de marcadores sustituidos) que
        el envío original — los participantes que tocan el enlace del recordatorio llegan a la misma
        sesión de encuesta.
      </p>
      <p>
        Los recordatorios se cancelan de dos maneras:
      </p>
      <ol>
        <li>
          Samply recibe un <strong>evento de finalización</strong> para el envío original (mediante
          redirección o solicitud POST — véase más abajo). Cancela inmediatamente todos los
          recordatorios pendientes que comparten el mismo ID de envío interno.
        </li>
        <li>
          Usted elimina manualmente el calendario o cancela las filas desde la{' '}
          <a href='/docs/queue'>cola</a>.
        </li>
      </ol>
      <p>
        Sin un evento de finalización, cada envío recibe un recordatorio independientemente de si
        el participante completó realmente la encuesta.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurar recordatorios en el formulario de calendario</h2>
      <p>
        El paso 9 del formulario de calendario es la sección de recordatorios. Active{' '}
        <strong>Enviar recordatorios</strong> para mostrar el planificador de recordatorios. Para
        cada recordatorio que desee enviar, rellene:
      </p>
      <dl>
        <dt>Título del recordatorio</dt>
        <dd>La primera línea en negrita de la notificación push de recordatorio en el dispositivo del participante.</dd>
        <dt>Mensaje del recordatorio</dt>
        <dd>El cuerpo de la notificación — la segunda línea visible en la bandeja del sistema.</dd>
        <dt>Enviado después de</dt>
        <dd>
          El retraso desde la notificación original: días + horas + minutos. Un recordatorio
          configurado a 0 días, 1 hora, 0 minutos se activa una hora después del envío original.
          Los tres campos tienen el valor predeterminado 0 — establezca al menos uno en un valor
          distinto de cero.
        </dd>
      </dl>
      <p>
        Haga clic en <strong>Añadir nuevo recordatorio</strong> para agregar un segundo recordatorio
        con un desfase diferente. Puede encadenar tantos recordatorios como necesite — por ejemplo,
        un primer recordatorio a 1 hora y un segundo a 4 horas. Todos los recordatorios se cancelan
        en cuanto llega un evento de finalización, independientemente de cuáles ya se hayan activado.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Registrar un evento de finalización</h2>
      <p>
        Samply no puede saber por sí mismo cuándo un participante termina una encuesta. Su
        herramienta de encuesta debe señalar la finalización llamando al endpoint de finalización
        de Samply. Hay dos formas de hacerlo.
      </p>
      <p>
        Las URL exactas para su estudio — con el slug correcto ya introducido — se muestran en la
        pestaña <strong>Configuración</strong> del panel de su estudio, bajo{' '}
        <em>Recordatorios — URL de finalización</em>. Puede copiarlas directamente desde allí.
      </p>

      <h3>Opción 1 — redirección (Qualtrics, LimeSurvey, la mayoría de herramientas de encuesta)</h3>
      <p>
        Al final de su encuesta, redirija al participante a la URL de finalización de Samply.
        Samply marca el envío como completado y cancela los recordatorios pendientes, y luego
        muestra al participante una página de confirmación.
      </p>
      <p>
        La URL de redirección sigue este patrón — reemplace <em>your-study-slug</em> con el slug
        URL de su estudio y use el marcador <Code>%MESSAGE_ID%</Code> para que la finalización
        de cada participante quede registrada frente a su envío específico:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        En Qualtrics, configúrelo como la URL de redirección al final de la encuesta. En
        LimeSurvey, configúrelo como la «URL final» en el panel de configuración de la encuesta.
        La herramienta de encuesta sustituye <Code>%MESSAGE_ID%</Code> por el ID de mensaje real
        recibido a través del parámetro URL que pasó en el enlace de notificación (véase{' '}
        <a href='/docs/placeholders'>Marcadores de URL</a>).
      </p>

      <h3>Opción 2 — solicitud POST (REDCap, integraciones personalizadas)</h3>
      <p>
        Envíe un HTTP POST al mismo endpoint. Esto es adecuado para herramientas de encuesta
        que admiten webhooks de fin de encuesta, o para código personalizado que se ejecuta
        en el servidor.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Una respuesta <code>200</code> confirma que la finalización fue registrada y los
        recordatorios fueron cancelados. Una respuesta <code>400</code> significa que Samply no
        pudo encontrar un registro de resultado coincidente para ese ID de mensaje — verifique
        que <Code>%MESSAGE_ID%</Code> fue correctamente sustituido y transmitido.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Por qué MESSAGE_ID es obligatorio</h2>
      <p>
        Samply usa <Code>%MESSAGE_ID%</Code> para vincular un evento de finalización con el
        envío de notificación exacto que activó la encuesta. Sin él, Samply no puede identificar
        qué recordatorios pendientes cancelar. El flujo es:
      </p>
      <ol>
        <li>
          Usted coloca <Code>%MESSAGE_ID%</Code> en el enlace web de la notificación como
          parámetro de consulta — por ejemplo, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply sustituye el token por un ID único de 15 caracteres en el momento del envío.
          El participante abre la URL de la encuesta con ese ID ya incluido.
        </li>
        <li>
          Su herramienta de encuesta lee el parámetro <code>messageid</code> y lo pasa a la
          redirección de fin de encuesta o al webhook.
        </li>
        <li>
          Samply recibe la llamada de finalización con el ID de mensaje, cancela los recordatorios
          y marca el registro de resultado como completado.
        </li>
      </ol>
      <p>
        Si usa recordatorios, incluya siempre <Code>%MESSAGE_ID%</Code> en la URL de su
        notificación y verifique que su herramienta de encuesta lo transmite al endpoint de
        finalización.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Guía de configuración de Qualtrics paso a paso</h2>
      <ol>
        <li>
          En el enlace web de la notificación, añada{' '}
          <code>?messageid=%MESSAGE_ID%</code> (más cualquier otro marcador que necesite).
        </li>
        <li>
          En el flujo de su encuesta de Qualtrics, añada un elemento de{' '}
          <strong>Datos incrustados</strong> antes del primer bloque y cree un campo llamado{' '}
          <code>messageid</code>. Qualtrics captura automáticamente los parámetros de cadena
          de consulta.
        </li>
        <li>
          En <strong>Opciones de encuesta → Finalización de la encuesta</strong>, configure
          la URL de redirección en:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics sustituye <code>{'{e://Field/messageid}'}</code> por el valor capturado,
        de modo que los participantes son redirigidos a la URL de finalización correcta.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a tener en cuenta</h3>
      <dl>
        <dt>Los recordatorios se activan si no llega ningún evento de finalización</dt>
        <dd>
          Si la redirección o el POST nunca llega a Samply — porque el participante abandonó
          la encuesta a mitad, porque la herramienta de encuesta estaba mal configurada, o
          porque la URL de finalización tenía un error tipográfico — el recordatorio se
          activará según lo programado. Pruebe el flujo completo con un participante de prueba
          antes de poner en marcha el estudio.
        </dd>
        <dt>Los recordatorios heredan la URL sustituida original</dt>
        <dd>
          La URL de encuesta incorporada en las notificaciones de recordatorio es la URL ya
          sustituida del envío original — no una nueva sustitución. Se aplican el mismo ID de
          mensaje, número de lote y marcas de tiempo. Esto es intencional: el recordatorio debe
          reabrir la misma sesión de encuesta. Si su herramienta de encuesta crea una nueva
          respuesta para cada apertura de enlace, asegúrese de que su lógica gestiona este caso.
        </dd>
        <dt>Las filas de recordatorio cuentan para el límite de la cola</dt>
        <dd>
          Cada fila de recordatorio es una entrada distinta pendiente en la cola y cuenta para
          el límite de 50 000 filas por estudio. Un calendario con 100 participantes y 2
          recordatorios por envío genera 3 filas por envío, no 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentPt({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Um lembrete é uma notificação push de acompanhamento que o Samply envia automaticamente
        quando não detectou a conclusão da pesquisa para o envio original. Os
        lembretes são opcionais e configurados por calendário. Eles disparam com um deslocamento
        fixo após a notificação original — a menos que o participante conclua a pesquisa
        primeiro, caso em que o Samply cancela automaticamente todos os lembretes pendentes
        para esse envio.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Como funcionam os lembretes</h2>
      <p>
        Quando o Samply despacha uma notificação original, ele agenda imediatamente todas as linhas
        de lembrete configuradas na fila. Cada linha de lembrete é uma entrada distinta{' '}
        <strong>pendente</strong> na fila com <strong>Lembrete: sim</strong>. O lembrete
        herda a mesma URL de pesquisa (incluindo todos os valores de marcadores substituídos) que
        o envio original — os participantes que tocam no link do lembrete chegam à mesma
        sessão de pesquisa.
      </p>
      <p>
        Os lembretes são cancelados de duas maneiras:
      </p>
      <ol>
        <li>
          O Samply recebe um <strong>evento de conclusão</strong> para o envio original (mediante
          redirecionamento ou solicitação POST — veja abaixo). Ele cancela imediatamente todos os
          lembretes pendentes que compartilham o mesmo ID de envio interno.
        </li>
        <li>
          Você exclui manualmente o calendário ou cancela as linhas da{' '}
          <a href='/docs/queue'>fila</a>.
        </li>
      </ol>
      <p>
        Sem um evento de conclusão, cada envio recebe um lembrete independentemente de o
        participante ter realmente concluído a pesquisa.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurar lembretes no formulário de calendário</h2>
      <p>
        O passo 9 do formulário de calendário é a seção de lembretes. Ative{' '}
        <strong>Enviar lembretes</strong> para exibir o planejador de lembretes. Para
        cada lembrete que deseja enviar, preencha:
      </p>
      <dl>
        <dt>Título do lembrete</dt>
        <dd>A primeira linha em negrito da notificação push de lembrete no dispositivo do participante.</dd>
        <dt>Mensagem do lembrete</dt>
        <dd>O corpo da notificação — a segunda linha visível na bandeja do sistema.</dd>
        <dt>Enviado após</dt>
        <dd>
          O atraso em relação à notificação original: dias + horas + minutos. Um lembrete
          configurado para 0 dias, 1 hora, 0 minutos dispara uma hora após o envio original.
          Os três campos têm valor padrão 0 — defina pelo menos um com um valor
          diferente de zero.
        </dd>
      </dl>
      <p>
        Clique em <strong>Adicionar novo lembrete</strong> para adicionar um segundo lembrete
        com um deslocamento diferente. Você pode encadear tantos lembretes quantos precisar — por exemplo,
        um primeiro lembrete em 1 hora e um segundo em 4 horas. Todos os lembretes são cancelados
        assim que chega um evento de conclusão, independentemente de quais já foram disparados.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Registrar um evento de conclusão</h2>
      <p>
        O Samply não pode saber por si só quando um participante termina uma pesquisa. Sua
        ferramenta de pesquisa deve sinalizar a conclusão chamando o endpoint de conclusão
        do Samply. Há duas maneiras de fazer isso.
      </p>
      <p>
        As URLs exatas para o seu estudo — com o slug correto já preenchido — são exibidas na
        aba <strong>Configurações</strong> do painel do seu estudo, em{' '}
        <em>Lembretes — URL de conclusão</em>. Você pode copiá-las diretamente de lá.
      </p>

      <h3>Opção 1 — redirecionamento (Qualtrics, LimeSurvey, a maioria das ferramentas de pesquisa)</h3>
      <p>
        Ao final da sua pesquisa, redirecione o participante para a URL de conclusão do Samply.
        O Samply marca o envio como concluído e cancela os lembretes pendentes, e depois
        exibe ao participante uma página de confirmação.
      </p>
      <p>
        A URL de redirecionamento segue este padrão — substitua <em>your-study-slug</em> pelo slug
        URL do seu estudo e use o marcador <Code>%MESSAGE_ID%</Code> para que a conclusão
        de cada participante seja registrada em seu envio específico:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        No Qualtrics, configure isso como a URL de redirecionamento ao final da pesquisa. No
        LimeSurvey, configure como a «URL final» no painel de configurações da pesquisa.
        A ferramenta de pesquisa substitui <Code>%MESSAGE_ID%</Code> pelo ID de mensagem real
        recebido por meio do parâmetro URL que você passou no link de notificação (veja{' '}
        <a href='/docs/placeholders'>Marcadores de URL</a>).
      </p>

      <h3>Opção 2 — solicitação POST (REDCap, integrações personalizadas)</h3>
      <p>
        Envie um HTTP POST para o mesmo endpoint. Isso é adequado para ferramentas de pesquisa
        que suportam webhooks de fim de pesquisa, ou para código personalizado executado
        no servidor.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Uma resposta <code>200</code> confirma que a conclusão foi registrada e os
        lembretes foram cancelados. Uma resposta <code>400</code> significa que o Samply não
        conseguiu encontrar um registro de resultado correspondente para esse ID de mensagem — verifique
        se <Code>%MESSAGE_ID%</Code> foi corretamente substituído e transmitido.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Por que MESSAGE_ID é obrigatório</h2>
      <p>
        O Samply usa <Code>%MESSAGE_ID%</Code> para vincular um evento de conclusão ao
        envio de notificação exato que disparou a pesquisa. Sem ele, o Samply não consegue identificar
        quais lembretes pendentes cancelar. O fluxo é:
      </p>
      <ol>
        <li>
          Você coloca <Code>%MESSAGE_ID%</Code> no link web da notificação como
          parâmetro de consulta — por exemplo, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          O Samply substitui o token por um ID único de 15 caracteres no momento do envio.
          O participante abre a URL da pesquisa com esse ID já incluído.
        </li>
        <li>
          Sua ferramenta de pesquisa lê o parâmetro <code>messageid</code> e o passa para o
          redirecionamento de fim de pesquisa ou webhook.
        </li>
        <li>
          O Samply recebe a chamada de conclusão com o ID de mensagem, cancela os lembretes
          e marca o registro de resultado como concluído.
        </li>
      </ol>
      <p>
        Se usar lembretes, sempre inclua <Code>%MESSAGE_ID%</Code> na URL da sua
        notificação e verifique se sua ferramenta de pesquisa o transmite ao endpoint de
        conclusão.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Guia de configuração do Qualtrics passo a passo</h2>
      <ol>
        <li>
          No link web da notificação, adicione{' '}
          <code>?messageid=%MESSAGE_ID%</code> (mais quaisquer outros marcadores que precisar).
        </li>
        <li>
          No fluxo da sua pesquisa do Qualtrics, adicione um elemento de{' '}
          <strong>Dados incorporados</strong> antes do primeiro bloco e crie um campo chamado{' '}
          <code>messageid</code>. O Qualtrics captura automaticamente os parâmetros de string
          de consulta.
        </li>
        <li>
          Em <strong>Opções de pesquisa → Conclusão da pesquisa</strong>, configure
          a URL de redirecionamento para:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        O Qualtrics substitui <code>{'{e://Field/messageid}'}</code> pelo valor capturado,
        de modo que os participantes são redirecionados para a URL de conclusão correta.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a observar</h3>
      <dl>
        <dt>Os lembretes disparam se nenhum evento de conclusão chegar</dt>
        <dd>
          Se o redirecionamento ou o POST nunca chegar ao Samply — porque o participante abandonou
          a pesquisa no meio, porque a ferramenta de pesquisa estava mal configurada, ou
          porque a URL de conclusão tinha um erro de digitação — o lembrete será
          disparado conforme programado. Teste o fluxo completo com um participante de teste
          antes de colocar o estudo em funcionamento.
        </dd>
        <dt>Os lembretes herdam a URL substituída original</dt>
        <dd>
          A URL de pesquisa incorporada nas notificações de lembrete é a URL já
          substituída do envio original — não uma nova substituição. O mesmo ID de
          mensagem, número de lote e carimbos de data/hora se aplicam. Isso é intencional: o lembrete deve
          reabrir a mesma sessão de pesquisa. Se sua ferramenta de pesquisa cria uma nova
          resposta para cada abertura de link, certifique-se de que sua lógica trata esse caso.
        </dd>
        <dt>As linhas de lembrete contam para o limite da fila</dt>
        <dd>
          Cada linha de lembrete é uma entrada distinta pendente na fila e conta para
          o limite de 50 000 linhas por estudo. Um calendário com 100 participantes e 2
          lembretes por envio gera 3 linhas por envio, não 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentJa({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        リマインダーは、元の送信に対する調査完了が検出されなかった場合にSamplyが自動的に送信する
        フォローアップのプッシュ通知です。リマインダーは任意で、スケジュールごとに設定します。
        参加者が先に調査を完了しない限り、元の通知から固定オフセットで発火します — 完了した場合、
        Samplyはその送信に対する保留中のすべてのリマインダーを自動的にキャンセルします。
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>リマインダーの仕組み</h2>
      <p>
        Samplyが元の通知を発送すると、設定されたすべてのリマインダー行をすぐにキューに
        スケジュールします。各リマインダー行は<strong>保留中</strong>の別個のキュー エントリで、
        <strong>リマインダー：はい</strong>とマークされています。リマインダーは元の送信と同じ
        調査URL（置換されたプレースホルダー値をすべて含む）を継承します — リマインダーのリンクを
        タップした参加者は同じ調査セッションに入ります。
      </p>
      <p>
        リマインダーは2つの方法でキャンセルされます：
      </p>
      <ol>
        <li>
          Samplyが元の送信に対する<strong>完了イベント</strong>（リダイレクトまたはPOSTリクエスト経由 — 下記参照）
          を受信します。同じ内部送信IDを共有する保留中のすべてのリマインダーを即座にキャンセルします。
        </li>
        <li>
          スケジュールを手動で削除するか、<a href='/docs/queue'>キュー</a>から行をキャンセルします。
        </li>
      </ol>
      <p>
        完了イベントがない場合、参加者が実際に調査を完了したかどうかに関わらず、各送信にリマインダーが送られます。
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>スケジュールフォームでリマインダーを設定する</h2>
      <p>
        スケジュールフォームのステップ9はリマインダーセクションです。<strong>リマインダーを送信</strong>を
        オンにして、リマインダープランナーを表示します。送信する各リマインダーについて、次を入力します：
      </p>
      <dl>
        <dt>リマインダータイトル</dt>
        <dd>参加者のデバイス上のリマインダー プッシュ通知の太字の最初の行。</dd>
        <dt>リマインダーメッセージ</dt>
        <dd>通知の本文 — システムトレイに表示される2行目。</dd>
        <dt>送信後</dt>
        <dd>
          元の通知からの遅延：日 + 時間 + 分。0日、1時間、0分に設定されたリマインダーは
          元の送信から1時間後に発火します。3つのフィールドはすべてデフォルトで0です — 少なくとも
          1つはゼロ以外の値に設定してください。
        </dd>
      </dl>
      <p>
        <strong>新しいリマインダーを追加</strong>をクリックして、異なるオフセットで2つ目のリマインダーを
        追加します。必要な数だけリマインダーをチェーンできます — 例えば、1時間後の最初のリマインダーと
        4時間後の2番目のリマインダー。完了イベントが到着すると、どれがすでに発火していても、
        すべてのリマインダーがキャンセルされます。
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>完了イベントの登録</h2>
      <p>
        Samplyは参加者がいつ調査を終えるかを単独で知ることはできません。調査ツールはSamplyの完了
        エンドポイントを呼び出して完了をシグナルする必要があります。これを行う方法は2つあります。
      </p>
      <p>
        研究のための正確なURL — 正しいスラッグがすでに入力されたもの — は、研究ダッシュボードの
        <strong>設定</strong>タブの<em>リマインダー — 完了URL</em>の下に表示されます。
        そこから直接コピーできます。
      </p>

      <h3>オプション1 — リダイレクト（Qualtrics、LimeSurvey、ほとんどの調査ツール）</h3>
      <p>
        調査の最後に、参加者をSamplyの完了URLにリダイレクトします。Samplyは送信を完了済みとして
        マークし、保留中のリマインダーをキャンセルし、参加者に確認ページを表示します。
      </p>
      <p>
        リダイレクトURLは次のパターンに従います — <em>your-study-slug</em>を研究のURLスラッグに
        置き換え、<Code>%MESSAGE_ID%</Code>プレースホルダーを使用して、各参加者の完了がその特定の
        送信に対して記録されるようにします：
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtricsでは、これを調査終了時のリダイレクトURLとして設定します。LimeSurveyでは、
        調査設定パネルの「終了URL」として設定します。調査ツールは<Code>%MESSAGE_ID%</Code>を、
        通知リンクで渡したURLパラメーターを介して受け取った実際のメッセージIDで置換します
        （<a href='/docs/placeholders'>URLプレースホルダー</a>を参照）。
      </p>

      <h3>オプション2 — POSTリクエスト（REDCap、カスタム統合）</h3>
      <p>
        同じエンドポイントにHTTP POSTを送信します。これは調査終了ウェブフックをサポートする
        調査ツール、またはサーバー側で実行されるカスタムコードに適しています。
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        <code>200</code>レスポンスは完了が記録され、リマインダーがキャンセルされたことを確認します。
        <code>400</code>レスポンスは、Samplyがそのメッセージ ID の一致する結果レコードを見つけられなかった
        ことを意味します — <Code>%MESSAGE_ID%</Code>が正しく置換されて渡されたか確認してください。
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>なぜMESSAGE_IDが必要か</h2>
      <p>
        Samplyは<Code>%MESSAGE_ID%</Code>を使用して、完了イベントを調査をトリガーした正確な
        通知送信にリンクします。これがないと、Samplyはどの保留中のリマインダーをキャンセルすべきか
        識別できません。フローは次のとおりです：
      </p>
      <ol>
        <li>
          通知Webリンクに<Code>%MESSAGE_ID%</Code>をクエリ パラメーターとして入れます — 例えば、
          <code>?messageid=%MESSAGE_ID%</code>。
        </li>
        <li>
          Samplyは送信時にこのトークンを15文字のユニークIDに置換します。参加者はそのIDが
          すでに含まれた調査URLを開きます。
        </li>
        <li>
          調査ツールは<code>messageid</code>パラメーターを読み取り、調査終了時のリダイレクトまたは
          ウェブフックに渡します。
        </li>
        <li>
          Samplyはメッセージ ID とともに完了呼び出しを受信し、リマインダーをキャンセルし、結果
          レコードを完了済みとしてマークします。
        </li>
      </ol>
      <p>
        リマインダーを使用する場合は、常に通知URLに<Code>%MESSAGE_ID%</Code>を含め、調査ツールが
        それを完了エンドポイントに転送することを確認してください。
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtricsの設定手順</h2>
      <ol>
        <li>
          通知Webリンクに、<code>?messageid=%MESSAGE_ID%</code>（および必要なその他のプレースホルダー）
          を追加します。
        </li>
        <li>
          Qualtricsの調査フローで、最初のブロックの前に<strong>埋め込みデータ</strong>要素を追加し、
          <code>messageid</code>という名前のフィールドを作成します。Qualtricsはクエリ文字列パラメーターを
          自動的にキャプチャします。
        </li>
        <li>
          <strong>調査オプション → 調査終了</strong>で、リダイレクトURLを次のように設定します：
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtricsは<code>{'{e://Field/messageid}'}</code>をキャプチャした値で置換するため、
        参加者は正しい完了URLにリダイレクトされます。
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意すべき点</h3>
      <dl>
        <dt>完了イベントが届かない場合、リマインダーが発火します</dt>
        <dd>
          リダイレクトまたはPOSTがSamplyに届かない場合 — 参加者が調査を途中で放棄した、調査ツールの
          設定が誤っていた、または完了URLにタイプミスがあったため — リマインダーは予定通りに発火します。
          公開前にテスト参加者でフロー全体をテストしてください。
        </dd>
        <dt>リマインダーは元の置換済みURLを継承します</dt>
        <dd>
          リマインダー通知に埋め込まれた調査URLは、元の送信から置換済みのURLであり、新しい置換ではありません。
          同じメッセージID、バッチ番号、タイムスタンプが適用されます。これは意図的なものです：
          リマインダーは同じ調査セッションを再度開く必要があります。調査ツールがリンクオープンごとに
          新しい応答を作成する場合、ロジックがこれを処理することを確認してください。
        </dd>
        <dt>リマインダー行はキュー制限にカウントされます</dt>
        <dd>
          各リマインダー行はキューの別個の保留中エントリであり、研究あたり50,000行の制限に
          カウントされます。100人の参加者と送信あたり2つのリマインダーを持つスケジュールは、
          送信ごとに3行ではなく、3行を生成します。
        </dd>
      </dl>
    </>
  );
}

function RemindersContentPl({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Przypomnienia to dodatkowe powiadomienia push, które Samply wysyła automatycznie, gdy
        nie wykryje ukończenia ankiety dla oryginalnej wysyłki. Przypomnienia są opcjonalne i
        konfigurujesz je dla każdego harmonogramu. Wyzwalają się ze stałymi przesunięciami od
        oryginalnego powiadomienia, chyba że uczestnik wcześniej ukończy ankietę — w takim
        przypadku Samply automatycznie anuluje wszystkie oczekujące przypomnienia dla tej wysyłki.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Jak działają przypomnienia</h2>
      <p>
        Gdy Samply wysyła oryginalne powiadomienie, natychmiast planuje wszystkie skonfigurowane
        wiersze przypomnień w kolejce. Każdy wiersz przypomnienia jest osobnym wpisem kolejki w
        stanie <strong>oczekuje</strong>, oznaczonym jako{' '}
        <strong>Przypomnienie: tak</strong>. Przypomnienia dziedziczą ten sam URL ankiety co
        oryginalna wysyłka (ze wszystkimi zastąpionymi wartościami placeholderów) — uczestnicy,
        którzy stukną w link przypomnienia, wejdą w tę samą sesję ankiety.
      </p>
      <p>
        Przypomnienia są anulowane na dwa sposoby:
      </p>
      <ol>
        <li>
          Samply otrzymuje <strong>zdarzenie ukończenia</strong> dla oryginalnej wysyłki (przez
          przekierowanie lub żądanie POST — patrz poniżej). Natychmiast anuluje wszystkie
          oczekujące przypomnienia, które dzielą ten sam wewnętrzny identyfikator wysyłki.
        </li>
        <li>
          Ręcznie usuwasz harmonogram lub anulujesz wiersz z{' '}
          <a href='/docs/queue'>Kolejki</a>.
        </li>
      </ol>
      <p>
        Bez zdarzenia ukończenia przypomnienia są wysyłane dla każdej wysyłki, niezależnie od
        tego, czy uczestnik faktycznie ukończył ankietę.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Konfigurowanie przypomnień w formularzu harmonogramu</h2>
      <p>
        Krok 9 w formularzu harmonogramu to sekcja przypomnień. Włącz{' '}
        <strong>Wysyłaj przypomnienia</strong>, aby wyświetlić planer przypomnień. Dla każdego
        przypomnienia, które chcesz wysłać, wprowadź:
      </p>
      <dl>
        <dt>Tytuł przypomnienia</dt>
        <dd>Pogrubiona pierwsza linia powiadomienia push przypomnienia na urządzeniu uczestnika.</dd>
        <dt>Wiadomość przypomnienia</dt>
        <dd>Treść powiadomienia — druga linia widoczna w zasobniku systemowym.</dd>
        <dt>Wyślij po</dt>
        <dd>
          Opóźnienie od oryginalnego powiadomienia: dni + godziny + minuty. Przypomnienie
          ustawione na 0 dni, 1 godzinę i 0 minut wyzwala się 1 godzinę po oryginalnej wysyłce.
          Wszystkie trzy pola domyślnie wynoszą 0 — ustaw przynajmniej jedno na wartość różną od zera.
        </dd>
      </dl>
      <p>
        Kliknij <strong>Dodaj nowe przypomnienie</strong>, aby dodać drugie przypomnienie z
        innym przesunięciem. Możesz połączyć łańcuchowo dowolną liczbę przypomnień — na
        przykład pierwsze przypomnienie po 1 godzinie i drugie po 4 godzinach. Gdy nadejdzie
        zdarzenie ukończenia, wszystkie przypomnienia są anulowane, niezależnie od tego,
        które już zostały wyzwolone.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Rejestrowanie zdarzeń ukończenia</h2>
      <p>
        Samply nie może samodzielnie wiedzieć, kiedy uczestnik kończy ankietę. Narzędzie do
        ankiety musi wywołać punkt końcowy ukończenia Samply, aby zasygnalizować ukończenie.
        Istnieją dwa sposoby, aby to zrobić.
      </p>
      <p>
        Dokładny URL dla Twojego badania — z już wypełnionym poprawnym slugiem — jest
        wyświetlany w panelu badania w zakładce <strong>Ustawienia</strong> pod{' '}
        <em>Przypomnienia — URL ukończenia</em>. Możesz go skopiować bezpośrednio stamtąd.
      </p>

      <h3>Opcja 1 — Przekierowanie (Qualtrics, LimeSurvey, większość narzędzi ankietowych)</h3>
      <p>
        Na końcu ankiety przekieruj uczestnika na URL ukończenia Samply. Samply oznaczy
        wysyłkę jako ukończoną, anuluje oczekujące przypomnienia i pokaże uczestnikowi
        stronę potwierdzenia.
      </p>
      <p>
        URL przekierowania ma następujący wzór — zastąp <em>your-study-slug</em> slugiem URL
        swojego badania i użyj placeholdera <Code>%MESSAGE_ID%</Code>, aby ukończenie każdego
        uczestnika było rejestrowane dla tej konkretnej wysyłki:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        W Qualtrics ustaw to jako URL przekierowania końca ankiety. W LimeSurvey ustaw to jako
        «URL końcowy» w panelu ustawień ankiety. Narzędzie do ankiety zastąpi{' '}
        <Code>%MESSAGE_ID%</Code> rzeczywistym identyfikatorem wiadomości, który otrzymało
        przez parametr URL, który przekazałeś w linku powiadomienia (zobacz{' '}
        <a href='/docs/placeholders'>Placeholdery URL</a>).
      </p>

      <h3>Opcja 2 — Żądanie POST (REDCap, integracje niestandardowe)</h3>
      <p>
        Wyślij HTTP POST do tego samego punktu końcowego. Jest to odpowiednie dla narzędzi
        ankietowych, które obsługują webhooki końca ankiety, lub niestandardowego kodu
        działającego po stronie serwera.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Odpowiedź <code>200</code> potwierdza, że ukończenie zostało zarejestrowane, a
        przypomnienia anulowane. Odpowiedź <code>400</code> oznacza, że Samply nie mógł
        znaleźć pasującego rekordu wyniku dla tego identyfikatora wiadomości — sprawdź, czy{' '}
        <Code>%MESSAGE_ID%</Code> został poprawnie zastąpiony i przekazany.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>Dlaczego MESSAGE_ID jest wymagany</h2>
      <p>
        Samply używa <Code>%MESSAGE_ID%</Code>, aby powiązać zdarzenie ukończenia z dokładną
        wysyłką powiadomienia, która wyzwoliła ankietę. Bez niego Samply nie może
        zidentyfikować, które oczekujące przypomnienia anulować. Przepływ wygląda następująco:
      </p>
      <ol>
        <li>
          Umieść <Code>%MESSAGE_ID%</Code> w linku internetowym powiadomienia jako parametr
          zapytania — na przykład <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply zastępuje ten Token unikalnym 15-znakowym ID w momencie wysłania. Uczestnik
          otwiera URL ankiety z już wbudowanym tym ID.
        </li>
        <li>
          Narzędzie do ankiety odczytuje parametr <code>messageid</code> i przekazuje go w
          przekierowaniu końca ankiety lub webhooku.
        </li>
        <li>
          Samply otrzymuje wywołanie ukończenia wraz z identyfikatorem wiadomości, anuluje
          przypomnienia i oznacza rekord wyniku jako ukończony.
        </li>
      </ol>
      <p>
        Zawsze dołączaj <Code>%MESSAGE_ID%</Code> w URL powiadomienia, gdy używasz
        przypomnień, i upewnij się, że narzędzie do ankiety przekazuje go do punktu końcowego ukończenia.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Kroki konfiguracji Qualtrics</h2>
      <ol>
        <li>
          Dodaj <code>?messageid=%MESSAGE_ID%</code> (oraz wszelkie inne placeholdery, których
          potrzebujesz) do linku internetowego powiadomienia.
        </li>
        <li>
          W przepływie ankiety Qualtrics dodaj element <strong>Embedded Data</strong> przed
          pierwszym blokiem i utwórz pole o nazwie <code>messageid</code>. Qualtrics
          automatycznie przechwyci parametry ciągu zapytania.
        </li>
        <li>
          W <strong>Opcjach ankiety → Koniec ankiety</strong>, ustaw URL przekierowania na:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics zastąpi <code>{'{e://Field/messageid}'}</code> przechwyconą wartością,
        więc uczestnik zostanie przekierowany na poprawny URL ukończenia.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>O czym należy pamiętać</h3>
      <dl>
        <dt>Jeśli zdarzenie ukończenia nie dotrze, przypomnienia są wyzwalane</dt>
        <dd>
          Jeśli przekierowanie lub POST nie dotrze do Samply — ponieważ uczestnik porzucił
          ankietę w połowie, narzędzie do ankiety zostało nieprawidłowo skonfigurowane lub URL
          ukończenia miał literówkę — przypomnienia wyzwolą się zgodnie z planem. Przetestuj
          cały przepływ z uczestnikami testowymi przed uruchomieniem.
        </dd>
        <dt>Przypomnienia dziedziczą oryginalny zastąpiony URL</dt>
        <dd>
          URL ankiety osadzony w powiadomieniu przypomnienia jest tym samym zastąpionym URL
          z oryginalnej wysyłki, a nie nowo zastąpionym. Stosuje się ten sam identyfikator
          wiadomości, numer partii i znacznik czasu. Jest to celowe: przypomnienie musi
          ponownie otworzyć tę samą sesję ankiety. Jeśli Twoje narzędzie do ankiety tworzy
          nową odpowiedź dla każdego otwarcia linku, upewnij się, że Twoja logika to obsłuży.
        </dd>
        <dt>Wiersze przypomnień liczą się do limitu kolejki</dt>
        <dd>
          Każdy wiersz przypomnienia jest osobnym oczekującym wpisem w kolejce i liczy się
          do limitu 50 000 wierszy na badanie. Harmonogram ze 100 uczestnikami i 2
          przypomnieniami na wysyłkę generuje 3 wiersze na wysyłkę, a nie 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentAr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        التذكيرات هي إشعارات فورية إضافية يرسلها Samply تلقائياً عندما لا يكتشف إكمال
        الاستطلاع للإرسال الأصلي. التذكيرات اختيارية وتُكوَّن لكل جدول. تُطلَق بإزاحات
        ثابتة من الإشعار الأصلي، إلا إذا أكمل المشارك الاستطلاع مسبقاً — في هذه الحالة
        يقوم Samply تلقائياً بإلغاء جميع التذكيرات المعلقة لهذا الإرسال.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>كيف تعمل التذكيرات</h2>
      <p>
        عندما يرسل Samply الإشعار الأصلي، يجدول فوراً جميع صفوف التذكيرات المُكوَّنة في
        الطابور. كل صف تذكير هو إدخال طابور منفصل في حالة <strong>قيد الانتظار</strong>،
        ومُعلَّم بـ <strong>تذكير: نعم</strong>. ترث التذكيرات نفس URL الاستطلاع من
        الإرسال الأصلي (مع استبدال جميع قيم العناصر النائبة) — المشاركون الذين ينقرون
        على رابط التذكير يدخلون نفس جلسة الاستطلاع.
      </p>
      <p>
        تُلغى التذكيرات بطريقتين:
      </p>
      <ol>
        <li>
          يتلقى Samply <strong>حدث إكمال</strong> للإرسال الأصلي (عبر إعادة توجيه أو طلب
          POST — انظر أدناه). يقوم فوراً بإلغاء جميع التذكيرات المعلقة التي تتشارك نفس
          معرّف الإرسال الداخلي.
        </li>
        <li>
          تقوم يدوياً بحذف الجدول أو إلغاء الصف من{' '}
          <a href='/docs/queue'>الطابور</a>.
        </li>
      </ol>
      <p>
        بدون حدث إكمال، تُرسَل التذكيرات لكل إرسال، بصرف النظر عما إذا كان المشارك قد
        أكمل الاستطلاع فعلاً.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>إعداد التذكيرات في نموذج الجدول</h2>
      <p>
        الخطوة 9 في نموذج الجدول هي قسم التذكيرات. فعِّل <strong>إرسال التذكيرات</strong>{' '}
        لعرض مخطط التذكيرات. لكل تذكير ترغب في إرساله، أدخل:
      </p>
      <dl>
        <dt>عنوان التذكير</dt>
        <dd>السطر الأول بخط عريض من الإشعار الفوري للتذكير على جهاز المشارك.</dd>
        <dt>رسالة التذكير</dt>
        <dd>نص الإشعار — السطر الثاني المرئي في درج النظام.</dd>
        <dt>الإرسال بعد</dt>
        <dd>
          التأخير من الإشعار الأصلي: أيام + ساعات + دقائق. تذكير مضبوط على 0 يوم و1
          ساعة و0 دقيقة يُطلَق بعد ساعة واحدة من الإرسال الأصلي. جميع الحقول الثلاثة
          افتراضياً 0 — اضبط حقلاً واحداً على الأقل على قيمة غير صفرية.
        </dd>
      </dl>
      <p>
        انقر <strong>إضافة تذكير جديد</strong> لإضافة تذكير ثانٍ بإزاحة مختلفة. يمكنك
        ربط أي عدد من التذكيرات — على سبيل المثال، تذكير أول بعد ساعة وتذكير ثانٍ بعد
        4 ساعات. عند وصول حدث إكمال، تُلغى جميع التذكيرات، بصرف النظر عن أيّها قد أُطلق.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>تسجيل أحداث الإكمال</h2>
      <p>
        لا يمكن لـ Samply أن يعرف وحده متى ينتهي مشارك من استطلاع. يجب على أداة الاستطلاع
        استدعاء نقطة نهاية الإكمال في Samply للإشارة إلى الإكمال. هناك طريقتان للقيام بذلك.
      </p>
      <p>
        يُعرض الـ URL الدقيق لدراستك — مع تعبئة slug الصحيح تلقائياً — في لوحة الدراسة
        ضمن علامة التبويب <strong>إعدادات</strong> تحت <em>التذكيرات — URL الإكمال</em>.
        يمكنك نسخه مباشرةً من هناك.
      </p>

      <h3>الخيار 1 — إعادة التوجيه (Qualtrics وLimeSurvey ومعظم أدوات الاستطلاع)</h3>
      <p>
        في نهاية الاستطلاع، أعد توجيه المشارك إلى URL الإكمال في Samply. سيُعلِّم Samply
        الإرسال على أنه مكتمل، ويلغي التذكيرات المعلقة، ويعرض للمشارك صفحة تأكيد.
      </p>
      <p>
        URL إعادة التوجيه على النمط التالي — استبدل <em>your-study-slug</em> بـ slug
        دراستك في الـ URL، واستخدم العنصر النائب <Code>%MESSAGE_ID%</Code> ليُسجَّل
        إكمال كل مشارك لذلك الإرسال المحدد:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        في Qualtrics، اضبط هذا كـ URL إعادة توجيه نهاية الاستطلاع. في LimeSurvey، اضبط
        هذا كـ «URL النهاية» في لوحة إعدادات الاستطلاع. ستستبدل أداة الاستطلاع{' '}
        <Code>%MESSAGE_ID%</Code> بمعرّف الرسالة الفعلي الذي تلقَّتْه من خلال معامل الـ
        URL الذي مرَّرته في رابط الإشعار (انظر{' '}
        <a href='/docs/placeholders'>العناصر النائبة في URL</a>).
      </p>

      <h3>الخيار 2 — طلب POST (REDCap والتكاملات المخصصة)</h3>
      <p>
        أرسل HTTP POST إلى نقطة النهاية ذاتها. هذا مناسب لأدوات الاستطلاع التي تدعم
        webhooks نهاية الاستطلاع، أو للأكواد المخصصة التي تعمل من جانب الخادم.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        تؤكد استجابة <code>200</code> أنه تم تسجيل الإكمال، وأن التذكيرات قد أُلغيت.
        تعني استجابة <code>400</code> أن Samply لم يتمكن من العثور على سجل نتيجة مطابق
        لمعرّف الرسالة هذا — تحقق من أن <Code>%MESSAGE_ID%</Code> قد استُبدل ومُرِّر بشكل صحيح.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>لماذا يُعدّ MESSAGE_ID مطلوباً</h2>
      <p>
        يستخدم Samply <Code>%MESSAGE_ID%</Code> لربط حدث الإكمال بإرسال الإشعار الدقيق
        الذي أطلق الاستطلاع. بدونه، لا يستطيع Samply تحديد التذكيرات المعلقة التي يجب
        إلغاؤها. التدفق على النحو التالي:
      </p>
      <ol>
        <li>
          ضع <Code>%MESSAGE_ID%</Code> في رابط ويب الإشعار كمعامل استعلام — على سبيل
          المثال <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          يستبدل Samply هذا الـ Token بمعرّف فريد من 15 حرفاً وقت الإرسال. يفتح
          المشارك URL الاستطلاع مع تضمين هذا المعرّف بالفعل.
        </li>
        <li>
          تقرأ أداة الاستطلاع المعامل <code>messageid</code> وتمرّره في إعادة توجيه
          نهاية الاستطلاع أو في webhook.
        </li>
        <li>
          يتلقى Samply استدعاء الإكمال مع معرّف الرسالة، ويلغي التذكيرات، ويُعلِّم سجل
          النتيجة على أنه مكتمل.
        </li>
      </ol>
      <p>
        أدرج دائماً <Code>%MESSAGE_ID%</Code> في URL الإشعار عند استخدام التذكيرات،
        وتأكد من أن أداة الاستطلاع تُمرّرها إلى نقطة نهاية الإكمال.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>خطوات إعداد Qualtrics</h2>
      <ol>
        <li>
          أضف <code>?messageid=%MESSAGE_ID%</code> (وأي عناصر نائبة أخرى تحتاجها) إلى
          رابط ويب الإشعار.
        </li>
        <li>
          في تدفق استطلاع Qualtrics، أضف عنصر <strong>Embedded Data</strong> قبل الكتلة
          الأولى وأنشئ حقلاً باسم <code>messageid</code>. سيلتقط Qualtrics معاملات سلسلة
          الاستعلام تلقائياً.
        </li>
        <li>
          في <strong>خيارات الاستطلاع ← نهاية الاستطلاع</strong>، اضبط URL إعادة التوجيه على:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        سيستبدل Qualtrics <code>{'{e://Field/messageid}'}</code> بالقيمة الملتقطة، لذا
        ستعاد توجيه المشارك إلى URL الإكمال الصحيح.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>أمور يجب أن تأخذها في الحسبان</h3>
      <dl>
        <dt>إذا لم يصل حدث الإكمال، تُطلَق التذكيرات</dt>
        <dd>
          إذا لم تصل إعادة التوجيه أو POST إلى Samply — لأن المشارك ترك الاستطلاع في
          منتصفه، أو لأن أداة الاستطلاع كانت مُعَدّة بشكل غير صحيح، أو لأن URL الإكمال
          به خطأ مطبعي — فستُطلَق التذكيرات وفق الجدول. اختبر التدفق بأكمله بمشاركين
          تجريبيين قبل الإطلاق.
        </dd>
        <dt>ترث التذكيرات الـ URL الأصلي المُستبدَل</dt>
        <dd>
          URL الاستطلاع المضمَّن في إشعار التذكير هو نفس الـ URL المُستبدَل من الإرسال
          الأصلي، وليس استبدالاً جديداً. تنطبق معرّفات الرسالة ورقم الدفعة والطابع الزمني
          ذاتها. هذا مقصود: يجب على التذكير إعادة فتح جلسة الاستطلاع ذاتها. إذا كانت
          أداة الاستطلاع تنشئ استجابة جديدة عند كل فتح للرابط، فتأكد من أن منطقك يعالج ذلك.
        </dd>
        <dt>تُحتسب صفوف التذكيرات ضمن حد الطابور</dt>
        <dd>
          كل صف تذكير هو إدخال طابور معلق منفصل ويُحتسب ضمن حد الـ 50,000 صف لكل دراسة.
          جدول يضم 100 مشارك مع تذكيرَين لكل إرسال يولّد 3 صفوف لكل إرسال، وليس 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentTr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Hatırlatma, orijinal gönderim için bir anket tamamlama olayı algılanmadığında Samply'nin
        otomatik olarak gönderdiği bir takip push bildirimidir. Hatırlatmalar isteğe bağlıdır ve
        her program için ayrı yapılandırılır. Orijinal bildirimden sabit bir gecikme sonra
        tetiklenirler — katılımcı anketi daha önce tamamlamadıysa, bu durumda Samply o gönderim
        için bekleyen tüm hatırlatmaları otomatik olarak iptal eder.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Hatırlatmalar nasıl çalışır</h2>
      <p>
        Samply orijinal bir bildirimi gönderdiğinde, yapılandırılmış hatırlatma satırlarını
        anında kuyruğa planlar. Her hatırlatma satırı, ayrı bir <strong>bekleyen</strong> kuyruk
        girişidir ve <strong>Hatırlatma: evet</strong> olarak işaretlenir. Hatırlatma, orijinal
        gönderimle aynı anket URL'sini (tüm yer tutucu değerleri yerine konmuş hâliyle) miras
        alır — hatırlatma bağlantısına dokunan katılımcılar aynı anket oturumuna girer.
      </p>
      <p>Hatırlatmalar iki yolla iptal edilir:</p>
      <ol>
        <li>
          Samply, orijinal gönderim için (yönlendirme veya POST isteği yoluyla — aşağıya bakın)
          bir <strong>tamamlama olayı</strong> alır. Aynı dahili gönderim kimliğini paylaşan
          bekleyen tüm hatırlatmaları anında iptal eder.
        </li>
        <li>
          Programı manuel olarak silersiniz veya satırları <a href='/docs/queue'>kuyruktan</a>{' '}
          iptal edersiniz.
        </li>
      </ol>
      <p>
        Bir tamamlama olayı olmadan, katılımcının anketi gerçekten tamamlayıp tamamlamadığına
        bakılmaksızın her gönderim bir hatırlatma alır.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Program formunda hatırlatmaları yapılandırma</h2>
      <p>
        Program formunun 9. adımı hatırlatma bölümüdür. Hatırlatma planlayıcısını görmek için{' '}
        <strong>Hatırlatma gönder</strong> seçeneğini açın. Göndermek istediğiniz her hatırlatma
        için aşağıdakileri doldurun:
      </p>
      <dl>
        <dt>Hatırlatma başlığı</dt>
        <dd>Katılımcı cihazındaki hatırlatma push bildiriminin kalın yazılmış ilk satırı.</dd>
        <dt>Hatırlatma mesajı</dt>
        <dd>Bildirim gövdesi — sistem tepsisinde görünen ikinci satır.</dd>
        <dt>Şu kadar sonra gönder</dt>
        <dd>
          Orijinal bildirimden gecikme: gün + saat + dakika. 0 gün, 1 saat, 0 dakikaya ayarlanan
          bir hatırlatma orijinal gönderimden bir saat sonra tetiklenir. Üç alan da varsayılan
          olarak 0'dır — en az birini sıfır olmayan bir değere ayarlayın.
        </dd>
      </dl>
      <p>
        Farklı bir gecikmede ikinci bir hatırlatma eklemek için{' '}
        <strong>Yeni hatırlatma ekle</strong>'ye tıklayın. İhtiyaç duyduğunuz kadar hatırlatma
        zincirleyebilirsiniz — örneğin, 1 saatte ilk, 4 saatte ikinci. Bir tamamlama olayı
        geldiğinde, halihazırda hangilerinin tetiklendiğine bakılmaksızın tüm hatırlatmalar iptal edilir.
      </p>

      {/* ── Completion events ─────────────────────────────────────────────── */}
      <h2>Tamamlama olayını kaydetme</h2>
      <p>
        Samply, bir katılımcının anketi ne zaman bitirdiğini kendi başına bilemez. Anket
        aracınızın Samply tamamlama uç noktasını çağırarak tamamlamayı sinyallemesi gerekir.
        Bunu yapmanın iki yolu vardır.
      </p>
      <p>
        Çalışmanız için tam URL'ler — doğru slug zaten doldurulmuş olarak — çalışma panonuzun{' '}
        <strong>Ayarlar</strong> sekmesinde, <em>Hatırlatmalar — tamamlama URL'si</em> altında
        gösterilir. Doğrudan oradan kopyalayabilirsiniz.
      </p>

      <h3>Seçenek 1 — yönlendirme (Qualtrics, LimeSurvey, çoğu anket aracı)</h3>
      <p>
        Anketinizin sonunda katılımcıyı Samply tamamlama URL'sine yönlendirin. Samply gönderimi
        tamamlanmış olarak işaretler, bekleyen hatırlatmaları iptal eder ve katılımcıya bir
        onay sayfası gösterir.
      </p>
      <p>
        Yönlendirme URL'si şu kalıbı izler — <em>your-study-slug</em>'i çalışmanızın URL
        slug'ıyla değiştirin ve her katılımcının tamamlaması belirli gönderimine karşı
        kaydedilsin diye <Code>%MESSAGE_ID%</Code> yer tutucusunu kullanın:
      </p>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/%MESSAGE_ID%`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics'te bunu anket sonu yönlendirme URL'si olarak ayarlayın. LimeSurvey'de anket
        ayarları panelinde "End URL" olarak ayarlayın. Anket aracı,{' '}
        <Code>%MESSAGE_ID%</Code>'yi bildirim bağlantısında ilettiğiniz URL parametresi
        aracılığıyla aldığı gerçek mesaj kimliğiyle değiştirir ({' '}
        <a href='/docs/placeholders'>URL yer tutucuları</a>'na bakın).
      </p>

      <h3>Seçenek 2 — POST isteği (REDCap, özel entegrasyonlar)</h3>
      <p>
        Aynı uç noktaya bir HTTP POST gönderin. Bu, anket sonu webhook'larını destekleyen
        anket araçları veya sunucu tarafında çalışan özel kod için uygundur.
      </p>
      <UrlBox url={`POST ${baseUrl}/studies/your-study-slug/done/:messageid`} />
      <p style={{ marginTop: '1.4rem' }}>
        Bir <code>200</code> yanıtı, tamamlamanın kaydedildiğini ve hatırlatmaların iptal
        edildiğini onaylar. <code>400</code> yanıtı, Samply'nin o mesaj kimliği için eşleşen
        bir sonuç kaydı bulamadığı anlamına gelir — <Code>%MESSAGE_ID%</Code>'nin doğru şekilde
        değiştirilip iletildiğinden emin olun.
      </p>

      {/* ── MESSAGE_ID is required ─────────────────────────────────────────── */}
      <h2>MESSAGE_ID neden gerekli</h2>
      <p>
        Samply, bir tamamlama olayını anketi tetikleyen tam bildirim gönderimine bağlamak için{' '}
        <Code>%MESSAGE_ID%</Code>'yi kullanır. Onsuz, Samply hangi bekleyen hatırlatmaların
        iptal edileceğini belirleyemez. Akış şöyledir:
      </p>
      <ol>
        <li>
          Bildirim Web Bağlantısına <Code>%MESSAGE_ID%</Code>'yi bir sorgu parametresi olarak
          koyun — örneğin, <code>?messageid=%MESSAGE_ID%</code>.
        </li>
        <li>
          Samply, gönderme anında bu jetonu benzersiz 15 karakterli bir kimlikle değiştirir.
          Katılımcı anket URL'sini bu kimlik zaten içinde olarak açar.
        </li>
        <li>
          Anket aracınız <code>messageid</code> parametresini okur ve anket sonu yönlendirmesine
          veya webhook'una iletir.
        </li>
        <li>
          Samply, mesaj kimliğiyle tamamlama çağrısını alır, hatırlatmaları iptal eder ve sonuç
          kaydını tamamlanmış olarak işaretler.
        </li>
      </ol>
      <p>
        Hatırlatmalar kullanıyorsanız, bildirim URL'nizde her zaman{' '}
        <Code>%MESSAGE_ID%</Code> yer alsın ve anket aracınızın bunu tamamlama uç noktasına
        ilettiğini doğrulayın.
      </p>

      {/* ── Qualtrics setup ───────────────────────────────────────────────── */}
      <h2>Qualtrics kurulum adımları</h2>
      <ol>
        <li>
          Bildirim Web Bağlantısına <code>?messageid=%MESSAGE_ID%</code>'yi (ve ihtiyaç
          duyduğunuz diğer yer tutucuları) ekleyin.
        </li>
        <li>
          Qualtrics anket akışınızda, ilk bloktan önce bir <strong>Embedded Data</strong> ögesi
          ekleyin ve <code>messageid</code> adlı bir alan oluşturun. Qualtrics sorgu dizisi
          parametrelerini otomatik olarak yakalar.
        </li>
        <li>
          <strong>Survey Options → Survey Termination</strong> bölümünde yönlendirme URL'sini
          şu şekilde ayarlayın:
        </li>
      </ol>
      <UrlBox url={`${baseUrl}/studies/your-study-slug/done/\${e://Field/messageid}`} />
      <p style={{ marginTop: '1.4rem' }}>
        Qualtrics <code>{'{e://Field/messageid}'}</code>'yi yakalanan değerle değiştirir, böylece
        katılımcılar doğru tamamlama URL'sine yönlendirilir.
      </p>

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Dikkat edilecekler</h3>
      <dl>
        <dt>Tamamlama olayı gelmezse hatırlatmalar tetiklenir</dt>
        <dd>
          Yönlendirme veya POST Samply'ye hiç ulaşmazsa — katılımcı anketi yarıda bıraktı,
          anket aracı yanlış yapılandırıldı veya tamamlama URL'sinde yazım hatası var — hatırlatma
          planlandığı gibi tetiklenir. Canlıya almadan önce tam akışı bir test katılımcısıyla deneyin.
        </dd>
        <dt>Hatırlatmalar orijinal değiştirilmiş URL'yi miras alır</dt>
        <dd>
          Hatırlatma bildirimlerine gömülü anket URL'si, orijinal gönderimden zaten değiştirilmiş
          URL'dir — yeni bir değiştirme değil. Aynı mesaj kimliği, parti numarası ve zaman damgaları
          uygulanır. Bu kasıtlıdır: hatırlatma aynı anket oturumunu yeniden açmalıdır. Anket
          aracınız her bağlantı açılışında yeni bir yanıt oluşturuyorsa, mantığınızın bunu
          işlediğinden emin olun.
        </dd>
        <dt>Hatırlatma satırları kuyruk sınırına dahildir</dt>
        <dd>
          Her hatırlatma satırı kuyrukta ayrı bir bekleyen kayıttır ve çalışma başına 50.000
          satır sınırına dahildir. 100 katılımcısı ve gönderim başına 2 hatırlatması olan bir
          program, gönderim başına 1 değil 3 satır oluşturur.
        </dd>
      </dl>
    </>
  );
}
