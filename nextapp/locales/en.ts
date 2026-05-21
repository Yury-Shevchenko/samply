/**
 * English translations for the Samply researcher web dashboard.
 *
 * CONVENTIONS:
 *   {variable}  — runtime-interpolated value; keep the braces and variable name unchanged
 *   →           — directional arrow used in CTAs; can be adapted per language
 *   …           — ellipsis shown during async operations (pending state)
 *   ·           — middle-dot separator (U+00B7); keep as-is or use the locale's equivalent
 *
 * Each section is annotated with:
 *   @page    — the URL / route where this text appears
 *   @context — notes for translators about usage and tone
 *
 * Array elements are accessed by index: t('home.howItWorks.steps.0.title')
 * The German/other locale files must mirror this exact structure (or be absent to fall
 * back to English).
 */

const en = {

  // ─── Navigation ─────────────────────────────────────────────────────────────
  // @page    Every page (sticky top navigation bar)
  // @context Concise link labels; keep them short. "Sign out" should sound neutral,
  //          not punishing. "♥ Donate" — the heart symbol is intentional branding.
  nav: {
    dashboard:    "Dashboard",
    forum:        "Forum",
    docs:         "Docs",
    admin:        "Admin",
    signOut:      "Sign out",
    signIn:       "Sign in",
    studies:      "Studies",
    donate:       "♥ Donate",
    createAccount: "Create account",
    openMenu:     "Open menu",
    closeMenu:    "Close menu",
    language:     "Language",
    news:            "News",
    documentation:   "Documentation",
    help:            "Help",
    about:           "About",
    newStudy:        "New study",
    myStudies:       "My studies",
    notifications:   "Notifications",
    new:             "New",
    scheduled:       "Scheduled",
    sent:            "Sent",
    participantsLink: "Participants",
    overview:        "Overview",
    groupsLink:      "Groups",
    invitationsLink: "Invitations",
    account:         "Account",
    edit:            "Edit",
    logOut:          "Log out",
    users:           "Users",
  },

  // ─── Home / landing page ─────────────────────────────────────────────────────
  // @page    / (root — unauthenticated visitors)
  // @context Marketing copy aimed at academic researchers. Tone: warm, slightly
  //          tongue-in-cheek, professional. "Postcards" is a central metaphor —
  //          preserve it or find an equivalent in the target language.
  home: {
    hero: {
      /** Handwritten-style greeting above the main headline */
      greeting:  "hello, researcher ✉",
      /** Line 1 of the three-line main headline */
      headline1: "Send little",
      /** Line 2 — shown with a hand-drawn SVG underline; keep it a single noun */
      headline2: "postcards",
      /** Line 3 */
      headline3: "to your participants.",
      /** Subtitle paragraph below the headline */
      subtitle:  "Schedule notifications that land on participants’ phones — random, fixed, or event-contingent — and route each tap to the survey or task you already use.",
      /** Primary CTA button linking to /register */
      cta:       "Start a study →",
      /** Small label next to the CTA */
      freeLabel: "Free for academic use",
      /** Decorative circular stamp: first line */
      stampYear:  "EST · 2020",
      /** Decorative circular stamp: second line */
      stampLabel: "for research",
    },

    howItWorks: {
      /** Small handwritten eyebrow above the section */
      eyebrow:  "four moving parts",
      /** Section main heading (contains inline underline on "survey,") */
      heading:  "From schedule to survey, without lifting a finger.",
      /** Paragraph below the heading */
      subtitle: "Samply is the bit between your study design and your survey tool. It runs the cron, lands the notification, and routes the tap.",
      /** Step counter shown at the bottom of each card. {n} = current, {total} = total */
      stepOf:   "step {n} of {total}",
      steps: [
        {
          /** @context Step 01 of 4 — researcher configures timing in the dashboard */
          title: "Schedule",
          body:  "Pick a timing rule — random, fixed, or event-contingent. Draw a window on the day, set quiet hours and a minimum gap.",
        },
        {
          /** @context Step 02 — Samply sends the notification to participant phones */
          title: "Ping",
          body:  "Samply runs the cron. Each participant receives a small push notification in their timezone, on the Samply Research app.",
        },
        {
          /** @context Step 03 — participant taps the notification */
          title: "Tap",
          body:  "They tap. Samply attaches their participant ID and ping ID, then forwards the tap to the URL you specified.",
        },
        {
          /** @context Step 04 — the tap lands on the researcher's survey tool */
          title: "Survey",
          body:  "Your existing tool — Qualtrics, REDCap, LimeSurvey, your own URL — handles the rest. Samply records that the tap landed.",
        },
      ],
    },

    timingRules: {
      /** Section label (monospace, uppercase) */
      sectionLabel: "step 01 · in detail",
      heading:      "You draw windows on the day. We fill them.",
      /** Decorative handwritten aside */
      pickOne:      "→ pick one, or mix",
      cards: [
        {
          eyebrow: "01 · random",
          title:   "Five surprise pings, sometime today.",
          body:    "Set a window, a count, a minimum gap. Samply scatters the prompts so participants can’t predict the next one.",
        },
        {
          eyebrow: "02 · fixed",
          title:   "Every evening at 9, a one-minute diary.",
          body:    "Pick the times that fit your protocol — 9 a.m., 3 p.m., bedtime — and let participants build the habit.",
        },
        {
          eyebrow: "03 · event",
          title:   "Right after they finish a workout.",
          body:    "Trigger pings from upstream signals — wearables, web hooks, participant tap.",
        },
      ],
    },

    mobileSection: {
      sectionLabel: "steps 02 + 03 · in detail",
      /** @context Brand name of the participant mobile app. Do NOT translate. */
      productName:    "Samply Research",
      /** Short tagline shown beneath the product wordmark. */
      productTagline: "The participant app.",
      heading:      "The phone is the easy part.",
      body:         "The Samply Research app on the participant’s phone receives the schedule and shows the prompt. Tap it, and they land in your survey with their ID attached.",
      /** App-store button labels. Brand names — do NOT translate. */
      downloadAppStore:  "App Store",
      downloadGooglePlay: "Google Play",
      /** Platform badge */
      badgePlatforms: "iOS · Android",
      /** Timezone badge */
      badgeTZ:        "Per-participant TZ",
      /** Bold prefix before the language list */
      languagesLabel: "14 languages —",
      /** Handwritten note inside the phone mockup */
      mockupNote:     "→ that’s it.",
      /** Notification preview: app + timestamp label */
      mockupApp:      "Samply · now",
      /** Notification preview: example question shown to participant */
      mockupQuestion: "How are you, right now?",
      /** Notification preview: tap hint */
      mockupHint:     "tap to begin · ≈90s",
    },

    integrations: {
      sectionLabel: "step 04 · in detail",
      heading:      "Then we hand the tap to your survey.",
      /** Decorative aside */
      note:         "plays nicely with",
    },

    methods: {
      /** Handwritten eyebrow above the section */
      eyebrow:  "for the working researcher",
      heading:  "The methods we were built for.",
      subtitle: "Samply has opinions about timing, gaps, and quiet hours — borrowed from the methodologists who taught us. Here are the protocols we know inside-out.",
      /** Second line in the decorative circular stamp */
      stampLabel: "EMA · diary",
      /** @context Method cards — code (ESM, EMA, …) is intentionally left untranslated
       *             as these are established international acronyms. */
      cards: [
        { title: "Experience sampling",             body: "Random pings within blocks; 4–8 per day; 7–21 days. Probably what you mean." },
        { title: "Ecological momentary assessment", body: "Same as ESM with a clinical accent. Compliance bands, drop-out tracking, audit trail." },
        { title: "End-of-day diary",                body: "A single fixed-time prompt, often at 21:00 local. The slow cousin." },
        { title: "Ambulatory assessment",           body: "Event-contingent prompts triggered by wearables, geofences, or webhooks." },
        { title: "Measurement-burst",               body: "Two or three weeks of dense sampling, repeated at quarterly intervals." },
        { title: "Discrete-choice experiment",      body: "Pre-randomised conditions, attached as embedded data on the route URL." },
      ],
    },

    defaults: {
      /** Handwritten eyebrow above the defaults table */
      eyebrow:   "defaults · borrowed from the literature",
      heading:   "Sensible numbers, on by default.",
      subtitle:  "We pre-fill the knobs that researchers most often get wrong. Override any of them per-study.",
      colSetting: "setting",
      colDefault: "default",
      colWhy:     "why",
      /** @context Table rows — values (v) are technical/numeric and should NOT be translated.
       *             The "why" (w) notes can be translated. "k" is the setting name. */
      rows: [
        { k: "Min gap",          v: "45 min",            w: "Below 30, response styles bleed across pings." },
        { k: "Window",           v: "09:00–21:00",  w: "Quiet hours respected per-participant timezone." },
        { k: "Pings / day",      v: "5",                 w: "Five is the sweet spot for ESM in adults." },
        { k: "Burst length",     v: "14 days",           w: "Long enough for within-person variance." },
        { k: "Compliance floor", v: "40%",               w: "Below 40% triggers a soft re-engagement." },
        { k: "Token format",     v: "pid · ping · ts", w: "Three variables, every time, in every URL." },
      ],
    },

    irb: {
      /** @context IRB = Institutional Review Board; standard ethics body for research.
       *             "Footprint" = data footprint / privacy impact. Keep the tone reassuring. */
      heading: "An IRB-friendly footprint.",
      sub:     "Nothing leaves your survey tool.",
      link:    "Read the brief →",
    },

    testimonials: {
      eyebrow: "from the community",
      heading: "Researchers who use Samply.",
    },

    cta: {
      /** Bottom call-to-action band at the bottom of the landing page */
      heading: "See it in your own protocol.",
      sub:     "Free for academic use.",
      button:  "Start a study →",
    },

    footer: {
      docs:        "Documentation",
      studies:     "Studies",
      github:      "GitHub",
      publication: "Publication",
      copyright:   "© Samply",
    },
  },

  // ─── Login page ──────────────────────────────────────────────────────────────
  // @page    /login
  // @context Shown to unauthenticated users. Researcher-focused (not general public).
  //          "Welcome back" should feel warm, not corporate.
  login: {
    title:            "Welcome back",
    subtitle:         "Sign in to your researcher account.",
    emailLabel:       "Email",
    emailPlaceholder: "you@university.edu",
    passwordLabel:    "Password",
    forgotPassword:   "Forgot?",
    submit:           "Sign in →",
    submitting:       "Signing in…",
    noAccount:        "No account?",
    createFree:       "Create one — it’s free",
    footerNote:       "Free for academic use · no credit card",
    errorInvalid:     "Invalid email or password.",
  },

  // ─── Registration page ───────────────────────────────────────────────────────
  // @page    /register
  // @context New researcher account creation. The platform is free for academic use;
  //          reinforce that expectation. "University email" is a soft gatekeeping signal.
  register: {
    title:                "Create a researcher account",
    subtitle:             "Use your university email. Free for academic use.",
    nameLabel:            "Full name",
    namePlaceholder:      "Dr. Jane Smith",
    emailLabel:           "Email",
    emailPlaceholder:     "you@university.edu",
    passwordLabel:        "Password",
    confirmPasswordLabel: "Confirm password",
    submit:               "Create account →",
    submitting:           "Creating account…",
    alreadyHaveAccount:   "Already have an account?",
    signIn:               "Sign in",
    footerNote:           "By creating an account you agree to use Samply for research purposes.",
    termsLink:            "Terms & Conditions",
    policyLink:           "Privacy Policy",
    errorFailed:          "Registration failed. Check your details and try again.",
  },

  // ─── Forgot password page ────────────────────────────────────────────────────
  // @page    /forgot
  // @context Accessible without authentication. Deliberately vague in the success
  //          message to avoid email enumeration ("If an account exists…").
  forgot: {
    title:         "Forgot your password?",
    subtitle:      "Enter your email and we’ll send a reset link.",
    emailLabel:    "Email",
    emailPlaceholder: "you@university.edu",
    submit:        "Send reset link →",
    submitting:    "Sending…",
    backToSignIn:  "← Back to sign in",
    sentTitle:     "Check your inbox",
    sentBody:      "If an account exists for that address, a password reset link is on its way. It may take a minute or two.",
  },

  // ─── Dashboard page ──────────────────────────────────────────────────────────
  // @page    /dashboard
  // @context Main landing page for logged-in researchers; shows their study list.
  //          The "postcard" visual metaphor continues here (study cards).
  dashboard: {
    /** Handwritten eyebrow above the heading */
    eyebrow:              "your studies",
    title:                "Dashboard",
    newStudy:             "+ New study",
    /** Tooltip on the disabled "New study" button when email is unconfirmed */
    newStudyDisabledTitle: "Confirm your email to create studies",

    /** Mono-uppercase section label. {n} = number of studies */
    myStudiesLabel:    "my studies · {n}",
    collaboratingLabel: "collaborating · {n}",

    /** Label on a study card the researcher owns */
    studyLabel: "study",
    /** Label on a study card where the researcher is a collaborator */
    collabLabel: "collab",

    complianceLabel:  "7d compliance",
    noData:           "no data yet",
    /** {n} = participant count */
    participantsCount: "{n} participants",
    /** {responded}/{sent} on the study card */
    responsesCount:   "{responded}/{sent} responses",

    quickSchedule:    "schedule",
    quickParticipants: "participants",
    quickHistory:     "history",

    emailUnconfirmedTitle: "Please confirm your email address.",
    emailUnconfirmedBody:  "You need a confirmed email to create new studies and to be added as a collaborator on other researchers’ studies. Check your inbox for the confirmation link sent when you registered.",

    lowComplianceTitle: "Low compliance",
    /** {studies} = comma-separated study names that are below threshold */
    lowComplianceBody:  "{studies} — below 60% in the last 7 days.",

    smaatText:   "Need built-in surveys, cognitive tasks, sensor data, or gamification?",
    smaatDetail: "Samply handles ESM notifications to external URLs. For studies that need everything in one app, take a look at SMAAT.",
    smaatLink:   "Compare platforms →",

    testimonialNudge: "Using Samply for research? Share your experience →",

    emptyLabel: "no studies yet",
    emptyBody:  "Create your first study to start scheduling experience sampling notifications.",
    emptyCta:   "Create a study →",
  },

  // ─── Account / profile page ──────────────────────────────────────────────────
  // @page    /account
  // @context Researcher profile settings. Contains sensitive actions (delete account).
  //          "Danger zone" is a common pattern in developer-oriented UIs — keep the label.
  account: {
    breadcrumb:           "← Dashboard",
    sectionEmail:         "Email",
    emailConfirmed:       "✓ confirmed",
    emailNotConfirmed:    "not confirmed",
    resendConfirmation:   "Resend confirmation email",
    resendPending:        "Sending…",
    /** Helper text under the email input on /account explaining what happens on change */
    emailChangeHint:      "Changing your email will sign you out of confirmation until you click the link sent to the new address.",
    /** Button to save a new email address */
    emailSave:            "Save email",
    /** Button pending label while saving a new email */
    emailSavePending:     "Saving…",
    /** Notice after a successful email change */
    noticeEmailChanged:   "Email updated. Check your new inbox to confirm it.",
    /** Notice if the submitted email matches the current one */
    noticeEmailUnchanged: "Email unchanged.",
    /** Error if the submitted email is not a valid format */
    errorEmailInvalid:    "Please enter a valid email address.",
    /** Error if another account already uses that email */
    errorEmailInUse:      "That email is already in use by another account.",
    sectionProfile:       "Profile",
    displayName:          "Display name",
    researchInstitute:    "Research institute",
    institutePlaceholder: "University of…",
    languageLabel:        "Language",
    saveChanges:          "Save changes",
    savePending:          "Saving…",
    /** Role badge when user is a researcher */
    roleResearcher:  "researcher",
    /** Role badge when user is a participant */
    roleParticipant: "participant",
    /** {date} = formatted join date */
    memberSince:     "Member since {date}",
    sectionStudies:  "Studies",
    notParticipating: "Not currently participating in any studies.",
    dangerZone:      "Danger zone",
    deleteAccount:   "Delete my account →",
    noticeUpdated:   "Profile updated.",
    noticeConfirmationSent: "Confirmation email sent. Check your inbox.",
    privacyTitle:    "Privacy & Data",
    privacyIntro:    "Your study data is subject to automatic retention limits:",
    privacyPending:  "Pending notification queue — records deleted after 30 days",
    privacyResults:  "Notification history & responses — deleted after 12 months",
    privacyExport:   "Export your data regularly from each study's History tab before these periods expire.",
    privacyPolicy:   "Privacy Policy",
    privacyTerms:    "Terms & Conditions",
  },

  // ─── Study tab navigation ────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/* (all sub-pages of a study)
  // @context Tab labels in the study dashboard. Keep them short — they appear in a
  //          horizontal tab bar with limited space.
  studyTab: {
    overview:     "Overview",
    participants: "Participants",
    schedule:     "Schedule",
    history:      "History",
    analytics:    "Analytics",
    invitations:  "Invitations",
    settings:     "Settings",
    approval:     "Approval",
    streamApi:    "Stream API",
  },

  // ─── Study layout (breadcrumb + header) ─────────────────────────────────────
  // @page    /dashboard/[studyId]/* (shared layout wrapping all study pages)
  studyLayout: {
    breadcrumb:   "← Dashboard",
    /** Status label when study is actively collecting data (shown in handwriting style) */
    statusLive:   "● collecting",
    /** Status label when study is in draft / paused */
    statusDraft:  "draft",
    editStudy:    "Edit study →",
  },

  // ─── Study overview page ─────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/ (the default tab of a study)
  // @context Shows stats, recent schedules, and recent participants. Action buttons
  //          (activate/pause) are critical — keep them unambiguous.
  studyOverview: {
    statParticipants:    "Participants",
    /** {n} = total enrolled (including deactivated) */
    statParticipantsSub: "{n} total enrolled",
    statSchedules:       "Schedules",
    statSchedulesSub:    "notification configs",
    statCompliance:      "7-day compliance",
    /** {responded}/{sent} */
    statComplianceSub:   "{responded}/{sent} responses",
    statComplianceNoData: "no data yet",
    statStatus:          "Status",
    statusLive:          "Live",
    statusDraft:         "Draft",
    statusPublic:        "publicly listed",
    statusPrivate:       "private study",

    pauseStudy:     "● Collecting — pause study",
    activateStudy:  "Activate study",
    activatingStudy: "Activating…",
    pausingStudy:   "Pausing…",
    submitForReview: "Submit for review →",
    reviewRequested: "✓ Review requested",
    publiclyListed:  "✓ Publicly listed",

    lowComplianceWarning: "▲ Below 60% — consider checking in with participants.",

    /** {n} = schedule count */
    schedulesLabel:   "notification schedules · {n}",
    viewQueue:        "view queue →",
    viewAllSchedules: "view all →",
    noSchedulesYet:   "no schedules yet",
    noSchedulesBody:  "Add a schedule to start reaching participants.",
    addSchedule:      "+ Add schedule",
    /** {n} = number of schedules beyond the first 5 shown */
    moreSchedules:    "+ {n} more schedules →",

    /** {n} = active participant count */
    participantsLabel:   "participants · {n} active",
    viewAllParticipants: "view all →",
    noParticipantsYet:   "No participants enrolled yet.",
    getEnrollmentLink:   "Get enrollment link →",
    /** {date} = formatted join date */
    joinedDate:          "joined {date}",
    /** {n} = additional participants beyond the first 5 */
    moreParticipants:    "+ {n} more →",

    editStudy:       "Edit study",
    invitationLinks: "Invitation links",
    exportCsv:       "Export CSV",
    deleteStudy:     "Delete study",

    /** @context Schedule type badge labels — used inside colored pills on schedule rows.
     *             These are technical terms; translate only if a clear equivalent exists. */
    typeOneTime:    "one-time",
    typeRepeating:  "repeating",
    typeRandomized: "randomized",
    typePersonal:   "personal",
    typeEnrollment: "on join",

    /** {sent} sent · {pending} pending — shown in schedule row pill */
    sentPending: "{sent} sent · {pending} pending",
    /** {total} total — shown in schedule row pill */
    totalCount:  "{total} total",
  },

  // ─── Study settings page ─────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/settings
  studySettings: {
    title:    "Study settings",
    subtitle: "Collaborators, event-contingent design, action buttons, webhooks, and geofencing.",
    saveButton:   "Save settings",
    saving:       "Saving…",
    copy:         "Copy",
    copied:       "Copied ✓",

    /* ── Section 1: Collaborators ── */
    secCollaborators:    "Collaborators",
    collabHint:          "Enter the email addresses of colleagues you want to share this study with. Each address must belong to an account already registered in Samply as a researcher. Collaborators can view and edit the notification schedule and see the notification history.",
    collabPlaceholder:   "colleague@university.edu",
    collabRemoveAriaLabel: "Remove",
    collabAdd:           "+ Add collaborator",

    /* ── Section 2: Reminders — completion URL ── */
    secReminders:        "Reminders — completion URL",
    remindersHintPre:    "To cancel pending reminders when a participant completes a survey, your survey tool must call the completion endpoint below with the",
    remindersHintMid:    "placeholder that was passed in the notification link. See",
    remindersHintLink:   "Reminders",
    remindersHintPost:   "for setup instructions per survey tool.",
    remindersGetLabel:   "GET — redirect at end of survey",
    remindersPostLabel:  "POST — webhook / server-side",

    /* ── Section 3: Event-contingent design ── */
    secEvents:           "Event-contingent design",
    toggleEvents:        "Enable event-contingent design",
    toggleEventsHint:    "Allow participants to self-initiate a report after a specific event occurs. A permanent link is shown in the app after they join the study.",
    eventsInstructionLabel:   "Participant-facing instructions",
    eventsInstructionHint:    "Explain to participants what event they should report and how to use the link in the app.",
    eventsInstructionPlaceholder: "Tap the link below each time you experience a stressful event…",
    eventsTypesLabel:    "Event types (up to 5)",
    eventsTypesHintPre:  "Define named events participants can report. Each event gets a caption shown in the app and a URL opened when the participant reports it. You can use placeholders in the URL:",
    eventsColHeader:     "Caption (shown in app) / URL",
    eventsColNum:        "#",
    eventCaptionPlaceholder: "e.g. Stressful event",

    /* ── Section 4: Action buttons ── */
    secActions:          "Action buttons",
    toggleActions:       "Enable action buttons on notifications",
    toggleActionsHint:   "Show tappable buttons directly on push notifications in the Samply app. Each button sends a distinct identifier to your survey URL.",
    actionsHintPre:      "Define up to 4 action buttons. The",
    actionsHintIdentifier: "identifier",
    actionsHintMid:      "is sent as a query parameter when the participant taps the button. The",
    actionsHintCaption:  "button caption",
    actionsHintPost:     "is the label shown on the notification.",
    actionsColId:        "Identifier (sent in URL)",
    actionsColCaption:   "Button caption (shown on notification)",
    actionsColNum:       "#",
    actionsIdPlaceholder: "e.g. button_yes",
    actionsCaptionPlaceholder: "e.g. Yes",

    /* ── Section 5: Webhooks ── */
    secWebhooks:         "Webhooks",
    toggleWebhooks:      "Enable webhooks",
    toggleWebhooksHint:  "Receive a POST request to your endpoint each time a participant event occurs in this study.",
    webhookEndpointLabel: "Endpoint URL",
    webhookEventsLabel:  "Events to send",
    webhookStudyJoined:  "study_joined — participant enrols in the study",
    webhookStudyLeft:    "study_left — participant leaves the study",
    webhookParticipantInfo: "participant_info_updated — participant code or group changes",

    /* ── Section 6: Geofencing ── */
    secGeofencing:       "Geofencing",
    toggleGeofencing:    "Enable geofencing",
    toggleGeofencingHint: "Trigger notifications when participants enter or leave a defined physical location. Requires participants to grant background location access.",
    geofencingInstLabel: "Instruction shown to participants",
    geofencingInstHint:  "Explain why location access is needed and what participants should do.",
    geofencingInstPlaceholder: "This study uses your location to send a notification when you arrive at or leave a specific place. Please allow background location access…",
    participantZoneTitle: "Participant-defined zone",
    participantZoneHintCollapsed: "An optional zone defined by the participant (e.g. home or workplace).",
    participantZoneHintExpanded:  "An optional single zone defined by the participant (e.g. their home or workplace). The link below is opened in the browser to let them select it.",
    zoneLinkLabel:       "Zone selection link",
    zoneRadiusLabel:     "Default radius (m)",
    zoneExitLabel:       "Exit zone (m)",
    zoneHeaderLabel:     "Notification header",
    zoneMessageLabel:    "Notification message",
    zoneMintimeLabel:    "Min time between pings (min)",
    triggerEnter:        "Trigger on enter",
    triggerExit:         "Trigger on exit",
    hiddenZone:          "Hidden zone (invisible to participant)",
    researcherLocLabel:  "Researcher-defined locations",
    researcherLocHint:   "Fixed locations set by you. Participants will be notified when they enter or leave these zones, without needing to define them.",
    locNewPlaceholder:   "Location name (e.g. Lab, Home)",
    locAddButton:        "+ Add location",
    locRemoveButton:     "Remove",
    locTitleLabel:       "Title",
    locTitlePlaceholder: "Location name",
    locRadiusLabel:      "Radius (m)",
    locLatLabel:         "Latitude",
    locLngLabel:         "Longitude",
    locSurveyLabel:      "Survey link",
    locNotifHeaderLabel: "Notification header",
    locNotifMessageLabel: "Notification message",
    locExitZoneLabel:    "Exit zone (m)",
    locMinTimeLabel:     "Min time (min)",
    locArrivedPlaceholder: "You arrived at…",
    locSurveyPlaceholder: "Please fill out the survey",
    locShowMap:          "Pick location on map",
    locHideMap:          "Hide map",
    locMapHint:          "Click anywhere on the map to set the coordinates.",
    locLoadingMap:       "Loading map…",
    locTriggerEnter:     "Trigger on enter",
    locTriggerExit:      "Trigger on exit",
    locInvisible:        "Hide from participants",
  },

  // ─── Participants page ───────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/participants
  // @context Table of enrolled participants. "no token" signals that the participant
  //          has not granted notification permissions on their device.
  participants: {
    enrolled:           "enrolled",
    /** {active} = number of active (non-deactivated) participants */
    activeCount:        "{active} active",
    /** {total} = total enrolled including deactivated */
    total:              "/ {total} total",
    exportCsv:          "↓ Export CSV",
    manageGroups:       "Manage groups →",
    invitationLinks:    "Invitation links →",
    colId:              "Participant ID",
    colCode:            "Code",
    colGroup:           "Group",
    colToken:           "Token",
    colEnrolled:        "Enrolled",
    noToken:            "no token",
    noTokenTitle:       "No push token — participant has not allowed notifications",
    emptyTitle:         "no participants yet",
    emptyBody:          "Share your study enrollment link to get started.",
    getEnrollmentLink:  "Get enrollment link →",
    /** {n} = count of deactivated participants */
    deactivated:        "deactivated · {n}",
    prev:               "← prev",
    next:               "next →",
    // Participant detail page
    backToParticipants:    "← Participants",
    detailEyebrow:         "participant",
    statusActive:          "active",
    statusDeactivated:     "deactivated",
    labelGroup:            "Group",
    labelEnrolled:         "Enrolled",
    labelPushToken:        "Push token",
    detailNoToken:         "No token",
    detailNoTokenHint:     "This participant has not granted notification permission, so their Expo push token was never registered. Ask them to allow notifications in their device settings and then re-join the study by scanning the QR code or opening the invitation link again.",
    labelStripeAccount:    "Stripe account",
    labelTimezone:         "Timezone",
    labelTimeWindow:       "Time window",
    scheduleNotification:  "+ Schedule notification",
    enabling:              "Enabling…",
    disabling:             "Disabling…",
    enableNotifications:   "⏵ Enable notifications",
    disableNotifications:  "⏸ Disable notifications",
    upcomingHeading:       "upcoming notifications",
    seeAll:                "see all →",
    noUpcoming:            "No upcoming notifications scheduled.",
    thScheduledFor:        "Scheduled for",
    thTitle:               "Title",
    thRem:                 "Rem.",
    /** {n} = number of notifications sent */
    sentHeading:           "notifications sent · {n}",
    noSent:                "No notifications sent yet.",
    thNotification:        "Notification",
    thSent:                "Sent",
    thStatus:              "Status",
    /** {n} = number of payouts */
    payoutsHeading:        "payouts · {n}",
    thDate:                "Date",
    thAmount:              "Amount",
    thCurrency:            "Currency",
    thReceipt:             "Receipt",
    openReceipt:           "open →",
    dangerZoneHeading:     "danger zone",
    removeParticipant:     "Remove participant",
    removeParticipantHint: "Removes this participant from the study. Their notification history is preserved.",
  },

  deleteStudy: {
    destructiveAction:  "destructive action",
    title:              "Delete study",
    studyLabel:         "Study",
    statParticipants:   "Participants",
    statResponses:      "Responses",
    warnHasData:        "This study has participants and response data. Deleting it will permanently erase all records.",
    warnHasDataStrong:  "This cannot be undone.",
    warnNoData:         "This study has no participants or responses yet. It will be permanently deleted.",
    confirmPre:         "Type",
    confirmPost:        "to confirm",
    deletePermanently:  "Delete permanently",
    deletingLabel:      "Deleting…",
    cancel:             "Cancel",
  },

  docsError: {
    label:    "// error",
    heading:  "Something went wrong.",
    body:     "This docs page could not be rendered. Try reloading — if the problem persists, the server may still be compiling.",
    tryAgain: "Try again",
  },

  testimonial: {
    submittedTitle:        "Thank you.",
    submittedBody:         "Your testimonial has been submitted and will appear on the site after review.",
    submittedBack:         "← Back to dashboard",
    breadcrumb:            "← dashboard",
    eyebrow:               "your words",
    title:                 "Share your experience.",
    subtitle:              "Tell us how you use Samply and what it has enabled in your research. Approved testimonials appear on the Samply homepage.",
    fieldText:             "Your testimonial *",
    fieldTextPlaceholder:  "We used Samply to run a 14-day ESM study across three countries...",
    fieldName:             "Display name *",
    fieldNamePlaceholder:  "Dr. Jane Smith",
    fieldRole:             "Role / title",
    fieldRolePlaceholder:  "Associate Professor",
    fieldInstitute:        "Institution",
    fieldInstitutePlaceholder: "University of Example",
    submit:                "Submit testimonial →",
  },

  resetPassword: {
    linkExpired:       "Link expired",
    linkExpiredBody:   "This password reset link is invalid or has expired. Request a new one.",
    requestNewLink:    "Request new link",
    setNewPassword:    "Set new password",
    setNewPasswordSub: "Choose a strong password for your account.",
    newPassword:       "New password",
    confirmPassword:   "Confirm new password",
    resetButton:       "Reset password",
    resetPending:      "Resetting…",
    passwordUpdated:   "Password updated. Please log in.",
    resetFailed:       "Reset failed. The link may have expired.",
  },

  pushReceipt: {
    title:           "Push Receipt",
    note:            "Note: Even if a receipt's status says \"ok\", this doesn't guarantee that the device received the message. \"ok\" means the Android or iOS push notification service successfully received the notification — if the device is off, the service will try to deliver it later.",
    receiptId:       "Receipt ID",
    status:          "Status",
    message:         "Message",
    details:         "Details",
    cleared:         "Push receipts are cleared after 24 hours.",
    missingPre:      "Expo recommends checking push receipts 15 minutes after sending notifications. If after 15 minutes there is no receipt, this likely indicates an error with the push notification service.",
    missingLink:     "Read more about push receipts.",
  },

  // ─── Schedule page ───────────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/schedule
  // @context Lists notification schedules grouped by type. Type labels (one-time,
  //          repeating, randomized, personal) are technical terms shared with the
  //          study overview page; keep them consistent.
  schedule: {
    label:          "notification schedules",
    /** {n} = count, singular */
    count:          "{n} schedule",
    /** {n} = count, plural */
    countPlural:    "{n} schedules",
    viewQueue:      "View queue →",
    addSchedule:    "+ Add schedule",
    emptyTitle:     "no schedules yet",
    emptyBody:      "Add a notification schedule to start reaching your participants.",
    addFirst:       "+ Add first schedule",
    viewQueueCard:  "view queue →",
    delete:         "delete",
    /** {n} = config count, singular */
    configs:        "{n} config",
    /** {n} = config count, plural */
    configsPlural:  "{n} configs",
    typeOneTime:    "one-time",
    typeRepeating:  "repeating",
    typeRandomized: "randomized",
    typePersonal:   "personal",
    typeEnrollment: "on join",
  },

  // ─── Data / history page ─────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/data
  // @context Shows notification-send history and compliance strip. "danger zone"
  //          is a conventional label for irreversible destructive actions.
  data: {
    label:                  "notifications sent",
    /** {participant} = participant ID when filtering */
    labelParticipant:       "notifications sent · {participant}",
    /** {n} = count, singular */
    count:                  "{n} notification",
    /** {n} = count, plural */
    countPlural:            "{n} notifications",
    exportCsv:              "↓ Export CSV",
    complianceLabel:        "7-day compliance",
    /** {n} = total sent */
    complianceSent:         "of {n} sent",
    emptyTitle:             "no responses yet",
    emptyTitleParticipant:  "no notifications for this participant",
    emptyBody:              "Participants will appear here once they tap a notification.",
    emptyBodyParticipant:   "Notifications will appear here once they are sent to this participant.",
    colParticipant:         "Participant",
    colNotification:        "Notification",
    colSent:                "Sent",
    colStatus:              "Status",
    dangerZone:             "danger zone",
    deleteAllTitle:         "Delete all records",
    /** {n} = total record count */
    deleteAllBody:          "Permanently deletes all {n} notification records for this study.",
    deleteAllButton:        "Delete all records →",
    deleteAllDeleting:      "Deleting…",
    /** {n} = total record count */
    deleteAllConfirm:       "Delete all {n} records? This cannot be undone.",
    prev:                   "← prev",
    next:                   "next →",
    /** Status badge display labels (raw DB values → translated display) */
    statusCompleted:        "completed",
    statusTapped:           "tapped",
    statusOpenedInApp:      "opened in app",
    statusSent:             "sent",
    statusArchived:         "archived",
    statusReceivedInApp:    "received in app",
    /** Footer note about retention policy for notification records */
    retentionNote:          "Notification records and responses are automatically deleted after 12 months. Export the CSV regularly if you need longer-term records.",
  },

  // ─── Invitations page ────────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/invitations
  // @context Explains how to invite participants. "Samply Research" is the brand
  //          name of the mobile app — do not translate it.
  invitations: {
    label:          "enrollment",
    title:          "Invite participants",
    prereqLabel:    "Prerequisite: Samply Research app",
    /** {appName} = "Samply Research" */
    prereqBody:     "Participants must install {appName} before joining.",
    googlePlay:     "Google Play",
    appStore:       "App Store",
    /** Sub-tabs inside the invitations card */
    tabWeb:         "Web page",
    tabCode:        "Study code",
    tabApp:         "App link",
    tabSearch:      "Search in app",
    tabSecure:      "Secure link",
    /** Web tab content */
    webLinkLabel:       "Study page URL",
    openInNewTab:       "Open ↗",
    studyCodeLabel:     "Study code",
    studyCodeNote:      "Participants can type this in the app under Find a Study → Enter code.",
    webNotActive:       "▲ Your study is not active yet. Activate it to share the web page link.",
    webNote:            "The study page shows a description, authors, and a unique QR code participants can scan to join directly.",
    /** App link tab content — split for embedded <strong> */
    appNotePre:         "Participants must have the Samply app installed and be",
    appNoteHighlight:   "signed in or registered",
    appNotePost:        "before opening these links — the link will open the app and enroll them directly into the study.",
    appDirectLabel:     "Open study directly in the app",
    appCustomLabel:     "Custom link with participant code",
    appCustomNotePre:   "Replace",
    appCustomNotePost:  "with any value — it will be recorded as the participant's code variable. Works whether or not the study is publicly listed.",
    /** Search tab content — split for embedded <strong> */
    searchNotePre:      "If your study is public, participants can search for it by name under",
    searchNoteHighlight: "More → Public studies",
    searchNotePost:     "in the Samply app. Share the exact study name:",
    searchPrivate:      "Your study is currently private. Use the Web page or App link tab instead.",
    /** Secure link tab */
    secureNote:         "Generate a tamper-proof link with a checksum. Participants can open it on their phone or paste it into the registration screen. Per-participant codes make links single-use.",
    secureProtocolLabel:    "Protocol",
    secureProtocolHint:     "https is secure and recommended",
    secureServerLabel:      "Server",
    secureServerHint:       "e.g. samply.uni-konstanz.de",
    secureStudyIdLabel:     "Study ID",
    secureStudyIdHint:      "Auto-filled — cannot be changed",
    secureModeLabel:        "Mode",
    secureModeHint:         "Multi: supports multiple studies · Single: this study only",
    secureModeMulti:        "Multi",
    secureModeSingle:       "Single",
    secureValidForLabel:    "Valid for (hours)",
    secureValidForHint:     "e.g. 168 = 7 days",
    secureCodeLabel:        "Participant code",
    secureCodeHint:         "Leave empty for shared link · Fill to assign one person",
    secureCodePlaceholder:  "e.g. P001",
    secureAllowTz:          "Allow timezone updates",
    secureAllowPayment:     "Allow payment account",
    secureGenerate:         "Generate secure link",
    secureCopyLink:         "Copy link",
    secureCopied:           "Copied ✓",
    secureQrLabel:          "QR code",
    secureQrHint:           "Participants can scan this to open the registration link directly on their phone.",
  },

  // ─── Approval page ───────────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/approval
  // @context Controls submission of a study for public listing in the mobile app.
  //          Three states: public, pending review, not yet submitted.
  approval: {
    publicTitle:        "Your study is public",
    /** {appName} = "Samply Research" */
    publicBody1:        "Your study is now displayed in the public list of studies in the {appName} mobile application. Participants who browse the app can discover and join it directly.",
    publicBody2:        "If you want to remove the study from the public list, press the button below. Note that this action cannot be undone — if you want to make your study public again later, you would need to reapply for approval.",
    removeFromPublic:   "Remove from public list",
    removingLabel:      "Removing…",
    pendingTitle:       "Request submitted",
    pendingBody1:       "Your request for approval has been submitted. We will review your study and get back to you.",
    /** {emailLink} = clickable email link */
    pendingBody2:       "If you don't hear from us for a while, don't hesitate to contact us by {emailLink}.",
    pendingEmail:       "email",
    withdrawRequest:    "Withdraw request",
    withdrawingLabel:   "Withdrawing…",
    submitTitle:        "Submit for public approval",
    /** {appName} = "Samply Research" */
    submitBody1:        "Public studies are displayed in the study list inside the {appName} mobile app, so any participant browsing the app can discover and join your study.",
    /** {not} = bold word "not" */
    submitBody2:        "Your study does {not} have to be public to collect data — you can always invite participants privately via QR code or direct link.",
    submitBodyNot:      "not",
    requirementsNote:   "Requirements for approval: complete participant instructions, a consent form, researcher information, and a confirmed researcher email address. Studies intended only for testing should use the private QR-code invitation instead.",
    submitButton:       "Submit approval request →",
    submittingLabel:    "Submitting…",
  },

  // ─── Stream API page ─────────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/api
  // @context Technical page for external API integrations. Keep technical terms
  //          (token, endpoint, groupID, participantID) in English.
  streamApi: {
    label:                    "stream api",
    title:                    "Stream API",
    subtitle:                 "Trigger notifications from an external system — your survey tool, a script, or any HTTP client — by posting to the Samply API. Useful for event-contingent designs where a notification should fire immediately after an event of interest.",
    sectionToken:             "Notification token",
    copyToken:                "Copy token",
    /** {date} = formatted expiry date */
    tokenExpired:             "⚠ Token expired on {date}",
    /** {date} = formatted expiry date */
    tokenValid:               "Valid until {date}",
    noToken:                  "No token generated yet.",
    noTokenOwner:             "Use the form below to create one.",
    noTokenMember:            "Ask the study owner to generate a token.",
    sectionRegenerate:        "Regenerate token",
    sectionGenerate:          "Generate token",
    regenerateBody:           "Generating a new token immediately invalidates the old one — update any external scripts that use it.",
    generateBody:             "Set an expiry date and generate your first token.",
    expiresLabel:             "Token expires on",
    regenerateButton:         "Regenerate",
    generateButton:           "Generate token",
    regeneratingLabel:        "Regenerating…",
    generatingLabel:          "Generating…",
    sectionTargeting:         "Targeting",
    targetGroupAndParticipant: "All members of the group except the specified participant",
    targetGroupOnly:          "All members of the group",
    targetParticipantOnly:    "That specific participant",
    targetNeither:            "All participants in the study",
    sectionCode:              "Code example (JavaScript)",
    copyCode:                 "Copy code",
    endpoint:                 "Endpoint:",
    // Targeting card — inline description paragraphs
    targetingAnd:       "and",
    targetingDef:       "define the notification content.",
    targetingExpNote:   "is the number of minutes before an undelivered notification is discarded.",
    targetingPlPre:     "The",
    targetingPlSupport: "field supports placeholders:",
    targetingPlPost:    "— Samply fills these in per-participant before forwarding the link.",
  },

  // ─── Groups page ─────────────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/groups
  // @context Segment participants into named groups for differential scheduling.
  groups: {
    backToParticipants: "← Participants",
    label:              "participant segments",
    /** {n} = group count, singular */
    count:              "{n} group",
    /** {n} = group count, plural */
    countPlural:        "{n} groups",
    /** {n} = total participant count */
    total:              "/ {n} participants",
    existingLabel:      "existing groups",
    colGroup:           "Group",
    colGroupId:         "Group ID",
    colMembers:         "Members",
    deleteButton:       "Delete",
    deletingLabel:      "Deleting…",
    emptyTitle:         "no groups yet",
    emptyBody:          "Create your first group below to segment participants.",
    addLabel:           "add a new group",
    allAssigned:        "All participants are already assigned to a group.",
    nameLabel:          "Group Name",
    namePlaceholder:    "e.g. Control, Treatment A…",
    /** {n} = number of participants without a group */
    selectLabel:        "Select participants · {n} without a group",
    selectOptional:     "Assign participants (optional)",
    noParticipants:     "No participants yet — you can add them later.",
    createButton:       "Create group →",
    creatingLabel:      "Creating…",
    /** {n} = number of newly queued notifications */
    autoScheduledNotice: "{n} notification(s) automatically queued for newly assigned participant(s) based on existing non-yoked schedules.",
    scheduleWarningTitle: "This group has active non-yoked schedules",
    scheduleWarningBody:  "Participants you assign will immediately have their upcoming notifications scheduled, starting from each person's own registration date. Past notification times are skipped.",
  },

  // ─── Forum pages ─────────────────────────────────────────────────────────────
  // @page    /forum, /forum/[categorySlug], /forum/[categorySlug]/new,
  //          /forum/[categorySlug]/[threadId], /forum/search
  // @context Community discussion board for researchers. Tone: collegial,
  //          straightforward. "solved" and "pinned" are standard forum conventions.
  forum: {
    communityLabel:       "community",
    title:                "Forum",
    search:               "Search →",
    noCategories:         "No categories yet. An admin will set them up soon.",
    /** {n} = thread count */
    threads:              "{n} threads",
    /** {title} = latest thread title */
    latest:               "Latest: {title}",
    breadcrumb:           "Forum",
    newThread:            "+ New thread",
    noThreads:            "No threads yet — be the first to post.",
    pinned:               "pinned",
    locked:               "locked",
    solved:               "solved",
    /** {n} = reply count */
    replies:              "{n} replies",
    newThreadBreadcrumb:  "New thread",
    newThreadTitle:       "New thread",
    titleLabel:           "Title",
    titlePlaceholder:     "What's your question or topic?",
    bodyLabel:            "Body",
    bodyMarkdown:         "(Markdown supported)",
    bodyPlaceholder:      "Describe your question in detail. Markdown is supported — **bold**, `code`, etc.",
    cancel:               "Cancel",
    postThread:           "Post thread",
    replyPlaceholder:     "Write your reply… (Markdown supported)",
    postReply:            "Post reply",
    postingLabel:         "Posting…",
    markSolved:           "Mark as solved",
    solvedBadge:          "✓ solved",
    pin:                  "Pin",
    unpin:                "Unpin",
    lock:                 "Lock",
    unlock:               "Unlock",
    deleteThread:         "Delete thread",
    deletePost:           "Delete",
    vote:                 "▲",
    searchBreadcrumb:     "Search",
    searchTitle:          "Search threads",
    searchPlaceholder:    "Search for a topic, question, or keyword…",
    searchButton:         "Search",
    /** {query} = the user's search query */
    noResults:            "No results for \"{query}\"",
    /** {n} = result count, singular */
    resultsCount:         "{n} result",
    /** {n} = result count, plural */
    resultsCountPlural:   "{n} results",
    tooShort:             "Enter at least 2 characters to search.",
  },

  // ─── Study detail (public) page ──────────────────────────────────────────────
  // @page    /studies/[slug]
  // @context Public page shown to potential participants. Contains a QR code and
  //          instructions to join. Friendly, accessible tone.
  studyDetail: {
    acceptingParticipants: "● accepting participants",
    scanToJoin:           "scan to join",
    openWithApp:          "Open with the Samply app on iOS or Android",
    orTypeCode:           "or type this code",
    studyCodeLabel:       "study code",
    findStudyHint:        "in Find a Study → Enter code",
    tapToOpen:            "On your phone?",
    tapToOpenLink:        "Tap to open directly",
  },

  // ─── Study not-found page ────────────────────────────────────────────────────
  // @page    /studies/[slug] when the slug doesn't resolve to a project
  // @context Shown when a participant follows a stale link, a study has been
  //          removed by the researcher, or the URL is mistyped. Tone: warm and
  //          non-blaming — most often the study simply ended.
  studyNotFound: {
    eyebrow:        "this postcard didn't deliver",
    title:          "Study not found",
    body:           "We couldn't find this study. It may have ended, been removed by the researcher, or the link might be slightly off.",
    goHome:         "Go home",
    footer:         "If you reached this page from an email or QR code, the study likely closed enrolment.",
  },

  // ─── Study completion page ───────────────────────────────────────────────────
  // @page    /studies/[slug]/done/[messageId]
  // @context Shown to participants after completing a survey tap. May show an error
  //          if the link is invalid or already recorded. Keep copy brief and clear.
  studyDone: {
    platformLabel:          "Samply Research Platform",
    linkInvalid:            "Link not valid.",
    linkInvalidBody:        "This study could not be found. The link may be incorrect or the study may no longer be active.",
    responseNotFound:       "Response not found.",
    responseNotFoundBody:   "This completion link could not be matched to a notification. It may have already been recorded, or the link may be incorrect.",
    canClose:               "You can close this page.",
    thankYou:               "Thank you.",
    alreadyRecorded:        "Already recorded.",
    alreadyRecordedBody:    "This response was already recorded. No action needed — you can close this page.",
    defaultMessage:         "Your response has been recorded. Thank you for taking part!",
    closeAndReturn:         "You can close this page and return to the app.",
  },

  // ─── Email confirmation page ─────────────────────────────────────────────────
  // @page    /account/confirm/[token]
  // @context Shown after a researcher clicks the email confirmation link. Two states:
  //          success (token valid) and expired/invalid. Tone: reassuring on success,
  //          matter-of-fact on error.
  confirmEmail: {
    /** Handwritten-style accent above the success heading */
    allSet:            "you're all set!",
    title:             "Email confirmed",
    /** {name} = researcher's display name */
    welcomeName:       "Welcome, {name}.",
    /** Shown after confirmation when user is already logged in */
    sessionBody:       "Your email is confirmed. Head to your dashboard.",
    /** Shown after confirmation when user is NOT logged in */
    noSessionBody:     "Your account is ready — log in to get started.",
    toDashboard:       "Go to dashboard →",
    toLogin:           "Log in →",
    expiredTitle:      "Link expired",
    expiredBody:       "This confirmation link is invalid or has expired. Log in and request a new one from your account settings.",
    loginButton:       "Log in",
    toAccountSettings: "Go to account settings",
  },

  // ─── Logout page ─────────────────────────────────────────────────────────────
  // @page    /logout
  // @context Single-button page; the action is irreversible within the session.
  logout: {
    button: "Log out",
  },

  // ─── News page ───────────────────────────────────────────────────────────────
  // @page    /news/intro
  // @context Legacy update log. Only the nav label is translated; article bodies
  //          are historical English-only content.
  news: {
    navLabel: "News & Updates",
  },

  // ─── Help page ───────────────────────────────────────────────────────────────
  // @page    /help
  // @context Simple question submission form.
  help: {
    question:    "Do you have a question?",
    placeholder: "Ask it here",
    send:        "Send",
  },

  // ─── Donate page ─────────────────────────────────────────────────────────────
  // @page    /donate
  // @context Stripe-backed donation form. Currency values (€5, €10, etc.) are NOT
  //          translated. "One-time" / "Monthly" are frequency toggles.
  donate: {
    eyebrow:         "support open research",
    title:           "Donate to Samply",
    subtitle:        "Samply is free and open-source. Your donation helps keep the servers running, fund new features, and support researchers worldwide.",
    cancelled:       "Payment cancelled — no charge was made.",
    frequencyLabel:  "Frequency",
    oneTime:         "One-time",
    monthly:         "Monthly",
    amountLabel:     "Amount",
    custom:          "Custom",
    enterAmount:     "Enter amount",
    /** Appended to the amount summary when frequency is monthly */
    perMonth:        "per month",
    /** Appended to the amount summary when frequency is one-time */
    oneTimeLabel:    "one-time",
    summaryEmpty:    "Enter an amount above",
    submitMonthly:   "Start monthly donation →",
    submitOneTime:   "Donate now →",
    poweredBy:       "Powered by Stripe · Secure payment · Cancel anytime",
  },

  // ─── Docs nav / chrome ───────────────────────────────────────────────────────
  // @page    /docs/[page]
  // @context Sidebar navigation labels and search UI chrome. Keep labels concise —
  //          they appear in a narrow sidebar. Do NOT translate the docs content body.
  docs: {
    searchPlaceholder:  "Search docs…",
    searchNoResults:    "No results for",
    searchNavigate:     "navigate",
    searchOpen:         "open",
    searchClose:        "close",
    /** NAV_LABELS — sidebar link text for each docs page */
    navLabels: {
      home:               "Welcome",
      "first-study":      "Your first study",
      invite:             "Inviting participants",
      types:              "The four types",
      personal:           "Personal (event-based)",
      form:               "Creating a schedule",
      queue:              "The scheduled queue",
      placeholders:       "URL placeholders",
      groups:             "Groups",
      reminders:          "Reminders",
      "event-contingent": "Event-contingent design",
      geofencing:         "Geofencing",
      stream:             "Stream API",
      glossary:           "Glossary",
      api:                "API",
      changelog:          "Changelog",
      about:              "About Samply",
      legalnotice:        "Legal Notice",
      policy:             "Privacy Policy",
      terms:              "Terms & Conditions",
      irb:                "IRB / Ethics Brief",
    },
    /** Sidebar section group headings — also used as breadcrumb in the page header */
    sections: {
      getStarted:            "Get started",
      notificationSchedules: "Notification schedules",
      powerFeatures:         "Power features",
      advancedFeatures:      "Advanced features",
      reference:             "Reference",
    },
    /** H1 page titles shown above the lede paragraph */
    pageTitles: {
      home:               "Getting started",
      "first-study":      "Your first study",
      invite:             "Inviting participants",
      types:              "The four schedule types",
      personal:           "Personal scheduling — Day N, after registration",
      form:               "Creating a schedule, one section at a time",
      queue:              "The scheduled queue",
      placeholders:       "URL placeholders",
      groups:             "Groups",
      reminders:          "Reminders",
      "event-contingent": "Event-contingent design",
      geofencing:         "Geofencing",
      stream:             "Stream API",
      glossary:           "Glossary",
      api:                "API",
      changelog:          "Changelog",
      about:              "History & motivation",
      legalnotice:        "Legal Notice",
      policy:             "Privacy Policy",
      terms:              "Terms & Conditions",
      irb:                "IRB & Ethics Brief",
    },
    /** Handwritten-style eyebrow shown above the H1 on each page */
    pageEyebrows: {
      home:               "read the manual ✦",
      "first-study":      "your workspace",
      invite:             "growing the cohort",
      types:              "four ways to time a ping",
      personal:           "time, but bent to each participant",
      form:               "the form, section by section",
      queue:              "the operational view",
      placeholders:       "for qualtrics, redcap, lime — anything with a url",
      groups:             "splitting your cohort",
      reminders:          "the follow-up ping",
      "event-contingent": "participant-initiated reports",
      geofencing:         "location as the trigger",
      stream:             "your systems, in real time",
      glossary:           "the vocabulary",
      api:                "for the builders",
      changelog:          "what changed",
      about:              "where it came from",
    },
    /** First paragraph shown below the H1 — the page lede */
    pageLedes: {
      home:               "Samply schedules push notifications to study participants on a flexible, repeating cadence. It works for any longitudinal design — daily diaries, experience-sampling, intervention studies, clinical trials — wherever you need to reach participants more than once.",
      "first-study":      "Studies are the containers for everything in Samply — participants, schedules, and response history all live inside one.",
      invite:             "Participants join by tapping a link or scanning a QR code in the Samply Research app. You never see their contact details.",
      types:              "Every notification in Samply belongs to a schedule, and every schedule is one of four types. Pick wrong and you'll fight your own data.",
      personal:           "Personal schedules attach to the participant, not the calendar. Day 1 means the day they joined.",
      form:               "The schedule form follows a fixed order: Content, Timezone, Participants, Time, Date. Choosing a recurring Date pattern reveals three more sections — Month, Start, and Stop.",
      queue:              "Every schedule expands into a queue: one row per participant per send time.",
      placeholders:       "Before opening the Web Link, Samply substitutes any %PLACEHOLDER% tokens with that participant's real values.",
      groups:             "Groups let you send different schedules to different subsets of participants within the same study.",
      reminders:          "Reminders are optional follow-up notifications sent when Samply has not detected a completion.",
      "event-contingent": "Event-contingent designs let participants self-initiate a report the moment a target event occurs, rather than waiting for a scheduled ping.",
      geofencing:         "Geofencing sends a notification automatically when a participant enters or leaves a defined geographic area — no clock, no cron.",
      stream:             "The Stream API delivers participant events to your infrastructure as they happen, via outbound webhooks.",
      glossary:           "Key terms used throughout Samply and this documentation.",
      api:                "Samply exposes a REST API for programmatic study management and advanced integrations.",
      changelog:          "A running record of meaningful changes to the Samply platform.",
      about:              "Why Samply was built, the problems it set out to solve, and how the platform has evolved since 2019.",
    },
  },

  // ─── New schedule page ───────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/schedule/new
  newSchedulePage: {
    eyebrow: "new schedule",
    title:   "Schedule notifications",
    back:    "← Back to schedules",
  },

  // ─── Samply vs SMAAT comparison page ─────────────────────────────────────────
  // @page    /smaat
  smaat: {
    platformComparison: "platform comparison",
    whenToUse:          "when to use each",
    featureComparison:  "feature comparison",
    colFeature:         "Feature",
    colSamply:          "Samply",
    smaatDescription:   "A commercial ESM platform with built-in surveys, cognitive tasks, sensor data collection, and gamification. Free tier available for testing with up to 10 participants.",
    backToDashboard:    "← back to dashboard",
    useSamplyTitle:     "Use Samply when…",
    considerSmaatTitle: "Consider SMAAT when…",
  },

  // ─── Legacy participants page ─────────────────────────────────────────────────
  // @page    /participants
  legacyParticipants: {
    title:          "Participants",
    studyLabel:     "Study:",
    selectStudy:    "Select a study above to view its participants.",
    noParticipants: "No participants yet.",
    colStatus:      "Status",
    colSamplyId:    "Samply ID",
    colToken:       "Token",
    colDate:        "Date",
    colCode:        "Code",
    colGroup:       "Group",
    colPrefs:       "Time preferences",
    colTimezone:    "Timezone",
    colPayout:      "Payout",
  },

  // ─── Legacy projects page ─────────────────────────────────────────────────────
  // @page    /projects
  legacyProjects: {
    myStudies:      "My Studies",
    invitedStudies: "Invited Studies",
    active:         "Active",
    public:         "Public",
    noStudies:      "You have no studies yet.",
    newStudy:       "+ New study",
  },


  // ─── Legacy payouts / receipts pages ─────────────────────────────────────────
  // @page    /payout/[id], /receipts/[id]
  legacyPayouts: {
    tabPayouts:      "Payouts",
    tabReceipts:     "Receipts",
    participantInfo: "Participant info",
    idLabel:         "Samply ID",
    nameLabel:       "Name",
    emailLabel:      "Email",
    paymentsLabel:   "Payments",
    enabled:         "Enabled",
    disabled:        "Disabled",
    sendPayment:     "Send payment",
    currencyLabel:   "Currency",
    amountLabel:     "Amount",
    sendButton:      "Send payment",
    notSetUp:        "This participant has not set up a payment account yet.",
    noReceipts:      "No receipts yet.",
    colDate:         "Date",
    colReceiptId:    "Receipt ID",
    colStatus:       "Status",
    colCurrency:     "Currency",
    colAmount:       "Amount",
    colFee:          "Fee",
    colUrl:          "URL",
  },

  // ─── Analytics dashboard ─────────────────────────────────────────────────────
  // @page    /dashboard/[studyId]/analytics
  analytics: {
    metricSent:           "Notifications sent",
    metricRate:           "Response rate",
    metricTime:           "Avg response time",
    metricActive:         "Active participants",
    /** {days} = number of days selected */
    subLastDays:          "last {days} days",
    /** {responded} = opens, {sent} = total sent */
    subOpenedOf:          "{responded} of {sent} opened",
    subSentOpened:        "sent → opened",
    subUniqueRespondents: "unique respondents",
    chartRateOverTime:    "Response rate over time",
    chartFunnel:          "Notification delivery funnel",
    chartResponseTime:    "Response time distribution",
    chartHourly:          "Time-of-day response pattern",
    chartSchedules:       "Schedule performance",
    chartParticipants:    "Participant compliance",
    chartRetention:       "Participant retention by study day",
    retentionDesc:        "Active participants per relative study day — aligned to each participant's own join date. A drop indicates when participants stop responding.",
    emptyState:           "No data yet for this period",
    /** {time} = formatted HH:MM time string */
    updatedAt:            "Updated {time} · auto-refreshes every 5 min",
    colSchedule:          "Schedule",
    colSent:              "Sent",
    colOpened:            "Opened",
    colCompliance:        "Compliance",
    colParticipant:       "Participant",
    colLastActive:        "Last active",
    tooltipResponseRate:  "Response rate",
    tooltipSent:          "Sent",
    tooltipCount:         "Count",
    tooltipResponses:     "Responses",
    tooltipAvgRate:       "Avg response rate",
    tooltipActive:        "Active participants",
    tooltipEligible:      "Eligible (joined by this day)",
    legendActive:         "Active",
    legendEligible:       "Enrolled & eligible",
    /** {day} = study day number */
    studyDay:             "Study day {day}",
    /** {n} = day number for X-axis tick */
    dayLabel:             "Day {n}",
    /** {n} = number for day-range button (e.g. "7d") */
    dayButton:            "{n}d",
  },

  // ─── Scheduled notifications queue page ──────────────────────────────────────
  // @page    /scheduled/[id]
  // @context Shows the Agenda job queue and pending notification queue for a study.
  //          Technical terms (agenda, pending, cron) are kept in English where conventional.
  scheduled: {
    breadcrumb:              "← Schedule",
    deleteSchedule:          "Delete schedule",
    queueLabel:              "scheduled queue",
    allSchedules:            "all schedules",
    notifSchedule:           "notification schedule",
    /** {date} = formatted creation date */
    created:                 "created {date}",
    labelTitle:              "Title",
    labelMessage:            "Message",
    labelUrl:                "URL",
    labelTimezone:           "Timezone",
    adjustedToParticipant:   "(adjusted to participant)",
    labelScheduledFor:       "Scheduled for",
    labelTimeWindow:         "Time window",
    labelRepeatInterval:     "Repeat interval",
    labelStart:              "Start",
    labelStop:               "Stop",
    labelDailyWindow:        "Daily window",
    /** {n} = number of pings per day */
    perDay:                  "{n} per day",
    labelCount:              "Count",
    /** {n} = total notification count */
    notifications:           "{n} notifications",
    labelMinDistance:        "Min. distance",
    /** {n} = minutes */
    minutes:                 "{n} min",
    labelReminder:           "Reminder",
    labelReminders:          "Reminders",
    labelGroups:             "Groups",
    labelParticipants:       "Participants",
    labelAudience:           "Audience",
    allCurrentParticipants:  "All current participants",
    labelRandomized:         "Randomized",
    yes:                     "Yes",
    labelFutureParticipants: "Future participants",
    included:                "Included",
    labelDelayAfterJoin:     "Delay after join",
    immediately:             "immediately (on join)",
    labelExpiresIn:          "Expires in",
    /** {n} = hours */
    hours:                   "{n} h",
    /** Agenda job type display labels */
    jobOneTime:              "One-time",
    jobRepeat:               "Repeat",
    jobStartManager:         "Start manager",
    jobEndManager:           "End manager",
    jobPersonal:             "Personal",
    jobPersonalStart:        "Personal start",
    jobPersonalEnd:          "Personal end",
    jobRandomStart:          "Random start",
    jobRandomEnd:            "Random end",
    jobRandomPersonal:       "Random personal",
    /** Schedule type badge labels */
    typeRandom:              "random",
    typeOneTime:             "one-time",
    typeEvent:               "event",
    typeEnrollment:          "on join",
    typeRepeating:           "repeating",
    typeFixed:               "fixed",
    /** Job type filter pills */
    filterAll:               "All",
    filterOneTime:           "One-time",
    filterRepeat:            "Repeat",
    filterPersonal:          "Personal",
    filterRandom:            "Random",
    /** Pending notification status toggle pills */
    statusPending:           "Pending",
    statusProcessing:        "Processing",
    statusSent:              "Sent",
    statusFailed:            "Failed",
    statusCancelled:         "Cancelled",
    /** Agenda jobs table headers */
    colType:                 "Type",
    colNextRun:              "Next run",
    colLastRun:              "Last run",
    colInterval:             "Interval",
    colParticipant:          "Participant",
    colGroup:                "Group",
    /** Participant filter */
    allParticipants:         "All participants",
    applyFilter:             "Apply",
    clearFilter:             "clear ×",
    /** {n} = notification count, singular */
    queueCount:              "scheduled queue · {n} notification",
    /** {n} = notification count, plural */
    queueCountPlural:        "scheduled queue · {n} notifications",
    noMatchFilter:           "No notifications match this filter.",
    noQueue:                 "No notifications in the queue.",
    allDelivered:            "All sends have been delivered, or this schedule has not generated any rows yet.",
    /** Toggle … above to see history hint */
    toggleHintPre:           "Toggle",
    toggleHintPost:          "above to see history.",
    /** Referenced in the "toggle Sent/Cancelled to see history" hint */
    toggleHintSent:          "Sent",
    toggleHintCancelled:     "Cancelled",
    /** Agenda jobs table action links */
    jobEdit:                 "edit",
    jobDelete:               "delete",
    /** {page}, {pages}, {total} = pagination values */
    pageSummary:             "Page {page} of {pages} · {total} total",
    prevPage:                "← Prev",
    nextPage:                "Next →",
    /** {n} = job count */
    agendaJobs:              "agenda jobs · {n}",
    /** Footer note about retention policy for the pending queue */
    retentionNote:           "Sent and cancelled records are kept here for 30 days for debugging, then automatically deleted. Sent notifications and responses are also recorded in the study's History tab, where they are retained for 12 months.",
    retentionHistoryLink:    "Open History →",
    /** Edit Agenda Job page */
    editJobTitle:            "Edit Agenda Job",
    editJobBack:             "← Back to notification jobs",
    editJobType:             "Job type",
    editJobRepeatInterval:   "Repeat interval",
    editJobUserId:           "User ID",
    editJobGroupId:          "Group ID",
    editJobLastRun:          "Last run",
    editJobNextRunAt:        "Next run at",
    editJobSave:             "Save",
    editJobSaving:           "Saving…",
    editJobCancel:           "Cancel",
  },

  // ─── Pending notification row actions ────────────────────────────────────────
  pendingActions: {
    cancel:           "cancel",
    reActivate:       "re-activate",
    delete:           "delete",
    cancelConfirm:    "Cancel this notification? It can be re-activated later if it hasn't fired yet.",
    reActivateConfirm: "Re-activate this notification?",
    deleteConfirm:    "Permanently delete this notification? This cannot be undone.",
  },

  // ─── Pending notifications table ─────────────────────────────────────────────
  // @page    /scheduled/[id]?notificationId=... (PendingTable component)
  pendingTable: {
    colScheduledFor: "Scheduled for",
    colStatus:       "Status",
    colTitle:        "Title",
    colReminder:     "Rem.",
    colTo:           "To",
    statusPending:    "pending",
    statusProcessing: "processing",
    statusSent:       "sent",
    statusFailed:     "failed",
    statusCancelled:  "cancelled",
    selectAll:   "Select all",
    deselectAll: "Deselect all",
    sortDate:    "Date",
    sortStatus:  "Status",
    selected:    "{n} selected",
    deleting:    "Deleting…",
    deleteN:     "Delete {n}",
    clearSelection: "clear ×",
    reminderBadge: "reminder",
    recipientAll:  "all",
    confirmDelete: "Permanently delete {n} notification{plural}? This cannot be undone.",
  },

  // ─── Legacy invitations page ──────────────────────────────────────────────────
  // @page    /invitations
  // ─── Public studies listing page ─────────────────────────────────────────────
  // @page    /studies
  studiesPage: {
    eyebrow:          "open to participants",
    title:            "Public studies",
    /** {count} = number of studies */
    countSingular:    "{count} study currently accepting participants",
    countPlural:      "{count} studies currently accepting participants",
    emptyHandwritten: "nothing yet",
    emptyBody:        "No public studies are accepting participants right now. Check back soon.",
    joinLink:         "Join →",
    untitledStudy:    "Untitled study",
    prevPage:         "← Previous",
    nextPage:         "Next →",
    /** {page} / {pages} */
    pagination:       "{page} / {pages}",
    ctaTitle:         "Running a study?",
    ctaBody:          "Create your own experience sampling study — free for academic use.",
    ctaLink:          "Start a study →",
  },

  // ─── Notification schedule creation form ──────────────────────────────────────
  // @page    /dashboard/[studyId]/schedule/new
  // @context Complex multi-step form for creating notification schedules.
  notificationForm: {
    // StepCard titles
    cardContent:         "Notification content",
    cardTimezone:        "Timezone",
    cardRecipients:      "Recipients",
    cardTime:            "Time",
    cardDate:            "Date",
    cardMonth:           "Month",
    cardStart:           "Start",
    cardStop:            "Stop",
    cardExpiry:          "Link expiry",
    cardReminders:       "Reminders",

    // Content fields
    labelTitle:          "Title",
    labelMessage:        "Message",
    labelWebLink:        "Web link",
    titlePlaceholder:    "e.g. Daily check-in",
    messagePlaceholder:  "How are you feeling right now?",

    // URL help accordion
    urlHelpToggle:       "Recording participant data in the survey URL",
    urlHelpDesc:         "Samply replaces placeholders in the URL before sending it to each participant, so you can capture identifiers directly in your survey tool's query string.",
    urlHelpPhSamplyId:   "Participant's unique Samply identifier (always present).",
    urlHelpPhCode:       "Code the participant entered when joining the study. Falls back to the Samply ID if no code was provided.",
    urlHelpPhMessageId:  "Unique ID of this specific notification delivery.",
    urlHelpPhGroup:      "The participant's group name, if they belong to one.",
    urlHelpExample:      "Example",
    urlHelpSeeQueryPre:  "Your survey tool can then extract these values from the address bar. See",
    urlHelpQueryStrings: "query strings",
    urlHelpSeeQueryMid:  "and the",
    urlHelpFullRef:      "full placeholder reference",

    // Timezone
    adjustTimezone:      "Adjust delivery time for each participant's timezone",
    refTimezone:         "Reference timezone",

    // Recipients
    futureParticipants:  "Future participants (anyone who joins after this schedule is created)",
    currentParticipants: "Current participants",
    allParticipants:     "All participants",
    selectSpecific:      "Select specific",
    noParticipantsYet:   "No participants yet",
    groupsLabel:         "Groups",
    allGroups:           "All groups",
    yokedLabel:          "Yoked design",
    yokedHintOn:         "All group members receive notifications at exactly the same times — one shared schedule for everyone. For registration-relative timings, the anchor is the latest-joined participant at the moment you create this schedule; all others are shifted to match that timeline. Participants who join the group later are automatically included in the same shared schedule at send time (no re-anchoring).",
    yokedHintOff:        "Each participant gets a fully independent schedule. Random times are drawn separately per person. Registration-relative windows start from each person's own join date. New participants assigned to this group will automatically receive their own freshly calculated notifications.",
    yokedOn:             "Yoked",
    yokedOff:            "Non-yoked (independent)",

    // Time card
    specificTimepoints:  "Specific timepoints",
    randomWindow:        "Random within window",
    repeatEveryNMin:     "Repeat every N min",
    addTimepoint:        "Add timepoint",
    addWindow:           "Add window",
    labelFrom:           "From",
    labelTo:             "→  To",
    numNotifications:    "# notifications",
    minGap:              "Min gap (min)",
    labelRepeatEvery:    "Repeat every",
    /** n = 1 → singular */
    minuteSingular:      "minute",
    minutePlural:        "minutes",

    // Date card
    specificDates:       "Specific dates",
    everyDay:            "Every day",
    /** {n} = interval in days */
    everyNDays:          "Every {n} days",
    weekdaysOption:      "Weekdays",
    daysOfMonth:         "Days of month",
    addDate:             "Add date",

    // Datetime strategy (start/stop)
    specificDateTime:    "Specific date/time",
    relativeToEvent:     "Relative to event",
    dayNAfterEvent:      "Day N after event",
    inlineTime:          "Time",
    inlineDate:          "Date",
    inlineAfter:         "After",
    inlineMFrom:         "m from",
    optRegistration:     "registration",
    optNow:              "now",
    inlineDay:           "Day",
    inlineAfterWord:     "after",

    // Month card
    anyMonth:            "Any month",
    specificMonths:      "Specific months",

    // Link expiry
    doesNotExpire:       "Does not expire",
    expiresAfter:        "Expires after",

    // Reminders
    noReminders:         "No reminders",
    addReminders:        "Add reminders",
    reminderHint:        "Sent if the participant has not completed the survey after the specified delay.",
    sendAfter:           "Send after",
    addReminder:         "Add reminder",

    // After joining (enrollment-triggered)
    afterJoining:           "After joining",
    afterJoiningDelay:      "Delay after joining",
    afterJoiningNote:       "Set all fields to 0 to send immediately when a participant joins.",
    afterJoiningFutureNote: "\"Future participants\" has been enabled automatically — this is what makes the notification fire when each new participant joins.",

    // Submit button
    submit:              "Schedule notifications →",
    submitting:          "Scheduling…",

    // Weekday abbreviations (display labels only; cron values stay English)
    mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",

    // Month abbreviations
    jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
    jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec",

    // Validation alerts
    alertTitle:          "Enter a title",
    alertMessage:        "Enter a message",
    alertRecipient:      "Choose at least one recipient group",
    alertParticipants:   "Choose specific participants or select all",
    alertGroups:         "Choose specific groups or select all",
    alertRepeatDates:    "Repeat every N minutes with specific dates is not supported. Choose a date pattern instead.",
    alertError:          "Request failed",
  },

  projectForm: {
    // Page headings
    editTitle:             "Edit study",
    newTitle:              "New study",
    newSubtitle:           "Fill in the basics — you can always change these later.",
    // Submit / cancel
    saveChanges:           "Save changes",
    createStudy:           "Create study →",
    saving:                "Saving…",
    cancel:                "Cancel",
    // Danger zone (edit page)
    dangerZone:            "Danger zone",
    deleteStudy:           "Delete this study →",
    // Form sections
    sectionIdentity:       "Study identity",
    sectionExperience:     "Participant experience",
    sectionEnrollment:     "Enrollment options",
    // Study identity fields
    nameLabel:             "Study name *",
    namePlaceholder:       "e.g. Daily Mood Study 2025",
    descLabel:             "Description",
    descHint:              "Brief overview shown to participants in the app and on the public studies page.",
    descPlaceholder:       "Tell participants what the study is about, how long it lasts, and how often they will receive notifications…",
    // Image picker
    imageLabel:            "Study image",
    imageHint:             "Displayed next to your study in the app and on the public studies page.",
    imageSelected:         "Image selected",
    imageCurrent:          "Current image",
    imageChoose:           "Choose image",
    imageTypes:            "JPG, PNG or GIF",
    imageReplace:          "Replace",
    imageBrowse:           "Browse",
    imageCancelSel:        "Cancel selection",
    imageRemove:           "Remove image",
    // Consent form
    consentLabel:          "Consent form",
    consentNoticeTitle:    "For health-related human subject research, this consent text must include:",
    consentNoticeItem1:    "The nature, purpose, and duration of the research",
    consentNoticeItem2:    "The procedures, risks, and expected benefits to participants",
    consentNoticeItem3:    "How data will be handled, kept confidential, and whether it will be shared with third parties",
    consentNoticeItem4:    "A contact point for participant questions",
    consentNoticeItem5:    "How participants can withdraw from the study",
    consentNoticeFooter:   "Only publish studies once this information is complete and reviewed. If consent is obtained outside the app, only participants who have already completed that external consent process may be invited — use individual invitation links or codes so that only previously consented participants can join.",
    consentHint:           "Displayed when participants tap ‘Join the study’ in the app. Required for public studies.",
    consentPlaceholder:    "Welcome to our study! By joining, you agree to…",
    // After join
    afterJoinLabel:        "Message after joining",
    afterJoinHint:         "Shown immediately after a participant taps ‘Join’. Use it to confirm enrolment and set expectations for the first notification.",
    afterJoinPlaceholder:  "Thank you for joining! You will receive your first notification tomorrow at 9 am…",
    // Completion
    completionLabel:       "Completion message",
    completionHint:        "Displayed to participants after they complete a survey or task — relevant when you redirect participants to a Samply completion URL to register the completion event.",
    completionPlaceholder: "Thank you! Your response has been recorded. The study has ended.",
    // Code toggle
    codeToggle:            "Ask for individual participant code",
    codeToggleHint:        "Useful for linking app participants to external datasets or counterbalancing conditions.",
    codePromptLabel:       "Code prompt message",
    codePlaceholder:       "Please enter the code provided by the researcher.",
    // Group toggle
    groupToggle:           "Ask participants to select a group",
    groupToggleHint:       "Useful for between-subjects designs where participants are assigned to different conditions.",
    groupMethodLabel:      "How participants are assigned to a group",
    groupMethodCodeTitle:  "Enter a group code",
    groupMethodCodeDesc:   "Participants type in a code you give them (e.g. “ControlA”).",
    groupMethodListTitle:  "Select from a list",
    groupMethodListDesc:   "Participants pick their group from the list of groups you have created for this study.",
    groupMethodRandomTitle: "Automatic random assignment",
    groupMethodRandomDesc:  "Each new participant is automatically assigned to the group with the fewest active members, keeping all groups as equal in size as possible. When groups are tied, one is chosen at random. This implements the Pocock–Simon minimization method.",
    groupPromptLabel:      "Group prompt message",
    groupPromptCodePh:     "Please enter the group code assigned to you by the researcher.",
    groupPromptListPh:     "Please select the group you have been assigned to.",
    groupPromptRandomPh:   "You will be automatically assigned to a group.",
  },

  // ─── Participant portal ───────────────────────────────────────────────────────
  // @page    /participant/*
  // @context UI shown to study participants (not researchers). Tone: warm, simple,
  //          non-technical. Participants enroll via the mobile app or a study link;
  //          the website is for reviewing what they’ve already received and managing
  //          their account.
  participant: {
    nav: {
      home:     "Home",
      history:  "History",
      account:  "Account",
      signOut:  "Sign out",
      signIn:   "Sign in",
    },

    login: {
      title:            "Sign in to your account",
      subtitle:         "Participants — sign in to review your study activity.",
      emailLabel:       "Email",
      emailPlaceholder: "you@example.com",
      passwordLabel:    "Password",
      forgotPassword:   "Forgot?",
      submit:           "Sign in →",
      submitting:       "Signing in…",
      enrolHint:        "Don’t have an account? Participants are enrolled through the Samply mobile app or a study invitation link.",
      researcherLink:   "Researcher? Sign in here →",
      /** Shown on the researcher /login page as a cross-link */
      participantLink:  "Study participant? Sign in here →",
      errorInvalid:     "Invalid email or password.",
    },

    home: {
      eyebrow:           "your studies",
      title:             "Welcome back",
      /** {name} = participant display name */
      titleWithName:     "Welcome back, {name}",
      idLabel:           "Your participant ID",
      noStudiesTitle:    "You aren’t in any studies yet",
      noStudiesBody:     "Once you join a study through the Samply mobile app or a study invitation link, it will appear here.",
      browseStudies:     "Browse public studies →",
      studiesLabel:      "studies · {n}",
      viewHistory:       "View history →",
      manageAccount:     "Manage account →",
      statsReceived:     "Notifications received",
      statsTapped:       "Tapped",
      statsCompleted:    "Completed",
      /** Label preceding the researcher's contact (name + email) under each enrolled study */
      contactLabel:      "Contact:",
    },

    history: {
      eyebrow:        "your notifications",
      title:          "History",
      breadcrumb:     "← Home",
      empty:          "No notifications yet. When researchers send you a notification, it will show up here.",
      colWhen:        "When",
      colStudy:       "Study",
      colTitle:       "Notification",
      colStatus:      "Status",
      statusSent:     "sent",
      statusTapped:   "tapped",
      statusCompleted: "completed",
      statusArchived: "deleted",
      pagePrev:       "← Newer",
      pageNext:       "Older →",
      pageOf:         "Page {page} of {pages}",
    },

    account: {
      breadcrumb:    "← Home",
      deleteAccount: "Delete my account",
      deleteIntro:   "Permanently delete your account and all your response data. This action cannot be undone.",
    },

    // ─── Payable account (Stripe Connect for participants) ─────────────────────
    // @page /account (for participants only)
    // @context Lets participants connect a Stripe Express account so researchers
    //          can pay them for participating in studies. This is OPTIONAL — a
    //          participant only needs it if a study compensates them via Samply.
    payable: {
      title:              "Payable account",
      intro:              "Connect a payable account if you’d like to receive payment from researchers for participating in studies. Your account is hosted by Stripe.",
      createButton:       "Create payable account →",
      editButton:         "Update payable account →",
      confirmEmailFirst:  "Please confirm your email address before setting up a payable account.",
      statusCharges:      "Can accept charges",
      statusDetails:      "Onboarding details",
      statusPayouts:      "Payouts to your bank",
      enabled:            "Enabled",
      disabled:           "Not yet enabled",
      submitted:          "Submitted",
      notSubmitted:       "Not submitted",
      errorCreate:        "Could not start Stripe onboarding. Please try again.",
    },
  },

  legacyInvitations: {
    title:      "Invitations",
    studyLabel: "Study:",
    way1:       "Way 1. The web page of your study",
    webLink:    "The web page of your study",
    way2:       "Way 2. The direct link to your study in the mobile app",
    directLink: "Direct link to your study in the mobile app",
    customLink: "Custom link to your study in the mobile app",
    way3:       "Way 3. Ask participants to find your study in the mobile app",
    copyLink:   "Copy link",
  },

} as const;

export type Messages = typeof en;
export default en;
