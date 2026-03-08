
import {ListingsPage} from "@/features/listings";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getQueryClient} from "@/shared/lib/react-query/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import axios from "axios";
import { DEFAULT_FILTERS } from "@/features/listings/constants";
import { priceChangeKeys } from "@/features/listings/hooks/usePriceChange";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ modal?: string; requestId?: string }>
}) {
  
  const { modal, requestId: requestIdParam } = await searchParams;

  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const queryClient = getQueryClient();

  const serverApi = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  await queryClient.prefetchQuery({
    queryKey: ['listings', DEFAULT_FILTERS],
    queryFn: async () => {
      const { data } = await serverApi.post('/api/admin/land/listings', DEFAULT_FILTERS);
      return data;
    },
  });

  const listingsData = queryClient.getQueryData<any>(['listings', DEFAULT_FILTERS]);
  const listings = listingsData?.data?.items ?? [];


await Promise.all(
  listings.map((listing: any) =>
    queryClient.prefetchQuery({
      queryKey: priceChangeKeys.byLand(listing.id),
      queryFn: async () => {
        const { data } = await serverApi.get(
          `/api/admin/land/listings/${listing.id}/price-change-requests`
        );
        return data?.data ?? data;
      },
      staleTime: 60_000,
    })
  )
);


  const requestId = requestIdParam ? Number(requestIdParam) : null;
  const priceRequestData = requestId
    ? await serverApi
        .get(`/api/admin/land/listings/${requestId}/price-change-request-details`)
        .then((r) => r.data?.data ?? null)
        .catch(() => null)
    : null;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsPage
        initialRequestId={requestId}
        priceRequestData={priceRequestData}
      />
    </HydrationBoundary>
  );
}
