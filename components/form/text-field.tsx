"use client"

import { Input } from "@/components/ui/input"
import { FieldWrapper } from "./field-wrapper"
import type { QuestionConfig } from "@/lib/types"

interface TextFieldProps {
  question: QuestionConfig
  value: string
  onChange: (value: string) => void
  error?: string
}

export function TextField({ question, value, onChange, error }: TextFieldProps) {
  return (
    <FieldWrapper
      label={question.label}
      description={question.description}
      required={question.required}
      error={error}
    >
      <Input
        id={question.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
      />
    </FieldWrapper>
  )
}
