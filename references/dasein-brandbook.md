# Dasein Foresight - Brandbook Completo

> Documento de referencia para diseno e implementacion del sitio web.
> Version 1.0 | Marzo 2026

---

## 1. Identidad de Marca

### Nombre

- **Nombre completo**: Dasein Foresight
- **Variantes permitidas**: "Dasein" (uso informal/interno), "Dasein Foresight" (uso formal/externo)
- **Variantes prohibidas**: "DaseinAI", "Dasein AI Foresight", "DASEIN", abreviaturas como "DF"

### Origen del Nombre

**Dasein** proviene de la filosofia de Martin Heidegger. En aleman significa literalmente "ser-ahi" o "estar-en-el-mundo" (*being-in-the-world*). Heidegger usa el concepto para describir la existencia humana como fundamentalmente situacional: siempre estamos inmersos en un contexto, un tiempo, una red de posibilidades. Dasein Foresight toma este concepto para expresar que **la prospectiva no es abstracta** — es la capacidad de leer el mundo desde donde estas parado y anticipar hacia donde se mueve.

### Tagline

- **Principal**: "Simulamos futuros para que decidas mejor hoy"
- **Alternativo**: "Prospectiva estrategica potenciada por IA"

### Propuesta de Valor

- **Una frase**: Dasein Foresight combina inteligencia artificial con metodologia de prospectiva rigurosa para simular escenarios futuros y ayudar a lideres a tomar decisiones estrategicas con mayor certeza.
- **Version expandida**: En un entorno donde las disrupciones se aceleran y las herramientas tradicionales de planificacion quedan obsoletas, Dasein Foresight ofrece una capacidad unica: la simulacion de futuros alternativos mediante nuestra plataforma SignalTwin. Escaneamos senales debiles, modelamos escenarios con inteligencia artificial dual-world, y traducimos complejidad en recomendaciones accionables. No predecimos el futuro — lo simulamos para que cada decision este informada por multiples posibilidades.

---

## 2. Paleta de Colores

### Filosofia de Color

La paleta comunica **sofisticacion intelectual, confianza y vision de futuro**. Se basa en tonos oscuros profundos como base, con acentos que evocan inteligencia artificial y proyeccion. El sistema esta disenado para alto contraste y legibilidad en pantalla.

### Colores Primarios

#### Deep Navy (Base principal)

- **Uso**: Fondos principales, header, footer, secciones hero
- **Hex**: `#0A1628`
- **RGB**: `rgb(10, 22, 40)`
- **HSL**: `hsl(216, 60%, 10%)`
- **oklch**: `oklch(15% 0.04 260)`

#### Slate White (Texto principal sobre fondos oscuros)

- **Uso**: Texto principal, headlines sobre fondo oscuro
- **Hex**: `#ede7dc`
- **RGB**: `rgb(232, 236, 241)`
- **HSL**: `hsl(213, 24%, 93%)`
- **oklch**: `oklch(94% 0.01 260)`

#### Signal Blue (Acento primario)

- **Uso**: CTAs principales, links, elementos interactivos, indicadores de datos
- **Hex**: `#4865ff`
- **RGB**: `rgb(59, 130, 246)`
- **HSL**: `hsl(217, 91%, 60%)`
- **oklch**: `oklch(63% 0.19 260)`

### Colores Secundarios

#### Horizon Violet (Acento secundario)

- **Uso**: Gradientes, elementos de simulacion, indicadores de escenarios futuros
- **Hex**: `#7a68d6`
- **RGB**: `rgb(124, 58, 237)`
- **HSL**: `hsl(263, 83%, 58%)`
- **oklch**: `oklch(50% 0.24 290)`

#### Foresight Teal (Terciario)

- **Uso**: Exito, datos positivos, indicadores de oportunidad
- **Hex**: `#2f9e90`
- **RGB**: `rgb(20, 184, 166)`
- **HSL**: `hsl(174, 80%, 40%)`
- **oklch**: `oklch(70% 0.14 180)`

### Colores Funcionales

#### Surface Dark (Fondo de cards sobre navy)

- **Hex**: `#111D2E`
- **RGB**: `rgb(17, 29, 46)`
- **HSL**: `hsl(215, 46%, 12%)`
- **oklch**: `oklch(18% 0.03 260)`

