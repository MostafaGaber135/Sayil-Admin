"use client";

import { useState, type ReactNode } from "react";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import {
    Building2,
    Eye,
    EyeOff,
    Lock,
    Mail,
    MapPin,
    Phone,
    Shield,
    User,
    UserCog,
} from "lucide-react";
import {
    EXTERNAL_USER_ROLE_OPTIONS,
    INTERNAL_USER_ROLE_OPTIONS,
} from "../../users/data/users.constants";
import type { UserFormMode, UsersScreenLabels } from "../types";
import type { UserFormState } from "../ui/UserFormDialog";

function LabeledInput({
    label,
    icon: Icon,
    placeholder,
    value,
    onChange,
    type = "text",
    suffix,
}: {
    label: string;
    icon: typeof User;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    suffix?: ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 flex items-center gap-2 text-[13px] font-medium text-[#3A4258]">
                <Icon className="size-4 text-[#3A4258]" />
                {label}
            </label>
            <div className="relative">
                <Input
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className={cn(
                        "h-11 rounded-[12px] border-[#CBD5E1] bg-white px-4 text-[12px] text-[#24314F] placeholder:text-[#98A2B3] focus-visible:ring-0",
                        suffix ? "pe-11" : ""
                    )}
                />
                {suffix ? (
                    <div className="absolute inset-e-4 top-1/2 -translate-y-1/2">{suffix}</div>
                ) : null}
            </div>
        </div>
    );
}

function LabeledSelect({
    label,
    icon: Icon,
    value,
    onChange,
    options,
}: {
    label: string;
    icon: typeof Shield;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) {
    return (
        <div>
            <label className="mb-2 flex items-center gap-2 text-[13px] font-medium text-[#3A4258]">
                <Icon className="size-4 text-[#3A4258]" />
                {label}
            </label>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="cursor-pointer h-11 w-full rounded-[12px] border border-[#CBD5E1] bg-white px-4 text-[12px] text-[#24314F] outline-none transition focus:border-[#3C71FF]"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function PasswordVisibilityButton({
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

export function InternalUserFields({
    form,
    mode,
    labels,
    onChange,
}: {
    form: UserFormState;
    mode: UserFormMode;
    labels: UsersScreenLabels;
    onChange: (field: keyof UserFormState, value: string) => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    return (
        <>
            <LabeledInput
                label={labels.form.fullName}
                icon={User}
                placeholder={labels.form.placeholders.fullName}
                value={form.name}
                onChange={(value) => onChange("name", value)}
            />

            <div className="grid gap-4 md:grid-cols-2">
                <LabeledInput
                    label={labels.form.email}
                    icon={Mail}
                    placeholder={labels.form.placeholders.email}
                    value={form.email}
                    onChange={(value) => onChange("email", value)}
                />

                <LabeledInput
                    label={labels.form.phone}
                    icon={Phone}
                    placeholder={labels.form.placeholders.phone}
                    value={form.phone}
                    onChange={(value) => onChange("phone", value)}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <LabeledSelect
                    label={labels.form.role}
                    icon={Shield}
                    value={form.role}
                    onChange={(value) => onChange("role", value)}
                    options={INTERNAL_USER_ROLE_OPTIONS}
                />

                <LabeledInput
                    label={labels.form.department}
                    icon={Building2}
                    placeholder={labels.form.placeholders.department}
                    value={form.department}
                    onChange={(value) => onChange("department", value)}
                />
            </div>

            {mode === "add" ? (
                <div>
                    <LabeledInput
                        label={labels.form.initialPassword}
                        icon={UserCog}
                        placeholder={labels.form.placeholders.password}
                        value={form.password}
                        type={showPassword ? "text" : "password"}
                        onChange={(value) => onChange("password", value)}
                        suffix={
                            <PasswordVisibilityButton
                                visible={showPassword}
                                onClick={() => setShowPassword((value) => !value)}
                            />
                        }
                    />
                    <p className="mt-2 text-[11px] text-[#667085]">{labels.form.passwordHint}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <label className="flex h-11 cursor-pointer items-center gap-3 rounded-[12px] border border-[#D8DEE8] bg-white px-4 text-[13px] font-medium text-[#3A4258]">
                        <input
                            type="checkbox"
                            checked={resetPassword}
                            onChange={(event) => {
                                const checked = event.target.checked;
                                setResetPassword(checked);
                                if (!checked) {
                                    onChange("password", "");
                                    setShowPassword(false);
                                }
                            }}
                            className="cursor-pointer size-5 rounded-[6px] border border-[#98A2B3] accent-[#667085]"
                        />
                        <Lock className="size-4 text-[#667085]" />
                        <span>Reset user password</span>
                    </label>

                    {resetPassword ? (
                        <div className="space-y-2">
                            <LabeledInput
                                label="New Password *"
                                icon={Lock}
                                placeholder="Enter new password"
                                value={form.password}
                                type={showPassword ? "text" : "password"}
                                onChange={(value) => onChange("password", value)}
                                suffix={
                                    <PasswordVisibilityButton
                                        visible={showPassword}
                                        onClick={() => setShowPassword((value) => !value)}
                                    />
                                }
                            />
                            <p className="text-[11px] text-[#667085]">
                                User will be required to change this password on next login
                            </p>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
}

export function ExternalUserFields({
    form,
    labels,
    onChange,
}: {
    form: UserFormState;
    labels: UsersScreenLabels;
    onChange: (field: keyof UserFormState, value: string) => void;
}) {
    return (
        <>
            <LabeledInput
                label={labels.form.fullName}
                icon={User}
                placeholder={labels.form.placeholders.fullName}
                value={form.name}
                onChange={(value) => onChange("name", value)}
            />

            <div className="grid gap-4 md:grid-cols-2">
                <LabeledInput
                    label={labels.form.email}
                    icon={Mail}
                    placeholder={labels.form.placeholders.email}
                    value={form.email}
                    onChange={(value) => onChange("email", value)}
                />

                <LabeledInput
                    label={labels.form.phone}
                    icon={Phone}
                    placeholder={labels.form.placeholders.phone}
                    value={form.phone}
                    onChange={(value) => onChange("phone", value)}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <LabeledSelect
                    label={labels.form.role}
                    icon={Shield}
                    value={form.role}
                    onChange={(value) => onChange("role", value)}
                    options={EXTERNAL_USER_ROLE_OPTIONS}
                />

                <LabeledInput
                    label={labels.form.location}
                    icon={MapPin}
                    placeholder={labels.form.placeholders.location}
                    value={form.location}
                    onChange={(value) => onChange("location", value)}
                />
            </div>
        </>
    );
}