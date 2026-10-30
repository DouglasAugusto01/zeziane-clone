export { cn } from "cn"

// Formata centavos (inteiro) como reais no padrão brasileiro: "R$ 1.234,56".
export function formatarReais(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

// Prefixa caminhos de /public com o basePath do GitHub Pages quando
// necessário. Use em qualquer <img src="/arquivo.ext"> — essas tags não
// recebem o basePath automaticamente (diferente de next/image e next/link).
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

// Resolve a imagem de um produto: URLs externas (ex: placehold.co) passam
// direto, caminhos locais de /public recebem o basePath via withBasePath.
export function resolverImagem(src: string): string {
  if (/^https?:\/\//.test(src)) return src
  return withBasePath(src)
}
