import { fromStrings } from "./content.ts";

/**
 * French participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * French strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Cette page s'adresse aux personnes qui participent à une étude utilisant l'application **Samply Research**. Samply est l'outil qui envoie les notifications d'une étude. L'étude elle-même — ses questions, son calendrier, une éventuelle rémunération et vos réponses — est menée par un chercheur, généralement dans une université. Savoir auquel des deux vous adresser vous permet d'obtenir une réponse bien plus rapidement.",

  "À qui dois-je m'adresser ?",
  "Le chercheur qui mène votre étude",
  "Le nombre de notifications que vous recevez, à quel moment et pendant combien de temps",
  "Les questions du questionnaire, les liens de questionnaire qui ne fonctionnent pas ou les erreurs à l'intérieur d'un questionnaire",
  "Le paiement, les crédits de cours, les bons d'achat ou toute autre compensation",
  "Le fait de savoir si une notification manquée ou une réponse tardive compte quand même",
  "Le retrait de vos réponses, ou la manière dont vos réponses sont utilisées",
  "Tout ce qui figure dans la description de l'étude ou le formulaire de consentement",
  "Le support Samply",
  "L'application plante ou ne s'ouvre pas",
  "Vous ne parvenez pas à créer un compte, à vous connecter ou à réinitialiser votre mot de passe",
  "Votre compte Samply, ou sa suppression",
  "Aucune notification n'arrive, même après avoir suivi les étapes de cette page",
  "Les problèmes avec ce site web",
  "Le support Samply ne peut pas voir vos réponses, ne définit pas le calendrier de l'étude et ne peut ni verser de compensation ni attribuer de crédits. Pour ces questions, seul le chercheur peut vous aider — écrire d'abord à Samply ne fait que retarder votre réponse.",

  "Contacter votre chercheur",
  "Comment contacter le chercheur de mon étude ?",
  "Ouvrez l'application Samply Research, touchez l'étude sur votre écran d'accueil et faites défiler jusqu'à **Chercheur responsable**. Touchez l'adresse e-mail : votre application de messagerie ouvre un message destiné au chercheur, avec le nom de l'étude et votre identifiant Samply déjà indiqués dans l'objet, afin qu'il puisse vous retrouver immédiatement.",
  "L'invitation que vous avez reçue, la description de l'étude et le formulaire de consentement contiennent généralement aussi des coordonnées.",
  "L'étude n'affiche aucune coordonnée. Que faire ?",
  "Consultez l'invitation qui vous a amené à l'étude — un e-mail, une page de cours, une affiche ou un prospectus — ainsi que le formulaire de consentement. Les chercheurs sont censés indiquer un contact à au moins un de ces endroits. Si vous n'en trouvez toujours pas, écrivez au support Samply en indiquant le nom de l'étude exactement tel qu'il apparaît dans l'application, et nous vous aiderons à joindre le chercheur.",
  "Que dois-je indiquer dans mon message ?",
  "Le nom de l'étude, tel qu'il apparaît dans l'application.",
  "Votre **Identifiant Samply**. Les chercheurs voient cet identifiant, et non votre nom ou votre adresse e-mail ; sans lui, ils ne peuvent donc pas retrouver vos données.",
  "Ce qui s'est passé, et à peu près quand — par exemple la date et l'heure d'une notification qui n'est pas arrivée.",
  "Pour les problèmes de notifications : le modèle de votre téléphone, et s'il fonctionne sous Android ou iOS.",
  "Qu'est-ce que mon identifiant Samply, et où le trouver ?",
  "Votre identifiant Samply est un code aléatoire que l'application crée pour vous. Les chercheurs voient ce code à la place de votre nom ou de votre adresse e-mail, ce qui garde vos réponses pseudonymes. Vous le trouvez dans l'application sous **Plus → Paramètres**, et sur ce site web après vous être [connecté en tant que participant](/participant/login).",
  "Certaines études vous attribuent aussi un **Code participant**, affiché sur l'écran de l'étude dans l'application. Si vous en avez un, indiquez-le également lorsque vous écrivez au chercheur.",

  "Notifications",
  "Je ne reçois pas de notifications",
  "Dans l'application, ouvrez **Plus → Vérification des notifications**. Elle contrôle chaque étape par laquelle passe une notification, indique celle qui ne fonctionne pas et propose une solution. Les causes les plus fréquentes sont :",
  "Les notifications de Samply sont désactivées dans les réglages de votre téléphone.",
  "**Sur Android :** l'optimisation de la batterie met l'application en veille. Désactivez-la pour Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) montre les étapes pour votre modèle de téléphone.",
  "**Sur iPhone :** un mode Concentration ou le Résumé programmé retient les notifications. Autorisez Samply à envoyer les notifications immédiatement.",
  "Vous avez réinstallé l'application ou changé de téléphone. Reconnectez-vous, puis touchez **Réenregistrer cet appareil** dans Vérification des notifications.",
  "Si Vérification des notifications indique que tout est en ordre et que les notifications n'arrivent toujours pas, contactez le chercheur. L'étude est peut-être en pause ou terminée, ou simplement aucun envoi n'est prévu pour le moment.",
  "Les notifications arrivent au mauvais moment",
  "Si vous avez voyagé ou si le fuseau horaire de votre téléphone a changé, ouvrez **Plus → Paramètres** et regardez **Fuseau horaire**. Si le fuseau horaire enregistré et le fuseau horaire actuel diffèrent, touchez **Enregistrer le fuseau horaire actuel**.",
  "Si le fuseau horaire est correct, le moment d'envoi fait partie de la conception de l'étude — de nombreuses études envoient volontairement des notifications à des moments aléatoires de la journée. Demandez au chercheur. La plage horaire préférée que vous pouvez indiquer dans les Paramètres est une information destinée uniquement aux chercheurs ; elle ne bloque pas les notifications à elle seule.",
  "Je reçois trop de notifications, ou je veux qu'elles s'arrêtent",
  "La fréquence de vos notifications est décidée par le chercheur, et non par Samply ; demandez-lui donc si votre calendrier peut être modifié. Pour arrêter toutes les notifications d'une étude, [quittez l'étude](/docs/faq#leave). Désactiver les notifications dans les réglages de votre téléphone les arrête aussi, mais l'étude vous enregistrera alors comme ne répondant pas.",
  "J'ai manqué une notification. Puis-je encore répondre ?",
  "Chaque notification que vous avez reçue figure dans l'onglet **Historique** de l'application, et vous pouvez ouvrir le questionnaire à partir de là. Dans de nombreuses études, les liens expirent au bout d'un certain temps, car des réponses données beaucoup plus tard sont moins utiles pour la recherche. Si vous voyez **Le lien a expiré**, le chercheur a fermé ce créneau. C'est au chercheur de décider si une notification manquée a une incidence sur votre paiement ou vos crédits.",

  "Questionnaires et réponses",
  "Le lien du questionnaire ne s'ouvre pas, ou affiche une erreur",
  "Les questionnaires sont hébergés par l'outil de questionnaire du chercheur — par exemple Qualtrics, SoSci Survey ou LimeSurvey — et non par Samply. Réessayez avec une connexion internet stable. Si la page du questionnaire elle-même affiche une erreur ou indique que le questionnaire est fermé, contactez le chercheur : lui seul peut régler le problème. Une capture d'écran est utile.",
  "J'ai terminé un questionnaire, mais l'application ne l'affiche pas comme terminé",
  "Samply ne sait qu'un questionnaire est terminé que si celui-ci vous renvoie vers l'application à la fin, et toutes les études ne sont pas configurées ainsi. Vos réponses ne sont pas perdues — elles sont enregistrées dans l'outil de questionnaire du chercheur. Si votre compensation en dépend, indiquez au chercheur la date et l'heure auxquelles vous avez répondu.",
  "J'ai fait une erreur dans mes réponses",
  "Vos réponses vont directement dans l'outil de questionnaire du chercheur, et Samply ne peut ni les voir ni les modifier. Écrivez au chercheur en indiquant la date et l'heure du questionnaire et ce que vous souhaitez corriger.",

  "Rejoindre et quitter une étude",
  "Comment rejoindre une étude ?",
  "Dans l'application, touchez **Trouver une étude**, puis scannez le code QR de l'étude ou saisissez le code d'étude à 8 caractères figurant dans votre invitation. Vous pouvez aussi ouvrir un lien d'invitation sur votre téléphone. Certaines études sont également répertoriées sous **Études publiques**.",
  "L'application indique qu'aucune étude n'a été trouvée pour mon code",
  "Vérifiez que le code ne contient pas de faute de frappe — il comporte 8 caractères. S'il est correct, l'étude est peut-être déjà fermée ou pas encore ouverte. Le chercheur pourra vous dire ce qu'il en est.",
  "Comment quitter une étude ?",
  "Ouvrez l'étude dans l'application, faites défiler jusqu'en bas et touchez **Quitter l'étude**. L'application vous demande de confirmer, car cette action est irréversible. Les notifications de cette étude s'arrêtent immédiatement.",
  "Quitter une étude arrête les nouvelles notifications, mais ne supprime pas les réponses que vous avez déjà données — c'est le chercheur qui les détient. Si vous souhaitez les retirer, écrivez au chercheur en indiquant votre identifiant Samply.",
  "Quand vais-je recevoir mon paiement ou mes crédits de cours ?",
  "La compensation est organisée et versée par le chercheur, et non par Samply. Samply ne gère pas les paiements aux participants et ne peut pas voir si vous avez été payé. Demandez au chercheur, en indiquant votre identifiant Samply.",

  "Votre compte et vos données",
  "J'ai oublié mon mot de passe",
  "Sur l'écran de connexion, touchez **Mot de passe oublié ?** et saisissez votre adresse e-mail. Vous recevrez un lien pour définir un nouveau mot de passe. S'il n'arrive pas dans les minutes qui suivent, vérifiez votre dossier de spam ; s'il n'y est pas non plus, contactez le support Samply.",
  "Comment changer mon adresse e-mail ?",
  "Dans l'application, ouvrez **Plus → Paramètres** et modifiez votre adresse e-mail sous **Informations du compte**. Déconnectez-vous puis reconnectez-vous ensuite pour que la modification prenne effet.",
  "Que peut voir le chercheur à mon sujet ?",
  "Les chercheurs voient votre identifiant Samply — et non votre nom, votre adresse e-mail ou votre numéro de téléphone. Ils voient quand des notifications vous ont été envoyées et si vous les avez ouvertes, et ils reçoivent vos réponses via leur propre outil de questionnaire. Si une étude utilise votre position pour déclencher des notifications, votre position reste sur votre téléphone et n'est pas partagée avec les chercheurs.",
  "Si vous écrivez à un chercheur par e-mail, il verra bien sûr votre adresse e-mail. La [Politique de confidentialité](/docs/policy) explique en détail ce que Samply enregistre.",
  "Comment supprimer mon compte et mes données ?",
  "Dans l'application, ouvrez **Plus → Paramètres**, touchez **Supprimer mon compte** et confirmez avec votre mot de passe. Cela supprime votre compte Samply, vous retire de toutes vos études et efface les données que Samply détient sur vous. Cette action est irréversible.",
  "Supprimer votre compte Samply ne supprime pas les réponses enregistrées dans l'outil de questionnaire d'un chercheur — Samply n'y a pas accès. Si vous souhaitez qu'elles soient également supprimées, écrivez à chaque chercheur en indiquant votre identifiant Samply **avant** de supprimer votre compte. Ensuite, l'identifiant n'est plus affiché dans l'application.",
  "Puis-je obtenir une copie de mes données ?",
  "Oui. [Connectez-vous en tant que participant](/participant/login) sur ce site web et choisissez **Télécharger mes données** pour obtenir une copie de tout ce que Samply détient sur vous. Pour une copie de vos réponses aux questionnaires, adressez-vous au chercheur.",

  "Contacter le support Samply",
  "Comment contacter le support Samply ?",
  "Écrivez à [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn), ou ouvrez **Plus → Contact** dans l'application. Merci d'indiquer le modèle de votre téléphone, sa version d'Android ou d'iOS, et la version de l'application affichée sous **Plus → À propos**. Les réponses prennent généralement un à deux jours ouvrables.",
  "Samply est géré par une petite équipe de l'Université de Constance. Nous ne pouvons pas répondre aux questions concernant une étude en particulier, et les transférer ne fait que retarder votre réponse — merci donc de les adresser au chercheur.",
]);
