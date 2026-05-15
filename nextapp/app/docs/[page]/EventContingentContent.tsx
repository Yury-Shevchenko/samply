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

function EventContingentContentEn() {
  return (
    <>
      <p>
        In a signal-contingent design, Samply decides when participants are notified. In an
        event-contingent design, the <em>participant</em> decides — they self-initiate a
        report immediately after a target event occurs in their life. Samply supports
        event-contingent designs through named event types that appear inside the Samply
        Research app.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Setting up event-contingent design</h2>
      <p>
        Open your study dashboard, go to the <strong>Settings</strong> tab, and enable{' '}
        <strong>Event-contingent design</strong>. Two configuration fields appear:
      </p>
      <dl>
        <dt>Participant-facing instructions</dt>
        <dd>
          A text block shown to participants in the Samply app after they join. Explain
          what kind of event they should report and how to use the links — for example,
          &ldquo;Tap the button below each time you experience a stressful event at work.&rdquo;
        </dd>
        <dt>Event types (up to 5)</dt>
        <dd>
          Each event type has a <strong>caption</strong> — the label the participant sees
          in the app — and a <strong>URL</strong> — the survey link that opens when they
          tap that caption. You can define between one and five distinct event types. If
          your study has only one kind of self-report, define one event type. If
          participants can report different categories of experience (e.g. positive event,
          negative event, neutral event), define one type per category, each pointing to
          a different survey or passing a different parameter.
        </dd>
      </dl>
      <p>
        Once saved, the event types appear in the participant&apos;s study screen in the
        Samply app. Tapping a caption immediately opens the corresponding URL — no
        notification needed.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL placeholders in event type links</h2>
      <p>
        Each event type URL supports the same <Code>%TOKEN%</Code> placeholders as
        scheduled notifications. Samply substitutes them at the moment the participant
        taps the link:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Replaced with</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>The participant&apos;s anonymous Samply ID.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>The custom code entered at enrolment (left unreplaced if no code).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>The participant&apos;s group ID (left unreplaced if no group).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Unix timestamp (milliseconds) at the moment the link is tapped.</td>
          </tr>
        </tbody>
      </table>
      <p>A typical event type URL looks like this:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> captures the tap time — the moment the participant
        decided to report — not a server-side dispatch time. Use this as your event
        timestamp in analysis. See <a href='/docs/placeholders'>URL placeholders</a> for
        the full token reference.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>When to use event-contingent sampling</h2>
      <dl>
        <dt>Pure event-contingent</dt>
        <dd>
          Participants tap an event type whenever a target event occurs — a conflict,
          a craving, a social interaction. No scheduled notifications needed. The study
          consists entirely of self-initiated reports.
        </dd>
        <dt>Hybrid design</dt>
        <dd>
          Combine scheduled notifications (signal-contingent) with event types
          (event-contingent). Participants receive timed prompts <em>and</em> can
          self-initiate at any time. Both types of report appear in the history log.
        </dd>
        <dt>Multiple event categories</dt>
        <dd>
          Use up to five event types to distinguish between categories of experience.
          Each type can route to a different survey condition or pass a different
          identifier so responses are automatically sorted in your data.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tracking self-initiated reports</h2>
      <p>
        Taps on event type links are recorded in the history log with the tap timestamp.
        The CSV export includes the tap time in the event timestamps column, letting you
        distinguish scheduled sends from self-initiated reports.
      </p>
      <p>
        To correlate a self-initiated report with the triggering event, pass{' '}
        <Code>%TIMESTAMP%</Code> to your survey tool and store it as an embedded data
        field. This gives you a researcher-independent record of when the participant
        decided to report, regardless of network delays or survey load time.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Event-contingent vs geofencing</h3>
      <p>
        Event type links rely on the participant to recognise and report the target
        event — they are subjective and voluntary.{' '}
        <a href='/docs/geofencing'>Geofencing</a> detects location events automatically
        and fires a notification without participant action. Use geofencing when the
        target event has a precise GPS signature; use event-contingent design when the
        event is psychological, social, or otherwise not detectable by sensors.
      </p>
    </>
  );
}

