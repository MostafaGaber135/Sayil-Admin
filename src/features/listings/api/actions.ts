import {ApproveLandRequest, CreateListingRequest, ListingsResponse, RejectLandRequest} from "@/features/listings";
import {apiClient} from "@/lib/axiosInstance";

export  const fetchApproveLand = async (body:ApproveLandRequest) => {
    const { data } = await apiClient.post('/api/admin/land/approve', body);
    return data;
}

export  const fetchRejectLand = async (body:RejectLandRequest) => {
    const { data } = await apiClient.post('/api/admin/land/reject', body);
    return data;
}


export const fetchAddLand = async (body: CreateListingRequest): Promise<ListingsResponse> => {
    try{
    const { data } = await apiClient.post('/api/admin/land/add', body);
    return data;
    }catch (error: any) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND ERROR:", error.response?.data);
        throw error;
    }
};

export const fetchDeleteLand = async (id:string) => {
    const {data} = await apiClient.delete(`/api/admin/land/${id}`);
    return data;
}

