"use server";

import { serverApi } from "@/shared/lib/auth/server-sesstion-token";



// export async function priceChangeRequestAction(data: {
//     landId: number;
//     suggestedPrice: number;
//     reason: string;
// }) {
//     const api = await getServerApi();
//     const response = await api.post("/api/admin/land/price-change-request", data);
//     return response.data;
// }
export async function GetAllPriceChangeRequestAction(landId: number) {

    const response = await serverApi.get(`/api/admin/land/listings/${landId}/price-change-requests`);
    return response.data;
}

export async function classificationChangeAction(data: {
    landId: number;
    classificationId: number;
}) {
    const response = await serverApi.post("/api/admin/land/classification", data);
    return response.data;
}