"use server";

import { serverApi } from "@/shared/lib/auth/server-sesstion-token";

// ── Accept Offer ───────────────────────────────────────────────────────────────

export async function acceptOfferAction(data: {
  offerId: number;
  note: string;
}) {
  try {
    await serverApi.post("/api/admin/land/offers/accept", data);
    return { success: true };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "Failed to accept offer";
    return { success: false, error: message };
  }
}

// ── Reject Offer ───────────────────────────────────────────────────────────────

export async function rejectOfferAction(data: {
  offerId: number;
  note: string;
}) {
  try {
    await serverApi.post("/api/admin/land/offers/reject", data);
    return { success: true };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "Failed to reject offer";
    return { success: false, error: message };
  }
}

