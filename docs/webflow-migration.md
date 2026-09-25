# Webflow Migration Inventory

This is a reference for rebuilding the Onn Grid Webflow site. The source is the static export in `webflow/`, which is local only and gitignored. Webflow site ID `625599fd1f3f5f9970abe177`, last published 2026-06-02.

When you need exact copy or markup, open the matching HTML file in `webflow/`.

---

## 1. Route map

The new routes keep the Webflow URLs so SEO carries over. "Page" means a `page` document rendered by the page-builder catch-all route.

| Webflow file | New route | Source | Notes |
|---|---|---|---|
| `index.html` | `/` | page, slug `home` | Title: "Webflow Web Design & Development \| Onn Grid" |
| `about.html` | `/about` | page | "Inspired by Local Businesses \| About Us" |
| `contact.html` | `/contact` | page | "Let's Get To Work! \| Contact Us". Has the contact form. |
| `work.html` | `/work` | page | "Featured Website Projects \| Our Work". Cards section, source `work`. |
| `website-pricing.html` | `/website-pricing` | page | "Simple Website Pricing That's Just Right \| Pricing". Also has Product JSON-LD ×3. |
| `features/website-features.html` | `/features/website-features` | page | "Advanced Features that Power Business Websites \| Features" |
| `features/features-list.html` | `/features/features-list` | page | No meta description or OG image. Orphan page. |
| `subscription-purchase.html` | `/subscription-purchase` | page, `seo.noIndex` | Thank-you page after checkout, with an inline Calendly kickoff embed. Orphan page. |
| `bio-links.html` | `/bio-links` | page (standalone route, no header/footer) | Link-in-bio page |
| `detail_work.html` | `/work/[slug]` | `work` | Case study. JSON-LD BlogPosting. |
| `detail_website-features.html` | `/website-features/[slug]` | `websiteFeature` | Article layout: TOC, progress bar, "more features" slider |
| `detail_service-areas.html` | `/service-areas/[slug]` | `serviceArea` | Local-SEO landing pages |
| `detail_service-area-features.html` | `/service-area-features/[slug]` | `serviceAreaFeature` | Feature × area article pages |
| `detail_website-integrations.html` | none | `integration` | Template body is empty. Redirect any live URLs (check the Webflow sitemap). |
| `404.html` | `app/not-found.tsx` | — | No nav or footer |
| `401.html`, `style-guide.html` | none | — | Webflow password page and Client-First style guide. The new `/style-guide` replaces the second one (dev only). |

No page has a canonical tag, and there is no sitemap or robots.txt in the export. The new site generates `sitemap.ts` and `robots.ts`.

---

## 2. Global elements

### Head (identical on every page)
- **GTM `GTM-5CS5TMF`:** now loaded through `@next/third-parties`, production only.
- **Finsweet Cookie Consent (opt-in mode):** there is no banner markup, so it never worked and GTM was never gated. Choosing a real consent solution is a build-phase decision.
- **JSON-LD `LocalBusiness`:**
  - "Onn Grid Website Design and Development", (337) 304-7998, hello@onngrid.com
  - Colorado Springs, CO; geo 38.846127, -104.800644
  - Mon–Fri 09:00–18:00; priceRange "$-$$$"
  - These values belong in `siteSettings`.
- **JSON-LD `SiteNavigationElement`:** invalid (a quote is missing), and its URLs don't match real paths. Rebuild it correctly or drop it.
- **Fonts:** WebFont loader for Poppins and PT Serif, plus self-hosted Borna. PT Serif was used by a single selector and has been dropped.
- **Fluid root font-size snippet:** replaced by a fixed 16px root and `clamp()` tokens.

### Navbar (custom, not `w-nav`)
Used on all pages except bio-links, 404 and the integrations template.
- **Bars:** two stacked fixed bars (dark and light logo) that cross-fade when the nav overlaps a section marked `is--header-black`. This is rebuilt as the `data-nav-theme` attribute set by `<Section>`.
- **Bar contents:** logo → `/`, a "Get Started" button → `/website-pricing`, and a hamburger that morphs into an X.
- **Overlay menu:** full screen and 94% white. Opening it also blurs the page (8px) and locks scrolling. Clicking the backdrop closes it.
  - **Main links:** numbered 01–06 (Home, Features `/features/website-features`, Pricing, Work, About, Contact). On hover, the other links dim to gray, the hovered link shifts 2em, and its number fades in.
  - **Secondary links:** Client Login (Stripe portal), hello@onngrid.com, (337) 304-7998.
- **Logo shrink:** on mobile, the logo shrinks from 9rem to 2.5rem over the first 30% of page scroll.
- **Legacy variant:** the three older detail templates use an older nav where the menu likely never opens. Don't reproduce it.

