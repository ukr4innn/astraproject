"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HeadphonesIcon, MessageCircle, Mail, Clock, CheckCircle } from "lucide-react"

export default function SuportePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }
    if (!formData.subject.trim()) newErrors.subject = "Assunto é obrigatório"
    if (!formData.category) newErrors.category = "Categoria é obrigatória"
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="py-24">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-12">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h1 className="font-heading text-3xl font-bold mb-4">Mensagem Enviada!</h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Recebemos sua mensagem e nossa equipe entrará em contato em breve.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo de resposta médio: 2-4 horas</span>
                    </div>
                    <Button className="energy-gradient" onClick={() => setIsSubmitted(false)}>
                      Enviar outra mensagem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container px-4">
          <div className="text-center mb-16">
            <HeadphonesIcon className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 glitch-text" data-text="Suporte">
              Suporte
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa equipe está aqui para ajudar. Entre em contato conosco através dos canais abaixo
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold mb-6">Canais de Contato</h2>

              <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <CardTitle className="font-heading">Discord</CardTitle>
                  </div>
                  <Badge className="w-fit bg-primary/20 text-primary border-primary/50">Mais rápido</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Suporte em tempo real com nossa comunidade ativa. Tempo de resposta médio: 30 minutos.
                  </CardDescription>
                  <Button className="w-full energy-gradient">Entrar no Discord</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:bg-card/80 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-secondary" />
                    <CardTitle className="font-heading">E-mail</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Para questões mais complexas ou documentação detalhada. Resposta em até 24 horas.
                  </CardDescription>
                  <Button variant="outline" className="w-full bg-transparent">
                    suporte@astraproject.com
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:bg-card/80 transition-colors">
                <CardHeader>
                  <CardTitle className="font-heading">Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Discord:</span>
                    <span className="text-primary font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>E-mail:</span>
                    <span>Segunda a Domingo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resposta:</span>
                    <span>Até 24h</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Formulário de Contato</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={errors.name ? "border-destructive" : ""}
                          placeholder="Seu nome completo"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                          placeholder="seu@email.com"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Suporte Técnico</SelectItem>
                            <SelectItem value="billing">Cobrança/Pagamento</SelectItem>
                            <SelectItem value="product">Dúvidas sobre Produto</SelectItem>
                            <SelectItem value="bug">Reportar Bug</SelectItem>
                            <SelectItem value="feature">Sugestão de Recurso</SelectItem>
                            <SelectItem value="other">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          className={errors.subject ? "border-destructive" : ""}
                          placeholder="Resumo do problema ou dúvida"
                        />
                        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={errors.message ? "border-destructive" : ""}
                        placeholder="Descreva detalhadamente sua dúvida ou problema..."
                        rows={6}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button type="submit" className="w-full energy-gradient glow-red text-lg py-3">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
