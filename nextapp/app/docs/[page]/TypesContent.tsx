import type { Locale } from "@/lib/i18n";

const TYPES_EN = [
  {
    n: "01",
    name: "One-time",
    tag: "fixed calendar",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Sends at one or more specific dates and times you choose on the calendar. Every participant receives the notification at the same wall-clock moment.",
    anchor: "one-time",
    use: [
      "Study kick-off or debriefing messages on a known date.",
      "Lab-controlled sessions where all participants are online simultaneously.",
      "Single-wave surveys with a fixed deadline.",
    ],
    avoid: [
      "Rolling enrolment where participants join on different days — everyone gets it at the same moment regardless of when they joined.",
      "Studies that run for weeks or months — use Repeating instead.",
    ],
    timing: "Step 2 → Specific time point(s) + Step 3 → Specific date(s).",
  },
  {
    n: "02",
    name: "Repeating",
    tag: "recurring pattern",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Fires on a recurring pattern between a start and end date — every day, every Nth day, specific weekdays, or specific days of the month. All participants receive it at the same clock time on each firing day.",
    anchor: "repeating",
    use: [
      "Daily diary studies where every participant answers at the same clock time.",
      "Weekly check-ins on a fixed weekday.",
      "Burst protocols on specific calendar dates.",
    ],
    avoid: [
      "Studies with rolling enrolment where each participant needs their own day-1 anchor — use Personal instead.",
      "Studies where you need different ping times each day — use Randomized instead.",
    ],
    timing: "Step 2 → Repeat + Step 3/4/5/6 → recurrence pattern and start/end dates.",
  },
  {
    n: "03",
    name: "Randomized",
    tag: "random within windows",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Defines one or more time windows (e.g., 09:00–12:00 and 14:00–18:00) and picks a random moment inside each window for each participant. Each participant gets a different time; the window boundaries are shared.",
    anchor: "randomized",
    use: [
      "ESM studies where you want multiple random pings per day within constrained windows.",
      "Any design requiring ecological validity — avoiding fixed-clock pings that participants can anticipate.",
      "Burst-sampling where N samples must be drawn per day with a minimum gap between them.",
    ],
    avoid: [
      "Situations where all participants must receive the notification simultaneously — use One-time or Repeating.",
    ],
    timing: "Step 2 → Time window. Set window start/end, how many random points to draw, and the minimum gap between pings.",
  },
  {
    n: "04",
    name: "Personal",
    tag: "relative to registration",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Anchors to each participant's enrolment date. Day 1 is the day they joined, regardless of the calendar. Two participants who join a week apart each start their own Day 1.",
    anchor: "personal",
    use: [
      "Longitudinal studies with rolling enrolment and a fixed study duration per person (e.g., 14-day protocol).",
      "Intervention studies where Day 1 = treatment day.",
      "Any design where elapsed days since joining matter more than the calendar date.",
    ],
    avoid: [
      "Studies where all participants must be in sync on the same calendar date — use Repeating or One-time.",
    ],
    timing: "Step 5 → start relative to registration (Day N after joining). Step 6 → stop relative to registration.",
    more: "/docs/personal",
  },
];

const TYPES_DE = [
  {
    n: "01",
    name: "Einmalig",
    tag: "fester Kalender",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Sendet an einem oder mehreren bestimmten Datums- und Uhrzeiten, die Sie im Kalender auswählen. Alle Teilnehmenden erhalten die Benachrichtigung zum gleichen Zeitpunkt.",
    anchor: "one-time",
    use: [
      "Studienauftakt- oder Debriefing-Nachrichten an einem bekannten Datum.",
      "Laborkontrollierte Sitzungen, bei denen alle Teilnehmenden gleichzeitig online sind.",
      "Einwellige Befragungen mit festem Abgabetermin.",
    ],
    avoid: [
      "Laufende Einschreibung, bei der Teilnehmende an verschiedenen Tagen beitreten — alle erhalten die Benachrichtigung zum gleichen Zeitpunkt, unabhängig davon, wann sie beigetreten sind.",
      "Studien, die Wochen oder Monate dauern — verwenden Sie stattdessen Wiederkehrend.",
    ],
    timing: "Schritt 2 → Bestimmter Zeitpunkt(e) + Schritt 3 → Bestimmtes Datum (Daten).",
  },
  {
    n: "02",
    name: "Wiederkehrend",
    tag: "wiederkehrendes Muster",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Wird nach einem wiederkehrenden Muster zwischen einem Start- und Enddatum ausgelöst — täglich, jeden N-ten Tag, an bestimmten Wochentagen oder an bestimmten Tagen des Monats. Alle Teilnehmenden erhalten die Benachrichtigung zur gleichen Uhrzeit an jedem Auslösetag.",
    anchor: "repeating",
    use: [
      "Tagebuchwudien, bei denen alle Teilnehmenden zur gleichen Uhrzeit antworten.",
      "Wöchentliche Check-ins an einem festen Wochentag.",
      "Burst-Protokolle an bestimmten Kalenderdaten.",
    ],
    avoid: [
      "Studien mit laufender Einschreibung, bei denen jede teilnehmende Person einen eigenen Tag-1-Anker benötigt — verwenden Sie stattdessen Persönlich.",
      "Studien, bei denen Sie jeden Tag unterschiedliche Benachrichtigungszeiten benötigen — verwenden Sie stattdessen Zufällig.",
    ],
    timing: "Schritt 2 → Wiederholen + Schritt 3/4/5/6 → Wiederholungsmuster und Start-/Enddaten.",
  },
  {
    n: "03",
    name: "Zufällig",
    tag: "zufällig innerhalb von Zeitfenstern",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Definiert ein oder mehrere Zeitfenster (z. B. 09:00–12:00 und 14:00–18:00) und wählt für jede teilnehmende Person einen zufälligen Zeitpunkt innerhalb jedes Fensters. Jede teilnehmende Person erhält eine andere Uhrzeit; die Fenstergrenzen sind gemeinsam.",
    anchor: "randomized",
    use: [
      "ESM-Studien, bei denen Sie mehrere zufällige Benachrichtigungen pro Tag innerhalb begrenzter Zeitfenster wünschen.",
      "Jedes Design, das ökologische Validität erfordert — Vermeidung von festen Benachrichtigungszeiten, die Teilnehmende vorhersehen können.",
      "Burst-Sampling, bei dem N Stichproben pro Tag mit einem Mindestabstand zwischen ihnen gezogen werden müssen.",
    ],
    avoid: [
      "Situationen, in denen alle Teilnehmenden die Benachrichtigung gleichzeitig erhalten müssen — verwenden Sie Einmalig oder Wiederkehrend.",
    ],
    timing: "Schritt 2 → Zeitfenster. Legen Sie Start/Ende des Fensters, die Anzahl der zufälligen Zeitpunkte und den Mindestabstand zwischen Benachrichtigungen fest.",
  },
  {
    n: "04",
    name: "Persönlich",
    tag: "relativ zur Registrierung",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Verankert am Einschreibedatum jeder teilnehmenden Person. Tag 1 ist der Tag, an dem sie beigetreten sind, unabhängig vom Kalender. Zwei Teilnehmende, die eine Woche auseinander beitreten, beginnen jeweils ihren eigenen Tag 1.",
    anchor: "personal",
    use: [
      "Längsschnittstudien mit laufender Einschreibung und einer festen Studiendauer pro Person (z. B. 14-Tage-Protokoll).",
      "Interventionsstudien, bei denen Tag 1 = Behandlungstag ist.",
      "Jedes Design, bei dem vergangene Tage seit dem Beitritt wichtiger sind als das Kalenderdatum.",
    ],
    avoid: [
      "Studien, bei denen alle Teilnehmenden am gleichen Kalenderdatum synchron sein müssen — verwenden Sie Wiederkehrend oder Einmalig.",
    ],
    timing: "Schritt 5 → Start relativ zur Registrierung (Tag N nach dem Beitritt). Schritt 6 → Ende relativ zur Registrierung.",
    more: "/docs/personal",
  },
];

