# 002 — Tasks

- [x] T1 — Ramo `main` creato da `origin/master` + `develop` (`--no-ff`) e pubblicato → verifica: `README.md` identico a `master`, albero identico a `develop`
- [x] T2 — Trigger dei workflow e `.github/settings.yml` su `main` → verifica: `actionlint` verde
- [x] T3 — Documenti correnti su `main`; nuova voce in `docs/agents-changelog.md` → verifica: criterio `git grep` di requirements
- [ ] T4 — `@reviewer`, PR in bozza → `develop`, giri `@codex review` fino a esito pulito, via dell'Operatore
- [ ] T5 — Operatore: default branch = `main`; `main` tra i rami ammessi dall'ambiente `github-pages` prima del merge su `main`; eliminazione di `master` → verifica: primo giro di `pages.yml` su `main` verde, Pages ancora attiva
