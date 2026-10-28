# NOVA | Calçados Premium

Site estático (Next.js) com catálogo de produtos e envio de pedidos direto pelo WhatsApp (via link `wa.me`) — sem carrinho de pagamento e sem login.

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

Sem essa variável, o projeto usa um número de exemplo (placeholder).

## Stack

- [Next.js](https://nextjs.org) (App Router, export estático)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- [lucide-react](https://lucide.dev) (ícones)

## Build e publicação (GitHub Pages)

```bash
GH_PAGES=true npm run build
```

Gera a pasta `out/` já com o prefixo de caminho (`basePath`) correto para ser publicada em `https://<usuario>.github.io/zeziane-clone/`. O conteúdo dessa pasta é publicado na branch `gh-pages`.
