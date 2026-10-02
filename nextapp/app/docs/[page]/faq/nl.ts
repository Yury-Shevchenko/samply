import { fromStrings } from "./content.ts";

/**
 * Dutch participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Dutch strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Deze pagina is bedoeld voor mensen die meedoen aan een onderzoek dat de app **Samply Research** gebruikt. Samply is het hulpmiddel dat de meldingen van een onderzoek aflevert. Het onderzoek zelf — de vragen, het schema, een eventuele vergoeding en uw antwoorden — wordt geleid door een onderzoeker, meestal aan een universiteit. Als u weet aan wie van de twee u iets moet vragen, krijgt u veel sneller antwoord.",

  "Wie moet ik vragen?",
  "De onderzoeker die uw onderzoek uitvoert",
  "Hoeveel meldingen u krijgt, wanneer en hoe lang",
  "Vragen in de vragenlijst, links naar vragenlijsten die niet werken, of fouten in een vragenlijst",
  "Betaling, studiepunten of proefpersoonuren, waardebonnen of een andere vergoeding",
  "Of een gemiste melding of een laat antwoord nog meetelt",
  "Het intrekken van uw antwoorden, of hoe uw antwoorden worden gebruikt",
  "Alles in de onderzoeksbeschrijving of het toestemmingsformulier",
  "Samply-ondersteuning",
  "De app crasht of wil niet openen",
  "U kunt zich niet registreren, niet inloggen of uw wachtwoord niet opnieuw instellen",
  "Uw Samply-account, of het verwijderen ervan",
  "Er komen helemaal geen meldingen binnen, ook niet nadat u de stappen op deze pagina hebt gevolgd",
  "Problemen met deze website",
  "De Samply-ondersteuning kan uw antwoorden niet zien, bepaalt het schema van het onderzoek niet en kan geen vergoeding uitbetalen of studiepunten toekennen. Bij die vragen kan alleen de onderzoeker helpen — als u eerst Samply schrijft, duurt het alleen langer voordat u antwoord krijgt.",

  "Contact met uw onderzoeker",
  "Hoe neem ik contact op met de onderzoeker van mijn onderzoek?",
  "Open de app Samply Research, tik op het onderzoek op uw startscherm en scrol omlaag naar **Verantwoordelijke onderzoeker**. Tik op het e-mailadres: uw mail-app opent een bericht aan de onderzoeker waarin de naam van het onderzoek en uw Samply ID al in de onderwerpregel staan, zodat de onderzoeker u meteen kan vinden.",
  "Ook de uitnodiging die u hebt ontvangen, de onderzoeksbeschrijving en het toestemmingsformulier bevatten meestal contactgegevens.",
  "Het onderzoek toont geen contactgegevens. Wat nu?",
  "Kijk in de uitnodiging waarmee u bij het onderzoek bent gekomen — een e-mail, een cursuspagina, een poster of een flyer — en in het toestemmingsformulier. Van onderzoekers wordt verwacht dat ze op minstens een van deze plekken een contactpersoon vermelden. Vindt u er toch geen, schrijf dan naar de Samply-ondersteuning met de naam van het onderzoek precies zoals die in de app staat, en wij helpen u de onderzoeker te bereiken.",
  "Wat moet ik in mijn bericht vermelden?",
  "De naam van het onderzoek, zoals die in de app wordt getoond.",
  "Uw **Samply ID**. Onderzoekers zien deze ID, niet uw naam of e-mailadres, dus zonder de ID kunnen ze uw gegevens niet vinden.",
  "Wat er is gebeurd, en ongeveer wanneer — bijvoorbeeld de datum en tijd van een melding die niet is aangekomen.",
  "Bij problemen met meldingen: het model van uw telefoon, en of deze Android of iOS gebruikt.",
  "Wat is mijn Samply ID en waar vind ik die?",
  "Uw Samply ID is een willekeurige code die de app voor u aanmaakt. Onderzoekers zien deze code in plaats van uw naam of e-mailadres, waardoor uw antwoorden gepseudonimiseerd blijven. U vindt de code in de app onder **Meer → Instellingen**, en op deze website nadat u [als deelnemer bent ingelogd](/participant/login).",
  "Sommige onderzoeken geven u ook een **Deelnemerscode**, die in de app op het scherm van het onderzoek wordt getoond. Hebt u er een, vermeld die dan ook als u de onderzoeker schrijft.",

  "Meldingen",
  "Ik ontvang geen meldingen",
  "Open in de app **Meer → Meldingencontrole**. Die controleert elke stap die een melding doorloopt, laat zien welke stap niet werkt en biedt een oplossing aan. De meest voorkomende oorzaken zijn:",
  "Meldingen voor Samply staan uit in de instellingen van uw telefoon.",
  "**Op Android:** batterijoptimalisatie zet de app in de slaapstand. Schakel die uit voor Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) toont de stappen voor uw telefoonmodel.",
  "**Op de iPhone:** een focusmodus of de geplande samenvatting houdt meldingen tegen. Sta Samply toe om meldingen direct af te leveren.",
  "U hebt de app opnieuw geïnstalleerd of bent overgestapt op een nieuwe telefoon. Log opnieuw in en tik daarna in Meldingencontrole op **Dit toestel opnieuw registreren**.",
  "Als Meldingencontrole laat zien dat alles in orde is en er toch geen meldingen binnenkomen, neem dan contact op met de onderzoeker. Het onderzoek is misschien gepauzeerd of afgelopen, of er staat op dit moment gewoon niets gepland.",
  "Meldingen komen op het verkeerde tijdstip",
  "Als u op reis bent geweest of de tijdzone van uw telefoon is veranderd, open dan **Meer → Instellingen** en kijk bij **Tijdzone**. Als uw opgeslagen en werkelijke tijdzone verschillen, tik dan op **De huidige tijdzone opslaan**.",
  "Als de tijdzone klopt, hoort het tijdstip bij de opzet van het onderzoek — veel onderzoeken versturen bewust op willekeurige momenten van de dag. Vraag het aan de onderzoeker. De voorkeursperiode die u in Instellingen kunt opgeven, is alleen informatie voor onderzoekers; die blokkeert zelf geen meldingen.",
  "Ik krijg te veel meldingen, of wil dat ze stoppen",
  "Hoe vaak u een melding krijgt, bepaalt de onderzoeker, niet Samply — vraag dus aan de onderzoeker of uw schema kan worden aangepast. Om alle meldingen van een onderzoek te stoppen, [verlaat u het onderzoek](/docs/faq#leave). Als u meldingen uitschakelt in de instellingen van uw telefoon, stoppen ze ook, maar dan registreert het onderzoek u als niet-reagerend.",
  "Ik heb een melding gemist. Kan ik nog antwoorden?",
  "Elke melding die u hebt ontvangen, staat in het tabblad **Geschiedenis** van de app, en u kunt de vragenlijst van daaruit openen. Bij veel onderzoeken verlopen links na een tijdje, omdat antwoorden die veel later worden gegeven minder bruikbaar zijn voor het onderzoek. Ziet u **De link is verlopen**, dan heeft de onderzoeker dat tijdvenster gesloten. Of een gemiste melding gevolgen heeft voor uw vergoeding of studiepunten, bepaalt de onderzoeker.",

  "Vragenlijsten en antwoorden",
  "De link naar de vragenlijst opent niet, of toont een fout",
  "Vragenlijsten draaien in het eigen vragenlijstprogramma van de onderzoeker — bijvoorbeeld Qualtrics, SoSci Survey of LimeSurvey — en niet bij Samply. Probeer het opnieuw met een stabiele internetverbinding. Als de pagina van de vragenlijst zelf een fout toont, of meldt dat de vragenlijst gesloten is, neem dan contact op met de onderzoeker: alleen die kan het oplossen. Een schermafbeelding helpt.",
  "Ik heb een vragenlijst ingevuld, maar de app toont die niet als voltooid",
  "Samply weet alleen dat een vragenlijst is ingevuld als de vragenlijst u aan het einde terugstuurt naar de app, en niet elk onderzoek is zo ingericht. Uw antwoorden zijn niet verloren — ze zijn opgeslagen in het vragenlijstprogramma van de onderzoeker. Als uw vergoeding ervan afhangt, laat de onderzoeker dan weten op welke datum en welk tijdstip u hebt geantwoord.",
  "Ik heb een fout gemaakt in mijn antwoorden",
  "Uw antwoorden gaan rechtstreeks naar het vragenlijstprogramma van de onderzoeker, en Samply kan ze niet zien of wijzigen. Schrijf de onderzoeker met de datum en tijd van de vragenlijst en wat u wilt corrigeren.",

  "Deelnemen aan een onderzoek en het verlaten",
  "Hoe neem ik deel aan een onderzoek?",
  "Tik in de app op **Een onderzoek vinden** en scan de QR-code van het onderzoek of voer de onderzoekscode van 8 tekens uit uw uitnodiging in. Een uitnodigingslink openen op uw telefoon werkt ook. Sommige onderzoeken staan ook bij **Openbare onderzoeken**.",
  "De app zegt dat er geen onderzoek is gevonden voor mijn code",
  "Controleer de code op typefouten — hij heeft 8 tekens. Als de code klopt, is het onderzoek misschien al gesloten of nog niet geopend. De onderzoeker kan u vertellen wat het geval is.",
  "Hoe verlaat ik een onderzoek?",
  "Open het onderzoek in de app, scrol helemaal naar beneden en tik op **Het onderzoek verlaten**. De app vraagt u om te bevestigen, omdat dit niet ongedaan kan worden gemaakt. Meldingen van dat onderzoek stoppen meteen.",
  "Als u een onderzoek verlaat, krijgt u geen nieuwe meldingen meer, maar antwoorden die u al hebt gegeven worden niet verwijderd — die zijn in handen van de onderzoeker. Wilt u dat ze worden ingetrokken, schrijf dan de onderzoeker en vermeld uw Samply ID.",
  "Wanneer ontvang ik mijn betaling of studiepunten?",
  "De vergoeding wordt geregeld en betaald door de onderzoeker, niet door Samply. Samply verwerkt geen betalingen aan deelnemers en kan niet zien of u bent betaald. Vraag het aan de onderzoeker en vermeld uw Samply ID.",

  "Uw account en uw gegevens",
  "Ik ben mijn wachtwoord vergeten",
  "Tik op het inlogscherm op **Wachtwoord vergeten?** en voer uw e-mailadres in. U ontvangt een link om een nieuw wachtwoord in te stellen. Komt die niet binnen een paar minuten aan, kijk dan in uw spammap; staat hij daar ook niet, neem dan contact op met de Samply-ondersteuning.",
  "Hoe wijzig ik mijn e-mailadres?",
  "Open in de app **Meer → Instellingen** en wijzig uw e-mailadres onder **Account instellingen**. Log daarna uit en weer in om de wijziging door te voeren.",
  "Wat kan de onderzoeker over mij zien?",
  "Onderzoekers zien uw Samply ID — niet uw naam, e-mailadres of telefoonnummer. Ze zien wanneer u meldingen zijn gestuurd en of u die hebt geopend, en ze ontvangen uw antwoorden via hun eigen vragenlijstprogramma. Als een onderzoek uw locatie gebruikt om meldingen te activeren, blijft uw locatie op uw telefoon en wordt die niet gedeeld met onderzoekers.",
  "Als u een onderzoeker een e-mail stuurt, ziet die natuurlijk uw e-mailadres. Het [privacybeleid](/docs/policy) legt uitgebreid uit wat Samply opslaat.",
  "Hoe verwijder ik mijn account en mijn gegevens?",
  "Open in de app **Meer → Instellingen**, tik op **Mijn account verwijderen** en bevestig met uw wachtwoord. Hiermee wordt uw Samply-account verwijderd, wordt u uit al uw onderzoeken gehaald en worden de gegevens die Samply over u bewaart gewist. Dit kan niet ongedaan worden gemaakt.",
  "Als u uw Samply-account verwijdert, worden antwoorden in het vragenlijstprogramma van een onderzoeker niet verwijderd — Samply heeft daar geen toegang toe. Wilt u dat die ook worden verwijderd, schrijf dan elke onderzoeker met uw Samply ID **voordat** u uw account verwijdert. Daarna wordt de ID niet meer in de app getoond.",
  "Kan ik een kopie van mijn gegevens krijgen?",
  "Ja. [Log in als deelnemer](/participant/login) op deze website en kies **Mijn gegevens downloaden** om een kopie te krijgen van alles wat Samply over u bewaart. Voor een kopie van uw antwoorden op vragenlijsten kunt u bij de onderzoeker terecht.",

  "Contact met de Samply-ondersteuning",
  "Hoe neem ik contact op met de Samply-ondersteuning?",
  "Schrijf naar [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn), of open in de app **Meer → Contacten**. Vermeld alstublieft uw telefoonmodel, de Android- of iOS-versie ervan en de app-versie die onder **Meer → Over** staat. Een antwoord duurt meestal een tot twee werkdagen.",
  "Samply wordt gerund door een klein team aan de Universiteit Konstanz. Vragen over een bepaald onderzoek kunnen wij niet beantwoorden, en ze doorsturen vertraagt alleen uw antwoord — stuur die vragen dus naar de onderzoeker.",
]);
