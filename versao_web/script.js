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

// 1. BASE DE DADOS DOS POSTS (Pode ser expandida com o conteúdo do Integrante A - Leonardo)
const postsDoFeed = [
    {
        id: 1,
        autor: "Robux & Skins Grátis Oficial",
        arroba: "@premios_games_br • Patrocinado",
        avatar: "🎮",
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

