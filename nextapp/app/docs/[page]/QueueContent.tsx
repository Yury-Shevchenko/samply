import type { Locale } from "@/lib/i18n";

const STATUSES_EN = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Pending',
    desc: 'Scheduled and waiting. The notification will fire at the time shown in Scheduled For.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'Processing',
    desc: 'The dispatcher has picked it up and is attempting delivery right now.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Sent',
    desc: 'Delivered to the push notification service. The device will receive it as soon as it is online.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Failed',
    desc: 'Delivery attempt failed — typically because the participant uninstalled the app or their token is stale. Failed rows stay visible so you can investigate.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Cancelled',
    desc: 'Removed before it could fire. This happens when a completion event triggers reminder cancellation, or when you cancel manually.',
  },
];

const STATUSES_DE = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Ausstehend',
    desc: 'Geplant und wartend. Die Benachrichtigung wird zur unter „Geplant für" angezeigten Sendezeit ausgelöst.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'In Bearbeitung',
    desc: 'Der Dispatcher hat sie aufgenommen und versucht gerade, sie zuzustellen.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Gesendet',
    desc: 'An den Push-Benachrichtigungsdienst zugestellt. Das Gerät erhält sie, sobald es online ist.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Fehlgeschlagen',
    desc: 'Zustellungsversuch fehlgeschlagen — in der Regel weil die teilnehmende Person die App deinstalliert hat oder deren Token abgelaufen ist. Fehlgeschlagene Zeilen bleiben sichtbar, damit Sie nachforschen können.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Abgebrochen',
    desc: 'Vor der Auslösung entfernt. Dies geschieht, wenn ein Abschlussereignis den Abbruch der Erinnerung auslöst, oder wenn Sie manuell abbrechen.',
  },
];

const COLUMNS_EN = [
  { col: 'Scheduled for', desc: 'The exact date and time the notification is set to fire, shown in your browser local time.' },
  { col: 'Status',        desc: 'Current lifecycle state of this send (see table above).' },
  { col: 'Title',         desc: 'The notification title as it will appear on the participant device.' },
  { col: 'Rem.',          desc: 'Marked R if this row is a reminder send rather than the original notification.' },
  { col: 'To',            desc: 'Who this send targets. Shows group name pills when the schedule targets groups, or individual participant codes when targeting specific participants, or "all" when targeting all current participants.' },
];

const COLUMNS_DE = [
  { col: 'Geplant für', desc: 'Das genaue Datum und die Sendezeit, zu der die Benachrichtigung ausgelöst werden soll, angezeigt in Ihrer lokalen Browserzeit.' },
  { col: 'Status',      desc: 'Aktueller Lebenszyklusstatus dieser Sendung (siehe Tabelle oben).' },
  { col: 'Titel',       desc: 'Der Benachrichtigungstitel, wie er auf dem Gerät der teilnehmenden Person erscheint.' },
  { col: 'Erin.',       desc: 'Mit R markiert, wenn diese Zeile eine Erinnerungs-Sendung ist und nicht die ursprüngliche Benachrichtigung.' },
  { col: 'An',          desc: 'Wer diese Sendung empfängt. Zeigt Gruppenbezeichnungen an, wenn der Zeitplan Gruppen anvisiert, oder individuelle Teilnehmercodes bei bestimmten Teilnehmenden, oder „alle" bei allen aktuellen Teilnehmenden.' },
];

const STATUSES_NL = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'In wachtrij',
    desc: 'Gepland en wachtend. De melding wordt verstuurd op de tijd die wordt weergegeven onder Gepland voor.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'In verwerking',
    desc: 'De dispatcher heeft het opgepikt en probeert het nu te bezorgen.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Verzonden',
    desc: 'Bezorgd bij de pushmeldingsdienst. Het apparaat ontvangt het zodra het online is.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Mislukt',
    desc: 'Bezorgingspoging mislukt — doorgaans omdat de deelnemer de app heeft verwijderd of hun token verlopen is. Mislukte rijen blijven zichtbaar zodat u het kunt onderzoeken.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Geannuleerd',
    desc: 'Verwijderd voordat het kon worden verstuurd. Dit gebeurt wanneer een voltooiingsgebeurtenis annulering van de herinnering triggert, of wanneer u handmatig annuleert.',
  },
];

const COLUMNS_NL = [
  { col: 'Gepland voor', desc: 'De exacte datum en tijd waarop de melding is gepland om te worden verstuurd, weergegeven in uw lokale browsertijd.' },
  { col: 'Status',       desc: 'Huidige levenscyclusstatus van deze verzending (zie tabel hierboven).' },
  { col: 'Titel',        desc: 'De meldingstitel zoals deze op het apparaat van de deelnemer verschijnt.' },
  { col: 'Her.',         desc: 'Gemarkeerd met R als deze rij een herinneringsverzending is in plaats van de oorspronkelijke melding.' },
  { col: 'Aan',          desc: 'Wie deze verzending ontvangt. Toont groepsnaamtags wanneer het schema gericht is op groepen, of individuele deelnemerscodes bij specifieke deelnemers, of &quot;alle&quot; bij alle huidige deelnemers.' },
];

const STATUSES_RU = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Ожидает',
    desc: 'Запланировано и ожидает отправки. Уведомление будет отправлено в момент, указанный в поле "Запланировано на".',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'Обрабатывается',
    desc: 'Диспетчер принял задачу и прямо сейчас пытается доставить уведомление.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Отправлено',
    desc: 'Передано в службу push-уведомлений. Устройство получит его, как только выйдет в сеть.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Не доставлено',
    desc: 'Попытка доставки не удалась — как правило, из-за того, что участник удалил приложение или его токен устарел. Строки с ошибкой остаются видимыми, чтобы вы могли их проверить.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Отменено',
    desc: 'Удалено до отправки. Это происходит, когда событие завершения вызывает отмену напоминания, или когда вы отменяете вручную.',
  },
];

const COLUMNS_RU = [
  { col: 'Запланировано на', desc: 'Точная дата и время отправки уведомления, отображаемые в локальном времени вашего браузера.' },
  { col: 'Статус',           desc: 'Текущее состояние жизненного цикла данной отправки (см. таблицу выше).' },
  { col: 'Заголовок',        desc: 'Заголовок уведомления в том виде, в каком он отобразится на устройстве участника.' },
  { col: 'Напом.',           desc: 'Отмечается буквой Н, если данная строка является напоминанием, а не исходным уведомлением.' },
  { col: 'Кому',             desc: 'Кому адресована эта отправка. Отображает названия групп, если расписание нацелено на группы, коды отдельных участников при адресной отправке, или "всем" при отправке всем текущим участникам.' },
];

const STATUSES_ZH = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: '待发送',
    desc: '已计划，等待发送。通知将在"计划发送时间"显示的时刻触发。',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: '处理中',
    desc: '调度器已接收该任务，正在尝试立即投递。',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: '已发送',
    desc: '已投递至推送通知服务。设备上线后即可收到。',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: '发送失败',
    desc: '投递尝试失败——通常是因为参与者已卸载应用或其令牌已过期。失败的行将保持可见，以便您进行排查。',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: '已取消',
    desc: '在触发前被移除。当完成事件触发提醒取消时，或您手动取消时，会发生此情况。',
  },
];

const COLUMNS_ZH = [
  { col: '计划发送时间', desc: '通知计划触发的确切日期和时间，以您的浏览器本地时间显示。' },
  { col: '状态',         desc: '该次发送当前的生命周期状态（见上表）。' },
  { col: '标题',         desc: '将显示在参与者设备上的通知标题。' },
  { col: '提醒',         desc: '如果该行是提醒发送而非原始通知，则标记为 R。' },
  { col: '接收对象',     desc: '该次发送的目标对象。计划针对分组时显示组名标签；针对特定参与者时显示其代码；针对所有当前参与者时显示"全部"。' },
];

export default function QueueContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <QueueContentDe />;
  if (locale === "nl") return <QueueContentNl />;
  if (locale === "ru") return <QueueContentRu />;
  if (locale === "zh") return <QueueContentZh />;
  if (locale === "ko") return <QueueContentKo />;
  if (locale === "it") return <QueueContentIt />;
  if (locale === "fr") return <QueueContentFr />;
  if (locale === "es") return <QueueContentEs />;
  if (locale === "pt") return <QueueContentPt />;
  if (locale === "ja") return <QueueContentJa />;
  if (locale === "ar") return <QueueContentAr />;
  if (locale === "pl") return <QueueContentPl />;
  if (locale === "tr") return <QueueContentTr />;
  return <QueueContentEn />;
}

function QueueContentRu() {
  return (
    <>
      <p>
        Когда вы создаёте расписание, Samply не просто сохраняет правило и проверяет его во
        время выполнения. Система сразу разворачивает расписание в плоский список отдельных
        отправок — одна строка на участника на каждое время отправки — и записывает каждую
        строку в очередь. Очередь является источником истины для доставки: каждое
        уведомление, отправленное Samply, представлено в очереди как строка, и отправка
        происходит тогда и только тогда, когда для неё существует строка.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Где найти очередь</h2>
      <p>
        В вашем исследовании перейдите в раздел <strong>Расписание</strong> и нажмите{' '}
        <strong>Просмотр очереди →</strong>{" "}
        в правом верхнем углу, чтобы увидеть все отправки по всем расписаниям. Или нажмите
        ссылку рядом с отдельным определением расписания, чтобы отфильтровать только его.
        В верхней части страницы очереди отображаются определения расписаний — правила,
        по которым создавались строки. Ниже — таблица каждой отдельной отправки.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Столбцы очереди</h2>
      <table>
        <thead>
          <tr>
            <th>Столбец</th>
            <th>Содержимое</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_RU.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Статусы строк</h2>
      <p>
        Каждая строка проходит через жизненный цикл. По умолчанию отображаются все строки —
        используйте фильтры по статусу, чтобы сузить отображение до нужных вам статусов.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_RU.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_RU.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Фильтрация</h2>
      <p>
        Над таблицей очереди расположены два фильтра, которые можно комбинировать.
      </p>
      <dl>
        <dt>Фильтр по статусу</dt>
        <dd>
          Пять переключаемых кнопок: <strong>Ожидает</strong>, <strong>Обрабатывается</strong>,{' '}
          <strong>Отправлено</strong>, <strong>Не доставлено</strong> и <strong>Отменено</strong>.
          Каждая кнопка независима — нажмите, чтобы включить или выключить. Если ничего не
          выбрано, отображаются все строки. Выберите любую комбинацию для сужения
          результатов: например, включите <strong>Ожидает</strong> и{' '}
          <strong>Не доставлено</strong> вместе, чтобы увидеть всё, что ещё не доставлено.
          Ссылка <strong>сбросить</strong> появляется при активном фильтре и сбрасывает
          все фильтры по статусу одновременно.
        </dd>
        <dt>Фильтр по участнику</dt>
        <dd>
          Выпадающий список всех зарегистрированных участников по Samply ID (или их коду,
          если он задан). Выберите участника, чтобы увидеть только его отправки. Объедините
          с фильтром по статусу для ответа на вопросы вроде{' '}
          &ldquo;Какие ожидающие уведомления ещё остались у участника X?&rdquo;
        </dd>
      </dl>
      <p>
        Таблица отображает до 50 строк на страницу, соответствующих активным фильтрам.
        Используйте постраничную навигацию для просмотра больших наборов результатов или
        сужайте отображение с помощью фильтра по статусу или участнику.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Как заполняется очередь</h2>
      <p>
        Разворачивание происходит синхронно в момент нажатия кнопки{' '}
        <strong>Запланировать уведомления</strong>. Для расписания с 50 участниками и
        ежедневными отправками в течение 14 дней Samply немедленно записывает 700 строк
        (50 × 14) в очередь. Для персональных расписаний Samply также записывает строки
        для каждого нового участника, присоединившегося после создания расписания, — в
        момент его регистрации.
      </p>
      <p>
        Очередь имеет жёсткий лимит <strong>50 000 ожидающих строк на исследование</strong>.
        При достижении лимита необходимо удалить старые определения расписаний (что также
        удалит их ожидающие строки) перед добавлением новых. Отправленные и отменённые
        строки не учитываются в лимите.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Удаление расписания</h2>
      <p>
        Удаление определения расписания на вкладке Расписания одновременно удаляет определение
        и отменяет все его ожидающие строки в очереди. Уже отправленные строки не затрагиваются
        — они остаются видимыми со статусом <em>отправлено</em> и включаются в историю ответов.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>После отправки: история</h2>
      <p>
        Как только строка переходит в статус <em>отправлено</em>, событие доставки также
        записывается во вкладку <strong>История</strong> исследования.
        Журнал истории фиксирует дополнительные сигналы помимо очереди: получил ли участник
        уведомление при открытом приложении, нажал ли он на уведомление в панели, и открыл
        ли ссылку на опрос.
      </p>
      <p>
        История разбита на страницы и может быть загружена в формате CSV для автономного
        анализа. Каждая строка CSV содержит Samply ID, заголовок и текст уведомления, URL,
        серверное время отправки и временные метки событий получения, нажатия и открытия.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Напоминания в очереди</h2>
      <p>
        Если в расписании настроены напоминания, каждая исходная отправка порождает одну
        или несколько строк напоминаний с заданными вами смещениями. Эти строки помечены
        значком <strong>Н</strong> в столбце <em>Напом.</em> и имеют тот же заголовок
        расписания. Строка напоминания автоматически отменяется, как только Samply
        обнаруживает событие завершения для исходной отправки — таким образом, участники,
        вовремя прошедшие опрос, никогда не получают напоминание. Незавершённые напоминания
        отправляются в обычном порядке. Подробнее о настройке обнаружения завершений см. в{' '}
        <a href='/docs/reminders'>Напоминаниях</a>.
      </p>
    </>
  );
}

