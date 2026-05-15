import type { Locale } from "@/lib/i18n";

const SECTIONS_EN = [
  { id: 'content',    label: 'Content',     summary: 'Title, message, and survey URL.' },
  { id: 'timezone',  label: '1. Timezone',  summary: 'Which clock to use, and whether to follow each participant.' },
  { id: 'audience',  label: '2. Participants', summary: 'Who receives this schedule.' },
  { id: 'time',      label: '3. Time',      summary: 'Fixed clock times, random windows, or a minute-level repeat.' },
  { id: 'date',      label: '4. Date',      summary: 'One specific date, or a recurring day pattern.' },
  { id: 'month',     label: '5. Month',     summary: 'Limit recurring sends to certain months. Repeating only.' },
  { id: 'start',     label: '6. Start',     summary: 'When the repeating schedule begins. Repeating only.' },
  { id: 'stop',      label: '7. Stop',      summary: 'When the repeating schedule ends. Repeating only.' },
  { id: 'expiry',    label: '8. Expiry',    summary: 'How long the survey link stays live after delivery.' },
  { id: 'reminders', label: '9. Reminders', summary: 'Follow-up pings if no completion is detected.' },
];

const SECTIONS_DE = [
  { id: 'content',    label: 'Inhalt',           summary: 'Titel, Nachricht und Befragungs-URL.' },
  { id: 'timezone',  label: '1. Zeitzone',        summary: 'Welche Uhr verwendet wird und ob dem Zeitplan jeder teilnehmenden Person gefolgt wird.' },
  { id: 'audience',  label: '2. Teilnehmende',    summary: 'Wer diesen Zeitplan erhält.' },
  { id: 'time',      label: '3. Uhrzeit',         summary: 'Feste Uhrzeiten, zufällige Zeitfenster oder eine minutengenaue Wiederholung.' },
  { id: 'date',      label: '4. Datum',           summary: 'Ein bestimmtes Datum oder ein wiederkehrendes Tagesmuster.' },
  { id: 'month',     label: '5. Monat',           summary: 'Wiederkehrende Sendungen auf bestimmte Monate beschränken. Nur Wiederkehrend.' },
  { id: 'start',     label: '6. Start',           summary: 'Wann der wiederkehrende Zeitplan beginnt. Nur Wiederkehrend.' },
  { id: 'stop',      label: '7. Ende',            summary: 'Wann der wiederkehrende Zeitplan endet. Nur Wiederkehrend.' },
  { id: 'expiry',    label: '8. Ablauf',          summary: 'Wie lange der Befragungslink nach der Zustellung aktiv bleibt.' },
  { id: 'reminders', label: '9. Erinnerungen',    summary: 'Folgebenachrichtigungen, wenn kein Abschluss erkannt wird.' },
];

const TYPE_MATRIX_EN = [
  { time: 'Specific time point(s)', date: 'Specific date(s)',           type: 'One-time',          link: '/docs/types#one-time' },
  { time: 'Specific time point(s)', date: 'Repeat every N days / weekdays / month days', type: 'Repeating', link: '/docs/types#repeating' },
  { time: 'Specific time point(s)', date: 'Repeat + start/stop relative to registration', type: 'Personal', link: '/docs/personal' },
  { time: 'Time window',            date: 'Specific date(s)',           type: 'One-time randomized', link: '/docs/types#randomized' },
  { time: 'Time window',            date: 'Repeat + start/stop relative to registration', type: 'Personal randomized', link: '/docs/types#randomized' },
];

const TYPE_MATRIX_DE = [
  { time: 'Bestimmter Zeitpunkt(e)', date: 'Bestimmtes Datum (Daten)',           type: 'Einmalig',          link: '/docs/types#one-time' },
  { time: 'Bestimmter Zeitpunkt(e)', date: 'Jeden N-ten Tag / Wochentage / Monatstage wiederholen', type: 'Wiederkehrend', link: '/docs/types#repeating' },
  { time: 'Bestimmter Zeitpunkt(e)', date: 'Wiederholen + Start/Ende relativ zur Registrierung', type: 'Persönlich', link: '/docs/personal' },
  { time: 'Zeitfenster',             date: 'Bestimmtes Datum (Daten)',           type: 'Einmalig zufällig', link: '/docs/types#randomized' },
  { time: 'Zeitfenster',             date: 'Wiederholen + Start/Ende relativ zur Registrierung', type: 'Persönlich zufällig', link: '/docs/types#randomized' },
];

const SECTIONS_RU = [
  { id: 'content',    label: 'Содержание',      summary: 'Заголовок, текст и URL опроса.' },
  { id: 'timezone',  label: '1. Часовой пояс',  summary: 'Какие часы использовать и следовать ли часовому поясу каждого участника.' },
  { id: 'audience',  label: '2. Участники',      summary: 'Кто получает это расписание.' },
  { id: 'time',      label: '3. Время',          summary: 'Фиксированное время, случайные окна или повтор с минутным интервалом.' },
  { id: 'date',      label: '4. Дата',           summary: 'Конкретная дата или повторяющийся шаблон дней.' },
  { id: 'month',     label: '5. Месяц',          summary: 'Ограничить повторяющиеся отправки определёнными месяцами. Только для повторяющихся расписаний.' },
  { id: 'start',     label: '6. Начало',         summary: 'Когда начинается повторяющееся расписание. Только для повторяющихся расписаний.' },
  { id: 'stop',      label: '7. Конец',          summary: 'Когда заканчивается повторяющееся расписание. Только для повторяющихся расписаний.' },
  { id: 'expiry',    label: '8. Срок действия',  summary: 'Как долго ссылка на опрос остаётся активной после доставки.' },
  { id: 'reminders', label: '9. Напоминания',    summary: 'Повторные сигналы, если завершение не зафиксировано.' },
];

const TYPE_MATRIX_RU = [
  { time: 'Конкретное(ые) время', date: 'Конкретная(ые) дата(ы)',                                      type: 'Однократное',                   link: '/docs/types#one-time' },
  { time: 'Конкретное(ые) время', date: 'Повтор каждые N дней / по дням недели / по дням месяца',       type: 'Повторяющееся',                  link: '/docs/types#repeating' },
  { time: 'Конкретное(ые) время', date: 'Повтор + начало/конец относительно регистрации',               type: 'Персональное',                   link: '/docs/personal' },
  { time: 'Временное окно',       date: 'Конкретная(ые) дата(ы)',                                      type: 'Однократное случайное',           link: '/docs/types#randomized' },
  { time: 'Временное окно',       date: 'Повтор + начало/конец относительно регистрации',               type: 'Персональное случайное',          link: '/docs/types#randomized' },
];

const SECTIONS_ZH = [
  { id: 'content',    label: '内容',           summary: '标题、消息和问卷 URL。' },
  { id: 'timezone',  label: '1. 时区',          summary: '使用哪个时钟，以及是否跟随每位参与者的时区。' },
  { id: 'audience',  label: '2. 参与者',         summary: '谁接收此计划。' },
  { id: 'time',      label: '3. 时间',           summary: '固定时间点、随机时间窗口或分钟级重复。' },
  { id: 'date',      label: '4. 日期',           summary: '特定日期或重复的日期模式。' },
  { id: 'month',     label: '5. 月份',           summary: '将重复发送限制在特定月份。仅限重复计划。' },
  { id: 'start',     label: '6. 开始',           summary: '重复计划的开始时间。仅限重复计划。' },
  { id: 'stop',      label: '7. 结束',           summary: '重复计划的结束时间。仅限重复计划。' },
  { id: 'expiry',    label: '8. 过期',           summary: '问卷链接在送达后保持有效的时长。' },
  { id: 'reminders', label: '9. 提醒',           summary: '未检测到完成时的后续通知。' },
];

const TYPE_MATRIX_ZH = [
  { time: '特定时间点', date: '特定日期',                                          type: '一次性',              link: '/docs/types#one-time' },
  { time: '特定时间点', date: '每隔 N 天 / 按星期 / 按月中日期重复',                type: '重复',                link: '/docs/types#repeating' },
  { time: '特定时间点', date: '重复 + 相对于注册的开始/结束',                        type: '个人化',              link: '/docs/personal' },
  { time: '时间窗口',   date: '特定日期',                                          type: '一次性随机',           link: '/docs/types#randomized' },
  { time: '时间窗口',   date: '重复 + 相对于注册的开始/结束',                        type: '个人化随机',           link: '/docs/types#randomized' },
];

const SECTIONS_NL = [
  { id: 'content',    label: 'Inhoud',           summary: 'Titel, bericht en enquête-URL.' },
  { id: 'timezone',  label: '1. Tijdzone',        summary: 'Welke klok te gebruiken en of u de tijdzone van elke deelnemer volgt.' },
  { id: 'audience',  label: '2. Deelnemers',      summary: 'Wie dit schema ontvangt.' },
  { id: 'time',      label: '3. Tijd',            summary: 'Vaste tijdstippen, willekeurige vensters of een herhaling op minuteniveau.' },
  { id: 'date',      label: '4. Datum',           summary: 'Één specifieke datum of een terugkerend dagpatroon.' },
  { id: 'month',     label: '5. Maand',           summary: 'Beperk herhalende verzendingen tot bepaalde maanden. Alleen herhalend.' },
  { id: 'start',     label: '6. Start',           summary: 'Wanneer het herhalende schema begint. Alleen herhalend.' },
  { id: 'stop',      label: '7. Stop',            summary: 'Wanneer het herhalende schema eindigt. Alleen herhalend.' },
  { id: 'expiry',    label: '8. Vervaldatum',     summary: 'Hoe lang de enquêtelink actief blijft na aflevering.' },
  { id: 'reminders', label: '9. Herinneringen',   summary: 'Vervolgmeldingen als er geen voltooiing is gedetecteerd.' },
];

const TYPE_MATRIX_NL = [
  { time: 'Specifiek tijdstip(pen)', date: 'Specifieke datum(s)',                                      type: 'Eenmalig',                link: '/docs/types#one-time' },
  { time: 'Specifiek tijdstip(pen)', date: 'Herhaal elke N dagen / weekdagen / maanddagen',            type: 'Herhalend',               link: '/docs/types#repeating' },
  { time: 'Specifiek tijdstip(pen)', date: 'Herhaal + start/stop relatief aan registratie',            type: 'Persoonlijk',             link: '/docs/personal' },
  { time: 'Tijdvenster',             date: 'Specifieke datum(s)',                                      type: 'Eenmalig willekeurig',    link: '/docs/types#randomized' },
  { time: 'Tijdvenster',             date: 'Herhaal + start/stop relatief aan registratie',            type: 'Persoonlijk willekeurig', link: '/docs/types#randomized' },
];

export default function FormContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <FormContentDe />;
  if (locale === "nl") return <FormContentNl />;
  if (locale === "ru") return <FormContentRu />;
  if (locale === "zh") return <FormContentZh />;
  if (locale === "ko") return <FormContentKo />;
  if (locale === "it") return <FormContentIt />;
  if (locale === "fr") return <FormContentFr />;
  if (locale === "es") return <FormContentEs />;
  if (locale === "pt") return <FormContentPt />;
  return <FormContentEn />;
}

function FormContentZh() {
  return (
    <>
      <p>
        所有四种计划类型都在同一表单中创建。各部分的顺序是固定的：您始终从上到下填写。
        大多数部分只有在您在第 4 步做出选择后才会变得相关——表单会自动隐藏不相关的部分。
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_ZH.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_ZH.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>内容</h2>
      <p>
        这三个字段出现在表单顶部，在编号步骤之前，适用于此计划生成的每次发送。
      </p>
      <dl>
        <dt>标题</dt>
        <dd>
          参与者设备上推送通知的粗体第一行。拥有相同标题的通知在系统托盘中相互替换，而非堆叠。
          如果您希望每次只有一条通知可见，请为每项研究使用一致的标题；
          如果您希望它们同时存在，请使用不同的标题。
        </dd>
        <dt>消息</dt>
        <dd>通知正文——系统托盘中显示的第二行。</dd>
        <dt>网络链接</dt>
        <dd>
          参与者点击通知时打开的 URL。这通常是您的 Qualtrics、REDCap 或其他问卷链接。
          如果您只需要没有操作的通知，请省略 URL。参见{' '}
          <a href='/docs/placeholders'>URL 占位符</a>以自动嵌入参与者特定的值，如 ID。
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>第 1 步 — 时区</h2>
      <p>
        您在第 3、6 和 7 步输入的所有时间都在此时区中解释。
        选择您的研究所在的时区——通常是您的研究团队所在地。
      </p>
      <p>
        <strong>调整为参与者时区</strong>会为每位参与者单独覆盖研究时区。启用后，
        20:00 的发送会在每位参与者设备时区的 20:00 触发，而非研究时区的 20:00。
        只要 Samply 应用已记录其时区，这对当前和未来的参与者都有效。
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>第 2 步 — 参与者</h2>
      <p>选择谁接收来自此计划的通知。您可以混合选项。</p>
      <dl>
        <dt>所有未来参与者（不含当前参与者）</dt>
        <dd>
          保存此计划后的每次新注册都会自动加入其中。对于开放招募的研究至关重要。
          创建计划时已注册的参与者仅靠此选项<em>不会</em>被包含在内。
        </dd>
        <dt>当前参与者——所有人</dt>
        <dd>在您点击"计划通知"时已注册的所有人。</dd>
        <dt>当前参与者——特定个人</dt>
        <dd>从已注册的 Samply ID 列表中选择。用于一次性发送或测试。</dd>
        <dt>组</dt>
        <dd>
          针对一个或多个命名组。您可以选择所有组或挑选特定组。
          有关组的创建方式，请参阅 <a href='/docs/groups'>组</a>。
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>第 3 步 — 时间</h2>
      <p>
        这是表单中最重要的选择。它决定发送时间是固定的、随机的，还是设置为非常短的重复周期。
      </p>

      <h3>特定时间点</h3>
      <p>
        输入一个或多个 HH:MM 时间。每个时间在每个触发日都会成为一次单独的发送。
        点击<strong>添加更多时间点</strong>以添加更多时间——例如 09:00、13:00 和 18:00，每天三次发送。
      </p>

      <h3>时间窗口</h3>
      <p>
        定义一个具有开始时间、结束时间、窗口内随机发送次数以及它们之间最小间隔的窗口。
        Samply 在每个触发日为每位参与者在该窗口内选择不同的随机时间。
      </p>
      <p>
        点击<strong>添加更多时间窗口</strong>以每天定义多个窗口
        （例如上午 08:00–11:00 和下午 14:00–17:00，每个各两次提示）。
      </p>

      <h3>重复（高频）</h3>
      <p>
        以非常短的周期触发：每分钟、每 2、5、10、15 或 30 分钟一次。
        适用于实验室会话内的实时提醒，而非日常 ESM 方案。
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>第 4 步 — 日期</h2>
      <p>
        与您在第 3 步的选择相结合，这决定了计划类型。选择特定日期会生成一次性（或随机一次性）计划。
        选择任何重复选项会显示开始和结束步骤，并生成重复或个人化计划。
      </p>

      <dl>
        <dt>特定日期</dt>
        <dd>
          选择一个日历天、月份和年份。通知会在该确切日期的第 3 步时间触发。
          添加更多日期以创建多波次一次性计划。
        </dd>
        <dt>每隔 N 天重复</dt>
        <dd>
          每天（N = 1）、每隔一天（N = 2）、每隔两天（N = 3），以此类推。
        </dd>
        <dt>在特定星期几重复</dt>
        <dd>选择周一至周日的任意组合。</dd>
        <dt>在每月特定日期重复</dt>
        <dd>选择 1 日至 31 日的任意组合。</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>第 3 步 + 第 4 步 = 计划类型</h3>
      <table>
        <thead>
          <tr>
            <th>第 3 步 — 时间</th>
            <th>第 4 步 — 日期</th>
            <th>结果类型</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_ZH.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>第 5 步 — 月份</h2>
      <p>
        仅在第 4 步为重复选项时可见。将计划限制在特定日历月份。
        <strong>每月重复</strong>（默认值）让它全年运行。
        选择特定月份适用于季节性方案或在夏季和冬季暂停的研究。
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>第 6 步 — 何时开始</h2>
      <p>
        仅在第 4 步为重复选项时可见。设置计划开始生成发送的日期。三个选项：
      </p>
      <dl>
        <dt>在特定日期和时间开始</dt>
        <dd>
          计划在同一绝对时刻对所有参与者开始。当您的研究有固定启动日期时使用此选项。
        </dd>
        <dt>在注册后 X 天/小时/分钟开始（或从现在起）</dt>
        <dd>
          添加到每位参与者加入时间戳的确切时长。计划窗口对每位参与者在不同的时钟时间开始。
          选择<em>现在</em>作为参考点时，锚定到您点击"计划通知"的时刻，而非注册时间。
        </dd>
        <dt>在注册后第 N 天开始（或从现在起）</dt>
        <dd>
          Samply 从加入日期起计算 N 个日历天，并在该天午夜启动计划。
          第 1 天 = 加入当天。第 2 天 = 下一个日历午夜。
          完整详情请参阅 <a href='/docs/personal'>个人化计划</a>。
        </dd>
      </dl>

      <h2 id='stop'>第 7 步 — 何时结束</h2>
      <p>
        与开始相同的三个选项。结束是排他性的：在第 14 天结束时停止的计划在第 14 天内发出最后一次发送，而非第 15 天开始时。
      </p>
      <p>
        如果您将结束时间设置为已经过去的日历日期，计划将不会生成任何发送。
        对于滚动注册的研究，请始终使用相对结束（第 N 天或时长偏移），
        以便晚加入者获得完整的方案窗口。
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>第 8 步 — 链接过期</h2>
      <p>
        控制通知中的问卷链接在推送送达后保持有效的时长。
        如果参与者在过期窗口后点击通知，链接将不再打开问卷。
      </p>
      <p>
        当您的问卷必须在紧凑的时间窗口内完成时设置过期——例如，在即时评估中，
        过期的响应会影响数据。对于没有时间压力的问卷，保持未设置（默认值）。
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>第 9 步 — 提醒</h2>
      <p>
        提醒是当 Samply 未检测到问卷完成时自动发送的后续通知。您可以为每个计划添加一条或多条提醒，
        每条都有自己的标题、消息和延迟（原始通知后的天 + 小时 + 分钟）。
      </p>
      <p>
        为使提醒正常工作，您的问卷工具必须在参与者完成问卷时通知 Samply——
        否则无论实际完成情况如何，每次发送都会收到提醒。
        完整设置说明请参阅 <a href='/docs/reminders'>提醒</a>。
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>提交</h2>
      <p>
        点击表单底部的<strong>计划通知</strong>。Samply 会立即将计划扩展为发送队列——
        每位参与者每个发送时间一行——并在后台任务运行器中安排每一个。
        您可以在 <a href='/docs/queue'>计划队列</a>中查看完整队列。
      </p>
      <p>
        计划在提交后无法编辑。要更改时间或内容，请删除计划并创建新计划。
        删除计划也会从队列中移除其所有待处理的发送。
      </p>
    </>
  );
}

