import { fromStrings } from "./content.ts";

/** Portuguese troubleshooting page. See de.ts for the translation contract. */
export default fromStrings([
  "A maioria dos problemas do Samply é de configuração, não de falha, e quase todos são visíveis antes de sair a primeira notificação. Esta página está organizada pelo que daria por si, não pelo que está tecnicamente errado.",
  "Se o seu estudo ainda não começou, o caminho mais rápido é a **Verificação da configuração** no painel do estudo: analisa as suas definições e oferece uma notificação de teste que segue o percurso de envio real e lhe mostra o link do questionário exatamente como o telemóvel do participante o recebeu. Quase tudo o que se segue é detetado por essa única verificação.",

  "1 · Um participante deixou de receber notificações",
  "É o relato mais comum e tem várias causas com soluções muito diferentes. Percorra a lista de cima para baixo — está ordenada pela frequência com que cada causa se revela a certa.",

  "O participante reinstalou a aplicação ou mudou de telemóvel",
  "O que acontece:",
  "o token push identifica a instalação da aplicação, não a pessoa. Reinstalar, restaurar num novo dispositivo ou, nalguns casos, atualizar o sistema gera um token novo, e o antigo deixa de funcionar em definitivo.",
  "O que vê:",
  "a página de análises indica «N participante(s) já não conseguem receber notificações». O Samply fica a saber pelos recibos de entrega do serviço push, normalmente dentro de uma hora após o envio seguinte.",
  "A solução:",
  "o participante abre o Samply Research e inicia sessão. Assim o dispositivo é registado de novo automaticamente. Em caso de dúvida, peça-lhe para abrir o ecrã **Verificação de notificações** no menu da aplicação e tocar em **Registar novamente este dispositivo** — a mesma reparação, feita de propósito.",

  "O Android está a adormecer a aplicação",
  "O que acontece:",
  "muitos fabricantes Android acrescentam uma gestão agressiva da bateria por cima do sistema. O push é aceite pelos servidores da Google e depois atrasado ou descartado pelo próprio telemóvel. Samsung, Xiaomi, OnePlus, Huawei, Oppo e Vivo são os culpados habituais; o comportamento varia por fabricante e por versão do Android.",
  "O que vê:",
  "**nada.** É este o ponto importante. A notificação foi aceite para entrega, por isso o Samply conta-a como enviada e não aparece aviso nenhum em lado nenhum. O único sinal é um participante que relata avisos em falta enquanto todos os indicadores do lado do servidor parecem saudáveis.",
  "A solução:",
  "o participante exclui o Samply da otimização da bateria. Os passos diferem por fabricante, e o [dontkillmyapp.com](https://dontkillmyapp.com/) documenta-os dispositivo a dispositivo — é a melhor referência disponível e vale a pena enviá-la diretamente aos participantes com telemóveis Android. O ecrã **Verificação de notificações** na aplicação também remete para as definições do telemóvel.",
  "Prevenção:",
  "mencione isto nas suas instruções iniciais em vez de o fazer depois. Pedi-lo aos participantes Android no primeiro dia custa um minuto; pedi-lo ao quinto dia significa que já perdeu os dados deles.",

  "A permissão de notificações nunca foi concedida, ou foi revogada",
  "O que acontece:",
  "a aplicação pede permissão no primeiro arranque. Se o participante recusar — ou desligar as notificações mais tarde, o que algumas pessoas fazem em bloco ao arrumar o telemóvel —, nada pode ser entregue.",
  "O que vê:",
  "se a permissão nunca foi concedida, o participante não tem token push: aparece inscrito mas nunca recebe nada. Se foi revogada depois, do ponto de vista do servidor o token pode continuar a funcionar durante algum tempo.",
  "A solução:",
  "**Verificação de notificações** no menu da aplicação mostra diretamente o estado da permissão e abre a página de definições certa.",

  "O participante aderiu mas nunca mais abriu a aplicação",
  "Um dispositivo regista-se para notificações enquanto a aplicação corre. Quem adere por um link, fecha depois a aplicação e nunca a reabre pode nunca concluir o registo. A linha existe; o dispositivo está inacessível.",

  "Modos de Focagem do iOS, ou o resumo agendado",
  "O iOS pode reter notificações e entregá-las em conjunto, ou silenciá-las num modo de Focagem. Muitas vezes os participantes não sabem que está ativo. A notificação chega — só que não quando a agendou, o que em amostragem de experiência equivale frequentemente a não chegar. Peça aos participantes que permitam ao Samply entregar de imediato.",

  "O telemóvel estava desligado ou sem rede no momento do envio",
  "Os serviços push guardam uma mensagem durante algum tempo e entregam-na quando o dispositivo volta a ligar-se, mas não o garantem, e um link expirado pode já não servir nessa altura. Se o seu desenho depende de um aviso chegar às pessoas numa janela estreita, defina uma validade do link para que chegadas tardias não sejam respondidas fora da janela — e conte com alguma perda.",

  "2 · A exportação do questionário não tem identificador do participante",
  "É o mais prejudicial que pode acontecer, porque é silencioso e só se descobre durante a análise, quando o estudo já terminou.",
  "Não há forma de reconstruir depois quem respondeu o quê. Se o seu desenho exige análises ao nível da pessoa ou multinível, verifique isto no primeiro dia com uma notificação de teste.",

  "O link da notificação não tem marcador de ID",
  "O que acontece:",
  "sem `%SAMPLY_ID%` no link web, o questionário não recebe qualquer identificação. Cada resposta é anónima e impossível de associar.",
  "A solução:",
  "o editor de agendamentos já avisa enquanto escreve, e a verificação da configuração comunica-o. Use o assistente **Criar este link por mim** em vez de montar o URL à mão — acrescenta os parâmetros corretos com os nomes que a sua plataforma espera.",

  "O link está malformado — um marcador duplicado ou um segundo «?»",
  "O que acontece:",
  "um URL só pode conter um `?`; os restantes parâmetros ligam-se com `&`. Colar um segundo `?id=%SAMPLY_ID%` no fim faz o valor do parâmetro anterior engolir tudo o que se segue, e o questionário guarda um identificador corrompido ou nenhum.",
  "A solução:",
  "guardar um agendamento com um marcador duplicado ou um `?` a mais é agora bloqueado com uma mensagem concreta. Se estiver a editar um agendamento antigo, guarde-o de novo para executar a verificação.",

  "O ID chega, mas a sua ferramenta de questionários não o guarda",
  "O que acontece:",
  "a maioria das plataformas ignora parâmetros de URL inesperados a menos que os declare. No Qualtrics tem de existir um campo Embedded Data no Survey Flow com um nome que corresponda *exatamente* à chave da query, incluindo maiúsculas. O SoSci exige que o parâmetro esteja registado; o LimeSurvey precisa dele definido na integração de painel.",
  "Como distinguir:",
  "é o caso em que a notificação de teste do Samply mostra o ID presente no link, mas a sua exportação continua com uma coluna vazia. O problema está do lado da ferramenta de questionários.",
  "A solução:",
  "siga o [guia de integração](/docs/integrations) da sua plataforma, preencha depois uma resposta de teste e transfira a exportação para confirmar que a coluna está preenchida. Atenção aos nomes de parâmetro reservados — cada ferramenta tem alguns e estão listados por plataforma.",

  "Os participantes escrevem um código à mão em vez disso",
  "Funciona, mas acrescenta esforço em cada aviso e introduz gralhas e maiúsculas inconsistentes que terá de limpar. Vale a pena dedicar vinte minutos a passar o parâmetro corretamente.",

  "3 · As taxas de resposta parecem erradas, ou os lembretes vão para todos",

  "As conclusões nunca são registadas",
  "O que acontece:",
  "o Samply só sabe que um questionário terminou se o questionário lho disser. Isso exige duas coisas: `%MESSAGE_ID%` no link da notificação e um redirecionamento no final do seu questionário de volta para `/studies/<study-code>/done/<message-id>`, devolvendo o id da mensagem com a sintaxe própria da sua ferramenta. Se a sua ferramenta só conseguir acrescentar os seus próprios parâmetros a uma URL de redirecionamento fixa, use em vez disso `/studies/<study-code>/done?messageid=<message-id>` — o Samply aceita as duas formas.",
  "O que vê:",
  "a página de análises avisa quando um estudo enviou notificações mas não registou qualquer conclusão. Esse aviso aparece durante a recolha, não depois.",
  "Também vale a pena saber:",
  "algumas ferramentas não conseguem redirecionar para um URL externo, e outras só em planos pagos. A [tabela de compatibilidade](/docs/integrations) indica quais.",

  "Os lembretes chegam a pessoas que já responderam",
  "Porquê:",
  "os lembretes são cancelados automaticamente assim que uma conclusão é registada — mas se o registo de conclusões não estiver configurado, o Samply não pode saber quem respondeu e cada lembrete vai para todos. É a mesma causa de fundo da anterior e produz submissões duplicadas que terá de eliminar à mão.",
  "A solução:",
  "acrescente `%MESSAGE_ID%` e o redirecionamento de fim de questionário. O passo dos lembretes no editor de agendamentos avisa-o quando faltam.",

  "Um participante respondeu, mas aparece como não respondente",
  "O Samply conta uma notificação como respondida se o participante lhe tocou, a abriu a partir do histórico na aplicação, ou se o questionário comunicou a conclusão. Se nada disso aconteceu — por exemplo porque copiou o link para um navegador de computador —, a resposta existe na sua ferramenta mas o Samply não a consegue atribuir. Compare com a sua exportação antes de considerar definitivo o valor de conformidade do Samply.",

  "4 · Os números na página de análises parecem errados",

  "As contagens parecem descer ao longo do tempo",
  "Verifique o seletor de período no topo da página. **Estudo inteiro** é a predefinição; um período fixo como *7 d* é uma janela deslizante ancorada ao presente, pelo que as mensagens mais antigas saem da contagem à medida que o estudo avança. Nada se perde — a janela deslocou-se. Volte a **Estudo inteiro** para números cumulativos.",

  "«Desempenho dos agendamentos» mostra apenas «(agendamento não registado)»",
  "As notificações enviadas antes de meados de 2026 não traziam a marca do agendamento que as produziu, pelo que não podem ser atribuídas retroativamente. As novas trazem. As notificações por evento e as desencadeadas pela API legitimamente não têm agendamento e aparecem sempre aqui.",

  "Os números não coincidem com os da minha ferramenta de questionários",
  "Medem coisas diferentes e alguma divergência é esperada. O Samply conta notificações e interações com elas; a sua ferramenta conta submissões. Respostas parciais, respostas iniciadas num computador e submissões duplicadas afastam os dois valores. As notificações de teste são excluídas dos números e da exportação do Samply, pelo que não explicam uma diferença. Para a sua própria análise, exporte o registo bruto de eventos a partir da página Histórico do estudo e calcule diretamente o que precisa.",

  "5 · Não foi enviada qualquer notificação",
  "Verifique por esta ordem:",
  "**O estudo está ativo?** Um estudo inativo não envia nada.",
  "**Alguém aderiu?** Um agendamento sem destinatários não produz envios.",
  "**O agendamento visa as pessoas certas?** Se estiver limitado a um grupo em que não está ninguém, ou aos participantes inscritos no momento da criação enquanto a sua coorte aderiu depois, a fila ficará vazia.",
  "**Verifique o fuso horário.** Um agendamento no fuso errado dispara à hora local errada — muitas vezes a meio da noite, o que parece falta de resposta em vez de má configuração.",
  "**Veja a fila agendada.** Cada agendamento expande-se numa linha por participante e por hora de envio. Se a fila estiver vazia, o agendamento nunca produziu nada e a causa está acima, não na entrega.",

  "6 · O que dizer aos participantes",
  "A maioria dos problemas do lado do participante é resolvida pelo próprio, não por si. Vale a pena incluir isto no material de acolhimento em vez de o enviar como reação:",
  "Permita as notificações quando a aplicação pedir. Se recusou, pode ativá-las nas definições do telemóvel.",
  "**No Android:** desligue a otimização da bateria para o Samply, ou o telemóvel atrasará ou bloqueará os avisos. O [dontkillmyapp.com](https://dontkillmyapp.com/) tem os passos para o seu telemóvel específico.",
  "No iPhone: garanta que o Samply pode entregar de imediato e não fica retido num resumo agendado nem silenciado por um modo de Focagem.",
  "Se reinstalar a aplicação ou mudar de telemóvel, abra o Samply e inicie sessão de novo para que o seu dispositivo seja registado outra vez.",
  "Se os avisos deixarem de chegar, abra **Verificação de notificações** no menu da aplicação. Mostra exatamente que passo está interrompido e oferece uma reparação com um toque.",

  "7 · Como prevenir tudo isto",
  "Execute a **Verificação da configuração** no painel do seu estudo e envie a si próprio uma notificação de teste antes de recrutar. O teste segue o percurso de envio normal e comunica quatro coisas: que a notificação foi enviada, que o link leva o identificador do participante, que foi aberto e que a conclusão foi comunicada. Um estudo que passe nas quatro não falhará de nenhuma das formas descritas nesta página.",
  "Depois preencha você mesmo uma resposta completa e **transfira a exportação**. É a única forma de confirmar que a sua ferramenta está mesmo a guardar o identificador, algo que o Samply não consegue ver do seu lado. Demora cinco minutos e é a coisa mais valiosa que pode fazer antes de recrutar.",
  "Se algo aqui não corresponder ao que observa, ou se encontrar uma falha que esta página não descreve, [contacte-nos](/docs/collaborate) — a lista cresce com os relatos.",
]);