#### Surface Light (Secciones claras alternadas)

- **Hex**: `#F0F4F8`
- **RGB**: `rgb(240, 244, 248)`
- **HSL**: `hsl(210, 33%, 96%)`
- **oklch**: `oklch(96% 0.008 260)`

#### Muted Text (Texto secundario, captions)

- **Hex**: `#8899AA`
- **RGB**: `rgb(136, 153, 170)`
- **HSL**: `hsl(210, 18%, 60%)`
- **oklch**: `oklch(66% 0.04 250)`

#### Danger / Alerta

- **Hex**: `#EF4444`
- **oklch**: `oklch(63% 0.22 25)`

### Gradientes

```css
/* Gradiente principal - hero backgrounds, CTAs premium */
--gradient-hero: linear-gradient(135deg, #0A1628 0%, #1A2744 50%, #111D2E 100%);

/* Gradiente de acento - elementos de simulacion, hover states */
--gradient-accent: linear-gradient(135deg, #4865ff 0%, #7a68d6 100%);

/* Gradiente sutil - fondos de cards interactivas */
--gradient-card: linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%);
```

### Ratios de Uso

- **60%** Deep Navy + Surface Dark (fondos, estructura)
- **30%** Slate White + Muted Text (tipografia, contenido)
- **10%** Signal Blue + Horizon Violet (acentos, CTAs, datos)

### Combinaciones Permitidas

| Background | Text | Accent | Uso |
|---|---|---|---|
| Deep Navy | Slate White | Signal Blue | Hero, header, secciones principales |
| Surface Dark | Slate White | Signal Blue | Cards, paneles de datos |
| Surface Light | Deep Navy | Signal Blue | Secciones de contenido alternadas |
| White | Deep Navy | Horizon Violet | Formularios, zonas de lectura larga |

### Combinaciones Prohibidas

- Signal Blue sobre Horizon Violet (contraste insuficiente)
- Muted Text sobre Surface Dark (no pasa WCAG AA)
- Foresight Teal como color de texto principal
- Gradientes sobre texto sin overlay de contraste

---

## 3. Tipografia

### Font Families

```css
/* Display - titulares, secciones, subtitulos */
--font-display: 'Satoshi', 'Helvetica Neue', Arial, sans-serif;

/* Body - texto corrido, descripciones, UI */
--font-body: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;

/* Monospace - datos, metricas, etiquetas tecnicas, terminal */
--font-mono: 'Azeret Mono', 'JetBrains Mono', monospace;

/* Editorial - solo para titulos de memos ejecutivos y blockquotes */
--font-editorial: 'Instrument Serif', Georgia, serif;
```

**Sistema tipografico:**
- **Satoshi 900** — Display headlines (hero, titulos principales)
- **Satoshi 700** — Secciones (H2, nombres de servicio)
- **Satoshi 500** — Subtitulos, lanes, labels de navegacion
- **Space Grotesk 400** — Body text, descripciones, parrafos
- **Azeret Mono 400-500** — Datos, metricas, overlines tecnicos, prefijos terminal
- **Instrument Serif italic** — Solo titulos editoriales en memos ejecutivos

**Nota**: Satoshi aporta peso y personalidad en titulares (geometrica, con caracter). Space Grotesk se reserva para body text donde su legibilidad brilla. Azeret Mono reemplaza JetBrains Mono por su estetica mas alineada con el sistema visual.

### Escala Tipografica (Fluid)

```css
:root {
  /* Display - hero headlines */
  --text-display: clamp(3rem, 1rem + 7vw, 6rem);

  /* H1 - section titles */
  --text-h1: clamp(2.25rem, 1.5rem + 3vw, 3.75rem);

  /* H2 - subsection titles */
  --text-h2: clamp(1.75rem, 1.25rem + 2vw, 2.5rem);

  /* H3 - card titles, feature names */
  --text-h3: clamp(1.25rem, 1rem + 1vw, 1.75rem);

  /* H4 - small headings */
  --text-h4: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);

  /* Body - paragraph text */
  --text-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);

  /* Body small - secondary content */
  --text-sm: clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);

  /* Caption - metadata, labels */
  --text-caption: clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem);

  /* Overline - section labels, categories */
  --text-overline: clamp(0.6875rem, 0.67rem + 0.1vw, 0.75rem);
}
```

