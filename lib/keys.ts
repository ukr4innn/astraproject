import fs from 'fs';
import path from 'path';

interface Keys {
  DISCORD_TOKEN: string;
  ASAAS_API_KEY: string;
  ASAAS_ENVIRONMENT: string;
  WEBHOOK_URL: string;
  ASAAS_WEBHOOK_SECRET: string;
  WEBHOOK_PORT: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DATABASE_URL: string;
}

let keysCache: Keys | null = null;

export function loadKeys(): Keys {
  if (keysCache) {
    return keysCache;
  }

  try {
    // Caminho para o keys.txt na raiz do projeto
    const keysPath = path.join(process.cwd(), '..', '..', 'keys.txt');
    console.log('🔍 Tentando ler keys.txt de:', keysPath);
    const keysContent = fs.readFileSync(keysPath, 'utf8');
    console.log('📄 Conteúdo do keys.txt:', keysContent);
    
    const keys: Keys = {
      DISCORD_TOKEN: '',
      ASAAS_API_KEY: '',
      ASAAS_ENVIRONMENT: '',
      WEBHOOK_URL: '',
      ASAAS_WEBHOOK_SECRET: '',
      WEBHOOK_PORT: '',
      DISCORD_CLIENT_ID: '',
      DISCORD_CLIENT_SECRET: '',
      DATABASE_URL: '',
    };

    // Parse do arquivo keys.txt
    keysContent.split('\n').forEach(line => {
      const equalIndex = line.indexOf('=');
      if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim();
        const value = line.substring(equalIndex + 1).trim();
        
        console.log(`🔑 Processando: ${key} = ${value}`);
        
        if (key in keys) {
          (keys as any)[key] = value;
          console.log(`✅ Chave ${key} definida como: ${value}`);
        }
      }
    });

    console.log('🎯 Keys finais:', keys);
    keysCache = keys;
    return keys;
  } catch (error) {
    console.error('❌ Erro ao carregar keys.txt:', error);
    throw new Error('Não foi possível carregar as chaves do arquivo keys.txt');
  }
}

export function getKey(key: keyof Keys): string {
  try {
    const keys = loadKeys();
    const value = keys[key];
    
    if (!value) {
      throw new Error(`Chave ${key} não encontrada no keys.txt`);
    }
    
    return value;
  } catch (error) {
    // Fallback para variáveis de ambiente se keys.txt não estiver disponível
    console.log(`⚠️ Usando variável de ambiente para ${key}`);
    
    const envMap: Record<keyof Keys, string> = {
      DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
      ASAAS_API_KEY: process.env.ASAAS_API_KEY || '',
      ASAAS_ENVIRONMENT: process.env.ASAAS_ENVIRONMENT || '',
      WEBHOOK_URL: process.env.WEBHOOK_URL || '',
      ASAAS_WEBHOOK_SECRET: process.env.ASAAS_WEBHOOK_SECRET || '',
      WEBHOOK_PORT: process.env.WEBHOOK_PORT || '',
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || '',
      DATABASE_URL: process.env.DATABASE_URL || '',
    };

    const value = envMap[key];
    
    if (!value) {
      throw new Error(`Chave ${key} não encontrada no keys.txt nem nas variáveis de ambiente`);
    }
    
    return value;
  }
}
