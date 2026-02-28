import {keepPreviousData, useMutation, useQuery} from "@tanstack/react-query";
import {ListingsRequest} from "@/features/listings";
import {fetchAllListing, fetchGetLand} from "@/features/listings/api";


// export const useListingsMutation = () => {
//     return useMutation({
//         mutationFn: (body: ListingsRequest) => fetchAllListing(body),
//         onSuccess: (data) => {
//             console.log("Data fetched successfully using Mutation", data);
//         },
//         onError: (error) => {
//             console.error("Mutation failed", error);
//         }
//     });
// };
export const useListings = (filters: ListingsRequest) => {
    return useQuery({
        queryKey: ["listings", filters],
        queryFn: () => fetchAllListing(filters),
        placeholderData: keepPreviousData,
    });
};

export const useListingById =  (id:number) => {
    return useQuery({
        queryKey: ['getLand', id],
        queryFn: async () => {
            const res = await fetchGetLand(id);
            if (!res) throw new Error("Land not found or server error");
            return res;
        },
        enabled: !!id,
    })
}