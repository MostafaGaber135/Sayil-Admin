import { useQuery } from '@tanstack/react-query';
import {fetchRegions} from "@/features/listings/api";
import {getListingLookupsService} from "@/features/listings/services";
import { useLandClassifications } from '@/features/settings/hooks/settings.hooks';

export const useRegion = (cityId: number) => {
  return useQuery({
    queryKey: ['listings-regions', cityId],
    queryFn: () => fetchRegions(cityId),
    enabled: cityId > 0,
    staleTime: 1000 * 60 * 60,
  });
};

export const useLookups = () => {
  const lookupsQuery = useQuery({
    queryKey: ['listings-lookups'],
    queryFn: () => getListingLookupsService(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: classifications } = useLandClassifications();
  return {
    ...lookupsQuery,
    data: lookupsQuery.data ? {
      ...lookupsQuery.data,
      classifications: classifications ?? [],
    } : undefined,
  };
};
