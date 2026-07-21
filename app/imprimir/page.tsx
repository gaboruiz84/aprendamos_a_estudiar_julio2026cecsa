"use client"

import { useMemo } from "react"
import { useStore } from "@/store"
import { useStudent } from "@/components/student/student-provider"
import { piruetaConfig } from "@/app/(items)/pirueta-patineta/config"
import { escudoConfig } from "@/app/(items)/escudo-comunidad/config"
import { cancionConfig } from "@/app/(items)/cancion-pirata/config"
import { artcaseConfig } from "@/app/(items)/artcase-sv/config"
import type { ItemConfig, Answer, Difficulty } from "@/lib/types"

const SCHOOL_NAME = "CENTRO ESCOLAR CANTON SAN ANTONIO"
const SCHOOL_CODE = "82112"

const ALL_ITEMS: ItemConfig[] = [
  piruetaConfig,
  escudoConfig,
  cancionConfig,
  artcaseConfig,
]

const DIFF_CONFIG: Record<Difficulty, { emoji: string; color: string; label: string }> = {
  easy: { emoji: "😁", color: "bg-green-400", label: "Fácil" },
  medium: { emoji: "😑", color: "bg-yellow-400", label: "Intermedio" },
  hard: { emoji: "😢", color: "bg-red-400", label: "Difícil" },
}