### Footer
- **Brand column:** logo, the tagline "Denver-based Webflow agency crafting custom solutions for businesses worldwide." (the location conflicts with the rest of the site, see §9), and the Webflow Professional Partner badge (→ `https://webflow.com/@onngrid`).
- **Explore:** Home, Features, Pricing, About.
- **Resources:** Work, Contact, Client Login, Consultation (Calendly).
- **Contact:** hello@onngrid.com.

### Other site-wide pieces
- **Custom cursor:** a 5px brand-blue dot plus a 3rem lavender ring that trails it. Desktop only.
- **Partner badge:** fixed bottom-right. Its text expands from 0 to 161px on hover. Decide whether to keep it after leaving Webflow.

---

## 3. Webflow components mapped to sections

| Webflow block | Where it appeared | New section |
|---|---|---|
| Page hero (eyebrow, H1, text, decorative circle) | work, pricing, features ×2, contact, service areas, feature detail pages | `heroSection` (default) |
| Home hero, plus the background video band below it | index | `heroSection`, then `mediaSection` (the video band) |
| About hero with a background video | about | `heroSection` (media) |
| Bio profile (photo, name, phone and email pills, "Add Contact") | bio-links | `heroSection` (profile) |
| 2-column feature (eyebrow, h2, text, checklist, arrow link, image) | index ×2, about ×2, pricing ×2, features ×2, service areas ×4 | `splitSection` |
| Feature grid, 3-column cards, features list | features, about, features-list, service areas | `cardsSection` (grid) |
| Feature slider (peek carousel with arrows) | index (static), feature detail pages (CMS) | `cardsSection` (carousel) |
| Integrations marquee (3 rows, alternating direction) | features, service areas | `cardsSection` (marquee, source `integration`) |
| Work cards (thumbnail, tags, title, tilt on hover) | index, work, work detail ("More work") | `cardsSection` (grid, source `work`) |
| Testimonial slider (hidden, lorem ipsum) | index, about | `cardsSection` (carousel, source `testimonial`). Deferred. |
| Bio quick links | bio-links | `cardsSection` (list) |
| Home process (sticky, scroll progress bar, 3 steps) | index | `processSection` (scroll) |
| Discovery → Delivery (5 numbered steps, sticky title, Lottie) | pricing, service areas | `processSection` (numbered) |
| Pricing cards (compact and full; yearly set hidden) | index, pricing | `pricingSection` |
| Compare table (collapsible, "i" tooltips) | pricing | `pricingSection.comparisonRows` |
| CTA + FAQ block | index, contact, pricing, both feature detail templates | `faqSection` with a callout, reused through a `sharedSection` |
| Subscription block with video | about, work, features, work detail, service areas | `calloutSection` (banner), reused through a `sharedSection` |
| Statement band ("Powered by Onn Grid") | index | `calloutSection` (statement) |
| Add-on tabs (eCommerce, Lead Capture, Memberships) | features, service areas | `tabsSection` |
| Contact form card | contact | `formSection` (contact) |
| Calendly inline widget | subscription-purchase | `embedSection` (calendly) |
| Case-study content blocks (heading, rich text, 1–3 images) | work detail | `splitSection` and `mediaSection` inside `work.sections` |

---

## 4. CMS collections mapped to Sanity

The export doesn't include CMS items or CMS images; they'll be pulled by the build-phase import script. Field names below were inferred from template bindings.

- **Work → `work`:**
  - Direct fields: name, slug, `thumbnail` (card background), `heroImage` (hero, og:image), `services` (rich text → string list), live website URL and label, tags (multi-reference → `tag`), `featured`, dates.
  - Case-study fields become `sections` blocks:
    - overview heading + body
    - full images 1 and 2
    - about heading/body + GIF
    - desktop heading/body + photos A and B
    - colors heading/body + palette image
    - font heading/body + typography image
    - mobile heading/body + photos A, B and C
- **Work tags → `tag`:** only the name is bound; the collection name is unconfirmed.
- **Website Features → `websiteFeature`:** name, slug, eyebrow/category, summary (hero and cards), overview heading, intro (rich text), body (rich text; its h2s build the TOC), icon (~49px), card image.
- **Service Areas → `serviceArea`:** name (the city) and slug. The rest of the page was static copy repeated per city. The feature grid came from a CMS list, which is now `features` refs.
- **Service Area Features → `serviceAreaFeature`:** name, slug, → serviceArea, → websiteFeature (probably), eyebrow, summary, intro, body, image.
- **Website Integrations → `integration`:** name, logo, and the marquee row.

---

## 5. Pricing data (as published)

| Plan | Monthly | Yearly (hidden) | Build fee from | Page range |
|---|---|---|---|---|
| Essentials | $375 | $3,456, via Square link `o1PcB3eV` | $2,000 | 1–10 pages |
| Business Plus ("Most Popular") | $425 | $4,320, via `KZgeflIs` | $6,000 | 11–20 pages |
| Enterprise | $515 | $5,670, via `OYYOYNEd` | $10,000 | 30+ pages |

