---
name: "Lara Alves — Portfólio 8-bit"
description: "Portfólio pessoal em formato de fase de plataforma 8-bit, com modo leitura direto"
colors:
  sky: "#5c94fc"
  sky-top: "#7db3ff"
  brick: "#d68a2e"
  brick-dark: "#8a4a1a"
  gold: "#ffd800"
  pipe: "#43b047"
  pipe-dark: "#2a7a2e"
  accent: "#e52521"
  accent-dark: "#b0120a"
  ink: "#202030"
  paper: "#f3ead8"
  wood: "#8a5a2b"
  wood-dark: "#6b3f1c"
  white: "#ffffff"
typography:
  display:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.01em"
  ui-pixel:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
spacing:
  zone: "1200px"
  hud-height: "56px"
  ground-height: "64px"
components:
  hud-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.ui-pixel}"
    padding: "8px 12px"
  hud-button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.ui-pixel}"
    padding: "8px 12px"
  content-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "24px 28px"
  text-link:
    textColor: "{colors.accent-dark}"
    typography: "{typography.ui-pixel}"
  skill-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.ui-pixel}"
    padding: "6px 8px"
---

# Design System: Lara Alves — Portfólio 8-bit

## Overview

**Creative North Star: "Fase Pixel 8-bit"**

O site inteiro é uma única fase de plataforma estilo Mario, desenhada com o vocabulário visual dos jogos 8-bit: céu azul saturado, chão de tijolos, blocos `?`, canos verdes, moedas douradas, placas de madeira e bandeira de chegada. O conteúdo (currículo e projetos de Lara Alves) vive em painéis de pergaminho com moldura de madeira que a fase revela conforme o jogador avança.

O compromisso visual é absoluto: nada aqui é "quase pixel". Cantos duros, bordas grossas de tinta, sombras sólidas sem desfoque, sprite desenhado pixel a pixel em canvas. A exceção deliberada e única é o modo leitura (`ver conteúdo`), que abandona o cenário e entrega o mesmo conteúdo em cartões calmos sobre fundo claro — a rota do coordenador.

**Key Characteristics:**
- Uma metáfora só, sustentada do HUD ao rodapé: a página é uma fase.
- Texto funcional nunca abaixo de 11px, mesmo na fonte pixelada.
- O vermelho `#e52521` é o acento do botão "ver conteúdo" (e vive no mundo: bandeira, camiseta do personagem); em texto sobre papel usa-se o tom escuro `--accent-dark` por contraste.
- Bordas sólidas escuras + sombra dura deslocada = profundidade; nunca blur.

## Colors

Paleta de console 8-bit: cores planas e saturadas, sem gradientes além do céu.

- **`--sky` / `--sky-top`**: fundo do mundo e gradiente superior do céu. Só cenário — nunca atrás de texto de leitura.
- **`--brick` / `--brick-dark`**: chão, castelo e superfícies de tijolo. Padrão em `repeating-linear-gradient`.
- **`--gold`**: moedas, banner de fase, marcadores de lista e anel de foco. Sinaliza "coletável/atenção".
- **`--pipe` / `--pipe-dark`**: canos e moitas. Obstáculo/cenário, nunca texto.
- **`--accent`**: reservado ao botão primário "ver conteúdo", à bandeira de chegada e à camiseta do personagem.
- **`--accent-dark`**: links e rótulos sobre papel. `#e52521` sobre `--paper` falha contraste; sempre usar o tom escuro em texto.
- **`--ink`**: texto principal, HUD, molduras, tags de habilidade. O "preto" do mundo.
- **`--paper` / `--wood` / `--wood-dark`**: painéis de conteúdo (pergaminho com moldura de madeira) e placas.
- **`--white`**: nuvens e texto sobre fundos escuros (HUD, acento).

## Typography

Duas famílias, dois papéis, sem intermediários.

- **`Press Start 2P`** (self-hosted, `fonts/PressStart2P-Regular.ttf`, OFL): todo texto de interface do jogo — título do céu, HUD, placas, títulos e links de painel, tags. Piso absoluto de **11px** em qualquer texto funcional; display do título em 42px (22px no mobile).
- **system-ui stack**: corpo de texto dentro dos painéis (15px/1.6). A fonte pixel é para voz de jogo, não para parágrafo de currículo.

