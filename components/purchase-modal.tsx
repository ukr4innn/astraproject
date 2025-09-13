"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Target, Settings, MessageCircle, Copy, QrCode, Clock, CheckCircle, XCircle, Zap, Shield } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface PurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultProduct?: "bsrage" | "skinchanger"
}

export function PurchaseModal({ open, onOpenChange, defaultProduct = "bsrage" }: PurchaseModalProps) {
  const { user, login } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    discord: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGeneratingPix, setIsGeneratingPix] = useState(false)
  const [pixData, setPixData] = useState<{
    qrCode: string
    pixCode: string
    paymentId: string
  } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirmed" | "expired">("pending")
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)

  const products = {
    bsrage: {
      name: "BSRAGEPC",
      description: "CHEAT BLOOD STRIKE PC completo com AimBot, ESP, SkinChanger e muito mais.",
      icon: Target,
      color: "primary",
      gradient: "from-red-500 to-orange-500",
      plans: {
        "1day": { name: "1 Dia", price: 25.0 },
        "7days": { name: "7 Dias", price: 57.0 },
        "30days": { name: "30 Dias", price: 89.9 },
      },
    },
    skinchanger: {
      name: "ONLYSKINCHANGER",
      description: "SKIN CHANGER BLOOD STRIKE PC - 100% seguro, sem risco de banimento.",
      icon: Settings,
      color: "secondary",
      gradient: "from-orange-500 to-yellow-500",
      plans: {
        monthly: { name: "Mensal", price: 60.0 },
      },
    },
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSubmitted && pixData && paymentStatus === "pending" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPaymentStatus("expired")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSubmitted, pixData, paymentStatus, timeLeft])

  useEffect(() => {
    let checkInterval: NodeJS.Timeout
    if (isSubmitted && pixData && paymentStatus === "pending") {
      setIsCheckingPayment(true)
      checkInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/asaas/status/${pixData.paymentId}`)
          if (response.ok) {
            const data = await response.json()
            console.log("[v0] Payment status check:", data.status)

            if (data.status === "CONFIRMED" || data.status === "RECEIVED") {
              setPaymentStatus("confirmed")
              clearInterval(checkInterval)
              setIsCheckingPayment(false)
            }
          }
        } catch (error) {
          console.error("[v0] Error checking payment status:", error)
        }
      }, 3000) // Check every 3 seconds
    }
    return () => {
      clearInterval(checkInterval)
      setIsCheckingPayment(false)
    }
  }, [isSubmitted, pixData, paymentStatus])

  useEffect(() => {
    const currentProduct = products[selectedProduct as keyof typeof products]
    const availablePlans = Object.keys(currentProduct.plans)
    if (availablePlans.length > 0 && !availablePlans.includes(selectedPlan)) {
      setSelectedPlan(availablePlans[0])
    }
  }, [selectedProduct])

  useEffect(() => {
    if (!selectedPlan) {
      const currentProduct = products[selectedProduct as keyof typeof products]
      const availablePlans = Object.keys(currentProduct.plans)
      if (availablePlans.length > 0) {
        setSelectedPlan(availablePlans[0])
      }
    }
  }, [])

  useEffect(() => {
    if (user && user.email) {
      setFormData((prev) => ({ ...prev, email: user.email || "" }))
    }
  }, [user])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!formData.discord.trim()) {
      newErrors.discord = "Discord é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generatePix = async () => {
    if (!user) {
      alert("Você precisa estar logado para fazer uma compra!")
      return
    }

    if (!validateForm()) return

    setIsGeneratingPix(true)

    try {
      const currentProduct = products[selectedProduct as keyof typeof products]
      const currentPlan = currentProduct.plans[selectedPlan as keyof typeof currentProduct.plans]

      console.log("[v0] Creating customer with data:", { name: formData.discord, email: formData.email })

      // Create customer
      const customerResponse = await fetch("/api/asaas/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.discord,
          email: formData.email,
        }),
      })

      if (!customerResponse.ok) {
        const errorData = await customerResponse.json()
        throw new Error(errorData.error || "Erro ao criar cliente")
      }

      const customer = await customerResponse.json()
      console.log("[v0] Customer created:", customer)

      const paymentData = {
        customer: customer.id,
        billingType: "PIX",
        value: currentPlan.price,
        description: `${currentProduct.name} - ${currentPlan.name}`,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        externalReference: `${selectedProduct}_${Date.now()}`,
      }

      console.log("[v0] Creating payment with data:", paymentData)

      // Create payment
      const paymentResponse = await fetch("/api/asaas/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      })

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        console.log("[v0] Payment error response:", errorData)
        throw new Error(errorData.error || "Erro ao criar pagamento")
      }

      const payment = await paymentResponse.json()
      console.log("[v0] Payment created:", payment)

      // Get PIX QR Code
      const pixResponse = await fetch(`/api/asaas/pix/${payment.id}`)

      if (!pixResponse.ok) {
        const errorData = await pixResponse.json()
        console.log("[v0] PIX error response:", errorData)
        throw new Error(errorData.error || "Erro ao gerar PIX")
      }

      const pixInfo = await pixResponse.json()
      console.log("[v0] PIX info received:", pixInfo)

      setPixData({
        qrCode: pixInfo.encodedImage,
        pixCode: pixInfo.payload,
        paymentId: payment.id,
      })

      setTimeLeft(180)
      setPaymentStatus("pending")
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Erro ao gerar PIX:", error)
      alert(`Erro ao gerar PIX: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setIsGeneratingPix(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const copyPixCode = () => {
    if (pixData?.pixCode) {
      navigator.clipboard.writeText(pixData.pixCode)
      alert("Código PIX copiado!")
    }
  }

  const resetModal = () => {
    setIsSubmitted(false)
    setPixData(null)
    setFormData({ email: "", discord: "" })
    setErrors({})
    setTimeLeft(180)
    setPaymentStatus("pending")
    setIsCheckingPayment(false)
  }

  const handleClose = () => {
    resetModal()
    onOpenChange(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card border-primary/50">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="font-heading text-xl">Login Necessário</DialogTitle>
            <DialogDescription className="text-base">Você precisa estar logado para fazer uma compra</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-600 mb-2">Por que fazer login?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Histórico de compras</li>
                  <li>• Suporte personalizado</li>
                  <li>• Entrega automática via Discord</li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={login} className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Entrar com Discord
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 bg-transparent">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isSubmitted && pixData) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg bg-card border-primary/50 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-3 p-2 rounded-full bg-primary/10 w-fit">
              {paymentStatus === "confirmed" ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : paymentStatus === "expired" ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : (
                <QrCode className="h-8 w-8 text-primary" />
              )}
            </div>
            <DialogTitle className="font-heading text-xl">
              {paymentStatus === "confirmed"
                ? "Pagamento Confirmado!"
                : paymentStatus === "expired"
                  ? "Pagamento Expirado"
                  : "Pagamento PIX"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {paymentStatus === "confirmed"
                ? "Seu pagamento foi processado com sucesso!"
                : paymentStatus === "expired"
                  ? "O tempo para pagamento expirou"
                  : "Escaneie o QR Code ou copie o código PIX"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {paymentStatus === "confirmed" && (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-3 text-center">
                  <h4 className="font-semibold text-green-600 mb-1">Pagamento Aprovado!</h4>
                  <p className="text-sm text-muted-foreground">
                    Você receberá as instruções de acesso no seu Discord em breve.
                  </p>
                </CardContent>
              </Card>
            )}

            {paymentStatus === "expired" && (
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-3 text-center">
                  <h4 className="font-semibold text-red-600 mb-1">Tempo Esgotado</h4>
                  <p className="text-sm text-muted-foreground">Gere um novo PIX para continuar com o pagamento.</p>
                </CardContent>
              </Card>
            )}

            {paymentStatus === "pending" && (
              <>
                <div className="flex justify-center">
                  <img
                    src={`data:image/png;base64,${pixData.qrCode}`}
                    alt="QR Code PIX"
                    className="w-40 h-40 border rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Código PIX (Copia e Cola)</Label>
                  <div className="flex gap-2">
                    <Input value={pixData.pixCode} readOnly className="font-mono text-xs" />
                    <Button variant="outline" size="sm" onClick={copyPixCode} className="shrink-0 bg-transparent">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card className="border-orange-500/30 bg-orange-500/5">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div className="text-center">
                        <h4 className="font-semibold text-sm text-orange-600">Tempo Restante</h4>
                        <p className="text-xl font-mono font-bold text-orange-700">{formatTime(timeLeft)}</p>
                        <p className="text-xs text-muted-foreground">O pagamento será cancelado automaticamente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isCheckingPayment && (
                  <Card className="border-blue-500/30 bg-blue-500/5">
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-blue-600 font-medium">Verificando pagamento...</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-3 space-y-2">
                    <h4 className="font-semibold text-sm">Instruções:</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Abra seu app do banco</li>
                      <li>• Escaneie o QR Code ou cole o código PIX</li>
                      <li>• Confirme o pagamento</li>
                      <li>• Aguarde a confirmação automática</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex gap-3">
              {paymentStatus === "expired" ? (
                <Button
                  className="flex-1 energy-gradient"
                  onClick={() => {
                    resetModal()
                    setIsSubmitted(false)
                  }}
                >
                  Gerar Novo PIX
                </Button>
              ) : (
                <Button className="flex-1 energy-gradient" onClick={handleClose}>
                  {paymentStatus === "confirmed" ? "Finalizar" : "Fechar"}
                </Button>
              )}
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <a href="https://discord.gg/52FfjhYkt9" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentProduct = products[selectedProduct as keyof typeof products]
  const currentPlan = currentProduct?.plans?.[selectedPlan as keyof typeof currentProduct.plans]

  if (!currentPlan) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-background via-background/95 to-muted/30 border-2 border-primary/20 backdrop-blur-sm max-h-[90vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="space-y-2 pb-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="font-heading text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Finalizar Compra
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Selecione o produto e preencha seus dados
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                1
              </div>
              <Label className="text-lg font-bold">Selecionar Produto</Label>
            </div>
            <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct} className="space-y-3">
              {Object.entries(products).map(([key, product]) => {
                const Icon = product.icon
                const isSelected = selectedProduct === key
                return (
                  <div key={key} className="relative">
                    <RadioGroupItem value={key} id={key} className="sr-only" />
                    <Label
                      htmlFor={key}
                      className={`block cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.01] ${
                        isSelected
                          ? `border-primary bg-gradient-to-r ${product.gradient} bg-opacity-10 shadow-md shadow-primary/20`
                          : "border-border hover:border-primary/50 bg-card/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${isSelected ? "bg-white/20" : "bg-muted"}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? "text-white" : "text-primary"}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-base mb-1 ${isSelected ? "text-white" : "text-foreground"}`}>
                            {product.name}
                          </h4>
                          <p
                            className={`text-sm leading-relaxed ${isSelected ? "text-white/80" : "text-muted-foreground"}`}
                          >
                            {product.description}
                          </p>
                        </div>
                        {isSelected && <CheckCircle className="h-5 w-5 text-white" />}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                2
              </div>
              <Label className="text-lg font-bold">Selecionar Plano</Label>
            </div>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-3 md:grid-cols-3">
              {Object.entries(currentProduct.plans).map(([key, plan]) => {
                const isSelected = selectedPlan === key
                return (
                  <div key={key} className="relative">
                    <RadioGroupItem value={key} id={key} className="sr-only" />
                    <Label
                      htmlFor={key}
                      className={`block cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-center ${
                        isSelected
                          ? "border-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-md shadow-primary/20"
                          : "border-border hover:border-primary/50 bg-card/50"
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className={`font-bold text-base ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {plan.name}
                        </h4>
                        <div className={`text-2xl font-black ${isSelected ? "text-primary" : "text-foreground"}`}>
                          R$ {plan.price.toFixed(2).replace(".", ",")}
                        </div>
                        {isSelected && <CheckCircle className="h-4 w-4 text-primary mx-auto" />}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                3
              </div>
              <Label className="text-lg font-bold">Seus Dados</Label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold flex items-center space-x-1">
                  <span>E-mail</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-10 text-sm border-2 ${errors.email ? "border-red-500" : "border-border focus:border-primary"} rounded-lg`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center space-x-1">
                    <XCircle className="h-3 w-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord" className="text-sm font-semibold flex items-center space-x-1">
                  <span>Usuário Discord</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="discord"
                  value={formData.discord}
                  onChange={(e) => handleInputChange("discord", e.target.value)}
                  className={`h-10 text-sm border-2 ${errors.discord ? "border-red-500" : "border-border focus:border-primary"} rounded-lg`}
                  placeholder="seuusuario"
                />
                {errors.discord && (
                  <p className="text-xs text-red-500 flex items-center space-x-1">
                    <XCircle className="h-3 w-3" />
                    <span>{errors.discord}</span>
                  </p>
                )}
              </div>
            </div>

            <Card className="border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-600">Necessário para suporte</h4>
                      <p className="text-xs text-blue-600/80">Discord é usado para entrega e suporte</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/50 hover:bg-blue-500/10 bg-transparent text-xs"
                    asChild
                  >
                    <a href="https://discord.gg/52FfjhYkt9" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 border-t border-border/50">
            <Button
              onClick={generatePix}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.02] rounded-lg"
              disabled={isGeneratingPix}
            >
              {isGeneratingPix ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Gerando PIX...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Gerar PIX - R$ {currentPlan.price.toFixed(2).replace(".", ",")}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
