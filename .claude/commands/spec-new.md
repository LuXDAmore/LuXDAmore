---
description: "Crea una nuova spec SpecDD del portfolio (requirements → design → tasks) per una feature o modifica."
argument-hint: "[nome-feature]"
---

Crea una nuova spec SpecDD per una feature/modifica. Feature: $ARGUMENTS

Prima leggi `docs/02-specdd.md`, `app.sdd` e i documenti `docs/` pertinenti alla feature (almeno `docs/00-visione-progetto.md`).

Workflow:
1. Determina il prossimo numero: prendi il numero MASSIMO esistente in `.specdd/` (NNN a tre cifre) e aggiungi 1. Non riusare i buchi di numerazione: il numero è sempre max+1.
2. Crea `.specdd/NNN-<kebab-case di $ARGUMENTS>/` copiando i tre file da `.specdd/_template/`.
3. Compila `requirements.md`: contesto, obiettivo, user story, requisiti funzionali in formato EARS (QUANDO/SE/IL SISTEMA DEVE), non funzionali, fuori scope, criteri di accettazione. NIENTE soluzioni tecniche qui.
4. Fermati e presenta i requirements per l'approvazione (l'Operatore conferma il valore) prima di procedere al design.
5. Dopo l'ok, compila `design.md`: approccio, pagine/componenti/dati toccati, impatto sul sito generato (`pnpm generate`, upload FTP), flusso, edge case (rischio → gestione, con criticità), rischi, skill rilevanti, punti aperti.
6. Dopo l'ok sul design, genera `tasks.md`: lista ordinata e verificabile, con i test (edge case 🔴 per primi) e la chiusura (doc, agenti, gate pre-PR, PR, giri `@codex review` se l'Operatore li chiede).

Vincoli: una spec per ogni feature, anche piccola (in tal caso i file sono brevi). Il nome della spec corrisponde al branch (`feature/claude/<nome>`). Non scrivere codice in questa fase: solo la spec.
