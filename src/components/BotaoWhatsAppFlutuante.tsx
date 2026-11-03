"use client";

import { MessageCircle } from "lucide-react";
import { linkWhatsApp } from "@/lib/pedido";

const MENSAGEM_PADRAO =
  "Olá! Vim pelo site da NOVA Calçados e gostaria de mais informações.";

export function BotaoWhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(MENSAGEM_PADRAO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a NOVA no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-500 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