- **Square links:** `https://square.link/u/<id>`.
- **Monthly "Select" buttons** go to `/contact`.
- **Plan features:**
  - Essentials: backups, hosting, SSL, updates and support. SEO, landing pages and integrations are shown dimmed.
  - Business Plus: Essentials, plus on-page SEO, landing pages, enhanced integrations, monthly analytics report, 2,000 CMS items, and e-commerce as an add-on.
  - Enterprise: Business Plus, plus an e-commerce store, job listings, doc/file upload, advanced integrations, 10,000 CMS items, and lead capture as an add-on.
- **Custom plan card:**
  - Features: custom bandwidth, guest editors, custom/advanced SEO, uptime SLAs, API integrations / Grid dashboard, global CDN, multiple domains.
  - CTA: schedule a call.
- **Compare table rows:**
  - Included in every plan: initial fee $0, design, development, hosting, SSL, backups, updates, virtual support.
  - Pages: 10 / 20 / 30+. Bandwidth: 50 / 200 / 400GB.
  - Business Plus and up: on-page SEO, portfolio, landing pages, advanced integrations, refresh every 36 months.
  - CMS items: 2,000 / 10,000.
  - E-commerce: +$100/mo on Business Plus, included on Enterprise.
  - Enterprise only: job listings, file upload, global CDN.
  - Lead capture: +$100/mo on Enterprise.

---

## 6. Contact form

These fields become `lib/forms/contact.ts` and the `server/actions/contact.ts` server action.

| Label | Field | Required | Notes |
|---|---|---|---|
| Name | `name` | yes | placeholder "Joe Smith" |
| Email | `email` | yes | placeholder "example@gmail.com" |
| Phone | `phone` | yes | placeholder "(xxx) xxx-xxxx" |
| Company Name | `company` | no | |
| Your Message | `message` | yes | 5,000 characters max; placeholder "Tell us about your project (scope, timeline, budget, etc)" |
| Honeypot | `website` | — | Hidden. Filled submissions are silently dropped. |

Messages:
- **Success:** "Thank you! Your submission has been received and a team member will reach out to you shortly." (The original had a typo.)
- **Error:** "Please double-check the highlighted fields." (was "Oops! Double check that all required fields are filled out.")

Delivery (email or CRM) is still a TODO.

---

## 7. Integrations and links

| What | Value | Where it lives now |
|---|---|---|
| GTM | `GTM-5CS5TMF` | `NEXT_PUBLIC_GTM_ID` |
| Calendly consultation | `https://calendly.com/onngrid/consultation` | `siteSettings.calendlyUrl`. Any `link` with kind `calendly` opens it. |
| Calendly project kickoff | `https://calendly.com/onngrid/project-kickoff-meeting?hide_event_type_details=1&hide_gdpr_banner=1` | `embedSection` on `/subscription-purchase` |
| Client login (Stripe billing portal) | `https://billing.stripe.com/p/login/fZe6r5eem2adays144` | `siteSettings.clientLoginUrl` |
| Webflow partner profile | `https://webflow.com/@onngrid` | footer / badge (to be decided) |
| Contact details | hello@onngrid.com, (337) 304-7998 | `siteSettings` |

Finsweet TOC and CMS Slider are replaced by a native TOC built from Portable Text and an Embla carousel. jQuery and `webflow.js` are dropped.

---

## 8. Interactions to rebuild

| Behavior | Suggested approach |
|---|---|
| Nav dark/light swap on scroll | Small client component: IntersectionObserver on `[data-nav-theme]` sections |
| Menu overlay (slide in, staggered links, blur, scroll lock, backdrop close) and hamburger morph | Client component. Stagger with CSS `transition-delay`. Blur via a `data-menu-open` attribute. |
| Menu link hover (dim others, shift, show number) | Pure CSS inside `@media (hover: hover)` |
| Logo shrink on scroll (mobile) | CSS scroll-driven animation with a static fallback |
| Custom cursor (dot + trailing ring) | Small client component (pointer events + rAF lerp). Only with `(pointer: fine)` and no reduced-motion preference. |
| FAQ accordion (70px rows, chevron rotates) | Mantine Accordion (already themed) |
| Home process (sticky steps fade in/out, gradient progress bar) | Client component using `motion` (`useScroll`, `useInView`) |
| Work card tilt (±2deg) and image zoom (1.025) | Tilt: small client component. Zoom: pure CSS. |
| Integrations marquee (140s / 120s / 140s, alternating direction) | Pure CSS keyframes, with the list rendered twice. Pause on hover and on reduced motion. |
| Feature peek carousel | `@mantine/carousel`. Slide width 25% / 40% / 55% / 95% by breakpoint, 1.5rem gap, loop, custom arrows, no dots. |
| Tabs | Mantine Tabs (already themed) |
| Pricing monthly/yearly toggle | Client component (SegmentedControl), behind the `showBillingToggle` flag |
| Compare table expand/collapse and tooltips | Mantine Collapse + Tooltip. One data source renders both desktop and mobile layouts. |
| About cards: border highlights while scrolling (mobile) | IntersectionObserver; `:hover` on desktop |
| Reading progress bar (feature detail) | CSS scroll-driven animation or `motion` |
| TOC from rich text | Server component built from Portable Text h2/h3, with `scroll-margin-top: var(--ds-scroll-offset)` |
| Lottie scroll indicator (loops; `is-invert` variant) | `lottie-react` via `next/dynamic` with SSR off. File: `src/assets/lottie/scroll-indicator.json` |
| Background videos | `<video autoPlay muted playsInline>` with poster. Files are in `public/videos/`; move to Sanity or Blob storage later. |
| Calendly popup and inline embed | One shared client component that loads `widget.js` with `next/script` |

