import type { AxiosInstance } from "axios";
import { ListingsRequest, ListingsResponse } from "..";
import { api } from "@/shared/lib/axios/axios.instance";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";

const buildCleanBody = (body: ListingsRequest) =>
  Object.fromEntries(
    Object.entries(body).filter(([_, v]) => v !== undefined && v !== null && v !== "" && v !== 0)
);
// ─── Shared (client + server) ─────────────────────────────────────────────────

export const fetchAllListing = async (
  body: ListingsRequest,
  instance: AxiosInstance = api  
): Promise<ListingsResponse> => {
  const { data } = await instance.post("/api/admin/land/listings", buildCleanBody(body));
  return data;
};

export const fetchGetLand = async (
  id: number,
  instance: AxiosInstance = api
) => {
  const { data } = await instance.get(`/api/admin/land/${id}`);
  return data;
};

// ─── Server aliases ───────────────────────────────────────────────────────────

export const serverFetchAllListing = (body: ListingsRequest) =>
  fetchAllListing(body, serverApi);

export const serverFetchGetLand = (id: number) =>
  fetchGetLand(id, serverApi);