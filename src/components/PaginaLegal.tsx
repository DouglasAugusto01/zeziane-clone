import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PaginaLegal({
  titulo,
  atualizadoEm,
  children,
}: {
  titulo: string;
  atualizadoEm: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {titulo}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Última atualização: {atualizadoEm}
        </p>
        <div className="mt-8 space-y-8">{children}</div>
      </article>
      <Footer />
    </div>
  );
}

export function SecaoLegal({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
        {titulo}
      </h2>
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}
