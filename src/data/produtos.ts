export type Genero = "masculino" | "feminino" | "unissex";

export type Produto = {
  id: string;
  nome: string;
  marca: string;
  genero: Genero;
  descricao: string[];
  preco_avista: number;
  preco_aprazo: number;
  preco_promocional_avista?: number;
  imagem: string;
  tamanhos: string[];
};

export const produtos: Produto[] = [
  {
    id: "1",
    nome: "'NOVA' Icon Low-Top",
    marca: "NOVA",
    genero: "masculino",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 149.9,
    preco_aprazo: 169.9,
    imagem: "https://placehold.co/400x400?text=Icon+Low-Top",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "2",
    nome: "'NOVA' Chelsea Boot",
    marca: "NOVA",
    genero: "masculino",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 219.9,
    preco_aprazo: 249.9,
    imagem: "https://placehold.co/400x400?text=Chelsea+Boot",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "3",
    nome: "'NOVA' Top Minimal",
    marca: "NOVA",
    genero: "feminino",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 179.9,
    preco_aprazo: 199.9,
    imagem: "https://placehold.co/400x400?text=Top+Minimal",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "4",
    nome: "'Derby' Shoe",
    marca: "NOVA",
    genero: "masculino",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 199.9,
    preco_aprazo: 229.9,
    imagem: "https://placehold.co/400x400?text=Derby+Shoe",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "5",
    nome: "Nike Air Max Portal",
    marca: "Nike",
    genero: "feminino",
    descricao: ["Lançamento • primeira linha", "Rosa / Pink"],
    preco_avista: 269.99,
    preco_aprazo: 269.99,
    preco_promocional_avista: 249.99,
    imagem: "/produtos/air-max-portal-rosa.jpg",
    tamanhos: ["34", "35", "36", "37", "38", "39"],
  },
  {
    id: "6",
    nome: "Nike Air Max Portal",
    marca: "Nike",
    genero: "unissex",
    descricao: ["Lançamento • primeira linha", "Branco / Preto"],
    preco_avista: 269.99,
    preco_aprazo: 269.99,
    preco_promocional_avista: 249.99,
    imagem: "/produtos/air-max-portal-branco.jpg",
    tamanhos: ["34", "35", "36", "37", "38", "39"],
  },
  {
    id: "7",
    nome: "Nike Dunk Low",
    marca: "Nike",
    genero: "masculino",
    descricao: ["Duas opções de cadarços", "Primeira linha", "Branco / Preto"],
    preco_avista: 239.99,
    preco_aprazo: 239.99,
    preco_promocional_avista: 219.99,
    imagem: "/produtos/dunk-low-branco.jpg",
    tamanhos: ["38", "39", "40", "41", "42", "43"],
  },
];

export function getProdutoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}
