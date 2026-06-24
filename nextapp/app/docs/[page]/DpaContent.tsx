/**
 * Data Processing Agreement (GDPR Art. 28) — researcher (controller) ↔ Samply /
 * University of Konstanz (processor). English is the authoritative version.
 *
 * NOTE: this is a template to support Art. 28 compliance; it must be reviewed by
 * the controller's DPO / legal counsel before it is relied upon or executed.
 */
export default function DpaContent() {
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
