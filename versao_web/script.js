/**
 * ============================================================================
 * LÓGICA DE PROGRAMAÇÃO DO SIMULADOR "FEED SEGURO" (ECA DIGITAL)
 * Autora da Lógica e Algoritmo: Talita Mendonça Marques (Pilar de Programação)
 * ============================================================================
 * Estrutura do Algoritmo:
 * 1. Base de Dados de Situações do Feed (postsDoFeed)
 * 2. Controle de Estado (índice atual, acertos, erros, histórico de respostas)
 * 3. Funções de Renderização do Feed Interativo
 * 4. Algoritmo de Verificação ("SEGURO" vs "PERIGO")
 * 5. Algoritmo de Diagnóstico Educativo Final (classificação por perfil e ECA Digital)
 */

// 1. BASE DE DADOS DOS POSTS (Cenários oficiais elaborados pelo Integrante A - Leonardo Vinicius)
const postsDoFeed = [
    {
        id: 1,
        autor: "Comunidade Secreta",
        arroba: "@comunidade_secreta • Agora mesmo",
        avatar: "🕵️",
        tipo: "Convite de Servidor",
        texto: "Venha assistir à nossa transmissão ao vivo (Go Live) em servidor fechado com desafios extremos e secretos!",
        midiaIcone: "📡",
        midiaTitulo: "Link para transmissão ao vivo suspeita",
        midiaUrl: " Servidor fechado • Sem moderação",
        curtidas: "❤️ 84 curtidas",
        comentarios: "💬 39 comentários",
        gabarito: "PERIGO",
        categoria: "Suspensão e Conteúdo Nocivo (Caso Discord)",
        explicacao: "Transmissões ao vivo sem moderação em servidores fechados podem facilitar o contato com conteúdos de violência ou automutilação.",
        pilarEca: "ECA Digital: Segurança por Padrão e Moderação de Conteúdo."
    },
    {
        id: 2,
        autor: "Quiz Divertido BR",
        arroba: "@quiz_divertido_br • Patrocinado",
        avatar: "🎯",
        tipo: "Quiz Interativo",
        texto: "Descubra qual personagem de anime você é! Basta preencher seu nome completo, escola onde estuda e idade para ver o resultado.",
        midiaIcone: "📝",
        midiaTitulo: "Formulário de Quiz de Personalidade",
        midiaUrl: "Coleta de nome completo, escola e idade",
        curtidas: "❤️ 2.310 curtidas",
        comentarios: "💬 614 comentários",
        gabarito: "PERIGO",
        categoria: "Coleta Ilegal de Dados e Publicidade",
        explicacao: "Testes online muitas vezes são usados para coletar dados excessivos e criar perfilamento comportamental de crianças e adolescentes.",
        pilarEca: "ECA Digital: Proteção contra a publicidade direcionada e Proteção de Dados."
    },
    {
        id: 3,
        autor: "SaferNet Brasil Oficial",
        arroba: "@safernet_oficial • Canal Verificado ✓",
        avatar: "🛡️",
        tipo: "Informação Segura",
        texto: "Você sabia que navegar com segurança é navegar com liberdades? Conheça nossos canais de denúncia anônima.",
        midiaIcone: "🌐",
        midiaTitulo: "www.safernet.org.br/denuncie",
        midiaUrl: "Canal oficial e gratuito de apoio e denúncia",
        curtidas: "❤️ 1.540 curtidas",
        comentarios: "💬 98 comentários",
        gabarito: "SEGURO",
        categoria: "Informação Segura",
        explicacao: "Instituições da sociedade civil, como a SaferNet, oferecem canais seguros e gratuitos para reportar violências e conteúdos inadequados.",
        pilarEca: "ECA Digital: Cidadania Digital."
    },
    {
        id: 4,
        autor: "Influencer Milionário",
        arroba: "@influencer_milionario • Patrocinado",
        avatar: "🐯",
        tipo: "Anúncio no Feed",
        texto: "Quer ganhar dinheiro fácil para comprar aquele celular novo? Jogue no tigre agora, é rápido e qualquer um ganha!",
        midiaIcone: "🎰",
        midiaTitulo: "www.jogodotigrefacil.com (Banner chamativo de roleta)",
        midiaUrl: "Apostas online • Promessa de ganho fácil",
        curtidas: "❤️ 5.120 curtidas",
        comentarios: "💬 1.042 comentários",
        gabarito: "PERIGO",
        categoria: "Jogos de Apostas e Publicidade Ilegal",
        explicacao: "É expressamente proibida a comunicação mercadológica de jogos de apostas direcionada a crianças e adolescentes. As marcas não podem usar imagens de menores ou incentivá-los à prática de apostas.",
        pilarEca: "ECA Digital: Jogo Responsável e Proteção contra Publicidade Direcionada."
    },
    {
        id: 5,
        autor: "Vlog da Bia",
        arroba: "@vlog_da_bia • há 10 min",
        avatar: "🤳",
        tipo: "Stories Público",
        texto: "Mostrando meu uniforme novo! Todo dia pego o ônibus das 06:30h sozinha na praça central para ir à Escola Estadual Mário de Andrade. Venham me dar oi!",
        midiaIcone: "📸",
        midiaTitulo: "Foto com uniforme escolar na rua",
        midiaUrl: "Localização e rotina diária expostas publicamente",
        curtidas: "❤️ 112 curtidas",
        comentarios: "💬 27 comentários",
        gabarito: "PERIGO",
        categoria: "Superexposição e Vigilantismo",
        explicacao: "A superexposição da rotina, horários exatos e identificação do local de estudo facilita o rastreio na vida real, expondo o jovem a riscos físicos e vigilantismo.",
        pilarEca: "ECA Digital: Privacidade e Segurança Física."
    },
    {
        id: 6,
        autor: "Verdade Oculta",
        arroba: "@verdade_oculta_00 • há 25 min",
        avatar: "🚫",
        tipo: "Post Denunciado",
        texto: "Eles não merecem estar no mesmo espaço que nós. Compartilhem essa imagem para mostrar quem é superior de verdade.",
        midiaIcone: "⚠️",
        midiaTitulo: "Imagem contendo símbolos de intolerância",
        midiaUrl: "Conteúdo discriminatório e discurso de ódio",
        curtidas: "❤️ 12 curtidas",
        comentarios: "💬 83 comentários",
        gabarito: "PERIGO",
        categoria: "Discurso de Ódio / Racismo",
        explicacao: "Propagar racismo, neo-nazismo ou homofobia na internet é crime. O ambiente digital não é terra sem lei e o discurso de ódio não está protegido pela liberdade de expressão.",
        pilarEca: "ECA Digital: Proteção contra Violências e Respeito à Dignidade."
    },
    {
        id: 7,
        autor: "Cetic.br Oficial",
        arroba: "@cetic_br_oficial • Canal Verificado ✓",
        avatar: "📊",
        tipo: "Divulgação Científica",
        texto: "Saiu a nova pesquisa TIC Kids Online! Descubra como entender as oportunidades e os riscos relacionados à sua participação online.",
        midiaIcone: "📘",
        midiaTitulo: "Link para o relatório TIC Kids Online Brasil",
        midiaUrl: "cetic.br • Pesquisa oficial sobre uso da internet",
        curtidas: "❤️ 875 curtidas",
        comentarios: "💬 41 comentários",
        gabarito: "SEGURO",
        categoria: "Informação Científica Segura",
        explicacao: "Consumir pesquisas oficiais como a da UNESCO/Cetic.br ajuda os adolescentes a compreenderem a internet e incentiva o diálogo com pais ou responsáveis sobre a mediação digital.",
        pilarEca: "ECA Digital: Cidadania Digital e Mediação Parental."
    },
    {
        id: 8,
        autor: "Fofocas da Escola",
        arroba: "@fofocas_da_escola • há 15 min",
        avatar: "😈",
        tipo: "Post Anônimo",
        texto: "Vazou a foto do fulano no vestiário! Cliquem no link antes que derrubem a página hahaha",
        midiaIcone: "🔗",
        midiaTitulo: "Link malicioso disfarçado de fofoca",
        midiaUrl: "Violação de intimidade + Link suspeito",
        curtidas: "❤️ 49 curtidas",
        comentarios: "💬 116 comentários",
        gabarito: "PERIGO",
        categoria: "Cyberbullying / Exposição de Imagens Íntimas",
        explicacao: "O compartilhamento não consensual de imagens íntimas e o cyberbullying são graves violações. Além de humilhar a vítima, links sensacionalistas são iscas comuns para fraudes e vírus.",
        pilarEca: "ECA Digital: Respeito à Privacidade e Combate ao Cyberbullying."
    },
    {
        id: 9,
        autor: "Atendimento Banco Seguro",
        arroba: "@atendimento_banco_seguro • Mensagem Direta (DM)",
        avatar: "🏦",
        tipo: "Alerta Falso (Phishing)",
        texto: "Notamos uma transação suspeita na sua conta. Para evitar o bloqueio, faça um PIX teste para a chave abaixo ou acesse o link de segurança.",
        midiaIcone: "💸",
        midiaTitulo: "Link falso de central de atendimento bancário",
        midiaUrl: "Solicitação fraudulenta de PIX / Senha",
        curtidas: "⚠️ Conta não oficial",
        comentarios: "🔒 Mensagem privada",
        gabarito: "PERIGO",
        categoria: "Fraudes Bancárias Digitais (Golpes)",
        explicacao: "Instituições oficiais nunca pedem transferências ou senhas por redes sociais para cancelar fraudes. Esta é uma das armadilhas mais comuns de fraudes bancárias digitais.",
        pilarEca: "ECA Digital: Segurança Digital e Combate a Fraudes."
    },
    {
        id: 10,
        autor: "Ministério da Justiça",
        arroba: "@ministerio_justica • Órgão Oficial ✓",
        avatar: "⚖️",
        tipo: "Campanha Educativa",
        texto: "Antes de baixar um jogo novo, sempre verifique o selo de Classificação Indicativa. Ele garante que o conteúdo é adequado para a sua idade!",
        midiaIcone: "🟢",
        midiaTitulo: 'Selo verde de Classificação "L" (Livre)',
        midiaUrl: "gov.br/mj • Classificação Indicativa Oficial",
        curtidas: "❤️ 2.190 curtidas",
        comentarios: "💬 134 comentários",
        gabarito: "SEGURO",
        categoria: "Uso Consciente e Defesa do Consumidor",
        explicacao: "A Classificação Indicativa é um serviço oficial do Ministério da Justiça que protege crianças e adolescentes do contato precoce com conteúdos impróprios (violência, drogas, etc).",
        pilarEca: "ECA Digital: Classificação Indicativa e Educação Digital."
    }
];

