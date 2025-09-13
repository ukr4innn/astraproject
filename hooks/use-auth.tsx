"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      const data = await response.json()
      
      if (data.authenticated && data.user) {
        setUser(data.user)
        console.log("✅ Usuário autenticado:", data.user.username)
      } else {
        setUser(null)
        console.log("ℹ️ Usuário não autenticado:", data.message)
      }
    } catch (error) {
      console.error("❌ Erro na verificação de autenticação:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = () => {
    try {
      // Usar o client ID do keys.txt
      const clientId = "1362573139804029332"
      const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/discord`)
      const scope = encodeURIComponent("identify email")
      const state = crypto.randomUUID() // CSRF protection

      console.log("🔑 Login Discord - Client ID:", clientId)
      console.log("🔗 Redirect URI:", redirectUri)
      console.log("🌐 Origin:", window.location.origin)
      console.log("🔒 State:", state)

      // Salvar state no sessionStorage para validação
      sessionStorage.setItem("discord_oauth_state", state)

      const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`
      console.log("🚀 URL Discord:", discordUrl)

      window.location.href = discordUrl
    } catch (error) {
      console.error("❌ Erro ao iniciar login:", error)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      if (response.ok) {
        setUser(null)
        // Limpar sessionStorage
        sessionStorage.removeItem("discord_oauth_state")
        console.log("✅ Logout realizado com sucesso")
      } else {
        console.error("❌ Erro no logout")
      }
    } catch (error) {
      console.error("❌ Erro no logout:", error)
      // Mesmo com erro, limpar o estado local
      setUser(null)
      sessionStorage.removeItem("discord_oauth_state")
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
