import { NextResponse } from "next/server"
import { fetchAnswersFromGAS } from "@/lib/gas-client"

export async function GET() {
  try {
    const data = await fetchAnswersFromGAS()
    return NextResponse.json(data)
  } catch (err) {
    console.error("Answers fetch error:", err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    )
  }
}
