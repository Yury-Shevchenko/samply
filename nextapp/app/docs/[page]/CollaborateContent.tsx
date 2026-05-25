import type { Locale } from "@/lib/i18n";

const CONTACT_EMAIL = "yury.shevchenko@uni-konstanz.de";

function CalloutMail({ label = "get in touch" }: { label?: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderLeft: "3px solid var(--coral)",
        borderRadius: "0.6rem",
        padding: "1.6rem 2rem",
        margin: "2rem 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--ink-40)",
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </div>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=Samply%20collaboration`}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.8rem",
          fontWeight: 600,
          color: "var(--coral)",
          textDecoration: "none",
          letterSpacing: "-0.01em",
          wordBreak: "break-all",
        }}
        className="hover:opacity-70 transition-opacity"
      >
        {CONTACT_EMAIL} →
      </a>
    </div>
  );
}

function En() {
  return (
    <>
      <p>
        Samply is built and maintained by Yury Shevchenko at the iScience lab
        in Konstanz. It&rsquo;s open-source, free for academic use, and quietly
        in production across dozens of research groups. The roadmap, however,
        is informal — features get built when a study actually needs them, and
        the platform improves fastest when researchers and developers work
        together rather than in parallel.
      </p>

      <p>
        If you&rsquo;re running an ESM study on Samply and you have an idea,
        a methodological problem, or a feature you wish existed, I&rsquo;d
        like to hear it. In return for help running your study or building the
        feature you need, I&rsquo;m open to <strong>co-authorship</strong> on
        the resulting paper. The aim is genuine collaboration: shared
        questions, shared credit, shared work.
      </p>

      <h2>What this can look like</h2>
      <dl>
        <dt>Methodological co-design.</dt>
        <dd>
          You&rsquo;re designing a protocol and want a second set of eyes on
          timing, compliance constraints, or analytic plan. I&rsquo;ll engage
          with the design before data collection starts and stay involved
          through analysis and writing.
        </dd>
        <dt>Custom feature development.</dt>
        <dd>
          Your study needs something Samply doesn&rsquo;t currently do —
          adaptive scheduling, a new trigger type, a specific export format,
          integration with a sensor stream. If it generalises to other
          studies, I&rsquo;ll build it into Samply directly. Co-authorship
          covers the methodological framing of why the feature matters.
        </dd>
        <dt>Implementation &amp; operations support.</dt>
        <dd>
          Hands-on help configuring schedules, debugging delivery, exporting
          and cleaning data, drafting the methods section. Particularly useful
          for first-time ESM teams.
        </dd>
        <dt>Replication and secondary analysis.</dt>
        <dd>
          You have Samply data and an interesting question that needs a
          methodologist on the author line. Let&rsquo;s talk.
        </dd>
      </dl>

      <h2>What I&rsquo;m not offering</h2>
      <p>
        Paid consulting, project-management-only roles, ghost-authoring, or
        services in exchange for citation alone. Co-authorship implies a
        substantive intellectual contribution on both sides — that&rsquo;s the
        bar, in both directions.
      </p>

      <h2>How to start the conversation</h2>
      <p>
        Send a short email — two or three paragraphs — covering: who you are,
        the rough shape of the study or feature, what stage you&rsquo;re at,
        and what you&rsquo;d most want help with. I&rsquo;ll reply within a
        week, usually with either a yes and a calendar link, a no with
        suggestions for alternatives, or a small set of follow-up questions.
      </p>

      <CalloutMail />

      <p>
        Pull requests, bug reports, and feature ideas with no collaboration
        framing are also welcome — see{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          the GitHub repository
        </a>
        . You don&rsquo;t need to email first for those.
      </p>
    </>
  );
}

function De() {
  return (
    <>
      <p>
        Samply wird von Yury Shevchenko am iScience-Lab in Konstanz entwickelt
        und gepflegt. Es ist Open Source, kostenlos für akademische Nutzung
        und still in dutzenden Forschungsgruppen im Einsatz. Die Roadmap ist
        jedoch informell — Funktionen entstehen dann, wenn eine Studie sie
        wirklich braucht, und die Plattform verbessert sich am schnellsten,
        wenn Forschende und Entwickelnde miteinander statt nebeneinander
        arbeiten.
      </p>

      <p>
        Wenn Sie eine ESM-Studie mit Samply durchführen und eine Idee, ein
        methodisches Problem oder eine Funktion vermissen, die es noch nicht
        gibt, würde ich davon gern hören. Im Gegenzug für Mithilfe bei Ihrer
        Studie oder für das Entwickeln der benötigten Funktion bin ich offen
        für <strong>Co-Autorenschaft</strong> bei der daraus entstehenden
        Publikation. Ziel ist echte Zusammenarbeit: gemeinsame Fragen,
        gemeinsame Anerkennung, gemeinsame Arbeit.
      </p>

      <h2>Wie das aussehen kann</h2>
      <dl>
        <dt>Methodisches Co-Design.</dt>
        <dd>
          Sie entwerfen ein Protokoll und möchten ein zweites Paar Augen auf
          Timing, Compliance-Einschränkungen oder Analyseplan. Ich steige vor
          dem Beginn der Datenerhebung mit ein und bleibe bis Analyse und
          Schreiben dabei.
        </dd>
        <dt>Maßgeschneiderte Funktionsentwicklung.</dt>
        <dd>
          Ihre Studie braucht etwas, das Samply derzeit nicht kann — adaptive
          Zeitplanung, ein neuer Trigger-Typ, ein spezielles Exportformat,
          Integration mit einem Sensorstrom. Wenn es sich auf andere Studien
          verallgemeinern lässt, baue ich es direkt in Samply ein.
          Co-Autorenschaft deckt die methodische Einordnung ab, warum die
          Funktion wichtig ist.
        </dd>
        <dt>Umsetzungs- und Betriebsunterstützung.</dt>
        <dd>
          Konkrete Hilfe beim Konfigurieren von Zeitplänen, beim Debuggen der
          Zustellung, beim Exportieren und Bereinigen von Daten, beim
          Verfassen des Methodenabschnitts. Besonders nützlich für Teams,
          die zum ersten Mal ESM durchführen.
        </dd>
        <dt>Replikation und Sekundäranalyse.</dt>
        <dd>
          Sie haben Samply-Daten und eine interessante Frage, die einen
          Methodiker in der Autorenzeile braucht. Lassen Sie uns reden.
        </dd>
      </dl>

      <h2>Was ich nicht anbiete</h2>
      <p>
        Bezahlte Beratung, reine Projektmanagementrollen, Ghost-Authoring oder
        Dienstleistungen ausschließlich gegen Zitation. Co-Autorenschaft setzt
        einen substanziellen intellektuellen Beitrag auf beiden Seiten voraus
        — das ist die Messlatte, in beide Richtungen.
      </p>

      <h2>Wie Sie das Gespräch beginnen</h2>
      <p>
        Schicken Sie eine kurze E-Mail — zwei oder drei Absätze — zu: wer Sie
        sind, grobe Form der Studie oder Funktion, in welchem Stadium Sie
        sind und wo Sie sich am meisten Unterstützung wünschen. Ich antworte
        innerhalb einer Woche, meist mit einem Ja samt Kalenderlink, einem
        Nein mit Hinweisen auf Alternativen oder einer kleinen Liste an
        Rückfragen.
      </p>

      <CalloutMail label="Kontakt aufnehmen" />

      <p>
        Pull Requests, Fehlerberichte und Funktionsideen ohne
        Kollaborationsrahmen sind ebenfalls willkommen — siehe{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          das GitHub-Repository
        </a>
        . Dafür müssen Sie nicht vorher mailen.
      </p>
    </>
  );
}

function Fr() {
  return (
    <>
      <p>
        Samply est développé et maintenu par Yury Shevchenko au laboratoire
        iScience à Constance. C&rsquo;est un projet open source, gratuit pour
        l&rsquo;usage académique, et discrètement en production dans des
        dizaines de groupes de recherche. La feuille de route reste cependant
        informelle — les fonctionnalités sont construites quand une étude en
        a vraiment besoin, et la plateforme s&rsquo;améliore le plus vite
        quand chercheurs et développeurs travaillent ensemble plutôt
        qu&rsquo;en parallèle.
      </p>

      <p>
        Si vous menez une étude ESM avec Samply et que vous avez une idée, un
        problème méthodologique ou une fonctionnalité que vous voudriez voir
        exister, j&rsquo;aimerais en entendre parler. En échange d&rsquo;une
        aide pour mener votre étude ou construire la fonctionnalité dont vous
        avez besoin, je suis ouvert à la <strong>co-signature</strong> de
        l&rsquo;article qui en résulte. L&rsquo;objectif est une véritable
        collaboration : questions partagées, crédit partagé, travail partagé.
      </p>

      <h2>À quoi cela peut ressembler</h2>
      <dl>
        <dt>Co-conception méthodologique.</dt>
        <dd>
          Vous concevez un protocole et souhaitez un second regard sur le
          timing, les contraintes de conformité ou le plan analytique. Je
          m&rsquo;implique dès la conception, avant le début de la collecte,
          et reste impliqué jusqu&rsquo;à l&rsquo;analyse et la rédaction.
        </dd>
        <dt>Développement de fonctionnalités sur mesure.</dt>
        <dd>
          Votre étude a besoin de quelque chose que Samply ne fait pas
          actuellement — planification adaptative, nouveau type de
          déclencheur, format d&rsquo;export spécifique, intégration avec un
          flux de capteur. Si cela se généralise à d&rsquo;autres études, je
          l&rsquo;intègre directement à Samply. La co-signature couvre le
          cadrage méthodologique expliquant pourquoi la fonctionnalité
          compte.
        </dd>
        <dt>Soutien d&rsquo;implémentation et d&rsquo;opérations.</dt>
        <dd>
          Aide concrète pour configurer les calendriers, déboguer la
          livraison, exporter et nettoyer les données, rédiger la section
          méthode. Particulièrement utile pour les équipes faisant de
          l&rsquo;ESM pour la première fois.
        </dd>
        <dt>Réplication et analyse secondaire.</dt>
        <dd>
          Vous avez des données Samply et une question intéressante qui a
          besoin d&rsquo;un méthodologue sur la ligne d&rsquo;auteurs.
          Parlons-en.
        </dd>
      </dl>

      <h2>Ce que je n&rsquo;offre pas</h2>
      <p>
        Conseil rémunéré, rôles de pure gestion de projet, ghost-writing, ou
        services en échange de la seule citation. La co-signature implique
        une contribution intellectuelle substantielle des deux côtés —
        c&rsquo;est la barre, dans les deux sens.
      </p>

      <h2>Comment entamer la conversation</h2>
      <p>
        Envoyez un court e-mail — deux ou trois paragraphes — couvrant : qui
        vous êtes, la forme générale de l&rsquo;étude ou de la fonctionnalité,
        à quel stade vous êtes, et ce pour quoi vous aimeriez le plus
        d&rsquo;aide. Je réponds en une semaine, généralement par un oui
        avec un lien de calendrier, un non avec des suggestions
        d&rsquo;alternatives, ou quelques questions de suivi.
      </p>

      <CalloutMail label="prendre contact" />

      <p>
        Les pull requests, rapports de bug et idées de fonctionnalités sans
        cadrage collaboratif sont également les bienvenus — voir{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          le dépôt GitHub
        </a>
        . Pour cela, vous n&rsquo;avez pas besoin d&rsquo;envoyer un e-mail
        au préalable.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Samply es desarrollado y mantenido por Yury Shevchenko en el
        laboratorio iScience en Constanza. Es de código abierto, gratuito
        para uso académico y discretamente en producción en docenas de
        grupos de investigación. Sin embargo, la hoja de ruta es informal —
        las funciones se construyen cuando un estudio realmente las necesita,
        y la plataforma mejora más rápido cuando investigadores y
        desarrolladores trabajan juntos en vez de en paralelo.
      </p>

      <p>
        Si estás llevando un estudio ESM con Samply y tienes una idea, un
        problema metodológico o una función que te gustaría que existiera, me
        gustaría escucharla. A cambio de ayuda para llevar adelante tu
        estudio o desarrollar la función que necesitas, estoy abierto a la{" "}
        <strong>coautoría</strong> del artículo resultante. El objetivo es
        una colaboración auténtica: preguntas compartidas, crédito
        compartido, trabajo compartido.
      </p>

      <h2>Cómo puede ser esto</h2>
      <dl>
        <dt>Co-diseño metodológico.</dt>
        <dd>
          Estás diseñando un protocolo y quieres un segundo par de ojos sobre
          el timing, las restricciones de cumplimiento o el plan analítico.
          Me involucraré en el diseño antes de iniciar la recogida de datos
          y seguiré implicado en el análisis y la escritura.
        </dd>
        <dt>Desarrollo de funcionalidades a medida.</dt>
        <dd>
          Tu estudio necesita algo que Samply no hace actualmente —
          programación adaptativa, un nuevo tipo de disparador, un formato de
          exportación específico, integración con un flujo de sensores. Si
          se generaliza a otros estudios, lo construyo directamente en
          Samply. La coautoría cubre el encuadre metodológico de por qué la
          función importa.
        </dd>
        <dt>Apoyo de implementación y operaciones.</dt>
        <dd>
          Ayuda práctica configurando calendarios, depurando la entrega,
          exportando y limpiando datos, redactando la sección de métodos.
          Particularmente útil para equipos que hacen ESM por primera vez.
        </dd>
        <dt>Replicación y análisis secundario.</dt>
        <dd>
          Tienes datos de Samply y una pregunta interesante que necesita un
          metodólogo en la línea de autores. Hablemos.
        </dd>
      </dl>

      <h2>Lo que no ofrezco</h2>
      <p>
        Consultoría remunerada, roles solo de gestión de proyectos,
        ghost-writing o servicios a cambio únicamente de citación. La
        coautoría implica una contribución intelectual sustantiva por ambas
        partes — esa es la vara, en ambas direcciones.
      </p>

      <h2>Cómo empezar la conversación</h2>
      <p>
        Envía un correo breve — dos o tres párrafos — cubriendo: quién eres,
        la forma aproximada del estudio o la función, en qué etapa estás y
        en qué te gustaría más recibir ayuda. Responderé en una semana,
        normalmente con un sí y un enlace de calendario, un no con
        sugerencias de alternativas, o un pequeño conjunto de preguntas de
        seguimiento.
      </p>

      <CalloutMail label="ponte en contacto" />

      <p>
        Las pull requests, reportes de bugs e ideas de funciones sin enfoque
        de colaboración también son bienvenidas — ve{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          el repositorio de GitHub
        </a>
        . Para eso no necesitas escribir primero.
      </p>
    </>
  );
}

function It() {
  return (
    <>
      <p>
        Samply è sviluppato e mantenuto da Yury Shevchenko al laboratorio
        iScience di Costanza. È open source, gratuito per uso accademico e
        silenziosamente in produzione in decine di gruppi di ricerca. La
        roadmap, però, è informale — le funzionalità nascono quando uno
        studio ne ha davvero bisogno, e la piattaforma migliora più
        rapidamente quando ricercatori e sviluppatori collaborano invece di
        lavorare in parallelo.
      </p>

      <p>
        Se stai conducendo uno studio ESM con Samply e hai un&rsquo;idea, un
        problema metodologico o una funzionalità che vorresti esistesse, mi
        farebbe piacere sentirla. In cambio dell&rsquo;aiuto a condurre il
        tuo studio o a costruire la funzionalità che ti serve, sono aperto
        alla posizione di <strong>coautore</strong> sull&rsquo;articolo che
        ne risulterà. L&rsquo;obiettivo è una collaborazione autentica:
        domande condivise, riconoscimento condiviso, lavoro condiviso.
      </p>

      <h2>Come può presentarsi</h2>
      <dl>
        <dt>Co-progettazione metodologica.</dt>
        <dd>
          Stai progettando un protocollo e vuoi un secondo paio di occhi su
          tempi, vincoli di compliance o piano analitico. Mi coinvolgo nel
          design prima dell&rsquo;inizio della raccolta dati e resto presente
          durante analisi e stesura.
        </dd>
        <dt>Sviluppo di funzionalità su misura.</dt>
        <dd>
          Il tuo studio ha bisogno di qualcosa che Samply attualmente non
          fa — pianificazione adattiva, un nuovo tipo di trigger, un formato
          di export specifico, integrazione con un flusso di sensori. Se è
          generalizzabile ad altri studi, lo costruisco direttamente in
          Samply. La posizione di coautore copre l&rsquo;inquadramento
          metodologico del perché la funzionalità conta.
        </dd>
        <dt>Supporto di implementazione e operatività.</dt>
        <dd>
          Aiuto pratico per configurare i calendari, fare debug delle
          consegne, esportare e pulire i dati, scrivere la sezione metodi.
          Particolarmente utile per i team che fanno ESM per la prima volta.
        </dd>
        <dt>Replica e analisi secondaria.</dt>
        <dd>
          Hai dati Samply e una domanda interessante che richiede un
          metodologo nella firma. Parliamone.
        </dd>
      </dl>

      <h2>Cosa non offro</h2>
      <p>
        Consulenza retribuita, ruoli solo di project management, ghost
        authoring o servizi in cambio della sola citazione. Coautoría
        implica un contributo intellettuale sostanziale da entrambe le parti
        — questa è l&rsquo;asticella, in entrambe le direzioni.
      </p>

      <h2>Come iniziare la conversazione</h2>
      <p>
        Manda un&rsquo;email breve — due o tre paragrafi — che copra: chi
        sei, la forma grossolana dello studio o della funzionalità, in che
        fase ti trovi e su cosa vorresti più aiuto. Rispondo entro una
        settimana, di solito con un sì e un link al calendario, un no con
        suggerimenti per alternative, o un piccolo set di domande di
        follow-up.
      </p>

      <CalloutMail label="mettiti in contatto" />

      <p>
        Pull request, bug report e idee di funzionalità senza inquadramento
        collaborativo sono ugualmente benvenuti — vedi{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          il repository GitHub
        </a>
        . Per quelli non serve scrivere prima.
      </p>
    </>
  );
}

function Pt() {
  return (
    <>
      <p>
        Samply é desenvolvido e mantido por Yury Shevchenko no laboratório
        iScience em Konstanz. É de código aberto, gratuito para uso
        acadêmico e silenciosamente em produção em dezenas de grupos de
        pesquisa. O roadmap, contudo, é informal — funcionalidades nascem
        quando um estudo realmente precisa delas, e a plataforma melhora
        mais rápido quando pesquisadores e desenvolvedores trabalham juntos
        em vez de em paralelo.
      </p>

      <p>
        Se você está conduzindo um estudo ESM com Samply e tem uma ideia, um
        problema metodológico ou uma funcionalidade que gostaria que
        existisse, eu adoraria ouvir. Em troca de ajuda para conduzir seu
        estudo ou construir a funcionalidade de que precisa, estou aberto à{" "}
        <strong>coautoria</strong> do artigo resultante. O objetivo é uma
        colaboração autêntica: perguntas compartilhadas, crédito
        compartilhado, trabalho compartilhado.
      </p>

      <h2>Como isso pode parecer</h2>
      <dl>
        <dt>Co-design metodológico.</dt>
        <dd>
          Você está desenhando um protocolo e quer um segundo par de olhos
          sobre tempo, restrições de cumprimento ou plano analítico. Vou me
          engajar com o design antes do início da coleta e permanecerei
          envolvido na análise e na escrita.
        </dd>
        <dt>Desenvolvimento de funcionalidades sob medida.</dt>
        <dd>
          Seu estudo precisa de algo que Samply atualmente não faz —
          agendamento adaptativo, um novo tipo de gatilho, um formato de
          exportação específico, integração com um fluxo de sensor. Se for
          generalizável para outros estudos, eu construo direto no Samply. A
          coautoria cobre o enquadramento metodológico de por que a
          funcionalidade importa.
        </dd>
        <dt>Suporte de implementação e operações.</dt>
        <dd>
          Ajuda prática para configurar calendários, depurar entregas,
          exportar e limpar dados, redigir a seção de métodos. Particularmente
          útil para equipes fazendo ESM pela primeira vez.
        </dd>
        <dt>Replicação e análise secundária.</dt>
        <dd>
          Você tem dados Samply e uma pergunta interessante que precisa de
          um metodologista na linha de autores. Vamos conversar.
        </dd>
      </dl>

      <h2>O que eu não ofereço</h2>
      <p>
        Consultoria paga, papéis apenas de gerenciamento de projeto,
        ghost-writing ou serviços em troca apenas de citação. Coautoria
        implica uma contribuição intelectual substancial dos dois lados —
        essa é a régua, nas duas direções.
      </p>

      <h2>Como começar a conversa</h2>
      <p>
        Envie um e-mail curto — dois ou três parágrafos — cobrindo: quem
        você é, a forma aproximada do estudo ou da funcionalidade, em que
        estágio está e em que gostaria mais de ajuda. Respondo em uma
        semana, normalmente com um sim e um link de calendário, um não com
        sugestões de alternativas, ou um pequeno conjunto de perguntas de
        acompanhamento.
      </p>

      <CalloutMail label="entre em contato" />

      <p>
        Pull requests, relatórios de bugs e ideias de funcionalidades sem
        enquadramento de colaboração também são bem-vindos — veja{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          o repositório do GitHub
        </a>
        . Para esses, você não precisa enviar e-mail antes.
      </p>
    </>
  );
}

function Nl() {
  return (
    <>
      <p>
        Samply wordt gebouwd en onderhouden door Yury Shevchenko in het
        iScience-lab in Konstanz. Het is open source, gratis voor academisch
        gebruik en stilletjes in productie bij tientallen
        onderzoeksgroepen. De roadmap is echter informeel — functies worden
        gebouwd wanneer een studie ze echt nodig heeft, en het platform
        verbetert het snelst wanneer onderzoekers en ontwikkelaars samen in
        plaats van naast elkaar werken.
      </p>

      <p>
        Voert u een ESM-studie uit met Samply en heeft u een idee, een
        methodologisch probleem of een functie die u zou willen — dan hoor
        ik dat graag. In ruil voor hulp bij het uitvoeren van uw studie of
        bij het bouwen van de functie die u nodig heeft, sta ik open voor{" "}
        <strong>co-auteurschap</strong> op de uiteindelijke publicatie. Het
        doel is echte samenwerking: gedeelde vragen, gedeelde erkenning,
        gedeeld werk.
      </p>

      <h2>Hoe dit eruit kan zien</h2>
      <dl>
        <dt>Methodologisch co-design.</dt>
        <dd>
          U ontwerpt een protocol en wilt een tweede paar ogen op timing,
          compliance-beperkingen of analyseplan. Ik stap in vóór de
          dataverzameling start en blijf betrokken tijdens analyse en
          schrijven.
        </dd>
        <dt>Ontwikkeling van maatwerkfuncties.</dt>
        <dd>
          Uw studie heeft iets nodig wat Samply nu niet doet — adaptieve
          planning, een nieuw trigger-type, een specifiek exportformaat,
          integratie met een sensorstroom. Als het generaliseerbaar is naar
          andere studies, bouw ik het direct in Samply. Co-auteurschap dekt
          de methodologische inkadering van waarom de functie ertoe doet.
        </dd>
        <dt>Implementatie- en operationele ondersteuning.</dt>
        <dd>
          Praktische hulp bij het configureren van schema&rsquo;s, het
          debuggen van de aflevering, exporteren en opschonen van data,
          schrijven van het methodenhoofdstuk. Vooral nuttig voor teams die
          voor het eerst ESM doen.
        </dd>
        <dt>Replicatie en secundaire analyse.</dt>
        <dd>
          U heeft Samply-data en een interessante vraag die een methodoloog
          op de auteurslijn vraagt. Laten we praten.
        </dd>
      </dl>

      <h2>Wat ik niet aanbied</h2>
      <p>
        Betaald consulting, alleen-projectmanagementrollen, ghost-writing of
        diensten in ruil voor enkel een citatie. Co-auteurschap impliceert
        een substantiële intellectuele bijdrage van beide kanten — dat is
        de lat, in beide richtingen.
      </p>

      <h2>Hoe u het gesprek begint</h2>
      <p>
        Stuur een korte e-mail — twee of drie alinea&rsquo;s — over: wie u
        bent, de grove vorm van de studie of functie, in welke fase u zit
        en waar u het meest hulp bij wilt. Ik antwoord binnen een week,
        meestal met een ja en een agendalink, een nee met suggesties voor
        alternatieven, of een korte set vervolgvragen.
      </p>

      <CalloutMail label="neem contact op" />

      <p>
        Pull requests, bugmeldingen en functie-ideeën zonder
        samenwerkingskader zijn ook welkom — zie{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          de GitHub-repository
        </a>
        . Daarvoor hoeft u niet eerst te mailen.
      </p>
    </>
  );
}

function Ru() {
  return (
    <>
      <p>
        Samply создаёт и поддерживает Юрий Шевченко в лаборатории iScience в
        Констанце. Это открытый исходный код, бесплатный для академического
        использования и тихо работающий в производстве у десятков
        исследовательских групп. Дорожная карта, однако, неформальна —
        функции появляются тогда, когда они действительно нужны
        исследованию, и платформа развивается быстрее всего, когда
        исследователи и разработчики работают вместе, а не параллельно.
      </p>

      <p>
        Если вы ведёте ESM-исследование на Samply и у вас есть идея,
        методологическая задача или функция, которой не хватает, мне будет
        интересно об этом услышать. В обмен на помощь с проведением вашего
        исследования или с разработкой нужной вам функции я открыт к{" "}
        <strong>соавторству</strong> в итоговой публикации. Цель —
        настоящее сотрудничество: общие вопросы, общее признание, общая
        работа.
      </p>

      <h2>Как это может выглядеть</h2>
      <dl>
        <dt>Методологическое со-проектирование.</dt>
        <dd>
          Вы проектируете протокол и хотите вторую пару глаз на тайминги,
          ограничения по комплаенсу или план анализа. Я включусь в дизайн
          до начала сбора данных и останусь вовлечённым на этапах анализа
          и написания.
        </dd>
        <dt>Разработка нужных вам функций.</dt>
        <dd>
          Вашему исследованию нужно что-то, чего Samply пока не делает, —
          адаптивное расписание, новый тип триггера, конкретный формат
          экспорта, интеграция с сенсорным потоком. Если это обобщается на
          другие исследования, я встрою это прямо в Samply. Соавторство
          покрывает методологическую рамку: зачем эта функция важна.
        </dd>
        <dt>Поддержка внедрения и эксплуатации.</dt>
        <dd>
          Практическая помощь по настройке расписаний, отладке доставки,
          экспорту и очистке данных, написанию раздела «Методы». Особенно
          полезно командам, делающим ESM впервые.
        </dd>
        <dt>Репликация и вторичный анализ.</dt>
        <dd>
          У вас есть данные Samply и интересный вопрос, которому нужен
          методолог в авторском списке. Давайте поговорим.
        </dd>
      </dl>

      <h2>Чего я не предлагаю</h2>
      <p>
        Платные консультации, чисто проектно-менеджерские роли,
        ghost-авторство или услуги только за цитирование. Соавторство
        предполагает существенный интеллектуальный вклад с обеих сторон —
        это планка в обе стороны.
      </p>

      <h2>Как начать разговор</h2>
      <p>
        Напишите короткое письмо — два-три абзаца — о том, кто вы, какова
        примерная форма исследования или функции, на какой вы стадии и в
        чём больше всего хотелось бы помощи. Я отвечу в течение недели,
        обычно либо «да» со ссылкой на календарь, либо «нет» с
        предложениями альтернатив, либо коротким набором уточняющих
        вопросов.
      </p>

      <CalloutMail label="свяжитесь" />

      <p>
        Pull request&rsquo;ы, баг-репорты и идеи функций без рамки
        совместной работы тоже приветствуются — см.{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          репозиторий на GitHub
        </a>
        . Для них не нужно сначала писать на почту.
      </p>
    </>
  );
}

function Pl() {
  return (
    <>
      <p>
        Samply jest budowany i utrzymywany przez Yurija Szewczenkę w
        laboratorium iScience w Konstancji. To projekt open source,
        bezpłatny do użytku akademickiego i cicho działający w produkcji w
        dziesiątkach grup badawczych. Mapa drogowa jest jednak nieformalna —
        funkcje powstają wtedy, gdy badanie naprawdę ich potrzebuje, a
        platforma rozwija się najszybciej, gdy badacze i deweloperzy
        współpracują ze sobą, a nie obok siebie.
      </p>

      <p>
        Jeśli prowadzisz badanie ESM na Samply i masz pomysł, problem
        metodologiczny lub funkcję, której Ci brakuje, chętnie o tym usłyszę.
        W zamian za pomoc w prowadzeniu Twojego badania lub w stworzeniu
        potrzebnej funkcji jestem otwarty na{" "}
        <strong>współautorstwo</strong> w powstającej publikacji. Celem jest
        autentyczna współpraca: wspólne pytania, wspólne uznanie, wspólna
        praca.
      </p>

      <h2>Jak to może wyglądać</h2>
      <dl>
        <dt>Współprojektowanie metodologiczne.</dt>
        <dd>
          Projektujesz protokół i chcesz drugą parę oczu na timing,
          ograniczenia zgodności lub plan analityczny. Włączę się w projekt
          zanim ruszy zbieranie danych i pozostanę zaangażowany przez
          analizę i pisanie.
        </dd>
        <dt>Rozwój funkcji na zamówienie.</dt>
        <dd>
          Twoje badanie potrzebuje czegoś, czego Samply obecnie nie robi —
          adaptacyjnego harmonogramowania, nowego typu wyzwalacza,
          konkretnego formatu eksportu, integracji z czujnikiem. Jeśli
          uogólnia się to do innych badań, wbuduję to bezpośrednio w
          Samply. Współautorstwo obejmuje metodologiczne uzasadnienie, czemu
          funkcja ma znaczenie.
        </dd>
        <dt>Wsparcie wdrożeniowe i operacyjne.</dt>
        <dd>
          Praktyczna pomoc przy konfiguracji harmonogramów, debugowaniu
          doręczania, eksporcie i czyszczeniu danych, redagowaniu sekcji
          metod. Szczególnie przydatne dla zespołów robiących ESM po raz
          pierwszy.
        </dd>
        <dt>Replikacja i analiza wtórna.</dt>
        <dd>
          Masz dane Samply i interesujące pytanie, które potrzebuje
          metodologa na liście autorów. Porozmawiajmy.
        </dd>
      </dl>

      <h2>Czego nie oferuję</h2>
      <p>
        Płatnego konsultingu, ról wyłącznie zarządzania projektem,
        ghost-writingu ani usług wyłącznie w zamian za cytowanie.
        Współautorstwo zakłada istotny wkład intelektualny po obu stronach
        — to jest poprzeczka, w obie strony.
      </p>

      <h2>Jak zacząć rozmowę</h2>
      <p>
        Wyślij krótki e-mail — dwa lub trzy akapity — opisujący: kim
        jesteś, ogólny zarys badania lub funkcji, na jakim jesteś etapie i z
        czym najbardziej chciałbyś pomocy. Odpowiem w ciągu tygodnia —
        zazwyczaj «tak» z linkiem do kalendarza, «nie» z propozycjami
        alternatyw albo krótkim zestawem pytań uzupełniających.
      </p>

      <CalloutMail label="napisz" />

      <p>
        Pull requesty, zgłoszenia błędów i pomysły funkcji bez współpracy
        są również mile widziane — zobacz{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          repozytorium GitHub
        </a>
        . Do tego nie musisz najpierw pisać maila.
      </p>
    </>
  );
}

function Tr() {
  return (
    <>
      <p>
        Samply, Konstanz&rsquo;daki iScience laboratuvarında Yury Shevchenko
        tarafından geliştirilip sürdürülüyor. Açık kaynak, akademik
        kullanım için ücretsiz ve onlarca araştırma grubunda sessizce
        üretimde. Ancak yol haritası gayri resmî — özellikler bir çalışmanın
        gerçekten ihtiyaç duyduğunda eklenir, ve platform en hızlı
        araştırmacılar ile geliştiriciler birlikte çalıştığında gelişir,
        ayrı değil.
      </p>

      <p>
        Samply ile bir ESM çalışması yürütüyorsanız ve bir fikriniz, bir
        metodolojik sorununuz ya da olmasını istediğiniz bir özellik varsa
        bunu duymak isterim. Çalışmanızı yürütmenize veya ihtiyaç
        duyduğunuz özelliği geliştirmeme yardımcı olmanız karşılığında,
        ortaya çıkacak makalede{" "}
        <strong>ortak yazarlığa</strong> açığım. Amaç gerçek bir iş birliği:
        paylaşılan sorular, paylaşılan kredi, paylaşılan iş.
      </p>

      <h2>Nasıl görünebileceği</h2>
      <dl>
        <dt>Metodolojik ortak tasarım.</dt>
        <dd>
          Bir protokol tasarlıyorsunuz ve zamanlama, uyum kısıtları ya da
          analitik plan için ikinci bir göz istiyorsunuz. Veri toplamadan
          önce tasarıma katılır, analiz ve yazım boyunca dahil kalırım.
        </dd>
        <dt>Özel özellik geliştirme.</dt>
        <dd>
          Çalışmanız Samply&rsquo;ın şu anda yapmadığı bir şeye ihtiyaç
          duyuyor — uyarlanır zamanlama, yeni bir tetikleyici türü, belirli
          bir dışa aktarım formatı, bir sensör akışıyla entegrasyon. Diğer
          çalışmalara genelleşiyorsa doğrudan Samply&rsquo;a eklerim. Ortak
          yazarlık, özelliğin neden önemli olduğunun metodolojik çerçevesini
          kapsar.
        </dd>
        <dt>Uygulama ve operasyon desteği.</dt>
        <dd>
          Takvim yapılandırma, teslim hatalarını ayıklama, veri dışa aktarma
          ve temizleme, metotlar bölümünü taslaklama gibi konularda pratik
          yardım. Özellikle ESM&rsquo;i ilk kez yapan ekipler için yararlı.
        </dd>
        <dt>Replikasyon ve ikincil analiz.</dt>
        <dd>
          Samply verisine ve yazar satırında bir metodolojiste ihtiyaç
          duyan ilginç bir sorunuza sahipseniz, konuşalım.
        </dd>
      </dl>

      <h2>Sunmadıklarım</h2>
      <p>
        Ücretli danışmanlık, yalnızca proje yöneticiliği rolleri, hayalet
        yazarlık veya yalnızca atıf karşılığında hizmet. Ortak yazarlık,
        her iki tarafın da kayda değer entelektüel katkıda bulunmasını
        gerektirir — iki yönde de çıta budur.
      </p>

      <h2>Konuşmaya nasıl başlanır</h2>
      <p>
        Kısa bir e-posta gönderin — iki üç paragraf — şunları içersin: kim
        olduğunuz, çalışmanın veya özelliğin kabaca şekli, hangi
        aşamadasınız ve en çok hangi konuda yardım istersiniz. Bir hafta
        içinde yanıtlarım; genellikle bir takvim bağlantısıyla «evet», ya
        da alternatif öneren bir «hayır», ya da kısa bir izleyici soru
        kümesiyle.
      </p>

      <CalloutMail label="iletişime geçin" />

      <p>
        Pull request&rsquo;ler, hata raporları ve iş birliği çerçevesi
        olmayan özellik fikirleri de hoş karşılanır —{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          GitHub deposuna
        </a>{" "}
        bakın. Bunlar için önce e-posta atmanız gerekmez.
      </p>
    </>
  );
}

function Zh() {
  return (
    <>
      <p>
        Samply 由康斯坦茨大学 iScience 实验室的 Yury Shevchenko 开发并维护。它是开源的、对学术用途免费，并悄然在数十个研究组的生产环境中运行。然而路线图是非正式的——只有当某项研究真正需要时，相应功能才会被构建；当研究者与开发者协同工作而非各自为政时，平台的进步最快。
      </p>

      <p>
        如果你正在用 Samply 进行 ESM 研究，并且有一个想法、一个方法学问题，或一项你希望存在的功能，我很乐意听到。作为对你研究运行或所需功能开发支持的回报，我愿意在最终论文中担任<strong>共同作者</strong>。目标是真正的合作：共享的问题、共享的署名、共享的工作。
      </p>

      <h2>合作可能是什么样子</h2>
      <dl>
        <dt>方法学共同设计。</dt>
        <dd>
          你正在设计研究方案，希望对时机、合规约束或分析方案有第二双眼睛。我会在数据收集开始之前介入设计，并在分析与撰写中保持参与。
        </dd>
        <dt>定制功能开发。</dt>
        <dd>
          你的研究需要 Samply 目前没有的能力——自适应排程、新型触发器、特定导出格式、与传感器流的集成。如果它可以推广到其他研究，我会直接将其构建到 Samply 中。共同作者身份涵盖了该功能为何重要的方法学论述。
        </dd>
        <dt>实施与运维支持。</dt>
        <dd>
          在配置日程、调试投递、导出与清洗数据、起草方法部分等方面提供实操帮助。对首次开展 ESM 的团队尤其有用。
        </dd>
        <dt>复制研究与二次分析。</dt>
        <dd>
          你拥有 Samply 数据，并且有一个有趣的问题需要在作者署名中加入方法学家。让我们谈一谈。
        </dd>
      </dl>

      <h2>我不提供的事项</h2>
      <p>
        付费咨询、纯项目管理角色、代笔，或仅以引用为回报的服务。共同作者意味着双方都做出实质性的学术贡献——这是两个方向上的门槛。
      </p>

      <h2>如何开启对话</h2>
      <p>
        发一封简短的邮件——两三段——内容包括：你是谁、研究或功能的大致形态、你目前处于哪个阶段，以及你最希望得到帮助的地方。我会在一周内回复，通常是「可以」并附上日程链接、「不行」并提供替代建议，或一小组追问问题。
      </p>

      <CalloutMail label="联系我" />

      <p>
        不以合作为框架的 pull request、缺陷报告和功能建议同样欢迎——见{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          GitHub 仓库
        </a>
        。这些无需先发邮件。
      </p>
    </>
  );
}

function Ko() {
  return (
    <>
      <p>
        Samply는 콘스탄츠의 iScience 연구실에서 Yury Shevchenko가 개발하고 유지하고 있습니다. 오픈소스이며, 학술 용도로 무료이고, 수십 개 연구 그룹의 운영 환경에서 조용히 사용되고 있습니다. 그러나 로드맵은 비공식적입니다 — 기능은 어떤 연구가 실제로 필요로 할 때 만들어지며, 연구자와 개발자가 따로가 아니라 함께 일할 때 플랫폼은 가장 빠르게 향상됩니다.
      </p>

      <p>
        Samply로 ESM 연구를 진행 중이고 아이디어, 방법론적 문제, 혹은 있었으면 하는 기능이 있다면 듣고 싶습니다. 연구 진행에 대한 도움이나 필요한 기능 개발의 대가로, 결과로 나올 논문에서 <strong>공동 저자</strong>가 되는 것에 열려 있습니다. 목표는 진정한 협력입니다: 공유된 질문, 공유된 공로, 공유된 작업.
      </p>

      <h2>어떤 모습이 될 수 있는가</h2>
      <dl>
        <dt>방법론적 공동 설계.</dt>
        <dd>
          프로토콜을 설계하면서 타이밍, 준수 제약, 또는 분석 계획에 대한 두 번째 시선을 원하는 경우. 데이터 수집이 시작되기 전에 설계에 참여하고 분석과 작성까지 계속 함께합니다.
        </dd>
        <dt>맞춤 기능 개발.</dt>
        <dd>
          Samply가 현재 하지 않는 무언가가 연구에 필요한 경우 — 적응형 일정, 새로운 트리거 유형, 특정 내보내기 형식, 센서 스트림과의 통합 등. 다른 연구로 일반화될 수 있다면 Samply에 직접 구축합니다. 공동 저자 자격은 그 기능이 왜 중요한지에 대한 방법론적 틀을 다룹니다.
        </dd>
        <dt>구현 및 운영 지원.</dt>
        <dd>
          일정 구성, 전달 디버깅, 데이터 내보내기와 정리, 방법 섹션 초안 작성에 대한 실무적 도움. 특히 ESM을 처음 진행하는 팀에 유용합니다.
        </dd>
        <dt>재현 연구 및 2차 분석.</dt>
        <dd>
          Samply 데이터를 가지고 있고 저자 라인에 방법론자가 필요한 흥미로운 질문이 있다면 — 이야기해 봅시다.
        </dd>
      </dl>

      <h2>제가 제공하지 않는 것</h2>
      <p>
        유료 컨설팅, 프로젝트 관리만 하는 역할, 대필, 또는 인용만을 대가로 한 서비스. 공동 저자 자격은 양쪽 모두의 실질적인 지적 기여를 의미합니다 — 그것이 양방향의 기준입니다.
      </p>

      <h2>대화 시작 방법</h2>
      <p>
        짧은 이메일을 보내주세요 — 두세 단락으로 — 다음을 포함하여: 당신이 누구인지, 연구나 기능의 대략적인 형태, 어떤 단계에 있는지, 그리고 가장 어떤 도움을 원하는지. 한 주 안에 답장합니다. 보통 캘린더 링크와 함께 «예», 대안 제안과 함께 «아니오», 혹은 짧은 추가 질문 목록 중 하나입니다.
      </p>

      <CalloutMail label="연락하기" />

      <p>
        협업 프레이밍이 없는 풀 리퀘스트, 버그 리포트, 기능 아이디어도 환영합니다 —{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          GitHub 저장소
        </a>
        를 참조하세요. 그런 경우에는 미리 이메일을 보낼 필요가 없습니다.
      </p>
    </>
  );
}

function Ja() {
  return (
    <>
      <p>
        Samply はコンスタンツの iScience 研究室で Yury Shevchenko が開発・運用しています。オープンソースで、学術利用は無料、そして数十の研究グループのプロダクション環境で静かに使われています。ただし、ロードマップは非公式です — 機能は研究が実際に必要としたときに作られ、研究者と開発者が並行してではなく一緒に働くときに、プラットフォームは最も速く改善します。
      </p>

      <p>
        Samply で ESM 研究を行っており、アイデア、方法論上の課題、あるいは存在してほしい機能がある場合は、ぜひお聞かせください。あなたの研究の運営や必要な機能の構築への協力と引き換えに、結果として生じる論文の <strong>共著者</strong> となることに前向きです。目的は本物の共同研究です：問いを共有し、クレジットを共有し、作業を共有します。
      </p>

      <h2>どのような形になり得るか</h2>
      <dl>
        <dt>方法論的な共同設計。</dt>
        <dd>
          プロトコルを設計しており、タイミング、コンプライアンス上の制約、あるいは分析計画について第二の視点が欲しい場合。データ収集開始前から設計に関わり、分析と執筆を通じて関与を続けます。
        </dd>
        <dt>カスタム機能の開発。</dt>
        <dd>
          サンプリーが現在できないことが研究に必要な場合 — 適応的スケジューリング、新しいトリガー種別、特定のエクスポート形式、センサーストリームとの統合など。他の研究にも一般化できるなら、サンプリーに直接組み込みます。共著は、その機能がなぜ重要かという方法論的な枠付けをカバーします。
        </dd>
        <dt>実装・運用サポート。</dt>
        <dd>
          スケジュール設定、配信のデバッグ、データのエクスポートとクリーニング、メソッドセクションの草稿作成における実務的な支援。特に初めて ESM を行うチームに有用です。
        </dd>
        <dt>再現研究と二次分析。</dt>
        <dd>
          サンプリーのデータと、著者の列に方法論者を必要とする興味深い問いをお持ちなら、お話ししましょう。
        </dd>
      </dl>

      <h2>提供しないもの</h2>
      <p>
        有償コンサルティング、プロジェクトマネジメントだけの役割、ゴーストオーサーシップ、あるいは引用だけと引き換えのサービス。共著は双方からの実質的な知的貢献を意味します — それが双方向の基準です。
      </p>

      <h2>会話の始め方</h2>
      <p>
        短いメールを送ってください — 2、3 段落で — 次を含めてください：あなたが何者か、研究または機能のおおよその形、いまどの段階か、そしてどこで最も助けが必要か。1 週間以内に返信します。多くの場合、カレンダーのリンクとともに「はい」、代替案の提案とともに「いいえ」、あるいは短い追加質問のセットのいずれかです。
      </p>

      <CalloutMail label="ご連絡ください" />

      <p>
        共同研究の枠組みのないプルリクエスト、バグ報告、機能アイデアも歓迎します —{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          GitHub リポジトリ
        </a>{" "}
        を参照してください。それらに先んじてメールを送る必要はありません。
      </p>
    </>
  );
}

function Ar() {
  return (
    <div dir="rtl">
      <p>
        يبني Samply ويصونه Yury Shevchenko في مختبر iScience في كونستانز. إنه مفتوح المصدر، مجّاني للاستخدام الأكاديمي، ويعمل بهدوء في الإنتاج لدى عشرات الفِرق البحثية. غير أن خريطة الطريق غير رسمية — تُبنى الميزات عندما تحتاجها دراسة فعلًا، وتتطوّر المنصة بأسرع وتيرة حين يعمل الباحثون والمطوّرون معًا بدلًا من العمل بالتوازي.
      </p>

      <p>
        إذا كنت تدير دراسة ESM على Samply ولديك فكرة أو مشكلة منهجية أو ميزة تتمنّى وجودها، فأودّ أن أسمعها. مقابل المساعدة في إجراء دراستك أو في بناء الميزة التي تحتاجها، أنا منفتح على <strong>التأليف المشترك</strong> في الورقة الناتجة. الهدف تعاون حقيقي: أسئلة مشتركة، فضل مشترك، وعمل مشترك.
      </p>

      <h2>كيف يمكن أن يبدو ذلك</h2>
      <dl>
        <dt>التصميم المشترك المنهجي.</dt>
        <dd>
          تصمّم بروتوكولًا وتريد عينًا ثانية على التوقيت أو قيود الالتزام أو خطة التحليل. أنخرط في التصميم قبل بدء جمع البيانات وأبقى مشاركًا حتى التحليل والكتابة.
        </dd>
        <dt>تطوير ميزات مخصّصة.</dt>
        <dd>
          دراستك تحتاج شيئًا لا يفعله Samply حاليًا — جدولة متكيّفة، نوع جديد من المحفّزات، صيغة تصدير محدّدة، تكامل مع تدفّق حسّاس. إذا كان قابلًا للتعميم على دراسات أخرى فسأبنيه مباشرة داخل Samply. ويغطّي التأليف المشترك التأطير المنهجي لِمَ تهمّ الميزة.
        </dd>
        <dt>دعم التنفيذ والتشغيل.</dt>
        <dd>
          مساعدة عملية في إعداد الجداول، وتصحيح أعطال التسليم، وتصدير البيانات وتنظيفها، وصياغة قسم المنهج. مفيد بصفة خاصة للفِرق التي تجري ESM لأول مرة.
        </dd>
        <dt>التكرار والتحليل الثانوي.</dt>
        <dd>
          لديك بيانات Samply وسؤال مثير يحتاج إلى منهجيّ على سطر المؤلِّفين — لنتحدّث.
        </dd>
      </dl>

      <h2>ما لا أقدّمه</h2>
      <p>
        استشارات مدفوعة، أو أدوار إدارة مشاريع فقط، أو الكتابة الشبحية، أو خدمات مقابل الاستشهاد وحده. التأليف المشترك يعني مساهمة فكرية جوهرية من الطرفين — هذا هو السقف، في كلا الاتجاهين.
      </p>

      <h2>كيف تبدأ الحديث</h2>
      <p>
        أرسل بريدًا قصيرًا — فقرتين أو ثلاثًا — يغطّي: من أنت، والشكل العام للدراسة أو الميزة، وفي أي مرحلة أنت، وما الذي تودّ المساعدة فيه أكثر. أردّ خلال أسبوع، عادةً إمّا بنعم مع رابط تقويم، أو لا مع اقتراح بدائل، أو بمجموعة صغيرة من أسئلة المتابعة.
      </p>

      <CalloutMail label="تواصل معي" />

      <p>
        طلبات الدمج وتقارير الأخطاء وأفكار الميزات بلا إطار تعاوني مرحَّب بها أيضًا — راجع{" "}
        <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer">
          مستودع GitHub
        </a>
        . لتلك لا حاجة إلى مراسلتي أولًا.
      </p>
    </div>
  );
}

export default function CollaborateContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <De />;
  if (locale === "fr") return <Fr />;
  if (locale === "es") return <Es />;
  if (locale === "it") return <It />;
  if (locale === "pt") return <Pt />;
  if (locale === "nl") return <Nl />;
  if (locale === "ru") return <Ru />;
  if (locale === "pl") return <Pl />;
  if (locale === "tr") return <Tr />;
  if (locale === "zh") return <Zh />;
  if (locale === "ko") return <Ko />;
  if (locale === "ja") return <Ja />;
  if (locale === "ar") return <Ar />;
  return <En />;
}
