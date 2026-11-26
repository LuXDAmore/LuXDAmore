---
description: "Genera i test (unit/component) per un modulo del portfolio seguendo la sua spec. Usa proattivamente dopo aver implementato un modulo."
argument-hint: "[modulo]"
allowed-tools: Bash(pnpm test*)
---

Genera i test per un modulo. Modulo: $ARGUMENTS

Prima leggi la spec del modulo in `.specdd/NNN-nome/` (se c'è), la catena dei `.sdd` a partire da `app.sdd` e `docs/coding-style.md` §Prima gli strumenti del framework.

Se il modulo ha una spec in `.specdd/NNN-nome/`, i test devono coprire i **criteri di accettazione** di `requirements.md` e gli edge case elencati in `design.md`. Ogni criterio di accettazione = almeno un test.

Workflow — scegli i livelli giusti per il modulo $ARGUMENTS:
1. Unit (Vitest): logica pura — utility, trasformazioni dei dati delle foto (metadati, colori dominanti, luogo ridotto a città/paese), script di build.
2. Component (@nuxt/test-utils, `mountSuspended`/`renderSuspended`): pagine e componenti — semantica (`<main>`, un solo `<h1>`, `alt` sulle foto), title e description, stati e interazioni da tastiera.
3. Dati generati: se il modulo produce file pubblicati (JSON della pipeline foto, asset), un test fallisce se compaiono coordinate GPS o campi privati.
4. E2E: non configurati. Se un criterio li richiede davvero, segnalalo all'Operatore invece di aggiungere Playwright di tua iniziativa.

Comando: `pnpm test` (Vitest, unit + component).

Vincoli: ogni edge case 🔴 del `design.md` deve avere un test corrispondente. I test devono essere deterministici (niente rete, tempi reali o animazioni con durate vere). Si mocka solo ciò che dipende da stato esterno non riproducibile (rete, WebGL); per il resto gli strumenti del framework.
