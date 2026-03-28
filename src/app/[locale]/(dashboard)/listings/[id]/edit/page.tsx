import { Suspense } from "react";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import { serverFetchGetLand } from "@/features/listings/api";
import { EditListingContainer } from "@/features/listings";
import { notFound } from "next/navigation";
import { FormSkeleton } from "@/shared/ui/FormSkeleton";

interface PageProps {
  params: Promise<{ id: number }>;
}


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
    <Suspense fallback={<FormSkeleton rows={6} />}>
      <EditListingFetcher id={Number(id)} />
    </Suspense>
  );
}