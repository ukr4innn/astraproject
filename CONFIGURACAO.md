# 🚀 Configuração do Site Astra Project

## ✅ Arquivos Criados

- `setup.js` - Script de configuração automática
- `create-tables.sql` - SQL para criar tabelas no Neon
- `test-db.mjs` - Script para testar conexão com banco
- `.env.local` - Variáveis de ambiente (será criado pelo setup.js)

## 🔧 Passo a Passo

### 1. Executar Setup Automático
```bash
cd "site/ultr4project (1)"
node setup.js
```

### 2. Configurar Discord OAuth
1. Acesse: https://discord.com/developers/applications
2. Clique em "New Application"
3. Nome: "Astra Project Site"
4. Vá em OAuth2 → General
5. Adicione Redirect URI: `http://localhost:3000/api/auth/discord`
6. Copie Client ID e Client Secret
7. Edite o arquivo `.env.local` com suas chaves

### 3. Configurar Banco de Dados
1. Acesse seu painel do Neon
2. Vá em "SQL Editor"
3. Execute o conteúdo do arquivo `create-tables.sql`
4. Verifique se as tabelas foram criadas

### 4. Testar Conexão com Banco
```bash
npm install dotenv
node test-db.mjs
```

### 5. Instalar Dependências e Executar
```bash
npm install
npm run dev
```

### 6. Acessar o Site
- URL: http://localhost:3000
- Teste o login Discord
- Teste a criação de PIX

## 🔑 Chaves Necessárias

### Discord OAuth
- `NEXT_PUBLIC_DISCORD_CLIENT_ID` - ID da aplicação Discord
- `DISCORD_CLIENT_SECRET` - Secret da aplicação Discord

### Banco de Dados
- `DATABASE_URL` - URL de conexão do Neon (já configurada)

### Asaas (já configurado no código)
- API Key já está no código das rotas

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique se a DATABASE_URL está correta
- Execute o SQL de criação de tabelas
- Teste com o script `test-db.mjs`

### Erro de Discord OAuth
- Verifique se as chaves estão corretas no .env.local
- Confirme se o Redirect URI está configurado no Discord
- Verifique se a aplicação Discord está ativa

### Erro de Dependências
- Execute `npm install` novamente
- Verifique se o Node.js está atualizado
- Limpe o cache: `npm cache clean --force`

## 📱 Testando o Site

1. **Login Discord** - Clique em "Entrar com Discord"
2. **Seleção de Produto** - Escolha BSRAGE ou SKINCHANGER
3. **Criação de PIX** - Preencha dados e gere PIX
4. **Verificação de Pagamento** - O sistema verifica automaticamente

## 🎉 Pronto!

Se tudo estiver configurado corretamente, o site estará funcionando com:
- ✅ Login Discord OAuth
- ✅ Sistema de pagamento PIX
- ✅ Banco de dados PostgreSQL
- ✅ Interface responsiva
- ✅ Animações e efeitos visuais
