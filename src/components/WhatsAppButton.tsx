"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ItemCarrinho } from "@/context/CarrinhoContext";
import { montarMensagemPedido } from "@/lib/pedido";
import { cn } from "@/lib/utils";

// Número de WhatsApp da loja (DDI + DDD + número, só dígitos).
// Troque pelo número real no arquivo .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER).
const NUMERO_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";

export function WhatsAppButton({
  itens,
  label = "Falar com vendedor",
  className,
}: {
  itens: ItemCarrinho[];
  label?: string;
  className?: string;
}) {
  const handleClick = () => {
    const mensagem = montarMensagemPedido(itens);
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
      className={cn(
        "gap-2 rounded-full bg-green-600 text-white hover:bg-green-500",
        className
      )}
    >
      <MessageCircle className="size-4" />
      {label}
    </Button>
  );
}
