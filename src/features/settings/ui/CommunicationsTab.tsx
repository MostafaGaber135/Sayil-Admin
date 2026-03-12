"use client";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React, { useEffect, useTransition, useActionState } from "react";
import { useCommunication } from "../hooks/settings.hooks";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import LoadingState from "@/shared/ui/LoadingState";
import { updateCommunicationSettingsAction } from "../actions/communication";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  communicationSchema,
} from "../validation/communications.validation";
import { CommunicationFormValues } from "@/features/profile/types";


export default function CommunicationsTab() {
  const t = useTranslations("pages.settings");
  const queryClient = useQueryClient();

  const { data, isLoading } = useCommunication();

  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(
    updateCommunicationSettingsAction,
    initialState,
  );

  const form = useForm<CommunicationFormValues>({
    resolver: zodResolver(communicationSchema(t)),
  });

  const { register, handleSubmit, setValue, formState } = form;

  useEffect(() => {
    if (data) {
      setValue("whatsAppNumber", data.whatsAppNumber);
      setValue("contactUsEmail", data.contactUsEmail);
      setValue("supportEmail", data.supportEmail);
      setValue("businessHours", data.businessHours);
      setValue("timeZone", data.timeZone);
    }
  }, [data]);

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

  const onSubmit = (values: CommunicationFormValues) => {
    const formData = new FormData();

    formData.set("whatsAppNumber", values.whatsAppNumber);
    formData.set("contactUsEmail", values.contactUsEmail);
    formData.set("supportEmail", values.supportEmail);
    formData.set("businessHours", values.businessHours);
    formData.set("timeZone", values.timeZone);

    startTransition(() => {
      formAction(formData);
    });
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="p-3 sm:p-4">
      {" "}
      <div>
        {" "}
        <h1 className="text-base sm:text-lg font-semibold">{t("Mobile")} </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t("Configure")}
        </p>
      </div>
      <Card className=" sm:p-4 mt-4 space-y-4 sm:space-y-5 ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
          placeholder={t("Enter WhatsApp number")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            {...register("whatsAppNumber")}
            label={t("WhatsApp Number")}
            type="tel"
          />

          {formState.errors.whatsAppNumber && (
            <p className="text-red-500 text-sm">
              {formState.errors.whatsAppNumber.message}
            </p>
          )}

          <Input
          placeholder={t("Enter contact email address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            {...register("contactUsEmail")}
            label={t("Contact Us Email")}
            type="email"
          />

          {formState.errors.contactUsEmail && (
            <p className="text-red-500 text-sm">
              {formState.errors.contactUsEmail.message}
            </p>
          )}

          <Input
          placeholder={t("Enter support")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            {...register("supportEmail")}
            label={t("Support Email")}
            type="email"
          />

          {formState.errors.supportEmail && (
            <p className="text-red-500 text-sm">
              {formState.errors.supportEmail.message}
            </p>
          )}

          <Input
          placeholder={t("Enter business hours")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
            {...register("businessHours")}
            label={t("Business Hours")}
            type="text"
          />
          {formState.errors.businessHours && (
            <p className="text-red-500 text-sm">
              {formState.errors.businessHours.message}
            </p>
          )}
          <div>
            <label className="text-sm font-medium">{t("Time Zone")}</label>

            <select
              {...register("timeZone")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
              <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
              <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
              <option value="Asia/Qatar">Asia/Qatar (GMT+3)</option>
              <option value="Asia/Bahrain">Asia/Bahrain (GMT+3)</option>
            </select>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button disabled={isPending} type="submit">
              {isPending ? t("Saving") : t("Save Changes")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