// 2. VARIÁVEIS DE ESTADO DO ALGORITMO
let indiceAtual = 0;
let totalAcertos = 0;
let totalErros = 0;
let historicoRespostas = [];

// Referências aos elementos do DOM
const welcomeScreen = document.getElementById("welcome-screen");
const feedScreen = document.getElementById("feed-screen");
const resultScreen = document.getElementById("result-screen");

const currentIndexDisplay = document.getElementById("current-index-display");
const totalPostsDisplay = document.getElementById("total-posts-display");
const progressBar = document.getElementById("progress-bar");

// Evento do botão inicial
document.getElementById("btn-start").addEventListener("click", iniciarSimulacao);

/**
 * Inicializa ou reseta a simulação
 */
function iniciarSimulacao() {
    indiceAtual = 0;
    totalAcertos = 0;
    totalErros = 0;
    historicoRespostas = [];

    totalPostsDisplay.textContent = postsDoFeed.length;
    trocarTela(feedScreen);
    carregarPostAtual();
}

/**
 * Alterna entre as telas (Boas-vindas, Feed, Diagnóstico)
 */
function trocarTela(telaAtiva) {
    [welcomeScreen, feedScreen, resultScreen].forEach(tela => {
        tela.classList.remove("active");
    });
    telaAtiva.classList.add("active");
}

