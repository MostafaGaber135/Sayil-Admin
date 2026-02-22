"use client";

import { useState } from "react";
import { signIn, signOut, type SignInResponse } from "next-auth/react";
import type { AdminLoginRequest } from "../types/auth.types";

type MutateOptions<TData = unknown> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
};

type SignInResult = SignInResponse | undefined;

export function useAdminLogin() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (payload: AdminLoginRequest, options?: MutateOptions<SignInResult>) => {
    setIsPending(true);
    try {
      const res = await signIn("credentials", {
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        redirect: false,
      });

      options?.onSuccess?.(res);
      return res;
    } catch (error) {
      options?.onError?.(error);
      throw error;
    } finally {
      setIsPending(false);
      options?.onSettled?.();
    }
  };

  const mutate = (payload: AdminLoginRequest, options?: MutateOptions<SignInResult>) => {
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