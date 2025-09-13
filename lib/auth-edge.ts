// Versão do auth.ts compatível com Edge Runtime
// Não usa lib/keys.ts que tem dependências do Node.js

import { neon } from "@neondatabase/serverless"

// Usar DATABASE_URL diretamente das variáveis de ambiente
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_O7Iprfb8NJcW@ep-aged-math-ac5m4j0l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
const sql = neon(DATABASE_URL)

export interface User {
  id: number
  discord_id: string
  username: string
  discriminator?: string
  avatar?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Session {
  id: number
  user_id: number
  session_token: string
  expires_at: string
  created_at: string
}

export async function createUser(discordUser: any): Promise<User> {
  const result = await sql`
    INSERT INTO users (discord_id, username, discriminator, avatar, email)
    VALUES (${discordUser.id}, ${discordUser.username}, ${discordUser.discriminator || ""}, ${discordUser.avatar}, ${discordUser.email})
    ON CONFLICT (discord_id) 
    DO UPDATE SET 
      username = EXCLUDED.username,
      discriminator = EXCLUDED.discriminator,
      avatar = EXCLUDED.avatar,
      email = EXCLUDED.email,
      updated_at = NOW()
    RETURNING *
  `
  return result[0] as User
}

export async function createSession(userId: number): Promise<Session> {
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const result = await sql`
    INSERT INTO user_sessions (user_id, session_token, expires_at)
    VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()})
    RETURNING *
  `
  return result[0] as Session
}

export async function getSessionUser(sessionToken: string): Promise<User | null> {
  const result = await sql`
    SELECT u.* FROM users u
    JOIN user_sessions s ON u.id = s.user_id
    WHERE s.session_token = ${sessionToken} 
    AND s.expires_at > NOW()
  `
  return (result[0] as User) || null
}

export async function deleteSession(sessionToken: string): Promise<void> {
  await sql`
    DELETE FROM user_sessions 
    WHERE session_token = ${sessionToken}
  `
}

export async function cleanupExpiredSessions(): Promise<void> {
  try {
    const result = await sql`
      DELETE FROM user_sessions 
      WHERE expires_at < NOW()
    `
    console.log(`🧹 Limpeza de sessões: ${result.length} sessões expiradas removidas`)
  } catch (error) {
    console.error("❌ Erro na limpeza de sessões:", error)
  }
}

export async function refreshSession(sessionToken: string): Promise<Session | null> {
  try {
    // Verificar se a sessão existe e não está expirada
    const existingSession = await sql`
      SELECT * FROM user_sessions 
      WHERE session_token = ${sessionToken} 
      AND expires_at > NOW()
    `

    if (!existingSession[0]) {
      return null
    }

    // Estender a sessão por mais 30 dias
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    const result = await sql`
      UPDATE user_sessions 
      SET expires_at = ${newExpiresAt.toISOString()}
      WHERE session_token = ${sessionToken}
      RETURNING *
    `

    return result[0] as Session
  } catch (error) {
    console.error("❌ Erro ao renovar sessão:", error)
    return null
  }
}
