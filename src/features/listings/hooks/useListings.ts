import {keepPreviousData, useMutation, useQuery} from "@tanstack/react-query";
import {ListingsRequest} from "@/features/listings";
import {fetchAllListing, fetchGetLand} from "@/features/listings/api";

export const useListings = (filters: ListingsRequest) => {
    return useQuery({
        queryKey: ["listings", filters],
        queryFn: () => fetchAllListing(filters),
        placeholderData: keepPreviousData,
        staleTime: 60_000,
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
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}
