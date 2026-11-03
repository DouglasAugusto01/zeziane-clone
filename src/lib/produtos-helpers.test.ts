import { describe, expect, it } from "vitest";
import { produtos } from "@/data/produtos";
import { listarOpcoes, ordenarProdutos } from "@/lib/produtos-helpers";

describe("ordenarProdutos", () => {
  it("ordena por menor preço", () => {
    const resultado = ordenarProdutos(produtos, "menor-preco");
    for (let i = 1; i < resultado.length; i++) {
      expect(resultado[i].precoPixCentavos).toBeGreaterThanOrEqual(
        resultado[i - 1].precoPixCentavos
      );
    }
  });

  it("ordena por maior preço", () => {
    const resultado = ordenarProdutos(produtos, "maior-preco");
    for (let i = 1; i < resultado.length; i++) {
      expect(resultado[i].precoPixCentavos).toBeLessThanOrEqual(
        resultado[i - 1].precoPixCentavos
      );
    }
  });

  it("ordena por nome (A-Z)", () => {
    const resultado = ordenarProdutos(produtos, "nome");
    const nomes = resultado.map((p) => p.nome);
    const nomesOrdenados = [...nomes].sort((a, b) => a.localeCompare(b, "pt-BR"));
    expect(nomes).toEqual(nomesOrdenados);
  });

  it("ordena por mais recentes (id maior primeiro)", () => {
    const resultado = ordenarProdutos(produtos, "recentes");
    for (let i = 1; i < resultado.length; i++) {
      expect(Number(resultado[i].id)).toBeLessThanOrEqual(Number(resultado[i - 1].id));
    }
  });

  it("não modifica o array original", () => {
    const copiaAntes = [...produtos];
    ordenarProdutos(produtos, "menor-preco");
    expect(produtos).toEqual(copiaAntes);
  });
});

describe("listarOpcoes", () => {
  const opcoes = listarOpcoes(produtos);

  it("lista marcas, categorias e cores sem duplicatas", () => {
    expect(new Set(opcoes.marcas).size).toBe(opcoes.marcas.length);
    expect(new Set(opcoes.categorias).size).toBe(opcoes.categorias.length);
    expect(new Set(opcoes.cores).size).toBe(opcoes.cores.length);
  });

  it("ordena tamanhos numericamente", () => {
    const comoNumeros = opcoes.tamanhos.map(Number);
    const ordenados = [...comoNumeros].sort((a, b) => a - b);
    expect(comoNumeros).toEqual(ordenados);
  });

  it("precoMin é menor ou igual a precoMax", () => {
    expect(opcoes.precoMin).toBeLessThanOrEqual(opcoes.precoMax);
  });
});
