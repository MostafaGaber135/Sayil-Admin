// features/listings/api/price-change.api.ts
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { api } from "@/shared/lib/axios/axios.instance";
import { PriceChangeRequest, PriceChangeRequestDetails, PriceChangeResponse } from "..";

// ── Client Fetchers (used in hooks) ───────────────────────────────────────────

export const fetchPriceChangeRequests = async (
    landId: number
): Promise<PriceChangeResponse[]> => {
    const { data } = await api.get(
        `/api/admin/land/listings/${landId}/price-change-requests`
    );
    return data?.data?.value ?? data;
};

export const getPriceChangeRequestDetails = async (
    requestId: number
): Promise<PriceChangeRequestDetails> => {
    const { data } = await api.get(
        `/api/admin/land/listings/${requestId}/price-change-request-details`
    );
    return data?.data ?? data;
};

// ── Server Fetchers (used in prefetch only) ────────────────────────────────────

export const serverFetchPriceChangeRequests = async (
    landId: number
): Promise<PriceChangeResponse[]> => {
    const { data } = await serverApi.get(
        `/api/admin/land/listings/${landId}/price-change-requests`
    );
    return data?.data?.value ?? data;
};

export const serverGetPriceChangeRequestDetails = async (
    requestId: number
): Promise<PriceChangeRequestDetails> => {
    const { data } = await serverApi.get(
        `/api/admin/land/listings/${requestId}/price-change-request-details`
    );
    return data?.data ?? data;
};




export const fetchCreatePriceChangeRequest = async (
    body: PriceChangeRequest
): Promise<{ success: boolean }> => {
    const { data } = await serverApi.post("/api/admin/land/price-change-request", body);
    return data;
};