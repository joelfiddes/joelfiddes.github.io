# mountainfutures-site

Mountain Futures company website — Vite + React + TypeScript + Tailwind CSS, deployed to GitHub Pages.

## Quick reference

- **Repo**: https://github.com/joelfiddes/joelfiddes.github.io
- **Live**: https://joelfiddes.github.io
- **Dev**: `npm run dev` (Vite, port 5173)
- **Build**: `npm run build` (outputs to `dist/`, copies `index.html` → `404.html` for SPA routing)
- **Deploy**: `git push` to `main` (GitHub Pages serves from root)
- **Framer sync**: `npm run framer` pulls latest Framer components into `src/framer/`

## Architecture

- **Framer components** (`src/framer/`): Auto-generated via Unframer from Framer project `c005e0105870bbbc`. Do not edit unless necessary — changes may be overwritten by `npm run framer`. When edits are needed (e.g. nav-bar, footer), document what was changed.
- **Custom pages** (`src/pages/`): Hand-built React pages using Tailwind + inline styles matching Framer design tokens.
- **Shared components** (`src/components/`): `HeroSection`, `Label`, `Layout` (wraps nav + footer around routes).
- **Data** (`src/data/`): `projects.json`, `news.json`, `resources.json` — static JSON driving page content.
- **Routing**: React Router in `src/App.tsx`. `404.html` copy enables client-side routing on GitHub Pages.

## Design system

- **Fonts**: Inter (body), DM Mono (labels, mono UI), Geist (intro text)
- **Colors**: CSS custom properties `--unframer-*` defined in Framer styles. See `docs/color-palette.html` for visual reference.
  - Primary dark: `--unframer-forrest` (#122023)
  - Accent: `--unframer-mf-accent-blue` (#35E4E4), `--unframer-accent-blue` (#B9FFFF)
  - Background: #F5F5F5 (all page sections)
  - Navy buttons: `--unframer-mf-dark-blue` (#272E3F) with cyan text
- **Image hover**: `.resource-card-img` class for grayscale-to-color transition (defined in `src/index.css`)
- **Contour background**: `/images/contour-lines.svg` used on Expertise and News pages

## Key conventions

- **Nav bar** (`src/framer/nav-bar.jsx`): Manually edited to add Projects and News links. Desktop variant uses `matchVariant("Wvk3bmAvm")`, Phone uses `matchVariant("OBgEiGF37")`. Order: About → Expertise → Projects → News → Resources → Contact.
- **Footer** (`src/framer/global/footer.jsx`): Manually edited — WSL spinoff logo added, copyright year made dynamic.
- **Projects** have a `category` field: `"mf"` (Mountain Futures contracts) or `"track-record"` (team prior work). The page renders two sections.
- **Projects page** supports `?sector=` URL param for filtering from Expertise page links.
- Mountain Futures was founded in **2025**. Projects before that date are team track record, not MF contracts.

## Manual Framer edits (preserve on re-sync)

If `npm run framer` is run, these manual changes will be overwritten and need to be re-applied:
1. `nav-bar.jsx` — Projects + News nav items, reordered items
2. `global/footer.jsx` — WSL spinoff logo, dynamic copyright year
3. `map.jsx` — backgroundColor changed from blue to #F5F5F5
