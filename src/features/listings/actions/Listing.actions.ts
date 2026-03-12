"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { withActionError } from "@/shared/lib/errors/with-action-error";

import { ListingFormValues } from "../validation";
import { ApproveLandRequest, RejectLandRequest } from "@/features/listings";
import { CreateListingRequest } from "@/features/listings/validation";
import { ActionState } from "@/types/action-state";

// ─── updateListingAction ──────────────────────────────────────────────────────
export async function updateListingAction(
  _: ActionState | null,
  data: ListingFormValues & { id: number }
): Promise<ActionState> {
  return withActionError("فشل التحديث", async () => {
    await serverApi.post("/api/admin/land/update", data);
    revalidateTag("listings");
    revalidateTag(`land-${data.id}`);
    return { message: "تم التحديث بنجاح" };
  });
}

// ─── approveLandAction ────────────────────────────────────────────────────────
export async function approveLandAction(body: ApproveLandRequest): Promise<ActionState> {
  return withActionError("فشلت الموافقة", async () => {
    await serverApi.post("/api/admin/land/approve", body);
    revalidateTag("listings");
    return { message: "تم الموافقة بنجاح" };
  });
}

// ─── rejectLandAction ─────────────────────────────────────────────────────────
export async function rejectLandAction(body: RejectLandRequest): Promise<ActionState> {
  return withActionError("فشل الرفض", async () => {
    await serverApi.post("/api/admin/land/reject", body);
    revalidateTag("listings");
    return { message: "تم الرفض بنجاح" };
  });
}

// ─── deleteLandAction ─────────────────────────────────────────────────────────
export async function deleteLandAction(id: string): Promise<ActionState> {
  return withActionError("فشل الحذف", async () => {
    await serverApi.delete(`/api/admin/land/${id}`);
    revalidateTag("listings");
    return { message: "تم الحذف بنجاح" };
  });
}

// ─── addLandAction ────────────────────────────────────────────────────────────
export async function addLandAction(data: CreateListingRequest): Promise<ActionState> {
  return withActionError("فشل إضافة العقار", async () => {
    await serverApi.post("/api/admin/land/add", data);
    revalidateTag("listings");
    return { message: "تم إضافة العقار بنجاح" };
  });
}