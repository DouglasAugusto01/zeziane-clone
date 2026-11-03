import type { NextConfig } from "next";

// Nome do repositório no GitHub — usado como prefixo das URLs quando o site
// é publicado no GitHub Pages (ex: https://usuario.github.io/zeziane-clone/).
const repoName = "zeziane-clone";
const isGhPages = process.env.GH_PAGES === "true";

const basePath = isGhPages ? `/${repoName}` : "";

// URL pública completa do site publicado — usada por sitemap.ts/robots.ts.
// Troque aqui se o site passar a usar domínio próprio.
const siteUrl = isGhPages
  ? `https://douglasaugusto01.github.io/${repoName}`
  : "http://localhost:3000";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: isGhPages ? `/${repoName}/` : "",
  // Exposto ao client para prefixar manualmente imagens de /public
  // referenciadas via <img src="..."> (essas tags não recebem o
  // basePath automaticamente, diferente de next/image e next/link).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
