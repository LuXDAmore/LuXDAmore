---
description: "Avvia e sviluppa una nuova feature del portfolio dalla spec alla PR verso develop."
argument-hint: "[nome-feature]"
disable-model-invocation: true
---

Avvia e sviluppa una nuova feature. Feature: $ARGUMENTS

Workflow:
1. Verifica che esista la spec in `.specdd/NNN-$ARGUMENTS/` (requirements + design + tasks approvati). Se non c'è, fermati e suggerisci `/spec-new $ARGUMENTS` prima di procedere — nessun codice senza spec (vedi `docs/02-specdd.md`).
2. Definisci in 3-4 punti lo scope e i criteri di completamento; se la feature è ambigua, chiedi prima di procedere.
3. Da `develop` aggiornato, crea il branch `feature/claude/$ARGUMENTS` (kebab-case, allineato al nome della spec).
4. Risolvi la catena SpecDD dei file da toccare (`app.sdd` e i `.sdd` più vicini): lavora solo dentro `Owns`/`Can modify` e rispetta `Must`/`Must not`.
5. Segui i task in `.specdd/NNN-$ARGUMENTS/tasks.md`, spuntandoli man mano.
6. Sviluppa rispettando le convenzioni (`docs/coding-style.md`, `DESIGN.md`, `docs/05-seo.md`): TypeScript strict, prima gli strumenti del framework, YAGNI, solo generazione statica (niente runtime server in produzione), foto come vere immagini con `alt`, niente segreti né coordinate GPS nei file pubblicati.
7. Scrivi i test per la parte nuova (usa `/wf-tests`).
8. Verifica in locale: `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm generate` (il sito deve restare generabile in statico).
9. Aggiorna la documentazione con la skill `docs-update`, nello stesso commit del codice.
10. Review: `@reviewer`, `@design-system-checker` se tocchi la UI, `@test-writer` se mancano test. Se il diff non è banale, esegui il gate `pre-pr-review`. Poi apri la PR verso `develop` **in bozza**, con descrizione chiara di cosa cambia e come testarlo (`@pr-writer`).
11. Se l'Operatore chiede la review di Codex, sulla PR commenta `@codex review`; verifica ogni rilievo contro il codice e le regole del progetto (mai applicarlo alla cieca), correggi quelli veri e ricommenta `@codex review` finché Codex non segnala più problemi (vedi `docs/04-review-e-pr.md`). Non menzionare mai `@copilot` nei commenti.

Vincoli: non mergiare la PR, né in `develop` né in `main`, senza il via esplicito dell'Operatore: a PR completa (check verdi, rilievi verificati e risolti) ci si ferma e si chiede. Commit piccoli e descrittivi, in italiano. Non toccare `README.md` (è il README del profilo GitHub). Aggiorna i documenti in `docs/` se la feature cambia un flusso o una decisione.
