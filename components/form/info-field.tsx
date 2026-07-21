import type { QuestionConfig } from "@/lib/types"

function formatText(text: string): string {
  const boldReplaced = text.replace(/\*\*([^*]+)\*\*/g, "⟪$1⟫")
  return boldReplaced
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ""

      const lines = trimmed.split("\n")
      const formattedLines = lines.map((line) => {
        return line.replace(/_([^_]+)_/g, "‹$1›")
      })

      return formattedLines.join("\n")
    })
    .join("\n\n")
}

function renderParts(text: string) {
  const formatted = formatText(text)
  const parts = formatted.split(/(‹[^‹]+›|⟪[^⟪]+⟫)/g)
  return parts.map((part, i) => {
    if (part.startsWith("‹") && part.endsWith("›")) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    if (part.startsWith("⟪") && part.endsWith("⟫")) {
      return <strong key={i} className="font-bold">{part.slice(1, -1)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export function InfoField({ question }: { question: QuestionConfig }) {
  const raw = question.description ?? ""

  if (question.variant === "strategy") {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        {question.label && (
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-lg text-white">🎯</span>
            <h3 className="text-base font-bold text-amber-900">{question.label}</h3>
          </div>
        )}
        {raw && (
          <div className="space-y-3 whitespace-pre-wrap text-sm leading-relaxed text-amber-950">
            <div>{renderParts(raw)}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
      {question.label && (
        <h3 className="mb-2 text-sm font-semibold text-blue-800">{question.label}</h3>
      )}
      {raw && (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-blue-900">
          {renderParts(raw)}
        </div>
      )}
    </div>
  )
}
