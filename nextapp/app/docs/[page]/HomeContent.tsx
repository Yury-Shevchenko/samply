import type { Locale } from "@/lib/i18n";

const GOALS = [
  {
    slug: "first-study",
    label: "Set up my first study",
    body: "Create the container — participants, schedules, and response history all live inside one study.",
    cta: "Your first study →",
  },
  {
    slug: "invite",
    label: "Invite participants",
    body: "Participants join by tapping a link or scanning a QR code. You never see their contact details.",
    cta: "Inviting participants →",
  },
  {
    slug: "types",
    label: "Choose a schedule type",
    body: "One-time, repeating, randomized, or personal — four types, each suited to a different research design.",
    cta: "The four types →",
  },
  {
    slug: "form",
    label: "Create a schedule",
    body: "The schedule form walks you through Content, Type, Audience, and Options in that order.",
    cta: "Creating a schedule →",
  },
  {
    slug: "placeholders",
    label: "Personalise survey URLs",
    body: "Samply can personalise each notification link with the participant's ID, study ID, or custom code — so your survey tool knows exactly who responded.",
    cta: "URL personalisation →",
  },
  {
    slug: "reminders",
    label: "Send reminders",
    body: "Automatically follow up if a participant has not responded within a set time window.",
    cta: "Reminders →",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a study",
    body: "A study is the top-level container. Give it a name and a consent form — that is all you need to get started.",
  },
  {
    n: "02",
    title: "Add a schedule",
    body: "Choose a schedule type (one-time, repeating, randomized, or personal), write the notification text, set the timing, and select who receives it.",
  },
  {
    n: "03",
    title: "Enrol participants",
    body: "Share the QR code or join link. Participants tap it in the Samply Research app and are immediately enrolled.",
  },
  {
    n: "04",
    title: "Samply fires the notifications",
    body: "The dashboard expands each schedule into a per-participant queue and delivers each notification at the right time.",
  },
  {
    n: "05",
    title: "Participants respond",
    body: "Tapping the notification opens your survey link. Completions are logged automatically when Samply detects the response.",
  },
];

const GOALS_DE = [
  {
    slug: "first-study",
    label: "Meine erste Studie einrichten",
    body: "Erstellen Sie den Container – Teilnehmende, Zeitpläne und Antwortverlauf befinden sich alle in einer Studie.",
    cta: "Ihre erste Studie →",
  },
  {
    slug: "invite",
    label: "Teilnehmende einladen",
    body: "Teilnehmende treten bei, indem sie auf einen Link tippen oder einen QR-Code scannen. Sie sehen nie deren Kontaktdaten.",
    cta: "Teilnehmende einladen →",
  },
  {
    slug: "types",
    label: "Einen Zeitplantyp wählen",
    body: "Einmalig, wiederkehrend, randomisiert oder persönlich – vier Typen, jeder für ein anderes Forschungsdesign geeignet.",
    cta: "Die vier Typen →",
  },
  {
    slug: "form",
    label: "Einen Zeitplan erstellen",
    body: "Das Zeitplanformular führt Sie der Reihe nach durch Inhalt, Typ, Zielgruppe und Optionen.",
    cta: "Einen Zeitplan erstellen →",
  },
  {
    slug: "placeholders",
    label: "Umfrage-URLs personalisieren",
    body: "Samply kann jeden Benachrichtigungslink mit der ID der teilnehmenden Person, der Studien-ID oder einem benutzerdefinierten Code personalisieren – damit Ihr Umfragetool genau weiß, wer geantwortet hat.",
    cta: "URL-Personalisierung →",
  },
  {
    slug: "reminders",
    label: "Erinnerungen senden",
    body: "Automatische Nachverfolgung, wenn eine teilnehmende Person innerhalb eines festgelegten Zeitfensters nicht geantwortet hat.",
    cta: "Erinnerungen →",
  },
];

const STEPS_DE = [
  {
    n: "01",
    title: "Eine Studie erstellen",
    body: "Eine Studie ist der übergeordnete Container. Geben Sie ihr einen Namen und eine Einwilligungserklärung – das ist alles, was Sie für den Einstieg benötigen.",
  },
  {
    n: "02",
    title: "Einen Zeitplan hinzufügen",
    body: "Wählen Sie einen Zeitplantyp (einmalig, wiederkehrend, randomisiert oder persönlich), verfassen Sie den Benachrichtigungstext, legen Sie den Zeitpunkt fest und wählen Sie aus, wer ihn erhält.",
  },
  {
    n: "03",
    title: "Teilnehmende einschreiben",
    body: "Teilen Sie den QR-Code oder den Beitrittslink. Teilnehmende tippen darauf in der Samply Research-App und sind sofort eingeschrieben.",
  },
  {
    n: "04",
    title: "Samply sendet de Benachrichtigungen",
    body: "Das Dashboard erweitert jeden Zeitplan zu einer teilnehmendenspezifischen Warteschlange und übermittelt jede Benachrichtigung zum richtigen Zeitpunkt.",
  },
  {
    n: "05",
    title: "Teilnehmende antworten",
    body: "Das Antippen der Benachrichtigung öffnet Ihren Umfragelink. Abschlüsse werden automatisch protokolliert, wenn Samply die Antwort erkennt.",
  },
];

const GOALS_NL = [
  {
    slug: "first-study",
    label: "Mijn eerste studie opzetten",
    body: "Maak de container aan — deelnemers, schema's en antwoordgeschiedenis bevinden zich allemaal in één studie.",
    cta: "Uw eerste studie →",
  },
  {
    slug: "invite",
    label: "Deelnemers uitnodigen",
    body: "Deelnemers nemen deel door op een link te tikken of een QR-code te scannen. U ziet nooit hun contactgegevens.",
    cta: "Deelnemers uitnodigen →",
  },
  {
    slug: "types",
    label: "Een schematype kiezen",
    body: "Eenmalig, herhalend, willekeurig of persoonlijk — vier typen, elk geschikt voor een ander onderzoeksontwerp.",
    cta: "De vier typen →",
  },
  {
    slug: "form",
    label: "Een schema aanmaken",
    body: "Het schemaformulier leidt u achtereenvolgens door Inhoud, Type, Doelgroep en Opties.",
    cta: "Een schema aanmaken →",
  },
  {
    slug: "placeholders",
    label: "Enquête-URL's personaliseren",
    body: "Samply kan elke meldingslink personaliseren met het ID van de deelnemer, het studie-ID of een aangepaste code — zodat uw enquêtetool precies weet wie heeft gereageerd.",
    cta: "URL-personalisatie →",
  },
  {
    slug: "reminders",
    label: "Herinneringen versturen",
    body: "Automatisch opvolgen als een deelnemer niet heeft gereageerd binnen een ingesteld tijdvenster.",
    cta: "Herinneringen →",
  },
];

const STEPS_NL = [
  {
    n: "01",
    title: "Een studie aanmaken",
    body: "Een studie is de overkoepelende container. Geef hem een naam en een toestemmingsformulier — dat is alles wat u nodig heeft om te beginnen.",
  },
  {
    n: "02",
    title: "Een schema toevoegen",
    body: "Kies een schematype (eenmalig, herhalend, willekeurig of persoonlijk), schrijf de meldingstekst, stel de timing in en selecteer wie hem ontvangt.",
  },
  {
    n: "03",
    title: "Deelnemers inschrijven",
    body: "Deel de QR-code of de deelnamelink. Deelnemers tikken erop in de Samply Research-app en zijn direct ingeschreven.",
  },
  {
    n: "04",
    title: "Samply verstuurt de meldingen",
    body: "Het dashboard breidt elk schema uit tot een wachtrij per deelnemer en bezorgt elke melding op het juiste moment.",
  },
  {
    n: "05",
    title: "Deelnemers reageren",
    body: "Door op de melding te tikken wordt uw enquêtelink geopend. Voltooiingen worden automatisch geregistreerd wanneer Samply de reactie detecteert.",
  },
];

const GOALS_RU = [
  {
    slug: "first-study",
    label: "Создать первое исследование",
    body: "Создайте контейнер — участники, расписания и история ответов хранятся внутри одного исследования.",
    cta: "Ваше первое исследование →",
  },
  {
    slug: "invite",
    label: "Пригласить участников",
    body: "Участники присоединяются, нажав на ссылку или отсканировав QR-код. Вы никогда не видите их контактных данных.",
    cta: "Приглашение участников →",
  },
  {
    slug: "types",
    label: "Выбрать тип расписания",
    body: "Однократное, повторяющееся, случайное или персональное — четыре типа, каждый подходит для разного дизайна исследования.",
    cta: "Четыре типа →",
  },
  {
    slug: "form",
    label: "Создать расписание",
    body: "Форма расписания последовательно проведёт вас через разделы: Содержание, Тип, Аудитория и Параметры.",
    cta: "Создание расписания →",
  },
  {
    slug: "placeholders",
    label: "Персонализировать URL опросов",
    body: "Samply может персонализировать каждую ссылку уведомления с помощью ID участника, ID исследования или пользовательского кода — чтобы ваш инструмент опроса точно знал, кто ответил.",
    cta: "Персонализация URL →",
  },
  {
    slug: "reminders",
    label: "Отправить напоминания",
    body: "Автоматически повторите уведомление, если участник не ответил в течение заданного временного окна.",
    cta: "Напоминания →",
  },
];

