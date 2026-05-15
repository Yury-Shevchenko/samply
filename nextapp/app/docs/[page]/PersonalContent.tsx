import type { Locale } from "@/lib/i18n";

const DAY_ROWS_EN = [
  { day: 'Day 1', anchor: 'The moment they joined (plus ~1 minute).', note: 'Notifications set for Day 1 fire almost immediately after enrolment.' },
  { day: 'Day 2', anchor: 'Midnight of the next calendar day in the chosen timezone.', note: 'A participant who joins at 21:00 on Monday gets their Day 2 notifications on Tuesday.' },
  { day: 'Day N', anchor: 'Midnight of the Nth calendar day after the join date.', note: 'Day 14 = midnight of the 14th day counted from the join day.' },
];

const DAY_ROWS_DE = [
  { day: 'Tag 1', anchor: 'Der Moment des Beitritts (plus ~1 Minute).', note: 'Benachrichtigungen für Tag 1 werden fast sofort nach der Einschreibung ausgelöst.' },
  { day: 'Tag 2', anchor: 'Mitternacht des nächsten Kalendertags in der gewählten Zeitzone.', note: 'Eine teilnehmende Person, die um 21:00 Uhr an einem Montag beitritt, erhält ihre Tag-2-Benachrichtigungen am Dienstag.' },
  { day: 'Tag N', anchor: 'Mitternacht des N-ten Kalendertags nach dem Beitrittsdatum.', note: 'Tag 14 = Mitternacht des 14. Tages, gezählt ab dem Beitrittag.' },
];

const EXAMPLES_EN = [
  {
    title: '14-day diary study',
    config: [
      'Start: Day 1 after registration.',
      'Stop: Day 15 after registration (end of Day 14).',
      'Interval: daily at 20:00.',
      'Recipients: all current and future participants.',
    ],
    result: 'Every participant gets 14 evening pings, starting the day they join, regardless of when others enrolled.',
  },
  {
    title: 'Burst protocol — weeks 1 and 3 only',
    config: [
      'Schedule A — Start: Day 1, Stop: Day 8. Interval: daily at 12:00.',
      'Schedule B — Start: Day 15, Stop: Day 22. Interval: daily at 12:00.',
      'Both schedules target the same participants.',
    ],
    result: 'Two independent personal schedules cover two separate weeks. The quiet week in between needs no schedule.',
  },
  {
    title: 'Intervention study — active phase from Day 3',
    config: [
      'Start: Day 3 after registration.',
      'Stop: Day 10 after registration.',
      'Interval: three times a day (09:00, 13:00, 18:00) — add three separate intervals.',
    ],
    result: 'Participants complete a two-day baseline (Days 1–2) before the intervention notifications begin on Day 3.',
  },
];

const EXAMPLES_DE = [
  {
    title: '14-Tage-Tagebuchstudie',
    config: [
      'Start: Tag 1 nach der Registrierung.',
      'Ende: Tag 15 nach der Registrierung (Ende von Tag 14).',
      'Abstand: täglich um 20:00 Uhr.',
      'Empfänger: alle aktuellen und zukünftigen Teilnehmenden.',
    ],
    result: 'Jede teilnehmende Person erhält 14 Abend-Benachrichtigungen, beginnend an dem Tag, an dem sie beitreten, unabhängig davon, wann andere sich eingeschrieben haben.',
  },
  {
    title: 'Burst-Protokoll — nur Wochen 1 und 3',
    config: [
      'Zeitplan A — Start: Tag 1, Ende: Tag 8. Abstand: täglich um 12:00 Uhr.',
      'Zeitplan B — Start: Tag 15, Ende: Tag 22. Abstand: täglich um 12:00 Uhr.',
      'Beide Zeitpläne richten sich an dieselben Teilnehmenden.',
    ],
    result: 'Zwei unabhängige persönliche Zeitpläne decken zwei separate Wochen ab. Die ruhige Woche dazwischen benötigt keinen Zeitplan.',
  },
  {
    title: 'Interventionsstudie — aktive Phase ab Tag 3',
    config: [
      'Start: Tag 3 nach der Registrierung.',
      'Ende: Tag 10 nach der Registrierung.',
      'Abstand: dreimal täglich (09:00, 13:00, 18:00) — drei separate Abstände hinzufügen.',
    ],
    result: 'Teilnehmende absolvieren eine zweitägige Baseline (Tage 1–2), bevor die Interventions-Benachrichtigungen an Tag 3 beginnen.',
  },
];

const DAY_ROWS_NL = [
  { day: 'Dag 1', anchor: 'Het moment van aanmelding (plus ~1 minuut).', note: 'Meldingen ingesteld voor dag 1 worden bijna onmiddellijk na inschrijving verstuurd.' },
  { day: 'Dag 2', anchor: 'Middernacht van de volgende kalenderdag in de gekozen tijdzone.', note: 'Een deelnemer die om 21:00 op maandag aanmeldt, ontvangt zijn dag 2-meldingen op dinsdag.' },
  { day: 'Dag N', anchor: 'Middernacht van de N-de kalenderdag na de aanmelddatum.', note: 'Dag 14 = middernacht van de 14e dag geteld vanaf de aanmelddag.' },
];

const EXAMPLES_NL = [
  {
    title: '14-daagse dagboekstudie',
    config: [
      'Start: Dag 1 na registratie.',
      'Stop: Dag 15 na registratie (einde van dag 14).',
      'Interval: dagelijks om 20:00.',
      'Ontvangers: alle huidige en toekomstige deelnemers.',
    ],
    result: 'Elke deelnemer ontvangt 14 avondmeldingen, beginnend op de dag dat ze zich aanmelden, ongeacht wanneer anderen zich hebben ingeschreven.',
  },
  {
    title: 'Burstprotocol — alleen weken 1 en 3',
    config: [
      'Schema A — Start: Dag 1, Stop: Dag 8. Interval: dagelijks om 12:00.',
      'Schema B — Start: Dag 15, Stop: Dag 22. Interval: dagelijks om 12:00.',
      'Beide schema\'s richten zich op dezelfde deelnemers.',
    ],
    result: 'Twee onafhankelijke persoonlijke schema\'s dekken twee afzonderlijke weken. De rustige week daartussenin heeft geen schema nodig.',
  },
  {
    title: 'Interventiestudie — actieve fase vanaf dag 3',
    config: [
      'Start: Dag 3 na registratie.',
      'Stop: Dag 10 na registratie.',
      'Interval: driemaal per dag (09:00, 13:00, 18:00) — voeg drie afzonderlijke intervallen toe.',
    ],
    result: 'Deelnemers voltooien een tweedaagse baseline (dagen 1–2) voordat de interventiemeldingen beginnen op dag 3.',
  },
];

const DAY_ROWS_RU = [
  { day: 'День 1', anchor: 'Момент вступления (плюс ~1 минута).', note: 'Уведомления, установленные на день 1, приходят почти сразу после регистрации.' },
  { day: 'День 2', anchor: 'Полночь следующего календарного дня в выбранном часовом поясе.', note: 'Участник, вступивший в 21:00 в понедельник, получит уведомления дня 2 во вторник.' },
  { day: 'День N', anchor: 'Полночь N-го календарного дня после даты регистрации.', note: 'День 14 = полночь 14-го дня, отсчитанного от дня вступления.' },
];

const EXAMPLES_RU = [
  {
    title: 'Дневниковое исследование на 14 дней',
    config: [
      'Начало: день 1 после регистрации.',
      'Конец: день 15 после регистрации (конец дня 14).',
      'Интервал: ежедневно в 20:00.',
      'Получатели: все текущие и будущие участники.',
    ],
    result: 'Каждый участник получает 14 вечерних сигналов, начиная с дня вступления, независимо от того, когда зарегистрировались другие.',
  },
  {
    title: 'Бёрст-протокол — только 1-я и 3-я недели',
    config: [
      'Расписание А — начало: день 1, конец: день 8. Интервал: ежедневно в 12:00.',
      'Расписание Б — начало: день 15, конец: день 22. Интервал: ежедневно в 12:00.',
      'Оба расписания нацелены на одних и тех же участников.',
    ],
    result: 'Два независимых персональных расписания охватывают две отдельные недели. Тихая неделя между ними не требует расписания.',
  },
  {
    title: 'Интервенционное исследование — активная фаза с дня 3',
    config: [
      'Начало: день 3 после регистрации.',
      'Конец: день 10 после регистрации.',
      'Интервал: три раза в день (09:00, 13:00, 18:00) — добавьте три отдельных интервала.',
    ],
    result: 'Участники проходят двухдневный базовый этап (дни 1–2) перед началом интервенционных уведомлений на день 3.',
  },
];

const DAY_ROWS_ZH = [
  { day: 'Day 1', anchor: '加入的那一刻（加约 1 分钟）。', note: '设置为 Day 1 的通知在注册后几乎立即触发。' },
  { day: 'Day 2', anchor: '所选时区中下一个日历日的午夜。', note: '周一 21:00 加入的参与者将在周二收到 Day 2 的通知。' },
  { day: 'Day N', anchor: '从加入日期起第 N 个日历日的午夜。', note: 'Day 14 = 从加入当天算起第 14 天的午夜。' },
];

const EXAMPLES_ZH = [
  {
    title: '14 天日记研究',
    config: [
      '开始：注册后 Day 1。',
      '结束：注册后 Day 15（Day 14 结束）。',
      '间隔：每天 20:00。',
      '接收者：所有当前和未来的参与者。',
    ],
    result: '每位参与者从加入当天起收到 14 次晚间通知，与其他人何时注册无关。',
  },
  {
    title: '爆发协议——仅第 1 周和第 3 周',
    config: [
      '日程 A — 开始：Day 1，结束：Day 8。间隔：每天 12:00。',
      '日程 B — 开始：Day 15，结束：Day 22。间隔：每天 12:00。',
      '两个日程针对相同的参与者。',
    ],
    result: '两个独立的个人日程覆盖两个独立的周。中间的安静周无需日程。',
  },
  {
    title: '干预研究——从 Day 3 开始的活跃阶段',
    config: [
      '开始：注册后 Day 3。',
      '结束：注册后 Day 10。',
      '间隔：每天三次（09:00、13:00、18:00）——添加三个独立的间隔。',
    ],
    result: '参与者在 Day 3 开始干预通知之前，先完成两天的基线阶段（Day 1–2）。',
  },
];

export default function PersonalContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <PersonalContentDe />;
  if (locale === "nl") return <PersonalContentNl />;
  if (locale === "ru") return <PersonalContentRu />;
  if (locale === "zh") return <PersonalContentZh />;
  if (locale === "ko") return <PersonalContentKo />;
  if (locale === "it") return <PersonalContentIt />;
  if (locale === "fr") return <PersonalContentFr />;
  if (locale === "es") return <PersonalContentEs />;
  if (locale === "pt") return <PersonalContentPt />;
  return <PersonalContentEn />;
}

