import type { Locale } from "@/lib/i18n";

export default function TermsContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <TermsContentDe />;
  if (locale === "nl") return <TermsContentNl />;
  if (locale === "ru") return <TermsContentRu />;
  if (locale === "zh") return <TermsContentZh />;
  if (locale === "ko") return <TermsContentKo />;
  if (locale === "it") return <TermsContentIt />;
  if (locale === "fr") return <TermsContentFr />;
  if (locale === "es") return <TermsContentEs />;
  if (locale === "pt") return <TermsContentPt />;
  if (locale === "ja") return <TermsContentJa />;
  if (locale === "ar") return <TermsContentAr />;
  if (locale === "pl") return <TermsContentPl />;
  if (locale === "tr") return <TermsContentTr />;
  return <TermsContentEn />;
}

function TermsContentEn() {
  return (
    <>
      {/* 1 */}
      <h2>1. Introduction</h2>
      <p>
        Samply is a platform for managing participation in online experiments and surveys via
        the mobile application Samply Research. Samply is hosted on
        https://samply.uni-konstanz.de (the &quot;Site&quot;), which provides services for
        scheduling and managing notifications (collectively, the &quot;Service&quot;). Your
        use of the Service and the provision of the Service to you by us constitutes an
        agreement between you and Samply to be bound by the terms and conditions set out in
        these Terms of Use.
      </p>
      <p>
        Samply can be used free of charge for non-profit research purposes. For commercial
        use of Samply, please contact us at{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Please read these terms of use carefully. By registering for or otherwise using the
        Service, you acknowledge that you have read, understood, and agree to be bound by
        these Terms of Use, including our{' '}
        <a href='/docs/policy'>Privacy Policy</a> (together, these
        &quot;Terms&quot;). If you do not agree with anything we suggest in these Terms,
        please do not use any part of the Service.
      </p>

      {/* 2 */}
      <h2>2. Eligibility</h2>
      <p>
        The Service is intended for use by persons who are at least 18 years old. If you are
        under 18 years of age, you may not use the Service. If you are 18 years of age or
        older, please ensure that you have never been suspended from the Service and that your
        use of the Service does not violate any laws or regulations. If you are using the
        Service on behalf of a company, organization, or other type of entity, you acknowledge
        to us that you have the authority to bind the entity to these Terms on their behalf.
      </p>

      {/* 3 */}
      <h2>3. Accounts and registration</h2>
      <p>
        If you use the service, you have the option of registering an account. We recommend
        that you register an account, as creating an account on the Service will give you
        access to special features related to participating in online studies (experiments or
        surveys) or creating your own studies. If you do so, we will ask you to provide us
        with some personal information as part of the registration process, some of which is
        required to register the account. You promise that all the information you provide is
        correct and that you will keep it accurate and up-to-date in the future. We also ask
        you to provide a password to protect the security of your account. You are responsible
        for keeping your password secure and confidential. Any activity that occurs under your
        account is your responsibility. If you ever think that your account may no longer be
        secure, you must notify us immediately at{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. You can also
        reset your password at https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. License to use the Service</h2>
      <p>
        Provided that you continue to comply with these terms, we grant you permission to
        access the Service for your personal use only. The Service allows you to create
        studies (&quot;Studies&quot;) or participate in studies created by other Samply users
        (&quot;Researchers&quot;).
      </p>
      <p>Please note that this license does not include the right to use:</p>
      <ol>
        <li>Trademarks, logos or marks that appear in Studies</li>
        <li>Images of people, if they are identifiable in Studies</li>
        <li>Works of art or authorship appearing in Studies</li>
      </ol>

      {/* 5 */}
      <h2>5. User content</h2>
      <p>You are the owner of all your User Content, including any studies you create on the Site.</p>
      <dl>
        <dt>General terms</dt>
        <dd>
          The Service allows you to create and publish your studies, as well as written text,
          images, web links, location information and other content (&quot;User Content&quot;).
          All User Content that you provide on the Service is owned by you or your licensors.
          We do not claim ownership of your User Content — it is fully owned by you.
        </dd>
        <dt>Limited License</dt>
        <dd>
          If you publish your Study, you grant us a worldwide, non-exclusive, royalty-free
          license (with the right to sublicense) to host, store, transmit, display and
          distribute (in whole or in part) your User Content on the Site. You acknowledge
          that we will not pay you for the use of your studies and that your studies will be
          made available to the public for use without attribution or compensation. If you do
          not wish to make your studies available to the public, you may still use all the
          features of the Service without restriction.
        </dd>
        <dt>Representations and warranties</dt>
        <dd>
          You are solely responsible for your User Content and all consequences of your
          uploading or posting User Content on the Service. Each time you upload or post User
          Content, you represent and warrant to us that: (a) you are the creator and owner of
          the User Content or have all necessary rights from other persons or entities to use
          your User Content on the Service as provided in this Section and to permit other
          users to use it; and (b) your User Content does not and will not infringe or
          misappropriate any third party rights, including copyrights and other intellectual
          property rights, privacy rights, rights of publicity or moral rights, or defame,
          libel or slander anyone.
        </dd>
        <dt>Disclaimer</dt>
        <dd>
          There is no reasonable way for us to monitor all User Content that is uploaded to
          or published on the Service, and we have no obligation to you or any other user to
          monitor, edit or control the User Content that you and other users upload to or
          publish on the Service. This means that we are not responsible for User Content on
          the Service and you agree not to make any claims against us based on User Content.
          Nevertheless, we may remove, edit, search or block User Content from the Service at
          any time if the User Content violates these Terms or is found to be otherwise
          offensive.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Prohibited conduct</h2>
      <p>By using the Service, you agree not to:</p>
      <ol type='a'>
        <li>Use the Service for illegal purposes or in violation of any law or regulation;</li>
        <li>Violate or encourage others to violate the rights of others, including the infringement or misappropriation of intellectual property rights;</li>
        <li>Upload, post or publish User Content that is unlawful, libelous, abusive, indecent, profane, pornographic, harassing, threatening, hateful or otherwise inappropriate;</li>
        <li>Tamper with the security features of the Service (e.g. disabling or circumventing features to access private studies or User Content or reverse engineering the Service to obtain the source code of the Service);</li>
        <li>Interfere with our operation of the Service or another user&apos;s use of the Service (i.e. not to upload or distribute viruses, adware or spyware, to make unsolicited offers or promotions, to collect personal information about others, or to interfere with the networks or devices we use to provide the Service);</li>
        <li>Engage in fraudulent activities, such as impersonating another person;</li>
        <li>Access the Service through bots, spiders, scripts, crawlers, scrapers or other automated tools or applications (other than your web browser or other mobile application that we may publish);</li>
        <li>Copy the look and feel of the Site or access, download, copy, modify, distribute, perform or use studies to create a similar or competing service;</li>
        <li>Transfer your rights to use the Service or to view, access or use any Materials; or</li>
        <li>Try to do one of these things or help someone else do it.</li>
      </ol>

      {/* 7 */}
      <h2>7. Other companies&apos; services and linked websites</h2>
      <p>
        You may find tools on the Service that allow you to send information, including User
        Content, to other companies&apos; services, such as features that allow you to link
        your account on the Service to an account on another service. If you use these tools,
        you allow us to send this information to the other companies&apos; services, and you
        acknowledge that we are not responsible for the other companies&apos; use of this
        information because we do not control them at all. You may also find links on the
        Service to other websites that are not operated by us. These websites are also not
        under our control, so please decide when to leave the Service at your own discretion.
      </p>

      {/* 8 */}
      <h2>8. Termination of your account</h2>
      <p>
        If you violate any of these terms, your permission to use the Service automatically
        terminates. You may cancel your account with the Service by sending an email to{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Privacy Policy and additional requirements</h2>
      <p>
        We want you to know what information we collect from you and how we use it. Please
        read our <a href='/docs/policy'>Privacy Policy</a> carefully. The Privacy Policy is
        incorporated into these Terms as part of our Agreement. In addition, we may inform
        you of additional requirements that you must comply with when using the Service. Any
        additional guidelines that we post on the Service or link to the Service will be
        incorporated into these Terms as part of our Agreement.
      </p>

      {/* 10 */}
      <h2>10. Modifying these Terms</h2>
      <p>
        We may change these terms and conditions with 1 month notice. If and when we do so,
        we will use reasonable efforts to notify you of the changes. We may make such notices
        available through a pop-up banner, by sending an email to an email address associated
        with your account on the Service, or otherwise, and we will notify you when the new
        version of these Terms takes effect. If you do not accept the new terms we propose,
        we may immediately terminate your account and terminate your access to the Service.
        If we have any disputes regarding the Service, they will be resolved in accordance
        with the version of these Terms in effect at the time the dispute arises.
      </p>

      {/* 11 */}
      <h2>11. Ownership of the Service</h2>
      <p>
        All software, visual interfaces, graphics, designs, information and all other
        elements of the Service (the &quot;Materials&quot;) that we provide are protected by
        intellectual property and other laws. We or our licensors own all of the Materials
        contained in the Service, and you may not use the Materials except as expressly
        permitted by these Terms.
      </p>

      {/* 12 */}
      <h2>12. Disclaimer; No Warranties</h2>
      <p>
        We provide the Service and all content available through the Service on an
        &quot;as is&quot; and &quot;as available&quot; basis, without warranty of any kind,
        either express or implied. To the extent permitted by applicable law, we expressly
        disclaim all warranties of any kind, including the implied warranties of
        merchantability, fitness for a particular purpose, non-infringement of third party
        rights, title and any warranties arising from course of dealing, usage or trade. We
        do not warrant or represent that the Service will be uninterrupted, secure or free
        from errors or harmful components, or that we will correct errors or harmful
        components.
      </p>
      <p>
        Except as provided in Section 13 below, you use the Service at your own risk and
        assume all risk for damages resulting from your use of or access to the Service, your
        interactions with other users of the Service, and the Content available through the
        Service.
      </p>
      <p>
        The law prohibits disclaimers of warranties in some places, and you may have other
        rights, which may vary depending on where you live. We do not exclude or limit our
        liability to you in any way if this would be unlawful. In the United Kingdom and the
        European Union this includes liability for death or personal injury caused by our
        negligence or the negligence of our employees, agents or subcontractors; for fraud or
        fraudulent misrepresentation; or for our obligation to provide the Service with
        reasonable care and skill or for our failure to provide the Service in accordance
        with the information provided about us or the Service.
      </p>

      {/* 13 */}
      <h2>13. General</h2>
      <p>
        These Terms, together with the Privacy Policy and other policies incorporated into
        these Terms, constitute the entire agreement between you and us with respect to your
        use of the Service. Except for our right to update these Terms in accordance with
        Section 12 above, these Terms may only be modified by a written agreement signed by
        both you and us. You may not assign or transfer these Terms to any other person or
        entity without our consent, or transfer your account on the Service. We may assign
        these Terms with or without notice to you.
      </p>
      <p>
        Any delay or failure by you to enforce any rights under these Terms of Use or to
        require compliance with these Terms of Use shall not affect our right to enforce such
        rights at a later time or to require compliance with them. If we waive any breach by
        you of these Terms of Use, we do not waive any subsequent breach or your obligation
        to comply with the terms you have breached.
      </p>
      <p>
        In the event that any part of these Terms is found unenforceable by a judge or
        arbitrator, the unenforceable part will be enforced to the maximum extent possible
        and the remaining parts will remain in full force and effect.
      </p>

      {/* 14 */}
      <h2>14. Consent to electronic communication</h2>
      <p>
        You agree to receive electronic communications from us as described in our Privacy
        Policy. Please read our <a href='/docs/policy'>Privacy Policy</a> to understand your
        choices regarding our electronic communications practices. We may send you notices,
        agreements, disclosures or other communications electronically.
      </p>

      {/* 15 */}
      <h2>15. Data retention</h2>
      <p>
        Samply retains pending notification queue records for <strong>30 days</strong> and
        notification history (response records) for <strong>12 months</strong>. After these
        retention periods, records are automatically deleted by the platform. Researchers are
        responsible for exporting any study data they wish to preserve before these periods expire.
      </p>

      {/* 16 */}
      <h2>16. Contact information</h2>
      <p>
        You can reach us by sending an email to{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentNl() {
  return (
    <>
      {/* 1 */}
      <h2>1. Inleiding</h2>
      <p>
        Samply is een platform voor het beheren van deelname aan online-experimenten en
        enquêtes via de mobiele applicatie Samply Research. Samply wordt gehost op
        https://samply.uni-konstanz.de (de &quot;Site&quot;), die diensten verleent voor het
        plannen en beheren van notificaties (gezamenlijk de &quot;Dienst&quot;). Uw gebruik
        van de Dienst en het verlenen van de Dienst aan u door ons vormt een overeenkomst
        tussen u en Samply om gebonden te zijn aan de voorwaarden die zijn uiteengezet in
        deze Gebruiksvoorwaarden.
      </p>
      <p>
        Samply kan gratis worden gebruikt voor niet-commerciële onderzoeksdoeleinden. Voor
        commercieel gebruik van Samply kunt u contact met ons opnemen via{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Lees deze gebruiksvoorwaarden aandachtig door. Door u te registreren voor of
        anderszins gebruik te maken van de Dienst, erkent u dat u deze Gebruiksvoorwaarden,
        inclusief ons{' '}
        <a href='/docs/policy'>Privacybeleid</a> (samen deze
        &quot;Voorwaarden&quot;) heeft gelezen, begrepen en ermee instemt hieraan gebonden
        te zijn. Als u het niet eens bent met iets wat wij in deze Voorwaarden voorstellen,
        gebruik dan geen enkel deel van de Dienst.
      </p>

      {/* 2 */}
      <h2>2. Gebruiksrecht</h2>
      <p>
        De Dienst is bedoeld voor gebruik door personen van ten minste 18 jaar oud. Indien u
        jonger bent dan 18 jaar, mag u de Dienst niet gebruiken. Indien u 18 jaar of ouder
        bent, zorg er dan voor dat u nooit geschorst bent van de Dienst en dat uw gebruik van
        de Dienst geen wetten of regelgeving schendt. Indien u de Dienst namens een bedrijf,
        organisatie of ander type entiteit gebruikt, erkent u tegenover ons dat u de bevoegdheid
        heeft de entiteit namens hen aan deze Voorwaarden te binden.
      </p>

      {/* 3 */}
      <h2>3. Accounts en registratie</h2>
      <p>
        Als u de dienst gebruikt, heeft u de mogelijkheid een account te registreren. Wij
        raden u aan een account te registreren, omdat het aanmaken van een account op de
        Dienst u toegang geeft tot speciale functies met betrekking tot deelname aan
        online-studies (experimenten of enquêtes) of het aanmaken van uw eigen studies. Als u
        dit doet, zullen wij u vragen ons als onderdeel van het registratieproces enige
        persoonsgegevens te verstrekken, waarvan sommige vereist zijn om het account te
        registreren. U belooft dat alle informatie die u verstrekt correct is en dat u deze
        in de toekomst nauwkeurig en up-to-date houdt. Wij vragen u ook een wachtwoord op te
        geven om de beveiliging van uw account te beschermen. U bent verantwoordelijk voor
        het veilig en vertrouwelijk houden van uw wachtwoord. Alle activiteit die plaatsvindt
        onder uw account is uw verantwoordelijkheid. Als u ooit denkt dat uw account mogelijk
        niet langer veilig is, moet u ons onmiddellijk informeren via{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. U kunt ook uw
        wachtwoord opnieuw instellen via https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licentie voor gebruik van de Dienst</h2>
      <p>
        Op voorwaarde dat u deze voorwaarden blijft naleven, verlenen wij u toestemming om
        toegang te krijgen tot de Dienst uitsluitend voor persoonlijk gebruik. De Dienst stelt
        u in staat studies (&quot;Studies&quot;) aan te maken of deel te nemen aan studies die
        zijn aangemaakt door andere Samply-gebruikers (&quot;Onderzoekers&quot;).
      </p>
      <p>Houd er rekening mee dat deze licentie niet het recht omvat om gebruik te maken van:</p>
      <ol>
        <li>Handelsmerken, logo&apos;s of tekens die in Studies voorkomen</li>
        <li>Afbeeldingen van personen, indien zij identificeerbaar zijn in Studies</li>
        <li>Kunstwerken of auteursrechtelijk beschermde werken die in Studies voorkomen</li>
      </ol>

      {/* 5 */}
      <h2>5. Gebruikersinhoud</h2>
      <p>U bent de eigenaar van al uw Gebruikersinhoud, inclusief alle studies die u op de Site aanmaakt.</p>
      <dl>
        <dt>Algemene voorwaarden</dt>
        <dd>
          De Dienst stelt u in staat uw studies aan te maken en te publiceren, evenals
          geschreven tekst, afbeeldingen, weblinks, locatiegegevens en andere inhoud
          (&quot;Gebruikersinhoud&quot;). Alle Gebruikersinhoud die u op de Dienst verstrekt,
          is eigendom van u of uw licentiegevers. Wij maken geen aanspraak op eigendom van
          uw Gebruikersinhoud — deze is volledig van u.
        </dd>
        <dt>Beperkte licentie</dt>
        <dd>
          Als u uw Studie publiceert, verleent u ons een wereldwijde, niet-exclusieve,
          royaltyvrije licentie (met het recht om in sublicentie te geven) om uw
          Gebruikersinhoud op de Site te hosten, op te slaan, te verzenden, weer te geven en
          te distribueren (geheel of gedeeltelijk). U erkent dat wij u niet zullen betalen
          voor het gebruik van uw studies en dat uw studies beschikbaar zullen worden gesteld
          aan het publiek voor gebruik zonder naamsvermelding of vergoeding. Als u uw studies
          niet beschikbaar wilt stellen aan het publiek, kunt u toch alle functies van de
          Dienst zonder beperkingen gebruiken.
        </dd>
        <dt>Verklaringen en garanties</dt>
        <dd>
          U bent als enige verantwoordelijk voor uw Gebruikersinhoud en alle gevolgen van het
          uploaden of plaatsen van Gebruikersinhoud op de Dienst. Elke keer dat u
          Gebruikersinhoud uploadt of plaatst, verklaart en garandeert u ons dat: (a) u de
          maker en eigenaar bent van de Gebruikersinhoud of alle benodigde rechten van andere
          personen of entiteiten heeft om uw Gebruikersinhoud op de Dienst te gebruiken zoals
          voorzien in dit Artikel en om andere gebruikers toe te staan deze te gebruiken; en
          (b) uw Gebruikersinhoud geen rechten van derden schendt of wederrechtelijk
          toeëigent, inclusief auteursrechten en andere intellectuele eigendomsrechten,
          privacyrechten, publiciteitsrechten of morele rechten, noch iemand belastert,
          lastert of beledigend behandelt.
        </dd>
        <dt>Disclaimer</dt>
        <dd>
          Het is voor ons niet op redelijke wijze mogelijk alle Gebruikersinhoud te
          monitoren die wordt geüpload naar of gepubliceerd op de Dienst, en wij hebben geen
          verplichting jegens u of een andere gebruiker om de Gebruikersinhoud die u en
          andere gebruikers uploaden naar of publiceren op de Dienst te monitoren, te
          bewerken of te controleren. Dit betekent dat wij niet verantwoordelijk zijn voor
          Gebruikersinhoud op de Dienst en u stemt ermee in geen aanspraken jegens ons te
          maken op basis van Gebruikersinhoud. Desalniettemin kunnen wij Gebruikersinhoud te
          allen tijde van de Dienst verwijderen, bewerken, doorzoeken of blokkeren indien de
          Gebruikersinhoud in strijd is met deze Voorwaarden of anderszins aanstootgevend
          wordt bevonden.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Verboden gedrag</h2>
      <p>Door gebruik te maken van de Dienst gaat u ermee akkoord niet:</p>
      <ol type='a'>
        <li>De Dienst te gebruiken voor illegale doeleinden of in strijd met enige wet of regelgeving;</li>
        <li>De rechten van anderen te schenden of anderen aan te moedigen dit te doen, inclusief de schending of wederrechtelijke toeëigening van intellectuele eigendomsrechten;</li>
        <li>Gebruikersinhoud te uploaden, plaatsen of publiceren die onwettig, lasterlijk, beledigend, onfatsoenlijk, aanstootgevend, pornografisch, intimiderend, bedreigend, haatdragend of anderszins ongepast is;</li>
        <li>De beveiligingsfuncties van de Dienst te manipuleren (bijv. functies te deactiveren of te omzeilen om toegang te krijgen tot privéstudies of Gebruikersinhoud of de Dienst te reverse-engineeren om de broncode van de Dienst te verkrijgen);</li>
        <li>Onze exploitatie van de Dienst of het gebruik van de Dienst door een andere gebruiker te verstoren (d.w.z. geen virussen, adware of spyware te uploaden of te distribueren, geen ongevraagde aanbiedingen of promoties te verzenden, geen persoonsgegevens van anderen te verzamelen of de netwerken of apparaten die wij gebruiken om de Dienst te verlenen te verstoren);</li>
        <li>Frauduleuze activiteiten te verrichten, zoals het zich voordoen als een andere persoon;</li>
        <li>Toegang te krijgen tot de Dienst via bots, spiders, scripts, crawlers, scrapers of andere geautomatiseerde tools of applicaties (anders dan uw webbrowser of andere mobiele applicaties die wij mogelijk publiceren);</li>
        <li>Het uiterlijk van de Site te kopiëren of toegang te krijgen tot studies, deze te downloaden, te kopiëren, te wijzigen, te distribueren, uit te voeren of te gebruiken om een vergelijkbare of concurrerende dienst te maken;</li>
        <li>Uw rechten om de Dienst te gebruiken of Materialen te bekijken, te openen of te gebruiken over te dragen; of</li>
        <li>Te proberen een van deze dingen te doen of iemand anders daarbij te helpen.</li>
      </ol>

      {/* 7 */}
      <h2>7. Diensten van andere bedrijven en gelinkte websites</h2>
      <p>
        Mogelijk vindt u op de Dienst tools waarmee u informatie, waaronder Gebruikersinhoud,
        kunt verzenden naar diensten van andere bedrijven, zoals functies waarmee u uw account
        op de Dienst kunt koppelen aan een account bij een andere dienst. Als u deze tools
        gebruikt, staat u ons toe deze informatie naar de diensten van de andere bedrijven te
        sturen, en u erkent dat wij niet verantwoordelijk zijn voor het gebruik van deze
        informatie door de andere bedrijven, omdat wij deze in het geheel niet controleren. U
        kunt op de Dienst ook links vinden naar andere websites die niet door ons worden
        beheerd. Deze websites vallen ook niet onder onze controle, beslis daarom naar eigen
        inzicht wanneer u de Dienst wilt verlaten.
      </p>

      {/* 8 */}
      <h2>8. Beëindiging van uw account</h2>
      <p>
        Als u een van deze voorwaarden schendt, vervalt uw toestemming om de Dienst te
        gebruiken automatisch. U kunt uw account bij de Dienst opzeggen door een e-mail te
        sturen naar{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Privacybeleid en aanvullende vereisten</h2>
      <p>
        Wij willen dat u weet welke informatie wij van u verzamelen en hoe wij deze gebruiken.
        Lees ons <a href='/docs/policy'>Privacybeleid</a> aandachtig door. Het Privacybeleid
        is opgenomen in deze Voorwaarden als onderdeel van onze Overeenkomst. Daarnaast
        kunnen wij u informeren over aanvullende vereisten waaraan u moet voldoen bij het
        gebruik van de Dienst. Alle aanvullende richtlijnen die wij op de Dienst plaatsen of
        die naar de Dienst verwijzen, worden opgenomen in deze Voorwaarden als onderdeel van
        onze Overeenkomst.
      </p>

      {/* 10 */}
      <h2>10. Wijziging van deze Voorwaarden</h2>
      <p>
        Wij kunnen deze voorwaarden wijzigen met een opzegtermijn van 1 maand. Als en wanneer
        wij dit doen, zullen wij redelijke inspanningen leveren om u op de hoogte te stellen
        van de wijzigingen. Wij kunnen dergelijke kennisgevingen beschikbaar stellen via een
        pop-upbanner, door het sturen van een e-mail naar een e-mailadres dat is gekoppeld aan
        uw account op de Dienst, of op andere wijze, en wij zullen u informeren wanneer de
        nieuwe versie van deze Voorwaarden van kracht wordt. Als u de door ons voorgestelde
        nieuwe voorwaarden niet accepteert, kunnen wij uw account onmiddellijk beëindigen en
        uw toegang tot de Dienst beëindigen. Als wij eventuele geschillen hebben met
        betrekking tot de Dienst, zullen deze worden opgelost in overeenstemming met de
        versie van deze Voorwaarden die van kracht is op het moment dat het geschil ontstaat.
      </p>

      {/* 11 */}
      <h2>11. Eigendom van de Dienst</h2>
      <p>
        Alle software, visuele interfaces, grafische elementen, ontwerpen, informatie en alle
        andere elementen van de Dienst (de &quot;Materialen&quot;) die wij verstrekken, zijn
        beschermd door intellectuele eigendomsrechten en andere wetgeving. Wij of onze
        licentiegevers zijn eigenaar van alle Materialen in de Dienst, en u mag de Materialen
        uitsluitend gebruiken zoals uitdrukkelijk toegestaan door deze Voorwaarden.
      </p>

      {/* 12 */}
      <h2>12. Disclaimer; geen garanties</h2>
      <p>
        Wij verstrekken de Dienst en alle inhoud die beschikbaar is via de Dienst op een
        &quot;as is&quot;- en &quot;as available&quot;-basis, zonder enige garantie,
        uitdrukkelijk of stilzwijgend. Voor zover toegestaan door toepasselijk recht,
        wijzen wij uitdrukkelijk alle garanties van welke aard dan ook af, inclusief de
        stilzwijgende garanties van verkoopbaarheid, geschiktheid voor een bepaald doel,
        niet-inbreuk op rechten van derden, eigendomsrecht en alle garanties die voortvloeien
        uit het verloop van de zakelijke relatie, het gebruik of de handelspraktijk. Wij
        garanderen of verklaren niet dat de Dienst ononderbroken, veilig of vrij van fouten
        of schadelijke componenten zal zijn, of dat wij fouten of schadelijke componenten zul
        corrigeren.
      </p>
      <p>
        Behalve zoals bepaald in Artikel 13 hieronder, gebruikt u de Dienst op eigen risico
        en aanvaardt u alle risico&apos;s voor schade die voortvloeit uit uw gebruik van of
        toegang tot de Dienst, uw interacties met andere gebruikers van de Dienst en de
        Inhoud die beschikbaar is via de Dienst.
      </p>
      <p>
        De wet verbiedt het uitsluiten van garanties op sommige plaatsen, en u kunt andere
        rechten hebben die kunnen variëren afhankelijk van waar u woont. Wij sluiten onze
        aansprakelijkheid jegens u op geen enkele wijze uit of beperken deze niet, als dit
        onwettig zou zijn. In het Verenigd Koninkrijk en de Europese Unie omvat dit
        aansprakelijkheid voor overlijden of persoonlijk letsel veroorzaakt door onze
        nalatigheid of die van onze werknemers, vertegenwoordigers of onderaannemers; voor
        fraude of frauduleuze onjuiste voorstelling van zaken; of voor onze verplichting om
        de Dienst te verlenen met redelijke zorg en vakkundigheid of voor ons verzuim om de
        Dienst te verlenen in overeenstemming met de verstrekte informatie over ons of de
        Dienst.
      </p>

      {/* 13 */}
      <h2>13. Algemeen</h2>
      <p>
        Deze Voorwaarden, samen met het Privacybeleid en andere beleidsregels die in deze
        Voorwaarden zijn opgenomen, vormen de volledige overeenkomst tussen u en ons met
        betrekking tot uw gebruik van de Dienst. Behalve ons recht om deze Voorwaarden bij
        te werken overeenkomstig Artikel 12 hierboven, kunnen deze Voorwaarden uitsluitend
        worden gewijzigd door een schriftelijke overeenkomst ondertekend door zowel u als
        ons. U mag deze Voorwaarden niet zonder onze toestemming overdragen of overzetten aan
        een andere persoon of entiteit, noch uw account op de Dienst overdragen. Wij kunnen
        deze Voorwaarden met of zonder kennisgeving aan u overdragen.
      </p>
      <p>
        Enige vertraging of nalaten van uw kant om rechten uit deze Gebruiksvoorwaarden af te
        dwingen of naleving van deze Gebruiksvoorwaarden te eisen, heeft geen invloed op ons
        recht om dergelijke rechten op een later tijdstip af te dwingen of naleving ervan te
        eisen. Als wij afstand doen van enige schending door u van deze Gebruiksvoorwaarden,
        doen wij geen afstand van enige daaropvolgende schending of van uw verplichting om de
        door u geschonden voorwaarden na te leven.
      </p>
      <p>
        Indien enig deel van deze Voorwaarden door een rechter of arbiter niet-afdwingbaar
        wordt geacht, zal het niet-afdwingbare deel voor zover maximaal mogelijk worden
        afgedwongen en blijven de overige delen volledig van kracht.
      </p>

      {/* 14 */}
      <h2>14. Toestemming voor elektronische communicatie</h2>
      <p>
        U stemt ermee in elektronische communicatie van ons te ontvangen zoals beschreven in
        ons Privacybeleid. Lees ons <a href='/docs/policy'>Privacybeleid</a> om uw keuzes
        met betrekking tot onze elektronische communicatiepraktijken te begrijpen. Wij kunnen
        u kennisgevingen, overeenkomsten, openbaarmakingen of andere communicatie elektronisch
        sturen.
      </p>

      {/* 15 */}
      <h2>15. Gegevensbewaring</h2>
      <p>
        Samply bewaart records in de wachtrij voor openstaande meldingen gedurende <strong>30 dagen</strong> en
        meldingsgeschiedenissen (responsrecords) gedurende <strong>12 maanden</strong>. Na deze
        bewaartermijnen worden records automatisch verwijderd. Onderzoekers zijn zelf verantwoordelijk voor
        het exporteren van studiegegevens vóór het verstrijken van deze termijnen.
      </p>

      {/* 16 */}
      <h2>16. Contactinformatie</h2>
      <p>
        U kunt ons bereiken door een e-mail te sturen naar{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentDe() {
  return (
    <>
      {/* 1 */}
      <h2>1. Einführung</h2>
      <p>
        Samply ist eine Plattform zur Verwaltung der Teilnahme an Online-Experimenten und
        Umfragen über die mobile Anwendung Samply Research. Samply wird unter
        https://samply.uni-konstanz.de (die &quot;Website&quot;) gehostet und bietet Dienste
        zur Planung und Verwaltung von Benachrichtigungen an (zusammenfassend der
        &quot;Dienst&quot;). Ihre Nutzung des Dienstes und die Bereitstellung des Dienstes
        durch uns begründet eine Vereinbarung zwischen Ihnen und Samply, die Sie an die in
        diesen Nutzungsbedingungen festgelegten Bedingungen bindet.
      </p>
      <p>
        Samply kann für gemeinnützige Forschungszwecke kostenlos genutzt werden. Für die
        kommerzielle Nutzung von Samply wenden Sie sich bitte an{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch. Indem Sie sich für den
        Dienst registrieren oder ihn anderweitig nutzen, bestätigen Sie, dass Sie diese
        Nutzungsbedingungen einschließlich unserer{' '}
        <a href='/docs/policy'>Datenschutzerklärung</a> (zusammen diese
        &quot;Bedingungen&quot;) gelesen und verstanden haben und damit einverstanden sind,
        daran gebunden zu sein. Wenn Sie mit einem der in diesen Bedingungen enthaltenen
        Punkte nicht einverstanden sind, nutzen Sie bitte keinen Teil des Dienstes.
      </p>

      {/* 2 */}
      <h2>2. Nutzungsberechtigung</h2>
      <p>
        Der Dienst richtet sich an Personen, die mindestens 18 Jahre alt sind. Wenn Sie
        unter 18 Jahre alt sind, dürfen Sie den Dienst nicht nutzen. Wenn Sie 18 Jahre oder
        älter sind, stellen Sie bitte sicher, dass Sie noch nie vom Dienst gesperrt wurden
        und dass Ihre Nutzung des Dienstes keine Gesetze oder Vorschriften verletzt. Wenn
        Sie den Dienst im Namen eines Unternehmens, einer Organisation oder einer anderen
        Art von Einrichtung nutzen, bestätigen Sie uns gegenüber, dass Sie die Befugnis
        haben, die Einrichtung in deren Namen an diese Bedingungen zu binden.
      </p>

      {/* 3 */}
      <h2>3. Konten und Registrierung</h2>
      <p>
        Wenn Sie den Dienst nutzen, haben Sie die Möglichkeit, ein Konto zu registrieren.
        Wir empfehlen Ihnen, ein Konto zu registrieren, da Sie durch die Erstellung eines
        Kontos Zugang zu besonderen Funktionen erhalten, die mit der Teilnahme an
        Online-Studien (Experimenten oder Umfragen) oder der Erstellung eigener Studien
        zusammenhängen. Wenn Sie dies tun, werden wir Sie im Rahmen des
        Registrierungsprozesses bitten, uns einige persönliche Informationen zu übermitteln,
        von denen einige für die Registrierung des Kontos erforderlich sind. Sie versichern,
        dass alle von Ihnen gemachten Angaben korrekt sind und dass Sie diese in Zukunft
        aktuell und auf dem neuesten Stand halten werden. Wir bitten Sie außerdem, ein
        Passwort anzugeben, um die Sicherheit Ihres Kontos zu schützen. Sie sind für die
        sichere und vertrauliche Aufbewahrung Ihres Passworts verantwortlich. Alle
        Aktivitäten, die unter Ihrem Konto stattfinden, liegen in Ihrer Verantwortung. Wenn
        Sie jemals den Verdacht haben, dass Ihr Konto nicht mehr sicher ist, müssen Sie uns
        umgehend unter{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> benachrichtigen.
        Sie können Ihr Passwort auch unter https://samply.uni-konstanz.de/researcher/forgot
        zurücksetzen.
      </p>

      {/* 4 */}
      <h2>4. Nutzungslizenz</h2>
      <p>
        Sofern Sie diese Bedingungen weiterhin einhalten, erteilen wir Ihnen die Erlaubnis,
        auf den Dienst ausschließlich für Ihren persönlichen Gebrauch zuzugreifen. Der
        Dienst ermöglicht es Ihnen, Studien (&quot;Studien&quot;) zu erstellen oder an
        Studien teilzunehmen, die von anderen Samply-Nutzern (&quot;Forscher&quot;) erstellt
        wurden.
      </p>
      <p>Bitte beachten Sie, dass diese Lizenz nicht das Recht zur Nutzung umfasst von:</p>
      <ol>
        <li>Marken, Logos oder Kennzeichen, die in Studien erscheinen</li>
        <li>Personenabbildungen, sofern diese in Studien identifizierbar sind</li>
        <li>Kunstwerken oder urheberrechtlich geschützten Werken, die in Studien erscheinen</li>
      </ol>

      {/* 5 */}
      <h2>5. Nutzerinhalte</h2>
      <p>Sie sind Eigentümer aller Ihrer Nutzerinhalte, einschließlich aller Studien, die Sie auf der Website erstellen.</p>
      <dl>
        <dt>Allgemeine Bedingungen</dt>
        <dd>
          Der Dienst ermöglicht es Ihnen, Ihre Studien sowie schriftliche Texte, Bilder,
          Web-Links, Standortinformationen und andere Inhalte (&quot;Nutzerinhalte&quot;) zu
          erstellen und zu veröffentlichen. Alle Nutzerinhalte, die Sie auf dem Dienst
          bereitstellen, sind Ihr oder Ihres Lizenzgebers Eigentum. Wir erheben keinen
          Anspruch auf Eigentum an Ihren Nutzerinhalten — diese gehören vollständig Ihnen.
        </dd>
        <dt>Eingeschränkte Lizenz</dt>
        <dd>
          Wenn Sie Ihre Studie veröffentlichen, erteilen Sie uns eine weltweite, nicht
          exklusive, lizenzgebührenfreie Lizenz (mit dem Recht zur Unterlizenzierung) zur
          Speicherung, Übertragung, Anzeige und Verbreitung (ganz oder teilweise) Ihrer
          Nutzerinhalte auf der Website. Sie nehmen zur Kenntnis, dass wir Sie nicht für die
          Nutzung Ihrer Studien vergüten werden und dass Ihre Studien der Öffentlichkeit ohne
          Namensnennung oder Vergütung zur Verfügung gestellt werden. Wenn Sie Ihre Studien
          nicht öffentlich zugänglich machen möchten, können Sie dennoch alle Funktionen des
          Dienstes uneingeschränkt nutzen.
        </dd>
        <dt>Zusicherungen und Gewährleistungen</dt>
        <dd>
          Sie sind allein verantwortlich für Ihre Nutzerinhalte und alle Konsequenzen, die
          sich aus dem Hochladen oder Veröffentlichen von Nutzerinhalten auf dem Dienst
          ergeben. Jedes Mal, wenn Sie Nutzerinhalte hochladen oder veröffentlichen,
          versichern und gewährleisten Sie uns gegenüber, dass: (a) Sie der Urheber und
          Eigentümer der Nutzerinhalte sind oder alle erforderlichen Rechte von anderen
          Personen oder Einrichtungen besitzen, um Ihre Nutzerinhalte auf dem Dienst gemäß
          diesem Abschnitt zu nutzen und anderen Nutzern die Nutzung zu gestatten; und (b)
          Ihre Nutzerinhalte keine Rechte Dritter verletzen oder widerrechtlich aneignen,
          einschließlich Urheberrechte und andere geistige Eigentumsrechte,
          Persönlichkeitsrechte, Rechte am eigenen Bild oder moralische Rechte, und niemanden
          verleumden, beleidigen oder in schlechtem Licht darstellen.
        </dd>
        <dt>Haftungsausschluss</dt>
        <dd>
          Es ist für uns nicht in zumutbarer Weise möglich, alle Nutzerinhalte zu
          überwachen, die auf den Dienst hochgeladen oder dort veröffentlicht werden, und wir
          sind Ihnen oder anderen Nutzern gegenüber nicht verpflichtet, die Nutzerinhalte,
          die Sie und andere Nutzer hochladen oder veröffentlichen, zu überwachen, zu
          bearbeiten oder zu kontrollieren. Dies bedeutet, dass wir nicht für Nutzerinhalte
          auf dem Dienst verantwortlich sind und Sie erklären sich damit einverstanden, keine
          Ansprüche gegen uns aufgrund von Nutzerinhalten geltend zu machen. Wir können
          Nutzerinhalte jedoch jederzeit aus dem Dienst entfernen, bearbeiten, suchen oder
          sperren, wenn die Nutzerinhalte gegen diese Bedingungen verstoßen oder anderweitig
          als anstößig befunden werden.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Verbotenes Verhalten</h2>
      <p>Durch die Nutzung des Dienstes verpflichten Sie sich, Folgendes zu unterlassen:</p>
      <ol type='a'>
        <li>Den Dienst für illegale Zwecke oder unter Verstoß gegen Gesetze oder Vorschriften zu nutzen;</li>
        <li>Die Rechte anderer zu verletzen oder andere dazu zu ermutigen, dies zu tun, einschließlich der Verletzung oder widerrechtlichen Aneignung von Rechten des geistigen Eigentums;</li>
        <li>Nutzerinhalte hochzuladen, zu veröffentlichen oder zu publizieren, die rechtswidrig, verleumderisch, missbräuchlich, unanständig, anstößig, pornografisch, belästigend, bedrohlich, hasserfüllt oder anderweitig unangemessen sind;</li>
        <li>Die Sicherheitsfunktionen des Dienstes zu manipulieren (z. B. Funktionen zu deaktivieren oder zu umgehen, um auf private Studien oder Nutzerinhalte zuzugreifen, oder den Dienst durch Reverse Engineering zu dekompilieren, um den Quellcode des Dienstes zu erhalten);</li>
        <li>Unseren Betrieb des Dienstes oder die Nutzung des Dienstes durch andere Nutzer zu beeinträchtigen (d. h. keine Viren, Adware oder Spyware hochzuladen oder zu verbreiten, keine unerwünschten Angebote oder Werbung zu versenden, keine personenbezogenen Daten anderer zu sammeln oder die Netzwerke oder Geräte, die wir zur Bereitstellung des Dienstes verwenden, zu stören);</li>
        <li>Betrügerische Aktivitäten durchzuführen, wie z. B. die Identität einer anderen Person anzunehmen;</li>
        <li>Auf den Dienst über Bots, Spider, Skripte, Crawler, Scraper oder andere automatisierte Tools oder Anwendungen zuzugreifen (mit Ausnahme Ihres Webbrowsers oder anderer mobiler Anwendungen, die wir möglicherweise veröffentlichen);</li>
        <li>Das Erscheinungsbild der Website zu kopieren oder auf Studien zuzugreifen, diese herunterzuladen, zu kopieren, zu modifizieren, zu verbreiten, aufzuführen oder zu nutzen, um einen ähnlichen oder konkurrierenden Dienst zu erstellen;</li>
        <li>Ihre Rechte zur Nutzung des Dienstes oder zum Anzeigen, Zugreifen auf oder Verwenden von Materialien zu übertragen; oder</li>
        <li>Zu versuchen, eine dieser Handlungen vorzunehmen, oder jemanden anderen dabei zu unterstützen.</li>
      </ol>

      {/* 7 */}
      <h2>7. Dienste Dritter und verlinkte Websites</h2>
      <p>
        Möglicherweise finden Sie auf dem Dienst Tools, mit denen Sie Informationen,
        einschließlich Nutzerinhalte, an Dienste anderer Unternehmen senden können, z. B.
        Funktionen, die es Ihnen ermöglichen, Ihr Konto auf dem Dienst mit einem Konto bei
        einem anderen Dienst zu verknüpfen. Wenn Sie diese Tools nutzen, gestatten Sie uns,
        diese Informationen an die Dienste anderer Unternehmen zu übermitteln, und Sie
        nehmen zur Kenntnis, dass wir nicht für die Verwendung dieser Informationen durch
        andere Unternehmen verantwortlich sind, da wir diese in keinster Weise kontrollieren.
        Möglicherweise finden Sie auf dem Dienst auch Links zu anderen Websites, die nicht
        von uns betrieben werden. Diese Websites unterliegen ebenfalls nicht unserer
        Kontrolle, daher entscheiden Sie bitte nach eigenem Ermessen, wann Sie den Dienst
        verlassen möchten.
      </p>

      {/* 8 */}
      <h2>8. Kündigung Ihres Kontos</h2>
      <p>
        Wenn Sie gegen eine dieser Bedingungen verstoßen, erlischt Ihre Erlaubnis zur
        Nutzung des Dienstes automatisch. Sie können Ihr Konto beim Dienst kündigen, indem
        Sie eine E-Mail an{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> senden.
      </p>

      {/* 9 */}
      <h2>9. Datenschutzerklärung und zusätzliche Anforderungen</h2>
      <p>
        Wir möchten, dass Sie wissen, welche Informationen wir von Ihnen erheben und wie wir
        diese verwenden. Bitte lesen Sie unsere{' '}
        <a href='/docs/policy'>Datenschutzerklärung</a> sorgfältig durch. Die
        Datenschutzerklärung ist als Teil unserer Vereinbarung in diese Bedingungen
        einbezogen. Darüber hinaus können wir Sie über zusätzliche Anforderungen informieren,
        die Sie bei der Nutzung des Dienstes einhalten müssen. Alle zusätzlichen Richtlinien,
        die wir auf dem Dienst veröffentlichen oder mit dem Dienst verknüpfen, werden als
        Teil unserer Vereinbarung in diese Bedingungen einbezogen.
      </p>

      {/* 10 */}
      <h2>10. Änderungen dieser Bedingungen</h2>
      <p>
        Wir können diese Bedingungen mit einer Frist von 1 Monat ändern. Wenn wir dies tun,
        werden wir angemessene Anstrengungen unternehmen, um Sie über die Änderungen zu
        informieren. Wir können solche Hinweise über ein Pop-up-Banner bereitstellen, indem
        wir eine E-Mail an eine mit Ihrem Konto beim Dienst verknüpfte E-Mail-Adresse senden
        oder auf andere Weise, und wir werden Sie informieren, wenn die neue Version dieser
        Bedingungen in Kraft tritt. Wenn Sie die von uns vorgeschlagenen neuen Bedingungen
        nicht akzeptieren, können wir Ihr Konto sofort kündigen und Ihren Zugang zum Dienst
        beenden. Bei etwaigen Streitigkeiten bezüglich des Dienstes werden diese gemäß der
        zum Zeitpunkt der Entstehung der Streitigkeit geltenden Version dieser Bedingungen
        beigelegt.
      </p>

      {/* 11 */}
      <h2>11. Eigentümerschaft des Dienstes</h2>
      <p>
        Alle Software, visuellen Oberflächen, Grafiken, Designs, Informationen und alle
        anderen Elemente des Dienstes (die &quot;Materialien&quot;), die wir bereitstellen,
        sind durch geistige Eigentumsrechte und andere Gesetze geschützt. Wir oder unsere
        Lizenzgeber sind Eigentümer aller im Dienst enthaltenen Materialien, und Sie dürfen
        die Materialien nur verwenden, soweit dies ausdrücklich durch diese Bedingungen
        gestattet ist.
      </p>

      {/* 12 */}
      <h2>12. Haftungsausschluss; keine Garantien</h2>
      <p>
        Wir stellen den Dienst und alle über den Dienst verfügbaren Inhalte auf einer
        &quot;wie besehen&quot;- und &quot;wie verfügbar&quot;-Basis ohne jegliche Garantie,
        weder ausdrücklich noch stillschweigend, zur Verfügung. Soweit nach geltendem Recht
        zulässig, lehnen wir ausdrücklich alle Garantien jeglicher Art ab, einschließlich
        der stillschweigenden Garantien der Marktgängigkeit, der Eignung für einen
        bestimmten Zweck, der Nichtverletzung von Rechten Dritter, des Eigentumsrechts sowie
        aller Garantien, die sich aus dem Verlauf von Geschäftsbeziehungen, der Nutzung oder
        dem Handelsbrauch ergeben. Wir geben keine Gewährleistung oder Zusicherung dafür,
        dass der Dienst ununterbrochen, sicher oder frei von Fehlern oder schädlichen
        Komponenten ist, oder dass wir Fehler oder schädliche Komponenten beheben werden.
      </p>
      <p>
        Sofern in Abschnitt 13 unten nichts anderes vorgesehen ist, nutzen Sie den Dienst
        auf eigene Gefahr und übernehmen alle Risiken für Schäden, die aus Ihrer Nutzung
        des Dienstes oder dem Zugriff darauf, Ihren Interaktionen mit anderen Nutzern des
        Dienstes und den über den Dienst verfügbaren Inhalten entstehen.
      </p>
      <p>
        Das Gesetz verbietet den Ausschluss von Garantien an manchen Orten, und Sie können
        weitere Rechte haben, die je nach Ihrem Wohnort variieren können. Wir schließen
        unsere Haftung Ihnen gegenüber in keiner Weise aus oder begrenzen diese, wenn dies
        rechtswidrig wäre. Im Vereinigten Königreich und in der Europäischen Union umfasst
        dies die Haftung für Tod oder Körperverletzung, die durch unsere Fahrlässigkeit oder
        die Fahrlässigkeit unserer Mitarbeiter, Vertreter oder Subunternehmer verursacht
        wird; für Betrug oder arglistige Täuschung; oder für unsere Verpflichtung, den
        Dienst mit angemessener Sorgfalt und Fachkenntnis zu erbringen, oder für unser
        Versagen, den Dienst in Übereinstimmung mit den uns oder den Dienst betreffenden
        bereitgestellten Informationen zu erbringen.
      </p>

      {/* 13 */}
      <h2>13. Allgemeines</h2>
      <p>
        Diese Bedingungen bilden zusammen mit der Datenschutzerklärung und anderen in diese
        Bedingungen einbezogenen Richtlinien die gesamte Vereinbarung zwischen Ihnen und uns
        in Bezug auf Ihre Nutzung des Dienstes. Mit Ausnahme unseres Rechts, diese
        Bedingungen gemäß Abschnitt 12 oben zu aktualisieren, können diese Bedingungen nur
        durch eine schriftliche Vereinbarung geändert werden, die von Ihnen und uns
        unterzeichnet wurde. Sie dürfen diese Bedingungen ohne unsere Zustimmung nicht an
        eine andere Person oder Einrichtung abtreten oder übertragen und auch Ihr Konto beim
        Dienst nicht übertragen. Wir können diese Bedingungen mit oder ohne vorherige
        Benachrichtigung an Sie abtreten.
      </p>
      <p>
        Eine Verzögerung oder ein Versäumnis Ihrerseits, Rechte aus diesen
        Nutzungsbedingungen durchzusetzen oder die Einhaltung dieser Nutzungsbedingungen zu
        verlangen, berührt nicht unser Recht, diese Rechte zu einem späteren Zeitpunkt
        durchzusetzen oder deren Einhaltung zu verlangen. Wenn wir auf einen Verstoß Ihrerseits
        gegen diese Nutzungsbedingungen verzichten, verzichten wir damit nicht auf einen
        nachfolgenden Verstoß oder auf Ihre Verpflichtung, die verletzten Bedingungen
        einzuhalten.
      </p>
      <p>
        Sollte ein Teil dieser Bedingungen von einem Richter oder Schiedsrichter als nicht
        durchsetzbar befunden werden, wird der nicht durchsetzbare Teil im größtmöglichen
        Umfang durchgesetzt, und die verbleibenden Teile bleiben vollständig in Kraft.
      </p>

      {/* 14 */}
      <h2>14. Einwilligung zur elektronischen Kommunikation</h2>
      <p>
        Sie erklären sich damit einverstanden, von uns elektronische Mitteilungen zu
        erhalten, wie in unserer Datenschutzerklärung beschrieben. Bitte lesen Sie unsere{' '}
        <a href='/docs/policy'>Datenschutzerklärung</a>, um Ihre Wahlmöglichkeiten in Bezug
        auf unsere elektronischen Kommunikationspraktiken zu verstehen. Wir können Ihnen
        Hinweise, Vereinbarungen, Offenlegungen oder andere Mitteilungen elektronisch
        zusenden.
      </p>

      {/* 15 */}
      <h2>15. Datenspeicherfristen</h2>
      <p>
        Samply speichert Warteschlangen-Datensätze für ausstehende Benachrichtigungen <strong>30 Tage</strong> und
        Benachrichtigungsverläufe (Antwortdatensätze) <strong>12 Monate</strong> lang. Nach Ablauf dieser Fristen
        werden die Datensätze automatisch gelöscht. Forschende sind selbst verantwortlich dafür, alle Studiendaten
        zu exportieren, die sie vor Ablauf dieser Fristen aufbewahren möchten.
      </p>

      {/* 16 */}
      <h2>16. Kontaktinformationen</h2>
      <p>
        Sie können uns erreichen, indem Sie eine E-Mail an{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> senden.
      </p>
    </>
  );
}

function TermsContentRu() {
  return (
    <>
      {/* 1 */}
      <h2>1. Введение</h2>
      <p>
        Samply — платформа для управления участием в онлайн-экспериментах и опросах через мобильное
        приложение Samply Research. Samply размещён на https://samply.uni-konstanz.de («Сайт»),
        который предоставляет услуги по планированию уведомлений и управлению ими (совместно —
        «Сервис»). Использование вами Сервиса и предоставление нами Сервиса вам означает соглашение
        между вами и Samply о соблюдении условий, изложенных в настоящих Условиях использования.
      </p>
      <p>
        Samply можно использовать бесплатно в некоммерческих исследовательских целях. Для
        коммерческого использования Samply, пожалуйста, свяжитесь с нами по адресу{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Пожалуйста, внимательно прочитайте настоящие условия использования. Регистрируясь или иным
        образом используя Сервис, вы подтверждаете, что прочитали, поняли и согласны соблюдать
        настоящие Условия использования, включая нашу{' '}
        <a href='/docs/policy'>Политику конфиденциальности</a> (вместе — «Условия»). Если вы не
        согласны с чем-либо, указанным в настоящих Условиях, пожалуйста, не используйте Сервис.
      </p>

      {/* 2 */}
      <h2>2. Право на использование</h2>
      <p>
        Сервис предназначен для лиц не моложе 18 лет. Если вам нет 18 лет, вы не вправе
        использовать Сервис. Если вам 18 лет или больше, убедитесь, что вы никогда не были
        отстранены от Сервиса и что ваше использование Сервиса не нарушает никаких законов или
        нормативных актов. Если вы используете Сервис от имени компании, организации или иного
        юридического лица, вы подтверждаете нам наличие у вас полномочий обязывать это юридическое
        лицо настоящими Условиями.
      </p>

      {/* 3 */}
      <h2>3. Аккаунты и регистрация</h2>
      <p>
        При использовании Сервиса у вас есть возможность зарегистрировать аккаунт. Мы рекомендуем
        вам зарегистрировать аккаунт, поскольку это откроет доступ к специальным функциям, связанным
        с участием в онлайн-исследованиях (экспериментах или опросах) или созданием собственных
        исследований. При регистрации мы попросим вас предоставить некоторые персональные данные,
        часть из которых обязательна. Вы обещаете, что все предоставляемые вами данные верны и
        что вы будете поддерживать их точность и актуальность в будущем. Мы также просим вас
        создать пароль для защиты вашего аккаунта. Вы несёте ответственность за безопасное и
        конфиденциальное хранение пароля. Вся деятельность, осуществляемая под вашим аккаунтом,
        является вашей ответственностью. Если вы подозреваете, что ваш аккаунт более не защищён,
        вы обязаны немедленно уведомить нас по адресу{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. Вы также можете сбросить
        пароль на странице https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Лицензия на использование Сервиса</h2>
      <p>
        При условии соблюдения настоящих условий мы предоставляем вам разрешение на доступ к
        Сервису исключительно для личного использования. Сервис позволяет вам создавать исследования
        («Исследования») или участвовать в исследованиях, созданных другими пользователями Samply
        («Исследователями»).
      </p>
      <p>Обратите внимание, что данная лицензия не включает право на использование:</p>
      <ol>
        <li>Товарных знаков, логотипов или знаков, появляющихся в Исследованиях</li>
        <li>Изображений людей, если они идентифицируемы в Исследованиях</li>
        <li>Произведений искусства или авторских работ, появляющихся в Исследованиях</li>
      </ol>

      {/* 5 */}
      <h2>5. Пользовательский контент</h2>
      <p>Вы являетесь владельцем всего своего пользовательского контента, включая любые исследования, созданные вами на Сайте.</p>
      <dl>
        <dt>Общие условия</dt>
        <dd>
          Сервис позволяет вам создавать и публиковать ваши исследования, а также текстовые материалы,
          изображения, веб-ссылки, информацию о местоположении и другой контент («Пользовательский контент»).
          Весь пользовательский контент, который вы предоставляете в Сервисе, принадлежит вам или вашим
          лицензиарам. Мы не претендуем на право собственности на ваш пользовательский контент — он
          полностью принадлежит вам.
        </dd>
        <dt>Ограниченная лицензия</dt>
        <dd>
          Публикуя ваше Исследование, вы предоставляете нам всемирную, неисключительную, безвозмездную
          лицензию (с правом сублицензирования) на размещение, хранение, передачу, отображение и
          распространение (полностью или частично) вашего пользовательского контента на Сайте. Вы
          признаёте, что мы не будем платить вам за использование ваших исследований и что ваши
          исследования будут предоставлены общественности без указания авторства или компенсации. Если
          вы не хотите делать свои исследования общедоступными, вы по-прежнему можете использовать
          все функции Сервиса без ограничений.
        </dd>
        <dt>Заверения и гарантии</dt>
        <dd>
          Вы несёте единоличную ответственность за ваш пользовательский контент и все последствия его
          загрузки или публикации в Сервисе. Каждый раз, загружая или публикуя пользовательский контент,
          вы заверяете и гарантируете нам, что: (а) вы являетесь создателем и владельцем пользовательского
          контента или имеете все необходимые права от других лиц или организаций для его использования в
          Сервисе в соответствии с настоящим разделом и для предоставления другим пользователям права на
          его использование; и (б) ваш пользовательский контент не нарушает и не присваивает незаконно
          права третьих лиц, включая авторские права и иные права интеллектуальной собственности, права
          на неприкосновенность частной жизни, права на публичность или моральные права, а также не
          клевещет, не порочит и не оскорбляет кого-либо.
        </dd>
        <dt>Отказ от ответственности</dt>
        <dd>
          Мы не можем разумным образом отслеживать весь пользовательский контент, загружаемый или
          публикуемый в Сервисе, и не несём обязательств перед вами или другими пользователями по
          мониторингу, редактированию или контролю пользовательского контента. Это означает, что мы
          не несём ответственности за пользовательский контент в Сервисе, и вы соглашаетесь не
          предъявлять нам претензий в связи с пользовательским контентом. Тем не менее мы можем в
          любое время удалять, редактировать, проверять или блокировать пользовательский контент,
          если он нарушает настоящие Условия или иным образом является оскорбительным.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Запрещённое поведение</h2>
      <p>Используя Сервис, вы соглашаетесь не:</p>
      <ol type='a'>
        <li>Использовать Сервис в незаконных целях или в нарушение любого закона или нормативного акта;</li>
        <li>Нарушать права других лиц или поощрять других к нарушению, включая нарушение или незаконное присвоение прав интеллектуальной собственности;</li>
        <li>Загружать, публиковать или размещать пользовательский контент, являющийся незаконным, клеветническим, оскорбительным, непристойным, нецензурным, порнографическим, угрожающим, ненавистническим или иным образом неприемлемым;</li>
        <li>Манипулировать функциями безопасности Сервиса (например, отключать или обходить функции для доступа к закрытым исследованиям или пользовательскому контенту, либо осуществлять реверс-инжиниринг Сервиса для получения его исходного кода);</li>
        <li>Препятствовать работе Сервиса или использованию Сервиса другими пользователями (например, загружать или распространять вирусы, рекламное или шпионское ПО, рассылать незапрошенные предложения или рекламу, собирать персональные данные других лиц или нарушать работу сетей или устройств, используемых нами для предоставления Сервиса);</li>
        <li>Осуществлять мошеннические действия, например, выдавать себя за другого человека;</li>
        <li>Получать доступ к Сервису через ботов, пауков, скрипты, краулеры, скреперы или другие автоматизированные инструменты или приложения (кроме вашего веб-браузера или других мобильных приложений, которые мы можем публиковать);</li>
        <li>Копировать внешний вид Сайта или получать доступ, загружать, копировать, изменять, распространять, воспроизводить или использовать исследования для создания аналогичного или конкурирующего сервиса;</li>
        <li>Передавать свои права на использование Сервиса или на просмотр, доступ или использование каких-либо Материалов; или</li>
        <li>Пытаться совершить одно из вышеперечисленных действий или помогать кому-либо другому в этом.</li>
      </ol>

      {/* 7 */}
      <h2>7. Сервисы других компаний и связанные веб-сайты</h2>
      <p>
        На Сервисе вы можете найти инструменты, позволяющие отправлять информацию, включая
        пользовательский контент, в сервисы других компаний, например, функции, позволяющие
        связывать ваш аккаунт на Сервисе с аккаунтом другого сервиса. Используя эти инструменты,
        вы разрешаете нам отправлять эту информацию в сервисы других компаний и признаёте, что
        мы не несём ответственности за использование этой информации другими компаниями, поскольку
        никак ими не управляем. Вы также можете найти на Сервисе ссылки на другие веб-сайты,
        которые не управляются нами. Эти веб-сайты также не находятся под нашим контролем,
        поэтому самостоятельно решайте, когда покидать Сервис.
      </p>

      {/* 8 */}
      <h2>8. Прекращение действия вашего аккаунта</h2>
      <p>
        Если вы нарушите какое-либо из настоящих условий, ваше разрешение на использование Сервиса
        автоматически прекращается. Вы можете закрыть свой аккаунт в Сервисе, отправив письмо на
        адрес{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Политика конфиденциальности и дополнительные требования</h2>
      <p>
        Мы хотим, чтобы вы знали, какую информацию мы от вас собираем и как её используем.
        Пожалуйста, внимательно прочитайте нашу{' '}
        <a href='/docs/policy'>Политику конфиденциальности</a>. Политика конфиденциальности
        включена в настоящие Условия как часть нашего Соглашения. Кроме того, мы можем информировать
        вас о дополнительных требованиях, которые необходимо соблюдать при использовании Сервиса.
        Все дополнительные руководства, которые мы публикуем в Сервисе или к которым предоставляем
        ссылки, включаются в настоящие Условия как часть нашего Соглашения.
      </p>

      {/* 10 */}
      <h2>10. Изменение настоящих Условий</h2>
      <p>
        Мы можем изменить настоящие условия с уведомлением за 1 месяц. В этом случае мы приложим
        разумные усилия для уведомления вас об изменениях. Мы можем делать такие уведомления
        через всплывающий баннер, отправляя письмо на адрес электронной почты, связанный с вашим
        аккаунтом в Сервисе, или иным образом, и мы уведомим вас, когда вступит в силу новая
        версия настоящих Условий. Если вы не принимаете предложенные нами новые условия, мы можем
        немедленно закрыть ваш аккаунт и прекратить ваш доступ к Сервису. Любые споры в связи
        с Сервисом будут разрешаться в соответствии с версией настоящих Условий, действовавшей
        в момент возникновения спора.
      </p>

      {/* 11 */}
      <h2>11. Право собственности на Сервис</h2>
      <p>
        Всё программное обеспечение, визуальные интерфейсы, графика, дизайн, информация и все
        другие элементы Сервиса («Материалы»), предоставляемые нами, защищены законами об
        интеллектуальной собственности и иными законами. Мы или наши лицензиары владеем всеми
        Материалами, содержащимися в Сервисе, и вы не можете использовать Материалы, за исключением
        случаев, прямо разрешённых настоящими Условиями.
      </p>

      {/* 12 */}
      <h2>12. Отказ от ответственности; отсутствие гарантий</h2>
      <p>
        Мы предоставляем Сервис и весь контент, доступный через Сервис, на условиях «как есть»
        и «по мере доступности», без каких-либо гарантий, явных или подразумеваемых. В той мере,
        в которой это допускается применимым законодательством, мы прямо отказываемся от всех
        гарантий любого рода, включая подразумеваемые гарантии пригодности для продажи, пригодности
        для конкретной цели, ненарушения прав третьих лиц, права собственности и любых гарантий,
        вытекающих из коммерческих отношений, использования или торговой практики. Мы не гарантируем
        и не заявляем, что Сервис будет бесперебойным, безопасным или свободным от ошибок или
        вредоносных компонентов, или что мы устраним ошибки или вредоносные компоненты.
      </p>
      <p>
        За исключением случаев, предусмотренных Разделом 13 ниже, вы используете Сервис на свой
        страх и риск и принимаете на себя все риски ущерба, возникающего в результате вашего
        использования Сервиса или доступа к нему, ваших взаимодействий с другими пользователями
        Сервиса и контента, доступного через Сервис.
      </p>
      <p>
        Закон запрещает отказ от гарантий в некоторых местах, и у вас могут быть иные права,
        которые могут различаться в зависимости от места проживания. Мы ни в коем случае не
        исключаем и не ограничиваем нашу ответственность перед вами, если это было бы незаконным.
        В Великобритании и Европейском союзе это включает ответственность за смерть или
        причинение вреда здоровью, вызванные нашей халатностью или халатностью наших сотрудников,
        агентов или субподрядчиков; за мошенничество или мошеннические заявления; или за наше
        обязательство по предоставлению Сервиса с разумной осторожностью и профессионализмом или
        за наш отказ предоставить Сервис в соответствии с предоставленной информацией.
      </p>

      {/* 13 */}
      <h2>13. Общие положения</h2>
      <p>
        Настоящие Условия вместе с Политикой конфиденциальности и другими политиками, включёнными
        в настоящие Условия, представляют собой полное соглашение между вами и нами в отношении
        использования вами Сервиса. За исключением нашего права обновлять настоящие Условия в
        соответствии с Разделом 12 выше, настоящие Условия могут быть изменены только в
        письменном соглашении, подписанном вами и нами. Вы не можете без нашего согласия
        уступать или передавать настоящие Условия какому-либо другому лицу или организации,
        равно как и передавать свой аккаунт в Сервисе. Мы можем уступать настоящие Условия с
        уведомлением вас или без такового.
      </p>
      <p>
        Любая задержка или неисполнение вами ваших прав по настоящим Условиям или требования
        их соблюдения не затрагивает наше право на более позднее исполнение таких прав или
        требование их соблюдения. Если мы отказываемся от какого-либо нарушения вами настоящих
        Условий, это не означает отказа от последующего нарушения или вашего обязательства
        соблюдать нарушенные условия.
      </p>
      <p>
        В случае если какая-либо часть настоящих Условий будет признана судьёй или арбитром
        неисполнимой, неисполнимая часть будет исполнена в максимально возможной степени, а
        остальные части сохранят полную силу.
      </p>

      {/* 14 */}
      <h2>14. Согласие на электронную коммуникацию</h2>
      <p>
        Вы соглашаетесь получать от нас электронные сообщения в соответствии с нашей Политикой
        конфиденциальности. Пожалуйста, прочитайте нашу{' '}
        <a href='/docs/policy'>Политику конфиденциальности</a>, чтобы понять ваши возможности
        в отношении нашей практики электронной коммуникации. Мы можем отправлять вам уведомления,
        соглашения, раскрытия информации или другие сообщения в электронном виде.
      </p>

      {/* 15 */}
      <h2>15. Сроки хранения данных</h2>
      <p>
        Samply хранит записи в очереди ожидающих уведомлений <strong>30 дней</strong>, а историю уведомлений
        (записи ответов) — <strong>12 месяцев</strong>. По истечении этих сроков записи автоматически
        удаляются. Исследователи несут ответственность за экспорт данных исследования до истечения этих сроков.
      </p>

      {/* 16 */}
      <h2>16. Контактная информация</h2>
      <p>
        Вы можете связаться с нами, отправив письмо на адрес{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentZh() {
  return (
    <>
      {/* 1 */}
      <h2>1. 简介</h2>
      <p>
        Samply 是一个通过移动应用程序 Samply Research 管理在线实验和问卷调查参与的平台。
        Samply 托管于 https://samply.uni-konstanz.de（"网站"），提供通知排程与管理服务
        （统称"服务"）。您对本服务的使用以及我们向您提供本服务，构成您与 Samply 之间的协议，
        双方均受本使用条款所规定的条款和条件的约束。
      </p>
      <p>
        Samply 可免费用于非营利性研究目的。如需将 Samply 用于商业用途，请通过{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> 与我们联系。
      </p>
      <p>
        请仔细阅读本使用条款。注册或以其他方式使用本服务，即表示您确认已阅读、理解并同意受本使用条款
        （包括我们的<a href='/docs/policy'>隐私政策</a>，合称"条款"）的约束。如果您不同意本条款中的
        任何内容，请不要使用本服务的任何部分。
      </p>

      {/* 2 */}
      <h2>2. 使用资格</h2>
      <p>
        本服务仅供年满 18 周岁的人士使用。如果您未满 18 周岁，则不得使用本服务。如果您已年满 18 周岁，
        请确保您从未被暂停使用本服务，且您对本服务的使用不违反任何法律或法规。如果您代表公司、组织或
        其他类型的实体使用本服务，您向我们确认您有权代表该实体接受本条款的约束。
      </p>

      {/* 3 */}
      <h2>3. 账户与注册</h2>
      <p>
        使用本服务时，您可以选择注册账户。我们建议您注册账户，因为在本服务上创建账户将使您能够访问
        与参与在线研究（实验或问卷）或创建自己的研究相关的特殊功能。如果您注册，我们将在注册过程中
        请求您提供一些个人信息，其中部分信息是注册账户所必需的。您承诺所提供的所有信息均真实准确，
        并将在日后保持信息的准确性和时效性。我们还会请求您设置密码以保护您账户的安全。您有责任妥善
        保管您的密码并对其保密。您账户下发生的所有活动均由您负责。如果您认为您的账户可能不再安全，
        必须立即通过{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> 通知我们。您也可以在
        https://samply.uni-konstanz.de/researcher/forgot 重置密码。
      </p>

      {/* 4 */}
      <h2>4. 服务使用许可</h2>
      <p>
        在您持续遵守本条款的前提下，我们授予您仅供个人使用的服务访问权限。本服务允许您创建研究
        （"研究"）或参与其他 Samply 用户（"研究人员"）创建的研究。
      </p>
      <p>请注意，本许可不包括使用以下内容的权利：</p>
      <ol>
        <li>研究中出现的商标、标志或标识</li>
        <li>研究中可被识别身份的人物图像</li>
        <li>研究中出现的艺术作品或受版权保护的作品</li>
      </ol>

      {/* 5 */}
      <h2>5. 用户内容</h2>
      <p>您是您所有用户内容的所有者，包括您在网站上创建的任何研究。</p>
      <dl>
        <dt>一般条款</dt>
        <dd>
          本服务允许您创建和发布您的研究，以及文字、图片、网络链接、位置信息和其他内容
          （"用户内容"）。您在本服务上提供的所有用户内容均归您或您的许可方所有。我们不主张
          对您的用户内容拥有所有权——其完全属于您。
        </dd>
        <dt>有限许可</dt>
        <dd>
          如果您发布您的研究，您授予我们在全球范围内的、非独占性的、免版税的许可（含再许可权），
          以在网站上托管、存储、传输、展示和分发（全部或部分）您的用户内容。您确认我们不会因
          使用您的研究而向您支付任何费用，且您的研究将向公众免费提供，不附带署名或补偿。如果您
          不希望将研究公开，您仍然可以不受限制地使用本服务的所有功能。
        </dd>
        <dt>声明与保证</dt>
        <dd>
          您对您的用户内容及在本服务上传或发布用户内容所产生的一切后果负全责。每次上传或发布
          用户内容时，您向我们声明并保证：(a) 您是用户内容的创作者和所有者，或已从其他个人或
          实体获得在本服务上按本节规定使用您的用户内容并允许其他用户使用的所有必要权利；以及
          (b) 您的用户内容不侵犯或盗用任何第三方权利，包括版权及其他知识产权、隐私权、公开权
          或精神权利，也不诽谤、中伤或侮辱任何人。
        </dd>
        <dt>免责声明</dt>
        <dd>
          我们无法合理地监控上传至或发布于本服务的所有用户内容，也无义务对您或任何其他用户
          上传或发布的用户内容进行监控、编辑或控制。这意味着我们对本服务中的用户内容不承担责任，
          您同意不因用户内容向我们提出任何索赔。尽管如此，如果用户内容违反本条款或被认定为
          令人反感，我们可随时从本服务中删除、编辑、搜索或屏蔽用户内容。
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. 禁止行为</h2>
      <p>使用本服务，即表示您同意不：</p>
      <ol type='a'>
        <li>将本服务用于非法目的或违反任何法律法规；</li>
        <li>侵犯他人权利或鼓励他人侵权，包括侵犯或盗用知识产权；</li>
        <li>上传、发布或发表违法、诽谤性、辱骂性、不雅、淫秽、色情、骚扰性、威胁性、仇恨性或其他不当内容；</li>
        <li>篡改本服务的安全功能（例如，禁用或规避功能以访问私密研究或用户内容，或对本服务进行逆向工程以获取源代码）；</li>
        <li>干扰我们对本服务的运营或其他用户对本服务的使用（即不得上传或传播病毒、广告软件或间谍软件，不得发送未经请求的要约或推广信息，不得收集他人个人信息，或干扰我们用于提供本服务的网络或设备）；</li>
        <li>从事欺诈活动，例如冒充他人；</li>
        <li>通过机器人、爬虫、脚本、爬虫程序、抓取工具或其他自动化工具或应用程序（我们可能发布的网络浏览器或其他移动应用程序除外）访问本服务；</li>
        <li>复制网站的外观，或访问、下载、复制、修改、分发、展示或使用研究以创建类似或竞争性服务；</li>
        <li>转让您使用本服务或查看、访问或使用任何材料的权利；或</li>
        <li>尝试实施上述任何行为或协助他人实施。</li>
      </ol>

      {/* 7 */}
      <h2>7. 第三方服务与外部链接网站</h2>
      <p>
        您可能会在本服务上发现一些工具，允许您将信息（包括用户内容）发送至其他公司的服务，
        例如允许您将本服务账户与其他服务账户关联的功能。如果您使用这些工具，即表示您允许我们
        将此类信息发送至其他公司的服务，并确认由于我们完全无法控制其他公司，因此我们不对其
        使用此类信息的行为负责。您也可能在本服务上发现指向非我们运营的其他网站的链接。这些
        网站同样不在我们的控制范围内，请根据您自己的判断决定何时离开本服务。
      </p>

      {/* 8 */}
      <h2>8. 账户终止</h2>
      <p>
        如果您违反本条款中的任何规定，您使用本服务的权限将自动终止。您可以通过发送电子邮件至{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> 注销您在本服务中的账户。
      </p>

      {/* 9 */}
      <h2>9. 隐私政策及附加要求</h2>
      <p>
        我们希望您了解我们收集您哪些信息以及如何使用这些信息。请仔细阅读我们的
        <a href='/docs/policy'>隐私政策</a>。隐私政策作为我们协议的一部分纳入本条款。
        此外，我们可能会告知您在使用本服务时必须遵守的附加要求。我们在本服务上发布的或链接至
        本服务的任何附加指引均作为我们协议的一部分纳入本条款。
      </p>

      {/* 10 */}
      <h2>10. 条款修改</h2>
      <p>
        我们可在提前 1 个月通知的情况下更改本条款。如有更改，我们将采取合理措施通知您相关变更。
        我们可通过弹出横幅、向与您本服务账户关联的电子邮件地址发送邮件或其他方式发布此类通知，
        并将在新版条款生效时通知您。如果您不接受我们提出的新条款，我们可立即终止您的账户并
        终止您对本服务的访问权限。如果我们就本服务发生任何争议，将依据争议发生时有效的本条款
        版本予以解决。
      </p>

      {/* 11 */}
      <h2>11. 服务所有权</h2>
      <p>
        我们提供的本服务的所有软件、可视化界面、图形、设计、信息及其他所有元素（"材料"）均受
        知识产权及其他法律的保护。我们或我们的许可方拥有本服务中包含的所有材料，您只能在本条款
        明确许可的范围内使用相关材料。
      </p>

      {/* 12 */}
      <h2>12. 免责声明；不提供任何保证</h2>
      <p>
        我们以"现状"和"可用"为基础提供本服务及通过本服务获取的所有内容，不提供任何形式的明示
        或默示保证。在适用法律允许的范围内，我们明确否认一切形式的保证，包括适销性、特定用途
        适用性、不侵犯第三方权利、所有权的默示保证，以及因交易过程、惯例或商业惯例产生的任何
        保证。我们不保证或声明本服务将不间断运行、安全可靠或不含错误或有害组件，也不保证我们
        将修正任何错误或有害组件。
      </p>
      <p>
        除第 13 条另有规定外，您自行承担使用本服务的风险，并承担因使用或访问本服务、与其他
        用户的互动以及通过本服务获取的内容而造成的所有损失风险。
      </p>
      <p>
        法律在某些地区禁止免除保证责任，您可能享有因居住地不同而有所差异的其他权利。若此类
        限制属于违法行为，我们不会以任何方式排除或限制我们对您的责任。在英国和欧盟，这包括
        因我们或我们的雇员、代理商或分包商的疏忽造成的死亡或人身伤害责任；欺诈或欺诈性失实
        陈述责任；或我们以合理的注意和技能提供服务的义务，或我们未能按照有关我们或本服务的
        提供信息提供服务的责任。
      </p>

      {/* 13 */}
      <h2>13. 一般条款</h2>
      <p>
        本条款连同隐私政策及本条款纳入的其他政策，构成您与我们之间就您使用本服务所达成的完整
        协议。除我们根据上述第 12 条享有的更新本条款的权利外，本条款只能通过您和我们双方签署
        的书面协议进行修改。未经我们同意，您不得将本条款转让或转移给任何其他个人或实体，也不得
        转移您在本服务中的账户。我们可在通知或不通知您的情况下转让本条款。
      </p>
      <p>
        您延迟或未能行使本使用条款项下的任何权利或要求遵守本使用条款，不影响我们日后行使此类
        权利或要求遵守的权利。如果我们放弃您违反本使用条款的任何行为，并不意味着我们放弃追究
        后续违规行为或放弃要求您履行已违反条款的义务。
      </p>
      <p>
        如果本条款的任何部分被法官或仲裁员认定为不可执行，该不可执行部分将在最大程度上予以
        执行，其余部分仍完全有效。
      </p>

      {/* 14 */}
      <h2>14. 电子通信同意</h2>
      <p>
        您同意按照我们隐私政策的规定接收我们发送的电子通信。请阅读我们的
        <a href='/docs/policy'>隐私政策</a>，了解您在电子通信方面的选择权。我们可能以电子方式
        向您发送通知、协议、披露文件或其他通信内容。
      </p>

      {/* 15 */}
      <h2>15. 数据保留</h2>
      <p>
        Samply 将待处理通知队列记录保留 <strong>30 天</strong>，将通知历史记录（响应记录）保留{' '}
        <strong>12 个月</strong>。超过这些保留期后，记录将由平台自动删除。研究人员有责任在这些期限到期前导出任何希望保存的研究数据。
      </p>

      {/* 16 */}
      <h2>16. 联系方式</h2>
      <p>
        您可以通过发送电子邮件至{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> 与我们联系。
      </p>
    </>
  );
}

function TermsContentKo() {
  return (
    <>
      {/* 1 */}
      <h2>1. 소개</h2>
      <p>
        Samply는 모바일 애플리케이션 Samply Research를 통해 온라인 실험 및 설문조사 참여를 관리하는
        플랫폼입니다. Samply는 https://samply.uni-konstanz.de(이하 "사이트")에서 호스팅되며, 알림
        스케줄링 및 관리 서비스(통칭 "서비스")를 제공합니다. 귀하의 서비스 이용 및 당사의 서비스
        제공은 귀하와 Samply 간의 계약을 구성하며, 귀하는 본 이용약관에 명시된 조건에 구속됩니다.
      </p>
      <p>
        Samply는 비영리 연구 목적으로 무료로 이용할 수 있습니다. 상업적 목적으로 Samply를 이용하시려면{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>으로 문의해 주십시오.
      </p>
      <p>
        본 이용약관을 주의 깊게 읽어 주십시오. 서비스에 가입하거나 서비스를 이용함으로써 귀하는 본
        이용약관(당사의{' '}
        <a href='/docs/policy'>개인정보 처리방침</a> 포함, 이하 통칭 "약관")을 읽고 이해하였으며
        이에 구속되는 데 동의함을 확인합니다. 본 약관의 내용에 동의하지 않으시면 서비스의 어떠한
        부분도 이용하지 마십시오.
      </p>

      {/* 2 */}
      <h2>2. 이용 자격</h2>
      <p>
        본 서비스는 만 18세 이상인 자를 대상으로 합니다. 만 18세 미만인 경우 서비스를 이용하실 수
        없습니다. 만 18세 이상인 경우, 서비스 이용이 정지된 사실이 없으며 서비스 이용이 어떠한 법률
        또는 규정도 위반하지 않음을 확인하여 주십시오. 귀사, 기관 또는 기타 단체를 대표하여 서비스를
        이용하는 경우, 해당 단체를 본 약관에 구속시킬 권한이 있음을 당사에 확인합니다.
      </p>

      {/* 3 */}
      <h2>3. 계정 및 가입</h2>
      <p>
        서비스를 이용하는 경우 계정을 등록할 수 있습니다. 계정을 등록하시면 온라인 연구(실험 또는
        설문조사) 참여 또는 직접 연구를 생성하는 것과 관련된 특별 기능을 이용할 수 있으므로, 계정
        등록을 권장합니다. 계정 등록 시 가입 과정의 일환으로 일부 개인 정보를 제공하도록 요청드리며,
        그 중 일부는 계정 등록에 필수적입니다. 귀하는 제공하는 모든 정보가 정확하며, 향후에도 정확하고
        최신 상태로 유지할 것을 약속합니다. 또한 계정 보안을 위해 비밀번호 설정을 요청드립니다.
        비밀번호의 안전하고 기밀한 관리는 귀하의 책임입니다. 귀하의 계정에서 발생하는 모든 활동은
        귀하의 책임입니다. 계정이 더 이상 안전하지 않다고 판단되는 경우 즉시{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>으로 당사에 알려 주십시오.
        https://samply.uni-konstanz.de/researcher/forgot에서 비밀번호를 재설정할 수도 있습니다.
      </p>

      {/* 4 */}
      <h2>4. 서비스 이용 라이선스</h2>
      <p>
        귀하가 본 약관을 계속 준수하는 조건으로, 당사는 귀하에게 개인적 목적으로만 서비스에 접근할
        수 있는 권한을 부여합니다. 서비스를 통해 연구("연구")를 생성하거나 다른 Samply 이용자
        ("연구자")가 생성한 연구에 참여할 수 있습니다.
      </p>
      <p>본 라이선스는 다음 항목의 이용 권한을 포함하지 않음을 유의하십시오:</p>
      <ol>
        <li>연구에 포함된 상표, 로고 또는 표시</li>
        <li>연구에서 식별 가능한 인물의 이미지</li>
        <li>연구에 포함된 예술 작품 또는 저작물</li>
      </ol>

      {/* 5 */}
      <h2>5. 이용자 콘텐츠</h2>
      <p>귀하는 사이트에서 생성한 연구를 포함하여 모든 이용자 콘텐츠의 소유자입니다.</p>
      <dl>
        <dt>일반 조건</dt>
        <dd>
          서비스를 통해 연구와 함께 문자 텍스트, 이미지, 웹 링크, 위치 정보 및 기타 콘텐츠(이하
          "이용자 콘텐츠")를 생성하고 게시할 수 있습니다. 귀하가 서비스에 제공하는 모든 이용자
          콘텐츠는 귀하 또는 귀하의 라이선서의 소유입니다. 당사는 귀하의 이용자 콘텐츠에 대한
          소유권을 주장하지 않으며, 해당 콘텐츠는 귀하에게 전적으로 귀속됩니다.
        </dd>
        <dt>제한적 라이선스</dt>
        <dd>
          연구를 게시하는 경우, 귀하는 당사에게 사이트에서 이용자 콘텐츠를 호스팅, 저장, 전송, 표시
          및 배포(전부 또는 일부)할 수 있는 전 세계적이고 비독점적이며 무상의 라이선스(재라이선스
          권한 포함)를 부여합니다. 당사가 귀하의 연구 이용에 대한 대가를 지급하지 않으며, 귀하의
          연구가 출처 표시나 보상 없이 공개적으로 이용 가능하게 됨을 귀하는 인정합니다. 연구를
          공개하지 않으려는 경우에도 서비스의 모든 기능을 제한 없이 이용하실 수 있습니다.
        </dd>
        <dt>진술 및 보증</dt>
        <dd>
          귀하는 이용자 콘텐츠 및 서비스에 이용자 콘텐츠를 업로드하거나 게시함으로써 발생하는 모든
          결과에 대해 전적으로 책임을 집니다. 이용자 콘텐츠를 업로드하거나 게시할 때마다 귀하는 다음
          사항을 당사에 진술하고 보증합니다: (a) 귀하가 해당 콘텐츠의 창작자이자 소유자이거나, 본
          조항에서 정한 바에 따라 서비스에서 이용자 콘텐츠를 이용하고 다른 이용자가 이를 이용할 수
          있도록 허용하는 데 필요한 모든 권한을 타인 또는 단체로부터 확보하고 있음; 그리고 (b) 귀하의
          이용자 콘텐츠가 저작권 및 기타 지식재산권, 개인정보권, 퍼블리시티권 또는 인격권을 포함한
          제3자의 권리를 침해하거나 불법으로 유용하지 않으며, 타인을 명예훼손하거나 비방하지 않음.
        </dd>
        <dt>면책 조항</dt>
        <dd>
          당사가 서비스에 업로드되거나 게시된 모든 이용자 콘텐츠를 합리적으로 모니터링하는 것은
          불가능하며, 귀하 또는 다른 이용자가 업로드하거나 게시하는 이용자 콘텐츠를 모니터링, 편집
          또는 통제할 의무를 지지 않습니다. 따라서 당사는 서비스 내 이용자 콘텐츠에 대해 책임을
          지지 않으며, 귀하는 이용자 콘텐츠를 근거로 당사에 어떠한 청구도 하지 않기로 동의합니다.
          그럼에도 당사는 이용자 콘텐츠가 본 약관을 위반하거나 부적절하다고 판단될 경우 언제든지
          서비스에서 해당 콘텐츠를 삭제, 편집, 검색 또는 차단할 수 있습니다.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. 금지 행위</h2>
      <p>서비스를 이용함으로써 귀하는 다음 행위를 하지 않을 것에 동의합니다:</p>
      <ol type='a'>
        <li>서비스를 불법적인 목적으로 이용하거나 법률 또는 규정을 위반하는 행위;</li>
        <li>타인의 권리를 침해하거나 침해를 조장하는 행위(지식재산권 침해 또는 불법 유용 포함);</li>
        <li>위법하거나 명예훼손적이거나 모욕적이거나 음란하거나 저속하거나 음란물에 해당하거나 괴롭힘적이거나 위협적이거나 혐오적이거나 기타 부적절한 이용자 콘텐츠를 업로드, 게시 또는 공개하는 행위;</li>
        <li>서비스의 보안 기능을 훼손하는 행위(예: 비공개 연구 또는 이용자 콘텐츠에 접근하기 위한 기능 비활성화 또는 우회, 서비스 소스 코드 취득을 위한 역공학 등);</li>
        <li>서비스 운영이나 다른 이용자의 서비스 이용을 방해하는 행위(예: 바이러스, 애드웨어 또는 스파이웨어 업로드 또는 배포, 원치 않는 제안이나 광고 발송, 타인의 개인 정보 수집, 서비스 제공에 사용하는 네트워크 또는 기기 방해 등);</li>
        <li>타인을 사칭하는 등 사기적 행위를 하는 행위;</li>
        <li>봇, 스파이더, 스크립트, 크롤러, 스크레이퍼 또는 기타 자동화 도구나 애플리케이션(당사가 게시하는 웹 브라우저 또는 모바일 애플리케이션 제외)을 통해 서비스에 접근하는 행위;</li>
        <li>사이트의 외관을 복제하거나 연구에 접근, 다운로드, 복제, 수정, 배포, 실행 또는 이용하여 유사하거나 경쟁적인 서비스를 만드는 행위;</li>
        <li>서비스 이용 권한 또는 콘텐츠 열람, 접근, 이용 권한을 양도하는 행위; 또는</li>
        <li>위 행위를 시도하거나 타인의 위 행위를 돕는 행위.</li>
      </ol>

      {/* 7 */}
      <h2>7. 제3자 서비스 및 외부 링크 웹사이트</h2>
      <p>
        서비스 내에서 이용자 콘텐츠를 포함한 정보를 타사 서비스에 전송하거나 서비스 계정을 타
        서비스 계정과 연동하는 기능과 같은 도구를 발견할 수 있습니다. 이러한 도구를 이용하는 경우,
        귀하는 당사가 해당 정보를 타사 서비스로 전송하는 것을 허용하며, 당사가 타사를 전혀 통제하지
        않으므로 타사의 해당 정보 이용에 대해 당사가 책임지지 않음을 인정합니다. 서비스에서 당사가
        운영하지 않는 다른 웹사이트로의 링크를 발견할 수도 있습니다. 이러한 웹사이트 역시 당사의
        통제 범위 밖에 있으므로, 서비스를 떠나는 시점은 귀하의 재량에 따라 결정하시기 바랍니다.
      </p>

      {/* 8 */}
      <h2>8. 계정 해지</h2>
      <p>
        귀하가 본 약관 중 어느 조항을 위반하는 경우, 서비스 이용 권한은 자동으로 소멸됩니다.{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>으로 이메일을 발송하여
        서비스 계정을 해지할 수 있습니다.
      </p>

      {/* 9 */}
      <h2>9. 개인정보 처리방침 및 추가 요구 사항</h2>
      <p>
        당사가 귀하로부터 수집하는 정보와 그 이용 방법을 알려드리고자 합니다. 당사의{' '}
        <a href='/docs/policy'>개인정보 처리방침</a>을 주의 깊게 읽어 주십시오. 개인정보
        처리방침은 본 계약의 일부로서 본 약관에 통합됩니다. 또한 서비스 이용 시 준수해야 할
        추가 요구 사항을 알려드릴 수 있습니다. 서비스에 게시하거나 서비스와 연계된 모든 추가
        지침은 본 계약의 일부로서 본 약관에 통합됩니다.
      </p>

      {/* 10 */}
      <h2>10. 본 약관의 변경</h2>
      <p>
        당사는 1개월 전 사전 통지를 통해 본 약관을 변경할 수 있습니다. 변경 시 합리적인 노력을
        기울여 귀하에게 변경 사항을 알려드립니다. 팝업 배너, 서비스 계정에 연결된 이메일 주소로의
        발송 또는 기타 방식을 통해 공지하며, 새로운 약관이 발효될 때 귀하에게 통지합니다. 귀하가
        새로운 약관에 동의하지 않는 경우, 당사는 귀하의 계정을 즉시 해지하고 서비스 접근을 종료할
        수 있습니다. 서비스와 관련하여 분쟁이 발생하는 경우, 해당 분쟁이 발생한 시점에 유효한
        본 약관의 버전에 따라 해결됩니다.
      </p>

      {/* 11 */}
      <h2>11. 서비스 소유권</h2>
      <p>
        당사가 제공하는 서비스의 모든 소프트웨어, 시각적 인터페이스, 그래픽, 디자인, 정보 및
        기타 모든 요소(이하 "자료")는 지식재산권 및 기타 법률에 의해 보호됩니다. 서비스에 포함된
        모든 자료는 당사 또는 당사의 라이선서가 소유하며, 귀하는 본 약관에서 명시적으로 허용하는
        경우에만 자료를 이용할 수 있습니다.
      </p>

      {/* 12 */}
      <h2>12. 면책 조항; 무보증</h2>
      <p>
        당사는 서비스 및 서비스를 통해 이용 가능한 모든 콘텐츠를 명시적 또는 묵시적 보증 없이
        "현재 상태" 및 "이용 가능한 상태"로 제공합니다. 적용 법률이 허용하는 범위 내에서 당사는
        상품성, 특정 목적에의 적합성, 제3자 권리 비침해, 소유권 및 거래 관행, 관용 또는 거래
        과정에서 발생하는 묵시적 보증을 포함하여 모든 종류의 보증을 명시적으로 부인합니다. 당사는
        서비스가 중단 없이, 안전하게, 또는 오류나 유해 구성 요소 없이 제공될 것을 보증하지 않으며,
        오류나 유해 구성 요소를 수정할 것을 보증하지 않습니다.
      </p>
      <p>
        아래 제13조에 규정된 경우를 제외하고, 귀하는 서비스를 귀하의 책임 하에 이용하며 서비스
        이용 또는 접근, 다른 이용자와의 상호 작용 및 서비스를 통해 이용 가능한 콘텐츠로 인해
        발생하는 손해에 대한 모든 위험을 부담합니다.
      </p>
      <p>
        일부 지역에서는 법률이 보증 책임의 부인을 금지하며, 거주 지역에 따라 추가적인 권리를
        보유할 수 있습니다. 당사는 이러한 제한이 위법에 해당하는 경우 어떠한 방식으로도 귀하에
        대한 책임을 배제하거나 제한하지 않습니다. 영국 및 유럽연합에서는 이에 당사 또는 당사의
        직원, 대리인 또는 수급인의 과실로 인한 사망 또는 신체 상해에 대한 책임; 사기 또는 기망에
        의한 불실 진술에 대한 책임; 합리적인 주의와 기술로 서비스를 제공할 의무 또는 당사 또는
        서비스에 관해 제공된 정보에 따라 서비스를 제공하지 않은 것에 대한 책임이 포함됩니다.
      </p>

      {/* 13 */}
      <h2>13. 일반 조항</h2>
      <p>
        본 약관은 개인정보 처리방침 및 본 약관에 통합된 기타 정책과 함께 서비스 이용과 관련한
        귀하와 당사 간의 완전한 합의를 구성합니다. 위 제12조에 따른 본 약관 업데이트 권한을
        제외하고, 본 약관은 귀하와 당사가 서명한 서면 합의에 의해서만 수정될 수 있습니다. 귀하는
        당사의 동의 없이 본 약관을 타인 또는 단체에 양도하거나 이전할 수 없으며, 서비스 계정을
        이전할 수 없습니다. 당사는 귀하에게 통지하거나 통지하지 않고 본 약관을 양도할 수 있습니다.
      </p>
      <p>
        귀하가 본 이용약관상의 권리를 행사하거나 준수를 요구하는 것을 지연하거나 이행하지 않더라도,
        당사가 나중에 그러한 권리를 행사하거나 준수를 요구하는 권리에는 영향을 미치지 않습니다.
        당사가 귀하의 본 이용약관 위반을 묵인하더라도 이후 위반이나 위반된 조항을 준수할 귀하의
        의무에 대한 권리를 포기하는 것이 아닙니다.
      </p>
      <p>
        본 약관의 일부가 법관 또는 중재인에 의해 집행 불가능한 것으로 판단되는 경우, 해당 부분은
        최대한 집행 가능한 범위 내에서 적용되며 나머지 부분은 완전한 효력을 유지합니다.
      </p>

      {/* 14 */}
      <h2>14. 전자적 통신 동의</h2>
      <p>
        귀하는 당사의 개인정보 처리방침에 규정된 바에 따라 당사로부터 전자적 통신을 수신하는 것에
        동의합니다. 전자적 통신 관행에 관한 귀하의 선택 사항을 이해하기 위해 당사의{' '}
        <a href='/docs/policy'>개인정보 처리방침</a>을 읽어 주십시오. 당사는 귀하에게 전자적
        방식으로 통지, 계약, 공개 또는 기타 통신을 발송할 수 있습니다.
      </p>

      {/* 15 */}
      <h2>15. 데이터 보존</h2>
      <p>
        Samply는 대기 중인 알림 큐 기록을 <strong>30일</strong> 동안, 알림 기록(응답 기록)을{' '}
        <strong>12개월</strong> 동안 보관합니다. 이 보존 기간이 지나면 기록이 플랫폼에 의해 자동으로
        삭제됩니다. 연구자는 이 기간이 만료되기 전에 보존하고자 하는 연구 데이터를 내보낼 책임이 있습니다.
      </p>

      {/* 16 */}
      <h2>16. 연락처</h2>
      <p>
        당사에 연락하시려면{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>으로 이메일을 보내 주십시오.
      </p>
    </>
  );
}

function TermsContentIt() {
  return (
    <>
      {/* 1 */}
      <h2>1. Introduzione</h2>
      <p>
        Samply è una piattaforma per la gestione della partecipazione a esperimenti online e
        sondaggi tramite l&apos;applicazione mobile Samply Research. Samply è ospitato su
        https://samply.uni-konstanz.de (il &quot;Sito&quot;), che fornisce servizi per la
        pianificazione e la gestione delle notifiche (collettivamente il &quot;Servizio&quot;).
        L&apos;utilizzo del Servizio da parte dell&apos;utente e la fornitura del Servizio da
        parte nostra costituiscono un accordo tra l&apos;utente e Samply vincolato ai termini e
        alle condizioni stabiliti nelle presenti Condizioni d&apos;uso.
      </p>
      <p>
        Samply può essere utilizzato gratuitamente per scopi di ricerca non commerciale. Per
        l&apos;utilizzo commerciale di Samply, si prega di contattarci all&apos;indirizzo{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Si prega di leggere attentamente le presenti condizioni d&apos;uso. Registrandosi o
        utilizzando in altro modo il Servizio, l&apos;utente dichiara di aver letto, compreso e
        accettato di essere vincolato dalle presenti Condizioni d&apos;uso, compresa la nostra{' '}
        <a href='/docs/policy'>Informativa sulla privacy</a> (congiuntamente, le
        &quot;Condizioni&quot;). Qualora non si concordi con quanto indicato nelle presenti
        Condizioni, si prega di non utilizzare alcuna parte del Servizio.
      </p>

      {/* 2 */}
      <h2>2. Requisiti di utilizzo</h2>
      <p>
        Il Servizio è destinato a persone di età non inferiore a 18 anni. Se si è minorenni,
        non è consentito utilizzare il Servizio. Se si è maggiorenni, si prega di assicurarsi
        di non essere mai stati sospesi dal Servizio e che l&apos;utilizzo del Servizio non
        violi alcuna legge o regolamento. Qualora si utilizzi il Servizio per conto di una
        società, un&apos;organizzazione o altro tipo di entità, l&apos;utente conferma di avere
        l&apos;autorità di vincolare l&apos;entità alle presenti Condizioni per suo conto.
      </p>

      {/* 3 */}
      <h2>3. Account e registrazione</h2>
      <p>
        Utilizzando il Servizio, l&apos;utente ha la possibilità di registrare un account. Si
        consiglia di registrare un account, in quanto la creazione di un account sul Servizio
        consentirà di accedere a funzionalità speciali relative alla partecipazione a studi
        online (esperimenti o sondaggi) o alla creazione di studi propri. In tal caso,
        richiederemo di fornire alcune informazioni personali nell&apos;ambito del processo di
        registrazione, alcune delle quali sono necessarie per registrare l&apos;account.
        L&apos;utente si impegna a fornire informazioni accurate e ad aggiornarle in futuro.
        Richiediamo inoltre di impostare una password per proteggere la sicurezza dell&apos;account.
        L&apos;utente è responsabile della custodia sicura e riservata della password. Qualsiasi
        attività svolta tramite l&apos;account è di responsabilità dell&apos;utente. Qualora si
        ritenga che l&apos;account possa non essere più sicuro, è necessario notificarcelo
        immediatamente all&apos;indirizzo{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. È inoltre possibile
        reimpostare la password all&apos;indirizzo https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licenza d&apos;uso del Servizio</h2>
      <p>
        A condizione che l&apos;utente continui a rispettare le presenti condizioni, gli
        concediamo il permesso di accedere al Servizio esclusivamente per uso personale. Il
        Servizio consente di creare studi (&quot;Studi&quot;) o di partecipare a studi creati
        da altri utenti di Samply (&quot;Ricercatori&quot;).
      </p>
      <p>Si prega di notare che la presente licenza non include il diritto di utilizzare:</p>
      <ol>
        <li>Marchi, loghi o segni che compaiono negli Studi</li>
        <li>Immagini di persone, se identificabili negli Studi</li>
        <li>Opere d&apos;arte o opere d&apos;autore che compaiono negli Studi</li>
      </ol>

      {/* 5 */}
      <h2>5. Contenuti degli utenti</h2>
      <p>L&apos;utente è proprietario di tutti i propri Contenuti utente, compresi gli studi creati sul Sito.</p>
      <dl>
        <dt>Condizioni generali</dt>
        <dd>
          Il Servizio consente di creare e pubblicare studi, nonché testi scritti, immagini,
          link web, informazioni sulla posizione e altri contenuti (&quot;Contenuti utente&quot;).
          Tutti i Contenuti utente forniti tramite il Servizio sono di proprietà dell&apos;utente
          o dei suoi licenzianti. Non rivendichiamo la proprietà dei Contenuti utente —
          appartengono interamente all&apos;utente.
        </dd>
        <dt>Licenza limitata</dt>
        <dd>
          Se l&apos;utente pubblica il proprio Studio, ci concede una licenza mondiale, non
          esclusiva, gratuita (con diritto di sublicenza) per ospitare, archiviare, trasmettere,
          visualizzare e distribuire (in tutto o in parte) i Contenuti utente sul Sito.
          L&apos;utente riconosce che non riceverà alcun compenso per l&apos;utilizzo dei propri
          studi e che tali studi saranno resi disponibili al pubblico senza attribuzione o
          compenso. Qualora non si desideri rendere i propri studi disponibili al pubblico, è
          comunque possibile utilizzare tutte le funzionalità del Servizio senza restrizioni.
        </dd>
        <dt>Dichiarazioni e garanzie</dt>
        <dd>
          L&apos;utente è l&apos;unico responsabile dei propri Contenuti utente e di tutte le
          conseguenze derivanti dal caricamento o dalla pubblicazione di Contenuti utente sul
          Servizio. Ogni volta che l&apos;utente carica o pubblica Contenuti utente, dichiara e
          garantisce che: (a) è il creatore e proprietario dei Contenuti utente o dispone di
          tutti i diritti necessari da altre persone o entità per utilizzare i Contenuti utente
          sul Servizio come previsto nella presente Sezione e per consentire ad altri utenti di
          utilizzarli; e (b) i Contenuti utente non violano né si appropriano indebitamente di
          diritti di terzi, inclusi diritti d&apos;autore e altri diritti di proprietà
          intellettuale, diritti alla privacy, diritti di immagine o diritti morali, né
          diffamano o calunniano alcuno.
        </dd>
        <dt>Clausola di esclusione della responsabilità</dt>
        <dd>
          Non è ragionevolmente possibile per noi monitorare tutti i Contenuti utente caricati
          o pubblicati sul Servizio, e non abbiamo alcun obbligo nei confronti dell&apos;utente
          o di altri utenti di monitorare, modificare o controllare i Contenuti utente che
          l&apos;utente e altri utenti caricano o pubblicano sul Servizio. Ciò significa che non
          siamo responsabili per i Contenuti utente sul Servizio e l&apos;utente si impegna a
          non avanzare alcuna pretesa nei nostri confronti in relazione ai Contenuti utente.
          Tuttavia, possiamo rimuovere, modificare, cercare o bloccare Contenuti utente dal
          Servizio in qualsiasi momento se violano le presenti Condizioni o risultano altrimenti
          offensivi.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Condotta vietata</h2>
      <p>Utilizzando il Servizio, l&apos;utente si impegna a non:</p>
      <ol type='a'>
        <li>Utilizzare il Servizio per scopi illegali o in violazione di leggi o regolamenti;</li>
        <li>Violare i diritti altrui o incoraggiare altri a farlo, inclusa la violazione o l&apos;appropriazione indebita di diritti di proprietà intellettuale;</li>
        <li>Caricare, pubblicare o diffondere Contenuti utente illeciti, diffamatori, offensivi, indecenti, volgari, pornografici, molesti, minacciosi, d&apos;odio o altrimenti inappropriati;</li>
        <li>Manomettere le funzionalità di sicurezza del Servizio (ad es. disabilitare o aggirare funzioni per accedere a studi privati o Contenuti utente, o eseguire il reverse engineering del Servizio per ottenerne il codice sorgente);</li>
        <li>Interferire con la gestione del Servizio o con l&apos;utilizzo del Servizio da parte di altri utenti (ad es. non caricare o distribuire virus, adware o spyware, non inviare offerte o promozioni non richieste, non raccogliere informazioni personali altrui, non interferire con le reti o i dispositivi utilizzati per fornire il Servizio);</li>
        <li>Porre in essere attività fraudolente, come impersonare un&apos;altra persona;</li>
        <li>Accedere al Servizio tramite bot, spider, script, crawler, scraper o altri strumenti o applicazioni automatizzati (ad eccezione del proprio browser web o di altre applicazioni mobili da noi eventualmente pubblicate);</li>
        <li>Copiare l&apos;aspetto del Sito o accedere, scaricare, copiare, modificare, distribuire, eseguire o utilizzare studi per creare un servizio simile o concorrente;</li>
        <li>Trasferire i propri diritti di utilizzo del Servizio o di visualizzazione, accesso o utilizzo di qualsiasi Materiale; oppure</li>
        <li>Tentare di porre in essere uno di questi atti o aiutare altri a farlo.</li>
      </ol>

      {/* 7 */}
      <h2>7. Servizi di terze parti e siti web collegati</h2>
      <p>
        Sul Servizio potrebbero essere disponibili strumenti che consentono di inviare
        informazioni, inclusi Contenuti utente, ai servizi di altre società, ad esempio funzioni
        che permettono di collegare il proprio account sul Servizio a un account presso un altro
        servizio. Utilizzando tali strumenti, l&apos;utente ci consente di inviare tali
        informazioni ai servizi di altre società e riconosce che non siamo responsabili
        dell&apos;utilizzo di tali informazioni da parte di tali società, in quanto non le
        controlliamo in alcun modo. Sul Servizio potrebbero essere presenti anche link ad altri
        siti web non gestiti da noi. Tali siti web non sono soggetti al nostro controllo;
        si prega pertanto di decidere autonomamente quando abbandonare il Servizio.
      </p>

      {/* 8 */}
      <h2>8. Chiusura dell&apos;account</h2>
      <p>
        In caso di violazione di una qualsiasi delle presenti condizioni, il permesso di
        utilizzare il Servizio si estingue automaticamente. L&apos;utente può cancellare il
        proprio account dal Servizio inviando un&apos;e-mail a{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Informativa sulla privacy e requisiti aggiuntivi</h2>
      <p>
        Desideriamo che l&apos;utente sappia quali informazioni raccogliamo e come le utilizziamo.
        Si prega di leggere attentamente la nostra{' '}
        <a href='/docs/policy'>Informativa sulla privacy</a>. L&apos;Informativa sulla privacy
        è incorporata nelle presenti Condizioni come parte del nostro Accordo. Inoltre, potremmo
        informare l&apos;utente di requisiti aggiuntivi da rispettare nell&apos;utilizzo del
        Servizio. Eventuali linee guida aggiuntive pubblicate sul Servizio o collegate ad esso
        sono incorporate nelle presenti Condizioni come parte del nostro Accordo.
      </p>

      {/* 10 */}
      <h2>10. Modifica delle presenti Condizioni</h2>
      <p>
        Potremmo modificare le presenti condizioni con un preavviso di 1 mese. In tal caso,
        faremo ragionevoli sforzi per informare l&apos;utente delle modifiche. Tali comunicazioni
        potranno essere rese disponibili tramite un banner pop-up, inviando un&apos;e-mail
        all&apos;indirizzo associato all&apos;account dell&apos;utente sul Servizio, o in altro
        modo, e comunicheremo all&apos;utente la data di entrata in vigore della nuova versione
        delle presenti Condizioni. Se l&apos;utente non accetta le nuove condizioni proposte,
        potremmo chiudere immediatamente il suo account e terminare l&apos;accesso al Servizio.
        Eventuali controversie riguardanti il Servizio saranno risolte conformemente alla
        versione delle presenti Condizioni in vigore al momento dell&apos;insorgere della
        controversia.
      </p>

      {/* 11 */}
      <h2>11. Titolarità del Servizio</h2>
      <p>
        Tutto il software, le interfacce visive, la grafica, i design, le informazioni e tutti
        gli altri elementi del Servizio (i &quot;Materiali&quot;) da noi forniti sono protetti
        dalla proprietà intellettuale e da altre leggi. Noi o i nostri licenzianti possediamo
        tutti i Materiali contenuti nel Servizio e l&apos;utente non può utilizzare i Materiali
        se non nei modi espressamente consentiti dalle presenti Condizioni.
      </p>

      {/* 12 */}
      <h2>12. Clausola di esclusione della responsabilità; nessuna garanzia</h2>
      <p>
        Forniamo il Servizio e tutti i contenuti disponibili tramite il Servizio su base
        &quot;così come sono&quot; e &quot;come disponibili&quot;, senza garanzie di alcun tipo,
        espresse o implicite. Nella misura consentita dalla legge applicabile, decliniamo
        espressamente qualsiasi garanzia di qualsiasi tipo, incluse le garanzie implicite di
        commerciabilità, idoneità a uno scopo particolare, non violazione di diritti di terzi,
        titolo e qualsiasi garanzia derivante da prassi commerciale, uso o consuetudine. Non
        garantiamo né dichiariamo che il Servizio sarà ininterrotto, sicuro o privo di errori
        o componenti dannosi, né che correggeremo errori o componenti dannosi.
      </p>
      <p>
        Salvo quanto previsto dalla Sezione 13 seguente, l&apos;utilizzo del Servizio avviene
        a rischio dell&apos;utente, che si assume tutti i rischi di danni derivanti
        dall&apos;utilizzo o dall&apos;accesso al Servizio, dalle interazioni con altri utenti
        del Servizio e dai Contenuti disponibili tramite il Servizio.
      </p>
      <p>
        La legge vieta l&apos;esclusione delle garanzie in alcuni luoghi e l&apos;utente
        potrebbe avere altri diritti che variano a seconda del luogo di residenza. Non
        escludiamo né limitiamo in alcun modo la nostra responsabilità nei confronti
        dell&apos;utente se ciò fosse illegale. Nel Regno Unito e nell&apos;Unione Europea ciò
        include la responsabilità per morte o lesioni personali causate da nostra negligenza o
        da quella dei nostri dipendenti, agenti o subappaltatori; per frode o dichiarazione
        fraudolenta; o per il nostro obbligo di fornire il Servizio con ragionevole cura e
        competenza o per il nostro inadempimento nel fornire il Servizio in conformità alle
        informazioni fornite su di noi o sul Servizio.
      </p>

      {/* 13 */}
      <h2>13. Disposizioni generali</h2>
      <p>
        Le presenti Condizioni, unitamente all&apos;Informativa sulla privacy e alle altre
        politiche incorporate nelle presenti Condizioni, costituiscono l&apos;intero accordo
        tra l&apos;utente e noi con riferimento all&apos;utilizzo del Servizio. Fatta eccezione
        per il nostro diritto di aggiornare le presenti Condizioni in conformità alla Sezione 12
        di cui sopra, le presenti Condizioni possono essere modificate solo mediante un accordo
        scritto firmato da entrambe le parti. L&apos;utente non può cedere o trasferire le
        presenti Condizioni a terzi senza il nostro consenso, né trasferire il proprio account
        sul Servizio. Potremmo cedere le presenti Condizioni con o senza preavviso.
      </p>
      <p>
        Qualsiasi ritardo o mancata applicazione da parte dell&apos;utente di diritti derivanti
        dalle presenti Condizioni d&apos;uso o di richiesta di conformità alle stesse non pregiudica
        il nostro diritto di far valere tali diritti in un momento successivo o di richiedere la
        conformità alle stesse. La nostra rinuncia a qualsiasi inadempimento da parte
        dell&apos;utente delle presenti Condizioni d&apos;uso non implica la rinuncia a un
        inadempimento successivo né all&apos;obbligo dell&apos;utente di rispettare le condizioni
        violate.
      </p>
      <p>
        Nell&apos;ipotesi in cui una parte delle presenti Condizioni sia ritenuta inapplicabile
        da un giudice o arbitro, la parte inapplicabile sarà applicata nella misura massima
        possibile e le parti restanti rimarranno pienamente in vigore.
      </p>

      {/* 14 */}
      <h2>14. Consenso alle comunicazioni elettroniche</h2>
      <p>
        L&apos;utente accetta di ricevere comunicazioni elettroniche da parte nostra come
        descritto nella nostra Informativa sulla privacy. Si prega di leggere la nostra{' '}
        <a href='/docs/policy'>Informativa sulla privacy</a> per comprendere le opzioni
        disponibili in merito alle nostre pratiche di comunicazione elettronica. Potremmo
        inviare all&apos;utente comunicazioni, accordi, informazioni o altre comunicazioni in
        formato elettronico.
      </p>

      {/* 15 */}
      <h2>15. Conservazione dei dati</h2>
      <p>
        Samply conserva i record della coda delle notifiche in sospeso per <strong>30 giorni</strong> e
        la cronologia delle notifiche (record delle risposte) per <strong>12 mesi</strong>. Al termine di
        questi periodi, i record vengono eliminati automaticamente. I ricercatori sono responsabili
        dell&apos;esportazione dei dati dello studio prima della scadenza di questi periodi.
      </p>

      {/* 16 */}
      <h2>16. Informazioni di contatto</h2>
      <p>
        È possibile contattarci inviando un&apos;e-mail a{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentFr() {
  return (
    <>
      {/* 1 */}
      <h2>1. Introduction</h2>
      <p>
        Samply est une plateforme permettant de gérer la participation à des expériences en
        ligne et des sondages via l&apos;application mobile Samply Research. Samply est
        hébergé sur https://samply.uni-konstanz.de (le &quot;Site&quot;), qui fournit des
        services de planification et de gestion des notifications (collectivement, le
        &quot;Service&quot;). Votre utilisation du Service et la fourniture du Service par
        nos soins constituent un accord entre vous et Samply vous engageant à respecter les
        conditions générales énoncées dans les présentes Conditions d&apos;utilisation.
      </p>
      <p>
        Samply est utilisable gratuitement à des fins de recherche non commerciale. Pour un
        usage commercial de Samply, veuillez nous contacter à{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Veuillez lire attentivement ces conditions d&apos;utilisation. En vous inscrivant au
        Service ou en l&apos;utilisant de quelque manière que ce soit, vous reconnaissez
        avoir lu, compris et accepté d&apos;être lié par les présentes Conditions
        d&apos;utilisation, y compris notre{' '}
        <a href='/docs/policy'>Politique de confidentialité</a> (ensemble, ces
        &quot;Conditions&quot;). Si vous n&apos;acceptez pas l&apos;une des dispositions de
        ces Conditions, veuillez ne pas utiliser le Service.
      </p>

      {/* 2 */}
      <h2>2. Conditions d&apos;éligibilité</h2>
      <p>
        Le Service est destiné aux personnes âgées d&apos;au moins 18 ans. Si vous avez
        moins de 18 ans, vous n&apos;êtes pas autorisé à utiliser le Service. Si vous avez
        18 ans ou plus, veillez à ne jamais avoir été suspendu du Service et à ce que votre
        utilisation du Service ne viole aucune loi ni réglementation. Si vous utilisez le
        Service au nom d&apos;une entreprise, d&apos;une organisation ou d&apos;une autre
        entité, vous nous certifiez être habilité à engager cette entité par les présentes
        Conditions en son nom.
      </p>

      {/* 3 */}
      <h2>3. Comptes et inscription</h2>
      <p>
        Si vous utilisez le Service, vous avez la possibilité de créer un compte. Nous vous
        recommandons de créer un compte, car cela vous donnera accès à des fonctionnalités
        spéciales liées à la participation à des études en ligne (expériences ou sondages)
        ou à la création de vos propres études. Dans ce cas, nous vous demanderons de nous
        fournir certaines informations personnelles dans le cadre du processus
        d&apos;inscription, dont certaines sont obligatoires. Vous vous engagez à ce que
        toutes les informations fournies soient exactes et à les maintenir à jour. Nous vous
        demandons également de choisir un mot de passe pour protéger la sécurité de votre
        compte. Vous êtes responsable de la confidentialité de votre mot de passe. Toute
        activité survenant sous votre compte relève de votre responsabilité. Si vous pensez
        que votre compte n&apos;est plus sécurisé, vous devez nous en informer immédiatement
        à{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. Vous pouvez
        également réinitialiser votre mot de passe sur
        https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licence d&apos;utilisation du Service</h2>
      <p>
        Sous réserve de votre respect des présentes conditions, nous vous accordons
        l&apos;autorisation d&apos;accéder au Service à des fins personnelles uniquement. Le
        Service vous permet de créer des études (&quot;Études&quot;) ou de participer à des
        études créées par d&apos;autres utilisateurs de Samply (&quot;Chercheurs&quot;).
      </p>
      <p>Veuillez noter que cette licence n&apos;inclut pas le droit d&apos;utiliser :</p>
      <ol>
        <li>Les marques commerciales, logos ou insignes figurant dans les Études</li>
        <li>Les images de personnes identifiables dans les Études</li>
        <li>Les œuvres artistiques ou littéraires figurant dans les Études</li>
      </ol>

      {/* 5 */}
      <h2>5. Contenu utilisateur</h2>
      <p>Vous êtes propriétaire de l&apos;ensemble de vos Contenus utilisateur, y compris les études que vous créez sur le Site.</p>
      <dl>
        <dt>Conditions générales</dt>
        <dd>
          Le Service vous permet de créer et de publier vos études, ainsi que des textes,
          images, liens web, informations de localisation et autres contenus
          (&quot;Contenus utilisateur&quot;). Tous les Contenus utilisateur que vous
          fournissez sur le Service vous appartiennent ou appartiennent à vos concédants.
          Nous ne revendiquons aucune propriété sur vos Contenus utilisateur — ils vous
          appartiennent entièrement.
        </dd>
        <dt>Licence limitée</dt>
        <dd>
          Si vous publiez votre Étude, vous nous accordez une licence mondiale, non
          exclusive et gratuite (avec droit de sous-licence) pour héberger, stocker,
          transmettre, afficher et distribuer (en tout ou en partie) vos Contenus
          utilisateur sur le Site. Vous reconnaissez que nous ne vous rémunérerons pas pour
          l&apos;utilisation de vos études et que celles-ci seront mises à la disposition du
          public sans attribution ni compensation. Si vous ne souhaitez pas rendre vos
          études accessibles au public, vous pouvez néanmoins utiliser toutes les
          fonctionnalités du Service sans restriction.
        </dd>
        <dt>Déclarations et garanties</dt>
        <dd>
          Vous êtes seul responsable de vos Contenus utilisateur et de toutes les
          conséquences de leur mise en ligne ou publication sur le Service. Chaque fois que
          vous téléchargez ou publiez des Contenus utilisateur, vous nous déclarez et
          garantissez que : (a) vous êtes le créateur et propriétaire des Contenus
          utilisateur ou disposez de tous les droits nécessaires pour les utiliser sur le
          Service comme prévu dans cette Section et pour permettre à d&apos;autres
          utilisateurs de les utiliser ; et (b) vos Contenus utilisateur ne portent pas
          atteinte aux droits de tiers, notamment les droits d&apos;auteur et autres droits
          de propriété intellectuelle, les droits à la vie privée, les droits à l&apos;image
          ou les droits moraux, et ne diffament ni ne calomnient quiconque.
        </dd>
        <dt>Clause de non-responsabilité</dt>
        <dd>
          Il ne nous est pas raisonnablement possible de surveiller tous les Contenus
          utilisateur mis en ligne ou publiés sur le Service, et nous n&apos;avons aucune
          obligation envers vous ou tout autre utilisateur de surveiller, modifier ou
          contrôler les Contenus utilisateur que vous et d&apos;autres utilisateurs mettez
          en ligne ou publiez sur le Service. Cela signifie que nous ne sommes pas
          responsables des Contenus utilisateur sur le Service et vous acceptez de ne
          formuler aucune réclamation à notre encontre sur la base de ces Contenus
          utilisateur. Néanmoins, nous pouvons supprimer, modifier, rechercher ou bloquer
          des Contenus utilisateur du Service à tout moment s&apos;ils violent les présentes
          Conditions ou s&apos;avèrent autrement offensants.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Comportements interdits</h2>
      <p>En utilisant le Service, vous vous engagez à ne pas :</p>
      <ol type='a'>
        <li>Utiliser le Service à des fins illégales ou en violation de toute loi ou réglementation ;</li>
        <li>Violer les droits d&apos;autrui ou encourager d&apos;autres à le faire, notamment la violation ou l&apos;appropriation abusive de droits de propriété intellectuelle ;</li>
        <li>Mettre en ligne, publier ou diffuser des Contenus utilisateur illicites, diffamatoires, abusifs, indécents, grossiers, pornographiques, harcelants, menaçants, haineux ou autrement inappropriés ;</li>
        <li>Contourner les fonctions de sécurité du Service (par ex. désactiver ou contourner des fonctions pour accéder à des études privées ou à des Contenus utilisateur, ou procéder à une rétro-ingénierie du Service pour en obtenir le code source) ;</li>
        <li>Perturber notre exploitation du Service ou l&apos;utilisation du Service par un autre utilisateur (c&apos;est-à-dire ne pas télécharger ni distribuer des virus, logiciels publicitaires ou espions, ne pas envoyer d&apos;offres ou de promotions non sollicitées, ne pas collecter des informations personnelles sur autrui, ne pas interférer avec les réseaux ou appareils que nous utilisons pour fournir le Service) ;</li>
        <li>Se livrer à des activités frauduleuses, comme usurper l&apos;identité d&apos;une autre personne ;</li>
        <li>Accéder au Service via des robots, araignées, scripts, crawlers, scrapers ou autres outils ou applications automatisés (autres que votre navigateur web ou d&apos;autres applications mobiles que nous pourrions publier) ;</li>
        <li>Copier l&apos;apparence du Site ou accéder, télécharger, copier, modifier, distribuer, exécuter ou utiliser des études pour créer un service similaire ou concurrent ;</li>
        <li>Transférer vos droits d&apos;utilisation du Service ou de visualisation, d&apos;accès ou d&apos;utilisation de tout Matériel ; ou</li>
        <li>Tenter de faire l&apos;une de ces choses ou aider quelqu&apos;un d&apos;autre à le faire.</li>
      </ol>

      {/* 7 */}
      <h2>7. Services tiers et sites web liés</h2>
      <p>
        Vous pouvez trouver sur le Service des outils vous permettant d&apos;envoyer des
        informations, y compris des Contenus utilisateur, aux services d&apos;autres
        sociétés, par exemple des fonctions vous permettant de lier votre compte sur le
        Service à un compte sur un autre service. Si vous utilisez ces outils, vous nous
        autorisez à envoyer ces informations aux services d&apos;autres sociétés, et vous
        reconnaissez que nous ne sommes pas responsables de l&apos;utilisation de ces
        informations par ces sociétés, car nous ne les contrôlons pas. Vous pouvez
        également trouver sur le Service des liens vers d&apos;autres sites web qui ne sont
        pas exploités par nous. Ces sites web ne sont pas non plus sous notre contrôle ;
        veuillez donc décider de quitter le Service à votre propre discrétion.
      </p>

      {/* 8 */}
      <h2>8. Résiliation de votre compte</h2>
      <p>
        Si vous violez l&apos;une de ces conditions, votre autorisation d&apos;utiliser le
        Service prend automatiquement fin. Vous pouvez résilier votre compte en nous
        envoyant un e-mail à{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Politique de confidentialité et exigences supplémentaires</h2>
      <p>
        Nous souhaitons que vous sachiez quelles informations nous collectons et comment
        nous les utilisons. Veuillez lire attentivement notre{' '}
        <a href='/docs/policy'>Politique de confidentialité</a>. La Politique de
        confidentialité est intégrée aux présentes Conditions dans le cadre de notre Accord.
        De plus, nous pouvons vous informer d&apos;exigences supplémentaires que vous devez
        respecter lors de l&apos;utilisation du Service. Toute directive supplémentaire que
        nous publions sur le Service ou que nous y relions sera intégrée aux présentes
        Conditions dans le cadre de notre Accord.
      </p>

      {/* 10 */}
      <h2>10. Modification des présentes Conditions</h2>
      <p>
        Nous pouvons modifier ces conditions avec un préavis d&apos;un mois. Le cas échéant,
        nous ferons des efforts raisonnables pour vous informer des modifications. Nous
        pouvons rendre ces avis disponibles via une bannière contextuelle, en envoyant un
        e-mail à l&apos;adresse associée à votre compte sur le Service, ou autrement, et
        nous vous informerons de l&apos;entrée en vigueur de la nouvelle version des
        présentes Conditions. Si vous n&apos;acceptez pas les nouvelles conditions que nous
        proposons, nous pouvons résilier immédiatement votre compte et mettre fin à votre
        accès au Service. En cas de litige concernant le Service, celui-ci sera résolu
        conformément à la version des présentes Conditions en vigueur au moment où le litige
        survient.
      </p>

      {/* 11 */}
      <h2>11. Propriété du Service</h2>
      <p>
        Tous les logiciels, interfaces visuelles, graphiques, designs, informations et tous
        les autres éléments du Service (les &quot;Matériels&quot;) que nous fournissons sont
        protégés par la propriété intellectuelle et d&apos;autres lois. Nous ou nos
        concédants détenons l&apos;ensemble des Matériels contenus dans le Service, et vous
        ne pouvez pas utiliser ces Matériels sauf dans les cas expressément autorisés par
        les présentes Conditions.
      </p>

      {/* 12 */}
      <h2>12. Clause de non-responsabilité ; Absence de garanties</h2>
      <p>
        Nous fournissons le Service et tout le contenu disponible via le Service sur la base
        &quot;tel quel&quot; et &quot;selon disponibilité&quot;, sans garantie d&apos;aucune
        sorte, expresse ou implicite. Dans la mesure permise par la loi applicable, nous
        déclinons expressément toute garantie de quelque nature que ce soit, y compris les
        garanties implicites de qualité marchande, d&apos;adéquation à un usage particulier,
        de non-violation des droits de tiers, de titre et toute garantie découlant des usages
        commerciaux. Nous ne garantissons pas que le Service sera ininterrompu, sécurisé ou
        exempt d&apos;erreurs ou de composants nuisibles, ni que nous corrigerons les erreurs
        ou composants nuisibles.
      </p>
      <p>
        Sauf disposition contraire de la Section 13 ci-dessous, vous utilisez le Service à
        vos propres risques et assumez l&apos;ensemble des risques de dommages résultant de
        votre utilisation du Service ou de votre accès à celui-ci, de vos interactions avec
        d&apos;autres utilisateurs du Service, et du Contenu disponible via le Service.
      </p>
      <p>
        La loi interdit les clauses d&apos;exclusion de garanties dans certains pays, et vous
        pouvez bénéficier d&apos;autres droits variant selon votre lieu de résidence. Nous
        n&apos;excluons ni ne limitons notre responsabilité envers vous de quelque manière
        que ce soit si cela était illégal. Au Royaume-Uni et dans l&apos;Union européenne,
        cela inclut la responsabilité en cas de décès ou de préjudice corporel causé par
        notre négligence ou celle de nos employés, agents ou sous-traitants ; pour fraude ou
        déclaration frauduleuse ; ou pour notre obligation de fournir le Service avec un soin
        et une compétence raisonnables ou pour notre manquement à fournir le Service
        conformément aux informations communiquées sur nous ou sur le Service.
      </p>

      {/* 13 */}
      <h2>13. Dispositions générales</h2>
      <p>
        Les présentes Conditions, ainsi que la Politique de confidentialité et les autres
        politiques intégrées aux présentes Conditions, constituent l&apos;intégralité de
        l&apos;accord entre vous et nous concernant votre utilisation du Service. Sauf en ce
        qui concerne notre droit de mettre à jour les présentes Conditions conformément à la
        Section 12 ci-dessus, les présentes Conditions ne peuvent être modifiées que par un
        accord écrit signé par les deux parties. Vous ne pouvez pas céder ni transférer les
        présentes Conditions à une autre personne ou entité sans notre consentement, ni
        transférer votre compte sur le Service. Nous pouvons céder les présentes Conditions
        avec ou sans préavis.
      </p>
      <p>
        Tout retard ou défaut de votre part dans l&apos;exercice de vos droits en vertu des
        présentes Conditions d&apos;utilisation ou dans l&apos;exigence de leur respect ne
        porte pas atteinte à notre droit de faire valoir ces droits ultérieurement ou
        d&apos;en exiger le respect. Si nous renonçons à invoquer un manquement de votre
        part aux présentes Conditions d&apos;utilisation, cela ne vaut pas renonciation à
        tout manquement ultérieur ni à votre obligation de respecter les conditions
        enfreintes.
      </p>
      <p>
        Si une partie des présentes Conditions est jugée inapplicable par un juge ou un
        arbitre, la partie inapplicable sera appliquée dans toute la mesure du possible et
        les parties restantes resteront pleinement en vigueur.
      </p>

      {/* 14 */}
      <h2>14. Consentement aux communications électroniques</h2>
      <p>
        Vous acceptez de recevoir des communications électroniques de notre part comme décrit
        dans notre Politique de confidentialité. Veuillez lire notre{' '}
        <a href='/docs/policy'>Politique de confidentialité</a> pour comprendre vos choix
        concernant nos pratiques de communication électronique. Nous pouvons vous envoyer
        des avis, accords, divulgations ou d&apos;autres communications par voie électronique.
      </p>

      {/* 15 */}
      <h2>15. Conservation des données</h2>
      <p>
        Samply conserve les enregistrements de la file d&apos;attente des notifications en attente pendant{' '}
        <strong>30 jours</strong> et l&apos;historique des notifications (enregistrements de réponses) pendant{' '}
        <strong>12 mois</strong>. Après ces périodes, les enregistrements sont supprimés automatiquement.
        Les chercheurs sont responsables de l&apos;exportation des données avant l&apos;expiration de ces délais.
      </p>

      {/* 16 */}
      <h2>16. Coordonnées</h2>
      <p>
        Vous pouvez nous contacter en envoyant un e-mail à{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentEs() {
  return (
    <>
      {/* 1 */}
      <h2>1. Introducción</h2>
      <p>
        Samply es una plataforma para gestionar la participación en experimentos en línea y
        encuestas a través de la aplicación móvil Samply Research. Samply está alojado en
        https://samply.uni-konstanz.de (el &quot;Sitio&quot;), que proporciona servicios de
        programación y gestión de notificaciones (colectivamente, el &quot;Servicio&quot;). Su
        uso del Servicio y la provisión del Servicio por nuestra parte constituyen un acuerdo
        entre usted y Samply para quedar vinculado por los términos y condiciones establecidos
        en estos Términos de uso.
      </p>
      <p>
        Samply puede utilizarse de forma gratuita con fines de investigación sin ánimo de lucro.
        Para el uso comercial de Samply, póngase en contacto con nosotros en{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Lea atentamente estos términos de uso. Al registrarse en el Servicio o utilizarlo de
        cualquier otra forma, reconoce que ha leído, comprendido y aceptado quedar vinculado
        por estos Términos de uso, incluida nuestra{' '}
        <a href='/docs/policy'>Política de privacidad</a> (conjuntamente, estos
        &quot;Términos&quot;). Si no está de acuerdo con alguno de los puntos que sugerimos en
        estos Términos, no utilice ninguna parte del Servicio.
      </p>

      {/* 2 */}
      <h2>2. Requisitos de elegibilidad</h2>
      <p>
        El Servicio está destinado a personas mayores de 18 años. Si tiene menos de 18 años,
        no puede utilizar el Servicio. Si tiene 18 años o más, asegúrese de no haber sido
        suspendido del Servicio y de que su uso del Servicio no infrinja ninguna ley ni
        reglamento. Si utiliza el Servicio en nombre de una empresa, organización u otro tipo
        de entidad, nos confirma que tiene autoridad para vincular a dicha entidad a estos
        Términos en su nombre.
      </p>

      {/* 3 */}
      <h2>3. Cuentas y registro</h2>
      <p>
        Si utiliza el servicio, tiene la opción de registrar una cuenta. Le recomendamos que
        registre una cuenta, ya que la creación de una cuenta en el Servicio le dará acceso a
        funciones especiales relacionadas con la participación en estudios en línea
        (experimentos o encuestas) o la creación de sus propios estudios. En tal caso, le
        pediremos que nos proporcione cierta información personal como parte del proceso de
        registro, parte de la cual es obligatoria para registrar la cuenta. Usted se compromete
        a que toda la información que proporcione sea correcta y a mantenerla exacta y
        actualizada en el futuro. También le pedimos que establezca una contraseña para
        proteger la seguridad de su cuenta. Usted es responsable de mantener su contraseña
        segura y confidencial. Cualquier actividad que se produzca en su cuenta es
        responsabilidad suya. Si en algún momento cree que su cuenta puede haber dejado de
        ser segura, debe notificárnoslo inmediatamente en{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. También puede
        restablecer su contraseña en https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licencia de uso del Servicio</h2>
      <p>
        Siempre que siga cumpliendo estos términos, le otorgamos permiso para acceder al
        Servicio únicamente para su uso personal. El Servicio le permite crear estudios
        (&quot;Estudios&quot;) o participar en estudios creados por otros usuarios de Samply
        (&quot;Investigadores&quot;).
      </p>
      <p>Tenga en cuenta que esta licencia no incluye el derecho a usar:</p>
      <ol>
        <li>Marcas comerciales, logotipos o insignias que aparezcan en los Estudios</li>
        <li>Imágenes de personas, si son identificables en los Estudios</li>
        <li>Obras de arte u obras de autoría que aparezcan en los Estudios</li>
      </ol>

      {/* 5 */}
      <h2>5. Contenido del usuario</h2>
      <p>Usted es el propietario de todo su Contenido de usuario, incluidos los estudios que cree en el Sitio.</p>
      <dl>
        <dt>Condiciones generales</dt>
        <dd>
          El Servicio le permite crear y publicar sus estudios, así como textos escritos,
          imágenes, enlaces web, información de ubicación y otro contenido
          (&quot;Contenido de usuario&quot;). Todo el Contenido de usuario que proporcione en
          el Servicio es de su propiedad o de sus licenciantes. No reclamamos la propiedad de
          su Contenido de usuario — es completamente suyo.
        </dd>
        <dt>Licencia limitada</dt>
        <dd>
          Si publica su Estudio, nos otorga una licencia mundial, no exclusiva y libre de
          regalías (con derecho a sublicenciar) para alojar, almacenar, transmitir, mostrar y
          distribuir (total o parcialmente) su Contenido de usuario en el Sitio. Usted reconoce
          que no le pagaremos por el uso de sus estudios y que sus estudios estarán disponibles
          para el público sin atribución ni compensación. Si no desea poner sus estudios a
          disposición del público, puede seguir utilizando todas las funciones del Servicio sin
          restricciones.
        </dd>
        <dt>Declaraciones y garantías</dt>
        <dd>
          Usted es el único responsable de su Contenido de usuario y de todas las consecuencias
          de subir o publicar Contenido de usuario en el Servicio. Cada vez que suba o publique
          Contenido de usuario, nos declara y garantiza que: (a) usted es el creador y
          propietario del Contenido de usuario o tiene todos los derechos necesarios de otras
          personas o entidades para usar su Contenido de usuario en el Servicio según lo
          previsto en esta Sección y para permitir que otros usuarios lo usen; y (b) su
          Contenido de usuario no infringe ni se apropia indebidamente de derechos de terceros,
          incluidos derechos de autor y otros derechos de propiedad intelectual, derechos de
          privacidad, derechos de publicidad o derechos morales, ni difama, calumnia o
          injuria a nadie.
        </dd>
        <dt>Descargo de responsabilidad</dt>
        <dd>
          No nos es razonablemente posible supervisar todo el Contenido de usuario que se sube
          o publica en el Servicio, y no tenemos ninguna obligación hacia usted ni hacia ningún
          otro usuario de supervisar, editar o controlar el Contenido de usuario que usted y
          otros usuarios suban o publiquen en el Servicio. Esto significa que no somos
          responsables del Contenido de usuario en el Servicio y usted acepta no presentar
          reclamaciones contra nosotros basadas en el Contenido de usuario. No obstante, podemos
          eliminar, editar, buscar o bloquear Contenido de usuario del Servicio en cualquier
          momento si dicho Contenido de usuario infringe estos Términos o resulta ofensivo.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Conducta prohibida</h2>
      <p>Al utilizar el Servicio, usted acepta no:</p>
      <ol type='a'>
        <li>Usar el Servicio con fines ilegales o en violación de cualquier ley o reglamento;</li>
        <li>Violar los derechos de otros o alentar a otros a hacerlo, incluida la infracción o apropiación indebida de derechos de propiedad intelectual;</li>
        <li>Subir, publicar o difundir Contenido de usuario que sea ilegal, difamatorio, abusivo, indecente, obsceno, pornográfico, acosador, amenazante, odioso o de cualquier otra manera inapropiado;</li>
        <li>Manipular las funciones de seguridad del Servicio (p. ej., deshabilitar o eludir funciones para acceder a estudios privados o Contenido de usuario, o realizar ingeniería inversa del Servicio para obtener su código fuente);</li>
        <li>Interferir con nuestra operación del Servicio o con el uso del Servicio por parte de otro usuario (es decir, no subir ni distribuir virus, adware o spyware, no enviar ofertas o promociones no solicitadas, no recopilar información personal de terceros, ni interferir con las redes o dispositivos que utilizamos para proporcionar el Servicio);</li>
        <li>Participar en actividades fraudulentas, como hacerse pasar por otra persona;</li>
        <li>Acceder al Servicio a través de bots, arañas, scripts, crawlers, scrapers u otras herramientas o aplicaciones automatizadas (distintas de su navegador web u otras aplicaciones móviles que podamos publicar);</li>
        <li>Copiar la apariencia del Sitio o acceder, descargar, copiar, modificar, distribuir, ejecutar o usar estudios para crear un servicio similar o competidor;</li>
        <li>Transferir sus derechos de uso del Servicio o de visualización, acceso o uso de cualquier Material; o</li>
        <li>Intentar hacer alguna de estas cosas o ayudar a otra persona a hacerlo.</li>
      </ol>

      {/* 7 */}
      <h2>7. Servicios de terceros y sitios web vinculados</h2>
      <p>
        Puede encontrar en el Servicio herramientas que le permitan enviar información, incluido
        Contenido de usuario, a los servicios de otras empresas, como funciones que le permiten
        vincular su cuenta en el Servicio a una cuenta en otro servicio. Si utiliza estas
        herramientas, nos autoriza a enviar esta información a los servicios de otras empresas,
        y reconoce que no somos responsables del uso que esas empresas hagan de dicha
        información, ya que no las controlamos en absoluto. También puede encontrar en el
        Servicio enlaces a otros sitios web que no son operados por nosotros. Estos sitios web
        tampoco están bajo nuestro control, así que decida a su propio criterio cuándo
        abandonar el Servicio.
      </p>

      {/* 8 */}
      <h2>8. Rescisión de su cuenta</h2>
      <p>
        Si infringe alguno de estos términos, su permiso para usar el Servicio finaliza
        automáticamente. Puede cancelar su cuenta en el Servicio enviando un correo electrónico
        a{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Política de privacidad y requisitos adicionales</h2>
      <p>
        Queremos que sepa qué información recopilamos de usted y cómo la utilizamos. Lea
        atentamente nuestra <a href='/docs/policy'>Política de privacidad</a>. La Política de
        privacidad se incorpora a estos Términos como parte de nuestro Acuerdo. Además, podemos
        informarle de requisitos adicionales que debe cumplir al usar el Servicio. Cualquier
        directriz adicional que publiquemos en el Servicio o que vinculemos al Servicio se
        incorporará a estos Términos como parte de nuestro Acuerdo.
      </p>

      {/* 10 */}
      <h2>10. Modificación de estos Términos</h2>
      <p>
        Podemos cambiar estos términos y condiciones con un preaviso de 1 mes. En tal caso,
        haremos esfuerzos razonables para notificarle los cambios. Podemos hacer tales avisos
        disponibles a través de un banner emergente, enviando un correo electrónico a una
        dirección asociada a su cuenta en el Servicio, u otros medios, y le notificaremos
        cuándo entrará en vigor la nueva versión de estos Términos. Si no acepta los nuevos
        términos que proponemos, podemos cancelar inmediatamente su cuenta y terminar su acceso
        al Servicio. Si tenemos alguna disputa relacionada con el Servicio, se resolverá de
        acuerdo con la versión de estos Términos vigente en el momento en que surja la disputa.
      </p>

      {/* 11 */}
      <h2>11. Propiedad del Servicio</h2>
      <p>
        Todo el software, las interfaces visuales, los gráficos, los diseños, la información y
        todos los demás elementos del Servicio (los &quot;Materiales&quot;) que proporcionamos
        están protegidos por la propiedad intelectual y otras leyes. Nosotros o nuestros
        licenciantes somos propietarios de todos los Materiales contenidos en el Servicio, y
        usted no puede usar los Materiales excepto en la medida expresamente permitida por estos
        Términos.
      </p>

      {/* 12 */}
      <h2>12. Descargo de responsabilidad; Ausencia de garantías</h2>
      <p>
        Proporcionamos el Servicio y todo el contenido disponible a través del Servicio en
        base &quot;tal cual&quot; y &quot;según disponibilidad&quot;, sin garantía de ningún
        tipo, expresa o implícita. En la medida permitida por la ley aplicable, renunciamos
        expresamente a todas las garantías de cualquier tipo, incluidas las garantías implícitas
        de comerciabilidad, idoneidad para un propósito particular, no infracción de derechos
        de terceros, título y cualquier garantía derivada del curso de los negocios, el uso o
        la práctica comercial. No garantizamos ni declaramos que el Servicio será ininterrumpido,
        seguro o libre de errores o componentes dañinos, ni que corregiremos errores o
        componentes dañinos.
      </p>
      <p>
        Salvo lo dispuesto en la Sección 13 a continuación, usted utiliza el Servicio bajo su
        propio riesgo y asume todos los riesgos de daños resultantes del uso o acceso al
        Servicio, sus interacciones con otros usuarios del Servicio y el Contenido disponible
        a través del Servicio.
      </p>
      <p>
        La ley prohíbe las cláusulas de exclusión de garantías en algunos lugares, y puede
        tener otros derechos que varían según su lugar de residencia. No excluimos ni limitamos
        nuestra responsabilidad ante usted de ninguna manera si eso fuera ilegal. En el Reino
        Unido y la Unión Europea, esto incluye la responsabilidad por muerte o daños personales
        causados por nuestra negligencia o la de nuestros empleados, agentes o subcontratistas;
        por fraude o declaración fraudulenta; o por nuestra obligación de prestar el Servicio
        con cuidado y habilidad razonables o por nuestro incumplimiento en prestar el Servicio
        de acuerdo con la información proporcionada sobre nosotros o el Servicio.
      </p>

      {/* 13 */}
      <h2>13. Disposiciones generales</h2>
      <p>
        Estos Términos, junto con la Política de privacidad y otras políticas incorporadas a
        estos Términos, constituyen el acuerdo completo entre usted y nosotros con respecto a
        su uso del Servicio. Salvo nuestro derecho a actualizar estos Términos de acuerdo con
        la Sección 12 anterior, estos Términos solo pueden modificarse mediante un acuerdo
        escrito firmado por ambas partes. No puede ceder ni transferir estos Términos a ninguna
        otra persona o entidad sin nuestro consentimiento, ni transferir su cuenta en el
        Servicio. Podemos ceder estos Términos con o sin notificación previa a usted.
      </p>
      <p>
        Cualquier retraso o incumplimiento por su parte en el ejercicio de derechos en virtud
        de estos Términos de uso o en la exigencia de su cumplimiento no afecta a nuestro
        derecho a hacer valer dichos derechos en un momento posterior o a exigir su
        cumplimiento. Si renunciamos a cualquier incumplimiento suyo de estos Términos de uso,
        no renunciamos a ningún incumplimiento posterior ni a su obligación de cumplir los
        términos que haya infringido.
      </p>
      <p>
        En caso de que alguna parte de estos Términos sea declarada inaplicable por un juez o
        árbitro, la parte inaplicable se aplicará en la mayor medida posible y las partes
        restantes seguirán plenamente en vigor.
      </p>

      {/* 14 */}
      <h2>14. Consentimiento a las comunicaciones electrónicas</h2>
      <p>
        Usted acepta recibir comunicaciones electrónicas de nuestra parte tal como se describe
        en nuestra Política de privacidad. Lea nuestra{' '}
        <a href='/docs/policy'>Política de privacidad</a> para comprender sus opciones
        respecto a nuestras prácticas de comunicación electrónica. Podemos enviarle avisos,
        acuerdos, divulgaciones u otras comunicaciones de forma electrónica.
      </p>

      {/* 15 */}
      <h2>15. Retención de datos</h2>
      <p>
        Samply conserva los registros de la cola de notificaciones pendientes durante <strong>30 días</strong> y
        el historial de notificaciones (registros de respuestas) durante <strong>12 meses</strong>. Tras estos
        períodos, los registros se eliminan automáticamente. Los investigadores son responsables de exportar
        los datos del estudio antes de que expiren estos plazos.
      </p>

      {/* 16 */}
      <h2>16. Información de contacto</h2>
      <p>
        Puede ponerse en contacto con nosotros enviando un correo electrónico a{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentPt() {
  return (
    <>
      {/* 1 */}
      <h2>1. Introdução</h2>
      <p>
        O Samply é uma plataforma para gerenciar a participação em experimentos online e
        pesquisas por meio do aplicativo móvel Samply Research. O Samply está hospedado em
        https://samply.uni-konstanz.de (o &quot;Site&quot;), que fornece serviços de
        agendamento e gerenciamento de notificações (coletivamente, o &quot;Serviço&quot;). O
        seu uso do Serviço e a prestação do Serviço por nossa parte constituem um acordo
        entre você e o Samply para ficar vinculado aos termos e condições estabelecidos
        nestes Termos de uso.
      </p>
      <p>
        O Samply pode ser usado gratuitamente para fins de pesquisa sem fins lucrativos. Para
        uso comercial do Samply, entre em contato conosco pelo endereço{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Leia atentamente estes termos de uso. Ao se registrar no Serviço ou utilizá-lo de
        qualquer outra forma, você reconhece que leu, compreendeu e concordou em ficar
        vinculado a estes Termos de uso, incluindo nossa{' '}
        <a href='/docs/policy'>Política de Privacidade</a> (em conjunto, estes
        &quot;Termos&quot;). Se você não concordar com qualquer ponto sugerido nestes Termos,
        não utilize nenhuma parte do Serviço.
      </p>

      {/* 2 */}
      <h2>2. Elegibilidade</h2>
      <p>
        O Serviço é destinado a pessoas com pelo menos 18 anos de idade. Se você tiver menos
        de 18 anos, não poderá usar o Serviço. Se você tiver 18 anos ou mais, certifique-se
        de nunca ter sido suspenso do Serviço e de que o seu uso do Serviço não viole nenhuma
        lei ou regulamento. Se você estiver usando o Serviço em nome de uma empresa,
        organização ou outro tipo de entidade, nos confirma que tem autoridade para vincular
        essa entidade a estes Termos em seu nome.
      </p>

      {/* 3 */}
      <h2>3. Contas e cadastro</h2>
      <p>
        Ao usar o serviço, você tem a opção de registrar uma conta. Recomendamos que você
        registre uma conta, pois criar uma conta no Serviço lhe dará acesso a funcionalidades
        especiais relacionadas à participação em estudos online (experimentos ou pesquisas) ou
        à criação dos seus próprios estudos. Nesse caso, solicitaremos que você nos forneça
        algumas informações pessoais como parte do processo de cadastro, algumas das quais são
        obrigatórias para registrar a conta. Você se compromete a que todas as informações
        fornecidas sejam corretas e a mantê-las precisas e atualizadas no futuro. Também
        solicitamos que você defina uma senha para proteger a segurança da sua conta. Você é
        responsável por manter sua senha segura e confidencial. Qualquer atividade que ocorra
        na sua conta é de sua responsabilidade. Se você suspeitar que sua conta pode ter
        deixado de ser segura, deverá nos notificar imediatamente pelo endereço{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. Você também pode
        redefinir sua senha em https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licença de uso do Serviço</h2>
      <p>
        Desde que você continue cumprindo estes termos, concedemos a você permissão para
        acessar o Serviço apenas para uso pessoal. O Serviço permite que você crie estudos
        (&quot;Estudos&quot;) ou participe de estudos criados por outros usuários do Samply
        (&quot;Pesquisadores&quot;).
      </p>
      <p>Observe que esta licença não inclui o direito de usar:</p>
      <ol>
        <li>Marcas comerciais, logotipos ou insígnias que apareçam nos Estudos</li>
        <li>Imagens de pessoas, se forem identificáveis nos Estudos</li>
        <li>Obras de arte ou obras autorais que apareçam nos Estudos</li>
      </ol>

      {/* 5 */}
      <h2>5. Conteúdo do usuário</h2>
      <p>Você é o proprietário de todo o seu Conteúdo de usuário, incluindo quaisquer estudos que criar no Site.</p>
      <dl>
        <dt>Condições gerais</dt>
        <dd>
          O Serviço permite que você crie e publique seus estudos, bem como textos escritos,
          imagens, links da web, informações de localização e outros conteúdos
          (&quot;Conteúdo de usuário&quot;). Todo o Conteúdo de usuário que você fornecer no
          Serviço é de sua propriedade ou de seus licenciantes. Não reivindicamos a propriedade
          do seu Conteúdo de usuário — ele pertence inteiramente a você.
        </dd>
        <dt>Licença limitada</dt>
        <dd>
          Se você publicar seu Estudo, nos concede uma licença mundial, não exclusiva e isenta
          de royalties (com direito de sublicenciamento) para hospedar, armazenar, transmitir,
          exibir e distribuir (total ou parcialmente) seu Conteúdo de usuário no Site. Você
          reconhece que não seremos obrigados a pagar pelo uso de seus estudos e que seus
          estudos serão disponibilizados ao público sem atribuição ou compensação. Se você não
          deseja disponibilizar seus estudos ao público, ainda poderá usar todas as
          funcionalidades do Serviço sem restrições.
        </dd>
        <dt>Declarações e garantias</dt>
        <dd>
          Você é o único responsável pelo seu Conteúdo de usuário e por todas as consequências
          do upload ou publicação de Conteúdo de usuário no Serviço. Cada vez que você fizer
          upload ou publicar Conteúdo de usuário, declara e garante que: (a) você é o criador
          e proprietário do Conteúdo de usuário ou possui todos os direitos necessários de
          outras pessoas ou entidades para usar seu Conteúdo de usuário no Serviço conforme
          previsto nesta Seção e para permitir que outros usuários o utilizem; e (b) seu
          Conteúdo de usuário não infringe nem se apropria indevidamente de direitos de
          terceiros, incluindo direitos autorais e outros direitos de propriedade intelectual,
          direitos de privacidade, direitos de publicidade ou direitos morais, nem difama,
          calunia ou injuria ninguém.
        </dd>
        <dt>Isenção de responsabilidade</dt>
        <dd>
          Não nos é razoavelmente possível monitorar todo o Conteúdo de usuário que é
          carregado ou publicado no Serviço, e não temos nenhuma obrigação para com você ou
          qualquer outro usuário de monitorar, editar ou controlar o Conteúdo de usuário que
          você e outros usuários carregam ou publicam no Serviço. Isso significa que não somos
          responsáveis pelo Conteúdo de usuário no Serviço e você concorda em não fazer
          reclamações contra nós com base no Conteúdo de usuário. No entanto, podemos remover,
          editar, pesquisar ou bloquear Conteúdo de usuário do Serviço a qualquer momento se
          o Conteúdo de usuário violar estes Termos ou for considerado de outra forma ofensivo.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Conduta proibida</h2>
      <p>Ao usar o Serviço, você concorda em não:</p>
      <ol type='a'>
        <li>Usar o Serviço para fins ilegais ou em violação de qualquer lei ou regulamento;</li>
        <li>Violar os direitos de terceiros ou incentivar outros a fazê-lo, incluindo a violação ou apropriação indevida de direitos de propriedade intelectual;</li>
        <li>Fazer upload, publicar ou divulgar Conteúdo de usuário que seja ilegal, difamatório, abusivo, indecente, obsceno, pornográfico, assediador, ameaçador, odioso ou de qualquer outra forma inapropriado;</li>
        <li>Manipular os recursos de segurança do Serviço (p. ex., desativar ou contornar recursos para acessar estudos privados ou Conteúdo de usuário, ou realizar engenharia reversa do Serviço para obter seu código-fonte);</li>
        <li>Interferir em nossa operação do Serviço ou no uso do Serviço por outro usuário (ou seja, não fazer upload nem distribuir vírus, adware ou spyware, não enviar ofertas ou promoções não solicitadas, não coletar informações pessoais de terceiros nem interferir nas redes ou dispositivos que usamos para fornecer o Serviço);</li>
        <li>Participar de atividades fraudulentas, como se passar por outra pessoa;</li>
        <li>Acessar o Serviço por meio de bots, spiders, scripts, crawlers, scrapers ou outras ferramentas ou aplicativos automatizados (que não sejam seu navegador da web ou outros aplicativos móveis que possamos publicar);</li>
        <li>Copiar a aparência do Site ou acessar, baixar, copiar, modificar, distribuir, executar ou usar estudos para criar um serviço semelhante ou concorrente;</li>
        <li>Transferir seus direitos de uso do Serviço ou de visualização, acesso ou uso de quaisquer Materiais; ou</li>
        <li>Tentar fazer qualquer uma dessas coisas ou ajudar outra pessoa a fazê-lo.</li>
      </ol>

      {/* 7 */}
      <h2>7. Serviços de terceiros e sites vinculados</h2>
      <p>
        Você pode encontrar no Serviço ferramentas que permitem enviar informações, incluindo
        Conteúdo de usuário, para serviços de outras empresas, como recursos que permitem
        vincular sua conta no Serviço a uma conta em outro serviço. Se você usar essas
        ferramentas, nos autoriza a enviar essas informações para os serviços de outras
        empresas, e reconhece que não somos responsáveis pelo uso dessas informações por parte
        das outras empresas, pois não as controlamos de forma alguma. Você também pode
        encontrar no Serviço links para outros sites que não são operados por nós. Esses sites
        também não estão sob nosso controle, portanto, decida a seu próprio critério quando
        sair do Serviço.
      </p>

      {/* 8 */}
      <h2>8. Rescisão da sua conta</h2>
      <p>
        Se você violar qualquer um destes termos, sua permissão para usar o Serviço será
        encerrada automaticamente. Você pode cancelar sua conta no Serviço enviando um e-mail
        para{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Política de Privacidade e requisitos adicionais</h2>
      <p>
        Queremos que você saiba quais informações coletamos de você e como as utilizamos. Leia
        atentamente nossa <a href='/docs/policy'>Política de Privacidade</a>. A Política de
        Privacidade é incorporada a estes Termos como parte de nosso Acordo. Além disso,
        podemos informá-lo sobre requisitos adicionais que você deve cumprir ao usar o Serviço.
        Quaisquer diretrizes adicionais que publicarmos no Serviço ou que vinculemos ao Serviço
        serão incorporadas a estes Termos como parte de nosso Acordo.
      </p>

      {/* 10 */}
      <h2>10. Modificação destes Termos</h2>
      <p>
        Podemos alterar estes termos e condições com aviso prévio de 1 mês. Caso isso ocorra,
        faremos esforços razoáveis para notificá-lo sobre as alterações. Podemos disponibilizar
        esses avisos por meio de um banner pop-up, enviando um e-mail para o endereço associado
        à sua conta no Serviço, ou por outros meios, e notificaremos você quando a nova versão
        destes Termos entrar em vigor. Se você não aceitar os novos termos que propomos,
        poderemos encerrar imediatamente sua conta e encerrar seu acesso ao Serviço. Quaisquer
        disputas relacionadas ao Serviço serão resolvidas de acordo com a versão destes Termos
        em vigor no momento em que a disputa surgir.
      </p>

      {/* 11 */}
      <h2>11. Propriedade do Serviço</h2>
      <p>
        Todo o software, interfaces visuais, gráficos, designs, informações e todos os demais
        elementos do Serviço (os &quot;Materiais&quot;) que fornecemos são protegidos por
        propriedade intelectual e outras leis. Nós ou nossos licenciantes somos proprietários
        de todos os Materiais contidos no Serviço, e você não pode usar os Materiais exceto
        conforme expressamente permitido por estes Termos.
      </p>

      {/* 12 */}
      <h2>12. Isenção de responsabilidade; Ausência de garantias</h2>
      <p>
        Fornecemos o Serviço e todo o conteúdo disponível por meio do Serviço na base
        &quot;como está&quot; e &quot;conforme disponível&quot;, sem garantia de qualquer
        tipo, expressa ou implícita. Na medida permitida pela lei aplicável, renunciamos
        expressamente a todas as garantias de qualquer tipo, incluindo as garantias implícitas
        de comerciabilidade, adequação a uma finalidade específica, não violação de direitos de
        terceiros, titularidade e quaisquer garantias decorrentes do curso dos negócios, uso ou
        prática comercial. Não garantimos nem declaramos que o Serviço será ininterrupto,
        seguro ou livre de erros ou componentes prejudiciais, nem que corrigiremos erros ou
        componentes prejudiciais.
      </p>
      <p>
        Exceto conforme previsto na Seção 13 abaixo, você usa o Serviço por sua conta e risco
        e assume todos os riscos de danos resultantes do uso ou acesso ao Serviço, de suas
        interações com outros usuários do Serviço e do Conteúdo disponível por meio do Serviço.
      </p>
      <p>
        A lei proíbe a exclusão de garantias em alguns locais, e você pode ter outros direitos
        que variam dependendo do seu local de residência. Não excluímos nem limitamos nossa
        responsabilidade perante você de nenhuma forma se isso for ilegal. No Reino Unido e na
        União Europeia, isso inclui a responsabilidade por morte ou danos pessoais causados por
        nossa negligência ou pela negligência de nossos funcionários, agentes ou subcontratados;
        por fraude ou declaração fraudulenta; ou por nossa obrigação de prestar o Serviço com
        cuidado e habilidade razoáveis ou por nosso descumprimento em prestar o Serviço de
        acordo com as informações fornecidas sobre nós ou o Serviço.
      </p>

      {/* 13 */}
      <h2>13. Disposições gerais</h2>
      <p>
        Estes Termos, juntamente com a Política de Privacidade e outras políticas incorporadas
        a estes Termos, constituem o acordo completo entre você e nós com relação ao seu uso
        do Serviço. Exceto pelo nosso direito de atualizar estes Termos de acordo com a Seção
        12 acima, estes Termos só podem ser modificados por um acordo escrito assinado por
        ambas as partes. Você não pode ceder ou transferir estes Termos a qualquer outra pessoa
        ou entidade sem o nosso consentimento, nem transferir sua conta no Serviço. Podemos
        ceder estes Termos com ou sem aviso prévio a você.
      </p>
      <p>
        Qualquer atraso ou omissão da sua parte em exercer direitos previstos nestes Termos de
        uso ou em exigir o cumprimento destes Termos de uso não afeta nosso direito de exercer
        tais direitos posteriormente ou de exigir seu cumprimento. Se renunciarmos a qualquer
        violação sua destes Termos de uso, não renunciamos a violações subsequentes nem à sua
        obrigação de cumprir os termos que você tenha violado.
      </p>
      <p>
        Caso qualquer parte destes Termos seja considerada inexequível por um juiz ou árbitro,
        a parte inexequível será aplicada na máxima extensão possível e as partes restantes
        permanecerão em pleno vigor e efeito.
      </p>

      {/* 14 */}
      <h2>14. Consentimento para comunicações eletrônicas</h2>
      <p>
        Você concorda em receber comunicações eletrônicas nossas conforme descrito em nossa
        Política de Privacidade. Leia nossa{' '}
        <a href='/docs/policy'>Política de Privacidade</a> para compreender suas opções em
        relação às nossas práticas de comunicação eletrônica. Podemos enviar a você avisos,
        acordos, divulgações ou outras comunicações eletronicamente.
      </p>

      {/* 15 */}
      <h2>15. Retenção de dados</h2>
      <p>
        A Samply mantém os registros da fila de notificações pendentes por <strong>30 dias</strong> e
        o histórico de notificações (registros de respostas) por <strong>12 meses</strong>. Após esses
        períodos, os registros são excluídos automaticamente. Os pesquisadores são responsáveis por exportar
        os dados do estudo antes que esses prazos expirem.
      </p>

      {/* 16 */}
      <h2>16. Informações de contato</h2>
      <p>
        Você pode entrar em contato conosco enviando um e-mail para{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentJa() {
  return (
    <>
      {/* 1 */}
      <h2>1. はじめに</h2>
      <p>
        Samplyは、モバイルアプリケーションSamply Researchを通じて、オンライン実験や調査への参加を管理するためのプラットフォームです。Samplyは
        https://samply.uni-konstanz.de （以下「本サイト」）でホストされており、通知のスケジュール設定および管理のためのサービス（総称して「本サービス」）を提供しています。お客様が本サービスを利用し、当社がお客様に本サービスを提供することは、本利用規約に定められた条件に拘束されることについて、お客様と Samply の間で合意したものとみなされます。
      </p>
      <p>
        Samplyは、非営利の研究目的では無料でご利用いただけます。Samplyの商用利用については、{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>までお問い合わせください。
      </p>
      <p>
        本利用規約をよくお読みください。本サービスに登録すること、またはその他の方法で本サービスを利用することにより、お客様は本利用規約および当社の{' '}
        <a href='/docs/policy'>プライバシーポリシー</a>（総称して「本規約」）を読み、理解し、これらに拘束されることに同意したものとみなされます。本規約で当社が提案する内容に同意されない場合は、本サービスのいかなる部分もご利用にならないでください。
      </p>

      {/* 2 */}
      <h2>2. 利用資格</h2>
      <p>
        本サービスは、18歳以上の方のご利用を想定しています。18歳未満の方は本サービスをご利用いただけません。18歳以上の方は、本サービスから停止処分を受けたことがないこと、および本サービスの利用がいかなる法律や規制にも違反しないことをご確認ください。会社、組織、その他の事業体を代表して本サービスを利用される場合、当該事業体を本規約に拘束する権限を有することを当社に確約するものとします。
      </p>

      {/* 3 */}
      <h2>3. アカウントと登録</h2>
      <p>
        本サービスをご利用になる際は、アカウントを登録するという選択肢があります。本サービスでアカウントを作成すると、オンライン研究（実験または調査）への参加や、ご自身の研究の作成に関する特別な機能をご利用いただけるため、アカウントの登録をお勧めいたします。アカウント登録の際には、登録プロセスの一環として、いくつかの個人情報をご提供いただきます。その一部はアカウント登録に必須です。お客様は、提供されるすべての情報が正確であること、および将来にわたって正確かつ最新の状態に保つことを約束するものとします。また、アカウントの安全を守るためにパスワードの設定をお願いいたします。お客様は、パスワードを安全かつ機密に保つ責任を負います。お客様のアカウントで発生したあらゆる活動は、お客様の責任となります。お客様のアカウントの安全が損なわれている可能性があると思われる場合は、直ちに{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>までご連絡ください。また、https://samply.uni-konstanz.de/researcher/forgot からパスワードをリセットすることもできます。
      </p>

      {/* 4 */}
      <h2>4. 本サービスの利用ライセンス</h2>
      <p>
        お客様が本規約を遵守し続ける限り、当社はお客様に対し、個人的な利用に限り本サービスへのアクセスを許可します。本サービスでは、研究（以下「研究」）を作成したり、他のSamplyユーザー（以下「研究者」）が作成した研究に参加したりすることができます。
      </p>
      <p>このライセンスには、以下を使用する権利は含まれませんのでご注意ください：</p>
      <ol>
        <li>研究内に表示される商標、ロゴ、またはマーク</li>
        <li>研究内で識別可能な人物の画像</li>
        <li>研究内に登場する芸術作品または著作物</li>
      </ol>

      {/* 5 */}
      <h2>5. ユーザーコンテンツ</h2>
      <p>お客様は、本サイト上で作成した研究を含む、すべてのユーザーコンテンツの所有者です。</p>
      <dl>
        <dt>一般条件</dt>
        <dd>
          本サービスでは、お客様の研究を作成・公開できるほか、文章、画像、ウェブリンク、位置情報、その他のコンテンツ（以下「ユーザーコンテンツ」）を作成・公開することができます。お客様が本サービス上で提供するすべてのユーザーコンテンツは、お客様またはそのライセンサーが所有します。当社はお客様のユーザーコンテンツの所有権を主張しません。それは完全にお客様に帰属します。
        </dd>
        <dt>限定ライセンス</dt>
        <dd>
          お客様が研究を公開する場合、お客様は当社に対して、本サイト上でお客様のユーザーコンテンツ（全部または一部）をホスト、保存、送信、表示、配布するための、世界的、非独占的、ロイヤリティフリーのライセンス（サブライセンス権付き）を付与するものとします。お客様は、当社が研究の使用について支払い義務を負わないこと、および研究が帰属表示や報酬なしに一般に公開されることを認めます。お客様が研究を一般公開したくない場合でも、制限なく本サービスのすべての機能をご利用いただけます。
        </dd>
        <dt>表明および保証</dt>
        <dd>
          お客様は、お客様のユーザーコンテンツ、および本サービスへのユーザーコンテンツのアップロードまたは公開によるすべての結果について、単独で責任を負います。ユーザーコンテンツをアップロードまたは公開するたびに、お客様は次のことを表明し保証するものとします：(a)お客様がユーザーコンテンツの作成者かつ所有者であるか、本セクションに定めるとおり本サービスでお客様のユーザーコンテンツを使用し、他のユーザーに使用を許可するために必要なすべての権利を他者または事業体から取得していること、(b)お客様のユーザーコンテンツが、著作権その他の知的財産権、プライバシー権、パブリシティ権、人格権を含む第三者の権利を侵害もしくは不正使用せず、また誰かを誹謗中傷、名誉毀損、侮辱するものでないこと。
        </dd>
        <dt>免責事項</dt>
        <dd>
          本サービスにアップロードまたは投稿されるすべてのユーザーコンテンツを監視することは、当社にとって合理的に不可能であり、当社は、お客様および他のユーザーが本サービスにアップロードまたは投稿するユーザーコンテンツを監視、編集、または管理する義務を、お客様または他のユーザーに対して負いません。これは、当社が本サービス上のユーザーコンテンツについて責任を負わないことを意味し、お客様はユーザーコンテンツに基づき当社に対して請求を行わないことに同意します。ただし、ユーザーコンテンツが本規約に違反する場合、またはその他の方法で不快であると判断される場合には、当社はいつでも本サービスからユーザーコンテンツを削除、編集、検索、またはブロックすることができます。
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. 禁止行為</h2>
      <p>本サービスをご利用になる際、お客様は以下を行わないことに同意します：</p>
      <ol type='a'>
        <li>違法な目的、またはいかなる法律もしくは規制に違反する形で本サービスを利用すること；</li>
        <li>知的財産権の侵害や不正使用を含め、第三者の権利を侵害すること、または他者にその侵害を促すこと；</li>
        <li>違法、誹謗中傷、虐待的、わいせつ、卑猥、ポルノ的、嫌がらせ、脅迫、憎悪、その他不適切なユーザーコンテンツをアップロード、公開、または流布すること；</li>
        <li>本サービスのセキュリティ機能を改ざんすること（例：非公開の研究やユーザーコンテンツにアクセスするための機能を無効化もしくは回避すること、本サービスをリバースエンジニアリングしてソースコードを取得すること）；</li>
        <li>当社による本サービスの運営、または他のユーザーによる本サービスの利用を妨害すること（つまり、ウイルス、アドウェア、スパイウェアのアップロードや配布、勧誘や宣伝の送信、第三者の個人情報の収集、当社が本サービスを提供するために使用するネットワークやデバイスへの干渉を行わないこと）；</li>
        <li>他人になりすますなどの不正行為に関与すること；</li>
        <li>ボット、スパイダー、スクリプト、クローラー、スクレイパー、その他の自動化されたツールやアプリケーション（ウェブブラウザや当社が公開する可能性のあるその他のモバイルアプリケーションを除く）を通じて本サービスにアクセスすること；</li>
        <li>本サイトの外観を模倣すること、または類似もしくは競合するサービスを作成する目的で研究にアクセス、ダウンロード、コピー、変更、配布、実行、または使用すること；</li>
        <li>本サービスを利用する権利、または本資料の閲覧、アクセス、もしくは使用する権利を譲渡すること；あるいは</li>
        <li>これらのいずれかを試みること、または他人がそれを行うのを手助けすること。</li>
      </ol>

      {/* 7 */}
      <h2>7. 第三者のサービスとリンク先サイト</h2>
      <p>
        本サービスでは、お客様のアカウントを他のサービスのアカウントに接続できる機能など、ユーザーコンテンツを含む情報を他社のサービスに送信できるツールを見つけることがあります。これらのツールを使用すると、お客様はこの情報を他社のサービスに送信することを当社に許可することになります。また、当社はこれらの情報を他社がどのように使用するかについて、いかなる方法でも制御していないため、責任を負わないことを認めるものとします。また、本サービス上で当社が運営していない他のサイトへのリンクを見つけることもあります。これらのサイトも当社の管理下にはありませんので、本サービスを離れる際はお客様自身の裁量で判断してください。
      </p>

      {/* 8 */}
      <h2>8. アカウントの終了</h2>
      <p>
        お客様が本規約のいずれかに違反した場合、お客様の本サービス利用許可は自動的に終了します。お客様は、{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>までメールを送信することで、本サービスのアカウントを解約することができます。
      </p>

      {/* 9 */}
      <h2>9. プライバシーポリシーおよび追加要件</h2>
      <p>
        当社は、お客様からどのような情報を収集し、どのように使用するかを、お客様に知っていただきたいと考えています。当社の<a href='/docs/policy'>プライバシーポリシー</a>をよくお読みください。プライバシーポリシーは、本規約の一部として本規約に組み込まれます。さらに、本サービスのご利用にあたってお客様が遵守すべき追加要件についてお知らせすることがあります。当社が本サービス上で公開する、または本サービスにリンクする追加のガイドラインは、本同意の一部として本規約に組み込まれます。
      </p>

      {/* 10 */}
      <h2>10. 本規約の変更</h2>
      <p>
        当社は、1ヶ月の事前通知をもって、本規約を変更することがあります。その場合、当社は変更内容についてお客様に通知するための合理的な努力を行います。これらの通知は、ポップアップバナー、本サービスのアカウントに関連付けられたメールアドレスへの送信、またはその他の手段により提供される場合があり、新バージョンの本規約が発効する際にはお客様に通知いたします。当社が提案する新しい規約に同意されない場合、当社は直ちにお客様のアカウントを停止し、本サービスへのアクセスを終了することがあります。本サービスに関連する紛争は、当該紛争が発生した時点で有効な本規約のバージョンに従って解決されます。
      </p>

      {/* 11 */}
      <h2>11. 本サービスの所有権</h2>
      <p>
        当社が提供する本サービスのすべてのソフトウェア、ビジュアルインターフェース、グラフィック、デザイン、情報、その他の要素（以下「本資料」）は、知的財産およびその他の法律によって保護されています。当社または当社のライセンサーは、本サービスに含まれるすべての本資料の所有者であり、お客様は本規約で明示的に許可されている場合を除き、本資料を使用することはできません。
      </p>

      {/* 12 */}
      <h2>12. 免責；無保証</h2>
      <p>
        当社は、本サービスおよび本サービスを通じて利用可能なすべてのコンテンツを「現状のまま」および「利用可能な範囲で」、明示または黙示を問わずいかなる種類の保証もなく提供します。適用される法律で認められる範囲内で、当社は、商品性、特定目的への適合性、第三者の権利の非侵害、所有権、ならびに取引慣行、利用または商慣習から生じるあらゆる保証を含む、あらゆる種類の保証を明示的に放棄します。当社は、本サービスが中断されないこと、安全であること、エラーや有害なコンポーネントがないこと、またはエラーや有害なコンポーネントを修正することを保証または表明しません。
      </p>
      <p>
        以下の第13条に規定される場合を除き、お客様は自己の責任で本サービスを利用し、本サービスの利用またはアクセス、本サービスの他のユーザーとのやり取り、および本サービスを通じて利用可能なコンテンツから生じる損害のすべてのリスクを負うものとします。
      </p>
      <p>
        一部の地域では法律により保証の除外が禁止されており、お客様の居住地によって異なる権利を有する場合があります。当社は、それが違法である場合には、お客様に対する当社の責任をいかなる方法でも除外または制限しません。英国および欧州連合では、これには当社の過失、当社の従業員、代理人または下請業者の過失による死亡または人身傷害に対する責任、詐欺または不正な表示に対する責任、本サービスを合理的な注意と技術をもって提供する義務に対する責任、または当社もしくは本サービスに関して提供された情報に従って本サービスを提供しなかったことに対する責任が含まれます。
      </p>

      {/* 13 */}
      <h2>13. 一般条項</h2>
      <p>
        本規約は、プライバシーポリシーおよび本規約に組み込まれたその他のポリシーとともに、本サービスのお客様による利用に関するお客様と当社との間の完全な同意を構成します。上記の第12条に基づき本規約を更新する当社の権利を除き、本規約は両当事者によって署名された書面による合意によってのみ変更することができます。お客様は、当社の同意なしに本規約を他の個人または事業体に譲渡または移転することはできず、本サービスのアカウントを譲渡することもできません。当社は、お客様への通知の有無にかかわらず、本規約を譲渡することができます。
      </p>
      <p>
        お客様の側で本利用規約に基づく権利の行使または本利用規約の遵守の要求が遅延または欠落しても、その後にそのような権利を行使し、または遵守を要求する当社の権利には影響しません。お客様による本利用規約の違反を当社が放棄したとしても、その後の違反、またはお客様が違反した規約を遵守する義務を放棄するものではありません。
      </p>
      <p>
        本規約のいずれかの部分が裁判官または仲裁人によって執行不能と判断された場合、その執行不能な部分は可能な最大限の範囲で適用され、残りの部分は引き続き完全に有効に存続します。
      </p>

      {/* 14 */}
      <h2>14. 電子通信への同意</h2>
      <p>
        お客様は、当社のプライバシーポリシーに記載されているとおり、当社からの電子通信を受信することに同意するものとします。電子通信に関する当社の方針についての選択肢を理解するために、当社の{' '}
        <a href='/docs/policy'>プライバシーポリシー</a>をお読みください。当社は、通知、同意書、開示、その他の通信を電子的にお客様に送信する場合があります。
      </p>

      {/* 15 */}
      <h2>15. データ保持</h2>
      <p>
        Samplyは、保留中の通知キューのレコードを <strong>30日間</strong>、通知履歴（回答レコード）を{' '}
        <strong>12ヶ月間</strong> 保持します。これらの保持期間が過ぎると、記録はプラットフォームによって
        自動的に削除されます。研究者は、期限が切れる前に保存したいスタディデータをエクスポートする責任があります。
      </p>

      {/* 16 */}
      <h2>16. お問い合わせ</h2>
      <p>
        お問い合わせは、{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>までメールでご連絡ください。
      </p>
    </>
  );
}

function TermsContentTr() {
  return (
    <>
      {/* 1 */}
      <h2>1. Giriş</h2>
      <p>
        Samply, Samply Research mobil uygulaması aracılığıyla çevrimiçi deneylere ve anketlere katılımı yönetmek için bir platformdur. Samply, https://samply.uni-konstanz.de adresinde barındırılır (bundan sonra «Site» olarak anılacaktır) ve bildirimlerin planlanması ve yönetilmesi için hizmetler (topluca «Hizmetler») sunar. Hizmetleri kullanmanız ve bizim Hizmetleri size sunmamız, bu Kullanım Şartlarında belirtilen koşullara bağlı kalacağınız konusunda sizinle Samply arasında bir anlaşma olarak kabul edilir.
      </p>
      <p>
        Samply, ticari olmayan araştırma amaçları için ücretsiz olarak kullanılabilir. Samply’nin ticari kullanımıyla ilgili olarak lütfen{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> adresinden bizimle iletişime geçin.
      </p>
      <p>
        Lütfen bu Kullanım Şartlarını dikkatlice okuyun. Hizmetlere kaydolarak veya başka bir şekilde Hizmetleri kullanarak, bu Kullanım Şartlarını ve{' '}
        <a href='/docs/policy'>Gizlilik Politikamızı</a> (topluca «Şartlar») okuduğunuzu, anladığınızı ve bunlara bağlı kalmayı kabul ettiğinizi beyan etmiş olursunuz. Şartlarda önerdiklerimizi kabul etmiyorsanız, lütfen Hizmetlerin hiçbir bölümünü kullanmayın.
      </p>

      {/* 2 */}
      <h2>2. Kullanım Uygunluğu</h2>
      <p>
        Hizmetler, 18 yaşında veya daha büyük kişilerin kullanımı için tasarlanmıştır. 18 yaşının altındaki kişiler Hizmetleri kullanamaz. 18 yaşında veya daha büyükseniz, lütfen Hizmetlerden askıya alınmamış olduğunuzdan ve Hizmetleri kullanmanızın herhangi bir yasa veya yönetmeliği ihlal etmediğinden emin olun. Hizmetleri bir şirket, kuruluş veya başka bir tüzel kişilik adına kullanıyorsanız, söz konusu tüzel kişiliği bu Şartlara bağlama yetkisine sahip olduğunuzu bize beyan etmiş olursunuz.
      </p>

      {/* 3 */}
      <h2>3. Hesap ve Kayıt</h2>
      <p>
        Hizmetleri kullanırken bir hesap kaydetme seçeneğiniz vardır. Hizmetlerde bir hesap oluşturmak, çevrimiçi araştırmalara (deneyler veya anketler) katılım veya kendi araştırmanızı oluşturma ile ilgili özel işlevlere erişmenizi sağladığından bir hesap kaydetmenizi öneririz. Bir hesap kaydederken, kayıt sürecinin bir parçası olarak bize bazı kişisel bilgiler verirsiniz; bunlardan bazıları hesap kaydı için zorunludur. Sağlanan tüm bilgilerin doğru olduğuna ve bu bilgilerin gelecekte de doğru ve güncel kalacağına söz verirsiniz. Ayrıca hesabınızı güvende tutmak için bir şifre belirlemenizi rica ediyoruz. Şifrenizi güvenli ve gizli tutmaktan siz sorumlusunuz. Hesabınızda gerçekleşen tüm etkinliklerden sorumlusunuz. Hesabınızın güvenliğinin tehlikeye girmiş olabileceğini düşünüyorsanız, lütfen derhal{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> adresinden bizimle iletişime geçin. Şifrenizi https://samply.uni-konstanz.de/researcher/forgot adresinden de sıfırlayabilirsiniz.
      </p>

      {/* 4 */}
      <h2>4. Hizmetleri Kullanım Lisansı</h2>
      <p>
        Şartlara uymaya devam ettiğiniz sürece, yalnızca kişisel kullanımınız için size Hizmetlere erişim izni veriyoruz. Hizmetlerde araştırmalar (bundan sonra «araştırma») oluşturabilir veya diğer Samply kullanıcıları (bundan sonra «araştırmacılar») tarafından oluşturulan araştırmalara katılabilirsiniz.
      </p>
      <p>Bu lisansın aşağıdakileri kullanma hakkını içermediğini unutmayın:</p>
      <ol>
        <li>Bir araştırmada görünen ticari markalar, logolar veya işaretler;</li>
        <li>Bir araştırmada tanınabilen kişilerin görüntüleri;</li>
        <li>Bir araştırmada yer alan sanat eserleri veya telif hakkıyla korunan eserler.</li>
      </ol>

      {/* 5 */}
      <h2>5. Kullanıcı İçeriği</h2>
      <p>Sitede oluşturduğunuz araştırmalar dahil olmak üzere tüm Kullanıcı İçeriğinin sahibi sizsiniz.</p>
      <dl>
        <dt>Genel hükümler</dt>
        <dd>
          Hizmetlerde araştırmalarınızı oluşturup yayımlayabilir ve ayrıca metin, görüntü, web bağlantısı, konum bilgisi ve diğer içerikleri (bundan sonra «Kullanıcı İçeriği») oluşturup yayımlayabilirsiniz. Hizmetlerde sağladığınız tüm Kullanıcı İçeriği size veya lisans verenlerinize aittir. Kullanıcı İçeriğiniz üzerinde herhangi bir mülkiyet iddiasında bulunmuyoruz; tamamı size aittir.
        </dd>
        <dt>Sınırlı Lisans</dt>
        <dd>
          Bir araştırma yayımladığınızda, bize Sitede Kullanıcı İçeriğinizi (tamamen veya kısmen) barındırmak, depolamak, iletmek, görüntülemek ve dağıtmak için dünya çapında, münhasır olmayan, telifsiz bir lisans (alt lisans verme hakkıyla birlikte) vermiş olursunuz. Araştırmanın kullanımı için herhangi bir ödeme yapmakla yükümlü olmadığımızı ve araştırmanın atıf veya tazminat olmaksızın halka açık hale getirileceğini kabul edersiniz. Araştırmanızın halka açık olmasını istemiyorsanız, herhangi bir kısıtlama olmaksızın Hizmetlerin tüm özelliklerinden yararlanabilirsiniz.
        </dd>
        <dt>Beyanlar ve Garantiler</dt>
        <dd>
          Kullanıcı İçeriğinizden ve Kullanıcı İçeriğinizi Hizmetlere yükleyerek veya yayımlayarak doğan tüm sonuçlardan yalnızca siz sorumlusunuz. Kullanıcı İçeriğini her yüklediğinizde veya yayımladığınızda şunları beyan ve taahhüt edersiniz: (a) Kullanıcı İçeriğinin yaratıcısı ve sahibi olduğunuz ya da bu bölümde belirtildiği şekilde Kullanıcı İçeriğinizi Hizmetlerde kullanmak ve diğer kullanıcıların kullanmasına izin vermek için gerekli tüm haklara diğer kişilerden veya kuruluşlardan sahip olduğunuz; (b) Kullanıcı İçeriğinizin, telif hakları veya diğer fikri mülkiyet hakları, gizlilik hakları, kişilik hakları, manevi haklar dahil olmak üzere üçüncü tarafların haklarını ihlal etmediği veya kötüye kullanmadığı ve hiç kimseyi karalamadığı, iftira atmadığı veya hakaret etmediği.
        </dd>
        <dt>Sorumluluk Reddi</dt>
        <dd>
          Hizmetlere yüklenen veya gönderilen tüm Kullanıcı İçeriğini izlememizin makul ölçüde mümkün olmadığını ve sizin veya diğer kullanıcıların Hizmetlere yükleyebileceği veya gönderebileceği Kullanıcı İçeriğini size veya diğer kullanıcılara karşı izleme, düzenleme veya yönetme yükümlülüğümüz olmadığını bilmenizi isteriz. Bu, Hizmetlerdeki Kullanıcı İçeriği için sorumluluk üstlenmediğimiz ve Kullanıcı İçeriği temelinde bize karşı talepte bulunmamayı kabul ettiğiniz anlamına gelir. Yine de, Şartları ihlal ettiğini veya başka bir şekilde sakıncalı olduğunu düşündüğümüz Kullanıcı İçeriğini istediğimiz zaman Hizmetlerden kaldırma, düzenleme, tarama veya engelleme hakkımızı saklı tutarız.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Yasaklı Davranışlar</h2>
      <p>Hizmetleri kullanırken aşağıdakileri yapmamayı kabul edersiniz:</p>
      <ol type='a'>
        <li>Hizmetleri yasadışı amaçlarla veya herhangi bir yasa veya yönetmeliği ihlal eden bir şekilde kullanmak;</li>
        <li>Fikri mülkiyet haklarının ihlali veya kötüye kullanılması dahil olmak üzere üçüncü tarafların haklarını ihlal etmek veya başkalarını bunu yapmaya teşvik etmek;</li>
        <li>Yasadışı, karalayıcı, taciz edici, müstehcen, açık saçık, pornografik, tehdit edici, nefret dolu veya başka şekilde uygunsuz Kullanıcı İçeriği yüklemek, yayımlamak veya dağıtmak;</li>
        <li>Hizmetlerin güvenlik özelliklerini kurcalamak (örneğin, herkese açık olmayan araştırmalara veya Kullanıcı İçeriğine erişmek için özellikleri devre dışı bırakmak veya atlatmak ya da kaynak kodunu elde etmek için Hizmetlerin tersine mühendisliğini yapmak);</li>
        <li>Hizmetleri sunmamızı veya diğer kullanıcıların Hizmetleri kullanmasını engellemek (yani virüs, reklam yazılımı veya casus yazılım yüklememek veya dağıtmamak, talepler veya tanıtımlar göndermemek, üçüncü tarafların kişisel verilerini toplamamak ve Hizmetleri sağlamak için kullandığımız ağlara veya cihazlara müdahale etmemek);</li>
        <li>Başka biri gibi davranmak gibi sahtekarlık eylemlerinde bulunmak;</li>
        <li>Hizmetlere bot, örümcek, betik, tarayıcı, kazıyıcı veya diğer otomatik araç veya uygulamalar (web tarayıcıları ve yayımlayabileceğimiz diğer mobil uygulamalar hariç) aracılığıyla erişmek;</li>
        <li>Sitenin görünümünü taklit etmek veya benzer ya da rakip bir hizmet oluşturmak amacıyla araştırmalara erişmek, indirmek, kopyalamak, değiştirmek, dağıtmak, yürütmek veya kullanmak;</li>
        <li>Hizmetleri kullanma hakkınızı veya Materyalleri görüntüleme, erişme veya kullanma hakkınızı devretmek; veya</li>
        <li>Bunlardan herhangi birini denemek veya başka birinin yapmasına yardım etmek.</li>
      </ol>

      {/* 7 */}
      <h2>7. Üçüncü Taraf Hizmetleri ve Bağlantılı Siteler</h2>
      <p>
        Hizmetlerde, hesabınızı diğer hizmetlerdeki hesaplara bağlama özelliği gibi Kullanıcı İçeriği dahil bilgileri başka şirketlerin hizmetlerine göndermenize olanak tanıyan araçlar bulabilirsiniz. Bu araçları kullanırsanız, bu bilgileri diğer şirketlerin hizmetlerine göndermemize izin vermiş olursunuz. Ayrıca, bu bilgileri başka şirketlerin nasıl kullanacağı üzerinde hiçbir kontrolümüz olmadığını ve bu nedenle hiçbir şekilde sorumlu olmadığımızı kabul edersiniz. Ayrıca Hizmetlerde, işletmediğimiz diğer sitelere bağlantılar bulabilirsiniz. Bu siteler de bizim kontrolümüz altında değildir, bu nedenle Hizmetleri terk ettiğinizde lütfen kendi takdirinize göre hareket edin.
      </p>

      {/* 8 */}
      <h2>8. Hesabın Sonlandırılması</h2>
      <p>
        Şartlardan herhangi birini ihlal etmeniz durumunda Hizmetleri kullanma izniniz otomatik olarak sona erer. Hizmetlerdeki hesabınızı{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> adresine bir e-posta göndererek iptal edebilirsiniz.
      </p>

      {/* 9 */}
      <h2>9. Gizlilik Politikası ve Ek Gereklilikler</h2>
      <p>
        Sizden hangi bilgileri topladığımızı ve bunları nasıl kullandığımızı bilmenizi istiyoruz. Lütfen <a href='/docs/policy'>Gizlilik Politikamızı</a> dikkatlice okuyun. Gizlilik Politikası, Şartların bir parçası olarak Şartlara dahil edilmiştir. Ayrıca, Hizmetleri kullanırken uymanız gereken ek gereklilikler hakkında sizi bilgilendirebiliriz. Hizmetlerde yayımladığımız veya Hizmetlerden bağlantı verdiğimiz herhangi bir ek yönerge, bu anlaşmanın bir parçası olarak Şartlara dahil edilmiştir.
      </p>

      {/* 10 */}
      <h2>10. Şartlarda Değişiklikler</h2>
      <p>
        Şartları, bir aylık önceden bildirimle değiştirebiliriz. Bu durumda, değişiklikler hakkında sizi bilgilendirmek için makul çabayı göstereceğiz. Bu bildirimler, açılır pencereler aracılığıyla, Hizmetlerdeki hesabınıza bağlı e-posta adresine gönderilerek veya başka yollarla sağlanabilir ve Şartların yeni sürümü yürürlüğe girdiğinde size haber verilir. Önerdiğimiz yeni şartları kabul etmiyorsanız, hesabınızı derhal askıya alabilir ve Hizmetlere erişiminizi sonlandırabiliriz. Hizmetlerle ilgili anlaşmazlıklar, anlaşmazlığın ortaya çıktığı tarihte yürürlükte olan Şartların sürümüne göre çözülecektir.
      </p>

      {/* 11 */}
      <h2>11. Hizmetlerin Sahipliği</h2>
      <p>
        Sağladığımız Hizmetlerin tüm yazılımı, görsel arayüzleri, grafikleri, tasarımı, bilgileri ve diğer unsurları (bundan sonra «Materyaller») fikri mülkiyet ve diğer yasalarla korunmaktadır. Hizmetlerde bulunan tüm Materyallerin sahibi biz veya lisans verenlerimiziz ve bu Şartlarda açıkça izin verilenler dışında Materyalleri kullanamazsınız.
      </p>

      {/* 12 */}
      <h2>12. Sorumluluk Reddi; Garanti Verilmemesi</h2>
      <p>
        Hizmetleri ve Hizmetler aracılığıyla erişilebilen tüm içeriği «olduğu gibi» ve «mevcut olduğu şekilde», açık veya zımni hiçbir garanti olmaksızın sağlıyoruz. Yürürlükteki yasaların izin verdiği ölçüde, ticari elverişlilik, belirli bir amaca uygunluk, üçüncü taraf haklarının ihlal edilmemesi, mülkiyet ve ticari işlem akışı, kullanım veya ticari uygulamadan doğan tüm garantiler dahil olmak üzere her türlü garantiyi açıkça reddediyoruz. Hizmetlerin kesintisiz, güvenli, hatasız veya zararlı bileşenlerden arındırılmış olacağını veya hataların ya da zararlı bileşenlerin düzeltileceğini garanti etmiyor veya beyan etmiyoruz.
      </p>
      <p>
        Aşağıdaki 13. maddede belirtilen durumlar dışında, Hizmetleri kendi sorumluluğunuzda kullanır ve Hizmetleri kullanmaktan veya bunlara erişmekten, Hizmetlerin diğer kullanıcılarıyla etkileşimde bulunmaktan ve Hizmetler aracılığıyla erişilebilen içerikten kaynaklanan zararların tüm riskini üstlenirsiniz.
      </p>
      <p>
        Bazı bölgelerde yasalar garantilerin hariç tutulmasını yasaklar ve ikamet ettiğiniz yere bağlı olarak farklı haklara sahip olabilirsiniz. Yasalara aykırı olduğu durumlarda size karşı sorumluluğumuzu hiçbir şekilde hariç tutmaz veya sınırlamayız. Birleşik Krallık ve Avrupa Birliği’nde bu, ihmalimiz veya çalışanlarımızın, temsilcilerimizin ya da yüklenicilerimizin ihmali nedeniyle oluşan ölüm veya kişisel yaralanma sorumluluğunu, dolandırıcılık veya hileli beyan sorumluluğunu, Hizmetleri makul özen ve beceri ile sağlama yükümlülüğüne dair sorumluluğu veya hakkımızda ya da Hizmetler hakkında sağlanan bilgilere uygun olarak Hizmetleri sağlamamamızdan kaynaklanan sorumluluğu içerir.
      </p>

      {/* 13 */}
      <h2>13. Genel Hükümler</h2>
      <p>
        Bu Şartlar, Gizlilik Politikası ve Şartlara dahil edilen diğer politikalarla birlikte, Hizmetleri kullanımınıza ilişkin sizinle bizim aramızdaki tüm anlaşmayı oluşturur. Yukarıdaki 12. madde uyarınca Şartları güncelleme hakkımız haricinde, Şartlar yalnızca her iki tarafça imzalanmış yazılı bir anlaşma ile değiştirilebilir. Onayımız olmadan bu Şartları başka bir kişiye veya tüzel kişiliğe devredemez veya aktaramaz, Hizmetlerdeki hesabınızı da devredemezsiniz. Biz ise size bildirimde bulunarak veya bulunmaksızın bu Şartları devredebiliriz.
      </p>
      <p>
        Bu Kullanım Şartları kapsamındaki bir hakkı kullanmada veya bu Şartlara uyulmasını talep etmede sizin tarafınızdan herhangi bir gecikme veya başarısızlık, daha sonra söz konusu hakkı kullanma veya uyumu talep etme hakkımızı etkilemez. Bu Kullanım Şartlarının ihlal edilmesinden feragat etmemiz, herhangi bir sonraki ihlalden veya ihlal ettiğiniz şartlara uyma yükümlülüğünden feragat anlamına gelmez.
      </p>
      <p>
        Bu Şartların herhangi bir bölümünün bir yargıç veya hakem tarafından uygulanamaz olduğuna karar verilirse, söz konusu uygulanamaz bölüm mümkün olan en geniş ölçüde uygulanacak ve geri kalan bölüm tam olarak yürürlükte kalmaya devam edecektir.
      </p>

      {/* 14 */}
      <h2>14. Elektronik İletişimlere Onay</h2>
      <p>
        Gizlilik Politikamızda açıklandığı üzere bizden elektronik iletişimler almayı kabul edersiniz. Elektronik iletişimler konusundaki politikamıza ilişkin seçeneklerinizi anlamak için lütfen{' '}
        <a href='/docs/policy'>Gizlilik Politikamızı</a> okuyun. Size bildirimleri, onay formlarını, açıklamaları ve diğer iletişimleri elektronik olarak gönderebiliriz.
      </p>

      {/* 15 */}
      <h2>15. Veri Saklama</h2>
      <p>
        Samply, bekleyen bildirim kuyruğunun kayıtlarını <strong>30 gün</strong> ve bildirim geçmişini (yanıt kayıtları){' '}
        <strong>12 ay</strong> saklar. Bu saklama süreleri dolduktan sonra kayıtlar platform tarafından
        otomatik olarak silinir. Araştırmacılar, süresi dolmadan önce saklamak istedikleri çalışma verilerini dışa aktarmaktan sorumludur.
      </p>

      {/* 16 */}
      <h2>16. Bize Ulaşın</h2>
      <p>
        Sorularınız için lütfen{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a> adresinden e-posta ile bizimle iletişime geçin.
      </p>
    </>
  );
}

function TermsContentPl() {
  return (
    <>
      {/* 1 */}
      <h2>1. Wprowadzenie</h2>
      <p>
        Samply to platforma do zarządzania udziałem w eksperymentach i ankietach online za pośrednictwem aplikacji mobilnej Samply Research. Samply jest hostowane pod adresem https://samply.uni-konstanz.de (dalej zwane «Witryną») i oferuje usługi planowania i zarządzania powiadomieniami (łącznie zwane «Usługami»). Korzystanie przez Ciebie z Usług oraz świadczenie przez nas Usług na Twoją rzecz jest uważane za umowę między Tobą a Samply, na mocy której zobowiązujesz się przestrzegać warunków określonych w niniejszym Regulaminie.
      </p>
      <p>
        Samply może być używane bezpłatnie do niekomercyjnych celów badawczych. W sprawie komercyjnego wykorzystania Samply prosimy o kontakt pod adresem{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        Prosimy o uważne zapoznanie się z niniejszym Regulaminem. Rejestrując się w Usługach lub w inny sposób korzystając z Usług, oświadczasz, że przeczytałeś, zrozumiałeś i zgadzasz się przestrzegać niniejszego Regulaminu oraz naszej{' '}
        <a href='/docs/policy'>Polityki Prywatności</a> (łącznie zwanych «Warunkami»). Jeśli nie akceptujesz tego, co proponujemy w Warunkach, prosimy nie korzystać z żadnej części Usług.
      </p>

      {/* 2 */}
      <h2>2. Kwalifikowalność do korzystania</h2>
      <p>
        Usługi są przeznaczone do użytku przez osoby w wieku 18 lat lub starsze. Osoby poniżej 18 roku życia nie mogą korzystać z Usług. Jeśli masz 18 lat lub więcej, upewnij się, że nie zostałeś zawieszony z Usług i że korzystanie z Usług nie narusza żadnego prawa ani regulacji. Jeśli korzystasz z Usług w imieniu firmy, organizacji lub innego podmiotu prawnego, oświadczasz nam, że masz uprawnienia do związania tego podmiotu prawnego niniejszymi Warunkami.
      </p>

      {/* 3 */}
      <h2>3. Konto i rejestracja</h2>
      <p>
        Podczas korzystania z Usług masz możliwość zarejestrowania konta. Zalecamy zarejestrowanie konta, ponieważ utworzenie konta w Usługach umożliwia dostęp do specjalnych funkcji związanych z uczestnictwem w badaniach online (eksperymentach lub ankietach) lub tworzeniem własnych badań. Podczas rejestracji konta przekazujesz nam pewne dane osobowe w ramach procesu rejestracji, z których niektóre są obowiązkowe dla rejestracji konta. Obiecujesz, że wszystkie podane informacje są prawdziwe oraz że informacje te pozostaną prawdziwe i aktualne również w przyszłości. Prosimy również o ustawienie hasła w celu zabezpieczenia konta. Jesteś odpowiedzialny za zachowanie bezpieczeństwa i poufności swojego hasła. Jesteś odpowiedzialny za wszelkie działania, które mają miejsce na Twoim koncie. Jeśli uważasz, że bezpieczeństwo Twojego konta mogło zostać naruszone, prosimy o niezwłoczny kontakt pod adresem{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. Możesz również zresetować hasło pod adresem https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. Licencja na korzystanie z Usług</h2>
      <p>
        Tak długo jak nadal przestrzegasz Warunków, udzielamy Ci dostępu do Usług wyłącznie do Twojego osobistego użytku. Możesz tworzyć badania (dalej zwane «badaniem») w Usługach lub uczestniczyć w badaniach tworzonych przez innych użytkowników Samply (dalej zwanych «badaczami»).
      </p>
      <p>Należy pamiętać, że niniejsza licencja nie obejmuje prawa do korzystania z:</p>
      <ol>
        <li>znaków towarowych, logo lub oznaczeń pojawiających się w badaniu;</li>
        <li>obrazów osób rozpoznawalnych w badaniu;</li>
        <li>dzieł sztuki lub utworów chronionych prawem autorskim zawartych w badaniu.</li>
      </ol>

      {/* 5 */}
      <h2>5. Treści użytkownika</h2>
      <p>Jesteś właścicielem wszystkich Treści użytkownika, w tym badań tworzonych przez Ciebie w Witrynie.</p>
      <dl>
        <dt>Postanowienia ogólne</dt>
        <dd>
          W Usługach możesz tworzyć i publikować swoje badania, a także tworzyć i publikować teksty, obrazy, linki internetowe, informacje o lokalizacji i inne treści (dalej zwane «Treściami użytkownika»). Wszystkie Treści użytkownika, które dostarczasz w Usługach, należą do Ciebie lub Twoich licencjodawców. Nie rościmy sobie żadnych praw własności do Twoich Treści użytkownika; należą one wyłącznie do Ciebie.
        </dd>
        <dt>Ograniczona licencja</dt>
        <dd>
          Publikując badanie, udzielasz nam ogólnoświatowej, niewyłącznej, nieodpłatnej licencji (z prawem do sublicencjonowania) do hostowania, przechowywania, przekazywania, wyświetlania i dystrybucji (w całości lub w części) Twoich Treści użytkownika w Witrynie. Zgadzasz się, że nie jesteśmy zobowiązani do dokonywania jakichkolwiek płatności za korzystanie z badania i że badanie zostanie udostępnione publicznie bez przypisania autorstwa ani wynagrodzenia. Jeśli nie chcesz, aby Twoje badanie było publicznie dostępne, możesz korzystać ze wszystkich funkcji Usług bez żadnych ograniczeń.
        </dd>
        <dt>Oświadczenia i gwarancje</dt>
        <dd>
          Jesteś wyłącznie odpowiedzialny za swoje Treści użytkownika oraz za wszelkie konsekwencje wynikające z przesłania lub opublikowania Twoich Treści użytkownika w Usługach. Za każdym razem, gdy przesyłasz lub publikujesz Treści użytkownika, oświadczasz i gwarantujesz, że: (a) jesteś twórcą i właścicielem Treści użytkownika lub posiadasz wszelkie niezbędne prawa od innych osób lub podmiotów do korzystania z Twoich Treści użytkownika i zezwalania innym użytkownikom na korzystanie z nich w Usługach zgodnie z niniejszym punktem; (b) Twoje Treści użytkownika nie naruszają ani nie wykorzystują w sposób nieuprawniony praw osób trzecich, w tym praw autorskich lub innych praw własności intelektualnej, praw do prywatności, praw do wizerunku, praw osobistych, oraz nie zniesławiają, nie pomawiają ani nie obrażają nikogo.
        </dd>
        <dt>Wyłączenie odpowiedzialności</dt>
        <dd>
          Chcielibyśmy, abyś wiedział, że monitorowanie wszystkich Treści użytkownika przesyłanych lub publikowanych w Usługach nie jest racjonalnie możliwe i nie mamy obowiązku monitorowania, edytowania ani zarządzania Treściami użytkownika, które Ty lub inni użytkownicy mogą przesyłać lub publikować w Usługach, ani wobec Ciebie, ani wobec innych użytkowników. Oznacza to, że nie ponosimy odpowiedzialności za Treści użytkownika w Usługach i zgadzasz się nie wnosić wobec nas żadnych roszczeń na podstawie Treści użytkownika. Niemniej jednak zastrzegamy sobie prawo do usuwania, edytowania, skanowania lub blokowania w dowolnym momencie Treści użytkownika z Usług, które uznamy za naruszające Warunki lub w inny sposób niewłaściwe.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. Zakazane zachowania</h2>
      <p>Korzystając z Usług, zgadzasz się nie:</p>
      <ol type='a'>
        <li>używać Usług do nielegalnych celów lub w sposób naruszający jakiekolwiek prawo lub regulację;</li>
        <li>naruszać praw osób trzecich, w tym naruszania lub nieuprawnionego wykorzystywania praw własności intelektualnej, ani zachęcać innych do tego;</li>
        <li>przesyłać, publikować lub rozpowszechniać nielegalnych, zniesławiających, nękających, obscenicznych, jednoznacznie seksualnych, pornograficznych, groźnych, nienawistnych lub w inny sposób niewłaściwych Treści użytkownika;</li>
        <li>manipulować funkcjami bezpieczeństwa Usług (na przykład wyłączać lub omijać funkcje w celu uzyskania dostępu do niepublicznych badań lub Treści użytkownika ani dokonywać inżynierii wstecznej Usług w celu uzyskania kodu źródłowego);</li>
        <li>uniemożliwiać nam świadczenia Usług lub innym użytkownikom korzystania z Usług (tj. nie przesyłać i nie rozpowszechniać wirusów, oprogramowania reklamowego ani szpiegującego, nie wysyłać próśb ani promocji, nie zbierać danych osobowych osób trzecich i nie zakłócać działania sieci lub urządzeń, których używamy do świadczenia Usług);</li>
        <li>angażować się w działania oszukańcze, takie jak podszywanie się pod inną osobę;</li>
        <li>uzyskiwać dostępu do Usług za pośrednictwem botów, pająków, skryptów, robotów indeksujących, scraperów lub innych zautomatyzowanych narzędzi lub aplikacji (z wyjątkiem przeglądarek internetowych i innych aplikacji mobilnych, które możemy publikować);</li>
        <li>uzyskiwać dostępu, pobierać, kopiować, modyfikować, dystrybuować, wykonywać ani korzystać z badań w celu naśladowania wyglądu Witryny lub tworzenia podobnej lub konkurencyjnej usługi;</li>
        <li>przenosić swojego prawa do korzystania z Usług ani prawa do przeglądania, dostępu lub korzystania z Materiałów; ani</li>
        <li>podejmować prób któregokolwiek z powyższych ani pomagać innym w ich wykonaniu.</li>
      </ol>

      {/* 7 */}
      <h2>7. Usługi osób trzecich i witryny z odnośnikami</h2>
      <p>
        W Usługach możesz znaleźć narzędzia, które umożliwiają wysyłanie informacji, w tym Treści użytkownika, do usług innych firm, takich jak funkcja łączenia konta z kontami w innych usługach. Korzystając z tych narzędzi, zezwalasz nam na przekazywanie tych informacji do usług innych firm. Zgadzasz się również, że nie mamy żadnej kontroli nad tym, jak inne firmy wykorzystają te informacje i w związku z tym nie ponosimy za to żadnej odpowiedzialności. Możesz również znaleźć w Usługach linki do innych witryn, których nie obsługujemy. Witryny te również nie są pod naszą kontrolą, dlatego prosimy o zachowanie własnej oceny po opuszczeniu Usług.
      </p>

      {/* 8 */}
      <h2>8. Zakończenie konta</h2>
      <p>
        Twoje pozwolenie na korzystanie z Usług wygasa automatycznie w przypadku naruszenia któregokolwiek z Warunków. Możesz anulować swoje konto w Usługach, wysyłając wiadomość e-mail na adres{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. Polityka Prywatności i dodatkowe wymagania</h2>
      <p>
        Chcemy, abyś wiedział, jakie informacje od Ciebie zbieramy i jak je wykorzystujemy. Prosimy o uważne zapoznanie się z naszą <a href='/docs/policy'>Polityką Prywatności</a>. Polityka Prywatności jest włączona do Warunków jako ich część. Możemy również informować Cię o dodatkowych wymaganiach, których musisz przestrzegać podczas korzystania z Usług. Wszelkie dodatkowe wytyczne, które publikujemy w Usługach lub do których prowadzą linki w Usługach, są włączone do Warunków jako część niniejszej umowy.
      </p>

      {/* 10 */}
      <h2>10. Zmiany w Warunkach</h2>
      <p>
        Możemy zmienić Warunki za miesięcznym wyprzedzeniem. W takim przypadku dołożymy uzasadnionych starań, aby poinformować Cię o zmianach. Te powiadomienia mogą być dostarczane poprzez okna pop-up, wysyłane na adres e-mail powiązany z Twoim kontem w Usługach lub w inny sposób, i powiadomimy Cię, gdy nowa wersja Warunków wejdzie w życie. Jeśli nie akceptujesz proponowanych nowych warunków, możemy natychmiast zawiesić Twoje konto i zakończyć Twój dostęp do Usług. Wszelkie spory dotyczące Usług będą rozstrzygane zgodnie z wersją Warunków obowiązującą w dniu powstania sporu.
      </p>

      {/* 11 */}
      <h2>11. Własność Usług</h2>
      <p>
        Całe oprogramowanie, interfejsy wizualne, grafika, projekt, informacje i inne elementy świadczonych Usług (dalej zwane «Materiałami») są chronione własnością intelektualną i innymi prawami. Jesteśmy właścicielem lub naszymi licencjodawcami wszystkich Materiałów zawartych w Usługach i nie możesz korzystać z Materiałów w inny sposób niż wyraźnie dozwolony w niniejszych Warunkach.
      </p>

      {/* 12 */}
      <h2>12. Wyłączenie odpowiedzialności; brak gwarancji</h2>
      <p>
        Świadczymy Usługi i wszelkie treści dostępne za pośrednictwem Usług «w stanie, w jakim są» i «w miarę dostępności», bez żadnych gwarancji, wyraźnych ani dorozumianych. W zakresie dozwolonym przez obowiązujące prawo wyraźnie wyłączamy wszelkie gwarancje, w tym wszelkie gwarancje przydatności handlowej, przydatności do określonego celu, nienaruszania praw osób trzecich, własności oraz wynikające z przebiegu transakcji handlowych, użytkowania lub praktyki handlowej. Nie gwarantujemy ani nie oświadczamy, że Usługi będą nieprzerwane, bezpieczne, bezbłędne ani wolne od szkodliwych komponentów, ani że błędy lub szkodliwe komponenty zostaną poprawione.
      </p>
      <p>
        Z wyjątkiem przypadków określonych w punkcie 13 poniżej, korzystasz z Usług na własną odpowiedzialność i ponosisz całe ryzyko szkód wynikających z korzystania z Usług lub uzyskiwania do nich dostępu, interakcji z innymi użytkownikami Usług oraz treści dostępnych za pośrednictwem Usług.
      </p>
      <p>
        W niektórych regionach prawo zakazuje wyłączania gwarancji i w zależności od miejsca zamieszkania możesz mieć różne prawa. W żadnym wypadku nie wyłączamy ani nie ograniczamy naszej odpowiedzialności wobec Ciebie tam, gdzie byłoby to niezgodne z prawem. W Wielkiej Brytanii i Unii Europejskiej obejmuje to odpowiedzialność za śmierć lub obrażenia ciała spowodowane naszym zaniedbaniem lub zaniedbaniem naszych pracowników, agentów lub wykonawców, odpowiedzialność za oszustwo lub świadome wprowadzenie w błąd, odpowiedzialność za obowiązek świadczenia Usług z należytą starannością i umiejętnościami lub odpowiedzialność za niedostarczenie Usług zgodnie z informacjami dostarczonymi na nasz temat lub w odniesieniu do Usług.
      </p>

      {/* 13 */}
      <h2>13. Postanowienia ogólne</h2>
      <p>
        Niniejszy Regulamin, wraz z Polityką Prywatności i innymi politykami włączonymi do Warunków, stanowi całość umowy między Tobą a nami dotyczącą Twojego korzystania z Usług. Z wyjątkiem naszego prawa do aktualizacji Warunków zgodnie z punktem 12 powyżej, Warunki mogą być zmieniane wyłącznie pisemną umową podpisaną przez obie strony. Bez naszej zgody nie możesz przenosić ani cedować niniejszych Warunków na inną osobę lub podmiot prawny ani przenosić swojego konta w Usługach. My ze swojej strony możemy przenosić niniejsze Warunki na inne podmioty z powiadomieniem lub bez powiadomienia Ciebie.
      </p>
      <p>
        Wszelkie opóźnienia lub niepowodzenia z Twojej strony w korzystaniu z prawa wynikającego z niniejszego Regulaminu lub żądaniu zgodności z niniejszymi Warunkami nie wpływają na nasze prawo do późniejszego korzystania z tego prawa lub żądania zgodności. Nasze odstąpienie od jakiegokolwiek naruszenia niniejszego Regulaminu nie stanowi odstąpienia od jakiegokolwiek późniejszego naruszenia ani od obowiązku przestrzegania warunków, które naruszyłeś.
      </p>
      <p>
        Jeśli sędzia lub arbiter uzna, że jakakolwiek część niniejszych Warunków jest niewykonalna, ta niewykonalna część będzie egzekwowana w najszerszym możliwym zakresie, a pozostała część pozostanie w mocy w pełnym zakresie.
      </p>

      {/* 14 */}
      <h2>14. Zgoda na komunikację elektroniczną</h2>
      <p>
        Zgadzasz się na otrzymywanie od nas komunikacji elektronicznej zgodnie z opisem w naszej Polityce Prywatności. Aby zrozumieć swoje wybory dotyczące naszej polityki w zakresie komunikacji elektronicznej, prosimy o zapoznanie się z naszą{' '}
        <a href='/docs/policy'>Polityką Prywatności</a>. Możemy wysyłać Ci powiadomienia, formularze zgody, ujawnienia i inne komunikaty drogą elektroniczną.
      </p>

      {/* 15 */}
      <h2>15. Przechowywanie danych</h2>
      <p>
        Samply przechowuje zapisy oczekującej kolejki powiadomień przez <strong>30 dni</strong>, a historię powiadomień (rejestry odpowiedzi) przez{' '}
        <strong>12 miesięcy</strong>. Po upływie tych okresów przechowywania zapisy są automatycznie usuwane przez platformę. Badacze są odpowiedzialni za eksportowanie danych badawczych, które chcą zachować, przed upływem terminu.
      </p>

      {/* 16 */}
      <h2>16. Skontaktuj się z nami</h2>
      <p>
        W razie pytań prosimy o kontakt e-mailowy pod adresem{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}

function TermsContentAr() {
  return (
    <>
      {/* 1 */}
      <h2>1. مقدمة</h2>
      <p>
        Samply هي منصة لإدارة المشاركة في التجارب والاستطلاعات عبر الإنترنت من خلال تطبيق Samply Research للهاتف المحمول. تُستضاف Samply على https://samply.uni-konstanz.de (يُشار إليه فيما يلي بـ «الموقع») وتقدم خدمات جدولة وإدارة الإشعارات (يُشار إليها مجتمعةً بـ «الخدمات»). يُعتبر استخدامك للخدمات وتقديمنا للخدمات لك اتفاقية بينك وبين Samply، تتعهد بموجبها بالالتزام بالأحكام المنصوص عليها في هذه الشروط والأحكام.
      </p>
      <p>
        يمكن استخدام Samply مجانًا للأغراض البحثية غير التجارية. للاستفسار عن الاستخدام التجاري لـ Samply، يُرجى التواصل معنا على{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
      <p>
        يُرجى قراءة هذه الشروط والأحكام بعناية. بتسجيلك في الخدمات أو استخدامك للخدمات بأي طريقة أخرى، فإنك تُقرّ بأنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام وسياسة{' '}
        <a href='/docs/policy'>الخصوصية</a> الخاصة بنا (يُشار إليها مجتمعةً بـ «الشروط»). إذا كنت لا توافق على ما نقترحه في الشروط، فيُرجى عدم استخدام أي جزء من الخدمات.
      </p>

      {/* 2 */}
      <h2>2. أهلية الاستخدام</h2>
      <p>
        الخدمات مخصصة للاستخدام من قِبل الأشخاص الذين تبلغ أعمارهم 18 عامًا أو أكثر. لا يُسمح للأشخاص دون سن 18 عامًا باستخدام الخدمات. إذا كان عمرك 18 عامًا أو أكثر، فتأكد من عدم تعليقك من الخدمات وأن استخدامك للخدمات لا ينتهك أي قانون أو لائحة. إذا كنت تستخدم الخدمات نيابةً عن شركة أو منظمة أو أي كيان قانوني آخر، فإنك تُقرّ لنا بأن لديك السلطة لإلزام هذا الكيان القانوني بهذه الشروط.
      </p>

      {/* 3 */}
      <h2>3. الحساب والتسجيل</h2>
      <p>
        أثناء استخدام الخدمات، تتاح لك إمكانية تسجيل حساب. نوصي بتسجيل حساب لأن إنشاء حساب في الخدمات يتيح الوصول إلى ميزات خاصة تتعلق بالمشاركة في الدراسات عبر الإنترنت (التجارب أو الاستطلاعات) أو إنشاء دراساتك الخاصة. عند تسجيل حساب، فإنك تُزوّدنا ببعض البيانات الشخصية كجزء من عملية التسجيل، وبعضها إلزامي لتسجيل الحساب. أنت تتعهد بأن جميع المعلومات المقدمة صحيحة وأن هذه المعلومات ستظل صحيحة ومحدّثة في المستقبل أيضًا. كما نطلب منك تعيين كلمة مرور لتأمين الحساب. أنت مسؤول عن الحفاظ على أمان كلمة مرورك وسريّتها. أنت مسؤول عن جميع الأنشطة التي تجري في حسابك. إذا اعتقدت أن أمان حسابك قد يكون قد تعرض للاختراق، فيُرجى الاتصال بنا على الفور على{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>. يمكنك أيضًا إعادة تعيين كلمة المرور على https://samply.uni-konstanz.de/researcher/forgot.
      </p>

      {/* 4 */}
      <h2>4. ترخيص استخدام الخدمات</h2>
      <p>
        طالما أنك تستمر في الالتزام بالشروط، فإننا نمنحك حق الوصول إلى الخدمات لاستخدامك الشخصي فقط. يمكنك إنشاء دراسات (يُشار إليها فيما يلي بـ «الدراسة») في الخدمات أو المشاركة في دراسات أنشأها مستخدمو Samply الآخرون (يُشار إليهم فيما يلي بـ «الباحثون»).
      </p>
      <p>يُرجى ملاحظة أن هذا الترخيص لا يشمل الحق في استخدام:</p>
      <ol>
        <li>العلامات التجارية أو الشعارات أو العلامات الظاهرة في الدراسة؛</li>
        <li>صور الأشخاص القابلين للتعرف عليهم في الدراسة؛</li>
        <li>الأعمال الفنية أو الأعمال المحمية بحقوق النشر المضمّنة في الدراسة.</li>
      </ol>

      {/* 5 */}
      <h2>5. محتوى المستخدم</h2>
      <p>أنت تملك كل محتوى المستخدم، بما في ذلك الدراسات التي تنشئها على الموقع.</p>
      <dl>
        <dt>الأحكام العامة</dt>
        <dd>
          في الخدمات، يمكنك إنشاء ونشر دراساتك، وكذلك إنشاء ونشر نصوص وصور وروابط إنترنت ومعلومات موقع ومحتوى آخر (يُشار إليه فيما يلي بـ «محتوى المستخدم»). جميع محتوى المستخدم الذي تقدمه في الخدمات يخصك أو يخص مرخصيك. نحن لا نطالب بأي حقوق ملكية لمحتوى المستخدم الخاص بك؛ فهو يخصك وحدك.
        </dd>
        <dt>ترخيص محدود</dt>
        <dd>
          بنشر دراسة، فإنك تمنحنا ترخيصًا عالميًا غير حصري ومجاني (مع الحق في الترخيص من الباطن) لاستضافة وتخزين ونقل وعرض وتوزيع (كليًا أو جزئيًا) محتوى المستخدم الخاص بك على الموقع. أنت توافق على أننا لسنا ملزمين بإجراء أي مدفوعات مقابل استخدام الدراسة وأن الدراسة ستكون متاحة للعموم دون نسبتها إلى مؤلف أو تعويض. إذا كنت لا ترغب في أن تكون دراستك متاحة للعموم، فيمكنك استخدام جميع ميزات الخدمات دون أي قيود.
        </dd>
        <dt>الإقرارات والضمانات</dt>
        <dd>
          أنت المسؤول الوحيد عن محتوى المستخدم الخاص بك وعن أي عواقب تنشأ عن إرسال أو نشر محتوى المستخدم الخاص بك في الخدمات. في كل مرة ترسل أو تنشر فيها محتوى مستخدم، فإنك تُقرّ وتضمن أن: (أ) أنت منشئ ومالك محتوى المستخدم أو تمتلك جميع الحقوق اللازمة من أشخاص أو كيانات أخرى لاستخدام محتوى المستخدم الخاص بك والسماح للمستخدمين الآخرين باستخدامه في الخدمات وفقًا لهذا البند؛ (ب) محتوى المستخدم الخاص بك لا ينتهك أو يستخدم بشكل غير مصرّح به حقوق أطراف ثالثة، بما في ذلك حقوق النشر أو حقوق الملكية الفكرية الأخرى، أو حقوق الخصوصية، أو حقوق الصورة، أو الحقوق الشخصية، ولا يُشهّر أو يفتري أو يُهين أي شخص.
        </dd>
        <dt>إخلاء المسؤولية</dt>
        <dd>
          نود إعلامك بأن مراقبة جميع محتوى المستخدم المُرسل أو المنشور في الخدمات ليس ممكنًا بشكل معقول، ولسنا ملزمين بمراقبة أو تحرير أو إدارة محتوى المستخدم الذي قد ترسله أو ينشره أنت أو المستخدمون الآخرون في الخدمات، لا تجاهك ولا تجاه المستخدمين الآخرين. وهذا يعني أننا لا نتحمل المسؤولية عن محتوى المستخدم في الخدمات وأنت توافق على عدم تقديم أي مطالبات ضدنا استنادًا إلى محتوى المستخدم. ومع ذلك، نحتفظ بالحق في إزالة أو تحرير أو فحص أو حجب محتوى المستخدم في أي وقت من الخدمات الذي نعتبره منتهكًا للشروط أو غير لائق بأي شكل آخر.
        </dd>
      </dl>

      {/* 6 */}
      <h2>6. السلوكيات المحظورة</h2>
      <p>عند استخدام الخدمات، فإنك توافق على عدم:</p>
      <ol type='a'>
        <li>استخدام الخدمات لأغراض غير قانونية أو بطريقة تنتهك أي قانون أو لائحة؛</li>
        <li>انتهاك حقوق أطراف ثالثة، بما في ذلك التعدي على حقوق الملكية الفكرية أو استخدامها بشكل غير مصرّح به، أو تشجيع الآخرين على ذلك؛</li>
        <li>إرسال أو نشر أو توزيع محتوى مستخدم غير قانوني أو تشهيري أو مضايق أو فاحش أو جنسي صريح أو إباحي أو تهديدي أو يحض على الكراهية أو غير لائق بأي شكل آخر؛</li>
        <li>التلاعب بميزات أمان الخدمات (على سبيل المثال، تعطيل أو تجاوز الميزات للوصول إلى دراسات غير علنية أو محتوى مستخدم، أو إجراء هندسة عكسية للخدمات للحصول على الشيفرة المصدرية)؛</li>
        <li>منعنا من تقديم الخدمات أو منع المستخدمين الآخرين من استخدام الخدمات (أي عدم إرسال وتوزيع فيروسات أو برامج إعلانية أو برامج تجسس، وعدم إرسال طلبات أو ترويج، وعدم جمع البيانات الشخصية لأطراف ثالثة وعدم تعطيل عمل الشبكات أو الأجهزة التي نستخدمها لتقديم الخدمات)؛</li>
        <li>الانخراط في أنشطة احتيالية، مثل انتحال شخصية شخص آخر؛</li>
        <li>الوصول إلى الخدمات عبر الروبوتات أو العناكب أو البرامج النصية أو زواحف الفهرسة أو أدوات الاستخراج أو أي أدوات أو تطبيقات آلية أخرى (باستثناء متصفحات الإنترنت وتطبيقات الهاتف المحمول الأخرى التي قد ننشرها)؛</li>
        <li>الوصول إلى الدراسات أو تنزيلها أو نسخها أو تعديلها أو توزيعها أو تنفيذها أو استخدامها لمحاكاة مظهر الموقع أو إنشاء خدمة مماثلة أو منافسة؛</li>
        <li>نقل حقك في استخدام الخدمات أو حقك في عرض المواد أو الوصول إليها أو استخدامها؛ أو</li>
        <li>محاولة القيام بأي مما سبق أو مساعدة الآخرين على القيام به.</li>
      </ol>

      {/* 7 */}
      <h2>7. خدمات الأطراف الثالثة والمواقع المرتبطة</h2>
      <p>
        في الخدمات، قد تجد أدوات تتيح لك إرسال معلومات، بما في ذلك محتوى المستخدم، إلى خدمات الأطراف الأخرى، مثل ميزة ربط الحساب بحسابات في خدمات أخرى. باستخدامك لهذه الأدوات، فإنك تأذن لنا بنقل هذه المعلومات إلى خدمات الأطراف الأخرى. كما توافق على أنه ليس لدينا أي سيطرة على كيفية استخدام الشركات الأخرى لهذه المعلومات، وبالتالي لا نتحمل أي مسؤولية في هذا الشأن. قد تجد أيضًا في الخدمات روابط إلى مواقع أخرى لا نديرها. هذه المواقع أيضًا ليست تحت سيطرتنا، لذا يُرجى استخدام تقديرك الخاص بعد مغادرة الخدمات.
      </p>

      {/* 8 */}
      <h2>8. الإنهاء الحساب</h2>
      <p>
        تنتهي صلاحية إذنك باستخدام الخدمات تلقائيًا في حالة انتهاك أي من الشروط. يمكنك إلغاء حسابك في الخدمات بإرسال بريد إلكتروني إلى{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>

      {/* 9 */}
      <h2>9. سياسة الخصوصية والمتطلبات الإضافية</h2>
      <p>
        نريدك أن تعرف ما هي المعلومات التي نجمعها منك وكيف نستخدمها. يُرجى قراءة سياسة <a href='/docs/policy'>الخصوصية</a> الخاصة بنا بعناية. سياسة الخصوصية مُدمجة في الشروط كجزء منها. قد نُعلمك أيضًا بمتطلبات إضافية يجب عليك الالتزام بها أثناء استخدامك للخدمات. أي إرشادات إضافية ننشرها في الخدمات أو نرتبط بها من الخدمات مدمجة في الشروط كجزء من هذه الاتفاقية.
      </p>

      {/* 10 */}
      <h2>10. التغييرات في الشروط</h2>
      <p>
        قد نُغيّر الشروط بإشعار مسبق مدته شهر واحد. في هذه الحالة، سنبذل جهودًا معقولة لإعلامك بالتغييرات. قد تُسلَّم هذه الإشعارات عبر نوافذ منبثقة، أو تُرسل إلى عنوان البريد الإلكتروني المرتبط بحسابك في الخدمات، أو بطرق أخرى، وسنُعلمك عندما تدخل النسخة الجديدة من الشروط حيز التنفيذ. إذا كنت لا توافق على الشروط الجديدة المقترحة، فقد نُعلّق حسابك على الفور وننهي وصولك إلى الخدمات. ستُحلّ أي نزاعات تتعلق بالخدمات وفقًا لنسخة الشروط السارية في تاريخ نشوء النزاع.
      </p>

      {/* 11 */}
      <h2>11. ملكية الخدمات</h2>
      <p>
        جميع البرامج والواجهات المرئية والرسومات والتصاميم والمعلومات والعناصر الأخرى للخدمات المُقدَّمة (يُشار إليها فيما يلي بـ «المواد») محمية بالملكية الفكرية وحقوق أخرى. نحن أو مرخصونا نملك جميع المواد المضمّنة في الخدمات ولا يجوز لك استخدام المواد بأي طريقة أخرى غير المسموح بها صراحةً في هذه الشروط.
      </p>

      {/* 12 */}
      <h2>12. إخلاء المسؤولية؛ عدم الضمان</h2>
      <p>
        نحن نقدم الخدمات وأي محتوى متاح عبر الخدمات «كما هو» و«حسب التوفر»، دون أي ضمانات صريحة أو ضمنية. إلى الحد الذي يسمح به القانون المعمول به، فإننا نتنصل صراحةً من جميع الضمانات، بما في ذلك أي ضمانات للقابلية للتسويق، والملاءمة لغرض معين، وعدم انتهاك حقوق أطراف ثالثة، والملكية، وتلك الناشئة عن مسار التعامل أو الاستخدام أو الممارسة التجارية. نحن لا نضمن ولا نُقرّ بأن الخدمات ستكون غير منقطعة أو آمنة أو خالية من الأخطاء أو خالية من المكونات الضارة، أو أن الأخطاء أو المكونات الضارة سيتم تصحيحها.
      </p>
      <p>
        باستثناء ما هو منصوص عليه في البند 13 أدناه، فإنك تستخدم الخدمات على مسؤوليتك الخاصة وتتحمل كامل مخاطر الأضرار الناتجة عن استخدامك أو وصولك إلى الخدمات، والتفاعل مع المستخدمين الآخرين للخدمات، والمحتوى المتاح عبر الخدمات.
      </p>
      <p>
        في بعض المناطق، يحظر القانون إخلاء الضمانات، وقد يكون لديك حقوق مختلفة اعتمادًا على مكان إقامتك. لا نستثني أو نُقيّد بأي حال من الأحوال مسؤوليتنا تجاهك حيثما يكون ذلك مخالفًا للقانون. في المملكة المتحدة والاتحاد الأوروبي، يشمل ذلك المسؤولية عن الوفاة أو الإصابة الشخصية الناجمة عن إهمالنا أو إهمال موظفينا أو وكلائنا أو متعاقدينا، والمسؤولية عن الاحتيال أو التضليل المتعمد، والمسؤولية عن الالتزام بتقديم الخدمات بعناية ومهارة معقولة، أو المسؤولية عن عدم تقديم الخدمات وفقًا للمعلومات المقدمة عنا أو فيما يتعلق بالخدمات.
      </p>

      {/* 13 */}
      <h2>13. الأحكام العامة</h2>
      <p>
        تُشكّل هذه الشروط والأحكام، مع سياسة الخصوصية والسياسات الأخرى المُدمجة في الشروط، الاتفاقية الكاملة بينك وبيننا فيما يتعلق باستخدامك للخدمات. باستثناء حقنا في تحديث الشروط وفقًا للبند 12 أعلاه، لا يمكن تعديل الشروط إلا باتفاقية مكتوبة موقعة من قبل الطرفين. لا يجوز لك نقل أو التنازل عن هذه الشروط لشخص أو كيان قانوني آخر أو نقل حسابك في الخدمات دون موافقتنا. ومن جانبنا، قد ننقل هذه الشروط إلى كيانات أخرى مع إشعارك أو بدون إشعار.
      </p>
      <p>
        لن تؤثر أي تأخيرات أو إخفاقات من جانبك في ممارسة حق ينشأ عن هذه الشروط والأحكام أو في طلب الامتثال لهذه الشروط على حقنا في ممارسة هذا الحق لاحقًا أو في طلب الامتثال. لن يُشكّل تنازلنا عن أي انتهاك لهذه الشروط والأحكام تنازلًا عن أي انتهاك لاحق أو عن الالتزام بالامتثال للأحكام التي انتهكتها.
      </p>
      <p>
        إذا قرر قاضٍ أو محكم أن أي جزء من هذه الشروط غير قابل للتنفيذ، فسيتم تنفيذ هذا الجزء غير القابل للتنفيذ إلى أقصى حد ممكن، وسيظل الجزء المتبقي ساري المفعول بالكامل.
      </p>

      {/* 14 */}
      <h2>14. الموافقة على الاتصالات الإلكترونية</h2>
      <p>
        أنت توافق على تلقي اتصالات إلكترونية منا كما هو موضح في سياسة الخصوصية الخاصة بنا. لفهم خياراتك بشأن سياستنا الخاصة بالاتصالات الإلكترونية، يُرجى الاطلاع على سياسة{' '}
        <a href='/docs/policy'>الخصوصية</a> الخاصة بنا. قد نُرسل إليك إشعارات ونماذج موافقة وإفصاحات واتصالات أخرى إلكترونيًا.
      </p>

      {/* 15 */}
      <h2>15. الاحتفاظ بالبيانات</h2>
      <p>
        تحتفظ Samply بسجلات قائمة انتظار الإشعارات المعلقة لمدة <strong>30 يومًا</strong>، وسجل الإشعارات (سجلات الاستجابة) لمدة{' '}
        <strong>12 شهرًا</strong>. بعد انتهاء فترات الاحتفاظ هذه، تُحذف السجلات تلقائيًا بواسطة المنصة. الباحثون مسؤولون عن تصدير بيانات البحث التي يرغبون في الاحتفاظ بها قبل انتهاء الموعد النهائي.
      </p>

      {/* 16 */}
      <h2>16. اتصل بنا</h2>
      <p>
        إذا كان لديك أي أسئلة، يُرجى التواصل معنا عبر البريد الإلكتروني على{' '}
        <a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a>.
      </p>
    </>
  );
}
