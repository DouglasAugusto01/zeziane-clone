import type { Genero } from "@/data/produtos";
import type { OpcoesCatalogo } from "@/lib/produtos-helpers";
import { cn } from "@/lib/utils";

export type EstadoFiltros = {
  marca: string;
  categoria: string;
  genero: Genero | "todos";
  cor: string;
  tamanho: string;
  precoMin: string;
  precoMax: string;
};

export const FILTROS_VAZIOS: EstadoFiltros = {
  marca: "todas",
  categoria: "todas",
  genero: "todos",
  cor: "todas",
  tamanho: "todos",
  precoMin: "",
  precoMax: "",
};

function GrupoFiltro({
  titulo,
  opcoes,
  valorAtivo,
  onSelecionar,
}: {
  titulo: string;
  opcoes: { label: string; value: string }[];
  valorAtivo: string;
  onSelecionar: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {titulo}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {opcoes.map((opcao) => (
          <button
            key={opcao.value}
            type="button"
            onClick={() => onSelecionar(opcao.value)}
            aria-pressed={valorAtivo === opcao.value}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              valorAtivo === opcao.value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {opcao.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const generoLabel: Record<Genero, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  unissex: "Unissex",
};

export function CatalogoFiltros({
  opcoes,
  filtros,
  onMudar,
  onLimpar,
}: {
  opcoes: OpcoesCatalogo;
  filtros: EstadoFiltros;
  onMudar: (patch: Partial<EstadoFiltros>) => void;
  onLimpar: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Filtros</h2>
        <button
          type="button"
          onClick={onLimpar}
          className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Limpar filtros
        </button>
      </div>

      <GrupoFiltro
        titulo="Marca"
        valorAtivo={filtros.marca}
        onSelecionar={(marca) => onMudar({ marca })}
        opcoes={[
          { label: "Todas", value: "todas" },
          ...opcoes.marcas.map((m) => ({ label: m, value: m })),
        ]}
      />

      <GrupoFiltro
        titulo="Categoria"
        valorAtivo={filtros.categoria}
        onSelecionar={(categoria) => onMudar({ categoria })}
        opcoes={[
          { label: "Todas", value: "todas" },
          ...opcoes.categorias.map((c) => ({ label: c, value: c })),
        ]}
      />

      <GrupoFiltro
        titulo="Gênero"
        valorAtivo={filtros.genero}
        onSelecionar={(genero) => onMudar({ genero: genero as Genero | "todos" })}
        opcoes={[
          { label: "Todos", value: "todos" },
          ...(Object.keys(generoLabel) as Genero[]).map((g) => ({
            label: generoLabel[g],
            value: g,
          })),
        ]}
      />

      <GrupoFiltro
        titulo="Cor"
        valorAtivo={filtros.cor}
        onSelecionar={(cor) => onMudar({ cor })}
        opcoes={[
          { label: "Todas", value: "todas" },
          ...opcoes.cores.map((c) => ({ label: c, value: c })),
        ]}
      />

      <GrupoFiltro
        titulo="Tamanho"
        valorAtivo={filtros.tamanho}
        onSelecionar={(tamanho) => onMudar({ tamanho })}
        opcoes={[
          { label: "Todos", value: "todos" },
          ...opcoes.tamanhos.map((t) => ({ label: t, value: t })),
        ]}
      />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Faixa de preço (R$)
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder={String(opcoes.precoMin)}
            value={filtros.precoMin}
            onChange={(e) => onMudar({ precoMin: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none transition-colors focus:border-foreground"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={String(opcoes.precoMax)}
            value={filtros.precoMax}
            onChange={(e) => onMudar({ precoMax: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none transition-colors focus:border-foreground"
          />
        </div>
      </div>
    </div>
  );
}
