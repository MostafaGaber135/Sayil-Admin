// features/listings/api/offers.api.ts
// Types اتنقلوا لـ types/ عشان كانوا متكررين في useOffers.ts و offers.ts
// fetchOffers كانت بتستخدم fetch() مباشر بدون auth — اتصلحت لـ api instance

import { QueryClient } from "@tanstack/react-query";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { api } from "@/shared/lib/axios/axios.instance";
import { Offer, OffersResponse } from "@/features/listings";

// ─── Query Keys ───────────────────────────────────────────────────────────────
// في مكان واحد بس — مش متكرر في useOffers.ts و offers.ts
export const offerKeys = {
  list: (landId: number, page: number, pageSize: number) =>
    ["offers", landId, page, pageSize] as const,
};

// ─── Client Fetchers (useQuery) ───────────────────────────────────────────────

export const fetchOffers = async (
  landId: number,
  pageNumber: number,
  pageSize: number
): Promise<OffersResponse> => {
  const { data } = await api.get<OffersResponse>(
    `/api/admin/land/${landId}/offers`,
    { params: { pageNumber, pageSize } }
  );
  return data;
};

// ─── Server Fetchers (prefetchQuery في Server Components) ─────────────────────

export const serverFetchOffers = async (
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
    queryFn: () => serverFetchOffers(landId, pageNumber, pageSize),
  });
};