"use client"

import { useCallback, useState } from "react"
import { useStore } from "@/store"
import { RadioField } from "./radio-field"
import { TextField } from "./text-field"
import { TextareaField } from "./textarea-field"
import { MultiTextField } from "./multi-text-field"
import { InfoField } from "./info-field"
import { Reaction } from "@/components/ui/reaction"
import type { Difficulty, PhaseConfig, ItemId } from "@/lib/types"

interface FormEngineProps {
  itemId: ItemId
  phase: PhaseConfig
}

export function FormEngine({ itemId, phase }: FormEngineProps) {
  const setAnswer = useStore((s) => s.setAnswer)
  const setAnswerDifficulty = useStore((s) => s.setAnswerDifficulty)
  const storedAnswers = useStore((s) => s.answers)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const getStoredValue = useCallback(
    (questionId: string): string => {
      const key = `${itemId}-${questionId}`
      const a = storedAnswers[key]
      if (!a) return ""
      return Array.isArray(a.value) ? a.value.join(", ") : a.value
    },
    [itemId, storedAnswers],
  )

  const getStoredArray = useCallback(
    (questionId: string): string[] => {
      const key = `${itemId}-${questionId}`
      const a = storedAnswers[key]
      if (!a) return []
      return Array.isArray(a.value) ? a.value : [a.value]
    },
    [itemId, storedAnswers],
  )

  const getStoredDifficulty = useCallback(
    (questionId: string): Difficulty | undefined => {
      return storedAnswers[`${itemId}-${questionId}`]?.difficulty
    },
    [itemId, storedAnswers],
  )

  const handleChange = useCallback(
    (questionId: string, value: string | string[]) => {
      const question = phase.questions.find((q) => q.id === questionId)
      if (!question) return

      const correct =
        question.type === "radio" && question.correctAnswer
          ? value === question.correctAnswer
          : null

      setAnswer(itemId, phase.phase, questionId, question.type, value, correct)

      if (errors[questionId]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[questionId]
          return next
        })
      }
    },
    [itemId, phase, setAnswer, errors],
  )

  const handleDifficulty = useCallback(
    (questionId: string, difficulty: Difficulty) => {
      setAnswerDifficulty(itemId, questionId, difficulty)
    },
    [itemId, setAnswerDifficulty],
  )

  function hasAllReactions(): boolean {
    return phase.questions
      .filter((q) => q.type !== "info")
      .every((q) => getStoredDifficulty(q.id) !== undefined)
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    for (const q of phase.questions) {
      if (!q.required || q.type === "info") continue
      if (q.subFields) {
        const v = getStoredArray(q.id)
        const empty = v.length === 0 || q.subFields.some((_, idx) => !v[idx] || v[idx].trim().length === 0)
        if (empty) {
          newErrors[q.id] = "Completá todos los espacios"
        }
      } else {
        const v = getStoredValue(q.id)
        if (!v || (typeof v === "string" && v.trim().length === 0)) {
          newErrors[q.id] = "Este campo es obligatorio"
        }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="space-y-8">
      {phase.questions.map((question) => {
        const error = errors[question.id]
        const onChange = (v: string | string[]) => handleChange(question.id, v)

        return (
          <div key={question.id} className={question.sub ? "ml-8 pl-4 border-l-2 border-zinc-200" : ""}>
            {question.type === "info" && question.sub ? (
              <p className="text-sm font-semibold text-zinc-800">{question.label}</p>
            ) : question.type === "info" ? (
              <InfoField question={question} />
            ) : question.subFields ? (
              <div>
                <MultiTextField
                  question={question}
                  value={getStoredArray(question.id)}
                  onChange={onChange as (v: string[]) => void}
                  error={error}
                />
                <div className="mt-2 ml-10">
                  <Reaction
                    value={getStoredDifficulty(question.id)}
                    onChange={(d) => handleDifficulty(question.id, d)}
                  />
                </div>
              </div>
            ) : (
              <div>
                {question.type === "radio" ? (
                  <RadioField
                    question={question}
                    value={getStoredValue(question.id)}
                    onChange={onChange as (v: string) => void}
                    error={error}
                  />
                ) : question.type === "text" ? (
                  <TextField
                    question={question}
                    value={getStoredValue(question.id)}
                    onChange={onChange as (v: string) => void}
                    error={error}
                  />
                ) : (
                  <TextareaField
                    question={question}
                    value={getStoredValue(question.id)}
                    onChange={onChange as (v: string) => void}
                    error={error}
                  />
                )}
                <div className="mt-2 ml-10">
                  <Reaction
                    value={getStoredDifficulty(question.id)}
                    onChange={(d) => handleDifficulty(question.id, d)}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