function EventContingentContentDe() {
  return (
    <>
      <p>
        In einem signalkontingenten Design entscheidet Samply, wann Teilnehmer benachrichtigt werden.
        In einem ereigniskontingenten Design entscheidet der <em>Teilnehmer</em> — er startet selbstinitiiert
        einen Bericht unmittelbar nach dem Auftreten eines Zielereignisses in seinem Leben. Samply unterstützt
        ereigniskontingente Designs durch benannte Ereignistypen, die in der Samply Research App erscheinen.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Ereigniskontingentes Design einrichten</h2>
      <p>
        Öffnen Sie Ihr Studien-Dashboard, gehen Sie zum Tab <strong>Einstellungen</strong> und aktivieren
        Sie <strong>Ereigniskontingentes Design</strong>. Zwei Konfigurationsfelder erscheinen:
      </p>
      <dl>
        <dt>Teilnehmerseitige Anweisungen</dt>
        <dd>
          Ein Textblock, der Teilnehmern in der Samply-App nach ihrem Beitritt angezeigt wird. Erklären
          Sie, welche Art von Ereignis sie berichten sollen und wie sie die Links verwenden — zum Beispiel:
          &ldquo;Tippen Sie auf die Schaltfläche unten, jedes Mal wenn Sie ein stressiges Ereignis bei
          der Arbeit erleben.&rdquo;
        </dd>
        <dt>Ereignistypen (bis zu 5)</dt>
        <dd>
          Jeder Ereignistyp hat eine <strong>Beschriftung</strong> — die Bezeichnung, die der Teilnehmer
          in der App sieht — und eine <strong>URL</strong> — den Umfragelink, der sich öffnet, wenn er
          auf diese Beschriftung tippt. Sie können zwischen einem und fünf verschiedene Ereignistypen
          definieren. Wenn Ihre Studie nur eine Art von selbstinitiiertem Bericht hat, definieren Sie
          einen Ereignistyp. Wenn Teilnehmer verschiedene Erfahrungskategorien berichten können
          (z. B. positives Ereignis, negatives Ereignis, neutrales Ereignis), definieren Sie einen Typ
          pro Kategorie, jeder mit einer anderen Umfrage oder einem anderen Parameter.
        </dd>
      </dl>
      <p>
        Nach dem Speichern erscheinen die Ereignistypen im Studienbildschirm des Teilnehmers in der
        Samply-App. Das Antippen einer Beschriftung öffnet sofort die entsprechende URL — keine
        Benachrichtigung erforderlich.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL-Platzhalter in Ereignistyp-Links</h2>
      <p>
        Jede Ereignistyp-URL unterstützt dieselben <Code>%TOKEN%</Code>-Platzhalter wie
        geplante Benachrichtigungen. Samply ersetzt sie in dem Moment, in dem der Teilnehmer
        auf den Link tippt:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Ersetzt durch</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>Die anonyme Samply-ID des Teilnehmers.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>Der bei der Einschreibung eingegebene individuelle Code (bleibt unreplaced, wenn kein Code vorhanden).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>Die Gruppen-ID des Teilnehmers (bleibt unreplaced, wenn keine Gruppe vorhanden).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Unix-Zeitstempel (Millisekunden) in dem Moment, in dem der Link angetippt wird.</td>
          </tr>
        </tbody>
      </table>
      <p>Eine typische Ereignistyp-URL sieht so aus:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> erfasst den Tipp-Zeitpunkt — den Moment, in dem der Teilnehmer
        entschied, einen Bericht zu erstellen — nicht einen serverseitigen Versandzeitpunkt. Verwenden
        Sie diesen als Ihren Ereigniszeitstempel in der Analyse. Siehe{' '}
        <a href='/docs/placeholders'>URL-Platzhalter</a> für die vollständige Token-Referenz.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Wann ereigniskontingentes Sampling verwenden</h2>
      <dl>
        <dt>Rein ereigniskontingent</dt>
        <dd>
          Teilnehmer tippen auf einen Ereignistyp, wann immer ein Zielereignis eintritt — ein Konflikt,
          ein Verlangen, eine soziale Interaktion. Es sind keine geplanten Benachrichtigungen erforderlich.
          Die Studie besteht ausschließlich aus selbstinitiierten Berichten.
        </dd>
        <dt>Hybrides Design</dt>
        <dd>
          Kombinieren Sie geplante Benachrichtigungen (signalkontingent) mit Ereignistypen
          (ereigniskontingent). Teilnehmer erhalten zeitgesteuerte Aufforderungen <em>und</em> können
          jederzeit selbst initiieren. Beide Berichtstypen erscheinen im Verlaufsprotokoll.
        </dd>
        <dt>Mehrere Ereigniskategorien</dt>
        <dd>
          Verwenden Sie bis zu fünf Ereignistypen, um zwischen Erfahrungskategorien zu unterscheiden.
          Jeder Typ kann zu einer anderen Umfragebedingung führen oder einen anderen Bezeichner
          übergeben, sodass Antworten automatisch in Ihren Daten sortiert werden.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Selbstinitiierte Berichte verfolgen</h2>
      <p>
        Tipps auf Ereignistyp-Links werden im Verlaufsprotokoll mit dem Tipp-Zeitstempel aufgezeichnet.
        Der CSV-Export enthält die Tipp-Zeit in der Spalte für Ereigniszeitstempel, sodass Sie geplante
        Versendungen von selbstinitiierten Berichten unterscheiden können.
      </p>
      <p>
        Um einen selbstinitiierten Bericht mit dem auslösenden Ereignis zu korrelieren, übergeben Sie{' '}
        <Code>%TIMESTAMP%</Code> an Ihr Umfragetool und speichern Sie ihn als eingebettetes Datenfeld.
        Dies gibt Ihnen eine forscherunabhängige Aufzeichnung davon, wann der Teilnehmer entschied,
        einen Bericht zu erstellen, unabhängig von Netzwerkverzögerungen oder Ladezeiten der Umfrage.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Ereigniskontingent vs. Geofencing</h3>
      <p>
        Ereignistyp-Links sind darauf angewiesen, dass der Teilnehmer das Zielereignis erkennt und
        berichtet — sie sind subjektiv und freiwillig.{' '}
        <a href='/docs/geofencing'>Geofencing</a> erkennt Standortereignisse automatisch
        und löst eine Benachrichtigung ohne Teilnehmeraktion aus. Verwenden Sie Geofencing, wenn das
        Zielereignis eine präzise GPS-Signatur hat; verwenden Sie ereigniskontingentes Design, wenn
        das Ereignis psychologischer, sozialer oder anderer Natur ist und nicht von Sensoren erkannt
        werden kann.
      </p>
    </>
  );
}

function EventContingentContentNl() {
  return (
    <>
      <p>
        In een signaalgestuurd ontwerp beslist Samply wanneer deelnemers worden genotificeerd. In een
        gebeurtenisgestuurd ontwerp beslist de <em>deelnemer</em> — zij starten zelf een rapport
        onmiddellijk nadat een doelgebeurtenis zich in hun leven voordoet. Samply ondersteunt
        gebeurtenisgestuurde ontwerpen via benoemde gebeurtenistypen die verschijnen in de
        Samply Research-app.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gebeurtenisgestuurd ontwerp instellen</h2>
      <p>
        Open uw studiedashboard, ga naar het tabblad <strong>Instellingen</strong> en schakel{' '}
        <strong>Gebeurtenisgestuurd ontwerp</strong> in. Er verschijnen twee configuratievelden:
      </p>
      <dl>
        <dt>Instructies voor deelnemers</dt>
        <dd>
          Een tekstblok dat wordt getoond aan deelnemers in de Samply-app nadat zij zich hebben
          ingeschreven. Leg uit wat voor soort gebeurtenis zij moeten rapporteren en hoe zij de links
          moeten gebruiken — bijvoorbeeld: &ldquo;Tik op de knop hieronder elke keer dat u een stressvolle
          gebeurtenis op het werk ervaart.&rdquo;
        </dd>
        <dt>Gebeurtenistypen (maximaal 5)</dt>
        <dd>
          Elk gebeurtenistype heeft een <strong>bijschrift</strong> — het label dat de deelnemer in de
          app ziet — en een <strong>URL</strong> — de enquetelink die wordt geopend wanneer hij op dat
          bijschrift tikt. U kunt tussen één en vijf verschillende gebeurtenistypen definiëren. Als uw
          studie slechts één soort zelfrapportage heeft, definieer dan één gebeurtenistype. Als deelnemers
          verschillende categorieën ervaringen kunnen rapporteren (bijv. positieve gebeurtenis, negatieve
          gebeurtenis, neutrale gebeurtenis), definieer dan één type per categorie, elk verwijzend naar
          een andere enquete of met een andere parameter.
        </dd>
      </dl>
      <p>
        Na het opslaan verschijnen de gebeurtenistypen op het studiescherm van de deelnemer in de
        Samply-app. Door op een bijschrift te tikken wordt de bijbehorende URL onmiddellijk geopend —
        er is geen notificatie nodig.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL-plaatshouders in gebeurtenistype-links</h2>
      <p>
        Elke gebeurtenistype-URL ondersteunt dezelfde <Code>%TOKEN%</Code>-plaatshouders als
        geplande notificaties. Samply vervangt ze op het moment dat de deelnemer op de link tikt:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Vervangen door</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>De anonieme Samply-ID van de deelnemer.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>De aangepaste code ingevoerd bij inschrijving (blijft onvervangen als er geen code is).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>De groeps-ID van de deelnemer (blijft onvervangen als er geen groep is).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Unix-tijdstempel (milliseconden) op het moment dat op de link wordt getikt.</td>
          </tr>
        </tbody>
      </table>
      <p>Een typische gebeurtenistype-URL ziet er als volgt uit:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> legt het tiktijdstip vast — het moment waarop de deelnemer besloot
        te rapporteren — niet een verzendtijdstip aan de serverzijde. Gebruik dit als uw
        gebeurtenistijdstempel in de analyse. Zie{' '}
        <a href='/docs/placeholders'>URL-plaatshouders</a> voor de volledige tokenreferentie.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Wanneer gebeurtenisgestuurde steekproeven gebruiken</h2>
      <dl>
        <dt>Puur gebeurtenisgestuurd</dt>
        <dd>
          Deelnemers tikken op een gebeurtenistype telkens wanneer een doelgebeurtenis optreedt —
          een conflict, een verlangen, een sociale interactie. Er zijn geen geplande notificaties nodig.
          De studie bestaat geheel uit zelfgestarte rapporten.
        </dd>
        <dt>Hybride ontwerp</dt>
        <dd>
          Combineer geplande notificaties (signaalgestuurd) met gebeurtenistypen (gebeurtenisgestuurd).
          Deelnemers ontvangen getimede aanwijzingen <em>en</em> kunnen op elk moment zelf starten.
          Beide soorten rapporten verschijnen in het geschiedenislogboek.
        </dd>
        <dt>Meerdere gebeurteniscategorieën</dt>
        <dd>
          Gebruik maximaal vijf gebeurtenistypen om onderscheid te maken tussen categorieën van
          ervaringen. Elk type kan worden doorgestuurd naar een andere enqueteconditie of een andere
          identificator doorgeven zodat antwoorden automatisch worden gesorteerd in uw data.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Zelfgestarte rapporten bijhouden</h2>
      <p>
        Tikken op gebeurtenistype-links worden geregistreerd in het geschiedenislogboek met het
        tiktijdstempel. De CSV-export bevat de tiktijd in de kolom voor gebeurtenistijdstempels,
        waarmee u geplande verzendingen kunt onderscheiden van zelfgestarte rapporten.
      </p>
      <p>
        Om een zelfgestart rapport te correleren met de aanleiding, geeft u{' '}
        <Code>%TIMESTAMP%</Code> door aan uw enquetetool en slaat u het op als een ingesloten
        gegevensveld. Dit geeft u een onderzoekersonafhankelijke registratie van wanneer de deelnemer
        besloot te rapporteren, ongeacht netwerkvertragingen of laadtijd van de enquete.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Gebeurtenisgestuurd versus geofencing</h3>
      <p>
        Gebeurtenistype-links zijn afhankelijk van de deelnemer om de doelgebeurtenis te herkennen en
        te rapporteren — ze zijn subjectief en vrijwillig.{' '}
        <a href='/docs/geofencing'>Geofencing</a> detecteert locatiegebeurtenissen automatisch en
        verstuurt een notificatie zonder actie van de deelnemer. Gebruik geofencing wanneer de
        doelgebeurtenis een precieze GPS-handtekening heeft; gebruik een gebeurtenisgestuurd ontwerp
        wanneer de gebeurtenis psychologisch, sociaal of anderszins niet detecteerbaar is door sensoren.
      </p>
    </>
  );
}

