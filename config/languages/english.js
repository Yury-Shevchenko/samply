module.exports = {
  layout: {
    not_supported: `Sorry, notifications on your device are not possible if you want to participate in a study. This may be because you are using an Apple device. In this case please use Android or another device.`,
    title: "Welcome to Samply",
    intro: `Scientists discover the nature of the human being  - You can help with this task!
      Instead of coming to a research laboratory, you can take part anywhere with your mobile phone.
      This is made possible by the „Experience sampling method“.
      You will receive notifications throughout the day with questions to answer. `,
    intro_2: `The content of the survey and the notification schedule vary from study to study.
        Read the study description for details.`,
    intro_3: `You are a researcher and you want to create a study? Please visit the <a href="/researcher/login")>page for researchers</a>.`,
    instructions_title: `Instructions for participants`,
    instructions_1: `Use your mobile phone to navigate to this website.`,
    instructions_1_note: `Important! Apple does not support the web push notifications yet.`,
    instructions_2: `Install the application on your phone by clicking on the button "Install App" in the menu above.`,
    instructions_2_note: `  If the button is not present, try reloading the page. Otherwise, go to the menu and choose the option "Add website to Home Screen".`,
    instructions_3: `After the installation of the application, you can close the browser and open the application.`,
    instructions_4: `Inside the application, proceed to the <a href="/studies">Studies page</a>, and follow the instructions there to subscribe for a particular study.`,
    were_invited: `If you were invited to participate in a study with a web-link, follow the link and read the instructions provided on the study page.	`,
    subscribe_notifications:
      'Please press the button "Subsribe" to subscribe to notifications from this study.',
    subscribe_to: "Join",
    install_title: `Before you enter the study, pless install the application on your mobile phone.`,
    install_instructions_2: `After the installation of the application, please click the button "Enter" below to join the study.`,
    study_info_title: `The study information`,
    messages_title: "Your messages",
    messages: "Messages",
    choose_participants: "Choose participants",
    fill_in_information: "Fill in the information for your notification",
    title_information: `Notifications with the same title will replace each other to avoid the users' screen being filled with a huge number of similar notifications.`,
    not_all_participants: "All participants",
    example_web_link: `
        If you need to record the participant Samply ID in your task or survey, use the placeholder %SAMPLY_ID% inside the URL.
        If you want to capture the participant code entered when joining your study, use the placeholder %PARTICIPANT_CODE%.
        Note that if a participant did not enter a code, %PARTICIPANT_CODE% will be replaced by the Samply ID.
        Then, inside of your online study you can extract the participant code or the Samply ID from the url address.
        Read more about <a target="_blank" href="https://en.wikipedia.org/wiki/Query_string")>query strings</a> and see all available placeholders <a target="_blank" href="/docs/notifications#placeholders">here</a>.
        The combination of query parameters would look like this, e.g. <span class="example-link">https://survey.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%</span>.
        `,
    choose_the_type: "Choose the type of notification",
    not_participant_id: "Participant ID",
    web_link: "Web link to your survey",
    groups: "Groups",
    notigications_log: "History",
    history_notifications: "History of notifications",
    history_for_participant: "for participant",
    history_notifications_Event: "Event",
    history_notifications_ID: "Participant ID",
    history_batch: "Batch",
    history_notifications_Time_user: "Time (user)",
    history_notifications_Time_server: "Time (server)",
    history_notifications_Title: "Title",
    history_notifications_Message: "Message",
    history_notifications_url: "Web link",
    history_notifications_Delete: "Delete",
    install_instruction:
      '1. Install the application on your phone by clicking on the green "Install App" button in the menu above. We recommend using Google Chrome as your browser. If you use a different browser, please switch to Google Chrome before installing the app.',
    check_green_button:
      'If it is not present, try reloading the page. Otherwise, go to the menu and choose the option "Add website to Home Screen".',
    to_participate: "To participate in the study",
    do_the_following: ", please do the following:",
    unsubscribe: "Unsubscribe",
    click_to_unsuscribe:
      "Click to unsubscribe from notifications from the study.",
    login_with_your_email: "or login with your email",
    login_to_your_account: "Login to your account",
    create_new_account: "Create new account",
    already_have_code: "If you already know your participant code, login ",
    here: "here.",
    do_not_have_an_account: `Don't have an account yet?`,
    create_researcher_account: "Create a researcher account",
    create_participant_account: `
        To create a <strong>participant</strong> account, please use the mobile app Samply Research
        in <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a> or <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank">App Store</a>.
      `,
    continue: "Continue",
    participate: "Participate",
    your_code: "Participant code:",
    your_study: "Study:",
    about: "About",
    forResearchers: "Researchers",
    forParticipants: "Participants",
    signup_button: "Create new account",
    login: "Login",
    participantLogin: "Participant Login",
    enterCode: "Enter with code",
    howitworks: "How it works",
    pricing: "Pricing",
    pricingPlans: "Pricing plans",
    freeSandbox: "Free plan",
    participantsPerProject: "Participants per study",
    project: "Study",
    pricingProjects: "Studies",
    onlyPublic: "Only public",
    pricingTests: "Tasks",
    professionalPlan: "Professional Plan",
    laboratoryPlan: "Laboratory Plan",
    privatePublic: "Private and Public",
    unlimited: "Unlimited",
    month: "month",
    from: "From",
    ifBilledAnnualy: "if billed annually",
    select: "Select",
    annual: "Annual",
    quarterly: "Quarterly",
    monthly: "Monthly",
    billedAsOnePayment: "Billed as one payment of ",
    worksParticipants_1: `Joining Samply as a participant gives you access to various studies created by researchers. There are many reasons why you might be interested in online studies: financial reward, interest in the topic or simply curiosity.`,
    worksParticipants_2: `The way in which participants are rewarded depends on a particular study.
        Researchers often promote their studies and offer monetary rewards such as payments or participation in lotteries.
        If you are a student at a university, you can earn credit points from a researcher at your university.
        You may also be interested in receiving feedback and learning more about yourself.`,
    worksParticipants_3: `Simple and convenient authorization`,
    worksParticipants_3_1: `Once registered, you do not need to register for each individual study.`,
    worksParticipants_3_2: `Different types of authorization: participation code, email address and password, Facebook, Google and Github.`,
    worksParticipants_4: `Compliance with data protection guidelines`,
    worksParticipants_4_1: `According to the law on personal data, you can see what kind of data is available to a researcher.`,
    worksParticipants_4_2: `You can also ask the researcher to delete your data if you wish.`,
    tasks: "Tasks",
    projects: "Studies",
    data: "Data",
    search_message: "Search tasks",
    choose_project: "Choose a study",
    profile: "Profile",
    logout: "Logout",
    allTasks: "All tasks",
    myTasks: "My tasks",
    addTask: "New task",
    chooseTasks: "Select tasks",
    customizeParameters: "Customize parameters",
    tryDemo: "Try demo",
    demoResults: "Demo results",
    results: "Results by tasks",
    myResults: "Results",
    participants: "Participants",
    invitations: "Invitations",
    upgradeNeededMessage:
      'Please <a href="/subscribe")>upgrade</a> your plan in order to add unlimited amount of studies.',
    subscriptionNeededMessage:
      'Please <a href="/subscribe")>subscribe</a> to a plan in order to add more studies.',
    account: "Profile",
    subscription: "Subscription",
    currentPlan: "Current Plan",
    upgradePlan: "Upgrade",
    mailInvitations: "Personalized email invitations",
    build: "Build",
    testing: "Demo",
    user_testing: "Start",
    researchers: "Research",
    users: "Run",
    tests: "Tasks",
    message_logged_in: "You are logged in",
    message_signup:
      "If it is your first time here, please sign up as a " +
      '<a href="/sign">participant</a>' +
      " or as a " +
      '<a href="/register">researcher.</a>',
    message_forgot_password: "Forgot the password?",
    email: "Email",
    password: "Password",
    password_confirm: "Confirm password",
    log_in: "Log in",
    auth_login: "Login with",
    auth_sign: "Sign up with",
    sign_intro: "Register",
    sign_name: "Name",
    sign_message:
      "Please sign up as a " +
      '<a href="/register">researcher</a>' +
      " if you want to conduct a study.",
    participant_auth: "participant",
    participant_id: "ID",
    register_title: "Register",
    message_code: "Enter with a participant code",
    participant_code: "Participant code",
    enter: "Enter",
    signup_or_login: "Please sign up or log in",
    flash_project_created: "Successfully created",
    flash_activate_project: "is now active",
    flash_project_updated: "The study is updated",
    flash_project_no_rights: "The study can not be deleted.",
    flash_cannot_delete:
      "The study could not be deleted. Check whether you typed the name of the study correctly.",
    flash_project_cannot_delete_because_results:
      "The study cannot be deleted since it has saved results. Please delete the results first to remove the study.",
    flash_project_deleted: "The study is deleted!",
    flash_program_open: "The study is active now.",
    flash_program_closed: "The study page is deactivated.",
    flash_give_name: "Give a name to the study",
    flash_logged_out: "You are now logged out!",
    flash_must_be_logged: "You must be logged in to do that!",
    flash_must_be_logged_add_test: "You must log in to add the task!",
    flash_must_be_admin: "You must be an administrator to do that!",
    flash_password_reset: "Password Reset",
    flash_no_account_with_email_exist: "No account with that email exists.",
    flash_email_recovery_link: "You have been emailed a password reset link.",
    flash_reset_invalid: "Password reset is invalid or has expired",
    flash_passwords_mismatch: "Passwords do not match!",
    flash_password_is_reset:
      "Your password has been reset! You are now logged in!",
    flash_no_param_found: "No parameters found",
    flash_param_update: "Successfully updated parameters.",
    flash_data_deleted: "The data are deleted!",
    flash_test_updated: "Successfully updated",
    flash_try_test: "Try the task ->",
    flash_page_not_exist_1: "You asked for page",
    flash_page_not_exist_2: "But it does not exist. So you are on page",
    flash_test_deleted: "The task is deleted!",
    flash_test_cannot_delete:
      "The task could not be deleted. Please check whether you typed the name of the task correctly.",
    flash_labjs_upload_success: "Successfully uploaded",
    flash_labjs_edit_message:
      "Please edit the information below and save the changes.",
    flash_labjs_upload_invalid: "Task upload is invalid or has expired",
    flash_labjs_finalize:
      'Please edit the information below and click "Save" to add the task.',
    flash_profile_updated: "Updated the profile!",
    flash_profile_error_update: "An error occurred while updating the profile.",
    flash_user_deleted: "The user is deleted!",
    flash_user_cannot_be_deleted:
      "The user has saved results! Delete the results first if you want to remove the user.",
    flash_invited: "Successfully invited",
    forgot_title: "Reset the password",
    forgot_send_button: "Send a reset",
    flash_invitation_overlimit:
      "Unfortunately, the limit of 100 participants is reached.",
    flash_invitation: "Invitation to the study",
    flash_no_results: "No results in this study",
    flash_subscriptionError: "There was an error",
    flash_subscriptionSuccess: "You successfully subscribed",
    flash_subscriptionStop: "You successfully stop the subscription",
    flash_subscriptionReactivation:
      "You successfully reactivated the subscription",
    flash_no_experiment_file: "There is no experiment file.",
    flash_request_recorded: "The request status is changed",
    flash_not_authorized: "You are not authorized to perform this operation",
    flash_language_changed: "Language is changed",
    flash_test_request_sent: "Your request is sent",
    flash_question_sent: "Your question has been sent",
    flash_limit_of_participants_reached_1:
      "The limit of participants in the project ",
    flash_limit_of_participants_reached_2:
      'is reached. Please <a target="_blank" href="/subscribe">upgrade</a> your subscription.',
    "Negative valence": "Negative valence",
    "Positive valence": "Positive valence",
    "Cognitive systems": "Cognitive systems",
    "Social processes": "Social processes",
    "Arousal and Regulatory systems": "Arousal and Regulatory systems",
    please_register: "Please register as a ",
    researcher: "researcher",
    or: " or as a ",
    participant: "participant",
    to_try_test: " to try the task",
    description: "Description",
    studies: "Studies",
    test_card_privacy_message:
      "The task is available only to you and your participants",
    pagination_prev: "Prev",
    pagination_next: "Next",
    pagination_page_1: "Page ",
    pagination_page_2: " of ",
    pagination_page_3: " total results",
    lab_js_loading_title: "Loading the experiment",
    lab_js_loading_1:
      "The experiment is loading and should start in a few seconds.",
    lab_js_loading_2: "",
    help: "Help",
    change_project: "Change the study",
    change_project_confirm: "Confirm",
    notifications: "Notifications",
    install_app: "Install App",
    message_history_create_project:
      'Create or activate a <a href="/projects">study</a> to see the history of notifications.',
    signup: "Sign up",
    signup_as_researcher: "Sign up as a researcher",
    footer_docs: `<a href="/docs/intro">Documentation</a>`,
    footer_contacts: `<a href="/docs/help">Contacts</a>`,
    footer_terms: `<a href="/docs/terms">Terms of Service</a>`,
    footer_policy: `<a href="/docs/policy">Privacy Policy</a>`,
    footer_notice: `<a href="/docs/legalnotice">Legal notice</a>`,
    use_uni_email: "Please use your university email address.",
    agree_to_conditions: `I agree to the Samply <a target="_blank" href="/docs/terms">Terms of Service</a> and <a target="_blank" href="/docs/policy">Privacy Policy</a>`,
    flash_sent_confirm_email_ink: `
        We have sent an email with a confirmation link to your email address.
      `,
    flash_confirm_email_invalid:
      "Email confirmation link is invalid or has expired",
    flash_email_confrimed: "Your email address has been confirmed!"
  },

  passport: {
    passwords_mismatch: "The passwords do not match!",
    email_already_taken: "That email is already taken.",
    no_user_found: "No user found",
    wrong_password: "Oops! Wrong password.",
    registered_user: "You are registered as a new user!",
    logged_in: "You are logged in!",
    wrong_credentials: "Oops! Wrong credentials.",
    welcome_back: "Welcome back!",
    flash_confirm_email:
      "We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link."
  },

  account: {
    title: "Edit your account",
    registered: "Registered",
    name: "Name",
    email: "Email",
    language: "Language",
    submit: "Update my account",
    institute: "Institute",
    choose_project: "Choose a study to participate",
    participate_in_studies: "You participate in the following studies",
    no_studies: `
        You are not currently participating in any study. Select the study from the <a href="/studies">list</a> of studies.
      `,
    emailIsConfirmed: "Email is confirmed",
    emailIsNotConfirmed: "Email is not confirmed",
    sendLink: "Send confirmation link",
    payableAccountTitle: "Payable account",
    payableAccountCharges: "Account",
    payableEnabled: "Enabled",
    payableDisabled: "Disabled",
    payableAccountDetails: "Details",
    payableSubmitted: "Submitted",
    payableNotSubmitted: "Not submitted",
    payableAccountPayouts: "Payouts",
    payableCreateAccount: `
      You can create a payable account in order to receive payments for participating in studies.
      Payments and invoicing are managed by our partner Stripe.
    `,
    payableConfirmEmail:
      "First confirm your email address to register a payable account",
    payableEdit: "Edit payable account",
    payableCreate: "Create payable account"
  },

  index: {
    welcome_text: `
        Samply supports experience sampling, ambulatory assessment and diary studies.
        We want to make sending notifications to participants an easy and comfortable task for researchers.
        The main idea is that you as a researcher is free to use any tool to create an online survey or an experiment.
        Samply sends mobile notifications through the Samply mobile application, so when participants of your study click
        on the notification, they open your online study in a mobile web-browser.
      `,
    test_drive: `
        Are you a researcher and want to use Samply in your studies? Here is an <a href="/docs/intro">overview</a> of how Samply works,
        <a target='_blank' href="https://link.springer.com/article/10.3758/s13428-020-01527-9">our publication in Behavior Research Methods</a>,
        and step-by-step tutorial in
        <a target='_blank' href="https://docs.google.com/document/d/1qPX8uqrSnLONZQjy63r9v9cU6PUpFJ7IBCEqWPKxW4Q/edit?usp=sharing">English</a>
        or
        <a target='_blank' href="https://docs.google.com/document/d/1eT9u0durl25zx6yaMXTcdLOffVhUJx3AJ3kWRjMIs_U/edit?usp=sharing">German</a>.
      `,
    features_header: `Main features`,
    feature_1: `Samply is free, there is no hidden costs (thanks to the generous support of the iScience group)`,
    feature_2: `Native mobile application for participants available in <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a> or <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank">App Store</a>.`,
    feature_3: `Different types of notifications schedule (one-time, repeat, user-dependent, randomized).`,
    feature_4: `Customization of messages and URL links that you send to participants.`,
    feature_5: `Recording participants' responses to your notifications.`,
    tutorial_header: "Tutorial",
    tutorial_english: `
      <a target='_blank' href="https://docs.google.com/document/d/1qPX8uqrSnLONZQjy63r9v9cU6PUpFJ7IBCEqWPKxW4Q/edit?usp=sharing">Tutorial in English</a>
    `,
    tutorial_german: `
      <a target='_blank' href="https://docs.google.com/document/d/1eT9u0durl25zx6yaMXTcdLOffVhUJx3AJ3kWRjMIs_U/edit?usp=sharing">Tutorial in German</a>
    `,
    about_header: "About us",
    about_text: `
        Samply is developed by Yury Shevchenko and conceptualized by him and Ulf-Dietrich Reips,
        with the help of many great collaborators. Yury is a postdoc in the
        <a target='_blank' href="https://iscience.uni-konstanz.de/">iScience group </a>
        at the University of Konstanz in Germany.
      `,
    contributors_header: "Contributors",
    contributors_usability: "User experience /  Usability testing",
    contributors_tutorial: "Tutorial / German translation",
    contact_header: `Contact / find support / contribute`,
    contact_email: `Contact us by <a href="mailto:yury.shevchenko@uni.kn">email</a>`,
    contact_slack: `Join our <a target='_blank' href="https://join.slack.com/t/samply-workspace/shared_invite/zt-e085hyyv-pFczGQFnVCA2w8lkcTmk6w">Slack group</a>`,
    contact_github: `Wish to contribute? Welcome to our <a target='_blank' href="https://github.com/Yury-Shevchenko/samply">Github</a>.`,
    for_participants: `If you are a participant, you are probably looking for a mobile application Samply Research.
      You can find in <a target='_blank' href="https://apps.apple.com/app/samply-research/id1511062019">App Store</a> or <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a>.`,
    intro2:
      "With Samply you can create and plan notifications for participants of your studies. " +
      "You can edit content of notifications and send links to your survey or online tests. " +
      "As a participant, you have to use an Android mobile phone to receive notifications. ",
    forResearchers: "For researchers",
    forParticipants: "For participants",
    res_1: "Notifications management system",
    res_1_text: "Schedule and manage notifications",
    res_2: "Data security",
    res_2_text: "HTTPS, user authentication system, personal invitations.",
    res_3: "Collaboration with colleagues",
    res_3_text: "Share access to studies",
    part_1: "Participation in online-studies",
    part_1_text:
      "For many reasons: financial reward, interest in the topic or just curiosity.",
    part_2: "Easy and convenient authorization",
    part_2_text:
      "Sign up with a participant code, email or social network account",
    part_3: "Notifications",
    part_3_text: "Receive notifications using your mobile phone",
    cite_us_header: "Citation",
    citation: `Shevchenko, Y., Kuhlmann, T., & Reips, U. D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. Behavior Research Methods, 1-21.`,
    citation_read: `<a target='_blank' href="https://link.springer.com/article/10.3758/s13428-020-01527-9">Read online 👀</a>`
  },

  projects: {
    title_proejcts: "Your studies",
    title_invited: "You are invited to studies",
    title_new: "New study",
    title_edit: "Edit ",
    name: "Name",
    active_header: "Active",
    active_description: "The program is open for participation",
    development_header: "In developement",
    development_description: "The program is hidden from participants",
    invite_members:
      "Enter your colleagues' email addresses to give them access to the study. They should be registered on Samply to get the access.",
    add_field: "Add a field",
    submit: "Save",
    counter_task: "task",
    counter_tasks: "tasks",
    counter_member: "invited colleague",
    counter_members: "invited colleagues",
    counter_participant: "participant",
    counter_participants: "participants",
    deleteProject: "Delete study",
    numberMembers: "Research members: ",
    numberTests: "Tasks: ",
    numberResults: "Results: ",
    numberParticipants: "Active participants: ",
    confirmMessage_1: "Please type the name of the study ",
    confirmMessage_2: " to confirm that you want to delete the study. ",
    confirmMessage_3: "All results of this study will be deleted.",
    confirmMessage_4: " This action is not reversable.",
    delete: "Delete",
    description:
      "Description (please tell what is your study is about, how long and how often you plan to send notifications)",
    showCompletionCode:
      "Display the unique completion code at the end of all tasks",
    welcomeMessage:
      'The text for the consent form in the mobile application. This is displayed when the participants click on "Join the study". You can provide the consent form here. ',
    askNotifications:
      "Ask users to allow notifications (we are currently testing notifications, participants should use Chrome on a desktop computer).",
    askUsername: `Ask participants to enter an <b>individual participant code</b> in the mobile application when joining your study`,
    askGroup: `Ask participants to enter a <b>group code</b> in the mobile application when joining your study`,
    imageURL: `
      Image to display next to your study on the website and in the mobile application
    `,
    codeMessage:
      "Please write the instructions for the participant on what to enter as an individual participant code.",
    groupMessage:
      "Please write the instructions for the participant on what to enter as a group code.",
    messageAfterJoin:
      "The text that will be displayed to participants after they have joined the study.",
    permanentLink: `
      The permanent link for your study that can be used for event-contingent designs where participants are asked to initiate a report after a specific event occurs.
      The link is displayed to participants in the mobile app after they join your study.
      You can include the participant's Samply ID, participant code (entered when they joined the study), group ID, and timestamp in the link.
      To do this, use the <a target="_blank" href="/docs/notifications#placeholders">placeholders</a> %SAMPLY_ID%, %PARTICIPANT_CODE%, %GROUP_ID%,
      and %TIMESTAMP% within the URL as part of the <a target="_blank" href="https://en.wikipedia.org/wiki/Query_string")>query strings</a>,
      for example <span class="example-link ">https://survey.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP%</span>.
    `,
    feelingLucky: `
      I'm feeling lucky; I’ll choose a random picture.
    `,
    approval_technical_note: ``,
    approvalFormTitle: "Approval form",
    sendRequestBtn: "Submit approval request",
    approvalInfo_1: `
          Public studies are displayed in the list of studies in the mobile application <strong>Samply Research</strong> for participants.
          Your study does not have to be public to run a study.
          You can use QR codes (see <a target="_blank" href="/invitations">way 1</a>) to invite participants to your study.
          This way, you stay in control of who participates in your study.
          `,
    approvalInfo_2: `
          If you want to make your study public and visible to every user of the mobile app, please apply send us an approval request by pressing the button below.
          Note that only studies with complete instructions, consent forms, information about researchers, and a confirmed researcher email address are permitted.
          If you want to test your study, please use the option with the direct invitation via QR code (<a target="_blank" href="/invitations">way 1</a>) instead.
          `,
    requestedInfo_1: `
          Your request for approval has been submitted. If you don't hear from us for a while, don't hesitate to contact us
          using <a target="_blank" href="/docs/help">Slack forum</a>,
          a <a target="_blank" href="/docs/faq">contact form</a>, or
          an <a href="mailto:yury.shevchenko@uni.kn?subject=Samply approval request">email</a>.
          `,
    approvedInfo_1: `
          Your study is now public, which means that it is displayed in the public list of studies in the <strong>Samply Research</strong> mobile application.
        `,
    approvedInfo_2: `
          If you want to remove the study from the public list, press the button below.
          Note that this action cannot be undone. If you want to to make your study public again later, you would need to reapply for approval.
        `,
    removeFromPublicBtn:
      "Remove the study from the public list in the mobile application",
    projectActive: "Active",
    projectPublic: "Public",
    enableGeofencingToggle:
      "Enable Geofencing (geofencing allows you to notify and send surveys to your participants when they enter or leave specific areas, e.g. home, supermarket, workplace)",
    geoTitle: "Geofencing",
    geoExplained:
      "Geofencing requires a constant tracking of geolocation. This tracking happens on the participant device, so neither Samply nor you will have the information about the absolute geolocation of participants. However, it is important that participants understand how you will use the information, such as when they enter or leave geofenced areas. Please provide the information about the geofencing to the participant. This instruction will be shown when the participant has joined your study.",
    geoUserDefinedTitle: "User-defined locations",
    geoUserDefinedTitleExplained:
      "If you ask participants to provide their own locations, specify the URL link of the survey/task and the radius (in meters) for a location. Leave the URL field blank if you do not use an external online task/survey. In this case, participants will be only notified when they enter or exit the geofenced area.",
    geoTriggerEnter: "Trigger on enter",
    geoTriggerExit: "Trigger on exit",
    geoTriggerHide: "Hide notifications but record the events",
    geoUserDefinedLinkPlaceholder:
      "Enter the link to your online survey (the link will be sent with the notification)",
    geoUserDefinedRadiusPlaceholder: "Enter the radius (in meters)",
    geoResearcherDefinedTitle: "Researcher-defined locations",
    geoMapTitle: "Map of geofenced locations",
    geoDelete: "Delete",
    geoResearcherDefinedExplained: `
      Enter the information about locations that should apply to all participants.
      Start adding new locations, and they will be shown on the map after you click "Save".
      Then you can edit the locations by dragging markers on the map.
    `,
    geoAddLocation: "Add location",
    geoPlaceholderTitle: "title",
    geoPlaceholderLatitude: "latitude",
    geoPlaceholderLongitude: "longitude",
    geoPlaceholderRadius: "radius (in meters)",
    geoPlaceholderLink: "url link",
    geoAlertEnterLocationName: "Enter the location name",
    geoPlaceholderEnterTitle: "Enter title",
    geoPlaceholderEnterLatitude: "Enter latitude",
    geoPlaceholderEnterLongitude: "Enter longitude",
    geoPlaceholderEnterRadius: "Enter radius (in meters)",
    geoPlaceholderEnterLink: "Enter the URL link to your online task or survey",
    geoNotifyEnter: "Notify on enter",
    geoNotifyExit: "Notify on exit",
    geoNotifyHide:
      "Invisible mode (do not show notifications but record the events)"
  },

  testing: {
    title: "Demo Program",
    message_next: "Click here to start the next task",
    message_welcome: "Welcome to the tasks",
    message_done: "You have done all tasks.",
    message_enter: "Enter",
    message_choose_project: "Choose a study to participate",
    message_create_project:
      'Create or activate a <a href="/projects")>study</a> to see the demo.',
    message_participant_id: "Participant ID",
    table_test: "Task",
    table_description: "Description",
    table_status: "Status",
    table_done: "Completed",
    table_not_done: "Not done yet",
    your_code: "This code confirms the completion of your tasks: ",
    way_1_header: `Way 1. The direct link to the study`,
    way_2_header: `Way 2. Find the study in the app`,
    mobile_invite_1: `
          There are two ways for you join the study.
          In both cases, you must first install the mobile application <em>Samply Research</em> on your mobile phone.
          For Android users, the application is available in <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a>.
          For Apple users, the application is in <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank">App Store</a>.
        `,
    mobile_invite_2: `
          After the application is installed, either use the direct link to the study or find the study in the list of studies inside the application.
        `,
    direct_link: `
          Direct link to the study
        `,
    direct_link_1: `
          To use this link, you should already have the “Samply Research” app installed on your mobile phone.
          Furthermore, you should open this link in your mobile phone.
          When you open the app for the first time, you must allow notifications from the app.
          The question about the notifications should appear automatically on the screen.
          Then, you will need to create a new account.
          The login information is stored securely on the Samply server (which is the server of the University of Konstanz in Germany)
          and is only used to authenticate users.
        `,
    direct_link_2: `
          After creating an account, you should be automatically redirected to the page of the study within the application.
          The study description is displayed on the study page.
          When you click on the "Join the study" button, you will see the text of the consent form.
          When you tap the "Yes, I agree" button, you will join the study and allow the study to send you notifications.
          Now, the application can be closed.
        `,
    direct_link_3: `
          Note that the direct link will work even if the study is not publicly available in the list of studies.
        `,
    finding_study: `If for some reason you cannot use the direct link, you can find the study in the list of public studies within the app.
          After logging in, you must switch to the "Studies" tab within the app.
          There you can use the search field to find the study.
          You can use the exact name of the study to search for it.
          In the list of studies, the name, the author and the creation date of the study are displayed.
          When you tap on the study in the list of studies, you will be taken to the study page.
          `,
    copy_link: "Copy link",
    name: "Name",
    description: "Description",
    welcome: "Welcome message",
    instructions: "Instructions for participants",
    sign_out: `
          To unsubscribe from the study, please use the mobile application Samply Research.
          Go to the study page within the application and click on the button "Leave the study".
        `
  },

  users: {
    title: "Participants",
    invite: "Invite more participants with the following links:",
    signing_code: "Signing up with a participant code ",
    signing_email: "Signing up with an email ",
    message_create_project:
      'To see the list of participants, activate or create a study <a href="/projects")>here</a>.',
    table_number: "",
    table_samplyId: "Samply ID",
    table_name: "Name",
    table_date: "Entry Date",
    table_token: "Notification token",
    table_code: "Participant Code",
    table_group: "Group",
    table_time_preferences: "Time preferences",
    table_timezone: "Timezone",
    table_payout: "Payout",
    table_aggregated: "Summary",
    table_language: "Language",
    table_tests: "Tasks",
    table_data: "Data",
    table_metadata: "Meta",
    table_delete_user: "Delete user",
    table_download: "Get",
    table_open: "Open",
    pagination_prev: "Prev",
    pagination_next: "Next",
    pagination_page_1: "Page ",
    pagination_page_2: " of ",
    pagination_page_3: " total results",
    download_all_data: "Download all data",
    message_invitation: `Invite new participants to the current study.
          Write each email address on a separate line.
          The unique participation code will be generated and sent to each participant.`,
    message_invited_participants: "Invited participants",
    button_invite: "Invite",
    message_no_user: "There is no data yet",
    title_one_user: "Data of the user ",
    table_one_task: "Task",
    table_one_type: "Type",
    table_one_size: "File size",
    table_one_data: "Data",
    table_one_download: "Get",
    table_one_delete: "Delete",
    table_access: "Access",
    table_one_incremental: "Incremental",
    table_one_full: "Full",
    table_role: "Role",
    table_participant: "P",
    table_researcher: "R",
    table_delete_request: "Request",
    table_delete_my_data: "Delete my data",
    table_see_my_data: "Access my data",
    table_keep_my_data: "",
    table_delete_requests: "Requests",
    download_all_meta_data: "Download all metadata",
    table_confirmation_code: "Confirmation code",
    table_history: "Log",
    table_new_notification: "New notification",
    table_open: "Open",
    table_schedule: "Schedule"
  },

  researcher: {
    header_steps: "Steps",
    step_1: `Use existing templates or create your own study with <a target="blank" href="https://labjs.felixhenninger.com/">lab.js experiment builder</a>`,
    step_2: `Import the experiment file into Samply`,
    step_3: `Send the invitation link to participants and monitor their progress in real time`,
    step_4: `Please check the <a href='../docs/intro'>documentation</a> for more information or join our <a target='blank' href='https://join.slack.com/t/samply-workspace/shared_invite/zt-e085hyyv-pFczGQFnVCA2w8lkcTmk6w'>Slack chat</a> to ask questions and get help.`,
    header_features: `Special features`,
    feature_1: `You do not need to set up your own server to run a study.`,
    feature_2: `Samply can host any type of scripts created in <a target="_blank" href="https://labjs.felixhenninger.com/">lab.js</a>.`,
    feature_3: `Your study can enroll more participants from the community of Samply users.`,
    feature_4: `You can share your experiments with colleagues.`,
    feature_5: `HTTPS data transfer protocol ensures that data is encrypted during transmission.`,
    feature_6: `The user authentication system allows you to create complex studies in which people take part in experiments separated in time.`,
    feature_7: `Samply provides a system of data management including saving of data during an experiment.`,
    header_advantages: "Advantages",
    advantage_1: `More and more studies in social sciences are being implemented online.
            However, there are barriers to the use of the Internet.
            First, technical difficulties in conducting an online-experiment.
            Even if a simple questionnaire is not a problem, an experimental paradigm is already a burden for researchers who want to collect data online.`,
    advantage_2: `Second, although the replicability crisis has triggered a number of important innovations such as study pre-registration, open access to data and analysis methods, the methods of data collection are often concealed under general specifications in the method section.
            Especially in online experiments, where the software is directly accessible to a participant, the code and parameters of the user-computer interaction are rarely documented and opened for other researchers.`,
    advantage_3: `Thirdly, data security is difficult for a researcher who is just beginning to program his or her own study.
            Not every available service supports secure data transmission from a participant to the server.
            Also, the personal information (e.g., email address) is often stored together with the results of the experiment.`,
    advantage_4: `To overcome these limitations, Samply offers a researcher a way to conduct an online-study without technical difficulties.
            It frees time to focus on more important methodological and data analysis work.
            The experiments are automatically documented and stored so that cooperation with colleagues and meta-analyses of previous studies are possible.
            The HTTPS protocol ensures that participants' data is encrypted during transmission.
            User access to experiments can be protected by various authentication strategies such as participant codes, e-mails, passwords or accounts on social networks.`
  },

  invitations: {
    way_0_header: `Way 1. The web page of your study`,
    way_1_header: `Way 2. The direct link to your study in the mobile app`,
    way_2_header: `Way 3. Ask participants to find your study in the mobile app`,
    mobile_invite_1: `
            There are three ways to invite participants to your study.
            In all cases, participants must first install the mobile application <em>Samply Research</em> on their smartphone.
            For Android users, the application is available in <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a>.
            For Apple users, the application is in <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank">App Store</a>.
            You can provide participants with these links to the Google Play or App Store or ask them to search for the <em>Samply Research</em> app in the respective stores.
          `,
    mobile_invite_2: `
            After the application is installed, either provide a participant with 1) a web page link, 2) a direct link to your study in the mobile app or 3) instructions how to find your study in the list of studies in the mobile app (if your study is public).
          `,
    web_link: "The web page of your study",
    activate_study_1: `
            Please first activate your study
          `,
    activate_study_2: `
             by turning on the toggle switch on the study card <a href='../projects'>here</a>.
          `,
    web_link_1: `
            The web page of your study contains the description of your study, the information about the authors and the instructions how participants can take part in the study.
            A unique QR code is used to find a study in the mobile app.
            Your study does not have to be public for the QR code to work.
          `,
    direct_link: `
            Direct link to your study in the mobile app
          `,
    direct_link_1: `
            To use this link, participants should already have the “Samply Research” app installed on their mobile phone.
            Furthermore, they should open this link in their mobile phone.
            When participants open the app for the first time, they must allow notifications from the app.
            The question about the notifications should appear automatically on the screen.
            Participants will also need to create a new account.
            The login information is stored securely on the Samply server (which is the server of the University of Konstanz in Germany)
            and is only used to authenticate users.
          `,
    direct_link_2: `
            After creating an account, participants are automatically redirected to the page of your study within the application.
            The study description is displayed on the study page.
            When participants click on the "Join the study" button, they see the text that you entered for the consent form.
            When participants tap the "Yes, I agree" button, they join your study and allow you to send them notifications.
            Now, the application can be closed.
          `,
    direct_link_3: `
            Note that the direct link will work even if your study is not publicly available in the list of studies.
          `,
    custom_link: `
            Custom link to your study in the mobile app
          `,
    custom_link_1: `
            You can also pass additional variables via the link using the query.
            For example, if you want to create individual links, you can modify the link in the following way.
            The value of the variable <var>code</var>, which you provide inside the link (in this case, it is <kbd>123</kbd>), will be recorded and shown in your participants data.
          `,
    finding_study: `
            If your study is public, participants can find it in the list of public studies within the app.
            To apply for approval of your study for the public list, please submit a request <a target='blank' href='../projects'>here</a>.
            After logging in, participants must switch to the "Studies" tab within the app.
            There they can use the search field to find your study.
            In the list of studies the name, the author and the creation date of the study are displayed.
            Please give your participants the exact name of your study so that they can find it in the app.
            When the participants tap on your study in the list of studies, they will be taken to the study page.
          `,
    message_create_project: `To invite new participants to your study, activate or create a study <a href="/projects">here</a>.`,
    copy_link: "Copy link"
  },

  docs: {
    intro_title: "Introduction",
    introduction_title: "Introduction",
    introduction_1:
      "Welcome to Samply, a platform for scheduling and sending notifications! ",
    introduction_2: `We are glad to have you here. This documentation is written for researchers, so please first <a target='blank' href="/researcher/register">register</a> or <a target='blank' href="/researcher/login">login</a> as a researcher. `,
    introduction_3:
      "The registration is simple and requires a university email address and a password. ",
    howitworks_title: "How does it work?",
    introduction_4:
      "Samply is a web-site for researchers and a mobile application Samply Research for participants. After you create a notification schedule for your study on this website, the mobile application will notify your participants. The participants will follow the link on their mobile phones and participate in your online study.",
    navigation_title: "Navigation",
    navigation_1:
      "The documentation contains the information about the following main steps.",
    navigation_1_1: `<a href='../docs/project'>Studies</a> Create and manage your studies`,
    navigation_1_2: `<a href='../docs/notifications'>Notifications</a> Create a notification schedule`,
    navigation_1_3: `<a href='../docs/invitations'>Invitations</a> Invite participants`,
    navigation_1_4: `<a href='../docs/data'>Data</a> Review the history of sent notifications`,
    navigation_2:
      "In the Search tasks field, you can enter the name of the task you want to search for.",
    navigation_3:
      "If you have more than one study, you can switch between them by using the “Choose a study” drop-down menu in the top navigation bar.",
    navigation_4:
      "Under “Profile”, you can edit your name, research institute and language. English and German are supported at the moment.",
    project_title: "Manage your study",
    project_projects_title: `<a target='blank' href='../projects'>Studies</a> `,
    project_projects_1: `The samply is organized according to studies.
            After registering as a researcher, the first page you see suggests the creation of a new study.
            You can give it a name, provide the description and write a welcome text for the participants.
            This information is displayed to the participants in the mobile application <em>Samply Research</em>.
            You can specify the URL of the image file - this image is also displayed in the mobile application next to your study.
            If you already know someone in Samply with whom you want to share the study, you can enter their email address
            (or leave the field blank and do it later).
            Sharing a study allows you to collaborate on the project, share access to the notification schedule and history of sent notifications.
            `,
    project_projects_2: `After adding a study, you will see the card of the new study,
            which shows the name and status of the study along with two buttons (to edit and delete the study).
            The toggle switch at the bottom of the card is grey – this means that your study is currently not
            publicly available in the mobile application <em>Samply Research</em>.
            When you are ready to launch your study, toggle the button to activate it.`,
    project_projects_3:
      "If you have invited your colleagues to share access to the study, the number of your colleagues will be indicated on the study card.",
    project_tasks_title: `<a target='blank' href='../constructor'>Choose tasks</a> `,
    project_tasks_1: `The next step after creating a new study is to add tasks. You can select tasks from the list of available tasks and add them to the list on the right by clicking on the green plus button. The order on the list corresponds to the order in which your participants will see the tasks. This allows a study to include more than one task.`,
    project_parameters_title: `<a target='blank' href='../tasks'>Customize parameters</a>  `,
    project_parameters_1: `Using parameters enables customization of your study without having to change and upload the json file again. If a study has parameters, you can first see them listed next to the task. Second, you can change and save them one the “Customized” tab. After saving, the task will run with your new parameters.`,
    project_parameters_2: `To create parameters in your experiment script, place all your individual screens into one general sequence in the lab.js builder. For the main sequence screen, add parameters on the special page. Now, in your script in lab.js, you can use the name <a target='blank' href='https://labjs.readthedocs.io/en/latest/reference/core.html#options.parameters'>this.parameters.parameter_name</a> to refer to parameters. When the json script is uploaded to Samply, the parameters are extracted and listed on the “Parameters” tab.`,
    project_demo_title: `<a target='blank' href='../testing'>Try demo</a>  `,
    project_demo_1: `You can already start each task individually, but this demo page will show you what the whole experiment will look like for participants. A participant will see the name of the test, its description and the status (completed or not yet completed). The tasks on the list appear in the order you specified in the study. Once a task is completed, a participant cannot repeat it.`,
    project_demoResults_title: `<a target='blank' href='../results'>Demo results</a>  `,
    project_demoResults_1: `To give you an idea what the raw data looks like, you can view and download your own demo results here. The data is stored as a CSV-file with comma-separated values. The data during the experiment is saved in two formats: “incremental” – a new part of the data is logged each time there is a sufficient time window during the experiment (e.g., when a participant reads the instruction of a new experimental block), and “full” – the data is transferred at the end of the experiment. So if a participant interrupts the task, only the incremental data up to the last snapshot will be saved. The results of the demo also show you how many records (rows) are stored in the data file.`,
    data_invitations_title: `<a target='blank' href='../invitations'>Invitations</a> `,
    invitation_title: `Invitations`,
    invitations_1: `
            When users start an app, they will have to allow notifications from the app.
            The question about notifications should pop up automatically on the screen.
            Participants will also need to create a new account.
            The login information will be stored securely on the Samply server (which is the server of the University of Konstanz in Germany) and used only for authentication of users.`,
    invitations_2: `
            After logging in, participant have to proceed to the tab "Studies" inside the application.
            There, they can use the search field to find your study.
            The name, author and the date of study creation are displayed in the list of studies.
            Please provide your participants with the exact name of your study, so they can find it in the app.
            If participants tap on your study in the list of studies, they will proceed to the study page. On the study page, the description and welcoming text will be shown. By clicking on the button "Join the study", participants will allow receving notifications from you. Now, the participants can close the application.`,
    invitations_3: `You as a researcher will not have access to email addresses of participants.
            If you wish to have participants' email addresses, you are free to collect them together with other information via your online studies.
            Instead, Samply will share with you a unique id of each participant (in the form xxxx-xxxx-xxxx-xxxx), which you can include as a query parameter in the link of your study.
            More information about that is in "Notifications".
          `,
    help_title: "Help",
    help_1: `Please, join the <a target='blank' href='https://join.slack.com/t/samply-workspace/shared_invite/zt-e085hyyv-pFczGQFnVCA2w8lkcTmk6w'>Slack chat</a> to ask questions and get help. `,
    forum: "Forum",
    faq_title: "FAQ",
    question_1: "2+2?",
    answer_1: "4",
    ask_question_header: "Do you have a question?",
    type_in_your_question: "Ask it here",
    send_question_btn: "Send",
    notifications_title: "Notifications",
    notifications_1: `
            Setting up the notifications plan requires defining the notification content (a title, message, and study URL) and deciding on the schedule.
            It is recommended to keep the title and message shorter than 30 characters each (including spaces) to make them compatible with all potential devices and screen sizes.
            The title can contain the study’s name (e.g., “Study of life quality”) or the name of its current phase (“Life quality study – Day 1”).
            The message can include an instruction or what is expected from the participant, e.g., “Please complete a 1-minute survey”.
            Another strategy is placing a survey question in the notification title or message.
          `,
    notifications_2: `
            The URL link may contain the participant’s ID: the placeholder “%PARTICIPANT_CODE%” inside the weblink will be replaced with each user’s Samply ID (e.g., https://examplesurvey.com/?id=%PARTICIPANT_CODE%).
            This can be used to track survey participation if the URL query parameters are captured and saved in the survey. See the list of possible query placeholders below.
          `,
    notifications_3: `
            If the user interface is followed step-by-step, the following choices have to be made in order to define the notifications schedule.
          `,
    notifications_3_1: `
            Choose time zone
          `,
    notifications_3_2: `
            You can select the specific time zone for notifications or adjust the time to the participant's time zone.
            Adjusting the time to the participant's time zone works for future and current participants with a specified time zone.
            Adjusting the time zone does not work for group notifications because group notifications are sent to
            all group members at the same time, so you must explicitly select the time zone for these notifications.
          `,
    notifications_4_1: `
            Choose participants
          `,
    notifications_4_2: `
            Notifications can be sent either to all current and future participants or to a particular participant chosen from the menu under “Current participants”.
          `,
    notifications_5_1: `
            Choose time(s)
          `,
    notifications_5_2: `
            A specific time point or time points can be selected by entering the hour and minute in the input field.
            Alternatively, a time window can be defined (e.g., from 9 a.m. to 6 p.m.), during which a time point or time points can be randomly drawn.
            If numerous participants are selected, notification times will be randomized for each one.
          `,
    notifications_6_1: `
            Choose date(s)
          `,
    notifications_6_2: `
            A specific date can be selected in the format of day, month, and year. Alternatively, if a notification need to be repeated, other options can be chosen.  Notifications can be sent every day or at a range of intervals (every 2nd, 3rd, 4th, etc. day). Alternatively, the day(s) of the week or day(s) of the month can be selected.
          `,
    notifications_7_1: `
            Choose month(s)
          `,
    notifications_7_2: `
            Any specific month(s) can be chosen for notifications.
          `,
    notifications_8_1: `
            Choose when to start
          `,
    notifications_8_2: `
            Notifications can begin to be sent at specific time points defined by the time and date. Alternatively, a time point can be picked relative to the current moment or the moment of participant registration. In the latter case, the starting point will be different for each participant and will be determined by the time when a participant joins the study for the first time via the mobile app.
          `,
    notifications_9_1: `
            Choose when to stop
          `,
    notifications_9_2: `
            The options here are similar to choosing when to start notifications. Different combinations of starting and stopping points can be created, e.g., notifications can start from the moment each participant registers but stop at one specific time point, which will be the same for everybody.
          `,
    notifications_10: `
            When a notification has been added, it appears in the list of scheduled notifications, which can be controlled and cancelled at any time by clicking either the delete icon in the table or the “Delete all notifications” button.
          `,
    queryTitle: "Query placeholders",
    queryPlaceholder: "Placeholder",
    queryName: "Name",
    queryInformation: "Information",
    queryMessage: "Message ID",
    querySamplyID: "Samply ID",
    queryCode: "Participant code",
    queryGroupID: "Group ID",
    queryTime: "Timestamp",
    queryBatch: "Batch number",
    queryMessageInfo: "Each notification has a unique ID",
    querySamplyIDInfo: "The ID of participant on the platform Samply",
    queryCodeInfo:
      "The participant code entered by a participant when joining your study",
    queryGroupIDInfo:
      "The group code entered by a participant when joining your study",
    queryTimeInfo:
      "When the message is sent from the server (the number of milliseconds elapsed since January 1, 1970)",
    queryBatchInfo:
      "The notification number for each participant. The number begins with 1 and increases by 1 with each notification sent.",
    data_title: "Participants & History",
    data_results_title: `<a target='blank' href='../data'>Results</a> `,
    data_results_1:
      "By clicking on the tasks on the left, you can switch between results for different tasks. The table contains information about a participant and the type of data. The Samply ID is a unique number assigned to each user regardless of the participant code and name. You can either download data for a specific participant or download all results for that task.",
    data_participants_title: `Participants`,
    data_participants_1: `
            The list of participants displays them in order of registration to the study.
            Together with their unique ID, the time at which they joined the study, and their username, the table provides information from the direct link query (e.g., code).
            The “Log” column displays the links to the logs of the notifications sent to a particular participant.
            Next to this, the “New notification” column has links to the Notifications menu where the participant’s notifications can be scheduled.
            A participant can also be deleted by clicking the basket icon on the right-hand side of the table.
          `,
    data_1: `
            There are two ways to monitor participation: via the list of participants (“Participants” menu) and the history of notifications sent (“History” menu).
          `,
    data_history_title: `History`,
    data_history_1: `
            The “History” menu displays the time points for the following events of each notification:
          `,
    data_history_2_1: `When the notification was sent from the server.`,
    data_history_2_2: `When the user opened the online study by tapping on the notification.`,
    data_history_2_3: `When the user opened the notification within the mobile application.`,
    data_history_2_4: `When the user archived the notification message within the mobile application.`,
    data_history_3: `
            The title, message, and study URL for each notification are shown.
            If the user dismisses a notification, no event is triggered or recorded. Clicking on the user ID reveals the notification events filtered for that user.
            To further inspect and analyze their interactions with notifications, the history of all the participant’s events can be downloaded in the CSV format.
          `
  },

  listing: {
    pagination_prev: "Prev",
    pagination_next: "Next",
    pagination_page_1: "Page ",
    pagination_page_2: " of ",
    pagination_page_3: " total results"
  },

  studies: {
    no_tests_in_study: "There are no publicly available tasks in this study.",
    created: "Created",
    info: "Information about the study",
    authors: "Authors",
    how_to_participate: "How to participate in the study",
    arleadyParticipant:
      "You are already registered in this study. Check your mobile app Samply Research for more information.",
    alreadyAppHeader:
      "Already have installed the mobile application Samply Research?",
    already_instruction:
      "Use the app to scan the QR code below to join the study, or just click the button below if you are already on a smartphone.",
    firstTimeHeader: "First time here?",
    firstTimeStep_1: `
            1. You should first install the mobile application <em>Samply Research</em> on your smartphone.
            For Android users, the application is available in <a href="https://play.google.com/store/apps/details?id=org.js.samply" target="_blank">Google Play</a>.
            For Apple users, the application is in <a href="https://apps.apple.com/app/samply-research/id1511062019" target="_blank">App Store</a>.
          `,
    firstTimeStep_2:
      "2. When you open the app for the first time, you will need to create a participant account. The login information is stored securely on the Samply server (which is the server of the University of Konstanz in Germany) and is only used to authenticate users. The login information (your email and password) is not available to researchers.",
    firstTimeStep_3:
      '3. Inside the app, click the button "Find a study", then "Scan QR code" and scan the following QR code. Alternatively, use the Camera app of your smartphone to scan the QR code. After that, follow the instructions of the study.',
    scanQRcode: "Scan this QR code to join the study in the mobile app",
    goToStudy: "Open the study in the app"
  },

  help: {
    ask_question_header: "Do you have a problem?",
    type_in_your_question: "Ask your question here",
    send_question_btn: "Send"
  },

  notifications: {
    message_create_project: `To set up notifications, activate or create a study <a href="/projects">here</a>.`,
    title: "Title",
    message: "Message",
    step_0_header: "1. Choose timezone",
    step_0_participant_timezone: `
      Adjust the time to the participant's time zone (this should work for future and current participants with a specified time zone).
    `,
    step_1_header: "2. Choose participants",
    step_1_future: "All future participants (excluding current participants)",
    step_1_current: "Current participants",
    step_1_all: "All",
    step_1_groups: "Groups",
    step_2_header: "3. Choose time",
    step_2_timepoints: "Specific time point(s)",
    step_2_windows:
      "Time window (the exact time point(s) will be chosen randomly)",
    step_2_hour: "Hour (0 - 23)",
    step_2_minute: "Minute (0 - 59)",
    step_2_add_timepoint: "Add one more time point",
    step_2_from: "From",
    step_2_to: "To",
    step_2_distance: "Minimum interval between notifications",
    step_2_add_window: "Add one more time window",
    step_2_random:
      "How many time points should be randomly selected from this time window?",
    step_2_repeat: "Repeat",
    step_2_every_minute: "every minute",
    step_2_every_2_minute:
      "at every 2nd minute past each hour (e.g., at 12:00, 12:02, 12:04, ...)",
    step_2_every_5_minute:
      "at every 5th minute past each hour (e.g., at 12:00, 12:05, 12:10, ...)",
    step_2_every_10_minute:
      "at every 10th minute past each hour (e.g., at 12:00, 12:10, 12:20, ...)",
    step_2_every_15_minute:
      "at every 15th minute past each hour (e.g., at 12:00, 12:15, 12:30, ...)",
    step_2_every_30_minute:
      "at every 30th minute past each hour (e.g., at 12:00, 12:30, 13:00, ...)",
    step_3_header: "4. Choose date(s)",
    step_3_dates: "Specific date(s)",
    step_3_every: "Repeat every",
    step_3_days: "day(s)",
    step_3_weekday: "Repeat on specific day(s) of week (choose one or many)",
    step_3_monthday: "Repeat on specific day(s) of month (choose one or many)",
    step_3_day: "Day (1 - 31)",
    step_3_month: "Month (1 - 12)",
    step_3_yeary: "Year",
    step_3_add_date: "Add one more date",
    step_4_header: "5. Choose month(s)",
    step_4_any: "Repeat every month",
    step_4_specific: "Repeat in specific month(s) (choose one or many)",
    step_5_header: "6. Choose when to start",
    step_5_timepoint: "Start at specific timepoint",
    step_5_hour: "hour (0-23)",
    step_5_minute: "minute (0-59)",
    step_5_day: "day (1-31)",
    step_5_month: "month (1-12)",
    step_5_year: "year (2020, 2021)",
    step_5_participant: "Start sending notification for each participant after",
    step_5_days: "days",
    step_5_hours: "hours",
    step_5_minutes: "minutes from",
    step_5_next: "Start sending notification for each participant on the ",
    step_day_after: " day after ",
    step_day_after_stop: " day after ",
    step_every_day: " day",
    step_dot: " days",
    step_th: "th",
    step_st: "st",
    step_nd: "nd",
    step_rd: "rd",
    step_same: "same",
    step_next: "next",
    step_6_next: "Stop sending notification for each participant at the end of the ",
    step_5_registration: "the moment of the participant registration",
    step_5_now: "now",
    step_6_header: "7. Choose when to stop ",
    step_6_timepoint: "Stop at specific timepoint",
    step_6_participant: "Stop sending notification for each participant after",
    step_7_header: "8. Choose when the link should expire",
    step_7_not: "The link should not expire",
    step_7_yes: "The link should expire",
    step_7_minutes: "minutes after the notification is sent",
    schedule_notifications: "Schedule notifications",
    scheduled_notifications: "Scheduled notifications",
    delete_notifications: "Delete all notifications",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
    table_adjusting_timezone: `
      Adjusting to the participant's time zone
    `,
    table_created_at: "Created at",
    table_scheduled_at: "Scheduled at",
    table_number_timepoints: "Number of time points",
    table_start: "Start",
    table_start_after: "Start after",
    table_end: "End",
    table_stop_after: "Stop after",
    table_repeat_window: "Repeat in the time window from",
    table_repeat: "Repeat",
    table_number_notifications: "number of notifications",
    table_and: "and",
    table_participant_registration: "participant registration",
    table_all_participants:
      "Applies to all participants at the moment of notification creation",
    table_all_groups:
      "Applies to all groups at the moment of notification creation",
    table_for_participants: "For participants",
    table_for_groups: "For groups",
    table_randomized: "Randomized",
    table_future_participants: "Applies to future participants",
    table_all_groups: `Applies to all groups at the moment of notification creation`,
    table_start_on_the: `Start on the`,
    table_day_from: `day from`,
    table_stop_at_the_end_of: `Stop at the end of the`,
    table_to: `to`,
  },

  messages: {
    open: "Open the link"
  },

  payout: {
    info: "Participant information",
    infoSamplyID: "Samply ID",
    infoName: "Name",
    infoEmail: "Email",
    infoPayments: "Payments",
    infoEnabled: "Enabled",
    infoDisabled: "Disabled",
    paymentTitle: "Payment to participant",
    paymentCurrency: "Currency",
    paymentAmount: "Amount",
    paymentCheckout: "Checkout",
    paymentInfo: `
      Payments and invoicing are managed by our partner Stripe. A 5% processing fee is deducted from the payment.
    `,
    paymentInfoNotRegistered: `
      To receive payments, the participant should register a payable account.
      To do that, the participant should log in to the website and navigate to the <a target='blank' href='/account'>profile page</a>.
    `
  },

  receipts: {
    info: "Participant information",
    infoSamplyID: "Samply ID",
    infoName: "Name",
    infoEmail: "Email",
    infoPayments: "Payments",
    infoEnabled: "Enabled",
    infoDisabled: "Disabled",
    receiptsTitle: "Receipts",
    receiptsDownload: "Download",
    receiptsDate: "Date",
    receiptsReceiptID: "Receipt ID",
    receiptsStatus: "Status",
    receiptsCurrency: "Currency",
    receiptsAmount: "Amount",
    receiptsFee: "Fee",
    receiptsURL: "Receipt URL",
    receiptsLink: "Link"
  },

  groups: {
    groupsTitle: "Groups (beta)",
    groupName: "Group Name",
    groupTitle: "Group ID",
    groupMembers: "Members",
    groupAdd: "Add a new group",
    groupDelete: "Delete",
    groupSelectParticipants: "Select participants",
    groupNoParticipantsLeft: "No participants left without group",
    groupCreate: "Create group",
    apiTitle: "Notify API",
    apiToken: "Notification token",
    apiValidUntil: "Token is valid until",
    apiResetToken: "Reset notification token",
    apiNewTokenExpires: "New token should expire on",
    apiCode: "JavaScript code to use Samply API to send a notification",
    apiExplained_1: `The notification will be sent to all members of the group (with the specified ID <code>groupID</code>) except the participant (with the specified ID <code>participantID</code>).`,
    apiExplained_2: `Parameters <code>title</code>, <code>message</code>, and <code>url</code> define the content of the notification that will be displayed in the notification.`,
    apiCommentData: "// defining data",
    apiCommentFunction:
      "// function to send the POST request to activate the notification"
  },

  history: {
    download: "Download",
    downloadInfo: `
      When you download the history of notifications, the time of the events is saved as a timestamp.
      In JavaScript, a timestamp is the number of milliseconds that have passed since January 1, 1970.
    `,
    expire: "The link expires",
    sentFromServer: "Sent from the server",
    receivedInOpenApp: "Received when the app was open",
    tappedNotificationBar: "Tapped in the notification bar",
    openInApp: "Opened in the app (messages)",
    deletedByUser: "Deleted by user",
    geofenceEventTriggered: "Geofencing event triggered",
    messageID: "Message ID",
    status: "Status",
    receipt: "Receipt"
  }
};