export default function ImprimirPage() {
  const { studentName, studentNie } = useStudent()
  const answers = useStore((s) => s.answers)

  function getAnswer(itemId: string, questionId: string): Answer | undefined {
    return answers[`${itemId}-${questionId}`]
  }

  const itemStats = useMemo(() => {
    return ALL_ITEMS.map((item) => {
      const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 }
      let total = 0
      for (const phase of item.phases) {
        for (const q of phase.questions) {
          if (q.type === "info") continue
          const a = getAnswer(item.id, q.id)
          if (a?.difficulty) {
            counts[a.difficulty]++
            total++
          }
        }
      }
      return { itemId: item.id, title: item.title, counts, total }
    })
  }, [answers])

  const overallCounts = useMemo(() => {
    const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 }
    let total = 0
    for (const s of itemStats) {
      for (const k of Object.keys(counts) as Difficulty[]) {
        counts[k] += s.counts[k]
        total += s.counts[k]
      }
    }
    return { counts, total }
  }, [itemStats])

  return (
    <div className="space-y-8 py-3">
      <div className="border-b-2 border-zinc-800 pb-4 text-center">
        <h1 className="text-base font-bold uppercase tracking-tight">
          Aprendamos a Estudiar, JULIO 2026
        </h1>
        <p className="mt-0.5 text-xs text-zinc-500">Cuadernillo de estudio — 9° Grado</p>
        <div className="mt-3 space-y-0.5 text-xs">
          <p className="font-semibold">{SCHOOL_NAME}</p>
          <p>Código: {SCHOOL_CODE}</p>
          <p>Estudiante: <span className="font-semibold">{studentName || "____________________"}</span></p>
          <p>NIE: <span className="font-semibold">{studentNie || "____________________"}</span></p>
        </div>
      </div>

      {overallCounts.total > 0 && (
        <DifSummary counts={overallCounts.counts} total={overallCounts.total} />
      )}

      {ALL_ITEMS.map((item, idx) => {
        const stats = itemStats[idx]
        return (
          <section key={item.id} className={idx > 0 ? "break-before-page" : ""}>
            <div className="mb-3 border-b border-zinc-300 pb-1.5">
              <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                {item.subject}
              </span>
              <h2 className="mt-0.5 text-sm font-bold text-zinc-900">{item.title}</h2>
              {item.subtitle && <p className="text-[10px] text-zinc-500">{item.subtitle}</p>}
            </div>

            {stats.total > 0 && (
              <div className="mb-3 flex items-center gap-3 text-xs">
                <span className="text-zinc-500">Dificultad:</span>
                <div className="flex gap-2">
                  {(Object.entries(DIFF_CONFIG) as [Difficulty, typeof DIFF_CONFIG[Difficulty]][]).map(
                    ([key, cfg]) => {
                      const pct = stats.total > 0 ? Math.round((stats.counts[key] / stats.total) * 100) : 0
                      return (
                        <div key={key} className="flex items-center gap-1">
                          <span>{cfg.emoji}</span>
                          <div className="h-2 w-10 overflow-hidden rounded-full bg-zinc-200" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
                            <div className={`h-full rounded-full ${cfg.color}`} style={{ width: `${pct}%`, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }} />
                          </div>
                          <span className="text-[10px] text-zinc-400">{stats.counts[key]}</span>
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
            )}

            {item.phases.map((phase) => (
              <div key={phase.phase} className="mb-4">
                <h3 className="mb-2 text-[11px] font-bold text-zinc-600 uppercase tracking-wide">
                  Fase {phase.phase}: {phase.title}
                </h3>

                {phase.imageUrl && (
                  <div className="mb-2 flex justify-center">
                    <img src={phase.imageUrl} alt="" className="max-h-24 object-contain" />
                  </div>
                )}

                <div className="space-y-3">
                  {phase.questions.map((q) => {
                    const a = getAnswer(item.id, q.id)

                    if (q.type === "info") {
                      return (
                        <div
                          key={q.id}
                          className={`rounded border p-2.5 text-xs leading-relaxed ${
                            q.variant === "strategy"
                              ? "border-amber-200 bg-amber-50"
                              : "border-blue-100 bg-blue-50"
                          }`}
                        >
                          {q.label && <p className="mb-0.5 font-semibold">{q.label}</p>}
                          {q.description && <p className="whitespace-pre-wrap">{q.description}</p>}
                        </div>
                      )
                    }

                    const diffCfg = a?.difficulty ? DIFF_CONFIG[a.difficulty] : null

                    const borderColors: Record<string, string> = { easy: "#22c55e", medium: "#eab308", hard: "#ef4444" }
                    const diffKey = a?.difficulty
                    return (
                      <div key={q.id} className="rounded border border-zinc-200 p-2.5" style={diffKey ? { borderLeft: `4px solid ${borderColors[diffKey]}` } : {}}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-zinc-800 leading-snug flex-1">
                            {q.label}
                          </p>
                          {diffCfg && (
                            <span className="shrink-0 text-base leading-none">{diffCfg.emoji}</span>
                          )}
                        </div>

                        {q.subFields ? (
                          <div className="mt-1.5 space-y-1">
                            {q.subFields.map((sf, sIdx) => {
                              const val = Array.isArray(a?.value) ? a.value[sIdx] || "" : ""
                              return val ? (
                                <div key={sf.id} className="text-[10px]">
                                  <span className="text-zinc-400">{sf.label}</span>
                                  <p className="mt-0.5 rounded bg-zinc-50 px-2 py-1 text-xs text-zinc-700">
                                    {val}
                                  </p>
                                </div>
                              ) : null
                            })}
                          </div>
                        ) : q.type === "radio" && a?.value ? (
                          <p className="mt-1 rounded bg-zinc-50 px-2 py-1 text-xs text-zinc-700">
                            {a.value}. {q.options?.find((o) => o.value === a.value)?.label}
                          </p>
                        ) : a?.value ? (
                          <p className="mt-1 rounded bg-zinc-50 px-2 py-1 text-xs text-zinc-700 whitespace-pre-wrap">
                            {Array.isArray(a.value) ? a.value.filter(Boolean).join(" / ") : a.value}
                          </p>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </section>
        )
      })}

      <div className="no-print flex flex-col gap-3 border-t border-zinc-200 pt-5">
        <button
          onClick={() => window.print()}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white active:bg-blue-700"
        >
          Guardar PDF
        </button>
        <p className="text-center text-[10px] text-zinc-400">
          En Chrome: seleccioná "Guardar como PDF" o "Google Drive" como destino.
        </p>
        <button
          onClick={() => window.history.back()}
          className="w-full rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 active:bg-zinc-50"
        >
          Volver
        </button>
      </div>
    </div>
  )
}

function DifSummary({ counts, total }: { counts: Record<Difficulty, number>; total: number }) {
  const items = (Object.entries(DIFF_CONFIG) as [Difficulty, typeof DIFF_CONFIG[Difficulty]][]).map(
    ([key, cfg]) => {
      const pct = Math.round((counts[key] / total) * 100)
      return { ...cfg, count: counts[key], pct }
    },
  )

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-zinc-700 uppercase tracking-wide">
        Resumen de dificultad
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-5 text-center text-sm">{item.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-0.5">
                <span>{item.label}</span>
                <span>{item.count} ({item.pct}%)</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
                <div
                  className={`h-full rounded-full ${item.color} transition-all`}
                  style={{ width: `${item.pct}%`, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
