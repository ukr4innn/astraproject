import { type NextRequest, NextResponse } from "next/server"

const ASAAS_BASE_URL = "https://api.asaas.com/v3"

export async function GET(request: NextRequest, { params }: { params: { paymentId: string } }) {
  try {
    const { paymentId } = params

    const apiKey = process.env.ASAAS_API_KEY
    
    const response = await fetch(`${ASAAS_BASE_URL}/payments/${paymentId}/pixQrCode`, {
      method: "GET",
      headers: {
        access_token: apiKey,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.description || "Erro ao obter código PIX")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API PIX:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
