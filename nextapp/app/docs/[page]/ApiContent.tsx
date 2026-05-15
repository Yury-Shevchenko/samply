import type { Locale } from "@/lib/i18n";

function Code({ children }: { children: string }) {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', background: 'var(--ink-10)', color: 'var(--coral)', padding: '0.1rem 0.5rem', borderRadius: '0.4rem' }}>
      {children}
    </code>
  );
}

function Method({ verb, path, desc }: { verb: string; path: string; desc: string }) {
  const color =
    verb === 'GET'    ? 'var(--sage)'   :
    verb === 'POST'   ? 'var(--coral)'  :
    verb === 'PATCH'  ? '#b07d2a'       :
    verb === 'DELETE' ? 'var(--ink-40)' : 'var(--ink)';
  return (
    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'baseline', padding: '0.9rem 1.4rem', borderBottom: '1px solid var(--ink-10)', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color, flexShrink: 0, width: '5.5rem' }}>{verb}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--ink)', flexShrink: 0 }}>{path}</span>
      <span style={{ fontSize: '1.25rem', color: 'var(--ink-60)', marginLeft: 'auto' }}>{desc}</span>
    </div>
  );
}

function EndpointGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ margin: '2rem 0 3rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-40)', marginBottom: '0.6rem' }}>{title}</div>
      <div style={{ border: '1px solid var(--ink-10)', borderRadius: '1rem', overflow: 'hidden', background: 'var(--surface)' }}>
        {children}
      </div>
    </div>
  );
}

export default function ApiContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <ApiContentDe />;
  if (locale === "nl") return <ApiContentNl />;
  if (locale === "ru") return <ApiContentRu />;
  if (locale === "zh") return <ApiContentZh />;
  if (locale === "ko") return <ApiContentKo />;
  if (locale === "it") return <ApiContentIt />;
  if (locale === "fr") return <ApiContentFr />;
  if (locale === "es") return <ApiContentEs />;
  if (locale === "pt") return <ApiContentPt />;
  return <ApiContentEn />;
}