## Layout

- **Mundo**: `#world` com largura fixa de 4 zonas × `--zone-w` (1200px) + folga; a câmera desliza o mundo com `translateX` seguindo o jogador.
- **Zonas**: blocos absolutos de 1200px; cada uma carrega cenário + um painel.
- **Painéis**: absolutos acima do chão (`bottom: ground+40`), 480px (560px wide), scroll interno com trilho de madeira; surgem com fade+rise ao entrar na zona.
- **HUD**: fixo no topo, 56px, moedas e zona à esquerda, ações à direita.
- **Modo leitura** (`body.reading`): o mesmo DOM deixa de ser jogo — `#world` vira fluxo estático vertical, painéis a `min(760px,100%)` sobre `#dfe9f5`, cenário oculto. `visibility` dos painéis vira `visible`.
- **Mobile** (≤720px): controles de toque ◀▲▶ visíveis, hint de teclado some, rótulo de zona do HUD some, título alinha à esquerda.
- **Sem-JS**: `<noscript>` força layout de leitura — a página nunca é um céu vazio.

## Elevation & Depth

Profundidade é construída por sombras duras deslocadas (`8px 8px 0 rgba(0,0,0,.3)` nos painéis, `0 4px 0` no HUD, `5px 5px`/`4px 4px` como contorno do título) e bordas grossas de tinta/madeira. É a linguagem de sprite: a sombra é um segundo plano de pixels, não luz. Isenção declarada via `data-impeccable-ignore="hard-offset-shadow"` — é intencional.

## Shapes

- Retângulos com cantos duros dominam: blocos `?`, tijolos, painéis, botões, HUD, tags.
- `border-radius` só aparece em formas orgânicas do cenário (nuvens, colinas, moitas, moedas) — shorthand aceito para as silhuetas SMB, nunca em superfícies de UI.
- Todo elemento interativo tem moldura sólida de 2–5px.

## Components

- **`hud-btn` / `hud-btn-content`**: pixel 11px, caixa de tinta; o primário é o único vermelho vivo da UI (`{components.hud-button-primary}`).
- **`panel` / `panel-wide`**: pergaminho com moldura de madeira de 5px e sombra dura; título pixel 20px; `h3` pixel 11px em `wood-dark`; corpo system-ui.
- **`panel-link`**: pixel 11px em `--accent-dark` com sublinhado de 3px; hover para `wood-dark`.
- **`tag-list` / `cv-list`**: chips de tinta com papel dentro; itens de lista marcados por quadradinho dourado de 8px (nunca `border-left` colorido).
- **`signpost`**: placa de madeira no poste — wayfinding do mundo, `aria-hidden` (o rótulo real vive no HUD).
- **`sky-title`**: nome em tinta 42px com sombra branca de 4px (contorno) + banner dourado "FASE 1-1".
- **`tbtn`**: setas pixel sobre caixa clara translúcida; só existem ≤720px.
- **`win-banner`**: painel de celebração sobre o jogo no fim da fase.

## Do's and Don'ts

- **Do** tratar qualquer novidade como objeto de fase: nova seção = nova zona + placa + painel.
- **Do** manter texto funcional ≥11px mesmo em Press Start 2P; se não couber, encurte o texto, não a fonte.
- **Do** usar `--accent-dark` para texto vermelho sobre papel; `--accent` é tinta de fundo e de mundo.
- **Do** atualizar os dois idiomas em `js/i18n.js` em qualquer texto novo — `data-i18n` em tudo.
- **Don't** adicionar blur, glass, gradientes decorativos ou sombras suaves — quebram o mundo.
- **Don't** usar `border-left` colorido em cards/itens de lista (marcador quadrado dourado é a assinatura).
- **Don't** deixar painel escondido focável: `visibility` acompanha `opacity` (regra já aplicada em `.panel`).
- **Don't** criar texto só num idioma, nem aria-label fixo em inglês/PT — tudo passa por `t()`.
- **Don't** diluir: se um elemento não cabe numa fase 8-bit, ele não entra — o modo leitura já é a válvula de escape.
