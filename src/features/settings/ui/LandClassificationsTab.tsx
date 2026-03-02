"use client";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Table,
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
        <Table className="w-full table-fixed">
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
        <div className="flex items-center gap-2 ps-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">
            {item.code}
          </span>

          <span className="font-semibold">
            {item.nameEn}
          </span>
        </div>
      </TableCell>

      <TableCell>
        {item.discountPercent}%
      </TableCell>

      <TableCell className="text-center">
        <div className="flex justify-center gap-3">
          {/* EDIT */}
          <svg
            onClick={() => handleEdit(item)}
            className="h-4 w-4 cursor-pointer text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
          </svg>

          {/* DELETE */}
          <svg
            onClick={() => handleDeleteClick(item.id)}
            className="h-4 w-4 cursor-pointer text-destructive"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
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
