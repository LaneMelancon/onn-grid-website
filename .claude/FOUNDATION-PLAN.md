# Foundation Plan: Webflow → Next.js + Mantine + Sanity

Approved 2026-09-25. This is the complete plan for the first pass: setup and groundwork only, no page building. The build phase gets its own plan once this lands.

## Context

The Onn Grid site runs on Webflow today:
- a static export in `webflow/`, which is local-only and gitignored
- Finsweet Client-First CSS
- jQuery with Webflow IX2 interactions
- Webflow CMS

It's moving to **Next.js 16 (App Router), Mantine 9, and Sanity 6, deployed on Vercel**, following `.claude/ARCHITECTURE.md`. The Mailchimp and Resend parts of that doc are future work.

This pass covers:
- installing dependencies
- setting up the repo and branches
- translating the Webflow design system into one reusable token source
- migrating static assets
- wiring up Sanity (Studio, schemas, client, live content)
- scaffolding every route and the section registry
- writing down the full migration inventory

**What exploration of the export found:**
- 17 HTML pages
- 5 CMS collections: work, website-features, service-areas, service-area-features, website-integrations
- 1 real form (Contact, which has a honeypot)
- about 30 client behaviors to rebuild
- several live bugs that must not be carried over (see `docs/webflow-migration.md`)

## Locked decisions

| Topic | Decision |
|---|---|
| Package manager | npm. Everything installs into the project; no global installs. CLIs run through `npx` against local packages. |
| Sanity | Existing project `im529abe` ("onn-grid-website"), dataset `production` (to be confirmed after login). Studio embedded at `/studio`. |
| Page model | A section page builder. Pages are made of a small set of flexible, atomic, prop-driven sections instead of one component per Webflow block. Shared blocks (CTA + FAQ, subscription banner) are defined once and referenced. |
| Sizing | Fixed 16px root. Headings, section spacing and gutters scale with `clamp()` tokens. Webflow's fluid-root snippet is dropped. |
| Token naming | Project-agnostic, so the core styling can be reused across projects the way Client-First was. Custom CSS variables use the `--ds-*` prefix (design system). Mantine palettes use role names (`brand`, `accent`, `tint`, `ink`, `gray`), not color names. |
| `webflow/` | Local only. `docs/webflow-migration.md` is committed in its place. |
| CMS content | Imported by a one-off script in the build phase. Schemas are defined now. |
| Git | `main` is production and `dev` is active work. All work happens on `dev`. When local checks pass, merge `dev` → `main` (`--no-ff`) and sync `dev` back. |
| Vercel | Connected last, after local previews. |
| Docs | Root `CLAUDE.md` holds the overview, conventions and a short changelog. `.claude/MEMORY.md` holds detailed session notes and is read only when troubleshooting or when asked. |
| Code style | Written the way a senior developer would: readable, idiomatic, industry standard, and lightly commented. |

**Version pins:**
- `typescript@~6.0.3`: typescript-eslint requires TypeScript below 6.1, and TypeScript 7 has no JS API yet.
- `eslint@^9`: eslint-plugin-react and eslint-plugin-import don't support ESLint 10 yet.
- Node 24 (Sanity requires Node 22.12 or newer).

---

## Step 0: Git bootstrap

1. `git init -b main`.
2. Write `.gitignore`: node_modules, .next, out, `.env*` except `.env.example`, .vercel, tsbuildinfo, next-env.d.ts, .DS_Store, `/webflow/`, `.sanity/`, `/schema.json`, and `.claude/settings.local.json`.
3. Add the remote `https://github.com/LaneMelancon/onn-grid-website.git`. The remote is empty, and gh is authenticated as LaneMelancon.
4. Make the initial commit on `main`: `.gitignore`, `README.md`, `CLAUDE.md` and the `.claude/` docs. Then push.
5. `git switch -c dev` and push it. Everything below happens on `dev`, in a few logical commits.

## Step 1: Scaffold and dependencies

`create-next-app` refuses a folder that isn't empty, and it would add demo and Tailwind files anyway. So I write the config files by hand and install with `npm install`.

- **dependencies:**
  - `next react react-dom`
  - `@mantine/core @mantine/hooks @mantine/carousel embla-carousel embla-carousel-react`
  - `sanity next-sanity @sanity/client @sanity/image-url @sanity/vision styled-components`
  - `@vercel/analytics @vercel/speed-insights @next/third-parties`
  - `zod clsx server-only motion lottie-react`
- **devDependencies:**
  - `typescript@~6.0.3 @types/node @types/react @types/react-dom`
  - `eslint@^9 eslint-config-next eslint-config-prettier prettier`
  - `stylelint stylelint-config-standard postcss postcss-preset-mantine postcss-simple-vars`
