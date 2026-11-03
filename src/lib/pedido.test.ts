import { describe, expect, it } from "vitest";
import { getProdutoPorId } from "@/data/produtos";
import { calcularTotais, montarMensagemPedido } from "@/lib/pedido";
import { formatarReais } from "@/lib/utils";
import type { ItemCarrinho } from "@/lib/carrinho";

// 'NOVA' Chelsea Boot — cenário conferido manualmente no navegador:
// 2 unidades = R$ 439,80 no Pix / R$ 499,80 em 3x de R$ 166,60.
const chelseaBoot = getProdutoPorId("2")!;

describe("calcularTotais", () => {
  it("soma Pix e parcelado proporcionalmente à quantidade, e divide em 3x exato", () => {
    const itens: ItemCarrinho[] = [
      { produto: chelseaBoot, cor: "Preto", tamanho: "40", quantidade: 2 },
    ];
    const totais = calcularTotais(itens);

    expect(totais.totalPixCentavos).toBe(43980);
    expect(totais.totalParceladoCentavos).toBe(49980);
    expect(totais.parcelaCentavos).toBe(16660);
  });

  it("soma múltiplos itens diferentes", () => {
    const dunkLow = getProdutoPorId("7")!;
    const itens: ItemCarrinho[] = [
      { produto: chelseaBoot, cor: "Preto", tamanho: "40", quantidade: 1 },
      { produto: dunkLow, cor: "Branco", tamanho: "42", quantidade: 1 },
    ];
    const totais = calcularTotais(itens);

    expect(totais.totalPixCentavos).toBe(
      chelseaBoot.precoPixCentavos + dunkLow.precoPixCentavos
    );
  });

  it("carrinho vazio soma zero", () => {
    expect(calcularTotais([])).toEqual({
      totalPixCentavos: 0,
      totalParceladoCentavos: 0,
      parcelaCentavos: 0,
    });
  });
});

describe("montarMensagemPedido", () => {
  it("gera a mensagem no formato combinado com o cliente", () => {
    const itens: ItemCarrinho[] = [
      { produto: chelseaBoot, cor: "Preto", tamanho: "40", quantidade: 2 },
    ];

    const mensagem = montarMensagemPedido(itens);

    expect(mensagem).toBe(
      [
        "Olá! Gostaria de fazer este pedido:",
        `1. 'NOVA' Chelsea Boot — Cor: Preto — Tam: 40 — Qtd: 2 — ${formatarReais(43980)}`,
        `Total no Pix: ${formatarReais(43980)}`,
        `Ou ${formatarReais(49980)} em até 3x de ${formatarReais(16660)} sem juros`,
      ].join("\n")
    );
  });

  it("numera cada item do pedido em ordem", () => {
    const dunkLow = getProdutoPorId("7")!;
    const itens: ItemCarrinho[] = [
      { produto: chelseaBoot, cor: "Preto", tamanho: "40", quantidade: 1 },
      { produto: dunkLow, cor: "Branco", tamanho: "42", quantidade: 1 },
    ];

    const mensagem = montarMensagemPedido(itens);

    expect(mensagem).toContain("1. 'NOVA' Chelsea Boot");
    expect(mensagem).toContain("2. Nike Dunk Low");
  });
});
