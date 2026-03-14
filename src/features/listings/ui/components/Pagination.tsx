interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isPending?: boolean;
  }
  
  export const Pagination = ({ currentPage, totalPages, onPageChange, isPending }: Props) => {
    if (totalPages <= 1) return null;
  
    const getPages = (): (number | "...")[] => {
      if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  
      if (currentPage <= 4)
        return [1, 2, 3, 4, 5, "...", totalPages];
  
      if (currentPage >= totalPages - 3)
        return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };
  
    return (
      <div className="flex items-center justify-center gap-1.5">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
  
        {/* Pages */}
        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-2 py-2 text-sm text-gray-400 select-none">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={isPending}
              className={`w-9 h-9 text-sm font-medium rounded-xl transition-colors disabled:cursor-not-allowed ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )
        )}
  
        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };