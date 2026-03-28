
export const UsersScreenSkeleton = () => (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 rounded-lg" />
        <div className="h-4 w-72 bg-gray-100 rounded-lg" />
      </div>
  
      {/* Tabs */}
      <div className="flex gap-2">
        <div className="h-9 w-24 bg-gray-200 rounded-xl" />
        <div className="h-9 w-24 bg-gray-100 rounded-xl" />
      </div>
  
      {/* Search + actions bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4">
        <div className="flex gap-3">
          <div className="h-10 flex-1 bg-gray-100 rounded-xl" />
          <div className="h-10 w-28 bg-gray-100 rounded-xl" />
        </div>
      </div>
  
      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-100 rounded w-3/4" />
          ))}
        </div>
  
        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-4 py-4 border-b border-gray-50 last:border-0"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 shrink-0" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-2/3 self-center" />
            <div className="h-3 bg-gray-100 rounded w-1/2 self-center" />
            <div className="h-5 w-16 bg-gray-100 rounded-full self-center" />
            <div className="flex gap-2 self-center">
              <div className="h-7 w-7 bg-gray-100 rounded-lg" />
              <div className="h-7 w-7 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
  
      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );