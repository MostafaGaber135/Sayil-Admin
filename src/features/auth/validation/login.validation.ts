import { z } from "zod";

export const createAdminLoginSchema = (messages: {
  phoneRequired: string;
  passwordRequired: string;
}) =>
  z.object({
    phoneNumber: z.string().min(6, messages.phoneRequired).trim(),
    password: z.string().min(3, messages.passwordRequired),
  });

export const adminLoginSchema = createAdminLoginSchema({
  phoneRequired: "Phone number is required",
  passwordRequired: "Password is required",
});

export type AdminLoginFormValues = z.infer<ReturnType<typeof createAdminLoginSchema>>;
