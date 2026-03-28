import { Suspense } from "react";
import { ListingViewPage } from "@/features/listings";
import { serverFetchGetLand } from "@/features/listings/api";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: number }>;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

const ListingViewSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="h-7 w-56 bg-gray-200 rounded-lg" />
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="h-72 bg-gray-100" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-100 rounded" />
        <div className="h-4 w-1/3 bg-gray-100 rounded" />
        <div className="h-8 w-32 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  </div>
);

// ── Data Fetcher ──────────────────────────────────────────────────────────────

async function ListingViewFetcher({ id }: { id: number }) {
  const queryClient = getQueryClient();
  const response = await serverFetchGetLand(id);

  if (!response?.data) notFound();

  queryClient.setQueryData(["getLand", id], response);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingViewPage listing={response.data} />
    </HydrationBoundary>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ListingViewSkeleton />}>
      <ListingViewFetcher id={Number(id)} />
    </Suspense>
  );
}