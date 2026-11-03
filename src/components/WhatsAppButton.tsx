"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ItemCarrinho } from "@/context/CarrinhoContext";
import { montarMensagemPedido, linkWhatsApp } from "@/lib/pedido";
import { cn } from "@/lib/utils";

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
    window.open(linkWhatsApp(mensagem), "_blank", "noopener,noreferrer");
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
