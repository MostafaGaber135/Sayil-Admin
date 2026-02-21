import { api } from "@/shared/lib/axios/axios.instance";
import type { ApiResponse } from "@/features/dashboard/types";

const KPI_PATH = "/api/admin/dashboard/kpis";
const LISTINGS_BY_LOCATION_PATH = "/api/admin/dashboard/charts/listings-by-location";
const STATUS_DISTRIBUTION_PATH = "/api/admin/dashboard/charts/status-distribution";
const COMMISSION_BY_LOCATION_PATH = "/api/admin/dashboard/charts/commission-by-location";

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

export async function fetchDashboardKpis(): Promise<ApiResponse<unknown>> {
  const res = await api.get(KPI_PATH, {
    headers: {
      Accept: "application/json, text/plain",
    },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function fetchListingsByLocation(): Promise<ApiResponse<unknown>> {
  const res = await api.get(LISTINGS_BY_LOCATION_PATH, {
    headers: {
      Accept: "application/json, text/plain",
    },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function fetchStatusDistribution(): Promise<ApiResponse<unknown>> {
  const res = await api.get(STATUS_DISTRIBUTION_PATH, {
    headers: {
      Accept: "application/json, text/plain",
    },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function fetchCommissionByLocation(): Promise<ApiResponse<unknown>> {
  const res = await api.get(COMMISSION_BY_LOCATION_PATH, {
    headers: {
      Accept: "application/json, text/plain",
    },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}
