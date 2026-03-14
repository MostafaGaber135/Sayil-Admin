import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { prefetchPriceChangeRequestDetails, serverFetchAllListing } from "../api";
import { DEFAULT_FILTERS } from "../constants";
import { ListingsPage } from ".";

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