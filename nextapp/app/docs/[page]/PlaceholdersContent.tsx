import type { Locale } from "@/lib/i18n";

const TOKENS_EN = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'The participant anonymous Samply ID.',
    fallback: 'Always substituted — every participant has one.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'The custom code the participant entered when joining.',
    fallback: 'Left unreplaced if the participant did not enter a code. Enable "Ask for participant code" in Edit study and ensure participants fill it in.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'The short ID of the group the participant belongs to.',
    fallback: 'Left unreplaced if the participant has no group assigned.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'A unique ID generated for this specific send to this participant.',
    fallback: 'Always substituted.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Unix timestamp (milliseconds) of the moment the notification was dispatched.',
    fallback: 'Always substituted.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'How many notifications this participant has received from this study so far, counting from 1. The first notification has batch = 1, the second has batch = 2, and so on.',
    fallback: 'Always substituted.',
    example: '3',
  },
];

const TOKENS_DE = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'Die anonyme Samply-ID des Teilnehmers.',
    fallback: 'Wird immer ersetzt — jeder Teilnehmer hat eine.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'Der individuelle Code, den der Teilnehmer beim Beitritt eingegeben hat.',
    fallback: 'Bleibt unreplaced, wenn der Teilnehmer keinen Code eingegeben hat. Aktivieren Sie „Nach Teilnehmercode fragen" unter Studie bearbeiten und stellen Sie sicher, dass Teilnehmer ihn ausfüllen.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'Die Kurzkennung der Gruppe, der der Teilnehmer angehört.',
    fallback: 'Bleibt unreplaced, wenn dem Teilnehmer keine Gruppe zugewiesen ist.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Eine eindeutige ID, die für diesen spezifischen Versand an diesen Teilnehmer generiert wurde.',
    fallback: 'Wird immer ersetzt.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Unix-Zeitstempel (Millisekunden) des Moments, in dem die Benachrichtigung versandt wurde.',
    fallback: 'Wird immer ersetzt.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Wie viele Benachrichtigungen dieser Teilnehmer bisher von dieser Studie erhalten hat, gezählt ab 1. Die erste Benachrichtigung hat Batch = 1, die zweite hat Batch = 2 usw.',
    fallback: 'Wird immer ersetzt.',
    example: '3',
  },
];

const TOKENS_NL = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'De anonieme Samply-ID van de deelnemer.',
    fallback: 'Altijd vervangen — elke deelnemer heeft er een.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'De aangepaste code die de deelnemer heeft ingevoerd bij het deelnemen.',
    fallback: 'Blijft onvervangen als de deelnemer geen code heeft ingevoerd. Schakel Vraag om deelnemerscode in via Studie bewerken en zorg dat deelnemers dit invullen.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'De korte ID van de groep waartoe de deelnemer behoort.',
    fallback: 'Blijft onvervangen als de deelnemer geen groep toegewezen heeft gekregen.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Een unieke ID die is gegenereerd voor deze specifieke verzending naar deze deelnemer.',
    fallback: 'Altijd vervangen.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Unix-tijdstempel (milliseconden) van het moment waarop de notificatie is verstuurd.',
    fallback: 'Altijd vervangen.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Hoeveel notificaties deze deelnemer tot nu toe van deze studie heeft ontvangen, geteld vanaf 1. De eerste notificatie heeft batch = 1, de tweede heeft batch = 2, enzovoort.',
    fallback: 'Altijd vervangen.',
    example: '3',
  },
];

