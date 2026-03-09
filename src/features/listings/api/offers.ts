// ──────────────────────────────────────────────────────────────────────────────
// offers.server-queries.ts  –  server-side fetchers (use inside Server Components)
// ──────────────────────────────────────────────────────────────────────────────

import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { QueryClient } from "@tanstack/react-query";
export interface Offer {
    id: number;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    message: string;
    offerAmount: number;
    submittedAt: string;
  }
  
  export interface OffersResponse {
    items: Offer[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  

  
// ── Server Fetchers ────────────────────────────────────────────────────────────
export const offerKeys = {
    list: (landId: number, page: number, pageSize: number) =>
      ["offers", landId, page, pageSize] as const,
    priceChangeRequestDetails: (requestId: number) =>
      ["priceChangeRequestDetails", requestId] as const,
  };

  

export const getOffers = async (
  landId: number,
  pageNumber = 1,
  pageSize = 20
): Promise<OffersResponse> => {
  const { data } = await serverApi.get<OffersResponse>(
    `/api/admin/land/${landId}/offers`,
    { params: { pageNumber, pageSize } }
  );
  return data;
};


export const prefetchOffers = async (
  queryClient: QueryClient,
  landId: number,
  pageNumber = 1,
  pageSize = 20
) => {
  await queryClient.prefetchQuery({
    queryKey: offerKeys.list(landId, pageNumber, pageSize),
    queryFn: () => getOffers(landId, pageNumber, pageSize),
  });
};
