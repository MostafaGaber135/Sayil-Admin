"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  UserCog,
  Calendar,
} from "lucide-react";

import {
  AddExternalFormValues,
  EditExternalFormValues,
  addExternalSchema,
  editExternalSchema,
} from "../validation/user.validation";
import {
  FormInput,
  FormSelect,
  LabeledField,
  PasswordToggle,
} from "./FormPrimitives";
import { EXTERNAL_USER_ROLE_OPTIONS } from "../data/users.constants";
import { ManagedUser, UsersScreenLabels } from "..";

// ─── Add Form ─────────────────────────────────────────────────────────────────

type AddExternalFormProps = {
  labels: UsersScreenLabels;
  onSubmit: (values: AddExternalFormValues) => void;
  isPending: boolean;
  formId: string;
};

export function AddExternalForm({
  labels,
  onSubmit,
  isPending,
  formId,
}: AddExternalFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExternalFormValues>({
    resolver: zodResolver(addExternalSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      nationalId: "",
      role: "Landowner",
      location: "",
      dateOfBirth: "",
      genderId: "1",
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
          <LabeledField
            label={labels.form.fullName}
            icon={User}
            error={errors.fullName}
          >
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.fullName}
              hasError={!!errors.fullName}
            />
          </LabeledField>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <LabeledField
            label={labels.form.email}
            icon={Mail}
            error={errors.email}
          >
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.email}
              hasError={!!errors.email}
            />
          </LabeledField>
        )}
      />

      {/* Phone + National ID */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <LabeledField
              label={labels.form.phone}
              icon={Phone}
              error={errors.phoneNumber}
            >
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.phone}
                hasError={!!errors.phoneNumber}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="nationalId"
          render={({ field }) => (
            <LabeledField
              label={labels.form.nationalId}
              icon={CreditCard}
              error={errors.nationalId}
            >
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.nationalId}
                hasError={!!errors.nationalId}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Role + Location */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <LabeledField
              label={labels.form.role}
              icon={Shield}
              error={errors.role}
            >
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                options={EXTERNAL_USER_ROLE_OPTIONS}
                hasError={!!errors.role}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <LabeledField
              label={labels.form.location}
              icon={MapPin}
              error={errors.location}
            >
              <FormInput
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.location}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Date of Birth */}
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <LabeledField
            label={labels.form.dateOfBirth}
            icon={Calendar}
            error={errors.dateOfBirth}
          >
            <FormInput
              value={field.value ?? ""}
              onChange={field.onChange}
              type="date"
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
            <LabeledField
              label={labels.form.initialPassword}
              icon={UserCog}
              error={errors.password}
            >
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
        <p className="mt-1.5 text-[11px] text-[#667085]">
          {labels.form.passwordHint}
        </p>
      </div>
    </form>
  );
}

// ─── Edit Form ────────────────────────────────────────────────────────────────

type EditExternalFormProps = {
  labels: UsersScreenLabels;
  defaultValues: EditExternalFormValues;
  onSubmit: (values: EditExternalFormValues) => void;
  isPending: boolean;
  formId: string;
};

export function EditExternalForm({
  labels,
  defaultValues,
  onSubmit,
  isPending,
  formId,
}: EditExternalFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditExternalFormValues>({
    resolver: zodResolver(editExternalSchema),
    defaultValues,
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <LabeledField
            label={labels.form.fullName}
            icon={User}
            error={errors.fullName}
          >
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.fullName}
              hasError={!!errors.fullName}
            />
          </LabeledField>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <LabeledField
            label={labels.form.email}
            icon={Mail}
            error={errors.email}
          >
            <FormInput
              value={field.value}
              onChange={field.onChange}
              placeholder={labels.form.placeholders.email}
              hasError={!!errors.email}
            />
          </LabeledField>
        )}
      />

      {/* Phone + National ID */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <LabeledField
              label={labels.form.phone}
              icon={Phone}
              error={errors.phoneNumber}
            >
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.phone}
                hasError={!!errors.phoneNumber}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="nationalId"
          render={({ field }) => (
            <LabeledField
              label={labels.form.nationalId}
              icon={CreditCard}
              error={errors.nationalId}
            >
              <FormInput
                value={field.value}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.nationalId}
                hasError={!!errors.nationalId}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Role + Location */}
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <LabeledField
              label={labels.form.role}
              icon={Shield}
              error={errors.role}
            >
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                options={EXTERNAL_USER_ROLE_OPTIONS}
                hasError={!!errors.role}
              />
            </LabeledField>
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <LabeledField
              label={labels.form.location}
              icon={MapPin}
              error={errors.location}
            >
              <FormInput
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder={labels.form.placeholders.location}
              />
            </LabeledField>
          )}
        />
      </div>

      {/* Date of Birth */}
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <LabeledField
            label={labels.form.dateOfBirth}
            icon={Calendar}
            error={errors.dateOfBirth}
          >
            <FormInput
              value={field.value ?? ""}
              onChange={field.onChange}
              type="date"
            />
          </LabeledField>
        )}
      />
    </form>
  );
}

// ─── Helper: ManagedUser → EditExternalFormValues ─────────────────────────────

export function buildEditExternalDefaults(
  user: ManagedUser,
): EditExternalFormValues {
  return {
    fullName: user.name,
    email: user.email,
    phoneNumber: user.phone ?? "",
    nationalId: user.nationalId ?? "",
    role: user.role,
    location: user.location ?? "",
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
    genderId: String(user.genderId ?? 1),
  };
}
