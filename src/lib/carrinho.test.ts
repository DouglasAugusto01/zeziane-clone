import { describe, expect, it } from "vitest";
import { produtos } from "@/data/produtos";
import {
  adicionarItem,
  atualizarQuantidadeItem,
  paraSalvar,
  reidratarItens,
  removerItem,
} from "@/lib/carrinho";

const [produtoA, produtoB] = produtos;

describe("adicionarItem", () => {
  it("adiciona um item novo a um carrinho vazio", () => {
    const resultado = adicionarItem([], {
      produto: produtoA,
      cor: produtoA.cores[0],
      tamanho: produtoA.tamanhos[0],
      quantidade: 1,
    });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].quantidade).toBe(1);
  });

  it("soma a quantidade em vez de duplicar quando produto+cor+tamanho já existem", () => {
    const base = [
      {
        produto: produtoA,
        cor: produtoA.cores[0],
        tamanho: produtoA.tamanhos[0],
        quantidade: 2,
      },
    ];
    const resultado = adicionarItem(base, {
      produto: produtoA,
      cor: produtoA.cores[0],
      tamanho: produtoA.tamanhos[0],
      quantidade: 3,
    });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].quantidade).toBe(5);
  });

  it("trata o mesmo produto com tamanho diferente como item distinto", () => {
    const base = [
      {
        produto: produtoA,
        cor: produtoA.cores[0],
        tamanho: produtoA.tamanhos[0],
        quantidade: 1,
      },
    ];
    const resultado = adicionarItem(base, {
      produto: produtoA,
      cor: produtoA.cores[0],
      tamanho: produtoA.tamanhos[1],
      quantidade: 1,
    });
    expect(resultado).toHaveLength(2);
  });
});

describe("removerItem", () => {
  it("remove só o item com o produto+cor+tamanho pedido", () => {
    const base = [
      {
        produto: produtoA,
        cor: produtoA.cores[0],
        tamanho: produtoA.tamanhos[0],
        quantidade: 1,
      },
      {
        produto: produtoB,
        cor: produtoB.cores[0],
        tamanho: produtoB.tamanhos[0],
        quantidade: 1,
      },
    ];
    const resultado = removerItem(
      base,
      produtoA.id,
      produtoA.cores[0],
      produtoA.tamanhos[0]
    );
    expect(resultado).toHaveLength(1);
    expect(resultado[0].produto.id).toBe(produtoB.id);
  });
});

describe("atualizarQuantidadeItem", () => {
  const base = [
    {
      produto: produtoA,
      cor: produtoA.cores[0],
      tamanho: produtoA.tamanhos[0],
      quantidade: 1,
    },
  ];

  it("atualiza a quantidade do item", () => {
    const resultado = atualizarQuantidadeItem(
      base,
      produtoA.id,
      produtoA.cores[0],
      produtoA.tamanhos[0],
      7
    );
    expect(resultado[0].quantidade).toBe(7);
  });

  it("remove o item quando a quantidade cai para 0 ou menos", () => {
    const resultado = atualizarQuantidadeItem(
      base,
      produtoA.id,
      produtoA.cores[0],
      produtoA.tamanhos[0],
      0
    );
    expect(resultado).toHaveLength(0);
  });
});

describe("paraSalvar / reidratarItens", () => {
  it("faz round-trip sem perder dados", () => {
    const itens = [
      {
        produto: produtoA,
        cor: produtoA.cores[0],
        tamanho: produtoA.tamanhos[0],
        quantidade: 2,
      },
    ];
    const reidratado = reidratarItens(paraSalvar(itens));
    expect(reidratado).toEqual(itens);
  });

  it("descarta itens salvos cujo produto não existe mais", () => {
    const reidratado = reidratarItens([
      { produtoId: "id-que-nao-existe", cor: "Preto", tamanho: "40", quantidade: 1 },
    ]);
    expect(reidratado).toHaveLength(0);
  });
});
