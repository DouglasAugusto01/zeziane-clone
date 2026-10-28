"use client";

import { X } from "lucide-react";
import { usePreferencias } from "@/context/PreferenciasContext";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function PreferenciasSection() {
  const { itens, remover, limpar } = usePreferencias();

  return (
    <section
      id="preferencias"
      className="bg-pattern-circles border-t border-border bg-secondary/30 py-12 sm:py-14"
    >
      <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          Compartilhe suas preferências
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {itens.length === 0
            ? "Adicione produtos da coleção para montar sua lista de preferências."
            : "Revise os itens escolhidos e envie direto para o nosso WhatsApp."}
        </p>

        {itens.length > 0 && (
          <ul className="mt-8 space-y-3 text-left">
            {itens.map((item) => (
              <li
                key={`${item.produto.id}-${item.tamanho}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <div>
                  <p className="font-heading text-base font-medium">
                    {item.produto.nome}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tamanho {item.tamanho} · Quantidade {item.quantidade}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remover ${item.produto.nome}`}
                  onClick={() => remover(item.produto.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            className="rounded-full"
            disabled={itens.length === 0}
            onClick={limpar}
          >
            Limpar seleção
          </Button>
          <WhatsAppButton itens={itens} />
        </div>
      </div>
    </section>
  );
}
