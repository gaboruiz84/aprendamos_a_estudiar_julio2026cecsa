import type { ItemConfig } from "@/lib/types"

export const artcaseConfig: ItemConfig = {
  id: "artcase-sv",
  title: "El emprendimiento de ArtCase SV",
  subtitle: "Funciones cuadráticas y optimización",
  subject: "Matemática",
  phases: [
    {
      phase: 1,
      title: "El desafío",
      imageUrl: "/images/page_10_image_3.png",
      questions: [
        {
          id: "q-context",
          type: "info",
          label: "Contexto del problema",
          description: `Sofía es una joven universitaria salvadoreña que ha lanzado su propio emprendimiento: ArtCase SV. Ella fabrica fundas para celulares con diseños inspirados en la cultura de El Salvador (paisajes volcánicos, torogoces y surf).

Actualmente, Sofía vende sus fundas a un precio de $12.00 cada una y, en promedio, vende 50 fundas al mes a través de Instagram. Sofía necesita aumentar sus ingresos mensuales exactos a $680.00 para invertir en una nueva máquina de impresión.

La estrategia de mercado: Sofía ha investigado y calcula que por cada $1.00 que aumente el precio de sus fundas, venderá 2 fundas menos al mes. Ella puede elegir entre dos estrategias de precios para lograr su objetivo de ingresos.`,
        },
        {
          id: "q-strategy",
          type: "info",
          label: "Diseña una estrategia matemática para ayudar a Sofía",
          variant: "strategy",
          description: `Realizá los siguientes procesos:

• **Pregunta 1:** Identificá los dos diferentes precios que Sofía podría cobrar por funda para obtener exactamente los $680.00 de ingreso total.
• **Pregunta 2:** Calculá la cantidad de fundas que debe elaborar al mes por cada opción.
• **Pregunta 3:** Compará las dos opciones basándote en un criterio lógico y respondé. ¿Cuál de las dos opciones le recomendarías a Sofía y por qué?`,
        },
        {
          id: "q1",
          type: "text",
          label: "① ¿Qué te pide encontrar el problema?",
          required: true,
          subFields: [
            { id: "p1", label: "• De la pregunta 1 (identificar precios)", placeholder: "Escribí tu respuesta..." },
            { id: "p2", label: "• De la pregunta 2 (calcular fundas)", placeholder: "Escribí tu respuesta..." },
            { id: "p3", label: "• De la pregunta 3 (comparar y recomendar)", placeholder: "Escribí tu respuesta..." },
          ],
        },
        {
          id: "q2",
          type: "text",
          label: "② ¿Qué datos te brinda el problema?",
          required: true,
          placeholder: "Escribí los datos que identificaste...",
        },
      ],
    },
    {
      phase: 2,
      title: "La caja de herramientas",
      questions: [
        {
          id: "q3",
          type: "text",
          label: "③ ¿Qué contenido matemático puede ayudarte a resolver el problema?",
          required: true,
          placeholder: "Escribí el contenido matemático...",
        },
      ],
    },
    {
      phase: 3,
      title: "Aplicación al mundo real",
      questions: [
        {
          id: "q4",
          type: "textarea",
          label: "④ Aplicá los procedimientos que conocés.",
          description: "Desarrollá: Resolvé las preguntas 1 y 2 paso a paso.\n\nRespondé: Escribí tu respuesta final para cada opción.",
          required: true,
          placeholder: "Desarrollá tus cálculos paso a paso...",
          math: true,
        },
      ],
    },
    {
      phase: 4,
      title: "Validación de resultados",
      questions: [
        {
          id: "q5",
          type: "text",
          label: "⑤ ¿Qué información del problema utilizaste para determinar la ecuación correcta sobre los ingresos de las fundas?",
          required: true,
          placeholder: "Explicá qué información usaste...",
        },
        {
          id: "q6",
          type: "textarea",
          label: "⑥ Justificá si tu razonamiento matemático recomendó a Sofía la mejor opción para sus ingresos de las fundas.",
          required: true,
          placeholder: "Justificá tu razonamiento...",
        },
      ],
    },
    {
      phase: 5,
      title: "RETO",
      questions: [
        {
          id: "q-reto",
          type: "textarea",
          label: "🏆 Descubrí la ganancia real de Sofía",
          math: true,
          description: `Sofía está feliz porque sabe cómo hacer que ingresen $680.00 a su cuenta. Sin embargo, ella olvidó calcular algo crucial: los materiales no son gratis. Hacer cada funda (resina, tinta, empaque) le cuesta $4.00.

Sabiendo esto: ¿Cuál de las dos tarifas que descubriste le deja la mayor ganancia libre (es decir, lo que le queda después de pagar los materiales)?

Demostrá matemáticamente de cuánto es la diferencia de ganancia entre una opción y otra.`,
          required: true,
          placeholder: "Desarrollá tus cálculos y escribí tu respuesta...",
        },
      ],
    },
  ],
}
