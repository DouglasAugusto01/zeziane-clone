import type { Metadata } from "next";
import Link from "next/link";
import { Footprints, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LINK_GRUPO_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Sobre Nós | NOVA Calçados Premium",
  description:
    "Conheça a filosofia da NOVA: produção limitada, materiais selecionados e atendimento direto, sem robôs, pelo WhatsApp.",
};

const pilares = [
  {
    icon: Sparkles,
    titulo: "Produção limitada",
    texto:
      "Cada lançamento é tratado como uma edição própria — não reabastecemos estoque indefinidamente só para vender mais.",
  },
  {
    icon: MessageCircle,
    titulo: "Atendimento direto",
    texto:
      "Sem robôs, sem formulário automatizado. Toda dúvida de numeração, disponibilidade ou condição de pagamento é resolvida com uma pessoa de verdade, pelo WhatsApp.",
  },
  {
    icon: Footprints,
    titulo: "Material selecionado",
    texto:
      "Couro italiano certificado e solado anatômico em cada par — detalhe que se sente no primeiro passo.",
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-secondary/30 py-14 text-center sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="animate-fade-in text-xs font-medium tracking-[0.25em] text-muted-foreground sm:tracking-[0.3em]">
            SOBRE A NOVA
          </p>
          <h1 className="animate-fade-in-up mx-auto mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Calçados premium não precisam de produção em massa para serem
            feitos com cuidado.
          </h1>
        </div>
      </section>

      <section className="container mx-auto max-w-2xl space-y-5 px-4 py-12 text-sm leading-relaxed text-foreground/90 sm:px-6 sm:py-16 sm:text-base">
        <p>
          A NOVA existe para quem valoriza um calçado bem-acabado mais do que
          um catálogo infinito. Em vez de repor estoque sem parar, cada
          modelo é tratado como uma produção limitada — pensado para durar,
          com atenção ao couro, ao corte e ao acabamento em cada detalhe.
        </p>
        <p>
          Não há conta, login nem checkout automatizado por aqui. Acreditamos
          que comprar um calçado premium também é sobre atendimento: tirar
          uma dúvida de numeração, confirmar disponibilidade, acertar cor e
          condição de pagamento com alguém do outro lado — por isso cada
          pedido é fechado diretamente com um vendedor pelo WhatsApp.
        </p>
      </section>

      <section className="bg-secondary/40 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
            {pilares.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="text-center">
                <Icon className="mx-auto size-7" strokeWidth={1.5} />
                <h2 className="mt-3 font-heading text-base font-semibold tracking-tight">
                  {titulo}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 text-center sm:py-16">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/85"
        >
          <Link href="/colecao">Ver Coleção</Link>
        </Button>

        <div className="mt-4">
          <a
            href={LINK_GRUPO_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-green-500"
          >
            Entrar no grupo de promoções
          </a>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          <Link
            href="/politica-de-privacidade"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Política de Privacidade
          </Link>
        </p>
      </section>

      <Footer />
    </div>
  );
}
