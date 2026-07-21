"use client"

import { useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { useStore } from "@/store"
import { Button } from "@/components/ui/button"
import { FormEngine } from "@/components/form/form-engine"
import { PhaseNav } from "@/components/layout/phase-nav"
import { ProgressBar } from "@/components/layout/progress-bar"
import { useStudent } from "@/components/student/student-provider"
import { submitAnswers } from "@/lib/submit-client"
import type { ItemConfig } from "@/lib/types"

interface ItemShellProps {
  config: ItemConfig
}

export function ItemShell({ config }: ItemShellProps) {
  const answers = useStore((s) => s.answers)
  const getItemAnswers = useStore((s) => s.getItemAnswers)
  const markPhaseComplete = useStore((s) => s.markPhaseComplete)
  const { studentId, studentName, studentNie } = useStudent()
  const progress = useStore((s) => s.getItemProgress(config.id))

  const isPhaseComplete = useCallback(
    (phaseNum: number) => {
      const p = config.phases.find((ph) => ph.phase === phaseNum)
      if (!p) return false
      return p.questions
        .filter((q) => q.required)
        .every((q) => {
          const key = `${config.id}-${q.id}`
          const a = answers[key]
          if (!a) return false
          if (!a.difficulty) return false
          const v = a.value
          if (q.subFields) {
            if (!Array.isArray(v)) return false
            return q.subFields.every((_, idx) => v[idx] && v[idx].trim().length > 0)
          }
          if (Array.isArray(v)) return v.some((s) => s.trim().length > 0)
          return typeof v === "string" && v.trim().length > 0
        })
    },
    [config, answers],
  )

  const phaseLocked = useCallback(
    (phaseNum: number) => {
      for (const p of config.phases) {
        if (p.phase >= phaseNum) break
        if (!isPhaseComplete(p.phase)) return true
      }
      return false
    },
    [config, isPhaseComplete],
  )

  const firstIncomplete = useMemo(() => {
    for (const p of config.phases) {
      if (!isPhaseComplete(p.phase)) return p.phase
    }
    return config.phases[config.phases.length - 1].phase
  }, [config, isPhaseComplete])

  const [currentPhase, setCurrentPhase] = useState(firstIncomplete)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phaseErrors, setPhaseErrors] = useState<Record<number, boolean>>({})

  const isLastPhase = currentPhase === config.phases[config.phases.length - 1].phase
  const phase = config.phases.find((p) => p.phase === currentPhase)
  const canAdvance = phase ? isPhaseComplete(phase.phase) : false

  function goToPhase(targetPhase: number) {
    if (phaseLocked(targetPhase)) return
    const complete = isPhaseComplete(currentPhase)
    setPhaseErrors((prev) => ({ ...prev, [currentPhase]: !complete }))
    if (complete || targetPhase < currentPhase) {
      if (complete) markPhaseComplete(config.id, currentPhase)
      setCurrentPhase(targetPhase)
    }
  }

  function advance() {
    const idx = config.phases.findIndex((p) => p.phase === currentPhase)
    if (idx < config.phases.length - 1) {
      goToPhase(config.phases[idx + 1].phase)
    }
  }

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      const itemAnswers = getItemAnswers(config.id)
      await submitAnswers({
        answers: itemAnswers,
        studentId,
        studentName,
        studentNie,
        timestamp: Date.now(),
      })
      setSubmitted(true)
    } catch (err) {
      console.error("Error al enviar:", err)
      alert(
        err instanceof Error
          ? err.message
          : "Hubo un error al enviar tus respuestas. Por favor intentá de nuevo.",
      )
    } finally {
      setSubmitting(false)
    }
  }, [config.id, getItemAnswers, studentId, studentName, studentNie])

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-green-100 p-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-zinc-800">Respuestas enviadas</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Tus respuestas se guardaron correctamente.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          {config.subject}
        </span>
        <h1 className="mt-1 text-lg font-bold text-zinc-900 sm:text-xl">{config.title}</h1>
        {config.subtitle && (
          <p className="text-xs text-zinc-500 sm:text-sm">{config.subtitle}</p>
        )}
      </div>

      <PhaseNav
        phases={config.phases}
        currentPhase={currentPhase}
        onPhaseChange={(p) => goToPhase(p)}
        isPhaseComplete={isPhaseComplete}
        phaseLocked={phaseLocked}
      />

      <ProgressBar value={progress} />

      {phase?.imageUrl && (
        <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:p-4">
          <Image
            src={phase.imageUrl}
            alt="Diagrama del problema"
            width={400}
            height={300}
            className="mx-auto h-auto w-full max-w-sm object-contain"
            priority={currentPhase === 1}
          />
        </div>
      )}

      {phase && (
        <div>
          <FormEngine itemId={config.id} phase={phase} />
          {phaseErrors[phase.phase] && !canAdvance && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              Respondé todas las preguntas y marcá tu reacción (😁😑😢) antes de avanzar.
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
        <Button
          variant="secondary"
          onClick={() => goToPhase(currentPhase - 1)}
          disabled={currentPhase <= (config.phases[0]?.phase ?? 1)}
          className="px-3 text-xs sm:px-4 sm:text-sm"
        >
          Anterior
        </Button>

        {isLastPhase ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || !canAdvance}
            className="px-3 text-xs sm:px-4 sm:text-sm"
          >
            {submitting ? "Enviando..." : "Finalizar ítem"}
          </Button>
        ) : (
          <Button variant="primary" onClick={advance} disabled={!canAdvance}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  )
}
