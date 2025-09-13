"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PurchaseModal } from "@/components/purchase-modal"
import { AuthButton } from "@/components/auth-button"
import { Menu, X, Target } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">Astra Project</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Início
            </Link>
            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Produtos
            </button>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/suporte"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Suporte
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <AuthButton />
            <Button className="energy-gradient glow-red font-medium" onClick={() => setIsPurchaseModalOpen(true)}>
              Comprar agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <nav className="container max-w-7xl mx-auto px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsPurchaseModalOpen(true)
                }}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Produtos
              </button>
              <Link
                href="/faq"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/suporte"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Suporte
              </Link>
              <div className="pt-2 border-t border-border/40">
                <AuthButton />
              </div>
              <Button
                className="w-full energy-gradient glow-red font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsPurchaseModalOpen(true)
                }}
              >
                Comprar agora
              </Button>
            </nav>
          </div>
        )}
      </header>

      <PurchaseModal open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen} />
    </>
  )
}
