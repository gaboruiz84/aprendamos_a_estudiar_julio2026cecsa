"use client"

import Link from "next/link"
import { useStudent } from "@/components/student/student-provider"

export function Header() {
  const { studentName } = useStudent()

  return (
    <header className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-zinc-700 hover:text-blue-600">
          Aprendamos a Estudiar
        </Link>
        <div className="flex items-center gap-3">
          {studentName && (
            <span className="hidden text-xs text-zinc-500 sm:inline truncate max-w-[200px]">
              {studentName}
            </span>
          )}
          <span className="text-xs text-zinc-400">9° Grado — MINED 2026</span>
        </div>
      </div>
    </header>
  )
}
