<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Fluxo de trabalho deste projeto (Issues + Pull Requests)

Qualquer agente (de qualquer modelo) que for implementar uma tarefa neste
repositório — correção de bug, melhoria ou nova funcionalidade — deve seguir
este padrão:

1. **Analisar a estrutura do código antes de implementar.** Olhe `src/`
   (componentes, dados, context, helpers) para reaproveitar o que já existe
   em vez de recriar componentes ou duplicar lógica, e para não quebrar
   funcionalidades que já funcionam.
2. **Criar uma Issue no GitHub** descrevendo a tarefa (`gh issue create`),
   classificando-a como Correção, Melhoria ou Nova função.
3. **Criar uma branch** a partir de `main` para o trabalho (ex:
   `feature/nome-da-tarefa`, `fix/nome-do-bug`).
4. **Implementar e commitar na branch**, testando antes de finalizar
   (build, navegação, filtros, responsividade, imagens).
5. **Abrir um Pull Request** da branch para `main`, mencionando a Issue na
   descrição (ex: `Closes #N`), para que o GitHub feche a Issue
   automaticamente ao mesclar.
6. **Mesclar o PR** e então gerar o build estático
   (`GH_PAGES=true npm run build`) e publicar a pasta `out/` na branch
   `gh-pages` (GitHub Pages), como já documentado no README.

Este projeto usa Next.js App Router com export estático (`output: "export"`)
para publicação no GitHub Pages com `basePath`. Páginas novas com rotas
dinâmicas precisam de `generateStaticParams()`. Imagens locais em `/public`
usadas em tags `<img>` precisam passar por `resolverImagem()` /
`withBasePath()` (`src/lib/utils.ts`) para funcionar corretamente sob o
`basePath` do GitHub Pages — tags `<img>` não recebem esse prefixo
automaticamente (diferente de `next/link` e `next/image`).

