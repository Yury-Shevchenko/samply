import type { Locale } from "@/lib/i18n";

export default function PolicyContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <PolicyContentDe />;
  if (locale === "nl") return <PolicyContentNl />;
  if (locale === "ru") return <PolicyContentRu />;
  if (locale === "zh") return <PolicyContentZh />;
  if (locale === "ko") return <PolicyContentKo />;
  if (locale === "it") return <PolicyContentIt />;
  if (locale === "fr") return <PolicyContentFr />;
  if (locale === "es") return <PolicyContentEs />;
  if (locale === "pt") return <PolicyContentPt />;
  return <PolicyContentEn />;
}

function PolicyContentEn() {
  return (
    <>
      <p>
        With the following privacy policy we would like to inform you which types of your
        personal data (hereinafter also abbreviated as &quot;data&quot;) we process for which
        purposes and in which scope. The privacy statement applies to all processing of
        personal data carried out by us, both in the context of providing our services and
        in particular on our websites, in mobile applications and within external online
        presences, such as our social media profiles (hereinafter collectively referred to
        as &quot;online services&quot;).
      </p>
      <p>The terms used are not gender-specific.</p>
      <p><strong>Last update:</strong> 3 December 2024</p>

      {/* ── Controller ──────────────────────────────────────────────────────── */}
      <h2 id='m3'>Controller</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>Authorised Representatives</dt>
        <dd>Yury Shevchenko</dd>
        <dt>E-mail address</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Phone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Legal Notice</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Overview ────────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Overview of processing operations</h2>
      <p>
        The following table summarises the types of data processed, the purposes for which
        they are processed and the concerned data subjects.
      </p>
      <h3>Categories of processed data</h3>
      <ul>
        <li>Study data (e.g. text entries, images)</li>
        <li>Researcher data (e.g. name, institute, email, language)</li>
        <li>Participant data (e.g. email, timezone, time preferences, participant code)</li>
        <li>Notifications data (e.g. title, message, url, notification schedule)</li>
        <li>Notification timestamps (e.g. when a notification was received in the app, tapped in the notification bar, opened in the app, deleted, geofencing event, completion event)</li>
        <li>Meta/communication data (e.g. cookies)</li>
        <li>Contact data (e.g. e-mail, telephone numbers)</li>
      </ul>
      <h3>Categories of data subjects</h3>
      <ul>
        <li>Researchers</li>
        <li>Participants</li>
      </ul>
      <h3>Purposes of processing</h3>
      <ul>
        <li>Authentication processes</li>
        <li>Provision of our online services and usability</li>
        <li>Office and organisational procedures</li>
        <li>Feedback (e.g. collecting feedback via online form)</li>
        <li>Contact requests and communication</li>
        <li>Security measures</li>
        <li>Contractual services and support</li>
        <li>Managing and responding to inquiries</li>
      </ul>

      {/* ── Legal bases ─────────────────────────────────────────────────────── */}
      <h2 id='m13'>Legal bases for the processing</h2>
      <p>
        In the following we inform you about the legal basis of the General Data Protection
        Regulation (GDPR), on the basis of which we process personal data. Please note that,
        in addition to the regulations of the GDPR, the national data protection regulations
        may apply in your country or in our country of residence or domicile. If, in addition,
        more specific legal bases are applicable in individual cases, we will inform you of
        these in the data protection declaration.
      </p>
      <ul>
        <li><strong>Consent (Article 6 (1) (a) GDPR)</strong> — The data subject has given consent to the processing of his or her personal data for one or more specific purposes.</li>
        <li><strong>Performance of a contract and prior requests (Article 6 (1) (b) GDPR)</strong> — Performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract.</li>
        <li><strong>Compliance with a legal obligation (Article 6 (1) (c) GDPR)</strong> — Processing is necessary for compliance with a legal obligation to which the controller is subject.</li>
        <li><strong>Protection of vital interests (Article 6 (1) (d) GDPR)</strong> — Processing is necessary in order to protect the vital interests of the data subject or of another natural person.</li>
        <li><strong>Legitimate Interests (Article 6 (1) (f) GDPR)</strong> — Processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data.</li>
      </ul>
      <p>
        <strong>National data protection regulations in Germany:</strong> In addition to the
        data protection regulations of the General Data Protection Regulation, national
        regulations apply to data protection in Germany. This includes in particular the Law
        on Protection against Misuse of Personal Data in Data Processing (Federal Data
        Protection Act — BDSG). In particular, the BDSG contains special provisions on the
        right to access, the right to erase, the right to object, the processing of special
        categories of personal data, processing for other purposes and transmission as well
        as automated individual decision-making, including profiling. Furthermore, it
        regulates data processing for the purposes of the employment relationship (§ 26 BDSG),
        in particular with regard to the establishment, execution or termination of employment
        relationships as well as the consent of employees. Furthermore, data protection laws
        of the individual federal states may apply.
      </p>

      {/* ── Mobile app ──────────────────────────────────────────────────────── */}
      <h2 id='m200'>Provision of mobile application Samply Research</h2>
      <p>
        <strong>User Provided Information:</strong> The application obtains the information
        you provide when you download and register the application. Registration with us is
        mandatory in order to be able to use the basic features of the application. When you
        register with us and use the application, you provide (a) your email address and
        password; (b) your smartphone&apos;s timezone and language; (c) timestamps for the
        following events: receiving a notification in the app, tapping on the notification in
        the notification bar, opening a notification in the app, deleting a notification,
        completing a survey; (d) information you provide us when you contact us for help;
        (e) information you enter into our system when using the application, such as when
        joining a study; (f) your current location information and timestamps for geofencing
        events when using the application and when the application is closed, if you
        participate in a study that uses geofencing.
      </p>
      <p>
        <strong>Using your current location in the background:</strong> Some of the studies
        may require sending you a link to online surveys when you enter or leave a particular
        location (e.g. workplace). For this reason, if you join a study that uses this type
        of contact with participants, you will be asked to allow constant location tracking.
        If you agree, the application will continuously track your location even when the
        application is closed. The application will not share your location data with third
        party services or researchers. Your location information will be only used to trigger
        notifications with links to online surveys that are created by researchers. You can
        always enable or disable location tracking for a specific study within the
        application. If you do not want us to use your location for the above purposes, you
        should turn off the location services for the mobile application in your account
        settings or in your mobile phone settings and/or within the mobile application.
      </p>
      <p>
        <strong>Data Retention Policy, Managing Your Information:</strong> You can stop all
        collection of information by the application by deleting your account (under the menu
        item &quot;More&quot;, then &quot;Settings&quot;, then &quot;Delete my account&quot;)
        and uninstalling the application. You may use the standard uninstall processes as may
        be available as part of your mobile device or via the mobile application marketplace
        or network.
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Study data; Researcher data; Participant data; Notifications data; Notification timestamps.</dd>
        <dt>Data subjects</dt>
        <dd>Participants.</dd>
        <dt>Purposes of processing</dt>
        <dd>Authentication processes; Provision of our online services and usability; Contact requests and communication; Security measures; Managing and responding to inquiries.</dd>
        <dt>Legal basis</dt>
        <dd>Consent (Art. 6 (1) (a) GDPR); Compliance with a legal obligation (Art. 6 (1) (c) GDPR); Protection of vital interests (Art. 6 (1) (d) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Services and service providers being used:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Toolkit and platform to build a mobile application and release it to Android and iOS. Service provider: Expo. Website: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Privacy Policy: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — App store platform for mobile apps on iOS and iPadOS operating systems. Service provider: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. Website: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Privacy Policy: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — App store platform for devices running on the Android operating system and its derivatives as well as Chrome OS. Service provider: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. Website: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Privacy Policy: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Web hosting ─────────────────────────────────────────────────────── */}
      <h2 id='m225'>Provision of online services and web hosting</h2>
      <p>
        In order to provide our online services at the Samply website
        (https://samply.uni-konstanz.de/), we use the infrastructure (web server, computing
        capacity, storage space, database services, security and technical maintenance
        services) of the University of Konstanz in Germany.
      </p>
      <p>
        The data processed within the framework of the provision of the website include all
        information relating to the users of the mobile application Samply Research and the
        Samply website that is collected in the course of use and communication. Participant
        data and timestamps of notifications are stored in the secure database and are only
        accessible to the researchers of the respective study that collected this data.
        Researchers can delete this data via the Samply website interface.
      </p>
      <p>
        <strong>E-mail Sending and Hosting:</strong> The web hosting services we use also
        include sending, receiving and storing e-mails. For these purposes, the addresses of
        the recipients and senders, as well as other information relating to the sending of
        e-mails (e.g. the providers involved) and the contents of the respective e-mails are
        processed. The above data may also be processed for SPAM detection purposes. Please
        note that e-mails on the Internet are generally not sent in encrypted form. As a
        rule, e-mails are encrypted during transport, but not on the servers from which they
        are sent and received (unless a so-called end-to-end encryption method is used). We
        can therefore accept no responsibility for the transmission path of e-mails between
        the sender and reception on our server.
      </p>
      <p>
        <strong>Collection of Access Data and Log Files:</strong> We, ourselves or our web
        hosting provider, collect data on the basis of each access to the server (so-called
        server log files). Server log files may include the address and name of the web pages
        and files accessed, the date and time of access, data volumes transferred,
        notification of successful access, browser type and version, the user&apos;s
        operating system, referrer URL (the previously visited page) and, as a general rule,
        IP addresses and the requesting provider. The server log files can be used for
        security purposes, e.g. to avoid overloading the servers (especially in the case of
        abusive attacks, so-called DDoS attacks) and to ensure the stability and optimal load
        balancing of the servers.
      </p>
      <p>
        <strong>Data Retention Policy, Managing Your Information:</strong> Website users
        (researchers and participants) can manage their accounts via the Samply website
        interface. Users can delete their account using the menu item &quot;Account&quot;,
        then &quot;Delete my account&quot;.
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Study data; Researcher data; Participant data; Notifications data; Notification timestamps.</dd>
        <dt>Data subjects</dt>
        <dd>Researchers; participants.</dd>
        <dt>Purposes of processing</dt>
        <dd>Authentication processes; Provision of our online services and usability; Contact requests and communication; Security measures; Managing and responding to inquiries.</dd>
        <dt>Legal basis</dt>
        <dd>Consent (Art. 6 (1) (a) GDPR); Compliance with a legal obligation (Art. 6 (1) (c) GDPR); Protection of vital interests (Art. 6 (1) (d) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Services and service providers being used:</strong></p>
      <ul>
        <li><strong>University web server</strong> — Service provider: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. Website: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Privacy Policy: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Transactional Email Service. Service provider: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. Website: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Privacy Policy: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Security ────────────────────────────────────────────────────────── */}
      <h2 id='m27'>Security precautions</h2>
      <p>
        We take appropriate technical and organisational measures in accordance with the
        legal requirements, taking into account the state of the art, the costs of
        implementation and the nature, scope, context and purposes of processing as well as
        the risk of varying likelihood and severity for the rights and freedoms of natural
        persons, in order to ensure a level of security appropriate to the risk.
      </p>
      <p>
        The measures include, in particular, safeguarding the confidentiality, integrity and
        availability of data by controlling physical and electronic access to the data as
        well as access to, input, transmission, securing and separation of the data. In
        addition, we have established procedures to ensure that data subjects&apos; rights
        are respected, that data is erased, and that we are prepared to respond to data
        threats rapidly. Furthermore, we take the protection of personal data into account as
        early as the development or selection of hardware, software and service providers, in
        accordance with the principle of privacy by design and privacy by default.
      </p>
      <p>
        <strong>Masking of the IP address:</strong> In general, the IP addresses of
        researchers and participants are not recorded and stored. In the event that this
        should happen in the future, we will shorten your IP address or have it shortened.
        When the IP address is shortened, also known as &quot;IP masking&quot;, the last
        octet, i.e. the last two numbers of an IP address, is deleted. With the shortening
        of the IP address, the identification of a person on the basis of their IP address
        is to be prevented or made considerably more difficult.
      </p>
      <p>
        <strong>SSL encryption (https):</strong> In order to protect your data transmitted
        via our online services in the best possible way, we use SSL encryption. You can
        recognize such encrypted connections by the prefix https:// in the address bar of
        your browser.
      </p>

      {/* ── Transmission ────────────────────────────────────────────────────── */}
      <h2 id='m25'>Transmission and disclosure of personal data</h2>
      <p>
        In the context of our processing of personal data, it may happen that the data is
        transferred to other places, companies or persons or that it is disclosed to them.
        Recipients of this data may include, for example, payment institutions within the
        context of payment transactions, service providers commissioned with IT tasks or
        providers of services and content that are embedded in a website. In such a case, the
        legal requirements will be respected and in particular corresponding contracts or
        agreements, which serve the protection of your data, will be concluded with the
        recipients of your data.
      </p>

      {/* ── Third countries ─────────────────────────────────────────────────── */}
      <h2 id='m24'>Data processing in third countries</h2>
      <p>
        If we process data in a third country (i.e. outside the European Union (EU), the
        European Economic Area (EEA)) or the processing takes place in the context of the
        use of third party services or disclosure or transfer of data to other persons,
        bodies or companies, this will only take place in accordance with the legal
        requirements.
      </p>
      <p>
        Subject to express consent or transfer required by contract or law, we process or
        have processed the data only in third countries with a recognised level of data
        protection, on the basis of special guarantees, such as a contractual obligation
        through so-called standard protection clauses of the EU Commission or if
        certifications or binding internal data protection regulations justify the processing
        (Article 44 to 49 GDPR).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Use of cookies</h2>
      <p>
        We do not use third-party cookies or cookies for statistics, marketing and
        personalisation. We only use necessary (essential) cookies that are required for the
        operation of a website (e.g. user authentication).
      </p>
      <p>
        Cookies are text files that contain data from visited websites or domains and are
        stored by a browser on the user&apos;s computer. A cookie is primarily used to store
        information about a user during or after his visit within an online service. The
        information stored can include, for example, the language settings on a website, the
        login status, a shopping basket or the location where a video was viewed.
      </p>
      <p><strong>The following types and functions of cookies are distinguished:</strong></p>
      <ul>
        <li><strong>Temporary cookies (also: session cookies):</strong> Temporary cookies are deleted at the latest after a user has left an online service and closed his browser.</li>
        <li><strong>Permanent cookies:</strong> Permanent cookies remain stored even after closing the browser. For example, the login status can be saved or preferred content can be displayed directly when the user visits a website again.</li>
        <li><strong>First-party cookies:</strong> First-party cookies are set by ourselves.</li>
        <li><strong>Third-party cookies:</strong> Third-party cookies are mainly used by advertisers (so-called third parties) to process user information.</li>
        <li><strong>Necessary (also: essential) cookies:</strong> Cookies can be necessary for the operation of a website (e.g. to save logins or other user inputs or for security reasons).</li>
        <li><strong>Statistics, marketing and personalisation cookies:</strong> Cookies are also generally used to measure a website&apos;s reach and when a user&apos;s interests or behaviour are stored in a user profile. Such profiles are used, for example, to display content to users that corresponds to their potential interests.</li>
      </ul>
      <p>
        <strong>Information on legal basis:</strong> The legal basis on which we process
        your personal data with the help of cookies depends on whether we ask you for your
        consent. If this applies and you consent to the use of cookies, the legal basis for
        processing your data is your declared consent. Otherwise, the data processed with the
        help of cookies will be processed on the basis of our legitimate interests (e.g. in a
        business operation of our online service and its improvement) or, if the use of
        cookies is necessary to fulfill our contractual obligations.
      </p>
      <p>
        <strong>Retention period:</strong> Unless we provide you with explicit information on
        the retention period of permanent cookies, please assume that the retention period can
        be as long as two years.
      </p>
      <p>
        <strong>General information on withdrawal of consent and objection (opt-out):</strong>{' '}
        You have the option at any time to object to the processing of your data using cookie
        technologies or to revoke consent. You can initially explain your objection using the
        settings of your browser, e.g. by deactivating the use of cookies (which may also
        restrict the functionality of our online services). An objection to the use of
        cookies for online marketing purposes can be raised for a large number of services,
        especially in the case of tracking, via the websites{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        and{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Meta/communication data (e.g. cookies).</dd>
        <dt>Data subjects</dt>
        <dd>Researchers; participants.</dd>
        <dt>Legal basis</dt>
        <dd>Consent (Art. 6 (1) (a) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Commercial services ─────────────────────────────────────────────── */}
      <h2 id='m317'>Commercial services</h2>
      <p>
        The following information on commercial services only applies to researchers who wish
        to pay participants via the integration of the Samply platform with Stripe.
      </p>
      <p>
        We process data of our contractual and business partners, e.g. customers and
        interested parties (collectively referred to as &quot;contractual partners&quot;)
        within the context of contractual and comparable legal relationships as well as
        associated actions and communication with the contractual partners or
        pre-contractually, e.g. to answer inquiries.
      </p>
      <p>
        We process this data in order to fulfil our contractual obligations, safeguard our
        rights and for the purposes of the administrative tasks associated with this data and
        the business-related organisation. We will only pass on the data of the contractual
        partners within the scope of the applicable law to third parties insofar as this is
        necessary for the aforementioned purposes or for the fulfilment of legal obligations
        or with the consent of data subjects concerned.
      </p>
      <p>
        We delete the data after expiry of statutory warranty and comparable obligations,
        i.e. in principle after expiry of 4 years, unless the data is stored in a customer
        account or must be kept for legal reasons of archiving (e.g. as a rule 10 years for
        tax purposes).
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Researcher data (e.g. name, institute, email, language); Participant data (e.g. email, timezone, time preferences, participant code).</dd>
        <dt>Data subjects</dt>
        <dd>Researchers; participants.</dd>
        <dt>Purposes of processing</dt>
        <dd>Contractual services and support; Contact requests and communication; Office and organisational procedures; Managing and responding to inquiries; Security measures.</dd>
        <dt>Legal basis</dt>
        <dd>Performance of a contract and prior requests (Art. 6 (1) (b) GDPR); Compliance with a legal obligation (Art. 6 (1) (c) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Services and service providers being used:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Payment processing platform. Service provider: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. Website: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Privacy Policy: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Registration ────────────────────────────────────────────────────── */}
      <h2 id='m367'>Registration, login and user account</h2>
      <p>
        Users can create a user account. Within the scope of registration, the required
        mandatory information is communicated to the users and processed for the purposes of
        providing the user account on the basis of contractual fulfilment of obligations. The
        processed data includes in particular the login information (name, password and an
        e-mail address).
      </p>
      <p>
        Users may be informed by e-mail of information relevant to their user account, such
        as technical changes. If users have terminated their user account, their data will be
        deleted with regard to the user account, subject to a statutory retention obligation.
        It is the responsibility of the users to secure their data before the end of the
        contract in the event of termination. We are entitled to irretrievably delete all
        user data stored during the term of the contract.
      </p>
      <p>
        Within the scope of using our registration and login functions as well as the use of
        the user account, we store the IP address and the time of the respective user action.
        The storage is based on our legitimate interests, as well as the user&apos;s
        protection against misuse and other unauthorized use. This data will not be passed on
        to third parties unless it is necessary to pursue our claims or there is a legal
        obligation to do so.
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Researcher data (e.g. name, email); Participant data (e.g. email).</dd>
        <dt>Data subjects</dt>
        <dd>Researchers; participants.</dd>
        <dt>Purposes of processing</dt>
        <dd>Contractual services and support; Security measures; Managing and responding to inquiries.</dd>
        <dt>Legal basis</dt>
        <dd>Consent (Art. 6 (1) (a) GDPR); Performance of a contract and prior requests (Art. 6 (1) (b) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Contacting us ───────────────────────────────────────────────────── */}
      <h2 id='m182'>Contacting us</h2>
      <p>
        When contacting us (e.g. by contact form, e-mail, telephone or via social media),
        the data of the inquiring persons are processed insofar as this is necessary to
        answer the contact enquiries and any requested activities.
      </p>
      <p>
        The response to contact enquiries within the framework of contractual or
        pre-contractual relationships is made in order to fulfil our contractual obligations
        or to respond to (pre)contractual enquiries and otherwise on the basis of the
        legitimate interests in responding to the enquiries.
      </p>
      <dl>
        <dt>Processed data types</dt>
        <dd>Contact data (e.g. e-mail, telephone numbers).</dd>
        <dt>Data subjects</dt>
        <dd>Researchers; participants.</dd>
        <dt>Purposes of processing</dt>
        <dd>Contact requests and communication.</dd>
        <dt>Legal basis</dt>
        <dd>Performance of a contract and prior requests (Art. 6 (1) (b) GDPR); Legitimate Interests (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Erasure ─────────────────────────────────────────────────────────── */}
      <h2 id='m12'>Erasure of data</h2>
      <p>
        The data processed by us will be erased in accordance with the statutory provisions
        as soon as their processing is revoked or other permissions no longer apply (e.g. if
        the purpose of processing this data no longer applies or they are not required for
        the purpose).
      </p>
      <p>
        If the data is not deleted because they are required for other and legally permissible
        purposes, their processing is limited to these purposes. This means that the data will
        be restricted and not processed for other purposes. This applies, for example, to data
        that must be stored for commercial or tax reasons or for which storage is necessary to
        assert, exercise or defend legal claims or to protect the rights of another natural or
        legal person.
      </p>

      {/* ── Changes ─────────────────────────────────────────────────────────── */}
      <h2 id='m15'>Changes and updates to the privacy policy</h2>
      <p>
        We kindly ask you to inform yourself regularly about the contents of our data
        protection declaration. We will adjust the privacy policy as changes in our data
        processing practices make this necessary. We will inform you as soon as the changes
        require your cooperation (e.g. consent) or other individual notification.
      </p>
      <p>
        If we provide addresses and contact information of companies and organizations in
        this privacy policy, we ask you to note that addresses may change over time and to
        verify the information before contacting us.
      </p>

      {/* ── Rights ──────────────────────────────────────────────────────────── */}
      <h2 id='m10'>Rights of data subjects</h2>
      <p>
        As data subject, you are entitled to various rights under the GDPR, which arise in
        particular from Articles 15 to 21 of the GDPR:
      </p>
      <ul>
        <li><strong>Right to Object:</strong> You have the right, on grounds arising from your particular situation, to object at any time to the processing of your personal data which is based on letter (e) or (f) of Article 6(1) GDPR, including profiling based on those provisions.</li>
        <li><strong>Right of withdrawal for consents:</strong> You have the right to revoke consents at any time.</li>
        <li><strong>Right of access:</strong> You have the right to request confirmation as to whether the data in question will be processed and to be informed of this data and to receive further information and a copy of the data in accordance with the provisions of the law.</li>
        <li><strong>Right to rectification:</strong> You have the right, in accordance with the law, to request the completion of the data concerning you or the rectification of the incorrect data concerning you.</li>
        <li><strong>Right to Erasure and Right to Restriction of Processing:</strong> In accordance with the statutory provisions, you have the right to demand that the relevant data be erased immediately or, alternatively, to demand that the processing of the data be restricted in accordance with the statutory provisions.</li>
        <li><strong>Right to data portability:</strong> You have the right to receive data concerning you which you have provided to us in a structured, common and machine-readable format in accordance with the legal requirements, or to request its transmission to another controller.</li>
        <li><strong>Complaint to the supervisory authority:</strong> You also have the right, under the conditions laid down by law, to lodge a complaint with a supervisory authority, in particular in the Member State of your habitual residence, place of work or place of the alleged infringement if you consider that the processing of personal data relating to you infringes the GDPR.</li>
      </ul>

      {/* ── Definitions ─────────────────────────────────────────────────────── */}
      <h2 id='m42'>Terminology and definitions</h2>
      <p>
        This section provides an overview of the terms used in this privacy policy. Many of
        the terms are drawn from the law and defined mainly in Article 4 GDPR. The following
        explanations are intended above all for the purpose of comprehension.
      </p>
      <dl>
        <dt>Controller</dt>
        <dd>&quot;Controller&quot; means the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.</dd>
        <dt>Personal Data</dt>
        <dd>&quot;Personal data&quot; means any information relating to an identified or identifiable natural person (&quot;data subject&quot;); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.</dd>
        <dt>Processing</dt>
        <dd>The term &quot;processing&quot; covers a wide range and practically every handling of data, be it collection, evaluation, storage, transmission or erasure.</dd>
        <dt>Remarketing</dt>
        <dd>&quot;Remarketing&quot; or &quot;retargeting&quot; is the term used, for example, to indicate for advertising purposes which products a user is interested in on a website in order to remind the user of these products on other websites, e.g. in advertisements.</dd>
        <dt>Tracking</dt>
        <dd>&quot;Tracking&quot; is the term used when the behaviour of users can be traced across several websites. As a rule, behavior and interest information with regard to the websites used is stored in cookies or on the servers of the tracking technology providers (so-called profiling).</dd>
        <dt>Web Analytics</dt>
        <dd>Web Analytics serves the evaluation of visitor traffic of online services and can determine their behavior or interests in certain information, such as content of websites. With the help of web analytics, website owners can recognise at what time visitors visit their website and what content they are interested in.</dd>
      </dl>
    </>
  );
}

function PolicyContentNl() {
  return (
    <>
      <p>
        Met de volgende privacyverklaring informeren wij u over welke soorten
        persoonsgegevens (hierna ook verkort aangeduid als &quot;gegevens&quot;) wij voor
        welke doeleinden en in welke omvang verwerken. De privacyverklaring is van toepassing
        op alle verwerkingen van persoonsgegevens die door ons worden uitgevoerd, zowel in
        het kader van het verlenen van onze diensten als met name op onze websites, in
        mobiele applicaties en binnen externe onlineaanwezigheid, zoals onze
        sociale-mediaprofielen (hierna gezamenlijk aangeduid als &quot;onlinediensten&quot;).
      </p>
      <p>De gebruikte begrippen zijn niet geslachtsspecifiek.</p>
      <p><strong>Laatste update:</strong> 3 december 2024</p>

      {/* ── Verwerkingsverantwoordelijke ────────────────────────────────────── */}
      <h2 id='m3'>Verwerkingsverantwoordelijke</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>Gemachtigde vertegenwoordigers</dt>
        <dd>Yury Shevchenko</dd>
        <dt>E-mailadres</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Telefoon</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Wettelijke mededeling</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Overzicht ───────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Overzicht van verwerkingsactiviteiten</h2>
      <p>
        De onderstaande tabel geeft een overzicht van de categorieën verwerkte gegevens, de
        doeleinden waarvoor zij worden verwerkt en de betrokken betrokkenen.
      </p>
      <h3>Categorieën verwerkte gegevens</h3>
      <ul>
        <li>Studiegegevens (bijv. tekstinvoer, afbeeldingen)</li>
        <li>Onderzoekergegevens (bijv. naam, instituut, e-mail, taal)</li>
        <li>Deelnemersgegevens (bijv. e-mail, tijdzone, tijdvoorkeuren, deelnemerscode)</li>
        <li>Notificatiegegevens (bijv. titel, bericht, URL, notificatieschema)</li>
        <li>Notificatietijdstempels (bijv. wanneer een notificatie in de app is ontvangen, aangetikt in de notificatiebalk, geopend in de app, verwijderd, geofencing-gebeurtenis, voltooiingsgebeurtenis)</li>
        <li>Meta-/communicatiegegevens (bijv. cookies)</li>
        <li>Contactgegevens (bijv. e-mail, telefoonnummers)</li>
      </ul>
      <h3>Categorieën betrokkenen</h3>
      <ul>
        <li>Onderzoekers</li>
        <li>Deelnemers</li>
      </ul>
      <h3>Verwerkingsdoeleinden</h3>
      <ul>
        <li>Authenticatieprocessen</li>
        <li>Verstrekking van onze onlinediensten en gebruiksvriendelijkheid</li>
        <li>Kantoor- en organisatorische procedures</li>
        <li>Feedback (bijv. verzamelen van feedback via een onlineformulier)</li>
        <li>Contactverzoeken en communicatie</li>
        <li>Beveiligingsmaatregelen</li>
        <li>Contractuele diensten en ondersteuning</li>
        <li>Beheren en beantwoorden van verzoeken</li>
      </ul>

      {/* ── Rechtsgrondslag ─────────────────────────────────────────────────── */}
      <h2 id='m13'>Rechtsgrondslag voor de verwerking</h2>
      <p>
        Hieronder informeren wij u over de rechtsgrondslag van de Algemene verordening
        gegevensbescherming (AVG) op basis waarvan wij persoonsgegevens verwerken. Houd er
        rekening mee dat naast de bepalingen van de AVG ook nationale
        gegevensbeschermingsregels in uw land of ons land van verblijf of vestiging van
        toepassing kunnen zijn. Indien in afzonderlijke gevallen ook meer specifieke
        rechtsgrondslagen van toepassing zijn, zullen wij u hierover informeren in de
        privacyverklaring.
      </p>
      <ul>
        <li><strong>Toestemming (Art. 6 (1) (a) AVG)</strong> — De betrokkene heeft toestemming gegeven voor de verwerking van zijn of haar persoonsgegevens voor een of meer specifieke doeleinden.</li>
        <li><strong>Uitvoering van een overeenkomst en precontractuele verzoeken (Art. 6 (1) (b) AVG)</strong> — De verwerking is noodzakelijk voor de uitvoering van een overeenkomst waarbij de betrokkene partij is, of om op verzoek van de betrokkene stappen te ondernemen vóór het sluiten van een overeenkomst.</li>
        <li><strong>Nakoming van een wettelijke verplichting (Art. 6 (1) (c) AVG)</strong> — De verwerking is noodzakelijk om te voldoen aan een wettelijke verplichting die op de verwerkingsverantwoordelijke rust.</li>
        <li><strong>Bescherming van vitale belangen (Art. 6 (1) (d) AVG)</strong> — De verwerking is noodzakelijk om de vitale belangen van de betrokkene of van een andere natuurlijke persoon te beschermen.</li>
        <li><strong>Gerechtvaardigde belangen (Art. 6 (1) (f) AVG)</strong> — De verwerking is noodzakelijk voor de behartiging van de gerechtvaardigde belangen van de verwerkingsverantwoordelijke of van een derde, behalve wanneer de belangen of de grondrechten en fundamentele vrijheden van de betrokkene die bescherming van persoonsgegevens vereisen, zwaarder wegen dan die belangen.</li>
      </ul>
      <p>
        <strong>Nationale gegevensbeschermingsregelgeving in Duitsland:</strong> Naast de
        gegevensbeschermingsbepalingen van de AVG zijn in Duitsland nationale
        gegevensbeschermingsregels van toepassing. Dit omvat met name de wet ter bescherming
        tegen misbruik van persoonsgegevens bij gegevensverwerking (Bondswet bescherming
        persoonsgegevens — BDSG). De BDSG bevat met name bijzondere bepalingen over het
        recht op inzage, het recht op wissing, het recht van bezwaar, de verwerking van
        bijzondere categorieën persoonsgegevens, verwerking voor andere doeleinden en
        doorgifte, alsook geautomatiseerde individuele besluitvorming, waaronder profilering.
        Voorts regelt het de gegevensverwerking voor arbeidsgerelateerde doeleinden (§ 26
        BDSG), met name wat betreft het aangaan, uitvoeren of beëindigen van
        arbeidsrelaties en de toestemming van werknemers. Bovendien kunnen de
        gegevensbeschermingswetten van de afzonderlijke deelstaten van toepassing zijn.
      </p>

      {/* ── Mobiele app ─────────────────────────────────────────────────────── */}
      <h2 id='m200'>Verstrekking van de mobiele applicatie Samply Research</h2>
      <p>
        <strong>Door de gebruiker verstrekte informatie:</strong> De applicatie verkrijgt de
        informatie die u verstrekt wanneer u de applicatie downloadt en registreert.
        Registratie bij ons is verplicht om de basisfuncties van de applicatie te kunnen
        gebruiken. Wanneer u zich bij ons registreert en de applicatie gebruikt, verstrekt u
        (a) uw e-mailadres en wachtwoord; (b) de tijdzone en taal van uw smartphone;
        (c) tijdstempels voor de volgende gebeurtenissen: het ontvangen van een notificatie
        in de app, het tikken op de notificatie in de notificatiebalk, het openen van een
        notificatie in de app, het verwijderen van een notificatie, het voltooien van een
        enquête; (d) informatie die u ons verstrekt wanneer u contact met ons opneemt voor
        hulp; (e) informatie die u in ons systeem invoert bij gebruik van de applicatie,
        zoals bij het deelnemen aan een studie; (f) uw huidige locatiegegevens en
        tijdstempels voor geofencing-gebeurtenissen bij gebruik van de applicatie en wanneer
        de applicatie is gesloten, indien u deelneemt aan een studie die gebruikmaakt van
        geofencing.
      </p>
      <p>
        <strong>Gebruik van uw huidige locatie op de achtergrond:</strong> Sommige studies
        kunnen vereisen dat u een link naar online-enquêtes wordt gestuurd wanneer u een
        bepaalde locatie (bijv. uw werkplek) betreedt of verlaat. Om deze reden zult u,
        indien u deelneemt aan een studie die dit type contact met deelnemers gebruikt,
        worden gevraagd permanente locatietracking toe te staan. Als u akkoord gaat, zal de
        applicatie uw locatie continu bijhouden, ook wanneer de applicatie is gesloten. De
        applicatie deelt uw locatiegegevens niet met diensten van derden of onderzoekers. Uw
        locatiegegevens worden uitsluitend gebruikt om notificaties met links naar
        online-enquêtes die door onderzoekers zijn aangemaakt te activeren. U kunt de
        locatietracking voor een specifieke studie altijd in- of uitschakelen in de
        applicatie. Als u niet wilt dat wij uw locatie voor bovengenoemde doeleinden
        gebruiken, dient u de locatiediensten voor de mobiele applicatie uit te schakelen in
        uw accountinstellingen of in de instellingen van uw mobiele telefoon en/of binnen de
        mobiele applicatie.
      </p>
      <p>
        <strong>Beleid voor gegevensbewaring, beheer van uw informatie:</strong> U kunt
        alle gegevensverzameling door de applicatie stoppen door uw account te verwijderen
        (via het menu-item &quot;Meer&quot;, vervolgens &quot;Instellingen&quot;, vervolgens
        &quot;Mijn account verwijderen&quot;) en de applicatie te verwijderen. U kunt
        gebruikmaken van de standaard verwijderingsprocessen die beschikbaar zijn op uw
        mobiele apparaat of via de marktplaats of het netwerk van mobiele applicaties.
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Studiegegevens; Onderzoekergegevens; Deelnemersgegevens; Notificatiegegevens; Notificatietijdstempels.</dd>
        <dt>Betrokkenen</dt>
        <dd>Deelnemers.</dd>
        <dt>Verwerkingsdoeleinden</dt>
        <dd>Authenticatieprocessen; Verstrekking van onze onlinediensten en gebruiksvriendelijkheid; Contactverzoeken en communicatie; Beveiligingsmaatregelen; Beheren en beantwoorden van verzoeken.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Toestemming (Art. 6 (1) (a) AVG); Nakoming van een wettelijke verplichting (Art. 6 (1) (c) AVG); Bescherming van vitale belangen (Art. 6 (1) (d) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>
      <p><strong>Gebruikte diensten en dienstverleners:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Toolkit en platform voor het bouwen en uitbrengen van een mobiele applicatie voor Android en iOS. Dienstverlener: Expo. Website: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Privacybeleid: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — App-store-platform voor mobiele apps op de iOS- en iPadOS-besturingssystemen. Dienstverlener: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. Website: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Privacybeleid: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — App-store-platform voor apparaten met het Android-besturingssysteem en zijn afgeleiden, alsmede Chrome OS. Dienstverlener: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. Website: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Privacybeleid: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Webhosting ──────────────────────────────────────────────────────── */}
      <h2 id='m225'>Verstrekking van onlinediensten en webhosting</h2>
      <p>
        Voor het verlenen van onze onlinediensten op de Samply-website
        (https://samply.uni-konstanz.de/) maken wij gebruik van de infrastructuur (webserver,
        rekencapaciteit, opslagruimte, databasediensten, beveiligings- en technische
        onderhoudsdiensten) van de University of Konstanz in Duitsland.
      </p>
      <p>
        De gegevens die worden verwerkt in het kader van de verstrekking van de website
        omvatten alle informatie over de gebruikers van de mobiele applicatie Samply Research
        en de Samply-website die tijdens gebruik en communicatie wordt verzameld.
        Deelnemersgegevens en tijdstempels van notificaties worden opgeslagen in de beveiligde
        database en zijn uitsluitend toegankelijk voor de onderzoekers van de betreffende
        studie die deze gegevens heeft verzameld. Onderzoekers kunnen deze gegevens verwijderen
        via de interface van de Samply-website.
      </p>
      <p>
        <strong>E-mailverzending en -hosting:</strong> De webhostingdiensten die wij gebruiken
        omvatten ook het verzenden, ontvangen en opslaan van e-mails. Voor deze doeleinden
        worden de adressen van ontvangers en afzenders, alsmede andere informatie met
        betrekking tot het verzenden van e-mails (bijv. de betrokken providers) en de inhoud
        van de betreffende e-mails verwerkt. De bovengenoemde gegevens kunnen ook worden
        verwerkt voor SPAM-detectiedoeleinden. Houd er rekening mee dat e-mails op het
        internet over het algemeen niet versleuteld worden verzonden. E-mails worden in de
        regel tijdens het transport versleuteld, maar niet op de servers van waaraf zij worden
        verzonden en ontvangen (tenzij een zogenaamde end-to-endversleuteling wordt gebruikt).
        Wij kunnen derhalve geen verantwoordelijkheid aanvaarden voor het transmissiepad van
        e-mails tussen de afzender en ontvangst op onze server.
      </p>
      <p>
        <strong>Verzameling van toegangsgegevens en logbestanden:</strong> Wij zelf of onze
        webhostingprovider verzamelen gegevens op basis van elke toegang tot de server
        (zogenaamde serverlogbestanden). Serverlogbestanden kunnen het adres en de naam van
        de bezochte webpagina&apos;s en bestanden bevatten, de datum en het tijdstip van
        toegang, overgedragen gegevensvolumes, melding van geslaagde toegang, browsertype en
        -versie, het besturingssysteem van de gebruiker, verwijzende URL (de eerder bezochte
        pagina) en in de regel IP-adressen en de verzoekende provider. De serverlogbestanden
        kunnen worden gebruikt voor beveiligingsdoeleinden, bijv. om overbelasting van de
        servers te voorkomen (met name bij kwaadwillige aanvallen, zogenaamde
        DDoS-aanvallen) en om de stabiliteit en optimale taakverdeling van de servers te
        waarborgen.
      </p>
      <p>
        <strong>Beleid voor gegevensbewaring, beheer van uw informatie:</strong>{' '}
        Websitegebruikers (onderzoekers en deelnemers) kunnen hun accounts beheren via de
        interface van de Samply-website. Gebruikers kunnen hun account verwijderen via het
        menu-item &quot;Account&quot;, vervolgens &quot;Mijn account verwijderen&quot;.
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Studiegegevens; Onderzoekergegevens; Deelnemersgegevens; Notificatiegegevens; Notificatietijdstempels.</dd>
        <dt>Betrokkenen</dt>
        <dd>Onderzoekers; deelnemers.</dd>
        <dt>Verwerkingsdoeleinden</dt>
        <dd>Authenticatieprocessen; Verstrekking van onze onlinediensten en gebruiksvriendelijkheid; Contactverzoeken en communicatie; Beveiligingsmaatregelen; Beheren en beantwoorden van verzoeken.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Toestemming (Art. 6 (1) (a) AVG); Nakoming van een wettelijke verplichting (Art. 6 (1) (c) AVG); Bescherming van vitale belangen (Art. 6 (1) (d) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>
      <p><strong>Gebruikte diensten en dienstverleners:</strong></p>
      <ul>
        <li><strong>University web server</strong> — Dienstverlener: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. Website: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Privacybeleid: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Transactionele e-maildienst. Dienstverlener: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. Website: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Privacybeleid: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Beveiliging ─────────────────────────────────────────────────────── */}
      <h2 id='m27'>Beveiligingsmaatregelen</h2>
      <p>
        Wij nemen passende technische en organisatorische maatregelen in overeenstemming met
        de wettelijke vereisten, rekening houdend met de stand van de techniek, de kosten van
        implementatie en de aard, omvang, context en doeleinden van verwerking, alsmede de
        risico&apos;s van uiteenlopende waarschijnlijkheid en ernst voor de rechten en
        vrijheden van natuurlijke personen, teneinde een beveiligingsniveau te waarborgen dat
        passend is voor het risico.
      </p>
      <p>
        De maatregelen omvatten met name de beveiliging van de vertrouwelijkheid, integriteit
        en beschikbaarheid van gegevens door controle van de fysieke en elektronische toegang
        tot de gegevens, alsmede toegang tot, invoer, doorgifte, beveiliging en scheiding van
        de gegevens. Daarnaast hebben wij procedures vastgesteld om te waarborgen dat de
        rechten van betrokkenen worden gerespecteerd, dat gegevens worden gewist en dat wij
        voorbereid zijn om snel te reageren op bedreigingen van gegevens. Voorts houden wij
        reeds bij de ontwikkeling of selectie van hardware, software en dienstverleners
        rekening met de bescherming van persoonsgegevens, overeenkomstig het beginsel van
        privacy by design en privacy by default.
      </p>
      <p>
        <strong>Maskering van het IP-adres:</strong> In het algemeen worden de IP-adressen van
        onderzoekers en deelnemers niet geregistreerd en opgeslagen. In het geval dat dit in
        de toekomst wel zou gebeuren, zullen wij uw IP-adres inkorten of laten inkorten. Bij
        het inkorten van het IP-adres, ook bekend als &quot;IP-masking&quot;, wordt het
        laatste octet, d.w.z. de laatste twee cijfers van een IP-adres, verwijderd. Met het
        inkorten van het IP-adres wordt beoogd de identificatie van een persoon op basis van
        hun IP-adres te voorkomen of aanzienlijk te bemoeilijken.
      </p>
      <p>
        <strong>SSL-versleuteling (https):</strong> Om uw gegevens die via onze onlinediensten
        worden verzonden optimaal te beschermen, maken wij gebruik van SSL-versleuteling. U
        herkent dergelijke versleutelde verbindingen aan het voorvoegsel https:// in de
        adresbalk van uw browser.
      </p>

      {/* ── Doorgifte ───────────────────────────────────────────────────────── */}
      <h2 id='m25'>Doorgifte en openbaarmaking van persoonsgegevens</h2>
      <p>
        In het kader van onze verwerking van persoonsgegevens kan het voorkomen dat de
        gegevens worden doorgegeven aan andere plaatsen, bedrijven of personen of aan hen
        worden bekendgemaakt. Ontvangers van deze gegevens kunnen bijvoorbeeld
        betalingsinstellingen zijn in het kader van betalingstransacties, dienstverleners
        belast met IT-taken of aanbieders van diensten en inhoud die zijn geïntegreerd in een
        website. In een dergelijk geval worden de wettelijke vereisten nageleefd en worden in
        het bijzonder overeenkomsten of afspraken gesloten met de ontvangers van uw gegevens,
        die dienen ter bescherming van uw gegevens.
      </p>

      {/* ── Derde landen ────────────────────────────────────────────────────── */}
      <h2 id='m24'>Gegevensverwerking in derde landen</h2>
      <p>
        Indien wij gegevens verwerken in een derde land (d.w.z. buiten de Europese Unie (EU),
        de Europese Economische Ruimte (EER)) of de verwerking plaatsvindt in het kader van
        het gebruik van diensten van derden of openbaarmaking of doorgifte van gegevens aan
        andere personen, instanties of bedrijven, geschiedt dit uitsluitend in overeenstemming
        met de wettelijke vereisten.
      </p>
      <p>
        Behoudens uitdrukkelijke toestemming of overdracht op grond van contract of wet,
        verwerken wij de gegevens of laten wij ze uitsluitend verwerken in derde landen met
        een erkend niveau van gegevensbescherming, op basis van bijzondere garanties, zoals
        een contractuele verplichting door middel van zogenaamde standaardbepalingen van de
        Europese Commissie of indien certificeringen of bindende interne
        gegevensbeschermingsregels de verwerking rechtvaardigen (Artikelen 44 tot 49 AVG).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Gebruik van cookies</h2>
      <p>
        Wij maken geen gebruik van cookies van derden of cookies voor statistieken, marketing
        en personalisatie. Wij gebruiken uitsluitend noodzakelijke (essentiële) cookies die
        vereist zijn voor de werking van een website (bijv. gebruikersauthenticatie).
      </p>
      <p>
        Cookies zijn tekstbestanden die gegevens bevatten van bezochte websites of domeinen
        en door een browser worden opgeslagen op de computer van de gebruiker. Een cookie
        wordt voornamelijk gebruikt om informatie over een gebruiker op te slaan tijdens of
        na zijn bezoek aan een onlinedienst. De opgeslagen informatie kan bijvoorbeeld de
        taalinstellingen op een website, de inlogstatus, een winkelwagentje of de locatie
        waar een video is bekeken bevatten.
      </p>
      <p><strong>De volgende soorten en functies van cookies worden onderscheiden:</strong></p>
      <ul>
        <li><strong>Tijdelijke cookies (ook: sessiecookies):</strong> Tijdelijke cookies worden uiterlijk verwijderd nadat een gebruiker een onlinedienst heeft verlaten en zijn browser heeft gesloten.</li>
        <li><strong>Permanente cookies:</strong> Permanente cookies blijven opgeslagen ook na het sluiten van de browser. Zo kan bijvoorbeeld de inlogstatus worden opgeslagen of kan voorkeursinhoud direct worden weergegeven wanneer de gebruiker een website opnieuw bezoekt.</li>
        <li><strong>Eigen cookies (first-party cookies):</strong> Eigen cookies worden door ons zelf ingesteld.</li>
        <li><strong>Cookies van derden (third-party cookies):</strong> Cookies van derden worden hoofdzakelijk gebruikt door adverteerders (zogenaamde derden) om gebruikersinformatie te verwerken.</li>
        <li><strong>Noodzakelijke (ook: essentiële) cookies:</strong> Cookies kunnen noodzakelijk zijn voor de werking van een website (bijv. om inloggegevens of andere gebruikersinvoer op te slaan of om veiligheidsredenen).</li>
        <li><strong>Statistiek-, marketing- en personalisatiecookies:</strong> Cookies worden ook over het algemeen gebruikt om het bereik van een website te meten en wanneer de interesses of het gedrag van een gebruiker in een gebruikersprofiel worden opgeslagen. Dergelijke profielen worden bijvoorbeeld gebruikt om gebruikers inhoud te tonen die overeenkomt met hun potentiële interesses.</li>
      </ul>
      <p>
        <strong>Informatie over de rechtsgrondslag:</strong> De rechtsgrondslag op basis
        waarvan wij uw persoonsgegevens verwerken met behulp van cookies is afhankelijk van
        of wij u om uw toestemming vragen. Indien dit het geval is en u instemt met het
        gebruik van cookies, is de rechtsgrondslag voor de verwerking van uw gegevens uw
        uitdrukkelijke toestemming. Anders worden de gegevens die met behulp van cookies
        worden verwerkt, verwerkt op basis van onze gerechtvaardigde belangen (bijv. bij een
        bedrijfsmatige exploitatie van onze onlinedienst en de verbetering daarvan) of, indien
        het gebruik van cookies noodzakelijk is om aan onze contractuele verplichtingen te
        voldoen.
      </p>
      <p>
        <strong>Bewaartermijn:</strong> Tenzij wij u uitdrukkelijke informatie verstrekken
        over de bewaartermijn van permanente cookies, dient u ervan uit te gaan dat de
        bewaartermijn maximaal twee jaar kan bedragen.
      </p>
      <p>
        <strong>Algemene informatie over intrekking van toestemming en bezwaar (opt-out):</strong>{' '}
        U heeft te allen tijde de mogelijkheid bezwaar te maken tegen de verwerking van uw
        gegevens via cookietechnologieën of uw toestemming in te trekken. U kunt uw bezwaar
        aanvankelijk kenbaar maken via de instellingen van uw browser, bijv. door het gebruik
        van cookies te deactiveren (wat ook de functionaliteit van onze onlinediensten kan
        beperken). Bezwaar tegen het gebruik van cookies voor online-marketingdoeleinden kan
        worden gemaakt voor een groot aantal diensten, met name bij tracking, via de websites{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        en{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Meta-/communicatiegegevens (bijv. cookies).</dd>
        <dt>Betrokkenen</dt>
        <dd>Onderzoekers; deelnemers.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Toestemming (Art. 6 (1) (a) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>

      {/* ── Commerciële diensten ─────────────────────────────────────────────── */}
      <h2 id='m317'>Commerciële diensten</h2>
      <p>
        De volgende informatie over commerciële diensten is uitsluitend van toepassing op
        onderzoekers die deelnemers willen betalen via de integratie van het Samply-platform
        met Stripe.
      </p>
      <p>
        Wij verwerken gegevens van onze contractuele en zakelijke partners, bijv. klanten en
        geïnteresseerden (gezamenlijk aangeduid als &quot;contractuele partners&quot;) in het
        kader van contractuele en vergelijkbare rechtsbetrekkingen, alsmede de daarmee
        samenhangende handelingen en communicatie met de contractuele partners of
        precontractueel, bijv. om verzoeken te beantwoorden.
      </p>
      <p>
        Wij verwerken deze gegevens om onze contractuele verplichtingen na te komen, onze
        rechten te waarborgen en voor de doeleinden van de administratieve taken die
        verband houden met deze gegevens en de bedrijfsmatige organisatie. Wij geven de
        gegevens van contractuele partners uitsluitend in het kader van het toepasselijke
        recht door aan derden voor zover dit noodzakelijk is voor de bovengenoemde doeleinden
        of voor de nakoming van wettelijke verplichtingen of met toestemming van de
        betrokkenen.
      </p>
      <p>
        Wij verwijderen de gegevens na afloop van de wettelijke garantietermijnen en
        vergelijkbare verplichtingen, d.w.z. in principe na afloop van 4 jaar, tenzij de
        gegevens worden opgeslagen in een klantaccount of moeten worden bewaard om wettelijke
        redenen van archivering (bijv. in de regel 10 jaar voor belastingdoeleinden).
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Onderzoekergegevens (bijv. naam, instituut, e-mail, taal); Deelnemersgegevens (bijv. e-mail, tijdzone, tijdvoorkeuren, deelnemerscode).</dd>
        <dt>Betrokkenen</dt>
        <dd>Onderzoekers; deelnemers.</dd>
        <dt>Verwerkingsdoeleinden</dt>
        <dd>Contractuele diensten en ondersteuning; Contactverzoeken en communicatie; Kantoor- en organisatorische procedures; Beheren en beantwoorden van verzoeken; Beveiligingsmaatregelen.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Uitvoering van een overeenkomst en precontractuele verzoeken (Art. 6 (1) (b) AVG); Nakoming van een wettelijke verplichting (Art. 6 (1) (c) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>
      <p><strong>Gebruikte diensten en dienstverleners:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Betalingsverwerkingsplatform. Dienstverlener: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. Website: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Privacybeleid: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Registratie ─────────────────────────────────────────────────────── */}
      <h2 id='m367'>Registratie, inloggen en gebruikersaccount</h2>
      <p>
        Gebruikers kunnen een gebruikersaccount aanmaken. In het kader van de registratie
        worden de vereiste verplichte gegevens aan de gebruikers meegedeeld en verwerkt voor
        de doeleinden van het verstrekken van het gebruikersaccount op basis van de nakoming
        van contractuele verplichtingen. De verwerkte gegevens omvatten met name de
        inloggegevens (naam, wachtwoord en een e-mailadres).
      </p>
      <p>
        Gebruikers kunnen per e-mail worden geïnformeerd over informatie die relevant is voor
        hun gebruikersaccount, zoals technische wijzigingen. Indien gebruikers hun
        gebruikersaccount hebben beëindigd, worden hun gegevens met betrekking tot het
        gebruikersaccount verwijderd, behoudens een wettelijke bewaarplicht. Het is de
        verantwoordelijkheid van gebruikers om hun gegevens vóór het einde van het contract
        bij beëindiging te beveiligen. Wij zijn gerechtigd alle gebruikersgegevens die
        tijdens de looptijd van het contract zijn opgeslagen onherroepelijk te verwijderen.
      </p>
      <p>
        In het kader van het gebruik van onze registratie- en inlogfuncties, alsmede het
        gebruik van het gebruikersaccount, slaan wij het IP-adres en het tijdstip van de
        betreffende gebruikershandeling op. De opslag is gebaseerd op onze gerechtvaardigde
        belangen, alsmede de bescherming van de gebruiker tegen misbruik en ander
        ongeoorloofd gebruik. Deze gegevens worden niet doorgegeven aan derden, tenzij dit
        noodzakelijk is voor de behartiging van onze aanspraken of er een wettelijke
        verplichting toe bestaat.
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Onderzoekergegevens (bijv. naam, e-mail); Deelnemersgegevens (bijv. e-mail).</dd>
        <dt>Betrokkenen</dt>
        <dd>Onderzoekers; deelnemers.</dd>
        <dt>Verwerkingsdoeleinden</dt>
        <dd>Contractuele diensten en ondersteuning; Beveiligingsmaatregelen; Beheren en beantwoorden van verzoeken.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Toestemming (Art. 6 (1) (a) AVG); Uitvoering van een overeenkomst en precontractuele verzoeken (Art. 6 (1) (b) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <h2 id='m182'>Contact opnemen</h2>
      <p>
        Bij het contact opnemen met ons (bijv. via een contactformulier, e-mail, telefoon of
        via sociale media) worden de gegevens van de verzoekende personen verwerkt voor zover
        dit noodzakelijk is om de contactvragen en eventuele gevraagde activiteiten te
        beantwoorden.
      </p>
      <p>
        Het beantwoorden van contactvragen in het kader van contractuele of precontractuele
        betrekkingen geschiedt om onze contractuele verplichtingen na te komen of om
        (pre)contractuele verzoeken te beantwoorden en overigens op basis van de
        gerechtvaardigde belangen bij het beantwoorden van de verzoeken.
      </p>
      <dl>
        <dt>Verwerkte gegevenscategorieën</dt>
        <dd>Contactgegevens (bijv. e-mail, telefoonnummers).</dd>
        <dt>Betrokkenen</dt>
        <dd>Onderzoekers; deelnemers.</dd>
        <dt>Verwerkingsdoeleinden</dt>
        <dd>Contactverzoeken en communicatie.</dd>
        <dt>Rechtsgrondslag</dt>
        <dd>Uitvoering van een overeenkomst en precontractuele verzoeken (Art. 6 (1) (b) AVG); Gerechtvaardigde belangen (Art. 6 (1) (f) AVG).</dd>
      </dl>

      {/* ── Wissing ─────────────────────────────────────────────────────────── */}
      <h2 id='m12'>Wissing van gegevens</h2>
      <p>
        De door ons verwerkte gegevens worden gewist overeenkomstig de wettelijke bepalingen
        zodra de toestemming voor de verwerking ervan wordt ingetrokken of andere machtigingen
        niet langer van toepassing zijn (bijv. indien het doel van de verwerking van deze
        gegevens niet langer van toepassing is of zij niet vereist zijn voor het doel).
      </p>
      <p>
        Indien de gegevens niet worden verwijderd omdat zij vereist zijn voor andere en
        wettelijk toegestane doeleinden, wordt de verwerking ervan beperkt tot deze doeleinden.
        Dit betekent dat de gegevens worden geblokkeerd en niet voor andere doeleinden worden
        verwerkt. Dit is bijvoorbeeld van toepassing op gegevens die om handels- of
        belastingredenen moeten worden bewaard of waarvan bewaring noodzakelijk is voor de
        instelling, uitoefening of verdediging van rechtsvorderingen of ter bescherming van de
        rechten van een andere natuurlijke of rechtspersoon.
      </p>

      {/* ── Wijzigingen ─────────────────────────────────────────────────────── */}
      <h2 id='m15'>Wijzigingen en updates van de privacyverklaring</h2>
      <p>
        Wij verzoeken u zich regelmatig te informeren over de inhoud van onze
        privacyverklaring. Wij passen de privacyverklaring aan wanneer wijzigingen in onze
        gegevensverwerkingspraktijken dit noodzakelijk maken. Wij zullen u informeren zodra
        de wijzigingen uw medewerking vereisen (bijv. toestemming) of een andere individuele
        kennisgeving vereisen.
      </p>
      <p>
        Indien wij in deze privacyverklaring adressen en contactgegevens van bedrijven en
        organisaties verstrekken, verzoeken wij u er rekening mee te houden dat adressen in
        de loop van de tijd kunnen veranderen en de gegevens te verifiëren voordat u contact
        opneemt.
      </p>

      {/* ── Rechten ─────────────────────────────────────────────────────────── */}
      <h2 id='m10'>Rechten van betrokkenen</h2>
      <p>
        Als betrokkene heeft u op grond van de AVG diverse rechten, die met name voortvloeien
        uit de Artikelen 15 tot 21 van de AVG:
      </p>
      <ul>
        <li><strong>Recht van bezwaar:</strong> U heeft het recht om, op gronden die verband houden met uw specifieke situatie, te allen tijde bezwaar te maken tegen de verwerking van uw persoonsgegevens die is gebaseerd op artikel 6, lid 1, onder e) of f), van de AVG, met inbegrip van profilering op basis van die bepalingen.</li>
        <li><strong>Recht op intrekking van toestemming:</strong> U heeft het recht uw toestemming te allen tijde in te trekken.</li>
        <li><strong>Recht op inzage:</strong> U heeft het recht bevestiging te vragen of de betreffende gegevens worden verwerkt en over deze gegevens te worden geïnformeerd, alsmede nadere informatie en een kopie van de gegevens te ontvangen overeenkomstig de wettelijke bepalingen.</li>
        <li><strong>Recht op rectificatie:</strong> U heeft het recht overeenkomstig de wet te verzoeken om aanvulling van de gegevens die op u betrekking hebben of om rectificatie van de onjuiste gegevens die op u betrekking hebben.</li>
        <li><strong>Recht op wissing en recht op beperking van de verwerking:</strong> Overeenkomstig de wettelijke bepalingen heeft u het recht te eisen dat de betreffende gegevens onmiddellijk worden gewist of, als alternatief, te eisen dat de verwerking van de gegevens wordt beperkt overeenkomstig de wettelijke bepalingen.</li>
        <li><strong>Recht op gegevensoverdraagbaarheid:</strong> U heeft het recht gegevens die op u betrekking hebben en die u aan ons heeft verstrekt, te ontvangen in een gestructureerd, gangbaar en machineleesbaar formaat overeenkomstig de wettelijke vereisten, of de overdracht ervan aan een andere verwerkingsverantwoordelijke te verzoeken.</li>
        <li><strong>Klacht bij de toezichthoudende autoriteit:</strong> U heeft ook het recht, onder de bij wet vastgestelde voorwaarden, een klacht in te dienen bij een toezichthoudende autoriteit, met name in de lidstaat van uw gewone verblijfplaats, werkplek of de plaats van de vermeende inbreuk, indien u van mening bent dat de verwerking van uw persoonsgegevens inbreuk maakt op de AVG.</li>
      </ul>

      {/* ── Begrippen en definities ──────────────────────────────────────────── */}
      <h2 id='m42'>Terminologie en definities</h2>
      <p>
        Dit gedeelte geeft een overzicht van de in deze privacyverklaring gebruikte begrippen.
        Veel van de begrippen zijn ontleend aan de wet en zijn voornamelijk gedefinieerd in
        Artikel 4 van de AVG. De volgende toelichtingen zijn voornamelijk bedoeld voor het
        begrip.
      </p>
      <dl>
        <dt>Verwerkingsverantwoordelijke</dt>
        <dd>&quot;Verwerkingsverantwoordelijke&quot; is de natuurlijke persoon of rechtspersoon, overheidsinstantie, dienst of ander orgaan die/dat, alleen of samen met anderen, de doeleinden en middelen voor de verwerking van persoonsgegevens vaststelt.</dd>
        <dt>Persoonsgegevens</dt>
        <dd>&quot;Persoonsgegevens&quot; zijn alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon (&quot;betrokkene&quot;); als identificeerbaar wordt beschouwd een natuurlijke persoon die direct of indirect kan worden geïdentificeerd, met name aan de hand van een identificator zoals een naam, een identificatienummer, locatiegegevens, een online-identificator of een of meer specifieke elementen die kenmerkend zijn voor de fysieke, fysiologische, genetische, mentale, economische, culturele of sociale identiteit van die natuurlijke persoon.</dd>
        <dt>Verwerking</dt>
        <dd>De term &quot;verwerking&quot; heeft een brede reikwijdte en omvat praktisch elke omgang met gegevens, of het nu gaat om verzameling, evaluatie, opslag, doorgifte of wissing.</dd>
        <dt>Remarketing</dt>
        <dd>&quot;Remarketing&quot; of &quot;retargeting&quot; is de term die wordt gebruikt om bijvoorbeeld voor reclamedoeleinden bij te houden voor welke producten een gebruiker interesse heeft getoond op een website, om de gebruiker op andere websites aan deze producten te herinneren, bijv. in advertenties.</dd>
        <dt>Tracking</dt>
        <dd>&quot;Tracking&quot; is de term die wordt gebruikt wanneer het gedrag van gebruikers kan worden gevolgd op meerdere websites. Doorgaans worden gedrags- en interessegegevens met betrekking tot de gebruikte websites opgeslagen in cookies of op de servers van de aanbieders van trackingtechnologieën (zogenaamde profilering).</dd>
        <dt>Webanalyse</dt>
        <dd>Webanalyse dient voor de evaluatie van bezoekersstromen van onlinediensten en kan hun gedrag of interesses in bepaalde informatie, zoals de inhoud van websites, bepalen. Met behulp van webanalyse kunnen website-eigenaren herkennen op welk tijdstip bezoekers hun website bezoeken en voor welke inhoud zij interesse tonen.</dd>
      </dl>
    </>
  );
}

function PolicyContentDe() {
  return (
    <>
      <p>
        Mit der folgenden Datenschutzerklärung möchten wir Sie darüber informieren, welche
        Arten Ihrer personenbezogenen Daten (nachfolgend auch verkürzt als „Daten"
        bezeichnet) wir zu welchen Zwecken und in welchem Umfang verarbeiten. Die
        Datenschutzerklärung gilt für alle von uns durchgeführten Verarbeitungen
        personenbezogener Daten, sowohl im Rahmen der Erbringung unserer Leistungen als auch
        insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer
        Onlinepräsenzen, wie z. B. unserer Social-Media-Profile (nachfolgend zusammenfassend
        bezeichnet als „Onlineangebote").
      </p>
      <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
      <p><strong>Letzte Aktualisierung:</strong> 3. Dezember 2024</p>

      {/* ── Verantwortlicher ────────────────────────────────────────────────── */}
      <h2 id='m3'>Verantwortlicher</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>Bevollmächtigte Vertreter</dt>
        <dd>Yury Shevchenko</dd>
        <dt>E-Mail-Adresse</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Telefon</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Impressum</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Überblick ───────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Überblick über die Verarbeitungsvorgänge</h2>
      <p>
        Die folgende Tabelle fasst die Kategorien der verarbeiteten Daten, die Zwecke, für
        die sie verarbeitet werden, und die betroffenen Personen zusammen.
      </p>
      <h3>Kategorien verarbeiteter Daten</h3>
      <ul>
        <li>Studiendaten (z. B. Texteingaben, Bilder)</li>
        <li>Forscherdaten (z. B. Name, Institut, E-Mail, Sprache)</li>
        <li>Teilnehmerdaten (z. B. E-Mail, Zeitzone, Zeitpräferenzen, Teilnehmercode)</li>
        <li>Benachrichtigungsdaten (z. B. Titel, Nachricht, URL, Benachrichtigungsplan)</li>
        <li>Benachrichtigungs-Zeitstempel (z. B. wann eine Benachrichtigung in der App empfangen, in der Benachrichtigungsleiste angetippt, in der App geöffnet, gelöscht wurde, Geofencing-Ereignis, Abschlussereignis)</li>
        <li>Meta-/Kommunikationsdaten (z. B. Cookies)</li>
        <li>Kontaktdaten (z. B. E-Mail, Telefonnummern)</li>
      </ul>
      <h3>Kategorien betroffener Personen</h3>
      <ul>
        <li>Forschende</li>
        <li>Teilnehmende</li>
      </ul>
      <h3>Verarbeitungszwecke</h3>
      <ul>
        <li>Authentifizierungsverfahren</li>
        <li>Bereitstellung unserer Onlineangebote und Nutzerfreundlichkeit</li>
        <li>Büro- und Organisationsverfahren</li>
        <li>Feedback (z. B. Sammeln von Feedback über ein Online-Formular)</li>
        <li>Kontaktanfragen und Kommunikation</li>
        <li>Sicherheitsmaßnahmen</li>
        <li>Vertragliche Leistungen und Support</li>
        <li>Verwaltung und Beantwortung von Anfragen</li>
      </ul>

      {/* ── Rechtsgrundlagen ────────────────────────────────────────────────── */}
      <h2 id='m13'>Rechtsgrundlagen für die Verarbeitung</h2>
      <p>
        Im Folgenden informieren wir Sie über die Rechtsgrundlagen der
        Datenschutz-Grundverordnung (DSGVO), auf deren Basis wir personenbezogene Daten
        verarbeiten. Bitte beachten Sie, dass zusätzlich zu den Regelungen der DSGVO
        nationale Datenschutzvorgaben in Ihrem oder unserem Wohn- oder Sitzland gelten
        können. Sollten im Einzelfall speziellere Rechtsgrundlagen einschlägig sein,
        teilen wir Ihnen diese in der Datenschutzerklärung mit.
      </p>
      <ul>
        <li><strong>Einwilligung (Article 6 (1) (a) GDPR)</strong> — Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.</li>
        <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Article 6 (1) (b) GDPR)</strong> — Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
        <li><strong>Erfüllung rechtlicher Verpflichtungen (Article 6 (1) (c) GDPR)</strong> — Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der Verantwortliche unterliegt.</li>
        <li><strong>Schutz lebenswichtiger Interessen (Article 6 (1) (d) GDPR)</strong> — Die Verarbeitung ist erforderlich, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen.</li>
        <li><strong>Berechtigte Interessen (Article 6 (1) (f) GDPR)</strong> — Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten erfordern, überwiegen.</li>
      </ul>
      <p>
        <strong>Nationale Datenschutzregelungen in Deutschland:</strong> Zusätzlich zu den
        Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in
        Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch
        personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz — BDSG).
        Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht
        auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien
        personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung
        sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling.
        Ferner regelt es die Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses
        (§ 26 BDSG), insbesondere im Hinblick auf die Begründung, Durchführung oder
        Beendigung von Beschäftigungsverhältnissen sowie die Einwilligung von
        Beschäftigten. Außerdem können Landesdatenschutzgesetze der einzelnen Bundesländer
        zur Anwendung gelangen.
      </p>

      {/* ── Mobile App ──────────────────────────────────────────────────────── */}
      <h2 id='m200'>Bereitstellung der mobilen Anwendung Samply Research</h2>
      <p>
        <strong>Vom Nutzer bereitgestellte Informationen:</strong> Die Anwendung erhält die
        Informationen, die Sie beim Herunterladen und Registrieren der Anwendung angeben.
        Die Registrierung bei uns ist erforderlich, um die grundlegenden Funktionen der
        Anwendung nutzen zu können. Bei der Registrierung und Nutzung der Anwendung geben
        Sie uns (a) Ihre E-Mail-Adresse und Ihr Passwort an; (b) die Zeitzone und Sprache
        Ihres Smartphones; (c) Zeitstempel für folgende Ereignisse: Empfangen einer
        Benachrichtigung in der App, Antippen der Benachrichtigung in der
        Benachrichtigungsleiste, Öffnen einer Benachrichtigung in der App, Löschen einer
        Benachrichtigung, Abschließen einer Umfrage; (d) Informationen, die Sie uns
        mitteilen, wenn Sie uns um Hilfe bitten; (e) Informationen, die Sie in unser System
        eingeben, wenn Sie die Anwendung nutzen, z. B. beim Beitritt zu einer Studie;
        (f) Ihre aktuellen Standortdaten und Zeitstempel für Geofencing-Ereignisse bei der
        Nutzung der Anwendung und wenn die Anwendung geschlossen ist, sofern Sie an einer
        Studie teilnehmen, die Geofencing verwendet.
      </p>
      <p>
        <strong>Nutzung Ihres aktuellen Standorts im Hintergrund:</strong> Einige Studien
        können das Zusenden eines Links zu Online-Umfragen erfordern, wenn Sie einen
        bestimmten Ort (z. B. den Arbeitsplatz) betreten oder verlassen. Wenn Sie an einer
        Studie teilnehmen, die diese Art der Kontaktaufnahme mit Teilnehmenden verwendet,
        werden Sie daher gebeten, eine dauerhafte Standortverfolgung zu erlauben. Wenn Sie
        zustimmen, verfolgt die Anwendung Ihren Standort kontinuierlich, auch wenn die
        Anwendung geschlossen ist. Die Anwendung gibt Ihre Standortdaten nicht an
        Drittanbieter oder Forschende weiter. Ihre Standortdaten werden ausschließlich
        verwendet, um Benachrichtigungen mit Links zu Online-Umfragen auszulösen, die von
        Forschenden erstellt wurden. Sie können die Standortverfolgung für eine bestimmte
        Studie jederzeit in der Anwendung aktivieren oder deaktivieren. Wenn Sie nicht
        möchten, dass wir Ihren Standort für die oben genannten Zwecke verwenden, sollten
        Sie die Standortdienste für die mobile Anwendung in Ihren Kontoeinstellungen oder
        in Ihren Mobiltelefon-Einstellungen und/oder innerhalb der mobilen Anwendung
        deaktivieren.
      </p>
      <p>
        <strong>Datenspeicherungsrichtlinie, Verwaltung Ihrer Informationen:</strong> Sie
        können die gesamte Datenerhebung durch die Anwendung beenden, indem Sie Ihr Konto
        löschen (über den Menüpunkt „Mehr", dann „Einstellungen", dann „Mein Konto
        löschen") und die Anwendung deinstallieren. Sie können die standardmäßigen
        Deinstallationsprozesse verwenden, die auf Ihrem Mobilgerät oder über den
        App-Marktplatz oder das Netzwerk verfügbar sind.
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Studiendaten; Forscherdaten; Teilnehmerdaten; Benachrichtigungsdaten; Benachrichtigungs-Zeitstempel.</dd>
        <dt>Betroffene Personen</dt>
        <dd>Teilnehmende.</dd>
        <dt>Verarbeitungszwecke</dt>
        <dd>Authentifizierungsverfahren; Bereitstellung unserer Onlineangebote und Nutzerfreundlichkeit; Kontaktanfragen und Kommunikation; Sicherheitsmaßnahmen; Verwaltung und Beantwortung von Anfragen.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO); Schutz lebenswichtiger Interessen (Art. 6 Abs. 1 lit. d DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>
      <p><strong>Verwendete Dienste und Dienstleister:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Toolkit und Plattform zur Entwicklung einer mobilen Anwendung und deren Veröffentlichung für Android und iOS. Dienstanbieter: Expo. Website: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Datenschutzerklärung: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — App-Store-Plattform für mobile Apps auf iOS und iPadOS. Dienstanbieter: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. Website: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Datenschutzerklärung: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — App-Store-Plattform für Geräte mit dem Android-Betriebssystem sowie dessen Derivaten und Chrome OS. Dienstanbieter: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. Website: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Datenschutzerklärung: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Web-Hosting ─────────────────────────────────────────────────────── */}
      <h2 id='m225'>Bereitstellung von Online-Diensten und Web-Hosting</h2>
      <p>
        Um unsere Onlinedienste auf der Samply-Website
        (https://samply.uni-konstanz.de/) bereitzustellen, nutzen wir die Infrastruktur
        (Webserver, Rechenkapazität, Speicherplatz, Datenbankdienste, Sicherheits- und
        technische Wartungsdienste) der Universität Konstanz in Deutschland.
      </p>
      <p>
        Die im Rahmen der Bereitstellung der Website verarbeiteten Daten umfassen alle
        Informationen über die Nutzer der mobilen Anwendung Samply Research und der
        Samply-Website, die im Zuge der Nutzung und Kommunikation erhoben werden.
        Teilnehmerdaten und Zeitstempel von Benachrichtigungen werden in der sicheren
        Datenbank gespeichert und sind nur für die Forschenden der jeweiligen Studie
        zugänglich, die diese Daten erhoben haben. Forschende können diese Daten über die
        Samply-Website-Oberfläche löschen.
      </p>
      <p>
        <strong>E-Mail-Versand und -Hosting:</strong> Die von uns genutzten
        Web-Hosting-Dienste umfassen auch das Versenden, Empfangen und Speichern von
        E-Mails. Zu diesen Zwecken werden die Adressen der Empfänger und Absender sowie
        weitere Informationen zum E-Mail-Versand (z. B. die beteiligten Anbieter) und die
        Inhalte der jeweiligen E-Mails verarbeitet. Die genannten Daten können auch für
        Zwecke der SPAM-Erkennung verarbeitet werden. Bitte beachten Sie, dass E-Mails im
        Internet in der Regel nicht verschlüsselt übertragen werden. E-Mails werden zwar
        in der Regel während des Transports verschlüsselt, nicht jedoch auf den Servern,
        von denen sie gesendet und empfangen werden (es sei denn, es wird eine sogenannte
        Ende-zu-Ende-Verschlüsselung verwendet). Wir können daher keine Verantwortung für
        den Übertragungsweg von E-Mails zwischen dem Absender und dem Eingang auf unserem
        Server übernehmen.
      </p>
      <p>
        <strong>Erhebung von Zugriffsdaten und Logfiles:</strong> Wir selbst oder unser
        Webhostinganbieter erheben Daten zu jedem Zugriff auf den Server (sogenannte
        Serverlogfiles). Zu den Serverlogfiles können die Adresse und der Name der
        abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene
        Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das
        Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im
        Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles
        können zum einen zu Zwecken der Sicherheit eingesetzt werden, z. B. um eine
        Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen
        Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der
        Server und deren Stabilität sicherzustellen.
      </p>
      <p>
        <strong>Datenspeicherungsrichtlinie, Verwaltung Ihrer Informationen:</strong>{' '}
        Website-Nutzer (Forschende und Teilnehmende) können ihre Konten über die
        Samply-Website-Oberfläche verwalten. Nutzer können ihr Konto über den Menüpunkt
        „Konto" und dann „Mein Konto löschen" löschen.
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Studiendaten; Forscherdaten; Teilnehmerdaten; Benachrichtigungsdaten; Benachrichtigungs-Zeitstempel.</dd>
        <dt>Betroffene Personen</dt>
        <dd>Forschende; Teilnehmende.</dd>
        <dt>Verarbeitungszwecke</dt>
        <dd>Authentifizierungsverfahren; Bereitstellung unserer Onlineangebote und Nutzerfreundlichkeit; Kontaktanfragen und Kommunikation; Sicherheitsmaßnahmen; Verwaltung und Beantwortung von Anfragen.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO); Schutz lebenswichtiger Interessen (Art. 6 Abs. 1 lit. d DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>
      <p><strong>Verwendete Dienste und Dienstleister:</strong></p>
      <ul>
        <li><strong>University web server</strong> — Dienstanbieter: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. Website: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Datenschutzerklärung: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Transaktionaler E-Mail-Dienst. Dienstanbieter: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. Website: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Datenschutzerklärung: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Sicherheitsmaßnahmen ────────────────────────────────────────────── */}
      <h2 id='m27'>Sicherheitsmaßnahmen</h2>
      <p>
        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des
        Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der
        Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen
        Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und
        Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen,
        um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
      </p>
      <p>
        Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität
        und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs
        zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der
        Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren
        eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten
        und Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen
        wir den Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von
        Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
        Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
      </p>
      <p>
        <strong>Kürzung der IP-Adresse:</strong> Im Allgemeinen werden die IP-Adressen von
        Forschenden und Teilnehmenden nicht aufgezeichnet und gespeichert. Sollte dies in
        Zukunft der Fall sein, werden wir Ihre IP-Adresse kürzen oder kürzen lassen. Bei
        der Kürzung der IP-Adresse, auch als „IP-Masking" bekannt, wird das letzte Oktett,
        d. h. die letzten beiden Ziffern einer IP-Adresse, gelöscht. Mit der Kürzung der
        IP-Adresse soll die Identifizierung einer Person anhand ihrer IP-Adresse verhindert
        oder erheblich erschwert werden.
      </p>
      <p>
        <strong>SSL-Verschlüsselung (https):</strong> Um Ihre über unsere Onlineangebote
        übermittelten Daten bestmöglich zu schützen, verwenden wir SSL-Verschlüsselung.
        Sie erkennen solche verschlüsselten Verbindungen an dem Präfix https:// in der
        Adressleiste Ihres Browsers.
      </p>

      {/* ── Übermittlung ────────────────────────────────────────────────────── */}
      <h2 id='m25'>Übermittlung und Offenlegung personenbezogener Daten</h2>
      <p>
        Im Rahmen unserer Verarbeitung personenbezogener Daten kann es vorkommen, dass die
        Daten an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten
        oder Personen übermittelt oder sie ihnen gegenüber offengelegt werden. Zu den
        Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister oder
        Anbieter von Diensten und Inhalten, die in eine Webseite eingebunden sind, gehören.
        In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere
        entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit
        den Empfängern Ihrer Daten.
      </p>

      {/* ── Drittländer ─────────────────────────────────────────────────────── */}
      <h2 id='m24'>Datenverarbeitung in Drittländern</h2>
      <p>
        Sofern wir Daten in einem Drittland (d. h. außerhalb der Europäischen Union (EU),
        des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen
        der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von
        Daten an andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im
        Einklang mit den gesetzlichen Vorgaben.
      </p>
      <p>
        Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder gesetzlich
        erforderlicher Übermittlung verarbeiten oder lassen wir die Daten nur in Drittländern
        mit einem anerkannten Datenschutzniveau, auf Basis besonderer Garantien, wie z. B.
        einer vertraglichen Verpflichtung durch sogenannte Standardschutzklauseln der
        EU-Kommission oder bei Vorliegen von Zertifizierungen oder verbindlichen internen
        Datenschutzvorschriften, verarbeiten (Artikel 44 bis 49 DSGVO).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Verwendung von Cookies</h2>
      <p>
        Wir verwenden keine Drittanbieter-Cookies oder Cookies für Statistiken, Marketing
        und Personalisierung. Wir verwenden ausschließlich notwendige (essentielle) Cookies,
        die für den Betrieb einer Website erforderlich sind (z. B. Nutzerauthentifizierung).
      </p>
      <p>
        Cookies sind Textdateien, die Daten von besuchten Websites oder Domains enthalten
        und von einem Browser auf dem Computer des Nutzers gespeichert werden. Ein Cookie
        dient in erster Linie dazu, Informationen über einen Nutzer während oder nach seinem
        Besuch innerhalb eines Onlineangebots zu speichern. Zu den gespeicherten Informationen
        können z. B. die Spracheinstellungen auf einer Website, der Loginstatus, ein
        Warenkorb oder die Stelle, an der ein Video angeschaut wurde, gehören.
      </p>
      <p><strong>Folgende Arten und Funktionen von Cookies werden unterschieden:</strong></p>
      <ul>
        <li><strong>Temporäre Cookies (auch: Session-Cookies):</strong> Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und seinen Browser geschlossen hat.</li>
        <li><strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des Browsers gespeichert. So kann beispielsweise der Loginstatus gespeichert oder bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht.</li>
        <li><strong>First-Party-Cookies:</strong> First-Party-Cookies werden von uns selbst gesetzt.</li>
        <li><strong>Third-Party-Cookies:</strong> Third-Party-Cookies werden hauptsächlich von Werbetreibenden (sogenannten Dritten) genutzt, um Nutzerinformationen zu verarbeiten.</li>
        <li><strong>Notwendige (auch: essentielle) Cookies:</strong> Cookies können für den Betrieb einer Website notwendig sein (z. B. um Logins oder andere Nutzereingaben zu speichern oder aus Sicherheitsgründen).</li>
        <li><strong>Statistik-, Marketing- und Personalisierungs-Cookies:</strong> Cookies werden auch generell eingesetzt, um die Reichweite einer Website zu messen und wenn die Interessen oder das Verhalten eines Nutzers in einem Nutzerprofil gespeichert werden. Solche Profile werden z. B. genutzt, um den Nutzern Inhalte anzuzeigen, die ihren potenziellen Interessen entsprechen.</li>
      </ul>
      <p>
        <strong>Hinweise zur Rechtsgrundlage:</strong> Auf welcher Rechtsgrundlage wir Ihre
        personenbezogenen Daten mithilfe von Cookies verarbeiten, hängt davon ab, ob wir
        Sie um eine Einwilligung bitten. Falls dies zutrifft und Sie in die Nutzung von
        Cookies einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer Daten die
        erklärte Einwilligung. Andernfalls werden die mithilfe von Cookies verarbeiteten
        Daten auf Grundlage unserer berechtigten Interessen (z. B. an einem
        betriebswirtschaftlichen Betrieb unseres Onlineangebots und dessen Verbesserung)
        verarbeitet oder, wenn der Einsatz von Cookies erforderlich ist, um unsere
        vertraglichen Verpflichtungen zu erfüllen.
      </p>
      <p>
        <strong>Speicherdauer:</strong> Sofern wir Ihnen keine expliziten Angaben zur
        Speicherdauer von permanenten Cookies mitteilen, gehen Sie bitte davon aus, dass
        die Speicherdauer bis zu zwei Jahre betragen kann.
      </p>
      <p>
        <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out):</strong>{' '}
        Sie haben jederzeit die Möglichkeit, der Verarbeitung Ihrer Daten mithilfe von
        Cookie-Technologien zu widersprechen oder Ihre Einwilligung zu widerrufen. Sie
        können Ihren Widerspruch zunächst mittels der Einstellungen Ihres Browsers erklären,
        z. B. indem Sie die Nutzung von Cookies deaktivieren (wobei hierdurch auch die
        Funktionsfähigkeit unserer Onlineangebote eingeschränkt werden kann). Ein Widerspruch
        gegen den Einsatz von Cookies zu Online-Marketingzwecken kann für eine Vielzahl der
        Dienste, insbesondere beim Tracking, über die Websites{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        und{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>{' '}
        erklärt werden.
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Meta-/Kommunikationsdaten (z. B. Cookies).</dd>
        <dt>Betroffene Personen</dt>
        <dd>Forschende; Teilnehmende.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>

      {/* ── Kommerzielle Dienste ─────────────────────────────────────────────── */}
      <h2 id='m317'>Kommerzielle Dienste</h2>
      <p>
        Die folgenden Informationen zu kommerziellen Diensten gelten ausschließlich für
        Forschende, die Teilnehmende über die Integration der Samply-Plattform mit Stripe
        vergüten möchten.
      </p>
      <p>
        Wir verarbeiten Daten unserer Vertrags- und Geschäftspartner, z. B. Kunden und
        Interessenten (zusammenfassend bezeichnet als „Vertragspartner") im Rahmen von
        vertraglichen und vergleichbaren Rechtsverhältnissen sowie damit verbundenen
        Maßnahmen und im Rahmen der Kommunikation mit den Vertragspartnern (oder
        vorvertraglich), z. B. um Anfragen zu beantworten.
      </p>
      <p>
        Wir verarbeiten diese Daten, um unsere vertraglichen Verpflichtungen zu erfüllen,
        unsere Rechte zu wahren und zu den mit diesen Daten verbundenen Verwaltungsaufgaben
        sowie der unternehmerischen Organisation. Die Daten der Vertragspartner geben wir im
        Rahmen des geltenden Rechts nur insoweit an Dritte weiter, als dies zu den
        vorgenannten Zwecken oder zur Erfüllung gesetzlicher Pflichten oder mit Einwilligung
        der betroffenen Personen erforderlich ist.
      </p>
      <p>
        Wir löschen die Daten nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer
        Pflichten, d. h. grundsätzlich nach Ablauf von 4 Jahren, es sei denn, dass die
        Daten in einem Kundenkonto gespeichert werden oder aus gesetzlichen
        Archivierungsgründen aufbewahrt werden müssen (z. B. in der Regel 10 Jahre aus
        steuerrechtlichen Gründen).
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Forscherdaten (z. B. Name, Institut, E-Mail, Sprache); Teilnehmerdaten (z. B. E-Mail, Zeitzone, Zeitpräferenzen, Teilnehmercode).</dd>
        <dt>Betroffene Personen</dt>
        <dd>Forschende; Teilnehmende.</dd>
        <dt>Verarbeitungszwecke</dt>
        <dd>Vertragliche Leistungen und Support; Kontaktanfragen und Kommunikation; Büro- und Organisationsverfahren; Verwaltung und Beantwortung von Anfragen; Sicherheitsmaßnahmen.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 lit. b DSGVO); Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>
      <p><strong>Verwendete Dienste und Dienstleister:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Zahlungsabwicklungsplattform. Dienstanbieter: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. Website: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Datenschutzerklärung: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Registrierung ───────────────────────────────────────────────────── */}
      <h2 id='m367'>Registrierung, Anmeldung und Benutzerkonto</h2>
      <p>
        Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung werden den
        Nutzern die erforderlichen Pflichtangaben mitgeteilt und zu Zwecken der
        Bereitstellung des Nutzerkontos auf Grundlage vertraglicher Pflichterfüllung
        verarbeitet. Zu den verarbeiteten Daten gehören insbesondere die
        Login-Informationen (Name, Passwort sowie eine E-Mail-Adresse).
      </p>
      <p>
        Die Nutzer können per E-Mail über für ihr Nutzerkonto relevante Informationen, wie
        z. B. technische Änderungen, informiert werden. Wenn Nutzer ihr Nutzerkonto
        gekündigt haben, werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich
        einer gesetzlichen Aufbewahrungspflicht, gelöscht. Es obliegt den Nutzern, ihre
        Daten bei erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind berechtigt,
        sämtliche während der Vertragsdauer gespeicherte Daten des Nutzers unwiederbringlich
        zu löschen.
      </p>
      <p>
        Im Rahmen der Inanspruchnahme unserer Registrierungs- und Anmeldefunktionen sowie
        der Nutzung des Nutzerkontos speichern wir die IP-Adresse und den Zeitpunkt der
        jeweiligen Nutzerhandlung. Die Speicherung erfolgt auf Grundlage unserer berechtigten
        Interessen als auch jener der Nutzer an einem Schutz vor Missbrauch und sonstiger
        unbefugter Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich
        nicht, es sei denn, sie ist zur Verfolgung unserer Ansprüche erforderlich oder es
        besteht eine gesetzliche Verpflichtung hierzu.
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Forscherdaten (z. B. Name, E-Mail); Teilnehmerdaten (z. B. E-Mail).</dd>
        <dt>Betroffene Personen</dt>
        <dd>Forschende; Teilnehmende.</dd>
        <dt>Verarbeitungszwecke</dt>
        <dd>Vertragliche Leistungen und Support; Sicherheitsmaßnahmen; Verwaltung und Beantwortung von Anfragen.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 lit. b DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>

      {/* ── Kontaktaufnahme ─────────────────────────────────────────────────── */}
      <h2 id='m182'>Kontaktaufnahme</h2>
      <p>
        Bei der Kontaktaufnahme mit uns (z. B. per Kontaktformular, E-Mail, Telefon oder
        über soziale Medien) werden die Angaben der anfragenden Personen verarbeitet, soweit
        dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen
        erforderlich ist.
      </p>
      <p>
        Die Beantwortung von Kontaktanfragen im Rahmen von vertraglichen oder
        vorvertraglichen Beziehungen erfolgt zur Erfüllung unserer vertraglichen Pflichten
        oder zur Beantwortung von (vor)vertraglichen Anfragen und im Übrigen auf Grundlage
        der berechtigten Interessen an der Beantwortung der Anfragen.
      </p>
      <dl>
        <dt>Verarbeitete Datenkategorien</dt>
        <dd>Kontaktdaten (z. B. E-Mail, Telefonnummern).</dd>
        <dt>Betroffene Personen</dt>
        <dd>Forschende; Teilnehmende.</dd>
        <dt>Verarbeitungszwecke</dt>
        <dd>Kontaktanfragen und Kommunikation.</dd>
        <dt>Rechtsgrundlage</dt>
        <dd>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 lit. b DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).</dd>
      </dl>

      {/* ── Löschung von Daten ──────────────────────────────────────────────── */}
      <h2 id='m12'>Löschung von Daten</h2>
      <p>
        Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben
        gelöscht, sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden
        oder sonstige Erlaubnisse entfallen (z. B. wenn der Zweck der Verarbeitung dieser
        Daten entfallen ist oder sie für den Zweck nicht erforderlich sind).
      </p>
      <p>
        Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige
        Zwecke erforderlich sind, wird deren Verarbeitung auf diese Zwecke beschränkt. D. h.,
        die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z. B.
        für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen
        oder deren Aufbewahrung zur Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
        juristischen Person erforderlich ist.
      </p>

      {/* ── Änderungen ──────────────────────────────────────────────────────── */}
      <h2 id='m15'>Änderungen und Aktualisierungen der Datenschutzerklärung</h2>
      <p>
        Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu
        informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von
        uns durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren
        Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z. B.
        Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.
      </p>
      <p>
        Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von
        Unternehmen und Organisationen angeben, bitten wir zu beachten, dass die Adressen
        sich über die Zeit ändern können, und bitten die Angaben vor Kontaktaufnahme zu
        prüfen.
      </p>

      {/* ── Rechte der betroffenen Personen ────────────────────────────────── */}
      <h2 id='m10'>Rechte der betroffenen Personen</h2>
      <p>
        Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich
        insbesondere aus Art. 15 bis 21 DSGVO ergeben:
      </p>
      <ul>
        <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.</li>
        <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
        <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden, und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.</li>
        <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</li>
        <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
        <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.</li>
        <li><strong>Beschwerde bei der Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.</li>
      </ul>

      {/* ── Begriffe und Definitionen ───────────────────────────────────────── */}
      <h2 id='m42'>Begriffe und Definitionen</h2>
      <p>
        In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser
        Datenschutzerklärung verwendeten Begriffe. Soweit die Begriffe gesetzlich definiert
        sind, gelten deren gesetzliche Definitionen. Die nachfolgenden Erläuterungen sollen
        dagegen vor allem dem Verständnis dienen.
      </p>
      <dl>
        <dt>Verantwortlicher</dt>
        <dd>„Verantwortlicher" bezeichnet die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</dd>
        <dt>Personenbezogene Daten</dt>
        <dd>„Personenbezogene Daten" sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person") beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.</dd>
        <dt>Verarbeitung</dt>
        <dd>„Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern, das Übermitteln oder das Löschen.</dd>
        <dt>Remarketing</dt>
        <dd>„Remarketing" bzw. „Retargeting" bezeichnet das Verfahren, mit dem z. B. zu Werbezwecken vermerkt wird, für welche Produkte sich ein Nutzer auf einer Website interessiert hat, um den Nutzer auf anderen Websites an diese Produkte, z. B. in Werbeanzeigen, zu erinnern.</dd>
        <dt>Tracking</dt>
        <dd>Von „Tracking" spricht man, wenn das Verhalten von Nutzern über mehrere Onlineangebote hinweg nachvollzogen werden kann. Im Regelfall werden im Hinblick auf die genutzten Onlineangebote Verhaltens- und Interessensinformationen in Cookies oder auf Servern der Anbieter der Trackingtechnologien gespeichert (sogenanntes Profiling).</dd>
        <dt>Web-Analyse</dt>
        <dd>Die Web-Analyse dient der Auswertung der Besucherströme von Onlineangeboten und kann das Verhalten oder Interessen der Besucher an bestimmten Informationen, wie z. B. Inhalten von Websites, umfassen. Mit deren Hilfe können Websitebetreiber z. B. erkennen, zu welcher Zeit Besucher ihre Website besuchen und für welche Inhalte sie sich interessieren.</dd>
      </dl>
    </>
  );
}

function PolicyContentRu() {
  return (
    <>
      <p>
        В настоящей политике конфиденциальности мы хотели бы проинформировать вас о том,
        какие виды ваших персональных данных (далее также сокращённо — &quot;данные&quot;)
        мы обрабатываем, для каких целей и в каком объёме. Политика конфиденциальности
        распространяется на всю обработку персональных данных, осуществляемую нами как в
        контексте предоставления наших услуг, так и в особенности на наших веб-сайтах, в
        мобильных приложениях и в рамках внешних онлайн-присутствий, например в профилях
        социальных сетей (далее совместно именуемых &quot;онлайн-услуги&quot;).
      </p>
      <p>Используемые термины не зависят от гендерной принадлежности.</p>
      <p><strong>Последнее обновление:</strong> 3 декабря 2024 г.</p>

      {/* ── Контролёр ───────────────────────────────────────────────────────── */}
      <h2 id='m3'>Контролёр</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>Уполномоченные представители</dt>
        <dd>Yury Shevchenko</dd>
        <dt>Адрес электронной почты</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Телефон</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Правовая информация</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Обзор ───────────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Обзор операций по обработке данных</h2>
      <p>
        В следующей таблице приведены категории обрабатываемых данных, цели их обработки и
        соответствующие субъекты данных.
      </p>
      <h3>Категории обрабатываемых данных</h3>
      <ul>
        <li>Данные исследования (например, текстовые записи, изображения)</li>
        <li>Данные исследователя (например, имя, институт, электронная почта, язык)</li>
        <li>Данные участника (например, электронная почта, часовой пояс, временные предпочтения, код участника)</li>
        <li>Данные уведомлений (например, заголовок, сообщение, URL, расписание уведомлений)</li>
        <li>Временные метки уведомлений (например, когда уведомление было получено в приложении, нажато в панели уведомлений, открыто в приложении, удалено, событие геозоны, событие завершения)</li>
        <li>Мета-/коммуникационные данные (например, cookies)</li>
        <li>Контактные данные (например, электронная почта, номера телефонов)</li>
      </ul>
      <h3>Категории субъектов данных</h3>
      <ul>
        <li>Исследователи</li>
        <li>Участники</li>
      </ul>
      <h3>Цели обработки</h3>
      <ul>
        <li>Процессы аутентификации</li>
        <li>Предоставление наших онлайн-услуг и удобство использования</li>
        <li>Офисные и организационные процедуры</li>
        <li>Обратная связь (например, сбор отзывов через онлайн-форму)</li>
        <li>Контактные запросы и коммуникация</li>
        <li>Меры безопасности</li>
        <li>Договорные услуги и поддержка</li>
        <li>Управление запросами и ответы на них</li>
      </ul>

      {/* ── Правовые основания ──────────────────────────────────────────────── */}
      <h2 id='m13'>Правовые основания для обработки данных</h2>
      <p>
        Ниже мы информируем вас о правовых основаниях Общего регламента о защите данных
        (GDPR), на основании которых мы обрабатываем персональные данные. Обратите
        внимание, что в дополнение к положениям GDPR в вашей стране или в стране нашего
        проживания или нахождения могут применяться национальные нормы о защите данных.
        Если в отдельных случаях применяются более конкретные правовые основания, мы
        сообщим вам об этом в соответствующем разделе политики конфиденциальности.
      </p>
      <ul>
        <li><strong>Согласие (Article 6 (1) (a) GDPR)</strong> — Субъект данных дал согласие на обработку своих персональных данных для одной или нескольких конкретных целей.</li>
        <li><strong>Исполнение договора и предварительные запросы (Article 6 (1) (b) GDPR)</strong> — Обработка необходима для исполнения договора, стороной которого является субъект данных, или для принятия мер по запросу субъекта данных до заключения договора.</li>
        <li><strong>Соблюдение правового обязательства (Article 6 (1) (c) GDPR)</strong> — Обработка необходима для выполнения правового обязательства, которому подчиняется контролёр.</li>
        <li><strong>Защита жизненно важных интересов (Article 6 (1) (d) GDPR)</strong> — Обработка необходима для защиты жизненно важных интересов субъекта данных или другого физического лица.</li>
        <li><strong>Законные интересы (Article 6 (1) (f) GDPR)</strong> — Обработка необходима для целей законных интересов, преследуемых контролёром или третьей стороной, за исключением случаев, когда такие интересы перевешивают интересы или основные права и свободы субъекта данных, требующие защиты персональных данных.</li>
      </ul>
      <p>
        <strong>Национальные нормы о защите данных в Германии:</strong> В дополнение к
        нормам GDPR в Германии действуют национальные положения о защите данных. В
        частности, это Закон о защите от злоупотреблений персональными данными при их
        обработке (Федеральный закон о защите данных — BDSG). BDSG содержит специальные
        положения о праве на доступ, праве на удаление, праве на возражение, обработке
        особых категорий персональных данных, обработке в иных целях и передаче данных, а
        также об автоматизированном индивидуальном принятии решений, включая
        профилирование. Кроме того, он регулирует обработку данных в рамках трудовых
        отношений (§ 26 BDSG), в частности в отношении установления, исполнения или
        прекращения трудовых отношений и согласия работников. Также могут применяться
        законы о защите данных отдельных федеральных земель.
      </p>

      {/* ── Мобильное приложение ────────────────────────────────────────────── */}
      <h2 id='m200'>Предоставление мобильного приложения Samply Research</h2>
      <p>
        <strong>Информация, предоставляемая пользователем:</strong> Приложение получает
        информацию, которую вы предоставляете при загрузке и регистрации приложения.
        Регистрация у нас обязательна для использования основных функций приложения. При
        регистрации и использовании приложения вы предоставляете (a) ваш адрес электронной
        почты и пароль; (b) часовой пояс и язык вашего смартфона; (c) временные метки для
        следующих событий: получение уведомления в приложении, нажатие на уведомление в
        панели уведомлений, открытие уведомления в приложении, удаление уведомления,
        прохождение опроса; (d) информацию, которую вы предоставляете при обращении к нам
        за помощью; (e) информацию, которую вы вводите в нашу систему при использовании
        приложения, например при вступлении в исследование; (f) сведения о вашем текущем
        местоположении и временные метки событий геозоны при использовании приложения и
        когда приложение закрыто, если вы участвуете в исследовании, использующем
        геозоны.
      </p>
      <p>
        <strong>Использование вашего текущего местоположения в фоновом режиме:</strong>{' '}
        Некоторые исследования могут требовать отправки вам ссылки на онлайн-опросы при
        входе или выходе из определённого места (например, рабочего места). По этой
        причине, если вы присоединяетесь к исследованию, использующему такой тип связи с
        участниками, вас попросят разрешить постоянное отслеживание местоположения. Если
        вы согласитесь, приложение будет непрерывно отслеживать ваше местоположение даже
        при закрытом приложении. Приложение не передаёт данные о вашем местоположении
        сторонним сервисам или исследователям. Информация о вашем местоположении
        используется исключительно для запуска уведомлений со ссылками на онлайн-опросы,
        созданные исследователями. Вы всегда можете включить или отключить отслеживание
        местоположения для конкретного исследования в приложении. Если вы не хотите, чтобы
        мы использовали ваше местоположение в указанных целях, отключите службы
        геолокации для мобильного приложения в настройках вашей учётной записи, в
        настройках мобильного телефона и/или внутри мобильного приложения.
      </p>
      <p>
        <strong>Политика хранения данных, управление вашей информацией:</strong> Вы
        можете прекратить сбор информации приложением, удалив свою учётную запись (в
        пункте меню &quot;Ещё&quot;, затем &quot;Настройки&quot;, затем &quot;Удалить мою
        учётную запись&quot;) и удалив приложение. Вы можете воспользоваться стандартными
        процессами удаления, доступными на вашем мобильном устройстве или через магазин
        мобильных приложений.
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Данные исследования; Данные исследователя; Данные участника; Данные уведомлений; Временные метки уведомлений.</dd>
        <dt>Субъекты данных</dt>
        <dd>Участники.</dd>
        <dt>Цели обработки</dt>
        <dd>Процессы аутентификации; Предоставление наших онлайн-услуг и удобство использования; Контактные запросы и коммуникация; Меры безопасности; Управление запросами и ответы на них.</dd>
        <dt>Правовое основание</dt>
        <dd>Согласие (Art. 6 (1) (a) GDPR); Соблюдение правового обязательства (Art. 6 (1) (c) GDPR); Защита жизненно важных интересов (Art. 6 (1) (d) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Используемые сервисы и поставщики услуг:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Набор инструментов и платформа для создания и публикации мобильных приложений на Android и iOS. Поставщик услуг: Expo. Веб-сайт: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Политика конфиденциальности: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — Магазин приложений для мобильных приложений на операционных системах iOS и iPadOS. Поставщик услуг: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. Веб-сайт: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Политика конфиденциальности: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Магазин приложений для устройств на базе операционной системы Android и её производных, а также Chrome OS. Поставщик услуг: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. Веб-сайт: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Политика конфиденциальности: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Веб-хостинг ─────────────────────────────────────────────────────── */}
      <h2 id='m225'>Предоставление онлайн-услуг и веб-хостинг</h2>
      <p>
        Для предоставления наших онлайн-услуг на сайте Samply
        (https://samply.uni-konstanz.de/) мы используем инфраструктуру (веб-сервер,
        вычислительные мощности, дисковое пространство, службы баз данных, услуги
        безопасности и технического обслуживания) Университета Констанца в Германии.
      </p>
      <p>
        Данные, обрабатываемые в рамках предоставления веб-сайта, включают всю информацию,
        связанную с пользователями мобильного приложения Samply Research и веб-сайта
        Samply, которая собирается в процессе использования и коммуникации. Данные
        участников и временные метки уведомлений хранятся в защищённой базе данных и
        доступны только исследователям соответствующего исследования, собравшего эти
        данные. Исследователи могут удалить эти данные через интерфейс веб-сайта Samply.
      </p>
      <p>
        <strong>Отправка и хостинг электронной почты:</strong> Используемые нами услуги
        веб-хостинга также включают отправку, получение и хранение электронных писем. В
        этих целях обрабатываются адреса получателей и отправителей, а также другая
        информация, связанная с отправкой писем (например, задействованные провайдеры), и
        содержимое соответствующих писем. Указанные данные могут также обрабатываться в
        целях обнаружения спама. Обратите внимание, что электронные письма в Интернете,
        как правило, передаются без шифрования. По общему правилу письма шифруются при
        транспортировке, но не на серверах, с которых они отправляются и на которых
        принимаются (если только не используется так называемое сквозное шифрование).
        Поэтому мы не можем нести ответственности за путь передачи писем от отправителя
        до получения на нашем сервере.
      </p>
      <p>
        <strong>Сбор данных о доступе и журнальных файлов:</strong> Мы сами или наш
        провайдер веб-хостинга собираем данные на основе каждого обращения к серверу
        (так называемые журнальные файлы сервера). Журнальные файлы сервера могут
        включать адрес и название веб-страниц и файлов, к которым осуществлялся доступ,
        дату и время доступа, объём переданных данных, уведомление об успешном доступе,
        тип и версию браузера, операционную систему пользователя, URL-адрес реферера
        (ранее посещённой страницы) и, как правило, IP-адреса и запрашивающего
        провайдера. Журнальные файлы сервера могут использоваться в целях безопасности,
        например для предотвращения перегрузки серверов (особенно в случае злоумышленных
        атак, так называемых DDoS-атак) и для обеспечения стабильности и оптимальной
        балансировки нагрузки серверов.
      </p>
      <p>
        <strong>Политика хранения данных, управление вашей информацией:</strong>{' '}
        Пользователи веб-сайта (исследователи и участники) могут управлять своими учётными
        записями через интерфейс веб-сайта Samply. Пользователи могут удалить свою учётную
        запись в пункте меню &quot;Аккаунт&quot;, затем &quot;Удалить мою учётную
        запись&quot;.
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Данные исследования; Данные исследователя; Данные участника; Данные уведомлений; Временные метки уведомлений.</dd>
        <dt>Субъекты данных</dt>
        <dd>Исследователи; участники.</dd>
        <dt>Цели обработки</dt>
        <dd>Процессы аутентификации; Предоставление наших онлайн-услуг и удобство использования; Контактные запросы и коммуникация; Меры безопасности; Управление запросами и ответы на них.</dd>
        <dt>Правовое основание</dt>
        <dd>Согласие (Art. 6 (1) (a) GDPR); Соблюдение правового обязательства (Art. 6 (1) (c) GDPR); Защита жизненно важных интересов (Art. 6 (1) (d) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Используемые сервисы и поставщики услуг:</strong></p>
      <ul>
        <li><strong>University web server</strong> — Поставщик услуг: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. Веб-сайт: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Политика конфиденциальности: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Сервис транзакционной электронной почты. Поставщик услуг: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. Веб-сайт: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Политика конфиденциальности: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Меры безопасности ───────────────────────────────────────────────── */}
      <h2 id='m27'>Меры безопасности</h2>
      <p>
        Мы принимаем надлежащие технические и организационные меры в соответствии с
        требованиями законодательства, с учётом современного уровня развития технологий,
        стоимости реализации, а также характера, объёма, контекста и целей обработки, а
        также рисков различной вероятности и серьёзности для прав и свобод физических лиц,
        в целях обеспечения уровня защиты, соответствующего риску.
      </p>
      <p>
        Эти меры включают, в частности, обеспечение конфиденциальности, целостности и
        доступности данных путём контроля физического и электронного доступа к данным, а
        также доступа к ним, их ввода, передачи, защиты и разделения. Кроме того, мы
        установили процедуры, обеспечивающие соблюдение прав субъектов данных, удаление
        данных и готовность к быстрому реагированию на угрозы данным. Мы также учитываем
        защиту персональных данных уже на этапе разработки или выбора оборудования,
        программного обеспечения и поставщиков услуг в соответствии с принципами
        конфиденциальности по умолчанию и конфиденциальности по проекту.
      </p>
      <p>
        <strong>Маскировка IP-адреса:</strong> Как правило, IP-адреса исследователей и
        участников не записываются и не хранятся. В случае если это произойдёт в будущем,
        мы сократим ваш IP-адрес или обеспечим его сокращение. При сокращении IP-адреса,
        известном также как &quot;IP-маскировка&quot;, удаляется последний октет, то есть
        последние два числа IP-адреса. Сокращение IP-адреса позволяет предотвратить или
        существенно затруднить идентификацию лица на основании его IP-адреса.
      </p>
      <p>
        <strong>SSL-шифрование (https):</strong> В целях наилучшей защиты данных,
        передаваемых через наши онлайн-услуги, мы используем SSL-шифрование. Такие
        зашифрованные соединения можно распознать по префиксу https:// в адресной строке
        браузера.
      </p>

      {/* ── Передача данных ─────────────────────────────────────────────────── */}
      <h2 id='m25'>Передача и раскрытие персональных данных</h2>
      <p>
        В контексте обработки персональных данных может происходить передача данных другим
        местам, компаниям или лицам либо их раскрытие. Получателями этих данных могут
        быть, например, платёжные организации в рамках платёжных операций, поставщики
        услуг, выполняющие IT-задачи, или провайдеры услуг и контента, встроенных в
        веб-сайт. В таком случае соблюдаются требования законодательства, и в частности с
        получателями ваших данных заключаются соответствующие договоры или соглашения,
        служащие защите ваших данных.
      </p>

      {/* ── Обработка данных в третьих странах ──────────────────────────────── */}
      <h2 id='m24'>Обработка данных в третьих странах</h2>
      <p>
        Если мы обрабатываем данные в третьей стране (то есть за пределами Европейского
        союза (ЕС), Европейского экономического пространства (ЕЭП)) или если обработка
        происходит в контексте использования сторонних услуг или раскрытия или передачи
        данных другим лицам, органам или компаниям, это осуществляется только в
        соответствии с требованиями законодательства.
      </p>
      <p>
        При наличии явного согласия или передачи, требуемой договором или законом, мы
        обрабатываем или обеспечиваем обработку данных только в третьих странах с
        признанным уровнем защиты данных, на основании специальных гарантий, таких как
        договорное обязательство посредством так называемых стандартных защитных оговорок
        Европейской комиссии, либо если сертификации или обязательные внутренние нормы
        защиты данных обосновывают обработку (статьи 44–49 GDPR).
      </p>

      {/* ── Использование cookies ────────────────────────────────────────────── */}
      <h2 id='m134'>Использование cookies</h2>
      <p>
        Мы не используем сторонние cookies или cookies для статистики, маркетинга и
        персонализации. Мы применяем только необходимые (обязательные) cookies, которые
        требуются для работы веб-сайта (например, аутентификация пользователей).
      </p>
      <p>
        Cookies — это текстовые файлы, которые содержат данные посещённых веб-сайтов или
        доменов и сохраняются браузером на компьютере пользователя. Cookie прежде всего
        используется для хранения информации о пользователе во время или после его
        посещения онлайн-сервиса. Хранимая информация может включать, например, языковые
        настройки на веб-сайте, статус входа, содержимое корзины покупок или место
        просмотра видео.
      </p>
      <p><strong>Различают следующие типы и функции cookies:</strong></p>
      <ul>
        <li><strong>Временные cookies (также: сеансовые cookies):</strong> Временные cookies удаляются самое позднее после того, как пользователь покидает онлайн-сервис и закрывает браузер.</li>
        <li><strong>Постоянные cookies:</strong> Постоянные cookies остаются сохранёнными даже после закрытия браузера. Например, может быть сохранён статус входа или предпочтительный контент может отображаться непосредственно при повторном посещении пользователем сайта.</li>
        <li><strong>Собственные cookies (first-party cookies):</strong> Собственные cookies устанавливаются нами.</li>
        <li><strong>Сторонние cookies (third-party cookies):</strong> Сторонние cookies в основном используются рекламодателями (так называемыми третьими сторонами) для обработки информации о пользователях.</li>
        <li><strong>Необходимые (также: обязательные) cookies:</strong> Cookies могут быть необходимы для работы веб-сайта (например, для сохранения данных входа или иных пользовательских вводов, а также в целях безопасности).</li>
        <li><strong>Cookies для статистики, маркетинга и персонализации:</strong> Cookies также широко используются для измерения охвата веб-сайта, а также когда интересы или поведение пользователя сохраняются в пользовательском профиле. Такие профили используются, например, для отображения пользователям контента, соответствующего их возможным интересам.</li>
      </ul>
      <p>
        <strong>Информация о правовом основании:</strong> Правовое основание, на котором
        мы обрабатываем ваши персональные данные с помощью cookies, зависит от того,
        запрашиваем ли мы ваше согласие. Если это применимо и вы соглашаетесь на
        использование cookies, правовым основанием обработки ваших данных является ваше
        выраженное согласие. В противном случае данные, обрабатываемые с помощью cookies,
        обрабатываются на основании наших законных интересов (например, в сфере
        коммерческой эксплуатации нашего онлайн-сервиса и его улучшения) или, если
        использование cookies необходимо для выполнения наших договорных обязательств.
      </p>
      <p>
        <strong>Срок хранения:</strong> Если мы не предоставляем вам явной информации о
        сроке хранения постоянных cookies, примите, что срок хранения может составлять до
        двух лет.
      </p>
      <p>
        <strong>Общая информация об отзыве согласия и возражении (opt-out):</strong>{' '}
        Вы в любое время вправе возразить против обработки ваших данных с помощью
        технологий cookies или отозвать согласие. Первоначально вы можете заявить о своём
        возражении через настройки браузера, например путём отключения использования
        cookies (что также может ограничить функциональность наших онлайн-услуг).
        Возражение против использования cookies в целях онлайн-маркетинга может быть
        подано в отношении большого числа сервисов, особенно в случае отслеживания, через
        веб-сайты{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        и{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Мета-/коммуникационные данные (например, cookies).</dd>
        <dt>Субъекты данных</dt>
        <dd>Исследователи; участники.</dd>
        <dt>Правовое основание</dt>
        <dd>Согласие (Art. 6 (1) (a) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Коммерческие услуги ─────────────────────────────────────────────── */}
      <h2 id='m317'>Коммерческие услуги</h2>
      <p>
        Следующая информация о коммерческих услугах применяется только к исследователям,
        которые хотят выплачивать вознаграждение участникам через интеграцию платформы
        Samply со Stripe.
      </p>
      <p>
        Мы обрабатываем данные наших договорных и деловых партнёров, например клиентов и
        заинтересованных сторон (совокупно именуемых &quot;договорными партнёрами&quot;) в
        контексте договорных и аналогичных правовых отношений, а также связанных с ними
        действий и коммуникации с договорными партнёрами или в рамках преддоговорных
        отношений, например для ответа на запросы.
      </p>
      <p>
        Мы обрабатываем эти данные в целях выполнения наших договорных обязательств,
        защиты наших прав и для административных задач, связанных с этими данными и
        деловой организацией. Данные договорных партнёров передаются третьим сторонам
        только в рамках применимого законодательства, поскольку это необходимо для
        вышеуказанных целей, выполнения правовых обязательств или с согласия
        соответствующих субъектов данных.
      </p>
      <p>
        Мы удаляем данные по истечении установленных законом гарантийных и аналогичных
        обязательств, то есть, как правило, по истечении 4 лет, если данные не хранятся в
        учётной записи клиента или не должны храниться по правовым причинам архивирования
        (например, как правило, 10 лет в налоговых целях).
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Данные исследователя (например, имя, институт, электронная почта, язык); Данные участника (например, электронная почта, часовой пояс, временные предпочтения, код участника).</dd>
        <dt>Субъекты данных</dt>
        <dd>Исследователи; участники.</dd>
        <dt>Цели обработки</dt>
        <dd>Договорные услуги и поддержка; Контактные запросы и коммуникация; Офисные и организационные процедуры; Управление запросами и ответы на них; Меры безопасности.</dd>
        <dt>Правовое основание</dt>
        <dd>Исполнение договора и предварительные запросы (Art. 6 (1) (b) GDPR); Соблюдение правового обязательства (Art. 6 (1) (c) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Используемые сервисы и поставщики услуг:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Платформа обработки платежей. Поставщик услуг: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. Веб-сайт: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Политика конфиденциальности: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Регистрация ─────────────────────────────────────────────────────── */}
      <h2 id='m367'>Регистрация, вход и учётная запись пользователя</h2>
      <p>
        Пользователи могут создать учётную запись. В рамках регистрации пользователям
        сообщаются необходимые обязательные данные, которые обрабатываются в целях
        предоставления учётной записи на основании исполнения договорных обязательств.
        Обрабатываемые данные включают в первую очередь учётные данные для входа (имя,
        пароль и адрес электронной почты).
      </p>
      <p>
        Пользователи могут получать по электронной почте информацию, относящуюся к их
        учётной записи, например сведения о технических изменениях. Если пользователи
        закрыли свою учётную запись, их данные, связанные с учётной записью, удаляются
        при условии соблюдения установленных законом обязательств по хранению. Пользователи
        несут ответственность за сохранение своих данных до окончания срока действия
        договора в случае его расторжения. Мы вправе безвозвратно удалить все пользовательские
        данные, хранившиеся в течение срока действия договора.
      </p>
      <p>
        В рамках использования наших функций регистрации и входа, а также учётной записи
        пользователя мы сохраняем IP-адрес и время соответствующего действия пользователя.
        Хранение основано на наших законных интересах, а также на интересах пользователя в
        защите от злоупотреблений и иного несанкционированного использования. Эти данные
        не передаются третьим сторонам, если только это не необходимо для реализации наших
        требований или не существует правового обязательства.
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Данные исследователя (например, имя, электронная почта); Данные участника (например, электронная почта).</dd>
        <dt>Субъекты данных</dt>
        <dd>Исследователи; участники.</dd>
        <dt>Цели обработки</dt>
        <dd>Договорные услуги и поддержка; Меры безопасности; Управление запросами и ответы на них.</dd>
        <dt>Правовое основание</dt>
        <dd>Согласие (Art. 6 (1) (a) GDPR); Исполнение договора и предварительные запросы (Art. 6 (1) (b) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Обращение к нам ─────────────────────────────────────────────────── */}
      <h2 id='m182'>Обращение к нам</h2>
      <p>
        При обращении к нам (например, через контактную форму, по электронной почте,
        телефону или через социальные сети) данные обращающихся лиц обрабатываются в той
        мере, в которой это необходимо для ответа на контактные запросы и выполнения
        запрошенных действий.
      </p>
      <p>
        Ответ на контактные запросы в рамках договорных или преддоговорных отношений
        осуществляется в целях выполнения наших договорных обязательств или ответа на
        (пред)договорные запросы, а в остальных случаях — на основании законных интересов
        в части ответа на запросы.
      </p>
      <dl>
        <dt>Типы обрабатываемых данных</dt>
        <dd>Контактные данные (например, электронная почта, номера телефонов).</dd>
        <dt>Субъекты данных</dt>
        <dd>Исследователи; участники.</dd>
        <dt>Цели обработки</dt>
        <dd>Контактные запросы и коммуникация.</dd>
        <dt>Правовое основание</dt>
        <dd>Исполнение договора и предварительные запросы (Art. 6 (1) (b) GDPR); Законные интересы (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Удаление данных ─────────────────────────────────────────────────── */}
      <h2 id='m12'>Удаление данных</h2>
      <p>
        Обрабатываемые нами данные удаляются в соответствии с требованиями
        законодательства, как только отзывается согласие на их обработку или перестают
        действовать иные разрешения (например, если цель обработки данных больше не
        актуальна или данные не требуются для этой цели).
      </p>
      <p>
        Если данные не удаляются, поскольку они необходимы для других законно
        допустимых целей, их обработка ограничивается этими целями. Это означает, что
        данные блокируются и не обрабатываются в иных целях. Это применяется, например, к
        данным, которые должны храниться по коммерческим или налоговым причинам, или
        хранение которых необходимо для предъявления, осуществления или защиты правовых
        требований либо защиты прав другого физического или юридического лица.
      </p>

      {/* ── Изменения ───────────────────────────────────────────────────────── */}
      <h2 id='m15'>Изменения и обновления политики конфиденциальности</h2>
      <p>
        Мы просим вас регулярно знакомиться с содержанием нашей политики
        конфиденциальности. Мы будем корректировать политику конфиденциальности по мере
        необходимости, когда изменения в нашей практике обработки данных этого требуют. Мы
        уведомим вас, как только изменения потребуют вашего участия (например, согласия)
        или иного индивидуального уведомления.
      </p>
      <p>
        Если в настоящей политике конфиденциальности мы указываем адреса и контактные
        данные компаний и организаций, просим принять во внимание, что адреса могут
        меняться со временем, и проверить информацию перед обращением.
      </p>

      {/* ── Права субъектов данных ──────────────────────────────────────────── */}
      <h2 id='m10'>Права субъектов данных</h2>
      <p>
        Как субъект данных, вы имеете различные права в соответствии с GDPR, которые
        возникают в частности из статей 15–21 GDPR:
      </p>
      <ul>
        <li><strong>Право на возражение:</strong> Вы имеете право по причинам, связанным с вашей конкретной ситуацией, в любое время возразить против обработки ваших персональных данных, осуществляемой на основании статьи 6 (1) (e) или (f) GDPR, включая профилирование на основе этих положений.</li>
        <li><strong>Право на отзыв согласия:</strong> Вы имеете право отозвать данное согласие в любое время.</li>
        <li><strong>Право на доступ:</strong> Вы имеете право запросить подтверждение того, обрабатываются ли соответствующие данные, быть проинформированным об этих данных и получить дополнительную информацию и копию данных в соответствии с требованиями законодательства.</li>
        <li><strong>Право на исправление:</strong> Вы имеете право в соответствии с законодательством запросить дополнение данных, касающихся вас, или исправление неверных данных, касающихся вас.</li>
        <li><strong>Право на удаление и право на ограничение обработки:</strong> В соответствии с требованиями законодательства вы имеете право потребовать немедленного удаления соответствующих данных или, как альтернативу, потребовать ограничения обработки данных в соответствии с законодательными нормами.</li>
        <li><strong>Право на переносимость данных:</strong> Вы имеете право получить касающиеся вас данные, которые вы предоставили нам, в структурированном, общепринятом и машиночитаемом формате в соответствии с требованиями законодательства или запросить их передачу другому контролёру.</li>
        <li><strong>Жалоба в надзорный орган:</strong> Вы также имеете право при условиях, установленных законом, подать жалобу в надзорный орган, в частности в государстве-члене вашего обычного местожительства, места работы или места предполагаемого нарушения, если вы считаете, что обработка персональных данных, касающихся вас, нарушает GDPR.</li>
      </ul>

      {/* ── Терминология и определения ──────────────────────────────────────── */}
      <h2 id='m42'>Терминология и определения</h2>
      <p>
        В этом разделе приведён обзор терминов, используемых в настоящей политике
        конфиденциальности. Многие из них взяты из законодательства и определены главным
        образом в статье 4 GDPR. Следующие пояснения призваны прежде всего облегчить
        понимание.
      </p>
      <dl>
        <dt>Контролёр</dt>
        <dd>&quot;Контролёр&quot; означает физическое или юридическое лицо, государственный орган, агентство или иной субъект, который самостоятельно или совместно с другими определяет цели и средства обработки персональных данных.</dd>
        <dt>Персональные данные</dt>
        <dd>&quot;Персональные данные&quot; означают любую информацию, относящуюся к идентифицированному или идентифицируемому физическому лицу (&quot;субъект данных&quot;); идентифицируемым считается физическое лицо, которое можно прямо или косвенно идентифицировать, в частности посредством ссылки на идентификатор, такой как имя, идентификационный номер, данные о местоположении, онлайн-идентификатор или один или несколько факторов, специфичных для физической, физиологической, генетической, психической, экономической, культурной или социальной идентичности этого физического лица.</dd>
        <dt>Обработка</dt>
        <dd>Термин &quot;обработка&quot; охватывает широкий спектр и фактически любые операции с данными, будь то сбор, оценка, хранение, передача или удаление.</dd>
        <dt>Ремаркетинг</dt>
        <dd>&quot;Ремаркетинг&quot; или &quot;ретаргетинг&quot; — термин, используемый, например, для обозначения фиксирования в рекламных целях того, какими продуктами пользователь интересовался на веб-сайте, чтобы напоминать пользователю об этих продуктах на других веб-сайтах, например в рекламных объявлениях.</dd>
        <dt>Отслеживание (Tracking)</dt>
        <dd>&quot;Отслеживание&quot; (Tracking) — термин, применяемый в тех случаях, когда поведение пользователей можно проследить на нескольких веб-сайтах. Как правило, поведенческая информация и сведения об интересах в отношении используемых веб-сайтов хранятся в cookies или на серверах поставщиков технологий отслеживания (так называемое профилирование).</dd>
        <dt>Веб-аналитика</dt>
        <dd>Веб-аналитика служит для оценки посещаемости онлайн-сервисов и может определять поведение пользователей или их интересы в отношении определённой информации, такой как содержимое веб-сайтов. С помощью веб-аналитики владельцы веб-сайтов могут распознавать, в какое время посетители посещают их сайт и каким содержимым интересуются.</dd>
      </dl>
    </>
  );
}

function PolicyContentZh() {
  return (
    <>
      <p>
        在以下隐私政策中，我们希望告知您：我们处理哪些类型的个人数据（以下简称"数据"）、出于何种目的以及在何种范围内进行处理。本隐私政策适用于我们开展的所有个人数据处理活动，包括在提供服务的背景下，特别是在我们的网站、移动应用程序及外部在线渠道（如我们的社交媒体主页）中的数据处理（以下统称"在线服务"）。
      </p>
      <p>本文所用术语不区分性别。</p>
      <p><strong>最后更新：</strong>2024年12月3日</p>

      {/* ── 控制者 ──────────────────────────────────────────────────────── */}
      <h2 id='m3'>数据控制者</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>授权代表</dt>
        <dd>Yury Shevchenko</dd>
        <dt>电子邮件地址</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>电话</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>法律声明</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── 处理操作概览 ────────────────────────────────────────────────── */}
      <h2 id='mOverview'>处理操作概览</h2>
      <p>
        下表汇总了所处理数据的类别、处理目的及相关数据主体。
      </p>
      <h3>处理数据的类别</h3>
      <ul>
        <li>研究数据（例如文本条目、图像）</li>
        <li>研究者数据（例如姓名、机构、电子邮件、语言）</li>
        <li>参与者数据（例如电子邮件、时区、时间偏好、参与者编码）</li>
        <li>通知数据（例如标题、消息、网址、通知计划）</li>
        <li>通知时间戳（例如通知在应用中被接收的时间、在通知栏中被点击的时间、在应用中被打开的时间、被删除的时间、地理围栏事件、完成事件）</li>
        <li>元数据/通信数据（例如 Cookie）</li>
        <li>联系数据（例如电子邮件、电话号码）</li>
      </ul>
      <h3>数据主体类别</h3>
      <ul>
        <li>研究者</li>
        <li>参与者</li>
      </ul>
      <h3>处理目的</h3>
      <ul>
        <li>身份验证流程</li>
        <li>提供在线服务及保障可用性</li>
        <li>办公及组织管理程序</li>
        <li>反馈（例如通过在线表单收集反馈）</li>
        <li>联系请求与通信</li>
        <li>安全措施</li>
        <li>合同服务与支持</li>
        <li>管理并回复查询</li>
      </ul>

      {/* ── 处理的法律依据 ──────────────────────────────────────────────── */}
      <h2 id='m13'>数据处理的法律依据</h2>
      <p>
        以下我们将告知您《通用数据保护条例》（GDPR）中我们据以处理个人数据的法律依据。请注意，除GDPR的规定外，您所在国家或我们所在国家的国家数据保护法规也可能适用。如果在个别情况下还有更具体的法律依据适用，我们将在隐私声明中另行告知。
      </p>
      <ul>
        <li><strong>同意（Article 6 (1) (a) GDPR）</strong> — 数据主体已就一项或多项特定目的，同意处理其个人数据。</li>
        <li><strong>合同履行及缔约前请求（Article 6 (1) (b) GDPR）</strong> — 处理对于履行数据主体作为一方当事人的合同，或在订立合同前应数据主体要求采取措施而言是必要的。</li>
        <li><strong>履行法律义务（Article 6 (1) (c) GDPR）</strong> — 处理对于控制者履行其所承担的法律义务是必要的。</li>
        <li><strong>保护重大利益（Article 6 (1) (d) GDPR）</strong> — 处理对于保护数据主体或其他自然人的重大利益是必要的。</li>
        <li><strong>合法利益（Article 6 (1) (f) GDPR）</strong> — 处理对于控制者或第三方所追求的合法利益目的是必要的，但数据主体要求保护个人数据的利益或基本权利与自由凌驾于上述利益之上的情形除外。</li>
      </ul>
      <p>
        <strong>德国国家数据保护法规：</strong>除GDPR的数据保护规定外，德国的国家数据保护法规亦适用。其中尤其包括《防止数据处理中滥用个人数据法》（《联邦数据保护法》—— BDSG）。BDSG特别包含有关查阅权、删除权、异议权、特殊类别个人数据的处理、为其他目的的处理与传输，以及包含分析画像在内的自动化个人决策等方面的专项规定。此外，它还规范了就业关系目的下的数据处理（第26条 BDSG），特别是涉及劳动关系的建立、履行或终止以及员工同意等方面。各联邦州的数据保护法律亦可能适用。
      </p>

      {/* ── 移动应用 ────────────────────────────────────────────────────── */}
      <h2 id='m200'>Samply Research 移动应用的提供</h2>
      <p>
        <strong>用户提供的信息：</strong>应用程序会获取您在下载和注册应用程序时提供的信息。向我们注册是使用应用程序基本功能的必要条件。当您向我们注册并使用应用程序时，您将提供：(a) 您的电子邮件地址和密码；(b) 您的智能手机时区和语言；(c) 以下事件的时间戳：在应用中接收到通知、在通知栏中点击通知、在应用中打开通知、删除通知、完成问卷调查；(d) 您在联系我们寻求帮助时提供的信息；(e) 您在使用应用程序时输入系统的信息，例如加入研究时；(f) 如果您参加使用地理围栏功能的研究，则包括您的当前位置信息以及在使用应用程序时和应用程序关闭时的地理围栏事件时间戳。
      </p>
      <p>
        <strong>在后台使用您的当前位置：</strong>某些研究可能需要在您进入或离开特定地点（例如工作场所）时向您发送在线问卷调查链接。因此，如果您加入了使用此类参与者联系方式的研究，系统将请求您允许持续位置跟踪。如果您同意，即使应用程序关闭，该应用程序也会持续跟踪您的位置。应用程序不会与第三方服务或研究者共享您的位置数据。您的位置信息仅用于触发包含研究者创建的在线问卷链接的通知。您可以随时在应用程序中启用或禁用特定研究的位置跟踪。如果您不希望我们将您的位置用于上述目的，请在您的帐户设置或手机设置中关闭移动应用程序的位置服务，以及/或在移动应用程序内进行关闭。
      </p>
      <p>
        <strong>数据保留政策及信息管理：</strong>您可以通过删除帐户（在菜单项"更多"下，然后选择"设置"，再选择"删除我的帐户"）并卸载应用程序来停止应用程序收集所有信息。您可以使用移动设备上或通过移动应用程序市场或网络提供的标准卸载流程。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>研究数据；研究者数据；参与者数据；通知数据；通知时间戳。</dd>
        <dt>数据主体</dt>
        <dd>参与者。</dd>
        <dt>处理目的</dt>
        <dd>身份验证流程；提供在线服务及保障可用性；联系请求与通信；安全措施；管理并回复查询。</dd>
        <dt>法律依据</dt>
        <dd>同意（Art. 6 (1) (a) GDPR）；履行法律义务（Art. 6 (1) (c) GDPR）；保护重大利益（Art. 6 (1) (d) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>
      <p><strong>所使用的服务及服务提供商：</strong></p>
      <ul>
        <li><strong>Expo</strong> — 用于构建移动应用程序并发布到 Android 和 iOS 的工具包和平台。服务提供商：Expo。网站：<a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>。隐私政策：<a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>。</li>
        <li><strong>App Store</strong> — 适用于 iOS 和 iPadOS 操作系统的移动应用商店平台。服务提供商：Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A。网站：<a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>。隐私政策：<a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>。</li>
        <li><strong>Google Play</strong> — 适用于运行 Android 操作系统及其衍生系统以及 Chrome OS 设备的应用商店平台。服务提供商：Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A。网站：<a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>。隐私政策：<a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>。</li>
      </ul>

      {/* ── 网络托管 ────────────────────────────────────────────────────── */}
      <h2 id='m225'>在线服务的提供与网络托管</h2>
      <p>
        为了在 Samply 网站（https://samply.uni-konstanz.de/）上提供我们的在线服务，我们使用德国康斯坦茨大学的基础设施（包括网络服务器、计算能力、存储空间、数据库服务、安全及技术维护服务）。
      </p>
      <p>
        在提供网站服务过程中处理的数据，涵盖了在使用和通信过程中收集的所有与 Samply Research 移动应用程序及 Samply 网站用户相关的信息。参与者数据和通知时间戳存储在安全数据库中，仅供收集该数据的相应研究的研究者访问。研究者可通过 Samply 网站界面删除这些数据。
      </p>
      <p>
        <strong>电子邮件发送与托管：</strong>我们使用的网络托管服务还包括电子邮件的发送、接收和存储。为此，我们将处理收件人和发件人的地址，以及与电子邮件发送相关的其他信息（例如所涉及的服务提供商）和相应电子邮件的内容。上述数据也可能用于垃圾邮件检测目的。请注意，互联网上的电子邮件通常不以加密形式发送。一般而言，电子邮件在传输过程中会被加密，但在发送和接收它们的服务器上则不会加密（除非使用了所谓的端对端加密方式）。因此，我们无法对电子邮件从发件人传输到我们服务器的传输路径承担责任。
      </p>
      <p>
        <strong>访问数据与日志文件的收集：</strong>我们本身或我们的网络托管服务提供商，会根据每次对服务器的访问收集数据（即所谓的服务器日志文件）。服务器日志文件可能包括：所访问网页和文件的地址及名称、访问日期和时间、传输的数据量、成功访问通知、浏览器类型及版本、用户操作系统、引荐来源网址（此前访问的页面），以及通常情况下的 IP 地址和请求提供商。服务器日志文件可用于安全目的，例如避免服务器过载（尤其是在遭受恶意攻击即所谓 DDoS 攻击的情况下），并确保服务器的稳定性和最优负载均衡。
      </p>
      <p>
        <strong>数据保留政策及信息管理：</strong>网站用户（研究者和参与者）可通过 Samply 网站界面管理其帐户。用户可通过菜单项"帐户"，然后选择"删除我的帐户"来删除帐户。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>研究数据；研究者数据；参与者数据；通知数据；通知时间戳。</dd>
        <dt>数据主体</dt>
        <dd>研究者；参与者。</dd>
        <dt>处理目的</dt>
        <dd>身份验证流程；提供在线服务及保障可用性；联系请求与通信；安全措施；管理并回复查询。</dd>
        <dt>法律依据</dt>
        <dd>同意（Art. 6 (1) (a) GDPR）；履行法律义务（Art. 6 (1) (c) GDPR）；保护重大利益（Art. 6 (1) (d) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>
      <p><strong>所使用的服务及服务提供商：</strong></p>
      <ul>
        <li><strong>University web server</strong> — 服务提供商：University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany。网站：<a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>。隐私政策：<a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>。</li>
        <li><strong>Postmark</strong> — 事务性电子邮件服务。服务提供商：Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA。网站：<a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>。隐私政策：<a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>。</li>
      </ul>

      {/* ── 安全措施 ────────────────────────────────────────────────────── */}
      <h2 id='m27'>安全措施</h2>
      <p>
        我们根据法律要求，综合考虑现有技术水平、实施成本、处理的性质、范围、背景及目的，以及对自然人权利和自由构成的风险的不同可能性和严重程度，采取适当的技术和组织措施，以确保与风险相适应的安全保护水平。
      </p>
      <p>
        这些措施尤其包括：通过控制对数据的物理和电子访问，以及对数据的访问、输入、传输、保护和分离，来保障数据的保密性、完整性和可用性。此外，我们已建立相应程序，以确保数据主体权利得到尊重、数据得以删除，并确保我们能够快速应对数据威胁。此外，我们在开发或选择硬件、软件及服务提供商时，即已依照"隐私设计"和"默认隐私"原则，充分考虑个人数据保护。
      </p>
      <p>
        <strong>IP 地址屏蔽：</strong>一般情况下，研究者和参与者的 IP 地址不会被记录和存储。如果将来发生此类情况，我们将对您的 IP 地址进行缩短处理，或委托他人进行缩短处理。缩短 IP 地址（也称为"IP 屏蔽"）时，IP 地址的最后一个八位组（即 IP 地址的最后两位数字）将被删除。通过缩短 IP 地址，旨在防止或大幅增加根据 IP 地址识别个人的难度。
      </p>
      <p>
        <strong>SSL 加密（https）：</strong>为尽可能保护您通过我们在线服务传输的数据，我们使用 SSL 加密。您可以通过浏览器地址栏中的 https:// 前缀来识别此类加密连接。
      </p>

      {/* ── 个人数据的传输与披露 ────────────────────────────────────────── */}
      <h2 id='m25'>个人数据的传输与披露</h2>
      <p>
        在处理个人数据的过程中，数据可能被传输至其他地点、公司或个人，或向其披露。此类数据的接收方可能包括：支付交易背景下的支付机构、受委托执行 IT 任务的服务提供商，或嵌入网站的服务和内容提供商。在此类情况下，我们将遵守法律要求，特别是与数据接收方签订相应合同或协议，以保护您的数据。
      </p>

      {/* ── 第三国的数据处理 ────────────────────────────────────────────── */}
      <h2 id='m24'>第三国的数据处理</h2>
      <p>
        如果我们在第三国（即欧盟（EU）和欧洲经济区（EEA）以外）处理数据，或者数据处理发生在使用第三方服务或向其他个人、机构或公司披露或传输数据的背景下，则此类处理仅在符合法律要求的情况下进行。
      </p>
      <p>
        在获得明确同意或依合同或法律要求传输的情况下除外，我们仅在具有公认数据保护水平的第三国处理数据或委托处理数据，并以特殊保障为基础，例如通过欧盟委员会所谓的标准保护条款所产生的合同义务，或在认证或具有约束力的内部数据保护规定可为处理提供正当性的情况下进行（GDPR 第44至49条）。
      </p>

      {/* ── Cookie 的使用 ────────────────────────────────────────────────── */}
      <h2 id='m134'>Cookie 的使用</h2>
      <p>
        我们不使用第三方 Cookie，也不使用用于统计、营销和个性化目的的 Cookie。我们仅使用网站运营所必需的（基本）Cookie（例如用于用户身份验证）。
      </p>
      <p>
        Cookie 是文本文件，包含来自所访问网站或域名的数据，由浏览器存储在用户的计算机上。Cookie 主要用于在用户访问在线服务期间或之后存储有关用户的信息。所存储的信息可能包括：网站上的语言设置、登录状态、购物车或视频观看位置等。
      </p>
      <p><strong>Cookie 的类型和功能区分如下：</strong></p>
      <ul>
        <li><strong>临时 Cookie（也称：会话 Cookie）：</strong>临时 Cookie 最迟在用户离开在线服务并关闭浏览器后即被删除。</li>
        <li><strong>永久性 Cookie：</strong>永久性 Cookie 在关闭浏览器后仍保留存储。例如，可以保存登录状态，或在用户再次访问网站时直接显示偏好内容。</li>
        <li><strong>第一方 Cookie：</strong>第一方 Cookie 由我们自行设置。</li>
        <li><strong>第三方 Cookie：</strong>第三方 Cookie 主要由广告商（即所谓的第三方）用于处理用户信息。</li>
        <li><strong>必要（也称：基本）Cookie：</strong>Cookie 可能对于网站运营是必要的（例如保存登录信息或其他用户输入，或出于安全原因）。</li>
        <li><strong>统计、营销和个性化 Cookie：</strong>Cookie 通常也用于衡量网站的覆盖范围，以及在用户配置文件中存储用户的兴趣或行为。例如，此类配置文件用于向用户展示与其潜在兴趣相符的内容。</li>
      </ul>
      <p>
        <strong>法律依据说明：</strong>我们使用 Cookie 处理您个人数据的法律依据，取决于我们是否征求您的同意。如果适用且您同意使用 Cookie，则处理您数据的法律依据为您所表达的同意。否则，借助 Cookie 处理的数据将基于我们的合法利益（例如在线服务的商业运营及其改善）进行处理，或在使用 Cookie 对于履行我们的合同义务是必要的情况下进行处理。
      </p>
      <p>
        <strong>保留期限：</strong>除非我们向您明确告知永久性 Cookie 的保留期限，否则请假定保留期限最长可达两年。
      </p>
      <p>
        <strong>关于撤回同意和反对（选择退出）的一般信息：</strong>{' '}
        您有权随时反对使用 Cookie 技术处理您的数据，或撤回同意。您最初可以通过浏览器设置表达反对意见，例如通过停用 Cookie 的使用（但这也可能限制我们在线服务的功能）。对于将 Cookie 用于在线营销目的，可以通过以下网站针对大量服务（尤其是在跟踪方面）提出反对：{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        和{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>元数据/通信数据（例如 Cookie）。</dd>
        <dt>数据主体</dt>
        <dd>研究者；参与者。</dd>
        <dt>法律依据</dt>
        <dd>同意（Art. 6 (1) (a) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>

      {/* ── 商业服务 ────────────────────────────────────────────────────── */}
      <h2 id='m317'>商业服务</h2>
      <p>
        以下有关商业服务的信息仅适用于希望通过 Samply 平台与 Stripe 集成向参与者付款的研究者。
      </p>
      <p>
        我们在合同及类似法律关系的背景下处理合同合作伙伴和商业伙伴（例如客户和潜在客户，统称为"合同伙伴"）的数据，以及与合同伙伴相关的行为和通信，或在缔约前阶段（例如回复询价）中处理其数据。
      </p>
      <p>
        我们处理这些数据是为了履行合同义务、维护我们的权利，以及用于与这些数据相关的行政管理任务和业务组织。我们仅在适用法律范围内，在为上述目的所必要的范围内、为履行法律义务所必要的范围内，或在相关数据主体同意的情况下，将合同伙伴的数据传递给第三方。
      </p>
      <p>
        我们将在法定保修期及类似义务届满后删除数据，原则上为4年届满后，除非数据存储于客户帐户中，或须因法律归档原因而予以保留（例如出于税务目的通常为10年）。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>研究者数据（例如姓名、机构、电子邮件、语言）；参与者数据（例如电子邮件、时区、时间偏好、参与者编码）。</dd>
        <dt>数据主体</dt>
        <dd>研究者；参与者。</dd>
        <dt>处理目的</dt>
        <dd>合同服务与支持；联系请求与通信；办公及组织管理程序；管理并回复查询；安全措施。</dd>
        <dt>法律依据</dt>
        <dd>合同履行及缔约前请求（Art. 6 (1) (b) GDPR）；履行法律义务（Art. 6 (1) (c) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>
      <p><strong>所使用的服务及服务提供商：</strong></p>
      <ul>
        <li><strong>Stripe</strong> — 支付处理平台。服务提供商：Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States。网站：<a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>。隐私政策：<a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>。</li>
      </ul>

      {/* ── 注册、登录与用户帐户 ────────────────────────────────────────── */}
      <h2 id='m367'>注册、登录与用户帐户</h2>
      <p>
        用户可创建用户帐户。在注册过程中，系统将向用户告知所需的必填信息，并基于合同义务的履行，为提供用户帐户的目的处理这些信息。处理的数据尤其包括登录信息（姓名、密码和电子邮件地址）。
      </p>
      <p>
        用户可通过电子邮件收到与其用户帐户相关的信息，例如技术变更通知。如果用户终止其用户帐户，其与用户帐户相关的数据将被删除，但须遵守法定保留义务。用户有责任在合同终止时，在合同结束前对其数据进行备份。我们有权不可撤销地删除合同期间存储的所有用户数据。
      </p>
      <p>
        在使用我们的注册和登录功能以及用户帐户的过程中，我们会存储相应用户操作的 IP 地址和时间。存储基于我们的合法利益，以及用户免受滥用和其他未经授权使用的保护。这些数据不会传递给第三方，除非为了追求我们的权利主张而有此必要，或存在法律义务。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>研究者数据（例如姓名、电子邮件）；参与者数据（例如电子邮件）。</dd>
        <dt>数据主体</dt>
        <dd>研究者；参与者。</dd>
        <dt>处理目的</dt>
        <dd>合同服务与支持；安全措施；管理并回复查询。</dd>
        <dt>法律依据</dt>
        <dd>同意（Art. 6 (1) (a) GDPR）；合同履行及缔约前请求（Art. 6 (1) (b) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>

      {/* ── 联系我们 ────────────────────────────────────────────────────── */}
      <h2 id='m182'>联系我们</h2>
      <p>
        当您联系我们时（例如通过联系表单、电子邮件、电话或社交媒体），我们将在回复联系询问和处理任何所请求事项所必要的范围内，处理询问者的数据。
      </p>
      <p>
        在合同或缔约前关系框架内对联系询问的回复，是为了履行我们的合同义务或回应（缔约前）询问，其他情况则基于回复询问的合法利益。
      </p>
      <dl>
        <dt>处理的数据类型</dt>
        <dd>联系数据（例如电子邮件、电话号码）。</dd>
        <dt>数据主体</dt>
        <dd>研究者；参与者。</dd>
        <dt>处理目的</dt>
        <dd>联系请求与通信。</dd>
        <dt>法律依据</dt>
        <dd>合同履行及缔约前请求（Art. 6 (1) (b) GDPR）；合法利益（Art. 6 (1) (f) GDPR）。</dd>
      </dl>

      {/* ── 数据删除 ────────────────────────────────────────────────────── */}
      <h2 id='m12'>数据删除</h2>
      <p>
        我们处理的数据将在法律规定的范围内，一旦处理同意被撤销或其他许可不再适用（例如处理数据的目的不再成立，或数据已不再是实现该目的所必需的），即予以删除。
      </p>
      <p>
        如果数据因为其他合法目的所必需而未被删除，则其处理将被限制在这些目的范围内。这意味着数据将被限制，不会用于其他目的。例如，必须因商业或税务原因而保留的数据，或因主张、行使或捍卫法律主张，或保护其他自然人或法人的权利而必须保留的数据，均适用此规定。
      </p>

      {/* ── 隐私政策的变更与更新 ────────────────────────────────────────── */}
      <h2 id='m15'>隐私政策的变更与更新</h2>
      <p>
        我们恳请您定期了解我们隐私声明的内容。我们将在数据处理实践发生变化时对隐私政策进行相应调整。一旦变更需要您的配合（例如同意）或其他个别通知，我们将及时告知您。
      </p>
      <p>
        如果我们在本隐私政策中提供了公司和组织的地址及联系信息，请注意地址可能随时间发生变化，请在联系前核实相关信息。
      </p>

      {/* ── 数据主体的权利 ──────────────────────────────────────────────── */}
      <h2 id='m10'>数据主体的权利</h2>
      <p>
        作为数据主体，您根据 GDPR 享有多项权利，这些权利尤其源自 GDPR 第15至21条：
      </p>
      <ul>
        <li><strong>异议权：</strong>您有权基于与您特定情况相关的理由，随时对依据 GDPR 第6条第(1)款第(e)项或第(f)项进行的个人数据处理提出异议，包括对基于上述条款的分析画像提出异议。</li>
        <li><strong>撤回同意权：</strong>您有权随时撤回已给予的同意。</li>
        <li><strong>查阅权：</strong>您有权要求确认相关数据是否正在被处理，并获知这些数据，以及根据法律规定获取更多信息和数据副本。</li>
        <li><strong>更正权：</strong>您有权依法要求补充与您相关的数据，或更正与您相关的不正确数据。</li>
        <li><strong>删除权及限制处理权：</strong>依照法律规定，您有权要求立即删除相关数据，或作为替代要求依照法律规定限制数据处理。</li>
        <li><strong>数据可携权：</strong>您有权依照法律要求，以结构化、通用且机器可读的格式接收您向我们提供的相关数据，或要求将其传输给另一控制者。</li>
        <li><strong>向监管机构投诉：</strong>您还有权在法律规定的条件下，特别是在您惯常居所地、工作地或疑似侵权地所在成员国，向监管机构提出投诉，如果您认为涉及您的个人数据处理违反了 GDPR。</li>
      </ul>

      {/* ── 术语与定义 ──────────────────────────────────────────────────── */}
      <h2 id='m42'>术语与定义</h2>
      <p>
        本节概述本隐私政策中使用的术语。许多术语来源于法律，主要在 GDPR 第4条中予以定义。以下说明主要是为了便于理解。
      </p>
      <dl>
        <dt>控制者</dt>
        <dd>"控制者"是指单独或与他人共同决定个人数据处理目的和方式的自然人、法人、公共机构、代理机构或其他实体。</dd>
        <dt>个人数据</dt>
        <dd>"个人数据"是指与已识别或可识别的自然人（"数据主体"）相关的任何信息；可识别的自然人是指能够被直接或间接识别的人，尤其是通过姓名、识别号码、位置数据、在线标识符，或该自然人身体、生理、遗传、精神、经济、文化或社会身份特有的一项或多项因素加以识别的人。</dd>
        <dt>处理</dt>
        <dd>"处理"一词涵盖范围广泛，实际上涉及对数据的任何操作，无论是收集、评估、存储、传输还是删除。</dd>
        <dt>再营销</dt>
        <dd>"再营销"或"重定向"是指例如出于广告目的，记录用户在网站上对哪些产品感兴趣，以便在其他网站（例如广告中）提醒用户这些产品的做法。</dd>
        <dt>追踪（Tracking）</dt>
        <dd>"追踪"是指能够跨多个网站追踪用户行为的做法。通常，与所使用网站相关的行为和兴趣信息存储在 Cookie 中或追踪技术提供商的服务器上（即所谓的分析画像）。</dd>
        <dt>网络分析</dt>
        <dd>网络分析用于评估在线服务的访客流量，可以确定访客对特定信息（如网站内容）的行为或兴趣。借助网络分析，网站所有者可以识别访客何时访问其网站以及他们对哪些内容感兴趣。</dd>
      </dl>
    </>
  );
}

function PolicyContentKo() {
  return (
    <>
      <p>
        본 개인정보 처리방침을 통해 당사는 귀하의 개인정보(이하 &quot;데이터&quot;라 한다)의 유형,
        처리 목적 및 처리 범위에 대해 안내드리고자 합니다. 본 방침은 당사가 수행하는 모든
        개인정보 처리 활동에 적용되며, 이는 서비스 제공 맥락뿐만 아니라 당사 웹사이트,
        모바일 애플리케이션 및 소셜 미디어 프로필과 같은 외부 온라인 채널(이하
        &quot;온라인 서비스&quot;라 한다)에서의 처리를 포함합니다.
      </p>
      <p>본 문서에서 사용되는 용어는 성별에 관계없이 적용됩니다.</p>
      <p><strong>최종 업데이트:</strong> 2024년 12월 3일</p>

      {/* ── 개인정보 처리자 ────────────────────────────────────────────────── */}
      <h2 id='m3'>개인정보 처리자(Controller)</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>권한 있는 대표자</dt>
        <dd>Yury Shevchenko</dd>
        <dt>이메일 주소</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>전화</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>법적 고지</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── 처리 작업 개요 ─────────────────────────────────────────────────── */}
      <h2 id='mOverview'>처리 작업 개요</h2>
      <p>
        아래 표는 처리되는 데이터의 유형, 처리 목적 및 관련 정보주체를 요약하고 있습니다.
      </p>
      <h3>처리 데이터 유형</h3>
      <ul>
        <li>연구 데이터 (예: 텍스트 입력, 이미지)</li>
        <li>연구자 데이터 (예: 성명, 기관, 이메일, 언어)</li>
        <li>참여자 데이터 (예: 이메일, 시간대, 시간 선호도, 참여자 코드)</li>
        <li>알림 데이터 (예: 제목, 메시지, URL, 알림 일정)</li>
        <li>알림 타임스탬프 (예: 앱에서 알림을 수신한 시각, 알림 표시줄에서 탭한 시각, 앱에서 열린 시각, 삭제된 시각, 지오펜싱 이벤트, 완료 이벤트)</li>
        <li>메타/통신 데이터 (예: 쿠키)</li>
        <li>연락처 데이터 (예: 이메일, 전화번호)</li>
      </ul>
      <h3>정보주체 유형</h3>
      <ul>
        <li>연구자</li>
        <li>참여자</li>
      </ul>
      <h3>처리 목적</h3>
      <ul>
        <li>인증 절차</li>
        <li>온라인 서비스 제공 및 사용성 보장</li>
        <li>사무 및 조직 절차</li>
        <li>피드백 (예: 온라인 양식을 통한 피드백 수집)</li>
        <li>연락 요청 및 의사소통</li>
        <li>보안 조치</li>
        <li>계약적 서비스 및 지원</li>
        <li>문의사항 관리 및 응대</li>
      </ul>

      {/* ── 처리의 법적 근거 ───────────────────────────────────────────────── */}
      <h2 id='m13'>처리의 법적 근거</h2>
      <p>
        이하에서 당사는 개인정보를 처리하는 법적 근거인 일반 개인정보 보호법(GDPR)의
        관련 조항을 안내드립니다. GDPR 규정 외에도 귀하의 국가 또는 당사 소재국의
        국내 개인정보 보호 법규가 적용될 수 있음을 유의하시기 바랍니다. 개별 사안에서
        더 구체적인 법적 근거가 적용되는 경우, 본 방침에서 별도로 고지해 드리겠습니다.
      </p>
      <ul>
        <li><strong>동의 (Article 6 (1) (a) GDPR)</strong> — 정보주체가 하나 이상의 특정 목적을 위하여 자신의 개인정보 처리에 동의한 경우.</li>
        <li><strong>계약의 이행 및 계약 전 요청 (Article 6 (1) (b) GDPR)</strong> — 정보주체가 당사자인 계약의 이행을 위하거나, 계약 체결 전 정보주체의 요청에 따른 조치를 취하기 위하여 처리가 필요한 경우.</li>
        <li><strong>법적 의무의 이행 (Article 6 (1) (c) GDPR)</strong> — 처리자에게 적용되는 법적 의무의 이행을 위하여 처리가 필요한 경우.</li>
        <li><strong>중요한 이익의 보호 (Article 6 (1) (d) GDPR)</strong> — 정보주체 또는 다른 자연인의 중요한 이익을 보호하기 위하여 처리가 필요한 경우.</li>
        <li><strong>정당한 이익 (Article 6 (1) (f) GDPR)</strong> — 처리자 또는 제3자가 추구하는 정당한 이익을 위하여 처리가 필요한 경우. 단, 개인정보 보호를 요구하는 정보주체의 이익이나 기본권·기본자유가 우선하는 경우는 제외.</li>
      </ul>
      <p>
        <strong>독일의 국내 개인정보 보호 규정:</strong> GDPR의 개인정보 보호 규정에
        더하여, 독일에서는 국내 개인정보 보호 규정이 적용됩니다. 특히 데이터 처리에서
        개인정보의 오남용으로부터의 보호에 관한 법률(연방 개인정보 보호법 — BDSG)이
        포함됩니다. BDSG는 특히 열람권, 삭제권, 이의 제기권, 특수 유형 개인정보의
        처리, 다른 목적을 위한 처리 및 전송, 그리고 프로파일링을 포함한 자동화된
        개별 의사결정에 관한 특별 규정을 담고 있습니다. 또한 고용 관계 목적의 데이터
        처리(§ 26 BDSG), 특히 고용 관계의 수립·이행·종료 및 근로자의 동의에 관한
        사항을 규율합니다. 아울러 각 연방주의 개인정보 보호법이 적용될 수 있습니다.
      </p>

      {/* ── 모바일 앱 ─────────────────────────────────────────────────────── */}
      <h2 id='m200'>Samply Research 모바일 애플리케이션 제공</h2>
      <p>
        <strong>이용자 제공 정보:</strong> 애플리케이션은 귀하가 앱을 다운로드하고
        등록할 때 제공하는 정보를 수집합니다. 애플리케이션의 기본 기능을 이용하기
        위해서는 당사에 등록하는 것이 필수입니다. 당사에 등록하고 애플리케이션을
        이용하면, 귀하는 (a) 이메일 주소 및 비밀번호; (b) 스마트폰의 시간대 및 언어;
        (c) 다음 이벤트에 대한 타임스탬프: 앱에서 알림 수신, 알림 표시줄에서 알림 탭,
        앱에서 알림 열기, 알림 삭제, 설문 완료; (d) 도움을 요청하기 위해 연락할 때
        제공하는 정보; (e) 연구 참여 등 애플리케이션 이용 시 당사 시스템에 입력하는
        정보; (f) 지오펜싱을 사용하는 연구에 참여하는 경우, 애플리케이션 이용 중 및
        애플리케이션이 종료된 상태에서의 현재 위치 정보 및 지오펜싱 이벤트 타임스탬프를
        제공하게 됩니다.
      </p>
      <p>
        <strong>백그라운드에서 현재 위치 사용:</strong> 일부 연구에서는 귀하가 특정
        장소(예: 직장)에 진입하거나 이탈할 때 온라인 설문 링크를 전송해야 할 수 있습니다.
        이러한 이유로, 이 방식의 참여자 연락 방법을 사용하는 연구에 참여하는 경우,
        지속적인 위치 추적 허용을 요청받게 됩니다. 동의하시면 애플리케이션이 종료된
        상태에서도 애플리케이션이 귀하의 위치를 지속적으로 추적합니다. 애플리케이션은
        귀하의 위치 데이터를 제3자 서비스나 연구자와 공유하지 않습니다. 귀하의 위치
        정보는 연구자가 생성한 온라인 설문 링크가 포함된 알림을 전송하는 목적으로만
        사용됩니다. 특정 연구에 대한 위치 추적은 언제든지 애플리케이션 내에서 활성화하거나
        비활성화할 수 있습니다. 위에서 언급한 목적으로 당사가 귀하의 위치를 사용하는
        것을 원치 않으신다면, 계정 설정 또는 휴대폰 설정 및/또는 모바일 애플리케이션
        내에서 모바일 애플리케이션의 위치 서비스를 비활성화하시기 바랍니다.
      </p>
      <p>
        <strong>데이터 보유 정책 및 정보 관리:</strong> 애플리케이션에 의한 모든 정보
        수집을 중단하려면 계정을 삭제(메뉴 항목 &quot;더 보기&quot;, 이후 &quot;설정&quot;,
        이후 &quot;내 계정 삭제&quot;)하고 애플리케이션을 제거하시면 됩니다. 모바일
        기기 또는 모바일 애플리케이션 마켓이나 네트워크를 통해 제공되는 표준 제거
        절차를 이용하실 수 있습니다.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>연구 데이터; 연구자 데이터; 참여자 데이터; 알림 데이터; 알림 타임스탬프.</dd>
        <dt>정보주체</dt>
        <dd>참여자.</dd>
        <dt>처리 목적</dt>
        <dd>인증 절차; 온라인 서비스 제공 및 사용성 보장; 연락 요청 및 의사소통; 보안 조치; 문의사항 관리 및 응대.</dd>
        <dt>법적 근거</dt>
        <dd>동의 (Art. 6 (1) (a) GDPR); 법적 의무의 이행 (Art. 6 (1) (c) GDPR); 중요한 이익의 보호 (Art. 6 (1) (d) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>이용 중인 서비스 및 서비스 제공자:</strong></p>
      <ul>
        <li><strong>Expo</strong> — 모바일 애플리케이션을 구축하고 Android 및 iOS에 배포하기 위한 툴킷 및 플랫폼. 서비스 제공자: Expo. 웹사이트: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. 개인정보 처리방침: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — iOS 및 iPadOS 운영체제의 모바일 앱을 위한 앱 스토어 플랫폼. 서비스 제공자: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. 웹사이트: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. 개인정보 처리방침: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Android 운영체제 및 그 파생 시스템, Chrome OS를 실행하는 기기를 위한 앱 스토어 플랫폼. 서비스 제공자: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. 웹사이트: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. 개인정보 처리방침: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── 웹 호스팅 ─────────────────────────────────────────────────────── */}
      <h2 id='m225'>온라인 서비스 제공 및 웹 호스팅</h2>
      <p>
        Samply 웹사이트(https://samply.uni-konstanz.de/)에서 온라인 서비스를 제공하기
        위하여, 당사는 독일 콘스탄츠 대학교의 인프라(웹 서버, 컴퓨팅 용량, 저장 공간,
        데이터베이스 서비스, 보안 및 기술 유지보수 서비스)를 이용하고 있습니다.
      </p>
      <p>
        웹사이트 제공 과정에서 처리되는 데이터에는 이용 및 통신 과정에서 수집되는,
        Samply Research 모바일 애플리케이션 및 Samply 웹사이트 이용자에 관한 모든
        정보가 포함됩니다. 참여자 데이터 및 알림 타임스탬프는 보안 데이터베이스에
        저장되며, 해당 데이터를 수집한 연구를 담당하는 연구자만이 접근할 수 있습니다.
        연구자는 Samply 웹사이트 인터페이스를 통해 이 데이터를 삭제할 수 있습니다.
      </p>
      <p>
        <strong>이메일 발송 및 호스팅:</strong> 당사가 이용하는 웹 호스팅 서비스에는
        이메일의 발송, 수신 및 저장도 포함됩니다. 이를 위해 수신자 및 발신자의 주소,
        이메일 발송과 관련된 기타 정보(예: 관련 서비스 제공자) 및 해당 이메일의 내용이
        처리됩니다. 위 데이터는 스팸 탐지 목적으로도 처리될 수 있습니다. 인터넷상의
        이메일은 일반적으로 암호화되지 않은 상태로 전송됨을 유의하시기 바랍니다.
        이메일은 전송 중 암호화되는 것이 통례이나, 발송 및 수신 서버에서는 암호화되지
        않습니다(이른바 종단 간 암호화 방식이 사용되는 경우는 제외). 따라서 발신자로부터
        당사 서버에 수신되기까지의 이메일 전송 경로에 대한 책임은 당사가 부담하지
        않습니다.
      </p>
      <p>
        <strong>접속 데이터 및 로그 파일 수집:</strong> 당사 또는 당사의 웹 호스팅
        제공자는 서버에 대한 각 접속(이른바 서버 로그 파일)을 기반으로 데이터를
        수집합니다. 서버 로그 파일에는 접근된 웹 페이지 및 파일의 주소와 명칭, 접근
        일시, 전송된 데이터 용량, 성공적인 접근 여부 통지, 브라우저 유형 및 버전,
        이용자의 운영체제, 참조 URL(이전에 방문한 페이지) 및 원칙적으로 IP 주소와
        요청 서비스 제공자가 포함될 수 있습니다. 서버 로그 파일은 보안 목적(예: 서버
        과부하 방지, 특히 악의적 공격인 DDoS 공격의 경우) 및 서버의 안정성과 최적
        부하 분산 보장을 위해 활용될 수 있습니다.
      </p>
      <p>
        <strong>데이터 보유 정책 및 정보 관리:</strong>{' '}
        웹사이트 이용자(연구자 및 참여자)는 Samply 웹사이트 인터페이스를 통해 계정을
        관리할 수 있습니다. 이용자는 메뉴 항목 &quot;계정&quot;, 이후 &quot;내 계정
        삭제&quot;를 통해 계정을 삭제할 수 있습니다.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>연구 데이터; 연구자 데이터; 참여자 데이터; 알림 데이터; 알림 타임스탬프.</dd>
        <dt>정보주체</dt>
        <dd>연구자; 참여자.</dd>
        <dt>처리 목적</dt>
        <dd>인증 절차; 온라인 서비스 제공 및 사용성 보장; 연락 요청 및 의사소통; 보안 조치; 문의사항 관리 및 응대.</dd>
        <dt>법적 근거</dt>
        <dd>동의 (Art. 6 (1) (a) GDPR); 법적 의무의 이행 (Art. 6 (1) (c) GDPR); 중요한 이익의 보호 (Art. 6 (1) (d) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>이용 중인 서비스 및 서비스 제공자:</strong></p>
      <ul>
        <li><strong>University web server</strong> — 서비스 제공자: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. 웹사이트: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. 개인정보 처리방침: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — 트랜잭션 이메일 서비스. 서비스 제공자: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. 웹사이트: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. 개인정보 처리방침: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── 보안 조치 ─────────────────────────────────────────────────────── */}
      <h2 id='m27'>보안 조치</h2>
      <p>
        당사는 법적 요건에 따라, 기술 수준, 구현 비용, 처리의 성격·범위·맥락·목적,
        그리고 자연인의 권리와 자유에 대한 위험의 다양한 발생 가능성 및 심각성을
        고려하여, 위험에 상응하는 보호 수준을 보장하기 위한 적절한 기술적·조직적 조치를
        취합니다.
      </p>
      <p>
        이러한 조치에는 특히 데이터에 대한 물리적·전자적 접근 통제, 그리고 데이터의
        접근·입력·전송·보호 및 분리를 통해 데이터의 기밀성·무결성·가용성을 보장하는
        것이 포함됩니다. 또한 당사는 정보주체의 권리 존중, 데이터 삭제 및 데이터 위협에
        대한 신속한 대응을 보장하는 절차를 수립하였습니다. 아울러 당사는 하드웨어,
        소프트웨어 및 서비스 제공자를 개발하거나 선택하는 단계에서부터 개인정보 보호를
        설계(Privacy by Design) 및 기본값에 의한 개인정보 보호(Privacy by Default)
        원칙에 따라 고려합니다.
      </p>
      <p>
        <strong>IP 주소 마스킹:</strong> 일반적으로 연구자 및 참여자의 IP 주소는 기록
        및 저장되지 않습니다. 향후 이러한 상황이 발생하는 경우, 당사는 귀하의 IP
        주소를 단축하거나 단축 처리하도록 할 것입니다. IP 주소 단축, 즉 &quot;IP
        마스킹&quot;은 IP 주소의 마지막 옥텟(IP 주소의 마지막 두 자리)을 삭제하는
        방식으로 이루어집니다. IP 주소를 단축함으로써 IP 주소를 통한 개인 식별을
        방지하거나 현저히 어렵게 하는 것을 목적으로 합니다.
      </p>
      <p>
        <strong>SSL 암호화 (https):</strong> 당사의 온라인 서비스를 통해 전송되는
        귀하의 데이터를 최대한 보호하기 위해 SSL 암호화를 사용합니다. 이러한 암호화된
        연결은 브라우저 주소 표시줄의 https:// 접두사로 확인하실 수 있습니다.
      </p>

      {/* ── 개인정보의 전송 및 공개 ───────────────────────────────────────── */}
      <h2 id='m25'>개인정보의 전송 및 공개</h2>
      <p>
        개인정보 처리 과정에서 데이터가 다른 장소, 기업 또는 개인에게 전송되거나
        공개될 수 있습니다. 이러한 데이터의 수신자에는 예를 들어 결제 거래 맥락에서의
        결제 기관, IT 업무를 위탁받은 서비스 제공자, 또는 웹사이트에 내장된 서비스 및
        콘텐츠 제공자가 포함될 수 있습니다. 이 경우 법적 요건을 준수하며, 특히 귀하의
        데이터 보호를 위한 계약 또는 협약을 데이터 수신자와 체결합니다.
      </p>

      {/* ── 제3국에서의 데이터 처리 ───────────────────────────────────────── */}
      <h2 id='m24'>제3국에서의 데이터 처리</h2>
      <p>
        당사가 제3국(즉 유럽연합(EU), 유럽경제지역(EEA) 외 국가)에서 데이터를 처리하거나,
        제3자 서비스 이용 또는 다른 개인·기관·기업에 대한 데이터 공개·전송의 맥락에서
        처리가 이루어지는 경우, 이는 법적 요건에 따라서만 이루어집니다.
      </p>
      <p>
        명시적 동의 또는 계약이나 법률에 의해 요구되는 전송을 조건으로, 당사는 공인된
        수준의 데이터 보호를 갖춘 제3국에서만, 또는 유럽 집행위원회의 이른바 표준 보호
        조항에 의한 계약상 의무 등 특별한 보장을 기반으로, 또는 인증이나 구속력 있는
        내부 데이터 보호 규정이 처리를 정당화하는 경우에만 데이터를 처리하거나 처리되도록
        합니다 (GDPR 제44조 내지 제49조).
      </p>

      {/* ── 쿠키 사용 ─────────────────────────────────────────────────────── */}
      <h2 id='m134'>쿠키 사용</h2>
      <p>
        당사는 제3자 쿠키 또는 통계, 마케팅 및 개인화 목적의 쿠키를 사용하지 않습니다.
        당사는 웹사이트 운영에 필요한 필수(essential) 쿠키(예: 이용자 인증)만을 사용합니다.
      </p>
      <p>
        쿠키는 방문한 웹사이트 또는 도메인의 데이터를 포함하는 텍스트 파일로, 브라우저에
        의해 이용자의 컴퓨터에 저장됩니다. 쿠키는 주로 온라인 서비스 방문 중 또는 방문 후
        이용자에 관한 정보를 저장하는 데 사용됩니다. 저장되는 정보에는 예를 들어 웹사이트의
        언어 설정, 로그인 상태, 장바구니 또는 동영상을 시청한 위치가 포함될 수 있습니다.
      </p>
      <p><strong>쿠키의 유형과 기능은 다음과 같이 구분됩니다:</strong></p>
      <ul>
        <li><strong>임시 쿠키(세션 쿠키):</strong> 임시 쿠키는 이용자가 온라인 서비스를 떠나고 브라우저를 종료한 후 늦어도 삭제됩니다.</li>
        <li><strong>영구 쿠키:</strong> 영구 쿠키는 브라우저를 종료한 후에도 저장된 상태로 유지됩니다. 예를 들어 로그인 상태를 저장하거나 이용자가 웹사이트를 다시 방문할 때 선호 콘텐츠를 즉시 표시할 수 있습니다.</li>
        <li><strong>자사 쿠키(First-party cookies):</strong> 자사 쿠키는 당사 자체적으로 설정합니다.</li>
        <li><strong>제3자 쿠키(Third-party cookies):</strong> 제3자 쿠키는 주로 광고주(이른바 제3자)가 이용자 정보를 처리하기 위해 사용합니다.</li>
        <li><strong>필수(essential) 쿠키:</strong> 쿠키는 웹사이트 운영에 필요할 수 있습니다(예: 로그인 또는 기타 이용자 입력 저장, 보안 목적).</li>
        <li><strong>통계·마케팅·개인화 쿠키:</strong> 쿠키는 웹사이트의 도달 범위 측정 및 이용자 관심사나 행동이 이용자 프로필에 저장되는 경우에도 일반적으로 사용됩니다. 이러한 프로필은 예를 들어 이용자의 잠재적 관심사에 맞는 콘텐츠를 표시하는 데 활용됩니다.</li>
      </ul>
      <p>
        <strong>법적 근거에 관한 안내:</strong> 쿠키를 통해 귀하의 개인정보를 처리하는
        법적 근거는 당사가 귀하의 동의를 구하는지 여부에 따라 달라집니다. 해당하는
        경우이고 귀하가 쿠키 사용에 동의하면, 귀하의 데이터 처리에 대한 법적 근거는
        귀하의 명시적 동의입니다. 그렇지 않은 경우, 쿠키를 통해 처리되는 데이터는
        당사의 정당한 이익(예: 온라인 서비스의 사업적 운영 및 개선)을 근거로 처리되거나,
        쿠키 사용이 계약상 의무 이행에 필요한 경우에 처리됩니다.
      </p>
      <p>
        <strong>보유 기간:</strong> 영구 쿠키의 보유 기간에 관한 명시적인 정보를 제공하지
        않는 경우, 보유 기간이 최대 2년에 이를 수 있다고 가정하시기 바랍니다.
      </p>
      <p>
        <strong>동의 철회 및 이의 제기(옵트아웃)에 관한 일반 정보:</strong>{' '}
        귀하는 언제든지 쿠키 기술을 이용한 데이터 처리에 이의를 제기하거나 동의를 철회할
        수 있습니다. 먼저 브라우저 설정을 통해 이의를 제기하실 수 있으며, 예를 들어
        쿠키 사용을 비활성화할 수 있습니다(이 경우 당사 온라인 서비스의 기능이 제한될
        수 있습니다). 온라인 마케팅 목적의 쿠키 사용에 대한 이의 제기는, 특히 추적과
        관련하여 다수의 서비스에 대해 다음 웹사이트를 통해 제기할 수 있습니다:{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        및{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>메타/통신 데이터 (예: 쿠키).</dd>
        <dt>정보주체</dt>
        <dd>연구자; 참여자.</dd>
        <dt>법적 근거</dt>
        <dd>동의 (Art. 6 (1) (a) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── 상업적 서비스 ─────────────────────────────────────────────────── */}
      <h2 id='m317'>상업적 서비스</h2>
      <p>
        아래 상업적 서비스에 관한 정보는 Samply 플랫폼과 Stripe 연동을 통해 참여자에게
        보상을 지급하고자 하는 연구자에게만 적용됩니다.
      </p>
      <p>
        당사는 계약적·비교적 법률 관계의 맥락에서, 그리고 계약 파트너와의 관련 행위 및
        의사소통 또는 계약 전 단계(예: 문의에 대한 응답)에서 계약 파트너 및 비즈니스
        파트너(예: 고객 및 잠재 고객, 이하 &quot;계약 파트너&quot;라 한다)의 데이터를
        처리합니다.
      </p>
      <p>
        당사는 계약상 의무를 이행하고, 당사의 권리를 보호하며, 해당 데이터 및 사업 조직과
        관련된 행정적 업무를 위해 이 데이터를 처리합니다. 당사는 적용 법률의 범위 내에서,
        위에서 언급한 목적을 위해 필요하거나 법적 의무를 이행하기 위해 필요하거나 관련
        정보주체의 동의를 받은 경우에만 계약 파트너의 데이터를 제3자에게 전달합니다.
      </p>
      <p>
        당사는 법정 보증 기간 및 이에 상응하는 의무가 만료된 후, 즉 원칙적으로 4년이
        경과한 후 데이터를 삭제합니다. 단, 데이터가 고객 계정에 저장되거나 법적 보관
        사유(예: 일반적으로 세무 목적으로 10년)에 따라 보관이 필요한 경우는 예외로 합니다.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>연구자 데이터 (예: 성명, 기관, 이메일, 언어); 참여자 데이터 (예: 이메일, 시간대, 시간 선호도, 참여자 코드).</dd>
        <dt>정보주체</dt>
        <dd>연구자; 참여자.</dd>
        <dt>처리 목적</dt>
        <dd>계약적 서비스 및 지원; 연락 요청 및 의사소통; 사무 및 조직 절차; 문의사항 관리 및 응대; 보안 조치.</dd>
        <dt>법적 근거</dt>
        <dd>계약의 이행 및 계약 전 요청 (Art. 6 (1) (b) GDPR); 법적 의무의 이행 (Art. 6 (1) (c) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>이용 중인 서비스 및 서비스 제공자:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — 결제 처리 플랫폼. 서비스 제공자: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. 웹사이트: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. 개인정보 처리방침: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── 등록, 로그인 및 이용자 계정 ──────────────────────────────────── */}
      <h2 id='m367'>등록, 로그인 및 이용자 계정</h2>
      <p>
        이용자는 이용자 계정을 생성할 수 있습니다. 등록 과정에서 필수 정보가 이용자에게
        고지되며, 계약상 의무 이행을 근거로 이용자 계정을 제공하기 위한 목적으로
        처리됩니다. 처리되는 데이터에는 특히 로그인 정보(성명, 비밀번호 및 이메일
        주소)가 포함됩니다.
      </p>
      <p>
        이용자는 기술적 변경 사항 등 이용자 계정과 관련된 정보를 이메일로 받을 수
        있습니다. 이용자가 이용자 계정을 해지한 경우, 법정 보관 의무에 따르는 것을
        조건으로 이용자 계정과 관련된 데이터가 삭제됩니다. 계약 해지 시 계약 종료 전에
        데이터를 보관하는 것은 이용자의 책임입니다. 당사는 계약 기간 동안 저장된 모든
        이용자 데이터를 영구적으로 삭제할 권리가 있습니다.
      </p>
      <p>
        당사의 등록 및 로그인 기능 이용과 이용자 계정 사용 과정에서, 당사는 해당
        이용자 행위의 IP 주소와 시각을 저장합니다. 저장은 당사의 정당한 이익과 이용자의
        남용 및 기타 무단 사용으로부터의 보호를 근거로 이루어집니다. 이 데이터는 당사의
        권리 주장을 위해 필요하거나 법적 의무가 있는 경우를 제외하고 제3자에게 제공되지
        않습니다.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>연구자 데이터 (예: 성명, 이메일); 참여자 데이터 (예: 이메일).</dd>
        <dt>정보주체</dt>
        <dd>연구자; 참여자.</dd>
        <dt>처리 목적</dt>
        <dd>계약적 서비스 및 지원; 보안 조치; 문의사항 관리 및 응대.</dd>
        <dt>법적 근거</dt>
        <dd>동의 (Art. 6 (1) (a) GDPR); 계약의 이행 및 계약 전 요청 (Art. 6 (1) (b) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── 연락처 ────────────────────────────────────────────────────────── */}
      <h2 id='m182'>당사에 연락하기</h2>
      <p>
        당사에 연락하시는 경우(예: 연락처 양식, 이메일, 전화 또는 소셜 미디어를 통해),
        문의에 응답하고 요청된 활동을 처리하기 위해 필요한 범위 내에서 문의자의 데이터가
        처리됩니다.
      </p>
      <p>
        계약적 또는 계약 전 관계의 맥락에서의 문의에 대한 응답은 당사의 계약상 의무를
        이행하거나 (계약 전) 문의에 응답하기 위해 이루어지며, 그 외의 경우에는 문의
        응답에 관한 정당한 이익을 근거로 이루어집니다.
      </p>
      <dl>
        <dt>처리 데이터 유형</dt>
        <dd>연락처 데이터 (예: 이메일, 전화번호).</dd>
        <dt>정보주체</dt>
        <dd>연구자; 참여자.</dd>
        <dt>처리 목적</dt>
        <dd>연락 요청 및 의사소통.</dd>
        <dt>법적 근거</dt>
        <dd>계약의 이행 및 계약 전 요청 (Art. 6 (1) (b) GDPR); 정당한 이익 (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── 데이터 삭제 ───────────────────────────────────────────────────── */}
      <h2 id='m12'>데이터 삭제</h2>
      <p>
        당사가 처리하는 데이터는 법적 규정에 따라, 처리에 대한 동의가 철회되거나 기타
        허가가 더 이상 적용되지 않는 경우(예: 해당 데이터의 처리 목적이 더 이상 적용되지
        않거나 해당 목적에 필요하지 않은 경우)에 삭제됩니다.
      </p>
      <p>
        다른 법적으로 허용되는 목적을 위해 필요한 경우 데이터가 삭제되지 않는 경우,
        해당 처리는 그러한 목적으로 제한됩니다. 즉, 해당 데이터는 제한되며 다른 목적을
        위해 처리되지 않습니다. 예를 들어 상업적 또는 세무적 이유로 보관이 필요하거나
        법적 청구의 주장·행사·방어 또는 다른 자연인이나 법인의 권리 보호를 위해 보관이
        필요한 데이터가 이에 해당합니다.
      </p>

      {/* ── 개인정보 처리방침의 변경 및 업데이트 ─────────────────────────── */}
      <h2 id='m15'>개인정보 처리방침의 변경 및 업데이트</h2>
      <p>
        당사의 개인정보 보호 방침의 내용을 정기적으로 확인하시기 바랍니다. 당사는 데이터
        처리 관행의 변경이 필요한 경우 개인정보 처리방침을 조정할 것입니다. 변경 사항이
        귀하의 협력(예: 동의) 또는 기타 개별 통지를 필요로 하는 즉시 이를 알려드리겠습니다.
      </p>
      <p>
        본 개인정보 처리방침에서 기업 및 조직의 주소와 연락처 정보를 제공하는 경우,
        주소는 시간이 지남에 따라 변경될 수 있으므로 연락하기 전에 정보를 확인하시기
        바랍니다.
      </p>

      {/* ── 정보주체의 권리 ───────────────────────────────────────────────── */}
      <h2 id='m10'>정보주체의 권리</h2>
      <p>
        정보주체로서 귀하는 GDPR에 따라 다양한 권리를 가지며, 이는 특히 GDPR 제15조
        내지 제21조에 따라 발생합니다:
      </p>
      <ul>
        <li><strong>이의 제기권:</strong> 귀하는 귀하의 특정 상황에서 비롯된 사유를 근거로, GDPR 제6조 제1항 제(e)호 또는 제(f)호에 근거하여 수행되는 귀하의 개인정보 처리(이에 근거한 프로파일링 포함)에 대하여 언제든지 이의를 제기할 권리가 있습니다.</li>
        <li><strong>동의 철회권:</strong> 귀하는 동의를 언제든지 철회할 권리가 있습니다.</li>
        <li><strong>열람권:</strong> 귀하는 해당 데이터가 처리되는지 여부의 확인을 요청하고, 법적 규정에 따라 해당 데이터에 대한 정보 및 추가 정보와 데이터 사본을 제공받을 권리가 있습니다.</li>
        <li><strong>정정권:</strong> 귀하는 법적 규정에 따라 귀하에 관한 데이터의 보완 또는 귀하에 관한 부정확한 데이터의 정정을 요청할 권리가 있습니다.</li>
        <li><strong>삭제권 및 처리 제한권:</strong> 법적 규정에 따라 귀하는 해당 데이터의 즉각적인 삭제를 요구하거나, 또는 대안으로 법적 규정에 따른 처리 제한을 요구할 권리가 있습니다.</li>
        <li><strong>데이터 이동권:</strong> 귀하는 법적 요건에 따라 귀하가 당사에 제공한 귀하에 관한 데이터를 구조화된, 통용되는, 기계 판독 가능한 형식으로 수령하거나, 다른 처리자에게 전송할 것을 요청할 권리가 있습니다.</li>
        <li><strong>감독 기관에 대한 불만 제기:</strong> 귀하는 또한 법적 조건에 따라, 특히 귀하의 일상적인 거주지, 근무지 또는 침해 혐의지 소재 회원국의 감독 기관에 불만을 제기할 권리가 있으며, 이는 귀하에 관한 개인정보 처리가 GDPR을 위반한다고 판단되는 경우에 해당합니다.</li>
      </ul>

      {/* ── 용어 및 정의 ──────────────────────────────────────────────────── */}
      <h2 id='m42'>용어 및 정의</h2>
      <p>
        본 절에서는 본 개인정보 처리방침에서 사용되는 용어에 대한 개요를 제공합니다.
        많은 용어는 법률에서 도출되며 주로 GDPR 제4조에서 정의됩니다. 다음의 설명은
        주로 이해를 돕기 위한 것입니다.
      </p>
      <dl>
        <dt>처리자(Controller)</dt>
        <dd>&quot;처리자(Controller)&quot;란 단독으로 또는 다른 자와 공동으로 개인정보 처리의 목적과 수단을 결정하는 자연인, 법인, 공공기관, 기관 또는 기타 단체를 말합니다.</dd>
        <dt>개인정보</dt>
        <dd>&quot;개인정보&quot;란 식별되었거나 식별 가능한 자연인(&quot;정보주체&quot;)과 관련된 모든 정보를 말합니다. 식별 가능한 자연인이란 특히 성명, 식별 번호, 위치 데이터, 온라인 식별자와 같은 식별자를 참조하거나, 해당 자연인의 신체적·생리적·유전적·정신적·경제적·문화적·사회적 정체성에 특유한 하나 이상의 요소를 참조하여 직접 또는 간접적으로 식별될 수 있는 자를 말합니다.</dd>
        <dt>처리</dt>
        <dd>&quot;처리&quot;라는 용어는 수집, 평가, 저장, 전송 또는 삭제 등 데이터에 관한 사실상 모든 취급을 포괄하는 광범위한 개념입니다.</dd>
        <dt>리마케팅(Remarketing)</dt>
        <dd>&quot;리마케팅&quot; 또는 &quot;리타게팅&quot;은 예를 들어 광고 목적으로 이용자가 웹사이트에서 관심을 보인 제품을 기록하여, 다른 웹사이트(예: 광고)에서 해당 제품을 이용자에게 상기시키는 데 사용되는 용어입니다.</dd>
        <dt>추적(Tracking)</dt>
        <dd>&quot;추적&quot;은 여러 웹사이트에서 이용자의 행동을 추적할 수 있는 경우에 사용되는 용어입니다. 일반적으로 이용된 웹사이트와 관련된 행동 및 관심사 정보는 쿠키 또는 추적 기술 제공자의 서버에 저장됩니다(이른바 프로파일링).</dd>
        <dt>웹 분석(Web Analytics)</dt>
        <dd>웹 분석은 온라인 서비스의 방문자 트래픽을 평가하는 데 사용되며, 이용자의 행동이나 웹사이트 콘텐츠 등 특정 정보에 대한 관심을 파악할 수 있습니다. 웹 분석을 통해 웹사이트 운영자는 방문자가 언제 웹사이트를 방문하고 어떤 콘텐츠에 관심을 갖는지 파악할 수 있습니다.</dd>
      </dl>
    </>
  );
}

function PolicyContentIt() {
  return (
    <>
      <p>
        Con la seguente informativa sulla privacy desideriamo informarLa in merito alle
        tipologie di dati personali (di seguito anche abbreviati come &quot;dati&quot;)
        che trattiamo, alle finalità e all&apos;entità del trattamento. L&apos;informativa
        si applica a tutti i trattamenti di dati personali da noi effettuati, sia nel contesto
        della fornitura dei nostri servizi sia, in particolare, sui nostri siti web, nelle
        applicazioni mobili e nelle presenze online esterne, come i nostri profili sui social
        media (di seguito collettivamente denominati &quot;servizi online&quot;).
      </p>
      <p>I termini utilizzati non hanno connotazione di genere.</p>
      <p><strong>Ultimo aggiornamento:</strong> 3 dicembre 2024</p>

      {/* ── Titolare del trattamento ────────────────────────────────────────── */}
      <h2 id='m3'>Titolare del trattamento</h2>
      <p>
        iScience Research Group / University of Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Germany
      </p>
      <dl>
        <dt>Rappresentanti autorizzati</dt>
        <dd>Yury Shevchenko</dd>
        <dt>Indirizzo e-mail</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Telefono</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Note legali</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Panoramica delle operazioni di trattamento ──────────────────────── */}
      <h2 id='mOverview'>Panoramica delle operazioni di trattamento</h2>
      <p>
        La tabella seguente riassume le tipologie di dati trattati, le finalità del trattamento
        e gli interessati coinvolti.
      </p>
      <h3>Categorie di dati trattati</h3>
      <ul>
        <li>Dati di studio (ad es. inserimenti di testo, immagini)</li>
        <li>Dati del ricercatore (ad es. nome, istituto, e-mail, lingua)</li>
        <li>Dati del partecipante (ad es. e-mail, fuso orario, preferenze orarie, codice partecipante)</li>
        <li>Dati delle notifiche (ad es. titolo, messaggio, URL, pianificazione delle notifiche)</li>
        <li>Timestamp delle notifiche (ad es. quando una notifica è stata ricevuta nell&apos;app, toccata nella barra delle notifiche, aperta nell&apos;app, eliminata, evento di geofencing, evento di completamento)</li>
        <li>Dati meta/comunicazione (ad es. cookie)</li>
        <li>Dati di contatto (ad es. e-mail, numeri di telefono)</li>
      </ul>
      <h3>Categorie di interessati</h3>
      <ul>
        <li>Ricercatori</li>
        <li>Partecipanti</li>
      </ul>
      <h3>Finalità del trattamento</h3>
      <ul>
        <li>Processi di autenticazione</li>
        <li>Fornitura dei nostri servizi online e fruibilità</li>
        <li>Procedure amministrative e organizzative</li>
        <li>Feedback (ad es. raccolta di feedback tramite modulo online)</li>
        <li>Richieste di contatto e comunicazione</li>
        <li>Misure di sicurezza</li>
        <li>Servizi contrattuali e assistenza</li>
        <li>Gestione e risposta alle richieste</li>
      </ul>

      {/* ── Basi giuridiche del trattamento ─────────────────────────────────── */}
      <h2 id='m13'>Basi giuridiche del trattamento</h2>
      <p>
        Di seguito La informiamo in merito alle basi giuridiche del Regolamento generale sulla
        protezione dei dati (GDPR) sulla base delle quali trattiamo i dati personali. Si noti
        che, oltre alle disposizioni del GDPR, possono applicarsi le normative nazionali in
        materia di protezione dei dati nel Suo Paese o nel Paese in cui risediamo o abbiamo
        sede. Qualora in singoli casi si applichino basi giuridiche più specifiche, La
        informeremo in merito nella presente informativa.
      </p>
      <ul>
        <li><strong>Consenso (Article 6 (1) (a) GDPR)</strong> — L&apos;interessato ha espresso il consenso al trattamento dei propri dati personali per una o più specifiche finalità.</li>
        <li><strong>Esecuzione di un contratto e richieste precontrattuali (Article 6 (1) (b) GDPR)</strong> — Il trattamento è necessario all&apos;esecuzione di un contratto di cui l&apos;interessato è parte o all&apos;esecuzione di misure precontrattuali adottate su richiesta dello stesso.</li>
        <li><strong>Adempimento di un obbligo legale (Article 6 (1) (c) GDPR)</strong> — Il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il titolare del trattamento.</li>
        <li><strong>Tutela degli interessi vitali (Article 6 (1) (d) GDPR)</strong> — Il trattamento è necessario per salvaguardare gli interessi vitali dell&apos;interessato o di un&apos;altra persona fisica.</li>
        <li><strong>Legittimo interesse (Article 6 (1) (f) GDPR)</strong> — Il trattamento è necessario per il perseguimento del legittimo interesse del titolare del trattamento o di terzi, a condizione che non prevalgano gli interessi o i diritti e le libertà fondamentali dell&apos;interessato che richiedono la protezione dei dati personali.</li>
      </ul>
      <p>
        <strong>Normativa nazionale sulla protezione dei dati in Germania:</strong> In
        aggiunta alle disposizioni del GDPR, si applicano in Germania le normative nazionali
        in materia di protezione dei dati. Queste includono in particolare la legge sulla
        tutela dall&apos;uso illecito di dati personali nel trattamento dei dati (Legge
        federale sulla protezione dei dati — BDSG). Il BDSG contiene in particolare
        disposizioni speciali in merito al diritto di accesso, al diritto alla cancellazione,
        al diritto di opposizione, al trattamento di categorie particolari di dati personali,
        al trattamento per altre finalità e alla trasmissione, nonché al processo decisionale
        automatizzato individuale, compresa la profilazione. Disciplina inoltre il trattamento
        dei dati per finalità del rapporto di lavoro (§ 26 BDSG), in particolare per quanto
        riguarda l&apos;instaurazione, l&apos;esecuzione o la cessazione del rapporto di
        lavoro e il consenso dei dipendenti. Possono altresì applicarsi le leggi sulla
        protezione dei dati dei singoli Länder.
      </p>

      {/* ── Applicazione mobile ──────────────────────────────────────────────── */}
      <h2 id='m200'>Fornitura dell&apos;applicazione mobile Samply Research</h2>
      <p>
        <strong>Informazioni fornite dall&apos;utente:</strong> L&apos;applicazione acquisisce
        le informazioni da Lei fornite al momento del download e della registrazione
        dell&apos;applicazione. La registrazione è obbligatoria per poter utilizzare le
        funzionalità di base dell&apos;applicazione. In fase di registrazione e utilizzo
        dell&apos;applicazione, Lei fornisce (a) il Suo indirizzo e-mail e la Sua password;
        (b) il fuso orario e la lingua del Suo smartphone; (c) i timestamp per i seguenti
        eventi: ricezione di una notifica nell&apos;app, tocco sulla notifica nella barra
        delle notifiche, apertura di una notifica nell&apos;app, eliminazione di una notifica,
        completamento di un sondaggio; (d) le informazioni che fornisce quando ci contatta per
        assistenza; (e) le informazioni che inserisce nel nostro sistema durante l&apos;utilizzo
        dell&apos;applicazione, ad esempio in occasione dell&apos;adesione a uno studio; (f) le
        informazioni sulla Sua posizione attuale e i timestamp degli eventi di geofencing
        durante l&apos;utilizzo dell&apos;applicazione e quando l&apos;applicazione è chiusa,
        qualora partecipi a uno studio che utilizza il geofencing.
      </p>
      <p>
        <strong>Utilizzo della posizione attuale in background:</strong> Alcuni studi
        potrebbero richiedere l&apos;invio di un link a sondaggi online quando Lei entra o
        lascia un determinato luogo (ad es. il luogo di lavoro). Per questo motivo, se aderisce
        a uno studio che utilizza questo tipo di contatto con i partecipanti, Le verrà chiesto
        di consentire il monitoraggio costante della posizione. Se acconsente, l&apos;applicazione
        monitorerà continuamente la Sua posizione anche quando è chiusa. L&apos;applicazione
        non condividerà i Suoi dati di posizione con servizi di terze parti o ricercatori. Le
        informazioni sulla Sua posizione saranno utilizzate esclusivamente per attivare notifiche
        con link a sondaggi online creati dai ricercatori. Potrà sempre attivare o disattivare
        il monitoraggio della posizione per uno studio specifico all&apos;interno
        dell&apos;applicazione. Qualora non desideri che utilizziamo la Sua posizione per le
        finalità sopra indicate, dovrà disattivare i servizi di localizzazione per
        l&apos;applicazione mobile nelle impostazioni del Suo account o del Suo telefono
        cellulare e/o all&apos;interno dell&apos;applicazione mobile.
      </p>
      <p>
        <strong>Politica di conservazione dei dati e gestione delle informazioni:</strong>{' '}
        Potrà interrompere la raccolta di tutte le informazioni da parte dell&apos;applicazione
        eliminando il Suo account (nella voce di menu &quot;Altro&quot;, quindi
        &quot;Impostazioni&quot;, quindi &quot;Elimina il mio account&quot;) e disinstallando
        l&apos;applicazione. Potrà utilizzare i processi di disinstallazione standard
        disponibili sul Suo dispositivo mobile o tramite il marketplace o la rete delle
        applicazioni mobili.
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati di studio; Dati del ricercatore; Dati del partecipante; Dati delle notifiche; Timestamp delle notifiche.</dd>
        <dt>Interessati</dt>
        <dd>Partecipanti.</dd>
        <dt>Finalità del trattamento</dt>
        <dd>Processi di autenticazione; Fornitura dei nostri servizi online e fruibilità; Richieste di contatto e comunicazione; Misure di sicurezza; Gestione e risposta alle richieste.</dd>
        <dt>Base giuridica</dt>
        <dd>Consenso (Art. 6 (1) (a) GDPR); Adempimento di un obbligo legale (Art. 6 (1) (c) GDPR); Tutela degli interessi vitali (Art. 6 (1) (d) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Servizi e fornitori di servizi utilizzati:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Toolkit e piattaforma per la creazione di un&apos;applicazione mobile e la sua distribuzione su Android e iOS. Fornitore del servizio: Expo. Sito web: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Informativa sulla privacy: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — Piattaforma di app store per applicazioni mobili su sistemi operativi iOS e iPadOS. Fornitore del servizio: Apple Inc., One Apple Park Way, Cupertino, CA 95014, U.S.A. Sito web: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Informativa sulla privacy: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Piattaforma di app store per dispositivi che eseguono il sistema operativo Android e i suoi derivati, nonché Chrome OS. Fornitore del servizio: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, U.S.A. Sito web: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Informativa sulla privacy: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Web hosting ──────────────────────────────────────────────────────── */}
      <h2 id='m225'>Fornitura di servizi online e web hosting</h2>
      <p>
        Al fine di fornire i nostri servizi online sul sito web Samply
        (https://samply.uni-konstanz.de/), utilizziamo l&apos;infrastruttura (server web,
        capacità di calcolo, spazio di archiviazione, servizi di database, servizi di
        sicurezza e manutenzione tecnica) dell&apos;Università di Costanza in Germania.
      </p>
      <p>
        I dati trattati nel contesto della fornitura del sito web comprendono tutte le
        informazioni relative agli utenti dell&apos;applicazione mobile Samply Research e del
        sito web Samply raccolte nel corso dell&apos;utilizzo e della comunicazione. I dati
        dei partecipanti e i timestamp delle notifiche sono archiviati nel database sicuro e
        sono accessibili esclusivamente ai ricercatori del rispettivo studio che ha raccolto
        tali dati. I ricercatori possono eliminare questi dati tramite l&apos;interfaccia del
        sito web Samply.
      </p>
      <p>
        <strong>Invio e hosting delle e-mail:</strong> I servizi di web hosting da noi
        utilizzati includono anche l&apos;invio, la ricezione e l&apos;archiviazione di
        e-mail. A tal fine vengono trattati gli indirizzi dei destinatari e dei mittenti,
        nonché altre informazioni relative all&apos;invio delle e-mail (ad es. i provider
        coinvolti) e il contenuto delle rispettive e-mail. I suddetti dati possono essere
        trattati anche ai fini del rilevamento di SPAM. Si prega di notare che le e-mail su
        Internet vengono generalmente inviate in forma non crittografata. Di norma, le e-mail
        vengono crittografate durante il trasporto, ma non sui server dai quali vengono inviate
        e ricevute (salvo l&apos;utilizzo di un metodo di crittografia end-to-end). Non
        possiamo pertanto assumerci alcuna responsabilità per il percorso di trasmissione
        delle e-mail tra il mittente e la ricezione sul nostro server.
      </p>
      <p>
        <strong>Raccolta di dati di accesso e file di log:</strong> Noi stessi o il nostro
        provider di web hosting raccogliamo dati sulla base di ogni accesso al server
        (cosiddetti file di log del server). I file di log del server possono includere
        l&apos;indirizzo e il nome delle pagine web e dei file visitati, la data e l&apos;ora
        di accesso, i volumi di dati trasferiti, la notifica di accesso riuscito, il tipo e
        la versione del browser, il sistema operativo dell&apos;utente, l&apos;URL di
        riferimento (la pagina visitata in precedenza) e, di norma, gli indirizzi IP e il
        provider richiedente. I file di log del server possono essere utilizzati a fini di
        sicurezza, ad es. per evitare il sovraccarico dei server (specialmente in caso di
        attacchi dolosi, cosiddetti attacchi DDoS) e per garantire la stabilità e il
        bilanciamento ottimale del carico dei server.
      </p>
      <p>
        <strong>Politica di conservazione dei dati e gestione delle informazioni:</strong>{' '}
        Gli utenti del sito web (ricercatori e partecipanti) possono gestire i propri account
        tramite l&apos;interfaccia del sito web Samply. Gli utenti possono eliminare il
        proprio account tramite la voce di menu &quot;Account&quot;, quindi &quot;Elimina il
        mio account&quot;.
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati di studio; Dati del ricercatore; Dati del partecipante; Dati delle notifiche; Timestamp delle notifiche.</dd>
        <dt>Interessati</dt>
        <dd>Ricercatori; partecipanti.</dd>
        <dt>Finalità del trattamento</dt>
        <dd>Processi di autenticazione; Fornitura dei nostri servizi online e fruibilità; Richieste di contatto e comunicazione; Misure di sicurezza; Gestione e risposta alle richieste.</dd>
        <dt>Base giuridica</dt>
        <dd>Consenso (Art. 6 (1) (a) GDPR); Adempimento di un obbligo legale (Art. 6 (1) (c) GDPR); Tutela degli interessi vitali (Art. 6 (1) (d) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Servizi e fornitori di servizi utilizzati:</strong></p>
      <ul>
        <li><strong>University web server</strong> — Fornitore del servizio: University of Konstanz, Universitätsstraße 10, 78464 Konstanz, Germany. Sito web: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Informativa sulla privacy: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Servizio di e-mail transazionale. Fornitore del servizio: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, USA. Sito web: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Informativa sulla privacy: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Misure di sicurezza ──────────────────────────────────────────────── */}
      <h2 id='m27'>Misure di sicurezza</h2>
      <p>
        Adottiamo misure tecniche e organizzative adeguate ai sensi delle disposizioni di
        legge, tenendo conto dello stato dell&apos;arte, dei costi di implementazione e della
        natura, dell&apos;ambito, del contesto e delle finalità del trattamento, nonché dei
        rischi di probabilità e gravità diversa per i diritti e le libertà delle persone
        fisiche, al fine di garantire un livello di sicurezza adeguato al rischio.
      </p>
      <p>
        Le misure includono, in particolare, la garanzia della riservatezza, dell&apos;integrità
        e della disponibilità dei dati mediante il controllo degli accessi fisici ed elettronici
        ai dati, nonché l&apos;accesso, l&apos;inserimento, la trasmissione, la protezione e
        la separazione degli stessi. Abbiamo inoltre stabilito procedure per garantire il
        rispetto dei diritti degli interessati, la cancellazione dei dati e la capacità di
        rispondere rapidamente alle minacce ai dati. Teniamo inoltre conto della protezione dei
        dati personali già nella fase di sviluppo o selezione di hardware, software e fornitori
        di servizi, in conformità al principio della privacy by design e della privacy by
        default.
      </p>
      <p>
        <strong>Mascheramento dell&apos;indirizzo IP:</strong> In generale, gli indirizzi IP
        dei ricercatori e dei partecipanti non vengono registrati e conservati. Qualora ciò
        dovesse verificarsi in futuro, provvederemo a troncare il Suo indirizzo IP o a farlo
        troncare. Con il troncamento dell&apos;indirizzo IP, noto anche come &quot;IP
        masking&quot;, viene eliminato l&apos;ultimo ottetto, ossia le ultime due cifre di un
        indirizzo IP. Il troncamento dell&apos;indirizzo IP ha lo scopo di impedire o rendere
        notevolmente più difficile l&apos;identificazione di una persona sulla base del suo
        indirizzo IP.
      </p>
      <p>
        <strong>Crittografia SSL (https):</strong> Al fine di proteggere nel modo migliore
        possibile i Suoi dati trasmessi tramite i nostri servizi online, utilizziamo la
        crittografia SSL. Potrà riconoscere tali connessioni crittografate dal prefisso https://
        nella barra degli indirizzi del browser.
      </p>

      {/* ── Trasmissione e comunicazione di dati personali ──────────────────── */}
      <h2 id='m25'>Trasmissione e comunicazione di dati personali</h2>
      <p>
        Nel contesto del trattamento di dati personali, può accadere che i dati vengano
        trasferiti ad altri luoghi, aziende o persone o che vengano loro comunicati. I
        destinatari di tali dati possono includere, ad esempio, istituti di pagamento nel
        contesto delle transazioni di pagamento, fornitori di servizi incaricati di compiti
        informatici o fornitori di servizi e contenuti incorporati in un sito web. In tal caso,
        verranno rispettati i requisiti legali e, in particolare, verranno conclusi con i
        destinatari dei Suoi dati i contratti o gli accordi necessari alla protezione degli
        stessi.
      </p>

      {/* ── Trattamento dei dati in paesi terzi ────────────────────────────── */}
      <h2 id='m24'>Trattamento dei dati in paesi terzi</h2>
      <p>
        Qualora trattiamo dati in un paese terzo (ossia al di fuori dell&apos;Unione europea
        (UE) e dello Spazio economico europeo (SEE)) o il trattamento avvenga nel contesto
        dell&apos;utilizzo di servizi di terze parti o della comunicazione o del trasferimento
        di dati ad altre persone, enti o aziende, ciò avverrà esclusivamente in conformità ai
        requisiti legali.
      </p>
      <p>
        Salvo consenso esplicito o trasferimento richiesto da contratto o dalla legge,
        trattiamo o facciamo trattare i dati esclusivamente in paesi terzi con un livello
        riconosciuto di protezione dei dati, sulla base di garanzie specifiche, quali un obbligo
        contrattuale mediante le cosiddette clausole di protezione standard della Commissione
        europea, o qualora certificazioni o norme vincolanti interne di protezione dei dati
        giustifichino il trattamento (articoli da 44 a 49 GDPR).
      </p>

      {/* ── Uso dei cookie ───────────────────────────────────────────────────── */}
      <h2 id='m134'>Uso dei cookie</h2>
      <p>
        Non utilizziamo cookie di terze parti né cookie per statistiche, marketing e
        personalizzazione. Utilizziamo esclusivamente cookie necessari (essenziali) richiesti
        per il funzionamento di un sito web (ad es. autenticazione degli utenti).
      </p>
      <p>
        I cookie sono file di testo che contengono dati di siti web o domini visitati e vengono
        memorizzati da un browser sul computer dell&apos;utente. Un cookie viene utilizzato
        principalmente per memorizzare informazioni su un utente durante o dopo la sua visita
        nell&apos;ambito di un servizio online. Le informazioni memorizzate possono includere,
        ad esempio, le impostazioni della lingua su un sito web, lo stato di accesso, un
        carrello della spesa o il punto in cui è stato visualizzato un video.
      </p>
      <p><strong>Si distinguono le seguenti tipologie e funzioni di cookie:</strong></p>
      <ul>
        <li><strong>Cookie temporanei (anche: cookie di sessione):</strong> I cookie temporanei vengono eliminati al più tardi dopo che un utente ha lasciato un servizio online e ha chiuso il browser.</li>
        <li><strong>Cookie permanenti:</strong> I cookie permanenti rimangono memorizzati anche dopo la chiusura del browser. Ad esempio, è possibile salvare lo stato di accesso o visualizzare direttamente i contenuti preferiti quando l&apos;utente visita nuovamente un sito web.</li>
        <li><strong>Cookie proprietari (first-party cookies):</strong> I cookie proprietari vengono impostati da noi stessi.</li>
        <li><strong>Cookie di terze parti (third-party cookies):</strong> I cookie di terze parti vengono utilizzati principalmente da inserzionisti (cosiddette terze parti) per trattare le informazioni degli utenti.</li>
        <li><strong>Cookie necessari (anche: essenziali):</strong> I cookie possono essere necessari per il funzionamento di un sito web (ad es. per salvare i dati di accesso o altri input degli utenti, oppure per motivi di sicurezza).</li>
        <li><strong>Cookie di statistiche, marketing e personalizzazione:</strong> I cookie vengono anche generalmente utilizzati per misurare la portata di un sito web e quando gli interessi o il comportamento di un utente vengono memorizzati in un profilo utente. Tali profili vengono utilizzati, ad esempio, per mostrare agli utenti contenuti corrispondenti ai loro potenziali interessi.</li>
      </ul>
      <p>
        <strong>Informazioni sulla base giuridica:</strong> La base giuridica sulla quale
        trattiamo i Suoi dati personali con l&apos;ausilio dei cookie dipende dal fatto che Le
        chiediamo o meno il Suo consenso. Se ciò avviene e Lei acconsente all&apos;uso dei
        cookie, la base giuridica per il trattamento dei Suoi dati è il Suo consenso espresso.
        In caso contrario, i dati trattati con l&apos;ausilio dei cookie saranno trattati sulla
        base del nostro legittimo interesse (ad es. per il funzionamento commerciale del nostro
        servizio online e il suo miglioramento) o, qualora l&apos;uso dei cookie sia necessario
        per adempiere i nostri obblighi contrattuali.
      </p>
      <p>
        <strong>Periodo di conservazione:</strong> Salvo che Le fornissimo informazioni esplicite
        sul periodo di conservazione dei cookie permanenti, La preghiamo di presumere che il
        periodo di conservazione possa essere fino a due anni.
      </p>
      <p>
        <strong>Informazioni generali sulla revoca del consenso e sull&apos;opposizione (opt-out):</strong>{' '}
        Lei ha la possibilità in qualsiasi momento di opporsi al trattamento dei Suoi dati
        tramite tecnologie cookie o di revocare il consenso. Potrà inizialmente esprimere la
        Sua opposizione tramite le impostazioni del Suo browser, ad es. disattivando l&apos;uso
        dei cookie (il che potrebbe limitare anche la funzionalità dei nostri servizi online).
        Un&apos;opposizione all&apos;uso dei cookie a fini di marketing online può essere
        presentata per un gran numero di servizi, in particolare nel caso di tracking, tramite
        i siti web{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        e{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati meta/comunicazione (ad es. cookie).</dd>
        <dt>Interessati</dt>
        <dd>Ricercatori; partecipanti.</dd>
        <dt>Base giuridica</dt>
        <dd>Consenso (Art. 6 (1) (a) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Servizi commerciali ──────────────────────────────────────────────── */}
      <h2 id='m317'>Servizi commerciali</h2>
      <p>
        Le seguenti informazioni sui servizi commerciali si applicano esclusivamente ai
        ricercatori che desiderano remunerare i partecipanti tramite l&apos;integrazione
        della piattaforma Samply con Stripe.
      </p>
      <p>
        Trattiamo i dati dei nostri partner contrattuali e commerciali, ad es. clienti e
        parti interessate (collettivamente denominati &quot;partner contrattuali&quot;) nel
        contesto di rapporti contrattuali e giuridici analoghi, nonché delle relative azioni
        e comunicazioni con i partner contrattuali o in fase precontrattuale, ad es. per
        rispondere alle richieste.
      </p>
      <p>
        Trattiamo questi dati al fine di adempiere ai nostri obblighi contrattuali, tutelare
        i nostri diritti e per le finalità dei compiti amministrativi associati a tali dati
        e all&apos;organizzazione aziendale. Trasmetteremo i dati dei partner contrattuali a
        terzi nei limiti della legge applicabile solo nella misura in cui ciò sia necessario
        per le finalità sopra indicate o per l&apos;adempimento di obblighi di legge o con il
        consenso degli interessati.
      </p>
      <p>
        Cancelliamo i dati alla scadenza dei termini di garanzia legale e degli obblighi
        analoghi, ossia in linea di principio dopo 4 anni, salvo che i dati siano archiviati
        in un account cliente o debbano essere conservati per motivi legali di archiviazione
        (ad es. di norma 10 anni per finalità fiscali).
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati del ricercatore (ad es. nome, istituto, e-mail, lingua); Dati del partecipante (ad es. e-mail, fuso orario, preferenze orarie, codice partecipante).</dd>
        <dt>Interessati</dt>
        <dd>Ricercatori; partecipanti.</dd>
        <dt>Finalità del trattamento</dt>
        <dd>Servizi contrattuali e assistenza; Richieste di contatto e comunicazione; Procedure amministrative e organizzative; Gestione e risposta alle richieste; Misure di sicurezza.</dd>
        <dt>Base giuridica</dt>
        <dd>Esecuzione di un contratto e richieste precontrattuali (Art. 6 (1) (b) GDPR); Adempimento di un obbligo legale (Art. 6 (1) (c) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>
      <p><strong>Servizi e fornitori di servizi utilizzati:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Piattaforma di elaborazione dei pagamenti. Fornitore del servizio: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, United States. Sito web: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Informativa sulla privacy: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Registrazione, accesso e account utente ─────────────────────────── */}
      <h2 id='m367'>Registrazione, accesso e account utente</h2>
      <p>
        Gli utenti possono creare un account utente. Nell&apos;ambito della registrazione,
        le informazioni obbligatorie richieste vengono comunicate agli utenti e trattate per
        le finalità di fornitura dell&apos;account utente sulla base dell&apos;adempimento
        degli obblighi contrattuali. I dati trattati includono in particolare le informazioni
        di accesso (nome, password e un indirizzo e-mail).
      </p>
      <p>
        Gli utenti possono essere informati via e-mail in merito a informazioni rilevanti per
        il loro account utente, quali modifiche tecniche. Qualora gli utenti abbiano chiuso il
        proprio account utente, i loro dati relativi all&apos;account utente verranno eliminati,
        fatti salvi gli obblighi legali di conservazione. È responsabilità degli utenti
        proteggere i propri dati prima della scadenza del contratto in caso di recesso. Siamo
        autorizzati a eliminare in modo irreversibile tutti i dati dell&apos;utente memorizzati
        durante il periodo contrattuale.
      </p>
      <p>
        Nell&apos;ambito dell&apos;utilizzo delle nostre funzionalità di registrazione e accesso
        nonché dell&apos;account utente, memorizziamo l&apos;indirizzo IP e l&apos;orario della
        rispettiva azione dell&apos;utente. La memorizzazione è basata sui nostri legittimi
        interessi, nonché sulla tutela dell&apos;utente contro abusi e altri utilizzi non
        autorizzati. Tali dati non vengono trasmessi a terzi, salvo che ciò sia necessario per
        tutelare i nostri diritti o in presenza di un obbligo di legge.
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati del ricercatore (ad es. nome, e-mail); Dati del partecipante (ad es. e-mail).</dd>
        <dt>Interessati</dt>
        <dd>Ricercatori; partecipanti.</dd>
        <dt>Finalità del trattamento</dt>
        <dd>Servizi contrattuali e assistenza; Misure di sicurezza; Gestione e risposta alle richieste.</dd>
        <dt>Base giuridica</dt>
        <dd>Consenso (Art. 6 (1) (a) GDPR); Esecuzione di un contratto e richieste precontrattuali (Art. 6 (1) (b) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Contatti ─────────────────────────────────────────────────────────── */}
      <h2 id='m182'>Contatti</h2>
      <p>
        Quando La contatta (ad es. tramite modulo di contatto, e-mail, telefono o tramite i
        social media), i dati delle persone richiedenti vengono trattati nella misura in cui
        ciò sia necessario per rispondere alle richieste di contatto e a eventuali attività
        richieste.
      </p>
      <p>
        La risposta alle richieste di contatto nell&apos;ambito di rapporti contrattuali o
        precontrattuali viene fornita al fine di adempiere ai nostri obblighi contrattuali o
        di rispondere alle richieste (pre)contrattuali e, negli altri casi, sulla base del
        legittimo interesse a rispondere alle richieste.
      </p>
      <dl>
        <dt>Tipologie di dati trattati</dt>
        <dd>Dati di contatto (ad es. e-mail, numeri di telefono).</dd>
        <dt>Interessati</dt>
        <dd>Ricercatori; partecipanti.</dd>
        <dt>Finalità del trattamento</dt>
        <dd>Richieste di contatto e comunicazione.</dd>
        <dt>Base giuridica</dt>
        <dd>Esecuzione di un contratto e richieste precontrattuali (Art. 6 (1) (b) GDPR); Legittimo interesse (Art. 6 (1) (f) GDPR).</dd>
      </dl>

      {/* ── Cancellazione dei dati ───────────────────────────────────────────── */}
      <h2 id='m12'>Cancellazione dei dati</h2>
      <p>
        I dati da noi trattati verranno cancellati conformemente alle disposizioni di legge
        non appena il consenso al loro trattamento viene revocato o altri permessi cessano di
        applicarsi (ad es. qualora la finalità del trattamento di tali dati non sia più
        applicabile o non siano più necessari per la finalità).
      </p>
      <p>
        Qualora i dati non vengano cancellati in quanto necessari per altre finalità lecite,
        il loro trattamento sarà limitato a tali finalità. Ciò significa che i dati saranno
        bloccati e non trattati per altre finalità. Ciò si applica, ad esempio, ai dati che
        devono essere conservati per motivi commerciali o fiscali o la cui conservazione è
        necessaria per far valere, esercitare o difendere diritti legali o per tutelare i
        diritti di un&apos;altra persona fisica o giuridica.
      </p>

      {/* ── Modifiche e aggiornamenti dell&apos;informativa sulla privacy ─────── */}
      <h2 id='m15'>Modifiche e aggiornamenti dell&apos;informativa sulla privacy</h2>
      <p>
        La invitiamo a informarsi regolarmente sul contenuto della nostra informativa sulla
        protezione dei dati. Aggiorneremo l&apos;informativa sulla privacy non appena le
        modifiche alle nostre pratiche di trattamento dei dati lo renderanno necessario. La
        informeremo non appena le modifiche richiederanno un Suo intervento (ad es. consenso)
        o un&apos;altra notifica individuale.
      </p>
      <p>
        Qualora forniamo nella presente informativa sulla privacy indirizzi e informazioni di
        contatto di aziende e organizzazioni, La invitiamo a notare che gli indirizzi possono
        cambiare nel tempo e a verificare le informazioni prima di contattarci.
      </p>

      {/* ── Diritti degli interessati ───────────────────────────────────────── */}
      <h2 id='m10'>Diritti degli interessati</h2>
      <p>
        In qualità di interessato, Lei è titolare di vari diritti ai sensi del GDPR, che
        derivano in particolare dagli articoli da 15 a 21 del GDPR:
      </p>
      <ul>
        <li><strong>Diritto di opposizione:</strong> Lei ha il diritto di opporsi in qualsiasi momento, per motivi connessi alla Sua situazione particolare, al trattamento dei Suoi dati personali basato sull&apos;articolo 6, paragrafo 1, lettere e) o f) del GDPR, compresa la profilazione basata su tali disposizioni.</li>
        <li><strong>Diritto di revoca del consenso:</strong> Lei ha il diritto di revocare i consensi prestati in qualsiasi momento.</li>
        <li><strong>Diritto di accesso:</strong> Lei ha il diritto di richiedere conferma che i dati in questione siano trattati e di essere informato in merito a tali dati, nonché di ricevere ulteriori informazioni e una copia dei dati conformemente alle disposizioni di legge.</li>
        <li><strong>Diritto di rettifica:</strong> Lei ha il diritto, conformemente alla legge, di richiedere il completamento dei dati che La riguardano o la rettifica dei dati inesatti che La riguardano.</li>
        <li><strong>Diritto alla cancellazione e diritto alla limitazione del trattamento:</strong> Conformemente alle disposizioni di legge, Lei ha il diritto di esigere la cancellazione immediata dei dati in questione o, in alternativa, di esigere la limitazione del trattamento dei dati conformemente alle disposizioni di legge.</li>
        <li><strong>Diritto alla portabilità dei dati:</strong> Lei ha il diritto di ricevere i dati che La riguardano, da Lei forniti, in un formato strutturato, di uso comune e leggibile da dispositivo automatico, conformemente ai requisiti legali, o di richiederne la trasmissione a un altro titolare del trattamento.</li>
        <li><strong>Reclamo all&apos;autorità di controllo:</strong> Lei ha inoltre il diritto, alle condizioni stabilite dalla legge, di presentare reclamo a un&apos;autorità di controllo, in particolare nello Stato membro in cui risiede abitualmente, lavora o nel luogo in cui si è verificata la presunta violazione, qualora ritenga che il trattamento dei dati personali che La riguardano violi il GDPR.</li>
      </ul>

      {/* ── Terminologia e definizioni ──────────────────────────────────────── */}
      <h2 id='m42'>Terminologia e definizioni</h2>
      <p>
        La presente sezione fornisce una panoramica dei termini utilizzati nella presente
        informativa sulla privacy. Molti dei termini sono tratti dalla legge e definiti
        principalmente nell&apos;articolo 4 del GDPR. Le seguenti spiegazioni sono intese
        principalmente a facilitare la comprensione.
      </p>
      <dl>
        <dt>Titolare del trattamento</dt>
        <dd>Il &quot;titolare del trattamento&quot; è la persona fisica o giuridica, l&apos;autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali.</dd>
        <dt>Dati personali</dt>
        <dd>Per &quot;dati personali&quot; si intende qualsiasi informazione riguardante una persona fisica identificata o identificabile (&quot;interessato&quot;); si considera identificabile la persona fisica che può essere identificata, direttamente o indirettamente, con particolare riferimento a un identificativo come il nome, un numero di identificazione, dati relativi all&apos;ubicazione, un identificativo online o a uno o più elementi caratteristici della sua identità fisica, fisiologica, genetica, psichica, economica, culturale o sociale.</dd>
        <dt>Trattamento</dt>
        <dd>Il termine &quot;trattamento&quot; copre un ampio spettro e praticamente qualsiasi gestione di dati, sia essa la raccolta, la valutazione, l&apos;archiviazione, la trasmissione o la cancellazione.</dd>
        <dt>Remarketing</dt>
        <dd>Per &quot;remarketing&quot; o &quot;retargeting&quot; si intende il termine utilizzato per indicare, ad esempio, a fini pubblicitari, i prodotti per cui un utente ha mostrato interesse su un sito web, al fine di ricordare all&apos;utente tali prodotti su altri siti web, ad es. negli annunci pubblicitari.</dd>
        <dt>Tracking</dt>
        <dd>Il termine &quot;tracking&quot; viene utilizzato quando è possibile tracciare il comportamento degli utenti su più siti web. Di norma, le informazioni sul comportamento e sugli interessi in relazione ai siti web utilizzati vengono memorizzate nei cookie o sui server dei fornitori di tecnologie di tracking (cosiddetta profilazione).</dd>
        <dt>Analisi web</dt>
        <dd>L&apos;analisi web serve alla valutazione del traffico dei visitatori di servizi online e può determinarne il comportamento o gli interessi in merito a determinate informazioni, come i contenuti dei siti web. Con l&apos;ausilio dell&apos;analisi web, i gestori di siti web possono riconoscere a che ora i visitatori accedono al loro sito web e a quali contenuti sono interessati.</dd>
      </dl>
    </>
  );
}

function PolicyContentFr() {
  return (
    <>
      <p>
        Avec la présente politique de confidentialité, nous souhaitons vous informer des
        types de vos données personnelles (ci-après également désignées par
        &quot;données&quot;) que nous traitons, à quelles fins et dans quelle mesure. La
        présente déclaration s&apos;applique à tout traitement de données personnelles
        effectué par nos soins, tant dans le cadre de la fourniture de nos services qu&apos;en
        particulier sur nos sites web, dans les applications mobiles et au sein de nos
        présences en ligne externes, telles que nos profils sur les réseaux sociaux
        (ci-après collectivement désignés &quot;services en ligne&quot;).
      </p>
      <p>Les termes utilisés ne sont pas spécifiques au genre.</p>
      <p><strong>Dernière mise à jour :</strong> 3 décembre 2024</p>

      {/* ── Responsable du traitement ───────────────────────────────────────── */}
      <h2 id='m3'>Responsable du traitement</h2>
      <p>
        Groupe de recherche iScience / Université de Constance<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Allemagne
      </p>
      <dl>
        <dt>Représentants autorisés</dt>
        <dd>Yury Shevchenko</dd>
        <dt>Adresse e-mail</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Téléphone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Mentions légales</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Vue d'ensemble ──────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Vue d&apos;ensemble des opérations de traitement</h2>
      <p>
        Le tableau suivant résume les types de données traitées, les finalités pour
        lesquelles elles sont traitées et les personnes concernées.
      </p>
      <h3>Catégories de données traitées</h3>
      <ul>
        <li>Données d&apos;étude (par ex. saisies de texte, images)</li>
        <li>Données des chercheurs (par ex. nom, établissement, e-mail, langue)</li>
        <li>Données des participants (par ex. e-mail, fuseau horaire, préférences horaires, code participant)</li>
        <li>Données de notification (par ex. titre, message, URL, calendrier de notification)</li>
        <li>Horodatages de notification (par ex. moment de réception d&apos;une notification dans l&apos;application, appui dans la barre de notifications, ouverture dans l&apos;application, suppression, événement de géofencing, événement de complétion)</li>
        <li>Données méta/de communication (par ex. cookies)</li>
        <li>Données de contact (par ex. e-mail, numéros de téléphone)</li>
      </ul>
      <h3>Catégories de personnes concernées</h3>
      <ul>
        <li>Chercheurs</li>
        <li>Participants</li>
      </ul>
      <h3>Finalités du traitement</h3>
      <ul>
        <li>Processus d&apos;authentification</li>
        <li>Fourniture de nos services en ligne et convivialité</li>
        <li>Procédures de bureau et organisationnelles</li>
        <li>Retours (par ex. collecte de commentaires via un formulaire en ligne)</li>
        <li>Demandes de contact et communication</li>
        <li>Mesures de sécurité</li>
        <li>Services contractuels et assistance</li>
        <li>Gestion et réponse aux demandes</li>
      </ul>

      {/* ── Bases légales ──────────────────────────────────────────────────── */}
      <h2 id='m13'>Bases juridiques du traitement</h2>
      <p>
        Nous vous informons ci-après de la base juridique du Règlement général sur la
        protection des données (RGPD) sur laquelle nous fondons le traitement des données
        personnelles. Veuillez noter qu&apos;en plus des dispositions du RGPD, les
        réglementations nationales en matière de protection des données peuvent s&apos;appliquer
        dans votre pays ou dans notre pays de résidence ou de domicile. Si, en outre, des
        bases juridiques plus spécifiques sont applicables dans des cas particuliers, nous
        vous en informerons dans la présente déclaration.
      </p>
      <ul>
        <li><strong>Consentement (Article 6 (1) (a) RGPD)</strong> — La personne concernée a consenti au traitement de ses données personnelles pour une ou plusieurs finalités spécifiques.</li>
        <li><strong>Exécution d&apos;un contrat et demandes préalables (Article 6 (1) (b) RGPD)</strong> — Le traitement est nécessaire à l&apos;exécution d&apos;un contrat auquel la personne concernée est partie ou à l&apos;exécution de mesures précontractuelles prises à la demande de la personne concernée.</li>
        <li><strong>Respect d&apos;une obligation légale (Article 6 (1) (c) RGPD)</strong> — Le traitement est nécessaire au respect d&apos;une obligation légale à laquelle le responsable du traitement est soumis.</li>
        <li><strong>Protection des intérêts vitaux (Article 6 (1) (d) RGPD)</strong> — Le traitement est nécessaire à la sauvegarde des intérêts vitaux de la personne concernée ou d&apos;une autre personne physique.</li>
        <li><strong>Intérêts légitimes (Article 6 (1) (f) RGPD)</strong> — Le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, à moins que ne prévalent les intérêts ou les libertés et droits fondamentaux de la personne concernée qui exigent une protection des données personnelles.</li>
      </ul>
      <p>
        <strong>Réglementations nationales en matière de protection des données en Allemagne :</strong>{' '}
        Outre les dispositions du RGPD, les réglementations nationales en matière de
        protection des données s&apos;appliquent en Allemagne. Il s&apos;agit notamment de la
        loi fédérale sur la protection des données (BDSG). Celle-ci contient en particulier
        des dispositions spéciales sur le droit d&apos;accès, le droit à l&apos;effacement,
        le droit d&apos;opposition, le traitement de catégories particulières de données
        personnelles, le traitement à d&apos;autres fins et la transmission, ainsi que la
        prise de décision individuelle automatisée, y compris le profilage. En outre, les
        lois sur la protection des données des différents États fédéraux peuvent s&apos;appliquer.
      </p>

      {/* ── Application mobile ─────────────────────────────────────────────── */}
      <h2 id='m200'>Fourniture de l&apos;application mobile Samply Research</h2>
      <p>
        <strong>Informations fournies par l&apos;utilisateur :</strong> L&apos;application
        obtient les informations que vous fournissez lors du téléchargement et de
        l&apos;inscription. L&apos;inscription est obligatoire pour pouvoir utiliser les
        fonctionnalités de base de l&apos;application. Lors de votre inscription et de
        l&apos;utilisation de l&apos;application, vous fournissez (a) votre adresse e-mail
        et votre mot de passe ; (b) le fuseau horaire et la langue de votre smartphone ;
        (c) les horodatages des événements suivants : réception d&apos;une notification dans
        l&apos;application, appui sur la notification dans la barre de notifications,
        ouverture d&apos;une notification dans l&apos;application, suppression d&apos;une
        notification, complétion d&apos;un sondage ; (d) les informations que vous nous
        fournissez lorsque vous nous contactez pour obtenir de l&apos;aide ; (e) les
        informations que vous entrez dans notre système lors de l&apos;utilisation de
        l&apos;application, par exemple lors de l&apos;adhésion à une étude ; (f) vos
        informations de localisation actuelles et les horodatages des événements de
        géofencing lors de l&apos;utilisation de l&apos;application et lorsque
        l&apos;application est fermée, si vous participez à une étude utilisant le
        géofencing.
      </p>
      <p>
        <strong>Utilisation de votre localisation actuelle en arrière-plan :</strong>{' '}
        Certaines études peuvent nécessiter l&apos;envoi d&apos;un lien vers des sondages
        en ligne lorsque vous entrez dans un lieu particulier ou en sortez (par ex. votre
        lieu de travail). Pour cette raison, si vous rejoignez une étude utilisant ce type
        de contact avec les participants, vous serez invité à autoriser le suivi de
        localisation en continu. Si vous acceptez, l&apos;application suivra en permanence
        votre localisation, même lorsqu&apos;elle est fermée. L&apos;application ne
        partagera pas vos données de localisation avec des services tiers ou des chercheurs.
        Vos informations de localisation seront uniquement utilisées pour déclencher des
        notifications avec des liens vers des sondages en ligne créés par des chercheurs.
        Vous pouvez toujours activer ou désactiver le suivi de localisation pour une étude
        spécifique dans l&apos;application. Si vous ne souhaitez pas que nous utilisions
        votre localisation aux fins susmentionnées, vous devez désactiver les services de
        localisation pour l&apos;application mobile dans les paramètres de votre compte,
        dans les paramètres de votre téléphone mobile et/ou dans l&apos;application mobile.
      </p>
      <p>
        <strong>Politique de conservation des données, gestion de vos informations :</strong>{' '}
        Vous pouvez mettre fin à toute collecte d&apos;informations par l&apos;application
        en supprimant votre compte (via le menu &quot;Plus&quot;, puis
        &quot;Paramètres&quot;, puis &quot;Supprimer mon compte&quot;) et en désinstallant
        l&apos;application. Vous pouvez utiliser les processus de désinstallation standard
        disponibles sur votre appareil mobile ou via la marketplace ou le réseau
        d&apos;applications mobiles.
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données d&apos;étude ; données des chercheurs ; données des participants ; données de notification ; horodatages de notification.</dd>
        <dt>Personnes concernées</dt>
        <dd>Participants.</dd>
        <dt>Finalités du traitement</dt>
        <dd>Processus d&apos;authentification ; fourniture de nos services en ligne et convivialité ; demandes de contact et communication ; mesures de sécurité ; gestion et réponse aux demandes.</dd>
        <dt>Base juridique</dt>
        <dd>Consentement (Art. 6 (1) (a) RGPD) ; respect d&apos;une obligation légale (Art. 6 (1) (c) RGPD) ; protection des intérêts vitaux (Art. 6 (1) (d) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Services et prestataires de services utilisés :</strong></p>
      <ul>
        <li><strong>Expo</strong> — Kit d&apos;outils et plateforme pour créer une application mobile et la distribuer sur Android et iOS. Prestataire : Expo. Site web : <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Politique de confidentialité : <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — Plateforme de distribution d&apos;applications mobiles pour iOS et iPadOS. Prestataire : Apple Inc., One Apple Park Way, Cupertino, CA 95014, États-Unis. Site web : <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Politique de confidentialité : <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Plateforme de distribution d&apos;applications pour les appareils Android et Chrome OS. Prestataire : Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis. Site web : <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Politique de confidentialité : <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Hébergement web ─────────────────────────────────────────────────── */}
      <h2 id='m225'>Fourniture des services en ligne et hébergement web</h2>
      <p>
        Afin de fournir nos services en ligne sur le site web Samply
        (https://samply.uni-konstanz.de/), nous utilisons l&apos;infrastructure (serveur web,
        capacité de calcul, espace de stockage, services de base de données, services de
        sécurité et de maintenance technique) de l&apos;Université de Constance en Allemagne.
      </p>
      <p>
        Les données traitées dans le cadre de la fourniture du site web comprennent toutes
        les informations relatives aux utilisateurs de l&apos;application mobile Samply
        Research et du site web Samply, collectées au cours de l&apos;utilisation et des
        communications. Les données des participants et les horodatages de notifications sont
        stockés dans la base de données sécurisée et ne sont accessibles qu&apos;aux
        chercheurs de l&apos;étude respective ayant collecté ces données. Les chercheurs
        peuvent supprimer ces données via l&apos;interface du site web Samply.
      </p>
      <p>
        <strong>Envoi et hébergement d&apos;e-mails :</strong> Les services
        d&apos;hébergement web que nous utilisons incluent également l&apos;envoi, la
        réception et le stockage d&apos;e-mails. À ces fins, les adresses des destinataires
        et des expéditeurs, ainsi que d&apos;autres informations relatives à l&apos;envoi
        des e-mails (par ex. les fournisseurs impliqués) et le contenu de chaque e-mail
        sont traités. Ces données peuvent également être traitées à des fins de détection
        de SPAM. Veuillez noter que les e-mails sur Internet ne sont généralement pas
        envoyés sous forme chiffrée. En règle générale, les e-mails sont chiffrés pendant
        le transport, mais pas sur les serveurs depuis lesquels ils sont envoyés et reçus
        (sauf si une méthode de chiffrement de bout en bout est utilisée). Nous ne pouvons
        donc pas garantir la sécurité du chemin de transmission des e-mails entre
        l&apos;expéditeur et la réception sur notre serveur.
      </p>
      <p>
        <strong>Collecte des données d&apos;accès et fichiers journaux :</strong> Nous-mêmes
        ou notre hébergeur collectons des données sur la base de chaque accès au serveur
        (ce qu&apos;on appelle les fichiers journaux serveur). Ces fichiers peuvent inclure
        l&apos;adresse et le nom des pages web et fichiers consultés, la date et l&apos;heure
        d&apos;accès, le volume de données transféré, la notification d&apos;un accès
        réussi, le type et la version du navigateur, le système d&apos;exploitation de
        l&apos;utilisateur, l&apos;URL de référence (la page précédemment visitée) et, en
        général, les adresses IP et le fournisseur requérant. Les fichiers journaux serveur
        peuvent être utilisés à des fins de sécurité, par ex. pour éviter la surcharge des
        serveurs (notamment en cas d&apos;attaques abusives, dites attaques DDoS) et pour
        assurer la stabilité et l&apos;équilibrage optimal de charge des serveurs.
      </p>
      <p>
        <strong>Politique de conservation des données, gestion de vos informations :</strong>{' '}
        Les utilisateurs du site web (chercheurs et participants) peuvent gérer leurs
        comptes via l&apos;interface du site web Samply. Les utilisateurs peuvent supprimer
        leur compte en utilisant le menu &quot;Compte&quot;, puis &quot;Supprimer mon
        compte&quot;.
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données d&apos;étude ; données des chercheurs ; données des participants ; données de notification ; horodatages de notification.</dd>
        <dt>Personnes concernées</dt>
        <dd>Chercheurs ; participants.</dd>
        <dt>Finalités du traitement</dt>
        <dd>Processus d&apos;authentification ; fourniture de nos services en ligne et convivialité ; demandes de contact et communication ; mesures de sécurité ; gestion et réponse aux demandes.</dd>
        <dt>Base juridique</dt>
        <dd>Consentement (Art. 6 (1) (a) RGPD) ; respect d&apos;une obligation légale (Art. 6 (1) (c) RGPD) ; protection des intérêts vitaux (Art. 6 (1) (d) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Services et prestataires de services utilisés :</strong></p>
      <ul>
        <li><strong>Serveur web universitaire</strong> — Prestataire : Université de Constance, Universitätsstraße 10, 78464 Konstanz, Allemagne. Site web : <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Politique de confidentialité : <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Service d&apos;e-mail transactionnel. Prestataire : Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, États-Unis. Site web : <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Politique de confidentialité : <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Sécurité ────────────────────────────────────────────────────────── */}
      <h2 id='m27'>Mesures de sécurité</h2>
      <p>
        Nous prenons des mesures techniques et organisationnelles appropriées conformément
        aux exigences légales, en tenant compte de l&apos;état de la technique, des coûts
        de mise en œuvre et de la nature, de la portée, du contexte et des finalités du
        traitement, ainsi que du risque, de probabilité et de gravité variables pour les
        droits et libertés des personnes physiques, afin de garantir un niveau de sécurité
        adapté au risque.
      </p>
      <p>
        Les mesures comprennent notamment la garantie de la confidentialité, de
        l&apos;intégrité et de la disponibilité des données par le contrôle de
        l&apos;accès physique et électronique aux données, ainsi que l&apos;accès,
        la saisie, la transmission, la sécurisation et la séparation des données. En
        outre, nous avons établi des procédures pour garantir l&apos;exercice des droits
        des personnes concernées, l&apos;effacement des données et notre capacité à
        répondre rapidement aux menaces pesant sur les données. Par ailleurs, nous prenons
        en compte la protection des données personnelles dès le développement ou la
        sélection du matériel, des logiciels et des prestataires de services, conformément
        au principe de protection des données dès la conception et par défaut.
      </p>
      <p>
        <strong>Masquage de l&apos;adresse IP :</strong> En règle générale, les adresses
        IP des chercheurs et des participants ne sont pas enregistrées ni stockées. Dans
        l&apos;éventualité où cela serait le cas à l&apos;avenir, nous raccourcirons ou
        ferons raccourcir votre adresse IP. Lors du raccourcissement de l&apos;adresse IP,
        également connu sous le nom de &quot;masquage IP&quot;, le dernier octet, c&apos;est-à-dire
        les deux derniers chiffres d&apos;une adresse IP, est supprimé. Ce raccourcissement
        vise à empêcher ou à rendre considérablement plus difficile l&apos;identification
        d&apos;une personne sur la base de son adresse IP.
      </p>
      <p>
        <strong>Chiffrement SSL (https) :</strong> Afin de protéger au mieux les données
        que vous transmettez via nos services en ligne, nous utilisons le chiffrement SSL.
        Vous pouvez reconnaître ces connexions chiffrées par le préfixe https:// dans la
        barre d&apos;adresse de votre navigateur.
      </p>

      {/* ── Transmission ────────────────────────────────────────────────────── */}
      <h2 id='m25'>Transmission et divulgation de données personnelles</h2>
      <p>
        Dans le cadre de notre traitement des données personnelles, il peut arriver que les
        données soient transférées à d&apos;autres lieux, entreprises ou personnes ou
        qu&apos;elles leur soient divulguées. Les destinataires de ces données peuvent
        inclure, par exemple, des établissements de paiement dans le cadre de transactions
        de paiement, des prestataires de services chargés de tâches informatiques ou des
        fournisseurs de services et de contenus intégrés dans un site web. Dans un tel cas,
        les exigences légales seront respectées et, en particulier, des contrats ou accords
        correspondants servant à la protection de vos données seront conclus avec les
        destinataires de vos données.
      </p>

      {/* ── Pays tiers ──────────────────────────────────────────────────────── */}
      <h2 id='m24'>Traitement des données dans des pays tiers</h2>
      <p>
        Si nous traitons des données dans un pays tiers (c&apos;est-à-dire en dehors de
        l&apos;Union européenne (UE) ou de l&apos;Espace économique européen (EEE)) ou si
        le traitement a lieu dans le cadre de l&apos;utilisation de services tiers ou de la
        divulgation ou du transfert de données à d&apos;autres personnes, entités ou
        entreprises, cela ne se fera que conformément aux exigences légales.
      </p>
      <p>
        Sous réserve d&apos;un consentement exprès ou d&apos;un transfert requis par contrat
        ou par la loi, nous traitons ou faisons traiter les données uniquement dans des pays
        tiers bénéficiant d&apos;un niveau de protection des données reconnu, sur la base de
        garanties spéciales, telles qu&apos;une obligation contractuelle par le biais des
        clauses de protection standard de la Commission européenne ou si des certifications
        ou des règles internes contraignantes en matière de protection des données
        justifient le traitement (Articles 44 à 49 RGPD).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Utilisation des cookies</h2>
      <p>
        Nous n&apos;utilisons pas de cookies tiers ni de cookies à des fins statistiques,
        marketing ou de personnalisation. Nous n&apos;utilisons que des cookies nécessaires
        (essentiels) requis pour le fonctionnement d&apos;un site web (par ex.
        l&apos;authentification des utilisateurs).
      </p>
      <p>
        Les cookies sont des fichiers texte contenant des données provenant de sites web ou
        de domaines visités et stockés par un navigateur sur l&apos;ordinateur de
        l&apos;utilisateur. Un cookie est principalement utilisé pour stocker des
        informations sur un utilisateur pendant ou après sa visite d&apos;un service en
        ligne. Les informations stockées peuvent inclure, par exemple, les paramètres de
        langue sur un site web, le statut de connexion, un panier d&apos;achat ou
        l&apos;endroit où une vidéo a été visionnée.
      </p>
      <p><strong>Les types et fonctions de cookies suivants sont distingués :</strong></p>
      <ul>
        <li><strong>Cookies temporaires (également : cookies de session) :</strong> Les cookies temporaires sont supprimés au plus tard après qu&apos;un utilisateur a quitté un service en ligne et fermé son navigateur.</li>
        <li><strong>Cookies permanents :</strong> Les cookies permanents restent stockés même après la fermeture du navigateur. Par exemple, le statut de connexion peut être enregistré ou le contenu préféré peut s&apos;afficher directement lorsque l&apos;utilisateur visite à nouveau un site web.</li>
        <li><strong>Cookies propriétaires :</strong> Les cookies propriétaires sont définis par nous-mêmes.</li>
        <li><strong>Cookies tiers :</strong> Les cookies tiers sont principalement utilisés par des annonceurs (dits tiers) pour traiter les informations des utilisateurs.</li>
        <li><strong>Cookies nécessaires (également : essentiels) :</strong> Les cookies peuvent être nécessaires au fonctionnement d&apos;un site web (par ex. pour enregistrer les connexions ou d&apos;autres saisies utilisateur, ou pour des raisons de sécurité).</li>
        <li><strong>Cookies de statistiques, marketing et personnalisation :</strong> Les cookies sont également généralement utilisés pour mesurer la portée d&apos;un site web et lorsque les intérêts ou le comportement d&apos;un utilisateur sont stockés dans un profil utilisateur. Ces profils sont utilisés, par exemple, pour afficher aux utilisateurs des contenus correspondant à leurs intérêts potentiels.</li>
      </ul>
      <p>
        <strong>Informations sur la base juridique :</strong> La base juridique sur laquelle
        nous traitons vos données personnelles à l&apos;aide de cookies dépend de si nous
        vous demandons votre consentement. Si tel est le cas et que vous consentez à
        l&apos;utilisation des cookies, la base juridique du traitement de vos données est
        votre consentement déclaré. Sinon, les données traitées à l&apos;aide de cookies
        seront traitées sur la base de nos intérêts légitimes (par ex. pour
        l&apos;exploitation commerciale de notre service en ligne et son amélioration) ou,
        si l&apos;utilisation des cookies est nécessaire pour remplir nos obligations
        contractuelles.
      </p>
      <p>
        <strong>Durée de conservation :</strong> Sauf information explicite de notre part
        sur la durée de conservation des cookies permanents, veuillez partir du principe
        que la durée de conservation peut aller jusqu&apos;à deux ans.
      </p>
      <p>
        <strong>Informations générales sur le retrait du consentement et l&apos;opposition (opt-out) :</strong>{' '}
        Vous avez la possibilité à tout moment de vous opposer au traitement de vos données
        à l&apos;aide de technologies de cookies ou de révoquer votre consentement. Vous
        pouvez initialement exprimer votre opposition via les paramètres de votre
        navigateur, par ex. en désactivant l&apos;utilisation des cookies (ce qui peut
        également restreindre la fonctionnalité de nos services en ligne). Une opposition
        à l&apos;utilisation des cookies à des fins de marketing en ligne peut être soulevée
        pour un grand nombre de services, notamment en matière de suivi, via les sites web{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        et{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données méta/de communication (par ex. cookies).</dd>
        <dt>Personnes concernées</dt>
        <dd>Chercheurs ; participants.</dd>
        <dt>Base juridique</dt>
        <dd>Consentement (Art. 6 (1) (a) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Services commerciaux ────────────────────────────────────────────── */}
      <h2 id='m317'>Services commerciaux</h2>
      <p>
        Les informations suivantes sur les services commerciaux s&apos;appliquent uniquement
        aux chercheurs souhaitant rémunérer des participants via l&apos;intégration de la
        plateforme Samply avec Stripe.
      </p>
      <p>
        Nous traitons les données de nos partenaires contractuels et commerciaux, par ex.
        clients et parties intéressées (collectivement désignés &quot;partenaires
        contractuels&quot;) dans le cadre de relations contractuelles et comparables, ainsi
        que des actions associées et des communications avec les partenaires contractuels ou
        en précontractuel, par ex. pour répondre à des demandes.
      </p>
      <p>
        Nous traitons ces données afin de remplir nos obligations contractuelles, de
        préserver nos droits et aux fins des tâches administratives associées à ces données
        et à l&apos;organisation commerciale. Nous ne transmettrons les données des
        partenaires contractuels à des tiers dans le cadre de la loi applicable que dans la
        mesure nécessaire aux fins susmentionnées, à l&apos;exécution d&apos;obligations
        légales ou avec le consentement des personnes concernées.
      </p>
      <p>
        Nous supprimons les données après expiration des délais légaux de garantie et
        obligations comparables, soit en principe après expiration de 4 ans, sauf si les
        données sont stockées dans un compte client ou doivent être conservées pour des
        raisons légales d&apos;archivage (par ex. en règle générale 10 ans à des fins
        fiscales).
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données des chercheurs (par ex. nom, établissement, e-mail, langue) ; données des participants (par ex. e-mail, fuseau horaire, préférences horaires, code participant).</dd>
        <dt>Personnes concernées</dt>
        <dd>Chercheurs ; participants.</dd>
        <dt>Finalités du traitement</dt>
        <dd>Services contractuels et assistance ; demandes de contact et communication ; procédures de bureau et organisationnelles ; gestion et réponse aux demandes ; mesures de sécurité.</dd>
        <dt>Base juridique</dt>
        <dd>Exécution d&apos;un contrat et demandes préalables (Art. 6 (1) (b) RGPD) ; respect d&apos;une obligation légale (Art. 6 (1) (c) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Services et prestataires de services utilisés :</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Plateforme de traitement des paiements. Prestataire : Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, États-Unis. Site web : <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Politique de confidentialité : <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Inscription ─────────────────────────────────────────────────────── */}
      <h2 id='m367'>Inscription, connexion et compte utilisateur</h2>
      <p>
        Les utilisateurs peuvent créer un compte utilisateur. Dans le cadre de
        l&apos;inscription, les informations obligatoires requises sont communiquées aux
        utilisateurs et traitées aux fins de la fourniture du compte utilisateur sur la
        base de l&apos;exécution des obligations contractuelles. Les données traitées
        comprennent en particulier les informations de connexion (nom, mot de passe et
        adresse e-mail).
      </p>
      <p>
        Les utilisateurs peuvent être informés par e-mail des informations pertinentes
        pour leur compte utilisateur, telles que les modifications techniques. Si les
        utilisateurs ont résilié leur compte utilisateur, leurs données seront supprimées
        en ce qui concerne le compte utilisateur, sous réserve d&apos;une obligation légale
        de conservation. Il incombe aux utilisateurs de sauvegarder leurs données avant la
        fin du contrat en cas de résiliation. Nous sommes habilités à supprimer
        définitivement toutes les données utilisateur stockées pendant la durée du contrat.
      </p>
      <p>
        Dans le cadre de l&apos;utilisation de nos fonctions d&apos;inscription et de
        connexion ainsi que du compte utilisateur, nous stockons l&apos;adresse IP et
        l&apos;heure de chaque action de l&apos;utilisateur. Le stockage est basé sur nos
        intérêts légitimes ainsi que sur la protection de l&apos;utilisateur contre les
        abus et autres utilisations non autorisées. Ces données ne seront pas transmises à
        des tiers sauf si cela est nécessaire pour poursuivre nos réclamations ou
        qu&apos;une obligation légale l&apos;exige.
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données des chercheurs (par ex. nom, e-mail) ; données des participants (par ex. e-mail).</dd>
        <dt>Personnes concernées</dt>
        <dd>Chercheurs ; participants.</dd>
        <dt>Finalités du traitement</dt>
        <dd>Services contractuels et assistance ; mesures de sécurité ; gestion et réponse aux demandes.</dd>
        <dt>Base juridique</dt>
        <dd>Consentement (Art. 6 (1) (a) RGPD) ; exécution d&apos;un contrat et demandes préalables (Art. 6 (1) (b) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Nous contacter ──────────────────────────────────────────────────── */}
      <h2 id='m182'>Nous contacter</h2>
      <p>
        Lorsque vous nous contactez (par ex. via un formulaire de contact, par e-mail, par
        téléphone ou via les réseaux sociaux), les données des personnes demandant des
        renseignements sont traitées dans la mesure nécessaire pour répondre aux demandes
        de contact et aux activités demandées.
      </p>
      <p>
        La réponse aux demandes de contact dans le cadre de relations contractuelles ou
        précontractuelles est effectuée pour remplir nos obligations contractuelles ou pour
        répondre aux demandes (pré)contractuelles et autrement sur la base des intérêts
        légitimes à répondre aux demandes.
      </p>
      <dl>
        <dt>Types de données traitées</dt>
        <dd>Données de contact (par ex. e-mail, numéros de téléphone).</dd>
        <dt>Personnes concernées</dt>
        <dd>Chercheurs ; participants.</dd>
        <dt>Finalités du traitement</dt>
        <dd>Demandes de contact et communication.</dd>
        <dt>Base juridique</dt>
        <dd>Exécution d&apos;un contrat et demandes préalables (Art. 6 (1) (b) RGPD) ; intérêts légitimes (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Effacement ──────────────────────────────────────────────────────── */}
      <h2 id='m12'>Effacement des données</h2>
      <p>
        Les données que nous traitons seront effacées conformément aux dispositions légales
        dès que leur traitement est révoqué ou que d&apos;autres autorisations ne
        s&apos;appliquent plus (par ex. si la finalité du traitement de ces données
        disparaît ou si elles ne sont plus nécessaires à cette fin).
      </p>
      <p>
        Si les données ne sont pas supprimées parce qu&apos;elles sont nécessaires à
        d&apos;autres fins légalement admissibles, leur traitement est limité à ces fins.
        Cela signifie que les données seront restreintes et non traitées à d&apos;autres
        fins. Cela s&apos;applique, par exemple, aux données qui doivent être conservées
        pour des raisons commerciales ou fiscales ou dont la conservation est nécessaire
        pour faire valoir, exercer ou défendre des droits en justice ou pour protéger les
        droits d&apos;une autre personne physique ou morale.
      </p>

      {/* ── Modifications ───────────────────────────────────────────────────── */}
      <h2 id='m15'>Modifications et mises à jour de la politique de confidentialité</h2>
      <p>
        Nous vous invitons à vous informer régulièrement du contenu de notre déclaration de
        protection des données. Nous adapterons la politique de confidentialité dès que les
        modifications apportées à nos pratiques de traitement des données le rendront
        nécessaire. Nous vous informerons dès que les modifications nécessiteront votre
        participation (par ex. consentement) ou une autre notification individuelle.
      </p>
      <p>
        Si nous fournissons dans la présente politique de confidentialité des adresses et
        des informations de contact d&apos;entreprises et d&apos;organisations, veuillez
        noter que les adresses peuvent changer avec le temps et vérifier les informations
        avant de nous contacter.
      </p>

      {/* ── Droits ──────────────────────────────────────────────────────────── */}
      <h2 id='m10'>Droits des personnes concernées</h2>
      <p>
        En tant que personne concernée, vous bénéficiez de divers droits en vertu du RGPD,
        qui découlent notamment des articles 15 à 21 du RGPD :
      </p>
      <ul>
        <li><strong>Droit d&apos;opposition :</strong> Vous avez le droit, pour des raisons tenant à votre situation particulière, de vous opposer à tout moment au traitement de vos données personnelles basé sur l&apos;article 6, paragraphe 1, points e) ou f) du RGPD, y compris le profilage fondé sur ces dispositions.</li>
        <li><strong>Droit de retrait du consentement :</strong> Vous avez le droit de retirer votre consentement à tout moment.</li>
        <li><strong>Droit d&apos;accès :</strong> Vous avez le droit de demander la confirmation que les données vous concernant sont traitées, d&apos;être informé de ces données et de recevoir des informations complémentaires et une copie des données conformément aux dispositions légales.</li>
        <li><strong>Droit de rectification :</strong> Vous avez le droit, conformément à la loi, de demander la complétion des données vous concernant ou la rectification des données incorrectes vous concernant.</li>
        <li><strong>Droit à l&apos;effacement et droit à la limitation du traitement :</strong> Conformément aux dispositions légales, vous avez le droit d&apos;exiger l&apos;effacement immédiat des données concernées ou, à titre subsidiaire, d&apos;exiger la limitation du traitement des données conformément aux dispositions légales.</li>
        <li><strong>Droit à la portabilité des données :</strong> Vous avez le droit de recevoir les données vous concernant que vous nous avez fournies dans un format structuré, couramment utilisé et lisible par machine conformément aux exigences légales, ou d&apos;en demander la transmission à un autre responsable du traitement.</li>
        <li><strong>Réclamation auprès de l&apos;autorité de contrôle :</strong> Vous avez également le droit, dans les conditions fixées par la loi, d&apos;introduire une réclamation auprès d&apos;une autorité de contrôle, en particulier dans l&apos;État membre dans lequel vous résidez habituellement, dans lequel se trouve votre lieu de travail ou dans lequel la violation présumée a eu lieu, si vous estimez que le traitement des données personnelles vous concernant viole le RGPD.</li>
      </ul>

      {/* ── Terminologie et définitions ─────────────────────────────────────── */}
      <h2 id='m42'>Terminologie et définitions</h2>
      <p>
        Cette section donne un aperçu des termes utilisés dans la présente politique de
        confidentialité. Beaucoup de ces termes sont tirés de la loi et définis principalement
        à l&apos;article 4 du RGPD. Les explications suivantes visent avant tout à faciliter
        la compréhension.
      </p>
      <dl>
        <dt>Responsable du traitement</dt>
        <dd>Le &quot;responsable du traitement&quot; désigne la personne physique ou morale, l&apos;autorité publique, le service ou tout autre organisme qui, seul ou conjointement avec d&apos;autres, détermine les finalités et les moyens du traitement des données personnelles.</dd>
        <dt>Données personnelles</dt>
        <dd>Les &quot;données personnelles&quot; désignent toute information se rapportant à une personne physique identifiée ou identifiable (&quot;personne concernée&quot;) ; est réputée identifiable une personne physique qui peut être identifiée, directement ou indirectement, notamment par référence à un identifiant, tel qu&apos;un nom, un numéro d&apos;identification, des données de localisation, un identifiant en ligne, ou à un ou plusieurs éléments spécifiques propres à son identité physique, physiologique, génétique, psychique, économique, culturelle ou sociale.</dd>
        <dt>Traitement</dt>
        <dd>Le terme &quot;traitement&quot; couvre un large spectre et pratiquement toute manipulation de données, qu&apos;il s&apos;agisse de la collecte, de l&apos;évaluation, du stockage, de la transmission ou de l&apos;effacement.</dd>
        <dt>Remarketing</dt>
        <dd>Le &quot;remarketing&quot; ou &quot;reciblage&quot; est le terme utilisé, par exemple, pour indiquer à des fins publicitaires les produits qui intéressent un utilisateur sur un site web afin de lui rappeler ces produits sur d&apos;autres sites web, par ex. dans des publicités.</dd>
        <dt>Tracking</dt>
        <dd>Le terme &quot;tracking&quot; est utilisé lorsque le comportement des utilisateurs peut être retracé sur plusieurs sites web. En règle générale, les informations sur le comportement et les centres d&apos;intérêt concernant les sites web utilisés sont stockées dans des cookies ou sur les serveurs des fournisseurs de technologies de tracking (ce qu&apos;on appelle le profilage).</dd>
        <dt>Analyse web</dt>
        <dd>L&apos;analyse web sert à évaluer le trafic des visiteurs des services en ligne et peut déterminer leur comportement ou leurs intérêts concernant certaines informations, telles que les contenus des sites web. Grâce à l&apos;analyse web, les propriétaires de sites web peuvent reconnaître à quelle heure les visiteurs accèdent à leur site web et à quels contenus ils s&apos;intéressent.</dd>
      </dl>
    </>
  );
}

function PolicyContentEs() {
  return (
    <>
      <p>
        Con la siguiente política de privacidad deseamos informarle sobre los tipos de sus
        datos personales (en adelante también denominados &quot;datos&quot;) que tratamos,
        con qué finalidades y en qué medida. La presente declaración se aplica a todo
        tratamiento de datos personales realizado por nosotros, tanto en el marco de la
        prestación de nuestros servicios como, en particular, en nuestros sitios web, en
        aplicaciones móviles y en nuestras presencias en línea externas, como nuestros
        perfiles en redes sociales (en adelante denominados colectivamente
        &quot;servicios en línea&quot;).
      </p>
      <p>Los términos utilizados no son específicos de género.</p>
      <p><strong>Última actualización:</strong> 3 de diciembre de 2024</p>

      {/* ── Responsable del tratamiento ─────────────────────────────────────── */}
      <h2 id='m3'>Responsable del tratamiento</h2>
      <p>
        Grupo de investigación iScience / Universidad de Constanza<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Alemania
      </p>
      <dl>
        <dt>Representantes autorizados</dt>
        <dd>Yury Shevchenko</dd>
        <dt>Dirección de correo electrónico</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Teléfono</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Aviso legal</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Resumen ─────────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Resumen de las operaciones de tratamiento</h2>
      <p>
        La siguiente tabla resume los tipos de datos tratados, las finalidades para las que
        se tratan y las personas afectadas.
      </p>
      <h3>Categorías de datos tratados</h3>
      <ul>
        <li>Datos de estudio (p. ej. entradas de texto, imágenes)</li>
        <li>Datos de investigadores (p. ej. nombre, institución, correo electrónico, idioma)</li>
        <li>Datos de participantes (p. ej. correo electrónico, zona horaria, preferencias horarias, código de participante)</li>
        <li>Datos de notificación (p. ej. título, mensaje, URL, calendario de notificaciones)</li>
        <li>Marcas de tiempo de notificación (p. ej. momento de recepción de una notificación en la aplicación, toque en la barra de notificaciones, apertura en la aplicación, eliminación, evento de geofencing, evento de finalización)</li>
        <li>Datos meta/de comunicación (p. ej. cookies)</li>
        <li>Datos de contacto (p. ej. correo electrónico, números de teléfono)</li>
      </ul>
      <h3>Categorías de personas afectadas</h3>
      <ul>
        <li>Investigadores</li>
        <li>Participantes</li>
      </ul>
      <h3>Finalidades del tratamiento</h3>
      <ul>
        <li>Procesos de autenticación</li>
        <li>Prestación de nuestros servicios en línea y usabilidad</li>
        <li>Procedimientos de oficina y organizativos</li>
        <li>Comentarios (p. ej. recopilación de opiniones a través de un formulario en línea)</li>
        <li>Solicitudes de contacto y comunicación</li>
        <li>Medidas de seguridad</li>
        <li>Servicios contractuales y asistencia</li>
        <li>Gestión y respuesta a consultas</li>
      </ul>

      {/* ── Bases jurídicas ─────────────────────────────────────────────────── */}
      <h2 id='m13'>Bases jurídicas del tratamiento</h2>
      <p>
        A continuación le informamos sobre la base jurídica del Reglamento General de
        Protección de Datos (RGPD) en la que fundamentamos el tratamiento de datos
        personales. Tenga en cuenta que, además de las disposiciones del RGPD, pueden
        aplicarse las normativas nacionales de protección de datos de su país o de nuestro
        país de residencia o domicilio. Si, además, son aplicables bases jurídicas más
        específicas en casos concretos, se lo comunicaremos en la presente declaración.
      </p>
      <ul>
        <li><strong>Consentimiento (Artículo 6 (1) (a) RGPD)</strong> — El interesado ha dado su consentimiento para el tratamiento de sus datos personales con uno o varios fines específicos.</li>
        <li><strong>Ejecución de un contrato y solicitudes previas (Artículo 6 (1) (b) RGPD)</strong> — El tratamiento es necesario para la ejecución de un contrato en el que el interesado es parte o para la aplicación de medidas precontractuales adoptadas a petición del interesado.</li>
        <li><strong>Cumplimiento de una obligación legal (Artículo 6 (1) (c) RGPD)</strong> — El tratamiento es necesario para el cumplimiento de una obligación legal a la que está sujeto el responsable del tratamiento.</li>
        <li><strong>Protección de intereses vitales (Artículo 6 (1) (d) RGPD)</strong> — El tratamiento es necesario para proteger los intereses vitales del interesado o de otra persona física.</li>
        <li><strong>Intereses legítimos (Artículo 6 (1) (f) RGPD)</strong> — El tratamiento es necesario para los fines de los intereses legítimos perseguidos por el responsable del tratamiento o por un tercero, excepto cuando dichos intereses queden anulados por los intereses o los derechos y libertades fundamentales del interesado que requieran la protección de datos personales.</li>
      </ul>
      <p>
        <strong>Normativa nacional de protección de datos en Alemania:</strong>{' '}
        Además de las disposiciones del RGPD, se aplican en Alemania las normativas
        nacionales de protección de datos. Entre ellas se incluye, en particular, la Ley
        Federal de Protección de Datos (BDSG). Esta contiene disposiciones especiales sobre
        el derecho de acceso, el derecho de supresión, el derecho de oposición, el
        tratamiento de categorías especiales de datos personales, el tratamiento con otros
        fines y la transmisión, así como la toma de decisiones individuales automatizadas,
        incluida la elaboración de perfiles. Además, pueden aplicarse las leyes de
        protección de datos de los distintos estados federales.
      </p>

      {/* ── Aplicación móvil ────────────────────────────────────────────────── */}
      <h2 id='m200'>Prestación de la aplicación móvil Samply Research</h2>
      <p>
        <strong>Información proporcionada por el usuario:</strong> La aplicación obtiene
        la información que usted proporciona cuando la descarga y se registra. El registro
        es obligatorio para poder utilizar las funciones básicas de la aplicación. Al
        registrarse y utilizar la aplicación, usted proporciona (a) su dirección de correo
        electrónico y contraseña; (b) la zona horaria y el idioma de su smartphone;
        (c) las marcas de tiempo de los siguientes eventos: recepción de una notificación
        en la aplicación, toque en la barra de notificaciones, apertura de una notificación
        en la aplicación, eliminación de una notificación, finalización de una encuesta;
        (d) la información que nos proporciona cuando nos contacta para obtener ayuda;
        (e) la información que introduce en nuestro sistema al utilizar la aplicación, por
        ejemplo al unirse a un estudio; (f) su información de ubicación actual y las marcas
        de tiempo de los eventos de geofencing al utilizar la aplicación y cuando la
        aplicación está cerrada, si participa en un estudio que utiliza geofencing.
      </p>
      <p>
        <strong>Uso de su ubicación actual en segundo plano:</strong>{' '}
        Algunos estudios pueden requerir el envío de un enlace a encuestas en línea cuando
        usted entra o sale de un lugar determinado (p. ej. su lugar de trabajo). Por este
        motivo, si se une a un estudio que utiliza este tipo de contacto con los
        participantes, se le pedirá que autorice el seguimiento de ubicación continuo. Si
        acepta, la aplicación realizará un seguimiento continuo de su ubicación incluso
        cuando esté cerrada. La aplicación no compartirá sus datos de ubicación con
        servicios de terceros ni con investigadores. Su información de ubicación se
        utilizará únicamente para enviar notificaciones con enlaces a encuestas en línea
        creadas por investigadores. Puede activar o desactivar el seguimiento de ubicación
        para un estudio específico en la aplicación en cualquier momento. Si no desea que
        utilicemos su ubicación para los fines mencionados, debe desactivar los servicios
        de ubicación para la aplicación móvil en la configuración de su cuenta, en la
        configuración de su teléfono móvil y/o en la propia aplicación móvil.
      </p>
      <p>
        <strong>Política de conservación de datos, gestión de su información:</strong>{' '}
        Puede detener toda recopilación de información por parte de la aplicación
        eliminando su cuenta (a través del menú &quot;Más&quot;, luego
        &quot;Configuración&quot;, luego &quot;Eliminar mi cuenta&quot;) y desinstalando
        la aplicación. Puede utilizar los procesos de desinstalación estándar disponibles
        en su dispositivo móvil o a través del mercado o la red de aplicaciones móviles.
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos de estudio; datos de investigadores; datos de participantes; datos de notificación; marcas de tiempo de notificación.</dd>
        <dt>Personas afectadas</dt>
        <dd>Participantes.</dd>
        <dt>Finalidades del tratamiento</dt>
        <dd>Procesos de autenticación; prestación de nuestros servicios en línea y usabilidad; solicitudes de contacto y comunicación; medidas de seguridad; gestión y respuesta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimiento (Art. 6 (1) (a) RGPD); cumplimiento de una obligación legal (Art. 6 (1) (c) RGPD); protección de intereses vitales (Art. 6 (1) (d) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Servicios y proveedores de servicios utilizados:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Kit de herramientas y plataforma para crear una aplicación móvil y distribuirla en Android e iOS. Proveedor: Expo. Sitio web: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Política de privacidad: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — Plataforma de distribución de aplicaciones móviles para iOS e iPadOS. Proveedor: Apple Inc., One Apple Park Way, Cupertino, CA 95014, EE. UU. Sitio web: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Política de privacidad: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Plataforma de distribución de aplicaciones para dispositivos Android y Chrome OS. Proveedor: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, EE. UU. Sitio web: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Política de privacidad: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Alojamiento web ──────────────────────────────────────────────────── */}
      <h2 id='m225'>Prestación de servicios en línea y alojamiento web</h2>
      <p>
        Para prestar nuestros servicios en línea en el sitio web de Samply
        (https://samply.uni-konstanz.de/), utilizamos la infraestructura (servidor web,
        capacidad de cómputo, espacio de almacenamiento, servicios de base de datos,
        servicios de seguridad y mantenimiento técnico) de la Universidad de Constanza en
        Alemania.
      </p>
      <p>
        Los datos tratados en el marco de la prestación del sitio web incluyen toda la
        información relativa a los usuarios de la aplicación móvil Samply Research y del
        sitio web de Samply, recopilada durante el uso y las comunicaciones. Los datos de
        los participantes y las marcas de tiempo de las notificaciones se almacenan en la
        base de datos segura y solo son accesibles para los investigadores del estudio
        correspondiente que los recopiló. Los investigadores pueden eliminar estos datos a
        través de la interfaz del sitio web de Samply.
      </p>
      <p>
        <strong>Envío y alojamiento de correos electrónicos:</strong> Los servicios de
        alojamiento web que utilizamos también incluyen el envío, la recepción y el
        almacenamiento de correos electrónicos. Con este fin, se tratan las direcciones de
        los destinatarios y remitentes, así como otra información relacionada con el envío
        de correos electrónicos (p. ej. los proveedores involucrados) y el contenido de
        cada correo electrónico. Estos datos también pueden tratarse con fines de detección
        de SPAM. Tenga en cuenta que los correos electrónicos en Internet generalmente no
        se envían en forma cifrada. Como norma general, los correos electrónicos se cifran
        durante el transporte, pero no en los servidores desde los que se envían y reciben
        (salvo que se utilice un método de cifrado de extremo a extremo). Por tanto, no
        podemos asumir ninguna responsabilidad por la ruta de transmisión de los correos
        electrónicos entre el remitente y la recepción en nuestro servidor.
      </p>
      <p>
        <strong>Recopilación de datos de acceso y archivos de registro:</strong> Nosotros
        mismos o nuestro proveedor de alojamiento web recopilamos datos sobre la base de
        cada acceso al servidor (los denominados archivos de registro del servidor). Estos
        archivos pueden incluir la dirección y el nombre de las páginas web y archivos
        consultados, la fecha y hora del acceso, el volumen de datos transferidos, la
        notificación de un acceso exitoso, el tipo y versión del navegador, el sistema
        operativo del usuario, la URL de referencia (la página visitada anteriormente) y,
        por lo general, las direcciones IP y el proveedor solicitante. Los archivos de
        registro del servidor pueden utilizarse con fines de seguridad, p. ej. para evitar
        la sobrecarga de los servidores (especialmente en caso de ataques abusivos,
        denominados ataques DDoS) y para garantizar la estabilidad y el equilibrio óptimo
        de carga de los servidores.
      </p>
      <p>
        <strong>Política de conservación de datos, gestión de su información:</strong>{' '}
        Los usuarios del sitio web (investigadores y participantes) pueden gestionar sus
        cuentas a través de la interfaz del sitio web de Samply. Los usuarios pueden
        eliminar su cuenta mediante el menú &quot;Cuenta&quot;, luego &quot;Eliminar
        mi cuenta&quot;.
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos de estudio; datos de investigadores; datos de participantes; datos de notificación; marcas de tiempo de notificación.</dd>
        <dt>Personas afectadas</dt>
        <dd>Investigadores; participantes.</dd>
        <dt>Finalidades del tratamiento</dt>
        <dd>Procesos de autenticación; prestación de nuestros servicios en línea y usabilidad; solicitudes de contacto y comunicación; medidas de seguridad; gestión y respuesta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimiento (Art. 6 (1) (a) RGPD); cumplimiento de una obligación legal (Art. 6 (1) (c) RGPD); protección de intereses vitales (Art. 6 (1) (d) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Servicios y proveedores de servicios utilizados:</strong></p>
      <ul>
        <li><strong>Servidor web universitario</strong> — Proveedor: Universidad de Constanza, Universitätsstraße 10, 78464 Konstanz, Alemania. Sitio web: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Política de privacidad: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Servicio de correo electrónico transaccional. Proveedor: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, EE. UU. Sitio web: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Política de privacidad: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Seguridad ───────────────────────────────────────────────────────── */}
      <h2 id='m27'>Medidas de seguridad</h2>
      <p>
        Adoptamos medidas técnicas y organizativas adecuadas de conformidad con los
        requisitos legales, teniendo en cuenta el estado de la técnica, los costes de
        aplicación y la naturaleza, el alcance, el contexto y los fines del tratamiento,
        así como el riesgo de probabilidad y gravedad variables para los derechos y
        libertades de las personas físicas, a fin de garantizar un nivel de seguridad
        adecuado al riesgo.
      </p>
      <p>
        Las medidas incluyen, en particular, garantizar la confidencialidad, integridad y
        disponibilidad de los datos mediante el control del acceso físico y electrónico a
        los datos, así como el acceso, introducción, transmisión, seguridad y separación de
        los datos. Además, hemos establecido procedimientos para garantizar el ejercicio de
        los derechos de los interesados, la supresión de los datos y nuestra capacidad para
        responder rápidamente a las amenazas sobre los datos. Asimismo, tenemos en cuenta
        la protección de los datos personales desde el desarrollo o la selección del
        hardware, el software y los proveedores de servicios, de conformidad con el
        principio de protección de datos desde el diseño y por defecto.
      </p>
      <p>
        <strong>Enmascaramiento de la dirección IP:</strong> En general, las direcciones IP
        de investigadores y participantes no se registran ni almacenan. En caso de que esto
        ocurra en el futuro, acortaremos o haremos acortar su dirección IP. Al acortar la
        dirección IP, también conocido como &quot;enmascaramiento de IP&quot;, se elimina
        el último octeto, es decir, los dos últimos números de una dirección IP. Con este
        acortamiento se pretende impedir o dificultar considerablemente la identificación
        de una persona a partir de su dirección IP.
      </p>
      <p>
        <strong>Cifrado SSL (https):</strong> Con el fin de proteger de la mejor manera
        posible los datos que usted transmite a través de nuestros servicios en línea,
        utilizamos el cifrado SSL. Puede reconocer dichas conexiones cifradas por el prefijo
        https:// en la barra de direcciones de su navegador.
      </p>

      {/* ── Transmisión ─────────────────────────────────────────────────────── */}
      <h2 id='m25'>Transmisión y divulgación de datos personales</h2>
      <p>
        En el contexto de nuestro tratamiento de datos personales, puede ocurrir que los
        datos se transfieran a otros lugares, empresas o personas, o que se les divulguen.
        Los destinatarios de estos datos pueden incluir, por ejemplo, entidades de pago en
        el marco de transacciones de pago, proveedores de servicios encargados de tareas
        informáticas o proveedores de servicios y contenidos integrados en un sitio web. En
        tal caso, se respetarán los requisitos legales y, en particular, se celebrarán con
        los destinatarios de sus datos los contratos o acuerdos correspondientes que sirvan
        a la protección de sus datos.
      </p>

      {/* ── Terceros países ─────────────────────────────────────────────────── */}
      <h2 id='m24'>Tratamiento de datos en terceros países</h2>
      <p>
        Si tratamos datos en un tercer país (es decir, fuera de la Unión Europea (UE) o
        del Espacio Económico Europeo (EEE)) o si el tratamiento tiene lugar en el marco
        del uso de servicios de terceros o de la divulgación o transferencia de datos a
        otras personas, entidades o empresas, esto solo se realizará de conformidad con los
        requisitos legales.
      </p>
      <p>
        Con sujeción al consentimiento expreso o a la transferencia requerida por contrato
        o por ley, tratamos o hacemos tratar los datos únicamente en terceros países con un
        nivel de protección de datos reconocido, sobre la base de garantías especiales,
        tales como una obligación contractual mediante las cláusulas de protección estándar
        de la Comisión Europea o si certificaciones o normas internas vinculantes de
        protección de datos justifican el tratamiento (Artículos 44 a 49 RGPD).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Uso de cookies</h2>
      <p>
        No utilizamos cookies de terceros ni cookies con fines estadísticos, de marketing
        o de personalización. Solo utilizamos cookies necesarias (esenciales) requeridas
        para el funcionamiento de un sitio web (p. ej. la autenticación de usuarios).
      </p>
      <p>
        Las cookies son archivos de texto que contienen datos de sitios web o dominios
        visitados y que un navegador almacena en el ordenador del usuario. Una cookie se
        utiliza principalmente para almacenar información sobre un usuario durante o
        después de su visita a un servicio en línea. La información almacenada puede
        incluir, por ejemplo, la configuración de idioma de un sitio web, el estado de
        inicio de sesión, un carrito de compra o el lugar donde se visionó un vídeo.
      </p>
      <p><strong>Se distinguen los siguientes tipos y funciones de cookies:</strong></p>
      <ul>
        <li><strong>Cookies temporales (también: cookies de sesión):</strong> Las cookies temporales se eliminan a más tardar cuando el usuario abandona un servicio en línea y cierra su navegador.</li>
        <li><strong>Cookies permanentes:</strong> Las cookies permanentes permanecen almacenadas incluso después de cerrar el navegador. Por ejemplo, se puede guardar el estado de inicio de sesión o mostrar directamente el contenido preferido cuando el usuario vuelve a visitar un sitio web.</li>
        <li><strong>Cookies propias:</strong> Las cookies propias son establecidas por nosotros mismos.</li>
        <li><strong>Cookies de terceros:</strong> Las cookies de terceros son utilizadas principalmente por anunciantes (los denominados terceros) para tratar la información de los usuarios.</li>
        <li><strong>Cookies necesarias (también: esenciales):</strong> Las cookies pueden ser necesarias para el funcionamiento de un sitio web (p. ej. para guardar inicios de sesión u otras entradas de usuario, o por razones de seguridad).</li>
        <li><strong>Cookies de estadísticas, marketing y personalización:</strong> Las cookies también se utilizan generalmente para medir el alcance de un sitio web y cuando los intereses o el comportamiento de un usuario se almacenan en un perfil de usuario. Dichos perfiles se utilizan, por ejemplo, para mostrar a los usuarios contenido que corresponda a sus posibles intereses.</li>
      </ul>
      <p>
        <strong>Información sobre la base jurídica:</strong> La base jurídica sobre la que
        tratamos sus datos personales con la ayuda de cookies depende de si le pedimos su
        consentimiento. Si así fuera y usted consiente el uso de cookies, la base jurídica
        para el tratamiento de sus datos es su consentimiento declarado. En caso contrario,
        los datos tratados con la ayuda de cookies se tratarán sobre la base de nuestros
        intereses legítimos (p. ej. para la explotación comercial de nuestro servicio en
        línea y su mejora) o, si el uso de cookies es necesario para cumplir nuestras
        obligaciones contractuales.
      </p>
      <p>
        <strong>Período de conservación:</strong> Salvo que le proporcionemos información
        explícita sobre el período de conservación de las cookies permanentes, asuma que
        dicho período puede ser de hasta dos años.
      </p>
      <p>
        <strong>Información general sobre la retirada del consentimiento y la oposición (opt-out):</strong>{' '}
        Tiene la posibilidad en todo momento de oponerse al tratamiento de sus datos
        mediante tecnologías de cookies o de revocar su consentimiento. Puede manifestar
        inicialmente su oposición a través de la configuración de su navegador, p. ej.
        desactivando el uso de cookies (lo que también puede restringir la funcionalidad de
        nuestros servicios en línea). La oposición al uso de cookies con fines de marketing
        en línea puede ejercerse para un gran número de servicios, especialmente en el caso
        del seguimiento, a través de los sitios web{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        y{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos meta/de comunicación (p. ej. cookies).</dd>
        <dt>Personas afectadas</dt>
        <dd>Investigadores; participantes.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimiento (Art. 6 (1) (a) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Servicios comerciales ────────────────────────────────────────────── */}
      <h2 id='m317'>Servicios comerciales</h2>
      <p>
        La siguiente información sobre servicios comerciales se aplica únicamente a los
        investigadores que deseen remunerar a los participantes mediante la integración de
        la plataforma Samply con Stripe.
      </p>
      <p>
        Tratamos los datos de nuestros socios contractuales y comerciales, p. ej. clientes
        y partes interesadas (denominados colectivamente &quot;socios contractuales&quot;)
        en el marco de relaciones contractuales y comparables, así como de las acciones
        asociadas y las comunicaciones con los socios contractuales o en fase precontractual,
        p. ej. para responder a consultas.
      </p>
      <p>
        Tratamos estos datos a fin de cumplir nuestras obligaciones contractuales,
        salvaguardar nuestros derechos y con los fines de las tareas administrativas
        asociadas a estos datos y a la organización empresarial. Solo transferiremos los
        datos de los socios contractuales a terceros en el marco de la legislación aplicable
        en la medida en que sea necesario para los fines mencionados, para el cumplimiento
        de obligaciones legales o con el consentimiento de los interesados.
      </p>
      <p>
        Eliminamos los datos una vez transcurridos los plazos legales de garantía y
        obligaciones comparables, es decir, en principio tras la expiración de 4 años,
        salvo que los datos estén almacenados en una cuenta de cliente o deban conservarse
        por razones legales de archivo (p. ej. por lo general 10 años con fines fiscales).
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos de investigadores (p. ej. nombre, institución, correo electrónico, idioma); datos de participantes (p. ej. correo electrónico, zona horaria, preferencias horarias, código de participante).</dd>
        <dt>Personas afectadas</dt>
        <dd>Investigadores; participantes.</dd>
        <dt>Finalidades del tratamiento</dt>
        <dd>Servicios contractuales y asistencia; solicitudes de contacto y comunicación; procedimientos de oficina y organizativos; gestión y respuesta a consultas; medidas de seguridad.</dd>
        <dt>Base jurídica</dt>
        <dd>Ejecución de un contrato y solicitudes previas (Art. 6 (1) (b) RGPD); cumplimiento de una obligación legal (Art. 6 (1) (c) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Servicios y proveedores de servicios utilizados:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Plataforma de procesamiento de pagos. Proveedor: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, Estados Unidos. Sitio web: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Política de privacidad: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Registro ────────────────────────────────────────────────────────── */}
      <h2 id='m367'>Registro, inicio de sesión y cuenta de usuario</h2>
      <p>
        Los usuarios pueden crear una cuenta de usuario. En el marco del registro, se
        comunica a los usuarios la información obligatoria requerida y se trata con los
        fines de la prestación de la cuenta de usuario sobre la base del cumplimiento de
        las obligaciones contractuales. Los datos tratados incluyen en particular la
        información de inicio de sesión (nombre, contraseña y dirección de correo
        electrónico).
      </p>
      <p>
        Los usuarios pueden ser informados por correo electrónico de información relevante
        para su cuenta de usuario, como cambios técnicos. Si los usuarios han rescindido su
        cuenta de usuario, sus datos serán eliminados con respecto a dicha cuenta, sujeto a
        una obligación legal de conservación. Es responsabilidad de los usuarios proteger
        sus datos antes del fin del contrato en caso de rescisión. Estamos autorizados a
        eliminar de forma irreversible todos los datos de usuario almacenados durante la
        vigencia del contrato.
      </p>
      <p>
        En el marco del uso de nuestras funciones de registro e inicio de sesión, así como
        del uso de la cuenta de usuario, almacenamos la dirección IP y la hora de cada
        acción del usuario. El almacenamiento se basa en nuestros intereses legítimos, así
        como en la protección del usuario frente a usos indebidos y otros usos no
        autorizados. Estos datos no se transmitirán a terceros salvo que sea necesario para
        perseguir nuestras reclamaciones o exista una obligación legal al respecto.
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos de investigadores (p. ej. nombre, correo electrónico); datos de participantes (p. ej. correo electrónico).</dd>
        <dt>Personas afectadas</dt>
        <dd>Investigadores; participantes.</dd>
        <dt>Finalidades del tratamiento</dt>
        <dd>Servicios contractuales y asistencia; medidas de seguridad; gestión y respuesta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimiento (Art. 6 (1) (a) RGPD); ejecución de un contrato y solicitudes previas (Art. 6 (1) (b) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Contacto ────────────────────────────────────────────────────────── */}
      <h2 id='m182'>Contacto</h2>
      <p>
        Cuando nos contacta (p. ej. a través de un formulario de contacto, por correo
        electrónico, por teléfono o a través de las redes sociales), los datos de las
        personas que realizan consultas se tratan en la medida en que sea necesario para
        responder a las solicitudes de contacto y a las actividades requeridas.
      </p>
      <p>
        La respuesta a las solicitudes de contacto en el marco de relaciones contractuales
        o precontractuales se realiza para cumplir nuestras obligaciones contractuales o
        para responder a las consultas (pre)contractuales y, en los demás casos, sobre la
        base de los intereses legítimos en responder a las consultas.
      </p>
      <dl>
        <dt>Tipos de datos tratados</dt>
        <dd>Datos de contacto (p. ej. correo electrónico, números de teléfono).</dd>
        <dt>Personas afectadas</dt>
        <dd>Investigadores; participantes.</dd>
        <dt>Finalidades del tratamiento</dt>
        <dd>Solicitudes de contacto y comunicación.</dd>
        <dt>Base jurídica</dt>
        <dd>Ejecución de un contrato y solicitudes previas (Art. 6 (1) (b) RGPD); intereses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Supresión de datos ──────────────────────────────────────────────── */}
      <h2 id='m12'>Supresión de datos</h2>
      <p>
        Los datos que tratamos serán suprimidos de conformidad con las disposiciones
        legales en cuanto se revoque su tratamiento o dejen de aplicarse otras autorizaciones
        (p. ej. si desaparece la finalidad del tratamiento de dichos datos o si ya no son
        necesarios para dicha finalidad).
      </p>
      <p>
        Si los datos no se eliminan porque son necesarios para otros fines legalmente
        admisibles, su tratamiento se limitará a dichos fines. Esto significa que los datos
        quedarán restringidos y no se tratarán para otros fines. Esto se aplica, por ejemplo,
        a los datos que deben conservarse por razones comerciales o fiscales o cuya
        conservación es necesaria para ejercer, hacer valer o defender reclamaciones legales
        o para proteger los derechos de otra persona física o jurídica.
      </p>

      {/* ── Cambios y actualizaciones ───────────────────────────────────────── */}
      <h2 id='m15'>Cambios y actualizaciones de la política de privacidad</h2>
      <p>
        Le pedimos que se informe regularmente sobre el contenido de nuestra declaración de
        protección de datos. Adaptaremos la política de privacidad cuando los cambios en
        nuestras prácticas de tratamiento de datos lo hagan necesario. Le informaremos en
        cuanto los cambios requieran su participación (p. ej. consentimiento) u otra
        notificación individual.
      </p>
      <p>
        Si en la presente política de privacidad proporcionamos direcciones e información
        de contacto de empresas y organizaciones, le pedimos que tenga en cuenta que las
        direcciones pueden cambiar con el tiempo y que verifique la información antes de
        contactarnos.
      </p>

      {/* ── Derechos ────────────────────────────────────────────────────────── */}
      <h2 id='m10'>Derechos de los interesados</h2>
      <p>
        Como interesado, tiene derecho a diversos derechos en virtud del RGPD, que se
        derivan en particular de los artículos 15 a 21 del RGPD:
      </p>
      <ul>
        <li><strong>Derecho de oposición:</strong> Tiene derecho, por motivos relacionados con su situación particular, a oponerse en cualquier momento al tratamiento de sus datos personales basado en la letra (e) o (f) del artículo 6, apartado 1, del RGPD, incluida la elaboración de perfiles basada en dichas disposiciones.</li>
        <li><strong>Derecho de retirada del consentimiento:</strong> Tiene derecho a retirar su consentimiento en cualquier momento.</li>
        <li><strong>Derecho de acceso:</strong> Tiene derecho a solicitar la confirmación de si se tratan los datos que le conciernen, a ser informado de dichos datos y a recibir información adicional y una copia de los datos de conformidad con las disposiciones legales.</li>
        <li><strong>Derecho de rectificación:</strong> Tiene derecho, de conformidad con la ley, a solicitar la complementación de los datos que le conciernen o la rectificación de los datos incorrectos que le conciernen.</li>
        <li><strong>Derecho de supresión y derecho a la limitación del tratamiento:</strong> De conformidad con las disposiciones legales, tiene derecho a exigir la supresión inmediata de los datos pertinentes o, alternativamente, a exigir la limitación del tratamiento de los datos de conformidad con las disposiciones legales.</li>
        <li><strong>Derecho a la portabilidad de los datos:</strong> Tiene derecho a recibir los datos que le conciernen y que nos ha proporcionado en un formato estructurado, de uso común y de lectura mecánica de conformidad con los requisitos legales, o a solicitar su transmisión a otro responsable del tratamiento.</li>
        <li><strong>Reclamación ante la autoridad de control:</strong> También tiene derecho, en las condiciones establecidas por la ley, a presentar una reclamación ante una autoridad de control, en particular en el Estado miembro en el que resida habitualmente, en el que tenga su lugar de trabajo o en el que se haya producido la presunta infracción, si considera que el tratamiento de datos personales que le conciernen infringe el RGPD.</li>
      </ul>

      {/* ── Terminología y definiciones ─────────────────────────────────────── */}
      <h2 id='m42'>Terminología y definiciones</h2>
      <p>
        Esta sección ofrece una visión general de los términos utilizados en la presente
        política de privacidad. Muchos de estos términos están extraídos de la ley y
        definidos principalmente en el artículo 4 del RGPD. Las siguientes explicaciones
        tienen por objeto ante todo facilitar la comprensión.
      </p>
      <dl>
        <dt>Responsable del tratamiento</dt>
        <dd>El &quot;responsable del tratamiento&quot; es la persona física o jurídica, autoridad pública, servicio u otro organismo que, solo o conjuntamente con otros, determine los fines y medios del tratamiento de datos personales.</dd>
        <dt>Datos personales</dt>
        <dd>Los &quot;datos personales&quot; son toda información sobre una persona física identificada o identificable (&quot;interesado&quot;); se considerará persona física identificable toda persona cuya identidad pueda determinarse, directa o indirectamente, en particular mediante un identificador, como por ejemplo un nombre, un número de identificación, datos de localización, un identificador en línea, o uno o varios elementos propios de la identidad física, fisiológica, genética, psíquica, económica, cultural o social de dicha persona.</dd>
        <dt>Tratamiento</dt>
        <dd>El término &quot;tratamiento&quot; abarca un amplio espectro y prácticamente cualquier manipulación de datos, ya sea la recopilación, la evaluación, el almacenamiento, la transmisión o la supresión.</dd>
        <dt>Remarketing</dt>
        <dd>El &quot;remarketing&quot; o &quot;retargeting&quot; es el término utilizado, por ejemplo, para indicar con fines publicitarios los productos que interesan a un usuario en un sitio web con el fin de recordarle dichos productos en otros sitios web, p. ej. en anuncios.</dd>
        <dt>Tracking</dt>
        <dd>El término &quot;tracking&quot; se utiliza cuando el comportamiento de los usuarios puede rastrearse en varios sitios web. Por lo general, la información sobre el comportamiento e intereses con respecto a los sitios web utilizados se almacena en cookies o en los servidores de los proveedores de tecnología de seguimiento (lo que se denomina elaboración de perfiles).</dd>
        <dt>Análisis web</dt>
        <dd>El análisis web sirve para evaluar el tráfico de visitantes de los servicios en línea y puede determinar su comportamiento o sus intereses en determinada información, como los contenidos de los sitios web. Con la ayuda del análisis web, los propietarios de sitios web pueden reconocer a qué hora visitan los visitantes su sitio web y qué contenidos les interesan.</dd>
      </dl>
    </>
  );
}

function PolicyContentPt() {
  return (
    <>
      <p>
        Com a seguinte política de privacidade, desejamos informá-lo sobre os tipos de seus
        dados pessoais (doravante também denominados &quot;dados&quot;) que tratamos,
        com quais finalidades e em que medida. A presente declaração se aplica a todo
        tratamento de dados pessoais realizado por nós, tanto no âmbito da
        prestação de nossos serviços quanto, em particular, em nossos sites, em
        aplicativos móveis e em nossas presenças on-line externas, como nossos
        perfis em redes sociais (doravante denominados coletivamente
        &quot;serviços on-line&quot;).
      </p>
      <p>Os termos utilizados não são específicos de gênero.</p>
      <p><strong>Última atualização:</strong> 3 de dezembro de 2024</p>

      {/* ── Responsável pelo tratamento ─────────────────────────────────────── */}
      <h2 id='m3'>Responsável pelo tratamento</h2>
      <p>
        Grupo de pesquisa iScience / Universidade de Konstanz<br />
        Universitätsstraße 10<br />
        78464 Konstanz, Alemanha
      </p>
      <dl>
        <dt>Representantes autorizados</dt>
        <dd>Yury Shevchenko</dd>
        <dt>Endereço de e-mail</dt>
        <dd><a href='mailto:yury.shevchenko@uni.kn'>yury.shevchenko@uni.kn</a></dd>
        <dt>Telefone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Aviso legal</dt>
        <dd><a href='/docs/legalnotice'>samply.uni-konstanz.de/docs/legalnotice</a></dd>
      </dl>

      {/* ── Resumo ──────────────────────────────────────────────────────────── */}
      <h2 id='mOverview'>Resumo das operações de tratamento</h2>
      <p>
        A tabela a seguir resume os tipos de dados tratados, as finalidades para as quais
        são tratados e as pessoas afetadas.
      </p>
      <h3>Categorias de dados tratados</h3>
      <ul>
        <li>Dados de estudo (p. ex. entradas de texto, imagens)</li>
        <li>Dados de pesquisadores (p. ex. nome, instituição, e-mail, idioma)</li>
        <li>Dados de participantes (p. ex. e-mail, fuso horário, preferências de horário, código de participante)</li>
        <li>Dados de notificação (p. ex. título, mensagem, URL, calendário de notificações)</li>
        <li>Registros de data e hora de notificação (p. ex. momento de recebimento de uma notificação no aplicativo, toque na barra de notificações, abertura no aplicativo, exclusão, evento de geofencing, evento de conclusão)</li>
        <li>Dados meta/de comunicação (p. ex. cookies)</li>
        <li>Dados de contato (p. ex. e-mail, números de telefone)</li>
      </ul>
      <h3>Categorias de pessoas afetadas</h3>
      <ul>
        <li>Pesquisadores</li>
        <li>Participantes</li>
      </ul>
      <h3>Finalidades do tratamento</h3>
      <ul>
        <li>Processos de autenticação</li>
        <li>Prestação de nossos serviços on-line e usabilidade</li>
        <li>Procedimentos administrativos e organizacionais</li>
        <li>Feedback (p. ex. coleta de opiniões por meio de formulário on-line)</li>
        <li>Solicitações de contato e comunicação</li>
        <li>Medidas de segurança</li>
        <li>Serviços contratuais e suporte</li>
        <li>Gerenciamento e resposta a consultas</li>
      </ul>

      {/* ── Bases jurídicas ─────────────────────────────────────────────────── */}
      <h2 id='m13'>Bases jurídicas do tratamento</h2>
      <p>
        A seguir, informamos sobre a base jurídica do Regulamento Geral de
        Proteção de Dados (RGPD) na qual fundamentamos o tratamento de dados
        pessoais. Observe que, além das disposições do RGPD, podem
        aplicar-se as normativas nacionais de proteção de dados do seu país ou do nosso
        país de residência ou domicílio. Se, além disso, bases jurídicas mais
        específicas forem aplicáveis em casos concretos, iremos comunicá-las na presente declaração.
      </p>
      <ul>
        <li><strong>Consentimento (Artigo 6 (1) (a) RGPD)</strong> — O titular dos dados deu seu consentimento para o tratamento de seus dados pessoais para uma ou mais finalidades específicas.</li>
        <li><strong>Execução de um contrato e solicitações prévias (Artigo 6 (1) (b) RGPD)</strong> — O tratamento é necessário para a execução de um contrato do qual o titular dos dados é parte ou para a aplicação de medidas pré-contratuais adotadas a pedido do titular dos dados.</li>
        <li><strong>Cumprimento de uma obrigação legal (Artigo 6 (1) (c) RGPD)</strong> — O tratamento é necessário para o cumprimento de uma obrigação legal à qual o responsável pelo tratamento está sujeito.</li>
        <li><strong>Proteção de interesses vitais (Artigo 6 (1) (d) RGPD)</strong> — O tratamento é necessário para proteger os interesses vitais do titular dos dados ou de outra pessoa física.</li>
        <li><strong>Interesses legítimos (Artigo 6 (1) (f) RGPD)</strong> — O tratamento é necessário para os fins dos interesses legítimos perseguidos pelo responsável pelo tratamento ou por um terceiro, exceto quando tais interesses sejam anulados pelos interesses ou pelos direitos e liberdades fundamentais do titular dos dados que exijam a proteção de dados pessoais.</li>
      </ul>
      <p>
        <strong>Normativa nacional de proteção de dados na Alemanha:</strong>{' '}
        Além das disposições do RGPD, aplicam-se na Alemanha as normativas
        nacionais de proteção de dados. Entre elas se inclui, em particular, a Lei
        Federal de Proteção de Dados (BDSG). Esta contém disposições especiais sobre
        o direito de acesso, o direito de exclusão, o direito de oposição, o
        tratamento de categorias especiais de dados pessoais, o tratamento com outras
        finalidades e a transmissão, bem como a tomada de decisões individuais automatizadas,
        incluindo a elaboração de perfis. Além disso, podem aplicar-se as leis de
        proteção de dados dos distintos estados federais.
      </p>

      {/* ── Aplicativo móvel ────────────────────────────────────────────────── */}
      <h2 id='m200'>Prestação do aplicativo móvel Samply Research</h2>
      <p>
        <strong>Informações fornecidas pelo usuário:</strong> O aplicativo obtém
        as informações que você fornece quando o baixa e se cadastra. O cadastro
        é obrigatório para poder utilizar as funções básicas do aplicativo. Ao
        se cadastrar e utilizar o aplicativo, você fornece (a) seu endereço de e-mail
        e senha; (b) o fuso horário e o idioma do seu smartphone;
        (c) os registros de data e hora dos seguintes eventos: recebimento de uma notificação
        no aplicativo, toque na barra de notificações, abertura de uma notificação
        no aplicativo, exclusão de uma notificação, conclusão de uma pesquisa;
        (d) as informações que nos fornece quando nos contata para obter ajuda;
        (e) as informações que insere em nosso sistema ao utilizar o aplicativo, por
        exemplo ao ingressar em um estudo; (f) suas informações de localização atual e os registros
        de data e hora dos eventos de geofencing ao utilizar o aplicativo e quando o
        aplicativo está fechado, se você participar de um estudo que utiliza geofencing.
      </p>
      <p>
        <strong>Uso de sua localização atual em segundo plano:</strong>{' '}
        Alguns estudos podem exigir o envio de um link para pesquisas on-line quando
        você entra ou sai de um determinado local (p. ex. seu local de trabalho). Por esse
        motivo, se você ingressar em um estudo que utiliza esse tipo de contato com os
        participantes, será solicitado que autorize o rastreamento de localização contínuo. Se
        concordar, o aplicativo realizará um rastreamento contínuo de sua localização mesmo
        quando estiver fechado. O aplicativo não compartilhará seus dados de localização com
        serviços de terceiros nem com pesquisadores. Suas informações de localização serão
        utilizadas exclusivamente para enviar notificações com links para pesquisas on-line
        criadas por pesquisadores. Você pode ativar ou desativar o rastreamento de localização
        para um estudo específico no aplicativo a qualquer momento. Se não desejar que
        utilizemos sua localização para os fins mencionados, você deve desativar os serviços
        de localização para o aplicativo móvel nas configurações de sua conta, nas
        configurações do seu telefone celular e/ou no próprio aplicativo móvel.
      </p>
      <p>
        <strong>Política de retenção de dados, gerenciamento de suas informações:</strong>{' '}
        Você pode interromper toda coleta de informações pelo aplicativo
        excluindo sua conta (por meio do menu &quot;Mais&quot;, em seguida
        &quot;Configurações&quot;, em seguida &quot;Excluir minha conta&quot;) e desinstalando
        o aplicativo. Você pode utilizar os processos de desinstalação padrão disponíveis
        em seu dispositivo móvel ou por meio da loja ou rede de aplicativos móveis.
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados de estudo; dados de pesquisadores; dados de participantes; dados de notificação; registros de data e hora de notificação.</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Participantes.</dd>
        <dt>Finalidades do tratamento</dt>
        <dd>Processos de autenticação; prestação de nossos serviços on-line e usabilidade; solicitações de contato e comunicação; medidas de segurança; gerenciamento e resposta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimento (Art. 6 (1) (a) RGPD); cumprimento de uma obrigação legal (Art. 6 (1) (c) RGPD); proteção de interesses vitais (Art. 6 (1) (d) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Serviços e prestadores de serviços utilizados:</strong></p>
      <ul>
        <li><strong>Expo</strong> — Kit de ferramentas e plataforma para criar um aplicativo móvel e distribuí-lo no Android e iOS. Prestador: Expo. Site: <a href='https://expo.dev/' target='_blank' rel='noreferrer'>https://expo.dev/</a>. Política de privacidade: <a href='https://expo.dev/privacy' target='_blank' rel='noreferrer'>https://expo.dev/privacy</a>.</li>
        <li><strong>App Store</strong> — Plataforma de distribuição de aplicativos móveis para iOS e iPadOS. Prestador: Apple Inc., One Apple Park Way, Cupertino, CA 95014, EUA. Site: <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>https://www.apple.com/app-store/</a>. Política de privacidade: <a href='https://www.apple.com/privacy/' target='_blank' rel='noreferrer'>https://www.apple.com/privacy/</a>.</li>
        <li><strong>Google Play</strong> — Plataforma de distribuição de aplicativos para dispositivos Android e Chrome OS. Prestador: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, EUA. Site: <a href='https://play.google.com/store' target='_blank' rel='noreferrer'>https://play.google.com/store</a>. Política de privacidade: <a href='https://policies.google.com/privacy' target='_blank' rel='noreferrer'>https://policies.google.com/privacy</a>.</li>
      </ul>

      {/* ── Hospedagem web ───────────────────────────────────────────────────── */}
      <h2 id='m225'>Prestação de serviços on-line e hospedagem web</h2>
      <p>
        Para prestar nossos serviços on-line no site do Samply
        (https://samply.uni-konstanz.de/), utilizamos a infraestrutura (servidor web,
        capacidade de computação, espaço de armazenamento, serviços de banco de dados,
        serviços de segurança e manutenção técnica) da Universidade de Konstanz na
        Alemanha.
      </p>
      <p>
        Os dados tratados no âmbito da prestação do site incluem todas as
        informações relativas aos usuários do aplicativo móvel Samply Research e do
        site do Samply, coletadas durante o uso e as comunicações. Os dados dos
        participantes e os registros de data e hora das notificações são armazenados no
        banco de dados seguro e são acessíveis apenas aos pesquisadores do estudo
        correspondente que os coletou. Os pesquisadores podem excluir esses dados por
        meio da interface do site do Samply.
      </p>
      <p>
        <strong>Envio e hospedagem de e-mails:</strong> Os serviços de
        hospedagem web que utilizamos também incluem o envio, o recebimento e o
        armazenamento de e-mails. Para esse fim, são tratados os endereços dos
        destinatários e remetentes, bem como outras informações relacionadas ao envio
        de e-mails (p. ex. os prestadores envolvidos) e o conteúdo de cada e-mail.
        Esses dados também podem ser tratados para fins de detecção de SPAM. Observe que
        os e-mails na Internet geralmente não são enviados de forma criptografada. Via de
        regra, os e-mails são criptografados durante o transporte, mas não nos servidores
        dos quais são enviados e recebidos (salvo que seja utilizado um método de
        criptografia de ponta a ponta). Portanto, não podemos assumir nenhuma
        responsabilidade pelo caminho de transmissão dos e-mails entre o remetente e o
        recebimento em nosso servidor.
      </p>
      <p>
        <strong>Coleta de dados de acesso e arquivos de registro:</strong> Nós
        mesmos ou nosso prestador de hospedagem web coletamos dados com base em
        cada acesso ao servidor (os denominados arquivos de registro do servidor). Esses
        arquivos podem incluir o endereço e o nome das páginas web e arquivos
        acessados, a data e hora do acesso, o volume de dados transferidos, a
        notificação de um acesso bem-sucedido, o tipo e versão do navegador, o sistema
        operacional do usuário, a URL de referência (a página visitada anteriormente) e,
        em geral, os endereços IP e o prestador solicitante. Os arquivos de
        registro do servidor podem ser utilizados para fins de segurança, p. ex. para evitar
        a sobrecarga dos servidores (especialmente em caso de ataques abusivos,
        denominados ataques DDoS) e para garantir a estabilidade e o equilíbrio ideal
        de carga dos servidores.
      </p>
      <p>
        <strong>Política de retenção de dados, gerenciamento de suas informações:</strong>{' '}
        Os usuários do site (pesquisadores e participantes) podem gerenciar suas
        contas por meio da interface do site do Samply. Os usuários podem
        excluir sua conta pelo menu &quot;Conta&quot;, em seguida &quot;Excluir
        minha conta&quot;.
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados de estudo; dados de pesquisadores; dados de participantes; dados de notificação; registros de data e hora de notificação.</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Pesquisadores; participantes.</dd>
        <dt>Finalidades do tratamento</dt>
        <dd>Processos de autenticação; prestação de nossos serviços on-line e usabilidade; solicitações de contato e comunicação; medidas de segurança; gerenciamento e resposta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimento (Art. 6 (1) (a) RGPD); cumprimento de uma obrigação legal (Art. 6 (1) (c) RGPD); proteção de interesses vitais (Art. 6 (1) (d) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Serviços e prestadores de serviços utilizados:</strong></p>
      <ul>
        <li><strong>Servidor web universitário</strong> — Prestador: Universidade de Konstanz, Universitätsstraße 10, 78464 Konstanz, Alemanha. Site: <a href='https://www.kim.uni-konstanz.de/en/' target='_blank' rel='noreferrer'>https://www.kim.uni-konstanz.de/en/</a>. Política de privacidade: <a href='https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/' target='_blank' rel='noreferrer'>https://www.uni-konstanz.de/en/university/general-information/information-on-data-protection/</a>.</li>
        <li><strong>Postmark</strong> — Serviço de e-mail transacional. Prestador: Wildbit, LLC, 225 Chestnut Street, Philadelphia, PA 19106, EUA. Site: <a href='https://postmarkapp.com/' target='_blank' rel='noreferrer'>https://postmarkapp.com/</a>. Política de privacidade: <a href='https://wildbit.com/privacy-policy' target='_blank' rel='noreferrer'>https://wildbit.com/privacy-policy</a>.</li>
      </ul>

      {/* ── Segurança ───────────────────────────────────────────────────────── */}
      <h2 id='m27'>Medidas de segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais adequadas em conformidade com os
        requisitos legais, levando em conta o estado da técnica, os custos de
        implementação e a natureza, o alcance, o contexto e as finalidades do tratamento,
        bem como o risco de probabilidade e gravidade variáveis para os direitos e
        liberdades das pessoas físicas, a fim de garantir um nível de segurança
        adequado ao risco.
      </p>
      <p>
        As medidas incluem, em particular, garantir a confidencialidade, integridade e
        disponibilidade dos dados por meio do controle do acesso físico e eletrônico aos
        dados, bem como o acesso, inserção, transmissão, segurança e separação dos
        dados. Além disso, estabelecemos procedimentos para garantir o exercício dos
        direitos dos titulares dos dados, a exclusão dos dados e nossa capacidade de
        responder rapidamente às ameaças aos dados. Da mesma forma, levamos em conta
        a proteção dos dados pessoais desde o desenvolvimento ou a seleção do
        hardware, do software e dos prestadores de serviços, em conformidade com o
        princípio de proteção de dados desde a concepção e por padrão.
      </p>
      <p>
        <strong>Mascaramento do endereço IP:</strong> Em geral, os endereços IP
        de pesquisadores e participantes não são registrados nem armazenados. Caso isso
        ocorra no futuro, encurtaremos ou faremos encurtar seu endereço IP. Ao encurtar
        o endereço IP, também conhecido como &quot;mascaramento de IP&quot;, o último
        octeto, ou seja, os dois últimos números de um endereço IP, é excluído. Com esse
        encurtamento, pretende-se impedir ou dificultar consideravelmente a identificação
        de uma pessoa com base em seu endereço IP.
      </p>
      <p>
        <strong>Criptografia SSL (https):</strong> A fim de proteger da melhor forma
        possível os dados que você transmite por meio de nossos serviços on-line,
        utilizamos a criptografia SSL. Você pode reconhecer essas conexões criptografadas pelo prefixo
        https:// na barra de endereços do seu navegador.
      </p>

      {/* ── Transmissão ─────────────────────────────────────────────────────── */}
      <h2 id='m25'>Transmissão e divulgação de dados pessoais</h2>
      <p>
        No contexto do nosso tratamento de dados pessoais, pode ocorrer que os
        dados sejam transferidos para outros locais, empresas ou pessoas, ou que lhes
        sejam divulgados. Os destinatários desses dados podem incluir, por exemplo,
        entidades de pagamento no âmbito de transações de pagamento, prestadores de
        serviços encarregados de tarefas de TI ou prestadores de serviços e conteúdos
        integrados em um site. Nesse caso, os requisitos legais serão respeitados e,
        em particular, serão celebrados com os destinatários dos seus dados os contratos
        ou acordos correspondentes que sirvam à proteção dos seus dados.
      </p>

      {/* ── Terceiros países ─────────────────────────────────────────────────── */}
      <h2 id='m24'>Tratamento de dados em terceiros países</h2>
      <p>
        Se tratarmos dados em um terceiro país (ou seja, fora da União Europeia (UE) ou
        do Espaço Econômico Europeu (EEE)) ou se o tratamento ocorrer no âmbito do
        uso de serviços de terceiros ou da divulgação ou transferência de dados a
        outras pessoas, entidades ou empresas, isso ocorrerá somente em conformidade com os
        requisitos legais.
      </p>
      <p>
        Sujeito ao consentimento expresso ou à transferência exigida por contrato
        ou por lei, tratamos ou fazemos tratar os dados apenas em terceiros países com um
        nível de proteção de dados reconhecido, com base em garantias especiais,
        como uma obrigação contratual por meio das cláusulas de proteção padrão
        da Comissão Europeia ou se certificações ou normas internas vinculantes de
        proteção de dados justificarem o tratamento (Artigos 44 a 49 RGPD).
      </p>

      {/* ── Cookies ─────────────────────────────────────────────────────────── */}
      <h2 id='m134'>Uso de cookies</h2>
      <p>
        Não utilizamos cookies de terceiros nem cookies para fins estatísticos, de marketing
        ou de personalização. Utilizamos apenas cookies necessários (essenciais) exigidos
        para o funcionamento de um site (p. ex. a autenticação de usuários).
      </p>
      <p>
        Os cookies são arquivos de texto que contêm dados de sites ou domínios
        visitados e que um navegador armazena no computador do usuário. Um cookie é
        utilizado principalmente para armazenar informações sobre um usuário durante ou
        após sua visita a um serviço on-line. As informações armazenadas podem
        incluir, por exemplo, as configurações de idioma de um site, o status de
        login, um carrinho de compras ou o local onde um vídeo foi assistido.
      </p>
      <p><strong>Distinguem-se os seguintes tipos e funções de cookies:</strong></p>
      <ul>
        <li><strong>Cookies temporários (também: cookies de sessão):</strong> Os cookies temporários são excluídos, no máximo, quando o usuário sai de um serviço on-line e fecha seu navegador.</li>
        <li><strong>Cookies permanentes:</strong> Os cookies permanentes permanecem armazenados mesmo após o fechamento do navegador. Por exemplo, o status de login pode ser salvo ou o conteúdo preferido pode ser exibido diretamente quando o usuário visita novamente um site.</li>
        <li><strong>Cookies próprios:</strong> Os cookies próprios são definidos por nós mesmos.</li>
        <li><strong>Cookies de terceiros:</strong> Os cookies de terceiros são utilizados principalmente por anunciantes (os denominados terceiros) para tratar as informações dos usuários.</li>
        <li><strong>Cookies necessários (também: essenciais):</strong> Os cookies podem ser necessários para o funcionamento de um site (p. ex. para salvar logins ou outras entradas de usuário, ou por razões de segurança).</li>
        <li><strong>Cookies de estatísticas, marketing e personalização:</strong> Os cookies também são geralmente utilizados para medir o alcance de um site e quando os interesses ou o comportamento de um usuário são armazenados em um perfil de usuário. Esses perfis são utilizados, por exemplo, para exibir aos usuários conteúdo que corresponda a seus possíveis interesses.</li>
      </ul>
      <p>
        <strong>Informações sobre a base jurídica:</strong> A base jurídica sobre a qual
        tratamos seus dados pessoais com a ajuda de cookies depende de se solicitamos seu
        consentimento. Se for esse o caso e você consentir com o uso de cookies, a base jurídica
        para o tratamento dos seus dados é o seu consentimento declarado. Caso contrário,
        os dados tratados com a ajuda de cookies serão tratados com base em nossos
        interesses legítimos (p. ex. para a operação comercial do nosso serviço on-line
        e sua melhoria) ou, se o uso de cookies for necessário para cumprir nossas
        obrigações contratuais.
      </p>
      <p>
        <strong>Período de retenção:</strong> Salvo que lhe fornecemos informações
        explícitas sobre o período de retenção dos cookies permanentes, considere que
        esse período pode ser de até dois anos.
      </p>
      <p>
        <strong>Informações gerais sobre a retirada do consentimento e a oposição (opt-out):</strong>{' '}
        Você tem a possibilidade de, a qualquer momento, se opor ao tratamento dos seus dados
        por meio de tecnologias de cookies ou de revogar seu consentimento. Você pode
        manifestar inicialmente sua oposição por meio das configurações do seu navegador, p. ex.
        desativando o uso de cookies (o que também pode restringir a funcionalidade dos
        nossos serviços on-line). A oposição ao uso de cookies para fins de marketing
        on-line pode ser exercida para um grande número de serviços, especialmente no caso
        do rastreamento, por meio dos sites{' '}
        <a href='https://www.aboutads.info/choices/' target='_blank' rel='noreferrer'>https://www.aboutads.info/choices/</a>{' '}
        e{' '}
        <a href='https://www.youronlinechoices.com' target='_blank' rel='noreferrer'>https://www.youronlinechoices.com</a>.
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados meta/de comunicação (p. ex. cookies).</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Pesquisadores; participantes.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimento (Art. 6 (1) (a) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Serviços comerciais ──────────────────────────────────────────────── */}
      <h2 id='m317'>Serviços comerciais</h2>
      <p>
        As informações a seguir sobre serviços comerciais aplicam-se exclusivamente aos
        pesquisadores que desejam remunerar os participantes por meio da integração da
        plataforma Samply com o Stripe.
      </p>
      <p>
        Tratamos os dados de nossos parceiros contratuais e comerciais, p. ex. clientes
        e partes interessadas (denominados coletivamente &quot;parceiros contratuais&quot;)
        no âmbito de relações contratuais e comparáveis, bem como das ações
        associadas e das comunicações com os parceiros contratuais ou na fase pré-contratual,
        p. ex. para responder a consultas.
      </p>
      <p>
        Tratamos esses dados a fim de cumprir nossas obrigações contratuais,
        salvaguardar nossos direitos e com as finalidades das tarefas administrativas
        associadas a esses dados e à organização empresarial. Somente transferiremos os
        dados dos parceiros contratuais a terceiros no âmbito da legislação aplicável
        na medida em que seja necessário para os fins mencionados, para o cumprimento
        de obrigações legais ou com o consentimento dos titulares dos dados.
      </p>
      <p>
        Excluímos os dados após o término dos prazos legais de garantia e
        obrigações comparáveis, ou seja, em princípio após o vencimento de 4 anos,
        salvo que os dados estejam armazenados em uma conta de cliente ou devam ser conservados
        por razões legais de arquivamento (p. ex. em geral 10 anos para fins fiscais).
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados de pesquisadores (p. ex. nome, instituição, e-mail, idioma); dados de participantes (p. ex. e-mail, fuso horário, preferências de horário, código de participante).</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Pesquisadores; participantes.</dd>
        <dt>Finalidades do tratamento</dt>
        <dd>Serviços contratuais e suporte; solicitações de contato e comunicação; procedimentos administrativos e organizacionais; gerenciamento e resposta a consultas; medidas de segurança.</dd>
        <dt>Base jurídica</dt>
        <dd>Execução de um contrato e solicitações prévias (Art. 6 (1) (b) RGPD); cumprimento de uma obrigação legal (Art. 6 (1) (c) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>
      <p><strong>Serviços e prestadores de serviços utilizados:</strong></p>
      <ul>
        <li><strong>Stripe</strong> — Plataforma de processamento de pagamentos. Prestador: Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, Estados Unidos. Site: <a href='https://stripe.com/' target='_blank' rel='noreferrer'>https://stripe.com/</a>. Política de privacidade: <a href='https://stripe.com/en-de/privacy' target='_blank' rel='noreferrer'>https://stripe.com/en-de/privacy</a>.</li>
      </ul>

      {/* ── Cadastro ────────────────────────────────────────────────────────── */}
      <h2 id='m367'>Cadastro, login e conta de usuário</h2>
      <p>
        Os usuários podem criar uma conta de usuário. No âmbito do cadastro, as
        informações obrigatórias necessárias são comunicadas aos usuários e tratadas com
        as finalidades da prestação da conta de usuário com base no cumprimento das
        obrigações contratuais. Os dados tratados incluem em particular as
        informações de login (nome, senha e endereço de e-mail).
      </p>
      <p>
        Os usuários podem ser informados por e-mail sobre informações relevantes
        para sua conta de usuário, como alterações técnicas. Se os usuários rescindiriam sua
        conta de usuário, seus dados serão excluídos em relação a essa conta, sujeito a
        uma obrigação legal de retenção. É responsabilidade dos usuários proteger
        seus dados antes do término do contrato em caso de rescisão. Estamos autorizados a
        excluir de forma irrecuperável todos os dados de usuário armazenados durante a
        vigência do contrato.
      </p>
      <p>
        No âmbito do uso de nossas funções de cadastro e login, bem como
        do uso da conta de usuário, armazenamos o endereço IP e o horário de cada
        ação do usuário. O armazenamento se baseia em nossos interesses legítimos, bem
        como na proteção do usuário contra usos indevidos e outros usos não
        autorizados. Esses dados não serão transmitidos a terceiros, salvo que seja necessário para
        perseguir nossas reivindicações ou exista uma obrigação legal a esse respeito.
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados de pesquisadores (p. ex. nome, e-mail); dados de participantes (p. ex. e-mail).</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Pesquisadores; participantes.</dd>
        <dt>Finalidades do tratamento</dt>
        <dd>Serviços contratuais e suporte; medidas de segurança; gerenciamento e resposta a consultas.</dd>
        <dt>Base jurídica</dt>
        <dd>Consentimento (Art. 6 (1) (a) RGPD); execução de um contrato e solicitações prévias (Art. 6 (1) (b) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Contato ─────────────────────────────────────────────────────────── */}
      <h2 id='m182'>Contato</h2>
      <p>
        Quando nos contata (p. ex. por meio de um formulário de contato, por e-mail,
        por telefone ou pelas redes sociais), os dados das pessoas que fazem consultas
        são tratados na medida em que seja necessário para responder às solicitações de
        contato e às atividades requeridas.
      </p>
      <p>
        A resposta às solicitações de contato no âmbito de relações contratuais
        ou pré-contratuais é realizada para cumprir nossas obrigações contratuais ou
        para responder às consultas (pré)contratuais e, nos demais casos, com base nos
        interesses legítimos em responder às consultas.
      </p>
      <dl>
        <dt>Tipos de dados tratados</dt>
        <dd>Dados de contato (p. ex. e-mail, números de telefone).</dd>
        <dt>Pessoas afetadas</dt>
        <dd>Pesquisadores; participantes.</dd>
        <dt>Finalidades do tratamento</dt>
        <dd>Solicitações de contato e comunicação.</dd>
        <dt>Base jurídica</dt>
        <dd>Execução de um contrato e solicitações prévias (Art. 6 (1) (b) RGPD); interesses legítimos (Art. 6 (1) (f) RGPD).</dd>
      </dl>

      {/* ── Exclusão de dados ────────────────────────────────────────────────── */}
      <h2 id='m12'>Exclusão de dados</h2>
      <p>
        Os dados que tratamos serão excluídos em conformidade com as disposições
        legais assim que seu tratamento for revogado ou outras autorizações deixarem de
        ser aplicáveis (p. ex. se a finalidade do tratamento desses dados deixar de existir
        ou se não forem mais necessários para essa finalidade).
      </p>
      <p>
        Se os dados não forem excluídos porque são necessários para outros fins legalmente
        admissíveis, seu tratamento será limitado a esses fins. Isso significa que os dados
        serão restritos e não serão tratados para outras finalidades. Isso se aplica, por exemplo,
        a dados que devem ser conservados por razões comerciais ou fiscais ou cuja
        conservação é necessária para exercer, fazer valer ou defender reivindicações legais
        ou para proteger os direitos de outra pessoa física ou jurídica.
      </p>

      {/* ── Alterações e atualizações ────────────────────────────────────────── */}
      <h2 id='m15'>Alterações e atualizações da política de privacidade</h2>
      <p>
        Pedimos que você se informe regularmente sobre o conteúdo de nossa declaração de
        proteção de dados. Adaptaremos a política de privacidade quando as alterações em
        nossas práticas de tratamento de dados tornarem isso necessário. Iremos informá-lo
        assim que as alterações exigirem sua participação (p. ex. consentimento) ou outra
        notificação individual.
      </p>
      <p>
        Se nesta política de privacidade fornecermos endereços e informações de
        contato de empresas e organizações, pedimos que observe que os endereços podem
        mudar com o tempo e que verifique as informações antes de nos contatar.
      </p>

      {/* ── Direitos ────────────────────────────────────────────────────────── */}
      <h2 id='m10'>Direitos dos titulares dos dados</h2>
      <p>
        Como titular dos dados, você tem direito a diversos direitos ao abrigo do RGPD,
        que decorrem em particular dos artigos 15 a 21 do RGPD:
      </p>
      <ul>
        <li><strong>Direito de oposição:</strong> Você tem o direito, por motivos relacionados à sua situação particular, de se opor a qualquer momento ao tratamento dos seus dados pessoais com base na alínea (e) ou (f) do artigo 6.º, n.º 1, do RGPD, incluindo a elaboração de perfis com base nessas disposições.</li>
        <li><strong>Direito de retirada do consentimento:</strong> Você tem o direito de retirar seu consentimento a qualquer momento.</li>
        <li><strong>Direito de acesso:</strong> Você tem o direito de solicitar a confirmação de que os dados que lhe dizem respeito estão sendo tratados, de ser informado sobre esses dados e de receber informações adicionais e uma cópia dos dados em conformidade com as disposições legais.</li>
        <li><strong>Direito de retificação:</strong> Você tem o direito, em conformidade com a lei, de solicitar a complementação dos dados que lhe dizem respeito ou a retificação dos dados incorretos que lhe dizem respeito.</li>
        <li><strong>Direito de exclusão e direito à limitação do tratamento:</strong> Em conformidade com as disposições legais, você tem o direito de exigir a exclusão imediata dos dados pertinentes ou, alternativamente, de exigir a limitação do tratamento dos dados em conformidade com as disposições legais.</li>
        <li><strong>Direito à portabilidade dos dados:</strong> Você tem o direito de receber os dados que lhe dizem respeito e que nos forneceu em um formato estruturado, de uso corrente e de leitura automática em conformidade com os requisitos legais, ou de solicitar sua transmissão a outro responsável pelo tratamento.</li>
        <li><strong>Reclamação à autoridade de controle:</strong> Você também tem o direito, nas condições estabelecidas por lei, de apresentar uma reclamação a uma autoridade de controle, em particular no Estado-Membro em que resida habitualmente, em que tenha seu local de trabalho ou em que tenha ocorrido a alegada infração, se considerar que o tratamento de dados pessoais que lhe diz respeito infringe o RGPD.</li>
      </ul>

      {/* ── Terminologia e definições ───────────────────────────────────────── */}
      <h2 id='m42'>Terminologia e definições</h2>
      <p>
        Esta seção oferece uma visão geral dos termos utilizados na presente
        política de privacidade. Muitos desses termos são extraídos da lei e
        definidos principalmente no artigo 4.º do RGPD. As explicações a seguir
        têm por objetivo, acima de tudo, facilitar a compreensão.
      </p>
      <dl>
        <dt>Responsável pelo tratamento</dt>
        <dd>O &quot;responsável pelo tratamento&quot; é a pessoa física ou jurídica, autoridade pública, serviço ou outro organismo que, sozinho ou em conjunto com outros, determina as finalidades e os meios do tratamento de dados pessoais.</dd>
        <dt>Dados pessoais</dt>
        <dd>Os &quot;dados pessoais&quot; são qualquer informação relativa a uma pessoa física identificada ou identificável (&quot;titular dos dados&quot;); é considerada identificável qualquer pessoa cuja identidade possa ser determinada, direta ou indiretamente, em particular por referência a um identificador, como por exemplo um nome, um número de identificação, dados de localização, um identificador on-line, ou um ou mais elementos específicos da identidade física, fisiológica, genética, mental, econômica, cultural ou social dessa pessoa.</dd>
        <dt>Tratamento</dt>
        <dd>O termo &quot;tratamento&quot; abrange um amplo espectro e praticamente qualquer manipulação de dados, seja a coleta, a avaliação, o armazenamento, a transmissão ou a exclusão.</dd>
        <dt>Remarketing</dt>
        <dd>O &quot;remarketing&quot; ou &quot;retargeting&quot; é o termo utilizado, por exemplo, para indicar para fins publicitários os produtos que interessam a um usuário em um site, a fim de lembrá-lo desses produtos em outros sites, p. ex. em anúncios.</dd>
        <dt>Rastreamento</dt>
        <dd>O termo &quot;rastreamento&quot; é utilizado quando o comportamento dos usuários pode ser acompanhado em vários sites. Em geral, as informações sobre o comportamento e os interesses em relação aos sites utilizados são armazenadas em cookies ou nos servidores dos provedores de tecnologia de rastreamento (o que se denomina elaboração de perfis).</dd>
        <dt>Análise web</dt>
        <dd>A análise web serve para avaliar o tráfego de visitantes dos serviços on-line e pode determinar seu comportamento ou seus interesses em determinadas informações, como os conteúdos dos sites. Com a ajuda da análise web, os proprietários de sites podem reconhecer em que horário os visitantes acessam seu site e quais conteúdos lhes interessam.</dd>
      </dl>
    </>
  );
}
