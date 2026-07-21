"use client"

import { useEffect, useState } from "react"
import { ITEMS, TEACHER_PIN } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AnswerRow {
  Timestamp: string
  StudentID: string
  StudentName: string
  StudentNIE: string
  ItemID: string
  Phase: string
  QuestionID: string
  Type: string
  Value: string
  Correct: string
  Difficulty: string
}

interface StudentSummary {
  name: string
  nie: string
  items: Record<string, { answers: number; phases: Set<number>; completed: boolean }>
  totalAnswers: number
}

const ITEM_IDS = Object.keys(ITEMS)

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState(false)
  const [data, setData] = useState<AnswerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem("dashboard_auth") === "1") {
      setAuthed(true)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authed) return
    async function load() {
      try {
        const res = await fetch("/api/answers")
        const json = await res.json()
        if (json.success) {
          setData(json.answers as AnswerRow[])
        } else {
          setError(json.error ?? "Error al cargar datos")
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error de conexión")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [authed])

  function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    if (pin === TEACHER_PIN) {
      sessionStorage.setItem("dashboard_auth", "1")
      setAuthed(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm py-20">
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-zinc-900">Dashboard Docente</h1>
            <p className="mt-1 text-sm text-zinc-500">Ingresá el PIN para acceder</p>
          </div>
          <Input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false) }}
            placeholder="PIN"
            className="text-center text-lg"
            autoFocus
          />
          {pinError && (
            <p className="text-center text-sm text-red-600">PIN incorrecto</p>
          )}
          <Button type="submit" variant="primary" className="w-full">
            Acceder
          </Button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-zinc-500">Cargando datos del dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    )
  }

  const students = buildStudentSummaries(data)
  const studentNames = Object.keys(students)
  const totalSubmissions = data.length
  const completedItems = studentNames.filter((n) =>
    ITEM_IDS.every((id) => students[n].items[id]?.completed),
  ).length

  const diffCounts: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
  for (const row of data) {
    const d = row.Difficulty?.toLowerCase()
    if (d === "fácil" || d === "easy") diffCounts.easy++
    else if (d === "intermedio" || d === "medium") diffCounts.medium++
    else if (d === "difícil" || d === "hard") diffCounts.hard++
  }
  const totalDiff = diffCounts.easy + diffCounts.medium + diffCounts.hard

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">Dashboard Docente</h1>
        <p className="mt-1 text-sm text-zinc-500">Aprendamos a Estudiar, JULIO 2026 — Resumen de respuestas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Estudiantes" value={studentNames.length} />
        <StatCard label="Respuestas enviadas" value={totalSubmissions} />
        <StatCard label="Ítems completados" value={`${completedItems}/${studentNames.length}`} />
        <StatCard label="Estudiantes activos" value={studentNames.length} />
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="mb-4 text-base font-semibold text-zinc-800">Dificultad reportada</h2>
        {totalDiff > 0 ? (
          <div className="flex gap-6">
            <DiffBadge emoji="😁" label="Fácil" count={diffCounts.easy} total={totalDiff} color="bg-green-500" />
            <DiffBadge emoji="😑" label="Intermedio" count={diffCounts.medium} total={totalDiff} color="bg-yellow-500" />
            <DiffBadge emoji="😢" label="Difícil" count={diffCounts.hard} total={totalDiff} color="bg-red-500" />
          </div>
        ) : (
          <p className="text-sm text-zinc-400">Sin datos de dificultad</p>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Estudiante</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">NIE</th>
              {ITEM_IDS.map((id) => (
                <th key={id} className="px-3 py-3 text-center font-medium text-zinc-600">
                  {ITEMS[id as keyof typeof ITEMS]?.title?.slice(0, 12)}…
                </th>
              ))}
              <th className="px-4 py-3 text-center font-medium text-zinc-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {studentNames.map((name) => {
              const s = students[name]
              const completedCount = ITEM_IDS.filter((id) => s.items[id]?.completed).length
              return (
                <tr key={name} className="hover:bg-zinc-50">
                  <td className="max-w-[160px] truncate px-4 py-3 font-medium text-zinc-800">
                    {name}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{s.nie}</td>
                  {ITEM_IDS.map((id) => {
                    const item = s.items[id]
                    return (
                      <td key={id} className="px-3 py-3 text-center">
                        {item ? (
                          <span className={item.completed ? "text-green-600" : "text-amber-600"}>
                            {item.answers} resp.
                          </span>
                        ) : (
                          <span className="text-zinc-300">—</span>
                        )}
                      </td>
                    )
                  })}
                  <td className="px-4 py-3 text-center font-medium text-zinc-700">
                    {completedCount}/{ITEM_IDS.length}
                  </td>
                </tr>
              )
            })}
            {studentNames.length === 0 && (
              <tr>
                <td colSpan={ITEM_IDS.length + 3} className="px-4 py-8 text-center text-sm text-zinc-400">
                  No hay respuestas registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-zinc-900">{value}</p>
    </div>
  )
}

function DiffBadge({ emoji, label, count, total, color }: { emoji: string; label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{emoji}</span>
      <div>
        <p className="text-sm font-medium text-zinc-700">{label}</p>
        <p className="text-xs text-zinc-500">{count} ({pct}%)</p>
      </div>
      <div className="h-2 w-20 overflow-hidden rounded-full bg-zinc-200">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function buildStudentSummaries(rows: AnswerRow[]): Record<string, StudentSummary> {
  const map: Record<string, StudentSummary> = {}

  for (const row of rows) {
    const name = row.StudentName || "Sin nombre"
    const nie = row.StudentNIE || ""
    const itemId = row.ItemID || "desconocido"
    const phase = Number(row.Phase) || 0

    if (!map[name]) {
      map[name] = { name, nie, items: {}, totalAnswers: 0 }
    }
    if (!map[name].items[itemId]) {
      map[name].items[itemId] = { answers: 0, phases: new Set(), completed: false }
    }
    map[name].items[itemId].answers++
    map[name].items[itemId].phases.add(phase)
    map[name].totalAnswers++
  }

  for (const s of Object.values(map)) {
    for (const id of ITEM_IDS) {
      const item = s.items[id]
      if (item) {
        const configPhaseCount = ITEMS[id as keyof typeof ITEMS]
          ? { "pirueta-patineta": 2, "escudo-comunidad": 4, "cancion-pirata": 3, "artcase-sv": 5 }[id] ?? 1
          : 1
        item.completed = item.phases.size >= configPhaseCount
      }
    }
  }

  return map
}