function EventContingentContentRu() {
  return (
    <>
      <p>
        В сигнально-обусловленном дизайне Samply решает, когда уведомлять участников. В
        событийно-обусловленном дизайне решает сам <em>участник</em> — он самостоятельно
        инициирует отчёт сразу после того, как в его жизни произошло целевое событие. Samply
        поддерживает событийно-обусловленные дизайны через именованные типы событий,
        которые отображаются в приложении Samply Research.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Настройка событийно-обусловленного дизайна</h2>
      <p>
        Откройте панель управления исследованием, перейдите на вкладку <strong>Настройки</strong>{' '}
        и включите <strong>Событийно-обусловленный дизайн</strong>. Появятся два поля настройки:
      </p>
      <dl>
        <dt>Инструкции для участников</dt>
        <dd>
          Текстовый блок, показываемый участникам в приложении Samply после вступления в
          исследование. Объясните, какие события они должны фиксировать и как пользоваться
          ссылками — например: «Нажмите кнопку ниже каждый раз, когда вы переживаете
          стрессовое событие на работе.»
        </dd>
        <dt>Типы событий (до 5)</dt>
        <dd>
          Каждый тип события имеет <strong>подпись</strong> — метку, которую участник видит
          в приложении, — и <strong>URL</strong> — ссылку на опрос, открывающуюся при нажатии
          на эту подпись. Можно определить от одного до пяти различных типов событий. Если в
          вашем исследовании предусмотрен только один вид самоотчёта, определите один тип
          события. Если участники могут сообщать о различных категориях переживаний (например,
          положительное событие, отрицательное событие, нейтральное событие), определите по
          одному типу для каждой категории, каждый с отдельным опросом или параметром.
        </dd>
      </dl>
      <p>
        После сохранения типы событий появятся на экране исследования участника в приложении
        Samply. Нажатие на подпись немедленно открывает соответствующий URL — уведомление
        не требуется.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL-заполнители в ссылках типов событий</h2>
      <p>
        Каждый URL типа события поддерживает те же заполнители <Code>%TOKEN%</Code>, что и
        запланированные уведомления. Samply подставляет их в момент нажатия участником
        на ссылку:
      </p>
      <table>
        <thead>
          <tr>
            <th>Токен</th>
            <th>Заменяется на</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>Анонимный идентификатор Samply участника.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>Пользовательский код, введённый при регистрации (остаётся без замены, если код не задан).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>Идентификатор группы участника (остаётся без замены, если группа не задана).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Unix-временная метка (в миллисекундах) в момент нажатия на ссылку.</td>
          </tr>
        </tbody>
      </table>
      <p>Типичный URL типа события выглядит так:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> фиксирует момент нажатия — время, когда участник решил
        сообщить о событии, — а не время отправки с сервера. Используйте это как временную
        метку события в анализе. Полный справочник токенов см. в разделе{' '}
        <a href='/docs/placeholders'>URL-заполнители</a>.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Когда использовать событийно-обусловленную выборку</h2>
      <dl>
        <dt>Чисто событийно-обусловленный дизайн</dt>
        <dd>
          Участники нажимают на тип события каждый раз, когда происходит целевое событие —
          конфликт, влечение, социальное взаимодействие. Запланированные уведомления
          не нужны. Исследование целиком состоит из самоинициированных отчётов.
        </dd>
        <dt>Гибридный дизайн</dt>
        <dd>
          Комбинируйте запланированные уведомления (сигнально-обусловленный) с типами событий
          (событийно-обусловленный). Участники получают запланированные сигналы <em>и</em>{' '}
          могут самостоятельно инициировать отчёты в любое время. Оба типа отчётов
          отображаются в журнале истории.
        </dd>
        <dt>Несколько категорий событий</dt>
        <dd>
          Используйте до пяти типов событий для различения категорий переживаний. Каждый тип
          может направлять к другому условию опроса или передавать другой идентификатор, чтобы
          ответы автоматически сортировались в ваших данных.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Отслеживание самоинициированных отчётов</h2>
      <p>
        Нажатия на ссылки типов событий фиксируются в журнале истории с временной меткой
        нажатия. CSV-экспорт включает время нажатия в столбце временных меток событий,
        что позволяет отличить запланированные отправки от самоинициированных отчётов.
      </p>
      <p>
        Чтобы связать самоинициированный отчёт с вызвавшим его событием, передайте{' '}
        <Code>%TIMESTAMP%</Code> в ваш инструмент для опросов и сохраните его как встроенное
        поле данных. Это даст вам независимую от исследователя запись о том, когда участник
        решил сообщить о событии, вне зависимости от сетевых задержек или времени загрузки опроса.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Событийно-обусловленный дизайн vs геозонирование</h3>
      <p>
        Ссылки типов событий полагаются на то, что участник сам распознает и зафиксирует
        целевое событие — они субъективны и добровольны.{' '}
        <a href='/docs/geofencing'>Геозонирование</a> автоматически обнаруживает события
        местоположения и отправляет уведомление без участия пользователя. Используйте
        геозонирование, когда целевое событие имеет чёткую GPS-сигнатуру; используйте
        событийно-обусловленный дизайн, когда событие носит психологический, социальный
        или иной характер, не поддающийся обнаружению датчиками.
      </p>
    </>
  );
}

