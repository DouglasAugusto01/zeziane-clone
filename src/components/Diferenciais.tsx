import { Gem, Footprints, Sparkles } from "lucide-react";

const diferenciais = [
  {
    icon: Gem,
    titulo: "Couro Italiano",
    subtitulo: "Certificado",
  },
  {
    icon: Footprints,
    titulo: "Solado",
    subtitulo: "Anatômico",
  },
  {
    icon: Sparkles,
    titulo: "Design",
    subtitulo: "Atemporal",
  },
];

export function Diferenciais() {
  return (
    <section id="processo" className="bg-secondary/40 py-12 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-8 text-center font-heading text-xl font-semibold tracking-tight sm:mb-10 sm:text-2xl md:text-3xl">
          O detalhe que faz a diferença.
        </h2>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {diferenciais.map(({ icon: Icon, titulo, subtitulo }) => (
            <div
              key={titulo}
              className="flex flex-col items-center gap-3 text-center"
            >
              <Icon className="size-7" strokeWidth={1.5} />
              <p className="text-xs font-medium uppercase tracking-[0.15em]">
                {titulo}
                <br />
                {subtitulo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
