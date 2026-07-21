"use client"

import { Textarea } from "@/components/ui/textarea"
import { FieldWrapper } from "./field-wrapper"
import { MathToolbar } from "@/components/ui/math-toolbar"
import type { QuestionConfig } from "@/lib/types"

interface TextareaFieldProps {
  question: QuestionConfig
  value: string
  onChange: (value: string) => void
  error?: string
}

export function TextareaField({ question, value, onChange, error }: TextareaFieldProps) {
  return (
    <FieldWrapper
      label={question.label}
      description={question.description}
      required={question.required}
      error={error}
    >
      {question.math && <MathToolbar textareaId={question.id} />}
      <Textarea
        id={question.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
      />
    </FieldWrapper>
  )
}
