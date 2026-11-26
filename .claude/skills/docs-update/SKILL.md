---
name: docs-update
description: Aggiorna la documentazione del portfolio lucaiaconelli.it a fine di ogni sessione di coding — docs/TODO.md, docs/agents-changelog.md, i documenti in docs/ toccati, la spec in .specdd/ e i file .sdd. Usala dopo aver implementato una feature, un fix o un refactor, prima di committare o aprire una PR. Contiene le regole su cosa scrivere in ciascun file e cosa non toccare mai (README.md del profilo, CHANGELOG.md fuori dai rilasci, note di sessione in cima al TODO).
---

# Aggiornamento documentazione

Ogni sessione di coding aggiorna la documentazione **nello stesso commit/PR del codice che descrive**. Non è un passaggio opzionale né rimandabile a dopo il merge.

## 1. `docs/TODO.md`

Il piano vero è `docs/TODO.md`; il `TODO.md` in root è solo un rimando.

- Marca `[x]` le voci completate in questa sessione. **Non lasciare `[ ]` su cose che hai appena implementato.**
- Aggiorna le voci `Parziale` con lo stato reale.
- Aggiungi nuove voci per quello che hai scoperto strada facendo.
- Rimuovi le voci ormai superate o non più valide.
- **Tutto sta dentro una voce con checkbox, nella sezione pertinente.** Mai come nota di sessione in cima al file, mai come commento HTML.
- **Niente date.** Una voce dice *cosa* manca o *cosa* c'è, mai *quando* è stato fatto: il quando lo racconta `docs/agents-changelog.md`. Una data in più qui è un doppione che invecchia e che fa litigare i rami sullo stesso file.

Il diario di sessione non va qui: va in `docs/agents-changelog.md`.

## 2. `docs/agents-changelog.md`

Aggiungi una voce per la sessione, con intestazione datata, elencando ogni file nuovo significativo e ogni cambio di comportamento.

**Non modificare `CHANGELOG.md`** durante le sessioni: si aggiorna solo al rilascio di una versione.

## 3. `docs/`

Se la modifica tocca struttura dell'app, build e deploy statico (`pnpm generate`, upload FTP, CI, redirect GitHub Pages), pipeline foto, SEO/accessibilità, convenzioni o metodo di lavoro, aggiorna il documento corrispondente sotto `docs/` (indice in `docs/README.md`: se aggiungi un documento, indicizzalo). La fonte di verità dello *stato attuale* è `docs/`; la spec sotto `.specdd/NNN-nome/` resta lo storico del *perché*.

Tre regole permanenti che spesso si dimenticano:

- **Edge case.** Ogni flusso nuovo o modificato registra i suoi edge case nel `design.md` della sua spec (formato rischio → gestione, con criticità 🔴/🟡/🟢), nello stesso commit. Ogni edge case 🔴 deve avere un test.
- **Convenzioni cambiate → guide allineate.** Se la sessione cambia una convenzione (`docs/coding-style.md`, `docs/05-seo.md`, `DESIGN.md`, `CLAUDE.md`), cerca il vecchio termine con grep nelle guide (`.claude/agents`, `.claude/commands`, `.claude/workflows`, skill di progetto, `docs/03-agenti-e-comandi.md`, `docs/04-review-e-pr.md`) e allineale nello stesso commit.
- **Dubbi → domande.** Le ambiguità di prodotto non si risolvono in silenzio: diventano domande semplici, con esempio concreto, nei punti aperti del `design.md` della spec e come voce in `docs/TODO.md`; nel frattempo si sceglie l'opzione più reversibile. Le domande risposte si marcano ✅ e non si cancellano.

`docs/discovery/` è lo storico del brainstorming: non si aggiorna a fine sessione.

## 4. `.specdd/` e file `.sdd`

- Nella spec della sessione (`.specdd/NNN-nome/tasks.md`) spunta i task completati e verificati; se l'implementazione si è discostata dal `design.md`, aggiungi una nota di rimando invece di riscrivere la motivazione.
- Se cambiano comportamento, proprietà dei file o confini, aggiorna i `.sdd` della catena (`app.sdd` e quelli vicini ai file toccati): `Structure`, `Owns`, `Must`/`Must not`, `Tasks`, `Done when`.

## 5. `README.md`

**Mai.** È il README del profilo GitHub (`LuXDAmore/LuXDAmore`), non la documentazione del progetto: si modifica solo su richiesta esplicita dell'Operatore. Setup e comandi vivono in `docs/01-ambienti-e-deploy.md`.

## Verifica finale

Prima di chiudere: `docs/TODO.md` non deve contenere voci `[ ]` che hai implementato in questa stessa sessione, `docs/agents-changelog.md` ha la voce della sessione, e `git diff --name-only` non contiene `README.md`.
