
"use server";

import { revalidatePath } from "next/cache";
import { serverApi } from "@/shared/lib/auth/server-sesstion-token";

import {
  type AddAdminPayload,
  type AddExternalPayload,
  type UpdateAdminPayload,
  type UpdateExternalPayload,
  type GetUsersPaginatedParams,
  type GetUsersPaginatedResponse,
} from "..";
import { throwAxiosError } from "@/shared/lib/errors/handle-action-error";

export async function getUsersPaginated(
  params: GetUsersPaginatedParams
): Promise<GetUsersPaginatedResponse["data"]> {
  try {
    const { data } = await serverApi.get<GetUsersPaginatedResponse>(
      "/api/admin/users/paginated",
      {
        params: {
          UserType: params.userType,
          SearchTerm: params.searchTerm ?? undefined,
          PageNumber: params.pageNumber ?? 1,
          PageSize: params.pageSize ?? 10,
        },
      }
    );
    if (!data.succeeded) throw new Error(data.message);
    return data.data;
  } catch (error) {
    throwAxiosError(error);
  }
}

export async function addInternalUser(payload: AddAdminPayload): Promise<void> {
  try {
    const { data } = await serverApi.post<{ succeeded: boolean; message: string }>(
      "/api/admin/users/add-admin",
      payload
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}

export async function addExternalUser(payload: AddExternalPayload): Promise<void> {
  try {
    const { data } = await serverApi.post<{ succeeded: boolean; message: string }>(
      "/api/admin/users/add-external",
      payload
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}

export async function updateInternalUser(payload: UpdateAdminPayload): Promise<void> {
  try {
    const { data } = await serverApi.put<{ succeeded: boolean; message: string }>(
      "/api/admin/users/update",
      payload
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}

export async function updateExternalUser(payload: UpdateExternalPayload): Promise<void> {
  try {
    const { data } = await serverApi.put<{ succeeded: boolean; message: string }>(
      "/api/admin/users/update-external",
      payload
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const { data } = await serverApi.delete<{ succeeded: boolean; message: string }>(
      `/api/admin/users/${id}`
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}

export async function toggleUserStatus(id: number): Promise<void> {
  try {
    const { data } = await serverApi.post<{ succeeded: boolean; message: string }>(
      `/api/admin/users/${id}/toggle-status`
    );
    if (!data.succeeded) throw new Error(data.message);
  } catch (error) {
    throwAxiosError(error);
  } finally {
    revalidatePath("/admin/users");
  }
}