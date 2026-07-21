import type { ItemConfig } from "@/lib/types"

export const piruetaConfig: ItemConfig = {
  id: "pirueta-patineta",
  title: "Pirueta en patineta",
  subtitle: "Ítem de ejemplo — Conservación de la energía mecánica",
  subject: "Ciencia",
  phases: [
    {
      phase: 1,
      title: "El problema",
      imageUrl: "/images/page_2_image_1.png",
      questions: [
        {
          id: "q-instructions",
          type: "info",
          label: "Indicaciones",
          description: `A continuación, se presenta un ejercicio de ejemplo con su explicación detallada. Analizá la situación, el gráfico y el procedimiento de resolución para comprender cómo responder este tipo de preguntas en la prueba.`,
        },
        {
          id: "q-scenario",
          type: "info",
          label: "Situación",
          description: `En una feria en San Salvador, un joven se desliza en una rampa extrema de patinaje. El joven parte del reposo desde el punto más alto de la rampa (Punto A), desciende libremente perdiendo altura y ganando velocidad hasta llegar a la parte más baja (Punto B), para finalmente subir y detenerse momentáneamente en el extremo opuesto (Punto C).

Suponé que la fricción entre la patineta y la rampa es tan pequeña que puede despreciarse.`,
        },
        {
          id: "q-mcq",
          type: "radio",
          label: "Tomando en cuenta el Principio de conservación de la energía mecánica, ¿cuál de las siguientes afirmaciones describe correctamente la transformación de energía que experimenta el patinador durante todo su trayecto desde el punto A hasta el punto C?",
          required: true,
          correctAnswer: "B",
          options: [
            {
              value: "A",
              label: "En el Punto A la energía cinética es máxima; al bajar al Punto B la energía potencial aumenta, y en el Punto C toda la energía se destruye.",
            },
            {
              value: "B",
              label: "En el Punto A la energía potencial es máxima; al descender al Punto B esta se transforma por completo en energía cinética, y al subir al Punto C la energía cinética vuelve a transformarse en energía potencial.",
            },
            {
              value: "C",
              label: "En el Punto B el patinador no posee ningún tipo de energía porque se encuentra al nivel del suelo, por lo que la energía mecánica total disminuye en ese punto.",
            },
            {
              value: "D",
              label: "La energía cinética se mantiene constante y con el mismo valor en los puntos A, B y C, ya que la energía total del sistema no puede cambiar.",
            },
          ],
        },
      ],
    },
    {
      phase: 2,
      title: "La explicación",
      questions: [
        {
          id: "q-explanation-header",
          type: "info",
          label: "¿Cómo se resuelve este ítem? (Explicación para el estudiante)",
          description: "",
        },
        {
          id: "q-explanation-1",
          type: "info",
          label: "Paso 1: Analizar el concepto científico básico",
          description: `El Principio de conservación de la energía nos dice que la energía no se crea ni se destruye, solo se transforma. En este sistema mecánico sin fricción, la energía mecánica total (Suma de Energía Potencial + Energía Cinética) permanece constante, pero sus componentes cambian según la altura y la velocidad.`,
        },
        {
          id: "q-explanation-2",
          type: "info",
          label: "Paso 2: Evaluar el comportamiento en cada punto",
          description: `En el Punto A (Altura máxima, en reposo): Al estar en reposo, su velocidad es cero (energía cinética igual a cero), pero tiene la máxima altura, por lo que su energía potencial es máxima.

En el Punto B (Punto más bajo): Ha perdido toda la altura (energía potencial llega a cero) y ha ganado la máxima velocidad, lo que significa que la energía potencial se transformó completamente en energía cinética.

En el Punto C (Vuelve a subir y se detiene): Al ganar altura pierde velocidad. Cuando se detiene por completo, la energía cinética vuelve a ser cero y se ha transformado nuevamente en energía potencial.`,
        },
        {
          id: "q-explanation-3",
          type: "info",
          label: "Paso 3: Seleccionar la respuesta",
          description: `Revisando las opciones, la opción B describe con total exactitud este proceso de transformación constante entre energía potencial y cinética. Por lo tanto, la opción correcta es la B.`,
        },
      ],
    },
  ],
}
