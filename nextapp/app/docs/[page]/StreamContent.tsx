import type { Locale } from "@/lib/i18n";

function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

const TARGETING = [
  { params: 'groupID + participantID', effect: 'All members of the group except the specified participant.' },
  { params: 'groupID only',            effect: 'All members of the group.' },
  { params: 'participantID only',      effect: 'That specific participant.' },
  { params: 'neither',                 effect: 'All participants in the study.' },
];

const TARGETING_DE = [
  { params: 'groupID + participantID', effect: 'Alle Mitglieder der Gruppe außer dem angegebenen Teilnehmer.' },
  { params: 'groupID only',            effect: 'Alle Mitglieder der Gruppe.' },
  { params: 'participantID only',      effect: 'Genau dieser Teilnehmer.' },
  { params: 'neither',                 effect: 'Alle Teilnehmer der Studie.' },
];

const CODE = `const url = "https://samply.uni-konstanz.de/api/notify";
const data = {
  projectID: "<your-study-id>",
  token:     "<your-notify-token>",
  title:     "your-notification-title",
  message:   "your-notification-message",
  url:       "https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_CODE%&message=%MESSAGE_ID%",
  expireIn:  60,          // minutes before an undelivered notification is discarded
  groupID:       "<optional>",
  participantID: "<optional>",
};

async function sendNotification(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

sendNotification(url, data);`;

const TARGETING_NL = [
  { params: 'groupID + participantID', effect: 'Alle leden van de groep behalve de opgegeven deelnemer.' },
  { params: 'groupID only',            effect: 'Alle leden van de groep.' },
  { params: 'participantID only',      effect: 'Deze specifieke deelnemer.' },
  { params: 'neither',                 effect: 'Alle deelnemers van de studie.' },
];

const TARGETING_RU = [
  { params: 'groupID + participantID', effect: 'Все члены группы, кроме указанного участника.' },
  { params: 'groupID only',            effect: 'Все члены группы.' },
  { params: 'participantID only',      effect: 'Только этот конкретный участник.' },
  { params: 'neither',                 effect: 'Все участники исследования.' },
];

const TARGETING_ZH = [
  { params: 'groupID + participantID', effect: '该组中除指定参与者以外的所有成员。' },
  { params: 'groupID only',            effect: '该组的所有成员。' },
  { params: 'participantID only',      effect: '仅该特定参与者。' },
  { params: 'neither',                 effect: '研究中的所有参与者。' },
];

export default function StreamContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <StreamContentDe />;
  if (locale === "nl") return <StreamContentNl />;
  if (locale === "ru") return <StreamContentRu />;
  if (locale === "zh") return <StreamContentZh />;
  if (locale === "ko") return <StreamContentKo />;
  if (locale === "it") return <StreamContentIt />;
  if (locale === "fr") return <StreamContentFr />;
  if (locale === "es") return <StreamContentEs />;
  if (locale === "pt") return <StreamContentPt />;
  if (locale === "ja") return <StreamContentJa />;
  if (locale === "ar") return <StreamContentAr />;
  if (locale === "pl") return <StreamContentPl />;
  if (locale === "tr") return <StreamContentTr />;
  return <StreamContentEn />;
}

