import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImagemLazy } from "@/components/ImagemLazy";
import type { Produto } from "@/data/produtos";
import { formatarReais } from "@/lib/utils";

const CORES_SWATCH: Record<string, string> = {
  Preto: "#1a1a1a",
  Branco: "#f5f5f5",
  Rosa: "#f472b6",
  Vermelho: "#dc2626",
  Azul: "#2563eb",
};

export function CatalogoProdutoCard({
  produto,
  index = 0,
}: {
  produto: Produto;
  index?: number;
}) {
  return (
    <Link
      href={`/produto/${produto.id}`}
      className="animate-fade-in-up group block overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="aspect-square bg-secondary/50">
        <ImagemLazy
          src={produto.imagem}
          alt={produto.nome}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 px-5 pb-5 pt-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {produto.marca} • {produto.categoria}
        </p>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          {produto.nome}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {produto.descricao[0]}
        </p>

        <div className="flex items-center gap-1.5 pt-1">
          {produto.cores.map((cor) => (
            <span
              key={cor}
              title={cor}
              className="size-4 rounded-full border border-border"
              style={{ backgroundColor: CORES_SWATCH[cor] ?? "#999" }}
            />
          ))}
          <span className="text-[11px] text-muted-foreground">
            {produto.cores.join(" / ")}
          </span>
        </div>

        <p className="text-[11px] text-muted-foreground">
          Tamanhos {produto.tamanhos[0]}–{produto.tamanhos[produto.tamanhos.length - 1]}
        </p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-base font-semibold">
            {formatarReais(produto.precoPixCentavos)}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-foreground text-[11px] uppercase tracking-wide"
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </Link>
  );
}
