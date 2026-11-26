# 002 — Design

> Sostituire `master` con `main` nei trigger dei workflow e nei documenti correnti, poi creare `main` da `master` più `develop`.

## Approccio

- Workflow: `ci.yml` (push su `develop` e `main`), `security.yml` (push su `main`), `pages.yml` (push su `main`). Solo `main`, senza tenere anche `master`: `master` sparisce e non riceve più merge.
- `.github/settings.yml`: `name: main`, protezione identica.
- Documenti correnti: `CLAUDE.md`, `SECURITY.md`, `docs/01-ambienti-e-deploy.md`, `docs/04-review-e-pr.md`, `docs/TODO.md`, `docs/agents/issue-tracker.md`, `.claude/commands/wf-new-feature.md`. Nuova voce in `docs/agents-changelog.md`; le voci passate restano.
- Ramo `main`: creato da `origin/master` con `git merge --no-ff origin/develop` (il merge di rilascio che sarebbe stato `develop` → `master`) e pubblicato senza toccare `master`. Questa spec arriva poi su `main` col solito `develop` → `main`.

## Passi dell'Operatore (fuori dal codice)

Pages è già attiva con sorgente GitHub Actions e l'ambiente `github-pages` ammette solo `master`.

1. Settings → General → Default branch = `main`. Si può fare subito: `main` ha già lo stesso `README.md` del profilo.
2. **Prima del merge di questa spec su `main`**: Settings → Environments → `github-pages` → Deployment branches and tags → aggiungere `main` (e togliere `master`).
3. Eliminare `master` (nessuna PR aperta punta a `master`), poi controllare che Pages risulti ancora attiva.
4. Nei cloni locali: `git fetch --prune origin`, `git branch -m master main`, `git branch -u origin/main main`, `git merge --ff-only origin/main`, `git remote set-head origin -a`.

## Edge case

| Rischio | Criticità | Gestione |
|---|---|---|
| L'ambiente `github-pages` ammette solo `master` (GitHub fissa il nome del ramo di default all'attivazione di Pages e non lo aggiorna): il primo deploy da `main` viene rifiutato | 🔴 | Passo 2 prima del merge su `main`; verifica: primo giro di `pages.yml` su `main` verde. Se fallisce: correggere la regola e rilanciare con `workflow_dispatch` |
| Le impostazioni di Pages riportano ancora `source.branch: master`; con sorgente GitHub Actions il campo non dovrebbe contare | 🟢 | Dopo l'eliminazione di `master` si controlla che Pages risulti ancora attiva (passo 3) |
| Finché questa spec non arriva su `main`, un push su `main` non avvia CI, security né Pages | 🟡 | Nessun push diretto su `main`; il primo push è il merge di questa spec |
| Il README del profilo si legge dal ramo di default: se il default punta a un ramo senza README, il profilo resta vuoto | 🟡 | `main` contiene `README.md` identico a `master`; verifica: diff vuoto prima del cambio |
| Link esterni a `blob/master/...` si rompono quando `master` sparisce | 🟢 | `README.md` non contiene `master`; i link interni ai documenti sono relativi |

## Note / punti aperti

- Mio: niente doppio trigger `master` + `main` nel periodo di transizione: `master` non riceve più merge.
