"use client"

import { useId } from "react"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name?: string
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  const uid = useId()
  const groupName = name ?? uid

  return (
    <div className="flex flex-col gap-3" role="radiogroup">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors
            ${value === opt.value
              ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
              : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
        >
          <input
            type="radio"
            name={groupName}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
          />
          <span className="text-sm leading-5 text-zinc-800">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