const STEPS_RU = [
  {
    n: "01",
    title: "Создайте исследование",
    body: "Исследование — это верхнеуровневый контейнер. Задайте ему название и форму согласия — этого достаточно для начала работы.",
  },
  {
    n: "02",
    title: "Добавьте расписание",
    body: "Выберите тип расписания (однократное, повторяющееся, случайное или персональное), напишите текст уведомления, задайте время и выберите получателей.",
  },
  {
    n: "03",
    title: "Зарегистрируйте участников",
    body: "Поделитесь QR-кодом или ссылкой для вступления. Участники нажимают на неё в приложении Samply Research и сразу регистрируются.",
  },
  {
    n: "04",
    title: "Samply отправляет уведомления",
    body: "Панель управления разворачивает каждое расписание в очередь для каждого участника и доставляет уведомление в нужное время.",
  },
  {
    n: "05",
    title: "Участники отвечают",
    body: "Нажатие на уведомление открывает ссылку вашего опроса. Завершения фиксируются автоматически, когда Samply обнаруживает ответ.",
  },
];

const GOALS_ZH = [
  {
    slug: "first-study",
    label: "创建第一个研究",
    body: "创建容器——参与者、计划和回答历史均存储在一个研究中。",
    cta: "您的第一个研究 →",
  },
  {
    slug: "invite",
    label: "邀请参与者",
    body: "参与者点击链接或扫描二维码即可加入。您永远看不到他们的联系方式。",
    cta: "邀请参与者 →",
  },
  {
    slug: "types",
    label: "选择计划类型",
    body: "单次、重复、随机或个人——四种类型，各适用于不同的研究设计。",
    cta: "四种类型 →",
  },
  {
    slug: "form",
    label: "创建计划",
    body: "计划表单将依次引导您完成内容、类型、受众和选项的设置。",
    cta: "创建计划 →",
  },
  {
    slug: "placeholders",
    label: "个性化问卷 URL",
    body: "Samply 可以用参与者 ID、研究 ID 或自定义代码来个性化每条通知链接，让您的问卷工具准确知道是谁作答的。",
    cta: "URL 个性化 →",
  },
  {
    slug: "reminders",
    label: "发送提醒",
    body: "如果参与者在设定的时间窗口内未作答，系统将自动跟进发送提醒。",
    cta: "提醒 →",
  },
];

const STEPS_ZH = [
  {
    n: "01",
    title: "创建研究",
    body: "研究是顶层容器。为其起一个名称并添加知情同意书——这就是您开始所需的全部内容。",
  },
  {
    n: "02",
    title: "添加计划",
    body: "选择计划类型（单次、重复、随机或个人），撰写通知内容，设置时间，并选择接收对象。",
  },
  {
    n: "03",
    title: "注册参与者",
    body: "分享二维码或加入链接。参与者在 Samply Research 应用中点击后即可立即注册。",
  },
  {
    n: "04",
    title: "Samply 发送通知",
    body: "控制面板将每个计划展开为每位参与者的发送队列，并在正确的时间推送每条通知。",
  },
  {
    n: "05",
    title: "参与者作答",
    body: "点击通知将打开您的问卷链接。当 Samply 检测到回答时，完成情况将自动记录。",
  },
];

export default function HomeContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <HomeContentDe />;
  if (locale === "nl") return <HomeContentNl />;
  if (locale === "ru") return <HomeContentRu />;
  if (locale === "zh") return <HomeContentZh />;
  if (locale === "ko") return <HomeContentKo />;
  if (locale === "it") return <HomeContentIt />;
  if (locale === "fr") return <HomeContentFr />;
  if (locale === "es") return <HomeContentEs />;
  if (locale === "pt") return <HomeContentPt />;
  if (locale === "ja") return <HomeContentJa />;
  if (locale === "ar") return <HomeContentAr />;
  if (locale === "pl") return <HomeContentPl />;
  if (locale === "tr") return <HomeContentTr />;
  return <HomeContentEn />;
}

function HomeContentRu() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Начало работы</h2>
      <p>Выберите задачу, соответствующую вашему текущему этапу.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_RU.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Как работает Samply</h2>
      <p>Пять шагов от регистрации до получения данных ответов.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_RU.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_RU.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_RU.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Основные понятия</h2>
      <p>Краткий словарь перед началом работы. Полные определения — в <a href="/docs/glossary">глоссарии</a>.</p>

      <table>
        <thead>
          <tr>
            <th>Термин</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Исследование</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Верхнеуровневый контейнер. Всё — участники, расписания, результаты — принадлежит одному исследованию.</td></tr>
          <tr><td>Расписание</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Правило, определяющее <em>кто</em> получает уведомление, <em>когда</em> и <em>что в нём написано</em>. Одно исследование может содержать несколько расписаний.</td></tr>
          <tr><td>Очередь</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Развёрнутый список отдельных отправок, сгенерированных из расписания — одна строка на участника на каждое время отправки.</td></tr>
          <tr><td>Участник</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Человек, зарегистрированный в вашем исследовании через приложение Samply Research. Идентифицируется анонимным ID, а не контактными данными.</td></tr>
          <tr><td>Завершение</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply отмечает уведомление как завершённое, когда обнаруживает ответ на опрос, связанный с данной отправкой.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Как цитировать Samply</h2>
      <p>
        Если вы используете Samply в своём исследовании, пожалуйста, сошлитесь на оригинальную публикацию:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Что дальше</h3>
      <p>
        Если вы здесь впервые: прочитайте <a href="/docs/first-study">Ваше первое исследование</a> — там пошагово описано создание исследования, добавление расписания и регистрация первого участника.
      </p>
      <p>
        Если у вас уже есть исследование и вы хотите большего: перейдите к{" "}
        <a href="/docs/placeholders">Персонализации URL</a>,{" "}
        <a href="/docs/groups">Группам</a> или{" "}
        <a href="/docs/reminders">Напоминаниям</a> в разделе расширенных функций.
      </p>
    </>
  );
}

function HomeContentZh() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>从这里开始</h2>
      <p>选择与您当前阶段相符的任务。</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_ZH.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Samply 的工作原理</h2>
      <p>从注册到获取回答数据的五个步骤。</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_ZH.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_ZH.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_ZH.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>核心概念速览</h2>
      <p>开始前的简短词汇表。完整定义请参阅<a href="/docs/glossary">词汇表</a>。</p>

      <table>
        <thead>
          <tr>
            <th>术语</th>
            <th>含义</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>研究</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>顶层容器。所有内容——参与者、计划、结果——均属于一个研究。</td></tr>
          <tr><td>计划</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>规定<em>谁</em>接收通知、<em>何时</em>接收以及<em>内容是什么</em>的规则。一个研究可以有多个计划。</td></tr>
          <tr><td>队列</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>由计划生成的各条发送任务的展开列表——每位参与者每个发送时间对应一行。</td></tr>
          <tr><td>参与者</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>通过 Samply Research 应用加入您研究的人员。以匿名 ID 标识，不使用联系方式。</td></tr>
          <tr><td>完成</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>当 Samply 检测到与该次发送关联的问卷回答时，将该通知标记为已完成。</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>如何引用 Samply</h2>
      <p>
        如果您在研究中使用了 Samply，请引用原始出版物：
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>下一步</h3>
      <p>
        如果您是初次使用：请阅读<a href="/docs/first-study">您的第一个研究</a>——其中逐步介绍了如何创建研究、添加计划以及完成首位参与者的注册。
      </p>
      <p>
        如果您已有研究并希望深入使用：请前往高级功能部分中的{" "}
        <a href="/docs/placeholders">URL 个性化</a>、{" "}
        <a href="/docs/groups">分组</a>或{" "}
        <a href="/docs/reminders">提醒</a>。
      </p>
    </>
  );
}

