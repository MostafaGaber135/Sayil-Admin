"use server"

import { revalidatePath } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { ListingFormValues } from "../validation";

type ActionState = {
    success: boolean;
    message: string;
    error?: string;
}

export async function updateListingAction(
    _: ActionState | null,
    data: ListingFormValues & { id: number }
): Promise<ActionState> {
    try {
        await serverApi.post('/api/admin/land/update', data);
        revalidatePath(`/listings/${data.id}`);
        revalidatePath('/listings');
        return { success: true, message: "تم التحديث بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشل التحديث",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}