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

//Post

export async function createLandClassificationAction(
  _prevState: ActionState,
  formData: FormData,
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
      name: String(formData.get("name") ?? ""),
      nameAr: String(formData.get("nameAr") ?? ""),
      nameEn: String(formData.get("nameEn") ?? ""),
      discountPercent: String(formData.get("discountPercent") ?? ""),
    };

    const payload = classificationFormSchema(t).parse(rawData);

    await createLandClassification(payload, session.accessToken);

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
          (error.response?.data as any)?.message || t("Something went wrong"),
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

//Put
export async function updateLandClassificationAction(
  _prevState: any,
  formData: FormData,
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
