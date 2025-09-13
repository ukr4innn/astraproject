import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se é uma rota de API de autenticação
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    // Adicionar headers de segurança
    const response = NextResponse.next()
    
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/auth/:path*',
  ],
}
