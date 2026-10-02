import { fromStrings } from "./content.ts";

/**
 * Portuguese participant FAQ.
 *
 * Strings are in reading order; see `fromStrings` for the exact sequence.
 * Inline markup, link targets and code spans must match English exactly — only
 * link labels are translated. App UI labels in **bold** match the app's own
 * Portuguese strings. lib/faq.test.ts enforces the structure.
 */
export default fromStrings([
  "Esta página é para quem participa de um estudo que usa o app **Samply Research**. O Samply é a ferramenta que entrega as notificações de um estudo. O estudo em si — suas perguntas, seu cronograma, qualquer pagamento e suas respostas — é conduzido por um pesquisador, geralmente em uma universidade. Saber a qual dos dois perguntar faz você obter uma resposta muito mais rápido.",

  "A quem devo perguntar?",
  "Ao pesquisador que conduz o seu estudo",
  "Quantas notificações você recebe, quando e por quanto tempo",
  "Perguntas da pesquisa, links de pesquisa que não funcionam ou erros dentro de uma pesquisa",
  "Pagamento, créditos acadêmicos, vales ou qualquer outra compensação",
  "Se uma notificação perdida ou uma resposta atrasada ainda conta",
  "Retirar suas respostas, ou como suas respostas são usadas",
  "Qualquer coisa na descrição do estudo ou no termo de consentimento",
  "Ao suporte do Samply",
  "O app trava ou não abre",
  "Você não consegue se cadastrar, entrar ou redefinir sua senha",
  "Sua conta Samply, ou a exclusão dela",
  "Nenhuma notificação chega, mesmo depois de seguir os passos desta página",
  "Problemas com este site",
  "O suporte do Samply não pode ver suas respostas, não define o cronograma do estudo e não pode pagar compensações nem conceder créditos. Para essas perguntas, só o pesquisador pode ajudar — escrever primeiro para o Samply só atrasa a sua resposta.",

  "Como falar com o seu pesquisador",
  "Como entro em contato com o pesquisador do meu estudo?",
  "Abra o app Samply Research, toque no estudo na sua tela inicial e role para baixo até **Pesquisador responsável**. Toque no endereço de e-mail: seu app de e-mail abre uma mensagem para o pesquisador com o nome do estudo e o seu ID Samply já no assunto, para que ele encontre você imediatamente.",
  "O convite que você recebeu, a descrição do estudo e o termo de consentimento geralmente também trazem dados de contato.",
  "O estudo não mostra dados de contato. E agora?",
  "Veja o convite que levou você ao estudo — um e-mail, a página de uma disciplina, um cartaz ou um folheto — e o termo de consentimento. Espera-se que os pesquisadores informem um contato em pelo menos um desses lugares. Se ainda assim você não encontrar nenhum, escreva para o suporte do Samply com o nome do estudo exatamente como aparece no app, e nós ajudaremos você a chegar ao pesquisador.",
  "O que devo incluir na minha mensagem?",
  "O nome do estudo, como aparece no app.",
  "Seu **ID Samply**. Os pesquisadores veem este ID, não o seu nome nem o seu endereço de e-mail, então sem ele não conseguem encontrar seus dados.",
  "O que aconteceu e, aproximadamente, quando — por exemplo, a data e a hora de uma notificação que não chegou.",
  "Para problemas com notificações: o modelo do seu celular e se ele usa Android ou iOS.",
  "O que é o meu ID Samply e onde encontro?",
  "Seu ID Samply é um código aleatório que o app cria para você. Os pesquisadores veem este código em vez do seu nome ou endereço de e-mail, o que mantém suas respostas pseudonimizadas. Você o encontra no app em **Mais → Configurações** e neste site depois de [entrar como participante](/participant/login).",
  "Alguns estudos também dão a você um **Código do participante**, mostrado na tela do estudo no app. Se você tiver um, inclua-o também quando escrever ao pesquisador.",

  "Notificações",
  "Não estou recebendo notificações",
  "No app, abra **Mais → Verificação de notificações**. Ela verifica cada etapa pela qual uma notificação passa, mostra qual está com problema e oferece uma solução. As causas mais comuns são:",
  "As notificações do Samply estão desativadas nas configurações do seu celular.",
  "**No Android:** a otimização de bateria está colocando o app para dormir. Desative-a para o Samply — [dontkillmyapp.com](https://dontkillmyapp.com/) mostra os passos para o modelo do seu celular.",
  "**No iPhone:** um modo de Foco ou o Resumo Programado está segurando as notificações. Permita que o Samply entregue notificações imediatamente.",
  "Você reinstalou o app ou trocou de celular. Entre novamente e depois toque em **Registar novamente este dispositivo** na Verificação de notificações.",
  "Se a Verificação de notificações mostrar que está tudo certo e as notificações ainda assim não chegarem, entre em contato com o pesquisador. O estudo pode estar pausado ou encerrado, ou simplesmente não ter nenhum envio programado no momento.",
  "As notificações chegam na hora errada",
  "Se você viajou ou o fuso horário do seu celular mudou, abra **Mais → Configurações** e veja **Fuso horário**. Se o fuso horário salvo e o real forem diferentes, toque em **Salvar o fuso horário atual**.",
  "Se o fuso horário estiver certo, o horário faz parte do desenho do estudo — muitos estudos enviam de propósito em momentos aleatórios do dia. Pergunte ao pesquisador. O período de tempo preferido que você pode informar em Configurações é apenas uma informação para os pesquisadores; por si só, ele não bloqueia notificações.",
  "Recebo notificações demais, ou quero que elas parem",
  "A frequência das notificações é decidida pelo pesquisador, não pelo Samply, então pergunte a ele se o seu cronograma pode ser alterado. Para parar todas as notificações de um estudo, [saia do estudo](/docs/faq#leave). Desativar as notificações nas configurações do celular também as interrompe, mas o estudo vai registrar que você não está respondendo.",
  "Perdi uma notificação. Ainda posso responder?",
  "Todas as notificações que você recebeu ficam listadas na aba **Histórico** do app, e você pode abrir a pesquisa a partir dali. Muitos estudos fazem os links expirarem depois de um tempo, porque respostas dadas muito mais tarde são menos úteis para a pesquisa. Se você vir **O link expirou**, o pesquisador fechou esse prazo. Se uma notificação perdida afeta o seu pagamento ou os seus créditos é decisão do pesquisador.",

  "Pesquisas e respostas",
  "O link da pesquisa não abre ou mostra um erro",
  "As pesquisas ficam hospedadas na própria ferramenta de pesquisa do pesquisador — por exemplo Qualtrics, SoSci Survey ou LimeSurvey —, não no Samply. Tente de novo com uma conexão de internet estável. Se a própria página da pesquisa mostrar um erro, ou disser que a pesquisa está encerrada, entre em contato com o pesquisador: só ele pode resolver. Uma captura de tela ajuda.",
  "Terminei uma pesquisa, mas o app não a mostra como concluída",
  "O Samply só fica sabendo que uma pesquisa foi concluída se a pesquisa levar você de volta ao app no final, e nem todo estudo está configurado assim. Suas respostas não foram perdidas — estão guardadas na ferramenta de pesquisa do pesquisador. Se a sua compensação depender disso, informe ao pesquisador a data e a hora em que você respondeu.",
  "Cometi um erro nas minhas respostas",
  "Suas respostas vão diretamente para a ferramenta de pesquisa do pesquisador, e o Samply não pode vê-las nem alterá-las. Escreva ao pesquisador informando a data e a hora da pesquisa e o que você gostaria de corrigir.",

  "Entrar e sair de um estudo",
  "Como entro em um estudo?",
  "No app, toque em **Encontrar um estudo** e escaneie o código QR do estudo ou digite o código de estudo de 8 caracteres do seu convite. Abrir um link de convite no celular também funciona. Alguns estudos também aparecem em **Estudos públicos**.",
  "O app diz que nenhum estudo foi encontrado para o meu código",
  "Verifique se o código não tem erros de digitação — ele tem 8 caracteres. Se estiver correto, o estudo pode ter sido encerrado ou ainda não ter sido aberto. O pesquisador pode dizer qual é o caso.",
  "Como saio de um estudo?",
  "Abra o estudo no app, role até o final e toque em **Sair do estudo**. O app pede que você confirme, porque isso não pode ser desfeito. As notificações desse estudo param imediatamente.",
  "Sair de um estudo interrompe novas notificações, mas não exclui as respostas que você já deu — elas ficam com o pesquisador. Se quiser retirá-las, escreva ao pesquisador e inclua o seu ID Samply.",
  "Quando vou receber meu pagamento ou meus créditos acadêmicos?",
  "A compensação é combinada e paga pelo pesquisador, não pelo Samply. O Samply não faz pagamentos a participantes e não consegue ver se você foi pago. Pergunte ao pesquisador e inclua o seu ID Samply.",

  "Sua conta e seus dados",
  "Esqueci minha senha",
  "Na tela de login, toque em **Esqueceu sua senha?** e digite seu endereço de e-mail. Você vai receber um link para definir uma nova senha. Se ele não chegar em alguns minutos, verifique a pasta de spam; se também não estiver lá, entre em contato com o suporte do Samply.",
  "Como altero meu endereço de e-mail?",
  "No app, abra **Mais → Configurações** e edite seu e-mail em **Informações da conta**. Depois, saia e entre novamente para que a alteração tenha efeito.",
  "O que o pesquisador pode ver sobre mim?",
  "Os pesquisadores veem o seu ID Samply — não o seu nome, endereço de e-mail ou número de telefone. Eles veem quando as notificações foram enviadas a você e se você as abriu, e recebem suas respostas por meio da própria ferramenta de pesquisa. Se um estudo usa a sua localização para disparar notificações, a sua localização fica no seu celular e não é compartilhada com os pesquisadores.",
  "Se você escrever a um pesquisador por e-mail, ele naturalmente verá o seu endereço de e-mail. A [Política de Privacidade](/docs/policy) explica em detalhes o que o Samply armazena.",
  "Como excluo minha conta e meus dados?",
  "No app, abra **Mais → Configurações**, toque em **Excluir minha conta** e confirme com sua senha. Isso remove sua conta Samply, tira você de todos os seus estudos e apaga os registros que o Samply tem sobre você. Não pode ser desfeito.",
  "Excluir sua conta Samply não exclui as respostas guardadas na ferramenta de pesquisa de um pesquisador — o Samply não tem acesso a elas. Se quiser que elas também sejam removidas, escreva a cada pesquisador com o seu ID Samply **antes** de excluir sua conta. Depois disso, o ID não aparece mais no app.",
  "Posso obter uma cópia dos meus dados?",
  "Sim. [Entre como participante](/participant/login) neste site e escolha **Baixar meus dados** para obter uma cópia de tudo o que o Samply tem sobre você. Para uma cópia das suas respostas às pesquisas, pergunte ao pesquisador.",

  "Como falar com o suporte do Samply",
  "Como entro em contato com o suporte do Samply?",
  "Escreva para [yury.shevchenko@uni.kn](mailto:yury.shevchenko@uni.kn) ou abra **Mais → Contato** no app. Inclua o modelo do seu celular, a versão do Android ou do iOS e a versão do app mostrada em **Mais → Sobre**. As respostas costumam levar de um a dois dias úteis.",
  "O Samply é mantido por uma pequena equipe da Universidade de Konstanz. Não podemos responder a perguntas sobre um estudo específico, e encaminhá-las só atrasa a sua resposta — por isso, envie essas perguntas ao pesquisador.",
]);
