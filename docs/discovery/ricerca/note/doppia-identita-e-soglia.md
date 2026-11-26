# Doppia identità e soglia: research notes

Scope: creative-developer and designer-developer portfolios that (1) show a second practice such as photography, sound or art, (2) use a split, choice or dual-mode entry, (3) include an experiments or lab section, or (4) present a CV or career inside an experimental experience. Benchmark for lucaiaconelli.it, which plans a threshold ("soglia") entry leading to "the developer" (CV + 15-experiment WebGL/GSAP/Three.js lab) or "the photographer" (curated exhibitions).

Research date: 2026-11-24. Award data comes from Awwwards `/sites/` pages, read with curl and WebFetch. "Live" means the site's homepage returned HTML on 2026-11-24. "Stack (observed)" means I found framework fingerprints in the served HTML, such as `/_nuxt/`, `_next/static`, `/_astro/` or `wp-content`. Pure photographer sites and museum sites are out of scope.

Abbreviations: SOTD = Site of the Day, SOTM = Site of the Month, DA = Developer Award, PH = Portfolio Honors, HM = Honorable Mention.

---

## 0. Quick catalogue (28 entries)

| # | Owner / site | URL | Category | Verified awards | Stack | Live |
|---|---|---|---|---|---|---|
| 1 | Gianluca Gradogna | https://gianlucagradogna.com/ | **Design + travel photography in one site** | SOTD Jan 23 2025 (7.4), DA (7.44), PH Jan 2025 | Nuxt, GSAP, custom smooth scroll | yes |
| 2 | Pacôme Pertant (built by Louis Bocquet) | https://pacomepertant.com/ | Motion + sound designer (two practices) | SOTD Jun 9 2026, DA, PH May 2026 | Nuxt, Three.js, GSAP | yes |
| 3 | Olha Lazarieva (dev Max Milkin) | https://www.olhalazarieva.com/ | Threshold loader + 3D "gallery room" | SOTD Oct 2 2025, DA, PH Sep 2025 | React Three Fiber, GSAP, Blender baked | yes |
| 4 | Paul Stamatiou | https://paulstamatiou.com/photos | Designer/engineer + travel photographer | none found | custom SPA with a "photoFeed / photostream by location" route | yes |
| 5 | Anthony Fu | https://antfu.me/photos | Vue/Nuxt core dev + Photos + Demos | none (peer benchmark) | n/a | yes |
| 6 | Patricio Gonzalez Vivo | https://patriciogonzalezvivo.com | Engineer + artist ("oil paint & code") | none checked | n/a | yes |
| 7 | Lynn Fisher | https://lynnandtonic.com | Web designer, CSS developer **and artist**; yearly redesign archive | none checked | n/a | yes |
| 8 | Adham Dannaway | https://www.adhamdannaway.com | **Split hero "designer / <coder>"** (classic) | none | WordPress | yes |
| 9 | Goodgrowth (Matt Stone) | https://goodgrowth.com/ | **Console boot-sequence threshold** + résumé PDF | HM Aug 7 2026 | Three.js, GSAP | yes |
| 10 | Bruno Simon, folio 2025 | https://bruno-simon.com | 3D world with **client work + "Lab"** inside | SOTD Jan 21 2026 (8.11), DA (7.65), PH Dec 2025, SOTM Jan 2026 | Three.js r0.187 (TSL/WebGPU), Rapier, GSAP, Howler, Vite | yes |
| 11 | Rauno Freiberg | https://rauno.me/craft | **Lab feed ("Craft")** benchmark | none checked | Next.js | yes |
| 12 | Hakim El Hattab | https://hakim.se/ | Classic experiments index | none checked | n/a | yes |
| 13 | Lusion / Lusion Labs | https://lusion.co → https://labs.lusion.co | Studio with a separate R&D lab subdomain | not checked (studio) | Astro (main site) | yes |
| 14 | Jesper Landberg | https://jesperlandberg.com | Motion-driven design engineer | SOTD Sep 29 2026 (7.73), DA (8.17), PH Aug 2026; earlier SOTD Jan 17 2020 | **Nuxt** + DatoCMS | yes |
| 15 | Antoine Wodniack | https://wodniack.dev/ | 15+ years senior creative dev | SOTD Dec 12 2024 (7.56), DA (7.58), PH Nov 2024 | Astro | yes |
| 16 | Arnaud Rocca | https://arnaudrocca.fr/ | Nuxt + OGL architecture reference | HM Mar 15 2026 | **Nuxt**, GSAP, Lenis, OGL, Prismic | yes |
| 17 | Jonas Reymondin | https://jonasreymondin.com | Design + engineering identity | HM Feb 21 2025 ("Folio:05") | **Nuxt**, Pinia, Lenis, GSAP SplitText | yes |
| 18 | Samsy (Samuel Honigstein), Gen-02 | https://samsy.ninja/ | WebGPU creative graphics engineer | SOTD + DA Oct 2025 (secondary source) | Vue, WebGPU, GSAP | yes |
| 19 | Dorian Lods 2025 | (via Awwwards) | Vue + GLSL single page | HM Aug 19 2025 | Vue.js, GLSL, WebGL | not checked |
| 20 | Stefan Vitasović, Portfolio25 | https://stefanvitasovic.dev/ | WebGL video grid + typography | SOTD Sep 20 2025 | Next.js, R3F | yes |
| 21 | Roman Jean-Elie, Portfolio '25 | https://www.romanjeanelie.com/ | WebGL synced to DOM | SOTD Nov 2 2025 (7.21) | Three.js, R3F, GSAP | yes |
| 22 | Thibault Introvigne | https://thibault-introvigne.com | **Career as 10 collectibles** in a game | none stated | Three.js, R3F | not checked |
| 23 | Elliott Mangham | https://elliott.mangham.dev | Interactive awards showcase (CV device) | SOTD Dec 2 2025, DA, PH Nov 2025 | GSAP, Vite (WordPress) | not checked |
| 24 | Cyd Stumpel | https://cydstumpel.nl | Dev + teacher, with an archive | SOTD Mar 9 2025; HM Jul 10 2023 | WordPress | yes |
| 25 | Mike van der Sanden | (Codrops "Visit" link) | "Personal Project Platform": a living lab or archive | none stated | Nuxt, Prismic, Three.js | not checked |
| 26 | G. Colombel, Portfolio 2026 | (via Awwwards) | Gallery + sound | SOTD Oct 28 2026 (7.5) | Three.js, WebGL | not checked |
| 27 | Robin Noguier (older classic) | https://robin-noguier.com | Interactive designer benchmark | SOTD Oct 27 2020 | Next.js + Prismic | yes |
| 28 | Henry Heffernan (2022 classic) | https://henryheffernan.com | 3D computer as portfolio; CV inside | **no award found** | n/a | yes |

