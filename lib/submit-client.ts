import type { SubmitPayload, SubmitResponse } from "./types"

export async function submitAnswers(payload: SubmitPayload): Promise<SubmitResponse> {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "error desconocido")
    throw new Error(`Error al enviar (${res.status}): ${text}`)
  }

  return res.json()
}