function FormContentEn() {
  return (
    <>
      <p>
        All four schedule types are created in the same form. The section order is fixed: you
        always move top to bottom. Most sections only become relevant once you make a choice in
        Step 4 — the form hides irrelevant sections automatically.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_EN.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_EN.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Content</h2>
      <p>
        These three fields appear at the top of the form, before the numbered steps, and apply
        to every send this schedule generates.
      </p>
      <dl>
        <dt>Title</dt>
        <dd>
          The bold first line of the push notification on the participant device. Notifications
          that share the same title replace each other in the system tray rather than stacking.
          Use a consistent title per study if you want only one notification visible at a time,
          or use distinct titles if you want them to coexist.
        </dd>
        <dt>Message</dt>
        <dd>The notification body — the second line visible in the system tray.</dd>
        <dt>Web Link</dt>
        <dd>
          The URL that opens when the participant taps the notification. This is typically your
          Qualtrics, REDCap, or other survey link. Leave out the URL only if you want a
          notification with no action. See <a href='/docs/placeholders'>URL placeholders</a> to
          embed participant-specific values like IDs automatically.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Step 1 — Timezone</h2>
      <p>
        All times you enter in Steps 3, 6, and 7 are interpreted in this timezone. Pick the
        timezone your study is running in — typically where your research group is located.
      </p>
      <p>
        <strong>Adjust to participant timezone</strong> overrides the study timezone for each
        participant individually. When enabled, a 20:00 send fires at 20:00 in each
        participant device timezone rather than at 20:00 in the study timezone. This works for
        both current and future participants as long as the Samply app has recorded their
        timezone.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Step 2 — Participants</h2>
      <p>Choose who receives notifications from this schedule. You can mix options.</p>
      <dl>
        <dt>All future participants (excluding current)</dt>
        <dd>
          Every new enrolment after this schedule is saved will be enrolled into it
          automatically. Essential for open-recruitment studies. Participants who are already
          enrolled when you create the schedule are <em>not</em> included by this option alone.
        </dd>
        <dt>Current participants — All</dt>
        <dd>Everyone enrolled at the moment you click Schedule notifications.</dd>
        <dt>Current participants — specific individuals</dt>
        <dd>Pick from the list of enrolled Samply IDs. Use this for one-off sends or testing.</dd>
        <dt>Groups</dt>
        <dd>
          Target one or more named groups. You can choose all groups or pick specific ones.
          See <a href='/docs/groups'>Groups</a> for how groups are created.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Step 3 — Time</h2>
      <p>
        This is the most consequential choice in the form. It determines whether send times are
        fixed, random, or set to a very short repeat cadence.
      </p>

      <h3>Specific time point(s)</h3>
      <p>
        Enter one or more HH:MM times. Each time becomes a separate send within every firing
        day. Click <strong>Add one more time point</strong> to add additional times — for
        example, 09:00, 13:00, and 18:00 for three sends per day.
      </p>

      <h3>Time window</h3>
      <p>
        Define a window with a From time, a To time, how many random sends to draw within the
        window, and a minimum gap between them. Samply picks a different random time for each
        participant within that window on each firing day.
      </p>
      <p>
        Click <strong>Add one more time window</strong> to define multiple windows per day
        (e.g., morning 08:00–11:00 and afternoon 14:00–17:00, two pings each).
      </p>

      <h3>Repeat (high-frequency)</h3>
      <p>
        Fires on a very short cycle: every minute, every 2, 5, 10, 15, or 30 minutes. Intended
        for real-time alerting within a lab session, not for daily ESM protocols.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Step 4 — Date</h2>
      <p>
        Combined with your Step 3 choice, this determines the schedule type. Choosing a
        specific date produces a one-time (or randomized one-time) schedule. Choosing any
        repeat option reveals the Start and Stop steps and produces a repeating or personal
        schedule.
      </p>

      <dl>
        <dt>Specific date(s)</dt>
        <dd>
          Pick a calendar day, month, and year. The notification fires at the Step 3 time(s)
          on that exact date. Add more dates for a multi-wave one-time schedule.
        </dd>
        <dt>Repeat every N day(s)</dt>
        <dd>
          Every day (N = 1), every other day (N = 2), every third day (N = 3), and so on.
        </dd>
        <dt>Repeat on specific weekday(s)</dt>
        <dd>Choose any combination of Monday through Sunday.</dd>
        <dt>Repeat on specific day(s) of month</dt>
        <dd>Choose any combination of the 1st through the 31st.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Step 3 + Step 4 = schedule type</h3>
      <table>
        <thead>
          <tr>
            <th>Step 3 — Time</th>
            <th>Step 4 — Date</th>
            <th>Resulting type</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_EN.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Step 5 — Month</h2>
      <p>
        Only visible when Step 4 is a repeat option. Limits the schedule to specific calendar
        months. <strong>Repeat every month</strong> (the default) lets it run year-round.
        Choosing specific months is useful for seasonal protocols or studies that pause during
        summer and winter.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Step 6 — When to start</h2>
      <p>
        Only visible when Step 4 is a repeat option. Sets the date from which the schedule
        begins producing sends. Three options:
      </p>
      <dl>
        <dt>Start at a specific date and time</dt>
        <dd>
          The schedule starts at the same absolute moment for every participant. Use this when
          your study has a fixed launch date.
        </dd>
        <dt>Start after X days / hours / minutes from registration (or from now)</dt>
        <dd>
          An exact duration added to each participant join timestamp. The schedule window
          starts at a different wall-clock time for each participant. Choosing <em>now</em>{" "}
          as the reference anchors to the moment you click Schedule notifications rather than
          to enrolment.
        </dd>
        <dt>Start on day N after registration (or from now)</dt>
        <dd>
          Samply counts N calendar days from the join date and starts the schedule at midnight
          of that day. Day 1 = the join day itself. Day 2 = the next calendar midnight.
          See <a href='/docs/personal'>Personal scheduling</a> for full details.
        </dd>
      </dl>

      <h2 id='stop'>Step 7 — When to stop</h2>
      <p>
        Same three options as Start. The stop is exclusive: a schedule that stops at the end
        of Day 14 fires its last send during Day 14, not at the start of Day 15.
      </p>
      <p>
        If you leave the stop at a calendar date that is already in the past, the schedule
        generates no sends. For rolling-enrolment studies, always use a relative stop (Day N
        or duration offset) so that late joiners get their full protocol window.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Step 8 — Link expiry</h2>
      <p>
        Controls how long the survey link in the notification stays active after the push is
        delivered. If a participant taps the notification after the expiry window, the link no
        longer opens the survey.
      </p>
      <p>
        Set an expiry when your survey must be completed within a tight window — for example,
        in a momentary assessment where a stale response would bias the data. Leave it unset
        (the default) for surveys with no time pressure.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Step 9 — Reminders</h2>
      <p>
        Reminders are follow-up notifications sent automatically when Samply has not detected a
        survey completion. You can add one or more reminders per schedule, each with its own
        title, message, and delay (days + hours + minutes after the original notification).
      </p>
      <p>
        For reminders to work correctly, your survey tool must notify Samply when a participant
        completes the survey — otherwise every send gets a reminder regardless of actual
        completion. Full setup instructions are in <a href='/docs/reminders'>Reminders</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Submitting</h2>
      <p>
        Click <strong>Schedule notifications</strong> at the bottom of the form. Samply
        immediately expands the schedule into a queue of sends — one row per participant per
        send time — and schedules each one in the background job runner. You can review the
        full queue in the <a href='/docs/queue'>Scheduled queue</a>.
      </p>
      <p>
        A schedule cannot be edited after submission. To change timing or content, delete the
        schedule and create a new one. Deleting a schedule also removes all its pending sends
        from the queue.
      </p>
    </>
  );
}

