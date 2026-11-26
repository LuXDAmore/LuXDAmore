# 002 — Ramo di produzione `main` al posto di `master`

> Il ramo di produzione e di default passa da `master` a `main`. Il repo resta com'è; cambiano solo il nome del ramo e i riferimenti nei workflow e nella documentazione. Rif.: [`docs/04-review-e-pr.md`](../../docs/04-review-e-pr.md), [`docs/01-ambienti-e-deploy.md`](../../docs/01-ambienti-e-deploy.md).

## Contesto / perché

Dopo il merge della spec 001 l'Operatore vuole usare `main` come ramo principale, al posto di `master`. Il ramo `main` nasce da `master` più `develop`, quindi con tutto il lavoro della 001. L'Operatore poi imposta `main` come ramo di default su GitHub ed elimina `master`. Fino ad allora esistono `develop`, `main` e `master`.

## Requisiti (EARS)

- **R1** — Il repo DEVE avere `main` come ramo di produzione: `main` ← `develop` ← `feature/claude/*` e `fix/claude/*`.
- **R2** — QUANDO si fa push su `main`, DEVONO partire gli stessi workflow che oggi partono su `master`: `ci.yml`, `security.yml` e `pages.yml`.
- **R3** — Le regole e i documenti correnti (`CLAUDE.md`, `SECURITY.md`, `docs/`, comandi e config degli agenti, `.github/settings.yml`) DEVONO nominare `main` come ramo di produzione.
- **R4** — I documenti storici (spec 001, voci passate di `docs/agents-changelog.md`) NON DEVONO essere riscritti.
- **R5** — `README.md` DEVE restare invariato.

## Fuori scope

- Cambiare il ramo di default su GitHub ed eliminare `master`: lo fa l'Operatore dalle impostazioni del repo.
- Cambiare la protezione dei rami: `.github/settings.yml` cambia solo il nome del ramo; la decisione sul suo contenuto resta aperta.

## Criteri di accettazione

- `git grep -w master` sui file versionati, escluse le skill vendor, `docs/discovery/`, le spec 001 e 002 e le voci passate del changelog, trova solo la voce di `docs/TODO.md` che chiede di eliminare il ramo e `.vscode/settings.json` (`*.master`, file nesting dell'editor, non il ramo) (R3, R4).
- Job `actionlint` di `security.yml` verde sulla PR (R2).
- `README.md` invariato rispetto a `develop` (R5).
