# Dasein Foresight — Brand & Product Brief
> This is the single source of truth for anyone building anything for Dasein.
> Compiled from: brandbook, capa maestra, branding agent audits, product advisor.

---

## 1. Identity

**Name**: Dasein Foresight
- Allowed: "Dasein" (informal), "Dasein Foresight" (formal)
- PROHIBITED: "DaseinAI", "Dasein AI Foresight", "DASEIN", "DF"

**Origin**: Heidegger's "Dasein" = being-in-the-world. Foresight is not abstract — it's reading the world from where you stand.

**Tagline**: "Simulamos futuros para que decidas mejor hoy"
**Promise**: "Ayudamos a tomar decisiones importantes antes de que la realidad las vuelva obvias."

---

## 2. What We Are / What We're NOT

### We sell:
- Strategic clarity before high-stakes decisions
- Scenario exploration with real stakeholder dynamics
- Signal scanning (regulatory, tech, market, social)
- Actionable executive memos with roadmaps

### We DON'T sell:
- Software licenses or SaaS subscriptions
- Magic predictions
- Empty dashboards
- Cosmetic strategy decks without criteria
- Generic digital transformation
- Implementation — that's for our partners

### Internal engine (not the product):
SignalTwin — dual-world simulation. Creates agents with real stakeholder positions, runs them in two parallel worlds (fast-reaction public + deliberative institutional). Agents have persistent memory, cross-world signals, linguistic pressure modeling. This is the moat.

---

## 3. Stage & What We're Seeking

Early stage. Tech works. Two demo cases (banking, lithium/geopolitics).

**Seeking**:
- Pilot clients (complex strategic decisions)
- Alliances (change management, AI consultancies, digital transformation, think tanks)
- Team (foresight, AI, computational social science, product design)
- Researchers (academics wanting platform access)

**Alliance model**: "Where our work ends, yours begins." We deliver the strategic map → partner implements the transformation. Referral model.

---

## 4. Visual Identity

### Colors (oklch — MANDATORY, no hex hardcoding)

| Name | oklch | Hex | Use |
|------|-------|-----|-----|
| Deep Navy | oklch(15% 0.04 260) | #0A1628 | Primary bg, hero, header, footer |
| Surface Dark | oklch(18% 0.03 260) | #111D2E | Cards, panels over navy |
| Slate White | oklch(94% 0.01 260) | #ede7dc | Primary text on dark |
| Muted Text | oklch(66% 0.04 250) | #8899AA | Secondary text, captions |
| Signal Blue | oklch(63% 0.19 260) | #4865ff | CTAs, links, data, interactive |
| Horizon Violet | oklch(50% 0.24 290) | #7a68d6 | Simulation, scenarios, future |
| Foresight Teal | oklch(70% 0.14 180) | #2f9e90 | Success, opportunity |
| Danger | oklch(63% 0.22 25) | #EF4444 | Alerts, errors, risks |

### Color ratios
- 60% Deep Navy + Surface Dark (bg, structure)
- 30% Slate White + Muted (text, content)
- 10% Signal Blue + Violet (accents, CTAs)

### PROHIBITED color combinations
- Signal Blue on Horizon Violet (contrast insufficient)
- Muted Text on Surface Dark (fails WCAG AA)
- Foresight Teal as primary text color
- Gradients over text without contrast overlay
- Any color not in this table without formal approval

### Gradients
- Hero: `linear-gradient(135deg, #0A1628, #1A2744, #111D2E)`
- Accent: `linear-gradient(135deg, #4865ff, #7a68d6)` — use sparingly
- Card hover: `linear-gradient(180deg, rgba(59,130,246,0.08), rgba(124,58,237,0.04))`

---

## 5. Typography

**RESOLVED** (updated 2026-03-29): Satoshi display + Space Grotesk body + Azeret Mono.

| Role | Font | Weight | When |
|------|------|--------|------|
| Display headlines | Satoshi | 900 | Hero, main titles |
| Section headers | Satoshi | 700 | H2, service names |
| Subtitles/lanes | Satoshi | 500 | H4, nav labels, lane titles |
| Body text | Space Grotesk | 400 | Paragraphs, descriptions, UI |
| Monospace/Data | Azeret Mono | 400-500 | Metrics, overlines, terminal prefixes |
| Editorial | Instrument Serif italic | 400 | ONLY for executive memo titles and blockquotes |

### Symbol system
| Symbol | Use | Meaning |
|--------|-----|---------|
| → | Kickers, CTAs | Direction |
| ◆ | Marquee separator | Node, signal |
| ※ | List bullets | Reference |
| ◈ | Output labels | Result, data |
| / | Pill/tag prefix | Category |
| ◇ | Inline metadata separator | Light metadata |
| ▸ | Terminal/typewriter prefix | Process, system |

### Atmospheric symbol patterns
- Symbol field: scattered symbols as bg texture (opacity 3-5%) — hero, section openers
- Ghost watermark: giant symbol (5-9rem) behind card content — method steps
- Corner accents: small symbols in panel corners (opacity 12%) — deliverable cards
- Symbol divider: line with centered symbols (`◇ → ◆ → ◇`) — section separators
- Symbol marquee: symbols as rhythm between ticker items
- HUD data cells: symbol as metric icon in dashboard layouts

Rules: always `aria-hidden="true"`, max 2 atmospheric patterns per section, no render on `prefers-reduced-motion`