function FormContentRu() {
  return (
    <>
      <p>
        Все четыре типа расписаний создаются в одной форме. Порядок разделов фиксирован:
        вы всегда двигаетесь сверху вниз. Большинство разделов становятся актуальными
        только после того, как вы сделаете выбор на шаге 4 — форма автоматически скрывает
        нерелевантные разделы.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_RU.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_RU.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Содержание</h2>
      <p>
        Эти три поля отображаются в верхней части формы, до пронумерованных шагов, и
        применяются к каждой отправке, которую генерирует данное расписание.
      </p>
      <dl>
        <dt>Заголовок</dt>
        <dd>
          Жирная первая строка push-уведомления на устройстве участника. Уведомления с
          одинаковым заголовком заменяют друг друга в панели уведомлений, а не накапливаются.
          Используйте единый заголовок для всего исследования, если хотите, чтобы в каждый
          момент было видно только одно уведомление, или разные заголовки, если хотите,
          чтобы они отображались одновременно.
        </dd>
        <dt>Сообщение</dt>
        <dd>Тело уведомления — вторая строка, видимая в панели уведомлений.</dd>
        <dt>Веб-ссылка</dt>
        <dd>
          URL, который открывается при нажатии участника на уведомление. Обычно это ваша
          ссылка на опрос в Qualtrics, REDCap или другом инструменте. Оставьте поле пустым,
          если хотите уведомление без действия. Раздел{' '}
          <a href='/docs/placeholders'>URL-заполнители</a> позволяет автоматически встраивать
          специфичные для участника значения, например идентификаторы.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Шаг 1 — Часовой пояс</h2>
      <p>
        Все значения времени, введённые на шагах 3, 6 и 7, интерпретируются в этом
        часовом поясе. Выберите часовой пояс, в котором проводится ваше исследование —
        обычно там, где находится ваша исследовательская группа.
      </p>
      <p>
        <strong>Адаптировать к часовому поясу участника</strong> переопределяет часовой
        пояс исследования для каждого участника индивидуально. При включении отправка в
        20:00 происходит в 20:00 по часовому поясу устройства каждого участника, а не в
        20:00 по часовому поясу исследования. Это работает как для текущих, так и для
        будущих участников, пока приложение Samply зафиксировало их часовой пояс.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Шаг 2 — Участники</h2>
      <p>Выберите, кто получает уведомления по данному расписанию. Можно комбинировать варианты.</p>
      <dl>
        <dt>Все будущие участники (исключая текущих)</dt>
        <dd>
          Каждая новая регистрация после сохранения расписания будет автоматически включена
          в него. Необходимо для исследований с открытым набором участников. Участники,
          уже зарегистрированные на момент создания расписания, <em>не</em> включаются
          этой опцией.
        </dd>
        <dt>Текущие участники — все</dt>
        <dd>Все, кто зарегистрирован в момент нажатия кнопки Запланировать уведомления.</dd>
        <dt>Текущие участники — конкретные лица</dt>
        <dd>Выберите из списка зарегистрированных Samply ID. Используйте для разовых отправок или тестирования.</dd>
        <dt>Группы</dt>
        <dd>
          Нацельтесь на одну или несколько именованных групп. Можно выбрать все группы или
          конкретные. Как создаются группы, см. в разделе <a href='/docs/groups'>Группы</a>.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Шаг 3 — Время</h2>
      <p>
        Это наиболее важный выбор в форме. Он определяет, будет ли время отправки
        фиксированным, случайным или с очень коротким интервалом повтора.
      </p>

      <h3>Конкретное(ые) время</h3>
      <p>
        Введите одно или несколько значений времени в формате ЧЧ:ММ. Каждое значение
        становится отдельной отправкой в каждый активный день. Нажмите{' '}
        <strong>Добавить ещё одно время</strong>, чтобы добавить дополнительные значения —
        например, 09:00, 13:00 и 18:00 для трёх отправок в день.
      </p>

      <h3>Временное окно</h3>
      <p>
        Задайте окно с временем начала, временем окончания, количеством случайных отправок
        внутри окна и минимальным промежутком между ними. Samply выбирает для каждого
        участника разное случайное время внутри этого окна в каждый активный день.
      </p>
      <p>
        Нажмите <strong>Добавить ещё одно временное окно</strong>, чтобы задать несколько
        окон в день (например, утром 08:00–11:00 и днём 14:00–17:00, по два сигнала в каждом).
      </p>

      <h3>Повтор (высокая частота)</h3>
      <p>
        Срабатывает с очень коротким циклом: каждую минуту, каждые 2, 5, 10, 15 или
        30 минут. Предназначен для оповещения в реальном времени в рамках лабораторной
        сессии, а не для ежедневных ESM-протоколов.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Шаг 4 — Дата</h2>
      <p>
        В сочетании с выбором на шаге 3 это определяет тип расписания. Выбор конкретной
        даты создаёт однократное (или случайное однократное) расписание. Выбор любого
        варианта повтора открывает шаги Начало и Конец и создаёт повторяющееся или
        персональное расписание.
      </p>

      <dl>
        <dt>Конкретная(ые) дата(ы)</dt>
        <dd>
          Выберите день, месяц и год в календаре. Уведомление отправляется в заданное на
          шаге 3 время именно в эту дату. Добавьте несколько дат для многоволнового
          однократного расписания.
        </dd>
        <dt>Повтор каждые N день(дней)</dt>
        <dd>
          Каждый день (N = 1), каждый второй день (N = 2), каждый третий день (N = 3) и т.д.
        </dd>
        <dt>Повтор в определённые дни недели</dt>
        <dd>Выберите любую комбинацию дней с понедельника по воскресенье.</dd>
        <dt>Повтор в определённые дни месяца</dt>
        <dd>Выберите любую комбинацию от 1-го до 31-го.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Шаг 3 + Шаг 4 = тип расписания</h3>
      <table>
        <thead>
          <tr>
            <th>Шаг 3 — Время</th>
            <th>Шаг 4 — Дата</th>
            <th>Результирующий тип</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_RU.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Шаг 5 — Месяц</h2>
      <p>
        Отображается только при выборе варианта повтора на шаге 4. Ограничивает расписание
        определёнными календарными месяцами. <strong>Повторять каждый месяц</strong>{' '}
        (по умолчанию) позволяет расписанию работать круглый год. Выбор конкретных месяцев
        удобен для сезонных протоколов или исследований, приостанавливаемых летом и зимой.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Шаг 6 — Когда начинать</h2>
      <p>
        Отображается только при выборе варианта повтора на шаге 4. Устанавливает дату,
        с которой расписание начинает генерировать отправки. Три варианта:
      </p>
      <dl>
        <dt>Начать в конкретную дату и время</dt>
        <dd>
          Расписание начинается в один и тот же абсолютный момент для всех участников.
          Используйте, когда у исследования есть фиксированная дата запуска.
        </dd>
        <dt>Начать через X дней / часов / минут после регистрации (или от сейчас)</dt>
        <dd>
          Точная длительность, прибавляемая к временной метке вступления каждого участника.
          Временное окно расписания начинается в разное реальное время для каждого участника.
          Выбор <em>сейчас</em> в качестве точки отсчёта привязывает к моменту нажатия
          кнопки Запланировать уведомления, а не к регистрации участника.
        </dd>
        <dt>Начать на день N после регистрации (или от сейчас)</dt>
        <dd>
          Samply отсчитывает N календарных дней от даты вступления и запускает расписание
          в полночь этого дня. День 1 = сам день вступления. День 2 = следующая
          календарная полночь. Полные подробности см. в разделе{' '}
          <a href='/docs/personal'>Персональное расписание</a>.
        </dd>
      </dl>

      <h2 id='stop'>Шаг 7 — Когда заканчивать</h2>
      <p>
        Те же три варианта, что и для начала. Конец является исключающим: расписание,
        заканчивающееся в конце дня 14, отправляет последнее уведомление в течение дня 14,
        а не в начале дня 15.
      </p>
      <p>
        Если оставить дату завершения в прошлом, расписание не сгенерирует ни одной
        отправки. Для исследований с непрерывным набором участников всегда используйте
        относительное завершение (день N или смещение по длительности), чтобы поздно
        вступившие получили полное протокольное окно.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Шаг 8 — Срок действия ссылки</h2>
      <p>
        Определяет, как долго ссылка на опрос в уведомлении остаётся активной после доставки
        push-сообщения. Если участник перейдёт по уведомлению после истечения срока, ссылка
        больше не откроет опрос.
      </p>
      <p>
        Установите срок действия, если ваш опрос должен быть заполнен в короткий период —
        например, при моментальной оценке, где устаревший ответ исказит данные. Оставьте
        не установленным (по умолчанию) для опросов без временных ограничений.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Шаг 9 — Напоминания</h2>
      <p>
        Напоминания — это повторные уведомления, отправляемые автоматически, когда Samply
        не зафиксировало завершение опроса. На каждое расписание можно добавить одно или
        несколько напоминаний, каждое с собственным заголовком, текстом и задержкой (дни +
        часы + минуты после исходного уведомления).
      </p>
      <p>
        Для корректной работы напоминаний ваш инструмент для опросов должен уведомлять
        Samply о завершении опроса участником — иначе каждая отправка получит напоминание
        независимо от фактического завершения. Полные инструкции по настройке см. в разделе{' '}
        <a href='/docs/reminders'>Напоминания</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Отправка</h2>
      <p>
        Нажмите <strong>Запланировать уведомления</strong> в нижней части формы. Samply
        немедленно разворачивает расписание в очередь отправок — по одной строке на
        участника на каждое время отправки — и планирует каждую в фоновом обработчике
        заданий. Вы можете просмотреть полную очередь в разделе{' '}
        <a href='/docs/queue'>Запланированная очередь</a>.
      </p>
      <p>
        Расписание нельзя редактировать после отправки. Чтобы изменить время или
        содержание, удалите расписание и создайте новое. Удаление расписания также
        удаляет все его ожидающие отправки из очереди.
      </p>
    </>
  );
}

function FormContentNl() {
  return (
    <>
      <p>
        Alle vier schematypen worden in hetzelfde formulier aangemaakt. De volgorde van de secties
        ligt vast: u beweegt altijd van boven naar beneden. De meeste secties worden pas relevant
        wanneer u in stap 4 een keuze maakt — het formulier verbergt irrelevante secties automatisch.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_NL.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_NL.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Inhoud</h2>
      <p>
        Deze drie velden verschijnen bovenaan het formulier, vóór de genummerde stappen, en zijn
        van toepassing op elke verzending die dit schema genereert.
      </p>
      <dl>
        <dt>Titel</dt>
        <dd>
          De vetgedrukte eerste regel van de pushmelding op het apparaat van de deelnemer. Meldingen
          met dezelfde titel vervangen elkaar in de systeembalk in plaats van te stapelen. Gebruik
          een consistente titel per studie als u wilt dat er slechts één melding tegelijk zichtbaar
          is, of gebruik verschillende titels als u wilt dat ze naast elkaar bestaan.
        </dd>
        <dt>Bericht</dt>
        <dd>De meldingstekst — de tweede regel die zichtbaar is in de systeembalk.</dd>
        <dt>Weblink</dt>
        <dd>
          De URL die wordt geopend wanneer de deelnemer op de melding tikt. Dit is doorgaans uw
          Qualtrics-, REDCap- of andere enquêtelink. Laat de URL weg als u een melding zonder
          actie wilt. Zie <a href='/docs/placeholders'>URL-plaatshouders</a> om
          deelnemerspecifieke waarden zoals ID's automatisch in te voegen.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Stap 1 — Tijdzone</h2>
      <p>
        Alle tijden die u in stappen 3, 6 en 7 invoert, worden in deze tijdzone geïnterpreteerd.
        Kies de tijdzone waarin uw studie wordt uitgevoerd — doorgaans waar uw onderzoeksgroep
        zich bevindt.
      </p>
      <p>
        <strong>Aanpassen aan tijdzone deelnemer</strong> overschrijft de studietijdzone voor elke
        deelnemer afzonderlijk. Wanneer ingeschakeld, wordt een verzending om 20:00 uitgevoerd op
        20:00 in de apparaattijdzone van elke deelnemer in plaats van op 20:00 in de studietijdzone.
        Dit werkt voor zowel huidige als toekomstige deelnemers zolang de Samply-app hun tijdzone
        heeft opgeslagen.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Stap 2 — Deelnemers</h2>
      <p>Kies wie meldingen van dit schema ontvangt. U kunt opties combineren.</p>
      <dl>
        <dt>Alle toekomstige deelnemers (exclusief huidige)</dt>
        <dd>
          Elke nieuwe inschrijving nadat dit schema is opgeslagen, wordt er automatisch aan
          gekoppeld. Essentieel voor studies met open werving. Deelnemers die al zijn ingeschreven
          wanneer u het schema aanmaakt, zijn <em>niet</em> opgenomen via deze optie alleen.
        </dd>
        <dt>Huidige deelnemers — Allen</dt>
        <dd>Iedereen die ingeschreven is op het moment dat u op Schema meldingen klikt.</dd>
        <dt>Huidige deelnemers — specifieke personen</dt>
        <dd>Kies uit de lijst van ingeschreven Samply-ID's. Gebruik dit voor eenmalige verzendingen of testen.</dd>
        <dt>Groepen</dt>
        <dd>
          Richt u op een of meer benoemde groepen. U kunt alle groepen kiezen of specifieke selecteren.
          Zie <a href='/docs/groups'>Groepen</a> voor hoe groepen worden aangemaakt.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Stap 3 — Tijd</h2>
      <p>
        Dit is de meest bepalende keuze in het formulier. Het bepaalt of verzendtijden vast,
        willekeurig of ingesteld zijn op een zeer korte herhaalfrequentie.
      </p>

      <h3>Specifiek tijdstip(pen)</h3>
      <p>
        Voer een of meer HH:MM-tijden in. Elke tijd wordt een afzonderlijke verzending op elke
        actieve dag. Klik op <strong>Nog een tijdstip toevoegen</strong> om extra tijden toe te
        voegen — bijvoorbeeld 09:00, 13:00 en 18:00 voor drie verzendingen per dag.
      </p>

      <h3>Tijdvenster</h3>
      <p>
        Definieer een venster met een begintijd, een eindtijd, het aantal willekeurige verzendingen
        binnen het venster en een minimale tussentijd. Samply kiest voor elke deelnemer op elke
        actieve dag een andere willekeurige tijd binnen dat venster.
      </p>
      <p>
        Klik op <strong>Nog een tijdvenster toevoegen</strong> om meerdere vensters per dag te
        definiëren (bijv. ochtend 08:00–11:00 en middag 14:00–17:00, elk twee meldingen).
      </p>

      <h3>Herhalen (hoge frequentie)</h3>
      <p>
        Wordt uitgevoerd in een zeer korte cyclus: elke minuut, elke 2, 5, 10, 15 of 30 minuten.
        Bedoeld voor realtime waarschuwingen binnen een labsessie, niet voor dagelijkse ESM-protocollen.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Stap 4 — Datum</h2>
      <p>
        In combinatie met uw keuze in stap 3 bepaalt dit het schematype. Het kiezen van een
        specifieke datum produceert een eenmalig (of willekeurig eenmalig) schema. Het kiezen
        van een herhalingsoptie toont de stappen Start en Stop en produceert een herhalend of
        persoonlijk schema.
      </p>

      <dl>
        <dt>Specifieke datum(s)</dt>
        <dd>
          Kies een kalenderdag, maand en jaar. De melding wordt verstuurd op de tijden uit stap 3
          op die exacte datum. Voeg meer datums toe voor een meerfasig eenmalig schema.
        </dd>
        <dt>Herhaal elke N dag(en)</dt>
        <dd>
          Elke dag (N = 1), om de dag (N = 2), elke derde dag (N = 3), enzovoort.
        </dd>
        <dt>Herhaal op specifieke weekdag(en)</dt>
        <dd>Kies een willekeurige combinatie van maandag tot en met zondag.</dd>
        <dt>Herhaal op specifieke dag(en) van de maand</dt>
        <dd>Kies een willekeurige combinatie van de 1e tot en met de 31e.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Stap 3 + Stap 4 = schematype</h3>
      <table>
        <thead>
          <tr>
            <th>Stap 3 — Tijd</th>
            <th>Stap 4 — Datum</th>
            <th>Resulterend type</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_NL.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Stap 5 — Maand</h2>
      <p>
        Alleen zichtbaar wanneer stap 4 een herhalingsoptie is. Beperkt het schema tot specifieke
        kalendermaanden. <strong>Elke maand herhalen</strong> (de standaard) laat het het hele jaar
        doorlopen. Het kiezen van specifieke maanden is nuttig voor seizoensgebonden protocollen of
        studies die pauzeren tijdens de zomer en winter.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Stap 6 — Wanneer te starten</h2>
      <p>
        Alleen zichtbaar wanneer stap 4 een herhalingsoptie is. Stelt de datum in vanaf wanneer
        het schema verzendingen genereert. Drie opties:
      </p>
      <dl>
        <dt>Starten op een specifieke datum en tijd</dt>
        <dd>
          Het schema begint op hetzelfde absolute moment voor alle deelnemers. Gebruik dit wanneer
          uw studie een vaste startdatum heeft.
        </dd>
        <dt>Starten na X dagen / uren / minuten na registratie (of vanaf nu)</dt>
        <dd>
          Een exacte duur die wordt opgeteld bij het aanmeldingtijdstempel van elke deelnemer. Het
          schemavenster begint op een ander kloktijd voor elke deelnemer. Het kiezen van{" "}
          <em>nu</em> als referentie verankert aan het moment waarop u op Schema meldingen klikt
          in plaats van aan de inschrijving.
        </dd>
        <dt>Starten op dag N na registratie (of vanaf nu)</dt>
        <dd>
          Samply telt N kalenderdagen vanaf de aanmelddatum en start het schema om middernacht van
          die dag. Dag 1 = de aanmelddag zelf. Dag 2 = de volgende kalendermidernacht.
          Zie <a href='/docs/personal'>Persoonlijke planning</a> voor volledige details.
        </dd>
      </dl>

      <h2 id='stop'>Stap 7 — Wanneer te stoppen</h2>
      <p>
        Dezelfde drie opties als bij Start. De stop is exclusief: een schema dat stopt aan het
        einde van dag 14 verstuurt zijn laatste verzending tijdens dag 14, niet aan het begin van
        dag 15.
      </p>
      <p>
        Als u de stop instelt op een kalenderdatum die al in het verleden ligt, genereert het schema
        geen verzendingen. Gebruik voor studies met doorlopende inschrijving altijd een relatieve stop
        (dag N of duuroffset) zodat late deelnemers hun volledige protocolvenster krijgen.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Stap 8 — Linkverval</h2>
      <p>
        Bepaalt hoe lang de enquêtelink in de melding actief blijft na de aflevering van de push.
        Als een deelnemer op de melding tikt na het vervalsvenster, opent de link de enquête niet
        meer.
      </p>
      <p>
        Stel een vervaldatum in wanneer uw enquête binnen een strak venster moet worden voltooid —
        bijvoorbeeld bij een momentane beoordeling waarbij een verlaat antwoord de gegevens zou
        vertekenen. Laat het uitgeschakeld (de standaard) voor enquêtes zonder tijdsdruk.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Stap 9 — Herinneringen</h2>
      <p>
        Herinneringen zijn vervolgmeldingen die automatisch worden verstuurd wanneer Samply geen
        voltooiing van de enquête heeft gedetecteerd. U kunt een of meer herinneringen per schema
        toevoegen, elk met een eigen titel, bericht en vertraging (dagen + uren + minuten na de
        oorspronkelijke melding).
      </p>
      <p>
        Opdat herinneringen correct werken, moet uw enquêtetool Samply informeren wanneer een
        deelnemer de enquête voltooit — anders krijgt elke verzending een herinnering ongeacht
        de werkelijke voltooiing. Volledige installatie-instructies staan in{" "}
        <a href='/docs/reminders'>Herinneringen</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Indienen</h2>
      <p>
        Klik onderaan het formulier op <strong>Schema meldingen</strong>. Samply breidt het schema
        onmiddellijk uit naar een wachtrij van verzendingen — één rij per deelnemer per verzendtijd
        — en plant elk item in de achtergrondtaakuitvoerder. U kunt de volledige wachtrij bekijken
        in de <a href='/docs/queue'>Geplande wachtrij</a>.
      </p>
      <p>
        Een schema kan na indiening niet worden bewerkt. Om de timing of inhoud te wijzigen,
        verwijdert u het schema en maakt u een nieuw aan. Het verwijderen van een schema verwijdert
        ook alle bijbehorende openstaande verzendingen uit de wachtrij.
      </p>
    </>
  );
}

