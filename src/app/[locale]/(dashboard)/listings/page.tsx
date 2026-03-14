import { Suspense } from "react";
import {  ListingsPage } from "@/features/listings";
import { ListingsPageSkeleton } from "@/features/listings/ui/components";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { prefetchPriceChangeRequestDetails, serverFetchAllListing } from "@/features/listings/api";
import { DEFAULT_FILTERS } from "@/features/listings/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export async function ListingsDataFetcher({ requestId }: { requestId: number | null }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings", DEFAULT_FILTERS],
    queryFn: () => serverFetchAllListing(DEFAULT_FILTERS),
  });

  if (requestId) {
    void prefetchPriceChangeRequestDetails(queryClient, requestId);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsPage initialRequestId={requestId} />
    </HydrationBoundary>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ modal?: string; requestId?: string }>;
}) {
  const { requestId: requestIdParam } = await searchParams;
  const requestId = requestIdParam ? Number(requestIdParam) : null;

  return (
    <Suspense fallback={<ListingsPageSkeleton />}>
      <ListingsDataFetcher requestId={requestId} />
    </Suspense>
  );
}