### Line Heights y Spacing

```css
:root {
  /* Line heights */
  --leading-display: 1.05;
  --leading-heading: 1.2;
  --leading-body: 1.65;
  --leading-tight: 1.3;

  /* Letter spacing */
  --tracking-display: -0.03em;
  --tracking-heading: -0.02em;
  --tracking-body: 0;
  --tracking-overline: 0.12em;
  --tracking-mono: -0.02em;
}
```

### Jerarquia Visual

| Nivel | Font | Weight | Size Var | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| Display | display (Satoshi) | 900 | --text-display | 0.94 | -0.055em | none |
| H1 | display (Satoshi) | 900 | --text-h1 | 1.15 | -0.03em | none |
| H2 | display (Satoshi) | 700 | --text-h2 | 1.15 | -0.02em | none |
| H3 | display (Satoshi) | 700 | --text-h3 | 1.3 | -0.01em | none |
| Subtitle | display (Satoshi) | 500 | --text-h4 | 1.3 | 0 | none |
| Body | body (Space Grotesk) | 400 | --text-body | 1.7 | 0 | none |
| Body bold | body (Space Grotesk) | 600 | --text-body | 1.7 | 0 | none |
| Small | body (Space Grotesk) | 400 | --text-sm | 1.5 | 0 | none |
| Caption | body (Space Grotesk) | 400 | --text-caption | 1.4 | 0.01em | none |
| Overline | mono (Azeret Mono) | 500 | --text-overline | 1.2 | 0.18em | uppercase |
| Mono data | mono (Azeret Mono) | 500 | --text-body | 1.5 | -0.02em | none |

### Sistema de Simbolos

Simbolos tipograficos con significado semantico. Se usan en lugar de bullets, separadores e indicadores genericos.

| Simbolo | Uso | Significado |
|---------|-----|-------------|
| → | Kickers, CTAs, links de navegacion | Direccion, movimiento |
| ◆ | Separador en marquees y tickers | Nodo, senal |
| ※ | Bullets en listas de contenido | Nota, referencia |
| ◈ | Labels de output/entregables | Resultado, dato |
| / | Prefijo en pills y tags | Categoria |
| ◇ | Separador de metadata inline | Metadata ligera |
| ▸ | Prefijo terminal/typewriter | Proceso, sistema |

**Reglas de uso:**
- Los simbolos reemplazan bullets estandar (•) y flechas genericas (>)
- Se renderizan en `--font-mono` (Azeret Mono) cuando aparecen junto a texto mono
- En contexto body, se renderizan en el font del texto circundante
- Color por defecto: heredan el color del texto padre
- Color acentuado permitido: `--signal-red` (opacity 0.5-0.7) para → ◆ / y `--signal-blue` (opacity 0.4-0.6) para ※ ◈ ▸
- Los simbolos son puntuacion visual, no decoracion: cada uno tiene un significado semantico fijo

---

## 4. Tono de Voz

### Principios de Comunicacion

1. **Claridad antes que sofisticacion** — Somos expertos que simplifican, no que complican. Si un concepto es denso, lo traducimos. Nunca usamos jerga para impresionar.

2. **Confianza sin arrogancia** — Hablamos desde la autoridad de quien sabe, no desde la postura de quien necesita demostrar. Afirmaciones directas, sin hedge words.

3. **Futuro concreto, no ciencia ficcion** — La prospectiva no es especulacion romantica. Hablamos de escenarios con datos, probabilidades, y horizontes temporales reales.

4. **Accionable siempre** — Cada comunicacion debe dejar claro que puede hacer el lector ahora. No describimos problemas sin senalar caminos.

### Vocabulario Preferido vs Prohibido

