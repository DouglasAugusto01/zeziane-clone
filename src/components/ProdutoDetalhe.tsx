"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, Minus, Plus, Share2 } from "lucide-react";
import {
  CORES_SWATCH,
  type Produto,
  galeriaDoProduto,
  produtosRelacionados,
} from "@/data/produtos";
import { formatarReais, resolverImagem } from "@/lib/utils";
import { rastrearAdicionarAoCarrinho } from "@/lib/analytics";
import { useCarrinho } from "@/context/CarrinhoContext";
import { ImagemLazy } from "@/components/ImagemLazy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CatalogoProdutoCard } from "@/components/CatalogoProdutoCard";
import { Button } from "@/components/ui/button";

export function ProdutoDetalhe({ produto }: { produto: Produto }) {
  const { adicionar, abrirCarrinho } = useCarrinho();
  const galeria = galeriaDoProduto(produto);
  const relacionados = produtosRelacionados(produto);

  const [tamanho, setTamanho] = useState(produto.tamanhos[0]);
  const [cor, setCor] = useState(produto.cores[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [linkCopiado, setLinkCopiado] = useState(false);

  const handleAdicionar = () => {
    const item = { produto, cor, tamanho, quantidade };
    adicionar(item);
    rastrearAdicionarAoCarrinho(item);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  const handleCompartilhar = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: produto.nome, url });
      } catch {
        // usuário cancelou o compartilhamento — nada a fazer
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 1500);
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
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
        <div className="animate-fade-in-up space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/50">
            {produto.lancamento && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-background">
                Novo
              </span>
            )}
            <ImagemLazy
              src={galeria[imagemAtiva]}
              alt={produto.nome}
              className="h-full w-full object-contain p-8"
            />
          </div>

          {galeria.length > 1 && (
            <div className="flex gap-2">
              {galeria.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ver foto ${i + 1}`}
                  aria-pressed={imagemAtiva === i}
                  onClick={() => setImagemAtiva(i)}
                  className={`size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary/50 transition-colors ${
                    imagemAtiva === i ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img
                    src={resolverImagem(src)}
                    alt=""
                    className="h-full w-full object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in-up space-y-6" style={{ animationDelay: "80ms" }}>
          <div>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {produto.marca} • {produto.categoria}
              </p>
              <button
                type="button"
                onClick={handleCompartilhar}
                className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {linkCopiado ? (
                  <>
                    <Check className="size-3.5" />
                    Link copiado!
                  </>
                ) : (
                  <>
                    <Share2 className="size-3.5" />
                    Compartilhar
                  </>
                )}
              </button>
            </div>
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
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Tamanho: {tamanho}
              </p>
              <Link
                href="#guia-de-numeracao"
                className="text-[11px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Guia de numeração
              </Link>
            </div>
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

      {relacionados.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            Você também pode gostar
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {relacionados.map((p, index) => (
              <CatalogoProdutoCard key={p.id} produto={p} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
