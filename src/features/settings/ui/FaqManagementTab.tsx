"use client";

import { Button } from "@/shared/components/ui/button";
import React, {
  useState,
  useTransition,
  useActionState,
  useEffect,
} from "react";
import AddFaqModal from "./AddFaqModal";
import DeleteFaqModal from "./DeleteFaqModal";
import { useFaqs } from "../hooks/settings.hooks";
import { useTranslations } from "next-intl";
import LoadingState from "@/shared/ui/LoadingState";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { reorderFaqsAction } from "../actions/faq.action";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableFaqItem({ faq, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}{" "}
    </div>
  );
}

export default function FaqManagementTab() {
  const t = useTranslations("pages.settings");
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useFaqs();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  const initialState = { success: false, message: "" };

  const [state, formAction] = useActionState(reorderFaqsAction, initialState);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const buildReorderPayload = (updatedFaqs: any[]) => ({
    items: updatedFaqs.map((faq, index) => ({
      id: faq.id,
      displayOrder: index + 1,
    })),
  });

  const sendReorder = (updatedFaqs: any[]) => {
    const formData = new FormData();
    formData.set(
      "items",
      JSON.stringify(buildReorderPayload(updatedFaqs).items),
    );

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f: any) => f.id === active.id);
    const newIndex = faqs.findIndex((f: any) => f.id === over.id);

    const updated = arrayMove(faqs, oldIndex, newIndex);

    sendReorder(updated);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;

    const updated = [...faqs];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    sendReorder(updated);
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;

    const updated = [...faqs];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    sendReorder(updated);
  };

  return (
    <div className="p-3 sm:p-4">
      {" "}
      <div className="flex items-start sm:items-center justify-between gap-3">
        {" "}
        <div>
          {" "}
          <h3 className="text-base sm:text-lg font-medium">
            {t("FAQ")}{" "}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t("Drag")}
          </p>
        </div>
        <Button className="cursor-pointer" onClick={() => setOpenAddModal(true)}>
          {t("+ Add FAQ")}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <LoadingState />
        </div>
      ) : faqs.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={faqs.map((faq: any) => faq.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3 mt-5">
              {faqs.map((faq: any, index: number) => (
                <SortableFaqItem key={faq.id} faq={faq}>
                  <div className="bg-white rounded-lg border p-3 sm:p-6 hover:shadow cursor-move">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        #{faq.displayOrder}
                      </span>

                      <div className="flex-1">
                        <h4 className="font-medium">{faq.questionEn}</h4>
                        <p className="text-sm text-gray-600">{faq.answerEn}</p>
                      </div>

                      <div className="flex gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded transition-colors ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          }`}
                          title="Move up"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 cursor-pointer"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === faqs.length - 1}
                          className="p-1.5 rounded transition-colors text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          title="Move down"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                           strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 cursor-pointer"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </button>
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-primary hover:text-primary cursor-pointer"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                          </svg>
                        </button>
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 cursor-pointer"
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
                </SortableFaqItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <p>No FAQs added yet</p>
        </div>
      )}
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