function EventContingentContentZh() {
  return (
    <>
      <p>
        在信号偶发性设计中，由 Samply 决定何时通知参与者。在事件偶发性设计中，由<em>参与者</em>
        自行决定——他们在生活中发生目标事件后立即自主发起报告。Samply 通过在 Samply Research
        应用中显示的命名事件类型来支持事件偶发性设计。
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>设置事件偶发性设计</h2>
      <p>
        打开研究仪表板，转到<strong>设置</strong>选项卡，并启用<strong>事件偶发性设计</strong>。
        将出现两个配置字段：
      </p>
      <dl>
        <dt>参与者说明</dt>
        <dd>
          在参与者加入后，在 Samply 应用中向其显示的文本块。解释他们应报告什么类型的事件
          以及如何使用链接——例如："每次您在工作中经历压力事件时，请点击下方按钮。"
        </dd>
        <dt>事件类型（最多 5 个）</dt>
        <dd>
          每种事件类型都有一个<strong>标题</strong>——参与者在应用中看到的标签——
          以及一个 <strong>URL</strong>——点击该标题时打开的问卷链接。
          您可以定义 1 到 5 种不同的事件类型。如果您的研究只有一种自报告类型，
          请定义一种事件类型。如果参与者可以报告不同类别的体验（例如正面事件、负面事件、
          中性事件），请为每个类别定义一种类型，每种指向不同的问卷或传递不同的参数。
        </dd>
      </dl>
      <p>
        保存后，事件类型将出现在参与者 Samply 应用的研究界面中。
        点击标题会立即打开相应的 URL——无需通知。
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>事件类型链接中的 URL 占位符</h2>
      <p>
        每种事件类型 URL 支持与计划通知相同的 <Code>%TOKEN%</Code> 占位符。
        Samply 在参与者点击链接时替换它们：
      </p>
      <table>
        <thead>
          <tr>
            <th>令牌</th>
            <th>替换为</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>参与者的匿名 Samply ID。</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>注册时输入的自定义代码（如果没有代码则保持不替换）。</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>参与者的组 ID（如果没有组则保持不替换）。</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>点击链接时的 Unix 时间戳（毫秒）。</td>
          </tr>
        </tbody>
      </table>
      <p>典型的事件类型 URL 如下所示：</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> 捕获点击时间——即参与者决定报告的时刻——而非服务器端的发送时间。
        请在分析中将此作为您的事件时间戳。完整的令牌参考请参阅{' '}
        <a href='/docs/placeholders'>URL 占位符</a>。
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>何时使用事件偶发性采样</h2>
      <dl>
        <dt>纯事件偶发性</dt>
        <dd>
          每当目标事件发生时，参与者点击某种事件类型——冲突、渴望、社交互动。
          无需计划通知。研究完全由自主发起的报告组成。
        </dd>
        <dt>混合设计</dt>
        <dd>
          将计划通知（信号偶发性）与事件类型（事件偶发性）相结合。
          参与者既接收定时提示<em>又</em>可以随时自主发起报告。
          两种类型的报告均出现在历史记录中。
        </dd>
        <dt>多个事件类别</dt>
        <dd>
          使用最多五种事件类型来区分不同的体验类别。每种类型可以路由到不同的问卷条件
          或传递不同的标识符，以便响应在您的数据中自动分类。
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>追踪自主发起的报告</h2>
      <p>
        点击事件类型链接会以点击时间戳记录在历史记录中。
        CSV 导出在事件时间戳列中包含点击时间，让您能够区分计划发送和自主发起的报告。
      </p>
      <p>
        要将自主发起的报告与触发事件相关联，请将 <Code>%TIMESTAMP%</Code> 传递给您的问卷工具，
        并将其存储为嵌入数据字段。这为您提供了参与者决定报告时刻的独立于研究者的记录，
        无论网络延迟或问卷加载时间如何。
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>事件偶发性 vs 地理围栏</h3>
      <p>
        事件类型链接依赖于参与者识别并报告目标事件——它们是主观的且是自愿的。{' '}
        <a href='/docs/geofencing'>地理围栏</a>自动检测位置事件并在没有参与者操作的情况下触发通知。
        当目标事件具有精确的 GPS 特征时使用地理围栏；当事件属于心理、社会或其他传感器无法检测的性质时，
        使用事件偶发性设计。
      </p>
    </>
  );
}

export default function EventContingentContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <EventContingentContentDe />;
  if (locale === "nl") return <EventContingentContentNl />;
  if (locale === "ru") return <EventContingentContentRu />;
  if (locale === "zh") return <EventContingentContentZh />;
  if (locale === "ko") return <EventContingentContentKo />;
  if (locale === "it") return <EventContingentContentIt />;
  if (locale === "fr") return <EventContingentContentFr />;
  if (locale === "es") return <EventContingentContentEs />;
  if (locale === "pt") return <EventContingentContentPt />;
  return <EventContingentContentEn />;
}