The click-and-drag / coming-soon draggable CSS was dead code (no HTML used it), so it has been skipped.

---

## 9. Bugs and content problems not to reproduce

- **Broken Calendly popups site-wide.** The trigger targeted `.nav_cta-calendly-pop`, but the element's class is `.nav__cta-calendly-pop`.
- **Pricing compare arrow never rotates.** The script targets `#compare-features-arrow`, which doesn't exist.
- **Nav script throws** on pages without a nav.
- **Invalid JSON-LD.**
  - `SiteNavigationElement` is missing a quote, and its paths are wrong.
  - `BlogPosting` on work has empty bindings.
- **Location mismatch.** The home hero (desktop) and footer say "Denver-based"; the JSON-LD, meta, and mobile copy say Colorado Springs.
- **Yearly prices vs "Save 10%".** The actual savings are about 23% / 15% / 8%.
- **Compare table inconsistencies.**
  - Hidden cells hold placeholder values.
  - The mobile table says "$320/$400/$525" and "Up to 30".
  - Landing pages on Enterprise show a checkmark on desktop but "+$50/mo" on mobile.
- **Custom plan card differs** between its mobile and desktop versions.
- **Dead links.**
  - The bio-links "Add Contact" URL is malformed (`https://d/...`).
  - "Schedule Free Consult" on the feature detail templates is `href="#"`.
  - Email and phone are `#` in the legacy nav.
  - The footer logo links to `#`.
- **Template problems.**
  - Two H1s on service areas.
  - Placeholder static TOC on service-area-features.
  - Empty integrations template.
  - Testimonials are hidden lorem ipsum.
  - The marquee on service areas never loops.
- **Typos:** "devlopement", "wast your time", "reach out to your shortly", "Use to the form below".

---

## 10. Original design values

For reference only. The theme in `src/theme/` is now the source of truth.

- **Colors:**
  - dark blue #404eed (primary), blue #64c1ff, light blue #c4c4e4
  - black #121722, dark gray #242d40
  - gray #c6c6c6, gray-2 #7c7c7c, light gray #fafafa
- **Type:**
  - h1 4.75rem, dropping to 2.65rem on small screens; h2 3rem → 2rem; h3 1.5rem (Borna)
  - `p` is Borna 1.125rem / 1.7
  - eyebrow: uppercase, 0.1rem tracking
- **Layout:**
  - gutter 1.5–2.25rem
  - section padding 10rem, dropping to 5rem on mobile
  - containers 48 / 64 / 75 / 90rem
- **Shape and motion:**
  - buttons are pills with 0.75rem × 2.5rem padding
  - cards have a 1rem radius
  - transitions run 250ms ease-in-out
- **Breakpoints (max-width):** 991 / 767 / 479px, which become Mantine's min-width 62 / 48 / 30em.

## 11. Where the assets went

| Webflow | New location |
|---|---|
| `fonts/*.ttf` | `src/assets/fonts/borna/*.woff2` (converted, ~15KB each) |
| Logos and partner badge | `public/brand/`. `-on-light` / `-on-dark` in the name describes the background the logo sits on. |
| Tech icons, checks, arrows, social icons | `public/icons/` |
| Circles, grids, underline, dark grid/square | `public/decor/` |
| Static page imagery (`Static-Content---*`, FAST mockups, profile photo) | `src/assets/images/` (base files only; the `-p-*` variants were dropped) |
| favicon / webclip | `src/app/icon.png` / `src/app/apple-icon.png` |
| Lottie JSON | `src/assets/lottie/scroll-indicator.json` |
| Videos | `public/videos/*.mp4` plus posters (the web-optimized transcodes only) |
