"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { PaginatedMeta } from "../types";

type PaginationProps = {
  meta: PaginatedMeta;
};

export default function UsersPagination({ meta }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { pageNumber, totalPages, totalCount, pageSize } = meta;

  const from = totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const to = Math.min(pageNumber * pageSize, totalCount);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  // Build visible page numbers (max 5 shown)
  function getVisiblePages(): (number | "...")[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (pageNumber <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (pageNumber >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", pageNumber - 1, pageNumber, pageNumber + 1, "...", totalPages];
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Count label */}
      <p className="text-[12px] text-[#63738F]">
        Showing <span className="font-medium text-[#0F172A]">{from}–{to}</span> of{" "}
        <span className="font-medium text-[#0F172A]">{totalCount}</span> users
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="flex size-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#D8E0ED] bg-white text-[#344054] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {getVisiblePages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex size-9 items-center justify-center text-[12px] text-[#63738F]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p as number)}
              className={cn(
                "flex size-9 cursor-pointer items-center justify-center rounded-[10px] border text-[12px] font-medium transition",
                p === pageNumber
                  ? "border-[#3C71FF] bg-[#3C71FF] text-white"
                  : "border-[#D8E0ED] bg-white text-[#344054] hover:bg-[#F8FAFC]"
              )}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="flex size-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#D8E0ED] bg-white text-[#344054] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}