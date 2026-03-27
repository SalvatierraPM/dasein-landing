---
name: web-designer
description: Next-generation web design specialist — scrollytelling, GSAP/ScrollTrigger, Framer Motion, Lenis, Three.js, advanced UX/UI patterns, and immersive visual experiences. Use when building landing pages, portfolio sites, editorial experiences, or any project requiring high visual impact.
origin: custom
---

# Web Designer — Next-Gen Immersive Web

Create stunning, high-impact web experiences with scroll-driven storytelling, cinematic animations, and modern UX/UI patterns.

## When to Activate

- Building landing pages, portfolio sites, agency sites, editorial pages
- Implementing scrollytelling or scroll-driven narratives
- Adding GSAP/ScrollTrigger animations, parallax, reveal effects
- Creating immersive 3D experiences with Three.js/R3F
- Designing bento grids, glassmorphism, aurora backgrounds, gradient meshes
- Optimizing UX: micro-interactions, loading states, transitions
- Converting a design (Figma, screenshot, wireframe) into a production page

## Non-Negotiables

1. **Performance first**: every animation must run at 60fps. Use `will-change`, `transform`, `opacity` only. Never animate `width`, `height`, `top`, `left`.
2. **Mobile-first responsive**: design for 320px up, enhance for larger screens.
3. **Accessibility**: all interactive elements keyboard-navigable, respect `prefers-reduced-motion`, semantic HTML, ARIA labels on decorative interactive elements.
4. **Progressive enhancement**: the page must be readable with JS disabled. Animations are enhancement, not requirement.
5. **Lighthouse 90+**: target Performance, Accessibility, Best Practices, SEO all above 90.

## Tech Stack Preferences

### Framework (choose based on project)
| Framework | When to Use |
|-----------|------------|
| **Next.js 14+ (App Router)** | Full apps, SSR/SSG needed, React ecosystem |
| **Astro 4+** | Content-heavy sites, maximum performance, multi-framework |
| **Nuxt 3** | Vue ecosystem projects |
| **Plain HTML/CSS/JS** | Single-page microsites, maximum simplicity |

### Animation Stack (layer them as needed)
| Library | Purpose | Import Size |
|---------|---------|-------------|
| **GSAP + ScrollTrigger** | Scroll-driven animations, timelines, complex sequences | ~30kb |
| **Framer Motion / Motion** | React declarative animations, layout transitions, gestures | ~25kb |
| **Lenis** | Smooth scrolling, scroll velocity, inertia | ~5kb |
| **Three.js / React Three Fiber** | 3D scenes, particle systems, shaders | ~150kb (tree-shake) |
| **CSS animations** | Simple transitions, hover states, loading spinners | 0kb |
| **View Transitions API** | Page transitions (Astro/MPA) | 0kb (native) |

### Styling
- **Tailwind CSS 4** as primary utility framework
- CSS custom properties for theming and dynamic values
- `clamp()` for fluid typography: `font-size: clamp(1rem, 0.5rem + 2vw, 2.5rem)`
- Container queries for truly responsive components

### Component Library: 21st.dev (PREFER OVER WRITING FROM SCRATCH)
- **1,400+ production-ready React components** at https://21st.dev
- Built on **shadcn/ui + Tailwind CSS** — fully customizable
- Access via **Magic MCP server** (`@21st-dev/magic`) or browse the catalog

#### 21st.dev Component Catalog
| Category | Count | Use For |
|----------|-------|---------|
| **Heroes** | 73 | Landing page hero sections |
| **Buttons** | 130 | CTAs, actions, toggles |
| **Cards** | 79 | Feature cards, testimonials, pricing |
| **Inputs** | 102 | Forms, search bars |
| **Features** | 36 | Feature showcases, bento grids |
| **CTAs** | 34 | Call-to-action sections |
| **Testimonials** | 30+ | Social proof sections |
| **Pricing** | 20+ | Pricing tables and cards |
| **Modals** | 37 | Dialogs, popups |
| **Tabs** | 38 | Content organization |
| **Accordions** | 40 | FAQ sections, expandable content |
| **Tables** | 30 | Data display |
| **Selects** | 62 | Dropdowns, pickers |
| **Sliders** | 45 | Carousels, range inputs |
| **AI Chat** | 30 | Chat interfaces |
| **Shaders** | varies | Visual effects, backgrounds |
| **Text** | varies | Typography components |

#### How to Use 21st.dev Components
```bash
# Install a component from 21st.dev
npx shadcn@latest add "https://21st.dev/r/component-name"
```

#### When Using the Magic MCP
If the `@21st-dev/magic` MCP server is available:
- Use `/ui` prefix to search and generate components
- Example: `/ui create a modern hero section with gradient background`
- Components are automatically installed into the project
- All components are fully editable after installation

#### Component-First Workflow (IMPORTANT)
1. **Search 21st.dev first** before writing any UI component from scratch
2. If a matching component exists, install it and customize
3. Only write custom components when no suitable match exists
4. Layer GSAP/Framer Motion animations on TOP of 21st.dev components

## Scrollytelling Patterns

