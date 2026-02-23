import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ApproveLandRequest, CreateListingRequest, RejectLandRequest} from "@/features/listings";
import {fetchAddLand, fetchApproveLand, fetchDeleteLand, fetchRejectLand} from "@/features/listings/api";

export const useApproveLand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(body:ApproveLandRequest)=> fetchApproveLand(body),
        onSuccess:()=> {
            queryClient.invalidateQueries({ queryKey: ['lands'] });
            console.log("تمت الموافقة بنجاح!");
        },
        onError: (error) => {
            console.error("حدث خطأ أثناء الموافقة", error);
        }
    })
}

export const useRejectLand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(body:RejectLandRequest)=> fetchRejectLand(body),
        onSuccess:()=> {
            queryClient.invalidateQueries({ queryKey: ['lands'] });
            console.log("تمت الرفض بنجاح!");
        },
        onError: (error) => {
            console.error("حدث خطأ أثناء الرفض", error);
        }
    })
}

export const useCreateListing = () => {
    return useMutation({
        mutationFn:(body:CreateListingRequest)=> fetchAddLand(body),
        onSuccess:(data:any) => {
            console.log('✅ Created listing id:', data.data);
        },
        onError: (error) => {
            console.error('❌ Error:', error);
            // 🔧 TODO: toast.error
        },
    })
}

export const useDeleteLand =  (id:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:string) => fetchDeleteLand(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['getLand']})
        }
    })
}