# Convenzioni di codice

> Regole di stile e convenzioni di sviluppo del progetto. Da leggere prima di creare, spostare o rinominare file, pagine, rotte. Si aggiunge qui ogni nuova convenzione trasversale (non specifica di un singolo flusso). Riferita da `CLAUDE.md`. Importate da WeGree e ripulite dal suo dominio.

Convenzioni correlate, in file dedicati:

- **Termini di dominio IT → EN** e naming: [`06-glossario.md`](./06-glossario.md)
- **SEO e accessibilità** delle pagine: [`05-seo.md`](./05-seo.md)
- **UI/UX** (token, componenti, movimento): `DESIGN.md`

## Come sono presidiate le regole

Non tutte le regole di questo file hanno un controllo automatico:

- **ESLint** (`pnpm lint`): le regole che la sua config (`eslint.config.mjs`) sa controllare, per esempio ordine degli import, chiavi ordinate e ordine degli attributi nei template. Gli avvisi si tengono a zero per abitudine.
- **Typecheck** (`pnpm typecheck`): TypeScript strict.
- **Test** (`pnpm test`): dove una regola protegge un comportamento (per esempio l'`<h1>` della homepage).
- **Nessun controllo automatico** (si regge sulla review e su `@reviewer` / `@design-system-checker`): template literal, tag dei commenti, ordine dei blocchi SFC e struttura di `<script setup>`, una cartella per componente, struttura delle rotte, scelte di data fetching, ARIA.

## Lingua del codice

Codice e identificatori in **inglese** (tipi, variabili, funzioni, componenti, nomi di file e cartelle, rotte, chiavi dei dati). Commenti, documentazione, spec `.sdd`, commit, PR e copy del sito in **italiano** (con diacritici corretti). I nomi propri non si traducono (`Spectrum`, `Exhibitions`, `Atlas`, `Lightroom`). Dettaglio in [`06-glossario.md`](./06-glossario.md).

## Stringhe — template literal, non `+`

Ogni stringa composta da parti si scrive con un **template literal**, non concatenando con `+`. Vale in TypeScript, nei template Vue e nei messaggi di log o d'errore.

```ts
// ✅
`/exhibitions/${ exhibition.slug }`
`${ baseUrl }/photos/${ photo.id }.avif`

// ❌
'/exhibitions/' + exhibition.slug
```

Perché: una sola forma per tutte le interpolazioni (niente `+` che a metà espressione diventa somma), le parti variabili restano visibili dentro la stringa, e non serve rimaneggiare le virgolette quando si aggiunge un pezzo. Spazi dentro le graffe (`${ x }`), come nel resto del repo.

Il `+` resta corretto dove non c'è composizione di stringhe: somme numeriche e concatenazione di array (`[ ...a, ...b ]`, `a.concat( b )`).

## Commenti — tag `TODO` / `FIXME` / `?`

I commenti che non sono semplice descrizione del codice usano un **tag** iniziale, così il tipo è chiaro a colpo d'occhio (ed evidenziato da estensioni come *Better Comments*):

- **`TODO:`** — lavoro da fare, provvisorio o placeholder in attesa di qualcosa.
  Es. `// TODO: i colori sono provvisori, da definire con la spec del design.`
- **`FIXME:`** — problema o limitazione **nota**, sistemabile più avanti.
  Es. `// FIXME: con meno di due foto la transizione salta; sistemabile dopo.`
- **`?:`** — spiega **il perché** di una scelta non ovvia (motivazione, non descrizione).
  Es. `// ?: h1 solo per screen reader: la homepage è vuota ma deve restare semantica.`

Regole:

- Niente commento "da fare" senza tag.
- Il tag è in **inglese maiuscolo** seguito da `:`; il testo del commento resta in **italiano**.
- I commenti puramente descrittivi restano senza tag.
- Vale anche nei template Vue (`<!-- TODO: … -->`) e nei commenti di blocco.

## Import e alias (Nuxt)

> Principio: **non scrivere import che Nuxt fa già da solo.** Prima gli auto-import; l'import esplicito è l'eccezione e, quando serve, usa un **alias** — **mai path relativi** (`./`, `../`), mai `~~/`. Rif. Nuxt: [auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports), [`shared/`](https://nuxt.com/docs/4.x/directory-structure/shared).

### 1. Cosa è auto-importato → niente import

Importare esplicitamente qualcosa di già auto-importato è un **errore da correggere** (import «doppio»), non una preferenza di stile:

| Contesto | Auto-importato |
| --- | --- |
| `app/` | componenti nei **template** (incluse le varianti `Lazy*`), `app/composables/` e `app/utils/` (top-level), API Vue/Nuxt (`ref`, `computed`, `useAsyncData`, …) |
| ovunque | `shared/utils/` e `shared/types/` (top-level) |

Gli auto-import coprono **anche i tipi**: un tipo dichiarato in `shared/types/` si usa senza import.

### 2. Quando l'import esplicito serve → alias, mai relativi

| Cosa | Import | Note |
| --- | --- | --- |
| Pacchetti third-party | `import type { TableColumn } from '@nuxt/ui'` | come sempre |
| Componenti usati nello `<script>` | `import { LazyPhotoViewer } from '#components'` | nei template nessun import |
| File di `app/` non auto-importati | `import logo from '~/assets/…'` | assets, file fuori dalle cartelle scansionate |
| File di `shared/` non auto-importati | `import { x } from '#shared/…'` | caso raro |

> Oggi `shared/` non esiste e la guardia sugli import in `eslint.config.mjs` ammette solo l'alias `~`. Chi introduce `shared/` aggiorna anche quella regola, nello stesso commit.

Vietati sempre:

```ts
❌ import { x } from './sibling';                  // relativo
❌ import { x } from '../../utils/helper';         // relativo
❌ import type { Photo } from '~~/shared/types';   // ~~/ + ridondante (auto-importato)
❌ import { ref } from '#imports';                 // ridondante: ref è auto-importato
❌ import { x } from '@/components/…';             // @ e @@ duplicano ~ e ~~: non si usano
```

### 3. Confini

- Il sito è **solo statico** (`CLAUDE.md`, regola 5): niente `server/` in produzione. Ciò che serve si calcola al build o nel browser.
- `shared/` non importa **nulla** da `app/` (né Vue né Nuxt): solo standard library, third-party isomorfi e altro codice `shared/`. Le sole `import type` sono ammesse.

### 4. Eccezioni — path relativi ammessi

- **`test/`** — gli alias risolvono, ma gli import relativi restano ammessi.
- **`<style scoped src="./Nome.scss">`** negli SFC — file co-locato della cartella-componente.
- **File di configurazione root** (`nuxt.config.ts`, `eslint.config.mjs`, `vitest.config.mts`, script fuori dai bundle Nuxt): senza alias, relativi ok.

### 5. Ordine degli import

L'ordine lo segnala ESLint, non questo documento. Le etichette commento per sorgente (`// Nuxt UI`, `// Components`, …) restano: vedi «Struttura di `<script setup>`».

## Rotte e pagine (Nuxt)

1. **Rotte in inglese.** I nomi di file e cartelle delle pagine (`app/pages/`), e quindi i nomi di rotta e i path, sono **sempre in inglese** (`photography`, `exhibitions`, `atlas`). Se arriverà il bilingue (domanda aperta in `docs/00-visione-progetto.md`), i path tradotti si aggiungeranno con la configurazione di `@nuxtjs/i18n`, senza rinominare i file.

2. **Una cartella per rotta, con `index.vue`.** Ogni rotta è una **cartella** che contiene `index.vue`, **incluse le rotte dinamiche**:

   ```text
   ✅ app/pages/index.vue                      (homepage)
   ✅ app/pages/exhibitions/index.vue
   ✅ app/pages/exhibitions/[slug]/index.vue   (NON  app/pages/exhibitions/[slug].vue)
   ❌ app/pages/atlas.vue                      (file "piatto" accanto a cartelle: evitare)
   ```

   - Il segmento dinamico si chiama **`[slug]`** quando il parametro è uno slug parlante, **`[id]`** quando è un identificativo; se una rotta dinamica sta dentro un'altra, il figlio prende un nome specifico (`[photoSlug]`).
   - Motivo: vue-router e Nuxt a volte confondono le rotte quando file "piatti" e cartelle annidate coesistono; la struttura a sole cartelle + `index.vue` è sempre prevedibile.
   - Con `pnpm generate` ogni rotta dinamica deve essere raggiungibile dal crawler del prerender (link nelle pagine) o elencata nelle rotte da prerenderizzare.

3. **Title e description** con gli strumenti di Nuxt, regole in [`05-seo.md`](./05-seo.md).

## Componenti Vue — una cartella per componente

Ogni componente sotto `app/components/` vive in una **cartella personale** (`Nome/Nome.vue`), atomi inclusi. L'organizzazione segue l'**atomic design**: si raggruppa per **molecole** e dentro si annidano gli **atomi**. Le **pagine** (`app/pages/`) sono escluse: seguono la convenzione di rotta qui sopra. Il **nome di auto-import Nuxt non cambia** (Nuxt deduplica il segmento ripetuto): è solo organizzazione dei file.

```text
✅ app/components/App/Footer/Footer.vue        → <AppFooter>       (App = chrome; Footer/Header/… atomi)
✅ app/components/Photo/Grid/Grid.vue          → <PhotoGrid>       (Photo = molecola; Grid/Viewer/… atomi)
✅ app/components/Photo/Viewer/Viewer.vue      → <PhotoViewer>
✅ app/components/Threshold/Split/Split.vue    → <ThresholdSplit>
❌ app/components/Photo/PhotoGrid.vue          (file "piatto", senza cartella propria)
```

- **Molecola → atomi:** quando il prefisso del nome è un **raggruppamento reale** lo si scompone in cartelle annidate.
- **Atomo = resta intero:** un componente atomico, anche con nome composto, **non si spezza**; va solo nella sua cartella personale.
- **Sempre la cartella propria:** ogni SFC sta in `.../Nome/Nome.vue`, così tutti i suoi file vivono in un'unica cartella.
- **Riuso pragmatico, non over-engineering.** Il riuso si introduce solo dove è **reale e utile**: niente astrazioni per un solo uso, niente flessibilità non richiesta.

## Ordine dei blocchi in un SFC `.vue`

I blocchi top-level di un Single File Component vanno **sempre in questo ordine** (solo quelli usati):

```vue
<template></template>

<i18n lang="json"></i18n>

<script setup lang="ts"></script>

<style lang="scss" scoped src="./[stesso-nome-del-file-vue].scss"></style>
```

- `<template>` per primo, poi `<i18n>` (solo se arriverà l'i18n), poi `<script setup lang="ts">`, infine `<style>`.
- Lo `<style>` è **scoped** e con **sorgente esterna** `src="./Nome.scss"` (stesso nome del file `.vue`): niente CSS inline nel SFC. Dove bastano le utility Tailwind, niente `<style>`.
- I blocchi assenti si omettono; l'ordine relativo di quelli presenti resta questo.

## Struttura di `<script setup>`

Il codice è **raggruppato per scope** (parti che interagiscono insieme / per feature), con un **commento di una riga** che etichetta ogni gruppo. Le etichette sono **libere e descrittive**, con alcuni **ancoraggi fissi**: `// Setup`, `// Props`, `// Emits`, `// Models`. Ordine:

1. **Import** — solo quelli davvero necessari (gran parte è auto-importata), raggruppati per sorgente con un commento-etichetta (`// Nuxt UI`, `// Components`, …).
2. **Tipi del componente:** `interface Properties` e `type Emits`.
3. **`// Setup`** — un solo `const` (virgola iniziale), con i gruppi **in quest'ordine**: `// Props` → `// Emits` → `// Models` → `// Runtime Config` → `// Route` → altre composable condivise → **gruppi per scope/feature** con etichetta libera (`// UI / UX`, `// <feature>`: computed, liste, stato locale).
4. **Dopo il `// Setup`:** `// Methods` → `// Watch` → `// Lifecycle` (`onMounted`, `onBeforeUnmount`, …).

> Fissi sono gli **ancoraggi** e l'**ordine relativo**; i gruppi non usati si omettono.

**Un'eccezione sola, e va dichiarata: la guardia subito dopo un fetch bloccante.** Se una pagina con `await useAsyncData` promuove l'errore a errore d'app (`createError( { fatal: true } )`), il `throw` sta **subito dopo la fetch**, dentro il `// Setup`, spezzando il `const` in due: gli effetti che seguono non devono partire per una pagina che risponde 404. Resta **una sola** etichetta `// Watch` per file.

```vue
<script setup lang="ts">

    // Nuxt UI
    import type { ButtonProps } from '@nuxt/ui';

    // Component - Types
    // ?: Photo è auto-importato (shared/types): niente import
    interface Properties {
        title?: string
        photos?: Photo[]
        size?: ButtonProps['size']
    }

    type Emits = ( event: 'close' ) => void;

    // Setup
    const
        // Props
        props = withDefaults(
            defineProps<Properties>(),
            {
                photos: () => ( [] ),
                size: undefined,
                title: undefined,
            },
        )
        // Emits
        , emit = defineEmits<Emits>()
        // Models
        , open = defineModel<boolean>( 'open', { default: false } )
        // Route
        , route = useRoute()
        // UI / UX
        , hasPhotos = computed( () => props.photos.length > 0 )
    ;

    // Watch
    watch( open, () => { /* … */ } );

    // Lifecycle
    onMounted( () => { /* … */ } );

</script>
```

### Props, Emits, Models

- **Tipi opzionali con `?:`, non `| undefined`.**
- **`withDefaults` sempre** (quando il componente ha props): ogni prop ha un **default esplicito** — `undefined` per gli scalari opzionali, `true`/`false` per i boolean, `() => ( [] )` / `() => ( {} )` per array e oggetti.
- **`Emits`** dopo le props: `type Emits = ( event: '…', payload?: … ) => void;` con `defineEmits<Emits>()`.
- **Models** dopo gli emits: `defineModel<…>( 'nome', { default: … } )`.

### Chiavi degli oggetti in ordine alfabetico

Negli object literal (item di menu, opzioni, config, default di `withDefaults`) le chiavi vanno in **ordine alfabetico-naturale**. Le `interface` e i `type` TypeScript non sono object literal: restano in ordine logico (prima le prop obbligatorie).

## Data fetching (Nuxt)

Il sito è generato in statico: le chiamate di `useAsyncData` delle pagine girano **al build**, e il risultato finisce nell'HTML e nel payload. I dati (per esempio il JSON delle foto prodotto dalla pipeline) si leggono al build, mai da un server in produzione.

### 1. Quale composable, per contesto

| Contesto | Strumento | Perché |
| --- | --- | --- |
| **Pagina** (`app/pages/**`) | `useAsyncData` / `useLazyAsyncData` | Dedup, key esplicita, stato (`status` / `error`) per il template, prerender |
| **Componente** con una fetch propria di un URL | `useFetch` / `useLazyFetch` | Key automatica dall'URL: comodo per la singola URL |
| **Event handler** (click, submit) | `$fetch` diretto | Chiamata imperativa una tantum: i composable vivono solo nel setup |

- **Per le pagine sempre `useAsyncData` / `useLazyAsyncData`**, mai `useFetch` / `useLazyFetch`.
- **Mai** un composable `use*` dentro un handler `@click` / `@submit` o in un callback.

### 2. Bloccante (SEO) vs lazy — e `lazy` **non** è `server: false`

- **Contenuto indicizzabile → bloccante** (`await useAsyncData`): deve stare nell'HTML generato.
- **Dati non SEO → lazy** (`useLazyAsyncData`), con lo stato `pending` gestito da uno skeleton.
- **Sempre `await`, anche su `useLazyAsyncData`**: l'`await` non toglie il comportamento lazy. Più letture indipendenti si avviano insieme e si attendono con un solo `await Promise.all( [ … ] )`.
- **`lazy` e `server` sono assi diversi:** `lazy: true` non blocca la navigazione ma gira lo stesso al build/SSR; `server: false` salta il server ed esegue solo nel browser (in statico: il dato non finisce nell'HTML). `server: false` si usa solo per dati che dipendono dal browser; chi ramifica su `status` tratta allora `idle` come `pending`.

### 3. Key reattiva, **non** `watch`

La key di `useAsyncData` può essere un **getter**: quando cambia, Nuxt rifetcha da solo e cacha ogni combinazione.

```ts
// ✅ key reattiva: cambia la tinta → refetch automatico, niente watch
const { data, status } = await useAsyncData(
    () => `spectrum:${ hue.value }`,
    () => $fetch( `/data/spectrum/${ hue.value }.json` ),
);
```

- **`watch` solo per ciò che non è nella key.** `useAsyncData` non traccia le ref lette nell'handler: o stanno nella key o (raro) servono un `watch`.
- **`immediate: false` non sostituisce la guardia**: blocca solo la prima chiamata. Se manca un dato necessario, l'handler ritorna `null` e il consumer usa `?.` + `?? fallback`.

### 4. Signal di annullamento

Dove possibile e senza complicare il codice, ogni chiamata porta l'`AbortSignal` che `useAsyncData` passa all'handler, così una richiesta orfana si annulla quando la key cambia:

```ts
( _, { signal } ) => $fetch( url, { signal } )
```

## Lazy hydration (Nuxt)

`<lazy-nome hydrate-on-visible>` (e le altre strategie) idrata un componente solo quando serve. Regole:

1. **Solo componenti foglia con prop primitive o riferimenti stabili.** Se una prop cambia prima dell'idratazione, Vue la salta e rimpiazza il DOM generato con un render completo nel browser.
2. **Mai su componenti con slot che leggono stato che cambia dopo il mount.**
3. **Mai su campi di input**: il testo digitato prima dell'idratazione si perde.
4. **Niente `useAsyncData` / `useFetch` dentro un componente idratato tardi**: i dati arrivano come prop dalla pagina.
5. **`hydrate-never` solo su blocchi senza link né interazioni.**
6. **Nessun `>` negli attributi del nodo lazy** (si usa un computed): il trasformatore di Nuxt chiude il tag al primo `>` anche fra virgolette e la strategia si perde in silenzio.

## Template Vue — testo, props, form e azioni

1. **Dato come unico contenuto di un tag → `v-text` (o `v-html`), non interpolazione; costante letterale → HTML statico.**

   ```vue
   ✅ <p v-text="photo.caption" />
   ✅ <div v-html="statementHtml" />          <!-- v-html SOLO su HTML fidato -->
   ✅ <span>—</span>                          <!-- costante: nessun binding -->
   ❌ <p>{{ photo.caption }}</p>
   ❌ <span v-text="'—'" />                   <!-- letterale: non è un dato -->
   ```

   - **`v-html` solo su HTML di cui ti fidi** (copy statico, contenuto generato al build dai nostri file): mai contenuti esterni non controllati.
   - **Esenti** i contenuti non riducibili a una sola espressione: testo misto (`Scattata a {{ place }}`), elementi con markup figlio.
   - **Solo sui tag HTML, mai su un componente**: su un componente `v-text` diventa una prop `textContent` che il renderer del server scarta, e il tag esce vuoto nell'HTML generato. Sui componenti si usa la prop di testo (punto 2) o lo slot.

2. **Componenti Nuxt UI con prop di testo → il testo passa dalla prop**, non dal default slot:

   ```vue
   ✅ <UButton label="Fotografia" />
   ❌ <UButton>Fotografia</UButton>
   ```

   - Lo slot solo per contenuto ricco che la prop non copre.
   - **Bottone solo icona → `aria-label` e `title`** (lo stesso testo), salvo che sia già dentro un `UTooltip`.

3. **Bottone d'azione legato a campi → dentro un `UForm`, con `type="submit"`**, così passa dalla validazione e dal controllo nativo del browser. I bottoni non legati a campi restano `@click`; i bottoni-link (`to` / `href`) restano link.

4. **Azione asincrona → il bottone cliccato va in `loading`, i fratelli in `disabled`**: feedback immediato e nessun doppio avvio.

5. **Campi di input** (quando arriveranno, per esempio un contatto): `autocomplete` corretto, `label` sempre presente sul `UFormField`, placeholder solo come esempio del formato atteso, hint con `help` (sotto il controllo) e non `description`.

6. **Date e orari → `<time>` con `datetime` machine-readable** (ISO 8601) e testo visibile nel formato leggibile:

   ```vue
   ✅ <time :datetime="photo.takenAt" v-text="formatDate( photo.takenAt )" />
   ❌ <span v-text="formatDate( photo.takenAt )" />
   ```

## Nuxt UI — accessibilità integrata

I componenti Nuxt UI sono costruiti su **Reka UI** e seguono i pattern **WAI-ARIA**: gestiscono da soli attributi `aria-*`, tastiera e focus (relazione trigger ↔ contenuto, focus trap dei dialog, roving tabindex dei menu).

- **Non re-implementare** ciò che il componente già gestisce: niente `role=`, `aria-expanded`, handler di tastiera o focus trap a mano su un componente Nuxt UI.
- **Ammessa la semantica di contenuto** che il componente non dà (una live region, `role="img"` con etichetta su un'icona significativa), con un commento `?:` che dice perché.
- **Resta a carico tuo il contenuto accessibile:** nome accessibile per i controlli solo icona (`aria-label`), `alt` sulle immagini, `label` sui campi, gerarchia dei titoli. `aria-hidden` sulle icone decorative è legittimo.
- Su HTML grezzo l'accessibilità torna a carico tuo: si preferisce **sempre** il componente Nuxt UI all'elemento grezzo (agente `@design-system-checker`), salvo dove la semantica pura è la scelta giusta (`<main>`, `<h1>`, `<img>`, `<time>`).
- **Nomi dei componenti v4:** si verificano con il MCP di Nuxt UI prima di usarne uno nuovo (per esempio `u-field-group`, non il vecchio `u-button-group`): un nome sbagliato passa come elemento nativo con un solo warning a runtime.

## Prima gli strumenti del framework

Decisione dell'Operatore importata da WeGree (2026-09-02).

**Regola.** Prima di scrivere codice a mano si cerca cosa offrono già **Nuxt, i moduli in `package.json` e Vue**: componenti, composable e utility del framework vengono prima di ogni wrapper, glue o reimplementazione nostra, anche quando il pezzo a mano sembra piccolo — il codice del framework è mantenuto, testato e documentato da altri, il nostro no. Si scrive a mano solo ciò che il framework davvero non copre, e lo si dice nel commento («Nuxt Image non ha un componente per…»).

**Nei test vale lo stesso principio.** Si mocka solo ciò che dipende da stato esterno non riproducibile in test (servizi di rete terzi). Per il resto:

| Invece di… | Si usa… |
|---|---|
| mock di `$fetch` / `useFetch` | `registerEndpoint` di `@nuxt/test-utils` |
| mock degli interni di una libreria terza | stub del componente del framework con `global.stubs` di `mountSuspended`, asserendo le sole **props che gli passiamo** |
| `useRuntimeConfig` finto | scrittura nella config reale |
| test di ciò che fa il componente del framework | niente: lo testa il framework, noi testiamo la nostra logica e cosa gli passiamo |
| test che legge il sorgente (`?raw`, regex sul file) | il componente montato con `mountSuspended`; se il comportamento si vede solo a video, la QA a video e nessun test |
| change-detector di letterali (classi, token, conteggi) | un solo test sulla regola che protegge (accessibilità, layout deciso), o nessuno |
| due test sullo stesso ramo | uno: ogni test deve essere rosso senza la modifica che protegge |

Se per testare qualcosa serve un mock complicato degli interni di una libreria, il segnale è che stiamo testando la libreria: si toglie il test, non si costruisce il mock (YAGNI). Sempre le best practice di Nuxt e di `@nuxt/test-utils`, col codice e i test più semplici che funzionano.

## Niente retrocompatibilità fino al go-live

Finché l'Operatore non dichiara il sito in produzione (il go-live del portfolio, vedi `docs/TODO.md`), **non c'è retrocompatibilità da preservare**: rinomini secchi di rotte, componenti e dati, niente redirect, alias o deprecazioni graduali. Oggi online c'è solo la homepage vuota, che nessuno ha indicizzato per i suoi contenuti.

Al go-live questa sezione si elimina: da lì valgono le cautele normali, a partire dai redirect 301 quando cambia un URL pubblico (sull'host FTP richiedono una configurazione del server, da decidere con la spec che ne ha bisogno).
