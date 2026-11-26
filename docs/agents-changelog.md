# Agents Changelog

## 2026-11-26 — Codex su richiesta, modifiche piccole senza PR

- **Perché:** l'Operatore non vuole consumare la quota di Codex per le cose piccole: la review di Codex si chiede solo quando lo dice lui, e le modifiche piccole vanno direttamente su `develop` e `main` senza PR.
- **Cosa cambia:** `CLAUDE.md` §Branch e PR, `docs/04-review-e-pr.md` e i comandi `wf-new-feature`, `wf-fix-bug`, `spec-new` dicono che i giri `@codex review` partono solo su richiesta dell'Operatore e che le modifiche piccole, su sua indicazione, si committano direttamente su `develop` e si portano su `main` con un merge commit.
- **Verifica:** ricerca di `codex review` nei comandi e nei documenti: nessuna istruzione che lo chieda in automatico.
- **Documentazione:** `CLAUDE.md`, `docs/02-specdd.md`, `docs/04-review-e-pr.md`, `docs/agents/issue-tracker.md`, `.claude/commands/`.
- **Resta:** il gate `pre-pr-review` lancia ancora la CLI di Codex in locale sui diff non banali.

## 2026-11-26 — `master` eliminato: spec 002 completa

- **Perché:** ultimo passo della spec 002, fatto dall'Operatore.
- **Cosa cambia:** spuntati T6 della spec 002 e la voce del TODO. Su GitHub restano i rami `main` (default) e `develop`.
- **Verifica:** letto via API: rami remoti `develop` e `main`, ramo di default `main`, Pages attiva con sorgente GitHub Actions, ambiente `github-pages` che ammette solo `main`.
- **Documentazione:** `.specdd/002-main-branch/tasks.md`, `docs/TODO.md`.
- **Resta:** Operatore: decidere `.github/settings.yml` e il primo caricamento FTP da `main`.

## 2026-11-26 — Chiusura della spec 002: `main` in produzione

- **Perché:** PR #5 mergiata col via dell'Operatore; restava da allineare spec e TODO allo stato reale.
- **Cosa cambia:** spuntati T4 e T5 della spec 002 e le azioni dell'Operatore fatte (`main` di default, `main` ammesso dall'ambiente `github-pages`, Pages con sorgente GitHub Actions); restano aperte l'eliminazione di `master` (T6) e la decisione su `.github/settings.yml`, ora anche tra le domande aperte. Default setup di CodeQL spento.
- **Verifica:** dopo il merge di `develop` in `main`, CI, Security e Pages verdi su `main`; `https://luxdamore.github.io/LuXDAmore/` pubblica il redirect a `https://lucaiaconelli.it` (meta refresh, canonical, `location.replace`).
- **Documentazione:** `.specdd/002-main-branch/tasks.md`, `app.sdd`, `docs/TODO.md`, `docs/00-visione-progetto.md`.
- **Resta:** Operatore: eliminare `master`, decidere `.github/settings.yml`, primo caricamento FTP da `main`.

## 2026-11-26 — Ramo di produzione `main` al posto di `master` (spec 002)

- **Perché:** dopo il merge della spec 001 l'Operatore vuole usare `main` come ramo principale; `master` verrà eliminato.
- **Cosa cambia:** creato e pubblicato `main` da `master` più `develop` (merge `--no-ff`, stesso contenuto di `develop`, `README.md` identico); trigger di `ci.yml`, `security.yml` e `pages.yml` e protezione dichiarata in `.github/settings.yml` passano da `master` a `main`; regole e documenti correnti nominano `main`. Le voci storiche e la spec 001 restano com'erano.
- **Verifica:** `git grep -w master` trova solo le menzioni storiche, la voce del TODO che chiede di eliminare il ramo e il file nesting di `.vscode/settings.json`; `actionlint` gira sulla PR. Letto via API: Pages è già attiva e l'ambiente `github-pages` ammette solo `master`. Sulla PR il job CodeQL falliva perché sul repo era stato acceso il «default setup» di CodeQL, incompatibile con l'analisi di `security.yml`: spento via API col consenso dell'Operatore, il job è passato; annotato in `docs/01-ambienti-e-deploy.md`.
- **Documentazione:** `CLAUDE.md`, `SECURITY.md`, `docs/01-ambienti-e-deploy.md`, `docs/04-review-e-pr.md`, `docs/TODO.md`, `docs/agents/issue-tracker.md`, `.claude/commands/wf-new-feature.md`.
- **Resta:** Operatore: `main` come ramo di default, `main` tra i rami ammessi dall'ambiente `github-pages` prima del merge su `main`, eliminazione di `master` (`docs/TODO.md` §Azioni Operatore).

