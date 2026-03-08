"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import { addFaq, deleteFaq, reorderFaqs, updateFaq } from "../services/settings.services";

export async function addFaqAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await getServerSession(authOptions);

    const payload = {
      questionEn: String(formData.get("questionEn")),
      questionAr:
        String(formData.get("questionAr")) ||
        String(formData.get("questionEn")),
      answerEn: String(formData.get("answerEn")),
      answerAr:
        String(formData.get("answerAr")) ||
        String(formData.get("answerEn")),
    };

    await addFaq(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "FAQ added successfully",
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add FAQ",
    };
  }
}

export async function reorderFaqsAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await getServerSession(authOptions);

    const items = JSON.parse(String(formData.get("items")));

    await reorderFaqs({ items }, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "FAQ order updated successfully",
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to reorder FAQs",
    };
  }
}



export async function deleteFaqAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await getServerSession(authOptions);

    const id = Number(formData.get("id"));

    await deleteFaq(id, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "FAQ deleted successfully",
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to delete FAQ",
    };
  }
}


export async function updateFaqAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await getServerSession(authOptions);

    const payload = {
      id: Number(formData.get("id")),
      questionEn: String(formData.get("questionEn")),
      questionAr: String(formData.get("questionAr")),
      answerEn: String(formData.get("answerEn")),
      answerAr: String(formData.get("answerAr")),
    };

    await updateFaq(payload, session?.accessToken as string);

    revalidatePath("/settings");

    return {
      success: true,
      message: "FAQ updated successfully",
    };
  } catch (error: any) {
    console.log("SERVER ACTION ERROR:", error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update FAQ",
    };
  }
}