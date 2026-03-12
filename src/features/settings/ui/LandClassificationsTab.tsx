"use client";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import AddClassificationModal from "./AddClassificationModal";
import DeleteClassificationModal from "./DeleteClassificationModal";

import { useLandClassifications } from "../hooks/settings.hooks";
import { Data } from "../types";
import LoadingState from "@/shared/ui/LoadingState";

export default function LandClassificationsTab() {
  const t = useTranslations();

  /* ================= STATES ================= */

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  /* ================= DATA ================= */

  const { data, isLoading } = useLandClassifications();

  /* ================= HANDLERS ================= */

  const handleEdit = (item: any) => {
    setEditData(item);
    setOpenAddModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  /* ================= UI ================= */

  return (
    <div className="mb-4 p-3 sm:p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-semibold">
          {t("pages.settings.Land")}
        </h1>

        <Button
          onClick={() => {
            setEditData(null);
            setOpenAddModal(true);
          }}
          className="text-xs sm:text-sm px-3 sm:px-4 py-2 cursor-pointer"
        >
          + {t("pages.settings.Add")}
        </Button>
      </div>

      {/* TABLE CARD */}
      <Card className="mt-5 overflow-hidden p-0">
        <Table className="w-full">
          {/* HEADER */}
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>{t("pages.settings.Name")}</TableHead>

              <TableHead>{t("pages.settings.Discount")} (%)</TableHead>

              <TableHead className="text-center">
                {t("pages.settings.Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ROWS */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="flex justify-center items-center h-40">
                    <LoadingState />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data.map((item: Data) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5 sm:gap-2 ps-1 sm:ps-2">
                      <span className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs sm:text-sm shrink-0">
                        {item.code}
                      </span>

                      <span className="font-semibold text-sm sm:text-base truncate">{item.nameEn}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm sm:text-base">{item.discountPercent}%</TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1.5 sm:gap-3">
                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer p-1.5 rounded text-sayil-bright-blue hover:text-sayil-blue hover:bg-blue-50 transition-colors"
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
                          className="h-4 w-4 hover:text-primary text-primary"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                        </svg>
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="cursor-pointer p-1.5 rounded text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="text-center py-12 text-gray-500">
                    <p>No classifications added yet</p>
                    <p className="text-sm mt-1">
                      Click "Add Classification" to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* ADD / EDIT MODAL */}
      <AddClassificationModal
        open={openAddModal}
        onOpenChange={(val) => {
          setOpenAddModal(val);
          if (!val) setEditData(null);
        }}
        editData={editData}
      />

      {/* DELETE MODAL */}
      <DeleteClassificationModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        id={deleteId ?? undefined}
      />
    </div>
  );
}
