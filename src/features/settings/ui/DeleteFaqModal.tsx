"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useActionState, useTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { deleteFaqAction } from "../actions/faq.action";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: number;
};

export default function DeleteFaqModal({
  open,
  onOpenChange,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(
    deleteFaqAction,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      onOpenChange(false);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleDelete = () => {
    if (!id) return;

    const formData = new FormData();
    formData.set("id", String(id));

    startTransition(() => {
      formAction(formData);
    });
  };
  const t = useTranslations("pages.settings");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
           {t("Delete FAQ")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-3 mt-4">
          <Button
          className="cursor-pointer"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? t("Deleting") : t("Delete")}
          </Button>

          <Button
          className="cursor-pointer"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("Cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}