function StreamContentRu() {
  return (
    <>
      <p>
        Stream API позволяет внешней системе — инструменту опроса, рабочему процессу REDCap,
        скрипту или любому HTTP-клиенту — отправлять push-уведомления участникам исследования
        по запросу. Вместо того чтобы ждать запланированной отправки, вы отправляете POST-запрос
        на конечную точку уведомлений Samply, и уведомление доставляется немедленно. Это
        правильный инструмент для дизайнов, зависящих от событий, где уведомление должно
        следовать за интересующим событием, а не за временем на часах.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream API представлен и эмпирически подтверждён в рецензируемой статье в <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Исследование осуществимости с участием <strong style={{ color: 'var(--ink)' }}>110 участников</strong> на протяжении двух недель продемонстрировало <strong style={{ color: 'var(--ink)' }}>83% уровень отклика</strong>: модифицированные ИИ новостные статьи доставлялись в режиме реального времени — что показывает: внешние системы могут передавать участникам динамический персонализированный контент в момент наступления событий.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Конечная точка</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type должен быть <Code>application/json</Code>. Заголовок аутентификации
        не используется — аутентификация выполняется через токен уведомления конкретного
        исследования в теле запроса.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Токен уведомления</h2>
      <p>
        Каждое исследование имеет токен уведомления, который авторизует запросы к API.
        Срок действия токенов задаётся владельцем исследования. Создайте или обновите
        токен на вкладке <strong>Stream API</strong> в панели управления исследованием.
        При обновлении предыдущий токен немедленно аннулируется — обновите все скрипты,
        которые его используют.
      </p>
      <p>
        Только владелец исследования может создавать токены. Соавторы (участники команды)
        могут видеть текущий токен и использовать его в запросах, но не могут его обновлять.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Тело запроса</h2>
      <table>
        <thead>
          <tr>
            <th>Поле</th>
            <th>Обязательно</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>да</td>
            <td>ID исследования, отображаемый в URL панели управления.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>да</td>
            <td>Токен уведомления исследования. Не должен быть просрочен.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>да</td>
            <td>Первая жирная строка push-уведомления.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>да</td>
            <td>Текст тела уведомления.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>нет</td>
            <td>Ссылка на опрос, открывающаяся при нажатии участником на уведомление. Поддерживает заполнители URL (см. ниже).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>нет</td>
            <td>Минуты до отбрасывания недоставленного уведомления. Опустите для отключения срока действия.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>нет</td>
            <td>Краткий ID группы. Ограничивает доставку членами этой группы (см. Нацеливание).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>нет</td>
            <td>Samply ID конкретного участника. Ограничивает доставку одним человеком или исключает его из групповой отправки (см. Нацеливание).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Нацеливание</h2>
      <p>
        Комбинация <Code>groupID</Code> и <Code>participantID</Code> определяет,
        кто получает уведомление:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_RU.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_RU.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        Комбинация <Code>groupID + participantID</Code> предназначена для социальных
        дизайнов ESM: действие участника A запускает уведомление для остальных членов
        его группы, исключая его самого.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Заполнители URL</h2>
      <p>
        Поле <Code>url</Code> поддерживает те же заполнители <Code>%TOKEN%</Code>, что и
        запланированные уведомления. Samply подставляет их для каждого участника перед
        доставкой push-уведомления:
      </p>
      <table>
        <thead><tr><th>Токен</th><th>Заменяется на</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Анонимный Samply ID получателя.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Код участника получателя (остаётся незаменённым, если не задан).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>ID группы получателя (остаётся незаменённым, если не задан).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Уникальный ID данной отправки — используйте его для подключения обратных вызовов завершения и отмены напоминаний.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Пример кода</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Варианты использования</h2>
      <dl>
        <dt>ESM, зависящий от событий, запускаемый из инструмента опроса</dt>
        <dd>
          В конце опроса Qualtrics JavaScript-сниппет отправляет POST-запрос на конечную
          точку уведомлений с <Code>participantID</Code> участника. Уведомление с
          повторным опросом появляется на его устройстве в течение нескольких секунд
          после завершения первого.
        </dd>
        <dt>Дизайны социального взаимодействия</dt>
        <dd>
          Когда участник A отправляет отчёт о социальном взаимодействии, ваш бэкенд
          отправляет POST-запрос с <Code>groupID</Code>, установленным на его группу, и{' '}
          <Code>participantID</Code>, установленным на участника A. Остальные члены
          группы получают уведомление; участник A — нет.
        </dd>
        <dt>Лабораторно запускаемая амбулаторная фаза</dt>
        <dd>
          Лабораторная система запускает амбулаторную фазу исследования, отправляя
          уведомление всем участникам (только <Code>projectID</Code>, без фильтра
          по группе или участнику) в момент окончания лабораторной сессии, независимо
          от времени на часах.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Осуществимость и производительность</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> подтвердили Stream API в двухнедельном ESM-исследовании,
        в котором RSS-лента новостных статей ежедневно загружалась и обрабатывалась ChatGPT
        в трёх условиях — оригинал, перефраз и дезинформация — перед потоковой передачей
        участникам через конечную точку уведомлений. Три уведомления в день доставлялись
        110 участникам на основе актуальных внешних событий, а не фиксированного расписания.
      </p>
      <p>Ключевые результаты:</p>
      <ul>
        <li><strong>83% общий уровень отклика</strong> — сопоставим с обычными ESM-исследованиями аналогичной продолжительности или превышает их.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — уровни отклика различались по платформам; включайте платформу как ковариату в анализы.</li>
        <li><strong>Модификации ИИ сохранили читаемость</strong> — лишь 1,2% модифицированных ИИ элементов были оценены как нечитаемые; дезинформация была успешно введена (84% незнакомости против 73% в контроле).</li>
        <li><strong>Отсев</strong> был сопоставим с другими ESM-исследованиями аналогичной длины, подтверждая, что потоковая передача в реальном времени не увеличивает нагрузку на участников.</li>
      </ul>
      <p>
        Исследование демонстрирует, что Stream API подходит для дизайнов, в которых
        содержимое уведомления должно генерироваться или подбираться в момент доставки —
        включая исследования восприятия новостей, социальных сетей, измерения общественного
        мнения, медицинские интервенции и экологический мониторинг. Приложение с открытым
        исходным кодом, реализующее этот конвейер, доступно на GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Ответы сервера</h2>
      <table>
        <thead><tr><th>Ответ</th><th>Значение</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Уведомление успешно отправлено.</td></tr>
          <tr><td><Code>401</Code></td><td>Токен отсутствует, просрочен или не соответствует проекту.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function StreamContentZh() {
  return (
    <>
      <p>
        Stream API 允许外部系统——问卷工具、REDCap 工作流、脚本或任意 HTTP 客户端——按需
        向研究参与者发送推送通知。无需等待计划发送，只需向 Samply 通知端点发送 POST 请求，
        通知即刻触发。这是事件驱动研究设计的理想工具——通知应跟随感兴趣的事件发生，而非
        依赖固定的时钟时间。
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream API 已在 <em>Behavior Research Methods</em> 的同行评审文章中得到介绍和实证验证：
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          一项历时两周、包含 <strong style={{ color: 'var(--ink)' }}>110 名参与者</strong>的可行性研究展示了 <strong style={{ color: 'var(--ink)' }}>83% 的应答率</strong>，AI 修改的新闻条目以实时方式投递——表明外部系统可以在事件发生的瞬间向参与者推送动态个性化内容。
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>接口端点</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type 必须为 <Code>application/json</Code>。无需认证请求头——
        认证通过请求体中各研究专属的通知令牌完成。
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>通知令牌</h2>
      <p>
        每个研究都有一个通知令牌，用于授权对 API 的请求。令牌的有效期由研究所有者设定。
        在研究控制面板的 <strong>Stream API</strong> 选项卡中生成或重新生成令牌。重新
        生成后，原令牌立即失效——请更新所有使用该令牌的脚本。
      </p>
      <p>
        只有研究所有者可以生成令牌。协作者（成员）可以查看当前令牌并在请求中使用，但
        无法重新生成。
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>请求体</h2>
      <table>
        <thead>
          <tr>
            <th>字段</th>
            <th>必填</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>是</td>
            <td>控制面板 URL 中显示的研究 ID。</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>是</td>
            <td>研究的通知令牌，不得已过期。</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>是</td>
            <td>推送通知的加粗首行文字。</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>是</td>
            <td>通知正文文字。</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>否</td>
            <td>参与者点击通知时打开的问卷链接。支持 URL 占位符（见下文）。</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>否</td>
            <td>未投递通知被丢弃前的等待分钟数。省略则不设过期时间。</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>否</td>
            <td>短组 ID。将投递范围限制为该组成员（见定向投递）。</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>否</td>
            <td>特定参与者的 Samply ID。将投递限制为一人，或在群组发送中排除该人（见定向投递）。</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>定向投递</h2>
      <p>
        <Code>groupID</Code> 与 <Code>participantID</Code> 的组合决定谁接收通知：
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_ZH.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_ZH.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        <Code>groupID + participantID</Code> 组合专为社交 ESM 设计：参与者 A 的操作触发
        向其组内其他成员发送通知，同时排除参与者 A 自身。
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL 占位符</h2>
      <p>
        <Code>url</Code> 字段支持与计划通知相同的 <Code>%TOKEN%</Code> 占位符。Samply 在
        投递推送前会逐一为每位参与者替换占位符：
      </p>
      <table>
        <thead><tr><th>令牌</th><th>替换为</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>接收者的匿名 Samply ID。</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>接收者的参与者代码（未设置时保持不替换）。</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>接收者的组 ID（未设置时保持不替换）。</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>该次发送的唯一 ID——用于接入完成回调并取消提醒。</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>代码示例</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>使用场景</h2>
      <dl>
        <dt>由问卷工具触发的事件驱动 ESM</dt>
        <dd>
          在 Qualtrics 问卷结束时，一段问卷结束 JavaScript 代码以参与者的 <Code>participantID</Code>{' '}
          向通知端点发送 POST 请求。跟进问卷通知在参与者完成第一份问卷后数秒内即出现在其设备上。
        </dd>
        <dt>社交互动研究设计</dt>
        <dd>
          当参与者 A 提交标记社交互动的报告时，您的后端以其组作为 <Code>groupID</Code>、以
          参与者 A 作为 <Code>participantID</Code> 发送 POST 请求。组内其他成员收到通知，
          参与者 A 本人则不会收到。
        </dd>
        <dt>实验室触发的院外追踪阶段</dt>
        <dd>
          实验室系统在实验室会话结束的瞬间，向所有参与者发送通知（仅 <Code>projectID</Code>，
          无组或参与者筛选），从而启动研究的院外追踪阶段，无需依赖固定时钟时间。
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>可行性与性能</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> 在一项为期两周的 ESM 研究中验证了 Stream API：
        每天获取一批新闻 RSS 条目，由 ChatGPT 处理为三种版本——原文、改写版和错误信息版
        ——再通过通知端点推送给参与者。每天向 110 名参与者发送三条通知，触发依据是实时
        外部事件，而非固定计划。
      </p>
      <p>主要发现：</p>
      <ul>
        <li><strong>83% 的总体应答率</strong>——与同等时长的常规 ESM 研究相当或更优。</li>
        <li><strong>Android 89% vs. iOS 77%</strong>——应答率因平台而异；分析时应将平台作为协变量报告。</li>
        <li><strong>AI 修改保持了可读性</strong>——仅 1.2% 的 AI 修改条目被评为不可读；错误信息成功引入（84% 陌生度 vs. 73% 基准）。</li>
        <li><strong>退出率</strong>与同等时长的其他 ESM 研究一致，证实实时推流不会增加参与者负担。</li>
      </ul>
      <p>
        该研究表明，Stream API 适用于通知内容需在投递时生成或选取的设计——包括新闻感知
        研究、社交媒体研究、公众意见测量、医疗干预和环境监测。实现该流程的开源服务器应用
        已在 GitHub 上发布。
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>服务器响应</h2>
      <table>
        <thead><tr><th>响应</th><th>含义</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>通知已成功发送。</td></tr>
          <tr><td><Code>401</Code></td><td>令牌缺失、已过期或与项目不匹配。</td></tr>
        </tbody>
      </table>
    </>
  );
}

function StreamContentEn() {
  return (
    <>
      <p>
        The Stream API lets an external system — a survey tool, a REDCap workflow, a
        script, or any HTTP client — trigger a push notification to study participants on
        demand. Instead of waiting for a scheduled send, you POST to the Samply notify
        endpoint and the notification fires immediately. This is the right tool for
        event-contingent designs where a notification should follow an event of interest
        rather than a clock time.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          The Stream API is introduced and empirically validated in a peer-reviewed article in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          A feasibility study with <strong style={{ color: 'var(--ink)' }}>110 participants</strong> over two weeks demonstrated an <strong style={{ color: 'var(--ink)' }}>83% response rate</strong>, with AI-modified news items delivered in real time — showing that external systems can stream dynamic, personalised content to participants at the moment events occur.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type must be <Code>application/json</Code>. No authentication header is
        used — authentication is handled by the per-study notify token in the request body.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify token</h2>
      <p>
        Each study has a notify token that authorises requests to the API. Tokens have an
        expiry date set by the study owner. Generate or regenerate a token from the{' '}
        <strong>Stream API</strong> tab inside your study dashboard. Regenerating
        immediately invalidates the previous token — update any scripts that use it.
      </p>
      <p>
        Only the study owner can generate tokens. Collaborators (members) can see the
        current token and use it in requests, but cannot regenerate it.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Request body</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>yes</td>
            <td>The study ID shown in the dashboard URL.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>yes</td>
            <td>The study notify token. Must not be expired.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>yes</td>
            <td>The bold first line of the push notification.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>yes</td>
            <td>The notification body text.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>no</td>
            <td>Survey link opened when the participant taps the notification. Supports URL placeholders (see below).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>no</td>
            <td>Minutes before an undelivered notification is discarded. Omit for no expiry.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>no</td>
            <td>Short group ID. Narrows delivery to members of that group (see Targeting).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>no</td>
            <td>Samply ID of a specific participant. Narrows delivery to one person or excludes them from a group send (see Targeting).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targeting</h2>
      <p>
        The combination of <Code>groupID</Code> and <Code>participantID</Code> controls
        who receives the notification:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        The <Code>groupID + participantID</Code> combination is designed for social
        ESM designs: participant A&apos;s action triggers a notification to the rest of
        their group, excluding themselves.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL placeholders</h2>
      <p>
        The <Code>url</Code> field supports the same <Code>%TOKEN%</Code> placeholders as
        scheduled notifications. Samply substitutes them per-participant before delivering
        the push:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Replaced with</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>The recipient&apos;s anonymous Samply ID.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>The recipient&apos;s participant code (left unreplaced if none).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>The recipient&apos;s group ID (left unreplaced if none).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>A unique ID for this send — use it to wire up completion callbacks and cancel reminders.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Code example</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Use cases</h2>
      <dl>
        <dt>Event-contingent ESM triggered from a survey tool</dt>
        <dd>
          At the end of a Qualtrics survey, an end-of-survey JavaScript snippet POSTs to
          the notify endpoint with the participant&apos;s <Code>participantID</Code>. A
          follow-up survey notification arrives on their device within seconds of
          completing the first.
        </dd>
        <dt>Social interaction designs</dt>
        <dd>
          When participant A submits a report flagging a social interaction, your backend
          POSTs with <Code>groupID</Code> set to their group and <Code>participantID</Code>{' '}
          set to participant A. The rest of the group receives a notification; participant
          A does not.
        </dd>
        <dt>Lab-triggered ambulatory phase</dt>
        <dd>
          A lab system starts the ambulatory phase of a study by POSTing a notification to
          all participants (<Code>projectID</Code> only, no group or participant filter)
          the moment the lab session ends, regardless of clock time.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Feasibility and performance</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> validated the Stream API in a two-week ESM study
        where an RSS feed of news articles was fetched daily and processed by ChatGPT into
        three conditions — original, paraphrased, and misinformation — before being streamed
        to participants via the notify endpoint. Three notifications per day were delivered
        to 110 participants based on live external events, not a fixed schedule.
      </p>
      <p>Key findings:</p>
      <ul>
        <li><strong>83% overall response rate</strong> — comparable to or better than conventional ESM studies of similar duration.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — response rates differed by platform; report platform as a covariate in analyses.</li>
        <li><strong>AI modifications maintained readability</strong> — only 1.2% of AI-modified items were rated non-readable; misinformation was successfully introduced (84% unfamiliarity vs. 73% baseline).</li>
        <li><strong>Dropout</strong> was consistent with other ESM studies of comparable length, confirming that real-time streaming does not increase participant burden.</li>
      </ul>
      <p>
        The study demonstrates that the Stream API is suitable for designs where notification
        content must be generated or selected at the moment of delivery — including
        news-perception research, social media studies, public opinion measurement,
        healthcare interventions, and environmental monitoring. An open-source server
        application implementing the pipeline is available on GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Responses</h2>
      <table>
        <thead><tr><th>Response</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notification dispatched successfully.</td></tr>
          <tr><td><Code>401</Code></td><td>Token missing, expired, or does not match the project.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function StreamContentNl() {
  return (
    <>
      <p>
        De Stream API stelt een extern systeem — een vragenlijsttool, een REDCap-workflow, een
        script of een willekeurige HTTP-client — in staat om op aanvraag een pushmelding naar
        studiedeelnemers te sturen. In plaats van te wachten op een gepland verzendmoment,
        stuurt u een POST-verzoek naar het Samply-notificatie-eindpunt en wordt de melding
        direct verzonden. Dit is het juiste instrument voor gebeurtenisafhankelijke ontwerpen
        waarbij een melding op een interessante gebeurtenis moet volgen in plaats van op een
        kloktijd.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          De Stream API wordt geïntroduceerd en empirisch gevalideerd in een peer-reviewed artikel in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Een haalbaarheidsstudie met <strong style={{ color: 'var(--ink)' }}>110 deelnemers</strong> gedurende twee weken toonde een <strong style={{ color: 'var(--ink)' }}>responspercentage van 83%</strong>, waarbij door AI aangepaste nieuwsartikelen in realtime werden afgeleverd — wat aantoont dat externe systemen dynamische, gepersonaliseerde inhoud naar deelnemers kunnen streamen op het moment dat gebeurtenissen plaatsvinden.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Eindpunt</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type moet <Code>application/json</Code> zijn. Er wordt geen
        authenticatieheader gebruikt — authenticatie verloopt via de studiespecifieke
        notify-token in de verzoekbody.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify-token</h2>
      <p>
        Elke studie heeft een notify-token die verzoeken aan de API autoriseert. Tokens hebben
        een vervaldatum die door de studie-eigenaar is ingesteld. Genereer of hergeneer een
        token via het tabblad <strong>Stream API</strong> in uw studiedashboard. Het
        hergenereren maakt de vorige token onmiddellijk ongeldig — werk alle scripts bij die
        er gebruik van maken.
      </p>
      <p>
        Alleen de studie-eigenaar kan tokens genereren. Medewerkers (leden) kunnen de huidige
        token inzien en gebruiken in verzoeken, maar kunnen hem niet hergenereren.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Verzoekbody</h2>
      <table>
        <thead>
          <tr>
            <th>Veld</th>
            <th>Verplicht</th>
            <th>Beschrijving</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>ja</td>
            <td>De studie-ID die wordt weergegeven in de dashboard-URL.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>ja</td>
            <td>De notify-token van de studie. Mag niet verlopen zijn.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>ja</td>
            <td>De vetgedrukte eerste regel van de pushmelding.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>ja</td>
            <td>De berichttekst van de melding.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>nee</td>
            <td>Vragenlijstlink die wordt geopend wanneer de deelnemer op de melding tikt. Ondersteunt URL-plaatshouders (zie hieronder).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>nee</td>
            <td>Minuten voordat een niet-afgeleverde melding wordt verwijderd. Weglaten voor geen vervaldatum.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>nee</td>
            <td>Korte groeps-ID. Beperkt de aflevering tot leden van die groep (zie Targeting).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>nee</td>
            <td>Samply-ID van een specifieke deelnemer. Beperkt de aflevering tot één persoon of sluit hen uit van een groepsverzending (zie Targeting).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targeting</h2>
      <p>
        De combinatie van <Code>groupID</Code> en <Code>participantID</Code> bepaalt wie de
        melding ontvangt:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_NL.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_NL.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        De combinatie <Code>groupID + participantID</Code> is bedoeld voor sociale
        ESM-ontwerpen: de actie van deelnemer A triggert een melding aan de rest van zijn
        groep, zonder henzelf.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL-plaatshouders</h2>
      <p>
        Het veld <Code>url</Code> ondersteunt dezelfde <Code>%TOKEN%</Code>-plaatshouders als
        geplande meldingen. Samply vervangt ze per deelnemer voordat de pushmelding wordt
        afgeleverd:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Vervangen door</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>De anonieme Samply-ID van de ontvanger.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>De deelnemerscode van de ontvanger (blijft onvervangen als er geen is).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>De groeps-ID van de ontvanger (blijft onvervangen als er geen is).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Een unieke ID voor deze verzending — gebruik hem om voltooiingscallbacks te koppelen en herinneringen te annuleren.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Codevoorbeeld</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Toepassingen</h2>
      <dl>
        <dt>Gebeurtenisafhankelijk ESM getriggerd vanuit een vragenlijsttool</dt>
        <dd>
          Aan het einde van een Qualtrics-vragenlijst stuurt een JavaScript-fragment een
          POST-verzoek naar het notify-eindpunt met de <Code>participantID</Code> van de
          deelnemer. Een vervolgvragenlijstmelding verschijnt binnen seconden na het voltooien
          van de eerste op hun apparaat.
        </dd>
        <dt>Sociale interactie-ontwerpen</dt>
        <dd>
          Wanneer deelnemer A een rapport indient over een sociale interactie, stuurt uw
          backend een POST-verzoek met <Code>groupID</Code> ingesteld op zijn groep en{' '}
          <Code>participantID</Code> ingesteld op deelnemer A. De rest van de groep ontvangt
          een melding; deelnemer A niet.
        </dd>
        <dt>Laboratorium-getriggerde ambulante fase</dt>
        <dd>
          Een laboratoriumsysteem start de ambulante fase van een studie door op het moment
          dat de laboratoriumsessie eindigt een melding naar alle deelnemers te sturen
          (alleen <Code>projectID</Code>, geen groeps- of deelnemersfilter), ongeacht de
          kloktijd.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Haalbaarheid en prestaties</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> valideerden de Stream API in een twee weken durende
        ESM-studie waarbij een RSS-feed met nieuwsartikelen dagelijks werd opgehaald en door
        ChatGPT werd verwerkt in drie condities — origineel, geparafraseerd en
        desinformatie — voordat deze via het notify-eindpunt naar deelnemers werd gestreamd.
        Drie meldingen per dag werden afgeleverd aan 110 deelnemers op basis van actuele
        externe gebeurtenissen, niet op basis van een vast schema.
      </p>
      <p>Belangrijkste bevindingen:</p>
      <ul>
        <li><strong>83% totaal responspercentage</strong> — vergelijkbaar met of beter dan conventionele ESM-studies van vergelijkbare duur.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — responspercentages verschilden per platform; rapporteer platform als covariaat in analyses.</li>
        <li><strong>AI-aanpassingen behielden de leesbaarheid</strong> — slechts 1,2% van de door AI aangepaste items werd als onleesbaar beoordeeld; desinformatie werd succesvol geïntroduceerd (84% onbekendheid vs. 73% basisniveau).</li>
        <li><strong>Uitval</strong> was consistent met andere ESM-studies van vergelijkbare duur, wat bevestigt dat realtime streamen de belasting voor deelnemers niet verhoogt.</li>
      </ul>
      <p>
        De studie toont aan dat de Stream API geschikt is voor ontwerpen waarbij de
        meldingsinhoud op het moment van aflevering moet worden gegenereerd of geselecteerd —
        inclusief nieuwsperceptieonderzoek, sociale media-studies, meting van de publieke
        opinie, gezondheidszorginterventies en omgevingsmonitoring. Een open-source
        servertoepassing die de pipeline implementeert, is beschikbaar op GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Antwoorden</h2>
      <table>
        <thead><tr><th>Antwoord</th><th>Betekenis</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Melding succesvol verzonden.</td></tr>
          <tr><td><Code>401</Code></td><td>Token ontbreekt, is verlopen of komt niet overeen met het project.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function StreamContentDe() {
  return (
    <>
      <p>
        Die Stream API ermöglicht es einem externen System — einem Umfrage-Tool, einem
        REDCap-Workflow, einem Skript oder einem beliebigen HTTP-Client — auf Abruf eine
        Push-Benachrichtigung an Studienteilnehmer zu senden. Anstatt auf einen geplanten
        Versand zu warten, senden Sie eine POST-Anfrage an den Samply-Notify-Endpunkt und
        die Benachrichtigung wird sofort ausgelöst. Dies ist das richtige Werkzeug für
        ereignisbedingte Designs, bei denen eine Benachrichtigung einem interessierenden
        Ereignis folgen soll, anstatt einer Uhrzeit.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Die Stream API wird in einem begutachteten Artikel in <em>Behavior Research Methods</em> vorgestellt und empirisch validiert:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Eine Machbarkeitsstudie mit <strong style={{ color: 'var(--ink)' }}>110 Teilnehmern</strong> über zwei Wochen zeigte eine <strong style={{ color: 'var(--ink)' }}>Rücklaufquote von 83 %</strong> mit KI-modifizierten Nachrichtenartikeln, die in Echtzeit geliefert wurden — was zeigt, dass externe Systeme dynamische, personalisierte Inhalte an Teilnehmer im Moment des Ereignisses streamen können.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpunkt</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type muss <Code>application/json</Code> sein. Es wird kein
        Authentifizierungs-Header verwendet — die Authentifizierung erfolgt über den
        studienspezifischen Notify-Token im Anfrage-Body.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify-Token</h2>
      <p>
        Jede Studie verfügt über einen Notify-Token, der Anfragen an die API autorisiert.
        Tokens haben ein vom Studieninhaber festgelegtes Ablaufdatum. Generieren oder
        regenerieren Sie einen Token über den Tab <strong>Stream API</strong> in Ihrem
        Studien-Dashboard. Durch Regenerieren wird der vorherige Token sofort ungültig —
        aktualisieren Sie alle Skripte, die ihn verwenden.
      </p>
      <p>
        Nur der Studieninhaber kann Tokens generieren. Mitarbeiter (Mitglieder) können den
        aktuellen Token einsehen und in Anfragen verwenden, ihn aber nicht regenerieren.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Anfrage-Body</h2>
      <table>
        <thead>
          <tr>
            <th>Feld</th>
            <th>Erforderlich</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>ja</td>
            <td>Die in der Dashboard-URL angezeigte Studien-ID.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>ja</td>
            <td>Der Notify-Token der Studie. Darf nicht abgelaufen sein.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>ja</td>
            <td>Die fett gedruckte erste Zeile der Push-Benachrichtigung.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>ja</td>
            <td>Der Textkörper der Benachrichtigung.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>nein</td>
            <td>Umfrage-Link, der geöffnet wird, wenn der Teilnehmer auf die Benachrichtigung tippt. Unterstützt URL-Platzhalter (siehe unten).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>nein</td>
            <td>Minuten, bevor eine nicht zugestellte Benachrichtigung verworfen wird. Weglassen für kein Ablaufdatum.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>nein</td>
            <td>Kurze Gruppen-ID. Schränkt die Zustellung auf Mitglieder dieser Gruppe ein (siehe Targeting).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>nein</td>
            <td>Samply-ID eines bestimmten Teilnehmers. Schränkt die Zustellung auf eine Person ein oder schließt sie von einem Gruppenversand aus (siehe Targeting).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targeting</h2>
      <p>
        Die Kombination von <Code>groupID</Code> und <Code>participantID</Code> steuert,
        wer die Benachrichtigung erhält:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_DE.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_DE.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        Die Kombination <Code>groupID + participantID</Code> ist für soziale ESM-Designs
        gedacht: Die Aktion von Teilnehmer A löst eine Benachrichtigung an den Rest seiner
        Gruppe aus, ohne ihn selbst einzuschließen.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL-Platzhalter</h2>
      <p>
        Das Feld <Code>url</Code> unterstützt dieselben <Code>%TOKEN%</Code>-Platzhalter
        wie geplante Benachrichtigungen. Samply ersetzt sie pro Teilnehmer, bevor die
        Push-Nachricht zugestellt wird:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Ersetzt durch</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Die anonyme Samply-ID des Empfängers.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Der Teilnehmercode des Empfängers (bleibt unersetzt, wenn keiner vorhanden).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>Die Gruppen-ID des Empfängers (bleibt unersetzt, wenn keine vorhanden).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Eine eindeutige ID für diesen Versand — verwenden Sie sie, um Abschluss-Callbacks zu verknüpfen und Erinnerungen zu stornieren.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Codebeispiel</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Anwendungsfälle</h2>
      <dl>
        <dt>Ereignisbedingtes ESM, ausgelöst von einem Umfrage-Tool</dt>
        <dd>
          Am Ende einer Qualtrics-Umfrage sendet ein JavaScript-Snippet eine POST-Anfrage
          an den Notify-Endpunkt mit der <Code>participantID</Code> des Teilnehmers. Eine
          Folgeumfrage-Benachrichtigung erreicht sein Gerät innerhalb von Sekunden nach
          Abschluss der ersten.
        </dd>
        <dt>Soziale Interaktionsdesigns</dt>
        <dd>
          Wenn Teilnehmer A einen Bericht über eine soziale Interaktion einreicht, sendet
          Ihr Backend eine POST-Anfrage mit <Code>groupID</Code> auf seine Gruppe und{' '}
          <Code>participantID</Code> auf Teilnehmer A gesetzt. Der Rest der Gruppe erhält
          eine Benachrichtigung; Teilnehmer A nicht.
        </dd>
        <dt>Laborgesteuerte ambulante Phase</dt>
        <dd>
          Ein Laborsystem startet die ambulante Phase einer Studie, indem es im Moment des
          Endes der Laborsitzung eine Benachrichtigung an alle Teilnehmer sendet (nur{' '}
          <Code>projectID</Code>, kein Gruppen- oder Teilnehmerfilter), unabhängig von der
          Uhrzeit.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Machbarkeit und Leistung</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> validierten die Stream API in einer zweiwöchigen
        ESM-Studie, bei der ein RSS-Feed mit Nachrichtenartikeln täglich abgerufen und von
        ChatGPT in drei Bedingungen verarbeitet wurde — original, paraphrasiert und
        Fehlinformation — bevor er über den Notify-Endpunkt an Teilnehmer gestreamt wurde.
        Drei Benachrichtigungen pro Tag wurden an 110 Teilnehmer basierend auf aktuellen
        externen Ereignissen geliefert, nicht nach einem festen Zeitplan.
      </p>
      <p>Wichtige Ergebnisse:</p>
      <ul>
        <li><strong>83 % Gesamtrücklaufquote</strong> — vergleichbar mit oder besser als konventionelle ESM-Studien ähnlicher Dauer.</li>
        <li><strong>Android 89 % vs. iOS 77 %</strong> — Rücklaufquoten unterschieden sich nach Plattform; berichten Sie die Plattform als Kovariate in Analysen.</li>
        <li><strong>KI-Modifikationen behielten die Lesbarkeit</strong> — nur 1,2 % der KI-modifizierten Elemente wurden als nicht lesbar bewertet; Fehlinformation wurde erfolgreich eingeführt (84 % Unbekanntheit vs. 73 % Ausgangswert).</li>
        <li><strong>Dropout</strong> war konsistent mit anderen ESM-Studien vergleichbarer Länge, was bestätigt, dass Echtzeit-Streaming die Teilnehmerlast nicht erhöht.</li>
      </ul>
      <p>
        Die Studie zeigt, dass die Stream API für Designs geeignet ist, bei denen der
        Benachrichtigungsinhalt zum Zeitpunkt der Zustellung generiert oder ausgewählt
        werden muss — einschließlich Nachrichtenwahrnehmungsforschung, Social-Media-Studien,
        öffentlicher Meinungsmessung, Gesundheitsinterventionen und Umweltüberwachung. Eine
        Open-Source-Serveranwendung, die die Pipeline implementiert, ist auf GitHub
        verfügbar.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Antworten</h2>
      <table>
        <thead><tr><th>Antwort</th><th>Bedeutung</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Benachrichtigung erfolgreich versendet.</td></tr>
          <tr><td><Code>401</Code></td><td>Token fehlt, ist abgelaufen oder stimmt nicht mit dem Projekt überein.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_KO = [
  { params: 'groupID + participantID', effect: '해당 참여자를 제외한 그룹의 모든 구성원.' },
  { params: 'groupID only',            effect: '그룹의 모든 구성원.' },
  { params: 'participantID only',      effect: '해당 특정 참여자.' },
  { params: 'neither',                 effect: '연구의 모든 참여자.' },
];

const TARGETING_IT = [
  { params: 'groupID + participantID', effect: 'Tutti i membri del gruppo eccetto il partecipante specificato.' },
  { params: 'groupID only',            effect: 'Tutti i membri del gruppo.' },
  { params: 'participantID only',      effect: 'Quel partecipante specifico.' },
  { params: 'neither',                 effect: 'Tutti i partecipanti allo studio.' },
];

function StreamContentKo() {
  return (
    <>
      <p>
        Stream API를 사용하면 외부 시스템(설문 도구, REDCap 워크플로, 스크립트 또는 임의의
        HTTP 클라이언트)이 필요에 따라 연구 참여자에게 푸시 알림을 보낼 수 있습니다.
        예약된 발송을 기다리는 대신 Samply 알림 엔드포인트에 POST 요청을 보내면 알림이
        즉시 발송됩니다. 이것은 이벤트 기반 설계에 적합한 도구로, 알림이 시계 시간이 아닌
        관심 이벤트를 따라야 할 때 사용합니다.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream API는 <em>Behavior Research Methods</em>의 동료 심사 논문에서 소개되고 실증적으로 검증되었습니다:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          2주간 <strong style={{ color: 'var(--ink)' }}>110명의 참여자</strong>를 대상으로 한 타당성 연구에서 AI로 수정된 뉴스 항목을 실시간으로 전달하여 <strong style={{ color: 'var(--ink)' }}>83%의 응답률</strong>을 달성했습니다 — 외부 시스템이 이벤트 발생 순간에 동적이고 개인화된 콘텐츠를 참여자에게 스트리밍할 수 있음을 보여줍니다.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>엔드포인트</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type은 <Code>application/json</Code>이어야 합니다. 인증 헤더는 사용하지
        않으며 — 인증은 요청 본문의 연구별 알림 토큰으로 처리됩니다.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>알림 토큰</h2>
      <p>
        각 연구에는 API 요청을 인증하는 알림 토큰이 있습니다. 토큰의 만료일은 연구 소유자가
        설정합니다. 연구 대시보드의 <strong>Stream API</strong> 탭에서 토큰을 생성하거나
        재생성하십시오. 재생성하면 이전 토큰이 즉시 무효화됩니다 — 해당 토큰을 사용하는
        모든 스크립트를 업데이트하십시오.
      </p>
      <p>
        토큰은 연구 소유자만 생성할 수 있습니다. 공동 연구자(구성원)는 현재 토큰을 확인하고
        요청에 사용할 수 있지만 재생성할 수는 없습니다.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>요청 본문</h2>
      <table>
        <thead>
          <tr>
            <th>필드</th>
            <th>필수</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>예</td>
            <td>대시보드 URL에 표시되는 연구 ID.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>예</td>
            <td>연구 알림 토큰. 만료되지 않아야 합니다.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>예</td>
            <td>푸시 알림의 굵은 첫 번째 줄.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>예</td>
            <td>알림 본문 텍스트.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>아니오</td>
            <td>참여자가 알림을 탭할 때 열리는 설문 링크. URL 플레이스홀더를 지원합니다(아래 참조).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>아니오</td>
            <td>미전달 알림이 삭제되기까지의 분 단위 시간. 만료 없음을 원하면 생략하십시오.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>아니오</td>
            <td>짧은 그룹 ID. 해당 그룹 구성원으로 전달을 제한합니다(대상 지정 참조).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>아니오</td>
            <td>특정 참여자의 Samply ID. 전달을 한 명으로 제한하거나 그룹 발송에서 해당 참여자를 제외합니다(대상 지정 참조).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>대상 지정</h2>
      <p>
        <Code>groupID</Code>와 <Code>participantID</Code>의 조합이 알림을 받는 대상을
        결정합니다:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_KO.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_KO.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        <Code>groupID + participantID</Code> 조합은 사회적 ESM 설계를 위한 것입니다:
        참여자 A의 행동이 자신을 제외한 그룹의 나머지 구성원에게 알림을 트리거합니다.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL 플레이스홀더</h2>
      <p>
        <Code>url</Code> 필드는 예약된 알림과 동일한 <Code>%TOKEN%</Code> 플레이스홀더를
        지원합니다. Samply는 푸시를 전달하기 전에 참여자별로 이를 대체합니다:
      </p>
      <table>
        <thead><tr><th>토큰</th><th>대체 값</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>수신자의 익명 Samply ID.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>수신자의 참여자 코드(없으면 대체되지 않음).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>수신자의 그룹 ID(없으면 대체되지 않음).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>이 발송에 대한 고유 ID — 완료 콜백을 연결하고 리마인더를 취소하는 데 사용하십시오.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>코드 예제</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>활용 사례</h2>
      <dl>
        <dt>설문 도구에서 트리거되는 이벤트 기반 ESM</dt>
        <dd>
          Qualtrics 설문 마지막에 설문 종료 JavaScript 스니펫이 참여자의{' '}
          <Code>participantID</Code>와 함께 알림 엔드포인트에 POST 요청을 보냅니다.
          첫 번째 설문을 완료한 지 몇 초 이내에 후속 설문 알림이 참여자의 기기에
          도착합니다.
        </dd>
        <dt>사회적 상호작용 설계</dt>
        <dd>
          참여자 A가 사회적 상호작용을 표시하는 보고서를 제출하면, 백엔드는{' '}
          <Code>groupID</Code>를 해당 그룹으로, <Code>participantID</Code>를 참여자 A로
          설정하여 POST 요청을 보냅니다. 그룹의 나머지 구성원은 알림을 받고 참여자 A는
          받지 않습니다.
        </dd>
        <dt>실험실에서 트리거되는 외래 단계</dt>
        <dd>
          실험실 시스템이 실험실 세션이 종료되는 순간에 시계 시간에 관계없이 모든
          참여자에게 알림을 발송하여(<Code>projectID</Code>만 사용, 그룹 또는 참여자
          필터 없음) 연구의 외래 단계를 시작합니다.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>타당성 및 성능</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a>는 2주간의 ESM 연구에서 Stream API를 검증했습니다.
        뉴스 기사의 RSS 피드를 매일 가져와 ChatGPT가 원본, 패러프레이즈, 허위 정보의
        세 가지 조건으로 처리한 후 알림 엔드포인트를 통해 참여자에게 스트리밍했습니다.
        고정된 스케줄이 아닌 실시간 외부 이벤트를 기반으로 110명의 참여자에게 하루 세
        번 알림이 전달되었습니다.
      </p>
      <p>주요 결과:</p>
      <ul>
        <li><strong>83%의 전체 응답률</strong> — 비슷한 기간의 일반 ESM 연구와 비슷하거나 더 높습니다.</li>
        <li><strong>Android 89% 대 iOS 77%</strong> — 응답률은 플랫폼에 따라 달랐습니다. 분석에서 플랫폼을 공변량으로 보고하십시오.</li>
        <li><strong>AI 수정은 가독성을 유지했습니다</strong> — AI 수정 항목의 1.2%만 읽을 수 없다고 평가되었습니다. 허위 정보가 성공적으로 도입되었습니다(84%의 비친숙도 대 73% 기준).</li>
        <li><strong>중도 탈락</strong>은 비슷한 기간의 다른 ESM 연구와 일치하여 실시간 스트리밍이 참여자 부담을 증가시키지 않음을 확인했습니다.</li>
      </ul>
      <p>
        이 연구는 Stream API가 전달 시점에 알림 콘텐츠를 생성하거나 선택해야 하는
        설계에 적합함을 보여줍니다 — 뉴스 인식 연구, 소셜 미디어 연구, 여론 측정, 의료
        중재 및 환경 모니터링 포함. 이 파이프라인을 구현하는 오픈 소스 서버 애플리케이션이
        GitHub에서 사용 가능합니다.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>서버 응답</h2>
      <table>
        <thead><tr><th>응답</th><th>의미</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>알림이 성공적으로 전송되었습니다.</td></tr>
          <tr><td><Code>401</Code></td><td>토큰이 없거나, 만료되었거나, 프로젝트와 일치하지 않습니다.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_FR = [
  { params: 'groupID + participantID', effect: 'Tous les membres du groupe sauf le participant spécifié.' },
  { params: 'groupID only',            effect: 'Tous les membres du groupe.' },
  { params: 'participantID only',      effect: 'Ce participant spécifique uniquement.' },
  { params: 'neither',                 effect: "Tous les participants de l'étude." },
];

function StreamContentIt() {
  return (
    <>
      <p>
        La Stream API consente a un sistema esterno — uno strumento per sondaggi, un
        workflow REDCap, uno script o qualsiasi client HTTP — di inviare su richiesta una
        notifica push ai partecipanti allo studio. Invece di attendere un invio pianificato,
        si effettua una POST all'endpoint di notifica di Samply e la notifica viene inviata
        immediatamente. È lo strumento adatto per i disegni event-contingent in cui una
        notifica deve seguire un evento di interesse piuttosto che un orario dell'orologio.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          La Stream API è introdotta e validata empiricamente in un articolo sottoposto a revisione paritaria su <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Uno studio di fattibilità con <strong style={{ color: 'var(--ink)' }}>110 partecipanti</strong> nell'arco di due settimane ha dimostrato un <strong style={{ color: 'var(--ink)' }}>tasso di risposta dell'83%</strong>, con articoli di notizie modificati dall'AI consegnati in tempo reale — mostrando che i sistemi esterni possono inviare in streaming contenuti dinamici e personalizzati ai partecipanti nel momento in cui si verificano gli eventi.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Il Content-Type deve essere <Code>application/json</Code>. Non viene utilizzato
        alcun header di autenticazione — l'autenticazione è gestita dal token di notifica
        specifico per lo studio nel corpo della richiesta.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Token di notifica</h2>
      <p>
        Ogni studio dispone di un token di notifica che autorizza le richieste all'API.
        I token hanno una data di scadenza impostata dal proprietario dello studio.
        Generare o rigenerare un token dalla scheda <strong>Stream API</strong> nel
        pannello di controllo dello studio. La rigenerazione invalida immediatamente il
        token precedente — aggiornare tutti gli script che lo utilizzano.
      </p>
      <p>
        Solo il proprietario dello studio può generare token. I collaboratori (membri)
        possono visualizzare il token corrente e utilizzarlo nelle richieste, ma non
        possono rigenerarlo.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Corpo della richiesta</h2>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obbligatorio</th>
            <th>Descrizione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>sì</td>
            <td>L'ID dello studio mostrato nell'URL del pannello di controllo.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>sì</td>
            <td>Il token di notifica dello studio. Non deve essere scaduto.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>sì</td>
            <td>La prima riga in grassetto della notifica push.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>sì</td>
            <td>Il testo del corpo della notifica.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>no</td>
            <td>Link al sondaggio aperto quando il partecipante tocca la notifica. Supporta i segnaposto URL (vedi sotto).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>no</td>
            <td>Minuti prima che una notifica non consegnata venga scartata. Omettere per nessuna scadenza.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>no</td>
            <td>ID breve del gruppo. Limita la consegna ai membri di quel gruppo (vedere Targeting).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>no</td>
            <td>Samply ID di un partecipante specifico. Limita la consegna a una persona o la esclude da un invio di gruppo (vedere Targeting).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targeting</h2>
      <p>
        La combinazione di <Code>groupID</Code> e <Code>participantID</Code> controlla
        chi riceve la notifica:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_IT.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_IT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        La combinazione <Code>groupID + participantID</Code> è progettata per i disegni
        ESM sociali: l'azione del partecipante A innesca una notifica al resto del suo
        gruppo, escludendo se stesso.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Segnaposto URL</h2>
      <p>
        Il campo <Code>url</Code> supporta gli stessi segnaposto <Code>%TOKEN%</Code>
        delle notifiche pianificate. Samply li sostituisce per ogni partecipante prima di
        consegnare il push:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Sostituito con</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Il Samply ID anonimo del destinatario.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Il codice partecipante del destinatario (lasciato non sostituito se non presente).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>L'ID gruppo del destinatario (lasciato non sostituito se non presente).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Un ID univoco per questo invio — utilizzarlo per collegare i callback di completamento e annullare i promemoria.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Esempio di codice</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Casi d'uso</h2>
      <dl>
        <dt>ESM event-contingent attivato da uno strumento per sondaggi</dt>
        <dd>
          Al termine di un sondaggio Qualtrics, uno snippet JavaScript di fine sondaggio
          invia una POST all'endpoint di notifica con il <Code>participantID</Code> del
          partecipante. Una notifica di sondaggio di follow-up arriva sul suo dispositivo
          entro pochi secondi dal completamento del primo.
        </dd>
        <dt>Disegni di interazione sociale</dt>
        <dd>
          Quando il partecipante A invia un report che segnala un'interazione sociale, il
          backend invia una POST con <Code>groupID</Code> impostato sul suo gruppo e{' '}
          <Code>participantID</Code> impostato sul partecipante A. Il resto del gruppo
          riceve una notifica; il partecipante A no.
        </dd>
        <dt>Fase ambulatoriale attivata in laboratorio</dt>
        <dd>
          Un sistema di laboratorio avvia la fase ambulatoriale di uno studio inviando una
          notifica a tutti i partecipanti (solo <Code>projectID</Code>, nessun filtro per
          gruppo o partecipante) nel momento in cui la sessione di laboratorio termina,
          indipendentemente dall'orario dell'orologio.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Fattibilità e prestazioni</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> hanno validato la Stream API in uno studio ESM della
        durata di due settimane in cui un feed RSS di articoli di notizie veniva recuperato
        quotidianamente ed elaborato da ChatGPT in tre condizioni — originale, parafrasi e
        disinformazione — prima di essere inviato in streaming ai partecipanti tramite
        l'endpoint di notifica. Tre notifiche al giorno sono state consegnate a 110
        partecipanti sulla base di eventi esterni in tempo reale, non di un programma fisso.
      </p>
      <p>Risultati principali:</p>
      <ul>
        <li><strong>Tasso di risposta complessivo dell'83%</strong> — paragonabile o superiore agli studi ESM convenzionali di durata simile.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — i tassi di risposta differivano per piattaforma; riportare la piattaforma come covariata nelle analisi.</li>
        <li><strong>Le modifiche AI hanno mantenuto la leggibilità</strong> — solo l'1,2% degli elementi modificati dall'AI è stato valutato non leggibile; la disinformazione è stata introdotta con successo (84% di non familiarità vs. 73% di base).</li>
        <li><strong>Il tasso di abbandono</strong> era coerente con altri studi ESM di durata comparabile, confermando che lo streaming in tempo reale non aumenta il carico sui partecipanti.</li>
      </ul>
      <p>
        Lo studio dimostra che la Stream API è adatta per disegni in cui il contenuto della
        notifica deve essere generato o selezionato al momento della consegna — inclusi
        ricerche sulla percezione delle notizie, studi sui social media, misurazione
        dell'opinione pubblica, interventi sanitari e monitoraggio ambientale. Un'applicazione
        server open-source che implementa la pipeline è disponibile su GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Risposte</h2>
      <table>
        <thead><tr><th>Risposta</th><th>Significato</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notifica inviata con successo.</td></tr>
          <tr><td><Code>401</Code></td><td>Token mancante, scaduto o non corrispondente al progetto.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function StreamContentFr() {
  return (
    <>
      <p>
        La Stream API permet à un système externe — un outil de sondage, un workflow REDCap,
        un script ou tout client HTTP — de déclencher à la demande une notification push
        destinée aux participants d'une étude. Au lieu d'attendre un envoi planifié, vous
        effectuez une requête POST vers l'endpoint de notification Samply et la notification
        est envoyée immédiatement. C'est l'outil approprié pour les designs event-contingent
        où une notification doit suivre un événement d'intérêt plutôt qu'une heure précise.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          La Stream API est présentée et validée empiriquement dans un article évalué par des pairs dans <em>Behavior Research Methods</em> :
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Une étude de faisabilité menée avec <strong style={{ color: 'var(--ink)' }}>110 participants</strong> sur deux semaines a démontré un <strong style={{ color: 'var(--ink)' }}>taux de réponse de 83 %</strong>, avec des articles de presse modifiés par IA livrés en temps réel — montrant que des systèmes externes peuvent diffuser en continu du contenu dynamique et personnalisé aux participants au moment où les événements se produisent.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Le Content-Type doit être <Code>application/json</Code>. Aucun en-tête
        d'authentification n'est utilisé — l'authentification est gérée par le token de
        notification propre à chaque étude, inclus dans le corps de la requête.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Token de notification</h2>
      <p>
        Chaque étude dispose d'un token de notification qui autorise les requêtes vers
        l'API. Les tokens ont une date d'expiration définie par le propriétaire de l'étude.
        Générez ou régénérez un token depuis l'onglet <strong>Stream API</strong> de votre
        tableau de bord d'étude. La régénération invalide immédiatement le token précédent —
        mettez à jour tous les scripts qui l'utilisent.
      </p>
      <p>
        Seul le propriétaire de l'étude peut générer des tokens. Les collaborateurs
        (membres) peuvent consulter le token actuel et l'utiliser dans des requêtes, mais
        ne peuvent pas le régénérer.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Corps de la requête</h2>
      <table>
        <thead>
          <tr>
            <th>Champ</th>
            <th>Obligatoire</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>oui</td>
            <td>L'identifiant de l'étude affiché dans l'URL du tableau de bord.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>oui</td>
            <td>Le token de notification de l'étude. Il ne doit pas être expiré.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>oui</td>
            <td>La première ligne en gras de la notification push.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>oui</td>
            <td>Le texte du corps de la notification.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>non</td>
            <td>Lien vers le sondage ouvert lorsque le participant appuie sur la notification. Prend en charge les variables de substitution URL (voir ci-dessous).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>non</td>
            <td>Minutes avant qu'une notification non délivrée soit supprimée. Omettre pour ne pas définir d'expiration.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>non</td>
            <td>Identifiant court du groupe. Restreint la livraison aux membres de ce groupe (voir Ciblage).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>non</td>
            <td>Samply ID d'un participant spécifique. Restreint la livraison à une seule personne ou l'exclut d'un envoi groupé (voir Ciblage).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Ciblage</h2>
      <p>
        La combinaison de <Code>groupID</Code> et <Code>participantID</Code> détermine
        qui reçoit la notification :
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_FR.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_FR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        La combinaison <Code>groupID + participantID</Code> est conçue pour les designs
        ESM sociaux : l'action du participant A déclenche une notification aux autres membres
        de son groupe, en l'excluant lui-même.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Variables de substitution URL</h2>
      <p>
        Le champ <Code>url</Code> prend en charge les mêmes variables de substitution
        <Code>%TOKEN%</Code> que les notifications planifiées. Samply les remplace par
        participant avant de délivrer la notification push :
      </p>
      <table>
        <thead><tr><th>Token</th><th>Remplacé par</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Le Samply ID anonyme du destinataire.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Le code participant du destinataire (laissé non remplacé si absent).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>L'identifiant de groupe du destinataire (laissé non remplacé si absent).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Un identifiant unique pour cet envoi — utilisez-le pour connecter les callbacks de complétion et annuler les rappels.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Exemple de code</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Cas d'utilisation</h2>
      <dl>
        <dt>ESM event-contingent déclenché depuis un outil de sondage</dt>
        <dd>
          À la fin d'un sondage Qualtrics, un snippet JavaScript de fin de sondage envoie
          une requête POST à l'endpoint de notification avec le <Code>participantID</Code>{' '}
          du participant. Une notification de sondage de suivi arrive sur son appareil
          quelques secondes après la complétion du premier sondage.
        </dd>
        <dt>Designs d'interaction sociale</dt>
        <dd>
          Lorsque le participant A soumet un rapport signalant une interaction sociale,
          votre backend envoie une requête POST avec <Code>groupID</Code> défini sur son
          groupe et <Code>participantID</Code> défini sur le participant A. Le reste du
          groupe reçoit une notification ; le participant A non.
        </dd>
        <dt>Phase ambulatoire déclenchée en laboratoire</dt>
        <dd>
          Un système de laboratoire démarre la phase ambulatoire d'une étude en envoyant
          une notification à tous les participants (uniquement <Code>projectID</Code>, sans
          filtre de groupe ou de participant) au moment où la session de laboratoire se
          termine, indépendamment de l'heure.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Faisabilité et performances</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> ont validé la Stream API dans une étude ESM de deux
        semaines au cours de laquelle un flux RSS d'articles de presse était récupéré
        quotidiennement et traité par ChatGPT en trois conditions — original, paraphrasé et
        désinformation — avant d'être diffusé aux participants via l'endpoint de notification.
        Trois notifications par jour ont été délivrées à 110 participants sur la base
        d'événements externes en temps réel, et non d'un calendrier fixe.
      </p>
      <p>Résultats clés :</p>
      <ul>
        <li><strong>Taux de réponse global de 83 %</strong> — comparable ou supérieur aux études ESM conventionnelles de durée similaire.</li>
        <li><strong>Android 89 % vs. iOS 77 %</strong> — les taux de réponse diffèrent selon la plateforme ; inclure la plateforme comme covariable dans les analyses.</li>
        <li><strong>Les modifications par IA ont maintenu la lisibilité</strong> — seulement 1,2 % des éléments modifiés par IA ont été jugés illisibles ; la désinformation a été introduite avec succès (84 % d'inconnu vs. 73 % en condition de base).</li>
        <li><strong>Le taux d'abandon</strong> était comparable à celui d'autres études ESM de durée similaire, confirmant que la diffusion en temps réel n'accroît pas la charge des participants.</li>
      </ul>
      <p>
        L'étude démontre que la Stream API est adaptée aux designs dans lesquels le contenu
        de la notification doit être généré ou sélectionné au moment de la livraison — y
        compris la recherche sur la perception des actualités, les études sur les réseaux
        sociaux, la mesure de l'opinion publique, les interventions de santé et la
        surveillance environnementale. Une application serveur open-source implémentant ce
        pipeline est disponible sur GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Réponses du serveur</h2>
      <table>
        <thead><tr><th>Réponse</th><th>Signification</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notification envoyée avec succès.</td></tr>
          <tr><td><Code>401</Code></td><td>Token manquant, expiré ou ne correspondant pas au projet.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_ES = [
  { params: 'groupID + participantID', effect: 'Todos los miembros del grupo excepto el participante especificado.' },
  { params: 'groupID only',            effect: 'Todos los miembros del grupo.' },
  { params: 'participantID only',      effect: 'Ese participante específico únicamente.' },
  { params: 'neither',                 effect: "Todos los participantes del estudio." },
];

function StreamContentEs() {
  return (
    <>
      <p>
        La Stream API permite a un sistema externo —una herramienta de encuesta, un flujo de
        trabajo REDCap, un script o cualquier cliente HTTP— disparar a demanda una notificación
        push a los participantes de un estudio. En lugar de esperar un envío programado, se
        realiza una solicitud POST al endpoint de notificación de Samply y la notificación se
        envía de inmediato. Esta es la herramienta adecuada para diseños event-contingent
        donde una notificación debe seguir a un evento de interés en lugar de una hora del reloj.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          La Stream API se presenta y valida empíricamente en un artículo revisado por pares en <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Un estudio de viabilidad realizado con <strong style={{ color: 'var(--ink)' }}>110 participantes</strong> durante dos semanas demostró una <strong style={{ color: 'var(--ink)' }}>tasa de respuesta del 83 %</strong>, con artículos de noticias modificados por IA entregados en tiempo real — demostrando que los sistemas externos pueden transmitir en flujo contenido dinámico y personalizado a los participantes en el momento en que ocurren los eventos.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        El Content-Type debe ser <Code>application/json</Code>. No se utiliza ningún
        encabezado de autenticación: la autenticación se gestiona mediante el token de
        notificación propio de cada estudio, incluido en el cuerpo de la solicitud.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Token de notificación</h2>
      <p>
        Cada estudio dispone de un token de notificación que autoriza las solicitudes a la
        API. Los tokens tienen una fecha de caducidad definida por el propietario del estudio.
        Genere o regenere un token desde la pestaña <strong>Stream API</strong> de su panel
        de control del estudio. La regeneración invalida inmediatamente el token anterior:
        actualice todos los scripts que lo utilicen.
      </p>
      <p>
        Solo el propietario del estudio puede generar tokens. Los colaboradores (miembros)
        pueden ver el token actual y usarlo en solicitudes, pero no pueden regenerarlo.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Cuerpo de la solicitud</h2>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obligatorio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>sí</td>
            <td>El ID del estudio que aparece en la URL del panel de control.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>sí</td>
            <td>El token de notificación del estudio. No debe haber caducado.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>sí</td>
            <td>La primera línea en negrita de la notificación push.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>sí</td>
            <td>El texto del cuerpo de la notificación.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>no</td>
            <td>Enlace a la encuesta que se abre cuando el participante pulsa la notificación. Admite marcadores de posición URL (véase más abajo).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>no</td>
            <td>Minutos antes de que se descarte una notificación no entregada. Omítalo para no definir caducidad.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>no</td>
            <td>ID corto del grupo. Restringe la entrega a los miembros de ese grupo (véase Segmentación).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>no</td>
            <td>Samply ID de un participante específico. Restringe la entrega a una persona o la excluye de un envío grupal (véase Segmentación).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Segmentación</h2>
      <p>
        La combinación de <Code>groupID</Code> y <Code>participantID</Code> determina
        quién recibe la notificación:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_ES.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_ES.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        La combinación <Code>groupID + participantID</Code> está diseñada para diseños
        ESM sociales: la acción del participante A desencadena una notificación al resto de
        su grupo, excluyéndolo a él mismo.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Marcadores de posición URL</h2>
      <p>
        El campo <Code>url</Code> admite los mismos marcadores de posición <Code>%TOKEN%</Code>
        que las notificaciones programadas. Samply los sustituye por participante antes de
        entregar la notificación push:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Sustituido por</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>El Samply ID anónimo del destinatario.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>El código de participante del destinatario (sin sustituir si no existe).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>El ID de grupo del destinatario (sin sustituir si no existe).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Un ID único para este envío — úselo para conectar las devoluciones de llamada de finalización y cancelar los recordatorios.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Ejemplo de código</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Casos de uso</h2>
      <dl>
        <dt>ESM event-contingent disparado desde una herramienta de encuesta</dt>
        <dd>
          Al final de una encuesta de Qualtrics, un fragmento JavaScript de fin de encuesta
          envía una solicitud POST al endpoint de notificación con el{' '}
          <Code>participantID</Code> del participante. Una notificación de encuesta de
          seguimiento llega a su dispositivo pocos segundos después de completar la primera.
        </dd>
        <dt>Diseños de interacción social</dt>
        <dd>
          Cuando el participante A envía un informe que señala una interacción social, su
          backend realiza una solicitud POST con <Code>groupID</Code> configurado en su
          grupo y <Code>participantID</Code> configurado en el participante A. El resto del
          grupo recibe una notificación; el participante A no.
        </dd>
        <dt>Fase ambulatoria iniciada en el laboratorio</dt>
        <dd>
          Un sistema de laboratorio inicia la fase ambulatoria de un estudio enviando una
          notificación a todos los participantes (solo <Code>projectID</Code>, sin filtro
          de grupo ni de participante) en el momento en que termina la sesión de laboratorio,
          independientemente de la hora del reloj.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Viabilidad y rendimiento</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> validaron la Stream API en un estudio ESM de dos
        semanas en el que se obtenía diariamente un feed RSS de artículos de noticias y
        ChatGPT lo procesaba en tres condiciones —original, parafraseado y desinformación—
        antes de transmitirlo a los participantes mediante el endpoint de notificación. Se
        entregaron tres notificaciones al día a 110 participantes basándose en eventos
        externos en tiempo real, no en un calendario fijo.
      </p>
      <p>Resultados clave:</p>
      <ul>
        <li><strong>Tasa de respuesta global del 83 %</strong> — comparable o superior a estudios ESM convencionales de duración similar.</li>
        <li><strong>Android 89 % vs. iOS 77 %</strong> — las tasas de respuesta difirieron según la plataforma; incluya la plataforma como covariable en los análisis.</li>
        <li><strong>Las modificaciones de IA mantuvieron la legibilidad</strong> — solo el 1,2 % de los elementos modificados por IA fueron calificados como ilegibles; la desinformación se introdujo con éxito (84 % de desconocimiento frente al 73 % de línea base).</li>
        <li><strong>El abandono</strong> fue coherente con otros estudios ESM de duración comparable, confirmando que la transmisión en tiempo real no aumenta la carga sobre los participantes.</li>
      </ul>
      <p>
        El estudio demuestra que la Stream API es adecuada para diseños en los que el
        contenido de la notificación debe generarse o seleccionarse en el momento de la
        entrega, incluyendo investigación sobre percepción de noticias, estudios de redes
        sociales, medición de la opinión pública, intervenciones sanitarias y monitorización
        medioambiental. Una aplicación servidor de código abierto que implementa este
        flujo de trabajo está disponible en GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Respuestas del servidor</h2>
      <table>
        <thead><tr><th>Respuesta</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notificación enviada correctamente.</td></tr>
          <tr><td><Code>401</Code></td><td>Token ausente, caducado o que no coincide con el proyecto.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_PT = [
  { params: 'groupID + participantID', effect: 'Todos os membros do grupo exceto o participante especificado.' },
  { params: 'groupID only',            effect: 'Todos os membros do grupo.' },
  { params: 'participantID only',      effect: 'Apenas esse participante específico.' },
  { params: 'neither',                 effect: 'Todos os participantes do estudo.' },
];

function StreamContentPt() {
  return (
    <>
      <p>
        A Stream API permite que um sistema externo — uma ferramenta de pesquisa, um fluxo de
        trabalho REDCap, um script ou qualquer cliente HTTP — dispare sob demanda uma notificação
        push aos participantes de um estudo. Em vez de aguardar um envio programado, realiza-se
        uma solicitação POST ao endpoint de notificação do Samply e a notificação é enviada
        imediatamente. Esta é a ferramenta adequada para designs event-contingent em que uma
        notificação deve seguir um evento de interesse em vez de um horário fixo.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          A Stream API é apresentada e validada empiricamente em um artigo revisado por pares na <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Um estudo de viabilidade realizado com <strong style={{ color: 'var(--ink)' }}>110 participantes</strong> ao longo de duas semanas demonstrou uma <strong style={{ color: 'var(--ink)' }}>taxa de resposta de 83%</strong>, com artigos de notícias modificados por IA entregues em tempo real — demonstrando que sistemas externos podem transmitir conteúdo dinâmico e personalizado aos participantes no momento em que os eventos ocorrem.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Endpoint</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        O Content-Type deve ser <Code>application/json</Code>. Nenhum cabeçalho de
        autenticação é utilizado — a autenticação é gerenciada pelo token de notificação
        específico de cada estudo, incluído no corpo da solicitação.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Token de notificação</h2>
      <p>
        Cada estudo possui um token de notificação que autoriza as solicitações à API. Os
        tokens têm uma data de expiração definida pelo proprietário do estudo. Gere ou
        regenere um token na aba <strong>Stream API</strong> do seu painel de controle do
        estudo. A regeneração invalida imediatamente o token anterior — atualize todos os
        scripts que o utilizam.
      </p>
      <p>
        Apenas o proprietário do estudo pode gerar tokens. Os colaboradores (membros) podem
        ver o token atual e usá-lo em solicitações, mas não podem regenerá-lo.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Corpo da solicitação</h2>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Obrigatório</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>sim</td>
            <td>O ID do estudo exibido na URL do painel de controle.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>sim</td>
            <td>O token de notificação do estudo. Não deve estar expirado.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>sim</td>
            <td>A primeira linha em negrito da notificação push.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>sim</td>
            <td>O texto do corpo da notificação.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>não</td>
            <td>Link da pesquisa aberto quando o participante toca na notificação. Suporta marcadores de posição de URL (veja abaixo).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>não</td>
            <td>Minutos antes de uma notificação não entregue ser descartada. Omita para não definir expiração.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>não</td>
            <td>ID curto do grupo. Restringe a entrega aos membros desse grupo (veja Segmentação).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>não</td>
            <td>Samply ID de um participante específico. Restringe a entrega a uma pessoa ou a exclui de um envio grupal (veja Segmentação).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Segmentação</h2>
      <p>
        A combinação de <Code>groupID</Code> e <Code>participantID</Code> determina
        quem recebe a notificação:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_PT.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_PT.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        A combinação <Code>groupID + participantID</Code> foi projetada para designs
        ESM sociais: a ação do participante A desencadeia uma notificação para o restante
        do seu grupo, excluindo o próprio participante A.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Marcadores de posição de URL</h2>
      <p>
        O campo <Code>url</Code> suporta os mesmos marcadores de posição <Code>%TOKEN%</Code>
        que as notificações programadas. O Samply os substitui por participante antes de
        entregar a notificação push:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Substituído por</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>O Samply ID anônimo do destinatário.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>O código de participante do destinatário (sem substituição se não existir).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>O ID de grupo do destinatário (sem substituição se não existir).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Um ID único para este envio — use-o para conectar os callbacks de conclusão e cancelar os lembretes.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Exemplo de código</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Casos de uso</h2>
      <dl>
        <dt>ESM event-contingent disparado a partir de uma ferramenta de pesquisa</dt>
        <dd>
          Ao final de uma pesquisa no Qualtrics, um trecho JavaScript de fim de pesquisa
          envia uma solicitação POST ao endpoint de notificação com o{' '}
          <Code>participantID</Code> do participante. Uma notificação de pesquisa de
          acompanhamento chega ao dispositivo dele em poucos segundos após concluir a primeira.
        </dd>
        <dt>Designs de interação social</dt>
        <dd>
          Quando o participante A envia um relatório sinalizando uma interação social, seu
          backend realiza uma solicitação POST com <Code>groupID</Code> definido como seu
          grupo e <Code>participantID</Code> definido como o participante A. O restante do
          grupo recebe uma notificação; o participante A não recebe.
        </dd>
        <dt>Fase ambulatorial iniciada no laboratório</dt>
        <dd>
          Um sistema de laboratório inicia a fase ambulatorial de um estudo enviando uma
          notificação a todos os participantes (apenas <Code>projectID</Code>, sem filtro
          de grupo ou participante) no momento em que a sessão de laboratório termina,
          independentemente do horário.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Viabilidade e desempenho</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> validaram a Stream API em um estudo ESM de duas
        semanas no qual um feed RSS de artigos de notícias era obtido diariamente e processado
        pelo ChatGPT em três condições — original, parafraseado e desinformação — antes de
        ser transmitido aos participantes por meio do endpoint de notificação. Três
        notificações por dia foram entregues a 110 participantes com base em eventos externos
        em tempo real, não em um calendário fixo.
      </p>
      <p>Resultados principais:</p>
      <ul>
        <li><strong>Taxa de resposta global de 83%</strong> — comparável ou superior a estudos ESM convencionais de duração semelhante.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — as taxas de resposta diferiram por plataforma; inclua a plataforma como covariável nas análises.</li>
        <li><strong>As modificações de IA mantiveram a legibilidade</strong> — apenas 1,2% dos itens modificados por IA foram avaliados como ilegíveis; a desinformação foi introduzida com sucesso (84% de desconhecimento versus 73% de linha de base).</li>
        <li><strong>O abandono</strong> foi consistente com outros estudos ESM de duração comparável, confirmando que a transmissão em tempo real não aumenta a carga sobre os participantes.</li>
      </ul>
      <p>
        O estudo demonstra que a Stream API é adequada para designs em que o conteúdo da
        notificação deve ser gerado ou selecionado no momento da entrega — incluindo pesquisa
        sobre percepção de notícias, estudos de redes sociais, medição de opinião pública,
        intervenções de saúde e monitoramento ambiental. Uma aplicação servidor de código
        aberto que implementa esse fluxo de trabalho está disponível no GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Respostas do servidor</h2>
      <table>
        <thead><tr><th>Resposta</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Notificação enviada com sucesso.</td></tr>
          <tr><td><Code>401</Code></td><td>Token ausente, expirado ou que não corresponde ao projeto.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_JA = [
  { params: 'groupID + participantID', effect: '指定された参加者を除く、グループのすべてのメンバー。' },
  { params: 'groupID only',            effect: 'グループのすべてのメンバー。' },
  { params: 'participantID only',      effect: 'その特定の参加者のみ。' },
  { params: 'neither',                 effect: '研究のすべての参加者。' },
];

function StreamContentJa() {
  return (
    <>
      <p>
        Stream APIを使うと、外部システム — 調査ツール、REDCapワークフロー、スクリプト、または
        任意のHTTPクライアント — がオンデマンドで研究参加者にプッシュ通知をトリガーできます。
        スケジュールされた送信を待つ代わりに、Samply通知エンドポイントにPOSTすれば、通知は
        即座に発火します。これは、通知がイベントの発生に追随すべきであり、固定の時刻ではない
        イベント連動型デザインに適したツールです。
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream APIは、<em>Behavior Research Methods</em>の査読付き論文で紹介され、実証的に検証されています：
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          2週間にわたり<strong style={{ color: 'var(--ink)' }}>110名の参加者</strong>を対象とした実現可能性研究では、AIによって修正されたニュース記事をリアルタイムで配信し、<strong style={{ color: 'var(--ink)' }}>83%の応答率</strong>を達成しました — 外部システムがイベント発生の瞬間に動的でパーソナライズされたコンテンツを参加者にストリーミングできることを示しています。
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>エンドポイント</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Typeは <Code>application/json</Code> でなければなりません。認証ヘッダーは
        使用されません — 認証はリクエストボディに含まれる研究ごとのnotifyトークンによって
        処理されます。
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notifyトークン</h2>
      <p>
        各研究にはAPIへのリクエストを認可するnotifyトークンがあります。トークンには研究所有者が
        設定する有効期限があります。研究ダッシュボードの <strong>Stream API</strong> タブから
        トークンを生成または再生成してください。再生成すると、以前のトークンは即座に無効化
        されます — そのトークンを使用しているすべてのスクリプトを更新してください。
      </p>
      <p>
        トークンを生成できるのは研究所有者のみです。共同編集者（メンバー）は現在のトークンを
        確認してリクエストに使用することはできますが、再生成することはできません。
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>リクエストボディ</h2>
      <table>
        <thead>
          <tr>
            <th>フィールド</th>
            <th>必須</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>はい</td>
            <td>ダッシュボードのURLに表示される研究ID。</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>はい</td>
            <td>研究のnotifyトークン。有効期限切れであってはなりません。</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>はい</td>
            <td>プッシュ通知の太字の最初の行。</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>はい</td>
            <td>通知の本文テキスト。</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>いいえ</td>
            <td>参加者が通知をタップしたときに開く調査リンク。URLプレースホルダーをサポートします（下記参照）。</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>いいえ</td>
            <td>未配信の通知が破棄されるまでの分数。有効期限を設定しない場合は省略します。</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>いいえ</td>
            <td>短いグループID。配信をそのグループのメンバーに制限します（ターゲティングを参照）。</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>いいえ</td>
            <td>特定の参加者のSamply ID。配信を一人に制限するか、グループ送信から除外します（ターゲティングを参照）。</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>ターゲティング</h2>
      <p>
        <Code>groupID</Code> と <Code>participantID</Code> の組み合わせが、通知を受け取る
        対象を決定します：
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_JA.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_JA.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        <Code>groupID + participantID</Code> の組み合わせは、社会的ESMデザインのために
        設計されています：参加者Aの行動がグループの他のメンバーへの通知をトリガーし、
        参加者A本人は除外されます。
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URLプレースホルダー</h2>
      <p>
        <Code>url</Code> フィールドは、スケジュールされた通知と同じ <Code>%TOKEN%</Code>
        プレースホルダーをサポートします。Samplyはプッシュを配信する前に、参加者ごとに
        プレースホルダーを置換します：
      </p>
      <table>
        <thead><tr><th>トークン</th><th>置換される値</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>受信者の匿名Samply ID。</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>受信者の参加者コード（設定されていない場合は置換されません）。</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>受信者のグループID（設定されていない場合は置換されません）。</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>この送信の一意のID — 完了コールバックの接続やリマインダーのキャンセルに使用してください。</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>コード例</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>ユースケース</h2>
      <dl>
        <dt>調査ツールからトリガーされるイベント連動型ESM</dt>
        <dd>
          Qualtrics調査の終了時に、調査終了時のJavaScriptスニペットが参加者の{' '}
          <Code>participantID</Code> を付けて通知エンドポイントにPOSTします。
          フォローアップ調査の通知が、最初の調査を完了してから数秒以内に参加者のデバイスに
          届きます。
        </dd>
        <dt>社会的インタラクションのデザイン</dt>
        <dd>
          参加者Aが社会的インタラクションを示すレポートを送信すると、バックエンドが{' '}
          <Code>groupID</Code> を彼のグループに、<Code>participantID</Code> を参加者Aに
          設定してPOSTします。グループの他のメンバーは通知を受け取りますが、参加者Aは
          受け取りません。
        </dd>
        <dt>ラボがトリガーする外来期</dt>
        <dd>
          ラボシステムは、ラボセッションが終わった瞬間に、時刻に関係なくすべての参加者
          （<Code>projectID</Code> のみ、グループや参加者のフィルターなし）に通知をPOST
          することで、研究の外来期を開始します。
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>実現可能性とパフォーマンス</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> は、2週間のESM研究でStream APIを検証しました。
        この研究では、ニュース記事のRSSフィードを毎日取得し、ChatGPTによって3つの条件
        — オリジナル、言い換え、誤情報 — に処理してから、通知エンドポイント経由で
        参加者にストリーミングしました。1日3回の通知が、固定スケジュールではなく
        リアルタイムの外部イベントに基づいて、110名の参加者に配信されました。
      </p>
      <p>主な発見：</p>
      <ul>
        <li><strong>全体応答率83%</strong> — 同程度の期間の従来のESM研究と同等またはそれ以上。</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — 応答率はプラットフォームによって異なりました。分析ではプラットフォームを共変量として報告してください。</li>
        <li><strong>AI修正は可読性を維持</strong> — AIで修正された項目のうち、判読不能と評価されたのはわずか1.2%でした。誤情報は成功裏に導入されました（84%の不慣れさ vs. 73%のベースライン）。</li>
        <li><strong>脱落率</strong>は同等の長さの他のESM研究と一致しており、リアルタイムストリーミングが参加者の負担を増やさないことが確認されました。</li>
      </ul>
      <p>
        この研究は、通知内容を配信時に生成または選択する必要があるデザイン — ニュース知覚研究、
        ソーシャルメディア研究、世論測定、医療介入、環境モニタリングなど — にStream APIが
        適していることを示しています。このパイプラインを実装するオープンソースのサーバー
        アプリケーションはGitHubで入手できます。
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>サーバー応答</h2>
      <table>
        <thead><tr><th>応答</th><th>意味</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>通知が正常に送信されました。</td></tr>
          <tr><td><Code>401</Code></td><td>トークンが欠落、有効期限切れ、またはプロジェクトと一致しません。</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_TR = [
  { params: "groupID + participantID", effect: "Belirtilen katılımcı dışındaki grubun tüm üyeleri." },
  { params: "groupID only",            effect: "Grubun tüm üyeleri." },
  { params: "participantID only",      effect: "Yalnızca o belirli katılımcı." },
  { params: "neither",                 effect: "Çalışmadaki tüm katılımcılar." },
];

function StreamContentTr() {
  return (
    <>
      <p>
        Stream API, harici bir sistemin — bir anket aracı, REDCap iş akışı, betik veya
        herhangi bir HTTP istemcisi — bir çalışmanın katılımcılarına talep üzerine push
        bildirimleri tetiklemesine olanak tanır. Zamanlanmış bir gönderimi beklemek yerine,
        Samply bildirim uç noktasına POST yaparsınız ve bildirim anında ateşlenir. Bildirimin
        bir saat değil bir olayı takip etmesi gereken olay bağımlı tasarımlar için doğru
        araçtır.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream API, <em>Behavior Research Methods</em> dergisindeki hakemli bir makalede tanıtılmış ve ampirik olarak doğrulanmıştır:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          İki hafta boyunca <strong style={{ color: 'var(--ink)' }}>110 katılımcı</strong> ile yürütülen bir fizibilite çalışması, yapay zeka ile değiştirilmiş haber makalelerini gerçek zamanlı olarak iletti ve <strong style={{ color: 'var(--ink)' }}>%83 yanıt oranı</strong> elde etti — bu da harici sistemlerin olaylar gerçekleştiğinde katılımcılara dinamik ve kişiselleştirilmiş içerik yayınlayabileceğini göstermektedir.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Uç Nokta</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type <Code>application/json</Code> olmalıdır. Kimlik doğrulama başlığı
        kullanılmaz — kimlik doğrulama, istek gövdesindeki çalışmaya özgü notify token
        aracılığıyla yapılır.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify Token</h2>
      <p>
        Her çalışmanın API'ye yapılan istekleri yetkilendiren bir notify token'ı vardır.
        Token'ların geçerlilik süresi çalışma sahibi tarafından belirlenir. Token'ı çalışma
        panosundaki <strong>Stream API</strong> sekmesinden oluşturun veya yenileyin.
        Yenileme yaparken önceki token anında geçersiz kılınır — onu kullanan tüm
        betikleri güncelleyin.
      </p>
      <p>
        Token'ları yalnızca çalışma sahibi oluşturabilir. Ortak çalışanlar (ekip üyeleri)
        mevcut token'ı görebilir ve isteklerde kullanabilir, ancak onu yenileyemez.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>İstek Gövdesi</h2>
      <table>
        <thead>
          <tr>
            <th>Alan</th>
            <th>Zorunlu</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>evet</td>
            <td>Pano URL'sinde görüntülenen çalışma kimliği.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>evet</td>
            <td>Çalışmanın notify token'ı. Süresi dolmamış olmalıdır.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>evet</td>
            <td>Push bildiriminin kalın ilk satırı.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>evet</td>
            <td>Bildirimin gövde metni.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>hayır</td>
            <td>Katılımcı bildirime dokunduğunda açılan anket bağlantısı. URL yer tutucularını destekler (aşağıya bakın).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>hayır</td>
            <td>Teslim edilmemiş bir bildirimin atılmasına kadar geçen dakika sayısı. Geçerlilik süresini devre dışı bırakmak için atlayın.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>hayır</td>
            <td>Kısa grup kimliği. Teslimatı bu grubun üyeleriyle sınırlar (bkz. Hedefleme).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>hayır</td>
            <td>Belirli bir katılımcının Samply kimliği. Teslimatı tek bir kişiyle sınırlar veya onu bir grup gönderiminden hariç tutar (bkz. Hedefleme).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Hedefleme</h2>
      <p>
        <Code>groupID</Code> ve <Code>participantID</Code> kombinasyonu, bildirimi kimin
        alacağını belirler:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_TR.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_TR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        <Code>groupID + participantID</Code> kombinasyonu sosyal ESM tasarımları için
        tasarlanmıştır: A katılımcısının eylemi, kendisi hariç grubun diğer üyelerine bir
        bildirim tetikler.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>URL Yer Tutucuları</h2>
      <p>
        <Code>url</Code> alanı, zamanlanmış bildirimlerle aynı <Code>%TOKEN%</Code>
        yer tutucularını destekler. Samply, push'u teslim etmeden önce her katılımcı için
        bunları değiştirir:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Değiştirilen değer</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Alıcının anonim Samply kimliği.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Alıcının katılımcı kodu (ayarlanmamışsa değiştirilmez).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>Alıcının grup kimliği (ayarlanmamışsa değiştirilmez).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Bu gönderimin benzersiz kimliği — tamamlanma geri çağrılarını bağlamak ve hatırlatıcıları iptal etmek için kullanın.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Kod Örneği</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Kullanım Senaryoları</h2>
      <dl>
        <dt>Anket aracından tetiklenen olay bağımlı ESM</dt>
        <dd>
          Qualtrics anketinin sonunda, anket sonu JavaScript parçacığı, katılımcının{' '}
          <Code>participantID</Code> değeri ile bildirim uç noktasına POST yapar. Takip
          anketi bildirimi, ilk anketin tamamlanmasından sonraki birkaç saniye içinde
          katılımcının cihazına ulaşır.
        </dd>
        <dt>Sosyal etkileşim tasarımları</dt>
        <dd>
          A katılımcısı bir sosyal etkileşim raporu gönderdiğinde, arka uçunuz{' '}
          <Code>groupID</Code> grubuna ve <Code>participantID</Code> A katılımcısına
          ayarlanmış bir POST yapar. Grubun diğer üyeleri bildirim alır; A katılımcısı
          almaz.
        </dd>
        <dt>Laboratuvar tetiklemeli ambulatuvar faz</dt>
        <dd>
          Laboratuvar sistemi, laboratuvar oturumunun sona erdiği anda — saatten bağımsız
          olarak — tüm katılımcılara (yalnızca <Code>projectID</Code>, grup veya katılımcı
          filtresi olmadan) bir bildirim POST ederek çalışmanın ambulatuvar fazını başlatır.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Fizibilite ve Performans</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a>, Stream API'yi iki haftalık bir ESM çalışmasında doğruladılar.
        Bu çalışmada, haber makalelerinin bir RSS akışı günlük olarak alındı ve bildirim
        uç noktası aracılığıyla katılımcılara yayınlanmadan önce ChatGPT tarafından üç
        koşulda — orijinal, başka sözcüklerle ifade edilmiş ve dezenformasyon — işlendi.
        110 katılımcıya, sabit bir programa göre değil gerçek zamanlı harici olaylara
        dayanarak günde üç bildirim teslim edildi.
      </p>
      <p>Temel bulgular:</p>
      <ul>
        <li><strong>%83 genel yanıt oranı</strong> — benzer süredeki geleneksel ESM çalışmalarıyla karşılaştırılabilir veya onları aşan.</li>
        <li><strong>Android %89 vs. iOS %77</strong> — yanıt oranları platformlar arasında farklılık gösterdi; analizlerde platformu ortak değişken olarak dahil edin.</li>
        <li><strong>Yapay zeka değişiklikleri okunabilirliği korudu</strong> — yapay zeka ile değiştirilmiş öğelerin yalnızca %1,2'si okunaksız olarak değerlendirildi; dezenformasyon başarıyla tanıtıldı (kontrolde %73'e karşı %84 aşinasızlık).</li>
        <li><strong>Bırakma oranı</strong>, benzer uzunluktaki diğer ESM çalışmalarıyla tutarlıydı ve gerçek zamanlı yayının katılımcı yükünü artırmadığını doğruladı.</li>
      </ul>
      <p>
        Çalışma, bildirim içeriğinin teslim sırasında üretilmesi veya seçilmesi gereken
        tasarımlar için — haber algısı çalışmaları, sosyal medya araştırması, kamuoyu
        ölçümü, tıbbi müdahaleler ve çevresel izleme dahil — Stream API'nin uygun olduğunu
        göstermektedir. Bu boru hattını uygulayan açık kaynaklı bir sunucu uygulaması
        GitHub'da mevcuttur.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Sunucu Yanıtları</h2>
      <table>
        <thead><tr><th>Yanıt</th><th>Anlam</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Bildirim başarıyla gönderildi.</td></tr>
          <tr><td><Code>401</Code></td><td>Token eksik, süresi dolmuş veya projeyle eşleşmiyor.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_PL = [
  { params: "groupID + participantID", effect: "Wszyscy członkowie grupy oprócz wskazanego uczestnika." },
  { params: "groupID only",            effect: "Wszyscy członkowie grupy." },
  { params: "participantID only",      effect: "Tylko ten konkretny uczestnik." },
  { params: "neither",                 effect: "Wszyscy uczestnicy badania." },
];

function StreamContentPl() {
  return (
    <>
      <p>
        Stream API umożliwia zewnętrznemu systemowi — narzędziu ankietowemu, przepływowi
        REDCap, skryptowi lub dowolnemu klientowi HTTP — wyzwalanie powiadomień push do
        uczestników badania na żądanie. Zamiast czekać na zaplanowaną wysyłkę, wysyłasz
        POST do punktu końcowego powiadomień Samply, a powiadomienie jest natychmiast
        odpalane. To właściwe narzędzie dla projektów zależnych od zdarzeń, w których
        powiadomienie musi podążać za zdarzeniem, a nie za godziną.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Stream API został wprowadzony i empirycznie zwalidowany w recenzowanym artykule w czasopiśmie <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Studium wykonalności przeprowadzone z <strong style={{ color: 'var(--ink)' }}>110 uczestnikami</strong> przez dwa tygodnie dostarczyło w czasie rzeczywistym artykuły prasowe modyfikowane przez sztuczną inteligencję i osiągnęło <strong style={{ color: 'var(--ink)' }}>83% wskaźnik odpowiedzi</strong> — pokazując, że systemy zewnętrzne mogą transmitować dynamiczne i spersonalizowane treści do uczestników w momencie wystąpienia zdarzeń.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>Punkt końcowy</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        Content-Type musi być <Code>application/json</Code>. Nie jest używany żaden
        nagłówek uwierzytelniający — uwierzytelnianie odbywa się za pośrednictwem tokenu
        notify specyficznego dla badania w treści żądania.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify Token</h2>
      <p>
        Każde badanie ma token notify, który autoryzuje żądania do API. Okres ważności
        tokenów jest ustalany przez właściciela badania. Wygeneruj lub odnów token w
        zakładce <strong>Stream API</strong> panelu badania. Po odnowieniu poprzedni token
        jest natychmiast unieważniany — zaktualizuj wszystkie skrypty, które go używają.
      </p>
      <p>
        Tokeny mogą być generowane tylko przez właściciela badania. Współpracownicy
        (członkowie zespołu) mogą zobaczyć istniejący token i używać go w żądaniach, ale
        nie mogą go odnowić.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>Treść żądania</h2>
      <table>
        <thead>
          <tr>
            <th>Pole</th>
            <th>Wymagane</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>tak</td>
            <td>Identyfikator badania widoczny w adresie URL panelu.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>tak</td>
            <td>Token notify badania. Nie może być wygasły.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>tak</td>
            <td>Pogrubiona pierwsza linia powiadomienia push.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>tak</td>
            <td>Tekst treści powiadomienia.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>nie</td>
            <td>Link do ankiety otwierany, gdy uczestnik dotknie powiadomienia. Obsługuje symbole zastępcze w adresie URL (patrz poniżej).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>nie</td>
            <td>Liczba minut do odrzucenia niedostarczonego powiadomienia. Pomiń, aby wyłączyć okres ważności.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>nie</td>
            <td>Krótki identyfikator grupy. Ogranicza dostarczenie do członków tej grupy (patrz Targetowanie).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>nie</td>
            <td>Identyfikator Samply konkretnego uczestnika. Ogranicza dostarczenie do jednej osoby lub wyklucza ją z wysyłki grupowej (patrz Targetowanie).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>Targetowanie</h2>
      <p>
        Kombinacja <Code>groupID</Code> i <Code>participantID</Code> określa, kto otrzyma
        powiadomienie:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_PL.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_PL.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        Kombinacja <Code>groupID + participantID</Code> jest zaprojektowana dla projektów
        społecznościowych ESM: działanie uczestnika A wyzwala powiadomienie do innych
        członków grupy z wyjątkiem niego samego.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>Symbole zastępcze w adresie URL</h2>
      <p>
        Pole <Code>url</Code> obsługuje te same symbole zastępcze <Code>%TOKEN%</Code>,
        co zaplanowane powiadomienia. Samply podstawia je dla każdego uczestnika przed
        dostarczeniem pushu:
      </p>
      <table>
        <thead><tr><th>Token</th><th>Wartość zastąpiona</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>Anonimowy identyfikator Samply odbiorcy.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>Kod uczestnika odbiorcy (nie podstawiany, jeśli nie ustawiony).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>Identyfikator grupy odbiorcy (nie podstawiany, jeśli nie ustawiony).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>Unikalny identyfikator tej wysyłki — użyj do łączenia wywołań zwrotnych ukończenia i anulowania przypomnień.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>Przykład kodu</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>Przypadki użycia</h2>
      <dl>
        <dt>ESM zależne od zdarzeń wyzwalane z narzędzia ankietowego</dt>
        <dd>
          Na końcu ankiety Qualtrics fragment JavaScript wykonywany po zakończeniu ankiety
          wysyła POST do punktu końcowego powiadomień z wartością{' '}
          <Code>participantID</Code> uczestnika. Powiadomienie ankiety uzupełniającej
          dociera do urządzenia uczestnika w ciągu kilku sekund od ukończenia pierwszej
          ankiety.
        </dd>
        <dt>Projekty interakcji społecznych</dt>
        <dd>
          Gdy uczestnik A przesyła raport z interakcji społecznej, twoje zaplecze wysyła
          POST z <Code>groupID</Code> ustawionym na grupę i <Code>participantID</Code>{' '}
          ustawionym na uczestnika A. Inni członkowie grupy otrzymują powiadomienie;
          uczestnik A nie.
        </dd>
        <dt>Faza ambulatoryjna wyzwalana w laboratorium</dt>
        <dd>
          System laboratoryjny wysyła POST z powiadomieniem do wszystkich uczestników
          (tylko <Code>projectID</Code>, bez filtra grupy lub uczestnika) w momencie
          zakończenia sesji laboratoryjnej — niezależnie od godziny — rozpoczynając w ten
          sposób fazę ambulatoryjną badania.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>Wykonalność i wydajność</h2>
      <p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> zwalidowali Stream API w dwutygodniowym badaniu ESM.
        W tym badaniu kanał RSS artykułów prasowych był pobierany codziennie i przetwarzany
        przez ChatGPT w trzech warunkach — oryginalnym, sparafrazowanym i dezinformacyjnym —
        przed transmisją do uczestników za pośrednictwem punktu końcowego powiadomień.
        110 uczestnikom dostarczano trzy powiadomienia dziennie, w oparciu o zewnętrzne
        zdarzenia w czasie rzeczywistym, a nie według stałego harmonogramu.
      </p>
      <p>Kluczowe ustalenia:</p>
      <ul>
        <li><strong>83% ogólny wskaźnik odpowiedzi</strong> — porównywalny lub przewyższający tradycyjne badania ESM o podobnym czasie trwania.</li>
        <li><strong>Android 89% vs. iOS 77%</strong> — wskaźniki odpowiedzi różniły się między platformami; uwzględnij platformę jako kowariantę w analizach.</li>
        <li><strong>Modyfikacje AI zachowały czytelność</strong> — tylko 1,2% elementów modyfikowanych przez AI zostało ocenionych jako nieczytelne; dezinformacja została pomyślnie wprowadzona (84% nierozpoznawalności w porównaniu z 73% w grupie kontrolnej).</li>
        <li><strong>Wskaźnik rezygnacji</strong> był zgodny z innymi badaniami ESM o podobnej długości, potwierdzając, że transmisja w czasie rzeczywistym nie zwiększyła obciążenia uczestników.</li>
      </ul>
      <p>
        Badanie pokazuje, że Stream API nadaje się do projektów, w których treść
        powiadomienia musi być generowana lub wybierana w momencie dostarczenia — w tym
        do badań percepcji wiadomości, badań mediów społecznościowych, pomiaru opinii
        publicznej, interwencji medycznych i monitorowania środowiska. Implementacja
        serwera open source realizująca ten potok jest dostępna na GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>Odpowiedzi serwera</h2>
      <table>
        <thead><tr><th>Odpowiedź</th><th>Znaczenie</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>Powiadomienie pomyślnie wysłane.</td></tr>
          <tr><td><Code>401</Code></td><td>Token brakuje, wygasł lub nie pasuje do projektu.</td></tr>
        </tbody>
      </table>
    </>
  );
}

const TARGETING_AR = [
  { params: "groupID + participantID", effect: "جميع أعضاء المجموعة باستثناء المشارك المُحدَّد." },
  { params: "groupID only",            effect: "جميع أعضاء المجموعة." },
  { params: "participantID only",      effect: "هذا المشارك المُحدَّد فقط." },
  { params: "neither",                 effect: "جميع المشاركين في الدراسة." },
];

function StreamContentAr() {
  return (
    <>
      <p>
        يُتيح Stream API لنظام خارجي — أداة استطلاع، أو سير عمل REDCap، أو
        نص برمجي، أو أي عميل HTTP — إطلاق إشعارات الدفع إلى المشاركين في الدراسة
        عند الطلب. بدلاً من انتظار إرسال مُجدوَل، ترسل طلب POST إلى نقطة نهاية
        الإشعار في Samply، فيُطلَق الإشعار فوراً. هذه هي الأداة المناسبة للمشاريع
        المعتمدة على الأحداث، حيث يجب أن يتبع الإشعار حدثاً وليس وقتاً.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          قُدِّم Stream API وجرى التحقق منه تجريبياً في ورقة بحثية مُحكَّمة في مجلة <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2025). Samply Stream API: The AI-enhanced method for real-time event data streaming. <em>Behavior Research Methods</em>, 57, 119.
        </p>
        <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-025-02634-1</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          أجرت دراسة الجدوى مع <strong style={{ color: 'var(--ink)' }}>110 مشاركاً</strong> على مدى أسبوعين تسليم مقالات إخبارية مُعدَّلة بواسطة الذكاء الاصطناعي في الوقت الفعلي وحقّقت <strong style={{ color: 'var(--ink)' }}>معدّل استجابة 83٪</strong> — مُبيِّنةً أن الأنظمة الخارجية يمكنها بثّ محتوى ديناميكي ومُخصَّص إلى المشاركين لحظة وقوع الأحداث.
        </p>
      </div>

      {/* ── Endpoint ──────────────────────────────────────────────────────── */}
      <h2>نقطة النهاية</h2>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', background: 'var(--ink-10)', padding: '0.9rem 1.2rem', borderRadius: '0.6rem', color: 'var(--ink)' }}>
        POST https://samply.uni-konstanz.de/api/notify
      </div>
      <p style={{ marginTop: '1.2rem' }}>
        يجب أن يكون Content-Type بقيمة <Code>application/json</Code>. لا تُستخدَم
        أيّ ترويسة مصادقة — تجري المصادقة عبر رمز notify الخاص بالدراسة
        ضمن جسم الطلب.
      </p>

      {/* ── Token ─────────────────────────────────────────────────────────── */}
      <h2>Notify Token</h2>
      <p>
        لكل دراسة رمز notify يُصرِّح للطلبات إلى الـ API. تُحدِّد مالك الدراسة
        مدّة صلاحية الرمز. أنشئ الرمز أو جدِّده في تبويب <strong>Stream API</strong>
        في لوحة الدراسة. بعد التجديد، يُبطَل الرمز السابق فوراً — حدِّث جميع
        النصوص البرمجية التي تستخدمه.
      </p>
      <p>
        يمكن لمالك الدراسة فقط توليد الرموز. أمّا المتعاونون (أعضاء الفريق)
        فيمكنهم رؤية الرمز الموجود واستخدامه في الطلبات، لكن لا يمكنهم تجديده.
      </p>

      {/* ── Request body ──────────────────────────────────────────────────── */}
      <h2>جسم الطلب</h2>
      <table>
        <thead>
          <tr>
            <th>الحقل</th>
            <th>إلزامي</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Code>projectID</Code></td>
            <td>نعم</td>
            <td>مُعرِّف الدراسة الظاهر في عنوان URL للوحة التحكّم.</td>
          </tr>
          <tr>
            <td><Code>token</Code></td>
            <td>نعم</td>
            <td>رمز notify الخاص بالدراسة. يجب ألّا يكون منتهي الصلاحية.</td>
          </tr>
          <tr>
            <td><Code>title</Code></td>
            <td>نعم</td>
            <td>السطر الأول بخطّ عريض لإشعار الدفع.</td>
          </tr>
          <tr>
            <td><Code>message</Code></td>
            <td>نعم</td>
            <td>نصّ متن الإشعار.</td>
          </tr>
          <tr>
            <td><Code>url</Code></td>
            <td>لا</td>
            <td>رابط الاستطلاع الذي يُفتَح عند ضغط المشارك على الإشعار. يدعم الرموز النائبة في عنوان URL (انظر أدناه).</td>
          </tr>
          <tr>
            <td><Code>expireIn</Code></td>
            <td>لا</td>
            <td>عدد الدقائق التي يُتجاهَل بعدها الإشعار غير المُسلَّم. احذفه لتعطيل فترة الصلاحية.</td>
          </tr>
          <tr>
            <td><Code>groupID</Code></td>
            <td>لا</td>
            <td>مُعرِّف المجموعة المختصر. يُقصِر التسليم على أعضاء هذه المجموعة (انظر الاستهداف).</td>
          </tr>
          <tr>
            <td><Code>participantID</Code></td>
            <td>لا</td>
            <td>مُعرِّف Samply لمشارك مُعيَّن. يُقصِر التسليم على شخص واحد أو يستثنيه من الإرسال إلى المجموعة (انظر الاستهداف).</td>
          </tr>
        </tbody>
      </table>

      {/* ── Targeting ─────────────────────────────────────────────────────── */}
      <h2>الاستهداف</h2>
      <p>
        تُحدِّد توليفة <Code>groupID</Code> و<Code>participantID</Code> مَن
        يتلقّى الإشعار:
      </p>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflow: 'hidden', background: 'var(--surface)', margin: '1rem 0 1.6rem' }}>
        {TARGETING_AR.map((t, i) => (
          <div key={t.params} style={{ display: 'flex', gap: '2rem', padding: '0.9rem 1.4rem', borderBottom: i < TARGETING_AR.length - 1 ? '1px solid var(--ink-10)' : 'none', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'rgba(214,90,48,.06)', padding: '0.15rem 0.6rem', borderRadius: '0.4rem', flexShrink: 0 }}>{t.params}</code>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)' }}>{t.effect}</span>
          </div>
        ))}
      </div>
      <p>
        صُمِّمت توليفة <Code>groupID + participantID</Code> لمشاريع ESM الاجتماعية:
        يُطلِق فعلٌ من المشارك A إشعاراً إلى بقية أعضاء المجموعة باستثنائه هو.
      </p>

      {/* ── URL placeholders ──────────────────────────────────────────────── */}
      <h2>الرموز النائبة في عنوان URL</h2>
      <p>
        يدعم حقل <Code>url</Code> الرموز النائبة نفسها <Code>%TOKEN%</Code> التي
        تدعمها الإشعارات المُجدوَلة. تستبدلها Samply لكل مشارك قبل تسليم الإشعار:
      </p>
      <table>
        <thead><tr><th>الرمز</th><th>القيمة المُستبدَلة</th></tr></thead>
        <tbody>
          <tr><td><Code>%SAMPLY_ID%</Code></td><td>مُعرِّف Samply المجهول الخاص بالمستلِم.</td></tr>
          <tr><td><Code>%PARTICIPANT_CODE%</Code></td><td>رمز المشارك الخاص بالمستلِم (لا يُستبدَل إن لم يكن مُعيَّناً).</td></tr>
          <tr><td><Code>%GROUP_CODE%</Code></td><td>مُعرِّف المجموعة الخاص بالمستلِم (لا يُستبدَل إن لم يكن مُعيَّناً).</td></tr>
          <tr><td><Code>%MESSAGE_ID%</Code></td><td>مُعرِّف فريد لهذا الإرسال — استخدمه لربط استدعاءات الإكمال وإلغاء التذكيرات.</td></tr>
        </tbody>
      </table>

      {/* ── Code example ──────────────────────────────────────────────────── */}
      <h2>مثال برمجي</h2>
      <pre style={{ margin: '0.4rem 0 0', padding: '1.6rem', background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '0.8rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--ink)' }}>
        <code>{CODE}</code>
      </pre>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <h2>حالات الاستخدام</h2>
      <dl>
        <dt>ESM معتمد على الأحداث يُطلَق من أداة استطلاع</dt>
        <dd>
          في نهاية استطلاع Qualtrics، يُنفَّذ مقتطف JavaScript بعد إكمال الاستطلاع
          ويُرسِل طلب POST إلى نقطة نهاية الإشعار يحمل قيمة <Code>participantID</Code>
          للمشارك. يصل إشعار الاستطلاع المتابِع إلى جهاز المشارك خلال ثوانٍ من
          إكمال الاستطلاع الأول.
        </dd>
        <dt>مشاريع التفاعل الاجتماعي</dt>
        <dd>
          عندما يُرسِل المشارك A تقرير تفاعل اجتماعي، يُرسِل الخادم الخلفي طلب POST
          مع <Code>groupID</Code> مُعيَّناً للمجموعة و<Code>participantID</Code>{' '}
          مُعيَّناً للمشارك A. يتلقّى بقية أعضاء المجموعة الإشعار؛ أمّا المشارك A فلا.
        </dd>
        <dt>مرحلة إسعافية يُطلِقها المختبر</dt>
        <dd>
          يُرسِل نظام المختبر طلب POST بإشعار إلى جميع المشاركين
          (بـ <Code>projectID</Code> فقط دون مُرشِّح مجموعة أو مشارك) لحظة انتهاء
          جلسة المختبر — مهما كان الوقت — مُطلِقاً بذلك مرحلة الدراسة الإسعافية.
        </dd>
      </dl>

      {/* ── Feasibility study ─────────────────────────────────────────────── */}
      <h2>الجدوى والأداء</h2>
      <p>
        تَحقَّق <a href='https://doi.org/10.3758/s13428-025-02634-1' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2025)</a> من Stream API في دراسة ESM لمدّة أسبوعين.
        في هذه الدراسة، كان يُسحَب علفٌ RSS للمقالات الإخبارية يومياً ويُعالَج
        بواسطة ChatGPT في ثلاثة شروط — أصلي ومُعاد صياغته ومُضلِّل — قبل بثّه
        إلى المشاركين عبر نقطة نهاية الإشعار. تلقّى 110 مشاركاً ثلاثة إشعارات
        يومياً، مدفوعةً بأحداث خارجية في الوقت الفعلي وليس بجدول ثابت.
      </p>
      <p>أبرز النتائج:</p>
      <ul>
        <li><strong>معدّل استجابة إجمالي 83٪</strong> — مماثل لدراسات ESM التقليدية بمدّة مماثلة أو يفوقها.</li>
        <li><strong>Android 89٪ مقابل iOS 77٪</strong> — اختلفت معدّلات الاستجابة بين المنصّات؛ ضع المنصّة كمتغيّر مُشارِك في التحليلات.</li>
        <li><strong>حافظت تعديلات الذكاء الاصطناعي على القابلية للقراءة</strong> — صُنِّف 1.2٪ فقط من العناصر المُعدَّلة بواسطة الذكاء الاصطناعي على أنها غير مقروءة؛ كما زُرِع التضليل بنجاح (84٪ من عدم القابلية للتمييز مقارنةً بـ 73٪ في المجموعة الضابطة).</li>
        <li><strong>كان معدّل الانسحاب</strong> متّسقاً مع دراسات ESM الأخرى ذات المدّة المماثلة، مما يؤكّد أن البثّ في الوقت الفعلي لم يَزِد العبء على المشاركين.</li>
      </ul>
      <p>
        تُظهِر الدراسة أن Stream API ملائم لمشاريع يجب فيها توليد محتوى الإشعار
        أو اختياره لحظة التسليم — بما في ذلك أبحاث استقبال الأخبار، وأبحاث وسائل
        التواصل الاجتماعي، وقياس الرأي العام، والتدخّلات الطبية، ومراقبة البيئة.
        يتوفّر تطبيق خادم مفتوح المصدر يُنجِز هذا الخطّ على GitHub.
      </p>

      {/* ── Responses ─────────────────────────────────────────────────────── */}
      <h2>ردود الخادم</h2>
      <table>
        <thead><tr><th>الردّ</th><th>المعنى</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code> / <Code>OK</Code></td><td>أُرسِل الإشعار بنجاح.</td></tr>
          <tr><td><Code>401</Code></td><td>الرمز مفقود أو منتهي الصلاحية أو لا يطابق المشروع.</td></tr>
        </tbody>
      </table>
    </>
  );
}
