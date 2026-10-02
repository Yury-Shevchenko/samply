import { fromStrings } from "./content.ts";

/**
 * Italian participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Italian strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Questa pagina è per chi partecipa a uno studio che usa l'app **Samply Research**. Samply è lo strumento che invia le notifiche di uno studio. Lo studio vero e proprio — le domande, il calendario, l'eventuale compenso e le tue risposte — è gestito da un ricercatore, di solito presso un'università. Sapere a chi dei due rivolgerti ti permette di ottenere una risposta molto più in fretta.",

  "A chi devo chiedere?",
  "Il ricercatore che conduce il tuo studio",
  "Quante notifiche ricevi, quando e per quanto tempo",
  "Domande del questionario, link ai questionari che non funzionano o errori all'interno di un questionario",
  "Pagamento, crediti formativi, buoni o qualsiasi altro compenso",
  "Se una notifica persa o una risposta in ritardo conta ancora",
  "Il ritiro delle tue risposte, o il modo in cui vengono usate",
  "Qualsiasi cosa contenuta nella descrizione dello studio o nel modulo di consenso",
  "Supporto Samply",
  "L'app si blocca o non si apre",
  "Non riesci a registrarti, ad accedere o a reimpostare la password",
  "Il tuo account Samply, o la sua eliminazione",
  "Non arriva nessuna notifica, nemmeno dopo aver seguito i passaggi di questa pagina",
  "Problemi con questo sito web",
  "Il supporto Samply non può vedere le tue risposte, non stabilisce il calendario dello studio e non può pagare compensi né assegnare crediti. Per queste domande solo il ricercatore può aiutarti — scrivere prima a Samply non fa che ritardare la tua risposta.",

  "Contattare il tuo ricercatore",
  "Come contatto il ricercatore del mio studio?",
  "Apri l'app Samply Research, tocca lo studio nella schermata principale e scorri fino a **Ricercatore responsabile**. Tocca l'indirizzo email: la tua app di posta apre un messaggio al ricercatore con il nome dello studio e il tuo ID Samply già nell'oggetto, così può trovarti subito.",
  "Anche l'invito che hai ricevuto, la descrizione dello studio e il modulo di consenso di solito contengono i dati di contatto.",
  "Lo studio non mostra dati di contatto. E adesso?",
  "Guarda l'invito che ti ha portato allo studio — un'email, una pagina del corso, un poster o un volantino — e il modulo di consenso. I ricercatori dovrebbero indicare un contatto in almeno uno di questi punti. Se non riesci comunque a trovarlo, scrivi al supporto Samply indicando il nome dello studio esattamente come appare nell'app, e ti aiuteremo a raggiungere il ricercatore.",
  "Cosa devo includere nel mio messaggio?",
  "Il nome dello studio, come appare nell'app.",
  "Il tuo **ID Samply**. I ricercatori vedono questo ID, non il tuo nome o il tuo indirizzo email, quindi senza di esso non possono trovare i tuoi dati.",
  "Cosa è successo, e più o meno quando — per esempio la data e l'ora di una notifica che non è arrivata.",
  "Per problemi con le notifiche: il modello del tuo telefono, e se usa Android o iOS.",
  "Cos'è il mio ID Samply e dove lo trovo?",
  "Il tuo ID Samply è un codice casuale che l'app crea per te. I ricercatori vedono questo codice al posto del tuo nome o del tuo indirizzo email, così le tue risposte restano pseudonime. Lo trovi nell'app in **Altro → Impostazioni** e su questo sito web dopo aver [effettuato l'accesso come partecipante](/participant/login).",
  "Alcuni studi ti assegnano anche un **Codice partecipante**, mostrato nella schermata dello studio nell'app. Se ne hai uno, includilo anche quando scrivi al ricercatore.",

  "Notifiche",
  "Non ricevo notifiche",
  "Nell'app apri **Altro → Verifica delle notifiche**. Controlla ogni passaggio che una notifica attraversa, mostra quale non funziona e propone una soluzione. Le cause più comuni sono:",
  "Le notifiche per Samply sono disattivate nelle impostazioni del telefono.",
  "**Su Android:** l'ottimizzazione della batteria mette l'app in sospensione. Disattivala per Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) mostra i passaggi per il tuo modello di telefono.",
  "**Su iPhone:** una modalità Full immersion o il Riepilogo programmato trattiene le notifiche. Consenti a Samply di inviare le notifiche immediatamente.",
  "Hai reinstallato l'app o sei passato a un nuovo telefono. Accedi di nuovo, poi tocca **Registra di nuovo questo dispositivo** in Verifica delle notifiche.",
  "Se Verifica delle notifiche mostra che è tutto a posto e le notifiche continuano a non arrivare, contatta il ricercatore. Lo studio potrebbe essere in pausa o concluso, oppure semplicemente non prevede invii in questo momento.",
  "Le notifiche arrivano all'ora sbagliata",
  "Se hai viaggiato o il fuso orario del telefono è cambiato, apri **Altro → Impostazioni** e controlla **Fuso orario**. Se il fuso orario salvato e quello attuale sono diversi, tocca **Salva il fuso orario corrente**.",
  "Se il fuso orario è corretto, gli orari fanno parte del disegno dello studio — molti studi inviano notifiche di proposito in momenti casuali della giornata. Chiedi al ricercatore. La fascia oraria preferita che puoi indicare nelle Impostazioni è solo un'informazione per i ricercatori; da sola non blocca le notifiche.",
  "Ricevo troppe notifiche, o voglio che smettano",
  "La frequenza delle notifiche la decide il ricercatore, non Samply, quindi chiedi a lui se il tuo calendario può essere modificato. Per interrompere tutte le notifiche di uno studio, [lascia lo studio](/docs/faq#leave). Anche disattivare le notifiche nelle impostazioni del telefono le interrompe, ma in quel caso lo studio ti registrerà come non rispondente.",
  "Ho perso una notifica. Posso ancora rispondere?",
  "Ogni notifica che hai ricevuto è elencata nella scheda **Cronologia** dell'app, e da lì puoi aprire il questionario. In molti studi i link scadono dopo un certo tempo, perché le risposte date molto più tardi sono meno utili per la ricerca. Se vedi **Il link è scaduto**, il ricercatore ha chiuso quella finestra. Se una notifica persa influisce sul tuo pagamento o sui tuoi crediti lo decide il ricercatore.",

  "Questionari e risposte",
  "Il link del questionario non si apre o mostra un errore",
  "I questionari sono ospitati dallo strumento per questionari del ricercatore — per esempio Qualtrics, SoSci Survey o LimeSurvey — e non da Samply. Riprova con una connessione internet stabile. Se è la pagina del questionario stessa a mostrare un errore, o a dire che il questionario è chiuso, contatta il ricercatore: solo lui può risolvere il problema. Uno screenshot aiuta.",
  "Ho completato un questionario, ma l'app non lo mostra come completato",
  "Samply sa che un questionario è stato completato solo se alla fine il questionario ti rimanda all'app, e non tutti gli studi sono configurati in questo modo. Le tue risposte non sono andate perse — sono salvate nello strumento per questionari del ricercatore. Se il tuo compenso dipende da questo, comunica al ricercatore la data e l'ora in cui hai risposto.",
  "Ho fatto un errore nelle mie risposte",
  "Le tue risposte vanno direttamente allo strumento per questionari del ricercatore, e Samply non può vederle né modificarle. Scrivi al ricercatore indicando la data e l'ora del questionario e cosa vorresti correggere.",

  "Partecipare a uno studio e lasciarlo",
  "Come partecipo a uno studio?",
  "Nell'app tocca **Trova uno studio** e scansiona il codice QR dello studio oppure inserisci il codice dello studio di 8 caratteri presente nel tuo invito. Funziona anche aprire un link di invito sul telefono. Alcuni studi sono elencati anche in **Studi pubblici**.",
  "L'app dice che non è stato trovato nessuno studio per il mio codice",
  "Controlla che il codice non contenga errori di battitura — ha 8 caratteri. Se è corretto, lo studio potrebbe essere già chiuso o non ancora aperto. Il ricercatore può dirti quale dei due casi.",
  "Come lascio uno studio?",
  "Apri lo studio nell'app, scorri fino in fondo e tocca **Lascia lo studio**. L'app ti chiede una conferma, perché l'operazione non può essere annullata. Le notifiche di quello studio si interrompono subito.",
  "Lasciare uno studio interrompe le nuove notifiche, ma non elimina le risposte che hai già dato — quelle le conserva il ricercatore. Se vuoi ritirarle, scrivi al ricercatore e includi il tuo ID Samply.",
  "Quando riceverò il pagamento o i crediti formativi?",
  "Il compenso è organizzato e pagato dal ricercatore, non da Samply. Samply non gestisce pagamenti ai partecipanti e non può vedere se sei stato pagato. Chiedi al ricercatore e includi il tuo ID Samply.",

  "Il tuo account e i tuoi dati",
  "Ho dimenticato la password",
  "Nella schermata di accesso tocca **Hai dimenticato la password?** e inserisci il tuo indirizzo email. Riceverai un link per impostare una nuova password. Se non arriva entro pochi minuti, controlla la cartella dello spam; se non è nemmeno lì, contatta il supporto Samply.",
  "Come cambio il mio indirizzo email?",
  "Nell'app apri **Altro → Impostazioni** e modifica la tua email in **Informazioni account**. Poi esci e accedi di nuovo perché la modifica abbia effetto.",
  "Cosa può vedere di me il ricercatore?",
  "I ricercatori vedono il tuo ID Samply — non il tuo nome, il tuo indirizzo email o il tuo numero di telefono. Vedono quando ti sono state inviate le notifiche e se le hai aperte, e ricevono le tue risposte tramite il loro strumento per questionari. Se uno studio usa la tua posizione per attivare le notifiche, la tua posizione resta sul tuo telefono e non viene condivisa con i ricercatori.",
  "Se scrivi a un ricercatore via email, ovviamente vedrà il tuo indirizzo email. L'[Informativa sulla privacy](/docs/policy) spiega in dettaglio cosa memorizza Samply.",
  "Come elimino il mio account e i miei dati?",
  "Nell'app apri **Altro → Impostazioni**, tocca **Elimina il mio account** e conferma con la tua password. In questo modo il tuo account Samply viene rimosso, vieni tolto da tutti i tuoi studi e vengono cancellati i dati che Samply conserva su di te. L'operazione non può essere annullata.",
  "Eliminare il tuo account Samply non elimina le risposte salvate nello strumento per questionari di un ricercatore — Samply non vi ha accesso. Se vuoi che vengano rimosse anche quelle, scrivi a ciascun ricercatore indicando il tuo ID Samply **prima** di eliminare l'account. Dopo, l'ID non viene più mostrato nell'app.",
  "Posso ottenere una copia dei miei dati?",
  "Sì. [Accedi come partecipante](/participant/login) su questo sito web e scegli **Scarica i miei dati** per ottenere una copia di tutto ciò che Samply conserva su di te. Per una copia delle tue risposte ai questionari, chiedi al ricercatore.",

  "Contattare il supporto Samply",
  "Come contatto il supporto Samply?",
  "Scrivi a [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) oppure apri **Altro → Contatti** nell'app. Indica il modello del tuo telefono, la sua versione di Android o iOS e la versione dell'app mostrata in **Altro → Informazioni**. Di solito rispondiamo entro uno o due giorni lavorativi.",
  "Samply è gestito da un piccolo team dell'Università di Costanza. Non possiamo rispondere a domande su uno studio specifico, e inoltrarle non fa che ritardare la tua risposta — quindi inviale al ricercatore.",
]);
