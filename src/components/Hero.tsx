import Link from "next/link";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="bg-pattern-circles pointer-events-none absolute -right-16 -top-16 size-56 [mask-image:radial-gradient(circle,black,transparent_70%)] sm:-right-20 sm:-top-20 sm:size-80" />

      <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground sm:tracking-[0.3em]">
            PRODUÇÃO LIMITADA E EXCLUSIVA
          </p>
          <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Desperte a sua essência.
            <br />
            Calçados premium feitos à mão.
          </h1>
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-foreground px-8 text-background hover:bg-foreground/85 sm:w-auto"
          >
            <Link href="/colecao">Ver Coleção</Link>
          </Button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-[2rem] shadow-2xl sm:max-w-sm md:max-w-md">
          <img
            src={withBasePath("/logo-nova.jpg")}
            alt="NOVA Calçados Premium"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
