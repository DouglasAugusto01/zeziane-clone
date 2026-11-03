import type { Metadata } from "next";
import Link from "next/link";
import { PaginaLegal, SecaoLegal } from "@/components/PaginaLegal";
import { linkWhatsApp } from "@/lib/pedido";
import { NOME_NEGOCIO, EMAIL_PRIVACIDADE } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Política de Privacidade | NOVA Calçados Premium",
  description:
    "Como a NOVA Calçados Premium trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
};

const MENSAGEM_PRIVACIDADE =
  "Olá! Tenho uma solicitação sobre meus dados pessoais (LGPD).";

export default function PoliticaDePrivacidadePage() {
  return (
    <PaginaLegal titulo="Política de Privacidade" atualizadoEm="novembro de 2026">
      <SecaoLegal titulo="1. Introdução">
        <p>
          Esta Política de Privacidade explica como a {NOME_NEGOCIO}{" "}
          (&quot;nós&quot;) trata os dados pessoais de quem visita este site,
          em conformidade com a Lei nº 13.709/2018 — Lei Geral de Proteção de
          Dados Pessoais (LGPD).
        </p>
        <p>
          Este é um catálogo digital. Não há criação de conta, login nem
          pagamento processado diretamente no site — todo pedido é fechado
          por mensagem direta com um vendedor pelo WhatsApp.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="2. Quem é o controlador dos dados">
        <p>
          O controlador dos dados tratados neste site é {NOME_NEGOCIO}. Para
          qualquer dúvida ou solicitação sobre seus dados, use os contatos da
          seção 8 desta política.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="3. Quais dados coletamos e de onde vêm">
        <p>
          <strong>Dados que você mesmo informa, fora do site:</strong> ao
          clicar em &quot;Falar com vendedor&quot; ou &quot;Finalizar pedido
          no WhatsApp&quot;, o site abre uma conversa no WhatsApp com uma
          mensagem pronta contendo os produtos escolhidos. A partir daí, nome,
          telefone, endereço de entrega e qualquer outro dado que você
          compartilhar são trocados diretamente dentro do WhatsApp — uma
          plataforma da Meta, com sua própria política de privacidade. Nós
          não temos acesso a essa conversa a não ser que você a envie, e não
          armazenamos esses dados em nenhum banco de dados do site.
        </p>
        <p>
          <strong>Dados coletados automaticamente (Google Analytics):</strong>{" "}
          se você aceitar os cookies de análise (veja a{" "}
          <Link
            href="/politica-de-cookies"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Política de Cookies
          </Link>
          ), coletamos de forma agregada e majoritariamente anônima: páginas
          visitadas, tempo de navegação, dispositivo e navegador usados,
          localização aproximada (cidade/estado, estimada pelo IP — o IP em
          si não é armazenado por nós), origem do acesso (ex: Google,
          Instagram, link direto) e quais produtos foram adicionados à sacola
          ou levaram a um pedido pelo WhatsApp (sem nenhum dado pessoal
          associado a essa navegação).
        </p>
        <p>
          <strong>Dados que ficam só no seu navegador:</strong> os itens que
          você adiciona à sacola de compras são salvos localmente no seu
          próprio navegador (localStorage), para você não perder a seleção ao
          trocar de página ou recarregar. Esses dados nunca são enviados para
          nenhum servidor nosso — ficam exclusivamente no seu dispositivo, e
          você pode apagá-los a qualquer momento limpando os dados do site
          nas configurações do navegador.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="4. Para que usamos esses dados (finalidade)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Entender quais produtos e páginas têm mais interesse;</li>
          <li>Melhorar a navegação e os filtros do catálogo;</li>
          <li>Medir quantos pedidos são iniciados pelo WhatsApp;</li>
          <li>
            Permitir que você monte uma lista de produtos antes de falar com
            o vendedor.
          </li>
        </ul>
        <p>
          Não usamos esses dados para decisões automatizadas que afetem você,
          nem para enviar propaganda por e-mail ou SMS — não coletamos e-mail
          ou telefone através do site em si.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="5. Base legal (LGPD, art. 7º)">
        <p>
          O tratamento de dados de navegação via Google Analytics ocorre com
          base no seu <strong>consentimento</strong> (art. 7º, I), coletado
          pelo banner de cookies exibido na primeira visita — você pode
          recusar ou revogar esse consentimento a qualquer momento (seção 7).
          O uso da sacola de compras em localStorage se baseia na{" "}
          <strong>execução de funcionalidade solicitada por você</strong>{" "}
          (art. 7º, V), já que ela existe para você usar o site.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="6. Compartilhamento de dados com terceiros">
        <p>Compartilhamos dados de navegação, quando consentidos, com:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Google LLC</strong> (Google Analytics) — processamento de
            métricas de navegação. Os dados podem ser transferidos e
            processados em servidores fora do Brasil, seguindo as
            salvaguardas contratuais do próprio Google.
          </li>
          <li>
            <strong>WhatsApp / Meta Platforms, Inc.</strong> — apenas quando
            você mesmo opta por abrir uma conversa pelo botão do WhatsApp; a
            partir daí, o tratamento desses dados segue a política de
            privacidade do WhatsApp, não a nossa.
          </li>
        </ul>
        <p>
          Não vendemos, alugamos nem compartilhamos dados com terceiros para
          fins de publicidade de outras empresas.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="7. Seus direitos (LGPD, art. 18)">
        <p>Você tem direito a, a qualquer momento:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Confirmar se tratamos algum dado seu;</li>
          <li>Acessar os dados tratados;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Solicitar anonimização, bloqueio ou eliminação de dados
            desnecessários;
          </li>
          <li>Solicitar a portabilidade dos dados a outro fornecedor;</li>
          <li>Solicitar a eliminação dos dados tratados com consentimento;</li>
          <li>
            Revogar o consentimento do Google Analytics a qualquer momento,
            limpando a escolha salva pelo banner de cookies (seção 7 da{" "}
            <Link
              href="/politica-de-cookies"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Política de Cookies
            </Link>
            ) ou apagando os dados do site no seu navegador;
          </li>
          <li>Pedir informação sobre com quem compartilhamos seus dados.</li>
        </ul>
      </SecaoLegal>

      <SecaoLegal titulo="8. Como exercer seus direitos">
        <p>Para qualquer solicitação relacionada aos itens da seção 7, fale com a gente:</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={linkWhatsApp(MENSAGEM_PRIVACIDADE)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-500"
          >
            Falar no WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL_PRIVACIDADE}`}
            className="rounded-full border border-foreground px-4 py-2 text-xs font-medium transition-colors hover:bg-accent"
          >
            {EMAIL_PRIVACIDADE}
          </a>
        </div>
        <p className="pt-1">Respondemos às solicitações em prazo razoável, conforme a LGPD.</p>
      </SecaoLegal>

      <SecaoLegal titulo="9. Segurança">
        <p>
          O site é publicado via HTTPS (conexão criptografada). Como não
          operamos um banco de dados próprio de clientes — a sacola fica só
          no seu navegador e os pedidos são fechados no WhatsApp — a
          superfície de risco de vazamento de dados pessoais pelo site em si
          é propositalmente mínima.
        </p>
      </SecaoLegal>

      <SecaoLegal titulo="10. Alterações nesta política">
        <p>
          Podemos atualizar esta política para refletir mudanças no site ou
          na legislação. A data no topo desta página sempre indica a versão
          mais recente.
        </p>
      </SecaoLegal>
    </PaginaLegal>
  );
}
