import { neon } from "@neondatabase/serverless"
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com o banco...')
    console.log('📡 URL do banco:', process.env.DATABASE_URL?.substring(0, 50) + '...')
    
    const result = await sql`SELECT NOW() as current_time`
    console.log("✅ Conexão com banco OK:", result[0])
    
    // Testar se as tabelas existem
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    console.log("📋 Tabelas encontradas:")
    tables.forEach(table => console.log(`  - ${table.table_name}`))
    
    // Testar inserção de usuário
    console.log('\n🔄 Testando inserção de usuário...')
    const testUser = await sql`
      INSERT INTO users (discord_id, username, email) 
      VALUES ('test_' + ${Date.now()}, 'testuser', 'test@example.com')
      ON CONFLICT (discord_id) DO NOTHING
      RETURNING *
    `
    console.log("✅ Usuário de teste criado:", testUser[0])
    
    console.log('\n🎉 Banco de dados configurado com sucesso!')
    
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message)
    console.error("💡 Verifique se:")
    console.error("  1. O arquivo .env.local existe")
    console.error("  2. A DATABASE_URL está correta")
    console.error("  3. As tabelas foram criadas no Neon")
  }
}

testConnection()
