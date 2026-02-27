"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

import {
  useCreateLandClassification,
  useUpdateLandClassification,
} from "../hooks/settings.hooks";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
};

export default function AddClassificationModal({
  open,
  onOpenChange,
  editData,
}: Props) {
  const [code, setCode] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [discount, setDiscount] = useState("");

  const { mutate: createClassification, isPending: creating } =
    useCreateLandClassification();

  const { mutate: updateClassification, isPending: updating } =
    useUpdateLandClassification();

  const isEditMode = !!editData;

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

  const resetForm = () => {
    setCode("");
    setNameAr("");
    setNameEn("");
    setDiscount("");
  };

  /* ================= SAVE ================= */

  const handleSave = () => {
    // ✅ fallback logic
    const finalNameAr = nameAr || nameEn;
    const finalNameEn = nameEn || nameAr;

    if (!code || !finalNameAr || !finalNameEn || !discount) {
      alert("All fields are required");
      return;
    }

    const payload = {
      code: code.toUpperCase(),
      name: finalNameEn, // backend required
      nameAr: finalNameAr,
      nameEn: finalNameEn,
      discountPercent: Number(discount),
    };

    if (isEditMode) {
      updateClassification(
        {
          id: editData.id,
          data: {
            id: editData.id,
            ...payload,
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    } else {
      createClassification(payload, {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
        },
      });
    }
  };

  const isPending = creating || updating;

  /* ================= UI ================= */

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>
            {isEditMode ? "Edit Classification" : "Add Classification"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* CODE */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={1}
            label="Classification Code"
            placeholder="Enter code (A, B, C)..."
          />

          {/* NAME */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            label="English Name"
            placeholder="Enter classification name..."
          />

       

          {/* DISCOUNT */}
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
            label="Discount (%)"
            placeholder="Enter discount percentage..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter discount percentage (0-100)
          </p>
          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Button
              disabled={isPending}
              onClick={handleSave}
              className="cursor-pointer"
            >
              {isPending ? "Saving..." : isEditMode ? "Update" : "Save Changes"}
            </Button>

            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
