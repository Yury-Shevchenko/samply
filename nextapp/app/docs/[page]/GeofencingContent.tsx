import type { Locale } from "@/lib/i18n";

export default function GeofencingContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <GeofencingContentDe />;
  if (locale === "nl") return <GeofencingContentNl />;
  if (locale === "ru") return <GeofencingContentRu />;
  if (locale === "zh") return <GeofencingContentZh />;
  if (locale === "ko") return <GeofencingContentKo />;
  if (locale === "it") return <GeofencingContentIt />;
  if (locale === "fr") return <GeofencingContentFr />;
  if (locale === "es") return <GeofencingContentEs />;
  if (locale === "pt") return <GeofencingContentPt />;
  return <GeofencingContentEn />;
}

function GeofencingContentZh() {
  return (
    <>
      <p>
        地理围栏让 Samply 能够在参与者进入或离开定义的地理区域时——工作场所、超市、
        住宅区——自动发送通知并打开问卷。触发器是位置事件本身，而不是时钟时间。
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Samply 地理围栏的实现在 <em>Behavior Research Methods</em> 期刊的同行评审文章中有描述和实证验证：
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          三项使用 Samply 应用的对照研究在 360 次围栏穿越中获得了总体通知灵敏度{' '}
          <strong style={{ color: 'var(--ink)' }}>82.5%</strong>。该文章提供了关于半径选择、
          平台差异和环境因素的实证指导——以下建议均来自该研究成果。
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>地理围栏的工作原理</h2>
      <p>
        参与者加入启用了地理围栏的研究后，Samply Research 应用会在设备上注册地理围栏区域，
        并开始在后台监控位置——即使应用已关闭。当设备检测到参与者已进入或退出某个区域时，
        应用会触发本地通知，并在研究历史中记录一个 <strong>geofencing-event</strong>。
      </p>
      <p>
        位置处理完全在参与者设备上进行。Samply 从不接收原始 GPS 坐标。服务器只记录发生了地理围栏事件
        （进入或退出）以及时间戳。研究人员可以在历史日志中看到该事件，但看不到绝对位置。
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>启用地理围栏</h2>
      <p>
        打开<strong>编辑研究</strong>并切换<strong>启用地理围栏</strong>。
        将出现两个配置面板：一个用于研究者定义的位置，一个用于参与者定义的位置。
        您可以使用其中一个或两个。
      </p>
      <p>
        保存前，请填写<strong>地理围栏说明</strong>字段。此文本在参与者加入研究时向其显示，
        解释为什么需要持续位置跟踪以及您将如何使用数据。
        地理围栏工作需要参与者向 Samply Research 应用授予后台位置权限。
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>研究者定义的位置</h2>
      <p>
        由您自行输入位置——它们对所有参与者同等适用。对于每个位置，请提供：
      </p>
      <dl>
        <dt>纬度和经度</dt>
        <dd>
          地理围栏区域的中心。保存后，地图上会出现标记，可以拖动以直观地调整位置。
        </dd>
        <dt>半径（米）</dt>
        <dd>
          围绕中心点的圆形边界。当参与者的设备 GPS 将其定位在距中心点此距离范围内时，
          会触发该区域。
        </dd>
        <dt>退出区域大小（米）</dt>
        <dd>
          用于检测退出的单独的、通常更大的半径。将退出区域设置得比进入区域更大，
          可以减少由边界处 GPS 漂移引起的虚假退出事件。
        </dd>
        <dt>最小时间窗口（分钟）</dt>
        <dd>
          来自此区域的两条通知之间的最小间隔。防止参与者在边界附近徘徊且 GPS 信号振荡时重复触发。
        </dd>
        <dt>进入时触发 / 退出时触发</dt>
        <dd>选择哪个穿越方向触发通知。您可以同时启用两者。</dd>
        <dt>隐藏通知但记录事件</dt>
        <dd>
          不发送可见通知，但仍向历史记录写入 geofencing-event。
          当您希望进行被动位置事件记录而不打扰参与者时使用此选项。
        </dd>
      </dl>
      <p>
        所有研究者定义的位置共享相同的通知内容：标题、消息正文和问卷 URL
        （在编辑研究的地理围栏部分中配置）。支持 URL 占位符——
        完整的令牌列表请参阅 <a href='/docs/placeholders'>URL 占位符</a>。
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>参与者定义的位置</h2>
      <p>
        您可以让参与者在 Samply Research 应用中直接输入自己的位置——例如家庭地址或工作地点——
        而不是自己指定区域。在编辑研究中启用参与者定义的位置，并提供默认半径和问卷 URL。
      </p>
      <p>
        每位参与者定义的区域是私密的，仅属于他们自己。这些区域在其设备上注册，
        从不传输到 Samply 服务器。这适用于目标位置具有个人性质且因参与者而异的研究
        （例如"您的家"、"您常去的超市"）。
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>隐私与同意</h2>
      <p>
        在 iOS 和 Android 上，后台位置跟踪是一项敏感权限。您必须在地理围栏说明字段中向参与者说明
        您收集哪些位置数据、原因及保留时间。此说明在研究注册时显示——请将其视为知情同意披露。
      </p>
      <p>
        主要隐私特性：
      </p>
      <ul>
        <li>Samply 不存储 GPS 坐标。只有进入/退出事件和时间戳会到达服务器。</li>
        <li>参与者可以在不退出研究的情况下，从应用内禁用特定研究的位置跟踪。</li>
        <li>参与者可以通过在手机设置中禁用 Samply Research 应用的位置权限来停止所有位置跟踪。</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>历史中的地理围栏事件</h2>
      <p>
        每次地理围栏触发都会写入一条事件状态为 <strong>geofencing-event</strong>
        且包含穿越时间戳的结果记录。这些记录与计划通知结果一起出现在研究历史日志中，
        可在 CSV 导出中下载。导出在与通知接收和点击事件相同的按事件列中包含地理围栏事件时间戳。
      </p>
      <p>
        如果您为地理围栏区域附加了问卷 URL，该 URL 会与事件一起记录在结果中——
        这为您提供了位置触发器与任何后续问卷完成之间的链接
        （通过<a href='/docs/reminders'>完成回调</a>机制）。
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>实证指导</h2>
      <p>
        以下建议基于{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>{' '}
        的研究结论，该研究在三项对照研究中对 Samply 地理围栏进行了 360 次围栏穿越的验证。
      </p>
      <dl>
        <dt>使用至少 100 米的半径</dt>
        <dd>
          10 米的半径在 Android 上导致频繁漏报，在 iOS 上导致误报。在 100 米时，
          两个平台的灵敏度趋于稳定。较小的半径只在具有良好 GPS 信号的开阔环境中可靠。
        </dd>
        <dt>iOS 优于 Android——请相应规划</dt>
        <dd>
          iOS 设备显示出更高的总体灵敏度；Android 通知往往在更靠近围栏边界时到达
          （设备穿越得更远才会触发）。如果您的研究人群是混合的，请将平台作为协变量报告，
          并考虑对分析进行分层。
        </dd>
        <dt>进入和退出事件的行为不同</dt>
        <dd>
          退出通知的到达距离明显远于进入通知——在研究中平均为 234 米对 87 米。
          如果您的设计依赖于精确捕获退出时刻，请设置更大的退出区域半径，
          并对退出事件时间戳给予更大的容差。
        </dd>
        <dt>停留时间很重要</dt>
        <dd>
          在某地点停留至少 5 分钟的参与者比短暂经过的参与者显示出明显更高的灵敏度。
          对于短暂暴露（例如公交站），预期会有较低的检测率。
        </dd>
        <dt>森林和低连接性环境会降低灵敏度</dt>
        <dd>
          互联网连接较差的区域（密林、地下空间、信号弱的农村地区）会显著降低灵敏度。
          该应用依赖网络辅助 GPS 进行区域检测；没有连接时，事件可能会延迟或完全错过。
          请在研究协议中披露此限制。
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>注意事项</h3>
      <dl>
        <dt>参与者必须重新加入才能获取区域变更</dt>
        <dd>
          地理围栏区域在参与者加入研究时注册在设备上。如果在参与者已注册后在编辑研究中
          添加或修改区域，他们在退出并重新加入研究之前不会收到更新的区域。
        </dd>
        <dt>GPS 精度限制有效半径</dt>
        <dd>
          城市 GPS 精度通常为 5–20 米；室内或密集区域可能超过 50 米。
          将半径设置得大于所需精度以避免错过触发。退出区域设置可以补偿边界振荡。
        </dd>
        <dt>后台位置权限可能被撤销</dt>
        <dd>
          iOS 和 Android 可能随时撤销后台位置权限——在操作系统更新后、设备重启后，
          或用户更改应用设置时。当权限缺失时，地理围栏会静默停止工作。
          请在研究说明中提醒参与者保持后台位置启用。
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentEn() {
  return (
    <>
      <p>
        Geofencing lets Samply send a notification and open a survey automatically when a
        participant enters or leaves a defined geographic area — a workplace, a supermarket,
        a home neighbourhood. The trigger is the location event itself, not a clock time.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          The Samply geofencing implementation is described and empirically validated in a peer-reviewed article in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Three controlled studies using the Samply app yielded an overall notification sensitivity of <strong style={{ color: 'var(--ink)' }}>82.5%</strong> across 360 fence crossings. The article provides empirical guidance on radius selection, platform differences, and environmental factors — the recommendations below are drawn from this work.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>How geofencing works</h2>
      <p>
        Once a participant joins a study with geofencing enabled, the Samply Research app
        registers the geofenced zones on the device and begins monitoring location in the
        background — even when the app is closed. When the device detects that the
        participant has entered or exited a zone, the app fires a local notification and
        records a <strong>geofencing-event</strong> in the study history.
      </p>
      <p>
        Location processing happens entirely on the participant device. Samply never
        receives raw GPS coordinates. The server only records that a geofencing event
        occurred (enter or exit) along with the timestamp. Researchers see the event in the
        history log but not the absolute position.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Enabling geofencing</h2>
      <p>
        Open <strong>Edit study</strong> and toggle <strong>Enable Geofencing</strong>. Two
        configuration panels appear: one for researcher-defined locations and one for
        participant-defined locations. You can use either or both.
      </p>
      <p>
        Before saving, fill in the <strong>Geofencing instruction</strong> field. This text
        is shown to participants when they join the study, explaining why constant location
        tracking is required and how you will use the data. Participants must grant
        background location permission to the Samply Research app for geofencing to work.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Researcher-defined locations</h2>
      <p>
        Enter the locations yourself — they apply to all participants equally. For each
        location, provide:
      </p>
      <dl>
        <dt>Latitude and longitude</dt>
        <dd>
          The centre of the geofenced zone. After saving, markers appear on a map and can
          be dragged to adjust the position visually.
        </dd>
        <dt>Radius (metres)</dt>
        <dd>
          The circular boundary around the centre point. The participant triggers the zone
          when their device GPS places them within this distance of the centre.
        </dd>
        <dt>Exit zone size (metres)</dt>
        <dd>
          A separate, typically larger radius used to detect exits. Setting a larger exit
          zone than the entry zone reduces spurious exit events caused by GPS drift at the
          boundary.
        </dd>
        <dt>Minimum time window (minutes)</dt>
        <dd>
          The minimum gap between two notifications from this zone. Prevents repeated
          triggers when a participant lingers near the boundary and the GPS signal
          oscillates.
        </dd>
        <dt>Trigger on enter / trigger on exit</dt>
        <dd>Choose which crossing direction fires the notification. You can enable both.</dd>
        <dt>Hide notifications but record events</dt>
        <dd>
          Fires no visible notification but still writes a geofencing-event to the history.
          Use this when you want passive location-event logging without interrupting the
          participant.
        </dd>
      </dl>
      <p>
        All researcher-defined locations share the same notification content: a title,
        message body, and survey URL (configured in the geofencing section of Edit study).
        URL placeholders are supported — see <a href='/docs/placeholders'>URL
        placeholders</a> for the full token list.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Participant-defined locations</h2>
      <p>
        Instead of specifying zones yourself, you can let participants enter their own
        locations — for example, their home address or workplace — directly in the Samply
        Research app. Enable participant-defined locations in Edit study and provide a
        default radius and survey URL.
      </p>
      <p>
        Each participant defines zones that are private to them. The zones are registered
        on their device and never transmitted to the Samply server. This is the appropriate
        choice for studies where the target location is personal and varies between
        participants (e.g. &quot;your home&quot;, &quot;your usual supermarket&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacy and consent</h2>
      <p>
        Background location tracking is a sensitive permission on both iOS and Android. You
        must explain to participants in the Geofencing instruction field what location data
        you collect, why, and how long it is retained. This explanation is shown at study
        enrolment — treat it as an informed consent disclosure.
      </p>
      <p>
        Key privacy properties:
      </p>
      <ul>
        <li>Samply does not store GPS coordinates. Only enter/exit events and timestamps reach the server.</li>
        <li>Participants can disable location tracking for a specific study from within the app without leaving the study.</li>
        <li>Participants can stop all location tracking by disabling location permissions for the Samply Research app in their phone settings.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Geofencing events in the history</h2>
      <p>
        Each geofencing trigger writes a result record with event status{' '}
        <strong>geofencing-event</strong> and the timestamp of the crossing. These records
        appear in the study history log alongside scheduled notification results and can be
        downloaded in the CSV export. The export includes the geofencing event timestamp in
        the same per-event columns as notification receipt and tap events.
      </p>
      <p>
        If you attached a survey URL to the geofencing zone, the URL is recorded in the
        result alongside the event — giving you a link between the location trigger and any
        subsequent survey completion (via the <a href='/docs/reminders'>completion
        callback</a> mechanism).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Empirical guidance</h2>
      <p>
        The following recommendations are based on the findings in <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>, which validated Samply geofencing across three controlled studies with 360 fence crossings.
      </p>
      <dl>
        <dt>Use a radius of at least 100 metres</dt>
        <dd>
          A 10 m radius caused frequent misses on Android and false alarms on iOS. At 100 m, sensitivity stabilised across both platforms. Smaller radii are only reliable in open-sky environments with excellent GPS signal.
        </dd>
        <dt>iOS outperforms Android — plan accordingly</dt>
        <dd>
          iOS devices showed higher overall sensitivity; Android notifications tended to arrive closer to the fence boundary (the device crossed further before the trigger fired). If your study population is mixed, report platform as a covariate and consider stratifying your analysis.
        </dd>
        <dt>Enter and exit events behave differently</dt>
        <dd>
          Exit notifications were delivered significantly further from the boundary than enter notifications — a mean of 234 m vs. 87 m in the studies. If your design depends on capturing the exit moment precisely, set a larger exit zone radius and treat exit-event timestamps with more tolerance.
        </dd>
        <dt>Dwell time matters</dt>
        <dd>
          Participants who stayed at a location for at least 5 minutes showed substantially higher sensitivity than those who passed through briefly. For fleeting exposures (e.g., a bus stop), expect lower detection rates.
        </dd>
        <dt>Forest and low-connectivity environments reduce sensitivity</dt>
        <dd>
          Areas with poor internet connectivity (dense forest, underground spaces, rural areas with weak signal) significantly reduce sensitivity. The app relies on network-assisted GPS for zone detection; without connectivity, events may be delayed or missed entirely. Disclose this limitation in your study protocol.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Participants must rejoin to pick up zone changes</dt>
        <dd>
          Geofenced zones are registered on the device at the time the participant joins the
          study. If you add or modify zones in Edit study after participants have already
          enrolled, they will not receive the updated zones until they leave and rejoin the
          study.
        </dd>
        <dt>GPS accuracy limits effective radius</dt>
        <dd>
          Urban GPS accuracy is typically 5–20 metres; indoors or in dense areas it can
          exceed 50 metres. Set radii larger than your required precision to avoid missed
          triggers. The exit zone setting compensates for boundary oscillation.
        </dd>
        <dt>Background location permission may be revoked</dt>
        <dd>
          iOS and Android can revoke background location permission at any time — after an
          OS update, after a device restart, or if the user changes app settings. Geofencing
          silently stops working when permission is missing. Remind participants in your
          study instructions to keep background location enabled.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentRu() {
  return (
    <>
      <p>
        Геозонирование позволяет Samply автоматически отправлять уведомление и открывать
        опрос, когда участник входит в определённую географическую зону или покидает её —
        рабочее место, супермаркет, жилой квартал. Триггером является само событие
        местоположения, а не время по часам.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Реализация геозонирования в Samply описана и эмпирически подтверждена в рецензируемой статье в журнале <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          В трёх контролируемых исследованиях с приложением Samply общая чувствительность уведомлений составила <strong style={{ color: 'var(--ink)' }}>82,5%</strong> при 360 пересечениях геозон. Статья содержит эмпирические рекомендации по выбору радиуса, платформенным различиям и факторам среды — приведённые ниже рекомендации основаны на этой работе.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Как работает геозонирование</h2>
      <p>
        После того как участник вступает в исследование с включённым геозонированием,
        приложение Samply Research регистрирует геозоны на устройстве и начинает
        отслеживать местоположение в фоновом режиме — даже когда приложение закрыто.
        Когда устройство определяет, что участник вошёл в зону или покинул её, приложение
        отправляет локальное уведомление и записывает в историю исследования событие{' '}
        <strong>geofencing-event</strong>.
      </p>
      <p>
        Обработка местоположения происходит полностью на устройстве участника. Samply
        никогда не получает необработанные GPS-координаты. Сервер фиксирует лишь факт
        наступления события геозонирования (вход или выход) вместе с временной меткой.
        Исследователи видят событие в журнале истории, но не абсолютное положение.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Включение геозонирования</h2>
      <p>
        Откройте <strong>Редактировать исследование</strong> и включите{' '}
        <strong>Геозонирование</strong>. Появятся две панели настройки: одна для
        местоположений, заданных исследователем, другая — для местоположений, заданных
        участником. Можно использовать любую из них или обе.
      </p>
      <p>
        Перед сохранением заполните поле <strong>Инструкция по геозонированию</strong>.
        Этот текст показывается участникам при вступлении в исследование и объясняет,
        зачем требуется постоянное отслеживание местоположения и как вы будете
        использовать данные. Для работы геозонирования участники должны предоставить
        приложению Samply Research разрешение на доступ к местоположению в фоновом режиме.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Местоположения, заданные исследователем</h2>
      <p>
        Вы вводите местоположения самостоятельно — они применяются ко всем участникам
        одинаково. Для каждого местоположения укажите:
      </p>
      <dl>
        <dt>Широта и долгота</dt>
        <dd>
          Центр геозоны. После сохранения на карте появятся маркеры, которые можно
          перетаскивать для визуальной корректировки положения.
        </dd>
        <dt>Радиус (в метрах)</dt>
        <dd>
          Круговая граница вокруг центральной точки. Участник активирует зону, когда
          GPS-приёмник устройства размещает его в пределах этого расстояния от центра.
        </dd>
        <dt>Размер зоны выхода (в метрах)</dt>
        <dd>
          Отдельный, обычно больший радиус для обнаружения выходов. Установка зоны выхода
          большего размера, чем зона входа, снижает количество ложных событий выхода,
          вызванных дрейфом GPS на границе.
        </dd>
        <dt>Минимальный временной интервал (в минутах)</dt>
        <dd>
          Минимальный промежуток между двумя уведомлениями из этой зоны. Предотвращает
          повторные срабатывания, когда участник задерживается вблизи границы и
          GPS-сигнал колеблется.
        </dd>
        <dt>Срабатывать при входе / срабатывать при выходе</dt>
        <dd>Выберите, при каком направлении пересечения отправляется уведомление. Можно включить оба.</dd>
        <dt>Скрывать уведомления, но записывать события</dt>
        <dd>
          Не отправляет видимое уведомление, но всё равно записывает geofencing-event в
          историю. Используйте это, когда нужна пассивная запись событий местоположения
          без прерывания участника.
        </dd>
      </dl>
      <p>
        Все местоположения, заданные исследователем, используют одинаковое содержимое
        уведомления: заголовок, текст и URL опроса (настраиваются в разделе геозонирования
        в редакторе исследования). Поддерживаются URL-заполнители — полный список токенов
        см. в разделе <a href='/docs/placeholders'>URL-заполнители</a>.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Местоположения, заданные участником</h2>
      <p>
        Вместо того чтобы указывать зоны самостоятельно, вы можете позволить участникам
        вводить собственные местоположения — например, домашний адрес или место работы —
        непосредственно в приложении Samply Research. Включите местоположения, задаваемые
        участником, в редакторе исследования и укажите радиус по умолчанию и URL опроса.
      </p>
      <p>
        Каждый участник определяет зоны, которые являются приватными только для него. Зоны
        регистрируются на его устройстве и никогда не передаются на сервер Samply. Это
        подходящий выбор для исследований, где целевое местоположение носит личный характер
        и варьируется между участниками (например, «ваш дом», «ваш привычный супермаркет»).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Конфиденциальность и согласие</h2>
      <p>
        Отслеживание местоположения в фоновом режиме — это чувствительное разрешение на
        iOS и Android. В поле инструкции по геозонированию вы обязаны объяснить участникам,
        какие данные о местоположении вы собираете, зачем и как долго они хранятся. Это
        разъяснение отображается при регистрации в исследовании — относитесь к нему как к
        уведомлению об информированном согласии.
      </p>
      <p>
        Ключевые свойства конфиденциальности:
      </p>
      <ul>
        <li>Samply не хранит GPS-координаты. На сервер поступают только события входа/выхода и временные метки.</li>
        <li>Участники могут отключить отслеживание местоположения для конкретного исследования прямо в приложении, не покидая исследование.</li>
        <li>Участники могут полностью остановить отслеживание местоположения, отозвав соответствующее разрешение у приложения Samply Research в настройках телефона.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>События геозонирования в истории</h2>
      <p>
        Каждое срабатывание геозонирования создаёт запись результата со статусом события{' '}
        <strong>geofencing-event</strong> и временной меткой пересечения. Эти записи
        отображаются в журнале истории исследования рядом с результатами запланированных
        уведомлений и могут быть скачаны в CSV-экспорте. Экспорт включает временную метку
        события геозонирования в тех же столбцах на событие, что и события получения и
        нажатия уведомлений.
      </p>
      <p>
        Если к геозоне был прикреплён URL опроса, он фиксируется в записи результата вместе
        с событием — это обеспечивает связь между триггером местоположения и последующим
        завершением опроса (через механизм{' '}
        <a href='/docs/reminders'>обратного вызова завершения</a>).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Эмпирические рекомендации</h2>
      <p>
        Следующие рекомендации основаны на результатах работы{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        в которой геозонирование Samply было протестировано в трёх контролируемых
        исследованиях при 360 пересечениях геозон.
      </p>
      <dl>
        <dt>Используйте радиус не менее 100 метров</dt>
        <dd>
          Радиус 10 м вызывал частые пропуски на Android и ложные срабатывания на iOS. При
          100 м чувствительность стабилизировалась на обеих платформах. Меньшие радиусы
          надёжны только в открытых местах с отличным GPS-сигналом.
        </dd>
        <dt>iOS превосходит Android — учитывайте это при планировании</dt>
        <dd>
          Устройства iOS показали более высокую общую чувствительность; уведомления Android,
          как правило, приходили ближе к границе геозоны (устройство успевало пересечь её
          дальше, прежде чем срабатывал триггер). Если ваша выборка смешанная, включайте
          платформу как ковариату и рассмотрите стратификацию анализа.
        </dd>
        <dt>События входа и выхода ведут себя по-разному</dt>
        <dd>
          Уведомления о выходе доставлялись значительно дальше от границы, чем уведомления
          о входе — в среднем 234 м против 87 м в исследованиях. Если ваш дизайн требует
          точной фиксации момента выхода, установите больший радиус зоны выхода и обрабатывайте
          временные метки событий выхода с большим допуском.
        </dd>
        <dt>Время нахождения в зоне имеет значение</dt>
        <dd>
          Участники, остававшиеся в месте не менее 5 минут, показали существенно более высокую
          чувствительность, чем те, кто проходил мимо быстро. При кратковременных воздействиях
          (например, на автобусной остановке) ожидайте более низких показателей обнаружения.
        </dd>
        <dt>Лесная местность и слабое соединение снижают чувствительность</dt>
        <dd>
          Районы с плохим интернет-соединением (густой лес, подземные помещения, сельская
          местность со слабым сигналом) существенно снижают чувствительность. Приложение
          полагается на GPS с поддержкой сети для обнаружения зон; без соединения события
          могут задерживаться или полностью пропускаться. Укажите это ограничение в протоколе
          исследования.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>На что обратить внимание</h3>
      <dl>
        <dt>Участники должны повторно вступить в исследование, чтобы получить обновлённые зоны</dt>
        <dd>
          Геозоны регистрируются на устройстве в момент вступления участника в исследование.
          Если вы добавите или изменяете зоны в редакторе исследования после того, как участники
          уже зарегистрировались, они не получат обновлённые зоны, пока не покинут исследование
          и не вступят снова.
        </dd>
        <dt>Точность GPS ограничивает эффективный радиус</dt>
        <dd>
          Точность GPS в городе обычно составляет 5–20 метров; в помещениях или плотной
          застройке может превышать 50 метров. Устанавливайте радиусы больше требуемой точности,
          чтобы избежать пропущенных срабатываний. Настройка зоны выхода компенсирует
          колебания на границе.
        </dd>
        <dt>Разрешение на фоновое местоположение может быть отозвано</dt>
        <dd>
          iOS и Android могут отозвать разрешение на фоновое местоположение в любой момент —
          после обновления ОС, после перезагрузки устройства или если пользователь изменит
          настройки приложения. Геозонирование тихо перестаёт работать при отсутствии
          разрешения. Напоминайте участникам в инструкции к исследованию о необходимости
          поддерживать включённым доступ к местоположению в фоновом режиме.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentNl() {
  return (
    <>
      <p>
        Geofencing stelt Samply in staat om automatisch een melding te sturen en een vragenlijst
        te openen wanneer een deelnemer een bepaald geografisch gebied betreedt of verlaat —
        een werkplek, een supermarkt, een woonwijk. De trigger is de locatiegebeurtenis zelf,
        niet een kloktijd.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          De Samply-geofencing-implementatie wordt beschreven en empirisch gevalideerd in een peer-reviewed artikel in <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Drie gecontroleerde studies met de Samply-app toonden een totale meldingsgevoeligheid van <strong style={{ color: 'var(--ink)' }}>82,5%</strong> bij 360 geofence-overschrijdingen. Het artikel biedt empirische richtlijnen voor de keuze van de straal, platformverschillen en omgevingsfactoren — de onderstaande aanbevelingen zijn gebaseerd op dit werk.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Hoe geofencing werkt</h2>
      <p>
        Zodra een deelnemer deelneemt aan een studie waarvoor geofencing is ingeschakeld,
        registreert de Samply Research-app de geofence-zones op het apparaat en begint de
        locatie op de achtergrond te bewaken — ook wanneer de app is gesloten. Wanneer het
        apparaat detecteert dat de deelnemer een zone is binnengekomen of verlaten heeft,
        verstuurt de app een lokale melding en legt een <strong>geofencing-event</strong> vast
        in de studiegeschiedenis.
      </p>
      <p>
        De locatieverwerking vindt volledig plaats op het apparaat van de deelnemer. Samply
        ontvangt nooit ruwe GPS-coördinaten. De server registreert alleen dat er een
        geofencing-event heeft plaatsgevonden (binnenkomst of vertrek) samen met het
        tijdstempel. Onderzoekers zien het event in het historielogboek, maar niet de absolute
        positie.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Geofencing inschakelen</h2>
      <p>
        Open <strong>Studie bewerken</strong> en schakel <strong>Geofencing inschakelen</strong> in.
        Er verschijnen twee configuratiepanelen: één voor door de onderzoeker gedefinieerde
        locaties en één voor door de deelnemer gedefinieerde locaties. U kunt één van beide of
        beide gebruiken.
      </p>
      <p>
        Vul vóór het opslaan het veld <strong>Geofencing-instructie</strong> in. Deze tekst
        wordt aan deelnemers getoond wanneer zij deelnemen aan de studie, en legt uit waarom
        voortdurende locatietracking vereist is en hoe u de gegevens zult gebruiken.
        Deelnemers moeten de Samply Research-app toestemming verlenen voor locatiebewaking op
        de achtergrond om geofencing te laten werken.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Door de onderzoeker gedefinieerde locaties</h2>
      <p>
        U voert de locaties zelf in — ze gelden voor alle deelnemers gelijkelijk. Geef voor
        elke locatie het volgende op:
      </p>
      <dl>
        <dt>Breedtegraad en lengtegraad</dt>
        <dd>
          Het middelpunt van de geofence-zone. Na het opslaan verschijnen er markeringen op
          een kaart die visueel versleept kunnen worden om de positie aan te passen.
        </dd>
        <dt>Straal (meters)</dt>
        <dd>
          De cirkelvormige grens rondom het middelpunt. De deelnemer activeert de zone
          wanneer de GPS van zijn apparaat hem binnen deze afstand van het middelpunt plaatst.
        </dd>
        <dt>Grootte van de vertrekzone (meters)</dt>
        <dd>
          Een aparte, doorgaans grotere straal voor het detecteren van vertrekken. Een grotere
          vertrekzone dan de binnenkomstzone vermindert onjuiste vertrekgebeurtenissen die
          worden veroorzaakt door GPS-drift aan de grens.
        </dd>
        <dt>Minimaal tijdvenster (minuten)</dt>
        <dd>
          Het minimale interval tussen twee meldingen van deze zone. Voorkomt herhaalde
          triggers wanneer een deelnemer in de buurt van de grens blijft en het GPS-signaal
          schommelt.
        </dd>
        <dt>Trigger bij binnenkomst / trigger bij vertrek</dt>
        <dd>Kies welke oversteekrichting de melding activeert. U kunt beide inschakelen.</dd>
        <dt>Meldingen verbergen maar events vastleggen</dt>
        <dd>
          Verstuurt geen zichtbare melding, maar schrijft wel een geofencing-event naar de
          geschiedenis. Gebruik dit wanneer u passieve locatie-event-logging wilt zonder de
          deelnemer te onderbreken.
        </dd>
      </dl>
      <p>
        Alle door de onderzoeker gedefinieerde locaties delen dezelfde meldingsinhoud: een
        titel, berichttekst en vragenlijst-URL (geconfigureerd in het geofencing-gedeelte van
        Studie bewerken). URL-plaatshouders worden ondersteund — zie{' '}
        <a href='/docs/placeholders'>URL-plaatshouders</a> voor de volledige tokenlijst.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Door de deelnemer gedefinieerde locaties</h2>
      <p>
        In plaats van zelf zones op te geven, kunt u deelnemers hun eigen locaties laten
        invoeren — bijvoorbeeld hun thuisadres of werkplek — rechtstreeks in de Samply
        Research-app. Schakel door de deelnemer gedefinieerde locaties in via Studie bewerken
        en geef een standaardstraal en een vragenlijst-URL op.
      </p>
      <p>
        Elke deelnemer definieert zones die privé voor hem zijn. De zones worden op zijn
        apparaat geregistreerd en nooit naar de Samply-server verzonden. Dit is de geschikte
        keuze voor studies waarbij de doellocatie persoonlijk is en verschilt per deelnemer
        (bijv. &quot;uw thuis&quot;, &quot;uw vaste supermarkt&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacy en toestemming</h2>
      <p>
        Locatietracking op de achtergrond is een gevoelige toestemming op zowel iOS als
        Android. U moet deelnemers in het veld Geofencing-instructie uitleggen welke
        locatiegegevens u verzamelt, waarom en hoe lang deze worden bewaard. Deze toelichting
        wordt getoond bij de studieregistratie — behandel het als een geïnformeerde
        toestemmingsverklaring.
      </p>
      <p>
        Belangrijke privacyeigenschappen:
      </p>
      <ul>
        <li>Samply slaat geen GPS-coördinaten op. Alleen binnenkomst- en vertrekgebeurtenissen en tijdstempels bereiken de server.</li>
        <li>Deelnemers kunnen de locatietracking voor een specifieke studie vanuit de app uitschakelen zonder de studie te verlaten.</li>
        <li>Deelnemers kunnen alle locatietracking stoppen door de locatiemachtigingen voor de Samply Research-app uit te schakelen in hun telefooninstellingen.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Geofencing-events in de geschiedenis</h2>
      <p>
        Elke geofencing-trigger schrijft een resultaatrecord met eventstatus{' '}
        <strong>geofencing-event</strong> en het tijdstempel van de overschrijding. Deze
        records verschijnen in het studiehistorielogboek naast geplande meldingsresultaten en
        kunnen worden gedownload in de CSV-export. De export bevat het tijdstempel van het
        geofencing-event in dezelfde per-event-kolommen als de ontvangst- en tikgebeurtenissen
        van meldingen.
      </p>
      <p>
        Als u een vragenlijst-URL aan de geofence-zone heeft gekoppeld, wordt de URL in het
        resultaat naast het event vastgelegd — waardoor u een koppeling krijgt tussen de
        locatietrigger en een eventuele voltooiing van de vragenlijst (via het{' '}
        <a href='/docs/reminders'>voltooiingscallback</a>-mechanisme).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Empirische richtlijnen</h2>
      <p>
        De volgende aanbevelingen zijn gebaseerd op de bevindingen uit{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        die Samply geofencing valideerden in drie gecontroleerde studies met 360
        geofence-overschrijdingen.
      </p>
      <dl>
        <dt>Gebruik een straal van minimaal 100 meter</dt>
        <dd>
          Een straal van 10 m veroorzaakte frequente missers op Android en valse alarmen op
          iOS. Bij 100 m stabiliseerde de gevoeligheid zich op beide platforms. Kleinere
          stralen zijn alleen betrouwbaar in open omgevingen met een uitstekend GPS-signaal.
        </dd>
        <dt>iOS presteert beter dan Android — houd hier rekening mee</dt>
        <dd>
          iOS-apparaten toonden een hogere totale gevoeligheid; Android-meldingen kwamen
          doorgaans dichter bij de geofence-grens aan (het apparaat was verder overgestoken
          voordat de trigger vuurde). Als uw studiepopulatie gemengd is, rapporteer dan het
          platform als covariaat en overweeg uw analyse te stratificeren.
        </dd>
        <dt>Binnenkomst- en vertrekgebeurtenissen gedragen zich verschillend</dt>
        <dd>
          Vertrekmeldingen werden significant verder van de grens afgeleverd dan
          binnenkomstmeldingen — gemiddeld 234 m versus 87 m in de studies. Als uw ontwerp
          afhankelijk is van het nauwkeurig vastleggen van het vertrekmoment, stel dan een
          grotere vertrekzonestraal in en behandel tijdstempels van vertrekgebeurtenissen met
          meer tolerantie.
        </dd>
        <dt>Verblijfsduur is van belang</dt>
        <dd>
          Deelnemers die minimaal 5 minuten op een locatie verbleven, toonden een aanzienlijk
          hogere gevoeligheid dan deelnemers die er snel doorheen gingen. Verwacht lagere
          detectiesnelheden voor vluchtige blootstellingen (bijv. een bushalte).
        </dd>
        <dt>Bos- en slechte verbindingsomgevingen verlagen de gevoeligheid</dt>
        <dd>
          Gebieden met slechte internetverbinding (dicht bos, ondergrondse ruimten, landelijke
          gebieden met zwak signaal) verlagen de gevoeligheid aanzienlijk. De app is afhankelijk
          van netwerk-ondersteunde GPS voor zonebewaking; zonder verbinding kunnen events
          vertraagd zijn of volledig worden gemist. Vermeld deze beperking in uw studieprotocol.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Aandachtspunten</h3>
      <dl>
        <dt>Deelnemers moeten opnieuw deelnemen om zonewijzigingen op te halen</dt>
        <dd>
          Geofence-zones worden op het apparaat geregistreerd op het moment dat de deelnemer
          deelneemt aan de studie. Als u zones toevoegt of aanpast in Studie bewerken nadat
          deelnemers al zijn ingeschreven, ontvangen zij de bijgewerkte zones pas nadat zij
          de studie verlaten en opnieuw deelnemen.
        </dd>
        <dt>GPS-nauwkeurigheid beperkt de effectieve straal</dt>
        <dd>
          De GPS-nauwkeurigheid in stedelijke gebieden is doorgaans 5–20 meter; binnen of in
          dichte gebieden kan dit meer dan 50 meter zijn. Stel stralen groter in dan uw
          vereiste precisie om gemiste triggers te vermijden. De vertrekzone-instelling
          compenseert voor grensoscillatie.
        </dd>
        <dt>Toestemming voor locatiebewaking op de achtergrond kan worden ingetrokken</dt>
        <dd>
          iOS en Android kunnen de toestemming voor locatiebewaking op de achtergrond op elk
          moment intrekken — na een OS-update, na het opnieuw opstarten van het apparaat of
          als de gebruiker de app-instellingen wijzigt. Geofencing stopt stilzwijgend te
          werken wanneer de toestemming ontbreekt. Herinner deelnemers in uw
          studie-instructies eraan om locatiebewaking op de achtergrond ingeschakeld te houden.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentDe() {
  return (
    <>
      <p>
        Geofencing ermöglicht es Samply, automatisch eine Benachrichtigung zu senden und
        eine Umfrage zu öffnen, wenn ein Teilnehmer ein definiertes geografisches Gebiet
        betritt oder verlässt — einen Arbeitsplatz, einen Supermarkt, ein Wohnviertel. Der
        Auslöser ist das Standortereignis selbst, nicht eine Uhrzeit.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Die Samply-Geofencing-Implementierung wird in einem begutachteten Artikel in <em>Behavior Research Methods</em> beschrieben und empirisch validiert:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Drei kontrollierte Studien mit der Samply-App ergaben eine Gesamtempfindlichkeit der Benachrichtigungen von <strong style={{ color: 'var(--ink)' }}>82,5 %</strong> bei 360 Geofence-Kreuzungen. Der Artikel bietet empirische Empfehlungen zur Radiuswahl, zu Plattformunterschieden und zu Umgebungsfaktoren — die folgenden Empfehlungen beruhen auf dieser Arbeit.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Wie Geofencing funktioniert</h2>
      <p>
        Sobald ein Teilnehmer einer Studie mit aktiviertem Geofencing beitritt, registriert
        die Samply Research-App die Geofence-Zonen auf dem Gerät und beginnt, den Standort
        im Hintergrund zu überwachen — auch wenn die App geschlossen ist. Wenn das Gerät
        erkennt, dass der Teilnehmer eine Zone betreten oder verlassen hat, sendet die App
        eine lokale Benachrichtigung und zeichnet ein <strong>geofencing-event</strong> in
        der Studienhistorie auf.
      </p>
      <p>
        Die Standortverarbeitung findet vollständig auf dem Gerät des Teilnehmers statt.
        Samply empfängt niemals rohe GPS-Koordinaten. Der Server zeichnet nur auf, dass ein
        Geofencing-Ereignis stattgefunden hat (eintreten oder verlassen) zusammen mit dem
        Zeitstempel. Forscher sehen das Ereignis im Verlaufsprotokoll, aber nicht die
        absolute Position.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Geofencing aktivieren</h2>
      <p>
        Öffnen Sie <strong>Studie bearbeiten</strong> und aktivieren Sie{' '}
        <strong>Geofencing aktivieren</strong>. Es erscheinen zwei Konfigurationsbereiche:
        einer für Forscher-definierte Standorte und einer für Teilnehmer-definierte
        Standorte. Sie können einen oder beide verwenden.
      </p>
      <p>
        Füllen Sie vor dem Speichern das Feld <strong>Geofencing-Anweisung</strong> aus.
        Dieser Text wird den Teilnehmern beim Beitritt zur Studie angezeigt und erklärt,
        warum eine dauerhafte Standortverfolgung erforderlich ist und wie Sie die Daten
        verwenden werden. Teilnehmer müssen der Samply Research-App eine
        Hintergrund-Standortberechtigung erteilen, damit Geofencing funktioniert.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Forscher-definierte Standorte</h2>
      <p>
        Geben Sie die Standorte selbst ein — sie gelten für alle Teilnehmer gleichermaßen.
        Geben Sie für jeden Standort folgendes an:
      </p>
      <dl>
        <dt>Breitengrad und Längengrad</dt>
        <dd>
          Der Mittelpunkt der Geofence-Zone. Nach dem Speichern erscheinen Markierungen auf
          einer Karte, die zur visuellen Positionsanpassung verschoben werden können.
        </dd>
        <dt>Radius (Meter)</dt>
        <dd>
          Die kreisförmige Grenze um den Mittelpunkt. Der Teilnehmer löst die Zone aus,
          wenn sein Geräte-GPS ihn innerhalb dieser Entfernung vom Mittelpunkt verortet.
        </dd>
        <dt>Größe der Ausgangszone (Meter)</dt>
        <dd>
          Ein separater, typischerweise größerer Radius zur Erkennung von Austritten. Ein
          größerer Ausgangsradius als der Eingangsradius reduziert fehlerhafte
          Austrittsereignisse durch GPS-Drift an der Grenze.
        </dd>
        <dt>Mindestzeitfenster (Minuten)</dt>
        <dd>
          Der Mindestabstand zwischen zwei Benachrichtigungen aus dieser Zone. Verhindert
          wiederholte Auslöser, wenn ein Teilnehmer in der Nähe der Grenze verweilt und das
          GPS-Signal schwankt.
        </dd>
        <dt>Auslöser beim Eintreten / Auslöser beim Verlassen</dt>
        <dd>Wählen Sie, welche Kreuzungsrichtung die Benachrichtigung auslöst. Sie können beide aktivieren.</dd>
        <dt>Benachrichtigungen ausblenden, aber Ereignisse aufzeichnen</dt>
        <dd>
          Sendet keine sichtbare Benachrichtigung, schreibt aber dennoch ein
          Geofencing-Ereignis in die Historie. Verwenden Sie diese Option, wenn Sie eine
          passive Standortereignisprotokollierung wünschen, ohne den Teilnehmer zu
          unterbrechen.
        </dd>
      </dl>
      <p>
        Alle forscher-definierten Standorte teilen denselben Benachrichtigungsinhalt: einen
        Titel, einen Nachrichtentext und eine Umfrage-URL (konfiguriert im
        Geofencing-Bereich von Studie bearbeiten). URL-Platzhalter werden unterstützt —
        siehe <a href='/docs/placeholders'>URL-Platzhalter</a> für die vollständige
        Token-Liste.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Teilnehmer-definierte Standorte</h2>
      <p>
        Anstatt Zonen selbst festzulegen, können Sie den Teilnehmern erlauben, ihre eigenen
        Standorte einzugeben — zum Beispiel ihre Heimadresse oder ihren Arbeitsplatz —
        direkt in der Samply Research-App. Aktivieren Sie teilnehmer-definierte Standorte
        in Studie bearbeiten und geben Sie einen Standardradius und eine Umfrage-URL an.
      </p>
      <p>
        Jeder Teilnehmer definiert Zonen, die nur für ihn gelten. Die Zonen werden auf
        seinem Gerät registriert und niemals an den Samply-Server übertragen. Dies ist die
        geeignete Wahl für Studien, bei denen der Zielstandort persönlich ist und zwischen
        den Teilnehmern variiert (z. B. &quot;Ihr Zuhause&quot;, &quot;Ihr üblicher
        Supermarkt&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Datenschutz und Einwilligung</h2>
      <p>
        Hintergrund-Standortverfolgung ist eine sensible Berechtigung sowohl auf iOS als
        auch auf Android. Sie müssen den Teilnehmern im Feld Geofencing-Anweisung erklären,
        welche Standortdaten Sie erfassen, warum und wie lange diese aufbewahrt werden.
        Diese Erklärung wird bei der Studienanmeldung angezeigt — behandeln Sie sie als
        informierte Einwilligungserklärung.
      </p>
      <p>
        Wichtige Datenschutzeigenschaften:
      </p>
      <ul>
        <li>Samply speichert keine GPS-Koordinaten. Nur Eintreten/Verlassen-Ereignisse und Zeitstempel erreichen den Server.</li>
        <li>Teilnehmer können die Standortverfolgung für eine bestimmte Studie innerhalb der App deaktivieren, ohne die Studie zu verlassen.</li>
        <li>Teilnehmer können die gesamte Standortverfolgung stoppen, indem sie die Standortberechtigungen für die Samply Research-App in ihren Telefoneinstellungen deaktivieren.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Geofencing-Ereignisse in der Historie</h2>
      <p>
        Jeder Geofencing-Auslöser schreibt einen Ergebnisdatensatz mit dem Ereignisstatus{' '}
        <strong>geofencing-event</strong> und dem Zeitstempel der Kreuzung. Diese Datensätze
        erscheinen im Studienhistorienprotokoll neben geplanten Benachrichtigungsergebnissen
        und können im CSV-Export heruntergeladen werden. Der Export enthält den
        Geofencing-Ereigniszeitstempel in denselben ereignisbezogenen Spalten wie
        Benachrichtigungsempfang und Tipp-Ereignisse.
      </p>
      <p>
        Wenn Sie eine Umfrage-URL an die Geofence-Zone angehängt haben, wird die URL im
        Ergebnis neben dem Ereignis aufgezeichnet — so erhalten Sie eine Verknüpfung
        zwischen dem Standortauslöser und einer anschließenden Umfrageabschluss (über den{' '}
        <a href='/docs/reminders'>Abschluss-Callback</a>-Mechanismus).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Empirische Empfehlungen</h2>
      <p>
        Die folgenden Empfehlungen basieren auf den Ergebnissen von{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        die Samply Geofencing in drei kontrollierten Studien mit 360 Geofence-Kreuzungen
        validierten.
      </p>
      <dl>
        <dt>Verwenden Sie einen Radius von mindestens 100 Metern</dt>
        <dd>
          Ein Radius von 10 m verursachte häufige Fehlauslöser auf Android und Fehlalarme
          auf iOS. Bei 100 m stabilisierte sich die Empfindlichkeit auf beiden Plattformen.
          Kleinere Radien sind nur in Freiflächen-Umgebungen mit exzellentem GPS-Signal
          zuverlässig.
        </dd>
        <dt>iOS übertrifft Android — planen Sie entsprechend</dt>
        <dd>
          iOS-Geräte zeigten eine höhere Gesamtempfindlichkeit; Android-Benachrichtigungen
          tendierten dazu, näher an der Geofence-Grenze anzukommen (das Gerät überquerte
          weiter, bevor der Auslöser auslöste). Wenn Ihre Studienpopulation gemischt ist,
          berichten Sie die Plattform als Kovariate und erwägen Sie eine Stratifizierung
          Ihrer Analyse.
        </dd>
        <dt>Eintreten und Verlassen verhalten sich unterschiedlich</dt>
        <dd>
          Verlassen-Benachrichtigungen wurden erheblich weiter von der Grenze entfernt
          geliefert als Eintreten-Benachrichtigungen — im Durchschnitt 234 m vs. 87 m in
          den Studien. Wenn Ihr Design darauf angewiesen ist, den Verlassen-Moment präzise
          zu erfassen, setzen Sie einen größeren Ausgangszonenradius und behandeln Sie
          Verlassen-Ereignis-Zeitstempel mit mehr Toleranz.
        </dd>
        <dt>Verweildauer ist entscheidend</dt>
        <dd>
          Teilnehmer, die mindestens 5 Minuten an einem Standort blieben, zeigten eine
          deutlich höhere Empfindlichkeit als solche, die nur kurz vorbeigingen. Bei
          flüchtigen Expositionen (z. B. eine Bushaltestelle) sind niedrigere
          Erkennungsraten zu erwarten.
        </dd>
        <dt>Wald- und verbindungsarme Umgebungen reduzieren die Empfindlichkeit</dt>
        <dd>
          Gebiete mit schlechter Internetverbindung (dichter Wald, unterirdische Räume,
          ländliche Gebiete mit schwachem Signal) reduzieren die Empfindlichkeit erheblich.
          Die App ist auf netzwerkgestütztes GPS zur Zonenerkennung angewiesen; ohne
          Verbindung können Ereignisse verzögert oder ganz verpasst werden. Weisen Sie in
          Ihrem Studienprotokoll auf diese Einschränkung hin.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Worauf Sie achten sollten</h3>
      <dl>
        <dt>Teilnehmer müssen erneut beitreten, um Zonenänderungen zu übernehmen</dt>
        <dd>
          Geofence-Zonen werden auf dem Gerät zum Zeitpunkt des Studienbeitritts
          registriert. Wenn Sie Zonen in Studie bearbeiten hinzufügen oder ändern, nachdem
          Teilnehmer bereits angemeldet sind, erhalten diese die aktualisierten Zonen erst,
          wenn sie die Studie verlassen und erneut beitreten.
        </dd>
        <dt>GPS-Genauigkeit begrenzt den effektiven Radius</dt>
        <dd>
          Die GPS-Genauigkeit in städtischen Gebieten beträgt typischerweise 5–20 Meter;
          in Innenräumen oder dicht bebauten Gebieten kann sie 50 Meter überschreiten.
          Setzen Sie Radien größer als Ihre erforderliche Präzision, um verpasste Auslöser
          zu vermeiden. Die Ausgangszoneneinstellung kompensiert Grenzoszillationen.
        </dd>
        <dt>Hintergrund-Standortberechtigung kann widerrufen werden</dt>
        <dd>
          iOS und Android können die Hintergrund-Standortberechtigung jederzeit widerrufen
          — nach einem Betriebssystem-Update, nach einem Geräteneustart oder wenn der
          Benutzer die App-Einstellungen ändert. Geofencing hört stillschweigend auf zu
          funktionieren, wenn die Berechtigung fehlt. Erinnern Sie die Teilnehmer in Ihren
          Studienanweisungen daran, den Hintergrundstandort aktiviert zu lassen.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentKo() {
  return (
    <>
      <p>
        지오펜싱(geofencing)을 통해 Samply는 참여자가 직장, 슈퍼마켓, 주거 지역 등
        정의된 지리적 영역에 진입하거나 이탈할 때 자동으로 알림을 전송하고 설문을 열 수
        있습니다. 트리거는 시계 시간이 아니라 위치 이벤트 자체입니다.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          Samply 지오펜싱 구현은 <em>Behavior Research Methods</em>의 동료 심사 논문에서 기술되고 실증적으로 검증되었습니다:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Samply 앱을 사용한 세 가지 통제 연구는 360회의 펜스 교차에 걸쳐 전체 알림 민감도{' '}
          <strong style={{ color: 'var(--ink)' }}>82.5%</strong>를 달성했습니다. 해당 논문은 반경 선택, 플랫폼 차이, 환경적 요인에 관한 실증적 지침을 제공하며, 아래 권장 사항은 이 연구에서 도출된 것입니다.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>지오펜싱의 작동 원리</h2>
      <p>
        참여자가 지오펜싱이 활성화된 연구에 참여하면 Samply Research 앱은 기기에 지오펜싱
        구역을 등록하고 앱이 닫혀 있어도 백그라운드에서 위치 모니터링을 시작합니다.
        기기가 참여자의 구역 진입 또는 이탈을 감지하면 앱은 로컬 알림을 전송하고 연구
        기록에 <strong>geofencing-event</strong>를 기록합니다.
      </p>
      <p>
        위치 처리는 전적으로 참여자 기기에서 이루어집니다. Samply는 원시 GPS 좌표를
        수신하지 않습니다. 서버는 지오펜싱 이벤트(진입 또는 이탈)가 발생했다는 사실과
        타임스탬프만 기록합니다. 연구자는 기록 로그에서 이벤트를 확인할 수 있지만 절대
        위치는 볼 수 없습니다.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>지오펜싱 활성화</h2>
      <p>
        <strong>연구 편집</strong>을 열고 <strong>지오펜싱 활성화</strong>를 켜십시오.
        연구자 정의 위치와 참여자 정의 위치를 위한 두 개의 구성 패널이 나타납니다.
        둘 중 하나 또는 모두를 사용할 수 있습니다.
      </p>
      <p>
        저장하기 전에 <strong>지오펜싱 안내</strong> 필드를 입력하십시오. 이 텍스트는
        참여자가 연구에 참여할 때 표시되며, 지속적인 위치 추적이 필요한 이유와 데이터
        활용 방법을 설명합니다. 지오펜싱이 작동하려면 참여자가 Samply Research 앱에
        백그라운드 위치 권한을 부여해야 합니다.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>연구자 정의 위치</h2>
      <p>
        위치를 직접 입력하면 모든 참여자에게 동일하게 적용됩니다. 각 위치에 대해
        다음을 제공하십시오:
      </p>
      <dl>
        <dt>위도 및 경도</dt>
        <dd>
          지오펜싱 구역의 중심점입니다. 저장 후 지도에 마커가 표시되며 드래그하여
          위치를 시각적으로 조정할 수 있습니다.
        </dd>
        <dt>반경(미터)</dt>
        <dd>
          중심점 주변의 원형 경계입니다. 참여자 기기의 GPS가 중심점으로부터 이 거리
          이내에 있는 것으로 표시되면 구역이 트리거됩니다.
        </dd>
        <dt>이탈 구역 크기(미터)</dt>
        <dd>
          이탈 감지에 사용되는 별도의, 일반적으로 더 큰 반경입니다. 진입 구역보다 큰
          이탈 구역을 설정하면 경계에서의 GPS 드리프트로 인한 오탈 이벤트를 줄일 수
          있습니다.
        </dd>
        <dt>최소 시간 창(분)</dt>
        <dd>
          이 구역에서 두 알림 사이의 최소 간격입니다. 참여자가 경계 근처에 머물고
          GPS 신호가 진동할 때 반복 트리거를 방지합니다.
        </dd>
        <dt>진입 시 트리거 / 이탈 시 트리거</dt>
        <dd>알림을 발생시킬 교차 방향을 선택하십시오. 둘 다 활성화할 수 있습니다.</dd>
        <dt>알림 숨기기 및 이벤트 기록</dt>
        <dd>
          눈에 보이는 알림은 전송하지 않지만 기록에는 geofencing-event를 기록합니다.
          참여자를 방해하지 않고 수동적인 위치 이벤트 로깅을 원할 때 사용하십시오.
        </dd>
      </dl>
      <p>
        연구자가 정의한 모든 위치는 동일한 알림 내용(제목, 메시지 본문, 설문 URL)을
        공유합니다(연구 편집의 지오펜싱 섹션에서 구성). URL 플레이스홀더가 지원됩니다—
        전체 토큰 목록은 <a href='/docs/placeholders'>URL 플레이스홀더</a>를 참조하십시오.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>참여자 정의 위치</h2>
      <p>
        구역을 직접 지정하는 대신 참여자가 Samply Research 앱에서 자신의 위치(예: 자택
        주소 또는 직장)를 직접 입력하도록 할 수 있습니다. 연구 편집에서 참여자 정의
        위치를 활성화하고 기본 반경과 설문 URL을 제공하십시오.
      </p>
      <p>
        각 참여자가 정의하는 구역은 해당 참여자에게만 비공개로 적용됩니다. 구역은
        참여자의 기기에 등록되며 Samply 서버로 전송되지 않습니다. 목표 위치가 개인적이고
        참여자마다 다른 연구(예: &quot;자택&quot;, &quot;주로 이용하는 슈퍼마켓&quot;)에
        적합한 선택입니다.
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>개인정보 보호 및 동의</h2>
      <p>
        iOS와 Android 모두에서 백그라운드 위치 추적은 민감한 권한입니다. 지오펜싱 안내
        필드에서 수집하는 위치 데이터의 종류, 수집 이유, 보관 기간을 참여자에게 설명해야
        합니다. 이 설명은 연구 등록 시 표시되므로 사전 동의 공시로 취급하십시오.
      </p>
      <p>
        주요 개인정보 보호 특성:
      </p>
      <ul>
        <li>Samply는 GPS 좌표를 저장하지 않습니다. 진입/이탈 이벤트와 타임스탬프만 서버에 도달합니다.</li>
        <li>참여자는 연구를 떠나지 않고도 앱 내에서 특정 연구의 위치 추적을 비활성화할 수 있습니다.</li>
        <li>참여자는 휴대폰 설정에서 Samply Research 앱의 위치 권한을 비활성화하여 모든 위치 추적을 중단할 수 있습니다.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>기록에서의 지오펜싱 이벤트</h2>
      <p>
        각 지오펜싱 트리거는 이벤트 상태 <strong>geofencing-event</strong>와 교차
        타임스탬프가 포함된 결과 레코드를 기록합니다. 이 레코드는 예약된 알림 결과와
        함께 연구 기록 로그에 표시되며 CSV 내보내기로 다운로드할 수 있습니다. 내보내기에는
        알림 수신 및 탭 이벤트와 동일한 이벤트별 열에 지오펜싱 이벤트 타임스탬프가
        포함됩니다.
      </p>
      <p>
        지오펜싱 구역에 설문 URL을 연결한 경우, 해당 URL은 이벤트와 함께 결과에 기록되어
        위치 트리거와 이후 설문 완료 사이의 연결 고리를 제공합니다
        (<a href='/docs/reminders'>완료 콜백</a> 메커니즘을 통해).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>실증적 지침</h2>
      <p>
        아래 권장 사항은 360회의 펜스 교차로 Samply 지오펜싱을 세 가지 통제 연구에서
        검증한{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>의
        연구 결과를 바탕으로 합니다.
      </p>
      <dl>
        <dt>최소 100미터 반경 사용</dt>
        <dd>
          10m 반경은 Android에서 빈번한 누락과 iOS에서 오경보를 유발했습니다. 100m에서는
          두 플랫폼 모두에서 민감도가 안정화되었습니다. 작은 반경은 GPS 신호가 우수한
          개방형 환경에서만 신뢰할 수 있습니다.
        </dd>
        <dt>iOS가 Android보다 우수—그에 맞게 계획하십시오</dt>
        <dd>
          iOS 기기는 전반적으로 더 높은 민감도를 보였습니다. Android 알림은 펜스 경계에
          더 가까이 도달하는 경향이 있었습니다(트리거가 발생하기 전에 기기가 더 멀리
          이동). 연구 모집단이 혼합되어 있다면 플랫폼을 공변량으로 보고하고 분석을
          층화하는 것을 고려하십시오.
        </dd>
        <dt>진입 이벤트와 이탈 이벤트는 다르게 동작합니다</dt>
        <dd>
          이탈 알림은 진입 알림보다 경계에서 상당히 멀리 전달되었습니다—연구에서 평균
          234m 대 87m. 이탈 순간을 정확하게 포착하는 설계를 하는 경우 더 큰 이탈 구역
          반경을 설정하고 이탈 이벤트 타임스탬프에 더 많은 허용 오차를 부여하십시오.
        </dd>
        <dt>체류 시간이 중요합니다</dt>
        <dd>
          위치에서 최소 5분 머문 참여자는 짧게 통과한 참여자에 비해 훨씬 높은 민감도를
          보였습니다. 일시적 노출(예: 버스 정류장)의 경우 낮은 감지율을 예상하십시오.
        </dd>
        <dt>숲과 저연결 환경은 민감도를 낮춥니다</dt>
        <dd>
          인터넷 연결이 불량한 지역(빽빽한 숲, 지하 공간, 신호가 약한 농촌 지역)은
          민감도를 크게 낮춥니다. 앱은 구역 감지를 위해 네트워크 보조 GPS에 의존합니다.
          연결이 없으면 이벤트가 지연되거나 완전히 누락될 수 있습니다. 연구 프로토콜에
          이 한계를 명시하십시오.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>주의 사항</h3>
      <dl>
        <dt>참여자는 구역 변경 사항을 반영하기 위해 재참여해야 합니다</dt>
        <dd>
          지오펜싱 구역은 참여자가 연구에 참여할 때 기기에 등록됩니다. 참여자가 이미
          등록한 후 연구 편집에서 구역을 추가하거나 수정하면 참여자가 연구를 떠났다가
          다시 참여하기 전까지는 업데이트된 구역을 받지 못합니다.
        </dd>
        <dt>GPS 정확도가 유효 반경을 제한합니다</dt>
        <dd>
          도심 GPS 정확도는 일반적으로 5–20미터이며, 실내나 밀집 지역에서는 50미터를
          초과할 수 있습니다. 트리거 누락을 방지하기 위해 필요한 정밀도보다 큰 반경을
          설정하십시오. 이탈 구역 설정은 경계 진동을 보정합니다.
        </dd>
        <dt>백그라운드 위치 권한이 취소될 수 있습니다</dt>
        <dd>
          iOS와 Android는 OS 업데이트 후, 기기 재시작 후 또는 사용자가 앱 설정을 변경할
          때 언제든지 백그라운드 위치 권한을 취소할 수 있습니다. 권한이 없으면 지오펜싱이
          자동으로 작동을 중지합니다. 연구 안내에서 참여자에게 백그라운드 위치를 활성화된
          상태로 유지하도록 상기시키십시오.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentIt() {
  return (
    <>
      <p>
        Il geofencing consente a Samply di inviare automaticamente una notifica e aprire un
        sondaggio quando un partecipante entra in o esce da un'area geografica definita —
        un luogo di lavoro, un supermercato, un quartiere residenziale. Il trigger è
        l'evento di localizzazione stesso, non un orario dell'orologio.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          L'implementazione del geofencing in Samply è descritta e validata empiricamente in un articolo sottoposto a revisione paritaria su <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Tre studi controllati condotti con l'app Samply hanno prodotto una sensibilità complessiva delle notifiche dell'{' '}
          <strong style={{ color: 'var(--ink)' }}>82,5%</strong> su 360 attraversamenti del recinto. L'articolo fornisce indicazioni empiriche sulla scelta del raggio, sulle differenze tra piattaforme e sui fattori ambientali — le raccomandazioni riportate di seguito sono tratte da questo lavoro.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Come funziona il geofencing</h2>
      <p>
        Una volta che un partecipante si unisce a uno studio con il geofencing attivato,
        l'app Samply Research registra le zone geofenced sul dispositivo e inizia a
        monitorare la posizione in background — anche quando l'app è chiusa. Quando il
        dispositivo rileva che il partecipante è entrato in o uscito da una zona, l'app
        invia una notifica locale e registra un <strong>geofencing-event</strong> nella
        cronologia dello studio.
      </p>
      <p>
        L'elaborazione della posizione avviene interamente sul dispositivo del partecipante.
        Samply non riceve mai coordinate GPS grezze. Il server registra soltanto il
        verificarsi di un evento di geofencing (ingresso o uscita) insieme al timestamp.
        I ricercatori vedono l'evento nel registro della cronologia, ma non la posizione
        assoluta.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Attivazione del geofencing</h2>
      <p>
        Aprire <strong>Modifica studio</strong> e attivare <strong>Abilita Geofencing</strong>.
        Vengono visualizzati due pannelli di configurazione: uno per le posizioni definite
        dal ricercatore e uno per le posizioni definite dal partecipante. È possibile
        utilizzare uno o entrambi.
      </p>
      <p>
        Prima di salvare, compilare il campo <strong>Istruzione geofencing</strong>. Questo
        testo viene mostrato ai partecipanti al momento dell'iscrizione allo studio e spiega
        perché è necessario il monitoraggio continuo della posizione e come verranno
        utilizzati i dati. I partecipanti devono concedere all'app Samply Research
        l'autorizzazione alla posizione in background affinché il geofencing funzioni.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Posizioni definite dal ricercatore</h2>
      <p>
        Le posizioni vengono inserite direttamente dal ricercatore e si applicano
        equamente a tutti i partecipanti. Per ogni posizione fornire:
      </p>
      <dl>
        <dt>Latitudine e longitudine</dt>
        <dd>
          Il centro della zona geofenced. Dopo il salvataggio, sulla mappa appaiono dei
          marcatori che possono essere trascinati per regolare visivamente la posizione.
        </dd>
        <dt>Raggio (metri)</dt>
        <dd>
          Il confine circolare attorno al punto centrale. Il partecipante attiva la zona
          quando il GPS del suo dispositivo lo colloca entro questa distanza dal centro.
        </dd>
        <dt>Dimensione della zona di uscita (metri)</dt>
        <dd>
          Un raggio separato, di solito più grande, utilizzato per rilevare le uscite.
          Impostare una zona di uscita più ampia rispetto alla zona di ingresso riduce gli
          eventi di uscita spuri causati dalla deriva del GPS al confine.
        </dd>
        <dt>Finestra temporale minima (minuti)</dt>
        <dd>
          Il divario minimo tra due notifiche provenienti da questa zona. Impedisce trigger
          ripetuti quando un partecipante sosta nei pressi del confine e il segnale GPS
          oscilla.
        </dd>
        <dt>Trigger all'ingresso / trigger all'uscita</dt>
        <dd>Scegliere quale direzione di attraversamento attiva la notifica. È possibile abilitare entrambe.</dd>
        <dt>Nascondi notifiche ma registra eventi</dt>
        <dd>
          Non invia una notifica visibile ma scrive comunque un geofencing-event nella
          cronologia. Utilizzare questa opzione quando si desidera un registro passivo degli
          eventi di localizzazione senza interrompere il partecipante.
        </dd>
      </dl>
      <p>
        Tutte le posizioni definite dal ricercatore condividono lo stesso contenuto della
        notifica: un titolo, il testo del messaggio e l'URL del sondaggio (configurati nella
        sezione geofencing di Modifica studio). I segnaposto URL sono supportati — consultare{' '}
        <a href='/docs/placeholders'>Segnaposto URL</a> per l'elenco completo dei token.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Posizioni definite dal partecipante</h2>
      <p>
        Invece di specificare le zone personalmente, è possibile consentire ai partecipanti
        di inserire le proprie posizioni — ad esempio il proprio indirizzo di casa o il
        luogo di lavoro — direttamente nell'app Samply Research. Abilitare le posizioni
        definite dal partecipante in Modifica studio e fornire un raggio predefinito e un
        URL del sondaggio.
      </p>
      <p>
        Ogni partecipante definisce zone che sono private per lui. Le zone vengono
        registrate sul suo dispositivo e non vengono mai trasmesse al server Samply.
        Questa è la scelta appropriata per gli studi in cui la posizione di destinazione
        è personale e varia tra i partecipanti (ad es. &quot;la propria abitazione&quot;,
        &quot;il supermercato abituale&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacy e consenso</h2>
      <p>
        Il monitoraggio della posizione in background è un'autorizzazione sensibile sia su
        iOS che su Android. È necessario spiegare ai partecipanti nel campo Istruzione
        geofencing quali dati di localizzazione si raccolgono, perché e per quanto tempo
        vengono conservati. Questa spiegazione viene mostrata all'iscrizione allo studio —
        trattarla come una comunicazione di consenso informato.
      </p>
      <p>
        Proprietà chiave in materia di privacy:
      </p>
      <ul>
        <li>Samply non memorizza coordinate GPS. Solo gli eventi di ingresso/uscita e i timestamp raggiungono il server.</li>
        <li>I partecipanti possono disabilitare il monitoraggio della posizione per uno studio specifico dall'interno dell'app senza abbandonare lo studio.</li>
        <li>I partecipanti possono interrompere tutto il monitoraggio della posizione disabilitando i permessi di localizzazione per l'app Samply Research nelle impostazioni del telefono.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Eventi di geofencing nella cronologia</h2>
      <p>
        Ogni trigger di geofencing scrive un record di risultato con stato dell'evento{' '}
        <strong>geofencing-event</strong> e il timestamp dell'attraversamento. Questi record
        appaiono nel registro della cronologia dello studio accanto ai risultati delle
        notifiche pianificate e possono essere scaricati nell'esportazione CSV. L'esportazione
        include il timestamp dell'evento di geofencing nelle stesse colonne per evento delle
        notifiche di ricezione e tocco.
      </p>
      <p>
        Se è stato allegato un URL del sondaggio alla zona di geofencing, l'URL viene
        registrato nel risultato insieme all'evento — fornendo un collegamento tra il trigger
        di localizzazione e qualsiasi successivo completamento del sondaggio (tramite il
        meccanismo di <a href='/docs/reminders'>callback di completamento</a>).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Indicazioni empiriche</h2>
      <p>
        Le seguenti raccomandazioni si basano sui risultati di{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        che ha validato il geofencing di Samply in tre studi controllati con 360
        attraversamenti del recinto.
      </p>
      <dl>
        <dt>Utilizzare un raggio di almeno 100 metri</dt>
        <dd>
          Un raggio di 10 m ha causato frequenti mancati rilevamenti su Android e falsi
          allarmi su iOS. A 100 m la sensibilità si è stabilizzata su entrambe le
          piattaforme. Raggi più piccoli sono affidabili solo in ambienti aperti con un
          eccellente segnale GPS.
        </dd>
        <dt>iOS supera Android — pianificare di conseguenza</dt>
        <dd>
          I dispositivi iOS hanno mostrato una sensibilità complessiva più elevata; le
          notifiche Android tendevano ad arrivare più vicino al confine del recinto (il
          dispositivo ha attraversato di più prima che il trigger si attivasse). Se la
          popolazione dello studio è mista, riportare la piattaforma come covariata e
          considerare la stratificazione dell'analisi.
        </dd>
        <dt>Gli eventi di ingresso e di uscita si comportano diversamente</dt>
        <dd>
          Le notifiche di uscita sono state consegnate significativamente più lontano dal
          confine rispetto a quelle di ingresso — una media di 234 m vs. 87 m negli studi.
          Se il disegno dipende dalla cattura precisa del momento di uscita, impostare un
          raggio della zona di uscita più grande e trattare i timestamp degli eventi di
          uscita con maggiore tolleranza.
        </dd>
        <dt>Il tempo di sosta è importante</dt>
        <dd>
          I partecipanti che sono rimasti in un luogo per almeno 5 minuti hanno mostrato
          una sensibilità sostanzialmente più elevata rispetto a coloro che vi sono passati
          brevemente. Per esposizioni fugaci (ad es., una fermata dell'autobus), aspettarsi
          tassi di rilevamento più bassi.
        </dd>
        <dt>Ambienti boschivi e con scarsa connettività riducono la sensibilità</dt>
        <dd>
          Le aree con scarsa connettività internet (foreste dense, spazi sotterranei, zone
          rurali con segnale debole) riducono significativamente la sensibilità. L'app fa
          affidamento sul GPS assistito dalla rete per il rilevamento delle zone; senza
          connettività, gli eventi possono essere ritardati o completamente mancati.
          Comunicare questa limitazione nel protocollo dello studio.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Aspetti a cui prestare attenzione</h3>
      <dl>
        <dt>I partecipanti devono riunirsi per ricevere le modifiche alle zone</dt>
        <dd>
          Le zone geofenced vengono registrate sul dispositivo al momento in cui il
          partecipante si unisce allo studio. Se si aggiungono o modificano zone in Modifica
          studio dopo che i partecipanti si sono già iscritti, questi non riceveranno le
          zone aggiornate finché non abbandonano e si riuniscono allo studio.
        </dd>
        <dt>La precisione del GPS limita il raggio efficace</dt>
        <dd>
          La precisione del GPS in ambiente urbano è tipicamente di 5–20 metri; in interni
          o in aree dense può superare i 50 metri. Impostare raggi più grandi della
          precisione richiesta per evitare trigger mancati. L'impostazione della zona di
          uscita compensa le oscillazioni al confine.
        </dd>
        <dt>L'autorizzazione alla posizione in background può essere revocata</dt>
        <dd>
          iOS e Android possono revocare in qualsiasi momento l'autorizzazione alla
          posizione in background — dopo un aggiornamento del sistema operativo, dopo il
          riavvio del dispositivo o se l'utente modifica le impostazioni dell'app. Il
          geofencing smette di funzionare silenziosamente quando manca l'autorizzazione.
          Ricordare ai partecipanti nelle istruzioni dello studio di mantenere attiva la
          localizzazione in background.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentFr() {
  return (
    <>
      <p>
        Le geofencing permet à Samply d&apos;envoyer automatiquement une notification et
        d&apos;ouvrir un questionnaire lorsqu&apos;un participant entre dans une zone
        géographique définie ou en sort — un lieu de travail, un supermarché, un quartier
        résidentiel. Le déclencheur est l&apos;événement de localisation lui-même, et non
        une heure de l&apos;horloge.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          L&apos;implémentation du geofencing dans Samply est décrite et validée empiriquement dans un article évalué par des pairs dans <em>Behavior Research Methods</em> :
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Trois études contrôlées utilisant l&apos;application Samply ont produit une sensibilité globale des notifications de{' '}
          <strong style={{ color: 'var(--ink)' }}>82,5 %</strong> sur 360 franchissements de clôture. L&apos;article fournit des recommandations empiriques sur le choix du rayon, les différences entre plateformes et les facteurs environnementaux — les recommandations ci-dessous sont tirées de ce travail.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Fonctionnement du geofencing</h2>
      <p>
        Une fois qu&apos;un participant rejoint une étude avec le geofencing activé,
        l&apos;application Samply Research enregistre les zones geofencées sur l&apos;appareil
        et commence à surveiller la localisation en arrière-plan — même lorsque
        l&apos;application est fermée. Lorsque l&apos;appareil détecte que le participant est
        entré dans une zone ou en est sorti, l&apos;application envoie une notification locale
        et enregistre un <strong>geofencing-event</strong> dans l&apos;historique de l&apos;étude.
      </p>
      <p>
        Le traitement de la localisation s&apos;effectue entièrement sur l&apos;appareil du
        participant. Samply ne reçoit jamais de coordonnées GPS brutes. Le serveur enregistre
        uniquement qu&apos;un événement de geofencing s&apos;est produit (entrée ou sortie)
        ainsi que l&apos;horodatage. Les chercheurs voient l&apos;événement dans le journal
        d&apos;historique, mais pas la position absolue.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Activer le geofencing</h2>
      <p>
        Ouvrez <strong>Modifier l&apos;étude</strong> et activez{' '}
        <strong>Activer le Geofencing</strong>. Deux panneaux de configuration apparaissent :
        l&apos;un pour les emplacements définis par le chercheur et l&apos;autre pour les
        emplacements définis par le participant. Vous pouvez utiliser l&apos;un ou l&apos;autre,
        ou les deux.
      </p>
      <p>
        Avant d&apos;enregistrer, remplissez le champ{' '}
        <strong>Instruction geofencing</strong>. Ce texte est affiché aux participants
        lorsqu&apos;ils rejoignent l&apos;étude, expliquant pourquoi un suivi continu de la
        localisation est nécessaire et comment vous utiliserez les données. Les participants
        doivent accorder à l&apos;application Samply Research la permission de localisation en
        arrière-plan pour que le geofencing fonctionne.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Emplacements définis par le chercheur</h2>
      <p>
        Saisissez vous-même les emplacements — ils s&apos;appliquent à tous les participants de
        la même façon. Pour chaque emplacement, fournissez :
      </p>
      <dl>
        <dt>Latitude et longitude</dt>
        <dd>
          Le centre de la zone geofencée. Après l&apos;enregistrement, des marqueurs
          apparaissent sur une carte et peuvent être déplacés pour ajuster visuellement la
          position.
        </dd>
        <dt>Rayon (mètres)</dt>
        <dd>
          La limite circulaire autour du point central. La zone est déclenchée lorsque le GPS
          de l&apos;appareil du participant le place à moins de cette distance du centre.
        </dd>
        <dt>Taille de la zone de sortie (mètres)</dt>
        <dd>
          Un rayon séparé, généralement plus grand, utilisé pour détecter les sorties.
          Définir une zone de sortie plus grande que la zone d&apos;entrée réduit les faux
          événements de sortie causés par la dérive GPS à la limite.
        </dd>
        <dt>Fenêtre temporelle minimale (minutes)</dt>
        <dd>
          L&apos;intervalle minimal entre deux notifications provenant de cette zone. Évite
          les déclenchements répétés lorsqu&apos;un participant s&apos;attarde près de la
          limite et que le signal GPS oscille.
        </dd>
        <dt>Déclencher à l&apos;entrée / déclencher à la sortie</dt>
        <dd>Choisissez quelle direction de franchissement déclenche la notification. Vous pouvez activer les deux.</dd>
        <dt>Masquer les notifications mais enregistrer les événements</dt>
        <dd>
          N&apos;envoie aucune notification visible mais écrit tout de même un
          geofencing-event dans l&apos;historique. Utilisez cette option lorsque vous
          souhaitez un enregistrement passif des événements de localisation sans interrompre
          le participant.
        </dd>
      </dl>
      <p>
        Tous les emplacements définis par le chercheur partagent le même contenu de
        notification : un titre, un corps de message et une URL de questionnaire (configurés
        dans la section geofencing de Modifier l&apos;étude). Les paramètres URL sont pris en
        charge — consultez <a href='/docs/placeholders'>Paramètres URL</a> pour la liste
        complète des paramètres.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Emplacements définis par le participant</h2>
      <p>
        Plutôt que de spécifier vous-même les zones, vous pouvez laisser les participants
        saisir leurs propres emplacements — par exemple leur adresse personnelle ou leur lieu
        de travail — directement dans l&apos;application Samply Research. Activez les
        emplacements définis par le participant dans Modifier l&apos;étude et fournissez un
        rayon par défaut et une URL de questionnaire.
      </p>
      <p>
        Chaque participant définit des zones qui lui sont privées. Les zones sont enregistrées
        sur son appareil et ne sont jamais transmises au serveur Samply. C&apos;est le choix
        approprié pour les études où l&apos;emplacement cible est personnel et varie d&apos;un
        participant à l&apos;autre (p. ex. &quot;votre domicile&quot;,
        &quot;votre supermarché habituel&quot;).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Confidentialité et consentement</h2>
      <p>
        Le suivi de la localisation en arrière-plan est une autorisation sensible sur iOS et
        Android. Vous devez expliquer aux participants dans le champ Instruction geofencing
        quelles données de localisation vous collectez, pourquoi et pendant combien de temps
        elles sont conservées. Cette explication est affichée lors de l&apos;inscription à
        l&apos;étude — traitez-la comme une divulgation de consentement éclairé.
      </p>
      <p>
        Propriétés clés en matière de confidentialité :
      </p>
      <ul>
        <li>Samply ne stocke pas de coordonnées GPS. Seuls les événements d&apos;entrée/sortie et les horodatages parviennent au serveur.</li>
        <li>Les participants peuvent désactiver le suivi de localisation pour une étude spécifique depuis l&apos;application sans quitter l&apos;étude.</li>
        <li>Les participants peuvent arrêter tout suivi de localisation en désactivant les autorisations de localisation pour l&apos;application Samply Research dans les paramètres de leur téléphone.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Événements de geofencing dans l&apos;historique</h2>
      <p>
        Chaque déclenchement de geofencing écrit un enregistrement de résultat avec le statut
        d&apos;événement <strong>geofencing-event</strong> et l&apos;horodatage du
        franchissement. Ces enregistrements apparaissent dans le journal d&apos;historique de
        l&apos;étude aux côtés des résultats des notifications planifiées et peuvent être
        téléchargés dans l&apos;export CSV. L&apos;export inclut l&apos;horodatage de
        l&apos;événement de geofencing dans les mêmes colonnes par événement que les événements
        de réception et d&apos;appui des notifications.
      </p>
      <p>
        Si vous avez associé une URL de questionnaire à la zone de geofencing, l&apos;URL est
        enregistrée dans le résultat avec l&apos;événement — vous fournissant un lien entre le
        déclencheur de localisation et tout achèvement ultérieur du questionnaire (via le
        mécanisme de <a href='/docs/reminders'>rappel d&apos;achèvement</a>).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Recommandations empiriques</h2>
      <p>
        Les recommandations suivantes sont fondées sur les résultats de{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        qui ont validé le geofencing de Samply dans trois études contrôlées portant sur 360
        franchissements de clôture.
      </p>
      <dl>
        <dt>Utiliser un rayon d&apos;au moins 100 mètres</dt>
        <dd>
          Un rayon de 10 m a provoqué des manques fréquents sur Android et de fausses alertes
          sur iOS. À 100 m, la sensibilité s&apos;est stabilisée sur les deux plateformes. Les
          rayons plus petits ne sont fiables que dans des environnements à ciel ouvert avec un
          excellent signal GPS.
        </dd>
        <dt>iOS surpasse Android — planifiez en conséquence</dt>
        <dd>
          Les appareils iOS ont montré une sensibilité globale plus élevée ; les notifications
          Android tendaient à arriver plus près de la limite de la clôture (l&apos;appareil
          avait franchi plus loin avant que le déclencheur s&apos;active). Si la population de
          votre étude est mixte, rapportez la plateforme comme covariable et envisagez de
          stratifier votre analyse.
        </dd>
        <dt>Les événements d&apos;entrée et de sortie se comportent différemment</dt>
        <dd>
          Les notifications de sortie ont été délivrées significativement plus loin de la
          limite que les notifications d&apos;entrée — une moyenne de 234 m contre 87 m dans
          les études. Si votre protocole dépend de la capture précise du moment de sortie,
          définissez un rayon de zone de sortie plus grand et traitez les horodatages
          d&apos;événements de sortie avec plus de tolérance.
        </dd>
        <dt>Le temps de séjour est important</dt>
        <dd>
          Les participants ayant séjourné au moins 5 minutes sur un emplacement ont montré une
          sensibilité nettement plus élevée que ceux qui n&apos;y sont passés que brièvement.
          Pour les expositions fugaces (p. ex. un arrêt de bus), attendez-vous à des taux de
          détection plus faibles.
        </dd>
        <dt>Les environnements forestiers et à faible connectivité réduisent la sensibilité</dt>
        <dd>
          Les zones à faible connectivité internet (forêts denses, espaces souterrains, zones
          rurales avec faible signal) réduisent significativement la sensibilité.
          L&apos;application s&apos;appuie sur le GPS assisté par le réseau pour la détection
          des zones ; sans connectivité, les événements peuvent être retardés ou complètement
          manqués. Signalez cette limitation dans votre protocole d&apos;étude.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Points de vigilance</h3>
      <dl>
        <dt>Les participants doivent rejoindre l&apos;étude à nouveau pour récupérer les modifications de zones</dt>
        <dd>
          Les zones geofencées sont enregistrées sur l&apos;appareil au moment où le
          participant rejoint l&apos;étude. Si vous ajoutez ou modifiez des zones dans
          Modifier l&apos;étude après que les participants se sont déjà inscrits, ils ne
          recevront pas les zones mises à jour avant d&apos;avoir quitté puis rejoint
          l&apos;étude.
        </dd>
        <dt>La précision GPS limite le rayon effectif</dt>
        <dd>
          La précision GPS en milieu urbain est typiquement de 5 à 20 mètres ; en intérieur
          ou dans des zones denses, elle peut dépasser 50 mètres. Définissez des rayons plus
          grands que la précision requise pour éviter les déclenchements manqués. Le paramètre
          de zone de sortie compense les oscillations à la limite.
        </dd>
        <dt>L&apos;autorisation de localisation en arrière-plan peut être révoquée</dt>
        <dd>
          iOS et Android peuvent révoquer l&apos;autorisation de localisation en arrière-plan
          à tout moment — après une mise à jour du système d&apos;exploitation, après un
          redémarrage de l&apos;appareil ou si l&apos;utilisateur modifie les paramètres de
          l&apos;application. Le geofencing cesse silencieusement de fonctionner lorsque
          l&apos;autorisation est manquante. Rappelez aux participants dans les instructions
          de votre étude de maintenir la localisation en arrière-plan activée.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentEs() {
  return (
    <>
      <p>
        El geofencing permite a Samply enviar automáticamente una notificación y abrir una
        encuesta cuando un participante entra en una zona geográfica definida o sale de ella
        — un lugar de trabajo, un supermercado, un barrio residencial. El disparador es el
        propio evento de localización, no una hora del reloj.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          La implementación del geofencing en Samply está descrita y validada empíricamente en un artículo revisado por pares en <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Tres estudios controlados con la aplicación Samply produjeron una sensibilidad global de notificaciones del{' '}
          <strong style={{ color: 'var(--ink)' }}>82,5 %</strong> en 360 cruces de valla. El artículo ofrece orientación empírica sobre la selección del radio, las diferencias entre plataformas y los factores ambientales — las recomendaciones siguientes se basan en este trabajo.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Cómo funciona el geofencing</h2>
      <p>
        Una vez que un participante se une a un estudio con el geofencing activado, la aplicación
        Samply Research registra las zonas geofencadas en el dispositivo y comienza a monitorear
        la localización en segundo plano — incluso cuando la aplicación está cerrada. Cuando el
        dispositivo detecta que el participante ha entrado en una zona o ha salido de ella, la
        aplicación envía una notificación local y registra un <strong>geofencing-event</strong>
        en el historial del estudio.
      </p>
      <p>
        El procesamiento de la localización se realiza completamente en el dispositivo del
        participante. Samply nunca recibe coordenadas GPS brutas. El servidor solo registra
        que ocurrió un evento de geofencing (entrada o salida) junto con la marca de tiempo.
        Los investigadores ven el evento en el registro de historial, pero no la posición absoluta.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Activar el geofencing</h2>
      <p>
        Abra <strong>Editar estudio</strong> y active{' '}
        <strong>Activar Geofencing</strong>. Aparecen dos paneles de configuración:
        uno para las ubicaciones definidas por el investigador y otro para las ubicaciones
        definidas por el participante. Puede usar uno u otro, o ambos.
      </p>
      <p>
        Antes de guardar, rellene el campo{' '}
        <strong>Instrucción de geofencing</strong>. Este texto se muestra a los participantes
        cuando se unen al estudio, explicando por qué se necesita el seguimiento continuo de
        localización y cómo usará los datos. Los participantes deben conceder a la aplicación
        Samply Research el permiso de localización en segundo plano para que el geofencing funcione.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Ubicaciones definidas por el investigador</h2>
      <p>
        Introduzca usted mismo las ubicaciones — se aplican a todos los participantes de la
        misma manera. Para cada ubicación, proporcione:
      </p>
      <dl>
        <dt>Latitud y longitud</dt>
        <dd>
          El centro de la zona geofencada. Tras guardar, aparecen marcadores en un mapa y
          pueden arrastrarse para ajustar visualmente la posición.
        </dd>
        <dt>Radio (metros)</dt>
        <dd>
          El límite circular alrededor del punto central. La zona se activa cuando el GPS del
          dispositivo del participante lo sitúa a menos de esa distancia del centro.
        </dd>
        <dt>Tamaño de la zona de salida (metros)</dt>
        <dd>
          Un radio separado, generalmente mayor, usado para detectar salidas. Definir una zona
          de salida más grande que la zona de entrada reduce los falsos eventos de salida
          causados por la deriva del GPS en el límite.
        </dd>
        <dt>Ventana de tiempo mínima (minutos)</dt>
        <dd>
          El intervalo mínimo entre dos notificaciones de esta zona. Evita activaciones
          repetidas cuando un participante permanece cerca del límite y la señal GPS oscila.
        </dd>
        <dt>Disparar en la entrada / disparar en la salida</dt>
        <dd>Elija qué dirección de cruce activa la notificación. Puede activar ambas.</dd>
        <dt>Ocultar notificaciones pero registrar eventos</dt>
        <dd>
          No envía ninguna notificación visible pero igualmente escribe un geofencing-event
          en el historial. Use esta opción cuando desee un registro pasivo de eventos de
          localización sin interrumpir al participante.
        </dd>
      </dl>
      <p>
        Todas las ubicaciones definidas por el investigador comparten el mismo contenido de
        notificación: un título, un cuerpo de mensaje y una URL de encuesta (configurados en
        la sección de geofencing de Editar estudio). Se admiten marcadores de URL — consulte{' '}
        <a href='/docs/placeholders'>Marcadores de URL</a> para la lista completa.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Ubicaciones definidas por el participante</h2>
      <p>
        En lugar de especificar usted mismo las zonas, puede dejar que los participantes
        introduzcan sus propias ubicaciones — por ejemplo, su domicilio o lugar de trabajo —
        directamente en la aplicación Samply Research. Active las ubicaciones definidas por
        el participante en Editar estudio y proporcione un radio predeterminado y una URL de
        encuesta.
      </p>
      <p>
        Cada participante define zonas que son privadas para él. Las zonas se almacenan en
        su dispositivo y nunca se transmiten al servidor de Samply. Esta es la opción adecuada
        para estudios donde la ubicación objetivo es personal y varía de un participante a otro
        (p. ej. «su domicilio», «su supermercado habitual»).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacidad y consentimiento</h2>
      <p>
        El seguimiento de localización en segundo plano es un permiso sensible en iOS y Android.
        Debe explicar a los participantes en el campo de Instrucción de geofencing qué datos de
        localización recopila, por qué y durante cuánto tiempo se conservan. Esta explicación se
        muestra durante el registro en el estudio — trátela como una divulgación de consentimiento
        informado.
      </p>
      <p>
        Propiedades clave de privacidad:
      </p>
      <ul>
        <li>Samply no almacena coordenadas GPS. Solo los eventos de entrada/salida y las marcas de tiempo llegan al servidor.</li>
        <li>Los participantes pueden desactivar el seguimiento de localización para un estudio específico desde la aplicación sin abandonar el estudio.</li>
        <li>Los participantes pueden detener todo seguimiento de localización desactivando los permisos de localización para la aplicación Samply Research en la configuración de su teléfono.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Eventos de geofencing en el historial</h2>
      <p>
        Cada activación de geofencing escribe un registro de resultado con el estado de evento
        <strong>geofencing-event</strong> y la marca de tiempo del cruce. Estos registros
        aparecen en el registro de historial del estudio junto a los resultados de las
        notificaciones programadas y pueden descargarse en la exportación CSV. La exportación
        incluye la marca de tiempo del evento de geofencing en las mismas columnas por evento
        que los eventos de recepción y toque de notificaciones.
      </p>
      <p>
        Si ha asociado una URL de encuesta a la zona de geofencing, la URL queda registrada en
        el resultado junto con el evento — proporcionándole un vínculo entre el disparador de
        localización y cualquier finalización posterior de la encuesta (a través del mecanismo
        de <a href='/docs/reminders'>recordatorio de finalización</a>).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Recomendaciones empíricas</h2>
      <p>
        Las siguientes recomendaciones se basan en los resultados de{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        que validaron el geofencing de Samply en tres estudios controlados con 360 cruces de valla.
      </p>
      <dl>
        <dt>Usar un radio de al menos 100 metros</dt>
        <dd>
          Un radio de 10 m causó fallos frecuentes en Android y falsas alertas en iOS. A 100 m,
          la sensibilidad se estabilizó en ambas plataformas. Los radios más pequeños solo son
          fiables en entornos abiertos con excelente señal GPS.
        </dd>
        <dt>iOS supera a Android — planifique en consecuencia</dt>
        <dd>
          Los dispositivos iOS mostraron una sensibilidad global más alta; las notificaciones de
          Android tendían a llegar más cerca del límite de la valla (el dispositivo había cruzado
          más lejos antes de que se activara el disparador). Si la población de su estudio es
          mixta, registre la plataforma como covariable y considere estratificar su análisis.
        </dd>
        <dt>Los eventos de entrada y salida se comportan de forma diferente</dt>
        <dd>
          Las notificaciones de salida se entregaron significativamente más lejos del límite que
          las de entrada — una media de 234 m frente a 87 m en los estudios. Si su protocolo
          depende de capturar el momento de salida con precisión, defina un radio de zona de
          salida más grande y trate las marcas de tiempo de los eventos de salida con mayor
          tolerancia.
        </dd>
        <dt>El tiempo de permanencia importa</dt>
        <dd>
          Los participantes que permanecieron al menos 5 minutos en una ubicación mostraron una
          sensibilidad notablemente más alta que los que solo pasaron brevemente. Para exposiciones
          fugaces (p. ej. una parada de autobús), espere tasas de detección más bajas.
        </dd>
        <dt>Los entornos forestales y de baja conectividad reducen la sensibilidad</dt>
        <dd>
          Las zonas con baja conectividad a internet (bosques densos, espacios subterráneos,
          áreas rurales con señal débil) reducen significativamente la sensibilidad. La
          aplicación depende del GPS asistido por red para la detección de zonas; sin
          conectividad, los eventos pueden retrasarse o perderse por completo. Indique esta
          limitación en el protocolo de su estudio.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Aspectos a vigilar</h3>
      <dl>
        <dt>Los participantes deben volver a unirse al estudio para recibir los cambios de zonas</dt>
        <dd>
          Las zonas geofencadas se registran en el dispositivo cuando el participante se une al
          estudio. Si añade o modifica zonas en Editar estudio después de que los participantes
          ya se hayan inscrito, no recibirán las zonas actualizadas hasta que abandonen y vuelvan
          a unirse al estudio.
        </dd>
        <dt>La precisión del GPS limita el radio efectivo</dt>
        <dd>
          La precisión del GPS en entornos urbanos es típicamente de 5 a 20 metros; en interiores
          o en zonas densas puede superar los 50 metros. Defina radios más grandes que la precisión
          requerida para evitar activaciones perdidas. El parámetro de zona de salida compensa las
          oscilaciones en el límite.
        </dd>
        <dt>El permiso de localización en segundo plano puede ser revocado</dt>
        <dd>
          iOS y Android pueden revocar el permiso de localización en segundo plano en cualquier
          momento — tras una actualización del sistema operativo, tras un reinicio del dispositivo
          o si el usuario cambia la configuración de la aplicación. El geofencing deja de funcionar
          silenciosamente cuando falta el permiso. Recuerde a los participantes en las instrucciones
          de su estudio que mantengan la localización en segundo plano activada.
        </dd>
      </dl>
    </>
  );
}

function GeofencingContentPt() {
  return (
    <>
      <p>
        O geofencing permite ao Samply enviar automaticamente uma notificação e abrir uma
        pesquisa quando um participante entra em uma zona geográfica definida ou sai dela
        — um local de trabalho, um supermercado, um bairro residencial. O gatilho é o
        próprio evento de localização, não um horário do relógio.
      </p>

      {/* ── Published research ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--coral-soft)', borderLeft: '3px solid var(--coral)', borderRadius: '0 0.8rem 0.8rem 0', padding: '1.4rem 1.6rem', margin: '0.4rem 0 2.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '0.7rem' }}>Published research</div>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}>
          A implementação do geofencing no Samply está descrita e validada empiricamente em um artigo revisado por pares na <em>Behavior Research Methods</em>:
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>
          Shevchenko, Y., &amp; Reips, U.-D. (2024). Geofencing in location-based behavioral research: Methodology, challenges, and implementation. <em>Behavior Research Methods</em>, 56, 6411–6439.
        </p>
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer' style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--coral)', wordBreak: 'break-all' }}>https://doi.org/10.3758/s13428-023-02213-2</a>
        <p style={{ margin: '1rem 0 0', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--ink-60)' }}>
          Três estudos controlados com o aplicativo Samply produziram uma sensibilidade global de notificações de{' '}
          <strong style={{ color: 'var(--ink)' }}>82,5%</strong> em 360 cruzamentos de cerca. O artigo oferece orientação empírica sobre a seleção do raio, as diferenças entre plataformas e os fatores ambientais — as recomendações a seguir são baseadas neste trabalho.
        </p>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <h2>Como funciona o geofencing</h2>
      <p>
        Assim que um participante entra em um estudo com o geofencing ativado, o aplicativo
        Samply Research registra as zonas de geofencing no dispositivo e começa a monitorar
        a localização em segundo plano — mesmo quando o aplicativo está fechado. Quando o
        dispositivo detecta que o participante entrou em uma zona ou saiu dela, o aplicativo
        envia uma notificação local e registra um <strong>geofencing-event</strong>
        no histórico do estudo.
      </p>
      <p>
        O processamento da localização é feito completamente no dispositivo do
        participante. O Samply nunca recebe coordenadas GPS brutas. O servidor apenas registra
        que ocorreu um evento de geofencing (entrada ou saída) junto com o carimbo de data/hora.
        Os pesquisadores veem o evento no registro de histórico, mas não a posição absoluta.
      </p>

      {/* ── Enabling ──────────────────────────────────────────────────────── */}
      <h2>Ativar o geofencing</h2>
      <p>
        Abra <strong>Editar estudo</strong> e ative{' '}
        <strong>Ativar Geofencing</strong>. Dois painéis de configuração aparecem:
        um para as localizações definidas pelo pesquisador e outro para as localizações
        definidas pelo participante. Você pode usar um ou outro, ou ambos.
      </p>
      <p>
        Antes de salvar, preencha o campo{' '}
        <strong>Instrução de geofencing</strong>. Este texto é exibido aos participantes
        quando entram no estudo, explicando por que o rastreamento contínuo de
        localização é necessário e como você usará os dados. Os participantes devem conceder ao aplicativo
        Samply Research a permissão de localização em segundo plano para que o geofencing funcione.
      </p>

      {/* ── Researcher-defined locations ──────────────────────────────────── */}
      <h2>Localizações definidas pelo pesquisador</h2>
      <p>
        Você mesmo insere as localizações — elas se aplicam a todos os participantes da
        mesma maneira. Para cada localização, forneça:
      </p>
      <dl>
        <dt>Latitude e longitude</dt>
        <dd>
          O centro da zona de geofencing. Após salvar, marcadores aparecem em um mapa e
          podem ser arrastados para ajustar visualmente a posição.
        </dd>
        <dt>Raio (metros)</dt>
        <dd>
          O limite circular em torno do ponto central. A zona é ativada quando o GPS do
          dispositivo do participante o posiciona a menos dessa distância do centro.
        </dd>
        <dt>Tamanho da zona de saída (metros)</dt>
        <dd>
          Um raio separado, geralmente maior, usado para detectar saídas. Definir uma zona
          de saída maior que a zona de entrada reduz falsos eventos de saída
          causados pela deriva do GPS no limite.
        </dd>
        <dt>Janela de tempo mínima (minutos)</dt>
        <dd>
          O intervalo mínimo entre duas notificações desta zona. Evita ativações
          repetidas quando um participante permanece próximo ao limite e o sinal GPS oscila.
        </dd>
        <dt>Disparar na entrada / disparar na saída</dt>
        <dd>Escolha qual direção de cruzamento ativa a notificação. Você pode ativar ambas.</dd>
        <dt>Ocultar notificações mas registrar eventos</dt>
        <dd>
          Não envia nenhuma notificação visível, mas ainda assim grava um geofencing-event
          no histórico. Use esta opção quando quiser um registro passivo de eventos de
          localização sem interromper o participante.
        </dd>
      </dl>
      <p>
        Todas as localizações definidas pelo pesquisador compartilham o mesmo conteúdo de
        notificação: um título, um corpo de mensagem e uma URL de pesquisa (configurados na
        seção de geofencing de Editar estudo). Marcadores de URL são suportados — consulte{' '}
        <a href='/docs/placeholders'>Marcadores de URL</a> para a lista completa.
      </p>

      {/* ── Participant-defined locations ─────────────────────────────────── */}
      <h2>Localizações definidas pelo participante</h2>
      <p>
        Em vez de especificar você mesmo as zonas, você pode deixar que os participantes
        insiram suas próprias localizações — por exemplo, sua residência ou local de trabalho —
        diretamente no aplicativo Samply Research. Ative as localizações definidas pelo
        participante em Editar estudo e forneça um raio padrão e uma URL de pesquisa.
      </p>
      <p>
        Cada participante define zonas que são privadas para ele. As zonas são armazenadas em
        seu dispositivo e nunca são transmitidas ao servidor do Samply. Esta é a opção adequada
        para estudos onde a localização-alvo é pessoal e varia de participante para participante
        (ex.: «sua residência», «seu supermercado habitual»).
      </p>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <h2>Privacidade e consentimento</h2>
      <p>
        O rastreamento de localização em segundo plano é uma permissão sensível no iOS e Android.
        Você deve explicar aos participantes no campo de Instrução de geofencing quais dados de
        localização coleta, por que e por quanto tempo são retidos. Essa explicação é
        exibida durante o registro no estudo — trate-a como uma divulgação de consentimento
        informado.
      </p>
      <p>
        Propriedades-chave de privacidade:
      </p>
      <ul>
        <li>O Samply não armazena coordenadas GPS. Apenas os eventos de entrada/saída e os carimbos de data/hora chegam ao servidor.</li>
        <li>Os participantes podem desativar o rastreamento de localização para um estudo específico no aplicativo sem sair do estudo.</li>
        <li>Os participantes podem parar todo o rastreamento de localização desativando as permissões de localização para o aplicativo Samply Research nas configurações do seu telefone.</li>
      </ul>

      {/* ── History and data ──────────────────────────────────────────────── */}
      <h2>Eventos de geofencing no histórico</h2>
      <p>
        Cada ativação de geofencing grava um registro de resultado com o status de evento
        <strong>geofencing-event</strong> e o carimbo de data/hora do cruzamento. Esses registros
        aparecem no registro de histórico do estudo junto aos resultados das
        notificações agendadas e podem ser baixados na exportação CSV. A exportação
        inclui o carimbo de data/hora do evento de geofencing nas mesmas colunas por evento
        que os eventos de recebimento e toque de notificações.
      </p>
      <p>
        Se você associou uma URL de pesquisa à zona de geofencing, a URL fica registrada no
        resultado junto com o evento — fornecendo um vínculo entre o gatilho de
        localização e qualquer conclusão posterior da pesquisa (por meio do mecanismo
        de <a href='/docs/reminders'>lembrete de conclusão</a>).
      </p>

      {/* ── Empirical guidance ────────────────────────────────────────────── */}
      <h2>Recomendações empíricas</h2>
      <p>
        As recomendações a seguir são baseadas nos resultados de{' '}
        <a href='https://doi.org/10.3758/s13428-023-02213-2' target='_blank' rel='noopener noreferrer'>Shevchenko &amp; Reips (2024)</a>,
        que validaram o geofencing do Samply em três estudos controlados com 360 cruzamentos de cerca.
      </p>
      <dl>
        <dt>Usar um raio de pelo menos 100 metros</dt>
        <dd>
          Um raio de 10 m causou falhas frequentes no Android e alertas falsos no iOS. A 100 m,
          a sensibilidade se estabilizou em ambas as plataformas. Raios menores só são
          confiáveis em ambientes abertos com excelente sinal GPS.
        </dd>
        <dt>iOS supera o Android — planeje adequadamente</dt>
        <dd>
          Os dispositivos iOS mostraram sensibilidade global mais alta; as notificações do
          Android tendiam a chegar mais próximas do limite da cerca (o dispositivo havia cruzado
          mais longe antes de o gatilho ser ativado). Se a população do seu estudo é
          mista, registre a plataforma como covariável e considere estratificar sua análise.
        </dd>
        <dt>Os eventos de entrada e saída se comportam de forma diferente</dt>
        <dd>
          As notificações de saída foram entregues significativamente mais longe do limite do que
          as de entrada — uma média de 234 m versus 87 m nos estudos. Se o seu protocolo
          depende de capturar o momento de saída com precisão, defina um raio de zona de
          saída maior e trate os carimbos de data/hora dos eventos de saída com maior
          tolerância.
        </dd>
        <dt>O tempo de permanência importa</dt>
        <dd>
          Os participantes que permaneceram pelo menos 5 minutos em uma localização mostraram
          sensibilidade notavelmente maior do que os que apenas passaram brevemente. Para exposições
          fugaces (ex.: uma parada de ônibus), espere taxas de detecção mais baixas.
        </dd>
        <dt>Ambientes florestais e de baixa conectividade reduzem a sensibilidade</dt>
        <dd>
          Zonas com baixa conectividade à internet (florestas densas, espaços subterrâneos,
          áreas rurais com sinal fraco) reduzem significativamente a sensibilidade. O
          aplicativo depende do GPS assistido por rede para a detecção de zonas; sem
          conectividade, os eventos podem ser atrasados ou perdidos completamente. Indique esta
          limitação no protocolo do seu estudo.
        </dd>
      </dl>

      {/* ── Common mistakes ───────────────────────────────────────────────── */}
      <h3>Aspectos a observar</h3>
      <dl>
        <dt>Os participantes devem entrar novamente no estudo para receber as alterações de zonas</dt>
        <dd>
          As zonas de geofencing são registradas no dispositivo quando o participante entra no
          estudo. Se você adicionar ou modificar zonas em Editar estudo depois de os participantes
          já terem se inscrito, eles não receberão as zonas atualizadas até que saiam e entrem
          novamente no estudo.
        </dd>
        <dt>A precisão do GPS limita o raio efetivo</dt>
        <dd>
          A precisão do GPS em ambientes urbanos é tipicamente de 5 a 20 metros; em ambientes
          internos ou em zonas densas pode ultrapassar 50 metros. Defina raios maiores do que a precisão
          necessária para evitar ativações perdidas. O parâmetro de zona de saída compensa as
          oscilações no limite.
        </dd>
        <dt>A permissão de localização em segundo plano pode ser revogada</dt>
        <dd>
          iOS e Android podem revogar a permissão de localização em segundo plano a qualquer
          momento — após uma atualização do sistema operacional, após uma reinicialização do dispositivo
          ou se o usuário alterar as configurações do aplicativo. O geofencing para de funcionar
          silenciosamente quando a permissão está ausente. Lembre aos participantes nas instruções
          do seu estudo que mantenham a localização em segundo plano ativada.
        </dd>
      </dl>
    </>
  );
}
