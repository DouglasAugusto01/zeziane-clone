import { getProdutoPorId, type Produto } from "@/data/produtos";

export type ItemCarrinho = {
  produto: Produto;
  cor: string;
  tamanho: string;
  quantidade: number;
};

export type ItemCarrinhoSalvo = {
  produtoId: string;
  cor: string;
  tamanho: string;
  quantidade: number;
};

export function mesmoItem(
  item: ItemCarrinho,
  produtoId: string,
  cor: string,
  tamanho: string
): boolean {
  return (
    item.produto.id === produtoId &&
    item.cor === cor &&
    item.tamanho === tamanho
  );
}

/** Adiciona um item; se já existir o mesmo produto+cor+tamanho, soma a quantidade. */
export function adicionarItem(
  itens: ItemCarrinho[],
  novo: ItemCarrinho
): ItemCarrinho[] {
  const existente = itens.find((i) =>
    mesmoItem(i, novo.produto.id, novo.cor, novo.tamanho)
  );
  if (existente) {
    return itens.map((i) =>
      i === existente ? { ...i, quantidade: i.quantidade + novo.quantidade } : i
    );
  }
  return [...itens, novo];
}

export function removerItem(
  itens: ItemCarrinho[],
  produtoId: string,
  cor: string,
  tamanho: string
): ItemCarrinho[] {
  return itens.filter((i) => !mesmoItem(i, produtoId, cor, tamanho));
}

/** Atualiza a quantidade de um item; quantidade <= 0 remove o item. */
export function atualizarQuantidadeItem(
  itens: ItemCarrinho[],
  produtoId: string,
  cor: string,
  tamanho: string,
  quantidade: number
): ItemCarrinho[] {
  if (quantidade <= 0) return removerItem(itens, produtoId, cor, tamanho);
  return itens.map((i) =>
    mesmoItem(i, produtoId, cor, tamanho) ? { ...i, quantidade } : i
  );
}

export function paraSalvar(itens: ItemCarrinho[]): ItemCarrinhoSalvo[] {
  return itens.map((i) => ({
    produtoId: i.produto.id,
    cor: i.cor,
    tamanho: i.tamanho,
    quantidade: i.quantidade,
  }));
}

/** Reidrata itens salvos, descartando produtos que não existem mais. */
export function reidratarItens(salvos: ItemCarrinhoSalvo[]): ItemCarrinho[] {
  return salvos
    .map((i): ItemCarrinho | null => {
      const produto = getProdutoPorId(i.produtoId);
      if (!produto) return null;
      return {
        produto,
        cor: i.cor,
        tamanho: i.tamanho,
        quantidade: i.quantidade,
      };
    })
    .filter((i): i is ItemCarrinho => i !== null);
}
