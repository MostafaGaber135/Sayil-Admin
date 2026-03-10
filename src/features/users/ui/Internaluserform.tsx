"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  UserCog,
  CreditCard,
} from "lucide-react";

import { LabeledField, FormInput, FormSelect, PasswordToggle } from "./FormPrimitives";
import { AddInternalFormValues, EditInternalFormValues, addInternalSchema, editInternalSchema } from "../validation/user.validation";
import { UsersScreenLabels } from "..";
import { INTERNAL_USER_ROLE_OPTIONS } from "../data/users.constants";

// ─── Add Form ─────────────────────────────────────────────────────────────────

type AddInternalFormProps = {
  labels: UsersScreenLabels;
  onSubmit: (values: AddInternalFormValues) => void;
  isPending: boolean;
  formId: string;
};

export function AddInternalForm({ labels, onSubmit, isPending, formId }: AddInternalFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInternalFormValues>({
    resolver: zodResolver(addInternalSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      nationalId: "",
      role: "Agent",
      department: "",
      password: "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <LabeledField label={labels.form.fullName} icon={User} error={errors.fullName}>
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.fullName}
              hasError={!!errors.fullName}
            />
          </LabeledField>
        )}
      />

      {/* Email + Phone */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <LabeledField label={labels.form.email} icon={Mail} error={errors.email}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.email}
                hasError={!!errors.email}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <LabeledField label={labels.form.phone} icon={Phone} error={errors.phoneNumber}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.phone}
                hasError={!!errors.phoneNumber}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* National ID + Role */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="nationalId"
          render={({ field }) => (
            <LabeledField label={labels.form.nationalId} icon={CreditCard} error={errors.nationalId}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.nationalId}
                hasError={!!errors.nationalId}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <LabeledField label={labels.form.role} icon={Shield} error={errors.role}>
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                options={INTERNAL_USER_ROLE_OPTIONS}
                hasError={!!errors.role}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Department */}
      <Controller
        control={control}
        name="department"
        render={({ field }) => (
          <LabeledField label={labels.form.department} icon={Building2} error={errors.department}>
            <FormInput
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.department}
            />
          </LabeledField>
        )}
      />

      {/* Password */}
      <div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <LabeledField label={labels.form.initialPassword} icon={UserCog} error={errors.password}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.password}
                type={showPassword ? "text" : "password"}
                hasError={!!errors.password}
                suffix={
                  <PasswordToggle
                    visible={showPassword}
                    onClick={() => setShowPassword((v) => !v)}
                  />
                }
              />
            </LabeledField>
          )}
        />
        <p className="mt-1.5 text-[11px] text-[#667085]">{labels.form.passwordHint}</p>
      </div>
    </form>
  );
}

// ─── Edit Form ────────────────────────────────────────────────────────────────

type EditInternalFormProps = {
  labels: UsersScreenLabels;
  defaultValues: EditInternalFormValues;
  onSubmit: (values: EditInternalFormValues) => void;
  isPending: boolean;
  formId: string;
};

export function EditInternalForm({
  labels,
  defaultValues,
  onSubmit,
  isPending,
  formId,
}: EditInternalFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditInternalFormValues>({
    resolver: zodResolver(editInternalSchema),
    defaultValues,
  });

  const resetPassword = watch("resetPassword");

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <LabeledField label={labels.form.fullName} icon={User} error={errors.fullName}>
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.fullName}
              hasError={!!errors.fullName}
            />
          </LabeledField>
        )}
      />

      {/* Email + Phone */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <LabeledField label={labels.form.email} icon={Mail} error={errors.email}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.email}
                hasError={!!errors.email}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <LabeledField label={labels.form.phone} icon={Phone} error={errors.phoneNumber}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.phone}
                hasError={!!errors.phoneNumber}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* National ID + Role */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="nationalId"
          render={({ field }) => (
            <LabeledField label={labels.form.nationalId} icon={CreditCard} error={errors.nationalId}>
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.nationalId}
                hasError={!!errors.nationalId}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <LabeledField label={labels.form.role} icon={Shield} error={errors.role}>
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                options={INTERNAL_USER_ROLE_OPTIONS}
                hasError={!!errors.role}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Department */}
      <Controller
        control={control}
        name="department"
        render={({ field }) => (
          <LabeledField label={labels.form.department} icon={Building2} error={errors.department}>
            <FormInput
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.department}
            />
          </LabeledField>
        )}
      />

      {/* Reset password toggle */}
      <Controller
        control={control}
        name="resetPassword"
        render={({ field }) => (
          <label className="flex h-11 cursor-pointer items-center gap-3 rounded-[12px] border border-[#D8DEE8] bg-white px-4 text-[13px] font-medium text-[#3A4258]">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="size-5 cursor-pointer rounded-[6px] border border-[#98A2B3] accent-[#667085]"
            />
            <Lock className="size-4 text-[#667085]" />
            <span>Reset user password</span>
          </label>
        )}
      />

      {resetPassword && (
        <div className="space-y-1.5">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <LabeledField label="New Password *" icon={Lock} error={errors.password}>
                <FormInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  hasError={!!errors.password}
                  suffix={
                    <PasswordToggle
                      visible={showPassword}
                      onClick={() => setShowPassword((v) => !v)}
                    />
                  }
                />
              </LabeledField>
            )}
          />
          <p className="text-[11px] text-[#667085]">
            User will be required to change this password on next login
          </p>
        </div>
      )}
    </form>
  );
}