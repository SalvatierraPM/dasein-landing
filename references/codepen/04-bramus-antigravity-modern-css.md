# Google Antigravity Rework — Modern CSS
By Bramus — https://codepen.io/bramus/pen/bNpoKmy
See https://brm.us/antigravity for details

## What it is
Full rework of antigravity.google using modern CSS features:
- CSS scroll-state container queries for carousel snapped effects
- CSS scroll-driven animations (typewriter, scale-up)
- CSS @scope for dark container color inversions
- CSS anchor positioning for mobile nav
- CSS Houdini PaintWorklets for particle ring + confetti backgrounds
- CSS @starting-style for entry animations
- CSS scroll-snap with ::scroll-button() pseudo-elements
- Hidey-bar nav using scroll-state(scrolled: bottom)
- CSS layers for clean architecture

## Key techniques to steal
1. Typewriter effect via scroll-triggered animations + background-clip: text
2. Ring particles background via Houdini PaintWorklet (follows mouse)
3. Hidey-bar nav that hides on scroll down, shows on scroll up — pure CSS
4. Carousel with native CSS scroll buttons (::scroll-button)
5. Product features with sticky images + scroll-triggered fade
6. Scroll-driven scale-up animation on cards

## Full source saved separately — too large for single HTML file
Source: https://codepen.io/bramus/pen/bNpoKmy
