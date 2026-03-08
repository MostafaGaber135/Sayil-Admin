import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ApproveLandRequest, RejectLandRequest} from "@/features/listings";
import {
    fetchAddLand,
    fetchAllListing,
    fetchApproveLand,
    fetchDeleteLand,
    fetchRejectLand,
} from "@/features/listings/api";
import {CreateListingRequest, ListingFormValues} from "@/features/listings/validation";
// import { useActionState, useTransition } from "react";
// import { fetchAddLandAction } from "@/server-actions/listings/create-land.action";

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
            console.error(' Error:', error);
        },
    })
    // server action
    // const [isPending, startTransition] = useTransition()
    // const [state, addListingAction] = useActionState(fetchAddLandAction, undefined);
    //
    // const handleAddListings = (formData: FormData) => {
    //     startTransition(() => {
    //         addListingAction(formData)
    //     })
    // }
    //
    // return { handleAddListings, isPending, state }
}

// export const useUpdateListing = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id, data }: { id: number; data: ListingFormValues }) => 
//             fetchUpdate({ ...data, id } as CreateListingRequest),
//         onSuccess: async (data: any) => {
//             if (data?.data?.id) {
//                 await queryClient.invalidateQueries({
//                     queryKey: ["getLand", data?.data?.id],
//                 });
//             }
//             await queryClient.invalidateQueries({ queryKey: ["listings"] }); 
//             console.log('✅ update listing success:', data.data);
//         },
//         onError: (error) => {
//             console.error('❌ Update Error:', error);
//         },
//     });
// };


export const useDeleteLand =  (id:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:string) => fetchDeleteLand(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['getLand']})
        }
    })
}