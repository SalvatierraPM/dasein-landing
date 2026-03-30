# Pipeline de Ventas — Dasein Foresight

> 6 etapas. No inventes más.

---

## Etapas

| # | Etapa | Definición | Acción requerida |
|---|-------|-----------|-----------------|
| 1 | **Lead nuevo** | Contacto identificado, aún sin calificar | Investigar empresa, agendar discovery call |
| 2 | **Calificado** | Discovery call hecha, score > 20/35 | Preparar propuesta |
| 3 | **Llamada agendada** | Reunión de presentación/propuesta agendada | Enviar one-pager antes de la llamada |
| 4 | **Propuesta enviada** | Propuesta formal enviada al cliente | Follow-up a los 3 y 7 días |
| 5 | **Negociación** | Cliente interesado, discutiendo términos | Resolver objeciones, ajustar alcance/precio si necesario |
| 6 | **Ganado / Perdido** | Decisión tomada | Si ganado → onboarding. Si perdido → documentar razón. |

---

## Reglas del pipeline

- **Cada lead tiene un próximo paso con fecha.** Si no lo tiene, está muerto.
- **Si un lead no avanza en 30 días**, baja una etapa o se marca como perdido.
- **Revisar pipeline cada lunes** (15 min, no más).
- **No perseguir leads con score < 20/35** — enviar one-pager y dejar puerta abierta.
- **Tiempo máximo de cotización**: 48 horas después de la llamada de presentación.

---

## Lead Tracker

> [DECISIÓN CEO/CTO: Elegir herramienta]
> Opciones recomendadas: Google Sheets (simple), Notion (si lo mantienen), Airtable (si escalan)

### Campos del tracker

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| Empresa | Texto | BancoEstado |
| Contacto | Texto | María González |
| Cargo | Texto | Gerente de Innovación |
| Email | Email | mgonzalez@bancoestado.cl |
| Teléfono | Tel | +56 9 1234 5678 |
| Industria | Select | Banca / Minería / Educación / Público / Otro |
| País | Select | Chile / México / Colombia / Otro |
| Origen | Select | LinkedIn / Referido / Evento / Inbound / Cold email |
| Servicio de interés | Select | Lectura de Campo / Simulación Estratégica / Radar |
| Dolor principal | Texto largo | Implementación de IA sin claridad regulatoria |
| Urgencia (1-10) | Número | 7 |
| Presupuesto estimado | Número (USD) | 12,000 |
| Decision-maker identificado | Sí/No | Sí |
| Etapa del pipeline | Select | 1-6 (ver arriba) |
| Probabilidad de cierre (%) | Número | 40% |
| Monto estimado (USD) | Número | 12,000 |
| Último contacto | Fecha | 2026-03-29 |
| Próximo paso | Texto | Enviar propuesta |
| Fecha próximo paso | Fecha | 2026-04-02 |
| Qualification score | Número | 29/35 |
| Notas | Texto largo | Referido por X, interesado en caso similar a BancoEstado |

---

## Métricas clave (revisar mensualmente)

- Leads nuevos este mes
- Tasa de calificación (leads → calificados)
- Propuestas enviadas
- Tasa de cierre (propuestas → ganados)
- Ticket promedio
- Tiempo promedio de ciclo de venta
- Pipeline total (suma de montos × probabilidad)
