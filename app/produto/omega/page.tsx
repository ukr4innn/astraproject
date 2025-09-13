"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, CheckCircle, Monitor, Zap, Eye, Palette, Sparkles, HelpCircle } from "lucide-react"

export default function OmegaProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const galleryImages = [
    "/cinematic-visual-effects-orange-gaming.png",
    "/custom-tracers-visual-effects.png",
    "/hud-themes-orange-interface.png",
    "/visual-profiles-gaming-dashboard.png",
    "/particle-effects-gaming-interface.png",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-secondary/20 text-secondary border-secondary/50">Visual / Personalização</Badge>
              <h1 className="font-heading text-5xl md:text-6xl font-bold glitch-text" data-text="OMEGA">
                OMEGA
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground">Pack Visual</h2>
              <p className="text-lg text-muted-foreground">
                Impacto visual e personalização cinematográfica. Efeitos e visualizações cinematográficas: trilhas,
                impactos, partículas e estilos únicos.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-secondary">R$ 79,90</span>
                <Badge variant="outline" className="border-secondary/50 text-secondary">
                  Licença vitalícia
                </Badge>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-lg px-8 py-3"
              >
                Comprar OMEGA agora
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center">
                <Settings className="h-32 w-32 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-card">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="features">Recursos</TabsTrigger>
                  <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                  <TabsTrigger value="howto">Como usar</TabsTrigger>
                  <TabsTrigger value="support">Suporte</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Sobre o OMEGA Pack</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        O OMEGA Pack Visual foi criado para jogadores que valorizam a estética e querem uma experiência
                        visual única. Com efeitos cinematográficos, traçantes personalizados e temas de HUD exclusivos,
                        transforme seu jogo em uma experiência visual impressionante.
                      </p>
                      <p>
                        Perfeito para streamers, criadores de conteúdo e jogadores que querem se destacar com visuais
                        únicos e impactantes.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Gallery */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Galeria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img
                            src={galleryImages[selectedImage] || "/placeholder.svg"}
                            alt="OMEGA Preview"
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {galleryImages.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`aspect-video bg-muted rounded overflow-hidden border-2 transition-colors ${
                                selectedImage === index ? "border-secondary" : "border-transparent"
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <Sparkles className="h-8 w-8 text-secondary mb-2" />
                        <CardTitle className="font-heading">Efeitos Visuais</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Efeitos cinematográficos avançados com partículas, explosões e impactos visuais únicos.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Zap className="h-8 w-8 text-secondary mb-2" />
                        <CardTitle className="font-heading">Traçantes Personalizados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Sistema de traçantes customizáveis com cores, formas e efeitos de trilha únicos.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Palette className="h-8 w-8 text-secondary mb-2" />
                        <CardTitle className="font-heading">Temas de HUD</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Coleção exclusiva de temas visuais para interface com estilos únicos e personalizáveis.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Eye className="h-8 w-8 text-secondary mb-2" />
                        <CardTitle className="font-heading">Perfis Visuais</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Salve e alterne entre diferentes configurações visuais para cada situação de jogo.</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="requirements">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Requisitos do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Sistema Operacional:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Windows 10 (64-bit) ou superior</li>
                          <li>• Windows 11 (recomendado)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Hardware:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• 6GB RAM mínimo (8GB recomendado)</li>
                          <li>• 1GB espaço livre em disco</li>
                          <li>• Placa de vídeo compatível com DirectX 12</li>
                          <li>• GPU dedicada recomendada para melhor performance</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="howto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Comece em 3 passos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Baixar</h4>
                            <p className="text-muted-foreground">
                              Após a compra, você receberá o link para download e sua chave de ativação por email.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Configurar</h4>
                            <p className="text-muted-foreground">
                              Execute o instalador e escolha seus temas visuais preferidos usando nossa galeria.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Jogar</h4>
                            <p className="text-muted-foreground">
                              Inicie seu jogo e desfrute dos efeitos visuais impressionantes do OMEGA Pack.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="support">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading">Suporte e FAQ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-secondary" />
                            Como personalizo os efeitos visuais?
                          </h4>
                          <p className="text-muted-foreground">
                            Use o painel de controle do OMEGA para ajustar cores, intensidade e tipos de efeitos.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-secondary" />
                            Os efeitos afetam a performance?
                          </h4>
                          <p className="text-muted-foreground">
                            Nossos efeitos são otimizados para impacto mínimo na performance, com opções de qualidade
                            ajustáveis.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-secondary" />
                            Posso criar meus próprios temas?
                          </h4>
                          <p className="text-muted-foreground">
                            Sim, o OMEGA inclui ferramentas para criar e compartilhar seus próprios temas visuais.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase CTA */}
              <Card className="border-secondary/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-heading text-xl font-bold">OMEGA Pack Visual</h3>
                  <div className="text-3xl font-bold text-secondary">R$ 79,90</div>
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70">
                    Comprar agora
                  </Button>
                </CardContent>
              </Card>

              {/* Includes */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                    Inclui
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Licença vitalícia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Atualizações gratuitas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Suporte via Discord</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Biblioteca de temas</span>
                  </div>
                </CardContent>
              </Card>

              {/* Compatibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <Monitor className="h-5 w-5 text-primary mr-2" />
                    Compatibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Windows 10</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Windows 11</span>
                  </div>
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
