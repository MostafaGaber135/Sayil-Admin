import {ApproveLandRequest, ListingsResponse, RejectLandRequest} from "@/features/listings";
import {api} from "@/shared/lib/axios/axios.instance";
import {CreateListingRequest} from "@/features/listings/validation";


export  const fetchApproveLand = async (body:ApproveLandRequest) => {
    const { data } = await api.post('/api/admin/land/approve', body);
    return data;
}

export  const fetchRejectLand = async (body:RejectLandRequest) => {
    const { data } = await api.post('/api/admin/land/reject', body);
    return data;
}


export const fetchAddLand = async (body: CreateListingRequest): Promise<ListingsResponse> => {
    try{
    const { data } = await api.post('/api/admin/land/add', body);
    return data;
    }catch (error: any) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND ERROR:", error.response?.data);
        throw error;
    }
};

export const fetchDeleteLand = async (id:string) => {
    const {data} = await api.delete(`/api/admin/land/${id}`);
    return data;
}


export const fetchUpdate = async (body: CreateListingRequest): Promise<ListingsResponse> => {
    try{
        const { data } = await api.post('/api/admin/land/update', body);
        return data;
    }catch (error: any) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND ERROR:", error.response?.data);
        throw error;
    }
};