function QueueContentZh() {
  return (
    <>
      <p>
        当您提交计划时，Samply 并不只是保存一条规则并在运行时检查它。系统会立即将计划
        展开为一个扁平的逐条发送列表——每位参与者每个发送时间对应一行——并将每一行写入
        队列。队列是投递的真实来源：Samply 发送的每条通知在队列中均以一行表示，且仅当
        该行存在时才会发送。
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>在哪里查看队列</h2>
      <p>
        在您的研究中，前往<strong>计划</strong>页面，点击右上角的{' '}
        <strong>查看队列 →</strong>{" "}
        可查看所有计划的全部发送任务；也可点击某个计划定义旁的链接，仅筛选该计划的内容。
        队列页面顶部显示您的计划定义——即生成各行的规则；下方为每条发送任务的逐行表格。
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>队列列说明</h2>
      <table>
        <thead>
          <tr>
            <th>列名</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_ZH.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>行状态</h2>
      <p>
        每一行都会经历一个生命周期。默认显示所有行——使用状态筛选标签缩小显示范围。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_ZH.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_ZH.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>筛选</h2>
      <p>
        队列表格上方提供两个可组合使用的筛选器。
      </p>
      <dl>
        <dt>按状态筛选</dt>
        <dd>
          五个可切换的标签：<strong>待发送</strong>、<strong>处理中</strong>、{' '}
          <strong>已发送</strong>、<strong>发送失败</strong>和<strong>已取消</strong>。
          每个标签相互独立——点击可开启或关闭。未选择任何标签时显示所有行。选择任意
          组合可缩小范围：例如同时开启<strong>待发送</strong>和{' '}
          <strong>发送失败</strong>，即可查看所有尚未成功投递的任务。当有标签处于激活
          状态时，会出现<strong>重置</strong>链接，点击可一次性清除所有状态筛选。
        </dd>
        <dt>按参与者筛选</dt>
        <dd>
          下拉列表列出所有已注册参与者的 Samply ID（若已设置代码则显示代码）。选择某位
          参与者可仅查看其发送任务。与状态筛选组合使用，可回答诸如
          &ldquo;参与者 X 还有哪些待发送的通知？&rdquo;之类的问题。
        </dd>
      </dl>
      <p>
        表格每页最多显示 50 行匹配当前筛选条件的结果。使用分页浏览较大的结果集，或通过
        状态或参与者筛选器缩小显示范围。
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>队列如何填充</h2>
      <p>
        展开操作在您点击<strong>计划通知</strong>的瞬间同步完成。对于一个包含 50 位参与者、
        连续 14 天每日发送的计划，Samply 会立即将 700 行（50 × 14）写入队列。对于个人
        计划，Samply 还会在计划创建后每位新参与者注册时，为其即时写入对应的行。
      </p>
      <p>
        队列有严格限制：<strong>每个研究最多 50,000 条待发送行</strong>。达到上限后，
        必须先删除旧的计划定义（同时删除其待发送行），才能添加新定义。已发送和已取消的
        行不计入上限。
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>删除计划</h2>
      <p>
        在计划选项卡中删除计划定义，将同时删除该定义并取消其所有待发送队列行。已发送的
        行不受影响——它们仍以<em>已发送</em>状态可见，并包含在回答历史中。
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>发送后：历史记录</h2>
      <p>
        一旦某行转为<em>已发送</em>状态，投递事件也会同步写入研究的{' '}
        <strong>历史</strong> 选项卡。历史日志除队列信息外还记录额外信号：参与者在应用打开时是否收到
        通知、是否点击了通知栏，以及是否打开了问卷链接。
      </p>
      <p>
        历史记录支持分页，并可下载为 CSV 进行离线分析。CSV 中每行包含 Samply ID、通知
        标题和正文、URL、服务器端发送时间，以及接收、点击和打开事件的各自时间戳。
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>队列中的提醒</h2>
      <p>
        当计划配置了提醒时，每条原始发送任务会按您设定的偏移量生成一条或多条提醒行。
        这些行在<em>提醒</em>列中标有 <strong>R</strong> 徽标，并共享相同的计划标题。
        一旦 Samply 检测到原始发送的完成事件，提醒行将自动取消——因此按时完成问卷的
        参与者永远不会收到提醒。未完成的提醒将正常发送。完成检测的设置方法请参阅{' '}
        <a href='/docs/reminders'>提醒</a>。
      </p>
    </>
  );
}

function QueueContentEn() {
  return (
    <>
      <p>
        When you submit a schedule, Samply does not simply store a rule and check it at
        runtime. It immediately expands the schedule into a flat list of individual sends
        — one row per participant per send time — and writes each row into the queue.
        The queue is the source of truth for delivery — every notification Samply sends is
        represented as a row in the queue, and a send happens if and only if a row exists for it.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Where to find the queue</h2>
      <p>
        From your study, go to <strong>Schedule</strong> and click <strong>View queue →</strong>{" "}
        in the top-right corner to see all sends across every schedule, or click the link next to
        any individual schedule definition to filter to that schedule only. The top of the queue
        page shows your schedule definitions — the rules that generated the rows. Below that is the
        row-by-row table of every individual send.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Queue columns</h2>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>What it contains</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_EN.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Row statuses</h2>
      <p>
        Every row moves through a lifecycle. By default all rows are shown — use the status
        filter pills to narrow the view to the statuses you care about.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_EN.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_EN.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtering</h2>
      <p>
        Two filters appear above the queue table and can be combined.
      </p>
      <dl>
        <dt>Filter by status</dt>
        <dd>
          Five toggleable pills: <strong>Pending</strong>, <strong>Processing</strong>,{' '}
          <strong>Sent</strong>, <strong>Failed</strong>, and <strong>Cancelled</strong>.
          Each pill is independent — click to turn it on or off. With nothing selected, all
          rows are shown. Select any combination to narrow the view: for example, toggle{' '}
          <strong>Pending</strong> and <strong>Failed</strong> together to see everything
          still awaiting delivery. A <strong>clear</strong> link appears whenever any pill
          is active and resets all status filters at once.
        </dd>
        <dt>Filter by participant</dt>
        <dd>
          A dropdown listing every enrolled participant by Samply ID (or their code if one was
          set). Select a participant to see only their sends. Combine with the status filter to
          answer questions like &ldquo;what pending notifications does participant X still have?&rdquo;
        </dd>
      </dl>
      <p>
        The table shows up to 50 rows per page matching the active filters. Use pagination to
        move through larger result sets, or narrow the view with the status or participant filter.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>How the queue is populated</h2>
      <p>
        Expansion happens synchronously at the moment you click <strong>Schedule
        notifications</strong>. For a schedule targeting 50 participants with daily sends over
        14 days, Samply writes 700 rows (50 × 14) into the queue immediately. For personal
        schedules, Samply also writes rows for every new participant who joins after the
        schedule is created, at the moment they enrol.
      </p>
      <p>
        The queue has a hard limit of <strong>50,000 pending rows per study</strong>. If you
        hit this limit, you must delete old schedule definitions (which removes their pending
        rows) before adding new ones. Sent and cancelled rows do not count toward the limit.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Deleting a schedule</h2>
      <p>
        Deleting a schedule definition from the Schedules tab removes the definition and
        cancels all its pending queue rows in one action. Rows that have already been sent
        are not affected — they remain visible with status <em>sent</em> and are included
        in the response history.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>After a send: the history</h2>
      <p>
        Once a row transitions to <em>sent</em>, the delivery event is also written to the
        study&apos;s <strong>History</strong> tab. The history log records additional
        signal beyond the queue: whether the participant received the notification while the
        app was open, whether they tapped the notification bar, and whether they opened the
        survey link.
      </p>
      <p>
        The history is paginated and can be downloaded as a CSV for offline analysis. Each
        row in the CSV includes the Samply ID, notification title and message, the URL,
        server-side send time, and the per-event timestamps for receipt, tap, and open.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Reminders in the queue</h2>
      <p>
        When a schedule has reminders configured, each original send spawns one or more
        reminder rows at the offsets you defined. These rows are marked with an{' '}
        <strong>R</strong> badge in the <em>Rem.</em> column and share the same schedule title. A reminder row is
        automatically cancelled as soon as Samply detects a completion event for the
        original send — so participants who complete the survey on time never see the
        reminder. Uncompleted reminders fire normally. See{' '}
        <a href='/docs/reminders'>Reminders</a> for the completion-detection setup.
      </p>
    </>
  );
}

function QueueContentNl() {
  return (
    <>
      <p>
        Wanneer u een schema indient, slaat Samply niet simpelweg een regel op en controleert
        deze tijdens runtime. Het breidt het schema onmiddellijk uit naar een platte lijst van
        afzonderlijke verzendingen — één rij per deelnemer per verzendtijd — en schrijft elke
        rij naar de wachtrij. De wachtrij is de bron van waarheid voor bezorging — elke melding
        die Samply verstuurt, is vertegenwoordigd als een rij in de wachtrij, en een verzending
        vindt alleen en uitsluitend plaats als er een rij voor bestaat.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Waar u de wachtrij vindt</h2>
      <p>
        Ga vanuit uw studie naar <strong>Schema</strong> en klik op{' '}
        <strong>Wachtrij bekijken →</strong>{" "}
        in de rechterbovenhoek om alle verzendingen van elk schema te zien, of klik op de link
        naast een individuele schemadefinitie om alleen op dat schema te filteren. Bovenaan de
        wachtrijpagina staan uw schemadefinities — de regels die de rijen hebben gegenereerd.
        Daaronder staat de rij-voor-rij tabel van elke afzonderlijke verzending.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Wachtrijkolommen</h2>
      <table>
        <thead>
          <tr>
            <th>Kolom</th>
            <th>Wat het bevat</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_NL.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Rijstatussen</h2>
      <p>
        Elke rij doorloopt een levenscyclus. Standaard worden alle rijen weergegeven — gebruik de
        statusfilterknopen om de weergave te beperken tot de statussen die u wilt bekijken.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_NL.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_NL.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filteren</h2>
      <p>
        Er verschijnen twee filters boven de wachtrijtabel en deze kunnen worden gecombineerd.
      </p>
      <dl>
        <dt>Filteren op status</dt>
        <dd>
          Vijf schakelbare knopen: <strong>In wachtrij</strong>, <strong>In verwerking</strong>,{' '}
          <strong>Verzonden</strong>, <strong>Mislukt</strong> en <strong>Geannuleerd</strong>.
          Elke knop is onafhankelijk — klik om in of uit te schakelen. Wanneer niets is
          geselecteerd, worden alle rijen weergegeven. Selecteer een combinatie om de weergave
          te beperken: schakel bijvoorbeeld <strong>In wachtrij</strong> en{' '}
          <strong>Mislukt</strong> samen in om alles te zien dat nog op bezorging wacht. Er
          verschijnt een <strong>wissen</strong>-link zodra een knop actief is en reset alle
          statusfilters tegelijk.
        </dd>
        <dt>Filteren op deelnemer</dt>
        <dd>
          Een dropdown die alle ingeschreven deelnemers op Samply-ID (of hun code als er een is
          ingesteld) weergeeft. Selecteer een deelnemer om alleen hun verzendingen te zien.
          Combineer dit met het statusfilter om vragen te beantwoorden zoals{' '}
          &ldquo;Welke openstaande meldingen heeft deelnemer X nog?&rdquo;
        </dd>
      </dl>
      <p>
        De tabel toont maximaal 50 rijen per pagina die overeenkomen met de actieve filters.
        Gebruik paginering om door grotere resultatensets te bladeren, of beperk de weergave
        met het status- of deelnemerfilter.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Hoe de wachtrij wordt gevuld</h2>
      <p>
        Uitbreiding vindt synchroon plaats op het moment dat u op{' '}
        <strong>Schema meldingen</strong> klikt. Voor een schema gericht op 50 deelnemers met
        dagelijkse verzendingen over 14 dagen schrijft Samply onmiddellijk 700 rijen (50 × 14)
        naar de wachtrij. Voor persoonlijke schema&#39;s schrijft Samply ook rijen voor elke nieuwe
        deelnemer die na het aanmaken van het schema aanmeldt, op het moment van inschrijving.
      </p>
      <p>
        De wachtrij heeft een harde limiet van <strong>50.000 openstaande rijen per studie</strong>.
        Als u deze limiet bereikt, moet u oude schemadefinities verwijderen (waardoor hun openstaande
        rijen worden verwijderd) voordat u nieuwe toevoegt. Verzonden en geannuleerde rijen tellen
        niet mee voor de limiet.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Een schema verwijderen</h2>
      <p>
        Het verwijderen van een schemadefinitie op het tabblad Schema&#39;s verwijdert de definitie
        en annuleert alle openstaande wachtrij-rijen in één actie. Rijen die al zijn verzonden,
        worden niet beïnvloed — ze blijven zichtbaar met status <em>verzonden</em> en zijn
        opgenomen in de responsgeschiedenis.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Na een verzending: de geschiedenis</h2>
      <p>
        Zodra een rij overgaat naar <em>verzonden</em>, wordt de bezorgingsgebeurtenis ook
        geschreven naar het <strong>Geschiedenis</strong>-tabblad van de studie. Het
        geschiedenis­logboek registreert aanvullende signalen naast de wachtrij: of de deelnemer
        de melding heeft ontvangen terwijl de app open was, of ze op de meldingsbalk hebben
        getikt, en of ze de enquêtelink hebben geopend.
      </p>
      <p>
        De geschiedenis is gepagineerd en kan worden gedownload als CSV voor offline analyse.
        Elke rij in de CSV bevat het Samply-ID, meldingstitel en -bericht, de URL,
        server­zijdige verzendtijd en de per-gebeurtenis tijdstempels voor ontvangst, tikken
        en openen.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Herinneringen in de wachtrij</h2>
      <p>
        Wanneer een schema herinneringen heeft geconfigureerd, genereert elke oorspronkelijke
        verzending een of meer herinneringsrijen op de door u gedefinieerde offsets. Deze rijen
        zijn gemarkeerd met een <strong>R</strong>-badge in de kolom <em>Her.</em> en delen
        dezelfde schematitel. Een herinneringsrij wordt automatisch geannuleerd zodra Samply
        een voltooiingsgebeurtenis detecteert voor de oorspronkelijke verzending — zodat
        deelnemers die de enquête op tijd voltooien de herinnering nooit zien. Niet voltooide
        herinneringen worden normaal verstuurd. Zie{' '}
        <a href='/docs/reminders'>Herinneringen</a> voor de instelling van voltooiingsdetectie.
      </p>
    </>
  );
}

