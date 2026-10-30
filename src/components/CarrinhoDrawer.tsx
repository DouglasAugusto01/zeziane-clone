"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { calcularTotais } from "@/lib/pedido";
import { formatarReais } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImagemLazy } from "@/components/ImagemLazy";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function CarrinhoDrawer() {
  const { itens, remover, atualizarQuantidade, limpar, aberto, fecharCarrinho } =
    useCarrinho();

  const { totalPixCentavos, totalParceladoCentavos, parcelaCentavos } =
    calcularTotais(itens);

  return (
    <>
      <div
        aria-hidden={!aberto}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          aberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={fecharCarrinho}
      />

      <div
        role="dialog"
        aria-label="Carrinho de compras"
        className={`fixed inset-y-0 right-0 z-[60] flex w-[90vw] max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="font-heading text-lg font-semibold">
            Carrinho {itens.length > 0 && `(${itens.length})`}
          </p>
          <button
            type="button"
            aria-label="Fechar carrinho"
            onClick={fecharCarrinho}
            className="flex size-8 items-center justify-center rounded-full hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1.2} />
            <p className="text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-foreground"
              onClick={fecharCarrinho}
            >
              <Link href="/colecao">Ver coleção</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-4">
              {itens.map((item) => {
                const subtotal = item.produto.precoPixCentavos * item.quantidade;
                return (
                  <li
                    key={`${item.produto.id}-${item.cor}-${item.tamanho}`}
                    className="flex gap-3 border-b border-border/70 pb-4"
                  >
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-secondary/50">
                      <ImagemLazy
                        src={item.produto.imagem}
                        alt={item.produto.nome}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-heading text-sm font-semibold leading-tight">
                          {item.produto.nome}
                        </p>
                        <button
                          type="button"
                          aria-label={`Remover ${item.produto.nome}`}
                          onClick={() =>
                            remover(item.produto.id, item.cor, item.tamanho)
                          }
                          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cor: {item.cor} · Tam: {item.tamanho}
                      </p>

                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            onClick={() =>
                              atualizarQuantidade(
                                item.produto.id,
                                item.cor,
                                item.tamanho,
                                item.quantidade - 1
                              )
                            }
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() =>
                              atualizarQuantidade(
                                item.produto.id,
                                item.cor,
                                item.tamanho,
                                item.quantidade + 1
                              )
                            }
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {formatarReais(subtotal)}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatarReais(item.produto.precoPixCentavos)} un.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {itens.length > 0 && (
          <div className="space-y-4 border-t border-border px-5 py-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total no Pix</span>
                <span className="font-semibold">
                  {formatarReais(totalPixCentavos)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Ou parcelado</span>
                <span>
                  {formatarReais(totalParceladoCentavos)} em 3x de{" "}
                  {formatarReais(parcelaCentavos)} sem juros
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <WhatsAppButton
                itens={itens}
                label="Finalizar pedido no WhatsApp"
                className="w-full"
              />
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={limpar}
              >
                Limpar carrinho
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
