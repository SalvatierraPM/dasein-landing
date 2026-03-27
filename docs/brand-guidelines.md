# Dasein Foresight Brand Guidelines

## Direction

Este sistema toma una sola cosa del mood board original: el **símbolo orgánico**. Todo lo demás se aterriza al lenguaje visual ya presente en la landing:

- fondos `paper` y superficies levemente editoriales
- contraste `ink` / `navy` para credibilidad y sobriedad
- acentos `signal-blue` y `signal-red` reservados para interfaz y momentos tácticos
- tipografía `Switzer` para el wordmark y `Azeret Mono` para la firma descriptiva

La intención es que Dasein se vea menos “estudio contemplativo” y más “consultoría estratégica con sensibilidad de sistema”.

## Brand Idea

- **El volumen exterior** representa amplitud de lectura: señales, actores, fricciones.
- **El núcleo oscuro** representa criterio y modelamiento.
- **El corte vertical** funciona como gesto de trazabilidad: una línea de decisión dentro de la ambigüedad.

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
- Usa `dasein-logo-stacked.svg` en portadas, perfiles cuadrados y piezas de presentación.
- Usa `dasein-mark.svg` para favicon, avatar, sello o firma secundaria.
- Usa `dasein-wordmark.svg` cuando el símbolo ya esté presente en la composición.

### Dark Surfaces

- Usa las versiones `*-reversed.svg` sobre `navy`, fotografía oscura o fondos con partículas.

### Clear Space

- Deja un margen mínimo equivalente al ancho del corte central del símbolo en todos sus lados.

### Minimum Size

- `mark`: 24 px digital.
- `wordmark`: 140 px de ancho mínimo.
- `logo` completo: 160 px de ancho mínimo.

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
| Signal Red | `#FF5C38` | interface accent only |

## Do Not

- No agregar glow, bisel ni sombras nuevas al logo.
- No recolorear el símbolo con los acentos `signal`.
- No usar el lockup completo por debajo del tamaño mínimo.
- No comprimir ni alterar el espaciado del wordmark.

## Review Page

- Vista rápida del sistema: `src/pages/brand.astro`
