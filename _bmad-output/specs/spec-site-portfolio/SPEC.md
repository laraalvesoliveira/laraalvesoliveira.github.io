---
id: SPEC-site-portfolio
companions:
  - ../../../docs/curriculo_lara
sources:
  - ../../../docs/regulamento_horas_complementares
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# Site Portfólio Pessoal — Lara Alves de Oliveira

## Why

Mandato curricular combinado com oportunidade profissional. Atividades complementares são componente obrigatório para a conclusão do curso de Análise e Desenvolvimento de Sistemas no Centro Universitário Belas Artes (regulamento, item 1.4). O item "Desenvolvimento de site / plataforma digital com portfólio de trabalho e currículo" (tabela 8b) concede 40 horas mediante comprovação por link público — o site é, ao mesmo tempo, o comprovante exigido e uma vitrine profissional da Lara.

## Capabilities

- **CAP-1**
  - **intent:** Visitante acessa o site por uma URL pública, sem autenticação.
  - **success:** O link abre e renderiza corretamente em navegador comum, em desktop e celular.
- **CAP-2**
  - **intent:** Visitante consulta o currículo da Lara: resumo profissional, experiência, habilidades, formação e contato.
  - **success:** Todas as seções do currículo estão presentes e legíveis na página.
- **CAP-3**
  - **intent:** Visitante navega por um portfólio de trabalhos/projetos da Lara.
  - **success:** Cada projeto é exibido com título, descrição e tecnologias utilizadas; o portfólio inclui no mínimo o "projeto-bugbusters" (testes QA/Cypress, bootcamp Atlântico Avanti) e o "conexao-verde" (PIM semestral), ambos com link para o GitHub.
- **CAP-4**
  - **intent:** Visitante alterna o idioma do site entre português e inglês por um controle visível.
  - **success:** Todo o conteúdo textual troca de idioma ao acionar o controle, sem erro nem conteúdo quebrado.

## Constraints

- O regulamento exige que o site contenha portfólio de trabalho **e** currículo; a comprovação é o link público do site (tabela 8b).
- Site estático hospedado no GitHub Pages — sem backend, banco de dados ou processamento server-side.
- Complexidade no nível de uma estudante de ADS em formação: Lara precisa entender e conseguir manter o código; nada "extremamente elaborado" (também preserva a autoria exigida pelo regulamento, itens 5.4/5.5).
- Prazo duro: site no ar até 20/11/2026 (validação no último semestre) — janela de ~4 dias a partir de 16/11; todo o escopo precisa caber nessa janela.
- Formato definido por Lara: jogo plataforma estilo Mario — a apresentação é um jogo, mas o conteúdo exigido (currículo + portfólio) precisa estar acessível dentro dele. Design guiado pela skill Impeccable. Implementação sem engine: DOM/CSS/JS puro que a Lara consiga explicar e manter.

## Non-goals

- Backend, banco de dados, formulário server-side, CMS, blog, e-commerce — tudo fora de escopo.
- O site não substitui o relatório em PDF no Moodle — ele é apenas o link-comprovante; a entrega formal continua sendo o portfólio de atividades (regulamento 7.1 e 9).

## Success signal

O link do site é aceito como comprovante de 40 horas de atividades complementares e a atividade recebe conceito "Válida" no Portal do Aluno. Demonstrável na prática: qualquer pessoa abre o link e encontra currículo e portfólio em segundos.
