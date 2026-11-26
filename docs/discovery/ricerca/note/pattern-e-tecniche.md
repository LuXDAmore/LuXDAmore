# Interaction and rendering patterns for immersive photo galleries

Research notes for an Awwwards-level photography portfolio (Vue/Nuxt, Three.js, GSAP, Lenis, Motion). The photos have intense colour on deep blacks, negative space, isolated figures and intentional motion blur.

Date of research: 2026-11-24.

## How to read these notes

- **Facts** carry an inline [Source](URL).
- **Feel / fit / caveat notes** are marked *(analysis)*. They are my design and engineering judgement about this client's photography, not sourced facts.
- **tympanus.net (Codrops) returned HTTP 403 to direct fetches.** Codrops facts below come from search-result snippets: titles, dates, URLs and short descriptions. I did not inspect the demo code.

---

## 0. Platform status as of late 2026 (newer APIs)

| API | Status | Source |
|---|---|---|
| View Transitions, same-document (SPA) | Baseline Newly available since Firefox 144 shipped it (Oct 2025) | [web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available), [web.dev Oct 2025](https://web.dev/blog/web-platform-10-2025?hl=en) |
| View Transitions, cross-document (MPA) | Chromium yes. Firefox not supported: Chrome docs list it as unsupported, and a Mozilla bug from late 2026 says multi-page transitions still don't work | [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions), [Bugzilla 2001878](https://bugzilla.mozilla.org/show_bug.cgi?id=2001878), [caniuse](https://caniuse.com/cross-document-view-transitions) |
| View Transitions 2025 additions (nested groups, etc.) | Firefox listed as unsupported for nested view-transition groups | [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025) |
| CSS scroll-driven animations (`animation-timeline`) | Chrome 115+ (Jul 2023), Safari 26. A web.dev Oct 2026 roundup says Firefox 159 enables them by default. **Conflict:** caniuse snapshots show Firefox 153–155 unsupported, and a mid-2026 article says the feature was still behind a flag in Firefox 152. Re-check caniuse before relying on Firefox | [web.dev Oct 2026](https://web.dev/blog/web-platform-10-2026), [web.dev Sep 2025](https://web.dev/blog/web-platform-09-2025), [caniuse](https://caniuse.com/wf-scroll-driven-animations), [web-features](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations) |
| Safari scroll-driven refinements | 26.4 threaded scroll-driven animations; 26.5 progress-accuracy fixes (secondary source) | [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026) |

**Nuxt specifics**
- Nuxt has an experimental View Transitions integration with the client-side router: `experimental: { viewTransition: true }`. With `true`, Nuxt skips the transition when `prefers-reduced-motion: reduce` matches. With `'always'`, respecting that preference is up to you. It can be overridden per page via `definePageMeta({ viewTransition })`, and it supports view-transition `types` [Nuxt docs – experimental features](https://nuxt.com/docs/4.x/guide/going-further/experimental-features#viewtransition), [Nuxt transitions guide](https://nuxt.com/docs/4.x/getting-started/transitions#view-transitions-api-experimental).
- Demo: [StackBlitz nuxt-view-transitions](https://stackblitz.com/edit/nuxt-view-transitions); first shipped in [Nuxt 3.4](https://nuxt.com/blog/v3-4#view-transitions-api-support).

---

## Pattern catalogue

### 1. WebGL image-to-image transitions (displacement, noise/liquid, RGB shift, repetition)

**What it is:** a shader blends texture A into texture B using a displacement map, noise or a per-channel offset, driven by a GSAP-tweened `progress` uniform.

**Feel** *(analysis)*: cinematic, "film cut" or "liquid dissolve". RGB-shift reads as energy and suits the client's saturated colours on black. Heavy liquid or noise warps compete with the subject.

**Supports vs distracts** *(analysis)*:
- Good for slideshow or series navigation, kept short (≤700 ms) with a smooth ease.
- Distracting if every hover triggers it, or if it smears the isolated figure.

**Tech:** Three.js or OGL plane plus a fragment shader; GSAP for progress.

**References:**
- Codrops "WebGL Image Transitions" demo collection (akella): [live demo](https://tympanus.net/Development/webGLImageTransitions/), [GitHub](https://github.com/akella/webGLImageTransitions), [Awwwards inspiration entry](https://www.awwwards.com/inspiration/playground-creative-webgl-image-transitions).
- Codrops, "WebGL Shader Techniques for Dynamic Image Transitions" (22 Jan 2025) [Codrops](https://tympanus.net/codrops/2025/01/22/webgl-shader-techniques-for-dynamic-image-transitions/).
- Codrops "Repeating Image Transition" demo, Manoela Ilic, 28 Apr 2025, tagged grid / GSAP / page transition / repetition / WebGL [Codrops tag page](https://tympanus.net/codrops/hub/tag/page-transition/). Direct demo URL not verified.

**Caveats** *(analysis)*:
- Serve the first image as a real `<img>` for LCP, then hand over to WebGL.
- Under `prefers-reduced-motion`, fall back to a plain crossfade.

### 2. Scroll-revealed shader entrance (pixel / blur-to-focus / "emerging" images)

**What it is:** each image enters the viewport with a shader reveal, such as pixelation resolving, blur to sharp, or a mask growing. It is often paired with a click into a full-size detail view.

**Feel** *(analysis)*: "developing a print" or "focus-pulling". A blur-to-focus reveal echoes the client's own intentional motion blur. It is one of the most on-brand options.

**Tech:** Three.js planes synced to DOM rects; GSAP ScrollTrigger; Lenis.

**References:**
- Codrops, "Building a Scroll-Revealed WebGL Gallery with GSAP, Three.js, Astro and Barba.js" (2 Feb 2026). It covers a multi-page gallery with scroll-triggered shader reveals, smooth scrolling and page transitions [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/), [GitHub J0SUKE/gsap-threejs-codrops](https://github.com/J0SUKE/gsap-threejs-codrops).
- The repo describes images revealing "with a WebGL shader as you scroll, and then animate into a full-size detail view when you click" [GitHub](https://github.com/J0SUKE/gsap-threejs-codrops).
- Codrops "Emerging Images" (akella) [GitHub](https://github.com/akella/CodropsEmergingImages).

**Caveats** *(analysis)*:
- Never hide the image until JS runs. Render the DOM image visible first and enhance afterwards.
- Reduced motion: show images immediately.

### 3. Infinite / pan-anywhere 2D canvas (drag to explore)

**What it is:** a boundless plane of images that you drag, wheel or swipe in any direction. Tiles repeat or stream in by chunk.

**Feel** *(analysis)*: exploratory, "contact sheet on a light table". Strong on first impression, but it flattens hierarchy, so hero images lose weight. It works best as an index or archive view, not the main storytelling.

**Tech:** WebGL instanced planes or DOM transforms; GSAP Draggable/Observer; chunked loading.

**References:**
- Codrops, "Infinite Canvas: Building a Seamless, Pan-Anywhere Image Space" (7 Jan 2026). It uses React Three Fiber with chunk-based rendering (chunks drop and load as you move) and a lazy-loaded scene [Codrops](https://tympanus.net/codrops/2026/01/07/infinite-canvas-building-a-seamless-pan-anywhere-image-space/).
- The Awwwards "Infinite Gallery" concept article describes endless horizontal/vertical scrolling and zooming, and cites "World Page – Infinite Grid" by Unseen Studio [Awwwards](https://www.awwwards.com/web-design-galleries-slideshows.html).
- **Diane Desclaux**: Awwwards Nominee, tagged Photography and WebGL, with an "Infinite WebGL Grid" element. SOTD status not found [Awwwards](https://www.awwwards.com/sites/diane-desclaux).
- GSAP forum thread with a CodePen of a draggable infinite gallery; it suggests Observer for wheel input [GSAP forum](https://gsap.com/community/forums/topic/23529-infinite-canvas-effect-with-gsap/).
- Open-source infinite WebGL photo wall (not award-winning) [GitHub Vaga8ond](https://github.com/Vaga8ond/Personal-Portfolio).

**Caveats** *(analysis)*:
- Keyboard users need arrow-key panning plus a linear list fallback, and screen readers need a real list of links.
- On mobile, decide whether touch-drag conflicts with page scroll.
- Memory: use texture LOD and dispose chunks.

### 4. Infinite auto-scroll / circular (bent) gallery

**What it is:** a row or grid that loops forever. Planes bend along a curve (circular gallery) and respond to drag, wheel and velocity.

**Feel** *(analysis)*: fluid, "reel of film". The bend adds depth without full 3D.

**Tech:** OGL plus GLSL (lightweight, a good fit for Vue); Three.js works too.

**References:**
- Codrops, "Creating an Infinite Auto-Scrolling Gallery using WebGL with OGL and GLSL Shaders" (5 Jan 2021) [Codrops](https://tympanus.net/codrops/2021/01/05/creating-an-infinite-auto-scrolling-gallery-using-webgl-with-ogl-and-glsl-shaders/), [GitHub bizarro/infinite-webl-gallery](https://github.com/bizarro/infinite-webl-gallery) (MIT).
- Codrops, "Creating an Infinite Circular Gallery using WebGL with OGL and GLSL Shaders" (23 Feb 2021). It is draggable and scrollable, and duplicates the image set for wide screens [Codrops](https://tympanus.net/codrops/2021/02/23/creating-an-infinite-circular-gallery-using-webgl-with-ogl-and-glsl-shaders/), [GitHub](https://github.com/bizarro/infinite-circular-webgl-gallery), [Awwwards inspiration](https://www.awwwards.com/inspiration/infinite-circular-gallery-using-webgl).
- Codrops, "How to Create a WebGL Rotating Image Gallery using OGL and GLSL Shaders" (3 Dec 2024) [Codrops](https://tympanus.net/codrops/2024/12/03/how-to-create-a-webgl-rotating-image-gallery-using-ogl-and-glsl-shaders/).
- Note: these are 2021 sources (older than the 2022+ preference), but they remain the canonical OGL references.

### 5. Cylindrical / 3D carousels driven by scroll

**What it is:** images arranged around an invisible cylinder or ring that rotates with scroll or drag.

**Feel** *(analysis)*: sculptural, theatrical. Risky for this client: curvature distorts compositions built on negative space. Better used for a series index than for viewing a single photo.

**Tech:** CSS 3D transforms plus GSAP ScrollTrigger (DOM), or OGL with a single image atlas on one cylinder mesh.

**References:**
- Codrops, "On-Scroll 3D Carousel" (7 May 2025). The carousel rotates in 3D while scrolling, paired with a GSAP page transition [Codrops](https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/).
- Codrops, "How to Build Cinematic 3D Scroll Experiences with GSAP" (19 Nov 2025). It builds a WebGL cylinder with OGL from an image atlas, driven by ScrollTrigger [Codrops](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/).
- Codrops, "Creating 3D Scroll-Driven Text Animations with CSS and GSAP" (4 Nov 2025). It places items on an invisible cylinder using only CSS [Codrops](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/).
- Codrops, "Exploring 3D Image Rotations on Scroll" (18 Jun 2026) [Codrops](https://tympanus.net/codrops/2026/06/18/exploring-3d-image-rotations-on-scroll/).
- Codrops, "Mastering Carousels with GSAP: From Basics to Advanced Animation" (21 Apr 2025) [Codrops](https://tympanus.net/codrops/2025/04/21/mastering-carousels-with-gsap-from-basics-to-advanced-animation/).
- "WebGL Image Ring" (alphardex, 16 May 2025) and "Vortex Gallery" (3D/GSAP/scroll/Three.js) are listed in [Codrops 2025 Demo Highlights](https://tympanus.net/codrops/hub/2025-demo-highlights/). Their URLs and details are unverified because the page returned 403.

### 6. Horizontal scroll / parallax strip (pinned)

**What it is:** a vertical scroll is mapped to horizontal travel through a pinned strip of images, with inner-image parallax.

**Feel** *(analysis)*: an editorial "gallery wall walk". Very compatible with wide, negative-space frames.

**Tech:**
- GSAP ScrollTrigger `pin` plus Lenis.
- CSS scroll-driven animations as a JS-free progressive option (see §0 support).

**References:**
- Codrops, "Creating a Smooth Horizontal Parallax Gallery: From DOM to WebGL" (19 Feb 2026). It builds the gallery in DOM/CSS first, then upgrades it to Three.js shaders [Codrops](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/).

**Caveats** *(analysis)*:
- Pinned horizontal sections break keyboard and anchor navigation unless handled.
- On touch, consider native horizontal `scroll-snap` instead of hijacking.

### 7. Scroll-driven camera path / depth "zoom-through" gallery

**What it is:** images sit in 3D depth or along a spline, and scroll moves the camera through them. You "fly into" each photograph.

**Feel** *(analysis)*: immersive, tunnel-like, a strong "exhibition" narrative. Isolated figures on black float convincingly in depth, which makes this a top fit for the aesthetic.

**Tech:** Three.js, a Blender-authored curve, GSAP ScrollTrigger.

**References:**
- Codrops, "Building a Scroll-Driven 3D Gallery Using a Blender Camera Path with Three.js and GSAP" (7 Jul 2026). Images are distributed along a Blender curve and the camera follows it on scroll [Codrops](https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/).
- Codrops, "Building a Scroll-Reactive 3D Gallery with Three.js, Velocity, and Mood-Based Backgrounds" (9 Mar 2026). It has depth-layered images, palette-driven backgrounds and velocity-reactive motion, built with Vite and vanilla JS [Codrops](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/), [GitHub houmahani/codrops-depth-gallery](https://raw.githubusercontent.com/houmahani/codrops-depth-gallery/main/README.md).
- Cinematic scroll repo [GitHub](https://github.com/JosephASG/codrops-cinematic-scroll-animations).

### 8. Velocity-based distortion / motion blur tied to scroll speed

**What it is:** scroll (or drag) velocity feeds a shader uniform that skews, stretches, blurs or splits RGB, then decays to zero at rest.

**Feel** *(analysis)*: physical, "the page has inertia". For this client, a directional blur proportional to velocity is a direct, meaningful echo of the motion blur in the photos. Keep it at zero at rest so the photo is always seen clean.

**Tech:** Lenis or GSAP velocity → uniform; Three.js or OGL plane per image.

**References:**
- Codrops, "How to Create Distortion and Grain Effects on Scroll with Shaders in Three.js" (18 Jul 2024, Jan Kohlbach). It syncs HTML images with WebGL and uses `uMouseEnter` and cursor uniforms plus a cover-fit UV helper [Codrops](https://tympanus.net/codrops/2024/07/18/how-to-create-distortion-and-grain-effects-on-scroll-with-shaders-in-three-js/).
- GSAP CodePen feeding scroll velocity into a shader uniform that decays to zero [CodePen GreenSock](https://codepen.io/GreenSock/pen/EaVbXeM).
- Codrops "WebGL Scroll Spiral" computes velocity from the per-frame scroll delta and passes it as a uniform [Codrops](https://tympanus.net/codrops/?p=30761).
- Commercial reference: "Velosikew", a Framer component mapping scroll velocity to distortion with optional chromatic aberration [Contra](https://contra.com/p/mrOWOZOU-velosikew-scroll-velocity-web-gl-for-framer).
- Gap: no Codrops tutorial focused specifically on velocity *motion blur* was found. The distortion tutorial is the closest base.

### 9. Atmosphere layer: film grain, chromatic aberration, light leaks, datamosh

**What it is:** a full-screen post-processing pass or overlay: animated grain, edge-weighted chromatic aberration and vignette.

**Feel** *(analysis)*: analogue, tactile. Grain on deep blacks prevents banding and makes the screen feel like print. Chromatic aberration should be edge-only and subtle; on saturated colours it quickly looks like a glitch.

**Tech:** Three.js EffectComposer, `postprocessing` or `@tresjs/post-processing`; a CSS/SVG noise overlay as a cheap fallback.

**References:**
- The Codrops distortion-and-grain on scroll tutorial above [Codrops](https://tympanus.net/codrops/2024/07/18/how-to-create-distortion-and-grain-effects-on-scroll-with-shaders-in-three-js/).
- Codrops "Interactive WebGL Hover Effects" (post-processing displacement hover) [Codrops](https://tympanus.net/codrops/?p=49069).
- Codrops "Breaking the Frame: Building a Real-Time Datamosh Effect with Three.js" [Codrops](https://tympanus.net/codrops/?p=119915).
- Technique notes:
  - AMD FidelityFX Lens combines chromatic aberration, vignette and grain [GPUOpen](https://gpuopen.com/?p=61952).
  - Time-varying grain shaped by luminance [GameDev.net](https://gamedev.net/shaderlab/57-time-varying-film-grain/).
  - Radial CA growing toward the edges, with grain applied last [DEV](https://dev.to/hblai_filmlook/twelve-retro-photo-effects-in-one-webgl-fragment-shader-and-why-the-photo-never-leaves-the-browser-589b).
- Shader playground: basement.studio Shader Lab effects [basement](https://eng.basement.studio/tools/shader-lab/community/effects).
- Gap: no single Codrops tutorial combining grain, CA and a hover shader was found.

**Caveats** *(analysis)*:
- Animated grain triggers a full-screen repaint every frame. Cap it at 24–30 fps or freeze it under reduced motion.
- Never bake the overlay into the image itself, which would affect colour accuracy.

### 10. Cursor-driven image trails and reveals

**What it is:** images spawn along the pointer path, either a random series or the hovered project's images, then fade, drop or scale out. A related variant is a hover-to-preview image following the cursor over a text index.

**Feel** *(analysis)*: playful, brutalist, energetic. It suits a project index or contact page, and it fragments single-image contemplation. Desktop only.

**Tech:** DOM plus GSAP (no WebGL needed).

**References:**
- Codrops "Image Trail Effects" (7 Aug 2019), inspired by Ricky Michiels' site [Codrops](https://tympanus.net/codrops/2019/08/07/image-trail-effects), [GitHub mirror](https://gitee.com/mirrors_codrops/ImageTrailEffects). Ricky Michiels' photography portfolio is on [Awwwards inspiration](https://www.awwwards.com/inspiration/ricky-michiels-photography-portfolio).
- Codrops, "Ideas for Image Motion Trail Animations" (18 Oct 2023) [Codrops](https://tympanus.net/codrops/2023/10/18/ideas-for-image-motion-trail-animations).
- Codrops, "Made With GSAP: Building a Fun Gravity-Based Mouse Trail" (20 May 2026) [Codrops](https://tympanus.net/codrops/2026/05/20/made-with-gsap-building-a-fun-gravity-based-mouse-trail/).
- Codrops motion-trail tag: it includes a GSAP cursor trailer (Aug 2025) and a hero with image cursor trail (Jun 2025) [Codrops tag](https://tympanus.net/codrops/hub/tag/motion-trail/).

**Caveats** *(analysis)*:
- Use `pointer: fine` media queries.
- Disable under reduced motion.
- Make sure trail images are `aria-hidden`.

### 11. Thumbnail → fullscreen (shared-element / FLIP / View Transitions / WebGL handoff)

**What it is:** the clicked thumbnail morphs into the full-bleed detail image across routes, so continuity is preserved.

**Feel** *(analysis)*: this is the single most important interaction for a photo portfolio. It feels like "opening" the print, and it is what makes a gallery feel premium.

**Implementations:**
- **(a) Native View Transitions with `view-transition-name`.** In Nuxt this is `experimental.viewTransition` (see §0).
  - The Smashing Magazine gallery lightbox tutorial includes a fallback for browsers without the API [Smashing](https://www.smashingmagazine.com/2023/12/view-transitions-api-ui-animations-part1/).
  - Chrome docs: elements sharing the same `view-transition-name` are treated as the same element [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
  - Cloudinary's gallery notes that the morph depends on the lightbox image already having real dimensions when the transition starts [Cloudinary](https://cloudinary.com/blog/view-transition-gallery-cloudinary).
- **(b) FLIP via GSAP Flip or Motion.**
  - Motion's JS lightbox tutorial [motion.dev](https://motion.dev/tutorials/js-lightbox).
  - Codrops ContentLayoutTransition (a stack of images animating to a gallery view) [GitHub](https://github.com/codrops/ContentLayoutTransition).
- **(c) WebGL handoff**: the plane scales to fullscreen and the route changes underneath. See the Codrops Astro + Barba tutorial in §2 [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/).
- **Other references:**
  - Codrops page-transition tag, including "Async Page Transitions" and "Repeating Image Transition" [Codrops](https://tympanus.net/codrops/hub/tag/page-transition/).
  - Fullscreen View Transition gallery demo (Apr 2026) [freefrontend](https://freefrontend.com/code/fullscreen-view-transition-gallery-2026-04-14/).

**Caveats:**
- Cross-document VT is not in Firefox (§0), so an SPA (Nuxt) is the safer route. *(analysis)*
- Preload the full-resolution image before starting the morph. *(analysis)*
- Nuxt's `true` setting already honours reduced motion [Nuxt](https://nuxt.com/docs/4.x/getting-started/transitions#view-transitions-api-experimental).

### 12. 3D exhibition space (virtual room / floating frames)

**What it is:** a navigable 3D gallery space with framed photographs on walls or floating in a void.

**Feel** *(analysis)*: a literal "exhibition". It is memorable but heavy, and photos become textures viewed at an angle, which loses colour fidelity and scale. Floating frames in a black void suit this client better than a lit room. Use it as a special "exhibition" chapter, not the default viewer.

**Tech:** Three.js or TresJS, Blender scenes, baked lighting.

**References:**
- **"Photographers' virtual gallery"**: Awwwards Site of the Day, 30 Aug 2022. A small virtual photo gallery honouring photographers who share their photos [Awwwards](https://www.awwwards.com/sites/photographers-virtual-gallery).
- Codrops, "Building a Fully-Featured 3D World in the Browser with Blender and Three.js" (8 Apr 2025). An immersive 3D museum walkthrough (not step-by-step; assumes Three.js/React/Blender) [Codrops](https://tympanus.net/codrops/2025/04/08/3d-world-in-the-browser-with-blender-and-three-js/).
- Open-source 3D art gallery tutorials [GitHub vogdb](https://github.com/vogdb/3D-art-gallery), [GitHub theringsofsaturn](https://www.github.com/theringsofsaturn/3D-art-gallery-threejs).
- The camera-path gallery in §7 is the "guided" alternative to free walking.
- Gap: no Codrops first-person "walkable room" tutorial was found.

### 13. Colour sampling of images to drive UI (backgrounds, accents, cursor)

**What it is:** extract the dominant colour or palette of the current photo and tween the background, glow, text accent or cursor colour toward it.

**Feel** *(analysis)*: the whole site "breathes" with each image. With saturated subjects on black, a very low-opacity radial glow of the extracted colour behind the photo is stronger than flooding the background, which would kill the deep blacks.

**Tech:**
- **fast-average-color**: average or dominant colour in the browser, from image, URL, video, canvas or OffscreenCanvas [npm](https://npmjs.com/package/fast-average-color).
- **node-vibrant**: a palette (Vibrant, Muted, etc.) with the same API for Node, browser and worker; quantization can run in a WebWorker [GitHub README](https://raw.githubusercontent.com/vibrant-colors/node-vibrant/ed86836150aeef6c8171f1485d5264a6d95ba2c8/README.md), [npm](https://npmjs.com/package/node-vibrant).
- Recommendation *(analysis)*: extract at build time (Nuxt Content, a server route or a script) and ship the palettes as JSON. This avoids runtime CORS/canvas cost and layout flash.

**References:** the Codrops depth gallery with "mood-based", palette-driven backgrounds [Codrops](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/).

**Gap:** I did not verify an award-winning photography site that uses image-derived UI colour.

### 14. Restrained full-screen grid / "nothing competes with the picture"

**What it is:** the counter-pattern. A full-screen photo grid or single image, minimal UI and monochrome chrome, with motion reserved for transitions.

**Feel** *(analysis)*: gallery-white-cube confidence. Awwwards juries reward this when the craft is in the details: timing, easing and loading.

**References:**
- **Mark Clennon**, by The Blackpepper Studio (Nkenna Amadi, lead dev/design):
  - Awwwards Site of the Day, 6 Mar 2025, with a Developer Award; SOTD score 7.38. Tags include photography and WebGL [Awwwards site](https://www.awwwards.com/sites/mark-clennon), [Blackpepper on Awwwards](https://www.awwwards.com/sites/the-blackpepper-studio).
  - Webby Awards 2026 nominee/honoree listing in "Best Use of Photography" [Webby](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-use-of-photography/364976/mark-clennon).
  - A third-party listicle says the palette is only light grey and black (unverified) [webcoursesbangkok](https://webcoursesbangkok.com/7-photography-websites-for-your-design-inspiration/).
  - Awwwards elements: [stills gallery](https://www.awwwards.com/inspiration/stills-gallery-mark-clennon), [homepage](https://www.awwwards.com/inspiration/homepage-mark-clennon).

### 15. Elastic / magnetic micro-interactions (supporting layer)

**What it is:** magnetic buttons and cursor, elastic drag with inertia, and images that skew slightly in the drag direction.

**Feel** *(analysis)*: tactile polish. It supports photography when limited to UI chrome and drag inertia.

**References:**
- Drag-based WebGL slider element: "WebGL Slider — Drag", G. Colombel portfolio 2024 [Awwwards inspiration](https://www.awwwards.com/inspiration/webgl-slider-drag-g-colombel-portfolio-2024).
- [Draggable Image Gallery](https://www.awwwards.com/inspiration/draggable-image-gallery).
- Gap: no dedicated 2022+ Codrops magnetic tutorial was verified in this session.

---

## Award-winning photography sites to inspect (pattern usage NOT verified unless noted)

Most of these award facts come from Awwwards category listing snippets. Open each one to see which of the patterns above it uses.

| Site | Maker | Award (date) | Source |
|---|---|---|---|
| Mark Clennon | The Blackpepper Studio | SOTD + Developer Award (6 Mar 2025); Webby 2026 Best Use of Photography listing | [Awwwards](https://www.awwwards.com/sites/mark-clennon), [Webby](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-use-of-photography/364976/mark-clennon) |
| Meech213 (fashion/beauty portraiture studio) | The Blackpepper Studio | SOTD (29 Jun 2026) | [Awwwards portfolio nominees](https://www.awwwards.com/inspiration_search/Photography%20portfolio/) |
| Cathy DOLLE Portfolio | Cathy Dolle | SOTD + Developer Award (27 Feb 2026) | [Awwwards photography](https://www.awwwards.com/websites/photography/) |
| Adovasio | Louis Paquet | SOTD + Developer Award (5 Mar 2026) | [Awwwards photographic](https://www.awwwards.com/websites/photographic/?page=2) |
| Detroit Paris | Thomas Carré | SOTD + Developer Award (27 Apr 2026) | [Awwwards photography](https://www.awwwards.com/websites/photography/) |
| ViV | Sam Dallyn | SOTD + Developer Award (6 Nov 2026) | [Awwwards photography](https://www.awwwards.com/websites/photography/) |
| PSP Production | Lynksen | SOTD + Developer Award (18 Nov 2026) | [Awwwards photography](https://www.awwwards.com/websites/photography/) |
| Photographers' virtual gallery | — | SOTD (30 Aug 2022), 3D virtual gallery (pattern 12) | [Awwwards](https://www.awwwards.com/sites/photographers-virtual-gallery) |
| Clmt. — Photography (Clément Mérouani) | — | SOTD (11 May 2020), tagged WebGL / GSAP / Three.js. Pre-2022 | [Awwwards](https://www.awwwards.com/sites/clmt-photography) |
| Diane Desclaux | — | Nominee only; infinite WebGL grid (pattern 3) | [Awwwards](https://www.awwwards.com/sites/diane-desclaux) |
| Paul & Henriette | — | Inspiration element tagged webgl / gallery / glsl; award not found | [Awwwards](https://www.awwwards.com/inspiration/paul-henriette-photography-portfolio) |

**Curated lists:**
- [Awwwards collection "Photography Portfolio"](https://www.awwwards.com/favsto/collections/photography-portfolio/)
- [Awwwards Photography sites](https://www.awwwards.com/websites/photography-sites/?page=2)
- [SOTD archive](https://www.awwwards.com/websites/sites_of_the_day/)

**Caveat:** a search summary flagged that some listing dates might be cached or scheduled. All the dates above are on or before today (2026-11-24), so they are plausible, but confirm each one on its own Awwwards page before quoting.

---

## Vue / Nuxt-specific tooling

- **TresJS** (declarative Three.js for Vue):
  - The official Nuxt module is `@tresjs/nuxt`. Install `@tresjs/cientos` and `@tresjs/post-processing` and the module auto-imports them [nuxt.com/modules/tresjs](https://nuxt.com/modules/tresjs), [GitHub](https://github.com/tresjs/nuxt).
  - Version conflict: one npm listing shows 4.0.0, while a jsDelivr README is for 5.6.3 [jsDelivr](https://cdn.jsdelivr.net/npm/@tresjs/nuxt@5.6.3/README.md). Check npm.
  - `@tresjs/post-processing`: 2.0.0 (3 Jan 2025) unified the effects namespace; a 3.7.2 README also exists [unpkg](https://unpkg.com/@tresjs/post-processing@3.7.2/README.md).
  - A secondary, non-official article says TresJS v5 adds WebGPU (via Three's WebGPURenderer), a CLI with Nuxt and post-processing presets, and Nuxt 4 compatibility [besthub.dev](https://www.besthub.dev/articles/tresjs-v5-brings-webgpu-and-full-vue-integration-to-3d-web-development-469779e1b7c6). Verify against the official changelog.
  - Talk: [GitNation – TresJS](https://gitnation.com/contents/bring-the-magic-of-3d-to-your-vue-applications-with-tresjs).
- **Nuxt View Transitions**: built-in experimental flag (see §0).
- **OGL**: most Codrops gallery tutorials (§4, §5) use OGL. It is a small, framework-agnostic library that is easy to wrap in a Vue composable *(analysis)*.
- **Not researched (gaps):** `nuxt-gsap` / `@hypernym/nuxt-gsap` module status, `lenis/vue` bindings, `@vueuse/motion` vs Motion for Vue, and any Vue-specific Codrops demo.

---

## Cross-cutting accessibility and performance checklist *(analysis, unsourced except where linked)*

1. **LCP:** render the first hero as a real `<img>` (AVIF/WebP, `fetchpriority="high"`, explicit dimensions), then swap to a WebGL plane once textures are uploaded. Never gate first paint on a WebGL loader.
2. **Reduced motion:**
   - Nuxt VT honours it with `true` [Nuxt](https://nuxt.com/docs/4.x/getting-started/transitions#view-transitions-api-experimental).
   - Mirror it in GSAP (`gsap.matchMedia`) and Lenis (disable smoothing), and freeze grain and velocity distortion.
3. **Mobile:**
   - Halve the device-pixel ratio for WebGL.
   - Use KTX2/Basis textures or downscaled textures.
   - Avoid scroll-hijacked horizontal pins and prefer native scroll-snap.
   - Disable cursor patterns under `pointer: coarse`.
4. **Semantics:** keep a DOM list of images with alt text and links underneath any canvas, so keyboard, screen-reader and SEO users get a linear path.
5. **Colour fidelity:**
   - Set the WebGL output colour space to sRGB.
   - Avoid tone mapping on photo planes, and keep the photo planes out of post-processing passes. Apply grain and chromatic aberration as overlays.
   - Deep blacks band easily, and grain helps.

## Fit ranking for this client *(analysis)*

- **Strongest fit:**
  - #11 thumbnail→fullscreen morph
  - #2 blur-to-focus reveal
  - #8 velocity motion blur (echoes the photos)
  - #7 depth / zoom-through with figures floating on black
  - #9 subtle grain
  - #13 a low-opacity colour glow
- **Situational:**
  - #3 infinite canvas (archive or index)
  - #6 horizontal strip
  - #1 transitions (series navigation)
  - #12 exhibition (a special chapter)
- **Use sparingly:** #5 cylinders (curvature distorts negative space) and #10 cursor trails (index page only).

## Gaps / unverified

- Codrops pages were not fetchable (403). Article contents are from search snippets only. Exact demo URLs for "Repeating Image Transition", "WebGL Image Ring" and "Vortex Gallery" are unverified.
- No award-winning site was confirmed to use a specific pattern, except Clmt (WebGL tags), Diane Desclaux (infinite WebGL grid, nominee only) and Photographers' virtual gallery (3D gallery).
- No sourced data on performance budgets or LCP impact for any specific gallery site.
- The Firefox version for CSS scroll-driven animations conflicts between sources (see §0).
- GSAP showcase, threejs.org forum showcase and the Awwwards Academy articles were not reviewed.
