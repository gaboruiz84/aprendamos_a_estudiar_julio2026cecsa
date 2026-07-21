import { GAS_URL } from "./constants"
import type { SubmitPayload, SubmitResponse } from "./types"

export async function submitToGAS(payload: SubmitPayload): Promise<SubmitResponse> {
  if (!GAS_URL) {
    console.warn("GAS_URL not configured — simulating submission", payload)
    return { success: true, id: crypto.randomUUID() }
  }

  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "unknown error")
    throw new Error(`GAS submission failed (${res.status}): ${text}`)
  }

  return res.json()
}

export async function fetchConfigFromGAS(): Promise<unknown> {
  if (!GAS_URL) {
    console.warn("GAS_URL not configured — returning empty config")
    return null
  }

  const res = await fetch(`${GAS_URL}?type=config`, { method: "GET" })

  if (!res.ok) {
    throw new Error(`GAS config fetch failed (${res.status})`)
  }

  return res.json()
}

export async function fetchAnswersFromGAS(): Promise<unknown> {
  if (!GAS_URL) {
    console.warn("GAS_URL not configured — returning empty data")
    return { success: true, answers: [], columns: [] }
  }

  const res = await fetch(`${GAS_URL}?type=answers`, { method: "GET" })

  if (!res.ok) {
    throw new Error(`GAS answers fetch failed (${res.status})`)
  }

  return res.json()
}
