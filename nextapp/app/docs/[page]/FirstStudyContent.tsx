import type { Locale } from "@/lib/i18n";

const FORM_FIELDS = [
  {
    name: "Study name",
    required: true,
    body: "The name of your study. Participants see this name in the app and on the public studies page.",
  },
  {
    name: "Description",
    required: false,
    body: "A brief overview of the study shown to participants in the app and on the public studies page.",
  },
  {
    name: "Consent form",
    required: false,
    body: "Displayed when participants tap 'Join the study'. For human-subjects research this should cover the study's purpose, procedures, risks, data handling, and how to withdraw.",
  },
  {
    name: "Message after joining",
    required: false,
    body: "Shown immediately after successful enrolment. Use it to confirm sign-up and set expectations — for example, when the first notification will arrive.",
  },
  {
    name: "Completion message",
    required: false,
    body: "Displayed when Samply detects that a participant has submitted a survey response. Relevant when you redirect participants to a Samply completion URL.",
  },
];

const WORKSPACE_SECTIONS = [
  {
    title: "Overview",
    body: "The study dashboard: participant count, notification stats, 7-day compliance, and recent activity. This is also where you activate the study.",
  },
  {
    title: "Participants",
    body: "Everyone enrolled — their pseudonymous Samply ID, enrolment date, assigned group (if any), timezone, and response history.",
  },
  {
    title: "Schedule",
    body: "All notification schedules attached to this study. Add, view, and delete schedules here. Each schedule expands into a per-participant queue of sends.",
  },
  {
    title: "Data",
    body: "Response records submitted through your survey links, with timestamps and participant IDs.",
  },
  {
    title: "Invitations",
    body: "Your join links and QR code. Copy the web link for email or a landing page, or use the deep link to embed in other materials.",
  },
  {
    title: "Settings",
    body: "Study name, description, consent form, enrollment options, and advanced configuration.",
  },
  {
    title: "Approval",
    body: "Request public listing for your study. Required before the study appears on the public studies page.",
  },
  {
    title: "Stream API",
    body: "Configure webhooks to receive participant events in real time. See the Stream API guide for details.",
  },
];

const FORM_FIELDS_DE = [
  {
    name: "Studienname",
    required: true,
    body: "Der Name Ihrer Studie. Teilnehmende sehen diesen Namen in der App und auf der öffentlichen Studienübersichtsseite.",
  },
  {
    name: "Beschreibung",
    required: false,
    body: "Eine kurze Übersicht der Studie, die Teilnehmenden in der App und auf der öffentlichen Studienübersichtsseite angezeigt wird.",
  },
  {
    name: "Einwilligungserklärung",
    required: false,
    body: 'Wird angezeigt, wenn Teilnehmende auf „An der Studie teilnehmen" tippen. Bei Forschung mit Probanden sollte dies Zweck, Ablauf, Risiken, Datenverarbeitung und Möglichkeiten zum Rückzug der Einwilligung abdecken.',
  },
  {
    name: "Nachricht nach dem Beitreten",
    required: false,
    body: "Wird unmittelbar nach erfolgreicher Einschreibung angezeigt. Nutzen Sie sie, um die Anmeldung zu bestätigen und Erwartungen zu setzen – z. B. wann die erste Benachrichtigung eintrifft.",
  },
  {
    name: "Abschlussnachricht",
    required: false,
    body: "Wird angezeigt, wenn Samply erkennt, dass eine teilnehmende Person eine Umfrageantwort eingereicht hat. Relevant, wenn Sie Teilnehmende zu einer Samply-Abschluss-URL weiterleiten.",
  },
];

const WORKSPACE_SECTIONS_DE = [
  {
    title: "Übersicht",
    body: "Das Studien-Dashboard: Anzahl der Teilnehmenden, Benachrichtigungsstatistiken, 7-Tage-Compliance und aktuelle Aktivitäten. Hier aktivieren Sie auch die Studie.",
  },
  {
    title: "Teilnehmende",
    body: "Alle Eingeschriebenen – ihre pseudonyme Samply-ID, das Einschreibungsdatum, die zugewiesene Gruppe (falls vorhanden), die Zeitzone und der Antwortverlauf.",
  },
  {
    title: "Zeitplan",
    body: "Alle Benachrichtigungszeitpläne dieser Studie. Hier können Sie Zeitpläne hinzufügen, anzeigen und löschen. Jeder Zeitplan wird in eine teilnehmendenspezifische Warteschlange von Versendungen erweitert.",
  },
  {
    title: "Daten",
    body: "Antwortdatensätze, die über Ihre Umfragelinks eingereicht wurden, mit Zeitstempeln und Teilnehmenden-IDs.",
  },
  {
    title: "Einladungen",
    body: "Ihre Beitrittslinks und Ihr QR-Code. Kopieren Sie den Web-Link für E-Mails oder eine Landingpage, oder verwenden Sie den Deep-Link, um ihn in anderen Materialien einzubetten.",
  },
  {
    title: "Einstellungen",
    body: "Studienname, Beschreibung, Einwilligungserklärung, Einschreibungsoptionen und erweiterte Konfiguration.",
  },
  {
    title: "Freischaltung",
    body: "Beantragen Sie die öffentliche Listung Ihrer Studie. Erforderlich, bevor die Studie auf der öffentlichen Studienübersichtsseite erscheint.",
  },
  {
    title: "Stream API",
    body: "Konfigurieren Sie Webhooks, um Teilnehmenden-Ereignisse in Echtzeit zu empfangen. Weitere Informationen finden Sie im Stream API-Leitfaden.",
  },
];

const FORM_FIELDS_NL = [
  {
    name: "Studienaam",
    required: true,
    body: "De naam van uw studie. Deelnemers zien deze naam in de app en op de openbare studiepagina.",
  },
  {
    name: "Beschrijving",
    required: false,
    body: "Een korte samenvatting van de studie die aan deelnemers wordt getoond in de app en op de openbare studiepagina.",
  },
  {
    name: "Toestemmingsformulier",
    required: false,
    body: "Wordt weergegeven wanneer deelnemers op &quot;Deelnemen aan de studie&quot; tikken. Voor onderzoek met menselijke proefpersonen dient dit het doel, de procedures, de risico's, de gegevensverwerking en de mogelijkheid tot terugtrekking te bevatten.",
  },
  {
    name: "Bericht na deelname",
    required: false,
    body: "Wordt direct na succesvolle inschrijving getoond. Gebruik het om de aanmelding te bevestigen en verwachtingen te stellen — bijvoorbeeld wanneer de eerste melding zal arriveren.",
  },
  {
    name: "Voltooiingsbericht",
    required: false,
    body: "Wordt weergegeven wanneer Samply detecteert dat een deelnemer een enquêtereactie heeft ingediend. Relevant wanneer u deelnemers doorverwijst naar een Samply-voltooiings-URL.",
  },
];

const WORKSPACE_SECTIONS_NL = [
  {
    title: "Overzicht",
    body: "Het studie-dashboard: aantal deelnemers, meldingsstatistieken, naleving over 7 dagen en recente activiteit. Dit is ook waar u de studie activeert.",
  },
  {
    title: "Deelnemers",
    body: "Iedereen die is ingeschreven — hun pseudonieme Samply-ID, inschrijvingsdatum, toegewezen groep (indien van toepassing), tijdzone en antwoordgeschiedenis.",
  },
  {
    title: "Schema",
    body: "Alle meldingsschema's die aan deze studie zijn gekoppeld. Voeg hier schema's toe, bekijk ze en verwijder ze. Elk schema wordt uitgebreid tot een wachtrij van verzendingen per deelnemer.",
  },
  {
    title: "Gegevens",
    body: "Antwoordrecords ingediend via uw enquêtelinks, met tijdstempels en deelnemer-ID's.",
  },
  {
    title: "Uitnodigingen",
    body: "Uw deelnamelinks en QR-code. Kopieer de weblink voor e-mail of een landingspagina, of gebruik de deep link om in andere materialen in te sluiten.",
  },
  {
    title: "Instellingen",
    body: "Studienaam, beschrijving, toestemmingsformulier, inschrijvingsopties en geavanceerde configuratie.",
  },
  {
    title: "Goedkeuring",
    body: "Vraag een openbare vermelding aan voor uw studie. Vereist voordat de studie op de openbare studiepagina verschijnt.",
  },
  {
    title: "Stream API",
    body: "Configureer webhooks om deelnemersgebeurtenissen in realtime te ontvangen. Zie de Stream API-gids voor meer informatie.",
  },
];

const FORM_FIELDS_RU = [
  {
    name: 'Название исследования',
    required: true,
    body: 'Название вашего исследования. Участники видят его в приложении и на странице публичных исследований.',
  },
  {
    name: 'Описание',
    required: false,
    body: 'Краткое описание исследования, отображаемое участникам в приложении и на странице публичных исследований.',
  },
  {
    name: 'Форма согласия',
    required: false,
    body: 'Отображается, когда участник нажимает кнопку «Присоединиться к исследованию». Для исследований с участием людей форма должна охватывать цели, процедуры, риски, обработку данных и порядок отзыва согласия.',
  },
  {
    name: 'Сообщение после вступления',
    required: false,
    body: 'Отображается сразу после успешной регистрации. Используйте его, чтобы подтвердить запись и обозначить ожидания — например, когда придёт первое уведомление.',
  },
  {
    name: 'Сообщение о завершении',
    required: false,
    body: 'Отображается, когда Samply фиксирует, что участник отправил ответ на анкету. Актуально, если вы перенаправляете участников на URL завершения Samply.',
  },
];

const WORKSPACE_SECTIONS_RU = [
  {
    title: 'Обзор',
    body: 'Панель управления исследованием: количество участников, статистика уведомлений, отклик за 7 дней и последние события. Здесь же исследование активируется.',
  },
  {
    title: 'Участники',
    body: 'Все зарегистрированные участники — их псевдонимный Samply ID, дата регистрации, назначенная группа (при наличии), часовой пояс и история ответов.',
  },
  {
    title: 'Расписание',
    body: 'Все расписания уведомлений, привязанные к данному исследованию. Здесь можно добавлять, просматривать и удалять расписания. Каждое расписание разворачивается в очередь отправок для каждого участника.',
  },
  {
    title: 'Данные',
    body: 'Записи ответов, отправленных через ваши ссылки на анкеты, с временными метками и идентификаторами участников.',
  },
  {
    title: 'Приглашения',
    body: 'Ваши ссылки для вступления и QR-код. Скопируйте веб-ссылку для рассылки по электронной почте или целевой страницы, либо используйте прямую ссылку для встраивания в другие материалы.',
  },
  {
    title: 'Настройки',
    body: 'Название исследования, описание, форма согласия, параметры регистрации и расширенная конфигурация.',
  },
  {
    title: 'Одобрение',
    body: 'Запрос публичного размещения вашего исследования. Обязательно до появления исследования на странице публичных исследований.',
  },
  {
    title: 'Stream API',
    body: 'Настройка вебхуков для получения событий участников в режиме реального времени. Подробнее см. в руководстве по Stream API.',
  },
];

