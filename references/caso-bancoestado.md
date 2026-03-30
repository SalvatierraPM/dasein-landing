# Cuando un banco del Estado quiere implementar IA, el riesgo no es tecnologico — es politico

**Dasein Foresight** | Caso de analisis prospectivo

---

14 millones de clientes. 4 sindicatos con capacidad de bloqueo. Una ley de datos personales que entra en vigencia en meses. Y una decision que no admite improvisacion.

Este es el tipo de problema que resolvemos.

Realizamos un analisis prospectivo completo sobre la implementacion de inteligencia artificial en atencion al cliente y evaluacion crediticia de una de las mayores instituciones financieras publicas de Latinoamerica — un caso que condensa las tensiones que enfrenta cualquier organizacion grande del continente al incorporar IA en contextos de alta sensibilidad.

> *Este caso fue elaborado con informacion publica verificable para demostrar nuestras capacidades analiticas. La institucion analizada no es cliente de Dasein Foresight.*

### Lo que analizamos

| Dimension | Alcance |
|-----------|---------|
| Stakeholders mapeados | 15 actores en 6 categorias |
| Escenarios de entorno (matriz 2x2 Schwartz) | 4 mundos posibles |
| Opciones de decision evaluadas | 3, testeadas en cada escenario |
| Wild cards analizados | 5 eventos de alto impacto |
| Signposts definidos | 15+ senales con umbrales concretos |
| Agentes simulados | 15 (en modelo dual-world) |
| Acciones generadas en simulacion | ~580 |
| Fuentes consultadas | 42 |
| Horizonte temporal | 18 meses |

---

## El mapa de poder que nadie habia dibujado

La decision sobre IA en esta institucion no depende del CTO. Depende de una red de 15 actores con intereses divergentes, capacidad de veto desigual, y alianzas que se activan segun el escenario elegido.

### Posiciones por escenario

| Stakeholder | Poder | Modernizacion Silenciosa | IA Hibrida | Salto Agresivo |
|-------------|-------|--------------------------|------------|----------------|
| Directorio | Alto | + | ++ | -- |
| Gerencia Tecnologia | Medio-Alto | -- | + | ++ |
| Gerencia de Riesgo | Medio-Alto | + | + | -- |
| Sindicatos (x4) | Medio | ++ | 0 | -- |
| CMF (regulador bancario) | Alto | + | + | - |
| SERNAC (consumidor) | Medio | 0 | 0 | -- |
| Agencia Datos Personales | Alto (dic 2026) | + | 0 | -- |
| Clientes vulnerables (2.1M +65 anos) | Alto colectivo | ++ | + | -- |
| Clientes digitales (8.5M app) | Medio (churn) | -- | + | ++ |
| Ministerio de Hacienda | Alto | + | ++ | -- |
| Oposicion politica | Medio-Alto | 0 | 0 | ++ (explotan) |
| Prensa nacional | Alto | 0 | 0 | ++ (investigan) |

> ++ Fuerte apoyo | + Apoyo | 0 Neutral | - Oposicion | -- Fuerte oposicion

### El hallazgo que cambia el analisis

La coalicion sindicatos + prensa + oposicion politica tiene capacidad demostrada de congelar proyectos via presion publica. En el escenario de implementacion agresiva, esta coalicion se activa simultaneamente — y su capacidad de bloqueo es mayor que la de cualquier actor individual a favor de la modernizacion.

**Esto no se ve en un analisis FODA. Se ve cuando modelas las dinamicas entre actores.**

| Coalicion | Miembros | Se activa en | Capacidad de bloqueo |
|-----------|----------|--------------|---------------------|
| Bloque conservador | Sindicatos + Oposicion + Prensa | Escenario agresivo | **Alta** — congelan via presion publica |
| Frente regulatorio | CMF + Agencia Datos + SERNAC | Post-crisis | **Alta** — fuerzan rollback regulatorio |
| Alianza de modernizacion | Ger. Tecnologia + Clientes digitales + Hacienda | Escenario conservador | Media — presion sin veto |

---

## Cuatro mundos posibles, una sola estrategia robusta

No construimos "el escenario optimista y el pesimista". Aplicamos la metodologia de escenarios 2x2 de Schwartz/GBN: identificamos las dos incertidumbres criticas que la institucion **no controla** — rigor regulatorio y velocidad de adopcion digital — y las cruzamos para generar cuatro mundos futuros radicalmente diferentes.

```
                     REGULACION ESTRICTA
                           |
     "Statu Quo Blindado"  |  "Innovacion Regulada"
     Mundo lento y         |  Alta demanda + altas
     protegido             |  barreras regulatorias
                           |
  ADOPCION  ───────────────+─────────────── ADOPCION
  LENTA                    |                 RAPIDA
                           |
     "Inercia Sin Freno"   |  "Wild West Digital"
     Nada fuerza el        |  Mercado en ebullicion
     cambio                |  sin guardarriles
                           |
                     REGULACION PERMISIVA
```

