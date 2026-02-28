import axios from "axios";
import { getClientAccessToken } from "@/shared/lib/auth/client-session-token";

function resolveApiBaseUrl(): string {
   
    const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (publicBase) return publicBase;

    if (typeof window !== "undefined") {
        const runtimeBase = (window as unknown as { __API_BASE_URL__?: string }).__API_BASE_URL__;
        if (runtimeBase) return runtimeBase;
    }

    const serverBase = (process.env.API_BASE_URL as string | undefined) || "";
    return serverBase;
}

export const api = axios.create({
    baseURL: resolveApiBaseUrl(),
    timeout: 20000
});

api.interceptors.request.use(async (config) => {
    const manualToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiKzk2NjUxMjM0NTY3OCIsImp0aSI6IjVkMjM1MWUyLTNmZDEtNDRmMC05MzYwLWEzYTJlY2ZhMWQwYyIsImlhdCI6MTc3MjA1MDg3OCwidXNlclR5cGUiOiIzIiwicGhvbmVOdW1iZXJDb25maXJtZWQiOiJUcnVlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsInBlcm1pc3Npb24iOlsiRGFzaGJvYXJkLlZpZXciLCJMaXN0aW5nc01hbmFnZW1lbnQuQWRkIiwiTGlzdGluZ3NNYW5hZ2VtZW50LkRlbGV0ZUV4dGVybmFsTGlzdGluZ3MiLCJMaXN0aW5nc01hbmFnZW1lbnQuRGVsZXRlTGlzdGluZ3NCeUludGVybmFsVXNlcnMiLCJMaXN0aW5nc01hbmFnZW1lbnQuRGVsZXRlTXlMaXN0aW5ncyIsIkxpc3RpbmdzTWFuYWdlbWVudC5FZGl0QWxsTGlzdGluZ3MiLCJMaXN0aW5nc01hbmFnZW1lbnQuRWRpdE15TGlzdGluZ3MiLCJMaXN0aW5nc01hbmFnZW1lbnQuQXBwcm92ZSIsIkxpc3RpbmdzTWFuYWdlbWVudC5SZWplY3QiLCJMaXN0aW5nc01hbmFnZW1lbnQuUmVxdWVzdFByaWNlQ2hhbmdlIiwiTGlzdGluZ3NNYW5hZ2VtZW50LlZpZXdBbGxMYW5kTGlzdGluZ3MiLCJMaXN0aW5nc01hbmFnZW1lbnQuVmlld015QXNzaWduZWRMaXN0aW5ncyIsIkxpc3RpbmdzTWFuYWdlbWVudC5WaWV3QnV5ZXJPZmZlcnMiLCJMaXN0aW5nc01hbmFnZW1lbnQuTWFuYWdlT2ZmZXJzIiwiVXNlcnNNYW5hZ2VtZW50LlZpZXciLCJVc2Vyc01hbmFnZW1lbnQuQWRkIiwiVXNlcnNNYW5hZ2VtZW50LkVkaXQiLCJVc2Vyc01hbmFnZW1lbnQuRGVsZXRlIiwiU3lzdGVtQWRtaW5pc3RyYXRpb24uTWFuYWdlU2V0dGluZ3MiLCJTeXN0ZW1BZG1pbmlzdHJhdGlvbi5NYW5hZ2VDb21tdW5pY2F0aW9uQ29uZmlndXJhdGlvbnMiXSwiZXhwIjoxNzczMzQ2ODc4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTIxLmNvbSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMjEuY29tIn0.i0O8_c1pUv0DX42njxXY6vRSCHwxPljRgFQ0_8SoY70";
    const token = manualToken || await getClientAccessToken();
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
    }
);