const FORM_FIELDS_ZH = [
  {
    name: '研究名称',
    required: true,
    body: '您的研究名称。参与者在应用中和公开研究页面上可以看到此名称。',
  },
  {
    name: '描述',
    required: false,
    body: '研究的简要概述，显示给应用中和公开研究页面上的参与者。',
  },
  {
    name: '知情同意书',
    required: false,
    body: '当参与者点击"加入研究"时显示。对于涉及人类受试者的研究，应涵盖研究目的、程序、风险、数据处理方式以及退出方法。',
  },
  {
    name: '加入后消息',
    required: false,
    body: '成功注册后立即显示。用于确认报名并说明预期安排——例如，何时会收到第一条通知。',
  },
  {
    name: '完成消息',
    required: false,
    body: '当 Samply 检测到参与者已提交问卷回答时显示。在您将参与者重定向至 Samply 完成 URL 时相关。',
  },
];

const WORKSPACE_SECTIONS_ZH = [
  {
    title: '概览',
    body: '研究控制台：参与者人数、通知统计、7 天合规率和近期活动。这也是激活研究的地方。',
  },
  {
    title: '参与者',
    body: '所有已注册人员——其假名 Samply ID、注册日期、所属组（如有）、时区和回答历史。',
  },
  {
    title: '日程',
    body: '附加到此研究的所有通知日程。在此处添加、查看和删除日程。每个日程会展开为每位参与者的发送队列。',
  },
  {
    title: '数据',
    body: '通过您的问卷链接提交的回答记录，附带时间戳和参与者 ID。',
  },
  {
    title: '邀请',
    body: '您的加入链接和 QR 码。可复制网页链接用于电子邮件或落地页，或使用深链接嵌入其他材料。',
  },
  {
    title: '设置',
    body: '研究名称、描述、知情同意书、注册选项及高级配置。',
  },
  {
    title: '审批',
    body: '申请将您的研究公开列出。在研究出现在公开研究页面之前为必填项。',
  },
  {
    title: 'Stream API',
    body: '配置 Webhook 以实时接收参与者事件。详情请参阅 Stream API 指南。',
  },
];

export default function FirstStudyContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <FirstStudyContentDe />;
  if (locale === "nl") return <FirstStudyContentNl />;
  if (locale === "ru") return <FirstStudyContentRu />;
  if (locale === "zh") return <FirstStudyContentZh />;
  if (locale === "ko") return <FirstStudyContentKo />;
  if (locale === "it") return <FirstStudyContentIt />;
  if (locale === "fr") return <FirstStudyContentFr />;
  if (locale === "es") return <FirstStudyContentEs />;
  if (locale === "pt") return <FirstStudyContentPt />;
  if (locale === "ja") return <FirstStudyContentJa />;
  if (locale === "ar") return <FirstStudyContentAr />;
  if (locale === "pl") return <FirstStudyContentPl />;
  if (locale === "tr") return <FirstStudyContentTr />;
  return <FirstStudyContentEn />;
}

function FirstStudyContentEn() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Step 1 — Create the study</h2>
      <p>
        From the dashboard, click <strong>New study</strong>. You will see a form with the fields below.
        Only <strong>Study name</strong> is required; everything else can be filled in now or edited later from the study Settings tab.
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "yes" : "optional"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Click <strong>Create study</strong>. Samply creates the study and takes you to the study workspace.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Step 2 — Know your workspace</h2>
      <p>
        The study workspace has eight tabs, accessible from the navigation at the top of the study page.
      </p>

      <dl>
        {WORKSPACE_SECTIONS.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Step 3 — Activate the study</h2>
      <p>
        A new study starts with a <strong>Draft</strong> status. While in Draft, the join link landing
        page will refuse new enrolments — participants see a "study not available" message.
      </p>
      <p>
        To open enrolment: go to the study <strong>Overview</strong> tab and click <strong>Activate study</strong>.
        The status changes to <strong>Live</strong>. You can pause enrolment at any time by clicking
        the same button again — the study returns to Draft without losing any data.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Step 4 — Add your first schedule</h2>
      <p>
        An empty study sends nothing. Schedules are what turn it into a running study.
        Head to the <strong>Schedule</strong> tab and click <strong>Add schedule</strong>.
      </p>
      <p>
        Before you build your first schedule, read <a href="/docs/types">The four schedule types</a> —
        choosing the right type for your research design matters more than any other single decision in
        Samply. Once you know which type you need, <a href="/docs/form">Creating a schedule</a> walks
        you through the form field by field.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Step 5 — Invite participants</h2>
      <p>
        Go to <strong>Invitations</strong> and copy the link or QR code that fits your recruitment
        channel. Participants tap the link on a device with the Samply Research app installed and
        are enrolled immediately.
      </p>
      <p>
        Full details — including how codes and groups interact with the join flow — are in{" "}
        <a href="/docs/invite">Inviting participants</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Advanced settings</h3>
      <p>
        The study <strong>Settings</strong> tab also contains optional features you can ignore for a basic
        study: asking participants for a custom code or group at enrolment, event-contingent designs,
        geofence triggers, notification action buttons, and webhooks. Each is off by default and
        documented separately in the Power features and Advanced features sections.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>First-study checklist</h3>
      <ol>
        <li>Study created with a name.</li>
        <li>Consent form filled in.</li>
        <li>At least one schedule added.</li>
        <li>Study activated (status changed from Draft to Live).</li>
        <li>Join link shared with at least one participant.</li>
        <li>First notification received and survey response confirmed.</li>
      </ol>
    </>
  );
}

function FirstStudyContentDe() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Schritt 1 — Studie erstellen</h2>
      <p>
        Klicken Sie im Dashboard auf <strong>Neue Studie</strong>. Sie sehen ein Formular mit den untenstehenden Feldern.
        Nur der <strong>Studienname</strong> ist erforderlich; alles andere kann jetzt ausgefüllt oder später über den Tab „Einstellungen" der Studie bearbeitet werden.
      </p>

      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Erforderlich</th>
            <th>Was es bewirkt</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_DE.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "ja" : "optional"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Klicken Sie auf <strong>Studie erstellen</strong>. Samply erstellt die Studie und leitet Sie zum Studienarbeitsbereich weiter.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Schritt 2 — Den Arbeitsbereich kennenlernen</h2>
      <p>
        Der Studienarbeitsbereich hat acht Tabs, die über die Navigation oben auf der Studiengeseite zugänglich sind.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_DE.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Schritt 3 — Studie aktivieren</h2>
      <p>
        Eine neue Studie startet mit dem Status <strong>Entwurf</strong>. Im Entwurfsmodus lehnt die Beitrittslink-Landingpage
        neue Einschreibungen ab – Teilnehmende sehen die Meldung „Studie nicht verfügbar".
      </p>
      <p>
        Um die Einschreibung zu öffnen: Gehen Sie zum Tab <strong>Übersicht</strong> der Studie und klicken Sie auf <strong>Studie aktivieren</strong>.
        Der Status wechselt zu <strong>Aktiv</strong>. Sie können die Einschreibung jederzeit pausieren, indem Sie
        erneut auf dieselbe Schaltfläche klicken – die Studie kehrt in den Entwurfsstatus zurück, ohne dass Daten verloren gehen.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Schritt 4 — Ersten Zeitplan hinzufügen</h2>
      <p>
        Eine leere Studie sendet nichts. Zeitpläne verwandeln sie in eine laufende Studie.
        Gehen Sie zum Tab <strong>Zeitplan</strong> und klicken Sie auf <strong>Zeitplan hinzufügen</strong>.
      </p>
      <p>
        Bevor Sie Ihren ersten Zeitplan erstellen, lesen Sie <a href="/docs/types">Die vier Zeitplantypen</a> –
        die Wahl des richtigen Typs für Ihr Forschungsdesign ist wichtiger als jede andere Einzelentscheidung in
        Samply. Sobald Sie wissen, welchen Typ Sie benötigen, führt Sie <a href="/docs/form">Einen Zeitplan erstellen</a> Feld für Feld durch das Formular.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Schritt 5 — Teilnehmende einladen</h2>
      <p>
        Gehen Sie zu <strong>Einladungen</strong> und kopieren Sie den Link oder QR-Code, der zu Ihrem Rekrutierungskanal passt.
        Teilnehmende tippen auf den Link auf einem Gerät, auf dem die Samply Research-App installiert ist, und
        sind sofort eingeschrieben.
      </p>
      <p>
        Vollständige Details – einschließlich der Interaktion von Codes und Gruppen mit dem Beitrittsablauf – finden Sie unter{" "}
        <a href="/docs/invite">Teilnehmende einladen</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Erweiterte Einstellungen</h3>
      <p>
        Der Tab <strong>Einstellungen</strong> der Studie enthält auch optionale Funktionen, die Sie für eine einfache
        Studie ignorieren können: Teilnehmende nach einem benutzerdefinierten Code oder einer Gruppe bei der Einschreibung fragen, ereignisabhängige Designs,
        Geofence-Auslöser, Benachrichtigungsaktionsschaltflächen und Webhooks. Jede Funktion ist standardmäßig deaktiviert und
        wird separat in den Abschnitten „Erweiterte Funktionen" und „Fortgeschrittene Funktionen" dokumentiert.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Checkliste für die erste Studie</h3>
      <ol>
        <li>Studie mit einem Namen erstellt.</li>
        <li>Einwilligungserklärung ausgefüllt.</li>
        <li>Mindestens ein Zeitplan hinzugefügt.</li>
        <li>Studie aktiviert (Status von Entwurf zu Aktiv geändert).</li>
        <li>Beitrittslink mit mindestens einer teilnehmenden Person geteilt.</li>
        <li>Erste Benachrichtigung erhalten und Umfrageantwort bestätigt.</li>
      </ol>
    </>
  );
}

function FirstStudyContentRu() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Шаг 1 — Создание исследования</h2>
      <p>
        На панели управления нажмите <strong>Новое исследование</strong>. Вы увидите форму с полями, перечисленными ниже.
        Обязательным является только <strong>Название исследования</strong>; остальные поля можно заполнить сейчас или отредактировать позже во вкладке «Настройки».
      </p>

      <table>
        <thead>
          <tr>
            <th>Поле</th>
            <th>Обязательно</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_RU.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: f.required ? 'var(--coral)' : 'var(--ink-40)' }}>
                {f.required ? 'да' : 'необязательно'}
              </td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Нажмите <strong>Создать исследование</strong>. Samply создаёт исследование и открывает рабочее пространство.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Шаг 2 — Знакомство с рабочим пространством</h2>
      <p>
        Рабочее пространство исследования содержит восемь вкладок, доступных через навигацию в верхней части страницы.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_RU.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Шаг 3 — Активация исследования</h2>
      <p>
        Новое исследование создаётся со статусом <strong>Черновик</strong>. В этом статусе целевая страница ссылки для вступления
        отклоняет новые регистрации — участники видят сообщение «исследование недоступно».
      </p>
      <p>
        Чтобы открыть регистрацию: перейдите во вкладку <strong>Обзор</strong> и нажмите <strong>Активировать исследование</strong>.
        Статус изменится на <strong>Активно</strong>. Вы можете приостановить регистрацию в любой момент, нажав
        ту же кнопку ещё раз — исследование вернётся в статус «Черновик» без потери данных.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Шаг 4 — Добавление первого расписания</h2>
      <p>
        Пустое исследование не отправляет ничего. Расписания превращают его в работающее исследование.
        Перейдите во вкладку <strong>Расписание</strong> и нажмите <strong>Добавить расписание</strong>.
      </p>
      <p>
        Прежде чем создавать первое расписание, прочитайте <a href='/docs/types'>Четыре типа расписания</a> —
        выбор правильного типа для вашего исследовательского дизайна важнее любого другого отдельного решения в
        Samply. Когда вы определитесь с типом, <a href='/docs/form'>Создание расписания</a> проведёт
        вас через форму поле за полем.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Шаг 5 — Приглашение участников</h2>
      <p>
        Перейдите в раздел <strong>Приглашения</strong> и скопируйте ссылку или QR-код, подходящий для вашего
        канала рекрутирования. Участники переходят по ссылке на устройстве с установленным приложением Samply Research
        и немедленно регистрируются.
      </p>
      <p>
        Подробности — включая взаимодействие кодов и групп с процессом вступления — описаны в{' '}
        <a href='/docs/invite'>Приглашение участников</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Расширенные настройки</h3>
      <p>
        Вкладка <strong>Настройки</strong> исследования также содержит дополнительные функции, которые можно
        игнорировать при базовом использовании: запрос у участников кода или группы при регистрации, событийно-зависимые
        дизайны, геозоны-триггеры, кнопки действий в уведомлениях и вебхуки. Каждая функция отключена по умолчанию
        и документирована отдельно в разделах «Расширенные возможности» и «Дополнительные функции».
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Чек-лист первого исследования</h3>
      <ol>
        <li>Исследование создано с названием.</li>
        <li>Форма согласия заполнена.</li>
        <li>Добавлено хотя бы одно расписание.</li>
        <li>Исследование активировано (статус изменён с «Черновик» на «Активно»).</li>
        <li>Ссылка для вступления передана хотя бы одному участнику.</li>
        <li>Получено первое уведомление и подтверждён ответ на анкету.</li>
      </ol>
    </>
  );
}

