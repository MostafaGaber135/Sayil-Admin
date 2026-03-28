"use client";

import { Button } from "@/shared/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import AddClassificationModal from "./AddClassificationModal";
import DeleteClassificationModal from "./DeleteClassificationModal";
import { useLandClassifications } from "../hooks/settings.hooks";
import { Data } from "../types";
import LoadingState from "@/shared/ui/LoadingState";
import { ColumnDef, DataTable } from "@/shared/components/ui/DataTable";

export default function LandClassificationsTab() {
  const t = useTranslations();
  const locale = useLocale();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState<Data | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading } = useLandClassifications();

  const columns: ColumnDef<Data>[] = [
    {
      header: t("pages.settings.Name"),
      cell: (item) => (
        <div className="flex items-center gap-1.5 sm:gap-2 ps-1 sm:ps-2">
          <span className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs sm:text-sm shrink-0">
            {item.code}
          </span>
          <span className="font-semibold text-sm sm:text-base truncate">
            {locale === "ar" ? item.nameAr : item.nameEn}
          </span>
        </div>
      ),
    },
    {
      header: `${t("pages.settings.Discount")} (%)`,
      cell: (item) => `${item.discountPercent}%`,
    },
    {
      header: t("pages.settings.Actions"),
      headerClassName: "text-center",
      cellClassName: "text-center",
      cell: (item) => (
        <div className="flex justify-center gap-1.5 sm:gap-3">
          <button
            onClick={() => { setEditData(item); setOpenAddModal(true); }}
            className="cursor-pointer p-1.5 rounded hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
            </svg>
          </button>

          <button
            onClick={() => { setDeleteId(item.id); setOpenDeleteModal(true); }}
            className="cursor-pointer p-1.5 rounded hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-600">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      ),
    },
  ];



  
  return (
    <div className="mb-4 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-semibold">
          {t("pages.settings.Land")}
        </h1>
        <Button
          onClick={() => { setEditData(null); setOpenAddModal(true); }}
          className="text-xs sm:text-sm px-3 sm:px-4 py-2 cursor-pointer"
        >
          + {t("pages.settings.Add")}
        </Button>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingState />
          </div>
        ) : data?.length > 0 ? (
          <DataTable
            data={data}
            columns={columns}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No classifications added yet</p>
            <p className="text-sm mt-1">Click "Add Classification" to get started</p>
          </div>
        )}
      </div>

      <AddClassificationModal
        open={openAddModal}
        onOpenChange={(val) => { setOpenAddModal(val); if (!val) setEditData(null); }}
        editData={editData}
      />

      <DeleteClassificationModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        id={deleteId ?? undefined}
      />
    </div>
  );
}