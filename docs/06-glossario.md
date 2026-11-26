# 06 — Glossario e convenzioni di naming

> I termini del progetto in italiano (lingua dei documenti e del sito) e il nome canonico in inglese da usare nel codice. Prima di dare un nome a qualcosa si guarda qui; un termine che manca è un segnale: o si sta inventando un linguaggio che il progetto non usa, o va aggiunto.

## Lingua

**Tutto ciò che è codice è in inglese; tutto ciò che è spiegazione è in italiano** (`CLAUDE.md`, regola 7).

- **In inglese:** tipi e interfacce TypeScript, variabili, funzioni, componenti, composable, nomi di file e cartelle, segmenti di rotta, chiavi dei dati (JSON generati al build).
- **In italiano:** commenti, documentazione, spec, commit e PR, copy del sito.
- **Nomi propri** e marchi non si traducono: `Spectrum`, `Exhibitions`, `Atlas`, `Visual Studies`, `Experiences`, `Laboratory` (i percorsi di lettura), `Lightroom`, `Pentax`. Negli identificatori e nei path vanno in minuscolo o camelCase (`spectrum`, `exhibitions`, `atlas`, `visualStudies`).

## Termini di dominio

| Termine (IT) | Identificatore (EN) | Significato |
|---|---|---|
| soglia | `threshold` | La pagina d'ingresso divisa in due, da cui si sceglie tra developer e fotografia |
| mondo | `world` | Una delle due metà del sito (`developerWorld`, `photographyWorld`) |
| developer | `developer` | Il mondo del Luca sviluppatore (CV, esperimenti) |
| fotografo, fotografia | `photography` | Il mondo del Luca fotografo |
| opera, foto | `photo` | Una fotografia: entità unica, che può appartenere a più mostre e percorsi senza duplicati |
| mostra | `exhibition` | Selezione curata di foto con sequenza e testo; le mostre vivono nel percorso `Exhibitions` |
| percorso (di lettura) | `collection` | Uno dei sei modi di leggere l'archivio (Spectrum, Exhibitions, Atlas…). Non `path`, che nel codice è il percorso URL |
| clima | `climate` | L'atmosfera visiva di una zona (colore, velocità, grana, luce) |
| fondo | `background` | Il fondo vivo, sempre presente, che muta tra i climi |
| transizione | `transition` | Il passaggio continuo tra zone e climi |
| album | `album` | Album di Lightroom da cui si parte per esportare le foto |
| didascalia | `caption` | Testo breve legato a una foto |
| titolo | `title` | Titolo di una foto o di una mostra |
| luogo | `place` | Città o paese della foto (mai coordinate GPS) |
| viaggio | `trip` | Il viaggio a cui appartiene una foto (base di Atlas) |
| parola chiave | `keyword` | Parola chiave di Lightroom |
| colore dominante | `dominantColor` | Colore estratto al build da una foto (base di Spectrum) |
| tinta | `hue` | Famiglia di colore per cui si naviga Spectrum |
| sequenza | `sequence` | Ordine delle foto in una mostra |
| testo curatoriale | `statement` | Testo che racconta una mostra |
| variante | `variant` | Versione ottimizzata di una foto (formato e dimensione) generata al build |
| segnaposto | `placeholder` | Anteprima leggera mostrata mentre la foto carica |
| esperimento | `experiment` | Uno dei lavori del repo `LuXDAmore/experiments` |
| CV, curriculum | `resume` | Il curriculum (come nel repo `LuXDAmore/curriculum-vitae`) |
| Operatore | — | Luca, che dirige il lavoro degli agenti e dà il via ai merge (ruolo SpecDD, non entra nel codice) |

## Naming

- **Rami:** `feature/claude/<nome>`, `fix/claude/<nome>` (kebab-case), legati alla spec ([`04-review-e-pr.md`](./04-review-e-pr.md)).
- **Spec:** `.specdd/NNN-<nome>/` (NNN progressivo) ([`02-specdd.md`](./02-specdd.md)).
- **Pagine:** una cartella per rotta con `index.vue`, nomi in inglese ([`coding-style.md`](./coding-style.md) §Rotte e pagine).
- **Componenti Vue:** PascalCase, una cartella per componente (`App/Footer/Footer.vue` → `<AppFooter>`).
- **Composable:** `useXxx`.
- **Commit:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`…), descrizione in italiano.
