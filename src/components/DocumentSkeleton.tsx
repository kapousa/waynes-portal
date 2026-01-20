import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DocumentSkeletonProps {
  count?: number;
}

const DocumentSkeleton = ({ count = 3 }: DocumentSkeletonProps) => {
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-5 bg-card rounded-xl border border-border animate-pulse"
        >
          <div className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
            {/* Icon Skeleton */}
            <Skeleton className="shrink-0 w-12 h-12 rounded-lg" />

            {/* Content Skeleton */}
            <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-3" />

              {/* Tags Skeleton */}
              <div className={cn("flex gap-1.5 mb-3", isRTL && "justify-end")}>
                <Skeleton className="h-5 w-12 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>

              {/* Footer Skeleton */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentSkeleton;
