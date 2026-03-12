import { ActionState } from "@/types/action-state";
export function extractAxiosErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const resp = (error as { response?: { data?: { message?: string } } }).response;
    return resp?.data?.message ?? fallback;
  }
  return fallback;
}


export function throwAxiosError(error: unknown, fallback = "حدث خطأ غير متوقع"): never {
    if (typeof error === "object" && error !== null && "response" in error) {
      const resp = (error as { response?: { data?: { message?: string } } }).response;
      throw new Error(resp?.data?.message ?? fallback);
    }
    throw new Error(fallback);
  }