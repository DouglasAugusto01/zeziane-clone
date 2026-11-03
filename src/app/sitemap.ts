import type { MetadataRoute } from "next";
import { produtos } from "@/data/produtos";

// Necessário com output: "export" — essa rota não tem dados dinâmicos,
// então é sempre estática mesmo sem essa declaração explícita.
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFixas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/colecao`, priority: 0.9 },
    { url: `${SITE_URL}/sobre`, priority: 0.5 },
    { url: `${SITE_URL}/politica-de-privacidade`, priority: 0.3 },
    { url: `${SITE_URL}/politica-de-cookies`, priority: 0.3 },
  ];

  const paginasDeProduto: MetadataRoute.Sitemap = produtos.map((produto) => ({
    url: `${SITE_URL}/produto/${produto.slug}`,
    priority: 0.7,
  }));

  return [...paginasFixas, ...paginasDeProduto];
}
