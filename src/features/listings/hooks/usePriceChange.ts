// features/listings/hooks/use-price-change.hooks.ts
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
    PriceChangeRequestDetails,
    fetchPriceChangeRequests,
    getPriceChangeRequestDetails,
} from "../api/price-change.api";
import { offerKeys } from "../api";

// ── Keys ───────────────────────────────────────────────────────────────────────

export const priceChangeKeys = {
    byLand: (landId: number) => ["price-requests", "land", landId] as const,
    details: (requestId: number) => ["price-requests", "details", requestId] as const,
};

// ── Client Hooks ───────────────────────────────────────────────────────────────


export const useGetPriceChangeRequests = (landId: number) => {
    return useQuery({
        queryKey: priceChangeKeys.byLand(landId),
        queryFn: () => fetchPriceChangeRequests(landId),
        enabled: !!landId,
        staleTime: 60_000, 
    });
};


export const useGetPriceChangeRequestDetails = (
    requestId: number,
    options?: { enabled?: boolean; initialData?: PriceChangeRequestDetails }
  ) => {
    return useQuery({
      queryKey: priceChangeKeys.details(requestId),
      queryFn: () => getPriceChangeRequestDetails(requestId),
      enabled: (options?.enabled ?? true) && !!requestId,
      initialData: options?.initialData ?? undefined,
      staleTime: options?.initialData ? 30_000 : 0, 
    });
  };
// ── Prefetch (Server Components only) ─────────────────────────────────────────

export const prefetchPriceChangeRequests = async (
    queryClient: QueryClient,
    landId: number
) => {
    await queryClient.prefetchQuery({
        queryKey: priceChangeKeys.byLand(landId),
        queryFn: () => fetchPriceChangeRequests(landId),
    });
};

export const prefetchPriceChangeRequestDetails = async (
    queryClient: QueryClient,
    requestId: number
) => {
    await queryClient.prefetchQuery({
        queryKey: priceChangeKeys.details(requestId),
        queryFn: () => getPriceChangeRequestDetails(requestId),
    });
};

