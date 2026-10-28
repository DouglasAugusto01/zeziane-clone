"use client";

import { useMemo, useState } from "react";
import { ProdutoCard } from "@/components/ProdutoCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Produto, Genero } from "@/data/produtos";
import { cn } from "@/lib/utils";

const filtrosGenero: { label: string; value: Genero | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Feminino", value: "feminino" },
  { label: "Masculino", value: "masculino" },
];

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

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:mb-10">
        <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
          {filtrosGenero.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setGenero(f.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
                genero === f.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Select value={marca} onValueChange={setMarca}>
          <SelectTrigger size="sm" className="w-40 rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as marcas</SelectItem>
            {marcas.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          Nenhum produto encontrado com esses filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
