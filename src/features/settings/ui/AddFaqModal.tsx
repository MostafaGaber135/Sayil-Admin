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
import { z } from "zod";

import { addFaqAction, updateFaqAction } from "../actions/faq.action";
import { useTranslations } from "next-intl";
import { faqSchema } from "../validation/faq.validation";

/* ================= ZOD SCHEMA ================= */



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

  const [errors, setErrors] = useState<any>({});

  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    message: "",
  };

  const action = editData ? updateFaqAction : addFaqAction;

  const [state, formAction] = useActionState(action, initialState);

  /* ================= Fill form when editing ================= */

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
    setErrors({});
  };

  /* ================= Toast + Refresh ================= */

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

  /* ================= SAVE HANDLER ================= */

  const handleSave = () => {
    const validation = faqSchema(t).safeParse({
      questionEn,
      questionAr: questionAr || questionEn,
      answerEn,
      answerAr: answerAr || answerEn,
    });

    if (!validation.success) {
      const fieldErrors: any = {};

      validation.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const data = validation.data;

    const formData = new FormData();

    if (editData) {
      formData.set("id", editData.id);
    }

    formData.set("questionEn", data.questionEn);
    formData.set("questionAr", data.questionAr);
    formData.set("answerEn", data.answerEn);
    formData.set("answerAr", data.answerAr);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg gap-0">
        <DialogHeader>
          <DialogTitle>{editData ? t("Edit FAQ") : t("Add FAQ")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {/* Question EN */}
          <div>
            <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              label={t("Question EN")}
              placeholder={t("Enter your question")}
              value={questionEn}
              onChange={(e) => {
                setQuestionEn(e.target.value);
                setErrors((prev: any) => ({ ...prev, questionEn: undefined }));
              }}
            />
            {errors.questionEn && (
              <p className="text-red-500 text-sm mt-1">{errors.questionEn}</p>
            )}
          </div>

          {/* Question AR */}
          <div>
            <Input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              label={t("Question AR")}
              placeholder={t("Enter your question")}
              value={questionAr}
              onChange={(e) => {
                setQuestionAr(e.target.value);
                setErrors((prev: any) => ({ ...prev, questionAr: undefined }));
              }}
            />
            {errors.questionAr && (
              <p className="text-red-500 text-sm mt-1">{errors.questionAr}</p>
            )}
          </div>

          {/* Answer EN */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("Answer EN")}
            </label>

            <textarea
            placeholder="Enter the answer..."
              value={answerEn}
              onChange={(e) => {
                setAnswerEn(e.target.value);
                setErrors((prev: any) => ({ ...prev, answerEn: undefined }));
              }}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />

            {errors.answerEn && (
              <p className="text-red-500 text-sm mt-1">{errors.answerEn}</p>
            )}
          </div>

          {/* Answer AR */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("Answer AR")}
            </label>

            <textarea
            placeholder="Enter the answer..."
              value={answerAr}
              onChange={(e) => {
                setAnswerAr(e.target.value);
                setErrors((prev: any) => ({ ...prev, answerAr: undefined }));
              }}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />

            {errors.answerAr && (
              <p className="text-red-500 text-sm mt-1">{errors.answerAr}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
            className=" cursor-pointer"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              {t("Cancel")}
            </Button>

            <Button  className=" cursor-pointer" onClick={handleSave} disabled={isPending}>
              {isPending ? t("Saving") : editData ? t("Update") : t("Add FAQ")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}