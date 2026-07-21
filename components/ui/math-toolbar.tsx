"use client"

import { useRef } from "react"

const SYMBOLS = [
  "²", "³", "√", "π", "±", "×", "÷",
  "≥", "≤", "≠", "∞", "Δ", "θ", "∑",
]

interface MathToolbarProps {
  textareaId: string
}

export function MathToolbar({ textareaId }: MathToolbarProps) {
  function insert(sym: string) {
    const el = document.getElementById(textareaId) as HTMLTextAreaElement | null
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const before = el.value.slice(0, start)
    const after = el.value.slice(end)
    el.value = before + sym + after
    const pos = start + sym.length
    el.selectionStart = pos
    el.selectionEnd = pos
    el.focus()
    el.dispatchEvent(new Event("input", { bubbles: true }))
  }

  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1.5">
      {SYMBOLS.map((sym) => (
        <button
          key={sym}
          type="button"
          onPointerDown={(e) => { e.preventDefault(); insert(sym) }}
          className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 active:text-zinc-900 touch-manipulation"
        >
          {sym}
        </button>
      ))}
    </div>
  )
}
