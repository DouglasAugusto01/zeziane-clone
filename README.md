# NOVA | Calçados Premium

Site estático (Next.js) com catálogo de produtos, carrinho de compras e pedido enviado direto pelo WhatsApp (via link `wa.me`) — sem pagamento integrado e sem login.

🔗 **Site publicado:** https://douglasaugusto01.github.io/zeziane-clone/

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Configurar o número de WhatsApp

Copie `.env.local.example` para `.env.local` e defina o número real da loja (DDI + DDD + número, só dígitos):

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=55DDNNNNNNNNN
```

Sem essa variável, o projeto usa um número de exemplo (placeholder). Em produção, essa variável vem de uma *repository variable* do GitHub (usada pelo workflow de deploy), não do `.env.local`.

## Testes

```bash
npm test
```

Cobre as funções puras em `src/lib/` (totais do carrinho, mensagem do WhatsApp, ordenação/filtros) e a integridade dos dados em `src/data/produtos.ts` (ids e slugs únicos).

## Otimizar imagens de produto

```bash
npm run optimizar-imagens
```

Converte as fotos em `public/produtos/*.jpg|png` para `.webp` comprimido/redimensionado. Rode antes de referenciar uma foto nova em `src/data/produtos.ts`.

## Stack

- [Next.js](https://nextjs.org) (App Router, export estático)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- [lucide-react](https://lucide.dev) (ícones)
- [Vitest](https://vitest.dev) (testes)

## Deploy (automático)

Todo push em `main` builda e publica sozinho no GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (lint → testes → build → deploy).
Pull Requests rodam o mesmo lint/testes/build como gate, mas não publicam.
Não é preciso (nem recomendado) publicar manualmente.

Para rodar o build estático localmente, por exemplo para inspecionar a pasta `out/`:

```bash
GH_PAGES=true npm run build
```
