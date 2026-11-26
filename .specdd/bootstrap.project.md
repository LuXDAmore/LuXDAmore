# SpecDD project specific overrides

This is a Nuxt 4, Vue 3, TypeScript, Nuxt UI and Tailwind CSS static site: the personal portfolio of Luca Iaconelli (`lucaiaconelli.it`), generated with `pnpm generate` into `.output/public` and uploaded via FTP to a host without Node.

When applying SpecDD in this repository:

1. Resolve `app.sdd` first, then any ancestor `.sdd` files down to the target path.
2. Treat `docs/*.md` as product/architecture context when a local spec references them (`docs/00-visione-progetto.md` for vision and decisions, `docs/README.md` for the index).
3. Feature specs live in `.specdd/NNN-name/` (`requirements.md` in EARS → `design.md` → `tasks.md`), created from `.specdd/_template/`; no code without a spec.
4. Keep the site statically generable: no server runtime in production, no secrets in the repository or in the client bundle, no GPS coordinates in published images or data.
5. Update the relevant `.sdd` file when behavior, ownership, or local tasks change.
6. Follow the repository documentation rule: update `docs/TODO.md` and `docs/agents-changelog.md` in the same PR for meaningful coding/spec sessions (skill `docs-update`).
7. `README.md` is the GitHub profile README, not project documentation: never edit it without an explicit Operator request.