function QueueContentDe() {
  return (
    <>
      <p>
        Wenn Sie einen Zeitplan einreichen, speichert Samply nicht einfach eine Regel und prüft
        sie zur Laufzeit. Es erweitert den Zeitplan sofort in eine flache Liste einzelner Sendungen
        — eine Zeile pro teilnehmende Person pro Sendezeit — und schreibt jede Zeile in die
        Warteschlange. Die Warteschlange ist die maßgebliche Quelle für die Zustellung — jede
        Benachrichtigung, die Samply sendet, ist als Zeile in der Warteschlange dargestellt, und
        eine Sendung erfolgt genau dann, wenn eine Zeile dafür existiert.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Wo die Warteschlange zu finden ist</h2>
      <p>
        Gehen Sie in Ihrer Studie zu <strong>Zeitplan</strong> und klicken Sie auf{' '}
        <strong>Warteschlange anzeigen →</strong>{" "}
        in der oberen rechten Ecke, um alle Sendungen aller Zeitpläne zu sehen, oder klicken
        Sie auf den Link neben einer einzelnen Zeitplandefinition, um nur auf diesen Zeitplan
        zu filtern. Oben auf der Warteschlangenseite befinden sich Ihre Zeitplandefinitionen
        — die Regeln, die die Zeilen erzeugt haben. Darunter befindet sich die zeilenweise
        Tabelle aller einzelnen Sendungen.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Warteschlangenspalten</h2>
      <table>
        <thead>
          <tr>
            <th>Spalte</th>
            <th>Was sie enthält</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_DE.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Zeilenstatus</h2>
      <p>
        Jede Zeile durchläuft einen Lebenszyklus. Standardmäßig werden alle Zeilen angezeigt —
        verwenden Sie die Status-Filterpillen, um die Ansicht auf die gewünschten Status einzuschränken.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_DE.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_DE.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtern</h2>
      <p>
        Zwei Filter erscheinen über der Warteschlangentabelle und können kombiniert werden.
      </p>
      <dl>
        <dt>Nach Status filtern</dt>
        <dd>
          Fünf umschaltbare Pillen: <strong>Ausstehend</strong>, <strong>In Bearbeitung</strong>,{' '}
          <strong>Gesendet</strong>, <strong>Fehlgeschlagen</strong> und <strong>Abgebrochen</strong>.
          Jede Pille ist unabhängig — klicken Sie, um sie ein- oder auszuschalten. Wenn nichts
          ausgewählt ist, werden alle Zeilen angezeigt. Wählen Sie eine Kombination, um die Ansicht
          einzuschränken: Schalten Sie zum Beispiel <strong>Ausstehend</strong> und{' '}
          <strong>Fehlgeschlagen</strong> zusammen um, um alles zu sehen, das noch auf die Zustellung
          wartet. Ein <strong>Löschen</strong>-Link erscheint, wenn eine Pille aktiv ist, und setzt
          alle Statusfilter auf einmal zurück.
        </dd>
        <dt>Nach Teilnehmenden filtern</dt>
        <dd>
          Ein Dropdown, das alle eingeschriebenen Teilnehmenden nach Samply-ID (oder deren Code,
          falls einer gesetzt wurde) auflistet. Wählen Sie eine teilnehmende Person, um nur deren
          Sendungen zu sehen. Kombinieren Sie dies mit dem Statusfilter, um Fragen zu beantworten
          wie &ldquo;Welche ausstehenden Benachrichtigungen hat Teilnehmende X noch?&rdquo;
        </dd>
      </dl>
      <p>
        Die Tabelle zeigt bis zu 50 Zeilen pro Seite, die den aktiven Filtern entsprechen.
        Verwenden Sie die Seitennavigation, um durch größere Ergebnismengen zu blättern, oder
        schränken Sie die Ansicht mit dem Status- oder Teilnehmerfilter ein.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Wie die Warteschlange befüllt wird</h2>
      <p>
        Die Erweiterung erfolgt synchron in dem Moment, in dem Sie auf{' '}
        <strong>Benachrichtigungen planen</strong> klicken. Für einen Zeitplan mit 50 Teilnehmenden
        und täglichen Sendungen über 14 Tage schreibt Samply sofort 700 Zeilen (50 × 14) in die
        Warteschlange. Für persönliche Zeitpläne schreibt Samply auch Zeilen für jede neue
        teilnehmende Person, die nach der Erstellung des Zeitplans beitritt, zum Zeitpunkt ihrer
        Einschreibung.
      </p>
      <p>
        Die Warteschlange hat ein hartes Limit von <strong>50.000 ausstehenden Zeilen pro Studie</strong>.
        Wenn Sie dieses Limit erreichen, müssen Sie alte Zeitplandefinitionen löschen (wodurch deren
        ausstehende Zeilen entfernt werden), bevor Sie neue hinzufügen. Gesendete und abgebrochene
        Zeilen zählen nicht zum Limit.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Einen Zeitplan löschen</h2>
      <p>
        Das Löschen einer Zeitplandefinition auf der Registerkarte „Zeitpläne" entfernt die
        Definition und bricht alle ausstehenden Warteschlangen-Zeilen in einer Aktion ab. Bereits
        gesendete Zeilen sind nicht betroffen — sie bleiben mit dem Status <em>gesendet</em>{' '}
        sichtbar und sind im Antwortverlauf enthalten.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Nach einer Sendung: der Verlauf</h2>
      <p>
        Sobald eine Zeile zu <em>gesendet</em> wechselt, wird das Zustellungsereignis auch in den
        <strong>Verlauf</strong>-Tab der Studie geschrieben. Das Verlaufsprotokoll
        zeichnet zusätzliche Signale über die Warteschlange hinaus auf: ob die teilnehmende Person
        die Benachrichtigung erhalten hat, während die App geöffnet war, ob sie auf die
        Benachrichtigungsleiste getippt hat und ob sie den Befragungslink geöffnet hat.
      </p>
      <p>
        Der Verlauf ist seitenweise aufgeteilt und kann als CSV für die Offline-Analyse heruntergeladen
        werden. Jede Zeile im CSV enthält die Samply-ID, Benachrichtigungstitel und -nachricht, die URL,
        die serverseitige Sendezeit und die ereignisspezifischen Zeitstempel für Empfang, Tippen und Öffnen.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Erinnerungen in der Warteschlange</h2>
      <p>
        Wenn ein Zeitplan Erinnerungen konfiguriert hat, erzeugt jede ursprüngliche Sendung eine
        oder mehrere Erinnerungs-Zeilen zu den von Ihnen definierten Versätzen. Diese Zeilen sind
        mit einem <strong>R</strong>-Abzeichen in der Spalte <em>Erin.</em> markiert und teilen
        denselben Zeitplantitel. Eine Erinnerungs-Zeile wird automatisch abgebrochen, sobald
        Samply ein Abschlussereignis für die ursprüngliche Sendung erkennt — so sehen Teilnehmende,
        die die Befragung rechtzeitig abschließen, die Erinnerung nie. Nicht abgeschlossene
        Erinnerungen werden normal gesendet. Siehe{' '}
        <a href='/docs/reminders'>Erinnerungen</a> für die Einrichtung der Abschlusserkennung.
      </p>
    </>
  );
}

const STATUSES_KO = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: '대기 중',
    desc: '예약되어 대기 중입니다. 알림은 예약된 시간에 전송됩니다.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: '처리 중',
    desc: '디스패처가 이를 수령하여 지금 즉시 전달을 시도하고 있습니다.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: '전송됨',
    desc: '푸시 알림 서비스에 전달되었습니다. 기기가 온라인 상태가 되는 즉시 수신됩니다.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: '실패',
    desc: '전달 시도 실패 — 일반적으로 참여자가 앱을 삭제했거나 토큰이 만료된 경우입니다. 실패한 행은 조사할 수 있도록 계속 표시됩니다.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: '취소됨',
    desc: '전송 전에 제거되었습니다. 완료 이벤트가 리마인더 취소를 트리거하거나 수동으로 취소한 경우 발생합니다.',
  },
];

const COLUMNS_KO = [
  { col: '예약 시간', desc: '알림이 전송될 정확한 날짜와 시간으로, 브라우저 현지 시간으로 표시됩니다.' },
  { col: '상태',     desc: '이 전송의 현재 생명 주기 상태입니다 (위 표 참조).' },
  { col: '제목',     desc: '참여자 기기에 표시될 알림 제목입니다.' },
  { col: '리마인더', desc: '이 행이 원래 알림이 아닌 리마인더 전송인 경우 R로 표시됩니다.' },
  { col: '수신 대상', desc: '이 전송의 대상. 일정이 그룹을 대상으로 할 때 그룹 이름 태그를 표시하고, 특정 참여자를 대상으로 할 때 개인 참여자 코드를, 모든 현재 참여자를 대상으로 할 때 "전체"를 표시합니다.' },
];

const STATUSES_IT = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'In attesa',
    desc: 'Pianificato e in attesa. La notifica verrà inviata all\'orario indicato in Pianificato per.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'In elaborazione',
    desc: 'Il dispatcher lo ha preso in carico e sta tentando la consegna in questo momento.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Inviato',
    desc: 'Consegnato al servizio di notifica push. Il dispositivo lo riceverà non appena sarà online.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Non riuscito',
    desc: 'Tentativo di consegna fallito — in genere perché il partecipante ha disinstallato l\'app o il token non è più valido. Le righe non riuscite rimangono visibili per consentire l\'analisi.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Annullato',
    desc: 'Rimosso prima dell\'invio. Ciò accade quando un evento di completamento attiva l\'annullamento del promemoria, oppure quando si annulla manualmente.',
  },
];

const COLUMNS_IT = [
  { col: 'Pianificato per', desc: 'La data e l\'ora esatte in cui la notifica è impostata per l\'invio, visualizzate nell\'orario locale del browser.' },
  { col: 'Stato',           desc: 'Stato corrente del ciclo di vita di questo invio (vedere la tabella sopra).' },
  { col: 'Titolo',          desc: 'Il titolo della notifica come apparirà sul dispositivo del partecipante.' },
  { col: 'Prom.',           desc: 'Contrassegnato con R se questa riga è un invio di promemoria anziché la notifica originale.' },
  { col: 'A',               desc: 'Il destinatario di questo invio. Mostra etichette con i nomi dei gruppi quando la pianificazione è indirizzata a gruppi, o codici di partecipanti individuali per destinatari specifici, oppure "tutti" per tutti i partecipanti attuali.' },
];

