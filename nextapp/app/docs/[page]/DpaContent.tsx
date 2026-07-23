import type { Locale } from "@/lib/i18n";

/**
 * Data Processing Agreement (GDPR Art. 28) — researcher (controller) ↔ Samply /
 * University of Konstanz (processor). English is the authoritative version.
 *
 * NOTE: this is a template to support Art. 28 compliance; it must be reviewed by
 * the controller's DPO / legal counsel before it is relied upon or executed.
 *
 * Localized variants below mirror the PolicyContent.tsx pattern. English (DpaContentEn)
 * is the authoritative text; the translated variants are drafts and should each be
 * reviewed by a native-speaking DPO / legal counsel before being relied upon.
 */
export default function DpaContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <DpaContentDe />;
  if (locale === "nl") return <DpaContentNl />;
  if (locale === "ru") return <DpaContentRu />;
  if (locale === "zh") return <DpaContentZh />;
  if (locale === "ko") return <DpaContentKo />;
  if (locale === "it") return <DpaContentIt />;
  if (locale === "fr") return <DpaContentFr />;
  if (locale === "es") return <DpaContentEs />;
  if (locale === "pt") return <DpaContentPt />;
  if (locale === "ja") return <DpaContentJa />;
  if (locale === "ar") return <DpaContentAr />;
  if (locale === "pl") return <DpaContentPl />;
  if (locale === "tr") return <DpaContentTr />;
  return <DpaContentEn />;
}

function DpaContentEn() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Template — review required.</strong> This Data Processing Agreement (DPA) is
        provided to help researchers meet their obligations under Article 28 GDPR. It should be
        reviewed by your institution&rsquo;s data protection officer or legal counsel before being
        relied upon or executed. To request a counter-signed copy for your institution, contact{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Last update:</strong> 18 June 2026</p>

      <h2>1. Parties and roles</h2>
      <p>
        This DPA governs the processing of personal data carried out by Samply on behalf of the
        researcher who creates and runs a study (&quot;the Study&quot;).
      </p>
      <ul>
        <li>
          <strong>Controller:</strong> the researcher and/or their institution, who determines the
          purposes and means of processing the personal data collected through their Study.
        </li>
        <li>
          <strong>Processor:</strong> the iScience research group, University of Konstanz,
          Universitätsstraße 10, 78464 Konstanz, Germany, operating the Samply platform
          (&quot;Samply&quot;), which processes personal data on the Controller&rsquo;s documented
          instructions.
        </li>
      </ul>
      <p>
        For Samply&rsquo;s own account and operational data (researcher accounts, billing), Samply
        acts as an independent controller as described in the <a href="/docs/policy">Privacy Policy</a>.
      </p>

      <h2>2. Subject matter, nature and purpose of processing</h2>
      <p>
        Samply processes personal data solely to provide the Service: scheduling and delivering
        notifications to Study participants, recording participants&rsquo; responses and
        notification events, and making the resulting data available to the Controller. Processing
        lasts for the duration of the Study and the retention periods set out in the{" "}
        <a href="/docs/policy">Privacy Policy</a>, unless the Controller deletes the data sooner.
      </p>

      <h2>3. Categories of data subjects and personal data</h2>
      <ul>
        <li><strong>Data subjects:</strong> Study participants; the Controller and any collaborators.</li>
        <li>
          <strong>Personal data:</strong> pseudonymous participant identifier (Samply ID), account
          email and (optionally) name, device push token, language and timezone, notification
          delivery and interaction events, survey/response metadata, optional participant code and
          group, location/geofencing events where the Study enables them, and payment data where
          compensation is configured.
        </li>
        <li>
          <strong>Special-category data:</strong> not collected by the platform itself. The
          Controller is responsible for any special-category data gathered via linked external
          surveys.
        </li>
      </ul>

      <h2>4. Obligations of the processor (Art. 28(3))</h2>
      <ul>
        <li><strong>Documented instructions.</strong> Samply processes participant personal data only on the Controller&rsquo;s documented instructions, including the configuration of the Study, unless required otherwise by EU or Member State law.</li>
        <li><strong>Confidentiality.</strong> Persons authorised to process the data are bound by confidentiality.</li>
        <li><strong>Security.</strong> Samply implements appropriate technical and organisational measures pursuant to Art. 32 (see Section 6).</li>
        <li><strong>Sub-processors.</strong> Samply engages the sub-processors listed in Section 7 and imposes equivalent data-protection obligations on them. Samply will inform the Controller of intended changes and give the Controller the opportunity to object.</li>
        <li><strong>Assistance with data-subject rights.</strong> Taking into account the nature of the processing, Samply assists the Controller with appropriate measures to respond to requests under Chapter III GDPR (access, rectification, erasure, portability, objection). Participants can also export their own data and delete their account directly in the Service.</li>
        <li><strong>Assistance with Arts. 32–36.</strong> Samply assists the Controller in ensuring security of processing, breach notification, and data protection impact assessments.</li>
        <li><strong>Deletion or return.</strong> On termination of the Service or on the Controller&rsquo;s instruction, Samply deletes or returns the personal data. Deleting a Study removes its responses, queued and scheduled notifications, job records, and consent records; see &quot;Erasure of studies and accounts&quot; in the <a href="/docs/policy">Privacy Policy</a>.</li>
        <li><strong>Audits.</strong> Samply makes available the information necessary to demonstrate compliance with Art. 28 and allows for and contributes to audits, including inspections, conducted by the Controller or an auditor it mandates.</li>
      </ul>

      <h2>5. Controller obligations</h2>
      <p>
        The Controller is responsible for establishing a lawful basis for the Study (including
        participant consent and ethics/IRB approval where required), for the lawfulness of its
        instructions, and for the content of any external survey it links to. The Controller must
        not enter special-category or directly identifying data into free-text fields unless it has
        a lawful basis and appropriate safeguards.
      </p>

      <h2>6. Technical and organisational measures (Art. 32)</h2>
      <ul>
        <li>Encryption of data in transit (TLS); access restricted to authenticated, role-checked accounts.</li>
        <li>Participant research data is keyed by a pseudonymous Samply ID; contact details are not shown to researchers except where a participant opts into payments.</li>
        <li>Passwords are stored hashed (bcrypt); session and API tokens are time-limited.</li>
        <li>Access to participant data and exports is recorded in an internal audit log.</li>
        <li>Configurable retention with automatic deletion after the periods stated in the Privacy Policy.</li>
        <li>Regular review of the measures; the Controller acknowledges these may be updated to maintain an appropriate level of security.</li>
      </ul>

      <h2>7. Sub-processors</h2>
      <p>
        Samply uses the following sub-processors. The current, maintained list (with the data shared
        and the transfer mechanism for each) is kept in the project&rsquo;s sub-processor register.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — database hosting.</li>
        <li><strong>Postmark</strong> — transactional and notification email.</li>
        <li><strong>Stripe</strong> — participant compensation / payouts (only when enabled).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — push-notification delivery.</li>
        <li><strong>Cloudflare Turnstile</strong> — bot protection at sign-up.</li>
        <li><strong>University of Konstanz</strong> — web/app hosting.</li>
      </ul>

      <h2>8. International transfers</h2>
      <p>
        Where a sub-processor processes personal data outside the EEA, transfers take place only on
        the basis of an adequacy decision, EU Standard Contractual Clauses, or another valid
        transfer mechanism under Chapter V GDPR. The Controller can request the current transfer
        basis for each sub-processor.
      </p>

      <h2>9. Personal data breaches</h2>
      <p>
        Samply notifies the Controller without undue delay after becoming aware of a personal data
        breach affecting the Controller&rsquo;s Study data, and provides the information the
        Controller needs to meet its own notification obligations under Arts. 33–34.
      </p>

      <h2>10. Term, termination and deletion</h2>
      <p>
        This DPA applies for as long as Samply processes personal data on behalf of the Controller.
        On termination, the Controller may export its Study data and must delete Studies it no
        longer needs; remaining data is deleted according to the retention periods in the Privacy
        Policy. Consent records may be retained as proof of consent where a legal basis requires.
      </p>

      <h2>11. Contact</h2>
      <p>
        Data protection contact: Yury Shevchenko, iScience / University of Konstanz —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. See also the{" "}
        <a href="/docs/policy">Privacy Policy</a> and <a href="/docs/terms">Terms &amp; Conditions</a>.
      </p>
    </>
  );
}

function DpaContentDe() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Vorlage — Prüfung erforderlich.</strong> Dieser Auftragsverarbeitungsvertrag (AVV)
        wird bereitgestellt, um Forschende bei der Erfüllung ihrer Pflichten nach Artikel 28 DSGVO
        zu unterstützen. Er sollte vor der Verwendung oder Unterzeichnung von dem/der
        Datenschutzbeauftragten oder der Rechtsabteilung Ihrer Einrichtung geprüft werden. Um ein
        gegengezeichnetes Exemplar für Ihre Einrichtung anzufordern, wenden Sie sich an{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Letzte Aktualisierung:</strong> 18. Juni 2026</p>

      <h2>1. Parteien und Rollen</h2>
      <p>
        Dieser AVV regelt die Verarbeitung personenbezogener Daten, die von Samply im Auftrag der
        forschenden Person durchgeführt wird, die eine Studie erstellt und durchführt
        (&quot;die Studie&quot;).
      </p>
      <ul>
        <li>
          <strong>Verantwortlicher:</strong> die forschende Person und/oder ihre Einrichtung, die
          über die Zwecke und Mittel der Verarbeitung der über ihre Studie erhobenen
          personenbezogenen Daten entscheidet.
        </li>
        <li>
          <strong>Auftragsverarbeiter:</strong> die Forschungsgruppe iScience, Universität Konstanz,
          Universitätsstraße 10, 78464 Konstanz, Deutschland, die die Samply-Plattform betreibt
          (&quot;Samply&quot;) und personenbezogene Daten auf dokumentierte Weisungen des
          Verantwortlichen verarbeitet.
        </li>
      </ul>
      <p>
        Für die eigenen Konto- und Betriebsdaten von Samply (Konten der Forschenden, Abrechnung)
        handelt Samply als eigenständiger Verantwortlicher, wie in der <a href="/docs/policy">Datenschutzerklärung</a> beschrieben.
      </p>

      <h2>2. Gegenstand, Art und Zweck der Verarbeitung</h2>
      <p>
        Samply verarbeitet personenbezogene Daten ausschließlich zur Erbringung des Dienstes: das
        Planen und Zustellen von Benachrichtigungen an Studienteilnehmende, das Erfassen der
        Antworten der Teilnehmenden und der Benachrichtigungsereignisse sowie das Bereitstellen der
        daraus resultierenden Daten für den Verantwortlichen. Die Verarbeitung dauert für die Dauer
        der Studie und die in der{" "}
        <a href="/docs/policy">Datenschutzerklärung</a> festgelegten Aufbewahrungsfristen an, sofern der Verantwortliche die Daten nicht früher löscht.
      </p>

      <h2>3. Kategorien betroffener Personen und personenbezogener Daten</h2>
      <ul>
        <li><strong>Betroffene Personen:</strong> Studienteilnehmende; der Verantwortliche und etwaige Mitwirkende.</li>
        <li>
          <strong>Personenbezogene Daten:</strong> pseudonyme Teilnehmerkennung (Samply ID),
          Konto-E-Mail-Adresse und (optional) Name, Geräte-Push-Token, Sprache und Zeitzone,
          Zustellungs- und Interaktionsereignisse von Benachrichtigungen, Umfrage-/Antwortmetadaten,
          optionaler Teilnehmercode und Gruppe, Standort-/Geofencing-Ereignisse, sofern die Studie
          diese aktiviert, sowie Zahlungsdaten, sofern eine Vergütung konfiguriert ist.
        </li>
        <li>
          <strong>Besondere Kategorien personenbezogener Daten:</strong> werden von der Plattform
          selbst nicht erhoben. Der Verantwortliche ist für alle besonderen Kategorien
          personenbezogener Daten verantwortlich, die über verlinkte externe Umfragen erhoben
          werden.
        </li>
      </ul>

      <h2>4. Pflichten des Auftragsverarbeiters (Art. 28 Abs. 3)</h2>
      <ul>
        <li><strong>Dokumentierte Weisungen.</strong> Samply verarbeitet personenbezogene Daten der Teilnehmenden ausschließlich auf dokumentierte Weisungen des Verantwortlichen, einschließlich der Konfiguration der Studie, sofern nicht nach dem Recht der EU oder eines Mitgliedstaats etwas anderes vorgeschrieben ist.</li>
        <li><strong>Vertraulichkeit.</strong> Zur Verarbeitung der Daten befugte Personen sind zur Vertraulichkeit verpflichtet.</li>
        <li><strong>Sicherheit.</strong> Samply setzt geeignete technische und organisatorische Maßnahmen gemäß Art. 32 um (siehe Abschnitt 6).</li>
        <li><strong>Unterauftragsverarbeiter.</strong> Samply setzt die in Abschnitt 7 aufgeführten Unterauftragsverarbeiter ein und erlegt ihnen gleichwertige Datenschutzpflichten auf. Samply informiert den Verantwortlichen über beabsichtigte Änderungen und gibt dem Verantwortlichen die Möglichkeit zum Widerspruch.</li>
        <li><strong>Unterstützung bei den Rechten der betroffenen Personen.</strong> Unter Berücksichtigung der Art der Verarbeitung unterstützt Samply den Verantwortlichen mit geeigneten Maßnahmen bei der Beantwortung von Anträgen nach Kapitel III DSGVO (Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch). Teilnehmende können ihre eigenen Daten außerdem direkt im Dienst exportieren und ihr Konto löschen.</li>
        <li><strong>Unterstützung bei Art. 32–36.</strong> Samply unterstützt den Verantwortlichen bei der Gewährleistung der Sicherheit der Verarbeitung, der Meldung von Verletzungen und bei Datenschutz-Folgenabschätzungen.</li>
        <li><strong>Löschung oder Rückgabe.</strong> Bei Beendigung des Dienstes oder auf Weisung des Verantwortlichen löscht oder gibt Samply die personenbezogenen Daten zurück. Das Löschen einer Studie entfernt deren Antworten, in Warteschlange befindliche und geplante Benachrichtigungen, Auftragsdatensätze und Einwilligungsnachweise; siehe &quot;Löschung von Studien und Konten&quot; in der <a href="/docs/policy">Datenschutzerklärung</a>.</li>
        <li><strong>Prüfungen.</strong> Samply stellt die zum Nachweis der Einhaltung von Art. 28 erforderlichen Informationen bereit und ermöglicht sowie unterstützt Prüfungen, einschließlich Inspektionen, die vom Verantwortlichen oder einem von ihm beauftragten Prüfer durchgeführt werden.</li>
      </ul>

      <h2>5. Pflichten des Verantwortlichen</h2>
      <p>
        Der Verantwortliche ist dafür verantwortlich, eine Rechtsgrundlage für die Studie zu
        schaffen (einschließlich der Einwilligung der Teilnehmenden und, sofern erforderlich, der
        Genehmigung durch die Ethikkommission/das IRB), für die Rechtmäßigkeit seiner Weisungen sowie
        für den Inhalt jeder externen Umfrage, auf die er verlinkt. Der Verantwortliche darf keine
        besonderen Kategorien personenbezogener Daten oder direkt identifizierende Daten in
        Freitextfelder eingeben, sofern er nicht über eine Rechtsgrundlage und geeignete
        Garantien verfügt.
      </p>

      <h2>6. Technische und organisatorische Maßnahmen (Art. 32)</h2>
      <ul>
        <li>Verschlüsselung der Daten bei der Übertragung (TLS); Zugriff beschränkt auf authentifizierte, rollengeprüfte Konten.</li>
        <li>Forschungsdaten der Teilnehmenden werden über eine pseudonyme Samply ID verschlüsselt; Kontaktdaten werden Forschenden nicht angezeigt, außer wenn eine teilnehmende Person sich für Zahlungen entscheidet.</li>
        <li>Passwörter werden als Hash gespeichert (bcrypt); Sitzungs- und API-Token sind zeitlich begrenzt.</li>
        <li>Der Zugriff auf Teilnehmerdaten und Exporte wird in einem internen Prüfprotokoll erfasst.</li>
        <li>Konfigurierbare Aufbewahrung mit automatischer Löschung nach den in der Datenschutzerklärung angegebenen Fristen.</li>
        <li>Regelmäßige Überprüfung der Maßnahmen; der Verantwortliche erkennt an, dass diese aktualisiert werden können, um ein angemessenes Sicherheitsniveau aufrechtzuerhalten.</li>
      </ul>

      <h2>7. Unterauftragsverarbeiter</h2>
      <p>
        Samply setzt die folgenden Unterauftragsverarbeiter ein. Die aktuelle, gepflegte Liste (mit
        den jeweils weitergegebenen Daten und dem jeweiligen Übermittlungsmechanismus) wird im
        Verzeichnis der Unterauftragsverarbeiter des Projekts geführt.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — Datenbank-Hosting.</li>
        <li><strong>Postmark</strong> — Transaktions- und Benachrichtigungs-E-Mails.</li>
        <li><strong>Stripe</strong> — Vergütung/Auszahlungen an Teilnehmende (nur wenn aktiviert).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — Zustellung von Push-Benachrichtigungen.</li>
        <li><strong>Cloudflare Turnstile</strong> — Bot-Schutz bei der Registrierung.</li>
        <li><strong>Universität Konstanz</strong> — Web-/App-Hosting.</li>
      </ul>

      <h2>8. Internationale Datenübermittlungen</h2>
      <p>
        Sofern ein Unterauftragsverarbeiter personenbezogene Daten außerhalb des EWR verarbeitet,
        erfolgen Übermittlungen nur auf der Grundlage eines Angemessenheitsbeschlusses, der
        EU-Standardvertragsklauseln oder eines anderen gültigen Übermittlungsmechanismus nach
        Kapitel V DSGVO. Der Verantwortliche kann die aktuelle Übermittlungsgrundlage für jeden
        Unterauftragsverarbeiter anfordern.
      </p>

      <h2>9. Verletzungen des Schutzes personenbezogener Daten</h2>
      <p>
        Samply benachrichtigt den Verantwortlichen unverzüglich, nachdem ihm eine Verletzung des
        Schutzes personenbezogener Daten bekannt geworden ist, die die Studiendaten des
        Verantwortlichen betrifft, und stellt die Informationen bereit, die der Verantwortliche zur
        Erfüllung seiner eigenen Meldepflichten nach Art. 33&ndash;34 benötigt.
      </p>

      <h2>10. Laufzeit, Beendigung und Löschung</h2>
      <p>
        Dieser AVV gilt, solange Samply personenbezogene Daten im Auftrag des Verantwortlichen
        verarbeitet. Bei Beendigung kann der Verantwortliche seine Studiendaten exportieren und muss
        Studien löschen, die er nicht mehr benötigt; verbleibende Daten werden gemäß den
        Aufbewahrungsfristen in der Datenschutzerklärung gelöscht. Einwilligungsnachweise können als
        Nachweis der Einwilligung aufbewahrt werden, sofern eine Rechtsgrundlage dies erfordert.
      </p>

      <h2>11. Kontakt</h2>
      <p>
        Datenschutzkontakt: Yury Shevchenko, iScience / Universität Konstanz —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Siehe auch die{" "}
        <a href="/docs/policy">Datenschutzerklärung</a> und die <a href="/docs/terms">Allgemeinen Geschäftsbedingungen</a>.
      </p>
    </>
  );
}

