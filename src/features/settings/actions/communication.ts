"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import { updateCommunicationSettings } from "../services/settings.services";
import { getTranslations } from "next-intl/server";

export async function updateCommunicationSettingsAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");
  try {
    const session = await getServerSession(authOptions);

    const payload = {
      whatsAppNumber: String(formData.get("whatsAppNumber")),
      contactUsEmail: String(formData.get("contactUsEmail")),
      supportEmail: String(formData.get("supportEmail")),
      businessHours: String(formData.get("businessHours")),
      timeZone: String(formData.get("timeZone")),
    };

    await updateCommunicationSettings(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Communication settings updated successfully"),
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        t("Failed to update communication settings"),
    };
  }
}
