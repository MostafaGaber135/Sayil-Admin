"use server"

import { revalidatePath } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";

type ActionState = {
    success: boolean;
    message: string;
    error?: string;
}

export async function updateListingAction(
    _: ActionState | null,
    id:number
): Promise<ActionState> {
    try {
        await serverApi.post(`/api/admin/land/${id}`);
        revalidatePath('/listings');
        return { success: true, message: "تم الحذف بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشل الحذف",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}