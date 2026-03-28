"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

const createResetSchema = (t: any) =>
  z
    .object({
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

type ResetFormValues = z.infer<ReturnType<typeof createResetSchema>>;

interface FirstTimePasswordResetProps {
  isRTL: boolean;
  phoneNumber: string;
  fullName: string;
  currentPassword: string;
  token?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export default function FirstTimePasswordReset({
  isRTL,
  phoneNumber,
  fullName,
  currentPassword,
  token,
  onBack,
  onSuccess,
}: FirstTimePasswordResetProps) {
  const t = useTranslations();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(createResetSchema(t)),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const changePassword = async (
    newPassword: string,
    confirmPassword: string
  ) => {
    const response = await fetch("/api/admin/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        phoneNumber,
        currentPassword,
        newPassword,
        confirmPassword,
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message ||
        (Array.isArray(data?.errors) && data.errors.length
          ? data.errors[0]
          : "Failed to change password")
      );
    }

    return data;
  };

  const onSubmit = async (values: ResetFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      await changePassword(values.newPassword, values.confirmPassword);

      const sessionSignIn = await signIn("credentials", {
        phoneNumber,
        password: values.newPassword,
        redirect: false,
      });

      if (!sessionSignIn?.ok) {
        throw new Error("Password changed, but login failed");
      }

      toast.success("Password changed successfully");
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SubmitIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Set Your New Password
        </h2>
        <p className="text-sm text-muted-foreground">
          This is your first login. Please set a new password.
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <BackIcon className="h-4 w-4" />
        Back to Login
      </button>

      <div className="rounded-xl border border-sayil-bright-blue/10 bg-sayil-bright-blue/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sayil-bright-blue/10 text-sayil-primary">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {fullName}
            </div>
            <div className="text-xs text-muted-foreground" dir="ltr">
              {phoneNumber}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            className="flex items-center gap-2 text-sm font-medium text-foreground"
            htmlFor="newPassword"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            New Password
          </label>

          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className={cn(
                "h-11 rounded-lg border border-gray-300 bg-white focus-visible:border-gray-400 focus-visible:ring-0",
                isRTL ? "pl-10" : "pr-10"
              )}
              {...form.register("newPassword")}
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted",
                isRTL ? "left-2" : "right-2"
              )}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {form.formState.errors.newPassword ? (
            <p className="text-xs text-destructive">
              {form.formState.errors.newPassword.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="flex items-center gap-2 text-sm font-medium text-foreground"
            htmlFor="confirmPassword"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            Confirm New Password
          </label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              className={cn(
                "h-11 rounded-lg border border-gray-300 bg-white focus-visible:border-gray-400 focus-visible:ring-0",
                isRTL ? "pl-10" : "pr-10"
              )}
              {...form.register("confirmPassword")}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted",
                isRTL ? "left-2" : "right-2"
              )}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {form.formState.errors.confirmPassword ? (
            <p className="text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        {serverError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg text-base font-semibold cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Set Password & Login
            </>
          ) : (
            <>
              Set Password & Login
              <SubmitIcon className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
