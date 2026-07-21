"use client"

import { useState, useMemo } from "react"
import { STUDENTS } from "@/lib/students"
import { useStudent } from "./student-provider"
import { Button } from "@/components/ui/button"

export function StudentSelector() {
  const { studentName, studentNie, setStudent, clearStudent } = useStudent()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const results = useMemo(
    () =>
      query.length > 0
        ? STUDENTS.filter(
            (s) =>
              s.name.toLowerCase().includes(query.toLowerCase()) ||
              s.nie.includes(query),
          )
        : STUDENTS,
    [query],
  )

  if (studentName && studentNie) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
        <span className="text-sm text-green-800">
          <span className="font-semibold">{studentName}</span> — NIE {studentNie}
        </span>
        <Button variant="ghost" className="text-xs text-red-500" onClick={clearStudent}>
          Cambiar
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
      <h2 className="text-base font-semibold text-zinc-800">Seleccioná tu nombre</h2>
      <p className="text-sm text-zinc-500">Buscá por nombre o NIE</p>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Escribí tu nombre o NIE..."
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {open && results.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-zinc-200 bg-white shadow-lg">
            {results.map((s) => (
              <li key={s.nie}>
                <button
                  type="button"
                  onClick={() => {
                    setStudent(s.name, s.nie)
                    setOpen(false)
                    setQuery("")
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-blue-50"
                >
                  <span className="font-medium text-zinc-800">{s.name}</span>
                  <span className="ml-auto text-xs text-zinc-400">NIE {s.nie}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-zinc-400">{STUDENTS.length} estudiantes cargados</p>
    </div>
  )
}
