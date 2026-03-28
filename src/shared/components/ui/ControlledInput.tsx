"use client";

import { FormInput, FormSelect, LabeledField } from "@/features/users/ui/FormPrimitives";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface BaseProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    icon?: LucideIcon;
}


interface ControlledInputProps<T extends FieldValues> extends BaseProps<T> {
    placeholder?: string;
    type?: string;
    suffix?: React.ReactNode;
}

export function ControlledInput<T extends FieldValues>({
    name, control, label, icon, placeholder, type = "text", suffix
}: ControlledInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <LabeledField label={label} icon={icon} error={error}>
                    <FormInput
                        {...field}
                        value={field.value ?? ""}
                        type={type}
                        placeholder={placeholder}
                        hasError={!!error}
                        suffix={suffix}
                    />
                </LabeledField>
            )}
        />
    );
}

// 2. للـ Select
interface ControlledSelectProps<T extends FieldValues> extends BaseProps<T> {
    options: { label: string; value: string }[];
}

export function ControlledSelect<T extends FieldValues>({
    name, control, label, icon, options
}: ControlledSelectProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <LabeledField label={label} icon={icon} error={error}>
                    <FormSelect
                        {...field}
                        options={options}
                        hasError={!!error}
                    />
                </LabeledField>
            )}
        />
    );
}