- **Deliberately not installed:**
  - Tailwind.
  - `@mantine/form`, `@mantine/notifications`, `@mantine/dates`. Logic stays in Next.js and React.
  - `@mantine/hooks` is installed only because Mantine requires it as a peer.

**Config files:**

| File | Contents |
|---|---|
| `package.json` | `engines.node >=22.12`. Scripts: `dev`, `build`, `start`, `lint` (`eslint .`), `lint:css`, `typecheck`, `format`, `typegen`. |
| `.nvmrc` | `24` |
| `tsconfig.json` | Path alias `@/*` → `src/*`; excludes `webflow`. |
| `next.config.ts` | `typedRoutes`; `images.remotePatterns` for `cdn.sanity.io`; `optimizePackageImports` for Mantine. |
| `eslint.config.mjs` | Flat config: `eslint-config-next` core-web-vitals + typescript, then `eslint-config-prettier`. |
| `.prettierrc` | Single quotes, 100-character lines, trailing commas. |
| `.stylelintrc.json` | Extends `stylelint-config-standard`. `color-no-hex` everywhere except the token file. camelCase module classes. Ignores Mantine's `@mixin`. |
| `postcss.config.mjs` | `postcss-preset-mantine` + `postcss-simple-vars`, with breakpoints read from `src/theme/breakpoints.json`. That file is the single source; the theme imports it too. |
| `.env.example` / `.env.local` | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID=im529abe`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_GTM_ID=GTM-5CS5TMF` |

## Step 2: Directory structure

```
onn-grid-website/
├─ CLAUDE.md                     overview, conventions, changelog (always loaded)
├─ .claude/                      ARCHITECTURE.md, FOUNDATION-PLAN.md, MEMORY.md (on demand)
├─ docs/webflow-migration.md     inventory of the Webflow site
├─ sanity.config.ts / sanity.cli.ts
├─ public/                       brand/ icons/ decor/ videos/
└─ src/
   ├─ app/
   │  ├─ layout.tsx              root: html, fonts, ColorSchemeScript, MantineProvider, CSS order
   │  ├─ not-found.tsx           global 404, no nav or footer
   │  ├─ icon.png, apple-icon.png, sitemap.ts, robots.ts
   │  ├─ studio/[[...tool]]/     embedded Sanity Studio
   │  ├─ api/draft-mode/         enable/disable for Presentation and visual editing
   │  └─ (site)/
   │     ├─ layout.tsx           GTM (production only), Vercel Analytics/SpeedInsights, SanityLive, VisualEditing, skip link
   │     ├─ bio-links/           page without chrome, still built from sections
   │     └─ (chrome)/
   │        ├─ layout.tsx        Navbar + main + Footer
   │        ├─ [[...slug]]/      page-builder catch-all ("/", /about, /contact, /work, …)
   │        ├─ work/[slug]/
   │        ├─ website-features/[slug]/
   │        ├─ service-areas/[slug]/
   │        ├─ service-area-features/[slug]/
   │        └─ style-guide/      design-system preview (404 in production)
   ├─ components/
   │  ├─ ui/                     atoms: Section, SectionHeader, Eyebrow, ActionLink, CheckList, IconBadge, Media, SanityImage, RichText
   │  ├─ blocks/                 molecules: Card, CardCollection, PlanCard, FaqList
   │  ├─ sections/               one component per section type + registry + SectionRenderer
   │  ├─ layout/                 Navbar, Footer
   │  └─ forms/                  ContactForm
   ├─ theme/                     Mantine theme (see Step 3)
   ├─ styles/                    tokens.css, global.css
   ├─ assets/                    fonts/borna, images, lottie
   ├─ sanity/                    env, lib (client, live, image, queries, token), schemaTypes, structure, types (generated)
   ├─ server/actions/            server actions (contact)
   └─ lib/                       routes (doc type → URL), metadata, site config
```

## Step 3: Styling system

The goal is one source per token and no duplicated CSS. The reusable core (structure, component defaults, semantic tokens) is kept apart from project values (palettes, fonts, scale values), so a new project only swaps the values.

