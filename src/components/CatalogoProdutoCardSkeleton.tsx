import { Skeleton } from "@/components/ui/skeleton";

export function CatalogoProdutoCardSkeleton() {
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-border/70 bg-card">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 px-5 pb-5 pt-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-32" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
