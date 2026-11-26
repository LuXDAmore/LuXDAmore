# Mostre ed editoriali fotografici online con design premiato: note di ricerca

Ambito: siti che presentano la fotografia come mostra, racconto o sequenza curata (mostre online, festival e musei, microsite, photo-essay e scrollytelling, editoriali di agenzie e brand). Sono esclusi i portfolio personali dei fotografi.
Ricerca svolta il 2026-11-24. Lo stato "live" e l'og:image vengono da un `curl` sull'HTML della pagina fatto lo stesso giorno. Gli indizi sullo stack vengono da Awwwards quando è citato, altrimenti dalla firma degli asset nell'HTML: `_next/static` indica Next.js, `_nuxt` e `data-n-head` indicano Nuxt 2.
**Avvertenza sugli indizi di stack:** ho cercato nell'HTML anche le parole chiave `three`, `ogl` e `vite`. Sono sottostringhe di parole comuni (per esempio "google"), quindi le riporto solo se un'altra fonte le conferma.

---

## Catalogo (13 voci + appendice di tecniche)

### 1. Hearst Exhibit 2026: "ELLE & Esquire, The New Hollywood Photography Exhibition" (2026)
- **URL:** https://www.hollywoodexhibit2026.com (live, HTTP 200, 2026-11-24)
- **Chi l'ha fatto:** OSMOS (PRO), HearstCC, Edoardo Lunardi, Daniel Velasquez, Marjoe Bacus. I ruoli non sono indicati. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026)
- **Premi:** Awwwards Site of the Day, 2 ago 2026 (punteggio 7.21). Developer Award con 7.46, di cui 8.00 in Animations/Transitions. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026) Compare anche nella categoria Photography di Awwwards come "Developer Award; Site of the Day, Aug 02, 2026". [Source](https://www.awwwards.com/inspiration_search/Photography/)
- **Concept:** è una mostra congiunta ELLE + Esquire di fotografia hollywoodiana, per i 40 anni dei due brand. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026) La pagina dice "As seen in the Hearst Tower, located in New York City", quindi è il gemello online di una mostra fisica. [Source](https://www.hollywoodexhibit2026.com)
- **Stanze e ritmo:** un blog di terze parti scrive che si passa da una foto all'altra "come camminando di stanza in stanza in una galleria vera". È una fonte secondaria, da verificare. (Fonte: snippet di ricerca, nessun URL primario.)
- **Transizioni:** gli elementi segnalati da Awwwards sono "Paper Curl WebGL Interaction" (una transizione) e "List and Grid View Gallery". I tag sono WebGL, GSAP, Vercel, Scrolling, Gallery, Microinteractions, Typography. Palette quasi monocroma: #252525 e #E3E3E3. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026)
- **Stack:** Next.js (asset `_next/static` nell'HTML), WebGL, GSAP, Vercel.
- **og:image:** non trovata nell'HTML server-side.
- **Utilità per il cliente:** è il caso 2026 più vicino al modello "mostra con stanze". Mostra anche una vista alternativa lista/griglia accanto al percorso sequenziale.

### 2. Foam Talent 2021: mostra digitale (Foam Fotografiemuseum Amsterdam)
- **URL:** https://talent.foam.org/. Oggi redirige a https://www.foam.org/talent-2024 e ha risposto con un checkpoint di sicurezza Vercel (HTTP 429), quindi la versione 2021 va considerata **archiviata o sostituita**.
- **Chi l'ha fatto:** Build in Amsterdam. [Source](https://www.awwwards.com/sites/foam-talent-2021)
- **Premi:** Awwwards Site of the Day, 28 ott 2021 (7.63). Dev Award 8.06 (WPO 8.60, Animations 8.20). Voto utenti 8.23. [Source](https://www.awwwards.com/sites/foam-talent-2021) L'edizione precedente, "Foam Talent – Digital Exhibition" (2020), risulta FWA of the Day a dicembre 2020: è nata perché Foam Talent 2020 non poteva girare all'estero. Build in Amsterdam ha progettato transizioni e layout, e ogni visitatore vede una copertina diversa scelta a caso. (Dato preso dallo snippet di ricerca. La pagina FWA https://thefwa.com/cases/foam-talent-digital-exhibition-p2 ha risposto 404 al fetch.)
- **Ritmo:** tag Awwwards "Horizontal Layout", "Storytelling", "Gallery", "Sound-Audio", "Experimental", "Colorful". C'è un'animazione introduttiva di caricamento. [Source](https://www.awwwards.com/sites/foam-talent-2021)
- **Stack:** Next.js, React, Three.js, WebGL, Vercel. [Source](https://www.awwwards.com/sites/foam-talent-2021)
- **Palette:** #000, #987654, #ffffff, cioè nero, sabbia e bianco.
- **Utilità per il cliente:** è l'esempio istituzionale (museo) più vicino a "mostra digitale". Usa percorso orizzontale e audio, e cambia copertina a ogni visita, un'idea adattabile agli album per colore.

### 3. PhotoVogue Festival (Vogue Italia / Condé Nast) (2020–21)
- **URL:** https://photovoguefestival.vogue.it. Il `curl` non ha avuto risposta (connessione fallita). Stato live **non verificato**.
- **Chi l'ha fatto:** MONOGRID (Italia), Valentina Trevisanello, Marco Trevisani, Alberto Zampano (ultralow), Cinzia Vilardi. [Source](https://www.awwwards.com/sites/photovogue-festival)
- **Premi:** Awwwards SOTD, 5 feb 2021 (7.41, Creativity 7.83). Il caso è registrato anche su FWA. [Source](https://www.awwwards.com/sites/photovogue-festival), [Source](https://thefwa.com/cases/photovogue-festival)
- **Concept:** la prima piattaforma di mostre digitali di PhotoVogue, un sito interattivo con tutti i fotografi selezionati da Vogue. Includeva eventi live, talk, incontri su Zoom e revisioni di portfolio. [Source](https://www.awwwards.com/sites/photovogue-festival)
- **Stile:** fondo nero (#000 e #404040). Tag Transitions, Gallery, CSS, SVG. Non risulta WebGL. [Source](https://www.awwwards.com/sites/photovogue-festival)
- **Utilità per il cliente:** riferimento italiano. Mostra che fondo nero, transizioni SVG e CSS bastano per un SOTD senza WebGL.

### 4. Into the Amazon (National Geographic × Gladeye) (2024)
- **URL:** https://www.nationalgeographic.com/into-the-amazon/ (live, HTTP 200)
- **Chi l'ha fatto:** Gladeye per National Geographic. Fotografie di Thomas Peschak e André Dib. Illustrazioni di Fernando G. Baptista e altri, mappe di Matthew W. Chwastyk, video di Otto Whitehead. [Source](https://www.gladeye.com/work/into-the-amazon)
- **Premi:**
  - Webby 2025: Winner in "AI, Immersive & Games – Science & Education". [Source](https://winners.webbyawards.com/2025/ai-immersive-games/immersive-general/science-education/324935/into-the-amazon)
  - Webby 2025: voce in "Features & Design – Technical Achievement". [Source](https://winners.webbyawards.com/2025/websites-and-mobile-sites/features-design/technical-achievement/324928/into-the-amazon)
  - Secondo la pagina dell'agenzia: Webby Winner per Best Use of Video or Moving Image, più due People's Voice. Inoltre Site of the Day su CSS Design Awards (con i Public Vote Best UI, UX e Innovation), FWA e Awwwards. [Source](https://www.gladeye.com/work/into-the-amazon)
  - Le date di SOTD e FWA non le ho verificate sulle piattaforme. La pagina profilo Gladeye su Awwwards, come restituita dalla ricerca, non mostrava questo progetto. Un blog parla di SOTD ad aprile 2025, ma è **non confermato**.
- **Ritmo:** "movimenti laterali" e scroll attraverso scene 3D e lidar, con momenti di scoperta. Il terreno 3D viene da dati NASA SRTM e segue il tracciato GPS di un orso andino. Le immagini satellitari sono Sentinel-2. [Source](https://www.gladeye.com/work/into-the-amazon)
- **Stack:** WebGL più HTML/React, con un framework custom che orchestra le animazioni di WebGL e React insieme. [Source](https://www.gladeye.com/work/into-the-amazon)
- **Didascalie e suono:** la fonte non ne parla. È una lacuna.
- **Utilità per il cliente:** è un modello di viaggio e natura come "spedizione" a capitoli geografici. È più pesante di quanto serva a un portfolio, ma l'idea di una mappa o percorso che collega le foto si adatta bene ai viaggi.

### 5. National Geographic: 2025 Pictures of the Year (dietro le quinte) (dic 2025)
- **URL:** https://www.nationalgeographic.com/photography/pictures-of-the-year-2025/graphics/behind-the-scenes (live, HTTP 200)
- **Premi:** Webby 2026, People's Voice Winner in "Features & Design – Best Individual Editorial Feature (Ind/Brand/Org)". [Source](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-individual-editorial-feature-indbrandorg/368227/2025-pictures-of-the-year)
- **Chi l'ha fatto:** in-house National Geographic. Non sono indicate agenzie. [Source](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-individual-editorial-feature-indbrandorg/368227/2025-pictures-of-the-year)
- **og:image:** `https://i.natgeofe.com/n/79cd3223-8f1c-413e-bd6f-6a6363327dda/SouthSudan2025_ExtraBTS_iPhone_22.jpg?w=1200`
- **Lacuna:** non ho analizzato struttura, ritmo e didascalie.
- **Utilità per il cliente:** la "selezione dell'anno" è un formato di sequenza curata replicabile, per esempio "Best of 2025" come stanza.

### 6. Photographers' virtual gallery (Okey Studio) (2022)
- **URL:** https://virtual-gallery.okeystudio.com/ (live, HTTP 200)
- **Chi l'ha fatto:** Okey Studio, Adrien Quechon, Clarisse Michard. [Source](https://www.awwwards.com/sites/photographers-virtual-gallery)
- **Premi:** Awwwards SOTD, 30 ago 2022 (7.45, Creativity 7.89). Dev 7.13. [Source](https://www.awwwards.com/sites/photographers-virtual-gallery) Il caso è anche su FWA. [Source](https://thefwa.com/cases/photographers-virtual-gallery)
- **Ritmo:** scroll animato che porta a una "piccola galleria fotografica virtuale" (stanza 3D), con una sezione blu e "screen views". [Source](https://www.awwwards.com/sites/photographers-virtual-gallery)
- **og:image:** non trovata.
- **Utilità per il cliente:** è l'esempio più piccolo e realizzabile di metafora della galleria fisica (una stanza 3D) dentro un sito a scroll.

### 7. Encounter Stories: mostra online "audio-powered" di Marion Lepretre (2023)
- **URL:** https://encounter-stories.com/ (live, HTTP 200)
- **Nota sull'ambito:** è il microsite espositivo di un singolo fotografo, non il suo portfolio. Lo includo perché è una mostra; se si sovrappone all'altro filone di ricerca, si può scartare.
- **Chi l'ha fatto:** LEOLEO, Keny Zachelin. [Source](https://www.awwwards.com/sites/encounter-stories)
- **Premi:** Awwwards Honorable Mention, 25 lug 2023. [Source](https://www.awwwards.com/sites/encounter-stories)
- **Suono:** definita "la prima mostra fotografica online audio-powered, un'esperienza visiva e uditiva immersiva". Tag Music & Sound, Sound-Audio, Gallery. Palette #000000 e #FE5B02 (nero e arancione intenso). [Source](https://www.awwwards.com/sites/encounter-stories)
- **Stack:** **Nuxt 2** (asset `_nuxt` e `data-n-head="ssr"` nell'HTML) con **Lenis** per lo smooth scroll, su Vercel (come mostra il dominio dell'og:image). Rilevato con `curl` il 2026-11-24.
- **og:image:** `https://marionlepretre.vercel.app//thumbnail.jpg`
- **Utilità per il cliente:** è lo stack più vicino a quello del cliente (Vue/Nuxt) e insieme un caso di colore dominante su nero più audio. È il riferimento tecnico più diretto.

### 8. Les Rencontres de la photographie d'Arles: sito del festival
- **URL:** https://www.rencontres-arles.com/ (live, redirige a /fr)
- **Identità:** la nuova identità grafica è di ABM Studio. [Source](https://www.rencontres-arles.com/en/actualites/view/494/a-new-graphic-identityby-abm-studio) Non ho trovato premi web: va inteso come **riferimento di festival, non come caso premiato**.
- **Stack:** Next.js (`_next/static`).
- **og:image:** `https://arles-web-cdn.s3.eu-west-par.io.cloud.ovh.net/small_ADELE_LE_BRAS_6_fa0361f2a2.jpg`
- **Utilità per il cliente:** mostra come un festival modella le "mostre" come entità con luogo e date dentro un programma.

### 9. World Press Photo Foundation: sito (Emakina)
- **URL:** https://www.worldpressphoto.org/ (live, HTTP 200)
- **Premi:** Webby 2020 (24ª edizione), Best Associations Website, con Emakina come entrant. [Source](https://winners.webbyawards.com/2020/websites/general-websites/associations/122452/world-press-photo-connecting-the-world-to-the-stories-that-matter), [Source](https://emakina.prezly.com/world-press-photo-and-emakina-win-a-webby-award)
- **Approccio:** sprint di design e sviluppo per un concept di sito "dove il materiale visivo è centrale". Migrazione della piattaforma su Kentico. [Source](https://www.emakina.com/en-nl/work/clients/world-press-photo/wppf)
- **Data:** 2020, al limite dell'intervallo richiesto.
- **og:image:** non trovata.
- **Lacuna:** non ho verificato premi specifici per la mostra online. Il "World Press Photo Festival" online 2021 esiste ([Source](https://www.worldpressphoto.org/festival/2021)), ma non ho trovato premi collegati.

### 10. Magnum Photos: piattaforma editoriale (Code and Theory + DigitalWerk)
- **URL:** https://www.magnumphotos.com/ (live, HTTP 200)
- **Riconoscimento:** Communication Arts Webpick. Data non indicata sulla pagina, quindi probabilmente **classico, pre-2021**. [Source](https://www.commarts.com/webpicks/magnum-photos)
- **Approccio:** sistema a componenti modulari per comporre layout editoriali e commerce distinti. Un'API gestisce l'archivio immagini e lega ogni immagine a didascalie e metadati. [Source](https://www.commarts.com/webpicks/magnum-photos)
- **og:image:** `https://www.magnumphotos.com/wp-content/uploads/2016/05/magnum_sharing.jpg` (WordPress)
- **Utilità per il cliente:** modello dati, non estetica. La didascalia è un dato legato all'immagine e riusato in contesti diversi (storie, fotografo, shop).

### 11. Google Arts & Culture: Pocket Gallery (2018–2021, **classico**)
- **URL:** https://artsandculture.google.com/project/pocket-gallery. Oggi la pagina si intitola "Virtual Museum Day Out" (live).
- **Riconoscimento:** la Vermeer Pocket Gallery compare su Cannes Lions 2019. Dichiara 50 milioni di impression e 75.000 ingressi nella galleria. [Source](https://www.lovethework.com/work-awards/campaigns/vermeer-pocket-gallery-604888) Non ho trovato nessun Webby.
- **Stanze:** nel 2018 erano 36 dipinti di Vermeer in AR, curati dal Mauritshuis. La galleria "Art of Color" aveva quattro "stanze" AR navigabili in 3D con dipinti a grandezza naturale. Dal 2021 le gallerie sono disponibili anche sul web, su desktop e mobile anche senza AR. [Source](https://techcrunch.com/2021/10/14/google-brings-its-3d-pocket-gallery-art-exhibition-experiences-to-the-web), [Source](https://blog.google/outreach-initiatives/arts-culture/explore-art-and-color-our-latest-ar-gallery/)
- **Suono:** in seguito è stata aggiunta un'audioguida alle gallerie AR. [Source](https://blog.google/company-news/outreach-and-initiatives/arts-culture/new-audio-guide-our-augmented-reality-galleries/)
- **og:image:** `https://lh3.googleusercontent.com/ci/AL18g_QaPyVYyENQW6bvyYN-Ej6c3HFaXYNUhMXnryCV0G7WrdxHZa97wZaDVH8kZHFBLs4SDf9KHr8`
- **Utilità per il cliente:** è un precedente diretto di **stanze organizzate per colore**: "Art of Color" divide le opere in stanze in base al colore, che è esattamente il modo in cui il cliente raggruppa i suoi album.

### 12. NYT "Snow Fall: The Avalanche at Tunnel Creek" (dic 2012, **classico**)
- **URL:** https://www.nytimes.com/projects/2012/snow-fall/ (live, HTTP 200)
- **Premi:** Pulitzer 2013 per il Feature Writing (premia il testo, non il design) e Peabody Award. La motivazione del Peabody parla di uno "spectacular example of the potential of digital-age storytelling". [Source](https://en.wikipedia.org/wiki/Snow_Fall)
- **Ritmo:** scroll continuo in cui foto, video e grafica "entrano ed escono" senza sembrare deviazioni dalla narrazione. Ci sono card dei personaggi con foto che aprono slideshow e un flyover introduttivo costruito con dati LIDAR. È stato costruito fuori dal CMS per avere layout full-screen. [Source](https://en.wikipedia.org/wiki/Snow_Fall)
- **og:image:** `https://static01.nyt.com/packages/images/multimedia/bundles/projects/2012/AvalancheDeploy/chapter2_flat.jpg`
- **Utilità per il cliente:** è l'archetipo dello scrollytelling a capitoli e della foto a tutto schermo che interrompe il testo.

### 13. M+ Museum (Hong Kong): sito del museo (2022, adiacente)
- **Premi:** Awwwards Honorable Mention, 13 mag 2022. Tra i tag c'è photography, ma è un museo di cultura visiva, non di sola fotografia. [Source](https://www.awwwards.com/sites/m-museum-website)
- **Lacuna:** non ho verificato URL live, agenzia e struttura.

---

## Appendice: tecniche Codrops pertinenti (tutorial, non siti premiati)
- "Creating an Infinite Auto-Scrolling Gallery using WebGL with OGL and GLSL Shaders" (gen 2021). [Source](https://tympanus.net/codrops/2021/01/05/creating-an-infinite-auto-scrolling-gallery-using-webgl-with-ogl-and-glsl-shaders/)
- "Creating an Infinite Circular Gallery using WebGL with OGL and GLSL Shaders" (feb 2021). [Source](https://tympanus.net/codrops/2021/02/23/creating-an-infinite-circular-gallery-using-webgl-with-ogl-and-glsl-shaders/)
- "Building a Scroll-Revealed WebGL Gallery with GSAP, Three.js, Astro and Barba.js" (feb 2026). Le immagini si rivelano con uno shader durante lo scroll e al click si espandono in vista di dettaglio. [Source](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
- "Creating a Smooth Horizontal Parallax Gallery: From DOM to WebGL" (feb 2026). È un percorso orizzontale, prima in DOM e CSS, poi in Three.js. [Source](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)
- "Building a Scroll-Reactive 3D Gallery with Three.js, Velocity, and Mood-Based Backgrounds" (mar 2026). Lo sfondo cambia in base al "mood", un'idea vicina allo sfondo che segue il colore dominante della foto. [Source](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/)
- "Building a Scroll-Driven 3D Gallery Using a Blender Camera Path with Three.js and GSAP": una camminata 3D guidata dallo scroll. [Source](https://tympanus.net/codrops/?p=117076)

---

## Risposte alle domande chiave

### D1. Quali siti hanno vinto premi o riconoscimenti (URL, autore, premio, data)?
- Hearst Exhibit 2026: OSMOS. Awwwards SOTD e Dev Award, 2 ago 2026. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026)
- Foam Talent 2021: Build in Amsterdam. Awwwards SOTD, 28 ott 2021. [Source](https://www.awwwards.com/sites/foam-talent-2021) L'edizione digitale 2020 risulta FWA of the Day (dic 2020), ma solo da snippet.
- PhotoVogue Festival: MONOGRID. Awwwards SOTD, 5 feb 2021, più caso FWA. [Source](https://www.awwwards.com/sites/photovogue-festival)
- Photographers' virtual gallery: Okey Studio. Awwwards SOTD, 30 ago 2022, più caso FWA. [Source](https://www.awwwards.com/sites/photographers-virtual-gallery)
- Encounter Stories: LEOLEO e Keny Zachelin. Awwwards Honorable Mention, 25 lug 2023. [Source](https://www.awwwards.com/sites/encounter-stories)
- Into the Amazon: Gladeye per NatGeo. Webby 2025, Winner in Immersive Science & Education. [Source](https://winners.webbyawards.com/2025/ai-immersive-games/immersive-general/science-education/324935/into-the-amazon) Secondo l'agenzia anche SOTD su Awwwards, FWA e CSSDA, ma senza date verificate. [Source](https://www.gladeye.com/work/into-the-amazon)
- NatGeo 2025 Pictures of the Year: in-house. Webby 2026 People's Voice. [Source](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-individual-editorial-feature-indbrandorg/368227/2025-pictures-of-the-year)
- World Press Photo: Emakina. Webby 2020, Associations. [Source](https://winners.webbyawards.com/2020/websites/general-websites/associations/122452/world-press-photo-connecting-the-world-to-the-stories-that-matter)
- Magnum Photos: Code and Theory con DigitalWerk. Communication Arts Webpick, data non indicata. [Source](https://www.commarts.com/webpicks/magnum-photos)
- Vermeer Pocket Gallery: Google Arts & Culture. Cannes Lions 2019. [Source](https://www.lovethework.com/work-awards/campaigns/vermeer-pocket-gallery-604888)
- Snow Fall: NYT. Pulitzer 2013 (Feature Writing) e Peabody. [Source](https://en.wikipedia.org/wiki/Snow_Fall)
- M+ Museum: Awwwards Honorable Mention, 13 mag 2022. [Source](https://www.awwwards.com/sites/m-museum-website)

### D2. Come modellano stanze, serie e sequenza, e come guidano il visitatore?
- **Stanza per stanza, sequenziale:** Hearst Exhibit (descrizione di seconda mano), con vista alternativa lista/griglia. [Source](https://www.awwwards.com/sites/hearst-exhibit-2026)
- **Percorso orizzontale:** Foam Talent 2021 (tag Horizontal Layout e Storytelling). [Source](https://www.awwwards.com/sites/foam-talent-2021) Into the Amazon alterna movimenti laterali e scroll. [Source](https://www.gladeye.com/work/into-the-amazon)
- **Spazio 3D:** Photographers' virtual gallery (una piccola stanza virtuale) e Pocket Gallery (stanze AR o 3D raggruppate per tema e colore). [Source](https://www.awwwards.com/sites/photographers-virtual-gallery), [Source](https://blog.google/outreach-initiatives/arts-culture/explore-art-and-color-our-latest-ar-gallery/)
- **Scroll a capitoli:** Snow Fall. [Source](https://en.wikipedia.org/wiki/Snow_Fall)
- **Piattaforma per autore:** PhotoVogue Festival (un fotografo per scheda, più eventi). [Source](https://www.awwwards.com/sites/photovogue-festival)
- **Variazione a ogni visita:** Foam Talent 2020 mostra una copertina casuale a ogni visita (da snippet FWA).
- **Esposizione a tempo o a guida automatica:** non ne ho trovata nessuna documentata.

### D3. Come gestiscono didascalie, contesto, suono e transizioni?
- **Suono:** Encounter Stories mette l'audio al centro del concept. Foam Talent 2021 ha il tag Sound-Audio. Le Pocket Gallery hanno un'audioguida. [Source](https://www.awwwards.com/sites/encounter-stories), [Source](https://www.awwwards.com/sites/foam-talent-2021), [Source](https://blog.google/company-news/outreach-and-initiatives/arts-culture/new-audio-guide-our-augmented-reality-galleries/)
- **Transizioni:** Hearst usa un "Paper Curl" in WebGL (la foto si arriccia come carta) e ha preso 8.00 in Animations. PhotoVogue usa transizioni SVG e CSS. Foam usa un'animazione d'ingresso. Le fonti sono le rispettive pagine Awwwards.
- **Didascalie come dato:** in Magnum un'API lega ogni immagine a didascalie e metadati riusabili. [Source](https://www.commarts.com/webpicks/magnum-photos)
- **Contesto:** in Snow Fall le bio card dei personaggi aprono slideshow. [Source](https://en.wikipedia.org/wiki/Snow_Fall)

### D4. Quali sono buoni esempi di una singola immagine che domina il viewport con molto spazio negativo?
- Le palette registrate da Awwwards indicano fondi neri o quasi neri con una sola immagine alla volta: Hearst (#252525 e #E3E3E3), PhotoVogue (#000), Foam 2021 (#000 e #fff), Encounter Stories (#000 con accento arancione #FE5B02). Le fonti sono le rispettive pagine Awwwards.
- Snow Fall usa layout full-screen per le immagini. [Source](https://en.wikipedia.org/wiki/Snow_Fall)
- **Inferenza:** Hearst ed Encounter Stories sono i più vicini all'estetica del cliente (neri profondi, un colore dominante). Va confermato con un'ispezione visiva, che non ho fatto.

### D5. Stack tecnologico e og:image
| Sito | Stack | og:image |
|---|---|---|
| Hearst Exhibit 2026 | Next.js, WebGL, GSAP, Vercel | non trovata |
| Foam Talent 2021 | Next.js, React, Three.js, Vercel | non disponibile (redirect) |
| PhotoVogue Festival | CSS, SVG | non disponibile (connessione fallita) |
| Encounter Stories | **Nuxt 2 + Lenis**, Vercel | https://marionlepretre.vercel.app//thumbnail.jpg |
| Into the Amazon | WebGL, React, orchestratore custom | non trovata |
| NatGeo POY 2025 | n/d | https://i.natgeofe.com/n/79cd3223-8f1c-413e-bd6f-6a6363327dda/SouthSudan2025_ExtraBTS_iPhone_22.jpg?w=1200 |
| Rencontres d'Arles | Next.js | https://arles-web-cdn.s3.eu-west-par.io.cloud.ovh.net/small_ADELE_LE_BRAS_6_fa0361f2a2.jpg |
| Magnum Photos | WordPress, API immagini | https://www.magnumphotos.com/wp-content/uploads/2016/05/magnum_sharing.jpg |
| Pocket Gallery | n/d | https://lh3.googleusercontent.com/ci/AL18g_QaPyVYyENQW6bvyYN-Ej6c3HFaXYNUhMXnryCV0G7WrdxHZa97wZaDVH8kZHFBLs4SDf9KHr8 |
| Snow Fall | custom, fuori dal CMS | https://static01.nyt.com/packages/images/multimedia/bundles/projects/2012/AvalancheDeploy/chapter2_flat.jpg |

## Inferenze
- Il formato più premiato nel 2021–2026 è un microsite dedicato a una singola mostra (Hearst, Foam Talent, PhotoVogue, Encounter Stories), non il sito istituzionale. Per il cliente questo suggerisce di trattare ogni album come un microsite con identità propria (palette e transizione) dentro un contenitore comune.
- WebGL non è obbligatorio per un SOTD: PhotoVogue ci è arrivato con CSS e SVG.
- Pocket Gallery "Art of Color" mostra che le stanze ordinate per colore sono già un concetto curatoriale riconosciuto.

## Lacune
- Non ho trovato microsite editoriali di Leica, Hasselblad o Fujifilm premiati come SOTD o FWA. Leica Store Australia risulta solo nominee nel 2023. [Source](https://www.awwwards.com/sites/leica-store-australia)
- Non ho trovato siti Awwwards per Photo Elysée, C/O Berlin, The Photographers' Gallery o Fotografiska.
- Non ho trovato premi SND per photo-essay del Guardian, del NYT o di Reuters nel 2021–2026: è un'area non coperta.
- Godly, Siteinspire e Hoverstat.es non sono stati consultati per mancanza di tempo.
- Didascalie e suono sono documentati solo in parte. Le date SOTD per Into the Amazon non sono verificate.
- I dati FWA su Foam Talent 2020 vengono solo da snippet (la pagina FWA ha dato 404).