function HomeContentEn() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Start here</h2>
      <p>Pick the task that matches where you are right now.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>How Samply works</h2>
      <p>Five steps from sign-up to response data.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Key concepts at a glance</h2>
      <p>A short vocabulary before you dive in. The <a href="/docs/glossary">glossary</a> has the full definitions.</p>

      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Study</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>The top-level container. Everything — participants, schedules, results — belongs to one study.</td></tr>
          <tr><td>Schedule</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>A rule that says <em>who</em> gets a notification, <em>when</em>, and <em>what it says</em>. One study can have many schedules.</td></tr>
          <tr><td>Queue</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>The expanded list of individual sends generated from a schedule — one row per participant per send time.</td></tr>
          <tr><td>Participant</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>A person enrolled in your study via the Samply Research app. Identified by an anonymous ID, never by contact details.</td></tr>
          <tr><td>Completion</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply marks a notification as completed when it detects a survey response linked to that send.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>How to cite Samply</h2>
      <p>
        If you use Samply in your research, please cite the original publication:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Where to go next</h3>
      <p>
        If this is your first time: read <a href="/docs/first-study">Your first study</a> — it walks through creating a study,
        adding a schedule, and getting one participant enrolled end to end.
      </p>
      <p>
        If you have an existing study and want to do more: jump to{" "}
        <a href="/docs/placeholders">URL personalisation</a>,{" "}
        <a href="/docs/groups">Groups</a>, or{" "}
        <a href="/docs/reminders">Reminders</a> in the Power features section.
      </p>
    </>
  );
}

function HomeContentDe() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Erste Schritte</h2>
      <p>Wählen Sie die Aufgabe, die Ihrem aktuellen Stand entspricht.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_DE.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Wie Samply funktioniert</h2>
      <p>Fünf Schritte von der Anmeldung bis zu den Antwortdaten.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_DE.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_DE.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_DE.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Schlüsselbegriffe auf einen Blick</h2>
      <p>Ein kurzes Vokabular, bevor Sie einsteigen. Das <a href="/docs/glossary">Glossar</a> enthält die vollständigen Definitionen.</p>

      <table>
        <thead>
          <tr>
            <th>Begriff</th>
            <th>Was es ist</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Studie</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Der übergeordnete Container. Alles – Teilnehmende, Zeitpläne, Ergebnisse – gehört zu einer Studie.</td></tr>
          <tr><td>Zeitplan</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Eine Regel, die festlegt, <em>wer</em> eine Benachrichtigung erhält, <em>wann</em> und <em>was sie besagt</em>. Eine Studie kann viele Zeitpläne haben.</td></tr>
          <tr><td>Warteschlange</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Die erweiterte Liste der einzelnen Versendungen, die aus einem Zeitplan generiert werden – eine Zeile pro Teilnehmender pro Sendezeitpunkt.</td></tr>
          <tr><td>Teilnehmende</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Eine Person, die über die Samply Research-App in Ihre Studie eingeschrieben ist. Identifiziert durch eine anonyme ID, nie durch Kontaktdaten.</td></tr>
          <tr><td>Abschluss</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply markiert eine Benachrichtigung als abgeschlossen, wenn es eine Umfrageantwort erkennt, die mit dieser Versendung verknüpft ist.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Samply zitieren</h2>
      <p>
        Wenn Sie Samply in Ihrer Forschung verwenden, zitieren Sie bitte die Originalpublikation:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Wie geht es weiter?</h3>
      <p>
        Wenn Sie zum ersten Mal hier sind: Lesen Sie <a href="/docs/first-study">Ihre erste Studie</a> – es führt Sie durch das Erstellen einer Studie,
        das Hinzufügen eines Zeitplans und die Einschreibung einer ersten teilnehmenden Person.
      </p>
      <p>
        Wenn Sie bereits eine bestehende Studie haben und mehr tun möchten: Wechseln Sie zu{" "}
        <a href="/docs/placeholders">URL-Personalisierung</a>,{" "}
        <a href="/docs/groups">Gruppen</a> oder{" "}
        <a href="/docs/reminders">Erinnerungen</a> im Abschnitt „Erweiterte Funktionen".
      </p>
    </>
  );
}

function HomeContentNl() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Begin hier</h2>
      <p>Kies de taak die past bij waar u zich nu bevindt.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_NL.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Hoe Samply werkt</h2>
      <p>Vijf stappen van aanmelding tot antwoordgegevens.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_NL.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_NL.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_NL.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Kernbegrippen in een oogopslag</h2>
      <p>Een korte woordenschat voordat u begint. Het <a href="/docs/glossary">glossarium</a> bevat de volledige definities.</p>

      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Wat het is</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Studie</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>De overkoepelende container. Alles — deelnemers, schema's, resultaten — behoort tot één studie.</td></tr>
          <tr><td>Schema</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Een regel die aangeeft <em>wie</em> een melding ontvangt, <em>wanneer</em> en <em>wat erin staat</em>. Eén studie kan meerdere schema's hebben.</td></tr>
          <tr><td>Wachtrij</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>De uitgebreide lijst van afzonderlijke verzendingen gegenereerd vanuit een schema — één rij per deelnemer per verzendtijdstip.</td></tr>
          <tr><td>Deelnemer</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Een persoon die via de Samply Research-app is ingeschreven in uw studie. Geïdentificeerd door een anoniem ID, nooit door contactgegevens.</td></tr>
          <tr><td>Voltooiing</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply markeert een melding als voltooid wanneer het een enquêtereactie detecteert die aan die verzending is gekoppeld.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Samply citeren</h2>
      <p>
        Als u Samply in uw onderzoek gebruikt, citeer dan de originele publicatie:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Wat nu?</h3>
      <p>
        Als dit uw eerste keer is: lees <a href="/docs/first-study">Uw eerste studie</a> — het leidt u door het aanmaken van een studie,
        het toevoegen van een schema en het inschrijven van één deelnemer van begin tot eind.
      </p>
      <p>
        Als u een bestaande studie heeft en meer wilt doen: ga naar{" "}
        <a href="/docs/placeholders">URL-personalisatie</a>,{" "}
        <a href="/docs/groups">Groepen</a> of{" "}
        <a href="/docs/reminders">Herinneringen</a> in het gedeelte Geavanceerde functies.
      </p>
    </>
  );
}

const GOALS_KO = [
  {
    slug: "first-study",
    label: "첫 번째 연구 설정하기",
    body: "컨테이너를 생성하세요 — 참가자, 일정, 응답 기록이 모두 하나의 연구 안에 저장됩니다.",
    cta: "첫 번째 연구 →",
  },
  {
    slug: "invite",
    label: "참가자 초대하기",
    body: "참가자는 링크를 탭하거나 QR 코드를 스캔하여 참여합니다. 연구자는 참가자의 연락처를 볼 수 없습니다.",
    cta: "참가자 초대하기 →",
  },
  {
    slug: "types",
    label: "일정 유형 선택하기",
    body: "일회성, 반복, 무작위, 개인 맞춤 — 네 가지 유형으로 각각 다른 연구 설계에 적합합니다.",
    cta: "네 가지 유형 →",
  },
  {
    slug: "form",
    label: "일정 만들기",
    body: "일정 양식은 내용, 유형, 대상, 옵션 순서로 안내합니다.",
    cta: "일정 만들기 →",
  },
  {
    slug: "placeholders",
    label: "설문 URL 개인화하기",
    body: "Samply는 참가자 ID, 연구 ID 또는 사용자 지정 코드로 각 알림 링크를 개인화할 수 있어, 설문 도구가 정확히 누가 응답했는지 파악할 수 있습니다.",
    cta: "URL 개인화 →",
  },
  {
    slug: "reminders",
    label: "알림 재전송하기",
    body: "참가자가 설정된 시간 내에 응답하지 않은 경우 자동으로 후속 알림을 발송합니다.",
    cta: "알림 재전송 →",
  },
];

const STEPS_KO = [
  {
    n: "01",
    title: "연구 만들기",
    body: "연구는 최상위 컨테이너입니다. 이름과 동의서를 입력하면 시작할 준비가 완료됩니다.",
  },
  {
    n: "02",
    title: "일정 추가하기",
    body: "일정 유형(일회성, 반복, 무작위, 개인 맞춤)을 선택하고, 알림 텍스트를 작성하고, 시간을 설정하고, 수신자를 선택합니다.",
  },
  {
    n: "03",
    title: "참가자 등록하기",
    body: "QR 코드 또는 참여 링크를 공유합니다. 참가자는 Samply Research 앱에서 링크를 탭하면 즉시 등록됩니다.",
  },
  {
    n: "04",
    title: "Samply가 알림을 발송합니다",
    body: "대시보드는 각 일정을 참가자별 발송 대기열로 확장하고 적절한 시간에 알림을 전달합니다.",
  },
  {
    n: "05",
    title: "참가자가 응답합니다",
    body: "알림을 탭하면 설문 링크가 열립니다. Samply가 응답을 감지하면 완료 여부가 자동으로 기록됩니다.",
  },
];