function FormContentDe() {
  return (
    <>
      <p>
        Alle vier Zeitplantypen werden im selben Formular erstellt. Die Reihenfolge der Abschnitte
        ist fest: Sie bewegen sich immer von oben nach unten. Die meisten Abschnitte werden erst
        relevant, wenn Sie in Schritt 4 eine Auswahl treffen — das Formular blendet irrelevante
        Abschnitte automatisch aus.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_DE.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_DE.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Inhalt</h2>
      <p>
        Diese drei Felder erscheinen oben im Formular, vor den nummerierten Schritten, und gelten
        für jede Sendung, die dieser Zeitplan erzeugt.
      </p>
      <dl>
        <dt>Titel</dt>
        <dd>
          Die fett gedruckte erste Zeile der Push-Benachrichtigung auf dem Gerät der teilnehmenden
          Person. Benachrichtigungen mit demselben Benachrichtigungstitel ersetzen sich gegenseitig in der
          Systemleiste, anstatt sich zu stapeln. Verwenden Sie einen konsistenten Titel pro Studie,
          wenn Sie nur eine Benachrichtigung gleichzeitig anzeigen möchten, oder verwenden Sie
          verschiedene Titel, wenn sie nebeneinander existieren sollen.
        </dd>
        <dt>Nachricht</dt>
        <dd>Der Benachrichtigungstext — die zweite sichtbare Zeile in der Systemleiste.</dd>
        <dt>Weblink</dt>
        <dd>
          Die URL, die geöffnet wird, wenn die teilnehmende Person auf die Benachrichtigung tippt.
          Dies ist normalerweise Ihr Qualtrics-, REDCap- oder anderer Befragungslink. Lassen Sie die
          URL weg, wenn Sie eine Benachrichtigung ohne Aktion wünschen. Siehe{" "}
          <a href='/docs/placeholders'>URL-Platzhalter</a>, um teilnehmerspezifische Werte wie IDs
          automatisch einzubetten.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Schritt 1 — Zeitzone</h2>
      <p>
        Alle Zeiten, die Sie in den Schritten 3, 6 und 7 eingeben, werden in dieser Zeitzone
        interpretiert. Wählen Sie die Zeitzone, in der Ihre Studie durchgeführt wird — in der
        Regel dort, wo sich Ihre Forschungsgruppe befindet.
      </p>
      <p>
        <strong>An Teilnehmerzeitzone anpassen</strong> überschreibt die Studienzeitzone für jede
        teilnehmende Person individuell. Wenn aktiviert, wird eine Sendung um 20:00 Uhr in der
        Gerätezeitzone jeder teilnehmenden Person ausgelöst, anstatt um 20:00 Uhr in der
        Studienzeitzone. Dies funktioniert für aktuelle und zukünftige Teilnehmende, solange die
        Samply-App deren Zeitzone gespeichert hat.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Schritt 2 — Teilnehmende</h2>
      <p>Wählen Sie, wer Benachrichtigungen aus diesem Zeitplan erhält. Sie können Optionen kombinieren.</p>
      <dl>
        <dt>Alle zukünftigen Teilnehmenden (ohne aktuelle)</dt>
        <dd>
          Jede neue Einschreibung nach dem Speichern dieses Zeitplans wird automatisch eingeschrieben.
          Unverzichtbar für Studien mit offener Rekrutierung. Teilnehmende, die bereits eingeschrieben
          sind, wenn Sie den Zeitplan erstellen, werden durch diese Option allein <em>nicht</em> eingeschlossen.
        </dd>
        <dt>Aktuelle Teilnehmende — Alle</dt>
        <dd>Alle, die zum Zeitpunkt des Klickens auf „Benachrichtigungen planen" eingeschrieben sind.</dd>
        <dt>Aktuelle Teilnehmende — bestimmte Personen</dt>
        <dd>Wählen Sie aus der Liste der eingeschriebenen Samply-IDs. Verwenden Sie dies für einmalige Sendungen oder Tests.</dd>
        <dt>Gruppen</dt>
        <dd>
          Richten Sie sich an eine oder mehrere benannte Gruppen. Sie können alle Gruppen oder bestimmte
          auswählen. Siehe <a href='/docs/groups'>Gruppen</a>, wie Gruppen erstellt werden.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Schritt 3 — Uhrzeit</h2>
      <p>
        Dies ist die folgenreichste Wahl im Formular. Sie bestimmt, ob Sendezeiten fest, zufällig
        oder auf eine sehr kurze Wiederholungsfrequenz eingestellt sind.
      </p>

      <h3>Bestimmter Zeitpunkt(e)</h3>
      <p>
        Geben Sie eine oder mehrere HH:MM-Zeiten ein. Jede Uhrzeit wird zu einer separaten Sendung
        an jedem Auslösetag. Klicken Sie auf <strong>Weiteren Zeitpunkt hinzufügen</strong>, um
        zusätzliche Zeiten hinzuzufügen — zum Beispiel 09:00, 13:00 und 18:00 für drei Sendungen pro Tag.
      </p>

      <h3>Zeitfenster</h3>
      <p>
        Definieren Sie ein Fenster mit einer Von-Zeit, einer Bis-Zeit, der Anzahl der zufälligen
        Sendungen innerhalb des Fensters und einem Mindestabstand zwischen ihnen. Samply wählt für
        jede teilnehmende Person innerhalb dieses Fensters an jedem Auslösetag eine andere zufällige Zeit.
      </p>
      <p>
        Klicken Sie auf <strong>Weiteres Zeitfenster hinzufügen</strong>, um mehrere Fenster pro Tag
        zu definieren (z. B. morgens 08:00–11:00 und nachmittags 14:00–17:00, je zwei Benachrichtigungen).
      </p>

      <h3>Wiederholen (hochfrequent)</h3>
      <p>
        Wird in einem sehr kurzen Zyklus ausgelöst: jede Minute, alle 2, 5, 10, 15 oder 30 Minuten.
        Gedacht für Echtzeit-Benachrichtigungen innerhalb einer Laborsitzung, nicht für tägliche ESM-Protokolle.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Schritt 4 — Datum</h2>
      <p>
        In Kombination mit Ihrer Auswahl in Schritt 3 bestimmt dies den Zeitplantyp. Die Auswahl
        eines bestimmten Datums ergibt einen einmaligen (oder zufällig einmaligen) Zeitplan. Die
        Auswahl einer Wiederholungsoption zeigt die Start- und Endschritte an und ergibt einen
        wiederkehrenden oder persönlichen Zeitplan.
      </p>

      <dl>
        <dt>Bestimmtes Datum (Daten)</dt>
        <dd>
          Wählen Sie einen Kalendertag, Monat und Jahr. Die Benachrichtigung wird zu den Zeiten
          aus Schritt 3 an diesem genauen Datum gesendet. Fügen Sie weitere Daten für einen
          mehrwelligen einmaligen Zeitplan hinzu.
        </dd>
        <dt>Jeden N-ten Tag wiederholen</dt>
        <dd>
          Jeden Tag (N = 1), jeden zweiten Tag (N = 2), jeden dritten Tag (N = 3) und so weiter.
        </dd>
        <dt>An bestimmten Wochentagen wiederholen</dt>
        <dd>Wählen Sie eine beliebige Kombination von Montag bis Sonntag.</dd>
        <dt>An bestimmten Tagen des Monats wiederholen</dt>
        <dd>Wählen Sie eine beliebige Kombination vom 1. bis zum 31.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Schritt 3 + Schritt 4 = Zeitplantyp</h3>
      <table>
        <thead>
          <tr>
            <th>Schritt 3 — Uhrzeit</th>
            <th>Schritt 4 — Datum</th>
            <th>Resultierender Typ</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_DE.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Schritt 5 — Monat</h2>
      <p>
        Nur sichtbar, wenn Schritt 4 eine Wiederholungsoption ist. Begrenzt den Zeitplan auf
        bestimmte Kalendermonate. <strong>Jeden Monat wiederholen</strong> (die Standardeinstellung)
        lässt ihn ganzjährig laufen. Die Auswahl bestimmter Monate ist nützlich für saisonale
        Protokolle oder Studien, die im Sommer und Winter pausieren.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Schritt 6 — Wann beginnen</h2>
      <p>
        Nur sichtbar, wenn Schritt 4 eine Wiederholungsoption ist. Legt das Datum fest, ab dem
        der Zeitplan Sendungen erzeugt. Drei Optionen:
      </p>
      <dl>
        <dt>An einem bestimmten Datum und einer bestimmten Uhrzeit beginnen</dt>
        <dd>
          Der Zeitplan beginnt für alle Teilnehmenden zum gleichen absoluten Zeitpunkt. Verwenden
          Sie dies, wenn Ihre Studie ein festes Startdatum hat.
        </dd>
        <dt>Nach X Tagen / Stunden / Minuten nach der Registrierung beginnen (oder ab jetzt)</dt>
        <dd>
          Eine genaue Dauer, die zum Beitrittszeitstempel jeder teilnehmenden Person addiert wird.
          Das Zeitplanfenster beginnt für jede teilnehmende Person zu einer anderen Uhrzeit. Die
          Wahl von <em>jetzt</em> als Referenz verankert den Zeitpunkt, an dem Sie auf
          „Benachrichtigungen planen" klicken, anstatt an der Einschreibung.
        </dd>
        <dt>Am Tag N nach der Registrierung beginnen (oder ab jetzt)</dt>
        <dd>
          Samply zählt N Kalendertage ab dem Beitrittsdatum und beginnt den Zeitplan um Mitternacht
          dieses Tages. Tag 1 = der Beitrittag selbst. Tag 2 = die nächste Kalendermitternacht.
          Siehe <a href='/docs/personal'>Persönliche Planung</a> für vollständige Details.
        </dd>
      </dl>

      <h2 id='stop'>Schritt 7 — Wann beenden</h2>
      <p>
        Die gleichen drei Optionen wie beim Start. Das Ende ist exklusiv: Ein Zeitplan, der am Ende
        von Tag 14 endet, sendet seine letzte Sendung während Tag 14, nicht am Beginn von Tag 15.
      </p>
      <p>
        Wenn Sie das Ende auf ein Kalenderdatum setzen, das bereits in der Vergangenheit liegt,
        erzeugt der Zeitplan keine Sendungen. Verwenden Sie bei Studien mit laufender Einschreibung
        immer ein relatives Ende (Tag N oder Dauer-Offset), damit späte Beitretende ihr vollständiges
        Protokollfenster erhalten.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Schritt 8 — Link-Ablauf</h2>
      <p>
        Steuert, wie lange der Befragungslink in der Benachrichtigung nach der Zustellung aktiv
        bleibt. Wenn eine teilnehmende Person nach dem Ablaufzeitraum auf die Benachrichtigung
        tippt, öffnet der Link die Befragung nicht mehr.
      </p>
      <p>
        Legen Sie einen Ablauf fest, wenn Ihre Befragung innerhalb eines engen Zeitraums abgeschlossen
        werden muss — zum Beispiel bei einer momentanen Bewertung, bei der eine veraltete Antwort die
        Daten verzerren würde. Lassen Sie es ungesetzt (Standard) für Befragungen ohne Zeitdruck.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Schritt 9 — Erinnerungen</h2>
      <p>
        Erinnerungen sind Folgebenachrichtigungen, die automatisch gesendet werden, wenn Samply
        keinen Befragungsabschluss erkannt hat. Sie können eine oder mehrere Erinnerungen pro
        Zeitplan hinzufügen, jede mit eigenem Titel, eigener Nachricht und eigenem Verzögerung
        (Tage + Stunden + Minuten nach der ursprünglichen Benachrichtigung).
      </p>
      <p>
        Damit Erinnerungen korrekt funktionieren, muss Ihr Befragungstool Samply benachrichtigen,
        wenn eine teilnehmende Person die Befragung abschließt — sonst erhält jede Sendung eine
        Erinnerung, unabhängig vom tatsächlichen Abschluss. Vollständige Einrichtungsanweisungen
        finden Sie unter <a href='/docs/reminders'>Erinnerungen</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Absenden</h2>
      <p>
        Klicken Sie unten im Formular auf <strong>Benachrichtigungen planen</strong>. Samply
        erweitert den Zeitplan sofort in eine Warteschlange von Sendungen — eine Zeile pro
        teilnehmende Person pro Sendezeit — und plant jede im Hintergrund-Job-Runner. Sie können
        die vollständige Warteschlange unter <a href='/docs/queue'>Geplante Warteschlange</a> einsehen.
      </p>
      <p>
        Ein Zeitplan kann nach dem Absenden nicht bearbeitet werden. Um Zeitplanung oder Inhalt zu
        ändern, löschen Sie den Zeitplan und erstellen Sie einen neuen. Das Löschen eines Zeitplans
        entfernt auch alle ausstehenden Sendungen aus der Warteschlange.
      </p>
    </>
  );
}

const SECTIONS_KO = [
  { id: 'content',    label: '내용',             summary: '제목, 메시지, 설문 URL.' },
  { id: 'timezone',  label: '1. 시간대',          summary: '사용할 시계와 각 참여자의 시간대를 따를지 여부.' },
  { id: 'audience',  label: '2. 참여자',          summary: '이 일정을 받는 사람.' },
  { id: 'time',      label: '3. 시간',            summary: '고정 시간, 무작위 창, 또는 분 단위 반복.' },
  { id: 'date',      label: '4. 날짜',            summary: '특정 날짜 하나 또는 반복 요일 패턴.' },
  { id: 'month',     label: '5. 월',             summary: '반복 전송을 특정 월로 제한합니다. 반복 전용.' },
  { id: 'start',     label: '6. 시작',           summary: '반복 일정이 시작되는 시점. 반복 전용.' },
  { id: 'stop',      label: '7. 종료',           summary: '반복 일정이 끝나는 시점. 반복 전용.' },
  { id: 'expiry',    label: '8. 만료',           summary: '전송 후 설문 링크가 유효한 기간.' },
  { id: 'reminders', label: '9. 리마인더',        summary: '완료가 감지되지 않을 때 보내는 후속 알림.' },
];

const TYPE_MATRIX_KO = [
  { time: '특정 시간대(들)', date: '특정 날짜(들)',                                              type: '일회성',              link: '/docs/types#one-time' },
  { time: '특정 시간대(들)', date: 'N일마다 / 특정 요일 / 특정 월일 반복',                        type: '반복',                link: '/docs/types#repeating' },
  { time: '특정 시간대(들)', date: '반복 + 등록 기준 시작/종료',                                  type: '개인화',              link: '/docs/personal' },
  { time: '시간 창',         date: '특정 날짜(들)',                                              type: '일회성 무작위',        link: '/docs/types#randomized' },
  { time: '시간 창',         date: '반복 + 등록 기준 시작/종료',                                  type: '개인화 무작위',        link: '/docs/types#randomized' },
];

