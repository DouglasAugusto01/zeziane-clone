import { MessageCircle } from "lucide-react";
import { linkWhatsApp } from "@/lib/pedido";

const MENSAGEM_DUVIDA =
  "Olá! Tenho uma dúvida sobre os produtos da NOVA Calçados.";

const TABELA_NUMERACAO: { br: string; cm: string }[] = [
  { br: "34", cm: "21,5 cm" },
  { br: "35", cm: "22 cm" },
  { br: "36", cm: "22,5 cm" },
  { br: "37", cm: "23,5 cm" },
  { br: "38", cm: "24 cm" },
  { br: "39", cm: "24,5 cm" },
  { br: "40", cm: "25,5 cm" },
  { br: "41", cm: "26 cm" },
  { br: "42", cm: "27 cm" },
  { br: "43", cm: "27,5 cm" },
  { br: "44", cm: "28,5 cm" },
];

function Sanfona({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-border/70 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
        {titulo}
        <span className="text-muted-foreground transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
        <div className="space-y-3">
          <p className="font-heading text-xl font-semibold tracking-wide">
            NOVA
          </p>
          <p className="text-sm text-muted-foreground">
            Calçados premium, produção limitada. Catálogo digital com pedidos
            combinados diretamente com um vendedor pelo WhatsApp.
          </p>
          <a
            href={linkWhatsApp(MENSAGEM_DUVIDA)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-500"
          >
            <MessageCircle className="size-4" />
            Falar no WhatsApp
          </a>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Compra
          </p>
          <Sanfona titulo="Frete e entrega">
            O prazo e o valor do frete são combinados diretamente com o
            vendedor no momento da confirmação do pedido.
          </Sanfona>
          <Sanfona titulo="Trocas e devoluções">
            Condições de troca e devolução são combinadas diretamente com o
            vendedor pelo WhatsApp, após o fechamento do pedido.
          </Sanfona>
          <Sanfona titulo="Formas de pagamento">
            Pix (com o valor à vista mostrado em cada produto) ou parcelado em
            até 3x sem juros, confirmado com o vendedor.
          </Sanfona>
        </div>

        <div id="guia-de-numeracao">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Guia de numeração
          </p>
          <Sanfona titulo="Tabela de medidas (BR)">
            <p className="mb-2">
              Medida aproximada do comprimento do pé. Em caso de dúvida,
              confirme com o vendedor antes de fechar o pedido.
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="pb-1 font-medium">BR</th>
                  <th className="pb-1 font-medium">Comprimento</th>
                </tr>
              </thead>
              <tbody>
                {TABELA_NUMERACAO.map((linha) => (
                  <tr key={linha.br} className="border-t border-border/50">
                    <td className="py-1">{linha.br}</td>
                    <td className="py-1">{linha.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sanfona>
          <Sanfona titulo="Preciso criar uma conta para comprar?">
            Não. O site não tem login — você monta sua lista e finaliza
            diretamente pelo WhatsApp.
          </Sanfona>
          <Sanfona titulo="Como funciona o pagamento?">
            É combinado diretamente com o vendedor pelo WhatsApp: Pix ou
            parcelado em até 3x sem juros.
          </Sanfona>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-4 text-center text-[11px] text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} NOVA Calçados Premium — catálogo digital
        com pedidos via WhatsApp.
      </div>
    </footer>
  );
}
