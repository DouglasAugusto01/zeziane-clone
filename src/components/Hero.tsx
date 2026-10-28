import { Button } from "@/components/ui/button";

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
            size="lg"
            className="w-full rounded-full bg-foreground px-8 text-background hover:bg-foreground/85 sm:w-auto"
          >
            Ver Coleção
          </Button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="absolute inset-x-10 bottom-6 h-10 rounded-full bg-foreground/15 blur-xl" />
          <div className="absolute inset-x-16 bottom-0 h-24 rounded-[50%] bg-gradient-to-b from-stone-300 to-stone-200" />
          <img
            src="https://placehold.co/600x600/1a1a1a/f3ece3?text=NOVA"
            alt="Calçado premium NOVA em destaque"
            className="relative mx-auto w-4/5 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
