"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import LocaleSwitch from "@/shared/ui/LocaleSwitch";

import { useAdminLogin } from "@/features/auth/hooks/auth.hooks";
import type { AdminLoginFormValues, LoginPreset } from "@/features/auth/types/auth.types";
import LoginForm from "@/features/auth/ui/LoginForm";
import { createAdminLoginSchema } from "@/features/auth/validation/login.validation";

export default function AdminLoginScreen() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();

  const validationSchema = useMemo(
    () =>
      createAdminLoginSchema({
        phoneRequired: t("auth.login.validation.phoneRequired"),
        passwordRequired: t("auth.login.validation.passwordRequired"),
      }),
    [t]
  );

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const login = useAdminLogin();
  const [apiError, setApiError] = useState<string | null>(null);

  const labels = useMemo(
    () => ({
      heading: t("auth.login.heading"),
      phone: t("auth.login.phone"),
      phonePlaceholder: t("auth.login.phonePlaceholder"),
      password: t("auth.login.password"),
      passwordPlaceholder: t("auth.login.passwordPlaceholder"),
      submit: t("auth.login.submit"),
    }),
    [t]
  );

  const presets: LoginPreset[] = useMemo(
    () => [
      {
        roleLabel: t("auth.samples.admin"),
        phoneNumber: "+966512345678",
        password: "Admin@123456",
      },
      {
        roleLabel: t("auth.samples.agent"),
        phoneNumber: "+966507654321",
        password: "agent123",
      },
      {
        roleLabel: t("auth.samples.manager"),
        phoneNumber: "+966509876543",
        password: "manager123",
        hint: t("auth.samples.firstTime"),
      },
    ],
    [t]
  );

  const applyPreset = (p: LoginPreset) => {
    setApiError(null);
    form.setValue("phoneNumber", p.phoneNumber, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("password", p.password, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setFocus("phoneNumber");
  };

  const onSubmit = async (values: AdminLoginFormValues) => {
    setApiError(null);

    try {
      const res = await login.mutateAsync(values);

      if (!res?.succeeded) {
        setApiError(res?.message || t("auth.login.errors.generic"));
        return;
      }

      if (!res?.data?.token) {
        setApiError(t("auth.login.errors.generic"));
        return;
      }

      router.push("/dashboard");
    } catch (e: unknown) {
      if (!axios.isAxiosError(e) || !e.response) {
        setApiError(t("auth.login.errors.network"));
        return;
      }

      const status = e.response.status;

      if (status === 401) {
        setApiError(t("auth.login.errors.unauthorized"));
        return;
      }

      setApiError(t("auth.login.errors.invalid"));
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-primary">
      <div className="absolute inset-0 bg-linear-to-b from-primary to-(--auth-hero-to)" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_30%_0%,var(--auth-hero-glow),transparent_60%)]" />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div
              className={cn(
                "space-y-8",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <div className="space-y-2">
                <h1
                  className={cn(
                    "text-4xl font-extrabold tracking-tight text-white sm:text-5xl",
                    isRTL ? "leading-[1.15]" : ""
                  )}
                >
                  {t("auth.brand.title")}
                </h1>

                <p className="text-lg text-white/80 sm:text-xl">
                  {t("auth.brand.subtitle")}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div
                  className={cn(
                    "mb-5 flex items-center gap-3 text-lg font-semibold text-white",
                    isRTL ? "flex-row justify-star" : ""
                  )}
                >
                  <UserRound className="h-5 w-5" />
                  {t("auth.samples.title")}
                </div>

                <div className="space-y-4">
                  {presets.map((p) => (
                    <div
                      key={p.phoneNumber}
                      className={cn(
                        "flex items-center justify-between rounded-xl bg-white/10 p-5",
                        isRTL ? "flex-row" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "space-y-1",
                          isRTL ? "text-right" : "text-left"
                        )}
                      >
                        <div className="text-base font-semibold text-white">
                          {p.roleLabel}
                        </div>
                        <div className="text-sm text-white/80">
                          <span dir="ltr">{p.phoneNumber}</span>
                        </div>
                        <div className="text-sm text-white/80">
                          {t("auth.samples.password")}: <span dir="ltr">{p.password}</span>
                        </div>
                        {p.hint ? (
                          <div className="text-sm font-semibold text-yellow-300">
                            {p.hint}
                          </div>
                        ) : null}
                      </div>

                      <Button
                        type="button"
                        variant="secondary"
                        className={cn(
                          "h-10 rounded-lg bg-white/20 px-5 text-sm font-semibold text-white hover:bg-white/30 cursor-pointer",
                          "border-0 shadow-none"
                        )}
                        onClick={() => applyPreset(p)}
                      >
                        {t("auth.samples.use")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="relative rounded-2xl border-0 bg-white shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <div
                  className={cn(
                    "absolute top-6",
                    isRTL ? "left-6" : "right-6"
                  )}
                >
                  <LocaleSwitch
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 rounded-full px-2 text-gray-500 hover:bg-gray-100",
                      isRTL ? "flex-row-reverse" : ""
                    )}
                  />
                </div>
                <LoginForm
                  form={form}
                  isRTL={isRTL}
                  submitting={login.isPending}
                  onSubmit={onSubmit}
                  errorText={apiError}
                  labels={labels}
                />

                <div className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}