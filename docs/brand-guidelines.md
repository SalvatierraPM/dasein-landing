# Dasein Foresight Brand Guidelines

## Direction

Este sistema toma una sola cosa del mood board original: el **simbolo organico**. Todo lo demas se aterriza al lenguaje visual ya presente en la landing:

- fondos `paper` y superficies levemente editoriales
- contraste `ink` / `navy` para credibilidad y sobriedad
- acentos `signal-blue` y `signal-red` reservados para interfaz y momentos tacticos
- tipografia `Satoshi` para titulares, `Space Grotesk` para body, `Azeret Mono` para datos y simbolos

La intencion es que Dasein se vea menos "estudio contemplativo" y mas "consultoria estrategica con sensibilidad de sistema".

## Brand Idea

- **El volumen exterior** representa amplitud de lectura: senales, actores, fricciones.
- **El nucleo oscuro** representa criterio y modelamiento.
- **El corte vertical** funciona como gesto de trazabilidad: una linea de decision dentro de la ambiguedad.

## Typography System

| Role | Font | Weight | When |
|------|------|--------|------|
| Display headlines | Satoshi | 900 | Hero, main titles |
| Section headers | Satoshi | 700 | H2, service names |
| Subtitles/lanes | Satoshi | 500 | H4, nav labels |
| Body text | Space Grotesk | 400 | Paragraphs, descriptions |
| Mono/Data | Azeret Mono | 400-600 | Metrics, overlines, symbols |
| Editorial | Instrument Serif italic | 400 | ONLY memo titles, blockquotes |

## Symbol System (Iconografia Primaria)

| Simbolo | Uso | Color |
|---------|-----|-------|
| → | Kickers, CTAs | signal-red @ 0.5-0.7 |
| ◆ | Marquee separadores | signal-red @ 0.4 |
| ※ | Bullets en listas | signal-blue @ 0.6 |
| ◈ | Output / entregables | signal-blue @ 0.6 |
| / | Prefijo pills/tags | signal-red @ 0.7 |
| ◇ | Metadata inline | inherit @ 0.5 |
| ▸ | Terminal / proceso | signal-blue @ 0.4 |

Lucide Icons como sistema secundario, solo para iconografia funcional figurativa.

## Approved Files

- `public/brand/dasein-mark.svg`
- `public/brand/dasein-mark-reversed.svg`
- `public/brand/dasein-logo-horizontal.svg`
- `public/brand/dasein-logo-horizontal-reversed.svg`
- `public/brand/dasein-logo-stacked.svg`
- `public/brand/dasein-logo-stacked-reversed.svg`
- `public/brand/dasein-wordmark.svg`
- `public/brand/dasein-wordmark-reversed.svg`

## Usage

### Default

- Usa `dasein-logo-horizontal.svg` en header, decks, propuestas y documentos.
- Usa `dasein-logo-stacked.svg` en portadas, perfiles cuadrados y piezas de presentacion.
- Usa `dasein-mark.svg` para favicon, avatar, sello o firma secundaria.
- Usa `dasein-wordmark.svg` cuando el simbolo ya este presente en la composicion.

### Dark Surfaces

- Usa las versiones `*-reversed.svg` sobre `navy`, fotografia oscura o fondos con particulas.

### Clear Space

- Deja un margen minimo equivalente al ancho del corte central del simbolo en todos sus lados.

### Minimum Size

- `mark`: 24 px digital.
- `wordmark`: 140 px de ancho minimo.
- `logo` completo: 160 px de ancho minimo.

## Color System

| Role | Hex | Source |
| --- | --- | --- |
| Paper | `#F5EFE5` | background base |
| Paper Soft | `#FBF7F1` | logo shell highlight |
| Bone | `#E7DDD0` | warm shell tone |
| Mist | `#DCE6F5` | cool shell tone |
| Metal | `#C6CBD4` | neutral cool support |
| Ink | `#111111` | wordmark on light |
| Navy | `#0A1628` | core depth / dark contexts |
| Signal Blue | `#4865FF` | interface accent only |
| Signal Red | `#FF5C38` | interface accent / symbols |

## Do Not

- No agregar glow, bisel ni sombras nuevas al logo.
- No recolorear el simbolo con los acentos `signal`.
- No usar el lockup completo por debajo del tamano minimo.
- No comprimir ni alterar el espaciado del wordmark.
- No usar simbolos tipograficos fuera de su significado semantico asignado.

## Review Page

- Vista rapida del sistema: `src/pages/brand.astro`
