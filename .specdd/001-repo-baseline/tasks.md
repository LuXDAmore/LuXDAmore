# 001 — Tasks

- [x] T0 — Copie dei segreti WeGree (`.env*`, `.vercel/`) eliminate; 254 spec WeGree rimosse da `.specdd/`; skill vendor in PR separata (#3) → verifica: hash identici agli originali prima della rimozione
- [x] T1 — Blocco A (app e tooling) → verifica: `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm generate` verdi
- [x] T2 — Blocco B (agenti, comandi, settings, skill `docs-update`, SpecDD, `app.sdd`) → verifica: nessun riferimento a file o servizi inesistenti
- [x] T3 — Blocco C (CLAUDE.md, DESIGN.md, docs/, discovery) → verifica: `docs/README.md` senza link rotti
- [x] T4 — Workflow CI minima e `pages.yml` + `.github/pages/` → verifica: YAML valido, nessun secret richiesto
- [x] T5 — Scansione dominio e segreti sul diff (criteri R4, R5)
- [ ] T6 — `@reviewer`, `@design-system-checker` (UI), gate pre-PR
- [x] T7 — `docs/TODO.md` + `docs/agents-changelog.md` aggiornati
- [ ] T8 — PR in bozza `feature/claude/repo-alignment` → `develop`, giri `@codex review` fino a esito pulito, poi via dell'Operatore per il merge
