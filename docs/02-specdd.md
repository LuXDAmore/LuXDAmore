# 02 — Spec-Driven Development (SpecDD)

> Ogni feature o modifica nasce da una spec scritta e approvata **prima** del codice. La spec è la fonte di verità del cambiamento; il codice ne è la conseguenza. Metodo importato da WeGree.

## Perché

I documenti in `docs/` descrivono lo **stato** del progetto. Le spec descrivono i **cambiamenti**: cosa stiamo per fare, perché e come. Insieme danno tracciabilità: chiunque, umano o AI, sa cosa è in corso e perché una scelta è stata presa.

## Due layer

- **Spec di feature** — `.specdd/NNN-nome/` con `requirements.md`, `design.md`, `tasks.md`: il cosa, il perché e il come di un **cambiamento**. Sono lo storico del *perché*.
- **Contratti `.sdd`** — file `*.sdd` accanto al codice, con `app.sdd` in root come radice della catena: descrivono il comportamento atteso del singolo file o modulo, con ereditarietà per cartella e permessi di scrittura (`Owns` / `Can modify` / `Can read`). Prima di creare o modificare codice si risolve la catena (file → cartelle antenate → `app.sdd`), come chiede `CLAUDE.md` §0.

Il formato dei `.sdd` è in `.specdd/bootstrap.md`; le regole di progetto in `.specdd/bootstrap.project.md`; gli override locali dell'Operatore in `.specdd/bootstrap.local.md` (non versionato). Si leggono in quest'ordine, e i file successivi prevalgono.

## Le tre fasi di una spec di feature

```text
.specdd/
├── _template/            # i tre file da copiare
└── 001-repo-baseline/    # esempio
    ├── requirements.md   # 1. COSA e PERCHÉ  → approva l'Operatore
    ├── design.md         # 2. COME tecnico   → approva l'Operatore
    └── tasks.md          # 3. lista di task  → si esegue
```

1. **`requirements.md`** — il cosa e il perché, senza soluzioni tecniche. Requisiti in formato **EARS** (QUANDO / SE / IL SISTEMA DEVE), così sono testabili. Contiene anche fuori scope e criteri di accettazione.
2. **`design.md`** — il come tecnico: approccio, file toccati, edge case (rischio → gestione, con criticità 🔴 🟡 🟢), note e punti aperti.
3. **`tasks.md`** — task ordinati e verificabili, ognuno con la sua verifica (test, comando, controllo). Include test, documentazione, review e PR.

Si crea con `/spec-new`, che copia `_template/` e numera la cartella.

## Numerazione e naming

`.specdd/<NNN>-<kebab-case>/`, con NNN progressivo a tre cifre: il massimo esistente + 1; i buchi non si riusano. Il nome della spec richiama quello del ramo (di norma è lo stesso; per la 001: `.specdd/001-repo-baseline/` ↔ `feature/claude/repo-alignment`), così spec, ramo e PR si collegano a colpo d'occhio.

## Granularità

**Una spec per ogni feature o modifica**, anche piccola. Per una modifica minima i tre file restano di poche righe: conta la tracciabilità, non la lunghezza.

## Il flusso

```text
1. /spec-new nome           → .specdd/NNN-nome/ dal template
2. requirements.md          → l'Operatore approva
3. design.md                → l'Operatore approva
4. tasks.md                 → dal design
5. /wf-new-feature nome     → ramo feature/claude/nome, sviluppo guidato dai task
6. task eseguiti            → @reviewer, @design-system-checker (UI), @test-writer
7. @docs-sync               → docs/ allineati se cambiano flussi o decisioni
8. @pr-writer + gate        → PR in bozza, giri @codex review se richiesti, via dell'Operatore
```

La spec non sostituisce `docs/`: li aggiorna a valle.

## La spec è una definizione, non un registro di avanzamento

`requirements.md` e `design.md` si scrivono già corretti e completi; `tasks.md` è la lista del lavoro della spec, con le caselle spuntate solo a lavoro verificato. Lo stato di una sessione (cosa resta oggi, cosa è bloccato) vive in `docs/TODO.md`, nella PR e in `docs/agents-changelog.md`, non dentro la spec. Un passo che non appartiene al lavoro della spec va nella descrizione della PR.

## Rapporto con il resto

- **Spec** = cosa, perché e come di un cambiamento.
- **Comandi** (`.claude/commands/`) = come si costruisce (`/spec-new`, `/wf-*`).
- **Agenti** (`.claude/agents/`) = verifica e supporto (`@reviewer`, `@docs-sync`…).
- **Documenti** (`docs/`) = stato attuale.

Dettagli su comandi e agenti: [`03-agenti-e-comandi.md`](./03-agenti-e-comandi.md).

## Regola d'oro

Nessun codice senza la sua spec. Per le modifiche minime la spec è minima, ma esiste.
