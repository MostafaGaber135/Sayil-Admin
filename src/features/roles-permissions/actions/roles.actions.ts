"use server";

import { adminApiFetch } from "@/shared/lib/server-actions/admin-api.action";
import type { ApiResponse, AddRoleBody, UpdateRoleBody } from "../types";

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractApiMessage(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  const message = payload.message;
  const errors = payload.errors;

  if (typeof message === "string" && message.trim()) {
    return message.trim();
  }

  if (Array.isArray(errors) && typeof errors[0] === "string" && errors[0].trim()) {
    return String(errors[0]).trim();
  }

  return null;
}

async function parseApiResponse(res: Response): Promise<ApiResponse<unknown>> {
  const rawText = await res.text();
  const parsed = safeJsonParse<ApiResponse<unknown> | string>(rawText);

  if (!res.ok) {
    const msg = extractApiMessage(parsed) ?? `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  const data = safeJsonParse<ApiResponse<unknown>>(parsed);

  if (isRecord(data) && data.succeeded === false) {
    throw new Error(extractApiMessage(data) ?? "Request failed");
  }

  return data;
}

export async function addRoleAction(body: AddRoleBody): Promise<ApiResponse<unknown>> {
  const res = await adminApiFetch(ADD_ROLE_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return parseApiResponse(res);
}

export async function updateRoleAction(
  id: string | number,
  body: UpdateRoleBody
): Promise<ApiResponse<unknown>> {
  const res = await adminApiFetch(ROLE_BY_ID_PATH(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return parseApiResponse(res);
}

export async function deleteRoleAction(
  id: string | number
): Promise<ApiResponse<unknown>> {
  const res = await adminApiFetch(ROLE_BY_ID_PATH(id), {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain",
    },
    cache: "no-store",
  });

  return parseApiResponse(res);
}