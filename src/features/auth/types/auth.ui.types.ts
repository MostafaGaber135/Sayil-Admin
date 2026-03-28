import type { UseFormReturn } from "react-hook-form";
import type { AdminLoginFormValues } from "./auth.types";

export type LoginFormLabels = {
    heading: string;
    phone: string;
    phonePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    submit: string;
};

export type LoginFormProps = {
    form: UseFormReturn<AdminLoginFormValues>;
    isRTL: boolean;
    submitting: boolean;
    onSubmit: (values: AdminLoginFormValues) => void | Promise<void>;
    errorText?: string | null;
    labels: LoginFormLabels;
};