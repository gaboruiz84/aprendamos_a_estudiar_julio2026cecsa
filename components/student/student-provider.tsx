"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { STUDENT_ID_KEY } from "@/lib/constants"

export interface StudentData {
  studentId: string
  studentName: string
  studentNie: string
}

interface StudentContextValue extends StudentData {
  setStudent: (name: string, nie: string) => void
  clearStudent: () => void
}

const StudentContext = createContext<StudentContextValue | null>(null)

function generateId(): string {
  return `stu-${crypto.randomUUID().slice(0, 8)}`
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StudentData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STUDENT_ID_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StudentData
        setData(parsed)
        return
      } catch {
        // ignore
      }
    }
    // generate temporary id until they select their name
    const temp: StudentData = {
      studentId: generateId(),
      studentName: "",
      studentNie: "",
    }
    localStorage.setItem(STUDENT_ID_KEY, JSON.stringify(temp))
    setData(temp)
  }, [])

  function setStudent(name: string, nie: string) {
    const id = data?.studentId ?? generateId()
    const updated: StudentData = { studentId: id, studentName: name, studentNie: nie }
    localStorage.setItem(STUDENT_ID_KEY, JSON.stringify(updated))
    setData(updated)
  }

  function clearStudent() {
    localStorage.removeItem(STUDENT_ID_KEY)
    const temp: StudentData = {
      studentId: generateId(),
      studentName: "",
      studentNie: "",
    }
    localStorage.setItem(STUDENT_ID_KEY, JSON.stringify(temp))
    setData(temp)
  }

  if (!data) return null

  return (
    <StudentContext.Provider value={{ ...data, setStudent, clearStudent }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent(): StudentContextValue {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider")
  return ctx
}

export function useStudentId(): string {
  return useStudent().studentId
}
