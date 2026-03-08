"use client";

import ConfirmDialog from "@/shared/components/modals/ConfirmDialog";
import type { UsersScreenLabels } from "../types";
import { useUsersScreen } from "../hooks/users.hooks";
import UserFormDialog from "./UserFormDialog";
import UsersTable from "./UsersTable";
import UsersToolbar from "./UsersToolbar";

export type UsersScreenProps = {
  title: string;
  description: string;
  labels: UsersScreenLabels;
};

export default function UsersScreen({
  title,
  description,
  labels,
}: UsersScreenProps) {
  const {
    activeTab,
    search,
    filteredUsers,
    formOpen,
    formMode,
    deleteUser,
    statusUser,
    form,
    setActiveTab,
    setSearch,
    setFormOpen,
    setDeleteUser,
    setStatusUser,
    handleFormChange,
    openAddForm,
    openEditForm,
    handleSave,
    handleDelete,
    handleStatusChange,
  } = useUsersScreen();

  const isDeactivateAction = statusUser?.status === "active";

  return (
    <div className="space-y-4">
      <UsersToolbar
        title={title}
        description={description}
        addUserLabel={labels.addUser}
        internalUsersLabel={labels.internalUsers}
        externalUsersLabel={labels.externalUsers}
        searchPlaceholder={labels.searchPlaceholder}
        activeTab={activeTab}
        search={search}
        onTabChange={setActiveTab}
        onSearchChange={setSearch}
        onAddUser={openAddForm}
      />

      <UsersTable
        users={filteredUsers}
        labels={labels}
        onEdit={openEditForm}
        onToggleStatus={setStatusUser}
        onDelete={setDeleteUser}
      />

      <UserFormDialog
        open={formOpen}
        mode={formMode}
        segment={activeTab}
        form={form}
        labels={labels}
        onOpenChange={setFormOpen}
        onChange={handleFormChange}
        onSave={handleSave}
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
        title={
          isDeactivateAction
            ? labels.deactivateDialog.deactivateTitle
            : labels.deactivateDialog.activateTitle
        }
        description={
          isDeactivateAction
            ? labels.deactivateDialog.deactivateDescription
            : labels.deactivateDialog.activateDescription
        }
        cancelText={labels.deactivateDialog.cancel}
        confirmText={
          isDeactivateAction
            ? labels.deactivateDialog.confirmDeactivate
            : labels.deactivateDialog.confirmActivate
        }
        confirmVariant="default"
        onConfirm={handleStatusChange}
      />
    </div>
  );
}