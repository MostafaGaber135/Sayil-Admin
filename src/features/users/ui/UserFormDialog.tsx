"use client";

import { useMemo } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import type { ManagedUser, UserFormMode, UserSegment, UsersScreenLabels } from "../types";
import { 
  addInternalSchema, editInternalSchema, 
  addExternalSchema, editExternalSchema 
} from "../validation/user.validation";
import { UnifiedUserForm } from "./UnifiedUserForm"; 

const FORM_ID = "user-form";

export type UserFormDialogProps = {
  open: boolean;
  mode: UserFormMode;
  segment: UserSegment;
  selectedUser: ManagedUser | null;
  labels: UsersScreenLabels;
  isPending: boolean;
  actionError: string | null;
  onOpenChange: (open: boolean) => void;
  onAddInternal: (values: any) => void;
  onEditInternal: (values: any) => void;
  onAddExternal: (values: any) => void;
  onEditExternal: (values: any) => void;
};

export default function UserFormDialog({
  open, mode, segment, selectedUser, labels, isPending, actionError,
  onOpenChange, onAddInternal, onEditInternal, onAddExternal, onEditExternal,
}: UserFormDialogProps) {
  
  const isEdit = mode === "edit";

  const schema = useMemo(() => {
    if (segment === "internal") return isEdit ? editInternalSchema : addInternalSchema;
    return isEdit ? editExternalSchema : addExternalSchema;
  }, [segment, isEdit]);

  const handleSubmit = (values: any) => {
    if (segment === "internal") {
      isEdit ? onEditInternal(values) : onAddInternal(values);
    } else {
      isEdit ? onEditExternal(values) : onAddExternal(values);
    }
  };

  const formDefaults = useMemo(() => {
    if (!isEdit || !selectedUser) return undefined;
    const baseDefaults = {
      fullName: selectedUser.name ?? "",
      email: selectedUser.email ?? "",
      phoneNumber: selectedUser.phone ?? "",
      nationalId: selectedUser.nationalId ?? "",
      role: selectedUser.role,
    };

    if (segment === "internal") {
      return {
        ...baseDefaults,
        department: selectedUser.department ?? "",
        resetPassword: false,
        password: "",
      };
    }
    return {
      ...baseDefaults,
      location: selectedUser.location ?? "",
      dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth.split("T")[0] : "",
      genderId: String(selectedUser.genderId ?? "1"),
    };
  }, [selectedUser, segment, isEdit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-[840px] gap-0 overflow-y-auto overflow-x-hidden rounded-[22px] border-0 p-0 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
      >
        <DialogHeader className="flex-row items-center gap-4 border-b border-[#E4E7EC] px-7 py-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#3C71FF] text-white">
            <UserPlus className="size-5" />
          </div>
          <DialogTitle className="text-[20px] font-semibold text-[#2A3558]">
            {isEdit ? labels.form.editTitle : labels.form.addTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="px-7 py-6">
          <p className="mb-5 text-[17px] font-semibold text-[#111827]">
            {labels.form.personalInformation}
          </p>

          {actionError && (
            <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
              {actionError}
            </div>
          )}

          <UnifiedUserForm
            type={segment}
            labels={labels}
            onSubmit={handleSubmit}
            formId={FORM_ID}
            defaultValues={formDefaults}
            schema={schema}
            isPending={isPending} 
          />

          <div className="mt-6 border-t border-[#E4E7EC] pt-5">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                className="h-11 rounded-[12px] bg-[#F2F4F7] px-5 text-[12px] font-medium text-[#344054] hover:bg-[#EAECEF]"
              >
                {labels.form.cancel}
              </Button>

              <Button
                type="submit"
                form={FORM_ID} 
                disabled={isPending}
                className="h-11 min-w-[90px] rounded-[12px] bg-[#3C71FF] px-5 text-[12px] font-medium text-white hover:bg-[#3364E6] disabled:opacity-60"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </span>
                ) : (
                  labels.form.save
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}