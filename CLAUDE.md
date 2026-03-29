# Dasein Foresight — Landing Page

## What this is

Landing page for Dasein Foresight, a strategic foresight consulting firm. Early stage — seeking pilots, alliances, team, and case studies. NOT a SaaS product page.

## Brand

Read `references/dasein-brandbook.md` for the full brand system. Quick reference:
- Colors: Deep Navy #0A1628, Signal Blue #3B82F6, Horizon Violet #7C3AED, Foresight Teal #14B8A6, Slate White #E8ECF1
- Fonts: Satoshi (headers), JetBrains Mono (data), Instrument Serif (editorial quotes)
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

### Rules
- `.claude/rules/design-quality.md` — Anti-vibecode policy with banned patterns and required qualities

## Tech Stack

- Astro 6 (static, maximum performance)
- Three.js (particle backgrounds ONLY — atmospheric texture, not centerpiece)
- GSAP + ScrollTrigger (scroll animations)
- Pure CSS (no Tailwind — use custom properties from tokens.css)

## Design Rules (NON-NEGOTIABLE)

1. Dark mode only. Deep Navy #0A1628 base.
2. Typography IS the design. Headlines 5-7rem, Satoshi, -0.035em tracking.
3. Whitespace is aggressive. 10-14rem between sections.
4. 1px borders, surface backgrounds. No shadows. No border-radius > 6px.
5. Single accent: Signal Blue. No gradients on buttons.
6. Metrics in JetBrains Mono at 3rem+.
7. Zero stock images, illustrations, or decorative icons.
8. Particles are TEXTURE behind the hero — tube geometry with wave animation, NOT a globe.
9. Film grain overlay at 3% opacity.
10. prefers-reduced-motion: skip all animation and particles.

## Commands

```bash
npm run dev      # astro dev on :4321
npm run build    # production build
```