const SECTIONS_IT = [
  { id: 'content',    label: 'Contenuto',         summary: 'Titolo, messaggio e URL del sondaggio.' },
  { id: 'timezone',  label: '1. Fuso orario',     summary: 'Quale orologio utilizzare e se seguire il fuso orario di ogni partecipante.' },
  { id: 'audience',  label: '2. Partecipanti',    summary: 'Chi riceve questa pianificazione.' },
  { id: 'time',      label: '3. Orario',          summary: 'Orari fissi, finestre casuali o una ripetizione al minuto.' },
  { id: 'date',      label: '4. Data',            summary: 'Una data specifica o un pattern di giorni ricorrente.' },
  { id: 'month',     label: '5. Mese',            summary: 'Limita gli invii ricorrenti a determinati mesi. Solo per le pianificazioni ricorrenti.' },
  { id: 'start',     label: '6. Inizio',          summary: 'Quando inizia la pianificazione ricorrente. Solo per le pianificazioni ricorrenti.' },
  { id: 'stop',      label: '7. Fine',            summary: 'Quando termina la pianificazione ricorrente. Solo per le pianificazioni ricorrenti.' },
  { id: 'expiry',    label: '8. Scadenza',        summary: 'Per quanto tempo il link al sondaggio rimane attivo dopo la consegna.' },
  { id: 'reminders', label: '9. Promemoria',      summary: 'Notifiche di follow-up se non viene rilevato alcun completamento.' },
];

const TYPE_MATRIX_IT = [
  { time: 'Orario specifico', date: 'Data/e specifica/he',                                         type: 'Una tantum',              link: '/docs/types#one-time' },
  { time: 'Orario specifico', date: 'Ripeti ogni N giorni / giorni della settimana / giorni del mese', type: 'Ricorrente',           link: '/docs/types#repeating' },
  { time: 'Orario specifico', date: 'Ripeti + inizio/fine relativi alla registrazione',              type: 'Personalizzata',          link: '/docs/personal' },
  { time: 'Finestra temporale', date: 'Data/e specifica/he',                                       type: 'Una tantum casuale',      link: '/docs/types#randomized' },
  { time: 'Finestra temporale', date: 'Ripeti + inizio/fine relativi alla registrazione',            type: 'Personalizzata casuale',  link: '/docs/types#randomized' },
];

function FormContentKo() {
  return (
    <>
      <p>
        네 가지 일정 유형 모두 동일한 양식에서 생성됩니다. 섹션 순서는 고정되어 있으며,
        항상 위에서 아래로 진행합니다. 대부분의 섹션은 4단계에서 선택을 완료해야 활성화되며,
        양식은 관련 없는 섹션을 자동으로 숨깁니다.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_KO.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_KO.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>내용</h2>
      <p>
        이 세 필드는 양식 상단에, 번호가 매겨진 단계 앞에 표시되며 이 일정이 생성하는
        모든 전송에 적용됩니다.
      </p>
      <dl>
        <dt>제목</dt>
        <dd>
          참여자 기기의 푸시 알림 첫 번째 굵은 줄입니다. 동일한 제목을 가진 알림은 시스템 트레이에서
          쌓이지 않고 서로 대체됩니다. 한 번에 하나의 알림만 표시되길 원한다면 연구 전체에 일관된 제목을
          사용하고, 동시에 표시되길 원한다면 서로 다른 제목을 사용하십시오.
        </dd>
        <dt>메시지</dt>
        <dd>알림 본문 — 시스템 트레이에서 보이는 두 번째 줄입니다.</dd>
        <dt>웹 링크</dt>
        <dd>
          참여자가 알림을 탭했을 때 열리는 URL입니다. 일반적으로 Qualtrics, REDCap 또는 기타 설문
          링크입니다. 동작 없는 알림만 원한다면 URL을 비워 두십시오. ID와 같은 참여자별 값을 자동으로
          삽입하려면 <a href='/docs/placeholders'>URL 자리 표시자</a>를 참조하십시오.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>1단계 — 시간대</h2>
      <p>
        3, 6, 7단계에서 입력하는 모든 시간은 이 시간대로 해석됩니다. 연구가 진행되는 시간대를
        선택하십시오 — 일반적으로 연구팀이 위치한 곳입니다.
      </p>
      <p>
        <strong>참여자 시간대로 조정</strong>하면 각 참여자별로 연구 시간대가 재정의됩니다.
        활성화하면 20:00 전송이 연구 시간대의 20:00가 아닌 각 참여자 기기 시간대의 20:00에
        실행됩니다. Samply 앱이 시간대를 기록한 현재 및 미래 참여자 모두에게 적용됩니다.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>2단계 — 참여자</h2>
      <p>이 일정에서 알림을 받을 대상을 선택하십시오. 옵션을 혼합할 수 있습니다.</p>
      <dl>
        <dt>모든 미래 참여자 (현재 참여자 제외)</dt>
        <dd>
          이 일정이 저장된 후 새로 등록하는 모든 참여자가 자동으로 포함됩니다. 개방형 모집 연구에
          필수적입니다. 일정 생성 시 이미 등록된 참여자는 이 옵션만으로는 <em>포함되지 않습니다</em>.
        </dd>
        <dt>현재 참여자 — 전체</dt>
        <dd>알림 일정 버튼을 클릭하는 시점에 등록된 모든 사람입니다.</dd>
        <dt>현재 참여자 — 특정 개인</dt>
        <dd>등록된 Samply ID 목록에서 선택합니다. 일회성 전송 또는 테스트에 사용합니다.</dd>
        <dt>그룹</dt>
        <dd>
          하나 이상의 명명된 그룹을 대상으로 합니다. 모든 그룹이나 특정 그룹을 선택할 수 있습니다.
          그룹 생성 방법은 <a href='/docs/groups'>그룹</a>을 참조하십시오.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>3단계 — 시간</h2>
      <p>
        양식에서 가장 중요한 선택입니다. 전송 시간이 고정인지, 무작위인지, 또는 매우 짧은
        반복 주기로 설정될지를 결정합니다.
      </p>

      <h3>특정 시간대(들)</h3>
      <p>
        HH:MM 형식의 시간을 하나 이상 입력합니다. 각 시간은 모든 실행일에 별도의 전송이 됩니다.
        <strong>시간대 추가</strong>를 클릭하여 추가 시간을 넣으십시오 — 예를 들어 하루에 세 번
        전송하려면 09:00, 13:00, 18:00을 입력합니다.
      </p>

      <h3>시간 창</h3>
      <p>
        시작 시간, 종료 시간, 창 내 무작위 전송 횟수, 최소 간격을 가진 창을 정의합니다.
        Samply는 매 실행일마다 각 참여자에 대해 해당 창 내에서 서로 다른 무작위 시간을 선택합니다.
      </p>
      <p>
        <strong>시간 창 추가</strong>를 클릭하여 하루에 여러 창을 정의하십시오
        (예: 오전 08:00–11:00, 오후 14:00–17:00, 각 2회 알림).
      </p>

      <h3>반복 (고빈도)</h3>
      <p>
        매우 짧은 주기로 실행됩니다: 매분, 2, 5, 10, 15, 30분마다. 일상적인 ESM 프로토콜이 아닌
        실험실 세션 내 실시간 알림을 위한 기능입니다.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>4단계 — 날짜</h2>
      <p>
        3단계 선택과 결합하여 일정 유형을 결정합니다. 특정 날짜를 선택하면 일회성(또는 무작위 일회성)
        일정이 생성됩니다. 반복 옵션을 선택하면 시작 및 종료 단계가 표시되고 반복 또는 개인화 일정이
        생성됩니다.
      </p>

      <dl>
        <dt>특정 날짜(들)</dt>
        <dd>
          달력에서 날짜, 월, 연도를 선택합니다. 해당 정확한 날짜의 3단계 시간에 알림이 전송됩니다.
          다중 파동 일회성 일정을 위해 날짜를 더 추가하십시오.
        </dd>
        <dt>N일마다 반복</dt>
        <dd>
          매일 (N = 1), 격일 (N = 2), 3일마다 (N = 3) 등.
        </dd>
        <dt>특정 요일에 반복</dt>
        <dd>월요일부터 일요일까지 임의의 조합을 선택합니다.</dd>
        <dt>매월 특정 일에 반복</dt>
        <dd>1일부터 31일까지 임의의 조합을 선택합니다.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>3단계 + 4단계 = 일정 유형</h3>
      <table>
        <thead>
          <tr>
            <th>3단계 — 시간</th>
            <th>4단계 — 날짜</th>
            <th>결과 유형</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_KO.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>5단계 — 월</h2>
      <p>
        4단계가 반복 옵션인 경우에만 표시됩니다. 일정을 특정 달력 월로 제한합니다.
        <strong>매월 반복</strong>(기본값)은 연중 내내 실행됩니다. 특정 월을 선택하는 것은
        계절별 프로토콜이나 여름·겨울에 중단되는 연구에 유용합니다.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>6단계 — 시작 시점</h2>
      <p>
        4단계가 반복 옵션인 경우에만 표시됩니다. 일정이 전송을 생성하기 시작하는 날짜를 설정합니다.
        세 가지 옵션:
      </p>
      <dl>
        <dt>특정 날짜 및 시간에 시작</dt>
        <dd>
          모든 참여자에 대해 동일한 절대적 시점에 일정이 시작됩니다. 연구에 고정된 시작일이 있을 때
          사용하십시오.
        </dd>
        <dt>등록 후 X일 / 시간 / 분 후 시작 (또는 지금부터)</dt>
        <dd>
          각 참여자 참여 타임스탬프에 추가되는 정확한 기간입니다. 일정 창은 각 참여자마다 다른 실제
          시간에 시작됩니다. <em>지금</em>을 기준점으로 선택하면 등록 시간이 아닌 알림 일정 버튼을
          클릭하는 순간에 고정됩니다.
        </dd>
        <dt>등록 후 N일째에 시작 (또는 지금부터)</dt>
        <dd>
          Samply는 참여일로부터 N 달력 일수를 세어 해당 날 자정에 일정을 시작합니다.
          1일 = 참여 당일. 2일 = 다음 달력 자정.
          전체 세부 정보는 <a href='/docs/personal'>개인화 일정</a>을 참조하십시오.
        </dd>
      </dl>

      <h2 id='stop'>7단계 — 종료 시점</h2>
      <p>
        시작과 동일한 세 가지 옵션입니다. 종료는 배타적입니다: 14일 종료로 설정된 일정은
        15일 시작이 아닌 14일 내에 마지막 전송을 실행합니다.
      </p>
      <p>
        종료를 이미 지난 달력 날짜로 설정하면 일정은 전송을 생성하지 않습니다. 지속적 등록 연구의
        경우 항상 상대적 종료(N일 또는 기간 오프셋)를 사용하여 늦게 참여하는 사람들도 전체 프로토콜
        창을 받을 수 있도록 하십시오.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>8단계 — 링크 만료</h2>
      <p>
        푸시가 전달된 후 알림의 설문 링크가 활성 상태를 유지하는 기간을 제어합니다.
        참여자가 만료 창 이후에 알림을 탭하면 링크가 더 이상 설문을 열지 않습니다.
      </p>
      <p>
        설문이 좁은 창 내에서 완료되어야 할 때 만료를 설정하십시오 — 예를 들어 오래된 응답이
        데이터를 편향시킬 수 있는 순간 평가에서 그렇습니다. 시간 압박이 없는 설문의 경우 설정하지
        않은 상태(기본값)로 두십시오.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>9단계 — 리마인더</h2>
      <p>
        리마인더는 Samply가 설문 완료를 감지하지 못했을 때 자동으로 전송되는 후속 알림입니다.
        일정당 하나 이상의 리마인더를 추가할 수 있으며, 각각 자체 제목, 메시지, 지연(원래 알림
        후 일 + 시간 + 분)을 갖습니다.
      </p>
      <p>
        리마인더가 올바르게 작동하려면 참여자가 설문을 완료할 때 설문 도구가 Samply에 알려야 합니다
        — 그렇지 않으면 실제 완료 여부와 상관없이 모든 전송에 리마인더가 발송됩니다. 전체 설정
        지침은 <a href='/docs/reminders'>리마인더</a>를 참조하십시오.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>제출</h2>
      <p>
        양식 하단의 <strong>알림 일정 설정</strong>을 클릭하십시오. Samply는 즉시 일정을
        전송 큐로 확장합니다 — 참여자별, 전송 시간별 한 행 — 그리고 각각을 백그라운드 작업
        실행기에 예약합니다. 전체 큐는 <a href='/docs/queue'>예약된 큐</a>에서 확인할 수 있습니다.
      </p>
      <p>
        일정은 제출 후 편집할 수 없습니다. 타이밍이나 내용을 변경하려면 일정을 삭제하고 새로
        만드십시오. 일정을 삭제하면 큐에서 보류 중인 모든 전송도 제거됩니다.
      </p>
    </>
  );
}

const SECTIONS_FR = [
  { id: 'content',    label: 'Contenu',           summary: 'Titre, message et URL du questionnaire.' },
  { id: 'timezone',  label: '1. Fuseau horaire',  summary: 'Quelle horloge utiliser et si le fuseau de chaque participant est suivi.' },
  { id: 'audience',  label: '2. Participants',    summary: 'Qui reçoit ce planning.' },
  { id: 'time',      label: '3. Heure',           summary: 'Heures fixes, fenêtres aléatoires ou une répétition à la minute.' },
  { id: 'date',      label: '4. Date',            summary: 'Une date spécifique ou un motif de jours récurrents.' },
  { id: 'month',     label: '5. Mois',            summary: 'Limiter les envois récurrents à certains mois. Récurrent uniquement.' },
  { id: 'start',     label: '6. Début',           summary: 'Quand le planning récurrent commence. Récurrent uniquement.' },
  { id: 'stop',      label: '7. Fin',             summary: 'Quand le planning récurrent se termine. Récurrent uniquement.' },
  { id: 'expiry',    label: '8. Expiration',      summary: 'Combien de temps le lien du questionnaire reste actif après la livraison.' },
  { id: 'reminders', label: '9. Rappels',         summary: 'Notifications de suivi si aucune complétion n\'est détectée.' },
];

const SECTIONS_ES = [
  { id: 'content',    label: 'Contenido',         summary: 'Título, mensaje y URL de la encuesta.' },
  { id: 'timezone',  label: '1. Zona horaria',    summary: 'Qué reloj usar y si se sigue la zona horaria de cada participante.' },
  { id: 'audience',  label: '2. Participantes',   summary: 'Quién recibe este calendario.' },
  { id: 'time',      label: '3. Hora',            summary: 'Horas fijas, ventanas aleatorias o una repetición por minuto.' },
  { id: 'date',      label: '4. Fecha',           summary: 'Una fecha específica o un patrón de días recurrentes.' },
  { id: 'month',     label: '5. Mes',             summary: 'Limitar los envíos recurrentes a ciertos meses. Solo recurrente.' },
  { id: 'start',     label: '6. Inicio',          summary: 'Cuándo comienza el calendario recurrente. Solo recurrente.' },
  { id: 'stop',      label: '7. Fin',             summary: 'Cuándo termina el calendario recurrente. Solo recurrente.' },
  { id: 'expiry',    label: '8. Caducidad',       summary: 'Cuánto tiempo permanece activo el enlace de la encuesta tras la entrega.' },
  { id: 'reminders', label: '9. Recordatorios',   summary: 'Notificaciones de seguimiento si no se detecta ninguna finalización.' },
];

