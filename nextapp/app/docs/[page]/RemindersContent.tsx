import type { Locale } from "@/lib/i18n";

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

function CompletionPointer({ lang }: { lang: string }) {
  const T: Record<string, { h: string; p: React.ReactNode }> = {
    en: { h: "Registering a completion event", p: <>Samply cancels pending reminders as soon as it receives a completion event for a send. Your survey tool signals completion by redirecting the participant to Samply&apos;s completion endpoint with the message id at the end of the survey. The exact setup for each tool — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap and more — is in the <a href="/docs/integrations">Survey integrations</a> guides. Make sure <code>%MESSAGE_ID%</code> is included in your notification link (see <a href="/docs/placeholders">URL placeholders</a>). For the completion endpoint itself — the URL your survey tool redirects to — see the <a href="/docs/api">API reference</a>.</> },
    de: { h: "Ein Abschlussereignis registrieren", p: <>Samply bricht ausstehende Erinnerungen ab, sobald ein Abschlussereignis für einen Versand eingeht. Ihr Umfragetool signalisiert den Abschluss, indem es den Teilnehmer am Umfrageende mit der Nachrichten-ID zum Samply-Abschluss-Endpunkt weiterleitet. Die genaue Einrichtung je Tool — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap und mehr — finden Sie in den <a href="/docs/integrations">Umfrage-Integrationen</a>. Achten Sie darauf, dass <code>%MESSAGE_ID%</code> in Ihrem Benachrichtigungslink enthalten ist (siehe <a href="/docs/placeholders">URL-Platzhalter</a>). Den Abschluss-Endpunkt selbst — die URL, zu der Ihr Umfragetool weiterleitet — finden Sie in der <a href="/docs/api">API-Referenz</a>.</> },
    nl: { h: "Een voltooiingsgebeurtenis registreren", p: <>Samply annuleert openstaande herinneringen zodra het een voltooiingsgebeurtenis voor een verzending ontvangt. Uw enquetetool signaleert voltooiing door de deelnemer aan het einde van de enquete met de bericht-id naar het Samply-voltooiingseindpunt te leiden. De exacte instelling per tool — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap en meer — staat in de <a href="/docs/integrations">Enquete-integraties</a>. Zorg dat <code>%MESSAGE_ID%</code> in uw notificatielink staat (zie <a href="/docs/placeholders">URL-plaatshouders</a>). Het voltooiingseindpunt zelf — de URL waarnaar uw enquetetool doorstuurt — vindt u in de <a href="/docs/api">API-referentie</a>.</> },
    ru: { h: "Регистрация события завершения", p: <>Samply отменяет ожидающие напоминания, как только получает событие завершения для отправки. Ваш инструмент опроса сигнализирует о завершении, перенаправляя участника в конце опроса на конечную точку завершения Samply с идентификатором сообщения. Точная настройка для каждого инструмента — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap и других — описана в разделе <a href="/docs/integrations">Интеграции опросов</a>. Убедитесь, что <code>%MESSAGE_ID%</code> включён в ссылку уведомления (см. <a href="/docs/placeholders">URL-заполнители</a>). Сам конечный пункт завершения — URL, на который перенаправляет ваш инструмент опроса, — описан в <a href="/docs/api">справочнике API</a>.</> },
    zh: { h: "注册完成事件", p: <>一旦收到某次发送的完成事件，Samply 就会取消待处理的提醒。您的问卷工具通过在问卷结束时将参与者重定向到带有消息 ID 的 Samply 完成端点来发出完成信号。每个工具（Qualtrics、SoSci、LimeSurvey、Unipark、REDCap 等）的具体设置请参见<a href="/docs/integrations">问卷集成</a>指南。请确保通知链接中包含 <code>%MESSAGE_ID%</code>（参见<a href="/docs/placeholders">URL 占位符</a>）。完成端点本身——您的问卷工具重定向到的 URL——请参见 <a href="/docs/api">API 参考</a>。</> },
    ko: { h: "완료 이벤트 등록", p: <>Samply는 발송에 대한 완료 이벤트를 수신하는 즉시 대기 중인 알림을 취소합니다. 설문 도구는 설문 종료 시 참가자를 메시지 ID와 함께 Samply 완료 엔드포인트로 리디렉션하여 완료를 알립니다. 각 도구(Qualtrics, SoSci, LimeSurvey, Unipark, REDCap 등)의 정확한 설정은 <a href="/docs/integrations">설문 통합</a> 가이드에 있습니다. 알림 링크에 <code>%MESSAGE_ID%</code>가 포함되어 있는지 확인하세요(<a href="/docs/placeholders">URL 자리표시자</a> 참조). 완료 엔드포인트 자체 — 설문 도구가 리디렉션하는 URL — 는 <a href="/docs/api">API 참조</a>에 설명되어 있습니다.</> },
    it: { h: "Registrare un evento di completamento", p: <>Samply annulla i promemoria in sospeso non appena riceve un evento di completamento per un invio. Il tuo strumento di sondaggio segnala il completamento reindirizzando il partecipante all&apos;endpoint di completamento di Samply con l&apos;ID del messaggio alla fine del sondaggio. La configurazione esatta per ogni strumento — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap e altri — è nelle guide <a href="/docs/integrations">Integrazioni dei sondaggi</a>. Assicurati che <code>%MESSAGE_ID%</code> sia incluso nel link di notifica (vedi <a href="/docs/placeholders">Segnaposto URL</a>). L&apos;endpoint di completamento stesso — l&apos;URL a cui reindirizza il tuo strumento di sondaggio — è descritto nel <a href="/docs/api">riferimento API</a>.</> },
    fr: { h: "Enregistrer un événement d'achèvement", p: <>Samply annule les rappels en attente dès qu&apos;il reçoit un événement d&apos;achèvement pour un envoi. Votre outil d&apos;enquête signale l&apos;achèvement en redirigeant le participant vers le point de terminaison d&apos;achèvement de Samply avec l&apos;ID du message à la fin de l&apos;enquête. La configuration exacte pour chaque outil — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap et plus — se trouve dans les guides <a href="/docs/integrations">Intégrations d&apos;enquête</a>. Assurez-vous que <code>%MESSAGE_ID%</code> figure dans votre lien de notification (voir <a href="/docs/placeholders">Espaces réservés d&apos;URL</a>). Le point de terminaison d&apos;achèvement lui-même — l&apos;URL vers laquelle votre outil d&apos;enquête redirige — est décrit dans la <a href="/docs/api">référence de l&apos;API</a>.</> },
    es: { h: "Registrar un evento de finalización", p: <>Samply cancela los recordatorios pendientes en cuanto recibe un evento de finalización de un envío. Tu herramienta de encuesta señala la finalización redirigiendo al participante al punto final de finalización de Samply con el id del mensaje al terminar la encuesta. La configuración exacta de cada herramienta — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap y más — está en las guías de <a href="/docs/integrations">Integraciones de encuestas</a>. Asegúrate de incluir <code>%MESSAGE_ID%</code> en tu enlace de notificación (consulta <a href="/docs/placeholders">Marcadores de URL</a>). El punto final de finalización en sí — la URL a la que redirige tu herramienta de encuesta — se describe en la <a href="/docs/api">referencia de la API</a>.</> },
    pt: { h: "Registrar um evento de conclusão", p: <>O Samply cancela os lembretes pendentes assim que recebe um evento de conclusão de um envio. Sua ferramenta de pesquisa sinaliza a conclusão redirecionando o participante para o endpoint de conclusão do Samply com o id da mensagem no fim da pesquisa. A configuração exata de cada ferramenta — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap e mais — está nos guias de <a href="/docs/integrations">Integrações de pesquisa</a>. Garanta que <code>%MESSAGE_ID%</code> esteja no seu link de notificação (veja <a href="/docs/placeholders">Espaços reservados de URL</a>). O próprio endpoint de conclusão — a URL para a qual sua ferramenta de pesquisa redireciona — está descrito na <a href="/docs/api">referência da API</a>.</> },
    ja: { h: "完了イベントの登録", p: <>Samply は送信の完了イベントを受信するとすぐに、保留中のリマインダーをキャンセルします。アンケートツールは、アンケート終了時に参加者をメッセージ ID 付きで Samply の完了エンドポイントにリダイレクトすることで完了を通知します。各ツール（Qualtrics、SoSci、LimeSurvey、Unipark、REDCap など）の具体的な設定は<a href="/docs/integrations">アンケート連携</a>ガイドにあります。通知リンクに <code>%MESSAGE_ID%</code> が含まれていることを確認してください（<a href="/docs/placeholders">URL プレースホルダー</a>を参照）。完了エンドポイント自体（アンケートツールがリダイレクトする URL）については、<a href="/docs/api">API リファレンス</a>を参照してください。</> },
    tr: { h: "Tamamlanma olayını kaydetme", p: <>Samply, bir gönderim için tamamlanma olayı aldığı anda bekleyen hatırlatıcıları iptal eder. Anket aracınız, anket sonunda katılımcıyı mesaj kimliğiyle birlikte Samply tamamlanma uç noktasına yönlendirerek tamamlanmayı bildirir. Her araç için tam kurulum — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap ve daha fazlası — <a href="/docs/integrations">Anket entegrasyonları</a> kılavuzlarındadır. Bildirim bağlantınızda <code>%MESSAGE_ID%</code> bulunduğundan emin olun (bkz. <a href="/docs/placeholders">URL yer tutucuları</a>). Tamamlanma uç noktasının kendisi — anket aracınızın yönlendirdiği URL — <a href="/docs/api">API referansında</a> açıklanmıştır.</> },
    pl: { h: "Rejestrowanie zdarzenia ukończenia", p: <>Samply anuluje oczekujące przypomnienia, gdy tylko otrzyma zdarzenie ukończenia dla wysyłki. Twoje narzędzie ankietowe sygnalizuje ukończenie, przekierowując uczestnika na koniec ankiety do punktu końcowego ukończenia Samply z identyfikatorem wiadomości. Dokładna konfiguracja dla każdego narzędzia — Qualtrics, SoSci, LimeSurvey, Unipark, REDCap i więcej — znajduje się w przewodnikach <a href="/docs/integrations">Integracje ankiet</a>. Upewnij się, że <code>%MESSAGE_ID%</code> znajduje się w linku powiadomienia (zobacz <a href="/docs/placeholders">Symbole zastępcze URL</a>). Sam punkt końcowy ukończenia — adres URL, na który przekierowuje Twoje narzędzie ankietowe — jest opisany w <a href="/docs/api">dokumentacji API</a>.</> },
    ar: { h: "تسجيل حدث الإكمال", p: <>يلغي Samply التذكيرات المعلقة بمجرد تلقيه حدث إكمال لعملية إرسال. تشير أداة الاستبيان إلى الإكمال بإعادة توجيه المشارك إلى نقطة نهاية الإكمال في Samply مع معرّف الرسالة في نهاية الاستبيان. الإعداد الدقيق لكل أداة — Qualtrics وSoSci وLimeSurvey وUnipark وREDCap وغيرها — موجود في أدلة <a href="/docs/integrations">تكاملات الاستبيان</a>. تأكد من تضمين <code>%MESSAGE_ID%</code> في رابط الإشعار (انظر <a href="/docs/placeholders">عناصر URL النائبة</a>). نقطة نهاية الإكمال نفسها — عنوان URL الذي تعيد أداة الاستبيان التوجيه إليه — موصوفة في <a href="/docs/api">مرجع API</a>.</> },
  };
  const c = T[lang] ?? T.en;
  return (
    <>
      <h2>{c.h}</h2>
      <p style={{ fontSize: '1.4rem', lineHeight: 1.65, color: 'var(--ink-60)' }}>{c.p}</p>
    </>
  );
}

