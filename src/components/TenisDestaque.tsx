import Link from "next/link";
import type { Produto } from "@/data/produtos";
import { CatalogoProdutoCard } from "@/components/CatalogoProdutoCard";

export function TenisDestaque({ produtos }: { produtos: Produto[] }) {
  const destaques = produtos.filter((p) => p.destaque);

  return (
    <section id="destaque" className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center sm:mb-10">
        <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          Tênis em destaque
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Os modelos mais vendidos da coleção NOVA.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {destaques.map((produto, index) => (
          <CatalogoProdutoCard key={produto.id} produto={produto} index={index} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/colecao"
          className="inline-block rounded-full border border-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-accent"
        >
          Ver coleção completa
        </Link>
      </div>
    </section>
  );
}
