import { fromStrings } from "./content.ts";

/** French troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "La plupart des problèmes avec Samply relèvent de la configuration, non d'une panne, et presque tous sont visibles avant l'envoi de la première notification. Cette page est classée selon ce que vous remarqueriez, non selon ce qui cloche techniquement.",
  "Si votre étude n'a pas encore commencé, le plus rapide est la **Vérification de la configuration** sur le tableau de bord de l'étude : elle inspecte votre paramétrage et propose une notification de test qui emprunte le circuit d'envoi réel et vous montre le lien du questionnaire exactement tel que le téléphone du participant l'a reçu. Presque tout ce qui suit est détecté par cette seule vérification.",

  "1 · Un participant ne reçoit plus de notifications",
  "C'est le signalement le plus fréquent, et il a plusieurs causes aux solutions très différentes. Parcourez la liste de haut en bas — elle est classée par fréquence à laquelle chaque cause se révèle être la bonne.",

  "Le participant a réinstallé l'application ou changé de téléphone",
  "Ce qui se passe :",
  "le jeton push identifie l'installation de l'application, non la personne. Une réinstallation, une restauration sur un nouvel appareil ou parfois une mise à jour du système génèrent un nouveau jeton ; l'ancien cesse définitivement de fonctionner.",
  "Ce que vous voyez :",
  "la page d'analyse indique « N participant(s) ne peuvent plus recevoir de notifications ». Samply l'apprend des accusés de livraison du service push, généralement dans l'heure suivant l'envoi suivant.",
  "La solution :",
  "le participant ouvre Samply Research et se connecte. L'appareil est alors réenregistré automatiquement. En cas de doute, demandez-lui d'ouvrir l'écran **Vérification des notifications** dans le menu de l'application et de toucher **Réenregistrer cet appareil** — la même réparation, effectuée délibérément.",

  "Android met l'application en veille",
  "Ce qui se passe :",
  "de nombreux fabricants Android ajoutent une gestion agressive de la batterie par-dessus le système. La notification est acceptée par les serveurs de Google, puis retardée ou supprimée par le téléphone lui-même. Samsung, Xiaomi, OnePlus, Huawei, Oppo et Vivo sont les fautifs habituels ; le comportement varie selon le fabricant et la version d'Android.",
  "Ce que vous voyez :",
  "**rien.** C'est le point essentiel. La notification a été acceptée pour livraison, Samply la compte donc comme envoyée et aucun avertissement n'apparaît nulle part. Le seul signal est un participant qui signale des invitations manquantes alors que tous les indicateurs côté serveur paraissent sains.",
  "La solution :",
  "le participant exclut Samply de l'optimisation de la batterie. Les étapes diffèrent selon le fabricant, et [dontkillmyapp.com](https://dontkillmyapp.com/) les documente appareil par appareil — c'est la meilleure référence disponible et il vaut la peine de l'envoyer directement aux participants équipés d'un téléphone Android. L'écran **Vérification des notifications** dans l'application renvoie également aux réglages du téléphone.",
  "Prévention :",
  "mentionnez-le dans vos consignes d'accueil plutôt qu'après coup. Le demander aux participants Android le premier jour coûte une minute ; le demander le cinquième jour signifie que vous avez déjà perdu leurs données.",

  "L'autorisation de notification n'a jamais été accordée, ou a été retirée",
  "Ce qui se passe :",
  "l'application demande l'autorisation au premier lancement. Si le participant refuse — ou désactive plus tard les notifications, ce que certains font en bloc en rangeant leur téléphone —, rien ne peut être livré.",
  "Ce que vous voyez :",
  "si l'autorisation n'a jamais été accordée, le participant n'a pas de jeton push : il apparaît inscrit mais ne reçoit jamais rien. Si elle a été retirée ensuite, le jeton peut continuer de fonctionner un certain temps du point de vue du serveur.",
  "La solution :",
  "**Vérification des notifications** dans le menu de l'application indique directement l'état de l'autorisation et ouvre la bonne page de réglages.",

  "Le participant a rejoint l'étude mais n'a jamais rouvert l'application",
  "Un appareil s'enregistre pour les notifications lorsque l'application s'exécute. Quelqu'un qui rejoint via un lien, ferme ensuite l'application et ne la rouvre jamais peut ne jamais achever l'enregistrement. Sa ligne existe ; son appareil est injoignable.",

  "Modes de concentration iOS, ou le résumé programmé",
  "iOS peut retenir les notifications et les livrer groupées, ou les mettre en sourdine sous un mode de concentration. Les participants ignorent souvent que c'est activé. La notification arrive — mais pas au moment prévu, ce qui, en échantillonnage d'expérience, revient fréquemment à ne pas arriver. Demandez aux participants d'autoriser Samply à livrer immédiatement.",

  "Le téléphone était éteint ou hors ligne au moment de l'envoi",
  "Les services push conservent un message un certain temps et le livrent dès que l'appareil se reconnecte, sans le garantir, et un lien expiré peut ne plus servir à rien d'ici là. Si votre protocole exige qu'une invitation atteigne les personnes dans une fenêtre étroite, définissez une expiration du lien afin que les arrivées tardives ne soient pas traitées hors fenêtre — et attendez-vous à une certaine perte.",

  "2 · L'export du questionnaire ne contient aucun identifiant de participant",
  "C'est le problème le plus dommageable, parce qu'il est silencieux et qu'il se découvre au moment de l'analyse, quand l'étude est déjà terminée.",
  "Il est impossible de reconstituer après coup qui a répondu quoi. Si votre protocole nécessite des analyses individuelles ou multiniveaux, vérifiez-le dès le premier jour avec une notification de test.",

  "Le lien de notification ne contient aucun espace réservé d'identifiant",
  "Ce qui se passe :",
  "sans `%SAMPLY_ID%` dans le lien web, le questionnaire ne reçoit aucun identifiant. Chaque réponse est anonyme et impossible à rattacher.",
  "La solution :",
  "l'éditeur de calendrier vous en avertit désormais pendant la saisie, et la vérification de la configuration le signale. Utilisez l'assistant **Créer ce lien pour moi** plutôt que d'assembler l'URL à la main — il ajoute les bons paramètres avec les noms attendus par votre plateforme.",

  "Le lien est mal formé — un espace réservé en double, ou un second « ? »",
  "Ce qui se passe :",
  "une URL ne peut contenir qu'un seul `?` ; les paramètres suivants se joignent avec `&`. Coller un second `?id=%SAMPLY_ID%` à la fin fait absorber tout ce qui suit par la valeur du paramètre précédent, et le questionnaire enregistre un identifiant tronqué ou aucun.",
  "La solution :",
  "l'enregistrement d'un calendrier comportant un espace réservé en double ou un `?` surnuméraire est désormais bloqué avec un message précis. Si vous modifiez un ancien calendrier, réenregistrez-le pour déclencher la vérification.",

  "L'identifiant arrive, mais votre outil de questionnaire ne le stocke pas",
  "Ce qui se passe :",
  "la plupart des plateformes ignorent les paramètres d'URL inattendus tant que vous ne les déclarez pas. Dans Qualtrics, un champ Embedded Data doit exister dans le Survey Flow avec un nom correspondant *exactement* à la clé de requête, casse comprise. SoSci exige que le paramètre soit enregistré ; LimeSurvey a besoin qu'il soit défini dans l'intégration de panel.",
  "Comment le reconnaître :",
  "c'est le cas où la notification de test de Samply montre l'identifiant présent dans le lien, alors que votre export comporte toujours une colonne vide. Le problème est du côté de l'outil de questionnaire.",
  "La solution :",
  "suivez le [guide d'intégration](/docs/integrations) de votre plateforme, remplissez ensuite une réponse de test et téléchargez l'export pour confirmer que la colonne est renseignée. Attention aux noms de paramètres réservés — chaque outil en a, ils sont listés par plateforme.",

  "Les participants saisissent plutôt un code à la main",
  "Cela fonctionne, mais alourdit chaque invitation et introduit des fautes de frappe et une casse irrégulière qu'il faudra nettoyer. Les vingt minutes nécessaires pour transmettre proprement le paramètre en valent la peine.",

  "3 · Les taux de réponse semblent faux, ou les rappels partent à tout le monde",

  "Les complétions ne sont jamais enregistrées",
  "Ce qui se passe :",
  "Samply ne sait qu'un questionnaire est terminé que si le questionnaire le lui dit. Cela exige deux choses : `%MESSAGE_ID%` dans le lien de notification, et une redirection à la fin de votre questionnaire vers `/studies/<study-code>/done/<message-id>`, l'identifiant de message étant renvoyé avec la syntaxe propre à votre outil.",
  "Ce que vous voyez :",
  "la page d'analyse avertit lorsqu'une étude a envoyé des notifications sans enregistrer la moindre complétion. Cet avertissement apparaît pendant la collecte, pas après.",
  "À savoir également :",
  "certains outils ne peuvent pas rediriger vers une URL externe, et d'autres seulement avec un abonnement payant. Le [tableau de compatibilité](/docs/integrations) indique lesquels.",

  "Les rappels atteignent des personnes ayant déjà répondu",
  "Pourquoi :",
  "les rappels sont annulés automatiquement dès qu'une complétion est enregistrée — mais si le suivi des complétions n'est pas en place, Samply ne peut pas savoir qui a répondu, et chaque rappel part à tout le monde. C'est la même cause profonde que ci-dessus, et elle produit des soumissions en double qu'il faudra dédoublonner à la main.",
  "La solution :",
  "ajoutez `%MESSAGE_ID%` et la redirection de fin de questionnaire. L'étape des rappels dans l'éditeur de calendrier vous avertit lorsqu'ils manquent.",

  "Un participant a répondu, mais apparaît comme non-répondant",
  "Samply compte une notification comme traitée si le participant l'a touchée, l'a ouverte depuis son historique dans l'application, ou si le questionnaire a signalé la complétion. Si rien de tout cela n'a eu lieu — par exemple parce qu'il a copié le lien dans un navigateur de bureau —, la réponse existe dans votre outil mais Samply ne peut pas l'attribuer. Comparez avec votre export avant de considérer le taux de conformité de Samply comme définitif.",

  "4 · Les chiffres de la page d'analyse semblent faux",

  "Les compteurs semblent diminuer avec le temps",
  "Vérifiez le sélecteur de période en haut de la page. **Étude entière** est la valeur par défaut ; une période fixe comme *7 j* est une fenêtre glissante ancrée au présent, si bien que les messages plus anciens sortent du décompte à mesure que l'étude avance. Rien n'est perdu — la fenêtre s'est déplacée. Revenez à **Étude entière** pour des chiffres cumulés.",

  "« Performance des calendriers » n'affiche que « (calendrier non suivi) »",
  "Les notifications envoyées avant mi-2026 ne portaient pas l'identifiant du calendrier qui les a produites et ne peuvent donc pas être attribuées rétroactivement. Les nouveaux envois le sont. Les notifications événementielles et déclenchées par l'API n'ont légitimement aucun calendrier et apparaissent toujours ici.",

  "Les chiffres ne correspondent pas à ceux de mon outil de questionnaire",
  "Ils mesurent des choses différentes, et un certain écart est attendu. Samply compte les notifications et les interactions avec elles ; votre outil compte les soumissions. Les réponses partielles, celles commencées sur un ordinateur et les soumissions en double séparent les deux. Les notifications de test sont exclues des chiffres et de l'export de Samply et n'expliquent donc pas un écart. Pour votre propre analyse, exportez le journal brut des événements depuis la page Historique de l'étude et calculez directement ce dont vous avez besoin.",

  "5 · Aucune notification n'a été envoyée",
  "Vérifiez ces points dans l'ordre :",
  "**L'étude est-elle active ?** Une étude inactive n'envoie rien.",
  "**Quelqu'un a-t-il rejoint l'étude ?** Un calendrier sans destinataires ne produit aucun envoi.",
  "**Le calendrier vise-t-il les bonnes personnes ?** S'il est limité à un groupe dont personne ne fait partie, ou aux participants inscrits au moment de sa création alors que votre cohorte a rejoint ensuite, la file restera vide.",
  "**Vérifiez le fuseau horaire.** Un calendrier réglé sur le mauvais fuseau se déclenche à la mauvaise heure locale — souvent en pleine nuit, ce qui ressemble à de la non-réponse plutôt qu'à une erreur de configuration.",
  "**Regardez la file programmée.** Chaque calendrier se développe en une ligne par participant et par heure d'envoi. Si la file est vide, le calendrier n'a jamais rien produit, et la cause est ci-dessus plutôt que dans la livraison.",

  "6 · Ce qu'il faut dire aux participants",
  "La plupart des problèmes côté participant sont réglés par le participant, non par vous. Il vaut la peine de l'inclure dans votre documentation d'accueil plutôt que de l'envoyer en réaction :",
  "Autorisez les notifications lorsque l'application le demande. Si vous avez refusé, vous pouvez les activer dans les réglages de votre téléphone.",
  "**Sur Android :** désactivez l'optimisation de la batterie pour Samply, sinon le téléphone retardera ou bloquera les invitations. [dontkillmyapp.com](https://dontkillmyapp.com/) donne les étapes pour votre téléphone précis.",
  "Sur iPhone : assurez-vous que Samply est autorisé à livrer immédiatement, et n'est pas retenu dans un résumé programmé ni mis en sourdine par un mode de concentration.",
  "Si vous réinstallez l'application ou changez de téléphone, ouvrez Samply et reconnectez-vous afin que votre appareil soit réenregistré.",
  "Si les invitations cessent d'arriver, ouvrez **Vérification des notifications** dans le menu de l'application. Elle indique exactement quelle étape est rompue et propose une réparation en un geste.",

  "7 · Comment éviter tout cela",
  "Lancez la **Vérification de la configuration** sur le tableau de bord de votre étude et envoyez-vous une notification de test avant de recruter. Le test emprunte le circuit d'envoi ordinaire et rend compte de quatre points : que la notification a été envoyée, que le lien porte l'identifiant du participant, qu'il a été ouvert et que la complétion a été signalée. Une étude qui passe les quatre n'échouera d'aucune des manières décrites sur cette page.",
  "Remplissez ensuite vous-même une réponse complète et **téléchargez l'export**. C'est le seul moyen de confirmer que votre outil de questionnaire enregistre bien l'identifiant, ce que Samply ne peut pas voir de son côté. Cela prend cinq minutes et c'est la chose la plus utile à faire avant de recruter.",
  "Si quelque chose ici ne correspond pas à ce que vous observez, ou si vous rencontrez une panne que cette page ne décrit pas, [contactez-nous](/docs/collaborate) — cette liste s'enrichit des signalements.",
]);