function DpaContentNl() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Sjabloon — beoordeling vereist.</strong> Deze verwerkersovereenkomst (DPA) wordt
        aangeboden om onderzoekers te helpen bij het nakomen van hun verplichtingen op grond van
        artikel 28 AVG. Zij dient te worden beoordeeld door de functionaris voor gegevensbescherming
        of de juridisch adviseur van uw instelling voordat erop wordt vertrouwd of voordat zij wordt
        ondertekend. Om een medeondertekend exemplaar voor uw instelling aan te vragen, neemt u
        contact op met{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Laatste update:</strong> 18 juni 2026</p>

      <h2>1. Partijen en rollen</h2>
      <p>
        Deze DPA regelt de verwerking van persoonsgegevens die door Samply wordt uitgevoerd namens de
        onderzoeker die een onderzoek opzet en uitvoert (&quot;het Onderzoek&quot;).
      </p>
      <ul>
        <li>
          <strong>Verwerkingsverantwoordelijke:</strong> de onderzoeker en/of diens instelling, die
          het doel van en de middelen voor de verwerking van de via het Onderzoek verzamelde
          persoonsgegevens bepaalt.
        </li>
        <li>
          <strong>Verwerker:</strong> de onderzoeksgroep iScience, Universiteit Konstanz,
          Universitätsstraße 10, 78464 Konstanz, Duitsland, die het Samply-platform exploiteert
          (&quot;Samply&quot;) en die persoonsgegevens verwerkt op basis van de gedocumenteerde
          instructies van de Verwerkingsverantwoordelijke.
        </li>
      </ul>
      <p>
        Voor Samply&rsquo;s eigen account- en operationele gegevens (onderzoekersaccounts, facturatie)
        treedt Samply op als een onafhankelijke verwerkingsverantwoordelijke zoals beschreven in het{" "}
        <a href="/docs/policy">Privacybeleid</a>.
      </p>

      <h2>2. Onderwerp, aard en doel van de verwerking</h2>
      <p>
        Samply verwerkt persoonsgegevens uitsluitend om de Dienst te leveren: het plannen en afleveren
        van meldingen aan deelnemers aan het Onderzoek, het vastleggen van de antwoorden van
        deelnemers en van meldingsgebeurtenissen, en het beschikbaar stellen van de resulterende
        gegevens aan de Verwerkingsverantwoordelijke. De verwerking duurt gedurende de looptijd van
        het Onderzoek en de bewaartermijnen die zijn vastgelegd in het{" "}
        <a href="/docs/policy">Privacybeleid</a>, tenzij de Verwerkingsverantwoordelijke de gegevens
        eerder verwijdert.
      </p>

      <h2>3. Categorieën van betrokkenen en persoonsgegevens</h2>
      <ul>
        <li><strong>Betrokkenen:</strong> deelnemers aan het Onderzoek; de Verwerkingsverantwoordelijke en eventuele medewerkers.</li>
        <li>
          <strong>Persoonsgegevens:</strong> pseudonieme deelnemersidentificatie (Samply ID),
          account-e-mail en (optioneel) naam, push-token van het apparaat, taal en tijdzone,
          gebeurtenissen met betrekking tot aflevering en interactie van meldingen, metadata van
          enquêtes/antwoorden, optionele deelnemerscode en -groep, locatie-/geofencing-gebeurtenissen
          waar het Onderzoek deze inschakelt, en betalingsgegevens waar een vergoeding is
          geconfigureerd.
        </li>
        <li>
          <strong>Bijzondere categorieën van persoonsgegevens:</strong> worden niet door het platform
          zelf verzameld. De Verwerkingsverantwoordelijke is verantwoordelijk voor eventuele
          bijzondere categorieën van persoonsgegevens die worden verzameld via gekoppelde externe
          enquêtes.
        </li>
      </ul>

      <h2>4. Verplichtingen van de verwerker (art. 28, lid 3)</h2>
      <ul>
        <li><strong>Gedocumenteerde instructies.</strong> Samply verwerkt persoonsgegevens van deelnemers uitsluitend op basis van de gedocumenteerde instructies van de Verwerkingsverantwoordelijke, met inbegrip van de configuratie van het Onderzoek, tenzij het recht van de EU of van een lidstaat anders vereist.</li>
        <li><strong>Vertrouwelijkheid.</strong> Personen die gemachtigd zijn om de gegevens te verwerken, zijn tot vertrouwelijkheid gehouden.</li>
        <li><strong>Beveiliging.</strong> Samply implementeert passende technische en organisatorische maatregelen op grond van art. 32 (zie hoofdstuk 6).</li>
        <li><strong>Subverwerkers.</strong> Samply schakelt de in hoofdstuk 7 vermelde subverwerkers in en legt hun gelijkwaardige verplichtingen inzake gegevensbescherming op. Samply informeert de Verwerkingsverantwoordelijke over voorgenomen wijzigingen en biedt de Verwerkingsverantwoordelijke de gelegenheid om hiertegen bezwaar te maken.</li>
        <li><strong>Bijstand bij rechten van betrokkenen.</strong> Rekening houdend met de aard van de verwerking, verleent Samply de Verwerkingsverantwoordelijke bijstand met passende maatregelen om te reageren op verzoeken op grond van hoofdstuk III AVG (inzage, rectificatie, wissing, overdraagbaarheid, bezwaar). Deelnemers kunnen ook hun eigen gegevens exporteren en hun account rechtstreeks in de Dienst verwijderen.</li>
        <li><strong>Bijstand bij art. 32–36.</strong> Samply verleent de Verwerkingsverantwoordelijke bijstand bij het waarborgen van de beveiliging van de verwerking, de melding van inbreuken en de gegevensbeschermingseffectbeoordelingen.</li>
        <li><strong>Verwijdering of teruggave.</strong> Bij beëindiging van de Dienst of op instructie van de Verwerkingsverantwoordelijke verwijdert of retourneert Samply de persoonsgegevens. Het verwijderen van een Onderzoek verwijdert de antwoorden ervan, de in de wachtrij geplaatste en geplande meldingen, de taakregistraties en de toestemmingsregistraties; zie &quot;Wissing van onderzoeken en accounts&quot; in het <a href="/docs/policy">Privacybeleid</a>.</li>
        <li><strong>Audits.</strong> Samply stelt de informatie beschikbaar die nodig is om de naleving van art. 28 aan te tonen en maakt audits, met inbegrip van inspecties, uitgevoerd door de Verwerkingsverantwoordelijke of een door hem gemachtigde controleur mogelijk en draagt daaraan bij.</li>
      </ul>

      <h2>5. Verplichtingen van de verwerkingsverantwoordelijke</h2>
      <p>
        De Verwerkingsverantwoordelijke is verantwoordelijk voor het vaststellen van een
        rechtsgrondslag voor het Onderzoek (met inbegrip van de toestemming van de deelnemers en de
        goedkeuring van de ethische commissie/IRB waar vereist), voor de rechtmatigheid van zijn
        instructies en voor de inhoud van elke externe enquête waarnaar hij verwijst. De
        Verwerkingsverantwoordelijke mag geen bijzondere categorieën van persoonsgegevens of
        rechtstreeks identificerende gegevens invoeren in vrije-tekstvelden, tenzij hij daarvoor een
        rechtsgrondslag en passende waarborgen heeft.
      </p>

      <h2>6. Technische en organisatorische maatregelen (art. 32)</h2>
      <ul>
        <li>Versleuteling van gegevens tijdens de overdracht (TLS); toegang beperkt tot geauthenticeerde accounts met rolcontrole.</li>
        <li>Onderzoeksgegevens van deelnemers worden geïndexeerd op basis van een pseudonieme Samply ID; contactgegevens worden niet aan onderzoekers getoond, behalve wanneer een deelnemer kiest voor betalingen.</li>
        <li>Wachtwoorden worden gehasht opgeslagen (bcrypt); sessie- en API-tokens zijn in de tijd beperkt.</li>
        <li>Toegang tot deelnemersgegevens en exports wordt vastgelegd in een intern auditlogboek.</li>
        <li>Configureerbare bewaring met automatische verwijdering na de in het Privacybeleid vermelde termijnen.</li>
        <li>Regelmatige beoordeling van de maatregelen; de Verwerkingsverantwoordelijke erkent dat deze kunnen worden bijgewerkt om een passend beveiligingsniveau te handhaven.</li>
      </ul>

      <h2>7. Subverwerkers</h2>
      <p>
        Samply maakt gebruik van de volgende subverwerkers. De actuele, bijgehouden lijst (met per
        subverwerker de gedeelde gegevens en het doorgiftemechanisme) wordt bijgehouden in het
        subverwerkersregister van het project.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — databasehosting.</li>
        <li><strong>Postmark</strong> — transactionele en meldings-e-mail.</li>
        <li><strong>Stripe</strong> — vergoeding/uitbetalingen aan deelnemers (alleen indien ingeschakeld).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — aflevering van pushmeldingen.</li>
        <li><strong>Cloudflare Turnstile</strong> — botbescherming bij aanmelding.</li>
        <li><strong>Universiteit Konstanz</strong> — web-/app-hosting.</li>
      </ul>

      <h2>8. Internationale doorgiften</h2>
      <p>
        Waar een subverwerker persoonsgegevens buiten de EER verwerkt, vinden doorgiften uitsluitend
        plaats op basis van een adequaatheidsbesluit, EU-modelcontractbepalingen of een ander geldig
        doorgiftemechanisme op grond van hoofdstuk V AVG. De Verwerkingsverantwoordelijke kan de
        actuele doorgiftegrondslag voor elke subverwerker opvragen.
      </p>

      <h2>9. Inbreuken in verband met persoonsgegevens</h2>
      <p>
        Samply stelt de Verwerkingsverantwoordelijke zonder onnodige vertraging in kennis nadat zij
        kennis heeft gekregen van een inbreuk in verband met persoonsgegevens die de
        onderzoeksgegevens van de Verwerkingsverantwoordelijke treft, en verstrekt de informatie die
        de Verwerkingsverantwoordelijke nodig heeft om te voldoen aan zijn eigen
        meldingsverplichtingen op grond van art. 33–34.
      </p>

      <h2>10. Looptijd, beëindiging en verwijdering</h2>
      <p>
        Deze DPA is van toepassing zolang Samply persoonsgegevens verwerkt namens de
        Verwerkingsverantwoordelijke. Bij beëindiging kan de Verwerkingsverantwoordelijke zijn
        onderzoeksgegevens exporteren en moet hij Onderzoeken verwijderen die hij niet langer nodig
        heeft; resterende gegevens worden verwijderd overeenkomstig de bewaartermijnen in het
        Privacybeleid. Toestemmingsregistraties kunnen worden bewaard als bewijs van toestemming
        wanneer een rechtsgrondslag dit vereist.
      </p>

      <h2>11. Contact</h2>
      <p>
        Contactpersoon voor gegevensbescherming: Yury Shevchenko, iScience / Universiteit Konstanz —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Zie ook het{" "}
        <a href="/docs/policy">Privacybeleid</a> en de <a href="/docs/terms">Algemene voorwaarden</a>.
      </p>
    </>
  );
}

