"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import { revalidatePath } from "next/cache";
import axios, { AxiosError } from "axios";
import { deleteAllNotifications, markAllNotificationsAsRead } from "../services/notifications.services";
import { getTranslations } from "next-intl/server";
import { api } from "@/shared/lib/axios/axios.instance";

export async function markNotificationAsReadAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("pages.roles.toasts");

  try {
    const session = await getServerSession(authOptions);

    const id = formData.get("id");

    await api.post(
      `/api/admin/notifications/mark-read/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    revalidatePath("/");

    return {
      success: true,
      message: t("Notification marked as read"),
    };
  } catch (error) {
    console.log("SERVER ACTION ERROR:", error);

    return {
      success: false,
      message: t("Something went wrong"),
    };
  }
}

export async function markAllNotificationsAsReadAction(_prevState: any) {
  const t = await getTranslations("pages.roles.toasts");
  try {
    const session = await getServerSession(authOptions);

    await markAllNotificationsAsRead(session?.accessToken as string);

    return {
      success: true,
      message: t("All notifications marked as read"),
    };
  } catch (error) {
    console.log("SERVER ACTION ERROR:", error);

    return {
      success: false,
      message: t("Something went wrong"),
    };
  }
}

//Delete All

export async function deleteAllNotificationsAction() {
 const t = await getTranslations("pages.notification");
  try {

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return {
        success: false,
        message: t("Unauthorized"),
      };
    }

    await deleteAllNotifications(session.accessToken);

    revalidatePath("/notifications");

    return {
      success: true,
      message: t("All notifications deleted"),
    };

  } catch (error: unknown) {

    if (error instanceof AxiosError) {
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