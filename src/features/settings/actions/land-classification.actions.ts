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
import { ActionState } from "../types";
import { AxiosError } from "axios";
import { classificationFormSchema } from "../validation/land-class.validation";


// ================= CREATE =================

export async function createLandClassificationAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {

  const t = await getTranslations("pages.roles.toasts");

  try {

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return {
        success: false,
        message: t("Unauthorized"),
      };
    }

    const rawData = {
      code: String(formData.get("code") ?? ""),
      nameEn: String(formData.get("nameEn") ?? ""),
      nameAr: String(formData.get("nameAr") ?? ""),
      discountPercent: formData.get("discountPercent"),
    };

    const payload = classificationFormSchema(t).parse(rawData);

    await createLandClassification(
      {
        code: payload.code,
        nameAr: payload.nameAr,
        nameEn: payload.nameEn,
        discountPercent: payload.discountPercent,
      },
      session.accessToken
    );

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Added successfully"),
    };

  } catch (error: unknown) {

    if (error instanceof AxiosError) {
      console.error("SERVER ACTION AXIOS ERROR:", error.response?.data);

      return {
        success: false,
        message:
          (error.response?.data as any)?.message ||
          t("Something went wrong"),
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    console.error("SERVER ACTION ERROR:", error);

    return {
      success: false,
      message: t("Something went wrong"),
    };
  }
}



// ================= UPDATE =================

export async function updateLandClassificationAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {

  const t = await getTranslations("pages.roles.toasts");

  try {

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return {
        success: false,
        message: t("Unauthorized"),
      };
    }

    const id = Number(formData.get("id"));

    const rawData = {
      code: String(formData.get("code") ?? ""),
      nameEn: String(formData.get("nameEn") ?? ""),
      nameAr: String(formData.get("nameAr") ?? ""),
      discountPercent: formData.get("discountPercent"),
    };

    const payload = classificationFormSchema(t).parse(rawData);

    await updateLandClassification(
      id,
      {
        code: payload.code,
        nameAr: payload.nameAr,
        nameEn: payload.nameEn,
        discountPercent: payload.discountPercent,
      },
      session.accessToken
    );

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Updated successfully"),
    };

  } catch (error: unknown) {

    if (error instanceof AxiosError) {
      console.error("SERVER ACTION AXIOS ERROR:", error.response?.data);

      return {
        success: false,
        message:
          (error.response?.data as any)?.message ||
          t("Something went wrong"),
      };
    }

    return {
      success: false,
      message: t("Something went wrong"),
    };
  }
}



// ================= DELETE =================

export async function deleteLandClassificationAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {

  const t = await getTranslations("pages.roles.toasts");

  try {

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return {
        success: false,
        message: t("Unauthorized"),
      };
    }

    const id = Number(formData.get("id"));

    await deleteLandClassification(id, session.accessToken);

    revalidatePath("/settings");

    return {
      success: true,
      message: t("Deleted successfully"),
    };

  } catch (error) {

    console.error("SERVER ACTION ERROR:", error);

    return {
      success: false,
      message: t("Failed to delete"),
    };
  }
}