Luego evaluamos las tres opciones de decision — (A) Modernizacion Silenciosa, (B) Inclusion Inteligente, (C) Salto Digital Agresivo — **dentro de cada uno de los 4 mundos**. La pregunta no es "cual escenario es mas probable", sino **cual decision resiste mejor la incertidumbre**.

### El analisis de robustez revela un resultado contundente

| Opcion | Innovacion Regulada | Wild West Digital | Statu Quo Blindado | Inercia Sin Freno | **Score** |
|--------|:---:|:---:|:---:|:---:|:---:|
| A — Modernizacion Silenciosa | Malo (1) | Desastroso (1) | Aceptable (3) | Funcional (2) | **10/25** |
| **B — Inclusion Inteligente** | **Bueno (4)** | **Bueno (4)** | **Bueno (3)** | **Bueno (3)** | **18/25** |
| C — Salto Digital Agresivo | Muy riesgoso (2) | Alto riesgo (4) | Muy malo (1) | Injustificable (1) | **9/25** |

**La Opcion B es la unica que funciona bien o aceptablemente en los 4 mundos posibles.** No es la opcion optima en ningun escenario individual — en el "Wild West" la C rinde mas a corto plazo; en el "Statu Quo" la A es mas comoda — pero es la unica que no genera riesgos catastroficos en ningun mundo.

La Opcion C solo rinde en el escenario mas permisivo, y aun ahi acumula riesgo latente (un banco estatal es siempre el primer blanco cuando la regulacion despierta). En 3 de 4 escenarios genera crisis.

### Pero la estrategia no es estatica

La recomendacion no es "implementar B y olvidarse", sino implementar B con **palancas de ajuste** activadas por senales del entorno:

- **Si las senales indican adopcion rapida:** acelerar despliegue del chatbot, ampliar cobertura digital
- **Si las senales indican regulacion estricta:** fortalecer compliance, documentar exhaustivamente, ralentizar despliegues
- **Si un wild card se materializa** (brecha de datos masiva, escandalo de IA en competidor, crisis economica severa): activar plan de contingencia con rollback documentado

### Tres precondiciones no negociables

1. **Acuerdo sindical de reconversion laboral** firmado antes del anuncio publico
2. **Auditoria de sesgo algoritmico** completada y documentada para el regulador — los modelos de scoring entrenados con datos historicos reproducen la segregacion geografica existente
3. **Piloto de chatbot con 500 usuarios vulnerables** — un asistente virtual que no entienda espanol chileno coloquial generara frustracion masiva exactamente en el segmento que mas necesita atencion

---

## Lo que revelo la simulacion que un taller no revelaria

Simulamos las dinamicas multi-actor en dos mundos paralelos: uno de opinion publica abierta y otro de comunidades especializadas. 15 agentes, ~580 acciones, 72-200 rondas.

### La cascada emergente

Lo que ningun workshop de 2 dias habria anticipado con esta granularidad:

```
Implementacion agresiva de chatbot
        ↓
Adultos mayores sin atencion adecuada (mes 2-3)
        ↓
Primeros reclamos en SERNAC + frustracion en sucursales
        ↓
Periodista investigativo publica reportaje:
"BancoEstado abandona a los mas pobres"
        ↓
Sindicatos amplifican con comunicado publico
        ↓
Oposicion cita a Ministro de Hacienda en comision
        ↓
Agencia de Datos Personales inicia investigacion (precedente)
        ↓
Directorio ordena rollback parcial
        ↓
Costo del rollback > costo de implementacion gradual
```

### Los agentes mas influyentes en la simulacion

| Agente | Acciones | Postura | Influencia |
|--------|----------|---------|-----------|
| Periodista investigativo | 48 | Expone riesgos | Alta |
| Lider sindical | 42 | Defiende empleo | Alta |
| Adulta mayor vulnerable | 38 | Victima de exclusion | Alta (empatia publica) |
| Regulador CMF | 35 | Exigente-neutral | Alta (autoridad) |
| Academico en regulacion IA | 32 | Analitico | Media |

**El insight clave:** un solo video viral de un adulto mayor frustrado con el chatbot tiene mas poder de cascada que cualquier circular regulatoria. La simulacion muestra que el riesgo reputacional precede y amplifica el riesgo regulatorio — no al reves.

---

## El veredicto y que hacer en los proximos 90 dias

### Recomendacion

**Implementar la Opcion B (Inclusion Inteligente) como estrategia base**, con palancas de aceleracion o cautela activadas por signposts, y las tres precondiciones como gates de avance. Confianza del analisis: 71% (Medium-High). La confianza es menor en la simulacion predictiva (48%) pero alta en el mapeo de stakeholders (88%) y la calidad de senales (75%).