function FirstStudyContentZh() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>第 1 步 — 创建研究</h2>
      <p>
        在控制台中点击<strong>新建研究</strong>。您将看到一个包含以下字段的表单。
        只有<strong>研究名称</strong>是必填项；其余字段可现在填写，也可稍后在研究的"设置"标签页中编辑。
      </p>

      <table>
        <thead>
          <tr>
            <th>字段</th>
            <th>必填</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_ZH.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: f.required ? 'var(--coral)' : 'var(--ink-40)' }}>
                {f.required ? '是' : '可选'}
              </td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        点击<strong>创建研究</strong>。Samply 将创建研究并跳转至研究工作区。
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>第 2 步 — 了解工作区</h2>
      <p>
        研究工作区有八个标签页，可通过研究页面顶部的导航栏访问。
      </p>

      <dl>
        {WORKSPACE_SECTIONS_ZH.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>第 3 步 — 激活研究</h2>
      <p>
        新建研究的初始状态为<strong>草稿</strong>。在草稿状态下，加入链接的落地页将拒绝新的注册——参与者会看到"研究不可用"的提示。
      </p>
      <p>
        要开放注册：进入研究的<strong>概览</strong>标签页，点击<strong>激活研究</strong>。
        状态将变为<strong>进行中</strong>。您可以随时再次点击同一按钮暂停注册——研究将返回草稿状态，数据不会丢失。
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>第 4 步 — 添加第一个日程</h2>
      <p>
        空研究不会发送任何内容。日程是将其变为运行中研究的关键。
        前往<strong>日程</strong>标签页，点击<strong>添加日程</strong>。
      </p>
      <p>
        在创建第一个日程之前，请阅读<a href='/docs/types'>四种日程类型</a>——
        为您的研究设计选择正确的类型比 Samply 中的任何其他单一决策都重要。确定所需类型后，
        <a href='/docs/form'>创建日程</a>将逐字段引导您完成表单。
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>第 5 步 — 邀请参与者</h2>
      <p>
        前往<strong>邀请</strong>，复制适合您招募渠道的链接或 QR 码。参与者在已安装 Samply Research 应用的设备上点击链接，即可立即注册。
      </p>
      <p>
        完整详情——包括邀请码和组别如何与加入流程交互——请参阅{' '}
        <a href='/docs/invite'>邀请参与者</a>。
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>高级设置</h3>
      <p>
        研究的<strong>设置</strong>标签页还包含一些可选功能，基础研究可忽略：在注册时要求参与者提供自定义代码或组别、事件触发设计、地理围栏触发、通知操作按钮和 Webhook。每项功能默认关闭，并在"高级功能"和"进阶功能"章节中单独说明。
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>首次研究清单</h3>
      <ol>
        <li>已创建带名称的研究。</li>
        <li>已填写知情同意书。</li>
        <li>已添加至少一个日程。</li>
        <li>已激活研究（状态从草稿变为进行中）。</li>
        <li>已将加入链接分享给至少一名参与者。</li>
        <li>已收到第一条通知并确认问卷回答。</li>
      </ol>
    </>
  );
}

function FirstStudyContentNl() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Stap 1 — De studie aanmaken</h2>
      <p>
        Klik vanuit het dashboard op <strong>Nieuwe studie</strong>. U ziet een formulier met de onderstaande velden.
        Alleen de <strong>Studienaam</strong> is verplicht; al het andere kan nu worden ingevuld of later worden bewerkt via het tabblad Instellingen van de studie.
      </p>

      <table>
        <thead>
          <tr>
            <th>Veld</th>
            <th>Verplicht</th>
            <th>Wat het doet</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_NL.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "ja" : "optioneel"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Klik op <strong>Studie aanmaken</strong>. Samply maakt de studie aan en brengt u naar de studiewerkruimte.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Stap 2 — Uw werkruimte leren kennen</h2>
      <p>
        De studiewerkruimte heeft acht tabbladen, toegankelijk via de navigatie bovenaan de studiepagina.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_NL.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Stap 3 — De studie activeren</h2>
      <p>
        Een nieuwe studie begint met de status <strong>Concept</strong>. In de conceptstatus weigert de landingspagina van de deelnamelink
        nieuwe inschrijvingen — deelnemers zien een bericht dat de studie niet beschikbaar is.
      </p>
      <p>
        Om de inschrijving te openen: ga naar het tabblad <strong>Overzicht</strong> van de studie en klik op <strong>Studie activeren</strong>.
        De status verandert naar <strong>Actief</strong>. U kunt de inschrijving op elk moment pauzeren door
        opnieuw op dezelfde knop te klikken — de studie keert terug naar Concept zonder dat er gegevens verloren gaan.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Stap 4 — Uw eerste schema toevoegen</h2>
      <p>
        Een lege studie verstuurt niets. Schema's zijn wat er een actieve studie van maakt.
        Ga naar het tabblad <strong>Schema</strong> en klik op <strong>Schema toevoegen</strong>.
      </p>
      <p>
        Lees voordat u uw eerste schema opstelt <a href="/docs/types">De vier schematypen</a> —
        het kiezen van het juiste type voor uw onderzoeksontwerp is belangrijker dan elke andere afzonderlijke beslissing in
        Samply. Zodra u weet welk type u nodig heeft, leidt <a href="/docs/form">Een schema aanmaken</a> u
        veld voor veld door het formulier.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Stap 5 — Deelnemers uitnodigen</h2>
      <p>
        Ga naar <strong>Uitnodigingen</strong> en kopieer de link of QR-code die past bij uw wervingskanaal.
        Deelnemers tikken op de link op een apparaat waarop de Samply Research-app is geïnstalleerd en
        zijn direct ingeschreven.
      </p>
      <p>
        Volledige details — inclusief hoe codes en groepen samenwerken met het deelnameproces — staan in{" "}
        <a href="/docs/invite">Deelnemers uitnodigen</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Geavanceerde instellingen</h3>
      <p>
        Het tabblad <strong>Instellingen</strong> van de studie bevat ook optionele functies die u voor een eenvoudige
        studie kunt negeren: deelnemers vragen om een aangepaste code of groep bij inschrijving, gebeurtenisafhankelijke ontwerpen,
        geofence-triggers, meldingsactieknoppen en webhooks. Elke functie is standaard uitgeschakeld en
        wordt afzonderlijk gedocumenteerd in de secties Geavanceerde functies en Uitgebreide functies.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Checklist voor de eerste studie</h3>
      <ol>
        <li>Studie aangemaakt met een naam.</li>
        <li>Toestemmingsformulier ingevuld.</li>
        <li>Minimaal één schema toegevoegd.</li>
        <li>Studie geactiveerd (status gewijzigd van Concept naar Actief).</li>
        <li>Deelnamelink gedeeld met minimaal één deelnemer.</li>
        <li>Eerste melding ontvangen en enquêtereactie bevestigd.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_KO = [
  {
    name: '연구 이름',
    required: true,
    body: '연구의 이름입니다. 참가자는 앱과 공개 연구 페이지에서 이 이름을 확인합니다.',
  },
  {
    name: '설명',
    required: false,
    body: '앱과 공개 연구 페이지에서 참가자에게 표시되는 연구의 간략한 개요입니다.',
  },
  {
    name: '동의서',
    required: false,
    body: "참가자가 '연구에 참여하기'를 탭할 때 표시됩니다. 인간 대상 연구의 경우 연구 목적, 절차, 위험, 데이터 처리 방법 및 철회 방법이 포함되어야 합니다.",
  },
  {
    name: '참여 후 메시지',
    required: false,
    body: '성공적으로 등록된 직후에 표시됩니다. 등록 확인 및 기대 사항을 안내하는 데 사용하십시오 — 예를 들어 첫 알림이 언제 도착할지 알려줄 수 있습니다.',
  },
  {
    name: '완료 메시지',
    required: false,
    body: 'Samply가 참가자가 설문 응답을 제출했음을 감지할 때 표시됩니다. 참가자를 Samply 완료 URL로 리디렉션할 때 관련됩니다.',
  },
];

const WORKSPACE_SECTIONS_KO = [
  {
    title: '개요',
    body: '연구 대시보드: 참가자 수, 알림 통계, 7일 준수율 및 최근 활동. 연구를 활성화하는 곳이기도 합니다.',
  },
  {
    title: '참가자',
    body: '등록된 모든 참가자 — 가명 Samply ID, 등록 날짜, 배정된 그룹(있는 경우), 시간대 및 응답 기록.',
  },
  {
    title: '일정',
    body: '이 연구에 연결된 모든 알림 일정입니다. 여기에서 일정을 추가, 조회 및 삭제할 수 있습니다. 각 일정은 참가자별 발송 대기열로 확장됩니다.',
  },
  {
    title: '데이터',
    body: '설문 링크를 통해 제출된 응답 기록으로, 타임스탬프와 참가자 ID가 포함됩니다.',
  },
  {
    title: '초대',
    body: '참여 링크와 QR 코드입니다. 이메일이나 랜딩 페이지용 웹 링크를 복사하거나, 다른 자료에 삽입하려면 딥 링크를 사용하십시오.',
  },
  {
    title: '설정',
    body: '연구 이름, 설명, 동의서, 등록 옵션 및 고급 구성입니다.',
  },
  {
    title: '승인',
    body: '연구의 공개 게재를 요청합니다. 공개 연구 페이지에 표시되기 전에 필요합니다.',
  },
  {
    title: 'Stream API',
    body: '참가자 이벤트를 실시간으로 수신하도록 웹훅을 구성합니다. 자세한 내용은 Stream API 가이드를 참조하십시오.',
  },
];

