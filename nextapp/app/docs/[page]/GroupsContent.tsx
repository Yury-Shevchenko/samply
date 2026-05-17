import type { Locale } from "@/lib/i18n";

function GroupsContentEn() {
  return (
    <>
      <p>
        A group is a named subset of participants who receive notifications in lockstep.
        When a schedule targets a group, Samply fires the notification to every member at the
        same moment — a <strong>yoked design</strong>. This makes groups suitable for dyadic
        studies (couples, peers), team research, or any protocol where within-group
        synchronisation is essential. Each participant belongs to at most one group.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Creating a group</h2>
      <p>
        Groups must be created by the researcher before scheduling. Go to your study, open
        the <strong>Participants</strong> tab, and click <strong>Manage groups</strong>. Enter
        a group name and select participants from the list — only participants not already in
        a group appear. Click <strong>Create group</strong> to assign all selected participants
        at once.
      </p>
      <p>
        Samply generates a short <strong>ID</strong> for each group automatically. This ID
        is used in the <code>%GROUP_ID%</code> URL placeholder and in the scheduled queue.
        The name is visible only to researchers in the dashboard; participants never see it.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Yoked timing</h2>
      <p>
        All members of a group receive the same notification at the same fire time. Samply
        writes one queue row per group at a shared <em>Scheduled for</em> timestamp and
        delivers it to every member simultaneously. There is no per-member offset within a
        group send.
      </p>
      <p>
        For personal schedules (Day N after registration), Samply uses the join date of the{' '}
        <em>most recently enrolled</em> group member as the shared anchor. This means every
        member shares the same Day 1 regardless of when they individually joined —
        intentional for cohort designs where you want the group to move through the protocol
        together from a single reference date. If you need each participant on their own
        personal timeline, target them individually rather than as a group.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Targeting groups in a schedule</h2>
      <p>
        In Step 2 (Participants) of the schedule form, choose <strong>Groups</strong> as the
        audience and select which group or groups to target. Only participants assigned to
        the chosen group(s) at the moment you click <strong>Schedule notifications</strong>{' '}
        receive sends from that schedule. Participants who join the group later are included
        in subsequent sends — the group membership is re-evaluated at each fire time.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Deleting a group</h2>
      <p>
        Click <strong>Delete</strong> on the group row in the Groups tab. This clears the
        group assignment from every member — participants remain in the study and continue
        receiving any non-group-targeted notifications. They become eligible to be added to
        a new group.
      </p>
      <p>
        Deleting a group removes the group assignment from every member. Pending notifications
        targeted at that group will not be delivered — at fire time, participants are no longer
        members of the group, so they are skipped.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Passing the group to your survey tool</h2>
      <p>
        Add <code>%GROUP_ID%</code> to your notification Web Link to include each
        participant's group in the survey URL automatically. Samply substitutes the
        four-character group ID at send time. If a participant has no group,{' '}
        <code>%GROUP_ID%</code> is left unreplaced — your survey tool receives the literal
        string, so handle this in your survey logic if group membership is not guaranteed
        for all participants.
      </p>
      <p>
        See <a href='/docs/placeholders'>URL placeholders</a> for the full list of available
        tokens and how substitution works.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Groups vs participant codes</h2>
      <dl>
        <dt>Use groups when</dt>
        <dd>
          You want yoked, synchronised sends to a cohort, or need to route different subsets
          to different notification schedules. Groups are first-class citizens in the schedule
          form and determine who receives which notifications.
        </dd>
        <dt>Use participant codes when</dt>
        <dd>
          You need to match Samply participants to records in an external system (REDCap
          record IDs, institutional IDs, pre-assigned codes). Codes are per-person identifiers,
          not grouping mechanisms. A participant can have both a code and a group.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentDe() {
  return (
    <>
      <p>
        Eine Gruppe ist eine benannte Teilmenge von Teilnehmern, die Benachrichtigungen im Gleichschritt
        erhalten. Wenn ein Zeitplan eine Gruppe anspricht, löst Samply die Benachrichtigung für jedes
        Mitglied zum gleichen Zeitpunkt aus — ein <strong>gekoppeltes Design</strong>. Damit eignen sich
        Gruppen für dyadische Studien (Paare, Gleichaltrige), Teamforschung oder jedes Protokoll, bei dem
        die Synchronisation innerhalb der Gruppe wesentlich ist. Jeder Teilnehmer gehört zu höchstens
        einer Gruppe.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Eine Gruppe erstellen</h2>
      <p>
        Gruppen müssen vom Forscher vor der Planung erstellt werden. Gehen Sie zu Ihrer Studie, öffnen Sie
        den Tab <strong>Teilnehmer</strong> und klicken Sie auf <strong>Gruppen verwalten</strong>. Geben Sie
        einen Gruppennamen ein und wählen Sie Teilnehmer aus der Liste aus — es werden nur Teilnehmer
        angezeigt, die noch keiner Gruppe angehören. Klicken Sie auf <strong>Gruppe erstellen</strong>, um
        alle ausgewählten Teilnehmer auf einmal zuzuweisen.
      </p>
      <p>
        Samply generiert automatisch eine kurze <strong>ID</strong> für jede Gruppe. Diese ID
        wird im URL-Platzhalter <code>%GROUP_ID%</code> und in der geplanten Warteschlange verwendet.
        Der Name ist nur für Forscher im Dashboard sichtbar; Teilnehmer sehen ihn nie.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gekoppeltes Timing</h2>
      <p>
        Alle Mitglieder einer Gruppe erhalten die gleiche Benachrichtigung zum gleichen Auslösezeitpunkt.
        Samply schreibt eine Warteschlangeneintrag pro Gruppe mit einem gemeinsamen{' '}
        <em>Geplant für</em>-Zeitstempel und stellt ihn gleichzeitig an alle Mitglieder zu. Es gibt
        keinen teilnehmerspezifischen Versatz innerhalb eines Gruppenversands.
      </p>
      <p>
        Für persönliche Zeitpläne (Tag N nach der Registrierung) verwendet Samply das Beitrittsdatum des{' '}
        <em>zuletzt eingeschriebenen</em> Gruppenmitglieds als gemeinsamen Anker. Das bedeutet, dass jedes
        Mitglied denselben Tag 1 teilt, unabhängig davon, wann es individuell beigetreten ist —
        beabsichtigt für Kohortendesigns, bei denen die Gruppe das Protokoll gemeinsam von einem einzigen
        Referenzdatum an durchlaufen soll. Wenn jeder Teilnehmer seinen eigenen persönlichen Zeitplan
        benötigt, sprechen Sie die Teilnehmer einzeln und nicht als Gruppe an.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gruppen in einem Zeitplan ansprechen</h2>
      <p>
        Wählen Sie in Schritt 2 (Teilnehmer) des Zeitplanformulars <strong>Gruppen</strong> als
        Zielgruppe aus und wählen Sie die anzusprechende Gruppe oder Gruppen. Nur Teilnehmer, die der
        gewählten Gruppe(n) zum Zeitpunkt des Klicks auf <strong>Benachrichtigungen planen</strong>{' '}
        zugewiesen sind, erhalten Versendungen aus diesem Zeitplan. Teilnehmer, die der Gruppe später
        beitreten, werden in nachfolgenden Versendungen einbezogen — die Gruppenmitgliedschaft wird zu
        jedem Auslösezeitpunkt neu ausgewertet.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Eine Gruppe löschen</h2>
      <p>
        Klicken Sie auf <strong>Löschen</strong> in der Gruppenzeile im Tab Gruppen. Dadurch wird die
        Gruppenzuweisung von jedem Mitglied entfernt — Teilnehmer verbleiben in der Studie und erhalten
        weiterhin alle nicht gruppenspezifischen Benachrichtigungen. Sie können einer neuen Gruppe
        hinzugefügt werden.
      </p>
      <p>
        Das Löschen einer Gruppe entfernt die Gruppenzuweisung von jedem Mitglied. Ausstehende
        Benachrichtigungen, die auf diese Gruppe abzielen, werden nicht zugestellt — zum Auslösezeitpunkt
        sind die Teilnehmer keine Mitglieder der Gruppe mehr und werden übersprungen.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Die Gruppe an Ihr Umfragetool übergeben</h2>
      <p>
        Fügen Sie <code>%GROUP_ID%</code> zu Ihrem Benachrichtigungs-Weblink hinzu, um die Gruppe jedes
        Teilnehmers automatisch in die Umfrage-URL einzuschließen. Samply ersetzt die vierstellige
        Gruppen-ID zum Sendezeitpunkt. Wenn ein Teilnehmer keine Gruppe hat, bleibt{' '}
        <code>%GROUP_ID%</code> unreplaced — Ihr Umfragetool erhält die Literalzeichenkette. Behandeln
        Sie dies in Ihrer Umfragelogik, wenn die Gruppenmitgliedschaft nicht für alle Teilnehmer
        garantiert ist.
      </p>
      <p>
        Siehe <a href='/docs/placeholders'>URL-Platzhalter</a> für die vollständige Liste der verfügbaren
        Token und wie die Ersetzung funktioniert.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gruppen vs. Teilnehmercodes</h2>
      <dl>
        <dt>Gruppen verwenden, wenn</dt>
        <dd>
          Sie gekoppelte, synchronisierte Versendungen an eine Kohorte wünschen oder verschiedene
          Segmente auf unterschiedliche Benachrichtigungs-Zeitpläne lenken müssen. Gruppen sind
          erstklassige Elemente im Zeitplanformular und bestimmen, wer welche Benachrichtigungen erhält.
        </dd>
        <dt>Teilnehmercodes verwenden, wenn</dt>
        <dd>
          Sie Samply-Teilnehmer mit Datensätzen in einem externen System abgleichen müssen (REDCap-
          Datensatz-IDs, institutionelle IDs, vorab zugewiesene Codes). Codes sind personenbezogene
          Kennungen, keine Gruppierungsmechanismen. Ein Teilnehmer kann sowohl einen Code als auch
          eine Gruppe haben.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentNl() {
  return (
    <>
      <p>
        Een groep is een benoemde deelgroep van deelnemers die notificaties gelijktijdig ontvangen.
        Wanneer een planning een groep aangesproken, verstuurt Samply de notificatie aan elk lid op
        hetzelfde moment — een <strong>gekoppeld ontwerp</strong>. Dit maakt groepen geschikt voor
        dyadische studies (koppels, leeftijdsgenoten), teamonderzoek of elk protocol waarbij synchronisatie
        binnen de groep essentieel is. Elke deelnemer behoort tot maximaal één groep.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Een groep aanmaken</h2>
      <p>
        Groepen moeten door de onderzoeker worden aangemaakt vóór de planning. Ga naar uw studie, open
        het tabblad <strong>Deelnemers</strong> en klik op <strong>Groepen beheren</strong>. Voer een
        groepsnaam in en selecteer deelnemers uit de lijst — alleen deelnemers die nog niet tot een groep
        behoren worden weergegeven. Klik op <strong>Groep aanmaken</strong> om alle geselecteerde
        deelnemers tegelijk toe te wijzen.
      </p>
      <p>
        Samply genereert automatisch een korte <strong>ID</strong> voor elke groep. Deze ID wordt gebruikt
        in de URL-plaatshouder <code>%GROUP_ID%</code> en in de geplande wachtrij.
        De naam is alleen zichtbaar voor onderzoekers in het dashboard; deelnemers zien deze nooit.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gekoppelde timing</h2>
      <p>
        Alle leden van een groep ontvangen dezelfde notificatie op hetzelfde afvuurtijdstip. Samply
        schrijft per groep één wachtrij-rij met een gedeeld tijdstempel voor <em>Gepland voor</em> en
        levert deze gelijktijdig aan alle leden af. Er is geen offset per lid binnen een groepsverzending.
      </p>
      <p>
        Voor persoonlijke planningen (dag N na registratie) gebruikt Samply de inschrijfdatum van het{' '}
        <em>meest recent ingeschreven</em> groepslid als gedeeld ankerpunt. Dit betekent dat elk lid
        dezelfde dag 1 deelt, ongeacht wanneer zij zich individueel hebben ingeschreven — dit is bewust
        voor cohortontwerpen waarbij u wilt dat de groep het protocol samen doorloopt vanaf één
        referentiedatum. Als elke deelnemer zijn eigen persoonlijke tijdlijn nodig heeft, spreek hen dan
        individueel aan in plaats van als groep.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Groepen aanspreken in een planning</h2>
      <p>
        Kies in stap 2 (Deelnemers) van het planningsformulier <strong>Groepen</strong> als doelgroep
        en selecteer welke groep of groepen u wilt aanspreken. Alleen deelnemers die aan de gekozen
        groep(en) zijn toegewezen op het moment dat u op <strong>Notificaties plannen</strong>{' '}
        klikt, ontvangen verzendingen uit die planning. Deelnemers die later tot de groep toetreden
        worden opgenomen in volgende verzendingen — het groepslidmaatschap wordt bij elk afvuurtijdstip
        opnieuw beoordeeld.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Een groep verwijderen</h2>
      <p>
        Klik op <strong>Verwijderen</strong> in de groepsrij op het tabblad Groepen. Hierdoor wordt de
        groepstoewijzing van elk lid verwijderd — deelnemers blijven in de studie en ontvangen nog steeds
        eventuele notificaties die niet op groepen zijn gericht. Ze komen in aanmerking om aan een nieuwe
        groep te worden toegevoegd.
      </p>
      <p>
        Het verwijderen van een groep verwijdert de groepstoewijzing van elk lid. Openstaande notificaties
        gericht op die groep worden niet afgeleverd — op het afvuurtijdstip zijn de deelnemers geen lid
        meer van de groep en worden ze overgeslagen.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>De groep doorgeven aan uw enquetetool</h2>
      <p>
        Voeg <code>%GROUP_ID%</code> toe aan uw notificatie-weblink om de groep van elke deelnemer
        automatisch op te nemen in de enquete-URL. Samply vervangt de viertekenige groeps-ID op het
        moment van verzending. Als een deelnemer geen groep heeft, blijft{' '}
        <code>%GROUP_ID%</code> onvervangen — uw enquetetool ontvangt de letterlijke tekenreeks.
        Verwerk dit in uw enquetelogica als groepslidmaatschap niet voor alle deelnemers gegarandeerd is.
      </p>
      <p>
        Zie <a href='/docs/placeholders'>URL-plaatshouders</a> voor de volledige lijst van beschikbare
        tokens en hoe vervanging werkt.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Groepen versus deelnemerscodes</h2>
      <dl>
        <dt>Gebruik groepen wanneer</dt>
        <dd>
          U gekoppelde, gesynchroniseerde verzendingen aan een cohort wilt, of verschillende deelgroepen
          naar verschillende notificatieplanningen wilt doorsturen. Groepen zijn volwaardige elementen in
          het planningsformulier en bepalen wie welke notificaties ontvangt.
        </dd>
        <dt>Gebruik deelnemerscodes wanneer</dt>
        <dd>
          U Samply-deelnemers moet koppelen aan records in een extern systeem (REDCap-record-ID's,
          institutionele ID's, vooraf toegewezen codes). Codes zijn per-persoon-identificatoren, geen
          groeperingsmechanismen. Een deelnemer kan zowel een code als een groep hebben.
        </dd>
      </dl>
    </>
  );
}

export default function GroupsContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <GroupsContentDe />;
  if (locale === "nl") return <GroupsContentNl />;
  if (locale === "ru") return <GroupsContentRu />;
  if (locale === "zh") return <GroupsContentZh />;
  if (locale === "ko") return <GroupsContentKo />;
  if (locale === "it") return <GroupsContentIt />;
  if (locale === "fr") return <GroupsContentFr />;
  if (locale === "es") return <GroupsContentEs />;
  if (locale === "pt") return <GroupsContentPt />;
  if (locale === "ja") return <GroupsContentJa />;
  if (locale === "ar") return <GroupsContentAr />;
  if (locale === "pl") return <GroupsContentPl />;
  if (locale === "tr") return <GroupsContentTr />;
  return <GroupsContentEn />;
}

function GroupsContentRu() {
  return (
    <>
      <p>
        Группа — это именованное подмножество участников, которые получают уведомления одновременно.
        Когда расписание нацелено на группу, Samply отправляет уведомление каждому члену в один и
        тот же момент — <strong>синхронизированный дизайн</strong>. Это делает группы подходящими для
        диадических исследований (пары, ровесники), командных исследований или любого протокола, где
        синхронизация внутри группы существенна. Каждый участник принадлежит не более чем одной группе.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Создание группы</h2>
      <p>
        Группы должны быть созданы исследователем перед составлением расписания. Перейдите в своё
        исследование, откройте вкладку <strong>Участники</strong> и нажмите <strong>Управление группами</strong>.
        Введите название группы и выберите участников из списка — в нём отображаются только участники,
        ещё не входящие ни в одну группу. Нажмите <strong>Создать группу</strong>, чтобы добавить всех
        выбранных участников одновременно.
      </p>
      <p>
        Samply автоматически генерирует короткий <strong>ID</strong> для каждой группы. Этот ID
        используется в URL-заполнителе <code>%GROUP_ID%</code> и в очереди уведомлений.
        Название видно только исследователям в панели управления; участники его никогда не видят.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Синхронизированное время</h2>
      <p>
        Все члены группы получают одно и то же уведомление в одно и то же время отправки. Samply
        создаёт одну строку в очереди для группы с общей временной меткой <em>Запланировано на</em>{' '}
        и доставляет её всем членам одновременно. Внутри одной групповой отправки нет индивидуального
        смещения по времени.
      </p>
      <p>
        Для персональных расписаний (День N после регистрации) Samply использует дату присоединения{' '}
        <em>последнего зарегистрированного</em> члена группы в качестве общей точки отсчёта. Это означает,
        что у всех членов один и тот же День 1 независимо от того, когда они индивидуально вступили —
        намеренно для когортных дизайнов, где вы хотите, чтобы группа проходила протокол вместе с
        единой точкой отсчёта. Если вам нужна индивидуальная временная шкала для каждого участника,
        нацеливайте их по отдельности, а не как группу.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Нацеливание групп в расписании</h2>
      <p>
        На шаге 2 (Участники) формы расписания выберите <strong>Группы</strong> в качестве аудитории
        и укажите, какую группу или группы нацелить. Только участники, назначенные в выбранную группу(-ы)
        в момент нажатия кнопки <strong>Запланировать уведомления</strong>, будут получать отправки из
        этого расписания. Участники, вступившие в группу позднее, включаются в последующие отправки —
        членство в группе переоценивается при каждом времени отправки.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Удаление группы</h2>
      <p>
        Нажмите <strong>Удалить</strong> в строке группы на вкладке Группы. Это снимет назначение
        группы с каждого члена — участники остаются в исследовании и продолжают получать уведомления,
        не нацеленные на группу. Они станут доступны для добавления в новую группу.
      </p>
      <p>
        Удаление группы снимает назначение группы с каждого члена. Ожидающие уведомления, нацеленные
        на эту группу, не будут доставлены — в момент отправки участники уже не являются членами
        группы и пропускаются.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Передача группы в вашу анкету</h2>
      <p>
        Добавьте <code>%GROUP_ID%</code> в веб-ссылку уведомления, чтобы автоматически включать
        группу каждого участника в URL анкеты. Samply подставляет четырёхсимвольный ID группы в
        момент отправки. Если у участника нет группы, <code>%GROUP_ID%</code> остаётся без замены —
        ваша анкета получит буквальную строку, поэтому обработайте это в логике вашей анкеты, если
        членство в группе не гарантировано для всех участников.
      </p>
      <p>
        Смотрите <a href='/docs/placeholders'>URL-заполнители</a> для полного списка доступных
        токенов и принципов замены.
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>Группы и коды участников</h2>
      <dl>
        <dt>Используйте группы, когда</dt>
        <dd>
          Вам нужны синхронизированные отправки когорте или необходимо направлять разные подмножества
          на разные расписания уведомлений. Группы — полноправные элементы формы расписания и определяют,
          кто получает какие уведомления.
        </dd>
        <dt>Используйте коды участников, когда</dt>
        <dd>
          Вам нужно сопоставить участников Samply с записями во внешней системе (идентификаторы записей
          REDCap, институциональные ID, предварительно назначенные коды). Коды — это индивидуальные
          идентификаторы, а не механизмы группировки. Участник может иметь как код, так и группу.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentZh() {
  return (
    <>
      <p>
        分组是一组有名称的参与者子集，他们同步接收通知。当计划针对某个分组时，Samply 在同一时刻向每位成员发送通知——一种<strong>联动设计</strong>。这使得分组适用于二元研究（伴侣、同伴）、团队研究，或任何需要组内同步的方案。每位参与者最多属于一个分组。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>创建分组</h2>
      <p>
        分组必须由研究者在制定计划前创建。进入你的研究，打开<strong>参与者</strong>标签页，点击<strong>管理分组</strong>。输入分组名称并从列表中选择参与者——列表中只显示尚未分配到任何分组的参与者。点击<strong>创建分组</strong>即可一次性分配所有选中的参与者。
      </p>
      <p>
        Samply 会自动为每个分组生成一个简短的 <strong>ID</strong>。该 ID 用于 URL 占位符 <code>%GROUP_ID%</code> 和计划队列中。分组名称只对控制台中的研究者可见；参与者永远不会看到它。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>联动时间</h2>
      <p>
        分组中的所有成员在同一触发时刻收到相同的通知。Samply 为分组写入一行队列，使用共享的<em>计划发送时间</em>时间戳，并同时发送给所有成员。分组发送内部没有按成员的时间偏移。
      </p>
      <p>
        对于个人计划（注册后第 N 天），Samply 使用<em>最后注册的</em>分组成员的加入日期作为共享基准。这意味着无论成员各自何时加入，他们都共享同一个第 1 天——这对于希望整组从单一参考日期按协议推进的队列设计来说是有意为之。如果你需要每位参与者有自己的个人时间线，请单独针对他们而不是作为分组。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>在计划中针对分组</h2>
      <p>
        在计划表单的第 2 步（参与者）中，选择<strong>分组</strong>作为目标受众，并选择要针对的分组。只有在你点击<strong>安排通知</strong>时已分配到所选分组的参与者才会收到该计划的通知。之后加入分组的参与者将被纳入后续发送——在每个触发时刻都会重新评估分组成员资格。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>删除分组</h2>
      <p>
        在分组标签页的分组行上点击<strong>删除</strong>。这将清除每位成员的分组分配——参与者留在研究中，继续接收任何非分组定向的通知。他们将有资格被添加到新分组。
      </p>
      <p>
        删除分组会从每位成员中移除分组分配。针对该分组的待发通知将不会被发送——在触发时刻，参与者已不再是该分组成员，因此会被跳过。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>将分组传递给你的问卷工具</h2>
      <p>
        在通知的网页链接中添加 <code>%GROUP_ID%</code>，可自动将每位参与者的分组包含在问卷 URL 中。Samply 在发送时替换四字符分组 ID。如果参与者没有分组，<code>%GROUP_ID%</code> 将保持原样不被替换——你的问卷工具将收到字面字符串，如果不能保证所有参与者都有分组，请在你的问卷逻辑中处理这种情况。
      </p>
      <p>
        查看 <a href='/docs/placeholders'>URL 占位符</a> 了解所有可用令牌的完整列表及替换原理。
      </p>

      <h2 style={{ marginTop: '3.6rem' }}>分组与参与者代码</h2>
      <dl>
        <dt>适合使用分组的情况</dt>
        <dd>
          你希望向队列进行联动同步发送，或需要将不同子集路由到不同的通知计划。分组是计划表单中的一等公民，决定谁收到哪些通知。
        </dd>
        <dt>适合使用参与者代码的情况</dt>
        <dd>
          你需要将 Samply 参与者与外部系统中的记录匹配（REDCap 记录 ID、机构 ID、预分配代码）。代码是按人的标识符，不是分组机制。一位参与者可以同时拥有代码和分组。
        </dd>
      </dl>
    </>
  );
}

function GroupsContentKo() {
  return (
    <>
      <p>
        그룹은 알림을 동시에 받는 명명된 참여자 하위 집합입니다.
        일정이 그룹을 대상으로 할 때, Samply는 모든 구성원에게 동일한 순간에 알림을 발송합니다 —
        <strong>연동 설계</strong>입니다. 이로 인해 그룹은 이원 연구(커플, 동료), 팀 연구,
        또는 그룹 내 동기화가 필수적인 모든 프로토콜에 적합합니다. 각 참여자는 최대 하나의 그룹에 속합니다.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>그룹 만들기</h2>
      <p>
        그룹은 일정을 잡기 전에 연구자가 먼저 만들어야 합니다. 연구로 이동하여
        <strong>참여자</strong> 탭을 열고 <strong>그룹 관리</strong>를 클릭하십시오. 그룹 이름을 입력하고
        목록에서 참여자를 선택하십시오 — 아직 어떤 그룹에도 속하지 않은 참여자만 표시됩니다.
        <strong>그룹 만들기</strong>를 클릭하면 선택한 모든 참여자가 한 번에 배정됩니다.
      </p>
      <p>
        Samply는 각 그룹에 짧은 <strong>ID</strong>를 자동으로 생성합니다. 이 ID는
        <code>%GROUP_ID%</code> URL 플레이스홀더와 예약 대기열에서 사용됩니다.
        이름은 대시보드의 연구자에게만 보이며 참여자는 볼 수 없습니다.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>연동 타이밍</h2>
      <p>
        그룹의 모든 구성원은 동일한 발송 시각에 동일한 알림을 받습니다. Samply는 공유된
        <em>예약 시각</em> 타임스탬프로 그룹당 하나의 대기열 행을 작성하고 모든 구성원에게 동시에 전달합니다.
        그룹 발송 내에서 구성원별 시간 오프셋은 없습니다.
      </p>
      <p>
        개인 일정(등록 후 N일차)의 경우, Samply는 <em>가장 최근에 등록된</em> 그룹 구성원의 참여 날짜를
        공유 기준점으로 사용합니다. 이는 개인이 언제 참여했는지와 관계없이 모든 구성원이 동일한 1일차를
        공유한다는 것을 의미합니다 — 단일 기준 날짜로부터 그룹이 함께 프로토콜을 진행하길 원하는
        코호트 설계에 의도적입니다. 각 참여자에게 고유한 개인 타임라인이 필요한 경우, 그룹이 아닌
        개인을 대상으로 설정하십시오.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>일정에서 그룹 타겟팅</h2>
      <p>
        일정 양식의 2단계(참여자)에서 대상으로 <strong>그룹</strong>을 선택하고 타겟팅할 그룹을 고르십시오.
        <strong>알림 예약</strong>을 클릭하는 순간에 선택한 그룹에 배정된 참여자만
        해당 일정에서 발송을 받습니다. 나중에 그룹에 참여하는 참여자는 이후 발송에 포함됩니다 —
        그룹 구성원 자격은 각 발송 시각마다 재평가됩니다.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>그룹 삭제</h2>
      <p>
        그룹 탭의 그룹 행에서 <strong>삭제</strong>를 클릭하십시오. 이렇게 하면 모든 구성원의
        그룹 배정이 해제됩니다 — 참여자는 연구에 남아 그룹 타겟이 아닌 알림은 계속 받습니다.
        새 그룹에 추가될 자격이 생깁니다.
      </p>
      <p>
        그룹을 삭제하면 모든 구성원의 그룹 배정이 제거됩니다. 해당 그룹을 대상으로 한 대기 중인 알림은
        전달되지 않습니다 — 발송 시각에 참여자가 더 이상 그룹 구성원이 아니므로 건너뜁니다.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>설문 도구에 그룹 전달하기</h2>
      <p>
        알림 웹 링크에 <code>%GROUP_ID%</code>를 추가하면 각 참여자의 그룹이 설문 URL에 자동으로 포함됩니다.
        Samply는 발송 시 네 자리 그룹 ID를 대입합니다. 참여자에게 그룹이 없는 경우
        <code>%GROUP_ID%</code>는 대체되지 않은 채로 남습니다 — 설문 도구는 리터럴 문자열을 받으므로
        모든 참여자의 그룹 구성원 자격이 보장되지 않는 경우 설문 논리에서 이를 처리하십시오.
      </p>
      <p>
        사용 가능한 토큰의 전체 목록과 대체 작동 방식은 <a href='/docs/placeholders'>URL 플레이스홀더</a>를 참조하십시오.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>그룹 대 참여자 코드</h2>
      <dl>
        <dt>그룹을 사용하는 경우</dt>
        <dd>
          코호트에 연동되고 동기화된 발송을 원하거나, 서로 다른 하위 집합을 다른 알림 일정으로
          라우팅해야 할 때. 그룹은 일정 양식의 일급 시민으로서 누가 어떤 알림을 받는지를 결정합니다.
        </dd>
        <dt>참여자 코드를 사용하는 경우</dt>
        <dd>
          Samply 참여자를 외부 시스템의 레코드(REDCap 레코드 ID, 기관 ID, 사전 배정 코드)와 일치시켜야 할 때.
          코드는 1인당 식별자이지 그룹화 메커니즘이 아닙니다. 참여자는 코드와 그룹을 동시에 가질 수 있습니다.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentIt() {
  return (
    <>
      <p>
        Un gruppo è un sottoinsieme denominato di partecipanti che ricevono le notifiche in sincronia.
        Quando un calendario è indirizzato a un gruppo, Samply invia la notifica a ogni membro nello
        stesso momento — un <strong>disegno accoppiato</strong>. Questo rende i gruppi adatti a studi
        diadici (coppie, coetanei), ricerche di squadra o qualsiasi protocollo in cui la sincronizzazione
        all'interno del gruppo è essenziale. Ogni partecipante appartiene al massimo a un gruppo.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Creare un gruppo</h2>
      <p>
        I gruppi devono essere creati dal ricercatore prima di pianificare le notifiche. Andare allo studio,
        aprire la scheda <strong>Partecipanti</strong> e fare clic su <strong>Gestisci gruppi</strong>. Inserire
        un nome per il gruppo e selezionare i partecipanti dall'elenco — vengono mostrati solo i partecipanti
        non già assegnati a un gruppo. Fare clic su <strong>Crea gruppo</strong> per assegnare tutti i
        partecipanti selezionati contemporaneamente.
      </p>
      <p>
        Samply genera automaticamente un breve <strong>ID</strong> per ogni gruppo. Questo ID viene utilizzato
        nel segnaposto URL <code>%GROUP_ID%</code> e nella coda pianificata.
        Il nome è visibile solo ai ricercatori nel dashboard; i partecipanti non lo vedono mai.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tempistica accoppiata</h2>
      <p>
        Tutti i membri di un gruppo ricevono la stessa notifica nello stesso momento di attivazione. Samply
        scrive una riga nella coda per gruppo con un timestamp <em>Pianificato per</em> condiviso e la recapita
        a tutti i membri contemporaneamente. Non è previsto alcun offset per singolo membro all'interno di
        un invio di gruppo.
      </p>
      <p>
        Per i calendari personali (Giorno N dopo la registrazione), Samply utilizza la data di iscrizione del{' '}
        <em>membro del gruppo iscritto più di recente</em> come ancoraggio condiviso. Ciò significa che ogni
        membro condivide lo stesso Giorno 1 indipendentemente da quando si è iscritto individualmente —
        una scelta intenzionale per disegni a coorte in cui si vuole che il gruppo attraversi il protocollo
        insieme a partire da un'unica data di riferimento. Se ogni partecipante necessita di una propria
        sequenza temporale personale, indirizzarli individualmente anziché come gruppo.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Indirizzare i gruppi in un calendario</h2>
      <p>
        Nel Passo 2 (Partecipanti) del modulo calendario, scegliere <strong>Gruppi</strong> come destinatari
        e selezionare quale o quali gruppi indirizzare. Solo i partecipanti assegnati al(i) gruppo(i) scelto(i)
        nel momento in cui si fa clic su <strong>Pianifica notifiche</strong>{' '}
        ricevono gli invii da quel calendario. I partecipanti che si uniscono al gruppo in un secondo momento
        vengono inclusi negli invii successivi — l'appartenenza al gruppo viene rivalutata a ogni momento
        di attivazione.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Eliminare un gruppo</h2>
      <p>
        Fare clic su <strong>Elimina</strong> nella riga del gruppo nella scheda Gruppi. Questa operazione
        rimuove l'assegnazione al gruppo da ogni membro — i partecipanti rimangono nello studio e continuano
        a ricevere eventuali notifiche non indirizzate al gruppo. Diventano quindi idonei ad essere aggiunti
        a un nuovo gruppo.
      </p>
      <p>
        L'eliminazione di un gruppo rimuove l'assegnazione al gruppo da ogni membro. Le notifiche in attesa
        indirizzate a quel gruppo non verranno consegnate — al momento dell'attivazione, i partecipanti non
        sono più membri del gruppo e vengono ignorati.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Passare il gruppo allo strumento di indagine</h2>
      <p>
        Aggiungere <code>%GROUP_ID%</code> al link web della notifica per includere automaticamente il gruppo
        di ogni partecipante nell'URL del sondaggio. Samply sostituisce l'ID del gruppo (quattro caratteri)
        al momento dell'invio. Se un partecipante non ha un gruppo,{' '}
        <code>%GROUP_ID%</code> rimane non sostituito — lo strumento di indagine riceve la stringa letterale,
        quindi gestire questo caso nella logica del sondaggio se l'appartenenza al gruppo non è garantita
        per tutti i partecipanti.
      </p>
      <p>
        Vedere <a href='/docs/placeholders'>Segnaposto URL</a> per l'elenco completo dei token disponibili
        e il funzionamento della sostituzione.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gruppi vs codici partecipante</h2>
      <dl>
        <dt>Usare i gruppi quando</dt>
        <dd>
          Si desidera inviare notifiche sincronizzate e accoppiate a una coorte, oppure instradare sottoinsiemi
          diversi verso calendari di notifica diversi. I gruppi sono elementi di primo livello nel modulo
          calendario e determinano chi riceve quali notifiche.
        </dd>
        <dt>Usare i codici partecipante quando</dt>
        <dd>
          È necessario abbinare i partecipanti di Samply a record in un sistema esterno (ID record REDCap,
          ID istituzionali, codici pre-assegnati). I codici sono identificatori per singola persona,
          non meccanismi di raggruppamento. Un partecipante può avere sia un codice che un gruppo.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentFr() {
  return (
    <>
      <p>
        Un groupe est un sous-ensemble nommé de participants qui reçoivent des notifications
        en synchronisation. Lorsqu'un calendrier cible un groupe, Samply envoie la notification
        à chaque membre au même moment — une <strong>conception couplée</strong>. Cela rend les
        groupes adaptés aux études dyadiques (couples, pairs), à la recherche en équipe ou à tout
        protocole où la synchronisation au sein du groupe est essentielle. Chaque participant
        appartient à au plus un groupe.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Créer un groupe</h2>
      <p>
        Les groupes doivent être créés par le chercheur avant la planification. Accédez à votre
        étude, ouvrez l'onglet <strong>Participants</strong> et cliquez sur{' '}
        <strong>Gérer les groupes</strong>. Saisissez un nom de groupe et sélectionnez les
        participants dans la liste — seuls les participants n'appartenant pas encore à un groupe
        sont affichés. Cliquez sur <strong>Créer un groupe</strong> pour assigner tous les
        participants sélectionnés en une seule fois.
      </p>
      <p>
        Samply génère automatiquement un court <strong>identifiant</strong> pour chaque groupe.
        Cet identifiant est utilisé dans le paramètre URL <code>%GROUP_ID%</code> et dans la
        file d'attente planifiée. Le nom n'est visible que par les chercheurs dans le tableau de
        bord ; les participants ne le voient jamais.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Synchronisation temporelle couplée</h2>
      <p>
        Tous les membres d'un groupe reçoivent la même notification au même moment d'envoi.
        Samply écrit une ligne dans la file d'attente par groupe avec un horodatage{' '}
        <em>Planifié pour</em> partagé et la remet à tous les membres simultanément. Il n'y a
        pas de décalage individuel au sein d'un envoi de groupe.
      </p>
      <p>
        Pour les calendriers personnels (Jour N après l'inscription), Samply utilise la date
        d'adhésion du <em>membre du groupe inscrit le plus récemment</em> comme ancrage partagé.
        Cela signifie que chaque membre partage le même Jour 1, quelle que soit la date à laquelle
        il s'est individuellement inscrit — intentionnel pour les conceptions en cohorte où vous
        souhaitez que le groupe progresse dans le protocole ensemble à partir d'une date de
        référence unique. Si chaque participant a besoin de sa propre chronologie personnelle,
        ciblez-les individuellement plutôt qu'en tant que groupe.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Cibler des groupes dans un calendrier</h2>
      <p>
        À l'étape 2 (Participants) du formulaire de calendrier, choisissez <strong>Groupes</strong>{' '}
        comme audience et sélectionnez le ou les groupes à cibler. Seuls les participants affectés
        au(x) groupe(s) choisi(s) au moment où vous cliquez sur{' '}
        <strong>Planifier les notifications</strong> reçoivent les envois de ce calendrier. Les
        participants qui rejoignent le groupe ultérieurement sont inclus dans les envois suivants
        — l'appartenance au groupe est réévaluée à chaque moment d'envoi.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Supprimer un groupe</h2>
      <p>
        Cliquez sur <strong>Supprimer</strong> dans la ligne du groupe dans l'onglet Groupes.
        Cela efface l'affectation au groupe de chaque membre — les participants restent dans
        l'étude et continuent à recevoir les notifications non ciblées sur des groupes. Ils
        deviennent éligibles pour être ajoutés à un nouveau groupe.
      </p>
      <p>
        La suppression d'un groupe retire l'affectation au groupe de chaque membre. Les
        notifications en attente ciblant ce groupe ne seront pas remises — au moment de l'envoi,
        les participants ne sont plus membres du groupe et sont donc ignorés.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Transmettre le groupe à votre outil d'enquête</h2>
      <p>
        Ajoutez <code>%GROUP_ID%</code> au lien web de votre notification pour inclure
        automatiquement le groupe de chaque participant dans l'URL de l'enquête. Samply
        substitue l'identifiant de groupe à quatre caractères au moment de l'envoi. Si un
        participant n'a pas de groupe, <code>%GROUP_ID%</code> reste non remplacé — votre outil
        d'enquête reçoit la chaîne littérale ; gérez ce cas dans la logique de votre enquête si
        l'appartenance à un groupe n'est pas garantie pour tous les participants.
      </p>
      <p>
        Voir <a href='/docs/placeholders'>Paramètres URL</a> pour la liste complète des jetons
        disponibles et le fonctionnement de la substitution.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Groupes vs codes de participants</h2>
      <dl>
        <dt>Utiliser les groupes quand</dt>
        <dd>
          Vous souhaitez des envois couplés et synchronisés à une cohorte, ou avez besoin
          d'acheminer différents sous-ensembles vers différents calendriers de notifications.
          Les groupes sont des éléments de premier ordre dans le formulaire de calendrier et
          déterminent qui reçoit quelles notifications.
        </dd>
        <dt>Utiliser les codes de participants quand</dt>
        <dd>
          Vous devez faire correspondre les participants Samply à des enregistrements dans un
          système externe (identifiants REDCap, identifiants institutionnels, codes pré-attribués).
          Les codes sont des identifiants par personne, pas des mécanismes de regroupement. Un
          participant peut avoir à la fois un code et un groupe.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentEs() {
  return (
    <>
      <p>
        Un grupo es un subconjunto de participantes con nombre que reciben notificaciones
        de forma sincronizada. Cuando un calendario apunta a un grupo, Samply envía la
        notificación a cada miembro al mismo tiempo — un <strong>diseño acoplado</strong>.
        Esto hace que los grupos sean adecuados para estudios diádicos (parejas, pares),
        investigación en equipo o cualquier protocolo en el que la sincronización dentro del
        grupo sea esencial. Cada participante pertenece como máximo a un grupo.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Crear un grupo</h2>
      <p>
        Los grupos deben ser creados por el investigador antes de programar. Ve a tu estudio,
        abre la pestaña <strong>Participantes</strong> y haz clic en{' '}
        <strong>Gestionar grupos</strong>. Escribe un nombre de grupo y selecciona los
        participantes de la lista — solo aparecen los participantes que aún no pertenecen a
        ningún grupo. Haz clic en <strong>Crear grupo</strong> para asignar a todos los
        participantes seleccionados a la vez.
      </p>
      <p>
        Samply genera automáticamente un <strong>ID</strong> corto para cada grupo. Este ID
        se utiliza en el parámetro URL <code>%GROUP_ID%</code> y en la cola programada.
        El nombre solo es visible para los investigadores en el panel; los participantes
        nunca lo ven.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Sincronización temporal acoplada</h2>
      <p>
        Todos los miembros de un grupo reciben la misma notificación en el mismo momento de
        envío. Samply escribe una fila en la cola por grupo con una marca de tiempo{' '}
        <em>Programado para</em> compartida y la entrega a todos los miembros simultáneamente.
        No hay desplazamiento individual dentro de un envío de grupo.
      </p>
      <p>
        Para los calendarios personales (Día N después de la inscripción), Samply utiliza la
        fecha de incorporación del <em>miembro del grupo inscrito más recientemente</em> como
        ancla compartida. Esto significa que cada miembro comparte el mismo Día 1
        independientemente de cuándo se inscribió individualmente — es intencional para los
        diseños de cohorte en los que se desea que el grupo avance en el protocolo junto desde
        una única fecha de referencia. Si cada participante necesita su propia cronología
        personal, apúntales individualmente en lugar de como grupo.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Apuntar a grupos en un calendario</h2>
      <p>
        En el Paso 2 (Participantes) del formulario de calendario, elige <strong>Grupos</strong>{' '}
        como audiencia y selecciona el grupo o grupos a los que apuntar. Solo los participantes
        asignados al grupo o grupos elegidos en el momento en que haces clic en{' '}
        <strong>Programar notificaciones</strong> reciben los envíos de ese calendario. Los
        participantes que se unan al grupo posteriormente se incluyen en los envíos siguientes
        — la pertenencia al grupo se reevalúa en cada momento de envío.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Eliminar un grupo</h2>
      <p>
        Haz clic en <strong>Eliminar</strong> en la fila del grupo en la pestaña Grupos.
        Esto elimina la asignación de grupo de cada miembro — los participantes permanecen en
        el estudio y siguen recibiendo las notificaciones que no estén dirigidas a grupos.
        Pasan a ser elegibles para ser añadidos a un nuevo grupo.
      </p>
      <p>
        Eliminar un grupo retira la asignación de grupo de cada miembro. Las notificaciones
        pendientes dirigidas a ese grupo no se entregarán — en el momento del envío, los
        participantes ya no son miembros del grupo y por tanto se omiten.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Pasar el grupo a tu herramienta de encuesta</h2>
      <p>
        Añade <code>%GROUP_ID%</code> al enlace web de tu notificación para incluir
        automáticamente el grupo de cada participante en la URL de la encuesta. Samply
        sustituye el ID de grupo de cuatro caracteres en el momento del envío. Si un
        participante no tiene grupo, <code>%GROUP_ID%</code> queda sin reemplazar — tu
        herramienta de encuesta recibe la cadena literal; maneja este caso en la lógica de
        tu encuesta si la pertenencia a un grupo no está garantizada para todos los participantes.
      </p>
      <p>
        Consulta <a href='/docs/placeholders'>Marcadores de posición de URL</a> para ver la
        lista completa de tokens disponibles y cómo funciona la sustitución.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Grupos vs códigos de participantes</h2>
      <dl>
        <dt>Usar grupos cuando</dt>
        <dd>
          Quieres envíos acoplados y sincronizados a una cohorte, o necesitas dirigir
          diferentes subconjuntos a diferentes calendarios de notificaciones. Los grupos son
          elementos de primer nivel en el formulario de calendario y determinan quién recibe
          qué notificaciones.
        </dd>
        <dt>Usar códigos de participantes cuando</dt>
        <dd>
          Necesitas hacer coincidir los participantes de Samply con registros en un sistema
          externo (IDs de registro de REDCap, IDs institucionales, códigos preasignados). Los
          códigos son identificadores por persona, no mecanismos de agrupación. Un participante
          puede tener tanto un código como un grupo.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentPt() {
  return (
    <>
      <p>
        Um grupo é um subconjunto de participantes com nome que recebem notificações
        de forma sincronizada. Quando um calendário aponta para um grupo, o Samply envia
        a notificação para cada membro ao mesmo tempo — um <strong>design acoplado</strong>.
        Isso torna os grupos adequados para estudos diádicos (casais, pares),
        pesquisa em equipe ou qualquer protocolo em que a sincronização dentro do
        grupo seja essencial. Cada participante pertence a no máximo um grupo.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Criar um grupo</h2>
      <p>
        Os grupos devem ser criados pelo pesquisador antes de agendar. Vá ao seu estudo,
        abra a aba <strong>Participantes</strong> e clique em{' '}
        <strong>Gerenciar grupos</strong>. Digite um nome de grupo e selecione os
        participantes da lista — apenas os participantes que ainda não pertencem a
        nenhum grupo são exibidos. Clique em <strong>Criar grupo</strong> para atribuir
        todos os participantes selecionados de uma vez.
      </p>
      <p>
        O Samply gera automaticamente um <strong>ID</strong> curto para cada grupo. Este ID
        é usado no parâmetro de URL <code>%GROUP_ID%</code> e na fila agendada.
        O nome é visível apenas para os pesquisadores no painel; os participantes
        nunca o veem.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Sincronização temporal acoplada</h2>
      <p>
        Todos os membros de um grupo recebem a mesma notificação no mesmo momento de
        envio. O Samply escreve uma linha na fila por grupo com um carimbo de data/hora{' '}
        <em>Agendado para</em> compartilhado e o entrega a todos os membros simultaneamente.
        Não há deslocamento individual dentro de um envio de grupo.
      </p>
      <p>
        Para os calendários pessoais (Dia N após o cadastro), o Samply utiliza a
        data de entrada do <em>membro do grupo cadastrado mais recentemente</em> como
        âncora compartilhada. Isso significa que cada membro compartilha o mesmo Dia 1
        independentemente de quando se cadastrou individualmente — é intencional para os
        designs de coorte em que se deseja que o grupo avance no protocolo junto a partir
        de uma única data de referência. Se cada participante precisar de sua própria
        cronologia pessoal, direcione-os individualmente em vez de como grupo.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Direcionar grupos em um calendário</h2>
      <p>
        No Passo 2 (Participantes) do formulário de calendário, escolha <strong>Grupos</strong>{' '}
        como público-alvo e selecione o grupo ou grupos a serem direcionados. Apenas os
        participantes atribuídos ao(s) grupo(s) escolhido(s) no momento em que você clica em{' '}
        <strong>Agendar notificações</strong> recebem os envios desse calendário. Os
        participantes que ingressarem no grupo posteriormente são incluídos nos envios
        seguintes — a associação ao grupo é reavaliada em cada momento de envio.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Excluir um grupo</h2>
      <p>
        Clique em <strong>Excluir</strong> na linha do grupo na aba Grupos. Isso remove a
        atribuição de grupo de cada membro — os participantes permanecem no estudo e
        continuam recebendo as notificações que não estejam direcionadas a grupos.
        Eles passam a ser elegíveis para serem adicionados a um novo grupo.
      </p>
      <p>
        Excluir um grupo retira a atribuição de grupo de cada membro. As notificações
        pendentes direcionadas a esse grupo não serão entregues — no momento do envio, os
        participantes não são mais membros do grupo e, portanto, são ignorados.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Passar o grupo para sua ferramenta de pesquisa</h2>
      <p>
        Adicione <code>%GROUP_ID%</code> ao link da web da sua notificação para incluir
        automaticamente o grupo de cada participante na URL da pesquisa. O Samply
        substitui o ID de grupo de quatro caracteres no momento do envio. Se um
        participante não tiver grupo, <code>%GROUP_ID%</code> fica sem substituição — sua
        ferramenta de pesquisa recebe a string literal; trate este caso na lógica da
        sua pesquisa se a associação a um grupo não estiver garantida para todos os participantes.
      </p>
      <p>
        Consulte <a href='/docs/placeholders'>Marcadores de posição de URL</a> para ver a
        lista completa de tokens disponíveis e como funciona a substituição.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Grupos vs códigos de participantes</h2>
      <dl>
        <dt>Usar grupos quando</dt>
        <dd>
          Você quer envios acoplados e sincronizados para uma coorte, ou precisa direcionar
          diferentes subconjuntos para diferentes calendários de notificações. Os grupos são
          elementos de primeiro nível no formulário de calendário e determinam quem recebe
          quais notificações.
        </dd>
        <dt>Usar códigos de participantes quando</dt>
        <dd>
          Você precisa fazer corresponder os participantes do Samply a registros em um sistema
          externo (IDs de registro do REDCap, IDs institucionais, códigos pré-atribuídos). Os
          códigos são identificadores por pessoa, não mecanismos de agrupamento. Um participante
          pode ter tanto um código quanto um grupo.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentJa() {
  return (
    <>
      <p>
        グループとは、同期して通知を受け取る、名前付きの参加者のサブセットです。
        スケジュールがグループを対象にすると、Samply は同じ瞬間にすべてのメンバーへ通知を送信します
        — <strong>連動デザイン</strong>です。これにより、グループは二者研究（カップル、仲間）、
        チーム研究、またはグループ内の同期が不可欠な任意のプロトコルに適しています。各参加者は
        最大で一つのグループに属します。
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>グループを作成する</h2>
      <p>
        グループはスケジュール設定の前に研究者が作成する必要があります。研究にアクセスし、
        <strong>参加者</strong>タブを開き、<strong>グループ管理</strong>をクリックしてください。
        グループ名を入力し、リストから参加者を選択します — まだどのグループにも所属していない
        参加者のみが表示されます。<strong>グループ作成</strong>をクリックすると、選択したすべての
        参加者が一度に割り当てられます。
      </p>
      <p>
        Samply は各グループに対して短い <strong>ID</strong> を自動生成します。この ID は
        URL プレースホルダー <code>%GROUP_ID%</code> およびスケジュールされたキューで使用されます。
        グループ名はダッシュボードの研究者にのみ表示され、参加者には決して表示されません。
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>連動タイミング</h2>
      <p>
        グループのすべてのメンバーは、同じ送信時刻に同じ通知を受け取ります。Samply は共有された
        <em>送信予定</em>タイムスタンプでグループごとに 1 行のキューを書き込み、すべてのメンバーに
        同時に配信します。グループ送信内でメンバーごとのオフセットはありません。
      </p>
      <p>
        個人スケジュール（登録後 N 日目）の場合、Samply は<em>最も最近登録された</em>グループメンバーの
        参加日を共有の基準点として使用します。これは、個別にいつ参加したかに関わらず、すべての
        メンバーが同じ 1 日目を共有することを意味します — これは、グループが単一の参照日からプロトコルを
        一緒に進めることを望むコホートデザインに対して意図的なものです。各参加者に独自の個人的な
        タイムラインが必要な場合は、グループとしてではなく個別に対象とします。
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>スケジュールでグループを対象にする</h2>
      <p>
        スケジュールフォームのステップ 2（参加者）で、対象者として<strong>グループ</strong>を選択し、
        対象とするグループを選択します。<strong>通知をスケジュール</strong>をクリックした時点で
        選択したグループに割り当てられている参加者のみが、そのスケジュールからの送信を受け取ります。
        後からグループに参加した参加者は、その後の送信に含まれます — グループのメンバーシップは
        各送信時刻ごとに再評価されます。
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>グループを削除する</h2>
      <p>
        グループタブのグループ行にある<strong>削除</strong>をクリックしてください。これにより、
        すべてのメンバーからグループの割り当てがクリアされます — 参加者は研究に残り、
        グループ対象でない通知を引き続き受け取ります。彼らは新しいグループに追加される資格を
        得ます。
      </p>
      <p>
        グループを削除すると、すべてのメンバーからグループの割り当てが削除されます。そのグループを
        対象とした保留中の通知は配信されません — 送信時刻には参加者はもうそのグループのメンバーでは
        ないため、スキップされます。
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>調査ツールにグループを渡す</h2>
      <p>
        通知のウェブリンクに <code>%GROUP_ID%</code> を追加すると、各参加者のグループが
        調査 URL に自動的に含まれます。Samply は送信時に 4 文字のグループ ID を置換します。
        参加者にグループがない場合、<code>%GROUP_ID%</code> は置換されないまま残ります —
        あなたの調査ツールはリテラル文字列を受け取るので、すべての参加者にグループメンバーシップが
        保証されていない場合は、調査ロジックでこれを処理してください。
      </p>
      <p>
        利用可能なトークンの完全なリストと置換の仕組みについては、
        <a href='/docs/placeholders'>URL プレースホルダー</a>を参照してください。
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>グループ対参加者コード</h2>
      <dl>
        <dt>グループを使う場合</dt>
        <dd>
          コホートへの連動した同期送信を行いたい場合、または異なるサブセットを異なる通知
          スケジュールにルーティングする必要がある場合。グループはスケジュールフォームの
          一級要素であり、誰がどの通知を受け取るかを決定します。
        </dd>
        <dt>参加者コードを使う場合</dt>
        <dd>
          Samply の参加者を外部システム（REDCap レコード ID、機関 ID、事前割り当てコード）の
          レコードと一致させる必要がある場合。コードは個人ごとの識別子であり、グループ化の
          メカニズムではありません。参加者はコードとグループの両方を持つことができます。
        </dd>
      </dl>
    </>
  );
}

function GroupsContentTr() {
  return (
    <>
      <p>
        Grup, bildirimleri eş zamanlı olarak alan, adlandırılmış bir katılımcı alt kümesidir.
        Bir program bir grubu hedeflediğinde, Samply bildirimi her üyeye aynı anda gönderir —
        bir <strong>eşleştirilmiş tasarım</strong>. Bu, grupları diyadik çalışmalar için
        (çiftler, akranlar), takım araştırması veya grup içi senkronizasyonun şart olduğu
        her protokol için uygun kılar. Her katılımcı en fazla bir gruba aittir.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Grup oluşturma</h2>
      <p>
        Gruplar, programlamadan önce araştırmacı tarafından oluşturulmalıdır. Çalışmanıza gidin,
        <strong>Katılımcılar</strong> sekmesini açın ve <strong>Grupları yönet</strong> seçeneğine
        tıklayın. Bir grup adı girin ve listeden katılımcıları seçin — yalnızca henüz bir gruba
        atanmamış katılımcılar görünür. Seçilen tüm katılımcıları aynı anda atamak için
        <strong>Grup oluştur</strong> seçeneğine tıklayın.
      </p>
      <p>
        Samply her grup için otomatik olarak kısa bir <strong>ID</strong> üretir. Bu ID,
        <code>%GROUP_ID%</code> URL yer tutucusunda ve programlanmış kuyrukta kullanılır.
        Ad yalnızca panelde araştırmacılar için görünürdür; katılımcılar bunu asla görmez.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Eşleştirilmiş zamanlama</h2>
      <p>
        Bir grubun tüm üyeleri aynı bildirimi aynı tetikleme zamanında alır. Samply, paylaşılan bir
        <em>Programlanan zaman</em> zaman damgasıyla grup başına tek bir kuyruk satırı yazar ve
        bunu her üyeye eş zamanlı olarak iletir. Bir grup gönderimi içinde üye başına ofset yoktur.
      </p>
      <p>
        Kişisel programlar için (kayıttan sonraki N. Gün), Samply <em>en son kaydolan</em> grup
        üyesinin katılım tarihini paylaşılan referans noktası olarak kullanır. Bu, bireysel olarak
        ne zaman katıldıklarına bakılmaksızın her üyenin aynı 1. Günü paylaştığı anlamına gelir —
        bu, grubun tek bir referans tarihinden itibaren protokolde birlikte ilerlemesini istediğiniz
        kohort tasarımları için kasıtlıdır. Her katılımcının kendi kişisel zaman çizelgesinde olması
        gerekiyorsa, onları grup olarak değil bireysel olarak hedefleyin.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Bir programda grupları hedefleme</h2>
      <p>
        Program formunun 2. Adımında (Katılımcılar) kitle olarak <strong>Gruplar</strong>ı seçin
        ve hangi grup veya grupları hedefleyeceğinizi belirleyin. Yalnızca
        <strong>Bildirimleri programla</strong> seçeneğine tıkladığınız anda seçilen grup(lar)a
        atanmış olan katılımcılar bu programdan gönderim alır. Daha sonra gruba katılan katılımcılar
        sonraki gönderimlere dahil edilir — grup üyeliği her tetikleme zamanında yeniden değerlendirilir.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Bir grubu silme</h2>
      <p>
        Gruplar sekmesindeki grup satırında <strong>Sil</strong> seçeneğine tıklayın. Bu, her üyeden
        grup atamasını temizler — katılımcılar çalışmada kalır ve gruba hedeflenmeyen tüm bildirimleri
        almaya devam eder. Yeni bir gruba eklenmeye uygun hale gelirler.
      </p>
      <p>
        Bir grubu silmek, her üyeden grup atamasını kaldırır. O gruba hedeflenen bekleyen bildirimler
        iletilmez — tetikleme zamanında katılımcılar artık grubun üyesi olmadığından atlanırlar.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Grubu anket aracınıza aktarma</h2>
      <p>
        Her katılımcının grubunu otomatik olarak anket URL'sine dahil etmek için bildirim Web
        Bağlantınıza <code>%GROUP_ID%</code> ekleyin. Samply gönderim sırasında dört karakterli
        grup ID'sini yerine koyar. Bir katılımcının grubu yoksa, <code>%GROUP_ID%</code>
        değiştirilmeden bırakılır — anket aracınız tam metni alır, bu yüzden grup üyeliği tüm
        katılımcılar için garanti edilmiyorsa bunu anket mantığınızda işleyin.
      </p>
      <p>
        Mevcut tokenların tam listesi ve değiştirme işleminin nasıl çalıştığı için
        <a href="/docs/placeholders">URL yer tutucuları</a> sayfasına bakın.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Gruplar ile katılımcı kodları karşılaştırması</h2>
      <dl>
        <dt>Grupları şu durumda kullanın</dt>
        <dd>
          Bir kohorta eşleştirilmiş, senkronize gönderimler istediğinizde veya farklı alt kümeleri
          farklı bildirim programlarına yönlendirmeniz gerektiğinde. Gruplar program formunda
          birinci sınıf öğelerdir ve hangi bildirimleri kimin alacağını belirler.
        </dd>
        <dt>Katılımcı kodlarını şu durumda kullanın</dt>
        <dd>
          Samply katılımcılarını harici bir sistemdeki kayıtlarla (REDCap kayıt ID'leri, kurumsal
          ID'ler, önceden atanmış kodlar) eşleştirmeniz gerektiğinde. Kodlar, gruplama mekanizmaları
          değil, kişi başına tanımlayıcılardır. Bir katılımcı hem bir koda hem de bir gruba sahip olabilir.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentPl() {
  return (
    <>
      <p>
        Grupa to nazwany podzbiór uczestników, którzy otrzymują powiadomienia synchronicznie.
        Gdy harmonogram celuje w grupę, Samply wysyła powiadomienie do każdego członka w tym
        samym momencie — projekt <strong>sparowany</strong>. To czyni grupy odpowiednimi dla
        badań diadycznych (pary, rówieśnicy), badań zespołowych lub każdego protokołu,
        w którym synchronizacja wewnątrz grupy jest niezbędna. Każdy uczestnik należy do
        co najwyżej jednej grupy.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Tworzenie grup</h2>
      <p>
        Grupy muszą zostać utworzone przez badacza przed planowaniem. Przejdź do swojego badania,
        otwórz zakładkę <strong>Uczestnicy</strong> i kliknij <strong>Zarządzaj grupami</strong>.
        Wpisz nazwę grupy i wybierz uczestników z listy — wyświetlani są tylko uczestnicy
        jeszcze nieprzypisani do żadnej grupy. Kliknij <strong>Utwórz grupę</strong>, aby
        przypisać wszystkich wybranych uczestników jednocześnie.
      </p>
      <p>
        Samply automatycznie generuje krótki <strong>ID</strong> dla każdej grupy. Ten ID jest
        używany w symbolu zastępczym URL <code>%GROUP_ID%</code> oraz w kolejce zaplanowanych
        wysyłek. Nazwa jest widoczna tylko w panelu dla badaczy; uczestnicy nigdy jej nie widzą.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Synchroniczne (sparowane) czasy</h2>
      <p>
        Wszyscy członkowie grupy otrzymują to samo powiadomienie w tym samym czasie wyzwolenia.
        Samply zapisuje jeden wiersz kolejki na grupę ze wspólnym znacznikiem <em>Czas planowany</em>
        i dostarcza go każdemu członkowi synchronicznie. Wewnątrz jednej wysyłki grupowej nie ma
        przesunięć dla poszczególnych członków.
      </p>
      <p>
        Dla harmonogramów osobistych (dzień N po rejestracji) Samply używa daty rejestracji
        <em> ostatnio zarejestrowanego</em> członka grupy jako wspólnego punktu odniesienia.
        Oznacza to, że każdy członek dzieli ten sam dzień 1, niezależnie od tego, kiedy
        indywidualnie dołączył — jest to celowe rozwiązanie dla projektów kohortowych, w których
        chcesz, aby grupa przeszła przez protokół razem od jednej wspólnej daty odniesienia.
        Jeśli każdy uczestnik potrzebuje własnej osobistej osi czasu, celuj w nich indywidualnie,
        a nie jako grupę.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Wybieranie grup w harmonogramie</h2>
      <p>
        W kroku 2 formularza harmonogramu (Uczestnicy) wybierz <strong>Grupy</strong> jako
        odbiorców i określ, którą grupę lub grupy chcesz wybrać. Tylko uczestnicy przypisani
        do wybranej grupy (grup) w momencie kliknięcia <strong>Zaplanuj powiadomienia</strong>
        otrzymają wysyłki z tego harmonogramu. Uczestnicy dodawani do grupy później są
        uwzględniani w kolejnych wysyłkach — przynależność do grupy jest ponownie oceniana
        przy każdym wyzwoleniu.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Usuwanie grupy</h2>
      <p>
        W wierszu grupy w zakładce Grupy kliknij <strong>Usuń</strong>. Czyści to przypisanie
        do grupy u każdego członka — uczestnicy pozostają w badaniu i nadal otrzymują wszystkie
        powiadomienia, które nie są kierowane do grupy. Stają się dostępni do dodania do nowej grupy.
      </p>
      <p>
        Usunięcie grupy usuwa przypisanie do grupy u każdego członka. Oczekujące powiadomienia
        skierowane do tej grupy nie zostaną dostarczone — w momencie wyzwolenia uczestnicy są
        pomijani, ponieważ nie są już członkami grupy.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Przekazywanie grupy do narzędzia ankietowego</h2>
      <p>
        Aby automatycznie dołączyć grupę każdego uczestnika do URL ankiety, dodaj
        <code>%GROUP_ID%</code> do linku internetowego w powiadomieniu. Samply podstawia
        czteroznakowy identyfikator grupy w momencie wysyłki. Jeśli uczestnik nie ma grupy,
        <code>%GROUP_ID%</code> pozostaje niepodmieniony — twoje narzędzie ankietowe otrzyma
        dosłowny tekst, więc obsłuż to w logice ankiety, jeśli przynależność do grupy nie jest
        gwarantowana dla wszystkich uczestników.
      </p>
      <p>
        Pełną listę dostępnych tokenów i opis działania podstawiania znajdziesz na stronie
        <a href="/docs/placeholders">symbole zastępcze URL</a>.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>Grupy a kody uczestnika</h2>
      <dl>
        <dt>Używaj grup, gdy</dt>
        <dd>
          Chcesz synchronicznych wysyłek sparowanych z kohortą lub gdy musisz kierować różne
          podzbiory na różne harmonogramy powiadomień. Grupy są elementami pierwszej klasy
          w formularzu harmonogramu i decydują, kto otrzyma jakie powiadomienia.
        </dd>
        <dt>Używaj kodów uczestnika, gdy</dt>
        <dd>
          Musisz powiązać uczestników Samply z rekordami w zewnętrznym systemie (identyfikatory
          rejestracji REDCap, identyfikatory instytucjonalne, wcześniej przypisane kody). Kody
          to identyfikatory na osobę, a nie mechanizmy grupowania. Uczestnik może mieć zarówno
          kod, jak i grupę.
        </dd>
      </dl>
    </>
  );
}

function GroupsContentAr() {
  return (
    <>
      <p>
        المجموعة هي مجموعة فرعية مسماة من المشاركين الذين يتلقون الإشعارات بشكل متزامن.
        عندما يستهدف الجدول مجموعة، يرسل Samply الإشعار إلى كل عضو في نفس اللحظة —
        تصميم <strong>مقترن</strong>. هذا يجعل المجموعات مناسبة للدراسات الثنائية
        (الأزواج، الأقران)، أو أبحاث الفرق، أو أي بروتوكول يكون فيه التزامن داخل المجموعة
        أمراً أساسياً. ينتمي كل مشارك إلى مجموعة واحدة على الأكثر.
      </p>

      {/* ── Creating groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>إنشاء مجموعة</h2>
      <p>
        يجب على الباحث إنشاء المجموعات قبل الجدولة. انتقل إلى دراستك، وافتح علامة التبويب{' '}
        <strong>المشاركون</strong> وانقر على <strong>إدارة المجموعات</strong>. أدخل اسم
        المجموعة وحدد المشاركين من القائمة — يظهر فقط المشاركون غير المعيّنين بالفعل في
        مجموعة. انقر على <strong>إنشاء مجموعة</strong> لتعيين جميع المشاركين المحددين
        دفعة واحدة.
      </p>
      <p>
        يقوم Samply تلقائياً بإنشاء <strong>معرف</strong> قصير لكل مجموعة. يُستخدم هذا
        المعرف في العنصر النائب لعنوان URL <code>%GROUP_ID%</code> وفي طابور الجدولة.
        الاسم مرئي فقط للباحثين في لوحة التحكم؛ لا يراه المشاركون أبداً.
      </p>

      {/* ── Yoked timing ──────────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>التوقيت المتزامن (المقترن)</h2>
      <p>
        يتلقى جميع أعضاء المجموعة نفس الإشعار في نفس وقت الإطلاق. يكتب Samply صفاً واحداً
        في الطابور لكل مجموعة بطابع زمني مشترك <em>مُجدوَل لـ</em> ويسلمه لكل عضو بشكل
        متزامن. لا توجد إزاحة لكل عضو ضمن إرسال مجموعة واحدة.
      </p>
      <p>
        بالنسبة للجداول الشخصية (اليوم N بعد التسجيل)، يستخدم Samply تاريخ انضمام{' '}
        <em>آخر عضو مسجل</em> في المجموعة كمرساة مشتركة. وهذا يعني أن كل عضو يشارك في
        نفس اليوم 1 بغض النظر عن وقت انضمامه الفردي — وهذا مقصود للتصاميم الجماعية
        التي تريد فيها أن تتنقل المجموعة عبر البروتوكول معاً من تاريخ مرجعي واحد. إذا كنت
        تحتاج كل مشارك على جدوله الزمني الشخصي، فاستهدفهم بشكل فردي بدلاً من المجموعة.
      </p>

      {/* ── Targeting groups in schedules ─────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>استهداف المجموعات في الجدول</h2>
      <p>
        في الخطوة 2 (المشاركون) من نموذج الجدول، اختر <strong>المجموعات</strong> كجمهور
        وحدد المجموعة أو المجموعات المراد استهدافها. فقط المشاركون المعينون للمجموعة
        (المجموعات) المختارة في لحظة نقرك على <strong>جدولة الإشعارات</strong> يتلقون
        الإرسال من هذا الجدول. المشاركون الذين ينضمون للمجموعة لاحقاً يُدرجون في عمليات
        الإرسال اللاحقة — تتم إعادة تقييم عضوية المجموعة عند كل وقت إطلاق.
      </p>

      {/* ── Deleting groups ───────────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>حذف مجموعة</h2>
      <p>
        انقر على <strong>حذف</strong> في صف المجموعة في علامة تبويب المجموعات. يؤدي هذا
        إلى مسح تعيين المجموعة من كل عضو — يبقى المشاركون في الدراسة ويستمرون في تلقي
        أي إشعارات غير موجهة للمجموعة. يصبحون مؤهلين لإضافتهم إلى مجموعة جديدة.
      </p>
      <p>
        حذف المجموعة يزيل تعيين المجموعة من كل عضو. الإشعارات المعلقة الموجهة لتلك
        المجموعة لن يتم تسليمها — في وقت الإطلاق، لم يعد المشاركون أعضاء في المجموعة،
        لذا يتم تخطيهم.
      </p>

      {/* ── GROUP_ID placeholder ──────────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>تمرير المجموعة إلى أداة الاستطلاع الخاصة بك</h2>
      <p>
        أضف <code>%GROUP_ID%</code> إلى رابط الويب للإشعار لتضمين مجموعة كل مشارك
        تلقائياً في عنوان URL الاستطلاع. يستبدل Samply معرف المجموعة المكوّن من أربعة
        أحرف في وقت الإرسال. إذا لم يكن للمشارك مجموعة، يُترك{' '}
        <code>%GROUP_ID%</code> دون استبدال — تتلقى أداة الاستطلاع لديك النص الحرفي، لذا
        تعامل مع هذا في منطق الاستطلاع إذا لم تكن عضوية المجموعة مضمونة لجميع المشاركين.
      </p>
      <p>
        راجع <a href='/docs/placeholders'>العناصر النائبة لعنوان URL</a> للقائمة الكاملة
        من الرموز المتاحة وكيفية عمل الاستبدال.
      </p>

      {/* ── Groups vs participant codes ────────────────────────────────────── */}
      <h2 style={{ marginTop: '3.6rem' }}>المجموعات مقابل أكواد المشارك</h2>
      <dl>
        <dt>استخدم المجموعات عندما</dt>
        <dd>
          تريد إرسالاً متزامناً ومقترناً لمجموعة، أو تحتاج إلى توجيه مجموعات فرعية مختلفة
          إلى جداول إشعارات مختلفة. المجموعات هي عناصر من الدرجة الأولى في نموذج الجدول
          وتحدد من يتلقى أي إشعارات.
        </dd>
        <dt>استخدم أكواد المشارك عندما</dt>
        <dd>
          تحتاج إلى مطابقة مشاركي Samply بسجلات في نظام خارجي (معرفات سجلات REDCap،
          والمعرفات المؤسسية، والأكواد المعينة مسبقاً). الأكواد هي معرفات لكل شخص،
          وليست آليات تجميع. يمكن أن يكون لدى المشارك كود ومجموعة معاً.
        </dd>
      </dl>
    </>
  );
}
