// features/listings/api/listings.ts
import { ListingsRequest, ListingsResponse } from "@/features/listings";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { api } from "@/shared/lib/axios/axios.instance";

// ── Client ─────────────────────────────────────────────────────────────────────

export const fetchAllListing = async (body: ListingsRequest): Promise<ListingsResponse> => {
    const cleanBody = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
    const { data } = await api.post('/api/admin/land/listings', cleanBody);
    return data;
};

export const fetchGetLand = async (id: number) => {
    const { data } = await api.get(`/api/admin/land/${id}`);
    return data;
};

// ── Server ─────────────────────────────────────────────────────────────────────

export const serverFetchAllListing = async (body: ListingsRequest): Promise<ListingsResponse> => {
    const cleanBody = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
    const { data } = await serverApi.post('/api/admin/land/listings', cleanBody);
    return data;
};

export const serverFetchGetLand = async (id: number) => {
    const { data } = await serverApi.get(`/api/admin/land/${id}`);
    return data;
};
