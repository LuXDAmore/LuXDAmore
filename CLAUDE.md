# Claude

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

## 0. SpecDD Rule

Before working on this project, read `.specdd/bootstrap.md`, then `.specdd/bootstrap.project.md`, then `.specdd/bootstrap.local.md` when present. Assume the role, rules, workflow, and implementation constraints described in SpecDD. Treat `.sdd` files as source-adjacent development contracts, not optional documentation. Resolve the relevant SpecDD chain before creating, editing, deleting, or moving code, and adhere to SpecDD unless the Operator explicitly instructs otherwise.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Documentazione obbligatoria

**Ogni sessione di coding aggiorna la documentazione, nello stesso commit del codice che descrive.** `docs/TODO.md`, `docs/agents-changelog.md` e i documenti in `docs/` toccati dalla modifica. `README.md` no: è il README del profilo GitHub (regola 1).

Il dettaglio operativo (cosa scrivere in ciascun file, cosa non toccare mai) è nella skill `docs-update`: invocala prima di chiudere la sessione.

## Skills

Search for relevant skills inside the folder `.agents/skills`.

## Design

Search for design rules inside the `DESIGN.md` file. Until the design spec exists it is a stub: the direction is in `docs/00-visione-progetto.md`.

## Istruzioni progetto — luxdamore (portfolio lucaiaconelli.it)

Istruzioni permanenti per gli strumenti AI (Claude Code, Codex, Copilot) su questo repo. Leggere sempre all'avvio.

## Cos'è

Il repo `LuXDAmore/LuXDAmore` ha due ruoli:

- **Profilo GitHub** — `README.md` è il README speciale del profilo, mostrato su `github.com/LuXDAmore`.
- **Portfolio di Luca Iaconelli** (`luxdamore`) su `https://lucaiaconelli.it`: una **soglia** da cui si sceglie tra **il developer** e **il fotografo**, con un'esperienza visiva curata e sperimentale. Visione, decisioni e domande aperte: [`docs/00-visione-progetto.md`](./docs/00-visione-progetto.md).

Oggi c'è solo la base (spec 001): un'app Nuxt con una homepage vuota ma semanticamente corretta. Il design arriva con spec successive.

