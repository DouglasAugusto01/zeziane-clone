"use client";

import { useState } from "react";
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

  return (
    <div className="relative h-full w-full">
      {!carregada && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <img
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