const COMPARISON_EN: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "All participants pinged at the same wall-clock time?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Timing relative to each participant's join date?",    onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Can send multiple times per day?",                    onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Works with rolling enrolment?",                       onetime: false, repeating: false, randomized: false, personal: true  },
];

const COMPARISON_DE: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Alle Teilnehmenden zur gleichen Uhrzeit benachrichtigt?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Zeitplan relativ zum Beitrittsdatum jeder teilnehmenden Person?", onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Kann mehrmals täglich senden?",                            onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Funktioniert mit laufender Einschreibung?",                onetime: false, repeating: false, randomized: false, personal: true  },
];

const TYPES_NL = [
  {
    n: "01",
    name: "Eenmalig",
    tag: "vaste kalender",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Verzendt op een of meer specifieke datums en tijdstippen die u in de kalender kiest. Alle deelnemers ontvangen de melding op hetzelfde kloktijdstip.",
    anchor: "one-time",
    use: [
      "Studiestart- of debriefingberichten op een bekende datum.",
      "Labgecontroleerde sessies waarbij alle deelnemers tegelijkertijd online zijn.",
      "Enkelvoudige enquêtes met een vaste deadline.",
    ],
    avoid: [
      "Doorlopende inschrijving waarbij deelnemers op verschillende dagen instappen — iedereen ontvangt de melding op hetzelfde moment, ongeacht wanneer zij zich hebben ingeschreven.",
      "Studies die weken of maanden duren — gebruik in plaats daarvan Herhalend.",
    ],
    timing: "Stap 2 → Specifiek tijdstip(pen) + Stap 3 → Specifieke datum(s).",
  },
  {
    n: "02",
    name: "Herhalend",
    tag: "terugkerend patroon",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Wordt op een terugkerend patroon tussen een start- en einddatum verzonden — elke dag, elke N-de dag, specifieke weekdagen of specifieke dagen van de maand. Alle deelnemers ontvangen de melding op hetzelfde kloktijdstip op elke verzenddag.",
    anchor: "repeating",
    use: [
      "Dagboekstudies waarbij alle deelnemers op hetzelfde kloktijdstip antwoorden.",
      "Wekelijkse check-ins op een vaste weekdag.",
      "Burst-protocollen op specifieke kalenderdatums.",
    ],
    avoid: [
      "Studies met doorlopende inschrijving waarbij elke deelnemer een eigen dag-1-anker nodig heeft — gebruik in plaats daarvan Persoonlijk.",
      "Studies waarbij u elke dag andere meldingstijden nodig heeft — gebruik in plaats daarvan Willekeurig.",
    ],
    timing: "Stap 2 → Herhalen + Stap 3/4/5/6 → herhalingspatroon en start-/einddatums.",
  },
  {
    n: "03",
    name: "Willekeurig",
    tag: "willekeurig binnen tijdvensters",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Definieert een of meer tijdvensters (bijv. 09:00–12:00 en 14:00–18:00) en kiest een willekeurig moment binnen elk venster voor elke deelnemer. Elke deelnemer krijgt een ander tijdstip; de venstergrenzen zijn gedeeld.",
    anchor: "randomized",
    use: [
      "ESM-studies waarbij u meerdere willekeurige meldingen per dag wilt binnen afgebakende tijdvensters.",
      "Elk ontwerp dat ecologische validiteit vereist — het vermijden van vaste kloktijdmeldingen die deelnemers kunnen anticiperen.",
      "Burst-sampling waarbij N steekproeven per dag moeten worden getrokken met een minimale tussenruimte.",
    ],
    avoid: [
      "Situaties waarbij alle deelnemers de melding gelijktijdig moeten ontvangen — gebruik Eenmalig of Herhalend.",
    ],
    timing: "Stap 2 → Tijdvenster. Stel het begin/einde van het venster in, het aantal willekeurige punten en de minimale tussenruimte tussen meldingen.",
  },
  {
    n: "04",
    name: "Persoonlijk",
    tag: "relatief aan registratie",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Verankert aan de inschrijfdatum van elke deelnemer. Dag 1 is de dag waarop zij zich hebben aangemeld, ongeacht de kalender. Twee deelnemers die een week apart instromen, starten elk hun eigen Dag 1.",
    anchor: "personal",
    use: [
      "Longitudinale studies met doorlopende inschrijving en een vaste studieduur per persoon (bijv. 14-daags protocol).",
      "Interventiestudies waarbij Dag 1 = behandeldag.",
      "Elk ontwerp waarbij verstreken dagen sinds aanmelding meer uitmaken dan de kalenderdatum.",
    ],
    avoid: [
      "Studies waarbij alle deelnemers gesynchroniseerd moeten zijn op dezelfde kalenderdatum — gebruik Herhalend of Eenmalig.",
    ],
    timing: "Stap 5 → start relatief aan registratie (Dag N na aanmelding). Stap 6 → stop relatief aan registratie.",
    more: "/docs/personal",
  },
];

const COMPARISON_NL: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Alle deelnemers op hetzelfde kloktijdstip een melding?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Tijdschema relatief aan de inschrijfdatum van elke deelnemer?",    onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Kan meerdere keren per dag verzenden?",                    onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Werkt met doorlopende inschrijving?",                       onetime: false, repeating: false, randomized: false, personal: true  },
];

const TYPES_RU = [
  {
    n: "01",
    name: "Разовое",
    tag: "фиксированный календарь",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Отправляет уведомление в один или несколько конкретных дней и времени, выбранных вами в календаре. Все участники получают уведомление в один и тот же момент по часам.",
    anchor: "one-time",
    use: [
      "Сообщения об открытии исследования или дебрифинге в известную дату.",
      "Лабораторные сессии, где все участники онлайн одновременно.",
      "Одноволновые опросы с фиксированным сроком.",
    ],
    avoid: [
      "Скользящая регистрация, когда участники вступают в разные дни — все получат уведомление в один момент, независимо от даты вступления.",
      "Исследования, продолжающиеся недели или месяцы — используйте вместо этого Повторяющееся.",
    ],
    timing: "Шаг 2 → Конкретный момент(ы) времени + Шаг 3 → Конкретная дата (даты).",
  },
  {
    n: "02",
    name: "Повторяющееся",
    tag: "повторяющийся шаблон",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Срабатывает по повторяющемуся шаблону между датой начала и датой окончания — каждый день, каждый N-й день, в определённые дни недели или в определённые дни месяца. Все участники получают уведомление в одно и то же время в каждый день срабатывания.",
    anchor: "repeating",
    use: [
      "Дневниковые исследования, в которых все участники отвечают в одно и то же время.",
      "Еженедельные проверки в фиксированный день недели.",
      "Burst-протоколы в конкретные календарные даты.",
    ],
    avoid: [
      "Исследования со скользящей регистрацией, где каждому участнику нужен собственный якорь День 1 — используйте вместо этого Персональное.",
      "Исследования, где требуются разные времена сигналов каждый день — используйте вместо этого Случайное.",
    ],
    timing: "Шаг 2 → Повторение + Шаг 3/4/5/6 → шаблон повторения и даты начала/окончания.",
  },
  {
    n: "03",
    name: "Случайное",
    tag: "случайное в пределах окон",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Задаёт одно или несколько временных окон (например, 09:00–12:00 и 14:00–18:00) и выбирает случайный момент внутри каждого окна для каждого участника. Каждый участник получает своё время; границы окна общие для всех.",
    anchor: "randomized",
    use: [
      "ESM-исследования, в которых вам нужно несколько случайных сигналов в день в пределах ограниченных окон.",
      "Любой дизайн, требующий экологической валидности — исключение фиксированных сигналов, которые участники могут предугадать.",
      "Burst-выборка, при которой N выборок в день должны быть получены с минимальным промежутком между ними.",
    ],
    avoid: [
      "Ситуации, когда все участники должны получить уведомление одновременно — используйте Разовое или Повторяющееся.",
    ],
    timing: "Шаг 2 → Временное окно. Задайте начало/конец окна, количество случайных точек и минимальный промежуток между сигналами.",
  },
  {
    n: "04",
    name: "Персональное",
    tag: "относительно даты регистрации",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Привязывается к дате регистрации каждого участника. День 1 — это день вступления, независимо от календаря. Два участника, вступившие с разницей в неделю, каждый начинают свой собственный День 1.",
    anchor: "personal",
    use: [
      "Продольные исследования со скользящей регистрацией и фиксированной продолжительностью для каждого участника (например, 14-дневный протокол).",
      "Интервенционные исследования, где День 1 = день лечения.",
      "Любой дизайн, в котором количество прошедших дней с момента вступления важнее календарной даты.",
    ],
    avoid: [
      "Исследования, где все участники должны быть синхронизированы по одной и той же календарной дате — используйте Повторяющееся или Разовое.",
    ],
    timing: "Шаг 5 → начало относительно регистрации (День N после вступления). Шаг 6 → окончание относительно регистрации.",
    more: "/docs/personal",
  },
];

