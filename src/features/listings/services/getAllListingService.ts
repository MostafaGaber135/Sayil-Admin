import { ListingItem } from '..';
import { fetchAllListing } from '../api';

export const getAllListingService = async (body:ListingItem) => {
  const response = await fetchAllListing(body);

  const data = response;

  const transform = (items: any[]) =>
    (items || []).map(item => {
      return {
        value: item.value,
        label: item.label || item.labelEn || item.labelAr || item.name || item.nameAr || "N/A"
      };
    });

  return {

  };
};