function PersonalContentEn() {
  return (
    <>
      <p>
        A personal schedule does not fire at a fixed calendar date. Instead it fires relative to the
        moment each participant joined your study. Two participants who enrol a week apart will each
        receive their Day 1 notification on their own Day 1 — not on the same Monday.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>What Day N means</h2>
      <p>
        When you set a personal schedule, you define a start and a stop in terms of
        <em> days after registration</em>, not calendar dates. Samply translates that offset into a
        real timestamp for each participant individually at the moment they enrol.
      </p>

      <table>
        <thead>
          <tr>
            <th>Day label</th>
            <th>Actual anchor point</th>
            <th>Practical note</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_EN.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The repeating pattern you choose (daily, specific weekdays, every other day) then runs
        between those two anchored timestamps. Samply expands the schedule against each participant's
        personal window and writes one queue entry per firing time.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Building a personal schedule in the form</h2>
      <p>
        Personal schedules use the same schedule form as all other types. The sections that
        differ from a standard repeating schedule are Step 6 (Start) and Step 7 (Stop).
      </p>

      <h3>Step 6 — When to start</h3>
      <p>Choose one of two relative-start options:</p>
      <dl>
        <dt>On day N after registration</dt>
        <dd>
          Samply counts N calendar days from the join date and fires the first notification at
          midnight of that day. Set <em>N = 1</em> to start immediately after joining; set
          <em> N = 3</em> to leave a two-day buffer before the schedule begins.
        </dd>
        <dt>After X days / hours / minutes from registration</dt>
        <dd>
          An exact duration offset from the join timestamp. Use this when you need sub-day
          precision — for example, start 4 hours after joining rather than waiting until the
          next midnight.
        </dd>
      </dl>
      <p>
        You can also choose a fixed calendar date as the start, which turns the schedule into a
        hybrid: it still uses the personal stop anchor but the start is the same for everyone.
      </p>

      <h3>Step 7 — When to stop</h3>
      <p>
        The same two options apply: stop on Day N after registration, or stop after a precise
        duration. The stop is exclusive — a schedule set to stop on Day 15 fires its last
        notification at the end of Day 14.
      </p>

      <h3>Step 2 — The repeating interval</h3>
      <p>
        Within the personal window, choose a repeating pattern: every day, specific weekdays, every
        other day, and so on. You can also add multiple intervals to the same schedule — for
        example, three separate time-of-day rows (09:00, 13:00, 18:00) to send three notifications
        per day.
      </p>
      <p>
        To send at random times within daily windows instead of fixed clock times, select
        <strong> Time window</strong> instead of specific time points. This makes the schedule
        both personal and randomized. See <a href="/docs/types#randomized">Randomized schedules</a>{' '}
        for the window controls.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Timezone handling</h2>
      <p>
        By default, all times in a personal schedule are interpreted in the timezone you select
        at the top of the form. Enable <strong>Adjust to participant timezone</strong> to have
        Samply re-anchor each participant's times to their device timezone instead.
      </p>
      <p>
        When participant timezone adjustment is on, a 20:00 notification fires at 20:00 in
        Berlin for a Berlin participant and at 20:00 in Tokyo for a Tokyo participant — each at
        their local evening. The device timezone is recorded at enrolment and can be updated
        by the participant from the app settings.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Future participants</h2>
      <p>
        The <strong>Recipients</strong> section of the form lets you choose between current
        participants only, or all future participants too. When <em>All future participants</em>
        is checked, Samply applies the personal schedule to every new enrolment automatically —
        no manual action needed.
      </p>
      <p>
        This is the setting to enable for open-recruitment studies where participants join
        continuously over weeks or months. Without it, participants who join after the schedule
        is created receive no notifications from it.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Example configurations</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_EN.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Result: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Common mistakes</h3>
      <dl>
        <dt>Setting a fixed calendar stop date instead of a relative one</dt>
        <dd>
          If you set stop to a specific date in the past, no notifications fire for anyone who
          joins after that date. Use a relative stop (Day N) whenever participants join on
          different days.
        </dd>
        <dt>Forgetting to check future participants</dt>
        <dd>
          A personal schedule with only current participants selected will silently ignore
          everyone who joins later. For open-recruitment studies, always check
          <em> All future participants</em>.
        </dd>
        <dt>Day 1 meaning different things in your analysis</dt>
        <dd>
          Samply counts Day 1 as the join day. If your protocol defines Day 1 as the first full
          calendar day after joining, set your start to Day 2 in the form.
        </dd>
      </dl>

      <h3>What to read next</h3>
      <p>
        Once a schedule is saved, Samply expands it into a per-participant queue of sends.
        See <a href="/docs/queue">The scheduled queue</a> to understand how to read and manage it.
      </p>
    </>
  );
}

function PersonalContentRu() {
  return (
    <>
      <p>
        Персональное расписание срабатывает не в фиксированную календарную дату, а относительно
        момента вступления каждого участника в ваше исследование. Два участника, зарегистрировавшиеся
        с недельной разницей, каждый получит уведомление дня 1 в свой собственный день 1 — а не в один понедельник.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Что означает день N</h2>
      <p>
        При создании персонального расписания вы задаёте начало и конец в терминах
        <em> дней после регистрации</em>, а не конкретных календарных дат. Samply переводит это смещение в
        реальную временную метку для каждого участника индивидуально в момент его регистрации.
      </p>

      <table>
        <thead>
          <tr>
            <th>Обозначение дня</th>
            <th>Фактическая точка отсчёта</th>
            <th>Практическое замечание</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_RU.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Выбранный паттерн повторения (ежедневно, определённые дни недели, через день) затем
        работает между этими двумя привязанными временными метками. Samply разворачивает расписание
        в пределах персонального окна каждого участника и записывает один элемент очереди на каждый момент отправки.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Создание персонального расписания в форме</h2>
      <p>
        Персональные расписания используют ту же форму, что и все остальные типы. Разделы, отличающиеся
        от стандартного повторяющегося расписания, — это шаг 6 (Начало) и шаг 7 (Конец).
      </p>

      <h3>Шаг 6 — Когда начинать</h3>
      <p>Выберите один из двух вариантов относительного начала:</p>
      <dl>
        <dt>В день N после регистрации</dt>
        <dd>
          Samply отсчитывает N календарных дней от даты вступления и отправляет первое уведомление
          в полночь этого дня. Установите <em>N = 1</em>, чтобы начать сразу после вступления;
          установите <em>N = 3</em>, чтобы оставить двухдневный буфер до начала расписания.
        </dd>
        <dt>Через X дней / часов / минут после регистрации</dt>
        <dd>
          Точное временное смещение от момента вступления. Используйте это, когда нужна точность
          с точностью до минуты — например, начать через 4 часа после вступления, а не ждать
          следующей полночи.
        </dd>
      </dl>
      <p>
        Вы также можете выбрать фиксированную календарную дату в качестве начала, что превратит
        расписание в гибридное: оно по-прежнему использует персональную точку отсчёта для конца,
        но начало будет одинаковым для всех.
      </p>

      <h3>Шаг 7 — Когда заканчивать</h3>
      <p>
        Применяются те же два варианта: конец в день N после регистрации или конец через точную
        длительность. Конец не включает последний день — расписание, установленное на конец в день 15,
        отправит последнее уведомление в конце дня 14.
      </p>

      <h3>Шаг 2 — Интервал повторения</h3>
      <p>
        В пределах персонального окна выберите паттерн повторения: каждый день, определённые дни недели,
        через день и т.д. Вы также можете добавить несколько интервалов к одному расписанию —
        например, три отдельных строки со временем суток (09:00, 13:00, 18:00), чтобы отправлять
        три уведомления в день.
      </p>
      <p>
        Чтобы отправлять в случайное время в пределах дневных окон вместо фиксированных,
        выберите <strong>Временное окно</strong> вместо конкретных моментов. Это делает расписание
        одновременно персональным и случайным. См.{' '}
        <a href='/docs/types#randomized'>Случайные расписания</a>{' '}
        для описания элементов управления окном.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Работа с часовыми поясами</h2>
      <p>
        По умолчанию все времена в персональном расписании интерпретируются в часовом поясе, который
        вы выбираете в верхней части формы. Включите <strong>Подстраивать под часовой пояс участника</strong>,
        чтобы Samply привязывал время каждого участника к часовому поясу его устройства.
      </p>
      <p>
        При включённой настройке уведомление в 20:00 будет отправлено в 20:00 по берлинскому времени
        для участника из Берлина и в 20:00 по токийскому времени для участника из Токио — каждому
        в свой местный вечер. Часовой пояс устройства фиксируется при регистрации и может быть
        обновлён участником в настройках приложения.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Будущие участники</h2>
      <p>
        Раздел <strong>Получатели</strong> формы позволяет выбрать между только текущими
        участниками или также всеми будущими. Когда отмечено <em>Все будущие участники</em>,
        Samply автоматически применяет персональное расписание к каждой новой регистрации —
        никаких ручных действий не требуется.
      </p>
      <p>
        Эту настройку следует включать для исследований с открытым рекрутированием, где участники
        присоединяются непрерывно на протяжении недель или месяцев. Без неё участники, вступившие
        после создания расписания, не получат от него ни одного уведомления.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Примеры конфигураций</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_RU.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Результат: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Частые ошибки</h3>
      <dl>
        <dt>Задать фиксированную календарную дату конца вместо относительной</dt>
        <dd>
          Если вы установите конец на конкретную дату в прошлом, уведомления не будут отправлены
          никому, кто вступит после этой даты. Используйте относительный конец (день N), когда
          участники присоединяются в разные дни.
        </dd>
        <dt>Забыть включить будущих участников</dt>
        <dd>
          Персональное расписание только с выбранными текущими участниками будет молча игнорировать
          всех, кто присоединится позже. Для исследований с открытым рекрутированием всегда
          отмечайте <em>Все будущие участники</em>.
        </dd>
        <dt>День 1 имеет другое значение в вашем анализе</dt>
        <dd>
          Samply считает днём 1 день вступления. Если ваш протокол определяет день 1 как первый
          полный календарный день после вступления, установите начало на день 2 в форме.
        </dd>
      </dl>

      <h3>Что читать далее</h3>
      <p>
        После сохранения расписания Samply разворачивает его в персональную очередь отправок для каждого участника.
        См. <a href='/docs/queue'>Очередь расписания</a>, чтобы понять, как её читать и управлять ею.
      </p>
    </>
  );
}