| Preferido | Prohibido | Razon |
|---|---|---|
| Prospectiva estrategica | Futurologia | Futurologia suena a adivinacion |
| Simulacion de escenarios | Prediccion | No predecimos, simulamos |
| Senales debiles | Tendencias disruptivas | "Disruptivo" esta desgastado |
| Inteligencia artificial | IA magica / IA avanzada | Sin superlativos vacios |
| Decision informada | Decision optima | No prometemos optimidad |
| Escenario alternativo | Escenario ideal / peor caso | Evitar juicio de valor en escenarios |
| Horizonte temporal | Futuro lejano | Precision sobre vaguedad |
| Explorar futuros | Predecir el futuro | Exploramos, no predecimos |
| Complejidad | Caos / incertidumbre total | Complejidad es manejable, caos no |
| Rigor metodologico | Metodologia revolucionaria | Sin superlativos |

### Ejemplos de Copy

#### Hero Section

> **Simulamos futuros para que decidas mejor hoy.**
>
> Dasein Foresight combina prospectiva estrategica con inteligencia artificial para explorar escenarios y convertir incertidumbre en ventaja competitiva.
>
> [Agenda una conversacion]

#### CTA Principal

- "Agenda una conversacion" (no "Contactanos" ni "Solicita informacion")
- "Explora tus escenarios" (no "Descubre el futuro")
- "Comienza con una Lectura de Campo" (no "Prueba gratis")

#### Descripcion de Servicio (Ejemplo: Simulacion Táctica)

> **Simulacion Táctica**
>
> Un caso completo de simulacion de futuros. Escaneamos 40-60 senales relevantes para tu industria, construimos un modelo dual-world con IA, y te entregamos un mapa de escenarios con implicaciones estrategicas concretas. En 4-5 semanas, tu equipo directivo tendra un lenguaje comun para hablar del futuro — y un plan para cada version de el.

#### Microcopy / Elementos UI

- Overline de seccion: "METODOLOGIA" no "COMO FUNCIONA NUESTRA MAGIA"
- Badge de paquete: "Mas popular" no "El mejor" o "Recomendado"
- Footer CTA: "El futuro no espera. Hablemos." no "No te quedes atras"

---

## 5. Imagery y Visual Language

### Estilo Visual General

**Abstracto-geometrico con profundidad**. La estetica de Dasein es oscura, limpia, con elementos que sugieren redes, conexiones, horizontes y capas de informacion. Evitar fotografias stock genericas de ejecutivos en salas de reuniones.

### Imagery Permitida

- **Visualizaciones de datos abstractas** — grafos de nodos, redes de conexiones, topografias de datos
- **Geometria generativa** — patrones creados proceduralmente que sugieran complejidad y estructura
- **Horizontes y profundidad** — composiciones con perspectiva que evoquen "mirar hacia adelante"
- **Diagramas esquematicos** — flujos, capas, modelos visuales propios de la metodologia

### Imagery Prohibida

- Fotos stock de personas mirando pantallas o apretando manos
- Imagenes de robots, cerebros digitales, o estetica "AI generica"
- Fotos de ciudades futuristas o ciencia ficcion
- Clipart, iconos 3D hiperrealistas, o elementos cartoon

### Iconografia

#### Sistema primario: Simbolos tipograficos

El sistema visual de Dasein usa **simbolos tipograficos con significado semantico** como iconografia principal. Son mas ligeros que iconos tradicionales, se alinean perfectamente con el texto, y refuerzan la estetica editorial-tecnica de la marca.

Ver tabla completa en Seccion 3 > Sistema de Simbolos.

**Usos atmosfericos de simbolos:**

| Patron | Descripcion | Donde usarlo |
|--------|-------------|--------------|
| Symbol field | Simbolos dispersos como textura de fondo (opacity 3-5%) | Hero, secciones de apertura |
| Ghost watermark | Simbolo gigante (5-9rem) detras del contenido de una card | Cards de metodo, pasos del proceso |
| Corner accents | Simbolos pequenos en esquinas de paneles (opacity 12%) | Cards de entregables, paneles destacados |
| Symbol divider | Linea con simbolos al centro (`◇ → ◆ → ◇`) | Separador entre secciones |
| Symbol marquee | Simbolos como ritmo entre items de un ticker | Marquee strips, tickers de servicios |
| HUD data cells | Simbolo como icono de cada metrica en layout tipo dashboard | Metricas, KPIs, datos del caso |

