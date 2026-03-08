// features/listings/api/price-change.api.ts
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { PriceChangeRequestBody } from "..";
import { api } from "@/shared/lib/axios/axios.instance";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface PriceChangeRequest {
    requestId: number;
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

export interface PriceChangeRequestDetails {
    id: number;
    landId: number;
    landTitle: string;
    city: string;
    area: number;
    propertyType: string;
    requestedOn: string;
    requestStatus: "Pending" | "Approved" | "Rejected" | "Cancelled";
    requestedByName: string;
    currentPrice: number;
    suggestedPrice: number;
    reductionValue: number;
    reductionPercentage: number;
    reason: string;
    canCancel: boolean;
}

// ── Fetchers ───────────────────────────────────────────────────────────────────

export const fetchCreatePriceChangeRequest = async (
    body: PriceChangeRequestBody
): Promise<{ success: boolean }> => {
    const { data } = await serverApi.post("/api/admin/land/price-change-request", body);
    return data;
};

export const fetchPriceChangeRequests = async (
    landId: number
): Promise<PriceChangeRequest[]> => {
    const { data } = await api.get(
        `/api/admin/land/listings/${landId}/price-change-requests`
    );

    return data?.data ?? data;
};

export const getPriceChangeRequestDetails = async (
    requestId: number
): Promise<PriceChangeRequestDetails> => {
    const { data } = await api.get(
        `/api/admin/land/listings/${requestId}/price-change-request-details`
    );
    return data?.data ?? data;
};