function QueueContentKo() {
  return (
    <>
      <p>
        일정을 제출할 때 Samply는 단순히 규칙을 저장하고 런타임에 확인하는 것이 아닙니다.
        즉시 일정을 개별 전송의 평면 목록으로 확장합니다 — 참여자별, 전송 시간별 한 행 — 그리고
        각 행을 큐에 씁니다. 큐는 전달의 신뢰 원천입니다: Samply가 보내는 모든 알림은 큐의 행으로
        표현되며, 해당 행이 존재하는 경우에만 전송됩니다.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>큐를 찾는 방법</h2>
      <p>
        연구에서 <strong>일정</strong>으로 이동하고 오른쪽 상단의{' '}
        <strong>큐 보기 →</strong>{" "}
        를 클릭하여 모든 일정의 전송을 확인하거나, 개별 일정 정의 옆의 링크를 클릭하여 해당
        일정만 필터링할 수 있습니다. 큐 페이지 상단에는 행을 생성한 규칙인 일정 정의가
        표시됩니다. 그 아래에는 모든 개별 전송의 행별 테이블이 있습니다.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>큐 열</h2>
      <table>
        <thead>
          <tr>
            <th>열</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_KO.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>행 상태</h2>
      <p>
        모든 행은 생명 주기를 거칩니다. 기본적으로 모든 행이 표시되며 — 상태 필터 버튼을
        사용하여 원하는 상태로 좁힐 수 있습니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_KO.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_KO.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>필터링</h2>
      <p>
        큐 테이블 위에 두 개의 필터가 표시되며 결합할 수 있습니다.
      </p>
      <dl>
        <dt>상태별 필터</dt>
        <dd>
          다섯 개의 토글 가능한 버튼: <strong>대기 중</strong>, <strong>처리 중</strong>,{' '}
          <strong>전송됨</strong>, <strong>실패</strong>, <strong>취소됨</strong>.
          각 버튼은 독립적입니다 — 클릭하여 켜거나 끌 수 있습니다. 아무것도 선택하지 않으면
          모든 행이 표시됩니다. 임의의 조합을 선택하여 범위를 좁히십시오: 예를 들어{' '}
          <strong>대기 중</strong>과 <strong>실패</strong>를 함께 켜면 아직 전달되지 않은
          모든 항목을 볼 수 있습니다. 버튼이 활성화되어 있으면 <strong>초기화</strong> 링크가
          나타나며 모든 상태 필터를 한 번에 재설정합니다.
        </dd>
        <dt>참여자별 필터</dt>
        <dd>
          Samply ID(코드가 설정된 경우 해당 코드)로 등록된 모든 참여자를 나열하는 드롭다운.
          참여자를 선택하면 해당 참여자의 전송만 표시됩니다. 상태 필터와 결합하여{' '}
          &ldquo;참여자 X에게 아직 남아 있는 대기 중인 알림은 무엇인가요?&rdquo;와 같은 질문에
          답할 수 있습니다.
        </dd>
      </dl>
      <p>
        테이블은 활성 필터에 일치하는 페이지당 최대 50개의 행을 표시합니다. 더 큰 결과 세트를
        탐색하려면 페이지네이션을 사용하거나 상태 또는 참여자 필터로 범위를 좁히십시오.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>큐가 채워지는 방식</h2>
      <p>
        확장은 <strong>알림 일정 설정</strong>을 클릭하는 순간 동기적으로 발생합니다. 50명의
        참여자를 대상으로 14일간 매일 전송하는 일정의 경우 Samply는 즉시 700개의 행
        (50 × 14)을 큐에 씁니다. 개인화 일정의 경우 Samply는 일정이 생성된 후 참여하는
        모든 새 참여자에 대해서도 등록 시점에 행을 씁니다.
      </p>
      <p>
        큐는 <strong>연구당 50,000개의 대기 중인 행</strong>이라는 엄격한 제한이 있습니다.
        이 제한에 도달하면 새 항목을 추가하기 전에 이전 일정 정의를 삭제해야 합니다(이렇게 하면
        해당 대기 중인 행도 제거됩니다). 전송됨 및 취소됨 행은 제한에 포함되지 않습니다.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>일정 삭제</h2>
      <p>
        일정 탭에서 일정 정의를 삭제하면 정의가 제거되고 모든 대기 중인 큐 행이 한 번에 취소됩니다.
        이미 전송된 행은 영향을 받지 않습니다 — <em>전송됨</em> 상태로 계속 표시되고
        응답 기록에 포함됩니다.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>전송 후: 기록</h2>
      <p>
        행이 <em>전송됨</em>으로 전환되면 전달 이벤트도 연구의 <strong>기록</strong> 탭에
        기록됩니다. 기록 로그는 큐 이외의 추가 신호를 기록합니다: 앱이 열려 있는
        동안 참여자가 알림을 받았는지, 알림 표시줄을 탭했는지, 설문 링크를 열었는지 여부.
      </p>
      <p>
        기록은 페이지로 나뉘며 오프라인 분석을 위해 CSV로 다운로드할 수 있습니다. CSV의 각
        행에는 Samply ID, 알림 제목 및 메시지, URL, 서버 측 전송 시간, 수신·탭·열기 이벤트별
        타임스탬프가 포함됩니다.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>큐의 리마인더</h2>
      <p>
        일정에 리마인더가 구성되어 있으면 각 원래 전송은 정의한 오프셋에서 하나 이상의 리마인더
        행을 생성합니다. 이 행들은 <em>리마인더</em> 열에 <strong>R</strong> 배지로 표시되며
        동일한 일정 제목을 공유합니다. Samply가 원래 전송에 대한 완료 이벤트를 감지하는 즉시
        리마인더 행이 자동으로 취소됩니다 — 따라서 제때 설문을 완료한 참여자는 리마인더를
        받지 않습니다. 미완료 리마인더는 정상적으로 전송됩니다. 완료 감지 설정은{' '}
        <a href='/docs/reminders'>리마인더</a>를 참조하십시오.
      </p>
    </>
  );
}

function QueueContentIt() {
  return (
    <>
      <p>
        Quando si invia una pianificazione, Samply non si limita a memorizzare una regola e
        verificarla in fase di esecuzione. Espande immediatamente la pianificazione in un elenco
        piatto di invii individuali — una riga per partecipante per orario di invio — e scrive
        ogni riga nella coda. La coda è la fonte di verità per la consegna: ogni notifica inviata
        da Samply è rappresentata come una riga nella coda, e un invio avviene se e solo se esiste
        una riga corrispondente.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Dove trovare la coda</h2>
      <p>
        Dallo studio, andare su <strong>Pianificazione</strong> e cliccare su{' '}
        <strong>Visualizza coda →</strong>{" "}
        nell&apos;angolo in alto a destra per vedere tutti gli invii di ogni pianificazione, oppure
        cliccare sul link accanto a una singola definizione di pianificazione per filtrare solo
        quella pianificazione. La parte superiore della pagina della coda mostra le definizioni
        delle pianificazioni — le regole che hanno generato le righe. Sotto si trova la tabella
        riga per riga di ogni singolo invio.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Colonne della coda</h2>
      <table>
        <thead>
          <tr>
            <th>Colonna</th>
            <th>Contenuto</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_IT.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Stati delle righe</h2>
      <p>
        Ogni riga attraversa un ciclo di vita. Per impostazione predefinita vengono mostrate
        tutte le righe — utilizzare i filtri di stato per restringere la visualizzazione agli
        stati desiderati.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_IT.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_IT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtraggio</h2>
      <p>
        Due filtri compaiono sopra la tabella della coda e possono essere combinati.
      </p>
      <dl>
        <dt>Filtra per stato</dt>
        <dd>
          Cinque pulsanti attivabili: <strong>In attesa</strong>, <strong>In elaborazione</strong>,{' '}
          <strong>Inviato</strong>, <strong>Non riuscito</strong> e <strong>Annullato</strong>.
          Ogni pulsante è indipendente — cliccare per attivarlo o disattivarlo. Senza nessuna
          selezione, vengono mostrate tutte le righe. Selezionare qualsiasi combinazione per
          restringere la visualizzazione: ad esempio, attivare <strong>In attesa</strong> e{' '}
          <strong>Non riuscito</strong> insieme per vedere tutto ciò che è ancora in attesa di
          consegna. Un link <strong>reimposta</strong> appare quando un pulsante è attivo e
          reimposta tutti i filtri di stato contemporaneamente.
        </dd>
        <dt>Filtra per partecipante</dt>
        <dd>
          Un menu a discesa che elenca tutti i partecipanti iscritti per ID Samply (o il loro
          codice se impostato). Selezionare un partecipante per vedere solo i suoi invii.
          Combinare con il filtro di stato per rispondere a domande come{' '}
          &ldquo;quali notifiche in attesa ha ancora il partecipante X?&rdquo;
        </dd>
      </dl>
      <p>
        La tabella mostra fino a 50 righe per pagina corrispondenti ai filtri attivi. Utilizzare
        la paginazione per scorrere set di risultati più grandi, o restringere la visualizzazione
        con il filtro di stato o partecipante.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Come viene popolata la coda</h2>
      <p>
        L&apos;espansione avviene in modo sincrono nel momento in cui si clicca su{' '}
        <strong>Pianifica notifiche</strong>. Per una pianificazione che coinvolge 50 partecipanti
        con invii giornalieri per 14 giorni, Samply scrive immediatamente 700 righe (50 × 14)
        nella coda. Per le pianificazioni personalizzate, Samply scrive anche le righe per ogni
        nuovo partecipante che si iscrive dopo la creazione della pianificazione, nel momento
        dell&apos;iscrizione.
      </p>
      <p>
        La coda ha un limite massimo di <strong>50.000 righe in attesa per studio</strong>. Se
        si raggiunge questo limite, è necessario eliminare le vecchie definizioni di pianificazione
        (che rimuove le loro righe in attesa) prima di aggiungerne di nuove. Le righe inviate e
        annullate non contano ai fini del limite.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Eliminazione di una pianificazione</h2>
      <p>
        L&apos;eliminazione di una definizione di pianificazione dalla scheda Pianificazioni rimuove
        la definizione e annulla tutte le sue righe della coda in attesa in un&apos;unica azione. Le
        righe già inviate non vengono interessate — rimangono visibili con stato <em>inviato</em>{' '}
        e sono incluse nella cronologia delle risposte.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Dopo un invio: la cronologia</h2>
      <p>
        Una volta che una riga passa a <em>inviato</em>, l&apos;evento di consegna viene scritto anche
        nella scheda <strong>Cronologia</strong> dello studio. Il registro della
        cronologia registra segnali aggiuntivi oltre alla coda: se il partecipante ha ricevuto la
        notifica mentre l&apos;app era aperta, se ha toccato la barra delle notifiche e se ha aperto
        il link del sondaggio.
      </p>
      <p>
        La cronologia è paginata e può essere scaricata come CSV per l&apos;analisi offline. Ogni riga
        nel CSV include l&apos;ID Samply, titolo e messaggio della notifica, l&apos;URL, l&apos;orario di
        invio lato server e i timestamp per evento di ricezione, tocco e apertura.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Promemoria nella coda</h2>
      <p>
        Quando una pianificazione ha promemoria configurati, ogni invio originale genera una o più
        righe di promemoria agli offset definiti. Queste righe sono contrassegnate con un badge{' '}
        <strong>R</strong> nella colonna <em>Prom.</em> e condividono lo stesso titolo della
        pianificazione. Una riga di promemoria viene automaticamente annullata non appena Samply
        rileva un evento di completamento per l&apos;invio originale — quindi i partecipanti che
        completano il sondaggio in tempo non ricevono mai il promemoria. I promemoria non completati
        vengono inviati normalmente. Vedere{' '}
        <a href='/docs/reminders'>Promemoria</a> per la configurazione del rilevamento del completamento.
      </p>
    </>
  );
}

const STATUSES_ES = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Pendiente',
    desc: 'Programado y en espera. La notificación se enviará a la hora indicada en Programado para.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'En proceso',
    desc: 'El despachador lo ha recogido e intenta entregarlo en este momento.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Enviado',
    desc: 'Entregado al servicio de notificaciones push. El dispositivo lo recibirá en cuanto esté en línea.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Fallido',
    desc: 'El intento de entrega falló — normalmente porque el participante desinstaló la aplicación o su token está caducado. Las filas fallidas permanecen visibles para que pueda investigarlas.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Cancelado',
    desc: 'Eliminado antes de poder enviarse. Esto ocurre cuando un evento de finalización activa la cancelación de un recordatorio, o cuando usted cancela manualmente.',
  },
];

const COLUMNS_ES = [
  { col: 'Programado para', desc: 'La fecha y hora exactas en que la notificación está programada para enviarse, mostradas en la hora local de su navegador.' },
  { col: 'Estado',          desc: 'Estado actual del ciclo de vida de este envío (véase la tabla anterior).' },
  { col: 'Título',          desc: 'El título de la notificación tal como aparecerá en el dispositivo del participante.' },
  { col: 'Rec.',            desc: 'Marcado con R si esta fila es un envío de recordatorio en lugar de la notificación original.' },
  { col: 'Para',            desc: 'A quién va dirigido este envío. Muestra etiquetas de nombres de grupos cuando el calendario apunta a grupos, códigos de participantes individuales para destinatarios específicos, o «todos» para todos los participantes actuales.' },
];

const STATUSES_FR = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'En attente',
    desc: 'Planifié et en attente. La notification sera envoyée à l\'heure indiquée dans Planifié pour.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'En traitement',
    desc: 'Le dispatcher l\'a pris en charge et tente la livraison en ce moment même.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Envoyé',
    desc: 'Remis au service de notifications push. L\'appareil le recevra dès qu\'il sera en ligne.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Échoué',
    desc: 'Tentative de livraison échouée — généralement parce que le participant a désinstallé l\'application ou que son token est périmé. Les lignes échouées restent visibles pour vous permettre d\'effectuer une analyse.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Annulé',
    desc: 'Supprimé avant d\'être déclenché. Cela se produit lorsqu\'un événement de complétion déclenche l\'annulation d\'un rappel, ou lorsque vous annulez manuellement.',
  },
];

