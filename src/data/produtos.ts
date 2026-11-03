export type Genero = "masculino" | "feminino" | "unissex";

export type Categoria = "Casual" | "Esportivo" | "Streetwear" | "Social";

// Preços em CENTAVOS (inteiros) — evita erro de arredondamento. Para exibir,
// use sempre formatarReais() de "@/lib/utils" (nunca aritmética com float).
export type Produto = {
  id: string;
  /** Identificador amigável usado na URL: /produto/[slug]. */
  slug: string;
  nome: string;
  marca: string;
  genero: Genero;
  categoria: Categoria;
  cores: string[];
  descricao: string[];
  precoPixCentavos: number;
  precoParceladoCentavos: number;
  imagem: string;
  /** Galeria opcional (múltiplas fotos). Sem isso, a UI usa só `imagem`. */
  imagens?: string[];
  tamanhos: string[];
  /** Mostrado em "Tênis em destaque" na página inicial. */
  destaque: boolean;
  /** Mostra a etiqueta "Novo" no card e na página do produto. */
  lancamento: boolean;
};

export const produtos: Produto[] = [
  {
    id: "1",
    slug: "nova-icon-low-top",
    nome: "'NOVA' Icon Low-Top",
    marca: "NOVA",
    genero: "masculino",
    categoria: "Casual",
    cores: ["Preto"],
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    precoPixCentavos: 14990,
    precoParceladoCentavos: 16990,
    imagem: "https://placehold.co/400x400?text=Icon+Low-Top",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    destaque: false,
    lancamento: false,
  },
  {
    id: "2",
    slug: "nova-chelsea-boot",
    nome: "'NOVA' Chelsea Boot",
    marca: "NOVA",
    genero: "masculino",
    categoria: "Social",
    cores: ["Preto"],
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    precoPixCentavos: 21990,
    precoParceladoCentavos: 24990,
    imagem: "https://placehold.co/400x400?text=Chelsea+Boot",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    destaque: true,
    lancamento: false,
  },
  {
    id: "3",
    slug: "nova-top-minimal",
    nome: "'NOVA' Top Minimal",
    marca: "NOVA",
    genero: "feminino",
    categoria: "Casual",
    cores: ["Preto"],
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    precoPixCentavos: 17990,
    precoParceladoCentavos: 19990,
    imagem: "https://placehold.co/400x400?text=Top+Minimal",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    destaque: true,
    lancamento: false,
  },
  {
    id: "4",
    slug: "derby-shoe",
    nome: "'Derby' Shoe",
    marca: "NOVA",
    genero: "masculino",
    categoria: "Social",
    cores: ["Preto"],
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    precoPixCentavos: 19990,
    precoParceladoCentavos: 22990,
    imagem: "https://placehold.co/400x400?text=Derby+Shoe",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    destaque: false,
    lancamento: false,
  },
  {
    id: "5",
    slug: "nike-air-max-portal-rosa",
    nome: "Nike Air Max Portal",
    marca: "Nike",
    genero: "feminino",
    categoria: "Esportivo",
    cores: ["Rosa"],
    descricao: ["Lançamento • primeira linha", "Rosa / Pink"],
    precoPixCentavos: 24999,
    precoParceladoCentavos: 26999,
    imagem: "/produtos/air-max-portal-rosa.jpg",
    tamanhos: ["34", "35", "36", "37", "38", "39"],
    destaque: true,
    lancamento: true,
  },
  {
    id: "6",
    slug: "nike-air-max-portal-branco",
    nome: "Nike Air Max Portal",
    marca: "Nike",
    genero: "unissex",
    categoria: "Esportivo",
    cores: ["Branco", "Preto"],
    descricao: ["Lançamento • primeira linha", "Branco / Preto"],
    precoPixCentavos: 24999,
    precoParceladoCentavos: 26999,
    imagem: "/produtos/air-max-portal-branco.jpg",
    tamanhos: ["34", "35", "36", "37", "38", "39"],
    destaque: false,
    lancamento: true,
  },
  {
    id: "7",
    slug: "nike-dunk-low",
    nome: "Nike Dunk Low",
    marca: "Nike",
    genero: "masculino",
    categoria: "Streetwear",
    cores: ["Branco", "Preto"],
    descricao: ["Duas opções de cadarços", "Primeira linha", "Branco / Preto"],
    precoPixCentavos: 21999,
    precoParceladoCentavos: 23999,
    imagem: "/produtos/dunk-low-branco.jpg",
    tamanhos: ["38", "39", "40", "41", "42", "43"],
    destaque: true,
    lancamento: true,
  },
];

export function getProdutoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

export function getProdutoPorSlug(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug);
}

/** Galeria de fotos do produto — usa `imagens` se existir, senão só `imagem`. */
export function galeriaDoProduto(produto: Produto): string[] {
  return produto.imagens && produto.imagens.length > 0
    ? produto.imagens
    : [produto.imagem];
}

/** Produtos relacionados: mesma categoria ou marca, excluindo o próprio. */
export function produtosRelacionados(produto: Produto, limite = 3): Produto[] {
  return produtos
    .filter(
      (p) =>
        p.id !== produto.id &&
        (p.categoria === produto.categoria || p.marca === produto.marca)
    )
    .slice(0, limite);
}
