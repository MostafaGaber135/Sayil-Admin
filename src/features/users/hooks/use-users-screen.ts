"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ManagedUser, UserFormMode, UserSegment } from "../types";
import { ROLE_NAME_TO_ID } from "../types";
import type {
  AddInternalFormValues,
  EditInternalFormValues,
  AddExternalFormValues,
  EditExternalFormValues,
} from "../validation/user.validation";
import {
  addInternalUser,
  addExternalUser,
  updateInternalUser,
  updateExternalUser,
  deleteUser,
  toggleUserStatus,
} from "../actions";

type UseUsersScreenOptions = {
  initialUsers: ManagedUser[];
  initialSegment?: UserSegment;
};

export function useUsersScreen({
  initialUsers,
  initialSegment = "internal",
}: UseUsersScreenOptions) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<UserFormMode>("add");
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);
  const [statusTarget, setStatusTarget] = useState<ManagedUser | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);


  
  const run = (action: () => Promise<void>, onSuccess?: () => void) => {
    setActionError(null);
    startTransition(async () => {
      try {
        await action();
        onSuccess?.();
        router.refresh();
      } catch (err) {
        setActionError(
          err instanceof Error ? err.message : "حدث خطأ غير متوقع"
        );
      }
    });
  };

  // ── Open Helpers ────────────────────────────────────────────── ────────────
  const openAddForm = () => {
    setFormMode("add");
    setSelectedUser(null);
    setActionError(null);
    setFormOpen(true);
  };

  const openEditForm = (user: ManagedUser) => {
    setFormMode("edit");
    setSelectedUser(user);
    setActionError(null);
    setFormOpen(true);
  };

  const handleAddInternal = (values: AddInternalFormValues) =>
    run(
      () =>
        addInternalUser({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          roles: [ROLE_NAME_TO_ID[values.role] ?? 1],
        }),
      () => setFormOpen(false)
    );

  const handleEditInternal = (values: EditInternalFormValues) => {
    if (!selectedUser) return;
    run(
      () =>
        updateInternalUser({
          id: selectedUser.id,
          email: values.email,
          name: values.fullName,
          phone: values.phoneNumber,
          nationalId: values.nationalId,
          roles: [ROLE_NAME_TO_ID[values.role] ?? 1],
          resetPassword: values.resetPassword,
          password: values.password ?? "",
        }),
      () => setFormOpen(false)
    );
  };

  const handleAddExternal = (values: AddExternalFormValues) =>
    run(
      () =>
        addExternalUser({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          dateOfBirth: values.dateOfBirth
            ? new Date(values.dateOfBirth).toISOString()
            : new Date().toISOString(),
          genderId: Number(values.genderId) || 1,
        }),
      () => setFormOpen(false)
    );

  const handleEditExternal = (values: EditExternalFormValues) => {
    if (!selectedUser) return;
    run(
      () =>
        updateExternalUser({
          id: selectedUser.id,
          email: values.email,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          dateOfBirth: values.dateOfBirth
            ? new Date(values.dateOfBirth).toISOString()
            : new Date().toISOString(),
          genderId: Number(values.genderId) || 1,
          password: "",
        }),
      () => setFormOpen(false)
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    run(
      () => deleteUser(deleteTarget.id),
      () => setDeleteTarget(null)
    );
  };

  const handleStatusChange = () => {
    if (!statusTarget) return;
    run(
      () => toggleUserStatus(statusTarget.id),
      () => setStatusTarget(null)
    );
  };

  return {
    // state
    formOpen,
    formMode,
    selectedUser,
    deleteUser: deleteTarget,
    statusUser: statusTarget,
    isPending,
    actionError,
    // setters
    setFormOpen,
    setDeleteUser: setDeleteTarget,
    setStatusUser: setStatusTarget,
    // handlers
    openAddForm,
    openEditForm,
    handleAddInternal,
    handleEditInternal,
    handleAddExternal,
    handleEditExternal,
    handleDelete,
    handleStatusChange,
  };
}