const COLUMNS_FR = [
  { col: 'Planifié pour', desc: 'La date et l\'heure exactes auxquelles la notification est programmée pour être envoyée, affichées dans l\'heure locale de votre navigateur.' },
  { col: 'Statut',        desc: 'État actuel du cycle de vie de cet envoi (voir le tableau ci-dessus).' },
  { col: 'Titre',         desc: 'Le titre de la notification tel qu\'il apparaîtra sur l\'appareil du participant.' },
  { col: 'Rap.',          desc: 'Marqué R si cette ligne est un envoi de rappel plutôt que la notification originale.' },
  { col: 'À',             desc: 'La cible de cet envoi. Affiche des étiquettes de noms de groupes lorsque le planning cible des groupes, ou des codes de participants individuels pour des destinataires spécifiques, ou « tous » pour tous les participants actuels.' },
];

function QueueContentFr() {
  return (
    <>
      <p>
        Lorsque vous soumettez un planning, Samply ne se contente pas d&apos;enregistrer une règle
        et de la vérifier à l&apos;exécution. Il développe immédiatement le planning en une liste
        plate d&apos;envois individuels — une ligne par participant par heure d&apos;envoi — et écrit
        chaque ligne dans la file d&apos;attente. La file d&apos;attente est la source de vérité pour
        la livraison : chaque notification envoyée par Samply est représentée comme une ligne
        dans la file d&apos;attente, et un envoi n&apos;a lieu que si et seulement si une ligne existe
        pour lui.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Où trouver la file d&apos;attente</h2>
      <p>
        Depuis votre étude, accédez à <strong>Planning</strong> et cliquez sur{' '}
        <strong>Voir la file d&apos;attente →</strong>{" "}
        dans le coin supérieur droit pour voir tous les envois de chaque planning, ou cliquez
        sur le lien à côté d&apos;une définition de planning individuelle pour filtrer uniquement
        ce planning. Le haut de la page de la file d&apos;attente affiche vos définitions de
        planning — les règles qui ont généré les lignes. En dessous se trouve le tableau
        ligne par ligne de chaque envoi individuel.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Colonnes de la file d&apos;attente</h2>
      <table>
        <thead>
          <tr>
            <th>Colonne</th>
            <th>Contenu</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_FR.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Statuts des lignes</h2>
      <p>
        Chaque ligne suit un cycle de vie. Par défaut, toutes les lignes sont affichées —
        utilisez les filtres de statut pour restreindre l&apos;affichage aux statuts qui vous
        intéressent.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_FR.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_FR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtrage</h2>
      <p>
        Deux filtres apparaissent au-dessus du tableau de la file d&apos;attente et peuvent être
        combinés.
      </p>
      <dl>
        <dt>Filtrer par statut</dt>
        <dd>
          Cinq boutons à bascule : <strong>En attente</strong>, <strong>En traitement</strong>,{' '}
          <strong>Envoyé</strong>, <strong>Échoué</strong> et <strong>Annulé</strong>.
          Chaque bouton est indépendant — cliquez pour l&apos;activer ou le désactiver. Sans
          sélection, toutes les lignes sont affichées. Sélectionnez n&apos;importe quelle
          combinaison pour affiner l&apos;affichage : par exemple, activez{' '}
          <strong>En attente</strong> et <strong>Échoué</strong> ensemble pour voir tout
          ce qui attend encore d&apos;être livré. Un lien <strong>réinitialiser</strong> apparaît
          dès qu&apos;un bouton est actif et réinitialise tous les filtres de statut en une seule
          action.
        </dd>
        <dt>Filtrer par participant</dt>
        <dd>
          Une liste déroulante répertoriant tous les participants inscrits par Samply ID (ou
          leur code si l&apos;un a été défini). Sélectionnez un participant pour voir uniquement
          ses envois. Combinez avec le filtre de statut pour répondre à des questions telles
          que &ldquo;quelles notifications en attente le participant X a-t-il encore ?&rdquo;
        </dd>
      </dl>
      <p>
        Le tableau affiche jusqu&apos;à 50 lignes par page correspondant aux filtres actifs.
        Utilisez la pagination pour naviguer dans des ensembles de résultats plus importants,
        ou affinez l&apos;affichage avec le filtre de statut ou de participant.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Comment la file d&apos;attente est peuplée</h2>
      <p>
        Le développement se produit de manière synchrone au moment où vous cliquez sur{' '}
        <strong>Planifier les notifications</strong>. Pour un planning ciblant 50 participants
        avec des envois quotidiens sur 14 jours, Samply écrit immédiatement 700 lignes
        (50 × 14) dans la file d&apos;attente. Pour les plannings personnels, Samply écrit
        également des lignes pour chaque nouveau participant qui rejoint après la création
        du planning, au moment de son inscription.
      </p>
      <p>
        La file d&apos;attente a une limite stricte de{' '}
        <strong>50 000 lignes en attente par étude</strong>. Si vous atteignez cette limite,
        vous devez supprimer les anciennes définitions de planning (ce qui supprime leurs
        lignes en attente) avant d&apos;en ajouter de nouvelles. Les lignes envoyées et annulées
        ne comptent pas dans cette limite.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Suppression d&apos;un planning</h2>
      <p>
        La suppression d&apos;une définition de planning depuis l&apos;onglet Plannings supprime la
        définition et annule toutes ses lignes en attente dans la file d&apos;attente en une seule
        action. Les lignes déjà envoyées ne sont pas affectées — elles restent visibles avec
        le statut <em>envoyé</em> et sont incluses dans l&apos;historique des réponses.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Après un envoi : l&apos;historique</h2>
      <p>
        Une fois qu&apos;une ligne passe à <em>envoyé</em>, l&apos;événement de livraison est également
        écrit dans l&apos;onglet <strong>Historique</strong> de l&apos;étude.
        Le journal d&apos;historique enregistre des signaux supplémentaires au-delà de la file
        d&apos;attente : si le participant a reçu la notification pendant que l&apos;application était
        ouverte, s&apos;il a appuyé sur la barre de notification, et s&apos;il a ouvert le lien du
        questionnaire.
      </p>
      <p>
        L&apos;historique est paginé et peut être téléchargé en tant que CSV pour une analyse
        hors ligne. Chaque ligne du CSV inclut le Samply ID, le titre et le message de la
        notification, l&apos;URL, l&apos;heure d&apos;envoi côté serveur, et les horodatages par événement
        pour la réception, l&apos;appui et l&apos;ouverture.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Rappels dans la file d&apos;attente</h2>
      <p>
        Lorsqu&apos;un planning a des rappels configurés, chaque envoi original génère une ou
        plusieurs lignes de rappel aux décalages que vous avez définis. Ces lignes sont
        marquées d&apos;un badge <strong>R</strong> dans la colonne <em>Rap.</em> et partagent
        le même titre de planning. Une ligne de rappel est automatiquement annulée dès que
        Samply détecte un événement de complétion pour l&apos;envoi original — ainsi, les
        participants qui complètent le questionnaire à temps ne voient jamais le rappel.
        Les rappels non complétés sont envoyés normalement. Consultez{' '}
        <a href='/docs/reminders'>Rappels</a> pour la configuration de la détection des
        complétions.
      </p>
    </>
  );
}

function QueueContentEs() {
  return (
    <>
      <p>
        Cuando envía un calendario, Samply no solo guarda una regla y la comprueba en tiempo de
        ejecución. Inmediatamente expande el calendario en una lista plana de envíos individuales
        — una fila por participante por hora de envío — y escribe cada fila en la cola. La cola
        es la fuente de verdad para la entrega: cada notificación enviada por Samply está
        representada como una fila en la cola, y un envío solo ocurre si y solo si existe una
        fila para él.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Dónde encontrar la cola</h2>
      <p>
        Desde su estudio, vaya a <strong>Calendario</strong> y haga clic en{' '}
        <strong>Ver la cola →</strong>{" "}
        en la esquina superior derecha para ver todos los envíos de cada calendario, o haga clic
        en el enlace junto a la definición de un calendario individual para filtrar únicamente
        ese calendario. La parte superior de la página de la cola muestra sus definiciones de
        calendario — las reglas que generaron las filas. Debajo se encuentra la tabla fila a fila
        de cada envío individual.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Columnas de la cola</h2>
      <table>
        <thead>
          <tr>
            <th>Columna</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_ES.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Estados de las filas</h2>
      <p>
        Cada fila sigue un ciclo de vida. Por defecto, se muestran todas las filas —
        use los filtros de estado para restringir la vista a los estados que le interesan.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_ES.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_ES.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtrado</h2>
      <p>
        Aparecen dos filtros encima de la tabla de la cola y pueden combinarse.
      </p>
      <dl>
        <dt>Filtrar por estado</dt>
        <dd>
          Cinco botones de alternancia: <strong>Pendiente</strong>, <strong>En proceso</strong>,{' '}
          <strong>Enviado</strong>, <strong>Fallido</strong> y <strong>Cancelado</strong>.
          Cada botón es independiente — haga clic para activarlo o desactivarlo. Sin selección,
          se muestran todas las filas. Seleccione cualquier combinación para afinar la vista:
          por ejemplo, active <strong>Pendiente</strong> y <strong>Fallido</strong> juntos
          para ver todo lo que aún está pendiente de entrega. Aparece un enlace{' '}
          <strong>restablecer</strong> en cuanto hay algún botón activo y restablece todos
          los filtros de estado de una sola vez.
        </dd>
        <dt>Filtrar por participante</dt>
        <dd>
          Un menú desplegable que enumera todos los participantes inscritos por Samply ID (o
          su código si se ha definido uno). Seleccione un participante para ver únicamente sus
          envíos. Combínelo con el filtro de estado para responder preguntas como
          «¿qué notificaciones pendientes tiene todavía el participante X?»
        </dd>
      </dl>
      <p>
        La tabla muestra hasta 50 filas por página que coincidan con los filtros activos.
        Use la paginación para navegar por conjuntos de resultados más grandes, o afine la
        vista con el filtro de estado o de participante.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Cómo se puebla la cola</h2>
      <p>
        La expansión ocurre de forma sincrónica en el momento en que hace clic en{' '}
        <strong>Programar notificaciones</strong>. Para un calendario que apunte a 50
        participantes con envíos diarios durante 14 días, Samply escribe inmediatamente 700
        filas (50 × 14) en la cola. Para calendarios personales, Samply también escribe filas
        para cada nuevo participante que se una después de la creación del calendario, en el
        momento de su registro.
      </p>
      <p>
        La cola tiene un límite estricto de{' '}
        <strong>50 000 filas pendientes por estudio</strong>. Si alcanza este límite, debe
        eliminar las definiciones de calendario antiguas (lo que elimina sus filas pendientes)
        antes de añadir nuevas. Las filas enviadas y canceladas no cuentan para este límite.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Eliminar un calendario</h2>
      <p>
        Eliminar una definición de calendario desde la pestaña Calendarios elimina la definición
        y cancela todas sus filas pendientes en la cola en una sola acción. Las filas ya
        enviadas no se ven afectadas — permanecen visibles con el estado <em>enviado</em> y
        se incluyen en el historial de respuestas.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Tras un envío: el historial</h2>
      <p>
        Una vez que una fila pasa a <em>enviado</em>, el evento de entrega también se escribe
        en la pestaña <strong>Historial</strong> del estudio. El registro de
        historial captura señales adicionales más allá de la cola: si el participante recibió
        la notificación mientras la aplicación estaba abierta, si tocó la barra de
        notificación, y si abrió el enlace de la encuesta.
      </p>
      <p>
        El historial está paginado y puede descargarse como CSV para análisis sin conexión.
        Cada fila del CSV incluye el Samply ID, el título y el mensaje de la notificación,
        la URL, la hora de envío del servidor, y las marcas de tiempo por evento para la
        recepción, el toque y la apertura.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Recordatorios en la cola</h2>
      <p>
        Cuando un calendario tiene recordatorios configurados, cada envío original genera una
        o más filas de recordatorio con los desfases que usted ha definido. Estas filas están
        marcadas con un distintivo <strong>R</strong> en la columna <em>Rec.</em> y comparten
        el mismo título de calendario. Una fila de recordatorio se cancela automáticamente en
        cuanto Samply detecta un evento de finalización para el envío original — de modo que
        los participantes que completan la encuesta a tiempo nunca ven el recordatorio.
        Los recordatorios no completados se envían con normalidad. Consulte{' '}
        <a href='/docs/reminders'>Recordatorios</a> para la configuración de la detección de
        finalizaciones.
      </p>
    </>
  );
}

const STATUSES_PT = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Pendente',
    desc: 'Agendado e aguardando. A notificação será enviada no horário indicado em Agendado para.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'Em processamento',
    desc: 'O despachante o recebeu e está tentando entregá-lo agora.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Enviado',
    desc: 'Entregue ao serviço de notificações push. O dispositivo o receberá assim que estiver on-line.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Falhou',
    desc: 'A tentativa de entrega falhou — normalmente porque o participante desinstalou o aplicativo ou seu token está desatualizado. As linhas com falha permanecem visíveis para que você possa investigar.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Cancelado',
    desc: 'Removido antes de ser enviado. Isso ocorre quando um evento de conclusão aciona o cancelamento de um lembrete, ou quando você cancela manualmente.',
  },
];

