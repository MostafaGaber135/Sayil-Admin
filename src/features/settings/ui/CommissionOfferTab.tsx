"use client";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React, {
  useEffect,
  useState,
  useTransition,
  useActionState,
} from "react";
import { useCommissionOfferSettings } from "../hooks/settings.hooks";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  updateGlobalCommissionAction,
  updateMaxOfferAction,
  updateMinOfferAction,
} from "../actions/commisionandoffers.action";

export default function CommissionOfferTab() {
  const t = useTranslations("pages.settings");
  const queryClient = useQueryClient();

  const { data } = useCommissionOfferSettings();

  const [globalRate, setGlobalRate] = useState("");
  const [minOffer, setMinOffer] = useState("");
  const [maxOffer, setMaxOffer] = useState("");

  const [isPendingGlobal, startGlobalTransition] = useTransition();
  const [isPendingMin, startMinTransition] = useTransition();
  const [isPendingMax, startMaxTransition] = useTransition();

  const initialState = { success: false, message: "" };

  const [globalState, globalAction] = useActionState(
    updateGlobalCommissionAction,
    initialState,
  );

  const [minState, minAction] = useActionState(
    updateMinOfferAction,
    initialState,
  );

  const [maxState, maxAction] = useActionState(
    updateMaxOfferAction,
    initialState,
  );

  useEffect(() => {
    if (data) {
      setGlobalRate(String(data.globalCommissionRate));
      setMinOffer(String(data.minOfferPercent));
      setMaxOffer(String(data.maxOfferPercent));
    }
  }, [data]);

  /* ===== Toast Handling ===== */

  useEffect(() => {
    if (globalState?.success) {
      toast.success(globalState.message);
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
    }
  }, [globalState]);

  useEffect(() => {
    if (minState?.success) {
      toast.success(minState.message);
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
    }
  }, [minState]);

  useEffect(() => {
    if (maxState?.success) {
      toast.success(maxState.message);
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
    }
  }, [maxState]);

  /* ===== Handlers ===== */

  const handleGlobalSave = () => {
    const formData = new FormData();
    formData.set("globalCommissionRate", globalRate);

    startGlobalTransition(() => {
      globalAction(formData);
    });
  };

  const handleMinSave = () => {
    const formData = new FormData();
    formData.set("minOfferPercent", minOffer);

    startMinTransition(() => {
      minAction(formData);
    });
  };

  const handleMaxSave = () => {
    const formData = new FormData();
    formData.set("maxOfferPercent", maxOffer);

    startMaxTransition(() => {
      maxAction(formData);
    });
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="space-y-6">
        <h1 className="text-base sm:text-lg font-semibold">
          {t("Commission")}
        </h1>

        {/* ===== Global Commission ===== */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
            <Input
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent border-gray-300 focus:ring-sayil-bright-blue"
              type="number"
              label={t("Global")}
              value={globalRate}
              onChange={(e) => setGlobalRate(e.target.value)}
            />

            <Button className="cursor-pointer w-full sm:w-auto" disabled={isPendingGlobal} onClick={handleGlobalSave}>
              {isPendingGlobal ? t("Saving") : t("Save Changes")}
            </Button>
          </div>
        </Card>

        {/* ===== Offer Range ===== */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">{t("Offer")}</h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Minimum */}
            <div className="flex-1 space-y-4">
              <Input
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent border-gray-300 focus:ring-sayil-bright-blue"
                type="number"
                label={t("Minimum")}
                value={minOffer}
                onChange={(e) => setMinOffer(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                {t("Represents")}(e.g. {minOffer}%)
              </p>
              <Button className="cursor-pointer w-full sm:w-auto" disabled={isPendingMin} onClick={handleMinSave}>
                {isPendingMin ? t("Saving") : t("Save Changes")}
              </Button>
            </div>

            {/* Maximum */}
            <div className="flex-1 space-y-4">
              <Input
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent border-gray-300 focus:ring-sayil-bright-blue"
                type="number"
                label={t("Maximum")}
                value={maxOffer}
                onChange={(e) => setMaxOffer(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                {t("Represents maximum")} (e.g. {maxOffer}%)
              </p>
              <Button className="cursor-pointer w-full sm:w-auto" disabled={isPendingMax} onClick={handleMaxSave}>
                {isPendingMax ? t("Saving") : t("Save Changes")}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
