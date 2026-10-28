"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ItemPreferencia } from "@/context/PreferenciasContext";
import { formatarPreco } from "@/lib/utils";

// Número de WhatsApp da loja (DDI + DDD + número, só dígitos).
// Troque pelo número real no arquivo .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER).
const NUMERO_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";

function montarMensagem(itens: ItemPreferencia[], origin: string) {
  const linhasProdutos = itens
    .map(({ produto, tamanho, quantidade }) => {
      const preco = formatarPreco(
        produto.preco_promocional_avista ?? produto.preco_avista
      );
      return `• ${produto.nome} — Tam. ${tamanho} — Qtd: ${quantidade} — R$ ${preco}
  Link: ${origin}/produto/${produto.id}`;
    })
    .join("\n\n");

  return `Olá! Me interessei nestes produtos da NOVA Calçados:\n\n${linhasProdutos}`;
}

export function WhatsAppButton({ itens }: { itens: ItemPreferencia[] }) {
  const handleClick = () => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const mensagem = montarMensagem(itens, origin);
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      size="lg"
      disabled={itens.length === 0}
      onClick={handleClick}
      className="gap-2 rounded-full bg-green-600 text-white hover:bg-green-500"
    >
      <MessageCircle className="size-4" />
      Falar com vendedor
    </Button>
  );
}
