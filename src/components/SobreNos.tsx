import { equipe } from "@/data/equipe";
import { ImagemLazy } from "@/components/ImagemLazy";

export function SobreNos() {
  return (
    <section id="sobre" className="bg-secondary/40 py-14 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground sm:tracking-[0.3em]">
            SOBRE NÓS
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            A NOVA
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A NOVA nasceu da vontade de oferecer calçados premium em produção
            limitada e exclusiva — couro selecionado, acabamento cuidado em
            cada detalhe e um design atemporal, feito para durar. Por trás da
            marca, uma equipe pequena que acompanha cada pedido de perto,
            direto pelo WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-10 sm:grid-cols-2">
          {equipe.map((membro) => (
            <div key={membro.nome} className="flex flex-col items-center text-center">
              <div className="size-32 overflow-hidden rounded-full bg-secondary sm:size-36">
                <ImagemLazy
                  src={membro.foto}
                  alt={membro.nome}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 font-heading text-lg font-semibold tracking-tight">
                {membro.nome}
              </p>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {membro.cargo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
