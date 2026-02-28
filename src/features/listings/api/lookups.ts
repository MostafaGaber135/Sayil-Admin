import {AllLookupsResponse} from "@/features/listings";
import {api} from "@/shared/lib/axios/axios.instance";

export const fetchAllLookups = async (): Promise<AllLookupsResponse> => {
    const { data } = await api.get('/api/admin/lookup/all');
    console.log('🔍 raw response:', data);
    return data;
};

export const fetchRegions = async (cityId: number): Promise<AllLookupsResponse> => {
    const { data } = await api.get(`/api/admin/lookup/regions`, {
        params: { cityId }
    });
    console.log('🔍 raw response:', data);
    return data.data;
};