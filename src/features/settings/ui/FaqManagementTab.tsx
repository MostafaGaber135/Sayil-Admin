"use client";

import { Button } from "@/shared/components/ui/button";
import React, { useState } from "react";
import AddFaqModal from "./AddFaqModal";
import { useFaqs, useReorderFaqs } from "../hooks/settings.hooks";
import DeleteClassificationModal from "./DeleteClassificationModal";
import DeleteFaqModal from "./DeleteFaqModal";
import { useTranslations } from "next-intl";
import LoadingState from "@/shared/ui/LoadingState";

export default function FaqManagementTab() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const buildReorderPayload = (updatedFaqs: any[]) => {
    return {
      items: updatedFaqs.map((faq, index) => ({
        id: faq.id,
        displayOrder: index + 1,
      })),
    };
  };
  const moveUp = (index: number) => {
    if (index === 0) return;

    const updated = [...faqs];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    reorderMutation.mutate(buildReorderPayload(updated));
  };
  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;

    const updated = [...faqs];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    reorderMutation.mutate(buildReorderPayload(updated));
  };
  const reorderMutation = useReorderFaqs();
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: faqs = [], isLoading } = useFaqs();

  const [editData, setEditData] = useState<any>(null);
  const t = useTranslations();
  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            {t("pages.settings.FAQ")}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t("pages.settings.Drag")}
          </p>
        </div>

        <Button
          onClick={() => setOpenAddModal(true)}
          className="text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap"
        >
          {t("pages.settings.+ Add FAQ")}
        </Button>
      </div>

      {/* FAQ LIST */}

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <LoadingState />
        </div>
      ) : faqs?.length > 0 ? (
        <div className="space-y-3 mt-5">
          {faqs.map((faq: any, index: number) => (
            <div
              key={faq.id}
              draggable
              className="bg-white rounded-lg border-2 p-6 cursor-move transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* ORDER */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-gray-400"
                  >
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="9" cy="5" r="1" />
                    <circle cx="9" cy="19" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <circle cx="15" cy="5" r="1" />
                    <circle cx="15" cy="19" r="1" />
                  </svg>

                  <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded font-medium">
                    #{faq.displayOrder}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-2 break-words">
                    {faq.questionEn}
                  </h4>

                  <p className="text-gray-600 text-sm break-words">
                    {faq.answerEn}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* MOVE UP */}
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`p-1.5 rounded transition-colors ${
                      index === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    ↑
                  </button>

                  {/* MOVE DOWN */}
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === faqs.length - 1}
                    className={`p-1.5 rounded transition-colors ${
                      index === faqs.length - 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    ↓
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setEditData(faq);
                      setOpenAddModal(true);
                    }}
                    className="p-1.5 rounded text-sayil-bright-blue hover:text-sayil-blue hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      setDeleteId(faq.id);
                      setOpenDeleteModal(true);
                    }}
                    className="p-1.5 rounded text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <p>No FAQs added yet</p>
          <p className="text-sm mt-1">Click "Add FAQ" to get started</p>
        </div>
      )}
      {/* ADD FAQ MODAL */}
      <AddFaqModal
        open={openAddModal}
        onOpenChange={(val) => {
          setOpenAddModal(val);
          if (!val) setEditData(null);
        }}
        editData={editData}
      />
      <DeleteFaqModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        id={deleteId ?? undefined}
      />
    </div>
  );
}
