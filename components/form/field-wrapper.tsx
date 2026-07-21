import { type ReactNode } from "react"

const CIRCLED_NUM_RE = /^([①②③④⑤⑥⑦⑧⑨⑩])\s*(.*)$/

function parseLabel(label: string): { number: string | null; text: string } {
  const match = label.match(CIRCLED_NUM_RE)
  if (!match) return { number: null, text: label }

  const circledMap: Record<string, string> = {
    "①": "1", "②": "2", "③": "3", "④": "4", "⑤": "5",
    "⑥": "6", "⑦": "7", "⑧": "8", "⑨": "9", "⑩": "10",
  }

  return { number: circledMap[match[1]] ?? null, text: match[2] }
}

interface FieldWrapperProps {
  label: string
  description?: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function FieldWrapper({ label, description, required, error, children }: FieldWrapperProps) {
  const { number, text } = parseLabel(label)

  return (
    <fieldset className="space-y-2">
      <legend className="flex items-start gap-3 text-sm font-semibold text-zinc-800">
        {number && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {number}
          </span>
        )}
        <span className="pt-0.5">
          {text}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      </legend>
      {description && (
        <p className="ml-10 text-sm text-zinc-500">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}
    </fieldset>
  )
}
