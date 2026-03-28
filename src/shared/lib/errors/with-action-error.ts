// shared/lib/errors/with-action-error.ts
import { ActionState } from "@/types/action-state";
import { extractAxiosErrorMessage } from "./handle-action-error";

export function withActionError(
  failureMessage: string,
  fn: () => Promise<Omit<ActionState, "success">>
): Promise<ActionState> {
  return fn()
    .then((result) => ({ success: true, ...result }))
    .catch((error: unknown) => ({
      success: false,
      message: failureMessage,
      error: extractAxiosErrorMessage(error, "حدث خطأ غير متوقع"),
    }));
}