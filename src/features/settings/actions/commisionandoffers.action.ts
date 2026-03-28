"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import {
  updateGlobalCommissionRate,
  updateMaxOfferPercent,
  updateMinOfferPercent,
} from "../services/settings.services";
import { getTranslations } from "next-intl/server";

//Put
export async function updateGlobalCommissionAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");
  try {
    const session = await getServerSession(authOptions);

    const payload = {
      globalCommissionRate: Number(formData.get("globalCommissionRate")),
    };

    await updateGlobalCommissionRate(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Commission updated successfully"),
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message:
        error?.response?.data?.message || t("Failed to update commission"),
    };
  }
}

//Put
export async function updateMinOfferAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");

  try {
    const session = await getServerSession(authOptions);

    const payload = {
      minOfferPercent: Number(formData.get("minOfferPercent")),
    };

    await updateMinOfferPercent(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Minimum offer updated successfully"),
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message:
        error?.response?.data?.message || t("Failed to update minimum offer"),
    };
  }
}

//put

export async function updateMaxOfferAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");

  try {
    const session = await getServerSession(authOptions);

    const payload = {
      maxOfferPercent: Number(formData.get("maxOfferPercent")),
    };

    await updateMaxOfferPercent(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Maximum offer updated successfully"),
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message:
        error?.response?.data?.message || t("Failed to update maximum offer"),
    };
  }
}