const GOALS_IT = [
  {
    slug: "first-study",
    label: "Configurare il primo studio",
    body: "Crei il contenitore — partecipanti, pianificazioni e storico delle risposte si trovano tutti all'interno di un unico studio.",
    cta: "Il Suo primo studio →",
  },
  {
    slug: "invite",
    label: "Invitare i partecipanti",
    body: "I partecipanti si uniscono toccando un link o scansionando un codice QR. Lei non vedrà mai i loro dati di contatto.",
    cta: "Invitare i partecipanti →",
  },
  {
    slug: "types",
    label: "Scegliere un tipo di pianificazione",
    body: "Una tantum, ripetuta, casuale o personale — quattro tipi, ciascuno adatto a un diverso disegno di ricerca.",
    cta: "I quattro tipi →",
  },
  {
    slug: "form",
    label: "Creare una pianificazione",
    body: "Il modulo di pianificazione La guida in sequenza attraverso Contenuto, Tipo, Destinatari e Opzioni.",
    cta: "Creare una pianificazione →",
  },
  {
    slug: "placeholders",
    label: "Personalizzare gli URL del sondaggio",
    body: "Samply può personalizzare ogni link di notifica con l'ID del partecipante, l'ID dello studio o un codice personalizzato, così il Suo strumento di indagine sa esattamente chi ha risposto.",
    cta: "Personalizzazione URL →",
  },
  {
    slug: "reminders",
    label: "Inviare promemoria",
    body: "Segue automaticamente se un partecipante non ha risposto entro una finestra temporale definita.",
    cta: "Promemoria →",
  },
];

const STEPS_IT = [
  {
    n: "01",
    title: "Creare uno studio",
    body: "Lo studio è il contenitore di livello superiore. Assegni un nome e un modulo di consenso — è tutto ciò che serve per iniziare.",
  },
  {
    n: "02",
    title: "Aggiungere una pianificazione",
    body: "Scelga un tipo di pianificazione (una tantum, ripetuta, casuale o personale), rediga il testo della notifica, imposti i tempi e selezioni i destinatari.",
  },
  {
    n: "03",
    title: "Iscrivere i partecipanti",
    body: "Condivida il codice QR o il link di accesso. I partecipanti lo toccano nell'app Samply Research e vengono iscritti immediatamente.",
  },
  {
    n: "04",
    title: "Samply invia le notifiche",
    body: "Il pannello di controllo espande ogni pianificazione in una coda di invii per partecipante e recapita ogni notifica al momento giusto.",
  },
  {
    n: "05",
    title: "I partecipanti rispondono",
    body: "Toccando la notifica si apre il link del sondaggio. I completamenti vengono registrati automaticamente quando Samply rileva la risposta.",
  },
];

function HomeContentKo() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>시작하기</h2>
      <p>현재 단계에 맞는 작업을 선택하십시오.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_KO.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Samply 작동 방식</h2>
      <p>가입부터 응답 데이터 수집까지 다섯 단계입니다.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_KO.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_KO.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_KO.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>주요 개념 한눈에 보기</h2>
      <p>시작 전에 살펴볼 간단한 용어집입니다. 전체 정의는 <a href="/docs/glossary">용어집</a>을 참조하십시오.</p>

      <table>
        <thead>
          <tr>
            <th>용어</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>연구</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>최상위 컨테이너입니다. 참가자, 일정, 결과 등 모든 항목이 하나의 연구에 속합니다.</td></tr>
          <tr><td>일정</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}><em>누가</em> 알림을 받을지, <em>언제</em> 받을지, <em>내용이 무엇인지</em>를 정의하는 규칙입니다. 하나의 연구에 여러 일정을 설정할 수 있습니다.</td></tr>
          <tr><td>대기열</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>일정에서 생성된 개별 발송 목록으로, 참가자별·발송 시간별로 한 행씩 구성됩니다.</td></tr>
          <tr><td>참가자</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply Research 앱을 통해 연구에 등록된 사람입니다. 연락처가 아닌 익명 ID로 식별됩니다.</td></tr>
          <tr><td>완료</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply가 해당 발송과 연결된 설문 응답을 감지하면 알림을 완료 상태로 표시합니다.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Samply 인용 방법</h2>
      <p>
        연구에서 Samply를 사용하셨다면 원본 출판물을 인용해 주십시오:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>다음 단계</h3>
      <p>
        처음 이용하신다면: <a href="/docs/first-study">첫 번째 연구</a>를 읽어보십시오 — 연구 생성, 일정 추가, 첫 참가자 등록 과정을 단계별로 안내합니다.
      </p>
      <p>
        기존 연구가 있고 더 많은 기능을 원하신다면: 고급 기능 섹션의{" "}
        <a href="/docs/placeholders">URL 개인화</a>,{" "}
        <a href="/docs/groups">그룹</a>, 또는{" "}
        <a href="/docs/reminders">알림 재전송</a>으로 이동하십시오.
      </p>
    </>
  );
}

function HomeContentIt() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Inizia qui</h2>
      <p>Scelga l'attività che corrisponde alla fase in cui si trova.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_IT.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Come funziona Samply</h2>
      <p>Cinque passaggi dalla registrazione ai dati di risposta.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_IT.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_IT.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_IT.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Concetti chiave a colpo d'occhio</h2>
      <p>Un breve glossario prima di iniziare. Il <a href="/docs/glossary">glossario</a> contiene le definizioni complete.</p>

      <table>
        <thead>
          <tr>
            <th>Termine</th>
            <th>Descrizione</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Studio</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Il contenitore di livello superiore. Tutto — partecipanti, pianificazioni, risultati — appartiene a un unico studio.</td></tr>
          <tr><td>Pianificazione</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Una regola che stabilisce <em>chi</em> riceve una notifica, <em>quando</em> e <em>cosa contiene</em>. Uno studio può avere molte pianificazioni.</td></tr>
          <tr><td>Coda</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>L'elenco espanso degli invii individuali generati da una pianificazione — una riga per partecipante per ogni orario di invio.</td></tr>
          <tr><td>Partecipante</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Una persona iscritta al Suo studio tramite l'app Samply Research. Identificata da un ID anonimo, mai dai dati di contatto.</td></tr>
          <tr><td>Completamento</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply contrassegna una notifica come completata quando rileva una risposta al sondaggio collegata a quell'invio.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Come citare Samply</h2>
      <p>
        Se utilizza Samply nella Sua ricerca, La preghiamo di citare la pubblicazione originale:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Dove andare dopo</h3>
      <p>
        Se è la prima volta: legga <a href="/docs/first-study">Il Suo primo studio</a> — guida passo dopo passo alla creazione di uno studio,
        all'aggiunta di una pianificazione e all'iscrizione del primo partecipante.
      </p>
      <p>
        Se ha già uno studio e desidera fare di più: vada a{" "}
        <a href="/docs/placeholders">Personalizzazione URL</a>,{" "}
        <a href="/docs/groups">Gruppi</a> o{" "}
        <a href="/docs/reminders">Promemoria</a> nella sezione Funzionalità avanzate.
      </p>
    </>
  );
}

const GOALS_FR = [
  {
    slug: "first-study",
    label: "Configurer ma première étude",
    body: "Créez le conteneur — les participants, les planifications et l'historique des réponses se trouvent tous dans une même étude.",
    cta: "Votre première étude →",
  },
  {
    slug: "invite",
    label: "Inviter des participants",
    body: "Les participants rejoignent en appuyant sur un lien ou en scannant un QR code. Vous ne voyez jamais leurs coordonnées.",
    cta: "Inviter des participants →",
  },
  {
    slug: "types",
    label: "Choisir un type de planification",
    body: "Unique, répétée, aléatoire ou personnelle — quatre types, chacun adapté à un design de recherche différent.",
    cta: "Les quatre types →",
  },
  {
    slug: "form",
    label: "Créer une planification",
    body: "Le formulaire de planification vous guide dans l'ordre à travers Contenu, Type, Public et Options.",
    cta: "Créer une planification →",
  },
  {
    slug: "placeholders",
    label: "Personnaliser les URL du sondage",
    body: "Samply peut personnaliser chaque lien de notification avec l'ID du participant, l'ID de l'étude ou un code personnalisé — afin que votre outil de sondage sache exactement qui a répondu.",
    cta: "Personnalisation des URL →",
  },
  {
    slug: "reminders",
    label: "Envoyer des rappels",
    body: "Faites un suivi automatique si un participant n'a pas répondu dans une fenêtre de temps définie.",
    cta: "Rappels →",
  },
];

