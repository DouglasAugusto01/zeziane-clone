"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProdutoCard } from "@/components/ProdutoCard";
import type { Produto, Genero } from "@/data/produtos";
import { cn } from "@/lib/utils";

const filtrosGenero: { label: string; value: Genero | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Feminino", value: "feminino" },
  { label: "Masculino", value: "masculino" },
  { label: "Unissex", value: "unissex" },
];

function FiltroPill({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={cn(
        "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
        ativo
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function ColecaoProdutos({ produtos }: { produtos: Produto[] }) {
  const [genero, setGenero] = useState<Genero | "todos">("todos");
  const [marca, setMarca] = useState<string>("todas");

  const marcas = useMemo(
    () => Array.from(new Set(produtos.map((p) => p.marca))).sort(),
    [produtos]
  );

  const produtosFiltrados = produtos.filter(
    (p) =>
      (genero === "todos" || p.genero === genero) &&
      (marca === "todas" || p.marca === marca)
  );

  const filtrosAtivos = genero !== "todos" || marca !== "todas";

  const limparFiltros = () => {
    setGenero("todos");
    setMarca("todas");
  };

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-3 sm:mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card p-1">
            {filtrosGenero.map((f) => (
              <FiltroPill
                key={f.value}
                ativo={genero === f.value}
                onClick={() => setGenero(f.value)}
              >
                {f.label}
              </FiltroPill>
            ))}
          </div>

          {marcas.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card p-1">
              <FiltroPill ativo={marca === "todas"} onClick={() => setMarca("todas")}>
                Todas as marcas
              </FiltroPill>
              {marcas.map((m) => (
                <FiltroPill key={m} ativo={marca === m} onClick={() => setMarca(m)}>
                  {m}
                </FiltroPill>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>
            {produtosFiltrados.length}{" "}
            {produtosFiltrados.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
          </span>
          {filtrosAtivos && (
            <button
              type="button"
              onClick={limparFiltros}
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum produto encontrado com esses filtros.
          </p>
          <button
            type="button"
            onClick={limparFiltros}
            className="text-xs font-medium uppercase tracking-wide underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {produtosFiltrados.map((produto, index) => (
            <ProdutoCard key={produto.id} produto={produto} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