function DpaContentRu() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Шаблон — требуется проверка.</strong> Настоящее Соглашение об обработке персональных
        данных (Data Processing Agreement, DPA) предоставляется, чтобы помочь исследователям
        выполнить свои обязательства согласно статье 28 GDPR. Перед тем как полагаться на него или
        подписывать его, оно должно быть проверено ответственным за защиту данных или юрисконсультом
        вашего учреждения. Чтобы запросить экземпляр с встречной подписью для вашего учреждения,
        обращайтесь по адресу{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Последнее обновление:</strong> 18 июня 2026 г.</p>

      <h2>1. Стороны и роли</h2>
      <p>
        Настоящее DPA регулирует обработку персональных данных, осуществляемую Samply от имени
        исследователя, который создаёт и проводит исследование (&quot;Исследование&quot;).
      </p>
      <ul>
        <li>
          <strong>Контролёр (оператор):</strong> исследователь и/или его учреждение, которые
          определяют цели и средства обработки персональных данных, собираемых в рамках их
          Исследования.
        </li>
        <li>
          <strong>Обработчик:</strong> исследовательская группа iScience, Констанцский университет,
          Universitätsstraße 10, 78464 Konstanz, Германия, эксплуатирующая платформу Samply
          (&quot;Samply&quot;), которая обрабатывает персональные данные по документированным
          указаниям Контролёра.
        </li>
      </ul>
      <p>
        В отношении собственных учётных и операционных данных Samply (учётные записи исследователей,
        выставление счетов) Samply выступает в качестве независимого контролёра, как описано в{" "}
        <a href="/docs/policy">Политике конфиденциальности</a>.
      </p>

      <h2>2. Предмет, характер и цель обработки</h2>
      <p>
        Samply обрабатывает персональные данные исключительно для предоставления Сервиса:
        планирование и доставка уведомлений участникам Исследования, регистрация ответов участников и
        событий уведомлений, а также предоставление полученных данных Контролёру. Обработка
        продолжается в течение срока Исследования и сроков хранения, установленных в{" "}
        <a href="/docs/policy">Политике конфиденциальности</a>, если только Контролёр не удалит данные
        ранее.
      </p>

      <h2>3. Категории субъектов данных и персональных данных</h2>
      <ul>
        <li><strong>Субъекты данных:</strong> участники Исследования; Контролёр и любые соавторы.</li>
        <li>
          <strong>Персональные данные:</strong> псевдонимный идентификатор участника (Samply ID),
          адрес электронной почты учётной записи и (опционально) имя, push-токен устройства, язык и
          часовой пояс, события доставки и взаимодействия с уведомлениями, метаданные
          опросов/ответов, опциональный код и группа участника, события местоположения/геозонирования,
          если Исследование их включает, и платёжные данные, если настроена компенсация.
        </li>
        <li>
          <strong>Особые категории персональных данных:</strong> не собираются самой платформой.
          Контролёр несёт ответственность за любые данные особых категорий, собранные через связанные
          внешние опросы.
        </li>
      </ul>

      <h2>4. Обязательства обработчика (ст. 28(3))</h2>
      <ul>
        <li><strong>Документированные указания.</strong> Samply обрабатывает персональные данные участников только по документированным указаниям Контролёра, включая конфигурацию Исследования, если иное не требуется законодательством ЕС или государства-члена.</li>
        <li><strong>Конфиденциальность.</strong> Лица, уполномоченные обрабатывать данные, связаны обязательством о конфиденциальности.</li>
        <li><strong>Безопасность.</strong> Samply применяет надлежащие технические и организационные меры в соответствии со ст. 32 (см. Раздел 6).</li>
        <li><strong>Субобработчики.</strong> Samply привлекает субобработчиков, перечисленных в Разделе 7, и налагает на них эквивалентные обязательства по защите данных. Samply будет информировать Контролёра о предполагаемых изменениях и предоставит Контролёру возможность возразить.</li>
        <li><strong>Содействие в реализации прав субъектов данных.</strong> Принимая во внимание характер обработки, Samply содействует Контролёру надлежащими мерами для реагирования на запросы согласно Главе III GDPR (доступ, исправление, удаление, переносимость, возражение). Участники также могут самостоятельно экспортировать свои данные и удалить свою учётную запись непосредственно в Сервисе.</li>
        <li><strong>Содействие по ст. 32–36.</strong> Samply содействует Контролёру в обеспечении безопасности обработки, уведомлении о нарушениях и проведении оценок воздействия на защиту данных.</li>
        <li><strong>Удаление или возврат.</strong> По прекращении использования Сервиса или по указанию Контролёра Samply удаляет или возвращает персональные данные. Удаление Исследования удаляет его ответы, поставленные в очередь и запланированные уведомления, записи заданий и записи о согласии; см. &quot;Удаление исследований и учётных записей&quot; в <a href="/docs/policy">Политике конфиденциальности</a>.</li>
        <li><strong>Аудиты.</strong> Samply предоставляет информацию, необходимую для подтверждения соблюдения ст. 28, а также допускает и способствует проведению аудитов, включая инспекции, проводимых Контролёром или уполномоченным им аудитором.</li>
      </ul>

      <h2>5. Обязательства контролёра</h2>
      <p>
        Контролёр несёт ответственность за установление правового основания для Исследования (включая
        согласие участников и одобрение этического комитета/IRB, где это требуется), за правомерность
        своих указаний и за содержание любого внешнего опроса, на который он ссылается. Контролёр не
        должен вносить данные особых категорий или данные, прямо идентифицирующие лицо, в поля
        свободного текста, если у него нет правового основания и надлежащих гарантий.
      </p>

      <h2>6. Технические и организационные меры (ст. 32)</h2>
      <ul>
        <li>Шифрование данных при передаче (TLS); доступ ограничен аутентифицированными учётными записями с проверкой ролей.</li>
        <li>Исследовательские данные участников привязаны к псевдонимному Samply ID; контактные данные не показываются исследователям, кроме случаев, когда участник соглашается на выплаты.</li>
        <li>Пароли хранятся в хешированном виде (bcrypt); сессионные и API-токены имеют ограниченный срок действия.</li>
        <li>Доступ к данным участников и экспортам фиксируется во внутреннем журнале аудита.</li>
        <li>Настраиваемое хранение с автоматическим удалением по истечении сроков, указанных в Политике конфиденциальности.</li>
        <li>Регулярный пересмотр мер; Контролёр признаёт, что они могут обновляться для поддержания надлежащего уровня безопасности.</li>
      </ul>

      <h2>7. Субобработчики</h2>
      <p>
        Samply использует следующих субобработчиков. Актуальный, поддерживаемый список (с указанием
        передаваемых данных и механизма передачи для каждого) ведётся в реестре субобработчиков
        проекта.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — хостинг базы данных.</li>
        <li><strong>Postmark</strong> — транзакционная электронная почта и почта уведомлений.</li>
        <li><strong>Stripe</strong> — компенсация участникам / выплаты (только когда включено).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — доставка push-уведомлений.</li>
        <li><strong>Cloudflare Turnstile</strong> — защита от ботов при регистрации.</li>
        <li><strong>Констанцский университет</strong> — хостинг веб-сайта/приложения.</li>
      </ul>

      <h2>8. Международные передачи</h2>
      <p>
        Если субобработчик обрабатывает персональные данные за пределами ЕЭП, передача осуществляется
        только на основании решения об адекватности, Стандартных договорных положений ЕС или иного
        действительного механизма передачи согласно Главе V GDPR. Контролёр может запросить текущее
        основание передачи для каждого субобработчика.
      </p>

      <h2>9. Нарушения безопасности персональных данных</h2>
      <p>
        Samply уведомляет Контролёра без неоправданной задержки после того, как ему становится
        известно о нарушении безопасности персональных данных, затрагивающем данные Исследования
        Контролёра, и предоставляет информацию, необходимую Контролёру для выполнения его собственных
        обязательств по уведомлению согласно ст. 33&ndash;34.
      </p>

      <h2>10. Срок действия, прекращение и удаление</h2>
      <p>
        Настоящее DPA действует до тех пор, пока Samply обрабатывает персональные данные от имени
        Контролёра. По прекращении Контролёр может экспортировать данные своего Исследования и должен
        удалить Исследования, которые ему больше не нужны; оставшиеся данные удаляются в соответствии
        со сроками хранения в Политике конфиденциальности. Записи о согласии могут сохраняться в
        качестве доказательства согласия, если этого требует правовое основание.
      </p>

      <h2>11. Контакт</h2>
      <p>
        Контакт по вопросам защиты данных: Yury Shevchenko, iScience / Констанцский университет —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. См. также{" "}
        <a href="/docs/policy">Политику конфиденциальности</a> и <a href="/docs/terms">Условия использования</a>.
      </p>
    </>
  );
}

function DpaContentZh() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>模板——需经审核。</strong> 本数据处理协议（DPA）旨在帮助研究人员履行其在
        《通用数据保护条例》(GDPR) 第 28 条项下的义务。在依赖或签署本协议之前，应由贵机构的
        数据保护官或法律顾问进行审核。如需为贵机构索取一份经双方签署的副本，请联系{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>。
      </div>

      <p><strong>最后更新：</strong> 2026年6月18日</p>

      <h2>1. 各方与角色</h2>
      <p>
        本 DPA 规范由 Samply 代表创建并运行研究项目（“研究项目”）的研究人员所进行的
        个人数据处理活动。
      </p>
      <ul>
        <li>
          <strong>控制者：</strong> 研究人员和/或其所属机构，确定通过其研究项目所收集
          个人数据的处理目的和方式。
        </li>
        <li>
          <strong>处理者：</strong> 运营 Samply 平台（“Samply”）的康斯坦茨大学 iScience 研究组，
          地址为 Universitätsstraße 10, 78464 Konstanz, 德国，其根据控制者记录在案的指示
          处理个人数据。
        </li>
      </ul>
      <p>
        对于 Samply 自身的账户和运营数据（研究人员账户、计费），Samply 作为独立控制者行事，
        详见<a href="/docs/policy">隐私政策</a>。
      </p>

      <h2>2. 处理的主题、性质与目的</h2>
      <p>
        Samply 处理个人数据仅为提供本服务：为研究项目参与者安排并发送通知、记录参与者的
        回应和通知事件，并将由此产生的数据提供给控制者。处理持续存在于研究项目的整个期间
        以及<a href="/docs/policy">隐私政策</a>中所规定的保留期限内，除非控制者提前删除
        数据。
      </p>

      <h2>3. 数据主体与个人数据的类别</h2>
      <ul>
        <li><strong>数据主体：</strong> 研究项目参与者；控制者及任何协作者。</li>
        <li>
          <strong>个人数据：</strong> 假名化的参与者标识符（Samply ID）、账户电子邮箱及
          （可选的）姓名、设备推送令牌、语言与时区、通知发送和交互事件、调查/回应元数据、
          可选的参与者代码与分组、研究项目启用时的位置/地理围栏事件，以及配置了报酬时的
          支付数据。
        </li>
        <li>
          <strong>特殊类别个人数据：</strong> 平台本身不收集此类数据。控制者负责通过所链接的
          外部调查收集的任何特殊类别个人数据。
        </li>
      </ul>

      <h2>4. 处理者的义务（第 28(3) 条）</h2>
      <ul>
        <li><strong>记录在案的指示。</strong> Samply 仅根据控制者记录在案的指示（包括研究项目的配置）处理参与者个人数据，除非欧盟或成员国法律另有要求。</li>
        <li><strong>保密性。</strong> 获授权处理数据的人员受保密义务约束。</li>
        <li><strong>安全性。</strong> Samply 依据第 32 条实施适当的技术和组织措施（见第 6 节）。</li>
        <li><strong>次处理者。</strong> Samply 使用第 7 节所列的次处理者，并对其施加同等的数据保护义务。Samply 将就拟议的变更通知控制者，并给予控制者提出异议的机会。</li>
        <li><strong>协助数据主体权利。</strong> 在考虑处理性质的前提下，Samply 以适当措施协助控制者响应 GDPR 第三章项下的请求（访问、更正、删除、可携带、反对）。参与者亦可直接在本服务中导出自己的数据并删除其账户。</li>
        <li><strong>协助第 32–36 条相关事项。</strong> Samply 协助控制者确保处理的安全性、数据泄露通知以及数据保护影响评估。</li>
        <li><strong>删除或返还。</strong> 在本服务终止时或根据控制者的指示，Samply 删除或返还个人数据。删除某研究项目将移除其回应、排队中和已安排的通知、作业记录及同意记录；参见<a href="/docs/policy">隐私政策</a>中的“研究项目和账户的删除”。</li>
        <li><strong>审计。</strong> Samply 提供证明其遵守第 28 条所需的信息，并允许并协助由控制者或其委托的审计员进行的审计（包括检查）。</li>
      </ul>

      <h2>5. 控制者的义务</h2>
      <p>
        控制者负责为研究项目确立合法依据（包括在需要时取得参与者同意和伦理/IRB 批准）、
        确保其指示的合法性，以及对其所链接的任何外部调查内容负责。除非控制者具备合法依据
        并采取适当的保障措施，否则不得在自由文本字段中输入特殊类别或可直接识别身份的数据。
      </p>

      <h2>6. 技术和组织措施（第 32 条）</h2>
      <ul>
        <li>传输中数据的加密（TLS）；访问权限限于经身份验证并经角色核查的账户。</li>
        <li>参与者研究数据以假名化的 Samply ID 作为键值；除参与者选择加入支付的情形外，联系方式不向研究人员显示。</li>
        <li>密码以哈希形式存储（bcrypt）；会话和 API 令牌有时限。</li>
        <li>对参与者数据的访问及导出记录在内部审计日志中。</li>
        <li>可配置的保留期限，并在隐私政策所述期限届满后自动删除。</li>
        <li>定期审查各项措施；控制者知悉这些措施可能会被更新，以维持适当的安全水平。</li>
      </ul>

      <h2>7. 次处理者</h2>
      <p>
        Samply 使用以下次处理者。当前维护的完整清单（含每一方所共享的数据和传输机制）保存在
        本项目的次处理者登记册中。
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — 数据库托管。</li>
        <li><strong>Postmark</strong> — 事务性及通知电子邮件。</li>
        <li><strong>Stripe</strong> — 参与者报酬/付款（仅在启用时）。</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — 推送通知的发送。</li>
        <li><strong>Cloudflare Turnstile</strong> — 注册时的机器人防护。</li>
        <li><strong>康斯坦茨大学</strong> — 网站/应用托管。</li>
      </ul>

      <h2>8. 国际数据传输</h2>
      <p>
        在次处理者于欧洲经济区（EEA）以外处理个人数据的情形下，传输仅基于充分性决定、
        欧盟标准合同条款，或 GDPR 第五章项下的其他有效传输机制进行。控制者可就每一次处理者
        索取当前的传输依据。
      </p>

      <h2>9. 个人数据泄露</h2>
      <p>
        在获知影响控制者研究项目数据的个人数据泄露后，Samply 将不无故拖延地通知控制者，
        并提供控制者履行其在第 33–34 条项下自身通知义务所需的信息。
      </p>

      <h2>10. 期限、终止与删除</h2>
      <p>
        本 DPA 在 Samply 代表控制者处理个人数据期间持续有效。终止时，控制者可导出其研究项目
        数据，并须删除其不再需要的研究项目；剩余数据将按照隐私政策中的保留期限予以删除。
        在法律依据有要求时，同意记录可作为同意的证明予以保留。
      </p>

      <h2>11. 联系方式</h2>
      <p>
        数据保护联系人：Yury Shevchenko，iScience / 康斯坦茨大学 —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>。另请参见{" "}
        <a href="/docs/policy">隐私政策</a>及<a href="/docs/terms">条款与条件</a>。
      </p>
    </>
  );
}