const COLUMNS_PT = [
  { col: 'Agendado para', desc: 'A data e hora exatas em que a notificação está agendada para ser enviada, exibidas no horário local do seu navegador.' },
  { col: 'Status',        desc: 'Estado atual do ciclo de vida deste envio (veja a tabela acima).' },
  { col: 'Título',        desc: 'O título da notificação como aparecerá no dispositivo do participante.' },
  { col: 'Lem.',          desc: 'Marcado com R se esta linha é um envio de lembrete em vez da notificação original.' },
  { col: 'Para',          desc: 'Para quem é direcionado este envio. Exibe etiquetas de nomes de grupos quando o calendário aponta para grupos, códigos de participantes individuais para destinatários específicos, ou «todos» para todos os participantes atuais.' },
];

function QueueContentPt() {
  return (
    <>
      <p>
        Quando você envia um calendário, o Samply não apenas salva uma regra e a verifica em tempo de
        execução. Ele expande imediatamente o calendário em uma lista plana de envios individuais
        — uma linha por participante por horário de envio — e grava cada linha na fila. A fila
        é a fonte da verdade para a entrega: cada notificação enviada pelo Samply é representada
        como uma linha na fila, e um envio só ocorre se e somente se existir uma linha para ele.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Onde encontrar a fila</h2>
      <p>
        No seu estudo, vá para <strong>Calendário</strong> e clique em{' '}
        <strong>Ver a fila →</strong>{" "}
        no canto superior direito para ver todos os envios de cada calendário, ou clique
        no link ao lado da definição de um calendário individual para filtrar apenas
        esse calendário. A parte superior da página da fila mostra suas definições de
        calendário — as regras que geraram as linhas. Abaixo está a tabela linha a linha
        de cada envio individual.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Colunas da fila</h2>
      <table>
        <thead>
          <tr>
            <th>Coluna</th>
            <th>Conteúdo</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_PT.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Status das linhas</h2>
      <p>
        Cada linha segue um ciclo de vida. Por padrão, todas as linhas são exibidas —
        use os filtros de status para restringir a visualização aos status que lhe interessam.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_PT.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_PT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtragem</h2>
      <p>
        Dois filtros aparecem acima da tabela da fila e podem ser combinados.
      </p>
      <dl>
        <dt>Filtrar por status</dt>
        <dd>
          Cinco botões de alternância: <strong>Pendente</strong>, <strong>Em processamento</strong>,{' '}
          <strong>Enviado</strong>, <strong>Falhou</strong> e <strong>Cancelado</strong>.
          Cada botão é independente — clique para ativar ou desativar. Sem seleção,
          todas as linhas são exibidas. Selecione qualquer combinação para refinar a visualização:
          por exemplo, ative <strong>Pendente</strong> e <strong>Falhou</strong> juntos
          para ver tudo que ainda está pendente de entrega. Um link{' '}
          <strong>redefinir</strong> aparece quando há algum botão ativo e redefine todos
          os filtros de status de uma vez.
        </dd>
        <dt>Filtrar por participante</dt>
        <dd>
          Um menu suspenso que lista todos os participantes inscritos por Samply ID (ou
          seu código, se um tiver sido definido). Selecione um participante para ver apenas seus
          envios. Combine com o filtro de status para responder perguntas como
          «quais notificações pendentes o participante X ainda tem?»
        </dd>
      </dl>
      <p>
        A tabela exibe até 50 linhas por página correspondentes aos filtros ativos.
        Use a paginação para navegar por conjuntos de resultados maiores, ou refine a
        visualização com o filtro de status ou de participante.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Como a fila é preenchida</h2>
      <p>
        A expansão ocorre de forma síncrona no momento em que você clica em{' '}
        <strong>Agendar notificações</strong>. Para um calendário que aponte para 50
        participantes com envios diários durante 14 dias, o Samply grava imediatamente 700
        linhas (50 × 14) na fila. Para calendários pessoais, o Samply também grava linhas
        para cada novo participante que se inscreva após a criação do calendário, no
        momento do seu registro.
      </p>
      <p>
        A fila tem um limite estrito de{' '}
        <strong>50 000 linhas pendentes por estudo</strong>. Se você atingir esse limite, deve
        excluir as definições de calendário antigas (o que exclui suas linhas pendentes)
        antes de adicionar novas. As linhas enviadas e canceladas não contam para esse limite.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Excluir um calendário</h2>
      <p>
        Excluir uma definição de calendário na aba Calendários exclui a definição
        e cancela todas as suas linhas pendentes na fila em uma única ação. As linhas já
        enviadas não são afetadas — permanecem visíveis com o status <em>enviado</em> e
        são incluídas no histórico de respostas.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Após um envio: o histórico</h2>
      <p>
        Assim que uma linha passa para <em>enviado</em>, o evento de entrega também é gravado
        na aba <strong>Histórico</strong> do estudo. O registro de
        histórico captura sinais adicionais além da fila: se o participante recebeu a
        notificação enquanto o aplicativo estava aberto, se tocou na barra de
        notificação, e se abriu o link da pesquisa.
      </p>
      <p>
        O histórico é paginado e pode ser baixado como CSV para análise off-line.
        Cada linha do CSV inclui o Samply ID, o título e a mensagem da notificação,
        a URL, o horário de envio do servidor, e os carimbos de data/hora por evento para
        recebimento, toque e abertura.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Lembretes na fila</h2>
      <p>
        Quando um calendário tem lembretes configurados, cada envio original gera uma
        ou mais linhas de lembrete com os deslocamentos que você definiu. Essas linhas estão
        marcadas com um distintivo <strong>R</strong> na coluna <em>Lem.</em> e compartilham
        o mesmo título de calendário. Uma linha de lembrete é cancelada automaticamente assim que
        o Samply detecta um evento de conclusão para o envio original — de modo que
        os participantes que concluem a pesquisa a tempo nunca veem o lembrete.
        Os lembretes não concluídos são enviados normalmente. Consulte{' '}
        <a href='/docs/reminders'>Lembretes</a> para a configuração da detecção de
        conclusões.
      </p>
    </>
  );
}

const STATUSES_JA = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: '保留中',
    desc: 'スケジュール済みで待機中です。通知は「スケジュール日時」に表示された時刻に送信されます。',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: '処理中',
    desc: 'ディスパッチャーが受け取り、現在配信を試みています。',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: '送信済み',
    desc: 'プッシュ通知サービスに配信されました。デバイスがオンラインになり次第受信されます。',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: '失敗',
    desc: '配信試行に失敗しました — 通常、参加者がアプリをアンインストールしたか、トークンが古くなっているためです。失敗した行は調査できるよう表示されたまま残ります。',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'キャンセル',
    desc: '送信前に削除されました。完了イベントによりリマインダーのキャンセルがトリガーされた場合や、手動でキャンセルした場合に発生します。',
  },
];

const COLUMNS_JA = [
  { col: 'スケジュール日時', desc: '通知が送信される予定の正確な日時。ブラウザのローカルタイムで表示されます。' },
  { col: 'ステータス',       desc: 'この送信の現在のライフサイクル状態（上記の表を参照）。' },
  { col: 'タイトル',         desc: '参加者のデバイスに表示される通知のタイトル。' },
  { col: 'リマ.',            desc: 'この行が元の通知ではなくリマインダー送信である場合、Rとマークされます。' },
  { col: '宛先',             desc: 'この送信の宛先。スケジュールがグループを対象とする場合はグループ名のピル、特定の参加者を対象とする場合は個別の参加者コード、すべての現在の参加者を対象とする場合は「全員」を表示します。' },
];

function QueueContentJa() {
  return (
    <>
      <p>
        スケジュールを送信すると、Samplyは単にルールを保存して実行時にチェックするだけではありません。
        スケジュールを即座に個別送信のフラットなリストに展開し — 参加者ごと・送信時刻ごとに1行 —
        各行をキューに書き込みます。キューは配信の真実の源です：Samplyが送信するすべての通知はキューの
        行として表現され、その行が存在する場合にのみ送信が行われます。
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>キューの場所</h2>
      <p>
        研究から<strong>スケジュール</strong>に移動し、右上隅の{' '}
        <strong>キューを表示 →</strong>{" "}
        をクリックすると、すべてのスケジュールの送信を確認できます。または、個別のスケジュール定義の
        横にあるリンクをクリックすると、そのスケジュールのみをフィルタリングできます。キューページの
        上部には、行を生成したルールであるスケジュール定義が表示されます。その下には、個別の送信
        ごとの行単位の表があります。
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>キューの列</h2>
      <table>
        <thead>
          <tr>
            <th>列</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_JA.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>行のステータス</h2>
      <p>
        各行はライフサイクルを通過します。デフォルトではすべての行が表示されます —
        関心のあるステータスに表示を絞り込むには、ステータスフィルターピルを使用してください。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_JA.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_JA.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>フィルタリング</h2>
      <p>
        キューのテーブルの上に2つのフィルターが表示され、組み合わせて使用できます。
      </p>
      <dl>
        <dt>ステータスでフィルター</dt>
        <dd>
          切り替え可能な5つのピル：<strong>保留中</strong>、<strong>処理中</strong>、{' '}
          <strong>送信済み</strong>、<strong>失敗</strong>、<strong>キャンセル</strong>。
          各ピルは独立しています — クリックしてオン・オフを切り替えます。何も選択されていない
          場合、すべての行が表示されます。任意の組み合わせを選択して表示を絞り込みます：たとえば、
          <strong>保留中</strong>と<strong>失敗</strong>を一緒にオンにすると、まだ配信されていない
          すべてが表示されます。いずれかのピルがアクティブな場合に<strong>クリア</strong>リンクが
          表示され、すべてのステータスフィルターを一度にリセットします。
        </dd>
        <dt>参加者でフィルター</dt>
        <dd>
          登録されたすべての参加者をSamply ID（コードが設定されている場合はそのコード）で
          リストするドロップダウン。参加者を選択すると、その参加者の送信のみが表示されます。
          ステータスフィルターと組み合わせて、「参加者Xにはまだどの保留中の通知があるか？」
          などの質問に答えることができます。
        </dd>
      </dl>
      <p>
        テーブルにはアクティブなフィルターに一致するページあたり最大50行が表示されます。
        より大きな結果セットを移動するにはページネーションを使用するか、ステータスまたは
        参加者フィルターで表示を絞り込みます。
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>キューが満たされる仕組み</h2>
      <p>
        展開は<strong>通知をスケジュール</strong>をクリックした瞬間に同期的に行われます。
        50人の参加者を対象に14日間毎日送信するスケジュールの場合、Samplyは即座に700行
        （50 × 14）をキューに書き込みます。個人スケジュールの場合、Samplyはスケジュール作成後に
        参加するすべての新しい参加者についても、登録時にその行を書き込みます。
      </p>
      <p>
        キューには<strong>研究あたり50,000件の保留中の行</strong>という厳格な制限があります。
        この制限に達した場合、新しいスケジュール定義を追加する前に、古いスケジュール定義
        （保留中の行を含む）を削除する必要があります。送信済みおよびキャンセルされた行は
        制限にカウントされません。
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>スケジュールの削除</h2>
      <p>
        スケジュールタブからスケジュール定義を削除すると、定義が削除され、保留中のすべての
        キュー行が一度にキャンセルされます。すでに送信された行は影響を受けません — それらは
        <em>送信済み</em>ステータスで表示されたままになり、応答履歴に含まれます。
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>送信後：履歴</h2>
      <p>
        行が<em>送信済み</em>に遷移すると、配信イベントは研究の <strong>履歴</strong>
        タブにも書き込まれます。履歴ログはキュー以外の追加シグナルを記録します：アプリが
        開いている間に参加者が通知を受信したかどうか、通知バーをタップしたかどうか、
        調査リンクを開いたかどうか。
      </p>
      <p>
        履歴はページ分けされ、オフライン分析用にCSVとしてダウンロードできます。CSVの各行
        には、Samply ID、通知のタイトルとメッセージ、URL、サーバー側の送信時刻、および受信・
        タップ・オープンの各イベントのタイムスタンプが含まれます。
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>キュー内のリマインダー</h2>
      <p>
        スケジュールにリマインダーが設定されている場合、各元の送信は定義したオフセットで1つ以上の
        リマインダー行を生成します。これらの行は<em>リマ.</em>列に<strong>R</strong>バッジで
        マークされ、同じスケジュールタイトルを共有します。Samplyが元の送信の完了イベントを検出
        するとすぐに、リマインダー行は自動的にキャンセルされます — したがって、調査を時間通りに
        完了した参加者はリマインダーを見ることはありません。完了していないリマインダーは通常通り
        送信されます。完了検出の設定については{' '}
        <a href='/docs/reminders'>リマインダー</a>を参照してください。
      </p>
    </>
  );
}

const STATUSES_TR = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Beklemede',
    desc: 'Zamanlanmış ve bekliyor. Bildirim, «Zamanlanma» altında gösterilen saatte tetiklenecektir.',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'İşleniyor',
    desc: 'Gönderici onu aldı ve şu anda teslim etmeye çalışıyor.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Gönderildi',
    desc: 'Anlık bildirim hizmetine teslim edildi. Cihaz çevrimiçi olur olmaz alacaktır.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Başarısız',
    desc: 'Teslim girişimi başarısız oldu — genellikle katılımcının uygulamayı kaldırması veya token süresinin dolması nedeniyle. Başarısız satırlar, araştırma yapabilmeniz için görünür kalır.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'İptal edildi',
    desc: 'Tetiklenmeden önce kaldırıldı. Bir tamamlanma olayı hatırlatıcı iptalini tetiklediğinde veya manuel olarak iptal ettiğinizde gerçekleşir.',
  },
];

