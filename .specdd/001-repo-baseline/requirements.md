# 001 — Base del repo: portfolio Nuxt statico allineato al metodo WeGree

> Trasforma il repo profilo `LuXDAmore/LuXDAmore` nella base del portfolio `lucaiaconelli.it`: app Nuxt statica minima (homepage vuota), metodo e strumenti importati da WeGree ripuliti dal dominio aste, documentazione e decisioni del brainstorming leggibili anche dal web. Riferimenti: [`docs/00-visione-progetto.md`](../../docs/00-visione-progetto.md), [`docs/discovery/`](../../docs/discovery/).

## Contesto / perché

Il repo oggi è solo il README del profilo GitHub. L'Operatore vuole che diventi anche il progetto del portfolio personale (developer + fotografo). Ha copiato da WeGree best practice Nuxt, configurazioni, agenti, skill, SpecDD e impostazione dei documenti: vanno tenuti come metodo, ma tutto ciò che riguarda il dominio WeGree (aste, Supabase, Stripe, Resend, Fallco, Zucchetti, backoffice, i18n di prodotto) va tolto. Il primo rilascio è una homepage vuota generata in statico e caricata via FTP; il design arriva con spec successive.

## Requisiti (EARS)

- **R1** — Il repo DEVE mantenere `README.md` identico al profilo GitHub attuale.
- **R2** — Il repo DEVE contenere un'app Nuxt 4 che `pnpm generate` trasforma in un sito statico in `.output/public`, caricabile via FTP su `lucaiaconelli.it` senza runtime Node.
- **R3** — Il sito DEVE avere per ora una sola pagina, la homepage, vuota alla vista ma semanticamente corretta: `lang="it"`, un `<main>` con un `<h1>` (anche solo per screen reader), title e description.
- **R4** — Il repo NON DEVE contenere codice, dipendenze, configurazioni, spec, agenti, comandi, workflow o documenti del dominio WeGree.
- **R5** — Il repo NON DEVE versionare segreti, chiavi private, riferimenti a progetti di terzi (es. il progetto Supabase di WeGree) né le foto dell'archivio fotografico.
- **R6** — Il metodo di lavoro DEVE essere quello di WeGree adattato: SpecDD, documentazione obbligatoria nello stesso commit, codice in inglese e spiegazioni in italiano, "prima gli strumenti del framework", agenti e skill di progetto, PR in bozza su rami `feature/claude/*` e `fix/claude/*` verso `develop`.
- **R7** — QUANDO una PR è aperta, il flusso di review DEVE essere: review degli agenti di progetto e gate pre-PR, poi commento `@codex review` ripetuto finché Codex non segnala più problemi; il merge avviene solo col via esplicito dell'Operatore.
- **R8** — La CI DEVE eseguire su ogni PR typecheck, lint, test unitari e `nuxt generate`, senza richiedere segreti.
- **R9** — QUANDO si visita la GitHub Pages del repo (`luxdamore.github.io/LuXDAmore/`), il visitatore DEVE essere reindirizzato a `https://lucaiaconelli.it`.
- **R10** — La documentazione DEVE raccogliere visione, decisioni e materiale del brainstorming in `docs/` (indice in `docs/README.md`), leggibile da una sessione web senza contesto locale.
- **R11** — SE un file importato da WeGree è generico ALLORA DEVE restare allineato all'originale, salvo i soli adattamenti di nome, dominio e riferimenti.

## Fuori scope

- Design, contenuti, mondo developer, mondo fotografico, pipeline Lightroom → spec successive.
- Deploy FTP automatico (si carica a mano `.output/public`; l'automazione è una spec futura).
- SEO avanzata (sitemap, OG image, dati strutturati), i18n, analytics.
- Repo `LuXDAmore.github.io` (scelta Operatore: Pages su questo repo).

## Criteri di accettazione

- `README.md` invariato rispetto a `master` (R1).
- `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test` e `pnpm generate` verdi in locale e in CI; `.output/public/index.html` contiene `<html lang="it">`, `<main>` e `<h1>` (R2, R3, R8).
- Un test unitario verifica la homepage (h1 presente) (R3).
- Ricerca case-insensitive di `wegree|supabase|stripe|resend|fallco|zucchetti|backoffice` nei file versionati, escluse le skill vendor e la cronologia del brainstorming in `docs/discovery/`, restituisce solo menzioni volute (es. "metodo importato da WeGree") (R4).
- `certificates/`, `.env*`, immagini dell'archivio e zip esclusi da git; `.mcp.json` versionato solo con server generici (R5).
- Il workflow Pages pubblica solo la pagina di redirect (R9).
- `docs/README.md` indicizza tutti i documenti presenti, senza link rotti (R10).