function EventContingentContentKo() {
  return (
    <>
      <p>
        신호 수반적 설계에서는 Samply가 참여자에게 알림을 보낼 시점을 결정합니다. 사건 수반적
        설계에서는 <em>참여자</em>가 결정합니다 — 삶에서 목표 사건이 발생한 직후 스스로 보고를
        시작합니다. Samply는 Samply Research 앱 내에 표시되는 명명된 사건 유형을 통해
        사건 수반적 설계를 지원합니다.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>사건 수반적 설계 설정하기</h2>
      <p>
        연구 대시보드를 열고 <strong>설정</strong> 탭으로 이동하여{' '}
        <strong>사건 수반적 설계</strong>를 활성화하십시오. 두 개의 설정 필드가 나타납니다:
      </p>
      <dl>
        <dt>참여자용 안내</dt>
        <dd>
          참여자가 연구에 참여한 후 Samply 앱에 표시되는 텍스트 블록입니다. 어떤 종류의
          사건을 보고해야 하며 링크를 어떻게 사용하는지 설명하십시오 — 예:
          &ldquo;직장에서 스트레스 사건을 경험할 때마다 아래 버튼을 탭하십시오.&rdquo;
        </dd>
        <dt>사건 유형 (최대 5개)</dt>
        <dd>
          각 사건 유형에는 <strong>레이블</strong> — 앱에서 참여자에게 보이는 라벨 — 과
          <strong>URL</strong> — 해당 레이블을 탭했을 때 열리는 설문 링크 — 이 있습니다.
          하나에서 다섯 가지의 서로 다른 사건 유형을 정의할 수 있습니다. 연구에 하나의
          자가 보고 유형만 있는 경우 하나의 사건 유형을 정의하십시오. 참여자가 서로 다른
          경험 범주를 보고할 수 있는 경우(예: 긍정적 사건, 부정적 사건, 중립적 사건)
          각 범주에 하나의 유형을 정의하고 각각 다른 설문을 가리키거나 다른 파라미터를
          전달하도록 하십시오.
        </dd>
      </dl>
      <p>
        저장되면 사건 유형이 Samply 앱의 참여자 연구 화면에 나타납니다. 레이블을 탭하면
        즉시 해당 URL이 열립니다 — 알림이 필요하지 않습니다.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>사건 유형 링크의 URL 플레이스홀더</h2>
      <p>
        각 사건 유형 URL은 예약된 알림과 동일한 <Code>%TOKEN%</Code> 플레이스홀더를
        지원합니다. Samply는 참여자가 링크를 탭하는 순간 이를 대체합니다:
      </p>
      <table>
        <thead>
          <tr>
            <th>토큰</th>
            <th>대체되는 값</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>참여자의 익명 Samply ID.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>등록 시 입력한 사용자 지정 코드 (코드가 없으면 대체되지 않음).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>참여자의 그룹 ID (그룹이 없으면 대체되지 않음).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>링크를 탭한 순간의 Unix 타임스탬프(밀리초).</td>
          </tr>
        </tbody>
      </table>
      <p>일반적인 사건 유형 URL은 다음과 같습니다:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code>는 탭 시간 — 참여자가 보고하기로 결정한 순간 — 을 캡처합니다.
        서버 측 발송 시간이 아닙니다. 분석에서 이것을 사건 타임스탬프로 사용하십시오.
        전체 토큰 참조는 <a href='/docs/placeholders'>URL 플레이스홀더</a>를 참조하십시오.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>사건 수반적 표집을 사용할 시점</h2>
      <dl>
        <dt>순수 사건 수반적</dt>
        <dd>
          목표 사건이 발생할 때마다 참여자가 사건 유형을 탭합니다 — 갈등, 갈망,
          사회적 상호작용. 예약된 알림이 필요하지 않습니다. 연구는 전적으로 자기 시작
          보고로 구성됩니다.
        </dd>
        <dt>혼합 설계</dt>
        <dd>
          예약된 알림(신호 수반적)과 사건 유형(사건 수반적)을 결합하십시오. 참여자는
          시간 지정 촉발을 받으면서 <em>동시에</em> 언제든지 자발적으로 시작할 수 있습니다.
          두 유형의 보고 모두 기록 로그에 나타납니다.
        </dd>
        <dt>여러 사건 범주</dt>
        <dd>
          최대 다섯 가지 사건 유형을 사용하여 경험 범주를 구분하십시오. 각 유형은 다른
          설문 조건으로 연결하거나 다른 식별자를 전달하여 데이터에서 응답이 자동으로
          분류되도록 할 수 있습니다.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>자기 시작 보고 추적하기</h2>
      <p>
        사건 유형 링크 탭은 탭 타임스탬프와 함께 기록 로그에 기록됩니다.
        CSV 내보내기에는 사건 타임스탬프 열에 탭 시간이 포함되어 있어 예약된 발송과
        자기 시작 보고를 구분할 수 있습니다.
      </p>
      <p>
        자기 시작 보고를 유발 사건과 연결하려면 <Code>%TIMESTAMP%</Code>를 설문 도구에
        전달하고 포함된 데이터 필드로 저장하십시오. 이를 통해 네트워크 지연이나
        설문 로드 시간에 관계없이 참여자가 보고하기로 결정한 시점에 대한
        연구자 독립적인 기록을 얻을 수 있습니다.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>사건 수반적 vs 지오펜싱</h3>
      <p>
        사건 유형 링크는 참여자가 목표 사건을 인식하고 보고하는 것에 의존합니다 —
        주관적이며 자발적입니다.{' '}
        <a href='/docs/geofencing'>지오펜싱</a>은 위치 이벤트를 자동으로 감지하고
        참여자의 조작 없이 알림을 발송합니다. 목표 사건이 정확한 GPS 특성을 가진 경우
        지오펜싱을 사용하고, 사건이 심리적이거나 사회적이거나 센서로 감지할 수 없는
        경우 사건 수반적 설계를 사용하십시오.
      </p>
    </>
  );
}

