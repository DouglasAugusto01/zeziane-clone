import { sendGAEvent } from "@next/third-parties/google";
import type { ItemCarrinho } from "@/lib/carrinho";

// sendGAEvent não quebra se o Analytics não estiver configurado (sem
// NEXT_PUBLIC_GA_MEASUREMENT_ID) — ele só registra um aviso no console e
// não faz nada, então é seguro chamar sempre, mesmo em dev.

function itemParaGA(item: ItemCarrinho) {
  return {
    item_id: item.produto.id,
    item_name: item.produto.nome,
    item_brand: item.produto.marca,
    item_category: item.produto.categoria,
    item_variant: `${item.cor} / ${item.tamanho}`,
    price: item.produto.precoPixCentavos / 100,
    quantity: item.quantidade,
  };
}

function valorTotal(itens: ItemCarrinho[]): number {
  return (
    itens.reduce((acc, i) => acc + i.produto.precoPixCentavos * i.quantidade, 0) / 100
  );
}

/** Evento padrão de ecommerce do GA4 — alimenta os relatórios de Monetização prontos. */
export function rastrearAdicionarAoCarrinho(item: ItemCarrinho) {
  sendGAEvent("event", "add_to_cart", {
    currency: "BRL",
    value: valorTotal([item]),
    items: [itemParaGA(item)],
  });
}

/**
 * "Conversão" deste site: o cliente abriu o WhatsApp com um pedido
 * pré-preenchido. Não é uma compra confirmada (isso só acontece quando o
 * vendedor fecha o pedido pelo WhatsApp) — por isso usamos o evento
 * recomendado `generate_lead`, não `purchase`.
 */
export function rastrearPedidoWhatsApp(itens: ItemCarrinho[]) {
  if (itens.length === 0) return;
  sendGAEvent("event", "generate_lead", {
    currency: "BRL",
    value: valorTotal(itens),
    items: itens.map(itemParaGA),
  });
}
