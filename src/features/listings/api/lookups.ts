import {AllLookupsResponse, LookupItem, regions} from "@/features/listings";
import {api} from "@/shared/lib/axios/axios.instance";

export const fetchAllLookups = async (): Promise<AllLookupsResponse> => {
    const { data } = await api.get('/api/admin/lookup/all');
    return data;
};

export const fetchRegions = async (cityId: number): Promise<LookupItem[]> => {
    const { data } = await api.get(`/api/admin/lookup/regions`, {
        params: { cityId }
    });
    return data.data;
};
