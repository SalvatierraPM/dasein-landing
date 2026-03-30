# Dasein Foresight — Landing Page

## What this is

Landing page for Dasein Foresight, a strategic foresight consulting firm. Early stage — seeking pilots, alliances, team, and case studies. NOT a SaaS product page.

## Brand

Read `references/dasein-brandbook.md` for the full brand system. Quick reference:
- Colors: Deep Navy #0A1628, Signal Blue #4865FF, Signal Red #FF5C38, Horizon Violet #7a68d6, Foresight Teal #2f9e90, Slate White #ede7dc
- Fonts: Satoshi 900/700/500 (display/sections/subtitles), Space Grotesk (body), Azeret Mono (data/overlines/symbols), Instrument Serif (editorial quotes only)
- Symbols: → (kickers/CTAs), ◆ (marquee sep), ※ (list bullets), ◈ (output labels), / (pill prefix), ◇ (meta sep), ▸ (terminal prefix)
- Tone: Confident consulting, not startup hype. McKinsey meets Stripe.
- See `brand-kit.html` for interactive reference

## Design Reference

Target aesthetic: **worldquantfoundry.com** — massive type, surgical whitespace, subtle 3D particles as atmospheric texture, 1px border grids, editorial gravity.

Read `references/design-inspiration.md` for curated sources.

## Available Resources

### MCP Servers
- **@21st-dev/magic** — Search 1400+ real components before building from scratch
- **playwright** — Screenshot for visual verification
- **context7** — Library docs (Three.js, GSAP, Astro)

### Reference Code (in `references/code/`)
- `entangled-*.js` — WebGL2 particle systems with spring physics, curl noise, shaders, multi-window sync
- `GPUComputationRenderer.js` — GPU-accelerated particle computation (Three.js)
- `computeShaders.js`, `glslNoise.js`, `glslUtils.js` — GLSL shader utilities
- `materials.js`, `entangled-materials.js` — Three.js custom materials
- `multiwindow-threejs.js`, `WindowManager.js` — Cross-window 3D state sync
- `moltbook-*.js` — Chart.js data visualizations (network analysis, Lorenz curves)

### Skills (in `.claude/skills/`)
- `ui-ux-pro-max` — 50+ styles, 161 palettes, 57 font pairings
- `frontend-design` — Production-grade UI patterns
- `web-designer` — Scrollytelling, GSAP, Three.js patterns
- `design-system` — Token architecture
- All 10 design skills loaded

### Commercial Assets (in `docs/assets/`)
- `one-pager.html` — Institutional one-pager (A4 printable, dark screen / light print)
- `deck-comercial.html` — 9-slide commercial deck (keyboard nav, fullscreen)
- `proposal-template.html` — Proposal template with `[PLACEHOLDER]` fields
- `nda-template.html` — NDA template (Chilean/LATAM commercial law)
- `sow-template.html` — Statement of Work template (14 clauses)

All are self-contained HTML — open in browser for dark preview, print/export for PDF.

### Operational Structure (in `docs/ops/`)
```
docs/ops/
├── 00-master/    # Master Offer + ICPs (source of truth)
├── 01-sales/     # Pipeline definition, Lead Tracker spec
├── 02-discovery/ # Discovery Call Template, Lead Qualification Score
├── 03-proposals/ # Pointers to HTML assets in docs/assets/
├── 04-legal/     # NDA, SOW, MSA, Invoice & Payment Policy
├── 05-delivery/  # Onboarding, Kickoff, Weekly Update, Final Delivery
└── 06-cases/     # Case Study Template
```

### Commercial Architecture (FROZEN)
Three services, three depth levels:
| Service | Position | Investment |
|---------|----------|------------|
| **Lectura de Campo** | Entry door | From USD 2,500 / 5 days |
| **Simulación Estratégica** | Core (most popular) | From USD 12,000 / 4-5 weeks |
| **Radar Estratégico** | Continuous monitoring | From USD 5,000/month / min 6 months |

### Rules
- `.claude/rules/design-quality.md` — Anti-vibecode policy with banned patterns and required qualities

## Tech Stack

- Astro 6 (static, maximum performance)
- Three.js (particle backgrounds ONLY — atmospheric texture, not centerpiece)
- GSAP + ScrollTrigger (scroll animations)
- Pure CSS (no Tailwind — use custom properties from tokens.css)

## Design Rules (NON-NEGOTIABLE)

1. Dark mode only. Deep Navy #0A1628 base.
2. Typography IS the design. Headlines 5-7rem, Satoshi 900, -0.055em tracking. Body in Space Grotesk.
3. Whitespace is aggressive. 10-14rem between sections.
4. 1px borders, surface backgrounds. No shadows. No border-radius > 6px.
5. Single accent: Signal Blue. No gradients on buttons.
6. Metrics in Azeret Mono at 3rem+.
7. Zero stock images, illustrations, or decorative icons. Use typographic symbols (→ ◆ ※ ◈ ◇ ▸) as primary iconography.
8. Particles are TEXTURE behind the hero — tube geometry with wave animation, NOT a globe.
9. Film grain overlay at 3% opacity.
10. prefers-reduced-motion: skip all animation and particles.

## Commands

```bash
npm run dev      # astro dev on :4321
npm run build    # production build
```
