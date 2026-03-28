import { Card } from "@/shared/components/ui/card";

export const TableSkeleton = () => (
  <Card className="overflow-hidden rounded-[24px] border border-[#D8E0ED] p-0 shadow-none">
    <div className="divide-y divide-gray-50">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-7 py-5 animate-pulse" 
        >
          {/* Thumbnail Skeleton */}
          <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0" />
          
          {/* Content Skeletons */}
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-48" />
            <div className="h-2.5 bg-gray-100 rounded w-24" />
          </div>
          
          {/* Price/Status Skeletons */}
          <div className="h-3 bg-gray-100 rounded w-32" />
          <div className="h-6 bg-gray-100 rounded-full w-16" />
          <div className="h-3 bg-gray-100 rounded w-24" />
          
          {/* Actions Skeleton */}
          <div className="w-[80px] h-8 bg-gray-100 rounded-lg flex-shrink-0" />
        </div>
      ))}
    </div>
  </Card>
);