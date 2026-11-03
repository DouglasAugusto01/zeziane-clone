import type { MetadataRoute } from "next";

// Necessário com output: "export" — essas rotas não têm dados dinâmicos,
// então são sempre estáticas mesmo sem essa declaração explícita.
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
