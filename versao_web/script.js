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

// 1. BASE DE DADOS DOS POSTS (6 cenários iniciais da Talita + 10 cenários elaborados pelo Leonardo = 16 situações)
// Integrado com os avatares e banners visuais produzidos pelo Adriano Hazime (Integrante C)
const postsDoFeed = [
    // --- CENÁRIOS INICIAIS (TALITA) ---
    {
        id: 1,
        autor: "Robux & Skins Grátis Oficial",
        arroba: "@premios_games_br • Patrocinado",
        avatar: "🎮",
        avatarImg: "../assets/user_profile_boy_game.jpeg",
        bannerFeedback: "../assets/banner vermelho cuidado com os golpes..jpeg",
        tipo: "Anúncio no Feed",
        texto: "🔥 ÚLTIMAS VAGAS! Liberamos 10.000 moedas grátis para os primeiros 50 jogadores que preencherem o formulário com login, senha do jogo e CPF dos pais! Corre antes que acabe!",
        midiaIcone: "🎁",
        midiaTitulo: "RESGATAR MOEDAS GRÁTIS AGORA",
        midiaUrl: "http://robux-gratis-premio-urgente.xyz/login",
        curtidas: "❤️ 4.512 curtidas",
        comentarios: "💬 892 comentários",
        gabarito: "PERIGO",
        categoria: "Golpes Digitais e Phishing",
        explicacao: "Golpistas usam promessas de recompensas grátis em jogos e senso de urgência para roubar senhas e dados bancários/CPF dos responsáveis (Phishing).",
        pilarEca: "ECA Digital: Proteção contra exploração comercial, fraudes e coleta ilegal de dados de menores."
    },
    {
        id: 2,
        autor: "Grêmio Estudantil Escola Estadual",
        arroba: "@gremio_escola_oficial • há 2 h",
        avatar: "🏫",
        avatarImg: "../assets/user_profile_woman.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
        tipo: "Post Institucional",
        texto: "Pessoal! Nesta sexta-feira acontecerá a nossa Mostra de Robótica e Ciências no pátio principal, das 9h às 11h30. Tragam seus cadernos de anotação. Não é necessário inscrição prévia!",
        midiaIcone: "🤖",
        midiaTitulo: "Mostra de Robótica e Ciências - Mural Oficial",
        midiaUrl: "Comunicado interno escolar (sem coleta de dados)",
        curtidas: "❤️ 189 curtidas",
        comentarios: "💬 24 comentários",
        gabarito: "SEGURO",
        categoria: "Uso Saudável e Informativo",
        explicacao: "Esta é uma publicação informativa de uma fonte escolar conhecida, que não pede dados pessoais, senhas, fotos íntimas nem direciona para links suspeitos.",
        pilarEca: "ECA Digital: Direito ao acesso à informação, educação e participação comunitária segura."
    },
    {
        id: 3,
        autor: "Lucas_Fotografo_Teens",
        arroba: "@lucas_casting_oficial • Mensagem Direta (DM)",
        avatar: "📸",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner amarelo atencao a perfis falsos.jpeg",
        tipo: "Pedido no Direct (DM)",
        texto: "Oi! Vi seu perfil e achei que você leva muito jeito para modelo! Trabalho com uma agência secreta. Me manda seu WhatsApp, o endereço da sua casa e algumas fotos suas no quarto para eu avaliar? Não conta pros seus pais ainda pra fazer surpresa!",
        midiaIcone: "🔒",
        midiaTitulo: "Solicitação de Mensagem Privada (Desconhecido)",
        midiaUrl: "Perfil criado há 2 dias • 0 publicações",
        curtidas: "⚠️ Conta não verificada",
        comentarios: "🔒 Mensagem privada",
        gabarito: "PERIGO",
        categoria: "Contato com Desconhecidos / Aliciamento",
        explicacao: "Alerta máximo! Perfis desconhecidos que elogiam excessivamente, pedem endereço/fotos e pedem segredo dos pais são um forte sinal de aliciamento (grooming).",
        pilarEca: "ECA Digital: Proteção integral da dignidade, integridade física/psíquica e prevenção ao aliciamento online."
    },
    {
        id: 4,
        autor: "Mariana_14anos",
        arroba: "@mari_vlog_diario • Agora mesmo",
        avatar: "🤳",
        avatarImg: "../assets/user_profile_woman_II.jpeg",
        bannerFeedback: "../assets/banner azul proteja seus dados.jpeg",
        tipo: "Stories Público",
        texto: "Meus pais viajaram hoje e vou ficar sozinha em casa até domingo!! 🎉 Moro aqui na Rua das Palmeiras, nº 412, portão azul. Meu crachá da escola com meu RG saiu na foto mas nem ligo haha!",
        midiaIcone: "📍",
        midiaTitulo: "Localização em Tempo Real Ativada",
        midiaUrl: "Rua das Palmeiras, 412 • Público para todos",
        curtidas: "❤️ 63 curtidas",
        comentarios: "💬 19 comentários",
        gabarito: "PERIGO",
        categoria: "Exposição de Informações Pessoais",
        explicacao: "Publicar endereço residencial, documentos (RG/crachá) e avisar que está sozinho(a) em casa em perfil aberto expõe o adolescente a riscos físicos e roubo de identidade.",
        pilarEca: "ECA Digital: Direito à privacidade, proteção de dados pessoais e preservação da imagem."
    },
    {
        id: 5,
        autor: "Fofocas_7Ano_Anonimo",
        arroba: "@exposed_da_escola • há 40 min",
        avatar: "😈",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
        tipo: "Post no Feed",
        texto: "Olhem o meme que fizemos zoando a aparência do aluno novo da sala! 😂 Curtam e compartilhem no grupo geral pra todo mundo rir dele amanhã no recreio! #ZoeiraSemLimites",
        midiaIcone: "🚫",
        midiaTitulo: "Montagem ofensiva sem consentimento",
        midiaUrl: "Denunciar publicação por assédio",
        curtidas: "❤️ 31 curtidas",
        comentarios: "💬 45 comentários",
        gabarito: "PERIGO",
        categoria: "Cyberbullying e Violência Digital",
        explicacao: "Criar, curtir ou compartilhar montagens para humilhar colegas na internet é Cyberbullying. Engajar nesse conteúdo amplia a violência psicológica contra a vítima.",
        pilarEca: "ECA Digital: Combate à intimidação sistemática (cyberbullying) e dever de respeito aos direitos humanos."
    },
    {
        id: 6,
        autor: "Canal SaferNet / Proteção Digital",
        arroba: "@safernet_dicas • há 3 h",
        avatar: "🛡️",
        avatarImg: "../assets/user_profile_woman.jpeg",
        bannerFeedback: "../assets/banner azul proteja seus dados.jpeg",
        tipo: "Campanha Educativa",
        texto: "💡 Dica rápida de segurança: Ative a verificação em duas etapas (2FA) nas suas redes sociais e deixe seu perfil privado para que apenas amigos que você realmente conhece vejam seus stories!",
        midiaIcone: "✅",
        midiaTitulo: "Guia de Privacidade para Adolescentes",
        midiaUrl: "Configurações > Privacidade e Segurança",
        curtidas: "❤️ 940 curtidas",
        comentarios: "💬 52 comentários",
        gabarito: "SEGURO",
        categoria: "Educação e Cidadania Digital",
        explicacao: "Conteúdos educativos que orientam a ativar a autenticação em duas etapas e manter o perfil privado ajudam a proteger sua conta contra invasões.",
        pilarEca: "ECA Digital: Promoção da educação digital e do uso seguro e autônomo da tecnologia."
    },

    // --- CENÁRIOS PRODUZIDOS PELO LEONARDO VINICIUS (INTEGRANTE A) ---
    {
        id: 7,
        autor: "Comunidade Secreta",
        arroba: "@comunidade_secreta • Agora mesmo",
        avatar: "🕵️",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner amarelo atencao a perfis falsos.jpeg",
        tipo: "Convite de Servidor",
        texto: "Venha assistir à nossa transmissão ao vivo (Go Live) em servidor fechado com desafios extremos e secretos!",
        midiaIcone: "📡",
        midiaTitulo: "Link para transmissão ao vivo suspeita",
        midiaUrl: "Servidor fechado • Sem moderação",
        curtidas: "❤️ 84 curtidas",
        comentarios: "💬 39 comentários",
        gabarito: "PERIGO",
        categoria: "Suspensão e Conteúdo Nocivo (Caso Discord)",
        explicacao: "Transmissões ao vivo sem moderação em servidores fechados podem facilitar o contato com conteúdos de violência ou automutilação.",
        pilarEca: "ECA Digital: Segurança por Padrão e Moderação de Conteúdo."
    },
    {
        id: 8,
        autor: "Quiz Divertido BR",
        arroba: "@quiz_divertido_br • Patrocinado",
        avatar: "🎯",
        avatarImg: "../assets/user_profile_boy_game.jpeg",
        bannerFeedback: "../assets/banner azul proteja seus dados.jpeg",
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
        id: 9,
        autor: "SaferNet Brasil Oficial",
        arroba: "@safernet_oficial • Canal Verificado ✓",
        avatar: "🛡️",
        avatarImg: "../assets/user_profile_woman.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
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
        id: 10,
        autor: "Influencer Milionário",
        arroba: "@influencer_milionario • Patrocinado",
        avatar: "🐯",
        avatarImg: "../assets/user_profile_boy_game.jpeg",
        bannerFeedback: "../assets/banner vermelho cuidado com os golpes..jpeg",
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
        id: 11,
        autor: "Vlog da Bia",
        arroba: "@vlog_da_bia • há 10 min",
        avatar: "🤳",
        avatarImg: "../assets/user_profile_woman_II.jpeg",
        bannerFeedback: "../assets/banner azul proteja seus dados.jpeg",
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
        id: 12,
        autor: "Verdade Oculta",
        arroba: "@verdade_oculta_00 • há 25 min",
        avatar: "🚫",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner amarelo atencao a perfis falsos.jpeg",
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
        id: 13,
        autor: "Cetic.br Oficial",
        arroba: "@cetic_br_oficial • Canal Verificado ✓",
        avatar: "📊",
        avatarImg: "../assets/user_profile_woman.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
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
        id: 14,
        autor: "Fofocas da Escola",
        arroba: "@fofocas_da_escola • há 15 min",
        avatar: "😈",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
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
        id: 15,
        autor: "Atendimento Banco Seguro",
        arroba: "@atendimento_banco_seguro • Mensagem Direta (DM)",
        avatar: "🏦",
        avatarImg: "../assets/user_profile_artdeco_game.jpeg",
        bannerFeedback: "../assets/banner vermelho cuidado com os golpes..jpeg",
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
        id: 16,
        autor: "Ministério da Justiça",
        arroba: "@ministerio_justica • Órgão Oficial ✓",
        avatar: "⚖️",
        avatarImg: "../assets/user_profile_woman_II.jpeg",
        bannerFeedback: "../assets/banner verde pense antes de agir.jpeg",
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

    // Preenche os dados do post no card (usa foto de perfil do Adriano se disponível)
    const avatarEl = document.getElementById("post-avatar");
    if (post.avatarImg) {
        avatarEl.innerHTML = `<img src="${post.avatarImg}" alt="${post.autor}" class="avatar-img" onerror="this.parentElement.textContent='${post.avatar}'">`;
    } else {
        avatarEl.textContent = post.avatar;
    }
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

/**
 * ============================================================================
 * 6. NAVEGAÇÃO INFERIOR INTERATIVA E POP-UPS (ECA DIGITAL & PERFIL PROTEGIDO)
 * ============================================================================
 */
function atualizarAbaAtiva(idBotao) {
    document.querySelectorAll(".footer-nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    const alvo = document.getElementById(idBotao);
    if (alvo) alvo.classList.add("active");
}

function irParaTelaInicial() {
    fecharPopup();
    atualizarAbaAtiva("nav-inicio");
    indiceAtual = 0;
    currentIndexDisplay.textContent = 1;
    totalPostsDisplay.textContent = postsDoFeed.length;
    progressBar.style.width = "0%";
    trocarTela(welcomeScreen);
}

function abrirPopup(tipo) {
    const overlay = document.getElementById("popup-overlay");
    const title = document.getElementById("popup-title");
    const body = document.getElementById("popup-body");

    if (tipo === "ECA") {
        atualizarAbaAtiva("nav-eca");
        title.textContent = "🛡️ Lei do ECA Digital (O que é?)";
        body.innerHTML = `
            <p style="margin-bottom: 12px;">
                O <strong>ECA Digital</strong> estende a proteção integral do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990 e marcos de proteção no ambiente digital) para redes sociais, jogos e plataformas online.
            </p>
            <div class="popup-card-item">
                <strong>🔒 Segurança e Privacidade por Padrão</strong>
                As plataformas devem configurar contas de adolescentes com o nível máximo de privacidade por padrão, impedindo coleta abusiva de dados e perfilamento comercial.
            </div>
            <div class="popup-card-item">
                <strong>🚫 Combate ao Aliciamento e Cyberbullying</strong>
                É dever das redes oferecer canais ágeis de denúncia e moderação ativa contra intimidação sistemática (cyberbullying), discurso de ódio e aliciamento (grooming).
            </div>
            <div class="popup-card-item">
                <strong>🎰 Proibição de Jogos de Azar e Publicidade Predatória</strong>
                É proibido direcionar anúncios de apostas, roletas ou promessas enganosas de ganho financeiro para crianças e adolescentes.
            </div>
            <div class="popup-card-item">
                <strong>👨‍👩‍👧 Educação Digital e Mediação Parental</strong>
                Promove a autonomia progressiva do jovem aliada ao diálogo familiar e à verificação da Classificação Indicativa.
            </div>
        `;
    } else if (tipo === "PERFIL") {
        atualizarAbaAtiva("nav-perfil");
        title.textContent = "👤 O que é um Perfil Protegido?";
        body.innerHTML = `
            <p style="margin-bottom: 12px;">
                Ter um <strong>Perfil Protegido</strong> significa configurar suas redes e adotar hábitos que impedem golpistas e desconhecidos de acessarem sua vida pessoal:
            </p>
            <div class="popup-card-item">
                <strong>✅ 1. Conta Privada e Autenticação em 2 Etapas (2FA)</strong>
                Restrinja quem vê seus stories e ative o código de segurança extra para ninguém invadir seu perfil.
            </div>
            <div class="popup-card-item">
                <strong>✅ 2. Zero Exposição de Rotina e Documentos</strong>
                Nunca publique fotos com uniforme escolar, endereço de casa, horários em que está sozinho(a) ou documentos (RG/CPF).
            </div>
            <p style="margin: 14px 0 8px; font-weight: 700; color: #4f46e5;">
                📢 Cartazes Rápidos de Prevenção (Toque para observar):
            </p>
            <div class="popup-banners-list">
                <img src="../assets/banner azul proteja seus dados.jpeg" alt="Proteja os seus dados">
                <img src="../assets/banner amarelo atencao a perfis falsos.jpeg" alt="Atenção a perfis falsos">
                <img src="../assets/banner vermelho cuidado com os golpes..jpeg" alt="Cuidado com golpes">
                <img src="../assets/banner verde pense antes de agir.jpeg" alt="Pense antes de clicar">
            </div>
        `;
    }

    overlay.classList.remove("hidden");
}

function fecharPopup() {
    const overlay = document.getElementById("popup-overlay");
    if (overlay) overlay.classList.add("hidden");
    atualizarAbaAtiva("nav-inicio");
}

function fecharPopupExterno(event) {
    if (event.target.id === "popup-overlay") {
        fecharPopup();
    }
}


