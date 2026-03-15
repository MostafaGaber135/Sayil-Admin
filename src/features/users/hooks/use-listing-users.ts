// features/listings/hooks/use-listing-users.ts
import { useQuery } from "@tanstack/react-query";
import { getUsersPaginated } from "@/features/users/actions";
import { UserType } from "@/features/users/types";

export const useListingOwners = () =>
    useQuery({
      queryKey: ["users", UserType.External], 
      queryFn: () => getUsersPaginated({ userType: UserType.External, pageSize: 100 }),
      staleTime: 1000 * 60 * 5,
    });
  
  export const useListingAgents = () =>
    useQuery({
      queryKey: ["users", UserType.Internal], 
      queryFn: () => getUsersPaginated({ userType: UserType.Internal, pageSize: 100 }),
      staleTime: 1000 * 60 * 5,
    });