import { describe, expect, it } from "vitest";
import { produtos } from "@/data/produtos";

describe("integridade dos dados de produtos", () => {
  it("não tem ids duplicados", () => {
    const ids = produtos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("não tem slugs duplicados", () => {
    const slugs = produtos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slugs usam só letras minúsculas, números e hífen", () => {
    for (const p of produtos) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("todo produto tem pelo menos 1 cor e 1 tamanho", () => {
    for (const p of produtos) {
      expect(p.cores.length).toBeGreaterThan(0);
      expect(p.tamanhos.length).toBeGreaterThan(0);
    }
  });

  it("preços são inteiros positivos (centavos) e o parcelado nunca é menor que o Pix", () => {
    for (const p of produtos) {
      expect(Number.isInteger(p.precoPixCentavos)).toBe(true);
      expect(Number.isInteger(p.precoParceladoCentavos)).toBe(true);
      expect(p.precoPixCentavos).toBeGreaterThan(0);
      expect(p.precoParceladoCentavos).toBeGreaterThanOrEqual(p.precoPixCentavos);
    }
  });

  it("todo produto tem ao menos 1 linha de descrição e 1 imagem", () => {
    for (const p of produtos) {
      expect(p.descricao.length).toBeGreaterThan(0);
      expect(p.imagem.length).toBeGreaterThan(0);
    }
  });
});
