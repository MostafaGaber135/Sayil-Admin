import { Suspense } from "react";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import { serverFetchGetLand } from "@/features/listings/api";
import { EditListingContainer } from "@/features/listings";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: number }>;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

const EditListingSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="h-7 w-40 bg-gray-200 rounded-lg" />
    <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
      {/* Form fields */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-100 rounded-xl" />
        </div>
      ))}
      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <div className="h-10 w-28 bg-gray-200 rounded-xl" />
        <div className="h-10 w-28 bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
);

// ── Data Fetcher ──────────────────────────────────────────────────────────────

async function EditListingFetcher({ id }: { id: number }) {
  const queryClient = getQueryClient();

  const [landData, lookupsData] = await Promise.all([
    serverFetchGetLand(id),
    getListingLookupsService(),
  ]);

  if (!landData?.data) notFound();

  queryClient.setQueryData(["getLand", id], landData);
  queryClient.setQueryData(["listings-lookups"], lookupsData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditListingContainer id={id} />
    </HydrationBoundary>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EditListingPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<EditListingSkeleton />}>
      <EditListingFetcher id={Number(id)} />
    </Suspense>
  );
}