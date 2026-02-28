import {ListingsResponse} from "@/features/listings";
import {api} from "@/shared/lib/axios/axios.instance";

export const fetchAllListing = async (body: any): Promise<ListingsResponse> => {
    const cleanBody = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
    const { data } = await api.post('/api/admin/land/listings', cleanBody);
    return data;
};

export const fetchGetLand =async (id: number) => {
    try {
        const {data} = await api.get(`/api/admin/land/${id}`);
        return data;
    }catch(error) {
        console.log("error From fetchGetLand",error);
    }

}