## 2026-11-26 — Repo allineato al portfolio: base Nuxt statica e metodo WeGree senza dominio (spec 001)

- **Perché:** il repo `LuXDAmore/LuXDAmore` era solo il README del profilo GitHub. L'Operatore vuole che diventi anche il progetto del portfolio `lucaiaconelli.it` (soglia developer / fotografo) e ci ha copiato da WeGree best practice Nuxt, configurazioni, agenti, skill, SpecDD e impostazione dei documenti. Si tiene il metodo e si toglie tutto il dominio WeGree (aste, pagamenti, servizi cloud e vetrine esterne, back office). Visione e decisioni del brainstorming del 24–26 novembre in `docs/00-visione-progetto.md` e `docs/discovery/`.
- **Cosa cambia:**
  - app Nuxt 4 minima in generazione statica (`pnpm generate` → `.output/public`, caricamento FTP), homepage vuota ma semantica; script canonici `dev`, `generate`, `preview`, `typecheck`, `lint`, `lint:fix`, `test`;
  - CI senza segreti (`ci.yml`: typecheck, lint, test, generate) e redirect di GitHub Pages verso `lucaiaconelli.it` (`pages.yml`, pubblica solo `.github/pages/`);
  - agenti tenuti: `reviewer`, `test-writer`, `docs-sync`, `pr-writer`, `design-system-checker`; comandi tenuti: `spec-new`, `wf-new-feature`, `wf-fix-bug`, `wf-tests`, `visual-plan`, `visual-recap`; via quelli di dominio;
  - `CLAUDE.md` riscritto per il portfolio con struttura e metodo di WeGree; regola nuova sulle review: giri `@codex review` ripetuti finché Codex non segnala più problemi (sostituisce il limite di due giri). `DESIGN.md` ridotto a stub; via `DESIGN_BACKOFFICE.md` e `design/`;
  - `docs/` ripartita: indice, `01`–`06` (ambienti e deploy, SpecDD, agenti e comandi, review e PR, SEO di base, glossario), `coding-style.md` ripulito, `agents/` per le skill ingegneristiche (issue tracker `LuXDAmore/LuXDAmore`), `TODO.md` nuovo;
  - correzioni di review: `security.yml` rifissato a SHA esistenti e verificati (CodeQL v4, Scorecard, actionlint, checkout come la CI); `Agents.md` → `AGENTS.md`; via il `noindex` dal redirect Pages; `humans.txt` senza città né data; `tsconfig.json` senza `exclude`; glob ricorsivo dei test Nuxt; `.gitignore` preventivo per originali foto, Lightroom e chiavi; `docs/01` con tutti i workflow e Pages da attivare prima del primo merge su `master`.
  - giro Codex 1 senza rilievi; Scorecard segnalava permessi del token troppo ampi: in `security.yml` la scrittura (`security-events`) passa ai soli job che la usano, e `clear-pr-cache.yml` esce (richiedeva `actions: write`; le cache inutilizzate GitHub le elimina da solo dopo 7 giorni).
- **Verifica:** link relativi dei documenti controllati; ricerca dei termini del dominio WeGree nei documenti con le sole menzioni volute; install, typecheck, lint, test e generate verdi in locale e in CI; giro Codex 2 senza rilievi. Merge in `develop` (PR #3 e #4) col via dell'Operatore.
- **Documentazione:** `CLAUDE.md`, `DESIGN.md`, `SECURITY.md`, `.github/copilot-instructions.md`, `docs/README.md`, `docs/01`–`06`, `docs/coding-style.md`, `docs/agents/`, `docs/TODO.md`.
- **Resta:** attivare Pages con sorgente «GitHub Actions» prima del merge su `master` e il primo caricamento FTP (Operatore); poi la spec del design della soglia e del portfolio fotografico (`docs/TODO.md` §Fase 2).
