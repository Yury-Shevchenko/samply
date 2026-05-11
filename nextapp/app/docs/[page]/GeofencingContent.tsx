export default function GeofencingContent() {
  return (
    <>
      <p>
        Geofencing lets Samply send a notification and open a survey automatically when a
        participant enters or leaves a defined geographic area — a workplace, a supermarket,
        a home neighbourhood. The trigger is the location event itself, not a clock time.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          The Samply geofencing implementation is described and empirically validated in a peer-reviewed article in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Three controlled studies using the Samply app yielded an overall notification sensitivity of <strong style={{ color: 'var(--ink)' }}>82.5%</strong> across 360 fence crossings. The article provides empirical guidance on radius selection, platform differences, and environmental factors — the recommendations below are drawn from this work.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>How geofencing works</h2>
      <p>
        Once a participant joins a study with geofencing enabled, the Samply Research app
        registers the geofenced zones on the device and begins monitoring location in the
        background — even when the app is closed. When the device detects that the
        participant has entered or exited a zone, the app fires a local notification and
        records a <strong>geofencing-event</strong> in the study history.
      </p>
      <p>
        Location processing happens entirely on the participant device. Samply never
        receives raw GPS coordinates. The server only records that a geofencing event
        occurred (enter or exit) along with the timestamp. Researchers see the event in the
        history log but not the absolute position.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Enabling geofencing</h2>
      <p>
        Open <strong>Edit study</strong> and toggle <strong>Enable Geofencing</strong>. Two
        configuration panels appear: one for researcher-defined locations and one for
        participant-defined locations. You can use either or both.
      </p>
      <p>
        Before saving, fill in the <strong>Geofencing instruction</strong> field. This text
        is shown to participants when they join the study, explaining why constant location
        tracking is required and how you will use the data. Participants must grant
        background location permission to the Samply Research app for geofencing to work.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Researcher-defined locations</h2>
      <p>
        Enter the locations yourself — they apply to all participants equally. For each
        location, provide:
      </p>
      <dl>
        <dt>Latitude and longitude</dt>
        <dd>
          The centre of the geofenced zone. After saving, markers appear on a map and can
          be dragged to adjust the position visually.
        </dd>
        <dt>Radius (metres)</dt>
        <dd>
          The circular boundary around the centre point. The participant triggers the zone
          when their device GPS places them within this distance of the centre.
        </dd>
        <dt>Exit zone size (metres)</dt>
        <dd>
          A separate, typically larger radius used to detect exits. Setting a larger exit
          zone than the entry zone reduces spurious exit events caused by GPS drift at the
          boundary.
        </dd>
        <dt>Minimum time window (minutes)</dt>
        <dd>
          The minimum gap between two notifications from this zone. Prevents repeated
          triggers when a participant lingers near the boundary and the GPS signal
          oscillates.
        </dd>
        <dt>Trigger on enter / trigger on exit</dt>
        <dd>Choose which crossing direction fires the notification. You can enable both.</dd>
        <dt>Hide notifications but record events</dt>
        <dd>
          Fires no visible notification but still writes a geofencing-event to the history.
          Use this when you want passive location-event logging without interrupting the
          participant.
        </dd>
      </dl>
      <p>
        All researcher-defined locations share the same notification content: a title,
        message body, and survey URL (configured in the geofencing section of Edit study).
        URL placeholders are supported — see <a href='/docs/placeholders'>URL
        placeholders</a> for the full token list.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Participant-defined locations</h2>
      <p>
        Instead of specifying zones yourself, you can let participants enter their own
        locations — for example, their home address or workplace — directly in the Samply
        Research app. Enable participant-defined locations in Edit study and provide a
        default radius and survey URL.
      </p>
      <p>
        Each participant defines zones that are private to them. The zones are registered
        on their device and never transmitted to the Samply server. This is the appropriate
        choice for studies where the target location is personal and varies between
        participants (e.g. &quot;your home&quot;, &quot;your usual supermarket&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacy and consent</h2>
      <p>
        Background location tracking is a sensitive permission on both iOS and Android. You
        must explain to participants in the Geofencing instruction field what location data
        you collect, why, and how long it is retained. This explanation is shown at study
        enrolment — treat it as an informed consent disclosure.
      </p>
      <p>
        Key privacy properties:
      </p>
      <ul>
        <li>Samply does not store GPS coordinates. Only enter/exit events and timestamps reach the server.</li>
        <li>Participants can disable location tracking for a specific study from within the app without leaving the study.</li>
        <li>Participants can stop all location tracking by disabling location permissions for the Samply Research app in their phone settings.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Geofencing events in the history</h2>
      <p>
        Each geofencing trigger writes a result record with event status{' '}
        <strong>geofencing-event</strong> and the timestamp of the crossing. These records
        appear in the study history log alongside scheduled notification results and can be
        downloaded in the CSV export. The export includes the geofencing event timestamp in
        the same per-event columns as notification receipt and tap events.
      </p>
      <p>
        If you attached a survey URL to the geofencing zone, the URL is recorded in the
        result alongside the event — giving you a link between the location trigger and any
        subsequent survey completion (via the <a href='/docs/reminders'>completion
        callback</a> mechanism).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Empirical guidance</h2>
      <p>
        The following recommendations are based on the findings in <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>, which validated Samply geofencing across three controlled studies with 360 fence crossings.
      </p>
      <dl>
        <dt>Use a radius of at least 100 metres</dt>
        <dd>
          A 10 m radius caused frequent misses on Android and false alarms on iOS. At 100 m, sensitivity stabilised across both platforms. Smaller radii are only reliable in open-sky environments with excellent GPS signal.
        </dd>
        <dt>iOS outperforms Android — plan accordingly</dt>
        <dd>
          iOS devices showed higher overall sensitivity; Android notifications tended to arrive closer to the fence boundary (the device crossed further before the trigger fired). If your study population is mixed, report platform as a covariate and consider stratifying your analysis.
        </dd>
        <dt>Enter and exit events behave differently</dt>
        <dd>
          Exit notifications were delivered significantly further from the boundary than enter notifications — a mean of 234 m vs. 87 m in the studies. If your design depends on capturing the exit moment precisely, set a larger exit zone radius and treat exit-event timestamps with more tolerance.
        </dd>
        <dt>Dwell time matters</dt>
        <dd>
          Participants who stayed at a location for at least 5 minutes showed substantially higher sensitivity than those who passed through briefly. For fleeting exposures (e.g., a bus stop), expect lower detection rates.
        </dd>
        <dt>Forest and low-connectivity environments reduce sensitivity</dt>
        <dd>
          Areas with poor internet connectivity (dense forest, underground spaces, rural areas with weak signal) significantly reduce sensitivity. The app relies on network-assisted GPS for zone detection; without connectivity, events may be delayed or missed entirely. Disclose this limitation in your study protocol.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Participants must rejoin to pick up zone changes</dt>
        <dd>
          Geofenced zones are registered on the device at the time the participant joins the
          study. If you add or modify zones in Edit study after participants have already
          enrolled, they will not receive the updated zones until they leave and rejoin the
          study.
        </dd>
        <dt>GPS accuracy limits effective radius</dt>
        <dd>
          Urban GPS accuracy is typically 5–20 metres; indoors or in dense areas it can
          exceed 50 metres. Set radii larger than your required precision to avoid missed
          triggers. The exit zone setting compensates for boundary oscillation.
        </dd>
        <dt>Background location permission may be revoked</dt>
        <dd>
          iOS and Android can revoke background location permission at any time — after an
          OS update, after a device restart, or if the user changes app settings. Geofencing
          silently stops working when permission is missing. Remind participants in your
          study instructions to keep background location enabled.
        </dd>
      </dl>
    </>
  );
}
