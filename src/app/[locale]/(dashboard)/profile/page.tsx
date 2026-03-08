"use client";

import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useActionState, useTransition, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateProfileAction } from "@/features/profile/actions/profile.actions";
import ChangePasswordModal from "@/features/profile/ui/ChangePasswordModal";

const initialState = {
  success: false,
  message: "",
};

export default function ProfilePage() {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const t = useTranslations();

  const [state, formAction] = useActionState(updateProfileAction, initialState);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Title */}{" "}
      <h1 className="text-2xl font-semibold">{t("pages.profile.Profile")} </h1>
      {/* Profile Card */}
      <Card className="p-6 flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center">
          <User size={40} />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {user?.fullName || "Admin User"}
          </h2>

          <p className="text-sm text-muted-foreground">{user?.email}</p>

          <p className="text-sm text-muted-foreground">{user?.role}</p>
        </div>
      </Card>
      {/* Account Info */}
      <Card className="p-6 space-y-6">
        <h2 className="text-lg font-semibold">{t("pages.profile.Account")}</h2>

        <form
          action={(formData) => {
            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="fullName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
              label={t("pages.profile.Full Name")}
              defaultValue={user?.fullName}
            />

            <Input
              name="phoneNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
              label={t("pages.profile.Phone Number")}
              defaultValue={user?.phoneNumber}
            />

            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
              label={t("pages.profile.Role")}
              defaultValue={user?.role}
              disabled
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
            className="cursor-pointer"
              variant="outline"
              onClick={() => setOpenPasswordModal(true)}
            >
              {t("pages.profile.Change Password")}
            </Button>
          </div>
        </form>
      </Card>
      <ChangePasswordModal
        open={openPasswordModal}
        onOpenChange={setOpenPasswordModal}
      />
    </div>
  );
}
