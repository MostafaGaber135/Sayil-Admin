"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { withActionError } from "@/shared/lib/errors/with-action-error";
import { ActionState } from "@/types/action-state";


type OfferActionInput = {
  offerId: number;
  note: string;
};

export async function acceptOfferAction(data: OfferActionInput): Promise<ActionState> {
  return withActionError("فشل قبول العرض", async () => {
    await serverApi.post("/api/admin/land/offers/accept", data);
    revalidateTag("offers");
    return { message: "تم قبول العرض بنجاح" };
  });
}

export async function rejectOfferAction(data: OfferActionInput): Promise<ActionState> {
  return withActionError("فشل رفض العرض", async () => {
    await serverApi.post("/api/admin/land/offers/reject", data);
    revalidateTag("offers");
    return { message: "تم رفض العرض بنجاح" };
  });
}