const FORM_FIELDS_IT = [
  {
    name: 'Nome dello studio',
    required: true,
    body: "Il nome del Suo studio. I partecipanti vedono questo nome nell'app e nella pagina degli studi pubblici.",
  },
  {
    name: 'Descrizione',
    required: false,
    body: "Una breve panoramica dello studio mostrata ai partecipanti nell'app e nella pagina degli studi pubblici.",
  },
  {
    name: 'Modulo di consenso',
    required: false,
    body: "Visualizzato quando i partecipanti toccano 'Partecipa allo studio'. Per la ricerca su soggetti umani, dovrebbe coprire scopo, procedure, rischi, gestione dei dati e modalità di recesso.",
  },
  {
    name: 'Messaggio dopo l\'iscrizione',
    required: false,
    body: 'Visualizzato immediatamente dopo l\'iscrizione completata. Lo utilizzi per confermare la registrazione e definire le aspettative — ad esempio, quando arriverà la prima notifica.',
  },
  {
    name: 'Messaggio di completamento',
    required: false,
    body: 'Visualizzato quando Samply rileva che un partecipante ha inviato una risposta al sondaggio. Pertinente quando si reindirizzano i partecipanti a un URL di completamento Samply.',
  },
];

const WORKSPACE_SECTIONS_IT = [
  {
    title: 'Panoramica',
    body: 'Il pannello dello studio: numero di partecipanti, statistiche delle notifiche, conformità a 7 giorni e attività recente. È anche il luogo in cui si attiva lo studio.',
  },
  {
    title: 'Partecipanti',
    body: 'Tutti gli iscritti — il loro ID Samply pseudonimo, la data di iscrizione, il gruppo assegnato (se presente), il fuso orario e la cronologia delle risposte.',
  },
  {
    title: 'Pianificazione',
    body: 'Tutte le pianificazioni di notifica associate a questo studio. Aggiunga, visualizzi ed elimini le pianificazioni qui. Ogni pianificazione si espande in una coda di invii per partecipante.',
  },
  {
    title: 'Dati',
    body: 'Registrazioni delle risposte inviate tramite i link del sondaggio, con timestamp e ID dei partecipanti.',
  },
  {
    title: 'Inviti',
    body: 'I Suoi link di accesso e il codice QR. Copi il link web per e-mail o una landing page, oppure utilizzi il deep link per incorporarlo in altri materiali.',
  },
  {
    title: 'Impostazioni',
    body: 'Nome dello studio, descrizione, modulo di consenso, opzioni di iscrizione e configurazione avanzata.',
  },
  {
    title: 'Approvazione',
    body: 'Richieda la pubblicazione pubblica del Suo studio. Necessaria prima che lo studio appaia nella pagina degli studi pubblici.',
  },
  {
    title: 'Stream API',
    body: 'Configuri i webhook per ricevere gli eventi dei partecipanti in tempo reale. Consulti la guida Stream API per i dettagli.',
  },
];

function FirstStudyContentKo() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>1단계 — 연구 만들기</h2>
      <p>
        대시보드에서 <strong>새 연구</strong>를 클릭하십시오. 아래 필드가 포함된 양식이 표시됩니다.
        <strong>연구 이름</strong>만 필수이며, 나머지는 지금 입력하거나 나중에 연구의 설정 탭에서 편집할 수 있습니다.
      </p>

      <table>
        <thead>
          <tr>
            <th>필드</th>
            <th>필수 여부</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_KO.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: f.required ? 'var(--coral)' : 'var(--ink-40)' }}>
                {f.required ? '예' : '선택'}
              </td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>연구 만들기</strong>를 클릭하십시오. Samply가 연구를 생성하고 연구 작업 공간으로 이동합니다.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>2단계 — 작업 공간 파악하기</h2>
      <p>
        연구 작업 공간에는 연구 페이지 상단의 탐색 메뉴에서 접근할 수 있는 여덟 개의 탭이 있습니다.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_KO.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>3단계 — 연구 활성화하기</h2>
      <p>
        새 연구는 <strong>초안</strong> 상태로 시작됩니다. 초안 상태에서는 참여 링크 랜딩 페이지가 신규 등록을 거부합니다 — 참가자에게 "연구를 이용할 수 없습니다"라는 메시지가 표시됩니다.
      </p>
      <p>
        등록을 열려면: 연구의 <strong>개요</strong> 탭으로 이동하여 <strong>연구 활성화</strong>를 클릭하십시오.
        상태가 <strong>진행 중</strong>으로 변경됩니다. 동일한 버튼을 다시 클릭하면 언제든지 등록을 일시 중지할 수 있습니다 — 데이터 손실 없이 연구가 초안 상태로 돌아갑니다.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>4단계 — 첫 번째 일정 추가하기</h2>
      <p>
        빈 연구는 아무것도 발송하지 않습니다. 일정이 연구를 실제로 운영되는 연구로 만듭니다.
        <strong>일정</strong> 탭으로 이동하여 <strong>일정 추가</strong>를 클릭하십시오.
      </p>
      <p>
        첫 번째 일정을 만들기 전에 <a href='/docs/types'>네 가지 일정 유형</a>을 읽어보십시오 —
        연구 설계에 맞는 올바른 유형을 선택하는 것이 Samply의 다른 어떤 단일 결정보다 중요합니다. 필요한 유형을 파악한 후에는 <a href='/docs/form'>일정 만들기</a>에서
        양식을 필드별로 안내합니다.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>5단계 — 참가자 초대하기</h2>
      <p>
        <strong>초대</strong>로 이동하여 모집 채널에 맞는 링크 또는 QR 코드를 복사하십시오. 참가자는 Samply Research 앱이 설치된 기기에서 링크를 탭하면 즉시 등록됩니다.
      </p>
      <p>
        코드와 그룹이 참여 흐름과 상호 작용하는 방식 등 전체 세부 정보는{' '}
        <a href='/docs/invite'>참가자 초대하기</a>에서 확인하십시오.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>고급 설정</h3>
      <p>
        연구의 <strong>설정</strong> 탭에는 기본 연구에서는 무시할 수 있는 선택적 기능도 포함되어 있습니다: 등록 시 참가자에게 사용자 지정 코드 또는 그룹 요청, 이벤트 조건 설계, 지오펜스 트리거, 알림 동작 버튼, 웹훅. 각 기능은 기본적으로 비활성화되어 있으며 고급 기능 및 심화 기능 섹션에서 별도로 문서화되어 있습니다.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>첫 번째 연구 체크리스트</h3>
      <ol>
        <li>이름이 있는 연구가 생성되었습니다.</li>
        <li>동의서가 작성되었습니다.</li>
        <li>일정이 하나 이상 추가되었습니다.</li>
        <li>연구가 활성화되었습니다(상태가 초안에서 진행 중으로 변경됨).</li>
        <li>참여 링크가 최소 한 명의 참가자와 공유되었습니다.</li>
        <li>첫 번째 알림이 수신되고 설문 응답이 확인되었습니다.</li>
      </ol>
    </>
  );
}

function FirstStudyContentIt() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Passaggio 1 — Creare lo studio</h2>
      <p>
        Dal pannello di controllo, faccia clic su <strong>Nuovo studio</strong>. Vedrà un modulo con i campi indicati di seguito.
        Solo il <strong>Nome dello studio</strong> è obbligatorio; tutto il resto può essere compilato ora o modificato in seguito dalla scheda Impostazioni dello studio.
      </p>

      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obbligatorio</th>
            <th>Descrizione</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_IT.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: f.required ? 'var(--coral)' : 'var(--ink-40)' }}>
                {f.required ? 'sì' : 'opzionale'}
              </td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Faccia clic su <strong>Crea studio</strong>. Samply crea lo studio e La porta all'area di lavoro dello studio.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Passaggio 2 — Conoscere l'area di lavoro</h2>
      <p>
        L'area di lavoro dello studio ha otto schede, accessibili dalla navigazione in cima alla pagina dello studio.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_IT.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Passaggio 3 — Attivare lo studio</h2>
      <p>
        Un nuovo studio inizia con lo stato <strong>Bozza</strong>. In modalità Bozza, la landing page del link di accesso
        rifiuta le nuove iscrizioni — i partecipanti vedono il messaggio "studio non disponibile".
      </p>
      <p>
        Per aprire le iscrizioni: vada alla scheda <strong>Panoramica</strong> dello studio e faccia clic su <strong>Attiva studio</strong>.
        Lo stato cambia in <strong>Attivo</strong>. Può mettere in pausa le iscrizioni in qualsiasi momento facendo clic
        sullo stesso pulsante di nuovo — lo studio torna in Bozza senza perdere alcun dato.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Passaggio 4 — Aggiungere la prima pianificazione</h2>
      <p>
        Uno studio vuoto non invia nulla. Le pianificazioni sono ciò che lo trasformano in uno studio attivo.
        Vada alla scheda <strong>Pianificazione</strong> e faccia clic su <strong>Aggiungi pianificazione</strong>.
      </p>
      <p>
        Prima di creare la prima pianificazione, legga <a href='/docs/types'>I quattro tipi di pianificazione</a> —
        scegliere il tipo giusto per il Suo disegno di ricerca è più importante di qualsiasi altra singola decisione in
        Samply. Una volta individuato il tipo necessario, <a href='/docs/form'>Creare una pianificazione</a> La guiderà
        campo per campo attraverso il modulo.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Passaggio 5 — Invitare i partecipanti</h2>
      <p>
        Vada a <strong>Inviti</strong> e copi il link o il codice QR adatto al Suo canale di reclutamento.
        I partecipanti toccano il link su un dispositivo con l'app Samply Research installata e
        vengono iscritti immediatamente.
      </p>
      <p>
        I dettagli completi — incluso come codici e gruppi interagiscono con il flusso di accesso — si trovano in{' '}
        <a href='/docs/invite'>Invitare i partecipanti</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Impostazioni avanzate</h3>
      <p>
        La scheda <strong>Impostazioni</strong> dello studio contiene anche funzionalità opzionali che può ignorare per uno studio di base:
        richiedere ai partecipanti un codice personalizzato o un gruppo all'iscrizione, disegni contingenti a eventi,
        trigger geofence, pulsanti di azione nelle notifiche e webhook. Ognuna è disattivata per impostazione predefinita e
        documentata separatamente nelle sezioni Funzionalità avanzate e Funzionalità potenziate.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Lista di controllo per il primo studio</h3>
      <ol>
        <li>Studio creato con un nome.</li>
        <li>Modulo di consenso compilato.</li>
        <li>Almeno una pianificazione aggiunta.</li>
        <li>Studio attivato (stato cambiato da Bozza ad Attivo).</li>
        <li>Link di accesso condiviso con almeno un partecipante.</li>
        <li>Prima notifica ricevuta e risposta al sondaggio confermata.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_FR = [
  {
    name: "Nom de l'étude",
    required: true,
    body: "Le nom de votre étude. Les participants voient ce nom dans l'application et sur la page des études publiques.",
  },
  {
    name: "Description",
    required: false,
    body: "Un bref aperçu de l'étude affiché aux participants dans l'application et sur la page des études publiques.",
  },
  {
    name: "Formulaire de consentement",
    required: false,
    body: "Affiché lorsque les participants appuient sur « Rejoindre l'étude ». Pour la recherche sur des sujets humains, il doit couvrir le but, les procédures, les risques, le traitement des données et les modalités de retrait.",
  },
  {
    name: "Message après l'inscription",
    required: false,
    body: "Affiché immédiatement après une inscription réussie. Utilisez-le pour confirmer l'inscription et définir les attentes — par exemple, quand la première notification arrivera.",
  },
  {
    name: "Message de complétion",
    required: false,
    body: "Affiché lorsque Samply détecte qu'un participant a soumis une réponse à un sondage. Pertinent lorsque vous redirigez les participants vers une URL de complétion Samply.",
  },
];

