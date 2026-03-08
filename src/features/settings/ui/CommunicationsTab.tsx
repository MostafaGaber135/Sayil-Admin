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
import { useCommunication } from "../hooks/settings.hooks";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import LoadingState from "@/shared/ui/LoadingState";
import { updateCommunicationSettingsAction } from "../actions/communication";

export default function CommunicationsTab() {
  const t = useTranslations("pages.settings");
  const queryClient = useQueryClient();

  const { data, isLoading } = useCommunication();

  const [whatsApp, setWhatsApp] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [timeZone, setTimeZone] = useState("");

  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(
    updateCommunicationSettingsAction,
    initialState,
  );

  useEffect(() => {
    if (data) {
      setWhatsApp(data.whatsAppNumber);
      setContactEmail(data.contactUsEmail);
      setSupportEmail(data.supportEmail);
      setBusinessHours(data.businessHours);
      setTimeZone(data.timeZone);
    }
  }, [data]);

  /* ===== Toast Handling ===== */

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({
        queryKey: ["communication-settings"],
      });
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  /* ===== Save Handler ===== */

  const handleSave = () => {
    const formData = new FormData();

    formData.set("whatsAppNumber", whatsApp);
    formData.set("contactUsEmail", contactEmail);
    formData.set("supportEmail", supportEmail);
    formData.set("businessHours", businessHours);
    formData.set("timeZone", timeZone);

    startTransition(() => {
      formAction(formData);
    });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-semibold">
          {t("Mobile")}
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t("Configure")}
        </p>
      </div>

      {/* Card */}
      <Card className="p-3 sm:p-4 mt-4 space-y-4 sm:space-y-5">
        {/* WhatsApp */}
        <Input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
          value={whatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
          label={t("WhatsApp Number")}
          type="tel"
        />

        {/* Contact Email */}
        <Input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          label={t("Contact Us Email")}
          type="email"
        />

        {/* Support Email */}
        <Input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          label={t("Support Email")}
          type="email"
        />

        {/* Business Hours */}
        <Input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
          value={businessHours}
          onChange={(e) => setBusinessHours(e.target.value)}
          label={t("Business Hours")}
          type="text"
        />

        {/* Timezone */}
        <div>
          <label className="text-sm font-medium">
            {t("Time Zone")}
          </label>

          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
            <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
            <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
            <option value="Asia/Qatar">Asia/Qatar (GMT+3)</option>
            <option value="Asia/Bahrain">Asia/Bahrain (GMT+3)</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button disabled={isPending} onClick={handleSave}>
            {isPending
              ? t("Saving")
              : t("Save Changes")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
