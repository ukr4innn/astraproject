import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Settings } from "lucide-react"
import Link from "next/link"

export default function ProdutosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 glitch-text" data-text="Produtos">
              Produtos
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o pack perfeito para elevar seu desempenho no jogo. Cada produto foi desenvolvido para oferecer
              máxima precisão e personalização.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* ALPHA Product */}
            <Card className="border-primary/50 bg-card hover:bg-card/80 transition-all duration-300 hover:glow-red group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-20 w-20 text-primary mx-auto mb-4" />
                    <Badge className="bg-primary/20 text-primary border-primary/50 text-sm">
                      Combate / Performance
                    </Badge>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-3xl">ALPHA – Pack Tático</CardTitle>
                <CardDescription className="text-lg">
                  Controle, leitura de cenário e UI tática. Ferramentas avançadas para jogadores que buscam precisão
                  máxima.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Recursos principais:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Overlay tático avançado</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>HUD personalizado</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Ajustes de precisão</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Sistema de perfis</span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 energy-gradient text-lg py-3">Comprar ALPHA</Button>
                  <Button variant="outline" className="flex-1 bg-transparent text-lg py-3" asChild>
                    <Link href="/produto/alpha">Ver detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* OMEGA Product */}
            <Card className="border-secondary/50 bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 group">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-20 w-20 text-secondary mx-auto mb-4" />
                    <Badge className="bg-secondary/20 text-secondary border-secondary/50 text-sm">
                      Visual / Personalização
                    </Badge>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-3xl">OMEGA – Pack Visual</CardTitle>
                <CardDescription className="text-lg">
                  Impacto visual e personalização cinematográfica. Transforme sua experiência de jogo com efeitos
                  impressionantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Recursos principais:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Efeitos visuais cinematográficos</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Traçantes personalizados</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Temas de HUD únicos</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>Perfis visuais salvos</span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-lg py-3">
                    Comprar OMEGA
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent text-lg py-3" asChild>
                    <Link href="/produto/omega">Ver detalhes</Link>
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