const WORKSPACE_SECTIONS_FR = [
  {
    title: "Vue d'ensemble",
    body: "Le tableau de bord de l'étude : nombre de participants, statistiques des notifications, conformité sur 7 jours et activité récente. C'est aussi ici que vous activez l'étude.",
  },
  {
    title: "Participants",
    body: "Tous les inscrits — leur ID Samply pseudonyme, la date d'inscription, le groupe attribué (le cas échéant), le fuseau horaire et l'historique des réponses.",
  },
  {
    title: "Planification",
    body: "Toutes les planifications de notifications associées à cette étude. Ajoutez, consultez et supprimez les planifications ici. Chaque planification se développe en une file d'attente d'envois par participant.",
  },
  {
    title: "Données",
    body: "Les enregistrements de réponses soumis via vos liens de sondage, avec horodatages et ID des participants.",
  },
  {
    title: "Invitations",
    body: "Vos liens d'accès et QR code. Copiez le lien web pour un e-mail ou une page d'atterrissage, ou utilisez le lien profond pour l'intégrer dans d'autres supports.",
  },
  {
    title: "Paramètres",
    body: "Nom de l'étude, description, formulaire de consentement, options d'inscription et configuration avancée.",
  },
  {
    title: "Approbation",
    body: "Demandez la publication publique de votre étude. Requis avant que l'étude apparaisse sur la page des études publiques.",
  },
  {
    title: "Stream API",
    body: "Configurez des webhooks pour recevoir les événements des participants en temps réel. Consultez le guide Stream API pour plus de détails.",
  },
];

function FirstStudyContentFr() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Étape 1 — Créer l'étude</h2>
      <p>
        Depuis le tableau de bord, cliquez sur <strong>Nouvelle étude</strong>. Vous verrez un formulaire avec les champs ci-dessous.
        Seul le <strong>Nom de l'étude</strong> est obligatoire ; tout le reste peut être rempli maintenant ou modifié ultérieurement depuis l'onglet Paramètres de l'étude.
      </p>

      <table>
        <thead>
          <tr>
            <th>Champ</th>
            <th>Obligatoire</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_FR.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "oui" : "optionnel"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Cliquez sur <strong>Créer l'étude</strong>. Samply crée l'étude et vous amène à l'espace de travail de l'étude.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Étape 2 — Découvrir votre espace de travail</h2>
      <p>
        L'espace de travail de l'étude comporte huit onglets, accessibles depuis la navigation en haut de la page de l'étude.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_FR.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Étape 3 — Activer l'étude</h2>
      <p>
        Une nouvelle étude commence avec le statut <strong>Brouillon</strong>. En mode Brouillon, la page d'atterrissage du lien d'accès
        refuse les nouvelles inscriptions — les participants voient un message « étude non disponible ».
      </p>
      <p>
        Pour ouvrir les inscriptions : rendez-vous dans l'onglet <strong>Vue d'ensemble</strong> de l'étude et cliquez sur <strong>Activer l'étude</strong>.
        Le statut passe à <strong>En ligne</strong>. Vous pouvez mettre les inscriptions en pause à tout moment en cliquant
        de nouveau sur le même bouton — l'étude revient en mode Brouillon sans perdre aucune donnée.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Étape 4 — Ajouter votre première planification</h2>
      <p>
        Une étude vide n'envoie rien. Les planifications sont ce qui la transforment en une étude active.
        Rendez-vous dans l'onglet <strong>Planification</strong> et cliquez sur <strong>Ajouter une planification</strong>.
      </p>
      <p>
        Avant de créer votre première planification, lisez <a href="/docs/types">Les quatre types de planification</a> —
        choisir le bon type pour votre design de recherche est plus important que toute autre décision dans
        Samply. Une fois que vous savez de quel type vous avez besoin, <a href="/docs/form">Créer une planification</a> vous guide
        champ par champ à travers le formulaire.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Étape 5 — Inviter des participants</h2>
      <p>
        Rendez-vous dans <strong>Invitations</strong> et copiez le lien ou le QR code adapté à votre canal de recrutement.
        Les participants appuient sur le lien sur un appareil avec l'application Samply Research installée et
        sont inscrits immédiatement.
      </p>
      <p>
        Les détails complets — y compris la façon dont les codes et les groupes interagissent avec le flux d'accès — se trouvent dans{" "}
        <a href="/docs/invite">Inviter des participants</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Paramètres avancés</h3>
      <p>
        L'onglet <strong>Paramètres</strong> de l'étude contient également des fonctionnalités optionnelles que vous pouvez ignorer pour une étude de base :
        demander aux participants un code personnalisé ou un groupe lors de l'inscription, les designs contingents à des événements,
        les déclencheurs de géofence, les boutons d'action de notification et les webhooks. Chacune est désactivée par défaut et
        documentée séparément dans les sections Fonctionnalités avancées et Fonctionnalités supplémentaires.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Liste de contrôle pour la première étude</h3>
      <ol>
        <li>Étude créée avec un nom.</li>
        <li>Formulaire de consentement rempli.</li>
        <li>Au moins une planification ajoutée.</li>
        <li>Étude activée (statut passé de Brouillon à En ligne).</li>
        <li>Lien d'accès partagé avec au moins un participant.</li>
        <li>Première notification reçue et réponse au sondage confirmée.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_ES = [
  {
    name: "Nombre del estudio",
    required: true,
    body: "El nombre de su estudio. Los participantes ven este nombre en la aplicación y en la página de estudios públicos.",
  },
  {
    name: "Descripción",
    required: false,
    body: "Un breve resumen del estudio que se muestra a los participantes en la aplicación y en la página de estudios públicos.",
  },
  {
    name: "Formulario de consentimiento",
    required: false,
    body: "Se muestra cuando los participantes pulsan «Unirse al estudio». Para investigaciones con sujetos humanos, debe cubrir el propósito, los procedimientos, los riesgos, el tratamiento de datos y cómo retirarse.",
  },
  {
    name: "Mensaje tras unirse",
    required: false,
    body: "Se muestra inmediatamente después de una inscripción exitosa. Úselo para confirmar el registro y establecer expectativas — por ejemplo, cuándo llegará la primera notificación.",
  },
  {
    name: "Mensaje de finalización",
    required: false,
    body: "Se muestra cuando Samply detecta que un participante ha enviado una respuesta de encuesta. Relevante cuando redirige a los participantes a una URL de finalización de Samply.",
  },
];

const WORKSPACE_SECTIONS_ES = [
  {
    title: "Resumen",
    body: "El panel del estudio: número de participantes, estadísticas de notificaciones, cumplimiento de 7 días y actividad reciente. Aquí también se activa el estudio.",
  },
  {
    title: "Participantes",
    body: "Todos los inscritos — su ID de Samply seudónimo, la fecha de inscripción, el grupo asignado (si corresponde), la zona horaria y el historial de respuestas.",
  },
  {
    title: "Calendario",
    body: "Todos los calendarios de notificaciones asociados a este estudio. Agregue, consulte y elimine calendarios aquí. Cada calendario se expande en una cola de envíos por participante.",
  },
  {
    title: "Datos",
    body: "Registros de respuestas enviados a través de sus enlaces de encuesta, con marcas de tiempo e ID de participantes.",
  },
  {
    title: "Invitaciones",
    body: "Sus enlaces de acceso y código QR. Copie el enlace web para un correo electrónico o una página de destino, o use el enlace profundo para insertarlo en otros materiales.",
  },
  {
    title: "Configuración",
    body: "Nombre del estudio, descripción, formulario de consentimiento, opciones de inscripción y configuración avanzada.",
  },
  {
    title: "Aprobación",
    body: "Solicite la publicación pública de su estudio. Necesario antes de que el estudio aparezca en la página de estudios públicos.",
  },
  {
    title: "Stream API",
    body: "Configure webhooks para recibir eventos de participantes en tiempo real. Consulte la guía de Stream API para obtener más detalles.",
  },
];

function FirstStudyContentEs() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Paso 1 — Crear el estudio</h2>
      <p>
        Desde el panel, haga clic en <strong>Nuevo estudio</strong>. Verá un formulario con los campos indicados a continuación.
        Solo el <strong>Nombre del estudio</strong> es obligatorio; todo lo demás puede rellenarse ahora o editarse más tarde desde la pestaña Configuración del estudio.
      </p>

      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obligatorio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_ES.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "sí" : "opcional"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Haga clic en <strong>Crear estudio</strong>. Samply crea el estudio y le lleva al espacio de trabajo del estudio.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Paso 2 — Conocer su espacio de trabajo</h2>
      <p>
        El espacio de trabajo del estudio tiene ocho pestañas, accesibles desde la navegación en la parte superior de la página del estudio.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_ES.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Paso 3 — Activar el estudio</h2>
      <p>
        Un nuevo estudio comienza con el estado <strong>Borrador</strong>. En modo Borrador, la página de destino del enlace de acceso
        rechaza las nuevas inscripciones — los participantes ven un mensaje de «estudio no disponible».
      </p>
      <p>
        Para abrir las inscripciones: vaya a la pestaña <strong>Resumen</strong> del estudio y haga clic en <strong>Activar estudio</strong>.
        El estado cambia a <strong>En línea</strong>. Puede pausar las inscripciones en cualquier momento haciendo clic
        en el mismo botón de nuevo — el estudio vuelve al modo Borrador sin perder ningún dato.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Paso 4 — Agregar su primer calendario</h2>
      <p>
        Un estudio vacío no envía nada. Los calendarios son lo que lo convierten en un estudio activo.
        Vaya a la pestaña <strong>Calendario</strong> y haga clic en <strong>Agregar calendario</strong>.
      </p>
      <p>
        Antes de crear su primer calendario, lea <a href="/docs/types">Los cuatro tipos de calendario</a> —
        elegir el tipo correcto para su diseño de investigación es más importante que cualquier otra decisión en
        Samply. Una vez que sepa qué tipo necesita, <a href="/docs/form">Crear un calendario</a> le guiará
        campo por campo a través del formulario.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Paso 5 — Invitar participantes</h2>
      <p>
        Vaya a <strong>Invitaciones</strong> y copie el enlace o el código QR que se adapte a su canal de reclutamiento.
        Los participantes pulsan el enlace en un dispositivo con la aplicación Samply Research instalada y
        quedan inscritos de inmediato.
      </p>
      <p>
        Los detalles completos — incluido cómo los códigos y los grupos interactúan con el flujo de acceso — se encuentran en{" "}
        <a href="/docs/invite">Invitar participantes</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Configuración avanzada</h3>
      <p>
        La pestaña <strong>Configuración</strong> del estudio también contiene funciones opcionales que puede ignorar para un estudio básico:
        solicitar a los participantes un código personalizado o un grupo al inscribirse, diseños contingentes a eventos,
        activadores de geofencing, botones de acción de notificación y webhooks. Cada función está desactivada por defecto y
        documentada por separado en las secciones de Funciones avanzadas y Funciones adicionales.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Lista de verificación del primer estudio</h3>
      <ol>
        <li>Estudio creado con un nombre.</li>
        <li>Formulario de consentimiento rellenado.</li>
        <li>Al menos un calendario agregado.</li>
        <li>Estudio activado (estado cambiado de Borrador a En línea).</li>
        <li>Enlace de acceso compartido con al menos un participante.</li>
        <li>Primera notificación recibida y respuesta de encuesta confirmada.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_PT = [
  {
    name: "Nome do estudo",
    required: true,
    body: "O nome do seu estudo. Os participantes veem esse nome no aplicativo e na página de estudos públicos.",
  },
  {
    name: "Descrição",
    required: false,
    body: "Um breve resumo do estudo exibido aos participantes no aplicativo e na página de estudos públicos.",
  },
  {
    name: "Formulário de consentimento",
    required: false,
    body: "Exibido quando os participantes tocam em «Participar do estudo». Para pesquisas com seres humanos, deve cobrir o objetivo, os procedimentos, os riscos, o tratamento de dados e como se retirar.",
  },
  {
    name: "Mensagem após a inscrição",
    required: false,
    body: "Exibida imediatamente após uma inscrição bem-sucedida. Use-a para confirmar o cadastro e definir expectativas — por exemplo, quando chegará a primeira notificação.",
  },
  {
    name: "Mensagem de conclusão",
    required: false,
    body: "Exibida quando o Samply detecta que um participante enviou uma resposta de pesquisa. Relevante quando você redireciona os participantes para uma URL de conclusão do Samply.",
  },
];

