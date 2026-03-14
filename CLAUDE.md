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

## Color palette

All colors are defined as CSS custom properties (`--unframer-*`). Visual reference: `docs/color-palette.html`.

### Dark tones
| Name | Variable | Hex |
|------|----------|-----|
| Black | `--unframer-black` | `#000000` |
| Forrest | `--unframer-forrest` | `#122023` |
| Evergreen | `--unframer-evergreen` | `#1A2C30` |
| MF Dark Blue | `--unframer-mf-dark-blue` | `#272E3F` |

### Neutrals
| Name | Variable | Hex |
|------|----------|-----|
| White | `--unframer-white` | `#FFFFFF` |
| Neutral 100 | `--unframer-neutral-100` | `#F5F5F5` |
| Grey | `--unframer-grey` | `#E9E9E9` |
| MF Light Grey | `--unframer-mf-light-grey` | `#E6EEF6` |
| Neutral 200 | `--unframer-neutral-200` | `#E4E4E4` |
| Neutral 300 | `--unframer-neutral-300` | `#C9C9C9` |
| Neutral 400 | `--unframer-neutral-400` | `#858585` |

### Accents — Cyan/Teal
| Name | Variable | Hex |
|------|----------|-----|
| MF Accent Blue | `--unframer-mf-accent-blue` | `#35E4E4` |
| Accent Blue | `--unframer-accent-blue` | `#B9FFFF` |

### Accents — Green
| Name | Variable | Hex |
|------|----------|-----|
| Lime | `--unframer-lime` | `#D5F0A3` |
| Light Green | `--unframer-light-green` | `#E1FCAD` |

### Usage patterns
- **Page background**: `#F5F5F5` on all sections
- **Body text**: `--unframer-forrest`
- **Labels**: DM Mono in `--unframer-forrest`
- **Tags (dark)**: `--unframer-light-green` text on `--unframer-forrest` bg
- **Tags (light)**: `--unframer-forrest` text on `--unframer-accent-blue` bg
- **Buttons (navy)**: `--unframer-mf-dark-blue` bg with `--unframer-mf-accent-blue` text
- **Links**: `--unframer-mf-accent-blue` or `--unframer-mf-cyan`
- **Borders/dividers**: `--unframer-neutral-300`

## Design system

- **Fonts**: Inter (body), DM Mono (labels, mono UI), Geist (intro text)
- **Image hover**: `.resource-card-img` class for grayscale-to-color transition (defined in `src/index.css`)
- **Contour background**: `/images/contour-lines.svg` used on Expertise and News pages

## Assets (`public/images/`)

### Hero images
- `hero.png` — Home page hero
- `about-hero.jpg` — About page hero
- `expertise-hero.jpg` — Expertise page hero
- `careers-hero.webp` — Careers page hero
- `contact-hero.jpg` — Contact page hero

### Service/expertise cards
- `energy-water.png` — Energy & Water
- `hazards-risk.png` — Hazards & Risk
- `adaptation.png` — Adaptation Solutions
- `policy.png` — Policy Engagement

### Team
- `joel.png` — Joel Fiddes portrait
- `simon.png` — Simon Allen portrait

### Backgrounds & textures
- `contour-lines.svg` — Topo contour pattern (default opacity)
- `contour-lines-20.svg` — Contour lines at 20% opacity
- `contour-lines-30.svg` — Contour lines at 30% opacity
- `about-team-bg.jpg` — Linear DEM-style contour background
- `expertise-bg.jpg` — Classic topo map contour background
- `resources-bg.jpg` — Resources page background
- `projects-bg.jpg` — Projects page background

### Logos & branding
- `wsl-spinoff.png` — WSL Spin-off label (transparent bg, used in footer)
- MF logo files are in `/Users/joel/mountainfutures/identity/MF_logo_artworks/`

### Icons
- `apps-icon.png` — Apps resource icon
- `media-icon.png` — Media resource icon
- `pubs-icon.png` — Publications resource icon

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
