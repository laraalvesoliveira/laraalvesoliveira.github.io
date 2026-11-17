/* ============================================================
   i18n — dicionário PT/EN do site.
   Todo texto da página sai daqui: cada elemento com
   data-i18n="chave" recebe o texto do idioma ativo.
   ============================================================ */

const I18N = {
  pt: {
    "btn.content": "ver conteúdo",
    "btn.play": "jogar",
    "zone.sobre": "SOBRE",
    "zone.curriculo": "CURRÍCULO",
    "zone.projetos": "PROJETOS",
    "zone.contato": "CONTATO",

    "sobre.fase": "FASE 1-1 · PORTFÓLIO",
    "sobre.sub": "Customer Success · Estudante de ADS",
    "sobre.p1": "Profissional de tecnologia com experiência em suporte técnico e atendimento ao cliente — hospedagem web, DNS, cPanel, WordPress e GitHub. Hoje é estudante de Análise e Desenvolvimento de Sistemas.",
    "sobre.p2": "Especialista em resolver problemas complexos, documentar processos e liderar times. Hoje aprende a construir o que antes só ajudava a consertar.",

    "cv.title": "CURRÍCULO",
    "cv.exp": "Experiência",
    "cv.e1": "Liderança de time de Customer Success; KPIs entre os melhores do time BR por ~12 meses; redução de especialistas abaixo da meta de 60%→20%.",
    "cv.e2": "Resolução de problemas técnicos complexos (hospedagem, DNS, configurações); documentação técnica e treinamentos internos.",
    "cv.e3t": "QA e Automação",
    "cv.e3": "Testes funcionais e exploratórios; automação E2E com Cypress e JavaScript.",
    "cv.skills": "Habilidades",
    "cv.edu": "Formação",
    "cv.edu1": "Tecnólogo em Análise e Desenvolvimento de Sistemas (Belas Artes) · 2024–2026, em curso",
    "cv.edu2": "Bacharelado em Relações Internacionais (SENAC) · 2015–2018",
    "cv.lang": "Idiomas",
    "cv.l1": "Português (nativo)",
    "cv.l2": "Inglês (avançado)",

    "proj.title": "PROJETOS",
    "proj.p1": "Projeto de testes do Bootcamp Atlântico Avanti: validação da aplicação QAzando (cadastro, login, busca, carrinho e contato) com testes manuais e automatizados.",
    "proj.p2": "Projeto Integrador Multidisciplinar (PIM) desenvolvido em equipe a cada semestre: aplicação web para conectar pessoas a iniciativas sustentáveis.",
    "proj.link": "ver no GitHub →",

    "contact.title": "CONTATO",
    "contact.phone": "Telefone",

    "panel.hint": "é só seguir andando →",
    "win.msg": "FASE COMPLETA!",
    "win.again": "jogar de novo",
    "hint": "← → anda · espaço pula",
    "footer": "feito com HTML · CSS · JS · Lara Alves, 2026",
    "meta.title": "Lara Alves · Portfólio",
    "a11y.lang": "trocar idioma",
    "a11y.coins": "moedas coletadas",
    "a11y.left": "andar para a esquerda",
    "a11y.jump": "pular",
    "a11y.right": "andar para a direita"
  },

  en: {
    "btn.content": "view content",
    "btn.play": "play",
    "zone.sobre": "ABOUT",
    "zone.curriculo": "RÉSUMÉ",
    "zone.projetos": "PROJECTS",
    "zone.contato": "CONTACT",

    "sobre.fase": "WORLD 1-1 · PORTFOLIO",
    "sobre.sub": "Customer Success · Systems Analysis student",
    "sobre.p1": "Tech professional with experience in technical support and customer service — web hosting, DNS, cPanel, WordPress and GitHub. Now studying Systems Analysis and Development.",
    "sobre.p2": "Specialist in solving complex problems, documenting processes and leading teams. Now learning to build what I used to help fix.",

    "cv.title": "RÉSUMÉ",
    "cv.exp": "Experience",
    "cv.e1": "Led a Customer Success team; KPIs among the best of the BR teams for ~12 months; cut underperforming specialists from 60% to 20%.",
    "cv.e2": "Resolved complex technical issues (hosting, DNS, system configurations); wrote technical documentation and ran internal training.",
    "cv.e3t": "QA & Automation",
    "cv.e3": "Functional and exploratory testing; E2E automation with Cypress and JavaScript.",
    "cv.skills": "Skills",
    "cv.edu": "Education",
    "cv.edu1": "Associate Degree in Systems Analysis and Development (Belas Artes) · 2024–2026, in progress",
    "cv.edu2": "Bachelor's Degree in International Relations (SENAC) · 2015–2018",
    "cv.lang": "Languages",
    "cv.l1": "Portuguese (native)",
    "cv.l2": "English (advanced)",

    "proj.title": "PROJECTS",
    "proj.p1": "Testing project from the Atlântico Avanti Bootcamp: validation of the QAzando app (sign-up, login, product search, cart and contact form) with manual and automated tests.",
    "proj.p2": "Multidisciplinary Integrator Project (PIM) built as a team every semester: a web app connecting people to sustainable initiatives.",
    "proj.link": "view on GitHub →",

    "contact.title": "CONTACT",
    "contact.phone": "Phone",

    "panel.hint": "just keep walking →",
    "win.msg": "LEVEL CLEAR!",
    "win.again": "play again",
    "hint": "← → walk · space to jump",
    "footer": "built with HTML · CSS · JS · Lara Alves, 2026",
    "meta.title": "Lara Alves · Portfolio",
    "a11y.lang": "switch language",
    "a11y.coins": "coins collected",
    "a11y.left": "walk left",
    "a11y.jump": "jump",
    "a11y.right": "walk right"
  }
};

let lang = localStorage.getItem("lang") || "pt";

// traduz uma chave no idioma ativo
function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.pt[key] || key;
}

// aplica o idioma em todos os elementos marcados com data-i18n
function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  // o botão mostra o idioma para o qual você troca
  document.getElementById("btn-lang").textContent = lang === "pt" ? "EN" : "PT";
  document.getElementById("btn-lang").setAttribute("aria-label", t("a11y.lang"));
  document.getElementById("coin-count").setAttribute("aria-label", t("a11y.coins"));
  document.title = t("meta.title");
  const tbLabels = { left: "a11y.left", jump: "a11y.jump", right: "a11y.right" };
  document.querySelectorAll(".tbtn").forEach((b) =>
    b.setAttribute("aria-label", t(tbLabels[b.dataset.hold] || b.dataset.hold)));
  // mantém o rótulo certo do botão de conteúdo conforme o modo atual
  const btn = document.getElementById("btn-content");
  btn.textContent = document.body.classList.contains("reading")
    ? t("btn.play")
    : t("btn.content");
  localStorage.setItem("lang", lang);
}

function toggleLang() {
  lang = lang === "pt" ? "en" : "pt";
  applyLang();
  // rótulo da zona ativa no HUD também troca de idioma
  if (window.updateZoneLabel) window.updateZoneLabel();
}

document.getElementById("btn-lang").addEventListener("click", toggleLang);
applyLang();