const WORKSPACE_SECTIONS_PT = [
  {
    title: "Visão geral",
    body: "O painel do estudo: número de participantes, estatísticas de notificações, conformidade de 7 dias e atividade recente. Aqui também é onde você ativa o estudo.",
  },
  {
    title: "Participantes",
    body: "Todos os inscritos — seu ID Samply pseudônimo, a data de inscrição, o grupo atribuído (se houver), o fuso horário e o histórico de respostas.",
  },
  {
    title: "Calendário",
    body: "Todos os calendários de notificações associados a este estudo. Adicione, consulte e exclua calendários aqui. Cada calendário se expande em uma fila de envios por participante.",
  },
  {
    title: "Dados",
    body: "Registros de respostas enviados por meio dos seus links de pesquisa, com carimbos de data/hora e IDs de participantes.",
  },
  {
    title: "Convites",
    body: "Seus links de acesso e código QR. Copie o link da web para um e-mail ou uma página de destino, ou use o link direto para incorporá-lo em outros materiais.",
  },
  {
    title: "Configurações",
    body: "Nome do estudo, descrição, formulário de consentimento, opções de inscrição e configuração avançada.",
  },
  {
    title: "Aprovação",
    body: "Solicite a publicação pública do seu estudo. Necessário antes de o estudo aparecer na página de estudos públicos.",
  },
  {
    title: "Stream API",
    body: "Configure webhooks para receber eventos de participantes em tempo real. Consulte o guia da Stream API para obter mais detalhes.",
  },
];

function FirstStudyContentPt() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Etapa 1 — Criar o estudo</h2>
      <p>
        No painel, clique em <strong>Novo estudo</strong>. Você verá um formulário com os campos indicados abaixo.
        Somente o <strong>Nome do estudo</strong> é obrigatório; todo o restante pode ser preenchido agora ou editado posteriormente na aba Configurações do estudo.
      </p>

      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obrigatório</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_PT.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "sim" : "opcional"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Clique em <strong>Criar estudo</strong>. O Samply cria o estudo e leva você ao espaço de trabalho do estudo.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Etapa 2 — Conhecer seu espaço de trabalho</h2>
      <p>
        O espaço de trabalho do estudo tem oito abas, acessíveis pela navegação na parte superior da página do estudo.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_PT.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Etapa 3 — Ativar o estudo</h2>
      <p>
        Um novo estudo começa com o status <strong>Rascunho</strong>. No modo Rascunho, a página de destino do link de acesso
        recusa novas inscrições — os participantes veem uma mensagem de «estudo não disponível».
      </p>
      <p>
        Para abrir as inscrições: vá à aba <strong>Visão geral</strong> do estudo e clique em <strong>Ativar estudo</strong>.
        O status muda para <strong>Ativo</strong>. Você pode pausar as inscrições a qualquer momento clicando
        no mesmo botão novamente — o estudo volta ao modo Rascunho sem perder nenhum dado.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Etapa 4 — Adicionar seu primeiro calendário</h2>
      <p>
        Um estudo vazio não envia nada. Os calendários são o que o transformam em um estudo ativo.
        Vá à aba <strong>Calendário</strong> e clique em <strong>Adicionar calendário</strong>.
      </p>
      <p>
        Antes de criar seu primeiro calendário, leia <a href="/docs/types">Os quatro tipos de calendário</a> —
        escolher o tipo certo para o seu design de pesquisa é mais importante do que qualquer outra decisão individual no
        Samply. Assim que souber qual tipo precisa, <a href="/docs/form">Criar um calendário</a> vai guiá-lo
        campo a campo pelo formulário.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Etapa 5 — Convidar participantes</h2>
      <p>
        Vá a <strong>Convites</strong> e copie o link ou o código QR adequado ao seu canal de recrutamento.
        Os participantes tocam no link em um dispositivo com o aplicativo Samply Research instalado e
        ficam inscritos imediatamente.
      </p>
      <p>
        Os detalhes completos — incluindo como os códigos e grupos interagem com o fluxo de acesso — estão em{" "}
        <a href="/docs/invite">Convidar participantes</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Configurações avançadas</h3>
      <p>
        A aba <strong>Configurações</strong> do estudo também contém funcionalidades opcionais que você pode ignorar para um estudo básico:
        solicitar aos participantes um código personalizado ou um grupo no momento da inscrição, designs contingentes a eventos,
        gatilhos de geofencing, botões de ação de notificação e webhooks. Cada funcionalidade está desativada por padrão e
        documentada separadamente nas seções de Funcionalidades avançadas e Funcionalidades adicionais.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Lista de verificação do primeiro estudo</h3>
      <ol>
        <li>Estudo criado com um nome.</li>
        <li>Formulário de consentimento preenchido.</li>
        <li>Pelo menos um calendário adicionado.</li>
        <li>Estudo ativado (status alterado de Rascunho para Ativo).</li>
        <li>Link de acesso compartilhado com pelo menos um participante.</li>
        <li>Primeira notificação recebida e resposta de pesquisa confirmada.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_JA = [
  {
    name: "研究名",
    required: true,
    body: "研究の名前です。参加者はこの名前をアプリと公開研究ページで見ます。",
  },
  {
    name: "説明",
    required: false,
    body: "アプリと公開研究ページで参加者に表示される研究の短い概要です。",
  },
  {
    name: "同意書",
    required: false,
    body: "参加者が「研究に参加する」をタップしたときに表示されます。人を対象とする研究の場合、目的、手順、リスク、データの取り扱い、撤回方法をカバーする必要があります。",
  },
  {
    name: "登録後のメッセージ",
    required: false,
    body: "登録に成功した直後に表示されます。登録を確認し、最初の通知がいつ届くかなど、期待値を設定するために使用します。",
  },
  {
    name: "完了メッセージ",
    required: false,
    body: "Samplyが参加者の調査回答送信を検出したときに表示されます。参加者をSamplyの完了URLにリダイレクトする場合に関連します。",
  },
];

const WORKSPACE_SECTIONS_JA = [
  {
    title: "概要",
    body: "研究のダッシュボード: 参加者数、通知統計、7日間の遵守率、最近のアクティビティ。ここで研究をアクティブ化することもできます。",
  },
  {
    title: "参加者",
    body: "登録されたすべての人 — 仮名のSamply ID、登録日、割り当てられたグループ（ある場合）、タイムゾーン、回答履歴。",
  },
  {
    title: "スケジュール",
    body: "この研究に関連するすべての通知スケジュール。ここでスケジュールを追加、表示、削除します。各スケジュールは参加者ごとの送信キューに展開されます。",
  },
  {
    title: "データ",
    body: "調査リンクを介して送信された回答記録。タイムスタンプと参加者IDが含まれます。",
  },
  {
    title: "招待",
    body: "参加リンクとQRコード。Webリンクをメールやランディングページにコピーするか、ディープリンクを使用して他のマテリアルに埋め込みます。",
  },
  {
    title: "設定",
    body: "研究名、説明、同意書、登録オプション、および高度な設定。",
  },
  {
    title: "承認",
    body: "研究の公開を申請します。研究が公開研究ページに表示される前に必要です。",
  },
  {
    title: "Stream API",
    body: "リアルタイムで参加者イベントを受信するためのwebhookを設定します。詳細はStream APIガイドを参照してください。",
  },
];