### Architecture
```
Page
├── Hero (viewport-height, initial impact)
├── ScrollySection 1
│   ├── StickyVisual (position: sticky, transforms on scroll)
│   └── TextSteps[] (trigger points for visual changes)
├── ScrollySection 2
│   ├── StickyVisual
│   └── TextSteps[]
├── Parallax Break (atmospheric divider)
├── Interactive Section (user-driven exploration)
└── Footer CTA
```

### GSAP ScrollTrigger Pattern
```javascript
// Pin a visual while text steps scroll past
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrolly-section",
    pin: ".sticky-visual",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,            // smooth 1s lag
    anticipatePin: 1,    // prevents jump on pin
  }
});

// Step-based animations
tl.to(".visual-element", { scale: 1.2, opacity: 1 }, 0)
  .to(".visual-element", { x: 100, rotate: 15 }, 0.33)
  .to(".visual-element", { y: -50, filter: "blur(0px)" }, 0.66);
```

### Scroll-Driven Text Reveal
```javascript
// Split text into lines/words/chars for granular animation
// Use SplitType or GSAP SplitText plugin
const lines = new SplitType(".reveal-text", { types: "lines" });

gsap.from(lines.lines, {
  scrollTrigger: {
    trigger: ".reveal-text",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
  },
  opacity: 0.15,
  stagger: 0.1,
});
```

### Horizontal Scroll Section
```javascript
const sections = gsap.utils.toArray(".horizontal-panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth,
  },
});
```

### Lenis Smooth Scroll Setup
```javascript
import Lenis from "lenis";

const lenis = new Lenis({
  lerp: 0.1,           // smoothness (0.05 = very smooth, 0.15 = snappy)
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Connect to GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

## UX/UI Design Patterns

### Visual Hierarchy
1. **One hero statement** per viewport — never compete for attention
2. **Z-pattern** for landing pages, **F-pattern** for content-heavy pages
3. **Progressive disclosure** — reveal complexity as user scrolls deeper
4. **Breathing room** — generous whitespace (min 8rem between sections)

### Typography System
```css
:root {
  /* Fluid type scale using clamp */
  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg:   clamp(1.25rem, 1rem + 1vw, 1.5rem);
  --text-xl:   clamp(1.5rem, 1rem + 2vw, 2.25rem);
  --text-2xl:  clamp(2rem, 1rem + 3.5vw, 3.5rem);
  --text-3xl:  clamp(2.5rem, 1rem + 5vw, 5rem);
  --text-hero: clamp(3rem, 1rem + 7vw, 8rem);
}
```

### Color & Theming
```css
:root {
  /* Semantic tokens — light mode */
  --surface-primary: oklch(98% 0 0);
  --surface-elevated: oklch(100% 0 0);
  --text-primary: oklch(15% 0 0);
  --text-secondary: oklch(40% 0 0);
  --accent: oklch(65% 0.25 270);        /* vibrant purple */
  --accent-subtle: oklch(95% 0.05 270);
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: oklch(12% 0 0);
    --surface-elevated: oklch(18% 0 0);
    --text-primary: oklch(92% 0 0);
    --text-secondary: oklch(65% 0 0);
    --accent: oklch(75% 0.2 270);
    --accent-subtle: oklch(25% 0.08 270);
  }
}
```

### Micro-Interactions Checklist
- [ ] Button hover: scale(1.02) + subtle shadow shift (150ms ease-out)
- [ ] Link hover: underline slide-in or color transition
- [ ] Card hover: translateY(-4px) + shadow elevation
- [ ] Focus states: visible outline (2px solid accent, 2px offset)
- [ ] Page transitions: crossfade or slide (300ms)
- [ ] Loading states: skeleton screens, not spinners
- [ ] Scroll progress indicator (thin bar at top)
- [ ] Cursor follower for creative/agency sites (optional)

## New-Generation Visual Patterns

### Bento Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1rem;
}
.bento-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.bento-item:nth-child(4) { grid-column: span 2; }

@media (max-width: 768px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
}
```

### Glassmorphism
```css
.glass-card {
  background: oklch(100% 0 0 / 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid oklch(100% 0 0 / 0.12);
  border-radius: 1rem;
}
```

### Aurora / Gradient Mesh Background
```css
.aurora-bg {
  background:
    radial-gradient(ellipse at 20% 50%, oklch(70% 0.2 280 / 0.3), transparent 50%),
    radial-gradient(ellipse at 80% 20%, oklch(70% 0.2 200 / 0.25), transparent 50%),
    radial-gradient(ellipse at 50% 80%, oklch(70% 0.15 330 / 0.2), transparent 50%),
    var(--surface-primary);
  animation: aurora-shift 15s ease-in-out infinite alternate;
}

@keyframes aurora-shift {
  to { filter: hue-rotate(30deg); }
}
```

### Parallax Layers
```javascript
// Lightweight CSS-only parallax (no JS needed)
// Use transform: translateZ() with perspective on parent
.parallax-container {
  perspective: 1px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}

.parallax-layer--back {
  transform: translateZ(-2px) scale(3);
}

.parallax-layer--front {
  transform: translateZ(0);
}
```

