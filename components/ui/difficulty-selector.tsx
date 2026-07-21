"use client"

import type { Difficulty } from "@/lib/types"

interface DifficultySelectorProps {
  value: Difficulty | undefined
  onChange: (d: Difficulty) => void
}

const OPTIONS: { value: Difficulty; emoji: string; label: string }[] = [
  { value: "easy", emoji: "😁", label: "Fácil" },
  { value: "medium", emoji: "😑", label: "Intermedio" },
  { value: "hard", emoji: "😢", label: "Difícil" },
]

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
      <p className="mb-3 text-sm font-semibold text-zinc-700">
        ¿Qué tan difícil te pareció este ejercicio?
      </p>
      <div className="flex justify-center gap-4">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-xl px-6 py-3 text-center transition-all
                ${
                  selected
                    ? "bg-blue-100 ring-2 ring-blue-500 scale-110"
                    : "bg-white hover:bg-zinc-100 ring-1 ring-zinc-200"
                }`}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className={`text-xs font-medium ${selected ? "text-blue-700" : "text-zinc-500"}`}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
