import { type NextRequest, NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth-edge"

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session_token")?.value

    if (sessionToken) {
      try {
        await deleteSession(sessionToken)
        console.log("✅ Sessão removida do banco:", sessionToken)
      } catch (error) {
        console.error("⚠️ Erro ao remover sessão do banco:", error)
        // Continuar mesmo se houver erro no banco
      }
    }

    const response = NextResponse.json({ 
      success: true,
      message: "Logout realizado com sucesso"
    })
    
    // Remover todos os cookies relacionados à autenticação
    response.cookies.delete("session_token")
    response.cookies.delete("discord_token")
    response.cookies.delete("user_data")
    
    // Limpar sessionStorage no frontend
    response.headers.set("Clear-Site-Data", '"cookies", "storage"')

    return response

  } catch (error) {
    console.error("❌ Erro no logout:", error)
    return NextResponse.json({ 
      success: false,
      error: "Erro interno no logout" 
    }, { status: 500 })
  }
}
