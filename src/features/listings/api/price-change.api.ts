// features/listings/api/price-change.api.ts
// ⚠️ fetchCreatePriceChangeRequest اتشالت من هنا
// ليه؟ كانت بتعمل نفس حاجة priceChangeRequestAction — endpoint واحد في مكانين
// الـ mutation دلوقتي في price-change.actions.ts بس

import { QueryClient } from "@tanstack/react-query";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { api } from "@/shared/lib/axios/axios.instance";
import { PriceChangeResponse, PriceChangeRequestDetails, PriceChangeRequest } from "@/features/listings";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const priceChangeKeys = {
  byLand: (landId: number) => ["price-requests", "land", landId] as const,
  details: (requestId: number) => ["price-requests", "details", requestId] as const,
};

// ─── Client Fetchers (useQuery) ───────────────────────────────────────────────

export const fetchPriceChangeRequests = async (
    landId: number
  ): Promise<PriceChangeRequest[]> => {
    const { data } = await api.get(
      `/api/admin/land/listings/${landId}/price-change-requests`
    );
    return data?.data?.value ?? [];
  };

export const fetchPriceChangeRequestDetails = async (
  requestId: number
): Promise<PriceChangeRequestDetails> => {
  const { data } = await api.get(
    `/api/admin/land/listings/${requestId}/price-change-request-details`
  );
  return data?.data ?? data;
};

// ─── Server Fetchers (prefetchQuery في Server Components) ─────────────────────

export const serverFetchPriceChangeRequests = async (
  landId: number
): Promise<PriceChangeResponse[]> => {
  const { data } = await serverApi.get(
    `/api/admin/land/listings/${landId}/price-change-requests`
  );
  return data?.data?.value ?? data;
};

export const serverFetchPriceChangeRequestDetails = async (
  requestId: number
): Promise<PriceChangeRequestDetails> => {
  const { data } = await serverApi.get(
    `/api/admin/land/listings/${requestId}/price-change-request-details`
  );
  return data?.data ?? data;
};

// ─── Prefetch ─────────────────────────────────────────────────────────────────

export const prefetchPriceChangeRequests = async (
  queryClient: QueryClient,
  landId: number
) => {
  await queryClient.prefetchQuery({
    queryKey: priceChangeKeys.byLand(landId),
    queryFn: () => serverFetchPriceChangeRequests(landId),
  });
};

export const prefetchPriceChangeRequestDetails = async (
  queryClient: QueryClient,
  requestId: number
) => {
  await queryClient.prefetchQuery({
    queryKey: priceChangeKeys.details(requestId),
    queryFn: () => serverFetchPriceChangeRequestDetails(requestId),
  });
};