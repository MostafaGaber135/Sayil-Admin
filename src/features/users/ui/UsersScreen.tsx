"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import ConfirmDialog from "@/shared/components/modals/ConfirmDialog";
import type { ManagedUser, PaginatedMeta, UsersScreenLabels, UserSegment } from "../types";
import { useUsersScreen } from "../hooks/users.hooks";
import UserFormDialog from "./UserFormDialog";
import UsersTable from "./UsersTable";
import UsersToolbar from "./UsersToolbar";
import UsersPagination from "./Userspagination";


export type UsersScreenProps = {
  title: string;
  description: string;
  labels: UsersScreenLabels;
  initialUsers: ManagedUser[];
  pagination: PaginatedMeta;
  currentTab: UserSegment;
  currentPage: number;
  currentSearch: string;
};

export default function UsersScreen({
  title,
  description,
  labels,
  initialUsers,
  pagination,
  currentTab,
  currentPage,
  currentSearch,
}: UsersScreenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startNavTransition] = useTransition();

  // ── URL helpers ──
  const pushParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") params.delete(key);
        else params.set(key, value);
      }
      startNavTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [pathname, router, searchParams]
  );

  const handleTabChange = (tab: UserSegment) => {
    pushParams({ tab, page: "1", search: undefined });
  };

  const [searchInput, setSearchInput] = useState(currentSearch);
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      const timer = setTimeout(() => {
        pushParams({ search: value || undefined, page: "1" });
      }, 400);
      return () => clearTimeout(timer);
    },
    [pushParams]
  );

  // ── Hook ──
  const {
    formOpen,
    formMode,
    selectedUser,
    deleteUser,
    statusUser,
    isPending,
    actionError,
    setFormOpen,
    setDeleteUser,
    setStatusUser,
    openAddForm,
    openEditForm,
    handleAddInternal,
    handleEditInternal,
    handleAddExternal,
    handleEditExternal,
    handleDelete,
    handleStatusChange,
  } = useUsersScreen({ initialUsers, initialSegment: currentTab });

  const isDeactivateAction = statusUser?.status === "active";

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {actionError}
        </div>
      )}

      <UsersToolbar
        title={title}
        description={description}
        addUserLabel={labels.addUser}
        internalUsersLabel={labels.internalUsers}
        externalUsersLabel={labels.externalUsers}
        searchPlaceholder={labels.searchPlaceholder}
        activeTab={currentTab}
        search={searchInput}
        onTabChange={handleTabChange}
        onSearchChange={handleSearchChange}
        onAddUser={openAddForm}
      />

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[24px] bg-white/60 backdrop-blur-[2px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#3C71FF] border-t-transparent" />
          </div>
        )}
        <UsersTable
          users={initialUsers}
          labels={labels}
          onEdit={openEditForm}
          onToggleStatus={setStatusUser}
          onDelete={setDeleteUser}
        />
      </div>

      <UsersPagination meta={pagination} />

      <UserFormDialog
        open={formOpen}
        mode={formMode}
        segment={currentTab}
        selectedUser={selectedUser}
        labels={labels}
        isPending={isPending}
        actionError={actionError}
        onOpenChange={setFormOpen}
        onAddInternal={handleAddInternal}
        onEditInternal={handleEditInternal}
        onAddExternal={handleAddExternal}
        onEditExternal={handleEditExternal}
      />

      <ConfirmDialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
        title={labels.deleteDialog.title}
        description={labels.deleteDialog.description}
        cancelText={labels.deleteDialog.cancel}
        confirmText={labels.deleteDialog.confirm}
        onConfirm={handleDelete}
      />

      <ConfirmDialog
        open={!!statusUser}
        onOpenChange={(open) => !open && setStatusUser(null)}
        title={isDeactivateAction ? labels.deactivateDialog.deactivateTitle : labels.deactivateDialog.activateTitle}
        description={isDeactivateAction ? labels.deactivateDialog.deactivateDescription : labels.deactivateDialog.activateDescription}
        cancelText={labels.deactivateDialog.cancel}
        confirmText={isDeactivateAction ? labels.deactivateDialog.confirmDeactivate : labels.deactivateDialog.confirmActivate}
        confirmVariant="default"
        onConfirm={handleStatusChange}
      />
    </div>
  );
}