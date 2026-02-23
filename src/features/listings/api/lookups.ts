import {AllLookupsResponse} from "@/features/listings";
import {apiClient} from "@/lib/axiosInstance";

export const fetchAllLookups = async (): Promise<AllLookupsResponse> => {
    const { data } = await apiClient.get('/api/admin/lookup/all');
    console.log('🔍 raw response:', data);
    return data;
};

export const fetchRegions = async (cityId: number): Promise<AllLookupsResponse> => {
    const { data } = await apiClient.get(`/api/admin/lookup/regions`, {
        params: { cityId }
    });
    console.log('🔍 raw response:', data);
    return data.data;
};