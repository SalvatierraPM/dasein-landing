# Dasein Foresight — Landing Page

Landing page for **Dasein Foresight**, a strategic foresight consulting firm that combines signal reading, system modeling, and AI-driven simulation to help organizations make better decisions under uncertainty.

**Live site:** Deployed on Vercel

## Tech Stack

- **Astro 6** — Static site generation, maximum performance
- **Three.js** — Particle system backgrounds (atmospheric texture)
- **GSAP + ScrollTrigger** — Scroll-driven animations (cube rotation, reveals)
- **Pure CSS** — Custom properties design system, no Tailwind

## Project Structure

```
src/
├── components/
│   ├── Hero.astro              # Hero with animated title + scroll-driven lexicon
│   ├── AudienceLanes.astro     # Who we're looking for (expandable lanes)
│   ├── Timeline.astro          # 6-step method with rotating 3D cube
│   ├── FounderSection.astro    # Origin story + proof cells
│   ├── SignalTwinSection.astro # Simulation engine layers
│   ├── DeliverablesSection.astro # What you get
│   ├── AllianceSection.astro   # Handoff model (Dasein → Partner → Client)
│   ├── Contact.astro           # CTA section
│   ├── ParticleScene.astro     # Three.js particle background
│   ├── ParticleNetwork.astro   # Canvas particle network
│   └── DecorativeAccents.astro # Gradient orbs + glass spheres
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
└── styles/
    └── tokens.css              # Full design token system
public/
├── 3d/                         # Clay 3D objects (atmospheric accents)
├── fonts/
└── video/
```

## Design System

| Token | Value |
|-------|-------|
| Paper | `#f5efe5` |
| Ink | `#111111` |
| Signal Red | `#ff5c38` |
| Signal Blue | `#4865ff` |
| Display font | Switzer |
| Mono font | Azeret Mono |
| Editorial font | Instrument Serif |

Dark sections use navy `#0f1a2e` with particle backgrounds, scanlines, and noise overlays.

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build |

**Requires Node >= 22.12** (Node 22 LTS recommended).

## Brand

Dasein Foresight is not a SaaS product — it's a consulting firm in early stage, seeking pilots, alliances, team members, and case studies. Tone is confident consulting (McKinsey meets Stripe), not startup hype.
