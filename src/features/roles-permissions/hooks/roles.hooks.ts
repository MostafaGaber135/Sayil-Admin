"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/react-query/queryKeys";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import type {
  AddRoleBody,
  Permission,
  Role,
  RolesPaginatedBody,
  UpdateRoleBody,
} from "../types";

import {
  addRoleAction,
  deleteRoleAction,
  fetchPagesWithClaimsAction,
  fetchRoleByIdAction,
  fetchRolesPaginatedAction,
  updateRoleAction,
} from "@/server-actions/roles/roles.actions";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.trim());
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function getApiMessage(errorOrResponse: unknown): string | null {
  if (!isRecord(errorOrResponse)) return null;

  const maybeAxios = errorOrResponse as Record<string, unknown>;
  const response = maybeAxios.response;
  if (isRecord(response)) {
    const data = (response as Record<string, unknown>).data;
    const msg = getApiMessage(data);
    if (msg) return msg;
  }

  const message = maybeAxios.message;
  const errors = maybeAxios.errors;
  const succeeded = maybeAxios.succeeded;

  if (typeof message === "string" && message.trim()) return message.trim();

  if (Array.isArray(errors) && typeof errors[0] === "string" && errors[0].trim()) {
    return String(errors[0]).trim();
  }

  if (typeof succeeded === "boolean" && succeeded === false) return "Request failed";
  return null;
}

function showSuccess(t: (key: string) => string, key: string, apiMsg: string | null) {
  toast.success(t(key));
  if (apiMsg && process.env.NODE_ENV !== "production") {
    console.debug("[roles] API message:", apiMsg);
  }
}

function showError(t: (key: string) => string, key: string, apiMsg: string | null) {
  toast.error(t(key));
  if (apiMsg && process.env.NODE_ENV !== "production") {
    console.debug("[roles] API message:", apiMsg);
  }
}

