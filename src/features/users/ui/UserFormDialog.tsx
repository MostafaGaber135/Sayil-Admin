"use client";

import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { UserPlus } from "lucide-react";
import type { ManagedUser, UserFormMode, UserSegment, UsersScreenLabels } from "../types";
import { ExternalUserFields, InternalUserFields } from "./UserFormFields";

export type UserFormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  password: string;
};

export const emptyUserForm: UserFormState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  department: "",
  location: "",
  password: "",
};

export function buildUserFormState(user?: ManagedUser): UserFormState {
  if (!user) return emptyUserForm;

  return {
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    department: user.department ?? "",
    location: user.location ?? "",
    password: "",
  };
}

export type UserFormDialogProps = {
  open: boolean;
  mode: UserFormMode;
  segment: UserSegment;
  form: UserFormState;
  labels: UsersScreenLabels;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof UserFormState, value: string) => void;
  onSave: () => void;
};

export default function UserFormDialog({
  open,
  mode,
  segment,
  form,
  labels,
  onOpenChange,
  onChange,
  onSave,
}: UserFormDialogProps) {

  const dialogTitle = useMemo(
    () => (mode === "add" ? labels.form.addTitle : labels.form.editTitle),
    [labels.form.addTitle, labels.form.editTitle, mode]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-[840px] gap-0 overflow-hidden rounded-[22px] border-0 p-0 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
      >
        <DialogHeader className="flex-row items-center gap-4 border-b border-[#E4E7EC] px-7 py-6">
          <div className="flex size-10 items-center justify-center rounded-[12px] bg-[#3C71FF] text-white">
            <UserPlus className="size-5" />
          </div>
          <DialogTitle className="text-[20px] font-semibold text-[#2A3558]">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="px-7 py-6">
          <div className="mb-5 text-[17px] font-semibold text-[#111827]">
            {labels.form.personalInformation}
          </div>

          <div className="space-y-4">
            {segment === "internal" ? (
              <InternalUserFields
                form={form}
                mode={mode}
                labels={labels}
                onChange={onChange}
              />
            ) : (
              <ExternalUserFields form={form} labels={labels} onChange={onChange} />
            )}
          </div>

          <div className="mt-6 border-t border-[#E4E7EC] pt-5">
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer h-11 rounded-[12px] bg-[#F2F4F7] px-5 text-[12px] font-medium text-[#344054] hover:bg-[#EAECEF]"
              >
                {labels.form.cancel}
              </Button>
              <Button
                onClick={onSave}
                className="cursor-pointer h-11 rounded-[12px] bg-[#3C71FF] px-5 text-[12px] font-medium text-white hover:bg-[#3364E6]"
              >
                {labels.form.save}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}