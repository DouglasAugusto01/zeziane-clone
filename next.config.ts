import type { NextConfig } from "next";

// Nome do repositório no GitHub — usado como prefixo das URLs quando o site
// é publicado no GitHub Pages (ex: https://usuario.github.io/zeziane-clone/).
const repoName = "zeziane-clone";
const isGhPages = process.env.GH_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? `/${repoName}` : "",
  assetPrefix: isGhPages ? `/${repoName}/` : "",
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
