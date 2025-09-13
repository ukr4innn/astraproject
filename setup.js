const fs = require('fs');
const path = require('path');

// Criar arquivo .env.local
const envContent = `# Configurações do Site Astra Project
NEXT_PUBLIC_DISCORD_CLIENT_ID=1234567890123456789
DISCORD_CLIENT_SECRET=seu_client_secret_aqui
NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/discord
DATABASE_URL=postgresql://neondb_owner:npg_O7Iprfb8NJcW@ep-aged-math-ac5m4j0l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ Arquivo .env.local criado!');

// Criar script de teste do banco
const testDbContent = `import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com o banco...');
    const result = await sql\`SELECT NOW() as current_time\`
    console.log("✅ Conexão com banco OK:", result[0])
    
    // Testar se as tabelas existem
    const tables = await sql\`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    \`
    console.log("📋 Tabelas encontradas:", tables)
    
  } catch (error) {
    console.error("❌ Erro na conexão:", error)
  }
}

testConnection()
`;

fs.writeFileSync('test-db.mjs', testDbContent);
console.log('✅ Script de teste do banco criado!');

console.log('\n🚀 Próximos passos:');
console.log('1. Configure o Discord OAuth e atualize o .env.local');
console.log('2. Execute: npm install');
console.log('3. Execute: npm run dev');
console.log('4. Acesse: http://localhost:3000');
