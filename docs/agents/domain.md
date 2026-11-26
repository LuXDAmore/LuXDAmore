# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

Layout: **single-context**. There is no `CONTEXT-MAP.md` and no `packages/`, so treat this as one context.

## Before exploring, read these

- **`docs/06-glossario.md`** — the domain glossary for this repo. This is where the ubiquitous
  language actually lives: the IT→EN domain map (`soglia` → `threshold`, `mostra` → `exhibition`,
  `percorso` → `collection`, `clima` → `climate`, …) plus the naming conventions. Read it before
  naming anything.
- **`docs/00-visione-progetto.md`** — vision, decisions and open questions: the closest thing to a
  product brief. Read it before proposing features or design.
- **`docs/`** — the source of truth for the **current state** of setup, deploy, conventions and
  method. Read the document that covers the area you're about to touch; the index is in
  `docs/README.md`.
- **`.specdd/NNN-name/`** — the history of **why**. `requirements.md` (what/why, EARS format) and
  `design.md` (the technical how) are this repo's de-facto ADRs, scoped per feature. Read the spec
  for the area you're changing.
- **`CONTEXT.md`** at the repo root and **`docs/adr/`** — **do not exist yet.** `/domain-modeling`
  creates them lazily when a term or a decision actually gets resolved. Until then the bullets
  above carry that weight; don't treat their absence as a gap to fill upfront, and don't duplicate
  the glossary into a new `CONTEXT.md`.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo (most repos):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo (presence of `CONTEXT-MAP.md` at the root):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

As it stands here (the shape the bullets above map onto):

```
/
├── README.md                ← GitHub profile README, never modified without an explicit request
├── docs/                    ← current state: vision, deploy, method, conventions (+ 06-glossario.md)
│   └── discovery/           ← brainstorming history (no images)
├── .specdd/NNN-name/        ← the *why*, per feature: requirements.md → design.md → tasks.md
├── DESIGN.md                ← source of truth for UI (a stub until the design spec)
└── app/                     ← the Nuxt app, generated as a static site
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

Here that means `docs/06-glossario.md`, with the repo's language rule on top (`CLAUDE.md`
§Regole non negoziabili, rule 7): **identifiers in English** — types, components, file names,
routes, data keys — and **prose in Italian** — comments, docs, specs, commits, site copy. Proper
nouns (`Spectrum`, `Exhibitions`, `Atlas`, `Lightroom`) are never translated. So an issue title
names the concept in Italian prose while the code identifiers it quotes stay English.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_

With no `docs/adr/` yet, the same rule applies to the artifacts that hold decisions here: the
decisions table in `docs/00-visione-progetto.md`, a `design.md` under `.specdd/`, and the
non-negotiable rules in `CLAUDE.md` §Regole non negoziabili. Contradicting one of those is a
conversation to have out loud, not a silent override.