const TOOLS_EN = [
  {
    name: 'Qualtrics',
    steps: [
      'In your survey flow, add an Embedded Data element before the first question block.',
      'Create fields named id, code, wave, messageid (or whatever names match your URL params).',
      'Qualtrics captures query string parameters automatically when the survey loads from a URL that includes them.',
      'Reference the values in question text or logic with ${e://Field/id} syntax.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Use a survey queue or public survey link with the record parameter.',
      'Pass %PARTICIPANT_CODE% as the record value so each submission maps to the correct REDCap record.',
      'Pass %MESSAGE_ID% as a hidden field if you need to wire up completion callbacks to cancel reminders.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Enable "URL fields" in the survey settings.',
      'Pass placeholder values as URL parameters — LimeSurvey stores them as response data automatically.',
    ],
    url: 'https://survey.institution.edu/123456?lang=en&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOOLS_DE = [
  {
    name: 'Qualtrics',
    steps: [
      'Fügen Sie in Ihrem Umfrage-Flow ein Element „Eingebettete Daten" vor dem ersten Frageblock ein.',
      'Erstellen Sie Felder mit den Namen id, code, wave, messageid (oder welche Namen auch immer zu Ihren URL-Parametern passen).',
      'Qualtrics erfasst Query-String-Parameter automatisch, wenn die Umfrage von einer URL geladen wird, die sie enthält.',
      'Referenzieren Sie die Werte in Fragetext oder Logik mit der Syntax ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Verwenden Sie eine Umfragewarteschlange oder einen öffentlichen Umfragelink mit dem record-Parameter.',
      'Übergeben Sie %PARTICIPANT_CODE% als den record-Wert, damit jede Einreichung dem richtigen REDCap-Datensatz zugeordnet wird.',
      'Übergeben Sie %MESSAGE_ID% als verstecktes Feld, wenn Sie Abschluss-Callbacks zum Abbrechen von Erinnerungen einrichten möchten.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Aktivieren Sie „URL-Felder" in den Umfrageeinstellungen.',
      'Übergeben Sie Platzhalter-Werte als URL-Parameter — LimeSurvey speichert sie automatisch als Antwortdaten.',
    ],
    url: 'https://survey.institution.edu/123456?lang=en&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOOLS_NL = [
  {
    name: 'Qualtrics',
    steps: [
      'Voeg in uw enqueteflow een element Ingesloten data toe vóór het eerste vragenblok.',
      'Maak velden aan met de namen id, code, wave, messageid (of welke namen dan ook overeenkomen met uw URL-parameters).',
      'Qualtrics legt querystring-parameters automatisch vast wanneer de enquete wordt geladen vanuit een URL die ze bevat.',
      'Verwijs naar de waarden in vraagtekst of logica met de syntaxis ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Gebruik een enquetewachtrij of een openbare enquetelink met de record-parameter.',
      'Geef %PARTICIPANT_CODE% door als de record-waarde zodat elke inzending aan het juiste REDCap-record wordt gekoppeld.',
      'Geef %MESSAGE_ID% door als een verborgen veld als u voltooiingscallbacks wilt instellen om herinneringen te annuleren.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Schakel URL-velden in via de enquete-instellingen.',
      'Geef plaatshouderwaarden door als URL-parameters — LimeSurvey slaat ze automatisch op als antwoordgegevens.',
    ],
    url: 'https://survey.institution.edu/123456?lang=nl&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOKENS_RU = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'Анонимный Samply ID участника.',
    fallback: 'Всегда подставляется — у каждого участника он есть.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'Пользовательский код, введённый участником при вступлении.',
    fallback: 'Остаётся без замены, если участник не ввёл код. Включите параметр "Запрашивать код участника" в разделе редактирования исследования и убедитесь, что участники его заполняют.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'Краткий идентификатор группы, к которой принадлежит участник.',
    fallback: 'Остаётся без замены, если участнику не назначена группа.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Уникальный идентификатор, сгенерированный для данной конкретной отправки данному участнику.',
    fallback: 'Всегда подставляется.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Unix-временная метка (в миллисекундах) момента отправки уведомления.',
    fallback: 'Всегда подставляется.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Сколько уведомлений этот участник получил от данного исследования на текущий момент, считая с 1. Первое уведомление имеет batch = 1, второе — batch = 2 и так далее.',
    fallback: 'Всегда подставляется.',
    example: '3',
  },
];

const TOOLS_RU = [
  {
    name: 'Qualtrics',
    steps: [
      'В потоке опроса добавьте элемент "Встроенные данные" перед первым блоком вопросов.',
      'Создайте поля с именами id, code, wave, messageid (или любыми именами, соответствующими параметрам вашего URL).',
      'Qualtrics автоматически захватывает параметры строки запроса, когда опрос загружается по URL, содержащему их.',
      'Ссылайтесь на значения в тексте вопросов или логике с помощью синтаксиса ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Используйте очередь опросов или публичную ссылку на опрос с параметром record.',
      'Передайте %PARTICIPANT_CODE% как значение record, чтобы каждая отправка сопоставлялась с нужной записью REDCap.',
      'Передайте %MESSAGE_ID% как скрытое поле, если необходимо настроить обратные вызовы завершения для отмены напоминаний.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Включите параметр "URL-поля" в настройках опроса.',
      'Передайте значения заполнителей как URL-параметры — LimeSurvey автоматически сохраняет их как данные ответов.',
    ],
    url: 'https://survey.institution.edu/123456?lang=ru&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOKENS_ZH = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: '参与者的匿名 Samply ID。',
    fallback: '始终替换——每位参与者都有一个。',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: '参与者加入时输入的自定义代码。',
    fallback: '若参与者未输入代码则保持不替换。请在编辑研究中启用"要求参与者代码"，并确保参与者填写。',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: '参与者所属组的短 ID。',
    fallback: '若参与者未分配组则保持不替换。',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: '为本次向该参与者的特定发送生成的唯一 ID。',
    fallback: '始终替换。',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: '通知被调度时刻的 Unix 时间戳（毫秒）。',
    fallback: '始终替换。',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: '该参与者迄今从本研究收到的通知数量，从 1 开始计数。第一条通知的 batch = 1，第二条为 batch = 2，依此类推。',
    fallback: '始终替换。',
    example: '3',
  },
];

const TOOLS_ZH = [
  {
    name: 'Qualtrics',
    steps: [
      '在问卷流程中，在第一个问题模块之前添加"嵌入数据"元素。',
      '创建名为 id、code、wave、messageid 的字段（或与您的 URL 参数匹配的任意名称）。',
      '当问卷从包含查询字符串参数的 URL 加载时，Qualtrics 会自动捕获这些参数。',
      '在问题文本或逻辑中使用 ${e://Field/id} 语法引用这些值。',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      '使用带有 record 参数的问卷队列或公开问卷链接。',
      '将 %PARTICIPANT_CODE% 作为 record 值传入，使每次提交映射到正确的 REDCap 记录。',
      '若需要连接完成回调以取消提醒，请将 %MESSAGE_ID% 作为隐藏字段传入。',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      '在问卷设置中启用"URL 字段"。',
      '将占位符值作为 URL 参数传入——LimeSurvey 会自动将其保存为回答数据。',
    ],
    url: 'https://survey.institution.edu/123456?lang=zh&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

function UrlBox({ url }: { url: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--coral)', background: 'var(--coral-soft)', padding: '0.8rem 1.2rem', borderRadius: '0.5rem', wordBreak: 'break-all', margin: '0.8rem 0 0' }}>
      {url}
    </div>
  );
}

function PlaceholdersContentEn() {
  return (
    <>
      <p>
        Placeholders are <Code>%TOKEN%</Code> strings you embed in the notification Web Link.
        When Samply fires the notification, it replaces each token with that
        participant real value before opening the URL. Every participant gets a
        personalised link — no manual work required.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Token reference</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Replaced with</th>
            <th>If unavailable</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_EN.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>How substitution works</h2>
      <p>
        Substitution happens at send time, inside the notification dispatcher, immediately
        before the push is enqueued for delivery. The original URL stored in the schedule
        definition is never modified — the substituted URL exists only in the notification
        payload delivered to the device. Each participant therefore receives a unique URL
        even though all their notifications come from the same schedule.
      </p>
      <p>
        Samply only performs substitution when the URL contains at least one <Code>%</Code>{' '}
        character. URLs without any <Code>%</Code> are passed through unchanged, so there is
        no performance penalty for schedules that do not use placeholders.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Constructing the URL</h2>
      <p>
        Append placeholders as standard query string parameters. You can combine as many as
        you need. A typical URL for a study that tracks participants, waves, and completions
        looks like this:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        When Samply fires this notification for participant <em>abc123</em> on their third
        send, the URL becomes:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tool-specific setup</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_EN.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID and completion tracking</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> is the key that connects a survey response back to the
        notification that triggered it. When a participant completes your survey, your survey
        tool must send a callback to Samply with this ID. Samply uses it to:
      </p>
      <ol>
        <li>Mark the corresponding result record as completed.</li>
        <li>Cancel any pending reminder notifications for that send.</li>
      </ol>
      <p>
        Without this callback, Samply has no way to know the survey was submitted, and
        reminders will fire regardless of completion. The callback setup is covered in{' '}
        <a href='/docs/reminders'>Reminders</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Placeholders in the permanent study link</h2>
      <p>
        The same tokens work in the permanent study link — the URL participants can tap in
        the Samply app at any time, outside of scheduled notifications. This is the
        foundation of <strong>event-contingent designs</strong>: instead of pushing a
        notification at a fixed time, you let participants self-initiate a report whenever a
        relevant event occurs in their day. Configure the permanent link in the{' '}
        <strong>Settings</strong> tab of your study dashboard, under{' '}
        <em>Event-contingent design</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Unreplaced tokens in the URL</dt>
        <dd>
          If a token has no value for a participant (no code, no group), it is left in the
          URL as a literal string — for example, <Code>?code=%PARTICIPANT_CODE%</Code>.
          Your survey tool will receive that literal string as the parameter value. Test with
          a participant who has no code set to confirm your survey handles it gracefully.
        </dd>
        <dt>URL encoding</dt>
        <dd>
          Substituted values are inserted as-is. Samply IDs and message IDs use only
          alphanumeric characters and are URL-safe. Participant codes are researcher-defined
          — avoid spaces and special characters in codes if they will be used in URLs.
        </dd>
        <dt>BATCH counts all sends from the study, not just one schedule</dt>
        <dd>
          The batch number is the total number of results Samply has recorded for that
          participant across the entire study, not just within one schedule. If a participant
          is targeted by two schedules, their batch counter increases with every send from
          either schedule.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentDe() {
  return (
    <>
      <p>
        URL-Platzhalter sind <Code>%TOKEN%</Code>-Zeichenketten, die Sie in den Benachrichtigungs-Weblink einbetten.
        Wenn Samply die Benachrichtigung auslöst, ersetzt es jeden Token durch den
        tatsächlichen Wert des Teilnehmers, bevor die URL geöffnet wird. Jeder Teilnehmer erhält einen
        personalisierten Link — ganz ohne manuelle Arbeit.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Token-Referenz</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Ersetzt durch</th>
            <th>Falls nicht verfügbar</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_DE.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Wie die Ersetzung funktioniert</h2>
      <p>
        Die Ersetzung erfolgt zum Sendezeitpunkt, innerhalb des Benachrichtigungs-Dispatchers, unmittelbar
        bevor der Push zur Zustellung in die Warteschlange eingereiht wird. Die in der Zeitplan-
        Definition gespeicherte Original-URL wird nie verändert — die ersetzte URL existiert nur in der
        Benachrichtigungsnutzlast, die an das Gerät geliefert wird. Jeder Teilnehmer erhält daher eine
        eindeutige URL, obwohl alle seine Benachrichtigungen aus demselben Zeitplan stammen.
      </p>
      <p>
        Samply führt die Ersetzung nur durch, wenn die URL mindestens ein <Code>%</Code>{' '}
        Zeichen enthält. URLs ohne <Code>%</Code> werden unverändert weitergegeben, sodass
        kein Leistungsabzug für Zeitpläne entsteht, die keine URL-Platzhalter verwenden.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Die URL aufbauen</h2>
      <p>
        Fügen Sie URL-Platzhalter als Standard-Query-String-Parameter an. Sie können so viele kombinieren,
        wie Sie benötigen. Eine typische URL für eine Studie, die Teilnehmer, Wellen und Abschlüsse
        verfolgt, sieht so aus:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Wenn Samply diese Benachrichtigung für Teilnehmer <em>abc123</em> bei seinem dritten
        Versand auslöst, wird die URL zu:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Umfragetool-spezifische Einrichtung</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_DE.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID und Abschluss-Tracking</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> ist der Schlüssel, der eine Umfrageantwort mit der
        Benachrichtigung verknüpft, die sie ausgelöst hat. Wenn ein Teilnehmer Ihre Umfrage abschließt,
        muss Ihr Umfragetool einen Callback mit dieser ID an Samply senden. Samply nutzt sie, um:
      </p>
      <ol>
        <li>Den entsprechenden Ergebnisdatensatz als abgeschlossen zu markieren.</li>
        <li>Ausstehende Erinnerungs-Benachrichtigungen für diesen Versand abzubrechen.</li>
      </ol>
      <p>
        Ohne diesen Callback hat Samply keine Möglichkeit zu wissen, dass die Umfrage eingereicht wurde,
        und Erinnerungen werden unabhängig vom Abschluss ausgelöst. Die Callback-Einrichtung wird unter{' '}
        <a href='/docs/reminders'>Erinnerungen</a> beschrieben.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL-Platzhalter im dauerhaften Studienlink</h2>
      <p>
        Dieselben Token funktionieren auch im dauerhaften Studienlink — der URL, die Teilnehmer
        jederzeit in der Samply-App antippen können, außerhalb geplanter Benachrichtigungen. Dies ist die
        Grundlage <strong>ereigniskontingenter Designs</strong>: Anstatt eine Benachrichtigung zu einem
        festen Zeitpunkt zu senden, lassen Sie Teilnehmer selbst einen Bericht starten, sobald ein
        relevantes Ereignis in ihrem Alltag auftritt. Konfigurieren Sie den dauerhaften Link im Tab{' '}
        <strong>Einstellungen</strong> Ihres Studien-Dashboards, unter{' '}
        <em>Ereigniskontingentes Design</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Worauf Sie achten sollten</h3>
      <dl>
        <dt>Nicht ersetzte Token in der URL</dt>
        <dd>
          Wenn ein Token für einen Teilnehmer keinen Wert hat (kein Code, keine Gruppe), bleibt er
          als Literalzeichenkette in der URL — zum Beispiel <Code>?code=%PARTICIPANT_CODE%</Code>.
          Ihr Umfragetool erhält diese Literalzeichenkette als Parameterwert. Testen Sie mit
          einem Teilnehmer ohne gesetzten Code, um sicherzustellen, dass Ihre Umfrage damit
          umgehen kann.
        </dd>
        <dt>URL-Kodierung</dt>
        <dd>
          Ersetzte Werte werden unverändert eingefügt. Samply-IDs und Nachrichten-IDs verwenden nur
          alphanumerische Zeichen und sind URL-sicher. Teilnehmercodes werden vom Forscher definiert —
          vermeiden Sie Leerzeichen und Sonderzeichen in Codes, wenn sie in URLs verwendet werden.
        </dd>
        <dt>BATCH zählt alle Versendungen der Studie, nicht nur einen Zeitplan</dt>
        <dd>
          Die Batch-Nummer ist die Gesamtzahl der von Samply für diesen Teilnehmer in der gesamten
          Studie erfassten Ergebnisse, nicht nur innerhalb eines Zeitplans. Wenn ein Teilnehmer von
          zwei Zeitplänen angesprochen wird, erhöht sich sein Batch-Zähler bei jedem Versand aus
          einem der beiden Zeitpläne.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentNl() {
  return (
    <>
      <p>
        Plaatshouders zijn <Code>%TOKEN%</Code>-tekenreeksen die u insluit in de weblink van de notificatie.
        Wanneer Samply de notificatie verstuurt, vervangt het elke token door de werkelijke waarde van die
        deelnemer voordat de URL wordt geopend. Elke deelnemer ontvangt een gepersonaliseerde link —
        zonder handmatig werk.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Token-overzicht</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Vervangen door</th>
            <th>Indien niet beschikbaar</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_NL.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Hoe vervanging werkt</h2>
      <p>
        Vervanging vindt plaats op het moment van verzending, binnen de notificatie-dispatcher, onmiddellijk
        voordat de push in de wachtrij wordt geplaatst voor aflevering. De originele URL die is opgeslagen
        in de planningsdefinitie wordt nooit gewijzigd — de vervangen URL bestaat alleen in de notificatie-
        payload die aan het apparaat wordt afgeleverd. Elke deelnemer ontvangt daarom een unieke URL,
        ook al komen al hun notificaties uit dezelfde planning.
      </p>
      <p>
        Samply voert vervanging alleen uit als de URL minstens één <Code>%</Code>{' '}
        teken bevat. URL's zonder <Code>%</Code> worden ongewijzigd doorgegeven, zodat er geen
        prestatieverlies is voor planningen die geen plaatshouders gebruiken.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>De URL samenstellen</h2>
      <p>
        Voeg plaatshouders toe als standaard querystring-parameters. U kunt er zoveel combineren als nodig.
        Een typische URL voor een studie die deelnemers, golven en voltooiingen bijhoudt, ziet er als
        volgt uit:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Wanneer Samply deze notificatie verstuurt voor deelnemer <em>abc123</em> bij zijn derde
        verzending, wordt de URL:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Instellen per enquetetool</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_NL.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID en voltooiingsregistratie</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> is de sleutel die een enqueteantwoord koppelt aan de notificatie die
        het heeft geactiveerd. Wanneer een deelnemer uw enquete voltooit, moet uw enquetetool een
        callback naar Samply sturen met deze ID. Samply gebruikt deze om:
      </p>
      <ol>
        <li>Het bijbehorende resultaatrecord als voltooid te markeren.</li>
        <li>Eventuele openstaande herinneringsnotificaties voor die verzending te annuleren.</li>
      </ol>
      <p>
        Zonder deze callback heeft Samply geen mogelijkheid om te weten dat de enquete is ingediend, en
        herinneringen worden verstuurd ongeacht voltooiing. De callback-instelling wordt beschreven in{' '}
        <a href='/docs/reminders'>Herinneringen</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Plaatshouders in de permanente studielink</h2>
      <p>
        Dezelfde tokens werken ook in de permanente studielink — de URL die deelnemers op elk moment
        kunnen aantikken in de Samply-app, buiten geplande notificaties om. Dit is de basis van
        <strong> gebeurtenisgestuurde ontwerpen</strong>: in plaats van een notificatie op een vast
        tijdstip te sturen, laat u deelnemers zelf een rapport starten wanneer een relevant
        gebeurtenis zich voordoet in hun dag. Configureer de permanente link op het tabblad{' '}
        <strong>Instellingen</strong> van uw studiedashboard, onder{' '}
        <em>Gebeurtenisgestuurd ontwerp</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aandachtspunten</h3>
      <dl>
        <dt>Onvervangen tokens in de URL</dt>
        <dd>
          Als een token geen waarde heeft voor een deelnemer (geen code, geen groep), blijft hij als
          letterlijke tekenreeks in de URL staan — bijvoorbeeld <Code>?code=%PARTICIPANT_CODE%</Code>.
          Uw enquetetool ontvangt die letterlijke tekenreeks als parameterwaarde. Test met een deelnemer
          zonder ingestelde code om te bevestigen dat uw enquete dit correct afhandelt.
        </dd>
        <dt>URL-codering</dt>
        <dd>
          Vervangen waarden worden ongewijzigd ingevoegd. Samply-ID's en bericht-ID's gebruiken alleen
          alfanumerieke tekens en zijn URL-veilig. Deelnemerscodes worden door de onderzoeker bepaald —
          vermijd spaties en speciale tekens in codes als ze in URL's worden gebruikt.
        </dd>
        <dt>BATCH telt alle verzendingen van de studie, niet alleen van één planning</dt>
        <dd>
          Het batchnummer is het totale aantal resultaten dat Samply voor die deelnemer heeft
          geregistreerd over de gehele studie, niet alleen binnen één planning. Als een deelnemer
          door twee planningen wordt aangesproken, neemt zijn batchteller toe bij elke verzending
          uit beide planningen.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentRu() {
  return (
    <>
      <p>
        Заполнители — это строки вида <Code>%TOKEN%</Code>, которые вы встраиваете в веб-ссылку уведомления.
        Когда Samply отправляет уведомление, он заменяет каждый токен реальным значением этого
        участника перед открытием URL. Каждый участник получает персонализированную ссылку —
        без какой-либо ручной работы.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Справочник токенов</h2>

      <table>
        <thead>
          <tr>
            <th>Токен</th>
            <th>Заменяется на</th>
            <th>Если недоступен</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_RU.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Как работает подстановка</h2>
      <p>
        Подстановка происходит в момент отправки, внутри диспетчера уведомлений, непосредственно
        перед постановкой push-уведомления в очередь доставки. Исходный URL, хранящийся в определении
        расписания, никогда не изменяется — заменённый URL существует только в полезной нагрузке
        уведомления, доставляемой на устройство. Таким образом, каждый участник получает уникальный URL,
        хотя все их уведомления исходят из одного и того же расписания.
      </p>
      <p>
        Samply выполняет подстановку только в том случае, если URL содержит хотя бы один символ <Code>%</Code>{' '}.
        URL без символа <Code>%</Code> передаются без изменений, поэтому расписания без заполнителей
        не несут никаких потерь производительности.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Формирование URL</h2>
      <p>
        Добавляйте заполнители как стандартные параметры строки запроса. Вы можете комбинировать
        столько, сколько нужно. Типичный URL для исследования, отслеживающего участников, волны и
        завершения, выглядит так:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Когда Samply отправляет это уведомление участнику <em>abc123</em> при его третьей
        отправке, URL принимает вид:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Настройка для конкретных инструментов</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_RU.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID и отслеживание завершения</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> — это ключ, который связывает ответ на опрос с уведомлением,
        инициировавшим его. Когда участник завершает опрос, ваш инструмент опроса должен отправить
        обратный вызов в Samply с этим идентификатором. Samply использует его для того, чтобы:
      </p>
      <ol>
        <li>Отметить соответствующую запись результата как завершённую.</li>
        <li>Отменить все ожидающие уведомления-напоминания для данной отправки.</li>
      </ol>
      <p>
        Без этого обратного вызова Samply не может узнать, что опрос был отправлен, и напоминания
        будут отправляться независимо от завершения. Настройка обратного вызова описана в{' '}
        <a href='/docs/reminders'>Напоминания</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Заполнители в постоянной ссылке исследования</h2>
      <p>
        Те же токены работают в постоянной ссылке исследования — URL, который участники могут нажать
        в приложении Samply в любое время, вне запланированных уведомлений. Это основа
        <strong> событийно-обусловленных дизайнов</strong>: вместо отправки уведомления в фиксированное
        время вы позволяете участникам самостоятельно инициировать отчёт при возникновении
        соответствующего события в течение дня. Настройте постоянную ссылку на вкладке{' '}
        <strong>Настройки</strong> панели управления исследованием, в разделе{' '}
        <em>Событийно-обусловленный дизайн</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>На что обратить внимание</h3>
      <dl>
        <dt>Незамещённые токены в URL</dt>
        <dd>
          Если у участника нет значения для токена (нет кода, нет группы), он остаётся в URL
          как буквальная строка — например, <Code>?code=%PARTICIPANT_CODE%</Code>.
          Ваш инструмент опроса получит эту буквальную строку в качестве значения параметра. Протестируйте
          с участником, у которого не задан код, чтобы убедиться, что ваш опрос корректно это обрабатывает.
        </dd>
        <dt>Кодировка URL</dt>
        <dd>
          Заменённые значения вставляются как есть. Samply ID и Message ID используют только
          буквенно-цифровые символы и являются безопасными для URL. Коды участников задаются
          исследователем — избегайте пробелов и специальных символов в кодах, если они будут
          использоваться в URL.
        </dd>
        <dt>BATCH считает все отправки исследования, а не только одного расписания</dt>
        <dd>
          Номер batch — это общее количество результатов, зафиксированных Samply для данного
          участника по всему исследованию, а не только в рамках одного расписания. Если участник
          охвачен двумя расписаниями, его счётчик batch увеличивается при каждой отправке из
          любого из этих расписаний.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentZh() {
  return (
    <>
      <p>
        占位符是嵌入通知网页链接中的 <Code>%TOKEN%</Code> 字符串。
        当 Samply 触发通知时，它会在打开 URL 之前将每个令牌替换为该参与者的实际值。每位参与者都会收到个性化链接——无需任何手动操作。
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>令牌参考</h2>

      <table>
        <thead>
          <tr>
            <th>令牌</th>
            <th>替换为</th>
            <th>不可用时</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_ZH.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>替换的工作原理</h2>
      <p>
        替换发生在发送时，在通知调度器内部，在推送进入交付队列之前立即执行。日程定义中存储的原始 URL 不会被修改——替换后的 URL 仅存在于送达设备的通知载荷中。因此，即使所有通知来自同一日程，每位参与者收到的 URL 也是唯一的。
      </p>
      <p>
        只有当 URL 包含至少一个 <Code>%</Code>{' '}
        字符时，Samply 才会执行替换。不含 <Code>%</Code> 的 URL 将原样传递，因此不使用占位符的日程不会产生任何性能损耗。
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>构建 URL</h2>
      <p>
        将占位符作为标准查询字符串参数追加。您可以按需组合任意数量的参数。一个追踪参与者、波次和完成情况的典型研究 URL 如下所示：
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        当 Samply 为参与者 <em>abc123</em> 触发第三次发送的通知时，URL 变为：
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>特定工具的设置</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_ZH.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID 与完成追踪</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> 是将问卷回答与触发它的通知关联起来的关键。当参与者完成您的问卷后，您的问卷工具必须向 Samply 发送携带此 ID 的回调。Samply 使用它来：
      </p>
      <ol>
        <li>将对应的结果记录标记为已完成。</li>
        <li>取消该次发送的所有待处理提醒通知。</li>
      </ol>
      <p>
        若没有此回调，Samply 无法得知问卷已提交，提醒将在不考虑完成情况的前提下继续触发。回调设置请参阅{' '}
        <a href='/docs/reminders'>提醒</a>。
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>研究永久链接中的占位符</h2>
      <p>
        同样的令牌也适用于研究永久链接——参与者可以在 Samply 应用中随时点击的 URL，不受计划通知的限制。这是<strong>事件触发型设计</strong>的基础：与其在固定时间推送通知，不如让参与者在日常生活中发生相关事件时自行发起报告。请在研究仪表盘的<strong>设置</strong>选项卡下的<em>事件触发型设计</em>中配置永久链接。
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意事项</h3>
      <dl>
        <dt>URL 中未替换的令牌</dt>
        <dd>
          若某个令牌对某位参与者没有值（无代码、无组），它将以字面字符串形式保留在 URL 中——例如 <Code>?code=%PARTICIPANT_CODE%</Code>。
          您的问卷工具将接收到该字面字符串作为参数值。请用未设置代码的参与者进行测试，以确认您的问卷能够正确处理此情况。
        </dd>
        <dt>URL 编码</dt>
        <dd>
          替换后的值将原样插入。Samply ID 和消息 ID 仅使用字母数字字符，对 URL 安全。参与者代码由研究者定义——若代码将用于 URL，请避免使用空格和特殊字符。
        </dd>
        <dt>BATCH 计算研究的所有发送，而非仅限于一个日程</dt>
        <dd>
          batch 编号是 Samply 为该参与者在整个研究范围内记录的结果总数，而非仅限于一个日程。若参与者被两个日程覆盖，其 batch 计数器在任一日程的每次发送后都会递增。
        </dd>
      </dl>
    </>
  );
}

export default function PlaceholdersContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <PlaceholdersContentDe />;
  if (locale === "nl") return <PlaceholdersContentNl />;
  if (locale === "ru") return <PlaceholdersContentRu />;
  if (locale === "zh") return <PlaceholdersContentZh />;
  if (locale === "ko") return <PlaceholdersContentKo />;
  if (locale === "it") return <PlaceholdersContentIt />;
  if (locale === "fr") return <PlaceholdersContentFr />;
  if (locale === "es") return <PlaceholdersContentEs />;
  if (locale === "pt") return <PlaceholdersContentPt />;
  if (locale === "ja") return <PlaceholdersContentJa />;
  if (locale === "ar") return <PlaceholdersContentAr />;
  if (locale === "pl") return <PlaceholdersContentPl />;
  if (locale === "tr") return <PlaceholdersContentTr />;
  return <PlaceholdersContentEn />;
}

const TOKENS_KO = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: '참여자의 익명 Samply ID입니다.',
    fallback: '항상 대체됩니다 — 모든 참여자가 보유합니다.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: '참여자가 연구 참여 시 입력한 사용자 지정 코드입니다.',
    fallback: '참여자가 코드를 입력하지 않은 경우 대체되지 않고 그대로 남습니다. 연구 편집에서 "참여자 코드 요청"을 활성화하고 참여자가 반드시 입력하도록 안내하십시오.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: '참여자가 속한 그룹의 짧은 ID입니다.',
    fallback: '참여자에게 그룹이 지정되지 않은 경우 대체되지 않고 그대로 남습니다.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: '해당 참여자에게 이 특정 발송에 대해 생성된 고유 ID입니다.',
    fallback: '항상 대체됩니다.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: '알림이 발송된 순간의 Unix 타임스탬프(밀리초)입니다.',
    fallback: '항상 대체됩니다.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: '이 연구에서 해당 참여자가 지금까지 수신한 알림 수이며, 1부터 시작합니다. 첫 번째 알림의 batch = 1, 두 번째 알림의 batch = 2 등입니다.',
    fallback: '항상 대체됩니다.',
    example: '3',
  },
];

const TOOLS_KO = [
  {
    name: 'Qualtrics',
    steps: [
      '설문 흐름에서 첫 번째 질문 블록 앞에 포함된 데이터 요소를 추가하십시오.',
      'id, code, wave, messageid (또는 URL 파라미터에 맞는 이름)로 필드를 생성하십시오.',
      'Qualtrics는 해당 파라미터가 포함된 URL에서 설문이 로드될 때 쿼리 문자열 파라미터를 자동으로 캡처합니다.',
      '질문 텍스트 또는 로직에서 ${e://Field/id} 구문으로 값을 참조하십시오.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'record 파라미터가 포함된 설문 대기열 또는 공개 설문 링크를 사용하십시오.',
      '%PARTICIPANT_CODE%를 record 값으로 전달하여 각 제출이 올바른 REDCap 레코드에 매핑되도록 하십시오.',
      '완료 콜백을 통해 알림을 취소해야 하는 경우 %MESSAGE_ID%를 숨겨진 필드로 전달하십시오.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      '설문 설정에서 "URL 필드"를 활성화하십시오.',
      '플레이스홀더 값을 URL 파라미터로 전달하십시오 — LimeSurvey가 자동으로 응답 데이터로 저장합니다.',
    ],
    url: 'https://survey.institution.edu/123456?lang=ko&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOKENS_IT = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: "L'ID Samply anonimo del partecipante.",
    fallback: 'Sempre sostituito — ogni partecipante ne ha uno.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'Il codice personalizzato inserito dal partecipante al momento dell\'iscrizione.',
    fallback: 'Lasciato non sostituito se il partecipante non ha inserito un codice. Abilitare "Richiedi codice partecipante" in Modifica studio e assicurarsi che i partecipanti lo compilino.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: "L'ID breve del gruppo a cui appartiene il partecipante.",
    fallback: 'Lasciato non sostituito se al partecipante non è assegnato alcun gruppo.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Un ID univoco generato per questo specifico invio a questo partecipante.',
    fallback: 'Sempre sostituito.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Timestamp Unix (millisecondi) del momento in cui la notifica è stata inviata.',
    fallback: 'Sempre sostituito.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Quante notifiche questo partecipante ha ricevuto finora da questo studio, contando da 1. La prima notifica ha batch = 1, la seconda ha batch = 2, e così via.',
    fallback: 'Sempre sostituito.',
    example: '3',
  },
];

const TOOLS_IT = [
  {
    name: 'Qualtrics',
    steps: [
      'Nel flusso del sondaggio, aggiungere un elemento Dati incorporati prima del primo blocco di domande.',
      'Creare campi denominati id, code, wave, messageid (o qualsiasi nome corrisponda ai parametri URL).',
      'Qualtrics acquisisce automaticamente i parametri della stringa di query quando il sondaggio viene caricato da un URL che li include.',
      'Fare riferimento ai valori nel testo delle domande o nella logica con la sintassi ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Utilizzare una coda di sondaggi o un link a sondaggio pubblico con il parametro record.',
      'Passare %PARTICIPANT_CODE% come valore record in modo che ogni invio venga mappato al record REDCap corretto.',
      'Passare %MESSAGE_ID% come campo nascosto se si desidera collegare i callback di completamento per annullare i promemoria.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Abilitare "Campi URL" nelle impostazioni del sondaggio.',
      'Passare i valori segnaposto come parametri URL — LimeSurvey li salva automaticamente come dati di risposta.',
    ],
    url: 'https://survey.institution.edu/123456?lang=it&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

function PlaceholdersContentKo() {
  return (
    <>
      <p>
        플레이스홀더는 알림 웹 링크에 삽입하는 <Code>%TOKEN%</Code> 문자열입니다.
        Samply가 알림을 발송할 때 URL을 열기 전에 각 토큰을 해당 참여자의 실제 값으로 대체합니다.
        모든 참여자가 개인화된 링크를 받게 되며 — 수동 작업은 필요하지 않습니다.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>토큰 참조</h2>

      <table>
        <thead>
          <tr>
            <th>토큰</th>
            <th>대체되는 값</th>
            <th>사용 불가 시</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_KO.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>대체 방식의 작동 원리</h2>
      <p>
        대체는 발송 시점에 알림 디스패처 내부에서, 푸시가 전달 대기열에 등록되기 직전에 이루어집니다.
        일정 정의에 저장된 원본 URL은 변경되지 않으며 — 대체된 URL은 기기에 전달되는 알림 페이로드에만 존재합니다.
        따라서 모든 알림이 동일한 일정에서 발송되더라도 각 참여자는 고유한 URL을 수신합니다.
      </p>
      <p>
        Samply는 URL에 <Code>%</Code>{' '}
        문자가 하나 이상 포함된 경우에만 대체를 수행합니다. <Code>%</Code>가 없는 URL은 변경 없이 그대로 전달되므로
        플레이스홀더를 사용하지 않는 일정에는 성능 저하가 없습니다.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URL 구성하기</h2>
      <p>
        플레이스홀더를 표준 쿼리 문자열 파라미터로 추가하십시오. 필요한 만큼 조합할 수 있습니다.
        참여자, 차수(wave), 완료 여부를 추적하는 연구의 일반적인 URL은 다음과 같습니다:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Samply가 참여자 <em>abc123</em>의 세 번째 발송에 이 알림을 발송하면 URL은 다음과 같이 됩니다:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>도구별 설정</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_KO.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID 및 완료 추적</h2>
      <p>
        <Code>%MESSAGE_ID%</Code>는 설문 응답을 해당 응답을 유발한 알림과 연결하는 핵심입니다.
        참여자가 설문을 완료하면 설문 도구는 이 ID와 함께 Samply에 콜백을 전송해야 합니다. Samply는 이를 다음 용도로 사용합니다:
      </p>
      <ol>
        <li>해당 결과 레코드를 완료됨으로 표시합니다.</li>
        <li>해당 발송에 대한 대기 중인 알림 알림을 모두 취소합니다.</li>
      </ol>
      <p>
        이 콜백이 없으면 Samply는 설문이 제출되었는지 알 수 없으며
        완료 여부와 관계없이 알림이 발송됩니다. 콜백 설정은{' '}
        <a href='/docs/reminders'>알림</a>에서 다룹니다.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>연구 영구 링크의 플레이스홀더</h2>
      <p>
        동일한 토큰은 연구 영구 링크에서도 작동합니다 — 참여자가 Samply 앱에서 예약된 알림 외의 시간에
        언제든지 탭할 수 있는 URL입니다. 이것이 <strong>사건 수반적 설계</strong>의 기반입니다:
        고정된 시간에 알림을 발송하는 대신, 하루 중 관련 사건이 발생했을 때 참여자가 스스로 보고를 시작하도록 합니다.
        연구 대시보드의 <strong>설정</strong> 탭 아래{' '}
        <em>사건 수반적 설계</em>에서 영구 링크를 설정하십시오.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>주의 사항</h3>
      <dl>
        <dt>URL의 대체되지 않은 토큰</dt>
        <dd>
          참여자에게 토큰에 해당하는 값이 없는 경우(코드 없음, 그룹 없음) 토큰은 URL에 리터럴 문자열로 남습니다 —
          예: <Code>?code=%PARTICIPANT_CODE%</Code>.
          설문 도구는 해당 리터럴 문자열을 파라미터 값으로 수신합니다. 코드가 설정되지 않은 참여자로 테스트하여
          설문이 이를 올바르게 처리하는지 확인하십시오.
        </dd>
        <dt>URL 인코딩</dt>
        <dd>
          대체된 값은 그대로 삽입됩니다. Samply ID와 메시지 ID는 영숫자 문자만 사용하며 URL에 안전합니다.
          참여자 코드는 연구자가 정의합니다 — URL에 사용될 코드에는 공백과 특수 문자를 사용하지 마십시오.
        </dd>
        <dt>BATCH는 한 일정이 아닌 연구의 모든 발송을 계산합니다</dt>
        <dd>
          batch 번호는 하나의 일정 내가 아닌 전체 연구에서 해당 참여자에 대해 Samply가 기록한
          결과의 총 수입니다. 참여자가 두 일정에 포함된 경우 두 일정 중 어느 하나에서 발송될 때마다
          batch 카운터가 증가합니다.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentIt() {
  return (
    <>
      <p>
        I segnaposto sono stringhe <Code>%TOKEN%</Code> che si incorporano nel collegamento web della notifica.
        Quando Samply invia la notifica, sostituisce ogni token con il valore reale del partecipante
        prima di aprire l&apos;URL. Ogni partecipante riceve un collegamento personalizzato —
        senza alcun intervento manuale.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Riferimento token</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Sostituito con</th>
            <th>Se non disponibile</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_IT.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Come funziona la sostituzione</h2>
      <p>
        La sostituzione avviene al momento dell&apos;invio, all&apos;interno del dispatcher delle notifiche,
        immediatamente prima che il push venga accodato per la consegna. L&apos;URL originale memorizzato
        nella definizione del calendario non viene mai modificato — l&apos;URL sostituito esiste solo nel
        payload della notifica consegnata al dispositivo. Ogni partecipante riceve quindi un URL univoco
        anche se tutte le sue notifiche provengono dallo stesso calendario.
      </p>
      <p>
        Samply esegue la sostituzione solo quando l&apos;URL contiene almeno un carattere <Code>%</Code>{' '}.
        Gli URL senza <Code>%</Code> vengono trasmessi invariati, quindi non vi è alcuna penalità
        di prestazioni per i calendari che non utilizzano segnaposto.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Costruzione dell&apos;URL</h2>
      <p>
        Aggiungere i segnaposto come parametri standard della stringa di query. È possibile combinarne
        quanti se ne desiderano. Un URL tipico per uno studio che traccia partecipanti, ondate e
        completamenti si presenta così:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Quando Samply invia questa notifica al partecipante <em>abc123</em> al suo terzo
        invio, l&apos;URL diventa:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configurazione specifica per strumento</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_IT.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID e tracciamento dei completamenti</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> è la chiave che collega una risposta al sondaggio alla
        notifica che l&apos;ha generata. Quando un partecipante completa il sondaggio, lo strumento
        di sondaggio deve inviare un callback a Samply con questo ID. Samply lo utilizza per:
      </p>
      <ol>
        <li>Contrassegnare il record dei risultati corrispondente come completato.</li>
        <li>Annullare eventuali notifiche di promemoria in sospeso per quell&apos;invio.</li>
      </ol>
      <p>
        Senza questo callback, Samply non ha modo di sapere che il sondaggio è stato inviato e
        i promemoria verranno attivati indipendentemente dal completamento. La configurazione del
        callback è illustrata in{' '}
        <a href='/docs/reminders'>Promemoria</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Segnaposto nel collegamento permanente allo studio</h2>
      <p>
        Gli stessi token funzionano nel collegamento permanente allo studio — l&apos;URL che i partecipanti
        possono toccare nell&apos;app Samply in qualsiasi momento, al di fuori delle notifiche pianificate.
        Questa è la base dei <strong>disegni event-contingent</strong>: invece di inviare una notifica
        a un orario fisso, si consente ai partecipanti di avviare autonomamente un report ogni volta che
        si verifica un evento rilevante nella loro giornata. Configurare il collegamento permanente nella
        scheda <strong>Impostazioni</strong> del dashboard dello studio, sotto{' '}
        <em>Disegno event-contingent</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspetti a cui prestare attenzione</h3>
      <dl>
        <dt>Token non sostituiti nell&apos;URL</dt>
        <dd>
          Se un token non ha alcun valore per un partecipante (nessun codice, nessun gruppo), rimane
          nell&apos;URL come stringa letterale — ad esempio <Code>?code=%PARTICIPANT_CODE%</Code>.
          Lo strumento di sondaggio riceverà quella stringa letterale come valore del parametro.
          Effettuare un test con un partecipante privo di codice per verificare che il sondaggio
          lo gestisca correttamente.
        </dd>
        <dt>Codifica URL</dt>
        <dd>
          I valori sostituiti vengono inseriti così come sono. Gli ID Samply e gli ID messaggio
          utilizzano solo caratteri alfanumerici e sono sicuri per gli URL. I codici dei partecipanti
          sono definiti dal ricercatore — evitare spazi e caratteri speciali nei codici se verranno
          utilizzati negli URL.
        </dd>
        <dt>BATCH conta tutti gli invii dello studio, non solo quelli di un calendario</dt>
        <dd>
          Il numero di batch è il numero totale di risultati che Samply ha registrato per quel
          partecipante nell&apos;intero studio, non solo all&apos;interno di un calendario. Se un partecipante
          è coinvolto in due calendari, il suo contatore batch aumenta a ogni invio da entrambi
          i calendari.
        </dd>
      </dl>
    </>
  );
}

const TOKENS_ES = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'El Samply ID anónimo del participante.',
    fallback: 'Siempre sustituido — cada participante tiene uno.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'El código personalizado que el participante introdujo durante su registro.',
    fallback: "Se deja sin sustituir si el participante no introdujo un código. Active «Solicitar un código de participante» en Editar estudio y asegúrese de que los participantes lo rellenen.",
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'El ID corto del grupo al que pertenece el participante.',
    fallback: 'Se deja sin sustituir si no hay ningún grupo asignado al participante.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Un ID único generado para este envío específico a este participante.',
    fallback: 'Siempre sustituido.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Marca de tiempo Unix (milisegundos) del momento en que se despachó la notificación.',
    fallback: 'Siempre sustituido.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Cuántas notificaciones ha recibido este participante de este estudio hasta ahora, contando desde 1. La primera notificación tiene batch = 1, la segunda tiene batch = 2, y así sucesivamente.',
    fallback: 'Siempre sustituido.',
    example: '3',
  },
];

const TOOLS_ES = [
  {
    name: 'Qualtrics',
    steps: [
      'En el flujo de su encuesta, añada un elemento de Datos incrustados antes del primer bloque de preguntas.',
      'Cree campos llamados id, code, wave, messageid (o los nombres que correspondan a sus parámetros de URL).',
      'Qualtrics captura automáticamente los parámetros de la cadena de consulta cuando la encuesta se carga desde una URL que los contiene.',
      'Haga referencia a los valores en el texto de las preguntas o en la lógica con la sintaxis ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Use una cola de encuestas o un enlace de encuesta público con el parámetro record.',
      'Pase %PARTICIPANT_CODE% como valor record para que cada envío quede asociado al registro REDCap correcto.',
      'Pase %MESSAGE_ID% como campo oculto si necesita conectar callbacks de finalización para cancelar recordatorios.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Active los «Campos URL» en la configuración de la encuesta.',
      'Pase los valores de los marcadores como parámetros de URL — LimeSurvey los registra automáticamente como datos de respuesta.',
    ],
    url: 'https://survey.institution.edu/123456?lang=es&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

const TOKENS_FR = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'Le Samply ID anonyme du participant.',
    fallback: 'Toujours substitué — chaque participant en possède un.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'Le code personnalisé que le participant a saisi lors de son inscription.',
    fallback: 'Laissé non substitué si le participant n\'a pas saisi de code. Activez « Demander un code participant » dans Modifier l\'étude et assurez-vous que les participants le renseignent.',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'L\'ID court du groupe auquel appartient le participant.',
    fallback: 'Laissé non substitué si aucun groupe n\'est assigné au participant.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Un ID unique généré pour cet envoi spécifique à ce participant.',
    fallback: 'Toujours substitué.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Horodatage Unix (millisecondes) du moment où la notification a été expédiée.',
    fallback: 'Toujours substitué.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Nombre de notifications que ce participant a reçues de cette étude jusqu\'à présent, en comptant à partir de 1. La première notification a batch = 1, la deuxième a batch = 2, et ainsi de suite.',
    fallback: 'Toujours substitué.',
    example: '3',
  },
];

const TOOLS_FR = [
  {
    name: 'Qualtrics',
    steps: [
      'Dans le flux de votre questionnaire, ajoutez un élément Données intégrées avant le premier bloc de questions.',
      'Créez des champs nommés id, code, wave, messageid (ou les noms correspondant à vos paramètres d\'URL).',
      'Qualtrics capture automatiquement les paramètres de la chaîne de requête lorsque le questionnaire est chargé depuis une URL qui les contient.',
      'Référencez les valeurs dans le texte des questions ou la logique avec la syntaxe ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Utilisez une file d\'attente de questionnaires ou un lien de questionnaire public avec le paramètre record.',
      'Transmettez %PARTICIPANT_CODE% comme valeur record afin que chaque soumission soit associée au bon enregistrement REDCap.',
      'Transmettez %MESSAGE_ID% comme champ caché si vous devez connecter des callbacks de complétion pour annuler les rappels.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Activez les « Champs URL » dans les paramètres du questionnaire.',
      'Transmettez les valeurs des espaces réservés comme paramètres d\'URL — LimeSurvey les enregistre automatiquement comme données de réponse.',
    ],
    url: 'https://survey.institution.edu/123456?lang=fr&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

function PlaceholdersContentFr() {
  return (
    <>
      <p>
        Les espaces réservés sont des chaînes <Code>%TOKEN%</Code> que vous intégrez dans le
        lien Web de la notification. Lorsque Samply déclenche la notification, il remplace
        chaque token par la valeur réelle de ce participant avant d&apos;ouvrir l&apos;URL. Chaque
        participant reçoit un lien personnalisé — aucun travail manuel n&apos;est nécessaire.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Référence des tokens</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Remplacé par</th>
            <th>Si indisponible</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_FR.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Fonctionnement de la substitution</h2>
      <p>
        La substitution se produit au moment de l&apos;envoi, à l&apos;intérieur du dispatcher de
        notifications, immédiatement avant que le push soit mis en file d&apos;attente pour la
        livraison. L&apos;URL originale stockée dans la définition du planning n&apos;est jamais
        modifiée — l&apos;URL substituée n&apos;existe que dans le contenu de la notification livré
        à l&apos;appareil. Chaque participant reçoit donc une URL unique même si toutes ses
        notifications proviennent du même planning.
      </p>
      <p>
        Samply n&apos;effectue la substitution que lorsque l&apos;URL contient au moins un caractère{' '}
        <Code>%</Code>. Les URL sans <Code>%</Code> sont transmises sans modification, il n&apos;y
        a donc aucune pénalité de performance pour les plannings qui n&apos;utilisent pas d&apos;espaces
        réservés.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Construction de l&apos;URL</h2>
      <p>
        Ajoutez les espaces réservés comme paramètres standard de chaîne de requête. Vous
        pouvez en combiner autant que nécessaire. Une URL typique pour une étude qui suit les
        participants, les vagues et les complétions ressemble à ceci :
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Lorsque Samply déclenche cette notification pour le participant <em>abc123</em> lors
        de son troisième envoi, l&apos;URL devient :
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configuration par outil</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_FR.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID et suivi des complétions</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> est la clé qui relie une réponse au questionnaire à la
        notification qui l&apos;a déclenchée. Lorsqu&apos;un participant complète votre questionnaire,
        votre outil de questionnaire doit envoyer un callback à Samply avec cet ID. Samply
        l&apos;utilise pour :
      </p>
      <ol>
        <li>Marquer l&apos;enregistrement de résultat correspondant comme complété.</li>
        <li>Annuler les notifications de rappel en attente pour cet envoi.</li>
      </ol>
      <p>
        Sans ce callback, Samply n&apos;a aucun moyen de savoir que le questionnaire a été soumis,
        et les rappels seront déclenchés indépendamment de la complétion. La configuration du
        callback est décrite dans{' '}
        <a href='/docs/reminders'>Rappels</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Espaces réservés dans le lien permanent de l&apos;étude</h2>
      <p>
        Les mêmes tokens fonctionnent dans le lien permanent de l&apos;étude — l&apos;URL sur laquelle
        les participants peuvent appuyer dans l&apos;application Samply à tout moment, en dehors
        des notifications planifiées. C&apos;est le fondement des <strong>designs à déclenchement
        événementiel</strong> : au lieu d&apos;envoyer une notification à une heure fixe, vous
        permettez aux participants de lancer eux-mêmes un rapport chaque fois qu&apos;un événement
        pertinent se produit dans leur journée. Configurez le lien permanent dans l&apos;onglet{' '}
        <strong>Paramètres</strong> du tableau de bord de votre étude, sous{' '}
        <em>Design à déclenchement événementiel</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Points d&apos;attention</h3>
      <dl>
        <dt>Tokens non substitués dans l&apos;URL</dt>
        <dd>
          Si un token n&apos;a pas de valeur pour un participant (pas de code, pas de groupe), il
          est conservé dans l&apos;URL comme chaîne littérale — par exemple{' '}
          <Code>?code=%PARTICIPANT_CODE%</Code>. Votre outil de questionnaire recevra cette
          chaîne littérale comme valeur du paramètre. Testez avec un participant sans code
          défini pour confirmer que votre questionnaire le gère correctement.
        </dd>
        <dt>Encodage de l&apos;URL</dt>
        <dd>
          Les valeurs substituées sont insérées telles quelles. Les Samply ID et les message ID
          n&apos;utilisent que des caractères alphanumériques et sont sûrs pour les URL. Les codes
          de participants sont définis par le chercheur — évitez les espaces et les caractères
          spéciaux dans les codes s&apos;ils doivent être utilisés dans des URL.
        </dd>
        <dt>BATCH compte tous les envois de l&apos;étude, pas seulement ceux d&apos;un planning</dt>
        <dd>
          Le numéro de batch est le nombre total de résultats enregistrés par Samply pour ce
          participant dans l&apos;ensemble de l&apos;étude, pas seulement au sein d&apos;un planning. Si un
          participant est ciblé par deux plannings, son compteur de batch augmente à chaque
          envoi de l&apos;un ou l&apos;autre planning.
        </dd>
      </dl>
    </>
  );
}

function PlaceholdersContentEs() {
  return (
    <>
      <p>
        Los marcadores son cadenas <Code>%TOKEN%</Code> que usted incrusta en el enlace web de
        la notificación. Cuando Samply activa la notificación, reemplaza cada token por el valor
        real de ese participante antes de abrir la URL. Cada participante recibe un enlace
        personalizado — no se requiere ningún trabajo manual.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Referencia de tokens</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Reemplazado por</th>
            <th>Si no está disponible</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_ES.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Cómo funciona la sustitución</h2>
      <p>
        La sustitución ocurre en el momento del envío, dentro del despachador de notificaciones,
        inmediatamente antes de que el push se ponga en cola para su entrega. La URL original
        almacenada en la definición del calendario nunca se modifica — la URL sustituida solo
        existe en el contenido de la notificación entregado al dispositivo. Por eso cada
        participante recibe una URL única aunque todas sus notificaciones provengan del mismo
        calendario.
      </p>
      <p>
        Samply solo realiza la sustitución cuando la URL contiene al menos un carácter{' '}
        <Code>%</Code>. Las URL sin <Code>%</Code> se transmiten sin cambios, por lo que no
        hay penalización de rendimiento para los calendarios que no usan marcadores.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Construcción de la URL</h2>
      <p>
        Añada los marcadores como parámetros estándar de cadena de consulta. Puede combinar
        tantos como necesite. Una URL típica para un estudio que rastrea participantes, olas
        y finalizaciones tiene este aspecto:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Cuando Samply activa esta notificación para el participante <em>abc123</em> en su
        tercer envío, la URL se convierte en:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configuración por herramienta</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_ES.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID y seguimiento de finalizaciones</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> es la clave que vincula una respuesta de encuesta con la
        notificación que la activó. Cuando un participante completa su encuesta, su herramienta
        de encuesta debe enviar un callback a Samply con ese ID. Samply lo usa para:
      </p>
      <ol>
        <li>Marcar el registro de resultado correspondiente como completado.</li>
        <li>Cancelar las notificaciones de recordatorio pendientes para ese envío.</li>
      </ol>
      <p>
        Sin este callback, Samply no tiene forma de saber que se envió la encuesta, y los
        recordatorios se activarán independientemente de la finalización. La configuración del
        callback se describe en{' '}
        <a href='/docs/reminders'>Recordatorios</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Marcadores en el enlace permanente del estudio</h2>
      <p>
        Los mismos tokens funcionan en el enlace permanente del estudio — la URL en la que los
        participantes pueden tocar desde la aplicación Samply en cualquier momento, fuera de las
        notificaciones programadas. Este es el fundamento de los <strong>diseños activados por
        eventos</strong>: en lugar de enviar una notificación a una hora fija, permite a los
        participantes iniciar ellos mismos un informe cada vez que ocurre un evento relevante
        en su día. Configure el enlace permanente en la pestaña{' '}
        <strong>Configuración</strong> del panel de su estudio, bajo{' '}
        <em>Diseño activado por eventos</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a tener en cuenta</h3>
      <dl>
        <dt>Tokens no sustituidos en la URL</dt>
        <dd>
          Si un token no tiene valor para un participante (sin código, sin grupo), se conserva
          en la URL como cadena literal — por ejemplo{' '}
          <Code>?code=%PARTICIPANT_CODE%</Code>. Su herramienta de encuesta recibirá esa cadena
          literal como valor del parámetro. Pruebe con un participante sin código definido para
          confirmar que su encuesta lo gestiona correctamente.
        </dd>
        <dt>Codificación de URL</dt>
        <dd>
          Los valores sustituidos se insertan tal cual. Los Samply ID y los ID de mensaje solo
          usan caracteres alfanuméricos y son seguros para las URL. Los códigos de participante
          los define el investigador — evite espacios y caracteres especiales en los códigos si
          se van a usar en URL.
        </dd>
        <dt>BATCH cuenta todos los envíos del estudio, no solo los de un calendario</dt>
        <dd>
          El número de batch es el recuento total de resultados registrados por Samply para ese
          participante en todo el estudio, no solo dentro de un calendario. Si un participante
          es el objetivo de dos calendarios, su contador de batch aumenta con cada envío de
          cualquiera de los dos calendarios.
        </dd>
      </dl>
    </>
  );
}

const TOKENS_PT = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: 'O Samply ID anônimo do participante.',
    fallback: 'Sempre substituído — cada participante tem um.',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: 'O código personalizado que o participante inseriu durante seu registro.',
    fallback: "Deixado sem substituição se o participante não inseriu um código. Ative «Solicitar um código de participante» em Editar estudo e certifique-se de que os participantes o preencham.",
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: 'O ID curto do grupo ao qual o participante pertence.',
    fallback: 'Deixado sem substituição se nenhum grupo foi atribuído ao participante.',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'Um ID único gerado para este envio específico a este participante.',
    fallback: 'Sempre substituído.',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: 'Carimbo de data/hora Unix (milissegundos) do momento em que a notificação foi despachada.',
    fallback: 'Sempre substituído.',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'Quantas notificações este participante recebeu deste estudo até agora, contando a partir de 1. A primeira notificação tem batch = 1, a segunda tem batch = 2, e assim por diante.',
    fallback: 'Sempre substituído.',
    example: '3',
  },
];

const TOOLS_PT = [
  {
    name: 'Qualtrics',
    steps: [
      'No fluxo da sua pesquisa, adicione um elemento de Dados incorporados antes do primeiro bloco de perguntas.',
      'Crie campos chamados id, code, wave, messageid (ou os nomes correspondentes aos seus parâmetros de URL).',
      'O Qualtrics captura automaticamente os parâmetros da string de consulta quando a pesquisa é carregada a partir de uma URL que os contém.',
      'Referencie os valores no texto das perguntas ou na lógica com a sintaxe ${e://Field/id}.',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'Use uma fila de pesquisas ou um link de pesquisa público com o parâmetro record.',
      'Passe %PARTICIPANT_CODE% como valor record para que cada envio fique associado ao registro REDCap correto.',
      'Passe %MESSAGE_ID% como campo oculto se precisar conectar callbacks de conclusão para cancelar lembretes.',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      'Ative os «Campos URL» nas configurações da pesquisa.',
      'Passe os valores dos marcadores como parâmetros de URL — o LimeSurvey os registra automaticamente como dados de resposta.',
    ],
    url: 'https://survey.institution.edu/123456?lang=pt&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

function PlaceholdersContentPt() {
  return (
    <>
      <p>
        Os marcadores são strings <Code>%TOKEN%</Code> que você incorpora no link web da
        notificação. Quando o Samply dispara a notificação, ele substitui cada token pelo valor
        real daquele participante antes de abrir a URL. Cada participante recebe um link
        personalizado — nenhum trabalho manual é necessário.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Referência de tokens</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Substituído por</th>
            <th>Se não disponível</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_PT.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Como funciona a substituição</h2>
      <p>
        A substituição ocorre no momento do envio, dentro do despachante de notificações,
        imediatamente antes de o push ser colocado na fila para entrega. A URL original
        armazenada na definição do calendário nunca é modificada — a URL substituída só
        existe no conteúdo da notificação entregado ao dispositivo. Por isso cada
        participante recebe uma URL única mesmo que todas as suas notificações venham do mesmo
        calendário.
      </p>
      <p>
        O Samply só realiza a substituição quando a URL contém pelo menos um caractere{' '}
        <Code>%</Code>. As URLs sem <Code>%</Code> são transmitidas sem alterações, portanto não
        há penalidade de desempenho para calendários que não usam marcadores.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Construção da URL</h2>
      <p>
        Adicione os marcadores como parâmetros padrão de string de consulta. Você pode combinar
        quantos precisar. Uma URL típica para um estudo que rastreia participantes, ondas
        e conclusões tem esta aparência:
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Quando o Samply dispara esta notificação para o participante <em>abc123</em> em seu
        terceiro envio, a URL se torna:
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Configuração por ferramenta</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_PT.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_ID e rastreamento de conclusões</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> é a chave que vincula uma resposta de pesquisa à
        notificação que a disparou. Quando um participante conclui sua pesquisa, sua ferramenta
        de pesquisa deve enviar um callback ao Samply com esse ID. O Samply o usa para:
      </p>
      <ol>
        <li>Marcar o registro de resultado correspondente como concluído.</li>
        <li>Cancelar as notificações de lembrete pendentes para esse envio.</li>
      </ol>
      <p>
        Sem esse callback, o Samply não tem como saber que a pesquisa foi enviada, e os
        lembretes serão disparados independentemente da conclusão. A configuração do
        callback está descrita em{' '}
        <a href='/docs/reminders'>Lembretes</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Marcadores no link permanente do estudo</h2>
      <p>
        Os mesmos tokens funcionam no link permanente do estudo — a URL na qual os
        participantes podem tocar no aplicativo Samply a qualquer momento, fora das
        notificações agendadas. Este é o fundamento dos <strong>designs acionados por
        eventos</strong>: em vez de enviar uma notificação em um horário fixo, você permite que os
        participantes iniciem eles mesmos um relatório sempre que um evento relevante
        ocorrer em seu dia. Configure o link permanente na aba{' '}
        <strong>Configurações</strong> do painel do seu estudo, em{' '}
        <em>Design acionado por eventos</em>.
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a observar</h3>
      <dl>
        <dt>Tokens não substituídos na URL</dt>
        <dd>
          Se um token não tem valor para um participante (sem código, sem grupo), ele é mantido
          na URL como string literal — por exemplo{' '}
          <Code>?code=%PARTICIPANT_CODE%</Code>. Sua ferramenta de pesquisa receberá essa string
          literal como valor do parâmetro. Teste com um participante sem código definido para
          confirmar que sua pesquisa lida com isso corretamente.
        </dd>
        <dt>Codificação de URL</dt>
        <dd>
          Os valores substituídos são inseridos como estão. Os Samply IDs e IDs de mensagem usam
          apenas caracteres alfanuméricos e são seguros para URLs. Os códigos de participante
          são definidos pelo pesquisador — evite espaços e caracteres especiais nos códigos se
          forem usados em URLs.
        </dd>
        <dt>BATCH conta todos os envios do estudo, não apenas os de um calendário</dt>
        <dd>
          O número de batch é a contagem total de resultados registrados pelo Samply para aquele
          participante em todo o estudo, não apenas dentro de um calendário. Se um participante
          é alvo de dois calendários, seu contador de batch aumenta a cada envio de
          qualquer um dos dois calendários.
        </dd>
      </dl>
    </>
  );
}

const TOKENS_JA = [
  {
    token: '%SAMPLY_ID%',
    replaced_with: '参加者の匿名Samply ID。',
    fallback: '常に置換されます — すべての参加者が持っています。',
    example: 'abc123XYZ',
  },
  {
    token: '%PARTICIPANT_CODE%',
    replaced_with: '参加時に参加者が入力したカスタムコード。',
    fallback: '参加者がコードを入力しなかった場合、置換されずに残ります。研究編集で「参加者にコードを尋ねる」を有効にし、参加者が記入することを確認してください。',
    example: 'P042',
  },
  {
    token: '%GROUP_ID%',
    replaced_with: '参加者が属するグループの短いID。',
    fallback: '参加者にグループが割り当てられていない場合、置換されずに残ります。',
    example: 'g7xk',
  },
  {
    token: '%MESSAGE_ID%',
    replaced_with: 'この特定の参加者へのこの特定の送信に対して生成されたユニークなID。',
    fallback: '常に置換されます。',
    example: 'aB3dE6fG9hJ2kL5',
  },
  {
    token: '%TIMESTAMP_SENT%',
    replaced_with: '通知が発送された瞬間のUnixタイムスタンプ（ミリ秒）。',
    fallback: '常に置換されます。',
    example: '1715420400000',
  },
  {
    token: '%BATCH%',
    replaced_with: 'この参加者がこの研究からこれまでに受け取った通知の数。1から数えます。最初の通知はbatch = 1、2番目はbatch = 2、というように。',
    fallback: '常に置換されます。',
    example: '3',
  },
];

const TOOLS_JA = [
  {
    name: 'Qualtrics',
    steps: [
      '調査フローで、最初の質問ブロックの前に「埋め込みデータ」要素を追加します。',
      'id、code、wave、messageid（またはURLパラメーターに対応する任意の名前）という名前のフィールドを作成します。',
      'Qualtricsは、それらを含むURLから調査がロードされたときに、クエリ文字列パラメーターを自動的にキャプチャします。',
      '${e://Field/id}構文を使用して、質問のテキストやロジックでこれらの値を参照します。',
    ],
    url: 'https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'REDCap',
    steps: [
      'recordパラメーター付きの調査キューまたは公開調査リンクを使用します。',
      '各提出が正しいREDCapレコードにマップされるように、%PARTICIPANT_CODE%をrecord値として渡します。',
      'リマインダーをキャンセルする完了コールバックを設定する必要がある場合は、%MESSAGE_ID%を隠しフィールドとして渡します。',
    ],
    url: 'https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%',
  },
  {
    name: 'LimeSurvey',
    steps: [
      '調査設定で「URLフィールド」を有効にします。',
      'プレースホルダー値をURLパラメーターとして渡します — LimeSurveyはそれらを自動的に応答データとして保存します。',
    ],
    url: 'https://survey.institution.edu/123456?lang=ja&samply_id=%SAMPLY_ID%&batch=%BATCH%',
  },
];

function PlaceholdersContentJa() {
  return (
    <>
      <p>
        プレースホルダーは、通知のWebリンクに埋め込む<Code>%TOKEN%</Code>文字列です。
        Samplyが通知を発火すると、URLを開く前に、各トークンをその参加者の実際の値に置換します。
        各参加者がパーソナライズされたリンクを受け取ります — 手作業は不要です。
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>トークン リファレンス</h2>

      <table>
        <thead>
          <tr>
            <th>トークン</th>
            <th>置換される値</th>
            <th>利用できない場合</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_JA.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--coral)', whiteSpace: 'nowrap' }}>{t.token}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem' }}>{t.replaced_with}</td>
              <td style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: 'var(--ink-40)' }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>置換の仕組み</h2>
      <p>
        置換は送信時、通知ディスパッチャー内、プッシュが配信のためにキューに入れられる直前に発生します。
        スケジュール定義に保存された元のURLは決して変更されません — 置換されたURLは、デバイスに配信される
        通知ペイロード内にのみ存在します。これが、すべての通知が同じスケジュールから来ても、
        各参加者がユニークなURLを受け取る理由です。
      </p>
      <p>
        SamplyはURLに少なくとも1つの<Code>%</Code>文字が含まれている場合にのみ置換を実行します。
        <Code>%</Code>のないURLは変更されずに通過するため、プレースホルダーを使用しない
        スケジュールにパフォーマンス上のペナルティはありません。
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>URLの構築</h2>
      <p>
        プレースホルダーを標準のクエリ文字列パラメーターとして追加します。必要な数だけ組み合わせる
        ことができます。参加者、ウェーブ、完了を追跡する研究の一般的なURLは次のようになります：
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%' />
      <p style={{ marginTop: '1.4rem' }}>
        Samplyがこの通知を参加者<em>abc123</em>に3回目の送信で発火するとき、URLは次のようになります：
      </p>
      <UrlBox url='https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5' />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>ツール別設定</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', margin: '2rem 0 3.6rem' }}>
        {TOOLS_JA.map((tool) => (
          <div
            key={tool.name}
            style={{ background: 'var(--surface)', border: '1px solid var(--ink-10)', borderRadius: '1rem', padding: '1.8rem 2.2rem' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>{tool.name}</div>
            <ol style={{ margin: '0 0 0.4rem', paddingLeft: '1.8rem' }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: '1.3rem', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>MESSAGE_IDと完了の追跡</h2>
      <p>
        <Code>%MESSAGE_ID%</Code>は、調査応答をそれをトリガーした通知にリンクするキーです。
        参加者が調査を完了すると、調査ツールはそのIDを使ってSamplyにコールバックを送信する必要があります。
        Samplyはこれを使用して：
      </p>
      <ol>
        <li>対応する結果レコードを完了済みとしてマークします。</li>
        <li>その送信に対する保留中のリマインダー通知をキャンセルします。</li>
      </ol>
      <p>
        このコールバックがないと、Samplyは調査が提出されたことを知る方法がなく、完了に関係なく
        リマインダーが発火します。コールバックの設定は{' '}
        <a href='/docs/reminders'>リマインダー</a>に記載されています。
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>研究のパーマネントリンク内のプレースホルダー</h2>
      <p>
        同じトークンは研究のパーマネントリンクでも機能します — スケジュールされた通知の外で、
        いつでもSamplyアプリで参加者がタップできるURLです。これは<strong>イベント駆動型デザイン
        </strong>の基礎です：固定時刻に通知を送信する代わりに、参加者が一日の関連イベントが
        発生したときにいつでも自分でレポートを開始できるようにします。研究ダッシュボードの
        <strong>設定</strong>タブ、<em>イベント駆動型デザイン</em>でパーマネントリンクを設定します。
      </p>
      <UrlBox url='https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%' />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意すべき点</h3>
      <dl>
        <dt>URLに置換されていないトークン</dt>
        <dd>
          トークンが特定の参加者の値を持っていない場合（コードなし、グループなし）、URLにリテラル文字列として
          残ります — たとえば<Code>?code=%PARTICIPANT_CODE%</Code>。調査ツールはこのリテラル文字列を
          パラメーター値として受け取ります。コードが設定されていない参加者でテストして、調査が
          これを正しく処理することを確認してください。
        </dd>
        <dt>URLエンコーディング</dt>
        <dd>
          置換された値はそのまま挿入されます。Samply IDとメッセージIDは英数字のみを使用し、URLで
          安全です。参加者コードは研究者によって定義されます — コードがURLで使用される場合、
          スペースや特殊文字を避けてください。
        </dd>
        <dt>BATCHは1つのスケジュールだけでなく、研究のすべての送信をカウントします</dt>
        <dd>
          バッチ番号は、その参加者についてSamplyが研究全体で記録した結果の総数であり、1つの
          スケジュール内だけのものではありません。参加者が2つのスケジュールの対象である場合、
          どちらかのスケジュールから送信されるたびに、そのバッチカウンターが増加します。
        </dd>
      </dl>
    </>
  );
}

const TOKENS_TR = [
  {
    token: "%SAMPLY_ID%",
    replaced_with: "Katılımcının anonim Samply ID değeri.",
    fallback: "Her zaman değiştirilir — tüm katılımcılarda bulunur.",
    example: "abc123XYZ",
  },
  {
    token: "%PARTICIPANT_CODE%",
    replaced_with: "Katılım sırasında katılımcının girdiği özel kod.",
    fallback: "Katılımcı bir kod girmediyse değiştirilmeden kalır. Çalışmayı Düzenle bölümünde «Katılımcıdan bir kod iste» seçeneğini etkinleştirip katılımcıların doldurduğundan emin olun.",
    example: "P042",
  },
  {
    token: "%GROUP_ID%",
    replaced_with: "Katılımcının ait olduğu grubun kısa kimliği.",
    fallback: "Katılımcıya bir grup atanmadıysa değiştirilmeden kalır.",
    example: "g7xk",
  },
  {
    token: "%MESSAGE_ID%",
    replaced_with: "Bu belirli katılımcıya yapılan bu belirli gönderim için oluşturulan benzersiz kimlik.",
    fallback: "Her zaman değiştirilir.",
    example: "aB3dE6fG9hJ2kL5",
  },
  {
    token: "%TIMESTAMP_SENT%",
    replaced_with: "Bildirimin gönderildiği anın Unix zaman damgası (milisaniye).",
    fallback: "Her zaman değiştirilir.",
    example: "1715420400000",
  },
  {
    token: "%BATCH%",
    replaced_with: "Bu katılımcının şimdiye kadar bu çalışmadan aldığı bildirim sayısı. 1'den itibaren sayar. İlk bildirim batch = 1, ikincisi batch = 2 ve böyle devam eder.",
    fallback: "Her zaman değiştirilir.",
    example: "3",
  },
];

const TOOLS_TR = [
  {
    name: "Qualtrics",
    steps: [
      "Anket akışında, ilk soru bloğundan önce bir «Gömülü Veri» öğesi ekleyin.",
      "id, code, wave, messageid adlı alanlar oluşturun (veya URL parametrelerinize karşılık gelen herhangi bir ad).",
      "Qualtrics, anket bu parametreleri içeren bir URL'den yüklendiğinde sorgu dizesi parametrelerini otomatik olarak yakalar.",
      "Bu değerlere soru metinlerinde veya mantıkta ${e://Field/id} sözdizimi ile başvurun.",
    ],
    url: "https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%",
  },
  {
    name: "REDCap",
    steps: [
      "record parametreli bir anket kuyruğu veya genel anket bağlantısı kullanın.",
      "Her gönderimin doğru REDCap kaydına eşlenmesi için %PARTICIPANT_CODE% değerini record değeri olarak geçirin.",
      "Hatırlatmaları iptal eden bir tamamlanma geri çağrısı yapılandırmanız gerekiyorsa %MESSAGE_ID% değerini gizli bir alan olarak geçirin.",
    ],
    url: "https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%",
  },
  {
    name: "LimeSurvey",
    steps: [
      "Anket ayarlarında «URL alanları» seçeneğini etkinleştirin.",
      "Yer tutucu değerlerini URL parametreleri olarak geçirin — LimeSurvey bunları otomatik olarak yanıt verisi olarak saklar.",
    ],
    url: "https://survey.institution.edu/123456?lang=tr&samply_id=%SAMPLY_ID%&batch=%BATCH%",
  },
];

function PlaceholdersContentTr() {
  return (
    <>
      <p>
        Yer tutucular, bildirimlerin web bağlantılarına gömdüğünüz <Code>%TOKEN%</Code> dizeleridir.
        Samply bir bildirimi tetiklediğinde, URL'yi açmadan önce her tokenı o katılımcının gerçek
        değerleriyle değiştirir. Her katılımcı kişiselleştirilmiş bir bağlantı alır — elle iş gerekmez.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Token referansı</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Değiştirileceği değer</th>
            <th>Kullanılamadığında</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_TR.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--coral)", whiteSpace: "nowrap" }}>{t.token}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{t.replaced_with}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-40)" }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Değiştirme nasıl çalışır</h2>
      <p>
        Değiştirme, gönderim anında bildirim dağıtıcısında, push iletim için kuyruğa alınmadan hemen önce
        gerçekleşir. Program tanımında kayıtlı orijinal URL asla değişmez — değiştirilmiş URL yalnızca
        cihaza iletilen bildirim yükünün içinde bulunur. Tüm bildirimler aynı programdan gelse bile her
        katılımcının benzersiz bir URL almasının nedeni budur.
      </p>
      <p>
        Samply, URL'de en az bir <Code>%</Code> karakteri olduğunda değiştirme yapar.
        <Code>%</Code> içermeyen URL'ler değiştirilmeden geçer, dolayısıyla yer tutucu kullanmayan
        programlarda performans cezası yoktur.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>URL'yi oluşturma</h2>
      <p>
        Yer tutucuları standart sorgu dizesi parametreleri olarak ekleyin. İstediğiniz kadar birleştirebilirsiniz.
        Katılımcıları, dalgaları ve tamamlanmaları izleyen bir çalışma için tipik URL şöyle görünür:
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%" />
      <p style={{ marginTop: "1.4rem" }}>
        Samply bu bildirimi <em>abc123</em> katılımcısına üçüncü gönderimde tetiklediğinde URL şu hâle gelir:
      </p>
      <UrlBox url="https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5" />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Araca özgü ayarlar</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", margin: "2rem 0 3.6rem" }}>
        {TOOLS_TR.map((tool) => (
          <div
            key={tool.name}
            style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", padding: "1.8rem 2.2rem" }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>{tool.name}</div>
            <ol style={{ margin: "0 0 0.4rem", paddingLeft: "1.8rem" }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.4rem" }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>MESSAGE_ID ve tamamlanmaları izleme</h2>
      <p>
        <Code>%MESSAGE_ID%</Code>, anket yanıtını onu tetikleyen bildirime bağlayan anahtardır.
        Katılımcı anketi tamamladığında, anket aracının bu kimlikle Samply'ye bir geri çağırma göndermesi gerekir.
        Samply bunu şunlar için kullanır:
      </p>
      <ol>
        <li>İlgili sonuç kaydını tamamlanmış olarak işaretler.</li>
        <li>Bu gönderim için bekleyen hatırlatma bildirimlerini iptal eder.</li>
      </ol>
      <p>
        Bu geri çağırma olmadan Samply, anketin gönderildiğini bilmenin bir yolu yoktur ve hatırlatmalar
        tamamlanmadan bağımsız olarak tetiklenir. Geri çağırmanın yapılandırılması{" "}
        <a href="/docs/reminders">Hatırlatmalar</a> bölümünde açıklanmıştır.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Çalışmanın kalıcı bağlantısındaki yer tutucular</h2>
      <p>
        Aynı tokenlar çalışmanın kalıcı bağlantısında da çalışır — planlanmış bildirimlerin dışında,
        Samply uygulamasında katılımcının istediği zaman dokunabileceği URL. Bu, <strong>olay güdümlü
        tasarımların</strong> temelidir: sabit zamanlarda bildirim göndermek yerine, katılımcılar günün
        ilgili bir olayı yaşandığında kendi raporlarını başlatabilir. Çalışma panelinin
        <strong>Ayarlar</strong> sekmesinde, <em>Olay güdümlü tasarım</em> bölümünde kalıcı bağlantıyı yapılandırın.
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Dikkat edilmesi gerekenler</h3>
      <dl>
        <dt>URL'de değiştirilmemiş tokenlar</dt>
        <dd>
          Bir tokenın belirli bir katılımcı için değeri yoksa (kod yok, grup yok), URL'de bir literal
          dize olarak kalır — örneğin <Code>?code=%PARTICIPANT_CODE%</Code>. Anket aracınız bu literal dizeyi
          parametre değeri olarak alır. Anketinizin bunu doğru biçimde işlediğinden emin olmak için kodu
          ayarlanmamış bir katılımcıyla test edin.
        </dd>
        <dt>URL kodlaması</dt>
        <dd>
          Değiştirilen değerler oldukları gibi yerleştirilir. Samply ID ve mesaj kimliği yalnızca alfanümerik
          karakterler kullanır ve URL'lerde güvenlidir. Katılımcı kodları araştırmacı tarafından tanımlanır —
          kod URL'de kullanılıyorsa boşluklardan ve özel karakterlerden kaçının.
        </dd>
        <dt>BATCH yalnızca bir programı değil çalışmanın tüm gönderimlerini sayar</dt>
        <dd>
          Toplu numarası, Samply'nin o katılımcı için tüm çalışma boyunca kaydettiği toplam sonuç sayısıdır,
          yalnızca bir program içindeki değil. Bir katılımcı iki programın kapsamındaysa, her iki programdan
          gönderim yapıldığında toplu sayacı artar.
        </dd>
      </dl>
    </>
  );
}

const TOKENS_PL = [
  {
    token: "%SAMPLY_ID%",
    replaced_with: "Anonimowe Samply ID uczestnika.",
    fallback: "Zawsze zastępowane — wszyscy uczestnicy je mają.",
    example: "abc123XYZ",
  },
  {
    token: "%PARTICIPANT_CODE%",
    replaced_with: "Niestandardowy kod wprowadzony przez uczestnika podczas dołączania.",
    fallback: "Pozostaje niezastąpione, jeśli uczestnik nie wprowadził kodu. Włącz «Poproś uczestnika o kod» w sekcji Edytuj badanie i upewnij się, że uczestnicy go wypełniają.",
    example: "P042",
  },
  {
    token: "%GROUP_ID%",
    replaced_with: "Krótki identyfikator grupy, do której należy uczestnik.",
    fallback: "Pozostaje niezastąpione, jeśli uczestnik nie został przypisany do grupy.",
    example: "g7xk",
  },
  {
    token: "%MESSAGE_ID%",
    replaced_with: "Unikalny identyfikator wygenerowany dla tej konkretnej wysyłki do tego konkretnego uczestnika.",
    fallback: "Zawsze zastępowane.",
    example: "aB3dE6fG9hJ2kL5",
  },
  {
    token: "%TIMESTAMP_SENT%",
    replaced_with: "Unix timestamp (milisekundy) momentu wysłania powiadomienia.",
    fallback: "Zawsze zastępowane.",
    example: "1715420400000",
  },
  {
    token: "%BATCH%",
    replaced_with: "Liczba powiadomień, które ten uczestnik otrzymał z tego badania do tej pory. Liczy od 1. Pierwsze powiadomienie ma batch = 1, drugie batch = 2 i tak dalej.",
    fallback: "Zawsze zastępowane.",
    example: "3",
  },
];

const TOOLS_PL = [
  {
    name: "Qualtrics",
    steps: [
      "W przepływie ankiety dodaj element «Embedded Data» przed pierwszym blokiem pytań.",
      "Utwórz pola o nazwach id, code, wave, messageid (lub dowolnych nazwach odpowiadających Twoim parametrom URL).",
      "Qualtrics automatycznie przechwyci parametry ciągu zapytania, gdy ankieta zostanie załadowana z URL zawierającym te parametry.",
      "Odwołuj się do tych wartości w tekstach pytań lub logice za pomocą składni ${e://Field/id}.",
    ],
    url: "https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%",
  },
  {
    name: "REDCap",
    steps: [
      "Użyj kolejki ankiet lub publicznego linku do ankiety z parametrem record.",
      "Przekaż %PARTICIPANT_CODE% jako wartość record, aby każda wysyłka była mapowana do prawidłowego rekordu REDCap.",
      "Przekaż %MESSAGE_ID% jako ukryte pole, jeśli musisz skonfigurować wywołanie zwrotne ukończenia, które anuluje przypomnienia.",
    ],
    url: "https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%",
  },
  {
    name: "LimeSurvey",
    steps: [
      "Włącz «Pola URL» w ustawieniach ankiety.",
      "Przekaż wartości placeholderów jako parametry URL — LimeSurvey automatycznie przechowuje je jako dane odpowiedzi.",
    ],
    url: "https://survey.institution.edu/123456?lang=pl&samply_id=%SAMPLY_ID%&batch=%BATCH%",
  },
];

function PlaceholdersContentPl() {
  return (
    <>
      <p>
        Placeholdery to ciągi <Code>%TOKEN%</Code>, które osadzasz w linkach internetowych
        powiadomień. Gdy Samply wyzwala powiadomienie, zastępuje każdy Token rzeczywistymi
        wartościami tego uczestnika przed otwarciem URL. Każdy uczestnik otrzymuje
        spersonalizowany link — bez żadnej ręcznej pracy.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Słownik tokenów</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Zastępowane przez</th>
            <th>Gdy niedostępne</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_PL.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--coral)", whiteSpace: "nowrap" }}>{t.token}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{t.replaced_with}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-40)" }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Jak działa zastępowanie</h2>
      <p>
        Zastępowanie odbywa się w momencie wysyłki w dystrybutorze powiadomień, tuż przed
        umieszczeniem powiadomienia w kolejce do dostarczenia push. Oryginalny URL zapisany w
        definicji harmonogramu nigdy się nie zmienia — zastąpiony URL istnieje tylko w
        ładunku powiadomienia dostarczonym do urządzenia. To dlatego każdy uczestnik
        otrzymuje unikalny URL, mimo że wszystkie powiadomienia pochodzą z tego samego harmonogramu.
      </p>
      <p>
        Samply wykonuje zastępowanie, gdy URL zawiera co najmniej jeden znak <Code>%</Code>.
        URL bez <Code>%</Code> przechodzą niezmienione, więc nie ma kary za wydajność dla
        harmonogramów, które nie używają placeholderów.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Konstruowanie URL</h2>
      <p>
        Dodaj placeholdery jako standardowe parametry ciągu zapytania. Możesz łączyć tyle,
        ile potrzebujesz. Typowy URL dla badania śledzącego uczestników, fale i ukończenia
        wygląda następująco:
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%" />
      <p style={{ marginTop: "1.4rem" }}>
        Gdy Samply wyzwala to powiadomienie dla uczestnika <em>abc123</em> przy ich trzeciej
        wysyłce, URL staje się:
      </p>
      <UrlBox url="https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5" />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Konfiguracja dla konkretnych narzędzi</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", margin: "2rem 0 3.6rem" }}>
        {TOOLS_PL.map((tool) => (
          <div
            key={tool.name}
            style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", padding: "1.8rem 2.2rem" }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>{tool.name}</div>
            <ol style={{ margin: "0 0 0.4rem", paddingLeft: "1.8rem" }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.4rem" }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>MESSAGE_ID i śledzenie ukończeń</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> jest kluczem, który łączy odpowiedź ankiety z powiadomieniem,
        które ją wyzwoliło. Gdy uczestnik kończy ankietę, narzędzie ankietowe musi wysłać
        wywołanie zwrotne do Samply z tym identyfikatorem. Samply używa go do:
      </p>
      <ol>
        <li>Oznaczenia odpowiedniego rekordu wyniku jako ukończonego.</li>
        <li>Anulowania oczekujących powiadomień przypomnień dla tej wysyłki.</li>
      </ol>
      <p>
        Bez tego wywołania zwrotnego Samply nie wie, że ankieta została przesłana, a
        przypomnienia są wyzwalane niezależnie od ukończenia. Konfigurowanie wywołania
        zwrotnego jest udokumentowane w sekcji{" "}
        <a href="/docs/reminders">Przypomnienia</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>Placeholdery w stałym linku badania</h2>
      <p>
        Te same tokeny działają w stałym linku badania — URL, w który uczestnik może stuknąć
        w dowolnym momencie w aplikacji Samply, poza zaplanowanymi powiadomieniami. Jest to
        podstawa <strong>projektów sterowanych zdarzeniami</strong>: zamiast wysyłać
        powiadomienia o stałych godzinach, uczestnicy mogą sami zainicjować raport, gdy w
        ciągu dnia wystąpi istotne zdarzenie. Skonfiguruj stały link w zakładce{' '}
        <strong>Ustawienia</strong> panelu badania pod sekcją <em>Projekt sterowany zdarzeniami</em>.
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Na co należy uważać</h3>
      <dl>
        <dt>Niezastąpione tokeny w URL</dt>
        <dd>
          Jeśli Token nie ma wartości dla danego uczestnika (brak kodu, brak grupy), pozostaje
          w URL jako dosłowny ciąg — na przykład <Code>?code=%PARTICIPANT_CODE%</Code>. Twoje
          narzędzie ankietowe otrzyma ten dosłowny ciąg jako wartość parametru. Przetestuj z
          uczestnikiem bez ustawionego kodu, aby upewnić się, że Twoja ankieta obsługuje to poprawnie.
        </dd>
        <dt>Kodowanie URL</dt>
        <dd>
          Zastąpione wartości są wstawiane tak, jak są. Samply ID i identyfikator wiadomości
          używają tylko znaków alfanumerycznych i są bezpieczne w URL. Kody uczestników są
          definiowane przez Badacza — unikaj spacji i znaków specjalnych, jeśli kod jest
          używany w URL.
        </dd>
        <dt>BATCH zlicza wszystkie wysyłki z badania, nie tylko jeden harmonogram</dt>
        <dd>
          Numer partii to całkowita liczba wyników, które Samply zarejestrował dla tego
          uczestnika w całym badaniu, a nie tylko w obrębie jednego harmonogramu. Jeśli
          uczestnik jest objęty dwoma harmonogramami, licznik partii rośnie wraz z wysyłkami
          z obu harmonogramów.
        </dd>
      </dl>
    </>
  );
}

const TOKENS_AR = [
  {
    token: "%SAMPLY_ID%",
    replaced_with: "Samply ID المجهول للمشارك.",
    fallback: "يُستبدل دائماً — جميع المشاركين يمتلكونه.",
    example: "abc123XYZ",
  },
  {
    token: "%PARTICIPANT_CODE%",
    replaced_with: "الرمز المخصص الذي أدخله المشارك عند الانضمام.",
    fallback: "يبقى دون استبدال إذا لم يُدخل المشارك رمزاً. فعِّل «اطلب رمزاً من المشارك» في «تعديل الدراسة» وتأكد من أن المشاركين يعبّئونه.",
    example: "P042",
  },
  {
    token: "%GROUP_ID%",
    replaced_with: "معرّف قصير للمجموعة التي ينتمي إليها المشارك.",
    fallback: "يبقى دون استبدال إذا لم يُعيَّن المشارك إلى مجموعة.",
    example: "g7xk",
  },
  {
    token: "%MESSAGE_ID%",
    replaced_with: "معرّف فريد يُولَّد لهذا الإرسال المحدد لهذا المشارك المحدد.",
    fallback: "يُستبدل دائماً.",
    example: "aB3dE6fG9hJ2kL5",
  },
  {
    token: "%TIMESTAMP_SENT%",
    replaced_with: "طابع Unix الزمني (بالميلي ثانية) للحظة إرسال الإشعار.",
    fallback: "يُستبدل دائماً.",
    example: "1715420400000",
  },
  {
    token: "%BATCH%",
    replaced_with: "عدد الإشعارات التي تلقاها هذا المشارك من هذه الدراسة حتى الآن. يبدأ العد من 1. الإشعار الأول batch = 1، والثاني batch = 2، وهكذا.",
    fallback: "يُستبدل دائماً.",
    example: "3",
  },
];

const TOOLS_AR = [
  {
    name: "Qualtrics",
    steps: [
      "في تدفق الاستطلاع، أضف عنصر «Embedded Data» قبل كتلة الأسئلة الأولى.",
      "أنشئ حقولاً باسم id وcode وwave وmessageid (أو بأي أسماء تطابق معاملات الـ URL لديك).",
      "سيلتقط Qualtrics معاملات سلسلة الاستعلام تلقائياً عند تحميل الاستطلاع من URL يحتوي على هذه المعاملات.",
      "أحل إلى هذه القيم في نصوص الأسئلة أو المنطق باستخدام بناء الجملة ${e://Field/id}.",
    ],
    url: "https://survey.com/S_abc?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%",
  },
  {
    name: "REDCap",
    steps: [
      "استخدم طابور الاستطلاعات أو الرابط العام للاستطلاع مع معامل record.",
      "مرِّر %PARTICIPANT_CODE% كقيمة لـ record بحيث تُربط كل عملية إرسال بسجل REDCap الصحيح.",
      "مرِّر %MESSAGE_ID% كحقل مخفي إذا احتجت إلى إعداد رد إكمال يُلغي التذكيرات.",
    ],
    url: "https://redcap.institution.edu/surveys/?s=XYZ&record=%PARTICIPANT_CODE%&messageid=%MESSAGE_ID%",
  },
  {
    name: "LimeSurvey",
    steps: [
      "فعِّل «حقول URL» في إعدادات الاستطلاع.",
      "مرِّر قيم العناصر النائبة كمعاملات URL — يخزّنها LimeSurvey تلقائياً كبيانات للرد.",
    ],
    url: "https://survey.institution.edu/123456?lang=ar&samply_id=%SAMPLY_ID%&batch=%BATCH%",
  },
];

function PlaceholdersContentAr() {
  return (
    <>
      <p>
        العناصر النائبة هي سلاسل <Code>%TOKEN%</Code> تُضمِّنها في روابط الويب للإشعارات.
        عندما يُطلق Samply إشعاراً، يستبدل كل Token بالقيم الفعلية لهذا المشارك قبل فتح
        الـ URL. يحصل كل مشارك على رابط مخصص — دون أي عمل يدوي.
      </p>

      {/* ── Token reference ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>مرجع الـ Tokens</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>يُستبدل بـ</th>
            <th>عند عدم التوفر</th>
          </tr>
        </thead>
        <tbody>
          {TOKENS_AR.map((t) => (
            <tr key={t.token}>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--coral)", whiteSpace: "nowrap" }}>{t.token}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem" }}>{t.replaced_with}</td>
              <td style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", color: "var(--ink-40)" }}>{t.fallback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>كيف يعمل الاستبدال</h2>
      <p>
        يحدث الاستبدال وقت الإرسال في موزّع الإشعارات، قبل وضع الإشعار في طابور
        التسليم الفوري مباشرةً. الـ URL الأصلي المخزَّن في تعريف الجدول لا يتغيّر أبداً —
        الـ URL المُستبدَل موجود فقط في حمولة الإشعار المُسلَّمة إلى الجهاز. لهذا يحصل كل
        مشارك على URL فريد، رغم أن جميع الإشعارات تأتي من الجدول ذاته.
      </p>
      <p>
        يقوم Samply بالاستبدال عندما يحتوي الـ URL على رمز <Code>%</Code> واحد على الأقل.
        تمرّ الـ URLs التي لا تحتوي على <Code>%</Code> دون تغيير، فلا توجد عقوبة أداء
        للجداول التي لا تستخدم العناصر النائبة.
      </p>

      {/* ── Constructing the URL ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>إنشاء الـ URL</h2>
      <p>
        أضف العناصر النائبة كمعاملات قياسية في سلسلة الاستعلام. يمكنك دمج ما تحتاجه. URL
        نموذجي لدراسة تتتبع المشاركين والموجات والإكمالات يبدو كالتالي:
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&wave=%BATCH%&messageid=%MESSAGE_ID%" />
      <p style={{ marginTop: "1.4rem" }}>
        عندما يُطلق Samply هذا الإشعار للمشارك <em>abc123</em> عند الإرسال الثالث، يصبح
        الـ URL:
      </p>
      <UrlBox url="https://survey.example.com/?id=abc123&code=P042&wave=3&messageid=aB3dE6fG9hJ2kL5" />

      {/* ── Tool-specific guides ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>إعداد الأدوات المحددة</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", margin: "2rem 0 3.6rem" }}>
        {TOOLS_AR.map((tool) => (
          <div
            key={tool.name}
            style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", padding: "1.8rem 2.2rem" }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>{tool.name}</div>
            <ol style={{ margin: "0 0 0.4rem", paddingLeft: "1.8rem" }}>
              {tool.steps.map((s, i) => (
                <li key={i} style={{ fontSize: "1.3rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.4rem" }}>{s}</li>
              ))}
            </ol>
            <UrlBox url={tool.url} />
          </div>
        ))}
      </div>

      {/* ── MESSAGE_ID and completions ────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>MESSAGE_ID وتتبع الإكمالات</h2>
      <p>
        <Code>%MESSAGE_ID%</Code> هو المفتاح الذي يربط رد الاستطلاع بالإشعار الذي
        أطلقه. عندما ينهي مشارك استطلاعاً، يجب على أداة الاستطلاع إرسال رد إلى Samply
        بهذا المعرّف. يستخدمه Samply لـ:
      </p>
      <ol>
        <li>تعليم سجل النتيجة المعني على أنه مكتمل.</li>
        <li>إلغاء إشعارات التذكيرات المعلقة لهذا الإرسال.</li>
      </ol>
      <p>
        دون هذا الرد، لا يعرف Samply أن الاستطلاع قد أُرسل، وتُطلَق التذكيرات بصرف النظر
        عن الإكمال. تجد توثيق إعداد الرد في قسم{" "}
        <a href="/docs/reminders">التذكيرات</a>.
      </p>

      {/* ── Permanent link ────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: "3.6rem" }}>العناصر النائبة في الرابط الدائم للدراسة</h2>
      <p>
        تعمل الـ Tokens نفسها في الرابط الدائم للدراسة — وهو URL يمكن للمشارك النقر عليه
        في أي وقت من تطبيق Samply، خارج الإشعارات المجدولة. هذا هو أساس{' '}
        <strong>التصاميم المُحرَّكة بالأحداث</strong>: بدلاً من إرسال إشعارات في أوقات
        ثابتة، يمكن للمشاركين بدء تقرير بأنفسهم عند وقوع حدث ذي صلة خلال اليوم. أعدّ
        الرابط الدائم في علامة التبويب <strong>إعدادات</strong> في لوحة الدراسة تحت قسم{' '}
        <em>التصميم المُحرَّك بالأحداث</em>.
      </p>
      <UrlBox url="https://survey.example.com/?id=%SAMPLY_ID%&code=%PARTICIPANT_CODE%&group=%GROUP_ID%&time=%TIMESTAMP_SENT%" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>أمور يجب الانتباه إليها</h3>
      <dl>
        <dt>Tokens غير مُستبدلة في الـ URL</dt>
        <dd>
          إذا لم يكن للـ Token قيمة لدى المشارك (لا يوجد رمز، لا توجد مجموعة)، فإنه يبقى
          في الـ URL كسلسلة حرفية — على سبيل المثال <Code>?code=%PARTICIPANT_CODE%</Code>.
          ستستلم أداة الاستطلاع هذه السلسلة الحرفية كقيمة معامل. اختبر مع مشارك دون رمز
          محدد للتأكد من أن استطلاعك يعالج ذلك بشكل صحيح.
        </dd>
        <dt>ترميز الـ URL</dt>
        <dd>
          تُدرَج القيم المُستبدَلة كما هي. يستخدم Samply ID ومعرّف الرسالة أحرفاً أبجدية
          رقمية فقط، وهي آمنة في الـ URL. تُعرَّف رموز المشاركين من قِبل الباحث — تجنّب
          المسافات والأحرف الخاصة إذا كان الرمز يُستخدم في URL.
        </dd>
        <dt>BATCH يَعُدّ جميع الإرسالات من الدراسة، وليس جدولاً واحداً فقط</dt>
        <dd>
          رقم الدفعة هو إجمالي عدد النتائج التي سجّلها Samply لهذا المشارك عبر الدراسة
          بأكملها، وليس داخل جدول واحد فقط. إذا كان المشارك خاضعاً لجدولَين، فإن عداد
          الدفعة يزداد مع كل إرسال من كلا الجدولَين.
        </dd>
      </dl>
    </>
  );
}
