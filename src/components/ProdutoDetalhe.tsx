"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import type { Produto } from "@/data/produtos";
import { formatarReais } from "@/lib/utils";
import { useCarrinho } from "@/context/CarrinhoContext";
import { ImagemLazy } from "@/components/ImagemLazy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

const CORES_SWATCH: Record<string, string> = {
  Preto: "#1a1a1a",
  Branco: "#f5f5f5",
  Rosa: "#f472b6",
  Vermelho: "#dc2626",
  Azul: "#2563eb",
};

export function ProdutoDetalhe({ produto }: { produto: Produto }) {
  const { adicionar, abrirCarrinho } = useCarrinho();
  const [tamanho, setTamanho] = useState(produto.tamanhos[0]);
  const [cor, setCor] = useState(produto.cores[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = () => {
    adicionar({ produto, cor, tamanho, quantidade });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  return (
    <section className="animate-fade-in container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/colecao"
        className="mb-6 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Voltar à coleção
      </Link>

      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="animate-fade-in-up aspect-square overflow-hidden rounded-3xl bg-secondary/50">
          <ImagemLazy
            src={produto.imagem}
            alt={produto.nome}
            className="h-full w-full object-contain p-8"
          />
        </div>

        <div className="animate-fade-in-up space-y-6" style={{ animationDelay: "80ms" }}>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {produto.marca} • {produto.categoria}
            </p>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {produto.nome}
            </h1>
          </div>

          <ul className="space-y-1.5">
            {produto.descricao.map((linha) => (
              <li
                key={linha}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/60" />
                {linha}
              </li>
            ))}
          </ul>

          <div>
            <p className="text-2xl font-semibold">
              {formatarReais(produto.precoPixCentavos)}{" "}
              <span className="text-sm font-normal text-muted-foreground">no Pix</span>
            </p>
            <p className="text-xs text-muted-foreground">
              ou {formatarReais(produto.precoParceladoCentavos)} em até 3x sem juros
            </p>
          </div>

          {produto.cores.length > 1 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Cor: {cor}
              </p>
              <div className="flex gap-2">
                {produto.cores.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Cor ${c}`}
                    aria-pressed={cor === c}
                    onClick={() => setCor(c)}
                    className={`size-8 rounded-full border-2 transition-all ${
                      cor === c ? "border-foreground scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: CORES_SWATCH[c] ?? "#999" }}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Tamanho: {tamanho}
            </p>
            <div className="flex flex-wrap gap-2">
              {produto.tamanhos.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tamanho === t}
                  onClick={() => setTamanho(t)}
                  className={`flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                    tamanho === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Quantidade
            </p>
            <div className="flex w-fit items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{quantidade}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => setQuantidade((q) => q + 1)}
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/85"
              onClick={() => {
                handleAdicionar();
                abrirCarrinho();
              }}
            >
              {adicionado ? "Adicionado!" : "Adicionar ao carrinho"}
            </Button>
            <WhatsAppButton
              itens={[{ produto, cor, tamanho, quantidade }]}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
