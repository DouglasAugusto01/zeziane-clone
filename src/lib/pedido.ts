import type { ItemCarrinho } from "@/context/CarrinhoContext";
import { formatarReais } from "@/lib/utils";

// Número de WhatsApp da loja (DDI + DDD + número, só dígitos).
// Troque pelo número real no arquivo .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER).
export const NUMERO_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export function calcularTotais(itens: ItemCarrinho[]) {
  const totalPixCentavos = itens.reduce(
    (acc, i) => acc + i.produto.precoPixCentavos * i.quantidade,
    0
  );
  const totalParceladoCentavos = itens.reduce(
    (acc, i) => acc + i.produto.precoParceladoCentavos * i.quantidade,
    0
  );
  // Divide em 3x; a última parcela absorve o resto da divisão para o total
  // bater exatamente (nunca perde nem sobra centavo).
  const parcelaCentavos = Math.floor(totalParceladoCentavos / 3);

  return { totalPixCentavos, totalParceladoCentavos, parcelaCentavos };
}

export function montarMensagemPedido(itens: ItemCarrinho[]): string {
  const linhas = itens.map((item, index) => {
    const subtotalCentavos = item.produto.precoPixCentavos * item.quantidade;
    return `${index + 1}. ${item.produto.nome} — Cor: ${item.cor} — Tam: ${item.tamanho} — Qtd: ${item.quantidade} — ${formatarReais(subtotalCentavos)}`;
  });

  const { totalPixCentavos, totalParceladoCentavos, parcelaCentavos } =
    calcularTotais(itens);

  return [
    "Olá! Gostaria de fazer este pedido:",
    ...linhas,
    `Total no Pix: ${formatarReais(totalPixCentavos)}`,
    `Ou ${formatarReais(totalParceladoCentavos)} em até 3x de ${formatarReais(parcelaCentavos)} sem juros`,
  ].join("\n");
}
