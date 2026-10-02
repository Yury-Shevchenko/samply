import { fromStrings } from "./content.ts";

/**
 * German participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * German strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Diese Seite richtet sich an Personen, die an einer Studie mit der App **Samply Research** teilnehmen. Samply ist das Werkzeug, das die Benachrichtigungen einer Studie zustellt. Die Studie selbst — ihre Fragen, ihr Zeitplan, eine etwaige Vergütung und Ihre Antworten — wird von einer forschenden Person betreut, meist an einer Universität. Wenn Sie wissen, an wen von beiden Sie sich wenden müssen, erhalten Sie viel schneller eine Antwort.",

  "Wen sollte ich fragen?",
  "Die forschende Person, die Ihre Studie durchführt",
  "Wie viele Benachrichtigungen Sie erhalten, wann und wie lange",
  "Fragen in der Umfrage, Umfrage-Links, die nicht funktionieren, oder Fehler innerhalb einer Umfrage",
  "Bezahlung, Versuchspersonenstunden, Gutscheine oder jede andere Vergütung",
  "Ob eine verpasste Benachrichtigung oder eine späte Antwort noch zählt",
  "Das Zurückziehen Ihrer Antworten oder wie Ihre Antworten verwendet werden",
  "Alles, was in der Studienbeschreibung oder der Einwilligungserklärung steht",
  "Samply-Support",
  "Die App stürzt ab oder lässt sich nicht öffnen",
  "Sie können sich nicht registrieren, nicht anmelden oder Ihr Passwort nicht zurücksetzen",
  "Ihr Samply-Konto oder dessen Löschung",
  "Es kommen überhaupt keine Benachrichtigungen an, auch nachdem Sie die Schritte auf dieser Seite befolgt haben",
  "Probleme mit dieser Website",
  "Der Samply-Support kann Ihre Antworten nicht sehen, legt den Zeitplan der Studie nicht fest und kann weder Vergütungen auszahlen noch Versuchspersonenstunden vergeben. Bei diesen Fragen kann nur die forschende Person helfen — wenn Sie zuerst an Samply schreiben, verzögert sich Ihre Antwort nur.",

  "Kontakt zur forschenden Person",
  "Wie kontaktiere ich die forschende Person meiner Studie?",
  "Öffnen Sie die App Samply Research, tippen Sie auf Ihrem Startbildschirm auf die Studie und scrollen Sie nach unten zu **Verantwortlicher Forscher**. Tippen Sie auf die E-Mail-Adresse: Ihre Mail-App öffnet eine Nachricht an die forschende Person, in deren Betreffzeile der Studienname und Ihre Samply ID bereits eingetragen sind, sodass Sie sofort gefunden werden können.",
  "Auch die Einladung, die Sie erhalten haben, die Studienbeschreibung und die Einwilligungserklärung enthalten meist Kontaktangaben.",
  "Die Studie zeigt keine Kontaktangaben. Was nun?",
  "Sehen Sie in der Einladung nach, über die Sie zur Studie gekommen sind — eine E-Mail, eine Kursseite, ein Poster oder ein Flyer — und in der Einwilligungserklärung. Forschende sollten an mindestens einer dieser Stellen einen Kontakt angeben. Wenn Sie trotzdem keinen finden, schreiben Sie an den Samply-Support und nennen Sie den Studiennamen genau so, wie er in der App erscheint; wir helfen Ihnen dann, die forschende Person zu erreichen.",
  "Was sollte meine Nachricht enthalten?",
  "Den Studiennamen, wie er in der App angezeigt wird.",
  "Ihre **Samply ID**. Forschende sehen diese ID, nicht Ihren Namen oder Ihre E-Mail-Adresse — ohne sie können sie Ihre Daten nicht finden.",
  "Was passiert ist und ungefähr wann — zum Beispiel Datum und Uhrzeit einer Benachrichtigung, die nicht angekommen ist.",
  "Bei Problemen mit Benachrichtigungen: Ihr Telefonmodell und ob es mit Android oder iOS läuft.",
  "Was ist meine Samply ID und wo finde ich sie?",
  "Ihre Samply ID ist ein zufälliger Code, den die App für Sie erzeugt. Forschende sehen diesen Code statt Ihres Namens oder Ihrer E-Mail-Adresse, wodurch Ihre Antworten pseudonym bleiben. Sie finden ihn in der App unter **Mehr → Einstellungen** und auf dieser Website, nachdem Sie sich [als teilnehmende Person angemeldet haben](/participant/login).",
  "Manche Studien geben Ihnen außerdem einen **Teilnehmercode**, der in der App auf der Seite der Studie angezeigt wird. Wenn Sie einen haben, geben Sie ihn ebenfalls an, wenn Sie der forschenden Person schreiben.",

  "Benachrichtigungen",
  "Ich erhalte keine Benachrichtigungen",
  "Öffnen Sie in der App **Mehr → Benachrichtigungs-Check**. Er prüft jeden Schritt, den eine Benachrichtigung durchläuft, zeigt, welcher davon nicht funktioniert, und bietet eine Lösung an. Die häufigsten Ursachen sind:",
  "Benachrichtigungen für Samply sind in den Einstellungen Ihres Telefons ausgeschaltet.",
  "**Unter Android:** Die Akku-Optimierung legt die App schlafen. Schalten Sie sie für Samply aus — [dontkillmyapp.com](https://dontkillmyapp.com/) zeigt die Schritte für Ihr Telefonmodell.",
  "**Auf dem iPhone:** Ein Fokus-Modus oder die geplante Zusammenfassung hält Benachrichtigungen zurück. Erlauben Sie Samply, Benachrichtigungen sofort zuzustellen.",
  "Sie haben die App neu installiert oder auf ein neues Telefon gewechselt. Melden Sie sich erneut an und tippen Sie dann im Benachrichtigungs-Check auf **Gerät neu registrieren**.",
  "Wenn der Benachrichtigungs-Check zeigt, dass alles in Ordnung ist, und trotzdem keine Benachrichtigungen ankommen, wenden Sie sich an die forschende Person. Die Studie ist vielleicht pausiert oder beendet oder soll derzeit schlicht nichts senden.",
  "Benachrichtigungen kommen zur falschen Zeit",
  "Wenn Sie verreist sind oder sich die Zeitzone Ihres Telefons geändert hat, öffnen Sie **Mehr → Einstellungen** und sehen Sie unter **Zeitzone** nach. Wenn sich gespeicherte und tatsächliche Zeitzone unterscheiden, tippen Sie auf **Speichern Sie die aktuelle Zeitzone**.",
  "Wenn die Zeitzone stimmt, gehört der Zeitpunkt zum Design der Studie — viele Studien senden absichtlich zu zufälligen Zeitpunkten am Tag. Fragen Sie die forschende Person. Der bevorzugte Zeitraum, den Sie in den Einstellungen angeben können, ist nur eine Information für Forschende; er blockiert für sich genommen keine Benachrichtigungen.",
  "Ich bekomme zu viele Benachrichtigungen oder möchte, dass sie aufhören",
  "Wie oft Sie benachrichtigt werden, entscheidet die forschende Person, nicht Samply — fragen Sie also sie, ob Ihr Zeitplan geändert werden kann. Um alle Benachrichtigungen einer Studie zu beenden, [verlassen Sie die Studie](/docs/faq#leave). Wenn Sie Benachrichtigungen in den Einstellungen Ihres Telefons ausschalten, hören sie ebenfalls auf, aber die Studie erfasst Sie dann als nicht antwortend.",
  "Ich habe eine Benachrichtigung verpasst. Kann ich noch antworten?",
  "Jede Benachrichtigung, die Sie erhalten haben, ist in der App im Tab **Verlauf** aufgeführt, und Sie können die Umfrage von dort aus öffnen. Viele Studien lassen Links nach einer gewissen Zeit ablaufen, weil viel später gegebene Antworten für die Forschung weniger nützlich sind. Wenn Sie **Der Link ist abgelaufen** sehen, hat die forschende Person dieses Zeitfenster geschlossen. Ob sich eine verpasste Benachrichtigung auf Ihre Vergütung oder Ihre Versuchspersonenstunden auswirkt, entscheidet die forschende Person.",

  "Umfragen und Antworten",
  "Der Umfrage-Link öffnet sich nicht oder zeigt einen Fehler",
  "Umfragen laufen über das eigene Umfrage-Tool der forschenden Person — zum Beispiel Qualtrics, SoSci Survey oder LimeSurvey — und nicht über Samply. Versuchen Sie es mit einer stabilen Internetverbindung erneut. Wenn die Umfrageseite selbst einen Fehler zeigt oder meldet, dass die Umfrage geschlossen ist, wenden Sie sich an die forschende Person: Nur sie kann das beheben. Ein Screenshot hilft.",
  "Ich habe eine Umfrage abgeschlossen, aber die App zeigt sie nicht als erledigt an",
  "Samply erfährt nur dann, dass eine Umfrage abgeschlossen ist, wenn die Umfrage Sie am Ende zurück in die App schickt — und nicht jede Studie ist so eingerichtet. Ihre Antworten sind nicht verloren — sie sind im Umfrage-Tool der forschenden Person gespeichert. Wenn Ihre Vergütung davon abhängt, nennen Sie der forschenden Person Datum und Uhrzeit Ihrer Antwort.",
  "Ich habe bei meinen Antworten einen Fehler gemacht",
  "Ihre Antworten gehen direkt an das Umfrage-Tool der forschenden Person, und Samply kann sie weder sehen noch ändern. Schreiben Sie der forschenden Person mit Datum und Uhrzeit der Umfrage und dem, was Sie korrigieren möchten.",

  "Einer Studie beitreten und sie verlassen",
  "Wie trete ich einer Studie bei?",
  "Tippen Sie in der App auf **Eine Studie finden** und scannen Sie entweder den QR-Code der Studie oder geben Sie den 8-stelligen Studiencode aus Ihrer Einladung ein. Sie können auch einfach einen Einladungslink auf Ihrem Telefon öffnen. Manche Studien sind außerdem unter **Öffentliche Studien** aufgeführt.",
  "Die App meldet, dass für meinen Code keine Studie gefunden wurde",
  "Prüfen Sie den Code auf Tippfehler — er hat 8 Zeichen. Wenn er stimmt, ist die Studie vielleicht bereits geschlossen oder noch nicht geöffnet. Die forschende Person kann Ihnen sagen, was zutrifft.",
  "Wie verlasse ich eine Studie?",
  "Öffnen Sie die Studie in der App, scrollen Sie ganz nach unten und tippen Sie auf **Die Studie verlassen**. Die App bittet Sie um Bestätigung, weil dies nicht rückgängig gemacht werden kann. Benachrichtigungen dieser Studie hören sofort auf.",
  "Wenn Sie eine Studie verlassen, erhalten Sie keine neuen Benachrichtigungen mehr, aber bereits gegebene Antworten werden nicht gelöscht — diese liegen bei der forschenden Person. Wenn Sie möchten, dass sie zurückgezogen werden, schreiben Sie der forschenden Person und geben Sie Ihre Samply ID an.",
  "Wann erhalte ich meine Vergütung oder meine Versuchspersonenstunden?",
  "Die Vergütung wird von der forschenden Person organisiert und ausgezahlt, nicht von Samply. Samply wickelt keine Zahlungen an Teilnehmende ab und kann nicht sehen, ob Sie bezahlt wurden. Fragen Sie die forschende Person und geben Sie Ihre Samply ID an.",

  "Ihr Konto und Ihre Daten",
  "Ich habe mein Passwort vergessen",
  "Tippen Sie auf dem Anmeldebildschirm auf **Haben Sie Ihr Passwort vergessen?** und geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link, mit dem Sie ein neues Passwort festlegen können. Wenn er nicht innerhalb weniger Minuten ankommt, sehen Sie in Ihrem Spam-Ordner nach; ist er auch dort nicht, wenden Sie sich an den Samply-Support.",
  "Wie ändere ich meine E-Mail-Adresse?",
  "Öffnen Sie in der App **Mehr → Einstellungen** und ändern Sie Ihre E-Mail-Adresse unter **Kontoinformationen**. Melden Sie sich danach ab und wieder an, damit die Änderung wirksam wird.",
  "Was kann die forschende Person über mich sehen?",
  "Forschende sehen Ihre Samply ID — nicht Ihren Namen, Ihre E-Mail-Adresse oder Ihre Telefonnummer. Sie sehen, wann Ihnen Benachrichtigungen geschickt wurden und ob Sie sie geöffnet haben, und sie erhalten Ihre Antworten über ihr eigenes Umfrage-Tool. Wenn eine Studie Ihren Standort nutzt, um Benachrichtigungen auszulösen, bleibt Ihr Standort auf Ihrem Telefon und wird nicht an Forschende weitergegeben.",
  "Wenn Sie einer forschenden Person eine E-Mail schreiben, sieht sie natürlich Ihre E-Mail-Adresse. Die [Datenschutzerklärung](/docs/policy) erklärt ausführlich, was Samply speichert.",
  "Wie lösche ich mein Konto und meine Daten?",
  "Öffnen Sie in der App **Mehr → Einstellungen**, tippen Sie auf **Mein Konto löschen** und bestätigen Sie mit Ihrem Passwort. Dadurch wird Ihr Samply-Konto entfernt, Sie werden aus allen Ihren Studien ausgetragen, und die Daten, die Samply über Sie gespeichert hat, werden gelöscht. Dies kann nicht rückgängig gemacht werden.",
  "Wenn Sie Ihr Samply-Konto löschen, werden Antworten im Umfrage-Tool einer forschenden Person nicht gelöscht — Samply hat darauf keinen Zugriff. Wenn Sie auch diese entfernen lassen möchten, schreiben Sie jeder forschenden Person mit Ihrer Samply ID, **bevor** Sie Ihr Konto löschen. Danach wird die ID in der App nicht mehr angezeigt.",
  "Kann ich eine Kopie meiner Daten erhalten?",
  "Ja. [Melden Sie sich als teilnehmende Person an](/participant/login) auf dieser Website und wählen Sie **Meine Daten herunterladen**, um eine Kopie von allem zu erhalten, was Samply über Sie gespeichert hat. Für eine Kopie Ihrer Umfrageantworten fragen Sie die forschende Person.",

  "Kontakt zum Samply-Support",
  "Wie kontaktiere ich den Samply-Support?",
  "Schreiben Sie an [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) oder öffnen Sie in der App **Mehr → Kontakte**. Bitte geben Sie Ihr Telefonmodell, dessen Android- oder iOS-Version und die App-Version an, die unter **Mehr → Über uns** angezeigt wird. Antworten dauern in der Regel ein bis zwei Werktage.",
  "Samply wird von einem kleinen Team an der Universität Konstanz betrieben. Fragen zu einer bestimmten Studie können wir nicht beantworten, und eine Weiterleitung verzögert Ihre Antwort nur — schicken Sie diese Fragen also bitte an die forschende Person.",
]);
