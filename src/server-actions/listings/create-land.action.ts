'use server'

import { ListingsResponse } from "@/features/listings";
import { CreateListingRequest } from "@/features/listings/validation";
import { api } from "@/shared/lib/axios/axios.instance";


export const fetchAddLandAction = async (body: CreateListingRequest): Promise<ListingsResponse> => {
    try{
    const { data } = await api.post('/api/admin/land/add', body);
    return data;
    }catch (error: any) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND ERROR:", error.response?.data);
        throw error;
    }
};