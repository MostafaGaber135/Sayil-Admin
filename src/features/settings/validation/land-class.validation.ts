import { z } from "zod";

export const classificationFormSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().regex(/^[A-Z]$/, t("Code")),

    nameEn: z
      .string()
      .min(3, t("English name must be at least 3 letters"))
      .max(8, t("English name must be at most 8 letters"))
      .regex(
        /^[A-Za-z\s]+$/,
        t("English name must contain only English letters")
      ),

    nameAr: z
      .string()
      .min(3, t("Arabic name must be at least 3 letters"))
      .max(8, t("Arabic name must be at most 8 letters"))
      .regex(
        /^[\u0600-\u06FF\s]+$/,
        t("Arabic name must contain only Arabic letters")
      ),

    discountPercent: z.coerce
      .number()
      .min(1, t("Discount must be between 1 and 100"))
      .max(100, t("Discount must be between 1 and 100")),
  });