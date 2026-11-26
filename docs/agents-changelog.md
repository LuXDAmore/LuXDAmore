# Agents Changelog

## 2026-11-26 — Repo allineato al portfolio: base Nuxt statica e metodo WeGree senza dominio (spec 001)

- **Perché:** il repo `LuXDAmore/LuXDAmore` era solo il README del profilo GitHub. L'Operatore vuole che diventi anche il progetto del portfolio `lucaiaconelli.it` (soglia developer / fotografo) e ci ha copiato da WeGree best practice Nuxt, configurazioni, agenti, skill, SpecDD e impostazione dei documenti. Si tiene il metodo e si toglie tutto il dominio WeGree (aste, pagamenti, servizi cloud e vetrine esterne, back office). Visione e decisioni del brainstorming del 24–26 novembre in `docs/00-visione-progetto.md` e `docs/discovery/`.
- **Cosa cambia:**
  - app Nuxt 4 minima in generazione statica (`pnpm generate` → `.output/public`, caricamento FTP), homepage vuota ma semantica; script canonici `dev`, `generate`, `preview`, `typecheck`, `lint`, `lint:fix`, `test`;
  - CI senza segreti (`ci.yml`: typecheck, lint, test, generate) e redirect di GitHub Pages verso `lucaiaconelli.it` (`pages.yml`, pubblica solo `.github/pages/`);
  - agenti tenuti: `reviewer`, `test-writer`, `docs-sync`, `pr-writer`, `design-system-checker`; comandi tenuti: `spec-new`, `wf-new-feature`, `wf-fix-bug`, `wf-tests`, `visual-plan`, `visual-recap`; via quelli di dominio;
  - `CLAUDE.md` riscritto per il portfolio con struttura e metodo di WeGree; regola nuova sulle review: giri `@codex review` ripetuti finché Codex non segnala più problemi (sostituisce il limite di due giri). `DESIGN.md` ridotto a stub; via `DESIGN_BACKOFFICE.md` e `design/`;
  - `docs/` ripartita: indice, `01`–`06` (ambienti e deploy, SpecDD, agenti e comandi, review e PR, SEO di base, glossario), `coding-style.md` ripulito, `agents/` per le skill ingegneristiche (issue tracker `LuXDAmore/LuXDAmore`), `TODO.md` nuovo;
  - correzioni di review: `security.yml` rifissato a SHA esistenti e verificati (CodeQL v4, Scorecard, actionlint, checkout come la CI); `Agents.md` → `AGENTS.md`; via il `noindex` dal redirect Pages; `humans.txt` senza città né data; `tsconfig.json` senza `exclude`; glob ricorsivo dei test Nuxt; `.gitignore` preventivo per originali foto, Lightroom e chiavi; `docs/01` con tutti i workflow e Pages da attivare prima del primo merge su `master`.
- **Verifica:** link relativi dei documenti controllati; ricerca dei termini del dominio WeGree nei documenti con le sole menzioni volute. Gli esiti di install, typecheck, lint, test e generate sono nella PR.
- **Documentazione:** `CLAUDE.md`, `DESIGN.md`, `SECURITY.md`, `.github/copilot-instructions.md`, `docs/README.md`, `docs/01`–`06`, `docs/coding-style.md`, `docs/agents/`, `docs/TODO.md`.
- **Resta:** attivare Pages con sorgente «GitHub Actions» prima del merge su `master` e il primo caricamento FTP (Operatore); poi la spec del design della soglia e del portfolio fotografico (`docs/TODO.md` §Fase 2).
