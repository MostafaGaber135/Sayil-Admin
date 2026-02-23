import {ListingFormValues} from "@/features/listings";

export { cn } from "@/shared/lib/utils";

// features/listings/utils/mapListingToForm.ts


export const mapListingToForm = (data: any): ListingFormValues => ({
    title: data.title,
    description: data.description ?? "",
    area: data.area,
    price: data.price,
    discountedPrice: data.discountedPrice,
    discountPercent: data.discountPercent,

    cityId: data.cityId,
    regionId: data.regionId,
    address: data.address ?? "",
    googleMapsLink: data.googleMapsLink ?? "",

    landTypeId: data.landTypeId,
    landFacingId: data.landFacingId,
    ownershipStatusId: data.ownershipStatusId,
    deedTypeId: data.deedTypeId,
    neighborTypeId: data.neighborTypeId,
    classificationId: data.classificationId,
    statusId: data.statusId,

    features: data.features ?? [],
    imageUrls: data.imageUrls ?? [],
    explanatoryVideoUrl: data.explanatoryVideoUrl ?? "",
    titleDeedUrl: data.titleDeedUrl ?? "",
    nationalIdCopyUrl: data.nationalIdCopyUrl ?? "",
    landSurveyReportUrl: data.landSurveyReportUrl ?? "",

    agentId: data.agentId,
    buyerId: data.buyerId ?? null,
    purchasedPrice: data.purchasedPrice ?? null,
});