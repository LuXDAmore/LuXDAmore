# 002 — Tasks

- [x] T1 — Ramo `main` creato da `origin/master` + `develop` (`--no-ff`) e pubblicato → verifica: `README.md` identico a `master`, albero identico a `develop`
- [x] T2 — Trigger dei workflow e `.github/settings.yml` su `main` → verifica: `actionlint` verde
- [x] T3 — Documenti correnti su `main`; nuova voce in `docs/agents-changelog.md` → verifica: criterio `git grep` di requirements
- [x] T4 — `@reviewer`, PR in bozza → `develop`, giri `@codex review` fino a esito pulito, via dell'Operatore → fatto: PR #5, due giri Codex senza rilievi, merge in `develop` e poi in `main`
- [x] T5 — Operatore: default branch = `main`; `main` tra i rami ammessi dall'ambiente `github-pages` prima del merge su `main`; Pages con sorgente GitHub Actions → verifica: primo giro di `pages.yml` su `main` verde, redirect pubblicato
- [ ] T6 — Operatore: eliminare `master` (è contenuto per intero in `main`) e toglierlo dai rami ammessi dall'ambiente `github-pages` → verifica: Pages ancora attiva
