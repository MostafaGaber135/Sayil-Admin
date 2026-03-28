"use client";

import { useState, useTransition } from "react";

export function useAction() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const execute = <T>(action: (data: T) => Promise<{ success: boolean; error?: string }>,data: T,onSuccess?: () => void) => {
    setError(null);
    startTransition(async () => {
      const result = await action(data);
      if (result.success) onSuccess?.();
      else setError(result.error ?? "حدث خطأ غير متوقع");
    });
  };

  return { isPending, error, execute };
}