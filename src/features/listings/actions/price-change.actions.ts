"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { withActionError } from "@/shared/lib/errors/with-action-error";
import { ActionState } from "@/types/action-state";


type PriceChangeRequestInput = {
  landId: number;
  suggestedPrice: number;
  reason: string;
};

type UpdateClassificationInput = {
  landId: number;
  classificationId: number;
};

// ─── priceChangeRequestAction ─────────────────────────────────────────────────
export async function priceChangeRequestAction(
  data: PriceChangeRequestInput
): Promise<ActionState> {
  return withActionError("فشل إرسال الطلب", async () => {
    await serverApi.post("/api/admin/land/price-change-request", data);
    revalidatePath(`/listings/${data.landId}`);
    return { message: "تم إرسال طلب تغيير السعر بنجاح" };
  });
}

// ─── cancelPriceRequestAction ─────────────────────────────────────────────────
export async function cancelPriceRequestAction(requestId: number): Promise<ActionState> {
  return withActionError("فشل إلغاء الطلب", async () => {
    await serverApi.post(
      `/api/admin/land/listings/${requestId}/price-change-request-cancel`
    );
    return { message: "تم إلغاء الطلب بنجاح" };
  });
}

// ─── updateClassificationAction ───────────────────────────────────────────────
export async function updateClassificationAction(
  data: UpdateClassificationInput
): Promise<ActionState> {
  return withActionError("فشل تحديث التصنيف", async () => {   // ← الصح
    await serverApi.post("/api/admin/land/update-classification", data);
    revalidateTag("listings");
    revalidateTag(`land-${data.landId}`);
    return { message: "تم تحديث التصنيف بنجاح" };
  });
}