function ApiContentZh() {
  return (
    <>
      <p>
        Samply 提供两个 API 接口：用于程序化研究管理的 REST API（<strong>研究者 API</strong>），
        以及由问卷工具用于发出完成信号和触发临时通知的两个集成钩子。
        两者均运行在与仪表板相同的主机上。
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>基础 URL</h2>
      <p>
        研究者 REST API 挂载在 <Code>/webapi/v1</Code> 路径下。以下所有端点均相对于该前缀。
        完成和通知端点直接挂载在根路径下，另行文档记录。
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>身份验证</h2>
      <p>
        所有研究者 API 端点（令牌端点本身除外）都需要在 <Code>x-auth-token</Code>{' '}
        请求头中传递 JWT。通过提交研究者凭据来获取令牌：
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='用邮箱和密码换取 JWT。' />
      </EndpointGroup>

      <p><strong>请求体</strong></p>
      <table>
        <thead><tr><th>字段</th><th>类型</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>研究者账户邮箱。</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>研究者账户密码。</td></tr>
        </tbody>
      </table>

      <p><strong>响应</strong></p>
      <table>
        <thead><tr><th>字段</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>有效期 14 天的 JWT。在后续请求中以 <Code>x-auth-token</Code> 传递。</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>请求频率限制</h2>
      <p>
        所有 API 路径都受到频率限制。超出限制的请求会收到 <Code>429 Too Many Requests</Code> 响应。
        三个级别为：
      </p>
      <table>
        <thead><tr><th>限制</th><th>路径</th></tr></thead>
        <tbody>
          <tr><td>20 次请求 / 15 分钟</td><td><Code>/webapi/v1/auth</Code>、登录、账户创建和密码重置端点</td></tr>
          <tr><td>30 次请求 / 1 分钟</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 次请求 / 15 分钟</td><td>所有其他 <Code>/api/*</Code> 和 <Code>/webapi/*</Code> 路径</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>活动研究</h2>
      <p>
        大多数研究者 API 端点在<em>活动研究</em>上操作——在研究者账户上选定的单个研究。
        在调用参与者、通知或任务端点之前，请选择您要操作的研究：
      </p>

      <EndpointGroup title='研究选择'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='列出您拥有或参与的所有研究。' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='返回当前活动研究。' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='设置活动研究。' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='通过 MongoDB ID 获取特定研究。' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='更新研究的字段。' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> 期望请求体中包含 <Code>{'{ "id": "<study_id>" }'}</Code>。
        选择存储在您的研究者账户上，在更改之前跨请求持久保存。
      </p>

      <p><strong>PATCH 体</strong>（更新研究）</p>
      <p>仅接受以下字段；其他所有字段将被忽略：</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>参与者</h2>
      <p>
        这些端点管理活动研究中的参与者。通过 API 创建的参与者最初处于停用状态——
        他们收到一个 JWT 邀请令牌，在打开 Samply Research 应用时激活。
      </p>

      <EndpointGroup title='参与者 — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='列出活动研究中的所有参与者。' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='通过 Samply ID 获取一名参与者。' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='创建并注册参与者。' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='更新参与者字段。' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='从研究中移除参与者。' />
      </EndpointGroup>

      <p><strong>POST 体</strong>（创建参与者）</p>
      <table>
        <thead><tr><th>字段</th><th>必填</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>是</td><td>显示名称——不向其他参与者显示。</td></tr>
          <tr><td><Code>email</Code></td><td>是</td><td>用于创建 Samply 账户的邮箱。</td></tr>
          <tr><td><Code>code</Code></td><td>否</td><td>参与者代码，存储为 <Code>username</Code> 并通过 <Code>%PARTICIPANT_CODE%</Code> 可用。</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>否</td><td>邀请 JWT 的有效时长（例如 <Code>"7d"</Code>）。最长 30 天——较大值会被静默截断。</td></tr>
          <tr><td><Code>information</Code></td><td>否</td><td>用于任意参与者元数据的自由格式 JSON 对象。</td></tr>
        </tbody>
      </table>

      <p><strong>响应</strong>（创建参与者）</p>
      <table>
        <thead><tr><th>字段</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>新参与者的自动生成 Samply ID。</td></tr>
          <tr><td><Code>token</Code></td><td>JWT 邀请令牌。将此发送给参与者；应用使用它来激活账户。</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH 体</strong>（更新参与者）</p>
      <table>
        <thead><tr><th>字段</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>参与者代码 / 显示名称。</td></tr>
          <tr><td><Code>deactivated</Code></td><td>布尔值——设置为 <Code>true</Code> 以停止该参与者的通知。</td></tr>
          <tr><td><Code>group</Code></td><td>组分配字符串。</td></tr>
        </tbody>
      </table>
      <p>请求体中发送的所有其他字段将被忽略。</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>计划（通知）</h2>
      <p>
        通知端点管理计划定义——扩展为队列行的规则。通过 API 创建计划会触发与提交仪表板表单相同的队列扩展。
      </p>

      <EndpointGroup title='计划 — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='列出活动研究中的所有计划定义。' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='获取一个计划定义。' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='创建计划并将其扩展到队列。' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='更新计划定义。' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='删除计划并取消其待处理的队列行。' />
      </EndpointGroup>

      <p>
        <Code>POST</Code> 体与计划表单字段对应。路由键是 <Code>schedule</Code>（<Code>one-time</Code>{' '}
        或 <Code>repeat</Code>）和 <Code>target</Code>（<Code>fixed-times</Code>、
        <Code>fixed-intervals</Code> 或 <Code>user-specific</Code>）的组合，
        映射到仪表板表单使用的相同内部处理器。
      </p>

      <p><strong>PATCH 体</strong>（更新计划）</p>
      <p>
        仅接受以下字段；其他所有字段将被忽略：
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>队列（任务）</h2>
      <p>
        任务端点公开各个队列行——从计划定义生成的扩展发送。
      </p>

      <EndpointGroup title='队列行 — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='列出活动研究的所有队列行。' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='列出特定计划的队列行。' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='获取一个特定的队列行。' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='更新队列行。' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='删除队列行。' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>完成回调</h2>
      <p>
        这些端点由问卷工具调用以注册完成事件。成功后，Samply 将结果标记为已完成，
        并取消该次发送的所有待处理提醒。无需身份验证——消息 ID 充当共享密钥。
      </p>

      <EndpointGroup title='完成——无需身份验证'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='注册完成并显示确认页面（用作问卷结束重定向）。' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='静默注册完成（用作来自问卷工具的 webhook）。' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>仪表板地址栏中显示的研究 URL slug。</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          来自 <Code>%MESSAGE_ID%</Code> 占位符的消息 ID，通过您的问卷 URL 传递到问卷结束重定向或 webhook。
          完整设置演练请参阅 <a href='/docs/reminders'>提醒</a>。
        </dd>
      </dl>

      <p>
        <Code>POST</Code> 端点成功时返回 <Code>200</Code>，如果找不到给定消息 ID 的匹配结果记录则返回 <Code>400</Code>。
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>通知钩子</h2>
      <p>
        通知钩子向研究中的参与者发送即时临时推送通知——无需创建计划或队列行。
        适用于来自外部系统（REDCap 警报、实验室系统事件等）的事件触发通知。
        身份验证使用每个研究的通知令牌，而非研究者 JWT。
      </p>

      <EndpointGroup title='临时通知——令牌身份验证'>
        <Method verb='POST' path='/api/notify' desc='向研究中的参与者发送即时通知。' />
      </EndpointGroup>

      <p><strong>请求体</strong></p>
      <table>
        <thead><tr><th>字段</th><th>必填</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>是</td><td>研究通知令牌。从编辑研究 → Notify token 重新生成。</td></tr>
          <tr><td><Code>projectID</Code></td><td>是</td><td>研究的 MongoDB ID。</td></tr>
          <tr><td><Code>title</Code></td><td>是</td><td>通知标题。</td></tr>
          <tr><td><Code>message</Code></td><td>是</td><td>通知正文文本。</td></tr>
          <tr><td><Code>url</Code></td><td>否</td><td>问卷 URL。支持与计划通知相同的 <Code>%TOKEN%</Code> 占位符。</td></tr>
          <tr><td><Code>participantID</Code></td><td>否</td><td>发送给特定参与者（Samply ID）。省略则发送给所有人。</td></tr>
          <tr><td><Code>groupID</Code></td><td>否</td><td>发送给组中除触发参与者外的所有成员。通常在一名参与者的操作需要通知其组时使用。</td></tr>
          <tr><td><Code>expireIn</Code></td><td>否</td><td>从发送时间起以毫秒计的链接过期时间。</td></tr>
        </tbody>
      </table>

      <p>
        如果同时提供 <Code>groupID</Code> 和 <Code>participantID</Code>，Samply 会向除指定参与者外的所有组成员发送。
        如果仅提供 <Code>participantID</Code>，则只通知该参与者。如果两者均未提供，所有研究参与者都会收到通知。
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>错误响应</h2>
      <table>
        <thead><tr><th>状态</th><th>含义</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>成功。</td></tr>
          <tr><td><Code>400</Code></td><td>错误请求——字段缺失或无效，或账户上未设置活动研究。</td></tr>
          <tr><td><Code>401</Code></td><td>缺失或过期的 <Code>x-auth-token</Code> 头。</td></tr>
          <tr><td><Code>429</Code></td><td>超出频率限制。稍等片刻后重试。</td></tr>
          <tr><td><Code>500</Code></td><td>内部服务器错误。响应体包含固定字符串 <Code>"Internal server error"</Code>；详细诊断仅记录在服务器端。</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentEn() {
  return (
    <>
      <p>
        Samply exposes two API surfaces: a REST API for programmatic study management
        (the <strong>researcher API</strong>), and two integration hooks used by survey
        tools to signal completion and trigger ad-hoc notifications. Both run on the same
        host as the dashboard.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>Base URL</h2>
      <p>
        The researcher REST API is mounted at <Code>/webapi/v1</Code>. All endpoints
        below are relative to that prefix. The completion and notify endpoints are mounted
        directly at the root and are documented separately.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Authentication</h2>
      <p>
        All researcher API endpoints (except the token endpoint itself) require a JWT
        passed in the <Code>x-auth-token</Code> request header. Obtain a token by
        posting your researcher credentials:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Exchange email + password for a JWT.' />
      </EndpointGroup>

      <p><strong>Request body</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>Researcher account email.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Researcher account password.</td></tr>
        </tbody>
      </table>

      <p><strong>Response</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT valid for 14 days. Pass it as <Code>x-auth-token</Code> on subsequent requests.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Rate limits</h2>
      <p>
        All API paths are subject to rate limiting. Requests that exceed a limit receive a{' '}
        <Code>429 Too Many Requests</Code> response. The three tiers are:
      </p>
      <table>
        <thead><tr><th>Limit</th><th>Paths</th></tr></thead>
        <tbody>
          <tr><td>20 requests / 15 min</td><td><Code>/webapi/v1/auth</Code>, login, account-creation, and password-reset endpoints</td></tr>
          <tr><td>30 requests / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 requests / 15 min</td><td>All other <Code>/api/*</Code> and <Code>/webapi/*</Code> paths</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>The active study</h2>
      <p>
        Most researcher API endpoints operate on the <em>active study</em> — a single
        study selected on the researcher account. Before calling participant,
        notification, or job endpoints, select the study you want to work with:
      </p>

      <EndpointGroup title='Study selection'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='List all studies you own or are a member of.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='Return the currently active study.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='Set the active study.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Get a specific study by its MongoDB ID.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Update fields on a study.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> expects <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        in the request body. The selection is stored on your researcher account and persists
        across requests until changed.
      </p>

      <p><strong>PATCH body</strong> (update study)</p>
      <p>Only the following fields are accepted; all others are ignored:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Participants</h2>
      <p>
        These endpoints manage participants in the active study. Participants created via
        the API are initially deactivated — they receive a JWT invitation token that
        activates them when they open the Samply Research app.
      </p>

      <EndpointGroup title='Participants — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='List all participants in the active study.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Get one participant by Samply ID.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Create and enrol a participant.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Update participant fields.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Remove a participant from the study.' />
      </EndpointGroup>

      <p><strong>POST body</strong> (create participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>yes</td><td>Display name — not shown to other participants.</td></tr>
          <tr><td><Code>email</Code></td><td>yes</td><td>Email used to create the Samply account.</td></tr>
          <tr><td><Code>code</Code></td><td>no</td><td>Participant code stored as <Code>username</Code> and available via <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>no</td><td>How long the invitation JWT remains valid (e.g. <Code>"7d"</Code>). Maximum 30 days — larger values are silently capped.</td></tr>
          <tr><td><Code>information</Code></td><td>no</td><td>Freeform JSON object for arbitrary participant metadata.</td></tr>
        </tbody>
      </table>

      <p><strong>Response</strong> (create participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>The auto-generated Samply ID for the new participant.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT invitation token. Send this to the participant; the app uses it to activate their account.</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH body</strong> (update participant)</p>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Participant code / display name.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — set to <Code>true</Code> to stop notifications for this participant.</td></tr>
          <tr><td><Code>group</Code></td><td>Group assignment string.</td></tr>
        </tbody>
      </table>
      <p>All other fields sent in the body are ignored.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Schedules (notifications)</h2>
      <p>
        The notifications endpoints manage schedule definitions — the rules that expand
        into queue rows. Creating a schedule via the API triggers the same queue expansion
        as submitting the dashboard form.
      </p>

      <EndpointGroup title='Schedules — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='List all schedule definitions in the active study.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Get one schedule definition.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Create a schedule and expand it into the queue.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Update a schedule definition.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Delete a schedule and cancel its pending queue rows.' />
      </EndpointGroup>

      <p>
        The <Code>POST</Code> body mirrors the schedule form fields. The routing key is
        the combination of <Code>schedule</Code> (<Code>one-time</Code> or{' '}
        <Code>repeat</Code>) and <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code>, or <Code>user-specific</Code>), which maps to the
        same internal handlers used by the dashboard form.
      </p>

      <p><strong>PATCH body</strong> (update schedule)</p>
      <p>
        Only the following fields are accepted; all others are ignored:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Queue (jobs)</h2>
      <p>
        The jobs endpoints expose individual queue rows — the expanded sends generated
        from schedule definitions.
      </p>

      <EndpointGroup title='Queue rows — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='List all queue rows for the active study.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='List queue rows for a specific schedule.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Get one specific queue row.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Update a queue row.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Delete a queue row.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Completion callback</h2>
      <p>
        These endpoints are called by survey tools to register a completion event. On
        success, Samply marks the result as completed and cancels all pending reminders
        for that send. No authentication is required — the message ID serves as the
        shared secret.
      </p>

      <EndpointGroup title='Completion — no auth required'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Register completion and show a confirmation page (use as end-of-survey redirect).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Register completion silently (use as a webhook from your survey tool).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>The study URL slug shown in the dashboard address bar.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          The message ID from the <Code>%MESSAGE_ID%</Code> placeholder, passed through
          your survey URL to the end-of-survey redirect or webhook. See{' '}
          <a href='/docs/reminders'>Reminders</a> for the full setup walkthrough.
        </dd>
      </dl>

      <p>
        The <Code>POST</Code> endpoint returns <Code>200</Code> on success and{' '}
        <Code>400</Code> if no matching result record is found for the given message ID.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Notify hook</h2>
      <p>
        The notify hook sends an immediate ad-hoc push notification to participants in a
        study — without creating a schedule or queue row. Intended for event-triggered
        notifications from external systems (a REDCap alert, a lab system event, etc.).
        Authentication uses a per-study notify token rather than the researcher JWT.
      </p>

      <EndpointGroup title='Ad-hoc notification — token auth'>
        <Method verb='POST' path='/api/notify' desc='Fire an immediate notification to participants in a study.' />
      </EndpointGroup>

      <p><strong>Request body</strong></p>
      <table>
        <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>yes</td><td>Study notify token. Regenerate it from Edit study → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>yes</td><td>The study MongoDB ID.</td></tr>
          <tr><td><Code>title</Code></td><td>yes</td><td>Notification title.</td></tr>
          <tr><td><Code>message</Code></td><td>yes</td><td>Notification body text.</td></tr>
          <tr><td><Code>url</Code></td><td>no</td><td>Survey URL. Supports the same <Code>%TOKEN%</Code> placeholders as scheduled notifications.</td></tr>
          <tr><td><Code>participantID</Code></td><td>no</td><td>Send to one specific participant (Samply ID). Omit to send to all.</td></tr>
          <tr><td><Code>groupID</Code></td><td>no</td><td>Send to all members of a group except the triggering participant. Typically used when one participant&apos;s action should notify their group.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>no</td><td>Link expiry in milliseconds from send time.</td></tr>
        </tbody>
      </table>

      <p>
        If both <Code>groupID</Code> and <Code>participantID</Code> are provided, Samply
        sends to all group members except the named participant. If only{' '}
        <Code>participantID</Code> is given, only that participant is notified. If neither
        is provided, all study participants receive the notification.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Error responses</h2>
      <table>
        <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Success.</td></tr>
          <tr><td><Code>400</Code></td><td>Bad request — missing or invalid fields, or no active study set on the account.</td></tr>
          <tr><td><Code>401</Code></td><td>Missing or expired <Code>x-auth-token</Code> header.</td></tr>
          <tr><td><Code>429</Code></td><td>Rate limit exceeded. Back off and retry after a short delay.</td></tr>
          <tr><td><Code>500</Code></td><td>Internal server error. The response body contains the fixed string <Code>"Internal server error"</Code>; detailed diagnostics are logged server-side only.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentRu() {
  return (
    <>
      <p>
        Samply предоставляет два API-интерфейса: REST API для программного управления
        исследованиями (<strong>API исследователя</strong>) и два интеграционных хука,
        используемых инструментами для опросов, чтобы сигнализировать о завершении и
        инициировать разовые уведомления. Оба работают на том же хосте, что и панель
        управления.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>Базовый URL</h2>
      <p>
        REST API исследователя смонтирован по адресу <Code>/webapi/v1</Code>. Все
        конечные точки ниже указаны относительно этого префикса. Конечные точки
        завершения и уведомления смонтированы непосредственно в корне и документируются
        отдельно.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Аутентификация</h2>
      <p>
        Все конечные точки API исследователя (кроме самой конечной точки токена) требуют
        JWT, передаваемого в заголовке запроса <Code>x-auth-token</Code>. Получите токен,
        отправив учётные данные исследователя:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Обменять email и пароль на JWT.' />
      </EndpointGroup>

      <p><strong>Тело запроса</strong></p>
      <table>
        <thead><tr><th>Поле</th><th>Тип</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>Email аккаунта исследователя.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Пароль аккаунта исследователя.</td></tr>
        </tbody>
      </table>

      <p><strong>Ответ</strong></p>
      <table>
        <thead><tr><th>Поле</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT, действительный 14 дней. Передавайте его как <Code>x-auth-token</Code> в последующих запросах.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Ограничения запросов</h2>
      <p>
        Все пути API подпадают под ограничение запросов. Запросы, превышающие лимит,
        получают ответ <Code>429 Too Many Requests</Code>. Три уровня ограничений:
      </p>
      <table>
        <thead><tr><th>Лимит</th><th>Пути</th></tr></thead>
        <tbody>
          <tr><td>20 запросов / 15 мин</td><td><Code>/webapi/v1/auth</Code>, конечные точки входа, создания аккаунта и сброса пароля</td></tr>
          <tr><td>30 запросов / 1 мин</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 запросов / 15 мин</td><td>Все остальные пути <Code>/api/*</Code> и <Code>/webapi/*</Code></td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>Активное исследование</h2>
      <p>
        Большинство конечных точек API исследователя работают с <em>активным
        исследованием</em> — единственным исследованием, выбранным в аккаунте
        исследователя. Перед вызовом конечных точек участников, уведомлений или заданий
        выберите исследование, с которым хотите работать:
      </p>

      <EndpointGroup title='Выбор исследования'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='Получить список всех исследований, которыми вы владеете или в которых участвуете.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='Вернуть текущее активное исследование.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='Установить активное исследование.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Получить конкретное исследование по его MongoDB ID.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Обновить поля исследования.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> ожидает <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        в теле запроса. Выбор сохраняется в аккаунте исследователя и остаётся в силе
        между запросами до изменения.
      </p>

      <p><strong>Тело PATCH</strong> (обновление исследования)</p>
      <p>Принимаются только следующие поля; все остальные игнорируются:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Участники</h2>
      <p>
        Эти конечные точки управляют участниками активного исследования. Участники,
        созданные через API, изначально деактивированы — они получают JWT-токен
        приглашения, активирующий их при открытии приложения Samply Research.
      </p>

      <EndpointGroup title='Участники — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='Получить список всех участников активного исследования.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Получить одного участника по Samply ID.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Создать и зарегистрировать участника.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Обновить поля участника.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Удалить участника из исследования.' />
      </EndpointGroup>

      <p><strong>Тело POST</strong> (создание участника)</p>
      <table>
        <thead><tr><th>Поле</th><th>Обязательное</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>да</td><td>Отображаемое имя — не показывается другим участникам.</td></tr>
          <tr><td><Code>email</Code></td><td>да</td><td>Email для создания аккаунта Samply.</td></tr>
          <tr><td><Code>code</Code></td><td>нет</td><td>Код участника, хранящийся как <Code>username</Code> и доступный через <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>нет</td><td>Срок действия JWT-приглашения (например, <Code>"7d"</Code>). Максимум 30 дней — бо&#x301;льшие значения молча ограничиваются.</td></tr>
          <tr><td><Code>information</Code></td><td>нет</td><td>Произвольный JSON-объект для хранения метаданных участника.</td></tr>
        </tbody>
      </table>

      <p><strong>Ответ</strong> (создание участника)</p>
      <table>
        <thead><tr><th>Поле</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>Автоматически сгенерированный Samply ID нового участника.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT-токен приглашения. Отправьте его участнику — приложение использует его для активации аккаунта.</td></tr>
        </tbody>
      </table>

      <p><strong>Тело PATCH</strong> (обновление участника)</p>
      <table>
        <thead><tr><th>Поле</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Код участника / отображаемое имя.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — установите <Code>true</Code>, чтобы остановить уведомления для этого участника.</td></tr>
          <tr><td><Code>group</Code></td><td>Строка назначения группы.</td></tr>
        </tbody>
      </table>
      <p>Все прочие поля в теле запроса игнорируются.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Расписания (уведомления)</h2>
      <p>
        Конечные точки уведомлений управляют определениями расписаний — правилами,
        разворачивающимися в строки очереди. Создание расписания через API запускает то же
        расширение очереди, что и отправка формы в панели управления.
      </p>

      <EndpointGroup title='Расписания — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='Получить список всех определений расписаний активного исследования.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Получить одно определение расписания.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Создать расписание и развернуть его в очередь.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Обновить определение расписания.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Удалить расписание и отменить ожидающие строки очереди.' />
      </EndpointGroup>

      <p>
        Тело <Code>POST</Code> соответствует полям формы расписания. Ключ маршрутизации —
        комбинация <Code>schedule</Code> (<Code>one-time</Code> или{' '}
        <Code>repeat</Code>) и <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code> или <Code>user-specific</Code>), что соответствует
        тем же внутренним обработчикам, которые использует форма панели управления.
      </p>

      <p><strong>Тело PATCH</strong> (обновление расписания)</p>
      <p>
        Принимаются только следующие поля; все остальные игнорируются:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Очередь (задания)</h2>
      <p>
        Конечные точки заданий открывают доступ к отдельным строкам очереди —
        развёрнутым отправкам, сгенерированным из определений расписаний.
      </p>

      <EndpointGroup title='Строки очереди — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='Получить список всех строк очереди активного исследования.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='Получить строки очереди для конкретного расписания.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Получить одну конкретную строку очереди.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Обновить строку очереди.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Удалить строку очереди.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Обратный вызов завершения</h2>
      <p>
        Эти конечные точки вызываются инструментами для опросов для регистрации события
        завершения. При успехе Samply помечает результат как завершённый и отменяет все
        ожидающие напоминания для данной отправки. Аутентификация не требуется —
        идентификатор сообщения служит общим секретом.
      </p>

      <EndpointGroup title='Завершение — аутентификация не требуется'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Зарегистрировать завершение и показать страницу подтверждения (используйте как перенаправление по окончании опроса).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Зарегистрировать завершение без вывода страницы (используйте как вебхук из вашего инструмента для опросов).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>URL-slug исследования, отображаемый в адресной строке панели управления.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          Идентификатор сообщения из заполнителя <Code>%MESSAGE_ID%</Code>, переданный
          через URL опроса в перенаправление по завершении или вебхук. Полное руководство
          по настройке см. в разделе <a href='/docs/reminders'>Напоминания</a>.
        </dd>
      </dl>

      <p>
        Конечная точка <Code>POST</Code> возвращает <Code>200</Code> при успехе и{' '}
        <Code>400</Code>, если соответствующая запись результата для данного
        идентификатора сообщения не найдена.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Хук уведомления</h2>
      <p>
        Хук уведомления немедленно отправляет разовое push-уведомление участникам
        исследования — без создания расписания или строки очереди. Предназначен для
        уведомлений, инициируемых событиями из внешних систем (оповещение REDCap,
        событие лабораторной системы и т.д.). Аутентификация использует токен
        уведомления для конкретного исследования, а не JWT исследователя.
      </p>

      <EndpointGroup title='Разовое уведомление — аутентификация по токену'>
        <Method verb='POST' path='/api/notify' desc='Отправить немедленное уведомление участникам исследования.' />
      </EndpointGroup>

      <p><strong>Тело запроса</strong></p>
      <table>
        <thead><tr><th>Поле</th><th>Обязательное</th><th>Описание</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>да</td><td>Токен уведомления исследования. Обновите его в разделе Редактировать исследование — Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>да</td><td>MongoDB ID исследования.</td></tr>
          <tr><td><Code>title</Code></td><td>да</td><td>Заголовок уведомления.</td></tr>
          <tr><td><Code>message</Code></td><td>да</td><td>Текст уведомления.</td></tr>
          <tr><td><Code>url</Code></td><td>нет</td><td>URL опроса. Поддерживает те же заполнители <Code>%TOKEN%</Code>, что и запланированные уведомления.</td></tr>
          <tr><td><Code>participantID</Code></td><td>нет</td><td>Отправить конкретному участнику (Samply ID). Опустите, чтобы отправить всем.</td></tr>
          <tr><td><Code>groupID</Code></td><td>нет</td><td>Отправить всем участникам группы, кроме инициирующего участника. Обычно используется, когда действие одного участника должно уведомить его группу.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>нет</td><td>Срок действия ссылки в миллисекундах от момента отправки.</td></tr>
        </tbody>
      </table>

      <p>
        Если указаны и <Code>groupID</Code>, и <Code>participantID</Code>, Samply
        отправляет всем участникам группы, кроме указанного участника. Если указан только{' '}
        <Code>participantID</Code>, уведомление получает только этот участник. Если не
        указано ни то, ни другое, уведомление получают все участники исследования.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Ответы об ошибках</h2>
      <table>
        <thead><tr><th>Статус</th><th>Значение</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Успех.</td></tr>
          <tr><td><Code>400</Code></td><td>Неверный запрос — отсутствующие или недопустимые поля, либо в аккаунте не выбрано активное исследование.</td></tr>
          <tr><td><Code>401</Code></td><td>Отсутствующий или истёкший заголовок <Code>x-auth-token</Code>.</td></tr>
          <tr><td><Code>429</Code></td><td>Превышен лимит запросов. Подождите немного и повторите попытку.</td></tr>
          <tr><td><Code>500</Code></td><td>Внутренняя ошибка сервера. Тело ответа содержит фиксированную строку <Code>"Internal server error"</Code>; подробная диагностика записывается только на стороне сервера.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentNl() {
  return (
    <>
      <p>
        Samply biedt twee API-oppervlakken: een REST-API voor programmatisch
        studiebeheer (de <strong>onderzoeker-API</strong>) en twee
        integratiehaaks die door enquêtetools worden gebruikt om voltooiing te
        signaleren en ad-hoc-meldingen te activeren. Beide draaien op dezelfde
        host als het dashboard.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>Basis-URL</h2>
      <p>
        De onderzoeker-REST-API is gemonteerd op <Code>/webapi/v1</Code>. Alle
        onderstaande eindpunten zijn relatief aan dat voorvoegsel. De
        voltooiings- en meldingseindpunten zijn rechtstreeks op de root
        gemonteerd en worden afzonderlijk gedocumenteerd.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Authenticatie</h2>
      <p>
        Alle onderzoeker-API-eindpunten (behalve het tokeneindpunt zelf)
        vereisen een JWT dat wordt meegegeven in de{' '}
        <Code>x-auth-token</Code>-aanvraagheader. Verkrijg een token door uw
        onderzoekersgegevens in te dienen:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Wissel e-mail en wachtwoord in voor een JWT.' />
      </EndpointGroup>

      <p><strong>Aanvraaginhoud</strong></p>
      <table>
        <thead><tr><th>Veld</th><th>Type</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>E-mailadres van het onderzoekersconto.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Wachtwoord van het onderzoekersconto.</td></tr>
        </tbody>
      </table>

      <p><strong>Antwoord</strong></p>
      <table>
        <thead><tr><th>Veld</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT geldig voor 14 dagen. Geef het mee als <Code>x-auth-token</Code> bij volgende aanvragen.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Aanvraaglimieten</h2>
      <p>
        Alle API-paden zijn onderworpen aan aanvraaglimieten. Aanvragen die een
        limiet overschrijden ontvangen een{' '}
        <Code>429 Too Many Requests</Code>-antwoord. De drie niveaus zijn:
      </p>
      <table>
        <thead><tr><th>Limiet</th><th>Paden</th></tr></thead>
        <tbody>
          <tr><td>20 aanvragen / 15 min.</td><td><Code>/webapi/v1/auth</Code>, inlog-, accountaanmaak- en wachtwoordhersteleindpunten</td></tr>
          <tr><td>30 aanvragen / 1 min.</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 aanvragen / 15 min.</td><td>Alle overige <Code>/api/*</Code>- en <Code>/webapi/*</Code>-paden</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>De actieve studie</h2>
      <p>
        De meeste onderzoeker-API-eindpunten werken op de{' '}
        <em>actieve studie</em> — een enkele studie die is geselecteerd op het
        onderzoekersconto. Selecteer de studie waarmee u wilt werken voordat u
        deelnemers-, meldings- of taakopdrachteindpunten aanroept:
      </p>

      <EndpointGroup title='Studieselectie'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='Alle studies weergeven waarvan u eigenaar bent of waarvan u lid bent.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='De huidige actieve studie retourneren.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='De actieve studie instellen.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Een specifieke studie ophalen op basis van de MongoDB-ID.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Velden van een studie bijwerken.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> verwacht{' '}
        <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        in de aanvraaginhoud. De selectie wordt opgeslagen op uw
        onderzoekersconto en blijft van kracht voor volgende aanvragen totdat
        deze wordt gewijzigd.
      </p>

      <p><strong>PATCH-inhoud</strong> (studie bijwerken)</p>
      <p>Alleen de volgende velden worden geaccepteerd; alle andere worden genegeerd:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Deelnemers</h2>
      <p>
        Deze eindpunten beheren deelnemers in de actieve studie. Via de API
        aangemaakte deelnemers zijn aanvankelijk gedeactiveerd — zij ontvangen
        een JWT-uitnodigingstoken dat hen activeert wanneer zij de Samply
        Research-app openen.
      </p>

      <EndpointGroup title='Deelnemers — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='Alle deelnemers in de actieve studie weergeven.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Een deelnemer ophalen op basis van Samply-ID.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Een deelnemer aanmaken en inschrijven.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Deelnemersvelden bijwerken.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Een deelnemer uit de studie verwijderen.' />
      </EndpointGroup>

      <p><strong>POST-inhoud</strong> (deelnemer aanmaken)</p>
      <table>
        <thead><tr><th>Veld</th><th>Vereist</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>ja</td><td>Weergavenaam — niet zichtbaar voor andere deelnemers.</td></tr>
          <tr><td><Code>email</Code></td><td>ja</td><td>E-mail waarmee het Samply-account wordt aangemaakt.</td></tr>
          <tr><td><Code>code</Code></td><td>nee</td><td>Deelnemerscode opgeslagen als <Code>username</Code> en beschikbaar via <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>nee</td><td>Hoe lang de uitnodigings-JWT geldig blijft (bijv. <Code>"7d"</Code>). Maximaal 30 dagen — grotere waarden worden stilzwijgend afgekapt.</td></tr>
          <tr><td><Code>information</Code></td><td>nee</td><td>Vrij-vorm JSON-object voor willekeurige deelnemersmetadata.</td></tr>
        </tbody>
      </table>

      <p><strong>Antwoord</strong> (deelnemer aanmaken)</p>
      <table>
        <thead><tr><th>Veld</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>De automatisch gegenereerde Samply-ID voor de nieuwe deelnemer.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT-uitnodigingstoken. Stuur dit naar de deelnemer; de app gebruikt het om het account te activeren.</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH-inhoud</strong> (deelnemer bijwerken)</p>
      <table>
        <thead><tr><th>Veld</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Deelnemerscode / weergavenaam.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — stel in op <Code>true</Code> om meldingen voor deze deelnemer te stoppen.</td></tr>
          <tr><td><Code>group</Code></td><td>Groepsindelingsreeks.</td></tr>
        </tbody>
      </table>
      <p>Alle andere velden die in de inhoud worden meegestuurd, worden genegeerd.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Roosters (meldingen)</h2>
      <p>
        De meldingseindpunten beheren roosterdefinities — de regels die worden
        uitgebreid naar wachtrijrijen. Het aanmaken van een rooster via de API
        activeert dezelfde wachtrijuitbreiding als het indienen van het
        dashboardformulier.
      </p>

      <EndpointGroup title='Roosters — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='Alle roosterdefinities in de actieve studie weergeven.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Een roosterdefinitie ophalen.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Een rooster aanmaken en uitbreiden naar de wachtrij.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Een roosterdefinitie bijwerken.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Een rooster verwijderen en de openstaande wachtrijrijen annuleren.' />
      </EndpointGroup>

      <p>
        De <Code>POST</Code>-inhoud weerspiegelt de roosterformuliervelden. De
        routeringssleutel is de combinatie van <Code>schedule</Code> (
        <Code>one-time</Code> of <Code>repeat</Code>) en <Code>target</Code> (
        <Code>fixed-times</Code>, <Code>fixed-intervals</Code> of{' '}
        <Code>user-specific</Code>), wat overeenkomt met de interne handlers die
        door het dashboardformulier worden gebruikt.
      </p>

      <p><strong>PATCH-inhoud</strong> (rooster bijwerken)</p>
      <p>
        Alleen de volgende velden worden geaccepteerd; alle andere worden genegeerd:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Wachtrij (taken)</h2>
      <p>
        De taakeindpunten geven afzonderlijke wachtrijrijen weer — de uitgebreide
        verzendingen gegenereerd vanuit roosterdefinities.
      </p>

      <EndpointGroup title='Wachtrijrijen — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='Alle wachtrijrijen voor de actieve studie weergeven.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='Wachtrijrijen voor een specifiek rooster weergeven.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Een specifieke wachtrijrij ophalen.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Een wachtrijrij bijwerken.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Een wachtrijrij verwijderen.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Voltooiingscallback</h2>
      <p>
        Deze eindpunten worden aangeroepen door enquêtetools om een
        voltooiingsgebeurtenis te registreren. Bij succes markeert Samply het
        resultaat als voltooid en annuleert alle openstaande herinneringen voor
        die verzending. Geen authenticatie vereist — de bericht-ID fungeert als
        gedeeld geheim.
      </p>

      <EndpointGroup title='Voltooiing — geen authenticatie vereist'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Voltooiing registreren en een bevestigingspagina tonen (gebruik als eindomleidingsadres van de enquête).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Voltooiing stilzwijgend registreren (gebruik als webhook van uw enquêtetool).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>De URL-slug van de studie zoals weergegeven in de adresbalk van het dashboard.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          De bericht-ID uit de <Code>%MESSAGE_ID%</Code>-plaatshouder, doorgegeven via
          uw enquête-URL naar de eindomleidingsadres of webhook. Zie{' '}
          <a href='/docs/reminders'>Herinneringen</a> voor de volledige
          installatiehandleiding.
        </dd>
      </dl>

      <p>
        Het <Code>POST</Code>-eindpunt retourneert <Code>200</Code> bij succes en{' '}
        <Code>400</Code> als er geen overeenkomend resultaatrecord wordt gevonden
        voor de opgegeven bericht-ID.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Meldingshaak</h2>
      <p>
        De meldingshaak stuurt een onmiddellijke ad-hoc-pushmelding naar
        deelnemers in een studie — zonder een rooster of wachtrijrij aan te
        maken. Bedoeld voor gebeurtenisgestuurde meldingen vanuit externe
        systemen (een REDCap-waarschuwing, een labsysteemgebeurtenis, enz.).
        Authenticatie maakt gebruik van een studiespecifiek meldingstoken in
        plaats van de onderzoeker-JWT.
      </p>

      <EndpointGroup title='Ad-hoc-melding — tokenauthenticatie'>
        <Method verb='POST' path='/api/notify' desc='Een onmiddellijke melding sturen naar deelnemers in een studie.' />
      </EndpointGroup>

      <p><strong>Aanvraaginhoud</strong></p>
      <table>
        <thead><tr><th>Veld</th><th>Vereist</th><th>Beschrijving</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>ja</td><td>Meldingstoken van de studie. Genereer het opnieuw via Studie bewerken → Meldingstoken.</td></tr>
          <tr><td><Code>projectID</Code></td><td>ja</td><td>De MongoDB-ID van de studie.</td></tr>
          <tr><td><Code>title</Code></td><td>ja</td><td>Titel van de melding.</td></tr>
          <tr><td><Code>message</Code></td><td>ja</td><td>Berichttekst van de melding.</td></tr>
          <tr><td><Code>url</Code></td><td>nee</td><td>Enquête-URL. Ondersteunt dezelfde <Code>%TOKEN%</Code>-plaatshouders als geplande meldingen.</td></tr>
          <tr><td><Code>participantID</Code></td><td>nee</td><td>Stuur naar een specifieke deelnemer (Samply-ID). Weglaten om naar alle deelnemers te sturen.</td></tr>
          <tr><td><Code>groupID</Code></td><td>nee</td><td>Stuur naar alle leden van een groep behalve de triggerende deelnemer. Doorgaans gebruikt wanneer de actie van een deelnemer zijn groep moet informeren.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>nee</td><td>Vervaltijd van de koppeling in milliseconden vanaf het verzendmoment.</td></tr>
        </tbody>
      </table>

      <p>
        Als zowel <Code>groupID</Code> als <Code>participantID</Code> worden
        opgegeven, stuurt Samply naar alle groepsleden behalve de genoemde
        deelnemer. Als alleen <Code>participantID</Code> wordt opgegeven, wordt
        alleen die deelnemer gemeld. Als geen van beide wordt opgegeven,
        ontvangen alle studiedeelnemers de melding.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Foutantwoorden</h2>
      <table>
        <thead><tr><th>Status</th><th>Betekenis</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Geslaagd.</td></tr>
          <tr><td><Code>400</Code></td><td>Ongeldige aanvraag — ontbrekende of ongeldige velden, of geen actieve studie ingesteld op het account.</td></tr>
          <tr><td><Code>401</Code></td><td>Ontbrekende of verlopen <Code>x-auth-token</Code>-header.</td></tr>
          <tr><td><Code>429</Code></td><td>Aanvraaglimiet overschreden. Wacht even en probeer het opnieuw.</td></tr>
          <tr><td><Code>500</Code></td><td>Interne serverfout. De antwoordinhoud bevat de vaste tekenreeks <Code>"Internal server error"</Code>; gedetailleerde diagnostiek wordt alleen server-side geregistreerd.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentDe() {
  return (
    <>
      <p>
        Samply stellt zwei API-Oberflächen bereit: eine REST-API für die programmatische
        Studienverwaltung (die <strong>Forscher-API</strong>) und zwei Integrations-Hooks,
        die von Umfrage-Tools verwendet werden, um den Abschluss zu signalisieren und
        Ad-hoc-Benachrichtigungen auszulösen. Beide laufen auf demselben Host wie das
        Dashboard.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>Basis-URL</h2>
      <p>
        Die Forscher-REST-API ist unter <Code>/webapi/v1</Code> eingehängt. Alle
        nachfolgenden Endpunkte sind relativ zu diesem Präfix. Die Abschluss- und
        Notify-Endpunkte sind direkt im Stammverzeichnis eingehängt und werden separat
        dokumentiert.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Authentifizierung</h2>
      <p>
        Alle Forscher-API-Endpunkte (außer dem Token-Endpunkt selbst) erfordern ein JWT,
        das im <Code>x-auth-token</Code>-Anfrage-Header übergeben wird. Erhalten Sie einen
        Token, indem Sie Ihre Forscherdaten übermitteln:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='E-Mail + Passwort gegen ein JWT tauschen.' />
      </EndpointGroup>

      <p><strong>Anfrage-Body</strong></p>
      <table>
        <thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>E-Mail des Forscherkontos.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Passwort des Forscherkontos.</td></tr>
        </tbody>
      </table>

      <p><strong>Antwort</strong></p>
      <table>
        <thead><tr><th>Feld</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT gültig für 14 Tage. Übergeben Sie es als <Code>x-auth-token</Code> bei nachfolgenden Anfragen.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Anfragebeschränkungen</h2>
      <p>
        Alle API-Pfade unterliegen Anfragebeschränkungen. Anfragen, die ein Limit
        überschreiten, erhalten eine <Code>429 Too Many Requests</Code>-Antwort. Die drei
        Stufen sind:
      </p>
      <table>
        <thead><tr><th>Limit</th><th>Pfade</th></tr></thead>
        <tbody>
          <tr><td>20 Anfragen / 15 Min.</td><td><Code>/webapi/v1/auth</Code>, Anmelde-, Kontoerstellungs- und Passwort-Reset-Endpunkte</td></tr>
          <tr><td>30 Anfragen / 1 Min.</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 Anfragen / 15 Min.</td><td>Alle anderen <Code>/api/*</Code>- und <Code>/webapi/*</Code>-Pfade</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>Die aktive Studie</h2>
      <p>
        Die meisten Forscher-API-Endpunkte operieren auf der <em>aktiven Studie</em> —
        einer einzelnen, auf dem Forscherkonto ausgewählten Studie. Bevor Sie Teilnehmer-,
        Benachrichtigungs- oder Job-Endpunkte aufrufen, wählen Sie die Studie aus, mit der
        Sie arbeiten möchten:
      </p>

      <EndpointGroup title='Studienauswahl'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='Alle Studien auflisten, die Sie besitzen oder an denen Sie Mitglied sind.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='Die aktuell aktive Studie zurückgeben.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='Die aktive Studie festlegen.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Eine bestimmte Studie anhand ihrer MongoDB-ID abrufen.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Felder einer Studie aktualisieren.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> erwartet <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        im Anfrage-Body. Die Auswahl wird auf Ihrem Forscherkonto gespeichert und bleibt
        über Anfragen hinweg erhalten, bis sie geändert wird.
      </p>

      <p><strong>PATCH-Body</strong> (Studie aktualisieren)</p>
      <p>Nur die folgenden Felder werden akzeptiert; alle anderen werden ignoriert:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Teilnehmer</h2>
      <p>
        Diese Endpunkte verwalten Teilnehmer in der aktiven Studie. Über die API erstellte
        Teilnehmer sind zunächst deaktiviert — sie erhalten einen JWT-Einladungstoken, der
        sie aktiviert, wenn sie die Samply Research-App öffnen.
      </p>

      <EndpointGroup title='Teilnehmer — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='Alle Teilnehmer der aktiven Studie auflisten.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Einen Teilnehmer anhand der Samply-ID abrufen.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Einen Teilnehmer erstellen und anmelden.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Teilnehmerfelder aktualisieren.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Einen Teilnehmer aus der Studie entfernen.' />
      </EndpointGroup>

      <p><strong>POST-Body</strong> (Teilnehmer erstellen)</p>
      <table>
        <thead><tr><th>Feld</th><th>Erforderlich</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>ja</td><td>Anzeigename — wird anderen Teilnehmern nicht angezeigt.</td></tr>
          <tr><td><Code>email</Code></td><td>ja</td><td>E-Mail zur Erstellung des Samply-Kontos.</td></tr>
          <tr><td><Code>code</Code></td><td>nein</td><td>Teilnehmercode, gespeichert als <Code>username</Code> und verfügbar über <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>nein</td><td>Wie lange das Einladungs-JWT gültig bleibt (z. B. <Code>"7d"</Code>). Maximal 30 Tage — größere Werte werden stillschweigend gekappt.</td></tr>
          <tr><td><Code>information</Code></td><td>nein</td><td>Freiform-JSON-Objekt für beliebige Teilnehmer-Metadaten.</td></tr>
        </tbody>
      </table>

      <p><strong>Antwort</strong> (Teilnehmer erstellen)</p>
      <table>
        <thead><tr><th>Feld</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>Die automatisch generierte Samply-ID für den neuen Teilnehmer.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT-Einladungstoken. Senden Sie diesen an den Teilnehmer; die App verwendet ihn, um das Konto zu aktivieren.</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH-Body</strong> (Teilnehmer aktualisieren)</p>
      <table>
        <thead><tr><th>Feld</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Teilnehmercode / Anzeigename.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — auf <Code>true</Code> setzen, um Benachrichtigungen für diesen Teilnehmer zu stoppen.</td></tr>
          <tr><td><Code>group</Code></td><td>Gruppenbezeichnungsstring.</td></tr>
        </tbody>
      </table>
      <p>Alle anderen im Body gesendeten Felder werden ignoriert.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Zeitpläne (Benachrichtigungen)</h2>
      <p>
        Die Benachrichtigungs-Endpunkte verwalten Zeitplandefinitionen — die Regeln, die
        sich in Warteschlangen-Zeilen erweitern. Das Erstellen eines Zeitplans über die API
        löst dieselbe Warteschlangenerweiterung aus wie das Einreichen des Dashboard-Formulars.
      </p>

      <EndpointGroup title='Zeitpläne — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='Alle Zeitplandefinitionen der aktiven Studie auflisten.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Eine Zeitplandefinition abrufen.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Einen Zeitplan erstellen und in die Warteschlange erweitern.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Eine Zeitplandefinition aktualisieren.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Einen Zeitplan löschen und seine ausstehenden Warteschlangen-Zeilen stornieren.' />
      </EndpointGroup>

      <p>
        Der <Code>POST</Code>-Body spiegelt die Zeitplanformularfelder wider. Der
        Routing-Schlüssel ist die Kombination aus <Code>schedule</Code> (
        <Code>one-time</Code> oder <Code>repeat</Code>) und <Code>target</Code> (
        <Code>fixed-times</Code>, <Code>fixed-intervals</Code> oder{' '}
        <Code>user-specific</Code>), die denselben internen Handlern entspricht, die vom
        Dashboard-Formular verwendet werden.
      </p>

      <p><strong>PATCH-Body</strong> (Zeitplan aktualisieren)</p>
      <p>
        Nur die folgenden Felder werden akzeptiert; alle anderen werden ignoriert:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Warteschlange (Jobs)</h2>
      <p>
        Die Job-Endpunkte geben einzelne Warteschlangen-Zeilen preis — die aus
        Zeitplandefinitionen expandierten Sendungen.
      </p>

      <EndpointGroup title='Warteschlangen-Zeilen — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='Alle Warteschlangen-Zeilen der aktiven Studie auflisten.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='Warteschlangen-Zeilen für einen bestimmten Zeitplan auflisten.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Eine bestimmte Warteschlangen-Zeile abrufen.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Eine Warteschlangen-Zeile aktualisieren.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Eine Warteschlangen-Zeile löschen.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Abschluss-Callback</h2>
      <p>
        Diese Endpunkte werden von Umfrage-Tools aufgerufen, um ein Abschlussereignis zu
        registrieren. Bei Erfolg markiert Samply das Ergebnis als abgeschlossen und
        storniert alle ausstehenden Erinnerungen für diesen Versand. Keine Authentifizierung
        erforderlich — die Message-ID dient als gemeinsames Geheimnis.
      </p>

      <EndpointGroup title='Abschluss — keine Authentifizierung erforderlich'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Abschluss registrieren und eine Bestätigungsseite anzeigen (als End-of-Survey-Weiterleitung verwenden).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Abschluss stillschweigend registrieren (als webhook vom Umfrage-Tool verwenden).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>Der in der Dashboard-Adressleiste angezeigte Studien-URL-Slug.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          Die Message-ID aus dem <Code>%MESSAGE_ID%</Code>-Platzhalter, die über Ihre
          Umfrage-URL zur End-of-Survey-Weiterleitung oder zum webhook weitergegeben wird.
          Siehe <a href='/docs/reminders'>Erinnerungen</a> für die vollständige
          Einrichtungsanleitung.
        </dd>
      </dl>

      <p>
        Der <Code>POST</Code>-Endpunkt gibt <Code>200</Code> bei Erfolg zurück und{' '}
        <Code>400</Code>, wenn kein passender Ergebnisdatensatz für die angegebene
        Message-ID gefunden wird.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Notify-Hook</h2>
      <p>
        Der Notify-Hook sendet eine sofortige Ad-hoc-Push-Benachrichtigung an Teilnehmer
        einer Studie — ohne einen Zeitplan oder eine Warteschlangen-Zeile zu erstellen.
        Gedacht für ereignisgesteuerte Benachrichtigungen aus externen Systemen (ein
        REDCap-Alert, ein Laborsystemereignis usw.). Die Authentifizierung verwendet einen
        studienspezifischen Notify-Token anstelle des Forscher-JWT.
      </p>

      <EndpointGroup title='Ad-hoc-Benachrichtigung — Token-Authentifizierung'>
        <Method verb='POST' path='/api/notify' desc='Eine sofortige Benachrichtigung an Teilnehmer einer Studie senden.' />
      </EndpointGroup>

      <p><strong>Anfrage-Body</strong></p>
      <table>
        <thead><tr><th>Feld</th><th>Erforderlich</th><th>Beschreibung</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>ja</td><td>Notify-Token der Studie. Regenerieren Sie ihn in Studie bearbeiten → Notify-Token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>ja</td><td>Die MongoDB-ID der Studie.</td></tr>
          <tr><td><Code>title</Code></td><td>ja</td><td>Benachrichtigungstitel.</td></tr>
          <tr><td><Code>message</Code></td><td>ja</td><td>Textkörper der Benachrichtigung.</td></tr>
          <tr><td><Code>url</Code></td><td>nein</td><td>Umfrage-URL. Unterstützt dieselben <Code>%TOKEN%</Code>-Platzhalter wie geplante Benachrichtigungen.</td></tr>
          <tr><td><Code>participantID</Code></td><td>nein</td><td>An einen bestimmten Teilnehmer senden (Samply-ID). Weglassen, um an alle zu senden.</td></tr>
          <tr><td><Code>groupID</Code></td><td>nein</td><td>An alle Mitglieder einer Gruppe außer dem auslösenden Teilnehmer senden. Typischerweise verwendet, wenn die Aktion eines Teilnehmers seine Gruppe benachrichtigen soll.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>nein</td><td>Link-Ablauf in Millisekunden ab Versandzeitpunkt.</td></tr>
        </tbody>
      </table>

      <p>
        Wenn sowohl <Code>groupID</Code> als auch <Code>participantID</Code> angegeben
        sind, sendet Samply an alle Gruppenmitglieder außer dem genannten Teilnehmer. Wenn
        nur <Code>participantID</Code> angegeben ist, wird nur dieser Teilnehmer
        benachrichtigt. Wenn keines von beiden angegeben ist, erhalten alle
        Studienteilnehmer die Benachrichtigung.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Fehlerantworten</h2>
      <table>
        <thead><tr><th>Status</th><th>Bedeutung</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Erfolg.</td></tr>
          <tr><td><Code>400</Code></td><td>Ungültige Anfrage — fehlende oder ungültige Felder, oder keine aktive Studie auf dem Konto gesetzt.</td></tr>
          <tr><td><Code>401</Code></td><td>Fehlender oder abgelaufener <Code>x-auth-token</Code>-Header.</td></tr>
          <tr><td><Code>429</Code></td><td>Anfragebeschränkung überschritten. Warten Sie kurz und versuchen Sie es erneut.</td></tr>
          <tr><td><Code>500</Code></td><td>Interner Serverfehler. Der Antwortkörper enthält die feste Zeichenkette <Code>"Internal server error"</Code>; detaillierte Diagnosen werden nur serverseitig protokolliert.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentKo() {
  return (
    <>
      <p>
        Samply는 두 가지 API 인터페이스를 제공합니다: 프로그래밍 방식의 연구 관리를 위한
        REST API(<strong>연구자 API</strong>)와 설문 도구가 완료 신호를 보내고 임시 알림을
        트리거하는 데 사용하는 두 가지 통합 훅입니다. 두 가지 모두 대시보드와 동일한 호스트에서
        실행됩니다.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>기본 URL</h2>
      <p>
        연구자 REST API는 <Code>/webapi/v1</Code>에 마운트되어 있습니다. 아래의 모든 엔드포인트는
        해당 접두사를 기준으로 합니다. 완료 및 알림 엔드포인트는 루트에 직접 마운트되며 별도로
        문서화되어 있습니다.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>인증</h2>
      <p>
        모든 연구자 API 엔드포인트(토큰 엔드포인트 자체 제외)는 <Code>x-auth-token</Code>{' '}
        요청 헤더에 JWT를 전달해야 합니다. 연구자 자격 증명을 제출하여 토큰을 얻으십시오:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='이메일과 비밀번호를 JWT로 교환합니다.' />
      </EndpointGroup>

      <p><strong>요청 본문</strong></p>
      <table>
        <thead><tr><th>필드</th><th>유형</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>연구자 계정 이메일.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>연구자 계정 비밀번호.</td></tr>
        </tbody>
      </table>

      <p><strong>응답</strong></p>
      <table>
        <thead><tr><th>필드</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>14일간 유효한 JWT. 이후 요청에서 <Code>x-auth-token</Code>으로 전달하십시오.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>요청 빈도 제한</h2>
      <p>
        모든 API 경로는 요청 빈도 제한을 받습니다. 제한을 초과하는 요청은{' '}
        <Code>429 Too Many Requests</Code> 응답을 받습니다. 세 가지 등급은 다음과 같습니다:
      </p>
      <table>
        <thead><tr><th>제한</th><th>경로</th></tr></thead>
        <tbody>
          <tr><td>20회 요청 / 15분</td><td><Code>/webapi/v1/auth</Code>, 로그인, 계정 생성, 비밀번호 재설정 엔드포인트</td></tr>
          <tr><td>30회 요청 / 1분</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100회 요청 / 15분</td><td>다른 모든 <Code>/api/*</Code> 및 <Code>/webapi/*</Code> 경로</td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>활성 연구</h2>
      <p>
        대부분의 연구자 API 엔드포인트는 <em>활성 연구</em> — 연구자 계정에서 선택된 단일 연구 —
        를 대상으로 작동합니다. 참여자, 알림 또는 작업 엔드포인트를 호출하기 전에 작업할 연구를
        선택하십시오:
      </p>

      <EndpointGroup title='연구 선택'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='소유하거나 참여 중인 모든 연구를 나열합니다.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='현재 활성 연구를 반환합니다.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='활성 연구를 설정합니다.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='MongoDB ID로 특정 연구를 가져옵니다.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='연구의 필드를 업데이트합니다.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code>는 요청 본문에 <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        를 전달받습니다. 선택은 연구자 계정에 저장되며 변경될 때까지 요청 간에 유지됩니다.
      </p>

      <p><strong>PATCH 본문</strong> (연구 업데이트)</p>
      <p>다음 필드만 허용되며, 그 외 모든 필드는 무시됩니다:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>참여자</h2>
      <p>
        이 엔드포인트들은 활성 연구의 참여자를 관리합니다. API를 통해 생성된 참여자는
        초기에 비활성화 상태입니다 — Samply Research 앱을 열 때 계정을 활성화하는 JWT 초대
        토큰을 받습니다.
      </p>

      <EndpointGroup title='참여자 — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='활성 연구의 모든 참여자를 나열합니다.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Samply ID로 한 명의 참여자를 가져옵니다.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='참여자를 생성하고 등록합니다.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='참여자 필드를 업데이트합니다.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='연구에서 참여자를 제거합니다.' />
      </EndpointGroup>

      <p><strong>POST 본문</strong> (참여자 생성)</p>
      <table>
        <thead><tr><th>필드</th><th>필수</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>예</td><td>표시 이름 — 다른 참여자에게는 표시되지 않습니다.</td></tr>
          <tr><td><Code>email</Code></td><td>예</td><td>Samply 계정 생성에 사용되는 이메일.</td></tr>
          <tr><td><Code>code</Code></td><td>아니오</td><td><Code>username</Code>으로 저장되고 <Code>%PARTICIPANT_CODE%</Code>를 통해 사용 가능한 참여자 코드.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>아니오</td><td>초대 JWT의 유효 기간 (예: <Code>"7d"</Code>). 최대 30일 — 더 큰 값은 자동으로 제한됩니다.</td></tr>
          <tr><td><Code>information</Code></td><td>아니오</td><td>임의 참여자 메타데이터를 위한 자유 형식 JSON 객체.</td></tr>
        </tbody>
      </table>

      <p><strong>응답</strong> (참여자 생성)</p>
      <table>
        <thead><tr><th>필드</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>새 참여자를 위해 자동 생성된 Samply ID.</td></tr>
          <tr><td><Code>token</Code></td><td>JWT 초대 토큰. 참여자에게 전송하십시오; 앱이 계정을 활성화하는 데 사용합니다.</td></tr>
        </tbody>
      </table>

      <p><strong>PATCH 본문</strong> (참여자 업데이트)</p>
      <table>
        <thead><tr><th>필드</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>참여자 코드 / 표시 이름.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — 이 참여자의 알림을 중단하려면 <Code>true</Code>로 설정합니다.</td></tr>
          <tr><td><Code>group</Code></td><td>그룹 할당 문자열.</td></tr>
        </tbody>
      </table>
      <p>본문에서 전송된 다른 모든 필드는 무시됩니다.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>일정 (알림)</h2>
      <p>
        알림 엔드포인트는 일정 정의 — 대기열 행으로 확장되는 규칙 — 를 관리합니다. API를
        통해 일정을 생성하면 대시보드 양식을 제출할 때와 동일한 대기열 확장이 트리거됩니다.
      </p>

      <EndpointGroup title='일정 — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='활성 연구의 모든 일정 정의를 나열합니다.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='하나의 일정 정의를 가져옵니다.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='일정을 생성하고 대기열로 확장합니다.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='일정 정의를 업데이트합니다.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='일정을 삭제하고 보류 중인 대기열 행을 취소합니다.' />
      </EndpointGroup>

      <p>
        <Code>POST</Code> 본문은 일정 양식 필드를 반영합니다. 라우팅 키는{' '}
        <Code>schedule</Code>(<Code>one-time</Code> 또는 <Code>repeat</Code>)와{' '}
        <Code>target</Code>(<Code>fixed-times</Code>, <Code>fixed-intervals</Code> 또는{' '}
        <Code>user-specific</Code>)의 조합으로, 대시보드 양식이 사용하는 것과 동일한 내부
        핸들러에 매핑됩니다.
      </p>

      <p><strong>PATCH 본문</strong> (일정 업데이트)</p>
      <p>
        다음 필드만 허용되며, 그 외 모든 필드는 무시됩니다:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>대기열 (작업)</h2>
      <p>
        작업 엔드포인트는 개별 대기열 행 — 일정 정의에서 생성된 확장된 전송 — 을 노출합니다.
      </p>

      <EndpointGroup title='대기열 행 — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='활성 연구의 모든 대기열 행을 나열합니다.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='특정 일정의 대기열 행을 나열합니다.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='특정 대기열 행 하나를 가져옵니다.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='대기열 행을 업데이트합니다.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='대기열 행을 삭제합니다.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>완료 콜백</h2>
      <p>
        이 엔드포인트들은 설문 도구가 완료 이벤트를 등록하기 위해 호출합니다. 성공 시 Samply는
        결과를 완료로 표시하고 해당 전송의 모든 보류 중인 알림을 취소합니다. 인증이 필요하지
        않습니다 — 메시지 ID가 공유 비밀 역할을 합니다.
      </p>

      <EndpointGroup title='완료 — 인증 불필요'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='완료를 등록하고 확인 페이지를 표시합니다 (설문 종료 리디렉션으로 사용).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='완료를 자동으로 등록합니다 (설문 도구의 webhook으로 사용).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>대시보드 주소 표시줄에 표시된 연구 URL 슬러그.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          설문 URL을 통해 설문 종료 리디렉션 또는 webhook으로 전달되는{' '}
          <Code>%MESSAGE_ID%</Code> 자리 표시자의 메시지 ID. 전체 설정 안내는{' '}
          <a href='/docs/reminders'>알림</a>을 참조하십시오.
        </dd>
      </dl>

      <p>
        <Code>POST</Code> 엔드포인트는 성공 시 <Code>200</Code>을 반환하고{' '}
        주어진 메시지 ID에 대한 일치하는 결과 레코드를 찾을 수 없는 경우 <Code>400</Code>을
        반환합니다.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>알림 훅</h2>
      <p>
        알림 훅은 일정이나 대기열 행을 생성하지 않고 연구의 참여자에게 즉각적인 임시 푸시 알림을
        전송합니다. 외부 시스템(REDCap 알림, 실험실 시스템 이벤트 등)의 이벤트 트리거 알림을
        위한 것입니다. 인증은 연구자 JWT가 아닌 연구별 알림 토큰을 사용합니다.
      </p>

      <EndpointGroup title='임시 알림 — 토큰 인증'>
        <Method verb='POST' path='/api/notify' desc='연구의 참여자에게 즉각적인 알림을 전송합니다.' />
      </EndpointGroup>

      <p><strong>요청 본문</strong></p>
      <table>
        <thead><tr><th>필드</th><th>필수</th><th>설명</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>예</td><td>연구 알림 토큰. 연구 편집 → Notify token에서 재생성하십시오.</td></tr>
          <tr><td><Code>projectID</Code></td><td>예</td><td>연구의 MongoDB ID.</td></tr>
          <tr><td><Code>title</Code></td><td>예</td><td>알림 제목.</td></tr>
          <tr><td><Code>message</Code></td><td>예</td><td>알림 본문 텍스트.</td></tr>
          <tr><td><Code>url</Code></td><td>아니오</td><td>설문 URL. 예약된 알림과 동일한 <Code>%TOKEN%</Code> 자리 표시자를 지원합니다.</td></tr>
          <tr><td><Code>participantID</Code></td><td>아니오</td><td>특정 참여자(Samply ID)에게 전송합니다. 모두에게 전송하려면 생략하십시오.</td></tr>
          <tr><td><Code>groupID</Code></td><td>아니오</td><td>트리거 참여자를 제외한 그룹의 모든 구성원에게 전송합니다. 일반적으로 한 참여자의 행동이 그룹에 알림을 보내야 할 때 사용됩니다.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>아니오</td><td>전송 시간으로부터 밀리초 단위의 링크 만료 시간.</td></tr>
        </tbody>
      </table>

      <p>
        <Code>groupID</Code>와 <Code>participantID</Code>가 모두 제공되면 Samply는 지정된
        참여자를 제외한 모든 그룹 구성원에게 전송합니다. <Code>participantID</Code>만 제공된
        경우 해당 참여자만 알림을 받습니다. 둘 다 제공되지 않으면 모든 연구 참여자가 알림을
        받습니다.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>오류 응답</h2>
      <table>
        <thead><tr><th>상태</th><th>의미</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>성공.</td></tr>
          <tr><td><Code>400</Code></td><td>잘못된 요청 — 필드가 누락되거나 유효하지 않거나, 계정에 활성 연구가 설정되어 있지 않습니다.</td></tr>
          <tr><td><Code>401</Code></td><td>누락되거나 만료된 <Code>x-auth-token</Code> 헤더.</td></tr>
          <tr><td><Code>429</Code></td><td>요청 빈도 제한 초과. 잠시 후 재시도하십시오.</td></tr>
          <tr><td><Code>500</Code></td><td>내부 서버 오류. 응답 본문에는 고정 문자열 <Code>"Internal server error"</Code>가 포함됩니다; 상세 진단은 서버 측에만 기록됩니다.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentIt() {
  return (
    <>
      <p>
        Samply espone due superfici API: una REST API per la gestione programmatica degli studi
        (la <strong>API ricercatore</strong>), e due hook di integrazione utilizzati dagli strumenti
        di indagine per segnalare il completamento e attivare notifiche ad hoc. Entrambi vengono
        eseguiti sullo stesso host del pannello di controllo.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>URL di base</h2>
      <p>
        La REST API ricercatore è montata su <Code>/webapi/v1</Code>. Tutti gli endpoint di seguito
        sono relativi a quel prefisso. Gli endpoint di completamento e notifica sono montati
        direttamente sulla root e sono documentati separatamente.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Autenticazione</h2>
      <p>
        Tutti gli endpoint dell&apos;API ricercatore (ad eccezione dell&apos;endpoint del token stesso)
        richiedono un JWT passato nell&apos;intestazione di richiesta <Code>x-auth-token</Code>.
        Ottenere un token inviando le credenziali del ricercatore:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Scambia email e password per un JWT.' />
      </EndpointGroup>

      <p><strong>Corpo della richiesta</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>Email dell&apos;account ricercatore.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Password dell&apos;account ricercatore.</td></tr>
        </tbody>
      </table>

      <p><strong>Risposta</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT valido per 14 giorni. Passarlo come <Code>x-auth-token</Code> nelle richieste successive.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Limiti di frequenza</h2>
      <p>
        Tutti i percorsi API sono soggetti a limiti di frequenza. Le richieste che superano un limite
        ricevono una risposta <Code>429 Too Many Requests</Code>. I tre livelli sono:
      </p>
      <table>
        <thead><tr><th>Limite</th><th>Percorsi</th></tr></thead>
        <tbody>
          <tr><td>20 richieste / 15 min</td><td><Code>/webapi/v1/auth</Code>, endpoint di login, creazione account e reset password</td></tr>
          <tr><td>30 richieste / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 richieste / 15 min</td><td>Tutti gli altri percorsi <Code>/api/*</Code> e <Code>/webapi/*</Code></td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>Lo studio attivo</h2>
      <p>
        La maggior parte degli endpoint dell&apos;API ricercatore opera sullo <em>studio attivo</em> —
        un singolo studio selezionato sull&apos;account del ricercatore. Prima di chiamare gli endpoint
        relativi a partecipanti, notifiche o lavori, selezionare lo studio con cui si desidera
        lavorare:
      </p>

      <EndpointGroup title='Selezione dello studio'>
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc='Elenca tutti gli studi di cui si è proprietari o membri.' />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc='Restituisce lo studio attualmente attivo.' />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc='Imposta lo studio attivo.' />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc='Ottieni uno studio specifico tramite il suo MongoDB ID.' />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc='Aggiorna i campi di uno studio.' />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> si aspetta <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        nel corpo della richiesta. La selezione viene memorizzata sull&apos;account del ricercatore e
        persiste tra le richieste fino a quando non viene modificata.
      </p>

      <p><strong>Corpo PATCH</strong> (aggiornamento studio)</p>
      <p>Vengono accettati solo i seguenti campi; tutti gli altri vengono ignorati:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Partecipanti</h2>
      <p>
        Questi endpoint gestiscono i partecipanti nello studio attivo. I partecipanti creati tramite
        l&apos;API sono inizialmente disattivati — ricevono un token di invito JWT che li attiva quando
        aprono l&apos;app Samply Research.
      </p>

      <EndpointGroup title='Partecipanti — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc='Elenca tutti i partecipanti nello studio attivo.' />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc='Ottieni un partecipante tramite Samply ID.' />
        <Method verb='POST'   path='/webapi/v1/participants'      desc='Crea e registra un partecipante.' />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc='Aggiorna i campi del partecipante.' />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc='Rimuove un partecipante dallo studio.' />
      </EndpointGroup>

      <p><strong>Corpo POST</strong> (creazione partecipante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Obbligatorio</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>sì</td><td>Nome visualizzato — non mostrato agli altri partecipanti.</td></tr>
          <tr><td><Code>email</Code></td><td>sì</td><td>Email utilizzata per creare l&apos;account Samply.</td></tr>
          <tr><td><Code>code</Code></td><td>no</td><td>Codice partecipante memorizzato come <Code>username</Code> e disponibile tramite <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>no</td><td>Per quanto tempo il JWT di invito rimane valido (es. <Code>"7d"</Code>). Massimo 30 giorni — i valori maggiori vengono limitati automaticamente.</td></tr>
          <tr><td><Code>information</Code></td><td>no</td><td>Oggetto JSON in formato libero per metadati arbitrari del partecipante.</td></tr>
        </tbody>
      </table>

      <p><strong>Risposta</strong> (creazione partecipante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>Il Samply ID generato automaticamente per il nuovo partecipante.</td></tr>
          <tr><td><Code>token</Code></td><td>Token di invito JWT. Inviarlo al partecipante; l&apos;app lo utilizza per attivare il suo account.</td></tr>
        </tbody>
      </table>

      <p><strong>Corpo PATCH</strong> (aggiornamento partecipante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Codice partecipante / nome visualizzato.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Boolean — impostare su <Code>true</Code> per interrompere le notifiche per questo partecipante.</td></tr>
          <tr><td><Code>group</Code></td><td>Stringa di assegnazione al gruppo.</td></tr>
        </tbody>
      </table>
      <p>Tutti gli altri campi inviati nel corpo vengono ignorati.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Pianificazioni (notifiche)</h2>
      <p>
        Gli endpoint delle notifiche gestiscono le definizioni di pianificazione — le regole che si
        espandono in righe di coda. La creazione di una pianificazione tramite l&apos;API attiva la
        stessa espansione della coda dell&apos;invio del modulo nel pannello di controllo.
      </p>

      <EndpointGroup title='Pianificazioni — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc='Elenca tutte le definizioni di pianificazione nello studio attivo.' />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc='Ottieni una definizione di pianificazione.' />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc='Crea una pianificazione ed espandila nella coda.' />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc='Aggiorna una definizione di pianificazione.' />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc='Elimina una pianificazione e annulla le righe di coda in attesa.' />
      </EndpointGroup>

      <p>
        Il corpo <Code>POST</Code> rispecchia i campi del modulo di pianificazione. La chiave di
        routing è la combinazione di <Code>schedule</Code> (<Code>one-time</Code> o{' '}
        <Code>repeat</Code>) e <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code> o <Code>user-specific</Code>), che si mappa agli stessi handler
        interni utilizzati dal modulo del pannello di controllo.
      </p>

      <p><strong>Corpo PATCH</strong> (aggiornamento pianificazione)</p>
      <p>
        Vengono accettati solo i seguenti campi; tutti gli altri vengono ignorati:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Coda (lavori)</h2>
      <p>
        Gli endpoint dei lavori espongono singole righe di coda — gli invii espansi generati dalle
        definizioni di pianificazione.
      </p>

      <EndpointGroup title='Righe di coda — /webapi/v1/jobs'>
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc='Elenca tutte le righe di coda per lo studio attivo.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc='Elenca le righe di coda per una pianificazione specifica.' />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Ottieni una riga di coda specifica.' />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Aggiorna una riga di coda.' />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc='Elimina una riga di coda.' />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Callback di completamento</h2>
      <p>
        Questi endpoint vengono chiamati dagli strumenti di indagine per registrare un evento di
        completamento. In caso di successo, Samply contrassegna il risultato come completato e annulla
        tutti i promemoria in attesa per quell&apos;invio. Non è richiesta autenticazione — l&apos;ID
        messaggio funge da segreto condiviso.
      </p>

      <EndpointGroup title='Completamento — nessuna autenticazione richiesta'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Registra il completamento e mostra una pagina di conferma (da usare come reindirizzamento di fine sondaggio).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Registra il completamento in modo silenzioso (da usare come webhook dallo strumento di indagine).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>Lo slug URL dello studio mostrato nella barra degli indirizzi del pannello di controllo.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          L&apos;ID messaggio dal segnaposto <Code>%MESSAGE_ID%</Code>, passato tramite l&apos;URL del
          sondaggio al reindirizzamento di fine sondaggio o al webhook. Vedere{' '}
          <a href='/docs/reminders'>Promemoria</a> per la guida completa alla configurazione.
        </dd>
      </dl>

      <p>
        L&apos;endpoint <Code>POST</Code> restituisce <Code>200</Code> in caso di successo e{' '}
        <Code>400</Code> se non viene trovato alcun record di risultato corrispondente per l&apos;ID
        messaggio fornito.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Hook di notifica</h2>
      <p>
        L&apos;hook di notifica invia una notifica push ad hoc immediata ai partecipanti di uno studio —
        senza creare una pianificazione o una riga di coda. Destinato alle notifiche attivate da eventi
        provenienti da sistemi esterni (un avviso REDCap, un evento di sistema di laboratorio, ecc.).
        L&apos;autenticazione utilizza un token di notifica per studio anziché il JWT del ricercatore.
      </p>

      <EndpointGroup title='Notifica ad hoc — autenticazione tramite token'>
        <Method verb='POST' path='/api/notify' desc='Invia una notifica immediata ai partecipanti di uno studio.' />
      </EndpointGroup>

      <p><strong>Corpo della richiesta</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Obbligatorio</th><th>Descrizione</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>sì</td><td>Token di notifica dello studio. Rigenerarlo da Modifica studio → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>sì</td><td>Il MongoDB ID dello studio.</td></tr>
          <tr><td><Code>title</Code></td><td>sì</td><td>Titolo della notifica.</td></tr>
          <tr><td><Code>message</Code></td><td>sì</td><td>Testo del corpo della notifica.</td></tr>
          <tr><td><Code>url</Code></td><td>no</td><td>URL del sondaggio. Supporta gli stessi segnaposto <Code>%TOKEN%</Code> delle notifiche pianificate.</td></tr>
          <tr><td><Code>participantID</Code></td><td>no</td><td>Invia a un partecipante specifico (Samply ID). Omettere per inviare a tutti.</td></tr>
          <tr><td><Code>groupID</Code></td><td>no</td><td>Invia a tutti i membri di un gruppo tranne il partecipante che ha attivato l&apos;evento. Tipicamente usato quando l&apos;azione di un partecipante deve notificare il suo gruppo.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>no</td><td>Scadenza del link in millisecondi dal momento dell&apos;invio.</td></tr>
        </tbody>
      </table>

      <p>
        Se vengono forniti sia <Code>groupID</Code> che <Code>participantID</Code>, Samply invia a
        tutti i membri del gruppo tranne il partecipante specificato. Se viene fornito solo{' '}
        <Code>participantID</Code>, viene notificato solo quel partecipante. Se nessuno dei due viene
        fornito, tutti i partecipanti allo studio ricevono la notifica.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Risposte di errore</h2>
      <table>
        <thead><tr><th>Stato</th><th>Significato</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Successo.</td></tr>
          <tr><td><Code>400</Code></td><td>Richiesta non valida — campi mancanti o non validi, oppure nessuno studio attivo impostato sull&apos;account.</td></tr>
          <tr><td><Code>401</Code></td><td>Intestazione <Code>x-auth-token</Code> mancante o scaduta.</td></tr>
          <tr><td><Code>429</Code></td><td>Limite di frequenza superato. Attendere un momento e riprovare.</td></tr>
          <tr><td><Code>500</Code></td><td>Errore interno del server. Il corpo della risposta contiene la stringa fissa <Code>"Internal server error"</Code>; la diagnostica dettagliata viene registrata solo lato server.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentFr() {
  return (
    <>
      <p>
        Samply expose deux surfaces d'API : une API REST pour la gestion programmatique
        des études (l'<strong>API chercheur</strong>), et deux hooks d'intégration utilisés
        par les outils de sondage pour signaler une complétion et déclencher des notifications
        ad hoc. Les deux fonctionnent sur le même hôte que le tableau de bord.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>URL de base</h2>
      <p>
        L'API REST chercheur est montée sur <Code>/webapi/v1</Code>. Tous les endpoints
        ci-dessous sont relatifs à ce préfixe. Les endpoints de complétion et de notification
        sont montés directement à la racine et sont documentés séparément.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Authentification</h2>
      <p>
        Tous les endpoints de l'API chercheur (sauf l'endpoint de token lui-même) exigent
        un JWT transmis dans l'en-tête de requête <Code>x-auth-token</Code>. Obtenez un
        token en soumettant vos identifiants de chercheur :
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Échanger e-mail + mot de passe contre un JWT.' />
      </EndpointGroup>

      <p><strong>Corps de la requête</strong></p>
      <table>
        <thead><tr><th>Champ</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>E-mail du compte chercheur.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Mot de passe du compte chercheur.</td></tr>
        </tbody>
      </table>

      <p><strong>Réponse</strong></p>
      <table>
        <thead><tr><th>Champ</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT valable 14 jours. Transmettez-le en tant que <Code>x-auth-token</Code> dans les requêtes suivantes.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Limites de débit</h2>
      <p>
        Tous les chemins d'API sont soumis à des limites de débit. Les requêtes dépassant
        une limite reçoivent une réponse <Code>429 Too Many Requests</Code>. Les trois
        niveaux sont :
      </p>
      <table>
        <thead><tr><th>Limite</th><th>Chemins</th></tr></thead>
        <tbody>
          <tr><td>20 requêtes / 15 min</td><td><Code>/webapi/v1/auth</Code>, endpoints de connexion, de création de compte et de réinitialisation de mot de passe</td></tr>
          <tr><td>30 requêtes / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 requêtes / 15 min</td><td>Tous les autres chemins <Code>/api/*</Code> et <Code>/webapi/*</Code></td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>L'étude active</h2>
      <p>
        La plupart des endpoints de l'API chercheur opèrent sur l'<em>étude active</em> —
        une étude unique sélectionnée sur le compte chercheur. Avant d'appeler les endpoints
        de participants, de notifications ou de tâches, sélectionnez l'étude sur laquelle
        vous souhaitez travailler :
      </p>

      <EndpointGroup title="Sélection d'étude">
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc="Lister toutes les études dont vous êtes propriétaire ou membre." />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc="Retourner l'étude active actuelle." />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc="Définir l'étude active." />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc="Obtenir une étude spécifique par son identifiant MongoDB." />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc="Mettre à jour les champs d'une étude." />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> attend <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        dans le corps de la requête. La sélection est stockée sur votre compte chercheur et
        persiste entre les requêtes jusqu'à ce qu'elle soit modifiée.
      </p>

      <p><strong>Corps PATCH</strong> (mettre à jour une étude)</p>
      <p>Seuls les champs suivants sont acceptés ; tous les autres sont ignorés :</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Participants</h2>
      <p>
        Ces endpoints gèrent les participants dans l'étude active. Les participants créés
        via l'API sont initialement désactivés — ils reçoivent un token d'invitation JWT
        qui les active lorsqu'ils ouvrent l'application Samply Research.
      </p>

      <EndpointGroup title='Participants — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc="Lister tous les participants de l'étude active." />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc="Obtenir un participant par Samply ID." />
        <Method verb='POST'   path='/webapi/v1/participants'      desc="Créer et inscrire un participant." />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc="Mettre à jour les champs d'un participant." />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc="Retirer un participant de l'étude." />
      </EndpointGroup>

      <p><strong>Corps POST</strong> (créer un participant)</p>
      <table>
        <thead><tr><th>Champ</th><th>Obligatoire</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>oui</td><td>Nom d'affichage — non visible par les autres participants.</td></tr>
          <tr><td><Code>email</Code></td><td>oui</td><td>E-mail utilisé pour créer le compte Samply.</td></tr>
          <tr><td><Code>code</Code></td><td>non</td><td>Code participant stocké en tant que <Code>username</Code> et disponible via <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>non</td><td>Durée de validité du JWT d'invitation (par ex. <Code>"7d"</Code>). Maximum 30 jours — les valeurs plus élevées sont silencieusement plafonnées.</td></tr>
          <tr><td><Code>information</Code></td><td>non</td><td>Objet JSON libre pour les métadonnées arbitraires du participant.</td></tr>
        </tbody>
      </table>

      <p><strong>Réponse</strong> (créer un participant)</p>
      <table>
        <thead><tr><th>Champ</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>Le Samply ID généré automatiquement pour le nouveau participant.</td></tr>
          <tr><td><Code>token</Code></td><td>Token d'invitation JWT. Transmettez-le au participant ; l'application l'utilise pour activer son compte.</td></tr>
        </tbody>
      </table>

      <p><strong>Corps PATCH</strong> (mettre à jour un participant)</p>
      <table>
        <thead><tr><th>Champ</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Code participant / nom d'affichage.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Booléen — définir à <Code>true</Code> pour arrêter les notifications pour ce participant.</td></tr>
          <tr><td><Code>group</Code></td><td>Chaîne d'affectation au groupe.</td></tr>
        </tbody>
      </table>
      <p>Tous les autres champs envoyés dans le corps sont ignorés.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Plannings (notifications)</h2>
      <p>
        Les endpoints de notifications gèrent les définitions de plannings — les règles
        qui s'étendent en lignes de file d'attente. La création d'un planning via l'API
        déclenche la même expansion de file d'attente que la soumission du formulaire du
        tableau de bord.
      </p>

      <EndpointGroup title='Plannings — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc="Lister toutes les définitions de plannings de l'étude active." />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc="Obtenir une définition de planning." />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc="Créer un planning et l'étendre dans la file d'attente." />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc="Mettre à jour une définition de planning." />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc="Supprimer un planning et annuler ses lignes de file d'attente en attente." />
      </EndpointGroup>

      <p>
        Le corps <Code>POST</Code> reflète les champs du formulaire de planning. La clé de
        routage est la combinaison de <Code>schedule</Code> (<Code>one-time</Code> ou{' '}
        <Code>repeat</Code>) et de <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code> ou <Code>user-specific</Code>), qui correspond aux
        mêmes gestionnaires internes utilisés par le formulaire du tableau de bord.
      </p>

      <p><strong>Corps PATCH</strong> (mettre à jour un planning)</p>
      <p>
        Seuls les champs suivants sont acceptés ; tous les autres sont ignorés :
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>File d'attente (tâches)</h2>
      <p>
        Les endpoints de tâches exposent les lignes individuelles de la file d'attente —
        les envois étendus générés à partir des définitions de plannings.
      </p>

      <EndpointGroup title="Lignes de file d'attente — /webapi/v1/jobs">
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc="Lister toutes les lignes de file d'attente de l'étude active." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc="Lister les lignes de file d'attente pour un planning spécifique." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Obtenir une ligne de file d'attente spécifique." />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Mettre à jour une ligne de file d'attente." />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Supprimer une ligne de file d'attente." />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Callback de complétion</h2>
      <p>
        Ces endpoints sont appelés par les outils de sondage pour enregistrer un completion
        event. En cas de succès, Samply marque le résultat comme complété et annule tous
        les rappels en attente pour cet envoi. Aucune authentification n'est requise —
        l'identifiant de message sert de secret partagé.
      </p>

      <EndpointGroup title='Complétion — aucune authentification requise'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Enregistrer la complétion et afficher une page de confirmation (à utiliser comme redirection de fin de sondage).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Enregistrer la complétion silencieusement (à utiliser comme webhook depuis votre outil de sondage).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>Le slug URL de l'étude affiché dans la barre d'adresse du tableau de bord.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          L'identifiant de message provenant de la variable de substitution <Code>%MESSAGE_ID%</Code>,
          transmis via l'URL de votre sondage à la redirection de fin de sondage ou au webhook. Voir{' '}
          <a href='/docs/reminders'>Rappels</a> pour le guide de configuration complet.
        </dd>
      </dl>

      <p>
        L'endpoint <Code>POST</Code> retourne <Code>200</Code> en cas de succès et{' '}
        <Code>400</Code> si aucun enregistrement de résultat correspondant n'est trouvé
        pour l'identifiant de message donné.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Hook de notification</h2>
      <p>
        Le hook de notification envoie une notification push ad hoc immédiate aux
        participants d'une étude — sans créer de planning ni de ligne de file d'attente.
        Destiné aux notifications déclenchées par des événements provenant de systèmes
        externes (une alerte REDCap, un événement de système de laboratoire, etc.).
        L'authentification utilise un token de notification propre à l'étude plutôt que
        le JWT du chercheur.
      </p>

      <EndpointGroup title='Notification ad hoc — authentification par token'>
        <Method verb='POST' path='/api/notify' desc="Envoyer une notification immédiate aux participants d'une étude." />
      </EndpointGroup>

      <p><strong>Corps de la requête</strong></p>
      <table>
        <thead><tr><th>Champ</th><th>Obligatoire</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>oui</td><td>Token de notification de l'étude. Régénérez-le depuis Modifier l'étude → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>oui</td><td>L'identifiant MongoDB de l'étude.</td></tr>
          <tr><td><Code>title</Code></td><td>oui</td><td>Titre de la notification.</td></tr>
          <tr><td><Code>message</Code></td><td>oui</td><td>Texte du corps de la notification.</td></tr>
          <tr><td><Code>url</Code></td><td>non</td><td>URL du sondage. Prend en charge les mêmes variables de substitution <Code>%TOKEN%</Code> que les notifications planifiées.</td></tr>
          <tr><td><Code>participantID</Code></td><td>non</td><td>Envoyer à un participant spécifique (Samply ID). Omettre pour envoyer à tous.</td></tr>
          <tr><td><Code>groupID</Code></td><td>non</td><td>Envoyer à tous les membres d'un groupe sauf le participant déclencheur. Généralement utilisé lorsque l'action d'un participant doit notifier son groupe.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>non</td><td>Expiration du lien en millisecondes à partir du moment de l'envoi.</td></tr>
        </tbody>
      </table>

      <p>
        Si <Code>groupID</Code> et <Code>participantID</Code> sont tous deux fournis,
        Samply envoie à tous les membres du groupe sauf le participant nommé. Si seulement{' '}
        <Code>participantID</Code> est fourni, seul ce participant est notifié. Si aucun
        des deux n'est fourni, tous les participants de l'étude reçoivent la notification.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Réponses d'erreur</h2>
      <table>
        <thead><tr><th>Statut</th><th>Signification</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Succès.</td></tr>
          <tr><td><Code>400</Code></td><td>Requête incorrecte — champs manquants ou invalides, ou aucune étude active définie sur le compte.</td></tr>
          <tr><td><Code>401</Code></td><td>En-tête <Code>x-auth-token</Code> manquant ou expiré.</td></tr>
          <tr><td><Code>429</Code></td><td>Limite de débit dépassée. Attendez un moment avant de réessayer.</td></tr>
          <tr><td><Code>500</Code></td><td>Erreur interne du serveur. Le corps de la réponse contient la chaîne fixe <Code>"Internal server error"</Code> ; les diagnostics détaillés sont enregistrés uniquement côté serveur.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentEs() {
  return (
    <>
      <p>
        Samply expone dos superficies de API: una API REST para la gestión programática
        de estudios (la <strong>API del investigador</strong>), y dos hooks de integración utilizados
        por las herramientas de encuesta para señalar una finalización y disparar notificaciones
        ad hoc. Ambas funcionan en el mismo host que el panel.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>URL base</h2>
      <p>
        La API REST del investigador está montada en <Code>/webapi/v1</Code>. Todos los endpoints
        que aparecen a continuación son relativos a ese prefijo. Los endpoints de finalización y
        notificación están montados directamente en la raíz y se documentan por separado.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Autenticación</h2>
      <p>
        Todos los endpoints de la API del investigador (excepto el propio endpoint de token) requieren
        un JWT transmitido en la cabecera de solicitud <Code>x-auth-token</Code>. Obtenga un
        token enviando sus credenciales de investigador:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Intercambiar correo electrónico + contraseña por un JWT.' />
      </EndpointGroup>

      <p><strong>Cuerpo de la solicitud</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>Correo electrónico de la cuenta del investigador.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Contraseña de la cuenta del investigador.</td></tr>
        </tbody>
      </table>

      <p><strong>Respuesta</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT válido durante 14 días. Páselo como <Code>x-auth-token</Code> en las solicitudes posteriores.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Límites de velocidad</h2>
      <p>
        Todas las rutas de la API están sujetas a límites de velocidad. Las solicitudes que superan
        un límite reciben una respuesta <Code>429 Too Many Requests</Code>. Los tres
        niveles son:
      </p>
      <table>
        <thead><tr><th>Límite</th><th>Rutas</th></tr></thead>
        <tbody>
          <tr><td>20 solicitudes / 15 min</td><td><Code>/webapi/v1/auth</Code>, endpoints de inicio de sesión, creación de cuenta y restablecimiento de contraseña</td></tr>
          <tr><td>30 solicitudes / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 solicitudes / 15 min</td><td>Todas las demás rutas <Code>/api/*</Code> y <Code>/webapi/*</Code></td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>El estudio activo</h2>
      <p>
        La mayoría de los endpoints de la API del investigador operan sobre el <em>estudio activo</em> —
        un único estudio seleccionado en la cuenta del investigador. Antes de llamar a los endpoints
        de participantes, notificaciones o tareas, seleccione el estudio con el que desea trabajar:
      </p>

      <EndpointGroup title="Selección de estudio">
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc="Listar todos los estudios de los que es propietario o miembro." />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc="Devolver el estudio activo actual." />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc="Establecer el estudio activo." />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc="Obtener un estudio específico por su ID de MongoDB." />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc="Actualizar campos de un estudio." />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> espera <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        en el cuerpo de la solicitud. La selección se almacena en su cuenta de investigador y
        persiste entre solicitudes hasta que se modifique.
      </p>

      <p><strong>Cuerpo PATCH</strong> (actualizar estudio)</p>
      <p>Solo se aceptan los siguientes campos; todos los demás se ignoran:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Participantes</h2>
      <p>
        Estos endpoints gestionan los participantes del estudio activo. Los participantes creados
        a través de la API están inicialmente desactivados — reciben un token de invitación JWT
        que los activa cuando abren la aplicación Samply Research.
      </p>

      <EndpointGroup title='Participantes — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc="Listar todos los participantes del estudio activo." />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc="Obtener un participante por Samply ID." />
        <Method verb='POST'   path='/webapi/v1/participants'      desc="Crear e inscribir un participante." />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc="Actualizar campos del participante." />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc="Eliminar un participante del estudio." />
      </EndpointGroup>

      <p><strong>Cuerpo POST</strong> (crear participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Obligatorio</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>sí</td><td>Nombre para mostrar — no es visible para otros participantes.</td></tr>
          <tr><td><Code>email</Code></td><td>sí</td><td>Correo electrónico usado para crear la cuenta de Samply.</td></tr>
          <tr><td><Code>code</Code></td><td>no</td><td>Código del participante almacenado como <Code>username</Code> y disponible mediante <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>no</td><td>Tiempo de validez del JWT de invitación (p. ej. <Code>"7d"</Code>). Máximo 30 días — los valores mayores se limitan silenciosamente.</td></tr>
          <tr><td><Code>information</Code></td><td>no</td><td>Objeto JSON libre para metadatos arbitrarios del participante.</td></tr>
        </tbody>
      </table>

      <p><strong>Respuesta</strong> (crear participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>El Samply ID generado automáticamente para el nuevo participante.</td></tr>
          <tr><td><Code>token</Code></td><td>Token de invitación JWT. Envíeselo al participante; la aplicación lo usa para activar su cuenta.</td></tr>
        </tbody>
      </table>

      <p><strong>Cuerpo PATCH</strong> (actualizar participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Código del participante / nombre para mostrar.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Booleano — establézcalo en <Code>true</Code> para detener las notificaciones de este participante.</td></tr>
          <tr><td><Code>group</Code></td><td>Cadena de asignación de grupo.</td></tr>
        </tbody>
      </table>
      <p>Todos los demás campos enviados en el cuerpo se ignoran.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Calendarios (notificaciones)</h2>
      <p>
        Los endpoints de notificaciones gestionan las definiciones de calendarios — las reglas
        que se expanden en filas de cola. Crear un calendario mediante la API dispara la misma
        expansión de cola que al enviar el formulario del panel.
      </p>

      <EndpointGroup title='Calendarios — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc="Listar todas las definiciones de calendarios del estudio activo." />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc="Obtener una definición de calendario." />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc="Crear un calendario y expandirlo en la cola." />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc="Actualizar una definición de calendario." />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc="Eliminar un calendario y cancelar sus filas de cola pendientes." />
      </EndpointGroup>

      <p>
        El cuerpo <Code>POST</Code> refleja los campos del formulario de calendario. La clave de
        enrutamiento es la combinación de <Code>schedule</Code> (<Code>one-time</Code> o{' '}
        <Code>repeat</Code>) y <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code> o <Code>user-specific</Code>), que corresponde a los
        mismos manejadores internos utilizados por el formulario del panel.
      </p>

      <p><strong>Cuerpo PATCH</strong> (actualizar calendario)</p>
      <p>
        Solo se aceptan los siguientes campos; todos los demás se ignoran:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Cola (tareas)</h2>
      <p>
        Los endpoints de tareas exponen las filas individuales de la cola —
        los envíos expandidos generados a partir de las definiciones de calendarios.
      </p>

      <EndpointGroup title="Filas de cola — /webapi/v1/jobs">
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc="Listar todas las filas de cola del estudio activo." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc="Listar las filas de cola de un calendario específico." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Obtener una fila de cola específica." />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Actualizar una fila de cola." />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Eliminar una fila de cola." />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Callback de finalización</h2>
      <p>
        Estos endpoints son llamados por las herramientas de encuesta para registrar un evento
        de finalización. En caso de éxito, Samply marca el resultado como completado y cancela todos
        los recordatorios pendientes para ese envío. No se requiere autenticación —
        el identificador de mensaje actúa como secreto compartido.
      </p>

      <EndpointGroup title='Finalización — sin autenticación requerida'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Registrar la finalización y mostrar una página de confirmación (úselo como redirección al final de la encuesta).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Registrar la finalización silenciosamente (úselo como webhook desde su herramienta de encuesta).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>El slug de URL del estudio que aparece en la barra de direcciones del panel.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          El identificador de mensaje proveniente del marcador de posición <Code>%MESSAGE_ID%</Code>,
          transmitido a través de la URL de su encuesta a la redirección de fin de encuesta o al webhook. Consulte{' '}
          <a href='/docs/reminders'>Recordatorios</a> para ver la guía de configuración completa.
        </dd>
      </dl>

      <p>
        El endpoint <Code>POST</Code> devuelve <Code>200</Code> en caso de éxito y{' '}
        <Code>400</Code> si no se encuentra ningún registro de resultado coincidente
        para el identificador de mensaje dado.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Hook de notificación</h2>
      <p>
        El hook de notificación envía una notificación push ad hoc inmediata a los
        participantes de un estudio — sin crear un calendario ni una fila de cola.
        Pensado para notificaciones disparadas por eventos de sistemas externos (una alerta de REDCap,
        un evento de sistema de laboratorio, etc.).
        La autenticación usa un token de notificación específico del estudio en lugar del JWT del investigador.
      </p>

      <EndpointGroup title='Notificación ad hoc — autenticación por token'>
        <Method verb='POST' path='/api/notify' desc="Enviar una notificación inmediata a los participantes de un estudio." />
      </EndpointGroup>

      <p><strong>Cuerpo de la solicitud</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Obligatorio</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>sí</td><td>Token de notificación del estudio. Regénérelo desde Editar estudio → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>sí</td><td>El ID de MongoDB del estudio.</td></tr>
          <tr><td><Code>title</Code></td><td>sí</td><td>Título de la notificación.</td></tr>
          <tr><td><Code>message</Code></td><td>sí</td><td>Texto del cuerpo de la notificación.</td></tr>
          <tr><td><Code>url</Code></td><td>no</td><td>URL de la encuesta. Admite los mismos marcadores de posición <Code>%TOKEN%</Code> que las notificaciones programadas.</td></tr>
          <tr><td><Code>participantID</Code></td><td>no</td><td>Enviar a un participante específico (Samply ID). Omítalo para enviar a todos.</td></tr>
          <tr><td><Code>groupID</Code></td><td>no</td><td>Enviar a todos los miembros de un grupo excepto al participante disparador. Se usa normalmente cuando la acción de un participante debe notificar a su grupo.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>no</td><td>Caducidad del enlace en milisegundos desde el momento del envío.</td></tr>
        </tbody>
      </table>

      <p>
        Si se proporcionan tanto <Code>groupID</Code> como <Code>participantID</Code>, Samply
        envía a todos los miembros del grupo excepto al participante indicado. Si solo se proporciona{' '}
        <Code>participantID</Code>, únicamente ese participante recibe la notificación. Si no se
        proporciona ninguno, todos los participantes del estudio reciben la notificación.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Respuestas de error</h2>
      <table>
        <thead><tr><th>Estado</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Éxito.</td></tr>
          <tr><td><Code>400</Code></td><td>Solicitud incorrecta — campos faltantes o inválidos, o ningún estudio activo establecido en la cuenta.</td></tr>
          <tr><td><Code>401</Code></td><td>Cabecera <Code>x-auth-token</Code> faltante o caducada.</td></tr>
          <tr><td><Code>429</Code></td><td>Límite de velocidad superado. Espere un momento y vuelva a intentarlo.</td></tr>
          <tr><td><Code>500</Code></td><td>Error interno del servidor. El cuerpo de la respuesta contiene la cadena fija <Code>"Internal server error"</Code>; los diagnósticos detallados se registran únicamente en el servidor.</td></tr>
        </tbody>
      </table>
    </>
  );
}

function ApiContentPt() {
  return (
    <>
      <p>
        O Samply expõe duas superfícies de API: uma API REST para o gerenciamento programático
        de estudos (a <strong>API do pesquisador</strong>), e dois hooks de integração utilizados
        pelas ferramentas de pesquisa para sinalizar uma conclusão e disparar notificações
        ad hoc. Ambas funcionam no mesmo host que o painel.
      </p>

      {/* ── Base URL ──────────────────────────────────────────────────────── */}
      <h2>URL base</h2>
      <p>
        A API REST do pesquisador está montada em <Code>/webapi/v1</Code>. Todos os endpoints
        listados abaixo são relativos a esse prefixo. Os endpoints de conclusão e
        notificação estão montados diretamente na raiz e são documentados separadamente.
      </p>

      {/* ── Authentication ────────────────────────────────────────────────── */}
      <h2>Autenticação</h2>
      <p>
        Todos os endpoints da API do pesquisador (exceto o próprio endpoint de token) requerem
        um JWT transmitido no cabeçalho de requisição <Code>x-auth-token</Code>. Obtenha um
        token enviando suas credenciais de pesquisador:
      </p>

      <EndpointGroup title='Token'>
        <Method verb='POST' path='/webapi/v1/auth' desc='Trocar e-mail + senha por um JWT.' />
      </EndpointGroup>

      <p><strong>Corpo da requisição</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>email</Code></td><td>string</td><td>E-mail da conta do pesquisador.</td></tr>
          <tr><td><Code>password</Code></td><td>string</td><td>Senha da conta do pesquisador.</td></tr>
        </tbody>
      </table>

      <p><strong>Resposta</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>JWT válido por 14 dias. Passe-o como <Code>x-auth-token</Code> nas requisições subsequentes.</td></tr>
        </tbody>
      </table>

      {/* ── Rate limits ───────────────────────────────────────────────────── */}
      <h2>Limites de taxa</h2>
      <p>
        Todos os caminhos da API estão sujeitos a limites de taxa. As requisições que excedem
        um limite recebem uma resposta <Code>429 Too Many Requests</Code>. Os três
        níveis são:
      </p>
      <table>
        <thead><tr><th>Limite</th><th>Caminhos</th></tr></thead>
        <tbody>
          <tr><td>20 requisições / 15 min</td><td><Code>/webapi/v1/auth</Code>, endpoints de login, criação de conta e redefinição de senha</td></tr>
          <tr><td>30 requisições / 1 min</td><td><Code>/api/notify</Code></td></tr>
          <tr><td>100 requisições / 15 min</td><td>Todos os outros caminhos <Code>/api/*</Code> e <Code>/webapi/*</Code></td></tr>
        </tbody>
      </table>

      {/* ── Active study concept ──────────────────────────────────────────── */}
      <h2>O estudo ativo</h2>
      <p>
        A maioria dos endpoints da API do pesquisador opera sobre o <em>estudo ativo</em> —
        um único estudo selecionado na conta do pesquisador. Antes de chamar os endpoints
        de participantes, notificações ou tarefas, selecione o estudo com o qual deseja trabalhar:
      </p>

      <EndpointGroup title="Seleção de estudo">
        <Method verb='GET'  path='/webapi/v1/auth/studies'          desc="Listar todos os estudos dos quais você é proprietário ou membro." />
        <Method verb='GET'  path='/webapi/v1/auth/studies/selected'  desc="Retornar o estudo ativo atual." />
        <Method verb='POST' path='/webapi/v1/auth/select/study'      desc="Definir o estudo ativo." />
        <Method verb='GET'  path='/webapi/v1/auth/study/:id'         desc="Obter um estudo específico pelo seu ID do MongoDB." />
        <Method verb='PATCH' path='/webapi/v1/auth/study/:id'        desc="Atualizar campos de um estudo." />
      </EndpointGroup>

      <p>
        <Code>POST /webapi/v1/auth/select/study</Code> espera <Code>{'{ "id": "<study_id>" }'}</Code>{' '}
        no corpo da requisição. A seleção é armazenada na sua conta de pesquisador e
        persiste entre requisições até ser modificada.
      </p>

      <p><strong>Corpo PATCH</strong> (atualizar estudo)</p>
      <p>Somente os seguintes campos são aceitos; todos os outros são ignorados:</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        name, description, currentlyActive, public, welcomeMessage, codeMessage,
        groupMessage, messageAfterJoin, completionMessage, geofencingInstruction, settings
      </p>

      {/* ── Participants ──────────────────────────────────────────────────── */}
      <h2>Participantes</h2>
      <p>
        Esses endpoints gerenciam os participantes do estudo ativo. Os participantes criados
        via API estão inicialmente desativados — eles recebem um token de convite JWT
        que os ativa quando abrem o aplicativo Samply Research.
      </p>

      <EndpointGroup title='Participantes — /webapi/v1/participants'>
        <Method verb='GET'    path='/webapi/v1/participants'      desc="Listar todos os participantes do estudo ativo." />
        <Method verb='GET'    path='/webapi/v1/participants/:id'  desc="Obter um participante pelo Samply ID." />
        <Method verb='POST'   path='/webapi/v1/participants'      desc="Criar e inscrever um participante." />
        <Method verb='PATCH'  path='/webapi/v1/participants/:id'  desc="Atualizar campos do participante." />
        <Method verb='DELETE' path='/webapi/v1/participants/:id'  desc="Remover um participante do estudo." />
      </EndpointGroup>

      <p><strong>Corpo POST</strong> (criar participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Obrigatório</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>name</Code></td><td>sim</td><td>Nome de exibição — não é visível para outros participantes.</td></tr>
          <tr><td><Code>email</Code></td><td>sim</td><td>E-mail usado para criar a conta no Samply.</td></tr>
          <tr><td><Code>code</Code></td><td>não</td><td>Código do participante armazenado como <Code>username</Code> e disponível via <Code>%PARTICIPANT_CODE%</Code>.</td></tr>
          <tr><td><Code>expiresIn</Code></td><td>não</td><td>Tempo de validade do JWT de convite (ex.: <Code>"7d"</Code>). Máximo 30 dias — valores maiores são silenciosamente limitados.</td></tr>
          <tr><td><Code>information</Code></td><td>não</td><td>Objeto JSON livre para metadados arbitrários do participante.</td></tr>
        </tbody>
      </table>

      <p><strong>Resposta</strong> (criar participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>samplyid</Code></td><td>O Samply ID gerado automaticamente para o novo participante.</td></tr>
          <tr><td><Code>token</Code></td><td>Token de convite JWT. Envie-o ao participante; o aplicativo o usa para ativar a conta.</td></tr>
        </tbody>
      </table>

      <p><strong>Corpo PATCH</strong> (atualizar participante)</p>
      <table>
        <thead><tr><th>Campo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>username</Code></td><td>Código do participante / nome de exibição.</td></tr>
          <tr><td><Code>deactivated</Code></td><td>Booleano — defina como <Code>true</Code> para interromper as notificações deste participante.</td></tr>
          <tr><td><Code>group</Code></td><td>String de atribuição de grupo.</td></tr>
        </tbody>
      </table>
      <p>Todos os outros campos enviados no corpo são ignorados.</p>

      {/* ── Notifications ─────────────────────────────────────────────────── */}
      <h2>Calendários (notificações)</h2>
      <p>
        Os endpoints de notificações gerenciam as definições de calendários — as regras
        que se expandem em linhas de fila. Criar um calendário via API aciona a mesma
        expansão de fila que ao enviar o formulário do painel.
      </p>

      <EndpointGroup title='Calendários — /webapi/v1/notifications'>
        <Method verb='GET'    path='/webapi/v1/notifications'      desc="Listar todas as definições de calendários do estudo ativo." />
        <Method verb='GET'    path='/webapi/v1/notifications/:id'  desc="Obter uma definição de calendário." />
        <Method verb='POST'   path='/webapi/v1/notifications'      desc="Criar um calendário e expandi-lo na fila." />
        <Method verb='PATCH'  path='/webapi/v1/notifications/:id'  desc="Atualizar uma definição de calendário." />
        <Method verb='DELETE' path='/webapi/v1/notifications/:id'  desc="Excluir um calendário e cancelar suas linhas de fila pendentes." />
      </EndpointGroup>

      <p>
        O corpo <Code>POST</Code> reflete os campos do formulário de calendário. A chave de
        roteamento é a combinação de <Code>schedule</Code> (<Code>one-time</Code> ou{' '}
        <Code>repeat</Code>) e <Code>target</Code> (<Code>fixed-times</Code>,{' '}
        <Code>fixed-intervals</Code> ou <Code>user-specific</Code>), que corresponde aos
        mesmos manipuladores internos utilizados pelo formulário do painel.
      </p>

      <p><strong>Corpo PATCH</strong> (atualizar calendário)</p>
      <p>
        Somente os seguintes campos são aceitos; todos os outros são ignorados:
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
        title, message, url, schedule, target, randomize, startDate, endDate, startTime,
        endTime, interval, intervalMax, timezone, expireIn, reminders, userid, groupid
      </p>

      {/* ── Jobs ──────────────────────────────────────────────────────────── */}
      <h2>Fila (tarefas)</h2>
      <p>
        Os endpoints de tarefas expõem as linhas individuais da fila —
        os envios expandidos gerados a partir das definições de calendários.
      </p>

      <EndpointGroup title="Linhas de fila — /webapi/v1/jobs">
        <Method verb='GET'    path='/webapi/v1/jobs'                              desc="Listar todas as linhas de fila do estudo ativo." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid'              desc="Listar as linhas de fila de um calendário específico." />
        <Method verb='GET'    path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Obter uma linha de fila específica." />
        <Method verb='PATCH'  path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Atualizar uma linha de fila." />
        <Method verb='DELETE' path='/webapi/v1/jobs/:notificationid/:jobid'       desc="Excluir uma linha de fila." />
      </EndpointGroup>

      {/* ── Completion ────────────────────────────────────────────────────── */}
      <h2>Callback de conclusão</h2>
      <p>
        Esses endpoints são chamados pelas ferramentas de pesquisa para registrar um evento
        de conclusão. Em caso de sucesso, o Samply marca o resultado como concluído e cancela todos
        os lembretes pendentes para esse envio. Nenhuma autenticação é necessária —
        o identificador de mensagem atua como segredo compartilhado.
      </p>

      <EndpointGroup title='Conclusão — sem autenticação necessária'>
        <Method verb='GET'  path='/studies/:study/done/:messageid' desc='Registrar a conclusão e exibir uma página de confirmação (use como redirecionamento ao final da pesquisa).' />
        <Method verb='POST' path='/studies/:study/done/:messageid' desc='Registrar a conclusão silenciosamente (use como webhook da sua ferramenta de pesquisa).' />
      </EndpointGroup>

      <dl>
        <dt><Code>:study</Code></dt>
        <dd>O slug de URL do estudo exibido na barra de endereços do painel.</dd>
        <dt><Code>:messageid</Code></dt>
        <dd>
          O identificador de mensagem proveniente do marcador de posição <Code>%MESSAGE_ID%</Code>,
          transmitido pela URL da sua pesquisa ao redirecionamento de fim de pesquisa ou ao webhook. Consulte{' '}
          <a href='/docs/reminders'>Lembretes</a> para ver o guia de configuração completo.
        </dd>
      </dl>

      <p>
        O endpoint <Code>POST</Code> retorna <Code>200</Code> em caso de sucesso e{' '}
        <Code>400</Code> se nenhum registro de resultado correspondente for encontrado
        para o identificador de mensagem fornecido.
      </p>

      {/* ── Notify hook ───────────────────────────────────────────────────── */}
      <h2>Hook de notificação</h2>
      <p>
        O hook de notificação envia uma notificação push ad hoc imediata aos
        participantes de um estudo — sem criar um calendário nem uma linha de fila.
        Destinado a notificações disparadas por eventos de sistemas externos (um alerta do REDCap,
        um evento de sistema de laboratório, etc.).
        A autenticação usa um token de notificação específico do estudo em vez do JWT do pesquisador.
      </p>

      <EndpointGroup title='Notificação ad hoc — autenticação por token'>
        <Method verb='POST' path='/api/notify' desc="Enviar uma notificação imediata aos participantes de um estudo." />
      </EndpointGroup>

      <p><strong>Corpo da requisição</strong></p>
      <table>
        <thead><tr><th>Campo</th><th>Obrigatório</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><Code>token</Code></td><td>sim</td><td>Token de notificação do estudo. Regenere-o em Editar estudo → Notify token.</td></tr>
          <tr><td><Code>projectID</Code></td><td>sim</td><td>O ID do MongoDB do estudo.</td></tr>
          <tr><td><Code>title</Code></td><td>sim</td><td>Título da notificação.</td></tr>
          <tr><td><Code>message</Code></td><td>sim</td><td>Texto do corpo da notificação.</td></tr>
          <tr><td><Code>url</Code></td><td>não</td><td>URL da pesquisa. Suporta os mesmos marcadores de posição <Code>%TOKEN%</Code> que as notificações agendadas.</td></tr>
          <tr><td><Code>participantID</Code></td><td>não</td><td>Enviar a um participante específico (Samply ID). Omita para enviar a todos.</td></tr>
          <tr><td><Code>groupID</Code></td><td>não</td><td>Enviar a todos os membros de um grupo exceto ao participante gatilho. Normalmente usado quando a ação de um participante deve notificar seu grupo.</td></tr>
          <tr><td><Code>expireIn</Code></td><td>não</td><td>Expiração do link em milissegundos a partir do momento do envio.</td></tr>
        </tbody>
      </table>

      <p>
        Se tanto <Code>groupID</Code> quanto <Code>participantID</Code> forem fornecidos, o Samply
        envia a todos os membros do grupo exceto ao participante indicado. Se apenas{' '}
        <Code>participantID</Code> for fornecido, somente esse participante recebe a notificação. Se nenhum
        for fornecido, todos os participantes do estudo recebem a notificação.
      </p>

      {/* ── Errors ────────────────────────────────────────────────────────── */}
      <h2>Respostas de erro</h2>
      <table>
        <thead><tr><th>Status</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><Code>200</Code></td><td>Sucesso.</td></tr>
          <tr><td><Code>400</Code></td><td>Requisição inválida — campos ausentes ou inválidos, ou nenhum estudo ativo definido na conta.</td></tr>
          <tr><td><Code>401</Code></td><td>Cabeçalho <Code>x-auth-token</Code> ausente ou expirado.</td></tr>
          <tr><td><Code>429</Code></td><td>Limite de taxa excedido. Aguarde um momento e tente novamente.</td></tr>
          <tr><td><Code>500</Code></td><td>Erro interno do servidor. O corpo da resposta contém a string fixa <Code>"Internal server error"</Code>; os diagnósticos detalhados são registrados apenas no servidor.</td></tr>
        </tbody>
      </table>
    </>
  );
}
