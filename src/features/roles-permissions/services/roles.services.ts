import { api } from "@/shared/lib/axios/axios.instance";
import type { ApiResponse } from "../types";
import type {
  RolesPaginatedBody,
  AddRoleBody,
  UpdateRoleBody,
} from "../types";

const PAGES_WITH_CLAIMS_PATH = "/api/admin/roles/pages-with-claims";
const ROLES_PAGINATED_PATH = "/api/admin/roles/paginated";
const ADD_ROLE_PATH = "/api/admin/roles/add";
const ROLE_BY_ID_PATH = (id: string | number) => `/api/admin/roles/${id}`;

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

export async function fetchPagesWithClaims(): Promise<ApiResponse<unknown>> {
  const res = await api.get(PAGES_WITH_CLAIMS_PATH, {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function fetchRolesPaginated(
  body: RolesPaginatedBody
): Promise<ApiResponse<unknown>> {
  const res = await api.post(ROLES_PAGINATED_PATH, body, {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function fetchRoleById(id: string | number): Promise<ApiResponse<unknown>> {
  const res = await api.get(ROLE_BY_ID_PATH(id), {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function addRole(body: AddRoleBody): Promise<ApiResponse<unknown>> {
  const res = await api.post(ADD_ROLE_PATH, body, {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function updateRole(
  id: string | number,
  body: UpdateRoleBody
): Promise<ApiResponse<unknown>> {
  const res = await api.put(ROLE_BY_ID_PATH(id), body, {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}

export async function deleteRole(id: string | number): Promise<ApiResponse<unknown>> {
  const res = await api.delete(ROLE_BY_ID_PATH(id), {
    headers: { Accept: "application/json, text/plain" },
    transformResponse: (data) => safeJsonParse<ApiResponse<unknown>>(data),
  });

  return safeJsonParse<ApiResponse<unknown>>(res.data);
}
