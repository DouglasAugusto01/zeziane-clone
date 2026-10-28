import { produtos } from "@/data/produtos";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Diferenciais } from "@/components/Diferenciais";
import { ColecaoProdutos } from "@/components/ColecaoProdutos";
import { PreferenciasSection } from "@/components/PreferenciasSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Diferenciais />

      <section id="colecao" className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-center font-heading text-xl font-semibold tracking-tight sm:mb-10 sm:text-2xl md:text-3xl">
          Coleção exclusiva — selecione suas preferências
        </h2>

        <ColecaoProdutos produtos={produtos} />
      </section>

      <PreferenciasSection />
    </div>
  );
}