### Type scale (fluid, clamp)
- Display: clamp(3rem, 1rem + 7vw, 6rem)
- H1: clamp(2.25rem, 1.5rem + 3vw, 3.75rem)
- H2: clamp(1.75rem, 1.25rem + 2vw, 2.5rem)
- H3: clamp(1.25rem, 1rem + 1vw, 1.75rem)
- Body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)

### Letter spacing
- Display: -0.03em
- Headings: -0.02em
- Overline: 0.12em (uppercase)
- Mono: -0.02em

---

## 6. Voice & Tone

### Principles
1. **Clarity over sophistication** — We simplify, never complicate
2. **Confidence without arrogance** — Direct statements, no hedge words
3. **Concrete future, not sci-fi** — Data, probabilities, real timelines
4. **Always actionable** — Every message says what to do next

### Vocabulary

| USE | DON'T USE | Why |
|-----|-----------|-----|
| Prospectiva estrategica | Futurologia | Sounds like fortune-telling |
| Simulacion de escenarios | Prediccion | We don't predict |
| Senales debiles | Tendencias disruptivas | "Disruptivo" is worn out |
| Inteligencia artificial | IA magica / IA avanzada | No empty superlatives |
| Decision informada | Decision optima | We don't promise optimality |
| Escenario alternativo | Escenario ideal / peor caso | No value judgments on scenarios |
| Explorar futuros | Predecir el futuro | We explore, not predict |
| Complejidad | Caos / incertidumbre total | Complexity is manageable, chaos is not |
| Rigor metodologico | Metodologia revolucionaria | No superlatives |

### CTA Language
- DO: "Agenda una conversacion"
- DON'T: "Contactanos" / "Solicita informacion"
- DO: "Explora tus escenarios"
- DON'T: "Descubre el futuro"
- DO: "El futuro no espera. Hablemos."
- DON'T: "No te quedes atras"
- Overlines: "METODOLOGIA" not "COMO FUNCIONA NUESTRA MAGIA"

---

## 7. Imagery Rules

### Allowed
- Abstract data visualizations (node networks, data topographies)
- Generative geometry (procedural patterns suggesting complexity)
- Horizons and depth (compositions evoking "looking forward")
- Schematic diagrams (flows, layers, methodology models)

### PROHIBITED
- Stock photos of people in offices
- Robots, digital brains, "AI generic" imagery
- Futuristic city renders or sci-fi scenes
- Clip art, hyperrealistic 3D icons, cartoon elements
- Any stock photography whatsoever

### Icons
- Style: Line icons, 1.5px weight (mobile), 2px (desktop)
- Set: Lucide Icons
- Color: Signal Blue on dark, Deep Navy on light

---

## 8. Spacing & Layout

- Base unit: 4px
- Section spacing: clamp(4rem, 3rem + 5vw, 10rem)
- Card padding: 32-48px
- Content max-width: 72rem (1152px)
- Text max-width: 42rem (672px) for readable paragraphs
- Grid: 12 columns
- Rule: "When in doubt, more space. Never less."

---

## 9. Animation Rules

### Only animate:
- `transform` (translate, scale, rotate)
- `opacity`
- `clip-path`
- `filter` (sparingly)

### NEVER animate:
`width`, `height`, `top`, `left`, `margin`, `padding`, `border`, `font-size`

### Easings:
- ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
- ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)

### Durations:
- Fast: 150ms (hover)
- Normal: 300ms (transitions)
- Slow: 600ms (reveals)
- Max: 800ms

### Reduced motion:
`prefers-reduced-motion: reduce` → all animations resolve instantly, particles don't render.

---

## 10. Branding Agent Decisions (DAS-8, DAS-17, DAS-23, DAS-39, DAS-44, DAS-46)

### Resolved decisions:
- Typography: **Satoshi (display) + Space Grotesk (body) + Azeret Mono (data)**. Satoshi 900 for impact, Space Grotesk for readability, Azeret Mono for technical personality. Brandbook updated 2026-03-29.
- `--color-success` must equal `--color-foresight-teal` (no separate green)
- `--color-warning` (#F59E0B) accepted as functional color
- Pink (#EC4899) NOT approved — use existing palette
- UI language: Spanish for LATAM market. English version needed for global.
- Instrument Serif: ONLY for editorial titles in executive memos
- Signal Blue = open_signal world / Horizon Violet = community_signal world
- Glassmorphism: only in nav, modals, cards over hero — not everywhere

### Commercial assets (in `docs/assets/`):
- `one-pager.html` — Institutional one-pager (screen + print)
- `deck-comercial.html` — 9-slide deck with keyboard navigation
- `proposal-template.html` — Proposal template with `[PLACEHOLDER]` fields
- `nda-template.html` — NDA (Chilean/LATAM commercial law)
- `sow-template.html` — Statement of Work (14 clauses)

### Commercial architecture (FROZEN):
| Service | Investment |
|---------|------------|
| **Lectura de Campo** | From USD 2,500 / 5 days |
| **Simulación Táctica** | From USD 12,000 / 4-5 weeks |
| **Radar Estratégico** | From USD 5,000/month / min 6 months |

### Standing brand rules:
- Every piece must be reviewable against the brandbook
- No color outside the palette without formal approval
- Typography hierarchy must be consistent across all touchpoints
- The brand personality is: "The strategic analyst who sees what others don't"
