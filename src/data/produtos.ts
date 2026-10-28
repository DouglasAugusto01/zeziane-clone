export type Produto = {
  id: string;
  nome: string;
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
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 149.9,
    preco_aprazo: 169.9,
    imagem: "https://placehold.co/400x400?text=Icon+Low-Top",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "2",
    nome: "'NOVA' Chelsea Boot",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 219.9,
    preco_aprazo: 249.9,
    imagem: "https://placehold.co/400x400?text=Chelsea+Boot",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "3",
    nome: "'NOVA' Top Minimal",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 179.9,
    preco_aprazo: 199.9,
    imagem: "https://placehold.co/400x400?text=Top+Minimal",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "4",
    nome: "'Derby' Shoe",
    descricao: ["Couro italiano certificado", "Solado anatômico Vibram"],
    preco_avista: 199.9,
    preco_aprazo: 229.9,
    imagem: "https://placehold.co/400x400?text=Derby+Shoe",
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
  },
];

export function getProdutoPorId(id: string): Produto | undefined {
  return produtos.find((p) => p.id === id);
}
