# 001 — Design

> Ripulitura dei file importati da WeGree (tenere il metodo, togliere il dominio), app Nuxt minima in generazione statica, CI senza segreti, Pages come redirect, documentazione riscritta per il portfolio.

## Approccio

Tre blocchi con file disgiunti, eseguibili in parallelo; ogni blocco usa le decisioni fisse qui sotto come contratto comune.

### A — App e tooling

- `package.json`: `name: "luxdamore"`, `private: true`, autore Luca Iaconelli, `homepage: https://lucaiaconelli.it`, repo `github.com/LuXDAmore/LuXDAmore`. Script canonici (gli altri documenti li citano con questi nomi): `dev`, `generate`, `preview`, `typecheck`, `lint`, `lint:fix`, `test`, `postinstall` (`nuxt prepare`). Dipendenze solo per ciò che il codice o la CI usano davvero (Nuxt, Nuxt UI + Tailwind, tooling di lint/test/typecheck). Via tutto il dominio WeGree e ciò che non serve alla homepage (three/tres compresi: torneranno con la spec del design).
- `nuxt.config.ts`: riscritto da zero, poche decine di righe. Modulo `@nuxt/ui` (+ `@nuxt/eslint` se serve alla config ESLint, + `@nuxt/test-utils` per i test). `app.head.htmlAttrs.lang = 'it'`, title e description di base. Nessun `runtimeConfig` di dominio, niente preset Vercel: il target è `nuxt generate` (statico).
- `app/`: `app.vue` (`UApp` + `NuxtPage`), `pages/index.vue` con `<main>` e `<h1>` (solo per screen reader: la pagina resta visivamente vuota), `useSeoMeta`. `assets/css/main.css` con Tailwind + Nuxt UI. Nient'altro.
- Rimossi: `server/`, `shared/`, `i18n/`, contenuti WeGree di `public/` e `test/` (test e stub). Resta un test della homepage con `@nuxt/test-utils`.
- Config dei tool: si tiene un file solo se un script, la CI o l'editor lo usa; si adattano i riferimenti WeGree (es. alias `#supabase` in `vitest.config.mts`). Playwright, Codecov e simili escono finché non servono.
- `.gitignore`: template Node/Nuxt pulito + `certificates/`, `.env*`, `*.zip`, `.specdd/bootstrap.local.md`, `.claude/settings.local.json`, immagini di `docs/discovery/` (`docs/discovery/**/assets/`); blocco preventivo per originali foto, cataloghi Lightroom e chiavi sciolte (`*.lrcat`, `*.dng`, `*.cr3`, `*.xmp`, `*.pem`, `*.key`…).
- File generici del repo tenuti: `.github/workflows/security.yml` (actionlint, CodeQL, Scorecard), `.github/workflows/clear-pr-cache.yml`, `.github/dependabot.yml`, `.github/settings.yml`, `.github/FUNDING.yml` (solo account `luxdamore`). Si tengono perché sono generici, non hanno dominio WeGree e non richiedono segreti.
- `.mcp.json`: tolto il server Supabase di WeGree; restano solo server generici senza riferimenti a progetti di terzi.
- `.worktreeinclude`: nessun `.env`.
- `renovate.json`: contenuto deciso dall'Operatore, solo riformattato.

### B — Agenti, comandi, SpecDD

- `.claude/agents`: via `migration-guardian`, `rls-security`, `sync-parser-checker`; `reviewer`, `test-writer`, `docs-sync`, `pr-writer`, `design-system-checker` riscritti per il portfolio (stesso ruolo e stesso modello).
- `.claude/commands`: via `build-*`, `setup-*`, `wf-migration`; adattati `spec-new`, `wf-new-feature`, `wf-fix-bug`, `wf-tests`; `visual-plan`, `visual-recap` invariati.
- `.claude/settings.json`: niente plugin o permessi legati a servizi WeGree (Stripe, Supabase, Vercel, Resend).
- `.claude/workflows`: via gli script di dominio, adattati quelli generici (es. pre-PR).
- Skill di progetto `docs-update` (in `.agents/skills` e `.claude/skills`) riscritta per questo repo.
- `.specdd/bootstrap.project.md` riscritto per il portfolio; `bootstrap.md` è il file SpecDD generico (si adattano solo eventuali esempi WeGree); `_template/` adattato (niente migrazioni, RLS, `docs/06`/`docs/13` di WeGree). `app.sdd` riscritto.

### C — Documentazione

- `CLAUDE.md` riscritto per il portfolio, mantenendo struttura e regole di metodo di WeGree. Regola nuova sulle review bot: giri `@codex review` ripetuti finché Codex non trova più problemi (sostituisce il limite di 2 giri). `AGENTS.md` resta il rimando a `CLAUDE.md`.
- `DESIGN.md`: stub che rimanda alla direzione emersa nel brainstorming (`docs/00-visione-progetto.md`), in attesa della spec del design. Via `DESIGN_BACKOFFICE.md` e i contenuti WeGree di `design/`.
- `docs/`: indice `README.md`; `00-visione-progetto.md` (visione, decisioni, climi, pipeline foto, stato); documenti di metodo portati da WeGree e adattati (SpecDD, agenti, comandi, coding style, ambienti e deploy, SEO di base, convenzioni dei bot); `TODO.md` ripartito da zero; `agents-changelog.md`; `discovery/` con il materiale del brainstorming senza immagini.
- `SECURITY.md`, `CHANGELOG.md`, `TODO.md` in root ripuliti.

### Pages

Workflow `pages.yml`: su push a `master` (e manuale) pubblica con `actions/deploy-pages` la sola cartella `.github/pages/` (`index.html` con meta refresh + `<link rel="canonical">` + link visibile, e `404.html` uguale). Attivazione nelle impostazioni del repo (sorgente: GitHub Actions) prima del primo merge su `master`, altrimenti il primo giro fallisce a `configure-pages` (si rilancia con `workflow_dispatch`).

## Edge case

- 🔴 Segreti o chiavi importati da WeGree finiscono su GitHub → copie `.env*`/`.vercel` eliminate, `certificates/` escluso, `.mcp.json` solo con server generici, scansione del diff prima di ogni push.
- 🟡 Il host FTP serve `.output/public` senza riscritture: con una sola pagina statica non servono `.htaccess` né fallback SPA. Da rivedere quando arrivano più rotte.
- 🟡 Una PR con migliaia di file non viene recensita dai bot → skill vendor in una PR separata (#3), questa resta piccola.
- 🟢 GitHub Pages del repo profilo vive su `/LuXDAmore/`: il redirect usa URL assoluti.

## Note / punti aperti

- Mio: `<h1>` solo per screen reader, per avere una pagina vuota ma valida.
- Mio: nessun `.htaccess` finché c'è una sola pagina.
- Il ramo di default resta `master` (rinominarlo non porta nulla ora).
