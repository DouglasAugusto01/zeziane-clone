import type { Produto } from "@/data/produtos";
import { precoFinal } from "@/data/produtos";

export type OpcoesCatalogo = {
  marcas: string[];
  categorias: string[];
  cores: string[];
  tamanhos: string[];
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
  const precos = produtos.map(precoFinal);

  return {
    marcas,
    categorias,
    cores,
    tamanhos,
    precoMin: Math.floor(Math.min(...precos)),
    precoMax: Math.ceil(Math.max(...precos)),
  };
}

export type Ordenacao = "relevancia" | "menor-preco" | "maior-preco" | "nome" | "recentes";

export function ordenarProdutos(produtos: Produto[], ordenacao: Ordenacao): Produto[] {
  const copia = [...produtos];
  switch (ordenacao) {
    case "menor-preco":
      return copia.sort((a, b) => precoFinal(a) - precoFinal(b));
    case "maior-preco":
      return copia.sort((a, b) => precoFinal(b) - precoFinal(a));
    case "nome":
      return copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    case "recentes":
      return copia.sort((a, b) => Number(b.id) - Number(a.id));
    default:
      return copia;
  }
}