**Reglas para uso atmosferico:**
- Los simbolos decorativos SIEMPRE llevan `aria-hidden="true"`
- Opacity maxima para elementos decorativos: 5% (light bg), 4% (dark bg)
- Font: siempre `--font-mono` (Azeret Mono)
- No combinar mas de 2 patrones atmosfericos en una misma seccion
- En `prefers-reduced-motion: reduce`, los symbol fields no se renderizan

#### Sistema secundario: Lucide Icons (funcional)

Para iconografia funcional donde se necesite un icono reconocible (navegacion, acciones de UI, indicadores de estado):

- **Estilo**: Line icons, peso consistente
- **Peso de linea**: 1.5px (mobile), 2px (desktop)
- **Tamano base**: 24px grid
- **Estilo de bordes**: Rounded caps, round joins
- **Color**: Signal Blue sobre fondos oscuros, Deep Navy sobre fondos claros
- **Set recomendado**: Lucide Icons (open source, consistente con el estilo)

**Preferencia**: Usar simbolos tipograficos siempre que sea posible. Lucide solo cuando el significado requiere un icono figurativo (ej: radar, layers, git-branch).

### Uso de Espacio en Blanco

El espacio en blanco (o "espacio oscuro" dado nuestro fondo navy) es un elemento de diseno activo. Comunica premium, permite respirar al contenido, y refuerza la idea de claridad en complejidad.

- **Entre secciones**: Generoso (minimo 120px, idealmente fluid)
- **Dentro de cards**: Padding interno amplio (32-48px)
- **Alrededor de headlines**: Siempre aire arriba y abajo
- **Regla general**: En caso de duda, mas espacio. Nunca menos.

### Grid y Spacing System

```css
:root {
  /* Base unit: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* Section spacing - fluid */
  --space-section: clamp(4rem, 3rem + 5vw, 10rem);
  --space-section-sm: clamp(2rem, 1.5rem + 3vw, 5rem);

  /* Content max widths */
  --max-width-content: 72rem;    /* 1152px */
  --max-width-text: 42rem;       /* 672px - for readable paragraphs */
  --max-width-wide: 90rem;       /* 1440px */

  /* Grid */
  --grid-columns: 12;
  --grid-gutter: clamp(1rem, 0.5rem + 2vw, 2rem);
  --grid-margin: clamp(1rem, 0.5rem + 4vw, 4rem);
}
```

---

## 6. Componentes UI Sugeridos

### Botones

```css
/* Primary CTA */
.btn-primary {
  background: var(--color-signal-blue);  /* #4865ff */
  color: white;
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.01em;
  padding: var(--space-3) var(--space-8);
  border-radius: 8px;
  transition: transform 200ms var(--ease-out-expo),
              box-shadow 200ms var(--ease-out-expo);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

/* Secondary / Ghost */
.btn-secondary {
  background: transparent;
  color: var(--color-slate-white);
  border: 1px solid rgba(232, 236, 241, 0.2);
  padding: var(--space-3) var(--space-8);
  border-radius: 8px;
  transition: border-color 200ms, background 200ms;
}

.btn-secondary:hover {
  border-color: rgba(232, 236, 241, 0.5);
  background: rgba(232, 236, 241, 0.05);
}
```

### Cards

```css
.card {
  background: var(--color-surface-dark);  /* #111D2E */
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  padding: var(--space-8) var(--space-8);
  transition: border-color 300ms, transform 300ms var(--ease-out-expo);
}

.card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-4px);
}

/* Card con glassmorphism sutil */
.card-glass {
  background: rgba(17, 29, 46, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 16px;
}
```

### Navegacion