const SECTIONS_PT = [
  { id: 'content',    label: 'Conteúdo',          summary: 'Título, mensagem e URL da pesquisa.' },
  { id: 'timezone',  label: '1. Fuso horário',    summary: 'Qual relógio usar e se deve seguir o fuso horário de cada participante.' },
  { id: 'audience',  label: '2. Participantes',   summary: 'Quem recebe este calendário.' },
  { id: 'time',      label: '3. Hora',            summary: 'Horas fixas, janelas aleatórias ou uma repetição por minuto.' },
  { id: 'date',      label: '4. Data',            summary: 'Uma data específica ou um padrão de dias recorrentes.' },
  { id: 'month',     label: '5. Mês',             summary: 'Limitar os envios recorrentes a certos meses. Somente recorrente.' },
  { id: 'start',     label: '6. Início',          summary: 'Quando o calendário recorrente começa. Somente recorrente.' },
  { id: 'stop',      label: '7. Fim',             summary: 'Quando o calendário recorrente termina. Somente recorrente.' },
  { id: 'expiry',    label: '8. Expiração',       summary: 'Por quanto tempo o link da pesquisa permanece ativo após a entrega.' },
  { id: 'reminders', label: '9. Lembretes',       summary: 'Notificações de acompanhamento se nenhuma conclusão for detectada.' },
];

const TYPE_MATRIX_FR = [
  { time: 'Heure(s) spécifique(s)', date: 'Date(s) spécifique(s)',                                              type: 'Ponctuel',               link: '/docs/types#one-time' },
  { time: 'Heure(s) spécifique(s)', date: 'Répéter tous les N jours / jours de semaine / jours du mois',        type: 'Récurrent',              link: '/docs/types#repeating' },
  { time: 'Heure(s) spécifique(s)', date: 'Répéter + début/fin relatifs à l\'inscription',                      type: 'Personnel',              link: '/docs/personal' },
  { time: 'Fenêtre horaire',        date: 'Date(s) spécifique(s)',                                              type: 'Ponctuel aléatoire',     link: '/docs/types#randomized' },
  { time: 'Fenêtre horaire',        date: 'Répéter + début/fin relatifs à l\'inscription',                      type: 'Personnel aléatoire',    link: '/docs/types#randomized' },
];

const TYPE_MATRIX_ES = [
  { time: 'Hora(s) específica(s)', date: 'Fecha(s) específica(s)',                                              type: 'Puntual',                link: '/docs/types#one-time' },
  { time: 'Hora(s) específica(s)', date: 'Repetir cada N días / días de la semana / días del mes',              type: 'Recurrente',             link: '/docs/types#repeating' },
  { time: 'Hora(s) específica(s)', date: 'Repetir + inicio/fin relativos a la inscripción',                     type: 'Personal',               link: '/docs/personal' },
  { time: 'Ventana horaria',       date: 'Fecha(s) específica(s)',                                              type: 'Puntual aleatorio',      link: '/docs/types#randomized' },
  { time: 'Ventana horaria',       date: 'Repetir + inicio/fin relativos a la inscripción',                     type: 'Personal aleatorio',     link: '/docs/types#randomized' },
];

const TYPE_MATRIX_PT = [
  { time: 'Hora(s) específica(s)', date: 'Data(s) específica(s)',                                               type: 'Pontual',                link: '/docs/types#one-time' },
  { time: 'Hora(s) específica(s)', date: 'Repetir a cada N dias / dias da semana / dias do mês',                type: 'Recorrente',             link: '/docs/types#repeating' },
  { time: 'Hora(s) específica(s)', date: 'Repetir + início/fim relativos ao cadastro',                          type: 'Pessoal',                link: '/docs/personal' },
  { time: 'Janela de tempo',       date: 'Data(s) específica(s)',                                               type: 'Pontual aleatório',      link: '/docs/types#randomized' },
  { time: 'Janela de tempo',       date: 'Repetir + início/fim relativos ao cadastro',                          type: 'Pessoal aleatório',      link: '/docs/types#randomized' },
];

function FormContentFr() {
  return (
    <>
      <p>
        Les quatre types de planning sont tous créés dans le même formulaire. L&apos;ordre des sections
        est fixe : vous progressez toujours de haut en bas. La plupart des sections ne deviennent
        pertinentes qu&apos;une fois que vous avez fait un choix à l&apos;Étape 4 — le formulaire masque
        automatiquement les sections non pertinentes.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_FR.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_FR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Contenu</h2>
      <p>
        Ces trois champs apparaissent en haut du formulaire, avant les étapes numérotées, et
        s&apos;appliquent à chaque envoi généré par ce planning.
      </p>
      <dl>
        <dt>Titre</dt>
        <dd>
          La première ligne en gras de la notification push sur l&apos;appareil du participant. Les
          notifications partageant le même titre se remplacent mutuellement dans la barre
          système plutôt que de s&apos;empiler. Utilisez un titre cohérent par étude si vous souhaitez
          qu&apos;une seule notification soit visible à la fois, ou des titres distincts si vous
          voulez qu&apos;elles coexistent.
        </dd>
        <dt>Message</dt>
        <dd>Le corps de la notification — la deuxième ligne visible dans la barre système.</dd>
        <dt>Lien web</dt>
        <dd>
          L&apos;URL qui s&apos;ouvre lorsque le participant appuie sur la notification. Il s&apos;agit
          généralement de votre lien Qualtrics, REDCap ou autre questionnaire. Omettez l&apos;URL
          si vous souhaitez une notification sans action. Voir{' '}
          <a href='/docs/placeholders'>Espaces réservés d&apos;URL</a> pour intégrer automatiquement
          des valeurs propres au participant, comme les identifiants.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Étape 1 — Fuseau horaire</h2>
      <p>
        Toutes les heures que vous saisissez aux Étapes 3, 6 et 7 sont interprétées dans ce
        fuseau horaire. Choisissez le fuseau horaire dans lequel se déroule votre étude —
        généralement celui où se trouve votre équipe de recherche.
      </p>
      <p>
        <strong>Ajuster au fuseau horaire du participant</strong> remplace le fuseau horaire de
        l&apos;étude pour chaque participant individuellement. Lorsqu&apos;il est activé, un envoi à 20h00
        se déclenche à 20h00 dans le fuseau horaire de l&apos;appareil de chaque participant plutôt
        qu&apos;à 20h00 dans le fuseau horaire de l&apos;étude. Cela fonctionne pour les participants
        actuels et futurs tant que l&apos;application Samply a enregistré leur fuseau horaire.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Étape 2 — Participants</h2>
      <p>Choisissez qui reçoit les notifications de ce planning. Vous pouvez combiner les options.</p>
      <dl>
        <dt>Tous les participants futurs (hors participants actuels)</dt>
        <dd>
          Chaque nouvelle inscription après l&apos;enregistrement de ce planning y sera automatiquement
          incluse. Indispensable pour les études à recrutement ouvert. Les participants déjà
          inscrits au moment de la création du planning ne sont <em>pas</em> inclus par cette
          seule option.
        </dd>
        <dt>Participants actuels — Tous</dt>
        <dd>Toutes les personnes inscrites au moment où vous cliquez sur Planifier les notifications.</dd>
        <dt>Participants actuels — individus spécifiques</dt>
        <dd>Choisissez dans la liste des identifiants Samply inscrits. À utiliser pour des envois ponctuels ou des tests.</dd>
        <dt>Groupes</dt>
        <dd>
          Cibler un ou plusieurs groupes nommés. Vous pouvez choisir tous les groupes ou en
          sélectionner des spécifiques. Voir <a href='/docs/groups'>Groupes</a> pour savoir
          comment les groupes sont créés.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Étape 3 — Heure</h2>
      <p>
        C&apos;est le choix le plus déterminant du formulaire. Il détermine si les heures d&apos;envoi
        sont fixes, aléatoires ou définies sur une cadence de répétition très courte.
      </p>

      <h3>Heure(s) spécifique(s)</h3>
      <p>
        Saisissez une ou plusieurs heures au format HH:MM. Chaque heure devient un envoi
        distinct pour chaque jour de déclenchement. Cliquez sur{' '}
        <strong>Ajouter une heure supplémentaire</strong> pour ajouter des heures — par exemple
        09h00, 13h00 et 18h00 pour trois envois par jour.
      </p>

      <h3>Fenêtre horaire</h3>
      <p>
        Définissez une fenêtre avec une heure de début, une heure de fin, le nombre d&apos;envois
        aléatoires à tirer dans la fenêtre et un écart minimum entre eux. Samply choisit une
        heure aléatoire différente pour chaque participant dans cette fenêtre à chaque jour
        de déclenchement.
      </p>
      <p>
        Cliquez sur <strong>Ajouter une fenêtre horaire supplémentaire</strong> pour définir
        plusieurs fenêtres par jour (ex. matin 08h00–11h00 et après-midi 14h00–17h00,
        deux notifications chacune).
      </p>

      <h3>Répéter (haute fréquence)</h3>
      <p>
        Se déclenche sur un cycle très court : toutes les minutes, toutes les 2, 5, 10, 15 ou
        30 minutes. Conçu pour les alertes en temps réel au sein d&apos;une session de laboratoire,
        et non pour les protocoles ESM quotidiens.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Étape 4 — Date</h2>
      <p>
        Combiné à votre choix de l&apos;Étape 3, ceci détermine le type de planning. Choisir une
        date spécifique produit un planning ponctuel (ou ponctuel aléatoire). Choisir une
        option de répétition révèle les étapes Début et Fin et produit un planning récurrent
        ou personnel.
      </p>

      <dl>
        <dt>Date(s) spécifique(s)</dt>
        <dd>
          Choisissez un jour, un mois et une année dans le calendrier. La notification se
          déclenche aux heures de l&apos;Étape 3 à cette date précise. Ajoutez d&apos;autres dates pour
          un planning ponctuel à plusieurs vagues.
        </dd>
        <dt>Répéter tous les N jours</dt>
        <dd>
          Tous les jours (N = 1), tous les deux jours (N = 2), tous les trois jours (N = 3),
          et ainsi de suite.
        </dd>
        <dt>Répéter certains jours de la semaine</dt>
        <dd>Choisissez n&apos;importe quelle combinaison du lundi au dimanche.</dd>
        <dt>Répéter certains jours du mois</dt>
        <dd>Choisissez n&apos;importe quelle combinaison du 1er au 31.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Étape 3 + Étape 4 = type de planning</h3>
      <table>
        <thead>
          <tr>
            <th>Étape 3 — Heure</th>
            <th>Étape 4 — Date</th>
            <th>Type résultant</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_FR.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Étape 5 — Mois</h2>
      <p>
        Visible uniquement lorsque l&apos;Étape 4 est une option de répétition. Limite le planning
        à des mois calendaires spécifiques. <strong>Répéter chaque mois</strong> (valeur par
        défaut) le laisse s&apos;exécuter toute l&apos;année. Choisir des mois spécifiques est utile pour
        les protocoles saisonniers ou les études qui marquent une pause en été et en hiver.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Étape 6 — Quand commencer</h2>
      <p>
        Visible uniquement lorsque l&apos;Étape 4 est une option de répétition. Définit la date à
        partir de laquelle le planning commence à générer des envois. Trois options :
      </p>
      <dl>
        <dt>Commencer à une date et une heure spécifiques</dt>
        <dd>
          Le planning commence au même moment absolu pour tous les participants. Utilisez cette
          option lorsque votre étude a une date de lancement fixe.
        </dd>
        <dt>Commencer après X jours / heures / minutes après l&apos;inscription (ou depuis maintenant)</dt>
        <dd>
          Une durée exacte ajoutée à l&apos;horodatage d&apos;inscription de chaque participant. La fenêtre
          du planning commence à une heure réelle différente pour chaque participant. Choisir{' '}
          <em>maintenant</em> comme référence ancre au moment où vous cliquez sur Planifier les
          notifications plutôt qu&apos;à l&apos;inscription.
        </dd>
        <dt>Commencer le Jour N après l&apos;inscription (ou depuis maintenant)</dt>
        <dd>
          Samply compte N jours calendaires à partir de la date d&apos;inscription et démarre le
          planning à minuit de ce jour. Jour 1 = le jour de l&apos;inscription lui-même. Jour 2 =
          le prochain minuit calendaire. Voir{' '}
          <a href='/docs/personal'>Planning personnel</a> pour tous les détails.
        </dd>
      </dl>

      <h2 id='stop'>Étape 7 — Quand s&apos;arrêter</h2>
      <p>
        Les mêmes trois options que pour le Début. La fin est exclusive : un planning qui
        s&apos;arrête à la fin du Jour 14 effectue son dernier envoi durant le Jour 14, et non au
        début du Jour 15.
      </p>
      <p>
        Si vous laissez la fin sur une date calendaire déjà passée, le planning ne génère aucun
        envoi. Pour les études à inscription continue, utilisez toujours une fin relative (Jour N
        ou décalage de durée) afin que les participants tardifs bénéficient de leur fenêtre de
        protocole complète.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Étape 8 — Expiration du lien</h2>
      <p>
        Contrôle combien de temps le lien du questionnaire dans la notification reste actif
        après la livraison du push. Si un participant appuie sur la notification après la
        fenêtre d&apos;expiration, le lien n&apos;ouvre plus le questionnaire.
      </p>
      <p>
        Définissez une expiration lorsque votre questionnaire doit être complété dans une
        fenêtre étroite — par exemple, lors d&apos;une évaluation momentanée où une réponse
        obsolète biaiserait les données. Laissez non défini (valeur par défaut) pour les
        questionnaires sans contrainte temporelle.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Étape 9 — Rappels</h2>
      <p>
        Les rappels sont des notifications de suivi envoyées automatiquement lorsque Samply
        n&apos;a pas détecté de complétion du questionnaire. Vous pouvez ajouter un ou plusieurs
        rappels par planning, chacun avec son propre titre, message et délai (jours + heures +
        minutes après la notification originale).
      </p>
      <p>
        Pour que les rappels fonctionnent correctement, votre outil de questionnaire doit
        notifier Samply lorsqu&apos;un participant complète le questionnaire — sinon chaque envoi
        reçoit un rappel quelle que soit la complétion réelle. Les instructions complètes de
        configuration se trouvent dans <a href='/docs/reminders'>Rappels</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Soumettre</h2>
      <p>
        Cliquez sur <strong>Planifier les notifications</strong> en bas du formulaire. Samply
        développe immédiatement le planning en une file d&apos;attente d&apos;envois — une ligne par
        participant par heure d&apos;envoi — et planifie chacun dans le gestionnaire de tâches
        en arrière-plan. Vous pouvez consulter la file d&apos;attente complète dans{' '}
        <a href='/docs/queue'>File d&apos;attente planifiée</a>.
      </p>
      <p>
        Un planning ne peut pas être modifié après soumission. Pour modifier les horaires ou
        le contenu, supprimez le planning et créez-en un nouveau. La suppression d&apos;un planning
        retire également tous ses envois en attente de la file d&apos;attente.
      </p>
    </>
  );
}

