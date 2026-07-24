# AKRADHI

A premium real-estate portal. Property listings with server-side filtering, a shortlist, an enquiry pipeline and an admin desk — built as a final-year web development project.

Runs with no database, no API keys and no configuration. `npm install && npm run dev` is the whole setup.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
```

Node 18.18 or newer. No `.env` file is needed to run.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com) choose **Add New → Project** and import it.
3. Leave every build setting on its default — Vercel detects Next.js.
4. Deploy.

Nothing else is required. The optional environment variables below are read from
Vercel's **Settings → Environment Variables** if you set them.

| Variable | What it does | Needed? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, sitemap and OG tags | Recommended in production |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Puts HTTP Basic auth in front of `/admin` | Recommended in production |
| `RESEND_API_KEY` / `ENQUIRY_TO_EMAIL` | Emails each enquiry to the desk | Optional |
| `MONGODB_URI` | Switches the data layer to a real database | Optional |

With `ADMIN_USER` and `ADMIN_PASSWORD` unset, `/admin` stays open so local
development is frictionless. **Set both before you put this on a public URL.**

---

## What is in it

### Pages

| Route | What it does |
| --- | --- |
| `/` | Hero with a WebGL massing model, register statistics, a pinned horizontal collection, city index, method, enquiry CTA |
| `/properties` | The register — filter rail, sorting, pagination, empty state |
| `/properties/[slug]` | Gallery, specification sheet, site diagram, repayment calculator, enquiry form, related listings |
| `/shortlist` | Kept properties, with layout animation on removal |
| `/admin` | Moderation table, enquiry board, register statistics |
| `/api/properties` | JSON search endpoint, same filter contract as the page |
| `/api/inquiries` | Validated, rate-limited enquiry intake |

### Filtering

Every filter lives in the URL, so any view is a shareable link:

```
/properties?city=Hyderabad&deal=sale&category=villa&bedrooms=3&max=150000000&facing=E
```

`lib/query.ts` holds the single `search()` function used by both the page and
the API, so the two can never disagree. Inputs are debounced by 260 ms before
the route is replaced, and `router.replace` is used rather than `push` so the
back button steps out of the register rather than back through every keystroke.

The same file exports `parseFilters` and `toSearchParams`, which are the only
two places URL state is read or written.

### Effects

- **WebGL crystal scene** (`components/three/`) — a refracting octahedron over a cluster of prisms on a polished floor, with bloom, chromatic aberration and a vignette. The camera dollies and rises as the hero scrolls away, and tracks the pointer.
- **Custom iridescence shader** (`components/three/IridescentMaterial.tsx`) — thin-film interference approximated with a Fresnel term pushed through a four-stop spectral ramp, drifting over time. This is the piece worth talking through in an interview: it is why the prisms shift colour with viewing angle instead of just being lit boxes.
- **Three-tier capability gate** — devices are graded before WebGL is committed. Eight cores and 8 GB get the full scene with postprocessing; four cores get the scene without it; anything less, any narrow viewport, no WebGL2, or reduced motion gets a static poster instead.
- **Cursor** — a drafting cross-hair with a lagging ring that reads `data-cursor` from whatever is under the pointer, so it names the action.
- **Tilt cards** — listing cards rotate on a 3D plane toward the pointer while the artwork counter-shifts, so the card reads as depth rather than a rotating rectangle.
- **Reveals** — headings split on words and rise from behind a mask; images clip and scale in; stats roll up on entry.
- **Pinned collection** — the featured row translates sideways while the section is pinned, and falls back to a vertical grid when motion is reduced.
- **Marquee** — the city ticker's speed responds to scroll velocity.
- **Preloader** — counts up, then lifts like a sheet off a drawing board. Once per tab.

Every one of these checks `prefers-reduced-motion` and disables itself.

---

## Design

The direction is an architect's drawing sheet rather than the usual glass-and-gold
luxury treatment.

| Token | Value | Used for |
| --- | --- | --- |
| Ink | `#0B0E12` | Page base, a blue-black rather than a neutral one |
| Paper | `#E8E3D9` | Primary text, drafting paper |
| Patina | `#55A68C` | Accent — oxidised copper, used only for annotations and state |
| Rust | `#C2724E` | Warnings and pending states |
| Line | `#232C37` | Hairlines and cell borders |

Typography pairs **Cormorant Garamond** at light weights and very large sizes
(display), **Sora** (interface) and **JetBrains Mono** (all measurements,
references and labels). Monospace on data is the point: dimensions, survey
numbers and coordinates should read as annotations.

