"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ITEMS } from "@/lib/constants"
import { useStudent } from "@/components/student/student-provider"
import { StudentSelector } from "@/components/student/student-selector"
import { useStore } from "@/store"
import { piruetaConfig } from "@/app/(items)/pirueta-patineta/config"
import { escudoConfig } from "@/app/(items)/escudo-comunidad/config"
import { cancionConfig } from "@/app/(items)/cancion-pirata/config"
import { artcaseConfig } from "@/app/(items)/artcase-sv/config"
import type { ItemConfig, Difficulty } from "@/lib/types"

function isItemComplete(config: ItemConfig, answers: Record<string, { value: string | string[]; difficulty?: Difficulty }>): boolean {
  for (const phase of config.phases) {
    for (const q of phase.questions) {
      if (!q.required) continue
      const key = `${config.id}-${q.id}`
      const a = answers[key]
      if (!a) return false
      if (!a.difficulty) return false
      const v = a.value
      if (q.subFields) {
        if (!Array.isArray(v)) return false
        if (!q.subFields.every((_, idx) => v[idx] && v[idx].trim().length > 0)) return false
      } else if (Array.isArray(v)) {
        if (!v.some((s) => s.trim().length > 0)) return false
      } else if (typeof v !== "string" || v.trim().length === 0) {
        return false
      }
    }
  }
  return true
}

const ALL_CONFIGS: ItemConfig[] = [
  piruetaConfig,
  escudoConfig,
  cancionConfig,
  artcaseConfig,
]

export default function Home() {
  const { studentName } = useStudent()
  const answers = useStore((s) => s.answers)

  const allComplete = useMemo(
    () => ALL_CONFIGS.every((cfg) => isItemComplete(cfg, answers)),
    [answers],
  )

  if (!studentName) {
    return (
      <div className="mx-auto max-w-md py-12">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-zinc-900">Aprendamos a Estudiar, JULIO 2026</h1>
          <p className="mt-1 text-sm text-zinc-500">Cuadernillo de estudio — 9° Grado</p>
        </div>
        <StudentSelector />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-zinc-900">Aprendamos a Estudiar, JULIO 2026</h1>
        <p className="text-sm text-zinc-500">
          Cuadernillo de estudio — 9° Grado. Seleccioná un ítem para comenzar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.entries(ITEMS) as [string, typeof ITEMS[keyof typeof ITEMS]][]).map(
          ([id, item]) => {
            const completed = isItemComplete(
              ALL_CONFIGS.find((c) => c.id === id)!,
              answers,
            )
            return (
              <Link
                key={id}
                href={`/${id}`}
                className={`group rounded-lg border bg-white p-4 transition-all hover:shadow-sm ${
                  completed
                    ? "border-green-300 hover:border-green-400"
                    : "border-zinc-200 hover:border-blue-300"
                }`}
              >
                <div className="relative mb-3 flex items-center justify-center">
                  {id === "pirueta-patineta" && (
                    <div className="relative animate-float">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200">
                        <svg viewBox="0 0 48 48" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="14" cy="34" r="5" stroke="currentColor" />
                          <circle cx="34" cy="34" r="5" stroke="currentColor" />
                          <rect x="8" y="28" width="32" height="4" rx="2" stroke="currentColor" />
                          <path d="M24 28 L24 18" stroke="currentColor" strokeLinecap="round" />
                          <path d="M18 20 C18 14 30 14 30 20" stroke="currentColor" strokeLinecap="round" />
                          <path d="M16 10 L20 14 L24 10 L28 14 L32 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-white shadow-sm">★</span>
                    </div>
                  )}
                  {id === "escudo-comunidad" && (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-200 animate-pulse-ring">
                      <svg viewBox="0 0 48 48" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M24 4 L6 12 L6 22 C6 34 14 42 24 46 C34 42 42 34 42 22 L42 12 Z" stroke="currentColor" strokeLinejoin="round" />
                        <path d="M16 24 L22 30 L32 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  {id === "cancion-pirata" && (
                    <div className="animate-wiggle">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-200">
                        <svg viewBox="0 0 48 48" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M24 8 L24 28" stroke="currentColor" strokeLinecap="round" />
                          <ellipse cx="24" cy="32" rx="6" ry="4" stroke="currentColor" />
                          <path d="M30 28 L42 10" stroke="currentColor" strokeLinecap="round" />
                          <path d="M30 22 L42 14" stroke="currentColor" strokeLinecap="round" />
                          <path d="M8 14 L18 10 L18 20 Z" stroke="currentColor" strokeLinejoin="round" />
                          <path d="M18 10 L22 12" stroke="currentColor" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {id === "artcase-sv" && (
                    <div className="animate-float" style={{ animationDelay: "0.3s" }}>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-violet-600 shadow-lg shadow-purple-200">
                        <svg viewBox="0 0 48 48" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" />
                          <path d="M18 22 L22 26 L30 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 34 L18 30" stroke="currentColor" strokeLinecap="round" />
                          <path d="M32 34 L30 30" stroke="currentColor" strokeLinecap="round" />
                          <rect x="16" y="32" width="16" height="6" rx="1" stroke="currentColor" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {completed && (
                    <div className="absolute right-2 top-2">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {item.subject}
                  </span>
                  {id === "pirueta-patineta" && (
                    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Ejemplo
                    </span>
                  )}
                  {completed && (
                    <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                      Completado
                    </span>
                  )}
                </div>
                <h2 className="mt-1 text-base font-semibold text-zinc-800 group-hover:text-blue-600">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ítem {item.order} de {Object.keys(ITEMS).length}
                </p>
              </Link>
            )
          },
        )}
      </div>

      {allComplete && (
        <div className="flex justify-center border-t border-zinc-200 pt-6">
          <Link
            href="/imprimir"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Descargar cuadernillo (PDF)
          </Link>
        </div>
      )}
    </div>
  )
}
