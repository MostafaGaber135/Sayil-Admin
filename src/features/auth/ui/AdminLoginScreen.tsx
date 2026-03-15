"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

import { useRouter } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import LocaleSwitch from "@/shared/ui/LocaleSwitch";

import { useAdminLogin } from "@/features/auth/hooks/auth.hooks";
import type { AdminLoginFormValues, LoginPreset } from "@/features/auth/types/auth.types";
import LoginForm from "@/features/auth/ui/LoginForm";
import FirstTimePasswordReset from "@/features/auth/ui/FirstTimePasswordReset";
import { createAdminLoginSchema } from "@/features/auth/validation/login.validation";

type FirstTimeState = {
  fullName: string;
  phoneNumber: string;
  currentPassword: string;
  token?: string;
};

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
  const [step, setStep] = useState<"LOGIN" | "RESET">("LOGIN");
  const [firstTimeData, setFirstTimeData] = useState<FirstTimeState | null>(null);

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
        phoneNumber: "+966551208175",
        password: "Test1234@",
        hint: t("auth.samples.firstTime"),
        isFirstTime: true,
      },
    ],
    [t]
  );

  const goToResetStep = useCallback((payload: FirstTimeState) => {
    setApiError(null);
    setFirstTimeData(payload);
    setStep("RESET");
  }, []);

  const applyPreset = useCallback(
    (preset: LoginPreset) => {
      setApiError(null);
      form.reset(
        {
          phoneNumber: preset.phoneNumber,
          password: preset.password,
        },
        { keepDirty: true, keepTouched: true }
      );
      form.trigger(["phoneNumber", "password"]);
      form.setFocus("phoneNumber");
    },
    [form]
  );
  const onSubmit = useCallback(
    async (values: AdminLoginFormValues) => {
      setApiError(null);

      try {
        const loginResponse = await login.mutateAsync(values);

        if (!loginResponse?.succeeded || !loginResponse?.data) {
          const message = loginResponse?.message || t("auth.login.errors.invalid");
          setApiError(message);
          toast.error(message);
          return;
        }

        if (loginResponse.data.isFirstTimeLogin) {
          goToResetStep({
            fullName:
              loginResponse.data.user?.fullName ||
              loginResponse.data.user?.email ||
              presets.find((preset) => preset.phoneNumber === values.phoneNumber)?.roleLabel ||
              t("auth.samples.manager"),
            phoneNumber: values.phoneNumber,
            currentPassword: values.password,
            token: loginResponse.data.token,
          });
          return;
        }
        const sessionSignIn = await signIn("credentials", {
          phoneNumber: values.phoneNumber,
          password: values.password,
          redirect: false,
        });

        if (!sessionSignIn?.ok) {
          const message =
            sessionSignIn?.error === "CredentialsSignin" || sessionSignIn?.status === 401
              ? t("auth.login.errors.unauthorized")
              : t("auth.login.errors.invalid");

          setApiError(message);
          toast.error(message);
          return;
        }

        toast.success(t("auth.login.success"));
        router.push("/dashboard");
      } catch (error) {
        const message =
          typeof error === "object" && error && "message" in error && typeof error.message === "string"
            ? error.message
            : t("auth.login.errors.network");

        setApiError(message);
        toast.error(message);
      }
    },
    [goToResetStep, login, presets, router, t]
  );


  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-primary">
      <div className="absolute inset-0 bg-linear-to-b from-primary to-(--auth-hero-to)" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_30%_0%,var(--auth-hero-glow),transparent_60%)]" />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className={cn("space-y-8", isRTL ? "text-right" : "text-left")}>
              <div className="space-y-2">
                <h1
                  className={cn(
                    "text-4xl font-extrabold tracking-tight text-white sm:text-5xl",
                    isRTL ? "leading-[1.15]" : ""
                  )}
                >
                  {t("auth.brand.title")}
                </h1>

                <p className="text-lg text-white/80 sm:text-xl">{t("auth.brand.subtitle")}</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
                  <UserRound className="h-5 w-5" />
                  {t("auth.samples.title")}
                </div>

                <div className="space-y-4">
                  {presets.map((preset) => (
                    <div
                      key={preset.phoneNumber}
                      className={cn(
                        "flex flex-col gap-4 rounded-xl bg-white/10 p-5 sm:flex-row sm:items-center sm:justify-between",
                        isRTL ? "sm:flex-row-reverse" : ""
                      )}
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="text-base font-semibold text-white">{preset.roleLabel}</div>
                        <div className="text-sm text-white/80 break-all">
                          <span dir="ltr" className="break-all">
                            {preset.phoneNumber}
                          </span>
                        </div>
                        <div className="text-sm text-white/80 break-all">
                          {t("auth.samples.password")}: <span dir="ltr">{preset.password}</span>
                        </div>
                        {preset.hint ? <div className="text-sm font-semibold text-yellow-300">{preset.hint}</div> : null}
                      </div>

                      <Button
                        type="button"
                        variant="secondary"
                        className="h-10 w-full shrink-0 rounded-lg bg-white/20 px-5 text-sm font-semibold text-white hover:bg-white/30 cursor-pointer sm:w-auto border-0 shadow-none"
                        onClick={() => applyPreset(preset)}
                      >
                        {t("auth.samples.use")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="relative mx-auto w-full max-w-xl rounded-2xl border-0 bg-white shadow-xl">
              <CardContent className="pt-14 p-6 sm:pt-10 sm:p-10">
                <div
                  className={cn(
                    "absolute top-2 sm:top-10",
                    isRTL ? "left-2 sm:left-10" : "right-3 sm:right-10"
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

                {step === "LOGIN" ? (
                  <LoginForm
                    form={form}
                    isRTL={isRTL}
                    submitting={login.isPending}
                    onSubmit={onSubmit}
                    errorText={apiError}
                    labels={labels}
                  />
                ) : (
                  firstTimeData && (
                    <FirstTimePasswordReset
                      isRTL={isRTL}
                      fullName={firstTimeData.fullName}
                      phoneNumber={firstTimeData.phoneNumber}
                      currentPassword={firstTimeData.currentPassword}
                      token={firstTimeData.token}
                      onBack={() => {
                        setStep("LOGIN");
                        setApiError(null);
                      }}
                      onSuccess={() => router.push("/dashboard")}
                    />
                  )
                )}

                <div className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
