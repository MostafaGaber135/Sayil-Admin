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
import { Props } from "../types";
import { classificationFormSchema } from "../validation/land-class.validation";

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

  const [errors, setErrors] = useState<{
    code?: string;
    nameEn?: string;
    nameAr?: string;
    discountPercent?: string;
  }>({});

  const [isPending, startTransition] = useTransition();

  const isEditMode = !!editData;

  const action = isEditMode
    ? updateLandClassificationAction
    : createLandClassificationAction;

  const [state, formAction] = useActionState(action, initialState);

  const t = useTranslations("pages.settings");

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
    setErrors({});
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

    const validation = classificationFormSchema(t).safeParse({
      code,
      nameEn: finalNameEn,
      nameAr: finalNameAr,
      discountPercent: discount,
    });

    if (!validation.success) {
      const fieldErrors: any = {};

      validation.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const data = validation.data;

    formData.set("code", data.code);
    formData.set("nameAr", data.nameAr);
    formData.set("nameEn", data.nameEn);
    formData.set("discountPercent", String(data.discountPercent));

    if (isEditMode) {
      formData.set("id", editData.id);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

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
          className="space-y-4 mt-4"
        >
          {/* CODE */}
          <div>
            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setErrors((prev) => ({ ...prev, code: undefined }));
              }}
              maxLength={1}
              label={t("Classification Code")}
              placeholder={t("Enter code (A, B, C)")}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          {/* NAME EN */}
          <div>
            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              value={nameEn}
              onChange={(e) => {
                setNameEn(e.target.value);
                setErrors((prev) => ({ ...prev, nameEn: undefined }));
              }}
              label={t("English Name")}
              placeholder={t("Enter classification name")}
            />
            {errors.nameEn && (
              <p className="text-red-500 text-sm mt-1">{errors.nameEn}</p>
            )}
          </div>

          {/* NAME AR */}
          <div>
            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              value={nameAr}
              onChange={(e) => {
                setNameAr(e.target.value);
                setErrors((prev) => ({ ...prev, nameAr: undefined }));
              }}
              label={t("Arabic Name")}
              placeholder={t("Enter Arabic name")}
            />
            {errors.nameAr && (
              <p className="text-red-500 text-sm mt-1">{errors.nameAr}</p>
            )}
          </div>

          {/* DISCOUNT */}
          <div>
            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
                setErrors((prev) => ({ ...prev, discount: undefined }));
              }}
              type="number"
              label={t("Discount")}
              placeholder={t("Enter discount percentage")}
            />
            {errors.discountPercent && (
              <p className="text-red-500 text-sm mt-1">{errors.discountPercent}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {t("Enter discount percentage")} (1-100)
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              className=" cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("Cancel")}
            </Button>

            <Button
              className=" cursor-pointer"
              type="submit"
              disabled={isPending}
            >
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
