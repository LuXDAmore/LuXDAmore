# Color from imagery and dark immersive environments: a catalogue of reference sites and techniques

Scope note: the research was capped at about 17 tool calls. On 2026-11-24 a curl request checked live status (HTTP code), `<title>` and `og:image` for every entry marked "Live check". Awards are listed only when a source confirms them. Anything unconfirmed goes under Gaps.

## 1. Catalogue: which sites show adaptive color, color as navigation, dark immersion or single-image minimalism (URLs, makers, awards, dates)?

### Takeaway
No single verified award-winning site does all four things at once (a dark base, a UI colored from the image, browsing by hue, and minimal single-image layouts). The references are split. Photographer portfolios organize work by color (Dao, Babiedaite, Wild Hues, Matt Payne). Museum and Google tools let people browse by hue (Cooper Hewitt, Art Institute of Chicago, M+, Art Palette). Studio sites change the background per project (Black Magic, Creative Nights). Award-level immersive WebGL work leans dark (Igloo Inc, Paul & Henriette). The client's idea of a dark base taking on the color of the current album sits in an under-served gap between these groups.

### Cited Findings

**A. Award-level or curated immersive and dark references**
- **Igloo Inc** (https://igloo.inc). Made by Abeto, commissioned by the agency Bureaux, for the parent company of Pudgy Penguins. It won **Awwwards Site of the Year 2024** and **Developer Site of the Year 2024**. The jury praised its "immersive 3D experience with easy-to-navigate scrolling". — [Awwwards SOTY 2024](https://www.awwwards.com/annual-awards-2024/site-of-the-year); [Developer SOTY 2024](https://awwwards.com/annual-awards-2024/developer-site-of-the-year); [Awwwards case study](https://awwwards.com/igloo-inc-case-study.html)
  - It also appears on the Webby Awards 2026 winners site under "Features & Design – Best Visual Design – Aesthetic", credited to Abeto and Bureaux. — [Webby listing](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-visual-design-aesthetic/361001/igloo-inc)
  - Live check: HTTP 200. og:image `https://www.igloo.inc/assets/images/social.jpg`.
- **Paul & Henriette: Photography portfolio** (https://paulethenriette.com). Made by Aristide Benoist. Awwwards tags: fashion, photography, webgl, black, white, transitions, gallery, glsl, minimal, clean. — [Awwwards element](https://www.awwwards.com/inspiration/paul-henriette-photography-portfolio)
  - A search snippet from the Awwwards Minimal collection says it won an **Honorable Mention on 13 Aug 2021**. The element page itself shows no award badge, so treat the HM as likely but confirm it on awwwards.com/sites. It predates 2022 and counts as a classic. — [Awwwards Minimal collection](https://www.awwwards.com/awwwards/collections/minimal/)
  - Live check: HTTP 200. No og:image found.
- **Lusion** (https://lusion.co). 3D and interactive web studio. Its page title calls it "Award Winning 3D and Interactive Web Studio". I did not verify specific awards in this pass.
  - Live check: HTTP 200. og:image `https://lusion.co/assets/meta/social_sharing.jpg`.

**B. Per-project or per-image adaptive background color (studio and photographer portfolios)**
- **Black Magic Studio: Work** (https://heyblackmagic.com/work). Awwwards lists it as the inspiration element "Portfolio Background Color Change", tagged scroll, portfolio, work. The page gives no date and no award. — [Awwwards element](https://www.awwwards.com/inspiration/portfolio-background-color-change-black-magic-studio)
  - Live check: HTTP 200. og:image `https://heyblackmagic.com/media/_1200x630_crop_center-center_none/black-magic-web-development.jpeg`.
- **Creative Nights portfolio**. Its case-study system is modular and lets each case study set its own background color. Awwwards lists it, and the page is about 4 years old, so it predates 2022. — [Awwwards](https://www.awwwards.com/portfolio-of-creative-nights.html)
- **Keith Greenbaum, Photographer and Director** (https://www.keithgreenbaum.com/). The split-screen logo on the homepage changes color as photos move behind it. A scroll-triggered footer turns lime green. — [Framer blog, 20 Nov 2025](https://www.framer.com/blog/photography-portfolio-websites/)
  - Live check: HTTP 200. No og:image found.
- **Awwwards inspiration tags** also include "Hover change color project portfolio" and "Minimal Portfolio Gallery, Flat Color Transitions". I did not open these, so the makers are unknown. — [Awwwards hover color](https://www.awwwards.com/inspiration/hover-change-color-project-portfolio); [Awwwards flat color transitions](https://www.awwwards.com/inspiration/minimal-portfolio-gallery-flat-color-transitions)
- **Format** offers a photography website template that pulls "a color from each image" in horizontal scrolling galleries. It is a template, not a curated site. — [search summary of Format templates](https://www.format.com/website-templates/photography)

**C. Color as navigation in photographer portfolios**
- **Dao for Design (Darren TK Dao): Photography** (https://www.daofor.design/photography). Photos are grouped into "coordinated blocks" that move viewers through the palettes in his work. Built on Framer. — [Framer blog](https://www.framer.com/blog/photography-portfolio-websites/)
  - Live check: HTTP 200. og:image `https://framerusercontent.com/assets/NAfQR4n1ttJ7FXuDanSHlXsgbCY.png`.
- **Ausra Babiedaite** (https://ausrababiedaite.com/). The top-right menu opens an "index of color-organized photos". Clicking a photo expands the full campaign while the other photos fade into the background. — [Framer blog](https://www.framer.com/blog/photography-portfolio-websites/)
  - Live check: HTTP 200. og:image `https://ausrababiedaite.com/img/containers/assets/ausra-babiedaite-home.jpg/ca4dba4d0b9945a23a71b48b8661c91b/ausra-babiedaite-home.jpg`.
- **Wild Hues** (https://liftruncode.github.io/). Nature photography "organized by hue". The browse menu lists 9 colors, from red to black. — [Wild Hues](https://liftruncode.github.io/)
  - Live check: HTTP 200. og:image `https://liftruncode.github.io/images/share-preview.jpg`.
- **Matt Payne Photography: Fine art prints by color**. Commerce galleries split by color: blue, green and red, yellow, orange. This structure is the closest analogue to the client's Blue/Green/Red/Orange albums. — [Matt Payne](https://www.mattpaynephotography.com/gallery/fine-art-photography-prints-by-color/)
  - Live check: HTTP 403 (Cloudflare bot challenge). The site appears to exist, but its content was not verified.

**D. Color as navigation in museum and cultural collections (mostly older classics)**
- **Cooper Hewitt, Smithsonian Design Museum: browse by color**. The 2013 beta let visitors pick from a 117-color grid based on the CSS3 palette. Each palette color extracted from an object is "snapped" to its nearest CSS3 color. — [Slate, Nov 2013](https://www.slate.com/blogs/the_eye/2013/11/19/smithsonian_cooper_hewitt_s_new_beta_website_lets_you_browse_the_online.html); [My Modern Met](https://mymodernmet.com/cooper-hewitt-design-museum-archive); [Cooper Hewitt object colors page](https://collection.cooperhewitt.org/objects/18272599/colors)
  - "Rijkscolors", a Cooper Hewitt Labs experiment, let users browse Cooper Hewitt and Rijksmuseum images by color side by side. — [Cooper Hewitt Labs](https://labs.cooperhewitt.org/?p=1747); [MetaFilter](https://metafilter.com/135160/All-the-colors-of-the-Eames-chair)
  - Live check: `collection.cooperhewitt.org/colors/` returned HTTP 403 (Smithsonian bot verification). Its current state is unverified. Flag as a pre-2022 classic.
- **Art Institute of Chicago: collection color filter and color wheel** (https://www.artic.edu/collection). The museum says its systems analyzed every work so that users can find works containing a specific color "across departments, across time". It suggests trying "ultramarine". — [AIC article](https://www.artic.edu/articles/773/inspirationtheres-a-filter-for-that-and-more); [AIC Collection](https://www.artic.edu/collection)
  - Live check: HTTP 200. og:image `https://www.artic.edu/iiif/2/e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9/full/1200,/0/default.jpg?w=1200&h=1364&fit=crop`.
- **M+ (Hong Kong): colour picker on the collections site**. M+ Labs wrote about it on Medium, and the picker is powered by the M+ API. — [M+ Labs on Medium](https://medium.com/mpluslabs/exploring-the-m-collections-through-colour-84638b4764b6) (the article was blocked to fetch, HTTP 403; the facts come from the search snippet)
  - Live check: collection page HTTP 200. og:image `https://www.mplus.org.hk/api/images/1668/width-1200|format-png/`.
- **Google Arts & Culture: Art Palette** (https://experiments.withgoogle.com/art-palette). Made by Simon Doury and Etienne Ferrier (per the page title). Users enter a palette or upload an image and get artworks with similar palettes. — [Experiments with Google](https://experiments.withgoogle.com/art-palette); [Core77](https://www.core77.com/posts/76088/Experimental-Google-Tool-Lets-You-Search-Art-by-Palette)
  - Live check: HTTP 200. og:image `https://lh3.googleusercontent.com/h62ZRAFhCgHmLazyaLmbN1vywM9F09AHtN7L9AEEYgALGTHckrxVjjze1uFAPbMlpEJB4iH7e4f8oUDqLx-251ziFAcW`.
- **Other museums that let visitors browse by color**: Williams College Museum of Art Collection Explorer (color and visual similarity) and SFO Museum Aviation Collection (blog post, June 2025). — [Kress Foundation](https://www.kressfoundation.org/News/williams-college-museum-of-art-collection-explorer); [SFO Museum Mills Field blog](https://millsfield.sfomuseum.org/blog/2025/06/)

**E. A classic where the whole screen becomes the color**
- **NIPPON COLORS: 日本の伝統色 (traditional Japanese colors)** (https://nipponcolors.com/). A guide to traditional Japanese colors with color codes. Gigazine covered it in 2014 and noted it was built for Safari. A companion iPad app exists. — [Gigazine 2014](https://gigazine.net/gsc_news/en/20140928-nippon-colors); [App Store](https://apps.apple.com/app/id1389937356)
  - Live check: HTTP 200. og:image `http://nipponcolors.com/images/site_thumb.jpg`.

### Inferences
- Matt Payne, Wild Hues and Babiedaite show that a color-first information architecture is accepted in photography. Their implementations are menus and grids, though, not changes to the environment itself. The client's "dark base takes on the album's hue" approach would stand out against them.
- Igloo Inc is the strongest verified award reference for an immersive, cinematic, scroll-driven world. Its icy palette is not image-derived color, so it is a mood and motion reference rather than a color-system reference. I did not confirm from sources whether its base is "dark"; that needs a visual check.
- The museum tools (Cooper Hewitt, AIC, Art Palette) are the main precedents for extracting a palette and snapping it to a fixed set of named colors. That maps directly onto a fixed set of four album hues.

### Gaps
- I verified no Godly, Siteinspire, FWA, CSSDA or Hoverstat.es entries. Those directories were not reached within the tool budget.
- **Other candidates from memory, unverified** (no source in this pass, so no awards claimed): photographer and studio portfolios by Aristide Benoist; Codrops/Awwwards demo-style WebGL photo galleries; Apple Music and Spotify UIs tinted by album art; MUBI film pages; A24. Each needs its own check before it goes in the report.
- I have no exact award dates for Black Magic, Creative Nights, Dao, Babiedaite, Greenbaum or Wild Hues. Framer's editorial roundup is a curation signal, not an award.
- The Paul & Henriette HM date (13 Aug 2021) comes from a search snippet only.

## 2. How is the color change implemented and timed (scroll, hover, route change), and with which techniques?

### Takeaway
There are three timing models: scroll-linked (IntersectionObserver or CSS scroll-timeline), hover or element-linked (Greenbaum's logo, hover-color portfolios), and continuous or real-time (canvas downsampling per frame, WebGL palette blending by camera depth). Extraction is done either offline or at build time (Gatsby `DOMINANT_COLOR`, museum pipelines) or at runtime in the client (Color Thief, a tiny canvas). The best-documented recent technique is the Codrops March 2026 WebGL "mood background": each image has its own palette, colors are blended by scroll depth, and the result is two soft color blobs plus film grain over a dark base. That is very close to the client's concept.

### Cited Findings
- **Codrops, "Building a Scroll-Reactive 3D Gallery with Three.js, Velocity, and Mood-Based Backgrounds" (9 Mar 2026)**. Each image has its own color palette. Backgrounds blend between palettes according to camera depth between image planes. A simplified shader draws "two soft color blobs and film grain". The gallery is scroll-reactive and velocity-driven. — [Codrops](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/) (details come from the search snippet; a direct fetch hit Cloudflare 403)
- **YouTube Ambient Mode, recreated (Adrian Bece, Smashing Magazine, 24 Jul 2023)**. — [Smashing Magazine](https://www.smashingmagazine.com/2023/07/recreating-youtube-ambient-mode-glow-effect/)
  - Each frame is drawn to a tiny **10×6 canvas**, because "by reducing the image to a low resolution, we're reducing it to the most dominant colors".
  - A `blur(1px)` filter is applied. The canvas sits behind the media at **0.4 opacity**, with an inset box-shadow to soften the edges.
  - A `requestAnimationFrame` loop runs while playing. The canvas is also redrawn on `loadeddata` and `seeked`.
- **Dominant-color libraries**: Color Thief extracts the dominant color or palette. AdaptiveBackgrounds.js, a jQuery plugin, applies the dominant color to the image's parent element. — [Color Thief](https://lokeshdhakar.com/projects/color-thief/); [Hongkiat on AdaptiveBackgrounds.js](https://www.hongkiat.com/blog/image-dominant-color-background-adaptivebackgroud-js/); [DEV: Color Thief tutorial](https://dev.to/n3rd/how-to-get-dominant-colour-of-an-image-with-the-color-thief-library-in-javascript-1p47)
- **Build-time extraction**: `gatsby-plugin-image` can supply a `DOMINANT_COLOR` placeholder. One developer used it for image-tinted shadows. — [DEV, LekoArts](https://dev.to/lekoarts/smooth-shadows-for-images-using-their-dominant-color-4pj8)
- **Scroll-linked switching**: IntersectionObserver applies a section's color when that section dominates the viewport. A pure-CSS alternative uses `scroll-timeline` keyframes and works in **Chrome and Edge 115+**. — [alvarotrigo.com](https://alvarotrigo.com/fullPage/background-change-on-scroll/); [DEV, Cruip](https://dev.to/cruip_com/changing-background-color-on-scroll-with-javascript-39g1); [Malik Kotb blog](https://malikkotb.github.io/blog/color-scroll)
- **Snapping to a fixed palette**: Cooper Hewitt computes the nearest CSS3 color for each extracted color and snaps it to a 117-color grid. — [Slate](https://www.slate.com/blogs/the_eye/2013/11/19/smithsonian_cooper_hewitt_s_new_beta_website_lets_you_browse_the_online.html)
- **Hover or element-linked**: Greenbaum's logo color changes as photos pass behind it, and his footer turns lime when scrolled into view. — [Framer blog](https://www.framer.com/blog/photography-portfolio-websites/)
- **Per-project theming via CMS**: Creative Nights lets each case study pick its own background color. — [Awwwards](https://www.awwwards.com/portfolio-of-creative-nights.html)
- **Dynamic theming in general**: an adaptive-color UI guide covers deriving UI themes from content. — [DEV, adaptive color guide](https://dev.to/mike-at-redspace/dynamic-theming-a-developers-guide-to-adaptive-color-in-ui-53ml)

### Inferences
- For this client, a hybrid looks robust. Extract colors offline per photo, store them in the CMS as e.g. `--accent`, `--glow` and `--ink`, and keep a per-album anchor hue (Blue, Green, Red, Orange). On route change, interpolate CSS custom properties, using the View Transitions API between albums. Within an album, blend by scroll position (scroll-timeline or IntersectionObserver), Codrops-style, with optional WebGL blobs and grain.
- Runtime extraction (Color Thief, canvas) adds CORS and CPU costs and gives inconsistent results. Precomputing at build time avoids both. This is inferred from the "algorithms differ" caveat below.

### Gaps
- I found no source documenting a production photography site that uses the View Transitions API specifically for color morphing. Treat it as a recommendation, not a precedent.
- I did not confirm the exact implementations of Black Magic, Dao and Babiedaite. There was no code inspection.

## 3. Which approaches overwhelm the photo and which support it? What accessibility and contrast concerns are reported?

### Takeaway
The documented, supportive approach is subtle: low-opacity, blurred, downsampled glow (around 0.4 opacity), decorative layers hidden from assistive tech, and the effect disabled under `prefers-reduced-motion`. The main reported risks are poor text contrast on raw extracted colors and inconsistent results from different extraction algorithms. On near-black images the glow becomes very faint, which suits the client's chiaroscuro but means accent colors must be chosen deliberately rather than taken as the raw average.

### Cited Findings
- A raw extracted color "may not contrast well with text" and may need adjusting for readability. Different algorithms can return different dominant colors for the same image. — [search summary of adaptive-color sources](https://dev.to/mike-at-redspace/dynamic-theming-a-developers-guide-to-adaptive-color-in-ui-53ml)
- The Ambient Mode recreation does the following:
  - hides the canvas under `prefers-reduced-motion: reduce` (in CSS) and skips the JS listeners via `matchMedia`;
  - marks the canvas `aria-hidden="true"` as decorative;
  - calls the effect "incredibly subtle", especially with dark video colors on a dark theme;
  - keeps it understated with opacity and an inset shadow;
  - is described by its author as "performance-intensive". — [Smashing Magazine](https://www.smashingmagazine.com/2023/07/recreating-youtube-ambient-mode-glow-effect/)
- Ausra Babiedaite's index fades the other photos into the background when one is expanded, a focus-preserving pattern. — [Framer blog](https://www.framer.com/blog/photography-portfolio-websites/)
- Codrops 2026 keeps the mood background deliberately simple: two soft blobs plus grain, not full-frame color. — [Codrops](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/)

### Inferences
- **Supportive**: keep the base near-black and let the dominant hue appear only as a low-opacity radial glow, a thin accent such as a link or the active album, and a slow crossfade. Fix text to off-white, or to a lightness-clamped tint of the hue, so it meets WCAG 4.5:1 regardless of the photo.
- **Overwhelming**: full-bleed saturated backgrounds (e.g. a flat orange page behind an orange sunset). They flatten the image's own contrast and compete with the light bursting out of the blacks. Fast, scroll-linked hue swaps also risk visual fatigue and motion sensitivity.
- For the client's acid-green motion-blur and blue-to-violet dusk images, average-color extraction will skew toward black. A "most saturated significant cluster" (vibrant-swatch style), or a hand-curated accent per photo, will represent the image better than the mean color.

### Gaps
- I found no published WCAG audit or user study on adaptive-color photography sites.
- I verified no award-jury comments that discuss color overwhelming imagery.
