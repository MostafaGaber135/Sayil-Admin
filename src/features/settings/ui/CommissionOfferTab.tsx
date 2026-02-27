"use client";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  useCommissionOfferSettings,
  useUpdateGlobalCommission,
  useUpdateMaxOffer,
  useUpdateMinOffer,
} from "../hooks/settings.hooks";
import { useTranslations } from "next-intl";

export default function CommissionOfferTab() {
  const { mutate: updateMax, isPending: maxLoading } = useUpdateMaxOffer();
  const { mutate: updateMin, isPending: minLoading } = useUpdateMinOffer();
  const { mutate: updateGlobal, isPending } = useUpdateGlobalCommission();
  const { data, isLoading } = useCommissionOfferSettings();
  const [globalRate, setGlobalRate] = useState("");
  const [minOffer, setMinOffer] = useState("");
  const [maxOffer, setMaxOffer] = useState("");
  useEffect(() => {
    if (data) {
      setGlobalRate(String(data.globalCommissionRate));
      setMinOffer(String(data.minOfferPercent));
      setMaxOffer(String(data.maxOfferPercent));
    }
  }, [data]);
  const t = useTranslations();
  return (
    <div className="p-3 sm:p-6">
      <div className="space-y-6">
        {/* ===== Page Title ===== */}
        <h1 className="text-base sm:text-lg font-semibold">
          {t("pages.settings.Commission")}
        </h1>

        {/* ===== Global Commission ===== */}
        <Card className="p-4 sm:p-6">
          <div className="space-y-4 w-full max-w-xl">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
              <Input
                type="number"
                label={t("pages.settings.Global")}
                value={globalRate}
                onChange={(e) => setGlobalRate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent text-xs sm:text-sm"
              />

              <Button
                disabled={isPending}
                onClick={() =>
                  updateGlobal({
                    globalCommissionRate: Number(globalRate),
                  })
                }
                className="flex items-center justify-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap cursor-pointer"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {isPending ? t("pages.settings.Saving") : t("pages.settings.Save Changes")}
              </Button>
            </div>

            <p className="text-[11px] sm:text-sm text-gray-500">
             {t("pages.settings.This rate")}
            </p>
          </div>
        </Card>

        {/* ===== Offer Range ===== */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
            {t("pages.settings.Offer")}
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* ===== Minimum Offer ===== */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                <Input
                  type="number"
                  label={t("pages.settings.Minimum")}
                  value={minOffer}
                  onChange={(e) => setMinOffer(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
                />

                <Button
                  disabled={minLoading}
                  onClick={() =>
                    updateMin({
                      minOfferPercent: Number(minOffer),
                    })
                  }
                  className="cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                >
                  {minLoading ? t("pages.settings.Saving") : t("pages.settings.Save Changes")}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                </Button>
              </div>

              <p className="text-[11px] sm:text-sm text-gray-500">
                {t("pages.settings.Represents")} (e.g. {minOffer}%)
              </p>
            </div>

            {/* ===== Maximum Offer ===== */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                <Input
                  type="number"
                  label="Maximum Offer Percentage (%)"
                  value={maxOffer}
                  onChange={(e) => setMaxOffer(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
                />

                <Button
                  disabled={maxLoading}
                  onClick={() =>
                    updateMax({
                      maxOfferPercent: Number(maxOffer),
                    })
                  }
                  className="cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                >
                  {maxLoading ? t("pages.settings.Saving") : t("pages.settings.Save Changes")}

                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                </Button>
              </div>

              <p className="text-[11px] sm:text-sm text-gray-500">
                 {t("pages.settings.Represents maximum")} (e.g. {maxOffer}%)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
