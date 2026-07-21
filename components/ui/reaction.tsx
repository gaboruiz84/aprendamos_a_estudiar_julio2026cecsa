import type { Difficulty } from "@/lib/types"

const OPTIONS: { value: Difficulty; emoji: string }[] = [
  { value: "easy", emoji: "😁" },
  { value: "medium", emoji: "😑" },
  { value: "hard", emoji: "😢" },
]

interface ReactionProps {
  value?: Difficulty
  onChange: (d: Difficulty) => void
}

export function Reaction({ value, onChange }: ReactionProps) {
  return (
    <div className="flex items-center gap-1">
      {OPTIONS.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-base transition-all
              ${selected ? "scale-110 ring-2 ring-blue-500 bg-blue-50" : "opacity-40 hover:opacity-100 hover:scale-105"}
            `}
            title={opt.value === "easy" ? "Fácil" : opt.value === "medium" ? "Intermedio" : "Difícil"}
          >
            {opt.emoji}
          </button>
        )
      })}
    </div>
  )
}
