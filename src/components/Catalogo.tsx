"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Genero, Produto } from "@/data/produtos";
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

const GENEROS_VALIDOS: (Genero | "todos")[] = [
  "todos",
  "masculino",
  "feminino",
  "unissex",
];
const ORDENACOES_VALIDAS: Ordenacao[] = [
  "relevancia",
  "menor-preco",
  "maior-preco",
  "nome",
  "recentes",
];

function filtrosDaUrl(params: URLSearchParams): {
  busca: string;
  filtros: EstadoFiltros;
  ordenacao: Ordenacao;
} {
  const genero = params.get("genero");
  const ordenacao = params.get("ordenacao");

  return {
    busca: params.get("busca") ?? "",
    filtros: {
      marca: params.get("marca") ?? "todas",
      categoria: params.get("categoria") ?? "todas",
      genero: GENEROS_VALIDOS.includes(genero as Genero)
        ? (genero as Genero)
        : "todos",
      cor: params.get("cor") ?? "todas",
      tamanho: params.get("tamanho") ?? "todos",
      precoMin: params.get("precoMin") ?? "",
      precoMax: params.get("precoMax") ?? "",
    },
    ordenacao: ORDENACOES_VALIDAS.includes(ordenacao as Ordenacao)
      ? (ordenacao as Ordenacao)
      : "relevancia",
  };
}

function urlDosFiltros(
  busca: string,
  filtros: EstadoFiltros,
  ordenacao: Ordenacao
): string {
  const params = new URLSearchParams();
  if (busca.trim()) params.set("busca", busca.trim());
  if (filtros.marca !== "todas") params.set("marca", filtros.marca);
  if (filtros.categoria !== "todas") params.set("categoria", filtros.categoria);
  if (filtros.genero !== "todos") params.set("genero", filtros.genero);
  if (filtros.cor !== "todas") params.set("cor", filtros.cor);
  if (filtros.tamanho !== "todos") params.set("tamanho", filtros.tamanho);
  if (filtros.precoMin) params.set("precoMin", filtros.precoMin);
  if (filtros.precoMax) params.set("precoMax", filtros.precoMax);
  if (ordenacao !== "relevancia") params.set("ordenacao", ordenacao);

  const query = params.toString();
  return query ? `/colecao?${query}` : "/colecao";
}

export function Catalogo({ produtos }: { produtos: Produto[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const opcoes = useMemo(() => listarOpcoes(produtos), [produtos]);

  const estadoInicial = useMemo(() => filtrosDaUrl(searchParams), []); // eslint-disable-line react-hooks/exhaustive-deps

  const [busca, setBusca] = useState(estadoInicial.busca);
  const [filtros, setFiltros] = useState<EstadoFiltros>(estadoInicial.filtros);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>(estadoInicial.ordenacao);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mantém a URL em sincronia com os filtros (compartilhável/recarregável),
  // substituindo a entrada atual do histórico em vez de empilhar uma nova
  // a cada clique.
  useEffect(() => {
    router.replace(urlDosFiltros(busca, filtros, ordenacao), { scroll: false });
  }, [busca, filtros, ordenacao, router]);

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

      if (termo) {
        // Busca "inteligente": também casa categoria, cor e gênero — não só
        // nome/marca. Ex: "preto" ou "esportivo" encontram produtos mesmo
        // que a palavra não esteja no nome comercial.
        const alvo = [
          p.nome,
          p.marca,
          p.categoria,
          p.genero,
          ...p.cores,
        ]
          .join(" ")
          .toLowerCase();
        if (!alvo.includes(termo)) return false;
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

  const generoLabel: Record<Genero, string> = {
    masculino: "Masculino",
    feminino: "Feminino",
    unissex: "Unissex",
  };

  type ChaveEtiqueta =
    | "busca"
    | "marca"
    | "categoria"
    | "genero"
    | "cor"
    | "tamanho"
    | "preco";

  // Apenas dados (sem funções armazenadas) — o clique é tratado por
  // removerEtiqueta() diretamente no JSX.
  const etiquetas: { chave: ChaveEtiqueta; label: string }[] = [];
  if (busca.trim()) etiquetas.push({ chave: "busca", label: `"${busca.trim()}"` });
  if (filtros.marca !== "todas")
    etiquetas.push({ chave: "marca", label: filtros.marca });
  if (filtros.categoria !== "todas")
    etiquetas.push({ chave: "categoria", label: filtros.categoria });
  if (filtros.genero !== "todos")
    etiquetas.push({ chave: "genero", label: generoLabel[filtros.genero] });
  if (filtros.cor !== "todas") etiquetas.push({ chave: "cor", label: filtros.cor });
  if (filtros.tamanho !== "todos")
    etiquetas.push({ chave: "tamanho", label: `Tam. ${filtros.tamanho}` });
  if (filtros.precoMin || filtros.precoMax)
    etiquetas.push({
      chave: "preco",
      label: `R$ ${filtros.precoMin || opcoes.precoMin} – R$ ${
        filtros.precoMax || opcoes.precoMax
      }`,
    });

  const removerEtiqueta = (chave: ChaveEtiqueta) => {
    if (chave === "busca") {
      setBusca("");
      sinalizarCarregando();
    } else if (chave === "preco") {
      atualizarFiltros({ precoMin: "", precoMax: "" });
    } else if (chave === "genero") {
      atualizarFiltros({ genero: "todos" });
    } else if (chave === "tamanho") {
      atualizarFiltros({ tamanho: "todos" });
    } else {
      atualizarFiltros({ [chave]: "todas" });
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              sinalizarCarregando();
            }}
            placeholder="Buscar por nome, marca, cor..."
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

      {etiquetas.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {etiquetas.map((e) => (
            <button
              key={e.chave}
              type="button"
              onClick={() => removerEtiqueta(e.chave)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-3 pr-2 text-xs text-foreground/80 transition-colors hover:border-foreground/40"
            >
              {e.label}
              <X className="size-3" />
            </button>
          ))}
        </div>
      )}

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
