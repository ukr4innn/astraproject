import type React from "react"
import type { Metadata } from "next"
import { Rajdhani } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Astra Project - Gaming Enhancement Packs",
  description: "Interface gamer agressiva. Precisão, performance e estilo. ALPHA Pack Tático e OMEGA Pack Visual.",
  generator: "v0.app",
  keywords: "gaming, performance, tactical, visual, enhancement, FPS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${rajdhani.variable} ${inter.variable} dark`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
