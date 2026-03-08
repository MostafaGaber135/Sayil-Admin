"use client";

import { useEffect, useState, useTransition, useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { addFaqAction } from "../actions/faq.action";
import { updateFaqAction } from "../actions/faq.action";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
};

export default function AddFaqModal({ open, onOpenChange, editData }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations("pages.settings");
  const [questionEn, setQuestionEn] = useState("");
  const [questionAr, setQuestionAr] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerAr, setAnswerAr] = useState("");

  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    message: "",
  };

  const action = editData ? updateFaqAction : addFaqAction;

  const [state, formAction] = useActionState(action, initialState);

  /* =============================
     Fill form when editing
  ==============================*/

  useEffect(() => {
    if (editData) {
      setQuestionEn(editData.questionEn || "");
      setQuestionAr(editData.questionAr || "");
      setAnswerEn(editData.answerEn || "");
      setAnswerAr(editData.answerAr || "");
    } else {
      resetForm();
    }
  }, [editData]);

  const resetForm = () => {
    setQuestionEn("");
    setQuestionAr("");
    setAnswerEn("");
    setAnswerAr("");
  };

  /* =============================
     Toast + Refresh
  ==============================*/

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      onOpenChange(false);
      resetForm();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  /* =============================
        SAVE HANDLER
  ==============================*/

  const handleSave = () => {
    const formData = new FormData();

    if (editData) {
      formData.set("id", editData.id);
    }

    formData.set("questionEn", questionEn);
    formData.set("questionAr", questionAr || questionEn);
    formData.set("answerEn", answerEn);
    formData.set("answerAr", answerAr || answerEn);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editData ? t("Edit FAQ") : t("Add FAQ")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            label={t("Question EN")}
            placeholder={t("Enter your question")}
            value={questionEn}
            onChange={(e) => setQuestionEn(e.target.value)}
          />

          <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            label={t("Question AR")}
            placeholder={t("Enter your question")}
            value={questionAr}
            onChange={(e) => setQuestionAr(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium mb-2">{t("Answer EN")}</label>

            <textarea
              placeholder={t("Enter your question")}
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("Answer AR")}</label>

            <textarea
              placeholder={t("Enter your question")}
              value={answerAr}
              onChange={(e) => setAnswerAr(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="cursor-pointer" onClick={handleSave} disabled={isPending}>
              {isPending ? t("Saving") : editData ? t("Update") : t("Add FAQ")}
            </Button>

            <Button
            className="cursor-pointer"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              {t("Cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
