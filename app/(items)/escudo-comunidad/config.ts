import type { ItemConfig } from "@/lib/types"

export const escudoConfig: ItemConfig = {
  id: "escudo-comunidad",
  title: "Escudo de la comunidad",
  subtitle: "Vacunación y pensamiento crítico",
  subject: "Ciencia",
  phases: [
    {
      phase: 1,
      title: "Exploramos el fenómeno",
      imageUrl: "/images/page_4_image_2.png",
      questions: [
        {
          id: "q-context",
          type: "info",
          label: "Situación",
          description: `Martha y Mateo, estudiantes del centro escolar Marañón Japonés, están colaborando con la Unidad de Salud local en una jornada de vacunación contra la Influenza y el Tétanos. Para informar a sus compañeros, analizan un informe técnico que contiene dos gráficos clave del período 2010-2024 en su región.

• El primer dato muestra el porcentaje de la población estudiantil que recibió sus vacunas cada año (cobertura de vacunación).

• El segundo dato muestra el número de casos de enfermedades respiratorias graves reportados en la clínica escolar en ese mismo tiempo.

Mateo, al ver que cuando la vacunación sube, las enfermedades bajan, concluye: _Esto es simple: si nos vacunamos, nadie en la escuela volverá a estornudar ni a tener fiebre nunca más, porque la vacuna elimina cualquier posibilidad de síntomas._

Martha observa los datos con más cuidado y nota que en el año 2021, a pesar de que casi todos estaban vacunados, hubo un pequeño brote de fiebre y malestar. Ella le dice: _Tu conclusión es muy extrema. Los datos muestran que la vacuna es un escudo, pero no funciona exactamente como tú piensas._`,
        },
        {
          id: "q-instructions",
          type: "info",
          label: "Indicaciones",
          description: `Analizá la situación de Martha y Mateo, quienes investigan la salud escolar mediante un gráfico que cruza la Cobertura de Vacunación (línea sólida) y la Incidencia de Enfermedad (línea punteada).`,
        },
        {
          id: "p1",
          type: "text",
          label: "① Mateo afirma que la salud depende solo de la vacuna. Según el contexto, ¿qué dos datos se están comparando para analizar la protección de la comunidad?",
          required: true,
          placeholder: "Los datos que se comparan son...",
        },
      ],
    },
    {
      phase: 2,
      title: "Activamos herramientas científicas",
      questions: [
        {
          id: "p2",
          type: "radio",
          label: "② Al observar los datos históricos de salud en El Salvador, ¿cuál de los siguientes principios científicos permite analizar mejor esta situación?",
          required: true,
          correctAnswer: "A",
          options: [
            {
              value: "A",
              label: "La identificación de correlaciones entre prevención y propagación.",
            },
            {
              value: "B",
              label: "La clasificación biológica de los diferentes tipos de virus respiratorios.",
            },
            {
              value: "C",
              label: "El análisis del tiempo de incubación de una bacteria en un laboratorio.",
            },
            {
              value: "D",
              label: "El registro aislado del número de pacientes atendidos en emergencias por año.",
            },
          ],
        },
        {
          id: "p3",
          type: "radio",
          label: "③ Observá el gráfico: Hay un punto donde la línea de vacunación llega al 95%, pero la línea de 'personas con síntomas leves' no llega a cero, sino que sube ligeramente. ¿Qué indica esto sobre los efectos secundarios naturales de una vacuna?",
          required: true,
          correctAnswer: "B",
          options: [
            {
              value: "A",
              label: "Porque la vacuna inyecta el virus vivo y fuerte para enfermarnos.",
            },
            {
              value: "B",
              label: "Porque el sistema inmune genera una respuesta (fiebre leve) al aprender a fabricar anticuerpos.",
            },
            {
              value: "C",
              label: "Porque las vacunas solo funcionan en adultos y no en estudiantes.",
            },
            {
              value: "D",
              label: "Porque la vacuna borra la memoria de los glóbulos blancos.",
            },
          ],
        },
      ],
    },
    {
      phase: 3,
      title: "Aplicamos y razonamos",
      questions: [
        {
          id: "p4",
          type: "radio",
          label: "④ En un año donde la cobertura fue baja (ej. 60%), el número de hospitalizaciones fue de 40 casos. Si al año siguiente la vacunación sube al 90% y los casos bajan a 2, ¿qué valor de eficacia demuestra la vacuna?",
          required: true,
          correctAnswer: "C",
          options: [
            { value: "A", label: "10%" },
            { value: "B", label: "50%" },
            { value: "C", label: "95%" },
            { value: "D", label: "0% (no funcionó)" },
          ],
        },
        {
          id: "p5",
          type: "radio",
          label: "⑤ Martha sostiene que la conclusión de Mateo es inexacta. Según la ciencia, ¿qué evidencia le da la razón a Martha sobre por qué vacunarse no evita 'todos' los síntomas?",
          required: true,
          correctAnswer: "B",
          options: [
            {
              value: "A",
              label: "Porque la vacuna inyecta el virus vivo y fuerte para enfermarnos.",
            },
            {
              value: "B",
              label: "Porque el sistema inmune genera una respuesta (fiebre leve) al aprender a fabricar anticuerpos.",
            },
            {
              value: "C",
              label: "Porque las vacunas solo funcionan en adultos y no en estudiantes.",
            },
            {
              value: "D",
              label: "Porque la vacuna borra la memoria de los glóbulos blancos.",
            },
          ],
        },
        {
          id: "p6",
          type: "radio",
          label: "⑥ Si observamos la 'Tendencia general' de los últimos 15 años, ¿qué se concluye sobre la vacunación masiva?",
          required: true,
          correctAnswer: "B",
          options: [
            {
              value: "A",
              label: "No tiene ningún impacto en la salud pública.",
            },
            {
              value: "B",
              label: "Aunque hay casos aislados, reduce significativamente las muertes y hospitalizaciones.",
            },
            {
              value: "C",
              label: "Hace que los virus se vuelvan más grandes y visibles.",
            },
            {
              value: "D",
              label: "Solo sirve para que los estudiantes pierdan clases.",
            },
          ],
        },
        {
          id: "p7",
          type: "radio",
          label: "⑦ ¿Qué función cumple analizar los años donde hubo 'brotes' a pesar de la vacuna (divergencia) en esta actividad?",
          required: true,
          correctAnswer: "B",
          options: [
            {
              value: "A",
              label: "Para decir que las vacunas no sirven para nada.",
            },
            {
              value: "B",
              label: "Para entender que existen otros factores (mutación del virus, higiene) además de la vacuna.",
            },
            {
              value: "C",
              label: "Para demostrar que el personal de salud cometió un error de datos.",
            },
            {
              value: "D",
              label: "Para calcular el tiempo exacto que tarda una vacuna en hacer efecto en el cuerpo de un estudiante.",
            },
          ],
        },
        {
          id: "p8",
          type: "textarea",
          label: "⑧ Escribí basándote en lo discutido: ¿Por qué es científicamente incorrecto decir que una vacuna es un 'campo de fuerza mágico' que evita cualquier síntoma en el cuerpo?",
          required: true,
          placeholder: "Es incorrecto porque...",
        },
      ],
    },
    {
      phase: 4,
      title: "Evaluamos nuestras conclusiones",
      questions: [
        {
          id: "p9",
          type: "textarea",
          label: "⑨ Reflexioná. ¿Qué te parece más convincente para explicarle a tu familia la importancia de las vacunas: mostrarles la gráfica de reducción de enfermedades o explicarles cómo funcionan los glóbulos blancos? ¿Por qué?",
          required: true,
          placeholder: "Explicá tu respuesta...",
        },
      ],
    },
  ],
}
