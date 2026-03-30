# Dasein Foresight — Carpeta Operativa

> Estructura mínima para vender como consultora real.
> Basada en mentoría Paperclip (2026-03-29).

---

## Estructura

```
docs/ops/
├── 00-master/           # Fuente de verdad
│   ├── Dasein_Master_Offer.md    # Servicios, pricing, naming oficial
│   └── Dasein_ICPs.md           # Perfiles de cliente ideal
├── 01-sales/            # Pipeline y tracking
│   └── Pipeline_Definition.md   # Etapas, campos del tracker, reglas
├── 02-discovery/        # Calificación de leads
│   ├── Discovery_Call_Template.md     # Guía para discovery calls
│   └── Lead_Qualification_Score.md   # Scoring 1-5 en 7 criterios
├── 03-proposals/        # Materiales comerciales
│   └── README.md        # Pointers a assets HTML en docs/assets/
├── 04-legal/            # Contratos y política de pagos
│   ├── MSA_Service_Agreement.md      # Contrato marco
│   └── Invoice_and_Payment_Policy.md # Política de facturación
├── 05-delivery/         # Ejecución de proyectos
│   ├── Client_Onboarding_Checklist.md
│   ├── Kickoff_Agenda.md
│   ├── Weekly_Update_Template.md
│   └── Final_Delivery_Template.md
└── 06-cases/            # Casos de estudio
    └── Case_Study_Template.md
```

## Dashboard

Abrir `docs/ops/index.html` en el browser para ver todos los docs con links navegables.

## Assets HTML (en `docs/assets/`)

| Asset | Archivo |
|-------|---------|
| One-pager | `one-pager.html` |
| Deck comercial (9 slides) | `deck-comercial.html` |
| Proposal template | `proposal-template.html` |
| NDA | `nda-template.html` |
| SOW | `sow-template.html` |

---

## Pendientes CEO

| Item | Ubicación | Decisión requerida |
|------|-----------|-------------------|
| IVA y facturación | `04-legal/Invoice_and_Payment_Policy.md` | ¿Factura en USD o CLP? ¿Contribuyente IVA? |
| Atraso en pagos | `04-legal/Invoice_and_Payment_Policy.md` | ¿Interés? ¿Cobranza? |
| Pausa de proyecto | `04-legal/Invoice_and_Payment_Policy.md` | ¿30 o 60 días para considerar terminado? |
| Reembolsos | `04-legal/Invoice_and_Payment_Policy.md` | ¿Política de reembolso? |
| Descuentos piloto | `04-legal/Invoice_and_Payment_Policy.md` | ¿Descuento a primeros clientes? |
| Caso 2 | `03-proposals/README.md` | ¿Cuál es el segundo caso para el deck? |
| Lead Tracker | `01-sales/Pipeline_Definition.md` | ¿Google Sheets, Notion, o Airtable? |

## Pendientes CTO

| Item | Decisión requerida |
|------|-------------------|
| Lead Tracker | Setup de la herramienta elegida con los campos definidos |

---

## Los 5 urgentes (según mentoría)

1. ~~Master Offer~~ → **HECHO** `00-master/Dasein_Master_Offer.md`
2. Lead Tracker → **Definición HECHA** `01-sales/Pipeline_Definition.md` — falta setup en herramienta
3. ~~Discovery Call Template~~ → **HECHO** `02-discovery/Discovery_Call_Template.md`
4. ~~Proposal Template~~ → **HECHO** `docs/assets/proposal-template.html`
5. ~~NDA + SOW~~ → **HECHO** `docs/assets/nda-template.html` + `sow-template.html`
