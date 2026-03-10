"use client";

import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

// ─── LabeledField ─────────────────────────────────────────────────────────────

type LabeledFieldProps = {
  label: string;
  icon: LucideIcon;
  error?: FieldError;
  children: ReactNode;
};

export function LabeledField({ label, icon: Icon, error, children }: LabeledFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[13px] font-medium text-[#3A4258]">
        <Icon className="size-4 text-[#3A4258]" />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-500">{error.message}</p>
      )}
    </div>
  );
}

// ─── FormInput ────────────────────────────────────────────────────────────────

type FormInputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hasError?: boolean;
  suffix?: ReactNode;
  disabled?: boolean;
};

export function FormInput({
  placeholder,
  value,
  onChange,
  type = "text",
  hasError,
  suffix,
  disabled,
}: FormInputProps) {
  return (
    <div className="relative">
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-11 rounded-[12px] border-[#CBD5E1] bg-white px-4 text-[12px] text-[#24314F] placeholder:text-[#98A2B3] focus-visible:ring-0",
          hasError && "border-red-400 focus-visible:border-red-400",
          suffix && "pe-11"
        )}
      />
      {suffix && (
        <div className="absolute inset-e-4 top-1/2 -translate-y-1/2">{suffix}</div>
      )}
    </div>
  );
}

// ─── FormSelect ───────────────────────────────────────────────────────────────

type FormSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  hasError?: boolean;
};

export function FormSelect({ value, onChange, options, hasError }: FormSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-11 w-full cursor-pointer rounded-[12px] border border-[#CBD5E1] bg-white px-4 text-[12px] text-[#24314F] outline-none transition focus:border-[#3C71FF]",
        hasError && "border-red-400"
      )}
    >
      <option value="" disabled>Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

// ─── PasswordVisibilityButton ─────────────────────────────────────────────────

import { Eye, EyeOff } from "lucide-react";

export function PasswordToggle({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-[#98A2B3] transition-colors hover:text-[#667085]"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}