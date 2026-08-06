import { fromStrings } from "./content.ts";

/** Spanish troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "La mayoría de los problemas de Samply son de configuración, no fallos, y casi todos son visibles antes de que salga la primera notificación. Esta página está ordenada según lo que usted notaría, no según lo que técnicamente falla.",
  "Si su estudio aún no ha comenzado, la vía más rápida es la **Comprobación de configuración** en el panel del estudio: revisa su configuración y ofrece una notificación de prueba que recorre el circuito de envío real y le muestra el enlace de la encuesta exactamente como lo recibió el teléfono del participante. Casi todo lo que sigue se detecta con esa única comprobación.",

  "1 · Un participante ha dejado de recibir notificaciones",
  "Es el aviso más frecuente y tiene varias causas con soluciones muy distintas. Recorra la lista de arriba abajo — está ordenada según la frecuencia con que cada causa resulta ser la correcta.",

  "El participante reinstaló la aplicación o cambió de teléfono",
  "Qué ocurre:",
  "el token push identifica la instalación de la aplicación, no a la persona. Reinstalar, restaurar en un dispositivo nuevo o, en algunos casos, actualizar el sistema genera un token nuevo, y el antiguo deja de funcionar de forma permanente.",
  "Qué ve usted:",
  "la página de analíticas indica «N participante(s) ya no pueden recibir notificaciones». Samply lo deduce de los acuses de entrega del servicio push, normalmente en la hora siguiente al próximo envío.",
  "La solución:",
  "el participante abre Samply Research e inicia sesión. Con eso el dispositivo se vuelve a registrar automáticamente. Si tiene dudas, pídale que abra la pantalla **Comprobación de notificaciones** en el menú de la aplicación y pulse **Volver a registrar este dispositivo** — la misma reparación, hecha a propósito.",

  "Android está durmiendo la aplicación",
  "Qué ocurre:",
  "muchos fabricantes de Android añaden una gestión agresiva de la batería sobre el sistema. El push lo aceptan los servidores de Google y luego el propio teléfono lo retrasa o lo descarta. Samsung, Xiaomi, OnePlus, Huawei, Oppo y Vivo son los responsables habituales; el comportamiento varía según el fabricante y la versión de Android.",
  "Qué ve usted:",
  "**nada.** Este es el punto importante. La notificación se aceptó para su entrega, así que Samply la cuenta como enviada y no aparece ninguna advertencia en ningún sitio. La única señal es un participante que informa de avisos ausentes mientras todos los indicadores del servidor parecen sanos.",
  "La solución:",
  "el participante excluye Samply de la optimización de batería. Los pasos difieren según el fabricante, y [dontkillmyapp.com](https://dontkillmyapp.com/) los documenta dispositivo por dispositivo — es la mejor referencia disponible y merece la pena enviarla directamente a los participantes con teléfonos Android. La pantalla **Comprobación de notificaciones** de la aplicación también enlaza a los ajustes del teléfono.",
  "Prevención:",
  "menciónelo en sus instrucciones iniciales en lugar de después. Pedírselo a los participantes de Android el primer día cuesta un minuto; pedírselo el quinto significa que ya ha perdido sus datos.",

  "El permiso de notificaciones nunca se concedió, o se revocó",
  "Qué ocurre:",
  "la aplicación pide permiso en el primer arranque. Si el participante lo rechaza — o desactiva después las notificaciones, algo que algunas personas hacen en bloque al ordenar el teléfono —, no se puede entregar nada.",
  "Qué ve usted:",
  "si nunca se concedió el permiso, el participante no tiene token push: figura inscrito pero nunca recibe nada. Si se revocó más tarde, desde el punto de vista del servidor el token puede seguir funcionando un tiempo.",
  "La solución:",
  "**Comprobación de notificaciones** en el menú de la aplicación muestra directamente el estado del permiso y abre la página de ajustes adecuada.",

  "El participante se unió pero nunca volvió a abrir la aplicación",
  "Un dispositivo se registra para notificaciones mientras la aplicación se ejecuta. Quien se une mediante un enlace, cierra después la aplicación y no la vuelve a abrir puede no completar nunca el registro. Su fila existe; su dispositivo es inalcanzable.",

  "Modos de concentración de iOS, o el resumen programado",
  "iOS puede retener notificaciones y entregarlas agrupadas, o silenciarlas bajo un modo de concentración. A menudo los participantes no saben que está activo. La notificación llega — solo que no cuando usted la programó, lo que en muestreo de experiencias equivale con frecuencia a no llegar. Pida a los participantes que permitan a Samply entregar de inmediato.",

  "El teléfono estaba apagado o sin conexión al enviarse",
  "Los servicios push retienen un mensaje un tiempo y lo entregan cuando el dispositivo se reconecta, pero no lo garantizan, y para entonces un enlace caducado puede ya no servir. Si su diseño depende de que un aviso llegue dentro de una ventana estrecha, fije una caducidad del enlace para que las llegadas tardías no se respondan fuera de ventana — y cuente con alguna pérdida.",

  "2 · La exportación de la encuesta no tiene identificador de participante",
  "Es lo más dañino que puede ocurrir, porque es silencioso y se descubre durante el análisis, cuando el estudio ya ha terminado.",
  "No hay forma de reconstruir después quién respondió qué. Si su diseño requiere análisis a nivel de persona o multinivel, verifíquelo el primer día con una notificación de prueba.",

  "El enlace de notificación no lleva marcador de ID",
  "Qué ocurre:",
  "sin `%SAMPLY_ID%` en el enlace web, la encuesta no recibe ningún identificador. Cada respuesta es anónima e imposible de vincular.",
  "La solución:",
  "el editor de programaciones ya avisa mientras escribe, y la comprobación de configuración lo informa. Use el asistente **Crear este enlace por mí** en lugar de montar la URL a mano — añade los parámetros correctos con los nombres que espera su plataforma.",

  "El enlace está mal formado — un marcador duplicado o un segundo «?»",
  "Qué ocurre:",
  "una URL solo puede contener un `?`; los demás parámetros se unen con `&`. Pegar un segundo `?id=%SAMPLY_ID%` al final hace que el valor del parámetro anterior se trague todo lo que sigue, y la encuesta guarda un identificador corrupto o ninguno.",
  "La solución:",
  "guardar una programación con un marcador duplicado o un `?` sobrante ahora se bloquea con un mensaje concreto. Si edita una programación antigua, vuelva a guardarla para ejecutar la comprobación.",

  "El ID llega, pero su herramienta de encuestas no lo guarda",
  "Qué ocurre:",
  "la mayoría de plataformas ignoran los parámetros de URL inesperados salvo que los declare. En Qualtrics debe existir un campo Embedded Data en el Survey Flow con un nombre que coincida *exactamente* con la clave de consulta, incluidas mayúsculas. SoSci exige que el parámetro esté registrado; LimeSurvey lo necesita definido en la integración de panel.",
  "Cómo distinguirlo:",
  "es el caso en que la notificación de prueba de Samply muestra el ID presente en el enlace, pero su exportación sigue teniendo una columna vacía. El problema está del lado de la herramienta de encuestas.",
  "La solución:",
  "siga la [guía de integración](/docs/integrations) de su plataforma, complete después una respuesta de prueba y descargue la exportación para confirmar que la columna está rellena. Atención a los nombres de parámetro reservados — cada herramienta tiene algunos y están listados por plataforma.",

  "Los participantes escriben un código a mano en su lugar",
  "Funciona, pero añade carga en cada aviso e introduce erratas y mayúsculas inconsistentes que tendrá que limpiar. Merece la pena dedicar veinte minutos a pasar el parámetro correctamente.",

  "3 · Las tasas de respuesta parecen erróneas, o los recordatorios llegan a todos",

  "Las finalizaciones nunca se registran",
  "Qué ocurre:",
  "Samply solo sabe que una encuesta ha terminado si la encuesta se lo dice. Eso requiere dos cosas: `%MESSAGE_ID%` en el enlace de la notificación y una redirección al final de su encuesta de vuelta a `/studies/<study-code>/done/<message-id>`, devolviendo el id del mensaje con la sintaxis propia de su herramienta.",
  "Qué ve usted:",
  "la página de analíticas avisa cuando un estudio ha enviado notificaciones pero no ha registrado ninguna finalización. Ese aviso aparece durante la recogida, no después.",
  "También conviene saber:",
  "algunas herramientas no pueden redirigir a una URL externa en absoluto, y otras solo en planes de pago. La [tabla de compatibilidad](/docs/integrations) indica cuáles.",

  "Los recordatorios llegan a personas que ya respondieron",
  "Por qué:",
  "los recordatorios se cancelan automáticamente en cuanto se registra una finalización — pero si el seguimiento de finalizaciones no está configurado, Samply no puede saber quién ha respondido y cada recordatorio va a todos. Es la misma causa de fondo que la anterior y produce envíos duplicados que tendrá que depurar a mano.",
  "La solución:",
  "añada `%MESSAGE_ID%` y la redirección de fin de encuesta. El paso de recordatorios en el editor de programaciones le avisa cuando faltan.",

  "Un participante respondió, pero figura como no respondiente",
  "Samply cuenta una notificación como atendida si el participante la tocó, la abrió desde su historial en la aplicación, o la encuesta informó de la finalización. Si no ocurrió nada de eso — por ejemplo porque copió el enlace a un navegador de escritorio —, la respuesta existe en su herramienta pero Samply no puede atribuirla. Compare con su exportación antes de dar por definitiva la cifra de cumplimiento de Samply.",

  "4 · Los números de la página de analíticas parecen erróneos",

  "Los recuentos parecen bajar con el tiempo",
  "Revise el selector de periodo en la parte superior de la página. **Estudio completo** es el valor por defecto; un periodo fijo como *7 d* es una ventana móvil anclada al presente, así que los mensajes más antiguos salen del recuento a medida que avanza el estudio. No se pierde nada — la ventana se ha desplazado. Vuelva a **Estudio completo** para cifras acumuladas.",

  "«Rendimiento de programaciones» solo muestra «(programación sin seguimiento)»",
  "Las notificaciones enviadas antes de mediados de 2026 no llevaban la marca de la programación que las produjo, así que no pueden atribuirse retroactivamente. Las nuevas sí. Las notificaciones por evento y las activadas por la API legítimamente no tienen programación y siempre aparecen aquí.",

  "Los números no coinciden con los de mi herramienta de encuestas",
  "Miden cosas distintas y cierta divergencia es esperable. Samply cuenta notificaciones e interacciones con ellas; su herramienta cuenta envíos. Las respuestas parciales, las iniciadas en un ordenador y los envíos duplicados separan ambas cifras. Las notificaciones de prueba quedan excluidas de las cifras y de la exportación de Samply, así que no explican una diferencia. Para su propio análisis, exporte el registro bruto de eventos desde la página Historial del estudio y calcule directamente lo que necesite.",

  "5 · No se envió ninguna notificación",
  "Compruebe esto en orden:",
  "**¿Está activo el estudio?** Un estudio inactivo no envía nada.",
  "**¿Se ha unido alguien?** Una programación sin destinatarios no produce envíos.",
  "**¿La programación apunta a las personas correctas?** Si está limitada a un grupo en el que no hay nadie, o a los participantes inscritos en el momento de crearla mientras su cohorte se unió después, la cola quedará vacía.",
  "**Revise la zona horaria.** Una programación con la zona horaria equivocada se dispara a la hora local equivocada — a menudo en mitad de la noche, lo que parece falta de respuesta en vez de un error de configuración.",
  "**Mire la cola programada.** Cada programación se despliega en una fila por participante y hora de envío. Si la cola está vacía, la programación nunca produjo nada y la causa está más arriba, no en la entrega.",

  "6 · Qué decir a los participantes",
  "La mayoría de los problemas del lado del participante los resuelve el propio participante, no usted. Merece la pena incluirlo en su material de bienvenida en vez de enviarlo como reacción:",
  "Permita las notificaciones cuando la aplicación se lo pida. Si las rechazó, puede activarlas en los ajustes de su teléfono.",
  "**En Android:** desactive la optimización de batería para Samply, o el teléfono retrasará o bloqueará los avisos. [dontkillmyapp.com](https://dontkillmyapp.com/) tiene los pasos para su teléfono concreto.",
  "En iPhone: asegúrese de que Samply puede entregar de inmediato y no queda retenida en un resumen programado ni silenciada por un modo de concentración.",
  "Si reinstala la aplicación o cambia de teléfono, abra Samply e inicie sesión de nuevo para que su dispositivo vuelva a registrarse.",
  "Si dejan de llegar avisos, abra **Comprobación de notificaciones** en el menú de la aplicación. Muestra exactamente qué paso está roto y ofrece una reparación con un toque.",

  "7 · Cómo evitar todo esto",
  "Ejecute la **Comprobación de configuración** en el panel de su estudio y envíese una notificación de prueba antes de reclutar. La prueba recorre el circuito de envío habitual e informa de cuatro cosas: que la notificación se envió, que el enlace lleva el identificador del participante, que se abrió y que se comunicó la finalización. Un estudio que supere las cuatro no fallará de ninguna de las formas descritas en esta página.",
  "Después complete usted mismo una respuesta entera y **descargue la exportación**. Es la única manera de confirmar que su herramienta guarda realmente el identificador, algo que Samply no puede ver desde su lado. Lleva cinco minutos y es lo más valioso que puede hacer antes de reclutar.",
  "Si algo aquí no coincide con lo que observa, o se topa con un fallo que esta página no describe, [escríbanos](/docs/collaborate) — la lista crece con los avisos recibidos.",
]);
