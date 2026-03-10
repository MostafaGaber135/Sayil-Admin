import { ListingsResponse} from "@/features/listings";
import {api} from "@/shared/lib/axios/axios.instance";
import {CreateListingRequest} from "@/features/listings/validation";


export const fetchAddLand = async (body: CreateListingRequest): Promise<ListingsResponse> => {
    try{
    const { data } = await api.post('/api/admin/land/add', body);
    return data;
    }catch (error: any) {
        throw error;
    }
};

