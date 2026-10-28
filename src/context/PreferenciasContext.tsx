"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Produto } from "@/data/produtos";

export type ItemPreferencia = {
  produto: Produto;
  tamanho: string;
  quantidade: number;
};

type PreferenciasContextType = {
  itens: ItemPreferencia[];
  adicionar: (item: ItemPreferencia) => void;
  remover: (produtoId: string) => void;
  limpar: () => void;
};

const PreferenciasContext = createContext<PreferenciasContextType | null>(
  null
);

export function PreferenciasProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemPreferencia[]>([]);

  const adicionar = useCallback((item: ItemPreferencia) => {
    setItens((atual) => {
      const existente = atual.find(
        (i) =>
          i.produto.id === item.produto.id && i.tamanho === item.tamanho
      );
      if (existente) {
        return atual.map((i) =>
          i === existente
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        );
      }
      return [...atual, item];
    });
  }, []);

  const remover = useCallback((produtoId: string) => {
    setItens((atual) => atual.filter((i) => i.produto.id !== produtoId));
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  return (
    <PreferenciasContext.Provider
      value={{ itens, adicionar, remover, limpar }}
    >
      {children}
    </PreferenciasContext.Provider>
  );
}

export function usePreferencias() {
  const ctx = useContext(PreferenciasContext);
  if (!ctx) {
    throw new Error(
      "usePreferencias precisa estar dentro de um PreferenciasProvider"
    );
  }
  return ctx;
}
