---
description: "Correggi un bug del portfolio con approccio TDD: test che riproduce il bug, fix minimo, regression test, PR."
argument-hint: "[descrizione-bug]"
---

Correggi un bug. Bug: $ARGUMENTS

Workflow:
1. Da `develop` aggiornato, crea il branch `fix/claude/<breve-descrizione>`.
2. Per un bug, la spec completa di solito non serve. Ma SE la correzione cambia un comportamento previsto o un flusso, aggiorna la spec pertinente in `.specdd/` e i `.sdd` coinvolti (o creane una con `/spec-new`) prima di chiudere — la spec deve restare allineata al comportamento reale (vedi `docs/02-specdd.md`).
3. Riproduci il bug: scrivi prima un test che fallisce e dimostra il problema (regression test).
4. Individua la causa radice — non limitarti al sintomo. Se riguarda il sito generato, controlla anche l'output di `pnpm generate` (`.output/public`); se riguarda le foto, ricontrolla gli edge case del `design.md` della spec pertinente (privacy, metadati, varianti).
5. Applica la correzione minima.
6. Verifica che il test ora passi e che il resto resti verde: `pnpm test`, `pnpm lint`, `pnpm typecheck`, e `pnpm generate` se il fix tocca pagine o build.
7. Aggiorna la documentazione con la skill `docs-update`, nello stesso commit.
8. `@reviewer` (più `@design-system-checker` se tocchi la UI). Se il diff non è banale, esegui il gate `pre-pr-review`. Poi apri la PR verso `develop` **in bozza**, spiegando causa e soluzione, con il test che la copre; sulla PR commenta `@codex review` e ripeti dopo ogni correzione finché Codex non segnala più problemi, verificando ogni rilievo prima di applicarlo. Non menzionare mai `@copilot`.

Vincoli: ogni bug fix deve lasciare dietro di sé un test che ne previene la regressione. Se il bug nasce da un'assunzione sbagliata documentata, correggi anche il documento in `docs/`. Merge solo col via esplicito dell'Operatore.