Metodo, strumenti e impostazione dei documenti sono importati da WeGree (altro progetto dell'Operatore) e ripuliti dal suo dominio: si tiene il metodo, non il dominio.

## Stack (fisso)

Lo stack è in `package.json` e non si cambia senza decisione esplicita. Decisioni fisse:

- **Nuxt 4 in generazione statica** (`pnpm generate` → `.output/public`), **Nuxt UI** e **Tailwind CSS**, TypeScript.
- **Deploy** = `pnpm generate` e caricamento via FTP del contenuto di `.output/public` nella radice di `lucaiaconelli.it`. Nessun runtime Node in produzione.
- **GitHub Pages** di questo repo (`luxdamore.github.io/LuXDAmore/`) fa solo il redirect a `https://lucaiaconelli.it` (workflow `pages.yml`).
- Le librerie di movimento e WebGL previste dalla visione (GSAP, Lenis, three.js) entrano con le spec del design, non prima.

Dettagli di ambiente, script e deploy: [`docs/01-ambienti-e-deploy.md`](./docs/01-ambienti-e-deploy.md).

## Regole non negoziabili

1. **`README.md` non si tocca.** È il profilo GitHub: si modifica solo su richiesta esplicita dell'Operatore.
2. **Niente segreti in git.** Mai chiavi, token, `.env*`, certificati, config locali (`.claude/settings.local.json`, `.specdd/bootstrap.local.md`) né riferimenti a progetti di terzi (per esempio progetti cloud di WeGree). `.mcp.json` è versionato solo con server generici, senza credenziali né riferimenti a progetti. Prima di ogni push si scansiona il diff.
3. **Foto: vere, descritte, senza posizione.** Le foto si pubblicano come vere `<img>` (o `<picture>`) con `alt` descrittivo, anche quando sopra c'è un effetto WebGL. Nei file pubblicati non ci sono coordinate GPS: i metadati si ripuliscono e il luogo si riduce a città o paese. Gli export originali e l'archivio restano fuori da git.
4. **HTML semantico, accessibile e SEO-friendly.** `lang` corretto, un solo `<h1>` per pagina, landmark (`<main>`, `<nav>`…), gerarchia dei titoli senza salti, title e description per pagina, tastiera e focus funzionanti, movimento che rispetta `prefers-reduced-motion`. Ciò che si vede solo in un canvas ha un equivalente nell'HTML. Regole in [`docs/05-seo.md`](./docs/05-seo.md).
5. **Solo statico.** Niente server in produzione: niente API, SSR a richiesta o middleware server. Ciò che serve si calcola al build (`pnpm generate`) o nel browser.
6. **TypeScript strict.** Niente `any` di comodo; i tipi dei dati generati al build si dichiarano.
7. **Codice in inglese, spiegazioni in italiano.** Tipi, variabili, funzioni, componenti, nomi di file e cartelle, rotte, chiavi dei dati sono in **inglese**. Commenti, documentazione, spec `.sdd` e `.specdd/`, commit, PR e copy del sito sono in **italiano** (con gli accenti corretti). I nomi propri (`Spectrum`, `Exhibitions`, `Atlas`, `Lightroom`) non si traducono. Mappa dei termini IT → EN in [`docs/06-glossario.md`](./docs/06-glossario.md).

## Workflow

- Setup: `pnpm install` (Node da `.nvmrc`, pnpm dal campo `packageManager`). Sviluppo: `pnpm dev`.
- Prima di una PR: `pnpm typecheck`, `pnpm lint`, `pnpm test`; la CI (`ci.yml`) li ripete con `pnpm generate`, senza segreti.
- Rilascio: `pnpm generate`, controllo con `pnpm preview`, caricamento FTP di `.output/public` (lo fa l'Operatore). Dettagli in [`docs/01-ambienti-e-deploy.md`](./docs/01-ambienti-e-deploy.md).
- Le immagini di lavoro (archivio, anteprime della discovery) restano in locale: sono escluse da `.gitignore`.

## Convenzioni codice

Le convenzioni di sviluppo trasversali (lingua del codice, rotte e pagine, componenti, data fetching, template) sono in **[`docs/coding-style.md`](./docs/coding-style.md)**: leggerle prima di creare, spostare o rinominare pagine, rotte o file. In sintesi: **rotte e nomi di file in inglese**; **una cartella per rotta con `index.vue`**, anche le dinamiche; **una cartella per componente**. Termini di dominio: [`docs/06-glossario.md`](./docs/06-glossario.md). UI: `DESIGN.md`.

**Prima gli strumenti del framework.** Prima di scrivere codice a mano si cerca cosa offrono già Nuxt, i moduli in `package.json` (Nuxt UI, Nuxt Image, @nuxt/test-utils…) e Vue: componenti, composable e utility del framework vengono prima di ogni wrapper, glue o reimplementazione nostra, anche se il pezzo a mano sembra piccolo. Vale anche nei test: si mocka solo ciò che dipende da stato esterno non riproducibile (servizi di rete terzi); per il resto si usano gli strumenti del framework — `registerEndpoint` al posto di mock di `$fetch`, `global.stubs` di `mountSuspended` al posto di mock degli interni di una libreria terza, la config reale al posto di un `useRuntimeConfig` finto — e ciò che il framework già copre non si ri-testa. Dettaglio in `docs/coding-style.md` §Prima gli strumenti del framework.

## Branch e PR

Dettaglio completo in [`docs/04-review-e-pr.md`](./docs/04-review-e-pr.md).

- **Rami:** `main` (produzione, ramo di default) ← `develop` (integrazione) ← `feature/claude/<nome>` e `fix/claude/<nome>`. Mai push diretto su `main`: ci arriva solo `develop`, con un merge commit. I push diretti su `develop` sono eccezioni su richiesta esplicita dell'Operatore, di solito per modifiche piccole (sola documentazione, spunte di task e TODO): in quel caso niente PR.
- **PR:** quelle aperte da te sono sempre **in bozza**, da `feature/claude/*` o `fix/claude/*` verso `develop`. `develop` → `main` solo col via esplicito dell'Operatore. **PR sotto i 300 file modificati**, altrimenti i bot non producono review: oltre soglia si spezza in PR impilate.
- **Prima della PR:** review degli agenti di progetto (`@reviewer`, `@design-system-checker` se tocchi la UI, `@test-writer` se mancano test) e gate `pre-pr-review` (workflow: classifica il diff, reviewer condizionati ai file toccati, verifica avversariale dei soli CRITICAL). Le modifiche piccole o cosmetiche possono saltare il gate.
- **Giri Codex:** solo quando l'Operatore li chiede; per le modifiche piccole non si chiedono, per non consumare la quota di Codex. Quando li chiede: sulla PR in bozza si commenta `@codex review`; si verificano i rilievi, si correggono quelli veri e si ricommenta `@codex review`, **finché Codex non segnala più problemi**. Questa regola sostituisce il limite di due giri di WeGree.
- **Rilievi dei bot:** si verificano sempre contro il codice, queste regole e la documentazione delle tecnologie; mai applicati alla cieca. I rilievi arrivano come review comment **inline** (`pulls/<n>/comments`), gli issue comment portano solo il riepilogo: si censiscono tutti gli endpoint filtrando l'autore. Se il bot risponde come un task (modifiche "fatte" nel suo sandbox, commit o PR che su GitHub non esistono), sono proposte da verificare e re-implementare con test.
- **Mai menzionare `@copilot` in un commento:** attiva l'agente di coding, che pusha commit sul ramo.
- **Merge solo col via esplicito dell'Operatore**, che prima controlla il codice. A PR completa (check verdi, rilievi verificati e risolti) ci si ferma e si chiede il via; il via vale solo per la PR per cui è dato. Dopo il via si mergia con un merge commit da un worktree staccato su `origin/develop` (`git merge --no-ff <ramo>`, poi `git push origin HEAD:develop`): GitHub segna da solo la PR come mergiata. Dopo il merge si controllano comunque i commenti dei bot arrivati sulla PR.

## SpecDD

Ogni feature o modifica nasce da una spec in `.specdd/NNN-nome/` (requirements → design → tasks), anche le piccole. Nessun codice senza spec. `requirements.md` (cosa e perché, formato EARS) e `design.md` (come tecnico) li approva l'Operatore; poi `tasks.md`. Si crea con `/spec-new`. Accanto al codice vivono i contratti `.sdd` (radice: `app.sdd`). La spec è lo storico del *perché*; i documenti `docs/` restano lo stato attuale. Dettagli in [`docs/02-specdd.md`](./docs/02-specdd.md).

## Documentazione

La fonte di verità è in `docs/` (indice: [`docs/README.md`](./docs/README.md)). Leggere il documento pertinente prima di lavorare su una sezione. Se una modifica cambia un flusso, una regola o una decisione, aggiornare il documento corrispondente nello stesso commit.

| Documento | Contenuto |
|---|---|
| [`docs/00-visione-progetto.md`](./docs/00-visione-progetto.md) | Visione, superfici, climi, decisioni tecniche, domande aperte |
| [`docs/01-ambienti-e-deploy.md`](./docs/01-ambienti-e-deploy.md) | Node e pnpm, script, `generate`, caricamento FTP, redirect Pages, CI |
| [`docs/02-specdd.md`](./docs/02-specdd.md) | SpecDD in questo repo |
| [`docs/03-agenti-e-comandi.md`](./docs/03-agenti-e-comandi.md) | Agenti, comandi, skill, workflow |
| [`docs/04-review-e-pr.md`](./docs/04-review-e-pr.md) | Rami, PR, review, giri Codex, merge |
| [`docs/05-seo.md`](./docs/05-seo.md) | Regole di base di SEO e accessibilità delle pagine |
| [`docs/06-glossario.md`](./docs/06-glossario.md) | Termini di dominio IT → EN e convenzioni di naming |
| [`docs/coding-style.md`](./docs/coding-style.md) | Convenzioni di codice |
| [`docs/TODO.md`](./docs/TODO.md) | Piano per fasi |
| [`docs/agents-changelog.md`](./docs/agents-changelog.md) | Diario delle sessioni degli agenti |
| [`docs/discovery/`](./docs/discovery/README.md) | Materiale del brainstorming (storico, senza immagini) |

**Per scegliere il prossimo lavoro:** `docs/TODO.md`, poi le priorità di `docs/00-visione-progetto.md`.

Due regole permanenti:

- **Edge case e future-proofing.** Ogni flusso nuovo o modificato registra i suoi edge case nella sezione «Edge case» del `design.md` della spec (formato rischio → gestione, con criticità 🔴 🟡 🟢) e segnala le scelte che chiudono porte come nota o punto aperto. Ogni edge case 🔴 ha un test o una verifica esplicita.
- **Dubbi → domande.** Le ambiguità di prodotto non si risolvono in silenzio: diventano domande semplici all'Operatore, con un esempio concreto, e si annotano in `docs/00-visione-progetto.md` §Domande aperte; nel frattempo si sceglie l'opzione più reversibile.

## Comandi

I custom command sono in `.claude/commands/` (`/spec-new`, `/wf-new-feature`, `/wf-fix-bug`, `/wf-tests`, `/visual-plan`, `/visual-recap`). Dettagli in [`docs/03-agenti-e-comandi.md`](./docs/03-agenti-e-comandi.md).

## Agenti

I subagent sono in `.claude/agents/`: `@reviewer`, `@test-writer`, `@docs-sync`, `@pr-writer`, `@design-system-checker` (vedi [`docs/03-agenti-e-comandi.md`](./docs/03-agenti-e-comandi.md)). Dopo aver costruito una sezione usa `@reviewer`, e `@design-system-checker` se hai toccato la UI; `@test-writer` quando mancano i test, `@docs-sync` quando cambia un flusso o una decisione, `@pr-writer` per la descrizione della PR.

## Agent skills

Configurazione per-repo che le skill ingegneristiche (`to-tickets`, `triage`, `to-spec`, `wayfinder`) si aspettano di trovare. Vive in `docs/agents/` ed è **in inglese** per restare diffabile contro i template originali delle skill: è config di tooling di terze parti, non documentazione di prodotto — l'unica eccezione alla regola 7.

### Issue tracker

Issue e bug vivono come GitHub issue su `LuXDAmore/LuXDAmore`, via CLI `gh`. Le PR **non** sono superficie di richiesta (sono tutte interne). Il tracker è una coda di richieste in ingresso, non un secondo piano: `docs/TODO.md` resta il piano e la spec canonica di una feature resta in `.specdd/NNN-nome/`. Vedi `docs/agents/issue-tracker.md`.

### Triage labels

Le cinque label canoniche senza rinomine (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), create al primo uso se mancano. Vedi `docs/agents/triage-labels.md`.

### Domain docs

Single-context. Il glossario di dominio è `docs/06-glossario.md`; `CONTEXT.md` e `docs/adr/` non esistono e li crea `/domain-modeling` quando serve — nel frattempo le decisioni stanno in `docs/00-visione-progetto.md`, nei `design.md` sotto `.specdd/` e nelle regole non negoziabili qui sopra. Vedi `docs/agents/domain.md`.

## Orchestrazione economica (motore + revisore)

Quando orchestri un task non banale, il main loop è il cervello: capisce il problema, pianifica, delega e **rivede** i risultati. Apri un Workflow quando la struttura lo ripaga (fan-out, verifica avversariale, modifiche ampie), non per ogni task. Il risparmio nasce dall'**isolamento del contesto** — i worker bruciano token nel loro contesto e restituiscono solo la conclusione, così il cervello resta magro — non dall'abbassare la qualità. **Default alla soluzione più piccola che funziona**, su tutti i piani: codice (niente util o astrazione per ciò che bastano tre righe o contenuto statico), orchestrazione (un giro di lavoro più una review bastano quasi sempre) e lunghezza dei testi (se la spiegazione è più lunga del codice, si taglia la spiegazione).

Assegna il modello ai worker per **costo dell'errore e intensità di codice**. Un worker **non eredita mai** il modello del cervello per caso: l'override è esplicito, l'escalation è deliberata.

**Il cervello non scrive codice ma resta SEMPRE il revisore.** Pianifica, delega, e **rivede in prima persona ogni output dei worker prima di applicarlo o committarlo** — la review finale del cervello non si delega (i reviewer sono un livello in più, non un sostituto). La scrittura di codice si delega a un subagent con override esplicito. Eccezione: micro-edit banali (una riga, un typo) dove il costo del subagent supererebbe l'edit. Sui token: contano, **ma la qualità del codice conta di più** — in dubbio tra due tier per un task di codice, prendi il più alto.

- **Codice ad alto costo d'errore** (pipeline delle foto e metadati, privacy GPS, build e deploy, CI) → `model:'opus'`, `effort:'xhigh'`; review Opus `high`+ e sempre il giudizio finale del cervello.
- **Scrittura di codice — default** (feature, fix, refactor, test, UI) → `model:'opus'`, `effort:'high'`.
- **Edit meccanici e a basso rischio** (rename diffusi, sweep di formattazione, docs) → `model:'sonnet'`, `effort:'medium'`.
- **Ragionamento e sintesi più duri** → il cervello (`model:'fable'`, `effort:'high'`) oppure ometti l'override.
- **Haiku / `effort:'low'`**: solo operazioni davvero meccaniche e senza rischio di "farsi scappare qualcosa" — di norma evitali (e mai per il codice).
- **Letture e ricognizioni di repo e doc** (scan, censimenti, raccolta contesto) → `model:'sonnet'`, `effort:'low'|'medium'`: mai il cervello a leggere file in massa, mai Opus per sola lettura.

Gli agenti in `.claude/agents/` hanno già il tier giusto nel frontmatter (`model:`): `@reviewer` e `@test-writer` usano Opus, gli altri Sonnet.

Nei fan-out paralleli sullo stesso working tree i worker non usano comandi git che mutano lo stato (`stash`, `reset`, `checkout --`, `commit`, `add`): commit e push restano al cervello, a batch verificato.

## Priorità di qualità

- **Accessibilità**: tastiera, focus visibile, contrasto, `alt`, movimento ridotto su richiesta; un'esperienza sperimentale resta navigabile da tutti.
- **Prestazioni**: immagini nelle varianti e dimensioni giuste, niente layout shift, WebGL e animazioni che non bloccano il primo contenuto; il peso delle pagine si misura.
- **Qualità visiva**: fedeltà del colore delle foto, design curato e non decorativo (`docs/00-visione-progetto.md`).

Ogni bug fix lascia un regression test; ogni edge case 🔴 ha un test.
