"use server";

import { adminApiFetch } from "@/shared/lib/server-actions/admin-api.action";
import type {
  AddRoleBody,
  ApiResponse,
  RolesPaginatedBody,
  UpdateRoleBody,
} from "@/features/roles-permissions/types";

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

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = safeJsonParse<T>(text);

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function fetchPagesWithClaimsAction(): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(PAGES_WITH_CLAIMS_PATH, {
    method: "GET",
  });

  return parseResponse<ApiResponse<unknown>>(response);
}

export async function fetchRolesPaginatedAction(
  body: RolesPaginatedBody
): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(ROLES_PAGINATED_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<ApiResponse<unknown>>(response);
}

export async function fetchRoleByIdAction(
  id: string | number
): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(ROLE_BY_ID_PATH(id), {
    method: "GET",
  });

  return parseResponse<ApiResponse<unknown>>(response);
}

export async function addRoleAction(body: AddRoleBody): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(ADD_ROLE_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<ApiResponse<unknown>>(response);
}

export async function updateRoleAction(
  id: string | number,
  body: UpdateRoleBody
): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(ROLE_BY_ID_PATH(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<ApiResponse<unknown>>(response);
}

export async function deleteRoleAction(
  id: string | number
): Promise<ApiResponse<unknown>> {
  const response = await adminApiFetch(ROLE_BY_ID_PATH(id), {
    method: "DELETE",
  });

  return parseResponse<ApiResponse<unknown>>(response);
}