const COMPARISON_RU: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Все участники получают сигнал в одно и то же время по часам?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Время относительно даты вступления каждого участника?",        onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Может отправлять несколько раз в день?",                       onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Работает со скользящей регистрацией?",                         onetime: false, repeating: false, randomized: false, personal: true  },
];

const TYPES_ZH = [
  {
    n: "01",
    name: "一次性",
    tag: "fixed calendar",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "在您在日历中选择的一个或多个特定日期和时间发送。所有参与者在同一时钟时刻收到通知。",
    anchor: "one-time",
    use: [
      "在已知日期发送研究启动或汇报消息。",
      "所有参与者同时在线的实验室控制会话。",
      "有固定截止日期的单波次问卷。",
    ],
    avoid: [
      "参与者在不同日期加入的滚动注册场景——所有人会在同一时刻收到通知，无论其何时加入。",
      "持续数周或数月的研究——请改用重复性日程。",
    ],
    timing: "第 2 步 → 特定时间点 + 第 3 步 → 特定日期。",
  },
  {
    n: "02",
    name: "重复性",
    tag: "recurring pattern",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "按重复模式在起止日期之间触发——每天、每 N 天、特定星期几或每月特定日期。所有参与者在每个触发日的相同时钟时间收到通知。",
    anchor: "repeating",
    use: [
      "所有参与者在相同时钟时间作答的日记研究。",
      "固定星期几的每周签到。",
      "特定日历日期的集中采样协议。",
    ],
    avoid: [
      "每位参与者需要独立的第 1 天锚点的滚动注册研究——请改用个人日程。",
      "每天需要不同推送时间的研究——请改用随机日程。",
    ],
    timing: "第 2 步 → 重复 + 第 3/4/5/6 步 → 重复模式及起止日期。",
  },
  {
    n: "03",
    name: "随机",
    tag: "random within windows",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "定义一个或多个时间窗口（例如 09:00–12:00 和 14:00–18:00），并为每位参与者在每个窗口内选取一个随机时刻。每位参与者获得不同的时间；窗口边界对所有人共享。",
    anchor: "randomized",
    use: [
      "需要在受限窗口内每天随机推送多次的 ESM 研究。",
      "任何需要生态效度的设计——避免参与者可以预判的固定时钟推送。",
      "需要每天在最小间隔下抽取 N 个样本的集中采样研究。",
    ],
    avoid: [
      "所有参与者必须同时收到通知的场景——请使用一次性或重复性日程。",
    ],
    timing: "第 2 步 → 时间窗口。设置窗口起止时间、随机抽取的时间点数量以及推送之间的最小间隔。",
  },
  {
    n: "04",
    name: "个人",
    tag: "relative to registration",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "锚定到每位参与者的注册日期。第 1 天是他们加入的当天，与日历无关。相隔一周加入的两位参与者各自拥有独立的第 1 天。",
    anchor: "personal",
    use: [
      "滚动注册且每人具有固定研究时长的纵向研究（例如 14 天协议）。",
      "第 1 天 = 治疗日的干预研究。",
      "任何加入后经过天数比日历日期更重要的设计。",
    ],
    avoid: [
      "所有参与者必须在同一日历日期同步的研究——请使用重复性或一次性日程。",
    ],
    timing: "第 5 步 → 相对于注册的开始时间（加入后第 N 天）。第 6 步 → 相对于注册的结束时间。",
    more: "/docs/personal",
  },
];

const COMPARISON_ZH: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "所有参与者在相同时钟时间收到推送？", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "时间相对于每位参与者的加入日期？",   onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "每天可发送多次？",                   onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "支持滚动注册？",                     onetime: false, repeating: false, randomized: false, personal: true  },
];

const Tick = ({ v }: { v: boolean }) => (
  <span style={{ color: v ? "var(--sage)" : "var(--ink-20)", fontSize: "1.3rem", fontWeight: 700 }}>{v ? "✓" : "✗"}</span>
);

export default function TypesContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <TypesContentDe />;
  if (locale === "nl") return <TypesContentNl />;
  if (locale === "ru") return <TypesContentRu />;
  if (locale === "zh") return <TypesContentZh />;
  if (locale === "ko") return <TypesContentKo />;
  if (locale === "it") return <TypesContentIt />;
  if (locale === "fr") return <TypesContentFr />;
  if (locale === "es") return <TypesContentEs />;
  if (locale === "pt") return <TypesContentPt />;
  return <TypesContentEn />;
}

function TypesContentEn() {
  const TYPES = TYPES_EN;
  const COMPARISON = COMPARISON_EN;
  return (
    <>
      <p>
        The type determines <em>when</em> a notification fires and <em>how</em> that timing
        relates to the calendar versus to each participant. Get this right before you touch anything else.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Use when</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Avoid when</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>form:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Full guide →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Side-by-side comparison</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Property</th>
            <th style={{ textAlign: "center" }}>One-time</th>
            <th style={{ textAlign: "center" }}>Repeating</th>
            <th style={{ textAlign: "center" }}>Randomized</th>
            <th style={{ textAlign: "center" }}>Personal</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combining types</h2>
      <p>
        One study can have multiple schedules of different types. A common design pairs a{" "}
        <strong>Repeating</strong> schedule for a fixed daily survey with a <strong>Randomized</strong>{" "}
        schedule for ecological momentary pings — all in the same study, targeting the same participants.
      </p>
      <p>
        A Personal schedule can also use randomized send times within each day. In that case the
        schedule is still classified as <strong>Personal</strong>, because what defines it is that the
        start and end days are anchored to each participant's join date. The randomized timing is a
        secondary property within that anchor.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>What to read next</h3>
      <p>
        Once you know which type fits your study:{" "}
        <a href="/docs/form">Creating a schedule</a> walks through the full form section by section.
        For Personal schedules specifically, <a href="/docs/personal">Personal scheduling</a> covers
        the day-offset logic in depth.
      </p>
    </>
  );
}

