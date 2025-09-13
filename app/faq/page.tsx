import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqData = [
    {
      question: "Como faço para instalar o Astra Project?",
      answer:
        "Após a compra, você receberá um email com o link de download e sua chave de ativação. Execute o instalador, insira sua chave quando solicitado e siga o assistente de configuração. O processo leva apenas alguns minutos.",
    },
    {
      question: "Como recebo atualizações do produto?",
      answer:
        "As atualizações são automáticas e incluídas na sua licença vitalícia. O sistema verifica por atualizações automaticamente e você será notificado quando uma nova versão estiver disponível. Todas as atualizações são gratuitas.",
    },
    {
      question: "Quais são os requisitos de sistema?",
      answer:
        "Windows 10 (64-bit) ou Windows 11, 4GB RAM mínimo (8GB recomendado), 500MB-1GB de espaço livre em disco, e placa de vídeo compatível com DirectX 11/12. Para melhor performance visual, recomendamos GPU dedicada.",
    },
    {
      question: "Posso usar em múltiplos computadores?",
      answer:
        "Sim, sua licença permite instalação em até 3 computadores pessoais. Você pode gerenciar suas ativações através do painel de controle do produto ou entrando em contato com nosso suporte.",
    },
    {
      question: "Como funciona o suporte técnico?",
      answer:
        "Oferecemos suporte 24/7 via Discord com tempo de resposta médio de 30 minutos. Também disponibilizamos suporte por email para questões mais complexas. Nossa comunidade Discord também é muito ativa em ajudar outros usuários.",
    },
    {
      question: "Qual é a política de reembolso?",
      answer:
        "Oferecemos garantia de 7 dias para reembolso total, sem perguntas. Se você não estiver satisfeito com o produto por qualquer motivo, entre em contato conosco dentro de 7 dias da compra para solicitar o reembolso.",
    },
    {
      question: "O produto é seguro de usar?",
      answer:
        "Sim, nossos produtos são desenvolvidos seguindo as melhores práticas de segurança. Não coletamos dados pessoais desnecessários e todas as comunicações são criptografadas. Realizamos atualizações regulares de segurança.",
    },
    {
      question: "Como personalizo as configurações?",
      answer:
        "Cada produto inclui um painel de controle intuitivo onde você pode ajustar todas as configurações. O ALPHA foca em ajustes táticos e de performance, enquanto o OMEGA oferece opções de personalização visual e efeitos.",
    },
    {
      question: "Posso usar com outros softwares similares?",
      answer:
        "Recomendamos usar apenas um produto de enhancement por vez para evitar conflitos. Nossos produtos são projetados para serem completos e não necessitam de software adicional para funcionar adequadamente.",
    },
    {
      question: "Como entro em contato para suporte?",
      answer:
        "A forma mais rápida é através do nosso Discord oficial. Você também pode usar o formulário de contato em nossa página de suporte ou enviar email diretamente. Sempre respondemos dentro de 24 horas.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container px-4">
          <div className="text-center mb-16">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 glitch-text" data-text="FAQ">
              FAQ
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encontre respostas para as perguntas mais frequentes sobre nossos produtos e serviços
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 bg-card hover:bg-card/80 transition-colors"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto border-primary/50 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <MessageCircle className="h-16 w-16 text-primary mx-auto" />
                <h3 className="font-heading text-3xl font-bold">Não encontrou sua resposta?</h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Nossa equipe de suporte está sempre pronta para ajudar com qualquer dúvida específica
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="energy-gradient" asChild>
                    <Link href="/suporte">Entrar em contato</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Discord Community
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