function DpaContentKo() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>템플릿 — 검토 필요.</strong> 본 개인정보 처리 계약(DPA)은
        연구자가 GDPR(일반개인정보보호법) 제28조에 따른 의무를 이행하도록 돕기 위해
        제공됩니다. 이 문서에 의존하거나 이를 체결하기 전에 귀 기관의 개인정보 보호책임자 또는
        법률 자문의 검토를 받아야 합니다. 귀 기관을 위한 상호 서명본을 요청하려면 다음으로
        연락하십시오:{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>최종 업데이트:</strong> 2026년 6월 18일</p>

      <h2>1. 당사자 및 역할</h2>
      <p>
        본 DPA는 연구를 생성하고 수행하는 연구자(&quot;본 연구&quot;)를 대신하여 Samply가
        수행하는 개인정보 처리를 규율합니다.
      </p>
      <ul>
        <li>
          <strong>컨트롤러(관리자):</strong> 본 연구를 통해 수집된 개인정보의 처리 목적과 수단을
          결정하는 연구자 및/또는 그 소속 기관.
        </li>
        <li>
          <strong>프로세서(수탁자):</strong> Samply 플랫폼(&quot;Samply&quot;)을 운영하는 콘스탄츠
          대학교 iScience 연구 그룹, Universitätsstraße 10, 78464 Konstanz, 독일. 컨트롤러(관리자)의
          문서화된 지시에 따라 개인정보를 처리합니다.
        </li>
      </ul>
      <p>
        Samply 자체 계정 및 운영 데이터(연구자 계정, 청구)에 대해서는 <a href="/docs/policy">개인정보 처리방침</a>에
        기술된 바와 같이 Samply가 독립적인 컨트롤러(관리자)로서 행위합니다.
      </p>

      <h2>2. 처리의 대상, 성격 및 목적</h2>
      <p>
        Samply는 오직 서비스를 제공하기 위한 목적으로만 개인정보를 처리합니다: 연구 참여자에게
        알림을 예약하고 전달하는 것, 참여자의 응답과 알림 이벤트를 기록하는 것, 그리고 그 결과
        데이터를 컨트롤러(관리자)에게 제공하는 것. 처리는 본 연구의 존속 기간 및{" "}
        <a href="/docs/policy">개인정보 처리방침</a>에 명시된 보관 기간 동안 지속되며, 다만
        컨트롤러(관리자)가 데이터를 그 이전에 삭제하는 경우는 예외로 합니다.
      </p>

      <h2>3. 정보주체 및 개인정보의 범주</h2>
      <ul>
        <li><strong>정보주체:</strong> 연구 참여자; 컨트롤러(관리자) 및 모든 협력자.</li>
        <li>
          <strong>개인정보:</strong> 가명화된 참여자 식별자(Samply ID), 계정 이메일 및 (선택적으로)
          이름, 기기 푸시 토큰, 언어 및 시간대, 알림 전달 및 상호작용 이벤트, 설문/응답 메타데이터,
          선택적 참여자 코드 및 그룹, 본 연구가 활성화한 경우의 위치/지오펜싱 이벤트, 그리고 보상이
          구성된 경우의 결제 데이터.
        </li>
        <li>
          <strong>특별 범주의 개인정보:</strong> 플랫폼 자체에서는 수집하지 않습니다. 연결된 외부
          설문을 통해 수집되는 특별 범주의 개인정보에 대해서는 컨트롤러(관리자)가 책임을 집니다.
        </li>
      </ul>

      <h2>4. 프로세서(수탁자)의 의무(제28조 제3항)</h2>
      <ul>
        <li><strong>문서화된 지시.</strong> Samply는 EU 또는 회원국 법률에서 달리 요구하지 않는 한, 본 연구의 구성을 포함하여 컨트롤러(관리자)의 문서화된 지시에 따라서만 참여자 개인정보를 처리합니다.</li>
        <li><strong>기밀유지.</strong> 데이터 처리 권한을 부여받은 자는 기밀유지 의무를 부담합니다.</li>
        <li><strong>보안.</strong> Samply는 제32조에 따라 적절한 기술적 및 조직적 조치를 시행합니다(제6절 참조).</li>
        <li><strong>하위 수탁자.</strong> Samply는 제7절에 열거된 하위 수탁자를 이용하며 이들에게 동등한 개인정보 보호 의무를 부과합니다. Samply는 변경 예정 사항을 컨트롤러(관리자)에게 통지하고 컨트롤러(관리자)에게 이의를 제기할 기회를 제공합니다.</li>
        <li><strong>정보주체 권리에 대한 지원.</strong> 처리의 성격을 고려하여, Samply는 GDPR 제3장에 따른 요청(열람, 정정, 삭제, 이동, 반대)에 대응할 수 있도록 적절한 조치로 컨트롤러(관리자)를 지원합니다. 참여자는 또한 서비스 내에서 직접 자신의 데이터를 내보내고 계정을 삭제할 수 있습니다.</li>
        <li><strong>제32–36조에 대한 지원.</strong> Samply는 처리의 보안 확보, 침해 통지, 개인정보 영향평가에 있어 컨트롤러(관리자)를 지원합니다.</li>
        <li><strong>삭제 또는 반환.</strong> 서비스 종료 시 또는 컨트롤러(관리자)의 지시에 따라, Samply는 개인정보를 삭제하거나 반환합니다. 연구를 삭제하면 해당 연구의 응답, 대기 중이거나 예약된 알림, 작업 기록, 동의 기록이 제거됩니다. <a href="/docs/policy">개인정보 처리방침</a>의 &quot;연구 및 계정의 삭제&quot;를 참조하십시오.</li>
        <li><strong>감사.</strong> Samply는 제28조 준수를 입증하는 데 필요한 정보를 제공하며, 컨트롤러(관리자) 또는 그가 위임한 감사인이 수행하는 감사(현장 점검 포함)를 허용하고 이에 협조합니다.</li>
      </ul>

      <h2>5. 컨트롤러(관리자)의 의무</h2>
      <p>
        컨트롤러(관리자)는 본 연구에 대한 적법한 근거(필요한 경우 참여자 동의 및 윤리/IRB 승인
        포함)를 확립하는 것, 그 지시의 적법성, 그리고 연결한 모든 외부 설문의 내용에 대해 책임을
        집니다. 컨트롤러(관리자)는 적법한 근거와 적절한 안전조치를 갖추지 않는 한, 특별 범주의
        개인정보 또는 직접 식별 가능한 정보를 자유 입력란에 입력해서는 안 됩니다.
      </p>

      <h2>6. 기술적 및 조직적 조치(제32조)</h2>
      <ul>
        <li>전송 중 데이터의 암호화(TLS); 접근은 인증되고 역할이 확인된 계정으로 제한됩니다.</li>
        <li>참여자 연구 데이터는 가명화된 Samply ID로 키가 지정되며, 참여자가 결제를 선택한 경우를 제외하고는 연락처 정보가 연구자에게 표시되지 않습니다.</li>
        <li>비밀번호는 해시 처리되어 저장됩니다(bcrypt); 세션 및 API 토큰은 시간 제한이 있습니다.</li>
        <li>참여자 데이터 및 내보내기에 대한 접근은 내부 감사 로그에 기록됩니다.</li>
        <li>개인정보 처리방침에 명시된 기간 이후 자동 삭제되는 구성 가능한 보관.</li>
        <li>조치에 대한 정기적 검토; 컨트롤러(관리자)는 적절한 수준의 보안을 유지하기 위해 이러한 조치가 업데이트될 수 있음을 인정합니다.</li>
      </ul>

      <h2>7. 하위 수탁자</h2>
      <p>
        Samply는 다음의 하위 수탁자를 이용합니다. 현재의 최신 목록(각각에 대해 공유되는 데이터 및
        이전 메커니즘 포함)은 프로젝트의 하위 수탁자 등록부에 유지됩니다.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — 데이터베이스 호스팅.</li>
        <li><strong>Postmark</strong> — 트랜잭션 및 알림 이메일.</li>
        <li><strong>Stripe</strong> — 참여자 보상 / 지급 (활성화된 경우에 한함).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — 푸시 알림 전달.</li>
        <li><strong>Cloudflare Turnstile</strong> — 가입 시 봇 방지.</li>
        <li><strong>콘스탄츠 대학교</strong> — 웹/앱 호스팅.</li>
      </ul>

      <h2>8. 국제 이전</h2>
      <p>
        하위 수탁자가 EEA 외부에서 개인정보를 처리하는 경우, 이전은 오직 적정성 결정, EU 표준
        계약 조항, 또는 GDPR 제5장에 따른 그 밖의 유효한 이전 메커니즘에 근거해서만 이루어집니다.
        컨트롤러(관리자)는 각 하위 수탁자에 대한 현재의 이전 근거를 요청할 수 있습니다.
      </p>

      <h2>9. 개인정보 침해</h2>
      <p>
        Samply는 컨트롤러(관리자)의 연구 데이터에 영향을 미치는 개인정보 침해를 인지한 후 부당한
        지체 없이 컨트롤러(관리자)에게 통지하며, 컨트롤러(관리자)가 제33–34조에 따른 자체 통지
        의무를 이행하는 데 필요한 정보를 제공합니다.
      </p>

      <h2>10. 기간, 종료 및 삭제</h2>
      <p>
        본 DPA는 Samply가 컨트롤러(관리자)를 대신하여 개인정보를 처리하는 기간 동안 적용됩니다.
        종료 시 컨트롤러(관리자)는 자신의 연구 데이터를 내보낼 수 있으며 더 이상 필요하지 않은
        연구를 삭제해야 합니다; 남은 데이터는 개인정보 처리방침의 보관 기간에 따라 삭제됩니다.
        법적 근거가 요구하는 경우 동의의 증거로서 동의 기록이 보관될 수 있습니다.
      </p>

      <h2>11. 연락처</h2>
      <p>
        개인정보 보호 연락처: Yury Shevchenko, iScience / 콘스탄츠 대학교 —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. 또한{" "}
        <a href="/docs/policy">개인정보 처리방침</a> 및 <a href="/docs/terms">이용약관 &amp; 조건</a>을 참조하십시오.
      </p>
    </>
  );
}

function DpaContentIt() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Modello — revisione necessaria.</strong> Il presente Accordo sul trattamento dei dati
        (DPA) è fornito per aiutare i ricercatori ad adempiere agli obblighi previsti dall&rsquo;articolo
        28 GDPR. Dovrebbe essere esaminato dal responsabile della protezione dei dati o dal consulente
        legale della vostra istituzione prima di esservi utilizzato o sottoscritto. Per richiedere una
        copia controfirmata per la vostra istituzione, contattare{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Ultimo aggiornamento:</strong> 18 giugno 2026</p>

      <h2>1. Parti e ruoli</h2>
      <p>
        Il presente DPA disciplina il trattamento dei dati personali effettuato da Samply per conto del
        ricercatore che crea e conduce uno studio (&quot;lo Studio&quot;).
      </p>
      <ul>
        <li>
          <strong>Titolare del trattamento:</strong> il ricercatore e/o la sua istituzione, che
          determina le finalità e i mezzi del trattamento dei dati personali raccolti attraverso il
          proprio Studio.
        </li>
        <li>
          <strong>Responsabile del trattamento:</strong> il gruppo di ricerca iScience, Università di
          Costanza, Universitätsstraße 10, 78464 Konstanz, Germania, che gestisce la piattaforma Samply
          (&quot;Samply&quot;), la quale tratta i dati personali sulla base delle istruzioni documentate
          del Titolare del trattamento.
        </li>
      </ul>
      <p>
        Per i dati relativi al proprio account e alle proprie operazioni (account dei ricercatori,
        fatturazione), Samply agisce in qualità di titolare del trattamento autonomo come descritto
        nell&rsquo;<a href="/docs/policy">Informativa sulla privacy</a>.
      </p>

      <h2>2. Oggetto, natura e finalità del trattamento</h2>
      <p>
        Samply tratta i dati personali unicamente per fornire il Servizio: pianificazione e invio di
        notifiche ai partecipanti allo Studio, registrazione delle risposte dei partecipanti e degli
        eventi relativi alle notifiche, e messa a disposizione del Titolare del trattamento dei dati
        risultanti. Il trattamento dura per la durata dello Studio e per i periodi di conservazione
        indicati nell&rsquo;{" "}
        <a href="/docs/policy">Informativa sulla privacy</a>, salvo che il Titolare del trattamento
        cancelli i dati prima.
      </p>

      <h2>3. Categorie di interessati e di dati personali</h2>
      <ul>
        <li><strong>Interessati:</strong> i partecipanti allo Studio; il Titolare del trattamento ed eventuali collaboratori.</li>
        <li>
          <strong>Dati personali:</strong> identificativo pseudonimo del partecipante (Samply ID), email
          dell&rsquo;account e (facoltativamente) nome, token push del dispositivo, lingua e fuso orario,
          eventi di consegna e interazione delle notifiche, metadati di sondaggi/risposte, codice e
          gruppo facoltativi del partecipante, eventi di localizzazione/geofencing ove lo Studio li
          abiliti, e dati di pagamento ove sia configurato un compenso.
        </li>
        <li>
          <strong>Categorie particolari di dati personali:</strong> non raccolte dalla piattaforma
          stessa. Il Titolare del trattamento è responsabile di eventuali categorie particolari di dati
          personali raccolte tramite sondaggi esterni collegati.
        </li>
      </ul>

      <h2>4. Obblighi del responsabile del trattamento (art. 28, par. 3)</h2>
      <ul>
        <li><strong>Istruzioni documentate.</strong> Samply tratta i dati personali dei partecipanti solo sulla base delle istruzioni documentate del Titolare del trattamento, inclusa la configurazione dello Studio, salvo che il diritto dell&rsquo;UE o di uno Stato membro disponga diversamente.</li>
        <li><strong>Riservatezza.</strong> Le persone autorizzate a trattare i dati sono vincolate a un obbligo di riservatezza.</li>
        <li><strong>Sicurezza.</strong> Samply attua misure tecniche e organizzative adeguate ai sensi dell&rsquo;art. 32 (si veda la Sezione 6).</li>
        <li><strong>Sub-responsabili del trattamento.</strong> Samply si avvale dei sub-responsabili del trattamento elencati nella Sezione 7 e impone loro obblighi equivalenti in materia di protezione dei dati. Samply informerà il Titolare del trattamento delle modifiche previste e darà al Titolare del trattamento la possibilità di opporsi.</li>
        <li><strong>Assistenza per i diritti degli interessati.</strong> Tenendo conto della natura del trattamento, Samply assiste il Titolare del trattamento con misure adeguate per rispondere alle richieste ai sensi del Capo III GDPR (accesso, rettifica, cancellazione, portabilità, opposizione). I partecipanti possono inoltre esportare i propri dati e cancellare il proprio account direttamente nel Servizio.</li>
        <li><strong>Assistenza per gli artt. 32–36.</strong> Samply assiste il Titolare del trattamento nel garantire la sicurezza del trattamento, la notifica delle violazioni e le valutazioni d&rsquo;impatto sulla protezione dei dati.</li>
        <li><strong>Cancellazione o restituzione.</strong> Al termine del Servizio o su istruzione del Titolare del trattamento, Samply cancella o restituisce i dati personali. La cancellazione di uno Studio rimuove le relative risposte, le notifiche in coda e pianificate, i registri dei processi e i registri del consenso; si veda &quot;Cancellazione di studi e account&quot; nell&rsquo;<a href="/docs/policy">Informativa sulla privacy</a>.</li>
        <li><strong>Audit.</strong> Samply mette a disposizione le informazioni necessarie per dimostrare la conformità all&rsquo;art. 28 e consente e contribuisce alle attività di audit, comprese le ispezioni, condotte dal Titolare del trattamento o da un auditor da esso incaricato.</li>
      </ul>

      <h2>5. Obblighi del titolare del trattamento</h2>
      <p>
        Il Titolare del trattamento è responsabile della determinazione di una base giuridica per lo
        Studio (compresi il consenso dei partecipanti e l&rsquo;approvazione etica/del comitato etico
        ove richiesta), della liceità delle proprie istruzioni e del contenuto di qualsiasi sondaggio
        esterno a cui rimanda. Il Titolare del trattamento non deve inserire categorie particolari di
        dati personali o dati direttamente identificativi nei campi di testo libero salvo che disponga
        di una base giuridica e di garanzie adeguate.
      </p>

      <h2>6. Misure tecniche e organizzative (art. 32)</h2>
      <ul>
        <li>Cifratura dei dati in transito (TLS); accesso limitato ad account autenticati e verificati per ruolo.</li>
        <li>I dati di ricerca dei partecipanti sono indicizzati tramite un Samply ID pseudonimo; i dati di contatto non sono mostrati ai ricercatori, salvo il caso in cui un partecipante scelga di aderire ai pagamenti.</li>
        <li>Le password sono conservate in forma sottoposta ad hashing (bcrypt); i token di sessione e API hanno durata limitata nel tempo.</li>
        <li>L&rsquo;accesso ai dati dei partecipanti e alle esportazioni è registrato in un registro di audit interno.</li>
        <li>Conservazione configurabile con cancellazione automatica dopo i periodi indicati nell&rsquo;Informativa sulla privacy.</li>
        <li>Riesame periodico delle misure; il Titolare del trattamento riconosce che queste possono essere aggiornate per mantenere un livello di sicurezza adeguato.</li>
      </ul>

      <h2>7. Sub-responsabili del trattamento</h2>
      <p>
        Samply utilizza i seguenti sub-responsabili del trattamento. L&rsquo;elenco attuale e aggiornato
        (con i dati condivisi e il meccanismo di trasferimento per ciascuno) è conservato nel registro
        dei sub-responsabili del trattamento del progetto.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — hosting del database.</li>
        <li><strong>Postmark</strong> — email transazionali e di notifica.</li>
        <li><strong>Stripe</strong> — compenso / pagamenti ai partecipanti (solo se abilitato).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — invio delle notifiche push.</li>
        <li><strong>Cloudflare Turnstile</strong> — protezione dai bot in fase di registrazione.</li>
        <li><strong>Università di Costanza</strong> — hosting web/app.</li>
      </ul>

      <h2>8. Trasferimenti internazionali</h2>
      <p>
        Qualora un sub-responsabile del trattamento tratti dati personali al di fuori del SEE, i
        trasferimenti avvengono unicamente sulla base di una decisione di adeguatezza, delle Clausole
        contrattuali tipo dell&rsquo;UE o di un altro meccanismo di trasferimento valido ai sensi del
        Capo V GDPR. Il Titolare del trattamento può richiedere la base di trasferimento attuale per
        ciascun sub-responsabile del trattamento.
      </p>

      <h2>9. Violazioni dei dati personali</h2>
      <p>
        Samply notifica al Titolare del trattamento senza ingiustificato ritardo dopo essere venuta a
        conoscenza di una violazione dei dati personali che riguardi i dati dello Studio del Titolare
        del trattamento, e fornisce le informazioni di cui il Titolare del trattamento necessita per
        adempiere ai propri obblighi di notifica ai sensi degli artt. 33&ndash;34.
      </p>

      <h2>10. Durata, risoluzione e cancellazione</h2>
      <p>
        Il presente DPA si applica per tutto il tempo in cui Samply tratta dati personali per conto del
        Titolare del trattamento. Alla risoluzione, il Titolare del trattamento può esportare i dati del
        proprio Studio e deve cancellare gli Studi di cui non ha più bisogno; i dati rimanenti sono
        cancellati secondo i periodi di conservazione indicati nell&rsquo;Informativa sulla privacy. I
        registri del consenso possono essere conservati come prova del consenso ove una base giuridica
        lo richieda.
      </p>

      <h2>11. Contatti</h2>
      <p>
        Contatto per la protezione dei dati: Yury Shevchenko, iScience / Università di Costanza —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Si vedano anche l&rsquo;{" "}
        <a href="/docs/policy">Informativa sulla privacy</a> e i <a href="/docs/terms">Termini e condizioni</a>.
      </p>
    </>
  );
}