function EventContingentContentIt() {
  return (
    <>
      <p>
        In un disegno signal-contingent, Samply decide quando notificare i partecipanti. In un
        disegno event-contingent, è il <em>partecipante</em> a decidere — avvia autonomamente un
        report immediatamente dopo che si verifica un evento target nella propria vita. Samply
        supporta i disegni event-contingent attraverso tipi di evento nominati che appaiono
        all&apos;interno dell&apos;app Samply Research.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configurazione del disegno event-contingent</h2>
      <p>
        Aprire il dashboard dello studio, andare alla scheda <strong>Impostazioni</strong> e abilitare{' '}
        <strong>Disegno event-contingent</strong>. Compaiono due campi di configurazione:
      </p>
      <dl>
        <dt>Istruzioni per i partecipanti</dt>
        <dd>
          Un blocco di testo mostrato ai partecipanti nell&apos;app Samply dopo che si sono iscritti.
          Spiegare che tipo di evento devono segnalare e come utilizzare i collegamenti — ad esempio:
          &ldquo;Toccare il pulsante sottostante ogni volta che si vive un evento stressante al lavoro.&rdquo;
        </dd>
        <dt>Tipi di evento (fino a 5)</dt>
        <dd>
          Ogni tipo di evento ha una <strong>didascalia</strong> — l&apos;etichetta che il partecipante
          vede nell&apos;app — e un <strong>URL</strong> — il collegamento al sondaggio che si apre quando
          tocca quella didascalia. È possibile definire da uno a cinque tipi di evento distinti.
          Se lo studio prevede un solo tipo di auto-report, definire un tipo di evento. Se i
          partecipanti possono segnalare diverse categorie di esperienza (es. evento positivo,
          evento negativo, evento neutro), definire un tipo per categoria, ognuno che punta a un
          sondaggio diverso o che passa un parametro diverso.
        </dd>
      </dl>
      <p>
        Una volta salvati, i tipi di evento appaiono nella schermata dello studio del partecipante
        nell&apos;app Samply. Toccare una didascalia apre immediatamente l&apos;URL corrispondente —
        non è necessaria alcuna notifica.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Segnaposto URL nei collegamenti ai tipi di evento</h2>
      <p>
        Ogni URL di tipo evento supporta gli stessi segnaposto <Code>%TOKEN%</Code> delle
        notifiche pianificate. Samply li sostituisce nel momento in cui il partecipante tocca
        il collegamento:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Sostituito con</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>L&apos;ID Samply anonimo del partecipante.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>Il codice personalizzato inserito all&apos;iscrizione (lasciato non sostituito se assente).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>L&apos;ID gruppo del partecipante (lasciato non sostituito se assente).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Timestamp Unix (millisecondi) nel momento in cui il collegamento viene toccato.</td>
          </tr>
        </tbody>
      </table>
      <p>Un tipico URL di tipo evento si presenta così:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> cattura il momento del tocco — l&apos;istante in cui il partecipante
        ha deciso di segnalare — non un orario di invio lato server. Utilizzarlo come timestamp
        dell&apos;evento nell&apos;analisi. Vedere <a href='/docs/placeholders'>Segnaposto URL</a> per
        il riferimento completo dei token.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Quando utilizzare il campionamento event-contingent</h2>
      <dl>
        <dt>Puramente event-contingent</dt>
        <dd>
          I partecipanti toccano un tipo di evento ogni volta che si verifica un evento target —
          un conflitto, un impulso, un&apos;interazione sociale. Non sono necessarie notifiche pianificate.
          Lo studio è composto interamente da report auto-avviati.
        </dd>
        <dt>Disegno ibrido</dt>
        <dd>
          Combinare notifiche pianificate (signal-contingent) con tipi di evento (event-contingent).
          I partecipanti ricevono sollecitazioni temporizzate <em>e</em> possono auto-avviarsi in
          qualsiasi momento. Entrambi i tipi di report appaiono nel registro della cronologia.
        </dd>
        <dt>Più categorie di eventi</dt>
        <dd>
          Utilizzare fino a cinque tipi di evento per distinguere tra categorie di esperienza.
          Ogni tipo può indirizzare a una condizione di sondaggio diversa o trasmettere un
          identificatore diverso in modo che le risposte vengano automaticamente ordinate nei dati.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tracciamento dei report auto-avviati</h2>
      <p>
        I tocchi sui collegamenti ai tipi di evento vengono registrati nel registro della cronologia
        con il timestamp del tocco. L&apos;esportazione CSV include il tempo del tocco nella colonna dei
        timestamp degli eventi, consentendo di distinguere gli invii pianificati dai report auto-avviati.
      </p>
      <p>
        Per correlare un report auto-avviato con l&apos;evento scatenante, trasmettere{' '}
        <Code>%TIMESTAMP%</Code> allo strumento di sondaggio e memorizzarlo come campo di dati
        incorporati. Ciò fornisce un registro indipendente dal ricercatore di quando il partecipante
        ha deciso di segnalare, indipendentemente dai ritardi di rete o dai tempi di caricamento
        del sondaggio.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Event-contingent vs geofencing</h3>
      <p>
        I collegamenti ai tipi di evento si affidano al partecipante per riconoscere e segnalare
        l&apos;evento target — sono soggettivi e volontari.{' '}
        <a href='/docs/geofencing'>Il geofencing</a> rileva automaticamente gli eventi di posizione
        e invia una notifica senza l&apos;intervento del partecipante. Utilizzare il geofencing quando
        l&apos;evento target ha una precisa firma GPS; utilizzare il disegno event-contingent quando
        l&apos;evento è di natura psicologica, sociale o altrimenti non rilevabile dai sensori.
      </p>
    </>
  );
}

function EventContingentContentFr() {
  return (
    <>
      <p>
        Dans un protocole signal-contingent, c&apos;est Samply qui décide quand notifier les
        participants. Dans un protocole événement-contingent, c&apos;est le <em>participant</em>{' '}
        qui décide — il initie lui-même un rapport immédiatement après qu&apos;un événement
        cible se produit dans sa vie. Samply prend en charge les protocoles
        événement-contingents grâce à des types d&apos;événements nommés qui apparaissent dans
        l&apos;application Samply Research.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configurer un protocole événement-contingent</h2>
      <p>
        Ouvrez le tableau de bord de votre étude, accédez à l&apos;onglet{' '}
        <strong>Paramètres</strong> et activez <strong>Protocole événement-contingent</strong>.
        Deux champs de configuration apparaissent :
      </p>
      <dl>
        <dt>Instructions pour les participants</dt>
        <dd>
          Un bloc de texte affiché aux participants dans l&apos;application Samply après leur
          inscription. Expliquez quel type d&apos;événement ils doivent signaler et comment
          utiliser les liens — par exemple : &ldquo;Appuyez sur le bouton ci-dessous chaque
          fois que vous vivez un événement stressant au travail.&rdquo;
        </dd>
        <dt>Types d&apos;événements (jusqu&apos;à 5)</dt>
        <dd>
          Chaque type d&apos;événement possède un <strong>intitulé</strong> — le libellé que
          le participant voit dans l&apos;application — et une <strong>URL</strong> — le lien
          vers le questionnaire qui s&apos;ouvre lorsqu&apos;il appuie sur cet intitulé. Vous
          pouvez définir entre un et cinq types d&apos;événements distincts. Si votre étude
          ne comporte qu&apos;un seul type d&apos;auto-rapport, définissez un seul type
          d&apos;événement. Si les participants peuvent signaler différentes catégories
          d&apos;expériences (p. ex. événement positif, événement négatif, événement neutre),
          définissez un type par catégorie, chacun pointant vers un questionnaire différent ou
          transmettant un paramètre différent.
        </dd>
      </dl>
      <p>
        Une fois enregistrés, les types d&apos;événements apparaissent sur l&apos;écran de
        l&apos;étude du participant dans l&apos;application Samply. Appuyer sur un intitulé
        ouvre immédiatement l&apos;URL correspondante — aucune notification n&apos;est
        nécessaire.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Paramètres URL dans les liens des types d&apos;événements</h2>
      <p>
        Chaque URL de type d&apos;événement prend en charge les mêmes paramètres{' '}
        <Code>%TOKEN%</Code> que les notifications planifiées. Samply les substitue au
        moment où le participant appuie sur le lien :
      </p>
      <table>
        <thead>
          <tr>
            <th>Paramètre</th>
            <th>Remplacé par</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>L&apos;identifiant Samply anonyme du participant.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>Le code personnalisé saisi à l&apos;inscription (laissé tel quel s&apos;il n&apos;y a pas de code).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>L&apos;identifiant de groupe du participant (laissé tel quel s&apos;il n&apos;y a pas de groupe).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Horodatage Unix (millisecondes) au moment où le lien est appuyé.</td>
          </tr>
        </tbody>
      </table>
      <p>Une URL de type d&apos;événement typique ressemble à ceci :</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> capture le moment de l&apos;appui — l&apos;instant où le
        participant a décidé de signaler — et non un horodatage d&apos;envoi côté serveur.
        Utilisez-le comme horodatage de l&apos;événement dans vos analyses. Consultez{' '}
        <a href='/docs/placeholders'>Paramètres URL</a> pour la référence complète des
        paramètres.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Quand utiliser l&apos;échantillonnage événement-contingent</h2>
      <dl>
        <dt>Purement événement-contingent</dt>
        <dd>
          Les participants appuient sur un type d&apos;événement chaque fois qu&apos;un événement
          cible se produit — un conflit, une envie, une interaction sociale. Aucune notification
          planifiée n&apos;est nécessaire. L&apos;étude se compose entièrement de rapports auto-initiés.
        </dd>
        <dt>Protocole hybride</dt>
        <dd>
          Combinez des notifications planifiées (signal-contingent) avec des types
          d&apos;événements (événement-contingent). Les participants reçoivent des invites
          programmées <em>et</em> peuvent s&apos;auto-initier à tout moment. Les deux types
          de rapports apparaissent dans le journal d&apos;historique.
        </dd>
        <dt>Plusieurs catégories d&apos;événements</dt>
        <dd>
          Utilisez jusqu&apos;à cinq types d&apos;événements pour distinguer différentes
          catégories d&apos;expériences. Chaque type peut diriger vers une condition de
          questionnaire différente ou transmettre un identifiant différent afin que les
          réponses soient automatiquement triées dans vos données.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Suivi des rapports auto-initiés</h2>
      <p>
        Les appuis sur les liens de types d&apos;événements sont enregistrés dans le journal
        d&apos;historique avec l&apos;horodatage de l&apos;appui. L&apos;export CSV inclut
        l&apos;heure de l&apos;appui dans la colonne des horodatages d&apos;événements, vous
        permettant de distinguer les envois planifiés des rapports auto-initiés.
      </p>
      <p>
        Pour corréler un rapport auto-initié avec l&apos;événement déclencheur, transmettez{' '}
        <Code>%TIMESTAMP%</Code> à votre outil de questionnaire et enregistrez-le comme
        champ de données intégré. Cela vous fournit un enregistrement indépendant du chercheur
        indiquant quand le participant a décidé de signaler, indépendamment des délais réseau
        ou du temps de chargement du questionnaire.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Événement-contingent vs geofencing</h3>
      <p>
        Les liens de types d&apos;événements reposent sur la capacité du participant à
        reconnaître et à signaler l&apos;événement cible — ils sont subjectifs et volontaires.{' '}
        <a href='/docs/geofencing'>Le geofencing</a> détecte automatiquement les événements
        de localisation et envoie une notification sans intervention du participant. Utilisez
        le geofencing lorsque l&apos;événement cible possède une signature GPS précise ;
        utilisez le protocole événement-contingent lorsque l&apos;événement est de nature
        psychologique, sociale ou autrement non détectable par des capteurs.
      </p>
    </>
  );
}

