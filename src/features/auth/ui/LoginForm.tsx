"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { LoginFormProps } from "@/features/auth/types";

function LoginForm({
  form,
  isRTL,
  submitting,
  onSubmit,
  errorText,
  labels,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const SubmitIcon = useMemo(() => (isRTL ? ArrowLeft : ArrowRight), [isRTL]);
  const togglePassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center text-2xl font-bold text-foreground">
        {labels.heading}
      </div>

      <div className="space-y-2">
        <label
          className={cn(
            "flex items-center gap-2 text-sm font-medium text-foreground",
            isRTL ? "flex-row justify-start" : ""
          )}
          htmlFor="phoneNumber"
        >
          <Phone className="h-4 w-4 text-muted-foreground" />
          {labels.phone}
        </label>

        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <Input
                id="phoneNumber"
                type="tel"
                placeholder={labels.phonePlaceholder}
                dir={isRTL ? "rtl" : "ltr"}
                className={cn(
                  "h-11 rounded-lg bg-white border border-gray-300 focus-visible:ring-0 focus-visible:border-gray-400",
                  isRTL ? "text-right" : "text-left"
                )}
                autoComplete="tel"
                aria-invalid={Boolean(fieldState.error)}
                {...field}
              />

              {fieldState.error ? (
                <p
                  className={cn(
                    "text-xs text-destructive",
                    isRTL ? "text-right" : ""
                  )}
                >
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          )}
        />
      </div>

      <div className="space-y-2">
        <label
          className={cn(
            "flex items-center gap-2 text-sm font-medium text-foreground",
            isRTL ? "flex-row justify-start" : ""
          )}
          htmlFor="password"
        >
          <Lock className="h-4 w-4 text-muted-foreground" />
          {labels.password}
        </label>

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={labels.passwordPlaceholder}
                  className={cn(
                    "h-11 rounded-lg bg-white border border-gray-300 focus-visible:ring-0 focus-visible:border-gray-400",
                    isRTL ? "pl-10" : "pr-10"
                  )}
                  autoComplete="current-password"
                  aria-invalid={Boolean(fieldState.error)}
                  {...field}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted",
                    isRTL ? "left-2" : "right-2"
                  )}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 cursor-pointer" />
                  ) : (
                    <Eye className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>
              {fieldState.error ? (
                <p
                  className={cn(
                    "text-xs text-destructive",
                    isRTL ? "text-right" : ""
                  )}
                >
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          )}
        />
      </div>

      {errorText ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorText}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-lg text-base font-semibold cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {labels.submit}
          </>
        ) : (
          <>
            {labels.submit}
            <SubmitIcon className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
export default memo(LoginForm);