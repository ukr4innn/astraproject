import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon("postgresql://neondb_owner:npg_O7Iprfb8NJcW@ep-aged-math-ac5m4j0l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

export async function GET(request: NextRequest) {
  try {
    // Buscar usuários que fizeram login nos últimos 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const result = await sql`
      SELECT discord_id, username, discriminator, avatar, email, created_at, updated_at
      FROM users 
      WHERE updated_at > ${fiveMinutesAgo}
      ORDER BY updated_at DESC
      LIMIT 10
    `;

    console.log("🔍 Usuários recentes encontrados:", result.length);

    return NextResponse.json({ 
      success: true, 
      users: result,
      count: result.length
    });

  } catch (error) {
    console.error("❌ Erro ao buscar logins recentes:", error);
    return NextResponse.json({ 
      error: "Erro interno do servidor",
      users: [],
      count: 0
    }, { status: 500 });
  }
}
