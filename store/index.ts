import { create } from "zustand"
import { persist } from "zustand/middleware"
import { STORAGE_PREFIX } from "@/lib/constants"
import type { Answer, Difficulty, ItemId, QuestionType } from "@/lib/types"

interface AnswersState {
  answers: Record<string, Answer>
  setAnswer: (
    itemId: ItemId,
    phase: number,
    questionId: string,
    type: QuestionType,
    value: string | string[],
    correct: boolean | null,
    difficulty?: Difficulty,
  ) => void
  setAnswerDifficulty: (itemId: ItemId, questionId: string, difficulty: Difficulty) => void
  getItemAnswers: (itemId: ItemId) => Answer[]
  clearAnswers: () => void
}

interface ProgressState {
  progress: Record<string, { phase: number; completed: boolean }>
  markPhaseComplete: (itemId: ItemId, phase: number) => void
  getItemProgress: (itemId: ItemId) => number
}

type AppState = AnswersState & ProgressState

function answerKey(itemId: ItemId, questionId: string) {
  return `${itemId}-${questionId}`
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      answers: {},
      setAnswer: (itemId, phase, questionId, type, value, correct, difficulty) => {
        const key = answerKey(itemId, questionId)
        const existing = get().answers[key]
        const answer: Answer = {
          id: key,
          itemId,
          phase,
          questionId,
          type,
          value,
          correct,
          difficulty: difficulty ?? existing?.difficulty,
          timestamp: Date.now(),
        }
        set((s) => ({ answers: { ...s.answers, [key]: answer } }))
      },
      setAnswerDifficulty: (itemId, questionId, difficulty) => {
        const key = answerKey(itemId, questionId)
        const existing = get().answers[key]
        if (existing) {
          set((s) => ({
            answers: {
              ...s.answers,
              [key]: { ...existing, difficulty, timestamp: Date.now() },
            },
          }))
        }
      },
      getItemAnswers: (itemId) => {
        const all = get().answers
        return Object.values(all).filter((a) => a.itemId === itemId)
      },
      clearAnswers: () => set({ answers: {} }),

      progress: {},
      markPhaseComplete: (itemId, phase) => {
        const key = itemId
        set((s) => ({
          progress: {
            ...s.progress,
            [key]: { phase, completed: true },
          },
        }))
      },
      getItemProgress: (itemId) => {
        const answers = get().getItemAnswers(itemId)
        if (answers.length === 0) return 0
        return Math.min(100, Math.round((answers.length / 10) * 100))
      },
    }),
    {
      name: `${STORAGE_PREFIX}store`,
      partialize: (state) => ({
        answers: state.answers,
        progress: state.progress,
      }),
    },
  ),
)
