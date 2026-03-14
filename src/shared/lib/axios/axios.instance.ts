import axios from "axios";
import { getClientAccessToken } from "@/shared/lib/auth/client-session-token";

function resolveApiBaseUrl(): string {

  if (typeof window !== "undefined") {
    return "";
  }

  const runtimeBase =
    (globalThis as typeof globalThis & { __API_BASE_URL__?: string }).__API_BASE_URL__;
  if (runtimeBase) return runtimeBase;

  const serverBase =
    (process.env.API_BASE_URL as string | undefined) ||
    (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ||
    "";
  return serverBase;
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 20000
});

api.interceptors.request.use((config) => {
  return (async () => {

    if (typeof window === "undefined") {
      return config;
    }

    const token = await getClientAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  })();
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);