function RemindersContentEn({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        A reminder is a follow-up push notification that Samply sends automatically when it
        has not detected a survey completion for the original send. Reminders are optional
        and configured per schedule. They fire at a fixed offset after the original
        notification — unless the participant completes the survey first, in which case
        Samply cancels all pending reminders for that send automatically.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>How reminders work</h2>
      <p>
        When Samply dispatches an original notification, it immediately schedules any
        configured reminder rows in the queue. Each reminder row is a separate{' '}
        <strong>pending</strong> queue entry with <strong>Reminder: yes</strong>. The
        reminder inherits the same survey URL (including all substituted placeholder
        values) as the original send — participants who tap the reminder link land in the
        same survey session.
      </p>
      <p>
        Reminders are cancelled in two ways:
      </p>
      <ol>
        <li>
          Samply receives a <strong>completion event</strong> for the original send (via
          redirect or POST request — see below). It immediately cancels all pending
          reminders that share the same internal send ID.
        </li>
        <li>
          You manually delete the schedule or cancel the rows from the{' '}
          <a href='/docs/queue'>queue</a>.
        </li>
      </ol>
      <p>
        Without a completion event, every send gets a reminder regardless of whether the
        participant actually completed the survey.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configuring reminders in the schedule form</h2>
      <p>
        Step 9 of the schedule form is the reminder section. Toggle{' '}
        <strong>Send reminders</strong> to reveal the reminder planner. For each reminder
        you want to send, fill in:
      </p>
      <dl>
        <dt>Reminder title</dt>
        <dd>The bold first line of the reminder push notification on the participant device.</dd>
        <dt>Reminder message</dt>
        <dd>The notification body — the second line visible in the system tray.</dd>
        <dt>Sent after</dt>
        <dd>
          The delay from the original notification: days + hours + minutes. A reminder set
          to 0 days, 1 hour, 0 minutes fires one hour after the original send. All three
          fields default to 0 — set at least one to a non-zero value.
        </dd>
      </dl>
      <p>
        Click <strong>Add new reminder</strong> to add a second reminder at a different
        offset. You can chain as many reminders as needed — for example, a first reminder
        at 1 hour and a second at 4 hours. All reminders are cancelled as soon as a
        completion event arrives, regardless of which have already fired.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="en" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Things to watch out for</h3>
      <dl>
        <dt>Reminders fire if no completion event arrives</dt>
        <dd>
          If the redirect or POST never reaches Samply — because the participant abandoned
          the survey mid-way, because the survey tool was misconfigured, or because the
          completion URL had a typo — the reminder will fire as scheduled. Test the full
          flow with a test participant before going live.
        </dd>
        <dt>Reminders inherit the original substituted URL</dt>
        <dd>
          The survey URL embedded in reminder notifications is the already-substituted URL
          from the original send — not a fresh substitution. The same message ID, batch
          number, and timestamps apply. This is intentional: the reminder should reopen
          the same survey session. If your survey tool creates a new response for each
          link open, ensure your logic handles this.
        </dd>
        <dt>Reminder rows count toward the queue limit</dt>
        <dd>
          Each reminder row is a separate pending entry in the queue and counts toward the
          50,000-row limit per study. A schedule with 100 participants and 2 reminders per
          send generates 3 rows per send, not 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentDe({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Eine Erinnerung ist eine Nachfass-Push-Benachrichtigung, die Samply automatisch sendet, wenn es
        keinen Umfrageabschluss für den ursprünglichen Versand festgestellt hat. Erinnerungen sind
        optional und werden pro Zeitplan konfiguriert. Sie werden nach einem festen Zeitfenster nach der
        ursprünglichen Benachrichtigung ausgelöst — es sei denn, der Teilnehmer schließt die Umfrage
        zuerst ab, in welchem Fall Samply alle ausstehenden Erinnerungen für diesen Versand automatisch
        abbricht.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Wie Erinnerungen funktionieren</h2>
      <p>
        Wenn Samply eine ursprüngliche Benachrichtigung versendet, plant es sofort alle konfigurierten
        Erinnerungszeilen in der Warteschlange. Jede Erinnerungszeile ist ein separater{' '}
        <strong>ausstehender</strong> Warteschlangeneintrag mit <strong>Erinnerung: ja</strong>. Die
        Erinnerung übernimmt dieselbe Umfrage-URL (einschließlich aller ersetzten Platzhalter-Werte)
        wie der ursprüngliche Versand — Teilnehmer, die auf den Erinnerungslink tippen, landen in
        derselben Umfragesitzung.
      </p>
      <p>
        Erinnerungen werden auf zwei Arten abgebrochen:
      </p>
      <ol>
        <li>
          Samply erhält ein <strong>Abschlussereignis</strong> für den ursprünglichen Versand (per
          Weiterleitung oder POST-Anfrage — siehe unten). Es bricht sofort alle ausstehenden
          Erinnerungen ab, die dieselbe interne Versand-ID teilen.
        </li>
        <li>
          Sie löschen den Zeitplan manuell oder brechen die Zeilen in der{' '}
          <a href='/docs/queue'>Warteschlange</a> ab.
        </li>
      </ol>
      <p>
        Ohne ein Abschlussereignis erhält jeder Versand eine Erinnerung, unabhängig davon, ob der
        Teilnehmer die Umfrage tatsächlich abgeschlossen hat.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Erinnerungen im Zeitplanformular konfigurieren</h2>
      <p>
        Schritt 9 des Zeitplanformulars ist der Erinnerungsbereich. Aktivieren Sie{' '}
        <strong>Erinnerungen senden</strong>, um den Erinnerungsplaner anzuzeigen. Füllen Sie für jede
        Erinnerung, die Sie senden möchten, Folgendes aus:
      </p>
      <dl>
        <dt>Erinnerungstitel</dt>
        <dd>Die fett gedruckte erste Zeile der Erinnerungs-Push-Benachrichtigung auf dem Gerät des Teilnehmers.</dd>
        <dt>Erinnerungsnachricht</dt>
        <dd>Der Benachrichtigungstext — die zweite in der Systemleiste sichtbare Zeile.</dd>
        <dt>Gesendet nach</dt>
        <dd>
          Die Verzögerung gegenüber der ursprünglichen Benachrichtigung: Tage + Stunden + Minuten. Eine
          Erinnerung, die auf 0 Tage, 1 Stunde, 0 Minuten eingestellt ist, wird eine Stunde nach dem
          ursprünglichen Versand ausgelöst. Alle drei Felder haben den Standardwert 0 — setzen Sie
          mindestens einen auf einen Wert ungleich null.
        </dd>
      </dl>
      <p>
        Klicken Sie auf <strong>Neue Erinnerung hinzufügen</strong>, um eine zweite Erinnerung mit einem
        anderen Zeitfenster hinzuzufügen. Sie können beliebig viele Erinnerungen verketten — zum Beispiel
        eine erste Erinnerung nach 1 Stunde und eine zweite nach 4 Stunden. Alle Erinnerungen werden
        abgebrochen, sobald ein Abschlussereignis eintrifft, unabhängig davon, welche bereits ausgelöst
        wurden.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="de" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Worauf Sie achten sollten</h3>
      <dl>
        <dt>Erinnerungen werden ausgelöst, wenn kein Abschlussereignis eintrifft</dt>
        <dd>
          Wenn die Weiterleitung oder der POST Samply nie erreicht — weil der Teilnehmer die Umfrage
          auf halbem Weg abgebrochen hat, weil das Umfragetool falsch konfiguriert war oder weil die
          Abschluss-URL einen Tippfehler enthielt — wird die Erinnerung wie geplant ausgelöst. Testen
          Sie den gesamten Ablauf mit einem Testteilnehmer, bevor Sie live gehen.
        </dd>
        <dt>Erinnerungen übernehmen die ursprünglich ersetzte URL</dt>
        <dd>
          Die in Erinnerungs-Benachrichtigungen eingebettete Umfrage-URL ist die bereits ersetzte URL
          aus dem ursprünglichen Versand — keine frische Ersetzung. Dieselbe Nachrichten-ID, Batch-
          Nummer und Zeitstempel gelten. Dies ist beabsichtigt: Die Erinnerung soll dieselbe
          Umfragesitzung wieder öffnen. Wenn Ihr Umfragetool für jedes Öffnen eines Links eine neue
          Antwort erstellt, stellen Sie sicher, dass Ihre Logik damit umgeht.
        </dd>
        <dt>Erinnerungszeilen zählen zum Warteschlangen-Limit</dt>
        <dd>
          Jede Erinnerungszeile ist ein separater ausstehender Eintrag in der Warteschlange und zählt
          zum Limit von 50.000 Zeilen pro Studie. Ein Zeitplan mit 100 Teilnehmern und 2 Erinnerungen
          pro Versand erzeugt 3 Zeilen pro Versand, nicht 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentNl({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Een herinnering is een opvolgende push-notificatie die Samply automatisch verstuurt wanneer het
        geen voltooiing van de enquete heeft gedetecteerd voor de oorspronkelijke verzending.
        Herinneringen zijn optioneel en worden per planning geconfigureerd. Ze worden verstuurd na een
        vaste vertraging na de oorspronkelijke notificatie — tenzij de deelnemer de enquete eerst
        voltooit, in welk geval Samply alle openstaande herinneringen voor die verzending automatisch
        annuleert.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Hoe herinneringen werken</h2>
      <p>
        Wanneer Samply een oorspronkelijke notificatie verstuurt, plant het onmiddellijk alle
        geconfigureerde herinneringsrijen in de wachtrij. Elke herinneringsrij is een afzonderlijk{' '}
        <strong>openstaand</strong> wachtrij-item met <strong>Herinnering: ja</strong>. De herinnering
        erft dezelfde enquete-URL (inclusief alle vervangen plaatshouderwaarden) als de oorspronkelijke
        verzending — deelnemers die op de herinneringslink tikken, komen terecht in dezelfde
        enquetesessie.
      </p>
      <p>
        Herinneringen worden op twee manieren geannuleerd:
      </p>
      <ol>
        <li>
          Samply ontvangt een <strong>voltooiingsgebeurtenis</strong> voor de oorspronkelijke verzending
          (via doorsturen of POST-verzoek — zie hieronder). Het annuleert onmiddellijk alle openstaande
          herinneringen die dezelfde interne verzend-ID delen.
        </li>
        <li>
          U verwijdert de planning handmatig of annuleert de rijen vanuit de{' '}
          <a href='/docs/queue'>wachtrij</a>.
        </li>
      </ol>
      <p>
        Zonder een voltooiingsgebeurtenis krijgt elke verzending een herinnering, ongeacht of de
        deelnemer de enquete daadwerkelijk heeft voltooid.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Herinneringen configureren in het planningsformulier</h2>
      <p>
        Stap 9 van het planningsformulier is het herinneringsgedeelte. Schakel{' '}
        <strong>Herinneringen versturen</strong> in om de herinneringsplanner te tonen. Vul voor elke
        herinnering die u wilt versturen het volgende in:
      </p>
      <dl>
        <dt>Herinneringstitel</dt>
        <dd>De vetgedrukte eerste regel van de herinneringspush-notificatie op het apparaat van de deelnemer.</dd>
        <dt>Herinneringsbericht</dt>
        <dd>De notificatietekst — de tweede regel die zichtbaar is in de systeembalk.</dd>
        <dt>Verzonden na</dt>
        <dd>
          De vertraging ten opzichte van de oorspronkelijke notificatie: dagen + uren + minuten.
          Een herinnering ingesteld op 0 dagen, 1 uur, 0 minuten wordt één uur na de oorspronkelijke
          verzending verstuurd. Alle drie velden hebben standaard de waarde 0 — stel minimaal één in
          op een waarde niet gelijk aan nul.
        </dd>
      </dl>
      <p>
        Klik op <strong>Nieuwe herinnering toevoegen</strong> om een tweede herinnering toe te voegen
        met een andere vertraging. U kunt zoveel herinneringen aan elkaar koppelen als nodig —
        bijvoorbeeld een eerste herinnering na 1 uur en een tweede na 4 uur. Alle herinneringen worden
        geannuleerd zodra een voltooiingsgebeurtenis binnenkomt, ongeacht welke al zijn verstuurd.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="nl" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aandachtspunten</h3>
      <dl>
        <dt>Herinneringen worden verstuurd als er geen voltooiingsgebeurtenis aankomt</dt>
        <dd>
          Als het doorsturen of de POST Samply nooit bereikt — omdat de deelnemer de enquete halverwege
          heeft afgebroken, omdat de enquetetool verkeerd was geconfigureerd, of omdat de voltooiings-URL
          een typefout bevatte — wordt de herinnering verstuurd zoals gepland. Test de volledige stroom
          met een testdeelnemer voordat u live gaat.
        </dd>
        <dt>Herinneringen erven de oorspronkelijk vervangen URL</dt>
        <dd>
          De enquete-URL die is ingebed in herinneringsnotificaties is de al-vervangen URL van de
          oorspronkelijke verzending — geen nieuwe vervanging. Dezelfde bericht-ID, batchnummer en
          tijdstempels zijn van toepassing. Dit is bewust: de herinnering moet dezelfde enquetesessie
          heropenen. Als uw enquetetool een nieuw antwoord aanmaakt voor elke keer dat een link wordt
          geopend, zorg er dan voor dat uw logica dit afhandelt.
        </dd>
        <dt>Herinneringsrijen tellen mee voor het wachtrij-limiet</dt>
        <dd>
          Elke herinneringsrij is een afzonderlijk openstaand item in de wachtrij en telt mee voor het
          limiet van 50.000 rijen per studie. Een planning met 100 deelnemers en 2 herinneringen per
          verzending genereert 3 rijen per verzending, niet 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentRu({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Напоминание — это повторное push-уведомление, которое Samply отправляет автоматически,
        если не зафиксировало завершение опроса по исходной отправке. Напоминания необязательны
        и настраиваются для каждого расписания отдельно. Они срабатывают через фиксированный
        промежуток после исходного уведомления — если только участник не завершит опрос
        раньше, в этом случае Samply автоматически отменяет все ожидающие напоминания
        для данной отправки.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Как работают напоминания</h2>
      <p>
        Когда Samply отправляет исходное уведомление, оно немедленно ставит в очередь все
        настроенные строки напоминаний. Каждая строка напоминания — это отдельная{' '}
        <strong>ожидающая</strong> запись в очереди с пометкой <strong>Напоминание: да</strong>.
        Напоминание наследует тот же URL опроса (включая все подставленные значения
        заполнителей), что и исходная отправка — участники, перейдя по ссылке напоминания,
        попадают в ту же сессию опроса.
      </p>
      <p>
        Напоминания отменяются двумя способами:
      </p>
      <ol>
        <li>
          Samply получает <strong>событие завершения</strong> для исходной отправки (через
          перенаправление или POST-запрос — см. ниже). Оно немедленно отменяет все ожидающие
          напоминания с тем же внутренним идентификатором отправки.
        </li>
        <li>
          Вы вручную удаляете расписание или отменяете строки из{' '}
          <a href='/docs/queue'>очереди</a>.
        </li>
      </ol>
      <p>
        Без события завершения каждая отправка получает напоминание независимо от того,
        действительно ли участник прошёл опрос.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Настройка напоминаний в форме расписания</h2>
      <p>
        Шаг 9 формы расписания — раздел напоминаний. Включите{' '}
        <strong>Отправлять напоминания</strong>, чтобы открыть планировщик напоминаний.
        Для каждого напоминания заполните:
      </p>
      <dl>
        <dt>Заголовок напоминания</dt>
        <dd>Жирная первая строка push-уведомления-напоминания на устройстве участника.</dd>
        <dt>Текст напоминания</dt>
        <dd>Тело уведомления — вторая строка, отображаемая в панели уведомлений.</dd>
        <dt>Отправить через</dt>
        <dd>
          Задержка после исходного уведомления: дни + часы + минуты. Напоминание,
          установленное на 0 дней, 1 час, 0 минут, сработает через час после исходной
          отправки. Все три поля по умолчанию равны 0 — установите хотя бы одно
          ненулевое значение.
        </dd>
      </dl>
      <p>
        Нажмите <strong>Добавить напоминание</strong>, чтобы добавить второе напоминание с
        другой задержкой. Можно настроить любое количество напоминаний — например, первое
        через 1 час, второе через 4 часа. Все напоминания отменяются, как только поступает
        событие завершения, независимо от того, какие из них уже были отправлены.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="ru" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>На что обратить внимание</h3>
      <dl>
        <dt>Напоминания срабатывают, если событие завершения не поступает</dt>
        <dd>
          Если перенаправление или POST никогда не достигнет Samply — потому что участник
          бросил опрос на полпути, инструмент был неправильно настроен или в URL завершения
          была опечатка — напоминание сработает по расписанию. Проверьте полный сценарий
          с тестовым участником перед запуском.
        </dd>
        <dt>Напоминания наследуют исходный подставленный URL</dt>
        <dd>
          URL опроса, встроенный в уведомления-напоминания, — это уже подставленный URL из
          исходной отправки, а не новая подстановка. Применяются тот же идентификатор
          сообщения, номер пакета и временные метки. Это сделано намеренно: напоминание
          должно повторно открывать ту же сессию опроса. Если ваш инструмент создаёт новый
          ответ при каждом открытии ссылки, убедитесь, что ваша логика это учитывает.
        </dd>
        <dt>Строки напоминаний учитываются в лимите очереди</dt>
        <dd>
          Каждая строка напоминания — это отдельная ожидающая запись в очереди и учитывается
          в лимите 50 000 строк на исследование. Расписание со 100 участниками и 2
          напоминаниями на отправку создаёт 3 строки на отправку, а не 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentZh({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        提醒是一种后续推送通知，当 Samply 未检测到原始发送的问卷完成情况时，会自动发送。
        提醒是可选的，按计划配置。它们在原始通知发出后的固定时间偏移量后触发——
        除非参与者先完成问卷，在这种情况下，Samply 会自动取消该次发送的所有待处理提醒。
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>提醒的工作原理</h2>
      <p>
        当 Samply 发送原始通知时，它会立即将所有配置的提醒行加入队列。每条提醒行都是一个单独的{' '}
        <strong>待处理</strong>队列条目，带有<strong>提醒：是</strong>标记。
        提醒继承与原始发送相同的问卷 URL（包括所有已替换的占位符值）——
        点击提醒链接的参与者会进入同一问卷会话。
      </p>
      <p>
        提醒以两种方式取消：
      </p>
      <ol>
        <li>
          Samply 收到原始发送的<strong>完成事件</strong>（通过重定向或 POST 请求——见下文）。
          它会立即取消所有共享相同内部发送 ID 的待处理提醒。
        </li>
        <li>
          您从<a href='/docs/queue'>队列</a>中手动删除计划或取消行。
        </li>
      </ol>
      <p>
        如果没有完成事件，无论参与者是否实际完成了问卷，每次发送都会收到提醒。
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>在计划表单中配置提醒</h2>
      <p>
        计划表单的第 9 步是提醒部分。切换<strong>发送提醒</strong>以显示提醒规划器。
        对于每条要发送的提醒，请填写：
      </p>
      <dl>
        <dt>提醒标题</dt>
        <dd>参与者设备上提醒推送通知的粗体第一行。</dd>
        <dt>提醒内容</dt>
        <dd>通知正文——系统托盘中显示的第二行。</dd>
        <dt>发送于</dt>
        <dd>
          距原始通知的延迟：天 + 小时 + 分钟。设置为 0 天、1 小时、0 分钟的提醒
          将在原始发送后一小时触发。三个字段默认均为 0——至少将其中一个设置为非零值。
        </dd>
      </dl>
      <p>
        点击<strong>添加新提醒</strong>以在不同偏移量处添加第二条提醒。
        您可以根据需要链接任意数量的提醒——例如，第一条在 1 小时后，第二条在 4 小时后。
        无论哪些提醒已经触发，一旦收到完成事件，所有提醒都会被取消。
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="zh" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意事项</h3>
      <dl>
        <dt>如果没有完成事件，提醒将会触发</dt>
        <dd>
          如果重定向或 POST 从未到达 Samply——因为参与者中途放弃了问卷、问卷工具配置错误，
          或完成 URL 有拼写错误——提醒将按计划触发。在正式运行前，使用测试参与者测试完整流程。
        </dd>
        <dt>提醒继承原始替换后的 URL</dt>
        <dd>
          嵌入在提醒通知中的问卷 URL 是原始发送中已替换的 URL——而非新的替换。
          相同的消息 ID、批次编号和时间戳均适用。这是有意为之：提醒应重新打开同一问卷会话。
          如果您的问卷工具为每次链接打开都创建新响应，请确保您的逻辑能处理这种情况。
        </dd>
        <dt>提醒行计入队列限制</dt>
        <dd>
          每条提醒行都是队列中单独的待处理条目，计入每项研究 50,000 行的限制。
          一个有 100 名参与者、每次发送 2 条提醒的计划，每次发送会生成 3 行，而不是 1 行。
        </dd>
      </dl>
    </>
  );
}

export default function RemindersContent({ baseUrl, locale }: { baseUrl: string; locale: Locale }) {
  if (locale === "de") return <RemindersContentDe baseUrl={baseUrl} />;
  if (locale === "nl") return <RemindersContentNl baseUrl={baseUrl} />;
  if (locale === "ru") return <RemindersContentRu baseUrl={baseUrl} />;
  if (locale === "zh") return <RemindersContentZh baseUrl={baseUrl} />;
  if (locale === "ko") return <RemindersContentKo baseUrl={baseUrl} />;
  if (locale === "it") return <RemindersContentIt baseUrl={baseUrl} />;
  if (locale === "fr") return <RemindersContentFr baseUrl={baseUrl} />;
  if (locale === "es") return <RemindersContentEs baseUrl={baseUrl} />;
  if (locale === "pt") return <RemindersContentPt baseUrl={baseUrl} />;
  if (locale === "ja") return <RemindersContentJa baseUrl={baseUrl} />;
  if (locale === "ar") return <RemindersContentAr baseUrl={baseUrl} />;
  if (locale === "pl") return <RemindersContentPl baseUrl={baseUrl} />;
  if (locale === "tr") return <RemindersContentTr baseUrl={baseUrl} />;
  return <RemindersContentEn baseUrl={baseUrl} />;
}

function RemindersContentKo({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        알림은 Samply가 원래 발송에 대한 설문 완료를 감지하지 못했을 때 자동으로 발송하는 후속 푸시 알림입니다.
        알림은 선택 사항이며 일정별로 설정합니다. 참여자가 먼저 설문을 완료하지 않는 한
        원래 알림 이후 고정된 간격으로 발송됩니다 — 완료 시 Samply는 해당 발송에 대한
        모든 대기 중인 알림을 자동으로 취소합니다.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>알림의 작동 방식</h2>
      <p>
        Samply가 원래 알림을 발송하면 설정된 모든 알림 행을 즉시 대기열에 예약합니다.
        각 알림 행은 <strong>알림: 예</strong>가 표시된 별도의{' '}
        <strong>대기 중</strong> 대기열 항목입니다.
        알림은 원래 발송과 동일한 설문 URL(모든 대체된 플레이스홀더 값 포함)을 상속합니다 —
        알림 링크를 탭하는 참여자는 동일한 설문 세션으로 이동합니다.
      </p>
      <p>
        알림은 두 가지 방법으로 취소됩니다:
      </p>
      <ol>
        <li>
          Samply가 원래 발송에 대한 <strong>완료 이벤트</strong>를 수신합니다(리디렉션 또는
          POST 요청을 통해 — 아래 참조). 동일한 내부 발송 ID를 공유하는 모든 대기 중인
          알림을 즉시 취소합니다.
        </li>
        <li>
          <a href='/docs/queue'>대기열</a>에서 수동으로 일정을 삭제하거나 행을 취소합니다.
        </li>
      </ol>
      <p>
        완료 이벤트가 없으면 참여자가 실제로 설문을 완료했는지 여부와 관계없이 모든 발송에 알림이 발송됩니다.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>일정 양식에서 알림 설정하기</h2>
      <p>
        일정 양식의 9단계가 알림 섹션입니다. <strong>알림 보내기</strong>를 토글하여
        알림 플래너를 표시하십시오. 보내려는 각 알림에 대해 다음을 입력하십시오:
      </p>
      <dl>
        <dt>알림 제목</dt>
        <dd>참여자 기기의 알림 푸시 알림에서 굵게 표시되는 첫 번째 줄입니다.</dd>
        <dt>알림 메시지</dt>
        <dd>알림 본문 — 시스템 트레이에 표시되는 두 번째 줄입니다.</dd>
        <dt>발송 후 시간</dt>
        <dd>
          원래 알림으로부터의 지연: 일 + 시간 + 분. 0일, 1시간, 0분으로 설정된 알림은
          원래 발송 후 한 시간 뒤에 발송됩니다. 세 필드 모두 기본값이 0이므로
          적어도 하나를 0이 아닌 값으로 설정하십시오.
        </dd>
      </dl>
      <p>
        <strong>새 알림 추가</strong>를 클릭하여 다른 간격으로 두 번째 알림을 추가하십시오.
        필요한 만큼 알림을 연결할 수 있습니다 — 예를 들어 1시간 후 첫 번째 알림,
        4시간 후 두 번째 알림. 이미 발송된 알림에 관계없이 완료 이벤트가 도착하는 즉시
        모든 알림이 취소됩니다.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="ko" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>주의 사항</h3>
      <dl>
        <dt>완료 이벤트가 도착하지 않으면 알림이 발송됩니다</dt>
        <dd>
          참여자가 설문 중간에 포기했거나, 설문 도구가 잘못 구성되었거나, 완료 URL에 오타가 있어
          리디렉션 또는 POST가 Samply에 도달하지 않으면 — 알림은 예정대로 발송됩니다.
          서비스 시작 전에 테스트 참여자로 전체 흐름을 테스트하십시오.
        </dd>
        <dt>알림은 원래 대체된 URL을 상속합니다</dt>
        <dd>
          알림 알림에 삽입된 설문 URL은 원래 발송에서 이미 대체된 URL입니다 — 새로운 대체가 아닙니다.
          동일한 메시지 ID, batch 번호 및 타임스탬프가 적용됩니다. 이는 의도적입니다:
          알림은 동일한 설문 세션을 다시 열어야 합니다. 설문 도구가 링크를 열 때마다
          새 응답을 생성하는 경우 로직이 이를 처리하는지 확인하십시오.
        </dd>
        <dt>알림 행은 대기열 한도에 포함됩니다</dt>
        <dd>
          각 알림 행은 대기열의 별도 대기 항목이며 연구당 50,000행 한도에 포함됩니다.
          100명의 참여자와 발송당 2개의 알림이 있는 일정은 발송당 1행이 아닌 3행을 생성합니다.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentIt({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un promemoria è una notifica push di follow-up che Samply invia automaticamente quando
        non ha rilevato il completamento del sondaggio per l&apos;invio originale. I promemoria sono
        facoltativi e configurati per calendario. Vengono attivati a un intervallo fisso dopo la
        notifica originale — a meno che il partecipante non completi prima il sondaggio, nel qual
        caso Samply annulla automaticamente tutti i promemoria in sospeso per quell&apos;invio.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Come funzionano i promemoria</h2>
      <p>
        Quando Samply invia una notifica originale, pianifica immediatamente tutte le righe di
        promemoria configurate nella coda. Ogni riga di promemoria è una voce separata{' '}
        <strong>in sospeso</strong> nella coda con <strong>Promemoria: sì</strong>. Il promemoria
        eredita lo stesso URL del sondaggio (inclusi tutti i valori segnaposto sostituiti)
        dell&apos;invio originale — i partecipanti che toccano il collegamento del promemoria
        accedono alla stessa sessione del sondaggio.
      </p>
      <p>
        I promemoria vengono annullati in due modi:
      </p>
      <ol>
        <li>
          Samply riceve un <strong>evento di completamento</strong> per l&apos;invio originale
          (tramite reindirizzamento o richiesta POST — vedere di seguito). Annulla immediatamente
          tutti i promemoria in sospeso che condividono lo stesso ID di invio interno.
        </li>
        <li>
          Si elimina manualmente il calendario o si annullano le righe dalla{' '}
          <a href='/docs/queue'>coda</a>.
        </li>
      </ol>
      <p>
        Senza un evento di completamento, ogni invio riceve un promemoria indipendentemente dal
        fatto che il partecipante abbia effettivamente completato il sondaggio.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurazione dei promemoria nel modulo del calendario</h2>
      <p>
        Il passaggio 9 del modulo del calendario è la sezione dei promemoria. Attivare{' '}
        <strong>Invia promemoria</strong> per visualizzare il pianificatore dei promemoria.
        Per ogni promemoria che si desidera inviare, compilare:
      </p>
      <dl>
        <dt>Titolo del promemoria</dt>
        <dd>La prima riga in grassetto della notifica push del promemoria sul dispositivo del partecipante.</dd>
        <dt>Messaggio del promemoria</dt>
        <dd>Il corpo della notifica — la seconda riga visibile nel vassoio di sistema.</dd>
        <dt>Inviato dopo</dt>
        <dd>
          Il ritardo rispetto alla notifica originale: giorni + ore + minuti. Un promemoria impostato
          a 0 giorni, 1 ora, 0 minuti viene attivato un&apos;ora dopo l&apos;invio originale. Tutti e tre i campi
          hanno il valore predefinito 0 — impostarne almeno uno su un valore diverso da zero.
        </dd>
      </dl>
      <p>
        Fare clic su <strong>Aggiungi nuovo promemoria</strong> per aggiungere un secondo promemoria
        con un intervallo diverso. È possibile concatenare tutti i promemoria necessari — ad esempio,
        un primo promemoria dopo 1 ora e un secondo dopo 4 ore. Tutti i promemoria vengono annullati
        non appena arriva un evento di completamento, indipendentemente da quali siano già stati attivati.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="it" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspetti a cui prestare attenzione</h3>
      <dl>
        <dt>I promemoria vengono attivati se non arriva alcun evento di completamento</dt>
        <dd>
          Se il reindirizzamento o il POST non raggiunge mai Samply — perché il partecipante ha
          abbandonato il sondaggio a metà, perché lo strumento di sondaggio era configurato in modo
          errato, o perché l&apos;URL di completamento conteneva un errore di battitura — il promemoria
          verrà attivato come pianificato. Testare il flusso completo con un partecipante di test
          prima di andare in produzione.
        </dd>
        <dt>I promemoria ereditano l&apos;URL sostituito originale</dt>
        <dd>
          L&apos;URL del sondaggio incorporato nelle notifiche di promemoria è l&apos;URL già sostituito
          dell&apos;invio originale — non una nuova sostituzione. Si applicano lo stesso ID messaggio,
          numero di batch e timestamp. Ciò è intenzionale: il promemoria dovrebbe riaprire la stessa
          sessione del sondaggio. Se lo strumento di sondaggio crea una nuova risposta a ogni apertura
          del collegamento, assicurarsi che la propria logica lo gestisca.
        </dd>
        <dt>Le righe di promemoria contano verso il limite della coda</dt>
        <dd>
          Ogni riga di promemoria è una voce in sospeso separata nella coda e conta verso il limite
          di 50.000 righe per studio. Un calendario con 100 partecipanti e 2 promemoria per invio
          genera 3 righe per invio, non 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentFr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un rappel est une notification push de suivi que Samply envoie automatiquement lorsqu'il
        n'a pas détecté de complétion de l'enquête pour l'envoi original. Les rappels sont
        facultatifs et configurés par calendrier. Ils se déclenchent à un délai fixe après la
        notification originale — sauf si le participant complète l'enquête en premier, auquel
        cas Samply annule automatiquement tous les rappels en attente pour cet envoi.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Fonctionnement des rappels</h2>
      <p>
        Lorsque Samply envoie une notification originale, il planifie immédiatement toutes les
        lignes de rappel configurées dans la file d'attente. Chaque ligne de rappel est une entrée
        distincte <strong>en attente</strong> dans la file d'attente avec{' '}
        <strong>Rappel : oui</strong>. Le rappel hérite du même URL d'enquête (y compris toutes
        les valeurs de paramètres substitués) que l'envoi original — les participants qui appuient
        sur le lien de rappel accèdent à la même session d'enquête.
      </p>
      <p>
        Les rappels sont annulés de deux manières :
      </p>
      <ol>
        <li>
          Samply reçoit un <strong>événement de complétion</strong> pour l'envoi original (via
          une redirection ou une requête POST — voir ci-dessous). Il annule immédiatement tous
          les rappels en attente qui partagent le même identifiant d'envoi interne.
        </li>
        <li>
          Vous supprimez manuellement le calendrier ou annulez les lignes depuis la{' '}
          <a href='/docs/queue'>file d'attente</a>.
        </li>
      </ol>
      <p>
        Sans événement de complétion, chaque envoi reçoit un rappel, que le participant ait
        réellement complété l'enquête ou non.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurer les rappels dans le formulaire de calendrier</h2>
      <p>
        L'étape 9 du formulaire de calendrier est la section des rappels. Activez{' '}
        <strong>Envoyer des rappels</strong> pour afficher le planificateur de rappels. Pour
        chaque rappel que vous souhaitez envoyer, renseignez :
      </p>
      <dl>
        <dt>Titre du rappel</dt>
        <dd>La première ligne en gras de la notification push de rappel sur l'appareil du participant.</dd>
        <dt>Message du rappel</dt>
        <dd>Le corps de la notification — la deuxième ligne visible dans la barre système.</dd>
        <dt>Envoyé après</dt>
        <dd>
          Le délai après la notification originale : jours + heures + minutes. Un rappel réglé
          sur 0 jours, 1 heure, 0 minute se déclenche une heure après l'envoi original. Les trois
          champs ont la valeur par défaut 0 — réglez au moins l'un d'eux sur une valeur non nulle.
        </dd>
      </dl>
      <p>
        Cliquez sur <strong>Ajouter un nouveau rappel</strong> pour ajouter un deuxième rappel
        avec un délai différent. Vous pouvez enchaîner autant de rappels que nécessaire — par
        exemple, un premier rappel après 1 heure et un second après 4 heures. Tous les rappels
        sont annulés dès qu'un événement de complétion arrive, quels que soient ceux qui ont
        déjà été déclenchés.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="fr" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Points d'attention</h3>
      <dl>
        <dt>Les rappels se déclenchent si aucun événement de complétion n'arrive</dt>
        <dd>
          Si la redirection ou le POST n'atteint jamais Samply — parce que le participant a
          abandonné l'enquête en cours de route, parce que l'outil d'enquête était mal configuré,
          ou parce que l'URL de complétion contenait une faute de frappe — le rappel se
          déclenchera comme prévu. Testez le flux complet avec un participant de test avant de
          passer en production.
        </dd>
        <dt>Les rappels héritent de l'URL substituée d'origine</dt>
        <dd>
          L'URL d'enquête incorporée dans les notifications de rappel est l'URL déjà substituée
          de l'envoi original — et non une nouvelle substitution. Le même identifiant de message,
          numéro de lot et horodatages s'appliquent. Ceci est intentionnel : le rappel doit
          rouvrir la même session d'enquête. Si votre outil d'enquête crée une nouvelle réponse
          à chaque ouverture d'un lien, assurez-vous que votre logique gère ce cas.
        </dd>
        <dt>Les lignes de rappel comptent dans la limite de la file d'attente</dt>
        <dd>
          Chaque ligne de rappel est une entrée distincte en attente dans la file d'attente et
          compte dans la limite de 50 000 lignes par étude. Un calendrier avec 100 participants
          et 2 rappels par envoi génère 3 lignes par envoi, et non 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentEs({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Un recordatorio es una notificación push de seguimiento que Samply envía automáticamente
        cuando no ha detectado la finalización de la encuesta para el envío original. Los
        recordatorios son opcionales y se configuran por calendario. Se activan con un desfase
        fijo después de la notificación original — a menos que el participante complete la encuesta
        primero, en cuyo caso Samply cancela automáticamente todos los recordatorios pendientes
        para ese envío.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Cómo funcionan los recordatorios</h2>
      <p>
        Cuando Samply despacha una notificación original, programa inmediatamente todas las filas
        de recordatorio configuradas en la cola. Cada fila de recordatorio es una entrada distinta{' '}
        <strong>pendiente</strong> en la cola con <strong>Recordatorio: sí</strong>. El recordatorio
        hereda la misma URL de encuesta (incluidos todos los valores de marcadores sustituidos) que
        el envío original — los participantes que tocan el enlace del recordatorio llegan a la misma
        sesión de encuesta.
      </p>
      <p>
        Los recordatorios se cancelan de dos maneras:
      </p>
      <ol>
        <li>
          Samply recibe un <strong>evento de finalización</strong> para el envío original (mediante
          redirección o solicitud POST — véase más abajo). Cancela inmediatamente todos los
          recordatorios pendientes que comparten el mismo ID de envío interno.
        </li>
        <li>
          Usted elimina manualmente el calendario o cancela las filas desde la{' '}
          <a href='/docs/queue'>cola</a>.
        </li>
      </ol>
      <p>
        Sin un evento de finalización, cada envío recibe un recordatorio independientemente de si
        el participante completó realmente la encuesta.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurar recordatorios en el formulario de calendario</h2>
      <p>
        El paso 9 del formulario de calendario es la sección de recordatorios. Active{' '}
        <strong>Enviar recordatorios</strong> para mostrar el planificador de recordatorios. Para
        cada recordatorio que desee enviar, rellene:
      </p>
      <dl>
        <dt>Título del recordatorio</dt>
        <dd>La primera línea en negrita de la notificación push de recordatorio en el dispositivo del participante.</dd>
        <dt>Mensaje del recordatorio</dt>
        <dd>El cuerpo de la notificación — la segunda línea visible en la bandeja del sistema.</dd>
        <dt>Enviado después de</dt>
        <dd>
          El retraso desde la notificación original: días + horas + minutos. Un recordatorio
          configurado a 0 días, 1 hora, 0 minutos se activa una hora después del envío original.
          Los tres campos tienen el valor predeterminado 0 — establezca al menos uno en un valor
          distinto de cero.
        </dd>
      </dl>
      <p>
        Haga clic en <strong>Añadir nuevo recordatorio</strong> para agregar un segundo recordatorio
        con un desfase diferente. Puede encadenar tantos recordatorios como necesite — por ejemplo,
        un primer recordatorio a 1 hora y un segundo a 4 horas. Todos los recordatorios se cancelan
        en cuanto llega un evento de finalización, independientemente de cuáles ya se hayan activado.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="es" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a tener en cuenta</h3>
      <dl>
        <dt>Los recordatorios se activan si no llega ningún evento de finalización</dt>
        <dd>
          Si la redirección o el POST nunca llega a Samply — porque el participante abandonó
          la encuesta a mitad, porque la herramienta de encuesta estaba mal configurada, o
          porque la URL de finalización tenía un error tipográfico — el recordatorio se
          activará según lo programado. Pruebe el flujo completo con un participante de prueba
          antes de poner en marcha el estudio.
        </dd>
        <dt>Los recordatorios heredan la URL sustituida original</dt>
        <dd>
          La URL de encuesta incorporada en las notificaciones de recordatorio es la URL ya
          sustituida del envío original — no una nueva sustitución. Se aplican el mismo ID de
          mensaje, número de lote y marcas de tiempo. Esto es intencional: el recordatorio debe
          reabrir la misma sesión de encuesta. Si su herramienta de encuesta crea una nueva
          respuesta para cada apertura de enlace, asegúrese de que su lógica gestiona este caso.
        </dd>
        <dt>Las filas de recordatorio cuentan para el límite de la cola</dt>
        <dd>
          Cada fila de recordatorio es una entrada distinta pendiente en la cola y cuenta para
          el límite de 50 000 filas por estudio. Un calendario con 100 participantes y 2
          recordatorios por envío genera 3 filas por envío, no 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentPt({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Um lembrete é uma notificação push de acompanhamento que o Samply envia automaticamente
        quando não detectou a conclusão da pesquisa para o envio original. Os
        lembretes são opcionais e configurados por calendário. Eles disparam com um deslocamento
        fixo após a notificação original — a menos que o participante conclua a pesquisa
        primeiro, caso em que o Samply cancela automaticamente todos os lembretes pendentes
        para esse envio.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Como funcionam os lembretes</h2>
      <p>
        Quando o Samply despacha uma notificação original, ele agenda imediatamente todas as linhas
        de lembrete configuradas na fila. Cada linha de lembrete é uma entrada distinta{' '}
        <strong>pendente</strong> na fila com <strong>Lembrete: sim</strong>. O lembrete
        herda a mesma URL de pesquisa (incluindo todos os valores de marcadores substituídos) que
        o envio original — os participantes que tocam no link do lembrete chegam à mesma
        sessão de pesquisa.
      </p>
      <p>
        Os lembretes são cancelados de duas maneiras:
      </p>
      <ol>
        <li>
          O Samply recebe um <strong>evento de conclusão</strong> para o envio original (mediante
          redirecionamento ou solicitação POST — veja abaixo). Ele cancela imediatamente todos os
          lembretes pendentes que compartilham o mesmo ID de envio interno.
        </li>
        <li>
          Você exclui manualmente o calendário ou cancela as linhas da{' '}
          <a href='/docs/queue'>fila</a>.
        </li>
      </ol>
      <p>
        Sem um evento de conclusão, cada envio recebe um lembrete independentemente de o
        participante ter realmente concluído a pesquisa.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Configurar lembretes no formulário de calendário</h2>
      <p>
        O passo 9 do formulário de calendário é a seção de lembretes. Ative{' '}
        <strong>Enviar lembretes</strong> para exibir o planejador de lembretes. Para
        cada lembrete que deseja enviar, preencha:
      </p>
      <dl>
        <dt>Título do lembrete</dt>
        <dd>A primeira linha em negrito da notificação push de lembrete no dispositivo do participante.</dd>
        <dt>Mensagem do lembrete</dt>
        <dd>O corpo da notificação — a segunda linha visível na bandeja do sistema.</dd>
        <dt>Enviado após</dt>
        <dd>
          O atraso em relação à notificação original: dias + horas + minutos. Um lembrete
          configurado para 0 dias, 1 hora, 0 minutos dispara uma hora após o envio original.
          Os três campos têm valor padrão 0 — defina pelo menos um com um valor
          diferente de zero.
        </dd>
      </dl>
      <p>
        Clique em <strong>Adicionar novo lembrete</strong> para adicionar um segundo lembrete
        com um deslocamento diferente. Você pode encadear tantos lembretes quantos precisar — por exemplo,
        um primeiro lembrete em 1 hora e um segundo em 4 horas. Todos os lembretes são cancelados
        assim que chega um evento de conclusão, independentemente de quais já foram disparados.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="pt" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Aspectos a observar</h3>
      <dl>
        <dt>Os lembretes disparam se nenhum evento de conclusão chegar</dt>
        <dd>
          Se o redirecionamento ou o POST nunca chegar ao Samply — porque o participante abandonou
          a pesquisa no meio, porque a ferramenta de pesquisa estava mal configurada, ou
          porque a URL de conclusão tinha um erro de digitação — o lembrete será
          disparado conforme programado. Teste o fluxo completo com um participante de teste
          antes de colocar o estudo em funcionamento.
        </dd>
        <dt>Os lembretes herdam a URL substituída original</dt>
        <dd>
          A URL de pesquisa incorporada nas notificações de lembrete é a URL já
          substituída do envio original — não uma nova substituição. O mesmo ID de
          mensagem, número de lote e carimbos de data/hora se aplicam. Isso é intencional: o lembrete deve
          reabrir a mesma sessão de pesquisa. Se sua ferramenta de pesquisa cria uma nova
          resposta para cada abertura de link, certifique-se de que sua lógica trata esse caso.
        </dd>
        <dt>As linhas de lembrete contam para o limite da fila</dt>
        <dd>
          Cada linha de lembrete é uma entrada distinta pendente na fila e conta para
          o limite de 50 000 linhas por estudo. Um calendário com 100 participantes e 2
          lembretes por envio gera 3 linhas por envio, não 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentJa({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        リマインダーは、元の送信に対する調査完了が検出されなかった場合にSamplyが自動的に送信する
        フォローアップのプッシュ通知です。リマインダーは任意で、スケジュールごとに設定します。
        参加者が先に調査を完了しない限り、元の通知から固定オフセットで発火します — 完了した場合、
        Samplyはその送信に対する保留中のすべてのリマインダーを自動的にキャンセルします。
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>リマインダーの仕組み</h2>
      <p>
        Samplyが元の通知を発送すると、設定されたすべてのリマインダー行をすぐにキューに
        スケジュールします。各リマインダー行は<strong>保留中</strong>の別個のキュー エントリで、
        <strong>リマインダー：はい</strong>とマークされています。リマインダーは元の送信と同じ
        調査URL（置換されたプレースホルダー値をすべて含む）を継承します — リマインダーのリンクを
        タップした参加者は同じ調査セッションに入ります。
      </p>
      <p>
        リマインダーは2つの方法でキャンセルされます：
      </p>
      <ol>
        <li>
          Samplyが元の送信に対する<strong>完了イベント</strong>（リダイレクトまたはPOSTリクエスト経由 — 下記参照）
          を受信します。同じ内部送信IDを共有する保留中のすべてのリマインダーを即座にキャンセルします。
        </li>
        <li>
          スケジュールを手動で削除するか、<a href='/docs/queue'>キュー</a>から行をキャンセルします。
        </li>
      </ol>
      <p>
        完了イベントがない場合、参加者が実際に調査を完了したかどうかに関わらず、各送信にリマインダーが送られます。
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>スケジュールフォームでリマインダーを設定する</h2>
      <p>
        スケジュールフォームのステップ9はリマインダーセクションです。<strong>リマインダーを送信</strong>を
        オンにして、リマインダープランナーを表示します。送信する各リマインダーについて、次を入力します：
      </p>
      <dl>
        <dt>リマインダータイトル</dt>
        <dd>参加者のデバイス上のリマインダー プッシュ通知の太字の最初の行。</dd>
        <dt>リマインダーメッセージ</dt>
        <dd>通知の本文 — システムトレイに表示される2行目。</dd>
        <dt>送信後</dt>
        <dd>
          元の通知からの遅延：日 + 時間 + 分。0日、1時間、0分に設定されたリマインダーは
          元の送信から1時間後に発火します。3つのフィールドはすべてデフォルトで0です — 少なくとも
          1つはゼロ以外の値に設定してください。
        </dd>
      </dl>
      <p>
        <strong>新しいリマインダーを追加</strong>をクリックして、異なるオフセットで2つ目のリマインダーを
        追加します。必要な数だけリマインダーをチェーンできます — 例えば、1時間後の最初のリマインダーと
        4時間後の2番目のリマインダー。完了イベントが到着すると、どれがすでに発火していても、
        すべてのリマインダーがキャンセルされます。
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="ja" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>注意すべき点</h3>
      <dl>
        <dt>完了イベントが届かない場合、リマインダーが発火します</dt>
        <dd>
          リダイレクトまたはPOSTがSamplyに届かない場合 — 参加者が調査を途中で放棄した、調査ツールの
          設定が誤っていた、または完了URLにタイプミスがあったため — リマインダーは予定通りに発火します。
          公開前にテスト参加者でフロー全体をテストしてください。
        </dd>
        <dt>リマインダーは元の置換済みURLを継承します</dt>
        <dd>
          リマインダー通知に埋め込まれた調査URLは、元の送信から置換済みのURLであり、新しい置換ではありません。
          同じメッセージID、バッチ番号、タイムスタンプが適用されます。これは意図的なものです：
          リマインダーは同じ調査セッションを再度開く必要があります。調査ツールがリンクオープンごとに
          新しい応答を作成する場合、ロジックがこれを処理することを確認してください。
        </dd>
        <dt>リマインダー行はキュー制限にカウントされます</dt>
        <dd>
          各リマインダー行はキューの別個の保留中エントリであり、研究あたり50,000行の制限に
          カウントされます。100人の参加者と送信あたり2つのリマインダーを持つスケジュールは、
          送信ごとに3行ではなく、3行を生成します。
        </dd>
      </dl>
    </>
  );
}

function RemindersContentPl({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Przypomnienia to dodatkowe powiadomienia push, które Samply wysyła automatycznie, gdy
        nie wykryje ukończenia ankiety dla oryginalnej wysyłki. Przypomnienia są opcjonalne i
        konfigurujesz je dla każdego harmonogramu. Wyzwalają się ze stałymi przesunięciami od
        oryginalnego powiadomienia, chyba że uczestnik wcześniej ukończy ankietę — w takim
        przypadku Samply automatycznie anuluje wszystkie oczekujące przypomnienia dla tej wysyłki.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Jak działają przypomnienia</h2>
      <p>
        Gdy Samply wysyła oryginalne powiadomienie, natychmiast planuje wszystkie skonfigurowane
        wiersze przypomnień w kolejce. Każdy wiersz przypomnienia jest osobnym wpisem kolejki w
        stanie <strong>oczekuje</strong>, oznaczonym jako{' '}
        <strong>Przypomnienie: tak</strong>. Przypomnienia dziedziczą ten sam URL ankiety co
        oryginalna wysyłka (ze wszystkimi zastąpionymi wartościami placeholderów) — uczestnicy,
        którzy stukną w link przypomnienia, wejdą w tę samą sesję ankiety.
      </p>
      <p>
        Przypomnienia są anulowane na dwa sposoby:
      </p>
      <ol>
        <li>
          Samply otrzymuje <strong>zdarzenie ukończenia</strong> dla oryginalnej wysyłki (przez
          przekierowanie lub żądanie POST — patrz poniżej). Natychmiast anuluje wszystkie
          oczekujące przypomnienia, które dzielą ten sam wewnętrzny identyfikator wysyłki.
        </li>
        <li>
          Ręcznie usuwasz harmonogram lub anulujesz wiersz z{' '}
          <a href='/docs/queue'>Kolejki</a>.
        </li>
      </ol>
      <p>
        Bez zdarzenia ukończenia przypomnienia są wysyłane dla każdej wysyłki, niezależnie od
        tego, czy uczestnik faktycznie ukończył ankietę.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Konfigurowanie przypomnień w formularzu harmonogramu</h2>
      <p>
        Krok 9 w formularzu harmonogramu to sekcja przypomnień. Włącz{' '}
        <strong>Wysyłaj przypomnienia</strong>, aby wyświetlić planer przypomnień. Dla każdego
        przypomnienia, które chcesz wysłać, wprowadź:
      </p>
      <dl>
        <dt>Tytuł przypomnienia</dt>
        <dd>Pogrubiona pierwsza linia powiadomienia push przypomnienia na urządzeniu uczestnika.</dd>
        <dt>Wiadomość przypomnienia</dt>
        <dd>Treść powiadomienia — druga linia widoczna w zasobniku systemowym.</dd>
        <dt>Wyślij po</dt>
        <dd>
          Opóźnienie od oryginalnego powiadomienia: dni + godziny + minuty. Przypomnienie
          ustawione na 0 dni, 1 godzinę i 0 minut wyzwala się 1 godzinę po oryginalnej wysyłce.
          Wszystkie trzy pola domyślnie wynoszą 0 — ustaw przynajmniej jedno na wartość różną od zera.
        </dd>
      </dl>
      <p>
        Kliknij <strong>Dodaj nowe przypomnienie</strong>, aby dodać drugie przypomnienie z
        innym przesunięciem. Możesz połączyć łańcuchowo dowolną liczbę przypomnień — na
        przykład pierwsze przypomnienie po 1 godzinie i drugie po 4 godzinach. Gdy nadejdzie
        zdarzenie ukończenia, wszystkie przypomnienia są anulowane, niezależnie od tego,
        które już zostały wyzwolone.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="pl" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>O czym należy pamiętać</h3>
      <dl>
        <dt>Jeśli zdarzenie ukończenia nie dotrze, przypomnienia są wyzwalane</dt>
        <dd>
          Jeśli przekierowanie lub POST nie dotrze do Samply — ponieważ uczestnik porzucił
          ankietę w połowie, narzędzie do ankiety zostało nieprawidłowo skonfigurowane lub URL
          ukończenia miał literówkę — przypomnienia wyzwolą się zgodnie z planem. Przetestuj
          cały przepływ z uczestnikami testowymi przed uruchomieniem.
        </dd>
        <dt>Przypomnienia dziedziczą oryginalny zastąpiony URL</dt>
        <dd>
          URL ankiety osadzony w powiadomieniu przypomnienia jest tym samym zastąpionym URL
          z oryginalnej wysyłki, a nie nowo zastąpionym. Stosuje się ten sam identyfikator
          wiadomości, numer partii i znacznik czasu. Jest to celowe: przypomnienie musi
          ponownie otworzyć tę samą sesję ankiety. Jeśli Twoje narzędzie do ankiety tworzy
          nową odpowiedź dla każdego otwarcia linku, upewnij się, że Twoja logika to obsłuży.
        </dd>
        <dt>Wiersze przypomnień liczą się do limitu kolejki</dt>
        <dd>
          Każdy wiersz przypomnienia jest osobnym oczekującym wpisem w kolejce i liczy się
          do limitu 50 000 wierszy na badanie. Harmonogram ze 100 uczestnikami i 2
          przypomnieniami na wysyłkę generuje 3 wiersze na wysyłkę, a nie 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentAr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        التذكيرات هي إشعارات فورية إضافية يرسلها Samply تلقائياً عندما لا يكتشف إكمال
        الاستطلاع للإرسال الأصلي. التذكيرات اختيارية وتُكوَّن لكل جدول. تُطلَق بإزاحات
        ثابتة من الإشعار الأصلي، إلا إذا أكمل المشارك الاستطلاع مسبقاً — في هذه الحالة
        يقوم Samply تلقائياً بإلغاء جميع التذكيرات المعلقة لهذا الإرسال.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>كيف تعمل التذكيرات</h2>
      <p>
        عندما يرسل Samply الإشعار الأصلي، يجدول فوراً جميع صفوف التذكيرات المُكوَّنة في
        الطابور. كل صف تذكير هو إدخال طابور منفصل في حالة <strong>قيد الانتظار</strong>،
        ومُعلَّم بـ <strong>تذكير: نعم</strong>. ترث التذكيرات نفس URL الاستطلاع من
        الإرسال الأصلي (مع استبدال جميع قيم العناصر النائبة) — المشاركون الذين ينقرون
        على رابط التذكير يدخلون نفس جلسة الاستطلاع.
      </p>
      <p>
        تُلغى التذكيرات بطريقتين:
      </p>
      <ol>
        <li>
          يتلقى Samply <strong>حدث إكمال</strong> للإرسال الأصلي (عبر إعادة توجيه أو طلب
          POST — انظر أدناه). يقوم فوراً بإلغاء جميع التذكيرات المعلقة التي تتشارك نفس
          معرّف الإرسال الداخلي.
        </li>
        <li>
          تقوم يدوياً بحذف الجدول أو إلغاء الصف من{' '}
          <a href='/docs/queue'>الطابور</a>.
        </li>
      </ol>
      <p>
        بدون حدث إكمال، تُرسَل التذكيرات لكل إرسال، بصرف النظر عما إذا كان المشارك قد
        أكمل الاستطلاع فعلاً.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>إعداد التذكيرات في نموذج الجدول</h2>
      <p>
        الخطوة 9 في نموذج الجدول هي قسم التذكيرات. فعِّل <strong>إرسال التذكيرات</strong>{' '}
        لعرض مخطط التذكيرات. لكل تذكير ترغب في إرساله، أدخل:
      </p>
      <dl>
        <dt>عنوان التذكير</dt>
        <dd>السطر الأول بخط عريض من الإشعار الفوري للتذكير على جهاز المشارك.</dd>
        <dt>رسالة التذكير</dt>
        <dd>نص الإشعار — السطر الثاني المرئي في درج النظام.</dd>
        <dt>الإرسال بعد</dt>
        <dd>
          التأخير من الإشعار الأصلي: أيام + ساعات + دقائق. تذكير مضبوط على 0 يوم و1
          ساعة و0 دقيقة يُطلَق بعد ساعة واحدة من الإرسال الأصلي. جميع الحقول الثلاثة
          افتراضياً 0 — اضبط حقلاً واحداً على الأقل على قيمة غير صفرية.
        </dd>
      </dl>
      <p>
        انقر <strong>إضافة تذكير جديد</strong> لإضافة تذكير ثانٍ بإزاحة مختلفة. يمكنك
        ربط أي عدد من التذكيرات — على سبيل المثال، تذكير أول بعد ساعة وتذكير ثانٍ بعد
        4 ساعات. عند وصول حدث إكمال، تُلغى جميع التذكيرات، بصرف النظر عن أيّها قد أُطلق.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="ar" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>أمور يجب أن تأخذها في الحسبان</h3>
      <dl>
        <dt>إذا لم يصل حدث الإكمال، تُطلَق التذكيرات</dt>
        <dd>
          إذا لم تصل إعادة التوجيه أو POST إلى Samply — لأن المشارك ترك الاستطلاع في
          منتصفه، أو لأن أداة الاستطلاع كانت مُعَدّة بشكل غير صحيح، أو لأن URL الإكمال
          به خطأ مطبعي — فستُطلَق التذكيرات وفق الجدول. اختبر التدفق بأكمله بمشاركين
          تجريبيين قبل الإطلاق.
        </dd>
        <dt>ترث التذكيرات الـ URL الأصلي المُستبدَل</dt>
        <dd>
          URL الاستطلاع المضمَّن في إشعار التذكير هو نفس الـ URL المُستبدَل من الإرسال
          الأصلي، وليس استبدالاً جديداً. تنطبق معرّفات الرسالة ورقم الدفعة والطابع الزمني
          ذاتها. هذا مقصود: يجب على التذكير إعادة فتح جلسة الاستطلاع ذاتها. إذا كانت
          أداة الاستطلاع تنشئ استجابة جديدة عند كل فتح للرابط، فتأكد من أن منطقك يعالج ذلك.
        </dd>
        <dt>تُحتسب صفوف التذكيرات ضمن حد الطابور</dt>
        <dd>
          كل صف تذكير هو إدخال طابور معلق منفصل ويُحتسب ضمن حد الـ 50,000 صف لكل دراسة.
          جدول يضم 100 مشارك مع تذكيرَين لكل إرسال يولّد 3 صفوف لكل إرسال، وليس 1.
        </dd>
      </dl>
    </>
  );
}

function RemindersContentTr({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <p>
        Hatırlatma, orijinal gönderim için bir anket tamamlama olayı algılanmadığında Samply'nin
        otomatik olarak gönderdiği bir takip push bildirimidir. Hatırlatmalar isteğe bağlıdır ve
        her program için ayrı yapılandırılır. Orijinal bildirimden sabit bir gecikme sonra
        tetiklenirler — katılımcı anketi daha önce tamamlamadıysa, bu durumda Samply o gönderim
        için bekleyen tüm hatırlatmaları otomatik olarak iptal eder.
      </p>

      {/* ── How reminders work ────────────────────────────────────────────── */}
      <h2>Hatırlatmalar nasıl çalışır</h2>
      <p>
        Samply orijinal bir bildirimi gönderdiğinde, yapılandırılmış hatırlatma satırlarını
        anında kuyruğa planlar. Her hatırlatma satırı, ayrı bir <strong>bekleyen</strong> kuyruk
        girişidir ve <strong>Hatırlatma: evet</strong> olarak işaretlenir. Hatırlatma, orijinal
        gönderimle aynı anket URL'sini (tüm yer tutucu değerleri yerine konmuş hâliyle) miras
        alır — hatırlatma bağlantısına dokunan katılımcılar aynı anket oturumuna girer.
      </p>
      <p>Hatırlatmalar iki yolla iptal edilir:</p>
      <ol>
        <li>
          Samply, orijinal gönderim için (yönlendirme veya POST isteği yoluyla — aşağıya bakın)
          bir <strong>tamamlama olayı</strong> alır. Aynı dahili gönderim kimliğini paylaşan
          bekleyen tüm hatırlatmaları anında iptal eder.
        </li>
        <li>
          Programı manuel olarak silersiniz veya satırları <a href='/docs/queue'>kuyruktan</a>{' '}
          iptal edersiniz.
        </li>
      </ol>
      <p>
        Bir tamamlama olayı olmadan, katılımcının anketi gerçekten tamamlayıp tamamlamadığına
        bakılmaksızın her gönderim bir hatırlatma alır.
      </p>

      {/* ── Configuring reminders ─────────────────────────────────────────── */}
      <h2>Program formunda hatırlatmaları yapılandırma</h2>
      <p>
        Program formunun 9. adımı hatırlatma bölümüdür. Hatırlatma planlayıcısını görmek için{' '}
        <strong>Hatırlatma gönder</strong> seçeneğini açın. Göndermek istediğiniz her hatırlatma
        için aşağıdakileri doldurun:
      </p>
      <dl>
        <dt>Hatırlatma başlığı</dt>
        <dd>Katılımcı cihazındaki hatırlatma push bildiriminin kalın yazılmış ilk satırı.</dd>
        <dt>Hatırlatma mesajı</dt>
        <dd>Bildirim gövdesi — sistem tepsisinde görünen ikinci satır.</dd>
        <dt>Şu kadar sonra gönder</dt>
        <dd>
          Orijinal bildirimden gecikme: gün + saat + dakika. 0 gün, 1 saat, 0 dakikaya ayarlanan
          bir hatırlatma orijinal gönderimden bir saat sonra tetiklenir. Üç alan da varsayılan
          olarak 0'dır — en az birini sıfır olmayan bir değere ayarlayın.
        </dd>
      </dl>
      <p>
        Farklı bir gecikmede ikinci bir hatırlatma eklemek için{' '}
        <strong>Yeni hatırlatma ekle</strong>'ye tıklayın. İhtiyaç duyduğunuz kadar hatırlatma
        zincirleyebilirsiniz — örneğin, 1 saatte ilk, 4 saatte ikinci. Bir tamamlama olayı
        geldiğinde, halihazırda hangilerinin tetiklendiğine bakılmaksızın tüm hatırlatmalar iptal edilir.
      </p>

      {/* survey-tool setup moved to /docs/integrations */}
      <CompletionPointer lang="tr" />

      {/* ── Caveats ───────────────────────────────────────────────────────── */}
      <h3>Dikkat edilecekler</h3>
      <dl>
        <dt>Tamamlama olayı gelmezse hatırlatmalar tetiklenir</dt>
        <dd>
          Yönlendirme veya POST Samply'ye hiç ulaşmazsa — katılımcı anketi yarıda bıraktı,
          anket aracı yanlış yapılandırıldı veya tamamlama URL'sinde yazım hatası var — hatırlatma
          planlandığı gibi tetiklenir. Canlıya almadan önce tam akışı bir test katılımcısıyla deneyin.
        </dd>
        <dt>Hatırlatmalar orijinal değiştirilmiş URL'yi miras alır</dt>
        <dd>
          Hatırlatma bildirimlerine gömülü anket URL'si, orijinal gönderimden zaten değiştirilmiş
          URL'dir — yeni bir değiştirme değil. Aynı mesaj kimliği, parti numarası ve zaman damgaları
          uygulanır. Bu kasıtlıdır: hatırlatma aynı anket oturumunu yeniden açmalıdır. Anket
          aracınız her bağlantı açılışında yeni bir yanıt oluşturuyorsa, mantığınızın bunu
          işlediğinden emin olun.
        </dd>
        <dt>Hatırlatma satırları kuyruk sınırına dahildir</dt>
        <dd>
          Her hatırlatma satırı kuyrukta ayrı bir bekleyen kayıttır ve çalışma başına 50.000
          satır sınırına dahildir. 100 katılımcısı ve gönderim başına 2 hatırlatması olan bir
          program, gönderim başına 1 değil 3 satır oluşturur.
        </dd>
      </dl>
    </>
  );
}
