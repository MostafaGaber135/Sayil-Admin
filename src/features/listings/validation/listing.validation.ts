import { z } from "zod";

export const listingSchema = z.object({
    title: z.string().min(1, "الرجاء إدخال العنوان"),

    description: z.string().optional().default(""),

    area: z.coerce.number().min(1, "الرجاء إدخال المساحة"),

    price: z.coerce.number().min(1, "الرجاء إدخال السعر"),

    discountedPrice: z.coerce.number().nullable().optional(),

    discountPercent: z.coerce.number().nullable().optional(),

    cityId: z.coerce.number().min(1, "الرجاء اختيار المدينة"),

    regionId: z.coerce.number().min(1, "الرجاء اختيار الحي"),

    address: z.string().optional().default(""),

    googleMapsLink: z
        .string()
        .url("رابط غير صحيح")
        .optional()
        .or(z.literal("")),

    landFacingId: z.coerce.number().optional().default(0),

    ownershipStatusId: z.coerce.number().optional().default(0),

    deedTypeId: z.coerce.number().optional().default(0),

    neighborTypeId: z.coerce.number().optional().default(0),

    classificationId: z.coerce.number().default(1),

    features: z.array(z.string()).default([]),

    landTypeId: z.coerce.number().optional().default(0),

    imageUrls: z
        .array(z.string())
        .min(1, "يجب رفع صورة واحدة على الأقل"),

    explanatoryVideoUrl: z.string().optional().default(""),

    titleDeedUrl: z.string().optional().default(""),

    nationalIdCopyUrl: z.string().optional().default(""),

    landSurveyReportUrl: z.string().optional().default(""),

    userId: z.coerce.number().min(1, "الرجاء اختيار المالك"),

    agentId: z.coerce.number().min(1, "الرجاء اختيار الوكيل"),

    statusId: z.coerce.number().min(1, "الرجاء اختيار الحالة"),

    buyerId: z.coerce.number().nullable().optional(),

    purchasedPrice: z.coerce.number().nullable().optional(),
});

export type CreateListingRequest = z.infer<typeof listingSchema>;
export type ListingFormValues = z.infer<typeof listingSchema>;
