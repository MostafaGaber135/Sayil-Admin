
import { RawLookupItem, LookupItem, LookupsShape } from "@/features/listings";
import {fetchAllLookups} from "@/features/listings/api";

export const getListingLookupsService = async (): Promise<LookupsShape<LookupItem>> => {
  const response = await fetchAllLookups(); // AllLookupsResponse
  const rawData = response.data;            // ✅ ده الـ LookupsShape

  const transform = (items: RawLookupItem[]): LookupItem[] =>
      (items || []).map(item => ({
        value: item.value,
        label: item.label || item.labelAr || item.labelEn || item.nameAr || "غير محدد"
      }));

  return {
    landTypes:       transform(rawData.landTypes),
    cities:          transform(rawData.cities),
    landStatus:      transform(rawData.landStatus),
    ownershipStatus: transform(rawData.ownershipStatus),
    deedTypes:       transform(rawData.deedTypes),
    regions:         transform(rawData.regions),
    landFacing:      transform(rawData.landFacing),
    neighborTypes:   transform(rawData.neighborTypes),
    genders:         transform(rawData.genders),
    classifications: transform(rawData.classifications ?? []),
  };
};