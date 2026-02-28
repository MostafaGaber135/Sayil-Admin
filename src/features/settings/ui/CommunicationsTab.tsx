"use client";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  useCommunication,
  useUpdateCommunicationSettings,
} from "../hooks/settings.hooks";
import { useTranslations } from "next-intl";

export default function CommunicationsTab() {
  const t = useTranslations();
  const { mutate: updateSettings, isPending } =
    useUpdateCommunicationSettings();
  const { data, isLoading } = useCommunication();

  const [whatsApp, setWhatsApp] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    if (data) {
      setWhatsApp(data.whatsAppNumber);
      setContactEmail(data.contactUsEmail);
      setSupportEmail(data.supportEmail);
      setBusinessHours(data.businessHours);
      setTimeZone(data.timeZone);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-semibold">
          {t('pages.settings.Mobile')}
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t("pages.settings.Configure")}
        </p>
      </div>

      {/* Card */}
      <Card className="p-3 sm:p-4 mt-4 space-y-4 sm:space-y-5">
        {/* WhatsApp */}
        <div>
          <Input
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
            label={t("pages.settings.WhatsApp Number")}
            type="tel"
            placeholder={t("pages.settings.Enter WhatsApp number")}
            defaultValue="+966501234567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
          />

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {t("pages.settings.This number")}
          </p>
        </div>

        {/* Contact Email */}
        <div>
          <Input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            label={t("pages.settings.Contact Us Email")}
            type="email"
            placeholder={t("pages.settings.Enter contact email address")}
            defaultValue="support@sayil.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
          />

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {t("pages.settings.This email")}
          </p>
        </div>

        {/* Support Email */}
        <div>
          <Input
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            label={t("pages.settings.Support Email")}
            type="email"
            placeholder={t("pages.settings.Enter support")}
            defaultValue="help@sayil.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
          />

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {t("pages.settings.This email will")}
          </p>
        </div>

        {/* Business Hours */}
        <div>
          <Input
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
            label={t("pages.settings.Business Hours")}
            type="text"
            placeholder={t("pages.settings.Enter business hours")}
            defaultValue="9:00 AM - 6:00 PM"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent sm:text-sm"
          />

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {t("pages.settings.Display")}
          </p>
        </div>

        {/* Timezone */}
        <div>
          <label className="text-xs sm:text-sm font-medium">{t("pages.settings.Time Zone")}</label>

          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="
              w-full mt-1
              px-3 py-2
              text-xs sm:text-sm
              border border-gray-300
              rounded-lg
              focus:ring-2
              focus:ring-sayil-bright-blue
              focus:border-transparent
            "
          >
            <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
            <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
            <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
            <option value="Asia/Qatar">Asia/Qatar (GMT+3)</option>
            <option value="Asia/Bahrain">Asia/Bahrain (GMT+3)</option>
          </select>

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {t("pages.settings.Display business")}
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button
            disabled={isPending}
            onClick={() =>
              updateSettings({
                whatsAppNumber: whatsApp,
                contactUsEmail: contactEmail,
                supportEmail: supportEmail,
                businessHours: businessHours,
                timeZone: timeZone,
              })
            }
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
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
      </Card>
    </div>
  );
}
