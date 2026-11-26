# 04 — Rami, PR e review

> Come una modifica arriva su `develop` e poi su `main`. Le regole brevi sono in `CLAUDE.md` §Branch e PR; qui il dettaglio.

## Rami

| Ramo | Ruolo |
|---|---|
| `main` | Produzione e ramo di default. Da qui si genera il sito caricato su `lucaiaconelli.it` e si pubblica il redirect di Pages. Mai push diretto |
| `develop` | Integrazione. Riceve le PR di lavoro; push diretti solo su richiesta esplicita dell'Operatore |
| `feature/claude/<nome>`, `fix/claude/<nome>` | Rami di lavoro degli agenti, in kebab-case, legati a una spec |

`develop` → `main` si apre e si mergia solo col via esplicito dell'Operatore.

## Il flusso di una PR

1. **Spec** pronta e approvata (`.specdd/NNN-nome/`, [`02-specdd.md`](./02-specdd.md)).
2. **Lavoro** sul ramo `feature/claude/<nome>` o `fix/claude/<nome>`, con documentazione nello stesso commit del codice (skill `docs-update`).
3. **Controlli locali:** `pnpm typecheck`, `pnpm lint`, `pnpm test`.
4. **Review degli agenti:** `@reviewer`; `@design-system-checker` se cambia la UI; `@test-writer` se mancano test.
5. **Gate pre-PR:** workflow `pre-pr-review` ([`03-agenti-e-comandi.md`](./03-agenti-e-comandi.md)). Le modifiche piccole o cosmetiche possono saltarlo.
6. **PR in bozza** verso `develop`, descrizione da `@pr-writer`, in italiano.
7. **Giri Codex** (sotto), solo se l'Operatore li chiede, fino a esito pulito; CI verde in ogni caso.
8. **Stop:** si chiede all'Operatore il via per il merge.
9. **Merge** col via (sotto), poi controllo dei commenti dei bot arrivati sulla PR.

Modifiche piccole (sola documentazione, spunte di task e TODO): su indicazione dell'Operatore si committano direttamente su `develop`, senza PR né giri Codex, e poi `develop` si unisce in `main` con un merge commit.

Limite: **meno di 300 file modificati per PR**, altrimenti i bot non producono alcuna review. Oltre soglia si spezza in PR impilate (per la spec 001 le skill vendor stanno in una PR separata).

## Giri `@codex review`

- **Si chiede solo quando lo dice l'Operatore**: ogni giro consuma la quota di Codex, e per le modifiche piccole non serve.
- Aperta la PR in bozza, si scrive un commento con `@codex review`.
- I rilievi arrivano come **review comment inline** (`gh api repos/LuXDAmore/LuXDAmore/pulls/<n>/comments`); l'issue comment porta solo il riepilogo. Si leggono tutti gli endpoint filtrando l'autore: l'assenza di commenti non prova l'assenza di rilievi.
- Ogni rilievo si **verifica** (sotto, triage); quelli veri si correggono con un test o una verifica, quelli falsi si chiudono rispondendo con il motivo.
- Dopo le correzioni si ricommenta `@codex review`. **Si ripete finché Codex non segnala più problemi.** Questa regola sostituisce il limite di due giri di WeGree.
- Se Codex risponde come un task (modifiche fatte nel suo sandbox, commit o PR che su GitHub non esistono), sono proposte da verificare e re-implementare, mai modifiche applicate.

**Mai menzionare `@copilot` in un commento:** attiva l'agente di coding di Copilot, che pusha commit sul ramo. Se arriva una review di Copilot, i suoi rilievi si trattano come gli altri.

## Triage dei rilievi

Un rilievo (di un bot, di un agente o di un audit) è lavoro da fare ora solo se regge due domande:

1. **È riproducibile dal sito?** Un problema che nessuna pagina o interazione può far emergere non è un bug oggi; si chiude citando `file:riga` di ciò che lo impedisce e si lascia una nota per quando cambierà.
2. **Conta per il modello di minaccia reale?** È un sito statico personale: niente account, niente dati degli utenti, niente server. Contano davvero segreti nel repo o nei file pubblicati, metadati delle foto (GPS), link o contenuti rotti, accessibilità, prestazioni, regressioni visive. Hardening pensato per un'applicazione con utenti e backend si declassa, scrivendo perché e cosa lo farebbe risalire.

## Merge

- **Solo col via esplicito dell'Operatore**, che prima controlla il codice. Il via vale solo per la PR per cui è dato.
- Si mergia **in locale**, con un merge commit, da un worktree staccato su `origin/develop`:

  ```sh
  git merge --no-ff <ramo>
  git push origin HEAD:develop
  ```

  GitHub segna da solo la PR come mergiata.
- Dopo il merge si leggono comunque i commenti dei bot arrivati sulla PR.
- Il rilascio `develop` → `main` segue lo stesso schema, con la sua PR e il suo via. Dopo il merge su `main` l'Operatore genera e carica il sito ([`01-ambienti-e-deploy.md`](./01-ambienti-e-deploy.md)).
