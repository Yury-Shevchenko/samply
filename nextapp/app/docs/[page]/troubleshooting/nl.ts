import { fromStrings } from "./content.ts";

/** Dutch troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "De meeste problemen met Samply zijn configuratiefouten, geen storingen, en bijna allemaal zijn ze zichtbaar voordat de eerste melding uitgaat. Deze pagina is geordend naar wat u zou opvallen, niet naar wat technisch mis is.",
  "Als uw studie nog niet is begonnen, is de snelste route de **Installatiecontrole** op uw studiedashboard: die inspecteert uw configuratie en biedt een testmelding aan die via de echte verzendweg gaat en u de enquêtelink toont precies zoals de telefoon van de deelnemer hem heeft ontvangen. Vrijwel alles hieronder wordt door die ene controle opgemerkt.",

  "1 · Een deelnemer ontvangt geen meldingen meer",
  "Dit is de meest gemelde klacht, met verschillende oorzaken die elk een andere oplossing vragen. Werk de lijst van boven af — hij is geordend naar hoe vaak elke oorzaak de juiste blijkt.",

  "De deelnemer heeft de app opnieuw geïnstalleerd of een andere telefoon",
  "Wat er gebeurt:",
  "de pushtoken identificeert de app-installatie, niet de persoon. Opnieuw installeren, terugzetten op een nieuw toestel of soms een systeemupdate levert een nieuwe token op; de oude werkt blijvend niet meer.",
  "Wat u ziet:",
  "de analysepagina meldt „N deelnemer(s) kunnen geen meldingen meer ontvangen”. Samply leidt dit af uit de afleverbevestigingen van de pushdienst, meestal binnen een uur na de volgende verzending.",
  "De oplossing:",
  "de deelnemer opent Samply Research en logt in. Daarmee wordt het toestel automatisch opnieuw geregistreerd. Weet iemand het niet zeker, vraag dan het scherm **Meldingencontrole** in het app-menu te openen en op **Dit toestel opnieuw registreren** te tikken — dezelfde reparatie, bewust uitgevoerd.",

  "Android legt de app slapen",
  "Wat er gebeurt:",
  "veel Android-fabrikanten voegen agressief accubeheer toe bovenop het standaardsysteem. De push wordt door de servers van Google aangenomen en vervolgens door de telefoon zelf vertraagd of weggegooid. Samsung, Xiaomi, OnePlus, Huawei, Oppo en Vivo zijn de gebruikelijke veroorzakers; het gedrag verschilt per fabrikant en per Android-versie.",
  "Wat u ziet:",
  "**niets.** Dat is het belangrijkste punt. De melding is voor bezorging aangenomen, dus Samply telt hem als verzonden en nergens verschijnt een waarschuwing. Het enige signaal is een deelnemer die gemiste meldingen meldt terwijl alle serverzijdige indicatoren er gezond uitzien.",
  "De oplossing:",
  "de deelnemer sluit Samply uit van accuoptimalisatie. De stappen verschillen per fabrikant; [dontkillmyapp.com](https://dontkillmyapp.com/) documenteert ze toestel voor toestel — het is de beste beschikbare referentie en het loont om die rechtstreeks naar deelnemers met een Android-telefoon te sturen. Het scherm **Meldingencontrole** in de app verwijst ook naar de telefooninstellingen.",
  "Preventie:",
  "vermeld dit in uw onboardinginstructies in plaats van achteraf. Android-deelnemers er op dag één om vragen kost een minuut; op dag vijf vragen betekent dat u hun gegevens al kwijt bent.",

  "Meldingstoestemming is nooit gegeven of is ingetrokken",
  "Wat er gebeurt:",
  "de app vraagt bij de eerste start om toestemming. Weigert de deelnemer — of zet die later meldingen uit, wat sommige mensen en bloc doen bij het opruimen van hun telefoon — dan kan er niets worden bezorgd.",
  "Wat u ziet:",
  "is toestemming nooit gegeven, dan heeft de deelnemer geen pushtoken: die lijkt ingeschreven maar ontvangt nooit iets. Is de toestemming later ingetrokken, dan kan de token vanuit de server bezien nog een tijd blijven werken.",
  "De oplossing:",
  "**Meldingencontrole** in het app-menu toont de toestemmingsstatus rechtstreeks en opent de juiste instellingenpagina.",

  "De deelnemer is toegetreden maar heeft de app nooit meer geopend",
  "Een toestel registreert zich voor meldingen terwijl de app draait. Wie via een link toetreedt, de app daarna afsluit en nooit meer opent, voltooit de registratie mogelijk nooit. De rij bestaat; het toestel is onbereikbaar.",

  "iOS-focusmodi of het geplande overzicht",
  "iOS kan meldingen vasthouden en gebundeld bezorgen, of ze stilzetten onder een focusmodus. Deelnemers hebben vaak niet door dat dit aanstaat. De melding komt aan — alleen niet op het geplande moment, wat bij experience sampling vaak hetzelfde is als niet aankomen. Vraag deelnemers Samply direct te laten bezorgen.",

  "De telefoon stond uit of was offline op het verzendmoment",
  "Pushdiensten houden een bericht een tijd vast en bezorgen het zodra het toestel weer verbinding heeft, maar garanderen dat niet, en een verlopen link is tegen die tijd mogelijk niet meer bruikbaar. Hangt uw opzet ervan af dat een melding mensen binnen een smal venster bereikt, stel dan een linkvervaltijd in zodat late bezorgingen niet buiten het venster worden beantwoord — en reken op enig verlies.",

  "2 · De enquête-export bevat geen deelnemers-ID",
  "Dit is het schadelijkste dat mis kan gaan, omdat het geruisloos gebeurt en pas bij de analyse wordt ontdekt, wanneer de studie al voorbij is.",
  "Er is geen manier om achteraf te reconstrueren wie wat heeft beantwoord. Vereist uw opzet analyses op persoonsniveau of multilevelanalyses, controleer dit dan op dag één met een testmelding.",

  "De meldingslink bevat geen ID-plaatshouder",
  "Wat er gebeurt:",
  "zonder `%SAMPLY_ID%` in de weblink ontvangt de enquête helemaal geen identificatie. Elke reactie is anoniem en niet te koppelen.",
  "De oplossing:",
  "de planningseditor waarschuwt hier tegenwoordig al tijdens het typen voor, en de installatiecontrole meldt het. Gebruik de bouwer **Maak deze link voor mij** in plaats van de URL met de hand samen te stellen — die voegt de juiste parameters toe met de namen die uw enquêteplatform verwacht.",

  "De link is onjuist — een dubbele plaatshouder of een tweede „?”",
  "Wat er gebeurt:",
  "een URL mag maar één `?` bevatten; verdere parameters worden verbonden met `&`. Plakt u er een tweede `?id=%SAMPLY_ID%` achter, dan slokt de waarde van de vorige parameter alles daarna op en slaat de enquête een verminkte identificatie of helemaal niets op.",
  "De oplossing:",
  "het opslaan van een planning met een dubbele plaatshouder of een overtollige tweede `?` wordt nu geblokkeerd met een concrete melding. Bewerkt u een oudere planning, sla die dan opnieuw op om de controle uit te voeren.",

  "De ID komt aan, maar uw enquêtetool slaat hem niet op",
  "Wat er gebeurt:",
  "de meeste enquêteplatforms negeren onverwachte URL-parameters tenzij u ze declareert. In Qualtrics moet in de Survey Flow een Embedded Data-veld bestaan waarvan de naam *exact* overeenkomt met de querysleutel, inclusief hoofdletters. SoSci vereist dat de parameter geregistreerd is; LimeSurvey heeft hem nodig in de panelintegratie.",
  "Hoe u dit herkent:",
  "dit is het geval waarin de testmelding van Samply de ID in de link toont, maar uw export nog steeds een lege kolom heeft. Het probleem zit aan de kant van de enquêtetool.",
  "De oplossing:",
  "volg de [integratiehandleiding](/docs/integrations) voor uw platform, vul daarna een testreactie in en download de export om te bevestigen dat de kolom gevuld is. Let op gereserveerde parameternamen — elk tool heeft er enkele, ze staan per platform vermeld.",

  "Deelnemers typen in plaats daarvan een code met de hand in",
  "Dat werkt, maar verhoogt de belasting bij elke afzonderlijke melding en introduceert typefouten en wisselend hoofdlettergebruik die u later moet opschonen. De twintig minuten om de parameter netjes door te geven zijn het waard.",

  "3 · Responspercentages lijken niet te kloppen, of herinneringen gaan naar iedereen",

  "Voltooiingen worden nooit vastgelegd",
  "Wat er gebeurt:",
  "Samply weet alleen dat een enquête is afgerond als de enquête dat meldt. Daarvoor zijn twee dingen nodig: `%MESSAGE_ID%` in de meldingslink en een doorverwijzing aan het einde van uw enquête terug naar `/studies/<study-code>/done/<message-id>`, waarbij de bericht-id met de eigen syntaxis van uw tool wordt teruggegeven.",
  "Wat u ziet:",
  "de analysepagina waarschuwt wanneer een studie meldingen heeft verzonden maar in het geheel geen voltooiingen heeft vastgelegd. Die melding verschijnt tijdens de looptijd, niet erna.",
  "Ook goed om te weten:",
  "sommige tools kunnen helemaal niet doorverwijzen naar een externe URL, andere alleen in betaalde abonnementen. De [compatibiliteitstabel](/docs/integrations) vermeldt welke.",

  "Herinneringen bereiken mensen die al hebben geantwoord",
  "Waarom:",
  "herinneringen worden automatisch geannuleerd zodra een voltooiing is vastgelegd — maar als voltooiingsregistratie niet is ingericht, kan Samply niet weten wie heeft geantwoord en gaat elke herinnering naar iedereen. Dit is dezelfde grondoorzaak als hierboven, en het levert dubbele inzendingen op die u met de hand moet ontdubbelen.",
  "De oplossing:",
  "voeg `%MESSAGE_ID%` en de doorverwijzing aan het enquête-einde toe. De herinneringsstap in de planningseditor waarschuwt u wanneer ze ontbreken.",

  "Een deelnemer heeft geantwoord, maar verschijnt als niet-respondent",
  "Samply telt een melding als beantwoord wanneer de deelnemer erop tikte, hem opende vanuit de geschiedenis in de app, of de enquête voltooiing meldde. Is niets daarvan gebeurd — bijvoorbeeld omdat de link naar een desktopbrowser is gekopieerd — dan bestaat de reactie in uw enquêtetool maar kan Samply hem niet toewijzen. Vergelijk met uw enquête-export voordat u het compliancecijfer van Samply als definitief beschouwt.",

  "4 · De cijfers op de analysepagina lijken niet te kloppen",

  "Aantallen lijken in de loop van de tijd te dalen",
  "Controleer de periodekiezer bovenaan de pagina. **Volledige studie** is de standaard; een vaste periode zoals *7d* is een schuivend venster dat aan het heden hangt, dus oudere berichten vallen gaandeweg de studie uit de telling. Er gaat niets verloren — het venster is verschoven. Schakel voor cumulatieve cijfers terug naar **Volledige studie**.",

  "„Planningsprestaties” toont alleen „(niet-gevolgde planning)”",
  "Meldingen die vóór medio 2026 zijn verzonden, dragen geen kenmerk van de planning die ze voortbracht en kunnen daarom niet met terugwerkende kracht worden toegewezen. Nieuwe verzendingen wel. Gebeurtenisafhankelijke en via de API geactiveerde meldingen hebben terecht geen planning en verschijnen hier altijd.",

  "De cijfers komen niet overeen met die van mijn enquêtetool",
  "Ze meten verschillende dingen, en enige afwijking is te verwachten. Samply telt meldingen en interacties daarmee; uw enquêtetool telt inzendingen. Gedeeltelijke reacties, op een desktop begonnen reacties en dubbele inzendingen drijven beide uit elkaar. Testmeldingen zijn uitgesloten van de cijfers en de gegevensexport van Samply en verklaren een verschil dus niet. Exporteer voor uw eigen analyse het ruwe gebeurtenissenlogboek van de pagina Geschiedenis van de studie en bereken direct wat u nodig hebt.",

  "5 · Er zijn helemaal geen meldingen verzonden",
  "Controleer dit op volgorde:",
  "**Is de studie actief?** Een inactieve studie verzendt niets.",
  "**Is er iemand toegetreden?** Een planning zonder ontvangers levert geen verzendingen op.",
  "**Richt de planning zich op de juiste mensen?** Is die beperkt tot een groep waarin niemand zit, of tot deelnemers die bij het aanmaken al waren ingeschreven terwijl uw cohort pas daarna toetrad, dan blijft de wachtrij leeg.",
  "**Controleer de tijdzone.** Een planning in de verkeerde tijdzone gaat af op het verkeerde lokale uur — vaak midden in de nacht, wat op non-respons lijkt in plaats van op een configuratiefout.",
  "**Bekijk de geplande wachtrij.** Elke planning valt uiteen in één rij per deelnemer per verzendmoment. Is de wachtrij leeg, dan heeft de planning nooit iets voortgebracht en ligt de oorzaak hierboven in plaats van bij de bezorging.",

  "6 · Wat u deelnemers moet vertellen",
  "De meeste problemen aan de kant van de deelnemer worden door henzelf opgelost, niet door u. Het loont om dit in uw onboardingmateriaal op te nemen in plaats van het achteraf te sturen:",
  "Sta meldingen toe wanneer de app erom vraagt. Hebt u geweigerd, dan kunt u ze alsnog aanzetten in de instellingen van uw telefoon.",
  "**Op Android:** zet accuoptimalisatie voor Samply uit, anders vertraagt of blokkeert de telefoon de meldingen. [dontkillmyapp.com](https://dontkillmyapp.com/) bevat de stappen voor uw specifieke telefoon.",
  "Op de iPhone: zorg dat Samply direct mag bezorgen en niet wordt vastgehouden in een gepland overzicht of stilgezet door een focusmodus.",
  "Installeert u de app opnieuw of wisselt u van telefoon, open dan Samply en log opnieuw in zodat uw toestel opnieuw wordt geregistreerd.",
  "Komen er geen meldingen meer aan, open dan **Meldingencontrole** in het app-menu. Dat toont precies welke stap is onderbroken en biedt een reparatie met één tik.",

  "7 · Hoe u dit alles voorkomt",
  "Voer de **Installatiecontrole** op uw studiedashboard uit en stuur uzelf een testmelding voordat u werft. De test loopt via de gewone verzendweg en meldt vier dingen: dat de melding is verzonden, dat de link de deelnemers-ID bevat, dat hij is geopend en dat de voltooiing is teruggemeld. Een studie die alle vier doorstaat, faalt op geen van de manieren die op deze pagina staan beschreven.",
  "Vul daarna zelf één volledige reactie in en **download de export**. Alleen zo bevestigt u dat uw enquêtetool de identificatie daadwerkelijk opslaat — dat kan Samply van zijn kant niet zien. Het kost vijf minuten en is het waardevolste dat u vóór de werving kunt doen.",
  "Komt iets hier niet overeen met wat u ziet, of stuit u op een storing die deze pagina niet beschrijft, [neem dan contact op](/docs/collaborate) — de lijst groeit dankzij meldingen.",
]);
