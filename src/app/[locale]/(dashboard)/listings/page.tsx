
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { DEFAULT_FILTERS } from "@/features/listings/constants";

import { fetchAllListing, serverFetchAllListing } from "@/features/listings/api";
import { prefetchPriceChangeRequestDetails, prefetchPriceChangeRequests } from "@/features/listings/hooks/usePriceChange";
import { ListingsPage } from "@/features/listings";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ modal?: string; requestId?: string }>
}) {
  const { requestId: requestIdParam } = await searchParams;
  const requestId = requestIdParam ? Number(requestIdParam) : null;

  const queryClient = getQueryClient();

  const listingsData = await serverFetchAllListing(DEFAULT_FILTERS);
  queryClient.setQueryData(['listings', DEFAULT_FILTERS], listingsData);
  const listings = listingsData?.data?.items ?? [];

  await Promise.all(
    listings.map((listing: any) =>
      prefetchPriceChangeRequests(queryClient, listing.id)
    )
  );

  // 3. Prefetch price request details if requestId exists
  if (requestId) {
    await prefetchPriceChangeRequestDetails(queryClient, requestId);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsPage initialRequestId={requestId} />
    </HydrationBoundary>
  );
}