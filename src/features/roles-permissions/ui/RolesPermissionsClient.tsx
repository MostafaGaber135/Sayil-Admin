"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import LoadingState from "@/shared/ui/LoadingState";
import type { Role, RolesPaginatedBody } from "../types";
import {
  buildPermissionsFromPages,
  normalizeRoleById,
  normalizeRoles,
  usePagesWithClaims,
  useRoleActions,
  useRoleById,
  useRolesPaginated,
} from "../hooks/roles.hooks";
import RoleCard from "./RoleCard";
import RoleFormDialog from "./RoleFormDialog";

export default function RolesPermissionsClient({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const t = useTranslations();

  const pagesQuery = usePagesWithClaims();

  const { permissions, claimIdToPermissionId, permissionIdToClaimId } = useMemo(() => {
    const payload = pagesQuery.data?.data;
    return buildPermissionsFromPages(payload);
  }, [pagesQuery.data]);

  const rolesQueryBody = useMemo<RolesPaginatedBody>(
    () => ({
      searchTerm: "",
      sortColumn: "name",
      sortOrder: "asc",
      pageNumber: 1,
      pageSize: 100,
    }),
    []
  );

  const rolesQuery = useRolesPaginated(rolesQueryBody);
  const roles: Role[] = useMemo(() => {
    const payload = rolesQuery.data?.data;
    return normalizeRoles(payload, claimIdToPermissionId);
  }, [rolesQuery.data, claimIdToPermissionId]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  const roleByIdQuery = useRoleById(activeRoleId, dialogOpen && dialogMode === "edit");

  const activeRole = useMemo(() => {
    if (dialogMode !== "edit" || !activeRoleId) return null;
    const payload = roleByIdQuery.data?.data;
    const normalized = normalizeRoleById(payload, claimIdToPermissionId);
    return normalized ?? roles.find((r) => r.id === activeRoleId) ?? null;
  }, [dialogMode, activeRoleId, roleByIdQuery.data, claimIdToPermissionId, roles]);

  const { addRole, updateRole, deleteRole } = useRoleActions();

  const isPageLoading = pagesQuery.isLoading || rolesQuery.isLoading;

  const openCreate = useCallback(() => {
    setDialogMode("create");
    setActiveRoleId(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((role: Role) => {
    setDialogMode("edit");
    setActiveRoleId(role.id);
    setDialogOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (payload: { name: string; description: string; permissionIds: string[] }) => {
      const claimIds = payload.permissionIds
        .map((pid) => permissionIdToClaimId.get(pid))
        .filter((x): x is number => typeof x === "number");

      if (dialogMode === "create") {
        await addRole({
          roleName: payload.name,
          description: payload.description,
          claimIds,
          isActive: true,
        });
        return;
      }

      if (!activeRole) return;

      const roleIdNum = Number(activeRole.id);

      await updateRole({
        id: activeRole.id,
        body: {
          roleId: Number.isFinite(roleIdNum) ? roleIdNum : 0,
          roleName: payload.name,
          description: payload.description,
          claimIds,
          isActive: true,
        },
      });
    },
    [permissionIdToClaimId, dialogMode, addRole, updateRole, activeRole]
  );

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="text-2xl font-semibold tracking-tight">{title}</div>
          {description ? (
            <div className="mt-1 text-sm text-muted-foreground">{description}</div>
          ) : null}
        </div>

        <Button
          onClick={openCreate}
          disabled={isPageLoading}
          className="w-full bg-blue-600 hover:bg-blue-600/90 cursor-pointer sm:w-auto"
        >
          <Plus className="size-4" />
          {t("pages.roles.actions.addNewRole")}
        </Button>
      </div>

      {isPageLoading ? (
        <div className="mt-6 rounded-xl border bg-card px-4">
          <LoadingState />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
          {roles.map((role) => (
            <div
              key={role.id}
              className={cn(role.id === "viewer" ? "xl:col-start-1" : "", "h-full")}
            >
              <RoleCard
                role={role}
                permissions={permissions}
                onEdit={openEdit}
                onDelete={async (r) => {
                  await deleteRole(r.id);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <RoleFormDialog
        open={dialogOpen}
        mode={dialogMode}
        role={activeRole}
        permissions={permissions}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}