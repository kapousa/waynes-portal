import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CategorySkeletonProps {
  count?: number;
}

const CategorySkeleton = ({ count = 6 }: CategorySkeletonProps) => {
  const { isRTL } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-card rounded-xl border border-border animate-pulse"
        >
          <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
            {/* Icon Skeleton */}
            <Skeleton className="shrink-0 w-14 h-14 rounded-xl" />

            {/* Content Skeleton */}
            <div className={cn("flex-1 min-w-0", isRTL && "text-right")}>
              <Skeleton className="h-5 w-2/3 mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-4/5 mb-3" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
