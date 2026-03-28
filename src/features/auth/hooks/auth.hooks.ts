"use client";

import { useState } from "react";
import { signOut, type SignInResponse } from "next-auth/react";
import type { AdminLoginRequest, AdminLoginResponse } from "../types/auth.types";

type MutateOptions<TData = unknown> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
};

export function useAdminLogin() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (
    payload: AdminLoginRequest,
    options?: MutateOptions<AdminLoginResponse>
  ) => {
    setIsPending(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const data = (await res.json().catch(() => null)) as AdminLoginResponse | null;

      if (!res.ok || !data) {
        const error = {
          status: res.status,
          message:
            data?.message ||
            (res.status === 401 ? "Unauthorized" : "Login request failed"),
          data,
        };
        options?.onError?.(error);
        throw error;
      }

      options?.onSuccess?.(data);
      return data;
    } catch (error) {
      options?.onError?.(error);
      throw error;
    } finally {
      setIsPending(false);
      options?.onSettled?.();
    }
  };

  const mutate = (payload: AdminLoginRequest, options?: MutateOptions<AdminLoginResponse>) => {
    void mutateAsync(payload, options);
  };

  return { mutateAsync, mutate, isPending };
}

export function useLogout() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (_vars?: unknown, options?: MutateOptions<void>) => {
    setIsPending(true);
    try {
      await signOut({ redirect: false });
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
      throw error;
    } finally {
      setIsPending(false);
      options?.onSettled?.();
    }
  };

  const mutate = (_vars?: unknown, options?: MutateOptions<void>) => {
    void mutateAsync(_vars, options);
  };

  return { mutateAsync, mutate, isPending };
}

export type AdminSessionSignInResult = SignInResponse | undefined;

