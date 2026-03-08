"use client";

import { useState, useTransition, useActionState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { toast } from "react-toastify";
import { changePasswordAction } from "../actions/profile.actions";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const initialState = {
  success: false,
  message: "",
};

export default function ChangePasswordModal({ open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    changePasswordAction,
    initialState,
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      onOpenChange(false);
      toast.success(state.message)
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error(t("All fields are required"));
      return;
    }

    formData.set("currentPassword", currentPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmNewPassword", confirmNewPassword);

    startTransition(() => {
      formAction(formData);
    });
  };
const t = useTranslations("pages.profile")
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {" "}
      <DialogContent className="sm:max-w-md">
        {" "}
        <DialogHeader className="border-b pb-3">
          {" "}
          <DialogTitle>{t("Change Password")}</DialogTitle>{" "}
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 mt-4">
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            type="password"
            label={t("Current Password")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            type="password"
            label={t("New Password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            type="password"
            label={t("Confirm")}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button
            className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("Cancel")}
            </Button>

            <Button className="cursor-pointer" type="submit" disabled={isPending}>
              {isPending ? t("Saving") : t("Change Password")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
