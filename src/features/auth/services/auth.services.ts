import { api } from "@/shared/lib/axios/axios.instance";
import type { AdminLoginRequest, AdminLoginResponse } from "@/features/auth/types";

const LOGIN_PATH = "/api/admin/auth/login";
const LOGOUT_PATH = "/api/admin/account/logout";

function safeJsonParse<T>(value: unknown): T {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }
  return value as T;
}

export async function adminLogin(payload: AdminLoginRequest): Promise<AdminLoginResponse> {
  const res = await api.post(LOGIN_PATH, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain"
    },
    transformResponse: (data) => safeJsonParse<AdminLoginResponse>(data)
  });

  return safeJsonParse<AdminLoginResponse>(res.data);
}

export async function adminLogout(): Promise<unknown> {
  const res = await api.post(LOGOUT_PATH, {}, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain"
    },
    transformResponse: (data) => safeJsonParse<unknown>(data)
  });

  return safeJsonParse<unknown>(res.data);
}
