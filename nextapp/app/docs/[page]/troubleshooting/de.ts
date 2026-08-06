import { fromStrings } from "./content.ts";

/**
 * German troubleshooting page.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly —
 * `%SAMPLY_ID%` and `/docs/…` paths are technical, not prose. Only link labels
 * are translated. lib/troubleshooting.test.ts enforces all of this.
 */
export default fromStrings([
  "Die meisten Samply-Probleme sind Konfigurationsfehler, keine Ausfälle, und fast alle sind erkennbar, bevor die erste Benachrichtigung verschickt wird. Diese Seite ist danach geordnet, was Ihnen auffallen würde, nicht danach, was technisch falsch ist.",
  "Wenn Ihre Studie noch nicht begonnen hat, ist der schnellste Weg der **Einrichtungscheck** auf Ihrem Studien-Dashboard: Er prüft Ihre Konfiguration und bietet eine Testbenachrichtigung an, die über den echten Versandweg läuft und Ihnen den Umfrage-Link genau so zeigt, wie das Telefon der teilnehmenden Person ihn erhalten hat. Fast alles Folgende wird von dieser einen Prüfung erfasst.",

  "1 · Eine teilnehmende Person erhält keine Benachrichtigungen mehr",
  "Das ist die häufigste Meldung, und sie hat mehrere Ursachen mit sehr unterschiedlichen Lösungen. Arbeiten Sie die Liste von oben ab — sie ist danach geordnet, wie oft sich die jeweilige Ursache als die richtige erweist.",

  "Die Person hat die App neu installiert oder das Telefon gewechselt",
  "Was passiert:",
  "Der Push-Token identifiziert die App-Installation, nicht die Person. Eine Neuinstallation, die Wiederherstellung auf einem neuen Gerät oder in manchen Fällen ein Betriebssystem-Update erzeugen einen neuen Token; der alte funktioniert dauerhaft nicht mehr.",
  "Was Sie sehen:",
  "Die Analytics-Seite meldet „N Teilnehmende können keine Benachrichtigungen mehr empfangen“. Samply erfährt das aus den Zustellbelegen des Push-Dienstes, in der Regel innerhalb einer Stunde nach dem nächsten Versand.",
  "Die Lösung:",
  "Die teilnehmende Person öffnet Samply Research und meldet sich an. Damit wird das Gerät automatisch neu registriert. Falls sie unsicher ist, bitten Sie sie, im App-Menü den **Benachrichtigungs-Check** zu öffnen und auf **Gerät neu registrieren** zu tippen — dieselbe Reparatur, nur bewusst ausgelöst.",

  "Android legt die App schlafen",
  "Was passiert:",
  "Viele Android-Hersteller ergänzen das System um eine aggressive Akkuverwaltung. Der Push wird von den Servern von Google angenommen und dann vom Telefon selbst verzögert oder verworfen. Samsung, Xiaomi, OnePlus, Huawei, Oppo und Vivo fallen dabei am häufigsten auf; das Verhalten unterscheidet sich je nach Hersteller und Android-Version.",
  "Was Sie sehen:",
  "**nichts.** Das ist der entscheidende Punkt. Die Benachrichtigung wurde zur Zustellung angenommen, Samply zählt sie also als gesendet, und nirgendwo erscheint eine Warnung. Das einzige Signal ist eine teilnehmende Person, die fehlende Aufforderungen meldet, während serverseitig alles gesund aussieht.",
  "Die Lösung:",
  "Die teilnehmende Person nimmt Samply von der Akku-Optimierung aus. Die Schritte unterscheiden sich je nach Hersteller; [dontkillmyapp.com](https://dontkillmyapp.com/) dokumentiert sie Gerät für Gerät — es ist die beste verfügbare Referenz und lohnt sich, direkt an Teilnehmende mit Android-Telefonen zu schicken. Der Bildschirm **Benachrichtigungs-Check** in der App verlinkt ebenfalls auf die Telefoneinstellungen.",
  "Vorbeugung:",
  "Erwähnen Sie das in Ihren Onboarding-Hinweisen statt erst im Nachhinein. Android-Teilnehmende am ersten Tag darum zu bitten kostet eine Minute; am fünften Tag danach zu fragen bedeutet, dass Sie deren Daten bereits verloren haben.",

  "Die Benachrichtigungsberechtigung wurde nie erteilt oder wieder entzogen",
  "Was passiert:",
  "Die App fragt beim ersten Start nach der Berechtigung. Lehnt die teilnehmende Person ab — oder schaltet Benachrichtigungen später aus, was manche Menschen beim Aufräumen ihres Telefons pauschal tun —, kann nichts zugestellt werden.",
  "Was Sie sehen:",
  "Wurde die Berechtigung nie erteilt, hat die Person keinen Push-Token: Sie erscheint als eingeschrieben, empfängt aber nie etwas. Wurde sie später entzogen, kann der Token aus Sicht des Servers noch eine Weile funktionieren.",
  "Die Lösung:",
  "Der **Benachrichtigungs-Check** im App-Menü zeigt den Berechtigungsstatus direkt an und öffnet die passende Einstellungsseite.",

  "Die Person ist beigetreten, hat die App aber nie wieder geöffnet",
  "Ein Gerät registriert sich für Benachrichtigungen, während die App läuft. Wer über einen Link beitritt, die App dann beendet und nie wieder öffnet, schließt die Registrierung möglicherweise nie ab. Der Eintrag existiert; das Gerät ist nicht erreichbar.",

  "iOS-Fokusmodi oder die geplante Zusammenfassung",
  "iOS kann Benachrichtigungen zurückhalten und gebündelt zustellen oder sie im Fokusmodus stummschalten. Teilnehmenden ist oft nicht bewusst, dass das aktiv ist. Die Benachrichtigung kommt an — nur nicht zum geplanten Zeitpunkt, was beim Experience Sampling häufig dasselbe ist wie gar nicht. Bitten Sie Teilnehmende, Samply die sofortige Zustellung zu erlauben.",

  "Das Telefon war zum Sendezeitpunkt aus oder offline",
  "Push-Dienste halten eine Nachricht eine Weile vor und stellen sie zu, sobald das Gerät wieder verbunden ist — garantiert ist das aber nicht, und ein abgelaufener Link nützt dann womöglich nichts mehr. Wenn Ihr Design darauf beruht, dass eine Aufforderung Menschen innerhalb eines engen Zeitfensters erreicht, setzen Sie eine Link-Gültigkeit, damit späte Zustellungen nicht außerhalb des Fensters beantwortet werden — und rechnen Sie mit etwas Verlust.",

  "2 · Der Umfrage-Export enthält keine Teilnehmenden-ID",
  "Das ist der schädlichste Fehler überhaupt, weil er lautlos auftritt und erst bei der Auswertung entdeckt wird, wenn die Studie längst vorbei ist.",
  "Es gibt keine Möglichkeit, im Nachhinein zu rekonstruieren, wer was beantwortet hat. Wenn Ihr Design personenbezogene oder Mehrebenenanalysen erfordert, prüfen Sie das am ersten Tag mit einer Testbenachrichtigung.",

  "Der Benachrichtigungs-Link enthält keinen ID-Platzhalter",
  "Was passiert:",
  "Ohne `%SAMPLY_ID%` im Web-Link erhält die Umfrage überhaupt keine Kennung. Jede Antwort ist anonym und nicht zuordenbar.",
  "Die Lösung:",
  "Der Zeitplan-Editor warnt inzwischen schon beim Tippen davor, und der Einrichtungscheck meldet es. Nutzen Sie den Baukasten **Diesen Link für mich erstellen**, statt die URL von Hand zusammenzusetzen — er ergänzt die richtigen Parameter mit den für Ihre Umfrage-Plattform passenden Namen.",

  "Der Link ist fehlerhaft — ein doppelter Platzhalter oder ein zweites „?“",
  "Was passiert:",
  "Eine URL darf nur ein `?` enthalten; weitere Parameter werden mit `&` verbunden. Hängt man ein zweites `?id=%SAMPLY_ID%` an, verschluckt der Wert des vorherigen Parameters alles Nachfolgende, und die Umfrage speichert eine verstümmelte Kennung oder gar keine.",
  "Die Lösung:",
  "Das Speichern eines Zeitplans mit doppeltem Platzhalter oder einem überzähligen zweiten `?` wird jetzt mit einer konkreten Meldung blockiert. Wenn Sie einen älteren Zeitplan bearbeiten, speichern Sie ihn erneut, um die Prüfung auszulösen.",

  "Die ID kommt an, aber Ihr Umfrage-Tool speichert sie nicht",
  "Was passiert:",
  "Die meisten Umfrage-Plattformen ignorieren unerwartete URL-Parameter, solange Sie sie nicht deklarieren. In Qualtrics muss im Survey Flow ein Embedded-Data-Feld existieren, dessen Name *exakt* dem Query-Schlüssel entspricht, einschließlich Groß- und Kleinschreibung. SoSci verlangt, dass der Parameter registriert ist; LimeSurvey benötigt ihn in der Panel-Integration.",
  "Woran Sie das erkennen:",
  "Das ist der Fall, in dem die Testbenachrichtigung von Samply die ID im Link anzeigt, Ihr Export aber weiterhin eine leere Spalte hat. Das Problem liegt auf der Seite des Umfrage-Tools.",
  "Die Lösung:",
  "Folgen Sie der [Integrationsanleitung](/docs/integrations) für Ihre Plattform, füllen Sie dann eine Testantwort aus und laden Sie den Export herunter, um zu bestätigen, dass die Spalte gefüllt ist. Achten Sie auf reservierte Parameternamen — jedes Tool hat einige, sie sind je Plattform aufgeführt.",

  "Teilnehmende tippen stattdessen einen Code von Hand ein",
  "Das funktioniert, erhöht aber den Aufwand bei jeder einzelnen Aufforderung und führt zu Tippfehlern und uneinheitlicher Schreibweise, die Sie später bereinigen müssen. Die zwanzig Minuten, den Parameter sauber durchzuleiten, lohnen sich.",

  "3 · Rücklaufquoten wirken falsch, oder Erinnerungen gehen an alle",

  "Abschlüsse werden nie erfasst",
  "Was passiert:",
  "Samply weiß nur dann, dass eine Umfrage beendet wurde, wenn die Umfrage es mitteilt. Dafür braucht es zweierlei: `%MESSAGE_ID%` im Benachrichtigungs-Link und eine Weiterleitung am Ende Ihrer Umfrage zurück auf `/studies/<study-code>/done/<message-id>`, wobei die Message-ID mit der toolspezifischen Syntax zurückgegeben wird.",
  "Was Sie sehen:",
  "Die Analytics-Seite warnt, wenn eine Studie Benachrichtigungen verschickt, aber überhaupt keine Abschlüsse erfasst hat. Dieser Hinweis erscheint während der Laufzeit, nicht danach.",
  "Ebenfalls wissenswert:",
  "Manche Tools können überhaupt nicht auf eine externe URL weiterleiten, andere nur in kostenpflichtigen Tarifen. Die [Kompatibilitätstabelle](/docs/integrations) führt auf, welche.",

  "Erinnerungen erreichen Personen, die bereits geantwortet haben",
  "Warum:",
  "Erinnerungen werden automatisch abgebrochen, sobald ein Abschluss erfasst wird — ist die Abschlusserfassung aber nicht eingerichtet, kann Samply nicht wissen, wer geantwortet hat, und jede Erinnerung geht an alle. Das ist dieselbe Grundursache wie oben, und sie erzeugt doppelte Einreichungen, die Sie von Hand bereinigen müssen.",
  "Die Lösung:",
  "Ergänzen Sie `%MESSAGE_ID%` und die Weiterleitung am Umfrageende. Der Erinnerungsschritt im Zeitplan-Editor warnt Sie, wenn sie fehlen.",

  "Eine Person hat geantwortet, erscheint aber als Nicht-Antwortende",
  "Samply zählt eine Benachrichtigung als beantwortet, wenn die teilnehmende Person sie angetippt, aus dem Verlauf in der App geöffnet hat oder die Umfrage den Abschluss gemeldet hat. Ist nichts davon geschehen — etwa weil sie den Link in einen Desktop-Browser kopiert hat —, existiert die Antwort in Ihrem Umfrage-Tool, Samply kann sie aber nicht zuordnen. Gleichen Sie mit Ihrem Umfrage-Export ab, bevor Sie die Compliance-Zahl von Samply als endgültig betrachten.",

  "4 · Die Zahlen auf der Analytics-Seite wirken falsch",

  "Zahlen scheinen mit der Zeit zu sinken",
  "Prüfen Sie die Zeitraumauswahl oben auf der Seite. **Gesamte Studie** ist die Voreinstellung; ein fester Zeitraum wie *7T* ist ein gleitendes Fenster, das an der Gegenwart hängt, sodass ältere Nachrichten im Verlauf der Studie aus der Zählung fallen. Es geht nichts verloren — das Fenster hat sich verschoben. Wechseln Sie für kumulative Zahlen zurück auf **Gesamte Studie**.",

  "„Zeitplan-Leistung“ zeigt nur „(nicht zugeordneter Zeitplan)“",
  "Benachrichtigungen, die vor Mitte 2026 verschickt wurden, tragen keine Kennung des erzeugenden Zeitplans und lassen sich daher nachträglich nicht zuordnen. Neue Sendungen tun es. Ereigniskontingente und per API ausgelöste Benachrichtigungen haben zu Recht keinen Zeitplan und erscheinen immer hier.",

  "Die Zahlen stimmen nicht mit denen meines Umfrage-Tools überein",
  "Sie messen Unterschiedliches, und eine gewisse Abweichung ist zu erwarten. Samply zählt Benachrichtigungen und Interaktionen damit; Ihr Umfrage-Tool zählt Einreichungen. Teilweise Antworten, am Desktop begonnene Antworten und doppelte Einreichungen treiben beide auseinander. Testbenachrichtigungen sind aus den Zahlen und dem Datenexport von Samply ausgeschlossen und erklären eine Lücke daher nicht. Exportieren Sie für Ihre eigene Auswertung das Rohereignisprotokoll von der Verlaufsseite der Studie und berechnen Sie direkt, was Sie brauchen.",

  "5 · Es wurden überhaupt keine Benachrichtigungen verschickt",
  "Prüfen Sie der Reihe nach:",
  "**Ist die Studie aktiv?** Eine inaktive Studie verschickt nichts.",
  "**Ist überhaupt jemand beigetreten?** Ein Zeitplan ohne Empfängerinnen und Empfänger erzeugt keine Sendungen.",
  "**Adressiert der Zeitplan die richtigen Personen?** Ist er auf eine Gruppe beschränkt, der niemand angehört, oder auf die zum Erstellungszeitpunkt eingeschriebenen Personen, während Ihre Kohorte erst danach beigetreten ist, bleibt die Warteschlange leer.",
  "**Prüfen Sie die Zeitzone.** Ein Zeitplan in der falschen Zeitzone feuert zur falschen Ortszeit — oft mitten in der Nacht, was wie Nicht-Antwort aussieht statt wie ein Konfigurationsfehler.",
  "**Sehen Sie in die geplante Warteschlange.** Jeder Zeitplan wird zu einer Zeile pro Person und Sendezeitpunkt aufgelöst. Ist die Warteschlange leer, hat der Zeitplan nie etwas erzeugt, und die Ursache liegt oben statt bei der Zustellung.",

  "6 · Was Sie Teilnehmenden sagen sollten",
  "Die meisten Probleme auf Seiten der Teilnehmenden werden von ihnen selbst behoben, nicht von Ihnen. Es lohnt sich, das in Ihr Onboarding-Material aufzunehmen, statt es erst bei Bedarf zu verschicken:",
  "Erlauben Sie Benachrichtigungen, wenn die App danach fragt. Falls Sie abgelehnt haben, können Sie sie in den Einstellungen Ihres Telefons aktivieren.",
  "**Unter Android:** Schalten Sie die Akku-Optimierung für Samply aus, sonst verzögert oder blockiert das Telefon die Aufforderungen. [dontkillmyapp.com](https://dontkillmyapp.com/) enthält die Schritte für Ihr konkretes Telefon.",
  "Auf dem iPhone: Stellen Sie sicher, dass Samply sofort zustellen darf und nicht in einer geplanten Zusammenfassung zurückgehalten oder von einem Fokus stummgeschaltet wird.",
  "Wenn Sie die App neu installieren oder das Telefon wechseln, öffnen Sie Samply und melden Sie sich erneut an, damit Ihr Gerät neu registriert wird.",
  "Wenn keine Aufforderungen mehr ankommen, öffnen Sie im App-Menü den **Benachrichtigungs-Check**. Er zeigt genau, welcher Schritt unterbrochen ist, und bietet eine Reparatur mit einem Fingertipp.",

  "7 · Wie Sie all dem vorbeugen",
  "Führen Sie den **Einrichtungscheck** auf Ihrem Studien-Dashboard aus und schicken Sie sich selbst eine Testbenachrichtigung, bevor Sie rekrutieren. Der Test läuft über den normalen Versandweg und meldet vier Dinge: dass die Benachrichtigung gesendet wurde, dass der Link die Teilnehmenden-ID enthält, dass er geöffnet wurde und dass der Abschluss zurückgemeldet wurde. Eine Studie, die alle vier besteht, wird auf keine der hier beschriebenen Arten scheitern.",
  "Füllen Sie anschließend selbst eine vollständige Antwort aus und **laden Sie den Export herunter**. Nur so lässt sich bestätigen, dass Ihr Umfrage-Tool die Kennung tatsächlich speichert — das kann Samply von seiner Seite aus nicht sehen. Es dauert fünf Minuten und ist das Wertvollste, was Sie vor der Rekrutierung tun können.",
  "Wenn etwas hier nicht zu dem passt, was Sie sehen, oder Sie auf einen Fehler stoßen, den diese Seite nicht beschreibt, [melden Sie sich](/docs/collaborate) — die Liste wächst aus Rückmeldungen.",
]);
