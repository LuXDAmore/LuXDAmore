# DESIGN.md — UI/UX del portfolio

> Riferimento globale di interfaccia e interazione: diventerà la fonte di verità per l'aspetto e il comportamento del sito, distinta dai `design.md` tecnici dentro le singole spec.

## Stato

**Il design non è ancora definito.** La direzione emersa dal brainstorming (soglia developer / fotografo, climi per zona, riferimenti scelti, rendering ibrido HTML + WebGL) è riassunta in [`docs/00-visione-progetto.md`](./docs/00-visione-progetto.md); il materiale completo è in [`docs/discovery/`](./docs/discovery/README.md).

Questo file si scrive con la spec del design: token (colori, tipografia, spaziature), componenti, movimento e regole di accessibilità.

## Fino ad allora

- Si usano i default di **Nuxt UI** (componenti, tema, modalità chiara e scura) senza token inventati.
- Valgono le regole di accessibilità e semantica di [`docs/05-seo.md`](./docs/05-seo.md) e di `CLAUDE.md` §Regole non negoziabili: HTML semantico, un solo `<h1>`, foto come vere `<img>` con `alt`, tastiera e focus, contrasto, `prefers-reduced-motion`.
- Le convenzioni di codice per la UI sono in [`docs/coding-style.md`](./docs/coding-style.md).