---

## Q1. Creative developers who also show photography or another art practice, and how they balance the two

### Findings

**Gianluca Gradogna, Portfolio '25 (closest match to the client brief; Italian, Florence-based)**
- Self-described "Multidisciplinary Designer based in Florence. With expertise spanning design, advertising, coding and photography" (meta description, https://gianlucagradogna.com/).
- Awards: SOTD Jan 23 2025, score 7.4/10 (Design 7.59, Usability 7.04, Creativity 7.52, Content 7.51); Dev Award 7.44; credits Gianluca Gradogna and Norman Gabriel [Source](https://www.awwwards.com/sites/gianluca-gradogna-portfolio). Listed under Portfolio Honors Jan 2025 with DA [Source](https://www.awwwards.com/websites/winner_category_portfolio/).
- How it balances the two practices, from his own case study: "I feel like design and photography are parts of who I am creatively. One inspires the other… The result is an **infinite scroll homepage that invites users to explore both design and photography together**… To dive deeper into my travel photography, I built a **dedicated horizontal scroll page**" [Source](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/).
- Typography split: "The biggest challenge I faced was finding a way to present and differentiate the design and photography sections while keeping them visually connected… a clean, sans-serif font to represent the design side… [for photography] one that felt simple yet elegant and refined without creating too much contrast. Striking this balance was key to making both sections feel **distinct yet cohesive**" [Source](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/).
- Motion: limited to "Position, Opacity, and Clip Masks… with the right easing and timing", prototyped in After Effects. The developer built "a custom scrolling system that perfectly synchronizes all the looping animations on the homepage while also implementing horizontal scrolling for the photography section" [Source](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/).
- Stack: **Framework Nuxt.js, Animations GSAP, Scroll: custom smooth scroll**. Design by Gianluca Gradogna, development by Gabriel Norman [Source](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/).
- Entry: on load the page shows "Loading portfolio" with a numeric counter and a "Please rotate your device" prompt, so the layout is landscape-first [Source](https://gianlucagradogna.com/) (WebFetch of rendered text). No usable og:image URL in the head; only `og:image:type` was found.

**Pacôme Pertant Portfolio (motion designer + sound designer)**
- "I'm Pacome Pertant, motion and sound designer based in Paris. I move shapes and sound to create emotional content… Clean at times, experimental at others" (meta description, https://pacomepertant.com/).
- Awards: SOTD Jun 9 2026. Awwwards tags include `music-sound`, `nuxt-js`, `three-js`, `gsap`, `3d`, `art-illustration` [Source](https://www.awwwards.com/sites/pacome-pertant-portfolio). Portfolio Honors May 2026 plus DA; author credited as Louis Bocquet [Source](https://www.awwwards.com/websites/winner_category_portfolio/).
- Awwwards og:image: https://assets.awwwards.com/awards/submissions/2026/05/69f89c17eef71174595831.png
- Observed stack: Nuxt (`/_nuxt/` in the HTML).

**Paul Stamatiou (designer who codes + travel photographer)**
- Career: Head of Design at Sesame (2025 to present); co-founder and Head of Design at Limitless (formerly Rewind AI, acquired by Meta); Senior Staff Product Designer at Twitter 2013–2021; earlier a web developer. "He has designed and built photosets of his travels, including Africa, New Zealand, Amsterdam, and Japan… He also shares photos on a photostream" [Source](https://paulstamatiou.com/about).
- `/photos` exists: "Photos by Paul Stamatiou. Mostly travel and adventure shots and videos" [Source](https://paulstamatiou.com/photos). The homepage bundle includes route chunks named `PhotoFeedExperience`, `_photoFeed.photostream._location`, `PhotoFeedDetailView` and `photoFeedTransition`. That points to a photo feed browsable **by location**, with animated transitions between feed and detail views. This is inferred from asset names seen in the HTML of https://paulstamatiou.com.
- No award found. Use it as a content-model benchmark (travel photosets as long-form "stories"), not as a visual benchmark.

**Anthony Fu (Vue/Nuxt core team; closest professional peer to the client)**
- The main nav is Blog, Projects, Talks, Sponsors, Podcasts, **Photos**, **Demos**. The Photos page opens with "Thank you for being interested in my photos" and shows roughly 500–600 images in one stream, with sparse captions (Kyoto, Otaru, Biei, Osaka). Dates appear only in filenames [Source](https://antfu.me/photos).
- Inference: this is the low-ceremony version of "dev + photographer". Photography is a peer nav item next to Talks and Demos, and there is no curation layer. That is the opposite of the client's "curated exhibitions" plan.

**Patricio Gonzalez Vivo (engineer + painter)**
- Site title: "Patricio Gonzalez Vivo - New media artist, oil paint & code". Description: "a new media artist bridging oil paint and code. Research-driven work on memory, awareness and non-linear time." og:image: https://patriciogonzalezvivo.com/2026/weaver2/thumbnail.jpg [Source](https://patriciogonzalezvivo.com). He is co-author of The Book of Shaders [Source](https://thebookofshaders.com/).

**Lynn Fisher (designer, CSS developer, artist)**
- "Lynn Fisher is a web designer, CSS developer, and artist from Phoenix, Arizona." The site has `/about` and `/archive`. The og:image file is named `vXIX.jpg`, which suggests a numbered yearly version [Source](https://lynnandtonic.com).

**Olha Lazarieva + Max Milkin ("Two Portfolios, One Process")**
- Designer–developer duo: "Each one became a reflection of the person behind it, shaped through the **same shared process but expressed in completely different ways**." Olha's site uses "a black-and-white visual language, almost like a chessboard". Her site also has a **3D gallery** where "the entire room is modeled in Blender, with lighting, AO and reflections baked directly into the textures… GSAP ScrollTrigger animates a gentle rotation of the entire room, creating a smooth 'entry' into the space" [Source](https://tympanus.net/codrops/2025/12/02/two-portfolios-one-process-where-design-motion-and-code-come-together/).
- Awards: SOTD Oct 2 2025 [Source](https://www.awwwards.com/sites/olha-lazarieva). PH Sep 2025 and DA [Source](https://www.awwwards.com/websites/winner_category_portfolio/). og:image: https://olhalazarieva.com/meta.jpg

**WoraWork (Worapat Supameteeworakul)**: interior-design and art background turned 3D artist turned developer. Uses a Zelda/Animal-Crossing-style house and garden, and includes the personal art project "What_The_Bed"; built with Three.js [Source](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025). URL: https://worawork.vercel.app. No award stated.

### Inferences
- Among recent Awwwards winners, **Gianluca Gradogna is the only verified case of a code-literate creative putting photography inside an award-winning portfolio**. It is also built on Nuxt, as the client's site will be. Its model differs from the client's in one way that matters: it **blends** the two practices on one infinite-scroll homepage and gives photography its own horizontal page. The client plans a **fork** at a threshold.
- The common balancing tools are a shared grid and motion vocabulary combined with **different typefaces per world** (Gradogna). Some sites add a distinct spatial metaphor for the art side: Olha's baked 3D room as an "exhibition" space, or Paul Stamatiou's location-based photostream.
- Developer-photographers with large audiences (Anthony Fu, Paul Stamatiou) treat photography as a nav item. Award-winning cases treat it as a **designed world with its own scroll axis or typography**.

### Gaps
- I found no Awwwards SOTD or DA portfolio described explicitly as "developer + photographer" with a choice at entry. Searches on Awwwards and in roundups returned nothing ([search context](https://www.awwwards.com/websites/portfolio/)). The client's concept therefore looks **uncommon among award-winning sites**, which counts as a differentiator.
- I did not name Gradogna's fonts, because the case study does not give them.
- I did not find a "designer + musician" developer portfolio with SOTD. Pacôme Pertant (motion + sound) is the closest. Maria Vasilyeva (SOTD Oct 9 2026) is "inspired by music and sound" but is a designer [Source](https://www.awwwards.com/sites/maria-vasilyeva-portfolio).

---

## Q2. Split, choice or dual-mode entries; two worlds with one identity; threshold experiences

### Findings

**Adham Dannaway: the canonical "designer | <coder>" split (older classic)**
- The hero has two linked panels. "designer" (product designer, UI and design systems) links to `/portfolio`. "<coder>" (front-end developer, clean efficient code) links to `/about`. The portrait between them is named `adham-dannaway-designer-coder.jpg`. Title: "Product designer & front end developer" [Source](https://www.adhamdannaway.com). og:image: https://www.adhamdannaway.com/wp-content/themes/dannaway/images/adham-dannaway-designer-coder.jpg
- A third-party review: "The page's split design visually communicates the dual skill set of the creator" [Source](https://woorise.com/landing-page-examples/adham-dannaway).
- Typographic device: the coder side is written in code syntax (`<coder>`), so the same name gets two typographic "voices".

**Goodgrowth (Matt Stone): threshold as a console boot sequence**
- Concept: late-90s/early-2000s console startup and boot screens, with 3D, motion and sound; built with Three.js and GSAP [Source](https://tympanus.net/codrops/2026/08/27/goodgrowth-boot-sequences-spinning-discs-and-the-art-of-the-portfolio/). Implementation note: the scroll is locked during the "build" fill animation, because users who scrolled immediately were thrown halfway down the page (same source).
- Awards: HM Aug 7 2026 [Source](https://www.awwwards.com/sites/goodgrowth). Homepage links a downloadable résumé (`/mstone_resume.pdf`) and loads display fonts Geist Pixel, Bodoni Moda, BBH Bartle, Stack Sans Notch/Text and Squada One (observed in the head of https://goodgrowth.com/).

**Olha Lazarieva: minimal 3D threshold**
- "The loader is the first thing the user sees… minimal, calm, and slightly 'alive'… two transparent spheres with a text texture, gentle idle motion." The camera eases toward the mouse position for "soft, cinematic parallax even before the main content appears". The GSAP exit timeline then drops the spheres and staggers the hero letters in "from: 'center'" [Source](https://tympanus.net/codrops/2025/12/02/two-portfolios-one-process-where-design-motion-and-code-come-together/).

**Bruno Simon, folio 2025: the whole site as a threshold**
- The 2019 concept of driving a car through a world is kept and rebuilt "for the WebGPU era" with Three.js TSL. Multiplayer features include "Whispers" (30 moderated messages), a global cookie counter and a circuit leaderboard. There are achievements, spatialized sound design (CC0 music), and a mobile quality preset that disables water blur and DOF [Source](https://www.awwwards.com/brunos-portfolio-case-study.html).
- The UI avoids HTML: "building actual 3D models for the interface and recreating standard interactions entirely in 3D, including clicks, scroll, keyboard input, and touch gestures. You can even navigate it with a gamepad" (same source).
- Awards: SOTD Jan 21 2026, 8.11/10 (Design 8.05, Usability 7.83, Creativity 8.62, Content 8.18); Dev Award 7.65 (Accessibility 6.60, Markup 6.80, WPO 8.20) [Source](https://www.awwwards.com/sites/brunos-portfolio). PH Dec 2025 and SOTM Jan 2026 [Source](https://www.awwwards.com/websites/winner_category_portfolio/).
- Stack, from package.json: three ^0.187, @dimforge/rapier3d (physics), gsap, howler, camera-controls, tweakpane, stats-gl, Vite 8, Stylus [Source](https://github.com/brunosimon/folio-2025). og:image: https://bruno-simon.com/social/share-image.png?cb=a. Awwwards og: https://assets.awwwards.com/awards/submissions/2025/12/693a93f06fe07413139511.png

**Ameen Abdullah**: a WebGPU sakura-petal loading screen opens onto a sakura tree on an island; scrolling reveals work; Vue.js + WebGPU. Described as "Awwwards-winning" without a date [Source](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025). URL: https://ameen-abdullah.dev. Award unverified.

**Sébastien Lempens**: a scroll-driven tour of 3D Paris. The camera switches between first-person, a scooter ride and skydiving [Source](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025). URL: https://sebastien-lempens.com. No award verified.

**Dual-mode "mode system" pattern (non-award reference)**: nickfrostech/my-portfolio presents "one versatile professional through two distinct lenses: Software Engineering and Visual Design". Dev mode lives at `/` and design mode at `/design`; content, themes and messaging adapt to the chosen context; Next.js + Tailwind [Source](https://github.com/nickfrostech/my-portfolio). A MindInventory Dribbble concept shows a Designer/Developer switch in a hero [Source](https://dribbble.com/shots/15266237-Personal-Portfolio-Website-Hero-Section-Interaction).

### Inferences
- Explicit "choose your path" splits are **rare among 2022–2026 award winners**. The well-known example (Adham Dannaway) predates that window and sits on WordPress. Award-winning thresholds in 2025–2026 are mostly **ritual loaders**, such as Olha's spheres, Goodgrowth's boot sequence and Ameen's petals, or **world entries** such as Bruno Simon. A threshold that is both a ritual and a choice would combine these two current patterns.
- Recommended pattern from the evidence: one shared identity layer (the name, one grid, one easing curve) plus **per-world typeface and color** (Gradogna), and **per-world spatial axis**, such as vertical or 3D for the dev world and horizontal for the photography world (Gradogna's horizontal photo page). Routes should be deep-linkable (`/` vs `/design` in the mode-system repo) so the threshold never traps returning visitors or recruiters.
- Goodgrowth's scroll lock during the intro is a warning to handle input during any threshold animation.

### Gaps
- I could not verify Robby Leonardi's "Interactive Resume" (rleonardi.com, a game-vs-classic résumé choice). curl timed out, so it is excluded from verified facts.
- I found no verified award-winning site with a visitor-controlled toggle between "professional" and "personal" modes.

---

## Q3. Experiments and lab sections: how they are structured

### Findings

**Bruno Simon, folio 2025**: "I had two types of projects I wanted to showcase: **client work and experiments (which I call the Lab)**. To preserve the immersive feel… I wanted to avoid traditional HTML UI as much as possible" [Source](https://www.awwwards.com/brunos-portfolio-case-study.html). The Lab is a physical zone of the same 3D world, not a separate page.

**Rauno Freiberg, `/craft`**: a vertical feed of about 80–90 experiments dated April 2021 to August 2026. Each item has a thumbnail, title, month/year and a call to action that varies by type: "View Production", "View Prototype" or "Read Essay". Demos are **not embedded**; static previews link out to `/craft/...` routes or external pages. The page has no intro text beyond the heading [Source](https://rauno.me/craft). Stack observed: Next.js. og:image: https://rauno.me/og4.png

**Hakim El Hattab (classic)**: a vertical list of about 56 linked cards, split into ~6 featured (reveal.js / Slides) and ~50 personal projects ("practical apps, interface libraries, and experiments"). Each card has only a title and one line; links go out to hakim.se subpages, CodePen, JSFiddle or product sites; there are no filters. The page also has a Q&A and contact block, and notes that past work-related projects are excluded and most are open source [Source](https://hakim.se/).

**Lusion → Lusion Labs**: the main site (Astro build, `/_astro/` assets) links to a separate subdomain, labs.lusion.co, described as "A space dedicated to anticipate how new technologies will affect brands and how we interact with them through R&D" [Source](https://labs.lusion.co) and [Source](https://lusion.co). The page content is client-rendered and was not readable.

**Noomo Labs** (agency lab as a standalone site): SOTD Jun 19 2024, DA, PH Jun 2024 [Source](https://www.awwwards.com/websites/winner_category_portfolio/). URL: https://labs.noomoagency.com/

**Mike van der Sanden, "Personal Project Platform"**: a portfolio that grew into "a living archive of projects and resources". It started from a moodboard "Happy Place" and "Instagram Experiments" begun in December 2022. Built on Nuxt.js + Prismic. A P5.js sketch was replaced by Three.js for performance [Source](https://tympanus.net/codrops/2025/09/17/the-making-of-a-personal-project-platform-a-portfolio-that-grew-out-of-process-and-play/).

**Anthony Fu, `/demos`**: Demos is a top-level nav item next to Photos [Source](https://antfu.me/photos).

**Arnaud Rocca: reusable WebGL component layer in Vue (directly reusable for a Nuxt lab)**
- Stack: "Nuxt: Frontend framework · GSAP: Animation library (SplitText, ScrollTrigger) · Lenis: Smooth scroll · OGL: Minimal WebGL library · Prismic: Headless CMS". GSAP effects are registered through a Nuxt plugin (`gsap.registerEffect`) [Source](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/).
- "OGL x Vue: … inspiration from React Three Fiber / TresJS and their approach of sharing a renderer context through a provide/inject pattern. This led to two core components: `<OglCanvas>` and `<OglContext>`". Effects then become declarative components such as `<FluidSlider>` with props. "Having a reusable component for the WebGL fluid effect allowed me to easily run [experiments]". Accessibility: mouseenter/leave paired with focus/blur, plus `<noscript>` CSS on top of Nuxt SSG (same source).
- Award: HM Mar 15 2026 [Source](https://www.awwwards.com/sites/arnaud-rocca-portfolio).

**Jonas Reymondin**: Nuxt app with Pinia stores (`content.ts`, `ui.ts` for navigation and loader), a `useScrollProgress` Lenis-driven composable, and a `v-text-anim` custom directive on GSAP SplitText. A modular bottom-center nav component has "three different behaviors" [Source](https://tympanus.net/codrops/2026/03/16/jonas-reymondins-portfolio-reclaiming-the-ui-eye-through-systems-code-and-pixel-motion/). Award: "Jonas Reymondin – Folio:05" HM Feb 21 2025; og: https://assets.awwwards.com/awards/submissions/2025/02/67a7262edbd66636443914.jpg [Source](https://www.awwwards.com/sites/jonas-reymondin-folio-05).

**Stefan Vitasović, Portfolio25**: Lead Creative Developer at 14islands (Stockholm) and an Awwwards juror. The projects page uses a **WebGL grid that shares a scroll engine with the about page**, with videos rendered as WebGL textures to keep mesh counts low. Stack: Next.js pages router (for page transitions), SCSS modules, Three.js + R3F, Motion AnimatePresence [Source](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/). Award: SOTD Sep 20 2025; tags include experimental, next-js, unusual-navigation and webgl [Source](https://www.awwwards.com/sites/stefan-vitasovic-portfolio25).

**Samsy (Samuel Honigstein), SMSY-Gen02**: "Award winning Creative Graphics Engineer specializing in WebGPU, WebGL, three.js" (meta, https://samsy.ninja/). A 3D WebGPU portfolio built with Vue.js, GSAP and custom WebGPU; "snagged both an Awwwards Site of the Day and Developer Award in October 2025" [Source](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world/). Muzli: 50+ international awards including Cannes Lions and Awwwards [Source](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/). og: https://samsy.ninja/textures/media.png

**Dorian Lods 2025**: HM Aug 19 2025; tags vue-js, glsl, webgl, experimental, single-page [Source](https://www.awwwards.com/sites/dorian-lods-portfolio-2025). The secondary source mentions WebGL refraction hover effects.

### Inferences
- There are three lab architectures:
  - **(a) Feed/index with outbound links**: Rauno, Hakim and Mr.doob-style. It scales to 50–90 items, costs little to maintain, and does not compete with the main experience.
  - **(b) Lab as a zone inside the immersive world**: Bruno Simon. Highest wow factor, but every experiment must be re-authored for the world.
  - **(c) Lab as a separate subdomain or site**: Lusion Labs, Noomo Labs. Clear separation that suits R&D.
- For 15 experiments, a curated version of (a) fits the scale: grid or list with date, tech tags and a short note, each opening a full-screen canvas route. Lazy-loading each canvas on its own route keeps the threshold light.
- Arnaud Rocca's `<OglCanvas>`/`<OglContext>` provide/inject pattern is a Vue-native way to give 15 experiments one shared renderer lifecycle. TresJS (named in his article) is the Three.js equivalent for Vue.

### Gaps
- I could not read the content of the Lusion Labs index (client-rendered).
- I could not confirm a lab section on Jesper Landberg, Antoine Wodniack or Stefan Vitasović; none showed a "lab" link in the homepage HTML.

---

## Q4. CV and career presentation inside an experimental experience

### Findings
- **Thibault Introvigne**: the visitor controls a spaceman and finds **ten collectibles, each revealing part of his professional experience and projects**. Inspirations: Blade Runner, Cyberpunk, The Witness; built with Three.js + React Three Fiber [Source](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025). No award stated.
- **Jay Ransijn**: a "design engineer with fifteen years of experience". Visitors play fetch with a dog, ride a bike and pull a lever to make a band play, and "knocking over logos of past companies sends them tumbling" [Source](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025). This is a career timeline turned into physics props. URL: https://jayransijn.com
- **Elliott Mangham**: an "interactive awards showcase", scroll-to-reveal with agency reveal, a project walkthrough video modal and a preloader. He claims 10 SOTDs and 2 Site of the Year nominations. SOTD Dec 2 2025 (7.24), DA 7.4; tags GSAP, JavaScript, Vite [Source](https://www.awwwards.com/sites/elliott-mangham). PH Nov 2025 [Source](https://www.awwwards.com/websites/winner_category_portfolio/).
- **Antoine Wodniack**: positions the CV as a number claim: "Creative Developer with 15+ years and 140+ projects, specializing in animation-driven, high-impact websites. Partnering with designers to craft memorable UX" (meta, https://wodniack.dev/). SOTD Dec 12 2024, 7.56/10; Dev Award 7.58 (Animations/Transitions 8.40) [Source](https://www.awwwards.com/sites/aw-portfolio). PH Nov 2024 [Source](https://www.awwwards.com/websites/winner_category_portfolio/). Observed stack: Astro. og: https://wodniack.dev/images/aw-creative-developer.png
- **Jesper Landberg**: "Swedish design engineer building visually rich, motion-driven websites. Two-time Awwwards Independent of the Year (2022 & 2024)" (self-claim in meta, https://jesperlandberg.com). SOTD Sep 29 2026, 7.73/10; DA 8.17; black/white palette [Source](https://www.awwwards.com/sites/jesper-landberg-4). PH Aug 2026 [Source](https://www.awwwards.com/websites/winner_category_portfolio/). Earlier version SOTD Jan 17 2020 [Source](https://www.awwwards.com/sites/jesper-landberg-2). Observed stack: **Nuxt** (`/_nuxt/`) + DatoCMS (og: https://www.datocms-assets.com/223669/1786435410-share.webp).
- **Goodgrowth**: a game-console experience, with a plain **résumé PDF** linked from the homepage (https://goodgrowth.com/mstone_resume.pdf, observed in the HTML). This is a "dual output" for recruiters.
- **Henry Heffernan, "Portfolio 2022"**: "I'm Henry, a Software Engineer based in NY… B.S. in Computer Science, currently looking for a full time role." og: https://henryheffernan.com/images/preview-new.jpg [Source](https://henryheffernan.com). I found **no award record**; an Awwwards-related search was unproductive [Source](https://www.awwwards.com/Hen3/).
- **Roman Jean-Elie, Portfolio '25**: SOTD Nov 2 2025, 7.21; "Design, development and motion by Roman Jean-Elie" [Source](https://www.awwwards.com/sites/portfolio-25-1). Five-step case study on Three.js, R3F and GSAP, syncing WebGL elements to DOM bounds [Source](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/).
- **Robin Noguier (older classic)**: "Interactive Designer working on apps and websites for startups, brands, and entrepreneurs"; SOTD Oct 27 2020 [Source](https://www.awwwards.com/sites/robin-noguier-portfolio). Observed stack: Next.js + Prismic (og on images.prismic.io).

### Inferences
- Senior profiles that win awards (Wodniack 15+ years, Landberg, Mangham) present career as **compressed proof**: years, project counts, award counts, client logos. They keep a full CV out of the immersive layer. Gamified CVs (Introvigne, Ransijn, Bruno Simon) come mostly from mid-career or 3D-specialist developers.
- A downloadable or plain-HTML résumé next to the experience (Goodgrowth's PDF) is the safe pattern for recruiters. Accessibility is the weak spot in immersive portfolios: Bruno Simon's DA Accessibility score was 6.60 [Source](https://www.awwwards.com/sites/brunos-portfolio).

### Gaps
- I did not verify the FWA SOTD claimed for Jordan Breton (Oct 2 2025, per [creativedevjobs](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025)) on thefwa.com. Its meta reads "freelance full-stack software engineer and creative Three.js developer"; og: https://jordan-breton.com/og-image.jpg.
- I did not verify CSSDA awards for any entry.

---

## Additional verified award-winning portfolios (benchmarks; dual identity not established)

| Site | Awards (verified) | Tags / notes | og:image |
|---|---|---|---|
| Cyd Stumpel, Portfolio 2025 | SOTD Mar 9 2025; 2023 version HM Jul 10 2023 | 3d, transitions, 404-pages; site has `/archive`; meta: "parttime teacher and an award winning independent creative developer" | https://assets.awwwards.com/awards/submissions/2025/02/67a23030df961413870728.jpg ([Source](https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025)) |
| Stas Bondar '25 | SOTD Feb 14 2025 | tags include photo-video, microinteractions, 404-pages | https://assets.awwwards.com/awards/submissions/2025/01/678b6325409be787330860.jpg ([Source](https://www.awwwards.com/sites/stas-bondar-25)) |
| Jordan Delcros Portfolio | SOTD May 28 2025 | 3d, unusual-navigation, gestures | https://assets.awwwards.com/awards/submissions/2025/04/681117055ca08533970303.png ([Source](https://www.awwwards.com/sites/jordan-delcros-portfolio)) |
| Grégory Lallé '24 | SOTD Oct 30 2024; PH Oct 2024; DA | about-page, minimal, transitions | https://assets.awwwards.com/awards/submissions/2024/10/670106e1d1012259838679.png ([Source](https://www.awwwards.com/sites/gregory-lalle-24)) |
| G. Colombel, Portfolio 2026 | SOTD Oct 28 2026 (7.5) | three-js, gallery, sound-audio, experimental | https://assets.awwwards.com/awards/submissions/2026/09/6ab287b7b1b30467092149.png ([Source](https://www.awwwards.com/sites/g-colombel-portfolio-2026)) |
| Aristide, Portfolio 2021 (older) | SOTD Jun 24 2021 | glsl, webgl, experimental | https://assets.awwwards.com/awards/submissions/2021/06/60bd9c0058f40043229779.jpg ([Source](https://www.awwwards.com/sites/aristide-portfolio-2021)) |
| Dennis Snellenberg (older) | HM Aug 15 2019 | freelance designer and developer | ([Source](https://www.awwwards.com/sites/dennis-snellenberg-portfolio)) |
| Artiom Yakushev | SOTD Dec 27 2025; PH Dec 2025 | Webflow; designer | ([Source](https://www.awwwards.com/websites/winner_category_portfolio/)) |

Awwwards scoring weights: Design 40%, Usability 30%, Creativity 20%, Content 10% [Source](https://www.awwwards.com/sites/g-colombel-portfolio-2026).

---

## Cross-cutting takeaways for lucaiaconelli.it (inferences from the findings above)

1. **Nuxt is well represented among award winners in this niche.** Gradogna (Nuxt + GSAP), Jesper Landberg (Nuxt + DatoCMS), Pacôme Pertant (Nuxt + Three.js + GSAP), Arnaud Rocca (Nuxt + GSAP + Lenis + OGL + Prismic), Jonas Reymondin (Nuxt + Pinia + Lenis + GSAP SplitText) and Samsy/Dorian Lods (Vue) all have verified awards. This supports the client's stack choice and gives concrete architecture references.
2. **Closest precedent:** Gradogna shows that photography and code-built design can share one award-winning site. He made them "distinct yet cohesive" through **two typefaces and two scroll axes** under one motion vocabulary (position / opacity / clip masks).
3. **Gap to exploit:** I found no award-winning developer + photographer portfolio with a **threshold choice**. Current thresholds are rituals (loader, boot, world entry) rather than forks.
4. **Lab design:** for 15 pieces, use a curated index (Rauno or Hakim style metadata: date, title, type CTA) with per-experiment canvas routes. A Vue provide/inject renderer context (Rocca's `<OglCanvas>`) or TresJS keeps the code coherent. Bruno Simon's "Lab inside the world" is the maximal reference.
5. **CV:** senior winners compress career into proof points (Wodniack's "15+ years, 140+ projects", Landberg's "Two-time Independent of the Year"). Goodgrowth adds a plain résumé PDF as a safety exit from the immersive layer.

## Sources consulted (main)
- https://www.awwwards.com/websites/winner_category_portfolio/ (Portfolio Honors list, page 1)
- Awwwards `/sites/` pages cited inline
- https://www.awwwards.com/brunos-portfolio-case-study.html
- https://github.com/brunosimon/folio-2025
- Codrops case studies: Gradogna (2025-01-30), Vitasović (2025-03-05), van der Sanden (2025-09-17), Jean-Elie (2025-11-27), Milkin/Lazarieva (2025-12-02), Reymondin (2026-03-16), Rocca (2026-03-31), Goodgrowth (2026-08-27)
- https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025
- https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world/
- https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/
- Live site heads fetched 2026-11-24 for the og:image and stack observations
