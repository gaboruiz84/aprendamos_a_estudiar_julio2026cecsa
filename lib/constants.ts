export const ITEMS = {
  "pirueta-patineta": { title: "Pirueta en patineta", subject: "Ciencia", order: 1 },
  "escudo-comunidad": { title: "Escudo de la comunidad", subject: "Ciencia", order: 2 },
  "cancion-pirata": { title: "La canción del pirata", subject: "Lectura", order: 3 },
  "artcase-sv": { title: "El emprendimiento de ArtCase SV", subject: "Matemática", order: 4 },
} as const

export const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL ?? ""
export const AUTOSAVE_INTERVAL_MS = 30_000
export const STORAGE_PREFIX = "cuadernillo-"
export const STUDENT_ID_KEY = `${STORAGE_PREFIX}student-id`
export const TEACHER_PIN = process.env.NEXT_PUBLIC_TEACHER_PIN ?? "2026"