function FirstStudyContentJa() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>ステップ1 — 研究を作成する</h2>
      <p>
        ダッシュボードで<strong>新規研究</strong>をクリックします。以下のフィールドを含むフォームが表示されます。
        必須なのは<strong>研究名</strong>のみで、その他はすべて今入力するか、後で研究の設定タブで編集できます。
      </p>

      <table>
        <thead>
          <tr>
            <th>フィールド</th>
            <th>必須</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_JA.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "はい" : "任意"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>研究を作成</strong>をクリックします。Samplyは研究を作成し、研究のワークスペースに案内します。
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>ステップ2 — ワークスペースを知る</h2>
      <p>
        研究のワークスペースには8つのタブがあり、研究ページ上部のナビゲーションからアクセスできます。
      </p>

      <dl>
        {WORKSPACE_SECTIONS_JA.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>ステップ3 — 研究をアクティブ化する</h2>
      <p>
        新しい研究は<strong>下書き</strong>ステータスで開始されます。下書きモードでは、参加リンクのランディングページは
        新規登録を拒否します — 参加者には「研究は利用できません」というメッセージが表示されます。
      </p>
      <p>
        登録を開始するには: 研究の<strong>概要</strong>タブに移動し、<strong>研究をアクティブ化</strong>をクリックします。
        ステータスが<strong>アクティブ</strong>に変わります。同じボタンをもう一度クリックすることで、いつでも登録を一時停止できます —
        データを失うことなく研究は下書きモードに戻ります。
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>ステップ4 — 初めてのスケジュールを追加する</h2>
      <p>
        空の研究は何も送信しません。スケジュールが研究をアクティブな研究に変えるものです。
        <strong>スケジュール</strong>タブに移動し、<strong>スケジュールを追加</strong>をクリックします。
      </p>
      <p>
        最初のスケジュールを作成する前に、<a href="/docs/types">スケジュールの4つのタイプ</a>をお読みください —
        研究デザインに適したタイプを選ぶことは、Samplyにおける他のどの個別の決定よりも重要です。
        必要なタイプがわかったら、<a href="/docs/form">スケジュールの作成</a>がフィールドごとにフォームを案内します。
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>ステップ5 — 参加者を招待する</h2>
      <p>
        <strong>招待</strong>に移動し、募集チャネルに適したリンクまたはQRコードをコピーします。
        参加者はSamply Researchアプリがインストールされたデバイスでリンクをタップすると、すぐに登録されます。
      </p>
      <p>
        コードとグループが参加フローとどのように連携するかを含む完全な詳細は、{" "}
        <a href="/docs/invite">参加者を招待する</a>にあります。
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>高度な設定</h3>
      <p>
        研究の<strong>設定</strong>タブには、基本的な研究では無視できる任意の機能も含まれています:
        登録時に参加者にカスタムコードまたはグループを尋ねる、イベント依存デザイン、
        ジオフェンシングトリガー、通知アクションボタン、webhookなどです。各機能はデフォルトで無効になっており、
        高度な機能および追加機能のセクションで個別に文書化されています。
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>初めての研究チェックリスト</h3>
      <ol>
        <li>名前付きで研究を作成。</li>
        <li>同意書を入力。</li>
        <li>少なくとも1つのスケジュールを追加。</li>
        <li>研究をアクティブ化（ステータスを下書きからアクティブに変更）。</li>
        <li>少なくとも1人の参加者と参加リンクを共有。</li>
        <li>最初の通知を受信し、調査回答を確認。</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_TR = [
  {
    name: "Çalışma adı",
    required: true,
    body: "Çalışmanızın adı. Katılımcılar bu adı uygulamada ve genel çalışmalar sayfasında görür.",
  },
  {
    name: "Açıklama",
    required: false,
    body: "Uygulamada ve genel çalışmalar sayfasında katılımcılara gösterilen çalışmanın kısa bir özeti.",
  },
  {
    name: "Onam formu",
    required: false,
    body: "Katılımcılar «Çalışmaya katıl» seçeneğine dokunduğunda görüntülenir. İnsan deneklerle yapılan araştırmalarda çalışmanın amacını, prosedürlerini, risklerini, veri işlemeyi ve geri çekilme yöntemini kapsamalıdır.",
  },
  {
    name: "Katılım sonrası mesaj",
    required: false,
    body: "Başarılı kayıttan hemen sonra gösterilir. Kayıt onayını vermek ve beklentileri belirlemek için kullanın — örneğin ilk bildirimin ne zaman geleceği.",
  },
  {
    name: "Tamamlanma mesajı",
    required: false,
    body: "Samply, bir katılımcının anket yanıtı gönderdiğini algıladığında görüntülenir. Katılımcıları bir Samply tamamlanma URL'sine yönlendirdiğinizde geçerlidir.",
  },
];

const WORKSPACE_SECTIONS_TR = [
  {
    title: "Genel bakış",
    body: "Çalışma paneli: katılımcı sayısı, bildirim istatistikleri, 7 günlük uyum oranı ve son etkinlikler. Çalışmayı da buradan etkinleştirirsiniz.",
  },
  {
    title: "Katılımcılar",
    body: "Kayıtlı herkes — takma adlı Samply kimlikleri, kayıt tarihleri, atanmış grupları (varsa), saat dilimleri ve yanıt geçmişleri.",
  },
  {
    title: "Program",
    body: "Bu çalışmaya bağlı tüm bildirim programları. Programları buradan ekleyin, görüntüleyin ve silin. Her program katılımcı başına bir gönderim kuyruğuna genişler.",
  },
  {
    title: "Veriler",
    body: "Anket bağlantılarınız aracılığıyla gönderilen yanıt kayıtları, zaman damgaları ve katılımcı kimlikleriyle birlikte.",
  },
  {
    title: "Davetler",
    body: "Katılım bağlantılarınız ve QR kodunuz. E-posta veya açılış sayfası için web bağlantısını kopyalayın ya da diğer materyallere yerleştirmek için derin bağlantıyı kullanın.",
  },
  {
    title: "Ayarlar",
    body: "Çalışma adı, açıklama, onam formu, kayıt seçenekleri ve gelişmiş yapılandırma.",
  },
  {
    title: "Onay",
    body: "Çalışmanız için genel listeleme talep edin. Çalışmanın genel çalışmalar sayfasında görünmesi için gereklidir.",
  },
  {
    title: "Stream API",
    body: "Katılımcı olaylarını gerçek zamanlı almak için webhook'ları yapılandırın. Ayrıntılar için Stream API kılavuzuna bakın.",
  },
];

function FirstStudyContentTr() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Adım 1 — Çalışmayı oluşturun</h2>
      <p>
        Panelden <strong>Yeni çalışma</strong> seçeneğine tıklayın. Aşağıdaki alanları içeren bir form göreceksiniz.
        Yalnızca <strong>Çalışma adı</strong> zorunludur; geri kalan her şey şimdi doldurulabilir veya daha sonra çalışmanın Ayarlar sekmesinden düzenlenebilir.
      </p>

      <table>
        <thead>
          <tr>
            <th>Alan</th>
            <th>Zorunlu</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_TR.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "Evet" : "İsteğe bağlı"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>Çalışmayı oluştur</strong> seçeneğine tıklayın. Samply çalışmayı oluşturur ve sizi çalışmanın çalışma alanına yönlendirir.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Adım 2 — Çalışma alanını tanıyın</h2>
      <p>
        Çalışmanın çalışma alanı, çalışma sayfasının üstündeki gezinme menüsünden erişebileceğiniz sekiz sekmeye sahiptir.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_TR.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Adım 3 — Çalışmayı etkinleştirin</h2>
      <p>
        Yeni bir çalışma <strong>taslak</strong> durumunda başlar. Taslak modunda katılım bağlantısının açılış sayfası yeni kayıtları reddeder
        — katılımcılar «Çalışma kullanılabilir değil» mesajını görür.
      </p>
      <p>
        Kayıtları başlatmak için: çalışmanın <strong>Genel bakış</strong> sekmesine gidin ve <strong>Çalışmayı etkinleştir</strong> seçeneğine tıklayın.
        Durum <strong>Etkin</strong> olarak değişir. Aynı düğmeye tekrar tıklayarak kayıtları istediğiniz zaman duraklatabilirsiniz —
        çalışma veri kaybı olmadan taslak moduna geri döner.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Adım 4 — İlk programınızı ekleyin</h2>
      <p>
        Boş bir çalışma hiçbir şey göndermez. Çalışmayı etkin bir çalışmaya dönüştüren şey programdır.
        <strong>Program</strong> sekmesine gidin ve <strong>Program ekle</strong> seçeneğine tıklayın.
      </p>
      <p>
        İlk programınızı oluşturmadan önce <a href="/docs/types">Programın dört türü</a> sayfasını okuyun —
        araştırma tasarımınıza uygun türü seçmek, Samply'da vereceğiniz diğer tüm tekil kararlardan daha önemlidir.
        Hangi türe ihtiyacınız olduğunu bildiğinizde, <a href="/docs/form">Program oluşturma</a> sayfası size formu alan alan tanıtacaktır.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Adım 5 — Katılımcıları davet edin</h2>
      <p>
        <strong>Davetler</strong> sekmesine gidin ve işe alım kanalınıza uygun bağlantı veya QR kodu kopyalayın.
        Katılımcılar bağlantıya Samply Research uygulamasının yüklü olduğu bir cihazda dokunduğunda anında kaydedilir.
      </p>
      <p>
        Kodların ve grupların katılım akışıyla nasıl etkileşime girdiği dahil olmak üzere ayrıntıların tamamı{" "}
        <a href="/docs/invite">Katılımcıları davet etme</a> sayfasındadır.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Gelişmiş ayarlar</h3>
      <p>
        Çalışmanın <strong>Ayarlar</strong> sekmesi, temel bir çalışma için göz ardı edebileceğiniz isteğe bağlı özellikleri de içerir:
        kayıt sırasında katılımcılardan özel bir kod veya grup istemek, olay bağımlı tasarımlar,
        geofencing tetikleyicileri, bildirim eylem düğmeleri ve webhook'lar gibi. Her özellik varsayılan olarak devre dışıdır ve
        gelişmiş özellikler ve ek özellikler bölümlerinde ayrı ayrı belgelenir.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>İlk çalışma kontrol listesi</h3>
      <ol>
        <li>Adlandırılmış bir çalışma oluşturun.</li>
        <li>Bir onam formu girin.</li>
        <li>En az bir program ekleyin.</li>
        <li>Çalışmayı etkinleştirin (durumu taslaktan etkine değiştirin).</li>
        <li>Katılım bağlantısını en az bir katılımcıyla paylaşın.</li>
        <li>İlk bildirimi alın ve anket yanıtını doğrulayın.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_PL = [
  {
    name: "Nazwa badania",
    required: true,
    body: "Nazwa Twojego badania. Uczestnicy widzą ją w aplikacji i na publicznej stronie badań.",
  },
  {
    name: "Opis",
    required: false,
    body: "Krótkie streszczenie badania pokazywane uczestnikom w aplikacji i na publicznej stronie badań.",
  },
  {
    name: "Formularz zgody",
    required: false,
    body: "Wyświetla się, gdy uczestnik dotknie «Dołącz do badania». W badaniach z udziałem ludzi powinien obejmować cel badania, procedury, ryzyka, przetwarzanie danych oraz sposób wycofania.",
  },
  {
    name: "Wiadomość po dołączeniu",
    required: false,
    body: "Pokazywana zaraz po pomyślnej rejestracji. Użyj jej, aby potwierdzić zapisanie i ustawić oczekiwania — na przykład kiedy nadejdzie pierwsze powiadomienie.",
  },
  {
    name: "Wiadomość o ukończeniu",
    required: false,
    body: "Wyświetlana, gdy Samply wykryje, że uczestnik przesłał odpowiedź ankiety. Ma zastosowanie, gdy kierujesz uczestników na adres URL ukończenia Samply.",
  },
];

const WORKSPACE_SECTIONS_PL = [
  {
    title: "Przegląd",
    body: "Panel badania: liczba uczestników, statystyki powiadomień, 7-dniowy wskaźnik zgodności i ostatnia aktywność. Stąd również aktywujesz badanie.",
  },
  {
    title: "Uczestnicy",
    body: "Wszyscy, którzy się zapisali — pseudonimowe identyfikatory Samply, daty rejestracji, przypisane grupy (jeśli istnieją), strefy czasowe i historia odpowiedzi.",
  },
  {
    title: "Harmonogram",
    body: "Wszystkie harmonogramy powiadomień przypisane do tego badania. Dodawaj, przeglądaj i usuwaj harmonogramy stąd. Każdy harmonogram rozwija się w kolejkę wysyłek na uczestnika.",
  },
  {
    title: "Dane",
    body: "Zapisy odpowiedzi przesłanych za pośrednictwem Twoich linków ankietowych, wraz ze znacznikami czasu i identyfikatorami uczestników.",
  },
  {
    title: "Zaproszenia",
    body: "Twoje linki dołączania i kod QR. Skopiuj link internetowy dla wiadomości e-mail lub strony docelowej albo użyj linku głębokiego do osadzenia w innych materiałach.",
  },
  {
    title: "Ustawienia",
    body: "Nazwa badania, opis, formularz zgody, opcje rejestracji i konfiguracja zaawansowana.",
  },
  {
    title: "Zatwierdzenie",
    body: "Poproś o publiczne wystawienie swojego badania. Wymagane, aby badanie pojawiło się na publicznej stronie badań.",
  },
  {
    title: "Stream API",
    body: "Skonfiguruj webhooki, aby otrzymywać zdarzenia uczestników w czasie rzeczywistym. Szczegóły znajdziesz w przewodniku Stream API.",
  },
];

function FirstStudyContentPl() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Krok 1 — Utwórz badanie</h2>
      <p>
        W panelu kliknij <strong>Nowe badanie</strong>. Zobaczysz formularz z poniższymi polami.
        Wymagana jest tylko <strong>Nazwa badania</strong>; wszystko inne możesz wypełnić teraz lub edytować później z zakładki Ustawienia badania.
      </p>

      <table>
        <thead>
          <tr>
            <th>Pole</th>
            <th>Wymagane</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_PL.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "Tak" : "Opcjonalne"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Kliknij <strong>Utwórz badanie</strong>. Samply utworzy badanie i przeniesie Cię do jego obszaru roboczego.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>Krok 2 — Poznaj obszar roboczy</h2>
      <p>
        Obszar roboczy badania ma osiem zakładek, do których docierasz przez menu nawigacyjne u góry strony badania.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_PL.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>Krok 3 — Aktywuj badanie</h2>
      <p>
        Nowe badanie rozpoczyna się w stanie <strong>szkicu</strong>. W trybie szkicu strona docelowa linku dołączania odrzuca nowe rejestracje
        — uczestnicy zobaczą komunikat «Badanie niedostępne».
      </p>
      <p>
        Aby rozpocząć rejestracje: przejdź do zakładki <strong>Przegląd</strong> badania i kliknij <strong>Aktywuj badanie</strong>.
        Status zmieni się na <strong>Aktywny</strong>. Możesz wstrzymać rejestracje w dowolnym momencie, klikając ten sam przycisk ponownie —
        badanie powróci do trybu szkicu bez utraty danych.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>Krok 4 — Dodaj swój pierwszy harmonogram</h2>
      <p>
        Puste badanie niczego nie wysyła. To harmonogram zmienia badanie w działające badanie.
        Przejdź do zakładki <strong>Harmonogram</strong> i kliknij <strong>Dodaj harmonogram</strong>.
      </p>
      <p>
        Przed utworzeniem pierwszego harmonogramu przeczytaj stronę <a href="/docs/types">Cztery typy harmonogramów</a> —
        wybór typu pasującego do Twojego projektu badawczego jest ważniejszy niż każda inna pojedyncza decyzja w Samply.
        Gdy już wiesz, jakiego typu potrzebujesz, strona <a href="/docs/form">Tworzenie harmonogramu</a> przeprowadzi Cię przez formularz pole po polu.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>Krok 5 — Zaproś uczestników</h2>
      <p>
        Przejdź do zakładki <strong>Zaproszenia</strong> i skopiuj link lub kod QR pasujący do Twojego kanału rekrutacji.
        Uczestnicy są zapisywani natychmiast, gdy dotkną linku na urządzeniu z zainstalowaną aplikacją Samply Research.
      </p>
      <p>
        Pełne szczegóły, w tym jak kody i grupy współdziałają z procesem dołączania, znajdziesz na stronie{" "}
        <a href="/docs/invite">Zapraszanie uczestników</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>Ustawienia zaawansowane</h3>
      <p>
        Zakładka <strong>Ustawienia</strong> badania zawiera również opcjonalne funkcje, które możesz zignorować w podstawowym badaniu:
        żądanie niestandardowego kodu lub grupy od uczestników podczas rejestracji, projekty zależne od zdarzeń,
        wyzwalacze geofencingu, przyciski akcji powiadomień i webhooki. Każda funkcja jest domyślnie wyłączona i
        jest udokumentowana osobno w sekcjach funkcji zaawansowanych i dodatkowych.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>Lista kontrolna pierwszego badania</h3>
      <ol>
        <li>Utwórz nazwane badanie.</li>
        <li>Wprowadź formularz zgody.</li>
        <li>Dodaj co najmniej jeden harmonogram.</li>
        <li>Aktywuj badanie (zmień status ze szkicu na aktywny).</li>
        <li>Udostępnij link dołączania co najmniej jednemu uczestnikowi.</li>
        <li>Odbierz pierwsze powiadomienie i potwierdź odpowiedź w ankiecie.</li>
      </ol>
    </>
  );
}

