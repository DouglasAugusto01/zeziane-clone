"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Produto } from "@/data/produtos";
import { listarOpcoes, ordenarProdutos, type Ordenacao } from "@/lib/produtos-helpers";
import {
  CatalogoFiltros,
  FILTROS_VAZIOS,
  type EstadoFiltros,
} from "@/components/CatalogoFiltros";
import { CatalogoProdutoCard } from "@/components/CatalogoProdutoCard";
import { CatalogoProdutoCardSkeleton } from "@/components/CatalogoProdutoCardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPCOES_ORDENACAO: { label: string; value: Ordenacao }[] = [
  { label: "Relevância", value: "relevancia" },
  { label: "Menor preço", value: "menor-preco" },
  { label: "Maior preço", value: "maior-preco" },
  { label: "Nome (A–Z)", value: "nome" },
  { label: "Mais recentes", value: "recentes" },
];

export function Catalogo({ produtos }: { produtos: Produto[] }) {
  const opcoes = useMemo(() => listarOpcoes(produtos), [produtos]);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<EstadoFiltros>(FILTROS_VAZIOS);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Breve carregamento simulado ao montar — dá feedback de progresso mesmo
  // sem uma requisição de rede real.
  useEffect(() => {
    const t = setTimeout(() => setCarregando(false), 320);
    return () => clearTimeout(t);
  }, []);

  // Disparado a partir de cada handler de busca/filtro/ordenação (não de um
  // efeito reagindo ao estado) para evitar setState síncrono dentro de effect.
  const sinalizarCarregando = () => {
    setCarregando(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCarregando(false), 320);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resultado = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const filtrado = produtos.filter((p) => {
      if (filtros.marca !== "todas" && p.marca !== filtros.marca) return false;
      if (filtros.categoria !== "todas" && p.categoria !== filtros.categoria)
        return false;
      if (filtros.genero !== "todos" && p.genero !== filtros.genero) return false;
      if (filtros.cor !== "todas" && !p.cores.includes(filtros.cor)) return false;
      if (filtros.tamanho !== "todos" && !p.tamanhos.includes(filtros.tamanho))
        return false;

      const precoReais = p.precoPixCentavos / 100;
      if (filtros.precoMin && precoReais < Number(filtros.precoMin)) return false;
      if (filtros.precoMax && precoReais > Number(filtros.precoMax)) return false;

      if (termo && !`${p.nome} ${p.marca}`.toLowerCase().includes(termo)) {
        return false;
      }

      return true;
    });

    return ordenarProdutos(filtrado, ordenacao);
  }, [produtos, busca, filtros, ordenacao]);

  const filtrosAtivos =
    busca.trim() !== "" ||
    filtros.marca !== "todas" ||
    filtros.categoria !== "todas" ||
    filtros.genero !== "todos" ||
    filtros.cor !== "todas" ||
    filtros.tamanho !== "todos" ||
    filtros.precoMin !== "" ||
    filtros.precoMax !== "";

  const limparTudo = () => {
    setBusca("");
    setFiltros(FILTROS_VAZIOS);
    sinalizarCarregando();
  };

  const atualizarFiltros = (patch: Partial<EstadoFiltros>) => {
    setFiltros((f) => ({ ...f, ...patch }));
    sinalizarCarregando();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              sinalizarCarregando();
            }}
            placeholder="Buscar por nome ou marca..."
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-foreground"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerAberto(true)}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors hover:border-foreground/40 lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filtros
          </button>

          <Select
            value={ordenacao}
            onValueChange={(v) => {
              setOrdenacao(v as Ordenacao);
              sinalizarCarregando();
            }}
          >
            <SelectTrigger size="sm" className="w-44 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPCOES_ORDENACAO.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <CatalogoFiltros
              opcoes={opcoes}
              filtros={filtros}
              onMudar={atualizarFiltros}
              onLimpar={limparTudo}
            />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              {carregando
                ? "Buscando produtos..."
                : `${resultado.length} ${
                    resultado.length === 1
                      ? "produto encontrado"
                      : "produtos encontrados"
                  }`}
            </span>
            {filtrosAtivos && !carregando && (
              <button
                type="button"
                onClick={limparTudo}
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {carregando ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CatalogoProdutoCardSkeleton key={i} />
              ))}
            </div>
          ) : resultado.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum produto encontrado com esses filtros.
              </p>
              <button
                type="button"
                onClick={limparTudo}
                className="text-xs font-medium uppercase tracking-wide underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {resultado.map((produto, index) => (
                <CatalogoProdutoCard key={produto.id} produto={produto} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawer de filtros — mobile/tablet */}
      <div
        aria-hidden={!drawerAberto}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          drawerAberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerAberto(false)}
      />
      <div
        role="dialog"
        aria-label="Filtros do catálogo"
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-background p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          drawerAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-heading text-lg font-semibold">Filtrar produtos</p>
          <button
            type="button"
            aria-label="Fechar filtros"
            onClick={() => setDrawerAberto(false)}
            className="flex size-8 items-center justify-center rounded-full hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>
        <CatalogoFiltros
          opcoes={opcoes}
          filtros={filtros}
          onMudar={atualizarFiltros}
          onLimpar={limparTudo}
        />
        <button
          type="button"
          onClick={() => setDrawerAberto(false)}
          className="mt-6 w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background"
        >
          Ver {resultado.length} produtos
        </button>
      </div>
    </div>
  );
}
