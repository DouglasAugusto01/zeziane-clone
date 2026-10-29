"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Produto } from "@/data/produtos";
import { usePreferencias } from "@/context/PreferenciasContext";
import { formatarPreco, resolverImagem } from "@/lib/utils";

export function ProdutoCard({ produto }: { produto: Produto }) {
  const { adicionar } = usePreferencias();
  const [tamanho, setTamanho] = useState(produto.tamanhos[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = () => {
    adicionar({ produto, tamanho, quantidade });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  return (
    <Card className="gap-4 overflow-hidden border-border/70 bg-card py-0 pb-5 shadow-none">
      <div className="relative aspect-square bg-secondary/50">
        <div className="absolute inset-x-8 bottom-4 h-16 rounded-[50%] bg-gradient-to-b from-stone-300/70 to-transparent" />
        <img
          src={resolverImagem(produto.imagem)}
          alt={produto.nome}
          className="relative h-full w-full object-contain p-6"
        />
      </div>

      <CardContent className="space-y-1 px-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          {produto.nome}
        </h3>
        {produto.descricao.map((linha) => (
          <p
            key={linha}
            className="text-[11px] uppercase tracking-wide text-muted-foreground"
          >
            {linha}
          </p>
        ))}

        <div className="pt-1">
          <p className="text-base font-semibold">
            R$ {formatarPreco(produto.preco_promocional_avista ?? produto.preco_avista)}{" "}
            <span className="text-xs font-normal text-muted-foreground">no Pix</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            ou R$ {formatarPreco(produto.preco_aprazo)} em até 3x sem juros
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-3 px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">Tamanhos:</span>
          <div className="flex items-center gap-2">
            <Select value={tamanho} onValueChange={setTamanho}>
              <SelectTrigger size="sm" className="w-16 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {produto.tamanhos.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-3" />
              </button>
              <span className="w-5 text-center text-sm">{quantidade}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => setQuantidade((q) => q + 1)}
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full rounded-full border-foreground text-xs uppercase tracking-wide"
          onClick={handleAdicionar}
        >
          {adicionado ? "Adicionado!" : "Adicionar às preferências"}
        </Button>
      </CardFooter>
    </Card>
  );
}
