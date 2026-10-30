import type { Produto } from "@/data/produtos";

export type OpcoesCatalogo = {
  marcas: string[];
  categorias: string[];
  cores: string[];
  tamanhos: string[];
  /** Em reais (não centavos) — usados como placeholder dos campos de preço. */
  precoMin: number;
  precoMax: number;
};

export function listarOpcoes(produtos: Produto[]): OpcoesCatalogo {
  const marcas = Array.from(new Set(produtos.map((p) => p.marca))).sort();
  const categorias = Array.from(new Set(produtos.map((p) => p.categoria))).sort();
  const cores = Array.from(new Set(produtos.flatMap((p) => p.cores))).sort();
  const tamanhos = Array.from(new Set(produtos.flatMap((p) => p.tamanhos))).sort(
    (a, b) => Number(a) - Number(b)
  );
  const precosCentavos = produtos.map((p) => p.precoPixCentavos);

  return {
    marcas,
    categorias,
    cores,
    tamanhos,
    precoMin: Math.floor(Math.min(...precosCentavos) / 100),
    precoMax: Math.ceil(Math.max(...precosCentavos) / 100),
  };
}

export type Ordenacao = "relevancia" | "menor-preco" | "maior-preco" | "nome" | "recentes";

export function ordenarProdutos(produtos: Produto[], ordenacao: Ordenacao): Produto[] {
  const copia = [...produtos];
  switch (ordenacao) {
    case "menor-preco":
      return copia.sort((a, b) => a.precoPixCentavos - b.precoPixCentavos);
    case "maior-preco":
      return copia.sort((a, b) => b.precoPixCentavos - a.precoPixCentavos);
    case "nome":
      return copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    case "recentes":
      return copia.sort((a, b) => Number(b.id) - Number(a.id));
    default:
      return copia;
  }
}