function DpaContentFr() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Modèle — révision requise.</strong> Le présent accord de traitement des données
        (DPA) est fourni pour aider les chercheurs à respecter leurs obligations au titre de
        l&rsquo;article 28 du RGPD. Il doit être révisé par le délégué à la protection des données ou
        le conseil juridique de votre institution avant d&rsquo;être utilisé ou signé. Pour demander
        un exemplaire contresigné pour votre institution, contactez{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Dernière mise à jour :</strong> 18 juin 2026</p>

      <h2>1. Parties et rôles</h2>
      <p>
        Le présent DPA régit le traitement des données à caractère personnel effectué par Samply pour
        le compte du chercheur qui crée et mène une étude (« l&rsquo;Étude »).
      </p>
      <ul>
        <li>
          <strong>Responsable du traitement :</strong> le chercheur et/ou son institution, qui
          détermine les finalités et les moyens du traitement des données à caractère personnel
          collectées dans le cadre de son Étude.
        </li>
        <li>
          <strong>Sous-traitant :</strong> le groupe de recherche iScience, Université de Constance,
          Universitätsstraße 10, 78464 Konstanz, Allemagne, exploitant la plateforme Samply
          (« Samply »), qui traite les données à caractère personnel sur la base des instructions
          documentées du Responsable du traitement.
        </li>
      </ul>
      <p>
        Pour les données de compte et d&rsquo;exploitation propres à Samply (comptes des chercheurs,
        facturation), Samply agit en tant que responsable du traitement indépendant, comme décrit
        dans la <a href="/docs/policy">Politique de confidentialité</a>.
      </p>

      <h2>2. Objet, nature et finalité du traitement</h2>
      <p>
        Samply traite les données à caractère personnel uniquement pour fournir le Service :
        planifier et diffuser des notifications aux participants de l&rsquo;Étude, enregistrer les
        réponses des participants et les événements de notification, et mettre les données ainsi
        obtenues à la disposition du Responsable du traitement. Le traitement dure pendant toute la
        durée de l&rsquo;Étude et les périodes de conservation indiquées dans la{" "}
        <a href="/docs/policy">Politique de confidentialité</a>, sauf si le Responsable du traitement
        supprime les données plus tôt.
      </p>

      <h2>3. Catégories de personnes concernées et de données à caractère personnel</h2>
      <ul>
        <li><strong>Personnes concernées :</strong> les participants à l&rsquo;Étude ; le Responsable du traitement et tout collaborateur.</li>
        <li>
          <strong>Données à caractère personnel :</strong> identifiant pseudonyme du participant
          (Samply ID), adresse e-mail du compte et (facultativement) nom, jeton push de
          l&rsquo;appareil, langue et fuseau horaire, événements de diffusion et d&rsquo;interaction
          des notifications, métadonnées d&rsquo;enquête/de réponse, code et groupe facultatifs du
          participant, événements de localisation/géorepérage lorsque l&rsquo;Étude les active, et
          données de paiement lorsqu&rsquo;une compensation est configurée.
        </li>
        <li>
          <strong>Catégories particulières de données à caractère personnel :</strong> non
          collectées par la plateforme elle-même. Le Responsable du traitement est responsable de
          toute catégorie particulière de données à caractère personnel recueillie via des enquêtes
          externes liées.
        </li>
      </ul>

      <h2>4. Obligations du sous-traitant (art. 28, par. 3)</h2>
      <ul>
        <li><strong>Instructions documentées.</strong> Samply traite les données à caractère personnel des participants uniquement sur la base des instructions documentées du Responsable du traitement, y compris la configuration de l&rsquo;Étude, sauf obligation contraire imposée par le droit de l&rsquo;Union ou le droit d&rsquo;un État membre.</li>
        <li><strong>Confidentialité.</strong> Les personnes autorisées à traiter les données sont tenues à la confidentialité.</li>
        <li><strong>Sécurité.</strong> Samply met en œuvre des mesures techniques et organisationnelles appropriées conformément à l&rsquo;art. 32 (voir la section 6).</li>
        <li><strong>Sous-traitants ultérieurs.</strong> Samply fait appel aux sous-traitants ultérieurs énumérés à la section 7 et leur impose des obligations de protection des données équivalentes. Samply informera le Responsable du traitement de tout changement envisagé et lui donnera la possibilité de s&rsquo;y opposer.</li>
        <li><strong>Assistance en matière de droits des personnes concernées.</strong> Compte tenu de la nature du traitement, Samply aide le Responsable du traitement, par des mesures appropriées, à répondre aux demandes au titre du chapitre III du RGPD (accès, rectification, effacement, portabilité, opposition). Les participants peuvent également exporter leurs propres données et supprimer leur compte directement dans le Service.</li>
        <li><strong>Assistance au titre des art. 32 à 36.</strong> Samply aide le Responsable du traitement à garantir la sécurité du traitement, la notification des violations et les analyses d&rsquo;impact relatives à la protection des données.</li>
        <li><strong>Suppression ou restitution.</strong> À la cessation du Service ou sur instruction du Responsable du traitement, Samply supprime ou restitue les données à caractère personnel. La suppression d&rsquo;une Étude supprime ses réponses, les notifications en file d&rsquo;attente et planifiées, les enregistrements de tâches et les enregistrements de consentement ; voir « Effacement des études et des comptes » dans la <a href="/docs/policy">Politique de confidentialité</a>.</li>
        <li><strong>Audits.</strong> Samply met à disposition les informations nécessaires pour démontrer le respect de l&rsquo;art. 28 et permet la réalisation d&rsquo;audits, y compris des inspections, menés par le Responsable du traitement ou un auditeur qu&rsquo;il a mandaté, et y contribue.</li>
      </ul>

      <h2>5. Obligations du Responsable du traitement</h2>
      <p>
        Le Responsable du traitement est chargé d&rsquo;établir une base légale pour l&rsquo;Étude
        (y compris le consentement des participants et l&rsquo;approbation éthique/du comité
        d&rsquo;éthique lorsque cela est requis), de la licéité de ses instructions et du contenu de
        toute enquête externe à laquelle il renvoie. Le Responsable du traitement ne doit pas saisir
        de catégories particulières de données ni de données directement identifiantes dans les
        champs de texte libre à moins de disposer d&rsquo;une base légale et de garanties appropriées.
      </p>

      <h2>6. Mesures techniques et organisationnelles (art. 32)</h2>
      <ul>
        <li>Chiffrement des données en transit (TLS) ; accès restreint aux comptes authentifiés et contrôlés par rôle.</li>
        <li>Les données de recherche des participants sont indexées par un Samply ID pseudonyme ; les coordonnées ne sont pas montrées aux chercheurs, sauf lorsqu&rsquo;un participant opte pour les paiements.</li>
        <li>Les mots de passe sont stockés sous forme hachée (bcrypt) ; les jetons de session et d&rsquo;API ont une durée limitée.</li>
        <li>L&rsquo;accès aux données des participants et aux exports est consigné dans un journal d&rsquo;audit interne.</li>
        <li>Conservation configurable avec suppression automatique à l&rsquo;issue des périodes indiquées dans la Politique de confidentialité.</li>
        <li>Révision régulière des mesures ; le Responsable du traitement reconnaît que celles-ci peuvent être mises à jour afin de maintenir un niveau de sécurité approprié.</li>
      </ul>

      <h2>7. Sous-traitants ultérieurs</h2>
      <p>
        Samply fait appel aux sous-traitants ultérieurs suivants. La liste actuelle et tenue à jour
        (avec les données partagées et le mécanisme de transfert pour chacun) est conservée dans le
        registre des sous-traitants ultérieurs du projet.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — hébergement de la base de données.</li>
        <li><strong>Postmark</strong> — e-mails transactionnels et de notification.</li>
        <li><strong>Stripe</strong> — compensation / versements aux participants (uniquement lorsque activé).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — diffusion des notifications push.</li>
        <li><strong>Cloudflare Turnstile</strong> — protection anti-robots à l&rsquo;inscription.</li>
        <li><strong>Université de Constance</strong> — hébergement web/app.</li>
      </ul>

      <h2>8. Transferts internationaux</h2>
      <p>
        Lorsqu&rsquo;un sous-traitant ultérieur traite des données à caractère personnel en dehors de
        l&rsquo;EEE, les transferts n&rsquo;ont lieu que sur la base d&rsquo;une décision
        d&rsquo;adéquation, des clauses contractuelles types de l&rsquo;UE, ou d&rsquo;un autre
        mécanisme de transfert valable au titre du chapitre V du RGPD. Le Responsable du traitement
        peut demander la base de transfert actuelle pour chaque sous-traitant ultérieur.
      </p>

      <h2>9. Violations de données à caractère personnel</h2>
      <p>
        Samply informe le Responsable du traitement sans retard injustifié après avoir pris
        connaissance d&rsquo;une violation de données à caractère personnel affectant les données de
        l&rsquo;Étude du Responsable du traitement, et fournit les informations dont le Responsable du
        traitement a besoin pour satisfaire à ses propres obligations de notification au titre des
        art. 33 et 34.
      </p>

      <h2>10. Durée, résiliation et suppression</h2>
      <p>
        Le présent DPA s&rsquo;applique aussi longtemps que Samply traite des données à caractère
        personnel pour le compte du Responsable du traitement. À la résiliation, le Responsable du
        traitement peut exporter les données de son Étude et doit supprimer les Études dont il
        n&rsquo;a plus besoin ; les données restantes sont supprimées conformément aux périodes de
        conservation indiquées dans la Politique de confidentialité. Les enregistrements de
        consentement peuvent être conservés comme preuve du consentement lorsqu&rsquo;une base légale
        l&rsquo;exige.
      </p>

      <h2>11. Contact</h2>
      <p>
        Contact protection des données : Yury Shevchenko, iScience / Université de Constance —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Voir également la{" "}
        <a href="/docs/policy">Politique de confidentialité</a> et les <a href="/docs/terms">Conditions générales</a>.
      </p>
    </>
  );
}

function DpaContentEs() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Plantilla — requiere revisión.</strong> El presente Contrato de Encargo del
        Tratamiento (DPA) se facilita para ayudar a los investigadores a cumplir sus obligaciones en
        virtud del artículo 28 del RGPD. Debe ser revisado por el delegado de protección de datos o
        el asesor jurídico de su institución antes de utilizarlo o formalizarlo. Para solicitar una
        copia contrafirmada para su institución, contacte con{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Última actualización:</strong> 18 de junio de 2026</p>

      <h2>1. Partes y funciones</h2>
      <p>
        El presente DPA regula el tratamiento de datos personales realizado por Samply por cuenta
        del investigador que crea y ejecuta un estudio («el Estudio»).
      </p>
      <ul>
        <li>
          <strong>Responsable del tratamiento:</strong> el investigador o su institución, que
          determina los fines y medios del tratamiento de los datos personales recogidos a través de
          su Estudio.
        </li>
        <li>
          <strong>Encargado del tratamiento:</strong> el grupo de investigación iScience, Universidad
          de Constanza, Universitätsstraße 10, 78464 Konstanz, Alemania, operador de la plataforma
          Samply («Samply»), que trata los datos personales conforme a las instrucciones documentadas
          del Responsable del tratamiento.
        </li>
      </ul>
      <p>
        Respecto de los datos operativos y de las propias cuentas de Samply (cuentas de
        investigadores, facturación), Samply actúa como responsable del tratamiento independiente,
        tal como se describe en la <a href="/docs/policy">Política de Privacidad</a>.
      </p>

      <h2>2. Objeto, naturaleza y finalidad del tratamiento</h2>
      <p>
        Samply trata los datos personales únicamente para prestar el Servicio: programar y entregar
        notificaciones a los participantes del Estudio, registrar las respuestas de los participantes
        y los eventos de notificación, y poner los datos resultantes a disposición del Responsable
        del tratamiento. El tratamiento se prolonga durante la duración del Estudio y los plazos de
        conservación establecidos en la{" "}
        <a href="/docs/policy">Política de Privacidad</a>, salvo que el Responsable del tratamiento
        elimine los datos antes.
      </p>

      <h2>3. Categorías de interesados y de datos personales</h2>
      <ul>
        <li><strong>Interesados:</strong> los participantes del Estudio; el Responsable del tratamiento y cualquier colaborador.</li>
        <li>
          <strong>Datos personales:</strong> identificador seudonimizado del participante (Samply
          ID), correo electrónico de la cuenta y (opcionalmente) nombre, token de notificación push
          del dispositivo, idioma y zona horaria, eventos de entrega e interacción de las
          notificaciones, metadatos de encuestas/respuestas, código y grupo opcionales del
          participante, eventos de ubicación/geovallado cuando el Estudio los habilita, y datos de
          pago cuando se configura una compensación.
        </li>
        <li>
          <strong>Categorías especiales de datos personales:</strong> la propia plataforma no las
          recoge. El Responsable del tratamiento es responsable de cualquier categoría especial de
          datos personales recabada a través de encuestas externas enlazadas.
        </li>
      </ul>

      <h2>4. Obligaciones del encargado del tratamiento (art. 28, apdo. 3)</h2>
      <ul>
        <li><strong>Instrucciones documentadas.</strong> Samply trata los datos personales de los participantes únicamente conforme a las instrucciones documentadas del Responsable del tratamiento, incluida la configuración del Estudio, salvo que el Derecho de la UE o de un Estado miembro exija otra cosa.</li>
        <li><strong>Confidencialidad.</strong> Las personas autorizadas para tratar los datos están sujetas a un deber de confidencialidad.</li>
        <li><strong>Seguridad.</strong> Samply aplica medidas técnicas y organizativas apropiadas conforme al art. 32 (véase la Sección 6).</li>
        <li><strong>Subencargados del tratamiento.</strong> Samply recurre a los subencargados del tratamiento enumerados en la Sección 7 y les impone obligaciones de protección de datos equivalentes. Samply informará al Responsable del tratamiento de los cambios previstos y le dará la oportunidad de oponerse.</li>
        <li><strong>Asistencia con los derechos de los interesados.</strong> Teniendo en cuenta la naturaleza del tratamiento, Samply asiste al Responsable del tratamiento con medidas apropiadas para responder a las solicitudes en virtud del capítulo III del RGPD (acceso, rectificación, supresión, portabilidad, oposición). Los participantes también pueden exportar sus propios datos y eliminar su cuenta directamente en el Servicio.</li>
        <li><strong>Asistencia con los arts. 32 a 36.</strong> Samply asiste al Responsable del tratamiento a la hora de garantizar la seguridad del tratamiento, la notificación de violaciones de la seguridad y las evaluaciones de impacto relativas a la protección de datos.</li>
        <li><strong>Supresión o devolución.</strong> A la terminación del Servicio o por instrucción del Responsable del tratamiento, Samply suprime o devuelve los datos personales. La eliminación de un Estudio elimina sus respuestas, las notificaciones en cola y programadas, los registros de tareas y los registros de consentimiento; véase «Supresión de estudios y cuentas» en la <a href="/docs/policy">Política de Privacidad</a>.</li>
        <li><strong>Auditorías.</strong> Samply pone a disposición la información necesaria para demostrar el cumplimiento del art. 28 y permite y contribuye a la realización de auditorías, incluidas inspecciones, llevadas a cabo por el Responsable del tratamiento o por un auditor designado por este.</li>
      </ul>

      <h2>5. Obligaciones del responsable del tratamiento</h2>
      <p>
        El Responsable del tratamiento es responsable de establecer una base jurídica para el Estudio
        (incluidos el consentimiento de los participantes y la aprobación ética/del comité de ética
        cuando se requiera), de la licitud de sus instrucciones y del contenido de cualquier encuesta
        externa a la que enlace. El Responsable del tratamiento no debe introducir categorías
        especiales de datos personales ni datos directamente identificativos en campos de texto libre
        salvo que disponga de una base jurídica y de garantías apropiadas.
      </p>

      <h2>6. Medidas técnicas y organizativas (art. 32)</h2>
      <ul>
        <li>Cifrado de los datos en tránsito (TLS); acceso restringido a cuentas autenticadas y verificadas por rol.</li>
        <li>Los datos de investigación de los participantes se indexan mediante un Samply ID seudonimizado; los datos de contacto no se muestran a los investigadores, salvo cuando un participante opta por recibir pagos.</li>
        <li>Las contraseñas se almacenan cifradas mediante hash (bcrypt); los tokens de sesión y de API tienen una duración limitada en el tiempo.</li>
        <li>El acceso a los datos de los participantes y a las exportaciones se registra en un registro de auditoría interno.</li>
        <li>Conservación configurable con supresión automática tras los plazos indicados en la Política de Privacidad.</li>
        <li>Revisión periódica de las medidas; el Responsable del tratamiento reconoce que estas pueden actualizarse para mantener un nivel de seguridad apropiado.</li>
      </ul>

      <h2>7. Subencargados del tratamiento</h2>
      <p>
        Samply utiliza los siguientes subencargados del tratamiento. La lista actual y mantenida (con
        los datos compartidos y el mecanismo de transferencia de cada uno) se conserva en el registro
        de subencargados del tratamiento del proyecto.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — alojamiento de la base de datos.</li>
        <li><strong>Postmark</strong> — correo electrónico transaccional y de notificaciones.</li>
        <li><strong>Stripe</strong> — compensación / pagos a los participantes (solo cuando está habilitado).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — entrega de notificaciones push.</li>
        <li><strong>Cloudflare Turnstile</strong> — protección frente a bots en el registro.</li>
        <li><strong>Universidad de Constanza</strong> — alojamiento web/de la aplicación.</li>
      </ul>

      <h2>8. Transferencias internacionales</h2>
      <p>
        Cuando un subencargado del tratamiento trate datos personales fuera del EEE, las
        transferencias solo tendrán lugar sobre la base de una decisión de adecuación, de las
        Cláusulas Contractuales Tipo de la UE o de otro mecanismo de transferencia válido en virtud
        del capítulo V del RGPD. El Responsable del tratamiento puede solicitar la base de
        transferencia vigente para cada subencargado del tratamiento.
      </p>

      <h2>9. Violaciones de la seguridad de los datos personales</h2>
      <p>
        Samply notifica al Responsable del tratamiento sin dilación indebida tras tener conocimiento
        de una violación de la seguridad de los datos personales que afecte a los datos del Estudio
        del Responsable del tratamiento, y le proporciona la información que el Responsable del
        tratamiento necesita para cumplir sus propias obligaciones de notificación en virtud de los
        arts. 33 y 34.
      </p>

      <h2>10. Duración, terminación y supresión</h2>
      <p>
        El presente DPA se aplica mientras Samply trate datos personales por cuenta del Responsable
        del tratamiento. A la terminación, el Responsable del tratamiento podrá exportar los datos de
        su Estudio y deberá eliminar los Estudios que ya no necesite; los datos restantes se suprimen
        conforme a los plazos de conservación de la Política de Privacidad. Los registros de
        consentimiento podrán conservarse como prueba del consentimiento cuando una base jurídica lo
        exija.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Contacto de protección de datos: Yury Shevchenko, iScience / Universidad de Constanza —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Véanse también la{" "}
        <a href="/docs/policy">Política de Privacidad</a> y los <a href="/docs/terms">Términos y Condiciones</a>.
      </p>
    </>
  );
}

