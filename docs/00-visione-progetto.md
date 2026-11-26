# 00 — Visione del progetto

> Cosa stiamo costruendo, perché, e cosa è già deciso. Sintesi del brainstorming del 24–26 novembre 2026 tra l'Operatore (Luca Iaconelli, `luxdamore`) e Claude. Il materiale completo è in [`discovery/`](./discovery/README.md).

## In una frase

`lucaiaconelli.it` è il portfolio personale di Luca: **una soglia** da cui si sceglie tra **il developer** e **il fotografo**, con un'esperienza visiva e di interazione "da Awwwards", sperimentale e curata. La reazione che deve suscitare: *"assurdo, bellissimo, che sito"*.

## Le superfici

| Superficie | Ruolo | Stato |
|---|---|---|
| Profilo GitHub (`README.md` di questo repo) | Vetrina essenziale per chi passa da GitHub | Resta com'è |
| GitHub Pages (`luxdamore.github.io/LuXDAmore/`) | Solo ingresso: redirect a `lucaiaconelli.it` | Spec 001 |
| `lucaiaconelli.it` | Il portfolio: Nuxt generato in statico, caricato via FTP | Spec 001: homepage vuota |
| `curriculumvitae.lucaiaconelli.it` | CV attuale (repo `LuXDAmore/curriculum-vitae`, Vue 2 + webpack 4, dati in `resume/data.{it,en}.json`) | Da assorbire nel mondo developer |
| `luxdamore.github.io/experiments` | 15 esperimenti Three.js/GSAP/Lenis/Motion (repo `LuXDAmore/experiments`, monorepo pnpm) | Da collegare al mondo developer |

Dominio: un solo dominio con percorsi (non sottodomini), perché le transizioni continue tra soglia e mondi richiedono la stessa applicazione.

## Priorità

1. **Ora**: base del repo ([spec 001](../.specdd/001-repo-baseline/requirements.md)).
2. **Poi**: la soglia divisa in due (developer / fotografia) e **il portfolio fotografico**. Il mondo developer per ora è solo un link al CV esistente.

## Il mondo del fotografo

### Le foto

Neri profondi con colori dominanti intensi, minimalismo e spazio negativo, figure umane minuscole e isolate, contrasti di luce, natura immersiva, geometrie, mosso intenzionale, un po' di documentario. Circa 50.000 RAW (Pentax, `.PEF`/`.DNG`) e video in Lightroom CC. L'organizzazione è già per viaggio (`World › Asia › Giappone › Tokyo › K1 - 2`), ci sono album di mostre in preparazione (`_Varie › Shooting › Mostre`) e album per colore e concetto (B, G, R, Orange, Blurred, Stars, UnSelfie, Tokyo in movimento).

### Architettura dei contenuti

Dalla [lettura curatoriale](./discovery/lettura-curatoriale/LETTURA-CURATORIALE.md), sei percorsi di lettura sullo stesso archivio:

| Percorso | Domanda | Note |
|---|---|---|
| **Spectrum** | Come appare la realtà? (per colore) | Lo spazio più originale: nessun sito premiato naviga per tinta su base scura |
| **Exhibitions** | Perché queste immagini insieme? (mostre) | Prime candidate: *Smallness*, *Chromatic Earth*, *Reality, Abstracted* |
| **Atlas** | Dove e quando? (viaggi e luoghi) | Dai viaggi già ordinati in Lightroom |
| Visual Studies | Come è costruita? (forma) | Più avanti |
| Experiences | Come si può vivere? | Più avanti |
| Laboratory | Come si trasforma? | Più avanti |

Principio: **un'opera, tante appartenenze**. Una foto è un'entità unica; mostre e percorsi sono letture diverse, senza duplicare file o dati.

### I climi

Il sito non ha uno stile solo: ogni zona ha il suo clima, e il passaggio tra climi è parte dell'esperienza (un unico fondo vivo che muta, senza stacchi).

| Zona | Clima |
|---|---|
| Soglia | Due metà: a sinistra la foto tradotta in codice (ASCII, dithering), a destra la foto vera nel buio |
| Developer | Brutalista, giocoso, colori acidi, codice in vista |
| Spectrum | Arcobaleno fluido e sognante; scelto un colore, tutto diventa quel colore |
| Exhibitions | Nero elegante e profondo, da galleria |
| Atlas | Avventuroso, in movimento, il mosso del viaggio |

Costanti tra i climi: tipografia, navigazione, grammatica del movimento, fondo sempre presente. Variabili: colore, velocità, grana, luce.

