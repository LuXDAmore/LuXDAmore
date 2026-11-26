# 05 — SEO e accessibilità di base

> Le regole che ogni pagina rispetta da subito. La SEO avanzata (sitemap, immagini Open Graph, dati strutturati, hreflang) è fuori dalla spec 001 e arriva con una spec dedicata. La visibilità nei motori generativi (GEO) poggia sulla stessa base: HTML chiaro e indicizzabile, niente file speciali.

## Documento

- `<html lang="it">` (e la lingua giusta se arriverà il bilingue, domanda aperta in [`00-visione-progetto.md`](./00-visione-progetto.md)).
- **Title e description** per ogni pagina, dichiarati con gli strumenti di Nuxt (`useSeoMeta` / `useHead`), mai duplicati a mano nell'`app.head` se un modulo li gestisce.
- **URL assoluti verso `https://lucaiaconelli.it`** per canonical e link condivisi. La Pages di GitHub è solo un redirect con canonical al dominio ([`01-ambienti-e-deploy.md`](./01-ambienti-e-deploy.md)).

## Struttura

- **Un solo `<h1>` per pagina**, gerarchia `h2`/`h3` senza salti. Se il design non mostra un titolo, l'`<h1>` resta per gli screen reader (classe `sr-only`), come nella homepage della spec 001.
- **Landmark**: `<main>` una volta per pagina, `<header>`, `<nav>`, `<footer>` dove servono.
- Elementi per quello che sono: link `<a>` per navigare, `<button>` per agire, liste per gli elenchi, `<time datetime>` per le date ([`coding-style.md`](./coding-style.md) §Template Vue).
- Testo dei link che dice dove porta (niente «clicca qui»).

## Foto e immagini

- Le foto sono **vere `<img>`** (o `<picture>`) nell'HTML, anche quando WebGL le anima o le deforma: così sono indicizzabili, accessibili e con il colore fedele.
- **`alt` descrittivo** su ogni foto (cosa si vede, non «foto di…»); `alt=""` solo per le immagini puramente decorative.
- `width` e `height` dichiarati (niente layout shift), varianti moderne (AVIF/WebP) e caricamento lazy sotto la piega; la prima immagine visibile non è lazy.
- **Niente coordinate GPS** nei file pubblicati: metadati ripuliti, luogo ridotto a città o paese.

## Canvas e movimento

- Ciò che esiste solo in un canvas WebGL ha un equivalente nell'HTML (testo, link, foto): il canvas è atmosfera, non l'unica fonte del contenuto.
- **`prefers-reduced-motion`**: con la preferenza attiva le animazioni si riducono o si fermano, e il sito resta completo.
- Il movimento non blocca il primo contenuto: prima l'HTML, poi l'effetto.

## Interazione

- Tutto si usa da tastiera, con un **focus visibile**; l'ordine del Tab segue quello di lettura.
- Contrasto del testo almeno WCAG AA sui fondi scuri e sui climi colorati.
- I componenti Nuxt UI portano già ARIA, tastiera e focus: non si re-implementano ([`coding-style.md`](./coding-style.md) §Nuxt UI).
