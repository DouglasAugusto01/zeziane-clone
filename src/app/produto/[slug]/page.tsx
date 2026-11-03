import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { produtos, getProdutoPorSlug } from "@/data/produtos";
import { Header } from "@/components/Header";
import { ProdutoDetalhe } from "@/components/ProdutoDetalhe";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return produtos.map((produto) => ({ slug: produto.slug }));
}

export async function generateMetadata(
  props: PageProps<"/produto/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const produto = getProdutoPorSlug(slug);

  if (!produto) return { title: "Produto não encontrado | NOVA" };

  return {
    title: `${produto.nome} | NOVA Calçados Premium`,
    description: produto.descricao.join(" • "),
    openGraph: {
      title: `${produto.nome} | NOVA Calçados Premium`,
      description: produto.descricao.join(" • "),
      images: produto.imagem.startsWith("http") ? [produto.imagem] : undefined,
    },
  };
}

export default async function ProdutoPage(props: PageProps<"/produto/[slug]">) {
  const { slug } = await props.params;
  const produto = getProdutoPorSlug(slug);

  if (!produto) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProdutoDetalhe produto={produto} />
      <Footer />
    </div>
  );
}
