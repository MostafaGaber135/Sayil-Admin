import {ListingsResponse} from "@/features/listings";
import {apiClient} from "@/lib/axiosInstance";

export const fetchAllListing = async (body: any): Promise<ListingsResponse> => {
    const { data } = await apiClient.post('/api/admin/land/listings', body);
    return data;
};

export const fetchGetLand =async (id: number) => {
    try {
        const {data} = await apiClient.get(`/api/admin/land/${id}`);
        return data;
    }catch(error) {
        console.log("error From fetchGetLand",error);
    }

}