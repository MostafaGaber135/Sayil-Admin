import { z } from "zod";

export const communicationSchema = (t: any) =>
  z.object({
    whatsAppNumber: z.string().min(11, t("WhatsApp required")),
    contactUsEmail: z.string().email(t("Invalid email")),
    supportEmail: z.string().email(t("Email required")),
    businessHours: z.string().min(2, t("Business required")),
    timeZone: z.string().min(1, "Time zone required"),
  });

