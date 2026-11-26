# Portfolio lucaiaconelli.it — Piano per fasi → Go-Live (decide l'Operatore)

> Ogni fase ha una quality gate: non si passa alla successiva senza averla soddisfatta.
> 🔴 bloccante per il go-live · 🟡 importante ma non bloccante · 🟢 posticipabile
>
> **Come si aggiorna questo file:** ogni cosa da fare o fatta è una **voce con checkbox** nella sezione pertinente (`- [ ]` / `- [x]` / `- [-]` + criticità). **Niente date**: quando una cosa è stata fatta lo dice `docs/agents-changelog.md`, che è il diario — qui si scrive solo *cosa* manca o *cosa* c'è, mai *quando*. Niente commenti HTML, niente note di sessione o resoconti in testa. Visione, decisioni e domande aperte stanno in `docs/00-visione-progetto.md`; il dettaglio di ogni lavoro nella sua spec in `.specdd/`.

---

## Azioni Operatore (fuori dal codice)

> Cose che **solo l'Operatore** può fare, perché richiedono credenziali o console esterne.

- [ ] 🔴 **Attivare GitHub Pages (Source = GitHub Actions) prima del primo merge su `master`** (Settings → Pages): senza, il primo giro di `pages.yml` fallisce a `configure-pages`; se succede, rilanciarlo con `workflow_dispatch` dopo l'attivazione (`docs/01-ambienti-e-deploy.md`).
- [ ] 🟡 **Caricare via FTP la homepage generata** (`pnpm generate`, contenuto di `.output/public` nella radice di `lucaiaconelli.it`) dopo il merge della spec 001 su `master`.
- [ ] 🟡 **Scegliere gli album Lightroom delle prime mostre** e condividerli via link web (domanda aperta in `docs/00-visione-progetto.md`).

## Fase 1 — Base del repo (spec 001) ← fase attuale

- [x] 🔴 Copie dei segreti WeGree eliminate; spec WeGree rimosse da `.specdd/`; skill vendor in una PR separata.
- [x] 🔴 App Nuxt minima in generazione statica: homepage vuota ma semantica (`lang="it"`, `<main>`, `<h1>`, title e description), con un test.
- [x] 🔴 Tooling, agenti, comandi, skill `docs-update` e SpecDD ripuliti dal dominio WeGree.
- [x] 🔴 Documentazione riscritta per il portfolio (`CLAUDE.md`, `DESIGN.md`, `docs/`).
- [x] 🔴 CI (`ci.yml`: typecheck, lint, test, generate, senza segreti), `security.yml` con azioni fissate a SHA verificati, redirect Pages (`pages.yml` + `.github/pages/`).
- [x] 🔴 Scansione di dominio e segreti sul diff.
- [ ] 🔴 Review degli agenti e gate pre-PR.
- [ ] 🔴 PR in bozza verso `develop`, giri `@codex review` fino a esito pulito, merge col via dell'Operatore.

**Gate:** `pnpm install`, `typecheck`, `lint`, `test` e `generate` verdi in locale e in CI; `README.md` invariato; nessun riferimento al dominio WeGree fuori dalle menzioni volute.

## Fase 2 — Design della soglia e portfolio fotografico

- [ ] 🔴 Spec del design della soglia (developer / fotografia): copy, cosa si vede prima della scelta, climi, movimento; scrive `DESIGN.md`.
- [ ] 🔴 Spec della pipeline delle foto: export da Lightroom in una cartella del progetto → script di build (varianti AVIF/WebP, colori dominanti, EXIF ripuliti senza GPS, segnaposto) → JSON letto da Nuxt.
- [ ] 🔴 Decidere dove vivono le immagini ottimizzate (repo, storage esterno, CDN) e quanto pesano.
- [ ] 🔴 Spec del portfolio fotografico: prime mostre (`Exhibitions`) e percorso `Spectrum`.
- [ ] 🟡 Mondo developer: per ora un link al CV esistente (`curriculumvitae.lucaiaconelli.it`) e agli esperimenti.
- [ ] 🟡 Decidere il bilingue IT/EN (spec dei contenuti).
- [ ] 🟢 Icone: quando servono, installare le collezioni `@iconify-json/*` e usare il bundle client di `@nuxt/icon` (l'host FTP non ha l'endpoint server `/api/_nuxt_icon`).

**Gate:** soglia e prime mostre navigabili da tastiera, foto come vere `<img>` con `alt`, nessuna coordinata GPS nei file pubblicati, peso delle pagine misurato.

## Fase 3 — Go-Live (quando lo decide l'Operatore)

- [ ] 🔴 SEO completa (sitemap, immagini Open Graph, dati strutturati) con una sua spec (`docs/05-seo.md`).
- [ ] 🔴 Audit di accessibilità e prestazioni sulle pagine pubblicate.
- [ ] 🟡 Deploy FTP automatico (oggi è manuale).
- [ ] 🟡 Al go-live: eliminare la sezione «Niente retrocompatibilità fino al go-live» di `docs/coding-style.md`.

## Dopo

- [ ] 🟢 Percorso `Atlas` (viaggi e luoghi).
- [ ] 🟢 Percorsi `Visual Studies`, `Experiences`, `Laboratory`.
- [ ] 🟢 Mondo developer completo: CV assorbito nel portfolio, esperimenti integrati.
