// ──────────────────────────────────────────────────────────────────────────────
// offers.queries.ts  –  query keys + client hooks
// ──────────────────────────────────────────────────────────────────────────────
import { useQuery } from "@tanstack/react-query";

// ── Types ──────────────────────────────────────────────────────────────────────

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

export interface PriceChangeRequest {
  id: number;
  landId: number;
  landTitle: string;
  city: string;
  region: string;
  area: number;
  classification: string;
  currentPrice: number;
  suggestedPrice: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
  requestedAt: string;
}

// ── Query Keys ─────────────────────────────────────────────────────────────────

export const offerKeys = {
  list: (landId: number, page: number, pageSize: number) =>
    ["offers", landId, page, pageSize] as const,
  priceChangeRequestDetails: (requestId: number) =>
    ["priceChangeRequestDetails", requestId] as const,
};

// ── Fetchers ───────────────────────────────────────────────────────────────────

export const fetchOffers = async (
  landId: number,
  pageNumber: number,
  pageSize: number
): Promise<OffersResponse> => {
  const res = await fetch(
    `/api/admin/land/${landId}/offers?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
};

export const fetchPriceChangeRequestDetails = async (
  requestId: number
): Promise<PriceChangeRequest> => {
  const res = await fetch(
    `/api/admin/land/listings/${requestId}/price-change-request-details`
  );
  if (!res.ok) throw new Error("Failed to fetch request details");
  return res.json();
};

// ── Client Hooks ───────────────────────────────────────────────────────────────

export const useOffers = (
  landId: number,
  pageNumber: number,
  pageSize = 20,
  enabled = true
) =>
  useQuery({
    queryKey: offerKeys.list(landId, pageNumber, pageSize),
    queryFn: () => fetchOffers(landId, pageNumber, pageSize),
    enabled: enabled && !!landId,
  });

export const usePriceChangeRequestDetails = (
  requestId: number,
  enabled = true
) =>
  useQuery({
    queryKey: offerKeys.priceChangeRequestDetails(requestId),
    queryFn: () => fetchPriceChangeRequestDetails(requestId),
    enabled: enabled && !!requestId,
  });
