import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function LandClassificationsTab() {
  const t = useTranslations();
  return (
    <div className="mb-4 p-4">
      <div className="text-lg font-semibold flex flex-wrap justify-between  ">
        <h1>{t("pages.settings.Land")}</h1>
        <Button className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg  transition-colors cursor-pointer text-[17px]">
         + {t("pages.settings.Add")}
        </Button>
      </div>
      <Table className=" bg-white rounded-lg border border-gray-200 overflow-hidden">
        <TableHeader className=" bg-[#F9FAFB]">
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {t("pages.settings.Name")}
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {t("pages.settings.Discount")} (%)
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {t("pages.settings.Actions")}
          </TableHead>
        </TableHeader>
        <TableRow className="">
          <TableCell data-slot="table-cell">
            <div className="flex items-center gap-2 bg">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-sayil-bright-blue text-white rounded-full text-sm font-bold bg-primary">
                A
              </span>
              <span>Class A</span>
            </div>
          </TableCell>
          <TableCell>10%</TableCell>
          <TableCell className="flex gap-3 ">
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
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
}
