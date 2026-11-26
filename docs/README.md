# Documentazione

Documentazione del portfolio `lucaiaconelli.it` (repo `LuXDAmore/LuXDAmore`). È lo **stato attuale** del progetto: le spec in `.specdd/` sono lo storico del *perché*. Si legge anche da una sessione web, senza contesto locale.

## Indice

| File | Contenuto |
|---|---|
| [`00-visione-progetto.md`](./00-visione-progetto.md) | Cosa stiamo costruendo e perché: superfici, priorità, mondo del fotografo, climi, riferimenti, decisioni tecniche, domande aperte |
| [`01-ambienti-e-deploy.md`](./01-ambienti-e-deploy.md) | Node e pnpm, script, generazione statica, caricamento FTP su `lucaiaconelli.it`, redirect di GitHub Pages, CI |
| [`02-specdd.md`](./02-specdd.md) | Spec-Driven Development: spec di feature in `.specdd/NNN-nome/` e contratti `.sdd` accanto al codice |
| [`03-agenti-e-comandi.md`](./03-agenti-e-comandi.md) | Subagent di progetto, comandi `/`, skill e workflow di Claude Code |
| [`04-review-e-pr.md`](./04-review-e-pr.md) | Rami, PR in bozza, gate pre-PR, giri `@codex review`, triage dei rilievi, merge |
| [`05-seo.md`](./05-seo.md) | Regole di base di SEO e accessibilità per ogni pagina |
| [`06-glossario.md`](./06-glossario.md) | Termini di dominio in italiano → nomi in inglese nel codice, convenzioni di naming |
| [`coding-style.md`](./coding-style.md) | Convenzioni di codice: lingua, import, rotte, componenti, `<script setup>`, data fetching, template, strumenti del framework |
| [`TODO.md`](./TODO.md) | Piano per fasi |
| [`agents-changelog.md`](./agents-changelog.md) | Diario delle sessioni degli agenti |
| [`agents/`](./agents/domain.md) | Config in inglese per le skill ingegneristiche: [issue tracker](./agents/issue-tracker.md), [label di triage](./agents/triage-labels.md), [documenti di dominio](./agents/domain.md) |
| [`discovery/`](./discovery/README.md) | Materiale del brainstorming di novembre 2026 (ricerca, lettura curatoriale, moodboard, prove di design scartate), senza immagini |

## Fuori da `docs/`

- [`../CLAUDE.md`](../CLAUDE.md) — istruzioni permanenti per gli agenti AI e regole non negoziabili.
- [`../DESIGN.md`](../DESIGN.md) — fonte di verità della UI (per ora uno stub in attesa della spec del design).
- [`../.specdd/`](../.specdd/001-repo-baseline/requirements.md) — spec delle feature; la prima è la 001, base del repo.
- [`../README.md`](../README.md) — README del profilo GitHub: non fa parte della documentazione del progetto e non si modifica.

## Come si aggiorna

Ogni sessione di coding aggiorna, nello stesso commit del codice, `TODO.md`, `agents-changelog.md` e i documenti toccati (skill `docs-update`). Un documento nuovo si aggiunge a questo indice.
