"use client";

import { MessageCircle } from "lucide-react";

// Mesmo número usado no botão "Falar com vendedor" — troque no .env.local
// (NEXT_PUBLIC_WHATSAPP_NUMBER) para o número real da loja.
const NUMERO_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000";

const MENSAGEM_PADRAO =
  "Olá! Vim pelo site da NOVA Calçados e gostaria de mais informações.";

export function BotaoWhatsAppFlutuante() {
  const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
    MENSAGEM_PADRAO
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a NOVA no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-500 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
