"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useDeleteFaq } from "../hooks/settings.hooks";

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
  const { mutate, isPending } = useDeleteFaq();

  const handleDelete = () => {
    if (!id) return;

    mutate(id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this FAQ?
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-3 mt-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}