// Converte as fotos de /public/produtos para WebP comprimido/redimensionado.
// Uso: npm run optimizar-imagens
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "produtos");
const LARGURA_MAX = 1200;
const QUALIDADE = 78;

async function main() {
  const arquivos = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const arquivo of arquivos) {
    const entrada = path.join(DIR, arquivo);
    const saida = path.join(DIR, arquivo.replace(/\.(jpe?g|png)$/i, ".webp"));

    const antes = (await stat(entrada)).size;

    await sharp(entrada)
      .resize({ width: LARGURA_MAX, withoutEnlargement: true })
      .webp({ quality: QUALIDADE })
      .toFile(saida);

    const depois = (await stat(saida)).size;
    const reducao = Math.round((1 - depois / antes) * 100);

    console.log(
      `${arquivo} -> ${path.basename(saida)}: ${(antes / 1024).toFixed(0)}KB -> ${(depois / 1024).toFixed(0)}KB (-${reducao}%)`
    );
  }
}

main();