function TypesContentDe() {
  const TYPES = TYPES_DE;
  const COMPARISON = COMPARISON_DE;
  return (
    <>
      <p>
        Der Typ bestimmt, <em>wann</em> eine Benachrichtigung ausgelöst wird und <em>wie</em> dieser
        Zeitplan zum Kalender im Verhältnis zu den einzelnen Teilnehmenden steht. Legen Sie dies fest,
        bevor Sie irgendetwas anderes ändern.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Verwenden wenn</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Vermeiden wenn</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>Formular:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Vollständige Anleitung →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Vergleich nebeneinander</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Eigenschaft</th>
            <th style={{ textAlign: "center" }}>Einmalig</th>
            <th style={{ textAlign: "center" }}>Wiederkehrend</th>
            <th style={{ textAlign: "center" }}>Zufällig</th>
            <th style={{ textAlign: "center" }}>Persönlich</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Typen kombinieren</h2>
      <p>
        Eine Studie kann mehrere Zeitpläne verschiedener Typen haben. Ein häufiges Design kombiniert einen{" "}
        <strong>Wiederkehrenden</strong> Zeitplan für eine feste tägliche Befragung mit einem <strong>Zufälligen</strong>{" "}
        Zeitplan für ökologische Momentaufnahmen — alles in derselben Studie, ausgerichtet auf die gleichen Teilnehmenden.
      </p>
      <p>
        Ein persönlicher Zeitplan kann auch zufällige Sendezeiten innerhalb jedes Tages verwenden. In diesem Fall
        wird der Zeitplan weiterhin als <strong>Persönlich</strong> klassifiziert, da das Definierende ist, dass
        Start- und Endtage am Beitrittsdatum jeder teilnehmenden Person verankert sind. Die zufällige
        Zeitplanung ist eine sekundäre Eigenschaft innerhalb dieses Ankers.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Was als nächstes lesen</h3>
      <p>
        Sobald Sie wissen, welcher Typ zu Ihrer Studie passt:{" "}
        <a href="/docs/form">Einen Zeitplan erstellen</a> führt Sie Schritt für Schritt durch das vollständige Formular.
        Für persönliche Zeitpläne im Speziellen erklärt <a href="/docs/personal">Persönliche Planung</a> die
        Tages-Offset-Logik im Detail.
      </p>
    </>
  );
}

function TypesContentNl() {
  const TYPES = TYPES_NL;
  const COMPARISON = COMPARISON_NL;
  return (
    <>
      <p>
        Het type bepaalt <em>wanneer</em> een melding wordt verzonden en <em>hoe</em> dat tijdstip
        zich verhoudt tot de kalender versus tot elke individuele deelnemer. Bepaal dit voordat u iets anders aanpast.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Gebruik wanneer</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Vermijd wanneer</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>formulier:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Volledige gids →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Vergelijking naast elkaar</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Eigenschap</th>
            <th style={{ textAlign: "center" }}>Eenmalig</th>
            <th style={{ textAlign: "center" }}>Herhalend</th>
            <th style={{ textAlign: "center" }}>Willekeurig</th>
            <th style={{ textAlign: "center" }}>Persoonlijk</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Typen combineren</h2>
      <p>
        Een studie kan meerdere schema's van verschillende typen hebben. Een veelgebruikt ontwerp combineert een{" "}
        <strong>Herhalend</strong> schema voor een vaste dagelijkse enquête met een <strong>Willekeurig</strong>{" "}
        schema voor ecologische momentopname-meldingen — alles in dezelfde studie, gericht op dezelfde deelnemers.
      </p>
      <p>
        Een Persoonlijk schema kan ook willekeurige verzendtijden binnen elke dag gebruiken. In dat geval wordt het
        schema toch geclassificeerd als <strong>Persoonlijk</strong>, omdat het bepalende kenmerk is dat de
        start- en einddagen zijn verankerd aan de inschrijfdatum van elke deelnemer. De willekeurige timing is een
        secundaire eigenschap binnen dat anker.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Wat u hierna kunt lezen</h3>
      <p>
        Zodra u weet welk type bij uw studie past:{" "}
        <a href="/docs/form">Een schema aanmaken</a> doorloopt het volledige formulier stap voor stap.
        Voor Persoonlijke schema's specifiek behandelt <a href="/docs/personal">Persoonlijke planning</a> de
        dag-offset-logica in detail.
      </p>
    </>
  );
}

function TypesContentRu() {
  const TYPES = TYPES_RU;
  const COMPARISON = COMPARISON_RU;
  return (
    <>
      <p>
        Тип определяет, <em>когда</em> срабатывает уведомление и <em>как</em> это время
        соотносится с календарём или с каждым участником в отдельности. Определитесь с этим прежде,
        чем настраивать что-либо ещё.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Использовать когда</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Избегать когда</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>форма:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Полное руководство →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Сравнительная таблица</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Свойство</th>
            <th style={{ textAlign: "center" }}>Разовое</th>
            <th style={{ textAlign: "center" }}>Повторяющееся</th>
            <th style={{ textAlign: "center" }}>Случайное</th>
            <th style={{ textAlign: "center" }}>Персональное</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Комбинирование типов</h2>
      <p>
        Одно исследование может содержать несколько расписаний разных типов. Распространённый дизайн
        совмещает{" "}
        <strong>Повторяющееся</strong> расписание для фиксированного ежедневного опроса со{" "}
        <strong>Случайным</strong>{" "}
        расписанием для экологических моментальных сигналов — всё в одном исследовании, нацеленном
        на одних и тех же участников.
      </p>
      <p>
        Персональное расписание также может использовать случайное время отправки внутри каждого дня.
        В этом случае расписание по-прежнему классифицируется как <strong>Персональное</strong>, поскольку
        его определяющая черта состоит в том, что дни начала и окончания привязаны к дате вступления
        каждого участника. Случайный выбор времени — это вторичное свойство внутри этой привязки.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Что читать дальше</h3>
      <p>
        Как только вы определили подходящий тип:{" "}
        <a href="/docs/form">Создание расписания</a> проведёт вас через всю форму раздел за разделом.
        Для персональных расписаний в частности, <a href="/docs/personal">Персональное расписание</a> подробно
        описывает логику смещения по дням.
      </p>
    </>
  );
}

function TypesContentZh() {
  const TYPES = TYPES_ZH;
  const COMPARISON = COMPARISON_ZH;
  return (
    <>
      <p>
        类型决定通知<em>何时</em>触发，以及该时间<em>如何</em>与日历或每位参与者相关联。在设置其他任何内容之前，请先确定好这一点。
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>适用场景</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>避免场景</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>表单：</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>完整指南 →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>并排比较</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>属性</th>
            <th style={{ textAlign: "center" }}>一次性</th>
            <th style={{ textAlign: "center" }}>重复性</th>
            <th style={{ textAlign: "center" }}>随机</th>
            <th style={{ textAlign: "center" }}>个人</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>组合使用多种类型</h2>
      <p>
        一个研究可以包含多个不同类型的日程。一种常见的设计是将用于固定每日问卷的{" "}
        <strong>重复性</strong>日程与用于生态瞬时采样的<strong>随机</strong>{" "}
        日程搭配使用——所有这些都在同一研究中，针对相同的参与者。
      </p>
      <p>
        个人日程也可以在每天内使用随机发送时间。在这种情况下，该日程仍被分类为<strong>个人</strong>类型，因为其定义特征在于起止天数锚定于每位参与者的加入日期。随机时间选取是该锚定机制内的次要属性。
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>接下来阅读</h3>
      <p>
        一旦确定了适合您研究的类型：{" "}
        <a href="/docs/form">创建日程</a> 将逐节引导您完成整个表单。
        对于个人日程，<a href="/docs/personal">个人日程</a> 深入介绍了天数偏移逻辑。
      </p>
    </>
  );
}

