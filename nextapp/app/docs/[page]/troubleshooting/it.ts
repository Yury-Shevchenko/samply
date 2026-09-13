import { fromStrings } from "./content.ts";

/** Italian troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "La maggior parte dei problemi di Samply riguarda la configurazione, non un guasto, e quasi tutti sono visibili prima che parta la prima notifica. Questa pagina è ordinata secondo ciò che noteresti, non secondo ciò che è tecnicamente sbagliato.",
  "Se il tuo studio non è ancora iniziato, la via più rapida è la **Verifica configurazione** nella dashboard dello studio: controlla le tue impostazioni e propone una notifica di prova che passa dal canale di invio reale e ti mostra il link del questionario esattamente come lo ha ricevuto il telefono del partecipante. Quasi tutto ciò che segue viene intercettato da quell'unico controllo.",

  "1 · Un partecipante non riceve più notifiche",
  "È la segnalazione più frequente e ha diverse cause con soluzioni molto diverse. Scorri l'elenco dall'alto — è ordinato in base a quanto spesso ciascuna causa si rivela quella giusta.",

  "Il partecipante ha reinstallato l'app o cambiato telefono",
  "Cosa succede:",
  "il token push identifica l'installazione dell'app, non la persona. Una reinstallazione, il ripristino su un nuovo dispositivo o talvolta un aggiornamento del sistema generano un nuovo token; quello vecchio smette di funzionare in modo permanente.",
  "Cosa vedi:",
  "la pagina delle analisi segnala «N partecipante/i non possono più ricevere notifiche». Samply lo apprende dalle ricevute di consegna del servizio push, di norma entro un'ora dall'invio successivo.",
  "La soluzione:",
  "il partecipante apre Samply Research ed effettua l'accesso. Così il dispositivo viene registrato di nuovo automaticamente. Se ha dubbi, chiedigli di aprire la schermata **Verifica delle notifiche** nel menu dell'app e di toccare **Registra di nuovo questo dispositivo** — la stessa riparazione, eseguita di proposito.",

  "Android sta mettendo l'app in sospensione",
  "Cosa succede:",
  "molti produttori Android aggiungono una gestione aggressiva della batteria sopra il sistema. Il push viene accettato dai server di Google e poi ritardato o scartato dal telefono stesso. Samsung, Xiaomi, OnePlus, Huawei, Oppo e Vivo sono i soliti responsabili; il comportamento varia per produttore e per versione di Android.",
  "Cosa vedi:",
  "**niente.** Questo è il punto importante. La notifica è stata accettata per la consegna, quindi Samply la conta come inviata e da nessuna parte compare un avviso. L'unico segnale è un partecipante che segnala inviti mancanti mentre ogni indicatore lato server sembra sano.",
  "La soluzione:",
  "il partecipante esclude Samply dall'ottimizzazione della batteria. I passaggi variano per produttore e [dontkillmyapp.com](https://dontkillmyapp.com/) li documenta dispositivo per dispositivo — è il riferimento migliore disponibile e vale la pena inviarlo direttamente ai partecipanti con telefoni Android. Anche la schermata **Verifica delle notifiche** nell'app rimanda alle impostazioni del telefono.",
  "Prevenzione:",
  "indicalo nelle istruzioni iniziali anziché a posteriori. Chiederlo ai partecipanti Android il primo giorno costa un minuto; chiederlo il quinto giorno significa che hai già perso i loro dati.",

  "Il permesso per le notifiche non è mai stato concesso, o è stato revocato",
  "Cosa succede:",
  "l'app chiede il permesso al primo avvio. Se il partecipante rifiuta — o disattiva le notifiche in seguito, come alcuni fanno in blocco riordinando il telefono — non può essere consegnato nulla.",
  "Cosa vedi:",
  "se il permesso non è mai stato concesso, il partecipante non ha un token push: risulta iscritto ma non riceve mai nulla. Se è stato revocato dopo, dal punto di vista del server il token può continuare a funzionare per un po'.",
  "La soluzione:",
  "**Verifica delle notifiche** nel menu dell'app mostra direttamente lo stato del permesso e apre la pagina di impostazioni giusta.",

  "Il partecipante si è iscritto ma non ha più aperto l'app",
  "Un dispositivo si registra per le notifiche mentre l'app è in esecuzione. Chi si iscrive tramite un link, poi chiude l'app e non la riapre mai, può non completare mai la registrazione. La sua riga esiste; il suo dispositivo è irraggiungibile.",

  "Modalità Full Immersion di iOS, o il riepilogo programmato",
  "iOS può trattenere le notifiche e consegnarle in blocco, oppure silenziarle in modalità Full Immersion. Spesso i partecipanti non si accorgono che è attiva. La notifica arriva — solo non quando l'avevi programmata, il che nell'experience sampling equivale spesso a non arrivare. Chiedi ai partecipanti di consentire a Samply la consegna immediata.",

  "Il telefono era spento o offline al momento dell'invio",
  "I servizi push trattengono un messaggio per un po' e lo consegnano quando il dispositivo torna online, ma non lo garantiscono, e un link scaduto potrebbe non essere più utile per allora. Se il tuo disegno dipende dal fatto che un invito raggiunga le persone in una finestra stretta, imposta una scadenza del link così che gli arrivi tardivi non vengano risposti fuori finestra — e metti in conto qualche perdita.",

  "2 · L'esportazione del questionario non contiene alcun ID partecipante",
  "È il danno peggiore che possa capitare, perché avviene in silenzio e si scopre durante l'analisi, quando lo studio è già concluso.",
  "Non c'è modo di ricostruire a posteriori chi ha risposto a cosa. Se il tuo disegno richiede analisi a livello di persona o multilivello, verificalo il primo giorno con una notifica di prova.",

  "Il link della notifica non contiene un segnaposto ID",
  "Cosa succede:",
  "senza `%SAMPLY_ID%` nel link web, il questionario non riceve alcuna identificazione. Ogni risposta è anonima e non collegabile.",
  "La soluzione:",
  "l'editor delle pianificazioni ora avvisa già mentre digiti, e la verifica configurazione lo segnala. Usa il generatore **Crea questo link per me** invece di comporre l'URL a mano — aggiunge i parametri corretti con i nomi giusti per la tua piattaforma.",

  "Il link è malformato — un segnaposto duplicato o un secondo «?»",
  "Cosa succede:",
  "un URL può contenere un solo `?`; gli ulteriori parametri si uniscono con `&`. Incollando un secondo `?id=%SAMPLY_ID%` in fondo, il valore del parametro precedente inghiotte tutto ciò che segue e il questionario memorizza un identificatore corrotto o nessuno.",
  "La soluzione:",
  "salvare una pianificazione con un segnaposto duplicato o un `?` di troppo ora viene bloccato con un messaggio specifico. Se stai modificando una pianificazione più vecchia, salvala di nuovo per eseguire il controllo.",

  "L'ID arriva, ma il tuo strumento non lo memorizza",
  "Cosa succede:",
  "la maggior parte delle piattaforme ignora i parametri URL inattesi finché non li dichiari. In Qualtrics deve esistere un campo Embedded Data nel Survey Flow con un nome corrispondente *esattamente* alla chiave della query, maiuscole comprese. SoSci richiede che il parametro sia registrato; LimeSurvey lo vuole definito nell'integrazione panel.",
  "Come riconoscerlo:",
  "è il caso in cui la notifica di prova di Samply mostra l'ID presente nel link, ma la tua esportazione ha ancora una colonna vuota. Il problema è dalla parte dello strumento di indagine.",
  "La soluzione:",
  "segui la [guida all'integrazione](/docs/integrations) per la tua piattaforma, poi compila una risposta di prova e scarica l'esportazione per confermare che la colonna sia popolata. Attenzione ai nomi di parametro riservati — ogni strumento ne ha alcuni, sono elencati per piattaforma.",

  "I partecipanti digitano invece un codice a mano",
  "Funziona, ma appesantisce ogni singolo invito e introduce refusi e maiuscole incoerenti che dovrai poi ripulire. Vale la pena dedicare venti minuti a far passare il parametro correttamente.",

  "3 · I tassi di risposta sembrano sbagliati, o i promemoria vanno a tutti",

  "I completamenti non vengono mai registrati",
  "Cosa succede:",
  "Samply sa che un questionario è stato concluso solo se il questionario glielo dice. Servono due cose: `%MESSAGE_ID%` nel link della notifica e un reindirizzamento alla fine del questionario verso `/studies/<study-code>/done/<message-id>`, con l'id del messaggio restituito usando la sintassi propria del tuo strumento. Se il tuo strumento può solo aggiungere i propri parametri a un URL di reindirizzamento fisso, usa invece `/studies/<study-code>/done?messageid=<message-id>` — Samply accetta entrambe le forme.",
  "Cosa vedi:",
  "la pagina delle analisi avvisa quando uno studio ha inviato notifiche ma non ha registrato alcun completamento. Quell'avviso compare durante la raccolta, non dopo.",
  "Da sapere inoltre:",
  "alcuni strumenti non possono reindirizzare a un URL esterno, altri solo con piani a pagamento. La [tabella di compatibilità](/docs/integrations) indica quali.",

  "I promemoria raggiungono persone che hanno già risposto",
  "Perché:",
  "i promemoria vengono annullati automaticamente non appena un completamento viene registrato — ma se il tracciamento dei completamenti non è configurato, Samply non può sapere chi ha risposto e ogni promemoria va a tutti. È la stessa causa profonda di cui sopra e produce invii duplicati che dovrai deduplicare a mano.",
  "La soluzione:",
  "aggiungi `%MESSAGE_ID%` e il reindirizzamento di fine questionario. Il passaggio dei promemoria nell'editor delle pianificazioni ti avvisa quando mancano.",

  "Un partecipante ha risposto, ma risulta non rispondente",
  "Samply conta una notifica come risposta se il partecipante l'ha toccata, l'ha aperta dalla cronologia nell'app, o se il questionario ha segnalato il completamento. Se non è successo nulla di tutto ciò — per esempio perché ha copiato il link in un browser desktop — la risposta esiste nel tuo strumento ma Samply non può attribuirla. Confronta con la tua esportazione prima di considerare definitivo il dato di compliance di Samply.",

  "4 · I numeri nella pagina delle analisi sembrano sbagliati",

  "I conteggi sembrano diminuire nel tempo",
  "Controlla il selettore di periodo in cima alla pagina. **Intero studio** è l'impostazione predefinita; un periodo fisso come *7g* è una finestra mobile ancorata al presente, quindi i messaggi più vecchi escono dal conteggio con il procedere dello studio. Non si perde nulla — la finestra si è spostata. Torna a **Intero studio** per numeri cumulativi.",

  "«Prestazioni delle pianificazioni» mostra solo «(pianificazione non tracciata)»",
  "Le notifiche inviate prima di metà 2026 non riportavano la pianificazione che le ha prodotte e non possono quindi essere attribuite retroattivamente. Quelle nuove sì. Le notifiche event-contingent e attivate via API legittimamente non hanno pianificazione e compaiono sempre qui.",

  "I numeri non corrispondono a quelli del mio strumento",
  "Misurano cose diverse e una certa divergenza è attesa. Samply conta le notifiche e le interazioni con esse; il tuo strumento conta gli invii. Risposte parziali, risposte iniziate da desktop e invii duplicati separano i due valori. Le notifiche di prova sono escluse dai numeri e dall'esportazione di Samply, quindi non spiegano uno scarto. Per la tua analisi, esporta il registro grezzo degli eventi dalla pagina Cronologia dello studio e calcola direttamente ciò che ti serve.",

  "5 · Non è stata inviata alcuna notifica",
  "Controlla in quest'ordine:",
  "**Lo studio è attivo?** Uno studio inattivo non invia nulla.",
  "**Si è iscritto qualcuno?** Una pianificazione senza destinatari non produce invii.",
  "**La pianificazione punta alle persone giuste?** Se è limitata a un gruppo in cui non c'è nessuno, o ai partecipanti iscritti al momento della creazione mentre la tua coorte è arrivata dopo, la coda resterà vuota.",
  "**Controlla il fuso orario.** Una pianificazione impostata sul fuso sbagliato scatta all'ora locale sbagliata — spesso nel cuore della notte, il che sembra mancata risposta anziché un errore di configurazione.",
  "**Guarda la coda pianificata.** Ogni pianificazione si espande in una riga per partecipante per orario di invio. Se la coda è vuota, la pianificazione non ha mai prodotto nulla e la causa è sopra, non nella consegna.",

  "6 · Cosa dire ai partecipanti",
  "La maggior parte dei problemi lato partecipante li risolve il partecipante, non tu. Vale la pena inserirlo nel materiale introduttivo anziché inviarlo in reazione:",
  "Consenti le notifiche quando l'app te lo chiede. Se hai rifiutato, puoi attivarle nelle impostazioni del telefono.",
  "**Su Android:** disattiva l'ottimizzazione della batteria per Samply, altrimenti il telefono ritarderà o bloccherà gli inviti. [dontkillmyapp.com](https://dontkillmyapp.com/) riporta i passaggi per il tuo telefono specifico.",
  "Su iPhone: assicurati che Samply possa consegnare subito e non venga trattenuta in un riepilogo programmato né silenziata dalla modalità Full Immersion.",
  "Se reinstalli l'app o cambi telefono, apri Samply e accedi di nuovo così il tuo dispositivo viene registrato nuovamente.",
  "Se gli inviti smettono di arrivare, apri **Verifica delle notifiche** nel menu dell'app. Mostra esattamente quale passaggio è interrotto e propone una riparazione con un tocco.",

  "7 · Come prevenire tutto questo",
  "Esegui la **Verifica configurazione** nella dashboard dello studio e inviati una notifica di prova prima di reclutare. La prova passa dal normale canale di invio e riferisce quattro cose: che la notifica è stata inviata, che il link porta l'ID del partecipante, che è stato aperto e che il completamento è stato segnalato. Uno studio che supera tutte e quattro non fallirà in nessuno dei modi descritti in questa pagina.",
  "Poi compila tu stesso una risposta completa e **scarica l'esportazione**. È l'unico modo per confermare che il tuo strumento stia davvero memorizzando l'identificatore, cosa che Samply dal suo lato non può vedere. Richiede cinque minuti ed è la cosa di maggior valore che puoi fare prima di reclutare.",
  "Se qualcosa qui non corrisponde a ciò che vedi, o incontri un guasto che questa pagina non descrive, [scrivici](/docs/collaborate) — l'elenco cresce grazie alle segnalazioni.",
]);