const STEPS_FR = [
  {
    n: "01",
    title: "Créer une étude",
    body: "Une étude est le conteneur de premier niveau. Donnez-lui un nom et un formulaire de consentement — c'est tout ce dont vous avez besoin pour commencer.",
  },
  {
    n: "02",
    title: "Ajouter une planification",
    body: "Choisissez un type de planification (unique, répétée, aléatoire ou personnelle), rédigez le texte de notification, définissez le calendrier et sélectionnez qui la reçoit.",
  },
  {
    n: "03",
    title: "Inscrire des participants",
    body: "Partagez le QR code ou le lien d'accès. Les participants l'appuient dans l'application Samply Research et sont immédiatement inscrits.",
  },
  {
    n: "04",
    title: "Samply envoie les notifications",
    body: "Le tableau de bord développe chaque planification en une file d'attente par participant et envoie chaque notification au bon moment.",
  },
  {
    n: "05",
    title: "Les participants répondent",
    body: "Appuyer sur la notification ouvre votre lien de sondage. Les complétions sont enregistrées automatiquement lorsque Samply détecte la réponse.",
  },
];

function HomeContentFr() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Commencer ici</h2>
      <p>Choisissez la tâche qui correspond à votre étape actuelle.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_FR.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Comment fonctionne Samply</h2>
      <p>Cinq étapes de l'inscription aux données de réponse.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_FR.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_FR.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_FR.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Concepts clés en un coup d'œil</h2>
      <p>Un bref vocabulaire avant de vous lancer. Le <a href="/docs/glossary">glossaire</a> contient les définitions complètes.</p>

      <table>
        <thead>
          <tr>
            <th>Terme</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Étude</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Le conteneur de premier niveau. Tout — participants, planifications, résultats — appartient à une seule étude.</td></tr>
          <tr><td>Planification</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Une règle qui définit <em>qui</em> reçoit une notification, <em>quand</em> et <em>ce qu'elle contient</em>. Une étude peut avoir plusieurs planifications.</td></tr>
          <tr><td>File d'attente</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>La liste développée des envois individuels générés à partir d'une planification — une ligne par participant par heure d'envoi.</td></tr>
          <tr><td>Participant</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Une personne inscrite à votre étude via l'application Samply Research. Identifiée par un ID anonyme, jamais par ses coordonnées.</td></tr>
          <tr><td>Complétion</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply marque une notification comme complétée lorsqu'il détecte une réponse au sondage liée à cet envoi.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Comment citer Samply</h2>
      <p>
        Si vous utilisez Samply dans vos recherches, veuillez citer la publication originale :
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Où aller ensuite</h3>
      <p>
        Si c'est votre première fois : lisez <a href="/docs/first-study">Votre première étude</a> — cela vous guide pas à pas dans la création d'une étude,
        l'ajout d'une planification et l'inscription d'un premier participant.
      </p>
      <p>
        Si vous avez déjà une étude et souhaitez aller plus loin : rendez-vous à{" "}
        <a href="/docs/placeholders">Personnalisation des URL</a>,{" "}
        <a href="/docs/groups">Groupes</a> ou{" "}
        <a href="/docs/reminders">Rappels</a> dans la section Fonctionnalités avancées.
      </p>
    </>
  );
}

const GOALS_ES = [
  {
    slug: "first-study",
    label: "Configurar mi primer estudio",
    body: "Cree el contenedor — los participantes, los calendarios y el historial de respuestas se encuentran todos dentro de un mismo estudio.",
    cta: "Su primer estudio →",
  },
  {
    slug: "invite",
    label: "Invitar participantes",
    body: "Los participantes se unen pulsando un enlace o escaneando un código QR. Usted nunca ve sus datos de contacto.",
    cta: "Invitar participantes →",
  },
  {
    slug: "types",
    label: "Elegir un tipo de calendario",
    body: "Único, repetido, aleatorio o personal — cuatro tipos, cada uno adaptado a un diseño de investigación diferente.",
    cta: "Los cuatro tipos →",
  },
  {
    slug: "form",
    label: "Crear un calendario",
    body: "El formulario de calendario le guía en orden a través de Contenido, Tipo, Público y Opciones.",
    cta: "Crear un calendario →",
  },
  {
    slug: "placeholders",
    label: "Personalizar las URL de la encuesta",
    body: "Samply puede personalizar cada enlace de notificación con el ID del participante, el ID del estudio o un código personalizado — para que su herramienta de encuesta sepa exactamente quién respondió.",
    cta: "Personalización de URL →",
  },
  {
    slug: "reminders",
    label: "Enviar recordatorios",
    body: "Realice un seguimiento automático si un participante no ha respondido dentro de un período de tiempo definido.",
    cta: "Recordatorios →",
  },
];

const STEPS_ES = [
  {
    n: "01",
    title: "Crear un estudio",
    body: "Un estudio es el contenedor de primer nivel. Asígnele un nombre y un formulario de consentimiento — eso es todo lo que necesita para empezar.",
  },
  {
    n: "02",
    title: "Agregar un calendario",
    body: "Elija un tipo de calendario (único, repetido, aleatorio o personal), redacte el texto de la notificación, defina el horario y seleccione quién lo recibe.",
  },
  {
    n: "03",
    title: "Inscribir participantes",
    body: "Comparta el código QR o el enlace de acceso. Los participantes lo pulsan en la aplicación Samply Research y quedan inscritos de inmediato.",
  },
  {
    n: "04",
    title: "Samply envía las notificaciones",
    body: "El panel expande cada calendario en una cola por participante y entrega cada notificación en el momento adecuado.",
  },
  {
    n: "05",
    title: "Los participantes responden",
    body: "Pulsar la notificación abre su enlace de encuesta. Las finalizaciones se registran automáticamente cuando Samply detecta la respuesta.",
  },
];

function HomeContentEs() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Comenzar aquí</h2>
      <p>Elija la tarea que corresponde a su etapa actual.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_ES.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Cómo funciona Samply</h2>
      <p>Cinco pasos desde el registro hasta los datos de respuesta.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_ES.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_ES.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_ES.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Conceptos clave de un vistazo</h2>
      <p>Un breve vocabulario antes de empezar. El <a href="/docs/glossary">glosario</a> contiene las definiciones completas.</p>

      <table>
        <thead>
          <tr>
            <th>Término</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Estudio</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>El contenedor de primer nivel. Todo — participantes, calendarios, resultados — pertenece a un solo estudio.</td></tr>
          <tr><td>Calendario</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Una regla que define <em>quién</em> recibe una notificación, <em>cuándo</em> y <em>qué contiene</em>. Un estudio puede tener varios calendarios.</td></tr>
          <tr><td>Cola</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>La lista expandida de envíos individuales generados a partir de un calendario — una fila por participante por hora de envío.</td></tr>
          <tr><td>Participante</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Una persona inscrita en su estudio a través de la aplicación Samply Research. Identificada por un ID anónimo, nunca por sus datos de contacto.</td></tr>
          <tr><td>Finalización</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply marca una notificación como finalizada cuando detecta una respuesta de encuesta vinculada a ese envío.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Cómo citar Samply</h2>
      <p>
        Si utiliza Samply en su investigación, cite la publicación original:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>A dónde ir a continuación</h3>
      <p>
        Si es la primera vez: lea <a href="/docs/first-study">Su primer estudio</a> — le guía paso a paso en la creación de un estudio,
        la adición de un calendario y la inscripción de un primer participante.
      </p>
      <p>
        Si ya tiene un estudio y quiere hacer más: vaya a{" "}
        <a href="/docs/placeholders">Personalización de URL</a>,{" "}
        <a href="/docs/groups">Grupos</a> o{" "}
        <a href="/docs/reminders">Recordatorios</a> en la sección de Funciones avanzadas.
      </p>
    </>
  );
}

const GOALS_PT = [
  {
    slug: "first-study",
    label: "Configurar meu primeiro estudo",
    body: "Crie o contêiner — participantes, calendários e histórico de respostas ficam todos dentro de um único estudo.",
    cta: "Seu primeiro estudo →",
  },
  {
    slug: "invite",
    label: "Convidar participantes",
    body: "Os participantes entram tocando em um link ou escaneando um código QR. Você nunca vê os dados de contato deles.",
    cta: "Convidar participantes →",
  },
  {
    slug: "types",
    label: "Escolher um tipo de calendário",
    body: "Único, repetido, aleatório ou pessoal — quatro tipos, cada um adequado a um design de pesquisa diferente.",
    cta: "Os quatro tipos →",
  },
  {
    slug: "form",
    label: "Criar um calendário",
    body: "O formulário de calendário guia você em ordem por Conteúdo, Tipo, Público e Opções.",
    cta: "Criar um calendário →",
  },
  {
    slug: "placeholders",
    label: "Personalizar as URLs da pesquisa",
    body: "O Samply pode personalizar cada link de notificação com o ID do participante, o ID do estudo ou um código personalizado — para que sua ferramenta de pesquisa saiba exatamente quem respondeu.",
    cta: "Personalização de URL →",
  },
  {
    slug: "reminders",
    label: "Enviar lembretes",
    body: "Faça um acompanhamento automático se um participante não tiver respondido dentro de um período de tempo definido.",
    cta: "Lembretes →",
  },
];

