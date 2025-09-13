"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Settings, CheckCircle, Monitor, Eye, Users, HelpCircle } from "lucide-react"

export default function AlphaProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const galleryImages = [
    "/tactical-overlay-interface-dark-red.png",
    "/custom-hud-gaming-interface.png",
    "/precision-settings-panel-dark.png",
    "/profile-management-interface.png",
    "/tactical-gaming-dashboard.png",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/50">Combate / Performance</Badge>
              <h1 className="font-heading text-5xl md:text-6xl font-bold glitch-text" data-text="ALPHA">
                ALPHA
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground">Pack Tático</h2>
              <p className="text-lg text-muted-foreground">
                Controle, leitura de cenário e UI tática. Ferramentas e ajustes avançados para leitura de cenário, UI
                tática e controle fino. Pronto para ação.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">R$ 89,90</span>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  Licença vitalícia
                </Badge>
              </div>
              <Button size="lg" className="energy-gradient glow-red text-lg px-8 py-3">
                Comprar ALPHA agora
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <Target className="h-32 w-32 text-primary" />
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
                      <CardTitle className="font-heading">Sobre o ALPHA Pack</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        O ALPHA Pack Tático foi desenvolvido para jogadores que buscam precisão máxima e controle total
                        sobre sua experiência de jogo. Com ferramentas avançadas de overlay tático e personalização de
                        HUD, você terá todas as informações necessárias na ponta dos dedos.
                      </p>
                      <p>
                        Ideal para jogadores competitivos que precisam de leitura rápida de cenário e ajustes finos para
                        diferentes situações de combate.
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
                            alt="ALPHA Preview"
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {galleryImages.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`aspect-video bg-muted rounded overflow-hidden border-2 transition-colors ${
                                selectedImage === index ? "border-primary" : "border-transparent"
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
                        <Target className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="font-heading">Overlay Tático</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Sistema avançado de overlay com informações em tempo real sobre posicionamento e estratégia.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Eye className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="font-heading">HUD Personalizado</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Interface customizável com elementos posicionáveis e temas personalizados.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Settings className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="font-heading">Ajustes Finos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Controles precisos para sensibilidade, timing e configurações avançadas.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="font-heading">Sistema de Perfis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Salve e alterne entre diferentes configurações para diversos estilos de jogo.</p>
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
                          <li>• 4GB RAM mínimo (8GB recomendado)</li>
                          <li>• 500MB espaço livre em disco</li>
                          <li>• Placa de vídeo compatível com DirectX 11</li>
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
                          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
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
                          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Configurar</h4>
                            <p className="text-muted-foreground">
                              Execute o instalador e configure suas preferências iniciais usando nosso assistente.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Jogar</h4>
                            <p className="text-muted-foreground">
                              Inicie seu jogo e aproveite todas as funcionalidades do ALPHA Pack.
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
                            <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                            Como ativo minha licença?
                          </h4>
                          <p className="text-muted-foreground">
                            Após o download, execute o programa e insira a chave de ativação enviada por email.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                            Posso usar em múltiplos PCs?
                          </h4>
                          <p className="text-muted-foreground">
                            Sim, sua licença permite instalação em até 3 computadores pessoais.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                            Como recebo atualizações?
                          </h4>
                          <p className="text-muted-foreground">
                            Atualizações são automáticas e incluídas na sua licença vitalícia.
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
              <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-heading text-xl font-bold">ALPHA Pack Tático</h3>
                  <div className="text-3xl font-bold text-primary">R$ 89,90</div>
                  <Button className="w-full energy-gradient glow-red">Comprar agora</Button>
                </CardContent>
              </Card>

              {/* Includes */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Inclui
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Licença vitalícia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Atualizações gratuitas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Suporte via Discord</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Guia de instalação</span>
                  </div>
                </CardContent>
              </Card>

              {/* Compatibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <Monitor className="h-5 w-5 text-secondary mr-2" />
                    Compatibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Windows 10</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
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