const TYPES_KO = [
  {
    n: "01",
    name: "일회성",
    tag: "고정 달력",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "달력에서 선택한 하나 이상의 특정 날짜와 시간에 발송됩니다. 모든 참여자가 동일한 시각에 알림을 받습니다.",
    anchor: "one-time",
    use: [
      "알려진 날짜에 연구 시작 또는 디브리핑 메시지를 보낼 때.",
      "모든 참여자가 동시에 온라인인 실험실 통제 세션.",
      "고정 마감일이 있는 단일 단계 설문조사.",
    ],
    avoid: [
      "참여자가 각기 다른 날 참여하는 순차 모집 — 참여 시점과 관계없이 모두 동일한 시각에 알림을 받습니다.",
      "수주 또는 수개월에 걸친 연구 — 반복 유형을 사용하십시오.",
    ],
    timing: "2단계 → 특정 시간 지점 + 3단계 → 특정 날짜.",
  },
  {
    n: "02",
    name: "반복",
    tag: "반복 패턴",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "시작일과 종료일 사이에 반복 패턴으로 발송됩니다 — 매일, N일마다, 특정 요일, 또는 매월 특정 날. 모든 참여자가 각 발송일에 동일한 시각에 알림을 받습니다.",
    anchor: "repeating",
    use: [
      "모든 참여자가 동일한 시각에 응답하는 일기 연구.",
      "고정된 요일의 주간 체크인.",
      "특정 달력 날짜의 집중 프로토콜.",
    ],
    avoid: [
      "각 참여자에게 독립적인 1일차 기준이 필요한 순차 모집 연구 — 개인 유형을 사용하십시오.",
      "매일 다른 알림 시간이 필요한 연구 — 무작위 유형을 사용하십시오.",
    ],
    timing: "2단계 → 반복 + 3/4/5/6단계 → 반복 패턴 및 시작/종료 날짜.",
  },
  {
    n: "03",
    name: "무작위",
    tag: "창 내 무작위",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "하나 이상의 시간 창(예: 09:00–12:00 및 14:00–18:00)을 정의하고 각 참여자에게 창 안의 무작위 시각을 선택합니다. 각 참여자는 서로 다른 시각을 받으며, 창 경계는 모두 공유됩니다.",
    anchor: "randomized",
    use: [
      "제한된 창 안에서 하루에 여러 번 무작위 알림을 보내는 ESM 연구.",
      "생태적 타당성이 필요한 설계 — 참여자가 예측할 수 있는 고정 시각 알림 방지.",
      "하루에 N개의 샘플을 최소 간격으로 추출해야 하는 집중 샘플링.",
    ],
    avoid: [
      "모든 참여자가 동시에 알림을 받아야 하는 상황 — 일회성 또는 반복 유형을 사용하십시오.",
    ],
    timing: "2단계 → 시간 창. 창 시작/종료, 무작위 추출 횟수, 알림 간 최소 간격을 설정하십시오.",
  },
  {
    n: "04",
    name: "개인",
    tag: "등록 기준 상대적",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "각 참여자의 등록일을 기준으로 합니다. 1일차는 참여자가 참여한 날로, 달력과 무관합니다. 일주일 차이로 참여한 두 참여자는 각자 독립적인 1일차를 시작합니다.",
    anchor: "personal",
    use: [
      "순차 모집과 1인당 고정 연구 기간이 있는 종단 연구(예: 14일 프로토콜).",
      "1일차 = 처치일인 중재 연구.",
      "달력 날짜보다 참여 후 경과 일수가 더 중요한 설계.",
    ],
    avoid: [
      "모든 참여자가 동일한 달력 날짜에 동기화되어야 하는 연구 — 반복 또는 일회성 유형을 사용하십시오.",
    ],
    timing: "5단계 → 등록 기준 시작(참여 후 N일차). 6단계 → 등록 기준 종료.",
    more: "/docs/personal",
  },
];

const COMPARISON_KO: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "모든 참여자가 동일한 시각에 알림을 받습니까?", onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "각 참여자의 참여 날짜를 기준으로 한 일정입니까?", onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "하루에 여러 번 발송할 수 있습니까?",              onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "순차 모집과 함께 작동합니까?",                    onetime: false, repeating: false, randomized: false, personal: true  },
];

const TYPES_IT = [
  {
    n: "01",
    name: "Una tantum",
    tag: "calendario fisso",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Invia in una o più date e orari specifici scelti nel calendario. Tutti i partecipanti ricevono la notifica nello stesso momento.",
    anchor: "one-time",
    use: [
      "Messaggi di avvio dello studio o di debriefing in una data nota.",
      "Sessioni controllate in laboratorio in cui tutti i partecipanti sono online contemporaneamente.",
      "Sondaggi a ondata singola con una scadenza fissa.",
    ],
    avoid: [
      "Arruolamento continuato in cui i partecipanti si uniscono in giorni diversi — tutti ricevono la notifica nello stesso momento indipendentemente da quando si sono iscritti.",
      "Studi che durano settimane o mesi — utilizzare invece il tipo Ripetuto.",
    ],
    timing: "Passo 2 → Punto(i) temporale(i) specifico(i) + Passo 3 → Data(e) specifica(he).",
  },
  {
    n: "02",
    name: "Ripetuto",
    tag: "schema ricorrente",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Si attiva con uno schema ricorrente tra una data di inizio e una di fine — ogni giorno, ogni N giorni, giorni specifici della settimana o giorni specifici del mese. Tutti i partecipanti lo ricevono alla stessa ora in ogni giorno di attivazione.",
    anchor: "repeating",
    use: [
      "Studi a diario in cui tutti i partecipanti rispondono alla stessa ora.",
      "Check-in settimanali in un giorno fisso della settimana.",
      "Protocolli a burst in date di calendario specifiche.",
    ],
    avoid: [
      "Studi con arruolamento continuato in cui ogni partecipante necessita del proprio ancoraggio al Giorno 1 — utilizzare invece il tipo Personale.",
      "Studi in cui sono necessari orari di notifica diversi ogni giorno — utilizzare invece il tipo Randomizzato.",
    ],
    timing: "Passo 2 → Ripeti + Passo 3/4/5/6 → schema di ricorrenza e date di inizio/fine.",
  },
  {
    n: "03",
    name: "Randomizzato",
    tag: "casuale entro finestre",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Definisce una o più finestre temporali (ad es. 09:00–12:00 e 14:00–18:00) e sceglie un momento casuale all'interno di ciascuna finestra per ogni partecipante. Ogni partecipante riceve un orario diverso; i limiti della finestra sono condivisi.",
    anchor: "randomized",
    use: [
      "Studi ESM in cui si desidera inviare più notifiche casuali al giorno entro finestre delimitate.",
      "Qualsiasi disegno che richieda validità ecologica — evitando notifiche a orario fisso che i partecipanti possono anticipare.",
      "Campionamento a burst in cui N campioni devono essere raccolti al giorno con un intervallo minimo tra di essi.",
    ],
    avoid: [
      "Situazioni in cui tutti i partecipanti devono ricevere la notifica contemporaneamente — utilizzare Una tantum o Ripetuto.",
    ],
    timing: "Passo 2 → Finestra temporale. Impostare inizio/fine della finestra, quanti punti casuali estrarre e l'intervallo minimo tra le notifiche.",
  },
  {
    n: "04",
    name: "Personale",
    tag: "relativo alla registrazione",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Ancorato alla data di iscrizione di ogni partecipante. Il Giorno 1 è il giorno in cui si sono uniti, indipendentemente dal calendario. Due partecipanti che si iscrivono a una settimana di distanza iniziano ciascuno il proprio Giorno 1.",
    anchor: "personal",
    use: [
      "Studi longitudinali con arruolamento continuato e una durata fissa per persona (ad es. protocollo di 14 giorni).",
      "Studi di intervento in cui il Giorno 1 = giorno del trattamento.",
      "Qualsiasi disegno in cui i giorni trascorsi dall'iscrizione contano più della data di calendario.",
    ],
    avoid: [
      "Studi in cui tutti i partecipanti devono essere sincronizzati sulla stessa data di calendario — utilizzare Ripetuto o Una tantum.",
    ],
    timing: "Passo 5 → inizio relativo alla registrazione (Giorno N dopo l'iscrizione). Passo 6 → fine relativa alla registrazione.",
    more: "/docs/personal",
  },
];

const COMPARISON_IT: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Tutti i partecipanti ricevono la notifica alla stessa ora?",           onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Tempistica relativa alla data di iscrizione di ogni partecipante?",    onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Può inviare più volte al giorno?",                                     onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Funziona con l'arruolamento continuato?",                              onetime: false, repeating: false, randomized: false, personal: true  },
];