function EventContingentContentEs() {
  return (
    <>
      <p>
        En un protocolo signal-contingente, Samply decide cuándo notificar a los participantes.
        En un protocolo evento-contingente, es el <em>participante</em> quien decide — inicia
        por sí mismo un informe inmediatamente después de que ocurre un evento objetivo en su
        vida. Samply admite protocolos evento-contingentes mediante tipos de eventos con nombre
        que aparecen dentro de la aplicación Samply Research.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configurar un protocolo evento-contingente</h2>
      <p>
        Abra el panel de su estudio, vaya a la pestaña <strong>Configuración</strong> y active
        el <strong>Protocolo evento-contingente</strong>. Aparecerán dos campos de configuración:
      </p>
      <dl>
        <dt>Instrucciones para los participantes</dt>
        <dd>
          Un bloque de texto que se muestra a los participantes en la aplicación Samply después
          de unirse. Explique qué tipo de evento deben notificar y cómo usar los enlaces — por
          ejemplo: &ldquo;Pulse el botón de abajo cada vez que viva un evento estresante en el trabajo.&rdquo;
        </dd>
        <dt>Tipos de eventos (hasta 5)</dt>
        <dd>
          Cada tipo de evento tiene un <strong>título</strong> — la etiqueta que el participante
          ve en la aplicación — y una <strong>URL</strong> — el enlace a la encuesta que se abre
          cuando pulsa ese título. Puede definir entre uno y cinco tipos de eventos distintos.
          Si su estudio tiene un solo tipo de autoinforme, defina un tipo de evento. Si los
          participantes pueden notificar diferentes categorías de experiencia (p. ej., evento
          positivo, evento negativo, evento neutro), defina un tipo por categoría, cada uno
          apuntando a una encuesta diferente o pasando un parámetro distinto.
        </dd>
      </dl>
      <p>
        Una vez guardados, los tipos de eventos aparecen en la pantalla del estudio del
        participante en la aplicación Samply. Pulsar un título abre inmediatamente la URL
        correspondiente — no se necesita ninguna notificación.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Marcadores de posición en los enlaces de tipos de eventos</h2>
      <p>
        Cada URL de tipo de evento admite los mismos marcadores <Code>%TOKEN%</Code> que las
        notificaciones programadas. Samply los sustituye en el momento en que el participante
        pulsa el enlace:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Sustituido por</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>El identificador Samply anónimo del participante.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>El código personalizado introducido en el registro (se deja sin sustituir si no hay código).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>El identificador de grupo del participante (se deja sin sustituir si no hay grupo).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Marca de tiempo Unix (milisegundos) en el momento en que se pulsa el enlace.</td>
          </tr>
        </tbody>
      </table>
      <p>Una URL de tipo de evento típica tiene este aspecto:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> captura el momento del toque — el instante en que el
        participante decidió notificar — y no una marca de tiempo de envío del servidor.
        Utilícelo como marca de tiempo del evento en sus análisis. Consulte{' '}
        <a href='/docs/placeholders'>Marcadores de posición en URL</a> para la referencia
        completa de tokens.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Cuándo usar el muestreo evento-contingente</h2>
      <dl>
        <dt>Puramente evento-contingente</dt>
        <dd>
          Los participantes pulsan un tipo de evento cada vez que ocurre un evento objetivo —
          un conflicto, un deseo, una interacción social. No se necesitan notificaciones
          programadas. El estudio se compone íntegramente de informes auto-iniciados.
        </dd>
        <dt>Protocolo híbrido</dt>
        <dd>
          Combine notificaciones programadas (signal-contingente) con tipos de eventos
          (evento-contingente). Los participantes reciben avisos programados <em>y</em> pueden
          auto-iniciarse en cualquier momento. Ambos tipos de informes aparecen en el
          historial de registros.
        </dd>
        <dt>Múltiples categorías de eventos</dt>
        <dd>
          Use hasta cinco tipos de eventos para distinguir entre categorías de experiencia.
          Cada tipo puede dirigirse a una condición de encuesta diferente o transmitir un
          identificador distinto para que las respuestas se ordenen automáticamente en sus datos.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Seguimiento de informes auto-iniciados</h2>
      <p>
        Los toques en los enlaces de tipos de eventos se registran en el historial con la marca
        de tiempo del toque. La exportación CSV incluye la hora del toque en la columna de
        marcas de tiempo de eventos, lo que le permite distinguir los envíos programados de
        los informes auto-iniciados.
      </p>
      <p>
        Para correlacionar un informe auto-iniciado con el evento desencadenante, pase{' '}
        <Code>%TIMESTAMP%</Code> a su herramienta de encuesta y guárdelo como campo de datos
        integrado. Esto le proporciona un registro independiente del investigador de cuándo el
        participante decidió notificar, independientemente de los retrasos de red o el tiempo
        de carga de la encuesta.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Evento-contingente vs geofencing</h3>
      <p>
        Los enlaces de tipos de eventos dependen de que el participante reconozca e informe el
        evento objetivo — son subjetivos y voluntarios.{' '}
        <a href='/docs/geofencing'>El geofencing</a> detecta automáticamente los eventos de
        ubicación y envía una notificación sin intervención del participante. Use geofencing
        cuando el evento objetivo tenga una firma GPS precisa; use el protocolo
        evento-contingente cuando el evento sea de naturaleza psicológica, social o de otro
        tipo no detectable por sensores.
      </p>
    </>
  );
}

