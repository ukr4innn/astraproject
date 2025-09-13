import { type NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth-edge"
import { validateSessionToken, logSecurityEvent } from "@/lib/validation"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session_token")?.value

    if (!sessionToken) {
      return NextResponse.json({ 
        user: null,
        authenticated: false,
        message: "Nenhuma sessão ativa"
      })
    }

    // Validar formato do token
    if (!validateSessionToken(sessionToken)) {
      logSecurityEvent("INVALID_SESSION_TOKEN", { sessionToken })
      console.error("❌ Token de sessão inválido:", sessionToken)
      return NextResponse.json({ 
        user: null,
        authenticated: false,
        message: "Token de sessão inválido"
      })
    }

    const user = await getSessionUser(sessionToken)

    if (!user) {
      return NextResponse.json({ 
        user: null,
        authenticated: false,
        message: "Sessão expirada ou inválida"
      })
    }

    // Remover dados sensíveis
    const safeUser = {
      id: user.id,
      discord_id: user.discord_id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    return NextResponse.json({ 
      user: safeUser,
      authenticated: true,
      message: "Usuário autenticado"
    })

  } catch (error) {
    console.error("❌ Erro ao verificar autenticação:", error)
    return NextResponse.json({ 
      user: null,
      authenticated: false,
      error: "Erro interno na verificação de autenticação"
    }, { status: 500 })
  }
}
