// Validações de segurança e utilitários

export function validateDiscordId(discordId: string): boolean {
  return /^\d{17,19}$/.test(discordId)
}

export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9._-]{2,32}$/.test(username)
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateSessionToken(token: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token)
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function validateDiscordUser(userData: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!userData.id || !validateDiscordId(userData.id)) {
    errors.push('ID do Discord inválido')
  }

  if (!userData.username || !validateUsername(userData.username)) {
    errors.push('Username inválido')
  }

  if (userData.email && !validateEmail(userData.email)) {
    errors.push('Email inválido')
  }

  if (userData.discriminator && !/^\d{1,4}$/.test(userData.discriminator)) {
    errors.push('Discriminator inválido')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export function createErrorResponse(message: string, status: number = 400) {
  return {
    error: message,
    status,
    timestamp: new Date().toISOString()
  }
}

export function logSecurityEvent(event: string, details: any) {
  console.log(`🔒 SECURITY: ${event}`, {
    ...details,
    timestamp: new Date().toISOString(),
    ip: 'unknown' // Em produção, obter do request
  })
}