function FormContentIt() {
  return (
    <>
      <p>
        Tutti e quattro i tipi di pianificazione vengono creati nello stesso modulo. L&apos;ordine delle
        sezioni è fisso: si procede sempre dall&apos;alto verso il basso. La maggior parte delle sezioni
        diventa rilevante solo dopo aver effettuato una scelta al Passaggio 4 — il modulo nasconde
        automaticamente le sezioni non pertinenti.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_IT.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_IT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Contenuto</h2>
      <p>
        Questi tre campi compaiono in cima al modulo, prima dei passaggi numerati, e si applicano
        a ogni invio generato da questa pianificazione.
      </p>
      <dl>
        <dt>Titolo</dt>
        <dd>
          La prima riga in grassetto della notifica push sul dispositivo del partecipante. Le
          notifiche con lo stesso titolo si sostituiscono a vicenda nel vassoio di sistema invece
          di accumularsi. Utilizzare un titolo coerente per studio se si desidera che sia visibile
          una sola notifica alla volta, oppure titoli distinti se si desidera che coesistano.
        </dd>
        <dt>Messaggio</dt>
        <dd>Il corpo della notifica — la seconda riga visibile nel vassoio di sistema.</dd>
        <dt>Link web</dt>
        <dd>
          L&apos;URL che si apre quando il partecipante tocca la notifica. Di solito si tratta del
          link al sondaggio su Qualtrics, REDCap o altra piattaforma. Omettere l&apos;URL se si
          desidera una notifica senza azione. Vedere <a href='/docs/placeholders'>segnaposto URL</a>{' '}
          per incorporare automaticamente valori specifici del partecipante come gli ID.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Passaggio 1 — Fuso orario</h2>
      <p>
        Tutti gli orari inseriti nei Passaggi 3, 6 e 7 vengono interpretati in questo fuso orario.
        Scegliere il fuso orario in cui si svolge lo studio — in genere quello in cui si trova il
        gruppo di ricerca.
      </p>
      <p>
        <strong>Adatta al fuso orario del partecipante</strong> sostituisce il fuso orario dello
        studio per ciascun partecipante individualmente. Se abilitato, un invio alle 20:00 si
        attiva alle 20:00 nel fuso orario del dispositivo di ciascun partecipante anziché alle
        20:00 nel fuso orario dello studio. Funziona per i partecipanti attuali e futuri a
        condizione che l&apos;app Samply abbia registrato il loro fuso orario.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Passaggio 2 — Partecipanti</h2>
      <p>Scegliere chi riceve le notifiche da questa pianificazione. È possibile combinare le opzioni.</p>
      <dl>
        <dt>Tutti i partecipanti futuri (esclusi quelli attuali)</dt>
        <dd>
          Ogni nuova iscrizione dopo il salvataggio di questa pianificazione verrà inclusa
          automaticamente. Indispensabile per gli studi con reclutamento aperto. I partecipanti
          già iscritti al momento della creazione della pianificazione <em>non</em> vengono inclusi
          da questa opzione da sola.
        </dd>
        <dt>Partecipanti attuali — Tutti</dt>
        <dd>Tutti gli iscritti nel momento in cui si clicca su Pianifica notifiche.</dd>
        <dt>Partecipanti attuali — Individui specifici</dt>
        <dd>Selezionare dall&apos;elenco degli ID Samply iscritti. Da usare per invii singoli o test.</dd>
        <dt>Gruppi</dt>
        <dd>
          Indirizzare a uno o più gruppi con nome. È possibile scegliere tutti i gruppi o selezionarne
          di specifici. Vedere <a href='/docs/groups'>Gruppi</a> per informazioni su come vengono creati.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Passaggio 3 — Orario</h2>
      <p>
        Questa è la scelta più determinante nel modulo. Stabilisce se gli orari di invio sono
        fissi, casuali o impostati su una cadenza di ripetizione molto breve.
      </p>

      <h3>Orario specifico</h3>
      <p>
        Inserire uno o più orari in formato HH:MM. Ogni orario diventa un invio separato in ogni
        giorno di attivazione. Cliccare su <strong>Aggiungi un altro orario</strong> per aggiungere
        orari ulteriori — ad esempio 09:00, 13:00 e 18:00 per tre invii al giorno.
      </p>

      <h3>Finestra temporale</h3>
      <p>
        Definire una finestra con un orario di inizio, uno di fine, il numero di invii casuali
        da estrarre all&apos;interno della finestra e un intervallo minimo tra di essi. Samply sceglie
        un orario casuale diverso per ciascun partecipante all&apos;interno di quella finestra in ogni
        giorno di attivazione.
      </p>
      <p>
        Cliccare su <strong>Aggiungi un&apos;altra finestra temporale</strong> per definire più finestre
        al giorno (ad es. mattina 08:00–11:00 e pomeriggio 14:00–17:00, due notifiche ciascuna).
      </p>

      <h3>Ripeti (alta frequenza)</h3>
      <p>
        Si attiva su un ciclo molto breve: ogni minuto, ogni 2, 5, 10, 15 o 30 minuti. Pensato
        per avvisi in tempo reale all&apos;interno di una sessione di laboratorio, non per protocolli
        ESM quotidiani.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Passaggio 4 — Data</h2>
      <p>
        Combinato con la scelta al Passaggio 3, questo determina il tipo di pianificazione. La
        selezione di una data specifica produce una pianificazione una tantum (o una tantum
        casuale). La selezione di qualsiasi opzione di ripetizione rivela i passaggi Inizio e
        Fine e produce una pianificazione ricorrente o personalizzata.
      </p>

      <dl>
        <dt>Data/e specifica/he</dt>
        <dd>
          Scegliere un giorno, un mese e un anno del calendario. La notifica si attiva agli orari
          del Passaggio 3 in quella data esatta. Aggiungere più date per una pianificazione
          una tantum a più ondate.
        </dd>
        <dt>Ripeti ogni N giorni</dt>
        <dd>
          Ogni giorno (N = 1), ogni due giorni (N = 2), ogni tre giorni (N = 3) e così via.
        </dd>
        <dt>Ripeti in giorni della settimana specifici</dt>
        <dd>Scegliere qualsiasi combinazione dal lunedì alla domenica.</dd>
        <dt>Ripeti in giorni specifici del mese</dt>
        <dd>Scegliere qualsiasi combinazione dal 1° al 31°.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Passaggio 3 + Passaggio 4 = tipo di pianificazione</h3>
      <table>
        <thead>
          <tr>
            <th>Passaggio 3 — Orario</th>
            <th>Passaggio 4 — Data</th>
            <th>Tipo risultante</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_IT.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Passaggio 5 — Mese</h2>
      <p>
        Visibile solo quando il Passaggio 4 è un&apos;opzione di ripetizione. Limita la pianificazione
        a specifici mesi del calendario. <strong>Ripeti ogni mese</strong> (impostazione predefinita)
        consente l&apos;esecuzione per tutto l&apos;anno. La scelta di mesi specifici è utile per protocolli
        stagionali o studi che si interrompono durante l&apos;estate e l&apos;inverno.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Passaggio 6 — Quando iniziare</h2>
      <p>
        Visibile solo quando il Passaggio 4 è un&apos;opzione di ripetizione. Imposta la data a partire
        dalla quale la pianificazione inizia a generare invii. Tre opzioni:
      </p>
      <dl>
        <dt>Inizia a una data e un&apos;ora specifiche</dt>
        <dd>
          La pianificazione inizia nello stesso momento assoluto per tutti i partecipanti. Da usare
          quando lo studio ha una data di avvio fissa.
        </dd>
        <dt>Inizia dopo X giorni / ore / minuti dalla registrazione (o da adesso)</dt>
        <dd>
          Una durata esatta aggiunta al timestamp di iscrizione di ciascun partecipante. La finestra
          della pianificazione inizia a un orario diverso per ciascun partecipante. Scegliendo{" "}
          <em>adesso</em> come riferimento si ancora al momento in cui si clicca su Pianifica
          notifiche anziché all&apos;iscrizione.
        </dd>
        <dt>Inizia il giorno N dopo la registrazione (o da adesso)</dt>
        <dd>
          Samply conta N giorni di calendario dalla data di iscrizione e avvia la pianificazione
          alla mezzanotte di quel giorno. Giorno 1 = il giorno stesso dell&apos;iscrizione. Giorno 2 =
          la mezzanotte del calendario successiva. Vedere{' '}
          <a href='/docs/personal'>Pianificazione personalizzata</a> per i dettagli completi.
        </dd>
      </dl>

      <h2 id='stop'>Passaggio 7 — Quando terminare</h2>
      <p>
        Le stesse tre opzioni del passaggio Inizio. La fine è esclusiva: una pianificazione che
        termina alla fine del Giorno 14 esegue il suo ultimo invio durante il Giorno 14, non
        all&apos;inizio del Giorno 15.
      </p>
      <p>
        Se si lascia la fine su una data del calendario già passata, la pianificazione non genera
        alcun invio. Per gli studi con iscrizione a rotazione, utilizzare sempre una fine relativa
        (Giorno N o offset di durata) in modo che i partecipanti che si iscrivono in ritardo
        ricevano la loro finestra di protocollo completa.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Passaggio 8 — Scadenza del link</h2>
      <p>
        Controlla per quanto tempo il link al sondaggio nella notifica rimane attivo dopo la
        consegna del push. Se un partecipante tocca la notifica dopo la finestra di scadenza,
        il link non apre più il sondaggio.
      </p>
      <p>
        Impostare una scadenza quando il sondaggio deve essere completato entro una finestra
        ristretta — ad esempio, in una valutazione momentanea in cui una risposta obsoleta
        potrebbe distorcere i dati. Lasciare non impostato (impostazione predefinita) per i
        sondaggi senza pressione temporale.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Passaggio 9 — Promemoria</h2>
      <p>
        I promemoria sono notifiche di follow-up inviate automaticamente quando Samply non ha
        rilevato il completamento del sondaggio. È possibile aggiungere uno o più promemoria per
        pianificazione, ciascuno con il proprio titolo, messaggio e ritardo (giorni + ore + minuti
        dopo la notifica originale).
      </p>
      <p>
        Affinché i promemoria funzionino correttamente, lo strumento del sondaggio deve notificare
        Samply quando un partecipante completa il sondaggio — altrimenti ogni invio riceve un
        promemoria indipendentemente dal completamento effettivo. Le istruzioni di configurazione
        complete si trovano in <a href='/docs/reminders'>Promemoria</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Invio</h2>
      <p>
        Cliccare su <strong>Pianifica notifiche</strong> in fondo al modulo. Samply espande
        immediatamente la pianificazione in una coda di invii — una riga per partecipante per
        orario di invio — e pianifica ciascuno nel gestore di processi in background. È possibile
        esaminare la coda completa in <a href='/docs/queue'>Coda pianificata</a>.
      </p>
      <p>
        Una pianificazione non può essere modificata dopo l&apos;invio. Per modificare i tempi o il
        contenuto, eliminare la pianificazione e crearne una nuova. L&apos;eliminazione di una
        pianificazione rimuove anche tutti i suoi invii in attesa dalla coda.
      </p>
    </>
  );
}

function FormContentEs() {
  return (
    <>
      <p>
        Los cuatro tipos de calendario se crean en el mismo formulario. El orden de las secciones
        es fijo: siempre se avanza de arriba a abajo. La mayoría de las secciones solo se vuelven
        relevantes una vez que haces una elección en el Paso 4 — el formulario oculta
        automáticamente las secciones que no son pertinentes.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_ES.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_ES.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Contenido</h2>
      <p>
        Estos tres campos aparecen en la parte superior del formulario, antes de los pasos
        numerados, y se aplican a cada envío que genera este calendario.
      </p>
      <dl>
        <dt>Título</dt>
        <dd>
          La primera línea en negrita de la notificación push en el dispositivo del participante.
          Las notificaciones que comparten el mismo título se reemplazan mutuamente en la barra
          del sistema en lugar de apilarse. Usa un título coherente por estudio si quieres que
          solo haya una notificación visible a la vez, o títulos distintos si quieres que
          coexistan.
        </dd>
        <dt>Mensaje</dt>
        <dd>El cuerpo de la notificación — la segunda línea visible en la barra del sistema.</dd>
        <dt>Enlace web</dt>
        <dd>
          La URL que se abre cuando el participante pulsa la notificación. Normalmente es tu
          enlace de Qualtrics, REDCap u otra encuesta. Omite la URL si solo quieres una
          notificación sin acción. Consulta{' '}
          <a href='/docs/placeholders'>Marcadores de posición de URL</a> para incrustar
          automáticamente valores específicos del participante, como los IDs.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Paso 1 — Zona horaria</h2>
      <p>
        Todas las horas que introduces en los Pasos 3, 6 y 7 se interpretan en esta zona horaria.
        Elige la zona horaria en la que se desarrolla tu estudio — normalmente donde se encuentra
        tu grupo de investigación.
      </p>
      <p>
        <strong>Ajustar a la zona horaria del participante</strong> reemplaza la zona horaria del
        estudio para cada participante individualmente. Cuando está activado, un envío a las 20:00
        se lanza a las 20:00 en la zona horaria del dispositivo de cada participante en lugar de
        a las 20:00 en la zona horaria del estudio. Esto funciona para los participantes actuales
        y futuros siempre que la aplicación Samply haya registrado su zona horaria.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Paso 2 — Participantes</h2>
      <p>Elige quién recibe notificaciones de este calendario. Puedes combinar opciones.</p>
      <dl>
        <dt>Todos los participantes futuros (excluyendo los actuales)</dt>
        <dd>
          Cada nueva inscripción tras guardar este calendario se incluirá automáticamente en él.
          Imprescindible para estudios con reclutamiento abierto. Los participantes que ya están
          inscritos cuando creas el calendario <em>no</em> se incluyen solo con esta opción.
        </dd>
        <dt>Participantes actuales — Todos</dt>
        <dd>Todos los inscritos en el momento en que haces clic en Programar notificaciones.</dd>
        <dt>Participantes actuales — individuos específicos</dt>
        <dd>Elige de la lista de IDs de Samply inscritos. Úsalo para envíos puntuales o pruebas.</dd>
        <dt>Grupos</dt>
        <dd>
          Apunta a uno o más grupos con nombre. Puedes elegir todos los grupos o seleccionar
          algunos específicos. Consulta <a href='/docs/groups'>Grupos</a> para saber cómo se
          crean los grupos.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Paso 3 — Hora</h2>
      <p>
        Esta es la elección más determinante del formulario. Determina si las horas de envío son
        fijas, aleatorias o están configuradas en una cadencia de repetición muy corta.
      </p>

      <h3>Hora(s) específica(s)</h3>
      <p>
        Introduce una o más horas en formato HH:MM. Cada hora se convierte en un envío separado
        en cada día de activación. Haz clic en{' '}
        <strong>Añadir otra hora</strong> para agregar horas adicionales — por ejemplo, 09:00,
        13:00 y 18:00 para tres envíos al día.
      </p>

      <h3>Ventana horaria</h3>
      <p>
        Define una ventana con una hora de inicio, una hora de fin, cuántos envíos aleatorios
        se realizarán dentro de la ventana y un intervalo mínimo entre ellos. Samply elige una
        hora aleatoria diferente para cada participante dentro de esa ventana en cada día de
        activación.
      </p>
      <p>
        Haz clic en <strong>Añadir otra ventana horaria</strong> para definir múltiples ventanas
        por día (p. ej., mañana 08:00–11:00 y tarde 14:00–17:00, dos notificaciones cada una).
      </p>

      <h3>Repetir (alta frecuencia)</h3>
      <p>
        Se activa en un ciclo muy corto: cada minuto, cada 2, 5, 10, 15 o 30 minutos. Pensado
        para alertas en tiempo real dentro de una sesión de laboratorio, no para protocolos ESM
        diarios.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Paso 4 — Fecha</h2>
      <p>
        Combinado con tu elección del Paso 3, esto determina el tipo de calendario. Elegir una
        fecha específica produce un calendario puntual (o puntual aleatorio). Elegir cualquier
        opción de repetición muestra los pasos Inicio y Fin y produce un calendario recurrente
        o personal.
      </p>

      <dl>
        <dt>Fecha(s) específica(s)</dt>
        <dd>
          Elige un día, mes y año del calendario. La notificación se activa a las horas del
          Paso 3 en esa fecha exacta. Añade más fechas para un calendario puntual de múltiples
          oleadas.
        </dd>
        <dt>Repetir cada N día(s)</dt>
        <dd>
          Cada día (N = 1), cada dos días (N = 2), cada tres días (N = 3), y así sucesivamente.
        </dd>
        <dt>Repetir en días de la semana específicos</dt>
        <dd>Elige cualquier combinación de lunes a domingo.</dd>
        <dt>Repetir en días específicos del mes</dt>
        <dd>Elige cualquier combinación del 1 al 31.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Paso 3 + Paso 4 = tipo de calendario</h3>
      <table>
        <thead>
          <tr>
            <th>Paso 3 — Hora</th>
            <th>Paso 4 — Fecha</th>
            <th>Tipo resultante</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_ES.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Paso 5 — Mes</h2>
      <p>
        Solo visible cuando el Paso 4 es una opción de repetición. Limita el calendario a meses
        del calendario específicos. <strong>Repetir cada mes</strong> (el valor predeterminado)
        lo deja ejecutarse todo el año. Elegir meses específicos es útil para protocolos
        estacionales o estudios que hacen pausa en verano e invierno.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Paso 6 — Cuándo comenzar</h2>
      <p>
        Solo visible cuando el Paso 4 es una opción de repetición. Establece la fecha a partir
        de la cual el calendario comienza a generar envíos. Tres opciones:
      </p>
      <dl>
        <dt>Comenzar en una fecha y hora específicas</dt>
        <dd>
          El calendario comienza en el mismo momento absoluto para todos los participantes.
          Úsalo cuando tu estudio tiene una fecha de lanzamiento fija.
        </dd>
        <dt>Comenzar después de X días / horas / minutos desde la inscripción (o desde ahora)</dt>
        <dd>
          Una duración exacta que se añade a la marca de tiempo de incorporación de cada
          participante. La ventana del calendario comienza en una hora real diferente para cada
          participante. Elegir <em>ahora</em> como referencia ancla al momento en que haces clic
          en Programar notificaciones en lugar de a la inscripción.
        </dd>
        <dt>Comenzar en el Día N después de la inscripción (o desde ahora)</dt>
        <dd>
          Samply cuenta N días naturales desde la fecha de incorporación y comienza el calendario
          a medianoche de ese día. Día 1 = el día de incorporación en sí. Día 2 = la siguiente
          medianoche del calendario. Consulta{' '}
          <a href='/docs/personal'>Calendario personal</a> para todos los detalles.
        </dd>
      </dl>

      <h2 id='stop'>Paso 7 — Cuándo terminar</h2>
      <p>
        Las mismas tres opciones que para el Inicio. El fin es exclusivo: un calendario que
        termina al final del Día 14 realiza su último envío durante el Día 14, no al comienzo
        del Día 15.
      </p>
      <p>
        Si dejas el fin en una fecha del calendario que ya ha pasado, el calendario no genera
        ningún envío. Para estudios con inscripción continua, usa siempre un fin relativo (Día N
        o desplazamiento de duración) para que los participantes tardíos obtengan su ventana de
        protocolo completa.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Paso 8 — Caducidad del enlace</h2>
      <p>
        Controla cuánto tiempo permanece activo el enlace de la encuesta en la notificación tras
        la entrega del push. Si un participante pulsa la notificación después de la ventana de
        caducidad, el enlace ya no abre la encuesta.
      </p>
      <p>
        Establece una caducidad cuando tu encuesta debe completarse dentro de una ventana
        estrecha — por ejemplo, en una evaluación momentánea en la que una respuesta obsoleta
        sesgaría los datos. Déjalo sin configurar (el valor predeterminado) para encuestas sin
        presión de tiempo.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Paso 9 — Recordatorios</h2>
      <p>
        Los recordatorios son notificaciones de seguimiento que se envían automáticamente cuando
        Samply no ha detectado la finalización de la encuesta. Puedes añadir uno o más
        recordatorios por calendario, cada uno con su propio título, mensaje y retraso (días +
        horas + minutos después de la notificación original).
      </p>
      <p>
        Para que los recordatorios funcionen correctamente, tu herramienta de encuesta debe
        notificar a Samply cuando un participante completa la encuesta — de lo contrario, cada
        envío recibe un recordatorio independientemente de la finalización real. Las instrucciones
        completas de configuración se encuentran en <a href='/docs/reminders'>Recordatorios</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Enviar</h2>
      <p>
        Haz clic en <strong>Programar notificaciones</strong> en la parte inferior del formulario.
        Samply expande inmediatamente el calendario en una cola de envíos — una fila por
        participante por hora de envío — y programa cada uno en el gestor de tareas en segundo
        plano. Puedes revisar la cola completa en <a href='/docs/queue'>Cola programada</a>.
      </p>
      <p>
        Un calendario no puede editarse después de enviarlo. Para cambiar los horarios o el
        contenido, elimina el calendario y crea uno nuevo. Eliminar un calendario también
        elimina todos sus envíos pendientes de la cola.
      </p>
    </>
  );
}