- **Estilo**: Sticky top, fondo transparente que transiciona a Deep Navy con blur al scroll
- **Logo**: A la izquierda, nombre "Dasein Foresight" en font display weight 600
- **Links**: Slate White, weight 400, hover con underline animado (Signal Blue)
- **CTA nav**: Boton primary pequeno al extremo derecho
- **Mobile**: Hamburger menu con panel overlay fullscreen, fondo Deep Navy

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--space-4) var(--grid-margin);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(10, 22, 40, 0.8);
  border-bottom: 1px solid rgba(59, 130, 246, 0.08);
  transition: background 300ms;
}
```

### Glassmorphism

Usar con moderacion — solo en elementos que flotan sobre fondos con contenido visual (hero, secciones con gradientes). No en cards regulares de contenido.

- **Blur**: 16-24px
- **Background**: rgba del Surface Dark con 40-60% opacidad
- **Border**: 1px solid rgba blanco o Signal Blue con 10-15% opacidad
- **Uso recomendado**: Nav bar, modal overlays, feature cards sobre hero

### Animaciones y Transiciones

```css
:root {
  /* Easings */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Duraciones */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-reveal: 800ms;
}
```

#### Patron de Reveal (Scroll-triggered)

- **Elementos de texto**: Fade in + translateY(24px -> 0) | 600ms | ease-out-expo | stagger 100ms entre elementos
- **Cards**: Fade in + translateY(32px -> 0) + scale(0.97 -> 1) | 800ms | ease-out-expo | stagger 150ms
- **Datos/numeros**: CountUp animation en numeros | 1200ms | ease-out-quart
- **Lineas divisoras**: scaleX(0 -> 1) desde la izquierda | 600ms | ease-out-expo

#### Patron de Hover

- **Cards**: translateY(-4px) + border-color transition | 300ms
- **Botones**: translateY(-1px) + box-shadow | 200ms
- **Links**: underline width 0 -> 100% | 200ms

#### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Secciones del Sitio Web

### 7.1 Hero Section

**Layout**: Fullscreen (100vh), fondo Deep Navy con gradiente sutil. Texto centrado verticalmente, alineado a la izquierda en desktop, centrado en mobile.

**Elementos visuales de fondo**: Grafo animado de nodos con conexiones que pulsan sutilmente (canvas o SVG). Opacidad baja (10-15%) para no competir con el texto. Alternativa: grid de puntos con movimiento parallax sutil.

**Copy**:

```
[Overline] PROSPECTIVA ESTRATEGICA + IA

[H1 Display]
Simulamos futuros
para que decidas
mejor hoy.

[Body - max 2 lineas]
Dasein Foresight combina metodologia de prospectiva rigurosa con
simulacion AI para convertir incertidumbre en ventaja competitiva.

[CTA Primary] Agenda una conversacion
[CTA Secondary] Conoce nuestra metodologia
```

**Animacion de entrada**: Overline fade in primero (300ms delay), luego H1 palabra por palabra o linea por linea (stagger 150ms), body fade in (600ms delay), CTAs fade in + translateY (800ms delay).

### 7.2 Servicios (3 Paquetes)

**Layout**: Overline "SERVICIOS" + H2 de seccion, seguido de 3 cards en row (desktop) o stack (mobile).

**Copy de seccion**:

```
[Overline] SERVICIOS

[H2] Tres formas de explorar
lo que viene.

[Body] Cada compromiso se adapta a tu momento estrategico.
Desde un diagnostico rapido hasta monitoreo continuo.
```

#### Card 1: Lectura de Campo

```
[Badge] Puerta de entrada
[H3] Lectura de Campo
[Body] Escaneamos las senales relevantes para tu industria —
regulatorias, tecnologicas, competitivas, sociales — y te
entregamos un memo ejecutivo con mapa de stakeholders,
signposts concretos y plan de accion a 90 dias.
Claridad rapida para decidir ahora.
[Meta] Desde USD 2,500 | 5 dias
[CTA link] Saber mas ->
```

#### Card 2: Simulacion Táctica

```
[Badge] Mas popular
[H3] Simulacion Táctica
[Body] La experiencia completa. Corremos la simulacion dual-world
con nuestro motor SignalTwin: escenarios plausibles, analisis de
robustez, dashboard interactivo y workshop con tu equipo directivo.
El entregable que transforma como tu organizacion habla del futuro.
[Meta] Desde USD 12,000 | 4-5 semanas
[CTA link] Saber mas ->
```

#### Card 3: Radar Estrategico

```
[Badge] Monitoreo continuo
[H3] Radar Estrategico
[Body] Vigilancia estrategica permanente. Simulacion actualizada
cada trimestre, escaneo mensual de senales nuevas, alertas cuando
algo cambia. Tu radar de futuros siempre encendido, con plan de
accion a 90 dias renovado en cada ciclo.
[Meta] Desde USD 5,000/mes | Minimo 6 meses
[CTA link] Saber mas ->
```

**Diseno de cards**: Fondo Surface Dark, borde sutil. La card de Simulacion Táctica tiene un borde con gradiente accent (Signal Blue -> Horizon Violet) para destacarla. Las otras dos tienen borde neutro.

### 7.3 Caso de Estudio: BancoEstado

**Layout**: Seccion con fondo Surface Light (contraste con el rest del sitio) o alternativa: split layout con visual a un lado y texto al otro.

```
[Overline] CASO DE ESTUDIO

