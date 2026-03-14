import { Suspense } from "react";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import { AddListingContainer } from "@/features/listings/ui/AddListingContainer";

// ── Skeleton ──────────────────────────────────────────────────────────────────

const AddListingSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="h-7 w-36 bg-gray-200 rounded-lg" />
    <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-100 rounded-xl" />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <div className="h-10 w-28 bg-gray-200 rounded-xl" />
        <div className="h-10 w-28 bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
);

// ── Data Fetcher ──────────────────────────────────────────────────────────────

async function AddListingFetcher() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["listings-lookups"],
    queryFn: getListingLookupsService,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddListingContainer />
    </HydrationBoundary>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AddListingPage() {
  return (
    <Suspense fallback={<AddListingSkeleton />}>
      <AddListingFetcher />
    </Suspense>
  );
}