function FormContentPt() {
  return (
    <>
      <p>
        Os quatro tipos de calendário são criados no mesmo formulário. A ordem das seções
        é fixa: você sempre avança de cima para baixo. A maioria das seções só se torna
        relevante depois que você faz uma escolha no Passo 4 — o formulário oculta
        automaticamente as seções que não são pertinentes.
      </p>

      {/* ── Section index ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '2rem 0 3.6rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {SECTIONS_PT.map((s, i) => (
          <div
            key={s.id}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < SECTIONS_PT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--coral)', flexShrink: 0, width: '10rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)' }}>{s.summary}</span>
          </div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <h2 id='content'>Conteúdo</h2>
      <p>
        Esses três campos aparecem na parte superior do formulário, antes dos passos
        numerados, e se aplicam a cada envio gerado por este calendário.
      </p>
      <dl>
        <dt>Título</dt>
        <dd>
          A primeira linha em negrito da notificação push no dispositivo do participante.
          As notificações que compartilham o mesmo título se substituem mutuamente na barra
          do sistema em vez de se acumularem. Use um título consistente por estudo se quiser
          que apenas uma notificação fique visível por vez, ou títulos distintos se quiser
          que coexistam.
        </dd>
        <dt>Mensagem</dt>
        <dd>O corpo da notificação — a segunda linha visível na barra do sistema.</dd>
        <dt>Link da web</dt>
        <dd>
          A URL que é aberta quando o participante toca a notificação. Normalmente é o
          seu link do Qualtrics, REDCap ou outra pesquisa. Omita a URL se quiser apenas
          uma notificação sem ação. Consulte{' '}
          <a href='/docs/placeholders'>Marcadores de posição de URL</a> para incorporar
          automaticamente valores específicos do participante, como IDs.
        </dd>
      </dl>

      {/* ── Timezone ──────────────────────────────────────────────────────── */}
      <h2 id='timezone'>Passo 1 — Fuso horário</h2>
      <p>
        Todas as horas que você insere nos Passos 3, 6 e 7 são interpretadas neste fuso
        horário. Escolha o fuso horário em que seu estudo está sendo realizado —
        normalmente onde fica seu grupo de pesquisa.
      </p>
      <p>
        <strong>Ajustar ao fuso horário do participante</strong> substitui o fuso horário
        do estudo para cada participante individualmente. Quando ativado, um envio às 20:00
        é disparado às 20:00 no fuso horário do dispositivo de cada participante, em vez
        de às 20:00 no fuso horário do estudo. Isso funciona para os participantes atuais
        e futuros, desde que o aplicativo Samply tenha registrado o fuso horário deles.
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2 id='audience'>Passo 2 — Participantes</h2>
      <p>Escolha quem recebe notificações deste calendário. Você pode combinar opções.</p>
      <dl>
        <dt>Todos os participantes futuros (excluindo os atuais)</dt>
        <dd>
          Cada novo cadastro após salvar este calendário será incluído automaticamente nele.
          Indispensável para estudos com recrutamento aberto. Os participantes já cadastrados
          no momento em que você cria o calendário <em>não</em> são incluídos apenas com
          esta opção.
        </dd>
        <dt>Participantes atuais — Todos</dt>
        <dd>Todos os cadastrados no momento em que você clica em Agendar notificações.</dd>
        <dt>Participantes atuais — indivíduos específicos</dt>
        <dd>Escolha da lista de IDs do Samply cadastrados. Use para envios pontuais ou testes.</dd>
        <dt>Grupos</dt>
        <dd>
          Direcione para um ou mais grupos com nome. Você pode escolher todos os grupos ou
          selecionar alguns específicos. Consulte <a href='/docs/groups'>Grupos</a> para saber
          como os grupos são criados.
        </dd>
      </dl>

      {/* ── Time ──────────────────────────────────────────────────────────── */}
      <h2 id='time'>Passo 3 — Hora</h2>
      <p>
        Esta é a escolha mais determinante do formulário. Ela determina se os horários de
        envio são fixos, aleatórios ou configurados em uma cadência de repetição muito curta.
      </p>

      <h3>Hora(s) específica(s)</h3>
      <p>
        Insira uma ou mais horas no formato HH:MM. Cada hora se torna um envio separado
        em cada dia de ativação. Clique em{' '}
        <strong>Adicionar outra hora</strong> para adicionar horas extras — por exemplo,
        09:00, 13:00 e 18:00 para três envios por dia.
      </p>

      <h3>Janela de tempo</h3>
      <p>
        Defina uma janela com uma hora de início, uma hora de fim, quantos envios aleatórios
        serão realizados dentro da janela e um intervalo mínimo entre eles. O Samply escolhe
        uma hora aleatória diferente para cada participante dentro dessa janela em cada dia
        de ativação.
      </p>
      <p>
        Clique em <strong>Adicionar outra janela de tempo</strong> para definir múltiplas
        janelas por dia (ex.: manhã 08:00–11:00 e tarde 14:00–17:00, duas notificações cada).
      </p>

      <h3>Repetir (alta frequência)</h3>
      <p>
        Ativa em um ciclo muito curto: a cada minuto, a cada 2, 5, 10, 15 ou 30 minutos.
        Destinado a alertas em tempo real dentro de uma sessão de laboratório, não para
        protocolos ESM diários.
      </p>

      {/* ── Date ──────────────────────────────────────────────────────────── */}
      <h2 id='date'>Passo 4 — Data</h2>
      <p>
        Combinado com sua escolha do Passo 3, isso determina o tipo de calendário. Escolher
        uma data específica produz um calendário pontual (ou pontual aleatório). Escolher
        qualquer opção de repetição exibe os passos Início e Fim e produz um calendário
        recorrente ou pessoal.
      </p>

      <dl>
        <dt>Data(s) específica(s)</dt>
        <dd>
          Escolha um dia, mês e ano do calendário. A notificação é ativada nos horários do
          Passo 3 nessa data exata. Adicione mais datas para um calendário pontual de
          múltiplas ondas.
        </dd>
        <dt>Repetir a cada N dia(s)</dt>
        <dd>
          Todos os dias (N = 1), a cada dois dias (N = 2), a cada três dias (N = 3), e assim
          por diante.
        </dd>
        <dt>Repetir em dias da semana específicos</dt>
        <dd>Escolha qualquer combinação de segunda a domingo.</dd>
        <dt>Repetir em dias específicos do mês</dt>
        <dd>Escolha qualquer combinação do 1 ao 31.</dd>
      </dl>

      {/* ── Type matrix ───────────────────────────────────────────────────── */}
      <h3>Passo 3 + Passo 4 = tipo de calendário</h3>
      <table>
        <thead>
          <tr>
            <th>Passo 3 — Hora</th>
            <th>Passo 4 — Data</th>
            <th>Tipo resultante</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_MATRIX_PT.map((r) => (
            <tr key={r.type}>
              <td>{r.time}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.date}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>
                <a href={r.link}>{r.type}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Month ─────────────────────────────────────────────────────────── */}
      <h2 id='month'>Passo 5 — Mês</h2>
      <p>
        Visível somente quando o Passo 4 é uma opção de repetição. Limita o calendário a
        meses específicos. <strong>Repetir todo mês</strong> (o padrão) deixa o calendário
        em execução durante o ano todo. Escolher meses específicos é útil para protocolos
        sazonais ou estudos que fazem pausa no verão e no inverno.
      </p>

      {/* ── Start / Stop ──────────────────────────────────────────────────── */}
      <h2 id='start'>Passo 6 — Quando começar</h2>
      <p>
        Visível somente quando o Passo 4 é uma opção de repetição. Define a data a partir
        da qual o calendário começa a gerar envios. Três opções:
      </p>
      <dl>
        <dt>Começar em uma data e hora específicas</dt>
        <dd>
          O calendário começa no mesmo momento absoluto para todos os participantes.
          Use isso quando seu estudo tem uma data de lançamento fixa.
        </dd>
        <dt>Começar após X dias / horas / minutos do cadastro (ou a partir de agora)</dt>
        <dd>
          Uma duração exata adicionada ao registro de data/hora de entrada de cada
          participante. A janela do calendário começa em um horário diferente para cada
          participante. Escolher <em>agora</em> como referência ancora ao momento em que
          você clica em Agendar notificações, em vez de ao cadastro.
        </dd>
        <dt>Começar no Dia N após o cadastro (ou a partir de agora)</dt>
        <dd>
          O Samply conta N dias corridos a partir da data de entrada e inicia o calendário
          à meia-noite desse dia. Dia 1 = o próprio dia de entrada. Dia 2 = a próxima
          meia-noite do calendário. Consulte{' '}
          <a href='/docs/personal'>Calendário pessoal</a> para todos os detalhes.
        </dd>
      </dl>

      <h2 id='stop'>Passo 7 — Quando terminar</h2>
      <p>
        As mesmas três opções do Início. O fim é exclusivo: um calendário que termina ao
        final do Dia 14 realiza seu último envio durante o Dia 14, não no início do Dia 15.
      </p>
      <p>
        Se você deixar o fim em uma data já passada, o calendário não gera nenhum envio.
        Para estudos com cadastro contínuo, use sempre um fim relativo (Dia N ou
        deslocamento de duração) para que os participantes tardios obtenham sua janela de
        protocolo completa.
      </p>

      {/* ── Expiry ────────────────────────────────────────────────────────── */}
      <h2 id='expiry'>Passo 8 — Expiração do link</h2>
      <p>
        Controla por quanto tempo o link da pesquisa na notificação permanece ativo após
        a entrega do push. Se um participante tocar na notificação após a janela de
        expiração, o link não abre mais a pesquisa.
      </p>
      <p>
        Defina uma expiração quando sua pesquisa precisar ser concluída dentro de uma janela
        estreita — por exemplo, em uma avaliação momentânea em que uma resposta defasada
        enviesaria os dados. Deixe sem configurar (o padrão) para pesquisas sem pressão
        de tempo.
      </p>

      {/* ── Reminders ─────────────────────────────────────────────────────── */}
      <h2 id='reminders'>Passo 9 — Lembretes</h2>
      <p>
        Os lembretes são notificações de acompanhamento enviadas automaticamente quando o
        Samply não detectou a conclusão da pesquisa. Você pode adicionar um ou mais
        lembretes por calendário, cada um com seu próprio título, mensagem e atraso (dias +
        horas + minutos após a notificação original).
      </p>
      <p>
        Para que os lembretes funcionem corretamente, sua ferramenta de pesquisa deve
        notificar o Samply quando um participante conclui a pesquisa — caso contrário, cada
        envio recebe um lembrete independentemente da conclusão real. As instruções completas
        de configuração estão em <a href='/docs/reminders'>Lembretes</a>.
      </p>

      {/* ── Submitting ────────────────────────────────────────────────────── */}
      <h2>Enviar</h2>
      <p>
        Clique em <strong>Agendar notificações</strong> na parte inferior do formulário.
        O Samply expande imediatamente o calendário em uma fila de envios — uma linha por
        participante por horário de envio — e agenda cada um no gerenciador de tarefas em
        segundo plano. Você pode revisar a fila completa em{' '}
        <a href='/docs/queue'>Fila agendada</a>.
      </p>
      <p>
        Um calendário não pode ser editado após o envio. Para alterar os horários ou o
        conteúdo, exclua o calendário e crie um novo. Excluir um calendário também remove
        todos os seus envios pendentes da fila.
      </p>
    </>
  );
}
