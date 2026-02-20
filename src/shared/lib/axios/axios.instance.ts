import axios from "axios";
import { getAccessToken } from "@/shared/lib/auth/token";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    timeout: 20000
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
    }
);
