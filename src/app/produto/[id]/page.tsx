import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { produtos, getProdutoPorId } from "@/data/produtos";
import { Header } from "@/components/Header";
import { ProdutoDetalhe } from "@/components/ProdutoDetalhe";
import { PreferenciasSection } from "@/components/PreferenciasSection";

export async function generateStaticParams() {
  return produtos.map((produto) => ({ id: produto.id }));
}

export async function generateMetadata(
  props: PageProps<"/produto/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const produto = getProdutoPorId(id);

  if (!produto) return { title: "Produto não encontrado | NOVA" };

  return {
    title: `${produto.nome} | NOVA Calçados Premium`,
    description: produto.descricao.join(" • "),
  };
}

export default async function ProdutoPage(props: PageProps<"/produto/[id]">) {
  const { id } = await props.params;
  const produto = getProdutoPorId(id);

  if (!produto) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProdutoDetalhe produto={produto} />
      <PreferenciasSection />
    </div>
  );
}
