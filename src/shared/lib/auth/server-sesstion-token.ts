'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth.options";
import axios, { AxiosError } from "axios";

const TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;

export const serverApi = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: TIMEOUT_MS,
});

serverApi.interceptors.request.use((config) => {
    return (async () => {
        const session = await getServerSession(authOptions);
        const token = session?.accessToken;
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })();
});

serverApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as typeof error.config & { _retryCount?: number };
        if (!config) return Promise.reject(error);

        const isRetryable =
            error.code === "ECONNRESET" ||
            error.code === "ECONNABORTED" ||
            error.code === "ETIMEDOUT" ||
            error.code === "ERR_NETWORK" ||
            error.response?.status === 503 ||
            error.response?.status === 502;

        if (!isRetryable) return Promise.reject(error);

        config._retryCount = config._retryCount ?? 0;

        if (config._retryCount >= MAX_RETRIES) return Promise.reject(error);

        config._retryCount += 1;

        const delay = 500 * config._retryCount;
        await new Promise((resolve) => setTimeout(resolve, delay));

        return serverApi(config);
    }
);