const STEPS_PT = [
  {
    n: "01",
    title: "Criar um estudo",
    body: "Um estudo é o contêiner de primeiro nível. Dê a ele um nome e um formulário de consentimento — é tudo o que você precisa para começar.",
  },
  {
    n: "02",
    title: "Adicionar um calendário",
    body: "Escolha um tipo de calendário (único, repetido, aleatório ou pessoal), redija o texto da notificação, defina o horário e selecione quem o recebe.",
  },
  {
    n: "03",
    title: "Inscrever participantes",
    body: "Compartilhe o código QR ou o link de acesso. Os participantes tocam nele no aplicativo Samply Research e ficam inscritos imediatamente.",
  },
  {
    n: "04",
    title: "O Samply envia as notificações",
    body: "O painel expande cada calendário em uma fila por participante e entrega cada notificação no momento adequado.",
  },
  {
    n: "05",
    title: "Os participantes respondem",
    body: "Tocar na notificação abre o link da sua pesquisa. As conclusões são registradas automaticamente quando o Samply detecta a resposta.",
  },
];

function HomeContentPt() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Começar aqui</h2>
      <p>Escolha a tarefa que corresponde à sua etapa atual.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_PT.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Como funciona o Samply</h2>
      <p>Cinco etapas do cadastro até os dados de resposta.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_PT.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_PT.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_PT.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Conceitos-chave de relance</h2>
      <p>Um breve vocabulário antes de começar. O <a href="/docs/glossary">glossário</a> contém as definições completas.</p>

      <table>
        <thead>
          <tr>
            <th>Termo</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Estudo</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>O contêiner de primeiro nível. Tudo — participantes, calendários, resultados — pertence a um único estudo.</td></tr>
          <tr><td>Calendário</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Uma regra que define <em>quem</em> recebe uma notificação, <em>quando</em> e <em>o que ela contém</em>. Um estudo pode ter vários calendários.</td></tr>
          <tr><td>Fila</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>A lista expandida de envios individuais gerados a partir de um calendário — uma linha por participante por horário de envio.</td></tr>
          <tr><td>Participante</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Uma pessoa inscrita no seu estudo por meio do aplicativo Samply Research. Identificada por um ID anônimo, nunca por dados de contato.</td></tr>
          <tr><td>Conclusão</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>O Samply marca uma notificação como concluída quando detecta uma resposta de pesquisa vinculada a esse envio.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Como citar o Samply</h2>
      <p>
        Se você usar o Samply em sua pesquisa, cite a publicação original:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Para onde ir a seguir</h3>
      <p>
        Se é a primeira vez: leia <a href="/docs/first-study">Seu primeiro estudo</a> — guia passo a passo na criação de um estudo,
        adição de um calendário e inscrição do primeiro participante.
      </p>
      <p>
        Se você já tem um estudo e quer fazer mais: acesse{" "}
        <a href="/docs/placeholders">Personalização de URL</a>,{" "}
        <a href="/docs/groups">Grupos</a> ou{" "}
        <a href="/docs/reminders">Lembretes</a> na seção de Funcionalidades avançadas.
      </p>
    </>
  );
}

const GOALS_JA = [
  {
    slug: "first-study",
    label: "初めての研究を設定する",
    body: "コンテナを作成します — 参加者、スケジュール、回答履歴はすべて一つの研究の中にあります。",
    cta: "初めての研究 →",
  },
  {
    slug: "invite",
    label: "参加者を招待する",
    body: "参加者はリンクをタップするか、QRコードをスキャンして参加します。連絡先情報を見ることはありません。",
    cta: "参加者を招待する →",
  },
  {
    slug: "types",
    label: "スケジュールタイプを選ぶ",
    body: "一回のみ、繰り返し、ランダム、または個別 — 4つのタイプがあり、それぞれ異なる研究デザインに適しています。",
    cta: "4つのタイプ →",
  },
  {
    slug: "form",
    label: "スケジュールを作成する",
    body: "スケジュールフォームは、コンテンツ、タイプ、対象者、オプションの順に案内します。",
    cta: "スケジュールの作成 →",
  },
  {
    slug: "placeholders",
    label: "調査URLをパーソナライズする",
    body: "Samplyは、参加者ID、研究ID、またはカスタムコードで各通知リンクをパーソナライズできます — 調査ツールが誰が回答したかを正確に把握できます。",
    cta: "URLパーソナライズ →",
  },
  {
    slug: "reminders",
    label: "リマインダーを送る",
    body: "設定した時間内に参加者が回答しなかった場合、自動的にフォローアップします。",
    cta: "リマインダー →",
  },
];

const STEPS_JA = [
  {
    n: "01",
    title: "研究を作成する",
    body: "研究は最上位のコンテナです。名前と同意書を付けてください — 始めるのに必要なのはそれだけです。",
  },
  {
    n: "02",
    title: "スケジュールを追加する",
    body: "スケジュールタイプ（一回のみ、繰り返し、ランダム、または個別）を選び、通知テキストを書き、タイミングを設定し、受信者を選択します。",
  },
  {
    n: "03",
    title: "参加者を登録する",
    body: "QRコードまたは参加リンクを共有します。参加者はSamply Researchアプリでタップすると、すぐに登録されます。",
  },
  {
    n: "04",
    title: "Samplyが通知を送信する",
    body: "ダッシュボードは各スケジュールを参加者ごとのキューに展開し、適切なタイミングで各通知を配信します。",
  },
  {
    n: "05",
    title: "参加者が回答する",
    body: "通知をタップすると、調査リンクが開きます。Samplyが回答を検出すると、完了が自動的に記録されます。",
  },
];

function HomeContentJa() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>ここから始める</h2>
      <p>現在のステップに合ったタスクを選択してください。</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_JA.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Samplyの仕組み</h2>
      <p>登録から回答データまでの5つのステップ。</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_JA.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_JA.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_JA.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>主要概念の概要</h2>
      <p>始める前の簡単な用語集です。完全な定義は<a href="/docs/glossary">用語集</a>にあります。</p>

      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>研究</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>最上位のコンテナ。すべて — 参加者、スケジュール、結果 — は1つの研究に属します。</td></tr>
          <tr><td>スケジュール</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}><em>誰が</em>通知を受け取り、<em>いつ</em>、<em>何が含まれるか</em>を定義するルール。1つの研究に複数のスケジュールを設定できます。</td></tr>
          <tr><td>キュー</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>スケジュールから生成された個別の送信の展開リスト — 1参加者×1送信時刻ごとに1行。</td></tr>
          <tr><td>参加者</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply Researchアプリを通じて研究に登録した人。連絡先情報ではなく匿名のIDで識別されます。</td></tr>
          <tr><td>完了</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samplyは、その送信に紐づく調査回答を検出すると、通知を完了としてマークします。</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Samplyの引用方法</h2>
      <p>
        研究でSamplyを使用する場合は、元の出版物を引用してください:
      </p>
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 1.6rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Publication</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href='https://doi.org/10.3758/s13428-020-01527-9' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>次に進む場所</h3>
      <p>
        初めての場合: <a href="/docs/first-study">初めての研究</a>をお読みください — 研究の作成、スケジュールの追加、最初の参加者の登録までステップごとに案内します。
      </p>
      <p>
        すでに研究があり、さらに多くのことを行いたい場合: 高度な機能セクションの{" "}
        <a href="/docs/placeholders">URLパーソナライズ</a>、{" "}
        <a href="/docs/groups">グループ</a>、または{" "}
        <a href="/docs/reminders">リマインダー</a>にアクセスしてください。
      </p>
    </>
  );
}

