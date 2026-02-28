import { AllLookupsResponse } from "@/features/listings";
import { api } from "@/shared/lib/axios/axios.instance";

export const getAllLookups = async (): Promise<AllLookupsResponse> => {
    const { data } = await api.get('/api/admin/lookup/all');
    console.log('🔍 raw response:', data);
    return data;
};