### Acciones inmediatas

| # | Accion | Prioridad |
|---|--------|-----------|
| 1 | Mesa de dialogo con sindicatos sobre reconversion digital | **P0** |
| 2 | Auditoria externa de sesgo algoritmico en modelos de scoring | **P0** |
| 3 | Piloto controlado de chatbot con 500 usuarios CuentaRUT 65+ | **P0** |
| 4 | Documentacion de IA explicable para Agencia de Datos (vigencia dic 2026) | P1 |
| 5 | Monitoreo semanal de signposts regulatorios y reputacionales | P1 |

### Signpost dashboard — que monitorear hoy

Las senales estan organizadas por eje de incertidumbre, para que el equipo de estrategia sepa *hacia cual de los 4 mundos se mueve el entorno* y active la palanca correspondiente.

**Eje regulatorio** (permisivo ← → estricto)

| Senal | Estado actual | Threshold | Si se activa... |
|-------|---------------|-----------|----------------|
| Agencia de Datos emite primera multa a entidad financiera | No detectado | Multa > CLP 100M | → Regulacion estricta (Esc. 1 o 3) |
| CMF modifica NCG 412 con requisitos especificos de IA | No detectado | Circular oficial | → Regulacion estricta |
| SERNAC crea unidad especifica de IA y servicios financieros | No detectado | Anuncio institucional | → Regulacion estricta |
| Agencia publica solo guias genericas, 0 multas en primer ano | Pendiente (dic 2026) | 12 meses sin enforcement | → Regulacion permisiva (Esc. 2 o 4) |

**Eje de adopcion** (lenta ← → rapida)

| Senal | Estado actual | Threshold | Si se activa... |
|-------|---------------|-----------|----------------|
| Fintechs superan 3M de clientes activos en Chile | Emergente | Reportes trimestrales | → Adopcion rapida (Esc. 1 o 2) |
| Churn del segmento 25-40 supera 10% anual | 8% actual | Metricas internas | → Adopcion rapida |
| Competidor lanza producto IA con reconocimiento | **Emergente** (Banco de Chile) | Premio o cobertura positiva | → Adopcion rapida |
| Uso de sucursales fisicas se mantiene estable o crece | Monitoreo | Contadores de visitas | → Adopcion lenta (Esc. 3 o 4) |

**Wild cards** (cualquier escenario)

| Senal | Estado actual | Threshold |
|-------|---------------|-----------|
| Brecha de datos en entidad financiera chilena | No detectado | >100K registros comprometidos |
| Video viral de falla de chatbot con adulto mayor | No detectado | >500K reproducciones en 48h |
| Movilizacion sindical bancaria nacional | No detectado | Paro en 3+ medios nacionales |

La ventana de oportunidad regulatoria cierra en diciembre 2026. Las organizaciones que implementen IA antes de esa fecha con un modelo auditable y explicable tendran ventaja. Las que no, enfrentaran multas de hasta CLP 325 millones y dano reputacional.

---

## Sobre Dasein Foresight

Somos una consultora de prospectiva estrategica que ayuda a organizaciones a tomar mejores decisiones sobre implementacion de inteligencia artificial. No vendemos software. No vendemos predicciones. Vendemos claridad estrategica.

**Nuestra diferencia:** Combinamos simulacion con IA (nuestra plataforma SignalTwin), escenarios 2x2 con analisis de robustez (tradicion Schwartz/GBN), ontologia linguistica que analiza no solo *que* dicen los actores sino *que tipo de compromiso asumen*, y un sistema de signposts con umbrales concretos — todo entregado como recomendacion accionable con palancas de ajuste, no como documento academico.

### Tres formas de trabajar con nosotros

| Servicio | Que incluye | Plazo | Inversion |
|----------|-------------|-------|-----------|
| **Lectura de Campo** | Escaneo de 15-25 senales + memo ejecutivo + mapa de stakeholders + signposts | 5 dias | Desde USD 2,500 |
| **Simulacion Estrategica** | Simulacion completa dual-world + escenarios + dashboard + workshop con equipo directivo | 4-5 semanas | Desde USD 12,000 |
| **Radar Estrategico** | Monitoreo continuo + alertas de senales criticas + simulacion trimestral actualizada | Continuo (min. 6 meses) | Desde USD 5,000/mes |

### Hablemos

Si su organizacion esta evaluando implementar IA y necesita claridad sobre los escenarios posibles, los riesgos reales y las senales que debe monitorear, nos gustaria conversar.

**Agende una conversacion exploratoria de 30 minutos** — sin compromiso, sin PowerPoints.

info@daseinforesight.com

*Pensar antes de implementar tambien es una decision estrategica.*

---

**Dasein Foresight** — Simulamos futuros para que decidas mejor hoy.
