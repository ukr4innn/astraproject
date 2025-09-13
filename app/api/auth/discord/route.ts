import { NextRequest, NextResponse } from "next/server";
import { createUser, createSession } from "@/lib/auth-edge";
import { validateDiscordUser, sanitizeInput, logSecurityEvent } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Verificar se houve erro no OAuth
    if (error) {
      console.error("❌ Erro OAuth Discord:", error);
      return NextResponse.redirect(new URL("/?error=oauth_error", request.url));
    }

    if (!code) {
      console.error("❌ Código OAuth não fornecido");
      return NextResponse.redirect(new URL("/?error=no_code", request.url));
    }

    // Validar state para proteção CSRF
    if (!state) {
      console.error("❌ State não fornecido");
      return NextResponse.redirect(new URL("/?error=no_state", request.url));
    }

    // Obter configurações das variáveis de ambiente
    const clientId = process.env.DISCORD_CLIENT_ID || "1362573139804029332";
    const clientSecret = process.env.DISCORD_CLIENT_SECRET || "Hv9RVbM7JdetHM91hGPPJ2uKpIBwIPEE";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const redirectUri = `${baseUrl}/api/auth/discord`;

    console.log("🔑 Discord OAuth - Client ID:", clientId);
    console.log("🔗 Discord OAuth - Redirect URI:", redirectUri);
    console.log("📝 Discord OAuth - Code recebido:", code);

    // Validar configurações
    if (!clientId || !clientSecret) {
      console.error("❌ Configurações Discord não encontradas");
      return NextResponse.redirect(new URL("/?error=config_error", request.url));
    }

    // Trocar código por token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "AstraProject/1.0"
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("❌ Erro ao obter token:", errorData);
      return NextResponse.redirect(new URL("/?error=token_error", request.url));
    }

    const tokenData = await tokenResponse.json();
    console.log("✅ Token obtido com sucesso");

    // Obter dados do usuário
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "AstraProject/1.0"
      }
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error("❌ Erro ao obter dados do usuário:", errorData);
      return NextResponse.redirect(new URL("/?error=user_error", request.url));
    }

    const userData = await userResponse.json();
    console.log("✅ Usuário autenticado:", userData.username);

    // Validar dados do usuário
    const validation = validateDiscordUser(userData);
    if (!validation.valid) {
      logSecurityEvent("INVALID_USER_DATA", { errors: validation.errors, userData });
      console.error("❌ Dados do usuário inválidos:", validation.errors);
      return NextResponse.redirect(new URL("/?error=invalid_user", request.url));
    }

    // Sanitizar dados
    const sanitizedUserData = {
      id: sanitizeInput(userData.id),
      username: sanitizeInput(userData.username),
      discriminator: userData.discriminator ? sanitizeInput(userData.discriminator) : "0000",
      avatar: userData.avatar ? sanitizeInput(userData.avatar) : null,
      email: userData.email ? sanitizeInput(userData.email) : null
    };

    try {
      // Criar/atualizar usuário no banco
      const user = await createUser(sanitizedUserData);

      console.log("✅ Usuário salvo/atualizado no banco:", user.id);
      logSecurityEvent("USER_CREATED_OR_UPDATED", { userId: user.id, discordId: user.discord_id });

      // Criar sessão
      const session = await createSession(user.id);
      console.log("✅ Sessão criada:", session.session_token);
      logSecurityEvent("SESSION_CREATED", { userId: user.id, sessionToken: session.session_token });

      // Redirecionar para home com sucesso
      const response = NextResponse.redirect(new URL("/?success=login", request.url));
      
      // Definir cookie de sessão
      response.cookies.set("session_token", session.session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/"
      });

      return response;

    } catch (dbError) {
      console.error("❌ Erro ao salvar usuário no banco:", dbError);
      return NextResponse.redirect(new URL("/?error=db_error", request.url));
    }

  } catch (error) {
    console.error("❌ Erro na autenticação Discord:", error);
    return NextResponse.redirect(new URL("/?error=internal_error", request.url));
  }
}
