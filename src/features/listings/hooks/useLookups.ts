import { useQuery } from '@tanstack/react-query';
import {fetchRegions} from "@/features/listings/api";
import {getListingLookupsService} from "@/features/listings/services";

export const useLookups = () => {
  return useQuery({
    queryKey: ['listings-lookups'],
    queryFn: () => getListingLookupsService(),
    staleTime: 1000 * 60 * 60,
  });
};

export const useRegion = (cityId: number) => {
  return useQuery({
    queryKey: ['listings-regions', cityId],
    queryFn: () => fetchRegions(cityId),
    enabled: cityId > 0,
    staleTime: 1000 * 60 * 60,
  });
};