
import { RawLookupItem, LookupItem, LookupsShape, ListingLookupsResponse } from "@/features/listings";
import {fetchAllLookups} from "@/features/listings/api";

export const getListingLookupsService = async (): Promise<ListingLookupsResponse> => {
  const response = await fetchAllLookups();
  const rawData = response.data;

  const transform = (items: RawLookupItem[]): LookupItem[] =>
      (items || []).map(item => ({
          value: item.value,
          label: item.label || item.labelAr || item.labelEn || item.nameAr || "غير محدد"
      }));

  return {
      ...response, // ← statusCode, succeeded, message, errors
      data: {
          landTypes:       transform(rawData.landTypes),
          cities:          transform(rawData.cities),
          landStatus:      transform(rawData.landStatus),
          ownershipStatus: transform(rawData.ownershipStatus),
          deedTypes:       transform(rawData.deedTypes),
          regions:         transform(rawData.regions),
          landFacing:      transform(rawData.landFacing),
          neighborTypes:   transform(rawData.neighborTypes),
          genders:         transform(rawData.genders),
          classifications: (rawData.classifications ?? []).map(item => ({
            id: item.id,
            name: item.name,
            code: item.code
          }))
      }
  };
};
