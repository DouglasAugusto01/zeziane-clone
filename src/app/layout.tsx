import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { CarrinhoDrawer } from "@/components/CarrinhoDrawer";
import { BotaoWhatsAppFlutuante } from "@/components/BotaoWhatsAppFlutuante";

// Só carrega o Google Analytics se o ID estiver configurado — em dev e em
// forks/clones sem a variável definida, nada é carregado.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NOVA | Calçados Premium",
  description: "Calçados premium feitos à mão. Produção limitada e exclusiva.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <CarrinhoProvider>
          {children}
          <CarrinhoDrawer />
          <BotaoWhatsAppFlutuante />
        </CarrinhoProvider>
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