[H2] BancoEstado:
anticipando la IA en banca publica.

[Body]
Realizamos un escaneo de senales sobre adopcion de inteligencia
artificial en el sector bancario chileno, con foco en banca publica
y regulacion CMF. El resultado: un mapa de horizontes temporales
que permitio al equipo de estrategia priorizar inversiones en IA
con mayor certeza.

[Metricas en row]
- 25+ senales identificadas
- 3 horizontes temporales mapeados
- Regulacion | Tecnologia | Competencia

[Quote callout]
"Por primera vez tuvimos un lenguaje comun para hablar
de como la IA va a cambiar nuestro negocio en los proximos 5 anos."

[CTA] Quieres resultados similares? Hablemos.
```

**Nota**: Si el caso de estudio aun no esta publicable, esta seccion puede ir como "coming soon" con una version reducida, o reemplazarse temporalmente por una seccion de "Por que prospectiva".

### 7.4 Metodologia (Como Trabajamos)

**Layout**: Seccion oscura. Visual tipo proceso/flujo horizontal (desktop) o vertical (mobile) con 4 pasos.

```
[Overline] METODOLOGIA

[H2] Cuatro capas de inteligencia prospectiva.

[Body intro]
Nuestro framework combina escaneo de senales, modelado ontologico,
simulacion dual-world, y analisis linguistico para construir una
imagen completa de los futuros posibles.
```

#### Los 4 pasos (visual tipo timeline o stepper):

```
[Paso 1]
Icono: radar/scan
Titulo: Escaneo de Senales
Descripcion: Identificamos senales debiles y emergentes en tu
industria y entorno regulatorio, tecnologico y competitivo.

[Paso 2]
Icono: layers/estructura
Titulo: Modelo Ontologico
Descripcion: Clasificamos senales en 4 capas: hechos, patrones,
estructuras, y modelos mentales para entender la dinamica profunda.

[Paso 3]
Icono: git-branch/bifurcacion
Titulo: Simulacion Dual-World
Descripcion: Nuestra plataforma SignalTwin construye escenarios
alternativos: que pasa si las senales se aceleran, se debilitan,
o convergen de formas inesperadas.

[Paso 4]
Icono: message-square/analisis
Titulo: Traduccion Estrategica
Descripcion: Convertimos complejidad en recomendaciones accionables.
Memo ejecutivo, dashboard interactivo, y sesion con tu equipo.
```

### 7.5 Equipo / About

**Layout**: Seccion con fondo Deep Navy. Texto centrado arriba, luego grid de miembros del equipo (si aplica) o narrativa de fundacion.

```
[Overline] SOBRE NOSOTROS

[H2] Prospectiva con raices filosoficas
y herramientas del siglo XXI.

[Body]
Dasein Foresight nace de la conviccion de que las mejores decisiones
estrategicas se toman cuando entiendes no solo donde estas,
sino hacia donde se mueve el mundo.

Nuestro nombre viene de Heidegger: Dasein es el "ser-en-el-mundo",
la existencia siempre situada en un contexto y abierta a posibilidades.
Esa es nuestra filosofia: prospectiva enraizada en la realidad,
potenciada por inteligencia artificial.

[Si hay equipo visible]
Grid de cards con foto/avatar, nombre, titulo, 1 linea de expertise.

[Si no hay equipo visible aun]
Texto sobre la filosofia de trabajo, valores, y enfoque.
```

### 7.6 CTA Final

**Layout**: Seccion fullwidth con gradiente hero. Texto centrado. Maximo impacto visual.

```
[H2] El futuro no espera.
Hablemos del tuyo.

[Body]
Agenda una conversacion exploratoria de 30 minutos.
Sin compromiso. Sin PowerPoints.
Solo una conversacion sobre lo que viene
para tu industria.