### Riferimenti scelti dall'Operatore

- [gianlucagradogna.com](https://gianlucagradogna.com/) — due mondi affiancati, scroll opposti (il più vicino alla soglia).
- [Codrops, Mood-Based Backgrounds](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/) — lo sfondo prende la palette delle foto.
- [ottografie.nl](https://www.ottografie.nl/) — "sembra tutta un'interazione unica, ma il design non troppo".
- [photoyoshi.com](https://photoyoshi.com/) (meno) — scroll che reagisce alla velocità.
- Ispirazioni di lunga data: [hajimewatanabe.jp](https://hajimewatanabe.jp/) (fluido → Spectrum), [taotajima.jp](https://taotajima.jp/) (noir → Exhibitions), Project Parallax (ingresso rituale, [copia archiviata](https://web.archive.org/web/20240112173917/https://project-parallax.com/)), [tismes.com](https://tismes.com/) e [rluijten.photography](https://rluijten.photography/) (viaggio → Atlas).
- Mondo developer: [holo.punchred.xyz](https://holo.punchred.xyz/), [rouserlab.com/about](https://www.rouserlab.com/about/), [offscreencanvas.com/issues](https://offscreencanvas.com/issues/).
- Esteticamente "pienezza" e spazi ampi come [fosceramiche.it](https://www.fosceramiche.it/) (altro sito dell'Operatore).

Tutto il catalogo dei riferimenti: [ricerca](./discovery/ricerca/siti-fotografia-esperienziale-premiati.md) e [moodboard](https://claude.ai/artifact/7McvceXoamq7aN6946z7yW).

## Decisioni tecniche

| Decisione | Scelta | Perché |
|---|---|---|
| Framework | Nuxt 4 in generazione statica (`pnpm generate` → `.output/public`) | Stack dell'Operatore; host FTP senza Node |
| Rendering | Ibrido: pagine HTML semantiche e foto come vere `<img>` (SEO, colore fedele), WebGL per atmosfera e per le foto in movimento (transizioni, velocità, fluidi) | Scelta Operatore "un po' A e un po' B"; indicizzabile |
| Movimento | GSAP + Lenis; un canvas WebGL persistente tra le pagine | Continuità tra climi |
| Pipeline foto | Lightroom (album) → modifica → export in una cartella del progetto → script di build (varianti AVIF/WebP, colori dominanti, EXIF, placeholder) → JSON → Nuxt | Lightroom resta lo strumento dell'Operatore |
| Dati curatoriali | Ibrido: dati della singola foto in Lightroom (titolo, didascalia, luogo, parole chiave); file di testo per mostra nel progetto (sequenza, testo curatoriale) | La foto sa cos'è, la mostra sa come raccontarla |
| Privacy | Niente coordinate GPS nei file pubblicati: luogo ridotto a città/paese | Sicurezza dell'Operatore |
| Peso del repo | Export originali fuori da git; nel repo solo versioni ottimizzate o storage esterno (da decidere) | Repo pubblico e leggero |
| Pages | Su questo repo, solo redirect | Scelta Operatore |
| Protezione dei rami | Nessuna: niente approvazioni obbligatorie né `.github/settings.yml`; merge e push su `develop` e `main` restano concessi | Un solo manutentore; scelta Operatore |

## Lightroom e Claude

Il connettore Adobe (claude.ai) cerca nel catalogo Lightroom **per contenuto** ("cielo stellato", "figure nel deserto") e restituisce anteprime; può applicare ritocchi che producono **copie**. Non naviga gli album, non scarica i RAW, non organizza il catalogo. Gli album condivisi via link web invece si leggono interi (titoli, numero di foto, anteprime). Uso previsto: selezione delle candidate per le mostre fatta a quattro mani, export finale dell'Operatore.

## Stato delle prove di design

- v1 (cinque schermate statiche) e v2 (prototipo WebGL a schermo intero) **non convincono**: troppo "presentazione", poca ispirazione dai riferimenti. Sono conservate in [`discovery/prove-design/`](./discovery/prove-design/) solo come storico.
- L'asticella: prototipi immersivi veri, poche idee forti prese esplicitamente dai riferimenti scelti, design curato e non decorativo.

## Domande aperte

- Nome e organizzazione della soglia (copy, cosa si vede prima della scelta).
- Dove vivono le immagini ottimizzate (repo, storage esterno, CDN) e quanto pesano.
- Quali album Lightroom diventano le prime mostre (servono link web condivisi).
- Bilingue IT/EN: probabile (il CV lo è già), da decidere con la spec dei contenuti.
