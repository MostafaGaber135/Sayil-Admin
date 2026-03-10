"use server"

import { serverApi } from "@/shared/lib/auth/server-sesstion-token";
import { revalidatePath, revalidateTag } from "next/cache";


type updateClassification = {
    landId: number;
    classificationId:number
}
type ActionState = {
    success: boolean;
    message: string;
    error?: string;
}

export async function updateClassificationAction(
    data: updateClassification
): Promise<ActionState> {
    try {
        await serverApi.post("/api/admin/land/update-classification", {
            landId: data.landId,
            classificationId:data.classificationId
        });
        revalidateTag('listings'); 
        revalidateTag(`land-${data.landId}`); 
        return {
            success: true,
            message: "تم إرسال طلب تغيير السعر بنجاح",
        };
        
    } catch (error: any) {
        
        return {
            success: false,
            message: "فشل إرسال الطلب",
            error: error?.response?.data?.message ?? "حدث خطأ غير متوقع",
        };
    }
}