const FORM_FIELDS_AR = [
  {
    name: "اسم الدراسة",
    required: true,
    body: "اسم دراستك. يراه المشاركون في التطبيق وفي صفحة الدراسات العامة.",
  },
  {
    name: "الوصف",
    required: false,
    body: "ملخص قصير للدراسة يُعرض على المشاركين في التطبيق وفي صفحة الدراسات العامة.",
  },
  {
    name: "نموذج الموافقة",
    required: false,
    body: "يظهر عندما ينقر المشارك على «الانضمام إلى الدراسة». في الدراسات التي تشمل البشر ينبغي أن يغطي هدف الدراسة والإجراءات والمخاطر ومعالجة البيانات وكيفية الانسحاب.",
  },
  {
    name: "رسالة ما بعد الانضمام",
    required: false,
    body: "تُعرض فور التسجيل الناجح. استخدمها لتأكيد التسجيل ولتحديد التوقعات — على سبيل المثال متى يصل أول إشعار.",
  },
  {
    name: "رسالة الإكمال",
    required: false,
    body: "تُعرض عندما يكتشف Samply أن المشارك قد أرسل إجابة الاستطلاع. تنطبق عندما توجّه المشاركين إلى رابط إكمال Samply.",
  },
];

const WORKSPACE_SECTIONS_AR = [
  {
    title: "نظرة عامة",
    body: "لوحة الدراسة: عدد المشاركين، إحصاءات الإشعارات، مؤشر الالتزام لمدة 7 أيام، وأحدث النشاطات. من هنا أيضًا تفعّل الدراسة.",
  },
  {
    title: "المشاركون",
    body: "كل من سجّل — معرّفات Samply مستعارة، وتواريخ التسجيل، والمجموعات المخصصة (إن وُجدت)، والمناطق الزمنية، وسجل الإجابات.",
  },
  {
    title: "الجدول",
    body: "جميع جداول الإشعارات المرتبطة بهذه الدراسة. أضف الجداول واستعرضها واحذفها من هنا. يتوسّع كل جدول إلى طابور إرسال لكل مشارك.",
  },
  {
    title: "البيانات",
    body: "سجلات الإجابات المُرسلة عبر روابط الاستطلاع الخاصة بك، مع الطوابع الزمنية ومعرّفات المشاركين.",
  },
  {
    title: "الدعوات",
    body: "روابط الانضمام ورمز QR. انسخ الرابط الإلكتروني لرسائل البريد الإلكتروني أو لصفحة الهبوط، أو استخدم الرابط العميق لإدراجه في مواد أخرى.",
  },
  {
    title: "الإعدادات",
    body: "اسم الدراسة، الوصف، نموذج الموافقة، خيارات التسجيل، والإعدادات المتقدمة.",
  },
  {
    title: "الموافقة",
    body: "اطلب إدراج دراستك علنًا. مطلوب لكي تظهر الدراسة في صفحة الدراسات العامة.",
  },
  {
    title: "Stream API",
    body: "اضبط الـ webhooks لاستقبال أحداث المشاركين في الوقت الفعلي. تجد التفاصيل في دليل Stream API.",
  },
];

function FirstStudyContentAr() {
  return (
    <>
      {/* ── Create the study ─────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>الخطوة 1 — إنشاء الدراسة</h2>
      <p>
        من لوحة التحكم، انقر على <strong>دراسة جديدة</strong>. سترى نموذجًا يحتوي على الحقول التالية.
        المطلوب فقط هو <strong>اسم الدراسة</strong>؛ ويمكنك ملء كل شيء آخر الآن أو تعديله لاحقًا من علامة تبويب «الإعدادات».
      </p>

      <table>
        <thead>
          <tr>
            <th>الحقل</th>
            <th>إلزامي</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody>
          {FORM_FIELDS_AR.map((f) => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: f.required ? "var(--coral)" : "var(--ink-40)" }}>
                {f.required ? "نعم" : "اختياري"}
              </td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{f.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        انقر على <strong>إنشاء الدراسة</strong>. سيُنشئ Samply الدراسة وينقلك إلى مساحة العمل الخاصة بها.
      </p>

      {/* ── The workspace ────────────────────────────────────────────────── */}
      <h2>الخطوة 2 — استكشف مساحة العمل</h2>
      <p>
        تحتوي مساحة عمل الدراسة على ثماني علامات تبويب يمكنك الوصول إليها من قائمة التنقل أعلى صفحة الدراسة.
      </p>

      <dl>
        {WORKSPACE_SECTIONS_AR.map((s) => (
          <div key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>

      {/* ── Activate ─────────────────────────────────────────────────────── */}
      <h2>الخطوة 3 — تفعيل الدراسة</h2>
      <p>
        تبدأ الدراسة الجديدة في حالة <strong>مسودة</strong>. في وضع المسودة، ترفض صفحة هبوط رابط الانضمام عمليات التسجيل الجديدة
        — وسيظهر للمشاركين رسالة «الدراسة غير متاحة».
      </p>
      <p>
        لبدء قبول التسجيلات: انتقل إلى علامة تبويب <strong>نظرة عامة</strong> في الدراسة وانقر على <strong>تفعيل الدراسة</strong>.
        ستتغيّر الحالة إلى <strong>نشطة</strong>. يمكنك إيقاف التسجيلات مؤقتًا في أي وقت بالنقر على الزر نفسه مرة أخرى —
        وتعود الدراسة إلى وضع المسودة دون فقدان البيانات.
      </p>

      {/* ── Add a schedule ───────────────────────────────────────────────── */}
      <h2>الخطوة 4 — أضف جدولك الأول</h2>
      <p>
        لا ترسل الدراسة الفارغة أي شيء. الجدول هو ما يحوّل الدراسة إلى دراسة فعّالة.
        انتقل إلى علامة تبويب <strong>الجدول</strong> وانقر على <strong>إضافة جدول</strong>.
      </p>
      <p>
        قبل إنشاء جدولك الأول، اقرأ صفحة <a href="/docs/types">الأنواع الأربعة للجداول</a> —
        فاختيار النوع المناسب لتصميمك البحثي أهم من أي قرار آخر في Samply.
        وعندما تعرف النوع الذي تحتاجه، ترشدك صفحة <a href="/docs/form">إنشاء جدول</a> عبر النموذج حقلًا حقلًا.
      </p>

      {/* ── Invite ───────────────────────────────────────────────────────── */}
      <h2>الخطوة 5 — ادعُ المشاركين</h2>
      <p>
        انتقل إلى علامة تبويب <strong>الدعوات</strong> وانسخ الرابط أو رمز QR المناسب لقناة التجنيد لديك.
        يُسجَّل المشاركون فور النقر على الرابط في جهاز مثبَّت عليه تطبيق Samply Research.
      </p>
      <p>
        لمزيد من التفاصيل الكاملة، بما في ذلك كيفية تفاعل الرموز والمجموعات مع عملية الانضمام، راجع صفحة{" "}
        <a href="/docs/invite">دعوة المشاركين</a>.
      </p>

      {/* ── Advanced settings note ───────────────────────────────────────── */}
      <h3>الإعدادات المتقدمة</h3>
      <p>
        تتضمّن علامة تبويب <strong>الإعدادات</strong> أيضًا ميزات اختيارية يمكنك تجاهلها في دراسة أساسية:
        طلب رمز مخصص أو مجموعة من المشاركين أثناء التسجيل، والتصاميم المعتمدة على الأحداث،
        ومحفّزات Geofencing، وأزرار إجراءات الإشعارات، والـ webhooks. كل ميزة معطّلة افتراضيًا
        وموثّقة بشكل منفصل في أقسام الميزات المتقدمة والإضافية.
      </p>

      {/* ── Checklist ────────────────────────────────────────────────────── */}
      <h3>قائمة التحقق للدراسة الأولى</h3>
      <ol>
        <li>أنشئ دراسة بعنوان.</li>
        <li>أدخل نموذج الموافقة.</li>
        <li>أضف جدولًا واحدًا على الأقل.</li>
        <li>فعّل الدراسة (انقل الحالة من مسودة إلى نشطة).</li>
        <li>شارك رابط الانضمام مع مشارك واحد على الأقل.</li>
        <li>استقبل أول إشعار وأكّد إجابة الاستطلاع.</li>
      </ol>
    </>
  );
}
