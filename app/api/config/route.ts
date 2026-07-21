import { NextResponse } from "next/server"
import { fetchConfigFromGAS } from "@/lib/gas-client"

export async function GET() {
  try {
    const config = await fetchConfigFromGAS()
    return NextResponse.json({ success: true, config })
  } catch (err) {
    console.error("Config fetch error:", err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    )
  }
}
