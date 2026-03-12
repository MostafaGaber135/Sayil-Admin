import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { DEFAULT_FILTERS } from "@/features/listings/constants";
import { prefetchPriceChangeRequestDetails, serverFetchAllListing } from "@/features/listings/api";

import { ListingsPage } from "@/features/listings";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ modal?: string; requestId?: string }>;
}) {
  const { requestId: requestIdParam } = await searchParams;
  const requestId = requestIdParam ? Number(requestIdParam) : null;
  const queryClient = getQueryClient();
  //* (void) for ux 
  // void Promise.all([
  //   queryClient.prefetchQuery({
  //     queryKey: ["listings", DEFAULT_FILTERS],
  //     queryFn: () => serverFetchAllListing(DEFAULT_FILTERS),
  //   }),
  //   requestId
  //     ? prefetchPriceChangeRequestDetails(queryClient, requestId)
  //     : Promise.resolve(),
  // ]);


  //* (await) for SEO
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["listings", DEFAULT_FILTERS],
      queryFn: () => serverFetchAllListing(DEFAULT_FILTERS),
    }),
    requestId
      ? prefetchPriceChangeRequestDetails(queryClient, requestId)
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsPage initialRequestId={requestId} />
    </HydrationBoundary>
  );
}