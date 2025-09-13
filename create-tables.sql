-- Script para criar tabelas no Neon PostgreSQL
-- Execute este SQL no seu banco Neon

-- Criando tabelas para sistema de autenticação Discord
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  discord_id VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  discriminator VARCHAR(10),
  avatar VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  plan_duration INTEGER NOT NULL, -- dias
  price DECIMAL(10,2) NOT NULL,
  payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_discord_id ON users(discord_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON user_purchases(user_id);

-- Verificar se as tabelas foram criadas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Inserir dados de teste (opcional)
INSERT INTO users (discord_id, username, email) 
VALUES ('123456789', 'testuser', 'test@example.com')
ON CONFLICT (discord_id) DO NOTHING;