function DpaContentPt() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Modelo — revisão necessária.</strong> Este Acordo de Tratamento de Dados (DPA) é
        disponibilizado para ajudar os investigadores a cumprir as suas obrigações nos termos do
        artigo 28.º do RGPD. Deve ser revisto pelo encarregado da proteção de dados ou pelo
        consultor jurídico da sua instituição antes de ser invocado ou celebrado. Para solicitar uma
        cópia contra-assinada para a sua instituição, contacte{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Última atualização:</strong> 18 de junho de 2026</p>

      <h2>1. Partes e funções</h2>
      <p>
        Este DPA rege o tratamento de dados pessoais realizado pela Samply por conta do investigador
        que cria e executa um estudo («o Estudo»).
      </p>
      <ul>
        <li>
          <strong>Responsável pelo tratamento:</strong> o investigador e/ou a sua instituição, que
          determina as finalidades e os meios do tratamento dos dados pessoais recolhidos através do
          seu Estudo.
        </li>
        <li>
          <strong>Subcontratante:</strong> o grupo de investigação iScience, Universidade de
          Constança, Universitätsstraße 10, 78464 Konstanz, Alemanha, que opera a plataforma Samply
          («Samply»), que trata os dados pessoais com base nas instruções documentadas do responsável
          pelo tratamento.
        </li>
      </ul>
      <p>
        No que respeita aos dados operacionais e de conta próprios da Samply (contas de
        investigadores, faturação), a Samply atua como responsável pelo tratamento independente,
        conforme descrito na <a href="/docs/policy">Política de Privacidade</a>.
      </p>

      <h2>2. Objeto, natureza e finalidade do tratamento</h2>
      <p>
        A Samply trata dados pessoais unicamente para prestar o Serviço: agendar e entregar
        notificações aos participantes do Estudo, registar as respostas dos participantes e os
        eventos de notificação, e disponibilizar os dados resultantes ao responsável pelo tratamento.
        O tratamento perdura durante a duração do Estudo e os períodos de conservação estabelecidos
        na{" "}
        <a href="/docs/policy">Política de Privacidade</a>, salvo se o responsável pelo tratamento
        eliminar os dados antes.
      </p>

      <h2>3. Categorias de titulares dos dados e de dados pessoais</h2>
      <ul>
        <li><strong>Titulares dos dados:</strong> participantes do Estudo; o responsável pelo tratamento e quaisquer colaboradores.</li>
        <li>
          <strong>Dados pessoais:</strong> identificador pseudonimizado do participante (Samply ID),
          email da conta e (opcionalmente) nome, token de notificação push do dispositivo, idioma e
          fuso horário, eventos de entrega e interação de notificações, metadados de
          inquérito/resposta, código e grupo opcionais do participante, eventos de
          localização/geofencing quando o Estudo os ativa, e dados de pagamento quando é configurada
          uma compensação.
        </li>
        <li>
          <strong>Categorias especiais de dados pessoais:</strong> não são recolhidas pela própria
          plataforma. O responsável pelo tratamento é responsável por quaisquer categorias especiais
          de dados pessoais recolhidas através de inquéritos externos associados.
        </li>
      </ul>

      <h2>4. Obrigações do subcontratante (art. 28.º, n.º 3)</h2>
      <ul>
        <li><strong>Instruções documentadas.</strong> A Samply trata os dados pessoais dos participantes apenas com base nas instruções documentadas do responsável pelo tratamento, incluindo a configuração do Estudo, salvo se exigido de outro modo pelo direito da UE ou de um Estado-Membro.</li>
        <li><strong>Confidencialidade.</strong> As pessoas autorizadas a tratar os dados estão sujeitas a um dever de confidencialidade.</li>
        <li><strong>Segurança.</strong> A Samply implementa medidas técnicas e organizativas adequadas nos termos do art. 32.º (ver Secção 6).</li>
        <li><strong>Subcontratantes subsequentes.</strong> A Samply recorre aos subcontratantes subsequentes enumerados na Secção 7 e impõe-lhes obrigações de proteção de dados equivalentes. A Samply informará o responsável pelo tratamento de quaisquer alterações previstas e dar-lhe-á a oportunidade de se opor.</li>
        <li><strong>Assistência com os direitos dos titulares dos dados.</strong> Tendo em conta a natureza do tratamento, a Samply presta assistência ao responsável pelo tratamento, através de medidas adequadas, para dar resposta aos pedidos ao abrigo do capítulo III do RGPD (acesso, retificação, apagamento, portabilidade, oposição). Os participantes podem também exportar os seus próprios dados e eliminar a sua conta diretamente no Serviço.</li>
        <li><strong>Assistência com os arts. 32.º a 36.º.</strong> A Samply presta assistência ao responsável pelo tratamento na garantia da segurança do tratamento, na notificação de violações e nas avaliações de impacto sobre a proteção de dados.</li>
        <li><strong>Eliminação ou devolução.</strong> No termo do Serviço ou por instrução do responsável pelo tratamento, a Samply elimina ou devolve os dados pessoais. A eliminação de um Estudo remove as respetivas respostas, notificações em fila e agendadas, registos de tarefas e registos de consentimento; ver «Apagamento de estudos e contas» na <a href="/docs/policy">Política de Privacidade</a>.</li>
        <li><strong>Auditorias.</strong> A Samply disponibiliza as informações necessárias para demonstrar o cumprimento do art. 28.º e permite e contribui para auditorias, incluindo inspeções, conduzidas pelo responsável pelo tratamento ou por um auditor por este mandatado.</li>
      </ul>

      <h2>5. Obrigações do responsável pelo tratamento</h2>
      <p>
        O responsável pelo tratamento é responsável por estabelecer um fundamento jurídico para o
        Estudo (incluindo o consentimento dos participantes e a aprovação ética/IRB quando exigida),
        pela licitude das suas instruções e pelo conteúdo de qualquer inquérito externo a que se
        associe. O responsável pelo tratamento não deve introduzir categorias especiais de dados
        pessoais ou dados diretamente identificáveis em campos de texto livre, salvo se dispuser de
        um fundamento jurídico e de garantias adequadas.
      </p>

      <h2>6. Medidas técnicas e organizativas (art. 32.º)</h2>
      <ul>
        <li>Cifragem dos dados em trânsito (TLS); acesso restrito a contas autenticadas e com verificação de função.</li>
        <li>Os dados de investigação dos participantes são indexados por um Samply ID pseudonimizado; os dados de contacto não são mostrados aos investigadores, exceto quando um participante opta por receber pagamentos.</li>
        <li>As palavras-passe são armazenadas em forma de hash (bcrypt); os tokens de sessão e de API têm duração limitada.</li>
        <li>O acesso aos dados dos participantes e às exportações é registado num registo de auditoria interno.</li>
        <li>Conservação configurável com eliminação automática após os períodos indicados na Política de Privacidade.</li>
        <li>Revisão regular das medidas; o responsável pelo tratamento reconhece que estas podem ser atualizadas para manter um nível de segurança adequado.</li>
      </ul>

      <h2>7. Subcontratantes subsequentes</h2>
      <p>
        A Samply utiliza os seguintes subcontratantes subsequentes. A lista atual e atualizada (com
        os dados partilhados e o mecanismo de transferência de cada um) é mantida no registo de
        subcontratantes subsequentes do projeto.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — alojamento da base de dados.</li>
        <li><strong>Postmark</strong> — email transacional e de notificação.</li>
        <li><strong>Stripe</strong> — compensação / pagamentos aos participantes (apenas quando ativado).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — entrega de notificações push.</li>
        <li><strong>Cloudflare Turnstile</strong> — proteção contra bots no registo.</li>
        <li><strong>Universidade de Constança</strong> — alojamento web/da aplicação.</li>
      </ul>

      <h2>8. Transferências internacionais</h2>
      <p>
        Sempre que um subcontratante subsequente trate dados pessoais fora do EEE, as transferências
        realizam-se apenas com base numa decisão de adequação, nas Cláusulas Contratuais-Tipo da UE
        ou noutro mecanismo de transferência válido ao abrigo do capítulo V do RGPD. O responsável
        pelo tratamento pode solicitar o fundamento de transferência atual de cada subcontratante
        subsequente.
      </p>

      <h2>9. Violações de dados pessoais</h2>
      <p>
        A Samply notifica o responsável pelo tratamento sem demora injustificada após ter
        conhecimento de uma violação de dados pessoais que afete os dados do Estudo do responsável
        pelo tratamento, e fornece as informações de que o responsável pelo tratamento necessita para
        cumprir as suas próprias obrigações de notificação nos termos dos arts. 33.º e 34.º.
      </p>

      <h2>10. Vigência, cessação e eliminação</h2>
      <p>
        Este DPA aplica-se enquanto a Samply tratar dados pessoais por conta do responsável pelo
        tratamento. Na cessação, o responsável pelo tratamento pode exportar os dados do seu Estudo e
        deve eliminar os Estudos de que já não necessite; os dados remanescentes são eliminados de
        acordo com os períodos de conservação da Política de Privacidade. Os registos de
        consentimento podem ser conservados como prova de consentimento quando um fundamento jurídico
        o exija.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Contacto para proteção de dados: Yury Shevchenko, iScience / Universidade de Constança —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Ver também a{" "}
        <a href="/docs/policy">Política de Privacidade</a> e os <a href="/docs/terms">Termos e Condições</a>.
      </p>
    </>
  );
}

function DpaContentJa() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>テンプレート — 確認が必要です。</strong> 本データ処理契約（DPA）は、研究者が
        GDPR 第28条に基づく義務を果たすことを支援するために提供されるものです。これに依拠しまたはこれを締結する前に、
        所属機関のデータ保護責任者または法務顧問による確認を受けるべきです。所属機関のための連署済みの写しを請求するには、次の連絡先までご連絡ください。{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>。
      </div>

      <p><strong>最終更新：</strong> 2026年6月18日</p>

      <h2>1. 当事者および役割</h2>
      <p>
        本 DPA は、研究を作成し実施する研究者（「本研究」）に代わって Samply が行う個人データの処理を規律します。
      </p>
      <ul>
        <li>
          <strong>管理者：</strong> 研究者およびその所属機関であって、その研究を通じて収集される個人データの処理の目的および方法を決定する者。
        </li>
        <li>
          <strong>処理者：</strong> Samply プラットフォームを運営する iScience 研究グループ、コンスタンツ大学、
          Universitätsstraße 10, 78464 Konstanz, ドイツ
          （「Samply」）であって、管理者の文書化された指示に基づいて個人データを処理する者。
        </li>
      </ul>
      <p>
        Samply 自身のアカウントおよび運用データ（研究者アカウント、請求）については、Samply は
        <a href="/docs/policy">プライバシーポリシー</a>に記載のとおり独立した管理者として行動します。
      </p>

      <h2>2. 処理の対象事項、性質および目的</h2>
      <p>
        Samply は、本サービスの提供のためにのみ個人データを処理します。すなわち、研究参加者への通知のスケジュール設定および配信、
        参加者の回答および通知イベントの記録、ならびに結果として得られるデータの管理者への提供です。処理は、管理者がより早期にデータを削除しない限り、本研究の期間および{" "}
        <a href="/docs/policy">プライバシーポリシー</a>に定める保存期間にわたって継続します。
      </p>

      <h2>3. データ主体および個人データの区分</h2>
      <ul>
        <li><strong>データ主体：</strong> 研究参加者、管理者およびすべての協力者。</li>
        <li>
          <strong>個人データ：</strong> 仮名化された参加者識別子（Samply ID）、アカウントの
          email および（任意で）氏名、デバイスのプッシュトークン、言語およびタイムゾーン、通知の
          配信および操作イベント、調査／回答のメタデータ、任意の参加者コードおよびグループ、本研究が有効にしている場合の位置情報／ジオフェンシングイベント、
          ならびに報酬が設定されている場合の支払いデータ。
        </li>
        <li>
          <strong>特別な種類の個人データ：</strong> プラットフォーム自体では収集しません。リンクされた外部調査を介して収集される特別な種類の個人データについては、
          管理者が責任を負います。
        </li>
      </ul>

      <h2>4. 処理者の義務（第28条(3)）</h2>
      <ul>
        <li><strong>文書化された指示。</strong> Samply は、EU またはその加盟国の法により別途要求される場合を除き、本研究の設定を含む管理者の文書化された指示に基づいてのみ参加者の個人データを処理します。</li>
        <li><strong>秘密保持。</strong> データを処理する権限を有する者は、秘密保持の義務を負います。</li>
        <li><strong>セキュリティ。</strong> Samply は、第32条に従って適切な技術的および組織的措置を実施します（第6節を参照）。</li>
        <li><strong>再処理者。</strong> Samply は、第7節に列挙する再処理者を関与させ、それらに同等のデータ保護義務を課します。Samply は、予定される変更について管理者に通知し、管理者に異議を申し立てる機会を与えます。</li>
        <li><strong>データ主体の権利への支援。</strong> 処理の性質を考慮して、Samply は、GDPR 第3章に基づく請求（アクセス、訂正、消去、可搬性、異議）に対応するための適切な措置により管理者を支援します。参加者はまた、本サービス内で直接、自らのデータをエクスポートし、自らのアカウントを削除することができます。</li>
        <li><strong>第32条〜第36条への支援。</strong> Samply は、処理のセキュリティの確保、侵害の通知、およびデータ保護影響評価について管理者を支援します。</li>
        <li><strong>削除または返却。</strong> 本サービスの終了時または管理者の指示により、Samply は個人データを削除または返却します。研究を削除すると、その回答、キューに入れられたおよびスケジュールされた通知、ジョブ記録、ならびに同意記録が除去されます。<a href="/docs/policy">プライバシーポリシー</a>の「研究およびアカウントの消去」を参照してください。</li>
        <li><strong>監査。</strong> Samply は、第28条の遵守を証明するために必要な情報を提供し、管理者またはその委任した監査人が実施する監査（検査を含む）を認め、これに協力します。</li>
      </ul>

      <h2>5. 管理者の義務</h2>
      <p>
        管理者は、本研究のための適法な根拠の確立（必要な場合には参加者の同意および倫理／IRB の承認を含む）、その指示の適法性、
        ならびにリンクするすべての外部調査の内容について責任を負います。管理者は、適法な根拠および適切な保護措置を有する場合を除き、
        特別な種類の個人データまたは直接識別可能なデータを自由記述欄に入力してはなりません。
      </p>

      <h2>6. 技術的および組織的措置（第32条）</h2>
      <ul>
        <li>転送中のデータの暗号化（TLS）。アクセスは、認証され、役割が確認されたアカウントに制限されます。</li>
        <li>参加者の研究データは、仮名化された Samply ID によってキー付けされます。連絡先の詳細は、参加者が支払いを選択する場合を除き、研究者に表示されません。</li>
        <li>パスワードはハッシュ化して保存されます（bcrypt）。セッションおよび API トークンには有効期限があります。</li>
        <li>参加者データおよびエクスポートへのアクセスは、内部監査ログに記録されます。</li>
        <li>プライバシーポリシーに記載された期間の経過後に自動削除される、設定可能な保存。</li>
        <li>措置の定期的な見直し。管理者は、適切なレベルのセキュリティを維持するためにこれらが更新される場合があることを承諾します。</li>
      </ul>

      <h2>7. 再処理者</h2>
      <p>
        Samply は、以下の再処理者を使用します。最新の維持管理されたリスト（各々について共有されるデータおよび移転の仕組みを含む）は、
        プロジェクトの再処理者登録簿に保管されています。
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — データベースのホスティング。</li>
        <li><strong>Postmark</strong> — トランザクションおよび通知の email。</li>
        <li><strong>Stripe</strong> — 参加者への報酬／支払い（有効な場合のみ）。</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — プッシュ通知の配信。</li>
        <li><strong>Cloudflare Turnstile</strong> — サインアップ時のボット対策。</li>
        <li><strong>コンスタンツ大学</strong> — ウェブ／アプリのホスティング。</li>
      </ul>

      <h2>8. 国際移転</h2>
      <p>
        再処理者が EEA 外で個人データを処理する場合、移転は、十分性認定、EU 標準契約条項、または GDPR 第5章に基づくその他の有効な移転の仕組みを根拠としてのみ行われます。
        管理者は、各再処理者について現在の移転の根拠を請求することができます。
      </p>

      <h2>9. 個人データ侵害</h2>
      <p>
        Samply は、管理者の研究データに影響を及ぼす個人データ侵害を認識した後、不当に遅滞することなく管理者に通知し、
        管理者が第33条・第34条に基づく自らの通知義務を果たすために必要な情報を提供します。
      </p>

      <h2>10. 期間、終了および削除</h2>
      <p>
        本 DPA は、Samply が管理者に代わって個人データを処理する限り適用されます。
        終了時には、管理者はその研究データをエクスポートすることができ、不要となった研究を削除しなければなりません。残余のデータは、プライバシーポリシーの保存期間に従って削除されます。
        法的根拠が必要とする場合、同意記録は同意の証拠として保存されることがあります。
      </p>

      <h2>11. 連絡先</h2>
      <p>
        データ保護に関する連絡先：Yury Shevchenko、iScience／コンスタンツ大学 —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>。また、{" "}
        <a href="/docs/policy">プライバシーポリシー</a>および<a href="/docs/terms">利用規約</a>も参照してください。
      </p>
    </>
  );
}

