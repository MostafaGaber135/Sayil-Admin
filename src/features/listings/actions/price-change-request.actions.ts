"use server"

import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { revalidatePath } from "next/cache";
type PriceChangeRequestInput = {
    landId: number;
    suggestedPrice: number;
    reason: string;
}
type ActionState = {
    success: boolean;
    message: string;
    error?: string;
}

export async function priceChangeRequestAction(
    data: PriceChangeRequestInput
): Promise<ActionState> {
    try {

        await serverApi.post("/api/admin/land/price-change-request", {
            landId: data.landId,
            suggestedPrice: data.suggestedPrice,
            reason: data.reason,
        });
        revalidatePath(`/listings/${data.landId}`);
        return {
            success: true,
            message: "تم إرسال طلب تغيير السعر بنجاح",
        };
        
    } catch (error: any) {
        console.log(error);
        
        return {
            success: false,
            message: "فشل إرسال الطلب",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}


// ── Cancel Price Change Request ────────────────────────────────────────────────

export async function cancelPriceRequestAction(requestId: number) {
    try {
      await serverApi.post(
        `/api/admin/land/listings/${requestId}/price-change-request-cancel`
      );
      return { success: true };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Failed to cancel request";
      return { success: false, error: message };
    }
  }