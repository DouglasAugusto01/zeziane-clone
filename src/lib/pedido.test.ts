import { describe, expect, it } from "vitest";
import { getProdutoPorId } from "@/data/produtos";
import { calcularTotais, montarMensagemPedido } from "@/lib/pedido";
import { formatarReais } from "@/lib/utils";
import type { ItemCarrinho } from "@/lib/carrinho";

// Air Jordan 1 Low OG TS "Travis Scott - Black Phantom" — cenário conferido
// manualmente: 2 unidades = R$ 439,98 no Pix / R$ 479,98 em 3x de R$ 159,99.
const jordanLow = getProdutoPorId("8")!;

describe("calcularTotais", () => {
  it("soma Pix e parcelado proporcionalmente à quantidade, e calcula a parcela em 3x", () => {
    const itens: ItemCarrinho[] = [
      { produto: jordanLow, cor: "Preto", tamanho: "40", quantidade: 2 },
    ];
    const totais = calcularTotais(itens);

    expect(totais.totalPixCentavos).toBe(43998);
    expect(totais.totalParceladoCentavos).toBe(47998);
    expect(totais.parcelaCentavos).toBe(15999);
  });

  it("soma múltiplos itens diferentes", () => {
    const dunkLow = getProdutoPorId("7")!;
    const itens: ItemCarrinho[] = [
      { produto: jordanLow, cor: "Preto", tamanho: "40", quantidade: 1 },
      { produto: dunkLow, cor: "Branco", tamanho: "42", quantidade: 1 },
    ];
    const totais = calcularTotais(itens);

    expect(totais.totalPixCentavos).toBe(
      jordanLow.precoPixCentavos + dunkLow.precoPixCentavos
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
      { produto: jordanLow, cor: "Preto", tamanho: "40", quantidade: 2 },
    ];

    const mensagem = montarMensagemPedido(itens);

    expect(mensagem).toBe(
      [
        "Olá! Gostaria de fazer este pedido:",
        `1. ${jordanLow.nome} — Cor: Preto — Tam: 40 — Qtd: 2 — ${formatarReais(43998)}`,
        `Total no Pix: ${formatarReais(43998)}`,
        `Ou ${formatarReais(47998)} em até 3x de ${formatarReais(15999)} sem juros`,
      ].join("\n")
    );
  });

  it("numera cada item do pedido em ordem", () => {
    const dunkLow = getProdutoPorId("7")!;
    const itens: ItemCarrinho[] = [
      { produto: jordanLow, cor: "Preto", tamanho: "40", quantidade: 1 },
      { produto: dunkLow, cor: "Branco", tamanho: "42", quantidade: 1 },
    ];

    const mensagem = montarMensagemPedido(itens);

    expect(mensagem).toContain(`1. ${jordanLow.nome}`);
    expect(mensagem).toContain("2. Nike Dunk Low");
  });
});