function DpaContentAr() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>نموذج — يستلزم المراجعة.</strong> اتفاقية معالجة البيانات (DPA) هذه
        مُقدَّمة لمساعدة الباحثين على الوفاء بالتزاماتهم بموجب المادة 28 من اللائحة. وينبغي
        أن يراجعها مسؤول حماية البيانات في مؤسستك أو المستشار القانوني قبل
        الاعتماد عليها أو توقيعها. ولطلب نسخة موقَّعة بالتوقيع المضاد لمؤسستك، يُرجى التواصل عبر{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>آخر تحديث:</strong> 18 يونيو 2026</p>

      <h2>1. الأطراف والأدوار</h2>
      <p>
        تحكم اتفاقية معالجة البيانات هذه معالجة البيانات الشخصية التي تجريها Samply نيابةً عن
        الباحث الذي ينشئ الدراسة ويديرها (»الدراسة«).
      </p>
      <ul>
        <li>
          <strong>المتحكم:</strong> الباحث و/أو مؤسسته، الذي يحدد
          أغراض ووسائل معالجة البيانات الشخصية المجمَّعة من خلال دراسته.
        </li>
        <li>
          <strong>المعالِج:</strong> مجموعة الأبحاث iScience، جامعة كونستانس،
          Universitätsstraße 10, 78464 Konstanz، ألمانيا، التي تُشغِّل منصة Samply
          (»Samply«)، والتي تعالج البيانات الشخصية بناءً على التعليمات الموثقة الصادرة عن
          المتحكم.
        </li>
      </ul>
      <p>
        فيما يتعلق بحساب Samply الخاص وبياناتها التشغيلية (حسابات الباحثين، الفوترة)، تتصرف Samply
        بصفتها متحكماً مستقلاً كما هو موضَّح في <a href="/docs/policy">سياسة الخصوصية</a>.
      </p>

      <h2>2. موضوع المعالجة وطبيعتها والغرض منها</h2>
      <p>
        تعالج Samply البيانات الشخصية لغرض وحيد هو تقديم الخدمة: جدولة الإشعارات وإرسالها
        إلى المشاركين في الدراسة، وتسجيل ردود المشاركين وأحداث
        الإشعارات، وإتاحة البيانات الناتجة للمتحكم. وتستمر المعالجة
        طوال مدة الدراسة وفترات الاحتفاظ المنصوص عليها في{" "}
        <a href="/docs/policy">سياسة الخصوصية</a>، ما لم يحذف المتحكم البيانات قبل ذلك.
      </p>

      <h2>3. فئات أصحاب البيانات والبيانات الشخصية</h2>
      <ul>
        <li><strong>أصحاب البيانات:</strong> المشاركون في الدراسة؛ المتحكم وأي متعاونين معه.</li>
        <li>
          <strong>البيانات الشخصية:</strong> المُعرِّف المستعار للمشارك (Samply ID)، والبريد
          الإلكتروني للحساب و(اختيارياً) الاسم، ورمز الدفع الخاص بالجهاز، واللغة والمنطقة الزمنية،
          وأحداث تسليم الإشعارات والتفاعل معها، وبيانات وصفية عن الاستبيان/الردود، ورمز المشارك
          الاختياري والمجموعة، وأحداث الموقع/السياج الجغرافي حيثما تُفعِّلها الدراسة، وبيانات
          الدفع حيثما جرى تكوين التعويض.
        </li>
        <li>
          <strong>الفئات الخاصة من البيانات الشخصية:</strong> لا تجمعها المنصة ذاتها.
          ويتحمل المتحكم المسؤولية عن أي فئات خاصة من البيانات الشخصية تُجمَع عبر
          استبيانات خارجية مرتبطة.
        </li>
      </ul>

      <h2>4. التزامات المعالِج (المادة 28(3))</h2>
      <ul>
        <li><strong>التعليمات الموثقة.</strong> تعالج Samply البيانات الشخصية للمشاركين بناءً على التعليمات الموثقة الصادرة عن المتحكم فقط، بما في ذلك تكوين الدراسة، ما لم يقتضِ قانون الاتحاد الأوروبي أو قانون دولة عضو خلاف ذلك.</li>
        <li><strong>السرية.</strong> يلتزم الأشخاص المخوَّلون بمعالجة البيانات بالسرية.</li>
        <li><strong>الأمن.</strong> تطبق Samply التدابير التقنية والتنظيمية المناسبة عملاً بالمادة 32 (انظر القسم 6).</li>
        <li><strong>المعالِجون الفرعيون.</strong> تستعين Samply بالمعالِجين الفرعيين المدرجين في القسم 7 وتفرض عليهم التزامات مكافئة لحماية البيانات. وستُعلم Samply المتحكم بالتغييرات المزمعة وتمنحه فرصة الاعتراض.</li>
        <li><strong>المساعدة في حقوق أصحاب البيانات.</strong> مع مراعاة طبيعة المعالجة، تساعد Samply المتحكم بتدابير مناسبة للاستجابة للطلبات المقدَّمة بموجب الفصل الثالث من اللائحة (الوصول، والتصحيح، والمحو، وقابلية النقل، والاعتراض). ويمكن للمشاركين أيضاً تصدير بياناتهم الخاصة وحذف حساباتهم مباشرةً في الخدمة.</li>
        <li><strong>المساعدة في المواد 32–36.</strong> تساعد Samply المتحكم في ضمان أمن المعالجة، والإخطار بالانتهاكات، وتقييمات أثر حماية البيانات.</li>
        <li><strong>الحذف أو الإرجاع.</strong> عند إنهاء الخدمة أو بناءً على تعليمات المتحكم، تحذف Samply البيانات الشخصية أو تعيدها. ويؤدي حذف الدراسة إلى إزالة ردودها والإشعارات المُدرَجة في قائمة الانتظار والمجدولة وسجلات المهام وسجلات الموافقة؛ انظر »محو الدراسات والحسابات« في <a href="/docs/policy">سياسة الخصوصية</a>.</li>
        <li><strong>عمليات التدقيق.</strong> تتيح Samply المعلومات اللازمة لإثبات الامتثال للمادة 28 وتسمح بعمليات التدقيق وتسهم فيها، بما في ذلك عمليات التفتيش التي يجريها المتحكم أو مدقق يفوضه.</li>
      </ul>

      <h2>5. التزامات المتحكم</h2>
      <p>
        يتحمل المتحكم مسؤولية إرساء أساس قانوني للدراسة (بما في ذلك
        موافقة المشاركين والموافقة الأخلاقية/موافقة مجلس المراجعة المؤسسية حيثما لزم)، وعن مشروعية
        تعليماته، وعن محتوى أي استبيان خارجي يرتبط به. ويجب على المتحكم ألا
        يُدخل فئات خاصة من البيانات أو بيانات محددة للهوية مباشرةً في حقول النص الحر ما لم يكن لديه
        أساس قانوني وضمانات مناسبة.
      </p>

      <h2>6. التدابير التقنية والتنظيمية (المادة 32)</h2>
      <ul>
        <li>تشفير البيانات أثناء النقل (TLS)؛ ويقتصر الوصول على الحسابات المُصادَق عليها والمتحقَّق من أدوارها.</li>
        <li>تُفهرَس بيانات أبحاث المشاركين بواسطة مُعرِّف مستعار Samply ID؛ ولا تُعرَض بيانات الاتصال على الباحثين إلا حيث يختار المشارك المشاركة في المدفوعات.</li>
        <li>تُخزَّن كلمات المرور مجزّأة (bcrypt)؛ وتكون رموز الجلسات وواجهة برمجة التطبيقات محدودة زمنياً.</li>
        <li>يُسجَّل الوصول إلى بيانات المشاركين وعمليات التصدير في سجل تدقيق داخلي.</li>
        <li>احتفاظ قابل للتكوين مع حذف تلقائي بعد الفترات المنصوص عليها في سياسة الخصوصية.</li>
        <li>مراجعة منتظمة للتدابير؛ ويقر المتحكم بأنها قد تُحدَّث للحفاظ على مستوى مناسب من الأمن.</li>
      </ul>

      <h2>7. المعالِجون الفرعيون</h2>
      <p>
        تستخدم Samply المعالِجين الفرعيين التاليين. وتُحفَظ القائمة الحالية والمُحدَّثة (مع بيان
        البيانات المشتركة وآلية النقل لكل منها) في سجل المعالِجين الفرعيين الخاص بالمشروع.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — استضافة قواعد البيانات.</li>
        <li><strong>Postmark</strong> — البريد الإلكتروني للمعاملات والإشعارات.</li>
        <li><strong>Stripe</strong> — تعويض المشاركين / المدفوعات (فقط عند التفعيل).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — تسليم الإشعارات الفورية.</li>
        <li><strong>Cloudflare Turnstile</strong> — الحماية من الروبوتات عند التسجيل.</li>
        <li><strong>جامعة كونستانس</strong> — استضافة الموقع/التطبيق.</li>
      </ul>

      <h2>8. عمليات النقل الدولية</h2>
      <p>
        حيثما يعالج معالِج فرعي البيانات الشخصية خارج المنطقة الاقتصادية الأوروبية، تجري عمليات النقل
        فقط على أساس قرار كفاية، أو الشروط التعاقدية النموذجية للاتحاد الأوروبي، أو آلية نقل صالحة
        أخرى بموجب الفصل الخامس من اللائحة. ويمكن للمتحكم طلب أساس النقل الحالي
        لكل معالِج فرعي.
      </p>

      <h2>9. انتهاكات البيانات الشخصية</h2>
      <p>
        تُخطِر Samply المتحكم دون تأخير لا مبرر له بعد علمها بانتهاك البيانات
        الشخصية الذي يؤثر في بيانات دراسة المتحكم، وتوفر المعلومات التي يحتاجها
        المتحكم للوفاء بالتزاماته الخاصة بالإخطار بموجب المادتين 33&ndash;34.
      </p>

      <h2>10. المدة والإنهاء والحذف</h2>
      <p>
        تسري اتفاقية معالجة البيانات هذه طالما تعالج Samply البيانات الشخصية نيابةً عن المتحكم.
        وعند الإنهاء، يجوز للمتحكم تصدير بيانات دراسته ويجب عليه حذف الدراسات التي لم
        يعد بحاجة إليها؛ وتُحذف البيانات المتبقية وفقاً لفترات الاحتفاظ المنصوص عليها في سياسة
        الخصوصية. ويجوز الاحتفاظ بسجلات الموافقة كإثبات للموافقة حيثما يقتضي أساس قانوني ذلك.
      </p>

      <h2>11. جهة الاتصال</h2>
      <p>
        جهة الاتصال المعنية بحماية البيانات: Yury Shevchenko، iScience / جامعة كونستانس —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. انظر أيضاً{" "}
        <a href="/docs/policy">سياسة الخصوصية</a> و<a href="/docs/terms">الأحكام والشروط</a>.
      </p>
    </>
  );
}

