import type { Metadata } from "next";
import Link from "next/link";
import { PaginaLegal, SecaoLegal } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de Cookies | NOVA Calçados Premium",
  description:
    "Quais cookies e dados armazenados localmente este site usa, e como gerenciar suas preferências.",
};

const COOKIES: {
  nome: string;
  finalidade: string;
  duracao: string;
  tipo: string;
}[] = [
  {
    nome: "_ga",
    finalidade: "Identifica seu navegador de forma anônima, para distinguir visitantes únicos.",
    duracao: "até 2 anos",
    tipo: "Análise (Google Analytics)",
  },
  {
    nome: "_ga_*",
    finalidade: "Mantém o estado da sessão de navegação para o Google Analytics.",
    duracao: "até 2 anos",
    tipo: "Análise (Google Analytics)",
  },
];

export default function PoliticaDeCookiesPage() {
  return (
    <PaginaLegal titulo="Política de Cookies" atualizadoEm="novembro de 2026">
      <SecaoLegal titulo="1. O que são cookies">
        <p>
          Cookies são pequenos arquivos de texto que um site salva no seu
          navegador para lembrar informações entre visitas. Este site também
          usa o <strong>localStorage</strong> do navegador (uma forma
          parecida de armazenamento local) para guardar a sua sacola de
          compras — tratamos os dois de forma semelhante nesta política,
          embora tecnicamente não sejam a mesma coisa.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="2. Cookies estritamente necessários">
        <p>
          Este site <strong>não usa cookies estritamente necessários</strong>{" "}
          para funcionar — não há login, carrinho de pagamento nem sessão de
          servidor. A única coisa salva sem precisar de consentimento é a sua
          sacola de produtos, guardada em <strong>localStorage</strong> (não é
          um cookie) só no seu navegador, nunca enviada para nós. Você pode
          apagar isso a qualquer momento limpando os dados do site nas
          configurações do navegador, ou usando o botão &quot;Limpar
          carrinho&quot; no próprio site.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="3. Cookies de análise (Google Analytics)">
        <p>
          Com o seu consentimento, dado pelo banner exibido na primeira
          visita, usamos o Google Analytics (GA4) para entender como os
          visitantes navegam pelo catálogo. Esses cookies são de terceiro
          (Google LLC):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Cookie</th>
                <th className="py-2 pr-3 font-medium">Finalidade</th>
                <th className="py-2 pr-3 font-medium">Duração</th>
                <th className="py-2 font-medium">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((c) => (
                <tr key={c.nome} className="border-b border-border/50">
                  <td className="py-2 pr-3 font-mono text-[11px]">{c.nome}</td>
                  <td className="py-2 pr-3">{c.finalidade}</td>
                  <td className="py-2 pr-3">{c.duracao}</td>
                  <td className="py-2">{c.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          O Google Analytics também recebe, a cada visita consentida,
          eventos sem dados pessoais identificáveis — por exemplo, quando um
          produto é adicionado à sacola (nome do produto, cor, tamanho,
          preço) ou quando um pedido é iniciado pelo WhatsApp (os mesmos
          dados, sem nome, telefone ou endereço).
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="4. Como gerenciar sua preferência">
        <p>
          Você escolhe aceitar ou recusar os cookies de análise no banner
          exibido ao visitar o site. Para mudar de ideia depois:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Limpe os dados/cookies deste site nas configurações do seu
            navegador — o banner volta a aparecer na próxima visita;
          </li>
          <li>
            Ou use as configurações de bloqueio de cookies de terceiros do
            seu navegador, que impedem o Google Analytics de funcionar mesmo
            sem isso;
          </li>
          <li>
            O Google também oferece um{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              complemento de navegador para desativar o Analytics
            </a>{" "}
            em qualquer site que o use.
          </li>
        </ul>
      </SecaoLegal>

      <SecaoLegal titulo="5. Mais informações sobre seus dados">
        <p>
          Para entender como tratamos e protegemos seus dados de forma mais
          ampla, veja nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="6. Alterações nesta política">
        <p>
          Podemos atualizar esta política se os cookies usados mudarem. A
          data no topo desta página sempre indica a versão mais recente.
        </p>
      </SecaoLegal>
    </PaginaLegal>
  );
}
