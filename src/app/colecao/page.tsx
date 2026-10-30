import type { Metadata } from "next";
import { produtos } from "@/data/produtos";
import { Header } from "@/components/Header";
import { Catalogo } from "@/components/Catalogo";
import { PreferenciasSection } from "@/components/PreferenciasSection";

export const metadata: Metadata = {
  title: "Nossa Coleção | NOVA Calçados Premium",
  description:
    "Explore a coleção completa de calçados premium NOVA: busque, filtre por marca, categoria, gênero, tamanho, cor e preço.",
};

export default function ColecaoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-secondary/30 py-12 text-center sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="animate-fade-in text-xs font-medium tracking-[0.25em] text-muted-foreground sm:tracking-[0.3em]">
            COLEÇÃO COMPLETA
          </p>
          <h1 className="animate-fade-in-up mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Nossa Coleção
          </h1>
          <p className="animate-fade-in-up mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Produção limitada e exclusiva: couro selecionado, acabamento
            impecável e modelos de primeira linha — busque, filtre e encontre
            o calçado perfeito para você.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
        <Catalogo produtos={produtos} />
      </section>

      <PreferenciasSection />
    </div>
  );
}
