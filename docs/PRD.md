# PRD — Cuadernillo Interactivo MINED 2026

## 1. Resumen Ejecutivo

Plataforma web interactiva que digitaliza el cuadernillo de estudio "Aprendamos a Estudiar" para 9° grado del MINED El Salvador. Los estudiantes resuelven ítems de ciencia, lectura y matemática directamente en el navegador. Las respuestas se persisten en Google Sheets mediante Google Apps Script.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Zustand, Google Apps Script, Google Sheets.

---

## 2. Objetivos

- Digitalizar la experiencia del cuadernillo impreso a una versión web interactiva.
- Capturar respuestas de los estudiantes en una hoja de cálculo centralizada.
- Permitir progreso parcial (guardado automático, reanudación).
- Proveer retroalimentación inmediata en ítems de opción múltiple.
- Funcionar offline (fase futura) y online.

---

## 3. Contenido del Cuadernillo

### 3.1 Ítem 1: Pirueta en patineta (Física)
- **Tema:** Conservación de la energía mecánica
- **Formato:** Enunciado + gráfico + explicación paso a paso + MCQ (4 opciones)
- **Páginas:** 1 portada + 2 contenido
- **Inputs:** 1 radio button

### 3.2 Ítem 2: Escudo de la comunidad (Salud)
- **Tema:** Vacunación, datos epidemiológicos, pensamiento crítico
- **Formato:** 4 fases con preguntas progresivas
- **Páginas:** 4
- **Inputs:** 4 radios, 4 text inputs, 3 textareas, 1 cálculo numérico

### 3.3 Ítem 3: La canción del pirata (Lectura)
- **Tema:** Comprensión lectora, análisis poético
- **Formato:** 3 fases (anticipar, buscar, comprender)
- **Páginas:** 2
- **Inputs:** 2 text inputs, 1 keyword list, 2 textareas

### 3.4 Ítem 4: ArtCase SV (Matemática)
- **Tema:** Funciones cuadráticas, optimización, emprendimiento
- **Formato:** 4 fases + RETO final
- **Páginas:** 3
- **Inputs:** 3 text inputs, 1 math/equation field, 5 textareas

---

## 4. Funcionalidades

### Core
| Funcionalidad | Prioridad | Descripción |
|--------------|-----------|-------------|
| Visor de ítems | P0 | Renderizar cada ítem con su contenido, imágenes y fases |
| Formularios interactivos | P0 | Radio buttons, text inputs, textareas, math input |
| Validación en cliente | P0 | Zod schemas por tipo de campo |
| Persistencia a Google Sheets | P0 | Envío vía API Route → GAS → Sheets |
| Guardado automático | P1 | Zustand persist + autosave cada 30s |
| Progreso parcial | P1 | Reanudar desde donde quedó (localStorage) |
| Feedback MCQ | P1 | Indicar correcta/incorrecta tras responder |
| Navegación por fases | P1 | Tabs internos por fase dentro de cada ítem |
| Barra de progreso | P2 | % completado por ítem y global |

### Futuras
| Funcionalidad | Prioridad |
|--------------|-----------|
| Modo offline (Service Worker) | P3 |
| Panel docente (Dashboard) | P3 |
| Soporte multimodal (audio, video) | P3 |
| Exportar PDF con respuestas | P3 |

---

## 5. Arquitectura

```
┌────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐           │
│  │  Items   │  │ Form     │  │ Zustand   │           │
│  │ (Server) │  │ Engine   │  │ Store     │           │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘           │
│       │              │              │                  │
│  ┌────┴──────────────┴──────────────┴──────────────┐  │
│  │              API Routes                          │  │
│  │  POST /api/submit  → GAS (proxy)                │  │
│  │  GET  /api/config  → GAS (sync configuración)   │  │
│  └─────────────────────┬───────────────────────────┘  │
└────────────────────────┼──────────────────────────────┘
                         │ HTTPS
┌────────────────────────┼──────────────────────────────┐
│            Google Apps Script                          │
│  doPost(e) → escribe en Sheets                        │
│  doGet(e)  → lee configuración desde Sheets           │
└────────────────────────┼──────────────────────────────┘
                         │
┌────────────────────────┼──────────────────────────────┐
│            Google Sheets                               │
│  Hoja "Respuestas": timestamp, item, phase, q, ans    │
│  Hoja "Config":       item, field, type, options      │
│  Hoja "Progreso":     student, item, phase, status    │
└───────────────────────────────────────────────────────┘
```

---

## 6. Data Model

```typescript
interface Answer {
  id: string;                    // uuid
  studentId: string;             // identificación anónima
  itemId: "pirueta-patineta" | "escudo-comunidad" | "cancion-pirata" | "artcase-sv";
  phase: number;                 // 1-4
  questionId: string;
  type: "radio" | "text" | "textarea" | "math" | "keyword-list";
  value: string | string[];
  correct?: boolean;
  timestamp: number;
}

interface ItemConfig {
  id: string;
  title: string;
  phases: PhaseConfig[];
}

interface PhaseConfig {
  phase: number;
  questions: QuestionConfig[];
}

interface QuestionConfig {
  id: string;
  type: "radio" | "text" | "textarea" | "math" | "keyword-list";
  label: string;
  options?: string[];         // para radio
  correctAnswer?: string;     // para feedback opcional
  required: boolean;
}
```

---

## 7. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js | 16.2.10 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.x |
| State global | Zustand | latest |
| Validación | Zod | latest |
| Math rendering | KaTeX | latest |
| Backend proxy | API Routes (Next.js) | - |
| BBDD | Google Sheets | - |
| Middleware | Google Apps Script | - |
| Linting | ESLint | 9.x |

---

## 8. QA y Rendimiento

- **Lighthouse objetivo:** 90+ Performance, 95+ Accessibility
- **Bundle:** Cada página de ítem debe ser lazy-loaded
- **Tiempo de carga:** First paint < 1.5s en 3G simulado
- **Accesibilidad:** WCAG 2.1 AA (roles ARIA, navegación por teclado, contraste)
- **Responsive:** Mobile-first (320px → 1920px)
- **SEO:** No aplica (plataforma cerrada para estudiantes)

---

## 9. Criterios de Éxito

- 100% de campos del PDF implementados y funcionales.
- Envío exitoso a Sheets verificado en QA.
- Guardado automático funcional con reanudación.
- Sin errores de TypeScript en build.
- Sin warnings de accesibilidad en axe DevTools.