1. **Project values: `src/theme/tokens/`.**
   - **Palettes** (10 shades each):
     - `brand`: #404eed at shade 6, the primary color.
     - `accent`: #64c1ff.
     - `tint`: #c4c4e4.
     - `ink`: #242d40 at shade 6 and #121722 at shade 9.
     - `gray`: #fafafa, #c6c6c6, #7c7c7c.
   - **Type scale:** clamp heading sizes, e.g. h1 goes from 2.65rem to 4.75rem and h2 from 2rem to 3rem.
   - **Other scales:** spacing, radius, shadows, and breakpoints 30/48/62/75/90em, which match Webflow's 479/767/991px.
   - **Fonts:** Poppins for display (headings, big nav links, prices) and Borna for text and UI (`theme.fontFamily`). h3 uses Borna. PT Serif is dropped.
2. **Semantic CSS variables: `src/styles/tokens.css`.** All use `--ds-*`:
   - Layout: gutter, section spacing, container widths.
   - Type details: tracking, eyebrow style.
   - Motion, and z-index layers.
   - Semantic color roles that point at Mantine variables (e.g. `--ds-color-accent: var(--mantine-color-brand-6)`), so every hex value exists in exactly one place.
   - `data-tone` scopes (light / subtle / dark / brand) that redefine the text, surface and border roles. Components automatically adapt to any section background, with no `text-color-*` utilities.
3. **Component defaults: `src/theme/components/`.**
   - `Component.extend()` with a CSS module per component.
   - Button variants are defined once: primary, translucent, white, outline, link.
   - The same approach covers Title (h3 font), Container sizes, Accordion, Tabs (pills), Carousel and inputs (pill fields).
   - Pages never re-style a Mantine component.
4. **Layout atoms: `src/components/ui/`.**
   - `<Section tone spacing container>` is the only way to build a section. It replaces `padding-global`, `padding-section-*`, `container-*` and `background-color-*`.
   - It also sets `data-nav-theme` for the navbar's dark/light swap.
5. **CSS Modules** sit next to each component and use only tokens and Mantine mixins (`@mixin smaller-than $mantine-breakpoint-sm`, `@mixin hover`, `rem()`).
6. **Global CSS order:**
   1. `@mantine/core/styles.layer.css`. Mantine sits in `@layer mantine`, so our styles win without specificity fights.
   2. `tokens.css`.
   3. `global.css` (tiny: font smoothing, `p` font, focus ring, reduced motion).

Stylelint (`color-no-hex` outside the token file) and the conventions in `CLAUDE.md` enforce all of this.

### Section types

Each type is a schema and a component together. Every Webflow block maps to one of them.

| Section | Replaces (Webflow) |
|---|---|
| `hero` (default / media / profile) | 9 page heroes, the home hero, the about video hero, the bio-links profile |
| `split` (text + media, reversible, optional checklist and CTA) | ~15 `_2-col_feature` uses, pricing two-column blocks, case-study blocks |
| `media` (full-width image or video, 1–3 up gallery) | work full-width images, desktop and mobile photo sets, home video band |
| `cards` (manual items or referenced docs; grid / carousel / marquee / list) | feature grid, 3-column cards, features slider, integrations marquee, work grid, testimonials, features list, bio quick links |
| `process` (sticky-numbered / scroll-progress) | home Strategy/Design/Growth, the 5-step Discovery→Delivery |
| `pricing` (plan refs; compact or full; compare table; custom card; billing toggle) | home pricing, the full pricing page |
| `faq` (optional CTA column) | CTA+FAQ on 5 pages, the bio-links FAQ |
| `callout` (statement / banner with media and checklist) | statement band, the subscription/video block on 5 pages |
| `tabs` (each tab holds split content and cards) | add-on tabs |
| `form`, `embed`, `richText`, `sectionReference` (→ `sharedSection`) | contact form, Calendly inline, prose, shared blocks |

In this pass, section components are typed stubs in the registry. The real implementations come in the build phase.

## Step 4: Assets and fonts

- **Fonts:** convert the 8 Borna TTFs to woff2 (`npx --yes ttf2woff2`) into `src/assets/fonts/borna/` and load them with `next/font/local`. Load Poppins with `next/font/google`, weights 300–800.
- **Images:** copy only the base files and skip the 58 `-p-*` responsive variants (next/image handles those). Rename to kebab-case and place them in:
  - `public/brand` for logos and the partner badge
  - `public/icons` for tech icons, checks and arrows
  - `public/decor` for circles, grids and the underline
  - `src/assets/images` for page imagery
- **Skipped (dead):** the drag-sign SVGs.
- **App icons:** favicon becomes `app/icon.png` and webclip becomes `app/apple-icon.png`.
- **Lottie:** goes to `src/assets/lottie/scroll-indicator.json`.
- **Videos:** only the `-transcode.mp4` files and their posters go to `public/videos/` (~6MB). The 29.5MB original and the webm files are skipped. Moving video to Sanity or Blob storage comes later.
- **CMS images** are not in the export. The build-phase import script will pull them from Webflow.

