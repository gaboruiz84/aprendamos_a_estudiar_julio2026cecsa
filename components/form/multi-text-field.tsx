"use client"

import { Input } from "@/components/ui/input"
import { FieldWrapper } from "./field-wrapper"
import type { QuestionConfig } from "@/lib/types"

interface MultiTextFieldProps {
  question: QuestionConfig
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

export function MultiTextField({ question, value, onChange, error }: MultiTextFieldProps) {
  const fields = question.subFields ?? []

  function handleSubChange(idx: number, val: string) {
    const next = [...value]
    while (next.length <= idx) next.push("")
    next[idx] = val
    onChange(next)
  }

  return (
    <FieldWrapper
      label={question.label}
      description={question.description}
      required={question.required}
      error={error}
    >
      <div className="space-y-4">
        {fields.map((field, idx) => (
          <div key={field.id}>
            <label
              htmlFor={`${question.id}-${field.id}`}
              className="mb-1 block text-sm font-medium text-zinc-600"
            >
              {field.label}
            </label>
            <Input
              id={`${question.id}-${field.id}`}
              value={value[idx] ?? ""}
              onChange={(e) => handleSubChange(idx, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </FieldWrapper>
  )
}