function TypesContentKo() {
  const TYPES = TYPES_KO;
  const COMPARISON = COMPARISON_KO;
  return (
    <>
      <p>
        유형은 알림이 <em>언제</em> 발송될지와 그 시간이 달력 또는 각 참여자와 <em>어떻게</em> 연관되는지를 결정합니다.
        다른 설정을 변경하기 전에 이것을 먼저 결정하십시오.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>적합한 경우</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>피해야 할 경우</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>양식:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>전체 가이드 →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>나란히 비교</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>속성</th>
            <th style={{ textAlign: "center" }}>일회성</th>
            <th style={{ textAlign: "center" }}>반복</th>
            <th style={{ textAlign: "center" }}>무작위</th>
            <th style={{ textAlign: "center" }}>개인</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>유형 조합</h2>
      <p>
        하나의 연구에 여러 유형의 일정을 함께 사용할 수 있습니다. 일반적인 설계로는 고정된 일일 설문조사를 위한{" "}
        <strong>반복</strong> 일정과 생태 순간 알림을 위한 <strong>무작위</strong>{" "}
        일정을 같은 연구에서 동일한 참여자를 대상으로 조합하는 방식이 있습니다.
      </p>
      <p>
        개인 일정도 각 날 내에서 무작위 발송 시각을 사용할 수 있습니다. 이 경우에도 일정은 여전히
        <strong>개인</strong>으로 분류됩니다. 그 정의적 특성은 시작일과 종료일이 각 참여자의 참여 날짜에 고정된다는 점이기 때문입니다.
        무작위 시각 선택은 해당 고정점 내의 부차적 속성입니다.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>다음으로 읽을 내용</h3>
      <p>
        연구에 적합한 유형을 파악한 후:{" "}
        <a href="/docs/form">일정 만들기</a>에서 전체 양식을 섹션별로 안내합니다.
        개인 일정에 대해서는 <a href="/docs/personal">개인 일정 설정</a>에서 일 오프셋 논리를 자세히 다룹니다.
      </p>
    </>
  );
}

function TypesContentIt() {
  const TYPES = TYPES_IT;
  const COMPARISON = COMPARISON_IT;
  return (
    <>
      <p>
        Il tipo determina <em>quando</em> una notifica si attiva e <em>come</em> tale tempistica
        si relaziona al calendario rispetto a ogni singolo partecipante. Stabilirlo correttamente prima
        di toccare qualsiasi altra impostazione.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Usare quando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Evitare quando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>modulo:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Guida completa →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Confronto affiancato</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Proprietà</th>
            <th style={{ textAlign: "center" }}>Una tantum</th>
            <th style={{ textAlign: "center" }}>Ripetuto</th>
            <th style={{ textAlign: "center" }}>Randomizzato</th>
            <th style={{ textAlign: "center" }}>Personale</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combinare i tipi</h2>
      <p>
        Uno studio può avere più calendari di tipi diversi. Un disegno comune abbina un calendario{" "}
        <strong>Ripetuto</strong> per un sondaggio giornaliero fisso a un calendario <strong>Randomizzato</strong>{" "}
        per notifiche ecologiche istantanee — tutto nello stesso studio, rivolto agli stessi partecipanti.
      </p>
      <p>
        Un calendario Personale può anche utilizzare orari di invio casuali all'interno di ogni giornata.
        In tal caso il calendario è comunque classificato come <strong>Personale</strong>, perché ciò che
        lo definisce è che i giorni di inizio e fine sono ancorati alla data di iscrizione di ogni
        partecipante. La tempistica randomizzata è una proprietà secondaria all'interno di quell'ancoraggio.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Cosa leggere dopo</h3>
      <p>
        Una volta individuato il tipo adatto al proprio studio:{" "}
        <a href="/docs/form">Creare un calendario</a> guida passo per passo attraverso l'intero modulo.
        Per i calendari Personali in particolare, <a href="/docs/personal">Pianificazione personale</a> approfondisce
        la logica degli offset in giorni.
      </p>
    </>
  );
}

const TYPES_ES = [
  {
    n: "01",
    name: "Puntual",
    tag: "calendario fijo",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Envía en una o varias fechas y horas concretas que usted elige en el calendario. Todos los participantes reciben la notificación en el mismo momento.",
    anchor: "one-time",
    use: [
      "Mensajes de inicio o debriefing del estudio en una fecha conocida.",
      "Sesiones controladas en laboratorio donde todos los participantes están en línea simultáneamente.",
      "Encuestas de una sola ola con una fecha límite fija.",
    ],
    avoid: [
      "Reclutamiento continuo donde los participantes se unen en días distintos — todos reciben la notificación en el mismo momento independientemente de cuándo se unieron.",
      "Estudios que duran semanas o meses — use Periódico en su lugar.",
    ],
    timing: "Paso 2 → Punto(s) de tiempo específico(s) + Paso 3 → Fecha(s) específica(s).",
  },
  {
    n: "02",
    name: "Periódico",
    tag: "patrón recurrente",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Se activa según un patrón recurrente entre una fecha de inicio y una de fin — cada día, cada N días, días de la semana específicos o días concretos del mes. Todos los participantes lo reciben a la misma hora en cada día de activación.",
    anchor: "repeating",
    use: [
      "Estudios de diario donde todos los participantes responden a la misma hora.",
      "Seguimientos semanales en un día de la semana fijo.",
      "Protocolos en ráfaga en fechas concretas del calendario.",
    ],
    avoid: [
      "Estudios con reclutamiento continuo donde cada participante necesita su propio anclaje al Día 1 — use Personal en su lugar.",
      "Estudios donde necesita horas de notificación diferentes cada día — use Aleatorio en su lugar.",
    ],
    timing: "Paso 2 → Repetir + Paso 3/4/5/6 → patrón de recurrencia y fechas de inicio/fin.",
  },
  {
    n: "03",
    name: "Aleatorio",
    tag: "aleatorio dentro de ventanas",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Define una o varias ventanas de tiempo (p. ej. 09:00–12:00 y 14:00–18:00) y elige un momento aleatorio dentro de cada ventana para cada participante. Cada participante recibe una hora diferente; los límites de la ventana son compartidos.",
    anchor: "randomized",
    use: [
      "Estudios ESM donde desea múltiples avisos aleatorios por día dentro de ventanas acotadas.",
      "Cualquier diseño que requiera validez ecológica — evitando avisos a hora fija que los participantes puedan anticipar.",
      "Muestreo en ráfaga donde se deben extraer N muestras por día con un intervalo mínimo entre ellas.",
    ],
    avoid: [
      "Situaciones donde todos los participantes deben recibir la notificación simultáneamente — use Puntual o Periódico.",
    ],
    timing: "Paso 2 → Ventana de tiempo. Defina el inicio/fin de la ventana, cuántos puntos aleatorios extraer y el intervalo mínimo entre avisos.",
  },
  {
    n: "04",
    name: "Personal",
    tag: "relativo al registro",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Se ancla a la fecha de inscripción de cada participante. El Día 1 es el día en que se unió, independientemente del calendario. Dos participantes que se unen con una semana de diferencia comienzan cada uno su propio Día 1.",
    anchor: "personal",
    use: [
      "Estudios longitudinales con reclutamiento continuo y una duración de estudio fija por persona (p. ej. protocolo de 14 días).",
      "Estudios de intervención donde el Día 1 = día del tratamiento.",
      "Cualquier diseño donde los días transcurridos desde la inscripción importan más que la fecha del calendario.",
    ],
    avoid: [
      "Estudios donde todos los participantes deben estar sincronizados en la misma fecha del calendario — use Periódico o Puntual.",
    ],
    timing: "Paso 5 → inicio relativo al registro (Día N tras la inscripción). Paso 6 → fin relativo al registro.",
    more: "/docs/personal",
  },
];

const COMPARISON_ES: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "¿Todos los participantes notificados a la misma hora?",                  onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "¿Horario relativo a la fecha de inscripción de cada participante?",      onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "¿Puede enviar varias veces al día?",                                     onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "¿Funciona con reclutamiento continuo?",                                  onetime: false, repeating: false, randomized: false, personal: true  },
];