Recurring devices, all defined in `app/globals.css`:

- three fixed radial light sources behind the page, in iris, gold and aqua
- `.glass` and `.glass-iri` — frosted panels, the second with a chromatic edge that brightens on hover
- buttons whose fill wipes up from the bottom in full spectrum
- a compass mark on every listing, because orientation genuinely matters here
- specification cells rather than paragraphs, wherever the content is data

### Sizing for desktop

Most visitors arrive on a large screen, so the layout scales with the viewport
rather than capping at a narrow column:

| Breakpoint | Base font | Shell width |
| --- | --- | --- |
| Mobile | 16 px | full width, 1.25 rem gutters |
| ≥ 1536 px | 17 px | up to 1840 px |
| ≥ 1920 px | 18 px | 7 rem gutters |

Listing grids run 1 → 2 → 3 → 4 columns, and the register's filter rail widens
from 320 px to 380 px at 2xl. Everything is still tested down to 360 px wide.

Fonts load from Google Fonts via a stylesheet link so the build needs no network.
To self-host them instead, move to `next/font/google` in `app/layout.tsx`.

---

## Listing artwork

There are no image files. Each listing's artwork is an architectural elevation
generated at render time by `components/ui/Plate.tsx` from the `sheet` number on
the listing — same seed, same skyline, every time.

That means no image requests, no layout shift, and artwork that stays sharp
whether it is a 96 px thumbnail or a full-bleed gallery frame.

To use photographs instead, replace `<Plate seed={p.sheet} />` with `next/image`
in these five places: `PropertyCard`, `Gallery`, `Collection`, `Cities` and the
`Crystal` poster fallback. Remote hostnames go in `images.remotePatterns` in
`next.config.mjs` — `images.unsplash.com` and `res.cloudinary.com` are already
allowed.

---

## Moving to a database

The site reads from `lib/data.ts` — 24 listings, typed as `Property`. That is
deliberate: it means the project runs on any machine without setup.

When you want persistence:

1. `npm install mongoose`
2. Set `MONGODB_URI` in `.env.local`
3. Define a `Property` model matching `lib/types.ts`
4. Use `toMongoQuery()` and `toMongoSort()` from `lib/db.ts` — they translate the
   same `Filters` object the UI produces into a Mongo query document
5. In `app/properties/[slug]/page.tsx`, set `dynamicParams = true` so listings
   added after the build are still reachable

`lib/db.ts` also lists the indexes worth creating. The filter contract does not
change, so nothing in the UI needs touching.

To regenerate the seed catalogue: `python3 tools/make_data.py`.

---

## Structure

```
app/
  layout.tsx            fonts, metadata, providers, chrome
  page.tsx              home
  properties/           register + detail
  shortlist/            kept properties
  admin/                the desk
  api/                  properties search, enquiry intake
  globals.css           tokens, drafting motifs, controls
components/
  chrome/               nav, footer, cursor, preloader, smooth scroll, sheet frame
  motion/               Reveal, RevealText, Magnetic, Parallax, Marquee, Counter
  three/                WebGL massing model + capability gate
  sections/             home page sections
  ui/                   cards, filters, gallery, forms, admin
lib/
  types.ts              the domain
  data.ts               seed catalogue
  query.ts              filtering, sorting, pagination — used by page and API
  format.ts             ₹ Cr/L formatting, area, orientation, EMI
  favourites.tsx        shortlist state, persisted to localStorage
  db.ts                 optional Mongo adapter
middleware.ts           Basic auth on /admin when configured
tools/                  artwork and seed generators
```

---

## Accessibility and performance

- Skip link, semantic landmarks, visible focus rings on every interactive element
- Split text reveals carry `aria-label`; the animated spans are hidden from screen readers
- Compass marks and diagrams have text equivalents
- Full `prefers-reduced-motion` path: no cursor, no parallax, no WebGL, no pinned scroll
- 101 kB shared JS; the heaviest route is 173 kB first load, with three.js excluded from the initial bundle
- 21 listing pages prerendered at build; unknown or unpublished slugs return a real 404
- `sitemap.xml`, `robots.txt` and JSON-LD `Residence` markup on every listing

---

## Notes

Listings, agents and enquiries are illustrative. Prices are formatted in crores
and lakhs because that is how property is quoted in India — see
`lib/format.ts → price()`.