## Step 5: Sanity

- **Configuration:**
  - `sanity.config.ts`: structure tool with a custom structure (singletons, Pages, Shared Sections, each collection), Vision, and Presentation (locations resolved through `lib/routes.ts`).
  - `sanity.cli.ts`: API and typegen config. Generated types go to `src/sanity/types.ts`, which is committed.
- **Client:** `defineLive` with a viewer token. `<SanityLive />` handles revalidation, so no webhook is needed. Metadata and sitemap queries disable stega, and enum values go through `stegaClean`.
- **Draft mode:** a `defineEnableDraftMode` route, with `<VisualEditing />` shown only in draft mode.

**Schemas:**

| Group | Types |
|---|---|
| Singletons | `siteSettings` (contact, address/geo/hours for LocalBusiness JSON-LD, logos, client login URL, Calendly URLs, partner link, default SEO, home page ref) and `navigation` (menu, header CTA, footer columns, tagline) |
| Documents | `page`, `sharedSection`, `work`, `tag`, `websiteFeature`, `serviceArea`, `serviceAreaFeature`, `integration`, `pricingPlan`, `faq`, `testimonial`, `redirect` |
| Objects | `seo`, `link` (internal / external / Calendly / email / phone / anchor), `cta`, `richText`, `media`, `checklistItem`, `card`, `step`, `compareRow` |
| Sections | the section types above, exported as one `sectionTypes` list shared by `page`, `work`, `serviceArea` and `sharedSection` |

**CLI steps** (after `! npx sanity login`):
1. `npx sanity datasets list` to confirm `production`.
2. `npx sanity cors add http://localhost:3000 --credentials`, if it isn't already there.
3. `npx sanity tokens add … --role=viewer` → write the token into `.env.local`.

## Step 6: App shell and routing

- **Root layout:** MantineProvider (forced light), font variables, and the CSS import order from Step 3.
- **`(site)` layout:**
  - GTM through `@next/third-parties`, only when `VERCEL_ENV=production`
  - Vercel Analytics and SpeedInsights
  - SanityLive
  - VisualEditing in draft mode
  - skip link
- **Catch-all route:** fetches `page` by slug (`/` resolves through `siteSettings.homePage`) and renders `SectionRenderer`. Uses `generateStaticParams` and `generateMetadata` from `seo`.
- **Collection routes:** stubs with `generateStaticParams`, `generateMetadata` and `notFound()`.
- **`lib/routes.ts`:** the single map from document type to URL, used by links, the sitemap and Presentation.
- **Contact action:** `server/actions/contact.ts` checks the honeypot, validates with zod, and returns a `useActionState` result. Delivery is a TODO.
- **Deferred:** Navbar and Footer are stubs, and cookie consent is a build-phase decision.

## Step 7: Documentation

- **`CLAUDE.md`:** overview, stack, commands, structure, conventions, doc index and changelog. Kept current after every session.
- **`.claude/MEMORY.md`:** detailed per-session notes. Read only when troubleshooting or when asked.
- **`docs/webflow-migration.md`:**
  - the route map with SEO metadata
  - the component → section mapping and CMS → schema mapping
  - the contact form spec
  - third-party integrations
  - the interaction rebuild checklist
  - bugs and content errors not to reproduce

## Step 8: Verification, then merge

1. `npm run typegen`, `typecheck`, `lint`, `lint:css` and `build` all pass.
2. Smoke test with `npm run dev`:
   - `/studio` → 200 with every schema type
   - `/style-guide` → 200, for a visual check against Webflow
   - `/` → styled 404 until a home page exists
   - A test `page` created in Studio renders its section stubs, then gets deleted
3. Merge:
   ```
   git switch main
   git merge --no-ff dev
   git push
   git switch dev
   git merge main
   git push
   ```
4. Update the `CLAUDE.md` changelog and `.claude/MEMORY.md`.

**The user's part:** run `! npx sanity login` at Step 5. Later, connect Vercel with Production Branch = `main`, add the env vars, and add the Vercel domain to Sanity CORS.

## After this pass

Build order to plan next:
1. Atoms and theme polish, checked against `/style-guide`.
2. Navbar and Footer (menu overlay, dark/light swap, cursor).
3. Sections, in order of reuse: split, cards, faq, callout, hero, process, pricing, tabs.
4. Collection templates and the article layout (TOC, progress bar).
5. Contact form and Calendly.
6. JSON-LD and redirects.
7. The Webflow → Sanity import script.
8. Consent, then the Vercel launch.
