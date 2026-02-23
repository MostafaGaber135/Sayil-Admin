import {useMutation, useQuery} from "@tanstack/react-query";
import {ListingsRequest} from "@/features/listings";
import {fetchAllListing, fetchGetLand} from "@/features/listings/api";


export const useListingsMutation = () => {
    return useMutation({
        mutationFn: (body: ListingsRequest) => fetchAllListing(body),

        onSuccess: (data) => {
            console.log("Data fetched successfully using Mutation", data);
        },

        onError: (error) => {
            console.error("Mutation failed", error);
        }
    });
};


export const useListingById =  (id:number) => {
    return useQuery({
        queryKey: ['getLand'],
        queryFn: () => fetchGetLand(id),
        enabled: !!id,
    })
}