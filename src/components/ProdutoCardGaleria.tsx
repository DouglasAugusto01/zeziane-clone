"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagemLazy } from "@/components/ImagemLazy";
import { cn } from "@/lib/utils";

const INTERVALO_AUTOPLAY_MS = 1500;
const LIMIAR_SWIPE_PX = 40;

const CLASSE_IMAGEM =
  "h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105";

/** Carrossel de fotos para o card do catálogo — setas, pontinhos, autoplay
 * no hover (desktop) e swipe (celular). Sem efeito nenhum em produtos com
 * uma única foto: nesse caso renderiza só a imagem, como antes. */
export function ProdutoCardGaleria({
  imagens,
  alt,
}: {
  imagens: string[];
  alt: string;
}) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [hover, setHover] = useState(false);
  const [interagido, setInteragido] = useState(false);
  const [suportaHover, setSuportaHover] = useState(false);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const swipeDetectadoRef = useRef(false);

  const temVariasFotos = imagens.length > 1;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    queueMicrotask(() => setSuportaHover(mq.matches));
  }, []);

  const pararAutoplay = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  const iniciarAutoplay = () => {
    pararAutoplay();
    intervaloRef.current = setInterval(() => {
      setIndiceAtivo((i) => (i + 1) % imagens.length);
    }, INTERVALO_AUTOPLAY_MS);
  };

  useEffect(() => pararAutoplay, []);

  if (!temVariasFotos) {
    return <ImagemLazy src={imagens[0]} alt={alt} className={CLASSE_IMAGEM} />;
  }

  const irPara = (i: number) => {
    setInteragido(true);
    setIndiceAtivo(((i % imagens.length) + imagens.length) % imagens.length);
    // Clique manual reinicia a contagem do autoplay (se estiver em hover),
    // para a foto não trocar de novo logo em seguida.
    if (hover) iniciarAutoplay();
  };

  const handleMouseEnter = () => {
    setInteragido(true);
    setHover(true);
    if (suportaHover) iniciarAutoplay();
  };

  const handleMouseLeave = () => {
    setHover(false);
    pararAutoplay();
    setIndiceAtivo(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setInteragido(true);
    swipeDetectadoRef.current = false;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    if (Math.abs(e.touches[0].clientX - touchStartXRef.current) > LIMIAR_SWIPE_PX) {
      swipeDetectadoRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < LIMIAR_SWIPE_PX) return;
    // Foi um swipe, não um toque simples — evita que o clique sintético
    // subsequente navegue para a página do produto.
    e.preventDefault();
    if (deltaX < 0) irPara(indiceAtivo + 1);
    else irPara(indiceAtivo - 1);
  };

  const mostrarSetas = !suportaHover || hover;

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {(interagido ? imagens : [imagens[0]]).map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            i === indiceAtivo ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <ImagemLazy src={src} alt={alt} className={CLASSE_IMAGEM} />
        </div>
      ))}

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          irPara(indiceAtivo - 1);
        }}
        className={cn(
          "absolute left-1.5 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-opacity",
          mostrarSetas ? "opacity-100" : "opacity-0"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Próxima foto"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          irPara(indiceAtivo + 1);
        }}
        className={cn(
          "absolute right-1.5 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-opacity",
          mostrarSetas ? "opacity-100" : "opacity-0"
        )}
      >
        <ChevronRight className="size-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {imagens.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver foto ${i + 1} de ${imagens.length}`}
            aria-current={i === indiceAtivo}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              irPara(i);
            }}
            className={cn(
              "size-1.5 rounded-full transition-colors",
              i === indiceAtivo ? "bg-foreground" : "bg-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
