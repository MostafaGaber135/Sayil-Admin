"use client";

import { clearAuth, setAuth } from "@/features/auth/redux-toolkit/auth.slice";
import { adminLogin, adminLogout } from "@/features/auth/services/auth.services";
import type { AdminLoginRequest, AdminLoginResponse } from "@/features/auth/types/auth.types";
import { clearTokens, setTokens } from "@/shared/lib/auth/token";
import { useAppDispatch } from "@/shared/lib/rtk/hooks";
import { useMutation } from "@tanstack/react-query";

export function useAdminLogin() {
  const dispatch = useAppDispatch();

  return useMutation<AdminLoginResponse, unknown, AdminLoginRequest>({
    mutationFn: (payload) => adminLogin(payload),
    onSuccess: (res) => {
      const data = res?.data;
      if (!data?.token) return;

      setTokens(data.token, data.refreshToken);
      dispatch(
        setAuth({
          token: data.token,
          refreshToken: data.refreshToken,
          isFirstTimeLogin: data.isFirstTimeLogin,
          user: data.user
        })
      );
    }
  });
}

export function useLogout() {
  const dispatch = useAppDispatch();

  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      await adminLogout();
    },
    onSettled: () => {
      clearTokens();
      dispatch(clearAuth());
    }
  });
}
