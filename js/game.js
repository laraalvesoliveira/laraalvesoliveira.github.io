/* ============================================================
   game.js — o motorzinho da fase.
   Mundo = div larga que desliza; o personagem anda com ← →,
   pula com espaço, coleta moedas e revela os painéis (seções).
   ============================================================ */

// ---------- constantes ----------
const WALK = 4.5;      // velocidade de andar (px/frame)
const JUMP = 13;       // força do pulo
const GRAVITY = 0.6;   // gravidade por frame
const PLAYER_W = 64;
const PLAYER_H = 80;
const ZONE_W = 1200;

const game = document.getElementById("game");
const world = document.getElementById("world");
const playerEl = document.getElementById("player");
const groundEl = document.getElementById("ground");
const coinCountEl = document.getElementById("coin-count");
const zoneLabelEl = document.getElementById("zone-label");
const winBanner = document.getElementById("win-banner");

// ---------- desenha o sprite do personagem ----------
// cada caractere da matriz vira um "pixel" de 2x2 no canvas
const SPRITE = [
  "......HHHHHH....",
  ".....HHHHHHHH...",
  ".....HHSSSSHH...",
  ".....HSESS EH...",  // olhos
  ".....HSSSSSSH...",
  ".....HSSSSSSH...",
  "......SSSSS.....",
  ".....TTTTTTT....",
  "....TTTTTTTTT...",
  "....STTTTTTTS...",
  "....STTTTTTTS...",
  ".....TTTTTT.....",
  ".....PPPPPPP....",
  ".....PPP PPP....",
  ".....PPP PPP....",
  "....BBBB BBB....",
  "....BBBB BBB....",
  "................"
];
const COLORS = {
  H: "#5b3a1e", // cabelo
  S: "#f0c8a0", // pele
  E: "#202030", // olhos
  T: "#e52521", // camiseta
  P: "#2b4a8a", // calça
  B: "#4a2f16"  // sapatos
};

(function drawPlayer() {
  const ctx = playerEl.getContext("2d");
  const px = 2; // tamanho de cada "pixel" da matriz
  SPRITE.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      if (COLORS[ch]) {
        ctx.fillStyle = COLORS[ch];
        ctx.fillRect(x * px, y * px, px, px);
      }
    });
  });
})();

// ---------- estado do jogador ----------
let px = 40;   // posição horizontal no mundo
let py = 0;    // altura acima do chão (0 = no chão)
let vy = 0;    // velocidade vertical
let camX = 0;  // posição da câmera
let won = false;

const keys = { left: false, right: false, jump: false };

// ---------- zonas (seções do conteúdo) ----------
const zones = [...document.querySelectorAll(".zone")].map((el) => {
  const panel = el.querySelector(".panel");
  const startX = el.offsetLeft;
  // o painel abre quando o jogador se aproxima dele
  const triggerX = Math.max(startX, startX + (panel ? panel.offsetLeft : 400) - 420);
  return { el, startX, triggerX, id: el.id.replace("zone-", ""), reached: false };
});

let activeZone = null;
function updateZoneLabel() {
  if (activeZone) zoneLabelEl.textContent = "· " + t("zone." + activeZone.id);
}
window.updateZoneLabel = updateZoneLabel;

// ---------- moedas ----------
const coins = [...document.querySelectorAll(".coin")].map((el) => ({
  el,
  x: el.offsetParent.offsetLeft + el.offsetLeft, // posição no mundo
  y: parseInt(getComputedStyle(el).getPropertyValue("--cy")) || 100,
  taken: false
}));
let coinCount = 0;

// ---------- canos (obstáculos) ----------
const pipes = [...document.querySelectorAll(".pipe")].map((el) => {
  const x = el.offsetParent.offsetLeft + el.offsetLeft;
  return {
    left: x - 8,
    right: x + el.offsetWidth + 8,
    top: el.classList.contains("p-tall") ? 128 : 74 // altura do topo do cano
  };
});

// altura da superfície sob o jogador (chão = 0, topo de cano = pipe.top)
function surfaceAt(x, w) {
  let s = 0;
  for (const p of pipes) {
    if (x + w > p.left && x < p.right && p.top > s) s = p.top;
  }
  return s;
}

// ---------- teclado ----------
addEventListener("keydown", (e) => {
  if (!document.body.classList.contains("reading") &&
      ["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) e.preventDefault();
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
  if (e.key === "ArrowUp" || e.key === " " || e.key === "w") keys.jump = true;
});
addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
  if (e.key === "ArrowUp" || e.key === " " || e.key === "w") keys.jump = false;
});