const TYPES_FR = [
  {
    n: "01",
    name: "Ponctuel",
    tag: "calendrier fixe",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Envoie à une ou plusieurs dates et heures précises que vous choisissez dans le calendrier. Tous les participants reçoivent la notification au même moment.",
    anchor: "one-time",
    use: [
      "Messages de lancement ou de débriefing de l'étude à une date connue.",
      "Sessions en laboratoire où tous les participants sont connectés simultanément.",
      "Sondages à vague unique avec une date limite fixe.",
    ],
    avoid: [
      "Recrutement continu où les participants rejoignent à des jours différents — tous reçoivent la notification au même moment, quelle que soit la date de leur inscription.",
      "Études s'étalant sur des semaines ou des mois — utilisez plutôt le type Répété.",
    ],
    timing: "Étape 2 → Point(s) temporel(s) spécifique(s) + Étape 3 → Date(s) spécifique(s).",
  },
  {
    n: "02",
    name: "Répété",
    tag: "schéma récurrent",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Se déclenche selon un schéma récurrent entre une date de début et une date de fin — chaque jour, tous les N jours, des jours de semaine spécifiques ou des jours précis du mois. Tous les participants le reçoivent à la même heure chaque jour de déclenchement.",
    anchor: "repeating",
    use: [
      "Études de journal de bord où tous les participants répondent à la même heure.",
      "Points hebdomadaires un jour de semaine fixe.",
      "Protocoles en rafale à des dates de calendrier précises.",
    ],
    avoid: [
      "Études avec recrutement continu où chaque participant a besoin de son propre ancrage au Jour 1 — utilisez plutôt le type Personnel.",
      "Études nécessitant des heures de notification différentes chaque jour — utilisez plutôt le type Aléatoire.",
    ],
    timing: "Étape 2 → Répéter + Étape 3/4/5/6 → schéma de récurrence et dates de début/fin.",
  },
  {
    n: "03",
    name: "Aléatoire",
    tag: "aléatoire dans des fenêtres",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Définit une ou plusieurs fenêtres temporelles (par ex. 09:00–12:00 et 14:00–18:00) et choisit un moment aléatoire à l'intérieur de chaque fenêtre pour chaque participant. Chaque participant reçoit un horaire différent ; les limites de la fenêtre sont communes à tous.",
    anchor: "randomized",
    use: [
      "Études ESM où vous souhaitez envoyer plusieurs notifications aléatoires par jour dans des fenêtres délimitées.",
      "Tout protocole nécessitant une validité écologique — en évitant les notifications à heure fixe que les participants peuvent anticiper.",
      "Échantillonnage en rafale où N échantillons doivent être prélevés par jour avec un intervalle minimal entre eux.",
    ],
    avoid: [
      "Situations où tous les participants doivent recevoir la notification simultanément — utilisez Ponctuel ou Répété.",
    ],
    timing: "Étape 2 → Fenêtre temporelle. Définissez le début/la fin de la fenêtre, le nombre de points aléatoires à tirer et l'intervalle minimal entre les notifications.",
  },
  {
    n: "04",
    name: "Personnel",
    tag: "relatif à l'inscription",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "S'ancre à la date d'inscription de chaque participant. Le Jour 1 est le jour où il a rejoint l'étude, indépendamment du calendrier. Deux participants qui s'inscrivent à une semaine d'intervalle commencent chacun leur propre Jour 1.",
    anchor: "personal",
    use: [
      "Études longitudinales avec recrutement continu et une durée d'étude fixe par personne (par ex. protocole de 14 jours).",
      "Études d'intervention où le Jour 1 = jour du traitement.",
      "Tout protocole où le nombre de jours écoulés depuis l'inscription compte davantage que la date du calendrier.",
    ],
    avoid: [
      "Études où tous les participants doivent être synchronisés sur la même date de calendrier — utilisez Répété ou Ponctuel.",
    ],
    timing: "Étape 5 → début relatif à l'inscription (Jour N après l'inscription). Étape 6 → fin relative à l'inscription.",
    more: "/docs/personal",
  },
];

const COMPARISON_FR: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Tous les participants notifiés à la même heure ?",                   onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Horaire relatif à la date d'inscription de chaque participant ?",    onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Peut envoyer plusieurs fois par jour ?",                             onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Fonctionne avec un recrutement continu ?",                           onetime: false, repeating: false, randomized: false, personal: true  },
];

function TypesContentFr() {
  const TYPES = TYPES_FR;
  const COMPARISON = COMPARISON_FR;
  return (
    <>
      <p>
        Le type détermine <em>quand</em> une notification se déclenche et <em>comment</em> cet horaire
        se rapporte au calendrier ou à chaque participant individuellement. Définissez cela correctement
        avant de toucher à quoi que ce soit d'autre.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Utiliser quand</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Éviter quand</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>formulaire :</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Guide complet →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Comparaison côte à côte</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Propriété</th>
            <th style={{ textAlign: "center" }}>Ponctuel</th>
            <th style={{ textAlign: "center" }}>Répété</th>
            <th style={{ textAlign: "center" }}>Aléatoire</th>
            <th style={{ textAlign: "center" }}>Personnel</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combiner les types</h2>
      <p>
        Une étude peut comporter plusieurs calendriers de types différents. Un protocole courant associe un
        calendrier <strong>Répété</strong> pour un sondage quotidien fixe à un calendrier <strong>Aléatoire</strong>{" "}
        pour des notifications écologiques momentanées — le tout dans la même étude, ciblant les mêmes participants.
      </p>
      <p>
        Un calendrier Personnel peut également utiliser des heures d'envoi aléatoires à l'intérieur de chaque
        journée. Dans ce cas, le calendrier est tout de même classé comme <strong>Personnel</strong>, car ce qui
        le définit est que les jours de début et de fin sont ancrés à la date d'inscription de chaque participant.
        La temporisation aléatoire est une propriété secondaire au sein de cet ancrage.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Que lire ensuite</h3>
      <p>
        Une fois que vous savez quel type convient à votre étude :{" "}
        <a href="/docs/form">Créer un calendrier</a> parcourt le formulaire complet section par section.
        Pour les calendriers Personnels en particulier, <a href="/docs/personal">Planification personnelle</a> couvre
        en détail la logique des décalages en jours.
      </p>
    </>
  );
}

function TypesContentEs() {
  const TYPES = TYPES_ES;
  const COMPARISON = COMPARISON_ES;
  return (
    <>
      <p>
        El tipo determina <em>cuándo</em> se activa una notificación y <em>cómo</em> ese horario
        se relaciona con el calendario o con cada participante individualmente. Defínalo correctamente
        antes de tocar cualquier otra cosa.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Usar cuando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Evitar cuando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>formulario:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Guía completa →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Comparación lado a lado</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Propiedad</th>
            <th style={{ textAlign: "center" }}>Puntual</th>
            <th style={{ textAlign: "center" }}>Periódico</th>
            <th style={{ textAlign: "center" }}>Aleatorio</th>
            <th style={{ textAlign: "center" }}>Personal</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combinar tipos</h2>
      <p>
        Un estudio puede tener varios calendarios de tipos diferentes. Un protocolo habitual combina un
        calendario <strong>Periódico</strong> para una encuesta diaria fija con un calendario <strong>Aleatorio</strong>{" "}
        para notificaciones de muestreo ecológico momentáneo — todo en el mismo estudio, dirigido a los mismos participantes.
      </p>
      <p>
        Un calendario Personal también puede usar horas de envío aleatorias dentro de cada día. En ese caso,
        el calendario sigue clasificándose como <strong>Personal</strong>, porque lo que lo define es que los días de
        inicio y fin están anclados a la fecha de inscripción de cada participante. La temporización aleatoria
        es una propiedad secundaria dentro de ese anclaje.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>Qué leer a continuación</h3>
      <p>
        Una vez que sepa qué tipo se adapta a su estudio:{" "}
        <a href="/docs/form">Crear un calendario</a> recorre el formulario completo sección por sección.
        Para los calendarios Personales en particular, <a href="/docs/personal">Calendario personal</a> cubre
        en detalle la lógica de los desfases en días.
      </p>
    </>
  );
}

