"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProdutoPorId, type Produto } from "@/data/produtos";

export type ItemCarrinho = {
  produto: Produto;
  cor: string;
  tamanho: string;
  quantidade: number;
};

type ItemCarrinhoSalvo = {
  produtoId: string;
  cor: string;
  tamanho: string;
  quantidade: number;
};

const CHAVE_LOCALSTORAGE = "nova-carrinho-v1";

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (item: ItemCarrinho) => void;
  remover: (produtoId: string, cor: string, tamanho: string) => void;
  atualizarQuantidade: (
    produtoId: string,
    cor: string,
    tamanho: string,
    quantidade: number
  ) => void;
  limpar: () => void;
  aberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

function mesmoItem(
  item: ItemCarrinho,
  produtoId: string,
  cor: string,
  tamanho: string
) {
  return (
    item.produto.id === produtoId &&
    item.cor === cor &&
    item.tamanho === tamanho
  );
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [aberto, setAberto] = useState(false);
  const hidratado = useRef(false);

  // Lê o carrinho salvo no localStorage após o primeiro render (evita
  // divergência entre o HTML estático e o client na hidratação).
  useEffect(() => {
    function lerCarrinhoSalvo(): ItemCarrinho[] | null {
      try {
        const salvo = localStorage.getItem(CHAVE_LOCALSTORAGE);
        if (!salvo) return null;
        const bruto: ItemCarrinhoSalvo[] = JSON.parse(salvo);
        return bruto
          .map((i): ItemCarrinho | null => {
            const produto = getProdutoPorId(i.produtoId);
            if (!produto) return null;
            return {
              produto,
              cor: i.cor,
              tamanho: i.tamanho,
              quantidade: i.quantidade,
            };
          })
          .filter((i): i is ItemCarrinho => i !== null);
      } catch {
        // localStorage indisponível (modo privado, bloqueado etc.) — segue
        // com o carrinho vazio em vez de quebrar a página.
        return null;
      }
    }

    // Lido num microtask (callback), não na linha de topo do effect, para
    // não disparar setState diretamente no corpo síncrono do efeito.
    queueMicrotask(() => {
      const reidratado = lerCarrinhoSalvo();
      if (reidratado) setItens(reidratado);
      hidratado.current = true;
    });
  }, []);

  // Só grava depois da leitura inicial, senão sobrescreveria o carrinho
  // salvo com um array vazio antes de carregá-lo.
  useEffect(() => {
    if (!hidratado.current) return;
    try {
      const paraSalvar: ItemCarrinhoSalvo[] = itens.map((i) => ({
        produtoId: i.produto.id,
        cor: i.cor,
        tamanho: i.tamanho,
        quantidade: i.quantidade,
      }));
      localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(paraSalvar));
    } catch {
      // ignora falha de gravação (ex: quota excedida)
    }
  }, [itens]);

  const adicionar = useCallback((novo: ItemCarrinho) => {
    setItens((atual) => {
      const existente = atual.find((i) =>
        mesmoItem(i, novo.produto.id, novo.cor, novo.tamanho)
      );
      if (existente) {
        return atual.map((i) =>
          i === existente
            ? { ...i, quantidade: i.quantidade + novo.quantidade }
            : i
        );
      }
      return [...atual, novo];
    });
  }, []);

  const remover = useCallback(
    (produtoId: string, cor: string, tamanho: string) => {
      setItens((atual) =>
        atual.filter((i) => !mesmoItem(i, produtoId, cor, tamanho))
      );
    },
    []
  );

  const atualizarQuantidade = useCallback(
    (produtoId: string, cor: string, tamanho: string, quantidade: number) => {
      setItens((atual) =>
        quantidade <= 0
          ? atual.filter((i) => !mesmoItem(i, produtoId, cor, tamanho))
          : atual.map((i) =>
              mesmoItem(i, produtoId, cor, tamanho) ? { ...i, quantidade } : i
            )
      );
    },
    []
  );

  const limpar = useCallback(() => setItens([]), []);
  const abrirCarrinho = useCallback(() => setAberto(true), []);
  const fecharCarrinho = useCallback(() => setAberto(false), []);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionar,
        remover,
        atualizarQuantidade,
        limpar,
        aberto,
        abrirCarrinho,
        fecharCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) {
    throw new Error("useCarrinho precisa estar dentro de um CarrinhoProvider");
  }
  return ctx;
}