/**
 * 3. RENDERIZAÇÃO DO POST ATUAL NO FEED INTERATIVO
 */
function carregarPostAtual() {
    const post = postsDoFeed[indiceAtual];

    // Atualiza contador e barra de progresso
    currentIndexDisplay.textContent = indiceAtual + 1;
    const progressoPercentual = ((indiceAtual) / postsDoFeed.length) * 100;
    progressBar.style.width = `${progressoPercentual}%`;

    // Preenche os dados do post no card
    document.getElementById("post-avatar").textContent = post.avatar;
    document.getElementById("post-author").textContent = post.autor;
    document.getElementById("post-type-badge").textContent = post.tipo;
    document.getElementById("post-handle").textContent = post.arroba;
    document.getElementById("post-text").textContent = post.texto;
    document.getElementById("post-media-icon").textContent = post.midiaIcone;
    document.getElementById("post-media-title").textContent = post.midiaTitulo;
    document.getElementById("post-media-url").textContent = post.midiaUrl;
    document.getElementById("post-likes").textContent = post.curtidas;
    document.getElementById("post-comments").textContent = post.comentarios;

    // Mostra os botões de decisão e esconde o feedback anterior
    document.getElementById("decision-buttons").style.display = "block";
    const feedbackBox = document.getElementById("feedback-box");
    feedbackBox.className = "feedback-box hidden";
}

/**
 * 4. ALGORITMO DE VERIFICAÇÃO DE ESCOLHA ("SEGURO" OU "PERIGO")
 * @param {string} escolhaUsuario - "SEGURO" ou "PERIGO"
 */
