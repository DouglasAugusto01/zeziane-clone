"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { resolverImagem, cn } from "@/lib/utils";

export function ImagemLazy({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [carregada, setCarregada] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Se a imagem já veio do cache do navegador, o evento "load" pode disparar
  // antes do React conseguir anexar o onLoad — checamos .complete ao montar
  // para não deixar o skeleton preso para sempre nesse caso.
  useEffect(() => {
    if (imgRef.current?.complete) setCarregada(true);
  }, []);

  return (
    <div className="relative h-full w-full">
      {!carregada && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <img
        ref={imgRef}
        src={resolverImagem(src)}
        alt={alt}
        loading="lazy"
        onLoad={() => setCarregada(true)}
        className={cn(
          className,
          "transition-opacity duration-500 ease-out",
          carregada ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
