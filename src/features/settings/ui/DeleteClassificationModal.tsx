"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useTransition, useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { deleteLandClassificationAction } from "../actions/land-classification.actions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: number;
};

const initialState = {
  success: false,
  message: "",
};

export default function DeleteClassificationModal({
  open,
  onOpenChange,
  id,
}: Props) {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    deleteLandClassificationAction,
    initialState
  );

  /* ================= Toast + Refresh ================= */

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });

      onOpenChange(false);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  /* ================= Submit ================= */

  const handleDelete = () => {
    if (!id) return;

    const formData = new FormData();
    formData.set("id", String(id));

    startTransition(() => {
      formAction(formData);
    });
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("pages.settings.delete?")}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {t("pages.settings.This action")}
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("pages.settings.Cancel")}
          </Button>

          <Button
            className="cursor-pointer"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending
              ? t("pages.settings.Deleting")
              : t("pages.settings.Delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}