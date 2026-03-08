"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import {
  useAddFaq,
  useUpdateFaq,
} from "../hooks/settings.hooks";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
};

export default function AddFaqModal({
  open,
  onOpenChange,
  editData,
}: Props) {
  const [questionEn, setQuestionEn] = useState("");
  const [questionAr, setQuestionAr] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerAr, setAnswerAr] = useState("");

  const { mutate: addFaq, isPending: adding } = useAddFaq();
  const { mutate: updateFaq, isPending: updating } = useUpdateFaq();

  const isEditMode = !!editData;
  const isPending = adding || updating;

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
        SAVE HANDLER
  ==============================*/
  const handleSave = () => {
    const payload = {
      questionEn,
      questionAr: questionAr || questionEn,
      answerEn,
      answerAr: answerAr || answerEn,
    };

    if (isEditMode) {
      updateFaq(
        {
          id: editData.id,
          ...payload,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        }
      );
    } else {
      addFaq(payload, {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit FAQ" : "Add FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          {/* Question EN */}
          <Input
            label="Question EN"
            placeholder="Enter your question..."
            value={questionEn}
            onChange={(e) => setQuestionEn(e.target.value)}
          />

          {/* Question AR */}
          <Input
            label="Question AR"
            placeholder="Enter your question..."
            value={questionAr}
            onChange={(e) => setQuestionAr(e.target.value)}
          />

          {/* Answer EN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer EN
            </label>
            <textarea
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              placeholder="Enter the answer..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent resize-none"
            />
          </div>

          {/* Answer AR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer AR
            </label>
            <textarea
              value={answerAr}
              onChange={(e) => setAnswerAr(e.target.value)}
              placeholder="Enter the answer..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending
                ? "Saving..."
                : isEditMode
                ? "Update FAQ"
                : "Add FAQ"}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}