export function normalizePermissionId(raw: string): string {
  return String(raw ?? "")
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function buildPermissionsFromPages(payload: unknown): {
  permissions: Permission[];
  claimIdToPermissionId: Map<number, string>;
  permissionIdToClaimId: Map<string, number>;
} {
  const root = isRecord(payload) ? (payload as Record<string, unknown>) : null;
  const value = root?.value;
  const pagesRaw = asArray(value);

  const permissions: Permission[] = [];
  const claimIdToPermissionId = new Map<number, string>();
  const permissionIdToClaimId = new Map<string, number>();

  pagesRaw.forEach((p) => {
    if (!isRecord(p)) return;
    const page = p as Record<string, unknown>;
    const pageKey = String(page.key ?? "");
    const pageName = String(page.name ?? pageKey ?? "").trim();
    const claims = asArray(page.claims);

    claims.forEach((c) => {
      if (!isRecord(c)) return;
      const claim = c as Record<string, unknown>;
      const claimId = toNumber(claim.id);
      const claimKey = String(claim.key ?? "");
      const claimName = String(claim.name ?? claimKey ?? "").trim();

      const id = normalizePermissionId(`${pageKey}.${claimKey}`);
      const permission: Permission = {
        id,
        label: claimName || claimKey,
        group: pageName || pageKey,
        claimId: typeof claimId === "number" ? claimId : undefined,
      };

      permissions.push(permission);

      if (typeof claimId === "number") {
        claimIdToPermissionId.set(claimId, id);
        permissionIdToClaimId.set(id, claimId);
      }
    });
  });

  return { permissions, claimIdToPermissionId, permissionIdToClaimId };
}

function extractRolesList(payload: unknown): unknown[] {
  if (!isRecord(payload)) return [];
  const rec = payload as Record<string, unknown>;
  const v = rec.value;

  if (Array.isArray(v)) return v;

  if (isRecord(v)) {
    const vr = v as Record<string, unknown>;
    if (Array.isArray(vr.items)) return vr.items as unknown[];
    if (Array.isArray(vr.data)) return vr.data as unknown[];
    if (Array.isArray(vr.value)) return vr.value as unknown[];
  }

  if (Array.isArray(rec.items)) return rec.items as unknown[];
  if (Array.isArray(rec.data)) return rec.data as unknown[];
  return [];
}

export function normalizeRoles(
  payload: unknown,
  claimIdToPermissionId: Map<number, string>
): Role[] {
  const list = extractRolesList(payload);

  return list
    .map((row) => {
      if (!isRecord(row)) return null;
      const r = row as Record<string, unknown>;

      const id = String(r.id ?? r.roleId ?? r.value ?? "").trim();
      const name = String(r.name ?? r.roleName ?? r.label ?? "").trim();
      const description = String(r.description ?? "").trim();
      const usersCount = toNumber(r.numberOfUsers ?? r.usersCount ?? r.userCount) ?? 0;

      const isActive =
        typeof r.isActive === "boolean"
          ? (r.isActive as boolean)
          : typeof r.active === "boolean"
            ? (r.active as boolean)
            : true;

      const claimIds: number[] = asArray(r.claimIds)
        .map((x) => toNumber(x))
        .filter((x): x is number => typeof x === "number");

      const permissionsFromStrings: string[] = asArray(r.permissions)
        .map((x) => normalizePermissionId(String(x)))
        .filter(Boolean);

      const permissionIds = permissionsFromStrings.length
        ? permissionsFromStrings
        : claimIds
            .map((cid) => claimIdToPermissionId.get(cid))
            .filter((x): x is string => typeof x === "string");

      if (!id || !name) return null;

      return {
        id,
        name,
        description,
        usersCount,
        isActive,
        permissionIds,
        claimIds,
      } satisfies Role;
    })
    .filter(Boolean) as Role[];
}

export function normalizeRoleById(
  payload: unknown,
  claimIdToPermissionId: Map<number, string>
): Role | null {
  if (!isRecord(payload)) return null;
  const r = payload as Record<string, unknown>;

  const id = String(r.id ?? r.roleId ?? "").trim();
  const name = String(r.name ?? r.roleName ?? "").trim();
  const description = String(r.description ?? "").trim();
  const usersCount = toNumber(r.numberOfUsers ?? r.usersCount ?? r.userCount) ?? 0;
  const isActive = typeof r.isActive === "boolean" ? (r.isActive as boolean) : true;

  const claimIds: number[] = asArray(r.claimIds)
    .map((x) => toNumber(x))
    .filter((x): x is number => typeof x === "number");

  const permissionsFromStrings: string[] = asArray(r.permissions)
    .map((x) => normalizePermissionId(String(x)))
    .filter(Boolean);

  const permissionIds = permissionsFromStrings.length
    ? permissionsFromStrings
    : claimIds
        .map((cid) => claimIdToPermissionId.get(cid))
        .filter((x): x is string => typeof x === "string");

  if (!id || !name) return null;

  return {
    id,
    name,
    description,
    usersCount,
    isActive,
    permissionIds,
    claimIds,
  } satisfies Role;
}

function rolesPaginatedKey(body: RolesPaginatedBody) {
  return [
    ...queryKeys.roles,
    "paginated",
    body.searchTerm ?? "",
    body.sortColumn ?? "",
    body.sortOrder ?? "",
    body.pageNumber ?? 1,
    body.pageSize ?? 50,
  ] as const;
}

export function usePagesWithClaims() {
  return useQuery({
    queryKey: [...queryKeys.roles, "pages-with-claims"],
    queryFn: fetchPagesWithClaimsAction,
    staleTime: 30 * 60 * 1000, 
    gcTime: 60 * 60 * 1000, 
    refetchOnMount: false,
  });
}

export function useRolesPaginated(body: RolesPaginatedBody) {
  return useQuery({
    queryKey: rolesPaginatedKey(body),
    queryFn: () => fetchRolesPaginatedAction(body),
    staleTime: 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
}

export function useRoleById(id: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: [...queryKeys.roles, "by-id", id],
    queryFn: () => fetchRoleByIdAction(id as string | number),
    enabled: Boolean(id) && enabled,
    staleTime: 2 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });
}

export function useAddRoleMutation() {
  const qc = useQueryClient();
  const t = useTranslations("pages.roles.toasts");

  return useMutation({
    mutationFn: (body: AddRoleBody) => addRoleAction(body),
    onSuccess: async (res) => {
      showSuccess(t, "addSuccess", getApiMessage(res));
      await qc.invalidateQueries({ queryKey: [...queryKeys.roles, "paginated"] });
    },
    onError: (error) => {
      showError(t, "addError", getApiMessage(error));
    },
  });
}

export function useUpdateRoleMutation() {
  const qc = useQueryClient();
  const t = useTranslations("pages.roles.toasts");

  return useMutation({
    mutationFn: ({ id, body }: { id: string | number; body: UpdateRoleBody }) =>
      updateRoleAction(id, body),
    onSuccess: async (res, vars) => {
      showSuccess(t, "updateSuccess", getApiMessage(res));
      await Promise.all([
        qc.invalidateQueries({ queryKey: [...queryKeys.roles, "paginated"] }),
        qc.invalidateQueries({ queryKey: [...queryKeys.roles, "by-id", vars.id] }),
      ]);
    },
    onError: (error) => {
      showError(t, "updateError", getApiMessage(error));
    },
  });
}

export function useDeleteRoleMutation() {
  const qc = useQueryClient();
  const t = useTranslations("pages.roles.toasts");

  return useMutation({
    mutationFn: (id: string | number) => deleteRoleAction(id),
    onSuccess: async (res) => {
      showSuccess(t, "deleteSuccess", getApiMessage(res));
      await qc.invalidateQueries({ queryKey: [...queryKeys.roles, "paginated"] });
    },
    onError: (error) => {
      showError(t, "deleteError", getApiMessage(error));
    },
  });
}