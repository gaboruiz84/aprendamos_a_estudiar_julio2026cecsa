"use client"

import { RadioGroup } from "@/components/ui/radio-group"
import { FieldWrapper } from "./field-wrapper"
import type { QuestionConfig } from "@/lib/types"

interface RadioFieldProps {
  question: QuestionConfig
  value: string
  onChange: (value: string) => void
  error?: string
}

export function RadioField({ question, value, onChange, error }: RadioFieldProps) {
  return (
    <FieldWrapper
      label={question.label}
      description={question.description}
      required={question.required}
      error={error}
    >
      <RadioGroup
        options={question.options ?? []}
        value={value}
        onChange={onChange}
        name={question.id}
      />
    </FieldWrapper>
  )
}
