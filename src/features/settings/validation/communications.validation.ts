import { z } from "zod";

export const communicationSchema = (t: any) =>
  z.object({
    /* ===== Saudi WhatsApp Number ===== */
    whatsAppNumber: z
      .string()
      .regex(
        /^(?:\+966|966|0)?5\d{8}$/,
        t("Enter a valid Saudi WhatsApp number")
      ),

    /* ===== Emails ===== */
    contactUsEmail: z
      .string()
      .email(t("Invalid email")),

    supportEmail: z
      .string()
      .email(t("Invalid email")),

    /* ===== Numbers Only ===== */
    businessHours: z
      .string()
      .regex(/^\d+$/, t("Business hours must be numbers only")),

    timeZone: z
      .string()
  });

