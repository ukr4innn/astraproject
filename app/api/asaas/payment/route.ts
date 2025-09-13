import { type NextRequest, NextResponse } from "next/server"

const ASAAS_BASE_URL = "https://api.asaas.com/v3"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const apiKey = process.env.ASAAS_API_KEY
    
    const response = await fetch(`${ASAAS_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        access_token: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: body.customer,
        billingType: body.billingType,
        value: body.value,
        description: body.description,
        dueDate: body.dueDate,
        externalReference: body.externalReference,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.description || "Erro ao criar pagamento")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API payment:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