function EventContingentContentPt() {
  return (
    <>
      <p>
        Em um design signal-contingente, o Samply decide quando os participantes são notificados.
        Em um design evento-contingente, é o <em>participante</em> quem decide — ele inicia
        por conta própria um relatório imediatamente após a ocorrência de um evento-alvo em sua
        vida. O Samply oferece suporte a designs evento-contingentes por meio de tipos de eventos
        nomeados que aparecem no aplicativo Samply Research.
      </p>

      {/* ── Setting up ────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configurar um protocolo evento-contingente</h2>
      <p>
        Abra o painel do seu estudo, vá até a aba <strong>Configurações</strong> e ative o{' '}
        <strong>Protocolo evento-contingente</strong>. Dois campos de configuração serão exibidos:
      </p>
      <dl>
        <dt>Instruções para os participantes</dt>
        <dd>
          Um bloco de texto exibido aos participantes no aplicativo Samply após a adesão. Explique
          que tipo de evento eles devem registrar e como usar os links — por exemplo:
          &ldquo;Toque no botão abaixo toda vez que vivenciar um evento estressante no trabalho.&rdquo;
        </dd>
        <dt>Tipos de eventos (até 5)</dt>
        <dd>
          Cada tipo de evento tem um <strong>título</strong> — o rótulo que o participante vê
          no aplicativo — e uma <strong>URL</strong> — o link da pesquisa que abre quando ele
          toca nesse título. Você pode definir entre um e cinco tipos de eventos distintos. Se
          o seu estudo tiver apenas um tipo de autorrelato, defina um tipo de evento. Se os
          participantes puderem relatar diferentes categorias de experiência (p. ex., evento
          positivo, evento negativo, evento neutro), defina um tipo por categoria, cada um
          apontando para uma pesquisa diferente ou passando um parâmetro distinto.
        </dd>
      </dl>
      <p>
        Após salvar, os tipos de eventos aparecerão na tela do estudo do participante no
        aplicativo Samply. Tocar em um título abre imediatamente a URL correspondente — nenhuma
        notificação é necessária.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Marcadores de posição de URL nos links de tipos de eventos</h2>
      <p>
        Cada URL de tipo de evento suporta os mesmos marcadores <Code>%TOKEN%</Code> que as
        notificações agendadas. O Samply os substitui no momento em que o participante toca
        no link:
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Substituído por</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>%SAMPLY_ID%</Code></td>
            <td>O ID anônimo do participante no Samply.</td>
          </tr>
          <tr>
            <td><Code>%PARTICIPANT_CODE%</Code></td>
            <td>O código personalizado inserido no cadastro (mantido sem substituição se não houver código).</td>
          </tr>
          <tr>
            <td><Code>%GROUP_ID%</Code></td>
            <td>O ID de grupo do participante (mantido sem substituição se não houver grupo).</td>
          </tr>
          <tr>
            <td><Code>%TIMESTAMP%</Code></td>
            <td>Timestamp Unix (milissegundos) no momento em que o link é tocado.</td>
          </tr>
        </tbody>
      </table>
      <p>Uma URL típica de tipo de evento tem este formato:</p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%' />
      <p style={{ marginTop: '1.4rem' }}>
        <Code>%TIMESTAMP%</Code> captura o momento do toque — o instante em que o participante
        decidiu registrar — e não um timestamp de envio do servidor. Use-o como timestamp do
        evento em suas análises. Consulte{' '}
        <a href='/docs/placeholders'>Marcadores de posição de URL</a> para a referência
        completa de tokens.
      </p>

      {/* ── When to use ───────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Quando usar a amostragem evento-contingente</h2>
      <dl>
        <dt>Puramente evento-contingente</dt>
        <dd>
          Os participantes tocam em um tipo de evento sempre que um evento-alvo ocorre —
          um conflito, um desejo, uma interação social. Não são necessárias notificações
          agendadas. O estudo é composto inteiramente de relatórios autoiniciados.
        </dd>
        <dt>Protocolo híbrido</dt>
        <dd>
          Combine notificações agendadas (signal-contingente) com tipos de eventos
          (evento-contingente). Os participantes recebem lembretes programados <em>e</em> podem
          se autoiniciar a qualquer momento. Ambos os tipos de relatórios aparecem no
          histórico de registros.
        </dd>
        <dt>Múltiplas categorias de eventos</dt>
        <dd>
          Use até cinco tipos de eventos para distinguir entre categorias de experiência.
          Cada tipo pode ser direcionado para uma condição de pesquisa diferente ou transmitir
          um identificador distinto para que as respostas sejam automaticamente classificadas
          nos seus dados.
        </dd>
      </dl>

      {/* ── Tracking ──────────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Rastreamento de relatórios autoiniciados</h2>
      <p>
        Os toques nos links de tipos de eventos são registrados no histórico com o timestamp
        do toque. A exportação CSV inclui o horário do toque na coluna de timestamps de eventos,
        permitindo distinguir os envios agendados dos relatórios autoiniciados.
      </p>
      <p>
        Para correlacionar um relatório autoiniciado com o evento gatilho, passe{' '}
        <Code>%TIMESTAMP%</Code> para a sua ferramenta de pesquisa e armazene-o como um campo
        de dados incorporado. Isso fornece um registro independente do pesquisador sobre quando
        o participante decidiu registrar, independentemente de atrasos na rede ou do tempo de
        carregamento da pesquisa.
      </p>

      {/* ── Compared to geofencing ────────────────────────────────────────── */}
      <h3>Evento-contingente vs geofencing</h3>
      <p>
        Os links de tipos de eventos dependem de o participante reconhecer e registrar o evento-alvo
        — são subjetivos e voluntários.{' '}
        <a href='/docs/geofencing'>O geofencing</a> detecta automaticamente eventos de localização
        e dispara uma notificação sem ação do participante. Use geofencing quando o evento-alvo
        tiver uma assinatura GPS precisa; use o design evento-contingente quando o evento for de
        natureza psicológica, social ou não detectável por sensores.
      </p>
    </>
  );
}