function DpaContentPl() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Szablon — wymaga weryfikacji.</strong> Niniejsza umowa powierzenia przetwarzania danych osobowych (DPA) została
        udostępniona, aby pomóc badaczom w wypełnieniu ich obowiązków wynikających z art. 28 RODO. Przed
        oparciem się na niej lub jej zawarciem powinna zostać zweryfikowana przez inspektora ochrony danych
        lub radcę prawnego Twojej instytucji. Aby zamówić kontrasygnowany egzemplarz dla swojej instytucji, skontaktuj się pod adresem{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>.
      </div>

      <p><strong>Ostatnia aktualizacja:</strong> 18 czerwca 2026</p>

      <h2>1. Strony i role</h2>
      <p>
        Niniejsza umowa DPA reguluje przetwarzanie danych osobowych dokonywane przez Samply w imieniu
        badacza, który tworzy i prowadzi badanie (&quot;Badanie&quot;).
      </p>
      <ul>
        <li>
          <strong>Administrator:</strong> badacz lub jego instytucja, którzy określają
          cele i sposoby przetwarzania danych osobowych zebranych w ramach ich Badania.
        </li>
        <li>
          <strong>Podmiot przetwarzający:</strong> grupa badawcza iScience, Uniwersytet w Konstancji,
          Universitätsstraße 10, 78464 Konstanz, Niemcy, obsługująca platformę Samply
          (&quot;Samply&quot;), która przetwarza dane osobowe na udokumentowane
          polecenia Administratora.
        </li>
      </ul>
      <p>
        W odniesieniu do własnych danych kont i danych operacyjnych Samply (konta badaczy, rozliczenia) Samply
        działa jako niezależny administrator, jak opisano w <a href="/docs/policy">Polityce prywatności</a>.
      </p>

      <h2>2. Przedmiot, charakter i cel przetwarzania</h2>
      <p>
        Samply przetwarza dane osobowe wyłącznie w celu świadczenia Usługi: planowania i dostarczania
        powiadomień uczestnikom Badania, rejestrowania odpowiedzi uczestników oraz
        zdarzeń powiadomień, a także udostępniania powstałych danych Administratorowi. Przetwarzanie
        trwa przez czas trwania Badania oraz przez okresy przechowywania określone w{" "}
        <a href="/docs/policy">Polityce prywatności</a>, chyba że Administrator usunie dane wcześniej.
      </p>

      <h2>3. Kategorie osób, których dane dotyczą, oraz danych osobowych</h2>
      <ul>
        <li><strong>Osoby, których dane dotyczą:</strong> uczestnicy Badania; Administrator oraz wszelcy współpracownicy.</li>
        <li>
          <strong>Dane osobowe:</strong> pseudonimowy identyfikator uczestnika (Samply ID), adres e-mail
          konta oraz (opcjonalnie) imię i nazwisko, token push urządzenia, język i strefa czasowa, zdarzenia
          dostarczania i interakcji z powiadomieniami, metadane ankiet/odpowiedzi, opcjonalny kod uczestnika i
          grupa, zdarzenia lokalizacji/geofencingu tam, gdzie Badanie je włącza, oraz dane płatności tam, gdzie
          skonfigurowano wynagrodzenie.
        </li>
        <li>
          <strong>Szczególne kategorie danych osobowych:</strong> nie są zbierane przez samą
          platformę. Administrator jest odpowiedzialny za wszelkie szczególne kategorie danych osobowych zebrane za pośrednictwem powiązanych zewnętrznych
          ankiet.
        </li>
      </ul>

      <h2>4. Obowiązki podmiotu przetwarzającego (art. 28 ust. 3)</h2>
      <ul>
        <li><strong>Udokumentowane polecenia.</strong> Samply przetwarza dane osobowe uczestników wyłącznie na udokumentowane polecenia Administratora, w tym zgodnie z konfiguracją Badania, chyba że prawo UE lub prawo państwa członkowskiego stanowi inaczej.</li>
        <li><strong>Poufność.</strong> Osoby upoważnione do przetwarzania danych są zobowiązane do zachowania poufności.</li>
        <li><strong>Bezpieczeństwo.</strong> Samply wdraża odpowiednie środki techniczne i organizacyjne zgodnie z art. 32 (zob. Sekcja 6).</li>
        <li><strong>Dalsze podmioty przetwarzające.</strong> Samply korzysta z dalszych podmiotów przetwarzających wymienionych w Sekcji 7 i nakłada na nie równoważne obowiązki w zakresie ochrony danych. Samply poinformuje Administratora o zamierzonych zmianach i umożliwi Administratorowi wyrażenie sprzeciwu.</li>
        <li><strong>Pomoc w realizacji praw osób, których dane dotyczą.</strong> Uwzględniając charakter przetwarzania, Samply pomaga Administratorowi za pomocą odpowiednich środków w odpowiadaniu na żądania na podstawie rozdziału III RODO (dostęp, sprostowanie, usunięcie, przenoszenie, sprzeciw). Uczestnicy mogą również samodzielnie wyeksportować swoje dane i usunąć swoje konto bezpośrednio w Usłudze.</li>
        <li><strong>Pomoc w zakresie art. 32–36.</strong> Samply pomaga Administratorowi w zapewnieniu bezpieczeństwa przetwarzania, zgłaszaniu naruszeń oraz ocenach skutków dla ochrony danych.</li>
        <li><strong>Usunięcie lub zwrot.</strong> Po zakończeniu świadczenia Usługi lub na polecenie Administratora Samply usuwa lub zwraca dane osobowe. Usunięcie Badania powoduje usunięcie jego odpowiedzi, zakolejkowanych i zaplanowanych powiadomień, rekordów zadań oraz rekordów zgód; zob. &quot;Usuwanie badań i kont&quot; w <a href="/docs/policy">Polityce prywatności</a>.</li>
        <li><strong>Audyty.</strong> Samply udostępnia informacje niezbędne do wykazania zgodności z art. 28 oraz umożliwia przeprowadzanie audytów, w tym inspekcji, przez Administratora lub audytora przez niego upoważnionego, i przyczynia się do nich.</li>
      </ul>

      <h2>5. Obowiązki administratora</h2>
      <p>
        Administrator jest odpowiedzialny za ustalenie podstawy prawnej Badania (w tym zgody
        uczestnika oraz zatwierdzenia etycznego/komisji bioetycznej tam, gdzie jest to wymagane), za zgodność z prawem jego
        poleceń oraz za treść wszelkich zewnętrznych ankiet, do których się odwołuje. Administrator nie może
        wprowadzać szczególnych kategorii danych osobowych ani danych bezpośrednio identyfikujących do pól tekstowych, chyba że posiada
        podstawę prawną i odpowiednie zabezpieczenia.
      </p>

      <h2>6. Środki techniczne i organizacyjne (art. 32)</h2>
      <ul>
        <li>Szyfrowanie danych w tranzycie (TLS); dostęp ograniczony do uwierzytelnionych kont ze sprawdzaniem ról.</li>
        <li>Dane badawcze uczestników są kluczowane pseudonimowym Samply ID; dane kontaktowe nie są udostępniane badaczom, z wyjątkiem sytuacji, gdy uczestnik zdecyduje się na płatności.</li>
        <li>Hasła są przechowywane w postaci zahaszowanej (bcrypt); tokeny sesji i API mają ograniczony czas ważności.</li>
        <li>Dostęp do danych uczestników i eksportów jest rejestrowany w wewnętrznym dzienniku audytu.</li>
        <li>Konfigurowalne przechowywanie z automatycznym usuwaniem po okresach określonych w Polityce prywatności.</li>
        <li>Regularny przegląd środków; Administrator przyjmuje do wiadomości, że mogą one być aktualizowane w celu utrzymania odpowiedniego poziomu bezpieczeństwa.</li>
      </ul>

      <h2>7. Dalsze podmioty przetwarzające</h2>
      <p>
        Samply korzysta z następujących dalszych podmiotów przetwarzających. Aktualny, aktualizowany wykaz (wraz z udostępnianymi danymi
        oraz mechanizmem przekazywania dla każdego z nich) jest prowadzony w rejestrze dalszych podmiotów przetwarzających projektu.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — hosting bazy danych.</li>
        <li><strong>Postmark</strong> — transakcyjna i powiadomieniowa poczta e-mail.</li>
        <li><strong>Stripe</strong> — wynagrodzenia / wypłaty dla uczestników (tylko gdy włączone).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — dostarczanie powiadomień push.</li>
        <li><strong>Cloudflare Turnstile</strong> — ochrona przed botami przy rejestracji.</li>
        <li><strong>Uniwersytet w Konstancji</strong> — hosting strony/aplikacji.</li>
      </ul>

      <h2>8. Przekazywanie międzynarodowe</h2>
      <p>
        Jeżeli dalszy podmiot przetwarzający przetwarza dane osobowe poza EOG, przekazywanie odbywa się wyłącznie na
        podstawie decyzji stwierdzającej odpowiedni stopień ochrony, standardowych klauzul umownych UE lub innego ważnego
        mechanizmu przekazywania na podstawie rozdziału V RODO. Administrator może zażądać informacji o aktualnej podstawie przekazywania
        dla każdego dalszego podmiotu przetwarzającego.
      </p>

      <h2>9. Naruszenia ochrony danych osobowych</h2>
      <p>
        Samply powiadamia Administratora bez zbędnej zwłoki po powzięciu wiadomości o naruszeniu ochrony danych osobowych
        dotyczącym danych Badania Administratora oraz przekazuje informacje, których
        Administrator potrzebuje do wypełnienia własnych obowiązków w zakresie zgłaszania na podstawie art. 33–34.
      </p>

      <h2>10. Okres obowiązywania, rozwiązanie i usunięcie</h2>
      <p>
        Niniejsza umowa DPA obowiązuje tak długo, jak długo Samply przetwarza dane osobowe w imieniu Administratora.
        Po rozwiązaniu Administrator może wyeksportować dane swojego Badania i musi usunąć Badania, których już
        nie potrzebuje; pozostałe dane są usuwane zgodnie z okresami przechowywania określonymi w Polityce
        prywatności. Rekordy zgód mogą być zachowane jako dowód wyrażenia zgody, jeżeli wymaga tego podstawa prawna.
      </p>

      <h2>11. Kontakt</h2>
      <p>
        Kontakt w sprawach ochrony danych: Yury Shevchenko, iScience / Uniwersytet w Konstancji —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Zobacz także{" "}
        <a href="/docs/policy">Politykę prywatności</a> oraz <a href="/docs/terms">Regulamin &amp; Warunki</a>.
      </p>
    </>
  );
}

function DpaContentTr() {
  return (
    <>
      <div
        style={{
          background: "rgba(214,90,48,.08)",
          border: "1px solid rgba(214,90,48,.25)",
          borderRadius: "1rem",
          padding: "1.2rem 1.6rem",
          marginBottom: "2rem",
          fontSize: "1.25rem",
          color: "var(--ink)",
          lineHeight: 1.55,
        }}
      >
        <strong>Şablon — inceleme gereklidir.</strong> Bu Veri İşleme Sözleşmesi (DPA),
        araştırmacıların GDPR 28. madde kapsamındaki yükümlülüklerini yerine getirmelerine yardımcı
        olmak amacıyla sunulmaktadır. Bu belgeye dayanılmadan veya imzalanmadan önce kurumunuzun veri
        koruma görevlisi ya da hukuk müşaviri tarafından incelenmelidir. Kurumunuz için karşı imzalı
        bir kopya talep etmek için{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a> adresiyle iletişime geçin.
      </div>

      <p><strong>Son güncelleme:</strong> 18 Haziran 2026</p>

      <h2>1. Taraflar ve roller</h2>
      <p>
        Bu DPA, bir çalışma oluşturan ve yürüten araştırmacı (&quot;Çalışma&quot;) adına Samply
        tarafından gerçekleştirilen kişisel verilerin işlenmesini düzenler.
      </p>
      <ul>
        <li>
          <strong>Veri sorumlusu:</strong> Çalışmaları aracılığıyla toplanan kişisel verilerin
          işlenme amaçlarını ve araçlarını belirleyen araştırmacı ve/veya kurumu.
        </li>
        <li>
          <strong>Veri işleyen:</strong> Samply platformunu işleten (&quot;Samply&quot;) ve kişisel
          verileri veri sorumlusunun belgelenmiş talimatları doğrultusunda işleyen iScience araştırma
          grubu, Konstanz Üniversitesi, Universitätsstraße 10, 78464 Konstanz, Almanya.
        </li>
      </ul>
      <p>
        Samply&rsquo;nin kendi hesap ve operasyonel verileri (araştırmacı hesapları, faturalandırma)
        için Samply, <a href="/docs/policy">Gizlilik Politikası</a>&rsquo;nda açıklandığı üzere bağımsız
        bir veri sorumlusu olarak hareket eder.
      </p>

      <h2>2. İşlemenin konusu, niteliği ve amacı</h2>
      <p>
        Samply, kişisel verileri yalnızca Hizmeti sağlamak amacıyla işler: Çalışma katılımcılarına
        bildirimlerin planlanması ve iletilmesi, katılımcıların yanıtlarının ve bildirim olaylarının
        kaydedilmesi ve elde edilen verilerin veri sorumlusuna sunulması. İşleme, veri sorumlusu
        verileri daha erken silmediği sürece, Çalışmanın süresi boyunca ve{" "}
        <a href="/docs/policy">Gizlilik Politikası</a>&rsquo;nda belirtilen saklama süreleri boyunca
        devam eder.
      </p>

      <h2>3. Veri sahibi ve kişisel veri kategorileri</h2>
      <ul>
        <li><strong>Veri sahipleri (ilgili kişiler):</strong> Çalışma katılımcıları; veri sorumlusu ve iş birlikçileri.</li>
        <li>
          <strong>Kişisel veriler:</strong> takma adlı katılımcı tanımlayıcısı (Samply ID), hesap
          e-postası ve (isteğe bağlı olarak) ad, cihaz push jetonu, dil ve saat dilimi, bildirim
          iletim ve etkileşim olayları, anket/yanıt üstverileri, isteğe bağlı katılımcı kodu ve
          grubu, Çalışmanın etkinleştirdiği durumlarda konum/coğrafi çit olayları ve tazminat
          yapılandırıldığında ödeme verileri.
        </li>
        <li>
          <strong>Özel nitelikli kişisel veriler:</strong> platformun kendisi tarafından toplanmaz.
          Bağlantılı harici anketler aracılığıyla toplanan özel nitelikli kişisel verilerden veri
          sorumlusu sorumludur.
        </li>
      </ul>

      <h2>4. Veri işleyenin yükümlülükleri (madde 28(3))</h2>
      <ul>
        <li><strong>Belgelenmiş talimatlar.</strong> Samply, AB veya Üye Devlet hukuku aksini gerektirmedikçe, katılımcı kişisel verilerini yalnızca Çalışmanın yapılandırması dahil olmak üzere veri sorumlusunun belgelenmiş talimatları doğrultusunda işler.</li>
        <li><strong>Gizlilik.</strong> Verileri işlemeye yetkili kişiler gizlilikle yükümlüdür.</li>
        <li><strong>Güvenlik.</strong> Samply, madde 32 uyarınca uygun teknik ve idari tedbirleri uygular (bkz. Bölüm 6).</li>
        <li><strong>Alt veri işleyenler.</strong> Samply, Bölüm 7&rsquo;de listelenen alt veri işleyenlerle çalışır ve onlara eşdeğer veri koruma yükümlülükleri getirir. Samply, planlanan değişiklikler hakkında veri sorumlusunu bilgilendirecek ve veri sorumlusuna itiraz etme fırsatı verecektir.</li>
        <li><strong>Veri sahibi haklarına ilişkin destek.</strong> İşlemenin niteliğini dikkate alarak Samply, GDPR Bölüm III kapsamındaki taleplere (erişim, düzeltme, silme, taşınabilirlik, itiraz) yanıt vermek için uygun tedbirlerle veri sorumlusuna yardımcı olur. Katılımcılar ayrıca kendi verilerini dışa aktarabilir ve hesaplarını doğrudan Hizmet içinde silebilir.</li>
        <li><strong>Madde 32–36 kapsamında destek.</strong> Samply, işleme güvenliğinin sağlanması, ihlal bildirimi ve veri koruma etki değerlendirmeleri konusunda veri sorumlusuna yardımcı olur.</li>
        <li><strong>Silme veya iade.</strong> Hizmetin sona ermesi üzerine veya veri sorumlusunun talimatı üzerine Samply, kişisel verileri siler veya iade eder. Bir Çalışmanın silinmesi, yanıtlarını, kuyruğa alınmış ve planlanmış bildirimlerini, iş kayıtlarını ve onam kayıtlarını kaldırır; bkz. <a href="/docs/policy">Gizlilik Politikası</a>&rsquo;ndaki &quot;Çalışmaların ve hesapların silinmesi&quot;.</li>
        <li><strong>Denetimler.</strong> Samply, madde 28&rsquo;e uyumu göstermek için gerekli bilgileri sunar ve veri sorumlusu ya da onun yetkilendirdiği bir denetçi tarafından yürütülen, teftişler dahil denetimlere olanak tanır ve katkıda bulunur.</li>
      </ul>

      <h2>5. Veri sorumlusunun yükümlülükleri</h2>
      <p>
        Veri sorumlusu, Çalışma için hukuki bir dayanak oluşturmaktan (gerektiğinde katılımcı onamı
        ve etik/IRB onayı dahil), talimatlarının hukuka uygunluğundan ve bağlantı verdiği herhangi
        bir harici anketin içeriğinden sorumludur. Veri sorumlusu, hukuki bir dayanağı ve uygun
        güvenceleri olmadığı sürece özel nitelikli veya doğrudan kimlik belirleyici verileri serbest
        metin alanlarına girmemelidir.
      </p>

      <h2>6. Teknik ve idari tedbirler (madde 32)</h2>
      <ul>
        <li>Aktarım halindeki verilerin şifrelenmesi (TLS); erişim, kimliği doğrulanmış ve rolü kontrol edilen hesaplarla sınırlıdır.</li>
        <li>Katılımcı araştırma verileri takma adlı bir Samply ID ile anahtarlanır; bir katılımcı ödemelere dahil olmayı tercih etmediği sürece iletişim bilgileri araştırmacılara gösterilmez.</li>
        <li>Parolalar karma değeriyle (bcrypt) saklanır; oturum ve API jetonları zaman sınırlıdır.</li>
        <li>Katılımcı verilerine ve dışa aktarımlara erişim, dahili bir denetim kaydında kaydedilir.</li>
        <li>Gizlilik Politikası&rsquo;nda belirtilen sürelerden sonra otomatik silme ile yapılandırılabilir saklama.</li>
        <li>Tedbirlerin düzenli olarak gözden geçirilmesi; veri sorumlusu, bunların uygun bir güvenlik düzeyini korumak amacıyla güncellenebileceğini kabul eder.</li>
      </ul>

      <h2>7. Alt veri işleyenler</h2>
      <p>
        Samply, aşağıdaki alt veri işleyenleri kullanır. Güncel ve güncellenen liste (her biri için
        paylaşılan veriler ve aktarım mekanizması ile birlikte) projenin alt veri işleyen sicilinde
        tutulur.
      </p>
      <ul>
        <li><strong>MongoDB Atlas</strong> — veritabanı barındırma.</li>
        <li><strong>Postmark</strong> — işlemsel ve bildirim e-postaları.</li>
        <li><strong>Stripe</strong> — katılımcı tazminatı / ödemeler (yalnızca etkinleştirildiğinde).</li>
        <li><strong>Expo / Apple Push / Google FCM</strong> — push bildirim iletimi.</li>
        <li><strong>Cloudflare Turnstile</strong> — kayıt sırasında bot koruması.</li>
        <li><strong>Konstanz Üniversitesi</strong> — web/uygulama barındırma.</li>
      </ul>

      <h2>8. Uluslararası aktarımlar</h2>
      <p>
        Bir alt veri işleyenin kişisel verileri AEA dışında işlediği durumlarda, aktarımlar yalnızca
        bir yeterlilik kararı, AB Standart Sözleşme Hükümleri veya GDPR Bölüm V kapsamındaki başka
        bir geçerli aktarım mekanizması temelinde gerçekleşir. Veri sorumlusu, her alt veri işleyen
        için güncel aktarım dayanağını talep edebilir.
      </p>

      <h2>9. Kişisel veri ihlalleri</h2>
      <p>
        Samply, veri sorumlusunun Çalışma verilerini etkileyen bir kişisel veri ihlalinden haberdar
        olduktan sonra gecikmeksizin veri sorumlusunu bilgilendirir ve veri sorumlusunun madde 33–34
        kapsamındaki kendi bildirim yükümlülüklerini yerine getirmek için ihtiyaç duyduğu bilgileri
        sağlar.
      </p>

      <h2>10. Süre, fesih ve silme</h2>
      <p>
        Bu DPA, Samply veri sorumlusu adına kişisel verileri işlediği sürece geçerlidir. Fesih
        halinde veri sorumlusu, Çalışma verilerini dışa aktarabilir ve artık ihtiyaç duymadığı
        Çalışmaları silmelidir; kalan veriler Gizlilik Politikası&rsquo;ndaki saklama sürelerine göre
        silinir. Onam kayıtları, bir hukuki dayanağın gerektirdiği durumlarda onamın kanıtı olarak
        saklanabilir.
      </p>

      <h2>11. İletişim</h2>
      <p>
        Veri koruma iletişimi: Yury Shevchenko, iScience / Konstanz Üniversitesi —{" "}
        <a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a>. Ayrıca bkz.{" "}
        <a href="/docs/policy">Gizlilik Politikası</a> ve <a href="/docs/terms">Şartlar &amp; Koşullar</a>.
      </p>
    </>
  );
}