const TYPES_PT = [
  {
    n: "01",
    name: "Pontual",
    tag: "calendário fixo",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Envia em uma ou várias datas e horários específicos que você escolhe no calendário. Todos os participantes recebem a notificação no mesmo momento.",
    anchor: "one-time",
    use: [
      "Mensagens de início ou debriefing do estudo em uma data conhecida.",
      "Sessões controladas em laboratório onde todos os participantes estão on-line simultaneamente.",
      "Pesquisas de uma única onda com prazo fixo.",
    ],
    avoid: [
      "Recrutamento contínuo onde os participantes entram em dias diferentes — todos recebem a notificação no mesmo momento independentemente de quando se inscreveram.",
      "Estudos que duram semanas ou meses — use Periódico no lugar.",
    ],
    timing: "Passo 2 → Ponto(s) de tempo específico(s) + Passo 3 → Data(s) específica(s).",
  },
  {
    n: "02",
    name: "Periódico",
    tag: "padrão recorrente",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Dispara em um padrão recorrente entre uma data de início e uma de fim — todos os dias, a cada N dias, dias de semana específicos ou dias específicos do mês. Todos os participantes recebem no mesmo horário em cada dia de disparo.",
    anchor: "repeating",
    use: [
      "Estudos de diário onde todos os participantes respondem no mesmo horário.",
      "Check-ins semanais em um dia de semana fixo.",
      "Protocolos em rajada em datas específicas do calendário.",
    ],
    avoid: [
      "Estudos com recrutamento contínuo onde cada participante precisa de sua própria âncora do Dia 1 — use Pessoal no lugar.",
      "Estudos onde você precisa de horários de notificação diferentes a cada dia — use Aleatório no lugar.",
    ],
    timing: "Passo 2 → Repetir + Passo 3/4/5/6 → padrão de recorrência e datas de início/fim.",
  },
  {
    n: "03",
    name: "Aleatório",
    tag: "aleatório dentro de janelas",
    color: "var(--sage)",
    colorSoft: "var(--sage-soft)",
    summary: "Define uma ou várias janelas de tempo (ex.: 09:00–12:00 e 14:00–18:00) e escolhe um momento aleatório dentro de cada janela para cada participante. Cada participante recebe um horário diferente; os limites da janela são compartilhados.",
    anchor: "randomized",
    use: [
      "Estudos ESM onde você deseja múltiplos avisos aleatórios por dia dentro de janelas delimitadas.",
      "Qualquer design que exija validade ecológica — evitando avisos em horário fixo que os participantes possam antecipar.",
      "Amostragem em rajada onde N amostras devem ser extraídas por dia com um intervalo mínimo entre elas.",
    ],
    avoid: [
      "Situações onde todos os participantes devem receber a notificação simultaneamente — use Pontual ou Periódico.",
    ],
    timing: "Passo 2 → Janela de tempo. Defina o início/fim da janela, quantos pontos aleatórios extrair e o intervalo mínimo entre avisos.",
  },
  {
    n: "04",
    name: "Pessoal",
    tag: "relativo ao registro",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
    summary: "Ancora-se à data de inscrição de cada participante. O Dia 1 é o dia em que ele entrou, independentemente do calendário. Dois participantes que entram com uma semana de diferença começam cada um seu próprio Dia 1.",
    anchor: "personal",
    use: [
      "Estudos longitudinais com recrutamento contínuo e duração de estudo fixa por pessoa (ex.: protocolo de 14 dias).",
      "Estudos de intervenção onde o Dia 1 = dia do tratamento.",
      "Qualquer design onde os dias transcorridos desde a inscrição importam mais do que a data do calendário.",
    ],
    avoid: [
      "Estudos onde todos os participantes devem estar sincronizados na mesma data do calendário — use Periódico ou Pontual.",
    ],
    timing: "Passo 5 → início relativo ao registro (Dia N após a inscrição). Passo 6 → fim relativo ao registro.",
    more: "/docs/personal",
  },
];

const COMPARISON_PT: {
  q: string;
  onetime: boolean;
  repeating: boolean;
  randomized: boolean;
  personal: boolean;
}[] = [
  { q: "Todos os participantes notificados no mesmo horário?",                    onetime: true,  repeating: true,  randomized: false, personal: false },
  { q: "Horário relativo à data de inscrição de cada participante?",              onetime: false, repeating: false, randomized: false, personal: true  },
  { q: "Pode enviar várias vezes por dia?",                                       onetime: true,  repeating: true,  randomized: true,  personal: true  },
  { q: "Funciona com recrutamento contínuo?",                                     onetime: false, repeating: false, randomized: false, personal: true  },
];

function TypesContentPt() {
  const TYPES = TYPES_PT;
  const COMPARISON = COMPARISON_PT;
  return (
    <>
      <p>
        O tipo determina <em>quando</em> uma notificação é disparada e <em>como</em> esse horário
        se relaciona com o calendário ou com cada participante individualmente. Defina isso corretamente
        antes de tocar em qualquer outra coisa.
      </p>

      {/* ── Type cards ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.4rem", margin: "2.4rem 0 4rem" }}>
        {TYPES.map((t) => (
          <div
            key={t.n}
            id={t.anchor}
            style={{ background: "var(--surface)", border: `1px solid ${t.color}`, borderLeft: `4px solid ${t.color}`, borderRadius: "1rem", padding: "2rem 2.4rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, fontWeight: 600, letterSpacing: "0.08em" }}>{t.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: t.color, background: t.colorSoft, padding: "2px 8px", borderRadius: "0.4rem", letterSpacing: "0.06em" }}>{t.tag}</span>
            </div>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6 }}>{t.summary}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Usar quando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.use.map((u, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{u}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>Evitar quando</div>
                <ul style={{ margin: 0, paddingLeft: "1.6rem" }}>
                  {t.avoid.map((a, i) => <li key={i} style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.3rem" }}>{a}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.5rem", padding: "0.7rem 1rem" }}>
              <span style={{ color: "var(--ink-40)", marginRight: "0.6rem" }}>formulário:</span>{t.timing}
              {t.more && <>{" "}<a href={t.more} style={{ color: "var(--coral)", marginLeft: "0.6rem" }}>Guia completo →</a></>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ──────────────────────────────────────────────── */}
      <h2>Comparação lado a lado</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Propriedade</th>
            <th style={{ textAlign: "center" }}>Pontual</th>
            <th style={{ textAlign: "center" }}>Periódico</th>
            <th style={{ textAlign: "center" }}>Aleatório</th>
            <th style={{ textAlign: "center" }}>Pessoal</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.q}>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-60)" }}>{row.q}</td>
              <td style={{ textAlign: "center" }}><Tick v={row.onetime} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.repeating} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.randomized} /></td>
              <td style={{ textAlign: "center" }}><Tick v={row.personal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Combining types ───────────────────────────────────────────────── */}
      <h2>Combinar tipos</h2>
      <p>
        Um estudo pode ter vários calendários de tipos diferentes. Um protocolo habitual combina um
        calendário <strong>Periódico</strong> para uma pesquisa diária fixa com um calendário <strong>Aleatório</strong>{" "}
        para notificações de amostragem ecológica momentânea — tudo no mesmo estudo, direcionado aos mesmos participantes.
      </p>
      <p>
        Um calendário Pessoal também pode usar horários de envio aleatórios dentro de cada dia. Nesse caso,
        o calendário ainda é classificado como <strong>Pessoal</strong>, porque o que o define é que os dias de
        início e fim estão ancorados à data de inscrição de cada participante. O tempo aleatório
        é uma propriedade secundária dentro dessa âncora.
      </p>

      {/* ── What's next ───────────────────────────────────────────────────── */}
      <h3>O que ler a seguir</h3>
      <p>
        Depois de saber qual tipo se adapta ao seu estudo:{" "}
        <a href="/docs/form">Criar um calendário</a> percorre o formulário completo seção por seção.
        Para calendários Pessoais em particular, <a href="/docs/personal">Calendário pessoal</a> cobre
        em detalhes a lógica dos deslocamentos em dias.
      </p>
    </>
  );
}
