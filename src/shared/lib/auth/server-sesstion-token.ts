'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth.options";
import axios from "axios";


export const serverApi = axios.create({
    baseURL: process.env.API_BASE_URL,
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