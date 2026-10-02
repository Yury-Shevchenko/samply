import { fromStrings } from "./content.ts";

/**
 * Spanish participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Spanish strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Esta página es para las personas que participan en un estudio que usa la app **Samply Research**. Samply es la herramienta que entrega las notificaciones de un estudio. El estudio en sí —sus preguntas, su calendario, cualquier pago y tus respuestas— lo lleva a cabo un investigador, normalmente en una universidad. Saber a cuál de los dos preguntar te dará una respuesta mucho más rápido.",

  "¿A quién debo preguntar?",
  "Al investigador que lleva a cabo tu estudio",
  "Cuántas notificaciones recibes, cuándo y durante cuánto tiempo",
  "Preguntas de la encuesta, enlaces de encuesta que no funcionan o errores dentro de una encuesta",
  "Pagos, créditos académicos, vales o cualquier otra compensación",
  "Si una notificación perdida o una respuesta tardía sigue contando",
  "Retirar tus respuestas, o cómo se usan tus respuestas",
  "Cualquier cosa de la descripción del estudio o del formulario de consentimiento",
  "Al soporte de Samply",
  "La app se cierra inesperadamente o no se abre",
  "No puedes registrarte, iniciar sesión o restablecer tu contraseña",
  "Tu cuenta de Samply, o su eliminación",
  "No llega ninguna notificación, ni siquiera después de seguir los pasos de esta página",
  "Problemas con este sitio web",
  "El soporte de Samply no puede ver tus respuestas, no fija el calendario del estudio y no puede pagar compensaciones ni otorgar créditos. Para esas preguntas solo el investigador puede ayudarte: escribir primero a Samply solo retrasa tu respuesta.",

  "Contactar con tu investigador",
  "¿Cómo contacto con el investigador de mi estudio?",
  "Abre la app Samply Research, toca el estudio en tu pantalla de inicio y desplázate hacia abajo hasta **Investigador responsable**. Toca la dirección de correo electrónico: tu app de correo abre un mensaje para el investigador con el nombre del estudio y tu ID de Samply ya incluidos en el asunto, para que pueda encontrarte enseguida.",
  "La invitación que recibiste, la descripción del estudio y el formulario de consentimiento normalmente también incluyen datos de contacto.",
  "El estudio no muestra datos de contacto. ¿Qué hago?",
  "Revisa la invitación que te llevó al estudio —un correo electrónico, la página de un curso, un cartel o un folleto— y el formulario de consentimiento. Se espera que los investigadores indiquen un contacto en al menos uno de esos lugares. Si aun así no encuentras ninguno, escribe al soporte de Samply con el nombre del estudio exactamente como aparece en la app y te ayudaremos a contactar con el investigador.",
  "¿Qué debo incluir en mi mensaje?",
  "El nombre del estudio, tal como aparece en la app.",
  "Tu **ID de Samply**. Los investigadores ven este ID, no tu nombre ni tu dirección de correo electrónico, así que sin él no pueden encontrar tus datos.",
  "Qué ocurrió y, aproximadamente, cuándo; por ejemplo, la fecha y la hora de una notificación que no llegó.",
  "Para problemas con las notificaciones: el modelo de tu teléfono y si usa Android o iOS.",
  "¿Qué es mi ID de Samply y dónde lo encuentro?",
  "Tu ID de Samply es un código aleatorio que la app crea para ti. Los investigadores ven este código en lugar de tu nombre o tu dirección de correo electrónico, lo que mantiene tus respuestas seudonimizadas. Lo encontrarás en la app en **Más → Configuración**, y en este sitio web después de [iniciar sesión como participante](/participant/login).",
  "Algunos estudios también te dan un **Código de participante**, que se muestra en la pantalla del estudio en la app. Si tienes uno, inclúyelo también cuando escribas al investigador.",

  "Notificaciones",
  "No recibo notificaciones",
  "En la app, abre **Más → Comprobación de notificaciones**. Revisa cada paso por el que pasa una notificación, muestra cuál falla y ofrece una solución. Las causas más habituales son:",
  "Las notificaciones de Samply están desactivadas en los ajustes de tu teléfono.",
  "**En Android:** la optimización de batería está poniendo la app a dormir. Desactívala para Samply; [dontkillmyapp.com](https://dontkillmyapp.com/) muestra los pasos para el modelo de tu teléfono.",
  "**En iPhone:** un modo de concentración o el resumen programado está reteniendo las notificaciones. Permite que Samply entregue las notificaciones de inmediato.",
  "Reinstalaste la app o cambiaste de teléfono. Vuelve a iniciar sesión y luego toca **Volver a registrar este dispositivo** en Comprobación de notificaciones.",
  "Si Comprobación de notificaciones muestra que todo está bien y las notificaciones siguen sin llegar, contacta con el investigador. Puede que el estudio esté en pausa o haya terminado, o simplemente que no tenga programado enviar nada en este momento.",
  "Las notificaciones llegan a la hora equivocada",
  "Si has viajado o la zona horaria de tu teléfono ha cambiado, abre **Más → Configuración** y mira **Zona horaria**. Si tu zona horaria guardada y la real no coinciden, toca **Guardar la zona horaria actual**.",
  "Si la zona horaria es correcta, el momento de envío forma parte del diseño del estudio: muchos estudios envían deliberadamente en momentos aleatorios del día. Pregunta al investigador. El periodo de tiempo preferido que puedes indicar en Configuración es solo información para los investigadores; por sí solo no bloquea las notificaciones.",
  "Recibo demasiadas notificaciones, o quiero que paren",
  "La frecuencia de las notificaciones la decide el investigador, no Samply, así que pregúntale si se puede cambiar tu calendario. Para detener todas las notificaciones de un estudio, [abandona el estudio](/docs/faq#leave). Desactivar las notificaciones en los ajustes de tu teléfono también las detiene, pero entonces el estudio te registrará como que no respondes.",
  "Me perdí una notificación. ¿Todavía puedo responder?",
  "Todas las notificaciones que recibiste aparecen en la pestaña **Historial** de la app, y desde ahí puedes abrir la encuesta. Muchos estudios hacen que los enlaces caduquen al cabo de un tiempo, porque las respuestas dadas mucho después son menos útiles para la investigación. Si ves **El enlace ha expirado**, el investigador ha cerrado ese plazo. Si una notificación perdida afecta a tu pago o a tus créditos lo decide el investigador.",

  "Encuestas y respuestas",
  "El enlace de la encuesta no se abre o muestra un error",
  "Las encuestas están alojadas en la propia herramienta de encuestas del investigador —por ejemplo Qualtrics, SoSci Survey o LimeSurvey—, no en Samply. Inténtalo de nuevo con una conexión a internet estable. Si la propia página de la encuesta muestra un error o dice que la encuesta está cerrada, contacta con el investigador: solo él puede solucionarlo. Una captura de pantalla ayuda.",
  "Terminé una encuesta, pero la app no la muestra como completada",
  "Samply solo sabe que una encuesta ha terminado si la encuesta te devuelve a la app al final, y no todos los estudios están configurados así. Tus respuestas no se han perdido: están guardadas en la herramienta de encuestas del investigador. Si tu compensación depende de ello, indica al investigador la fecha y la hora en que respondiste.",
  "Me equivoqué en mis respuestas",
  "Tus respuestas van directamente a la herramienta de encuestas del investigador, y Samply no puede verlas ni cambiarlas. Escribe al investigador indicando la fecha y la hora de la encuesta y lo que te gustaría corregir.",

  "Unirse a un estudio y abandonarlo",
  "¿Cómo me uno a un estudio?",
  "En la app, toca **Encontrar un estudio** y escanea el código QR del estudio o introduce el código de estudio de 8 caracteres de tu invitación. También funciona abrir un enlace de invitación en tu teléfono. Algunos estudios también aparecen en **Estudios públicos**.",
  "La app dice que no se encontró ningún estudio con mi código",
  "Comprueba que el código no tenga errores: tiene 8 caracteres. Si es correcto, puede que el estudio haya cerrado o que aún no haya abierto. El investigador puede decirte cuál de los dos es el caso.",
  "¿Cómo abandono un estudio?",
  "Abre el estudio en la app, desplázate hasta abajo y toca **Abandonar el estudio**. La app te pide que lo confirmes, porque no se puede deshacer. Las notificaciones de ese estudio se detienen de inmediato.",
  "Abandonar un estudio detiene las nuevas notificaciones, pero no elimina las respuestas que ya hayas dado: las tiene el investigador. Si quieres retirarlas, escribe al investigador e incluye tu ID de Samply.",
  "¿Cuándo recibiré mi pago o mis créditos académicos?",
  "La compensación la organiza y la paga el investigador, no Samply. Samply no gestiona pagos a participantes y no puede ver si se te ha pagado. Pregunta al investigador e incluye tu ID de Samply.",

  "Tu cuenta y tus datos",
  "Olvidé mi contraseña",
  "En la pantalla de inicio de sesión, toca **¿Olvidaste tu contraseña?** e introduce tu dirección de correo electrónico. Recibirás un enlace para establecer una nueva contraseña. Si no llega en unos minutos, revisa tu carpeta de spam; si tampoco está ahí, contacta con el soporte de Samply.",
  "¿Cómo cambio mi dirección de correo electrónico?",
  "En la app, abre **Más → Configuración** y edita tu correo electrónico en **Información de la cuenta**. Después, cierra sesión y vuelve a iniciarla para que el cambio surta efecto.",
  "¿Qué puede ver el investigador sobre mí?",
  "Los investigadores ven tu ID de Samply, no tu nombre, tu dirección de correo electrónico ni tu número de teléfono. Ven cuándo se te enviaron notificaciones y si las abriste, y reciben tus respuestas a través de su propia herramienta de encuestas. Si un estudio usa tu ubicación para activar notificaciones, tu ubicación se queda en tu teléfono y no se comparte con los investigadores.",
  "Si escribes a un investigador por correo electrónico, por supuesto verá tu dirección de correo. La [Política de privacidad](/docs/policy) explica en detalle qué guarda Samply.",
  "¿Cómo elimino mi cuenta y mis datos?",
  "En la app, abre **Más → Configuración**, toca **Eliminar mi cuenta** y confirma con tu contraseña. Esto elimina tu cuenta de Samply, te saca de todos tus estudios y borra los registros que Samply tiene sobre ti. No se puede deshacer.",
  "Eliminar tu cuenta de Samply no elimina las respuestas guardadas en la herramienta de encuestas de un investigador: Samply no tiene acceso a ellas. Si también quieres que se borren, escribe a cada investigador con tu ID de Samply **antes** de eliminar tu cuenta. Después, el ID ya no se muestra en la app.",
  "¿Puedo obtener una copia de mis datos?",
  "Sí. [Inicia sesión como participante](/participant/login) en este sitio web y elige **Descargar mis datos** para obtener una copia de todo lo que Samply tiene sobre ti. Para obtener una copia de tus respuestas a las encuestas, pregunta al investigador.",

  "Contactar con el soporte de Samply",
  "¿Cómo contacto con el soporte de Samply?",
  "Escribe a [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) o abre **Más → Contacto** en la app. Incluye el modelo de tu teléfono, su versión de Android o iOS y la versión de la app que aparece en **Más → Acerca de**. Las respuestas suelen tardar uno o dos días laborables.",
  "Samply lo gestiona un pequeño equipo de la Universidad de Constanza. No podemos responder preguntas sobre un estudio concreto, y reenviarlas solo retrasa tu respuesta, así que envíalas al investigador.",
]);
