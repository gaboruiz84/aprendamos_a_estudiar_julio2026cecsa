export type ItemId = "pirueta-patineta" | "escudo-comunidad" | "cancion-pirata" | "artcase-sv"

export type QuestionType = "radio" | "text" | "textarea" | "math" | "keyword-list" | "info"

export interface SubFieldConfig {
  id: string
  label: string
  placeholder?: string
}

export interface QuestionConfig {
  id: string
  type: QuestionType
  label: string
  description?: string
  options?: { value: string; label: string }[]
  correctAnswer?: string
  required?: boolean
  placeholder?: string
  sub?: boolean
  subFields?: SubFieldConfig[]
  variant?: "default" | "strategy"
  math?: boolean
}

export interface PhaseConfig {
  phase: number
  title: string
  imageUrl?: string
  questions: QuestionConfig[]
}

export interface ItemConfig {
  id: ItemId
  title: string
  subtitle?: string
  subject: string
  phases: PhaseConfig[]
}

export interface Answer {
  id: string
  itemId: ItemId
  phase: number
  questionId: string
  type: QuestionType
  value: string | string[]
  correct: boolean | null
  difficulty?: Difficulty
  timestamp: number
}

export interface ProgressState {
  itemId: ItemId
  phase: number
  completed: boolean
  answersCount: number
  totalQuestions: number
}

export type Difficulty = "easy" | "medium" | "hard"

export interface StudentInfo {
  name: string
  nie: string
}

export interface SubmitPayload {
  answers: Answer[]
  studentId: string
  studentName: string
  studentNie: string
  timestamp: number
}

export interface SubmitResponse {
  success: boolean
  id?: string
  error?: string
}
