import type { ItemConfig } from "@/lib/types"

const POEM = `Con diez cañones por banda, viento en popa, a toda vela,
no corta el mar, sino vuela un velero bergantín.

Bajel pirata que llaman, por su bravura, el Temido,
en todo mar conocido del uno al otro confín.

(...)

Que es mi barco mi tesoro, que es mi dios la libertad,
mi ley, la fuerza y el viento, mi única patria, la mar.

— José de Espronceda`

export const cancionConfig: ItemConfig = {
  id: "cancion-pirata",
  title: "La canción del pirata",
  subtitle: "José de Espronceda — Comprensión lectora",
  subject: "Lectura",
  phases: [
    {
      phase: 1,
      title: "Anticipa",
      questions: [
        {
          id: "q-instructions",
          type: "info",
          label: "Indicaciones",
          description: "Leé atentamente las instrucciones de cada fase y hacé lo que se te pide. Respondé las siguientes preguntas.",
        },
        {
          id: "p1",
          type: "text",
          label: "① Tomando en cuenta el título, ¿de qué creés que tratará el texto?",
          required: true,
          placeholder: "Creo que tratará sobre...",
        },
      ],
    },
    {
      phase: 2,
      title: "Busca información",
      questions: [
        {
          id: "q-poem",
          type: "info",
          label: "Lee el texto",
          description: POEM,
        },
        {
          id: "p2",
          type: "text",
          label: "② Lee el texto para identificar las palabras clave. ¿Cuáles encontraste?",
          required: true,
          placeholder: "Ej: cañones, viento, mar, pirata, libertad...",
        },
        {
          id: "p3",
          type: "text",
          label: "③ Explicá el significado de «bravura» (valentía) en el contexto del poema.",
          required: true,
          placeholder: "Bravura significa...",
        },
        {
          id: "p4",
          type: "text",
          label: "④ Según la última estrofa, ¿cuál es la única patria del pirata?",
          required: true,
          placeholder: "La única patria del pirata es...",
        },
      ],
    },
    {
      phase: 3,
      title: "Comprende",
      questions: [
        {
          id: "q-instructions-2",
          type: "info",
          label: "",
          description: "Respondé con base en el texto.",
        },
        {
          id: "p5",
          type: "textarea",
          label: "⑤ ¿Cuál es la idea principal o el tema central del poema?",
          required: true,
          placeholder: "El tema central del poema es...",
        },
      ],
    },
  ],
}
