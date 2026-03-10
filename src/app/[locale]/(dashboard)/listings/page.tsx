import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { DEFAULT_FILTERS } from "@/features/listings/constants";
import { serverFetchAllListing } from "@/features/listings/api";
import { prefetchPriceChangeRequestDetails } from "@/features/listings/hooks/usePriceChange";
import { ListingsPage } from "@/features/listings";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ modal?: string; requestId?: string }>;
}) {
  const { requestId: requestIdParam } = await searchParams;
  const requestId = requestIdParam ? Number(requestIdParam) : null;

  const queryClient = getQueryClient();

  // 1. Fetch listings — single API call
  const listingsData = await serverFetchAllListing(DEFAULT_FILTERS);
  queryClient.setQueryData(["listings", DEFAULT_FILTERS], listingsData);

  // 2. Only prefetch price request details if the modal is already open (URL has requestId)
  //    Don't prefetch ALL listings' price requests upfront — that's N+1 calls
  if (requestId) {
    await prefetchPriceChangeRequestDetails(queryClient, requestId);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsPage initialRequestId={requestId} />
    </HydrationBoundary>
  );
}