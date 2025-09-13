"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PurchaseModal } from "@/components/purchase-modal"
import { Target, FingerprintIcon, Shield, Monitor, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      pulse: number
      color: string
    }> = []

    // Create particles with different colors and effects
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? "rgba(227, 39, 39" : "rgba(255, 106, 42",
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        const pulsatingOpacity = particle.opacity + Math.sin(particle.pulse) * 0.3
        const pulsatingSize = particle.size + Math.sin(particle.pulse) * 0.5

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsatingSize, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}, ${pulsatingOpacity})`
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color.includes("227") ? "#E32727" : "#FF6A2A"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

export default function HomePage() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<"bsrage" | "skinchanger">("bsrage")

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 1000], [0, -200])
  const particleY = useTransform(scrollY, [0, 1000], [0, -100])
  const textY = useTransform(scrollY, [0, 800], [0, -150])
  const cardY1 = useTransform(scrollY, [0, 2000], [0, -50])
  const cardY2 = useTransform(scrollY, [0, 2000], [0, -30])

  const openPurchaseModal = (product: "bsrage" | "skinchanger") => {
    setSelectedProduct(product)
    setIsPurchaseModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: particleY }} className="absolute inset-0">
          <ParticleBackground />
        </motion.div>

        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
        />

        <div className="relative z-10 container max-w-7xl mx-auto px-6 text-center">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Badge
                variant="outline"
                className="border-primary/50 text-foreground bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
              >
                Atualizações constantes
              </Badge>
              <Badge
                variant="outline"
                className="border-secondary/50 text-foreground bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 hover:scale-105"
              >
                Integração Discord
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="font-heading text-6xl md:text-8xl font-bold text-foreground glitch-text cursor-pointer"
              data-text="Astra Project"
            >
              Astra Project
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              {"A melhor loja de BloodStrike"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="energy-gradient glow-red font-medium text-lg px-8 py-3 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  onClick={() => openPurchaseModal("bsrage")}
                >
                  Comprar agora
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.1, x: 10 }}
                className="flex items-center space-x-2 text-muted-foreground cursor-pointer"
              >
                <Target className="h-5 w-5 text-primary" />
                <span>{"BSRAGE"}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, x: 10 }}
                className="flex items-center space-x-2 text-muted-foreground cursor-pointer"
              >
                <FingerprintIcon className="h-5 w-5 text-secondary" />
                <span>SKINCHANGER</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="font-heading text-4xl md:text-5xl font-bold mb-6"
              style={{ y: useTransform(scrollY, [0, 2000], [0, -20]) }}
            >
              Nossos Produtos
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              style={{ y: useTransform(scrollY, [0, 2000], [0, -10]) }}
            >
              Escolha o pack perfeito para seu estilo de jogo
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-stretch max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ y: cardY1 }}
              whileHover={{
                scale: 1.02,
                rotateY: 3,
                rotateX: 2,
                transition: { duration: 0.3 },
              }}
              className="perspective-1000"
            >
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary opacity-60 animate-spin-slower rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent opacity-40 animate-pulse rounded-lg"></div>
                </div>

                <Card className="relative border-0 bg-card/95 backdrop-blur-sm transition-all duration-500 group flex flex-col h-full shadow-xl hover:shadow-2xl hover:shadow-primary/20 overflow-hidden transform-gpu">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-primary/5 relative">
                      <div className="p-2">
                        <img
                          src="https://images-ext-1.discordapp.net/external/1_tp9Ijh9ny6sjaqeLkVNaUm8l7RN_T2oCRzfqE317M/https/media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWRhN2s5MHY4NGl5c2MxNXAxejQwcmluNDRpb29oMTdkamJweGY5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HjBvudAJmp2MKIdHpZ/giphy.gif"
                          alt="BSRAGEPC Cheat Demo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4"
                        style={{ y: useTransform(scrollY, [0, 2000], [0, -5]) }}
                      >
                        <Badge className="bg-primary/80 text-white border-primary/50 font-semibold">
                          CHEAT COMPLETO
                        </Badge>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <motion.div className="mb-4" style={{ y: useTransform(scrollY, [0, 2000], [0, -12]) }}>
                      <h3 className="font-heading text-xl font-bold mb-2 text-primary">BSRAGEPC</h3>
                      <motion.p
                        className="text-muted-foreground text-sm"
                        style={{ y: useTransform(scrollY, [0, 2000], [0, -6]) }}
                      >
                        CHEAT BLOOD STRIKE PC - SUPPORTS WIN 11 AND 10. AimBot, ESP, SkinChanger e muito mais para
                        dominação total.
                      </motion.p>
                    </motion.div>

                    <motion.div
                      className="flex-1 space-y-3 mb-5"
                      style={{ y: useTransform(scrollY, [0, 2000], [0, -4]) }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <h4 className="font-semibold text-primary mb-1 text-sm">AIMBOT</h4>
                          <ul className="space-y-0.5 text-muted-foreground">
                            <li>• AimBot</li>
                            <li>• AimFov</li>
                            <li>• AimSpeed</li>
                            <li>• VisibleCheck</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1 text-sm">ESP</h4>
                          <ul className="space-y-0.5 text-muted-foreground">
                            <li>• Box</li>
                            <li>• Line</li>
                            <li>• Distance</li>
                            <li>• Health</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1 text-sm">SKINCHANGER</h4>
                        <p className="text-xs text-muted-foreground">Unlock all skins/Consiga todas as skins</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-center mt-auto"
                      style={{ y: useTransform(scrollY, [0, 2000], [0, -2]) }}
                    >
                      <Button
                        size="lg"
                        className="w-full energy-gradient hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 py-3 text-base font-bold"
                        onClick={() => openPurchaseModal("bsrage")}
                      >
                        Comprar
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ y: cardY2 }}
              whileHover={{
                scale: 1.02,
                rotateY: -3,
                rotateX: 2,
                transition: { duration: 0.3 },
              }}
              className="perspective-1000"
            >
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-secondary opacity-60 animate-spin-slower rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent opacity-40 animate-pulse rounded-lg"></div>
                </div>

                <Card className="relative border-0 bg-card/95 backdrop-blur-sm transition-all duration-500 group flex flex-col h-full shadow-xl hover:shadow-2xl hover:shadow-secondary/20 overflow-hidden transform-gpu">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[16/9] bg-gradient-to-br from-secondary/20 to-secondary/5 relative">
                      <div className="p-2">
                        <img
                          src="https://images-ext-1.discordapp.net/external/_ECWSYM0no_3eabXgYE4NaDnmnLFkl2-QyUsGX1-jXE/https/media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdvNW1icmRjY2xiaTIzb2U4MzZiNTYxZG9qcDljbmFteG03ZTFyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vDELLvtUT1eYgDak0b/giphy.gif"
                          alt="OnlySkinChanger Demo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4"
                        style={{ y: useTransform(scrollY, [0, 2000], [0, -5]) }}
                      >
                        <Badge className="bg-secondary/80 text-white border-secondary/50 font-semibold">
                          100% SEGURO
                        </Badge>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <motion.div className="mb-4" style={{ y: useTransform(scrollY, [0, 2000], [0, -10]) }}>
                      <h3 className="font-heading text-xl font-bold mb-2 text-secondary">ONLYSKINCHANGER</h3>
                      <motion.p
                        className="text-muted-foreground text-sm"
                        style={{ y: useTransform(scrollY, [0, 2000], [0, -6]) }}
                      >
                        SKIN CHANGER BLOOD STRIKE PC - 100% SEGURO, compatível com Windows 10 e 11, sem risco de
                        banimento.
                      </motion.p>
                    </motion.div>

                    <motion.div
                      className="flex-1 space-y-3 mb-5"
                      style={{ y: useTransform(scrollY, [0, 2000], [0, -4]) }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-3 w-3 text-secondary flex-shrink-0" />
                          <span className="text-xs">100% SEGURO</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-3 w-3 text-secondary flex-shrink-0" />
                          <span className="text-xs">COMPATÍVEL COM WINDOWS 10 E 11</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-3 w-3 text-secondary flex-shrink-0" />
                          <span className="text-xs">SEM RISCO DE BLACKLIST</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1 text-sm">RECURSOS</h4>
                        <ul className="space-y-0.5 text-xs text-muted-foreground">
                          <li>• Libere TODAS AS SKINS de armas</li>
                          <li>• Efeitos especiais</li>
                          <li>• Tiros traçantes</li>
                          <li>• Personalização completa</li>
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-center mt-auto"
                      style={{ y: useTransform(scrollY, [0, 2000], [0, -2]) }}
                    >
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 hover:shadow-lg hover:shadow-secondary/50 transition-all duration-300 py-3 text-base font-bold"
                        onClick={() => openPurchaseModal("skinchanger")}
                      >
                        Comprar
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-32 bg-card/50">
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="max-w-4xl mx-auto border-primary/50 bg-gradient-to-r from-primary/10 to-secondary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <CardContent className="p-16 text-center">
                <div className="space-y-8">
                  <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                    <Users className="h-16 w-16 text-primary mx-auto" />
                  </motion.div>
                  <motion.h3 className="font-heading text-3xl font-bold" whileHover={{ scale: 1.05 }}>
                    Entre no nosso Discord
                  </motion.h3>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Junte-se à nossa comunidade para suporte rápido, atualizações e dicas exclusivas
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="energy-gradient hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                        asChild
                      >
                        <a href="https://discord.gg/52FfjhYkt9" target="_blank" rel="noopener noreferrer">
                          Entrar no Discord
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />

      <PurchaseModal
        open={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        defaultProduct={selectedProduct}
      />
    </div>
  )
}
