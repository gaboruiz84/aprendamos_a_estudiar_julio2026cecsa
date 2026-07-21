import { z } from "zod"

export const answerSchema = z.object({
  id: z.string().min(1),
  itemId: z.enum(["pirueta-patineta", "escudo-comunidad", "cancion-pirata", "artcase-sv"]),
  phase: z.number().int().min(1).max(5),
  questionId: z.string().min(1),
  type: z.enum(["radio", "text", "textarea", "math", "keyword-list", "info"]),
  value: z.union([z.string(), z.array(z.string())]),
  correct: z.boolean().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  timestamp: z.number(),
})

export const submitPayloadSchema = z.object({
  answers: z.array(answerSchema).min(1),
  studentId: z.string().min(1),
  studentName: z.string().min(1),
  studentNie: z.string().min(1),
  timestamp: z.number(),
})

export function validateAnswer(data: unknown) {
  return answerSchema.safeParse(data)
}

export function validateSubmitPayload(data: unknown) {
  return submitPayloadSchema.safeParse(data)
}