const GOALS_TR = [
  {
    slug: "first-study",
    label: "İlk çalışmamı kur",
    body: "Konteyneri oluşturun — katılımcılar, programlar ve yanıt geçmişi tek bir çalışmanın içinde yer alır.",
    cta: "İlk çalışmanız →",
  },
  {
    slug: "invite",
    label: "Katılımcıları davet et",
    body: "Katılımcılar bir bağlantıya dokunarak veya QR kodu tarayarak katılır. İletişim bilgilerini asla görmezsiniz.",
    cta: "Katılımcıları davet etme →",
  },
  {
    slug: "types",
    label: "Bir program türü seç",
    body: "Tek seferlik, tekrar eden, rastgele veya kişisel — dört tür, her biri farklı bir araştırma tasarımına uygundur.",
    cta: "Dört tür →",
  },
  {
    slug: "form",
    label: "Bir program oluştur",
    body: "Program formu sizi sırasıyla İçerik, Tür, Hedef Kitle ve Seçenekler aşamalarından geçirir.",
    cta: "Program oluşturma →",
  },
  {
    slug: "placeholders",
    label: "Anket URL'lerini kişiselleştir",
    body: "Samply, her bildirim bağlantısını katılımcının kimliği, çalışma kimliği veya özel bir kodla kişiselleştirebilir — böylece anket aracınız kimin yanıt verdiğini tam olarak bilir.",
    cta: "URL kişiselleştirme →",
  },
  {
    slug: "reminders",
    label: "Hatırlatıcılar gönder",
    body: "Bir katılımcı belirlenen zaman aralığı içinde yanıt vermediğinde otomatik olarak takip edin.",
    cta: "Hatırlatıcılar →",
  },
];

const STEPS_TR = [
  {
    n: "01",
    title: "Bir çalışma oluşturun",
    body: "Çalışma en üst düzey konteynerdir. Ona bir ad ve bir onam formu verin — başlamak için ihtiyacınız olan tek şey budur.",
  },
  {
    n: "02",
    title: "Bir program ekleyin",
    body: "Bir program türü seçin (tek seferlik, tekrar eden, rastgele veya kişisel), bildirim metnini yazın, zamanlamayı ayarlayın ve kimin alacağını seçin.",
  },
  {
    n: "03",
    title: "Katılımcıları kaydedin",
    body: "QR kodunu veya katılım bağlantısını paylaşın. Katılımcılar Samply Research uygulamasında ona dokunduklarında anında kaydedilir.",
  },
  {
    n: "04",
    title: "Samply bildirimleri gönderir",
    body: "Panel, her programı katılımcı başına bir kuyruğa genişletir ve her bildirimi doğru zamanda iletir.",
  },
  {
    n: "05",
    title: "Katılımcılar yanıt verir",
    body: "Bildirime dokunmak anket bağlantınızı açar. Samply yanıtı algıladığında tamamlanmalar otomatik olarak kaydedilir.",
  },
];

function HomeContentTr() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Buradan başla</h2>
      <p>Şu anda bulunduğunuz aşamaya uygun görevi seçin.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_TR.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Samply nasıl çalışır</h2>
      <p>Kayıttan yanıt verilerine kadar beş adım.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_TR.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_TR.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_TR.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Temel kavramlara bir bakış</h2>
      <p>Başlamadan önce kısa bir sözlük. Tam tanımlar için <a href="/docs/glossary">sözlüğe</a> bakın.</p>

      <table>
        <thead>
          <tr>
            <th>Terim</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Çalışma</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>En üst düzey konteyner. Her şey — katılımcılar, programlar, sonuçlar — tek bir çalışmaya aittir.</td></tr>
          <tr><td>Program</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}><em>Kimin</em> bildirim alacağını, <em>ne zaman</em> ve <em>ne yazacağını</em> belirten bir kural. Bir çalışmanın birden fazla programı olabilir.</td></tr>
          <tr><td>Kuyruk</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Bir programdan üretilen tek tek gönderilerin genişletilmiş listesi — her katılımcı için her gönderim zamanına bir satır.</td></tr>
          <tr><td>Katılımcı</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply Research uygulaması aracılığıyla çalışmanıza kayıtlı kişi. İletişim bilgileri yerine anonim bir kimlikle tanımlanır.</td></tr>
          <tr><td>Tamamlanma</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply, o gönderime bağlı bir anket yanıtını algıladığında bildirimi tamamlanmış olarak işaretler.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Samply nasıl alıntılanır</h2>
      <p>
        Araştırmanızda Samply kullanıyorsanız, lütfen orijinal yayını alıntılayın:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 1.6rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publication</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Sonraki adım</h3>
      <p>
        İlk kez buradaysanız: <a href="/docs/first-study">İlk çalışmanız</a> sayfasını okuyun — bir çalışmanın oluşturulması, bir programın eklenmesi ve ilk katılımcının kaydedilmesi süreçlerinde size adım adım rehberlik eder.
      </p>
      <p>
        Mevcut bir çalışmanız varsa ve daha fazlasını yapmak istiyorsanız: Gelişmiş özellikler bölümündeki{" "}
        <a href="/docs/placeholders">URL kişiselleştirme</a>,{" "}
        <a href="/docs/groups">Gruplar</a> veya{" "}
        <a href="/docs/reminders">Hatırlatıcılar</a> sayfalarına geçin.
      </p>
    </>
  );
}

const GOALS_PL = [
  {
    slug: "first-study",
    label: "Skonfiguruj moje pierwsze badanie",
    body: "Utwórz kontener — uczestnicy, harmonogramy i historia odpowiedzi znajdują się wewnątrz pojedynczego badania.",
    cta: "Twoje pierwsze badanie →",
  },
  {
    slug: "invite",
    label: "Zaproś uczestników",
    body: "Uczestnicy dołączają, dotykając linku lub skanując kod QR. Nigdy nie widzisz ich danych kontaktowych.",
    cta: "Zapraszanie uczestników →",
  },
  {
    slug: "types",
    label: "Wybierz typ harmonogramu",
    body: "Jednorazowy, powtarzalny, losowy lub osobisty — cztery typy, każdy dopasowany do innego projektu badawczego.",
    cta: "Cztery typy →",
  },
  {
    slug: "form",
    label: "Utwórz harmonogram",
    body: "Formularz harmonogramu prowadzi Cię kolejno przez Treść, Typ, Odbiorców i Opcje.",
    cta: "Tworzenie harmonogramu →",
  },
  {
    slug: "placeholders",
    label: "Personalizuj adresy URL ankiet",
    body: "Samply potrafi spersonalizować każdy link powiadomienia za pomocą identyfikatora uczestnika, identyfikatora badania lub niestandardowego kodu — dzięki czemu Twoje narzędzie ankietowe wie dokładnie, kto odpowiada.",
    cta: "Personalizacja adresów URL →",
  },
  {
    slug: "reminders",
    label: "Wysyłaj przypomnienia",
    body: "Automatycznie ponawiaj kontakt, gdy uczestnik nie odpowie w wyznaczonym oknie czasowym.",
    cta: "Przypomnienia →",
  },
];

const STEPS_PL = [
  {
    n: "01",
    title: "Utwórz badanie",
    body: "Badanie jest kontenerem najwyższego poziomu. Nadaj mu nazwę i formularz zgody — to wszystko, czego potrzebujesz, aby zacząć.",
  },
  {
    n: "02",
    title: "Dodaj harmonogram",
    body: "Wybierz typ harmonogramu (jednorazowy, powtarzalny, losowy lub osobisty), napisz tekst powiadomienia, ustaw czas i wybierz, kto ma je otrzymać.",
  },
  {
    n: "03",
    title: "Zarejestruj uczestników",
    body: "Udostępnij kod QR lub link zapraszający. Uczestnicy są zapisywani natychmiast, gdy dotkną go w aplikacji Samply Research.",
  },
  {
    n: "04",
    title: "Samply wysyła powiadomienia",
    body: "Panel rozwija każdy harmonogram w kolejkę na uczestnika i dostarcza każde powiadomienie we właściwym momencie.",
  },
  {
    n: "05",
    title: "Uczestnicy odpowiadają",
    body: "Dotknięcie powiadomienia otwiera Twój link ankiety. Ukończenia są rejestrowane automatycznie, gdy Samply wykryje odpowiedź.",
  },
];

