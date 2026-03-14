export const ListingsPageSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
        >
          {/* Image area */}
          <div className="relative h-48 bg-gray-100 animate-pulse">
            {/* classification badge top-left */}
            <div className="absolute top-3 left-3 h-[22px] w-24 rounded-full bg-black/10" />
            {/* status badge top-right */}
            <div className="absolute top-3 right-3 h-[22px] w-16 rounded-full bg-black/10" />
          </div>
  
          {/* Body */}
          <div className="p-4 space-y-3 animate-pulse">
            {/* title */}
            <div className="h-[15px] w-3/4 rounded bg-gray-100" />
  
            {/* location row */}
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-gray-100 shrink-0" />
              <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
  
            {/* area row */}
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-gray-100 shrink-0" />
              <div className="h-3 w-2/5 rounded bg-gray-100" />
            </div>
  
            {/* price block */}
            <div className="space-y-1.5">
              <div className="h-2.5 w-1/4 rounded bg-gray-100" /> {/* original price (strikethrough) */}
              <div className="h-5 w-2/5 rounded bg-gray-100" />   {/* discounted price */}
              <div className="h-2.5 w-1/5 rounded bg-gray-100" /> {/* discount % */}
            </div>
  
            {/* agent */}
            <div className="h-3 w-1/2 rounded bg-gray-100" />
  
            {/* badges row */}
            <div className="flex gap-2">
              <div className="h-[22px] w-28 rounded-full bg-gray-100" />
              <div className="h-[22px] w-24 rounded-full bg-gray-100" />
            </div>
          </div>
  
          {/* Action buttons */}
          <div className="px-4 pb-4 pt-0 border-t border-gray-50 flex gap-2 animate-pulse">
            <div className="h-8 flex-1 rounded-lg bg-gray-100" />
            <div className="h-8 flex-1 rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
  