import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container px-4">
          <div className="text-center mb-16">
            <FileText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 glitch-text" data-text="Termos">
              Termos de Uso
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leia atentamente nossos termos de uso antes de utilizar nossos produtos e serviços
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ao adquirir e utilizar os produtos Astra Project, você concorda em cumprir e estar vinculado a estes
                  Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos produtos.
                </p>
                <p>
                  Estes termos constituem um acordo legal entre você e Astra Project, e se aplicam ao uso de todos os
                  nossos produtos, incluindo ALPHA Pack Tático e OMEGA Pack Visual.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">2. Licença de Uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Concedemos a você uma licença pessoal, não exclusiva, intransferível e revogável para usar nossos
                  produtos de acordo com estes termos. Esta licença permite:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Instalação em até 3 (três) computadores pessoais</li>
                  <li>Uso pessoal e não comercial dos produtos</li>
                  <li>Acesso a atualizações gratuitas durante a vigência da licença</li>
                  <li>Suporte técnico através dos canais oficiais</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">3. Restrições de Uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Você concorda em NÃO:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Redistribuir, vender ou compartilhar os produtos com terceiros</li>
                  <li>Fazer engenharia reversa, descompilar ou desmontar o software</li>
                  <li>Usar os produtos para fins comerciais sem autorização expressa</li>
                  <li>Remover ou alterar avisos de direitos autorais ou propriedade</li>
                  <li>Usar os produtos de forma que viole leis locais ou internacionais</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">4. Política de Reembolso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Oferecemos uma garantia de satisfação de 7 (sete) dias a partir da data de compra. Durante este
                  período, você pode solicitar reembolso total sem necessidade de justificativa.
                </p>
                <p>
                  Para solicitar reembolso, entre em contato através dos nossos canais oficiais de suporte dentro do
                  prazo estabelecido. O reembolso será processado no mesmo método de pagamento utilizado na compra.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">5. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Todos os direitos, títulos e interesses nos produtos Astra Project, incluindo mas não limitado a
                  código-fonte, design, marca registrada e conteúdo, são de propriedade exclusiva da Astra Project.
                </p>
                <p>
                  Esta licença não transfere qualquer direito de propriedade intelectual, concedendo apenas o direito de
                  uso conforme especificado nestes termos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">6. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Os produtos são fornecidos "como estão" sem garantias de qualquer tipo. Não garantimos que os produtos
                  atenderão às suas necessidades específicas ou funcionarão sem interrupções.
                </p>
                <p>
                  Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, incidentais ou
                  consequenciais decorrentes do uso ou incapacidade de usar nossos produtos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">7. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após a publicação em nosso site oficial.
                </p>
                <p>
                  É sua responsabilidade revisar periodicamente estes termos. O uso continuado dos produtos após
                  alterações constitui aceitação dos novos termos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">8. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Para questões relacionadas a estes termos ou nossos produtos, entre em contato através dos nossos
                  canais oficiais de suporte:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Discord: Comunidade oficial Astra Project</li>
                  <li>E-mail: suporte@astraproject.com</li>
                  <li>Formulário de contato: /suporte</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center pt-8">
              <p className="text-sm text-muted-foreground">Última atualização: Janeiro de 2024</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
