export { cn } from "cn"

export function formatarPreco(valor: number): string {
  return valor.toFixed(2).replace(".", ",")
}

// Prefixa caminhos de /public com o basePath do GitHub Pages quando
// necessário. Use em qualquer <img src="/arquivo.ext"> — essas tags não
// recebem o basePath automaticamente (diferente de next/image e next/link).
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
