# 01 — Ambienti e deploy

> Come si lavora in locale, come si genera il sito e come arriva online. Il sito è **solo statico**: nessun runtime Node in produzione.

## Requisiti

- **Node**: la versione è in `.nvmrc` (`nvm use` o `fnm use` nella radice del repo). La CI legge lo stesso file.
- **pnpm**: la versione è nel campo `packageManager` di `package.json`. Con pnpm ≥ 10 già installato basta lanciarlo: passa da solo alla versione di `packageManager`. Node ≥ 25 non include più Corepack: chi vuole usarlo lo installa prima con `npm i -g corepack`, poi `corepack enable`.

Non servono variabili d'ambiente né segreti: non c'è un `.env` da scaricare. Se in futuro servisse una variabile, si documenta qui e il file `.env` resta fuori da git.

## Setup

```sh
pnpm install   # installa le dipendenze; postinstall esegue `nuxt prepare`
pnpm dev       # server di sviluppo
```

## Script

| Script | Cosa fa |
|---|---|
| `pnpm dev` | Server di sviluppo con hot reload |
| `pnpm generate` | Genera il sito statico in `.output/public` |
| `pnpm preview` | Serve in locale l'ultimo output generato, per controllarlo prima del caricamento |
| `pnpm typecheck` | Controllo dei tipi (TypeScript strict) |
| `pnpm lint` | ESLint (e gli altri linter configurati) |
| `pnpm lint:fix` | Come `lint`, correggendo ciò che si corregge da solo |
| `pnpm test` | Test unitari (Vitest) |
| `postinstall` | `nuxt prepare`, lanciato da `pnpm install` |

## Deploy su `lucaiaconelli.it`

Il caricamento è manuale e lo fa l'Operatore (l'automazione è una spec futura).

1. Su `master` aggiornato: `pnpm install`, poi `pnpm generate`.
2. Controllo: `pnpm preview` e una passata della homepage nel browser.
3. Via FTP (per esempio con FileZilla) si carica **il contenuto** di `.output/public`, non la cartella stessa, nella radice del sito `lucaiaconelli.it`, sovrascrivendo i file esistenti.
4. Se una rotta sparisce, il suo file va cancellato anche dal server: il caricamento non lo toglie da solo.

Con una sola pagina statica non servono `.htaccess` né fallback SPA; si rivedono quando arrivano più rotte (spec 001, edge case).

## GitHub Pages: solo redirect

`https://luxdamore.github.io/LuXDAmore/` non ospita il sito: reindirizza a `https://lucaiaconelli.it`.

- Il workflow `.github/workflows/pages.yml` pubblica **solo** la cartella `.github/pages/` (`index.html` con meta refresh, `<link rel="canonical">` e un link visibile; `404.html` uguale), a ogni push su `master` e a mano (`workflow_dispatch`).
- Il redirect usa URL assoluti, perché la Pages del repo profilo vive sotto `/LuXDAmore/`.
- **Una tantum, prima del primo merge su `master`**: in GitHub, Settings → Pages → Build and deployment → Source = **GitHub Actions**. Senza questa impostazione il primo giro di `pages.yml` fallisce allo step `configure-pages`. Se è già successo: attivare Pages e rilanciare il workflow a mano (Actions → Pages → Run workflow, cioè `workflow_dispatch`).

## CI

Nessun workflow richiede segreti. Una PR si mergia solo con la CI verde (e col via dell'Operatore, vedi [`04-review-e-pr.md`](./04-review-e-pr.md)).

Workflow in `.github/workflows/` (azioni fissate per SHA, con il tag nel commento):

- `ci.yml` — sulle PR e sui push su `develop` e `master`, con Node da `.nvmrc` e pnpm da `packageManager`: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm generate`.
- `security.yml` — sulle PR, sui push su `master` e ogni lunedì (cron `24 4 * * 1`, UTC): actionlint sui workflow; CodeQL (JavaScript/TypeScript, config in `.github/codeql/codeql-config.yml`) e OpenSSF Scorecard (risultati SARIF caricati in Code scanning, non pubblicati) solo se il repo è pubblico.
- `clear-pr-cache.yml` — alla chiusura di una PR cancella le cache di Actions legate al suo ref di merge, così non occupano spazio.
- `pages.yml` — il redirect di GitHub Pages descritto sopra.

Altri file del repo in `.github/`:

- `dependabot.yml` — npm mensile con limite di PR a 0 (niente PR di aggiornamento versione; gli aggiornamenti li propone Renovate, `renovate.json`), esclusi `docs/**` e `skills/**`.
- `settings.yml` — specchio dichiarativo della protezione di `master` (check richiesti, una approvazione); è inerte finché sul repo non è installata l'app Probot Settings.
- `FUNDING.yml` — i link di sponsorizzazione del profilo `luxdamore` mostrati da GitHub.

## Immagini solo in locale

- Le immagini del brainstorming (`docs/discovery/**/assets/`, le cartelle `img/` di moodboard e prove, lo zip originale) e l'archivio fotografico **non sono versionati**: le esclude `.gitignore` e restano sul PC dell'Operatore.
- Gli export originali da Lightroom restano fuori da git; nel repo andranno solo versioni ottimizzate e senza coordinate GPS, oppure uno storage esterno (decisione aperta in [`00-visione-progetto.md`](./00-visione-progetto.md)).
