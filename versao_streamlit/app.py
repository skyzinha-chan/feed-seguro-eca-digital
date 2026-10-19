# -*- coding: utf-8 -*-
"""
===============================================================================
PROJETO PRÁTICO - SEMINÁRIO ECA DIGITAL
Aplicação: Feed Seguro - Simulador de Riscos Digitais
Responsável (Pilar de Programação): Talita Mendonça Marques (Integrante B)
Tecnologia: Python + Streamlit
===============================================================================
Como executar no terminal:
    pip install streamlit
    streamlit run app.py
"""

import streamlit as st

# Configuração da página com foco em visualização Mobile (centralizada)
st.set_page_config(
    page_title="Feed Seguro - ECA Digital",
    page_icon="🛡️",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# Estilo CSS customizado para deixar o Streamlit com aparência de Rede Social Mobile
st.markdown(
    """
    <style>
    .post-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        margin-bottom: 16px;
        color: #1e293b;
    }
    .post-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }
    .avatar-circle {
        font-size: 28px;
        background: #e0e7ff;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .post-author {
        font-weight: 800;
        font-size: 1.05rem;
        color: #0f172a;
        margin: 0;
    }
    .post-handle {
        font-size: 0.82rem;
        color: #64748b;
        margin: 0;
    }
    .post-badge {
        background: #eef2ff;
        color: #4f46e5;
        padding: 3px 10px;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: 700;
        margin-left: auto;
    }
    .post-text {
        font-size: 0.98rem;
        line-height: 1.55;
        color: #1e293b;
        margin: 14px 0;
    }
    .post-media {
        background: #f8fafc;
        border: 1px dashed #cbd5e1;
        border-radius: 10px;
        padding: 10px 14px;
        margin-bottom: 12px;
        font-size: 0.88rem;
        color: #334155;
    }
    .post-footer {
        border-top: 1px solid #f1f5f9;
        padding-top: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #64748b;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# ==============================================================================
# 1. BASE DE DADOS DOS POSTS (ESTRUTURA DO FEED INTERATIVO)
# ==============================================================================
POSTS_DO_FEED = [
    {
        "id": 1,
        "autor": "Robux & Skins Grátis Oficial",
        "arroba": "@premios_games_br • Patrocinado",
        "avatar": "🎮",
        "tipo": "Anúncio no Feed",
        "texto": (
            "🔥 ÚLTIMAS VAGAS! Liberamos 10.000 moedas grátis para os primeiros 50 "
            "jogadores que preencherem o formulário com login, senha do jogo e CPF "
            "dos pais! Corre antes que acabe!"
        ),
        "midia_titulo": "🎁 RESGATAR MOEDAS GRÁTIS AGORA",
        "midia_url": "http://robux-gratis-premio-urgente.xyz/login",
        "curtidas": "❤️ 4.512 curtidas",
        "comentarios": "💬 892 comentários",
        "gabarito": "PERIGO",
        "categoria": "Golpes Digitais e Phishing",
        "explicacao": (
            "Golpistas usam promessas de recompensas grátis em jogos e senso de "
            "urgência para roubar senhas e dados bancários/CPF dos responsáveis (Phishing)."
        ),
        "pilar_eca": "ECA Digital: Proteção contra exploração comercial, fraudes e coleta ilegal de dados de menores.",
    },
    {
        "id": 2,
        "autor": "Grêmio Estudantil Escola Estadual",
        "arroba": "@gremio_escola_oficial • há 2 h",
        "avatar": "🏫",
        "tipo": "Post Institucional",
        "texto": (
            "Pessoal! Nesta sexta-feira acontecerá a nossa Mostra de Robótica e Ciências "
            "no pátio principal, das 9h às 11h30. Tragam seus cadernos de anotação. "
            "Não é necessário inscrição prévia!"
        ),
        "midia_titulo": "🤖 Mostra de Robótica e Ciências - Mural Oficial",
        "midia_url": "Comunicado interno escolar (sem coleta de dados)",
        "curtidas": "❤️ 189 curtidas",
        "comentarios": "💬 24 comentários",
        "gabarito": "SEGURO",
        "categoria": "Uso Saudável e Informativo",
        "explicacao": (
            "Esta é uma publicação informativa de uma fonte escolar conhecida, que não "
            "pede dados pessoais, senhas, fotos íntimas nem direciona para links suspeitos."
        ),
        "pilar_eca": "ECA Digital: Direito ao acesso à informação, educação e participação comunitária segura.",
    },
    {
        "id": 3,
        "autor": "Lucas_Fotografo_Teens",
        "arroba": "@lucas_casting_oficial • Mensagem Direta (DM)",
        "avatar": "📸",
        "tipo": "Pedido no Direct (DM)",
        "texto": (
            "Oi! Vi seu perfil e achei que você leva muito jeito para modelo! Trabalho com "
            "uma agência secreta. Me manda seu WhatsApp, o endereço da sua casa e algumas "
            "fotos suas no quarto para eu avaliar? Não conta pros seus pais ainda pra fazer surpresa!"
        ),
        "midia_titulo": "🔒 Solicitação de Mensagem Privada (Desconhecido)",
        "midia_url": "Perfil criado há 2 dias • 0 publicações",
        "curtidas": "⚠️ Conta não verificada",
        "comentarios": "🔒 Mensagem privada",
        "gabarito": "PERIGO",
        "categoria": "Contato com Desconhecidos / Aliciamento",
        "explicacao": (
            "Alerta máximo! Perfis desconhecidos que elogiam excessivamente, pedem endereço/fotos "
            "e pedem segredo dos pais são um forte sinal de aliciamento (grooming)."
        ),
        "pilar_eca": "ECA Digital: Proteção integral da dignidade, integridade física/psíquica e prevenção ao aliciamento online.",
    },
    {
        "id": 4,
        "autor": "Mariana_14anos",
        "arroba": "@mari_vlog_diario • Agora mesmo",
        "avatar": "🤳",
        "tipo": "Stories Público",
        "texto": (
            "Meus pais viajaram hoje e vou ficar sozinha em casa até domingo!! 🎉 "
            "Moro aqui na Rua das Palmeiras, nº 412, portão azul. Meu crachá da escola "
            "com meu RG saiu na foto mas nem ligo haha!"
        ),
        "midia_titulo": "📍 Localização em Tempo Real Ativada",
        "midia_url": "Rua das Palmeiras, 412 • Público para todos",
        "curtidas": "❤️ 63 curtidas",
        "comentarios": "💬 19 comentários",
        "gabarito": "PERIGO",
        "categoria": "Exposição de Informações Pessoais",
        "explicacao": (
            "Publicar endereço residencial, documentos (RG/crachá) e avisar que está sozinho(a) "
            "em casa em perfil aberto expõe o adolescente a riscos físicos e roubo de identidade."
        ),
        "pilar_eca": "ECA Digital: Direito à privacidade, proteção de dados pessoais e preservação da imagem.",
    },
    {
        "id": 5,
        "autor": "Fofocas_7Ano_Anonimo",
        "arroba": "@exposed_da_escola • há 40 min",
        "avatar": "😈",
        "tipo": "Post no Feed",
        "texto": (
            "Olhem o meme que fizemos zoando a aparência do aluno novo da sala! 😂 "
            "Curtam e compartilhem no grupo geral pra todo mundo rir dele amanhã no recreio! #ZoeiraSemLimites"
        ),
        "midia_titulo": "🚫 Montagem ofensiva sem consentimento",
        "midia_url": "Denunciar publicação por assédio",
        "curtidas": "❤️ 31 curtidas",
        "comentarios": "💬 45 comentários",
        "gabarito": "PERIGO",
        "categoria": "Cyberbullying e Violência Digital",
        "explicacao": (
            "Criar, curtir ou compartilhar montagens para humilhar colegas na internet é Cyberbullying. "
            "Engajar nesse conteúdo amplia a violência psicológica contra a vítima."
        ),
        "pilar_eca": "ECA Digital: Combate à intimidação sistemática (cyberbullying) e dever de respeito aos direitos humanos.",
    },
    {
        "id": 6,
        "autor": "Canal SaferNet / Proteção Digital",
        "arroba": "@safernet_dicas • há 3 h",
        "avatar": "🛡️",
        "tipo": "Campanha Educativa",
        "texto": (
            "💡 Dica rápida de segurança: Ative a verificação em duas etapas (2FA) nas suas redes "
            "sociais e deixe seu perfil privado para que apenas amigos que você realmente conhece vejam seus stories!"
        ),
        "midia_titulo": "✅ Guia de Privacidade para Adolescentes",
        "midia_url": "Configurações > Privacidade e Segurança",
        "curtidas": "❤️ 940 curtidas",
        "comentarios": "💬 52 comentários",
        "gabarito": "SEGURO",
        "categoria": "Educação e Cidadania Digital",
        "explicacao": (
            "Conteúdos educativos que orientam a ativar a autenticação em duas etapas e manter o "
            "perfil privado ajudam a proteger sua conta contra invasões."
        ),
        "pilar_eca": "ECA Digital: Promoção da educação digital e do uso seguro e autônomo da tecnologia.",
    },
]


# ==============================================================================
# 2. GERENCIAMENTO DE ESTADO DA SESSÃO (SESSION STATE)
# ==============================================================================
def inicializar_estado():
    if "iniciado" not in st.session_state:
        st.session_state.iniciado = False
    if "indice_atual" not in st.session_state:
        st.session_state.indice_atual = 0
    if "acertos" not in st.session_state:
        st.session_state.acertos = 0
    if "erros" not in st.session_state:
        st.session_state.erros = 0
    if "historico" not in st.session_state:
        st.session_state.historico = []
    if "respondido" not in st.session_state:
        st.session_state.respondido = False
    if "ultima_escolha" not in st.session_state:
        st.session_state.ultima_escolha = None


def reiniciar_simulacao():
    st.session_state.iniciado = True
    st.session_state.indice_atual = 0
    st.session_state.acertos = 0
    st.session_state.erros = 0
    st.session_state.historico = []
    st.session_state.respondido = False
    st.session_state.ultima_escolha = None


# ==============================================================================
# 3. ALGORITMO DE VERIFICAÇÃO DE RESPOSTA ("SEGURO" OU "PERIGO")
# ==============================================================================
def registrar_escolha(escolha_usuario: str):
    post = POSTS_DO_FEED[st.session_state.indice_atual]
    acertou = escolha_usuario == post["gabarito"]

    if acertou:
        st.session_state.acertos += 1
    else:
        st.session_state.erros += 1

    st.session_state.historico.append(
        {
            "id": post["id"],
            "autor": post["autor"],
            "categoria": post["categoria"],
            "escolha": escolha_usuario,
            "gabarito": post["gabarito"],
            "acertou": acertou,
            "explicacao": post["explicacao"],
            "pilar_eca": post["pilar_eca"],
        }
    )
    st.session_state.respondido = True
    st.session_state.ultima_escolha = escolha_usuario


def avancar_post():
    st.session_state.indice_atual += 1
    st.session_state.respondido = False
    st.session_state.ultima_escolha = None


# ==============================================================================
# 4. INTERFACE PRINCIPAL E FLUXO DE TELAS
# ==============================================================================
inicializar_estado()

# Cabeçalho da Aplicação
st.title("🛡️ Feed Seguro")
st.caption("Simulador Interativo de Riscos Digitais • Baseado no ECA Digital")

# TELA 1: BOAS-VINDAS
if not st.session_state.iniciado:
    st.info(
        "📱 **Como funciona:** Você verá postagens e mensagens que simulam um feed de rede social. "
        "Analise cada situação com atenção e clique em **✅ SEGURO** ou **⚠️ PERIGO**."
    )
    st.markdown(
        """
        **O que você vai treinar neste simulador:**
        - Identificação de **golpes digitais e phishing** (falsos prêmios/moedas);
        - Prevenção contra **contato mal-intencionado de desconhecidos**;
        - Cuidado com a **exposição excessiva de dados pessoais e localização**;
        - Combate ao **cyberbullying** e valorização da cidadania digital.
        """
    )
    if st.button("🚀 Iniciar Simulação Agora", use_container_width=True, type="primary"):
        reiniciar_simulacao()
        st.rerun()

# TELA 2: FEED INTERATIVO
elif st.session_state.indice_atual < len(POSTS_DO_FEED):
    indice = st.session_state.indice_atual
    total = len(POSTS_DO_FEED)
    post = POSTS_DO_FEED[indice]

    # Barra de progresso
    st.progress((indice) / total, text=f"Analisando situação {indice + 1} de {total}")

    # Renderização do Card do Post (Estilo Rede Social)
    st.markdown(
        f"""
        <div class="post-card">
            <div class="post-header">
                <div class="avatar-circle">{post["avatar"]}</div>
                <div>
                    <p class="post-author">{post["autor"]}</p>
                    <p class="post-handle">{post["arroba"]}</p>
                </div>
                <span class="post-badge">{post["tipo"]}</span>
            </div>
            <div class="post-text">{post["texto"]}</div>
            <div class="post-media">
                <strong>{post["midia_titulo"]}</strong><br>
                <span style="color:#2563eb; font-size:0.8rem;">{post["midia_url"]}</span>
            </div>
            <div class="post-footer">
                <span>{post["curtidas"]}</span>
                <span>{post["comentarios"]}</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # Se ainda não respondeu o post atual, exibe os botões "Seguro" e "Perigo"
    if not st.session_state.respondido:
        st.write("**Como você classifica esta postagem/mensagem?**")
        col1, col2 = st.columns(2)
        with col1:
            if st.button("✅ SEGURO", use_container_width=True):
                registrar_escolha("SEGURO")
                st.rerun()
        with col2:
            if st.button("⚠️ PERIGO", use_container_width=True):
                registrar_escolha("PERIGO")
                st.rerun()
    else:
        # Exibe o Feedback Imediato da escolha
        ultimo = st.session_state.historico[-1]
        if ultimo["acertou"]:
            st.success(f"🎯 **Você acertou!** Esta situação é **{post['gabarito']}**.")
        else:
            st.error(
                f"🚨 **Atenção!** Você marcou **{ultimo['escolha']}**, mas esta situação é **{post['gabarito']}**."
            )

        st.markdown(f"**Explicação:** {post['explicacao']}")
        st.caption(f"📌 **{post['pilar_eca']}**")

        texto_botao = (
            "📊 Ver Diagnóstico Educativo Final"
            if indice == total - 1
            else "Próximo Post ➡️"
        )
        if st.button(texto_botao, use_container_width=True, type="primary"):
            avancar_post()
            st.rerun()

# TELA 3: ALGORITMO DE DIAGNÓSTICO EDUCATIVO FINAL
else:
    st.progress(1.0, text="Simulação concluída!")
    st.subheader("📊 Diagnóstico Educativo Final")

    total = len(POSTS_DO_FEED)
    acertos = st.session_state.acertos
    erros = st.session_state.erros
    percentual = round((acertos / total) * 100)

    # Métricas de Desempenho
    col1, col2, col3 = st.columns(3)
    col1.metric("✅ Acertos", acertos)
    col2.metric("❌ Erros", erros)
    col3.metric("📈 Aproveitamento", f"{percentual}%")

    st.divider()

    # Classificação condicional de Nível de Segurança Digital
    if percentual >= 80:
        st.success(
            "🏆 **Nível: Guardião(ã) Digital!**\n\n"
            "Excelente desempenho! Você identificou com precisão a maioria das armadilhas digitais. "
            "Você compreende bem os riscos de phishing, exposição de dados e aliciamento previstos no **ECA Digital**."
        )
    elif percentual >= 50:
        st.warning(
            "🧐 **Nível: Navegador(a) em Alerta!**\n\n"
            "Bom começo, mas cuidado! Você reconheceu parte dos riscos, porém ainda deixou passar situações perigosas. "
            "Lembre-se: golpistas e perfis falsos usam promessas fáceis ou pedidos de segredo para enganar adolescentes."
        )
    else:
        st.error(
            "🚨 **Nível: Alta Vulnerabilidade Digital!**\n\n"
            "Sinal Vermelho! Você caiu em várias armadilhas comuns das redes sociais. "
            "Nunca informe senhas, endereço ou fotos para desconhecidos e desconfie de prêmios fáceis. "
            "O **ECA Digital** garante sua proteção, mas conhecer esses sinais é essencial!"
        )

    # Detalhamento item a item
    st.markdown("### 📋 Revisão Detalhada por Situação e Direitos do ECA Digital")
    for idx, item in enumerate(st.session_state.historico, start=1):
        icone = "✅" if item["acertou"] else "❌"
        titulo_item = f"{icone} Post {idx}: {item['categoria']} (Sua resposta: {item['escolha']} | Correto: {item['gabarito']})"
        with st.expander(titulo_item, expanded=not item["acertou"]):
            st.write(f"**Análise:** {item['explicacao']}")
            st.caption(f"📌 **{item['pilar_eca']}**")

    st.divider()
    if st.button("🔄 Jogar Novamente", use_container_width=True, type="primary"):
        reiniciar_simulacao()
        st.rerun()

