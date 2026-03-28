export const FormSkeleton = ({ rows = 5 }) => (
  <div className="p-6 space-y-6 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-100 rounded-xl" />
      </div>
    ))}
  </div>
);