// ---------- controles de toque ----------
document.querySelectorAll(".tbtn").forEach((btn) => {
  const key = btn.dataset.hold;
  const on = (e) => { e.preventDefault(); keys[key === "jump" ? "jump" : key] = true; };
  const off = () => { keys[key === "jump" ? "jump" : key] = false; };
  btn.addEventListener("pointerdown", on);
  btn.addEventListener("pointerup", off);
  btn.addEventListener("pointerleave", off);
  btn.addEventListener("pointercancel", off);
});

// ---------- laço principal ----------
const worldW = world.offsetWidth;

function tick() {
  if (document.body.classList.contains("reading")) { requestAnimationFrame(tick); return; }
  const gameW = game.clientWidth;

  // --- horizontal ---
  let nx = px;
  if (keys.left) nx -= WALK;
  if (keys.right) nx += WALK;
  nx = Math.max(0, Math.min(worldW - PLAYER_W, nx));

  // canos bloqueiam a passagem quando o jogador está abaixo do topo
  for (const p of pipes) {
    if (nx + PLAYER_W > p.left && px + PLAYER_W <= p.left && py < p.top) nx = p.left - PLAYER_W;
    if (nx < p.right && px >= p.right && py < p.top) nx = p.right;
  }
  px = nx;

  // --- vertical ---
  const surface = surfaceAt(px, PLAYER_W);
  if (keys.jump && py === surface) vy = JUMP;
  py += vy;
  vy -= GRAVITY;
  if (py <= surface && vy <= 0) { py = surface; vy = 0; }
  if (py < 0) { py = 0; vy = 0; }

  // --- câmera segue o jogador ---
  camX = Math.max(0, Math.min(worldW - gameW, px - gameW * 0.35));
  world.style.transform = `translateX(${-camX}px)`;
  groundEl.style.backgroundPositionX = `${-camX}px`;
  playerEl.style.transform = `translate(${px - camX}px, ${-py}px)`;

  // --- revela as zonas ---
  for (const z of zones) {
    if (!z.reached && px + PLAYER_W > z.triggerX) {
      z.reached = true;
      z.el.classList.add("reached");
      activeZone = z;
      updateZoneLabel();
    }
  }

  // --- coleta moedas ---
  for (const c of coins) {
    if (c.taken) continue;
    const hitX = Math.abs(px + PLAYER_W / 2 - (c.x + 9)) < 34;
    const hitY = py + PLAYER_H > c.y && py < c.y + 30;
    if (hitX && hitY) {
      c.taken = true;
      c.el.classList.add("collected");
      coinCountEl.textContent = "×" + ++coinCount;
    }
  }

  // --- rótulo do HUD mostra a zona onde o jogador está ---
  for (let i = zones.length - 1; i >= 0; i--) {
    if (zones[i].reached && px + PLAYER_W / 2 > zones[i].startX) {
      if (activeZone !== zones[i]) { activeZone = zones[i]; updateZoneLabel(); }
      break;
    }
  }

  // --- chegada ---
  if (!won && px > worldW - 620) {
    won = true;
    winBanner.hidden = false;
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ---------- botão "ver conteúdo" / "jogar" ----------
const btnContent = document.getElementById("btn-content");
btnContent.addEventListener("click", () => {
  const reading = document.body.classList.toggle("reading");
  btnContent.textContent = reading ? t("btn.play") : t("btn.content");
  if (!reading) {
    // volta para a fase no ponto onde parou
    window.scrollTo({ top: 0 });
  }
});

// ---------- jogar de novo ----------
document.getElementById("btn-again").addEventListener("click", () => location.reload());

// ---------- atalho: #conteudo abre direto no modo leitura ----------
if (location.hash === "#conteudo" || location.hash === "#content") {
  document.body.classList.add("reading");
  btnContent.textContent = t("btn.play");
}

// ---------- deep-links ----------
// ?lang=pt|en força o idioma — bom pra compartilhar a página já em inglês
const mLang = location.search.match(/[?&]lang=(pt|en)\b/);
if (mLang && mLang[1] !== lang) {
  lang = mLang[1];
  applyLang();
}

// #panel-<zona> abre a seção direto (ex.: index.html#panel-projetos)
const mPanel = location.hash.match(/^#panel-(\w+)$/);
if (mPanel) {
  const z = zones.find((z) => z.id === mPanel[1]);
  if (z) {
    // marca todas as zonas até a alvo como visitadas, senão o laço
    // revela as anteriores depois e o rótulo do HUD fica errado
    for (const zz of zones) {
      if (zz.startX <= z.startX) { zz.reached = true; zz.el.classList.add("reached"); }
    }
    activeZone = z;
    updateZoneLabel();
    px = Math.min(z.triggerX + 60, worldW - PLAYER_W);
    camX = Math.max(0, Math.min(worldW - game.clientWidth, px - game.clientWidth * 0.35));
    world.style.transform = `translateX(${-camX}px)`;
    playerEl.style.transform = `translate(${px - camX}px, 0px)`;
  }
}