const COLUMNS_TR = [
  { col: 'Zamanlanma', desc: 'Bildirimin tetiklenmek üzere ayarlandığı tam tarih ve saat, tarayıcınızın yerel saatinde gösterilir.' },
  { col: 'Durum',      desc: 'Bu göndermenin mevcut yaşam döngüsü durumu (yukarıdaki tabloya bakınız).' },
  { col: 'Başlık',     desc: 'Bildirim başlığı, katılımcı cihazında göründüğü şekliyle.' },
  { col: 'Hat.',       desc: 'Bu satır orijinal bildirim yerine bir hatırlatıcı gönderimiyse R ile işaretlenir.' },
  { col: 'Kime',       desc: 'Bu göndermenin hedefi. Program grupları hedeflediğinde grup adı etiketlerini, belirli katılımcıları hedeflediğinde bireysel katılımcı kodlarını veya tüm mevcut katılımcıları hedeflediğinde «tümü» değerini gösterir.' },
];

function QueueContentTr() {
  return (
    <>
      <p>
        Bir program gönderdiğinizde, Samply yalnızca bir kuralı kaydedip çalışma zamanında
        kontrol etmez. Programı anında düz bir bireysel gönderim listesine genişletir — her
        katılımcı için her gönderim zamanı başına bir satır — ve her satırı kuyruğa yazar.
        Kuyruk, teslimin gerçek kaynağıdır: Samply'nin gönderdiği her bildirim kuyrukta bir
        satır olarak temsil edilir ve yalnızca bir satır varsa gönderim gerçekleşir.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Kuyruğu nerede bulabilirsiniz</h2>
      <p>
        Çalışmanızda <strong>Program</strong> bölümüne gidin ve tüm programlardaki tüm
        gönderimleri görmek için sağ üst köşedeki <strong>Kuyruğu görüntüle →</strong>{" "}
        bağlantısına tıklayın. Veya yalnızca o programın gönderimlerini filtrelemek için
        bireysel bir program tanımının yanındaki bağlantıya tıklayın. Kuyruk sayfasının
        üst kısmı program tanımlarını gösterir — satırları üreten kurallar. Altında her
        bireysel gönderimin satır satır tablosu bulunur.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Kuyruk sütunları</h2>
      <table>
        <thead>
          <tr>
            <th>Sütun</th>
            <th>İçerik</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_TR.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Satır durumları</h2>
      <p>
        Her satır bir yaşam döngüsünden geçer. Varsayılan olarak tüm satırlar gösterilir —
        görüntülemeyi ilgilendiğiniz durumlara daraltmak için durum filtre etiketlerini
        kullanın.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_TR.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_TR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtreleme</h2>
      <p>
        Kuyruk tablosunun üzerinde, birleştirilebilecek iki filtre vardır.
      </p>
      <dl>
        <dt>Duruma göre filtrele</dt>
        <dd>
          Beş geçişli etiket: <strong>Beklemede</strong>, <strong>İşleniyor</strong>,{' '}
          <strong>Gönderildi</strong>, <strong>Başarısız</strong> ve{' '}
          <strong>İptal edildi</strong>. Her etiket bağımsızdır — açıp kapatmak için
          tıklayın. Hiçbiri seçili değilse, tüm satırlar gösterilir. Görüntülemeyi
          daraltmak için herhangi bir kombinasyonu seçin: örneğin, henüz teslim edilmemiş
          her şeyi görmek için <strong>Beklemede</strong> ve <strong>Başarısız</strong>
          {' '}öğelerini birlikte açın. Herhangi bir etiket etkin olduğunda{' '}
          <strong>temizle</strong> bağlantısı görünür ve tüm durum filtrelerini bir kerede
          sıfırlar.
        </dd>
        <dt>Katılımcıya göre filtrele</dt>
        <dd>
          Kayıtlı tüm katılımcıları Samply ID (veya kod ayarlanmışsa kodları) ile listeleyen
          bir açılır menü. Yalnızca o katılımcının gönderimlerini görmek için bir katılımcı
          seçin. «X katılımcısının hâlâ hangi bekleyen bildirimleri var?» gibi soruları
          yanıtlamak için durum filtresiyle birleştirin.
        </dd>
      </dl>
      <p>
        Tablo, etkin filtrelerle eşleşen sayfa başına en fazla 50 satır gösterir. Daha büyük
        sonuç kümelerinde gezinmek için sayfalandırmayı kullanın veya görüntülemeyi durum ya
        da katılımcı filtresiyle daraltın.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Kuyruk nasıl doldurulur</h2>
      <p>
        Genişletme, <strong>Bildirimleri zamanla</strong> düğmesine tıkladığınız anda eşzamanlı
        olarak gerçekleşir. 14 gün boyunca günlük gönderimlerle 50 katılımcıdan oluşan bir
        program için Samply, kuyruğa anında 700 satır (50 × 14) yazar. Kişisel programlar için
        Samply, program oluşturulduktan sonra katılan her yeni katılımcı için de kayıt anında
        satırlar yazar.
      </p>
      <p>
        Kuyruğun, çalışma başına <strong>50.000 bekleyen satır</strong> şeklinde kesin bir
        sınırı vardır. Sınıra ulaşıldığında, yenilerini eklemeden önce eski program tanımlarını
        silmeniz gerekir (bu, bekleyen satırlarını da siler). Gönderilmiş ve iptal edilmiş
        satırlar sınıra dahil edilmez.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Bir programı silme</h2>
      <p>
        Programlar sekmesinden bir program tanımını silmek, tanımı kaldırır ve bekleyen tüm
        kuyruk satırlarını aynı anda iptal eder. Zaten gönderilmiş satırlar etkilenmez —
        görünür kalır, <em>gönderildi</em> durumunda kalırlar ve yanıt geçmişine dahil edilirler.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Gönderildikten sonra: geçmiş</h2>
      <p>
        Bir satır <em>gönderildi</em> durumuna geçtiğinde, teslim olayı çalışmanın{' '}
        <strong>Geçmiş</strong> sekmesine de yazılır. Geçmiş
        günlüğü, kuyruğun ötesinde ek sinyalleri yakalar: katılımcının uygulama açıkken
        bildirimi alıp almadığı, bildirim çubuğundaki bildirime dokunup dokunmadığı ve
        anket bağlantısını açıp açmadığı.
      </p>
      <p>
        Geçmiş sayfalandırılır ve çevrimdışı analiz için CSV olarak indirilebilir. Her CSV
        satırı Samply ID'sini, bildirim başlığını ve mesajını, URL'yi, sunucu tarafı gönderim
        zamanını ve alma, dokunma ve açma olaylarının zaman damgalarını içerir.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Kuyruktaki hatırlatıcılar</h2>
      <p>
        Bir program hatırlatıcılarla yapılandırılmışsa, her orijinal gönderim, tanımladığınız
        ofsetlerde bir veya daha fazla hatırlatıcı satırı oluşturur. Bu satırlar{' '}
        <em>Hat.</em> sütununda bir <strong>R</strong> rozetiyle işaretlenir ve aynı program
        başlığını paylaşır. Samply orijinal gönderim için bir tamamlanma olayı tespit eder
        etmez bir hatırlatıcı satırı otomatik olarak iptal edilir — bu nedenle ankete zamanında
        cevap veren katılımcılar asla hatırlatıcı görmez. Tamamlanmamış hatırlatıcılar normal
        şekilde gönderilir. Tamamlanma algılamasını yapılandırma hakkında daha fazla bilgi
        için{' '}
        <a href='/docs/reminders'>Hatırlatıcılar</a> bölümüne bakın.
      </p>
    </>
  );
}

const STATUSES_PL = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'Oczekuje',
    desc: 'Zaplanowane i oczekuje. Powiadomienie zostanie wyzwolone o godzinie wskazanej w kolumnie «Zaplanowano».',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'Przetwarzanie',
    desc: 'Nadawca odebrał wpis i właśnie próbuje go dostarczyć.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'Wysłano',
    desc: 'Dostarczono do usługi powiadomień push. Urządzenie odbierze je, gdy tylko będzie online.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'Niepowodzenie',
    desc: 'Próba dostarczenia nie powiodła się — zwykle dlatego, że uczestnik odinstalował aplikację lub token wygasł. Wiersze z niepowodzeniem pozostają widoczne, abyś mógł je zbadać.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'Anulowano',
    desc: 'Usunięte przed wyzwoleniem. Dzieje się tak, gdy zdarzenie ukończenia uruchamia anulowanie przypomnienia lub gdy anulujesz ręcznie.',
  },
];

const COLUMNS_PL = [
  { col: 'Zaplanowano', desc: 'Dokładna data i godzina, na które powiadomienie zostało ustawione do wyzwolenia, pokazywane w lokalnej strefie czasowej Twojej przeglądarki.' },
  { col: 'Status',      desc: 'Aktualny stan cyklu życia tej wysyłki (zobacz tabelę powyżej).' },
  { col: 'Tytuł',       desc: 'Tytuł powiadomienia, tak jak pojawia się na urządzeniu uczestnika.' },
  { col: 'Przyp.',      desc: 'Oznaczone literą R, jeśli ten wiersz jest wysyłką przypomnienia, a nie oryginalnym powiadomieniem.' },
  { col: 'Do',          desc: 'Cel tej wysyłki. Pokazuje etykiety nazw grup, gdy harmonogram celuje w grupy, indywidualne kody uczestników, gdy celuje w konkretnych uczestników, lub «wszyscy», gdy celuje we wszystkich obecnych uczestników.' },
];

function QueueContentPl() {
  return (
    <>
      <p>
        Gdy przesyłasz harmonogram, Samply nie tylko zapisuje regułę i sprawdza ją w czasie
        wykonywania. System natychmiast rozwija harmonogram w płaską listę pojedynczych
        wysyłek — jeden wiersz na uczestnika na każdy czas wysyłki — i zapisuje każdy wiersz
        w kolejce. Kolejka jest źródłem prawdy dla dostarczania: każde powiadomienie, które
        Samply wysyła, jest reprezentowane w kolejce jako wiersz, a wysyłka następuje
        wtedy i tylko wtedy, gdy istnieje dla niej wiersz.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>Gdzie znaleźć kolejkę</h2>
      <p>
        W swoim badaniu przejdź do sekcji <strong>Harmonogram</strong> i kliknij{" "}
        <strong>Zobacz kolejkę →</strong> w prawym górnym rogu, aby zobaczyć wszystkie
        wysyłki ze wszystkich harmonogramów. Możesz też kliknąć link obok pojedynczej
        definicji harmonogramu, aby przefiltrować widok tylko do wysyłek tego harmonogramu.
        Górna część strony kolejki pokazuje definicje harmonogramów — reguły, które
        generują wiersze. Poniżej znajduje się tabela wiersz po wierszu każdej pojedynczej wysyłki.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>Kolumny kolejki</h2>
      <table>
        <thead>
          <tr>
            <th>Kolumna</th>
            <th>Zawartość</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_PL.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>Statusy wierszy</h2>
      <p>
        Każdy wiersz przechodzi przez cykl życia. Domyślnie pokazywane są wszystkie wiersze —
        użyj etykiet filtra statusu, aby zawęzić widok do statusów, które Cię interesują.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_PL.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_PL.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>Filtrowanie</h2>
      <p>
        Nad tabelą kolejki znajdują się dwa filtry, które można łączyć.
      </p>
      <dl>
        <dt>Filtruj według statusu</dt>
        <dd>
          Pięć przełączalnych etykiet: <strong>Oczekuje</strong>, <strong>Przetwarzanie</strong>,{' '}
          <strong>Wysłano</strong>, <strong>Niepowodzenie</strong> i{' '}
          <strong>Anulowano</strong>. Każda etykieta jest niezależna — kliknij, aby
          włączyć lub wyłączyć. Jeśli żadna nie jest wybrana, pokazywane są wszystkie
          wiersze. Wybierz dowolną kombinację, aby zawęzić widok: na przykład włącz razem{' '}
          <strong>Oczekuje</strong> i <strong>Niepowodzenie</strong>, aby zobaczyć wszystko,
          co nie zostało jeszcze dostarczone. Link <strong>wyczyść</strong> pojawia się,
          gdy aktywna jest dowolna etykieta i resetuje wszystkie filtry statusu jednocześnie.
        </dd>
        <dt>Filtruj według uczestnika</dt>
        <dd>
          Lista rozwijana zawierająca wszystkich zarejestrowanych uczestników według ich
          Samply ID (lub kodów, jeśli kody są ustawione). Wybierz uczestnika, aby zobaczyć
          tylko wysyłki dla tego uczestnika. Połącz z filtrem statusu, aby odpowiedzieć na
          pytania typu «jakie oczekujące powiadomienia ma jeszcze uczestnik X?».
        </dd>
      </dl>
      <p>
        Tabela pokazuje do 50 wierszy na stronę pasujących do aktywnych filtrów. Użyj
        paginacji, aby poruszać się po większych zestawach wyników, lub zawęź widok za
        pomocą filtra statusu lub uczestnika.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>Jak kolejka jest wypełniana</h2>
      <p>
        Rozszerzanie odbywa się synchronicznie w chwili kliknięcia przycisku{' '}
        <strong>Zaplanuj powiadomienia</strong>. Dla harmonogramu z 50 uczestnikami i
        codziennymi wysyłkami przez 14 dni Samply natychmiast zapisuje 700 wierszy (50 × 14)
        do kolejki. W przypadku harmonogramów osobistych Samply zapisuje wiersze również
        w momencie rejestracji każdego nowego uczestnika, który dołącza po utworzeniu harmonogramu.
      </p>
      <p>
        Kolejka ma sztywny limit <strong>50 000 oczekujących wierszy</strong> na badanie.
        Po osiągnięciu limitu musisz usunąć stare definicje harmonogramów (co usuwa również
        ich oczekujące wiersze) przed dodaniem nowych. Wysłane i anulowane wiersze nie
        liczą się do limitu.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>Usuwanie harmonogramu</h2>
      <p>
        Usunięcie definicji harmonogramu z karty Harmonogramy usuwa definicję i jednocześnie
        anuluje wszystkie oczekujące wiersze kolejki. Wiersze, które już zostały wysłane,
        pozostają nienaruszone — pozostają widoczne, w statusie <em>wysłano</em> i są
        wliczane do historii odpowiedzi.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>Po wysłaniu: historia</h2>
      <p>
        Gdy wiersz przechodzi do statusu <em>wysłano</em>, zdarzenie dostarczenia jest
        również zapisywane w zakładce <strong>Historia</strong> badania.
        Dziennik historii rejestruje dodatkowe sygnały wykraczające poza kolejkę: czy
        uczestnik otrzymał powiadomienie przy otwartej aplikacji, czy stuknął w
        powiadomienie na pasku powiadomień i czy otworzył link do ankiety.
      </p>
      <p>
        Historia jest stronicowana i można ją pobrać jako CSV do analizy offline. Każdy
        wiersz CSV zawiera Samply ID, tytuł i treść powiadomienia, URL, czas wysłania po
        stronie serwera oraz znaczniki czasu zdarzeń odebrania, stuknięcia i otwarcia.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>Przypomnienia w kolejce</h2>
      <p>
        Jeśli harmonogram jest skonfigurowany z przypomnieniami, każda oryginalna wysyłka
        tworzy jeden lub więcej wierszy przypomnień przy zdefiniowanych przez Ciebie
        przesunięciach. Te wiersze są oznaczone znaczkiem <strong>R</strong> w kolumnie{' '}
        <em>Przyp.</em> i mają ten sam tytuł harmonogramu. Wiersz przypomnienia jest
        automatycznie anulowany, gdy tylko Samply wykryje zdarzenie ukończenia dla
        oryginalnej wysyłki — więc uczestnicy, którzy odpowiadają na ankietę na czas,
        nigdy nie widzą przypomnienia. Nieukończone przypomnienia są wysyłane normalnie.
        Aby uzyskać więcej informacji na temat konfigurowania wykrywania ukończenia,
        zobacz sekcję{' '}
        <a href='/docs/reminders'>Przypomnienia</a>.
      </p>
    </>
  );
}

