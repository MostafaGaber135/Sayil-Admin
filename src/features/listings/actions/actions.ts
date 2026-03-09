"use server"
import { revalidateTag } from "next/cache"; 
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { ListingFormValues } from "../validation";
import { ApproveLandRequest, RejectLandRequest } from "@/features/listings";

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
        revalidateTag('listings'); 
        revalidateTag(`land-${data.id}`); 
        return { success: true, message: "تم التحديث بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشل التحديث",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}

export async function approveLandAction(body: ApproveLandRequest): Promise<ActionState> {
    try {
        await serverApi.post('/api/admin/land/approve', body);
        revalidateTag('listings');
        return { success: true, message: "تم الموافقة بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشلت الموافقة",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}

export async function rejectLandAction(body: RejectLandRequest): Promise<ActionState> {
    try {
        await serverApi.post('/api/admin/land/reject', body);
        revalidateTag('listings');
        return { success: true, message: "تم الرفض بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشل الرفض",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}

export async function deleteLandAction(id: string): Promise<ActionState> {
    try {
        await serverApi.delete(`/api/admin/land/${id}`);
        revalidateTag('listings');
        return { success: true, message: "تم الحذف بنجاح" };
    } catch (error: any) {
        return {
            success: false,
            message: "فشل الحذف",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}