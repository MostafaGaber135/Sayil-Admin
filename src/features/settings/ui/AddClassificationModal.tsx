"use client";

import React, {
  useEffect,
  useState,
  useTransition,
  useActionState,
} from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import {
  createLandClassificationAction,
  updateLandClassificationAction,
} from "../actions/land-classification.actions";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
};

const initialState = {
  success: false,
  message: "",
};

export default function AddClassificationModal({
  open,
  onOpenChange,
  editData,
}: Props) {
  const queryClient = useQueryClient();

  const [code, setCode] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [discount, setDiscount] = useState("");

  const [isPending, startTransition] = useTransition();

  const isEditMode = !!editData;

  const action = isEditMode
    ? updateLandClassificationAction
    : createLandClassificationAction;

  const [state, formAction] = useActionState(action, initialState);

  /* ================= Fill Edit Data ================= */

  useEffect(() => {
    if (editData) {
      setCode(editData.code ?? "");
      setNameAr(editData.nameAr ?? "");
      setNameEn(editData.nameEn ?? "");
      setDiscount(String(editData.discountPercent ?? ""));
    } else {
      resetForm();
    }
  }, [editData]);

  /* ================= Reset ================= */

  const resetForm = () => {
    setCode("");
    setNameAr("");
    setNameEn("");
    setDiscount("");
  };

  /* ================= Toast + Refresh ================= */

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });

      onOpenChange(false);
      resetForm();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  /* ================= Submit ================= */

  const handleSubmit = (formData: FormData) => {
    const finalNameAr = nameAr || nameEn;
    const finalNameEn = nameEn || nameAr;

    if (!code || !finalNameAr || !finalNameEn || !discount) {
      toast.error("All fields are required");
      return;
    }

    formData.set("code", code.toUpperCase());
    formData.set("nameAr", finalNameAr);
    formData.set("nameEn", finalNameEn);
    formData.set("name", finalNameEn);
    formData.set("discountPercent", discount);

    if (isEditMode) {
      formData.set("id", editData.id);
    }

    startTransition(() => {
      formAction(formData);
    });
  };
  const t = useTranslations("pages.settings");
  /* ================= UI ================= */

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-md gap-0">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>
            {isEditMode ? "Edit Classification" : "Add Classification"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className="space-y-3 sm:space-y-4 mt-3 sm:mt-4"
        >
          {/* CODE */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={1}
            label={t("Classification Code")}
            placeholder={t("Enter code (A, B, C)")}
          />

          {/* NAME EN */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            label={t("English Name")}
            placeholder={t("Enter classification name")}
          />

          {/* NAME AR */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            label={t("Arabic Name")}
            placeholder={t("Enter Arabic name")}
          />

          {/* DISCOUNT */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
            label={t("Discount")}
            placeholder={t("Enter discount percentage")}
          />

          <p className="text-xs sm:text-sm text-gray-500">
            {t("Enter discount percentage")} (0-100)
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
            className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("Cancel")}
            </Button>

            <Button className="cursor-pointer w-full sm:w-auto" type="submit" disabled={isPending}>
              {isPending
                ? t("Saving")
                : isEditMode
                  ? t("Update")
                  : t("Save Changes")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
