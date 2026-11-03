"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";

const CHAVE_LOCALSTORAGE = "nova-cookie-consent";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type Consentimento = "aceito" | "recusado";

export function CookieConsent() {
  const [consentimento, setConsentimento] = useState<Consentimento | null>(null);
  const [hidratado, setHidratado] = useState(false);

  // Lido após o mount (não no corpo síncrono do effect) para evitar
  // divergência entre o HTML estático e o client na hidratação.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const salvo = localStorage.getItem(CHAVE_LOCALSTORAGE);
        if (salvo === "aceito" || salvo === "recusado") setConsentimento(salvo);
      } catch {
        // localStorage indisponível — trata como "ainda não decidiu"
      } finally {
        setHidratado(true);
      }
    });
  }, []);

  const escolher = (valor: Consentimento) => {
    setConsentimento(valor);
    try {
      localStorage.setItem(CHAVE_LOCALSTORAGE, valor);
    } catch {
      // ignora falha de gravação
    }
  };

  // Sem ID configurado, não há o que consentir nem o que carregar.
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consentimento === "aceito" && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}

      {hidratado && consentimento === null && (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background/95 px-4 py-4 shadow-2xl backdrop-blur sm:px-6"
        >
          <div className="container mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground sm:max-w-xl">
              Usamos cookies de análise (Google Analytics) para entender como
              você navega pelo site. Nenhum dado de pagamento é coletado aqui.
              Veja a{" "}
              <Link
                href="/politica-de-cookies"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Política de Cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => escolher("recusado")}
              >
                Recusar
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-foreground text-background hover:bg-foreground/85"
                onClick={() => escolher("aceito")}
              >
                Aceitar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