### Reveal Animations
```javascript
// Intersection Observer for scroll-triggered reveals (no library needed)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
[data-reveal-stagger].revealed > *:nth-child(1) { transition-delay: 0s; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].revealed > *:nth-child(2) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].revealed > *:nth-child(3) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
```

## Three.js / React Three Fiber Patterns

### Basic Scene with Scroll Control
```jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

function ScrollScene() {
  const scroll = useScroll();
  const meshRef = useRef();

  useFrame(() => {
    const offset = scroll.offset; // 0 to 1
    meshRef.current.rotation.y = offset * Math.PI * 2;
    meshRef.current.position.y = Math.sin(offset * Math.PI) * 2;
  });

  return <mesh ref={meshRef}>
    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
    <meshStandardMaterial color="#8b5cf6" roughness={0.3} />
  </mesh>;
}

export default function Hero3D() {
  return (
    <div className="h-[300vh]">
      <Canvas className="!fixed inset-0 -z-10">
        <ScrollControls pages={3}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <ScrollScene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
```

### Particle System Background
```jsx
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as random from "maath/random";

function ParticleField({ count = 3000 }) {
  const ref = useRef();
  const positions = useMemo(
    () => random.inSphere(new Float32Array(count * 3), { radius: 4 }),
    [count]
  );

  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
```

## Image & Media Optimization

- Use `<Image>` component (Next.js) or `<Picture>` (Astro) for automatic optimization
- WebP/AVIF format with fallbacks
- Lazy load below-the-fold images: `loading="lazy"` + `decoding="async"`
- Hero images: `loading="eager"` + `fetchpriority="high"`
- Video backgrounds: autoplay, muted, playsinline, loop — use `<source>` with WebM + MP4
- Use `srcset` and `sizes` for responsive images

## Page Structure Template

```
1. HERO (100vh)
   - Large typography headline with character/word animation on load
   - Subtle background motion (particles, gradient shift, video)
   - Single clear CTA
   - Scroll indicator (animated chevron or "scroll" text)

2. SOCIAL PROOF / LOGOS (optional, short section)
   - Infinite marquee of brand logos
   - "Trusted by X companies"

3. PROBLEM → SOLUTION (scrollytelling section)
   - Sticky visual on left/right
   - Text steps scroll past, each triggering visual change
   - Use progress indicator dots

4. FEATURES / BENEFITS (bento grid or cards)
   - Reveal on scroll with stagger
   - Icons or illustrations per feature
   - Hover interactions

5. SHOWCASE / PORTFOLIO (horizontal scroll or masonry)
   - High-quality images/videos
   - Hover preview or lightbox

6. TESTIMONIALS (carousel or stacked cards)
   - Photo + quote + attribution
   - Auto-rotate with pause on hover

7. PRICING / CTA (clear, centered)
   - Comparison table or cards
   - Highlighted recommended plan

8. FOOTER
   - Navigation links, social icons
   - Newsletter signup
   - Legal links
```

## Performance Checklist

- [ ] Bundle size < 200kb JS (gzipped) for landing pages
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total Blocking Time < 200ms
- [ ] All animations use `transform` and `opacity` only
- [ ] Images optimized (WebP/AVIF, proper sizes)
- [ ] Fonts: `font-display: swap`, preload critical fonts, max 2 families
- [ ] Code-split heavy libraries (Three.js, GSAP) with dynamic imports
- [ ] `prefers-reduced-motion` respected — disable parallax, reduce motion

## Accessibility Checklist

- [ ] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Heading hierarchy: single `<h1>`, logical `<h2>`-`<h6>` nesting
- [ ] All images have descriptive `alt` text
- [ ] Color contrast ratio >= 4.5:1 for text, 3:1 for large text
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip-to-content link as first focusable element
- [ ] `prefers-reduced-motion: reduce` disables scroll animations
- [ ] `prefers-color-scheme` respected for dark/light mode
- [ ] ARIA landmarks for custom interactive widgets
- [ ] Form inputs have associated `<label>` elements

## Typography: Distinctive Font Pairings

AVOID generic fonts: Inter, Roboto, Poppins, Montserrat, Open Sans.

Recommended pairings for high-impact sites:
| Heading | Body | Vibe |
|---------|------|------|
| **Sora** | Manrope | Modern tech, clean |
| **Cabinet Grotesk** | Satoshi | Bold editorial |
| **Clash Display** | General Sans | Creative agency |
| **Space Grotesk** | DM Sans | Developer/SaaS |
| **Playfair Display** | Source Sans 3 | Luxury/editorial |
| **Bricolage Grotesque** | Figtree | Friendly startup |
| **Cal Sans** | Inter (exception) | Minimal SaaS |

## Inspiration References

When the user needs design direction, suggest exploring:
- **21st.dev** — 1,400+ production React components, browse before building
- **Awwwards** — award-winning site gallery
- **Lapa.ninja** — landing page collection
- **Godly.website** — curated design inspiration
- **Codrops** — creative frontend tutorials and demos
- **Minimal Gallery** — clean, minimal design references
