"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteLandClassification } from "../hooks/settings.hooks";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: number;
};

export default function DeleteClassificationModal({
  open,
  onOpenChange,
  id,
}: Props) {
  const { mutate: deleteClassification, isPending } =
    useDeleteLandClassification();

  const handleDelete = () => {
    if (!id) return;

    deleteClassification(id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };
  const t = useTranslations();

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
            className=" cursor-pointer"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("pages.settings.Cancel")}
          </Button>

          <Button
            className=" cursor-pointer"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? t("pages.settings.Deleting") : t("pages.settings.Delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
