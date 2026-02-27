import axios from "axios";
import { getClientAccessToken } from "@/shared/lib/auth/client-session-token";

function resolveApiBaseUrl(): string {
    // Prefer build-time public env var (client-safe)
    const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (publicBase) return publicBase;

    // Fallback to runtime-injected value (set in RootLayout from server env)
    if (typeof window !== "undefined") {
        const runtimeBase = (window as unknown as { __API_BASE_URL__?: string }).__API_BASE_URL__;
        if (runtimeBase) return runtimeBase;
    }

    // Server-side fallback (safe on the server only)
    const serverBase = (process.env.API_BASE_URL as string | undefined) || "";
    return serverBase;
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 20000,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);