const STATUSES_AR = [
  {
    status: 'pending',
    color: 'var(--ink-40)',
    label: 'قيد الانتظار',
    desc: 'مجدول وفي انتظار التنفيذ. سيتم إطلاق الإشعار في الوقت المشار إليه في عمود «مجدول لـ».',
  },
  {
    status: 'processing',
    color: 'var(--sage)',
    label: 'قيد المعالجة',
    desc: 'استلم المُرسِل الإدخال ويحاول حالياً تسليمه.',
  },
  {
    status: 'sent',
    color: 'var(--sage)',
    label: 'تم الإرسال',
    desc: 'تم التسليم إلى خدمة الإشعارات الفورية. سيستلمها الجهاز بمجرد أن يكون متصلاً بالإنترنت.',
  },
  {
    status: 'failed',
    color: 'var(--coral)',
    label: 'فشل',
    desc: 'فشلت محاولة التسليم — عادةً لأن المشارك قام بإلغاء تثبيت التطبيق أو انتهت صلاحية الـ Token. تظل الصفوف الفاشلة مرئية حتى تتمكن من التحقيق فيها.',
  },
  {
    status: 'cancelled',
    color: 'var(--ink-40)',
    label: 'تم الإلغاء',
    desc: 'تمت إزالته قبل إطلاقه. يحدث هذا عندما يُشغِّل حدث الإكمال إلغاء التذكير، أو عندما تقوم بالإلغاء يدوياً.',
  },
];

const COLUMNS_AR = [
  { col: 'مجدول لـ',  desc: 'التاريخ والوقت الدقيقان اللذان تم تعيين الإشعار للإطلاق فيهما، معروضاً بالمنطقة الزمنية المحلية لمتصفحك.' },
  { col: 'الحالة',     desc: 'الحالة الحالية لدورة حياة هذا الإرسال (انظر الجدول أعلاه).' },
  { col: 'العنوان',    desc: 'عنوان الإشعار كما سيظهر على جهاز المشارك.' },
  { col: 'تذكير',      desc: 'يُعلَّم بحرف R إذا كان هذا الصف عملية إرسال تذكير وليس الإشعار الأصلي.' },
  { col: 'إلى',        desc: 'هدف هذا الإرسال. يعرض شارات أسماء المجموعات عندما يستهدف الجدول مجموعات، أو رموز المشاركين الفردية عند استهداف مشاركين محددين، أو «الكل» عند استهداف جميع المشاركين الحاليين.' },
];

function QueueContentAr() {
  return (
    <>
      <p>
        عندما تقوم بإرسال جدول، لا يكتفي Samply بحفظ القاعدة والتحقق منها عند وقت التنفيذ.
        بل يقوم النظام فوراً بتوسيع الجدول إلى قائمة مسطحة من عمليات الإرسال الفردية — صف
        واحد لكل مشارك لكل وقت إرسال — ويكتب كل صف في طابور. يُعدّ الطابور المصدر الوحيد
        للحقيقة فيما يخص التسليم: كل إشعار يرسله Samply يُمثَّل في الطابور كصف، ولا يحدث
        الإرسال إلا إذا كان هناك صف له.
      </p>

      {/* ── Where to find it ──────────────────────────────────────────────── */}
      <h2>أين تجد الطابور</h2>
      <p>
        في دراستك، اذهب إلى قسم <strong>الجدول</strong> وانقر على{" "}
        <strong>عرض الطابور →</strong> في الزاوية اليمنى العليا لرؤية جميع عمليات الإرسال
        من جميع الجداول. يمكنك أيضاً النقر على الرابط بجوار تعريف جدول واحد لتصفية العرض
        فقط لعمليات إرسال ذلك الجدول. يعرض الجزء العلوي من صفحة الطابور تعريفات الجداول —
        القواعد التي تولّد الصفوف. يوجد أدناه جدول صف بصف لكل عملية إرسال فردية.
      </p>

      {/* ── Columns ───────────────────────────────────────────────────────── */}
      <h2>أعمدة الطابور</h2>
      <table>
        <thead>
          <tr>
            <th>العمود</th>
            <th>المحتوى</th>
          </tr>
        </thead>
        <tbody>
          {COLUMNS_AR.map((r) => (
            <tr key={r.col}>
              <td>{r.col}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Statuses ──────────────────────────────────────────────────────── */}
      <h2>حالات الصفوف</h2>
      <p>
        يمر كل صف بدورة حياة. افتراضياً، تُعرض جميع الصفوف — استخدم شارات تصفية الحالة
        لتضييق العرض على الحالات التي تهمك.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '1.6rem 0 3.2rem', border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {STATUSES_AR.map((s, i) => (
          <div
            key={s.status}
            style={{ display: 'flex', gap: '1.6rem', padding: '1rem 1.6rem', borderBottom: i < STATUSES_AR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'flex-start' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: s.color, flexShrink: 0, width: '8rem', paddingTop: '0.15rem' }}>{s.label}</span>
            <span style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6 }}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Filtering ─────────────────────────────────────────────────────── */}
      <h2>التصفية</h2>
      <p>
        فوق جدول الطابور توجد عوامل تصفية اثنان يمكن دمجهما.
      </p>
      <dl>
        <dt>التصفية حسب الحالة</dt>
        <dd>
          خمس شارات قابلة للتبديل: <strong>قيد الانتظار</strong>،{' '}
          <strong>قيد المعالجة</strong>، <strong>تم الإرسال</strong>،{' '}
          <strong>فشل</strong>، و <strong>تم الإلغاء</strong>. كل شارة مستقلة — انقر
          لتفعيلها أو تعطيلها. إذا لم يتم تحديد أي منها، تُعرض جميع الصفوف. اختر أي مجموعة
          لتضييق العرض: على سبيل المثال، فعِّل <strong>قيد الانتظار</strong> و{' '}
          <strong>فشل</strong> معاً لرؤية كل ما لم يُسلَّم بعد. يظهر رابط{' '}
          <strong>مسح</strong> عند تنشيط أي شارة، ويعيد ضبط جميع عوامل تصفية الحالة دفعة واحدة.
        </dd>
        <dt>التصفية حسب المشارك</dt>
        <dd>
          قائمة منسدلة تحتوي على جميع المشاركين المسجلين حسب معرّف Samply (أو الرموز إذا
          تم تعيين الرموز). اختر مشاركاً لرؤية عمليات الإرسال لهذا المشارك فقط. ادمج مع
          مرشح الحالة للإجابة عن أسئلة مثل «ما الإشعارات المعلقة التي لا يزال لدى المشارك X؟».
        </dd>
      </dl>
      <p>
        يعرض الجدول حتى 50 صفاً في الصفحة تطابق عوامل التصفية النشطة. استخدم الترقيم
        للتنقل بين مجموعات النتائج الأكبر، أو ضيِّق العرض باستخدام مرشح الحالة أو المشارك.
      </p>

      {/* ── How expansion works ───────────────────────────────────────────── */}
      <h2>كيف يتم ملء الطابور</h2>
      <p>
        يتم التوسيع بشكل متزامن في اللحظة التي تنقر فيها على زر{' '}
        <strong>جدولة الإشعارات</strong>. لجدول يضم 50 مشاركاً مع إرسالات يومية لمدة
        14 يوماً، يكتب Samply فوراً 700 صف (50 × 14) إلى الطابور. بالنسبة للجداول
        الشخصية، يكتب Samply الصفوف أيضاً وقت تسجيل كل مشارك جديد ينضم بعد إنشاء الجدول.
      </p>
      <p>
        للطابور حد صارم قدره <strong>50,000 صف معلق</strong> لكل دراسة. عند الوصول إلى
        الحد، يجب عليك حذف تعريفات الجداول القديمة (وهذا يحذف أيضاً صفوفها المعلقة) قبل
        إضافة جداول جديدة. لا تُحتسب الصفوف المُرسَلة والملغاة ضمن الحد.
      </p>

      {/* ── Deleting / cancelling ─────────────────────────────────────────── */}
      <h2>حذف جدول</h2>
      <p>
        حذف تعريف جدول من علامة تبويب الجداول يزيل التعريف ويلغي في الوقت نفسه جميع صفوف
        الطابور المعلقة. الصفوف التي أُرسلت بالفعل تبقى سليمة — تظل مرئية، وفي حالة{' '}
        <em>تم الإرسال</em>، وتُحتسب ضمن سجل الردود.
      </p>

      {/* ── Sent history ──────────────────────────────────────────────────── */}
      <h2>بعد الإرسال: السجل</h2>
      <p>
        عندما ينتقل صف إلى حالة <em>تم الإرسال</em>، يُكتب حدث التسليم أيضاً في
        علامة تبويب <strong>السجل</strong> للدراسة. يلتقط سجل التاريخ إشارات
        إضافية تتجاوز الطابور: ما إذا كان المشارك قد استلم الإشعار والتطبيق مفتوح، وما
        إذا كان قد نقر على الإشعار في شريط الإشعارات، وما إذا كان قد فتح رابط الاستطلاع.
      </p>
      <p>
        السجل مرقَّم ويمكن تنزيله بصيغة CSV للتحليل دون اتصال. يحتوي كل صف CSV على معرّف
        Samply، وعنوان الإشعار ونصه، والـ URL، ووقت الإرسال من جانب الخادم، وطوابع
        زمنية لأحداث الاستلام والنقر والفتح.
      </p>

      {/* ── Reminders in the queue ────────────────────────────────────────── */}
      <h2>التذكيرات في الطابور</h2>
      <p>
        إذا تم إعداد جدول بتذكيرات، فإن كل عملية إرسال أصلية تُنشئ صف تذكير واحد أو أكثر
        عند الإزاحات التي تحددها. تُعلَّم هذه الصفوف بشارة <strong>R</strong> في عمود{' '}
        <em>تذكير</em>، وتشترك في عنوان الجدول نفسه. يتم إلغاء صف التذكير تلقائياً بمجرد
        أن يكتشف Samply حدث إكمال للإرسال الأصلي — لذلك لا يرى المشاركون الذين يجيبون
        عن الاستطلاع في الوقت المحدد التذكير أبداً. تُرسَل التذكيرات غير المكتملة بشكل
        طبيعي. لمزيد من المعلومات حول إعداد اكتشاف الإكمال، انظر قسم{' '}
        <a href='/docs/reminders'>التذكيرات</a>.
      </p>
    </>
  );
}