function HomeContentPl() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>Zacznij tutaj</h2>
      <p>Wybierz zadanie pasujące do etapu, na którym aktualnie się znajdujesz.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_PL.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>Jak działa Samply</h2>
      <p>Pięć kroków od rejestracji do danych odpowiedzi.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_PL.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_PL.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_PL.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>Spojrzenie na kluczowe pojęcia</h2>
      <p>Krótki słowniczek przed rozpoczęciem. Pełne definicje znajdziesz w <a href="/docs/glossary">słowniku</a>.</p>

      <table>
        <thead>
          <tr>
            <th>Termin</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Badanie</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Kontener najwyższego poziomu. Wszystko — uczestnicy, harmonogramy, wyniki — należy do pojedynczego badania.</td></tr>
          <tr><td>Harmonogram</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Reguła określająca, <em>kto</em> otrzymuje powiadomienie, <em>kiedy</em> i <em>z jaką treścią</em>. Badanie może mieć wiele harmonogramów.</td></tr>
          <tr><td>Kolejka</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Rozwinięta lista pojedynczych wysyłek wygenerowanych z harmonogramu — jeden wiersz dla każdego czasu wysyłki dla każdego uczestnika.</td></tr>
          <tr><td>Uczestnik</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Osoba zapisana do Twojego badania za pośrednictwem aplikacji Samply Research. Identyfikowana anonimowym identyfikatorem zamiast danymi kontaktowymi.</td></tr>
          <tr><td>Ukończenie</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>Samply oznacza powiadomienie jako ukończone, gdy wykryje odpowiedź ankiety powiązaną z tą wysyłką.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>Jak cytować Samply</h2>
      <p>
        Jeśli używasz Samply w swoich badaniach, prosimy o cytowanie oryginalnej publikacji:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 1.6rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>Publikacja</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>Następny krok</h3>
      <p>
        Jeśli jesteś tu po raz pierwszy: przeczytaj stronę <a href="/docs/first-study">Twoje pierwsze badanie</a> — przeprowadzi Cię krok po kroku przez tworzenie badania, dodawanie harmonogramu i rejestrację pierwszego uczestnika.
      </p>
      <p>
        Jeśli masz już istniejące badanie i chcesz zrobić więcej: przejdź do stron{" "}
        <a href="/docs/placeholders">personalizacja adresów URL</a>,{" "}
        <a href="/docs/groups">Grupy</a> lub{" "}
        <a href="/docs/reminders">Przypomnienia</a> w sekcji funkcji zaawansowanych.
      </p>
    </>
  );
}

const GOALS_AR = [
  {
    slug: "first-study",
    label: "إعداد دراستي الأولى",
    body: "أنشئ الحاوية — يوجد المشاركون والجداول وسجل الإجابات جميعًا داخل دراسة واحدة.",
    cta: "دراستك الأولى ←",
  },
  {
    slug: "invite",
    label: "دعوة المشاركين",
    body: "ينضم المشاركون بالنقر على رابط أو بمسح رمز QR. لا ترى أبدًا تفاصيل الاتصال الخاصة بهم.",
    cta: "دعوة المشاركين ←",
  },
  {
    slug: "types",
    label: "اختيار نوع الجدول",
    body: "لمرة واحدة، أو متكرر، أو عشوائي، أو شخصي — أربعة أنواع، كل منها مناسب لتصميم بحثي مختلف.",
    cta: "الأنواع الأربعة ←",
  },
  {
    slug: "form",
    label: "إنشاء جدول",
    body: "يرشدك نموذج الجدول عبر المحتوى والنوع والجمهور والخيارات بهذا الترتيب.",
    cta: "إنشاء جدول ←",
  },
  {
    slug: "placeholders",
    label: "تخصيص روابط الاستطلاع",
    body: "يستطيع Samply تخصيص كل رابط إشعار بمعرّف المشارك أو معرّف الدراسة أو رمز مخصص — حتى تعرف أداة الاستطلاع لديك تحديدًا من قام بالإجابة.",
    cta: "تخصيص الروابط ←",
  },
  {
    slug: "reminders",
    label: "إرسال التذكيرات",
    body: "متابعة تلقائية إذا لم يستجب المشارك خلال نافذة زمنية محددة.",
    cta: "التذكيرات ←",
  },
];

const STEPS_AR = [
  {
    n: "01",
    title: "أنشئ دراسة",
    body: "الدراسة هي الحاوية الأعلى مستوى. امنحها اسمًا ونموذج موافقة — هذا كل ما تحتاجه للبدء.",
  },
  {
    n: "02",
    title: "أضف جدولًا",
    body: "اختر نوع الجدول (لمرة واحدة، متكرر، عشوائي أو شخصي)، واكتب نص الإشعار، وحدد التوقيت، واختر من يستقبله.",
  },
  {
    n: "03",
    title: "سجّل المشاركين",
    body: "شارك رمز QR أو رابط الانضمام. ينضم المشاركون فور النقر عليه في تطبيق Samply Research.",
  },
  {
    n: "04",
    title: "يرسل Samply الإشعارات",
    body: "تقوم لوحة التحكم بتوسيع كل جدول إلى طابور لكل مشارك وتسليم كل إشعار في الوقت المناسب.",
  },
  {
    n: "05",
    title: "يجيب المشاركون",
    body: "يفتح النقر على الإشعار رابط الاستطلاع الخاص بك. تُسجَّل عمليات الإكمال تلقائيًا عندما يكتشف Samply الإجابة.",
  },
];

function HomeContentAr() {
  return (
    <>
      {/* ── Start here ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: 0 }}>ابدأ هنا</h2>
      <p>اختر المهمة التي تتوافق مع المرحلة التي أنت فيها حاليًا.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(27rem, 1fr))", gap: "1.2rem", margin: "2.4rem 0 4rem" }}>
        {GOALS_AR.map((g) => (
          <a
            key={g.slug}
            href={`/docs/${g.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1.8rem 2rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", transition: "border-color 0.12s, box-shadow 0.12s" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{g.label}</span>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{g.body}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", marginTop: "0.6rem" }}>{g.cta}</span>
          </a>
        ))}
      </div>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <h2>كيف يعمل Samply</h2>
      <p>خمس خطوات من التسجيل إلى بيانات الإجابات.</p>

      <ol style={{ listStyle: "none", padding: 0, margin: "2.4rem 0 4rem", display: "flex", flexDirection: "column", gap: "0" }}>
        {STEPS_AR.map((s, i) => (
          <li
            key={s.n}
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.4rem", borderBottom: i < STEPS_AR.length - 1 ? "1px solid var(--ink-10)" : "none", marginBottom: i < STEPS_AR.length - 1 ? "2.4rem" : 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--coral)", fontWeight: 600, letterSpacing: "0.08em", flexShrink: 0, paddingTop: "0.3rem", width: "2.8rem" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{s.body}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Key concepts ────────────────────────────────────────────────── */}
      <h2>المفاهيم الرئيسية في لمحة</h2>
      <p>مفردات موجزة قبل الانطلاق. تجد التعريفات الكاملة في <a href="/docs/glossary">المسرد</a>.</p>

      <table>
        <thead>
          <tr>
            <th>المصطلح</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>الدراسة</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>الحاوية الأعلى مستوى. كل شيء — المشاركون والجداول والنتائج — ينتمي إلى دراسة واحدة.</td></tr>
          <tr><td>الجدول</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>قاعدة تحدد <em>من</em> يستقبل الإشعار و<em>متى</em> و<em>ما يحتوي عليه</em>. يمكن أن تحتوي الدراسة الواحدة على عدة جداول.</td></tr>
          <tr><td>الطابور</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>القائمة الموسعة لعمليات الإرسال الفردية الناتجة عن جدول — صف واحد لكل مشارك في كل وقت إرسال.</td></tr>
          <tr><td>المشارك</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>شخص مسجَّل في دراستك عبر تطبيق Samply Research. يُحدَّد بمعرّف مجهول الهوية وليس ببيانات اتصال.</td></tr>
          <tr><td>الإكمال</td><td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>يعتبر Samply الإشعار مكتملًا عندما يكتشف إجابة استطلاع مرتبطة بعملية الإرسال تلك.</td></tr>
        </tbody>
      </table>

      {/* ── Cite Samply ─────────────────────────────────────────────────── */}
      <h2>كيفية الاستشهاد بـ Samply</h2>
      <p>
        إذا كنت تستخدم Samply في بحثك، يُرجى الاستشهاد بالمنشور الأصلي:
      </p>
      <div style={{ background: "var(--coral-soft)", borderLeft: "3px solid var(--coral)", borderRadius: "0 0.8rem 0.8rem 0", padding: "1.4rem 1.6rem", margin: "0.4rem 0 1.6rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)", marginBottom: "0.7rem" }}>المنشور</div>
        <p style={{ margin: "0 0 0.8rem", fontSize: "1.3rem", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone app and web-based means of scheduling and sending mobile notifications for experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href="https://doi.org/10.3758/s13428-020-01527-9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", wordBreak: "break-all" }}>https://doi.org/10.3758/s13428-020-01527-9</a>
      </div>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <h3>الخطوة التالية</h3>
      <p>
        إذا كانت هذه زيارتك الأولى: اقرأ صفحة <a href="/docs/first-study">دراستك الأولى</a> — فهي ترشدك خطوة بخطوة في إنشاء دراسة وإضافة جدول وتسجيل أول مشارك.
      </p>
      <p>
        إذا كانت لديك بالفعل دراسة وتريد توسيع نطاقها: انتقل إلى{" "}
        <a href="/docs/placeholders">تخصيص الروابط</a>،{" "}
        <a href="/docs/groups">المجموعات</a> أو{" "}
        <a href="/docs/reminders">التذكيرات</a> في قسم الميزات المتقدمة.
      </p>
    </>
  );
}
