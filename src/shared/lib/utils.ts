import { ListingFormValues } from "@/features/listings/validation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

export const mapListingToForm = (data: any): ListingFormValues => ({
    title: data.title,
    description: data.description ?? "",
    area: data.area,
    price: data.price,
    discountedPrice: data.discountedPrice ?? null,
    discountPercent: data.discountPercent ?? null,

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

    userId: data.userId ?? data.ownerId,   // ← أضفناها + fallback لو الـ API بيبعتها بـ ownerId
    agentId: data.agentId,
    buyerId: data.buyerId ?? null,
    purchasedPrice: data.purchasedPrice ?? null,
});