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
} from  "../validation/user.validation";
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

  // ── Open helpers ──
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

  // ── Submit handlers (called by RHF after validation passes) ──

  const handleAddInternal = (values: AddInternalFormValues) => {
    startTransition(async () => {
      try {
        await addInternalUser({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          roles: [ROLE_NAME_TO_ID[values.role] ?? 1],
        });
        setFormOpen(false);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  const handleEditInternal = (values: EditInternalFormValues) => {
    if (!selectedUser) return;
    startTransition(async () => {
      try {
        await updateInternalUser({
          id: selectedUser.id,
          email: values.email,
          name: values.fullName,
          phone: values.phoneNumber,
          nationalId: values.nationalId,
          roles: [ROLE_NAME_TO_ID[values.role] ?? 1],
          resetPassword: values.resetPassword,
          password: values.password ?? "",
        });
        setFormOpen(false);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  const handleAddExternal = (values: AddExternalFormValues) => {
    startTransition(async () => {
      try {
        await addExternalUser({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          dateOfBirth: values.dateOfBirth
            ? new Date(values.dateOfBirth).toISOString()
            : new Date().toISOString(),
          genderId: Number(values.genderId) || 1,
        });
        setFormOpen(false);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  const handleEditExternal = (values: EditExternalFormValues) => {
    if (!selectedUser) return;
    startTransition(async () => {
      try {
        await updateExternalUser({
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
        });
        setFormOpen(false);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  // ── Delete ──
  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteUser(deleteTarget.id);
        setDeleteTarget(null);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
        setDeleteTarget(null);
      }
    });
  };

  // ── Toggle status ──
  const handleStatusChange = () => {
    if (!statusTarget) return;
    startTransition(async () => {
      try {
        await toggleUserStatus(statusTarget.id);
        setStatusTarget(null);
        router.refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Something went wrong");
        setStatusTarget(null);
      }
    });
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