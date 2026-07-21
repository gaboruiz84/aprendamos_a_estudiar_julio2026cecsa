"use client"

import { Button } from "@/components/ui/button"
import type { PhaseConfig } from "@/lib/types"

const PHASE_ICONS: Record<number, string> = {
  1: "🔍",
  2: "🧰",
  3: "📖",
  4: "✅",
  5: "🏆",
}

interface PhaseNavProps {
  phases: PhaseConfig[]
  currentPhase: number
  onPhaseChange: (phase: number) => void
  isPhaseComplete?: (phase: number) => boolean
  phaseLocked?: (phase: number) => boolean
}

export function PhaseNav({ phases, currentPhase, onPhaseChange, isPhaseComplete, phaseLocked }: PhaseNavProps) {
  return (
    <nav className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none" aria-label="Fases">
      {phases.map((p) => {
        const isActive = p.phase === currentPhase
        const complete = isPhaseComplete?.(p.phase) ?? false
        const locked = phaseLocked?.(p.phase) ?? false

        return (
          <Button
            key={p.phase}
            variant={isActive ? "primary" : complete ? "secondary" : "ghost"}
            onClick={() => onPhaseChange(p.phase)}
            disabled={locked && !complete && !isActive}
            className={`shrink-0 gap-1 px-2.5 py-2 text-xs leading-tight sm:gap-2 sm:px-4 sm:py-2 sm:text-sm
              touch-manipulation
              ${locked && !complete && !isActive ? "opacity-40" : ""}
            `}
          >
            <span className="relative shrink-0 text-base sm:text-lg">
              {PHASE_ICONS[p.phase] ?? "📝"}
              {complete && (
                <span className="absolute -right-1.5 -top-1.5 text-[8px] sm:text-[10px]">✅</span>
              )}
            </span>
            <span className="truncate leading-tight">
              <span className="hidden sm:inline">{p.title}</span>
              <span className="sm:hidden">Fase {p.phase}</span>
            </span>
            {locked && !complete && !isActive && (
              <span className="text-xs shrink-0">🔒</span>
            )}
          </Button>
        )
      })}
    </nav>
  )
}
