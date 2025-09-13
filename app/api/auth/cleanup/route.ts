import { NextRequest, NextResponse } from "next/server"
import { cleanupExpiredSessions } from "@/lib/auth-edge"

export async function POST(request: NextRequest) {
  try {
    // Verificar se é uma requisição autorizada (pode adicionar autenticação admin)
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.CLEANUP_TOKEN || "astra-cleanup-2024"
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ 
        error: "Não autorizado" 
      }, { status: 401 })
    }

    await cleanupExpiredSessions()

    return NextResponse.json({ 
      success: true,
      message: "Limpeza de sessões concluída"
    })

  } catch (error) {
    console.error("❌ Erro na limpeza de sessões:", error)
    return NextResponse.json({ 
      error: "Erro interno na limpeza" 
    }, { status: 500 })
  }
}