function avaliarPost(escolhaUsuario) {
    const post = postsDoFeed[indiceAtual];
    const acertou = (escolhaUsuario === post.gabarito);

    // Contabiliza acertos e erros
    if (acertou) {
        totalAcertos++;
    } else {
        totalErros++;
    }

    // Registra no histórico para gerar o Diagnóstico Educativo no final
    historicoRespostas.push({
        id: post.id,
        autor: post.autor,
        categoria: post.categoria,
        escolhaUsuario: escolhaUsuario,
        gabarito: post.gabarito,
        acertou: acertou,
        explicacao: post.explicacao,
        pilarEca: post.pilarEca
    });

    // Oculta botões de escolha para evitar duplo clique
    document.getElementById("decision-buttons").style.display = "none";

    // Exibe caixa de feedback educativo imediato
    const feedbackBox = document.getElementById("feedback-box");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackExplanation = document.getElementById("feedback-explanation");
    const feedbackEca = document.getElementById("feedback-eca");
    const btnNext = document.getElementById("btn-next");

    feedbackBox.classList.remove("hidden");
    if (acertou) {
        feedbackBox.classList.add("correct-feedback");
        feedbackTitle.textContent = `🎯 Você acertou! Este post é ${post.gabarito}.`;
    } else {
        feedbackBox.classList.add("wrong-feedback");
        feedbackTitle.textContent = `🚨 Atenção! Você marcou "${escolhaUsuario}", mas o correto é ${post.gabarito}.`;
    }

    feedbackExplanation.textContent = post.explicacao;
    feedbackEca.textContent = `📌 ${post.pilarEca}`;

    // Verifica se é o último post para mudar o texto do botão
    if (indiceAtual === postsDoFeed.length - 1) {
        btnNext.textContent = "Ver Diagnóstico Educativo Final 📊";
    } else {
        btnNext.textContent = "Próximo Post ➡️";
    }
}

/**
 * Avança para o próximo post ou chama o Diagnóstico Final
 */
function proximoPost() {
    indiceAtual++;
    if (indiceAtual < postsDoFeed.length) {
        carregarPostAtual();
    } else {
        progressBar.style.width = "100%";
        gerarDiagnosticoEducativo();
    }
}

/**
 * 5. ALGORITMO DE DIAGNÓSTICO EDUCATIVO FINAL
 * Calcula o percentual de aproveitamento, classifica o nível de segurança
 * do usuário e lista orientações personalizadas com base nos acertos/erros.
 */
function gerarDiagnosticoEducativo() {
    trocarTela(resultScreen);

    const totalQuestoes = postsDoFeed.length;
    const percentual = Math.round((totalAcertos / totalQuestoes) * 100);

    // Preenche placar numérico
    document.getElementById("score-correct").textContent = totalAcertos;
    document.getElementById("score-wrong").textContent = totalErros;
    document.getElementById("score-percent").textContent = `${percentual}%`;

    const resultIcon = document.getElementById("result-icon");
    const resultLevelTitle = document.getElementById("result-level-title");
    const diagnosticText = document.getElementById("diagnostic-text");

    // Estrutura condicional do diagnóstico educativo
    if (percentual >= 80) {
        resultIcon.textContent = "🛡️🏆";
        resultLevelTitle.textContent = "Nível: Guardião(ã) Digital!";
        diagnosticText.innerHTML = `
            <strong>Excelente desempenho!</strong> Você identificou com precisão a maioria das armadilhas digitais. 
            Você compreende bem os riscos de phishing, exposição de dados e aliciamento previstos no <strong>ECA Digital</strong>. 
            Continue compartilhando boas práticas com seus colegas!
        `;
    } else if (percentual >= 50) {
        resultIcon.textContent = "🧐⚠️";
        resultLevelTitle.textContent = "Nível: Navegador(a) em Alerta";
        diagnosticText.innerHTML = `
            <strong>Bom começo, mas cuidado!</strong> Você reconheceu parte dos riscos, porém ainda deixou passar situações perigosas. 
            Lembre-se: golpistas e perfis falsos usam promessas fáceis ou pedidos de segredo para enganar adolescentes. 
            Revise abaixo os pontos em que você escorregou!
        `;
    } else {
        resultIcon.textContent = "🚨🆘";
        resultLevelTitle.textContent = "Nível: Alta Vulnerabilidade Digital";
        diagnosticText.innerHTML = `
            <strong>Sinal Vermelho!</strong> Você caiu em várias armadilhas comuns das redes sociais. 
            Nunca informe senhas, endereço ou fotos para desconhecidos e desconfie de prêmios fáceis. 
            O <strong>ECA Digital</strong> garante sua proteção, mas conhecer esses sinais é essencial para navegar com segurança!
        `;
    }

    // Monta a lista de revisão item a item
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    historicoRespostas.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = `review-item ${item.acertou ? "acertou" : "errou"}`;

        const statusEmoji = item.acertou ? "✅ Acertou" : "❌ Errou";
        div.innerHTML = `
            <strong>Post ${index + 1} (${item.categoria}) — ${statusEmoji}</strong>
            <span>Sua escolha: <b>${item.escolhaUsuario}</b> | Correto: <b>${item.gabarito}</b></span>
            <p style="margin-top:4px; color:#475569;">${item.explicacao}</p>
        `;
        reviewList.appendChild(div);
    });
}

/**
 * Reinicia o simulador para um novo teste
 */
function reiniciarSimulador() {
    iniciarSimulacao();
}

