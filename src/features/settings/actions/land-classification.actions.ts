"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import {
  createLandClassification,
  deleteLandClassification,
  updateLandClassification,
} from "../services/settings.services";
import { getTranslations } from "next-intl/server";


//Post

export async function createLandClassificationAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");
  try {
     
    const session = await getServerSession(authOptions);

const payload = {
  id: Number(formData.get("id")),
  code: String(formData.get("code")),
  name: String(formData.get("name")),
  nameAr: String(formData.get("nameAr")),
  nameEn: String(formData.get("nameEn")),
  discountPercent: Number(formData.get("discountPercent")),
};

    await createLandClassification(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Added successfully"),
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data || error);

    return {
      success: false,
      message: error?.response?.data?.message || t("Something went wrong"),
    };
  }
}

//Put
export async function updateLandClassificationAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await getServerSession(authOptions);

    const id = Number(formData.get("id"));

    const payload = {
      code: String(formData.get("code")),
      name: String(formData.get("nameEn")),
      nameAr: String(formData.get("nameAr")),
      nameEn: String(formData.get("nameEn")),
      discountPercent: Number(formData.get("discountPercent")),
    };

    await updateLandClassification(id, payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "Updated successfully",
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update",
    };
  }
}

//Delete
export async function deleteLandClassificationAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");
  try {
    const session = await getServerSession(authOptions);

    const id = Number(formData.get("id"));

    await deleteLandClassification(id, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "Deleted successfully",
    };
  } catch (error) {
    console.log("SERVER ACTION ERROR:", error);

    return {
      success: false,
      message: t("Failed to delete"),
    };
  }
}