[CTA Primary - grande] Agenda una conversacion
[Texto secundario debajo del CTA] O escribe a hola@daseinforesight.com
```

---

## 8. CSS Custom Properties (Resumen para Implementacion)

```css
:root {
  /* === Colors === */
  --color-deep-navy: oklch(15% 0.04 260);
  --color-slate-white: oklch(94% 0.01 260);
  --color-signal-blue: oklch(63% 0.19 260);
  --color-horizon-violet: oklch(50% 0.24 290);
  --color-foresight-teal: oklch(70% 0.14 180);
  --color-surface-dark: oklch(18% 0.03 260);
  --color-surface-light: oklch(96% 0.008 260);
  --color-muted: oklch(66% 0.04 250);
  --color-danger: oklch(63% 0.22 25);

  /* === Gradients === */
  --gradient-hero: linear-gradient(135deg, #0A1628 0%, #1A2744 50%, #111D2E 100%);
  --gradient-accent: linear-gradient(135deg, #4865ff 0%, #7a68d6 100%);
  --gradient-card: linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%);

  /* === Typography === */
  --font-display: 'Satoshi', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'Azeret Mono', 'JetBrains Mono', monospace;

  --text-display: clamp(3rem, 1rem + 7vw, 6rem);
  --text-h1: clamp(2.25rem, 1.5rem + 3vw, 3.75rem);
  --text-h2: clamp(1.75rem, 1.25rem + 2vw, 2.5rem);
  --text-h3: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  --text-h4: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  --text-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-sm: clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);
  --text-caption: clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem);
  --text-overline: clamp(0.6875rem, 0.67rem + 0.1vw, 0.75rem);

  --leading-display: 1.05;
  --leading-heading: 1.2;
  --leading-body: 1.65;
  --leading-tight: 1.3;

  --tracking-display: -0.03em;
  --tracking-heading: -0.02em;
  --tracking-body: 0;
  --tracking-overline: 0.12em;

  /* === Spacing === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-section: clamp(4rem, 3rem + 5vw, 10rem);
  --space-section-sm: clamp(2rem, 1.5rem + 3vw, 5rem);

  /* === Layout === */
  --max-width-content: 72rem;
  --max-width-text: 42rem;
  --max-width-wide: 90rem;
  --grid-columns: 12;
  --grid-gutter: clamp(1rem, 0.5rem + 2vw, 2rem);
  --grid-margin: clamp(1rem, 0.5rem + 4vw, 4rem);

  /* === Animation === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-reveal: 800ms;

  /* === Border radius === */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

---

## 9. Notas para el Web Designer

### Prioridades de Implementacion

1. **Mobile-first** — Disenar desde 320px y escalar hacia arriba
2. **Performance** — LCP < 2.5s, CLS < 0.1, animaciones solo en transform/opacity
3. **Accesibilidad** — WCAG AA minimo, reducir motion respetado, semantic HTML
4. **Progressive enhancement** — El sitio debe funcionar sin JS habilitado (contenido legible)

### Stack Recomendado

- **Framework**: Next.js o Astro (para SSG/SSR y performance)
- **Styling**: CSS custom properties + Tailwind CSS (utility-first)
- **Animations**: GSAP + ScrollTrigger para reveals, CSS transitions para micro-interacciones
- **Smooth scroll**: Lenis
- **Fonts**: Satoshi (via Fontshare), Space Grotesk + Azeret Mono + Instrument Serif (self-hosted or Google Fonts)
- **Icons**: Lucide React

### Breakpoints

```css
/* Mobile first */
/* sm */ @media (min-width: 640px)  { }
/* md */ @media (min-width: 768px)  { }
/* lg */ @media (min-width: 1024px) { }
/* xl */ @media (min-width: 1280px) { }
/* 2xl */ @media (min-width: 1536px) { }
```

### Estructura de Paginas

Para v1, el sitio es una **single-page** con navegacion por anclas:

```
/#hero
/#servicios
/#caso-estudio
/#metodologia
/#nosotros
/#contacto
```

Futuras expansiones: paginas individuales por servicio, blog de senales, dashboard publico.

---

*Documento creado por Dasein Foresight - Branding Expert*
*Para uso exclusivo del equipo de diseno web*