function PersonalContentZh() {
  return (
    <>
      <p>
        个人日程不在固定日历日期触发，而是相对于每位参与者加入研究的时刻触发。
        两位相差一周注册的参与者，各自会在自己的 Day 1 收到 Day 1 通知——而不是同一个周一。
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Day N 的含义</h2>
      <p>
        设置个人日程时，您以<em>注册后的天数</em>（而非日历日期）定义开始和结束。
        Samply 在每位参与者注册时，将该偏移量单独转换为实际时间戳。
      </p>

      <table>
        <thead>
          <tr>
            <th>天标签</th>
            <th>实际锚点</th>
            <th>实用说明</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_ZH.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        您选择的重复模式（每天、特定工作日、隔天等）将在这两个锚定时间戳之间运行。
        Samply 针对每位参与者的个人窗口展开日程，并为每个触发时间写入一条队列条目。
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>在表单中构建个人日程</h2>
      <p>
        个人日程使用与所有其他类型相同的日程表单。与标准重复日程不同的部分是第 6 步（开始）和第 7 步（结束）。
      </p>

      <h3>第 6 步 — 何时开始</h3>
      <p>选择两种相对开始选项之一：</p>
      <dl>
        <dt>注册后第 N 天</dt>
        <dd>
          Samply 从加入日期起计算 N 个日历天，并在该天午夜发送第一条通知。
          设置 <em>N = 1</em> 可在加入后立即开始；设置 <em>N = 3</em> 可在日程开始前留出两天缓冲。
        </dd>
        <dt>注册后 X 天 / 小时 / 分钟</dt>
        <dd>
          从加入时间戳起的精确时间偏移量。当您需要亚天精度时使用——例如，在加入后 4 小时开始，而不是等到下一个午夜。
        </dd>
      </dl>
      <p>
        您也可以选择固定日历日期作为开始，这会使日程变为混合型：结束仍使用个人锚点，但开始对所有人相同。
      </p>

      <h3>第 7 步 — 何时结束</h3>
      <p>
        同样适用两种选项：在注册后第 N 天结束，或在精确时长后结束。结束为独占——设置为第 15 天结束的日程将在第 14 天结束时发送最后一条通知。
      </p>

      <h3>第 2 步 — 重复间隔</h3>
      <p>
        在个人窗口内选择重复模式：每天、特定工作日、隔天等。您也可以为同一日程添加多个间隔——例如，三个独立的时间行（09:00、13:00、18:00），每天发送三条通知。
      </p>
      <p>
        如需在每天窗口内的随机时间发送通知而非固定时间点，请选择<strong>时间窗口</strong>而非具体时间点。这使日程同时具备个人化和随机化特性。请参阅{' '}
        <a href='/docs/types#randomized'>随机日程</a>{' '}
        了解窗口控制。
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>时区处理</h2>
      <p>
        默认情况下，个人日程中的所有时间均以您在表单顶部选择的时区解释。
        启用<strong>根据参与者时区调整</strong>，可让 Samply 将每位参与者的时间重新锚定到其设备时区。
      </p>
      <p>
        启用参与者时区调整后，20:00 的通知将在柏林参与者的 20:00（柏林时间）触发，在东京参与者的 20:00（东京时间）触发——各自在本地傍晚。设备时区在注册时记录，参与者可在应用设置中更新。
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>未来参与者</h2>
      <p>
        表单的<strong>接收者</strong>部分允许您选择仅限当前参与者，或包含所有未来参与者。
        勾选<em>所有未来参与者</em>后，Samply 会自动将个人日程应用于每次新注册——无需手动操作。
      </p>
      <p>
        对于参与者在数周或数月内持续加入的开放招募研究，应启用此设置。否则，在日程创建后加入的参与者将不会收到任何通知。
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>示例配置</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_ZH.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              结果：{ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>常见错误</h3>
      <dl>
        <dt>设置固定日历结束日期而非相对日期</dt>
        <dd>
          如果您将结束设为过去的某个日期，任何在该日期之后加入的人都不会收到通知。当参与者在不同天加入时，请使用相对结束（Day N）。
        </dd>
        <dt>忘记勾选未来参与者</dt>
        <dd>
          只选择当前参与者的个人日程会静默忽略所有后续加入的人。对于开放招募研究，请务必勾选<em>所有未来参与者</em>。
        </dd>
        <dt>Day 1 在您的分析中含义不同</dt>
        <dd>
          Samply 将 Day 1 计为加入当天。如果您的协议将 Day 1 定义为加入后的第一个完整日历日，请在表单中将开始设置为 Day 2。
        </dd>
      </dl>

      <h3>下一步阅读</h3>
      <p>
        日程保存后，Samply 会将其展开为每位参与者的发送队列。
        请参阅 <a href='/docs/queue'>计划队列</a> 以了解如何查看和管理它。
      </p>
    </>
  );
}

function PersonalContentNl() {
  return (
    <>
      <p>
        Een persoonlijk schema wordt niet op een vaste kalenderdatum uitgevoerd. In plaats daarvan
        wordt het uitgevoerd relatief aan het moment waarop elke deelnemer uw studie heeft
        aangemeld. Twee deelnemers die een week apart inschrijven, ontvangen elk hun dag
        1-melding op hun eigen dag 1 — niet op dezelfde maandag.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Wat dag N betekent</h2>
      <p>
        Wanneer u een persoonlijk schema instelt, definieert u een start en een stop in termen van
        <em> dagen na registratie</em>, niet in kalenderdatums. Samply vertaalt die offset voor
        elke deelnemer afzonderlijk naar een echte tijdstempel op het moment dat ze inschrijven.
      </p>

      <table>
        <thead>
          <tr>
            <th>Daglabel</th>
            <th>Feitelijk ankerpunt</th>
            <th>Praktische noot</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_NL.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Het herhalingspatroon dat u kiest (dagelijks, specifieke weekdagen, om de dag) loopt
        vervolgens tussen die twee verankerde tijdstempels. Samply breidt het schema uit tegen het
        persoonlijke venster van elke deelnemer en schrijft één wachtrij-item per verzendtijd.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Een persoonlijk schema in het formulier bouwen</h2>
      <p>
        Persoonlijke schema&#39;s gebruiken hetzelfde schemaformulier als alle andere typen. De secties
        die afwijken van een standaard herhalend schema zijn stap 6 (Start) en stap 7 (Stop).
      </p>

      <h3>Stap 6 — Wanneer te starten</h3>
      <p>Kies een van twee relatieve startopties:</p>
      <dl>
        <dt>Op dag N na registratie</dt>
        <dd>
          Samply telt N kalenderdagen vanaf de aanmelddatum en verstuurt de eerste melding om
          middernacht van die dag. Stel <em>N = 1</em> in om direct na aanmelding te beginnen;
          stel <em>N = 3</em> in om een tweedaagse buffer te laten voor het schema begint.
        </dd>
        <dt>Na X dagen / uren / minuten na registratie</dt>
        <dd>
          Een exacte duuroffset vanaf het aanmeldingtijdstempel. Gebruik dit wanneer u
          subdagprecisie nodig hebt — bijvoorbeeld 4 uur na aanmelding beginnen in plaats van
          wachten tot de volgende middernacht.
        </dd>
      </dl>
      <p>
        U kunt ook een vaste kalenderdatum als start kiezen, waardoor het schema hybride wordt:
        het gebruikt nog steeds het persoonlijke stopankerpunt maar de start is voor iedereen
        hetzelfde.
      </p>

      <h3>Stap 7 — Wanneer te stoppen</h3>
      <p>
        Dezelfde twee opties zijn van toepassing: stop op dag N na registratie, of stop na een
        precieze duur. De stop is exclusief — een schema ingesteld om te stoppen op dag 15
        verstuurt zijn laatste melding aan het einde van dag 14.
      </p>

      <h3>Stap 2 — Het herhalingsinterval</h3>
      <p>
        Kies binnen het persoonlijke venster een herhalingspatroon: elke dag, specifieke weekdagen,
        om de dag, enzovoort. U kunt ook meerdere intervallen aan hetzelfde schema toevoegen —
        bijvoorbeeld drie afzonderlijke tijdrijen (09:00, 13:00, 18:00) om drie meldingen per dag
        te sturen.
      </p>
      <p>
        Om op willekeurige tijden binnen dagelijkse vensters te sturen in plaats van vaste kloktijden,
        selecteer <strong>Tijdvenster</strong> in plaats van specifieke tijdstippen. Dit maakt het
        schema zowel persoonlijk als willekeurig. Zie{' '}
        <a href="/docs/types#randomized">Willekeurige schema&#39;s</a>{' '}
        voor de vensterbesturingen.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Tijdzonebeheer</h2>
      <p>
        Standaard worden alle tijden in een persoonlijk schema geïnterpreteerd in de tijdzone die
        u bovenaan het formulier selecteert. Schakel <strong>Aanpassen aan tijdzone deelnemer</strong>{' '}
        in om Samply de tijden van elke deelnemer te laten herankeren aan hun apparaattijdzone.
      </p>
      <p>
        Wanneer aanpassing aan de deelnemertijdzone is ingeschakeld, wordt een melding om 20:00
        verstuurd op 20:00 in Berlijn voor een Berlijnse deelnemer en op 20:00 in Tokio voor een
        Tokiose deelnemer — elk op hun lokale avond. De apparaattijdzone wordt vastgelegd bij
        inschrijving en kan door de deelnemer worden bijgewerkt via de app-instellingen.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Toekomstige deelnemers</h2>
      <p>
        Met de sectie <strong>Ontvangers</strong> van het formulier kunt u kiezen tussen alleen
        huidige deelnemers of ook alle toekomstige deelnemers. Wanneer{' '}
        <em>Alle toekomstige deelnemers</em> is aangevinkt, past Samply het persoonlijke schema
        automatisch toe op elke nieuwe inschrijving — geen handmatige actie vereist.
      </p>
      <p>
        Dit is de instelling om in te schakelen voor studies met open werving waarbij deelnemers
        continu gedurende weken of maanden aanmelden. Zonder deze instelling ontvangen deelnemers
        die na het aanmaken van het schema aanmelden geen meldingen ervan.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Voorbeeldconfiguraties</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_NL.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Resultaat: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Veelgemaakte fouten</h3>
      <dl>
        <dt>Een vaste kalenderstopdatum instellen in plaats van een relatieve</dt>
        <dd>
          Als u de stop instelt op een specifieke datum in het verleden, worden er geen meldingen
          verstuurd voor iedereen die na die datum aanmeldt. Gebruik een relatieve stop (dag N)
          wanneer deelnemers op verschillende dagen aanmelden.
        </dd>
        <dt>Vergeten toekomstige deelnemers te activeren</dt>
        <dd>
          Een persoonlijk schema met alleen geselecteerde huidige deelnemers negeert stilzwijgend
          iedereen die later aanmeldt. Vink voor studies met open werving altijd{' '}
          <em>Alle toekomstige deelnemers</em> aan.
        </dd>
        <dt>Dag 1 betekent iets anders in uw analyse</dt>
        <dd>
          Samply telt dag 1 als de aanmelddag. Als uw protocol dag 1 definieert als de eerste
          volledige kalenderdag na aanmelding, stel uw start dan in op dag 2 in het formulier.
        </dd>
      </dl>

      <h3>Wat hierna te lezen</h3>
      <p>
        Zodra een schema is opgeslagen, breidt Samply het uit in een deelnemerspecifieke wachtrij
        van verzendingen. Zie <a href="/docs/queue">De geplande wachtrij</a> om te begrijpen hoe
        u deze kunt lezen en beheren.
      </p>
    </>
  );
}

function PersonalContentDe() {
  return (
    <>
      <p>
        Ein persönlicher Zeitplan wird nicht zu einem festen Kalenderdatum ausgelöst. Stattdessen
        wird er relativ zu dem Moment ausgelöst, in dem jede teilnehmende Person Ihrer Studie
        beigetreten ist. Zwei Teilnehmende, die eine Woche auseinander eingeschrieben sind, erhalten
        ihre Tag-1-Benachrichtigung jeweils an ihrem eigenen Tag 1 — nicht am gleichen Montag.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Was Tag N bedeutet</h2>
      <p>
        Wenn Sie einen persönlichen Zeitplan festlegen, definieren Sie einen Start und ein Ende
        in Begriffen von <em>Tagen nach der Registrierung</em>, nicht in Kalenderdaten. Samply
        übersetzt diesen Abstand für jede teilnehmende Person individuell zum Zeitpunkt ihrer
        Einschreibung in einen echten Zeitstempel.
      </p>

      <table>
        <thead>
          <tr>
            <th>Tagesbezeichnung</th>
            <th>Tatsächlicher Ankerpunkt</th>
            <th>Praktischer Hinweis</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_DE.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Das von Ihnen gewählte Wiederholungsmuster (täglich, bestimmte Wochentage, jeden zweiten
        Tag) läuft dann zwischen diesen beiden verankerten Zeitstempeln. Samply erweitert den
        Zeitplan gegen das persönliche Zeitfenster jeder teilnehmenden Person und schreibt einen
        Warteschlangeneintrag pro Auslösezeit.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Einen persönlichen Zeitplan im Formular erstellen</h2>
      <p>
        Persönliche Zeitpläne verwenden dasselbe Formular wie alle anderen Typen. Die Abschnitte,
        die sich von einem standardmäßigen wiederkehrenden Zeitplan unterscheiden, sind Schritt 6
        (Start) und Schritt 7 (Ende).
      </p>

      <h3>Schritt 6 — Wann beginnen</h3>
      <p>Wählen Sie eine von zwei relativen Startoptionen:</p>
      <dl>
        <dt>An Tag N nach der Registrierung</dt>
        <dd>
          Samply zählt N Kalendertage ab dem Beitrittsdatum und sendet die erste Benachrichtigung
          um Mitternacht dieses Tages. Setzen Sie <em>N = 1</em>, um unmittelbar nach dem Beitritt
          zu beginnen; setzen Sie <em>N = 3</em>, um vor Beginn des Zeitplans einen zweitägigen
          Puffer zu lassen.
        </dd>
        <dt>Nach X Tagen / Stunden / Minuten nach der Registrierung</dt>
        <dd>
          Ein genauer Dauer-Offset vom Beitrittszeitstempel. Verwenden Sie dies, wenn Sie
          Tagesgenauigkeit benötigen — zum Beispiel 4 Stunden nach dem Beitritt beginnen,
          anstatt bis zur nächsten Mitternacht zu warten.
        </dd>
      </dl>
      <p>
        Sie können auch ein festes Kalenderdatum als Start wählen, was den Zeitplan zu einem
        Hybrid macht: Er verwendet weiterhin den persönlichen Stopp-Anker, aber der Start ist
        für alle gleich.
      </p>

      <h3>Schritt 7 — Wann beenden</h3>
      <p>
        Die gleichen zwei Optionen gelten: Ende an Tag N nach der Registrierung, oder Ende nach
        einer genauen Dauer. Das Ende ist exklusiv — ein Zeitplan, der auf Tag 15 gesetzt ist,
        sendet seine letzte Benachrichtigung am Ende von Tag 14.
      </p>

      <h3>Schritt 2 — Das Wiederholungsintervall</h3>
      <p>
        Wählen Sie innerhalb des persönlichen Zeitfensters ein Wiederholungsmuster: täglich,
        bestimmte Wochentage, jeden zweiten Tag und so weiter. Sie können auch mehrere Intervalle
        zum gleichen Zeitplan hinzufügen — zum Beispiel drei separate Tageszeit-Zeilen (09:00,
        13:00, 18:00), um drei Benachrichtigungen pro Tag zu senden.
      </p>
      <p>
        Um zu zufälligen Zeiten innerhalb täglicher Zeitfenster statt zu festen Uhrzeiten zu
        senden, wählen Sie <strong>Zeitfenster</strong> anstelle bestimmter Zeitpunkte. Dies macht
        den Zeitplan sowohl persönlich als auch zufällig. Siehe{' '}
        <a href="/docs/types#randomized">Zufällige Zeitpläne</a>{' '}
        für die Zeitfenstersteuerung.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Zeitzonenhandhabung</h2>
      <p>
        Standardmäßig werden alle Zeiten in einem persönlichen Zeitplan in der Zeitzone
        interpretiert, die Sie oben im Formular auswählen. Aktivieren Sie{' '}
        <strong>An Teilnehmerzeitzone anpassen</strong>, damit Samply die Zeiten jeder
        teilnehmenden Person stattdessen an deren Gerätezeitzone neu verankert.
      </p>
      <p>
        Wenn die Teilnehmerzeitzone-Anpassung aktiviert ist, wird eine Benachrichtigung um 20:00
        Uhr für eine Person in Berlin um 20:00 Uhr Berliner Zeit und für eine Person in Tokio um
        20:00 Uhr Tokioter Zeit ausgelöst — jeweils zu ihrem lokalen Abend. Die Gerätezeitzone
        wird bei der Einschreibung gespeichert und kann von der teilnehmenden Person in den
        App-Einstellungen aktualisiert werden.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Zukünftige Teilnehmende</h2>
      <p>
        Der Abschnitt <strong>Empfänger</strong> des Formulars ermöglicht die Auswahl zwischen
        nur aktuellen Teilnehmenden oder auch allen zukünftigen Teilnehmenden. Wenn{' '}
        <em>Alle zukünftigen Teilnehmenden</em> ausgewählt ist, wendet Samply den persönlichen
        Zeitplan automatisch auf jede neue Einschreibung an — keine manuelle Aktion erforderlich.
      </p>
      <p>
        Dies ist die Einstellung, die für Studien mit offener Rekrutierung aktiviert werden sollte,
        bei denen Teilnehmende kontinuierlich über Wochen oder Monate beitreten. Ohne sie erhalten
        Teilnehmende, die nach der Erstellung des Zeitplans beitreten, keine Benachrichtigungen davon.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Beispielkonfigurationen</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_DE.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Ergebnis: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Häufige Fehler</h3>
      <dl>
        <dt>Ein festes Kalenderstopp-Datum statt eines relativen setzen</dt>
        <dd>
          Wenn Sie das Ende auf ein bestimmtes Datum in der Vergangenheit setzen, werden keine
          Benachrichtigungen für Personen ausgelöst, die nach diesem Datum beitreten. Verwenden
          Sie ein relatives Ende (Tag N), wenn Teilnehmende an verschiedenen Tagen beitreten.
        </dd>
        <dt>Vergessen, zukünftige Teilnehmende zu aktivieren</dt>
        <dd>
          Ein persönlicher Zeitplan mit nur ausgewählten aktuellen Teilnehmenden ignoriert
          stillschweigend alle, die später beitreten. Aktivieren Sie bei Studien mit offener
          Rekrutierung immer <em>Alle zukünftigen Teilnehmenden</em>.
        </dd>
        <dt>Tag 1 bedeutet in Ihrer Analyse etwas anderes</dt>
        <dd>
          Samply zählt Tag 1 als den Beitrittag. Wenn Ihr Protokoll Tag 1 als den ersten vollen
          Kalendertag nach dem Beitritt definiert, setzen Sie Ihren Start im Formular auf Tag 2.
        </dd>
      </dl>

      <h3>Was als nächstes lesen</h3>
      <p>
        Sobald ein Zeitplan gespeichert ist, erweitert Samply ihn in eine teilnehmerspezifische
        Warteschlange von Sendungen. Siehe{' '}
        <a href="/docs/queue">Die geplante Warteschlange</a>, um zu verstehen, wie man sie liest
        und verwaltet.
      </p>
    </>
  );
}

const DAY_ROWS_KO = [
  { day: '1일차', anchor: '참여한 순간 (약 1분 추가).', note: '1일차로 설정된 알림은 등록 직후 거의 즉시 전송됩니다.' },
  { day: '2일차', anchor: '선택한 시간대의 다음 달력 날 자정.', note: '월요일 21:00에 참여한 참여자는 화요일에 2일차 알림을 받습니다.' },
  { day: 'N일차', anchor: '참여 날짜로부터 N번째 달력 날의 자정.', note: '14일차 = 참여일로부터 14번째 날의 자정.' },
];

const EXAMPLES_KO = [
  {
    title: '14일 일기 연구',
    config: [
      '시작: 등록 후 1일차.',
      '종료: 등록 후 15일차 (14일차 종료).',
      '간격: 매일 20:00.',
      '수신자: 모든 현재 및 미래 참여자.',
    ],
    result: '모든 참여자는 참여한 날부터 시작하여 다른 사람들의 등록 시점과 무관하게 14번의 저녁 알림을 받습니다.',
  },
  {
    title: '버스트 프로토콜 — 1주차 및 3주차만',
    config: [
      '일정 A — 시작: 1일차, 종료: 8일차. 간격: 매일 12:00.',
      '일정 B — 시작: 15일차, 종료: 22일차. 간격: 매일 12:00.',
      '두 일정 모두 동일한 참여자를 대상으로 합니다.',
    ],
    result: '두 개의 독립적인 개인화 일정이 두 개의 별도 주를 커버합니다. 그 사이의 조용한 주는 일정이 필요하지 않습니다.',
  },
  {
    title: '개입 연구 — 3일차부터 활성 단계',
    config: [
      '시작: 등록 후 3일차.',
      '종료: 등록 후 10일차.',
      '간격: 하루 세 번 (09:00, 13:00, 18:00) — 세 개의 별도 간격을 추가하십시오.',
    ],
    result: '참여자들은 3일차에 개입 알림이 시작되기 전에 이틀간의 기준선(1–2일차)을 완료합니다.',
  },
];

const DAY_ROWS_IT = [
  { day: 'Giorno 1', anchor: 'Il momento dell\'iscrizione (più ~1 minuto).', note: 'Le notifiche impostate per il Giorno 1 vengono inviate quasi immediatamente dopo l\'iscrizione.' },
  { day: 'Giorno 2', anchor: 'Mezzanotte del giorno di calendario successivo nel fuso orario scelto.', note: 'Un partecipante che si iscrive alle 21:00 di lunedì riceve le notifiche del Giorno 2 martedì.' },
  { day: 'Giorno N', anchor: 'Mezzanotte dell\'N-esimo giorno di calendario dopo la data di iscrizione.', note: 'Giorno 14 = mezzanotte del 14° giorno contato dal giorno di iscrizione.' },
];

const EXAMPLES_IT = [
  {
    title: 'Studio diaristico di 14 giorni',
    config: [
      'Inizio: Giorno 1 dopo la registrazione.',
      'Fine: Giorno 15 dopo la registrazione (fine del Giorno 14).',
      'Intervallo: quotidiano alle 20:00.',
      'Destinatari: tutti i partecipanti attuali e futuri.',
    ],
    result: 'Ogni partecipante riceve 14 notifiche serali, a partire dal giorno in cui si iscrive, indipendentemente da quando si sono iscritti gli altri.',
  },
  {
    title: 'Protocollo a burst — solo settimane 1 e 3',
    config: [
      'Pianificazione A — Inizio: Giorno 1, Fine: Giorno 8. Intervallo: quotidiano alle 12:00.',
      'Pianificazione B — Inizio: Giorno 15, Fine: Giorno 22. Intervallo: quotidiano alle 12:00.',
      'Entrambe le pianificazioni si rivolgono agli stessi partecipanti.',
    ],
    result: 'Due pianificazioni personali indipendenti coprono due settimane separate. La settimana di pausa intermedia non richiede alcuna pianificazione.',
  },
  {
    title: 'Studio di intervento — fase attiva dal Giorno 3',
    config: [
      'Inizio: Giorno 3 dopo la registrazione.',
      'Fine: Giorno 10 dopo la registrazione.',
      'Intervallo: tre volte al giorno (09:00, 13:00, 18:00) — aggiungere tre intervalli separati.',
    ],
    result: 'I partecipanti completano una baseline di due giorni (Giorni 1–2) prima che le notifiche di intervento inizino al Giorno 3.',
  },
];

function PersonalContentKo() {
  return (
    <>
      <p>
        개인화 일정은 고정된 달력 날짜에 실행되지 않습니다. 대신 각 참여자가 연구에 참여한
        순간을 기준으로 실행됩니다. 일주일 간격으로 등록한 두 참여자는 각각 자신의 1일차에
        1일차 알림을 받습니다 — 같은 월요일이 아닙니다.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>N일차의 의미</h2>
      <p>
        개인화 일정을 설정할 때 달력 날짜가 아닌 <em>등록 후 일수</em>로 시작과 종료를 정의합니다.
        Samply는 참여자가 등록하는 순간 각 참여자에 대해 개별적으로 해당 오프셋을 실제 타임스탬프로
        변환합니다.
      </p>

      <table>
        <thead>
          <tr>
            <th>일차 표시</th>
            <th>실제 기준점</th>
            <th>실용적 참고사항</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_KO.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        선택한 반복 패턴(매일, 특정 요일, 격일)은 이 두 개의 고정된 타임스탬프 사이에서
        실행됩니다. Samply는 각 참여자의 개인 창에 맞게 일정을 확장하고 각 실행 시간에 대해
        하나의 큐 항목을 씁니다.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>양식에서 개인화 일정 만들기</h2>
      <p>
        개인화 일정은 다른 모든 유형과 동일한 일정 양식을 사용합니다. 표준 반복 일정과 다른
        섹션은 6단계(시작)와 7단계(종료)입니다.
      </p>

      <h3>6단계 — 시작 시점</h3>
      <p>두 가지 상대 시작 옵션 중 하나를 선택하십시오:</p>
      <dl>
        <dt>등록 후 N일차에</dt>
        <dd>
          Samply는 참여 날짜로부터 N 달력 일수를 세어 해당 날 자정에 첫 번째 알림을 전송합니다.
          참여 직후 시작하려면 <em>N = 1</em>로 설정하고, 일정 시작 전에 이틀간의 버퍼를 두려면
          <em> N = 3</em>으로 설정하십시오.
        </dd>
        <dt>등록 후 X일 / 시간 / 분 후에</dt>
        <dd>
          참여 타임스탬프로부터의 정확한 기간 오프셋. 하루 미만의 정밀도가 필요한 경우 사용하십시오
          — 예를 들어 다음 자정까지 기다리지 않고 참여 후 4시간 후에 시작하는 경우.
        </dd>
      </dl>
      <p>
        시작으로 고정된 달력 날짜를 선택할 수도 있으며, 이렇게 하면 일정이 하이브리드가 됩니다:
        여전히 개인 종료 기준점을 사용하지만 시작은 모든 사람에게 동일합니다.
      </p>

      <h3>7단계 — 종료 시점</h3>
      <p>
        동일한 두 가지 옵션이 적용됩니다: 등록 후 N일차에 종료하거나 정확한 기간 후에 종료합니다.
        종료는 배타적입니다 — 15일차에 종료하도록 설정된 일정은 14일차 종료 시 마지막 알림을
        전송합니다.
      </p>

      <h3>2단계 — 반복 간격</h3>
      <p>
        개인 창 내에서 반복 패턴을 선택하십시오: 매일, 특정 요일, 격일 등. 동일한 일정에 여러
        간격을 추가할 수도 있습니다 — 예를 들어 하루에 세 개의 알림을 보내기 위해 별도의 시간대
        행 세 개(09:00, 13:00, 18:00)를 추가할 수 있습니다.
      </p>
      <p>
        고정된 시간 대신 매일 창 내의 무작위 시간에 전송하려면 특정 시간대 대신
        <strong> 시간 창</strong>을 선택하십시오. 이렇게 하면 일정이 개인화되고 무작위화됩니다.
        창 컨트롤은 <a href="/docs/types#randomized">무작위 일정</a>을 참조하십시오.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>시간대 처리</h2>
      <p>
        기본적으로 개인화 일정의 모든 시간은 양식 상단에서 선택한 시간대로 해석됩니다.
        <strong>참여자 시간대로 조정</strong>을 활성화하면 Samply가 대신 각 참여자의 시간을
        기기 시간대로 재고정합니다.
      </p>
      <p>
        참여자 시간대 조정이 활성화되면 20:00 알림은 베를린 참여자에게는 베를린 시간 20:00에,
        도쿄 참여자에게는 도쿄 시간 20:00에 전송됩니다 — 각자 현지 저녁 시간에. 기기 시간대는
        등록 시 기록되며 참여자가 앱 설정에서 업데이트할 수 있습니다.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>미래 참여자</h2>
      <p>
        양식의 <strong>수신자</strong> 섹션에서 현재 참여자만 선택하거나 미래 참여자도 모두
        선택할 수 있습니다. <em>모든 미래 참여자</em>가 선택되면 Samply는 모든 새 등록에
        자동으로 개인화 일정을 적용합니다 — 수동 작업이 필요하지 않습니다.
      </p>
      <p>
        참여자가 몇 주 또는 몇 달에 걸쳐 지속적으로 참여하는 개방형 모집 연구에 활성화해야
        하는 설정입니다. 이 설정 없이는 일정이 생성된 후 참여하는 참여자가 알림을 받지 못합니다.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>구성 예시</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_KO.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              결과: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>자주 하는 실수</h3>
      <dl>
        <dt>상대적 종료 대신 고정된 달력 종료 날짜 설정</dt>
        <dd>
          종료를 과거의 특정 날짜로 설정하면 해당 날짜 이후에 참여하는 사람에게는 알림이
          전송되지 않습니다. 참여자가 서로 다른 날에 참여할 때는 상대적 종료(N일차)를
          사용하십시오.
        </dd>
        <dt>미래 참여자 선택 잊기</dt>
        <dd>
          현재 참여자만 선택된 개인화 일정은 나중에 참여하는 모든 사람을 조용히 무시합니다.
          개방형 모집 연구에서는 항상 <em>모든 미래 참여자</em>를 선택하십시오.
        </dd>
        <dt>분석에서 1일차의 의미가 다른 경우</dt>
        <dd>
          Samply는 1일차를 참여 당일로 계산합니다. 프로토콜에서 1일차를 참여 후 첫 번째
          완전한 달력 날로 정의하는 경우 양식에서 시작을 2일차로 설정하십시오.
        </dd>
      </dl>

      <h3>다음으로 읽을 내용</h3>
      <p>
        일정이 저장되면 Samply가 이를 참여자별 전송 큐로 확장합니다.
        <a href="/docs/queue">예약된 큐</a>를 참조하여 읽고 관리하는 방법을 이해하십시오.
      </p>
    </>
  );
}

const DAY_ROWS_ES = [
  { day: 'Día 1', anchor: 'El momento del registro (más ~1 minuto).', note: 'Las notificaciones definidas para el Día 1 se activan casi inmediatamente después del registro.' },
  { day: 'Día 2', anchor: 'Medianoche del siguiente día calendario en la zona horaria elegida.', note: 'Un participante que se registra a las 21:00 un lunes recibe sus notificaciones del Día 2 el martes.' },
  { day: 'Día N', anchor: 'Medianoche del N-ésimo día calendario tras la fecha de registro.', note: 'Día 14 = medianoche del 14.º día contado desde el día de registro.' },
];

const EXAMPLES_ES = [
  {
    title: 'Estudio de diario de 14 días',
    config: [
      'Inicio: Día 1 tras el registro.',
      'Fin: Día 15 tras el registro (fin del Día 14).',
      'Intervalo: diario a las 20:00.',
      'Destinatarios: todos los participantes actuales y futuros.',
    ],
    result: 'Cada participante recibe 14 notificaciones vespertinas, a partir del día de su registro, independientemente de cuándo se registraron los demás.',
  },
  {
    title: 'Protocolo en ráfaga — solo semanas 1 y 3',
    config: [
      'Calendario A — Inicio: Día 1, Fin: Día 8. Intervalo: diario a las 12:00.',
      'Calendario B — Inicio: Día 15, Fin: Día 22. Intervalo: diario a las 12:00.',
      'Ambos calendarios apuntan a los mismos participantes.',
    ],
    result: 'Dos calendarios personales independientes cubren dos semanas distintas. La semana de silencio intermedia no requiere ningún calendario.',
  },
  {
    title: 'Estudio de intervención — fase activa a partir del Día 3',
    config: [
      'Inicio: Día 3 tras el registro.',
      'Fin: Día 10 tras el registro.',
      'Intervalo: tres veces al día (09:00, 13:00, 18:00) — añadir tres intervalos separados.',
    ],
    result: 'Los participantes realizan una línea base de dos días (Días 1–2) antes de que comiencen las notificaciones de intervención en el Día 3.',
  },
];

const DAY_ROWS_FR = [
  { day: 'Jour 1', anchor: 'Le moment de l\'inscription (plus ~1 minute).', note: 'Les notifications définies pour le Jour 1 se déclenchent presque immédiatement après l\'inscription.' },
  { day: 'Jour 2', anchor: 'Minuit du jour calendaire suivant dans le fuseau horaire choisi.', note: 'Un participant qui s\'inscrit à 21h00 un lundi reçoit ses notifications du Jour 2 le mardi.' },
  { day: 'Jour N', anchor: 'Minuit du N-ième jour calendaire après la date d\'inscription.', note: 'Jour 14 = minuit du 14e jour compté depuis le jour d\'inscription.' },
];

const EXAMPLES_FR = [
  {
    title: 'Étude journalière de 14 jours',
    config: [
      'Début : Jour 1 après l\'inscription.',
      'Fin : Jour 15 après l\'inscription (fin du Jour 14).',
      'Intervalle : quotidien à 20h00.',
      'Destinataires : tous les participants actuels et futurs.',
    ],
    result: 'Chaque participant reçoit 14 notifications du soir, à partir du jour de son inscription, indépendamment du moment où les autres se sont inscrits.',
  },
  {
    title: 'Protocole en rafale — semaines 1 et 3 uniquement',
    config: [
      'Planning A — Début : Jour 1, Fin : Jour 8. Intervalle : quotidien à 12h00.',
      'Planning B — Début : Jour 15, Fin : Jour 22. Intervalle : quotidien à 12h00.',
      'Les deux plannings ciblent les mêmes participants.',
    ],
    result: 'Deux plannings personnels indépendants couvrent deux semaines distinctes. La semaine de silence intermédiaire ne nécessite aucun planning.',
  },
  {
    title: 'Étude d\'intervention — phase active à partir du Jour 3',
    config: [
      'Début : Jour 3 après l\'inscription.',
      'Fin : Jour 10 après l\'inscription.',
      'Intervalle : trois fois par jour (09h00, 13h00, 18h00) — ajouter trois intervalles séparés.',
    ],
    result: 'Les participants réalisent une baseline de deux jours (Jours 1–2) avant que les notifications d\'intervention débutent au Jour 3.',
  },
];

function PersonalContentFr() {
  return (
    <>
      <p>
        Un planning personnel ne se déclenche pas à une date calendaire fixe. Il se déclenche
        au contraire par rapport au moment où chaque participant a rejoint votre étude. Deux
        participants qui s&apos;inscrivent à une semaine d&apos;intervalle recevront chacun leur notification
        du Jour 1 à leur propre Jour 1 — et non le même lundi.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Que signifie le Jour N</h2>
      <p>
        Lorsque vous définissez un planning personnel, vous précisez un début et une fin en termes
        de <em>jours après l&apos;inscription</em>, et non en dates calendaires. Samply traduit ce
        décalage en horodatage réel pour chaque participant individuellement au moment où il
        s&apos;inscrit.
      </p>

      <table>
        <thead>
          <tr>
            <th>Étiquette du jour</th>
            <th>Point d&apos;ancrage réel</th>
            <th>Note pratique</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_FR.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Le motif de répétition choisi (quotidien, jours de semaine spécifiques, tous les deux
        jours) s&apos;exécute ensuite entre ces deux horodatages ancrés. Samply développe le planning
        selon la fenêtre personnelle de chaque participant et enregistre une entrée dans la file
        d&apos;attente pour chaque heure de déclenchement.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Créer un planning personnel dans le formulaire</h2>
      <p>
        Les plannings personnels utilisent le même formulaire que tous les autres types. Les
        sections qui diffèrent d&apos;un planning récurrent standard sont l&apos;Étape 6 (Début) et
        l&apos;Étape 7 (Fin).
      </p>

      <h3>Étape 6 — Quand commencer</h3>
      <p>Choisissez l&apos;une des deux options de début relatif :</p>
      <dl>
        <dt>Le Jour N après l&apos;inscription</dt>
        <dd>
          Samply compte N jours calendaires à partir de la date d&apos;inscription et envoie la
          première notification à minuit de ce jour. Définissez <em>N = 1</em> pour commencer
          immédiatement après l&apos;inscription ; définissez <em>N = 3</em> pour laisser un tampon
          de deux jours avant le début du planning.
        </dd>
        <dt>Après X jours / heures / minutes après l&apos;inscription</dt>
        <dd>
          Un décalage de durée exacte par rapport à l&apos;horodatage d&apos;inscription. Utilisez cette
          option lorsque vous avez besoin d&apos;une précision inférieure au jour — par exemple,
          commencer 4 heures après l&apos;inscription plutôt que d&apos;attendre le prochain minuit.
        </dd>
      </dl>
      <p>
        Vous pouvez également choisir une date calendaire fixe comme début, ce qui rend le
        planning hybride : il utilise toujours le point d&apos;ancrage de fin personnel, mais le
        début est identique pour tous.
      </p>

      <h3>Étape 7 — Quand s&apos;arrêter</h3>
      <p>
        Les mêmes deux options s&apos;appliquent : s&apos;arrêter au Jour N après l&apos;inscription, ou
        s&apos;arrêter après une durée précise. La fin est exclusive — un planning défini pour
        s&apos;arrêter au Jour 15 envoie sa dernière notification à la fin du Jour 14.
      </p>

      <h3>Étape 2 — L&apos;intervalle de répétition</h3>
      <p>
        Dans la fenêtre personnelle, choisissez un motif de répétition : tous les jours, des
        jours de semaine spécifiques, tous les deux jours, etc. Vous pouvez également ajouter
        plusieurs intervalles au même planning — par exemple, trois lignes horaires distinctes
        (09h00, 13h00, 18h00) pour envoyer trois notifications par jour.
      </p>
      <p>
        Pour envoyer à des heures aléatoires dans des fenêtres quotidiennes plutôt qu&apos;à des
        heures fixes, sélectionnez <strong>Fenêtre horaire</strong> à la place d&apos;heures
        spécifiques. Cela rend le planning à la fois personnel et aléatoire. Voir{' '}
        <a href="/docs/types#randomized">Plannings aléatoires</a>{' '}
        pour les contrôles de fenêtre.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Gestion du fuseau horaire</h2>
      <p>
        Par défaut, toutes les heures d&apos;un planning personnel sont interprétées dans le fuseau
        horaire que vous sélectionnez en haut du formulaire. Activez{' '}
        <strong>Ajuster au fuseau horaire du participant</strong> pour que Samply réancre les
        heures de chaque participant sur le fuseau horaire de son appareil.
      </p>
      <p>
        Lorsque l&apos;ajustement au fuseau horaire du participant est activé, une notification à
        20h00 se déclenche à 20h00 à Berlin pour un participant berlinois et à 20h00 à Tokyo
        pour un participant tokyoïte — chacun à son heure locale du soir. Le fuseau horaire de
        l&apos;appareil est enregistré lors de l&apos;inscription et peut être mis à jour par le participant
        depuis les paramètres de l&apos;application.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Participants futurs</h2>
      <p>
        La section <strong>Destinataires</strong> du formulaire vous permet de choisir entre les
        participants actuels uniquement ou également tous les participants futurs. Lorsque{' '}
        <em>Tous les participants futurs</em> est coché, Samply applique automatiquement le
        planning personnel à chaque nouvelle inscription — aucune action manuelle n&apos;est requise.
      </p>
      <p>
        C&apos;est le paramètre à activer pour les études à recrutement ouvert où les participants
        rejoignent continuellement sur des semaines ou des mois. Sans lui, les participants qui
        rejoignent après la création du planning ne reçoivent aucune notification de celui-ci.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Exemples de configurations</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_FR.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Résultat : {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Erreurs fréquentes</h3>
      <dl>
        <dt>Définir une date de fin calendaire fixe plutôt que relative</dt>
        <dd>
          Si vous définissez la fin sur une date spécifique dans le passé, aucune notification
          ne sera envoyée à quiconque s&apos;inscrit après cette date. Utilisez une fin relative
          (Jour N) lorsque les participants rejoignent à des jours différents.
        </dd>
        <dt>Oublier de cocher les participants futurs</dt>
        <dd>
          Un planning personnel avec uniquement les participants actuels sélectionnés ignorera
          silencieusement toute personne qui rejoindra plus tard. Pour les études à recrutement
          ouvert, cochez toujours <em>Tous les participants futurs</em>.
        </dd>
        <dt>Le Jour 1 a une signification différente dans votre analyse</dt>
        <dd>
          Samply compte le Jour 1 comme le jour de l&apos;inscription. Si votre protocole définit
          le Jour 1 comme le premier jour calendaire complet après l&apos;inscription, définissez
          votre début au Jour 2 dans le formulaire.
        </dd>
      </dl>

      <h3>Que lire ensuite</h3>
      <p>
        Une fois un planning enregistré, Samply le développe en une file d&apos;attente d&apos;envois
        par participant. Voir <a href="/docs/queue">La file d&apos;attente planifiée</a> pour
        comprendre comment la lire et la gérer.
      </p>
    </>
  );
}

function PersonalContentIt() {
  return (
    <>
      <p>
        Una pianificazione personalizzata non si attiva a una data del calendario fissa. Si attiva
        invece in relazione al momento in cui ciascun partecipante ha aderito allo studio. Due
        partecipanti che si iscrivono a distanza di una settimana riceveranno ciascuno la notifica
        del Giorno 1 nel loro Giorno 1 — non lo stesso lunedì.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Cosa significa Giorno N</h2>
      <p>
        Quando si imposta una pianificazione personalizzata, si definisce un inizio e una fine in
        termini di <em>giorni dopo la registrazione</em>, non di date del calendario. Samply
        traduce quell&apos;offset in un timestamp reale per ciascun partecipante individualmente nel
        momento in cui si iscrive.
      </p>

      <table>
        <thead>
          <tr>
            <th>Etichetta giorno</th>
            <th>Punto di riferimento effettivo</th>
            <th>Nota pratica</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_IT.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Il pattern di ripetizione scelto (quotidiano, giorni della settimana specifici, ogni due
        giorni) viene eseguito tra questi due timestamp ancorati. Samply espande la pianificazione
        rispetto alla finestra personale di ciascun partecipante e scrive una voce della coda per
        ogni orario di attivazione.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Creazione di una pianificazione personalizzata nel modulo</h2>
      <p>
        Le pianificazioni personalizzate utilizzano lo stesso modulo di pianificazione di tutti gli
        altri tipi. Le sezioni che differiscono da una pianificazione ricorrente standard sono il
        Passaggio 6 (Inizio) e il Passaggio 7 (Fine).
      </p>

      <h3>Passaggio 6 — Quando iniziare</h3>
      <p>Scegliere una delle due opzioni di inizio relativo:</p>
      <dl>
        <dt>Il giorno N dopo la registrazione</dt>
        <dd>
          Samply conta N giorni di calendario dalla data di iscrizione e invia la prima notifica
          alla mezzanotte di quel giorno. Impostare <em>N = 1</em> per iniziare immediatamente
          dopo l&apos;iscrizione; impostare <em>N = 3</em> per lasciare un buffer di due giorni prima
          che inizi la pianificazione.
        </dd>
        <dt>Dopo X giorni / ore / minuti dalla registrazione</dt>
        <dd>
          Un offset di durata esatto dal timestamp di iscrizione. Utilizzare questo quando è
          necessaria una precisione inferiore al giorno — ad esempio, iniziare 4 ore dopo
          l&apos;iscrizione anziché aspettare la mezzanotte successiva.
        </dd>
      </dl>
      <p>
        È anche possibile scegliere una data del calendario fissa come inizio, il che rende la
        pianificazione ibrida: utilizza ancora il punto di riferimento di fine personale ma
        l&apos;inizio è lo stesso per tutti.
      </p>

      <h3>Passaggio 7 — Quando terminare</h3>
      <p>
        Si applicano le stesse due opzioni: terminare il Giorno N dopo la registrazione, oppure
        terminare dopo una durata precisa. La fine è esclusiva — una pianificazione impostata per
        terminare il Giorno 15 invia la sua ultima notifica alla fine del Giorno 14.
      </p>

      <h3>Passaggio 2 — L&apos;intervallo di ripetizione</h3>
      <p>
        All&apos;interno della finestra personale, scegliere un pattern di ripetizione: ogni giorno,
        giorni della settimana specifici, ogni due giorni e così via. È anche possibile aggiungere
        più intervalli alla stessa pianificazione — ad esempio, tre righe di orario separate
        (09:00, 13:00, 18:00) per inviare tre notifiche al giorno.
      </p>
      <p>
        Per inviare a orari casuali all&apos;interno di finestre giornaliere invece di orari fissi,
        selezionare <strong>Finestra temporale</strong> invece di orari specifici. Questo rende
        la pianificazione sia personalizzata che casuale. Vedere{' '}
        <a href="/docs/types#randomized">Pianificazioni casuali</a>{' '}
        per i controlli della finestra.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Gestione del fuso orario</h2>
      <p>
        Per impostazione predefinita, tutti gli orari in una pianificazione personalizzata vengono
        interpretati nel fuso orario selezionato nella parte superiore del modulo. Abilitare{' '}
        <strong>Adatta al fuso orario del partecipante</strong> per fare in modo che Samply
        riancori gli orari di ciascun partecipante al fuso orario del suo dispositivo.
      </p>
      <p>
        Quando l&apos;adattamento al fuso orario del partecipante è attivo, una notifica alle 20:00 si
        attiva alle 20:00 a Berlino per un partecipante berlinese e alle 20:00 a Tokyo per un
        partecipante tokyota — ciascuno alla propria sera locale. Il fuso orario del dispositivo
        viene registrato all&apos;iscrizione e può essere aggiornato dal partecipante dalle impostazioni
        dell&apos;app.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Partecipanti futuri</h2>
      <p>
        La sezione <strong>Destinatari</strong> del modulo consente di scegliere tra i soli
        partecipanti attuali o anche tutti i partecipanti futuri. Quando è selezionato{' '}
        <em>Tutti i partecipanti futuri</em>, Samply applica automaticamente la pianificazione
        personalizzata a ogni nuova iscrizione — nessuna azione manuale richiesta.
      </p>
      <p>
        Questa è l&apos;impostazione da abilitare per gli studi con reclutamento aperto in cui i
        partecipanti aderiscono continuamente per settimane o mesi. Senza di essa, i partecipanti
        che aderiscono dopo la creazione della pianificazione non ricevono alcuna notifica da essa.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Configurazioni di esempio</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_IT.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Risultato: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Errori comuni</h3>
      <dl>
        <dt>Impostare una data di fine del calendario fissa invece di una relativa</dt>
        <dd>
          Se si imposta la fine su una data specifica nel passato, non vengono inviate notifiche
          a nessuno che si iscriva dopo quella data. Utilizzare una fine relativa (Giorno N)
          quando i partecipanti si iscrivono in giorni diversi.
        </dd>
        <dt>Dimenticare di selezionare i partecipanti futuri</dt>
        <dd>
          Una pianificazione personalizzata con solo i partecipanti attuali selezionati ignorerà
          silenziosamente chiunque si iscriva in seguito. Per gli studi con reclutamento aperto,
          selezionare sempre <em>Tutti i partecipanti futuri</em>.
        </dd>
        <dt>Il Giorno 1 ha un significato diverso nella propria analisi</dt>
        <dd>
          Samply conta il Giorno 1 come il giorno di iscrizione. Se il proprio protocollo definisce
          il Giorno 1 come il primo giorno di calendario completo dopo l&apos;iscrizione, impostare
          l&apos;inizio al Giorno 2 nel modulo.
        </dd>
      </dl>

      <h3>Cosa leggere successivamente</h3>
      <p>
        Una volta salvata una pianificazione, Samply la espande in una coda di invii per partecipante.
        Vedere <a href="/docs/queue">La coda pianificata</a> per capire come leggerla e gestirla.
      </p>
    </>
  );
}

function PersonalContentEs() {
  return (
    <>
      <p>
        Un calendario personal no se activa en una fecha fija del calendario. En cambio, se activa
        en relación al momento en que cada participante se unió a su estudio. Dos participantes que
        se inscriben con una semana de diferencia recibirán cada uno su notificación del Día 1 en
        su propio Día 1 — no el mismo lunes.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>Qué significa el Día N</h2>
      <p>
        Cuando configura un calendario personal, especifica un inicio y un fin en términos de{' '}
        <em>días tras el registro</em>, no de fechas del calendario. Samply traduce ese desfase
        en una marca de tiempo real para cada participante individualmente en el momento en que
        se registra.
      </p>

      <table>
        <thead>
          <tr>
            <th>Etiqueta del día</th>
            <th>Punto de anclaje real</th>
            <th>Nota práctica</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_ES.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        El patrón de repetición elegido (diario, días de la semana específicos, cada dos días)
        se ejecuta entre esas dos marcas de tiempo ancladas. Samply expande el calendario según
        la ventana personal de cada participante y escribe una entrada en la cola para cada hora
        de activación.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Crear un calendario personal en el formulario</h2>
      <p>
        Los calendarios personales usan el mismo formulario que todos los demás tipos. Las
        secciones que difieren de un calendario periódico estándar son el Paso 6 (Inicio) y
        el Paso 7 (Fin).
      </p>

      <h3>Paso 6 — Cuándo comenzar</h3>
      <p>Elija una de las dos opciones de inicio relativo:</p>
      <dl>
        <dt>El Día N tras el registro</dt>
        <dd>
          Samply cuenta N días calendario desde la fecha de registro y envía la primera
          notificación a medianoche de ese día. Establezca <em>N = 1</em> para comenzar
          inmediatamente tras el registro; establezca <em>N = 3</em> para dejar un margen
          de dos días antes de que comience el calendario.
        </dd>
        <dt>Después de X días / horas / minutos tras el registro</dt>
        <dd>
          Un desfase de duración exacta desde la marca de tiempo del registro. Use esta opción
          cuando necesite precisión inferior al día — por ejemplo, comenzar 4 horas después
          del registro en lugar de esperar a la siguiente medianoche.
        </dd>
      </dl>
      <p>
        También puede elegir una fecha fija del calendario como inicio, lo que hace el calendario
        híbrido: aún usa el punto de anclaje de fin personal, pero el inicio es idéntico para todos.
      </p>

      <h3>Paso 7 — Cuándo detenerse</h3>
      <p>
        Se aplican las mismas dos opciones: detenerse el Día N tras el registro, o detenerse
        después de una duración precisa. El fin es exclusivo — un calendario configurado para
        detenerse el Día 15 envía su última notificación al final del Día 14.
      </p>

      <h3>Paso 2 — El intervalo de repetición</h3>
      <p>
        Dentro de la ventana personal, elija un patrón de repetición: todos los días, días de la
        semana específicos, cada dos días, etc. También puede añadir varios intervalos al mismo
        calendario — por ejemplo, tres líneas de hora separadas (09:00, 13:00, 18:00) para
        enviar tres notificaciones al día.
      </p>
      <p>
        Para enviar a horas aleatorias dentro de ventanas diarias en lugar de horas fijas,
        seleccione <strong>Ventana de tiempo</strong> en lugar de horas específicas. Esto hace
        el calendario tanto personal como aleatorio. Consulte{' '}
        <a href="/docs/types#randomized">Calendarios aleatorios</a>{' '}
        para los controles de ventana.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Gestión de la zona horaria</h2>
      <p>
        Por defecto, todas las horas de un calendario personal se interpretan en la zona horaria
        que usted selecciona en la parte superior del formulario. Active{' '}
        <strong>Ajustar a la zona horaria del participante</strong> para que Samply reancle las
        horas de cada participante a la zona horaria de su dispositivo.
      </p>
      <p>
        Cuando el ajuste a la zona horaria del participante está activo, una notificación a las
        20:00 se activa a las 20:00 en Berlín para un participante berlinés y a las 20:00 en
        Tokio para un participante tokiota — cada uno a su propia tarde local. La zona horaria
        del dispositivo se registra durante el registro y el participante puede actualizarla
        desde la configuración de la aplicación.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Participantes futuros</h2>
      <p>
        La sección <strong>Destinatarios</strong> del formulario le permite elegir entre los
        participantes actuales únicamente o también todos los participantes futuros. Cuando se
        marca{' '}
        <em>Todos los participantes futuros</em>, Samply aplica automáticamente el calendario
        personal a cada nuevo registro — no se requiere ninguna acción manual.
      </p>
      <p>
        Esta es la configuración que debe activar para estudios con reclutamiento abierto donde
        los participantes se unen continuamente durante semanas o meses. Sin ella, los
        participantes que se unan después de la creación del calendario no recibirán ninguna
        notificación del mismo.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Configuraciones de ejemplo</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_ES.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Resultado: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Errores frecuentes</h3>
      <dl>
        <dt>Establecer una fecha de fin fija del calendario en lugar de una relativa</dt>
        <dd>
          Si establece el fin en una fecha específica en el pasado, no se enviarán notificaciones
          a nadie que se registre después de esa fecha. Use un fin relativo (Día N) cuando los
          participantes se unan en días distintos.
        </dd>
        <dt>Olvidar marcar los participantes futuros</dt>
        <dd>
          Un calendario personal con solo los participantes actuales seleccionados ignorará
          silenciosamente a cualquiera que se una más tarde. Para estudios con reclutamiento
          abierto, marque siempre <em>Todos los participantes futuros</em>.
        </dd>
        <dt>El Día 1 tiene un significado diferente en su análisis</dt>
        <dd>
          Samply cuenta el Día 1 como el día de registro. Si su protocolo define el Día 1 como
          el primer día calendario completo tras el registro, establezca su inicio en el Día 2
          en el formulario.
        </dd>
      </dl>

      <h3>Qué leer a continuación</h3>
      <p>
        Una vez guardado un calendario, Samply lo expande en una cola de envíos por participante.
        Consulte <a href="/docs/queue">La cola programada</a> para entender cómo leerla y gestionarla.
      </p>
    </>
  );
}

const DAY_ROWS_PT = [
  { day: 'Dia 1', anchor: 'O momento do registro (mais ~1 minuto).', note: 'As notificações definidas para o Dia 1 disparam quase imediatamente após o registro.' },
  { day: 'Dia 2', anchor: 'Meia-noite do próximo dia calendário no fuso horário escolhido.', note: 'Um participante que se registra às 21h00 de uma segunda-feira recebe suas notificações do Dia 2 na terça-feira.' },
  { day: 'Dia N', anchor: 'Meia-noite do N-ésimo dia calendário após a data de registro.', note: 'Dia 14 = meia-noite do 14º dia contado a partir do dia de registro.' },
];

const EXAMPLES_PT = [
  {
    title: 'Estudo de diário de 14 dias',
    config: [
      'Início: Dia 1 após o registro.',
      'Fim: Dia 15 após o registro (fim do Dia 14).',
      'Intervalo: diário às 20:00.',
      'Destinatários: todos os participantes atuais e futuros.',
    ],
    result: 'Cada participante recebe 14 notificações vespertinas, a partir do dia de seu registro, independentemente de quando os outros se registraram.',
  },
  {
    title: 'Protocolo em rajada — apenas semanas 1 e 3',
    config: [
      'Calendário A — Início: Dia 1, Fim: Dia 8. Intervalo: diário às 12:00.',
      'Calendário B — Início: Dia 15, Fim: Dia 22. Intervalo: diário às 12:00.',
      'Ambos os calendários apontam para os mesmos participantes.',
    ],
    result: 'Dois calendários pessoais independentes cobrem duas semanas distintas. A semana de silêncio intermediária não requer nenhum calendário.',
  },
  {
    title: 'Estudo de intervenção — fase ativa a partir do Dia 3',
    config: [
      'Início: Dia 3 após o registro.',
      'Fim: Dia 10 após o registro.',
      'Intervalo: três vezes ao dia (09:00, 13:00, 18:00) — adicionar três intervalos separados.',
    ],
    result: 'Os participantes realizam uma linha de base de dois dias (Dias 1–2) antes de as notificações de intervenção começarem no Dia 3.',
  },
];

function PersonalContentPt() {
  return (
    <>
      <p>
        Um calendário pessoal não dispara em uma data fixa do calendário. Em vez disso, ele dispara
        em relação ao momento em que cada participante entrou no seu estudo. Dois participantes que
        se inscrevem com uma semana de diferença receberão cada um sua notificação do Dia 1 no
        seu próprio Dia 1 — não na mesma segunda-feira.
      </p>

      {/* ── The mental model ─────────────────────────────────────────────── */}
      <h2>O que significa o Dia N</h2>
      <p>
        Quando você configura um calendário pessoal, especifica um início e um fim em termos de{' '}
        <em>dias após o registro</em>, não de datas do calendário. O Samply traduz esse deslocamento
        em um carimbo de data/hora real para cada participante individualmente no momento em que
        ele se registra.
      </p>

      <table>
        <thead>
          <tr>
            <th>Rótulo do dia</th>
            <th>Ponto de ancoragem real</th>
            <th>Nota prática</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ROWS_PT.map((r) => (
            <tr key={r.day}>
              <td>{r.day}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.anchor}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        O padrão de repetição escolhido (diário, dias de semana específicos, a cada dois dias)
        é executado entre esses dois carimbos de data/hora ancorados. O Samply expande o calendário
        de acordo com a janela pessoal de cada participante e grava uma entrada na fila para cada
        horário de disparo.
      </p>

      {/* ── Form walkthrough ──────────────────────────────────────────────── */}
      <h2>Criar um calendário pessoal no formulário</h2>
      <p>
        Os calendários pessoais usam o mesmo formulário que todos os outros tipos. As
        seções que diferem de um calendário periódico padrão são o Passo 6 (Início) e
        o Passo 7 (Fim).
      </p>

      <h3>Passo 6 — Quando começar</h3>
      <p>Escolha uma das duas opções de início relativo:</p>
      <dl>
        <dt>O Dia N após o registro</dt>
        <dd>
          O Samply conta N dias calendário a partir da data de registro e envia a primeira
          notificação à meia-noite desse dia. Defina <em>N = 1</em> para começar
          imediatamente após o registro; defina <em>N = 3</em> para deixar uma margem
          de dois dias antes de o calendário começar.
        </dd>
        <dt>Após X dias / horas / minutos do registro</dt>
        <dd>
          Um deslocamento de duração exata a partir do carimbo de data/hora do registro. Use esta opção
          quando precisar de precisão inferior ao dia — por exemplo, começar 4 horas após
          o registro em vez de aguardar a próxima meia-noite.
        </dd>
      </dl>
      <p>
        Você também pode escolher uma data fixa do calendário como início, o que torna o calendário
        híbrido: ainda usa o ponto de ancoragem de fim pessoal, mas o início é idêntico para todos.
      </p>

      <h3>Passo 7 — Quando parar</h3>
      <p>
        As mesmas duas opções se aplicam: parar no Dia N após o registro, ou parar
        após uma duração precisa. O fim é exclusivo — um calendário configurado para
        parar no Dia 15 envia sua última notificação ao final do Dia 14.
      </p>

      <h3>Passo 2 — O intervalo de repetição</h3>
      <p>
        Dentro da janela pessoal, escolha um padrão de repetição: todos os dias, dias de
        semana específicos, a cada dois dias, etc. Você também pode adicionar vários intervalos ao mesmo
        calendário — por exemplo, três linhas de horário separadas (09:00, 13:00, 18:00) para
        enviar três notificações por dia.
      </p>
      <p>
        Para enviar em horários aleatórios dentro de janelas diárias em vez de horários fixos,
        selecione <strong>Janela de tempo</strong> em vez de horários específicos. Isso torna
        o calendário ao mesmo tempo pessoal e aleatório. Consulte{' '}
        <a href="/docs/types#randomized">Calendários aleatórios</a>{' '}
        para os controles de janela.
      </p>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2>Gestão do fuso horário</h2>
      <p>
        Por padrão, todos os horários de um calendário pessoal são interpretados no fuso horário
        que você seleciona na parte superior do formulário. Ative{' '}
        <strong>Ajustar ao fuso horário do participante</strong> para que o Samply reancle os
        horários de cada participante ao fuso horário do seu dispositivo.
      </p>
      <p>
        Quando o ajuste ao fuso horário do participante está ativo, uma notificação às
        20:00 dispara às 20:00 em Berlim para um participante berlinense e às 20:00 em
        Tóquio para um participante de Tóquio — cada um na sua própria tarde local. O fuso horário
        do dispositivo é registrado durante o registro e o participante pode atualizá-lo
        nas configurações do aplicativo.
      </p>

      {/* ── Future participants ───────────────────────────────────────────── */}
      <h2>Participantes futuros</h2>
      <p>
        A seção <strong>Destinatários</strong> do formulário permite que você escolha entre os
        participantes atuais apenas ou também todos os participantes futuros. Quando{' '}
        <em>Todos os participantes futuros</em> está marcado, o Samply aplica automaticamente o calendário
        pessoal a cada novo registro — nenhuma ação manual é necessária.
      </p>
      <p>
        Esta é a configuração a ativar para estudos com recrutamento aberto onde
        os participantes entram continuamente ao longo de semanas ou meses. Sem ela, os
        participantes que entrarem após a criação do calendário não receberão nenhuma
        notificação dele.
      </p>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <h2>Configurações de exemplo</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 4rem' }}>
        {EXAMPLES_PT.map((ex) => (
          <div
            key={ex.title}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{ex.title}</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.6rem' }}>
              {ex.config.map((c, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
              Resultado: {ex.result}
            </div>
          </div>
        ))}
      </div>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Erros frequentes</h3>
      <dl>
        <dt>Definir uma data de fim fixa do calendário em vez de uma relativa</dt>
        <dd>
          Se você definir o fim em uma data específica no passado, não serão enviadas notificações
          a ninguém que se registre após essa data. Use um fim relativo (Dia N) quando os
          participantes entrarem em dias diferentes.
        </dd>
        <dt>Esquecer de marcar os participantes futuros</dt>
        <dd>
          Um calendário pessoal com apenas os participantes atuais selecionados ignorará
          silenciosamente qualquer pessoa que entre mais tarde. Para estudos com recrutamento
          aberto, marque sempre <em>Todos os participantes futuros</em>.
        </dd>
        <dt>O Dia 1 tem um significado diferente na sua análise</dt>
        <dd>
          O Samply conta o Dia 1 como o dia do registro. Se o seu protocolo define
          o Dia 1 como o primeiro dia calendário completo após o registro, defina seu início no Dia 2
          no formulário.
        </dd>
      </dl>

      <h3>O que ler a seguir</h3>
      <p>
        Depois de salvar um calendário, o Samply o expande em uma fila de envios por participante.
        Consulte <a href="/docs/queue">A fila agendada</a> para entender como lê-la e gerenciá-la.
      </p>
    </>
  );
}
