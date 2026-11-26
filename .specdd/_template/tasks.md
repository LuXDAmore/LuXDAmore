# NNN — Tasks

- [ ] T1 — <attività> → verifica: <check>
- [ ] T2 — Test dei criteri di accettazione di `requirements.md` e degli edge case 🔴 di `design.md` → verifica: `pnpm test` verde
- [ ] T3 — Verifiche locali: `pnpm lint`, `pnpm typecheck`, `pnpm generate` verdi
- [ ] T4 — `@reviewer` (più `@design-system-checker` se tocca la UI, `@test-writer` se mancano test) + gate `pre-pr-review` se il diff non è banale
- [ ] T5 — Aggiornare `docs/` pertinenti, i `.sdd` toccati, `docs/TODO.md` + `docs/agents-changelog.md` (skill `docs-update`)
- [ ] T6 — PR in bozza verso `develop`, giri `@codex review` fino a esito pulito, poi via dell'Operatore per il merge
