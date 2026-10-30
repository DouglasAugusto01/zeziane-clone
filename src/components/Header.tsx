"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCarrinho } from "@/context/CarrinhoContext";

const links = [
  { label: "Coleções", href: "/colecao" },
  { label: "O Nosso Processo", href: "#processo" },
  { label: "Sobre Nós", href: "#sobre" },
];

export function Header() {
  const { itens, abrirCarrinho } = useCarrinho();
  const total = itens.reduce((acc, i) => acc + i.quantidade, 0);
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-foreground font-heading text-base font-semibold sm:size-9 sm:text-lg">
            N
          </span>
          <div className="min-w-0 leading-tight">
            <p className="font-heading text-xl font-semibold tracking-wide sm:text-2xl">
              NOVA
            </p>
            <p className="truncate text-[9px] tracking-[0.2em] text-muted-foreground sm:text-[10px] sm:tracking-[0.25em]">
              CALÇADOS PREMIUM
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-medium tracking-[0.15em] md:flex lg:gap-8">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="uppercase text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="uppercase text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={abrirCarrinho}
            className="relative flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent sm:size-10"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="size-4" />
            {total > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                {total}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent md:hidden"
          >
            {menuAberto ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={() => setMenuAberto(false)}
                    className="block rounded-lg px-2 py-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuAberto(false)}
                    className="block rounded-lg px-2 py-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
