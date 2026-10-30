export type Genero = "masculino" | "feminino" | "unissex";

export type Categoria = "Casual" | "Esportivo" | "Streetwear" | "Social";

// Preços em CENTAVOS (inteiros) — evita erro de arredondamento. Para exibir,
// use sempre formatarReais() de "@/lib/utils" (nunca aritmética com float).
export type Produto = {
  id: string;
  nome: string;
  marca: string;
  genero: Genero;
  categoria: Categoria;
  cores: string[];
  descricao: string[];
  precoPixCentavos: number;
  precoParceladoCentavos: number;
  imagem: string;
  tamanhos: string[];
  /** Mostrado em "Tênis em destaque" na página inicial. */
  destaque: boolean;
};

export const produtos: Produto[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
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
  },
  {
    id: "3",
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
  },
  {
    id: "4",
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
  },
  {
    id: "5",
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
  },
  {
    id: "6",
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
  },
  {
    id: "7",
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
  },
];

export function getProdutoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}
