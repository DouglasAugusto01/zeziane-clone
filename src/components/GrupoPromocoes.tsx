import { Percent, Rocket } from "lucide-react";
import { LINK_GRUPO_WHATSAPP } from "@/lib/empresa";

const beneficios = [
  {
    icon: Percent,
    texto: "Tenha acesso a descontos exclusivos",
  },
  {
    icon: Rocket,
    texto: "Acesso a produtos antecipados",
  },
];

export function GrupoPromocoes() {
  return (
    <section id="grupo-promocoes" className="bg-secondary/40 py-12 sm:py-14">
      <div className="container mx-auto px-4 text-center sm:px-6">
        <h2 className="mb-8 font-heading text-xl font-semibold tracking-tight sm:mb-10 sm:text-2xl md:text-3xl">
          Entre no nosso grupo de promoções
        </h2>

        <div className="mx-auto mb-8 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {beneficios.map(({ icon: Icon, texto }) => (
            <div
              key={texto}
              className="flex flex-col items-center gap-3 text-center"
            >
              <Icon className="size-7" strokeWidth={1.5} />
              <p className="text-xs font-medium uppercase tracking-[0.15em]">
                {texto}
              </p>
            </div>
          ))}
        </div>

        <a
          href={LINK_GRUPO_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-green-500"
        >
          Entrar no grupo
        </a>
      </div>
    </section>
  );
}
