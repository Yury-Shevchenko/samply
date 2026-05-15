import type { Locale } from "@/lib/i18n";

export default function IrbContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <IrbContentDe />;
  if (locale === "nl") return <IrbContentNl />;
  if (locale === "ru") return <IrbContentRu />;
  if (locale === "zh") return <IrbContentZh />;
  if (locale === "ko") return <IrbContentKo />;
  if (locale === "it") return <IrbContentIt />;
  if (locale === "fr") return <IrbContentFr />;
  if (locale === "es") return <IrbContentEs />;
  if (locale === "pt") return <IrbContentPt />;
  return <IrbContentEn />;
}

function IrbContentEn() {
  return (
    <>
      <p>
        This document is written for researchers who need to describe Samply to an Institutional
        Review Board (IRB), ethics committee, or data protection officer. It covers what data
        Samply collects, where it goes, and how it is protected — in plain language, without
        legal boilerplate.
      </p>
      <p><strong>Last updated:</strong> May 2025</p>
      <p><strong>Contact:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, iScience Research Group, University of Konstanz, Germany.
      </p>

      <h2>What Samply is</h2>
      <p>
        Samply is a notification-scheduling platform for experience-sampling and diary studies.
        Researchers configure notification schedules on the Samply website. Participants install
        the Samply Research app on their phone, join a study, and receive push notifications
        at the times the researcher has set. Tapping a notification opens the researcher&apos;s
        external survey link — Samply does not host or collect survey responses.
      </p>

      <h2>Data collected from participants</h2>
      <table>
        <thead>
          <tr>
            <th>Data item</th>
            <th>Purpose</th>
            <th>Stored by Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mail address and hashed password</td>
            <td>Account authentication</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Push notification token</td>
            <td>Delivering notifications to the device</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Internal participant ID (Samply ID)</td>
            <td>Pseudonymous identifier passed to survey URLs so researchers can link responses</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Notification receipt timestamp</td>
            <td>Compliance tracking — records when a notification was sent and whether it was opened</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Timezone preference and quiet-hour window</td>
            <td>Scheduling notifications within the participant&apos;s preferred hours</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Geolocation (geofencing studies only)</td>
            <td>Triggering location-based notifications when the participant enters or exits a defined area; not shared with researchers or third parties</td>
            <td>Device only — coordinates are processed on-device and not transmitted to the server</td>
          </tr>
          <tr>
            <td>Survey responses</td>
            <td>Not applicable</td>
            <td>No — responses go directly to the researcher&apos;s survey platform (Qualtrics, LimeSurvey, etc.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Data collected from researchers</h2>
      <table>
        <thead>
          <tr>
            <th>Data item</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mail address and hashed password</td>
            <td>Account authentication</td>
          </tr>
          <tr>
            <td>Study configuration (title, description, schedule, survey URLs)</td>
            <td>Running the study</td>
          </tr>
        </tbody>
      </table>

      <h2>What Samply does not do</h2>
      <ul>
        <li>Samply does not collect, store, or have access to participants&apos; survey responses. Responses are submitted directly from the participant&apos;s browser to the researcher&apos;s survey tool.</li>
        <li>Samply does not collect participants&apos; names, phone numbers, or any free-text personal information beyond an e-mail address.</li>
        <li>Samply does not share participant data with third parties, advertisers, or other researchers.</li>
        <li>Samply does not use participant data for any purpose other than delivering scheduled notifications for the study the participant has joined.</li>
        <li>Samply does not retain GPS coordinates on its servers. Geofence calculations run on the participant&apos;s device.</li>
      </ul>

      <h2>Participant pseudonymity</h2>
      <p>
        Each participant is assigned an internal Samply ID — a random alphanumeric string. This
        ID is appended to the survey URL when the participant taps a notification (e.g.,{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). The researcher receives this ID
        in their survey data and can use it to link survey responses across time points without
        knowing the participant&apos;s e-mail address.
      </p>
      <p>
        Researchers do not see participant e-mail addresses in the Samply dashboard. The link
        between an e-mail address and a Samply ID exists only in the Samply database and is not
        exported.
      </p>

      <h2>Participant rights</h2>
      <ul>
        <li><strong>Withdrawal:</strong> Participants can leave a study at any time from the app. Leaving stops all future notifications immediately.</li>
        <li><strong>Account deletion:</strong> Participants can delete their account from the app settings. This permanently removes their e-mail address, Samply ID, push token, and all associated records from Samply&apos;s database. Deletion cannot be undone.</li>
        <li><strong>Data access:</strong> Participants may request a copy of their data by contacting <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Data storage and security</h2>
      <ul>
        <li>The Samply platform is operated by the iScience Research Group at the University of Konstanz, Germany.</li>
        <li>Data is stored on servers operated by the University of Konstanz.</li>
        <li>Passwords are stored as bcrypt hashes and are never stored or transmitted in plain text.</li>
        <li>All communication between the app, the website, and the server uses HTTPS/TLS encryption.</li>
        <li>Push notifications are delivered via Apple Push Notification Service (APNS) and Google Firebase Cloud Messaging (FCM). The notification payload contains only the study title and a prompt text set by the researcher — no personal data.</li>
      </ul>

      <h2>Retention</h2>
      <p>
        Participant data is retained for the duration of the study and until the participant
        deletes their account. Researchers may delete individual participant records or all
        study data at any time from the dashboard. There is no automatic deletion schedule.
      </p>

      <h2>Suggested IRB description</h2>
      <p>
        The following paragraph can be adapted for use in an ethics application or consent form:
      </p>
      <blockquote>
        <p>
          Notifications will be delivered via the Samply Research app (samply.uni-konstanz.de),
          developed and operated by the iScience Research Group at the University of Konstanz,
          Germany. Samply will store your e-mail address, a push notification token, and a
          pseudonymous participant ID for the purpose of delivering scheduled notifications.
          Samply does not collect your survey responses; those are submitted directly to
          [name of survey platform]. You can withdraw from the study and delete your Samply
          account at any time from the app. For data protection questions, contact
          yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Questions</h2>
      <p>
        If your IRB or data protection office has specific questions not answered here, please
        write to <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. We are
        happy to provide additional documentation or to speak directly with your ethics reviewer.
      </p>
    </>
  );
}

function IrbContentNl() {
  return (
    <>
      <p>
        Dit document is geschreven voor onderzoekers die Samply moeten beschrijven aan een
        Institutional Review Board (IRB), ethische commissie of functionaris voor
        gegevensbescherming. Het behandelt welke gegevens Samply verzamelt, waar ze naartoe
        gaan en hoe ze worden beschermd — in begrijpelijke taal, zonder juridisch
        standaardtekst.
      </p>
      <p><strong>Laatst bijgewerkt:</strong> mei 2025</p>
      <p><strong>Contact:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, iScience Research Group, University of Konstanz, Duitsland.
      </p>

      <h2>Wat Samply is</h2>
      <p>
        Samply is een platform voor het plannen van notificaties voor experience-sampling- en
        dagboekstudies. Onderzoekers configureren notificatieschema&apos;s op de
        Samply-website. Deelnemers installeren de Samply Research-app op hun telefoon, nemen
        deel aan een studie en ontvangen pushmeldingen op de tijden die de onderzoeker heeft
        ingesteld. Door op een notificatie te tikken wordt de externe enquêtelink van de
        onderzoeker geopend — Samply host geen enquête-antwoorden en verzamelt deze ook niet.
      </p>

      <h2>Gegevens verzameld van deelnemers</h2>
      <table>
        <thead>
          <tr>
            <th>Gegeven</th>
            <th>Doel</th>
            <th>Opgeslagen door Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mailadres en gehasht wachtwoord</td>
            <td>Accountauthenticatie</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Pushmeldingstoken</td>
            <td>Bezorging van notificaties op het apparaat</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Interne deelnemer-ID (Samply-ID)</td>
            <td>Pseudonieme identificator die wordt doorgegeven aan enquête-URL&apos;s zodat onderzoekers antwoorden kunnen koppelen</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Tijdstempel van ontvangst notificatie</td>
            <td>Nalevingsregistratie — legt vast wanneer een notificatie is verzonden en of deze is geopend</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Tijdzonevoorkeur en stiltijdvenster</td>
            <td>Plannen van notificaties binnen de voorkeurstijden van de deelnemer</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Geolocatie (alleen bij geofencing-studies)</td>
            <td>Activeren van locatiegebaseerde notificaties wanneer de deelnemer een gedefinieerd gebied betreedt of verlaat; niet gedeeld met onderzoekers of derden</td>
            <td>Nee — coördinaten worden op het apparaat verwerkt en niet naar de server verzonden</td>
          </tr>
          <tr>
            <td>Enquête-antwoorden</td>
            <td>Niet van toepassing</td>
            <td>Nee — antwoorden gaan rechtstreeks naar het enquêteplatform van de onderzoeker (Qualtrics, LimeSurvey, enz.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Gegevens verzameld van onderzoekers</h2>
      <table>
        <thead>
          <tr>
            <th>Gegeven</th>
            <th>Doel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mailadres en gehasht wachtwoord</td>
            <td>Accountauthenticatie</td>
          </tr>
          <tr>
            <td>Studieconfiguratie (titel, beschrijving, schema, enquête-URL&apos;s)</td>
            <td>Uitvoering van de studie</td>
          </tr>
        </tbody>
      </table>

      <h2>Wat Samply niet doet</h2>
      <ul>
        <li>Samply verzamelt, slaat op noch heeft toegang tot de enquête-antwoorden van deelnemers. Antwoorden worden rechtstreeks vanuit de browser van de deelnemer naar het enquêtetool van de onderzoeker verzonden.</li>
        <li>Samply verzamelt geen namen, telefoonnummers of andere vrije-tekst persoonsgegevens van deelnemers buiten een e-mailadres.</li>
        <li>Samply deelt deelnemersgegevens niet met derden, adverteerders of andere onderzoekers.</li>
        <li>Samply gebruikt deelnemersgegevens uitsluitend voor het bezorgen van geplande notificaties voor de studie waaraan de deelnemer heeft deelgenomen.</li>
        <li>Samply bewaart geen GPS-coördinaten op zijn servers. Geofence-berekeningen vinden plaats op het apparaat van de deelnemer.</li>
      </ul>

      <h2>Pseudonimiteit van deelnemers</h2>
      <p>
        Elke deelnemer krijgt een interne Samply-ID toegewezen — een willekeurige
        alfanumerieke reeks. Deze ID wordt aan de enquête-URL toegevoegd wanneer de deelnemer
        op een notificatie tikt (bijv.{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). De onderzoeker ontvangt deze ID
        in zijn enquêtegegevens en kan deze gebruiken om enquête-antwoorden over meerdere
        tijdpunten te koppelen zonder het e-mailadres van de deelnemer te kennen.
      </p>
      <p>
        Onderzoekers zien geen e-mailadressen van deelnemers in het Samply-dashboard. De
        koppeling tussen een e-mailadres en een Samply-ID bestaat uitsluitend in de
        Samply-database en wordt niet geëxporteerd.
      </p>

      <h2>Rechten van deelnemers</h2>
      <ul>
        <li><strong>Terugtrekking:</strong> Deelnemers kunnen een studie op elk moment verlaten via de app. Vertrekken stopt alle toekomstige notificaties onmiddellijk.</li>
        <li><strong>Accountverwijdering:</strong> Deelnemers kunnen hun account verwijderen via de app-instellingen. Dit verwijdert permanent hun e-mailadres, Samply-ID, pushtoken en alle bijbehorende gegevens uit de Samply-database. Verwijdering kan niet ongedaan worden gemaakt.</li>
        <li><strong>Gegevenstoegang:</strong> Deelnemers kunnen een kopie van hun gegevens opvragen door contact op te nemen met <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Gegevensopslag en beveiliging</h2>
      <ul>
        <li>Het Samply-platform wordt beheerd door de iScience Research Group aan de University of Konstanz, Duitsland.</li>
        <li>Gegevens worden opgeslagen op servers die worden beheerd door de University of Konstanz.</li>
        <li>Wachtwoorden worden opgeslagen als bcrypt-hashes en worden nooit opgeslagen of verzonden als platte tekst.</li>
        <li>Alle communicatie tussen de app, de website en de server maakt gebruik van HTTPS/TLS-versleuteling.</li>
        <li>Pushmeldingen worden bezorgd via Apple Push Notification Service (APNS) en Google Firebase Cloud Messaging (FCM). De notificatiepayload bevat uitsluitend de studietitel en een prompttekst die door de onderzoeker is ingesteld — geen persoonsgegevens.</li>
      </ul>

      <h2>Bewaring</h2>
      <p>
        Deelnemersgegevens worden bewaard voor de duur van de studie en totdat de deelnemer
        zijn account verwijdert. Onderzoekers kunnen individuele deelnemersgegevens of alle
        studiegegevens te allen tijde via het dashboard verwijderen. Er is geen automatisch
        verwijderingsschema.
      </p>

      <h2>Voorgestelde IRB-beschrijving</h2>
      <p>
        De volgende alinea kan worden aangepast voor gebruik in een ethische aanvraag of
        toestemmingsformulier:
      </p>
      <blockquote>
        <p>
          Notificaties worden bezorgd via de Samply Research-app (samply.uni-konstanz.de),
          ontwikkeld en beheerd door de iScience Research Group aan de University of Konstanz,
          Duitsland. Samply slaat uw e-mailadres, een pushmeldingstoken en een pseudonieme
          deelnemer-ID op met het doel geplande notificaties te bezorgen. Samply verzamelt
          uw enquête-antwoorden niet; die worden rechtstreeks verzonden naar [naam van het
          enquêteplatform]. U kunt de studie op elk moment verlaten en uw Samply-account
          via de app verwijderen. Voor vragen over gegevensbescherming kunt u contact opnemen
          via yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Vragen</h2>
      <p>
        Als uw IRB of functionaris voor gegevensbescherming specifieke vragen heeft die hier
        niet worden beantwoord, schrijf dan naar{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Wij verstrekken
        graag aanvullende documentatie of spreken rechtstreeks met uw ethische beoordelaar.
      </p>
    </>
  );
}

function IrbContentDe() {
  return (
    <>
      <p>
        Dieses Dokument richtet sich an Forschende, die Samply gegenüber einem Institutional
        Review Board (IRB), einer Ethikkommission oder einem Datenschutzbeauftragten beschreiben
        müssen. Es erläutert, welche Daten Samply erhebt, wohin sie übermittelt werden und wie
        sie geschützt sind — in verständlicher Sprache, ohne juristischen Standardtext.
      </p>
      <p><strong>Zuletzt aktualisiert:</strong> Mai 2025</p>
      <p><strong>Kontakt:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, iScience Research Group, Universität Konstanz, Deutschland.
      </p>

      <h2>Was Samply ist</h2>
      <p>
        Samply ist eine Plattform zur Benachrichtigungsplanung für Experience-Sampling- und
        Tagebuchstudien. Forschende konfigurieren Benachrichtigungspläne auf der Samply-Website.
        Teilnehmende installieren die Samply Research App auf ihrem Smartphone, treten einer
        Studie bei und erhalten Push-Benachrichtigungen zu den vom Forschenden festgelegten
        Zeitpunkten. Ein Tippen auf eine Benachrichtigung öffnet den externen Umfragelink des
        Forschenden — Samply hostet keine Umfrageantworten und erhebt diese auch nicht.
      </p>

      <h2>Von Teilnehmenden erhobene Daten</h2>
      <table>
        <thead>
          <tr>
            <th>Datenelement</th>
            <th>Zweck</th>
            <th>Von Samply gespeichert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-Mail-Adresse und gehashtes Passwort</td>
            <td>Kontoauthentifizierung</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Push-Benachrichtigungs-Token</td>
            <td>Zustellung von Benachrichtigungen an das Gerät</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Interne Teilnehmenden-ID (Samply-ID)</td>
            <td>Pseudonymer Bezeichner, der an Umfrage-URLs übergeben wird, damit Forschende Antworten verknüpfen können</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Zeitstempel des Benachrichtigungsempfangs</td>
            <td>Compliance-Tracking — zeichnet auf, wann eine Benachrichtigung gesendet wurde und ob sie geöffnet wurde</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Zeitzonenpräferenz und Ruhezeit-Fenster</td>
            <td>Planung von Benachrichtigungen innerhalb der bevorzugten Zeiten der Teilnehmenden</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>Geostandort (nur bei Geofencing-Studien)</td>
            <td>Auslösen standortbasierter Benachrichtigungen, wenn Teilnehmende ein definiertes Gebiet betreten oder verlassen; nicht an Forschende oder Dritte weitergegeben</td>
            <td>Nur auf dem Gerät — Koordinaten werden auf dem Gerät verarbeitet und nicht an den Server übertragen</td>
          </tr>
          <tr>
            <td>Umfrageantworten</td>
            <td>Nicht zutreffend</td>
            <td>Nein — Antworten gehen direkt an die Umfrageplattform der Forschenden (Qualtrics, LimeSurvey usw.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Von Forschenden erhobene Daten</h2>
      <table>
        <thead>
          <tr>
            <th>Datenelement</th>
            <th>Zweck</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-Mail-Adresse und gehashtes Passwort</td>
            <td>Kontoauthentifizierung</td>
          </tr>
          <tr>
            <td>Studieneinstellungen (Titel, Beschreibung, Zeitplan, Umfrage-URLs)</td>
            <td>Durchführung der Studie</td>
          </tr>
        </tbody>
      </table>

      <h2>Was Samply nicht tut</h2>
      <ul>
        <li>Samply erhebt, speichert oder hat keinen Zugriff auf die Umfrageantworten der Teilnehmenden. Antworten werden direkt vom Browser der Teilnehmenden an das Umfragetool der Forschenden übermittelt.</li>
        <li>Samply erhebt keine Namen, Telefonnummern oder sonstige personenbezogene Freitextinformationen der Teilnehmenden über eine E-Mail-Adresse hinaus.</li>
        <li>Samply gibt Teilnehmendendaten nicht an Dritte, Werbetreibende oder andere Forschende weiter.</li>
        <li>Samply verwendet Teilnehmendendaten ausschließlich zur Zustellung geplanter Benachrichtigungen für die Studie, der die Teilnehmenden beigetreten sind.</li>
        <li>Samply speichert keine GPS-Koordinaten auf seinen Servern. Geofence-Berechnungen laufen auf dem Gerät der Teilnehmenden.</li>
      </ul>

      <h2>Pseudonymität der Teilnehmenden</h2>
      <p>
        Jeder teilnehmenden Person wird eine interne Samply-ID zugewiesen — eine zufällige
        alphanumerische Zeichenfolge. Diese ID wird an die Umfrage-URL angehängt, wenn
        Teilnehmende auf eine Benachrichtigung tippen (z. B.{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). Forschende erhalten diese ID in
        ihren Umfragedaten und können sie verwenden, um Umfrageantworten über mehrere Zeitpunkte
        hinweg zu verknüpfen, ohne die E-Mail-Adresse der Teilnehmenden zu kennen.
      </p>
      <p>
        Forschende sehen keine E-Mail-Adressen der Teilnehmenden im Samply-Dashboard. Die
        Verknüpfung zwischen einer E-Mail-Adresse und einer Samply-ID existiert nur in der
        Samply-Datenbank und wird nicht exportiert.
      </p>

      <h2>Rechte der Teilnehmenden</h2>
      <ul>
        <li><strong>Rückzug:</strong> Teilnehmende können eine Studie jederzeit über die App verlassen. Das Verlassen stoppt alle zukünftigen Benachrichtigungen sofort.</li>
        <li><strong>Kontolöschung:</strong> Teilnehmende können ihr Konto über die App-Einstellungen löschen. Dadurch werden ihre E-Mail-Adresse, Samply-ID, Push-Token und alle zugehörigen Einträge dauerhaft aus der Samply-Datenbank entfernt. Die Löschung kann nicht rückgängig gemacht werden.</li>
        <li><strong>Datenzugang:</strong> Teilnehmende können eine Kopie ihrer Daten anfordern, indem sie <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a> kontaktieren.</li>
      </ul>

      <h2>Datenspeicherung und Sicherheit</h2>
      <ul>
        <li>Die Samply-Plattform wird von der iScience Research Group an der Universität Konstanz, Deutschland, betrieben.</li>
        <li>Daten werden auf Servern der Universität Konstanz gespeichert.</li>
        <li>Passwörter werden als bcrypt-Hashes gespeichert und niemals im Klartext gespeichert oder übertragen.</li>
        <li>Die gesamte Kommunikation zwischen App, Website und Server erfolgt über HTTPS/TLS-Verschlüsselung.</li>
        <li>Push-Benachrichtigungen werden über den Apple Push Notification Service (APNS) und Google Firebase Cloud Messaging (FCM) zugestellt. Die Benachrichtigungsnutzlast enthält nur den Studientitel und einen vom Forschenden festgelegten Aufforderungstext — keine personenbezogenen Daten.</li>
      </ul>

      <h2>Aufbewahrung</h2>
      <p>
        Teilnehmendendaten werden für die Dauer der Studie und bis zur Kontolöschung durch die
        Teilnehmenden aufbewahrt. Forschende können einzelne Teilnehmendendatensätze oder alle
        Studiendaten jederzeit über das Dashboard löschen. Es gibt keinen automatischen
        Löschplan.
      </p>

      <h2>Vorgeschlagene IRB-Beschreibung</h2>
      <p>
        Der folgende Abschnitt kann für einen Ethikantrag oder eine Einwilligungserklärung
        angepasst werden:
      </p>
      <blockquote>
        <p>
          Benachrichtigungen werden über die Samply Research App (samply.uni-konstanz.de)
          zugestellt, die von der iScience Research Group an der Universität Konstanz,
          Deutschland, entwickelt und betrieben wird. Samply speichert Ihre E-Mail-Adresse,
          einen Push-Benachrichtigungs-Token und eine pseudonyme Teilnehmenden-ID zum Zweck
          der Zustellung geplanter Benachrichtigungen. Samply erhebt keine Ihre Umfrageantworten;
          diese werden direkt an [Name der Umfrageplattform] übermittelt. Sie können die Studie
          jederzeit verlassen und Ihr Samply-Konto über die App löschen. Bei Fragen zum
          Datenschutz wenden Sie sich an yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Fragen</h2>
      <p>
        Falls Ihr IRB oder Ihre Datenschutzbehörde spezifische Fragen hat, die hier nicht
        beantwortet werden, schreiben Sie bitte an{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Wir stellen gerne
        zusätzliche Unterlagen zur Verfügung oder sprechen direkt mit Ihrer Ethikkommission.
      </p>
    </>
  );
}

function IrbContentRu() {
  return (
    <>
      <p>
        Этот документ предназначен для исследователей, которым необходимо описать Samply
        Институциональному комитету по проверке (IRB), этической комиссии или специалисту по
        защите данных. В нём рассматривается, какие данные собирает Samply, куда они
        направляются и как защищаются — простым языком, без юридических шаблонов.
      </p>
      <p><strong>Последнее обновление:</strong> май 2025</p>
      <p><strong>Контакт:</strong>{' '}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {' '}— Юрий Шевченко, исследовательская группа iScience, Университет Констанца, Германия.
      </p>

      <h2>Что такое Samply</h2>
      <p>
        Samply — платформа для планирования уведомлений в исследованиях методом опыта выборки и
        дневниковых исследованиях. Исследователи настраивают расписания уведомлений на сайте Samply.
        Участники устанавливают приложение Samply Research на телефон, вступают в исследование и
        получают push-уведомления в установленное исследователем время. Нажатие на уведомление
        открывает внешнюю ссылку на анкету исследователя — Samply не хранит и не собирает ответы
        на анкеты.
      </p>

      <h2>Данные, собираемые от участников</h2>
      <table>
        <thead>
          <tr>
            <th>Элемент данных</th>
            <th>Назначение</th>
            <th>Хранится в Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Адрес электронной почты и хешированный пароль</td>
            <td>Аутентификация в аккаунте</td>
            <td>Да</td>
          </tr>
          <tr>
            <td>Токен push-уведомлений</td>
            <td>Доставка уведомлений на устройство</td>
            <td>Да</td>
          </tr>
          <tr>
            <td>Внутренний идентификатор участника (Samply ID)</td>
            <td>Псевдонимный идентификатор, передаваемый в URL-адреса анкет, чтобы исследователи могли связывать ответы</td>
            <td>Да</td>
          </tr>
          <tr>
            <td>Временная метка получения уведомления</td>
            <td>Отслеживание отклика — фиксирует, когда было отправлено уведомление и было ли оно открыто</td>
            <td>Да</td>
          </tr>
          <tr>
            <td>Предпочтительный часовой пояс и тихие часы</td>
            <td>Планирование уведомлений в предпочтительное для участника время</td>
            <td>Да</td>
          </tr>
          <tr>
            <td>Геолокация (только для исследований с геозонами)</td>
            <td>Запуск уведомлений по местоположению при входе или выходе участника из заданной зоны; не передаётся исследователям или третьим лицам</td>
            <td>Только на устройстве — координаты обрабатываются на устройстве и не передаются на сервер</td>
          </tr>
          <tr>
            <td>Ответы на анкеты</td>
            <td>Не применимо</td>
            <td>Нет — ответы направляются непосредственно на платформу анкетирования исследователя (Qualtrics, LimeSurvey и др.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Данные, собираемые от исследователей</h2>
      <table>
        <thead>
          <tr>
            <th>Элемент данных</th>
            <th>Назначение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Адрес электронной почты и хешированный пароль</td>
            <td>Аутентификация в аккаунте</td>
          </tr>
          <tr>
            <td>Конфигурация исследования (название, описание, расписание, URL-адреса анкет)</td>
            <td>Проведение исследования</td>
          </tr>
        </tbody>
      </table>

      <h2>Чего Samply не делает</h2>
      <ul>
        <li>Samply не собирает, не хранит и не имеет доступа к ответам участников на анкеты. Ответы отправляются непосредственно из браузера участника на инструмент анкетирования исследователя.</li>
        <li>Samply не собирает имена, номера телефонов или любые другие персональные текстовые данные участников, кроме адреса электронной почты.</li>
        <li>Samply не передаёт данные участников третьим лицам, рекламодателям или другим исследователям.</li>
        <li>Samply не использует данные участников ни для каких целей, кроме доставки запланированных уведомлений в рамках исследования, к которому присоединился участник.</li>
        <li>Samply не хранит GPS-координаты на своих серверах. Расчёты геозон выполняются на устройстве участника.</li>
      </ul>

      <h2>Псевдонимность участников</h2>
      <p>
        Каждому участнику присваивается внутренний Samply ID — случайная буквенно-цифровая строка.
        Этот ID добавляется к URL-адресу анкеты, когда участник нажимает на уведомление (например,{' '}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). Исследователь получает этот ID в данных
        анкеты и может использовать его для связи ответов участника в разных временных точках, не зная
        адрес его электронной почты.
      </p>
      <p>
        Исследователи не видят адреса электронной почты участников в панели Samply. Связь между
        адресом электронной почты и Samply ID существует только в базе данных Samply и не экспортируется.
      </p>

      <h2>Права участников</h2>
      <ul>
        <li><strong>Выход:</strong> Участники могут покинуть исследование в любое время через приложение. Выход немедленно прекращает все будущие уведомления.</li>
        <li><strong>Удаление аккаунта:</strong> Участники могут удалить свой аккаунт в настройках приложения. Это навсегда удаляет их адрес электронной почты, Samply ID, токен push-уведомлений и все связанные записи из базы данных Samply. Удаление не может быть отменено.</li>
        <li><strong>Доступ к данным:</strong> Участники могут запросить копию своих данных, связавшись с <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Хранение данных и безопасность</h2>
      <ul>
        <li>Платформа Samply управляется исследовательской группой iScience Университета Констанца, Германия.</li>
        <li>Данные хранятся на серверах Университета Констанца.</li>
        <li>Пароли хранятся в виде bcrypt-хешей и никогда не хранятся и не передаются в открытом виде.</li>
        <li>Все коммуникации между приложением, веб-сайтом и сервером защищены шифрованием HTTPS/TLS.</li>
        <li>Push-уведомления доставляются через Apple Push Notification Service (APNS) и Google Firebase Cloud Messaging (FCM). Полезная нагрузка уведомления содержит только название исследования и текст подсказки, заданный исследователем — никаких личных данных.</li>
      </ul>

      <h2>Хранение данных</h2>
      <p>
        Данные участников хранятся в течение срока исследования и до момента удаления аккаунта
        участником. Исследователи могут удалить отдельные записи участников или все данные
        исследования в любое время через панель управления. Автоматического расписания удаления нет.
      </p>

      <h2>Рекомендуемое описание для IRB</h2>
      <p>
        Следующий абзац можно адаптировать для использования в заявке на этическую экспертизу
        или форме согласия:
      </p>
      <blockquote>
        <p>
          Уведомления будут доставляться через приложение Samply Research (samply.uni-konstanz.de),
          разработанное и эксплуатируемое исследовательской группой iScience Университета Констанца,
          Германия. Samply будет хранить ваш адрес электронной почты, токен push-уведомлений и
          псевдонимный идентификатор участника в целях доставки запланированных уведомлений.
          Samply не собирает ваши ответы на анкеты; они отправляются непосредственно на
          [название платформы анкетирования]. Вы можете выйти из исследования и удалить свой
          аккаунт Samply в любое время через приложение. По вопросам защиты данных обращайтесь:
          yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Вопросы</h2>
      <p>
        Если ваш IRB или специалист по защите данных имеет конкретные вопросы, не освещённые здесь,
        пожалуйста, напишите на{' '}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Мы готовы предоставить
        дополнительную документацию или напрямую пообщаться с вашим специалистом по этике.
      </p>
    </>
  );
}

function IrbContentZh() {
  return (
    <>
      <p>
        本文档面向需要向机构审查委员会（IRB）、伦理委员会或数据保护官员介绍 Samply 的研究者。它以简明语言（无法律套话）说明 Samply 收集哪些数据、数据流向何处以及如何加以保护。
      </p>
      <p><strong>最后更新：</strong>2025年5月</p>
      <p><strong>联系方式：</strong>{' '}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {' '}— Yury Shevchenko，iScience 研究组，康斯坦茨大学，德国。
      </p>

      <h2>Samply 是什么</h2>
      <p>
        Samply 是一个面向经验采样和日记研究的通知计划平台。研究者在 Samply 网站上配置通知计划。参与者在手机上安装 Samply Research 应用，加入研究，并在研究者设定的时间收到推送通知。点击通知会打开研究者的外部问卷链接——Samply 不托管也不收集问卷回答。
      </p>

      <h2>从参与者处收集的数据</h2>
      <table>
        <thead>
          <tr>
            <th>数据项</th>
            <th>用途</th>
            <th>由 Samply 存储</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>电子邮件地址和哈希密码</td>
            <td>账户认证</td>
            <td>是</td>
          </tr>
          <tr>
            <td>推送通知令牌</td>
            <td>向设备发送通知</td>
            <td>是</td>
          </tr>
          <tr>
            <td>内部参与者 ID（Samply ID）</td>
            <td>传递给问卷 URL 的假名标识符，使研究者能够关联回答</td>
            <td>是</td>
          </tr>
          <tr>
            <td>通知接收时间戳</td>
            <td>应答率追踪——记录通知发送时间及是否被打开</td>
            <td>是</td>
          </tr>
          <tr>
            <td>时区偏好和静默时段</td>
            <td>在参与者偏好的时间内安排通知</td>
            <td>是</td>
          </tr>
          <tr>
            <td>地理位置（仅限地理围栏研究）</td>
            <td>在参与者进入或离开定义区域时触发基于位置的通知；不与研究者或第三方共享</td>
            <td>仅设备端——坐标在设备上处理，不传输到服务器</td>
          </tr>
          <tr>
            <td>问卷回答</td>
            <td>不适用</td>
            <td>否——回答直接发送到研究者的问卷平台（Qualtrics、LimeSurvey 等）</td>
          </tr>
        </tbody>
      </table>

      <h2>从研究者处收集的数据</h2>
      <table>
        <thead>
          <tr>
            <th>数据项</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>电子邮件地址和哈希密码</td>
            <td>账户认证</td>
          </tr>
          <tr>
            <td>研究配置（标题、描述、计划、问卷 URL）</td>
            <td>运行研究</td>
          </tr>
        </tbody>
      </table>

      <h2>Samply 不做的事</h2>
      <ul>
        <li>Samply 不收集、不存储，也不访问参与者的问卷回答。回答从参与者的浏览器直接发送到研究者的问卷工具。</li>
        <li>Samply 不收集参与者的姓名、电话号码或除电子邮件地址之外的任何自由文本个人信息。</li>
        <li>Samply 不与第三方、广告商或其他研究者共享参与者数据。</li>
        <li>Samply 仅将参与者数据用于为参与者加入的研究发送计划通知，不用于任何其他目的。</li>
        <li>Samply 不在服务器上存储 GPS 坐标。地理围栏计算在参与者设备上运行。</li>
      </ul>

      <h2>参与者假名性</h2>
      <p>
        每位参与者被分配一个内部 Samply ID——一个随机字母数字字符串。当参与者点击通知时，该 ID 会附加到问卷 URL 中（例如，<code>https://your-survey.com/?pid=a3f9b2c1</code>）。研究者在其问卷数据中收到该 ID，可以在不知道参与者电子邮件地址的情况下，跨时间点关联问卷回答。
      </p>
      <p>
        研究者无法在 Samply 控制台中看到参与者的电子邮件地址。电子邮件地址与 Samply ID 之间的关联仅存在于 Samply 数据库中，不会被导出。
      </p>

      <h2>参与者权利</h2>
      <ul>
        <li><strong>退出：</strong>参与者可以随时通过应用退出研究。退出会立即停止所有未来通知。</li>
        <li><strong>账户删除：</strong>参与者可以在应用设置中删除其账户。这将从 Samply 数据库中永久删除其电子邮件地址、Samply ID、推送令牌和所有相关记录。删除无法撤销。</li>
        <li><strong>数据访问：</strong>参与者可通过联系 <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a> 请求其数据副本。</li>
      </ul>

      <h2>数据存储与安全</h2>
      <ul>
        <li>Samply 平台由康斯坦茨大学 iScience 研究组（德国）运营。</li>
        <li>数据存储在康斯坦茨大学运营的服务器上。</li>
        <li>密码以 bcrypt 哈希形式存储，从不以明文存储或传输。</li>
        <li>应用、网站与服务器之间的所有通信均使用 HTTPS/TLS 加密。</li>
        <li>推送通知通过 Apple Push Notification Service（APNS）和 Google Firebase Cloud Messaging（FCM）发送。通知载荷仅包含研究标题和研究者设定的提示文本——不包含个人数据。</li>
      </ul>

      <h2>数据保留</h2>
      <p>
        参与者数据在研究期间保留，直到参与者删除其账户。研究者可随时通过控制台删除单个参与者记录或所有研究数据。没有自动删除计划。
      </p>

      <h2>建议的 IRB 描述</h2>
      <p>
        以下段落可用于伦理申请或知情同意书：
      </p>
      <blockquote>
        <p>
          通知将通过 Samply Research 应用（samply.uni-konstanz.de）发送，该应用由康斯坦茨大学（德国）iScience 研究组开发和运营。Samply 将存储您的电子邮件地址、推送通知令牌和假名参与者 ID，用于发送计划通知。Samply 不收集您的问卷回答；这些回答直接提交至【问卷平台名称】。您可随时通过应用退出研究并删除您的 Samply 账户。如有数据保护问题，请联系 yury.shevchenko@uni.kn。
        </p>
      </blockquote>

      <h2>问题</h2>
      <p>
        如果您的 IRB 或数据保护机构有此处未解答的具体问题，请发送邮件至 <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>。我们很乐意提供额外文件或直接与您的伦理审查员沟通。
      </p>
    </>
  );
}

function IrbContentKo() {
  return (
    <>
      <p>
        본 문서는 기관심사위원회(IRB), 윤리위원회 또는 개인정보 보호책임자에게 Samply를 설명해야 하는
        연구자를 위해 작성되었습니다. 법적 상투어 없이 평이한 언어로 Samply가 수집하는 데이터, 데이터의
        흐름, 그리고 데이터 보호 방식을 설명합니다.
      </p>
      <p><strong>최종 업데이트:</strong> 2025년 5월</p>
      <p><strong>연락처:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, iScience Research Group, University of Konstanz, 독일.
      </p>

      <h2>Samply란</h2>
      <p>
        Samply는 경험 표집법(experience-sampling) 및 일기식 연구를 위한 알림 스케줄링 플랫폼입니다.
        연구자는 Samply 웹사이트에서 알림 일정을 구성합니다. 참여자는 스마트폰에 Samply Research 앱을
        설치하고 연구에 참여하여, 연구자가 설정한 시간에 푸시 알림을 수신합니다. 알림을 탭하면 연구자의
        외부 설문 링크가 열립니다. Samply는 설문 응답을 호스팅하거나 수집하지 않습니다.
      </p>

      <h2>참여자로부터 수집하는 데이터</h2>
      <table>
        <thead>
          <tr>
            <th>데이터 항목</th>
            <th>목적</th>
            <th>Samply 저장 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이메일 주소 및 해시 처리된 비밀번호</td>
            <td>계정 인증</td>
            <td>예</td>
          </tr>
          <tr>
            <td>푸시 알림 토큰</td>
            <td>기기에 알림 전달</td>
            <td>예</td>
          </tr>
          <tr>
            <td>내부 참여자 ID (Samply ID)</td>
            <td>연구자가 응답을 연결할 수 있도록 설문 URL에 전달되는 가명 식별자</td>
            <td>예</td>
          </tr>
          <tr>
            <td>알림 수신 타임스탬프</td>
            <td>컴플라이언스 추적 — 알림 발송 시각 및 열람 여부 기록</td>
            <td>예</td>
          </tr>
          <tr>
            <td>시간대 기본 설정 및 방해 금지 시간 창</td>
            <td>참여자의 선호 시간 내에 알림 스케줄링</td>
            <td>예</td>
          </tr>
          <tr>
            <td>위치 정보 (지오펜싱 연구에만 해당)</td>
            <td>참여자가 지정된 구역에 진입하거나 이탈할 때 위치 기반 알림 발송; 연구자 또는 제3자와 공유하지 않음</td>
            <td>기기 전용 — 좌표는 기기에서 처리되며 서버로 전송되지 않음</td>
          </tr>
          <tr>
            <td>설문 응답</td>
            <td>해당 없음</td>
            <td>아니오 — 응답은 연구자의 설문 플랫폼(Qualtrics, LimeSurvey 등)으로 직접 전송됨</td>
          </tr>
        </tbody>
      </table>

      <h2>연구자로부터 수집하는 데이터</h2>
      <table>
        <thead>
          <tr>
            <th>데이터 항목</th>
            <th>목적</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이메일 주소 및 해시 처리된 비밀번호</td>
            <td>계정 인증</td>
          </tr>
          <tr>
            <td>연구 구성 정보 (제목, 설명, 일정, 설문 URL)</td>
            <td>연구 운영</td>
          </tr>
        </tbody>
      </table>

      <h2>Samply가 하지 않는 것</h2>
      <ul>
        <li>Samply는 참여자의 설문 응답을 수집·저장하거나 접근하지 않습니다. 응답은 참여자의 브라우저에서 연구자의 설문 도구로 직접 전송됩니다.</li>
        <li>Samply는 이메일 주소 외에 참여자의 이름, 전화번호 또는 기타 자유 형식 개인 정보를 수집하지 않습니다.</li>
        <li>Samply는 참여자 데이터를 제3자, 광고주 또는 다른 연구자와 공유하지 않습니다.</li>
        <li>Samply는 참여자가 참여한 연구의 예정된 알림을 전달하는 목적 외에 참여자 데이터를 사용하지 않습니다.</li>
        <li>Samply는 서버에 GPS 좌표를 저장하지 않습니다. 지오펜스 계산은 참여자의 기기에서 실행됩니다.</li>
      </ul>

      <h2>참여자 가명성</h2>
      <p>
        각 참여자에게는 내부 Samply ID — 무작위 영숫자 문자열 — 가 부여됩니다. 이 ID는 참여자가
        알림을 탭할 때 설문 URL에 추가됩니다(예:{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). 연구자는 설문 데이터에서 이 ID를
        수신하며, 참여자의 이메일 주소를 알지 못해도 시점별 설문 응답을 연결하는 데 사용할 수 있습니다.
      </p>
      <p>
        연구자는 Samply 대시보드에서 참여자의 이메일 주소를 볼 수 없습니다. 이메일 주소와 Samply ID
        간의 연결은 Samply 데이터베이스 내에만 존재하며 내보내기가 불가능합니다.
      </p>

      <h2>참여자 권리</h2>
      <ul>
        <li><strong>철회:</strong> 참여자는 언제든지 앱에서 연구를 탈퇴할 수 있습니다. 탈퇴하면 모든 향후 알림이 즉시 중단됩니다.</li>
        <li><strong>계정 삭제:</strong> 참여자는 앱 설정에서 계정을 삭제할 수 있습니다. 이 경우 이메일 주소, Samply ID, 푸시 토큰 및 모든 관련 기록이 Samply 데이터베이스에서 영구적으로 삭제됩니다. 삭제는 취소할 수 없습니다.</li>
        <li><strong>데이터 접근:</strong> 참여자는 <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>으로 연락하여 자신의 데이터 사본을 요청할 수 있습니다.</li>
      </ul>

      <h2>데이터 저장 및 보안</h2>
      <ul>
        <li>Samply 플랫폼은 독일 University of Konstanz의 iScience Research Group이 운영합니다.</li>
        <li>데이터는 University of Konstanz가 운영하는 서버에 저장됩니다.</li>
        <li>비밀번호는 bcrypt 해시 형태로 저장되며 평문으로 저장되거나 전송되지 않습니다.</li>
        <li>앱, 웹사이트, 서버 간의 모든 통신은 HTTPS/TLS 암호화를 사용합니다.</li>
        <li>푸시 알림은 Apple Push Notification Service(APNS) 및 Google Firebase Cloud Messaging(FCM)을 통해 전달됩니다. 알림 페이로드에는 연구 제목과 연구자가 설정한 안내 텍스트만 포함되며 개인 데이터는 포함되지 않습니다.</li>
      </ul>

      <h2>데이터 보존</h2>
      <p>
        참여자 데이터는 연구 기간 동안 및 참여자가 계정을 삭제할 때까지 보존됩니다. 연구자는 대시보드에서
        언제든지 개별 참여자 기록 또는 모든 연구 데이터를 삭제할 수 있습니다. 자동 삭제 일정은 없습니다.
      </p>

      <h2>권장 IRB 설명문</h2>
      <p>
        다음 단락은 윤리 심사 신청서 또는 동의서에 맞게 수정하여 사용할 수 있습니다:
      </p>
      <blockquote>
        <p>
          알림은 독일 University of Konstanz의 iScience Research Group이 개발·운영하는 Samply Research
          앱(samply.uni-konstanz.de)을 통해 전달됩니다. Samply는 예정된 알림을 전달하기 위하여 귀하의
          이메일 주소, 푸시 알림 토큰 및 가명 참여자 ID를 저장합니다. Samply는 귀하의 설문 응답을 수집하지
          않으며, 응답은 [설문 플랫폼 이름]으로 직접 전송됩니다. 귀하는 언제든지 앱에서 연구를 탈퇴하고
          Samply 계정을 삭제할 수 있습니다. 개인정보 보호 관련 문의는 yury.shevchenko@uni.kn으로
          연락하시기 바랍니다.
        </p>
      </blockquote>

      <h2>문의</h2>
      <p>
        귀하의 IRB 또는 개인정보 보호 담당 기관에서 여기에 답변되지 않은 구체적인 질문이 있는 경우,{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>으로 문의해 주십시오.
        추가 문서를 제공하거나 윤리 심사 담당자와 직접 소통할 준비가 되어 있습니다.
      </p>
    </>
  );
}

function IrbContentIt() {
  return (
    <>
      <p>
        Il presente documento è rivolto ai ricercatori che devono descrivere Samply a un
        Institutional Review Board (IRB), a un comitato etico o a un responsabile della
        protezione dei dati. Illustra in linguaggio semplice e privo di formule legali
        standardizzate quali dati raccoglie Samply, dove vengono trasferiti e come vengono
        protetti.
      </p>
      <p><strong>Ultimo aggiornamento:</strong> maggio 2025</p>
      <p><strong>Contatto:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, iScience Research Group, University of Konstanz, Germania.
      </p>

      <h2>Che cos&apos;è Samply</h2>
      <p>
        Samply è una piattaforma per la pianificazione di notifiche nell&apos;ambito di studi
        con metodo experience-sampling e studi diaristici. I ricercatori configurano i calendari
        delle notifiche sul sito web di Samply. I partecipanti installano l&apos;app Samply
        Research sul proprio dispositivo, aderiscono a uno studio e ricevono notifiche push negli
        orari stabiliti dal ricercatore. Toccando una notifica si apre il link esterno al
        questionario del ricercatore — Samply non ospita né raccoglie le risposte ai questionari.
      </p>

      <h2>Dati raccolti dai partecipanti</h2>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            <th>Finalità</th>
            <th>Archiviato da Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indirizzo e-mail e password con hash</td>
            <td>Autenticazione dell&apos;account</td>
            <td>Sì</td>
          </tr>
          <tr>
            <td>Token di notifica push</td>
            <td>Recapito delle notifiche al dispositivo</td>
            <td>Sì</td>
          </tr>
          <tr>
            <td>ID interno del partecipante (Samply ID)</td>
            <td>Identificatore pseudonimo trasmesso agli URL dei questionari affinché i ricercatori possano collegare le risposte</td>
            <td>Sì</td>
          </tr>
          <tr>
            <td>Timestamp di ricezione della notifica</td>
            <td>Monitoraggio della conformità — registra quando una notifica è stata inviata e se è stata aperta</td>
            <td>Sì</td>
          </tr>
          <tr>
            <td>Preferenza del fuso orario e finestra di silenzio</td>
            <td>Pianificazione delle notifiche negli orari preferiti dal partecipante</td>
            <td>Sì</td>
          </tr>
          <tr>
            <td>Geolocalizzazione (solo per studi con geofencing)</td>
            <td>Attivazione di notifiche basate sulla posizione quando il partecipante entra o esce da un&apos;area definita; non condivisa con ricercatori o terze parti</td>
            <td>Solo sul dispositivo — le coordinate vengono elaborate localmente e non trasmesse al server</td>
          </tr>
          <tr>
            <td>Risposte ai questionari</td>
            <td>Non applicabile</td>
            <td>No — le risposte vengono inviate direttamente alla piattaforma di questionari del ricercatore (Qualtrics, LimeSurvey, ecc.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Dati raccolti dai ricercatori</h2>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            <th>Finalità</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indirizzo e-mail e password con hash</td>
            <td>Autenticazione dell&apos;account</td>
          </tr>
          <tr>
            <td>Configurazione dello studio (titolo, descrizione, calendario, URL dei questionari)</td>
            <td>Gestione dello studio</td>
          </tr>
        </tbody>
      </table>

      <h2>Cosa non fa Samply</h2>
      <ul>
        <li>Samply non raccoglie, non archivia e non ha accesso alle risposte ai questionari dei partecipanti. Le risposte vengono inviate direttamente dal browser del partecipante allo strumento di questionario del ricercatore.</li>
        <li>Samply non raccoglie nomi, numeri di telefono o qualsiasi altra informazione personale in testo libero dei partecipanti, oltre all&apos;indirizzo e-mail.</li>
        <li>Samply non condivide i dati dei partecipanti con terze parti, inserzionisti o altri ricercatori.</li>
        <li>Samply non utilizza i dati dei partecipanti per scopi diversi dalla consegna delle notifiche programmate per lo studio al quale il partecipante ha aderito.</li>
        <li>Samply non conserva coordinate GPS sui propri server. I calcoli del geofence vengono eseguiti sul dispositivo del partecipante.</li>
      </ul>

      <h2>Pseudonimizzazione dei partecipanti</h2>
      <p>
        A ciascun partecipante viene assegnato un Samply ID interno — una stringa alfanumerica
        casuale. Questo ID viene aggiunto all&apos;URL del questionario quando il partecipante tocca
        una notifica (ad es.,{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). Il ricercatore riceve tale ID nei
        propri dati del questionario e può utilizzarlo per collegare le risposte tra i diversi
        momenti di rilevazione senza conoscere l&apos;indirizzo e-mail del partecipante.
      </p>
      <p>
        I ricercatori non possono visualizzare gli indirizzi e-mail dei partecipanti nella
        dashboard di Samply. Il collegamento tra un indirizzo e-mail e un Samply ID esiste
        esclusivamente nel database di Samply e non viene esportato.
      </p>

      <h2>Diritti dei partecipanti</h2>
      <ul>
        <li><strong>Recesso:</strong> I partecipanti possono abbandonare uno studio in qualsiasi momento tramite l&apos;app. L&apos;abbandono sospende immediatamente tutte le notifiche future.</li>
        <li><strong>Cancellazione dell&apos;account:</strong> I partecipanti possono eliminare il proprio account dalle impostazioni dell&apos;app. Ciò comporta la rimozione permanente dell&apos;indirizzo e-mail, del Samply ID, del token push e di tutti i record associati dal database di Samply. La cancellazione non può essere annullata.</li>
        <li><strong>Accesso ai dati:</strong> I partecipanti possono richiedere una copia dei propri dati contattando <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Archiviazione dei dati e sicurezza</h2>
      <ul>
        <li>La piattaforma Samply è gestita dall&apos;iScience Research Group presso l&apos;University of Konstanz, Germania.</li>
        <li>I dati sono archiviati su server gestiti dall&apos;University of Konstanz.</li>
        <li>Le password sono memorizzate come hash bcrypt e non vengono mai archiviate o trasmesse in chiaro.</li>
        <li>Tutte le comunicazioni tra l&apos;app, il sito web e il server utilizzano la crittografia HTTPS/TLS.</li>
        <li>Le notifiche push vengono consegnate tramite Apple Push Notification Service (APNS) e Google Firebase Cloud Messaging (FCM). Il payload della notifica contiene esclusivamente il titolo dello studio e un testo di sollecito impostato dal ricercatore — nessun dato personale.</li>
      </ul>

      <h2>Conservazione dei dati</h2>
      <p>
        I dati dei partecipanti vengono conservati per la durata dello studio e fino alla
        cancellazione dell&apos;account da parte del partecipante. I ricercatori possono eliminare
        singoli record dei partecipanti o tutti i dati dello studio in qualsiasi momento dalla
        dashboard. Non è prevista alcuna cancellazione automatica programmata.
      </p>

      <h2>Descrizione suggerita per l&apos;IRB</h2>
      <p>
        Il seguente paragrafo può essere adattato per l&apos;utilizzo in una domanda di approvazione
        etica o in un modulo di consenso informato:
      </p>
      <blockquote>
        <p>
          Le notifiche verranno consegnate tramite l&apos;app Samply Research (samply.uni-konstanz.de),
          sviluppata e gestita dall&apos;iScience Research Group dell&apos;University of Konstanz,
          Germania. Samply archivierà il suo indirizzo e-mail, un token di notifica push e un ID
          partecipante pseudonimo al fine di consegnare le notifiche programmate. Samply non raccoglie
          le risposte ai questionari; queste vengono inviate direttamente a [nome della piattaforma di
          questionari]. Lei potrà recedere dallo studio ed eliminare il suo account Samply in qualsiasi
          momento tramite l&apos;app. Per domande relative alla protezione dei dati, si prega di
          contattare yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Domande</h2>
      <p>
        Qualora il suo IRB o il responsabile della protezione dei dati avesse domande specifiche
        non trattate nel presente documento, si prega di scrivere a{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Siamo disponibili a
        fornire documentazione aggiuntiva o a comunicare direttamente con il suo valutatore etico.
      </p>
    </>
  );
}

function IrbContentFr() {
  return (
    <>
      <p>
        Ce document est destiné aux chercheurs qui doivent décrire Samply à un comité
        d&apos;examen institutionnel (IRB), à un comité d&apos;éthique ou à un délégué à la
        protection des données. Il explique en langage simple, sans formules juridiques
        standardisées, quelles données Samply collecte, où elles sont transmises et comment
        elles sont protégées.
      </p>
      <p><strong>Dernière mise à jour :</strong> mai 2025</p>
      <p><strong>Contact :</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, groupe de recherche iScience, Université de Constance, Allemagne.
      </p>

      <h2>Ce qu&apos;est Samply</h2>
      <p>
        Samply est une plateforme de planification de notifications pour les études par
        échantillonnage d&apos;expérience (ESM) et les études de journal. Les chercheurs
        configurent les calendriers de notifications sur le site web de Samply. Les
        participants installent l&apos;application Samply Research sur leur téléphone,
        rejoignent une étude et reçoivent des notifications push aux heures définies par le
        chercheur. En appuyant sur une notification, le lien externe vers le questionnaire
        du chercheur s&apos;ouvre — Samply n&apos;héberge ni ne collecte les réponses aux
        questionnaires.
      </p>

      <h2>Données collectées auprès des participants</h2>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
            <th>Stockée par Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adresse e-mail et mot de passe haché</td>
            <td>Authentification du compte</td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Jeton de notification push</td>
            <td>Envoi des notifications à l&apos;appareil</td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Identifiant interne du participant (Samply ID)</td>
            <td>Identifiant pseudonyme transmis aux URL des questionnaires afin que les chercheurs puissent relier les réponses</td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Horodatage de réception de la notification</td>
            <td>Suivi de conformité — enregistre quand une notification a été envoyée et si elle a été ouverte</td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Préférence de fuseau horaire et plage horaire silencieuse</td>
            <td>Planification des notifications dans les heures préférées du participant</td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Géolocalisation (études avec géofencing uniquement)</td>
            <td>Déclenchement de notifications basées sur la localisation lorsque le participant entre dans une zone définie ou en sort ; non partagée avec les chercheurs ni avec des tiers</td>
            <td>Appareil uniquement — les coordonnées sont traitées sur l&apos;appareil et ne sont pas transmises au serveur</td>
          </tr>
          <tr>
            <td>Réponses aux questionnaires</td>
            <td>Non applicable</td>
            <td>Non — les réponses sont envoyées directement à la plateforme de questionnaires du chercheur (Qualtrics, LimeSurvey, etc.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Données collectées auprès des chercheurs</h2>
      <table>
        <thead>
          <tr>
            <th>Donnée</th>
            <th>Finalité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adresse e-mail et mot de passe haché</td>
            <td>Authentification du compte</td>
          </tr>
          <tr>
            <td>Configuration de l&apos;étude (titre, description, calendrier, URL des questionnaires)</td>
            <td>Gestion de l&apos;étude</td>
          </tr>
        </tbody>
      </table>

      <h2>Ce que Samply ne fait pas</h2>
      <ul>
        <li>Samply ne collecte pas, ne stocke pas et n&apos;a pas accès aux réponses des participants aux questionnaires. Les réponses sont envoyées directement depuis le navigateur du participant vers l&apos;outil de questionnaire du chercheur.</li>
        <li>Samply ne collecte pas les noms, numéros de téléphone ni aucune autre information personnelle en texte libre des participants au-delà de l&apos;adresse e-mail.</li>
        <li>Samply ne partage pas les données des participants avec des tiers, des annonceurs ou d&apos;autres chercheurs.</li>
        <li>Samply n&apos;utilise les données des participants qu&apos;aux fins de l&apos;envoi des notifications planifiées pour l&apos;étude que le participant a rejointe, et à aucune autre fin.</li>
        <li>Samply ne conserve pas les coordonnées GPS sur ses serveurs. Les calculs de géofence sont effectués sur l&apos;appareil du participant.</li>
      </ul>

      <h2>Pseudonymisation des participants</h2>
      <p>
        Chaque participant se voit attribuer un Samply ID interne — une chaîne alphanumérique
        aléatoire. Cet identifiant est ajouté à l&apos;URL du questionnaire lorsque le
        participant appuie sur une notification (par ex.{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). Le chercheur reçoit cet
        identifiant dans ses données de questionnaire et peut l&apos;utiliser pour relier les
        réponses d&apos;un même participant à différents moments de mesure sans connaître son
        adresse e-mail.
      </p>
      <p>
        Les chercheurs ne voient pas les adresses e-mail des participants dans le tableau de
        bord Samply. Le lien entre une adresse e-mail et un Samply ID n&apos;existe que dans
        la base de données Samply et n&apos;est pas exporté.
      </p>

      <h2>Droits des participants</h2>
      <ul>
        <li><strong>Retrait :</strong> Les participants peuvent quitter une étude à tout moment depuis l&apos;application. Le retrait arrête immédiatement toutes les notifications futures.</li>
        <li><strong>Suppression du compte :</strong> Les participants peuvent supprimer leur compte depuis les paramètres de l&apos;application. Cela supprime définitivement de la base de données Samply leur adresse e-mail, leur Samply ID, leur jeton push et tous les enregistrements associés. La suppression est irréversible.</li>
        <li><strong>Accès aux données :</strong> Les participants peuvent demander une copie de leurs données en contactant <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Stockage des données et sécurité</h2>
      <ul>
        <li>La plateforme Samply est exploitée par le groupe de recherche iScience de l&apos;Université de Constance, Allemagne.</li>
        <li>Les données sont stockées sur des serveurs gérés par l&apos;Université de Constance.</li>
        <li>Les mots de passe sont stockés sous forme de hachages bcrypt et ne sont jamais stockés ni transmis en clair.</li>
        <li>Toutes les communications entre l&apos;application, le site web et le serveur utilisent le chiffrement HTTPS/TLS.</li>
        <li>Les notifications push sont transmises via l&apos;Apple Push Notification Service (APNS) et Google Firebase Cloud Messaging (FCM). La charge utile de la notification contient uniquement le titre de l&apos;étude et un texte d&apos;invite défini par le chercheur — aucune donnée personnelle.</li>
      </ul>

      <h2>Conservation des données</h2>
      <p>
        Les données des participants sont conservées pendant la durée de l&apos;étude et
        jusqu&apos;à la suppression du compte par le participant. Les chercheurs peuvent
        supprimer des enregistrements individuels ou l&apos;ensemble des données d&apos;une
        étude à tout moment depuis le tableau de bord. Il n&apos;existe pas de calendrier de
        suppression automatique.
      </p>

      <h2>Description suggérée pour l&apos;IRB</h2>
      <p>
        Le paragraphe suivant peut être adapté pour une demande d&apos;approbation éthique
        ou un formulaire de consentement éclairé :
      </p>
      <blockquote>
        <p>
          Les notifications seront envoyées via l&apos;application Samply Research
          (samply.uni-konstanz.de), développée et exploitée par le groupe de recherche
          iScience de l&apos;Université de Constance, Allemagne. Samply stockera votre
          adresse e-mail, un jeton de notification push et un identifiant pseudonyme de
          participant afin d&apos;envoyer les notifications planifiées. Samply ne collecte
          pas vos réponses aux questionnaires ; celles-ci sont envoyées directement à
          [nom de la plateforme de questionnaires]. Vous pouvez vous retirer de l&apos;étude
          et supprimer votre compte Samply à tout moment depuis l&apos;application. Pour
          toute question relative à la protection des données, veuillez contacter
          yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Questions</h2>
      <p>
        Si votre IRB ou votre délégué à la protection des données a des questions spécifiques
        auxquelles ce document ne répond pas, veuillez écrire à{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Nous sommes
        heureux de fournir une documentation complémentaire ou de communiquer directement avec
        votre évaluateur éthique.
      </p>
    </>
  );
}

function IrbContentEs() {
  return (
    <>
      <p>
        Este documento está dirigido a investigadores que necesitan describir Samply a un
        Comité de Revisión Institucional (IRB), comité de ética o delegado de protección de
        datos. Explica en lenguaje sencillo, sin fórmulas jurídicas estándar, qué datos
        recopila Samply, a dónde van y cómo se protegen.
      </p>
      <p><strong>Última actualización:</strong> mayo de 2025</p>
      <p><strong>Contacto:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, grupo de investigación iScience, Universidad de Constanza, Alemania.
      </p>

      <h2>Qué es Samply</h2>
      <p>
        Samply es una plataforma de programación de notificaciones para estudios de muestreo
        de experiencias (ESM) y estudios de diario. Los investigadores configuran los
        calendarios de notificaciones en el sitio web de Samply. Los participantes instalan
        la aplicación Samply Research en su teléfono, se unen a un estudio y reciben
        notificaciones push en los horarios definidos por el investigador. Al pulsar una
        notificación se abre el enlace externo a la encuesta del investigador — Samply no
        aloja ni recopila las respuestas de las encuestas.
      </p>

      <h2>Datos recopilados de los participantes</h2>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            <th>Finalidad</th>
            <th>Almacenado por Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dirección de correo electrónico y contraseña cifrada</td>
            <td>Autenticación de la cuenta</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Token de notificación push</td>
            <td>Envío de notificaciones al dispositivo</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>ID interno del participante (Samply ID)</td>
            <td>Identificador seudónimo transmitido a las URL de encuestas para que los investigadores puedan vincular las respuestas</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Marca de tiempo de recepción de notificación</td>
            <td>Seguimiento de cumplimiento — registra cuándo se envió una notificación y si fue abierta</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Preferencia de zona horaria y ventana de silencio</td>
            <td>Programación de notificaciones dentro de las horas preferidas del participante</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Geolocalización (solo en estudios con geofencing)</td>
            <td>Activación de notificaciones basadas en la ubicación cuando el participante entra o sale de una zona definida; no se comparte con investigadores ni terceros</td>
            <td>Solo en el dispositivo — las coordenadas se procesan localmente y no se transmiten al servidor</td>
          </tr>
          <tr>
            <td>Respuestas de encuestas</td>
            <td>No aplicable</td>
            <td>No — las respuestas se envían directamente a la plataforma de encuestas del investigador (Qualtrics, LimeSurvey, etc.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Datos recopilados de los investigadores</h2>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            <th>Finalidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dirección de correo electrónico y contraseña cifrada</td>
            <td>Autenticación de la cuenta</td>
          </tr>
          <tr>
            <td>Configuración del estudio (título, descripción, calendario, URL de encuestas)</td>
            <td>Gestión del estudio</td>
          </tr>
        </tbody>
      </table>

      <h2>Lo que Samply no hace</h2>
      <ul>
        <li>Samply no recopila, no almacena ni tiene acceso a las respuestas de los participantes a las encuestas. Las respuestas se envían directamente desde el navegador del participante a la herramienta de encuesta del investigador.</li>
        <li>Samply no recopila nombres, números de teléfono ni ninguna otra información personal en texto libre de los participantes más allá de una dirección de correo electrónico.</li>
        <li>Samply no comparte los datos de los participantes con terceros, anunciantes ni otros investigadores.</li>
        <li>Samply no utiliza los datos de los participantes para ningún fin que no sea la entrega de notificaciones programadas para el estudio al que el participante se ha unido.</li>
        <li>Samply no conserva coordenadas GPS en sus servidores. Los cálculos de geofencing se realizan en el dispositivo del participante.</li>
      </ul>

      <h2>Seudónimato de los participantes</h2>
      <p>
        A cada participante se le asigna un Samply ID interno — una cadena alfanumérica
        aleatoria. Este ID se añade a la URL de la encuesta cuando el participante pulsa una
        notificación (p. ej.,{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). El investigador recibe este ID
        en sus datos de encuesta y puede usarlo para vincular las respuestas de un mismo
        participante en distintos momentos de medición sin conocer su dirección de correo
        electrónico.
      </p>
      <p>
        Los investigadores no ven las direcciones de correo electrónico de los participantes
        en el panel de Samply. El vínculo entre una dirección de correo electrónico y un
        Samply ID existe únicamente en la base de datos de Samply y no se exporta.
      </p>

      <h2>Derechos de los participantes</h2>
      <ul>
        <li><strong>Retirada:</strong> Los participantes pueden abandonar un estudio en cualquier momento desde la aplicación. El abandono detiene inmediatamente todas las notificaciones futuras.</li>
        <li><strong>Eliminación de cuenta:</strong> Los participantes pueden eliminar su cuenta desde la configuración de la aplicación. Esto elimina de forma permanente de la base de datos de Samply su dirección de correo electrónico, Samply ID, token push y todos los registros asociados. La eliminación no puede deshacerse.</li>
        <li><strong>Acceso a los datos:</strong> Los participantes pueden solicitar una copia de sus datos contactando con <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Almacenamiento de datos y seguridad</h2>
      <ul>
        <li>La plataforma Samply es operada por el grupo de investigación iScience de la Universidad de Constanza, Alemania.</li>
        <li>Los datos se almacenan en servidores operados por la Universidad de Constanza.</li>
        <li>Las contraseñas se almacenan como hashes bcrypt y nunca se almacenan ni transmiten en texto claro.</li>
        <li>Todas las comunicaciones entre la aplicación, el sitio web y el servidor utilizan cifrado HTTPS/TLS.</li>
        <li>Las notificaciones push se entregan a través del Apple Push Notification Service (APNS) y Google Firebase Cloud Messaging (FCM). La carga útil de la notificación contiene únicamente el título del estudio y un texto de aviso definido por el investigador — ningún dato personal.</li>
      </ul>

      <h2>Conservación de datos</h2>
      <p>
        Los datos de los participantes se conservan durante la duración del estudio y hasta
        que el participante elimine su cuenta. Los investigadores pueden eliminar registros
        individuales de participantes o todos los datos del estudio en cualquier momento desde
        el panel. No existe ningún calendario de eliminación automática.
      </p>

      <h2>Descripción sugerida para el IRB</h2>
      <p>
        El siguiente párrafo puede adaptarse para su uso en una solicitud de aprobación ética
        o en un formulario de consentimiento informado:
      </p>
      <blockquote>
        <p>
          Las notificaciones se enviarán a través de la aplicación Samply Research
          (samply.uni-konstanz.de), desarrollada y operada por el grupo de investigación
          iScience de la Universidad de Constanza, Alemania. Samply almacenará su dirección
          de correo electrónico, un token de notificación push y un ID seudónimo de
          participante con el fin de enviar las notificaciones programadas. Samply no
          recopila sus respuestas a las encuestas; estas se envían directamente a
          [nombre de la plataforma de encuestas]. Puede retirarse del estudio y eliminar
          su cuenta de Samply en cualquier momento desde la aplicación. Para preguntas
          relacionadas con la protección de datos, contacte con yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Preguntas</h2>
      <p>
        Si su IRB o delegado de protección de datos tiene preguntas específicas no respondidas
        aquí, escríbanos a{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Estamos
        encantados de proporcionar documentación adicional o de comunicarnos directamente con
        su evaluador de ética.
      </p>
    </>
  );
}

function IrbContentPt() {
  return (
    <>
      <p>
        Este documento é destinado a pesquisadores que precisam descrever o Samply a um
        Comitê de Ética em Pesquisa (CEP/IRB), comitê de ética ou encarregado de proteção
        de dados. Explica em linguagem simples, sem fórmulas jurídicas padronizadas, quais
        dados o Samply coleta, para onde vão e como são protegidos.
      </p>
      <p><strong>Última atualização:</strong> maio de 2025</p>
      <p><strong>Contato:</strong>{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>
        {" "}— Yury Shevchenko, grupo de pesquisa iScience, Universidade de Konstanz, Alemanha.
      </p>

      <h2>O que é o Samply</h2>
      <p>
        O Samply é uma plataforma de agendamento de notificações para estudos de amostragem
        de experiências (ESM) e estudos de diário. Os pesquisadores configuram os calendários
        de notificações no site do Samply. Os participantes instalam o aplicativo Samply
        Research no telefone, entram em um estudo e recebem notificações push nos horários
        definidos pelo pesquisador. Tocar em uma notificação abre o link externo da pesquisa
        do pesquisador — o Samply não hospeda nem coleta respostas de pesquisas.
      </p>

      <h2>Dados coletados dos participantes</h2>
      <table>
        <thead>
          <tr>
            <th>Dado</th>
            <th>Finalidade</th>
            <th>Armazenado pelo Samply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Endereço de e-mail e senha com hash</td>
            <td>Autenticação da conta</td>
            <td>Sim</td>
          </tr>
          <tr>
            <td>Token de notificação push</td>
            <td>Entrega de notificações ao dispositivo</td>
            <td>Sim</td>
          </tr>
          <tr>
            <td>ID interno do participante (Samply ID)</td>
            <td>Identificador pseudônimo transmitido às URLs de pesquisa para que os pesquisadores possam vincular as respostas</td>
            <td>Sim</td>
          </tr>
          <tr>
            <td>Carimbo de data/hora do recebimento da notificação</td>
            <td>Rastreamento de conformidade — registra quando uma notificação foi enviada e se foi aberta</td>
            <td>Sim</td>
          </tr>
          <tr>
            <td>Preferência de fuso horário e janela de silêncio</td>
            <td>Agendamento de notificações dentro dos horários preferidos do participante</td>
            <td>Sim</td>
          </tr>
          <tr>
            <td>Geolocalização (apenas em estudos com geofencing)</td>
            <td>Acionamento de notificações baseadas em localização quando o participante entra ou sai de uma área definida; não compartilhada com pesquisadores ou terceiros</td>
            <td>Somente no dispositivo — as coordenadas são processadas localmente e não transmitidas ao servidor</td>
          </tr>
          <tr>
            <td>Respostas de pesquisa</td>
            <td>Não aplicável</td>
            <td>Não — as respostas são enviadas diretamente para a plataforma de pesquisa do pesquisador (Qualtrics, LimeSurvey, etc.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Dados coletados dos pesquisadores</h2>
      <table>
        <thead>
          <tr>
            <th>Dado</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Endereço de e-mail e senha com hash</td>
            <td>Autenticação da conta</td>
          </tr>
          <tr>
            <td>Configuração do estudo (título, descrição, calendário, URLs de pesquisa)</td>
            <td>Gestão do estudo</td>
          </tr>
        </tbody>
      </table>

      <h2>O que o Samply não faz</h2>
      <ul>
        <li>O Samply não coleta, não armazena nem tem acesso às respostas de pesquisa dos participantes. As respostas são enviadas diretamente do navegador do participante para a ferramenta de pesquisa do pesquisador.</li>
        <li>O Samply não coleta nomes, números de telefone nem qualquer outra informação pessoal em texto livre dos participantes além de um endereço de e-mail.</li>
        <li>O Samply não compartilha dados dos participantes com terceiros, anunciantes ou outros pesquisadores.</li>
        <li>O Samply não utiliza dados dos participantes para qualquer finalidade que não seja a entrega de notificações agendadas para o estudo ao qual o participante ingressou.</li>
        <li>O Samply não retém coordenadas GPS em seus servidores. Os cálculos de geofencing são realizados no dispositivo do participante.</li>
      </ul>

      <h2>Pseudonimato dos participantes</h2>
      <p>
        A cada participante é atribuído um Samply ID interno — uma string alfanumérica
        aleatória. Esse ID é adicionado à URL da pesquisa quando o participante toca em uma
        notificação (por ex.,{" "}
        <code>https://your-survey.com/?pid=a3f9b2c1</code>). O pesquisador recebe esse ID
        nos dados da pesquisa e pode usá-lo para vincular as respostas de um mesmo
        participante em diferentes momentos de medição sem conhecer o endereço de e-mail do
        participante.
      </p>
      <p>
        Os pesquisadores não veem os endereços de e-mail dos participantes no painel do
        Samply. O vínculo entre um endereço de e-mail e um Samply ID existe apenas no banco
        de dados do Samply e não é exportado.
      </p>

      <h2>Direitos dos participantes</h2>
      <ul>
        <li><strong>Retirada:</strong> Os participantes podem sair de um estudo a qualquer momento pelo aplicativo. A saída interrompe imediatamente todas as notificações futuras.</li>
        <li><strong>Exclusão de conta:</strong> Os participantes podem excluir sua conta nas configurações do aplicativo. Isso remove permanentemente do banco de dados do Samply o endereço de e-mail, o Samply ID, o token push e todos os registros associados. A exclusão não pode ser desfeita.</li>
        <li><strong>Acesso aos dados:</strong> Os participantes podem solicitar uma cópia de seus dados entrando em contato com <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.</li>
      </ul>

      <h2>Armazenamento de dados e segurança</h2>
      <ul>
        <li>A plataforma Samply é operada pelo grupo de pesquisa iScience da Universidade de Konstanz, Alemanha.</li>
        <li>Os dados são armazenados em servidores operados pela Universidade de Konstanz.</li>
        <li>As senhas são armazenadas como hashes bcrypt e nunca são armazenadas ou transmitidas em texto simples.</li>
        <li>Todas as comunicações entre o aplicativo, o site e o servidor utilizam criptografia HTTPS/TLS.</li>
        <li>As notificações push são entregues por meio do Apple Push Notification Service (APNS) e do Google Firebase Cloud Messaging (FCM). O payload da notificação contém apenas o título do estudo e um texto de aviso definido pelo pesquisador — nenhum dado pessoal.</li>
      </ul>

      <h2>Retenção de dados</h2>
      <p>
        Os dados dos participantes são retidos durante a duração do estudo e até que o
        participante exclua sua conta. Os pesquisadores podem excluir registros individuais
        de participantes ou todos os dados do estudo a qualquer momento pelo painel. Não há
        nenhum cronograma de exclusão automática.
      </p>

      <h2>Descrição sugerida para o CEP/IRB</h2>
      <p>
        O parágrafo a seguir pode ser adaptado para uso em uma solicitação de aprovação ética
        ou em um formulário de consentimento informado:
      </p>
      <blockquote>
        <p>
          As notificações serão entregues por meio do aplicativo Samply Research
          (samply.uni-konstanz.de), desenvolvido e operado pelo grupo de pesquisa iScience
          da Universidade de Konstanz, Alemanha. O Samply armazenará seu endereço de e-mail,
          um token de notificação push e um ID pseudônimo de participante com a finalidade
          de entregar as notificações agendadas. O Samply não coleta suas respostas de
          pesquisa; essas respostas são enviadas diretamente para [nome da plataforma de
          pesquisa]. Você pode se retirar do estudo e excluir sua conta Samply a qualquer
          momento pelo aplicativo. Para perguntas relacionadas à proteção de dados, entre em
          contato com yury.shevchenko@uni.kn.
        </p>
      </blockquote>

      <h2>Perguntas</h2>
      <p>
        Se o seu CEP/IRB ou encarregado de proteção de dados tiver perguntas específicas não
        respondidas aqui, escreva para{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Temos prazer em
        fornecer documentação adicional ou conversar diretamente com seu avaliador de ética.
      </p>
    </>
  );
}
