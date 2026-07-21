import { NextResponse } from "next/server"
import { validateSubmitPayload } from "@/lib/schema"
import { GAS_URL } from "@/lib/constants"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = validateSubmitPayload(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 },
      )
    }

    if (!GAS_URL) {
      console.warn("GAS_URL not configured — simulating success")
      return NextResponse.json({ success: true, id: parsed.data.studentId })
    }

    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    })

    const text = await res.text()
    console.log("GAS response status:", res.status)
    console.log("GAS response headers:", JSON.stringify(Object.fromEntries(res.headers)))
    console.log("GAS response body (first 2000 chars):", text.slice(0, 2000))

    try {
      const json = JSON.parse(text)
      return NextResponse.json(json)
    } catch {
      if (text.includes("<html") || text.includes("<!DOCTYPE")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "GAS devolvió una página HTML en vez de JSON. " +
              "Asegurate de haber re-desplegado el script después de pegar el código. " +
              "Pasos: (1) En el editor de Apps Script, guardá el script (Cmd+S). " +
              "(2) Desplegar → Nuevo despliegue → Web app. " +
              "(3) Ejecutar como: 'Yo', Acceso: 'Cualquier usuario'. " +
              "(4) Copiá la NUEVA URL al .env.local.",
          },
          { status: 502 },
        )
      }
      return NextResponse.json(
        {
          success: false,
          error: `GAS respondió con formato inesperado (status ${res.status}). Revise la consola del servidor para más detalles.`,
        },
        { status: 502 },
      )
    }
  } catch (err) {
    console.error("Submit error:", err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
