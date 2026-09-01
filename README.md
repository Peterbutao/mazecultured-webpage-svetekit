# MAZE.CULTRD — Cultural Labyrinth

**MW // SUBCULTURES — An independent digital archive of Malawian youth subcultures.**

MAZE.CULTRD is a living chronicle, not a blog feed. It maps the unseen intersections of street fashion, underground soundscapes, DAPP thrifting, and automotive culture across Blantyre, Lilongwe, Mzuzu, and Zomba — documented at ground level.

> Navigate through connected corridors. Every scroll turns a corner.

---

## What it's for

**MAZE.CULTRD exists to archive what mainstream coverage misses.** Malawian youth culture isn't centralized — it lives in markets, warehouse shows, car parks, and WhatsApp groups. The site preserves it as a non-linear, spatial archive:

- **Preservation:** Photographic series and long-form dispatches that treat a football jersey, a Golf GTI, or a Chichewa trap verse as cultural objects — not trends.
- **Context:** Culture before commerce. ABALE merch didn't create the community; the community created the merch. JEZE jerseys aren't worn for club loyalty but for street aesthetic.
- **Connection:** Urban nodes (BT // LL // MZ // ZB) linked through shared language, style, and sound rather than geography.
- **Access:** A maze, not a feed. The site is built as a 2D labyrinth (`200vw × 500vh`) where scrolling *is* navigation — you pan through corridors instead of paging down a timeline.

Intended for photographers, writers, stylists, and enthusiasts to see their scenes reflected, and for outsiders to navigate Malawi's youth movements without flattening them.

---

## The Maze — How it works

The homepage is a **Labyrinth of 5 corridors + exit:**

| Corridor | Sector | Focus |
|----------|--------|-------|
| **01 — ENTRY** | Cultural Labyrinth | Orientation. Blantyre → Lilongwe scope. `PROJECTS` / `ARTICLES` entry points |
| **01.5 — ARCHIVE MISSION** | Unseen Subcultures | Manifesto + stats (Non-linear grid, Ground-level curation) |
| **02 — SOUND & IDENTITY** | ABALE: The Movement | Music created the language; language created the identity |
| **03 — FOOTBALL × STREETWEAR** | JEZE: Dapp Fit | European cast-offs re-contextualized via DAPP thrifting |
| **04 — CAR CULTURE** | The Golf Series | VW Golf as cultural object — could it be Malawi's E30? |
| **05 — EXIT & FULL ARCHIVE** | Maze.CultRD | Ticker, sectors, submissions, labyrinth map |

Scroll interpolates `translate3d` across the grid; turn buttons (`SCROLL DOWN`, `TURN RIGHT`) jump between stages. On `prefers-reduced-motion` the maze collapses to a standard vertical flow.

---

## Content

### Projects — `/projects`
Ongoing photographic investigations. Currently:

- **JEZE // DAPP FIT (`/projects/jeze`)** — Football and fashion as shared expression. DAPP-sourced 90s jerseys, styled ground-level: heavy boots, denim, second-hand grails. Beyond the pitch, celebrating people and style. Gallery: `DSC_9179`, `JEZE 3_1/3_12`, `KUMBALI LIVE`.

Future corridor: *Blantyre Drift Culture* (in production).

### Articles — `/articles`
Long-form dispatches, two corridors:

- **ABALE: The Movement (`/articles/abale`)** — From Crispy's 2017 *Ngati Chitsiru* ("coolest kid in Malawi") through the quiet years, the Audiomack return, and the formation of Abale via Run North, Mario Bros., Brainlock Fam & K Smollet. How Malawian trap stopped imitating the Migos era and found a Chichewa voice in the ghetto/high-school middle ground.
- **Could the Golf Series be to Malawi what the E30 is to South Africa? (`/articles/golf-series`)** — The Golf GTI's rise — solid colours, wraps, BBS rims, "vrrrmm — pha!" exhausts — and the communities forming around GTI, Land Cruiser, NP200, and Ranger builds. Shows in Blantyre/Lilongwe, shops (Primetime, Fastlane), F1 WhatsApp groups, and go-karting.

---

## Design Language

Brutalist archive: `2px solid #000`, `4px 4px 0px #000` shadows, hazard stripes, tape corners, stickers (`SECTOR 01`, `ABALE // 49`). Type: `Anton` (head) + `Space Grotesk` + `Syne`.

- **Light:** `#EAEAE4` / `#FFFFFF` — black grid (dots `24px` + vertical `40px` + horizontal `40px` at `rgba(0,0,0,0.06)`)
- **Dark:** `#050505` / `#121212` — white grid `rgba(255,255,255,0.08)` (both vertical and horizontal lines invert)
- **Accents:** `Neon Yellow #D7F000`, `Spray Red #FF2A00`, `Cyan #00B4D8`
- Theme toggle is SVG (sun/moon) — no emojis — persisting in `localStorage`.

Carousel focus scale (`scale 0.86 → 1`, `grayscale 80% → 0%`) and ticker marquee reinforce the editorial, zine-like feel.

---

## For Contributors

MAZE.CULTRD is open to submissions — photography, articles, and zines documenting Malawian subcultures. The footer *SUBMISSIONS* panel invites underground editorial contributions. There is no single way to be an enthusiast; the archive grows corridor by corridor.

© 2026 MAZE.CULTRD // MALAWIAN SUBCULTURES & STREET ARCHIVE — Blantyre // Lilongwe // Mzuzu // Zomba
